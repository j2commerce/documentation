---
title: "Coinbase Commerce"
sidebar_label: "Coinbase Commerce"
sidebar_position: 20
description: "Accept Bitcoin, Ethereum, USDC, Dogecoin, Litecoin, DAI, and Bitcoin Cash payments in your J2Commerce store using the Coinbase Commerce gateway."
---

# Coinbase Commerce

Coinbase Commerce is a crypto payment gateway that lets your store accept payment in major cryptocurrencies directly to a self-custody wallet. Customers pay in **Bitcoin (BTC), Ethereum (ETH), USD Coin (USDC), Dogecoin (DOGE), Litecoin (LTC), DAI, or Bitcoin Cash (BCH)** — the plugin surfaces all supported currencies at checkout. Because payments settle on the blockchain rather than through a bank, there are no chargebacks, and funds arrive in your Coinbase Commerce wallet without a traditional payment processor sitting in the middle.

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

***

## Important Notice — Coinbase Commerce Sunset (November 2024)

:::warning Existing merchants only
Coinbase announced in late 2024 that the hosted Commerce checkout is **no longer available to new merchants**. If you created a Coinbase Commerce account before the sunset date, your account and API access remain fully functional — this plugin continues to work for you without any changes required.

**If you are setting up a new store**, Coinbase Commerce is not an option for you. Consider these alternatives that are still open for new sign-ups:

- **NOWPayments** — multi-coin processor with hosted and API modes
- **BTCPay Server** — self-hosted, open-source, no fees
- **OpenNode** — Lightning Network–focused Bitcoin processor
:::

***

## Prerequisites

Before configuring the plugin, make sure you have:

- A Coinbase Commerce account created **before** the November 2024 sunset
- Your **API Key** — found at [commerce.coinbase.com/dashboard/settings](https://commerce.coinbase.com/dashboard/settings) under the **API keys** tab
- Your **Webhook Shared Secret** — displayed when you create a webhook endpoint in the same settings page (the secret is shown only once, so copy it immediately)
- J2Commerce installed and configured with at least one product and a working checkout

***

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com).

