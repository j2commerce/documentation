---
title: "Fiserv Commerce Hub Payment"
sidebar_label: "Fiserv Commerce Hub"
sidebar_position: 27
description: "Accept credit and debit card payments through Fiserv Commerce Hub — with hosted fields (SAQ-A), saved cards, authorize-only mode, and full capture, void, and refund from the order screen."
---

# Fiserv Commerce Hub Payment

The Fiserv Commerce Hub Payment plugin connects your J2Commerce store to the **Fiserv Commerce Hub** platform so customers can pay by credit or debit card at checkout. Card data is handled through secure hosted fields supplied by Fiserv — your server never touches raw card numbers, which qualifies your store for the simplest level of PCI security compliance (SAQ-A).

The plugin also supports saving cards for faster repeat checkout, authorize-before-capture workflows, and managing payments (capture, void, refund) directly from the J2Commerce order admin screen.

## Requirements

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.3 or later
- A Fiserv Commerce Hub merchant account
- Your store must be accessible over HTTPS

## Get Your Fiserv Credentials

Before configuring the plugin you need four pieces of information from your Fiserv Commerce Hub account.

1. Log in to the Fiserv Commerce Hub portal (use the certification/sandbox portal for testing credentials).
2. Locate the following under your merchant account settings:

   - **API Key** — your Commerce Hub API key
   - **API Secret** — your Commerce Hub API secret, used to sign requests
   - **Merchant ID** — your Fiserv Merchant ID
   - **Terminal ID** — your Fiserv Terminal ID (typically `10000001`)

Keep these values ready — you will paste them into the plugin settings in Joomla.

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **Fiserv Commerce Hub Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Install the App

Install using the standard Joomla installer.

In the Joomla admin, go to **System** -> **Install** -> **Extensions**.

Upload the `payment_fiserv.zip` package file. The plugin installs and enables automatically.

![](/img/install.webp)

## Enable the App

Once installed, verify the app is enabled. There are two ways to reach it.

**Option A:** Click the **J2Commerce** icon at the top right corner -> **Apps**.

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**.

![](/img/gift-wrap-apps.webp)

Search for **Fiserv Commerce Hub**. If it shows an **X**, click it to enable it. It turns into a green checkmark when active.

## Configure the Plugin

Click the **Fiserv Commerce Hub** title to open its settings.

:::tip

Click the **Toggle Inline Help** button at the top of the settings screen to show a description below each field as you work through the configuration.

:::

<!-- SCREENSHOT: Fiserv plugin settings screen with Toggle Inline Help highlighted -->

### Appearance

**Display Name:** The label shown to customers on the checkout page. The default is "Credit/Debit Card" — change this to anything that makes sense for your store.

**Display Image:** An optional logo or card-brand image to show beside the payment method name on the checkout page.

### Transaction Type

**Transaction Type:** Controls whether funds are collected from the customer immediately or held for manual collection later.

- **Sale (Authorize + Capture)** — charges the customer's card as soon as the order is placed. This is the recommended setting for most stores.
- **Authorize Only** — places a hold on the funds but does not collect them. You then manually capture (settle) the payment from the order admin when you are ready to ship. Useful when you want to confirm stock before charging the customer.

### Sandbox / Test Mode

**Use Sandbox / Test Mode:** When enabled, all transactions go to the Fiserv certification environment — no real money moves.

Enable this during setup and testing. Disable it when you are ready to go live. When sandbox mode is active, a warning banner appears on the J2Commerce dashboard as a reminder.

### Live Credentials

These fields appear when **Use Sandbox / Test Mode** is turned off.

<!-- SCREENSHOT: Live credentials fields — API Key, API Secret, Merchant ID, Terminal ID -->

| Field           | Description                                                                       |
| --------------- | --------------------------------------------------------------------------------- |
| **API Key**     | Your Fiserv Commerce Hub API Key for live transactions                            |
| **API Secret**  | Your Fiserv Commerce Hub API Secret for live transactions (used to sign requests) |
| **Merchant ID** | Your Fiserv Merchant ID for live transactions                                     |
| **Terminal ID** | Your Fiserv Terminal ID for live transactions (usually `10000001`)                |

### Sandbox Credentials

These fields appear when **Use Sandbox / Test Mode** is turned on. They work exactly like the live fields but connect to the Fiserv certification environment.

