---
title: "Adyen Payment"
sidebar_label: "Adyen"
sidebar_position: 5
description: "Accept credit cards, digital wallets, and local payment methods through Adyen — with 3DS2/SCA, saved cards, subscription support, and full order-level capture, refund, and cancel actions."
---

# Adyen Payment

The Adyen Payment plugin connects your J2Commerce store to the **Adyen** payment platform. Adyen is used by thousands of businesses worldwide and accepts credit cards, debit cards, digital wallets (Google Pay, Apple Pay), buy-now-pay-later options (Klarna), and many regional payment methods — all from a single integration.

The checkout experience is powered by **Adyen's Drop-in** component, which loads secure card fields directly on your checkout page. Your customers never leave your site, and card data is handled entirely by Adyen, which means your store qualifies for the simplest level of PCI security compliance (SAQ-A).

The plugin also supports:

- **3D Secure 2 (3DS2)** — the bank-required verification step (sometimes called "Verified by Visa" or "Mastercard Identity Check") is handled automatically
- **Saved cards** — returning customers can check out faster with a saved card on file
- **Subscription renewals** — saved cards can be charged automatically when you use the J2Commerce Subscriptions add-on
- **Manual capture** — authorize first, capture funds only when you are ready to ship
- **Capture, refund, and cancel** actions directly from the J2Commerce order screen

## Requirements

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.3 or later
- An Adyen merchant account (test or live)
- Your store must be accessible over HTTPS

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **Adyen Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Get Your Adyen Credentials

Before configuring the plugin, you need a few pieces of information from your Adyen **Customer Area** (the Adyen management portal).

### Test credentials

