---
title: "PriceField"
sidebar_label: "PriceField"
sidebar_position: 29
description: "Display-only Bootstrap alert box used to present pricing headings and summary text inside J2Commerce admin forms."
---

# PriceField

`PriceField` renders a Bootstrap alert box for presenting pricing-related information inside a Joomla admin form. It is **structurally identical** to `AlertField` but is registered under the type string `Price`, providing a semantically distinct field type for pricing contexts such as the variant pricing panel or advanced price rule forms.

The field is **display-only** — it stores no data and submits nothing.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `PriceField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/PriceField.php` |
| **Extends** | `Joomla\CMS\Form\FormField` |
| **Field type string** | `Price` |
| **Since** | 6.0.7 |

## Behavior

The field renders a `<div class="alert ...">` containing:

- An `<h3 class="alert-heading">` translated from the `label` attribute via `Text::_()`.
- An optional `<p>` paragraph translated from the `description` attribute.
- The Joomla field description tooltip is hidden via an inline CSS rule injected through the Web Asset Manager.

When a custom `layout` attribute is specified, the field delegates to `parent::getInput()`.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="pricing">
        <field
            name="price_note"
            type="Price"
            label="COM_J2COMMERCE_VARIANT_PRICE_HEADING"
            description="COM_J2COMMERCE_VARIANT_PRICE_HEADING_DESC"
            class="alert-success"
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Field name. Required by the Joomla form system; not stored or submitted. |
| `type` | Yes | Must be `Price`. |
| `label` | Yes | Language key translated and rendered as the `<h3>` alert heading. |
| `description` | No | Language key translated and rendered as a `<p>` below the heading. When absent, `mb-0` is added to the heading to remove bottom margin. |
| `class` | No | Bootstrap alert modifier appended to `alert`. Common values: `alert-success`, `alert-info`, `alert-warning`. |
| `layout` | No | If set, delegates to the named layout file instead of the built-in HTML generation. |

## Output Structure

```html
<div id="{field-id}" class="alert alert-success">
    <h3 class="alert-heading h3">Translated Price Heading</h3>
    <p>Translated description text.</p>
</div>
```

## Usage Notes

- `PriceField` and `AlertField` produce identical HTML. The two types exist so form XML can express intent — use `Alert` for general notices and `Price` for pricing-specific headings.
- **No `<input>` is rendered.** The field never appears in POST data.
- The description tooltip (<code><strong style={{color: '#6f42c1'}}>id</strong>-desc</code>) is suppressed via injected CSS to avoid duplicate text on screen.

## Related

- [AlertField](./alert-field.md) — General-purpose Bootstrap alert display field
- [VariantPriceField](./variant-price-field.md) — Variant pricing input grid
