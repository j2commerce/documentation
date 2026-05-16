---
title: "Avalara AvaTax"
sidebar_label: "Avalara AvaTax"
sidebar_position: 10
description: "Connect J2Commerce to Avalara AvaTax for automated, address-verified sales tax calculation across every US jurisdiction."
---

# Avalara AvaTax

Sales tax in the United States is a patchwork of more than 13,000 jurisdictions, each with its own rates and rules. Avalara AvaTax takes that burden off your shoulders by calculating the correct tax at checkout in real time, filing detailed transaction records with Avalara's cloud service, and validating shipping addresses before orders are placed.

The Avalara AvaTax app for J2Commerce submits your orders to the AvaTax API after payment is confirmed, stores a local record of every transaction, and gives you a dashboard inside your Avalara account for reporting and remittance.

:::info Add-on required
This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.
:::

---

## What you need before you start

Before installing the plugin, gather the following from your Avalara account:

- **Account ID** — a numeric identifier found on your Avalara account page
- **License Key** — the API password associated with your Account ID
- **Company Code** — the short code Avalara assigns to each company (often `DEFAULT` for single-company accounts)
- **Your origin (ship-from) address** — street, city, state/region, postal code, and country
- **A decision on environment** — use **Sandbox** while testing, then switch to **Production** when you go live

If you don't have an Avalara account yet, sign up at [avalara.com](https://www.avalara.com). Avalara offers a free trial for evaluation.

---

## Installation

