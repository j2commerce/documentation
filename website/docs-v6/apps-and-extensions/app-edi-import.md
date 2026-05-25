---
title: "EDI Import"
sidebar_label: "EDI Import"
sidebar_position: 2
description: "Bulk-update order statuses, shipment tracking, product stock, and product prices in J2Commerce by uploading a CSV or TSV file — or by automating polling from an FTP server."
---

# EDI Import

The EDI Import feature lets you bulk-update J2Commerce data by uploading a CSV or TSV file, or by connecting an FTP server for automatic polling. Each import run is controlled by a reusable **import template** that maps your file's columns to J2Commerce fields, applies optional data transformers, and writes results safely through J2Commerce's own service layer (no raw SQL overwriting your data).

This feature is part of the **EDI app**, a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

## Supported Import Types

| Entity | What it updates |
|--------|----------------|
| `order_status` | Bulk-update order state (uses `OrderModel::updateOrderStatus` — fires all downstream events) |
| `order_shipment` | Write tracking records to `#__j2commerce_ordershippings` and advance order status |
| `product_stock` | Update quantity on hand per SKU via `#__j2commerce_productquantities` |
| `product_price` | Update base price per SKU, or tiered pricing rows |

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_edi.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_edi.zip` package file.
4. Go to **J2Commerce** -> **Apps** and enable the **EDI** app.

Once enabled, the **J2Commerce** -> **Apps** -> **EDI** dashboard shows a summary card for import templates and recent import logs.

---

## Creating an Import Template

Import templates store all the configuration for a single type of import: where the file comes from, how the columns map, and what happens on success or failure. You can have as many templates as you need.

### Step 1: Open the Template Editor

1. Go to **J2Commerce** -> **Apps** -> **EDI**.
2. Click the **Import Templates** tile or the **Import Templates** button.
3. Click **New** in the toolbar.

The editor opens on a 6-step stepper.

<!-- SCREENSHOT: Import template stepper — Step 1 General tab showing Title, Import Entity, and Enabled fields -->

### Step 2: General Settings (Step 1 of 6)

| Field | Description |
|-------|-------------|
| **Title** | Display name shown in the template list and in import log entries. |
| **Alias** | Auto-generated URL-safe identifier. Used as part of the quarantine filename. |
| **Description** | Internal notes. Not shown to customers. |
| **Import Entity** | What this template imports: `order_status`, `order_shipment`, `product_stock`, or `product_price`. |
| **Enabled** | Toggle the template on or off. Disabled templates are skipped by the scheduler. |
| **Trigger Mode** | `manual` (admin upload only), `scheduled` (FTP poller only), or `both`. |
| **Verbose Logging** | Write a per-row entry to the import log for every row processed (not just failures). Useful for auditing but increases log volume. |
| **Allow Partial** | When enabled (default), the import continues on per-row errors. Disable to abort the entire run on the first failure. |
| **Dry-Run Default** | Pre-tick the dry-run option when running manually, so operators must opt in to live writes. |

Click **Next** to continue to Source / FTP.

### Step 3: Source / FTP Configuration (Step 2 of 6)

<!-- SCREENSHOT: Source step showing source_type radio toggled to "FTP" with FTP fields visible -->

#### Manual Upload Only

Set **Source Type** to `manual`. No FTP fields are needed.

#### FTP Polling

Set **Source Type** to `ftp`.

| Field | Description |
|-------|-------------|
| **FTP Host** | Hostname or IP of your FTP server. |
| **FTP Port** | Default: 21. |
| **FTP Username** / **Password** | Credentials for authentication. |
| **Remote Path** | Directory on the server to poll, e.g. `/exports/orders/`. |
| **Passive Mode** | Enable passive mode (recommended for most firewalls). |
| **Use FTPS** | Enable implicit FTPS (`ftp_ssl_connect`). SFTP is not supported in V1. |
| **File Pattern** | Glob pattern to match filenames, e.g. `orders_*.csv`. Non-matching files in the directory are logged as skipped. |
| **Post-Import Action** | `delete` removes the file from the FTP server after a successful import. `keep` retains it. |
| **Quarantine Days** | When **keep** is selected, how many days to retain the local quarantine copy before automatic cleanup. Default: 30. |

#### CSV Format

| Field | Description |
|-------|-------------|
| **Delimiter** | Field separator character. Default: `,`. Use `\t` for tab-separated files. |
| **Enclosure** | Quote character. Default: `"`. |
| **Escape** | Escape character. Default: `\`. |
| **Has Header Row** | When enabled (default), the first row is treated as column names and used for mapping. |
| **File Encoding** | Source file character encoding. Default: `UTF-8`. |

#### Notification Settings

| Field | Description |
|-------|-------------|
| **Notify on Failure** | Send an email to the store admin when a run completes with `failed` or `partial` status. |
| **Failure Recipient** | Override the recipient email. Leave blank to use the store admin email. |
| **Show in Dashboard** | Count this template's recent failures in the EDI dashboard tile. |

Click **Next** to continue to Column Mapping.

### Step 4: Column Mapping (Step 3 of 6)

<!-- SCREENSHOT: Column Mapping step showing a populated mapping table with CSV column headers in the left column and Target Column dropdowns in the right -->

The mapping table has one row per CSV column you want to import. Each row defines:

| Column | Description |
|--------|-------------|
| **CSV Column** | The column header name from your file (when **Has Header Row** is on), or a 0-based numeric index. |
| **Target Table** | The J2Commerce database table to write to. The dropdown shows only tables allowed for your **Import Entity**. |
| **Target Column** | The column on the target table. Protected columns are excluded from the dropdown. |
| **Type** | How the value is applied: `db_column` (direct write), `php_transformer` (run through a transformer), `static_constant` (ignore CSV value, always write a fixed value), `skip` (ignore this column), or `lookup_key` (identifies the target row — not written). |
| **Transformer** | When **Type** is `php_transformer`, select the transformer file. See [Transformers](#transformers) below. |
| **Default** | Fallback value when the CSV cell is empty. |
| **Required** | When checked, an empty cell aborts the row and logs a `validation_failed` error. |
| **Lookup Key** | Marks this column as the row identifier (e.g. `order_id` varchar key). Must be set to at least one column per template so the engine can find the target row. |

#### Mapping Tips

- Every template needs at least one column marked **Lookup Key** so the engine can identify which row to update. For order imports, map your CSV's order number column to `order_id` on `#__j2commerce_orders` and mark it as **Lookup Key**.
- You do not need to map every column in your file. Unmapped columns are ignored.
- The mapping is saved automatically via AJAX as you edit each row — you do not need to click Save to preserve your mapping work.

