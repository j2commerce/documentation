---
title: "Migrating from rocsvi to EDI Import"
sidebar_label: "Migrate from rocsvi"
sidebar_position: 10
description: "Step-by-step guide to migrating your rocsvi (com_csvi) import templates to the J2Commerce EDI Import app, including field mapping, entity detection, and post-migration verification."
---

# Migrating from rocsvi to EDI Import

The J2Commerce EDI Import app includes a built-in migration tool that reads your existing rocsvi (com_csvi) import templates and creates equivalent EDI import templates automatically. The migration covers order status updates, order shipment tracking, and product stock updates — the core import operations supported by the EDI Import app.

:::info Add-on extension
The EDI Import feature (`plg_j2commerce_app_edi`) is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.
:::

---

## What Gets Migrated

The migration tool reads **import templates only** — rocsvi rows where `action = 'import'`. Export templates are ignored entirely.

For each import template, the tool migrates:

- Template title, alias, description, enabled state, and ordering
- FTP connection settings (host, port, user, path, file pattern, post-import action)
- CSV format settings (delimiter, enclosure, escape character, header row flag)
- All enabled template fields, including lookup key flags and date format transformers

**Not migrated:**

- Export templates (`action = 'export'`)
- Product create/update operations (outside EDI Import scope)
- Content (com_content) import templates
- Raw SQL rule expressions from `csvi_rules` / `csvi_templatefields_rules` (no equivalent)

---

## Prerequisites

Before running the migration:

1. **rocsvi must be installed** — the `#__csvi_templates` and `#__csvi_templatefields` database tables must exist.
2. **rocsvi import templates must be present** — the migration skips everything if the tables are empty or absent.
3. **EDI Import app must be installed and enabled** — the `#__j2commerce_appedi_importtemplate` table must exist.
4. **You have not already run the migration** — running it twice creates duplicate templates. Check the Import Templates list before proceeding.

:::warning Idempotency — run once only
The migration tool does not check for duplicates. Running it a second time inserts all templates again, creating duplicates. If you need to re-run, delete the previously migrated templates first from **J2Commerce** → **Apps** → **EDI Orders** → **Import Templates**.
:::

---

## Migration Methods

Two methods are available. Both produce the same result — choose whichever suits your workflow.

### Method 1 — Admin UI Button (Recommended)

1. Log in to the Joomla administrator.
2. Go to **J2Commerce** → **Apps** → **EDI Orders**.
3. Click **Import Templates** in the left navigation.
4. Click the **Migrate from rocsvi** button in the toolbar (next to the **New** button).
5. Wait for the AJAX request to complete (the button shows `…` while running).
6. A results dialog appears showing:
   - How many templates were migrated successfully
   - A list of templates that need manual review, with the reason for each flag
7. Click the close button (×) to dismiss the dialog. The template list reloads automatically.

<!-- SCREENSHOT: Import Templates list view showing the "Migrate from rocsvi" button in the toolbar -->

### Method 2 — CLI Script

Use this method for large sites, automated deployments, or when you need a persistent log of the migration output.

Run from your **Joomla root directory**:

```bash
php plugins/j2commerce/app_edi/cli/migrate-from-rocsvi.php
```

The script outputs a formatted worklist to stdout:

```
=== MIGRATION COMPLETE ===

MIGRATED OK (7 templates):
  - Order Update - Import → import_template_id=12 (3 fields migrated, 0 skipped)
  - Inventory Update Import → import_template_id=13 (2 fields migrated, 0 skipped)
  ...

NEEDS MANUAL REVIEW (2):
  - Custom Template → source uses SFTP (not supported by app_edi FTP layer)
  - Unknown Import → operation=custom with unrecognized fields [field_a, field_b]

Summary: 7/9 templates migrated (78%). 2 review items.
```

Redirect to a file to preserve the output:

