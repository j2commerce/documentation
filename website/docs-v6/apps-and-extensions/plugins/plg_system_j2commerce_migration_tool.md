---
title: "J2Commerce Migration Tool"
sidebar_label: "Migration Tool"
sidebar_position: 20
description: "Migrate your store data from J2Store v4.1.x to J2Commerce 6 with batched transactions, conflict resolution, and post-migration verification."
---

# J2Commerce Migration Tool

The J2Commerce Migration Tool is a system plugin that moves your store data from J2Store v4.1.x (or J2Commerce v4.1.x) into J2Commerce 6. It reads from your legacy `j2store_*` tables and writes into new `j2commerce_*` tables — leaving the original data completely untouched so you can verify everything before switching over.

The migration happens in tiers. Eight tiers cover the store data itself (lookup data, tax system, catalog, products, customers, shipping, orders, and transactional data). When your source database is on a **different database or server** from your new J2Commerce 6 site, four additional tiers also become available to bring across Joomla core data (access control, users, content, and workflows). You can run all tiers at once or step through them one at a time.

:::tip

**Leapfrogging from Joomla 3?** You do not have to run the Joomla 3 -> 4 -> 5 -> 6 upgrade path. Install Joomla 6 and J2Commerce 6 on a fresh site, then point this tool at your old Joomla 3 database using Mode B or Mode C. The store data (and optionally users, articles, categories) is copied directly into the new site. See [Common Scenarios](#common-scenarios) below.

:::

:::warning
**Always do a full site and database backup before starting.** The migration tool does not delete your J2Store data, but a backup gives you a safe restore point if anything goes wrong.
:::

## Before You Begin

:::danger

**Take a full backup now.** Use Akeeba Backup, cPanel, or your hosting control panel to create a complete backup of both the Joomla files and the database. Do this before installing the migration tool, not after.

:::

:::warning
**Test on a staging site first.** Run the migration on a copy of your site before you do it on the live store. This lets you confirm that products, orders, and settings all transfer correctly without risk to real customer data.
:::

:::info

**Plan for downtime.** Depending on how many products and orders you have, migration can take several minutes. Put your site in maintenance mode while it runs to prevent new orders arriving mid-migration.

:::

:::info

**You can always roll back.** The migration tool never deletes J2Store data. If you need to start over, restore your database backup and uninstall the plugin. Each tier also has an individual **Reset** button that clears only that tier's migrated rows.

:::

## Prerequisites

Before you start, confirm all of the following:

- Joomla 6 is installed and working
- J2Commerce 6 (`com_j2commerce`) is installed and published
- Your J2Store v4.1.x data is present in the same Joomla database (or accessible from it)
- PHP 8.1 or later is running on the server
- You have Super User access in Joomla
- A full site and database backup has been completed

## Download the Plugin

The `plg_system_j2commerce_migration_tool.zip` plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) -> **Plugin**.

**Step 2:** Locate the **Upload Package File** plugin -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile menu at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the Plugin

You can install this **j2commerce\_migration\_tool** plugin using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the plugin `plg_system_j2commerce_migration_tool.zip` file or use the Install from URL option. &#x20;

![Install extensions](<../../../assets/app install1 (1) (1).webp>)

## Enable the Plugin

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **J2Commerce Migration Tool**.
3. Click the status icon next to the plugin name to enable it (it turns green).

<!-- SCREENSHOT: Plugin Manager showing the J2Commerce Migration Tool plugin with the enabled toggle highlighted -->

## Step-by-Step Migration Walkthrough

### Step 1: Open the Migration Dashboard

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **J2Commerce Migration Tool**.
3. Click the plugin title to open its settings.

The plugin settings page contains the full **Migration Dashboard** — the entire migration runs from here. You do not need to leave this page.

<!-- SCREENSHOT: Plugin edit screen showing the Migration Dashboard embedded in the params area, with the Welcome card and feature list visible -->

### Step 2: Choose Your Source Database Location

The first section asks: **Where is your J2Store v4 database located?**

Select the option that matches your setup: Below shows the Option choices and when to choose it.

**Same database as J2Commerce v6:** J2Store and J2Commerce 6 are on the same Joomla site. This is the most common scenario. No credentials needed.

**Different database on the same server:** J2Store is in a separate database on the same MySQL server. You will need that database name, username, and password.

**Different database on a different server:** J2Store is on a completely separate server. You will need the host, port, database name, and credentials.