Click **Next** to continue to Transformers.

### Step 5: Transformers (Step 4 of 6)

Transformers are PHP scripts that normalize raw CSV values before they are written to the database. They are selected per field in the mapping table.

#### Built-in Transformers

| Transformer | What it does |
|-------------|-------------|
| `date_parse_us.php` | Parses `m/d/Y` or `m/d/Y H:i:s` format → MySQL DATETIME |
| `date_parse_eu.php` | Parses `d/m/Y` or `d/m/Y H:i:s` format → MySQL DATETIME |
| `date_parse_iso.php` | Validates and passes through ISO 8601 / MySQL DATETIME |
| `trim_lowercase.php` | Strips leading/trailing whitespace and lowercases the value |
| `phone_digits_only.php` | Strips all non-numeric characters |
| `state_to_two_digit.php` | Converts a US/CA/AU state name or abbreviation to two-letter code |
| `country_to_two_digit.php` | Converts country name or ISO-3 code to ISO-2 code |
| `lookup_status_id_by_name.php` | Converts order state name to `order_state_id` integer |
| `lookup_user_id_by_email.php` | Converts email address to Joomla user ID (0 for no match) |
| `lookup_product_id_by_sku.php` | Converts SKU to `j2commerce_product_id` |

#### Custom Transformers

Place your own `.php` files in `plugins/j2commerce/app_edi/import_overrides/`. Each file must return a closure with this signature:

