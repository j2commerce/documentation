---
title: "PrintNode for J2Commerce"
sidebar_label: "PrintNode"
sidebar_position: 50
description: "Automatically print order invoices to any physical printer using the PrintNode cloud printing service when an order reaches a configured status."
---

# PrintNode for J2Commerce

PrintNode connects your J2Commerce store to a cloud printing service that can send invoice PDFs directly to a physical printer the moment an order reaches a status you choose — no one needs to be sitting at a computer to click Print. The PrintNode client runs quietly in the background on any machine near your printer and picks up jobs automatically.

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

## Prerequisites

Before installing, confirm you have all of the following in place:

- A [PrintNode account](https://www.printnode.com/) (free tier covers most small stores)
- The PrintNode client application installed and running on a computer that has access to your printer
- A physical printer added and visible inside your PrintNode account dashboard
- The **Dompdf library** installed on your Joomla site (required for PDF generation — see [Invoice Settings](#invoice-settings) for a built-in status check)
- J2Commerce 6 installed and working

## Installation

This plugin is a separate add-on and must be purchased and downloaded from the J2Commerce website.

1. Purchase and download the `app_printnode.zip` package from the [J2Commerce Extensions Store](https://www.j2commerce.com).
2. In Joomla admin, go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_printnode.zip` file using the **Upload Package File** tab.
4. The plugin installs and enables automatically.
5. To confirm it is active, go to **System** -> **Manage** -> **Extensions**, search for `printnode`, and verify the status column shows a green check.

<!-- SCREENSHOT: Extensions list filtered by "printnode" showing the plugin enabled -->

## Step-by-Step Setup

### Step 1: Get Your PrintNode API Key

1. Log in to [printnode.com](https://www.printnode.com/).
2. Click your account name in the top-right corner, then choose **API Keys**.
3. Click **Generate** to create a new key.
4. Copy the key — you will need it in the next step.

<!-- SCREENSHOT: PrintNode account portal showing the API Keys page with a generated key -->

### Step 2: Enter the API Key and Test the Connection

1. In Joomla admin, go to **J2Commerce** -> **Apps**.
2. Find **PrintNode for J2Commerce** in the list and click to open its settings.
3. On the **Basic Settings** tab, paste your API key into the **API Key** field.
4. Click **Save** in the toolbar.
5. After saving, return to the plugin settings. The **Test Connection** button is now active — click it.
6. A result appears below the button. A successful connection shows the email address of your PrintNode account. If it shows "Connection error", double-check the key and verify your server has cURL enabled.

<!-- SCREENSHOT: Basic Settings tab showing the API Key field and the Test Connection button with a green "Connected" result -->

### Step 3: Select Your Printer

1. Still on the **Basic Settings** tab, click the **Refresh** icon next to the **Printer** field.
2. The dropdown populates with printers registered to your PrintNode account. Each printer shows its name and whether it is currently online or offline.
3. Select the printer that should receive invoice print jobs.
4. Click **Save**.

If no printers appear, see [Troubleshooting](#troubleshooting).

<!-- SCREENSHOT: Printer dropdown showing a list of available printers with online/offline status labels -->

### Step 4: Configure Order Trigger Statuses

1. Click the **Order Settings** tab.
2. In the **Trigger Statuses** field, select one or more order statuses that should automatically trigger printing. Hold Ctrl (or Cmd on Mac) to select multiple. Common choices are "Confirmed" or "Paid".
3. Leave **Enable Automatic Printing** set to **Yes** if you want printing to happen without any manual action.

<!-- SCREENSHOT: Order Settings tab showing the Trigger Statuses multi-select with "Confirmed" and "Paid" selected -->

### Step 5: Set a Post-Print Status (Optional)

The **Post-Print Status** field lets you automatically move the order to a different status after a successful print — for example, moving it from "Confirmed" to "Ready to Ship" so your team knows the invoice has been printed.

Leave this field set to **— Do not change —** if you do not need automatic status transitions.

**Important:** The post-print status must not match any of your trigger statuses. If it did, every print would trigger another print, creating an infinite loop. The plugin detects this and skips the status change automatically, but it is better to configure the statuses correctly so the intended workflow runs as expected.

### Step 6: Configure Invoice Settings

1. Click the **Invoice Settings** tab.
2. Choose an **Invoice Template** from the dropdown. Leave it on **— Default Template —** to use your store's default invoice layout.
3. Set the **Paper Size** that matches the paper loaded in your printer: A4, Letter, Legal, or A5.
4. Set the **Number of Copies** (1 to 10) to print per order.
5. Check the **Dompdf Library** status indicator. It should show "Dompdf library installed and ready." If it shows a warning, install the Dompdf library before proceeding.

<!-- SCREENSHOT: Invoice Settings tab showing paper size, copies, and the Dompdf status indicator -->

### Step 7: Save

Click **Save** in the toolbar. Setup is complete.

## How Automatic Printing Works

When an order status changes in J2Commerce, the plugin checks whether the new status matches any of your configured trigger statuses. If there is a match, the plugin:

1. Generates an invoice PDF using the J2Commerce invoice system and the Dompdf library.
2. Encodes the PDF and submits it to the PrintNode API via a secure HTTPS request.
3. PrintNode queues the job and sends it to the PrintNode client running on your computer.
4. The PrintNode client delivers the job to the physical printer.
5. If a post-print status is configured, the order status is updated after the print job is submitted successfully.

A record of each print attempt — whether successful or failed — is added to the order history log so you have a complete audit trail.

<!-- SCREENSHOT: Order history showing a PrintNode log entry with job ID and printer name -->

## Manual Printing

If you want to print a single invoice on demand rather than waiting for a status change:

1. In Joomla admin, go to **J2Commerce** -> **Orders** and open any order.
2. At the top of the order detail page, a **Print Invoice** card is displayed (only when **Enable Manual Print Button** is set to **Yes** in plugin settings).
3. Click **Print Invoice**.
4. A confirmation prompt appears. Click **OK** to submit the print job.
5. A status message confirms the job was submitted, including the PrintNode job ID.

The order history is updated with the username of the admin who requested the print.

<!-- SCREENSHOT: Order detail page showing the Print Invoice card at the top with the Print Invoice button -->

## Configuration Reference

### Basic Settings

| Field | Description | Default |
|-------|-------------|---------|
| **API Key** | Your PrintNode API key. Keep this private. | — |
| **Test Connection** | Button that verifies the API key is valid and returns the connected account email. | — |
| **Printer** | Dropdown of printers registered to your PrintNode account. Refresh to load the latest list. | — |

### Order Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Trigger Statuses** | Order statuses that automatically trigger printing. Multi-select. Leave empty to disable auto-print. | — |
| **Post-Print Status** | Status to move the order to after a successful print. Leave empty to keep the current status. Must not match any trigger status. | — Do not change — |
| **Enable Manual Print Button** | Show the Print Invoice button on the admin order detail page. | Yes |
| **Enable Automatic Printing** | Automatically print when an order reaches a trigger status. | Yes |

### Invoice Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Invoice Template** | Invoice template to use for the printed PDF. Leave empty for the default template. | — Default Template — |
| **Paper Size** | Paper size for printed invoices. Options: A4, Letter, Legal, A5. | A4 |
| **Number of Copies** | How many copies to print per job (1–10). | 1 |
| **Dompdf Library** | Read-only status indicator showing whether the Dompdf library is installed. | — |

### Advanced Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Debug Mode** | Write detailed log entries to `administrator/logs/app_printnode.php`. Disable in production. | No |
| **Retry Attempts** | How many times to retry a failed print job (0–5). Retries use exponential backoff. | 0 |
| **API Timeout (seconds)** | Timeout for PrintNode API requests (5–60 seconds). | 30 |

### Status and Help Tab

The **Status and Help** tab shows a live panel pulled from the PrintNode API. It displays:

- Your PrintNode account email and account ID
- The name, ID, and current state (online/offline) of the selected printer
- The state of the computer running the PrintNode client
- A table of recent print jobs with job ID, title, state, and creation time

Save your API key and refresh the page to see current data in this panel.

<!-- SCREENSHOT: Status and Help tab showing account information, printer state, and recent jobs table -->

## Troubleshooting

### "Connection error" when testing the API key

**Cause:** The API key is incorrect, or the server does not have the PHP cURL extension enabled.

**Solution:**
1. Copy the API key directly from the PrintNode website — avoid extra spaces.
2. Ask your hosting provider to confirm that the PHP `curl` extension is enabled.
3. Re-save the plugin settings and test again.

### No printers appear in the Printer dropdown

**Cause:** The PrintNode client is not running on the host computer, or the printer has not been added to your PrintNode account.

**Solution:**
1. On the computer connected to your printer, open the PrintNode client application and confirm it shows a green "Connected" status.
2. Log in to [printnode.com](https://www.printnode.com/) and verify the printer appears under **Printers**.
3. Return to the plugin settings and click the refresh icon next to the **Printer** field.

### Print job submitted but nothing prints

**Cause:** The printer may be offline, or the PrintNode client may have lost its connection.

**Solution:**
1. Open the **Status and Help** tab inside the plugin settings. Check the computer state — a "disconnected" warning means the PrintNode client is no longer connected to the cloud service.
2. Restart the PrintNode client on the host computer.
3. Verify the printer is powered on and shows as online in your PrintNode account.

### "JINVALID\_TOKEN" error on the Print Invoice button

**Cause:** The admin session token expired while the order page was open.

**Solution:** Refresh the page and click the **Print Invoice** button again.

### "Dompdf library is NOT installed" warning in Invoice Settings

**Cause:** The shared Dompdf library required for PDF generation is not installed.

**Solution:** Download and install the Dompdf library plugin from the [J2Commerce Extensions Store](https://www.j2commerce.com), then return to the Invoice Settings tab to confirm the status indicator changes to "installed and ready."

### PDF generation fails silently / print job not submitted

**Cause:** The Joomla temporary directory used by Dompdf may not be writable.

**Solution:**
1. Enable **Debug Mode** in the Advanced Settings tab and save.
2. Attempt a print, then check `administrator/logs/app_printnode.php` for error details.
3. Ensure the `tmp/` directory at the root of your Joomla site is writable by the web server.
4. Disable Debug Mode after resolving the issue.

### Orders print repeatedly / infinite loop

**Cause:** The **Post-Print Status** was set to a status that is also listed in **Trigger Statuses**.

**Solution:** The plugin detects this condition automatically and skips the post-print status change, so no infinite loop occurs. However, your intended workflow (order moving to "Ready to Ship" after printing) will not run until the configuration is corrected. Open the **Order Settings** tab, choose a **Post-Print Status** that is not in your **Trigger Statuses** list, and save.

## What Changed from J2Store PrintNode

If you are upgrading from the J2Store version of this plugin, here is what is different in the J2Commerce 6 release:

- **Native Joomla 6 architecture** — no FOF 2 framework dependency
- **Shared Dompdf library** — the PDF library is now installed once site-wide instead of bundled inside this plugin
- **J2Commerce invoice system** — invoices are generated using the same invoice templates and layout system used for email invoices
- **Infinite-loop guard** — the plugin automatically skips the post-print status update when it detects that the new status would trigger another print
- **Retry with exponential backoff** — failed print jobs can now be retried automatically (0–5 attempts, configurable)
- **API key masked in logs** — the API key is never written in full to the debug log file, only the last four characters appear
- **Vanilla JavaScript** — the manual print button and admin UI use no jQuery

## Related Topics

- [PDF Invoices](pdfinvoices.md)
- [Order Statuses](../../sales/order-statuses.md)
- [Apps and Extensions](../index.md)
