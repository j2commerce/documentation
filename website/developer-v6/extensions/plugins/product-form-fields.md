---
title: "Adding Fields to the Product Form Apps Tab"
sidebar_label: "Product Form Fields"
sidebar_position: 2
description: "How to add custom fields to the Apps tab in the J2Commerce product editor using the onJ2CommerceAfterDisplayProductForm event."
---

# Adding Fields to the Product Form Apps Tab

When editing a product in the J2Commerce admin, the product editor contains an **Apps** tab. App plugins contribute their own fields to this tab by handling the `onJ2CommerceAfterDisplayProductForm` event. The core renderer collects all plugin results and renders them inside collapsible accordion sections — one section per plugin.

This guide covers both the deprecated legacy approach (raw HTML template) and the current recommended approach (XML form definition).

## How the Renderer Works

The Apps tab is rendered by `administrator/components/com_j2commerce/tmpl/product/form_apps.php`. It calls:

```php
$apps = J2CommerceHelper::plugin()->eventWithAppData(
    'AfterDisplayProductForm',
    [$this, $this->item, $this->form_prefix]
);
```

Each plugin that handles `onJ2CommerceAfterDisplayProductForm` calls `$event->addResult($result)` where `$result` is an associative array. The renderer then iterates over all results and renders each one inside a Bootstrap 5 accordion item.

The result array structure accepted by the renderer is:

| Key | Type | Purpose |
|-----|------|---------|
| `element` | `string` | Plugin element name — used for CSS IDs and namespacing saved data |
| `name` | `string` | Language key for the accordion section heading |
| `description` | `string` | Language key for the subtitle shown under the heading |
| `html` | `string\|null` | Raw HTML to render, or `null` to use XML form rendering |
| `form_xml` | `string\|null` | Absolute path to the XML form definition file |
| `data` | `array` | Product params array pre-populated from `Registry::toArray()` |
| `form_prefix` | `string` | Form field name prefix, passed through from event arguments |

When `html` is `null` and `form_xml` is a valid file path, the renderer creates a Joomla `Form` object, loads the XML, binds the data, and calls `$form->renderFieldset('basic')`. When `html` contains a string, it is echoed directly (legacy behaviour). Both `html` and `form_xml` can be set simultaneously if a plugin needs to mix rendered fields with custom markup.

---

## Deprecated Method: Raw HTML Template

Before the XML form system was introduced, plugins rendered their product form fields manually in a PHP template (`tmpl/form.php`) and returned the HTML string from the event handler.

This pattern required maintaining both the PHP rendering logic and the save logic separately, and it produced inconsistent styling compared to Joomla's native form renderer.

### Legacy Event Handler

```php
// File: plugins/j2commerce/app_example/src/Extension/AppExample.php

public function AfterDisplayProductForm(Event $event): void
{
    $args        = $event->getArguments();
    $item        = $args[1] ?? null;
    $form_prefix = $args[2] ?? '';

    $platform  = J2CommerceHelper::platform();
    $registry  = $platform->getRegistry($item->params ?? '');

    $displayData = [
        'send_giftcertificate' => $registry->get('send_giftcertificate', 0),
        'gift_display_type'    => $registry->get('gift_display_type', 'joomla_desc'),
        'form_prefix'          => $form_prefix,
        'item'                 => $item,
    ];

    $layout = new FileLayout('form', JPATH_PLUGINS . '/j2commerce/' . $this->_name . '/tmpl');
    $html   = $layout->render($displayData);

    if ($event instanceof PluginEvent) {
        $event->addResult([
            'element'     => $this->_element,
            'name'        => 'PLG_J2COMMERCE_APP_EXAMPLE',
            'description' => 'PLG_J2COMMERCE_APP_EXAMPLE_DESCRIPTION',
            'html'        => $html,
            'form_xml'    => null,
            'data'        => [],
            'form_prefix' => $form_prefix,
        ]);
    }
}
```

### Legacy Template (`tmpl/form.php`)

