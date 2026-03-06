---
title: "TaxProfileField Field Type"
sidebar_label: "TaxProfileField"
sidebar_position: 8
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce tax profiles for product tax assignment."
---

# TaxProfileField Field Type

`TaxProfileField` extends Joomla's `ListField` to render a `<select>` populated with every enabled tax profile from `#__j2commerce_taxprofiles`. Tax profiles define which tax rates apply to a product based on geo-zone rules. The stored value is the integer primary key `j2commerce_taxprofile_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `TaxProfileField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/TaxProfileField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `TaxProfile` |
| Since | 6.0.7 |

## Database Query

```sql
SELECT j2commerce_taxprofile_id AS value, taxprofile_name AS text
FROM #__j2commerce_taxprofiles
WHERE enabled = 1
ORDER BY taxprofile_name ASC
```

The stored value is `j2commerce_taxprofile_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="taxprofile_id"
    type="TaxProfile"
    label="COM_MYPLUGIN_FIELD_TAXPROFILE_LABEL"
    description="COM_MYPLUGIN_FIELD_TAXPROFILE_DESC"
/>
```

### With "Not Taxable" Placeholder

Adding a child `<option value="">` is the standard way to represent an untaxed product:

```xml
<field
    name="taxprofile_id"
    type="TaxProfile"
    label="COM_MYPLUGIN_FIELD_TAXPROFILE_LABEL">
    <option value="">COM_J2COMMERCE_NOT_TAXABLE</option>
</field>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | integer | Default selected tax profile ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="taxprofile_id"
            type="TaxProfile"
            label="COM_MYPLUGIN_FIELD_TAXPROFILE_LABEL"
            description="COM_MYPLUGIN_FIELD_TAXPROFILE_DESC">
            <option value="">COM_J2COMMERCE_NOT_TAXABLE</option>
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
                name="default_taxprofile_id"
                type="TaxProfile"
                label="COM_MYPLUGIN_DEFAULT_TAXPROFILE_LABEL"
                description="COM_MYPLUGIN_DEFAULT_TAXPROFILE_DESC"
            />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/TaxProfileField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class TaxProfileField extends ListField
{
    protected $type = 'TaxProfile';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('j2commerce_taxprofile_id', 'value'),
                $db->quoteName('taxprofile_name', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_taxprofiles'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('taxprofile_name') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $profile) {
            $options[] = HTMLHelper::_('select.option', $profile->value, $profile->text);
        }

        return $options;
    }
}
```

## Notes

- Only tax profiles with `enabled = 1` appear. Tax profiles are managed under **J2Commerce** -> **Configuration** -> **Tax Profiles**.
- To represent a non-taxable product, add a child `<option value="">` with a "Not Taxable" language key. An empty string stored in the field means no tax profile is assigned.
- Tax profiles connect to tax rates through geo-zone rules stored in `#__j2commerce_taxrules`.

## Related

- [TaxRateField](./taxrate-field.md) — Individual tax rate dropdown
- [GeoZoneField](./geozone-field.md) — Geo-zone dropdown used in tax rules
