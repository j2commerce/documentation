---
title: "StoreProfileField Field Type"
sidebar_label: "StoreProfileField"
sidebar_position: 14
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce store profiles for assigning a store identity to products or orders."
---

# StoreProfileField Field Type

`StoreProfileField` extends Joomla's `ListField` to render a `<select>` populated with every enabled store profile from `#__j2commerce_storeprofiles`. Store profiles define the seller identity (name, address, logo, contact details) used on invoices, packing slips, and outgoing emails. The stored value is the integer primary key `j2commerce_storeprofile_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `StoreProfileField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/StoreProfileField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `StoreProfile` |
| Since | 6.0.7 |

## Database Query

```sql
SELECT j2commerce_storeprofile_id AS value, store_name AS text
FROM #__j2commerce_storeprofiles
WHERE enabled = 1
ORDER BY store_name ASC
```

The stored value is `j2commerce_storeprofile_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="storeprofile_id"
    type="StoreProfile"
    label="COM_MYPLUGIN_FIELD_STOREPROFILE_LABEL"
    description="COM_MYPLUGIN_FIELD_STOREPROFILE_DESC"
/>
```

### With Placeholder

```xml
<field
    name="storeprofile_id"
    type="StoreProfile"
    label="COM_MYPLUGIN_FIELD_STOREPROFILE_LABEL">
    <option value="0">COM_MYPLUGIN_DEFAULT_STORE</option>
</field>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | integer | Default selected store profile ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

A common use case is a payment or email plugin that should send correspondence under a specific store identity:

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="storeprofile_id"
            type="StoreProfile"
            label="COM_MYPLUGIN_FIELD_STOREPROFILE_LABEL"
            description="COM_MYPLUGIN_FIELD_STOREPROFILE_DESC"
            default="0">
            <option value="0">COM_MYPLUGIN_DEFAULT_STORE</option>
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
                name="storeprofile_id"
                type="StoreProfile"
                label="COM_MYPLUGIN_STOREPROFILE_LABEL"
                description="COM_MYPLUGIN_STOREPROFILE_DESC"
            />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/StoreProfileField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class StoreProfileField extends ListField
{
    protected $type = 'StoreProfile';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('j2commerce_storeprofile_id', 'value'),
                $db->quoteName('store_name', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_storeprofiles'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('store_name') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $profile) {
            $options[] = HTMLHelper::_('select.option', $profile->value, $profile->text);
        }

        return $options;
    }
}
```

## Notes

- Store profiles are managed under **J2Commerce** -> **Configuration** -> **Store Profiles**.
- Only profiles with `enabled = 1` appear. The `store_name` column is the human-readable label shown in the dropdown.
- The stored `j2commerce_storeprofile_id` can be used to load the full store profile record (address, logo path, contact details) when generating invoices or emails.

## Related

- [CountryField](./country-field.md) — Used within store profile address forms
