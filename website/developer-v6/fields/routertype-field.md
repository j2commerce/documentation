---
title: "RoutertypeField"
sidebar_label: "RoutertypeField"
sidebar_position: 42
description: "Hidden field that outputs the active J2Commerce SEF router type (modern or legacy) for use in showon conditions."
---

# RoutertypeField

`RoutertypeField` extends Joomla's `HiddenField` to inject the current J2Commerce SEF router type as the field value. The rendered `<input type="hidden">` carries either `modern` or `legacy`. Its only purpose is to act as a **dependency target** for Joomla `showon` conditions on sibling fields — it stores nothing meaningful and is never read back during form save.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `RoutertypeField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/RoutertypeField.php` |
| **Extends** | `Joomla\CMS\Form\Field\HiddenField` |
| **Field type string** | `Routertype` |
| **Since** | 6.0.7 |

## Behavior

`getInput()` reads `ComponentHelper::getParams('com_j2commerce')->get('sef_router', 'modern')`, assigns the result to `$this->value`, then calls `parent::getInput()`. The rendered output is a standard Joomla hidden input:

```html
<input type="hidden" name="jform[router_type]" id="jform_router_type" value="modern"/>
```

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="routing">
        <!-- The hidden dependency field -->
        <field
            name="router_type"
            type="Routertype"
        />

        <!-- Only shown when legacy router is active -->
        <field
            name="product_list_menu"
            type="Productlistmenu"
            label="COM_J2COMMERCE_FIELD_PRODUCT_LIST_MENU"
            showon="router_type:legacy"
        />

        <!-- Only shown when modern router is active -->
        <field
            name="catid"
            type="RouterModalCategory"
            label="JGLOBAL_CHOOSE_CATEGORY_LABEL"
            showon="router_type:modern"
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Field name. Must match the `showon` reference in sibling fields (e.g. `router_type`). |
| `type` | Yes | Must be `Routertype`. |

No other attributes are used. `label` is ignored since this is a hidden field.

## showon Values

| Value | Meaning |
|-------|---------|
| `modern` | Active when `sef_router` parameter is `modern` (the default). |
| `legacy` | Active when `sef_router` parameter is `legacy`. |

## Usage Notes

- Place this field **before** any sibling fields that use `showon="router_type:..."`. Joomla evaluates `showon` by field name, so the hidden field must exist in the rendered form.
- The field does not need to be in the same fieldset as its dependants — `showon` works across fieldsets in the same form.
- Because the field value is set from component params at render time and is not user-editable, it is immune to tampering via form submission.

## Related

- [RouterCategoryField](./router-category-field.md) — Category field that respects router mode
- [RouterModalCategoryField](./router-modal-category-field.md) — Modal category field that delegates based on router mode
- [ProductlistmenuField](./productlistmenu-field.md) — Legacy-only menu item selector, typically shown with `showon="router_type:legacy"`