1. Purchase and download the `plg_j2commerce_payment_coinbase.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `plg_j2commerce_payment_coinbase.zip` file using the **Upload Package File** tab.
4. The plugin installs automatically.

<!-- SCREENSHOT: Joomla Extension Manager install screen with the Coinbase zip selected -->

***

## Enabling the Plugin

After installation the plugin is disabled by default.

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Coinbase** in the filter bar.
3. Click the red circle next to **J2Commerce - Payment - Coinbase Commerce** to enable it (turns green).

<!-- SCREENSHOT: Plugin Manager list showing the Coinbase Commerce plugin with enable toggle highlighted -->

***

## Configuration

Once enabled, open the plugin to configure it.

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods**.
2. Find **Coinbase Commerce** and click its name to open the settings.

<!-- SCREENSHOT: J2Commerce Payment Methods list showing Coinbase Commerce -->

Work through each field in order.

### Display Settings

| Field             | What it does                                             | Recommended value                                                                                |
| ----------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Display Name**  | The payment option label shown at checkout               | `Coinbase Commerce (BTC, ETH, USDC, DOGE, LTC, etc.)` or your preferred shorter label            |
| **Display Image** | Optional logo shown next to the payment name at checkout | Upload from `media/plg_j2commerce_payment_coinbase/images/payment_coinbase.webp`, or leave blank |

### Coinbase Payment Mode

| Field                     | Description                    | Options                                                   |
| ------------------------- | ------------------------------ | --------------------------------------------------------- |
| **Coinbase Payment Mode** | Controls how the customer pays | `Redirect (hosted on Coinbase)` or `Modal (on your site)` |

See [Choosing Redirect vs Modal](#choosing-redirect-vs-modal) below for guidance on which to choose.

### API Credentials

| Field                              | What to enter                                                                | Required                                                                    |
| ---------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Coinbase Commerce API Key**      | The API key from your Coinbase Commerce dashboard settings                   | Yes                                                                         |
| **Coinbase Webhook Shared Secret** | The shared secret shown when you add a webhook endpoint in Coinbase Commerce | Yes — without it, webhooks are silently rejected and orders will not update |
| **Your Webhook Endpoints**         | Read-only field. Displays the two URLs to paste into Coinbase Commerce       | —                                                                           |

<!-- SCREENSHOT: Plugin admin form showing the API Key and Webhook Secret fields, with the webhook URL field displaying the two endpoint URLs -->

### Order Status

:::info

NOTE: If the status you want isn't listed in the dropdown menu, you can create a new one by going to **J2Commerce -> Setup -> Order Statuses**

:::

These three fields control what J2Commerce order status is assigned when Coinbase reports each payment event.

| Field                | Default       | When it triggers                                                     |
| -------------------- | ------------- | -------------------------------------------------------------------- |
| **Confirmed Status** | Confirmed (1) | Coinbase reports `charge:confirmed` or `charge:resolved`             |
| **Pending Status**   | Pending (4)   | Coinbase reports `charge:pending` (awaiting blockchain confirmation) |
| **Failed Status**    | Failed (3)    | Coinbase reports `charge:failed`                                     |

The defaults match the standard J2Commerce order status IDs and work for most stores. Change them if you use custom order statuses.

**Note on `charge:resolved`:** Coinbase uses this event when a charge was overpaid or underpaid and a Coinbase support agent has manually resolved it. The plugin treats `charge:resolved` the same as `charge:confirmed` — both move the order to your Confirmed Status. This is the correct behavior for almost all cases.

### Surcharge (Optional)

You can add an optional processing fee when customers choose Coinbase as their payment method. Leave both fields empty if you do not want a surcharge.

| Field                   | Description                                          | Example                                     |
| ----------------------- | ---------------------------------------------------- | ------------------------------------------- |
| **Surcharge Name**      | Label shown on the order for the fee                 | `Crypto processing fee`                     |
| **Surcharge Percent**   | Percentage of the order total (before the fixed fee) | `1.5`                                       |
| **Surcharge Fixed**     | Flat fee added in addition to the percentage         | `0.50`                                      |
| **Surcharge Tax Class** | Tax profile to apply to the surcharge amount         | Leave blank if the surcharge is not taxable |

### Availability Restrictions (Optional)

Use these to limit when Coinbase Commerce appears as a payment option.

| Field                   | Description                                                        | Example                                            |
| ----------------------- | ------------------------------------------------------------------ | -------------------------------------------------- |
| **Minimum Subtotal**    | Hide this payment method if the cart subtotal is below this amount | `10.00`                                            |
| **Maximum Subtotal**    | Hide this payment method if the cart subtotal exceeds this amount  | `5000.00`                                          |
| **Geozone Restriction** | Limit availability to customers in a specific geozone              | Select a geozone, or leave blank for all countries |

### Custom Messages

These fields accept plain text or HTML and appear at specific points in the checkout flow.

| Field                 | When it appears                                            |
| --------------------- | ---------------------------------------------------------- |
| **On Selection**      | When the customer selects Coinbase as their payment method |
| **On Before Payment** | Just before the payment form is shown                      |
| **On After Payment**  | After the customer returns from Coinbase (success page)    |
| **On Error Payment**  | If a payment error occurs                                  |
| **On Cancel Payment** | If the customer cancels and returns without paying         |

### Thank You Article

You can select a Joomla article to display on the post-payment success page. Leave blank to use the default confirmation message.

### Button Text

The **Button Text** field customises the label on the "Place Order" button. The default value is `Place Order`.

### Debug Logging

| Field             | Description                                                                                           | Default |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ------- |
| **Debug Logging** | Writes detailed request and response data to `administrator/logs/plg_j2commerce_payment_coinbase.php` | No      |

Enable this only when diagnosing a problem. Disable it again in production — log files can grow large and may contain transaction data.

***

## Choosing Redirect vs Modal

The **Coinbase Payment Mode** field gives you two checkout experiences.

### Redirect (recommended)

The customer is sent to a Coinbase-hosted payment page and returns to your store after paying.

**Pros:**

- Coinbase maintains the payment UI — no CSS work required on your end
- Works reliably across all browsers and devices
- Handles the countdown timer and multi-currency display natively

**Cons:**

- The customer briefly leaves your site
- You have no control over the visual design of the payment page

**Use this if** you want the simplest setup, or if you are not confident testing modal overlays across browsers. It is the default, and the right choice for most stores.

### Modal (on your site)

A payment overlay appears inline on your checkout page. The customer can see the crypto address, copy it, pick a different coin, and confirm payment without navigating away.

**Pros:**

- The customer never leaves your store
- Crypto addresses are copyable directly from your checkout page
- Better for customers who prefer to copy addresses manually into their wallet app

**Cons:**

- Requires more cross-browser testing
- CSS may need adjustments depending on your template
- If JavaScript fails to load, the customer sees a fallback form instead of the modal

**Use this if** your customer base is technically comfortable with crypto, or if keeping the customer on-site is a priority for your conversion rate.

***

## Webhook Configuration

Webhooks are how Coinbase Commerce tells your store that a payment has been confirmed, is pending, or has failed. Without a working webhook, orders stay in their initial state regardless of what happens on the blockchain.

### Step 1: Copy Your Webhook URL

In the plugin settings, the **Your Webhook Endpoints** field displays two URLs.

- **Primary endpoint** — matches the checkout confirmation URL pattern used by J2Commerce
- **Alternate endpoint (com\_ajax)** — routes through Joomla's `com_ajax` handler; use this if URL rewriting causes problems

Copy the **Primary endpoint** URL first. It looks like:

```
https://yoursite.com/index.php?option=com_j2commerce&view=checkout&task=confirmPayment&orderpayment_type=payment_coinbase&paction=process&tmpl=component
```

<!-- SCREENSHOT: Plugin admin showing the Webhook Endpoints field with both URLs visible -->

### Step 2: Add the Endpoint in Coinbase Commerce

1. Log in to [commerce.coinbase.com/dashboard/settings](https://commerce.coinbase.com/dashboard/settings).
2. Scroll to **Webhook subscriptions**.
3. Click **Add an endpoint**.
4. Paste the Primary endpoint URL from the plugin settings.
5. Click **Save**.

Coinbase will display a **Shared Secret** — copy it immediately, as it is shown only once.

### Step 3: Save the Shared Secret

1. Return to the Coinbase plugin settings in your Joomla admin.
2. Paste the shared secret into the **Coinbase Webhook Shared Secret** field.
3. Click **Save** (or **Save & Close**).

<!-- SCREENSHOT: Webhook Secret field in plugin admin with a value entered -->

### Step 4: Test the Webhook

Back in your Coinbase Commerce settings, use the **Send test webhook** button to send a test event to your endpoint. The plugin should return one of these responses:

| Response                      | Meaning                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Ok, Processed`               | Webhook arrived, signature verified, order updated                                                   |
| `IPN Ok (ignored event type)` | Webhook arrived but the event type is informational only (e.g., `charge:created`) — no action needed |
| `IPN Misconfigured`           | The webhook secret field in the plugin is empty                                                      |
| `IPN Rejected`                | Signature verification failed                                                                        |

