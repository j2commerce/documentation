---
title: "Alipay Payment"
sidebar_label: "Alipay"
sidebar_position: 30
description: "Accept Alipay cross-border payments in J2Commerce using the legacy MAPI MD5 bridge — for store owners who already hold pre-2024 Alipay merchant accounts."
---

# Alipay Payment

This plugin lets customers pay with Alipay at checkout. It connects to Alipay's cross-border payment gateway (`create_forex_trade` MAPI product) using MD5-signed requests and supports both a live mode and a sandbox environment for testing.

:::warning Legacy bridge — not for new merchants
Alipay retired the MAPI/MD5 `create_forex_trade` product for **new** merchant signups in 2024. If you do not already hold an active Alipay International merchant account with a Partner ID and MD5 key, you cannot use this plugin. New stores should contact Alipay about **Alipay Plus** (OpenAPI v3/RSA2), which uses a different integration. This plugin is maintained for existing merchants who are still on the legacy MD5 protocol.
:::

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

***

## Supported Currencies

Alipay cross-border payments accept foreign currencies only — CNY (Chinese Yuan domestic) is intentionally blocked. The plugin enforces the following list:

USD, HKD, GBP, EUR, JPY, KRW, CHF, CAD, AUD, NZD, SGD, MYR, TWD, THB, NOK, SEK, DKK

If your store's active currency is not on this list, Alipay will refuse the transaction and the customer will see an error message.

***

## Prerequisites

Before you install the plugin, confirm you have all of the following:

- J2Commerce 6 installed and at least one active payment method configured
- An active **Alipay International merchant account** on the `create_forex_trade` cross-border product (pre-2024 accounts)
- Your **Partner ID (PID)** and **MD5 security key** from the Alipay merchant portal
- (Optional) Separate sandbox Partner ID and MD5 key for testing

***

## Installation

