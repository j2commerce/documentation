---
title: "Invoicetype Form Field"
sidebar_label: "Invoicetype Field"
sidebar_position: 26
description: "Developer reference for the Invoicetype custom form field — a dropdown of built-in invoice document types (invoice, receipt, packing slip) that plugins can extend via onJ2CommerceGetInvoiceTypes."
---

# Invoicetype Form Field

`InvoicetypeField` is a `ListField` subclass that renders a dropdown of document types used when creating invoice templates. Three types are built in: `invoice`, `receipt`, and `packingslip`. Plugins can register additional types via the `onJ2CommerceGetInvoiceTypes` event.

## Key Classes

| Class | File | Purpose |
|-------|------|---------|
| `InvoicetypeField` | `administrator/components/com_j2commerce/src/Field/InvoicetypeField.php` | Renders built-in types and collects plugin types |

## Built-in Types

| Value | Language Key | Display Label |
|-------|-------------|--------------|
| `invoice` | `COM_J2COMMERCE_INVOICETEMPLATE_TYPE_INVOICE` | Invoice |
| `receipt` | `COM_J2COMMERCE_INVOICETEMPLATE_TYPE_RECEIPT` | Receipt |
| `packingslip` | `COM_J2COMMERCE_INVOICETEMPLATE_TYPE_PACKINGSLIP` | Packing Slip |

## Plugin Event: `onJ2CommerceGetInvoiceTypes`

After adding the built-in types, the field dispatches `onJ2CommerceGetInvoiceTypes` to all enabled `j2commerce` plugins. Plugins receive a `types` array by reference (via `GenericEvent`) and append their custom document types.

| Detail | Value |
|--------|-------|
| Event class | `Joomla\CMS\Event\GenericEvent` |
| Event name | `onJ2CommerceGetInvoiceTypes` |
| Argument | `types` — associative array `['value' => 'LANG_KEY', ...]` |
| Plugin group | `j2commerce` |

### Registering a Custom Invoice Type

```php
// File: plugins/j2commerce/app_yourplugin/src/Extension/AppYourPlugin.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\App\YourPlugin\Extension;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;

class AppYourPlugin extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            'onJ2CommerceGetInvoiceTypes' => 'onJ2CommerceGetInvoiceTypes',
        ];
    }

    public function onJ2CommerceGetInvoiceTypes(Event $event): void
    {
        $types = $event->getArgument('types', []);
        $types['delivery_note'] = 'PLG_J2COMMERCE_APP_YOURPLUGIN_INVOICETYPE_DELIVERY_NOTE';
        $event->setArgument('types', $types);
    }
}
```

The value (e.g. `delivery_note`) is stored in the database. The language key (e.g. `PLG_J2COMMERCE_APP_YOURPLUGIN_INVOICETYPE_DELIVERY_NOTE`) is translated via `Text::_()` when building the dropdown option.

> Note: `InvoicetypeField` uses `GenericEvent` with a `types` argument passed by reference. Plugins must call `$event->setArgument('types', $types)` to return modified data — returning from the handler is silently discarded.

## XML Usage

```xml
<!-- File: administrator/components/com_j2commerce/forms/invoicetemplate.xml (excerpt) -->

<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="basic">
        <field
            name="invoice_type"
            type="Invoicetype"
            label="COM_J2COMMERCE_INVOICETEMPLATE_TYPE"
            description="COM_J2COMMERCE_INVOICETEMPLATE_TYPE_DESC"
            addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field"
            class="form-select"
            default="invoice"
            required="true"
        />
    </fieldset>
</form>
```

### XML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | — | Must be `Invoicetype` |
| `addfieldprefix` | string | — | Must be `J2Commerce\Component\J2commerce\Administrator\Field` |
| `default` | string | `invoice` | Preselected type value |
| `required` | bool | `false` | Mark field as required |
| `class` | string | — | CSS classes on the `<select>` element |

All standard Joomla `ListField` attributes also apply. The field does not support static `<option>` XML children — all options are generated in `getOptions()`.

## Where It Is Used

| Form file | Field name | Purpose |
|-----------|-----------|---------|
| `forms/invoicetemplate.xml` | `invoice_type` | Sets the document type for an invoice template record |

## How the Type Value Is Used

The stored `invoice_type` value determines which template is applied when generating a document for an order. The invoicing system queries invoice templates filtered by type and matches them against the order's payment method and status. A plugin adding a custom type should also implement the rendering logic that responds to that type value during document generation.

## Related

- [PaymentMethods Field](./payment-methods-field.md) — Filter invoice templates by payment method
- [OrderStatus Field](./orderstatus-field.md) — Filter invoice templates by order status
