---
title: "Template Overrides for Shipping and Payment Plugins"
sidebar_label: "Template Overrides"
sidebar_position: 5
description: "How to add the PluginSubtemplateField and PluginLayoutTrait to your shipping or payment plugin so store owners can select a layout variant and template designers can override templates."
---

# Template Overrides for Shipping and Payment Plugins

J2Commerce provides two classes that together give your shipping or payment plugin first-class template override support:

- **`PluginSubtemplateField`** — a Joomla `ListField` that auto-discovers layout subfolders and exposes them as a dropdown in the plugin's admin configuration.
- **`PluginLayoutTrait`** — a trait that resolves the correct template file at render time, respecting the chosen subfolder and any Joomla template overrides.

Adding both takes about ten minutes. Once wired in, store owners can switch between layout variants from **J2Commerce** -> **Payments** (or **Shipping**) without touching code, and template designers can drop override files into the active Joomla template.

---

## How the Resolution Chain Works

When `resolvePluginLayout('prepayment', $data)` is called, the trait builds an ordered list of search paths and hands it to Joomla's `FileLayout`:

```
templates/{active_tpl}/html/plg_{group}_{element}/{subtemplate}/   ← highest priority
plugins/{group}/{element}/tmpl/{subtemplate}/
templates/{active_tpl}/html/plg_{group}_{element}/
plugins/{group}/{element}/tmpl/                                     ← lowest priority (default)
```

The first path that contains a file named `{name}.php` wins. If no subtemplate is selected, the first two paths are omitted.

---

## Step 1: Add the Field to Your Plugin XML

Add a single `<field>` entry to the `<fieldset name="basic">` block inside your plugin's `<config>` section. Replace `your_plugin_name` with your plugin's element name (e.g., `payment_stripe`, `shipping_mycarrier`):

```xml
<field
    name="subtemplate"
    type="PluginSubtemplate"
    plugin_group="j2commerce"
    plugin_element="your_plugin_name"
    label="COM_J2COMMERCE_PLUGIN_SUBTEMPLATE"
    description="COM_J2COMMERCE_PLUGIN_SUBTEMPLATE_DESC"
    default=""
    addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field"
/>
```

The `addfieldprefix` attribute tells Joomla's form engine where to find `PluginSubtemplateField`. The `plugin_group` and `plugin_element` attributes tell the field which directories to scan — it looks in `plugins/j2commerce/your_plugin_name/tmpl/` for subfolders.

The dropdown in the admin UI will show **Default** plus the name of any subfolder discovered in `tmpl/` or in the active template's override directory.

---

## Step 2: Use the Trait in Your Extension Class

Add `use PluginLayoutTrait;` to your plugin's Extension class. You also need `$_name` and `$_type` set as shown — the trait reads both to build override paths.

```php
// File: plugins/j2commerce/payment_myplugin/src/Extension/PaymentMyplugin.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\PaymentMyplugin\Extension;

\defined('_JEXEC') or die;

use J2Commerce\Component\J2commerce\Administrator\Library\Plugins\PluginLayoutTrait;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;

final class PaymentMyplugin extends CMSPlugin implements SubscriberInterface
{
    use PluginLayoutTrait;

    protected $autoloadLanguage = true;

    protected $_name = 'payment_myplugin';   // Must match the plugin element name

    protected $_type = 'j2commerce';          // Must match the plugin group

    // ... constructor and event methods
}
```

---

## Step 3: Replace Manual Layout Loading with `resolvePluginLayout()`

Before this system existed, plugins typically contained manual `FileLayout` calls. Replace that pattern with a thin `_getLayout()` wrapper that delegates to the trait.

**Before (manual approach):**

```php
private function _getLayout(string $name, ?\stdClass $vars = null): string
{
    $layout = new FileLayout($name);
    $layout->addIncludePath(JPATH_PLUGINS . '/j2commerce/payment_myplugin/tmpl');
    return $layout->render(['vars' => $vars]);
}
```

