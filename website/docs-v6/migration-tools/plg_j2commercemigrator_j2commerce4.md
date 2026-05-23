---
title: "J2Commerce 4 Migrator Adapter"
sidebar_label: "J2Commerce 4 Adapter"
sidebar_position: 3
description: "Migrate your J2Commerce 4 or J2Store v4 store data, custom tables, menu items, and storefront CSS into J2Commerce 6 using the J2Commerce 4 source adapter bundled with the J2Commerce Migrator."
---

The J2Commerce 4 Migrator Adapter is the source connector that lets the [J2Commerce Migrator](./j2commercemigrator.md) read from a **J2Commerce 4 or J2Store v4** database and move that data into J2Commerce 6. Both J2Commerce 4 and J2Store v4 shared the same `j2store_*` database table family, so this adapter handles both sources. It ships bundled with the J2Commerce Migrator package — you do not need a separate download or install step.

## Requirements {#requirements}

- PHP 8.3 or later
- Joomla 6.0 or later
- J2Commerce 6 installed and enabled
- **J2Commerce Migrator component installed** (the adapter is bundled inside it)
- An existing J2Commerce 4 or J2Store v4 installation — either on the same Joomla site, or accessible via a separate database server or SSH tunnel

:::tip

J2Commerce 6 requires Joomla 6. If your J2Commerce 4 or J2Store v4 store is still running on Joomla 3 or 4, you have two options: upgrade that site to Joomla 6 first and use the same-site connection mode, or leave the old site in place and connect the Migrator to it remotely using Mode B or Mode C.

:::

## Start at the Migrator Dashboard {#start-at-dashboard}

The J2Commerce 4 adapter ships inside the `pkg_j2commercemigrator_*.zip` package and is automatically enabled when the package installs. There is nothing to install or enable separately.

To begin, go to **Components -> J2Commerce Migrator** in your Joomla admin. The Migrator dashboard shows a source card for **J2Store** (the common display name for both J2Commerce 4 and J2Store v4). Click **Start Migration** on that card to open the Migration Wizard.

<!-- SCREENSHOT: J2Commerce Migrator dashboard showing the J2Store source card with the Start Migration button -->

:::info

If the J2Store card does not appear on the dashboard, confirm that the J2Commerce Migrator package is installed and that the adapter plugin is enabled. Go to **System -> Manage -> Plugins**, search for `j2commerce4`, and check that the status is green.

:::

## Configure the Adapter {#configure-the-adapter}

There is nothing to configure in the adapter plugin itself. All connection settings are entered on the **Connection** screen of the Migration Wizard.

When you reach the Connection screen, choose one of three modes:

- **Mode A — Same site:** Your J2Commerce 4 or J2Store v4 tables are in the same database as your current Joomla 6 site. No extra credentials needed — the Migrator uses the existing database connection.
- **Mode B — Remote database:** Your old store data lives on a different MySQL or MariaDB server. Enter the host, port, database name, username, password, and table prefix on this screen.
- **Mode C — SSH tunnel:** Your old database is only reachable through an SSH tunnel. Enable this mode first in **J2Commerce Migrator -> Options** to make it appear as a connection option. This is an advanced option for hosted environments that restrict direct database connections.

<!-- SCREENSHOT: Migrator Connection screen showing Mode A, Mode B, and Mode C options -->

See the [J2Commerce Migrator](./j2commercemigrator.md) guide for a full walkthrough of the Migration Wizard.

## How It Works {#how-it-works}

When a migration run begins, the adapter and the Migrator engine work together in six steps:

1. **Registration.** When the Migrator loads, it fires an internal event. The adapter listens for that event and registers itself as the "J2Store" source. This is why the J2Store card appears on the Migrator Dashboard automatically.

2. **Connection.** When you start a run, the Migrator asks the adapter to open a connection to your J2Commerce 4 or J2Store v4 database. In Mode A it reuses the existing Joomla database connection; in Mode B or C it opens a new connection using the credentials you provided.

3. **Reading.** The adapter reads rows from the source `j2store_*` tables in a safe dependency order — lookup data first (currencies, countries, order statuses, units of measure), then the tax system, then catalog, then products, and finally customers and orders. This ordering prevents broken foreign-key references in the migrated data.

