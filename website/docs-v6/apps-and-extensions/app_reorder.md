---
title: "Easy Reorder"
sidebar_label: "Easy Reorder"
sidebar_position: 14
description: "Let customers reorder products from past orders with a single click, or retry a failed checkout without re-adding items manually."
---

# Easy Reorder

The Easy Reorder plugin adds a **Reorder** button to customers' past orders so they can add all items from a previous order back into their cart with one click. It also provides an optional **Try Again** button that appears when a checkout or payment fails, letting the customer retry without starting over.

This is especially useful for stores with repeat buyers — such as office supplies, food and beverage, or any business where customers regularly purchase the same products.

## Prerequisites

- J2Commerce installed and enabled
- At least one completed order in your store

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

1. Purchase and download the `app_reorder.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_reorder.zip` package file.
4. The plugin installs and enables automatically.

After installation:

1. Go to **J2Commerce** -> **Apps**.
2. Find **Easy Reorder** in the list and confirm it shows **Enabled**.

<!-- SCREENSHOT: J2Commerce Apps view showing Easy Reorder enabled -->

## Configuring the Plugin

Go to **J2Commerce** -> **Apps**, then click the plugin name to open its settings.

<!-- SCREENSHOT: Easy Reorder plugin settings page -->

### Basic Settings

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Redirect After Reorder** | Controls where the customer is sent after clicking Reorder. **Shopping Cart** lets them review items before proceeding. **Checkout** takes them straight to the checkout page. | `Shopping Cart` | Shopping Cart / Checkout |
| **Cart Menu Item** | The Joomla menu item for the shopping cart page. Only shown when **Redirect After Reorder** is set to **Shopping Cart**. Leave blank to use Joomla's default routing. | None | Any menu item |
| **Checkout Menu Item** | The Joomla menu item for the checkout page. Only shown when **Redirect After Reorder** is set to **Checkout**. Leave blank to use Joomla's default routing. | None | Any menu item |
| **Enable Try Again** | Shows a **Try Again** button on the checkout confirmation page when a payment fails. This lets the customer retry without manually re-adding products. | No | Yes / No |

## How It Works

### Reordering from Order History

1. A logged-in customer goes to their account and views their past orders.
2. On any order, they see a **Reorder** button (a circular arrow icon).
3. Clicking the button adds all items from that order back into the customer's shopping cart.
4. The customer is redirected to either the cart page or the checkout page, depending on your configuration.

<!-- SCREENSHOT: Order details page showing the Reorder button -->

From the cart, the customer can adjust quantities, remove items they no longer need, or proceed directly to checkout.

### Retrying After a Failed Payment

When the **Enable Try Again** setting is turned on:

1. If a customer's payment fails during checkout (for example, a declined card or a gateway timeout), the confirmation page shows a **Try Again** button instead of just an error message.
2. Clicking the button reloads all items from the failed order back into the cart.
3. The customer is redirected to the cart or checkout page to try again.

<!-- SCREENSHOT: Checkout failure page showing the Try Again button -->

This prevents the frustration of customers having to manually find and re-add all their products after a payment error.

## Tips

- Set the redirect to **Shopping Cart** if your customers often modify orders before repurchasing. Set it to **Checkout** if your repeat buyers typically reorder the exact same items.
- Enable the **Try Again** feature to reduce abandoned carts from payment failures. A customer who can retry with one click is far more likely to complete their purchase.
- The Reorder button respects current stock levels and pricing. If a product is out of stock or its price has changed since the original order, the cart will reflect the current state.

## Troubleshooting

### The Reorder button does not appear on past orders

**Cause:** The plugin may not be enabled.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and confirm the plugin shows **Enabled**.
2. Clear the Joomla cache: **System** -> **Clear Cache** -> **Clear All**.
3. Log in as a customer and view an order to verify the button appears.

### Clicking Reorder does nothing or shows an error

**Cause:** The session may have expired, causing the security token to become invalid.

**Solution:**

1. Ask the customer to refresh the page and try again.
2. If the issue persists, check that the J2Commerce system plugin is enabled under **System** -> **Manage** -> **Plugins**.

### The Try Again button does not appear after a failed payment

**Cause:** The feature is disabled by default.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and click on **Easy Reorder**.
2. Set **Enable Try Again** to **Yes**.
3. Click **Save**.

### The customer is redirected to the wrong page after reorder

**Cause:** The menu item settings may not be configured, or the wrong menu item is selected.

**Solution:**

1. Open the plugin settings.
2. Check which **Redirect After Reorder** option is selected.
3. Set the appropriate **Cart Menu Item** or **Checkout Menu Item** to the correct page in your site's menu.

## Related Topics

- [Order Management](../configuration/order-management.md)