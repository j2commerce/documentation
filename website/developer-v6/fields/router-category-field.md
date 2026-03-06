---
title: "RouterCategoryField"
sidebar_label: "RouterCategoryField"
sidebar_position: 40
description: "Category selection field that automatically switches between single-select and multi-select modes based on the active J2Commerce SEF router type."
---

# RouterCategoryField

`RouterCategoryField` extends Joomla's `CategoryField` and automatically adjusts its `multiple` behaviour based on the J2Commerce `sef_router` component parameter:

- **`modern` router** — single category selection only (canonical URLs, Joomla 6 best practice).
- **`legacy` router** — multi-select allowed (backward-compatible with J2Store URLs that supported multiple category assignment).

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `RouterCategoryField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/RouterCategoryField.php` |
| **Extends** | `Joomla\CMS\Form\Field\CategoryField` |
| **Field type string** | `RouterCategory` |
| **Since** | 6.0.8 |

## Router Mode Detection

```php
protected function isMultipleMode(): bool
{
    $params    = ComponentHelper::getParams('com_j2commerce');
    $sefRouter = $params->get('sef_router', 'modern');

    return $sefRouter === 'legacy';
}
```

`isMultipleMode()` is called from both `__get('multiple')` and `setup()` to ensure the `multiple` attribute is correctly set before the parent `CategoryField` builds its rendered output.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="basic">
        <field
            name="catid"
            type="RouterCategory"
            label="JCATEGORY"
            extension="com_content"
            required="true"
        />
    </fieldset>
</form>
```

## XML Attributes

All attributes accepted by Joomla's `CategoryField` are supported. The `multiple` attribute is **overridden at runtime** by `isMultipleMode()` regardless of any value set in XML.

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Field name. In legacy mode, submitted as `name[]`. |
| `type` | Yes | Must be `RouterCategory`. |
| `label` | Yes | Language key for the field label. |
| `extension` | No | Component extension filter, e.g. `com_content`. Defaults to `CategoryField` default. |
| `required` | No | Marks the field as required. |
| `multiple` | Ignored | Overridden by router mode detection. |

## Behaviour by Router Mode

| `sef_router` value | `multiple` | Stored value type |
|--------------------|-----------|-------------------|
| `modern` (default) | `false` | Single integer category ID |
| `legacy` | `true` | Array of integer category IDs |

## Usage Notes

- Use `RouterCategoryField` in product edit forms when the router mode may be switched between installs. It removes the need to maintain two separate form field definitions.
- When migrating a site from `legacy` to `modern` router mode, existing multi-value category assignments (arrays) are read back as single values because the field coerces `multiple = false` — the first array element wins. Ensure data migration strips extra categories before switching modes in production.
- For the advanced use case where you need the modal category picker with create/edit buttons, use `RouterModalCategoryField` instead.

## Related

- [RouterModalCategoryField](./router-modal-category-field.md) — Delegates to modal_category (modern) or multi-select list (legacy)
- [RoutertypeField](./routertype-field.md) — Hidden field exposing the active router type for `showon` conditions
