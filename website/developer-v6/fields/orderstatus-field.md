---
title: "OrderStatusField Field Type"
sidebar_label: "OrderStatusField"
sidebar_position: 7
description: "A Joomla list field that populates a dropdown with all enabled J2Commerce order statuses, with label translation via Text::_()."
---

# OrderStatusField Field Type

`OrderStatusField` extends Joomla's `ListField` to render a `<select>` populated with every enabled order status from `#__j2commerce_orderstatuses`. Status names are passed through `Text::_()` before rendering, so any status whose `orderstatus_name` is a language key will be translated automatically. The stored value is the integer primary key `j2commerce_orderstatus_id`.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `OrderStatusField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/OrderStatusField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `OrderStatus` |
| Since | 6.0.7 |

## Database Query

```sql
SELECT j2commerce_orderstatus_id AS value, orderstatus_name AS text
FROM #__j2commerce_orderstatuses
WHERE enabled = 1
ORDER BY orderstatus_name ASC
```

The `orderstatus_name` value is passed through `Text::_()` at render time. The stored value is `j2commerce_orderstatus_id` (integer).

## XML Usage

### Basic Usage

```xml
<field
    name="orderstatus_id"
    type="OrderStatus"
    label="COM_MYPLUGIN_FIELD_ORDERSTATUS_LABEL"
    description="COM_MYPLUGIN_FIELD_ORDERSTATUS_DESC"
/>
```

### With Placeholder and Required

```xml
<field
    name="orderstatus_id"
    type="OrderStatus"
    label="COM_MYPLUGIN_FIELD_ORDERSTATUS_LABEL"
    required="true">
    <option value="">COM_MYPLUGIN_SELECT_STATUS</option>
</field>
```

### With Default

```xml
<field
    name="notify_on_status"
    type="OrderStatus"
    label="COM_MYPLUGIN_NOTIFY_STATUS_LABEL"
    default="1"
/>
```

## Supported XML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Form field name |
| `label` | string | Language key for the field label |
| `description` | string | Language key for the tooltip |
| `default` | integer | Default selected order status ID |
| `required` | boolean | Whether a value is required |
| `multiple` | boolean | Allow multi-select (useful for "notify on these statuses") |
| `class` | string | Additional CSS classes on the `<select>` element |

## Usage in Plugin Forms

A common use case is a payment or notification plugin that fires on a specific order status change:

```xml
<?xml version="1.0" encoding="utf-8"?>
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">

    <fieldset name="basic">

        <!-- Status to set when payment is confirmed -->
        <field
            name="payment_confirmed_status"
            type="OrderStatus"
            label="COM_MYPLUGIN_PAYMENT_CONFIRMED_STATUS_LABEL"
            description="COM_MYPLUGIN_PAYMENT_CONFIRMED_STATUS_DESC"
            default="1">
            <option value="0">COM_MYPLUGIN_USE_DEFAULT</option>
        </field>

        <!-- Status to set when payment fails -->
        <field
            name="payment_failed_status"
            type="OrderStatus"
            label="COM_MYPLUGIN_PAYMENT_FAILED_STATUS_LABEL"
            default="4"
        />

    </fieldset>

</form>
```

### In a Plugin Manifest `<config>` Block

```xml
<config>
    <fields name="params" addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
        <fieldset name="basic">
            <field
                name="success_status"
                type="OrderStatus"
                label="COM_MYPLUGIN_SUCCESS_STATUS_LABEL"
            />
            <field
                name="failed_status"
                type="OrderStatus"
                label="COM_MYPLUGIN_FAILED_STATUS_LABEL"
            />
            <field
                name="pending_status"
                type="OrderStatus"
                label="COM_MYPLUGIN_PENDING_STATUS_LABEL"
            />
        </fieldset>
    </fields>
</config>
```

### Reading the Value in PHP

```php
// Inside a payment plugin
$params         = $this->params;
$successStatus  = (int) $params->get('success_status', 1);

// Use the status ID to update an order
$orderModel->updateOrderStatus($orderId, $successStatus, 'Payment confirmed.');
```

## Source Code

```php
// File: administrator/components/com_j2commerce/src/Field/OrderStatusField.php

declare(strict_types=1);

namespace J2Commerce\Component\J2commerce\Administrator\Field;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;

class OrderStatusField extends ListField
{
    protected $type = 'OrderStatus';

    public function getOptions(): array
    {
        $options = parent::getOptions();

        $db    = Factory::getContainer()->get(DatabaseInterface::class);
        $query = $db->getQuery(true)
            ->select([
                $db->quoteName('j2commerce_orderstatus_id', 'value'),
                $db->quoteName('orderstatus_name', 'text')
            ])
            ->from($db->quoteName('#__j2commerce_orderstatuses'))
            ->where($db->quoteName('enabled') . ' = 1')
            ->order($db->quoteName('orderstatus_name') . ' ASC');

        $db->setQuery($query);

        foreach ($db->loadObjectList() as $status) {
            $options[] = HTMLHelper::_('select.option', $status->value, Text::_($status->text));
        }

        return $options;
    }
}
```

## Notes

- Status names are passed through `Text::_()`, so if a status name is stored as a language key it will be translated. Plain-text names are returned unchanged.
- Statuses are sorted alphabetically by `orderstatus_name`. If you need a specific ordering, add an explicit `default` value to pre-select a common status.
- Order statuses are managed under **J2Commerce** -> **Orders** -> **Order Statuses**.
- `multiple="true"` is useful when a plugin should fire on any of several statuses.

## Related

- [TaxProfileField](./taxprofile-field.md) — Tax profile assignment
- [GeoZoneField](./geozone-field.md) — Geo-zone dropdown