<!-- SCREENSHOT: Source Database Locator section showing the three radio button options -->

**For "Same database":** Click **Compare Databases**. The tool confirms the connection automatically using Joomla's existing database settings.

**For "Different database on same server" or remote server:** Fill in the connection fields that appear:

**Database Name:** The name of the J2Store database

**Username:** MySQL user with SELECT access on that database

**Password:** Password for the MySQL user

**Source Prefix:** Table prefix used in the J2Store database (commonly `jos_`)

**Host / IP:** (Remote server only) MySQL hostname or IP address

**Port:** (Remote server only) MySQL port, default `3306`

**Use SSL:** Enable if your MySQL server requires SSL connections

Click **Compare Databases** to verify the connection. The status changes to **Connected to \[database] on \[host]** when successful.

:::tip

If you see "no J2Store tables found", double-check the **Source Prefix** field. J2Store commonly uses `jos_` as its prefix, but your installation may differ.

:::

:::info

The **pdo\_mysql** PHP extension must be installed to connect to a different database. If you see an error about PDO not being available, contact your hosting provider to enable it.

:::

### Step 3: Run the Audit

Once the source connection is confirmed, the main dashboard area becomes visible.

Click **Audit** in the Operations toolbar.

<!-- SCREENSHOT: Data Operations tab showing the Audit button, Analyze button, and the tier list below -->

The audit scans all eight tiers and reports how many source rows exist in each J2Store table. Each tier expands to show individual table row counts alongside their current migration status badge (**Pending**, **Completed**, or **Error**).

**What to look for:** Verify that the row counts look correct for your store. If you see 0 rows for products but you know you have hundreds, the source connection or prefix may be wrong.

### Step 4: Analyze for Conflicts (Recommended)

Click **Analyze Database** to run a detailed pre-migration comparison.

The analyzer checks every source row against its potential target and identifies:

- **Clean inserts** — rows that do not yet exist in J2Commerce (safe to migrate)
- **Identical** — rows already matching in both databases (will be skipped)
- **Conflicts** — rows that exist in both but with different values

After analysis, the **Conflicts** tab shows a number badge if conflicts were found.

<!-- SCREENSHOT: Conflicts tab showing a list of conflicting rows with skip/overwrite/merge buttons -->

For each conflict, choose how to handle it: Below shows the **Action** and their **Effects**.

**Skip:** Keep the existing J2Commerce value. The J2Store value is ignored.

**Overwrite:** Replace the J2Commerce value with the J2Store value.

**Merge:** Keep the J2Commerce value but fill in any empty fields from J2Store.

**Use Target:** Same as Skip — explicitly marks the J2Commerce version as the winner.

You can also use the **global conflict mode** selector at the top of the Operations tab to apply a default strategy to all conflicts at once.

:::info

If this is a fresh J2Commerce 6 install with no store data yet, you will see zero conflicts. You can skip the analysis step and go straight to migration.

:::

### Step 5: Migrate Configuration Settings

Click **Analyze Configuration Settings** to compare your J2Store configuration with J2Commerce's settings.

The tool shows a side-by-side comparison table with columns for:

- The setting key
- The J2Store (source) value
- The J2Commerce (target) value
- The action to take (Update / Skip / Ignore)

Review each row and adjust the action column as needed. Then click **Migrate Configuration Settings** to apply your choices.

<!-- SCREENSHOT: Configuration Setting Comparison table showing rows with J2Store and J2Commerce values side by side -->

### Step 6: Migrate the Data

You have two options:

**Option A — Migrate everything at once:**

Click **Migrate All Data** in the Operations toolbar. The tool runs all eight tiers in sequence.

**Option B — Run tier by tier:**

Click the tier header to expand it, then click the **Run** button for that individual tier. This gives you more control and lets you verify each section before moving on.

<!-- SCREENSHOT: Tier section showing Tier 4 expanded with the Run and Reset buttons visible, and a progress bar below -->

Each tier shows a progress bar while running. When a tier finishes, its badge changes to **Completed** (green) or **Error** (red).

The eight data tiers migrate in this order:

