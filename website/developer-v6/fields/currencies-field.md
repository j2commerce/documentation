---
title: "CurrenciesField Field Type"
sidebar_label: "CurrenciesField"
sidebar_position: 6
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce currencies, displaying both the currency title and its ISO code."
---

# CurrenciesField Field Type

`CurrenciesField` extends Joomla's `ListField` to render a `<select>` populated with every enabled currency from `#__j2commerce_currencies`. Each option displays the currency title and ISO code together (e.g., "US Dollar (USD)"). The stored value is the `currency_code` string (ISO 4217 code), not an integer ID.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `CurrenciesField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/CurrenciesField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `Currencies` |
| Since | 6.0.7 |

## Database Query

```sql
SELECT
    currency_code AS value,
    CONCAT(currency_title, ' (', currency_code, ')') AS text
FROM #__j2commerce_currencies
WHERE enabled = 1
ORDER BY currency_title ASC
```

The stored value is `currency_code` (string, e.g., `"USD"`, `"EUR"`).

## XML Usage

### Basic Usage

```xml
<field
    name="currency"
    type="Currencies"
    label="COM_MYPLUGIN_FIELD_CURRENCY_LABEL"
    description="COM_MYPLUGIN_FIELD_CURRENCY_DESC"
/>
```

### With Placeholder

```xml
<field
    name="currency"
    type="Currencies"
    label="COM_MYPLUGIN_FIELD_CURRENCY_LABEL"
    required="true">
    <option value="">COM_MYPLUGIN_SELECT_CURRENCY</option>
</field>
```

### With Default Value

```xml
<field
    name="currency"
    type="Currencies"
    label="COM_MYPLUGIN_FIELD_CURRENCY_LABEL"
    default="USD"
/>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | string | Default ISO currency code (e.g., `"USD"`) |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="currency"
            type="Currencies"
            label="COM_MYPLUGIN_FIELD_CURRENCY_LABEL"
            description="COM_MYPLUGIN_FIELD_CURRENCY_DESC"
            default="USD">
            <option value="">COM_MYPLUGIN_SELECT_CURRENCY</option>
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
                name="currency"
                type="Currencies"
                label="COM_MYPLUGIN_FIELD_CURRENCY_LABEL"
                default="USD"
            />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/CurrenciesField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class CurrenciesField extends ListField
{
    protected $type = 'Currencies';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('currency_code', 'value'),
                'CONCAT(' . $db->quoteName('currency_title') . ', \' (\', '
                    . $db->quoteName('currency_code') . ', \')\') AS '
                    . $db->quoteName('text')
            ])
            ->from($db->quoteName('#__j2commerce_currencies'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('currency_title') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $currency) {
            $options[] = HTMLHelper::_('select.option', $currency->value, $currency->text);
        }

        return $options;
    }
}
```

## Notes

- The stored value is the ISO 4217 `currency_code` string (`"USD"`, `"EUR"`, etc.), not a numeric ID. Account for this when reading saved parameters.
- Only currencies with `enabled = 1` appear. Currencies are managed under **J2Commerce** -> **Configuration** -> **Currencies**.
- Option labels follow the pattern "Currency Title (CODE)" — e.g., "US Dollar (USD)".

## Related

- [CountryField](./country-field.md) — Country dropdown
- [GeoZoneField](./geozone-field.md) — Geo-zone dropdown
