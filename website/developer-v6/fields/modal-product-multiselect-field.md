---
title: "Modal\\ProductMultiSelectField Form Field"
sidebar_label: "Modal\\ProductMultiSelect Field"
sidebar_position: 25
description: "Developer reference for the Modal\\ProductMultiselect custom form field — a modal multi-product picker that stores selected IDs and renders a live product table."
---

# Modal\\ProductMultiSelect Form Field

`Modal\ProductMultiSelectField` extends the J2Commerce `ModalMultiSelectField` base class to provide a multi-product picker. The field opens the `products` view in `layout=modal_multiselect` mode so the user can select multiple products in one session. Selected products are displayed in a sortable table below the button and stored as an array of hidden inputs.

## Key Classes

| Class | File | Purpose |
|-------|------|---------|
| `ProductMultiSelectField` | `administrator/components/com_j2commerce/src/Field/Modal/ProductMultiSelectField.php` | Modal URL, product table rendering, JS wiring |
| `ModalMultiSelectField` | `libraries/j2commerce/src/Field/ModalMultiSelectField.php` | Base class — JS handler, `initItemMultiField`, remove/clear callbacks |
| `modal-multiselect-field.min.js` | `media/lib_j2commerce/modal-multiselect-field.min.js` | Vanilla JS — `window.initItemMultiField` |

## Architecture

```mermaid
graph TD
    A[ProductMultiSelectField::setup] --> B[Builds URL: products view, layout=modal_multiselect]
    A --> C[Passes function=jSelectItemMultiCallback_{id}]
    B --> D[Modal opens products list in iframe]
    D --> E[User selects products and clicks Confirm]
    E --> F[JS callback updates hidden inputs + product table]
    F --> G[getInput renders PHP-side table on first load]
    G --> H[loadJavaScript registers initItemMultiField]
    H --> I[customUpdateTable overrides default table renderer]
```

## Modal URL

```
/administrator/index.php
  ?option=com_j2commerce
  &view=products
  &layout=modal_multiselect
  &tmpl=component
  &function=jSelectItemMultiCallback_{field_id}
  &{csrf_token}=1
  [&forcedLanguage={language}]
```

## Value Format

Input arrives as a comma-separated string or an array of integers. `setup()` normalises both forms into `array<int>` before calling `parent::setup()`:

```php
// Comma-separated string → array
'12,45,89' → [12, 45, 89]

// Single value → array
'12' → [12]
```

Hidden inputs are rendered one per product:

```html
<input type="hidden" name="jform[request][product_ids][0]" value="12" id="field_hidden_0" data-title="Product A">
<input type="hidden" name="jform[request][product_ids][1]" value="45" id="field_hidden_1" data-title="Product B">
```

## Product Table

After the modal button, the field renders a Bootstrap 5 table showing selected products:

```html
<div id="{field_id}_table">
    <div class="my-2"><strong>Selected Products (2):</strong></div>
    <table class="table table-sm table-striped">
        <thead>
            <tr>
                <th class="w-10">ID</th>
                <th>Name</th>
                <th class="text-end w-6"><button ...><!-- clear all --></button></th>
                <th class="w-1"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="fw-bold">12</td>
                <td>Product A</td>
                <td class="text-end"><button ...><!-- remove --></button></td>
                <td><input type="hidden" ...></td>
            </tr>
        </tbody>
    </table>
</div>
```

When no products are selected, a `COM_J2COMMERCE_NO_PRODUCTS_SELECTED` message is shown instead.

## Title Resolution

`getValueTitles()` loads titles for all selected IDs in a single query:

```sql
SELECT p.j2commerce_product_id, c.title
FROM #__j2commerce_products AS p
INNER JOIN #__content AS c ON p.product_source_id = c.id
WHERE p.j2commerce_product_id IN (12, 45, 89)
```

Results are indexed by `j2commerce_product_id` for O(1) lookup when building the table rows.

## JavaScript

`loadJavaScript()` registers the shared `lib_j2commerce.modal-multiselect-field` module script (loaded once via WAM deduplication) and passes language strings to JS via `Text::script()`:

| Language constant | JS key |
|-------------------|--------|
| `COM_J2COMMERCE_SELECTED_PRODUCTS` | `COM_J2COMMERCE_SELECTED_PRODUCTS` |
| `COM_J2COMMERCE_PRODUCT_FIELD_ID` | `COM_J2COMMERCE_PRODUCT_FIELD_ID` |
| `COM_J2COMMERCE_PRODUCT_FIELD_NAME` | `COM_J2COMMERCE_PRODUCT_FIELD_NAME` |
| `COM_J2COMMERCE_PRODUCTS_CLEAR_ALL` | `COM_J2COMMERCE_PRODUCTS_CLEAR_ALL` |
| `COM_J2COMMERCE_PRODUCT_CLEAR` | `COM_J2COMMERCE_PRODUCT_CLEAR` |

An inline script calls `window.initItemMultiField('`<strong style={{color: '#6f42c1'}}>field_id</strong>`')` on `DOMContentLoaded` and assigns `handler.customUpdateTable` to the product-specific table renderer.

## XML Usage

```xml
<!-- File: administrator/components/com_j2commerce/forms/coupon.xml (example) -->

<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field\Modal">
    <fieldset name="products">
        <field
            name="applicable_products"
            type="Modal_ProductMultiselect"
            label="COM_J2COMMERCE_FIELD_APPLICABLE_PRODUCTS_LABEL"
            description="COM_J2COMMERCE_FIELD_APPLICABLE_PRODUCTS_DESC"
        />
    </fieldset>
</form>
```

### XML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | — | Must be `Modal_ProductMultiselect` |
| `language` | string | — | Force a content language in the modal |
| `propagate` | bool | `false` | Enable propagate action for multilingual setups |
| `required` | bool | `false` | Mark field as required |

## Namespace Registration

The `Modal` subdirectory requires the full namespace path:

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field\Modal">
```

Or per-field:

```xml
<field
    name="product_ids"
    type="Modal_ProductMultiselect"
    addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field\Modal"
    label="..."
/>
```

## Usage in Plugin Forms

```xml
<!-- File: plugins/j2commerce/app_yourplugin/config.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<config>
    <fields name="params">
        <fieldset name="basic" label="COM_PLUGINS_BASIC_FIELDSET_LABEL">
            <field
                name="excluded_products"
                type="Modal_ProductMultiselect"
                addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field\Modal"
                label="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_EXCLUDED_PRODUCTS_LABEL"
                description="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_EXCLUDED_PRODUCTS_DESC"
            />
        </fieldset>
    </fields>
</config>
```

Reading values in the plugin:

```php
// File: plugins/j2commerce/app_yourplugin/src/Extension/AppYourPlugin.php

// Params stores comma-separated IDs as a string
$raw        = $this->params->get('excluded_products', '');
$productIds = array_filter(array_map('intval', explode(',', (string) $raw)));
```

## Related

- [Modal\\Product Field](./modal-product-field.md) — Single-product picker variant
- [Products View](../features/products/index.md) — The list view that powers the modal