**After (using the trait):**

```php
private function _getLayout(string $name, ?\stdClass $vars = null): string
{
    return $this->resolvePluginLayout($name, ['vars' => $vars]);
}
```

Call `_getLayout()` from your event handlers exactly as before:

```php
public function _prePayment(array $data): string
{
    $vars = new \stdClass();
    $vars->order_id            = $data['order_id'] ?? '';
    $vars->orderpayment_amount = $data['orderpayment_amount'] ?? '0.00';
    $vars->display_name        = $this->params->get('display_name', '');

    return $this->_getLayout('prepayment', $vars);
}
```

The data you pass is available in the template file as `$displayData`:

```php
// File: plugins/j2commerce/payment_myplugin/tmpl/prepayment.php

declare(strict_types=1);
defined('_JEXEC') or die;

/** @var array $displayData */
$orderId    = $displayData['vars']->order_id ?? '';
$amount     = $displayData['vars']->orderpayment_amount ?? '0.00';
$name       = $displayData['vars']->display_name ?? '';
```

---

## Step 4: Add a Framework-Specific Subfolder (Optional)

Create a subfolder inside `tmpl/` to provide an alternative layout for a specific CSS framework. The subfolder name is what appears in the admin dropdown.

```
plugins/j2commerce/payment_myplugin/
└── tmpl/
    ├── prepayment.php        ← default layout
    ├── postpayment.php
    ├── form.php
    └── bootstrap5/           ← subfolder — shown as "Bootstrap5" in the dropdown
        ├── prepayment.php    ← overrides tmpl/prepayment.php when selected
        └── postpayment.php
```

The subfolder only needs to contain files that differ from the defaults. Files not present in the subfolder fall through to the root `tmpl/` directory automatically because `FileLayout` searches paths in order.

---

## Step 5: Template Designer Overrides

Template designers can override any plugin template file without modifying the plugin. The override directory follows Joomla's standard convention:

```
templates/{active_template}/html/plg_j2commerce_payment_myplugin/
├── prepayment.php            ← overrides tmpl/prepayment.php
└── bootstrap5/               ← overrides tmpl/bootstrap5/ when selected
    └── prepayment.php
```

For a shipping plugin named `shipping_mycarrier` in the `j2commerce` group, the override path would be:

```
templates/{active_template}/html/plg_j2commerce_shipping_mycarrier/
```

Template overrides always take priority over plugin files regardless of which subtemplate is selected.

---

## Quick Reference

| What you provide | Where it goes |
|---|---|
| Default layout files | `plugins/j2commerce/{element}/tmpl/` |
| Framework-specific layouts | `plugins/j2commerce/{element}/tmpl/{subfolder}/` |
| Template override (root) | `templates/{tpl}/html/plg_j2commerce_{element}/` |
| Template override (subfolder) | `templates/{tpl}/html/plg_j2commerce_{element}/{subfolder}/` |

| Class | Namespace |
|---|---|
| `PluginSubtemplateField` | `J2Commerce\Component\J2commerce\Administrator\Field` |
| `PluginLayoutTrait` | `J2Commerce\Component\J2commerce\Administrator\Library\Plugins` |

---

## Working Example

The `payment_authorizenet` plugin is the canonical example. Its relevant parts are:

- XML field declaration: `plugins/j2commerce/payment_authorizenet/payment_authorizenet.xml`
- Trait usage and `$_name`/`$_type`: `plugins/j2commerce/payment_authorizenet/src/Extension/PaymentAuthorizenet.php`
- Default template: `plugins/j2commerce/payment_authorizenet/tmpl/prepayment.php`
- Bootstrap 5 variant: `plugins/j2commerce/payment_authorizenet/tmpl/bootstrap5/prepayment.php`

The simpler `payment_cash` plugin is also a good reference if you want a minimal implementation without extra services.

---

## Related

- [Payment Plugin API](../../features/payments/index.md)
- [Shipping Plugin API](../../features/shipping/index.md)
