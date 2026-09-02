---
title: "Avalara VAT"
sidebar_label: "Avalara VAT"
sidebar_position: 105
description: "Calculate the correct VAT rate for every order in real time with Avalara AvaTax REST v2, record each transaction for filing, and print the legally required invoice notices for EU, UK, and other VAT/GST jurisdictions."
---

# Avalara VAT

International VAT is a maze of country-by-country rates, reverse-charge rules, and mandatory invoice wording. Avalara VAT calculates the correct rate for every order in real time, records the transaction with Avalara for filing, and prints the legally required notices customers must see before they pay — all without you memorizing a single country's tax code.

This app is built specifically for **VAT** (the European Union, the United Kingdom, and other VAT/GST jurisdictions), using Avalara's AvaTax REST v2 service. If you sell only in the United States or Canada, look for the separate **Avalara AvaTax** app instead — it is built for US/Canada sales tax and uses a different rate-lookup method.

:::info[Add-on required]

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

:::

***

## What you need before you start

Before installing the plugin, gather the following from your Avalara account:

- **Account ID** — a numeric identifier found on your Avalara account page
- **License Key** — the API password associated with your Account ID
- **Company Code** — the company linked to your account that should record these transactions
- **Your origin (ship-from) address** — street, city, state/region, postal code, and country
- **A decision on environment** — use **Sandbox** while testing, then switch to **Production** when you go live
- **A dedicated J2Commerce Tax Profile** — the plugin does not create one for you automatically. Create an empty tax profile (no local tax rates attached) in **J2Commerce** -> **Localisation** -> **Tax Profiles** before you reach the Calculation tab below

If you don't have an Avalara account yet, sign up at [avalara.com](https://www.avalara.com). Avalara offers a free trial for evaluation.

## Purchase and Download

