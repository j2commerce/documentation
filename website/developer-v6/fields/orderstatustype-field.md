---
title: "OrderstatustypeField Field Type"
sidebar_label: "OrderstatustypeField"
sidebar_position: 45
description: "A Joomla list field that populates a dropdown with every order-status lifecycle type — core plus plugin-registered — via OrderStatusHelper."
---

# OrderstatustypeField Field Type

`OrderstatustypeField` extends Joomla's `ListField` to render a `<select>` populated with every order-status lifecycle **type** currently known to `OrderStatusHelper` — the nine core types plus anything a plugin has registered through the [`onJ2CommerceGetOrderStatusTypes` event](../extensions/plugins/order-status-types.md). The stored value is the type string (e.g. `shipped`, or a plugin-registered value like `scheduled`); an empty value or unset field means the row is unclassified.

## Class Reference

| Property | Value |
|----------|-------|
| Class | `OrderstatustypeField` |
| Namespace | `J2Commerce\Component\J2commerce\Administrator\Field` |
| File | `administrator/components/com_j2commerce/src/Field/OrderstatustypeField.php` |
| Extends | `Joomla\CMS\Form\Field\ListField` |
| Field type token | `Orderstatustype` |
| Since | 6.6.1 |

## How Options Are Built

`getOptions()` merges any options declared in the field's own XML with `OrderStatusHelper::getTypeOptions()`:

```php
public function getOptions(): array
{
    return array_merge(parent::getOptions(), OrderStatusHelper::getTypeOptions(!$this->multiple));
}
```

`getTypeOptions(bool $includeNone)` builds the option list from `OrderStatusHelper::getTypes()` — the core `TYPES` constant merged with every valid contribution from `onJ2CommerceGetOrderStatusTypes` — and passes each label through `Text::_()`. The `$includeNone` argument controls whether an empty "Not classified" option (`COM_J2COMMERCE_ORDERSTATUS_TYPE_NONE`) is prepended.

## Single vs. `multiple="true"`

| Mode | `includeNone` | Behavior |
|---|---|---|
| Single select (default) | `true` | An empty "Not classified" option is offered first — leaving a status unclassified must stay reachable from the UI. |
| `multiple="true"` | `false` | The empty option is skipped, since there is no single "unclassified" value to pick in a multi-select, and `setup()` switches the layout to `joomla.form.field.list-fancy-select` automatically for the tag-style multi-pick UI. |

```php
public function setup(\SimpleXMLElement $element, $value, $group = null)
{
    $result = parent::setup($element, $value, $group);

    if ($result && $this->multiple && $this->layout === 'joomla.form.field.list') {
        $this->layout = 'joomla.form.field.list-fancy-select';
    }

    return $result;
}
```

## Stored Value

The field stores the type **string** (not an id) in whatever column the form binds it to. An empty string or unset value means unclassified — mirrored exactly by the core `orderstatus_type` column, which is `varchar(16) NULL` on `#__j2commerce_orderstatuses`.

## Plugin-Registered Types Appear Automatically

Any type a plugin registers via `onJ2CommerceGetOrderStatusTypes` shows up in this field with no extra wiring — the field always reads the live, merged set from `OrderStatusHelper::getTypes()` at render time. There is nothing to declare in the field's own XML to make a plugin-contributed type available.

## XML Usage

### Basic Usage (single select)

```xml
<field
    name="orderstatus_type"
    type="Orderstatustype"
    label="COM_J2COMMERCE_FIELD_ORDERSTATUS_TYPE"
    description="COM_J2COMMERCE_FIELD_ORDERSTATUS_TYPE_DESC"
    default=""
    validate="options"
/>
```

This is the exact field used on the core Order Status edit form (`administrator/components/com_j2commerce/forms/orderstatus.xml`).

### In a Plugin's Params Form

```xml
<!-- File: plugins/j2commerce/app_partialpayment/app_partialpayment.xml (excerpt) -->
<config>
    <fields name="params" addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
        <field
            name="scheduled_status_id"
            type="Orderstatustype"
            label="PLG_J2COMMERCE_APP_PARTIALPAYMENT_SCHEDULED_STATUS_LABEL"
            description="PLG_J2COMMERCE_APP_PARTIALPAYMENT_SCHEDULED_STATUS_DESC"
            default=""
        />
    </fields>
</config>
```

### `multiple="true"` (fancy-select multi-pick)

```xml
<field
    name="notify_on_types"
    type="Orderstatustype"
    label="COM_MYPLUGIN_NOTIFY_TYPES_LABEL"
    multiple="true"
/>
```

## Related

- [Order Status Types — registering a type from a plugin](../extensions/plugins/order-status-types.md)
- [OrderStatusField Field Type](./orderstatus-field.md) — status id dropdown (distinct from the type dropdown documented here)
