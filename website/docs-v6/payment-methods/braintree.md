---
title: "Braintree Payment"
sidebar_label: "Braintree"
sidebar_position: 20
description: "Accept credit cards, digital wallets, and subscription payments in J2Commerce using the Braintree payment gateway from PayPal."
---

# Braintree Payment

Braintree lets your store accept credit and debit cards using a PCI-compliant form that never sends raw card numbers to your server. Because the card data is tokenized in the customer's browser by the Braintree JavaScript SDK, your server only ever sees a short-lived payment nonce.

You can choose between two form styles: **Hosted Fields** (a customizable card form that blends into your checkout design) or **Drop-in UI** (a ready-made form with multiple payment method tabs that Braintree builds for you automatically). Both styles support 3D Secure 2 (3DS2) authentication, which is required for European stores under PSD2/SCA rules.

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

---

## Supported Features

- Credit and debit cards — Visa, Mastercard, American Express, Discover
- Hosted Fields (customizable card inputs, matches your site design)
- Drop-in UI (Braintree-managed multi-method form, includes wallets where available)
- 3D Secure 2 / SCA authentication (enforced automatically)
- Multi-currency via Braintree merchant account routing (currency matched automatically)
- Subscriptions — initial charge + stored customer token for manual-confirm renewal
- Parameterized SQL and proper order-status-change events throughout

---

## Prerequisites

Before installing the plugin, confirm the following:

- J2Commerce 6 is installed and active on your Joomla site
- PHP extensions are available: **curl**, **openssl**, **dom**, **hash**, **xmlwriter** — the installer checks these and blocks installation if any are missing
- You have a Braintree merchant account (both a **Sandbox** account for testing and a **Production** account for real payments)
- Your server can reach `api.braintreegateway.com` (production) and `api.sandbox.braintreegateway.com` (sandbox) outbound on port 443

---

## Get Your Braintree Credentials

You need three values from Braintree: **Merchant ID**, **Public Key**, and **Private Key**. These are different for Sandbox and Production environments, so collect both sets.

### Sandbox (Testing) Credentials

