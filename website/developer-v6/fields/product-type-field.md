---
title: "ProductType Form Field"
sidebar_label: "ProductType Field"
sidebar_position: 17
description: "Developer reference for the ProductType custom form field — a plugin-extensible dropdown of J2Commerce product types."
---

# ProductType Form Field

`ProductTypeField` is a `ListField` subclass that renders a dropdown of available product types. Four core types are built in. Additional types are injected at runtime through the `onJ2CommerceGetProductTypes` plugin event, so third-party app plugins can register proprietary product types without modifying core files.

## Key Classes

| Class | File | Purpose |
|-------|------|---------|
| `ProductTypeField` | `administrator/components/com_j2commerce/src/Field/ProductTypeField.php` | Renders the product-type dropdown; fires `GetProductTypes` event |
| `J2CommerceHelper` | `administrator/components/com_j2commerce/src/Helper/J2CommerceHelper.php` | Provides `plugin()->event()` dispatcher shortcut |

## Core Product Types

The following types are always present regardless of installed plugins.

| Value | Language key |
|-------|-------------|
| `simple` | `COM_J2COMMERCE_PRODUCT_TYPE_SIMPLE` |
| `variable` | `COM_J2COMMERCE_PRODUCT_TYPE_VARIABLE` |
| `configurable` | `COM_J2COMMERCE_PRODUCT_TYPE_CONFIGURABLE` |
| `downloadable` | `COM_J2COMMERCE_PRODUCT_TYPE_DOWNLOADABLE` |

The list is sorted alphabetically by translated label before being returned.

## Plugin Event: `onJ2CommerceGetProductTypes`

`ProductTypeField::getProductTypes()` fires this event after building the core list, passing `$types` by reference so plugins can append entries directly.

| Detail | Value |
|--------|-------|
| Event name | `onJ2CommerceGetProductTypes` |
| Fired by | `ProductTypeField::getProductTypes()` |
| Argument | `$types` — passed by reference (`[&$types]`) |
| Plugin group | `j2commerce` |

### Registering a Custom Product Type

```php
// File: plugins/j2commerce/app_yourplugin/src/Extension/AppYourPlugin.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\App\YourPlugin\Extension;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Language\Text;
use Joomla\Event\SubscriberInterface;

class AppYourPlugin extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            'onJ2CommerceGetProductTypes' => 'onJ2CommerceGetProductTypes',
        ];
    }

    public function onJ2CommerceGetProductTypes(\Joomla\Event\Event $event): void
    {
        $types = &$event->getArgument(0); // passed by reference as positional arg
        $types['bundle'] = Text::_('PLG_J2COMMERCE_APP_YOURPLUGIN_PRODUCT_TYPE_BUNDLE');
    }
}
```

> **Note:** `J2CommerceHelper::plugin()->event('GetProductTypes', [&$types])` passes the array as a positional argument, not a named key. Access it with `$event->getArgument(0)`.

## Caching

Options are cached in `ProductTypeField::$cachedTypes` (static property) for the lifetime of the request. Call `ProductTypeField::clearCache()` if you need to force a rebuild — for example, after programmatically installing a plugin during the same request.

```php
// File: your-script.php

use J2Commerce\Component\J2commerce\Administrator\Field\ProductTypeField;

// Force rebuild after plugin install
ProductTypeField::clearCache();
$types = ProductTypeField::getProductTypes();
```

## XML Usage

```xml
<!-- File: administrator/components/com_j2commerce/forms/product.xml (example) -->

<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="basic">
        <field
            name="product_type"
            type="ProductType"
            label="COM_J2COMMERCE_FIELD_PRODUCT_TYPE_LABEL"
            description="COM_J2COMMERCE_FIELD_PRODUCT_TYPE_DESC"
            required="true"
            default="simple"
        />
    </fieldset>
</form>
```

### XML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | — | Must be `ProductType` |
| `default` | string | — | Default selected value, e.g. `simple` |
| `required` | bool | `false` | Mark field as required |
| `multiple` | bool | `false` | Allow multi-select (uncommon; not standard usage) |

All standard Joomla `ListField` attributes (`label`, `description`, `class`, `filter`, `readonly`, `disabled`) also apply.

## Usage in Plugin Forms

When a shipping or app plugin needs to restrict configuration to specific product types, embed this field in the plugin's own `config.xml`:

```xml
<!-- File: plugins/j2commerce/app_yourplugin/config.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<config>
    <fields name="params">
        <fieldset name="basic" label="COM_PLUGINS_BASIC_FIELDSET_LABEL">
            <field
                name="applicable_product_type"
                type="ProductType"
                addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field"
                label="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_PRODUCT_TYPE_LABEL"
                description="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_PRODUCT_TYPE_DESC"
                default="simple"
            />
        </fieldset>
    </fields>
</config>
```

## Related

- [PriceCalculator Field](./price-calculator-field.md) — Dropdown populated by `onJ2CommerceGetPricingCalculators`
- [Product Types](../features/products/product-types.md) — Architecture of product type variants
