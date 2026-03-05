---
title: "Dimensions Form Field"
sidebar_label: "Dimensions Field"
sidebar_position: 21
description: "Developer reference for the Dimensions custom form field — a composite Bootstrap input-group rendering Length, Width, and Height inputs in a single row."
---

# Dimensions Form Field

`DimensionsField` is a `FormField` subclass that renders three decimal inputs — Length, Width, and Height — combined into a single Bootstrap 5 `input-group`. This reduces visual clutter on the variant editing form while still submitting three independent named fields to the server.

## Key Classes

| Class | File | Purpose |
|-------|------|---------|
| `DimensionsField` | `administrator/components/com_j2commerce/src/Field/DimensionsField.php` | Renders the composite three-input row |

## Rendered Output

```html
<div class="input-group">
    <span class="input-group-text fs-6 px-2"><small>Length</small></span>
    <input type="text" name="jform[attribs][j2commerce][variable][123][length]"
           id="jform_attribs_j2commerce_variable_123_dimensions_length"
           value="10.00" class="form-control fs-6 px-2" inputmode="decimal"
           aria-label="Length">

    <span class="input-group-text fs-6 px-2"><small>Width</small></span>
    <input type="text" name="jform[attribs][j2commerce][variable][123][width]"
           id="jform_attribs_j2commerce_variable_123_dimensions_width"
           value="5.00" class="form-control fs-6 px-2" inputmode="decimal"
           aria-label="Width">

    <span class="input-group-text fs-6 px-2"><small>Height</small></span>
    <input type="text" name="jform[attribs][j2commerce][variable][123][height]"
           id="jform_attribs_j2commerce_variable_123_dimensions_height"
           value="2.50" class="form-control fs-6 px-2" inputmode="decimal"
           aria-label="Height">
</div>
```

## Sub-Field Name Derivation

The field derives individual sub-field names by replacing the last bracket segment of `$this->name` with each dimension name:

```
$this->name  →  jform[attribs][j2commerce][variable][123][dimensions]
length name  →  jform[attribs][j2commerce][variable][123][length]
width name   →  jform[attribs][j2commerce][variable][123][width]
height name  →  jform[attribs][j2commerce][variable][123][height]
```

The sub-field names can be overridden via XML attributes to match a different data schema.

## XML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | — | Must be `Dimensions` |
| `length_name` | string | `length` | POST key for the length sub-field |
| `width_name` | string | `width` | POST key for the width sub-field |
| `height_name` | string | `height` | POST key for the height sub-field |
| `readonly` | bool | `false` | Applies `readonly` to all three inputs |
| `disabled` | bool | `false` | Applies `disabled` to all three inputs |

Standard `label` and `description` attributes apply to the outer form row.

## Value Binding

The field reads its sub-values in this order:

1. If `$this->value` is an array, it looks for keys `length`, `width`, `height`.
2. Otherwise it reads from `$this->form->getData()` via the configured sub-field names.

This means you can bind dimension data either as a flat array keyed by dimension name, or as part of a `Joomla\Registry\Registry` object bound to the form.

## XML Usage

```xml
<!-- File: administrator/components/com_j2commerce/forms/variant.xml (example) -->

<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="shipping">
        <field
            name="dimensions"
            type="Dimensions"
            label="COM_J2COMMERCE_FIELD_DIMENSIONS_LABEL"
            description="COM_J2COMMERCE_FIELD_DIMENSIONS_DESC"
        />
    </fieldset>
</form>
```

### Custom Sub-Field Names

Override the default dimension key names if your data model uses different property names:

```xml
<field
    name="dimensions"
    type="Dimensions"
    addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field"
    label="COM_J2COMMERCE_FIELD_DIMENSIONS_LABEL"
    length_name="dim_l"
    width_name="dim_w"
    height_name="dim_h"
/>
```

With the above, the submitted POST keys become `[dim_l]`, `[dim_w]`, `[dim_h]` relative to the parent name prefix.

## Reading Submitted Values in a Model

Because each dimension is a separate POST field, read them individually in the model's `save()` or form processing method:

```php
// File: administrator/components/com_j2commerce/src/Model/ProductModel.php (excerpt)

$variantData = $this->input->get('jform', [], 'array');
$variantId   = 123;

$length = (float) ($variantData['attribs']['j2commerce']['variable'][$variantId]['length'] ?? 0);
$width  = (float) ($variantData['attribs']['j2commerce']['variable'][$variantId]['width'] ?? 0);
$height = (float) ($variantData['attribs']['j2commerce']['variable'][$variantId]['height'] ?? 0);
```

## Usage in Plugin Forms

Use this field in any plugin that manages physical shipment dimensions at configuration time:

```xml
<!-- File: plugins/j2commerce/app_yourplugin/config.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<config>
    <fields name="params">
        <fieldset name="basic" label="COM_PLUGINS_BASIC_FIELDSET_LABEL">
            <field
                name="box_dimensions"
                type="Dimensions"
                addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field"
                label="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_BOX_DIMENSIONS_LABEL"
                description="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_BOX_DIMENSIONS_DESC"
            />
        </fieldset>
    </fields>
</config>
```

## Language Keys for Labels

The three dimension labels resolve from:

| Sub-field | Language key |
|-----------|-------------|
| Length | `COM_J2COMMERCE_PRODUCT_LENGTH` |
| Width | `COM_J2COMMERCE_PRODUCT_WIDTH` |
| Height | `COM_J2COMMERCE_PRODUCT_HEIGHT` |

These are always loaded from the J2Commerce component language file and are not configurable per-field.

## Related

- [VariantPrice Field](./variant-price-field.md) — Currency-prefixed price input for variants
- [ShippingMethods Field](./shipping-methods-field.md) — Dropdown of enabled shipping plugins and sub-methods