The **Avalara VAT** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to [www.j2commerce.com](https://www.j2commerce.com) -> **Apps**.

**Step 2:** Locate the **Avalara VAT** app, click **View Details**, then **Add to Cart** -> **Checkout**.

**Step 3:** After purchase, go to **My Downloads** under your profile menu and find the app. Click **Available Versions** -> **View Files** -> **Download Now**.

## Install the App

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the plugin `plg_j2commerce_app_avalaravat.zip` file or use the Install from URL option.

<!-- SCREENSHOT: Joomla Extensions installer with the Avalara VAT zip file selected -->

## Enable the App

The plugin installs and enables itself automatically. No separate enable step is needed. However, it's important to know where to go to enable or disable it in the future.

There are **two** ways to reach the Apps list.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

<!-- SCREENSHOT: J2Commerce Apps list -->

Search for **Avalara VAT**, click the **X**, and it will turn into a green checkmark. It is now enabled and ready for setup.

<!-- SCREENSHOT: Avalara VAT row in the Apps list showing the enabled green checkmark -->

## Configure the App

Click the **Avalara VAT** title next to the green checkmark to open the plugin's settings page.

:::tip

Click the **Toggle Inline Help** button in the toolbar to see a description below each field directly in the admin panel.

:::

<!-- SCREENSHOT: Avalara VAT settings page with Toggle Inline Help highlighted -->

### Connection tab

<!-- SCREENSHOT: Connection tab showing Environment, Account ID, License Key, Company Code -->

| Field | Description |
| --- | --- |
| **Environment** | Sandbox for testing, Production for live transactions. Keep this on Sandbox until every test below passes — sandbox transactions never create real tax liability. |
| **Account ID** | Your numeric Avalara account ID (used as the API username). |
| **License Key** | Your Avalara API license key. It is never logged or echoed back by Test Connection. |
| **Company Code** | A dropdown of the companies linked to your Avalara account. Enter Account ID and License Key first, then click **Load Companies** next to the field to populate the list — it also loads automatically once credentials are already saved. Leave this unselected to disable the plugin rather than guessing a company that doesn't exist. |

Leaving Account ID, License Key, or Company Code blank disables VAT calculation entirely — the plugin never silently falls back to a default company or a partially configured state.

### Calculation tab

<!-- SCREENSHOT: Calculation tab -->

| Field | Description |
| --- | --- |
| **Tax Profile** | The J2Commerce tax profile whose line items Avalara calculates VAT for. Create this profile yourself in **Localisation** -> **Tax Profiles** first — the plugin does not create one automatically. |
| **Disable Document Recording** | When Yes, checkout still estimates VAT but no document is ever created or committed in Avalara — useful if another connector already records documents there. |
| **Commit Mode** | *Commit automatically* creates a locked SalesInvoice as soon as an order reaches a Commit status. *Save uncommitted* creates the document but leaves it uncommitted until you click **Commit** on the order card. Hidden when Disable Document Recording is Yes. |
| **Commit on Order Status** | Order statuses that queue the push to Avalara as a SalesInvoice. Multiple statuses can be selected. |
| **Void on Order Status** | Order statuses that void the committed document in Avalara. |
| **Refund on Order Status** | Order statuses that create a full ReturnInvoice in Avalara. |
| **Enable Fallback Rate** | If the Avalara API is unreachable, apply a flat percentage instead of failing the calculation. |
| **Fallback Rate (%)** | The percentage applied when fallback is active (0–100). Only shown when Enable Fallback Rate is Yes. |
| **Default Transport** | Who is responsible for moving physical goods, when not overridden per transaction. Defaults to Seller for physical goods; choose Buyer or None (services) as appropriate. |
| **Default Delivery Terms** | The Incoterm (EXW, DDP, FOB, etc.) sent with every transaction. Leave on None to let AvaTax determine the importer of record and transport arrangements on its own. |
| **Seller Is Importer of Record** | When Yes, transactions are calculated with your store as the importer of record for cross-border and import taxes. |
| **Customer Registered Through Fiscal Rep** | Whether the customer on a sale is registered through a fiscal representative in the destination VAT country. |
| **Store Registered Through Fiscal Rep** | Whether your store is registered through a fiscal representative in the nexus country for VAT. |
| **Send Exchange Rate** | When Yes, and the order actually carries a real currency-conversion rate (not the default 1.0), sends that rate to AvaTax for invoice currency conversion. |
| **Company Base Currency** | Your Avalara company's reporting currency, used together with Send Exchange Rate. Only shown when Send Exchange Rate is Yes. |
| **Second-Hand Goods (Default)** | When Yes, marks every line item as second-hand (used) goods by default. AvaTax assumes new goods unless this is set. |

### Tax Codes tab

<!-- SCREENSHOT: Tax Codes tab -->

| Field | Description |
| --- | --- |
| **Default Tax Code** | Global fallback tax code used when a product has no product- or category-level mapping. `P0000000` covers general tangible personal property. |
| **Shipping Tax Code** | Tax code applied to the synthetic shipping line on every transaction. |
| **Customer Code Source** | How the customer is identified in Avalara: by email address, Joomla user ID, or order ID. |
| **Tax Display Name** | The label shown to customers for the calculated tax line in cart and checkout totals. |

### VAT Number tab

<!-- SCREENSHOT: VAT Number tab -->

| Field | Description |
| --- | --- |
| **Send Tax/VAT Number** | When Yes, the customer's tax/VAT number (from the order's shipping or billing address) is sent to Avalara as the business identification number. |
| **Require VAT Number** | Logs a warning when an order is committed to AvaTax without a usable customer VAT number. This does not block checkout — enforce collection in your own checkout form if that's required. |
| **Auto-Correct VAT Number Prefix** | When a stored VAT number is missing its 2-letter ISO country prefix, attempts to prepend the order's country code before validating. When off, a VAT number without a prefix is never sent — a malformed number is worse than none. |
| **B2B Treatment** | Auto sends the customer's VAT number, when present and valid, so AvaTax can apply B2B VAT rules. B2C Only never sends a VAT number, forcing every transaction to B2C rules. |

### Marketplace tab

<!-- SCREENSHOT: Marketplace tab -->

