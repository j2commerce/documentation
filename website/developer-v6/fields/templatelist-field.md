---
title: "TemplatelistField"
sidebar_label: "TemplatelistField"
sidebar_position: 39
description: "Dropdown listing available J2Commerce template folder names from installed app plugins and active site template overrides, with optional view-context filtering."
---

# TemplatelistField

`TemplatelistField` builds a dropdown of available J2Commerce template folder names by combining two sources: the `onJ2CommerceTemplateFolderList` plugin event and override directories from the active site template. It supports context filtering (`products`, `categories`, `producttags`, `product`) and an optional prefix-strip mode to simplify option labels.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `TemplatelistField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/TemplatelistField.php` |
| **Extends** | `Joomla\CMS\Form\Field\ListField` |
| **Field type string** | `Templatelist` |

## Data Sources

### Source 1 — Plugin event

`PluginHelper::importPlugin('j2commerce')` is called and the `onJ2CommerceTemplateFolderList` event is dispatched. The event carries:

```php
[
    'folders'      => [],          // populated by plugin handlers
    'view_context' => $viewContext // e.g. 'products', 'categories'
]
```

Plugin handlers add entries to `$event->getArgument('folders', [])`. Each entry may be:

- A plain string (folder name, applies to all contexts).
- An associative array `['name' => 'folder', 'contexts' => ['products', 'producttags']]`.

### Source 2 — Template overrides

The field queries `#__template_styles` for the active site template (`client_id = 0`, `home = 1`) and scans:

```
{JPATH_SITE}/templates/{template}/html/com_j2commerce/templates/
```

Each subdirectory found is analysed: presence of `default.php` maps to `products`/`producttags`/`categories` contexts; presence of `view.php` maps to the `product` context.

## Option Building

1. A leading "use default" option is always prepended (label from `empty_label` attribute, defaults to `COM_J2COMMERCE_USE_DEFAULT`).
2. Entries from both sources are merged, deduplicating by folder name and merging context arrays.
3. If `view_context` is set, entries whose context list does not include that view are removed (entries with an empty context list match all views).
4. If `strip_prefix` is `true`, additional name-based filtering is applied and folder name prefixes are stripped from labels:
   - `view_context = categories` — only `categories_*` folders; label strips `categories_` prefix.
   - `view_context = producttags` — only `tag_*` folders; label strips `tag_` prefix.
   - `view_context = products` — excludes `categories_*` and `tag_*` folders.
5. Remaining entries are sorted alphabetically and appended to the options list.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="display">
        <field
            name="product_template"
            type="Templatelist"
            label="COM_J2COMMERCE_FIELD_PRODUCT_TEMPLATE"
            description="COM_J2COMMERCE_FIELD_PRODUCT_TEMPLATE_DESC"
            view_context="products"
            strip_prefix="true"
            empty_label="COM_J2COMMERCE_USE_DEFAULT"
            default=""
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `name` | Yes | — | Field name. Stored value is a folder name string or `''`. |
| `type` | Yes | — | Must be `Templatelist`. |
| `label` | Yes | — | Language key for the field label. |
| `description` | No | — | Language key for the tooltip. |
| `view_context` | No | `''` | Filter options to this view context. Accepted values: `products`, `categories`, `producttags`, `product`. |
| `strip_prefix` | No | `false` | When `true`, strips the context-specific folder prefix from option labels and enforces strict name-based filtering. |
| `empty_label` | No | `COM_J2COMMERCE_USE_DEFAULT` | Language key for the first empty/default option. |
| `default` | No | `''` | Pre-selected value. `''` means "use default". |

## Plugin Event

App plugins that provide templates must handle `onJ2CommerceTemplateFolderList`:

```php
// File: plugins/j2commerce/app_bootstrap5/src/Extension/AppBootstrap5.php

public static function getSubscribedEvents(): array
{
    return [
        'onJ2CommerceTemplateFolderList' => 'onJ2CommerceTemplateFolderList',
    ];
}

public function onJ2CommerceTemplateFolderList(\Joomla\CMS\Event\GenericEvent $event): void
{
    $folders = $event->getArgument('folders', []);

    $folders[] = ['name' => 'app_bootstrap5', 'contexts' => ['products', 'product']];
    $folders[] = ['name' => 'categories_bootstrap5', 'contexts' => ['categories']];
    $folders[] = ['name' => 'tag_bootstrap5', 'contexts' => ['producttags']];

    $event->setArgument('folders', $folders);
}
```

## Related

- [SubtemplateField](./subtemplate-field.md) — Card-picker variant for selecting installed app subtemplates
