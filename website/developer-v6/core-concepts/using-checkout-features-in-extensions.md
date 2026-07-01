---
title: "Using Checkout Features in Extensions"
sidebar_label: "Checkout in Extensions"
sidebar_position: 40
description: "How your own J2Commerce app plugin can reuse the built-in checkout to collect a payment against an order that already exists — deposits, installments, balance payments, subscription renewals, and more."
---

# Using Checkout Features in Extensions

J2Commerce 6 lets your own extension send a shopper through the **real checkout page** to pay for an order that **already exists** — instead of building your own payment screen from scratch. This is called **pseudo-checkout mode**. Your extension hands J2Commerce an existing order, and core reuses its normal checkout — with every payment gateway, tax line, and confirmation email working exactly as it does for a brand-new cart.

Use this when you want a customer to pay a deposit, settle a remaining balance, pay an installment, renew a subscription, or make any additional payment against an order they own.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x
- A custom **app plugin** (`app_*`) in the `j2commerce` plugin group

## Why Use Pseudo-Checkout?

Building your own "pay now" page is a trap. The moment you do, you have to re-implement everything the checkout already does:

- Every payment gateway's JavaScript (Stripe, PayPal, and the rest) only mounts on the real checkout page.
- Tax, currency conversion, and order totals must be recalculated correctly.
- Success handling has to fire the same events so confirmation emails, subscriptions, and order-status changes still happen.

Pseudo-checkout mode skips all of that. You point core at an existing order, and the standard checkout does the work. You get **full gateway parity** for free.

## The Building Blocks

Your extension talks to three core pieces. All three live in the J2Commerce site namespace.

| Piece | Type | What it is for |
|-------|------|----------------|
| `CheckoutContextHelper` | Helper class | The public API you call to start a pseudo-checkout and to clean up afterward. |
| `onJ2CommerceResolveCheckoutContext` | Event | Fires during checkout so your plugin can claim the request and describe what to pay for. |
| `CheckoutContextInterface` | Interface | A small object your plugin returns that tells core which order to charge and which steps to show. |

Full class paths:

```php
J2Commerce\Component\J2commerce\Site\Helper\CheckoutContextHelper
J2Commerce\Component\J2commerce\Site\Event\CheckoutContextEvent
J2Commerce\Component\J2commerce\Site\Event\CheckoutContextInterface
```

## Step-by-Step

There are four moving parts. Steps 1 and 2 run when the shopper clicks your "Pay Now" link. Step 3 runs on the checkout page itself. Step 4 is optional and only needed for partial payments.

### Step 1: Validate Ownership, Then Set the Context

When your shopper clicks **Pay Now**, your plugin's controller must first confirm that this shopper is actually allowed to pay for this order. **Core does not do this check for you** — ownership is your responsibility.