```php
<?php
// File: plugins/j2commerce/app_example/tmpl/form.php

\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;

$form_prefix = 'jform[attribs][j2commerce]';
?>
<div class="app_example mb-4">
    <fieldset class="options-form">
        <legend><?php echo Text::_('PLG_J2COMMERCE_APP_EXAMPLE'); ?></legend>
        <div class="form-grid">
            <div class="control-group">
                <div class="control-label">
                    <label><?php echo Text::_('PLG_J2COMMERCE_APP_EXAMPLE_ENABLE_LABEL'); ?></label>
                </div>
                <div class="controls">
                    <?php echo LayoutHelper::render('joomla.form.field.list-fancy-select', [
                        'name'    => $form_prefix . '[params][enable_example]',
                        'id'      => 'example-enable',
                        'value'   => $displayData['enable_example'],
                        'options' => ['0' => Text::_('JNO'), '1' => Text::_('JYES')],
                    ]); ?>
                </div>
            </div>
        </div>
    </fieldset>
</div>
```

**Why this pattern is deprecated:**

- Manual field rendering is inconsistent with Joomla's form system.
- Save handling must be coded separately from field definitions.
- `showon` conditionals (JavaScript-driven field visibility) cannot be used.
- Adding new fields requires changes in multiple places.
- Custom field classes cannot be declared in `addfieldprefix` — they must be loaded manually.

---

## Recommended Method: XML Form Definition

The recommended approach replaces the PHP template with an XML form definition in `forms/product_form.xml`. The event handler returns `html: null` and provides the path to the XML file. The core renderer handles all field rendering, `showon` evaluation, and data binding automatically.

### Event Handler

```php
// File: plugins/j2commerce/app_example/src/Extension/AppExample.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\AppExample\Extension;

\defined('_JEXEC') or die;

use J2Commerce\Component\J2commerce\Administrator\Event\PluginEvent;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;
use Joomla\Registry\Registry;

final class AppExample extends CMSPlugin implements SubscriberInterface
{
    protected $autoloadLanguage = true;

    protected string $_element = 'app_example';

    public static function getSubscribedEvents(): array
    {
        return [
            'onJ2CommerceAfterDisplayProductForm' => 'onAfterDisplayProductForm',
        ];
    }

    public function onAfterDisplayProductForm(Event $event): void
    {
        $args        = $event->getArguments();
        $item        = $args[1] ?? null;
        $formPrefix  = $args[2] ?? '';

        $productParams = [];

        if ($item && !empty($item->params)) {
            $productRegistry = new Registry($item->params);
            $productParams   = $productRegistry->toArray();
        }

        $result = [
            'element'     => $this->_element,
            'name'        => 'PLG_J2COMMERCE_APP_EXAMPLE',
            'description' => 'PLG_J2COMMERCE_APP_EXAMPLE_DESCRIPTION',
            'html'        => null,
            'form_xml'    => JPATH_PLUGINS . '/j2commerce/' . $this->_name . '/forms/product_form.xml',
            'data'        => $productParams,
            'form_prefix' => $formPrefix,
        ];

        if ($event instanceof PluginEvent) {
            $event->addResult($result);
        }
    }
}
```

### XML Form Definition (`forms/product_form.xml`)

