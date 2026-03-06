---
title: "SubtemplateField"
sidebar_label: "SubtemplateField"
sidebar_position: 38
description: "Visual card-picker field for selecting an installed and enabled J2Commerce app subtemplate, with optional thumbnail previews and an 'Auto' option."
---

# SubtemplateField

`SubtemplateField` renders a card-based visual picker that lists all installed, enabled J2Commerce app subtemplates. When subtemplate thumbnails are available, the field displays clickable preview cards; when no thumbnails exist, it falls back to a standard `<select>` dropdown. An optional **Auto** card can be prepended so the store can automatically select the best subtemplate at runtime.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `SubtemplateField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/SubtemplateField.php` |
| **Extends** | `Joomla\CMS\Form\Field\ListField` |
| **Field type string** | `Subtemplate` |

## Data Source

The field queries `OverrideRegistry::getInstalledSubtemplates()` and filters to only those with `enabled = true`. For each enabled subtemplate, the plugin's `sys.ini` language file is loaded so that the subtemplate name (`$sub['name']`) is translated via `Text::_()`.

The subtemplate data shape from `OverrideRegistry`:

```php
[
    'element'   => 'app_bootstrap5',   // plugin element name
    'name'      => 'PLG_J2COMMERCE_APP_BOOTSTRAP5',  // language key
    'enabled'   => true,
    'imagePath' => 'https://.../media/plg_j2commerce_app_bootstrap5/preview.webp',
]
```

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="display">
        <field
            name="subtemplate"
            type="Subtemplate"
            label="COM_J2COMMERCE_FIELD_SUBTEMPLATE"
            description="COM_J2COMMERCE_FIELD_SUBTEMPLATE_DESC"
            show_auto="true"
            default=""
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `name` | Yes | — | Field name. Stored value is the subtemplate element string (e.g., `app_bootstrap5`) or `auto` or `''`. |
| `type` | Yes | — | Must be `Subtemplate`. |
| `label` | Yes | — | Language key for the field label. |
| `description` | No | — | Language key for the field tooltip. |
| `show_auto` | No | `false` | When `true`, prepends an **Auto** card/option. |
| `default` | No | `''` | Pre-selected value on new records. Use `''` (empty) to default to auto behaviour. |

## Rendering Modes

### Card picker (when thumbnails are available)

When at least one enabled subtemplate has a non-empty `imagePath`:

- A hidden `<input>` holds the current value.
- Each subtemplate renders as a Bootstrap card (`width: 160px`) with a thumbnail image (`card-img-top`, `max-height: 90px`) and the translated name below.
- The selected card receives the `border-primary` CSS class.
- Clicking a card updates the hidden input via inline JavaScript and highlights the clicked card.
- Thumbnail images are resolved by replacing `.webp` with `_thumb.webp` in the `imagePath`.

### Select dropdown fallback (no thumbnails)

When no subtemplate has an `imagePath`, the field delegates to `parent::getInput()` — a standard Joomla `<select>` rendered using `ListField`.

### Auto option

When `show_auto="true"`, an Auto card is prepended with a `fa-solid fa-wand-magic-sparkles` icon and the label from `COM_J2COMMERCE_SUBTEMPLATE_AUTO`. Auto is selected by default when the stored value is `''` or `'auto'`.

## Card Click JavaScript

The card selection uses inline `onclick` with no external dependency:

```javascript
// On click:
document.getElementById('{id}').value = '{element}';
this.parentNode.querySelectorAll('.card').forEach(function(c) {
    c.classList.remove('border-primary', 'bg-light');
    c.classList.add('border-secondary-subtle');
});
this.classList.add('border-primary', 'bg-light');
this.classList.remove('border-secondary-subtle');
```

## `getOptions()` Return Value

`getOptions()` returns an array compatible with `ListField` so the field can also be used in `showon` conditions and form serialisation. Each option:

- `value` — the subtemplate element string or `auto`.
- `text` — translated subtemplate name.
- `image` (optional) — path to the subtemplate preview image.

## Related

- [TemplatelistField](./templatelist-field.md) — Dropdown listing template override folders from app plugins and the active site template
- [OverrideRegistry](../api-reference/override-registry.md) — Service that discovers installed subtemplates
