---
title: "CardSave / Worldpay Legacy Gateway"
sidebar_label: "CardSave (Legacy)"
sidebar_position: 85
description: "How to configure the CardSave legacy payment gateway plugin for J2Commerce. For existing merchants with pre-acquisition CardSave credentials only. Covers hosted and direct checkout modes, PCI scope, surcharges, and troubleshooting."
---

# CardSave / Worldpay Legacy Gateway

> **Legacy gateway — new sign-ups are not possible.**
> This plugin is for store owners who already hold active pre-acquisition CardSave merchant credentials. If you do not have existing CardSave credentials, this plugin will not work. See [Migrating away from CardSave](#migrating-away-from-cardsave).

This plugin connects J2Commerce to the CardSave payment gateway. It supports both a hosted payment page (low PCI scope) and an on-site card form via SOAP (high PCI scope).

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

---

## What is CardSave?

CardSave started life as Streamline, a UK card acquiring service. The brand was re-launched as Cardsave Online Payments and grew into a popular choice for small and medium UK businesses throughout the 2000s. Worldpay acquired CardSave in 2010 and continued to operate the `cardsaveonlinepayments.com` infrastructure for existing merchants. Worldpay itself was later acquired by FIS in 2019, becoming FIS Worldpay. In 2024, Worldpay was spun off again as an independent company following a private equity buyout.

Through all of these ownership changes, the legacy CardSave gateway endpoints have been kept running to support grace-period merchants. However, **new merchant sign-ups are not available** through any of these entities using the original CardSave V1 SOAP API. If you are setting up a new store, do not attempt to obtain CardSave credentials — the gateway is feature-frozen and no new accounts are issued.

**This plugin is a legacy bridge.** It exists only for merchants who signed up before the acquisition and still hold valid Merchant ID, password, and pre-shared key credentials. If you are one of those merchants, this plugin lets you keep your existing gateway integration working on J2Commerce without changing your banking relationship. When you are ready to migrate, see [Migrating away from CardSave](#migrating-away-from-cardsave).

---

## Two payment modes

The plugin supports two ways of taking payment. Choose the one that matches your PCI compliance status.

### Hosted Payment Page (recommended)

When the customer reaches the payment step, they are redirected to a secure form hosted by CardSave/Worldpay at `mms.cardsaveonlinepayments.com`. They enter their card details there, not on your site. When payment is complete, CardSave redirects them back to your store and sends a secure callback to update the order status.

**PCI scope: SAQ-A.** Card data never passes through your server. You are only required to complete a short self-assessment questionnaire (SAQ-A). This is the simplest and least burdensome PCI compliance path.

### Direct SOAP (legacy)

A card entry form is rendered directly on your checkout page. The customer enters their card number, expiry date, CVV, and cardholder name. Your server transmits that data to CardSave via a SOAP API call over an encrypted connection.

**PCI scope: SAQ-D.** Because raw card data flows through your server, you are required to complete a full SAQ-D self-assessment or formal PCI DSS audit. SAQ-D is the most comprehensive compliance level. It covers network security, encryption, access controls, staff training, and regular penetration testing. Only enable this mode if your organisation has already passed SAQ-D.

> **Security warning:** Enabling Direct mode without current SAQ-D compliance exposes you to significant financial and legal liability if a data breach occurs. Use Hosted mode unless you have a confirmed business reason to collect card data on your server.

---

## Prerequisites

Before installing, make sure you have the following:

- **J2Commerce 6.0.0 or later** installed and active on Joomla 6
- **Active pre-acquisition CardSave merchant credentials** — Merchant ID, password, and pre-shared key from your original CardSave welcome email
- **PHP cURL extension** enabled on your server
- **PHP JSON extension** enabled on your server
- **HTTPS (SSL)** on your storefront — required for Direct mode; strongly recommended for Hosted mode

### Where to find your credentials

Your CardSave credentials were emailed when your account was first created. Check for an email from `support@cardsave.net` or `merchants@cardsave.net`. The email typically includes:

- **Merchant ID** — a numeric identifier
- **Password** — your merchant account password
- **Pre-Shared Key** — a separate secret used to sign and verify payment hashes
- **Payment Processor Domain** — usually `cardsaveonlinepayments.com`
- **Payment Processor Port** — usually `4430`

If you cannot locate these details, contact Worldpay merchant support. They inherited all legacy CardSave accounts and may be able to retrieve your credentials.

---

## Installation

This plugin is a separate add-on. It is not included with the core J2Commerce package.

1. Purchase and download the `payment_cardsave.zip` package from the J2Commerce website.
2. In your Joomla administrator, go to **System** -> **Install** -> **Extensions**.
3. Select the **Upload Package File** tab.
4. Upload the `payment_cardsave.zip` file.
5. Joomla installs and enables the plugin automatically.

<!-- SCREENSHOT: Joomla extension installer Upload Package File tab with a green success message after installing payment_cardsave -->

To confirm the plugin is active:

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods**.
2. Confirm **CardSave** appears in the list with a green enabled indicator.

<!-- SCREENSHOT: J2Commerce Payment Methods list showing CardSave enabled with a green status indicator -->

---

## Configuration

Go to **J2Commerce** -> **Payments** -> **Payment Methods** and click **CardSave** to open the settings panel.

<!-- SCREENSHOT: J2Commerce Payment Methods editor for CardSave showing the full settings panel with the sunset warning banner visible at the top -->

### Display

| Field | Description | Default |
|-------|-------------|---------|
| **Display Name** | The label customers see at the payment selection step. | `CardSave` |
| **Display Image** | An optional image displayed next to the payment name. | _(none)_ |

### Payment Mode

| Field | Description | Default | Options |
|-------|-------------|---------|---------|
| **Payment Mode** | How card data is collected. | `Hosted Payment Page (recommended)` | Hosted Payment Page (recommended), Direct SOAP (SAQ-D) |

Use **Hosted Payment Page** unless your organisation has completed PCI SAQ-D certification. See [Two payment modes](#two-payment-modes) above for a full explanation.

<!-- SCREENSHOT: Payment Mode radio switcher showing Hosted Payment Page (recommended) selected -->

### Merchant Credentials

| Field | Description | Default |
|-------|-------------|---------|
| **Merchant ID** | Your CardSave Merchant ID. Find it in your CardSave welcome email. | _(empty)_ |
| **Merchant Password** | Your CardSave account password. Stored securely. | _(empty)_ |
| **Pre-Shared Key** | Your CardSave pre-shared key. Used to sign and verify payment hashes. | _(empty)_ |
| **Payment Processor Domain** | The CardSave/Worldpay gateway domain. | `cardsaveonlinepayments.com` |
| **Payment Processor Port** | The SOAP gateway port. | `4430` |

Leave **Payment Processor Domain** and **Payment Processor Port** at their defaults unless CardSave support has given you different values for your account.

### Hash Method

| Field | Description | Default | Options |
|-------|-------------|---------|---------|
| **Hash Method** | The algorithm used to sign transaction data with CardSave. | `HMAC-SHA1` | HMAC-SHA1, HMAC-MD5, SHA1 (deprecated), MD5 (deprecated) |

**Use HMAC-SHA1.** It incorporates your pre-shared key into the hash calculation, making the signature cryptographically much harder to forge. MD5 and plain SHA1 are included only for merchants whose CardSave account was originally configured with those methods. If your account supports HMAC-SHA1, switch to it — contact Worldpay support to update your account's hash configuration if needed.

### Order Description

| Field | Description | Default |
|-------|-------------|---------|
| **Order Description** | Text sent to CardSave alongside each transaction. Appears in your Worldpay merchant dashboard for reconciliation. | `Order Id - [ORDERID]` |

Use `[ORDERID]` and `[INVOICE_NO]` as placeholders. The plugin replaces them with the actual order ID and invoice number at runtime. For example, `Order [ORDERID] - Inv [INVOICE_NO]` becomes `Order 1042 - Inv INV-1042` in your merchant dashboard.

### Order Statuses

| Field | Description | Default |
|-------|-------------|---------|
| **Authorized Order Status** | Status applied when CardSave approves payment. | `Confirmed` |
| **Declined Order Status** | Status applied when CardSave declines payment or an error occurs. | `Failed` |
| **Pending Order Status** | Status applied when 3D Secure authentication is pending (CardSave status code 3). | `Pending` |

All three status transitions route through J2Commerce's order status pipeline. This means notifications, order history entries, invoice emails, and digital download grants fire automatically on every change. Go to **J2Commerce** -> **Setup** -> **Order Statuses** to see and edit the available statuses.

### Surcharge (optional)

Add an optional surcharge for customers paying with CardSave. Leave all fields blank or at zero to skip it.

| Field | Description | Default |
|-------|-------------|---------|
| **Surcharge Name** | Label shown on the order summary. Example: `Card Processing Fee`. | _(empty)_ |
| **Surcharge Percent** | Percentage of the order subtotal charged as a fee. Example: `1.5` for 1.5%. | _(empty)_ |
| **Surcharge Fixed** | Fixed amount charged as a fee. Example: `0.25` for £0.25. | _(empty)_ |
| **Surcharge Tax Class** | Tax profile applied to the surcharge, if applicable. | _(none)_ |

You can combine percent and fixed surcharges. Both are added together.

### Subtotal Limits (optional)

| Field | Description | Default |
|-------|-------------|---------|
| **Minimum Order Total** | Hide this payment method if the cart subtotal is below this amount. Set `0` to disable. | `0` |
| **Maximum Order Total** | Hide this payment method if the cart subtotal is above this amount. Set `-1` to disable. | `-1` |

### Geozone Restriction (optional)

| Field | Description | Default |
|-------|-------------|---------|
| **Geozone Restriction** | Limit this payment method to customers in a specific geozone. | _(none — available everywhere)_ |

Select a geozone to restrict CardSave to customers in that geographic area. Leave blank to offer it worldwide. Create and manage geozones in **J2Commerce** -> **Setup** -> **Geozones**.

### Thank-You Article (optional)

| Field | Description | Default |
|-------|-------------|---------|
| **Thank You Message Article** | A Joomla article displayed on the order confirmation page after a successful payment. | _(none)_ |

### Custom HTML Snippets (optional)

These fields let you display a message to the customer at specific stages of checkout. All are optional. Most stores leave them blank.

| Field | When it is shown |
|-------|-----------------|
| **On Selection** | Immediately after the customer selects CardSave, before they click to proceed. Useful for displaying accepted card logos or payment instructions. |
| **On Before Payment** | Shown on the payment detail step, before the customer submits card data. |
| **On After Payment** | Shown on the confirmation page after a successful payment. |
| **On Error Payment** | Shown when a payment error occurs. Add support contact details here. |
| **On Cancel Payment** | Shown if the customer cancels from the hosted payment page and returns to your store. |

### Checkout Button Text

| Field | Description | Default |
|-------|-------------|---------|
| **Button Text** | Label on the payment submit button. | `Place Order` |

### Admin Notification Group

| Field | Description | Default |
|-------|-------------|---------|
| **Admin Group** | Joomla user group whose members receive email alerts when a payment cannot be validated. | `Super Users` |

When CardSave returns an invalid or failed transaction response, J2Commerce emails all members of this group. The email includes error details and scrubbed transaction data (card numbers are never included). Ensure the users in this group have **Receive System Emails** enabled in their Joomla user account.

### Debug Logging

| Field | Description | Default |
|-------|-------------|---------|
| **Debug Mode** | Write plugin activity and transaction data to the Joomla log file. | `No` |

Enable debug temporarily when investigating payment issues. Logs are written to `administrator/logs/plg_j2commerce_payment_cardsave.log.php`. Card numbers and CVV values are scrubbed before logging. Disable debug mode in production once your investigation is complete — logs contain transaction details and should be treated as sensitive.

### Layout Template

| Field | Description | Default |
|-------|-------------|---------|
| **Subtemplate** | Frontend framework layout used for the payment form. | _(auto-detected from your active app plugin)_ |

Leave blank to use your store's active subtemplate (Bootstrap 5 or UIkit). Change this only if you have custom layout overrides.

---

## Test transactions

CardSave does not offer a publicly available sandbox environment. Testing requires merchant test credentials that CardSave provided when your account was first set up. Check your original CardSave welcome documentation for test Merchant ID and password values.

If you have test credentials:

1. Enter the test **Merchant ID**, **Password**, and **Pre-Shared Key** in the plugin settings.
2. Use the test **Payment Processor Domain** and **Port** supplied by CardSave support (these differ from the live values).
3. Place a test order through your storefront.
4. Confirm the order status updates in **J2Commerce** -> **Sales** -> **Orders**.

If you do not have test credentials, you can do a limited configuration check:

1. Enable **Debug Mode** in the plugin settings.
2. Navigate to your checkout and add an item to the cart.
3. Confirm the CardSave payment option appears at the payment selection step.
4. Check `administrator/logs/plg_j2commerce_payment_cardsave.log.php` for any configuration errors before you have entered card data.

Disable **Debug Mode** before going live.

---

## Order lifecycle

### Hosted mode (recommended)

```
Customer selects CardSave at checkout
    |
    v
J2Commerce shows a summary and a "Place Order" button
(On Before Payment message is displayed)
    |
    v
Customer clicks "Place Order"
    |
    v
J2Commerce builds a signed request and redirects customer
to mms.cardsaveonlinepayments.com (the CardSave hosted page)
    |
    v
Customer enters card details on the CardSave page
(Card data never touches your server)
    |
    v
CardSave processes the payment, then triggers SERVER_PULL callback
to your site to verify and record the result
    |
    +--- Payment approved ---> Order status set to Authorized Order Status
    |                          Confirmation email sent
    |                          Customer shown On After Payment message
    |
    +--- Payment declined ---> Order status set to Declined Order Status
                               Admin notification email sent
                               Customer shown On Error Payment message
```

### Direct SOAP mode (SAQ-D)

```
Customer selects CardSave at checkout
    |
    v
J2Commerce renders an on-site card entry form
(On Before Payment message is displayed)
    |
    v
Customer enters card number, expiry, CVV, cardholder name
    |
    v
Form submits card data to your server via AJAX (CSRF-verified)
    |
    v
Your server calls CardSave SOAP API (gw1/gw2/gw3.cardsaveonlinepayments.com:4430)
    |
    +--- Payment approved (status 0) ----> Order status set to Authorized Order Status
    |                                      Confirmation email sent
    |
    +--- 3DS pending (status 3) ---------> Order status set to Pending Order Status
    |                                      Manual review required in Worldpay portal
    |
    +--- Declined (status 4/5/30) -------> Order status set to Declined Order Status
                                           Admin notification email sent
```

---

## PCI compliance notes

### Hosted mode — SAQ-A

When you use **Hosted Payment Page** mode, your store qualifies for PCI SAQ-A. This is the shortest self-assessment questionnaire (about 22 yes/no questions). The main requirements are that your checkout page is delivered over HTTPS and that you do not store, process, or transmit cardholder data in any way. The plugin satisfies these requirements by redirecting customers to CardSave's servers for card entry.

### Direct mode — SAQ-D

When you use **Direct SOAP** mode, raw card data (PAN, CVV, expiry) passes through your server. This places your entire server environment in PCI scope. SAQ-D requires:

- Formal network security controls (firewalls, IDS/IPS)
- Encryption of card data in transit and at rest
- Strict access control policies
- Regular vulnerability scans and penetration tests
- Staff security awareness training

**The plugin masks PAN and CVV in all debug logs and admin notification emails.** PanScrubber scrubs any field name matching card number or CVV patterns before logging. However, masking in logs does not remove your server from PCI scope. The data still passes through your server's memory during processing.

Only enable Direct mode if your organisation has a current, signed PCI SAQ-D or equivalent formal assessment on file.

---

## Sunset notice for new merchants

CardSave V1 is feature-frozen. Worldpay no longer issues new credentials for this API. The following features are **not supported** and will not be added:

- Apple Pay and Google Pay
- 3DS2 step-up challenge (full browser redirect for card authentication)
- Stored cards or customer payment profiles
- Webhooks or asynchronous notifications
- Recurring billing via card tokenisation

If you are setting up a new store, choose a modern J2Commerce payment plugin instead. Options available on the J2Commerce Extensions Store include Stripe, PayPal Complete (PPCP), and Square — all actively maintained, 3DS2-compliant, and supporting Apple Pay and Google Pay.

---

## What is new in J2Commerce 6

The following changes were made when migrating this plugin from J2Store v4 to J2Commerce 6.

- **PAN and CVV are no longer logged.** The original J2Store plugin wrote the full card number and CVV to `cache/payment_cardsave.log` in some scenarios (a PCI-DSS Requirement 3.2 violation). The J2Commerce version scrubs all card-identifying data from logs and admin emails using a recursive field-name scanner.
- **PSR-compliant logging replaces raw file writes.** Logs now use the Joomla `Log` API and are written to `administrator/logs/`, consistent with other Joomla extensions. The old `fopen()`-based cache log is gone.
- **Hosted mode is now the default.** The J2Store plugin defaulted to Direct mode (SAQ-D). The J2Commerce version defaults to Hosted mode (SAQ-A) — the safer choice for most merchants.
- **Merchant Password and Pre-Shared Key fields are now password-type inputs.** In J2Store, these were plaintext text fields visible in the browser. They are now masked in the admin panel.
- **HMAC-SHA1 is now the default hash method.** The J2Store plugin defaulted to plain SHA1, which is cryptographically broken when used as a keyed hash. HMAC-SHA1 is the default in J2Commerce. Legacy options (SHA1, MD5) are still available for accounts configured with those methods, but they are labelled deprecated.
- **Order status changes fire the full J2Commerce event pipeline.** The J2Store plugin wrote order statuses directly to the database, bypassing all event listeners. The J2Commerce version routes all status changes through `OrderModel::updateOrderStatus()`, which fires `onJ2CommerceOrderStatusChange`. This means notifications, order history entries, invoice emails, and digital download grants all work correctly.
- **Configurable admin notification group.** In J2Store, error notification emails were sent to a hardcoded Super Users group. The J2Commerce version lets you choose any Joomla user group via the **Admin Group** setting.
- **Surcharge support.** Percent and fixed surcharges with optional tax class assignment are now available, consistent with other J2Commerce payment plugins.
- **Geozone restriction.** The plugin now supports geographic restriction via the standard J2Commerce GeoZone field, so you can limit CardSave to specific countries or regions.
- **Per-stage customer messages.** Five rich-text fields (On Selection, On Before Payment, On After Payment, On Error, On Cancel) let you customise what customers see at each step.
- **UIkit template support.** The plugin renders correctly in both Bootstrap 5 and UIkit store themes. The **Subtemplate** field lets you explicitly choose if needed.
- **Minimum and maximum order subtotal limits.** Hide the payment method for orders below or above defined thresholds, consistent with other J2Commerce payment plugins.
- **`generateStringToHash2()` return bug fixed.** In the J2Store plugin, the 3DS hash string function built its return value but never returned it — the 3DS integrity check always failed silently. The J2Commerce version returns the string correctly.

---

## Going live

Once you have confirmed your configuration is correct:

1. Enter your live **Merchant ID**, **Merchant Password**, and **Pre-Shared Key**.
2. Confirm **Hash Method** matches what is configured on your CardSave account.
3. Confirm **Payment Mode** is set to **Hosted Payment Page (recommended)** unless you have a specific reason for Direct mode.
4. Confirm **Payment Processor Domain** is `cardsaveonlinepayments.com` and **Port** is `4430`.
5. Click **Save & Close**.
6. Place a real low-value test order to confirm the end-to-end flow.
7. Confirm the order status in **J2Commerce** -> **Sales** -> **Orders** updates to your **Authorized Order Status**.
8. Disable **Debug Mode** if you had it enabled.

---

## Troubleshooting

### "The payment response could not be validated" or "Hash digests don't match"

**Cause:** The hash your server computes does not match the hash CardSave sends back. This means the **Pre-Shared Key** or **Hash Method** does not match what is configured on your CardSave account.

**Solution:**
1. Check that **Pre-Shared Key** contains exactly the key from your CardSave welcome email, with no leading or trailing spaces.
2. Confirm **Hash Method** matches your account's setting. Older accounts may use SHA1 or MD5. Contact Worldpay support if you are unsure which method your account uses.
3. Enable **Debug Mode**, trigger the error, and check the log file at `administrator/logs/plg_j2commerce_payment_cardsave.log.php` for the raw hash string to compare.

### "Merchant ID is missing or invalid" or "Merchant password is missing or invalid"

**Cause:** The **Merchant ID** or **Merchant Password** fields are empty, or contain incorrect values.

**Solution:** Re-enter the credentials from your original CardSave welcome email. Save the settings and test again. Make sure there are no extra spaces before or after the values.

### "The order could not be found or is invalid" after returning from the CardSave payment page

**Cause:** The order session expired, the order ID was not passed back correctly, or the gateway timed out before the SERVER_PULL callback completed.

**Solution:**
1. Enable **Debug Mode** and reproduce the issue.
2. Check the log file for the order ID returned by CardSave and compare it with the order in **J2Commerce** -> **Sales** -> **Orders**.
3. If the order exists in J2Commerce but the status was not updated, the SERVER_PULL callback may not have reached your site. See the next troubleshooting entry.

### Payment approved by CardSave but order status not updated in J2Commerce

**Cause:** The SERVER_PULL callback from CardSave could not reach your server. This happens when your site is behind a firewall that blocks external requests, when the server IP is not on an allowed list, or when the site is on a local or staging server inaccessible from the internet.

**Solution:**
1. Confirm your site is publicly reachable from the internet on a standard HTTPS port.
2. If you have a firewall or reverse proxy, check whether it is blocking incoming requests from Worldpay/CardSave IP ranges.
3. Enable **Debug Mode** and check the log file for any callback activity. If no callback log entries appear, the callback is not arriving.
4. If the payment was confirmed in your Worldpay merchant dashboard but not in J2Commerce, manually update the order status in **J2Commerce** -> **Sales** -> **Orders**.

### "An invalid response was received from the payment gateway" (Direct mode only)

**Cause:** The SOAP API call to CardSave failed. Possible causes are incorrect credentials, incorrect domain or port, or the CardSave SOAP endpoint being unreachable.

**Solution:**
1. Verify all merchant credential fields are correct and contain no extra spaces.
2. Confirm **Payment Processor Domain** is `cardsaveonlinepayments.com` and **Port** is `4430`.
3. Enable **Debug Mode** and check the log for the SOAP response detail — it will indicate whether the connection failed entirely or whether CardSave returned a specific error code.
4. Contact Worldpay support to confirm your account is still active and the SOAP endpoint is accepting requests.

### Card declined — CardSave returns status code 5 or 30

**Cause:** Status code 5 means the card was declined by the issuing bank. Status code 30 means a processing error occurred on the CardSave side.

**Solution:**
1. Enable **Debug Mode** and note the `CrossRef` value from the transaction log.
2. Ask the customer to try a different card or contact their bank.
3. For status code 30 errors, contact Worldpay support with the `CrossRef` value — they can look up the transaction in their system and identify the cause.

### 3DS pending — order stuck in Pending status

**Cause:** CardSave returned status code 3, meaning the card requires a 3D Secure challenge. The CardSave V1 SOAP API does not implement the full 3DS2 browser redirect step-up flow. The plugin sets the order to Pending status and stops there.

**Solution:**
1. Log in to your Worldpay merchant portal and check the status of the transaction.
2. If the card challenge completed successfully in the Worldpay portal, manually set the order status to your **Authorized Order Status** in **J2Commerce** -> **Sales** -> **Orders**.
3. Contact the customer to let them know the payment is under review.

### Admin error notification emails not arriving

**Cause:** Either the **Admin Group** setting does not match the correct user group, or the users in that group do not have **Receive System Emails** enabled in their Joomla user account.

**Solution:**
1. Go to **J2Commerce** -> **Payments** -> **Payment Methods**, open CardSave, and confirm **Admin Group** is set to the group containing your store managers.
2. Go to **System** -> **Manage** -> **Users**. Open each user in the admin group and confirm the **Receive System Emails** toggle is set to **Yes**.

---

## Migrating away from CardSave

Because the CardSave brand is discontinued and legacy accounts may be restricted or closed without notice by Worldpay, migrating to an actively maintained gateway is strongly recommended when you have the opportunity.

Modern J2Commerce payment plugins are available from the [J2Commerce Extensions Store](https://www.j2commerce.com). Options include Stripe, PayPal Complete (PPCP), Square, and others — all actively maintained, supporting 3DS2, Apple Pay, Google Pay, and modern tokenised checkout flows.

General migration steps:

1. Sign up with your chosen replacement gateway and obtain API credentials.
2. Install the corresponding J2Commerce payment plugin.
3. Test with a sandbox or test account to confirm the full checkout flow works.
4. Switch the new gateway to live credentials and place a real low-value test order.
5. Disable the CardSave plugin once all pending orders have fully cleared.

<!-- SCREENSHOT: J2Commerce Payment Methods list showing CardSave disabled and a replacement gateway enabled alongside it -->
