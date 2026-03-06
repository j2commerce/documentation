---
title: "TaxRateField Field Type"
sidebar_label: "TaxRateField"
sidebar_position: 9
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce tax rates for direct rate assignment."
---

# TaxRateField Field Type

`TaxRateField` extends Joomla's `ListField` to render a `<select>` populated with every enabled tax rate from `#__j2commerce_taxrates`. Tax rates define the percentage or fixed amount applied to products within a tax profile/geo-zone rule. The stored value is the integer primary key `j2commerce_taxrate_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `TaxRateField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/TaxRateField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `TaxRate` |
| Since | 6.0.7 |

## Database Query

```sql
SELECT j2commerce_taxrate_id AS value, taxrate_name AS text
FROM #__j2commerce_taxrates
WHERE enabled = 1
ORDER BY taxrate_name ASC
```

The stored value is `j2commerce_taxrate_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="taxrate_id"
    type="TaxRate"
    label="COM_MYPLUGIN_FIELD_TAXRATE_LABEL"
    description="COM_MYPLUGIN_FIELD_TAXRATE_DESC"
/>
```

### With Placeholder

```xml
<field
    name="taxrate_id"
    type="TaxRate"
    label="COM_MYPLUGIN_FIELD_TAXRATE_LABEL">
    <option value="">COM_MYPLUGIN_SELECT_TAX_RATE</option>
</field>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | integer | Default selected tax rate ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="taxrate_id"
            type="TaxRate"
            label="COM_MYPLUGIN_FIELD_TAXRATE_LABEL"
            description="COM_MYPLUGIN_FIELD_TAXRATE_DESC">
            <option value="0">COM_MYPLUGIN_NO_TAX_RATE</option>
        </field>

    </fieldset>

</form>
```

### In a Plugin Manifest `<config>` Block

```xml
<config>
    <fields name="params" addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
        <fieldset name="basic">
            <field
                name="taxrate_id"
                type="TaxRate"
                label="COM_MYPLUGIN_TAXRATE_LABEL"
            />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/TaxRateField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\Database\DatabaseInterface;

class TaxRateField extends ListField
{
    protected $type = 'TaxRate';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('j2commerce_taxrate_id', 'value'),
                $db->quoteName('taxrate_name', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_taxrates'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('taxrate_name') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $rate) {
            $options[] = HTMLHelper::_('select.option', $rate->value, $rate->text);
        }

        return $options;
    }
}
```

## Notes

- `TaxRateField` silently swallows database exceptions — if the query fails, the field renders with only the static child `<option>` elements (if any) and no error message is shown. This distinguishes it from most other J2Commerce entity fields which enqueue an error message.
- Tax rates are managed under **J2Commerce** -> **Configuration** -> **Tax Rates**.
- For most product forms, `TaxProfileField` is preferred over `TaxRateField`, because profiles encapsulate geo-zone-based rate selection. Use `TaxRateField` when you need to assign a single specific rate directly (e.g., within a tax rule record).

## Related

- [TaxProfileField](./taxprofile-field.md) — Tax profile dropdown (higher-level grouping)
- [GeoZoneField](./geozone-field.md) — Geo-zone dropdown used alongside tax rates