The fieldset name **must** be `basic` — the renderer calls `$form->renderFieldset('basic')`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<form>
    <fieldset name="basic" label="PLG_J2COMMERCE_APP_EXAMPLE">

        <field
            name="enable_example"
            type="radio"
            label="PLG_J2COMMERCE_APP_EXAMPLE_ENABLE_LABEL"
            description="PLG_J2COMMERCE_APP_EXAMPLE_ENABLE_DESC"
            layout="joomla.form.field.radio.switcher"
            filter="integer"
            default="0"
        >
            <option value="0">JNO</option>
            <option value="1">JYES</option>
        </field>

        <field
            name="display_mode"
            type="list"
            label="PLG_J2COMMERCE_APP_EXAMPLE_DISPLAY_MODE_LABEL"
            class="form-select"
            default="default"
        >
            <option value="default">PLG_J2COMMERCE_APP_EXAMPLE_MODE_DEFAULT</option>
            <option value="custom">PLG_J2COMMERCE_APP_EXAMPLE_MODE_CUSTOM</option>
        </field>

        <!-- showon hides this field unless display_mode is "custom" -->
        <field
            name="custom_note"
            type="textarea"
            label="PLG_J2COMMERCE_APP_EXAMPLE_CUSTOM_NOTE_LABEL"
            rows="3"
            class="form-control"
            showon="display_mode:custom"
        />

    </fieldset>
</form>
```

### Real-World Reference: `app_giftcertificate`

The gift certificate plugin demonstrates a simple XML form with a `showon` conditional that reveals a custom field type when a specific list value is selected.

**`forms/product_form.xml`:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<form>
    <fieldset name="basic" label="PLG_J2COMMERCE_APP_GIFTCERTIFICATE">
        <field
            name="send_giftcertificate"
            type="radio"
            label="PLG_J2COMMERCE_APP_GIFTCERTIFICATE_USE_AS_GIFTCERTIFICATE"
            description="PLG_J2COMMERCE_APP_GIFTCERTIFICATE_USE_AS_GIFTCERTIFICATE_DESC"
            layout="joomla.form.field.radio.switcher"
            filter="integer"
            default="0"
        >
            <option value="0">JNO</option>
            <option value="1">JYES</option>
        </field>

        <field
            name="gift_display_type"
            type="list"
            label="PLG_J2COMMERCE_APP_GIFTCERTIFICATE_GIFT_DISPLAY_TYPE"
            description="PLG_J2COMMERCE_APP_GIFTCERTIFICATE_GIFT_DISPLAY_TYPE_DESC"
            class="form-select"
            default="joomla_desc"
        >
            <option value="joomla_desc">PLG_J2COMMERCE_JOOMLA_DESC</option>
            <option value="field">PLG_J2COMMERCE_FIELD</option>
        </field>

        <field
            name="gift_field_name"
            type="ContentFields"
            label="PLG_J2COMMERCE_APP_GIFTCERTIFICATE_GIFT_FIELD_NAME"
            description="PLG_J2COMMERCE_APP_GIFTCERTIFICATE_GIFT_FIELD_NAME_DESC"
            class="form-select"
            showon="gift_display_type:field"
            addfieldprefix="J2Commerce\Plugin\J2Commerce\AppGiftcertificate\Field"
        />
    </fieldset>
</form>
```

The `ContentFields` type is a custom field class at `src/Field/ContentFieldsField.php`. The `showon="gift_display_type:field"` attribute hides it until the user selects `field` from the list above.

### Real-World Reference: `app_bulkdiscount`

The bulk discount plugin demonstrates simple standard fields alongside a fully custom `FormField` subclass that renders its own interactive HTML table with JavaScript.

**`forms/product_form.xml`:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<form>
    <fieldset name="basic" label="PLG_J2COMMERCE_APP_BULKDISCOUNT">
        <field
            name="enable_bulkdiscount"
            type="radio"
            label="PLG_J2COMMERCE_APP_BULKDISCOUNT_ENABLE_BULK_DISCOUNT"
            description="PLG_J2COMMERCE_APP_BULKDISCOUNT_ENABLE_BULK_DISCOUNT_DESC"
            layout="joomla.form.field.radio.switcher"
            filter="integer"
            default="0"
        >
            <option value="0">JNO</option>
            <option value="1">JYES</option>
        </field>

        <field
            name="discount_type"
            type="list"
            label="PLG_J2COMMERCE_APP_BULKDISCOUNT_PROMOTION_DISCOUNT_VALUE_TYPE"
            class="form-select"
            default="fixed_product"
        >
            <option value="fixed_product">PLG_J2COMMERCE_APP_BULKDISCOUNT_VALUE_TYPE_FIXED</option>
            <option value="percentage_cart">PLG_J2COMMERCE_APP_BULKDISCOUNT_VALUE_TYPE_PERCENTAGE</option>
        </field>

        <field
            name="bulkdiscount"
            type="BulkDiscount"
            label="PLG_J2COMMERCE_APP_BULKDISCOUNT_BULKDISCOUNT"
            addfieldprefix="J2Commerce\Plugin\J2Commerce\AppBulkdiscount\Field"
        />
    </fieldset>
