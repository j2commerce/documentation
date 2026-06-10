---
title: "Finix Payment"
sidebar_label: "Finix"
sidebar_position: 33
description: "Accept credit and debit card payments through Finix in J2Commerce, with an embedded card form, saved cards, subscription renewals, and full order-level capture, void, and refund actions."
---

# Finix Payment

The Finix Payment plugin connects your J2Commerce store to the **Finix** payment platform. Finix is a payments infrastructure provider that gives businesses direct access to card processing — including Visa, Mastercard, and other major card networks — through a secure, embedded card form.

The card form loads directly on your checkout page inside secure iframes provided by Finix. Customers never leave your site to complete payment, and card data is handled entirely within Finix's secure environment, keeping your store at the simplest PCI compliance level (SAQ-A).

The plugin also supports:

- **Saved cards** — logged-in customers can store a card at checkout and use it for faster purchases in the future
- **Subscription renewals** — saved cards can be charged automatically when you use the J2Commerce Subscriptions add-on
- **Manual capture** — authorize a card first and collect funds only when you are ready to ship
- **Capture, void, and refund** actions directly from the J2Commerce order screen

## Requirements

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.3 or later
- A Finix account (sandbox or production)
- Your store must be accessible over HTTPS

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **Finix Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Get Your Finix Credentials

Before configuring the plugin, you need four pieces of information from your Finix dashboard. Finix provides separate sets of credentials for its sandbox (test) environment and its production (live) environment.

### What you need

| Credential | Where to find it | What it looks like |
|---|---|---|
| **API Key Username** | Dashboard -> Developer -> API Keys | A string starting with `US` |
| **API Key Password** | Dashboard -> Developer -> API Keys | A long secret string |
| **Application ID** | Dashboard -> Apps | Starts with `AP` |
| **Merchant ID** | Dashboard -> Merchants | Starts with `MU` |

Keep your Finix dashboard open while you configure the plugin in Joomla.

### Setting up webhooks (required for order updates)

Finix sends real-time notifications to your store when payment events occur — called **webhooks**. You must register your store's webhook endpoint URL in the Finix dashboard and then enter matching credentials in the plugin settings.

A webhook is a secure notification that Finix sends to your store when a payment is completed, refunded, or changes state. Setting up webhooks ensures your orders update automatically without manual intervention.

1. In the Finix dashboard, go to the **Webhooks** section and create a new webhook.
2. Set the endpoint URL to the value shown in the **Webhook Endpoint URL** field inside the plugin settings screen (the plugin generates this URL for you — see below).
3. Create a **Webhook Username** and **Webhook Password** of your choice — these are credentials Finix will send along with each notification so your store can verify it is a genuine request.
4. Copy the **Webhook Signing Key** from the Finix webhook setup — this is the HMAC secret used to verify the cryptographic signature on each incoming notification.

:::info
The **Webhook Endpoint URL** field inside the plugin settings screen displays your store's exact webhook URL. Click **Copy** to copy it to your clipboard. Enter this URL in the Finix dashboard when registering the webhook.
:::

:::warning
Webhooks cannot reach a site running on a local development machine (localhost). You must deploy your store to a publicly accessible server with a valid HTTPS URL before Finix can deliver webhook notifications.
:::

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the `payment_finix.zip` file or use the Install from URL option.

<!-- SCREENSHOT: System > Install > Extensions upload screen -->

## Enable the Plugin

Once installed, you need to enable the plugin. There are two ways to reach it.

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Setup** -> **Payment Methods**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Dashboard** -> **Setup** -> **Payment Methods**

<!-- SCREENSHOT: J2Commerce Payment Methods list showing Finix disabled -->

Search for **Finix**, click the **X** next to it, and it turns into a green checkmark. The plugin is now enabled and ready for setup.

<!-- SCREENSHOT: Finix Payment showing green checkmark -->

## Configure the Plugin

Click the **Finix** title to open its settings.

:::tip
Click the **Toggle Inline Help** button at the top of any plugin settings screen to show a description below each field.
:::

<!-- SCREENSHOT: Plugin settings screen with Toggle Inline Help button highlighted -->

### Appearance

**Display Name:** The label shown to customers on the checkout page — for example, "Credit / Debit Card". Change this to whatever makes sense for your store.

**Display Image:** An optional logo or card-brand image to show next to the payment method name at checkout.

### Capture Method

**Capture Method:** Controls when funds are actually collected from the customer's card.

