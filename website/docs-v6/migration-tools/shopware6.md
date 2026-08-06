---
title: "Shopware 6"
sidebar_label: "Shopware 6"
sidebar_position: 7
description: "Migrate your Shopware 6.4 store into Joomla 6 and J2Commerce 6 using the Shopware 6 adapter for J2Commerce Migrator."
---

# Shopware 6

The Shopware 6 adapter connects the [J2Commerce Migrator](./com_j2commercemigrator.md) to your existing Shopware 6.4 store so you can bring your languages, tax setup, catalog, media, customers, and orders into Joomla 6 and J2Commerce 6. The adapter reads directly from your Shopware store's database, transforms every record into the J2Commerce format, and writes it into the correct J2Commerce tables — your original Shopware data is never touched.

## Requirements {#requirements}

- PHP 8.3 or later
- Joomla! 6.x
- J2Commerce 6.x installed and enabled
- **J2Commerce Migrator component installed** — the adapter cannot work without it
- An existing **Shopware 6.4** store whose MySQL/MariaDB database is reachable from your Joomla server (directly, or through an SSH tunnel), with a database user that can read from it
- **de-DE and en-GB Joomla content languages** installed and published, with the **System - Language Filter** plugin enabled and **Item Associations** turned on

:::info

This adapter is built specifically for German-language Shopware stores with an English translation (de-DE is the source's default language, en-GB is the secondary language). If your Shopware store uses different languages, the built-in **Language Setup Check** tool will flag it before you can proceed.

:::

:::tip

You do not need to take your Shopware store offline before migrating. The adapter only reads from your Shopware database — it never writes to it — so your live store can keep taking orders while you migrate to a Joomla staging site.

:::

## Purchase and Download {#purchase-and-download}

The **Shopware 6** adapter is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**.

**Step 2:** Locate **J2Commerce Migrator — Shopware 6 Adapter** **->** click **View Details -> Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the adapter. Click **Available Versions -> View Files -> Download Now**.

## Install the Plugin {#install-the-plugin}

**Step 1:** Confirm **com_j2commerce** and the **J2Commerce Migrator** component are already installed and enabled. The Shopware 6 plugin requires both and will not install without them.

**Step 2:** In the Joomla admin, go to **System -> Install -> Extensions**.

**Step 3:** Upload the `plg_j2commercemigrator_shopware6_*.zip` file, or use the Install from URL option.

Joomla installs the **Shopware 6** adapter plugin.

## Enable the Plugin {#enable-the-plugin}

The Shopware 6 adapter is a **J2Commerce Migrator**-type plugin, not an App — it does not appear under **J2Commerce -> Apps**. You enable it from the standard Joomla Plugin Manager instead.

**Step 1:** Go to **System -> Manage -> Plugins**.

**Step 2:** In **Filter Options -> Select Type**, choose **j2commercemigrator**.

**Step 3:** Locate **Shopware 6** in the list and click the status toggle to enable it.

:::info

Only one J2Commerce Migrator adapter should be enabled at a time. If you have another source adapter (WooCommerce, VirtueMart 3, J2Store 4, and so on) enabled, disable it first — the Migrator Dashboard only displays the most recently enabled source.

:::

Once enabled, a **Shopware 6** card appears on the J2Commerce Migrator Dashboard.

## Configure {#configure}

The plugin has two settings. Click the plugin's title from **System -> Manage -> Plugins** to open them.

### Shop Base URL

The public URL of your Shopware store (for example, `https://www.example.com`), entered without a trailing slash. The adapter uses this to build the download links for your product and category images.

This field is not a login credential. In most cases you do not need to fill it in yourself — the adapter prefills it automatically from your store's sales channel domain the first time you connect. Only edit it if it is wrong, or if your images fail to download during the **Fetch Media** step.

### Tier Price Policy

Controls what happens to a Shopware quantity-tier price whose pricing rule cannot be reduced to a single customer group.

| Option | Value | What it does |
|--------|-------|--------------|
| **Skip — import only rule-free tiers, report the rest** (default) | `skip_unscoped` | The safe choice for any B2B store — it never risks showing a wholesale price to a retail visitor. Ambiguous tiers are left out and listed in the reconciliation report. |
| **Import Ignoring Scope — apply every tier broadly** | `import_unscoped` | Imports every tier price regardless of which customer group it was meant for. This is a pricing decision — the store owner should sign off on it before it is enabled. |

## Running the Migration {#running-the-migration}

**Step 1:** From the J2Commerce Migrator Dashboard, find the **Shopware 6** card and click **Start Migration**.

**Step 2:** On the **Connect** step, choose your connection mode and enter your Shopware database details:

- **Mode B — Remote database:** Your Shopware database is on a different MySQL/MariaDB server. Provide the host, port, database name, username, password, and table prefix (Shopware installs typically use no prefix, so this can usually be left blank).
- **Mode C — SSH Tunnel:** Used when your Shopware server cannot be reached directly. Requires a pre-configured SSH tunnel and must be turned on in the Migrator's own **Options** first.

:::info

There is no Mode A (same server) for this adapter — Shopware always runs as a separate store, so a database connection is always required.

:::

If your database server requires SSL, turn on the SSL option and provide the CA certificate path.

**Step 3:** Once connected, you land on the Tools screen with **Section A — Connection Check**. Click **Probe Source** to confirm the adapter can read your Shopware product table.

**Step 4:** Run **Language Setup Check**. This verifies your Joomla site has published de-DE and en-GB content languages with Language Filter associations enabled. If anything is missing, click **Install Source Languages** to have the adapter download and publish the missing language packs for you.

**Step 5:** Resolve the four mapping tiles, also in Section A:

- **Order Status Mapping** — match every combination of Shopware order, payment, and delivery state that actually appears on your orders to one of the 9 J2Commerce order statuses.
- **Shipping Method Mapping** — match every shipping method used on your orders to an existing J2Commerce shipping method, or choose to create one from the Shopware source.
- **Payment Method Mapping** — match every payment method used on your orders to an installed, enabled J2Commerce payment plugin. PayPal, Rechnung (invoice), Nachnahme (cash on delivery), and Vorkasse (advance payment) pre-fill automatically when the matching plugin is installed.
- **Tier Price Rule Mapping** — assign every Shopware pricing rule used by a tier price to a migrated customer group, **All customers (no group)**, or **Do not import**.

:::info

These four mapping tiles gate everything else. Every other section is locked until all four show as resolved (Section A itself and the **Reports & Tools** section are the only exceptions). If you have not migrated customer groups yet, Tier Price Rule Mapping only offers **All customers** and **Do not import** — that is expected. Migrate customer groups in Section C, then reopen this tile to assign real groups before running the Products section.

:::

**Step 6:** With the mapping tiles resolved, work through the remaining sections top to bottom. They are grouped into four lanes:

- **Lookups** (Sections B-F) — Languages & Geography, Tax/Custom Fields/Customer Groups, Options & Manufacturers, Shipping & Payment Methods, Promotions & Order Statuses.
- **Catalogue** (Sections G, H, J, K) — Categories & Tags, Products, Media, SEO & Redirects.
- **Customers & Orders** (Sections L, M) — Customers, Orders.
- **Tools** (Section N) — Reports & Tools.

**Step 7:** Each tile behaves the same way as the rest of the J2Commerce Migrator — see [Tile Status Pills](./com_j2commercemigrator.md#tile-status) and [Per-Tile Action Buttons](./com_j2commercemigrator.md#tile-buttons) in the main Migrator guide for what **Sync**, **Re-sync**, **Retry**, and **Resume** do, and what each status pill color means.

**Step 8:** Watch progress from the Tools screen footer (tiles synced / rows migrated / errors / elapsed time), and from the **Shopware 6** card on the Dashboard, which also tracks how many customers are still on a legacy password hash.

**Step 9:** Click **Export Log** at any time to download a text summary of every section, tile, and row count for the current session. Run the **Reconciliation Report** tile in Section N once you are done — it runs count and sum checks across everything migrated and produces a client-facing data report.

## What Gets Migrated {#what-gets-migrated}

| Shopware 6 | J2Commerce 6 |
|---|---|
| Sales channel languages and locales | Joomla content languages (mapped) |
| `country`, `country_state`, `currency` | J2Commerce countries, zones (states/provinces), and currency — matched against the pre-seeded rows, never duplicated |
| `tax`, `tax_rule` | Tax profiles, tax rates, and geozones |
| `custom_field`, `custom_field_set` | Custom field definitions (field values are migrated later, in Third-Party Product Content) |
| `customer_group` | A Joomla user group per group, nested under Registered |
| `property_group`, `property_group_option` | Options and option values (used as both filters and variant axes) |
| `product_manufacturer` | Manufacturer / brand records |
| `shipping_method`, `shipping_method_price` | Shipping methods and their simple (non rule-scoped) rate rows |
| `payment_method` | Validated against your installed, enabled J2Commerce payment plugins (no new rows are created) |
| `promotion`, `promotion_discount` | Coupons — automatic promotions with no code get a synthetic code |
| Order / payment / delivery states | Matched to the 9 J2Commerce order statuses |
| `category` (tree) | Joomla categories, in both languages |
| Categories with at least one product | Language-neutral tags (Tag Mirror) |
| `product`, `product_translation`, variants | J2Commerce products and variants, for every configured language |
| `product_category`, `tag`, `product_tag` | Each product's primary category and its tag map |
| de-DE / en-GB article and category pairs | Joomla language associations (for the language switcher) |
| Quantity-based tier prices | Product price tiers on each product's master variant |
| `product_cross_selling` | Cross-sells, resolved within the same language |
| EnnoTabs, Acris customer-group visibility, and other third-party product content | Appended to the product record where a matching J2Commerce field exists |
| `media`, `product_media`, `media_translation` | Downloaded images and PDFs, linked to products in gallery order |
| Live Shopware SEO URLs | Joomla article and category aliases |
| Old SEO URLs that changed | Exported as a CSV redirect map (not written into Joomla — you apply these at your webserver) |
| `customer`, `customer_address` | Joomla users, with billing and shipping addresses |
| `order`, `order_customer`, `order_address`, `order_delivery`, `order_transaction` | J2Commerce orders, billing/shipping snapshots, and transactions written as completed history (no capture is re-attempted) |
| `order_line_item` (product rows) | Order line items |
| `order_line_item` (promotion rows) | Order discounts |
| `state_machine_history` | Order status change history |
| `newsletter_recipient` | Not migrated into J2Commerce (there is no newsletter table) — downloadable as a CSV instead |

## How It Works {#how-it-works}

1. You click **Sync** (or **Run All**) on a tile, and the adapter opens a read-only connection to your Shopware database.
2. It reads a batch of rows and transforms each one into the matching J2Commerce format — Shopware's per-language translation tables are resolved into the language you are currently migrating.
3. Each transformed row is written into the correct `#__j2commerce_*` table (or, for content, into Joomla articles and categories).
4. After every successful write, an identity map record links the original Shopware row to its new J2Commerce row. This is what makes re-running a tile safe — the next run skips rows it has already migrated instead of duplicating them.
5. Products migrate once per configured language. A configurator-based product with no real Shopware variant rows has its variants generated automatically from its configurator options.
6. The process repeats in batches until the source table is exhausted, and the tile's status pill turns **Synced**.

:::info

Generated variants (step 5) each carry the parent product's full stock figure rather than a split — summing the stock across a product's variants after migration will read higher than the true total. Run **Repair Shipping & Default Variant** in Section N, or adjust stock per variant manually, once you have confirmed the real split.

:::

## Tips {#tips}

- Resolve all four mapping tiles in Section A first — nothing else can run until you do.
- Run **Language Setup Check** before anything else. It is far easier to install a missing content language up front than to discover it mid-catalog migration.
- If your host blocks direct external MySQL connections, ask your Migrator administrator to enable **SSH Tunnel Mode (Mode C)** in the component's Options before you start.
- Leave **Tier Price Policy** on **Skip** unless a store owner has explicitly approved importing ambiguous tier prices broadly — the wrong choice can expose a wholesale price to a retail customer.
- Back up first. Run an Akeeba Backup (or equivalent) before your first migration, matching the recommendation in the main [J2Commerce Migrator guide](./com_j2commercemigrator.md#tips).
- Export the log after finishing the **Products** and **Orders** sections so you have a record to compare against later.
- Keep the plugin enabled after migration. The dashboard card's legacy-hash counter tells you when it is finally safe to disable or uninstall it — see [Troubleshooting](#customers-cant-log-in) below.

## Troubleshooting {#troubleshooting}

### Probe Source fails: "Could not read the product table on the Shopware source" {#probe-fails}

**Cause:** The adapter could not connect to, or read from, your Shopware database.

**Solution:**

1. Double-check the host, port, database name, username, password, and table prefix on the Connect step.
2. Confirm your hosting provider allows remote MySQL connections and, if needed, add your Joomla server's IP address to the allow list.
3. If a direct connection is not possible, switch to **Mode C — SSH Tunnel** (must be enabled in the Migrator's Options first).
4. If you enabled SSL, confirm the CA certificate path is correct.

### Language Setup Check keeps blocking Section A {#language-setup-blocks}

**Cause:** de-DE and/or en-GB are not installed and published as Joomla content languages, or the System - Language Filter plugin is disabled or missing Item Associations.

**Solution:**

1. Go to **System -> Manage -> Languages -> Content Languages** and confirm both **de-DE** and **en-GB** exist and are published.
2. Go to **System -> Manage -> Plugins**, enable **System - Language Filter**, open it, and turn on **Item Associations**.
3. Alternatively, click **Install Source Languages** on the Tools screen to let the adapter install and publish any missing language pack for you. If it reports the per-request install limit was reached, just run the tool again to continue.

### Every tile except the four mapping tiles is locked {#mapping-tiles-block}

**Cause:** Order Status Mapping, Shipping Method Mapping, Payment Method Mapping, or Tier Price Rule Mapping still has an unresolved row.

**Solution:**

1. Open each mapping tile in Section A and check for any row still marked **Unresolved**.
2. Choose a J2Commerce equivalent for every row, or **Create from Shopware source** / **Do not import** where offered, then click **Save Mapping**.
3. For Tier Price Rule Mapping specifically, it is fine to leave rules on **All customers** or **Do not import** before customer groups have migrated — reopen the tile after Section C to assign real groups.

### Product images never download, or product pages show broken images {#images-missing}

**Cause:** The **Shop Base URL** setting is blank or points to an unreachable store, or the **Fetch Media** tile has not been run.

**Solution:**

1. Open the plugin's settings and confirm **Shop Base URL** is the correct public URL of your live Shopware store, with no trailing slash.
2. Confirm the store is actually online and reachable from your Joomla server.
3. In Section J (Media), re-run **Fetch Media** followed by **Link Product Images**.

### Customers can't log in after migration {#customers-cant-log-in}

**Cause:** A migrated customer's password is still stored as their original Shopware/legacy hash, pending automatic conversion on their first login.

**Solution:**

1. This is expected and self-resolving — the customer's password is verified and silently upgraded the moment they log in successfully.
2. Do not disable or uninstall this plugin while the **Shopware 6** dashboard card still shows a legacy-hash count above zero — those customers cannot log in without it.
3. If a specific customer genuinely cannot log in, have them use Joomla's standard **Forgot Password** link to set a new password.

### Re-running a tile does not behave the way you expected {#conflict-mode-unsupported}

**Cause:** Not every Shopware 6 tile supports every Conflict Mode. When you re-run a tile with an unsupported mode, the adapter falls back to a safe behavior and records exactly what it did.

**Solution:**

1. Click **Export Log** and look for a line naming the tile and the mode it does not support.
2. The log tells you what actually happened instead — existing rows were left untouched (matching Skip), existing rows were overwritten in place, or nothing was written for that step.
3. Adjust your expectations for that tile accordingly, or use **Skip** (the safest, most broadly supported mode) if you are unsure.

### A tile stalls or times out on a large catalog {#timeouts-large-catalog}

**Cause:** A very large product catalog or order history exceeded your server's PHP execution time or memory limit mid-batch.

**Solution:**

1. Lower **Rows per batch** in the Migration Wizard toolbar — see [Toolbar Controls](./com_j2commercemigrator.md#toolbar-controls) in the main Migrator guide.
2. Increase `max_execution_time` and `memory_limit` in your PHP configuration if you can.
3. Reload the page and click **Resume** rather than starting the tile over — the adapter picks up from the last completed batch, so nothing is duplicated.

### Product variant stock totals look too high {#variant-stock-high}

**Cause:** A known limitation, not an error — when the adapter generates variants for a configurator-based product that never had real Shopware variant rows, each generated variant carries the parent's **full** stock figure rather than a split.

**Solution:**

1. This is expected behavior, described in [How It Works](#how-it-works) above.
2. Run **Repair Shipping & Default Variant** in Section N to make sure every variant is marked shippable and every variable product has one default variant.
3. Manually adjust each variant's stock figure in J2Commerce if you need a true split rather than the full parent count on every variant.

### Newsletter export fails: "Could not create/write the newsletter export file" {#newsletter-export-fails}

**Cause:** A filesystem permission problem prevented the CSV from being written.

**Solution:**

1. Check that Joomla's temp/export directories are writable by the web server user.
2. Retry the **Export Newsletter List** tile in Section N.
3. Remember the resulting CSV contains personal data (subscriber emails and names) protected under GDPR — store and delete it securely once you no longer need it.
