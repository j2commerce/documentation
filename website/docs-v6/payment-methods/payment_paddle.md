---
title: Paddle Payment Plugin
sidebar_label: Paddle
sidebar_position: 2
description: Accept global payments with Paddle as Merchant of Record. Paddle handles tax, fraud, SCA, and PCI compliance so you don't have to.
---

# Paddle

Paddle is a **Merchant of Record** — meaning Paddle is the legal seller of your products, not you. When a customer pays through Paddle, Paddle collects the money, calculates and remits sales tax and VAT in every country, handles fraud screening, Strong Customer Authentication (SCA), and PCI compliance. You receive a payout from Paddle after their fees.

This model has a significant practical benefit: your store never handles raw card numbers, so your compliance burden is minimal. Payment card data only ever passes through Paddle's servers.

:::info What "Merchant of Record" means for you
Paddle shows the tax breakdown to the customer at checkout — but the final tax amount is calculated by Paddle, not by J2Commerce. This is expected behavior. Paddle recalculates tax based on the customer's real billing location and then remits it to the relevant tax authority on your behalf.
:::

## Requirements

- J2Commerce 6 installed and active
- A [Paddle account](https://www.paddle.com/) with at least one approved product or payment link
- PHP 8.1 or later
- Your Joomla site must be publicly reachable for webhooks (localhost does not work without a tunnel)

## Purchase and Download

The Paddle plugin is sold separately from J2Commerce. Purchase it from the [J2Commerce website](https://www.j2commerce.com/extensions/) and download the installer ZIP file.

{/* SCREENSHOT: J2Commerce extension store showing the Paddle plugin listing */}

## Installation

1. In your Joomla administrator, go to **System** -> **Install** -> **Extensions**.
2. Click the **Upload Package File** tab.
3. Drag the Paddle plugin ZIP file into the upload area or use **Browse for file** to locate it.
4. Click **Upload & Install**.

{/* SCREENSHOT: Joomla extension installer with Paddle ZIP file ready to upload */}

## Enable the Plugin

After installation, the plugin must be enabled before it appears at checkout.

**Option 1 — From the Plugins list:**

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Paddle**.
3. Click the status toggle to enable it.

**Option 2 — From J2Commerce Payment Methods:**

1. Go to **J2Commerce** -> **Configuration** -> **Payment Methods**.
2. Find **Paddle** in the list and click to open it.
3. Set **Status** to **Enabled** and save.

{/* SCREENSHOT: J2Commerce Payment Methods screen with Paddle listed */}

## Configure the Plugin

Go to **System** -> **Manage** -> **Plugins**, search for **Paddle**, and click the plugin name to open its settings.

### Environment

The plugin starts in **Sandbox Mode** so you can test without processing real payments. When you are ready to go live, switch **Sandbox Mode** to **No** and fill in the Live credentials.

**Sandbox Mode** controls which set of credentials the plugin uses. Fields for the inactive environment are hidden automatically.

| Field | Description |
|-------|-------------|
| **Sandbox Mode** | Yes (default) = sandbox / No = live |
| **Sandbox API Key** | Your Paddle sandbox server-side API key (`pdl_sdbx_apikey_…`) |
| **Sandbox Client Token** | Your Paddle sandbox browser token (`test_…`) — used by Paddle.js to open the checkout overlay |
| **Sandbox Webhook Secret** | Secret from your sandbox notification destination in the Paddle dashboard |
| **Live API Key** | Your Paddle live server-side API key (`pdl_live_apikey_…`) |
| **Live Client Token** | Your Paddle live browser token (`live_…`) |
| **Live Webhook Secret** | Secret from your live notification destination in the Paddle dashboard |
| **Webhook URL** | Auto-generated. Copy this URL to paste into Paddle's dashboard — see [Webhook Setup](#webhook-setup) below |

:::warning Sandbox mode is on by default
The plugin ships with **Sandbox Mode: Yes**. No real payments will be charged. The checkout page shows a warning banner while sandbox mode is active.
:::

### Payment Options

| Field | Description | Default |
|-------|-------------|---------|
| **Allow Saved Payment Methods** | Show previously saved cards at checkout (requires the customer to have a linked Paddle account) | No |
| **Geo Zone** | Limit this payment method to customers in a specific geographic zone | All zones |
| **Min Order Subtotal** | Only show Paddle if the cart subtotal meets this minimum | (none) |
| **Max Order Subtotal** | Hide Paddle if the cart subtotal exceeds this limit | (none) |

### Order Statuses

| Field | Description | Default |
|-------|-------------|---------|
| **Order Status** | Status applied when a payment is confirmed by Paddle | Confirmed |
| **Refund Order Status** | Status applied when a Paddle refund is approved | Refunded |
| **Void Order Status** | Status applied when a transaction is voided before completion | Cancelled |

### Surcharge

Add a processing fee if your Paddle pricing needs to cover gateway costs.

| Field | Description |
|-------|-------------|
| **Surcharge Name** | Label shown to the customer (e.g., "Processing Fee") |
| **Surcharge %** | Percentage of the order total |
| **Surcharge (Fixed)** | Fixed amount added regardless of order size |
| **Surcharge Tax Class** | Tax profile applied to the surcharge amount |

### Advanced

| Field | Description |
|-------|-------------|
| **Thank You Article** | A Joomla article to display on the order confirmation page after payment |
| **On Selection** | Custom HTML/JS injected when the customer selects Paddle at checkout |
| **Before Payment** | Custom content shown above the Pay button |
| **After Payment** | Custom content shown on the confirmation page |
| **On Error** | Content shown if the payment cannot be initiated |
| **On Cancel** | Content shown if the customer cancels the checkout overlay |
| **Show Dashboard Icon** | Display a shortcut icon in the J2Commerce admin dashboard | No |
| **Debug Logging** | Log API calls to the Joomla log file — disable on production | No |

{/* SCREENSHOT: Paddle plugin configuration screen open in Joomla admin */}

## How Checkout Works

When a customer selects Paddle and clicks **Place Order**, the plugin creates a transaction in Paddle's system, then opens the Paddle checkout overlay directly on your store's page. The customer enters their payment details inside Paddle's secure hosted interface — card data never touches your server.

Paddle handles the payment, including any SCA step-up challenges (such as 3D Secure). When payment is complete, Paddle sends a webhook to confirm the order, and J2Commerce marks it as paid.

:::tip No card data on your server
Because Paddle runs its own hosted checkout overlay, you are automatically SAQ-A compliant. You do not need to worry about PCI-DSS certification for card data.
:::

If the customer closes the overlay without paying, they can return to checkout and try again.

{/* SCREENSHOT: Paddle checkout overlay appearing on the store's checkout page */}

## Webhook Setup

Paddle confirms payments by sending a webhook notification to your store. You must register your webhook URL in the Paddle dashboard for orders to be finalized.

**Your webhook URL** is displayed in the plugin settings under **Webhook URL** (it generates automatically based on your site address). It looks like this:

```
https://yourstore.com/index.php?option=com_ajax&group=j2commerce&plugin=payment_paddle&format=raw&task=webhook
```

:::info Local development
If your site runs on localhost, the Webhook URL field shows a warning instead of a URL. Paddle cannot reach a local server. Use a tunneling tool such as ngrok to expose your local site during development.
:::

### Register the Webhook in Paddle

1. Log in to your [Paddle dashboard](https://vendors.paddle.com/) (or the [Paddle sandbox dashboard](https://sandbox-vendors.paddle.com/) for testing).
2. Go to **Developer tools** -> **Notifications**.
3. Click **New destination**.
4. Set the **URL** to the webhook URL copied from the plugin settings.
5. Under **Events**, subscribe to at least these event types:
   - `transaction.completed`
   - `transaction.paid`
   - `transaction.payment_failed`
   - `subscription.activated`
   - `subscription.canceled`
   - `subscription.paused`
   - `subscription.past_due`
   - `adjustment.updated`
6. Click **Save** to create the destination.
7. Paddle will display a **Webhook Secret** (also called an endpoint secret key, starting with `pdl_ntfset_…`). Copy this value.
8. Paste it into the **Live Webhook Secret** (or **Sandbox Webhook Secret**) field in the plugin settings and save.

{/* SCREENSHOT: Paddle dashboard Notifications screen showing a new destination being created */}

:::warning Keep your webhook secret private
The webhook secret is used to verify that notifications genuinely come from Paddle. Never share it publicly or commit it to version control.
:::

### Verify the Webhook

After saving, Paddle allows you to send a test event from the **Notifications** screen. Send a test and check your Joomla error log (**System** -> **Global Configuration** -> **Server** -> **Error Reporting**) or the J2Commerce log (if Debug Logging is enabled) to confirm the webhook was received and verified.

If a payment completes but the order stays in a pending state, the most common cause is a missing or incorrect webhook secret.

## Managing Subscriptions

If you sell subscription products using the J2Commerce Subscription Product app, Paddle handles subscription billing automatically. You do not need to run any scheduled tasks in J2Commerce to charge renewal payments — Paddle bills the customer on its own schedule according to the billing interval you set on the product.

J2Commerce mirrors the subscription state by listening to Paddle's `subscription.*` webhook events:

| Paddle event | What J2Commerce does |
|--------------|----------------------|
| `subscription.activated` | Sets the subscription status to Active |
| `subscription.canceled` | Sets the subscription status to Cancelled |
| `subscription.paused` | Sets the subscription status to Paused |
| `subscription.past_due` | Sets the subscription status to Failed |
| `transaction.completed` (renewal) | Creates a new renewal order and marks it as paid |
| `transaction.payment_failed` (renewal) | Sets the subscription status to Failed |

### Admin Controls

From any order's detail screen in **J2Commerce** -> **Orders**, you can manage the associated Paddle subscription:

| Button | Action |
|--------|--------|
| **Pause Subscription** | Suspends billing until you resume it |
| **Resume Subscription** | Restarts billing on the next scheduled date |
| **Cancel Subscription** | Cancels the subscription at the end of the current billing period |

These actions communicate directly with Paddle's API. The customer will not be billed again after a cancellation.

{/* SCREENSHOT: Order detail screen showing Paddle subscription action buttons */}

## Refunds and Voids

### Refunds

To refund an order, open the order in **J2Commerce** -> **Orders** and click **Refund**. A dialog appears where you can enter a partial amount or leave it empty to refund the full order total.

Paddle refunds are processed as Adjustments, which require Paddle's approval before the money is returned to the customer. After you submit a refund request:

- The order history records a "refund requested" note.
- Paddle reviews the adjustment (typically 5–10 business days).
- When Paddle approves the adjustment, the webhook updates the order status to the configured **Refund Order Status**.

Do not mark the order as refunded manually — wait for the webhook confirmation.

### Voids

If a transaction was created but not yet completed, you can cancel it using the **Cancel Transaction** button on the order detail screen. This voids the pending transaction and applies the **Void Order Status**.

{/* SCREENSHOT: Order detail screen showing Refund and Cancel Transaction buttons */}

## Troubleshooting

**Orders stay in a pending state after payment**

The most common cause is that the webhook is not reaching your store. Check:

1. The webhook URL in the Paddle dashboard matches the URL shown in the plugin settings exactly.
2. The Webhook Secret in the plugin matches the endpoint secret key from the Paddle dashboard.
3. Your site is publicly accessible (not on localhost without a tunnel).
4. Enable **Debug Logging** in the plugin settings and check the Joomla log after the next payment attempt.

---

**The Paddle checkout overlay does not open**

This usually means the Client Token is missing or incorrect. Verify:

1. The **Live Client Token** (or **Sandbox Client Token**) is filled in. The token starts with `live_` in live mode or `test_` in sandbox mode.
2. **Sandbox Mode** is set correctly for the credentials you are using — sandbox keys will not work in live mode and vice versa.

---

**Refund status does not update**

Refunds are approved by Paddle asynchronously. The order status will only change when Paddle sends the `adjustment.updated` webhook with `status: approved`. Verify that the Webhook Secret is correct and that Paddle can reach your webhook URL.

---

**"Paddle is not configured correctly" message at checkout**

Both the API Key and the Client Token must be filled in for the current mode. If either field is empty, the plugin shows this message instead of the checkout form. Go to the plugin settings and fill in all credentials for the active mode.

---

**Subscription renewals not creating new orders**

Renewal orders are created when the `transaction.completed` webhook arrives with `origin: subscription_recurring`. Check that:

1. The Subscription Product app is installed and active.
2. The webhook is correctly configured and verified in the Paddle dashboard.
3. `subscription.activated` was received for the original order (required to link the Paddle subscription ID to the J2Commerce subscription record).
