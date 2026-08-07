---
title: "Inventory Command"
sidebar_label: "Inventory Command"
sidebar_position: 1
description: "Track stock from a dedicated Inventory Command dashboard and get automatic out-of-stock and low-stock email alerts for your J2Commerce store."
---

# Inventory Command

Inventory Command gives you a dedicated dashboard for watching stock levels across your entire catalog — KPIs, a sales-velocity chart, projected stock-out dates, and a searchable, exportable list of every stock-managed variant. On top of that, it can automatically email your store admin the moment a product runs out of stock or drops to a low-stock level you set per category, so you are never caught off guard by an empty shelf.

## Requirements

- with PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Inventory Command** App **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

You can install this **Inventory Command** App using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the plugin ZIP file or use the Install from URL option.

[//]: # (![Install extensions]&#40;/img/inventory-command-install.webp&#41;)

## Enable the App

Once you have installed the App, you will need to enable it. There are **two** ways you can access the extension.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

[//]: # (![Apps list]&#40;/img/inventory-command-apps-list.webp&#41;)

Look for **Inventory Command**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

[//]: # (![Enable the app]&#40;/img/inventory-command-enable.webp&#41;)

## Configure the App

Once you click on the **Inventory Command** Title next to the green checkmark, you are ready to start setting up the parameters.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

[//]: # (![Toggle inline help]&#40;/img/inventory-command-toggle.webp&#41;)

### Basic Options tab

[//]: # (![Basic options]&#40;/img/inventory-command-config1.webp&#41;)

### Email Content

The **Email Content** field gives you two buttons that add the bundled out-of-stock and low-stock email templates under the **Stock Notification** email type:

- **Joomla Editor Version** — adds the templates in a format you edit with the standard Joomla text editor.
- **Visual Editor Version** — adds the templates in a format you edit with the drag-and-drop visual builder.

If templates already exist, clicking either button converts them to that flavor without losing your saved content. Once templates exist, an **Email Templates** button appears in the toolbar — this is your shortcut straight to the **Email Templates** manager, filtered to the **Stock Notification** type, where you write the actual subject and body copy.

:::info

NOTE: Inventory Command only decides *when* an email is queued. The subject and body text always live in the **Email Templates** manager, not in this settings screen.

:::

### Enable Out-of-Stock Notifications

Select **Yes** to send an email to the store admin the moment a stock-managed product's quantity reaches zero.

### Enable Low-Stock Notifications

Select **Yes** to send an email when a product's stock drops to or below a level you set for its category.

[//]: # (![Low stock settings]&#40;/img/inventory-command-config2.webp&#41;)

#### Category Notification Levels

This table only appears when **Enable Low-Stock Notifications** is set to **Yes**. Add a row for every category you want to monitor:

| Field | Description |
|-------|-------------|
| **Category** | The Joomla content category the alert applies to. |
| **Low-Stock Level** | The stock quantity at or below which a low-stock email is sent for products in that category. Defaults to `5`. |

:::info

NOTE: Matching is by the product's own category only — a category not listed here (including its sub-categories) will not trigger low-stock alerts, unless the product's variant has its own **Notify Quantity** set under **Products -> [product] -> Inventory** tab, or falls back to the store-wide **Low Stock Notification** level under **J2Commerce -> Setup -> Configuration -> Product Settings -> Inventory**.

:::

### Show Estimated Out-of-Stock Date

Select **Yes** to include a projected out-of-stock date and day count in the low-stock email, calculated from the product's recent sales velocity.

### Estimated Average Days

*This only shows up when **Show Estimated Out-of-Stock Date** is enabled.*

Choose how far back to average sales when projecting the out-of-stock date. A longer window smooths out short-term spikes.

| Option | Value |
|--------|-------|
| Last 30 days | `30` |
| Last 60 days | `60` |
| Last 90 days | `90` |
| Last 180 days | `180` |

### Show Alerts on Dashboard

Select **Yes** to display out-of-stock (red) and low-stock (yellow) alerts directly in the J2Commerce dashboard notification scroller, so a manager sees them without opening Inventory Command at all. Each alert can be dismissed for the session with the **x**.

### Debug Mode

*Advanced setting.* Select **Yes** to write detailed logs to the Joomla log directory. Leave this set to **No** in production.

## Set the Notification Email Address

Out-of-stock and low-stock emails go to your store's configured admin address(es), not to a field inside Inventory Command itself.

Go to **J2Commerce -> Setup -> Configuration -> Store Settings** and confirm the **Store Name** and **Admin Email(s)** fields are filled in.

[//]: # (![Store settings](/img/inventory-command-store-settings.webp&#41;)

:::warning

If **Admin Email(s)** is empty, Inventory Command has nowhere to send the alert. The notification is simply marked complete without being emailed — check the site log with **Debug Mode** enabled if you suspect this is happening.

:::

## Turn On Stock Management for a Product

Inventory Command only tracks and alerts on variants that have **Manage Stock** switched on.

Open **J2Commerce -> Catalog -> Products**, edit a product, and go to its **Inventory** tab. For each variant, set the **Manage Stock** toggle to **Yes**.

[//]: # (![Manage stock toggle](/img/inventory-command-manage-stock.webp))

A variant with **Manage Stock** off is invisible to Inventory Command — it will not appear on the Inventory list, the dashboard, or trigger any alert, no matter how low its stock quantity is.

## The Inventory Command Dashboard{#dashboard}

Go to **J2Commerce -> Setup -> Inventory Command** to open the dashboard. It gives you a store-wide health check for every managed variant.

[//]: # (![Inventory Command dashboard](/img/inventory-command-dashboard.webp))

- **Date filter bar** — pick a custom From/To range, or use the **Last 7 Days / Last 30 Days / Last 90 Days** preset buttons, then click **Refresh**. This scopes the sales-velocity chart and the top-sellers chart.
- **Inventory health badge** — a single Healthy / Needs Attention / Critical badge, weighted more heavily toward out-of-stock variants than low-stock ones.
- **KPI tiles** — Out of Stock, Low Stock, Healthy, Units On Hand, Inventory Value, and Stock-Outs In 30 Days.
- **Sales Velocity / Projected Stock-Outs / Top Sellers charts** — a tabbed chart showing units sold per day, a bar chart of how many variants will run out within 7 days, 8–14 days, 15–30 days, or over 30 days, and the average units per month for your busiest products.
- **Inventory Health chart** — a doughnut chart of the Out of Stock / Low Stock / Healthy split.
- **Quick Links** — one-click shortcuts to the Inventory list (all, out-of-stock only, or low-stock only), the Email Templates manager, and the plugin's own Settings screen.
- **Currently Out of Stock / Low Stock / Running Out Soonest** cards — the ten (or eight) most urgent variants in each category, each linking straight to the product edit screen, with a **View All** button to the full Inventory list.

:::info

NOTE: If neither **Enable Out-of-Stock Notifications** nor **Enable Low-Stock Notifications** is turned on, the dashboard shows a banner reminding you the figures are still accurate, but no emails are being sent.

:::

## The Inventory List{#inventory-list}

Go to **J2Commerce -> Setup -> Inventory Command -> Inventory** (or click **Inventory** in the toolbar from the dashboard) to see every stock-managed variant in one sortable, filterable table.

[//]: # (![Inventory list](/img/inventory-command-inventory-list.webp))

**Columns:** Status, Product, Variant, SKU, Category, In Stock (with an "on hold" note when applicable), Low-Stock Level, Estimated OOS (out-of-stock date and days remaining), and Stock Value (quantity x price).

**Filters:** Search by product name or SKU, filter by **Stock Status** (Out of Stock / Low Stock / Healthy), and filter by **Category**.

**Sorting:** Every visible column is sortable from the column header or the **Sort By** dropdown.

**Toolbar actions:**

- **Send Notification** — select one or more rows with the checkboxes, then click **Send Notification** to queue an out-of-stock or low-stock email for those variants right now, regardless of the automatic trigger. A variant that already has a matching notification queued is skipped.
- **Export CSV** — downloads the currently filtered and sorted list as a CSV file, including status, product, variant, SKU, category, stock, threshold, estimated out-of-stock date, and stock value.
- **Email Templates** — jumps to the Email Templates manager filtered to Stock Notification.
- **Settings** — jumps back to the plugin's configuration screen.

:::info

NOTE: When the list is completely empty (no stock-managed variants exist yet and no filters are active), you'll see a **No Stock-Managed Variants** message with a **Go To Products** button.

:::

## Editing the Email Content{#email-content}

The subject line and body of the out-of-stock and low-stock emails are edited in the core **Email Templates** manager, not in the Inventory Command settings screen.

Go to **J2Commerce -> Setup -> Email Templates**, or use the **Email Templates** button on the dashboard, the Inventory list toolbar, or the app's own Basic Options tab. Filter by the **Stock Notification** email type to find the **Out of Stock** and **Low Stock** context rows.

Available merge tags for these templates:

| Tag | Inserts |
|-----|---------|
| **Product Name** | The product's title. |
| **Product SKU** | The variant's SKU. |
| **Current Stock** | The stock quantity at the moment the alert fired. |
| **Notification Level** | The low-stock threshold that applied to this variant. |
| **Category Name** | The product's category. |
| **Store Name** | Your store name from Store Settings. |
| **Date** | The date the notification was queued. |
| **Estimated Out of Stock** | A formatted callout combining the estimated date and day count. |
| **Estimated Out-of-Stock Date** | The projected stock-out date on its own. |
| **Estimated Days to Out of Stock** | The projected day count on its own. |

The estimated-date tags only render when **Show Estimated Out-of-Stock Date** is turned on and the plugin has enough recent sales history to project from.

## How It Works{#how-it-works}

1. Every time a variant's stock quantity changes, Inventory Command checks whether **Manage Stock** is on for that variant.
2. If the new quantity is zero or less and **Enable Out-of-Stock Notifications** is on, an out-of-stock notification is added to the J2Commerce queue.
3. If the new quantity is above zero and **Enable Low-Stock Notifications** is on, the plugin resolves the applicable low-stock level — the category's configured **Low-Stock Level** first, falling back to the product's own **Notify Quantity** (or the store-wide default) if the category is not listed. If the new quantity is at or below that level, a low-stock notification is queued.
4. A duplicate check skips queuing a second notification of the same type for the same variant while one is still pending, processing, or failed.
5. The **J2Commerce: Process Queue** scheduled task (**System -> Scheduled Tasks**) picks up queued notifications, resolves the matching **Stock Notification** email template, fills in the merge tags, and sends the email to your **Admin Email(s)**.
6. If **Show Alerts on Dashboard** is on, the same out-of-stock and low-stock variants also appear as dismissible entries in the main J2Commerce dashboard notification scroller.

## Display Conditions{#display-conditions}

**An out-of-stock email is queued when:**

- **Enable Out-of-Stock Notifications** is set to **Yes**, and
- the variant has **Manage Stock** turned on, and
- its stock quantity reaches zero or below.

**A low-stock email is queued when:**

- **Enable Low-Stock Notifications** is set to **Yes**, and
- the variant has **Manage Stock** turned on, and
- its product's category has a **Low-Stock Level** configured (or the variant/store has its own Notify Quantity), and
- its stock quantity drops to or below that level while still above zero.

**Dashboard scroller alerts appear when:**

- **Show Alerts on Dashboard** is set to **Yes**, and
- the underlying product is published and enabled, in either case above.

## Tips{#tips}

- **Set category levels before turning on low-stock alerts** — without at least one row in **Category Notification Levels** (and no variant-level fallback), low-stock alerts for that category will never fire.
- **Confirm the Admin Email(s) field first** — a beautifully configured alert with nowhere to send is a silent failure. Check **J2Commerce -> Setup -> Configuration -> Store Settings** before relying on this app.
- **Use the Inventory list's Export CSV** before a big restock meeting — it gives you a shareable snapshot of exactly what's low, filtered however you left the screen.
- **Turn on Show Estimated Out-of-Stock Date** for your fast movers — the day-count projection is a fast way to prioritize which reorder to place first.
- **Use Send Notification sparingly** — it's meant for a one-off nudge on a handful of rows, not as your primary alerting mechanism; let the automatic triggers do the day-to-day work.

## Troubleshooting{#troubleshooting}

### No Emails Are Being Sent{#no-emails-are-being-sent}

**Cause:** Notifications are not enabled, the admin email is missing, or the scheduled task is not running.

**Solution:**

1. Go to **J2Commerce -> Apps -> Inventory Command** and confirm **Enable Out-of-Stock Notifications** and/or **Enable Low-Stock Notifications** is set to **Yes**.
2. Go to **J2Commerce -> Setup -> Configuration -> Store Settings** and confirm **Admin Email(s)** is filled in.
3. Go to **System -> Scheduled Tasks** and confirm **J2Commerce: Process Queue** exists, is enabled, and has run recently.
4. Turn on **Debug Mode** in the app settings and check the site log for entries tagged `app_stocknotification`.

### A Product Never Shows Up on the Inventory List or Dashboard{#a-product-never-shows-up}

**Cause:** The variant does not have Manage Stock turned on, or the product/article is not published.

**Solution:**

1. Go to **J2Commerce -> Catalog -> Products** and open the product.
2. Go to the **Inventory** tab and set **Manage Stock** to **Yes** for the variant.

[//]: # (![Manage stock toggle](/img/inventory-command-manage-stock.webp))

3. Confirm the product is enabled and its linked article is published.

### A Category Never Triggers a Low-Stock Alert{#a-category-never-triggers}

**Cause:** No **Low-Stock Level** row is configured for that category, and the fallback variant/store level is also empty or zero.

**Solution:**

1. Go to **J2Commerce -> Apps -> Inventory Command** and add a row for the category under **Category Notification Levels**.
2. Alternatively, open the product's variant under **Products -> [product] -> Inventory** and set its own **Notify Quantity**.
3. Or set a store-wide default under **J2Commerce -> Setup -> Configuration -> Product Settings -> Inventory -> Low Stock Notification**.

### Duplicate Emails Keep Arriving{#duplicate-emails-keep-arriving}

**Cause:** A prior notification failed and was retried, or **Send Notification** was used manually while an automatic alert was also queued.

**Solution:**

1. Go to the **Inventory** list, select the variant, and check whether a notification is already pending before clicking **Send Notification**.
2. Turn on **Debug Mode** and review the log to confirm whether the duplicate came from the automatic trigger or a manual send.

### The Estimated Out-of-Stock Date Is Missing{#the-estimated-out-of-stock-date-is-missing}

**Cause:** The feature is off, or the variant has no recent sales to project from.

**Solution:**

1. Go to **J2Commerce -> Apps -> Inventory Command** and confirm **Show Estimated Out-of-Stock Date** is set to **Yes**.
2. Check that the variant has sold at least one unit within the **Estimated Average Days** window — a variant with no sales in that window cannot be projected and is intentionally left blank rather than showing a misleading "0 days."

### The CSV Export Downloads Empty or Truncated{#the-csv-export-downloads-empty}

**Cause:** Active filters on the Inventory list exclude every row, or the catalog exceeds the export cap.

**Solution:**

1. Clear the **Search**, **Stock Status**, and **Category** filters on the Inventory list and try again.
2. If your catalog is very large, narrow the filters (for example, by category or status) before exporting — the export is capped at 5,000 rows to protect server memory.