4. **Translating.** Each row is transformed into a format J2Commerce 6 understands. Table names change from `j2store_*` to `j2commerce_*`, primary key column names are updated to match the new naming convention, and any JSON payloads stored inside columns are updated so plugin keys and internal references use J2Commerce naming.

5. **Writing.** The Migrator engine writes the translated rows into the J2Commerce 6 tables. Your original J2Commerce 4 or J2Store v4 tables are never modified.

6. **Verification.** After each batch finishes, the adapter checks that source and destination row counts match and flags any gaps so you can investigate or re-run the affected tile.

## What Gets Migrated {#what-gets-migrated}

The adapter migrates the following data from your J2Commerce 4 or J2Store v4 store:

- **Your products** — names, descriptions, SKUs, pricing, stock quantities, and product images
- **Product variants** — all variant combinations with their individual prices, SKUs, and stock levels
- **Product options** — the option groups and values used to build variants (size, color, and so on)
- **Manufacturers and brands** — manufacturer records and images
- **Filter groups and filter values** — catalog filter configuration
- **Your orders** — every order including line items, applied discounts, shipping charges, fees, taxes, and order history notes
- **Order statuses** — your custom and built-in order status definitions
- **Your customers** — billing and shipping addresses linked to Joomla user accounts
- **Coupons and vouchers** — discount codes and gift voucher records
- **Tax configuration** — tax profiles, tax rates, tax rules, and geo-zones
- **Shipping methods and rates** — your configured shipping methods and rate tables
- **Currencies** — your currency list and exchange rate settings
- **Countries and zones** — the countries and sub-regions you have configured
- **Store configuration** — your general store settings
- **Email and invoice templates** — your customized notification templates
- **Active carts and cart items** — in-progress cart sessions (useful for continuity during a live cutover)
- **Custom add-on tables** — non-core J2Store add-on data (see [Extra Migration Tools](#extra-tools))
- **Storefront CSS overrides** — your `.j2store-*` custom styles rewritten for J2Commerce (see [Extra Migration Tools](#extra-tools))
- **Joomla menu items** — menu items pointing at J2Store views rewired to J2Commerce views (see [Extra Migration Tools](#extra-tools))
- **J2Store template overrides** — sub-template files copied and converted to J2Commerce paths (see [Extra Migration Tools](#extra-tools))

:::info

J2Store used Joomla's core categories (`#__categories` with `extension='com_j2store'`) to organize products — not a separate categories table. Your category structure is already in Joomla and does not need to be migrated. J2Commerce reads the same categories automatically.

:::

## Per-Tile Sync Dashboard {#per-tile-dashboard}

This adapter uses a **per-tile sync dashboard** inside the Migrator's Tools view. Every entity type gets its own card — Currencies, Countries, Tax Rates, Products, Orders, Customers, Coupons, and many more.

<!-- SCREENSHOT: Migrator Tools view showing multiple entity tiles, each with a status pill and action button -->

Each tile shows:

- **Entity name** — a plain-language label such as "Products" or "Order Statuses"
- **Source table** — the `j2store_*` table the adapter reads from
- **Row counter** — how many rows exist in the source, and how many have been migrated
- **Status pill** — the current state of that entity (see below)
- **Action button** — a verb-labeled button that changes as the tile progresses

### Tile Status Pills

| Status | Meaning |
|--------|---------|
| **Pending** | Not yet started — ready to sync |
| **Running** | Actively syncing — shows a live `(NN%)` percentage badge |
| **Synced** | All rows migrated successfully |
| **Error** | One or more rows failed — click the tile to review the log |
| **Empty Source** | The source table has zero rows — nothing to migrate |

### Empty Source Detection

When the adapter loads the Tools view, it checks every source table for row counts. If a table has zero rows, the tile automatically shows a green **Synced** pill and a disabled **Empty Source** button — you do not need to click anything for those tables. This keeps the dashboard clean for stores that have not used every J2Store feature.

### Live Progress Badge

When a tile is in the **Running** state, the pill updates in real time to show the current percentage — for example, **Running (45%)**. This lets you see how far a large batch has progressed without waiting for it to finish.

## Extra Migration Tools {#extra-tools}

Beyond moving raw data, this adapter includes four tools that help your storefront continue to work after migration. You find them in the **Tools** section of the Migrator dashboard, under the **Section I** heading.

<!-- SCREENSHOT: Migrator Tools view showing the Section I tools panel with the four extra tools -->

### Custom Tables Migrator

If you used J2Store add-ons that created their own database tables (for example, a vendor marketplace, order attribute storage, or shipping restriction groups), this tool copies those tables across to J2Commerce so the data from those add-ons survives migration.

Click **Migrate** on the **Custom Tables** tile to start. The tile reports how many tables were found and how many rows were copied.

### CSS Override Migrator

J2Store used its own CSS class names (`.j2store-*`). If your active site template has a custom CSS file that overrides J2Store styles, those rules will stop applying after migration because J2Commerce uses `.j2c-*` class names instead.

Click **Transform** on the **CSS Overrides** tile. The adapter scans your active template's CSS override files, finds every `.j2store-*` selector, and rewrites them to the matching `.j2c-*` selector — saving the result as a new CSS file that J2Commerce loads automatically. Your storefront keeps its custom look without you having to update the CSS manually.

### Menu Migrator

Joomla menu items that link to J2Store pages (`com_j2store`) will show "not found" errors after J2Commerce replaces J2Store. Click **Migrate** on the **Menu Items** tile. The adapter finds every menu item pointing at a J2Store view and rewires it to the equivalent J2Commerce view — keeping the same aliases and menu positions. Views covered include the product list, product detail, cart, checkout, my profile, product tags, and categories.

### Template Override Migrator

If you have J2Store sub-template overrides in your template folder (for example, a customized product detail layout), those files reference J2Store class names and helpers that no longer exist in J2Commerce. Click **Transform** on the **Template Overrides** tile. The adapter copies the override files to the corresponding J2Commerce template paths and rewrites the PHP inside them — renaming J2Store namespaces, class names, language keys, and helper calls to their J2Commerce equivalents.

:::warning

After the Template Override Migrator runs, review the converted files before going live. Complex custom PHP may need minor manual adjustments that the automated transformer cannot predict.

:::

## Tools Section {#tools-section}

The Tools section in the Migrator includes a few additional controls worth knowing about.

### Export Log

Click the **Export Log** button at the bottom of the Tools view to download a `.log` file that captures every tile's current status, row counts, source table name, and any error notes. This file is useful when opening a support ticket — it gives the support team a complete snapshot of the migration state without needing access to your site.

### Destructive Actions

Some tiles have action buttons for removing or resetting data. These are flagged with a red warning icon and are intended for special situations such as starting a migration over from scratch or uninstalling a migrated set of records.

:::warning

Destructive actions (Drop, Uninstall, Reset) permanently remove data. Take a full site backup before using them.

:::

## Tips {#tips}

- **Back up before every run.** Take a full Joomla database and files backup before starting. The Migrator can trigger an Akeeba Backup automatically if you enable that option in **J2Commerce Migrator -> Options**. Your J2Commerce 4 or J2Store tables are never modified, but a backup gives you a safe rollback point for J2Commerce data.

- **Use same-site mode when possible.** If your old J2Commerce 4 or J2Store v4 tables and your new J2Commerce 6 installation share the same Joomla database, choose Mode A on the Connection screen. It is faster and requires no extra credentials.

- **Run on a staging copy first.** Set up a staging clone of your site, run the full migration there, and verify the results before touching your live site. When you are satisfied, repeat the migration on production.

- **Leave J2Commerce 4 or J2Store v4 installed until you have verified everything.** Do not uninstall the old store until you have confirmed that all your products, orders, and customers appear correctly in J2Commerce 6. The Migrator will warn you if any tables have not been fully migrated before you attempt to uninstall.

- **Clear caches after migration.** Once the run is complete and you have verified the data, go to **Home Dashboard -> Cache -> Delete All** to clear any stale cached data.

## Troubleshooting {#troubleshooting}

### Adapter not listed in the Migrator's source dropdown {#adapter-not-listed}

**Cause:** The adapter plugin is not enabled, or the J2Commerce Migrator component is not installed.

**Solution:**

1. Go to **System -> Manage -> Plugins** and search for `j2commerce4`.
2. If the plugin appears but shows a red X, click the X to enable it.
3. If the plugin does not appear at all, the package did not install fully. Reinstall `pkg_j2commercemigrator_*.zip` from **System -> Install -> Extensions**.
4. Confirm that **com\_j2commercemigrator** appears in **System -> Manage -> Extensions** and is enabled.

### Cannot connect to the J2Commerce 4 or J2Store database {#cannot-connect}

**Cause:** The credentials entered on the Connection screen are incorrect, the table prefix does not match, or the remote database host is not accessible from this server.

**Solution:**

1. On the **Connection** screen, double-check the host, port, database name, username, password, and table prefix. The prefix for J2Commerce 4 and J2Store v4 is typically `j2store_` (without the Joomla prefix, e.g. `jos_j2store_`).
2. If you are in Mode A (same site), confirm that `j2store_*` tables actually exist in your current database. Go to **System -> Maintenance -> Database** and look for any J2Store-related tables.
3. If you are in Mode B (remote database), verify that the remote MySQL server allows connections from this server's IP address. Contact your hosting provider if you are unsure.
4. Check the Joomla error log at **System -> Global Configuration -> Logging** for any connection error details.

### Some products did not migrate {#products-missing}

**Cause:** Products may have been unpublished or trashed in J2Commerce 4 or J2Store v4, or they had a conflict with an existing J2Commerce record at the same ID.

**Solution:**

1. Open the run detail from **J2Commerce Migrator -> Runs** and click the magnifying glass icon next to the run.
2. Review the **Activity Log** and **Errors** sections for the Products tile.
3. Check whether the missing products were unpublished or trashed in the source store before migration.
4. If records were skipped because a product with the same ID already existed in J2Commerce, change the **Conflict Mode** to **Overwrite** in the Migrator Options and re-run.

### Orders are missing their customers {#orders-missing-customers}

**Cause:** The Joomla user account linked to an order was deleted in the source store before migration, leaving an orphaned order with no matching customer record.

**Solution:**

1. Open the run detail from **J2Commerce Migrator -> Runs** and review the Orders tile log for orphan warnings.
2. Orphaned orders are still migrated — they will appear in J2Commerce with billing and shipping address data intact, but without a linked Joomla user account.
3. You can manually reassign these orders to a customer account in **J2Commerce -> Sales -> Orders** after migration.

### Migration completed but the storefront looks wrong {#storefront-looks-wrong}

**Cause:** Stale cache, menu items still pointing at J2Store views, missing CSS overrides, or SEF routes that need rebuilding.

**Solution:**

1. Clear all Joomla caches: go to **Home Dashboard -> Cache -> Delete All**.
2. Go to **System -> Maintenance -> Clear Cache** and clear both standard and expired cache entries.
3. Run the **Menu Migrator** tool in **J2Commerce Migrator -> Tools** to rewire any menu items that still point at J2Store views.
4. Run the **CSS Override Migrator** tool to convert your template's custom `.j2store-*` styles to `.j2c-*` equivalents.
5. Rebuild SEF routes: go to **System -> Maintenance -> Rebuild URLs** and click **Rebuild**.
6. If product images are not showing, use the **Rebuild Product Images** tool in **J2Commerce Migrator -> Tools** to regenerate thumbnails.

### A tile is stuck on Running and never finishes {#tile-stuck-running}

**Cause:** The source table is very large. The adapter processes large tables in batches with an internal time budget of approximately 20 seconds per click, then pauses so the server can breathe. This is expected behavior, not an error.

**Solution:**

1. Check the tile's row counter and percentage badge — if the number is still increasing, the migration is progressing normally.
2. Click **Sync** again to resume the next batch. For very large tables (hundreds of thousands of rows), you may need to click several times.
3. If the percentage is stuck at the same number across multiple clicks, open the run detail log to check for repeated errors on the same source rows.
4. Consider running the migration during off-peak hours to reduce server load.