```php
<?php
declare(strict_types=1);

return static function (mixed $rawValue, array $rowContext, array $templateContext): mixed {
    // Return null to use the field's default_value (or skip if required)
    // Throw \RuntimeException to mark the row as failed
    return $normalized;
};
```

- `$rawValue` — original CSV cell value
- `$rowContext` — all mapped values for the current row processed so far
- `$templateContext` — template config, database handle, current log ID

Transformer files are not user-uploadable. They must be deployed with the plugin.

Click **Next** to continue to Preview.

### Step 6: Dry-Run Preview (Step 5 of 6)

<!-- SCREENSHOT: Preview step showing a dry-run report table with Outcome badges (planned/failed/skipped) and the "Planned writes" column showing before→after values -->

Upload a sample file to see exactly what the engine would do — without writing any data.

1. Click **Choose File** and select a sample CSV.
2. The engine processes up to 50 rows (configurable) in dry-run mode.
3. The report table shows:

| Column | Description |
|--------|-------------|
| **Row** | Row number in the file (1-based) |
| **Preview** | First 3 columns of the raw CSV row |
| **Outcome** | `planned` (would succeed), `failed`, or `skipped` |
| **Planned writes** | For each mapped column: `current value → new value` |
| **Warnings** | Non-fatal issues (e.g. empty default used, transformer returned null) |

Click any row to see the full raw CSV data and the complete planned-writes JSON.

This step does not write to any J2Commerce table. It is safe to run against a production site.

Click **Next** to continue to Save.

### Step 7: Save (Step 6 of 6)

Review your configuration summary and click **Save** in the toolbar to persist the template. You can return to edit any step at any time.

---

## Running an Import Manually

1. Go to **J2Commerce** -> **Apps** -> **EDI** -> **Import Templates**.
2. Find the template you want to run and click the **Run Import** button.
3. A file picker opens. Select your CSV or TSV file.
4. The engine uploads the file, moves it to the managed quarantine directory, and processes it synchronously.
5. A result modal appears when the run completes, showing:
   - Total rows in the file
   - Rows imported, skipped, and failed
   - A link to the full import log for per-row detail

<!-- SCREENSHOT: Import Templates list view showing the Run Import button on a template row, and the result modal open after a completed run -->

### File Requirements

- Accepted formats: `.csv`, `.tsv`, `.txt`
- Maximum file size: 50 MB (configurable in plugin params)
- Encoding: must match the **File Encoding** setting in the template (default UTF-8)

---

## Scheduled FTP Imports

To automate imports from an FTP server:

1. Create an import template with **Source Type** set to `ftp` and configure the FTP connection details.
2. Set **Trigger Mode** to `scheduled` or `both`.
3. Install the companion task plugin: **EDI Import Task** (`plg_task_j2commerce_ediimport`), available from the J2Commerce Extensions Store.
4. Go to **System** -> **Manage Scheduled Tasks** -> **New**.
5. Select **EDI Import** as the task type.
6. Configure the task:
   - Select which templates to run (or enable "All eligible templates")
   - Set the schedule (e.g. every 15 minutes)
7. Save the task.

When the task fires, the plugin:

1. Connects to each template's FTP server
2. Lists files matching the template's **File Pattern**
3. Skips files already processed within the last 7 days
4. Downloads matching files to the managed quarantine directory
5. Runs the import engine on each file
6. Deletes the file from FTP on success (when **Post-Import Action** is `delete`)
7. Retains the quarantine copy for the configured number of days

### FTP Lifecycle

| Condition | Outcome |
|-----------|---------|
| File matches pattern, not yet processed | Downloaded and imported |
| File matches pattern, already processed | Logged as `skipped` with reason `already_processed` |
| File does not match pattern | Logged as `skipped` with reason `no_match` |
| Import fails | FTP file retained. Quarantine copy kept. Run marked `failed`. |
| FTP delete fails after successful import | Warning logged. Run remains `complete`. |

---

## Import Logs

