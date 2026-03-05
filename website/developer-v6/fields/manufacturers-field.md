---
title: "ManufacturersField Field Type"
sidebar_label: "ManufacturersField"
sidebar_position: 10
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce manufacturers, joining the manufacturers and addresses tables to retrieve company names."
---

# ManufacturersField Field Type

`ManufacturersField` extends Joomla's `ListField` to render a `<select>` populated with every enabled manufacturer from `#__j2commerce_manufacturers`. Because manufacturer names are stored in the linked `#__j2commerce_addresses` record (as the `company` column), the field performs an `INNER JOIN` to retrieve display labels. The stored value is the integer primary key `j2commerce_manufacturer_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `ManufacturersField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/ManufacturersField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `Manufacturers` |
| Since | 6.0.7 |

## Database Query

The field joins manufacturers to their linked address record to get the company name:

```sql
SELECT m.j2commerce_manufacturer_id AS value, a.company AS text
FROM #__j2commerce_manufacturers AS m
INNER JOIN #__j2commerce_addresses AS a
    ON m.address_id = a.j2commerce_address_id
WHERE m.enabled = 1
ORDER BY a.company ASC
```

If a manufacturer's `company` field is empty (whitespace only), the label falls back to the `COM_J2COMMERCE_MANUFACTURER_UNNAMED` language string. The stored value is `j2commerce_manufacturer_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="manufacturer_id"
    type="Manufacturers"
    label="COM_MYPLUGIN_FIELD_MANUFACTURER_LABEL"
    description="COM_MYPLUGIN_FIELD_MANUFACTURER_DESC"
/>
```

### With Placeholder

```xml
<field
    name="manufacturer_id"
    type="Manufacturers"
    label="COM_MYPLUGIN_FIELD_MANUFACTURER_LABEL">
    <option value="0">COM_MYPLUGIN_ALL_MANUFACTURERS</option>
</field>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | integer | Default selected manufacturer ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="manufacturer_id"
            type="Manufacturers"
            label="COM_MYPLUGIN_FIELD_MANUFACTURER_LABEL"
            description="COM_MYPLUGIN_FIELD_MANUFACTURER_DESC"
            default="0">
            <option value="0">COM_MYPLUGIN_ALL_MANUFACTURERS</option>
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
                name="manufacturer_id"
                type="Manufacturers"
                label="COM_MYPLUGIN_MANUFACTURER_LABEL"
            />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/ManufacturersField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class ManufacturersField extends ListField
{
    protected $type = 'Manufacturers';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('m.j2commerce_manufacturer_id', 'value'),
                $db->quoteName('a.company', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_manufacturers', 'm'))
            ->join(
                'INNER',
                $db->quoteName('#__j2commerce_addresses', 'a')
                    . ' ON ' . $db->quoteName('m.address_id')
                    . ' = ' . $db->quoteName('a.j2commerce_address_id')
            )
            ->where($db->quoteName('m.enabled') . ' = 1')
            ->order($db->quoteName('a.company') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $manufacturer) {
            $text      = trim((string) $manufacturer->text);
            $text      = $text ?: Text::_('COM_J2COMMERCE_MANUFACTURER_UNNAMED');
            $options[] = HTMLHelper::_('select.option', $manufacturer->value, $text);
        }

        return $options;
    }
}
```

## Notes

- The display name comes from `#__j2commerce_addresses.company`, not from the manufacturers table directly. A manufacturer without an address record will not appear because the join is `INNER`.
- Manufacturers with a blank `company` field display as the translated `COM_J2COMMERCE_MANUFACTURER_UNNAMED` string rather than an empty option label.
- Manufacturers are managed under **J2Commerce** -> **Catalog** -> **Manufacturers**.
- For filtering to only countries that have manufacturers, use [ManufacturerCountryField](./manufacturer-country-field.md).

## Related

- [ManufacturerCountryField](./manufacturer-country-field.md) — Countries filtered to those with manufacturers
- [VendorsField](./vendors-field.md) — Vendor dropdown (parallel structure)
