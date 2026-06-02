---
title: "Simple CSV Import"
sidebar_label: "Simple CSV Import"
sidebar_position: 92
description: "Import and export J2Commerce products in bulk using a CSV file — create new products or update existing ones by SKU."
---

# Simple CSV Import

The Simple CSV Import app lets you manage your J2Commerce product catalog in bulk using CSV files. Export your existing products to see exactly how the data is structured, edit the file in a spreadsheet application, then import it back to create new products or update existing ones. Product records are matched by SKU — if a SKU already exists in your store, the app updates that product; if the SKU is new, it creates a fresh product, a backing Joomla article, a master variant, stock quantity, and images all in one go.

<!-- SCREENSHOT: Simple CSV Import app — main import/export page -->

## Requirements

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.1 or later

## Purchase and Download

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Visit [www.j2commerce.com](https://www.j2commerce.com) and navigate to **Apps**.
2. Find **Simple CSV Import**, click **View Details**, then **Add to Cart** and complete checkout.
3. Go to **My Downloads** under your profile menu, then click **Available Versions** -> **View Files** -> **Download Now** to save the ZIP file.

## Install the App

1. In the Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Upload the `app_simplecsv.zip` file using the upload panel, or use **Install from URL**.
3. Joomla installs and enables the plugin automatically.

<!-- SCREENSHOT: System > Install > Extensions — upload panel with app_simplecsv.zip selected -->

## Enable the App

Once installed, verify the app is enabled:

1. In the Joomla admin, go to **J2Commerce** -> **Apps**.
2. Find **Simple CSV Import** in the list. If the status icon shows red, click it to enable the app.

<!-- SCREENSHOT: J2Commerce Apps list — Simple CSV Import row with green enabled checkmark -->

## Open the App

Click the **Simple CSV Import** title in the Apps list to open the import/export interface.

<!-- SCREENSHOT: Simple CSV Import — main interface showing import settings and export button -->

## Configuration Settings

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

The following settings control how the app reads and processes your CSV file. You set these each time you run an import — there is no separate "save settings" step.

| Setting                                  | Description                                                                                                                                                  | Default       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| **Choose Import Type**                   | **Upload** to upload a CSV from your computer. **Path** to import from a file already on the server.                                                         | Upload        |
| **Upload the CSV File**                  | Visible when Import Type is **Upload**. Choose the `.csv` file from your local machine.                                                                      | —             |
| **Enter the File Path**                  | Visible when Import Type is **Path**. Enter the path to the CSV file relative to the Joomla root (e.g., `tmp/products.csv`). Do not include a leading slash. | —             |
| **Character Set**                        | The character encoding of your CSV file. Leave blank to let the app auto-detect.                                                                             | Auto-detect   |
| **Date Format**                          | The PHP date format string used for date fields in your CSV. See [PHP date formats](https://www.php.net/manual/en/datetime.format.php).                      | `Y-m-d H:i:s` |
| **Update Product if SKU Already Exists** | When **Yes**, existing products matching a CSV SKU are updated. When **No**, those rows are skipped.                                                         | No            |
| **Debug Mode**                           | Writes detailed activity to a Joomla log file (`app_simplecsv.php` in the Joomla logs directory). Turn this off in production.                               | No            |

## Step 1 — Back Up Your Site

:::warning Back up before you import
Before importing anything, create a full site backup using Akeeba Backup or another backup tool. A bulk import can create or overwrite many product records at once, and a backup is the only reliable way to undo a mistake.
:::

## Step 2 — Export Your Products First

The export feature downloads all your existing products as a CSV file. Reviewing the export before you import is the fastest way to learn the correct column names and data format.

1. Open the **Simple CSV Import** app.
2. Click **Export Products** to download `j2commerce_products_export.csv`.
3. Open the file in Excel, LibreOffice Calc, or Google Sheets.

The export covers all enabled products that are backed by Joomla articles (`com_content`). Each row includes the master variant price, dimensions, weight, stock information, images, and the article title and description fields.

<!-- SCREENSHOT: Simple CSV Import — Export Products button highlighted -->

## Step 3 — Prepare Your CSV

Use the exported file as your template for imports. Follow these rules:

- **Column headers go in the first row.** Header names must match the exported column names exactly. Matching is case-insensitive.
- **SKU is required for every row.** The app uses the `sku` value to decide whether to create a new product or update an existing one.
- **Leave `product_id` blank for new products.** When you export existing products the `product_id` column is omitted. If you are building a fresh import file, do not include this column or leave it empty — the app assigns IDs automatically.
- **Multiple additional images** go in the `additional_images` column, separated by pipe characters (`|`). For example: `images/prod1a.jpg|images/prod1b.jpg`.
- **Dates** must match the **Date Format** setting (default: `Y-m-d H:i:s`, for example `2026-01-15 00:00:00`).
- **Product options and variants are not supported.** Only simple, downloadable, and configurable parent products can be imported. Workflow data cannot be imported either.

### Supported CSV Columns

The CSV can include any combination of the following columns. Unrecognised column names are reported as errors and their data is ignored.

**Product details**

| Column            | Description                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `product_type`    | Product type: `simple`, `variable`, `configurable`, or `downloadable`. Defaults to `simple` if absent or invalid. |
| `enabled`         | `1` to publish, `0` to unpublish.                                                                                 |
| `visibility`      | `1` to show in catalog listings, `0` to hide.                                                                     |
| `taxprofile_id`   | Numeric ID of the tax profile to assign.                                                                          |
| `manufacturer_id` | Numeric ID of the manufacturer.                                                                                   |
| `vendor_id`       | Numeric ID of the vendor (multi-vendor setups).                                                                   |

**Variant and pricing fields**

| Column            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `sku`             | **Required.** Unique identifier for this product. |
| `upc`             | UPC or barcode.                                   |
| `price`           | Decimal price, e.g., `19.99`.                     |
| `weight`          | Product weight (decimal).                         |
| `weight_class_id` | Numeric ID of the weight unit.                    |
| `length`          | Length (decimal).                                 |
| `width`           | Width (decimal).                                  |
| `height`          | Height (decimal).                                 |
| `length_class_id` | Numeric ID of the length/dimension unit.          |
| `shipping`        | `1` if the product requires shipping, `0` if not. |
| `manage_stock`    | `1` to enable stock management for this product.  |
| `quantity`        | Stock quantity (integer).                         |
| `allow_backorder` | `1` to allow orders when stock is zero.           |
| `availability`    | Availability status (numeric).                    |

**Content and article fields**

| Column         | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `product_name` | Product title (maps to the backing Joomla article title).    |
| `introtext`    | Short description (article intro text).                      |
| `fulltext`     | Full description (article full text).                        |
| `catid`        | Joomla category ID for the product article. Defaults to `2`. |
| `state`        | Article published state: `1` = published, `0` = unpublished. |
| `access`       | Joomla access level ID. Defaults to `1` (Public).            |
| `language`     | Language tag, e.g., `en-GB`, or `*` for all languages.       |
| `metakey`      | Meta keywords.                                               |
| `metadesc`     | Meta description.                                            |

**Image fields**

| Column                  | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `main_image`            | Path or URL to the main product image.                |
| `main_image_alt`        | Alt text for the main image.                          |
| `thumb_image`           | Path or URL to the thumbnail image.                   |
| `thumb_image_alt`       | Alt text for the thumbnail.                           |
| `additional_images`     | Additional images separated by `\|` (pipe character). |
| `additional_images_alt` | Alt text for additional images, also pipe-separated.  |

## Step 4 — Import the CSV

### Upload from your computer

1. Under **Choose Import Type**, select **Upload**.
2. Click **Upload the CSV File** and choose your `.csv` file.
3. Set **Character Set** and **Date Format** if needed.
4. Toggle **Update Product if SKU Already Exists** to **Yes** if you want to update existing products.
5. Click **Import**.

<!-- SCREENSHOT: Simple CSV Import — Upload type selected with file chosen, Import button visible -->

### Import from a server path

Use this option when the CSV file is already on the server — for example, placed there via FTP or a scheduled script.

1. Under **Choose Import Type**, select **Path**.
2. In the **Enter the File Path** field, enter the file path relative to the Joomla root — for example, `tmp/products.csv`. Do not include a leading slash or the full server path.
3. Set **Character Set** and **Date Format** if needed.
4. Click **Import**.

<!-- SCREENSHOT: Simple CSV Import — Path type selected with server path entered -->

### Import results

After the import completes, a summary message appears:

> X products found: Y new products imported, Z updated products.

Individual row errors — such as mismatched column counts or missing SKUs — appear as notices below the summary. Review them and correct your file before re-importing if needed.

## How SKU Matching Works

The app compares each CSV row's `sku` value against the SKU column of existing product variants in the database.

| Scenario                                             | Result                                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| CSV SKU not found in database                        | New product, article, master variant, stock quantity, and images are created.    |
| CSV SKU found, **Update if SKU exists** is **Yes**   | The existing product, article, master variant, and images are updated.           |
| CSV SKU found, **Update if SKU exists** is **No**    | Row is skipped. A notice is shown.                                               |
| CSV SKU found but product type differs from database | Row is skipped. A notice is shown. Correct the product type before re-importing. |

Products are processed in batches of 50 rows at a time for memory efficiency.

## Character Set Conversion

If your CSV was created on a Windows machine or exported from a non-UTF-8 system, characters such as accented letters may appear garbled unless you select the correct encoding. Set the **Character Set** dropdown to match the file's actual encoding — `Windows-1252` is common for files from Windows Excel, `ISO-8859-1` for Western European files. The app uses `iconv` or `mb_convert_encoding` to recode each value to UTF-8 before saving.

Leave the field blank to allow the app to auto-detect the encoding. Auto-detection checks for UTF-8, ISO-8859-1, ISO-8859-2, and Windows-1252.

## What Changed from the J2Store Version

The J2Commerce 6 version of Simple CSV Import was rebuilt from the ground up as a native Joomla 6 app plugin. Key differences from the legacy J2Store add-on:

- **Native Joomla 6 architecture.** The plugin uses namespaced PHP, Joomla 6 events, and the MVC factory — no FOF 2 dependency, no deprecated Joomla APIs.
- **Secure server-path handling.** The path mode validates that the file is within the Joomla root directory and rejects path-traversal attempts before opening any file.
- **ACL-gated access.** Both the import and export actions require `core.manage` permission on `com_j2commerce`. Non-authorised users see an access-denied message and no data is processed.
- **Vanilla JavaScript.** The import form uses the standard `fetch()` API with no jQuery dependency.
- **CSRF protection on export.** The export download URL is protected by a Joomla form token validated server-side.
- **Structured import results.** Import counts and per-row error messages are returned as structured JSON and displayed inline — no page reload required.

## Tips

- **Export first, always.** The export shows the exact column names and data format required. Editing the exported file is faster and safer than building a CSV from scratch.
- **Unique SKUs are essential.** Duplicate SKUs within the same CSV cause only the last row with that SKU to take effect. Check your spreadsheet for duplicates before importing.
- **Test with a small batch first.** Import 5–10 rows to confirm your column mapping and data format are correct before running a full bulk import.
- **Leave `product_id` blank for new products.** Including a `product_id` column is useful when re-importing an export, but for fresh imports leave it empty or omit the column entirely.

## Troubleshooting

### "You need X arguments per line" error

**Cause:** One or more rows in your CSV have a different number of columns than the header row. This often happens when a field value contains an unescaped comma.

**Solution:** Open your CSV in a spreadsheet application, look for rows with misaligned columns, and ensure any values containing commas are enclosed in double-quote characters. Re-export as CSV and try again.

### Accented characters appear garbled after import

**Cause:** The CSV encoding does not match the selected **Character Set** setting, or auto-detection chose the wrong encoding.

**Solution:**

1. Open the **Simple CSV Import** app.
2. Set **Character Set** to match your file's actual encoding — for example, `Windows-1252` for files saved from Windows Excel, or `ISO-8859-1` for Western European files.
3. Re-import the file.

### Products are not updating even with "Update if SKU exists" enabled

**Cause:** The SKU in your CSV does not exactly match the SKU stored in the database. SKU matching is case-sensitive.

**Solution:** Export your current products and copy the SKU values directly from the export into your import file to ensure an exact match.

### Import button does nothing

**Cause:** No file was selected, or the selected file is not a `.csv` file.

**Solution:** Confirm you have selected a file with a `.csv` extension. Files with `.txt` or `.xlsx` extensions are rejected. Save your spreadsheet as CSV (comma-separated values) before importing.

### "No file found at the specified path" error (server path mode)

**Cause:** The file path is incorrect, the file does not exist at that location, or the path is not a `.csv` file.

**Solution:**

1. Confirm the file has been uploaded to the server via FTP or File Manager.
2. Enter the path relative to the Joomla root — do not include a leading slash. Use `tmp/products.csv`, not `/tmp/products.csv` or an absolute server path.
3. Confirm the file has a `.csv` extension.

### An unknown column name error appears in the import report

**Cause:** Your CSV header row contains a column name that the app does not recognise. The column's data is ignored for all rows.

**Solution:** Compare your column headers against the [Supported CSV Columns](#supported-csv-columns) table above. The export file always uses the correct names — use it as the reference template.

### Product type mismatch error

**Cause:** The CSV row specifies a `product_type` that differs from the type already stored in the database for that SKU. For example, trying to import a `configurable` product over an existing `simple` product.

**Solution:** You cannot change a product's type via CSV import. Either correct the `product_type` in your CSV to match the existing product, or delete the existing product manually and then re-import.

## Related Topics

- [Products](../../catalog/products.md)
- [Product Categories](../../catalog/categories.md)
