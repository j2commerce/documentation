---
title: "Nets Easy / DIBS Easy Payments"
sidebar_label: "Nets Easy (DIBS Easy)"
sidebar_position: 25
description: "Accept Nordic and EU card payments plus local payment methods in J2Commerce using the Nets Easy (DIBS Easy) hosted checkout."
---

# Nets Easy / DIBS Easy Payments

Nets Easy — formerly marketed as DIBS Easy — is a hosted-payment-page gateway from Nets Group, widely used across the Nordic countries and the broader EU. Customers are redirected to a secure Nets-hosted page to complete payment, so no card data ever touches your server. The gateway supports Visa, Mastercard, American Express, Dankort (Denmark), MobilePay, Vipps, Swish, and other local methods depending on your Nets agreement.

## Requirements

- J2Commerce 6.0 or later installed and active
- Joomla 6.0 or later
- A Nets Easy merchant account (see below)
- Your site must be publicly reachable over HTTPS for payment return and webhook notifications
- A live Secret Key and Merchant Number from the Nets Easy portal

## Set Up a Nets Easy Account

If you already have a Nets Easy account and your Secret Key, skip to [Purchase and Download](#purchase-and-download).

### Create an Account

1. Go to [nets.eu/payments/easy](https://www.nets.eu/payments/easy) and click **Get started** or **Contact sales**.
2. Complete the merchant onboarding — Nets will review your application and activate your account.
3. Once approved, log in to the [Nets Easy portal](https://portal.dibspayment.eu).

### Find Your Secret Key and Merchant Number

After logging in to the Nets Easy portal:

1. Click your company name in the top-right corner, then **Company**.
2. Select the **Integrations** tab.
3. Under **Secret key**, copy the key for your live environment.
4. Your **Merchant number** (also called merchant ID) is shown on the same screen.

For the **test environment**, the Nets Easy portal provides separate test credentials on the same Integrations screen. Copy both the test Secret Key and the test Merchant Number.

<!-- SCREENSHOT: Nets Easy portal > Company > Integrations tab showing Secret key and Merchant number fields -->

:::tip

Keep your Secret Keys confidential. Anyone with a valid Secret Key can create payment sessions on your account. Never paste them into plain text files or share them over email.

:::

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com) **->** **Payment Plugins**.

**Step 2:** Locate the **DIBS Easy** plugin **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner. Click **Available Versions** **->** **View Files** **->** **Download Now**.

## Install the Plugin

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `plg_j2commerce_payment_dibseasy.zip` file or use the Install from URL option. The plugin installs and enables itself automatically.

<!-- SCREENSHOT: Joomla Extension Manager upload screen -->

## Enable the Plugin

The plugin enables itself on install. To find it later or to toggle it:

**Option A:** Click the **J2Commerce** icon at the top right corner **->** **Apps**.

**Option B:** Go to **Components** on the left sidebar **->** **J2Commerce** **->** **Apps**.

Search for **DIBS Easy**, then click the toggle to enable or disable it.

<!-- SCREENSHOT: J2Commerce Apps list with DIBS Easy visible and enabled (green toggle) -->

## Configure the Plugin

Click the **DIBS Easy** name in the Apps list to open the settings screen.

:::tip

Click **Toggle Inline Help** at the top of the screen to show a short description below every field.

:::

<!-- SCREENSHOT: DIBS Easy plugin settings screen, full view -->

---

### Display Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | The label shown to customers at checkout for this payment method. | `DIBS Easy` |
| **Payment Image** | An optional logo or image shown next to the payment option at checkout. Upload from your media library, or leave blank to show text only. | _(blank)_ |

---

### Test Environment

| Field | Description | Default |
|-------|-------------|---------|
| **Use Test Environment** | When set to **Yes**, the plugin connects to `test.api.dibspayment.eu` and uses your test credentials. Set to **No** for live payments. | No |

Switch this to **Yes** whenever you are testing. Switch it back to **No** before going live.

---

### Live Credentials

These credentials are used when **Use Test Environment** is set to **No**.

| Field | Description | Where to find |
|-------|-------------|---------------|
| **Secret Key** | Your Nets Easy live Secret Key. | Nets Easy portal **->** Company **->** Integrations |
| **Merchant Number** | Your Nets Easy live Merchant Number. This field is optional for some integrations but recommended. | Same page as the Secret Key |

<!-- SCREENSHOT: DIBS Easy settings with Secret Key and Merchant Number fields highlighted -->

---

### Test Credentials

These credentials are used when **Use Test Environment** is set to **Yes**.

| Field | Description | Where to find |
|-------|-------------|---------------|
| **Test Secret Key** | Your Nets Easy test Secret Key. | Nets Easy portal **->** Company **->** Integrations (test section) |
| **Test Merchant Number** | Your Nets Easy test Merchant Number (optional). | Same page as the Test Secret Key |

---

### Capture Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Auto Capture** | When set to **Yes**, the plugin automatically captures (charges) the payment as soon as the customer returns from Nets and the payment is confirmed. When set to **No**, the payment is authorized only — money is reserved on the customer's card but not collected until you manually trigger capture. | Yes |
| **Confirmed Order Status** | The J2Commerce order status to apply when Nets confirms a successful payment. | Confirmed |

Most stores should leave **Auto Capture** set to **Yes**. Set it to **No** only if your fulfilment process requires you to authorize now and charge later — for example, if you ship made-to-order products and want to capture payment at dispatch time.

:::info

Manual capture is handled at the order level. When auto-capture is off, the order will sit in an authorized state until you capture it using the controls in the order detail screen.

:::

---

### Surcharge

Add an optional extra fee when customers choose DIBS Easy as their payment method. Leave all three fields blank to add no surcharge.

| Field | Description | Default |
|-------|-------------|---------|
| **Surcharge Label** | Name shown for the surcharge line item at checkout. | _(blank)_ |
| **Surcharge (%)** | A percentage of the order subtotal added as a surcharge. For example, enter `2` to add a 2% fee. | _(blank)_ |
| **Surcharge (Fixed)** | A flat amount added to every order. Enter the amount in your store's base currency. | _(blank)_ |
| **Surcharge Tax Class** | A tax profile to apply to the surcharge amount. Leave blank if no tax applies to the surcharge. | _(blank)_ |

:::caution

Surcharges on card payments are regulated or prohibited in some countries — notably within the EU and EEA under the Payment Services Directive. Check local law before enabling a surcharge.

:::

---

### Geo Zone and Order Restrictions

| Field | Description | Default |
|-------|-------------|---------|
| **Geo Zone** | Restrict DIBS Easy to customers in a specific geographic zone. Select a geozone defined in J2Commerce (**J2Commerce** **->** **Localization** **->** **Geo Zones**). Leave blank to show the payment method to all customers. | _(blank)_ |
| **Minimum Order Subtotal** | Hide DIBS Easy if the order subtotal is below this amount. Leave blank for no minimum. | _(blank)_ |
| **Maximum Order Subtotal** | Hide DIBS Easy if the order subtotal is above this amount. Leave blank for no maximum. | _(blank)_ |

---

### Thank You Article

| Field | Description |
|-------|-------------|
| **Thank You Article** | Select a Joomla article to display on the order confirmation page after a successful payment. Leave blank to show J2Commerce's default confirmation message. |

---

### Pay Button Text and Custom Messages

| Field | Description | Default |
|-------|-------------|---------|
| **Pay Button Text** | The label on the button that sends the customer to the Nets Easy hosted payment page. | Place Order |
| **Text on Method Selection** | A message shown to the customer immediately after they select DIBS Easy at the payment step. | _(blank)_ |
| **Text Before Payment** | A message shown on the pre-payment confirmation screen, before the customer clicks the pay button. | _(blank)_ |
| **Text After Successful Payment** | A message shown after the customer returns from Nets with a successful payment. | _(blank)_ |
| **Text on Payment Error** | A message shown when the payment fails or encounters an error. | _(blank)_ |
| **Text on Payment Cancellation** | A message shown when the customer cancels the payment and returns to your store. | _(blank)_ |

Leave any message field blank to show the built-in default text.

---

### Dashboard Icon

| Field | Description | Default |
|-------|-------------|---------|
| **Show Dashboard Icon** | When set to **Yes**, a shortcut icon appears on the J2Commerce dashboard for quick access to this plugin's settings. | No |
| **Dashboard Icon Label** | The label shown under the dashboard icon. Only visible when **Show Dashboard Icon** is enabled. | _(blank)_ |

---

### Template Style

| Field | Description | Default |
|-------|-------------|---------|
| **Template Style** | Select the CSS framework for this plugin's customer-facing templates (Bootstrap 5 or UIkit 3). Match this to your site's active template. | _(blank — uses default)_ |

---

### Debug Mode

| Field | Description | Default |
|-------|-------------|---------|
| **Debug Mode** | When set to **Yes**, the plugin writes Nets Easy API requests and responses to `administrator/logs/payment_dibseasy.php`. Enable only while troubleshooting; set back to **No** in production. | No |

---

## How a Purchase Works

Here is what the customer experiences from start to finish:

1. The customer adds products to the cart and proceeds to checkout.
2. At the payment step, **DIBS Easy** (or your custom display name) appears as a payment option.
3. The customer selects it. The on-selection message appears if you have configured one.
4. The customer reviews the order and clicks the pay button (default label: **Place Order**).
5. J2Commerce creates a payment session at Nets Easy and redirects the customer to the Nets Easy hosted payment page.
6. On the Nets page, the customer enters their card details or selects a local payment method (Dankort, MobilePay, Vipps, Swish, and others depending on your Nets agreement).
7. Nets processes the payment. If 3D Secure authentication is required, the bank challenge appears on the Nets page — the customer completes it there.
8. After payment, Nets redirects the customer back to your store.
9. J2Commerce verifies the payment with Nets, captures the charge (if Auto Capture is on), updates the order status, and shows the order confirmation page.

<!-- SCREENSHOT: DIBS Easy payment option shown at the checkout payment step -->

<!-- SCREENSHOT: Nets Easy hosted payment page (example card entry form) -->

---

## Sandbox Testing

Use the test environment to verify the complete payment flow without processing real money.

1. In the plugin settings, set **Use Test Environment** to **Yes**.
2. Enter your **Test Secret Key** and **Test Merchant Number** from the Nets Easy portal.
3. Save the settings.
4. Place a test order on your storefront.
5. On the Nets Easy test payment page, use the test card numbers provided by Nets:
   - Visa: `4925000000000004` (any future expiry, any CVV)
   - Mastercard: `5413000000000000`
   - Dankort: `5019994000000004`
6. After a successful test payment, confirm the order status updated correctly in **J2Commerce** **->** **Orders**.
7. Enable **Debug Mode** and check `administrator/logs/payment_dibseasy.php` to review the full API exchange.

<!-- SCREENSHOT: Test order on the frontend with Use Test Environment enabled, showing Nets test card page -->

:::caution

Webhook notifications from Nets cannot be delivered to a site running on `localhost` or behind a private network. If you are developing locally, webhooks will be skipped and order confirmation will rely solely on the customer return URL. Use a public URL (or an ngrok tunnel) to test the full webhook flow.

:::

---

## Going Live

When you are ready to accept real payments:

1. In the plugin settings, set **Use Test Environment** to **No**.
2. Enter your live **Secret Key** and **Merchant Number**.
3. Save the settings.
4. Place one real low-value transaction to confirm everything works end-to-end.
5. Set **Debug Mode** to **No**.

**Going-live checklist:**

- [ ] **Use Test Environment** set to **No**
- [ ] Live Secret Key entered in the **Secret Key** field
- [ ] Live Merchant Number entered in the **Merchant Number** field
- [ ] **Debug Mode** set to **No**
- [ ] At least one real payment confirmed end-to-end
- [ ] Your site is publicly accessible over HTTPS

---

## Refunds

You can issue full or partial refunds directly from the J2Commerce admin:

1. Go to **J2Commerce** **->** **Orders** and open the relevant order.
2. Scroll to the **Payment** section on the order detail screen.
3. Click **Refund (Full)** to return the entire amount, or **Refund (Partial)** to enter a specific amount.
4. Confirm the refund.

J2Commerce sends the refund request to Nets Easy via the API. The customer receives their refund on the original payment method within a few business days, depending on their bank.

<!-- SCREENSHOT: J2Commerce order detail screen showing the Payment section with Refund buttons -->

---

## What Changed from J2Store

If you used the DIBS Easy plugin in J2Store 4, the J2Commerce 6 version includes several improvements:

- **Native Joomla 6 MVC** — rebuilt from the ground up with proper namespacing and Joomla 6 dependency injection, removing all FOF 2 dependencies.
- **No jQuery** — all frontend JavaScript has been rewritten in vanilla ES6.
- **Joomla HttpFactory** — HTTP calls to the Nets API now use the Joomla HttpFactory instead of raw cURL, so they respect your server's HTTP client configuration.
- **Multi-currency-correct amounts** — the plugin applies J2Commerce's currency conversion before sending amounts to Nets, so multi-currency stores charge the correct amount in the checkout currency.
- **Idempotent capture** — if the customer refreshes the return page, the plugin checks for an existing transaction before attempting a second capture. No double-charges on page reload.
- **Authenticated webhooks** — the webhook handler verifies the incoming payment ID against the Nets API before finalizing the order.
- **Escaped output** — all data shown in templates is properly escaped before output. Gateway error details are logged server-side rather than displayed to customers.

---

## Troubleshooting

### The pay button does not appear / shows a blank page

**Cause:** The plugin cannot create a payment session at Nets, usually because the Secret Key is wrong or the environment toggle is mismatched.

**Solution:**

1. Verify that **Use Test Environment** matches which set of credentials you have entered. If it is set to **Yes**, the plugin uses the **Test Secret Key** — make sure that field is filled in.
2. Double-check the Secret Key value: copy it again from the Nets Easy portal (**Company** **->** **Integrations**) and paste it fresh.
3. Enable **Debug Mode** and attempt the payment again. Open `administrator/logs/payment_dibseasy.php` and look for the Nets API response — the error message will identify the issue.

### Payment is not completing on return from Nets

**Cause:** This usually has one of two causes: the capture setting is unexpected, or the webhook from Nets is not reaching your site.

**Solution:**

1. Check whether **Auto Capture** is set to **Yes**. If it is set to **No**, the order will be in an authorized state — you need to capture it manually.
2. Confirm your site has a public HTTPS URL. Nets cannot deliver webhooks to a server on a private network or `localhost`. Without the webhook, the plugin relies entirely on the customer return URL.
3. Enable **Debug Mode** and check the log file. A successful authorization from Nets will appear as a `GET /v1/payments/[paymentId]` response with a `payment.summary` object. If that log entry is missing, the return URL handler was not reached.

### The order amount sent to Nets looks wrong (wrong currency or value)

**Cause:** The plugin converts the order total to minor units (for example, EUR 19.90 becomes 1990). A misconfigured currency in J2Commerce can produce an incorrect multiplier.

**Solution:**

1. Go to **J2Commerce** **->** **Setup** **->** **Currencies** and confirm the active currency has the correct number of **Decimal Places** (2 for EUR/DKK/NOK/SEK, etc.).
2. If you use multi-currency, confirm the **Currency Value** (exchange rate) for each active currency is current.
3. Check the Debug log — the request sent to Nets includes the `amount` field in minor units. Compare it against the expected value for your test order.

### Payment method does not appear at checkout for certain customers

**Cause:** A geozone restriction, minimum subtotal, or maximum subtotal is filtering it out.

**Solution:** Review the **Geo Zone**, **Minimum Order Subtotal**, and **Maximum Order Subtotal** fields in the plugin settings. Leave all three blank to show DIBS Easy to all customers without restriction.

### Order status is stuck on "Pending" after a successful payment

**Cause:** Nets delivered the webhook but the plugin did not process it, or the webhook was not delivered at all.

**Solution:**

1. Ensure your site URL is publicly reachable over HTTPS — Nets skips webhooks on localhost.
2. Check that no firewall, CDN WAF, or Joomla security plugin is blocking POST requests to `index.php?option=com_ajax&...`.
3. Enable **Debug Mode** and place a new test order. Look for webhook-related log entries. If the webhook arrives but fails, the error message will appear in the log.
4. You can also manually update the order status from **J2Commerce** **->** **Orders** while you investigate.

---

## Related Topics

- [Payment Methods overview](../payment-methods/index.md)
- [Geo Zones](../localization/geozones.md)
- [Currencies](../localization/currencies.md)
- [Order management](../sales/orders.md)
- [Order Statuses](../setup/order-statuses.md)
