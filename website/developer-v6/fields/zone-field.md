---
title: "ZoneField Field Type"
sidebar_label: "ZoneField"
sidebar_position: 4
description: "A Joomla list field that renders a zone dropdown with optional AJAX country-zone linking, filtering zones dynamically when a country is selected."
---

# ZoneField Field Type

`ZoneField` extends Joomla's `ListField` to render a `<select>` populated with enabled zones from `#__j2commerce_zones`. Its distinguishing feature is the optional `country_field` attribute: when provided, the field injects inline JavaScript that reloads the zone list via AJAX whenever the linked country dropdown changes. This makes it the standard building block for country/state or country/province address pairs throughout J2Commerce.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `ZoneField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/ZoneField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `Zone` |
| Since | 6.0.7 |

## Database Query

### Initial Load (No Country Linked or No Country Selected)

All enabled zones are returned:

```sql
SELECT j2commerce_zone_id AS value, zone_name AS text
FROM #__j2commerce_zones
WHERE enabled = 1
ORDER BY zone_name ASC
```

### Initial Load (Country Field Set and Country Already Selected)

The query adds a `country_id` filter so only the zones for that country are shown on first render:

```sql
SELECT j2commerce_zone_id AS value, zone_name AS text
FROM #__j2commerce_zones
WHERE enabled = 1
  AND country_id = :country_id
ORDER BY zone_name ASC
```

### AJAX Endpoint

When the country dropdown changes, the JavaScript calls:

```
index.php?option=com_j2commerce&task=ajax.getZones&country_id={id}&zone_id={currentZoneId}
```

The response is an HTML `<option>` fragment that replaces the zone select's `innerHTML`.

## XML Usage

### Basic Usage (No Linking)

A standalone zone dropdown showing all enabled zones:

```xml
<field
    name="zone_id"
    type="Zone"
    label="COM_MYPLUGIN_FIELD_ZONE_LABEL"
    description="COM_MYPLUGIN_FIELD_ZONE_DESC"
/>
```

### Linked to a Country Field (With AJAX)

Pair with a `CountryField` using the `country_field` attribute. The value of `country_field` must match the `name` attribute of the country field in the same form:

```xml
<field
    name="country_id"
    type="Country"
    label="COM_MYPLUGIN_FIELD_COUNTRY_LABEL"
    required="true"
/>

<field
    name="zone_id"
    type="Zone"
    country_field="country_id"
    label="COM_MYPLUGIN_FIELD_ZONE_LABEL"
    description="COM_MYPLUGIN_FIELD_ZONE_DESC"
/>
```

The `country_field` attribute tells `ZoneField` two things:

1. On **initial render**: filter zones to match the form's current country value (when one is already saved).
2. On **country change**: inject JavaScript that calls the AJAX endpoint and replaces the zone options.

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `country_field` | string | Name of the sibling country field to link to. Enables AJAX dynamic filtering. |
| `default` | string/integer | Default selected zone ID |
| `required` | boolean | Whether a value is required |
| `class` | string | Additional CSS classes on the `<select>` element |
| `multiple` | boolean | Allow multi-select (disables AJAX linking) |

## AJAX Behavior

When `country_field` is set, `ZoneField` appends an inline `<script>` block after the standard select markup. The script:

1. Finds the country `<select>` by its computed ID (`{formControl}_{group}{countryField}`).
2. Finds the zone `<select>` by its own field ID.
3. On `DOMContentLoaded`, if a country is already selected, immediately fetches zones for that country and pre-selects the saved zone ID.
4. On country `change`, sets the zone select to a loading state (`disabled`), fetches new zones, and re-enables it.

### ID Computation

The country field element ID is built as:

```
{formControl}_{group}{countryField}
```

Where `formControl` defaults to `jform` (standard for component forms) and `group` is the field group prefix if any. For a top-level field in a standard plugin params form, the country field ID would be `jform_country_id`.

