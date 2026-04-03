---
title: "Pay Later / Pay Against Invoice"
sidebar_label: "Pay Later"
sidebar_position: 10
description: "Allow customers to complete payment for an unpaid order after checkout by showing a Pay Now button on their order history page."
---

# Pay Later / Pay Against Invoice

The **Pay Later** app adds a **Pay Now** button to the customer's order history page. When a customer places an order but does not immediately complete payment — for example, when using a bank transfer or invoice gateway — this button lets them return and pay at any time within a window you define.

This is especially useful for stores that offer invoice-based purchasing, bank transfer, or any payment method that is not processed in real time at checkout.

## Prerequisites

- J2Commerce is installed and enabled
- At least one payment method plugin is installed and enabled

## Purchase and Download

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate the `app_profileorder` app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the App

Go to **System** -> **Install** -> **Extensions**

Upload the plugin ZIP file or use the Install from URL option.

<!-- SCREENSHOT: Joomla extension installer screen -->

## Enable the App

Once installed, you need to enable it. There are two ways to access the App.

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

Search for **Pay Later** in the list, click the **X** to enable it (it turns into a green checkmark).

<!-- SCREENSHOT: Apps list showing Pay Later plugin with enable toggle -->

## Configure the App

Click on the **Pay Later / Pay Against Invoice** title to open the plugin settings.

<!-- SCREENSHOT: Plugin settings screen -->

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Show Pay Button After (Seconds)** | How many seconds after the order is placed before the Pay Now button appears. This prevents double-payment when using gateways with delayed callbacks. | `20` |
| **Pay Button Expires After (Days)** | The number of days after the order is placed when the Pay Now button disappears. Set to `0` for no expiry. | `10` |
| **Pay Button Text** | The label shown on the Pay Now button. Leave blank to use the default "Pay" text. | *(blank)* |
| **Order Statuses** | The button only appears for orders with these statuses. Leave empty to show the button for all statuses. | *(all)* |
| **Debug Mode** | Enable detailed logging to `administrator/logs/app_profileorder.php`. Disable in production. | `No` |

### Configuring Order Statuses

The **Order Statuses** field controls which orders show the Pay Now button. For example, you might only want to show the button when the order status is **Pending** or **Pending Payment**, and not when it is **Completed** or **Cancelled**.

1. Click inside the **Order Statuses** field.
2. Select one or more statuses from the dropdown.
3. Leave the field empty to show the button for orders in any status.

<!-- SCREENSHOT: Order Statuses multi-select field with a few statuses selected -->

## How It Works

### Customer Experience

1. A customer places an order and leaves without paying (or uses a payment method that does not immediately confirm payment).
2. The customer visits **My Account** -> **My Orders** to view their order history.
3. For eligible orders, a **Pay** button appears in the order row.

<!-- SCREENSHOT: Order history page showing a Pay button next to an unpaid order -->

4. The customer clicks the **Pay** button. A payment selection page opens (in a new window).

<!-- SCREENSHOT: Payment selection page showing available payment methods -->

5. The customer selects a payment method and clicks **Continue**.
6. An order summary is shown along with the payment plugin form (e.g., credit card form for Stripe).

<!-- SCREENSHOT: Order confirmation page with order summary table and payment form -->

7. The customer completes payment. The order is updated in J2Commerce exactly as if payment had been completed at checkout.

### When the Button Appears

The Pay Now button is shown only when all three of the following conditions are met:

1. The order's status matches one of the configured **Order Statuses** (or all statuses are allowed).
2. The configured **interval time** has passed since the order was placed — this prevents the button from appearing immediately after checkout while a gateway callback may still be processing.
3. The order was placed within the configured **expiry days** — the button will not appear for orders older than this limit.

:::info

**Example:** With the default settings (20 seconds delay, 10 days expiry), the button appears on orders that are at least 20 seconds old and no more than 10 days old.

:::

## Tips

- Set a reasonable **interval time** if you use asynchronous payment gateways (PayPal, Stripe webhooks, bank transfer). A value of 60–300 seconds prevents a customer from double-paying before the gateway callback arrives.
- Set **Pay Button Expires After** to match your invoice payment terms — for example, `30` days if invoices are payable within 30 days.
- Use the **Order Statuses** filter to restrict the button to only statuses that represent genuinely unpaid orders (e.g., "Pending Payment") and exclude statuses like "Processing" or "Completed".
- Combine this plugin with an **Invoice** payment method to create a full pay-by-invoice workflow: customers receive an invoice email, then return to pay when ready.

## Troubleshooting

### The Pay Now button does not appear on any orders

**Cause:** The plugin may not be enabled, or no orders match the configured conditions.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and confirm **Pay Later / Pay Against Invoice** is enabled.
2. Check the **Order Statuses** setting — if specific statuses are selected, ensure the test order has one of those statuses.
3. Check the **Show Pay Button After (Seconds)** setting — the button will not appear until that many seconds have elapsed since the order was placed.
4. Check the **Pay Button Expires After (Days)** setting — the order may be older than the configured expiry window.
5. Clear the Joomla cache: **Home Dashboard** -> **Cache** -> **Delete All**.

### The payment page opens blank or shows an error

**Cause:** The CSRF token may have expired, or the order ID is invalid.

**Solution:**

1. Ask the customer to refresh the order history page to get a fresh token link, then click Pay again.
2. Ensure the customer is logged in — guest users cannot use this feature.
3. Enable **Debug Mode** in the plugin settings and check the log at `administrator/logs/app_profileorder.php` for detailed error messages.

### Clicking Pay shows "Invalid order or access denied"

**Cause:** The order does not belong to the currently logged-in user, or the order ID is missing.

**Solution:**

1. Confirm the customer is logged in with the correct account.
2. Check that the order was originally placed by that user's account.
3. Review the debug log for more details.

### No payment methods appear on the payment page

**Cause:** No payment plugins are enabled, or the available plugins have filtered out this order.

**Solution:**

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods** and confirm at least one payment plugin is enabled.
2. Check each payment plugin's own settings — some plugins allow restricting payments by order total, geozone, or customer group.

## Related Topics

- [Payment Methods](../../payment-methods/index.md)
- [Easy Reorder](./app_reorder.md)