| Tier       | Name          | What it migrates                                               |
| ---------- | ------------- | -------------------------------------------------------------- |
| **Tier 1** | Lookup Tables | Currencies, countries, zones, order statuses, lengths, weights |
| **Tier 2** | Tax System    | Tax profiles, tax rates, tax rules, geozones                   |
| **Tier 3** | Catalog       | Options, manufacturers, custom fields, filters                 |
| **Tier 4** | Products      | Products, variants, images, files, prices, quantities          |
| **Tier 5** | Customers     | Addresses, coupons, vouchers, vendors                          |
| **Tier 6** | Shipping      | Shipping methods, shipping rates                               |
| **Tier 7** | Orders        | Orders, order items, history, fees, taxes, discounts           |
| **Tier 8** | Transactional | Carts, queues, email templates, invoice templates              |

:::tip

Always run tiers in order (1 through 8). Each tier can depend on data from the previous one. For example, orders (Tier 7) reference products (Tier 4) — running orders first would fail or produce incomplete records.

:::

:::info

Large stores with thousands of products or tens of thousands of orders may take several minutes per tier. Leave the page open until each tier reports **Completed**. The migration processes data in batches of 500 rows at a time to avoid PHP timeouts.

:::

### Step 7: Migrate Menus

After the data tiers are complete, scroll to the menu migration section.

1. Click **Load J2Store Menus** to retrieve a list of your existing J2Store menu items.
2. For each menu item, select the matching J2Commerce view type from the dropdown (for example, **Category List**, **Single Product**, **Checkout**, **My Account**).
3. Select the items you want to migrate using the checkboxes.
4. Click **Migrate Selected**.

<!-- SCREENSHOT: Menu Item Migration section showing a list of menu items with type dropdowns and checkboxes -->

Alternatively, click **Create Store Pages** to automatically generate a new J2Commerce menu with all standard store pages (cart, checkout, my account, confirmation).

### Step 8: Verify the Migration

Click the **Comparisons** tab, then click **Run Comparison**.

<!-- SCREENSHOT: Comparisons tab showing verification results with source and target row count columns -->

The verification runs a count comparison between every source J2Store table and its target J2Commerce table. A successful migration shows matching row counts across the board.

**What to look for:**

- Row counts match between source and target — migration is complete
- Target count is higher than source count — J2Commerce already had some data before migration (expected if you ran the migration twice)
- Target count is lower than source count — some rows were skipped due to conflicts; check the Conflicts tab

### Step 9: Migrate Product Images

Click the **Images** tab to access image tools.

**If your source is on the same server (Mode A or B):**

The **Rebuild Product Images** section lets you regenerate thumbnail and optimized image sets for all migrated products. Select your image folder, then click **Rebuild Images** to process images in batches.

**If your source is on a different server (Mode B):**

First use the **Copy Source Images** section to copy product images from the source Joomla site into this site's `images/shop/` folder. Provide the absolute filesystem path to the source site's `images/` folder, then click **Copy Source Images**.

**If your source is on a remote server (Mode C):**

You must manually copy images to this server using `rsync`, `scp`, or a similar tool before running the rebuild step.

<!-- SCREENSHOT: Images tab showing the Rebuild Product Images section with folder selection and the Rebuild Images button -->

### Step 10: Post-Migration Cleanup

When the migration is complete and you have verified everything works correctly in J2Commerce 6:

1. Go to **J2Commerce** in the admin to confirm products, orders, and settings look correct.
2. Test the checkout flow on the frontend.
3. Switch your site's store pages to use the new J2Commerce menu items.
4. Disable or uninstall the legacy J2Store component if it is no longer needed.
5. Return to the Migration Dashboard and click **Cleanup** (available at the bottom of the Data Operations tab after core tier migrations) to drop the internal ID-mapping table. This is only needed if you ran Joomla Core Table migrations.
6. Uninstall the Migration Tool plugin via **System** -> **Manage** -> **Extensions** when you are satisfied.

:::info

The J2Store tables (`j2store_*`) remain in your database until you explicitly remove them. This is intentional — they serve as your fallback in case anything needs to be re-checked after the migration.

:::

## Remote Source (Modes B and C) — Joomla Core Tables

When migrating from a **separate database** (Modes B or C), the dashboard also shows four additional tiers for Joomla core data:

| Tier        | Name           | What it migrates                                     |
| ----------- | -------------- | ---------------------------------------------------- |
| **Tier 9**  | Access Control | Assets (ACL nodes), user groups, view levels         |
| **Tier 10** | Users          | User accounts, group memberships, profiles           |
| **Tier 11** | Content        | Categories, articles, tags, custom field values      |
| **Tier 12** | Workflows      | Workflows, stages, transitions, content associations |

