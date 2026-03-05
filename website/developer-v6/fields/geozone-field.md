---
title: "GeoZoneField Field Type"
sidebar_label: "GeoZoneField"
sidebar_position: 5
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce geo-zones, used for tax and shipping rule assignment."
---

# GeoZoneField Field Type

`GeoZoneField` extends Joomla's `ListField` to render a `<select>` populated with every enabled geo-zone from `#__j2commerce_geozones`. Geo-zones group geographic regions (countries, zones) for use in tax rules, shipping rate tables, and other location-based pricing logic. The stored value is the integer primary key `j2commerce_geozone_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `GeoZoneField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/GeoZoneField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `GeoZone` |
| Since | 6.0.7 |

## Database Query

```sql
SELECT j2commerce_geozone_id AS value, geozone_name AS text
FROM #__j2commerce_geozones
WHERE enabled = 1
ORDER BY geozone_name ASC
```

The stored value is `j2commerce_geozone_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="geozone_id"
    type="GeoZone"
    label="COM_MYPLUGIN_FIELD_GEOZONE_LABEL"
    description="COM_MYPLUGIN_FIELD_GEOZONE_DESC"
/>
```

### With Placeholder Option

```xml
<field
    name="geozone_id"
    type="GeoZone"
    label="COM_MYPLUGIN_FIELD_GEOZONE_LABEL"
    required="true">
    <option value="">COM_MYPLUGIN_SELECT_GEOZONE</option>
</field>
```

## Supported XML Attributes

All standard `ListField` attributes are supported:

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | string/integer | Default selected geo-zone ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="geozone_id"
            type="GeoZone"
            label="COM_MYPLUGIN_FIELD_GEOZONE_LABEL"
            description="COM_MYPLUGIN_FIELD_GEOZONE_DESC"
            default="0">
            <option value="0">COM_MYPLUGIN_ALL_GEOZONES</option>
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
                name="geozone_id"
                type="GeoZone"
                label="COM_MYPLUGIN_FIELD_GEOZONE_LABEL"
            />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/GeoZoneField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class GeoZoneField extends ListField
{
    protected $type = 'GeoZone';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('j2commerce_geozone_id', 'value'),
                $db->quoteName('geozone_name', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_geozones'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('geozone_name') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $geozone) {
            $options[] = HTMLHelper::_('select.option', $geozone->value, $geozone->text);
        }

        return $options;
    }
}
```

## Notes

- Only geo-zones with `enabled = 1` appear. Disabled geo-zones are excluded.
- Geo-zones are managed under **J2Commerce** -> **Configuration** -> **Geo Zones**.
- The stored value `j2commerce_geozone_id` can be used to look up `#__j2commerce_geozonerules` to retrieve the specific countries and zones within the geo-zone.

## Related

- [CountryField](./country-field.md) — Country dropdown
- [ZoneField](./zone-field.md) — Zone (state/province) dropdown
- [TaxProfileField](./taxprofile-field.md) — Tax profile assignment
- [TaxRateField](./taxrate-field.md) — Tax rate assignment
