---
title: "VendorsField Field Type"
sidebar_label: "VendorsField"
sidebar_position: 11
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce vendors, joining the vendors and addresses tables to retrieve company names."
---

# VendorsField Field Type

`VendorsField` extends Joomla's `ListField` to render a `<select>` populated with every enabled vendor from `#__j2commerce_vendors`. Like `ManufacturersField`, vendor display names are stored in the linked `#__j2commerce_addresses` record (`company` column), so the field performs an `INNER JOIN`. The stored value is the integer primary key `j2commerce_vendor_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `VendorsField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/VendorsField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `Vendors` |
| Since | 6.0.7 |

## Database Query

```sql
SELECT v.j2commerce_vendor_id AS value, a.company AS text
FROM #__j2commerce_vendors AS v
INNER JOIN #__j2commerce_addresses AS a
    ON v.address_id = a.j2commerce_address_id
WHERE v.enabled = 1
ORDER BY a.company ASC
```

Vendors whose `company` field is empty (whitespace only) display as the `COM_J2COMMERCE_VENDOR_UNNAMED` language string. The stored value is `j2commerce_vendor_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="vendor_id"
    type="Vendors"
    label="COM_MYPLUGIN_FIELD_VENDOR_LABEL"
    description="COM_MYPLUGIN_FIELD_VENDOR_DESC"
/>
```

### With Placeholder

```xml
<field
    name="vendor_id"
    type="Vendors"
    label="COM_MYPLUGIN_FIELD_VENDOR_LABEL">
    <option value="0">COM_MYPLUGIN_ALL_VENDORS</option>
</field>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | integer | Default selected vendor ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="vendor_id"
            type="Vendors"
            label="COM_MYPLUGIN_FIELD_VENDOR_LABEL"
            description="COM_MYPLUGIN_FIELD_VENDOR_DESC"
            default="0">
            <option value="0">COM_MYPLUGIN_ALL_VENDORS</option>
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
                name="vendor_id"
                type="Vendors"
                label="COM_MYPLUGIN_VENDOR_LABEL"
            />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/VendorsField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class VendorsField extends ListField
{
    protected $type = 'Vendors';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('v.j2commerce_vendor_id', 'value'),
                $db->quoteName('a.company', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_vendors', 'v'))
            ->join(
                'INNER',
                $db->quoteName('#__j2commerce_addresses', 'a')
                    . ' ON ' . $db->quoteName('v.address_id')
                    . ' = ' . $db->quoteName('a.j2commerce_address_id')
            )
            ->where($db->quoteName('v.enabled') . ' = 1')
            ->order($db->quoteName('a.company') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $vendor) {
            $text      = trim((string) $vendor->text);
            $text      = $text ?: Text::_('COM_J2COMMERCE_VENDOR_UNNAMED');
            $options[] = HTMLHelper::_('select.option', $vendor->value, $text);
        }

        return $options;
    }
}
```

## Notes

- The display name comes from `#__j2commerce_addresses.company`. A vendor without an address record does not appear because the join is `INNER`.
- Vendors with a blank `company` field display as the translated `COM_J2COMMERCE_VENDOR_UNNAMED` string.
- Vendors are managed under **J2Commerce** -> **Catalog** -> **Vendors**.
- For filtering to only countries that have vendors, use [VendorCountryField](./vendor-country-field.md).

## Related

- [VendorCountryField](./vendor-country-field.md) — Countries filtered to those with vendors
- [ManufacturersField](./manufacturers-field.md) — Manufacturer dropdown (parallel structure)