| Field | Description |
| --- | --- |
| **Marketplace Mode** | *Auto* follows whether a marketplace/multivendor plugin is enabled on your store. *Off* never sends merchant fields. *On* always sends them, even without a marketplace plugin installed. |
| **Marketplace Liability Type** | Who is responsible for VAT on marketplace transactions — Seller or Marketplace. Hidden when Marketplace Mode is Off. |

### Shipping Origin tab

<!-- SCREENSHOT: Shipping Origin tab -->

By default, **Ship-From Address** is set to **Use Store Address** — the plugin reuses the address already configured in Joomla's Site Settings.

If you ship from a different address (a warehouse or fulfillment center), change **Ship-From Address** to **Use Different Address**. New fields appear:

| Field | Example |
| --- | --- |
| **Origin Address Line 1** | `123 Warehouse Blvd` |
| **Origin Address Line 2** | Suite 400 (optional) |
| **Origin City** | `Dublin` |
| **Origin State/Region** | Two-letter or standard region code |
| **Origin Postal Code** | `D02 XY45` |
| **Origin Country** | Two-letter ISO country code, e.g. `IE` |

:::tip[Incomplete origin address]

If the resolved ship-from address has no region or postal code, the plugin shows a warning banner in the admin area — jurisdiction accuracy can suffer without a complete origin address.

:::

### Logging tab

<!-- SCREENSHOT: Logging tab -->

| Field | Description |
| --- | --- |
| **File Log Level** | Verbosity of the Joomla file log. None = silent, Errors only, Warnings, Info, Debug = verbose output for troubleshooting. |
| **Log API Requests** | When Yes, the full sanitized request/response and round-trip time for every Avalara API call is recorded to a database log, viewable from the dashboard's API Log screen. |
| **Log Retention (days)** | API log rows older than this are pruned automatically while the queue processes. |
| **Debug Mode** | Enables additional debug logging to the Joomla log. Disable in production. |

Log files are written to `administrator/logs/plg_j2commerce_app_avalaravat.php` in your Joomla installation.

### Test the connection

<!-- SCREENSHOT: Test Connection and Dashboard buttons in the plugin settings toolbar -->

**Test Connection** is a button in the toolbar at the top of the plugin's settings page, next to the **Dashboard** button — not a field you scroll down to. Click it any time, even before saving, to verify your typed-in credentials.

- A success message confirms the credentials are valid and, if your entered company code matches one on your account, that it was matched too.
- An error message means something is wrong — double-check your Account ID, License Key, and Company Code.

:::tip[Firewall note]

Your server must be able to make outbound HTTPS requests to `sandbox-rest.avatax.com` (Sandbox) or `rest.avatax.com` (Production) on port 443. Ask your host if outbound requests are restricted.

:::

## Create and assign a VAT tax profile

Avalara calculates VAT only for line items assigned to one specific J2Commerce tax profile — you choose which one. The plugin does **not** create a profile for you automatically.

1. Go to **J2Commerce** -> **Localisation** -> **Tax Profiles** and create a new, empty tax profile with no local tax rates attached — for example, name it "Avalara VAT". An existing profile works too, as long as nothing else relies on its own tax rates.
2. Open the Avalara VAT app and go to the **Calculation** tab.
3. Set **Tax Profile** to the profile you just created.
4. Click **Save**.

Now assign that same profile to every product Avalara should tax:

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click on a product to open the edit form.
3. Open the **J2Commerce** tab.
4. Open the **Tax** tab (or **General** tab depending on your template).
5. Set **Tax Profile** to the profile you created in step 1 above.
6. Click **Save**.

Repeat for every taxable product, or use the plugin's **Product Tax Profiles** screen to assign the profile to many products at once — see Bulk tax profile assignment further down this page. Products left on a different tax profile fall back to J2Commerce's own tax calculation.

## When VAT is calculated

Unlike a flat rate table, VAT is calculated by calling Avalara directly — so it's worth knowing exactly when that happens:

- **Cart and early checkout steps** — no VAT is shown yet. The full shipping address isn't known and confirmed until the customer reaches the final confirm/place-order step, so nothing is calculated before then.
- **At checkout confirm** — once the shopper's full shipping address is known, the plugin sends the whole cart to Avalara as a real (but uncommitted) calculation. The result is cached for that exact cart and address, so re-loading the same confirm page doesn't cost another Avalara call.
- **When the order is saved** — the plugin reuses that same calculation (or, if needed, runs a fresh one) to charge the customer the *exact* per-line VAT amount Avalara returned, not a rounded average.
- **When the order reaches a status in Commit on Order Status** — the transaction is pushed to Avalara as a real, filed document (or left uncommitted, depending on Commit Mode).

If the Avalara API cannot be reached at the confirm step and **Enable Fallback Rate** is off, no VAT line is added and checkout continues with $0 VAT from this plugin.

## Statutory invoice messages at checkout

For certain supplies — such as reverse-charge B2B sales or export exemptions — VAT law requires the customer to see the specific legal wording explaining why VAT was or wasn't charged, before they pay. When Avalara returns these messages for a cart, the plugin displays them automatically in an information box near the order terms on the checkout confirm screen. No setting turns this on or off — it appears whenever Avalara has something to say about the transaction, and stays hidden otherwise.

## Place a test order and verify VAT

With the plugin in Sandbox mode:

1. Go to your store's frontend and add a product to the cart.
2. Proceed to checkout and enter a shipping address in a VAT-applicable country.
3. On the confirm/place-order step, review the tax line — it should show an Avalara-calculated amount rather than a flat rate.
4. Complete the checkout process.

<!-- SCREENSHOT: Checkout confirm step showing the Avalara-calculated VAT line -->

- In your Joomla admin, go to **J2Commerce** -> **Sales** -> **Orders** and open the order you just placed.
- Look for the **Avalara AvaTax** panel on the order page. It shows the transaction status.

<!-- SCREENSHOT: Order page showing the Avalara AvaTax order-card panel -->

If the order's status isn't in the **Commit on Order Status** list, it won't be queued automatically — click **Push to AvaTax** in the panel to submit it right away.

If no VAT appears, check that:

- The product has the Avalara tax profile assigned
- The shipping address was entered before reaching the confirm/place-order step (VAT does not calculate on the cart page)
- The plugin is enabled and Account ID, License Key, and Company Code are all filled in

## Set up scheduled queue processing

Orders are added to a queue after payment (or when their status matches one of the **Commit on Order Status** values). A Joomla **Scheduled Task** processes that queue in the background — there is no cron URL to copy from the plugin itself.

1. Go to **System** -> **Scheduled Tasks** -> **New**.
2. Select the task type **J2Commerce: Process Queue**.
3. Give it a title, e.g. "Process Avalara VAT Queue".
4. Configure the task's own settings:

| Field | Description | Suggested value |
| --- | --- | --- |
| **Queue Type** | Restrict this task to one queue type. Leave empty to process every J2Commerce queue type (Avalara VAT and any other apps sharing the same queue) in the same run. | `avalaravat` (or leave blank) |
| **Batch Size** | Maximum number of queue items processed per run. | `10`–`25` |
| **Release Stale** | Minutes after which a stuck "processing" item is released back to pending. | `30` |

5. Set the task to run on a recurring interval — every 5 minutes is a reasonable starting point for most stores.
6. Save the task.

Scheduled Tasks run automatically once your server's system cron (or Joomla's own web-cron trigger, shown on the **Scheduled Tasks** list page) is calling Joomla's task runner on a regular basis. If you haven't set that up yet, see your Joomla installation's cron / Scheduled Tasks documentation — this is a site-wide setting, not something specific to Avalara VAT.

:::tip[Test it manually first]

Before waiting on the scheduled task, open **J2Commerce** -> **Apps** -> **Avalara VAT** and click the **Sync Queue** quick link on the Dashboard. It immediately processes the next batch of pending items using the same logic as the scheduled task — a fast way to confirm everything is wired up correctly.

:::

## Switch to Production

Once your test orders look correct and VAT amounts match what you expect:

