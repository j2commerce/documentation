---
title: "J2Store 4 Migrator Adapter"
sidebar_label: "J2Store 4 Adapter"
sidebar_position: 2
description: "How to install, enable, and use the J2Store 4 Migrator Adapter plugin — the source connector that lets the J2Commerce Migrator read your old J2Store v4 store data."
---

# J2Store 4 Migrator Adapter

The J2Store 4 Migrator Adapter is the source connector for the [J2Commerce Migrator](./j2commercemigrator.md). It gives the Migrator everything it needs to read your existing J2Store v4 store — products, orders, customers, and configuration — and move that data into J2Commerce 6. Without this adapter, the Migrator has no source to read from.

## Requirements {#requirements}

- PHP 8.3 or later
- Joomla! 6.0 or later
- J2Commerce 6 installed and enabled
- **J2Commerce Migrator component installed** (the adapter cannot work without it)
- An existing J2Store v4 installation — either on the same Joomla site, or accessible via a separate database server or SSH tunnel

## Get the Adapter {#get-the-adapter}

The J2Store 4 Migrator Adapter is bundled inside the `pkg_j2commercemigrator_*.zip` package alongside the Migrator component. Installing the package installs both the Migrator and the adapter together in a single step — you do not need to download or install them separately.

**Step 1:** Log in to your account at [j2commerce.com](https://www.j2commerce.com/) and open your customer downloads area.

**Step 2:** Search for **J2Commerce Migrator** and click **View Files -> Download Now** to get `pkg_j2commercemigrator_*.zip`.

:::note

A standalone adapter zip (`plg_j2commercemigrator_j2store4_*.zip`) also exists for advanced cases, such as reinstalling only the adapter without touching the Migrator component. Most users should use the package zip.

:::

## Install the Adapter {#install-the-adapter}

### Installing via the package (recommended)

**Step 1:** In your Joomla admin, go to **System -> Install -> Extensions**.

**Step 2:** Drag and drop the `pkg_j2commercemigrator_*.zip` file into the upload area, or click **Browse for file** and select it.

**Step 3:** Joomla installs the Migrator component and the J2Store 4 adapter together. You will see a success message confirming both were installed.

:::note

The package installer checks that J2Commerce is already installed and enabled. If it is not, the installation will be refused. Install J2Commerce first, then come back to install the Migrator package.

:::

### Installing the adapter standalone

If you already have the Migrator component installed and only need to reinstall or update the adapter:

**Step 1:** Go to **System -> Install -> Extensions**.

**Step 2:** Upload the `plg_j2commercemigrator_j2store4_*.zip` file.

**Step 3:** The adapter installs and is ready to enable.

## Enable the Adapter {#enable-the-adapter}

When installing via the package, the adapter is **automatically enabled** — you do not need to enable it manually on a fresh install. You can confirm this or re-enable it at any time using either of the two methods below.

**Option A:** Go to **System -> Manage -> Plugins** using the left sidebar.

**Option B:** Click the **System** menu at the top of the Joomla admin and choose **Manage -> Plugins**.

Once on the Plugins screen:

**Step 1:** Type `j2store4` into the search bar and press Enter.

**Step 2:** Look for **J2Commerce Migrator — J2Store 4 Adapter** in the results.

**Step 3:** If the status column shows a red X, click it to enable the plugin. It will turn into a green checkmark.

:::tip

If the adapter does not appear in the search results at all, the package installation may not have completed successfully. Re-install `pkg_j2commercemigrator_*.zip` from **System -> Install -> Extensions**.

:::

## Configure the Adapter {#configure-the-adapter}

There is nothing to configure in the adapter plugin itself. The adapter has no settings panel of its own — all connection details are entered inside the J2Commerce Migrator's **Connection** step of the Migration Wizard.

When you start a migration from the Migrator Dashboard and reach the **Connection** screen, you choose one of three modes:

- **Mode A — Same site:** Your old J2Store data is in the same database as your current Joomla site. No extra credentials are needed.
- **Mode B — Remote database:** Your old J2Store data is on a different MySQL/MariaDB server. You provide the host, port, database name, username, and password on that screen.
- **Mode C — SSH tunnel:** Your old database is only reachable through an SSH tunnel. Enable this mode in the Migrator's **Options** first.

See the [J2Commerce Migrator](./j2commercemigrator.md) guide for a full walkthrough of the Migration Wizard.

## How It Works {#how-it-works}

When a migration run begins, the adapter and the Migrator work together in a series of steps:

1. **Registration.** When the Migrator loads, it fires an internal event. The adapter listens for this event and registers itself as the "J2Store 4" source. This is why the J2Store 4 card appears on the Migrator Dashboard — the adapter put it there.

2. **Connection.** When you start a Run, the Migrator asks the adapter to open a connection to your J2Store v4 database. In Mode A, it uses the existing Joomla database connection. In Mode B or Mode C, it opens a direct connection using the credentials you provided.

3. **Reading.** The adapter reads rows from the J2Store v4 source tables (`j2store_*`) in logical groups — lookup data first (currencies, countries, tax profiles), then catalog, then products, then customers, and finally orders. This ordering prevents foreign-key issues.

4. **Translating.** Each row is translated into a format J2Commerce understands. Table names change from `j2store_*` to `j2commerce_*`, primary key column names are updated to match (for example, `j2store_order_id` becomes `j2commerce_order_id`), and any JSON payloads stored in columns are updated internally so plugin keys and references use J2Commerce naming.

5. **Writing.** The Migrator's engine takes the translated data and writes it into the J2Commerce tables (`j2commerce_*`). Your J2Store tables are never touched or modified.

6. **Verification.** After the run completes, the Migrator compares source and destination row counts for every table and flags any mismatches so you can decide whether to investigate or re-run.

## What Gets Migrated {#what-gets-migrated}

The adapter migrates the following data from your J2Store v4 store:

- **Your products** — product names, descriptions, SKUs, pricing, stock quantities, and product images
- **Product variants** — all variant combinations and their individual prices, SKUs, and stock levels
- **Product options** — the option groups and values used to build variants (size, color, etc.)
- **Manufacturers and brands** — your manufacturer records and their images
- **Filter groups and filters** — catalog filter configuration
- **Your orders** — every order, including line items, applied discounts, shipping charges, fees, taxes, and order history notes
- **Order statuses** — your custom order status list
- **Your customers** — billing and shipping addresses linked to Joomla user accounts
- **Coupons and vouchers** — discount codes and gift voucher records
- **Tax configuration** — tax profiles, tax rates, tax rules, and geo-zones
- **Shipping methods and rates** — your configured shipping methods and rate tables
- **Currencies** — your currency list and exchange rate settings
- **Countries and zones** — the countries and sub-regions you have configured
- **Store configuration** — your general store settings
- **Email and invoice templates** — your customized notification templates
- **Carts and cart items** — active cart sessions (useful for continuity during a live cutover)

:::info

J2Store used Joomla's core categories (`#__categories` with `extension='com_j2store'`) to organize products, not a separate categories table. Your category structure is already in Joomla and does not need to be migrated — J2Commerce reads the same categories automatically.

:::

## Tips {#tips}

- **Back up before every run.** Take a full Joomla database and files backup before starting. The Migrator can trigger an Akeeba Backup automatically if you enable that option in **J2Commerce Migrator -> Options**. Your J2Store tables are never modified, but a backup gives you a safe rollback point for J2Commerce data.

- **Use "same-site" mode when possible.** If your old J2Store data and new J2Commerce installation share the same Joomla database (a common upgrade scenario), choose Mode A on the Connection screen. It is faster and requires no extra credentials.

- **Run on a staging copy first.** Set up a staging clone of your site, run the full migration there, and verify the results in J2Commerce before touching your live site. When you are satisfied, repeat the migration on production.

- **Leave J2Store installed until you have verified everything.** Do not uninstall J2Store v4 until you have confirmed that all your products, orders, and customers appear correctly in J2Commerce. The Migrator will warn you if any tables have not been fully migrated before you attempt to uninstall.

- **Clear caches after migration.** Once the run is complete and you have verified the data, go to **Home Dashboard -> Cache -> Delete All** to clear any stale cached data.

## Troubleshooting {#troubleshooting}

### Adapter not listed in the Migrator's source dropdown {#adapter-not-listed}

**Cause:** The adapter plugin is not enabled, or the J2Commerce Migrator component is not installed.

**Solution:**

1. Go to **System -> Manage -> Plugins** and search for `j2store4`.
2. If the plugin appears but shows a red X, click the X to enable it.
3. If the plugin does not appear at all, the package did not install fully. Reinstall `pkg_j2commercemigrator_*.zip` from **System -> Install -> Extensions**.
4. Confirm that **com_j2commercemigrator** appears in **System -> Manage -> Extensions** and is enabled.

### Cannot connect to the J2Store database {#cannot-connect}

**Cause:** The credentials entered on the Migrator's Connection screen are incorrect, the table prefix does not match, or the remote database host is not accessible from this server.

**Solution:**

1. On the **Connection** screen, double-check the host, port, database name, username, password, and table prefix.
2. If you are in Mode A (same site), confirm that `j2store_*` tables actually exist in your current database. Go to **System -> Manage -> Database** and check for any J2Store-related tables.
3. If you are in Mode B (remote database), verify that the remote MySQL server allows connections from this server's IP address. Contact your hosting provider if you are unsure.
4. Check the Joomla error log at **System -> Global Configuration -> Logging** for any connection error details.

### Some products did not migrate {#products-missing}

**Cause:** Products may have been unpublished or trashed in J2Store, or they used a product type that requires special handling. The Migrator processes all rows it finds in the source tables, but skipped rows are logged.

**Solution:**

1. Open the run detail from **J2Commerce Migrator -> Runs** and click the magnifying glass on the run.
2. Review the **Activity Log** and **Errors** sections for the Products tier.
3. Check whether the missing products were unpublished or trashed in J2Store before migration.
4. If records were skipped due to a conflict (a product with the same ID already existed in J2Commerce), change the **Conflict Mode** to **Overwrite** in the Migrator Options and re-run.

### Orders are missing their customers {#orders-missing-customers}

**Cause:** The Joomla user account linked to the order was deleted in J2Store before migration, leaving an orphaned order with no matching customer record.

**Solution:**

1. Open the run detail from **J2Commerce Migrator -> Runs** and review the Orders tier log for orphan warnings.
2. Orphaned orders are still migrated — they will appear in J2Commerce with the billing and shipping address data intact, but without a linked Joomla user account.
3. You can manually reassign these orders to a customer account in **J2Commerce -> Sales -> Orders** after migration.

### Migration completed successfully but data looks wrong on the frontend {#data-looks-wrong}

**Cause:** Stale cache, old menu items still pointing to J2Store views, or SEF routes that need rebuilding.

**Solution:**

1. Clear all Joomla caches: go to **Home Dashboard -> Cache -> Delete All**.
2. Go to **System -> Maintenance -> Clear Cache** and clear both the standard and expired cache entries.
3. Check your Joomla menu items. Any items that use **J2Store** as the menu item type need to be updated to use the equivalent **J2Commerce** view instead.
4. Rebuild SEF routes: go to **System -> Maintenance -> Rebuild URLs** and click **Rebuild**.
5. If product images are not showing, use the **Rebuild Product Images** tool in **J2Commerce Migrator -> Tools** to regenerate thumbnails.

### The adapter plugin cannot be enabled — it shows an error on save {#plugin-enable-error}

**Cause:** The plugin's preflight check found that either `com_j2commerce` or `com_j2commercemigrator` is not installed.

**Solution:**

1. Go to **System -> Manage -> Extensions** and confirm that both **J2Commerce** and **J2Commerce Migrator** appear and are enabled.
2. If either is missing, install it first, then return to **System -> Manage -> Plugins** to enable the adapter.