| Field                   | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| **Sandbox API Key**     | Your Fiserv certification API Key                          |
| **Sandbox API Secret**  | Your Fiserv certification API Secret                       |
| **Sandbox Merchant ID** | Your Fiserv certification Merchant ID                      |
| **Sandbox Terminal ID** | Your Fiserv certification Terminal ID (usually `10000001`) |

### Saved Cards

**Allow Saved Cards:** Let logged-in customers save their card for faster checkout on future orders.

When enabled, a checkbox appears at checkout so customers can choose to save their card. On future visits, saved cards appear as a selectable option — no re-entering of details needed. Saved cards are also used for automatic subscription renewal payments if you have the Subscriptions add-on installed.

**Template Style:** Choose between **Bootstrap 5** and **UIkit** layout for the checkout card form. Match this to your site's front-end template.

### Order Statuses

:::info

If the status you want is not listed in a dropdown, create a new one first by going to **J2Commerce** -> **Setup** -> **Order Statuses**.

:::

<!-- SCREENSHOT: Order status dropdowns in Fiserv plugin settings -->

| Setting                     | Description                                                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Order Status**            | Status applied when a payment is successfully captured (Sale mode) or authorized (Authorize Only mode)                       |
| **Authorized Order Status** | Status applied when a payment is authorized but not yet captured — only shown when Transaction Type is set to Authorize Only |
| **Change Status on Refund** | Toggle on to automatically update the order status when a refund is processed                                                |
| **Refunded Order Status**   | Status to apply after a refund — only shown when Change Status on Refund is enabled                                          |
| **Change Status on Void**   | Toggle on to automatically update the order status when a payment is voided                                                  |
| **Voided Order Status**     | Status to apply after a void — only shown when Change Status on Void is enabled                                              |

### Surcharge

Add an optional handling fee when customers pay with this method.

| Field                   | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| **Surcharge Name**      | Label shown to the customer for the fee (e.g., "Card processing fee") |
| **Surcharge Percent**   | Percentage of the order total to add as a fee (e.g., `1.5` for 1.5%)  |
| **Surcharge Fixed**     | Fixed amount to add as a fee regardless of order size                 |
| **Surcharge Tax Class** | Tax profile to apply to the surcharge amount                          |

Leave both **Surcharge Percent** and **Surcharge Fixed** empty to charge no surcharge.

### GeoZone Availability

**Geozone Restriction:** Limit this payment method to customers in a specific geozone. Leave blank to allow all locations.

**Minimum Order Subtotal:** Hide Fiserv as a payment option when the cart subtotal is below this amount. Leave blank for no minimum.

**Maximum Order Subtotal:** Hide Fiserv when the cart subtotal is above this amount. Leave blank for no maximum.

### Custom HTML Snippets

**Thank-You Article:** An optional Joomla article to display on the order confirmation page after a successful payment.

The following fields let you add custom HTML at different points in the payment flow. All are optional.

| Field                       | When it appears                                                   |
| --------------------------- | ----------------------------------------------------------------- |
| **On Selection Text**       | When the customer selects Fiserv as their payment method          |
| **Before Payment Text**     | Just above the card form, before the customer enters card details |
| **After Payment Text**      | On the confirmation page after a successful payment               |
| **On Error Text**           | When a payment attempt fails                                      |
| **Order Cancelled Message** | When the customer cancels or navigates away                       |

### Dashboard Icon

**Show Dashboard Icon:** Add a quick-access icon for this plugin to the J2Commerce dashboard.

**Dashboard Icon Label:** Label text for the icon. Defaults to "Fiserv Commerce Hub" if left blank. Only shown when Show Dashboard Icon is enabled.

### Debug Mode

**Debug Mode:** Records detailed API request and response data in the Joomla log.

Only enable this when diagnosing a specific problem. Disable it on live sites — debug logs can contain sensitive payment data.

## How Checkout Works for Customers

1. The customer adds items to the cart and proceeds to checkout.
2. On the payment step, the Fiserv card form loads directly on the page — card number, expiry date, and CVV fields appear inside secure fields supplied by Fiserv. Card data never touches your server.
3. If the customer has saved cards on file (and **Allow Saved Cards** is enabled), they see a list of saved cards and can select one or enter a new card.
4. If saving is allowed, a checkbox lets them save the new card for future orders.
5. The customer clicks **Place Order**.
6. On success, the customer sees the order confirmation page.

