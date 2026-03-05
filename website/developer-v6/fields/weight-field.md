---
title: "WeightField Field Type"
sidebar_label: "WeightField"
sidebar_position: 13
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce weight classes for product weight units."
---

# WeightField Field Type

`WeightField` extends Joomla's `ListField` to render a `<select>` populated with every enabled weight class from `#__j2commerce_weights`. Weight classes define the unit of measurement (kilogram, gram, pound, ounce, etc.) used on product weights. The stored value is the integer primary key `j2commerce_weight_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `WeightField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/WeightField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `Weight` |
| Since | 6.0.7 |

## Database Query

```sql
SELECT j2commerce_weight_id AS value, weight_title AS text
FROM #__j2commerce_weights
WHERE enabled = 1
ORDER BY weight_title ASC
```

The stored value is `j2commerce_weight_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="weight_class_id"
    type="Weight"
    label="COM_MYPLUGIN_FIELD_WEIGHT_LABEL"
    description="COM_MYPLUGIN_FIELD_WEIGHT_DESC"
/>
```

### With Placeholder

```xml
<field
    name="weight_class_id"
    type="Weight"
    label="COM_MYPLUGIN_FIELD_WEIGHT_LABEL">
    <option value="0">COM_MYPLUGIN_SELECT_WEIGHT</option>
</field>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | integer | Default selected weight class ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

Shipping plugins commonly expose a weight class selector so administrators can specify which unit their rates are defined in:

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <field
            name="weight_class_id"
            type="Weight"
            label="COM_MYPLUGIN_FIELD_WEIGHT_LABEL"
            description="COM_MYPLUGIN_FIELD_WEIGHT_DESC"
            default="0">
            <option value="0">COM_MYPLUGIN_SELECT_WEIGHT</option>
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
                name="weight_class_id"
                type="Weight"
                label="COM_MYPLUGIN_WEIGHT_CLASS_LABEL"
                description="COM_MYPLUGIN_WEIGHT_CLASS_DESC"
            />
        </fieldset>
    </fields>
</config>
```

### Reading the Value in PHP

```php
$params        = $this->params;
$weightClassId = (int) $params->get('weight_class_id', 0);

// Retrieve the unit abbreviation if needed
$db    = Factory::getContainer()->get(DatabaseInterface::class);
$query = $db->getQuery(true)
    ->select($db->quoteName('weight_unit'))
    ->from($db->quoteName('#__j2commerce_weights'))
    ->where($db->quoteName('j2commerce_weight_id') . ' = :id')
    ->bind(':id', $weightClassId, ParameterType::INTEGER);

$db->setQuery($query);
$unit = $db->loadResult(); // e.g., "kg"
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/WeightField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class WeightField extends ListField
{
    protected $type = 'Weight';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('j2commerce_weight_id', 'value'),
                $db->quoteName('weight_title', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_weights'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('weight_title') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $weight) {
            $options[] = HTMLHelper::_('select.option', $weight->value, $weight->text);
        }

        return $options;
    }
}
```

## Notes

- Weight classes are managed under **J2Commerce** -> **Configuration** -> **Weights**.
- Only classes with `enabled = 1` appear. The `weight_title` column stores the human-readable name (e.g., "Kilogram", "Pound").
- The `weight_unit` abbreviation (e.g., `kg`, `lb`) is available in `#__j2commerce_weights` but not exposed by this field's option label. Query it separately when you need the abbreviation in calculations.
- Pair with [LengthField](./length-field.md) on product shipping forms.

## Related

- [LengthField](./length-field.md) — Length class dropdown