### JavaScript Pattern (Inline)

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('jform_country_id');
    const zoneSelect    = document.getElementById('jform_zone_id');

    async function loadZones(countryId, selectedZoneId = 0) {
        zoneSelect.innerHTML = '<option value="">Loading...</option>';
        zoneSelect.disabled  = true;

        if (!countryId || countryId === '0') {
            zoneSelect.innerHTML = '<option value="">Select Zone</option>';
            zoneSelect.disabled  = false;
            return;
        }

        const url      = 'index.php?option=com_j2commerce&task=ajax.getZones'
                       + '&country_id=' + countryId + '&zone_id=' + selectedZoneId;
        const response = await fetch(url);
        zoneSelect.innerHTML = await response.text();
        zoneSelect.disabled  = false;
    }

    countrySelect.addEventListener('change', function() {
        loadZones(this.value, 0);
    });

    if (countrySelect.value && countrySelect.value !== '0') {
        loadZones(countrySelect.value, zoneSelect.value || 0);
    }
});
```

## Usage in Plugin Forms

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="country_id"
            type="Country"
            label="COM_MYPLUGIN_FIELD_COUNTRY_LABEL"
            default="0">
            <option value="0">JOPTION_SELECT_COUNTRY</option>
        </field>

        <field
            name="zone_id"
            type="Zone"
            country_field="country_id"
            label="COM_MYPLUGIN_FIELD_ZONE_LABEL"
            default="0">
            <option value="0">JOPTION_SELECT_REGION</option>
        </field>

    </fieldset>

</form>
```

### In a Plugin Manifest `<config>` Block

```xml
<config>
    <fields name="params" addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
        <fieldset name="basic">
            <field name="country_id" type="Country" label="COM_MYPLUGIN_FIELD_COUNTRY_LABEL" />
            <field name="zone_id"    type="Zone"    country_field="country_id"
                   label="COM_MYPLUGIN_FIELD_ZONE_LABEL" />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/ZoneField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;
use Joomla\Database\ParameterType;

class ZoneField extends ListField
{
    protected $type = 'Zone';

    protected $countryField;

    public function setup(\SimpleXMLElement $element, $value, $group = null): bool
    {
        $result = parent::setup($element, $value, $group);

        if ($result) {
            $this->countryField = (string) $this->element['country_field'];
        }

        return $result;
    }

    protected function getInput(): string
    {
        $html = parent::getInput();

        if (!empty($this->countryField)) {
            $html .= $this->getAjaxScript();
        }

        return $html;
    }

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('j2commerce_zone_id', 'value'),
                $db->quoteName('zone_name', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_zones'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('zone_name') . ' ASC');

        // Server-side filter on initial render if a country is already selected
        if (!empty($this->countryField) && $this->form) {
            $countryValue = $this->form->getValue($this->countryField);

            if (!empty($countryValue) && is_numeric($countryValue)) {
                $countryId = (int) $countryValue;
                $query->where($db->quoteName('country_id') . ' = :country_id')
                      ->bind(':country_id', $countryId, ParameterType::INTEGER);
            }
        }

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $zone) {
            $options[] = HTMLHelper::_('select.option', $zone->value, $zone->text);
        }

        return $options;
    }
}
```

## Notes

- When `country_field` is omitted, the field behaves as a plain list of all enabled zones with no AJAX behavior.
- The AJAX endpoint `ajax.getZones` is provided by the J2Commerce component's AJAX controller and returns `<option>` HTML fragments.
- If your form uses a non-standard `formControl` or field groups, verify the computed country field element ID matches what `getAjaxScript()` produces.
- `ZoneField` stores the integer `j2commerce_zone_id` as its value.

## Related

- [CountryField](./country-field.md) — Country dropdown, typically paired with ZoneField
- [GeoZoneField](./geozone-field.md) — Geo-zone dropdown for tax/shipping rules
