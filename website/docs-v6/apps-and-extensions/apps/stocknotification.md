---
title: "Inventory Email Notifications"
sidebar_label: "Inventory Email Notifications"
sidebar_position: 30
description: "Automatically notify your store admin by email when products go out of stock or drop below a configured low-stock threshold."
---

# Inventory Email Notifications

The Inventory Email Notifications add-on automatically sends email alerts to your store admin when a product sells out or when its stock drops to a critical level. Instead of discovering inventory problems after orders have already been placed, you get notified in real time so you can restock quickly.

Two separate email types are supported: an out-of-stock alert (sent when quantity reaches zero) and a low-stock alert (sent when quantity drops to or below a per-product notification threshold you configure).

## Prerequisites

- J2Commerce installed and active on your Joomla 6 site
- An admin email address configured in J2Commerce (**J2Commerce** -> **Configuration** -> **Store Profile**)
- Inventory tracking enabled on your products (the **Track Inventory** option must be on)
- Joomla's mail settings configured and working (**System** -> **Global Configuration** -> **Server** -> **Mail Settings**)

## What's New in J2Commerce 6

This version of the plugin is a complete rewrite for the Joomla 6 native extension framework. Key improvements include:

- Built on the Joomla 6 event subscriber system for reliable event delivery
- Optional debug logging writes to a dedicated log file (`app_stocknotification.php`) in your Joomla logs directory — no more guessing why emails aren't arriving
- Multiple admin recipients are supported — separate addresses with commas in the **Admin Email** field
- Unprocessed template tags are automatically removed from emails so recipients never see raw `[PRODUCT_NAME]` text if data is missing

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_stocknotification.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_stocknotification.zip` package file.
4. The plugin installs and enables automatically.

<!-- SCREENSHOT: System > Install > Extensions showing the upload interface with app_stocknotification.zip selected -->

## Step 1: Enable the Plugin

After installation, verify the plugin is enabled:

1. Go to **System** -> **Manage** -> **Extensions**.
2. Search for **Inventory Email Notifications**.
3. If the status icon is grey (disabled), click it to enable the plugin.

<!-- SCREENSHOT: Extensions manager showing Inventory Email Notifications with a green enabled status -->

## Step 2: Configure the Admin Email Address

The plugin reads your admin email address from the J2Commerce store configuration. If you have not set this yet:

1. Go to **J2Commerce** -> **Configuration**.
2. Find the **Admin Email** field in the **Store Profile** section.
3. Enter the email address where stock alerts should be sent.
4. To notify multiple people, enter addresses separated by commas — for example: `owner@example.com, warehouse@example.com`.
5. Click **Save**.

<!-- SCREENSHOT: J2Commerce Configuration > Store Profile section showing the Admin Email field -->

## Step 3: Configure Per-Product Notification Quantities

The low-stock alert fires when a variant's quantity drops to or below its **Notification Quantity** threshold. You set this threshold at the product level:

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Open a product you want to monitor.
3. Click the **Inventory** tab on the product edit screen.
4. Locate the **Notification Quantity** field on the variant row.
5. Enter the quantity level at which you want to receive a warning — for example, `5` means an alert fires when stock reaches 5 units or fewer.
6. To use a store-wide default instead, tick the **Use Store Configuration** checkbox next to the field.
7. Click **Save**.

<!-- SCREENSHOT: Product edit screen > Inventory tab showing the Notification Quantity field with a value of 5 -->

To set a store-wide default notification threshold, go to **J2Commerce** -> **Configuration** -> **Inventory** and enter a value in **Store Notification Quantity**.

## Step 4: Configure the Email Templates

Open the plugin settings to customise the emails that get sent:

1. Go to **J2Commerce** -> **Apps**.
2. Find **Inventory Email Notifications** and click its name to open settings.

<!-- SCREENSHOT: J2Commerce Apps screen with Inventory Email Notifications visible -->

### Configuration Fields

| Field | Description | Default |
|-------|-------------|---------|
| **No Stock Email Subject** | Subject line for the out-of-stock email. Supports template tags. | `Product [PRODUCT_NAME] - [PRODUCT_SKU] just dropped below the minimum stock quantity levels.` |
| **No Stock Email Body** | Body content for the out-of-stock email. Supports template tags and HTML. | `Hi Store Admin, This e-mail is to remind you that your [PRODUCT_NAME] - SKU [PRODUCT_SKU] is now out of stock.` |
| **Low Stock Email Subject** | Subject line for the low-stock email. Supports template tags. | `Low stock alert: [PRODUCT_NAME] - [PRODUCT_SKU] is running low.` |
| **Low Stock Email Body** | Body content for the low-stock email. Supports template tags and HTML. | Includes product name, SKU, current quantity, and notification threshold. |
| **Debug Mode** | When enabled, writes detailed activity logs to `logs/app_stocknotification.php` in your Joomla logs directory. Disable this in production. | No |

3. Customise the subjects and bodies to match your store's language and tone.
4. Click **Save & Close**.

<!-- SCREENSHOT: Inventory Email Notifications plugin configuration screen showing all fields -->

## Template Tags

Both the subject and body fields support the following tags. These are replaced with real values when each email is sent.

| Tag | What It Inserts | Example Output |
|-----|-----------------|----------------|
| `[PRODUCT_NAME]` | Product name | `Blue Widget` |
| `[PRODUCT_SKU]` | Product SKU | `BW-001-LG` |
| `[PRODUCT_QUANTITY]` | Current stock quantity at the time of the alert | `3` |
| `[NOTIFY_QUANTITY]` | The notification threshold configured for this product | `5` |
| `[STORE_NAME]` | Your store name from J2Commerce Configuration | `My Online Store` |

**Note:** The `[PRODUCT_QUANTITY]` tag shows the quantity remaining after the triggering order was placed. In a no-stock email, this value is typically zero.

## How the Alerts Work

### Out-of-Stock Alert

An out-of-stock email is sent when a product variant's quantity reaches zero or below after an order is completed. This fires regardless of any notification threshold — it triggers automatically when stock is exhausted.

### Low-Stock Alert

A low-stock email is sent when a variant's quantity drops to or below its **Notification Quantity** value. For example, if the threshold is set to 5 and a customer purchases 3 units leaving 4 in stock, the alert fires immediately after that order.

Both alerts are sent to the email address configured in **J2Commerce** -> **Configuration** -> **Admin Email**. If that field is empty, no emails are sent.

## Tips

- Keep **Debug Mode** off in production — it adds log entries for every notification trigger and can create large log files on busy stores.
- If a product has multiple variants (sizes, colours, etc.), each variant triggers its own notifications independently. You will receive separate emails for each variant that goes out of stock.
- Use `[STORE_NAME]` in the subject line to make it easy to identify which store sent the alert when managing multiple J2Commerce installations.
- The low-stock alert fires once per qualifying inventory drop. If a customer buys 10 units and stock falls from 15 to 5 in a single order, only one low-stock email is sent for that event.

## Troubleshooting

### No emails are being received

**Cause:** The admin email field is empty, or Joomla's mail system is not configured.

**Solution:**

1. Go to **J2Commerce** -> **Configuration** and confirm the **Admin Email** field contains a valid address.
2. Go to **System** -> **Global Configuration** -> **Server** -> **Mail Settings** and click **Send Test Mail** to verify Joomla can send email.
3. Enable **Debug Mode** in the plugin settings, trigger a stock change, then check `logs/app_stocknotification.php` in your Joomla logs directory for error messages.
4. Check your spam folder — stock notification emails may be filtered by your mail provider.

### Low-stock emails are not firing even though stock is low

**Cause:** The **Notification Quantity** field on the product variant is empty or set to zero, or inventory tracking is not enabled for that product.

**Solution:**

1. Open the product in **J2Commerce** -> **Catalog** -> **Products** and switch to the **Inventory** tab.
2. Confirm the **Track Inventory** option is enabled for the variant.
3. Confirm the **Notification Quantity** field has a value greater than zero, or tick **Use Store Configuration** and confirm the store-level threshold is set in **J2Commerce** -> **Configuration** -> **Inventory**.

### Emails arrive but contain raw tag text like `[PRODUCT_NAME]`

**Cause:** This should not happen with the current version — unprocessed tags are automatically removed. If you are seeing raw tags, your site may be running an older version of the plugin.

**Solution:** Update to the latest version from the J2Commerce Extensions Store. After updating, go to **J2Commerce** -> **Apps** -> **Inventory Email Notifications** and save the configuration to reinitialise the plugin.

### Debug log file is growing very large

**Cause:** Debug Mode is enabled on a store with frequent orders.

**Solution:** Go to **J2Commerce** -> **Apps** -> **Inventory Email Notifications** and set **Debug Mode** to **No**. Delete or archive the existing log file at `logs/app_stocknotification.php` in your Joomla logs directory.

## Related Topics

- [J2Commerce Configuration](../../configuration/index.md)
- [Simple Product](../../catalog/products/simple-product.md)
