---
title: "Paysafe Payment"
sidebar_label: "Paysafe"
sidebar_position: 30
description: "Accept credit and debit card payments via Paysafe using secure hosted card fields (SAQ-A) directly on your J2Commerce checkout page."
---

# Paysafe Payment

The Paysafe plugin lets your customers pay by credit or debit card at checkout, processed securely through Paysafe's payment platform. Card fields are rendered inside Paysafe-hosted iframes using **Paysafe.js** — a technique called tokenization. The real card number never touches your server, keeping your store at the simplest PCI compliance level (SAQ-A) while still providing a seamless, on-page checkout experience.

Logged-in customers can optionally save their card for future orders, and you can manage captures, voids, and refunds directly from the J2Commerce order admin without logging into the Paysafe portal.

## Requirements

- PHP 8.3 or later
- Joomla 6.x
- J2Commerce 6.x
- An active Paysafe merchant account with API credentials

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com) -> **Extensions** (or **Apps**).

**Step 2:** Locate **Paysafe** -> click **View Details** -> **Add to Cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile and find the Paysafe plugin. Click **Available Versions** -> **View Files** -> **Download Now** to save the ZIP file to your computer.

## Install the Plugin

<!-- SCREENSHOT: Joomla System > Install > Extensions screen with upload area highlighted -->

1. In your Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Under the **Upload Package File** tab, drag the downloaded ZIP file into the upload area, or click **Browse for file** and select it.
3. Click **Upload & Install**. The plugin installs and enables automatically.

## Enable the Plugin

After installation, verify the plugin is enabled.

<!-- SCREENSHOT: J2Commerce > Payments > Payment Methods list with Paysafe row showing green status icon -->

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods**.
2. Find **Paysafe** in the list.
3. If the status icon is red, click it to turn it green (enabled).

:::tip

Click **Toggle Inline Help** in the toolbar when editing the plugin settings — short descriptions appear directly beneath each field.

:::

## Configure the Plugin

Click the **Paysafe** name in the Payment Methods list to open the plugin settings. The settings are split across four tabs.

<!-- SCREENSHOT: Paysafe plugin settings page showing the Payment Settings tab -->

### Payment Settings tab

These are the core settings that control how Paysafe processes payments on your store.

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | The label shown to customers at checkout (for example, "Credit Card"). | `Credit Card` |
| **Display Image** | An optional image or logo shown next to the payment method name at checkout. | *(none)* |
| **Transaction Type** | Controls whether the card is charged immediately or just reserved. See below. | `Sale (Authorize + Capture)` |
| **Sandbox / Test Mode** | When enabled, transactions go to Paysafe's test environment. No real money changes hands. | Yes (enabled) |

#### Transaction Type

- **Sale (Authorize + Capture)** — The card is authorized and the funds are captured in one step. This is the most common setting. The order moves to your Paid Status immediately after a successful payment.
- **Authorize Only** — The card is reserved (a hold is placed) but funds are not collected yet. You must manually capture the payment from the order admin. Use this when you want to verify the order before collecting payment, such as for made-to-order products.

#### Sandbox / Test Mode

- **Yes (enabled)** — Transactions go to `api.test.paysafe.com`. Use sandbox API keys (see below). This is the default; you must switch this off before going live.
- **No (disabled)** — Transactions go to `api.paysafe.com` (live). Use live API keys.

:::info

A sandbox key on the live host (or vice versa) will be rejected by Paysafe. Always make sure your keys match the selected environment.

:::

#### Sandbox API Keys (shown when Sandbox is Yes)

| Field | Description |
|-------|-------------|
| **Sandbox Private Key** | Your Paysafe server-side key for sandbox. Begins with `pmle-`. Never expose this in the browser. |
| **Sandbox Public Key** | Your Paysafe client-side key for sandbox. Begins with `OT-`. Used to initialize the Paysafe.js card fields in the browser. |
| **Sandbox Account ID** | Your Paysafe merchant account ID for sandbox transactions. |
| **Sandbox Webhook Secret** | Your Paysafe HMAC secret for verifying sandbox webhook calls. Leave blank if you are not testing webhooks. |

