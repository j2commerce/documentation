---
title: "PaymentMethods Form Field"
sidebar_label: "PaymentMethods Field"
sidebar_position: 22
description: "Developer reference for the PaymentMethods custom form field — a dropdown of enabled J2Commerce payment plugins, with per-plugin language file loading."
---

# PaymentMethods Form Field

`PaymentMethodsField` is a `ListField` subclass that queries `#__extensions` for all enabled plugins in the `j2commerce` group whose element name begins with `payment_`. Before each option label is rendered, the plugin's own language file is loaded so that the plugin's name constant (e.g. `PLG_J2COMMERCE_PAYMENT_CASH`) resolves to the correct translated string without requiring those strings in the component language file.

## Key Classes

| Class | File | Purpose |
|-------|------|---------|
| `PaymentMethodsField` | `administrator/components/com_j2commerce/src/Field/PaymentMethodsField.php` | Queries extensions table; loads plugin language files |

## Database Query

```sql
SELECT element AS value, name AS text
FROM #__extensions
WHERE type     = 'plugin'
  AND folder   = 'j2commerce'
  AND element  LIKE '%payment_%'
  AND enabled  = 1
ORDER BY name ASC
```

The `element` column (e.g. `payment_cash`) is used as the option value. The `name` column stores the language constant (e.g. `PLG_J2COMMERCE_PAYMENT_CASH`), which is translated only after the plugin's language file is loaded.

## Per-Plugin Language Loading

Each plugin's language file is loaded on-the-fly before the option is created:

```php
$lang->load('plg_j2commerce_' . $method->value, JPATH_PLUGINS . '/j2commerce/' . $method->value);
```

This means:
- The language file must exist at <code>plugins/j2commerce/</code><strong style={{color: '#6f42c1'}}>element</strong><code>/language/en-GB/plg_j2commerce_</code><strong style={{color: '#6f42c1'}}>element</strong><code>.ini</code>.
- If the file is absent, the raw language key appears in the dropdown.
- The standard Joomla language fallback chain applies.

## XML Usage

```xml
<!-- File: administrator/components/com_j2commerce/forms/coupon.xml (example) -->

<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="restrictions">
        <field
            name="payment_method"
            type="PaymentMethods"
            label="COM_J2COMMERCE_FIELD_PAYMENT_METHOD_LABEL"
            description="COM_J2COMMERCE_FIELD_PAYMENT_METHOD_DESC"
        />
    </fieldset>
</form>
```

### XML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | — | Must be `PaymentMethods` |
| `multiple` | bool | `false` | Allow selecting more than one payment method |
| `required` | bool | `false` | Mark field as required |
| `default` | string | — | Pre-selected element name, e.g. `payment_cash` |

All standard Joomla `ListField` attributes apply. Static `<option>` tags in the XML (e.g. for "Any method") are included before the database-sourced options via `parent::getOptions()`.

## Error Handling

If the database query throws an exception, the error is caught and an admin message is displayed using `COM_J2COMMERCE_ERROR_LOADING_PAYMENT_METHODS`. The dropdown will contain only the static options defined in XML (if any).

## Usage in Plugin Forms

Use this field in any plugin that needs to restrict its behaviour to a specific payment method:

```xml
<!-- File: plugins/j2commerce/app_yourplugin/config.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<config>
    <fields name="params">
        <fieldset name="basic" label="COM_PLUGINS_BASIC_FIELDSET_LABEL">
            <field
                name="allowed_payment_methods"
                type="PaymentMethods"
                addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field"
                label="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_PAYMENT_METHODS_LABEL"
                description="PLG_J2COMMERCE_APP_YOURPLUGIN_FIELD_PAYMENT_METHODS_DESC"
                multiple="true"
            >
                <option value="">PLG_J2COMMERCE_APP_YOURPLUGIN_OPTION_ANY_PAYMENT</option>
            </field>
        </fieldset>
    </fields>
</config>
```

## Naming Convention for Payment Plugin Elements

Payment plugin element names must match the pattern `%payment_%` (note the leading `%`) for the SQL `LIKE` filter to include them. The conventional format is:

```
payment_{provider}
```

Examples: `payment_cash`, `payment_stripe`, `payment_paypal`.

A plugin with element `mypayment_custom` would **not** appear in the dropdown because it does not match `%payment_%`. The element name must contain `payment_` as a substring.

## Related

- [ShippingMethods Field](./shipping-methods-field.md) — Equivalent field for shipping plugins
- [Payment Plugin API](../extensions/plugins/payment-plugins.md) — Building J2Commerce payment plugins
