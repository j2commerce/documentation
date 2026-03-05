---
title: "TemplateCustomField"
sidebar_label: "TemplateCustomField"
sidebar_position: 34
description: "Display-only informational field that renders a reference table of email template shortcodes for billing, shipping, and payment custom fields."
---

# TemplateCustomField

`TemplateCustomField` is a **display-only** field that renders a formatted reference panel inside the email template editor. It shows three tables of custom field shortcodes — billing, shipping, and payment — so template authors can copy and paste the correct `[CUSTOM_*_FIELD:NAME]` tokens without leaving the admin form.

The field stores no data. `getLabel()` returns an empty string so no label column is rendered in the form layout.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `TemplateCustomField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/TemplateCustomField.php` |
| **Extends** | `Joomla\CMS\Form\FormField` |
| **Field type string** | `TemplateCustom` |
| **Since** | 6.0.7 |

## Shortcode Reference Tables Rendered

### Billing Custom Fields

| Shortcode | Description |
|-----------|-------------|
| `[CUSTOM_BILLING_FIELD:COMPANY]` | Billing company name |
| `[CUSTOM_BILLING_FIELD:TAX_NUMBER]` | Billing tax/VAT number |
| `[CUSTOM_BILLING_FIELD:CUSTOM_NOTE]` | Billing custom note |

### Shipping Custom Fields

| Shortcode | Description |
|-----------|-------------|
| `[CUSTOM_SHIPPING_FIELD:DELIVERY_INSTRUCTIONS]` | Delivery instructions |
| `[CUSTOM_SHIPPING_FIELD:SPECIAL_HANDLING]` | Special handling requirements |
| `[CUSTOM_SHIPPING_FIELD:PREFERRED_TIME]` | Preferred delivery time |

### Payment Custom Fields

| Shortcode | Description |
|-----------|-------------|
| `[CUSTOM_PAYMENT_FIELD:PO_NUMBER]` | Purchase order number |
| `[CUSTOM_PAYMENT_FIELD:PAYMENT_REFERENCE]` | Payment reference |
| `[CUSTOM_PAYMENT_FIELD:BILLING_CONTACT]` | Billing contact name |

These shortcode names represent the custom field `field_name` values stored in `#__j2commerce_customfields`. The `EmailHelper::processTags()` method resolves them at send time.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="template_info">
        <field
            name="custom_field_reference"
            type="TemplateCustom"
        />
    </fieldset>
</form>
```

No `label` is needed — the field suppresses its own label.

## XML Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Field name. Not stored or submitted. |
| `type` | Yes | Must be `TemplateCustom`. |

All other attributes are ignored. The field content is entirely hard-coded through language strings.

## Language Keys Used

The rendered content is fully translatable. Relevant language constants include:

- `COM_J2COMMERCE_TEMPLATE_CUSTOM_FIELD_TITLE`
- `COM_J2COMMERCE_TEMPLATE_CUSTOM_FIELD_DESCRIPTION`
- `COM_J2COMMERCE_TEMPLATE_CUSTOM_FIELD_BILLING_TITLE`
- `COM_J2COMMERCE_TEMPLATE_CUSTOM_FIELD_SHIPPING_TITLE`
- `COM_J2COMMERCE_TEMPLATE_CUSTOM_FIELD_PAYMENT_TITLE`
- `COM_J2COMMERCE_TEMPLATE_CUSTOM_FIELD_SHORTCODE`
- `COM_J2COMMERCE_TEMPLATE_CUSTOM_FIELD_USAGE_TITLE`
- `COM_J2COMMERCE_TEMPLATE_CUSTOM_FIELD_USAGE_NOTE_1` through `_3`

## Usage Notes

- Place this field in the email template form just above or below the template body textarea to serve as an inline shortcode reference.
- Because `getLabel()` returns `''`, the field occupies the full form row width in Joomla's standard two-column form layout.
- The shortcode tables are illustrative examples based on common custom field names. Actual available shortcodes depend on what custom fields are configured in the store's checkout custom field settings.

## Related

- [Email Template System](../../features/orders/email-templates.md) — Full email template architecture and tag processing