- **Automatic** — funds are collected immediately when the payment is authorized. This is the right choice for most stores.
- **Manual (Authorize Only)** — the payment is authorized (the amount is reserved on the card) but funds are not collected until you click **Capture Payment** from the order screen. This is useful when you want to confirm stock availability or review the order before charging the customer.

### Test Mode (Sandbox)

**Use Sandbox (Test Mode):** When turned on, all transactions go to the Finix sandbox environment — no real money moves.

Enable this during setup and initial testing. When sandbox mode is active, a warning banner appears on the J2Commerce dashboard as a reminder. Turn it off only when you are ready to accept real payments.

### Live Credentials

These fields appear when **Use Sandbox (Test Mode)** is turned off.

<!-- SCREENSHOT: Plugin configuration showing live credentials fields -->

| Field | Description |
|-------|-------------|
| **API Key Username** | Your Finix production API key username |
| **API Key Password** | Your Finix production API key password — keep this secret |
| **Application ID** | Your Finix production Application ID (starts with `AP`) |
| **Merchant ID** | Your Finix production Merchant ID (starts with `MU`) |
| **Webhook Username** | A username you create — Finix sends this with each webhook so your store can verify the request |
| **Webhook Password** | A password you create — sent alongside the Webhook Username for verification |
| **Webhook Signing Key** | The HMAC signing key from your Finix webhook setup — used to verify the cryptographic signature on each notification |
| **Webhook Endpoint URL** | Displayed automatically — copy this URL and paste it into the Finix dashboard when registering your webhook |

### Sandbox Credentials

These fields appear when **Use Sandbox (Test Mode)** is turned on. They work identically to the live fields but connect to the Finix sandbox environment.

<!-- SCREENSHOT: Plugin configuration showing sandbox credentials fields -->

| Field | Description |
|-------|-------------|
| **Sandbox API Key Username** | Your Finix sandbox API key username |
| **Sandbox API Key Password** | Your Finix sandbox API key password |
| **Sandbox Application ID** | Your Finix sandbox Application ID |
| **Sandbox Merchant ID** | Your Finix sandbox Merchant ID |
| **Sandbox Webhook Username** | Username for authenticating sandbox webhook requests |
| **Sandbox Webhook Password** | Password for authenticating sandbox webhook requests |
| **Sandbox Webhook Signing Key** | HMAC signing key for sandbox webhook verification |

### Saved Cards

**Allow Saved Cards:** When turned on, logged-in customers can save their card at checkout for faster purchases in the future. Saved cards are also required for automatic subscription renewals.

### Template

**Subtemplate:** Choose a visual style for the checkout card form. Options depend on which layout plugins you have enabled (Bootstrap 5 or UIkit). Leave blank to use the default layout.

### Order Statuses

<!-- SCREENSHOT: Order status configuration fields -->

These settings control which J2Commerce order status is applied when specific payment events occur.

| Field | Description | Default |
|-------|-------------|---------|
| **Order Status (Payment Success)** | Status applied when a payment is captured successfully | Confirmed |
| **Authorized Order Status** | Status applied when a payment is authorized but not yet captured — only visible when Capture Method is set to Manual | Confirmed |
| **Change Order Status on Refund** | When turned on, automatically updates the order status after a refund is processed | No |
| **Refund Order Status** | The status to apply after a refund — only shown when Change Order Status on Refund is enabled | — |
| **Change Order Status on Void** | When turned on, automatically updates the order status when an authorized payment is voided | No |
| **Void Order Status** | The status to apply after a void — only shown when Change Order Status on Void is enabled | — |

### Surcharge

Add an optional handling fee when a customer chooses to pay with Finix.

| Field | Description |
|-------|-------------|
| **Surcharge Name** | The label shown to the customer (for example, "Card processing fee") |
| **Surcharge Percent** | A percentage of the order total added as a fee (for example, `1.5` for 1.5%) |
| **Surcharge Fixed** | A fixed amount added regardless of order size |
| **Surcharge Tax Class** | A tax profile to apply to the surcharge — leave blank if no tax applies |

Leave both **Surcharge Percent** and **Surcharge Fixed** empty to charge no surcharge.

### Geozone and Order Value Restrictions

| Field | Description |
|-------|-------------|
| **Geozone Restriction** | Limit Finix to customers in a specific geozone — leave blank to allow all locations |
| **Minimum Order Subtotal** | Hide Finix as a payment option when the cart subtotal is below this amount |
| **Maximum Order Subtotal** | Hide Finix when the cart subtotal is above this amount |

### Custom HTML Snippets

These optional fields let you inject custom text or HTML at different points in the payment flow.

