---
title: "GestPay / Axerve (Banca Sella) Payment"
sidebar_label: "GestPay (Axerve)"
sidebar_position: 92
description: "How to configure the GestPay / Axerve (Banca Sella) payment gateway plugin for J2Commerce. Covers Shop Login setup, the mandatory back-office response URL, test mode, order status mapping, supported currencies, and troubleshooting."
---

# GestPay / Axerve (Banca Sella) Payment

GestPay — now branded as **Axerve** — is the online payment gateway operated by Banca Sella, one of Italy's leading banking groups. It is widely used by Italian and European merchants and accepts cards in several major currencies.

When a customer reaches the payment step, J2Commerce encrypts the order details server-to-server and redirects the buyer to the GestPay Hosted Payment Page (HPP) at `pagam.aspx`. The customer enters card details directly on GestPay's secure, Banca Sella-hosted page. Your server never sees card numbers. After payment, GestPay redirects the buyer back to a URL you configure in the GestPay back office, and J2Commerce decrypts the result to finalize the order.

**PCI scope: SAQ-A.** Card data never passes through your server.

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

***

## How it works

1. Customer reaches the payment step in checkout and selects GestPay.
2. J2Commerce calls the GestPay **WSCryptDecrypt SOAP service** to encrypt the order amount, currency, and order ID.
3. The browser is redirected to the GestPay HPP (`pagam.aspx`) with the encrypted payload.
4. Customer enters card details on GestPay's hosted page.
5. GestPay redirects the customer to the **response URL** you configured in the GestPay back office, carrying an encrypted result parameter (`b`).
6. J2Commerce calls the SOAP Decrypt method to read the transaction result (`OK`, `XX`, or `KO`).
7. The order status is updated and the customer sees the confirmation page.

***

## Prerequisites

Before installing the plugin, confirm you have:

- A **GestPay / Axerve merchant account** with a **Shop Login** (also called `shopLogin`) — provided by Banca Sella during onboarding.
- If you want to test first: access to the **GestPay test environment** (`testecomm.sella.it`) with test credentials. Banca Sella provides these separately from your live credentials.
- **PHP `soap` extension** enabled on your hosting server. The plugin uses SOAP to communicate with the WSCryptDecrypt service. Many hosts enable it by default; ask your hosting provider if you are unsure.
- J2Commerce 6 installed and working on Joomla 6.

***

## Installation

