---
title: "Printify Print-on-Demand"
sidebar_label: "Printify Print-on-Demand"
sidebar_position: 10
description: "Connect your Printify account to J2Commerce to browse the print-on-demand catalog, create custom products, manage artwork, and automate order fulfillment."
---

# Printify Print-on-Demand

This plugin bridges your J2Commerce store with [Printify](https://printify.com) — one of the largest print-on-demand networks around. Hook it up once, and you can browse Printify's catalog of hundreds of customisable products (t-shirts, mugs, posters, hats, bags, and more), drop your own artwork on them, price them how you like, and pull them straight into J2Commerce as real products. When someone buys, the plugin sends the order to Printify for production and fulfilment. No inventory. No packing boxes. Printify handles the physical side entirely.

## What is Print-on-Demand?

Print-on-demand means nothing gets made until someone buys it. You upload your design. A print provider — one of Printify's manufacturing partners — prints that design on the product and ships it straight to your customer. Your store never sees, touches, or warehouses the stock. It's a low-risk way to sell branded merchandise without any upfront investment in inventory.

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_printify.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_printify.zip` package file.
4. The plugin installs and enables automatically.

After installation, configure the plugin by going to **J2Commerce** -> **Apps**.

<!-- SCREENSHOT: J2Commerce Apps screen showing the Printify Print-on-Demand app card -->

---

## Getting Your Printify API Token

You need a Personal Access Token from Printify before anything else will work.

1. Log in at [printify.com](https://printify.com).
2. Click your account name in the top-right corner and choose **My profile** (or **Settings**).
3. Go to the **Connections** tab and click **API**.
4. Hit **Generate new token**, name it something useful like "J2Commerce", and click **Create**.
5. Copy the token right away — Printify shows it only once.

<!-- SCREENSHOT: Printify dashboard Settings > Connections > API screen with a generated token highlighted -->

Treat this token like a password. Anyone who has it can fully control your Printify shop through the API.

---

## Connecting to Printify

### Step 1: Enter Your API Token

1. Go to **J2Commerce** -> **Apps**.
2. Find **Printify Print-on-Demand** and click its name to open the plugin settings.
3. In the **Connection** tab, paste your Printify API Token into the **Printify API Token** field.
4. Click **Save** in the toolbar.

<!-- SCREENSHOT: Plugin settings screen showing the Connection fieldset with the API Token field -->

### Step 2: Test the Connection

1. Still in the **Connection** tab, find the **Test Connection** button.
2. Click it. The plugin will call the Printify API and display a confirmation message such as: "Connected to Printify shop: My Shop Name (standard plan)".
3. If you see an error, double-check that you pasted the token correctly with no extra spaces.

<!-- SCREENSHOT: Connection tab with a green "Connected" confirmation message showing shop name -->

### Step 3: Select Your Printify Shop

A successful connection test populates the **Printify Shop** dropdown with every shop on your Printify account.

1. Pick the shop you want linked to this J2Commerce store.
2. Click **Save** to lock in the selection.

<!-- SCREENSHOT: Printify Shop dropdown populated with shop names -->

Most accounts only have one shop, so the choice is obvious. If you manage multiple Printify shops, make sure you select the right one — orders get submitted to whichever shop is selected here.

---

## Product Import Settings

These settings control how products are created in J2Commerce when you import them from Printify. Configure them in the **Product Import** tab of the plugin settings.

<!-- SCREENSHOT: Plugin settings showing the Product Import fieldset -->

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Default Import Status** | Whether newly imported products are published or unpublished in J2Commerce. Set to **Unpublished** so you can review products before they appear in your store. | Unpublished | Published, Unpublished |
| **Default Article Category** | The Joomla content category that will be assigned to the article created for each imported product. **This field is required** — the import will fail if left empty. | — | Any Joomla category |
| **Default J2Commerce Tag** | The J2Commerce storefront tag assigned to imported products. Without this, products will not appear in tag-based category listings on your site. | — | Any tag slug, e.g. `printify-products` |
| **Default Tax Profile** | The J2Commerce tax profile applied to imported products. | None | Any configured tax profile |

### Tips

- Create a dedicated Joomla article category (such as "Printify Products") and a matching J2Commerce tag before importing your first product. This keeps POD products organised and ensures they display in your storefront.
- Leave **Default Import Status** set to **Unpublished** while you are getting started. This lets you review the imported product, add a better description, and adjust the price before going live.

---

## Pricing Configuration

The **Pricing** tab controls how retail prices are calculated from Printify's base cost when products are imported.

<!-- SCREENSHOT: Plugin settings showing the Pricing fieldset -->

Printify charges you the base cost per item when an order is fulfilled. You set a higher retail price so your store earns a margin.

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Markup Type** | The method used to calculate retail price from Printify's base cost. | Percentage | Percentage, Fixed Amount |
| **Markup Value** | The markup amount. For **Percentage**: enter `50` to add 50% on top of the base cost. For **Fixed Amount**: enter a flat amount (e.g., `10.00`) added to every variant's base cost. | `50` | Any positive number |

### How Pricing Works

Printify's base costs are in US cents (e.g., a value of `1250` means $12.50). The plugin converts this to dollars and applies your markup:

- **Percentage markup:** `retail price = base cost × (1 + markup / 100)`. With a 50% markup on a $12.50 base cost, the retail price becomes $18.75.
- **Fixed amount markup:** `retail price = base cost + markup`. With a $10.00 markup on a $12.50 base cost, the retail price becomes $22.50.

You can override the calculated price on any individual variant after import by editing the product in **J2Commerce** -> **Products**.

The product wizard also lets you adjust markup type and value per product at the time of creation, before the product is saved.

---

## Browsing the Printify Catalog

The catalog browser lets you explore all available products (called "blueprints" in Printify terminology) without leaving your J2Commerce admin.

### Opening the Catalog

1. Go to **J2Commerce** -> **Apps**.
2. Click the **Browse Catalog** button in the Printify app dashboard, or click the **Browse Catalog** tab if you are already in the app view.

<!-- SCREENSHOT: Printify dashboard with the Browse Catalog button highlighted -->

### Loading Blueprints

When you open the catalog browser for the first time, click **Load Catalog** to fetch blueprint data from Printify. The plugin caches this data locally, so subsequent loads are instant.

<!-- SCREENSHOT: Catalog browser showing the Load Catalog button and the grid of blueprint cards after loading -->

The catalog displays as a grid of product cards. Each card shows:
- Product image
- Product name
- Base cost range

### Filtering and Searching

- Use the **Search blueprints...** input to filter by product name.
- Use the **Category** dropdown to filter by product type: All Categories, T-Shirts, Hoodies, Mugs, Posters, Hats, or Bags.
- The result count appears next to the filter bar.

### Browsing Print Providers

Each blueprint can be fulfilled by multiple print providers (factories). Click any blueprint card to open the **Print Providers** panel below the grid. The panel shows a table with:

| Column | Description |
|--------|-------------|
| **Provider** | The name of the print provider |
| **Location** | The country or region where the provider is based |
| **Base Cost** | The per-unit cost charged to you |
| **Handling Time** | Estimated production time before shipping |

Click **Select** next to a provider to choose them, then click **Create Product** to open the product wizard.

### Refreshing the Cache

The catalog is cached for the duration configured under **Advanced** -> **Catalog Cache**. If Printify has added new products or you want the latest pricing, click **Refresh Cache** in the catalog browser header.

---

## Creating Products with the Product Wizard

The product wizard is a four-step guided tool for creating a new J2Commerce product from a Printify blueprint and provider combination.

### How to Start the Wizard

1. In the catalog browser, click a blueprint card to open the providers panel.
2. Click **Select** next to your chosen print provider.
3. Click **Create Product** (the button appears after you select a provider).

The wizard opens as a panel with four numbered steps.

<!-- SCREENSHOT: Product wizard open, showing the four step indicators at the top (Variants, Artwork, Details, Review) -->

---

### Step 1: Variants

This step shows all available size/colour combinations (variants) for the blueprint with the chosen provider.

<!-- SCREENSHOT: Product wizard Step 1 (Variants) showing the variants table with checkboxes, SKUs, base costs and retail prices -->

The variants table contains:
- A checkbox to include or exclude each variant
- Variant name (e.g., "Black / S")
- SKU
- Printify base cost
- Calculated retail price

**Actions available:**
- Click **Select All** or **Deselect All** to toggle all checkboxes.
- Adjust **Markup Type** and **Markup Value** at the top of the step to change how retail prices are calculated.
- Click **Recalculate** to update the retail price column after changing the markup settings.

Only enabled variants (those with a checkbox ticked) are imported.

Click **Next** when done.

---

### Step 2: Artwork

This step assigns artwork (your design) to each print area on the product. Common areas include Front, Back, Left Sleeve, and Right Sleeve. Only the areas supported by the selected blueprint appear as tabs.

<!-- SCREENSHOT: Product wizard Step 2 (Artwork) showing the print area tabs and the artwork preview placeholder -->

**For each print area:**

1. Click **Browse Library** to choose artwork you have previously uploaded to Printify, or click **Upload New** to upload a new file.
2. Once artwork is selected, a preview appears in the area panel.
3. Adjust the artwork position using the numeric controls:
   - **Position X (%)** — horizontal position within the print area (0–100)
   - **Position Y (%)** — vertical position within the print area (0–100)
   - **Scale** — scale multiplier (0.1–5.0, where 1.0 is the default size)
   - **Angle (degrees)** — rotation of the artwork (-360 to 360 degrees)

Artwork is only required for the print areas your design uses. You do not need to assign artwork to every area on the product.

Click **Next** when done.

---

### Step 3: Details

Enter the product information that will appear in your J2Commerce store.

<!-- SCREENSHOT: Product wizard Step 3 (Details) showing the title, description, tags, and category fields -->

| Field | Description | Required |
|-------|-------------|----------|
| **Product Title** | The name of the product in your store | Yes |
| **Description** | The product description text | No |
| **Tags** | Comma-separated tags to help customers find the product (e.g., `summer, gift, custom`) | No |
| **Category** | A category label for the product (e.g., `Apparel`) | No |

Click **Next** when done.

---

### Step 4: Review

The final step shows a summary of your choices before the product is created:
- How many variants you selected and their price range
- Which print areas have artwork assigned
- The product title and any additional details

Read the note at the bottom of the Review step:

> "After creating the product it will appear in your J2Commerce store in draft status. Review and publish it from the Products admin."

<!-- SCREENSHOT: Product wizard Step 4 (Review) showing the summary cards and the review note alert -->

Click **Next** (the button label becomes **Create Product** on the final step) to create the product. The plugin:

1. Creates a Joomla article with the product title and description.
2. Creates a J2Commerce product record linked to the article.
3. Creates product options (e.g., Color, Size) and all selected variants with calculated retail prices.
4. Downloads product images from Printify's CDN and stores them under `images/j2commerce/printify/` on your server.
5. Notifies Printify that the product has been published.

The product is created with the import status configured in **Product Import Settings**. Go to **J2Commerce** -> **Products** to review and publish it.

---

## Artwork Library

The artwork library is your central store of design files uploaded to Printify. All uploaded artwork is available across any product you create.

### Opening the Artwork Library

From the Printify app dashboard or from within the product wizard (Step 2), click **Browse Library** to open the artwork library panel.

<!-- SCREENSHOT: Artwork library showing the upload section at the top and a grid of uploaded artwork thumbnails below -->

### Uploading Artwork

There are two upload methods:

**Drag and drop / file browser:**
1. Drag an image file onto the drop zone, or click **Browse Files** to open a file picker.
2. Supported formats: PNG, JPEG, SVG, GIF (maximum 200 MB).
3. The file uploads to Printify and appears in the artwork grid.

**Upload from URL:**
1. Paste a public image URL into the URL field.
2. Enter a filename (including extension, e.g., `my-design.png`).
3. Click **Upload from URL**.

While uploading, a spinner and "Uploading..." message appears. Once complete, the new artwork appears in the grid.

### Browsing and Using Artwork

Artwork displays as a card grid. Each card shows:
- A thumbnail of the image
- The filename
- The image dimensions

When the library is opened from the product wizard (**select mode**), each card has a **Use** button. Click it to assign that artwork to the current print area and return to the wizard.

When the library is opened independently, each card has an **Archive** button. Archiving removes the artwork from Printify's upload library. Archived artwork cannot be recovered.

### Refreshing the Library

Click **Refresh** in the artwork library header to reload the list from Printify if you have uploaded files outside of J2Commerce.

---

## Syncing Products

After you import a product, Printify may update its variants (add new colours, change base costs). The sync feature updates your J2Commerce product to reflect those changes.

### Syncing a Single Product

1. Go to **J2Commerce** -> **Products**.
2. Open the product you want to sync.
3. At the top of the edit form, you will see a **Printify sync badge** showing the current sync status: Synced, Pending, or Error.
4. Click **Sync Now** in the Printify dashboard panel to pull the latest data from Printify.

<!-- SCREENSHOT: Product edit form showing the Printify sync badge with "Synced" status and the "View on Printify" link -->

The badge also shows the date and time of the last successful sync. A **View on Printify** link opens the product directly in your Printify dashboard editor.

### What Sync Does

- Updates the Printify base cost stored on each existing variant (your local price override is preserved).
- Adds any new variants that have been added to the product in Printify since the last import.
- Does **not** delete variants you have manually disabled or hidden.

### Sync Status Values

| Status | Meaning |
|--------|---------|
| **Synced** | The product data matches the latest Printify data |
| **Pending** | A sync is queued but has not completed yet |
| **Error** | The last sync attempt failed |
| **Unknown** | No sync has been performed since import |

---

## Order Fulfillment Settings

The **Order Fulfillment** tab controls how orders containing Printify products are submitted to Printify.

<!-- SCREENSHOT: Plugin settings showing the Order Fulfillment fieldset -->

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Auto-Submit Orders** | When enabled, orders containing Printify products are automatically submitted to Printify when they reach the configured trigger status. | Yes | Yes, No |
| **Trigger on Order Status** | The J2Commerce order status that triggers automatic submission to Printify. | Status 1 (Confirmed) | Any configured order status |
| **Auto Send to Production** | When enabled, after the order is created at Printify it is immediately sent to production. If disabled, you must manually send it from the Order Sync dashboard. | Yes | Yes, No |
| **Printify Shipping Notifications** | When enabled, Printify sends shipping confirmation emails directly to your customers. Disable this if J2Commerce handles all shipping notification emails to avoid customers receiving duplicate messages. | No | Yes, No |

### How Auto-Fulfillment Works

When an order's status changes to the configured trigger status:

1. The plugin checks whether the order contains any Printify products (identified by the `printify_variant_id` stored on each variant).
2. If Printify products are found, the order is submitted to Printify via their API.
3. The plugin builds the shipping address from the order's delivery information and maps country/zone codes to the ISO 2-letter format Printify requires.
4. Printify assigns an order ID (visible in the Order Sync dashboard).
5. If **Auto Send to Production** is enabled, the order is immediately sent to the print facility.

Orders without any Printify products are ignored by the auto-fulfillment process.

---

## Shipping Settings

The **Shipping** tab controls how Printify's shipping rates appear during checkout.

<!-- SCREENSHOT: Plugin settings showing the Shipping fieldset -->

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Show Printify Shipping Rates** | When enabled, Printify's shipping rates appear as checkout shipping options for carts containing Printify products. | Yes | Yes, No |
| **Shipping Handling Fee** | A flat fee added to every Printify shipping rate. Use this to cover packaging costs or increase your margin on shipping. Enter `0` for no extra fee. | `0.00` | Any positive number |
| **Shipping Label Prefix** | Optional text added to the start of every Printify shipping method name at checkout. For example, entering `POD: ` would display "POD: Standard Shipping". | — | Any text |
| **Enable Economy Shipping** | When enabled, a slower, cheaper economy shipping option from Printify's v2 API is shown alongside standard, priority, and express rates. | No | Yes, No |
| **Shipping Rate Cache (minutes)** | How long (in minutes) Printify shipping rates are cached before being refreshed. Caching reduces API calls during checkout. Minimum 60, in increments of 60. | `360` | Integer ≥ 60 |

### Shipping Rate Tiers

Printify provides shipping rates in four tiers. The plugin classifies each rate by inspecting the rate name:

| Tier | Label at Checkout |
|------|-------------------|
| Standard | Standard Shipping |
| Priority | Priority Shipping |
| Express | Express Shipping |
| Economy | Economy Shipping (requires **Enable Economy Shipping** to be on) |

When a cart contains Printify products from multiple print providers, the plugin blends the rates: for each tier, it sums the cheapest rate from each provider group to produce a single blended rate shown to the customer.

---

## Order Sync Dashboard

The Order Sync dashboard shows all orders in your store that contain Printify products, along with their current Printify fulfillment status.

### Accessing the Dashboard

Go to **J2Commerce** -> **Apps** and click the **Order Sync** tab within the Printify app.

<!-- SCREENSHOT: Order Sync dashboard showing a table of orders with status badges and action buttons -->

### Understanding the Table

| Column | Description |
|--------|-------------|
| **Order** | Your J2Commerce order reference, linked to the order detail page |
| **Printify ID** | The Printify order ID assigned after submission |
| **Status** | The current fulfillment status at Printify (see below) |
| **Tracking** | Tracking number and carrier link when the order has shipped |
| **Submitted** | Date and time the order was submitted to Printify |
| **Actions** | Buttons to export, send to production, or cancel the order |

### Order Status Values

| Status | Meaning |
|--------|---------|
| **pending** | Submitted to Printify, awaiting action |
| **in-production** | Being manufactured by the print provider |
| **shipped** | Shipped — tracking information is available |
| **delivered** | Confirmed as delivered |
| **canceled** | Cancelled at Printify |

Status badges use colour coding: orange for pending, blue for in-production, green for shipped, dark blue for delivered, and red for cancelled.

### Actions

**Export (single order):** Manually submit an order to Printify. Use this when auto-fulfillment is disabled or an order was created before auto-fulfillment was enabled.

**Export Selected (bulk):** Select multiple orders using the checkboxes and click **Export Selected to Printify** to submit them all at once.

**Send to Production:** Appears for orders that have been submitted to Printify but are still in `pending` status. Click to instruct Printify to begin manufacturing.

**Cancel at Printify:** Cancel the order with Printify. A confirmation prompt appears before cancellation. This action cannot be undone. Cancellation is only available while production has not begun.

**Refresh:** Reloads the order list from the database to see the latest statuses from recent webhook updates.

---

## Webhook Integration

Webhooks allow Printify to push real-time updates to your store — for example, when an order ships or when a product's publish status changes — without your store having to poll Printify continuously.

### Registering a Webhook

1. Go to the plugin settings (**J2Commerce** -> **Apps** -> **Printify** -> settings).
2. In the **Connection** tab, scroll down to find the **Register Webhook** control.
3. Enter your site's public URL.
4. Click **Register Webhook**.

The plugin:
- Generates a random secret key.
- Registers a webhook URL with Printify in the format `https://yoursite.com/index.php?option=com_j2commerce&task=cron.execute&command=printify_webhook`.
- Stores the webhook ID and secret in the plugin's hidden parameters.

<!-- SCREENSHOT: Connection tab showing the webhook registration section with site URL field and Register Webhook button -->

Your site must be publicly accessible (not on localhost) for Printify to deliver webhook events.

### Webhook Events Handled

| Printify Event | What Happens in J2Commerce |
|----------------|---------------------------|
| `product:publish:succeeded` | Queues the product for automatic import |
| `product:publish:failed` | Logs the failure as an alert in the activity log |
| `product:deleted` | Unpublishes the matching J2Commerce product |
| `order:created` | Updates the Printify order record to `pending` |
| `order:updated` | Updates the Printify order status |
| `order:sent-to-production` | Sets status to `in-production` |
| `order:shipment:created` | Saves tracking carrier, number, and URL; sets status to `shipped`; writes tracking to the J2Commerce order shipping record |
| `order:shipment:delivered` | Sets status to `delivered` |
| `order:canceled` | Sets status to `canceled` |

All incoming webhooks are verified using HMAC-SHA256 signature before processing.

### Deleting a Webhook

To unregister the webhook (for example, before switching to a different site URL):

1. Go to the plugin settings Connection tab.
2. Click **Delete Webhook**.

This removes the webhook registration from both Printify and the plugin settings.

---

## Advanced Settings

The **Advanced** tab contains settings for performance tuning, error handling, and debugging.

<!-- SCREENSHOT: Plugin settings showing the Advanced fieldset -->

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Error Threshold** | The number of consecutive API failures that must occur before the plugin automatically pauses all Printify API operations. This prevents a temporary Printify outage from flooding your error logs. | `10` | Integer ≥ 1 |
| **Catalog Cache (minutes)** | How long blueprint and print provider data is cached in the database before the catalog refreshes from Printify. Minimum 60, in increments of 60. | `1440` (24 hours) | Integer ≥ 60 |
| **Activity Log Retention (days)** | The number of days to keep Printify activity log entries. Older entries are deleted automatically during the nightly sync cron task. Minimum 7 days. | `90` | Integer ≥ 7 |
| **Debug Logging** | When enabled, the plugin writes verbose API request and response details to a log file at `logs/app_printify.php` in your Joomla logs directory. Only enable this when troubleshooting. | No | Yes, No |

### API Pause State

When the error threshold is reached, the plugin enters a **paused** state and displays a warning banner on the Printify dashboard:

> "API operations paused due to consecutive errors."

While paused, no API calls are made. To resume:

1. Investigate and resolve the root cause (often an expired API token or a temporary Printify outage).
2. Click **Resume API Operations** in the Printify dashboard card.

The pause state is stored in the `#__j2commerce_printify_cache` table and automatically cleared when a successful API call is made after a manual resume.

---

## Configuration Reference

The following table documents every setting across all tabs for quick reference.

### Connection Tab

| Setting | Field Name | Default | Notes |
|---------|-----------|---------|-------|
| **Printify API Token** | `api_token` | — | Required. Personal Access Token from Printify. |
| **Test Connection** | — | — | Button. Tests the token and returns shop details. |
| **Printify Shop** | `shop_id` | — | Required. Populated after a successful connection test. |

### Product Import Tab

| Setting | Field Name | Default | Notes |
|---------|-----------|---------|-------|
| **Default Import Status** | `import_status` | `0` (Unpublished) | `0` = Unpublished, `1` = Published |
| **Default Article Category** | `default_category_id` | `0` | Required for import. |
| **Default J2Commerce Tag** | `default_j2commerce_tag` | — | Tag slug, e.g. `printify-products` |
| **Default Tax Profile** | `default_taxprofile_id` | `0` | Optional. |

### Pricing Tab

| Setting | Field Name | Default | Notes |
|---------|-----------|---------|-------|
| **Markup Type** | `markup_type` | `percent` | `percent` or `fixed` |
| **Markup Value** | `markup_value` | `50` | For percent: 50 = 50%. For fixed: dollar amount. |

### Order Fulfillment Tab

| Setting | Field Name | Default | Notes |
|---------|-----------|---------|-------|
| **Auto-Submit Orders** | `auto_fulfill` | `1` (Yes) | |
| **Trigger on Order Status** | `auto_fulfill_on_status` | `1` | Order status ID |
| **Auto Send to Production** | `auto_send_to_production` | `1` (Yes) | |
| **Printify Shipping Notifications** | `send_shipping_notification` | `0` (No) | |

### Shipping Tab

| Setting | Field Name | Default | Notes |
|---------|-----------|---------|-------|
| **Show Printify Shipping Rates** | `inject_shipping_rates` | `1` (Yes) | |
| **Shipping Handling Fee** | `shipping_handling_fee` | `0.00` | Added to every rate |
| **Shipping Label Prefix** | `shipping_label_prefix` | — | e.g. `POD: ` |
| **Enable Economy Shipping** | `enable_economy_shipping` | `0` (No) | |
| **Shipping Rate Cache (minutes)** | `shipping_rate_cache_ttl` | `360` | Min 60 |

### Advanced Tab

| Setting | Field Name | Default | Notes |
|---------|-----------|---------|-------|
| **Error Threshold** | `error_threshold` | `10` | Min 1 |
| **Catalog Cache (minutes)** | `catalog_cache_ttl` | `1440` | Min 60 |
| **Activity Log Retention (days)** | `activity_retention_days` | `90` | Min 7 |
| **Debug Logging** | `debug` | `0` (No) | |

---

## Troubleshooting

### "Printify API token is not configured"

**Cause:** The plugin has not been connected to Printify, or the settings were not saved after entering the token.

**Solution:**
1. Go to **J2Commerce** -> **Apps** -> **Printify** -> plugin settings.
2. Confirm the **Printify API Token** field contains your token.
3. Click **Save** in the toolbar.

---

### "Printify shop is not selected"

**Cause:** The token is valid but no shop has been selected, or the plugin was saved without selecting a shop after the connection test.

**Solution:**
1. In the **Connection** tab, click **Test Connection**.
2. After the test succeeds, select your shop from the **Printify Shop** dropdown.
3. Click **Save**.

---

### "Default article category is not configured"

**Cause:** The **Default Article Category** field in the **Product Import** tab is empty.

**Solution:**
1. Go to the **Product Import** tab in the plugin settings.
2. Select a Joomla content category from the **Default Article Category** dropdown.
3. Click **Save**, then retry the import.

---

### Products imported but not visible in the storefront

**Cause:** The product was imported with **Default Import Status** set to **Unpublished**, or no **Default J2Commerce Tag** was configured.

**Solution:**
1. Go to **J2Commerce** -> **Products** and find the imported product.
2. Set its status to **Published**.
3. Confirm the product has the correct tag assigned (the one used in your storefront's tag-based product listing).

---

### No Printify shipping rates appear at checkout

**Cause:** Either **Show Printify Shipping Rates** is disabled, the cart does not contain any Printify products, or the destination country is not covered by the selected print provider.

**Solution:**
1. Confirm **Show Printify Shipping Rates** is set to **Yes** in the plugin settings.
2. Check that the product in the cart was imported from Printify (the product edit form should show a Printify sync badge).
3. Try a different destination country to confirm whether the issue is country-specific.
4. Check that the **Shipping Rate Cache** has not stored a stale empty result. Use **Refresh Cache** in the catalog browser to clear the cache, then test again.

---

### API operations paused

**Cause:** The plugin reached the configured **Error Threshold** of consecutive API failures.

**Solution:**
1. On the Printify dashboard in **J2Commerce** -> **Apps**, note the warning banner.
2. Check your Printify API token is still valid (log in to Printify and verify the token is not revoked).
3. Check that the Printify API is reachable from your server (you can test this by enabling **Debug Logging** and checking the log file at `logs/app_printify.php`).
4. Once you have resolved the underlying issue, click **Resume API Operations**.

---

### Orders not auto-submitting to Printify

**Cause:** Auto-submit is disabled, or the order status trigger does not match the status to which the order is transitioning.

**Solution:**
1. Confirm **Auto-Submit Orders** is set to **Yes** in the **Order Fulfillment** tab.
2. Confirm **Trigger on Order Status** is set to the correct status. For example, if your payment gateway sets orders to "Confirmed" on successful payment, the trigger should be set to "Confirmed".
3. Check whether the order appears in the Order Sync dashboard. If it does, the order was recognised as a Printify order. If it does not appear, the products in that order may not have been imported from Printify.

---

### Debug log location

When **Debug Logging** is enabled, log entries are written to:

```
/path/to/joomla/logs/app_printify.php
```

The log file uses Joomla's standard log format and records all API requests, response codes, and internal messages.

---

## Related Topics

- [J2Commerce Products](../products/index.md)
- [Order Management](../orders/index.md)
- [Shipping Methods](../shipping/index.md)
- [Tax Profiles](../taxes/index.md)
- [Apps and Extensions](./index.md)
