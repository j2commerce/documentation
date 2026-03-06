---
title: "VariantPrice Form Field"
sidebar_label: "VariantPrice Field"
sidebar_position: 19
description: "Developer reference for the VariantPrice custom form field — a currency-prefixed price input for J2Commerce product variant forms."
---

# VariantPrice Form Field

`VariantPriceField` is a `FormField` subclass that renders a Bootstrap 5 `input-group` pairing the store's currency symbol with a decimal text input. It is used on the product variant form wherever a price needs visual currency context — matching the style of the main product pricing section.

## Key Classes

| Class | File | Purpose |
|-------|------|---------|
| `VariantPriceField` | `administrator/components/com_j2commerce/src/Field/VariantPriceField.php` | Renders the currency-prefixed input |
| `CurrencyHelper` | `administrator/components/com_j2commerce/src/Helper/CurrencyHelper.php` | `getSymbol()` — returns the active store currency symbol |

## Rendered Output

The field generates a Bootstrap 5 input-group:

```html
<div class="input-group">
    <span class="input-group-text">$</span>
    <input type="text" name="jform[attribs][j2commerce][variable][123][price]"
           id="jform_attribs_j2commerce_variable_123_price"
           value="19.99"
           class="form-control"
           inputmode="decimal">
</div>
```

The currency symbol (`$`, `€`, `£`, etc.) is resolved at render time from `CurrencyHelper::getSymbol()` using the component's active currency setting.

## Supported Attributes

| Attribute | Maps to | Description |
|-----------|---------|-------------|
| `class` | `class` on `<input>` | Additional CSS classes appended after `form-control` |
| `hint` | `placeholder` on `<input>` | Placeholder text, e.g. `0.00` |
| `readonly` | `readonly` on `<input>` | Prevents editing |
| `disabled` | `disabled` on `<input>` | Disables the input |
| `required` | `required` on `<input>` | HTML5 required constraint |

The field always renders `inputmode="decimal"` to trigger the numeric keyboard on mobile devices.

## XML Usage

```xml
<!-- File: administrator/components/com_j2commerce/forms/variant.xml (example) -->

<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="pricing">
        <field
            name="price"
            type="VariantPrice"
            label="COM_J2COMMERCE_FIELD_VARIANT_PRICE_LABEL"
            description="COM_J2COMMERCE_FIELD_VARIANT_PRICE_DESC"
            hint="0.00"
            filter="float"
        />
    </fieldset>
</form>
```

### XML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | — | Must be `VariantPrice` |
| `hint` | string | — | Placeholder text shown when empty |
| `filter` | string | `string` | Recommended: `float` to sanitise numeric input |
| `required` | bool | `false` | Mark field as required |
| `readonly` | bool | `false` | Prevent value changes |
| `disabled` | bool | `false` | Disable the control |
| `class` | string | — | Additional CSS classes on `<input>` |

## Usage in Plugin Forms

Use `VariantPrice` in any plugin form where a price with the currency symbol context is needed:

```xml
<!-- File: plugins/j2commerce/app_yourplugin/config.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<config>
    <fields name="params">
        <fieldset name="basic" label="COM_PLUGINS_BASIC_FIELDSET_LABEL">
            <field
                name="minimum_order_value"
                type="VariantPrice"
                addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field"
                label="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_MIN_ORDER_LABEL"
                description="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_MIN_ORDER_DESC"
                hint="0.00"
                filter="float"
                default="0.00"
            />
        </fieldset>
    </fields>
</config>
```

## Input-Group Pattern

The Bootstrap 5 input-group pattern used here keeps label, symbol, and input visually cohesive without extra markup. When using this field inside a Joomla subform (e.g. the variant repeater), the input-group renders correctly without any additional JavaScript wiring.

## Related

- [VariantAdvancedPricing Field](./variant-advanced-pricing-field.md) — Opens the advanced pricing modal for a saved variant
- [PriceCalculator Field](./price-calculator-field.md) — Selects the pricing strategy for a product
- [Advanced Pricing](../features/products/advanced-pricing.md) — Price rule and special pricing architecture
