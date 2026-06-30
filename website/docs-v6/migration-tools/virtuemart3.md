---
title: "VirtueMart 3"
sidebar_label: "VirtueMart 3"
sidebar_position: 6
description: "Migrate your VirtueMart 3 store into Joomla 6 and J2Commerce 6 using the VirtueMart 3 adapter for J2Commerce Migrator."
---

# VirtueMart 3

The VirtueMart 3 adapter connects the J2Commerce Migrator to your existing VirtueMart 3 site so you can bring your products, categories, customers, orders, and foundation data into Joomla 6 and J2Commerce 6.

## Requirements {#requirements}

- PHP 8.3 or later
- Joomla 6.0 or later
- J2Commerce 6 installed and enabled
- **J2Commerce Migrator component installed** (the adapter cannot work without it)
- An existing VirtueMart 3.0+ store on Joomla 3.x — either on the same database server as your Joomla site, or accessible via a separate MySQL host

:::tip

You do not need to take your VirtueMart site offline before migrating. The adapter reads from your VirtueMart database without modifying it, so your store can keep running while you work through the migration on a Joomla staging site.

:::

## Get the Adapter {#get-the-adapter}

The VirtueMart 3 adapter is bundled inside the `pkg_j2commercemigrator_*.zip` package alongside the Migrator component. Installing the package installs both the Migrator and the adapter together — you do not need to download or install them separately.