1. Log in to your Adyen test account at [ca-test.adyen.com](https://ca-test.adyen.com).
2. Go to **Developers** -> **API credentials** and copy your **API key** — this is the server-side secret that lets J2Commerce communicate with Adyen.
3. Copy your **Client key** — this is the browser-safe key that loads the card form on your checkout page.
4. Your **Merchant account** name appears in the top navigation bar of the Customer Area (for example, `MyStoreECOM`).

### Setting up webhooks (required for order updates)

Adyen confirms payment results by sending a notification to your store — called a **webhook**. You must register your store's webhook URL in the Customer Area so Adyen knows where to send those updates.

1. In the Adyen Customer Area, go to **Developers** -> **Webhooks**.
2. Click **Add webhook** -> **Standard webhook**.
3. Set the URL to:
   ```
   https://your-site.com/index.php?option=com_ajax&group=j2commerce&plugin=payment_adyen&format=raw&task=webhook
   ```
   Replace `your-site.com` with your actual domain.
4. Under **Security** -> **HMAC Key**, generate a new HMAC key and copy it. The **HMAC key** (which stands for Hash-based Message Authentication Code) is a shared secret that lets J2Commerce verify that each webhook notification genuinely came from Adyen — not from a third party.
5. Save the webhook and copy the HMAC key value before closing.

### Live credentials

When you are ready to go live, you will also need:

- **Live API key** and **Live client key** — found in **Developers** -> **API credentials** in your live Customer Area account.
- **Live URL prefix** and **Live company name** — found in **Account** -> **API URLs** in the Customer Area. Together these form the host address for your live API requests.

Keep the Customer Area open while you configure the plugin in Joomla.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the `payment_adyen.zip` file or use the Install from URL option.

<!-- SCREENSHOT: System > Install > Extensions upload screen -->

## Enable the Plugin

Once installed, you need to enable the plugin. There are two ways to reach it.

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Setup** -> **Payment Methods**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Dashboard** -> **Setup** -> **Payment Methods**

<!-- SCREENSHOT: J2Commerce Payment Methods list showing Adyen disabled -->

Search for **Adyen Payment**, click the **X** next to it, and it turns into a green checkmark. The plugin is now enabled and ready for setup.

<!-- SCREENSHOT: Adyen Payment showing green checkmark -->

## Configure the Plugin

Click the **Adyen Payment** title to open its settings.

:::tip
Click the **Toggle Inline Help** button at the top of any plugin settings screen to show a description below each field.
:::

<!-- SCREENSHOT: Plugin settings screen with Toggle Inline Help button highlighted -->

### Appearance

**Display Name:** The label shown to customers on the checkout page (for example, "Pay by Card"). Change this to whatever makes sense for your store.

**Display Image:** An optional logo or card-brand image to show next to the payment method name at checkout.

### Integration Mode

**Integration Mode:** Controls how the payment is processed behind the scenes.

- **Sessions Flow (Drop-in)** — Adyen handles the entire payment lifecycle, including 3DS2 challenges, inside its Drop-in component. This is the recommended option — it requires the least setup and keeps your store at SAQ-A PCI compliance.
- **Advanced Flow (manual /payments)** — The plugin takes manual control of the API calls. Choose this only if you have a specific technical requirement; for most stores, Sessions Flow is the right choice.

### Capture Mode

**Capture Mode:** Controls when funds are actually collected from the customer's card.

- **Automatic Capture (recommended)** — funds are collected immediately when the payment is authorized. This suits most stores.
- **Manual Capture** — the payment is authorized (the amount is reserved on the card) but funds are not collected until you click **Capture Payment** from the order screen. This is useful when you want to confirm stock availability or review an order before charging the customer.

### Test Mode

**Test Mode:** When turned on, all transactions go to Adyen's test environment — no real money moves.

Enable this during setup and initial testing. When Test Mode is active, a warning banner appears on the J2Commerce dashboard as a reminder. Turn it off only when you are ready to accept real payments.

### Live Credentials

These fields appear when **Test Mode** is turned off.

<!-- SCREENSHOT: Plugin configuration showing live credentials fields -->

| Field | Description |
|-------|-------------|
| **API Key** | Your Adyen live API key — a server-side secret, never shared with browsers |
| **Client Key** | Your Adyen live client key — browser-safe, used by the Drop-in card form |
| **Merchant Account** | Your Adyen merchant account name (for example, `MyStoreECOM`) |
| **Live URL Prefix** | The URL prefix from your Adyen Customer Area (for example, `1797ab8e0c-adyen`) |
| **Live Company Name** | Your Adyen company name from the Customer Area — combined with the prefix to build the live API host |
| **Webhook HMAC Key** | The HMAC key you generated in the Adyen webhook setup — used to verify incoming notifications |

### Sandbox Credentials

These fields appear when **Test Mode** is turned on. They work identically to the live fields but connect to the Adyen test environment.

<!-- SCREENSHOT: Plugin configuration showing sandbox credentials fields -->

| Field | Description |
|-------|-------------|
| **Sandbox API Key** | Your Adyen test API key |
| **Sandbox Client Key** | Your Adyen test client key |
| **Sandbox Merchant Account** | Your Adyen test merchant account name |
| **Sandbox Webhook HMAC Key** | The HMAC key for your test webhook endpoint |

### Fallback Country Code

**Fallback Country Code:** The two-letter country code (for example, `US`, `GB`, `DE`) used to filter available payment methods when the customer's billing country cannot be determined from the order. Adyen uses the country to decide which payment methods are shown. This defaults to United States (US).

### Saved Cards

<!-- SCREENSHOT: Saved cards configuration section -->

**Allow Saved Cards:** When turned on, logged-in customers can save their card at checkout for faster purchases in the future. Saved cards can also be used for automatic subscription renewals.

**Card Save Mode (Sessions):** Controls how card saving is offered when Integration Mode is set to Sessions Flow and Allow Saved Cards is enabled.

- **Ask for Consent (recommended)** — a checkbox appears at checkout; the customer decides whether to save their card.
- **Always Save** — the card is saved automatically without asking.
- **Never Save** — saving is disabled even though Allow Saved Cards is on.

### Accepted Card Types

**Accepted Card Types:** Choose which card brand icons are displayed above the payment form. Available options: Visa, Mastercard, American Express, Discover, Maestro, Klarna, Google Pay, Apple Pay, PayPal.

This controls icon display only — Adyen determines which payment methods are actually available based on your merchant account configuration.

### Order Statuses

<!-- SCREENSHOT: Order status configuration fields -->

These settings control which J2Commerce order status is applied when specific payment events occur.

| Field | Description | Default |
|-------|-------------|---------|
| **Order Status (Payment Success)** | Status applied when Adyen confirms a successful payment via webhook | Confirmed |
| **Failed Payment Status** | Status applied when Adyen reports a failed or declined payment | Failed |
| **Authorized Status** | Status applied when payment is authorized but not yet captured — only shown when Capture Mode is Manual Capture | Confirmed |
| **Change Status on Refund** | When turned on, automatically updates the order status after a refund is processed | No |
| **Refund Order Status** | The status to apply after a refund — only shown when Change Status on Refund is enabled | — |
| **Change Status on Cancel** | When turned on, automatically updates the order status after a payment is cancelled | No |
| **Cancel Order Status** | The status to apply after a cancellation — only shown when Change Status on Cancel is enabled | — |

### Surcharge

Add an optional handling fee when a customer chooses Adyen.

| Field | Description |
|-------|-------------|
| **Surcharge Name** | The label shown to the customer (for example, "Card processing fee") |
| **Surcharge Percent** | A percentage of the order total added as a fee (for example, `1.5` for 1.5%) |
| **Surcharge Fixed** | A fixed amount added regardless of order size |
| **Surcharge Tax Class** | A tax profile to apply to the surcharge — leave blank if no tax applies |

Leave both Surcharge Percent and Surcharge Fixed empty to charge no surcharge.

### GeoZone and Order Value Restrictions

| Field | Description |
|-------|-------------|
| **Geozone Restriction** | Limit Adyen to customers in a specific geozone — leave blank to allow all locations |
| **Minimum Order Subtotal** | Hide Adyen as a payment option when the cart subtotal is below this amount |
| **Maximum Order Subtotal** | Hide Adyen when the cart subtotal is above this amount |

### Custom HTML Snippets

These optional fields let you inject custom text or HTML at different points in the payment flow.

| Field | When it appears |
|-------|----------------|
| **Thank-You Article** | Optional Joomla article shown on the order confirmation page after successful payment |
| **On Selection Text** | Displayed when the customer selects Adyen as their payment method |
| **Before Payment Text** | Displayed just above the card form, before the customer enters card details |
| **After Payment Text** | Displayed on the confirmation page after a successful payment |
| **On Error Text** | Displayed when a payment attempt fails |
| **Order Cancelled Message** | Displayed when the customer cancels or navigates away |

### Dashboard Icon

**Show Dashboard Icon:** Add a quick-access shortcut for this plugin to the J2Commerce dashboard.

**Dashboard Icon Label:** The label for the shortcut icon. Defaults to "Adyen Payment" if left blank.

### Debug Mode

**Debug Mode:** Records detailed API request and response data in the Joomla log.

Only enable this when diagnosing a specific problem. Disable it on live sites — debug logs can contain sensitive payment details.

## How Checkout Works for Customers

1. The customer adds items to their cart and proceeds to checkout.
2. On the payment step, the Adyen Drop-in card form loads directly on the page — the card number, expiry date, and CVV fields appear inside secure iframes hosted by Adyen.
3. If the customer is logged in and has saved cards on file (and **Allow Saved Cards** is enabled), they see a list of saved cards and can select one or choose to use a new card.
4. If card saving is allowed, a checkbox lets the customer save the new card for future orders.
5. The customer selects their payment method and enters their details.
6. If the customer's bank requires a 3DS2 verification step (the extra security check sometimes called "Verified by Visa" or "Mastercard Identity Check"), an additional screen appears inside the payment form — the customer completes it and is returned to checkout.
7. On success, the customer sees the order confirmation page.

<!-- SCREENSHOT: Adyen Drop-in card form displayed at checkout step -->

## Webhooks

Adyen sends real-time notifications to your store when payment events occur — such as a payment being authorized, captured, refused, cancelled, or refunded. The plugin verifies each notification using HMAC-SHA256 (the **Webhook HMAC Key** you configured) so only genuine Adyen events update your orders.

Your webhook URL to register in the Adyen Customer Area is:

```
https://your-site.com/index.php?option=com_ajax&group=j2commerce&plugin=payment_adyen&format=raw&task=webhook
```

Replace `your-site.com` with your actual domain. **The site must be publicly reachable over HTTPS** — webhooks cannot reach a site running on localhost.

Key webhook events the plugin handles:

| Adyen Event | What Happens in J2Commerce |
|-------------|---------------------------|
| AUTHORISATION (success) | Order status updates to Authorized Status (Manual Capture mode) or Payment Status (Automatic Capture) |
| CAPTURE | Order status updates to Payment Status |
| AUTHORISATION (failure) | Order status updates to Failed Payment Status |
| REFUND | Refund recorded; order status updated if Change Status on Refund is enabled |
| CANCELLATION | Cancellation recorded; order status updated if Change Status on Cancel is enabled |

## Managing Payments from the Order Screen

After an order is paid, you can take follow-up actions directly from the J2Commerce order detail page.

Go to **J2Commerce** -> **Sales** -> **Orders** -> click the order number to open it. The Adyen action buttons appear in the payment section.

### Capture a Payment (Manual Capture mode only)

<!-- SCREENSHOT: Order screen showing Capture Payment button -->

If you set **Capture Mode** to **Manual Capture**, payments are authorized but not collected. When you are ready to charge the customer:

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Click **Capture Payment** and confirm the prompt.
3. The funds are collected from the customer's card. The order status updates when Adyen confirms the capture via webhook.

### Cancel a Payment

<!-- SCREENSHOT: Order screen showing Cancel Payment button -->

A cancellation releases an authorized payment before it has been captured. Once a payment has been captured, use **Issue Refund** instead.

1. Open the order.
2. Click **Cancel Payment** and confirm the prompt.
3. The authorization is released — the customer is not charged and any hold on their card is removed.

:::info
If the **Cancel Payment** button is not visible, the payment has already been captured. Use **Issue Refund** in that case.
:::

### Issue a Refund

<!-- SCREENSHOT: Order screen showing Issue Refund and refund amount field -->

You can refund a captured payment in full or in part.

1. Open the order.
2. Click **Issue Refund**.
3. Choose **Full refund** to return the entire amount, or enter a smaller amount for a partial refund (up to the maximum refundable amount shown).
4. Click **Process Refund** to confirm.

The refund is submitted to Adyen. Adyen processes refunds asynchronously — the customer's card is credited within a few business days. If **Change Status on Refund** is enabled, the order status updates automatically when Adyen confirms the refund.

## Testing Payments

Always test in sandbox mode before going live.

1. Enable **Test Mode** in the plugin settings and enter your Adyen sandbox credentials (sandbox API key, sandbox client key, sandbox merchant account, and sandbox HMAC key).
2. Place a test order on your storefront.
3. At the payment step, enter a test card number. Adyen provides test card numbers in the Customer Area under **Developers** -> **Test cards**. A basic Visa test card number is `4111 1111 1111 1111` with any future expiry date and any three-digit CVV.
4. Complete checkout and confirm the order appears in **J2Commerce** -> **Sales** -> **Orders** with the correct status.
5. Test a refund from the order screen to confirm it processes without errors.
6. Check the Joomla log under **System** -> **Logs** for any errors — enable **Debug Mode** temporarily if needed.
7. When everything is working, turn off **Test Mode** and replace the sandbox credentials with your live credentials.

:::warning
Remember to turn off **Test Mode** before accepting real orders. A warning banner on the J2Commerce dashboard will remind you if Test Mode is still active.
:::

<!-- SCREENSHOT: J2Commerce dashboard showing "Adyen is in test mode" warning banner -->

## Troubleshooting

### The payment form does not load at checkout

**Cause:** The client key is missing or incorrect, or the plugin is not enabled.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** and verify Adyen shows a green enabled indicator.
2. Open the plugin settings and confirm the **Client Key** field (or **Sandbox Client Key** if Test Mode is on) is filled in.
3. Make sure the client key matches the correct environment — test and live client keys are different.
4. Clear the Joomla cache: **System** -> **Clear Cache** -> **Delete All**.

### Orders are stuck in a pending status after payment

**Cause:** Adyen webhooks are not being received, or the HMAC key is incorrect.

**Solution:**

1. Confirm your webhook URL is registered in the Adyen Customer Area under **Developers** -> **Webhooks** and that the URL points to your store.
2. Open the plugin settings and verify the **Webhook HMAC Key** (or **Sandbox Webhook HMAC Key**) matches the value in the Adyen Customer Area exactly.
3. Make sure your store's URL is publicly reachable over HTTPS. Adyen cannot deliver webhooks to a site on localhost or a private network.
4. Enable **Debug Mode** in the plugin settings, attempt a test payment, then check **System** -> **Logs** for any webhook-related errors.

### The Capture / Refund / Cancel buttons do not appear on the order

**Cause:** The order was not paid through Adyen, or no transaction data was recorded.

**Solution:**

1. Confirm the order's payment method is Adyen (visible in the payment section of the order detail view).
2. The buttons only appear when an Adyen PSP reference (a transaction identifier) is stored on the order. If the checkout was interrupted before the payment completed, no transaction data is saved.
3. Enable **Debug Mode** and re-test a full checkout to confirm transaction data is being stored correctly.

### Card declined error at checkout

**Cause:** The card details are incorrect, the card is not authorized for online transactions, or the issuing bank declined the charge.

**Solution:**

1. Ask the customer to double-check their card number, expiry date, and CVV.
2. Ask them to try a different card or contact their bank.
3. In sandbox mode, verify you are using a valid Adyen test card number from the Customer Area under **Developers** -> **Test cards**.

### Missing credentials warning on the J2Commerce dashboard

**Cause:** The API Key or Merchant Account field is empty.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** -> **Adyen Payment**.
2. Fill in the **API Key** and **Merchant Account** fields for whichever environment (live or sandbox) is currently active.
3. Click **Save** to apply the changes.

### Refund or capture fails with an error

**Cause:** The payment may not be in the correct state. You can only capture an authorized payment, and you can only cancel a payment that has not yet been captured.

**Solution:**

1. Check the order's payment state. If the payment has already been captured, use **Issue Refund** instead of **Cancel Payment**.
2. Enable **Debug Mode** and retry the action, then review **System** -> **Logs** for the specific error returned by Adyen.
3. If the problem persists, contact Adyen support with the PSP reference from the order.
