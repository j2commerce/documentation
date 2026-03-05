---
title: "LengthField Field Type"
sidebar_label: "LengthField"
sidebar_position: 12
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce length classes for product dimension units."
---

# LengthField Field Type

`LengthField` extends Joomla's `ListField` to render a `<select>` populated with every enabled length class from `#__j2commerce_lengths`. Length classes define the unit of measurement (centimetre, inch, metre, etc.) used on product dimensions. The stored value is the integer primary key `j2commerce_length_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `LengthField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/LengthField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `Length` |
| Since | 6.0.7 |

## Database Query

```sql
SELECT j2commerce_length_id AS value, length_title AS text
FROM #__j2commerce_lengths
WHERE enabled = 1
ORDER BY length_title ASC
```

The stored value is `j2commerce_length_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="length_class_id"
    type="Length"
    label="COM_MYPLUGIN_FIELD_LENGTH_LABEL"
    description="COM_MYPLUGIN_FIELD_LENGTH_DESC"
/>
```

### With Placeholder

```xml
<field
    name="length_class_id"
    type="Length"
    label="COM_MYPLUGIN_FIELD_LENGTH_LABEL">
    <option value="0">COM_MYPLUGIN_SELECT_LENGTH</option>
</field>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | integer | Default selected length class ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

A typical use case is a shipping plugin that needs to know which length unit products are measured in:

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="length_class_id"
            type="Length"
            label="COM_MYPLUGIN_FIELD_LENGTH_LABEL"
            description="COM_MYPLUGIN_FIELD_LENGTH_DESC"
            default="0">
            <option value="0">COM_MYPLUGIN_SELECT_LENGTH</option>
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
                name="length_class_id"
                type="Length"
                label="COM_MYPLUGIN_LENGTH_LABEL"
                description="COM_MYPLUGIN_LENGTH_DESC"
            />
        </fieldset>
    </fields>
</config>
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/LengthField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class LengthField extends ListField
{
    protected $type = 'Length';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('j2commerce_length_id', 'value'),
                $db->quoteName('length_title', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_lengths'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('length_title') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $length) {
            $options[] = HTMLHelper::_('select.option', $length->value, $length->text);
        }

        return $options;
    }
}
```

## Notes

- Length classes are managed under **J2Commerce** -> **Configuration** -> **Lengths**.
- Only classes with `enabled = 1` appear. The `length_title` column stores the human-readable name (e.g., "Centimetre", "Inch").
- Length classes also carry a `length_unit` abbreviation column (e.g., `cm`, `in`) in the database, but the field only exposes `length_title` as the display label. If you need the unit abbreviation in code, query `#__j2commerce_lengths` directly by the saved ID.
- Pair with [WeightField](./weight-field.md) on product shipping forms.

## Related

- [WeightField](./weight-field.md) — Weight class dropdown