1. Go back to the plugin settings (**J2Commerce** -> **Apps** -> **Avalara VAT**).
2. Change **Environment** to **Production** on the **Connection** tab.
3. Click **Save**.
4. Click **Test Connection** in the toolbar again to confirm the production credentials work.

From this point forward, every order will create a real transaction in your Avalara account.

***

## Per-product tax codes

Avalara uses a system called **product tax codes** to determine what VAT rules apply to each item. For example, some countries zero-rate children's clothing or books, while electronics are always fully taxed. The code `P0000000` (the default) covers general tangible personal property.

Each product has a single tax code override — not one per variant.

To assign a tax code to a specific product:

- Go to **J2Commerce** -> **Catalog** -> **Products** and open the product.
- Click **J2Commerce** tab -> **Apps** tab -> **Avalara Tax Code** tab in the product edit form.

<!-- SCREENSHOT: Product edit form Avalara Tax Code tab with the typeahead search -->

- Start typing an industry or product type (e.g. "Clothing", "Software", "Furniture") into the search box — at least two characters trigger the search.
- Select the correct code from the autocomplete results.

The search box pulls codes directly from the Avalara API, so you always see the most current list. A **Look up a tax code on Avalara** link on the same tab opens Avalara's public tax code lookup tool if you'd rather browse the full list.

If you leave the field blank, the placeholder text shows which code the product currently resolves to — its category mapping if one exists, otherwise the **Default Tax Code** from the Tax Codes settings tab.

## Dashboard

### Category-level tax code mappings

Instead of setting a code on every product individually, you can set a default code per J2Commerce category:

- Go to **J2Commerce** -> **Apps** -> **Avalara VAT** to open the **dashboard**.
- Click **Tax Code Mapping** under the **Quick Links** section.

<!-- SCREENSHOT: Tax Code Mapping screen with category rows -->

- Add a row for each category you want to map, and enter its Avalara tax code.

A product-level override always takes priority over its category's mapping. A category mapping always takes priority over the global **Default Tax Code**.

### Bulk tax profile assignment

To assign the Avalara VAT tax profile to many products at once instead of opening each one individually:

- From the dashboard, click **Product Tax Profiles** under the **Quick Links** section.
- Select the products you want to update using the checkboxes.
- Open the **Actions** dropdown in the toolbar and choose **Set Tax Profile** (or **Clear Tax Profile** to remove it).
- Confirm the change.

### Dashboard overview

<!-- SCREENSHOT: Avalara VAT dashboard with KPI cards and charts -->

The dashboard's **AvaTax Overview** cards show total transactions, the ratio of calculation calls to committed documents, tax collected, and exempt sales for the selected date range. Below that, a **Tax Drift** chart compares the estimated tax shown to shoppers against Avalara's final committed tax, a **Transactions by Day** chart, a **Top Jurisdictions** table, and a **Document Status Breakdown** showing how many documents are committed, uncommitted, or voided.

***

## Manual sync from the order page

Every order page has an **Avalara AvaTax** panel with buttons that change depending on the order's current state — there's no setting that turns this on or off.

Go to **J2Commerce** -> **Sales** -> **Orders**. Open an order.

| Button | Appears when | What it does |
| --- | --- | --- |
| **Push to AvaTax** | No transaction has been recorded for this order yet | Submits the order to Avalara immediately, without waiting for the scheduled queue task |
| **Sync to AvaTax** | A transaction already exists | Fetches the latest transaction data from Avalara and refreshes the local record |
| **Commit** | The transaction is uncommitted (Commit Mode is set to Save uncommitted) | Locks the document in Avalara so it's included in filing |
| **Void** | The transaction is not already voided or refunded | Voids the document in Avalara. If Avalara has already filed the document, the plugin automatically issues a full ReturnInvoice instead and shows a message explaining this happened |
| **Refund** | The transaction is not already voided or refunded | Opens a refund panel where you choose Full refund, Partial refund, or Tax-only adjustment, enter an amount if needed, and send it to Avalara |

