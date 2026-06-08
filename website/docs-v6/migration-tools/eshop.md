# EShop Migration Adapter

The EShop Migration Adapter is the source connector for the [J2Commerce Migrator](./com_j2commercemigrator.md) that lets you move your JoomDonation EShop store into J2Commerce 6. The adapter reads your existing EShop tables, transforms them into the J2Commerce format, and writes them into the correct J2Commerce tables — without touching or modifying your original EShop data at any point.

## Requirements {#requirements}

- PHP 8.3 or later
- Joomla! 6.0 or later
- J2Commerce 6 installed and enabled
- J2Commerce Migrator component installed
- EShop 4.x or 5.x tables present in your database (the component does not need to be enabled, but the tables must still exist)

:::tip

Run the migration on a staging copy of your site first. This lets you verify every product, order, and customer without any risk to your live store. Only migrate the live site after you are satisfied with the staging result.

:::

## Get the Adapter {#get-the-adapter}

The EShop adapter is sold separately from the core J2Commerce package. It is available from the [J2Commerce Extensions Store](https://www.j2commerce.com/).

**Step 1:** Log in to your account at [j2commerce.com](https://www.j2commerce.com/) and open your customer downloads area.

**Step 2:** Search for **EShop Migrator Adapter** and click **View Files -> Download Now** to get the adapter zip.

## Install the Adapter {#install-the-adapter}

In your Joomla admin, go to **System -> Install -> Extensions**.

Upload the **EShop Migration Adapter** file or use the Install from URL option.

![](/img/install.webp)

You will see a success message confirming installation.

:::info

The adapter checks that J2Commerce is installed before it installs. If J2Commerce is not found, installation will be refused. Install J2Commerce first, then come back to install the adapter.

:::

## Enable the Adapter {#enable-the-adapter}

After installation the adapter is automatically enabled. To confirm or re-enable it:

1. Go to **System -> Manage -> Plugins**.
2. Search for `eshop` in the plugin list.
3. Look for **J2Commerce Migrator — EShop Adapter**.
4. If the status column shows a red X, click it to enable the plugin. It will turn into a green checkmark.

## What Gets Migrated {#what-gets-migrated}

The adapter migrates the following data from your EShop store to J2Commerce:

| EShop Data                                           | What It Becomes in J2Commerce                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Categories                                           | Joomla content categories linked to J2Commerce                                       |
| Manufacturers                                        | J2Commerce manufacturer records with a linked address and description of the article |
| Products (names, descriptions, SKUs, pricing, stock) | Joomla article (description) + J2Commerce product (price/SKU/stock)                  |
| Product images (main, thumbnail, tiny)               | Copied into `images/j2commerce/products/` with all size variants                     |
| Product options and option values                    | J2Commerce product options and option values                                         |
| Product discounts and special prices                 | J2Commerce product price rules                                                       |
| Product downloads and attachments                    | J2Commerce product files                                                             |
| Tax classes and tax rates                            | J2Commerce tax profiles and tax rates                                                |
| Tax rules and geozones                               | J2Commerce tax rules and geozone rules                                               |
| Customer addresses                                   | J2Commerce customer address records                                                  |
| Coupons                                              | J2Commerce coupons                                                                   |
| Vouchers                                             | J2Commerce vouchers                                                                  |
| Orders, order items, order options                   | J2Commerce orders and order line items                                               |
| Order downloads                                      | J2Commerce order download records                                                    |
| Currencies, countries, zones                         | J2Commerce lookup tables                                                             |
| Order statuses, lengths, weights                     | J2Commerce lookup tables                                                             |
| Product reviews (if App Reviews installed)           | J2Commerce App Reviews records                                                       |

### What is not migrated (current version) {#what-is-not-migrated}

The following EShop features do not have a direct equivalent in J2Commerce and are not migrated:

- **Product option variants (fan-out)** — EShop option combinations are recorded and counted, but the full variant fan-out into individual J2Commerce variant rows is not yet automated. The adapter reports how many products are affected. See the [Roadmap](#roadmap) section for details.
- **Customer groups** — EShop uses a customer group model that does not map directly to J2Commerce.
- **Catalog discounts** — Use J2Commerce coupons or special prices as an alternative.
- **Product labels** — J2Commerce has no equivalent label system.
- **Postcode-range geozone rules** — J2Commerce only supports country/zone-based geozone rules.
- **Product Q\&A records** — J2Commerce has no built-in Q\&A feature.
- **Wishlists** — Requires the separate J2Commerce Wishlist app.
- **Quote/RFQ records** — J2Commerce has no quote system.
- **Secondary-language product records** — Only the default EShop language is migrated.

## Before You Begin {#before-you-begin}

Complete these steps before you click a single button in the Migrator.

1. **Back up your entire site and database.** This is non-negotiable. Use Akeeba Backup, your hosting control panel, or any reliable backup tool. The migration writes data to J2Commerce tables but your EShop data is never modified — a backup still gives you a safe rollback point.

2. **Confirm J2Commerce is installed.** Go to **Components -> J2Commerce** and verify it opens without errors.

3. **Confirm the J2Commerce Migrator is installed.** Go to **Components -> J2Commerce Migrator** and verify the Dashboard loads.

4. **Confirm the EShop adapter is enabled.** Go to **System -> Manage -> Plugins**, search for `eshop`, and confirm the adapter shows a green checkmark.

5. **Confirm your EShop tables are still present.** The adapter reads from `eshop_*` tables in your database. If you have already uninstalled EShop, you cannot use this adapter unless the tables were preserved separately.

6. **Run on staging first.** Set up a staging copy of your site, run the full migration there, and verify the results before touching your live store.

## Step-by-Step Migration Walkthrough {#walkthrough}

### Step 1: Open the Sync Tools

In your Joomla admin, go to **Components -> J2Commerce Migrator**.

On the Dashboard you will see a card for **EShop** showing the detected status (Ready to migrate, Installed but disabled, or Not installed).

Click **Start Migration** on the EShop card, or click **Tools** in the Migrator toolbar.

<!-- SCREENSHOT: J2Commerce Migrator Dashboard showing EShop card with "Ready to migrate" status -->

### Step 2: Sync Categories

Click the **Sync Categories** button.

The migrator reads your EShop category tree and creates matching Joomla content categories. A progress indicator shows the operation is running. Wait for the confirmation message — **Categories synced successfully** — before continuing.

:::info

Categories must be synced before products. The product sync links each product to its category, so the category records need to exist first.

:::

<!-- SCREENSHOT: Sync Categories button and success confirmation -->

### Step 3: Sync Manufacturers

Click the **Sync Manufacturers** button and wait for the **done** confirmation.

Each EShop manufacturer becomes a J2Commerce manufacturer record. The adapter also creates a linked Joomla article for the manufacturer description and an address row for the manufacturer's contact details.

<!-- SCREENSHOT: Sync Manufacturers button and success confirmation -->

### Step 4: Sync Products

Click the **Sync Products** button.

This is the main migration step. The migrator processes your product catalog in batches. A progress bar shows the current stage:

| Stage label            | What is happening                                 |
| ---------------------- | ------------------------------------------------- |
| **initializing**       | Setting up the batch run                          |
| **fetching source**    | Reading product rows from EShop                   |
| **syncing categories** | Linking products to their categories              |
| **creating articles**  | Creating Joomla articles for product descriptions |
| **creating products**  | Writing J2Commerce product records                |
| **next batch**         | Moving to the next group of products              |
| **done**               | The sync is complete                              |

If the sync shows **done**, the product tier is complete. If it stops on **next batch** without finishing (for example because your server has a short time limit), simply click **Sync Products** again. The sync is safe to re-run — it picks up where it left off and skips products already written.

<!-- SCREENSHOT: Sync Products progress bar showing stage labels -->

### Step 5: Post-Sync Passes

After **Sync Products** completes, the migrator automatically triggers four post-sync operations in sequence. You can also run each one manually from the **Post-Sync Tools** section if the automatic trigger was interrupted by a server timeout.

| Button                      | What it does                                                                                                                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Migrate Tax Classes**     | Creates J2Commerce tax profile, tax rate, and tax rule records from your EShop tax classes. Run this before checking that products have the correct tax profile.                                   |
| **Migrate Master Variants** | Creates the master variant row for each product. This variant holds the product's main SKU, price, and stock level. Products without this row will appear to have no price or stock in J2Commerce. |
| **Migrate Product Images**  | Copies your EShop product images from `media/com_eshop/products/` into `images/j2commerce/products/` and generates thumbnail and tiny variants.                                                    |
| **Audit Product Options**   | Counts how many of your products have EShop option combinations and reports the number. This pass does not write data — it gives you the information you need to plan any manual variant entry.    |

To trigger a pass manually, scroll to the **Post-Sync Tools** section on the Tools page and click the appropriate button.

<!-- SCREENSHOT: Post-Sync Tools section showing Migrate Tax Classes, Migrate Master Variants, Migrate Product Images, Audit Product Options buttons -->

### Step 6: Sync Customers

Click the **Sync Customers** button to migrate customer address records and any voucher or coupon assignments linked to those customers.

<!-- SCREENSHOT: Sync Customers button -->

### Step 7: Sync Orders

Click the **Sync Orders** button. Customer data must be fully synced before you sync orders, so always complete Step 6 first.

The migrator will warn you if customer data is not ready: **Customer data must be fully synced before syncing orders. Please sync customers first.**

<!-- SCREENSHOT: Sync Orders button -->

### Step 8: Link Product Articles

Click the **Link Product Articles** button in the **Post-Sync Tools** section. This step connects each J2Commerce product to the Joomla article that holds its description. On a large catalog this runs in a paginated loop — wait until the **Product articles linked successfully** message appears before continuing.

### Step 9: Repair Migrated Content (if needed)

If any migrated articles fail to open in the Joomla article editor — showing a stack overflow or infinite recursion error — click the **Repair Migrated Content** button.

This operation backfills empty JSON columns on migrated articles and rebuilds the Joomla category nested-set tree. It is safe to run at any time and can be re-run without causing duplicate data.

<!-- SCREENSHOT: Repair Migrated Content button -->

## Verifying the Migration {#verifying}

Once the sync steps are complete, carry out these quick checks in the Joomla admin without needing any database access.

**Check product count:**

1. Go to **Components -> J2Commerce -> Catalog -> Products**.
2. Confirm that the total number of products shown matches the count you expect from EShop.

**Inspect a product:**

1. Open any product from the list.
2. Confirm that the SKU, manufacturer, tax profile, and description article are all populated.
3. Open the **Images** tab and confirm the main image appears.

**Check an article:**

1. Go to **Content -> Articles**.
2. Search for a product name you know from EShop.
3. Open the article and confirm it loads without errors and the description text is correct.

**Check the storefront:**

1. Visit a product page on your site.
2. Confirm the product image loads and the price displays correctly.

## Troubleshooting {#troubleshooting}

### Sync Products only migrates part of the catalog {#partial-sync}

**Cause:** Your server has a short PHP execution time limit, so the batch job was cut off before finishing all products.

**Solution:** Click **Sync Products** again. The sync is designed to be re-run — it records which products it has already written and picks up from where it left off. Repeat until the stage label shows **done**.

### Articles fail to open with a stack overflow error {#stack-overflow}

**Cause:** Migrated articles have empty JSON columns that Joomla's article editor cannot handle.

**Solution:** Click the **Repair Migrated Content** button in the Post-Sync Tools section. The repair operation backfills the missing columns and rebuilds the category tree. After it completes, the affected articles will open normally.

### Product images are missing from the J2Commerce product list {#images-missing}

**Cause:** The **Migrate Product Images** post-pass did not run, or was interrupted.

**Solution:** Go to the **Post-Sync Tools** section and click **Migrate Product Images** manually. Wait for the **Product images migrated** confirmation.

### Images show small thumbnails but the full-size image is missing {#thumb-but-no-main}

**Cause:** The original image files in `media/com_eshop/products/` do not exist or were moved before the migration ran.

**Solution:** Restore the original EShop product image files to `media/com_eshop/products/` and click **Migrate Product Images** again. The adapter logs every missing source file to `administrator/logs/plg_j2commercemigrator_eshop.php` — open that file as plain text to see which images could not be found.

### Products with options show no variants {#no-variants}

**Cause:** Automated variant fan-out for EShop option combinations is not yet available in this version of the adapter.

**Solution:** The **Audit Product Options** pass reports how many products are affected and how many option combinations exist. Until automated variant migration is available, you will need to create variant rows manually in J2Commerce for those products. See the [Roadmap](#roadmap) section for the planned timeline.

### The EShop card does not appear on the Migrator Dashboard {#no-card}

**Cause:** The adapter plugin is not enabled.

**Solution:**

1. Go to **System -> Manage -> Plugins** and search for `eshop`.
2. If the **J2Commerce Migrator — EShop Adapter** plugin appears with a red X, click it to enable.
3. If the plugin does not appear at all, reinstall the adapter zip from **System -> Install -> Extensions**.

### Where to find the migration log {#log-file}

The adapter writes a detailed log to:

```
administrator/logs/plg_j2commercemigrator_eshop.php
```

Open this file in any plain-text editor (Notepad, TextEdit, VS Code) to see a timestamped record of every operation, warning, and error. This is the first place to look when something does not migrate as expected.

## Resetting and Starting Over {#reset}

If you want to discard migrated data and start fresh, go to the **Reset J2Commerce 6 Migrated Data** section on the Tools page and click **Reset J2Commerce Data**.

:::danger

This will **DELETE all migrated J2Commerce 6 data (orders, products, customers, etc.) and cannot be undone. Make sure you have a backup. Are you sure?**

Your original EShop data is not affected. Only the J2Commerce tables that the migration populated are cleared. Your J2Commerce configuration, email templates, and invoice templates are also preserved.

:::

After the reset you can run the sync steps again from the beginning.

## Roadmap {#roadmap}

**EShop product option variants** — When an EShop product has options (such as Size and Color), EShop stores all the possible combinations as option value rows. Automatically expanding those combinations into individual J2Commerce variant rows (the fan-out step) is planned for a future adapter release. The **Audit Product Options** pass reports the count so you know exactly how many products are waiting on this feature.

For the current status and planned timeline, see the EShop variants migration roadmap document included with the adapter.

## Glossary {#glossary}

**Master variant** — Every J2Commerce product must have at least one variant row that holds its main SKU, price, and stock level. The "master variant" is that primary row. Simple products (no size/color options) have just the one master variant.

**Tax profile** — The J2Commerce name for an EShop "tax class". A tax profile groups tax rates and rules together and is assigned to individual products.

**Post-pass** — A step that runs after the main table sync to complete work that requires all the basic records to exist first. For example, images cannot be copied until the product records are already in the database.

**Article-linked product** — In J2Commerce, each product stores its long description in a standard Joomla article. The product and the article are linked together — the product holds price and stock, the article holds the description text. This is why you will see migrated products appear in both **Components -> J2Commerce -> Catalog -> Products** and **Content -> Articles**.

**Idempotent** — A technical term used in migration software meaning "safe to run more than once". All sync steps and post-passes in the EShop adapter are idempotent — re-running them will not create duplicate records.
