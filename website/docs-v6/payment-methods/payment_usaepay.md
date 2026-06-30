---
title: "USAePay"
sidebar_label: "USAePay"
sidebar_position: 50
description: "Accept credit card payments on-site through the USAePay payment gateway. Full setup guide for J2Commerce store owners."
---

# USAePay

USAePay is a US-based payment gateway that processes credit and debit cards directly on your store. Customers enter their card details in a form on your checkout page — they never leave your site. The card data is sent from your server to the USAePay gateway over an encrypted connection.

## What You Need Before You Start

- A USAePay merchant account (apply at usaepay.com)
- A **Source Key** generated in the USAePay merchant console under **Settings** -> **Source Keys**
- Optionally, a **Hash PIN** (also called a PIN Key) from the same Source Keys section — adds an extra layer of request signing

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `payment_usaepay.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `payment_usaepay.zip` package file.
4. The plugin installs and enables automatically.

## Step-by-Step Setup

### Step 1: Open the Plugin Settings

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods**.
2. Find **USA E-Pay** in the list and click its name to open settings.

<!-- SCREENSHOT: Payment Methods list with USA E-Pay row highlighted -->

### Step 2: Enter Your API Credentials

In the **API Key** field, paste your live Source Key from the USAePay console.

If your Source Key has a Hash PIN configured, paste it in the **PIN / Hash PIN** field. If you did not set a PIN on the Source Key, leave this blank.

<!-- SCREENSHOT: Plugin settings showing API Key and PIN fields -->

| Field | Description |
|-------|-------------|
| **API Key** | Your live USAePay Source Key. Found in USAePay merchant console under **Settings** -> **Source Keys**. |
| **PIN / Hash PIN** | Optional. The PIN associated with your Source Key. Adds transaction-level hash verification. |

### Step 3: Configure Sandbox Mode for Testing

Enable **Sandbox Mode** before running test transactions. When sandbox is on, two additional fields appear:

| Field | Description |
|-------|-------------|
| **Test API Key** | Your sandbox Source Key from the USAePay sandbox console. |
| **Test PIN / Hash PIN** | Your sandbox PIN, if any. |

The sandbox gateway is at `sandbox.usaepay.com`. Test transactions process against that host automatically — you do not need to change any URL.

Turn sandbox off when you are ready to go live.

### Step 4: Choose a Transaction Type

The **Transaction Type** setting controls what happens when a card is submitted at checkout.

| Option | What it does |
|--------|-------------|
| **Sale (Authorize and Capture)** | Charges the card immediately. Money is captured right away. This is the default and the most common choice. |
| **Auth Only (Authorize)** | Places a hold on the funds without capturing. You must manually capture the payment later from the USAePay merchant console. Use this if you need to verify stock before charging. |

### Step 5: Select Accepted Card Types

The **Accepted Card Types** field controls which card brand icons are shown on the checkout form. Select from Visa, Mastercard, American Express, and Discover. Leaving this empty hides all card icons but does not prevent any card from being submitted — USAePay itself determines which cards your account accepts.

<!-- SCREENSHOT: Checkout form with card brand icons displayed -->

### Step 6: Set Display Options

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | The label shown to customers at checkout, such as "Credit Card" or "Secure Card Payment." | `Credit Card` |
| **Display Image** | A logo shown next to the payment method name. Upload your preferred image via the Joomla Media Manager. | None |

### Step 7: Configure Geographic and Order Restrictions (Optional)

| Field | Description |
|-------|-------------|
| **Geozone Restriction** | Limits this payment method to customers in a specific geozone. Leave at "All" to show it everywhere. |
| **Min Subtotal** | Hide this method when the cart total is below this amount. |
| **Max Subtotal** | Hide this method when the cart total is above this amount. Leave blank for no upper limit. |

### Step 8: Customize Customer Messages

| Field | Description |
|-------|-------------|
| **Before Payment Message** | Text displayed above the card form before the customer submits. Useful for notes about accepted cards or security. |
| **After Payment Message** | Text shown on the confirmation screen after a successful payment. |
| **Error Payment Message** | Text shown when a payment fails. If left blank, a default error message is used. |

### Step 9: Set a Thank-You Article (Optional)

The **Thank You Message** field links to a Joomla article. If set, the article content is displayed below the after-payment message on the confirmation screen. Use this for order instructions, download links, or anything else you want to show after a successful purchase.

### Step 10: Enable Debug Logging

Turn **Debug** on during initial testing to write gateway request and response data to the Joomla log. Logs appear under **System** -> **System Information** -> **Joomla Logs**, in the `plg_j2commerce_payment_usaepay` category.

Turn debug off on a live store. Debug logs include masked card numbers but should not be left active in production.

### Step 11: Save and Test

Click **Save** in the toolbar. Then switch to **Sandbox Mode**, place a test order, and verify the order reaches a Confirmed status.

<!-- SCREENSHOT: Successfully confirmed test order in J2Commerce orders list -->

---

## How Checkout Looks to Your Customers

When a customer reaches the payment step at checkout and selects USAePay, they see an on-site card form with four fields:

- **Cardholder Name** — full name as printed on the card
- **Card Number** — up to 19 digits
- **Expiry Date** — in MM/YY format
- **CVV** — 3 or 4 digit security code

After they click **Place Order**, a spinner appears while the card is sent to USAePay. On success, they land on the order confirmation page. On decline, an error message is shown and they can re-enter their card without losing their cart.

<!-- SCREENSHOT: Checkout page showing the USAePay card form with all four fields -->

---

## Testing in Sandbox Mode

1. Set **Sandbox Mode** to **Yes** and enter your sandbox Source Key in **Test API Key**.
2. Save the plugin.
3. Place a test order on the front end.
4. Use a USAePay test card number such as `4111111111111111` (Visa) with any future expiry and any CVV.
5. Verify the order status changes to Confirmed in **J2Commerce** -> **Orders**.
6. Check the USAePay sandbox merchant console to confirm the transaction record.
7. When testing is complete, set **Sandbox Mode** back to **No** before accepting real payments.

---

## PCI Compliance Note

Because this plugin collects card details in a form on your server and posts them to USAePay, your store handles raw card data in transit. This means your site falls under **SAQ-D** (Self-Assessment Questionnaire D) — the most comprehensive PCI DSS self-assessment. This is a standard consideration for any on-site card form that is not a hosted iframe or JavaScript tokenizer.

If you want a lighter PCI footprint, consider a payment method that uses hosted fields or redirects, such as PayPal or Stripe.

---

## Multi-Currency

J2Commerce stores your orders in your base currency and tracks the exchange rate at the time of order. When charging through USAePay, the plugin automatically converts the order total to the correct charged amount using `CurrencyHelper::gatewayAmount()`. The currency is sent to USAePay as its ISO 4217 numeric code (for example, `840` for USD, `826` for GBP). This means multi-currency stores charge the correct converted amount — not the base-currency raw total.

---

## Troubleshooting

### Payment form does not appear at checkout

**Cause:** The plugin may be disabled, or no API key has been entered.

**Solution:**

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods** and confirm USAePay shows as enabled.
2. Open the plugin settings and check that the **API Key** field is not empty. An admin notice warns you if the key is missing.
3. If you have a Geozone Restriction set, confirm the customer's address matches that zone.
4. Check the **Min Subtotal** and **Max Subtotal** values to ensure the cart total is within range.

### Card declined in sandbox

**Cause:** Sandbox Source Key may be incorrect, or you may be using a card number that triggers a decline simulation.

**Solution:**

1. Confirm the key in **Test API Key** matches the Source Key you created in the USAePay sandbox console — not the live console.
2. Use the test card `4111111111111111` with a future expiry date.
3. Turn on **Debug** and check the Joomla logs for the raw gateway response code and error message.

### "No response from gateway" error

**Cause:** Your server cannot reach `sandbox.usaepay.com` (in sandbox mode) or `www.usaepay.com` (in live mode).

**Solution:**

1. Check that outbound HTTPS connections are allowed on your hosting account.
2. Ask your host to confirm `www.usaepay.com` and `sandbox.usaepay.com` are reachable on port 443.
3. Enable **Debug** and review the Joomla error log for the specific network error.

### Orders are Pending after a successful card charge

**Cause:** The order status update may have failed after the transaction was recorded.

**Solution:**

1. Enable **Debug** and retry a test transaction. Look for entries in the Joomla log starting with `USAePay: failed to update order status`.
2. Confirm that the `J2COMMERCE_CONFIRMED` order status exists in **J2Commerce** -> **Orders** -> **Order Statuses**.
3. If the transaction went through but the status did not update, you can manually change the order status from the order detail screen.

### Auth Only transactions are not settling

**Cause:** When **Transaction Type** is set to **Auth Only**, J2Commerce does not automatically capture the funds. The authorization hold on the customer's card typically expires after a few days.

**Solution:** Log in to the USAePay merchant console and capture (settle) the authorized transaction before the hold expires. Switch **Transaction Type** to **Sale** if you want automatic capture on every order.

---

## What's New in J2Commerce vs the Old J2Store Version

If you previously used a USAePay plugin with J2Store, here is what changed in J2Commerce 6:

| Area | J2Store version | J2Commerce 6 |
|------|----------------|--------------|
| Framework | FOF 2 (non-namespaced) | Native Joomla 6 MVC with full PHP 8.3 namespaces |
| JavaScript | jQuery-dependent form handling | Vanilla ES6+ with no jQuery dependency |
| Frontend templates | Single template | Bootstrap 5 and UIkit layouts, selectable per site |
| Multi-currency charging | Used raw order total (could undercharge in multi-currency stores) | Uses `CurrencyHelper::gatewayAmount()` — always charges the correct converted amount |
| Order status updates | Direct database write | Goes through `OrderModel::updateOrderStatus()`, which fires events and sends customer notifications |
| Debug logging | Basic error_log output | Structured Joomla log entries with masked card numbers, category `plg_j2commerce_payment_usaepay` |
| PHP compatibility | PHP 7.x era | PHP 8.3+ with strict types, constructor promotion, and nullsafe operators |
