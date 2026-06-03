---
title: "Opening Hours"
sidebar_label: "Opening Hours"
sidebar_position: 25
description: "Restrict customer orders to your store's operating hours. Configure per-day open/close windows and display a custom message to shoppers who try to order outside those hours."
---

# Opening Hours

Some businesses can only accept orders during specific hours of the day. A bakery that stops taking online orders at noon so the kitchen can prepare for the afternoon rush, a flower shop that closes at 6 PM, a food truck that only takes pre-orders between 8 AM and 10 AM — these are all real scenarios where an around-the-clock checkout hurts operations more than it helps.

The Opening Hours app solves this. It lets you define a from/to window for each day of the week and automatically blocks order placement outside those hours. Customers see a clear message explaining when the store is open instead of hitting a confusing error.

**Good fits for this app:**

- Bakeries, cafes, and restaurants
- Food trucks and meal kit services
- Florists and time-sensitive perishable products
- Weekend-only or limited-hours stores
- Any business where orders must be received during staffed hours

## Installation

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

1. Purchase and download the `app_openinghours.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_openinghours.zip` package file.

<!-- SCREENSHOT: Joomla extension install screen with app_openinghours.zip highlighted in the upload area -->

The plugin installs and enables automatically. Proceed to the configuration steps below.

## Enable the Plugin

After installation, confirm the plugin is published before configuring it.

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Opening Hours**.
3. If the status icon shows a red circle, click it to enable the plugin.

<!-- SCREENSHOT: Plugin Manager list filtered to "Opening Hours" showing the plugin enabled (green check) -->

Once enabled, go to **J2Commerce** -> **Apps** to access the plugin settings. Click **Opening Hours** to open the configuration panel.

## Configuration

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

<!-- SCREENSHOT: J2Commerce Apps screen showing the Opening Hours app card -->

### Available Store Times

This is the core of the plugin. The **Available Store Times** table shows one row for each day of the week. Each row has two time fields: **From** and **To**.

<!-- SCREENSHOT: The Available Store Times table with all seven days visible, showing sample times filled in for Monday through Friday and blank fields for Saturday and Sunday -->

| Day      | From field | To field  | Result                                    |
| -------- | ---------- | --------- | ----------------------------------------- |
| Monday   | `09:00`    | `17:00`   | Orders accepted 9 AM to 5 PM              |
| Saturday | *(blank)*  | *(blank)* | Store closed all day — no orders accepted |

**How the fields work:**