A test webhook from Coinbase uses a synthetic event type that the plugin receives but does not act on — you will see `IPN Ok (ignored event type)`. That is correct.

### If the Primary Endpoint Does Not Work

Some URL rewriting plugins (sh404SEF, JoomSEF, Route66) and web application firewalls (Cloudflare, mod\_security) intercept requests at the primary URL and strip the `X-CC-Webhook-Signature` header that Coinbase includes.

If you see `IPN Rejected` and your shared secret is definitely correct:

1. Switch to the **Alternate endpoint (com\_ajax)** URL instead.
2. Update the endpoint URL in your Coinbase Commerce dashboard.
3. Test again.

The `com_ajax` URL bypasses template and SEF routing, making it more compatible with aggressive URL rewriting.

***

## Order Status Mapping Reference

When Coinbase sends a webhook to your store, the plugin maps the event type to an order status.

| Coinbase Event     | What it means                                                          | Default Order Status |
| ------------------ | ---------------------------------------------------------------------- | -------------------- |
| `charge:pending`   | Payment broadcast to the network; waiting for blockchain confirmations | Pending (4)          |
| `charge:confirmed` | Enough confirmations received; payment is trustworthy                  | Confirmed (1)        |
| `charge:resolved`  | Charge was overpaid or underpaid; manually resolved by Coinbase        | Confirmed (1)        |
| `charge:failed`    | The charge window expired or payment did not arrive                    | Failed (3)           |

Events like `charge:created` and `charge:delayed` are received and acknowledged but do not trigger a status change. The plugin responds `IPN Ok` for those events.

***

## Surcharges and Subtotal Limits

### Adding a Processing Fee

If you want to pass on a small handling fee to customers who pay with crypto:

1. Enter a label in **Surcharge Name** (e.g., `Crypto network fee`).
2. Enter a percentage in **Surcharge Percent** (e.g., `1` for 1%) or a fixed amount in **Surcharge Fixed** (e.g., `0.50`).
3. You can combine both — the percentage is calculated first, then the fixed amount is added.
4. If the fee is taxable, select a tax class in **Surcharge Tax Class**.

### Restricting to Certain Order Sizes

If you only want Coinbase Commerce available for orders above or below certain amounts:

- Set **Minimum Subtotal** to hide the payment option for small orders (e.g., set to `50.00` to require at least $50).
- Set **Maximum Subtotal** to hide it for very large orders (e.g., `2000.00` if you want to verify large transactions manually).

Leave both fields empty to allow all order sizes.

***

## Testing the Payment Flow

Coinbase Commerce provides a sandbox environment through their dashboard. To test without real money:

1. In your Coinbase Commerce dashboard, switch to a test environment if available for your account type.
2. Place a test order on your store and select **Coinbase Commerce** as the payment method.
3. Depending on your mode setting:

   - **Redirect** — you are taken to the Coinbase hosted checkout page
   - **Modal** — the crypto address overlay appears on your checkout page