</form>
```

The `BulkDiscount` type renders an add/remove rows table with JavaScript. The `addfieldprefix` attribute points to the plugin's `Field` namespace.

### Real-World Reference: `app_boxbuilderproduct`

The box builder plugin only adds fields when the current product is of type `boxbuilderproduct`. The handler returns early for all other product types. It also uses `showon` to conditionally show text fields.

```php
// File: plugins/j2commerce/app_boxbuilderproduct/src/Extension/AppBoxbuilderproduct.php

public function onAfterDisplayProductForm(Event $event): void
{
    $args       = $event->getArguments();
    $a          = $args[0] ?? null;
    $item       = $args[1] ?? null;
    $formPrefix = $args[2] ?? '';

    if (!$item || $item->product_type !== 'boxbuilderproduct') {
        return;
    }

    $registry      = $this->getRegistryObject($item->params);
    $productParams = $registry->toArray();
    $form_prefix   = $a->form_prefix ?? $formPrefix;

    $result = [
        'element'     => $this->_element,
        'name'        => 'PLG_J2COMMERCE_APP_BOXBUILDERPRODUCT',
        'description' => 'PLG_J2COMMERCE_APP_BOXBUILDERPRODUCT_DESC',
        'html'        => null,
        'form_xml'    => JPATH_PLUGINS . '/j2commerce/' . $this->_name . '/forms/product_form.xml',
        'data'        => $productParams,
        'form_prefix' => $form_prefix,
    ];

    if ($event instanceof PluginEvent) {
        $event->addResult($result);
    }
}
```

The corresponding `forms/product_form.xml` uses `showon` to reveal the singular and plural label fields only when `display_price_per_each` is enabled:

```xml
<field
    name="price_per_each_unit_singular_label"
    type="text"
    label="PLG_J2COMMERCE_APP_BOXBUILDERPRODUCT_FIELD_PPE_SINGLE_LABEL"
    class="form-control"
    showon="display_price_per_each:1"
/>
```

---

## Custom Field Types

When a standard Joomla field type (`text`, `list`, `radio`, `textarea`, `number`) is insufficient, create a custom field class in `src/Field/`.

### Naming Convention

The class file must be named `{TypeName}Field.php`. The `type` attribute in XML must match `$type` in the class. The `addfieldprefix` attribute must point to the namespace containing the class.

| XML `type` attribute | Class file | `protected $type` |
|---|---|---|
| `ContentFields` | `src/Field/ContentFieldsField.php` | `'ContentFields'` |
| `BulkDiscount` | `src/Field/BulkDiscountField.php` | `'BulkDiscount'` |
| `BoxBuilderProductSelector` | `src/Field/BoxBuilderProductSelectorField.php` | `'BoxBuilderProductSelector'` |

### List Field with Dynamic Options

Extend `ListField` and override `getOptions()` to populate options at runtime from a database query, API, or any other source.

```php
// File: plugins/j2commerce/app_example/src/Field/ExampleSelectorField.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\AppExample\Field;

\defined('_JEXEC') or die;

use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\Component\Fields\Administrator\Helper\FieldsHelper;

class ExampleSelectorField extends ListField
{
    protected $type = 'ExampleSelector';