| Field | When it appears |
|-------|----------------|
| **Thank-You Article** | Optional Joomla article shown on the order confirmation page after a successful payment |
| **On Selection Text** | Displayed when the customer selects Finix as their payment method |
| **Before Payment Text** | Displayed just above the card form, before the customer enters card details |
| **After Payment Text** | Displayed on the confirmation page after a successful payment |
| **On Error Text** | Displayed when a payment attempt fails |
| **On Cancel Payment Text** | Displayed when the customer cancels or navigates away from the payment step |

### Dashboard Icon

**Show Dashboard Icon:** Add a quick-access shortcut for this plugin to the J2Commerce dashboard.

**Dashboard Icon Label:** The label for the shortcut icon.

### Debug Mode

**Debug Mode:** Records detailed API request and response data in the Joomla log.

Only enable this when diagnosing a specific problem. Disable it on live sites — debug logs can contain sensitive payment details. Logs are written to `administrator/logs/payment_finix.php`.

## How Checkout Works for Customers

1. The customer adds items to their cart and proceeds to checkout.
2. On the payment step, the Finix embedded card form loads directly on the page. The card number, expiry date, and security code fields appear inside secure iframes hosted by Finix.
3. If the customer is logged in, has saved cards on file, and **Allow Saved Cards** is enabled, they see their saved cards listed and can select one — or choose to use a new card.
4. If the customer enters a new card and saved cards are enabled, they can choose to save it for future orders.
5. The customer confirms the order. Finix processes the payment and returns the result to your store.
6. On success, the customer sees the order confirmation page.

<!-- SCREENSHOT: Finix embedded card form displayed at checkout step -->

<!-- SCREENSHOT: Saved cards list shown to a returning logged-in customer at checkout -->

## Webhooks

Finix sends real-time notifications to your store when payment events occur — such as a payment being processed, refunded, or voided. The plugin verifies each notification using the **Webhook Signing Key** you configured, so only genuine Finix events update your orders.

Your webhook endpoint URL is displayed in the **Webhook Endpoint URL** field inside the plugin settings. Copy that URL and register it in your Finix dashboard.

:::warning
The site must be publicly reachable over HTTPS — webhooks cannot reach a site running on localhost or a private network. A sandbox warning is shown in the plugin settings if your current URL looks like a local address.
:::

## Managing Payments from the Order Screen

After an order is paid, you can take follow-up actions directly from the J2Commerce order detail page.

Go to **J2Commerce** -> **Sales** -> **Orders** -> click the order number to open it. The Finix action buttons appear in the payment section.

The order screen also shows a **Payment Balance** summary with the order total, amount paid, amount refunded, net paid, and any remaining balance due.

### Capture a Payment (Manual Capture mode only)

<!-- SCREENSHOT: Order screen showing Capture Payment button -->

If you set **Capture Method** to **Manual (Authorize Only)**, payments are authorized (reserved) but not collected. When you are ready to charge the customer:

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Click **Capture Payment** and confirm the prompt.
3. The funds are collected from the customer's card and the order status updates.

### Void an Authorization (Manual Capture mode only)

<!-- SCREENSHOT: Order screen showing Void Authorization button -->

A void releases an authorized payment before it has been captured. Once a payment has been captured, use **Refund** instead.

1. Open the order.
2. Click **Void Authorization** and confirm the prompt.
3. The authorization is released — the customer is not charged and any hold on their card is removed.

:::info
The **Void Authorization** button only appears when the payment is in an authorized-but-not-captured state. If the payment has already been captured, use **Refund** instead.
:::

### Issue a Refund

<!-- SCREENSHOT: Order screen showing Refund button and refund modal -->

You can refund a captured payment in full or in part.

1. Open the order.
2. Click **Refund**.
3. In the modal that appears, choose **Full refund** to return the entire amount, or choose **Partial refund** and enter a smaller amount (up to the maximum refundable amount shown).
4. Click **Process Refund** to confirm.

The refund is submitted to Finix and recorded in the order history. If **Change Order Status on Refund** is enabled, the order status updates automatically.

### Charge a Saved Card from the Order Screen

If the customer has saved cards on file, an additional section appears in the order summary showing all of their Finix payment instruments. You can use this to charge a balance due — for example, after a partial payment or failed renewal:

1. Select the card to charge from the dropdown.
2. Enter the amount to charge (the suggested amount equals the outstanding balance due).
3. Click **Charge Now** to process the charge.

<!-- SCREENSHOT: Admin Charge Saved Card section in the order summary -->

## Testing Payments

Always test in sandbox mode before going live.