1. Purchase and download the `app_avalaratax.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. On the **Upload Package File** tab, drag the zip onto the upload area and click **Upload & Install**.
4. The plugin installs automatically. You'll see a success confirmation.

<!-- SCREENSHOT: Joomla extension manager showing successful install of app_avalaratax -->

---

## First-time setup

Work through these steps in order. Don't switch to Production until every step passes.

### Step 1 — Enable the plugin

1. Go to **J2Commerce** -> **Apps**.
2. Find **Avalara AvaTax** in the list and click its name.
3. At the top of the settings page, set **Enable** to **Yes**.
4. Click **Save** before moving on.

<!-- SCREENSHOT: J2Commerce Apps list with Avalara AvaTax highlighted -->

### Step 2 — Enter your Avalara credentials

Still on the plugin settings page, open the **Basic Settings** tab.

| Field | What to enter |
|-------|---------------|
| **Account ID** | Your numeric Avalara Account ID |
| **License Key** | Your Avalara API License Key |
| **Company Code** | Your Avalara Company Code (e.g. `DEFAULT`) |

These three fields are required. The plugin cannot connect to Avalara without them.

<!-- SCREENSHOT: Basic Settings tab showing Account ID, License Key, and Company Code fields -->

### Step 3 — Set environment to Sandbox

While you are still setting up and testing, keep **Environment** set to **Sandbox**. Sandbox transactions don't create real tax liability and won't appear in your production Avalara account.

Switch to **Production** only after you have completed all testing in Step 7 below.

### Step 4 — Configure your origin address

Open the **Origin Address** tab and fill in your ship-from address. Avalara uses this to determine origin-based tax sourcing where applicable.

| Field | Example |
|-------|---------|
| **Address Line 1** | `123 Warehouse Blvd` |
| **Address Line 2** | Suite 400 (optional) |
| **City** | `Austin` |
| **Region** | `TX` (use two-letter state/province code) |
| **Postal Code** | `78701` |
| **Country** | `US` |

Click **Save** after filling in the address.

<!-- SCREENSHOT: Origin Address tab with fields filled in -->

### Step 5 — Test the connection

Back on the main plugin settings page, scroll to the **Connection Status** panel and click **Test Connection**.

- A green **Connected** badge confirms that your credentials are correct and Avalara is reachable.
- A red **Disconnected** badge with an error message means something is wrong — double-check your Account ID, License Key, and Company Code.

<!-- SCREENSHOT: Connection status panel showing green "Connected" badge -->

:::tip Firewall note
Your server must be able to make outbound HTTPS requests to `sandbox.avalara.com` (sandbox) or `rest.avalara.com` (production) on port 443. Ask your host if outbound requests are restricted.
:::

### Step 6 — Assign the AvaTax tax profile to your products

Avalara calculates tax based on a tax profile. The plugin creates a dedicated tax profile with ID **11000** (configurable in **Tax Settings** -> **Tax Profile ID**). Every product that should be taxed via Avalara must use this profile.

To assign the tax profile to a product:

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click on a product to open the edit form.
3. Open the **Tax** tab (or **Pricing** tab depending on your template).
4. Set **Tax Profile** to the Avalara profile (ID 11000 by default).
5. Click **Save**.

Repeat for every taxable product. Products without the Avalara tax profile will fall back to J2Commerce's own tax calculation.

<!-- SCREENSHOT: Product edit form showing Tax Profile dropdown set to the Avalara profile -->

### Step 7 — Place a test order and verify tax

With the plugin in Sandbox mode:

1. Go to your store's frontend and add a product to the cart.
2. Proceed to checkout and enter a US shipping address.
3. Review the tax line in the order summary — it should show an Avalara-calculated amount rather than a flat rate.
4. Complete the checkout process.
5. In your Joomla admin, go to **J2Commerce** -> **Sales** -> **Orders** and open the order you just placed.
6. Look for the **Avalara AvaTax** panel on the order page. It shows the transaction status.

<!-- SCREENSHOT: Admin order page showing the Avalara AvaTax panel with transaction status -->

If no tax appears, check that:
- The product has the Avalara tax profile assigned (Step 6)
- The shipping address is a valid US address
- The plugin is enabled and credentials are correct

### Step 8 — Set up cron for queue processing

The plugin submits orders to Avalara through a queue. Orders are added to the queue after payment, and the queue is processed by a cron job on your server.

To get your cron URL:

1. Open the plugin settings (**J2Commerce** -> **Apps** -> **Avalara AvaTax**).
2. Open the **Queue Settings** tab.
3. Copy the URL shown in the **Cron URL** field.

It looks like this:

```
https://yoursite.com/index.php?option=com_ajax&plugin=j2commerce&group=task&task=processqueue&format=json&queue_type=app_avalaratax
```

Add this to your server's crontab. Every 5 minutes is a reasonable interval:

```bash
*/5 * * * * curl -s "https://yoursite.com/index.php?option=com_ajax&plugin=j2commerce&group=task&task=processqueue&format=json&queue_type=app_avalaratax" > /dev/null 2>&1
```

Many hosting control panels (cPanel, Plesk, DirectAdmin) have a cron job manager where you can paste this command without needing SSH access.

<!-- SCREENSHOT: Queue Settings tab showing the Cron URL field with copy button -->

### Step 9 — Switch to Production

Once your test orders look correct and tax amounts match what you expect:

1. Go back to plugin settings (**J2Commerce** -> **Apps** -> **Avalara AvaTax**).
2. Change **Environment** to **Production**.
3. Click **Save**.
4. Click **Test Connection** again to confirm the production credentials work.

From this point forward, every order will create a real transaction in your Avalara account.

---

## Configuration reference

The plugin has five settings tabs. Each field is explained below.

### Basic Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Enable** | Master switch. Set to Yes to activate the plugin. | No |
| **Environment** | Sandbox uses Avalara's test servers; Production sends real transactions. | Sandbox |
| **Account ID** | Your Avalara Account ID (numeric). | — |
| **License Key** | Your Avalara API License Key (password-masked). | — |
| **Company Code** | Your Avalara Company Code. | — |
| **Enable Fallback Rate** | When Yes, a fixed fallback rate is used if Avalara is unreachable. | No |
| **Fallback Rate** | The percentage rate applied when fallback is active (0–100). Only shown when Enable Fallback Rate is Yes. | 6 |

The fallback rate is a safety net. If Avalara's servers are temporarily unavailable, customers can still check out and a fixed rate is applied. You can reconcile the difference later in your Avalara account.

### Tax Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Tax Display Name** | The label shown to customers for the Avalara tax line (e.g. "Sales Tax"). Leave blank to use the tax profile's name. | — |
| **Tax Profile ID** | The J2Commerce tax profile ID assigned to Avalara-taxed products. Products must use this profile. | 11000 |
| **Address Validation** | When Yes, shipping addresses are validated against Avalara at checkout. | Yes |
| **Default Tax Code** | The Avalara product tax code used when a product has no specific code assigned. `P0000000` covers general tangible personal property. | P0000000 |
| **Customer Code Source** | How to identify the customer in Avalara: by email address, Joomla user ID, or order ID. | Email |

### Origin Address

These fields define where your goods ship from. Avalara requires an accurate origin address for correct tax sourcing.

| Field | Description |
|-------|-------------|
| **Address Line 1** | Street address of your warehouse or fulfillment location. |
| **Address Line 2** | Suite, unit, or building number (optional). |
| **City** | City name. |
| **Region** | Two-letter state or province code (e.g. `TX`, `CA`, `NY`). |
| **Postal Code** | ZIP or postal code. |
| **Country** | Two-letter ISO country code. Default is `US`. |

### Queue Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Cron URL** | Read-only field showing the URL to call from your cron job. Click **Copy** to copy it to your clipboard. | Auto-generated |
| **Document Type** | SalesOrder creates a temporary estimate in Avalara. SalesInvoice creates a committed document for reporting. | SalesInvoice |
| **Commit Status** | Only shown for SalesInvoice. Committed documents are locked and included in filing; Uncommitted documents can still be edited. | Uncommitted |
| **Manual Sync** | When Yes, a **Push to AvaTax** button appears on admin order pages, letting you submit individual orders by hand. | Yes |
| **Payment Status** | The order status that triggers the queue. Leave blank (0) to trigger on any payment confirmation. | — |

**Document Type explained:** Most stores should use **SalesInvoice**. This creates a document in your Avalara account that counts toward your filing. Use **SalesOrder** only if you need to preview tax amounts without recording them — for example, during initial testing before you are registered to collect tax.

### Logging

| Field | Description | Default |
|-------|-------------|---------|
| **Log Level** | What events are written to the log. None = silent, Error = failures only, Warning = failures and warnings, Info = normal activity, Debug = verbose output for troubleshooting. | Error |
| **Log API Requests** | When Yes, the full request and response from each Avalara API call is written to the log. Useful for debugging but produces large log files. | No |

Log files are written to `administrator/logs/` in your Joomla installation.

---

## Per-product tax codes

Avalara uses a system called **product tax codes** to determine what tax rules apply to each item. For example, clothing is tax-exempt in some states, while electronics are always taxable. The code `P0000000` (the default) covers general tangible personal property.

To assign a tax code to a specific product:

1. Go to **J2Commerce** -> **Catalog** -> **Products** and open the product.
2. Click the **Avalara AvaTax** tab in the product edit form.
3. For each variant (or the single variant for simple products), type at least two characters of a tax code or description into the search box.
4. Select the correct code from the autocomplete dropdown.
5. Click **Save**.

<!-- SCREENSHOT: Product edit form showing the Avalara AvaTax tab with tax code autocomplete -->

The search box pulls codes directly from the Avalara API, so you always see the most current list. Common codes include:

- `P0000000` — General tangible personal property (most physical goods)
- `PC040100` — Clothing and apparel
- `PD050001` — Digital products / software delivered electronically
- `NT` — Non-taxable item

If you leave a variant with no code assigned, the **Default Tax Code** from plugin settings is used.

---

## Manual sync from the order page

When **Manual Sync** is enabled in Queue Settings, a **Push to AvaTax** (or **Sync to AvaTax**) button appears in the Avalara AvaTax panel on every order page.

- **Push to AvaTax** — the order has not been submitted yet. Clicking this submits it immediately without waiting for the cron job.
- **Sync to AvaTax** — the order was previously submitted. Clicking this fetches the latest transaction data from Avalara and updates the local record.

To use the manual push:

1. Go to **J2Commerce** -> **Sales** -> **Orders**.
2. Open the order you want to submit.
3. In the **Avalara AvaTax** panel on the right side, click **Push to AvaTax**.
4. A confirmation dialog appears. Click **OK** to proceed.
5. A success message confirms the transaction code and the amount of tax recorded.

<!-- SCREENSHOT: Admin order page with Avalara AvaTax panel showing Push to AvaTax button -->

The manual push respects the same Payment Status trigger as the automatic queue. If a payment status is configured and the order does not match that status, the button will not appear.

---

## Queue management

The plugin uses J2Commerce's built-in queue system to process orders asynchronously. You can monitor and manage the queue from the plugin's app settings page.

### Checking queue status

1. Go to **J2Commerce** -> **Apps** -> **Avalara AvaTax**.
2. Open the **Queue Management** tab.
3. The table shows pending, processing, completed, and failed items, along with retry counts and timestamps.

Each queue item represents one order waiting to be submitted. Items move from **PENDING** to **PROCESSING** while the cron job works on them, then to **COMPLETED** on success or **FAILED** if Avalara returns an error.

<!-- SCREENSHOT: Queue Management tab showing items with status badges -->

### Retrying failed items

If items are stuck in **FAILED** status, click **Retry All** to reset all failed items back to **PENDING**. The next cron run will attempt them again.

### Clearing the queue

Click **Clear All** to remove all queue items. You'll be asked to confirm before anything is deleted. Use this only if you need to start fresh — for example, if test transactions polluted the queue before you were ready.

### How often the queue runs

The cron job runs at the interval you configure. Every 5 minutes is typical for most stores. High-volume stores may want every 1–2 minutes.

---

## Address validation

When **Address Validation** is set to Yes in Tax Settings, the plugin calls the Avalara address resolution API when a customer enters or changes their shipping address at checkout.

Avalara checks whether the address is deliverable and, where available, corrects minor typos (such as a wrong ZIP code or misspelled street name). If the address cannot be resolved, the customer sees a message prompting them to check their entry.

Address validation only works for addresses in countries that Avalara supports — primarily the United States and Canada. International addresses are passed through without validation.

This feature helps avoid tax calculation failures caused by bad addresses later when the queue processes the order.

---

## What is stored locally

The plugin creates one database table during installation:

**`#__j2commerce_appavalaratax_transactions`**