When a transaction exists, the panel also displays the document code, document type, estimated tax, final tax, exempt amount and — when returned by Avalara — a **VAT Code** and **Store VAT Number Used** field, plus any statutory **Invoice Messages** and a jurisdiction-by-jurisdiction breakdown. A **View in AvaTax** link opens the transaction directly in Avalara's web console.

Whether an order is pushed, voided, or refunded automatically is controlled by the **Commit on Order Status**, **Void on Order Status**, and **Refund on Order Status** lists on the **Calculation** settings tab — not by a separate toggle.

***

## Queue management

The plugin uses J2Commerce's shared queue system to process commit, void, and refund tasks asynchronously. You can monitor and manage the queue from the plugin's dashboard.

### Checking queue status

- Go to **J2Commerce** -> **Apps** -> **Avalara VAT** -> **Dashboard**.
- The **Sync Queue** card shows live counts for Pending, Processing, Failed, and Dead items, plus the most recent failures with their error messages.
- Click the **View Queue Log** quick link (or the **AvaTax Sync Queue** menu item) for the full list.

Each queue item represents one commit, void, or refund task. Items move from **pending** to **processing** while a worker handles them, then to **completed** on success or **failed** if Avalara returns an error. An item that fails repeatedly and exhausts its retry attempts becomes **dead**.

### Retrying failed items

Failed and dead items each show their own **Retry** button — both in the dashboard's recent-failures list and on the full **AvaTax Sync Queue** screen. Clicking it resets that item back to pending so the next queue run attempts it again. There's no single "retry all" button — retry the items you want individually.

### Processing the queue immediately

Don't want to wait for the scheduled task? Click the **Sync Queue** quick link on the Dashboard to immediately process the next batch of pending items — this runs the exact same logic as the scheduled task, just on demand.

***

## What is stored locally

The plugin creates three database tables during installation.

### `#__j2commerce_appavalaravat_transactions`

Records every transaction submitted to Avalara, including the document code, type, status, estimated and final tax, currency, jurisdiction breakdown, and — specific to VAT — the returned **VAT code**, **store VAT number used**, **liability type**, **exchange rate**, **transport**, **delivery terms**, and whether the store was recorded as importer of record.

### `#__j2commerce_appavalaravat_logs`

Records every Avalara API call when **Log API Requests** is enabled — the operation name, HTTP method and endpoint, status code, duration, and optionally the full sanitized request/response JSON. Viewable from the dashboard's **AvaTax API Log** screen. Rows older than **Log Retention (days)** are pruned automatically.

### `#__j2commerce_appavalaravat_taxmap`

Stores product- and category-level tax code overrides set on the **Avalara Tax Code** product tab and the **Tax Code Mapping** screen.

Logs are also written to Joomla's standard file log at `administrator/logs/plg_j2commerce_app_avalaravat.php`.

***

## Troubleshooting

### Test Connection shows an error

**Cause:** Wrong credentials, wrong environment, or a firewall blocking outbound HTTPS.

**Solution:**

1. Double-check **Account ID**, **License Key**, and **Company Code** — copy/paste them directly from your Avalara account portal to avoid typos.
2. Confirm **Environment** matches where your credentials live (sandbox credentials will not work in Production mode).
3. Ask your host whether outbound HTTPS to `sandbox-rest.avatax.com` (Sandbox) or `rest.avatax.com` (Production) on port 443 is allowed.

### No VAT is calculated at checkout

**Cause:** The product does not have the Avalara tax profile assigned, the plugin isn't fully configured, or the shopper hasn't reached the confirm/place-order step yet.

**Solution:** Open the product in J2Commerce (**J2Commerce** -> **Catalog** -> **Products**) and set **Tax Profile** to the profile you selected on the plugin's **Calculation** tab. Save the product and test again. Also confirm Account ID, License Key, and Company Code are all filled in on the **Connection** tab, and remember VAT only appears once a full shipping address is entered at the checkout confirm step — not on the cart page.

### "Load Companies" finds no companies, or shows an error

**Cause:** The typed-in Account ID or License Key is wrong, or hasn't been entered yet.

