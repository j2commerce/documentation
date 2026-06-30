---
title: "Dojo Payment"
sidebar_label: "Dojo"
sidebar_position: 45
description: "Accept card payments on your J2Commerce store via Dojo (formerly Paymentsense), the UK card acquirer and hosted checkout platform for retail, hospitality, and SMB. GBP only. PCI SAQ-A."
---

# Dojo Payment

Dojo (formerly Paymentsense) is a UK-based card acquirer and payment platform built for retail, hospitality, and small-to-medium businesses. This plugin connects your J2Commerce store to Dojo's hosted checkout flow — your customer is redirected to a secure page on `pay.dojo.tech` to enter their card details. Card data never passes through your server, so you qualify for the simplest PCI self-assessment questionnaire (SAQ-A).

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

**Currency requirement:** British Pounds (GBP) only. Dojo is a UK acquirer and does not process other currencies through this integration. The plugin hides itself automatically if the cart is in any other currency.

## Before you start

Before configuring the plugin, make sure you have:

- A Dojo merchant account. Apply at [dojo.tech](https://www.dojo.tech). A UK business is required.
- Your **API Key** from the [Dojo developer portal](https://developer.dojo.tech).
- Your store base currency or the customer cart currency set to **GBP**.
- SSL (HTTPS) active on your Joomla site. Dojo will not redirect to HTTP return URLs.

## Purchase and download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **Dojo**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Install the plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the `plg_j2commerce_payment_dojo.zip` file.

![](/img/install.webp)

## Enable the Plugin

Once you have installed the App, you will need to enable it. There are **two** ways you can access the App.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard** **-> Setup** **-> Payment Methods**

![](/img/culqi.webp)

To help you narrow down the list, you can do a search for **Dojo**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

## Configure the Plugin

:::tip

Click the **Toggle Inline Help** button at the top of any plugin configuration page to show a short description beneath each field.

:::

### Display Settings

## Step-by-step setup

### Step 1: Enable sandbox mode for testing

The plugin ships with **Sandbox Mode** turned on by default. In sandbox mode it uses your sandbox API key (from the Dojo developer portal) and routes transactions to Dojo's test environment. No real money is processed.

1. On the plugin settings page, confirm **Sandbox Mode** is set to **Yes**.
2. Enter your **Sandbox API Key** in the field that appears.
3. Click **Save** and place a test order to verify the flow.

### Step 2: Enter your live API key

When you are ready to accept real payments:

1. Set **Sandbox Mode** to **No**.
2. Enter your **Live API Key** in the field that appears.
3. Click **Save**.

:::warning Keep your API key private
The API key authenticates every request your store sends to Dojo. Treat it like a password. Never share it, post it in a support ticket, or commit it to version control.
:::

### Step 3: Choose a charge mode

The **Charge Mode** setting controls whether funds are captured immediately or held for manual capture.

| Mode                             | What happens                                                                                                               | When to use                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Sale (capture immediately)**   | Dojo captures funds as soon as the customer pays. The order is marked paid at once.                                        | Most stores — physical goods, services, digital downloads.                                     |
| **Authorise (capture manually)** | Dojo holds the funds but does not settle them. You must log in to the Dojo terminal and manually capture within **1 day**. | Pre-orders, made-to-order items, or cases where you want to inspect the order before charging. |

See [Authorise mode](#authorise-mode) for details on what the manual capture step involves.

### Step 4: Choose your order statuses

Configure how order states map to payment outcomes:

- **Paid Order Status** — applied when Dojo confirms a successful Captured payment. Default: **Confirmed**.
- **Authorised Order Status** — applied when Dojo returns status `Authorised` (funds held, manual capture pending). Default: **Confirmed**. Tip: create a distinct status such as "Processing" or "Awaiting Capture" so you can identify orders needing manual action in the Dojo terminal.
- **Failed Order Status** — applied when payment fails, is cancelled, or fails verification. Default: **Failed**.

:::tip

If the status you want is not listed in a dropdown, create a new one first by going to **J2Commerce** -> **Setup** -> **Order Statuses**.

:::

![](/img/shipstation-order-status2-1.webp)

### Step 5: Set the display name (optional)

The **Display Name** controls the label customers see at checkout. The default is "Pay with Dojo". Change it to anything that matches your store's language and tone.

### Step 6: Save and test

Click **Save**. Place a test order in sandbox mode. The plugin redirects to the Dojo sandbox checkout page. Use Dojo's published test card numbers to simulate approved and declined payments.

## Configuration reference

### Display settings

| Field             | Description                                              | Default         |
| ----------------- | -------------------------------------------------------- | --------------- |
| **Display Name**  | The payment method label shown to customers at checkout. | "Pay with Dojo" |
| **Display Image** | Optional logo shown alongside the payment method name.   | None            |

### API credentials

| Field               | Description                                                                                             | Default |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ------- |
| **Sandbox Mode**    | When **Yes**, uses the sandbox API key and Dojo's test environment. When **No**, uses the live API key. | Yes     |
| **Live API Key**    | Your production API key from the Dojo developer portal. Only shown when Sandbox Mode is off.            | Empty   |
| **Sandbox API Key** | Your test API key from the Dojo developer portal. Only shown when Sandbox Mode is on.                   | Empty   |

### Charge mode

| Field           | Description                                                                                            | Default |
| --------------- | ------------------------------------------------------------------------------------------------------ | ------- |
| **Charge Mode** | **Sale**: funds captured immediately. **Authorise**: funds held, manual capture required within 1 day. | Sale    |

### Order status routing

:::info

NOTE: If the status you want isn't listed in the dropdown menu, you can create a new one by going to **J2Commerce -> Setup -> Order Statuses**

:::

| Field                       | Description                                                     | Default       |
| --------------------------- | --------------------------------------------------------------- | ------------- |
| **Paid Order Status**       | Status when Dojo confirms a Captured payment.                   | Confirmed (1) |
| **Authorised Order Status** | Status when Dojo returns Authorised (manual capture pending).   | Confirmed (1) |
| **Failed Order Status**     | Status when payment fails, is cancelled, or fails verification. | Failed (3)    |

### Surcharge (reserved for future use)

| Field                   | Description                                              | Default |
| ----------------------- | -------------------------------------------------------- | ------- |
| **Surcharge Name**      | Label for the surcharge line item shown to the customer. | Empty   |
| **Surcharge Percent**   | Percentage surcharge on the order subtotal.              | Empty   |
| **Surcharge Fixed**     | Fixed surcharge amount in GBP.                           | Empty   |
| **Surcharge Tax Class** | Tax profile applied to the surcharge amount.             | None    |

:::note Surcharges are not yet active

The surcharge fields are included for forward compatibility. The J2Commerce 6 core does not yet dispatch the `onJ2CommerceCalculateFees` event that activates surcharge calculations. This affects all payment plugins in J2Commerce 6, not just Dojo. Surcharges will become functional in a future core release.

:::

### Availability restrictions

| Field                   | Description                                                                                       | Default |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ------- |
| **Minimum Subtotal**    | Hide this payment method if the order subtotal is below this amount. Leave empty for no minimum.  | Empty   |
| **Maximum Subtotal**    | Hide this payment method if the order subtotal is above this amount. Leave empty for no maximum.  | Empty   |
| **Geozone Restriction** | Limit this payment method to customers in a specific geozone. Leave empty to allow all countries. | None    |

The plugin also enforces a hard currency gate: if the cart currency is not GBP, the Dojo payment option does not appear.

### Checkout messages

Custom text shown to the customer at different points in the payment flow. Leave empty to use the built-in defaults.

| Field                 | When shown                                                         |
| --------------------- | ------------------------------------------------------------------ |
| **On Selection**      | When the customer selects Dojo as their payment method.            |
| **On Before Payment** | On the pre-payment screen, just before redirect to Dojo.           |
| **On After Payment**  | After the customer returns from Dojo following successful payment. |
| **On Cancel Payment** | When the customer cancels at the Dojo checkout page.               |
| **On Error Payment**  | When an error occurs during processing.                            |

### Other settings

| Field                       | Description                                                                                           | Default       |
| --------------------------- | ----------------------------------------------------------------------------------------------------- | ------------- |
| **Thank You Article**       | Optional Joomla article shown on the post-payment page.                                               | None          |
| **Place Order Button Text** | Text on the button that submits the order and starts the redirect.                                    | "Place Order" |
| **Show Dashboard Icon**     | Show a shortcut icon on the J2Commerce dashboard.                                                     | No            |
| **Debug Logging**           | Write detailed payment events to the Joomla log. Errors are always logged regardless of this setting. | No            |

## How the payment flow works

1. **Customer selects Dojo at checkout.** The plugin checks that the cart currency is GBP and that the order total and geozone match any restrictions you set. If everything passes, the Dojo option appears.

2. **Customer clicks "Place Order".** J2Commerce calls the plugin. The plugin sends a request to the Dojo API (`https://api.dojo.tech/payment-intents`) to create a payment intent for the order amount. Dojo returns a hosted checkout URL.

3. **Customer is redirected to Dojo's checkout page.** The page at `pay.dojo.tech/checkout/[intent-id]` is hosted entirely by Dojo. Your server is not involved in capturing card data. The customer enters their card details and authenticates (including 3D Secure where required).

4. **Dojo redirects the customer back to your store.** After the customer pays (or cancels), Dojo sends them back to your store's return URL with query parameters including the payment intent ID.

5. **The plugin verifies the result.** Before marking anything as paid, the plugin runs three checks:

   - **Status check:** The plugin fetches the payment intent from the Dojo API and reads its status (`Captured`, `Authorized`, `Canceled`, etc.).
   - **Reference check:** The intent's reference field must match the J2Commerce order ID.
   - **Amount check:** The intent amount in pence must match the order total (within 1 penny). Only when all three checks pass does the plugin update the order status.

6. **Order status is updated and customer sees the result.** Captured → paid status. Authorized → authorised status. Cancelled or failed → failed status.

<!-- SCREENSHOT: Dojo hosted checkout page showing card entry fields -->

### What you do NOT have to manage

- **PCI DSS card data forms:** Card data goes directly to Dojo's certified infrastructure. You qualify for SAQ-A.
- **3D Secure prompts:** Dojo's hosted page handles 3DS automatically for all cards that require it.
- **Currency conversion:** Dojo processes GBP only. The plugin enforces this by not displaying itself for non-GBP carts.

## Authorise mode

When **Charge Mode** is set to **Authorise**, Dojo holds the customer's funds but does not settle them immediately. You have up to **1 day** to capture the payment manually.

### How to capture an authorised payment

1. Log in to your Dojo merchant portal or terminal.
2. Find the transaction by the payment intent ID (visible in the J2Commerce order details under Transaction ID).
3. Capture the payment. Dojo will then settle the funds.

:::warning Authorise mode: 1-day capture window
If you do not manually capture an authorised payment within 1 day, Dojo automatically voids the hold and releases the funds back to the customer. The order in J2Commerce will remain in the "Authorised" status — you must manually update it to a cancelled or failed status.
:::

### Recommended setup for Authorise mode

Set **Authorised Order Status** to a distinct status such as "Processing" or "Awaiting Capture" (create it in **J2Commerce** -> **Setup** -> **Order Statuses**). This lets you filter your orders list to find all orders waiting for manual capture before the 1-day deadline.

## Sandbox testing

### Getting sandbox credentials

1. Sign up for a [Dojo developer account](https://developer.dojo.tech).
2. Create a sandbox app in the developer portal to receive a sandbox API key.
3. Enter the sandbox API key in the plugin settings under **Sandbox API Key**.

### Test card numbers

Use these card numbers on the Dojo sandbox checkout page. Use any future expiry date and any 3-digit CVC.

| Card                 | Number                | Expected result               |
| -------------------- | --------------------- | ----------------------------- |
| Visa (success)       | `4111 1111 1111 1111` | Payment approved and captured |
| Mastercard (success) | `5500 0000 0000 0004` | Payment approved and captured |
| Any card (decline)   | `4000 0000 0000 0002` | Payment declined              |

:::note

Dojo periodically updates their sandbox test card numbers. Check the [Dojo developer documentation](https://developer.dojo.tech) for the current test cards if the above do not work.

:::

### Verifying debug logs

1. Set **Debug Logging** to **Yes** in the plugin settings.
2. Place a test order and complete payment on the sandbox.
3. Open `administrator/logs/payment_dojo.php` in a text editor.
4. Look for entries showing the payment intent ID, the status returned by the Dojo API, and the three verification checks (status, reference, amount). A successful flow produces a `Captured` status with all three checks passing.

## Troubleshooting

### Dojo does not appear at checkout

**Most common cause:** The cart currency is not GBP.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Store** and confirm your store currency is GBP.
2. If you use multi-currency, make sure the active currency at checkout is GBP.
3. Check that **Minimum Subtotal** and **Maximum Subtotal** are not excluding the current order total.
4. Check that **Geozone Restriction** (if set) includes the customer's billing country.

### "Sandbox Mode is enabled but no Sandbox API Key is configured"

**Solution:** Go to the plugin settings, confirm **Sandbox Mode** is set to **Yes**, and enter your Dojo sandbox API key in the **Sandbox API Key** field. The sandbox and live keys are separate fields that appear only when their corresponding mode is active.

### "Could not contact the Dojo gateway"

**Cause:** The plugin could not reach `api.dojo.tech`.

**Solution:**

1. Check that your server can make outbound HTTPS connections on port 443.
2. Confirm the API key is correct with no leading or trailing spaces.
3. In sandbox mode, confirm the sandbox key is entered (not the live key).
4. Check your server's outbound firewall rules — some managed hosting environments restrict external API calls.

### Payment failed verification — order not marked paid

**Cause:** One of the three verification checks (status, reference, or amount) did not pass when the customer returned to your store.

**Solution:**

1. Enable **Debug Logging** and repeat the test transaction.
2. Open `administrator/logs/payment_dojo.php` and find the verification failure message. It will indicate which check failed.
3. If the reference check failed, confirm the order was not deleted or modified between when the customer left and when they returned.
4. If the amount check failed by more than 1 penny, this is a security rejection indicating a possible tampered redirect. Contact J2Commerce support with the log entry.

### Authorised order not captured — funds released back to customer

**Cause:** A payment in Authorise mode was not manually captured in the Dojo terminal within the 1-day window.

**Solution:**

1. Confirm the order in the Dojo merchant portal to check its status.
2. If the authorisation has expired and funds were released, you will need to ask the customer to re-order.
3. To prevent this in future, set the **Authorised Order Status** to a distinct status you actively monitor, or switch **Charge Mode** to **Sale** if your fulfilment model allows immediate capture.

### "The payment intent could not be verified"

**Cause:** The plugin fetched the payment intent from the Dojo API but its `reference` field did not match the J2Commerce order ID, or the API call failed.

**Solution:**

1. Enable **Debug Logging** and look for the full API response in `administrator/logs/payment_dojo.php`.
2. Confirm the API key used in the plugin matches the key that originally created the payment intent (this matters when switching between sandbox and live mode).

## Related topics

- [Geozones](../localization/geozones.md) — restrict payment methods by country or region
- [Order Statuses](../setup/orderstatuses.md) — create and configure the statuses used for paid, authorised, and failed orders
- [Design: Shipping and Payment Overrides](../design/layout-overrides/shipping-payment-overrides.md) — customise the pre-payment redirect template
