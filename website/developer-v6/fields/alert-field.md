---
title: "AlertField"
sidebar_label: "AlertField"
sidebar_position: 27
description: "Display-only Bootstrap alert box for showing informational headings and descriptions inside J2Commerce admin forms."
---

# AlertField

`AlertField` renders a Bootstrap alert box inside a Joomla admin form. It is a **display-only** field — it stores no data and submits nothing. Use it to present section headings, informational notices, or contextual callouts within a form layout.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `AlertField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/AlertField.php` |
| **Extends** | `Joomla\CMS\Form\FormField` |
| **Field type string** | `Alert` |
| **Since** | 6.0.7 |

## Behavior

The field renders a `<div class="alert ...">` with:

- An `<h3 class="alert-heading">` translated from the `label` attribute.
- An optional `<p>` paragraph translated from the `description` attribute.
- The Joomla field description element (the small help text below the field) is hidden via an inline CSS rule injected through the Web Asset Manager.

When a custom `layout` attribute is specified, the field delegates to the standard `parent::getInput()` layout rendering path instead.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="basic">
        <field
            name="pricing_info"
            type="Alert"
            label="COM_J2COMMERCE_PRICING_INFO_TITLE"
            description="COM_J2COMMERCE_PRICING_INFO_DESC"
            class="alert-info"
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Field name. Not used for data storage but required by the Joomla form system. |
| `type` | Yes | Must be `Alert`. |
| `label` | Yes | Language key translated and shown as the `<h3>` alert heading. |
| `description` | No | Language key translated and shown as a `<p>` below the heading. Omit to render the heading without bottom margin. |
| `class` | No | Bootstrap alert modifier class appended to `alert`. Typical values: `alert-info`, `alert-warning`, `alert-success`, `alert-danger`. Defaults to whatever is set (no default class is added by the field). |
| `layout` | No | If set, delegates to the named Joomla layout file instead of the built-in HTML generation. |

## Output Structure

```html
<div id="{field-id}" class="alert alert-info">
    <h3 class="alert-heading h3">Translated Heading</h3>
    <p>Translated description paragraph.</p>
</div>
```

When `description` is absent the `<h3>` receives the additional class `mb-0` to collapse bottom margin.

## Usage Notes

- **No `<input>` is rendered.** `AlertField` never appears in POST data.
- The field description tooltip (the <code>&#123;field-id&#125;-desc</code> element) is hidden automatically so it does not appear as a redundant second description.
- Apply `class="alert-warning"` for cautions, `alert-success` for confirmations, and `alert-info` (default pattern) for neutral information.
- Because the field uses `Text::_()` the `label` and `description` values must be language constant strings or plain text — raw HTML is not rendered.

## Related

- [ButtonField](./button-field.md) — UI button with onclick handler
- [PriceField](./price-field.md) — Alert variant for pricing information display
