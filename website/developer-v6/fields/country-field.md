---
title: "CountryField Field Type"
sidebar_label: "CountryField"
sidebar_position: 3
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce countries from the database."
---

# CountryField Field Type

`CountryField` extends Joomla's `ListField` to render a `<select>` element populated with every enabled country from `#__j2commerce_countries`. Options are ordered alphabetically by country name. The stored value is the integer primary key `j2commerce_country_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `CountryField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/CountryField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `Country` |
| Since | 6.0.7 |

## Database Query

The field queries `#__j2commerce_countries` and returns only enabled rows:

```sql
SELECT j2commerce_country_id AS value, country_name AS text
FROM #__j2commerce_countries
WHERE enabled = 1
ORDER BY country_name ASC
```

The stored value is `j2commerce_country_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="country_id"
    type="Country"
    label="COM_MYPLUGIN_FIELD_COUNTRY_LABEL"
    description="COM_MYPLUGIN_FIELD_COUNTRY_DESC"
/>
```

### With Placeholder Option

Use a child `<option>` element with an empty value to add a "select" placeholder. This is merged with the database options by the parent `ListField`.

```xml
<field
    name="country_id"
    type="Country"
    label="COM_MYPLUGIN_FIELD_COUNTRY_LABEL"
    description="COM_MYPLUGIN_FIELD_COUNTRY_DESC"
    required="true">
    <option value="">COM_MYPLUGIN_SELECT_COUNTRY</option>
</field>
```

## Supported XML Attributes

All standard `ListField` attributes are supported. The most relevant ones for this field:

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name and HTML `name` attribute |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | string/integer | Default selected value (country ID) |
| `required` | boolean | Whether a non-empty value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |
| `onchange` | string | Inline JavaScript for the `onchange` event |

## Usage in Plugin Forms

Add `addfieldprefix` on the `<form>` root element to tell Joomla where to find the custom field class:

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="country_id"
            type="Country"
            label="COM_MYPLUGIN_FIELD_COUNTRY_LABEL"
            description="COM_MYPLUGIN_FIELD_COUNTRY_DESC"
            default="0">
            <option value="0">JOPTION_SELECT_COUNTRY</option>
        </field>

    </fieldset>

</form>
```

### In a Plugin Manifest

Declare `addfieldprefix` in the plugin's `<config>` block:

```xml
<config>
    <fields name="params" addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
        <fieldset name="basic">
            <field
                name="country_id"
                type="Country"
                label="COM_MYPLUGIN_FIELD_COUNTRY_LABEL"
            />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/CountryField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class CountryField extends ListField
{
    protected $type = 'Country';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('j2commerce_country_id', 'value'),
                $db->quoteName('country_name', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_countries'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('country_name') . ' ASC');

        $db->setQuery($query);
        $countries = $db->loadObjectList();

        foreach ($countries as $country) {
            $options[] = HTMLHelper::_('select.option', $country->value, $country->text);
        }

        return $options;
    }
}
```

## Notes

- Only countries with `enabled = 1` appear in the dropdown. Disabled countries are hidden.
- The stored value is the integer `j2commerce_country_id`, not an ISO code.
- To trigger a zone dropdown update when the country changes, pair this field with `ZoneField` using the `country_field` attribute. See [ZoneField](./zone-field.md).

## Related

- [ZoneField](./zone-field.md) — Linked zone dropdown with AJAX country filtering
- [GeoZoneField](./geozone-field.md) — Geo-zone dropdown for tax and shipping rules
- [ManufacturerCountryField](./manufacturer-country-field.md) — Countries filtered to those with manufacturers
- [VendorCountryField](./vendor-country-field.md) — Countries filtered to those with vendors