```bash
php plugins/j2commerce/app_edi/cli/migrate-from-rocsvi.php > migration-results.txt 2>&1
```

:::note CLI must run from Joomla root
The script uses `dirname(__DIR__, 4)` to locate `includes/defines.php`. It must be invoked from a directory where `plugins/j2commerce/app_edi/cli/migrate-from-rocsvi.php` is a valid relative path — i.e., the Joomla root. If rocsvi tables are absent, the script exits cleanly with a message on stderr and exit code 0.
:::

---

## Entity Mapping

The migration tool determines the EDI Import `import_entity` value by inspecting the rocsvi template's `settings.operation` field and (for `custom` operations) scanning the template's field names.

| rocsvi `operation` | rocsvi `override` / field scan | EDI `import_entity` | Confidence |
|---|---|---|---|
| `order` | — | `order_status` | High |
| `order` | `orderstatus` | `order_status` | High |
| `variant` | — | `product_stock` | High |
| `custom` | fields contain `ordershipping_tracking_id` or `tracking*` | `order_shipment` | High |
| `custom` | fields contain `quantity` or `variant_id` | `product_stock` | High |
| `custom` | fields contain `order_state_id` | `order_status` | High |
| `custom` | unrecognized fields | **Flagged for review** | — |
| `product`, `productimage`, `content`, etc. | — | **Not migrated** | — |

---

## Field Mapping

Each enabled rocsvi template field (`enabled = 1`) is migrated to an EDI Import template field row. Disabled fields are skipped.

| rocsvi column | EDI Import column | Notes |
|---|---|---|
| `field_name` | `csv_column_name` | Used as the CSV header name when `column_header` is empty |
| `column_header` | `csv_column_name` | When non-empty, overrides `field_name` as the CSV column name |
| `field_name` | `target_column` | Always used as the database column to write |
| `table_name` | `target_table` | When null in rocsvi, the tool infers the table from the field name (see below) |
| `default_value` | `default_value` | Direct copy |
| `field_date_format` | `php_file` + `target_type` | Mapped to a date transformer file (see below) |
| `sort` | `is_lookup_key` | `sort = 1` → `is_lookup_key = 1` (this field identifies the target record) |
| `ordering` | `ordering` | Direct copy |

### Target Table Inference

When rocsvi leaves `table_name` null, the tool infers it from the field name:

| Field name pattern | Inferred `target_table` |
|---|---|
| `order_state_id`, `order_id`, `user_email`, `order_params`, `order_number` | `#__j2commerce_orders` |
| `ordershipping_*`, `*tracking*` | `#__j2commerce_ordershippings` |
| `quantity`, `variant_id` | `#__j2commerce_productquantities` |
| `price`, `sku`, `price_*` | `#__j2commerce_variants` |
| Everything else | Falls back to the entity-level default, or `null` (requires manual selection) |

### Date Format Mapping

rocsvi's `field_date_format` column is mapped to an EDI transformer file:

| rocsvi `field_date_format` | EDI `php_file` | EDI `target_type` |
|---|---|---|
| `%m/%d/%Y` or `m/d/Y` | `date_parse_us.php` | `php_transformer` |
| `%d/%m/%Y` or `d/m/Y` | `date_parse_eu.php` | `php_transformer` |
| `%Y-%m-%d`, `Y-m-d`, or empty (on date fields) | `date_parse_iso.php` | `php_transformer` |
| Empty (on non-date fields) | — | `db_column` |

---

## Flagged Items — What Needs Manual Review

The migration flags templates that cannot be fully auto-converted. Flagged templates are still created (when entity detection succeeds), but they require manual adjustment before use.

### SFTP Source

**Reason:** rocsvi's `sftp = 1` setting enables SFTP (SSH file transfer). The EDI Import app's FTP layer uses FTP/FTPS, not SFTP.

**Action:** The migrated template is set to `source_type = manual`. Reconfigure the FTP settings to use an FTPS-capable FTP server, or use manual file upload mode.

