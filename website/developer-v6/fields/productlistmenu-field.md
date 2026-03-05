---
title: "ProductlistmenuField"
sidebar_label: "ProductlistmenuField"
sidebar_position: 43
description: "Dropdown of J2Commerce product list (products view) menu items, used in legacy router mode to select the canonical product list URL."
---

# ProductlistmenuField

`ProductlistmenuField` builds a dropdown of all Joomla site menu items that point to the J2Commerce `products` view (`option=com_j2commerce&view=products`). It is used in legacy router mode to let the store administrator select a canonical menu item URL for product list pages.

In standard J2Commerce configuration, this field is displayed only when `router_type:legacy` via a `showon` condition — pair it with `RoutertypeField` as shown below.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `ProductlistmenuField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/ProductlistmenuField.php` |
| **Extends** | `Joomla\CMS\Form\Field\ListField` |
| **Field type string** | `Productlistmenu` |
| **Since** | 6.0.7 |

## Data Source

`getOptions()` calls `Factory::getApplication()->getMenu('site')->getMenu()` and filters for menu items where:

- `type === 'component'`
- `query['option'] === 'com_j2commerce'`
- `query['view'] === 'products'`

Each matching item contributes an option with `value = $item->id` (integer menu item ID) and `text = $item->title`. A leading empty "Select" option (`COM_J2COMMERCE_SELECT_OPTION`) is always prepended.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="routing">
        <field
            name="router_type"
            type="Routertype"
        />
        <field
            name="product_list_menuid"
            type="Productlistmenu"
            label="COM_J2COMMERCE_FIELD_PRODUCT_LIST_MENU"
            description="COM_J2COMMERCE_FIELD_PRODUCT_LIST_MENU_DESC"
            showon="router_type:legacy"
            default=""
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `name` | Yes | — | Field name. Stored value is the integer Joomla menu item ID or `''`. |
| `type` | Yes | — | Must be `Productlistmenu`. |
| `label` | Yes | — | Language key for the field label. |
| `description` | No | — | Language key for the tooltip. |
| `showon` | No | — | Typically `router_type:legacy` to hide the field when modern router is active. |
| `default` | No | `''` | Default to empty (no menu item selected). |

## Stored Value

The stored value is the Joomla **menu item ID** as a string (e.g., `"42"`). Retrieve it in PHP as:

```php
$menuId = (int) ComponentHelper::getParams('com_j2commerce')->get('product_list_menuid', 0);
$menu   = Factory::getApplication()->getMenu('site');
$item   = $menu->getItem($menuId);
```

## Error Handling

If `getMenu()` throws an exception, the field enqueues an error message using `COM_J2COMMERCE_ERROR_LOADING_MENU_ITEMS` and returns only the leading empty option.

## Usage Notes

- This field is meaningful only in **legacy router** mode. In modern router mode, SEF URLs are generated automatically from the registered menu item. Use `showon="router_type:legacy"` to hide it when not applicable.
- If no J2Commerce products menu items exist, the dropdown contains only the empty "Select" option — creating a products menu item is a prerequisite for using this field.
- The field reads live menu data at render time. Menu items created after the form was last loaded will appear immediately on next render.

## Related

- [RoutertypeField](./routertype-field.md) — Hidden field that supplies the `router_type` value for `showon`
- [RouterCategoryField](./router-category-field.md) — Router-aware category selection field
