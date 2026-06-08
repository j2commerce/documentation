---
title: "ZarinPal Payment"
sidebar_label: "ZarinPal"
sidebar_position: 50
description: "Accept payments from Iranian shoppers using ZarinPal, the leading Iranian payment gateway, in your J2Commerce store."
---

# ZarinPal Payment

ZarinPal is Iran's most widely used online payment gateway, processing card payments for millions of Iranian shoppers. When a customer chooses ZarinPal at checkout, they are redirected to the ZarinPal secure payment page, complete their transaction there, and are then returned to your store with a confirmed result.

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

## Prerequisites

Before configuring this plugin, make sure you have:

- A ZarinPal merchant account at [zarinpal.com](https://www.zarinpal.com)
- Your **Merchant ID** — a UUID (GUID) in the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`, found in your ZarinPal dashboard under the terminal/merchant settings
- Your store's currency set to either **IRR (Iranian Rial)** or **IRT (Iranian Toman)** — see the [Amount Currency section](#amount-currency-rial-vs-toman) below for the critical difference between them

For testing, no live account is required. The ZarinPal sandbox (`sandbox.zarinpal.com`) works with any placeholder merchant ID.

## Installation

1. Purchase and download the `payment_zarinpal.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `payment_zarinpal.zip` file.
4. The plugin installs automatically.

To enable it, go to **J2Commerce** -> **Payments** -> **Payment Methods**, find **ZarinPal Payment** in the list, and click the toggle to enable it.

<!-- SCREENSHOT: J2Commerce Payment Methods list with ZarinPal Payment enabled -->

## Step-by-Step Configuration

Go to **J2Commerce** -> **Payments** -> **Payment Methods**, then click **ZarinPal Payment** to open its settings.

<!-- SCREENSHOT: ZarinPal Payment settings form open in the J2Commerce admin -->

### Step 1: Enter Your Merchant ID

Find the **Merchant ID** field and paste your UUID from the ZarinPal merchant dashboard.

The field only appears when **Sandbox Mode** is set to **No**. When Sandbox Mode is **Yes**, the **Sandbox Merchant ID** field appears in its place — you can leave that field empty or enter any placeholder value for testing.

| Field | Description |
|-------|-------------|
| **Merchant ID** | Your live ZarinPal UUID (shown when Sandbox = No) |
| **Sandbox Merchant ID** | Your test UUID (shown when Sandbox = Yes) |

### Step 2: Set Amount Currency — Rial vs Toman

This is the most important setting to get right. ZarinPal's API accepts amounts in either **IRR** (Iranian Rial) or **IRT** (Iranian Toman), and your store currency must match this selection.

The key fact: **1 Toman = 10 Rials**. Iran informally uses Toman for most prices, but the Rial is the official currency. If you send 50,000 to ZarinPal but the shopper sees 5,000 on the payment page (or vice versa), this setting is the cause.

| Setting | Currency Unit | What happens to the amount |
|---------|--------------|---------------------------|
| **IRR — Iranian Rial** (default) | Rial | Sent as-is to ZarinPal |
| **IRT — Iranian Toman** | Toman | Divided by 10 before sending to ZarinPal |

Set this to match the unit your store uses for product prices. If your products are priced in Toman (e.g., a product costs 50,000 Toman), choose **IRT**. If prices are in Rial, choose **IRR**.

<!-- SCREENSHOT: Amount Currency dropdown showing IRR and IRT options -->

### Step 3: Enable or Disable Sandbox Mode

Set **Sandbox Mode** to **Yes** while testing, and to **No** for a live store.

When Sandbox Mode is on, the plugin points to `sandbox.zarinpal.com` instead of the live gateway. No real charges are made. The sandbox redirects to a test payment page where you can simulate a successful or failed transaction.

### Step 4: Enter Access Token (for Refunds)

The **Access Token** field is optional and only needed if you plan to process refunds through the ZarinPal GraphQL API. Leave it empty if you do not need refunds — they can always be issued manually through the ZarinPal merchant portal instead.

### Step 5: Configure Order Statuses

| Field | Default | Description |
|-------|---------|-------------|
| **Successful Payment Status** | Confirmed | Order status applied when payment verification returns code 100 or 101 |
| **Failed Order Status** | Failed | Order status applied when the customer cancels or verification fails |

You can change these to any status in your J2Commerce order status list.

### Step 6: Optional Surcharge

If ZarinPal processing costs need to be passed to the customer, fill in the surcharge fields:

| Field | Description |
|-------|-------------|
| **Surcharge Name** | Label shown in the cart, e.g. "Payment fee" |
| **Surcharge (%)** | Percentage of the order total |
| **Surcharge (fixed)** | Fixed amount added to the order |
| **Surcharge Tax Class** | Tax profile to apply to the surcharge (leave empty for no tax) |

### Step 7: Optional Settings

| Field | Description |
|-------|-------------|
| **Display Name** | Text shown to the customer at checkout (default: "ZarinPal") |
| **Display Image** | Logo or icon shown next to the payment option |
| **Geozone Restriction** | Limit this payment method to specific countries/regions |
| **Minimum Subtotal** | Hide this method if cart is below a minimum value |
| **Maximum Subtotal** | Hide this method if cart exceeds a maximum value |
| **Thank-You Article** | A Joomla article to display after successful payment |
| **On Selection** | Text shown when the customer selects this payment method |
| **On After Payment** | Text shown on the success screen after payment |
| **On Error Payment** | Text shown when a gateway error occurs |
| **On Cancel Payment** | Text shown when the customer cancels payment |
| **Debug Mode** | Log all API requests and responses — disable in production |

Click **Save** when done.

## How the Checkout Flow Works

From a shopper's perspective, paying with ZarinPal looks like this:

1. The shopper reaches the **Order Confirmation** step and selects **ZarinPal** as their payment method.
2. They click the **Pay via ZarinPal** button.
3. The store sends a payment request to ZarinPal in the background. On success, the shopper is automatically redirected to `zarinpal.com/pg/StartPay/[authority]` — the ZarinPal secure payment page.
4. The shopper enters their Iranian bank card details and confirms the payment on the ZarinPal page.
5. ZarinPal redirects the shopper back to your store.
6. The plugin verifies the payment with ZarinPal. If the verification response code is `100` (verified) or `101` (already verified), the order is marked as confirmed.
7. The shopper sees the order success screen with their ZarinPal **Reference ID**.

If the shopper clicks **Cancel** on the ZarinPal page, or if verification fails, the order is marked with the failed status you configured and the shopper sees an error message.

<!-- SCREENSHOT: ZarinPal payment redirect page showing the secure payment form -->

## Testing with the Sandbox

ZarinPal provides a working sandbox environment at `sandbox.zarinpal.com`.

1. Set **Sandbox Mode** to **Yes** in the plugin settings.
2. Place a test order in your store and proceed to payment.
3. You will be redirected to the ZarinPal sandbox payment page.
4. Complete or cancel the test transaction.
5. Return to your store and verify the order status updated correctly.

No real money is processed during sandbox testing. Switch **Sandbox Mode** back to **No** when you go live.

## What's New vs the Old J2Store Plugin

If you previously used the ZarinPal plugin for J2Store, here is what changed in this J2Commerce 6 version:

| Area | Old J2Store Plugin | J2Commerce 6 Plugin |
|------|--------------------|---------------------|
| Architecture | FOF 2 framework, non-namespaced | Native Joomla 6 MVC, fully namespaced |
| Gateway host | `api.zarinpal.com` (deprecated — dead) | `payment.zarinpal.com` (ZarinPal v4 live host) |
| Sandbox support | No sandbox toggle | Built-in Sandbox Mode toggle |
| Amount currency | Hard-coded divide-by-10 (assumed Toman) | Configurable: IRR Rial or IRT Toman |
| SDK | Raw cURL | Official ZarinPal SDK bundled in `lib/` |
| Refunds | Not supported | Refund/inquiry/reverse via GraphQL API (requires Access Token) |
| Language files | Persian hard-coded, no `.ini` files | Full English + Persian (`fa-IR`) language files |
| Error handling | Persian gate messages only | Localised error codes with English translations |

The most common breakage when migrating from the J2Store version is the gateway host. The old `api.zarinpal.com` endpoint no longer exists. The J2Commerce 6 plugin uses `payment.zarinpal.com`, which is the correct ZarinPal v4 address.

## Troubleshooting

### Shoppers are not redirected to ZarinPal — a gateway error appears immediately

**Cause:** The Merchant ID is incorrect, or the plugin cannot reach `payment.zarinpal.com`.

**Check these:**

1. Verify the **Merchant ID** is the correct UUID from your ZarinPal merchant dashboard. A Merchant ID with the wrong format returns error code `-2` ("The merchant ID or acceptance terminal is not correct").
2. If you just installed the plugin and are testing, make sure **Sandbox Mode** is set to **Yes** and try again — the sandbox uses a different hostname.
3. Enable **Debug Mode** temporarily to capture the gateway response in the Joomla error log, then check **System** -> **Logs**.

### The payment amount on ZarinPal's page is 10x too large or too small

**Cause:** The **Amount Currency** setting does not match the unit your store uses for prices.

**Solution:** If your products are priced in Toman, set Amount Currency to **IRT**. If priced in Rial, set it to **IRR**. This is the only calculation ZarinPal requires — the plugin handles the conversion automatically once the correct unit is selected.

### Error code -10 — "Invalid merchant_id"

This error code means the Merchant ID UUID you entered is not recognised by ZarinPal. Double-check the value in your ZarinPal dashboard. Note that sandbox and live accounts have different Merchant IDs — use the **Sandbox Merchant ID** field for the sandbox account and the **Merchant ID** field for the live account.

### The order status does not update after the shopper returns

**Cause:** The callback URL was not reached, or session state was lost during redirect.

**Check these:**

1. Confirm your Joomla site is publicly accessible (not on a private IP or `localhost`) so ZarinPal can redirect back.
2. Check that no caching plugin is caching the checkout page — the callback URL must process dynamically.
3. Enable **Debug Mode** and re-test to see the full verification response in the Joomla log.

### Refunds are not available in the plugin admin

ZarinPal refunds require an **Access Token** (from your ZarinPal developer panel) and are processed via the GraphQL API. Enter your access token in the **Access Token** field to enable refund support. If you prefer, you can issue refunds manually through the ZarinPal merchant portal without configuring the access token.

### Payment completes but the order stays in Pending status

**Cause:** The Successful Payment Status may be set to the wrong order status, or the verification call did not complete.

**Solution:** Go to the plugin settings and confirm the **Successful Payment Status** is set to a confirmed/paid status (such as "Confirmed"). Then check the Joomla log for any verification errors.

## Related Topics

- [Payment Methods Overview](index.md)
- [Geozones](../localization/geozones.md)
- [Order Statuses](../localization/order-statuses.md)