This table records every transaction submitted to Avalara, including:

| Column | What it stores |
|--------|---------------|
| `j2commerce_order_id` | Link to the J2Commerce order |
| `order_id` | The order's reference number |
| `transaction_code` | The code sent to Avalara (format: `J2C-[order_id]`) |
| `transaction_id` | Avalara's internal ID for the transaction |
| `document_type` | SalesOrder or SalesInvoice |
| `status` | Current status: pending, submitted, voided, refunded |
| `total_tax` | The tax amount Avalara calculated |
| `total_amount` | The full order amount |
| `transaction_data` | Full JSON response from Avalara |
| `created_date` | When the transaction was first submitted |
| `modified_date` | When the record was last updated |
| `voided_date` | When the transaction was voided (if applicable) |

This local record means you can see Avalara transaction details without leaving your Joomla admin. If you ever need to reconcile, the `transaction_code` column is the key that links your order to Avalara's records.

Logs are written to `administrator/logs/` using Joomla's standard logging API. The log file name follows the pattern `plg_j2commerce_app_avalaratax_[date].php`.

---

## Migrating from the J2Store version

If you previously used the Avalara AvaTax plugin for J2Store v4, the J2Commerce version automatically migrates your existing transaction history on install. The installer looks for the J2Store table `#__j2store_appavalaratax_transactions` and copies all rows into the new `#__j2commerce_appavalaratax_transactions` table.

