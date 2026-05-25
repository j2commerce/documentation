---
title: "WooCommerce"
sidebar_label: "WooCommerce"
sidebar_position: 5
description: "Migrate your WordPress + WooCommerce store into Joomla 6 and J2Commerce 6 using the WordPress + WooCommerce adapter for J2Commerce Migrator."
---

# WooCommerce

The WordPress + WooCommerce adapter connects the J2Commerce Migrator to your existing WordPress site so you can bring your content, products, orders, and customers into Joomla 6 and J2Commerce 6.

## Requirements {#requirements}

- PHP 8.3 or later
- Joomla 6.0 or later
- J2Commerce 6 installed and enabled
- **J2Commerce Migrator component installed** (the adapter cannot work without it)
- An existing WordPress 5.0+ site with WooCommerce 7.1+ installed — either on the same database server as your Joomla site, or accessible via a separate MySQL/MariaDB host

:::tip

You do not need to take your WordPress site offline before migrating. The adapter reads from your WordPress database without modifying it, so your WooCommerce store can keep running while you work through the migration on a Joomla staging site.

:::

## Get the Adapter {#get-the-adapter}

The WordPress + WooCommerce adapter is bundled inside the `pkg_j2commercemigrator_*.zip` package alongside the Migrator component. Installing the package installs both the Migrator and the adapter together — you do not need to download or install them separately.

