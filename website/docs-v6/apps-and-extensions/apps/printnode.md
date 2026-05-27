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

**PrintNode works on all major brands of printers and scales, including:**

![](/img/printnode-brands.webp)

## Creating a PrintNode Account

### Sign-up tab

Go to [Printnode.com](http://Printnode.com) and create an account by clicking Sign-up

![](/img/printnode-sign-up.webp)

### Pricing tab

- Click on the Pricing tab

- Choose what type of account you want. ie: Single, Integrator, Standalone

- Choose the appropriate plan for your business.

  &#x20;Example: If you choose the 5,000 prints and have multiple departments using the same account, the 5,000 prints will be shared between the different computers.

![](/img/printnode-pricing.webp)

### Download tab&#x20;

Download the printer that will work with the type of computer you have. ie: PC/Mac

![](/img/printnode-download.webp)

### Install the Printer

Once you have downloaded the printer, double-click on it to start the installation.  When it gets to the page shown below, select Create a desktop Shortcut. This will come in handy if your computer shuts down and you need to easily turn on the printer again.

![](/img/printnode-install.webp)

### API Key tab

**Step 1:** Enter your PrintNode Password to open the API Key page

![](/img/printnode-api.webp)

**Step 2:**  Name your 'API Key Description', then select Create&#x20;

![](/img/printnode-api-1.webp)

**Step 3:** Your new API Key will appear below. This is the API Key you will need when setting up the configuration in the App on your website.

![](/img/printnode-api-2.webp)

## Purchase and Download

This plugin is a separate add-on and must be purchased and downloaded from the J2Commerce website.

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Print Node** App **->** click **View Details** **->** **Add to cart** **->** **Checkout**.&#x20;

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download**

## Install the App

You can install PrintNode using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the plugin `app_printnode.zip` package file or use the Install from URL option.

![Install extensions](<../../../assets/app install1 (1) (1).webp>)

## Enable the App

Once you have installed the App, you will need to enable it. There are **two** ways you can access the App.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

![](/img/gift-wrap-apps.webp)

To help you narrow down the list, you can do a search for **PrintNode**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![User Group](/img/print-node-enable.webp)

## Configure the App

Click on the Printnode title to open the app and start configuring it.

:::tip

Click the **Toggle Inline Help** button at the top of any app to show a description below each field.

:::

![](/img/print-node-toggle.webp)

### Enter the API Key and Test the Connection

![](/img/print-node-api.webp)

**API Key:** Your PrintNode API key. Keep this private. It's located on the PrinNode website

After saving, return to the plugin settings. The **Test Connection** button is now active — click it.

**Test Connection:** Button that verifies the API key is valid and returns the connected account email.

A result appears below the button. A successful connection shows the email address of your PrintNode account. If it shows "Connection error", double-check the key and verify your server has cURL enabled.

**Printer:** Dropdown of printers registered to your PrintNode account. Refresh to load the latest list.

![](/img/print-node-test.webp)

1. Still on the **Basic Settings** tab, click the **Refresh** icon next to the **Printer** field.
2. The dropdown populates with printers registered to your PrintNode account. Each printer shows its name and whether it is currently online or offline.
3. Select the printer that should receive invoice print jobs.
4. Click **Save**.

If no printers appear, see [Troubleshooting](#troubleshooting). It's most likely that you haven't downloaded the printers from the PrintNode website.

### Order Settings tab

![](/img/print-node-order-status.webp)

**Trigger Statuses:** In the **Trigger Statuses** field, select one or more order statuses that should automatically trigger printing. Hold Ctrl (or Cmd on Mac) to select multiple. Common choices are "Confirmed" or "Paid".

**Post-Print Status (Optional):** The **Post-Print Status** field lets you automatically move the order to a different status after a successful print — for example, moving it from "Confirmed" to "Ready to Ship" so your team knows the invoice has been printed.

Leave this field set to **— Do not change —** if you do not need automatic status transitions.

:::warning
**Important:** The post-print status must not match any of your trigger statuses. If it did, every print would trigger another print, creating an infinite loop. The plugin detects this and skips the status change automatically, but it is better to configure the statuses correctly so the intended workflow runs as expected.
:::

**Enable Manual Print Button:**Show the Print Invoice button on the admin order detail page.

**Enable Automatic Printing:** Leave **Enable Automatic Printing** set to **Yes** if you want printing to happen without any manual action.

### Print Settings tab

![](/img/print-node-print-tab.webp)



**Invoice Template:** Invoice template to use for the printed PDF. Leave empty for the default template. If you want to create a new Invoice template and need help, visit [https://docs.j2commerce.com/v6/design/invoice-templates](https://docs.j2commerce.com/v6/design/invoice-templates)

**Paper Size:** Paper size for printed invoices. Options: A4, Letter, Legal, A5.

**Number of Copies:** How many copies to print per job (1–10).

**Dompdf Library:** Read-only status indicator showing whether the Dompdf library is installed. Check the **Dompdf Library** status indicator. It should show "Dompdf library installed and ready." If it shows a warning, install the Dompdf library before proceeding.

### Status and Help Tab

![](/img/print-node-status.webp)

The **Status and Help** tab shows a live panel pulled from the PrintNode API. It displays:

- Your PrintNode account email and account ID
- The name, ID, and current state (online/offline) of the selected printer
- The state of the computer running the PrintNode client
- A table of recent print jobs with job ID, title, state, and creation time

Save your API key and refresh the page to see current data in this panel.

**Debug Mode:** Write detailed log entries to `administrator/logs/app_printnode.php`. Disable in production.

**Retry Attempts:** How many times to retry a failed print job (0–5). Retries use exponential backoff.

**API Timeout (seconds):** Timeout for PrintNode API requests (5–60 seconds).

## How Automatic Printing Works

When an order status changes in J2Commerce, the plugin checks whether the new status matches any of your configured trigger statuses. If there is a match, the plugin:

1. Generates an invoice PDF using the J2Commerce invoice system and the Dompdf library.
2. Encodes the PDF and submits it to the PrintNode API via a secure HTTPS request.
3. PrintNode queues the job and sends it to the PrintNode client running on your computer.
4. The PrintNode client delivers the job to the physical printer.
5. If a post-print status is configured, the order status is updated after the print job is submitted successfully.

A record of each print attempt — whether successful or failed — is added to the order history log so you have a complete audit trail.

![](/img/print-node-status1.webp)

## Manual Printing

If you want to print a single invoice on demand rather than waiting for a status change:

1. In Joomla admin, go to **J2Commerce** -> **Orders** and open any order.
2. At the top of the order detail page, a **PrintNode** button is displayed (only when **Enable Manual Print Button** is set to **Yes** in plugin settings).
3. Click **PrintNode**.
4. A confirmation prompt appears. Click **OK** to submit the print job.
5. A status message confirms the job was submitted, including the PrintNode job ID.

The order history is updated with the username of the admin who requested the print.

![](/img/print-node-order-button.webp)

## Creating Invoice Templates

To create an invoice template, go to J2Commerce > Design > Invoice Template > New

![](/img/print-node-template.webp)

To learn more on how to set up an invoice template, visit the documentation below [https://docs.j2commerce.com/v6/design/invoice-templates](https://docs.j2commerce.com/v6/design/invoice-templates)

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
