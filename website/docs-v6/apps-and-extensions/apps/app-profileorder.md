---
title: "Pay Later / Pay Against Invoice"
sidebar_label: "Pay Later"
sidebar_position: 10
description: "Allow customers to complete payment for an unpaid order after checkout by showing a Pay Now button on their order history page."
---

# Pay Later / Pay Against Invoice

The **Pay Later** app adds a **Pay Now** button to the customer's order history page. When a customer places an order but does not immediately complete payment — for example, when using a bank transfer or invoice gateway — this button lets them return and pay whenever they are ready, within a time window you define.

This is especially useful for stores that offer invoice-based purchasing, bank transfers, or any payment method that is not confirmed in real time at checkout.

## Prerequisites

- J2Commerce is installed and enabled
- At least one payment method plugin is installed and enabled

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

1. Purchase and download the `app_profileorder` package from the J2Commerce website. Log in, go to your account, and find the download under **My Downloads**.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the plugin ZIP file.

<!-- SCREENSHOT: Joomla extension installer screen with the plugin ZIP selected -->

The plugin installs automatically.

## Enable the Plugin

After installation, the plugin must be enabled before it will work.

1. Go to **J2Commerce** -> **Apps**.
2. Find **Pay Later / Pay Against Invoice** in the list.
3. Click the status toggle to enable it. The toggle turns green when the plugin is active.

<!-- SCREENSHOT: Apps list showing Pay Later plugin with its enable/disable toggle -->

## Configure the Plugin

Click the **Pay Later / Pay Against Invoice** title to open the plugin settings.

<!-- SCREENSHOT: Plugin settings screen showing all configuration fields -->

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Show Pay Button After (Seconds)** | How long to wait after an order is placed before showing the Pay Now button. This prevents the button from appearing while a gateway is still processing a callback. | `20` |
| **Pay Button Expires After (Days)** | The number of days after the order is placed when the Pay Now button stops appearing. Set to `0` for no expiry. | `10` |
| **Pay Button Text** | Custom label for the Pay Now button. Leave blank to use the default "Pay" text. | *(blank)* |
| **Order Statuses** | The Pay Now button only appears for orders with these statuses. Leave empty to show the button for orders in any status. | *(all)* |
| **Debug Mode** | Writes detailed log entries to `administrator/logs/app_profileorder.php`. Turn this off on a live store once you have finished testing. | `No` |

### Choosing Order Statuses

The **Order Statuses** setting is one of the most important things to configure. You almost always want to restrict the button to statuses that mean the order is genuinely unpaid — for example **Pending** or **Pending Payment** — and exclude statuses like **Completed**, **Processing**, or **Cancelled**.

1. Click inside the **Order Statuses** field.
2. Select one or more statuses from the dropdown.
3. Save the plugin settings.

Leaving the field empty shows the Pay Now button on orders in any status, which may not be what you want.

<!-- SCREENSHOT: Order Statuses multi-select dropdown with example statuses selected -->

## How It Works

### The Customer Experience

1. A customer places an order at checkout without completing payment — for example, they select "Bank Transfer" and close the browser, or their payment gateway session expires.
2. Later, the customer logs in and goes to **My Account** -> **My Orders** to view their order history.
3. For orders that meet the configured conditions, a **Pay** button appears next to the order.

<!-- SCREENSHOT: Order history page with a Pay button visible next to an unpaid order -->

4. The customer clicks the **Pay** button. A payment selection page opens in a new browser tab.

<!-- SCREENSHOT: Payment selection page listing the available payment methods -->

5. The customer selects a payment method and clicks **Continue**.
6. An order summary is shown, along with the payment form from the selected payment plugin (for example, a Stripe credit card form).

<!-- SCREENSHOT: Order confirmation page showing the order summary table and payment form -->

7. The customer completes payment. The order is updated in J2Commerce exactly as if the payment had been made at checkout.

### When the Pay Button Appears

The Pay Now button is shown only when all three of the following conditions are met:

1. The order's status matches one of the configured **Order Statuses** (or the setting is empty, meaning all statuses are allowed).
2. The configured **interval time** has passed since the order was placed — this prevents the button from appearing while a gateway callback may still be in flight.
3. The order was placed within the configured **expiry** window — the button will not appear for orders older than this limit.

:::info Example

With the default settings (20-second delay, 10-day expiry), the Pay Now button appears on orders that are at least 20 seconds old and no more than 10 days old.

:::

### Zero-Total Orders

If an order has a total of zero (for example, a fully discounted order), the payment selection step is skipped. The customer is taken directly to the order confirmation page and can click **Place Order** to complete it without entering payment details.

## Tips

- Set a higher **interval time** if you use asynchronous payment gateways such as PayPal or Stripe Webhooks. A value of 60–300 seconds gives the gateway enough time to deliver its callback before the Pay Now button appears, reducing the risk of double payments.
- Set **Pay Button Expires After** to match your payment terms. For example, use `30` if invoices must be paid within 30 days.
- Restrict **Order Statuses** to only the statuses that represent genuinely unpaid orders. This prevents the Pay Now button appearing on orders that are already paid or cancelled.
- Pair this plugin with an offline or invoice payment method to create a full pay-by-invoice workflow: customers receive an invoice email at checkout and return to pay when they are ready.

## Troubleshooting

### The Pay Now button does not appear on any orders

**Cause:** The plugin may not be enabled, or no orders match the configured conditions.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and confirm **Pay Later / Pay Against Invoice** is enabled (green toggle).
2. Check **Order Statuses** — if specific statuses are selected, the test order must have one of those statuses.
3. Check **Show Pay Button After (Seconds)** — the button will not appear until that many seconds have elapsed since the order was placed.
4. Check **Pay Button Expires After (Days)** — the order may be older than the configured expiry window.
5. Clear the Joomla cache: **Home Dashboard** -> **Manage Cache** -> **Delete All**.

### The payment page opens blank or shows an error

**Cause:** The CSRF security token in the link has expired, or the order ID is invalid.

**Solution:**

1. Ask the customer to refresh the order history page to generate a fresh link, then click Pay again.
2. Confirm the customer is logged in — guest users cannot use this feature.
3. Enable **Debug Mode** in the plugin settings and check the log at `administrator/logs/app_profileorder.php` for a detailed error message.

### Clicking Pay shows "Invalid order or access denied"

**Cause:** The order does not belong to the currently logged-in user, or no order ID was passed to the page.

**Solution:**

1. Confirm the customer is logged in to the correct account.
2. Check that the order was originally placed by that same user account.
3. Review the debug log for more details.

### No payment methods appear on the payment selection page

**Cause:** No payment plugins are enabled, or all available plugins have filtered out this order.

**Solution:**

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods** and confirm at least one payment plugin is enabled.
2. Check each payment plugin's own settings — some plugins restrict payments by order total, geozone, or customer group, which may exclude the order.

## Related Topics

- [Payment Methods](../../payment-methods/index.md)
- [Easy Reorder](./app_reorder.md)