**Step 1:** Log in to your account at [j2commerce.com](https://www.j2commerce.com/) and open your customer downloads area.

**Step 2:** Search for **J2Commerce Migrator** and click **View Files -> Download Now** to get `pkg_j2commercemigrator_*.zip`.

:::info

A standalone adapter zip (`plg_j2commercemigrator_virtuemart3_*.zip`) also exists for cases where you need to reinstall or update only the adapter without touching the Migrator component. Most users should use the package zip.

:::

## Install the Adapter {#install-the-adapter}

### Installing via the package (recommended)

**Step 1:** In your Joomla admin, go to **System -> Install -> Extensions**.

<!-- Screenshot: Joomla System menu with Install → Extensions highlighted -->

**Step 2:** Drag and drop the `pkg_j2commercemigrator_*.zip` file into the upload area, or click **Browse for file** and select it.

**Step 3:** Joomla installs the Migrator component and the VirtueMart 3 adapter together. You will see a success message confirming both were installed.

:::info

The package installer checks that J2Commerce is already installed and enabled. If it is not, the installation will be refused. Install J2Commerce first, then come back to install the Migrator package.

:::

### Installing the adapter standalone

If you already have the Migrator component installed and only need to reinstall or update the adapter:

**Step 1:** Go to **System -> Install -> Extensions**.

**Step 2:** Upload the `plg_j2commercemigrator_virtuemart3_*.zip` file.

**Step 3:** The adapter installs and is ready to enable.

## Enable the Adapter {#enable-the-adapter}

When you install via the package, the adapter is **automatically enabled** — you do not need to enable it manually on a fresh install. You can confirm this at any time:

Go to **System -> Manage -> Plugins** using the left sidebar and search for `virtuemart3`.

<!-- Screenshot: Plugin Manager filtered to "virtuemart3", showing the J2Commerce Migrator VirtueMart 3 adapter row with a green checkmark -->

- If the status column shows a red **X**, click it to enable the plugin. It will turn into a green checkmark.

:::tip

If the adapter does not appear in the search results at all, the package installation may not have completed successfully. Re-install `pkg_j2commercemigrator_*.zip` from **System -> Install -> Extensions**.

:::

## Configure the Adapter {#configure-the-adapter}

The adapter has two optional settings you can fill in before starting a migration.

Go to **System -> Manage -> Plugins**, search for `virtuemart3`, and click the plugin title to open its settings.

<!-- Screenshot: VirtueMart 3 adapter plugin settings panel showing the two fields -->

| Field | Description |
|-------|-------------|
| **VirtueMart Site Root** | Absolute filesystem path to the VirtueMart 3 source site webroot (for example, `C:\www\virtuemart` or `/var/www/virtuemart`). Product images are read from the `images/stories/virtuemart/product/` subdirectory at this path. Leave blank to let the adapter auto-detect a sibling directory named `virtuemart` next to your current Joomla install. |
| **Source Site URL** | Public URL of the live VirtueMart 3 site (for example, `https://oldstore.com`). Used to download product images over HTTP when the source files are not on this server's filesystem — required for remote-database migrations where the old site is still online. Leave blank to copy images from the local filesystem path above. |

These settings are only needed for product image migration. If you are not migrating images, or if the images folder is already on the same server, you can leave both fields blank.

## Start a Migration {#start-a-migration}

**Step 1:** In the Joomla admin, go to **J2Commerce -> Migrator** (or **Components -> J2Commerce Migrator**).

<!-- Screenshot: J2Commerce Migrator Dashboard showing the "VirtueMart 3" tile card -->

**Step 2:** On the Migrator Dashboard you will see a **VirtueMart 3** card. Its status badge reads **Ready to migrate** when everything is in place. Click **Start Migration**.

**Step 3:** On the **Connection** tab, choose how the Migrator should reach your VirtueMart database:

- **Mode B — Remote database (default):** Your VirtueMart database is on a different MySQL server. Provide the host, port, database name, username, and password.
- **Mode A — Same site:** Your VirtueMart database is the same database your Joomla 6 site uses (for example, you imported a VirtueMart dump into the same MySQL instance). No extra credentials are needed.

<!-- Screenshot: Migrator Connection screen with Mode A and Mode B options visible, VirtueMart database fields highlighted -->

:::info

Mode B supports SSL connections. If your remote database server requires SSL, enable the SSL option and provide the path to the CA certificate file.

:::

The VirtueMart table prefix defaults to `jos_`. If your VirtueMart installation uses a different prefix, update this field before connecting.

Once you click **Connect**, the Migrator verifies the connection and takes you to the tools screen.

## Choose What to Migrate {#choose-what-to-migrate}

The tools screen is split into two pages controlled by tabs at the top:

- **Foundation Data** — currencies, countries, zones (states/provinces), order statuses, tax profiles, and manufacturers. Run this page first.
- **Store Data** — categories, options (product custom fields), products, product prices, product images, customers, addresses, coupons, and orders.

<!-- Screenshot: The tools page tabs showing "Foundation Data" and "Store Data", with the tab bar visible -->

Each page has a **Migrate All Foundation Data** or **Migrate All Store Data** master button at the top to queue all sections automatically, or you can work section by section.

Run **Foundation Data** first — products and orders depend on currencies, countries, and tax profiles existing in J2Commerce before they are migrated.

## Map VirtueMart Shopper Groups {#map-shopper-groups}

VirtueMart uses "shopper groups" to control which customers see certain prices. Before migrating users, you need to tell the Migrator which Joomla user group each VirtueMart shopper group should map to.

This step is on the **Foundation Data** page, in **Section A — Lookup & Probe**.

**Step 1:** Click **Detect** on the **Map Shopper Groups** tile. The adapter scans your VirtueMart database and lists every shopper group it finds.

<!-- Screenshot: The shopper group mapping modal showing VirtueMart shopper groups on the left and Joomla User Group dropdowns on the right -->

**Step 2:** For each VirtueMart shopper group, choose the matching Joomla user group from the dropdown. Common starting defaults:

| VirtueMart Shopper Group | Suggested Joomla Group |
|--------------------------|------------------------|
| Default | Registered |
| Wholesale | Registered (adjust to a custom wholesale group if you have one) |
| VIP | Registered (adjust to a custom VIP group if you have one) |

**Step 3:** If you have customers in a shopper group you do not want to migrate, choose **Skip User (do not migrate)** for that group.

**Step 4:** Click **Save Shopper Group Mapping**. You will see a confirmation message.

:::warning

You must save the shopper group mapping before running the **Users** tile. If any shopper groups remain unmapped, the Users migration will pause and ask you to resolve them first.

:::

## Run the Migration {#run-the-migration}

Each section on the tools screen shows a row of tiles. Each tile represents one data group (for example, **Currencies**, **Products**, or **Orders**). Here is what the tile buttons do:

- **Detect** — counts rows in the source and checks whether the tile is ready to run. Use this before migrating to confirm the adapter can see your data.
- **Migrate** — starts the migration for that tile. The tile shows a **Running** badge while it works, then a green **Synced** badge when complete.
- **List** — shows the migrated records in a summary view after the tile is complete.
- **Reset** — clears the migration record for that tile so you can run it again from scratch. Use this if something went wrong and you need a clean retry.

<!-- Screenshot: A section of tiles on the Foundation Data page, showing tiles with Synced green badges and Running badges, with Detect / Migrate / List / Reset buttons -->

If a tile's source table has zero rows (for example, you never created coupons in VirtueMart), it automatically shows a gray **Synced** badge and a disabled **Empty Source** button — no action needed.

### Recommended migration order

Run the sections in the order they appear on screen from top to bottom:

**Foundation Data page:**
1. Lookup & Probe (Probe Source, Map Shopper Groups)
2. Foundation Data (Currencies, Countries, Zones, Order Statuses, Tax Profiles, Manufacturers)
3. Tools (optional — use Clear Foundation ID Map only if you need to retry from scratch)

**Store Data page:**
1. Catalog Foundation (Categories, Options)
2. Products (Products, Price Tiers, Product Images, Product Options)
3. Customers (Users, Addresses)
4. Coupons
5. Orders (Ensure Order Statuses, Orders, Order Items, Order Addresses, Order History)

## Verify the Migration {#verify-the-migration}

After running all sections, check the results:

**Row counts:** Each tile shows the number of rows migrated. Compare these to your VirtueMart record counts to confirm nothing was missed.

**Export Log:** Click **Export Log** at the top of the tools screen to download a text file summarizing every section, tile, and row count from the run. Keep this file as a record of your migration.

<!-- Screenshot: The Export Log button at the top of the tools screen, and an example of the downloaded log file open in a text editor -->

**Spot-check in J2Commerce:**

1. Go to **J2Commerce -> Catalog -> Products** and verify your products appear with the correct prices, images, and categories.
2. Go to **J2Commerce -> Sales -> Orders** and spot-check a few recent VirtueMart orders.
3. Go to **System -> Manage -> Users** and confirm a sample of your customers were created with the right user group.

## What Gets Migrated {#what-gets-migrated}

### Foundation Data

- **Currencies** — currency name, ISO code, symbol, decimal places, thousands separator, exchange rate, and display position
- **Countries** — country name and ISO 2/3-letter codes
- **Zones (States/Provinces)** — zone code, name, and parent country
- **Order Statuses** — all custom VirtueMart order status names and CSS color classes
- **Tax Profiles** — VirtueMart tax calculation rules (VatTax, DATax, DBTax kinds only) are converted to J2Commerce tax profiles and tax rates; unmapped products receive a 0% fallback profile
- **Manufacturers** — manufacturer/brand names

### Store Data

- **Categories** — product categories with names, descriptions, aliases, images, and the full nested parent-child hierarchy
- **Options** — VirtueMart cart-attribute custom fields (is_cart_attribute = 1) converted to J2Commerce option definitions and their value pools; field types text, select, radio, checkbox, and date are mapped
- **Products** — all parent products (product_parent_id = 0); each product creates a linked Joomla article and a master variant; product type is imported as "simple"
- **Price Tiers** — shopper-group price tiers (virtuemart_shoppergroup_id > 0) migrated to J2Commerce product price tiers
- **Product Images** — product media images (main and gallery) copied from the source filesystem or downloaded from the source site URL; one batch per distinct product ID
- **Product Options** — per-product links between products and their option values, including per-value price adjustments
- **Customers** — Joomla user accounts from the VirtueMart user base (joined to virtuemart_vmusers); existing accounts are matched by email address to avoid duplicates
- **Addresses** — VirtueMart user info records (billing/shipping) migrated to J2Commerce addresses
- **Coupons** — discount coupon codes with their rules
- **Orders** — order totals, subtotals, tax, shipping, discount, currency, customer email, IP address, and customer notes
- **Order Items** — line items with product references, quantities, and prices
- **Order Addresses** — billing and shipping address snapshots per order (one record per distinct order)
- **Order History** — order status history entries

## What Does Not Get Migrated {#what-does-not-migrate}

The following are not included in the migration:

- **VirtueMart themes, layouts, and template overrides** — your Joomla template handles design. Recreate any custom layouts in J2Commerce.
- **VirtueMart 3rd-party extension data** — shipment plugins, payment plugin transaction logs, and data stored in custom extension tables are not read by this adapter.
- **Non-cart-attribute custom fields** — only VirtueMart custom fields where `is_cart_attribute = 1` are migrated as options. Informational-only custom fields are not migrated.
- **Child/variant products** — VirtueMart child product rows (product_parent_id > 0) are handled as part of the parent product's master variant; they are not migrated as separate J2Commerce variants.
- **Product reviews** — VirtueMart product reviews are not migrated.
- **VirtueMart payment and shipment method configurations** — you will need to set up J2Commerce payment and shipping plugins from scratch after migration.
- **Email template customizations** — J2Commerce email templates are separate from VirtueMart's. Set them up under **J2Commerce -> Configuration -> Emails** after migration.
- **VirtueMart shopper-group pricing** — only base prices and shopper-group price tiers (from virtuemart_product_prices) are migrated. Complex quantity-break pricing rules are not carried over.
- **VirtueMart password hashes (partially)** — passwords are preserved in a special way (see below).

## About Passwords {#about-passwords}

VirtueMart 3 runs on Joomla 3, which stores passwords differently from Joomla 6. The adapter preserves your users' original Joomla 3 password hashes and stores them securely in a user profile field. When a migrated user logs in to your Joomla 6 site for the first time, their original password is automatically verified and silently upgraded to Joomla 6's format — they will not notice anything different.

Three hash formats are handled automatically:

- **Joomla 3 bcrypt** (`$2y$...`) — directly valid in Joomla 6; no conversion step needed
- **Joomla 3 legacy md5:salt** (`[hash]:[salt]`) — verified on first login and upgraded to bcrypt
- **Raw md5** (Joomla 1.x accounts imported into Joomla 3) — verified on first login and upgraded to bcrypt

Once a migrated user logs in successfully, the legacy hash is deleted and only the new bcrypt password remains. If a user's password cannot be verified (for example, the hash format is unrecognized), they can use the standard **Forgot Password** link on your Joomla site to set a new password.

:::info

This automatic password upgrade works transparently for all three hash formats. No manual intervention or bulk password-reset email is needed.

:::

## Tips {#tips}

- Run Foundation Data before Store Data. Products reference currencies and tax profiles — if those are missing, product migration will fall back to defaults.
- Use the **Detect** button on a tile before clicking **Migrate**. It confirms the source database is reachable and shows the row count so you know how long to expect the tile to take.
- The migration is **idempotent** — running a tile twice skips rows already migrated. If something interrupts a migration partway through, click **Migrate** again and it continues where it left off.
- For stores with tens of thousands of products or orders, increase `max_execution_time` to `300` and `memory_limit` to `512M` in your PHP configuration before starting.
- If you need to start completely over, use **Reset Migrated Data** in the **Tools** section of the Store Data page. This removes all migrated products, categories, orders, and reference data, and clears the ID map so every tile can be re-run. Migrated Joomla user accounts are not deleted.
- Keep your VirtueMart site online during migration if you set the **Source Site URL** — product images are downloaded from that URL when the filesystem path is not available on the Joomla server.

## Troubleshooting {#troubleshooting}

### The VirtueMart 3 card does not appear on the Migrator Dashboard {#card-not-appearing}

**Cause:** The adapter plugin is not enabled, or the J2Commerce Migrator component is not installed.

**Solution:**

1. Go to **System -> Manage -> Plugins** and search for `virtuemart3`.
2. If the plugin appears but shows a red X, click the X to enable it.
3. If the plugin does not appear at all, reinstall `pkg_j2commercemigrator_*.zip` from **System -> Install -> Extensions**.
4. Confirm that the J2Commerce Migrator component appears in **System -> Manage -> Extensions** and is enabled.

### Connection to the VirtueMart database fails {#connection-fails}

**Cause:** Incorrect database credentials, wrong table prefix, firewall blocking the connection, or the remote server does not allow connections from your Joomla server's IP address.

**Solution:**

1. Double-check the host, port, database name, username, password, and table prefix on the Connection screen. The default VirtueMart prefix is `jos_`.
2. If you are using Mode B (remote database), ask your hosting provider whether remote MySQL connections are allowed and whether your Joomla server's IP needs to be added to the allow list.
3. Check the Joomla error log at **System -> Global Configuration -> Logging** for any connection error details.

### A tile is stuck on "Running" {#tile-stuck-running}

**Cause:** A long-running batch hit a PHP timeout, or a database error stopped the process mid-run.

**Solution:**

1. Refresh the page. The tile status should update to reflect the actual progress.
2. If the tile reverts to a non-complete state, click **Migrate** again. The adapter is idempotent — rows that were already migrated are skipped, so re-running a tile continues from where it left off.
3. If timeouts are the root cause, increase `max_execution_time` and `memory_limit` in your `php.ini` (or `.htaccess`). Large stores benefit from `max_execution_time = 300` and `memory_limit = 512M`.

### Shopper group mapping shows an error before Users can run {#shopper-mapping-error}

**Cause:** One or more VirtueMart shopper groups were detected but not yet assigned a Joomla user group.

**Solution:**

1. On the **Foundation Data** page, go to **Section A — Lookup & Probe**.
2. Click **Migrate** on the **Map Shopper Groups** tile to reopen the shopper group mapping panel.
3. Assign every unresolved shopper group to a Joomla user group (or choose **Skip User (do not migrate)** to exclude those accounts).
4. Click **Save Shopper Group Mapping**, then retry the **Users** tile.

### Products migrated but images are missing {#images-missing}

**Cause:** VirtueMart media files are not accessible from the Joomla server, or the image path is not configured correctly in the adapter settings.

**Solution:**

1. Open the VirtueMart 3 adapter plugin settings (**System -> Manage -> Plugins**, search `virtuemart3`).
2. Set **VirtueMart Site Root** to the absolute path of your VirtueMart Joomla 3 installation (for example, `/var/www/html/oldsite`). The adapter looks for images at `{path}/images/stories/virtuemart/product/`.
3. If the old site is on a different server and you cannot copy the files, set **Source Site URL** to the public URL of the running VirtueMart site. Product images are then downloaded over HTTP.
4. After updating the settings, go to the **Store Data** page and re-run the **Product Images** tile.

### The migration completed but some orders look incomplete {#orders-incomplete}

**Cause:** Orders depend on order statuses existing in J2Commerce. If the **Ensure Order Statuses** tile was skipped or failed, status assignments may be missing.

**Solution:**

1. On the **Store Data** page, go to **Section E — Orders**.
2. Run the **Ensure Order Statuses** tile first. It creates any required J2Commerce order statuses before orders are migrated.
3. Re-run the **Orders** tile. Because the migration is idempotent, only rows not yet migrated will be processed.

### I need to restart the migration completely {#restart-migration}

**Cause:** Data from a test run needs to be cleared before the real migration.

**Solution:**

1. On the **Store Data** page, scroll to the **Tools** section at the bottom.
2. Click **Reset Migrated Data**. Confirm the prompt. This removes all products, categories, orders, and reference data written by the VirtueMart 3 adapter and clears the ID map. Joomla user accounts are not deleted.
3. Return to the **Foundation Data** page and start again from the top.

## After the Migration {#after-the-migration}

Once you are satisfied with the migrated data, work through these steps before sending customers to your new Joomla + J2Commerce site:

1. **Set up payment plugins.** Your VirtueMart payment methods do not carry over. Install and configure the equivalent J2Commerce payment plugins (PayPal, Stripe, and many others are available from the J2Commerce Extensions Store).

2. **Review shipping methods.** VirtueMart shipping methods are not migrated. Go to **J2Commerce -> Shipping** and set up your shipping methods and zones in J2Commerce.

3. **Review tax settings.** Tax profiles are migrated from VirtueMart's tax calculation rules, but geographic zones and shipping tax rules may need adjustment. Check **J2Commerce -> Taxes** and verify each profile.

4. **Install any app plugins you need.** If you used VirtueMart extensions for subscriptions, product reviews, or other features, find the J2Commerce equivalents in the Extensions Store and install them.

5. **Set up URL redirects.** VirtueMart uses URLs like `/index.php?option=com_virtuemart&view=productdetails&virtuemart_product_id=[id]`. J2Commerce uses different URL structures. Set up 301 redirects from your old VirtueMart URLs to the new J2Commerce URLs so existing links and bookmarks keep working. Your hosting provider or a Joomla redirect plugin can help with this.

6. **Tell customers about passwords.** Migrated users can log in with their existing password — the adapter handles the password upgrade automatically on first login. You do not need to send a password-reset email to all customers, but it is good practice to send a welcome message letting them know the site has moved.

7. **Clear caches.** Go to **Home Dashboard -> Cache -> Delete All** to clear any stale cached data before going live.

8. **Run a final test.** Place a test order on your new J2Commerce site from start to finish to confirm checkout, payment, and order confirmation emails all work correctly.

## Get Help {#get-help}

- **Documentation:** [docs.j2commerce.com](https://docs.j2commerce.com)
- **Support tickets:** [j2commerce.com/support](https://www.j2commerce.com/support)
- **Community forum:** [forum.j2commerce.com](https://forum.j2commerce.com)
- **Discord:** Join the J2Commerce community Discord server via the link on the J2Commerce website