### Auto-Detect Delimiters with No Delimiter Set

**Reason:** rocsvi can sniff the CSV delimiter at runtime. EDI Import requires an explicit delimiter.

**Action:** The migrated template defaults to a comma delimiter (`,`). Open the template and verify this matches your actual CSV files.

### Out-of-Scope Operations

rocsvi templates using `operation = product`, `productimage`, `productfilter`, `content`, or similar operations are **not migrated**. These operations create or update Joomla articles and product records — functionality outside the EDI Import app's scope (which handles bulk *updates* to existing orders and stock, not product creation).

**Action:** These templates are listed in the "NEEDS MANUAL REVIEW" section of the CLI output and in the review dialog. No action is required in EDI Import — continue using rocsvi for these operations, or manage them through Joomla's native content import tools.

### Unrecognized Custom Operations

rocsvi `operation = custom` templates are resolved by scanning field names. If no recognizable field names are found, the entity cannot be determined.

**Action:** After migration, open the flagged template, set the correct **Import entity** (order status, order shipment, or product stock), and verify the field mapping.

---

## Post-Migration Checklist

After running the migration, complete these steps before enabling any automated imports:

1. **Verify CSV column names match your files.**
   Open each migrated template and compare the **CSV Column Name** values against the actual column headers in your production CSV files. rocsvi's `field_name` is used as a fallback; your files may use different headers.

2. **Confirm the lookup key field.**
   Each template must have exactly one field with **Lookup Key** enabled. This field identifies the target record (e.g., `order_id` for order updates, `variant_id` for stock updates). Verify it is set correctly.

3. **Reconfigure SFTP templates.**
   For any template flagged with the SFTP warning, either switch to FTP/FTPS or set the source type to **Manual** and upload files through the admin UI.

4. **Set the trigger mode.**
   All migrated templates default to `trigger_mode = manual`. If you want automatic FTP polling, open the template and set the trigger mode to **Scheduled** or **Both**.

5. **Run a dry-run test.**
   For each template, click **Run Import** and select a sample file. Before enabling scheduled mode, run at least one dry-run to confirm rows are parsed and mapped correctly.

6. **Review flagged templates.**
   For any template listed in the needs-review section, open it, correct the issue (entity selection, delimiter, field mapping), and run a dry-run.

7. **Retain rocsvi for 30 days.**
   Keep rocsvi installed and your original templates active in parallel while you verify the EDI Import templates in production. Once satisfied, uninstall rocsvi from **System** → **Manage** → **Extensions**.

---

## Troubleshooting

### "rocsvi tables not found" error

**Cause:** The `#__csvi_templates` table does not exist in the database. rocsvi (com_csvi) is not installed, or uses a different database prefix than your Joomla installation.

**Solution:** Install rocsvi and ensure it shares the same database as J2Commerce. The migration tool detects the prefix dynamically — no configuration needed.

### Migration runs but creates 0 templates

**Cause:** All rocsvi templates have `action = 'export'`, or all import templates use out-of-scope operations (product, content).

**Solution:** Check rocsvi's template list and confirm at least one template has **Action = Import** and uses a supported operation (order, variant, or custom with recognizable fields).

### Templates are duplicated after running migration twice

**Cause:** The migration tool does not check for existing templates. Running it twice inserts all templates a second time.

**Solution:** Go to **Import Templates**, select the duplicate rows, and delete them. Consider renaming your original templates before re-running if you need to start fresh.

### A template was migrated but all fields show "—" for the target table

**Cause:** The field names in the rocsvi template did not match any known pattern, so `target_table` was left null.

**Solution:** Open the template's field list and manually set the **Target Table** for each field. Use the column picker to select the correct target column.

---

## Related Topics

- [EDI Import — Overview and Setup](../app-edi-import.md)
- [Import Templates — Field Mapping Reference](../app-edi-import.md#field-mapping)