1. Purchase and download the `plg_j2commerce_payment_gestpay.zip` package from the [J2Commerce Extensions Store](https://www.j2commerce.com).
2. In your Joomla admin, go to **System** -> **Install** -> **Extensions**.
3. Upload the `.zip` package file.
4. After installation, go to **System** -> **Plugins**, search for "GestPay", and confirm the plugin is enabled. If it is not, select it and click **Enable**.

***

## CRITICAL: Configure the Response URL in GestPay Back Office

This is the most important setup step. **The plugin will not finalize payments unless you do this.**

GestPay's WSCryptDecrypt SOAP service does not accept a per-transaction return URL. Instead, GestPay redirects the buyer to a single URL that you configure once in your **GestPay / Axerve back office** (the merchant administration panel at Banca Sella).

You must set **both the positive response URL and the negative response URL** to this exact value (replace `YOUR-SITE` with your actual domain):

```
https://YOUR-SITE/index.php?option=com_j2commerce&task=checkout.confirmPayment&orderpayment_type=payment_gestpay&paction=display_message
```

The parameter `paction=display_message` is required. If this parameter is missing or set to anything else, J2Commerce will not clear the cart or send the order confirmation email, even if GestPay reports a successful payment.

**Where to find this setting in GestPay back office:**

1. Log in to your GestPay / Axerve merchant portal.
2. Navigate to the **Pagine di risposta** (Response pages) or equivalent settings section.
3. Set both the positive (OK) and negative (KO) response URLs to the value above.
4. Save and confirm the change.

If you are unsure where this setting is in your account, contact Banca Sella / Axerve support.

***

## Configuration

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

In your Joomla admin, go to **J2Commerce** -> **Payments** -> **Payment Methods** and open the **GestPay** row to configure it.

<!-- SCREENSHOT: J2Commerce -> Payments -> Payment Methods list with GestPay row highlighted -->

### Basic settings

| Field               | Description                                                                                                 | Recommended value                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Display Name**    | Label shown to customers at checkout                                                                        | `Credit Card (GestPay)` or leave default |
| **Display Image**   | Optional logo shown next to the payment name                                                                | Your GestPay/Axerve logo                 |
| **Shop Login**      | Your `shopLogin` credential from Banca Sella. This is your merchant identifier, not a username or password. | Provided by Banca Sella                  |
| **Use Test Server** | Switches between the sandbox (`testecomm.sella.it`) and live (`ecomm.sella.it`) environment.                | **No** for live stores                   |

<!-- SCREENSHOT: GestPay plugin configuration panel showing Shop Login and Use Test Server fields -->

### Order status

:::info

NOTE: If the status you want isn't listed in the dropdown menu, you can create a new one by going to **J2Commerce -> Setup -> Order Statuses**

:::

These settings control which J2Commerce order status is applied for each payment outcome.

| Field                        | Description                                                                                            | Default   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | --------- |
| **Confirmed Payment Status** | Applied when GestPay returns `TransactionResult = OK` (payment accepted).                              | Confirmed |
| **Pending Payment Status**   | Applied when GestPay returns `TransactionResult = XX` (payment suspended or under review by the bank). | Pending   |
| **Failed Payment Status**    | Applied when payment is declined, an error code is returned, or GestPay returns `KO`.                  | Failed    |

### Optional surcharge

You can add a payment surcharge when the customer selects GestPay. Both a percentage and a fixed amount can be combined — they are added together.

| Field                   | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| **Surcharge Name**      | Label shown on the order summary, e.g. `Payment fee`             |
| **Surcharge Percent**   | Percentage of the order subtotal + shipping, e.g. `1.5` for 1.5% |
| **Surcharge Fixed**     | Fixed amount added to every order, e.g. `0.50`                   |
| **Surcharge Tax Class** | Tax profile applied to the surcharge amount, if applicable       |

Leave all surcharge fields empty if you do not want to add a fee.

### Geo zone restriction

| Field                    | Description                                                                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Geo Zone Restriction** | If set, GestPay will only appear at checkout for billing addresses within the selected geo zone. Leave empty to show GestPay to all customers regardless of country. |

### Thank-you article

| Field                 | Description                                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Thank You Article** | An optional Joomla article displayed below the payment confirmation message. Useful for post-purchase instructions or cross-sell content. |

### Subscription support

| Field                     | Description                                                                                                                                                                                         | Default |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Support Subscriptions** | Enable only if you use a subscription app and want GestPay to appear as a payment option for subscription products. Automatic renewal payments are not supported (GestPay HPP has no stored token). | No      |

### Display messages

These text areas let you customize what customers see at each stage.

| Field              | When it shows                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **On Selection**   | Shown in the checkout payment list when the customer selects GestPay, before they click to proceed. |
| **Before Payment** | Shown on the order summary page, just before the button that redirects to GestPay.                  |
| **After Payment**  | Shown on return from a successful GestPay transaction. Leave empty to use the plugin default.       |
| **On Error**       | Shown when GestPay returns an error or the payment is declined.                                     |

### Button text

| Field           | Description                               | Default     |
| --------------- | ----------------------------------------- | ----------- |
| **Button Text** | Label on the "Proceed to GestPay" button. | Place Order |

### Admin notification

| Field                 | Description                                                                                                                                                              | Default            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| **Admin Email Group** | The Joomla user group whose members receive an email when GestPay returns a payment error. Only users in this group with **Receive System Emails** enabled are notified. | Super Users (ID 8) |

### Debug mode

| Field          | Description                                                                                                                                 | Default |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Debug Mode** | Logs SOAP requests and responses to Joomla's log system under the `plg_j2commerce_payment_gestpay` category. Card numbers are never logged. | No      |

Disable debug mode in production. Enable it temporarily when diagnosing issues.

***

## Supported currencies

GestPay accepts only the following currencies. If your store uses a different currency, customers who try to pay with GestPay will see an error message at checkout.

| Currency         | Code |
| ---------------- | ---- |
| Euro             | EUR  |
| US Dollar        | USD  |
| British Pound    | GBP  |
| Swiss Franc      | CHF  |
| Danish Krone     | DKK  |
| Norwegian Krone  | NOK  |
| Swedish Krona    | SEK  |
| Canadian Dollar  | CAD  |
| Japanese Yen     | JPY  |
| Hong Kong Dollar | HKD  |
| Brazilian Real   | BRL  |

EUR is the primary and most common currency for Italian merchants. If you operate in a currency not on this list, you will need to use a different payment gateway.

***

## Testing in sandbox mode

1. Obtain **test credentials** (a test Shop Login) from Banca Sella. These are separate from your live credentials.
2. In the plugin settings, set **Shop Login** to your test Shop Login and switch **Use Test Server** to **Yes**.
3. Configure the response URL in the **GestPay test back office** (a separate portal for test accounts) pointing to your Joomla site, using the same `paction=display_message` URL described above.
4. Place a test order on your store and complete payment using GestPay's published test card numbers (provided in the Banca Sella developer documentation).
5. Verify the order status updates correctly in **J2Commerce** -> **Orders**.
6. When you are satisfied, switch **Use Test Server** back to **No** and update your live GestPay back office response URL.

***

## What changed from J2Store

If you previously used the GestPay plugin for J2Store v4, here is what is new in the J2Commerce 6 version:

- **Configurable order statuses.** Instead of hardcoded status transitions, you now choose which J2Commerce order status maps to Confirmed, Pending, and Failed outcomes.
- **Optional surcharge.** You can add a percentage or fixed payment fee directly in the plugin settings, without needing a separate app.
- **Geo zone restriction.** Limit GestPay availability by country or region using a J2Commerce geo zone.
- **Admin error emails.** The plugin automatically emails administrators when GestPay returns a payment error, so you can follow up with affected customers.
- **Double-charge protection.** If GestPay sends the buyer to the return URL more than once (e.g. browser back-button), the plugin detects the already-confirmed order and skips re-processing.
- **Lighter codebase.** The vendored 2,275-line library has been removed. The plugin now communicates directly with the WSCryptDecrypt SOAP service using a compact internal currency map.
- **Debug logging.** All SOAP traffic can be captured to Joomla's log system (with card data excluded) to make troubleshooting much easier.

***

## Troubleshooting

### PHP SOAP extension is not enabled

**Symptom:** After installing the plugin, you see an error about SOAP not being available, or the plugin installation fails with a preflight warning.

**Solution:** Enable the `php_soap` extension on your server. In a shared hosting environment, look for a "PHP Extensions" section in your hosting control panel, or contact your hosting provider and ask them to enable `ext-soap` for your PHP version.

***

### Unsupported currency error at checkout

**Symptom:** The customer sees "GestPay does not support the order currency" when trying to pay.

**Solution:** Your store's active currency is not in GestPay's supported list. Either switch your store to a supported currency (EUR is recommended for Italian stores) or add a different payment gateway for customers using unsupported currencies.

***

### Payment succeeds on GestPay but the cart is not cleared and no confirmation email is sent

**Symptom:** The customer completes payment on the GestPay page. They are redirected back, but the cart still contains items and no order confirmation email was sent.

**Cause:** The response URL configured in your GestPay back office is missing the `paction=display_message` parameter, or the URL points to an incorrect address.

**Solution:**

1. Log in to your GestPay / Axerve back office.
2. Find the response URL settings (positive and negative).
3. Confirm the URL ends with `&paction=display_message`.
4. Save the change and test again.

***

### Payment is not being finalized — order stays in a "new" or pending state

**Symptom:** The customer pays on GestPay, but the order in J2Commerce never moves to Confirmed.

**Solution checklist:**

1. Confirm the response URL in GestPay back office is correct and includes `paction=display_message`.
2. Enable **Debug Mode** in the plugin settings, place a test order, and check the Joomla logs (**System** -> **Logs**) for entries in the `plg_j2commerce_payment_gestpay` category. Look for Decrypt response lines showing `TransactionResult`.
3. If you see "Could not communicate with the GestPay payment gateway," your server cannot reach `ecomms2s.sella.it`. Confirm that outbound HTTPS (port 443) to Sella servers is not blocked by your firewall or hosting provider.
4. If no log entries appear, the buyer may not be returning to your site at all — double-check the back-office URL.

***

### GestPay returns an error code

**Symptom:** The "After payment" area shows a GestPay error like "GestPay error 1143: ..." or similar.

**Solution:** Look up the GestPay error code in the Banca Sella / Axerve developer documentation. Common causes include incorrect `shopLogin`, an amount formatted incorrectly, or a currency code mismatch. Enable **Debug Mode** to capture the full Decrypt response in the logs.

***

### Admin error notification emails are not arriving

**Symptom:** Payments are failing but no email notification is sent to administrators.

**Solution:**

1. Go to **System** -> **Plugins** and open the GestPay plugin settings.
2. Check the **Admin Email Group** field. Members of this group receive notifications.
3. In **System** -> **User Management** -> **Users**, confirm that the relevant admin accounts have **Receive System Emails** set to **Yes** in their user profile.
4. Confirm Joomla's mail settings are working (**System** -> **Global Configuration** -> **Server** -> **Mail Settings**).

***

## Related topics

- [Payment Methods overview](../setup/orderstatuses.md)
- [Geo Zones](../localisation/geozones.md)
- [Order Statuses](../localisation/order-statuses.md)
- [Currencies](../localisation/currencies.md)