1. Go to [sandbox.braintreegateway.com](https://sandbox.braintreegateway.com) and sign in (or create a free sandbox account — no credit card required).
2. In the left sidebar, click **Settings** -> **API Keys**.
3. Click **Generate New API Key** if you have none, or use an existing one.
4. Click **View** next to the key you want to use.
5. Copy the three values shown: **Merchant ID**, **Public Key**, and **Private Key**.

<!-- SCREENSHOT: Braintree sandbox API Keys page showing Merchant ID, Public Key, Private Key -->

### Production (Live) Credentials

1. Go to [www.braintreegateway.com](https://www.braintreegateway.com) and sign in to your live Braintree Control Panel.
2. In the left sidebar, click **Settings** -> **API Keys**.
3. Click **Generate New API Key** or use an existing one.
4. Click **View** next to the key you want.
5. Copy the **Merchant ID**, **Public Key**, and **Private Key** for the live environment.

:::caution

Never share your **Private Key** publicly. Treat it like a password — it authorizes real charges on your account.

:::

---

## Purchase and Download

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate the **Braintree Payment** plugin.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account menu and download the `payment_braintree.zip` file.

---

## Install and Enable

### Install the Plugin

1. In the Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Upload the `payment_braintree.zip` file using the **Upload Package File** tab.
3. The installer checks for required PHP extensions and confirms the installation is complete.

<!-- SCREENSHOT: Joomla Extension Install screen with Upload Package File tab selected -->

### Enable the Plugin

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods**.
2. Find **Braintree** in the list.
3. Click the toggle (red X) in the **Enabled** column — it turns green. The plugin is now active.

<!-- SCREENSHOT: J2Commerce Payment Methods list showing Braintree with the toggle -->

---

## Configuration Walkthrough

Click the **Braintree** payment method title to open the settings. Settings are organized into five tabs.

<!-- SCREENSHOT: Braintree plugin settings page showing the five tabs: Basic, Live, Sandbox, Messages, Advanced -->

### Basic Settings

<!-- SCREENSHOT: Basic tab with Display Name, Payment Image, Sandbox toggle, Payment Type, and Accepted Cards fields -->

| Field | Description | Recommended Value |
|-------|-------------|-------------------|
| **Display Name** | Label shown to customers at checkout when selecting their payment method | `Credit Card` or `Pay by Card` |
| **Payment Image** | URL or path to an image shown next to the payment method name | Leave blank to show the accepted card icons instead |
| **Sandbox** | Switch between test (Sandbox) and live (Production) modes | **Yes** while testing; **No** when going live |
| **Payment Type** | Choose the checkout UI style — see [Hosted Fields vs Drop-in UI](#hosted-fields-vs-drop-in-ui) below | `Hosted Fields` for design-consistent stores |
| **Accepted Card Types** | Cards shown as accepted icons during payment method selection | Select all cards your Braintree account accepts |

:::info

When **Sandbox** is set to **Yes**, the plugin reads the Sandbox credentials tab. When set to **No**, it reads the Live credentials tab. Make sure each set of credentials is filled in before switching modes.

:::

---

### Live Credentials

These settings are used when **Sandbox** is set to **No**.

<!-- SCREENSHOT: Live tab showing Merchant ID, Public Key, Private Key, and Merchant Account ID fields -->

| Field | Description |
|-------|-------------|
| **Live Merchant ID** | Your production Merchant ID from the Braintree Control Panel |
| **Live Public Key** | Your production Public Key |
| **Live Private Key** | Your production Private Key (stored encrypted) |
| **Live Merchant Account ID** | Auto-populated list of merchant accounts on your live Braintree account — select which account to charge for each currency |

The **Live Merchant Account ID** field queries the Braintree API using your live credentials and shows a table of your configured merchant accounts. If your account has only one currency, you can leave this on the default. If you process multiple currencies, see [Multi-Currency Merchant Accounts](#multi-currency-merchant-accounts) below.

---

### Sandbox Credentials

These settings are used when **Sandbox** is set to **Yes**.

<!-- SCREENSHOT: Sandbox tab showing Test Merchant ID, Test Public Key, Test Private Key, and Test Merchant Account ID fields -->

| Field | Description |
|-------|-------------|
| **Test Merchant ID** | Your sandbox Merchant ID from sandbox.braintreegateway.com |
| **Test Public Key** | Your sandbox Public Key |
| **Test Private Key** | Your sandbox Private Key |
| **Test Merchant Account ID** | Auto-populated list of merchant accounts on your sandbox — works the same way as the live version |

---

### Messages

These optional text fields let you add instructions or confirmation text at different points during checkout.

<!-- SCREENSHOT: Messages tab with four text areas and button text field -->

| Field | When Displayed | Example Use |
|-------|----------------|-------------|
| **On Selection** | When the customer picks Braintree as their payment method | "Your card details are encrypted and never stored on our servers." |
| **On Before Payment** | On the payment form page, above the card input | "Enter your card details below to complete your order securely." |
| **On After Payment** | On the confirmation page after a successful payment | "Thank you — your payment was received and your order is confirmed." |
| **On Error Payment** | When a payment fails or is declined | "There was a problem processing your payment. Please check your card details and try again." |
| **Button Text** | The label on the Pay button | `Place Order` or `Pay Now` |

All fields accept plain text or a Joomla language key. Leave fields blank to show no additional message.

---

### Advanced Settings

<!-- SCREENSHOT: Advanced tab with Debug, Order Status, Failed Status, Pending Status, Geo-Zone, Show Tax, and Tax Profile fields -->

| Field | Description | Default |
|-------|-------------|---------|
| **Debug** | Write detailed Braintree API activity to `administrator/logs/payment_braintree.php` | No |
| **Order Status** | The status applied to an order after a successful payment (e.g., authorized, settled) | Confirmed |
| **Failed Status** | The status applied when Braintree returns a declined or failed transaction | Failed |
| **Pending Status** | The status applied when Braintree reports `settlement_pending` (funds not yet settled) | Pending |
| **Geo-Zone** | Restrict Braintree to customers in a specific geo-zone. Leave at "All" to show it to everyone | All |
| **Show Tax** | Display the tax amount as a separate line on the payment page | No |
| **Tax Profile** | The tax profile to apply when **Show Tax** is enabled | None |

:::tip

Enable **Debug** only while troubleshooting. The log file can grow quickly in a busy store. Always disable it before going live.

:::

---

## Hosted Fields vs Drop-in UI

The **Payment Type** setting controls which checkout experience customers see.

### Hosted Fields (Recommended)

Hosted Fields renders individual card number, expiry date, and CVV inputs that are iframes hosted on Braintree's servers. From the customer's perspective the form looks like part of your site and you can style it to match your colors and fonts. Card data never touches your PHP — only a short-lived nonce is submitted.

**Choose Hosted Fields when:**
- You want the card form to match your site's design closely
- You need consistent branding across all screen sizes
- You want the most control over layout and styling

### Drop-in UI

Drop-in UI is a pre-built form widget that Braintree injects into your checkout page. It automatically displays relevant payment methods based on what Braintree has enabled for your account and the customer's region. This can include saved cards (for returning customers) and additional wallet options.

**Choose Drop-in UI when:**
- You want a zero-configuration payment UI with no CSS work
- You want Braintree to handle showing saved payment methods to returning customers automatically
- Speed of setup is more important than design consistency

---

## Multi-Currency Merchant Accounts

Braintree supports accepting payments in multiple currencies by routing each charge to the merchant account that matches the order currency. The plugin handles this automatically.

When you enter your API credentials and save the settings, the **Merchant Account ID** field queries the Braintree API and populates a table showing all merchant accounts on your Braintree account, each with its currency. The plugin automatically matches the order currency to the correct merchant account at charge time.

**To set this up:**

1. In your Braintree Control Panel, create a separate merchant account for each currency you want to accept (e.g., USD, EUR, GBP). Braintree's support team can help with this.
2. Enter your API credentials in the J2Commerce plugin and save.
3. Open the plugin settings again — the **Merchant Account ID** table now shows your accounts.
4. If you process charges in a currency that has no matching merchant account, the default merchant account is used (which may cause a currency mismatch error depending on your Braintree configuration).

The same auto-routing applies to Sandbox — add sandbox merchant accounts with different currencies in the Braintree sandbox to test multi-currency flows.

---

## Sandbox Testing

### Test Cards

Braintree provides standard test card numbers for sandbox testing. These cards are only accepted in sandbox mode and never process real charges.

| Card Number | Type | Result |
|-------------|------|--------|
| `4111 1111 1111 1111` | Visa | Successful payment |
| `5431 1111 1111 1111` | Mastercard | Successful payment |
| `3782 822463 10005` | American Express | Successful payment |
| `6011 1111 1111 1117` | Discover | Successful payment |
| `4000 0000 0000 0002` | Visa | Declined — do not honor |
| `4000 0000 0000 0077` | Visa | Processor declined — insufficient funds |

Use any future expiry date and any 3-digit CVV (4-digit for Amex). Braintree also provides [a full list of test cards](https://developer.paypal.com/braintree/docs/reference/general/testing) on its developer documentation site for testing 3DS challenges, processor-specific declines, and settlement failures.

### Sandbox Testing Checklist

Before switching to live mode, verify each of these flows in your sandbox:

- [ ] Hosted Fields form loads and accepts a test card number
- [ ] Drop-in UI loads (if you plan to use it)
- [ ] A successful payment updates the order status to your configured **Order Status**
- [ ] A declined card (use `4000 0000 0000 0002`) updates the order status to your configured **Failed Status**
- [ ] The order confirmation page displays the **On After Payment** message you configured
- [ ] A 3DS challenge test card triggers the verification step (see Braintree docs for test 3DS card numbers)
- [ ] If you sell subscriptions, a subscription product checkout stores the customer token and the order status updates correctly

---

## Going Live Checklist

Before switching **Sandbox** to **No** and accepting real payments:

- [ ] **Sandbox** field is set to **No**
- [ ] Your live **Merchant ID**, **Public Key**, and **Private Key** are entered in the **Live** tab
- [ ] You have completed Braintree's merchant verification and your live account is approved
- [ ] The **Merchant Account ID** table has loaded and shows your production merchant accounts
- [ ] You have placed one real transaction with a small amount (e.g., $1.00) and verified it appears in your Braintree Control Panel
- [ ] You have confirmed the order status in J2Commerce matches the configured **Order Status**
- [ ] **Debug** mode is set to **No**
- [ ] You have tested a declined card in live mode (use a card with insufficient funds, then cancel in your Braintree Control Panel)
- [ ] If selling subscriptions, you have confirmed the renewal manual-confirm flow works as expected

---

## Subscriptions

When a customer purchases a subscription product, the plugin:

1. Creates a Braintree **Customer** record on your Braintree account using the payment nonce from checkout.
2. Saves the **Customer ID** and **Payment Token** to the `#__j2commerce_paymentprofiles` table in your database (linked to the customer's Joomla user account).
3. Charges the initial order amount immediately.

For subscription **renewals**, the plugin uses the stored payment token to attempt a charge without requiring the customer to re-enter card details. The renewal is triggered by the J2Commerce subscription system.

:::info

**Phase 1 limitation:** In J2Commerce 6.0.0, subscription renewal requires manual confirmation — a store admin reviews and triggers each renewal charge. Fully automatic (unattended) renewal is planned for a future release.

:::

If the stored payment token is no longer valid (expired card, account closed), the renewal fails and the subscription status is updated to Failed. The customer receives an email notification and must update their payment details.

---

## What Is New in J2Commerce 6

The J2Commerce 6 version of this plugin includes the following improvements over the original J2Store version:

| Area | Change |
|------|--------|
| **Order status events** | Status changes now route through `OrderModel::updateOrderStatus()` so the `onJ2CommerceOrderStatusChange` event fires correctly — enabling email notifications, webhooks, and third-party listeners |
| **Parameterized SQL** | All database queries use bound parameters — no string concatenation of user values |
| **Vanilla JavaScript** | The card form and Drop-in UI JavaScript has been rewritten without jQuery — works independently of any jQuery version on your site |
| **3DS2 enforced** | The original J2Store plugin did not send 3DS options in its charge requests. The J2Commerce 6 version enforces `threeDSecure: required` for both Hosted Fields and Drop-in UI |
| **`byReference` typo fixed** | The original plugin had a method named `byRefference` (double-f typo) that caused fatal errors on subscription renewals. This is corrected in J2Commerce 6 |
| **Shared payment profiles table** | Customer tokens are stored in `#__j2commerce_paymentprofiles` (shared with other payment plugins) instead of the metafields blob — cleaner and queryable |
| **SDK pinned to current LTS** | The vendored Braintree PHP SDK is pinned to a specific LTS release. The original J2Store plugin shipped an unknown SDK commit with no version pin |
| **CSRF refresh after AJAX login** | If a customer logs in during checkout via an AJAX call, the plugin refreshes the CSRF token in the JS context before the next request — prevents 403 errors on the payment submission |

---

## Troubleshooting

### Payment form does not appear at checkout

**Cause:** Missing or incorrect API credentials, or a PHP extension is unavailable.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** and confirm Braintree is enabled.
2. Open the plugin settings and check that the Merchant ID, Public Key, and Private Key are entered in the correct tab (**Sandbox** or **Live**) for your current mode.
3. Enable **Debug** and check `administrator/logs/payment_braintree.php` for a gateway initialization error.
4. Check your server's PHP info to confirm the **curl**, **openssl**, **dom**, **hash**, and **xmlwriter** extensions are loaded.

<!-- SCREENSHOT: J2Commerce Payment Methods list with Braintree enabled and settings open -->

### "Invalid token" error when submitting payment

**Cause:** The client token generated by Braintree has expired (tokens are short-lived) or the gateway credentials are wrong.

**Solution:**

1. Verify you are using the correct credential set — Sandbox credentials when **Sandbox** is **Yes**, live credentials when **Sandbox** is **No**.
2. Reload the checkout page to get a fresh client token.
3. If the error persists, enable **Debug** and check the log for the specific Braintree exception message.

### 3DS challenge page does not appear for EU customers

**Cause:** 3DS2 is enforced by the plugin but your Braintree account may need 3DS enabled at the account level.

**Solution:**

1. Log in to your Braintree Control Panel and confirm that 3D Secure is enabled for your merchant account (go to **Settings** -> **Processing**).
2. Contact Braintree support if the option is not visible — some account types require manual activation.

### Order stays in "Pending" after a card is charged

**Cause:** The transaction status returned by Braintree is `settlement_pending`, which means the charge is authorized but not yet settled. The plugin sets the order to your configured **Pending Status** in this case.

**Solution:**

This is normal behavior for some card types and regions. The order will automatically move to **Confirmed** (or your configured **Order Status**) once Braintree settles the transaction, provided the order status is updated again — either by re-running the payment check or via a future webhook integration (webhooks are planned for a future release).

### Wrong credentials error in Sandbox mode

**Cause:** Live credentials are entered in the Sandbox tab (or vice versa).

**Solution:**

Braintree Sandbox and Production use completely separate credential sets. The Sandbox Merchant ID, Public Key, and Private Key from `sandbox.braintreegateway.com` will not work against the live API, and vice versa. Double-check which environment each key belongs to.

### PHP extension missing — installer blocked

**Cause:** One or more of the required PHP extensions (`curl`, `openssl`, `dom`, `hash`, `xmlwriter`) is not enabled on your server.

**Solution:**

1. Contact your hosting provider and ask them to enable the missing extension(s).
2. After enabling, re-upload the `payment_braintree.zip` in Joomla's Extension Installer.

---

## Support

- **J2Commerce documentation:** [docs.j2commerce.com](https://docs.j2commerce.com)
- **J2Commerce support:** [www.j2commerce.com](https://www.j2commerce.com/support)
- **Braintree Control Panel:** [www.braintreegateway.com](https://www.braintreegateway.com)
- **Braintree developer documentation:** [developer.paypal.com/braintree/docs](https://developer.paypal.com/braintree/docs)
- **Braintree sandbox:** [sandbox.braintreegateway.com](https://sandbox.braintreegateway.com)