**Step 1:** Log in to your account at [j2commerce.com](https://www.j2commerce.com/) and open your customer downloads area.

**Step 2:** Search for **J2Commerce Migrator** and click **View Files -> Download Now** to get `pkg_j2commercemigrator_*.zip`.

:::info

A standalone adapter zip (`plg_j2commercemigrator_wordpress_*.zip`) also exists for cases where you need to reinstall or update only the adapter without touching the Migrator component. Most users should use the package zip.

:::

## Install the Adapter {#install-the-adapter}

### Installing via the package (recommended)

**Step 1:** In your Joomla admin, go to **System -> Install -> Extensions**.

<!-- Screenshot: Joomla System menu with Install → Extensions highlighted -->

<!-- ![](/img/PLACEHOLDER.webp) -->

**Step 2:** Drag and drop the `pkg_j2commercemigrator_*.zip` file into the upload area, or click **Browse for file** and select it.

**Step 3:** Joomla installs the Migrator component and the WordPress + WooCommerce adapter together. You will see a success message confirming both were installed.

:::info

The package installer checks that J2Commerce is already installed and enabled. If it is not, the installation will be refused. Install J2Commerce first, then come back to install the Migrator package.

:::

### Installing the adapter standalone

If you already have the Migrator component installed and only need to reinstall or update the adapter:

**Step 1:** Go to **System -> Install -> Extensions**.

**Step 2:** Upload the `plg_j2commercemigrator_wordpress_*.zip` file.

**Step 3:** The adapter installs and is ready to enable.

## Enable the Adapter {#enable-the-adapter}

When you install via the package, the adapter is **automatically enabled** — you do not need to enable it manually on a fresh install. You can confirm this at any time:

Go to **System -> Manage -> Plugins** using the left sidebar and search for `wordpress`.

<!-- Screenshot: Plugin Manager filtered to "wordpress", showing the J2Commerce Migrator WordPress adapter row with a green checkmark -->

<!-- ![](/img/PLACEHOLDER.webp) -->

- If the status column shows a red **X**, click it to enable the plugin. It will turn into a green checkmark.

:::tip

If the adapter does not appear in the search results at all, the package installation may not have completed successfully. Re-install `pkg_j2commercemigrator_*.zip` from **System -> Install -> Extensions**.

:::

## Configure the Adapter {#configure-the-adapter}

There is nothing to configure in the adapter plugin itself. The adapter has no settings panel of its own — all connection details are entered inside the J2Commerce Migrator's wizard when you start a migration.

## Start a Migration {#start-a-migration}

**Step 1:** In the Joomla admin, go to **J2Commerce -> Migrator** (or **Components -> J2Commerce Migrator**).

<!-- Screenshot: J2Commerce Migrator Dashboard showing the "WordPress + WooCommerce" tile card -->

<!-- ![](/img/PLACEHOLDER.webp) -->

**Step 2:** On the Migrator Dashboard you will see a **WordPress + WooCommerce** card. Its status badge reads **Ready to migrate** when everything is in place. Click **Start Migration**.

**Step 3:** On the **Connection** screen, choose how the Migrator should reach your WordPress database:

- **Mode A — Same site:** Your WordPress database is the same database your Joomla site uses. This is common when you ran both sites on the same server or imported a WordPress dump into the same MySQL instance. No extra credentials are needed.
- **Mode B — Remote database:** Your WordPress database is on a different MySQL/MariaDB server. You provide the host, port, database name, username, and password.

<!-- Screenshot: Migrator Connection screen with Mode A and Mode B options visible, WordPress database fields highlighted -->

<!-- ![](/img/PLACEHOLDER.webp) -->

:::info

Mode B supports SSL connections. If your remote database server requires SSL, enable the SSL option and provide the path to the CA certificate file.

:::

The WordPress table prefix defaults to `wp_`. If your WordPress installation uses a different prefix (for example, `myshop_`), update this field before connecting.

Once you click **Connect**, the Migrator verifies the connection and takes you to the tools screen.

## Choose What to Migrate {#choose-what-to-migrate}

The tools screen is split into two pages controlled by a toggle at the top:

- **Content Migration** — everything from WordPress core: users, blog posts, pages, categories, tags, navigation menus, and media uploads.
- **Commerce Migration** — everything from WooCommerce: products, orders, customers, coupons, tax rates, and shipping zones.

<!-- Screenshot: The tools page toggle showing "Content Migration" and "Commerce Migration" options, with the toggle bar visible -->

<!-- ![](/img/PLACEHOLDER.webp) -->

You can run them in any order, but running Content Migration first is recommended because users must exist in Joomla before Commerce Migration can link customer addresses to the right accounts.

Each page has a **Migrate All** master button at the top to queue all sections automatically, or you can work section by section.

## Map WordPress Roles to Joomla User Groups {#map-roles}

Before migrating users, you need to tell the Migrator which Joomla user group each WordPress role should land in. This step is on the **Content Migration** page, in **Section A — Lookup and Probe**.

**Step 1:** Click **Detect** on the **Map User Roles** tile. The adapter scans your WordPress database and lists every role it finds.

<!-- Screenshot: The role mapping tile showing WordPress roles on the left (Administrator, Editor, Author, etc.) and Joomla User Group dropdowns on the right -->

<!-- ![](/img/PLACEHOLDER.webp) -->

**Step 2:** For each WordPress role, choose the matching Joomla user group from the dropdown. Common starting defaults:

| WordPress Role | Suggested Joomla Group |
|---------------|------------------------|
| Administrator | Super Users |
| Shop Manager | Manager |
| Editor | Publisher |
| Author | Author |
| Contributor | Registered |
| Subscriber | Registered |
| Customer | Registered |

**Step 3:** If you have users in a vendor role (such as a WooCommerce marketplace vendor plugin), you can choose **Skip User (do not migrate)** so those accounts are not brought over.

**Step 4:** Click **Save Role Mapping**. You will see a confirmation message.

:::warning

You must save the role mapping before running the Users tile. If any roles remain unmapped, the Users migration will pause and ask you to resolve them first.

:::

## Run the Migration {#run-the-migration}

Each section on the tools screen shows a row of tiles. Each tile represents one data group (for example, Users, Products, or Orders). Here is what the tile buttons do:

- **Detect** — counts rows in the source and checks whether the tile is ready to run. Use this before migrating to confirm the adapter can see your data.
- **Migrate** — starts the migration for that tile. The tile shows a **Running** badge while it works, then a green **Synced** badge when complete.
- **List** — shows the migrated records in a summary view after the tile is complete.
- **Reset** — clears the migration record for that tile so you can run it again from scratch. Use this if something went wrong and you need a clean retry.

<!-- Screenshot: A section of tiles on the Content Migration page, showing tiles with Synced green badges and Running badges, with Detect / Migrate / List / Reset buttons -->

<!-- ![](/img/PLACEHOLDER.webp) -->

If a tile's source table has zero rows (for example, you never created coupons in WooCommerce), it automatically shows a gray **Synced** badge and a disabled **Empty Source** button — no action needed.

The recommended order within each page matches the top-to-bottom section order on screen. The Migrator prevents you from running sections that depend on an earlier section being complete first.

## Verify the Migration {#verify-the-migration}

After running all sections, check the results:

**Row counts:** Each tile shows the number of rows migrated. Compare these to your WordPress record counts to confirm nothing was missed.

**Export Log:** Click **Export Log** (top of the tools screen) to download a text file summarizing every section, tile, and row count from the run. Keep this file as a record of your migration.

<!-- Screenshot: The Export Log button at the top of the tools screen, and an example of the downloaded log file open in a text editor -->

<!-- ![](/img/PLACEHOLDER.webp) -->

**Spot-check in J2Commerce:**

1. Go to **J2Commerce -> Catalog -> Products** and verify your products appear with the correct prices, images, and categories.
2. Go to **J2Commerce -> Sales -> Orders** and spot-check a few recent WooCommerce orders.
3. Go to **System -> Manage -> Users** and confirm a sample of your customers were created with the right user group.

## What Gets Migrated {#what-gets-migrated}

### WordPress Content

- WordPress users — created as Joomla user accounts, assigned to the group you mapped in the role mapping step
- WordPress user meta — migrated to Joomla custom fields under a "WordPress Meta" group
- Blog posts — migrated as Joomla articles in a "Blog" category
- Post custom fields — migrated to Joomla article custom fields
- Pages — migrated as Joomla articles in a "Pages" category, with parent-child hierarchy preserved
- Categories and tags — migrated to Joomla categories and tags
- Navigation menus — migrated to Joomla menu types and menu items
- Media library — upload paths recorded and image references inside article content rewritten to point to your new Joomla file location

### WooCommerce Commerce Data

- WooCommerce products — simple, variable, grouped, virtual, and downloadable product types
- Product meta — pricing, stock levels, weight, and dimensions
- Product variations — all variation combinations with their individual prices, SKUs, and stock
- Product attributes — attribute groups (size, color, etc.) and their values
- Product categories and product tags
- Product gallery images
- Customer billing addresses
- Customer shipping addresses
- Coupons — discount codes with their rules (type, amount, usage limits)
- Tax classes and tax rates — mapped to J2Commerce tax profiles and tax rates
- Tax geographic locations — mapped to J2Commerce geo zones
- Shipping zones and zone locations — mapped to J2Commerce geo zones
- Shipping methods
- Orders — with automatic detection of WooCommerce's High-Performance Order Storage (HPOS) or legacy post-based storage
- Order addresses (billing and shipping snapshots per order)
- Order line items and item meta
- Order tax lines
- Order shipping lines
- Order history notes
- Product reviews — requires the J2Commerce Product Reviews app to be installed before running this section

## What Does Not Get Migrated {#what-does-not-migrate}

The following are not included in the migration:

- **WordPress themes, plugins, and widgets** — your Joomla template handles design; there is no equivalent concept to migrate.
- **WooCommerce 3rd-party extension data** — if you used Subscriptions, Bookings, Memberships, or other WooCommerce extensions that store data in their own custom tables, those tables are not read by this adapter. Install the equivalent J2Commerce app first, then handle that data separately.
- **WordPress comments** — standard blog post comments are not migrated. Product reviews are migrated as a separate section (requires the Product Reviews app).
- **WooCommerce email template customizations** — you will need to set up J2Commerce email templates from scratch after migration.
- **WordPress password hashes (partially)** — passwords are preserved, but in a special way (see below).

### About Passwords

WordPress uses a different password format than Joomla. The adapter preserves your users' WordPress password hashes and stores them securely. When a migrated user logs in to your Joomla site for the first time, their WordPress password is automatically verified and silently converted to Joomla's format — they will not notice anything different.

If a user's password cannot be verified (for example, the hash format is not recognized), the standard Joomla login process applies and the user can use the **Forgot Password** link to set a new password.

:::info

This automatic password upgrade works for all password formats used by WordPress 5.0 through 6.x. No manual intervention is needed for the vast majority of users.

:::

## Troubleshooting {#troubleshooting}

### The WordPress + WooCommerce card does not appear on the Migrator Dashboard {#card-not-appearing}

**Cause:** The adapter plugin is not enabled, or the J2Commerce Migrator component is not installed.

**Solution:**

1. Go to **System -> Manage -> Plugins** and search for `wordpress`.
2. If the plugin appears but shows a red X, click the X to enable it.
3. If the plugin does not appear at all, reinstall `pkg_j2commercemigrator_*.zip` from **System -> Install -> Extensions**.
4. Confirm that the J2Commerce Migrator component appears in **System -> Manage -> Extensions** and is enabled.

### Connection to the WordPress database fails {#connection-fails}

**Cause:** Incorrect database credentials, wrong table prefix, firewall blocking the connection, or the remote database server does not allow connections from your Joomla server's IP address.

**Solution:**

1. Double-check the host, port, database name, username, password, and table prefix on the Connection screen. The default WordPress prefix is `wp_`.
2. If you are using Mode B (remote database), ask your hosting provider whether remote MySQL connections are allowed and whether your Joomla server's IP needs to be added to the allow list.
3. Check the Joomla error log at **System -> Global Configuration -> Logging** for any connection error details.

### A tile is stuck on "Running" {#tile-stuck-running}

**Cause:** A long-running batch hit a PHP timeout, or a database error stopped the process mid-run.

**Solution:**

1. Refresh the page. The tile status should update to reflect the actual progress.
2. If the tile reverts to a non-complete state, click **Migrate** again. The adapter is idempotent — rows that were already migrated are skipped, so re-running a tile continues from where it left off.
3. If timeouts are the root cause, increase `max_execution_time` and `memory_limit` in your `php.ini` (or `.htaccess`). Large stores with tens of thousands of products or orders benefit from `max_execution_time = 300` and `memory_limit = 512M`.

### Role mapping shows an error before Users can run {#role-mapping-error}

**Cause:** One or more WordPress roles were detected but not yet assigned a Joomla user group.

**Solution:**

1. On the **Content Migration** page, go to **Section A — Lookup and Probe**.
2. Click **Migrate** on the **Map User Roles** tile to reopen the role mapping panel.
3. Assign every unresolved role to a Joomla user group (or choose **Skip User** to exclude those accounts).
4. Click **Save Role Mapping**, then retry the **Users** tile.

### Products migrated but images are missing {#images-missing}

**Cause:** WordPress media files are not accessible from the Joomla server, or the image path rewrite step was not run.

**Solution:**

1. Copy your WordPress `wp-content/uploads/` folder to your Joomla server. Place it at `images/wordpress/` inside your Joomla installation's files directory.
2. On the **Content Migration** page, run **Section G — Uploads and Media**. The **Rewrite Body Images** tile updates image paths inside article content automatically.
3. For product gallery images, make sure **Section E — Products** in Commerce Migration was completed fully, including the **Product Images** tile.

### Language or locale looks wrong after migration {#language-mismatch}

**Cause:** WordPress and Joomla may have different default languages configured.

**Solution:**

1. Go to **System -> Global Configuration** and confirm your Joomla site language is set correctly.
2. Check your Joomla language packs are installed: **System -> Manage -> Languages**.
3. Individual migrated articles default to your Joomla site's language. You can update them in bulk from **Content -> Articles** using the bulk actions toolbar.

### The migration completed but some orders look incomplete {#orders-incomplete}

**Cause:** Certain WooCommerce order data requires HPOS (High-Performance Order Storage) detection to be run before orders are migrated.

**Solution:**

1. On the **Commerce Migration** page, go to **Section A — Lookup and Probe**.
2. Run the **Detect HPOS Mode** tile to let the adapter check your WooCommerce configuration.
3. Return to **Section H — Orders** and re-run any incomplete tiles. The adapter will use the correct storage mode automatically.

## After the Migration {#after-the-migration}

Once you are satisfied with the migrated data, work through these steps before sending customers to your new Joomla + J2Commerce site:

1. **Set up payment plugins.** Your WooCommerce payment gateways do not carry over — install and configure the equivalent J2Commerce payment plugins (PayPal, Stripe, and others are available from the J2Commerce Extensions Store).

2. **Review shipping methods.** The migration brings over your shipping zones and methods as a starting point. Go to **J2Commerce -> Shipping** to review each method and confirm the rates and rules are correct.

3. **Install any app plugins you need.** If you used WooCommerce extensions for subscriptions, product reviews, or other features, find the J2Commerce equivalents in the Extensions Store and install them.

4. **Set up URL redirects.** WooCommerce uses URLs like `/product/my-product/` and `/shop/`. J2Commerce uses different URL structures. Set up 301 redirects from your old WordPress URLs to the new J2Commerce URLs so existing links and bookmarks keep working. Your hosting provider or a Joomla redirect plugin can help with this.

5. **Tell customers about passwords.** Migrated users can log in with their existing password — the adapter handles the password conversion automatically on first login. You do not need to send a password-reset email to all customers, but it is good practice to send a welcome email letting them know the site has moved.

6. **Clear caches.** Go to **Home Dashboard -> Cache -> Delete All** to clear any stale cached data before going live.

7. **Run a final test.** Place a test order on your new J2Commerce site from start to finish to confirm checkout, payment, and order confirmation emails all work correctly.

## Get Help {#get-help}

- **Documentation:** [docs.j2commerce.com](https://docs.j2commerce.com)
- **Support tickets:** [j2commerce.com/support](https://www.j2commerce.com/support)
- **Community forum:** [forum.j2commerce.com](https://forum.j2commerce.com)
- **Discord:** Join the J2Commerce community Discord server via the link on the J2Commerce website
