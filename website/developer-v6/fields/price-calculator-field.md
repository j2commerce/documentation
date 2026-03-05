---
title: "PriceCalculator Form Field"
sidebar_label: "PriceCalculator Field"
sidebar_position: 18
description: "Developer reference for the PriceCalculator custom form field — a plugin-extensible dropdown of J2Commerce pricing calculators."
---

# PriceCalculator Form Field

`PriceCalculatorField` is a `ListField` subclass that renders a dropdown of available pricing calculator strategies. The built-in `standard` calculator is always present. Additional calculators are registered by plugins via the `onJ2CommerceGetPricingCalculators` event, which is collected and returned by `ProductHelper::getPricingCalculators()`.

## Key Classes

| Class | File | Purpose |
|-------|------|---------|
| `PriceCalculatorField` | `administrator/components/com_j2commerce/src/Field/PriceCalculatorField.php` | Renders the calculator dropdown |
| `ProductHelper` | `administrator/components/com_j2commerce/src/Helper/ProductHelper.php` | `getPricingCalculators()` — collects calculators via event |
| `J2CommerceHelper` | `administrator/components/com_j2commerce/src/Helper/J2CommerceHelper.php` | `plugin()->event()` dispatcher shortcut |

## Built-in Calculators

| Value | Language key |
|-------|-------------|
| `standard` | `COM_J2COMMERCE_PRODUCT_PRICING_CALCULATOR_STANDARD` |

## Plugin Event: `onJ2CommerceGetPricingCalculators`

`ProductHelper::getPricingCalculators()` fires this event after seeding the `standard` entry. Plugins receive the `calculators` array by named argument and append their own entries.

| Detail | Value |
|--------|-------|
| Event name | `onJ2CommerceGetPricingCalculators` |
| Fired by | `ProductHelper::getPricingCalculators()` |
| Named argument | `calculators` — the array to which plugins append |
| Plugin group | `j2commerce` |

### Registering a Custom Pricing Calculator

```php
// File: plugins/j2commerce/app_yourplugin/src/Extension/AppYourPlugin.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\App\YourPlugin\Extension;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;

class AppYourPlugin extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            'onJ2CommerceGetPricingCalculators' => 'onJ2CommerceGetPricingCalculators',
        ];
    }

    public function onJ2CommerceGetPricingCalculators(Event $event): void
    {
        $calculators = $event->getArgument('calculators', []);
        $calculators['tiered'] = Text::_('PLG_J2COMMERCE_APP_YOURPLUGIN_CALCULATOR_TIERED');
        $event->setArgument('calculators', $calculators);
    }
}
```

> `ProductHelper::getPricingCalculators()` passes the array by value as a named key (`'calculators'`). Use `$event->setArgument('calculators', ...)` to return the modified array.

## Error Handling

If `ProductHelper::getPricingCalculators()` throws an exception (e.g. during a failed plugin import), `PriceCalculatorField::getOptions()` catches it and enqueues an admin error message using `COM_J2COMMERCE_ERROR_LOADING_PRICING_CALCULATORS`. The dropdown will contain only the options already added by `parent::getOptions()` (any `<option>` tags in the field XML).

## XML Usage

```xml
<!-- File: administrator/components/com_j2commerce/forms/product.xml (example) -->

<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="pricing">
        <field
            name="pricing_calculator"
            type="PriceCalculator"
            label="COM_J2COMMERCE_FIELD_PRICING_CALCULATOR_LABEL"
            description="COM_J2COMMERCE_FIELD_PRICING_CALCULATOR_DESC"
            default="standard"
        />
    </fieldset>
</form>
```

### XML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | — | Must be `PriceCalculator` |
| `default` | string | `standard` | Preselected calculator key |
| `required` | bool | `false` | Mark field as required |

All standard Joomla `ListField` attributes also apply.

## Usage in Plugin Forms

A pricing extension plugin can expose its calculator in its own `config.xml` without touching core forms:

```xml
<!-- File: plugins/j2commerce/app_yourplugin/config.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<config>
    <fields name="params">
        <fieldset name="basic" label="COM_PLUGINS_BASIC_FIELDSET_LABEL">
            <field
                name="default_calculator"
                type="PriceCalculator"
                addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field"
                label="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_CALCULATOR_LABEL"
                description="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_CALCULATOR_DESC"
                default="standard"
            />
        </fieldset>
    </fields>
</config>
```

## Related

- [ProductType Field](./product-type-field.md) — Dropdown extended by `onJ2CommerceGetProductTypes`
- [VariantPrice Field](./variant-price-field.md) — Currency-prefixed price input for variants
- [Advanced Pricing](../features/products/advanced-pricing.md) — Price rule architecture