1. Purchase and download the `payment_alipay.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `payment_alipay.zip` file and click **Upload & Install**.
4. The plugin installs and enables automatically.

After installation, go to **J2Commerce** -> **Payments** -> **Payment Methods** to configure it.

<!-- SCREENSHOT: Payment Methods list showing Alipay listed and enabled -->

***

## Configuration

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

Open the Alipay payment method in your payment methods list and work through each tab.

### Alipay Credentials tab

| Field                  | Description                                               | Notes                                                              |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| **Display Name**       | The label shown to customers at checkout                  | Default: `Alipay`                                                  |
| **Display Image**      | Logo image shown next to the payment name                 | A default Alipay logo is included; replace with your own if needed |
| **Partner ID**         | Your live Alipay Partner ID (PID)                         | Required for live transactions                                     |
| **MD5 Key**            | Your live Alipay MD5 security key                         | Stored encrypted; hidden in the admin form                         |
| **Use Sandbox**        | Toggle sandbox mode on/off                                | Set to **Yes** while testing; always turn off before going live    |
| **Sandbox Partner ID** | Partner ID for the Alipay sandbox                         | Appears only when **Use Sandbox** is enabled                       |
| **Sandbox MD5 Key**    | MD5 key for the sandbox environment                       | Appears only when **Use Sandbox** is enabled                       |
| **Debug Mode**         | Write all gateway interactions to the J2Commerce log file | Never enable on a live store; disable when testing is complete     |

<!-- SCREENSHOT: Alipay Credentials tab in payment method configuration -->

### Payment Settings tab

:::info

NOTE: If the status you want isn't listed in the dropdown menu, you can create a new one by going to **J2Commerce -> Setup -> Order Statuses**

:::

| Field                    | Description                                                                      | Default         |
| ------------------------ | -------------------------------------------------------------------------------- | --------------- |
| **After Payment Status** | Order status set when Alipay confirms payment                                    | `1` (Confirmed) |
| **Failed Status**        | Order status set when Alipay reports failure or cancellation                     | `3` (Failed)    |
| **On Selection text**    | Custom HTML shown when the customer picks Alipay at checkout                     | Empty           |
| **Before Payment text**  | Custom HTML shown on the order confirmation page before the "Place Order" button | Empty           |
| **After Payment text**   | Custom HTML shown on the return page after a successful payment                  | Empty           |
| **On Error text**        | Custom HTML shown if the payment fails                                           | Empty           |
| **On Cancel text**       | Custom HTML shown if the customer cancels at Alipay                              | Empty           |
| **Button Text**          | Label on the submit button that sends the customer to Alipay                     | `Place Order`   |

### Restrictions tab

| Field                      | Description                                                                                    | Default      |
| -------------------------- | ---------------------------------------------------------------------------------------------- | ------------ |
| **Geozone**                | Limit Alipay to customers in a specific geozone; leave at **All Geozones** to show to everyone | All Geozones |
| **Minimum Order Subtotal** | Hide Alipay if the cart subtotal is below this amount (`0` = no minimum)                       | `0`          |
| **Maximum Order Subtotal** | Hide Alipay if the cart subtotal is above this amount (`0` = no maximum)                       | `0`          |

***

## How It Works — Checkout Flow

Understanding the two-step confirmation process helps you diagnose issues and configure your server correctly.

1. **Customer selects Alipay** at the payment step. Any **On Selection text** you configured is shown.
2. **Customer reaches the order review page.** The **Before Payment text** and the **Place Order** button are displayed. No payment has been taken yet.
3. **Customer clicks Place Order.** The browser submits a signed form directly to Alipay's gateway (`mapi.alipay.com` in live mode, `openapi.alipaydev.com` in sandbox mode).
4. **Customer pays at Alipay.** They log in to their Alipay account and complete the transaction on Alipay's site.
5. **Two things happen in parallel after payment:**

   - The customer's browser is redirected back to your store (this is a convenience redirect — it does not confirm the order on its own).
   - Alipay makes a **server-to-server notify call** (IPN) to your store at a URL like `index.php?option=com_ajax&plugin=payment_alipay&group=j2commerce&format=raw`. This is what actually updates the order status.
6. **The server-side notify fires.** J2Commerce verifies the MD5 signature, checks that the amount and currency match the order on file, records the notification to prevent duplicate processing, and then updates the order status to **Confirmed** (or your configured **After Payment Status**).
7. **The order confirmation email is sent** and the customer sees the **After Payment text** on the return page.

:::tip Server-to-server notify is required

If your store's notify URL is blocked by a firewall or your hosting does not allow incoming connections on standard HTTP ports, orders will remain in a pending state even after the customer pays. The browser redirect alone does not finalize the order.

:::

***

## Sandbox Testing

Use sandbox mode to verify your configuration without processing real payments.

1. Log in to the [Alipay Sandbox merchant portal](https://openhome.alipay.com/platform/appManage.htm) and retrieve your sandbox Partner ID and MD5 key.
2. In the plugin configuration, set **Use Sandbox** to **Yes** and enter your sandbox credentials.
3. Enable **Debug Mode** (for testing only) so you can see the full request/response in the log.
4. Place a test order on your store and complete the payment at `openapi.alipaydev.com`.
5. Confirm that the order status changes to **Confirmed** in J2Commerce.
6. Check the debug log at **System** -> **Logs** -> `plg_j2commerce_payment_alipay` for the full gateway exchange.
7. When testing is complete, set **Use Sandbox** to **No**, enter your live credentials, and disable **Debug Mode**.

<!-- SCREENSHOT: Plugin configuration with Use Sandbox enabled showing sandbox fields -->

:::caution Turn off Debug Mode in production

Debug Mode writes the full gateway payload to the log file, which may include order totals and transaction IDs. It should never be left on in a live store.

:::

***

## What Changed from J2Store

If you previously used this plugin with J2Store, here is what improved in the J2Commerce 6 version:

- **PHP 8 compatibility restored.** The original plugin used `each()`, `count()` on strings, and `get_magic_quotes_gpc()` — all removed in PHP 8. These fatal errors are fixed.
- **Replay protection.** Alipay retries the notify callback up to 8 times over 25 hours. The plugin now records each `notify_id` and ignores duplicates, preventing orders from being confirmed multiple times.
- **Currency and amount tamper check.** Even when the signature verifies, the plugin now confirms that the `total_fee` and `currency` in the callback match the order on file before updating the status.
- **Timing-safe signature verification.** The MD5 comparison now uses `hash_equals()` instead of `==`, which prevents timing-based attacks against the verification step.
- **Order events fire correctly.** The original plugin called `update_status()` directly, bypassing J2Commerce's event chain. The new version routes status changes through `OrderModel::updateOrderStatus()`, so order history, email notifications, download grants, and PDF invoices all work.
- **Geozone restriction actually enforced.** The original plugin had a geozone field but the restriction check silently passed for all orders. This is fixed.
- **Secure credential storage.** The Partner ID and MD5 key fields now use password-type inputs so credentials are not shown in cleartext in the admin form.
- **No more standalone success.php.** The original plugin included a direct-access PHP file at `tmpl/success.php` that could be called outside of Joomla. The new version routes all callbacks through Joomla's `com_ajax` component.
- **Centralized logging.** Debug output is written to Joomla's standard log system instead of raw file writes to the `cache/` directory.

***

## Troubleshooting

### Order stays in Pending after the customer pays

**Cause:** The server-to-server notify from Alipay never reached your store.

**Steps to resolve:**

1. Confirm the notify URL `index.php?option=com_ajax&plugin=payment_alipay&group=j2commerce&format=raw` is publicly reachable. Test it from outside your network.
2. Check that your server firewall allows incoming HTTP/HTTPS connections from Alipay's IP ranges.
3. Enable **Debug Mode**, repeat the test payment, and review the log for any error entries.
4. If you are on a staging environment with a private IP address (e.g., `192.168.x.x`), Alipay cannot reach your notify URL. You must use a publicly accessible URL for testing.

### "Currency not supported" error at checkout

**Cause:** Your store's active currency is not in Alipay's accepted cross-border currency list.

**Solution:** Switch to one of the supported currencies (USD, EUR, GBP, JPY, HKD, KRW, CHF, CAD, AUD, NZD, SGD, MYR, TWD, THB, NOK, SEK, DKK). Alipay cross-border does not accept CNY — that is the domestic Alipay product and requires a different integration.

### Signature mismatch error in the log

**Cause:** Either the MD5 key entered in the plugin does not match the key in your Alipay merchant account, or you have Sandbox mode enabled but are using live credentials (or the reverse).

**Steps to resolve:**

1. Log in to the Alipay merchant portal and copy the MD5 key again exactly, including any leading/trailing characters.
2. Verify that **Use Sandbox** matches the environment you are testing (sandbox or live).
3. The MD5 key field is a password field — paste directly rather than typing to avoid transcription errors.

### Customer sees a blank or error page after returning from Alipay

**Cause:** The return URL built by the plugin is missing parameters that J2Commerce needs to display the confirmation page.

**Solution:** Check that the order does appear in J2Commerce under **J2Commerce** -> **Sales** -> **Orders**. The server-side notify is what finalizes the order; the browser redirect page is only cosmetic. If the order is confirmed but the page is broken, this is a template or URL configuration issue — check your store's base URL in Joomla's global configuration.

### Orders are being confirmed more than once

**Cause:** Alipay sends multiple notify attempts and an older version of the plugin processed each one.

**Solution:** Update to the current version (6.0.0 or later), which includes replay protection. The first `notify_id` wins; subsequent retries for the same transaction are ignored.

***

## Related Topics

- [Payment Methods Overview](../setup/payment-methods.md)
- [Geozones](../localization/geozones.md)
- [Order Statuses](../localization/order-statuses.md)
- [Troubleshooting Payments](../troubleshooting/payments.md)
