---
title: "Registering Custom Field Types"
sidebar_label: "Custom Field Types"
sidebar_position: 2
description: "How to register new custom field types in J2Commerce using the onJ2CommerceGetCustomFieldTypes, onJ2CommerceRenderCustomField, and onJ2CommerceValidateCustomField events."
---

# Registering Custom Field Types

Three events work together to add a new field type to J2Commerce:

| Event | Purpose |
|---|---|
| `onJ2CommerceGetCustomFieldTypes` | Add the type to the field type dropdown in the admin CRUD |
| `onJ2CommerceRenderCustomField` | Produce HTML for the field when rendered in a form |
| `onJ2CommerceValidateCustomField` | Validate submitted values for the field type |

## When to Use

Register a custom field type when a standard field type (text, email, textarea, radio, etc.) cannot represent the data you need. Examples: file upload for tax certificates, color picker for brand settings, product selector for upsell fields.

You do not need a custom field type to use existing fields in a new plugin area. That requires [registering a display area](display-areas.md) only.

## Core Field Types (Built-in)

The following types are handled natively by `CustomFieldHelper::renderField()`. Do not re-register these:

`text`, `email`, `tel`, `number`, `telephone`, `textarea`, `checkbox`, `radio`, `select`, `singledropdown`, `zone`, `date`, `time`, `datetime`, `wysiwyg`, `customtext`

## Event Specification

### `onJ2CommerceGetCustomFieldTypes`

| Property | Value |
|---|---|
| Event name | `onJ2CommerceGetCustomFieldTypes` |
| Dispatched by | `CustomFieldTypeField::getFieldTypes()` |
| Argument `0` | `array &$types` — map of `type_key => label string`, passed by reference |
| When fired | When the field type dropdown renders in the custom field edit form |

### `onJ2CommerceRenderCustomField`

| Property | Value |
|---|---|
| Event name | `onJ2CommerceRenderCustomField` |
| Dispatched by | `CustomFieldHelper::renderField()` — only for non-core field types |
| Argument `field` | The field object from `#__j2commerce_customfields` |
| Argument `value` | The current field value (string) |
| Argument `attrs` | Rendering attribute overrides (array) |
| Response | Call `$event->addResult($html)` with the complete column wrapper HTML |
| When fired | Each time a field with a non-core `field_type` is rendered |

### `onJ2CommerceValidateCustomField`

| Property | Value |
|---|---|
| Event name | `onJ2CommerceValidateCustomField` |
| Dispatched by | `CustomFieldHelper::validateFields()` — only for non-core field types |
| Argument `0` | `array &$errors` — map of `field_namekey => error message`, passed by reference |
| Argument `field` | The field object |
| Argument `value` | The submitted value |
| When fired | During form validation, once per non-core field |

## Complete Working Example

The following plugin class registers a `file_upload` field type. Adapt the namespace, element name, and field-specific logic to your own plugin.

### Plugin Class

```php
<?php
// File: plugins/j2commerce/app_myplugin/src/Extension/MyPlugin.php

declare(strict_types=1);

namespace Acme\Plugin\J2commerce\App_myplugin\Extension;

\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;

final class MyPlugin extends CMSPlugin implements SubscriberInterface
{
    public $autoloadLanguage = true;

    public static function getSubscribedEvents(): array
    {
        return [
            'onJ2CommerceGetCustomFieldTypes'   => 'onGetCustomFieldTypes',
            'onJ2CommerceRenderCustomField'      => 'onRenderCustomField',
            'onJ2CommerceValidateCustomField'    => 'onValidateCustomField',
        ];
    }

    /**
     * Register 'file_upload' in the field type dropdown.
     */
    public function onGetCustomFieldTypes(Event $event): void
    {
        $types = &$event->getArgument(0);
        $types['file_upload'] = Text::_('PLG_J2COMMERCE_APP_MYPLUGIN_FIELDTYPE_FILE_UPLOAD');
    }

    /**
     * Render the file_upload field as a Bootstrap 5 file input.
     */
    public function onRenderCustomField(Event $event): void
    {
        $field = $event->getArgument('field');

        if ($field->field_type !== 'file_upload') {
            return;
        }

        $value       = (string) $event->getArgument('value', '');
        $namekey     = htmlspecialchars($field->field_namekey, ENT_QUOTES, 'UTF-8');
        $label       = htmlspecialchars(Text::_($field->field_name), ENT_QUOTES, 'UTF-8');
        $colClass    = $field->field_width ?: 'col-md-6';
        $required    = (int) $field->field_required ? ' required' : '';
        $requiredBadge = (int) $field->field_required
            ? '<span class="text-danger ms-1" aria-hidden="true">*</span>'
            : '';

        $existingFile = '';
        if ($value !== '') {
            $safeValue   = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
            $existingFile = '<p class="mt-1 small text-muted">'
                . Text::_('PLG_J2COMMERCE_APP_MYPLUGIN_CURRENT_FILE') . ': '
                . '<a href="/' . $safeValue . '" target="_blank">' . $safeValue . '</a>'
                . '</p>';
        }

        $html = '<div class="' . $colClass . ' mb-3">'
            . '<label for="' . $namekey . '" class="form-label">'
            . $label . $requiredBadge
            . '</label>'
            . '<input type="file" name="' . $namekey . '" id="' . $namekey . '"'
            . ' class="form-control"' . $required . '>'
            . $existingFile
            . '</div>';

        $event->addResult($html);
    }

    /**
     * Validate the file_upload field.
     * Core required-empty check already ran; this handles type-specific rules.
     */
    public function onValidateCustomField(Event $event): void
    {
        $field = $event->getArgument('field');

        if ($field->field_type !== 'file_upload') {
            return;
        }

        $errors = &$event->getArgument(0);
        $value  = (string) $event->getArgument('value', '');

        // Example: enforce allowed extensions
        if ($value !== '') {
            $allowed = ['pdf', 'jpg', 'png'];
            $ext     = strtolower(pathinfo($value, PATHINFO_EXTENSION));

            if (!\in_array($ext, $allowed, true)) {
                $errors[$field->field_namekey] = Text::sprintf(
                    'PLG_J2COMMERCE_APP_MYPLUGIN_ERR_FILE_TYPE',
                    implode(', ', $allowed)
                );
            }
        }
    }
}
```

