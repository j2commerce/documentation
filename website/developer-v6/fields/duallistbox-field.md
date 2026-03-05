---
title: "DuallistboxField"
sidebar_label: "DuallistboxField"
sidebar_position: 30
description: "Multi-select dual listbox field with search, add-all, and remove-all controls backed by the vanilla JavaScript DualListbox library."
---

# DuallistboxField

`DuallistboxField` renders a two-panel listbox widget that lets users move items between an "Available" list and a "Selected" list. It extends Joomla's `ListField` and supports all standard `<option>` child elements for populating choices. The widget is driven by the vanilla JavaScript `DualListbox` library bundled with J2Commerce.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `DuallistboxField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/DuallistboxField.php` |
| **Extends** | `Joomla\CMS\Form\Field\ListField` |
| **Field type string** | `Duallistbox` |
| **Since** | 6.0.7 |

## Assets Loaded

| Asset | Type | Path |
|-------|------|------|
| `dual-listbox-script` | JavaScript | `media/com_j2commerce/js/administrator/dual-listbox.js` |
| `dual-listbox-style` | CSS | `media/com_j2commerce/css/administrator/dual-listbox.css` |

Both are registered and loaded via the Web Asset Manager with the script deferred.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="basic">
        <field
            name="selected_zones"
            type="Duallistbox"
            label="COM_J2COMMERCE_FIELD_ZONES"
            description="COM_J2COMMERCE_FIELD_ZONES_DESC"
            multiple="true"
            size="10"
        >
            <option value="1">Zone Alpha</option>
            <option value="2">Zone Beta</option>
            <option value="3">Zone Gamma</option>
        </field>
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `name` | Yes | — | Field name. Posted as `name[]` (array). |
| `type` | Yes | — | Must be `Duallistbox`. |
| `label` | Yes | — | Language key for the field label. |
| `description` | No | — | Language key for the field tooltip. |
| `class` | No | `form-select` | CSS class applied to the underlying `<select>` element. |
| `size` | No | `10` | Number of visible rows in each listbox panel. |
| `disabled` | No | `false` | Set to `true` to disable the widget. |
| `readonly` | No | `false` | Set to `true` to render the widget as read-only. |
| `required` | No | `false` | Set to `true` to require at least one selection. |

Child `<option>` elements follow standard Joomla `ListField` conventions.

## Value Storage and Processing

Selected values are submitted as a PHP array (`name[]`). The field accepts stored values in three formats and normalises them internally:

- PHP array — used as-is after filtering empty entries.
- Comma-separated string — split on `,` and trimmed.
- Empty value — returns an empty array.

When binding saved form data back to the widget, the stored values are passed to the `DualListbox` JavaScript instance via a JSON-encoded array so previously selected items appear in the right panel.

## Widget Configuration

The JavaScript widget is initialised with the following fixed options:

| Option | Value |
|--------|-------|
| `showAddAllButton` | `true` |
| `showRemoveAllButton` | `true` |
| `showSearchFilter` | `true` |
| `moveOnSelect` | `false` |
| `sortable` | `false` |

Labels (`availableTitle`, `selectedTitle`, `searchPlaceholder`, and button texts) are sourced from `COM_J2COMMERCE_DUALLISTBOX_*` language strings and injected into the init script.

## Subclassing

`DuallistboxField` is designed to be extended. `CategoryDuallistboxField` overrides `getOptions()` to populate the list from the database rather than inline `<option>` elements. Override `getOptions()` in a subclass to source options from any data source:

```php
// File: administrator/components/com_j2commerce/src/Field/MyCustomDuallistboxField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\HTML\HTMLHelper;

class MyCustomDuallistboxField extends DuallistboxField
{
    protected $type = 'MyCustomDuallistbox';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        // Add dynamic options
        $options[] = HTMLHelper::_('select.option', 'foo', 'Foo Item');
        $options[] = HTMLHelper::_('select.option', 'bar', 'Bar Item');

        return $options;
    }
}
```

## Related

- [CategoryDuallistboxField](./category-duallistbox-field.md) — Duallistbox pre-populated with Joomla article categories