    protected function getOptions(): array
    {
        $options = parent::getOptions();

        try {
            $fields = FieldsHelper::getFields('com_content.article');

            foreach ($fields as $field) {
                $options[] = HTMLHelper::_('select.option', (string) $field->id, $field->title);
            }
        } catch (\Exception $e) {
            // Fields component may not be available
        }

        return $options;
    }
}
```

Register it in the XML form with `addfieldprefix`:

```xml
<field
    name="my_selector"
    type="ExampleSelector"
    label="PLG_J2COMMERCE_APP_EXAMPLE_SELECTOR_LABEL"
    class="form-select"
    addfieldprefix="J2Commerce\Plugin\J2Commerce\AppExample\Field"
/>
```

### Fully Custom Field (`FormField` subclass)

For fields that render complex interactive HTML (tables, drag-and-drop, etc.), extend `FormField` directly and override `getInput()`.

```php
// File: plugins/j2commerce/app_example/src/Field/ExampleTableField.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\AppExample\Field;

\defined('_JEXEC') or die;

use Joomla\CMS\Form\FormField;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

class ExampleTableField extends FormField
{
    protected $type = 'ExampleTable';

    protected function getInput(): string
    {
        $wa = \Joomla\CMS\Factory::getApplication()->getDocument()->getWebAssetManager();
        $wa->registerAndUseScript(
            'plg_j2commerce_app_example.table',
            Uri::root() . 'media/plg_j2commerce_app_example/js/table.js',
            [],
            ['defer' => true],
            ['core']
        );

        $rows = is_array($this->value) ? $this->value : [];

        $html = ['<table class="table" id="example-table">'];
        $html[] = '<thead><tr><th>' . Text::_('PLG_J2COMMERCE_APP_EXAMPLE_COL_VALUE') . '</th></tr></thead>';
        $html[] = '<tbody>';

        foreach ($rows as $i => $row) {
            $html[] = '<tr>';
            $html[] = '<td><input type="text" name="' . $this->name . '[' . $i . '][value]"'
                . ' value="' . htmlspecialchars((string) ($row['value'] ?? ''), ENT_QUOTES, 'UTF-8') . '"'
                . ' class="form-control"></td>';
            $html[] = '</tr>';
        }

        $html[] = '</tbody></table>';

        return implode("\n", $html);
    }

    protected function getLabel(): string
    {
        return '';
    }
}
```

---

## Services Provider

Every app plugin must register itself via a `services/provider.php` file. The database must be injected when the plugin implements `DatabaseAwareTrait`.

```php
// File: plugins/j2commerce/app_example/services/provider.php

\defined('_JEXEC') or die;

use J2Commerce\Plugin\J2Commerce\AppExample\Extension\AppExample;
use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\Database\DatabaseInterface;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\Event\DispatcherInterface;

return new class () implements ServiceProviderInterface {
    public function register(Container $container): void
    {
        $container->set(
            PluginInterface::class,
            function (Container $container) {
                $plugin = new AppExample(
                    $container->get(DispatcherInterface::class),
                    (array) PluginHelper::getPlugin('j2commerce', 'app_example')
                );

                $plugin->setApplication(Factory::getApplication());
                $plugin->setDatabase($container->get(DatabaseInterface::class));

                return $plugin;
            }
        );
    }
};
```

---

## Plugin Manifest

```xml
<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" method="upgrade" group="j2commerce">
    <name>PLG_J2COMMERCE_APP_EXAMPLE</name>
    <version>1.0.0</version>
    <namespace path="src">J2Commerce\Plugin\J2Commerce\AppExample</namespace>
    <description>PLG_J2COMMERCE_APP_EXAMPLE_DESCRIPTION</description>
    <files>
        <folder plugin="app_example">services</folder>
        <folder>forms</folder>
        <folder>src</folder>
    </files>
    <media folder="media" destination="plg_j2commerce_app_example">
        <folder>js</folder>
        <folder>css</folder>
    </media>
    <languages folder="language">
        <language tag="en-GB">en-GB/plg_j2commerce_app_example.ini</language>
        <language tag="en-GB">en-GB/plg_j2commerce_app_example.sys.ini</language>
    </languages>
