# J2Commerce Migrator

The J2Commerce Migrator is a dedicated migration tool that moves your existing J2Store v4 store data — products, orders, customers, and configuration — into J2Commerce 6. It walks you through each stage of the migration as a guided wizard, so nothing is left to chance.

## Requirements {#requirements}

- PHP 8.3 or later
- Joomla! 6.0 or later
- J2Commerce 6 installed and enabled (the Migrator will not install without it)
- J2Store v4 data accessible from this server (same database server, remote MySQL, or SSH tunnel)

:::tip

Before you start, install [Akeeba Backup](https://www.akeeba.com/) and take a full site backup. The Migrator can trigger an Akeeba backup automatically before each run when you configure it in **Options**. Your J2Store source data is never modified, but a backup gives you a safe rollback point for J2Commerce.

:::

## Purchase and Download

The **J2Commerce Migrator** is available from the J2Commerce extension directory and is not part of core Joomla.

‌**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **J2Commerce Migrator** **->** click **View Details -> Add to cart -> Checkout**.&#x20;

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download**&#x20;

## Install the Migrator&#x20;

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `pkg_j2commercemigrator_*.zip` file or use the Install from URL option.

![](/img/install.webp)

Joomla installs the Migrator component and the J2Store 4 source connector together. You will see a success message when the installation is complete.

:::info

The installer runs a preflight check and will refuse to install if J2Commerce is not already present and enabled on this site. Install J2Commerce first, then return here to install the Migrator.

:::

## Open the Migrator {#open-the-migrator}

There are two ways to reach the Migrator after installation.

**Option A:** Click the **J2Commerce Migrator** item in the Joomla left sidebar under **Components**.

**Option B:** If you have enabled the J2Commerce menu shortcut in **Options**, look for the migration icon in the J2Commerce admin toolbar at the top of the screen.

Either path takes you to the **Dashboard**, which is the Migrator's home screen.

![](/img/migrator.webp)

## Configure the Migrator {#configure-the-migrator}

The Migrator has four sections, accessible from the top navigation bar: **Dashboard**, **Runs**, **Tools**, and **Templates**. Before starting a migration you should review the component options.

Go to **J2Commerce Migrator -> Options** (toolbar button in the top right) to open the configuration panel.

![](/img/migrator2.webp)

### Options General tab{#options}

![](/img/migrator3.webp)

**Default Batch Size:** Number of database rows processed per batch. Lower values use less memory on shared hosting.

**Default Conflict Mode:** What to do when a row already exists in the J2Commerce database. See conflict modes below. Control what happens when a record with the same ID already exists in the J2Commerce database:

- **Skip:** Keep the existing J2Commerce row untouched.

- **Overwrite:** Replace the J2Commerce row with the source data.

- **Merge:** Copy source values into any empty fields on the J2Commerce row.

- **Report only:** Do not write anything — just report what would change.

**Enable Migration Log:** Write detailed activity to `administrator/logs/com_j2commercemigrator.log`.

**Enable SSH Tunnel Mode:** Show the Mode C (SSH tunnel) connection option in the wizard. Disabled by default to keep the connection step simple.

**Add to J2Commerce Menu:** Show a Migrator shortcut in the J2Commerce admin navigation bar.

**Trigger Akeeba Backup:** Automatically trigger a fresh Akeeba backup before any data is migrated. Only visible when Akeeba Backup is installed.

**Akeeba Backup Profile:** Which Akeeba profile to use for the pre-migration backup.

**Conflict modes** control what happens when a record with the same ID already exists in the J2Commerce database:

### Dashboard {#dashboard}

![](/img/migrator23.webp)

The Dashboard is the first screen you see after opening the Migrator. It shows four status cards:

- **Migrator Version** — whether your installed Migrator is up to date.
- **J2Commerce Version** — whether J2Commerce itself is up to date.
- **Akeeba Backup** — whether Akeeba is configured for pre-migration backups.
- **J2Store Detected** — whether J2Store v4 tables are found in the database.  If this section doesn't appear, it's because you don't have J2Store v4 installed

Below the cards, the **Migration Adapters** section lists every source connector plugin that is installed. Currently, one adapter ships with the Migrator: **J2Store 4**. Click **Start Migration** on the J2Store 4 card to launch the Migration Wizard.

### Runs {#runs}

The **Runs** screen shows a full history of every migration run you have executed. Each row displays the adapter used, the run status (completed, running, failed, cancelled), conflict mode, number of rows migrated, skipped, and errored, plus start and finish timestamps.

Click the magnifying glass icon on any row to open a detailed view of that run, including a per-tier breakdown and a complete activity log. You can export the log or delete individual history entries from this screen.

### Tools {#tools}

![](/img/migrator16.webp)

**Tools** provide targeted re-sync operations that you can run after an initial migration — for example, to pull in new orders that arrived while you were testing, without re-running a full migration.

:::info

Tools require an active source database connection. If you have not yet completed at least one migration wizard run, go to the Dashboard and start a migration first. The wizard saves the connection for subsequent use.

:::

The available tools are:

**Sync Customer Data**: Syncs customer addresses, vouchers, coupons, and vendor records. In Mode B or Mode C (separate database server), this also syncs Joomla user accounts from the source site.

![](/img/migrator7.webp)

**Sync Order Data**: Syncs orders, order items, order histories, fees, and tax records. Customer data must be synced first; the button is disabled until that prerequisite is met.

![](/img/migrator8.webp)

**Sync Product Data**: Syncs catalog structure, products, variants, pricing, and product images.

![](/img/migrator9.webp)

**Rebuild Product Images**: Regenerates thumbnails and WebP versions for all migrated product images. Safe to run multiple times.

![](/img/migrator13.webp)

**Template Migration**: Migrates J2Store template overrides to J2Commerce layout format. Opens the Templates screen described below.

The **Templates** screen identifies J2Store template overrides and subtemplates in your Joomla installation that need to be converted to J2Commerce's layout format. For each file found, you can choose **Migrate** (automatic conversion) or **Skip**.

Files that cannot be migrated automatically are listed under **Manual Migration Required** with a text field where you can provide your own key mappings using the `old-key=new-key` format.

![](/img/migrator11.webp)

**Reset J2Commerce Data** — Deletes all migrated data from J2Commerce tables so you can start fresh. Your J2Store source tables are not affected. Use this when you want to re-run the full migration from scratch.

**Uninstall J2Store v4** — Removes the com\_j2store component and all associated J2Store files from this Joomla installation. The J2Store database tables are not deleted by this step. If you uninstall J2Store before migration is complete, the Migrator will warn you about tables that have not been fully migrated.

![](/img/migrator12.webp)

## How It Works {#how-it-works}

Click **Migration Wizard** at the top of the **Tools** section, or click on the **Migration title.**

![](/img/migrator14.webp)

&#x20;When you work through the wizard, here is what happens at each stage:

![](/img/migrator15.webp)

1. **Connect** — You choose how the Migrator reaches your J2Store database. Mode A uses the same server (no extra credentials needed). Mode B connects to a separate MySQL/MariaDB server. Mode C connects via a pre-configured SSH tunnel.

2. **Discover** — The Migrator scans your source database and counts rows in every table it knows how to migrate. This gives you a preview of how much data will be transferred.

3. **Preflight** — Compatibility checks run automatically: PHP extensions, table structure, required records. Any blocked checks prevent the migration from continuing until resolved. Warnings let you proceed with caution.

4. **Plan** — You review the full migration plan: total rows, estimated time, and your chosen conflict mode. A backup reminder is shown here. Click **Start Migration** to proceed.

5. **Run** — The Migrator reads each source table in batches, maps field names and values to J2Commerce's schema, and writes the records into J2Commerce tables. An activity log updates in real time. Do not close the browser window during this step.

6. **Verify** — Source and target row counts are compared for every table. Financial totals (order values) are cross-checked. Any mismatches appear here so you can decide whether to investigate or re-run.

7. **Finalize** — Summary statistics are shown (rows migrated, skipped, errored). The Migrator also offers to copy your J2Store configuration settings into J2Commerce, copy product images from the source server (Mode B), and migrate Joomla core data such as users and categories if the source is on a separate site.

:::tip

J2Commerce 6 can only be installed on Joomla 6, so you need to update your J2Store to version 4.1.x on a Joomla 6 site to use Method A in the migration plugin; otherwise, you would need to use Method B if you want to migrate your J2Store site from a different website on the same server.

:::

![](/img/migrator19.webp)

## Tips {#tips}

- **Back up before every run.** Enable Akeeba Backup in the Migrator options so a backup is triggered automatically.

- **Use Report-only mode first.** Set the **Conflict Mode** to *Report only* on your first run. No data is written — you just see what would happen. Switch to *Skip* or *Overwrite* when you are ready to commit.

- **Start with a small batch size on shared hosting.** If you see timeout errors during the Run step, go to **Options** and lower **Default Batch Size** to 50–100.

- **Run Tools incrementally.** After your initial migration, use **Sync Order Data** and **Sync Customer Data** in Tools to catch any records created in J2Store while you were setting up J2Commerce, instead of re-running the full wizard.

- **Do not uninstall J2Store until you are satisfied.** The Migrator will warn you if tables have not been fully migrated before you attempt to uninstall J2Store.

- **Clear caches after migration.** Go to **Home Dashboard -> Cache -> Delete All** once migration and verification are complete.

## Troubleshooting {#troubleshooting}

### The Migrator refuses to install {#install-failure}

**Cause:** J2Commerce is not installed or is disabled on this site.

**Solution:**

1. Go to **System -> Manage -> Extensions** and search for **J2Commerce**.
2. Verify J2Commerce appears in the list and is enabled (green checkmark).
3. If it is not installed, install J2Commerce first, then re-run the Migrator installer.

### "No migration adapters are installed" on the Dashboard {#no-adapters}

**Cause:** The J2Store 4 adapter plugin was not installed or is disabled.

**Solution:**

1. Go to **System -> Manage -> Plugins**.
2. Search for **J2Store4** in the filter bar.
3. If it appears but is disabled, click the red X to enable it.
4. If it does not appear at all, reinstall the `pkg_j2commercemigrator_*.zip` package.

### Migration wizard shows "Adapter not found" error {#adapter-not-found}

**Cause:** The URL is pointing to an adapter key that does not match any installed or enabled adapter plugin.

**Solution:**

1. Return to the Dashboard using the **Dashboard** button.
2. Confirm the J2Store 4 adapter card shows the **Enabled** badge.
3. If it shows **Disabled**, click **Enable** on the card before clicking **Start Migration**.

### The Run step keeps timing out {#timeout-during-run}

**Cause:** Batch size is too large for your server's PHP execution time limit.

**Solution:**

1. Go to **J2Commerce Migrator -> Options**.
2. Lower **Default Batch Size** to 50 and save.
3. In the wizard, return to the **Preflight** step and check that the new batch size shows in the Migration Settings panel.
4. Proceed through to **Run** again.

### Row counts do not match after Verify {#row-count-mismatch}

**Cause:** Some records may have been skipped due to duplicate unique keys, missing required fields, or conflict mode set to *Skip*.

**Solution:**

1. Open the Run detail from **Runs** and review the **Activity Log** and **Errors** section.
2. Look for specific table names and error messages.
3. If the mismatch is acceptable (e.g., test orders you do not need), proceed to Finalize.
4. If data is missing, re-run with **Conflict Mode** set to *Overwrite* or *Merge* after reviewing what the impact will be.

### Tools buttons are greyed out or show "No source connection" {#tools-no-connection}

**Cause:** No active source database connection exists. The Tools panel requires a connection established during a previous wizard run.

**Solution:**

1. Return to the Dashboard and click **Start Migration** on the J2Store 4 adapter card.
2. Complete at least the **Connect** step to save the connection credentials.
3. Return to **Tools** — the sync buttons will now be enabled.