**Solution:** Enter both fields, then click **Load Companies** again. If the list is still empty, verify the credentials against your Avalara account portal.

### The customer's VAT number never reaches Avalara

**Cause:** **Send Tax/VAT Number** is off, **B2B Treatment** is set to B2C Only, or the stored number is missing its 2-letter ISO country prefix and **Auto-Correct VAT Number Prefix** is off.

**Solution:** Enable **Send Tax/VAT Number** and set **B2B Treatment** to Auto. If customers sometimes enter a VAT number without the country prefix (e.g. `123456789` instead of `DE123456789`), enable **Auto-Correct VAT Number Prefix** so the plugin can prepend the order's country code automatically.

### Marketplace fields are missing from transactions

**Cause:** **Marketplace Mode** is set to Auto and no marketplace/multivendor plugin is currently detected as enabled — or it's set to Off.

**Solution:** If you do run a marketplace, set **Marketplace Mode** to On to send merchant fields regardless of detection, and choose the correct **Marketplace Liability Type**.

### Queue is stuck — items stay in Pending forever

**Cause:** No scheduled task is processing the queue, or your Joomla installation's cron / Scheduled Tasks trigger isn't running.

**Solution:**

1. Go to **System** -> **Scheduled Tasks** and confirm a **J2Commerce: Process Queue** task exists, is enabled, and shows a recent last-execution time.
2. If it has never run, verify your site's cron (or Joomla's built-in web-cron trigger, shown on the Scheduled Tasks list) is actually being called on a schedule.
3. As an immediate test, open **J2Commerce** -> **Apps** -> **Avalara VAT** and click the **Sync Queue** quick link on the Dashboard. If that clears the pending items, the plugin itself is working correctly and the scheduled task simply isn't running yet.

### Queue items show Failed or Dead

**Cause:** Avalara returned an error for the task. Common reasons: missing or invalid address, no line items on the configured tax profile, or changed API credentials.

**Solution:**

1. Set **File Log Level** to **Info** (or **Debug** for maximum detail) on the **Logging** tab.
2. Check `administrator/logs/plg_j2commerce_app_avalaravat.php`, or enable **Log API Requests** and review the **AvaTax API Log** screen, for the specific error message.
3. Fix the underlying issue (correct the address on the order, re-enter credentials, assign the tax profile to the product, etc.).
4. Click **Retry** next to the item — in the dashboard's recent-failures list or on the **AvaTax Sync Queue** screen. Dead items can still be retried the same way.

### Checkout fails when Avalara is down

**Cause:** The Avalara API is temporarily unavailable and no fallback is configured.

**Solution:** Enable **Fallback Rate** on the **Calculation** tab and enter a reasonable percentage. This lets customers complete checkout even when Avalara is unreachable. Review any fallback-taxed orders in your Avalara account later and adjust if needed.

### No statutory invoice message appears at checkout

**Cause:** This is expected for most orders — Avalara only returns invoice messages for supplies that carry a specific legal notice (such as reverse-charge B2B or an export exemption). A standard taxable domestic sale has nothing to display.

**Solution:** Nothing to fix. If you expect a message and don't see one, confirm the order's VAT number, shipping country, and B2B Treatment setting are correct — the message only appears when Avalara's calculation actually applies a special VAT treatment.

### I only see "Sync to AvaTax", not "Push to AvaTax"

**Cause:** This is expected. The button shown depends on whether a transaction already exists for the order — it isn't controlled by a setting. **Push to AvaTax** only appears before the first transaction exists; once one does, **Sync to AvaTax**, **Void**, **Refund**, and (while uncommitted) **Commit** take its place.

**Solution:** Nothing to fix. To resubmit an order from scratch, **Void** it first (or **Refund** if already committed and filed), then trigger a fresh push by moving the order to a status in **Commit on Order Status**, or by clicking **Push to AvaTax** again once the previous transaction is voided.

***

## Related topics

- [Tax Profiles](../../taxation/index.md)
- [Orders](../../sales/index.md)
- [Apps Overview](../index.md)