Once ownership is confirmed, call `setContext()`. The payload must include at least a `provider` (your plugin's element name) and an `order_id`. You can add any extra data your plugin needs to identify the order later.

```php
use J2Commerce\Component\J2commerce\Site\Helper\CheckoutContextHelper;

// After you have verified the shopper owns this order...
CheckoutContextHelper::setContext([
    'provider'       => 'app_partialpayment', // your plugin element name
    'child_order_id' => $childOrderId,
    'child_order_pk' => $childPk,
    'user_id'        => $userId,
    'invoice_token'  => $invoiceToken,
]);
```

The context starts **deactivated** on purpose. It only becomes active when the shopper arrives on the checkout page carrying the matching one-time code (the nonce). This prevents a stale, abandoned context from ever hijacking a later normal cart checkout.

### Step 2: Redirect to Checkout with the Nonce

`setContext()` automatically generates a one-time security code (a nonce). Read it back, then redirect the shopper to the checkout view with that code in the URL.

```php
use Joomla\CMS\Router\Route;

$ctx   = CheckoutContextHelper::getContext();
$nonce = (string) ($ctx['nonce'] ?? '');

$url = Route::_(
    'index.php?option=com_j2commerce&view=checkout&checkout_context=' . urlencode($nonce),
    false
);

$app->redirect($url);
$app->close();
```

On that first checkout page load, core reads the `checkout_context` URL parameter and matches it against the stored nonce. A match activates the context. A missing or wrong code clears it and falls back to a normal cart checkout.

### Step 3: Resolve the Context

While the checkout page builds, core dispatches the `onJ2CommerceResolveCheckoutContext` event. Subscribe to it. When the payload's `provider` is yours, re-validate ownership one more time, then hand core a `CheckoutContextInterface` object via `assignResolved()`.

```php
public static function getSubscribedEvents(): array
{
    return [
        'onJ2CommerceResolveCheckoutContext' => 'onResolveCheckoutContext',
    ];
}

public function onResolveCheckoutContext(CheckoutContextEvent $event): void
{
    // First listener to claim wins — skip if someone already resolved it.
    if ($event->getResolved() !== null) {
        return;
    }

    $context = $event->getContextPayload();

    if (($context['provider'] ?? '') !== 'app_partialpayment') {
        return;
    }

    // Load and re-verify the order, then hand core your context object.
    $event->assignResolved(new PartialPaymentContext(/* ...your data... */));
}
```

Your context object implements `CheckoutContextInterface`. It tells core which order to charge and which address steps to render:

```php
use J2Commerce\Component\J2commerce\Site\Event\CheckoutContextInterface;

final class PartialPaymentContext implements CheckoutContextInterface
{
    public function getProvider(): string
    {
        return 'app_partialpayment';
    }

    // Re-checked on EVERY request. Return false to abandon and fall back to cart.
    public function validate(): bool
    {
        return $this->stillOwnedAndPayable();
    }

    // The existing order to charge (an OrderTable with all DB columns).
    public function getOrder(): ?object
    {
        return $this->orderTable;
    }

    public function getShowShipping(): bool
    {
        return false; // paying a balance rarely needs a shipping step
    }

    public function getShowBilling(): bool
    {
        return false;
    }

    // Empty array = all configured payment plugins are available.
    public function getAllowedPaymentMethods(): array
    {
        return $this->allowedMethods;
    }

    // Extra data shown on the confirmation template.
    public function getConfirmation(): array
    {
        return $this->confirmation;
    }
}
```

From here, core runs its standard checkout against your order. Every payment gateway works normally. On a successful payment, core clears the context automatically.

### Step 4 (Optional): Charge Only a Partial Amount

By default, pseudo-checkout charges the order's grand total. To charge **less** — a deposit or a single installment — set `amount_due_now` inside the order's `order_params`. Core's `CurrencyHelper` reads this value and charges exactly that amount, in base currency.

```php
// Store the amount to collect now on the order's params.
$orderParams['amount_due_now'] = 25.00; // charge $25 now, not the full total
```

Rules core enforces:

- A value of `0.0` charges nothing now (valid).
- A **negative** value is ignored — core falls back to the grand total.
- A missing or non-numeric value falls back to the grand total.

## CheckoutContextInterface Reference

Every method your context object must implement.

| Method | Returns | Purpose |
|--------|---------|---------|
| `getProvider()` | `string` | Your plugin's element name, e.g. `app_partialpayment`. |
| `validate()` | `bool` | Re-checks ownership and expiry on every request. `false` clears the context. |
| `getOrder()` | `?object` | The existing order to charge (an OrderTable row). |
| `getShowShipping()` | `bool` | Whether to render the shipping-address step. |
| `getShowBilling()` | `bool` | Whether to render the billing-address step. |
| `getAllowedPaymentMethods()` | `string[]` | Payment plugin element names the shopper may use. Empty = all. |
| `getConfirmation()` | `array` | Extra data surfaced to the confirmation template. |

:::info

`getAllowedPaymentMethods()` is **not** consumed by core directly. If you want to limit which gateways appear, filter the list yourself in your own `onJ2CommerceGetPaymentPlugins` handler, scoped to the active context.

:::

## CheckoutContextHelper Reference

The public API your plugin calls. All methods are static.

| Method | Purpose |
|--------|---------|
| `setContext(array $payload, int $ttl = 3600)` | Start a pseudo-checkout. Payload needs `provider` and `order_id`. Generates the nonce and expiry for you. |
| `getContext()` | Read the current context payload (or `null` if none/expired). |
| `isActive()` | Whether a context payload exists at all. |
| `isActivated()` | Whether the nonce has been matched and the context is live. |
| `checkNonce(string $urlNonce)` | Called by core to validate the URL nonce. You rarely call this yourself. |
| `isOwningRequest()` | The single predicate core uses to decide if pseudo-checkout owns this request. |
| `resolveContext()` | Dispatches the resolve event and caches the result for the request. |
| `clearContext()` | Terminal cleanup — removes the context and stale order state. |
| `primeUserState(object $order)` | Loads order IDs into Joomla user-state so payment can finalize. |

## How It Works

The full lifecycle, start to finish:

1. **Set** — Your app validates ownership, calls `setContext()`, and redirects to the checkout URL with the one-time nonce.
2. **Activate** — On the first checkout page load, core reads the `checkout_context` URL parameter. A matching nonce marks the context active. A missing or wrong nonce clears it, so a stale context can never hijack a normal cart checkout.
3. **Own** — On each request, core calls `isOwningRequest()`. It is `true` only when the context is activated, resolves to an object, and that object's `validate()` returns `true`.
4. **Resolve** — Core dispatches `onJ2CommerceResolveCheckoutContext`. Your plugin returns a `CheckoutContextInterface` via `assignResolved()`. The result is cached for the rest of the request.
5. **Charge** — Core runs the standard checkout against your order. If `amount_due_now` is set, it charges that partial amount; otherwise it charges the grand total.
6. **Finalize** — On a successful payment, core calls `clearContext()`. The context is terminal — it cannot be reused.

## Tips

- **Always validate ownership twice** — once before `setContext()`, and again inside `validate()`. Core re-runs `validate()` on every request and clears the context the moment it returns `false`.
- **Name your event methods carefully** — the resolution is stored under the argument key `resolution`, and the setter is `assignResolved()`, **not** `setResolved()`. Joomla's event system treats a `getResolved()`/`setResolved()` pair matching an argument name as a value pre-processor, which causes infinite recursion. Keep argument keys distinct from getter/setter names.
- **Return the OrderTable, not a cart order** — `getOrder()` should return a fully loaded order row (with all database columns), because a `CartOrder` object lacks the fields gateways need.
- **Let the first listener win** — check `getResolved() !== null` at the top of your handler and bail early if another plugin already claimed the context.
- **Use a short TTL for sensitive flows** — the default context lifetime is one hour. Pass a smaller `$ttl` to `setContext()` for time-critical payments.

## Troubleshooting

### Checkout Falls Back to the Normal Cart

**Cause:** The nonce did not match, the context expired, or `validate()` returned `false`.

**Solution:**

1. Confirm your redirect URL includes `&checkout_context=` followed by the nonce from `getContext()`.
2. Verify the context has not expired — the default TTL is 3600 seconds (one hour).
3. Add logging inside your `validate()` method to confirm it returns `true` on the checkout request.

### The Resolve Event Never Fires for My Plugin

**Cause:** The event is not subscribed, or your `provider` string does not match.

**Solution:**

1. Confirm `onJ2CommerceResolveCheckoutContext` is listed in `getSubscribedEvents()`.
2. Verify the `provider` value in your `setContext()` payload exactly matches the string you check for in the handler.
3. Ensure the plugin is enabled in **J2Commerce -> Apps**.

### Infinite Loop or Stack Overflow During Resolve

**Cause:** A `getResolved()`/`setResolved()` method pair collides with an argument named `resolved`.

**Solution:** Store the resolution under the `resolution` argument key and name the setter `assignResolved()`. Never name an event accessor to match its argument key.

### The Wrong Amount Is Charged

**Cause:** `amount_due_now` is missing, negative, or non-numeric, so core falls back to the grand total.

**Solution:**

1. Confirm `amount_due_now` is stored inside the order's `order_params`.
2. Verify the value is a non-negative number. A negative value is ignored on purpose.
3. Remember a value of `0.0` is valid and charges nothing now.

## Related

- [Order Item Attribute Rendering](./orders/order_item_attributes.md)
- [TaxHelper — Public Tax-Calculation API](./tax-helper.md)