Run these tiers in order before the J2Store data tiers. They remap primary keys so that all foreign key relationships remain correct in the target database.

## Common Scenarios

Pick the scenario that matches your situation, then apply the settings shown. All settings are chosen in the Migration Dashboard — no code or configuration files need editing.

### Scenario 1 — In-place upgrade on the same Joomla 6 site

You already upgraded your Joomla 3/4/5 site to Joomla 6, the old `j2store_*` tables still sit in the same database, and you now want to move that data into J2Commerce 6 on the same site.

- **Settings to use:** Below are the **Settings** and their **Value**.

**Source Database Location: Same database as J2Commerce v6** (Mode A)

**Source Prefix:** Your current Joomla prefix (usually what is in `configuration.php`)

**Tiers to run:** Tiers 1-8 only

**Joomla core tiers (9-12):** Not shown — not needed

**Menus:** Use **Load J2Store Menus** to remap, or **Create Store Pages** for a clean start

**Images:** Use **Rebuild Product Images** — files are already in `images/` on this server

**Conflict Mode: Skip** (safest default if J2Commerce already has any data)

:::tip

This is the fastest and safest scenario. No PDO, no credentials, no file copying.

:::

### Scenario 2 — New Joomla 6 site, J2Store database on the same server

You spun up a fresh Joomla 6 + J2Commerce 6 site and want to pull the store data from your old site's database (which lives on the same hosting account / same MySQL server).

- **Settings to use:** Below are the **Settings** and their **Value**.

**Source Database Location:** Different database on the same server (Mode B)

**Database Name / Username / Password:** Credentials for the old site's database

**Source Prefix:** The old site's prefix (commonly `jos_` for Joomla 3)

**Tiers to run:** Tiers 9-12 first (if you want users/content), then Tiers 1-8

**Menus: Create Store Pages** — cleaner than remapping old menus

**Images:** Use **Copy Source Images** with the absolute path to the old site's `images/` folder, then **Rebuild Product Images**

**Conflict Mode: Overwrite** on a fresh install (the target is empty, so conflicts are rare)

:::caution

The `pdo_mysql` PHP extension must be enabled to connect to the old database. Check with your host if you see a "PDO not available" message.

:::

### Scenario 3 — New Joomla 6 site, J2Store database on a different server

Your old site is on a completely separate hosting account, VPS, or cloud provider. You want to migrate to a fresh Joomla 6 + J2Commerce 6 installation.

- **Settings to use:** Below are the **Settings** and their **Value**.

**Source Database Location: Different database on a different server** (Mode C)

**Host / IP, Port:** Hostname/IP and port of the old MySQL server

**Database Name / Username / Password:** Credentials for the old database

**Source Prefix:** The old site's prefix

**Use SSL:** Enable if the remote MySQL requires SSL (most managed hosts do)

**Tiers to run:** Tiers 9-12 first (if you want users/content), then Tiers 1-8

**Menus: Create Store Pages**

**Images:** Manually copy `images/` from the old server to the new server using `rsync`, `scp`, SFTP, or your hosting migration tool. Then click **Rebuild Product Images**.

**Conflict Mode: Overwrite** on a fresh install

:::warning
The remote MySQL server must accept connections from your new server's IP address. You may need to whitelist the IP in the old host's firewall or cPanel **Remote MySQL** settings.
:::

### Scenario 4 — Skip the Joomla 3 -> 4 -> 5 -> 6 upgrade entirely (recommended for old sites)

You are on Joomla 3 with J2Store, and you do not want to go through three consecutive major upgrades. Instead: build a clean Joomla 6 site with a modern Joomla 6 template, and pull the store (and optionally users/content) straight across.

**Why this is often the best route:**

- Joomla 3 to 4 breaks most templates and many extensions.
- Each upgrade (3 to 4, 4 to 5, 5 to 6) has its own compatibility surprises.
- A fresh Joomla 6 install is faster, cleaner, and lets you adopt a modern Bootstrap 5 template from day one.
- **Settings to use:** Below are the **Settings** and their **Value**.

**New site:** Fresh Joomla 6 install with a **Joomla 6 compliant template** (your old Joomla 3 template will not work)

**J2Commerce 6:** Installed and published on the new site

**Source Database Location: Mode B** if the old database is on the same server, **Mode C** if it is remote

**Source Prefix:** Your Joomla 3 prefix (commonly `jos_`)

**Tiers 9-12:** Run these if you also want to bring across Joomla users, articles, categories, tags, and content custom fields