1. Enable **Use Sandbox (Test Mode)** in the plugin settings and enter your Finix sandbox credentials.
2. Place a test order on your storefront.
3. At the payment step, enter a test card number provided in your Finix sandbox documentation.
4. Complete checkout and confirm the order appears in **J2Commerce** -> **Sales** -> **Orders** with the correct status.
5. Test a refund from the order screen to confirm it processes without errors.
6. Check the Joomla log under **System** -> **Logs** for any errors — enable **Debug Mode** temporarily if needed.
7. When everything is working, turn off **Use Sandbox (Test Mode)** and replace the sandbox credentials with your live credentials.

:::warning
Remember to turn off **Use Sandbox (Test Mode)** before accepting real orders. A warning banner on the J2Commerce dashboard will remind you if sandbox mode is still active.
:::

<!-- SCREENSHOT: J2Commerce dashboard showing "Finix payment plugin is in SANDBOX (test) mode" warning banner -->

## Troubleshooting

### The payment form does not load at checkout

**Cause:** The plugin is not enabled, required credentials are missing, or a JavaScript error is preventing the Finix form from initializing.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** and verify Finix shows a green enabled indicator.
2. Open the plugin settings and confirm the **API Key Username**, **API Key Password**, **Application ID**, and **Merchant ID** fields are filled in for the active environment (sandbox or live).
3. Clear the Joomla cache: **System** -> **Clear Cache** -> **Delete All**.
4. Open your browser's developer console (F12) and look for JavaScript errors on the checkout page.
5. Enable **Debug Mode** in the plugin settings and attempt a test checkout, then check **System** -> **Logs** for any error messages.

### Orders are stuck in a pending status after payment

**Cause:** Finix webhooks are not being received, or the webhook credentials do not match.

**Solution:**

1. Confirm your webhook endpoint URL is registered in the Finix dashboard and that it points to your store.
2. Open the plugin settings and verify the **Webhook Username**, **Webhook Password**, and **Webhook Signing Key** match the values configured in the Finix dashboard exactly.
3. Make sure your store's URL is publicly reachable over HTTPS. Finix cannot deliver webhooks to a site on localhost or a private network.
4. Enable **Debug Mode** and attempt a test payment, then check **System** -> **Logs** for any webhook-related errors.

### The Capture / Void / Refund buttons do not appear on the order

**Cause:** The order was not paid through Finix, no transaction data was recorded, or the payment is not in the correct state for that action.

**Solution:**

1. Confirm the order's payment method is Finix (visible in the payment section of the order detail view).
2. The **Capture** and **Void** buttons only appear when **Capture Method** is set to **Manual (Authorize Only)** and the payment is in an authorized state. The **Refund** button only appears when a payment has been captured.
3. If the checkout was interrupted before the payment completed, no transaction data is saved and no action buttons appear.
4. Enable **Debug Mode** and re-test a full checkout to confirm transaction data is being stored correctly.

### Card declined error at checkout

**Cause:** The card details are incorrect, the card is not authorized for online transactions, or the issuing bank declined the charge.

**Solution:**

1. Ask the customer to double-check their card number, expiry date, and security code.
2. Ask them to try a different card or contact their bank.
3. In sandbox mode, verify you are using a valid Finix test card number from the Finix documentation.

### Missing credentials warning on the J2Commerce dashboard

**Cause:** One or more of the API Key Username, API Key Password, Application ID, or Merchant ID fields is empty.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** -> **Finix**.
2. Fill in all four credential fields for whichever environment (live or sandbox) is currently active.
3. Click **Save** to apply the changes.

### Refund or capture fails with an error

**Cause:** The payment may not be in the correct state. You can only capture an authorized payment, and you can only void a payment that has not yet been captured.

**Solution:**

1. Check the order's payment state. If the payment has already been captured, use **Refund** instead of **Void Authorization**.
2. Enable **Debug Mode** and retry the action, then review **System** -> **Logs** for the specific error returned by Finix.
3. If the problem persists, contact Finix support with the transaction ID from the order.

### Subscription renewal fails

**Cause:** The customer does not have a saved Finix card on file, or no Finix identity profile was created during checkout.

**Solution:**

1. Confirm **Allow Saved Cards** is enabled in the plugin settings — subscription renewals require a saved card.
2. The customer must complete at least one checkout using the embedded Finix card form (not a saved card from a different payment method) so that a Finix identity profile is created for them.
3. Check the order history on the original subscription order for renewal error messages — the plugin logs specific reasons such as "no saved Finix payment instrument is available for this customer."
