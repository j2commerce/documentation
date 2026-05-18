---
title: "DigiFactu — VERI*FACTU E-Invoicing"
sidebar_label: "DigiFactu E-Invoicing"
sidebar_position: 30
description: "Connect J2Commerce to DigiFactu for automatic VERI*FACTU-compliant electronic invoice submission to the Spanish Tax Agency (AEAT), with queue-based processing, order history notes, and PDF download from the admin."
---

# DigiFactu — VERI*FACTU E-Invoicing

The **DigiFactu** app connects your J2Commerce store to the [DigiFactu](https://www.digifactu.com) platform so that every qualifying order is automatically turned into a VERI\*FACTU-compliant electronic invoice and submitted to the Spanish Tax Agency (AEAT). You do not need to open DigiFactu's dashboard for day-to-day invoicing — it all happens in the background.

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

---

## Why VERI\*FACTU?

Spain's **Real Decreto 1007/2023** requires businesses subject to Spanish corporate or personal income tax to use certified invoicing software that guarantees the integrity and traceability of every issued invoice. This regulation — commonly called **VERI\*FACTU** — applies to B2B sales and is being progressively extended. Failure to comply can result in penalties from the AEAT.

The DigiFactu app handles the technical requirements: it signs each invoice payload, submits it through DigiFactu's certified REST API, and keeps a complete audit trail in your order history. As a store owner, you configure it once and it runs automatically.

---

## Prerequisites

Before installing, make sure you have:

- **Joomla 6** (or Joomla 5 with the backwards-compatibility plugin) installed and running
- **J2Commerce 6** installed, published, and working
- A **DigiFactu account** — create one at [digifactu.com](https://www.digifactu.com)
- Your **DigiFactu API key** — available in your DigiFactu account settings
- At least one **Billing Series** created in your DigiFactu account (you need its ID before you can save orders)
- The J2Commerce **Scheduled Task plugin** (`plg_task_j2commerce`) enabled and configured — this is what processes the invoice queue automatically

---

## Installation

This plugin is a separate add-on sold on the J2Commerce Extensions Store. It does not ship with the core J2Commerce 6 component.

1. Purchase and download the `app_digifactu.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_digifactu.zip` package file and click **Upload & Install**.
4. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extension Manager showing app_digifactu.zip successfully uploaded and installed -->

To confirm it is enabled, go to **J2Commerce** -> **Apps**. You should see **DigiFactu - VERI\*FACTU E-Invoicing** listed there with a green status indicator.

---

## Initial Setup

Follow these steps the first time you configure the plugin.

### Step 1: Open the plugin configuration

1. Go to **J2Commerce** -> **Apps**.
2. Find **DigiFactu - VERI\*FACTU E-Invoicing** in the list.
3. Click its name to open the plugin settings.

<!-- SCREENSHOT: J2Commerce Apps list with DigiFactu highlighted -->

### Step 2: Enter your API key

1. On the **Basic Settings** tab, paste your DigiFactu API key into the **API Key** field.
   - You can find this key inside your DigiFactu account under **Settings** or **API Access**.
   - The field accepts multi-line text, so paste the full key exactly as shown in DigiFactu.
2. Leave **Debug Mode** set to **No** for now.

<!-- SCREENSHOT: Plugin Basic Settings tab with the API Key field visible -->

### Step 3: Test the connection

After saving the API key, look for the **Test Connection** button in the plugin toolbar. Click it. You should see a confirmation message like _"Successfully connected to the DigiFactu API."_

If the test fails, double-check that:
- The API key was pasted in full without extra spaces or line breaks
- Your server can reach `https://api.digifactu.com` (no firewall blocking outbound HTTPS)

### Step 4: Enter the Default Billing Series ID

1. Switch to the **Invoice Settings** tab.
2. In the **Default Billing Series ID** field, type the ID of the billing series you want to use for invoices.
   - You can find series IDs by clicking the **Manage Billing Series** button in the plugin toolbar (see [Managing Billing Series](#managing-billing-series)).
3. Copy the Series ID shown in the table and paste it into this field.

<!-- SCREENSHOT: Invoice Settings tab with Billing Series ID field filled in -->

### Step 5: Choose the sync trigger status

Still on the **Invoice Settings** tab:

1. Click the **Sync Order Status** field and select the order status (or statuses) that should trigger invoice synchronization.
   - Most stores use **Confirmed** or **Completed** — the moment an order is paid and confirmed, the invoice is queued automatically.
   - You can select multiple statuses.

### Step 6: Save

Click **Save** in the toolbar. The plugin is now active.

---

## Configuration Reference

### Basic Settings tab

| Field | What it does | Default | Recommended value |
|-------|-------------|---------|-------------------|
| **Automatic Queue Processing** (info note) | Explains that invoices are processed by the J2Commerce scheduled task — no manual cron needed | — | Read and confirm the task is enabled |
| **API Key** | Your DigiFactu bearer token, used to authenticate every API call | _(empty)_ | Paste from DigiFactu account settings |
| **Default Billing Series ID** | The billing series under which invoices are created in DigiFactu | _(empty)_ | Paste the ID from the Manage Billing Series screen |
| **Enable Debug Mode** | Writes detailed API request/response logs to `administrator/logs/app_digifactu.log.php` | No | No in production; Yes when troubleshooting |

### Invoice Settings tab

| Field | What it does | Default | Recommended value |
|-------|-------------|---------|-------------------|
| **Sync Order Status** | One or more order statuses that automatically queue an order for invoice submission | _(none)_ | The status you apply when an order is paid/confirmed (e.g., "Confirmed") |
| **Submitted Order Status** | After a successful DigiFactu submission, the order is moved to this status automatically | _(none)_ | A custom status such as "Invoice Sent" if you want a clear paper trail; leave blank to skip the status change |
| **Sync Zero-Total Orders** | Whether to submit orders with a €0.00 total to DigiFactu | No | No — free orders typically do not require a fiscal invoice |
| **Enable Manual Sync Button** | Shows a **Sync to DigiFactu** button on each qualifying order's detail page in the admin | No | Yes — useful for re-submitting orders that failed, or for manual-only workflows |

---

## How Orders Flow to DigiFactu

Understanding the lifecycle helps you diagnose issues and choose the right settings.

### The queue lifecycle

```
Order status changes
        │
        ▼
Plugin checks: is the new status in "Sync Order Status"?
        │  No → nothing happens
        │  Yes
        ▼
Is "Enable Manual Sync Button" the only mode? → Yes → skip auto-queue
        │  No
        ▼
Is total > 0 (or "Sync Zero Orders" = Yes)?
        │  No → skip
        │  Yes
        ▼
Order added to the invoice queue (status: pending)
Note added to order history: "Order [ID] added to DigiFactu sync queue"
        │
        ▼
J2Commerce Scheduled Task runs on its configured interval
        │
        ▼
Queue item picked up → invoice payload assembled → sent to DigiFactu API
        │
        ├── Success
        │       Invoice ID and number recorded in order history
        │       Order status changed to "Submitted Order Status" (if configured)
        │       Customer notified (if status change includes notification)
        │
        └── Failure
                Error message recorded in order history
                Queue item marked as "failed" (can be retried)
```

### What data goes to DigiFactu?

The plugin sends a complete invoice payload for each order, including:

- Invoice date (taken from the order creation date, converted to your site's configured timezone)
- Order line items (product name, unit price, quantity)
- Shipping cost (added as a separate line item when greater than zero)
- Calculated VAT rate (derived from order tax / order subtotal)
- Customer billing details: name, company name, CIF/NIF (tax number), address, city, province, postal code, country, email, and phone
- Payment method
- Customer notes (added as observations)
- Payment date (if the order is in a status listed in the **Paid Statuses** field)

The plugin uses the billing tax number field as the CIF/NIF. If it is empty, it falls back to the company name field.

---

## Manual Sync

When **Enable Manual Sync Button** is set to **Yes**, a DigiFactu panel appears at the bottom of each qualifying order's detail page in the admin. "Qualifying" means the order's current status matches one of the statuses selected in **Sync Order Status**.

### Where to find it

1. Go to **J2Commerce** -> **Orders**.
2. Click any order to open its detail page.
3. Scroll down past the general information section.
4. You will see the **DigiFactu Integration** panel with a **Sync to DigiFactu** button.

<!-- SCREENSHOT: Order detail page showing the DigiFactu Integration panel with Sync and View Invoice buttons -->

### When to use manual sync

- An order failed during automatic queue processing and you have fixed the underlying issue.
- You have **Enable Manual Sync Button** enabled but **Sync Order Status** left empty — the button then appears on every order, letting you sync individually on demand.
- You need to re-submit an order that was already sent but the invoice was rejected or updated in DigiFactu.

### What happens when you click Sync to DigiFactu

1. A confirmation dialog appears asking you to confirm.
2. The plugin sends the order immediately to DigiFactu (bypassing the queue — this is a direct API call).
3. A success or failure message appears on screen.
4. A note is added to the order history recording the DigiFactu invoice ID and number.
5. If **Submitted Order Status** is configured, the order status changes immediately.

---

## Managing Billing Series

A **billing series** is a numbered sequence DigiFactu uses to assign invoice numbers. Spanish fiscal rules require invoices to be numbered consecutively within a series, so you need at least one series before any invoice can be generated.

### Open the billing series manager

1. Go to **J2Commerce** -> **Apps**.
2. Click **DigiFactu - VERI\*FACTU E-Invoicing** to open its settings.
3. Click the **Manage Billing Series** button in the plugin toolbar.

<!-- SCREENSHOT: DigiFactu plugin toolbar showing the Manage Billing Series button -->

A panel loads showing all billing series currently set up in your DigiFactu account.

### What the columns mean

| Column | Description |
|--------|-------------|
| **Name** | A human-readable label for the series (only visible in your admin) |
| **Series ID** | The unique identifier you paste into the **Default Billing Series ID** field |
| **Prefix** | Short code prepended to every invoice number in this series (e.g., `FACT`, `2025`) |
| **Description** | Optional free-text note about the series |
| **Starting Number** | The first invoice number in the sequence |
| **Annual Series** | When **Yes**, the series resets its counter at the start of each calendar year |

### Create a new billing series

1. Click **Create Billing Series** in the toolbar or panel.
2. Fill in:
   - **Name** — descriptive label (e.g., "General Sales 2025")
   - **Prefix** — short code, typically 2–6 uppercase letters (e.g., `FACT`)
   - **Description** — optional
   - **Color** — optional hex color shown next to the series name in the list
   - **Starting Number** — usually `1` for a new series
   - **Annual Series** — set to **Yes** if you want the counter to reset every January 1
3. Click **Save**.

<!-- SCREENSHOT: Create Billing Series form with fields filled in -->

### Delete a billing series

Click the delete icon next to any series in the list. You will be asked to confirm. Deleting a series from DigiFactu is permanent and may affect previously issued invoices — only delete series you are certain are no longer needed.

:::caution
Deleting a billing series in DigiFactu does not delete the invoices already issued under it. However, it removes the series from your account, so future invoices cannot be assigned to it. Consult your accountant before deleting any active series.
:::

---

## Downloading Invoices

Once an order has been successfully submitted to DigiFactu, you can download its PDF invoice directly from the Joomla admin — no need to log in to DigiFactu separately.

### How to download

1. Go to **J2Commerce** -> **Orders** and open the order you want.
2. Scroll down to the **DigiFactu Integration** panel.
3. If the order has a linked invoice in DigiFactu, a green **View Invoice** button is shown next to the sync button.
4. Click **View Invoice** to download the PDF to your computer.

<!-- SCREENSHOT: DigiFactu panel on order detail page showing the View Invoice button next to Sync to DigiFactu -->

If the **View Invoice** button is not visible, the order has not been successfully submitted to DigiFactu yet. Sync it first, then reload the order page.

---

## Troubleshooting

### The test connection fails with "Failed to connect to DigiFactu API"

**Likely causes and fixes:**

- **API key is wrong or truncated.** Copy it again directly from your DigiFactu account settings. Watch for invisible trailing spaces.
- **Server firewall.** Your hosting server may block outbound HTTPS connections to `api.digifactu.com`. Ask your host to whitelist that domain on port 443.
- **PHP cURL not installed.** The plugin uses cURL to make API calls. Run `php -m | grep curl` on your server — if cURL is not listed, ask your host to enable it.

---

### Orders are being queued but invoices never appear in DigiFactu

The queue is processed by the J2Commerce scheduled task. Check:

1. Go to **System** -> **Scheduled Tasks** in the Joomla admin.
2. Find the **J2Commerce** task and confirm it is enabled.
3. Check the **Last Run** column — if it shows a very old date or never, the task may not be running.
4. Joomla's scheduled tasks require either the built-in **System - Joomla! Scheduler** plugin to be enabled, or a real server-side cron calling `cli/joomla.php scheduler:run` on a schedule.

<!-- SCREENSHOT: Joomla Scheduled Tasks list with J2Commerce task highlighted -->

---

### The order history says "billing series is not configured"

You left the **Default Billing Series ID** field empty, or pasted an incorrect ID. To fix it:

1. Open the DigiFactu plugin settings.
2. Click **Manage Billing Series** to see the correct ID.
3. Copy the ID from the **Series ID** column.
4. Paste it into the **Default Billing Series ID** field.
5. Click **Save**, then re-queue the order using the manual sync button.

---

### The queue shows items with status "dead" or "failed"

A queue item moves to **failed** after a submission error. After several retries it becomes **dead**. To recover:

1. Open the DigiFactu plugin settings and click the **Invoice Queue** button in the toolbar.
2. Review the error — check the order history note for the original failure reason.
3. Fix the underlying issue (wrong billing series ID, API key expired, etc.).
4. Click **Retry Dead Items** to reset them to **pending** so they are picked up on the next scheduled task run.
5. Alternatively, use the **Sync to DigiFactu** button on the individual order page for an immediate retry.

---

### The "View Invoice" button does not appear after a successful sync

DigiFactu may take a moment to generate the PDF after the invoice is submitted. Wait a minute or two and reload the order page. If it still does not appear:

1. Enable **Debug Mode** in the plugin settings.
2. Check `administrator/logs/app_digifactu.log.php` for any errors when looking up the bill ID.
3. Log in directly to DigiFactu and confirm the invoice appears there.

---

### Common API error messages

| Error message | What it means |
|---------------|---------------|
| `HTTP 401` | API key is invalid or expired. Regenerate it in DigiFactu. |
| `HTTP 422` | The invoice payload failed DigiFactu validation. Enable Debug Mode and review the log for details. |
| `HTTP 404` on billing series | The Series ID you configured does not exist in your DigiFactu account. |
| `cURL error: Could not resolve host` | DNS resolution failure — your server cannot reach `api.digifactu.com`. |

---

## Logs and Debug Mode

The plugin writes to a log file at:

```
administrator/logs/app_digifactu.log.php
```

By default, only warnings and errors are written. Enabling **Debug Mode** adds detailed entries for every API request and response, including HTTP status codes and endpoint paths.

### How to enable debug mode

1. Open the DigiFactu plugin settings (**J2Commerce** -> **Apps** -> **DigiFactu**).
2. On the **Basic Settings** tab, set **Enable Debug Mode** to **Yes**.
3. Click **Save**.
4. Reproduce the problem.
5. Open the log file with a text editor (or download it via FTP/SFTP).
6. Look for lines starting with `[DigiFactu API]` for API-level messages, and other entries for plugin-level events.

:::tip
Turn debug mode off again after troubleshooting. Log files can grow large under heavy order volume.
:::

### What to share when reporting an issue

When contacting J2Commerce support about a DigiFactu problem, include:

- The content of `administrator/logs/app_digifactu.log.php` from the time window of the failure (with debug mode enabled if possible)
- The order ID that failed
- Your J2Commerce and DigiFactu plugin version numbers

---

## What Is New in the J2Commerce 6 Version

If you previously used this integration with J2Store (the predecessor product), here is what has changed in the J2Commerce 6 version:

- **No manual cron URL.** Invoice processing is handled by the native Joomla scheduled task system (`plg_task_j2commerce`). You do not need to configure a separate cron job URL.
- **Native Joomla MVC architecture.** The plugin is fully namespaced PHP 8.3+, with no legacy FOF framework dependency.
- **Vanilla JavaScript.** The admin panel (sync button, billing series manager, queue manager) uses modern browser APIs — no jQuery dependency.
- **CSRF-protected endpoints.** Every POST action (manual sync, create/delete billing series, queue management) includes a Joomla session token, preventing cross-site request forgery.
- **Queue integration.** Orders that fail on the first attempt are retried automatically by the queue system, reducing manual intervention.
- **Integrated queue manager.** You can view, delete, and retry queue items directly inside the plugin settings, without needing a separate admin tool.
- **Language support.** The plugin ships with 14 languages out of the box (Arabic, German, Greek, English US, English UK, Spanish, French, Italian, Japanese, Dutch, Polish, Portuguese, Russian, Swedish).
