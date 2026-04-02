---
title: "Extending the Custom Field Edit Form"
sidebar_label: "Form Extension"
sidebar_position: 4
description: "How to inject additional fieldsets and tabs into the J2Commerce custom field edit form using the onJ2CommerceCustomFieldFormPrepare event."
---

# Extending the Custom Field Edit Form

The `onJ2CommerceCustomFieldFormPrepare` event fires after the core custom field edit form loads. Use it to inject additional Joomla `Form` fieldsets — each fieldset becomes an extra tab in the edit interface alongside the built-in **Basic**, **Display Settings**, and **Telephone Countries** tabs.

## When to Use

Use this event when your plugin stores per-field configuration that belongs in the custom field admin form rather than in your own plugin settings. Examples:

- A vendor management plugin adds a "Vendor Settings" tab with a field category selector (`general` / `premium vendors only`).
- A file upload plugin adds an "Upload Settings" tab with allowed extensions and maximum file size fields.

Do not use this event just to display your area's enable/disable switcher. That is handled automatically by [registering a display area](display-areas.md).

## Event Specification

| Property | Value |
|---|---|
| Event name | `onJ2CommerceCustomFieldFormPrepare` |
| Dispatched by | `CustomfieldModel::getForm()` after loading the base form |
| Argument `form` | The Joomla `Form` object — modify in place |
| Argument `data` | The current form data (object or array) |
| Response | None — modify `$form` directly using `$form->load()` |
| When fired | Every time the custom field edit form is loaded (new and edit) |

## How the Edit Template Renders Plugin Fieldsets

The custom field edit template iterates all fieldsets on the form. Core fieldsets (`basic`, `telephone_countries`, `display`) are rendered with dedicated markup. Any remaining fieldsets — including those your plugin injects — are rendered as additional tabs:

```php
// From administrator/components/com_j2commerce/tmpl/customfield/edit.php

$coreFieldsets = ['basic', 'telephone_countries', 'display'];
$allFieldsets  = $form->getFieldsets();

foreach ($allFieldsets as $fieldset) {
    if (\in_array($fieldset->name, $coreFieldsets, true)) {
        continue; // rendered separately above
    }
    echo HTMLHelper::_('uitab.addTab', 'myTab', $fieldset->name, Text::_($fieldset->label));
    echo '<div class="row">';
    foreach ($form->getFieldset($fieldset->name) as $field) {
        echo '<div class="col-md-6">' . $field->renderField() . '</div>';
    }
    echo '</div>';
    echo HTMLHelper::_('uitab.endTab');
}
```

Your fieldset's `label` attribute must be a language key.

## Complete Working Example

### Plugin Handler

```php
<?php
// File: plugins/j2commerce/app_myplugin/src/Extension/MyPlugin.php

declare(strict_types=1);

namespace Acme\Plugin\J2commerce\App_myplugin\Extension;

\defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;

final class MyPlugin extends CMSPlugin implements SubscriberInterface
{
    public $autoloadLanguage = true;

    public static function getSubscribedEvents(): array
    {
        return [
            'onJ2CommerceCustomFieldFormPrepare' => 'onCustomFieldFormPrepare',
        ];
    }

    public function onCustomFieldFormPrepare(Event $event): void
    {
        $form = $event->getArgument('form');
        // $data = $event->getArgument('data'); // available if you need current values

        $xml = '<form>
            <fieldset name="myplugin_settings"
                      label="PLG_J2COMMERCE_APP_MYPLUGIN_FIELDSET_SETTINGS">
                <field name="myplugin_field_category"
                       type="list"
                       label="PLG_J2COMMERCE_APP_MYPLUGIN_FIELD_CATEGORY"
                       description="PLG_J2COMMERCE_APP_MYPLUGIN_FIELD_CATEGORY_DESC"
                       default="">
                    <option value="">COM_J2COMMERCE_SELECT</option>
                    <option value="general">PLG_J2COMMERCE_APP_MYPLUGIN_CATEGORY_GENERAL</option>
                    <option value="premium">PLG_J2COMMERCE_APP_MYPLUGIN_CATEGORY_PREMIUM</option>
                </field>
                <field name="myplugin_required_for_checkout"
                       type="radio"
                       label="PLG_J2COMMERCE_APP_MYPLUGIN_FIELD_REQUIRED_CHECKOUT"
                       description="PLG_J2COMMERCE_APP_MYPLUGIN_FIELD_REQUIRED_CHECKOUT_DESC"
                       layout="joomla.form.field.radio.switcher"
                       filter="integer"
                       default="0">
                    <option value="0">JNO</option>
                    <option value="1">JYES</option>
                </field>
            </fieldset>
        </form>';

        $form->load(new \SimpleXMLElement($xml));
    }
}
```