Every import run — manual or scheduled — writes a log entry. View logs by clicking **Import Logs** in the EDI dashboard or selecting the Import Logs stat tile.

<!-- SCREENSHOT: Import Logs list view showing the filter bar (Template dropdown, Status dropdown) and the log table with Status badges -->

### Log List View

Filter logs by template and status. The table shows:

| Column | Description |
|--------|-------------|
| **Template** | Which import template was used |
| **Source** | `manual`, `ftp`, `scheduled`, or `queue` |
| **Source File** | Original filename |
| **Status** | `complete`, `failed`, `partial`, `running`, or `skipped` |
| **Total / Imported / Failed** | Row counts |
| **Started** | When the run began |

Click **View** on any log row to open the detail view.

### Log Detail View

<!-- SCREENSHOT: Import Log Detail view showing the summary alert (status, totals, started time) and the per-row table with Outcome badges -->

The detail view shows a per-row breakdown when **Verbose Logging** is enabled for the template, or whenever a row failed.

| Column | Description |
|--------|-------------|
| **Row** | Row number in the source file |
| **Outcome** | `imported`, `skipped`, `failed`, or `planned` (dry-run) |
| **Skip Reason** | Why the row was not imported (see [Skip Reasons](#skip-reasons) below) |
| **Target ID** | The primary key of the J2Commerce record that was (or would be) updated |
| **Message** | Error text, transformer output, or planned-write summary |

### Skip Reasons

| Reason | Meaning |
|--------|---------|
| `no_match` | Lookup key value not found in J2Commerce (e.g. order number doesn't exist) |
| `already_processed` | FTP file was already imported in a previous run within the dedup window |
| `validation_failed` | A required field was empty, or a value failed type validation |
| `parse_error` | Could not parse the CSV row (malformed quoting, encoding issue) |
| `transformer_error` | A transformer threw a `RuntimeException` |
| `protected_column` | A mapped field targets a protected column — the row is rejected |
| `none` | Row was not skipped |

---

## Order Status Imports

When **Import Entity** is `order_status`, the engine routes every row through `OrderModel::updateOrderStatus()` rather than issuing a raw SQL UPDATE.

**Why this matters:** Raw UPDATEs on `#__j2commerce_orders` overwrite `order_date`, `created_on`, and `created_by` if those columns are not explicitly excluded. `OrderModel::updateOrderStatus()` only modifies `order_state_id`, `order_state`, `modified_on`, and `modified_by` — audit and date fields are never touched.

Additionally, using the model method:

- Fires the `onJ2CommerceOrderStatusChange` event, so downstream plugins (customer emails, ERP sync, audit logs) all run as normal
- Writes an entry to the order history timeline

**Required mapping for order status imports:**

| CSV Column | Target | Type |
|------------|--------|------|
| Your order number column | `#__j2commerce_orders` → `order_id` | Lookup Key |
| Your status name/code column | `#__j2commerce_orders` → `order_state_id` | `php_transformer` with `lookup_status_id_by_name.php` (or `db_column` if your file already has the numeric ID) |

---

## Order Shipment Imports

**Import Entity** `order_shipment` writes a new row to `#__j2commerce_ordershippings` and then advances the order status.

| CSV Column | Target table → column | Notes |
|------------|-----------------------|-------|
| Order number | `#__j2commerce_orders` → `order_id` | Lookup Key |
| Carrier name | `#__j2commerce_ordershippings` → `ordershipping_name` | |
| Tracking number / URL | `#__j2commerce_ordershippings` → `ordershipping_tracking_id` | Free-text field; combine carrier + URL here if needed |

One new `ordershippings` row is inserted per import row (multi-shipment friendly). The order is then advanced to the status configured in the template's **Target Shipped Status** field.

---

## Product Stock Imports

**Import Entity** `product_stock` updates `#__j2commerce_productquantities.quantity` per SKU.

**Required mapping:**

| CSV Column | Target | Type |
|------------|--------|------|
| SKU | — | `php_transformer` with `lookup_product_id_by_sku.php`, marked as Lookup Key |
| Quantity | `#__j2commerce_productquantities` → `quantity` | `db_column` |

The engine resolves SKU → `variant_id` → `j2commerce_productquantity_id` internally. You do not need to know the numeric IDs.

---

## Product Price Imports

**Import Entity** `product_price` updates the base price per SKU on `#__j2commerce_variants.price`.

**Required mapping:**

| CSV Column | Target | Type |
|------------|--------|------|
| SKU | `#__j2commerce_variants` → `sku` | Lookup Key |
| Price | `#__j2commerce_variants` → `price` | `db_column` |

The engine validates that the new price is a valid positive decimal. Zero-price rows generate a validation warning; the template's **Allow Partial** setting determines whether the run continues.

---

## Protected Columns

The import engine refuses to write to certain columns regardless of your mapping configuration.

**Globally protected (all entities):**

- `created_on`
- `created_by`
- The primary key column of any target table

**Per-table protected:**

| Table | Protected columns |
|-------|------------------|
| `#__j2commerce_orders` | `order_date`, `user_id`, `order_id` (lookup-only) |
| `#__j2commerce_ordershippings` | `order_id` (lookup-only) |
| `#__j2commerce_productquantities` | `variant_id` (lookup-only) |
| `#__j2commerce_variants` | `product_id`, `is_master`, `sku` (lookup-only) |

If a protected column appears in your mapping, the template editor rejects it when you save the field row. If it somehow reaches the engine at run time, the row is logged as `failed` with reason `protected_column`.

---

## Troubleshooting

### All rows show `no_match`

**Cause:** The lookup key column in your CSV does not match the value stored in J2Commerce.

**Solutions:**

1. Check that your CSV uses the same order number format as J2Commerce (e.g. `J2C-000123` not `123`).
2. Open a single order in J2Commerce and compare the `order_id` field (varchar) with your file.
3. Verify the mapping has the correct column marked as **Lookup Key**.

### Import completes but status does not change

**Cause:** The mapped status value could not be resolved to an `order_state_id`.

**Solutions:**

1. Use the `lookup_status_id_by_name.php` transformer and check that the status names in your CSV match exactly the names in **J2Commerce** -> **Sales** -> **Order Statuses**.
2. Alternatively, map directly to a numeric `order_state_id` value (use `db_column` type, no transformer needed).

### `validation_failed` on a row you expect to succeed

**Cause:** A field marked **Required** received an empty or null value from the CSV.

**Solutions:**

1. Set a **Default** value on the field row so empty cells fall back gracefully.
2. Uncheck **Required** if the field is optional for your workflow.
3. Enable **Verbose Logging** on the template, re-run, and check the log detail for the exact field name.

### `transformer_error` on rows with valid data

**Cause:** A transformer threw a `RuntimeException`, usually due to unexpected input format.

**Solutions:**

1. Check the transformer's expected input format (e.g. `date_parse_us.php` expects `m/d/Y`, not `Y-m-d`).
2. Run a dry-run first to see the raw cell values and the transformer error message.
3. Use `date_parse_iso.php` for ISO 8601 dates.

### `protected_column` errors on every row

**Cause:** A field in your mapping targets a column the engine refuses to write.

**Solution:** Review the [Protected Columns](#protected-columns) table above. Remove the field row from your mapping, or change it to **Type: skip**.

### FTP import runs but no files are downloaded

**Cause:** Either the FTP connection is failing silently, or no files match the **File Pattern**.

**Solutions:**

1. Open the template editor and use the **Test FTP Connection** button (Source / FTP step) to verify credentials.
2. Check the **File Pattern** setting — `*.csv` matches only lowercase `.csv`. Use `*.[Cc][Ss][Vv]` for case-insensitive matching if your server uses mixed case.
3. Check the import log for `skipped` / `no_match` entries that list the actual filenames found on the server.

---

## Related Topics

- [EDI Export](./app-edi-export.md)
- [Order Statuses](../sales/order-statuses.md)
- [Scheduled Tasks](../setup/scheduled-tasks.md)