</extension>
```

---

## Directory Structure

```
plugins/j2commerce/app_example/
├── app_example.xml                  # Plugin manifest
├── services/
│   └── provider.php                 # DI container registration
├── src/
│   ├── Extension/
│   │   └── AppExample.php           # Main plugin class
│   └── Field/
│       └── ExampleSelectorField.php # Custom field type (optional)
├── forms/
│   └── product_form.xml             # Product editor form fields
├── tmpl/                            # Frontend display templates only
├── language/
│   └── en-GB/
│       ├── plg_j2commerce_app_example.ini
│       └── plg_j2commerce_app_example.sys.ini
└── media/                           # JS/CSS/images (optional)
    └── js/
        └── example.js
```

The `tmpl/` directory is for **frontend display templates** only. It is not used for admin product form rendering when `form_xml` is set. Legacy plugins that previously had `tmpl/form.php` can reduce that file to a placeholder comment or remove it entirely after migration.

---

## How Field Data Is Saved

Field values from the product form are submitted as part of the standard article save operation. The form control prefix (e.g., `jform[attribs][j2commerce]`) causes Joomla to nest the data under the article's `attribs` column. J2Commerce reads this on save and stores it in the product's `params` JSON column, namespaced under the plugin element name.

When the product is loaded for editing, `$productRegistry->toArray()` unpacks the JSON and the renderer calls `$form->bind($app['data'])` to pre-fill saved values.

To read the saved values in frontend code:

```php
$registry = new Registry($product->params);
$isEnabled = (bool) $registry->get('enable_example', 0);
$displayMode = $registry->get('display_mode', 'default');
```

---

## Key Rules

- **`html` must be `null`** when using XML form rendering. Setting it to any non-empty string bypasses the XML renderer and outputs raw HTML instead.
- **The fieldset name must be `basic`** — the renderer always calls `$form->renderFieldset('basic')`.
- **`form_xml` must be an absolute file path** — use `JPATH_PLUGINS . '/j2commerce/' . $this->_name . '/forms/product_form.xml'`.
- **`data` must be a plain array** — call `$registry->toArray()` before passing. Do not pass the Registry object.
- **`form_prefix` comes from event arguments** — always use `$args[2] ?? ''` rather than constructing the prefix manually.
- **`addfieldprefix` is required** for any custom field type — the attribute must be on the `<field>` element, not the `<fieldset>`.
- **`showon` works automatically** — no extra JavaScript is needed. Joomla's form renderer handles conditional field visibility natively.
- **`$this->_name`** (inherited from `CMSPlugin`) holds the plugin's element name (e.g., `app_example`) and is safe to use in `form_xml` path construction.
- **Language strings** for `name` and `description` keys must be defined in the plugin's own `.ini` file — not in the core `com_j2commerce.ini`.

---

## Migration Checklist: Legacy Template to XML Form

1. Identify all form fields rendered in `tmpl/form.php`.
2. Create `forms/product_form.xml` with a `<fieldset name="basic">` containing equivalent `<field>` elements.
3. For dynamic selects (populated from DB or API), create a `ListField` subclass in `src/Field/` and reference it with `addfieldprefix`.
4. For complex interactive fields (custom tables, drag-and-drop rows), create a `FormField` subclass in `src/Field/` and override `getInput()`.
5. Update the event handler: set `html` to `null` and add `form_xml` pointing to the new XML file.
6. Verify `data` is populated via `$registry->toArray()` so saved values load correctly.
7. Reduce `tmpl/form.php` to a placeholder or remove it — it is no longer called.
8. Confirm all field labels and descriptions have language strings in the plugin's `.ini` file.
9. Test a full create/save/reload cycle to verify data persistence.

---

## Related

- [Apps View Hook](apps-view-hook.md)
- [Payment Plugin API](../plugins/payment-plugins.md)
- [Shipping Plugin API](../plugins/shipping-plugins.md)