<!-- SCREENSHOT: Fiserv card form on the storefront checkout page -->

## Managing Payments from the Order Screen

After an order is paid, you can take follow-up actions directly from the J2Commerce order detail page without leaving your admin panel.

Go to **J2Commerce** -> **Sales** -> **Orders** -> click the order number to open it. The Fiserv action buttons appear in the payment section.

### Capture a Payment (Authorize Only mode)

If you set **Transaction Type** to **Authorize Only**, funds are reserved but not collected. When you are ready to capture:

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Click **Capture Payment** and confirm the prompt.
3. The funds are collected from the customer's card and the order status updates automatically.

<!-- SCREENSHOT: Order screen showing Capture Payment button -->

### Void an Authorization

A void cancels an authorized payment before it has been captured. Once a payment has been captured, use **Refund** instead.

1. Open the order.
2. Click **Void Authorization** and confirm the prompt.
3. The hold on the customer's card is released — no charge is made.

:::info

The **Void Authorization** button only appears for orders that have been authorized but not yet captured. If the payment has already been captured, use **Refund** instead.

:::

### Issue a Refund

You can refund a captured payment in full or in part.

1. Open the order.
2. Click **Refund Order**.
3. The full refundable amount is shown. Enter a smaller amount for a partial refund, or leave it as-is for a full refund.
4. Click **Process Refund** to confirm.

The refund is sent to the customer's original card. If **Change Status on Refund** is enabled, the order status updates automatically.

<!-- SCREENSHOT: Refund dialog on the order screen showing amount field -->

## Testing Payments

Always test in sandbox mode before going live.

1. Enable **Use Sandbox / Test Mode** in the plugin settings and enter your Fiserv certification credentials.
2. Place a test order on your storefront using a Fiserv test card number.
3. Check that the order appears in **J2Commerce** -> **Sales** -> **Orders** with the correct status.
4. Test a capture, void, or refund from the order screen to confirm each action works.
5. Check your Joomla log (**System** -> **Logs**) for any errors. Enable **Debug Mode** temporarily if needed.
6. When everything is working, disable **Use Sandbox / Test Mode** and replace the sandbox credentials with your live credentials.

:::warning
Remember to turn off **Use Sandbox / Test Mode** before accepting real orders. A warning banner on the J2Commerce dashboard will remind you if sandbox mode is still active.
:::

## Troubleshooting

### The card form does not appear on the checkout page

**Cause:** The plugin is not enabled, credentials are missing, or the template style does not match your theme.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** and verify the Fiserv plugin shows a green enabled indicator.
2. Open the plugin settings and confirm the **API Key**, **API Secret**, **Merchant ID**, and **Terminal ID** fields are all filled in for the active environment (live or sandbox).
3. Verify the **Template Style** matches your site's front-end template (Bootstrap 5 or UIkit).
4. Clear the Joomla cache: **System** -> **Clear Cache** -> **Delete All**.

### A "not configured" warning appears on the J2Commerce dashboard

**Cause:** The API Key field is empty for the currently active environment.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** -> **Fiserv Commerce Hub**.
2. Fill in the **API Key** (and other credential fields) for whichever environment is active.
3. Click **Save**.

### The Capture / Void / Refund buttons do not appear on the order

**Cause:** The order was not completed through Fiserv, or the checkout was interrupted before transaction data was saved.

**Solution:**

1. Confirm the order's payment method is listed as Fiserv (check the payment section of the order detail view).
2. The action buttons only appear when transaction data is stored on the order. If checkout was interrupted, no transaction data is saved — re-test a full checkout to verify.
3. Enable **Debug Mode** and re-test to see detailed transaction data in the Joomla log.

### Card declined errors at checkout

**Cause:** The card details are incorrect, the card is not authorized for online transactions, or the bank declined the charge.

**Solution:**

1. Ask the customer to double-check their card number, expiry date, and CVV.
2. Ask them to try a different card or contact their bank.
3. In sandbox mode, verify you are using a valid Fiserv test card number.

### Orders are stuck in a pending status after payment

**Cause:** The payment completed but the order status was not updated — often a configuration mismatch.

**Solution:**

1. Open the plugin settings and confirm the **Order Status** field is set to an appropriate status (e.g., Confirmed).
2. Enable **Debug Mode**, attempt a test payment, then check **System** -> **Logs** for any processing errors.
3. Verify the Fiserv credentials are correct for the active environment.
