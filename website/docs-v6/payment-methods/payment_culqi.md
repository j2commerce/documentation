---
title: "Culqi Payment Method"
sidebar_label: "Culqi"
sidebar_position: 26
description: "Set up the Culqi payment gateway in J2Commerce to accept Visa, Mastercard, American Express, and Diners Club credit card payments in Peru."
---

# Culqi Payment Method

Culqi is a credit-card payment gateway built and operated by BCP (Banco de Crédito del Perú), Peru's largest bank. The J2Commerce Culqi plugin lets your store accept Visa, Mastercard, American Express, and Diners Club payments from Peruvian shoppers in PEN (Peruvian Sol) or USD — directly on your checkout page, with no redirect to a third-party website.

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

## Requirements

- PHP 8.3 or higher
- Joomla! 6.x
- J2Commerce 6.x
- A Culqi merchant account (free signup at [panel.culqi.com](https://panel.culqi.com))
- Store currency set to **PEN** or **USD** — Culqi does not accept other currencies

## Purchase and Download

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com) -> **Payment Methods**.

**Step 2:** Locate **Culqi** -> click **View Details** -> **Add to Cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the plugin. Click **Available Versions** -> **View Files** -> **Download Now**.

## Install the Plugin

1. In the Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Upload the plugin ZIP file using the **Upload Package File** tab.
3. Joomla installs and enables the plugin automatically.

<!-- SCREENSHOT: System -> Install -> Extensions showing the upload area with the Culqi zip selected -->

## Get Your Culqi API Keys

Culqi gives you four API keys: two for testing (sandbox) and two for live payments. You need all four before configuring the plugin.

**Step 1:** Log in to your Culqi dashboard at [panel.culqi.com](https://panel.culqi.com).

**Step 2:** Go to **Desarrollo** (Development) -> **Llaves** (API Keys).

<!-- SCREENSHOT: Culqi dashboard showing the Llaves / API Keys page with test and live key sections -->

**Step 3:** Copy all four keys to a secure location:

| Key | Prefix | Use |
|-----|--------|-----|
| **Public Key** (live) | `pk_live_...` | Safe to use in the browser |
| **Secret Key** (live) | `sk_live_...` | Server-only — never share |
| **Sandbox Public Key** | `pk_test_...` | Safe to use in the browser (testing) |
| **Sandbox Secret Key** | `sk_test_...` | Server-only — never share (testing) |

<!-- SCREENSHOT: Culqi API Keys page with the key prefixes visible -->

:::tip
**Publishable keys** (those beginning with `pk_`) are safe to use in the browser. **Secret keys** (those beginning with `sk_`) are server-only credentials. Never share a secret key in email, chat, or screenshots. If a secret key is ever exposed, regenerate it immediately from the Culqi dashboard.
:::

## Enable the Plugin

Once installed, confirm the plugin is enabled before you configure it. There are two ways to reach Payment Methods.

**Option A:** Click the **J2Commerce** icon at the top right corner -> **Payments** -> **Payment Methods**.

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Payments** -> **Payment Methods**.

<!-- SCREENSHOT: J2Commerce Payment Methods list showing the Culqi row -->

Find the **Culqi** row in the list. If the status column shows a red X, click it to turn it into a green checkmark. Culqi is now enabled.

<!-- SCREENSHOT: Culqi row with the green checkmark enabled state -->

## Configure the Plugin

Click the **Culqi** title to open its settings panel.

:::tip
**Tip:** Click the **Toggle Inline Help** button at the top of any plugin settings panel to show a description below each field. This is useful when you first set up a payment method.
:::

<!-- SCREENSHOT: Culqi plugin settings panel with Toggle Inline Help button highlighted -->

### Display Name

The **Display Name** field controls the label customers see next to the Culqi option at checkout. The default value is **Pay by Culqi**. You can change this to something more familiar to your shoppers, such as "Credit / Debit Card" or "Pay with Visa or Mastercard."

### Display Image

Upload a card-network logo (Visa, Mastercard, Amex, Diners Club) using the **Display Image** field. The image appears next to the payment option on your checkout page. Shoppers trust familiar card logos — adding one here can increase conversion.

<!-- SCREENSHOT: Checkout page showing the Culqi payment option with a card logo beside it -->

### Process Type

This is the most important setting. It controls how the card form appears to your shoppers.

**Culqi Popup Form (default, recommended — value: 0)**

When a shopper clicks Place Order, Culqi opens a secure popup window hosted entirely by Culqi. The card number, CVV, and expiry date are entered inside that popup and are never transmitted to your server. This option carries the lowest PCI-DSS compliance burden for your store.

:::tip
Most stores should use the **Culqi Popup Form**. It is the most secure option and requires the least compliance work on your part.
:::

**Checkout Page Form (value: 1)**

Card fields appear directly on your checkout page, embedded inline. This option gives you full control over the visual design of the payment section, but it carries a higher PCI-DSS compliance requirement. Only choose this if pixel-perfect branding is a business requirement and your team has reviewed the applicable PCI standards.

:::info
If you are unsure which option to choose, select **Culqi Popup Form**. You can always switch later from the plugin settings panel.
:::

<!-- SCREENSHOT: Process Type field showing the two options -->

### Company Name

Enter your store or business name in the **Company Name** field. This text appears at the top of the Culqi popup window when shoppers are entering their card details. Using your actual business name helps build trust.

### Sandbox Mode

The **Sandbox Mode** toggle controls whether the plugin uses test credentials (Yes) or live credentials (No).

- Set **Sandbox Mode** to **Yes** while you are setting up and testing.
- Switch it to **No** before you take your first real payment.

:::info
In sandbox mode the plugin uses your sandbox API keys. Real card numbers are never charged. Test cards work only when sandbox mode is active — see the [Test the Plugin](#test-the-plugin-sandbox-mode) section below.
:::

<!-- SCREENSHOT: Sandbox Mode toggle set to Yes -->

### API Keys

Enter the four API keys you copied from the Culqi dashboard.

**Public Key** — Your live publishable key. Hint: `pk_live_...`

**Secret Key** — Your live secret key. Hint: `sk_live_...`

:::tip
Your **Secret Key** must be kept confidential. It is stored securely in J2Commerce and is never exposed to shoppers. If you ever suspect the key has been compromised, regenerate it immediately from the Culqi dashboard and update this field.
:::

**Sandbox Public Key** — Your test publishable key. Hint: `pk_test_...`

**Sandbox Secret Key** — Your test secret key. Hint: `sk_test_...`

<!-- SCREENSHOT: API Keys section showing the four key fields with their hint text -->

### Installment Payments

**Enable Installments** — Set to **Yes** to allow shoppers to split their purchase into monthly installments on supported credit cards. When enabled, the **Number of Installments** field appears.

**Number of Installments** — Choose between 2 and 12 monthly installments. This value is passed to Culqi when the charge is created. The customer's bank ultimately approves or denies the installment request — not all cards support installments, and the bank may apply its own minimum purchase amount.

<!-- SCREENSHOT: Enable Installments toggle and Number of Installments field -->

### Retry Payment

Set **Retry Payment** to **Yes** to let shoppers try a different card if their first attempt is declined — without having to restart the checkout process from the beginning. This is recommended for stores with a broad customer base, as card declines can happen for many reasons unrelated to the customer's intent to pay.

### Order Statuses

**Payment Status** — The order status applied when a Culqi payment succeeds. The default is **Confirmed**.

**Failed Status** — The order status applied when a payment is declined or an error occurs. The default is **Failed**.

:::info
Order statuses are managed under **J2Commerce** -> **Setup** -> **Order Statuses**. You can create custom statuses there and then select them in these fields.
:::

<!-- SCREENSHOT: Payment Status and Failed Status dropdowns -->

### Surcharge and Fees

These four fields let you add an optional processing fee when a shopper pays by Culqi.

| Field | Description |
|-------|-------------|
| **Surcharge Name** | The label for the fee shown in the cart and order summary (e.g., "Card Processing Fee") |
| **Surcharge Percent** | A percentage of the order subtotal to add as a fee (e.g., `2` for 2%) |
| **Surcharge Fixed Amount** | A fixed fee in your store currency added to every Culqi order |
| **Surcharge Tax Class** | The tax profile applied to the surcharge amount, if your tax rules require it |

Leave all four fields empty if you do not want to charge a processing fee.

### Cart Restrictions

These three fields control when Culqi appears as a payment option at checkout.

| Field | Description |
|-------|-------------|
| **Minimum Subtotal** | Culqi only appears when the cart total is at or above this amount. Leave blank for no minimum. |
| **Maximum Subtotal** | Culqi only appears when the cart total is at or below this amount. Leave blank for no maximum. |
| **GeoZone Restriction** | Limit Culqi to shoppers whose shipping address falls within a specific geozone (geographic region). Leave blank to offer Culqi to all locations. |

Geozones are configured under **J2Commerce** -> **Setup** -> **Geozones**.

<!-- SCREENSHOT: Cart Restrictions fields showing Minimum Subtotal, Maximum Subtotal, and GeoZone Restriction -->

### Thanks Message

Use the **Thanks Message** field to select a Joomla article that is displayed to the customer after a successful Culqi payment. This is a good place to include order confirmation details, next steps, or a thank-you note. Leave blank to use the default J2Commerce confirmation page.

### JavaScript Hooks

These four fields accept optional JavaScript snippets that run at specific points in the payment process.

| Field | When it runs |
|-------|-------------|
| **On Selection** | When the shopper selects Culqi as their payment method |
| **On Before Payment** | Just before the payment request is sent to Culqi |
| **On After Payment** | After a successful payment is confirmed |
| **On Error Payment** | When a payment error or decline occurs |

:::info
These fields are designed for advanced tracking integrations such as Google Analytics ecommerce events or Meta Pixel purchase events. Most stores can leave all four fields blank.
:::

### Button Text

The **Button Text** field sets the label on the checkout submission button when Culqi is selected. The default is **Place Order**. You can customise it to match your store's language or tone.

### Debug Mode

The **Debug Mode** toggle writes detailed payment processing logs to Joomla's log folder.

:::info
Only enable **Debug Mode** when you are actively troubleshooting a payment issue. Disable it again once the issue is resolved, as log files can grow large and may contain sensitive transaction details.
:::

After completing all settings, click **Save** at the top of the page.

<!-- SCREENSHOT: Plugin settings panel showing the Save button in the toolbar -->

## Currency Setup

Culqi processes payments in **PEN (Peruvian Sol)** and **USD** only. If your store currency is set to anything else, Culqi will reject the charge and an error will appear at checkout.

To check your store currency, go to **J2Commerce** -> **Setup** -> **Configuration** -> **Currency** tab.

:::tip
For Peruvian stores, set **PEN** as your primary store currency. USD is also accepted if you serve international shoppers.
:::

<!-- SCREENSHOT: J2Commerce Configuration Currency tab showing PEN as the selected currency -->

## Test the Plugin (Sandbox Mode)

Before going live, run at least one test transaction to confirm the full payment flow works correctly.

**Step 1:** Set **Sandbox Mode** to **Yes** in the plugin settings and save.

**Step 2:** Place a test order on your store. At checkout, select Culqi as the payment method and enter one of the test card numbers below.

**Step 3:** Confirm the order status in **J2Commerce** -> **Sales** -> **Orders** changes to the status you configured in the **Payment Status** field.

### Culqi Test Cards

| Card | Number | CVV | Expiry |
|------|--------|-----|--------|
| Visa (success) | `4111 1111 1111 1111` | Any 3 digits | Any future date |
| Mastercard (success) | `5111 1111 1111 1118` | Any 3 digits | Any future date |
| Amex (success) | `3711 111111 11114` | Any 4 digits | Any future date |
| Declined card | `4000 0000 0000 0002` | Any 3 digits | Any future date |

:::info
Test cards work only when **Sandbox Mode** is set to **Yes**. No real money is charged during sandbox testing. When you are satisfied with your test results, switch **Sandbox Mode** to **No** before accepting real payments.
:::

<!-- SCREENSHOT: Test order confirmation page showing the Confirmed order status after a successful test payment -->

## Going Live

When you are ready to accept real payments, complete this checklist:

- [ ] Set **Sandbox Mode** to **No** in the plugin settings
- [ ] Verify the **Public Key** field contains your live key starting with `pk_live_`
- [ ] Verify the **Secret Key** field contains your live key starting with `sk_live_`
- [ ] Place one real transaction with a real card for a small amount
- [ ] Refund the test transaction from your Culqi dashboard
- [ ] Confirm the order status in J2Commerce changed to **Confirmed** and then to your refund status
- [ ] Review the order details in **J2Commerce** -> **Sales** -> **Orders** to verify all fields populated correctly

## How It Works

Here is what happens when a customer pays with Culqi at checkout:

1. The customer selects Culqi as their payment method on the checkout page.
2. Depending on the **Process Type** setting, either a Culqi-hosted popup appears or card fields are shown inline on the page.
3. The customer enters their card number, CVV, and expiry date.
4. Culqi's JavaScript library performs tokenization (converting the card number into a one-time secure token before it ever reaches your server).
5. J2Commerce receives the token and sends the charge request to the Culqi API from your server using your secret key.
6. If the payment succeeds, the order status changes to **Confirmed** (or your configured Payment Status) and the customer sees the Thanks page.
7. If the payment is declined, the order status changes to **Failed** (or your configured Failed Status). If **Retry Payment** is enabled, the customer can try again with a different card without restarting checkout.

## Tips

- Start in **Sandbox Mode** for every new store or any time you make significant changes to the plugin settings.
- Keep your **Secret Key** in J2Commerce only — never paste it into email, chat, screenshots, or any document that others can see.
- Use the **Maximum Subtotal** restriction if you want to offer Culqi only for lower-value orders while using a different gateway for high-value purchases.
- Enable installments only on high-ticket products where monthly payment options are likely to lift conversion — not every card issuer supports them.
- Upload card network logos in the **Display Image** field (Visa, Mastercard, Amex, Diners Club). Shoppers trust payment options they recognise.
- Test the declined card (`4000 0000 0000 0002`) to confirm your **Failed Status** and error message flow behaves as expected.

## Troubleshooting

### Culqi Option Not Showing at Checkout

**Cause:** The plugin is disabled, the cart total is outside the configured Min/Max range, the shipping address is outside the configured GeoZone, or the store currency is not PEN or USD.

**Solution:**

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods** and confirm **Culqi** shows a green checkmark.
2. Check the **Minimum Subtotal** and **Maximum Subtotal** fields — if set, ensure the cart total falls within that range.
3. Check the **GeoZone Restriction** field — if set, confirm the shopper's shipping address falls within that geozone.
4. Go to **J2Commerce** -> **Setup** -> **Configuration** -> **Currency** tab and confirm the store currency is **PEN** or **USD**.

<!-- SCREENSHOT: Payment Methods list showing Culqi with a green checkmark -->

### Payment Declined or Card Rejected

**Cause:** The card number is invalid for the current mode, the CVV or expiry is wrong, the card has insufficient funds, or the customer's bank refused the transaction.

**Solution:**

1. If you are in sandbox mode, confirm you are using a valid test card from the table above — real card numbers do not work in sandbox.
2. Ask the customer to double-check their CVV and expiry date.
3. If **Retry Payment** is enabled, the customer can try a different card without restarting checkout.
4. For persistent declines on real cards, the customer should contact their bank — the bank's fraud filter or spending limit may be blocking the charge.

### "Invalid API Key" Error at Checkout

**Cause:** The sandbox key is being used while Sandbox Mode is off, a live key is being used while Sandbox Mode is on, the public and secret keys have been entered in the wrong fields, or the keys were regenerated in the Culqi dashboard but not updated in J2Commerce.

**Solution:**

1. Go to the plugin settings and check the **Sandbox Mode** toggle.
2. If **Sandbox Mode** is **Yes**, the plugin uses the **Sandbox Public Key** and **Sandbox Secret Key** fields — verify both start with `pk_test_` and `sk_test_`.
3. If **Sandbox Mode** is **No**, the plugin uses the **Public Key** and **Secret Key** fields — verify both start with `pk_live_` and `sk_live_`.
4. If you recently regenerated keys in the Culqi dashboard, update all four key fields in J2Commerce and save.

<!-- SCREENSHOT: Plugin API Keys section with all four fields filled in correctly -->

### Installments Not Offered to Customer

**Cause:** The **Enable Installments** toggle is off, the customer's card brand does not support installments in Peru, or the cart total is below the minimum installment amount set by the card issuer.

**Solution:**

1. Go to the plugin settings and confirm **Enable Installments** is set to **Yes**.
2. Verify the **Number of Installments** field is set to a value between 2 and 12.
3. Note that installment availability is ultimately controlled by the customer's issuing bank — J2Commerce and Culqi can only request installments; the bank approves or denies them. Not all Visa or Mastercard cards in Peru support installments.

## Related Topics

- [Bank Transfer Payment Method](./payment_banktransfer.md)
- [Cash on Delivery](./payment_cash.md)
- [PayPal Payment Method](./payment_paypal.md)
- [Conekta Payment Method](./conekta.md)
- [Geozones](../localisation/geozones.md)
- [Order Statuses](../localisation/order-statuses.md)