**Tiers 1-8:** Run to migrate the store itself

**Menus: Create Store Pages** — your old Joomla 3 menu structure is unlikely to fit a modern template

**Images:** Mode B: **Copy Source Images**. Mode C: manual `rsync`/`scp` + **Rebuild Product Images**

**Template:** Pick and install a Joomla 6 template before migrating (so menu items and modules assign to the correct template when created)

**Conflict Mode: Overwrite** (target is fresh — conflicts just mean placeholder data from the new install)

:::tip

**You do not need to touch the old Joomla 3 site during migration.** The tool only reads from its database. Keep the old site running as-is until you are ready to cut over DNS to the new Joomla 6 site.

:::

:::info

**What does not get migrated automatically:** third-party Joomla 3 component data (forums, classifieds, other commerce tools), menu module assignments, template overrides, and any custom PHP files. Plan to reconfigure modules and rebuild overrides against the new Joomla 6 template.

:::

### Scenario 5 — Clone / staging copy

You want to clone a live J2Commerce 6 store into a staging environment so you can test template or configuration changes without risk.

- **Settings to use:** Below are the **Settings** and their **Value**.

**Source Database Location: Mode B** (same server) or **Mode C** (remote), pointing at the live site's database

**Tiers 9-12:** Skip unless you also want to clone users and content

**Tiers 1-8:** Run all eight to mirror the store

**Conflict Mode: Overwrite**

**Images:** Use **Copy Source Images** or `rsync` then **Rebuild Product Images**

:::info

Staging clones containing real customer orders and addresses still contain personal data. Treat the staging database with the same security controls as production, and consider anonymizing customer records after cloning.

:::

## Configuration Options

The plugin has one parameter in the standard Joomla plugin edit form. All other settings are controlled from the Migration Dashboard UI itself.

| Setting           | Description                                                                                                                                            | Notes                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| **Conflict Mode** | Default strategy when a source row already exists in the target. Options: **Skip (keep target)**, **Overwrite (use source)**, **Merge (target wins)**. | You can override this per-row in the Conflicts tab. |

## Troubleshooting

### Migration stops partway through

**Cause:** PHP execution time or memory limit was hit.

**Solution:**

1. Check your hosting control panel or `php.ini` for `max_execution_time` and `memory_limit`. Increase them temporarily (for example, `max_execution_time = 300` and `memory_limit = 512M`).
2. If you cannot change PHP settings, use the individual tier **Run** buttons instead of **Migrate All Data** — smaller operations are less likely to time out.
3. Check the Joomla log file at `administrator/logs/plg_system_j2commerce_migration_tool.log` for the specific error.

### Some products did not transfer

**Cause:** Conflicting records were set to "Skip", or the products were in a table not covered by the tier that ran.

**Solution:**

1. Open the **Conflicts** tab and look for product rows that were skipped.
2. Change the action to **Overwrite** or **Merge** and re-run Tier 4.
3. If the products are entirely missing, run the **Audit** again — the row counts will show whether the source has data that was not transferred.

### I see errors in the log

**Log file location:** `administrator/logs/plg_system_j2commerce_migration_tool.log`

Each log entry includes the action that failed, the exception class, and the file and line number. Common entries:

- **Table not found** — the source table does not exist, likely a prefix mismatch. Verify the **Source Prefix** in the source locator.
- **Access denied** — the database user does not have SELECT access on the source database.
- **Duplicate entry** — a row with that primary key already exists. Use the **Analyze Database** step to identify conflicts before running again.

### I need to start over completely

**Solution:**

1. Restore your full database backup (created before installation).
2. If you want to keep J2Commerce 6 but re-run the migration, use the **Reset** button on each tier to clear migrated rows, then run the tiers again.
3. Do not click Reset unless you are sure — it deletes the migrated `j2commerce_*` table rows for that tier.

### The Connection says "PDO not available"

**Cause:** The `pdo_mysql` PHP extension is not loaded. This extension is required for connecting to a separate database (Modes B and C).

**Solution:** Contact your hosting provider and ask them to enable `pdo_mysql`. Mode A (same database) does not require PDO and always works.

### The dashboard shows "J2Commerce 6 is required"

**Cause:** The `com_j2commerce` component is not installed or not published on this site.

**Solution:** Install J2Commerce 6 first, then return to the Migration Tool plugin settings. The dashboard will appear once J2Commerce is detected.