#### Live API Keys (shown when Sandbox is No)

| Field | Description |
|-------|-------------|
| **Live Private Key** | Your Paysafe server-side key for live transactions. Begins with `pmle-`. Keep this secret. |
| **Live Public Key** | Your Paysafe client-side key for live transactions. Begins with `OT-`. Safe to use in the browser. |
| **Live Account ID** | Your Paysafe merchant account ID for live transactions. |
| **Live Webhook Secret** | Your Paysafe HMAC secret for verifying live webhook calls. |

:::tip

You can find your API keys in your Paysafe merchant portal under **Developer** -> **API Keys**.

:::

#### Saved Cards

| Field | Description | Default |
|-------|-------------|---------|
| **Allow Saved Cards** | Lets logged-in customers save their card as a multi-use token for faster checkout and automatic subscription renewals. | Yes |

When enabled, customers will see a **Save this card for future purchases** checkbox at checkout, and a **Saved Cards** selector on subsequent purchases.

<!-- SCREENSHOT: Checkout page showing Paysafe card fields and the "Save this card" checkbox -->

#### Layout Template

The **Layout Template** field lets you choose a custom checkout layout if your developer has created one. Leave this on the default unless you have been given specific instructions.

---

### Order Statuses tab

These settings control which order status J2Commerce assigns at each stage of the payment lifecycle.

<!-- SCREENSHOT: Paysafe Order Statuses tab -->

| Field | Description |
|-------|-------------|
| **Paid Status** | The status assigned when payment is successfully captured. Typically set to **Confirmed** or **Processing**. |
| **Authorized Status** | The status assigned when a payment is authorized but not yet captured (Authorize Only mode). Typically set to a custom **Authorized** status. |
| **Change Status on Refund** | When enabled, the order status changes automatically after a refund. |
| **Refund Order Status** | The status to apply after a refund is processed. Only visible when **Change Status on Refund** is enabled. |
| **Change Status on Cancel** | When enabled, the order status changes automatically after a void or cancellation. |
| **Cancel Order Status** | The status to apply after a cancellation or void. Only visible when **Change Status on Cancel** is enabled. |

---

### Restrictions tab

Use these settings to control which customers see Paysafe as a payment option.

| Field | Description |
|-------|-------------|
| **Geozone Restriction** | Limit Paysafe to customers in a specific geozone (for example, United States only). Leave blank to allow all locations. |
| **Minimum Subtotal** | Hide Paysafe when the cart subtotal is below this amount. Leave blank for no minimum. |
| **Maximum Subtotal** | Hide Paysafe when the cart subtotal exceeds this amount. Leave blank for no maximum. |

---

### Advanced tab

| Field | Description | Default |
|-------|-------------|---------|
| **Thank You Article** | Select a Joomla article to display on the order confirmation page after a successful payment. Leave blank to use the default confirmation page. | *(none)* |
| **On Payment Message** | Optional message or HTML content shown to the customer after a successful payment. | *(none)* |
| **On Cancellation Message** | Optional message or HTML content shown when a payment is cancelled. | *(none)* |
| **Show Dashboard Icon** | Show a Paysafe shortcut icon on the J2Commerce admin dashboard. | Yes |
| **Debug Mode** | Logs all Paysafe API requests and responses to the Joomla log directory. **Do not enable on live sites.** | No |

---

## Managing Orders in the Admin

After a payment is processed, you can take further actions directly from the J2Commerce order view.

<!-- SCREENSHOT: J2Commerce order detail page showing the Paysafe payment info block with Capture, Void, and Refund buttons -->

Go to **J2Commerce** -> **Sales** -> **Orders** and open any order paid with Paysafe.

### Capture a Payment (Authorize Only mode)

If you configured **Transaction Type** as **Authorize Only**, the order will show a **Capture Payment** button.

1. Click **Capture Payment**.
2. Confirm the dialog that appears. The funds are collected from the customer immediately.
3. The order status updates to your configured **Paid Status**.

### Void / Cancel a Payment

