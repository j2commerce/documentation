---
title: "ManufacturerCountryField Field Type"
sidebar_label: "ManufacturerCountryField"
sidebar_position: 15
description: "A Joomla list field that populates a dropdown with only the countries that have at least one enabled J2Commerce manufacturer, useful for filtered report or search forms."
---

# ManufacturerCountryField Field Type

`ManufacturerCountryField` extends Joomla's `ListField` to render a `<select>` containing only the countries that are linked to at least one manufacturer through the manufacturer's address record. It is purpose-built for filter forms (such as report plugins or admin list filters) where a full country list would include irrelevant options. The stored value is the integer primary key `j2commerce_country_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `ManufacturerCountryField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/ManufacturerCountryField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `ManufacturerCountry` |
| Since | 6.0.6 |

## Database Query

The field performs a three-way join to find distinct countries used by any manufacturer:

```sql
SELECT DISTINCT c.j2commerce_country_id AS value, c.country_name AS text
FROM #__j2commerce_manufacturers AS m
INNER JOIN #__j2commerce_addresses AS a
    ON a.j2commerce_address_id = m.address_id
INNER JOIN #__j2commerce_countries AS c
    ON c.j2commerce_country_id = a.country_id
WHERE c.enabled = 1
  AND a.country_id IS NOT NULL
  AND a.country_id != ''
ORDER BY c.country_name ASC
```

The stored value is `j2commerce_country_id` (integer), consistent with `CountryField`.

## XML Usage

### Basic Usage

```xml
<field
    name="manufacturer_country_id"
    type="ManufacturerCountry"
    label="COM_MYPLUGIN_FIELD_COUNTRY_LABEL"
    description="COM_MYPLUGIN_FIELD_COUNTRY_DESC"
/>
```

### With "All Countries" Placeholder

A typical filter form pattern:

```xml
<field
    name="manufacturer_country_id"
    type="ManufacturerCountry"
    label="COM_MYPLUGIN_FIELD_COUNTRY_LABEL">
    <option value="0">JOPTION_SELECT_COUNTRY</option>
</field>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | integer | Default selected country ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

The primary use case is a report plugin that filters data by manufacturer country:

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="filters">

        <field
            name="manufacturer_country_id"
            type="ManufacturerCountry"
            label="COM_MYPLUGIN_FILTER_COUNTRY_LABEL"
            description="COM_MYPLUGIN_FILTER_COUNTRY_DESC"
            default="0">
            <option value="0">JOPTION_SELECT_COUNTRY</option>
        </field>

    </fieldset>

</form>
```

### Difference from CountryField

| Field | Options shown | Use when |
|-------|--------------|----------|
| `CountryField` | All enabled countries | You need the full country list |
| `ManufacturerCountryField` | Only countries with manufacturers | Filtering manufacturer-related data |

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/ManufacturerCountryField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class ManufacturerCountryField extends ListField
{
    protected $type = 'ManufacturerCountry';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select('DISTINCT ' . $db->quoteName('c.j2commerce_country_id', 'value'))
            ->select($db->quoteName('c.country_name', 'text'))
            ->from($db->quoteName('#__j2commerce_manufacturers', 'm'))
            ->join(
                'INNER',
                $db->quoteName('#__j2commerce_addresses', 'a'),
                $db->quoteName('a.j2commerce_address_id') . ' = ' . $db->quoteName('m.address_id')
            )
            ->join(
                'INNER',
                $db->quoteName('#__j2commerce_countries', 'c'),
                $db->quoteName('c.j2commerce_country_id') . ' = ' . $db->quoteName('a.country_id')
            )
            ->where($db->quoteName('c.enabled') . ' = 1')
            ->where($db->quoteName('a.country_id') . ' IS NOT NULL')
            ->where($db->quoteName('a.country_id') . ' != ' . $db->quote(''))
            ->order($db->quoteName('c.country_name') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $country) {
            $options[] = HTMLHelper::_('select.option', $country->value, $country->text);
        }

        return $options;
    }
}
```

## Notes

- Only countries where `c.enabled = 1` AND the manufacturer has a non-empty `address_id` with a valid `country_id` are included.
- A country appears only once (`DISTINCT`) even if multiple manufacturers share the same country.
- If no manufacturers exist or none have country addresses, the dropdown will contain only any static child `<option>` elements you add.
- The `since` version for this field is 6.0.6, one minor version earlier than most other entity fields.

## Related

- [CountryField](./country-field.md) — Full enabled-country list
- [ManufacturersField](./manufacturers-field.md) — Manufacturer dropdown
- [VendorCountryField](./vendor-country-field.md) — Parallel field filtered to vendor countries