### Service Provider

```php
<?php
// File: plugins/j2commerce/app_myplugin/services/provider.php

\defined('_JEXEC') or die;

use Acme\Plugin\J2commerce\App_myplugin\Extension\MyPlugin;
use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\Event\DispatcherInterface;

return new class implements ServiceProviderInterface
{
    public function register(Container $container): void
    {
        $container->set(
            PluginInterface::class,
            function (Container $container) {
                $plugin = new MyPlugin(
                    $container->get(DispatcherInterface::class),
                    (array) PluginHelper::getPlugin('j2commerce', 'app_myplugin')
                );
                $plugin->setApplication(Factory::getApplication());

                return $plugin;
            }
        );
    }
};
```

## How Core Rendering Delegates to Plugins

`CustomFieldHelper::renderField()` checks whether the field's `field_type` is in its built-in list before running its switch statement. When the type is not in that list, it dispatches `onJ2CommerceRenderCustomField` and returns the first non-empty result:

```php
// From CustomFieldHelper::renderField() (simplified)
$coreTypes = ['text', 'email', 'tel', 'number', 'telephone', 'textarea',
              'checkbox', 'radio', 'select', 'singledropdown', 'zone',
              'date', 'time', 'datetime', 'wysiwyg', 'customtext'];

if (!\in_array($field->field_type, $coreTypes, true)) {
    $renderEvent = J2CommerceHelper::plugin()->event('RenderCustomField', [
        'field' => $field,
        'value' => $value,
        'attrs' => $attrs,
    ]);
    $rendered = $renderEvent->getEventResult();
    if (!empty($rendered)) {
        return \is_array($rendered) ? implode('', $rendered) : (string) $rendered;
    }
}
// Falls through to built-in switch if no plugin handled it
```

Return the **complete column wrapper HTML** including the Bootstrap column class. The caller does not wrap your output.

## Rendering Attributes

The `$attrs` argument passed to `onJ2CommerceRenderCustomField` contains optional overrides from the calling template:

| Key | Type | Description |
|---|---|---|
| `id` | string | Override the HTML element `id` (defaults to `field_namekey`) |
| `class` | string | Extra CSS classes to add to the input |
| `requiredIndicator` | string | `asterisk` or `optional` |
| `fieldStyle` | string | `normal` or `floating` |

Read these to match the look of core fields:

```php
$attrs       = $event->getArgument('attrs', []);
$id          = $attrs['id'] ?? $field->field_namekey;
$extraClass  = $attrs['class'] ?? '';
$fieldStyle  = $attrs['fieldStyle'] ?? 'normal';
$isFloating  = ($fieldStyle === 'floating');
```

## Best Practices

- Check `$field->field_type !== 'your_type'` and return early in all three handlers. Only act on your own type.
- Return the full Bootstrap column wrapper (`<div class="col-md-X mb-3">...</div>`) from the render handler. Do not return just the `<input>`.
- The core required-empty check runs before `onJ2CommerceValidateCustomField`. You only need to handle type-specific rules (file extension, mime type, range, format).
- Use `$field->field_width ?: 'col-md-6'` for the column class to respect the store owner's width setting.

## Related

- [Display Areas](display-areas.md) — Make fields appear in your plugin's form context
- [Custom Fields Plugin API](index.md) — Overview and architecture