4. Complete the test payment.
5. Verify in **J2Commerce** -> **Sales** -> **Orders** that the order has:

   - A **Transaction ID** (the Coinbase charge code, e.g., `ABCD1234`)
   - An updated **Order Status** matching your Confirmed Status setting
6. Check the order history tab on the order to confirm the webhook arrived and recorded the event.

<!-- SCREENSHOT: J2Commerce order detail showing Transaction ID field populated with a Coinbase charge code -->

***

## What's New in J2Commerce 6

This plugin was fully rewritten for J2Commerce 6. If you used the J2Store v4 version of this plugin, here is what changed:

- **No jQuery** — the modal checkout UI uses vanilla JavaScript. No jQuery dependency.
- **HMAC signature verification** uses PHP's constant-time `hash_equals` function, preventing timing-based attacks against the webhook secret comparison.
- **HTTP requests** use Joomla's built-in `HttpFactory` instead of raw cURL calls, making the plugin compatible with any HTTP transport adapter configured in Joomla.
- **Order status transitions** go through J2Commerce's `OrderModel::updateOrderStatus()` method. This means order history is logged correctly and status-change email notifications fire as expected — the same as any other payment plugin.
- **Surcharge, subtotal limits, and geozone restriction** are fully implemented, matching the feature parity of the PayPal plugin.
- **Assets** are registered via Joomla's Web Asset Manager. No inline `<link>` or `<script>` tags are injected into the page.
- **Backwards compatibility** — in-flight charges created under the J2Store v4 plugin are still accepted by the webhook handler. The origin hash logic accepts both the old J2Store and new J2Commerce format.

***

## Troubleshooting

### "IPN Misconfigured" — orders never update after payment

**Cause:** The **Coinbase Webhook Shared Secret** field in the plugin settings is empty.

**Solution:**

1. Log in to [commerce.coinbase.com/dashboard/settings](https://commerce.coinbase.com/dashboard/settings).
2. Open your webhook endpoint.
3. Copy the shared secret (you may need to regenerate it if you did not save it originally).
4. Paste it into the **Coinbase Webhook Shared Secret** field in the plugin settings and save.

***

### "IPN Rejected" — webhook arrives but is refused

**Cause 1:** The shared secret in the plugin does not match the one in your Coinbase Commerce dashboard.

**Solution:** Double-check both values. Even a single extra space will cause a mismatch.

**Cause 2:** A security plugin, CDN (such as Cloudflare), or `mod_security` rule is stripping the `X-CC-Webhook-Signature` HTTP header before it reaches PHP.

**Solution:** Switch to the **Alternate endpoint (com\_ajax)** URL. Update the endpoint URL in your Coinbase Commerce dashboard and test again. If the problem persists, temporarily disable `mod_security` or add an exclusion rule for your webhook URL, then test.

***

### "Order ID empty or did not match" — webhook arrives but order is not found

**Cause:** The `metadata.order_id` field in the Coinbase charge was not set correctly, or the order was deleted after the charge was created.

**Solution:**

1. Enable **Debug Logging** in the plugin settings.
2. Place a new test order and check `administrator/logs/plg_j2commerce_payment_coinbase.php` for the raw webhook payload.
3. Confirm the `metadata.order_id` value matches an existing order in J2Commerce.
4. If orders are being deleted and recreated (e.g., by a cron job or cleanup script), stop that process before payments can arrive.

***

### Customer paid but order is stuck on "Pending" or initial status

**Cause:** The webhook did not arrive or was not processed. Common reasons:

- The webhook URL is misconfigured in Coinbase Commerce
- The shared secret is wrong
- Debug logging is off so there is no record of what happened

**Solution:**

1. Enable **Debug Logging** and reproduce the issue.
2. Open `administrator/logs/plg_j2commerce_payment_coinbase.php` and look for any error entries.
3. Check the Coinbase Commerce dashboard webhook delivery log to confirm your endpoint received the event and what HTTP response code it returned.
4. If Coinbase shows a delivery failure (non-200 response), check your server logs for the specific PHP or firewall error.

***

### Coinbase does not return a payment URL (Redirect mode)

**Cause:** The API key is invalid, the Coinbase Commerce account is suspended, or Coinbase returned an unexpected response.

**Solution:**

1. Enable **Debug Logging**.
2. Attempt a checkout and check the log file for the `createCharge` entry and any error detail.
3. Verify the API key in **Coinbase Commerce** -> **Settings** -> **API Keys** is active and has not been revoked.

***

## Related Topics

- [Payment Methods Overview](../payment-methods/index.md)
- [Order Statuses](../setup/orderstatuses.md)
- [Geozones](../localization/geozones.md)
- [Tax Profiles](../localization/tax-profiles.md)
