---
title: "CategoryDuallistboxField"
sidebar_label: "CategoryDuallistboxField"
sidebar_position: 31
description: "Dual listbox field pre-populated with all published Joomla article categories, rendered with hierarchical indentation."
---

# CategoryDuallistboxField

`CategoryDuallistboxField` extends `DuallistboxField` and automatically populates the Available panel with all **published** Joomla `com_content` categories. Hierarchy is expressed through em-dash indentation. Use it wherever an admin form must let the user assign multiple Joomla categories to a record.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `CategoryDuallistboxField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/CategoryDuallistboxField.php` |
| **Extends** | `Joomla\CMS\Form\Field\ListField` |
| **Field type string** | `CategoryDuallistbox` |
| **Since** | 6.0.7 |

## Assets Loaded

Same as `DuallistboxField`:

| Asset | Type | Path |
|-------|------|------|
| `dual-listbox-script` | JavaScript | `media/com_j2commerce/js/administrator/dual-listbox.js` |
| `dual-listbox-style` | CSS | `media/com_j2commerce/css/administrator/dual-listbox.css` |

## Data Source

`getOptions()` queries `#__categories` filtered to `extension = 'com_content'` and `published = 1`, ordered by `lft ASC` (nested set left position) to preserve natural hierarchy. Each category label is prefixed with `— ` repeated `(level - 1)` times.

```sql
SELECT id AS value, title AS text, level
FROM #__categories
WHERE extension = 'com_content'
  AND published = 1
ORDER BY lft ASC
```

Category IDs (integers) are used as option values. Selected values are stored and submitted as an array of category ID strings.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="basic">
        <field
            name="product_categories"
            type="CategoryDuallistbox"
            label="COM_J2COMMERCE_FIELD_CATEGORIES"
            description="COM_J2COMMERCE_FIELD_CATEGORIES_DESC"
            size="12"
        />
    </fieldset>
</form>
```

No `<option>` children are needed — the field populates itself from the database.

## XML Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `name` | Yes | — | Field name. Posted as `name[]` (array of category IDs). |
| `type` | Yes | — | Must be `CategoryDuallistbox`. |
| `label` | Yes | — | Language key for the field label. |
| `description` | No | — | Language key for the field tooltip. |
| `class` | No | `form-select` | CSS class for the underlying `<select>` element. |
| `size` | No | `10` | Visible row count per listbox panel. |
| `disabled` | No | `false` | Disables the widget when `true`. |
| `readonly` | No | `false` | Sets the widget to read-only when `true`. |
| `required` | No | `false` | Requires at least one selection when `true`. |

## Value Handling

Stored values may be:

- A PHP array of category ID strings.
- A comma-separated string of category IDs (`"3,7,12"`).

Both formats are normalised by `processValue()` before initialising the JavaScript widget.

## Error Handling

If the database query fails, the field enqueues an admin error message using `COM_J2COMMERCE_ERROR_LOADING_CATEGORIES` and returns only any options defined via XML child elements (typically none).

## Related

- [DuallistboxField](./duallistbox-field.md) — Base dual listbox field with inline options