### Language Strings

```ini
; File: plugins/j2commerce/app_myplugin/language/en-GB/plg_j2commerce_app_myplugin.ini

PLG_J2COMMERCE_APP_MYPLUGIN_FIELDSET_SETTINGS="My Plugin Settings"
PLG_J2COMMERCE_APP_MYPLUGIN_FIELD_CATEGORY="Field Category"
PLG_J2COMMERCE_APP_MYPLUGIN_FIELD_CATEGORY_DESC="Assign this field to a display category within the plugin."
PLG_J2COMMERCE_APP_MYPLUGIN_CATEGORY_GENERAL="General"
PLG_J2COMMERCE_APP_MYPLUGIN_CATEGORY_PREMIUM="Premium Vendors Only"
PLG_J2COMMERCE_APP_MYPLUGIN_FIELD_REQUIRED_CHECKOUT="Required for Checkout"
PLG_J2COMMERCE_APP_MYPLUGIN_FIELD_REQUIRED_CHECKOUT_DESC="Force this field to be required when used in the standard checkout."
```

## Using `$form->load()` with SimpleXMLElement

`$form->load()` accepts a `SimpleXMLElement` whose root is `<form>`. Fieldsets inside it merge with the existing form — fields are added, not replaced. If a field name already exists in a fieldset with the same name, the existing field takes precedence.

Key rules for the XML:

- The root element must be `<form>`.
- Each `<fieldset>` must have a `name` attribute. Avoid names that match core fieldsets (`basic`, `telephone_countries`, `display`).
- The `label` attribute on `<fieldset>` must be a language key. The edit template calls `Text::_()` on it.
- Field `type` attributes follow standard Joomla form field types. Custom types require `addfieldprefix` on the `<form>` element.

```php
// Using a custom field type in an injected fieldset
$xml = '<form addfieldprefix="Acme\Plugin\J2commerce\App_myplugin\Field">
    <fieldset name="myplugin_settings" label="PLG_J2COMMERCE_APP_MYPLUGIN_FIELDSET_SETTINGS">
        <field name="myplugin_color" type="ColorPicker"
               label="PLG_J2COMMERCE_APP_MYPLUGIN_FIELD_COLOR" />
    </fieldset>
</form>';

$form->load(new \SimpleXMLElement($xml));
```

## Persisting Plugin Fieldset Values

The core model saves all form fields that match columns in `#__j2commerce_customfields`. Plugin-injected fields whose names do not match real columns are silently discarded by `parent::save()`.

To persist plugin fieldset values, intercept the save flow from your own plugin controller or store the values in a separate table keyed by `j2commerce_customfield_id`. A common pattern is to serialize the plugin's fields into the `params` column if one exists on your table, similar to how `#__j2commerce_addresses` uses `params`.

## Best Practices

- Prefix all field names with your plugin identifier: `myplugin_field_category`, not just `field_category`. Field names in a Joomla form share a flat namespace.
- Use a `name` on your `<fieldset>` that is also prefixed: `myplugin_settings`. This prevents conflicts with other plugins injecting fieldsets.
- Keep injected fieldsets focused — one tab per plugin is the expected pattern. Multiple unrelated tabs degrade the admin UX.
- The event fires on every load of the edit form. Do not perform expensive operations (database queries, HTTP requests) inside the handler.

## Related

- [Display Areas](display-areas.md) — Inject a switcher into the existing Display Settings tab
- [Custom Field Types](custom-field-types.md) — Register new field types used in the form
- [Custom Fields Plugin API](index.md) — Overview and architecture