If the payment has not yet settled, you can void it to release the authorization hold without charging the customer.

1. Click **Cancel / Void**.
2. Confirm the dialog. If the payment has already settled, a refund will be issued instead.

### Issue a Refund

1. Click **Issue Refund**.
2. Choose **Full refund** to return the entire amount, or enter a smaller amount for a **Partial refund**.
3. Click **Process Refund**.

:::note

Partial refunds are supported. The maximum refundable amount is shown in the refund panel. If the order status is not automatically updated after a refund, check that **Change Status on Refund** is enabled in the Order Statuses tab.

:::

---

## How It Works

When a customer reaches the payment step at checkout:

1. J2Commerce loads the Paysafe.js script from Paysafe's servers and renders secure card-entry fields (card number, expiry, CVV) as hosted iframes.
2. The customer enters their card details directly into those iframes. The data goes from the customer's browser straight to Paysafe — your server never sees the raw card number.
3. Paysafe returns a single-use payment handle token to the browser.
4. J2Commerce's checkout submits the token (not the card data) to your server.
5. Your server makes a server-to-server API call to Paysafe to charge or authorize the token.
6. Paysafe returns the transaction result. On success, J2Commerce updates the order status and takes the customer to the confirmation page.

If the customer has saved cards, they can select a previously stored card at step 1 instead of entering new details.

:::info

Paysafe supports Strong Customer Authentication (SCA / 3D Secure 2). If your customer's bank requires additional verification, they will be shown a challenge screen before the payment completes.

:::

---

## Tips

- **Always test in sandbox mode first.** Complete a test order from start to finish before switching to live keys.
- **Authorize Only + Capture** is useful for pre-orders or custom products where you want to verify stock before charging. Remember to capture each order manually, as authorized holds expire after a set period.
- **Saved cards work only for logged-in customers.** Guest customers cannot save cards.
- **Set a clear Paid Status.** Using a dedicated status like "Confirmed" makes it easy to filter paid orders in the orders list.
- **Webhook Secret is optional for basic use.** If Paysafe cannot reach your server via webhook (for example, on a local development environment), payment confirmation still works because J2Commerce finalizes the order synchronously at checkout.

---

## Troubleshooting

### The card fields do not appear at checkout

**Cause:** The Paysafe Public Key is missing or incorrect, or there is a JavaScript conflict.

**Solution:**

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods** -> **Paysafe**.
2. Check that **Sandbox Public Key** (or **Live Public Key**) is filled in correctly and begins with `OT-`.
3. Make sure **Sandbox / Test Mode** matches the type of key you entered.
4. Open your browser's developer console (F12) and look for any JavaScript errors that might be blocking Paysafe.js from loading.

---

### Payment fails with "API keys are not configured"

**Cause:** The private key, public key, or account ID fields are empty.

**Solution:**

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods** -> **Paysafe**.
2. Fill in all three fields for the active environment (sandbox or live): **Private Key**, **Public Key**, and **Account ID**.
3. Click **Save** and retry a test order.

---

### Card is declined even with test card details

**Cause:** A sandbox key is being used against the live Paysafe host, or vice versa.

**Solution:**

1. Confirm that **Sandbox / Test Mode** is set to **Yes** when using sandbox keys.
2. Confirm that **Sandbox / Test Mode** is set to **No** when using live keys.
3. A sandbox key sent to `api.paysafe.com` (live) will always be rejected — the environment must match.

---

### Capture button does not appear on the order

**Cause:** The plugin is configured for **Sale (Authorize + Capture)** mode, which captures automatically. No manual capture button is shown.

**Solution:**

If you need manual capture, go to the plugin settings and change **Transaction Type** to **Authorize Only**. New orders placed after this change will show the **Capture Payment** button.

---

### Sandbox warning banner appears on the storefront

**Cause:** **Sandbox / Test Mode** is still enabled on a live store.

**Solution:**

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods** -> **Paysafe**.
2. Set **Sandbox / Test Mode** to **No**.
3. Enter your live API keys.
4. Click **Save**.
