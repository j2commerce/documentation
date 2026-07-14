---
title: "Advanced Notify"
sidebar_label: "Advanced Notify"
sidebar_position: 5
description: "Build custom order-notification rules in J2Commerce — extra admin recipients by country or order status, per-product and per-vendor customer emails, and scheduled low-stock alerts by category."
---

# Advanced Notify

Advanced Notify is a rule engine for order emails. Instead of one fixed admin notification, you build a list of **rules** — each rule watches for a condition (a billing country, an order status, a specific product, a vendor, or a stock level) and reacts to it: adding extra recipients, sending a separate templated email, or emailing a low-stock report.

You can combine as many rules as you need, in any order, without touching a single line of code.

## What Advanced Notify Can Do

Advanced Notify supports five rule types:

| Rule type | What triggers it | What it does |
|-----------|-------------------|---------------|
| **Country Rule** | The admin order-notification email is about to send | Adds extra recipients (matched by the order's billing country) to the admin email |
| **Order Status Rule** | The admin order-notification email is about to send | Adds extra recipients matched by the order's current status |
| **Product Rule** | The customer order-notification email is about to send | Sends a separate, fully templated email for each matched product found in the order |
| **Vendor Rule** | The customer order-notification email is about to send | Sends a templated order-summary email to each vendor whose products were part of the order |
| **Category Rule** | Your server's cron scheduler calls the Advanced Notify cron URL | Emails a low-stock product report for products in the chosen categories, filtered by a stock quantity range |

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

## Installation

Advanced Notify is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `plg_j2commerce_app_advancenotify.zip` package from the J2Commerce website.
2. In the Joomla admin, go to **System -> Install -> Extensions**.
3. Upload the ZIP file, or use the **Install from URL** option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

### Enable the Plugin

1. Go to **System -> Manage -> Plugins**.
2. Search for **Advanced Notifications**.
3. Click the red **X** in the **Status** column to enable it — it turns into a green checkmark.

<!-- SCREENSHOT: Plugins list showing Advanced Notifications enabled -->

## Configure the Plugin

Open the plugin's settings (**System -> Manage -> Plugins -> Advanced Notifications**) to set the following options.

<!-- SCREENSHOT: Advanced Notifications plugin edit screen showing the three configuration fields -->

| Field | Description | Default | Options |
|-------|-------------|---------|---------|
| **Admin Recipient Change Type** | How the extra recipients from matched **Country Rule** and **Order Status Rule** conditions (and the recipients on a **Product Rule** condition) are added to the outgoing email. | `Add to BCC` | **Add to BCC** — recipients are blind-copied, invisible to other recipients. **Add to CC** — recipients are copied openly, visible to everyone on the email. **Replace Recipient** — the matched recipients completely replace the normal "To" address(es). |
| **Category Low-Stock Cron URL** | A read-only field showing the exact URL to add to your server's cron scheduler so **Category Rule** low-stock emails go out on a schedule. See [Scheduling the Category Rule Cron](#scheduling-the-category-rule-cron) below. | — | — |
| **Debug Mode** | Turns on debug logging for the plugin, written to the Joomla log directory. | `No` | **Yes** / **No** |

Click **Save** when you are done.

:::info

**Replace Recipient** discards the original "To" address entirely for that email — use it only if you genuinely want matched recipients to be the sole recipients, not an addition to your usual admin address.

:::

## Scheduling the Category Rule Cron

**Category Rule** low-stock emails do not send automatically when an order is placed — they send when your server's cron scheduler calls a special URL. The plugin builds this URL for you from your J2Commerce **Queue Key**.

1. Go to **J2Commerce -> Configuration** (or click **Options** in the toolbar of any J2Commerce admin screen) and open the **Store Settings** tab.
2. Confirm the **Queue Key** field has a value. This is a security key that ensures only your own server can trigger the cron job.
3. Go back to **System -> Manage -> Plugins -> Advanced Notifications** and copy the value shown in **Category Low-Stock Cron URL**. It looks like this:

```
index.php?option=com_j2commerce&task=cron.execute&command=category_notify&cron_secret=[your-queue-key]
```

<!-- SCREENSHOT: Category Low-Stock Cron URL field with the generated URL visible -->

4. Add the full site URL plus this path to your host's cron job manager (cPanel Cron Jobs, Plesk Scheduled Tasks, or a `curl`/`wget` command in a Linux crontab), scheduled to run as often as you want low-stock checks to happen — daily is a common choice.

:::tip

If your host does not offer a cron scheduler, a free external "cron ping" service that calls a URL on a schedule works just as well — the endpoint only needs a plain HTTP GET request.

:::

## Managing Rules

Rules are managed on their own screen inside J2Commerce, not in the plugin's parameter form.

1. Go to **J2Commerce -> Apps**.
2. Find **Advanced Notifications** and click **Manage Rules** — or open the plugin itself (**System -> Manage -> Plugins -> Advanced Notifications**) and click the **Manage Rules** button in the toolbar.

<!-- SCREENSHOT: J2Commerce Apps screen and the Manage Rules toolbar button -->

You will see the **Advanced Notifications Rules** list — every rule you have created, with its name, type, and ordering.

<!-- SCREENSHOT: Advanced Notifications Rules list showing several rules of different types -->

### Creating a Rule

1. From the rules list, click **New Rule**.
2. Fill in:

| Field | Description |
|-------|-------------|
| **Rule Name** | A label to help you recognize this rule later, for example "EU VAT team" or "Low stock — Electronics". |
| **Rule Type** | One of **Country Rule**, **Order Status Rule**, **Product Rule**, **Vendor Rule**, or **Category Rule**. This cannot be changed once conditions have been added, so choose carefully. |
| **Ordering** | A number controlling where this rule sits in the list. Lower numbers run first. |

<!-- SCREENSHOT: New Rule form with Rule Name, Rule Type, and Ordering fields -->

3. Click **Save** (or **Save & Close**).

:::info

You must save the rule before you can add conditions to it — a new, unsaved rule shows a notice asking you to save first.

:::

### Adding Conditions

Once a rule is saved, its **Conditions** section appears below the rule fields. Click **Add Condition** to add a row, fill in the fields for that rule type, and click **Save** in the toolbar to store all of the rule's conditions at once.

<!-- SCREENSHOT: Conditions table for a rule with Add Condition button -->

Each rule type has its own condition fields:

#### Country Rule

| Field | Description |
|-------|-------------|
| **Country** | A multi-select list of billing countries that trigger this condition. Choose **All** to match every country. |
| **Admin Email** | One or more email addresses (comma-separated) to add as recipients when the order's billing country matches. |

#### Order Status Rule

| Field | Description |
|-------|-------------|
| **Order Status** | A single order status. When an order carries this status, the condition matches. |
| **Admin Email** | One or more email addresses (comma-separated) to add as recipients when the status matches. |

#### Product Rule

| Field | Description |
|-------|-------------|
| **Product** | A searchable multi-select field — start typing a product name or SKU and choose one or more products from the results. |
| **Admin Email** | One or more email addresses (comma-separated) that receive a dedicated email whenever a matched product appears in an order. |
| **Subject** / **Body** | The email template sent for this condition — see [Email Templates](#email-templates) below. |

#### Vendor Rule

| Field | Description |
|-------|-------------|
| **Vendor** | A multi-select list of vendors. Choose **All** to match every vendor, or pick specific vendors. |
| **Subject** / **Body** | The order-summary email template sent to the matched vendor(s) — see [Email Templates](#email-templates) below. |

:::info

A vendor only receives their email if their vendor profile has a valid email address on file. See [Troubleshooting](#vendor-emails-are-never-sent) if a vendor rule seems to be silently skipped.

:::

#### Category Rule

| Field | Description |
|-------|-------------|
| **Category** | A multi-select list of the product categories to check for low stock. |
| **From Stock Quantity** | The minimum stock quantity to include in the report (products at or above this level are candidates). |
| **To Stock Quantity** | The maximum stock quantity to include (leave at `0` for no upper limit). |
| **Admin Email** | One or more email addresses (comma-separated) that receive the low-stock report. |
| **Subject** / **Body** | The report email template — see [Email Templates](#email-templates) below. |

:::info

Only products with **Manage Stock** enabled, **Allow Backorder** disabled, and **Availability** enabled are eligible to appear in a Category Rule report. Products that allow backorders or don't track stock are intentionally excluded.

:::

## Email Templates

**Product Rule**, **Vendor Rule**, and **Category Rule** conditions each have their own **Subject** and **Body** fields — this is the actual email that gets sent, written by you.

The body accepts J2Commerce's standard order tags (the same tags used in your regular order-notification emails, such as the customer name, order number, and order total) plus one special tag unique to that rule type:

| Rule type | Special tag | What it inserts |
|-----------|-------------|------------------|
| **Product Rule** | `[PER_ITEM]` | The details of the single matched order item that triggered this email. |
| **Vendor Rule** | `[VENDOR_ITEMS]` | The list of order items belonging to that vendor. |
| **Category Rule** | `[PRODUCT_ITEMS]` | The list of low-stock products found by this condition, with SKU and current quantity. |

<!-- SCREENSHOT: Product Rule condition row showing Subject, Body, and the [PER_ITEM] tag hint -->

:::tip

Leave **Subject** or **Body** blank to skip sending for that particular condition — Advanced Notify only sends a templated email when both fields are filled in.

:::

### Removing a Condition

Click **Delete** on the condition's row and confirm. This only removes that single condition — the rule itself remains.

### Deleting a Rule

From the rules list, select the checkbox next to one or more rules and click **Delete** in the toolbar.

<!-- SCREENSHOT: Rules list with checkboxes selected and Delete button highlighted -->

:::info

Deleting a rule also permanently deletes all of its conditions and email templates. This cannot be undone.

:::

## How It Works

1. When an order status changes and J2Commerce prepares to send its **admin** notification email, Advanced Notify checks every **Country Rule** and **Order Status Rule** condition against the order's billing country and current status, and adds any matching email addresses using your configured **Admin Recipient Change Type**.
2. When J2Commerce prepares to send its **customer** notification email, Advanced Notify checks every **Product Rule** and **Vendor Rule** condition. Matched **Product Rule** conditions each fire a separate templated email; matched **Vendor Rule** conditions group the order's items by vendor and send one summary email per vendor.
3. On the schedule you set up, your server calls the Category Low-Stock Cron URL. Advanced Notify checks every **Category Rule** condition, looks up matching low-stock products, and sends the report email if any products are found.

## Tips

- **Order matters for admin rules.** If two Country Rule or Order Status Rule conditions both match the same order, their recipient lists are combined and de-duplicated — you won't get the same address twice.
- **Use "All" sparingly.** A Country Rule or Vendor Rule condition set to **All** matches every order — useful for a catch-all notification, but easy to forget about later.
- **Test with Debug Mode on** while you're setting up a new rule, then turn it off once you've confirmed emails are sending correctly.
- **Keep templates short and focused.** The special tags (`[PER_ITEM]`, `[VENDOR_ITEMS]`, `[PRODUCT_ITEMS]`) already format the item/product details as a list — you don't need to re-list products in your own text.

## Troubleshooting

### Emails Are Not Arriving

**Cause:** A condition or its email template is incomplete, or Joomla's mail configuration is misconfigured.

**Solution:**

1. Open the rule and confirm the matching condition is actually saved (row still shows after a page refresh).
2. For Product Rule, Vendor Rule, and Category Rule conditions, confirm **both** **Subject** and **Body** are filled in — a blank template is skipped silently.
3. Go to **System -> Global Configuration -> Server** and confirm the **Mail Settings** are correct, then send a test email from Joomla itself.
4. Enable **Debug Mode** in the Advanced Notifications plugin settings and check the Joomla log directory for send failures or errors.

### The Category Rule Cron Never Fires

**Cause:** The scheduled job is calling the wrong URL, or the `cron_secret` value doesn't match your current **Queue Key**.

**Solution:**

1. Go to **System -> Manage -> Plugins -> Advanced Notifications** and copy the current **Category Low-Stock Cron URL** value exactly.
2. Compare it against the URL configured in your cron scheduler — if the **Queue Key** was ever regenerated in **J2Commerce -> Configuration -> Store Settings**, the old scheduled URL is now invalid and must be updated.
3. Test the URL by pasting it directly into a browser address bar (with your site's domain in front) — a working request returns a plain success response.

### Vendor Emails Are Never Sent

**Cause:** The matched vendor has no email address on file, so Advanced Notify has nowhere to send the summary.

**Solution:**

1. Go to **J2Commerce -> Vendors** (or wherever vendor profiles are managed on your site) and open the vendor in question.
2. Confirm the vendor's address record includes a valid **Email** value.
3. Save the vendor profile and place a new test order containing one of that vendor's products to confirm the email now sends.

### A Product or Category Never Shows Up in a Report

**Cause:** The product's stock settings exclude it from low-stock checks, or its category isn't selected in the condition.

**Solution:**

1. Open the product and confirm **Manage Stock** is enabled, **Allow Backorder** is disabled, and **Availability** is enabled.
2. Confirm the product's category is included in the **Category** field of the Category Rule condition.
3. Confirm the current stock quantity actually falls between **From Stock Quantity** and **To Stock Quantity**.

## What's New in J2Commerce

Advanced Notify has been rebuilt from the ground up for J2Commerce 6:

- **Native Joomla 6 architecture** — no more legacy framework dependencies; the plugin uses standard Joomla plugin, model, and controller patterns.
- **No jQuery** — the rules and conditions screens run on modern, dependency-free JavaScript.
- **Secure AJAX everywhere** — every save, delete, and search action is protected by a CSRF token, a login check, and a J2Commerce permission check.
- **Standard plugin configuration** — all settings live in the normal Joomla **Plugins** manager, just like every other J2Commerce plugin, instead of a bespoke settings screen.
- **PayPal merchant-email swap retired** — the old feature that could redirect PayPal proceeds to a different merchant email inside a Country Rule condition has been removed. J2Commerce's PayPal integration now uses REST API client ID/secret credentials tied to a single connected account, so there is no merchant email field left to swap.