No manual steps are needed. After installing the J2Commerce plugin and configuring your credentials, your old transaction records appear in the local transaction log alongside any new ones.

Your Avalara account itself is unaffected — all historical transactions remain there regardless.

---

## What's new compared to the J2Store version

| Area | J2Store version | J2Commerce version |
|------|----------------|-------------------|
| Architecture | FOF 2 framework, non-namespaced | Native Joomla 6 MVC, fully namespaced |
| JavaScript | jQuery-dependent | Vanilla ES6, no jQuery |
| Plugin configuration | Custom App view with its own admin route | Standard Joomla plugin settings via **J2Commerce** -> **Apps** |
| Security | Older ACL patterns | ACL check on every AJAX handler (`core.manage` on `com_j2commerce`) |
| Transaction history | Migrated on install | Auto-migrated from J2Store table on install |
| Tax code search | Basic text field | Live autocomplete against Avalara API |
| Queue | Custom queue table | J2Commerce shared queue system |

---

## Troubleshooting

### Connection test shows "Disconnected"

**Cause:** Wrong credentials, wrong environment, or a firewall blocking outbound HTTPS.

**Solution:**
1. Double-check **Account ID**, **License Key**, and **Company Code** — copy/paste them directly from your Avalara account portal to avoid typos.
2. Confirm **Environment** matches where your credentials live (sandbox credentials will not work in Production mode).
3. Ask your host whether outbound HTTPS to `sandbox.avalara.com` or `rest.avalara.com` on port 443 is allowed.