- **Both fields filled:** Orders are accepted only within that window. Outside the window, the store blocks checkout.
- **Both fields blank:** The store is closed all day. No orders are accepted on that day.
- **Important:** There is no "open 24 hours" mode for a single day. If you want to accept orders all day on a particular day, you must leave both the From and To fields blank for that day AND ensure that the plugin recognizes no restriction — see the note in the [Troubleshooting](#troubleshooting) section.

**Time format:** Enter times using a 24-hour clock. 9 AM is `09:00`. 2 PM is `14:00`. 11:30 PM is `23:30`. Your browser's time picker enforces this format automatically.

### Closed Store Message

The **Closed Store Message** field controls what customers read when they are blocked from completing checkout.

<!-- SCREENSHOT: The Closed Store Message textarea showing an example message with %s placeholders visible -->

You can write this message as plain text:

```
Sorry, we are not accepting orders right now. We accept orders from %s to %s.
```

The two `%s` placeholders are automatically replaced with the **From** and **To** times for the current day. For example, if Monday is configured from `09:00` to `17:00`, the customer sees:

> Sorry, we are not accepting orders right now. We accept orders from 09:00 to 17:00.

You can also enter a Joomla language constant here if your site is multilingual and you have defined a translation key. Leave the field at its default to use the built-in message.

### Debug Mode

The **Debug Mode** toggle writes decision logs to your Joomla log directory whenever the plugin runs its time check.

| Setting        | Value        | Effect                                                                   |
| -------------- | ------------ | ------------------------------------------------------------------------ |
| **Debug Mode** | No (default) | No log file written. Recommended for live stores.                        |
| **Debug Mode** | Yes          | Writes `plg_j2commerce_app_openinghours.php` to your Joomla logs folder. |

Turn debug mode on temporarily when testing your configuration. Turn it off before the store goes live — the log file grows with every checkout attempt.

<!-- SCREENSHOT: The Debug Mode toggle set to No -->

After adjusting any setting, click **Save** in the toolbar.

## Timezone

The plugin compares the current server time against your configured hours using the **timezone set in Joomla Global Configuration**. It does not use the visitor's local time or browser time.

To check or change your Joomla timezone:

1. Go to **System** -> **Global Configuration**.
2. Click the **Site** tab.
3. Find the **Server Time Zone** field and confirm it matches your store's operating timezone.

<!-- SCREENSHOT: Joomla Global Configuration Site tab with the Server Time Zone field highlighted -->

If your store is based in London and your Joomla timezone is set to UTC, orders at 1 PM London time (BST, which is UTC+1) will appear to the plugin as 12:00 PM UTC. Make sure the timezone matches the timezone where your staff are working.

## How Customers Experience the Block

The Opening Hours app enforces its check at two points in the checkout flow. Both blocks use the same **Closed Store Message**.

### At the Shipping Estimate Step

When a customer fills in their postcode to get a shipping estimate and the store is outside its open hours, the shipping estimate form displays the error message inline instead of returning shipping options.

<!-- SCREENSHOT: The checkout page at the shipping estimate step showing the Closed Store Message displayed in red beneath the postcode field -->

The customer cannot proceed past this step until the store is open.

### At the Order Confirmation Step

If a customer somehow reaches the final confirmation page while the store is closed (for example, they started checkout during open hours and the store closed before they clicked **Confirm**), the confirmation step also blocks the order. The error message appears inline on the page.

<!-- SCREENSHOT: The checkout confirmation page showing the Closed Store Message displayed as an error alert, preventing the order from being placed -->

The order is not created. The customer must wait until the store reopens and submit the order again.

## What Changed from J2Store v4

If you used the Opening Hours plugin for J2Store, here is what is different in J2Commerce 6:

**Time picker is now a native browser control.** The old version used a jQuery UI timepicker add-on. The new version uses the browser's built-in `<input type="time">` control, which is faster, more accessible, and works without loading any extra JavaScript.

**Configuration is in the standard Plugin Manager.** The old J2Store version had a custom admin view inside the J2Store Apps screen. In J2Commerce, all settings are managed directly in **J2Commerce -> Apps**, consistent with every other app plugin.

**A Debug Mode toggle was added.** The new version includes an on/off debug switch. The old version had no logging option.

**A string comparison bug was fixed.** In the original plugin, comparing times like `9:30` and `13:30` using string comparison could produce wrong results because `"9"` sorts after `"1"` alphabetically. The new version converts both the current time and the configured window to minutes-since-midnight before comparing, so the math is always correct.

**The order block no longer causes a hard redirect.** In J2Store, the confirmation-step block forced a redirect to another page. In J2Commerce, the error stays inline on the confirmation page, which is less disruptive for the customer.

## Troubleshooting

### Customers can still check out outside business hours

**Cause:** Either the plugin is not published, or all the day rows in **Available Store Times** have blank From and To fields.

**Steps to fix:**

1. Go to **System** -> **Manage** -> **Plugins** and confirm Opening Hours shows a green enabled icon.
2. Open the plugin settings in **J2Commerce** -> **Apps** -> **Opening Hours**.
3. Check the **Available Store Times** table. If both fields are blank for today's day, the plugin treats that day as "no restriction" and allows orders. Fill in the From and To times for the days you want to restrict.
4. Click **Save**.

### The block fires at the wrong hour

**Cause:** The Joomla Global Configuration timezone does not match your store's actual timezone.

**Steps to fix:**

1. Go to **System** -> **Global Configuration** -> **Site** tab.
2. Check the **Server Time Zone** value.
3. Correct it to match your store's local timezone (for example, `Europe/London` or `America/New_York`).
4. Click **Save & Close**.

### The block fires on the wrong day

**Cause:** Times are entered in 12-hour format instead of 24-hour format.

**Solution:** All times use a 24-hour clock. 2:00 PM must be entered as `14:00`, not `2:00`. Entering `2:00` as the close time means the store closes at 2 AM, not 2 PM. Check your From and To entries for any hours that should be afternoon or evening and correct them.

### The error message shows raw placeholder text (%s)

**Cause:** The **Closed Store Message** field contains a Joomla language constant that does not exist in your language file, or it was accidentally cleared.

**Solution:** Check the **Closed Store Message** field in the plugin settings. Either restore the default text using `%s` placeholders for the times, or ensure the language constant you entered is defined in your active language file.

## Related Topics

- [Apps Overview](../index.md)
- [Restrict by Shipping](./app-restrictbyshipping.md)