### No tax is calculated at checkout

**Cause:** The product does not have the Avalara tax profile assigned.

**Solution:** Open the product in J2Commerce (**J2Commerce** -> **Catalog** -> **Products**) and set **Tax Profile** to the Avalara profile (ID 11000 by default). Save the product and test again.

Also confirm that the plugin is enabled (Basic Settings -> Enable = Yes) and that your Avalara credentials are correct.

### "Duplicate transaction" errors in the log

This is not a real problem. When the queue retries a failed item, it sends the same transaction code (`J2C-[order_id]`) to Avalara. Avalara recognizes duplicate codes and returns the existing transaction rather than creating a new one. The plugin handles this correctly — no duplicate charges are created.

### Queue is stuck — items stay in PENDING forever

**Cause:** The cron job is not running, or the cron URL is wrong.

**Solution:**
1. Open the **Queue Settings** tab and copy the cron URL.
2. Paste it into a browser while logged in as an admin — you should see a JSON response.
3. If that works, add the URL to your crontab or hosting control panel's cron job manager.
4. If your hosting requires a different cron format, ask your host how to run a URL-based cron job.

### Queue items show FAILED

**Cause:** Avalara returned an error for the order. Common reasons: missing or invalid address, missing line items, API credentials changed.

**Solution:**
1. Set **Log Level** to **Info** (or **Debug** for maximum detail) in the Logging tab.
2. Check `administrator/logs/plg_j2commerce_app_avalaratax_*.php` for the specific error message.
3. Fix the underlying issue (correct the address on the order, re-enter credentials, etc.).
4. Click **Retry All** in the Queue Management tab.

### Checkout fails when Avalara is down

**Cause:** The Avalara API is temporarily unavailable and no fallback is configured.

**Solution:** Enable **Fallback Rate** in Basic Settings and enter a reasonable percentage (for example, `8` for 8%). This lets customers complete checkout even when Avalara is unreachable. Review any fallback-taxed orders in your Avalara account later and adjust if needed.

### The Push to AvaTax button doesn't appear on the order page

**Cause:** Either **Manual Sync** is set to No, or the order's status doesn't match the configured **Payment Status** trigger.

**Solution:** Go to **J2Commerce** -> **Apps** -> **Avalara AvaTax** -> **Queue Settings**. Set **Manual Sync** to Yes. If **Payment Status** is set to a specific status, make sure the order you're viewing has that status, or clear the Payment Status field to allow any status.

---

## Related topics

- [Tax Profiles](../../taxation/index.md)
- [Orders](../../sales/index.md)
- [Apps Overview](../index.md)
