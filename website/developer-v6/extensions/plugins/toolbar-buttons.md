---
title: "Plugin Toolbar Buttons & Internal Pages"
sidebar_label: "Toolbar Buttons"
sidebar_position: 10
description: "How to add toolbar buttons and create internal admin pages in J2Commerce plugins using Joomla 6 patterns — covers Settings, Help, and custom action buttons."
---

# Plugin Toolbar Buttons & Internal Pages

J2Commerce plugins use two separate toolbar contexts:

1. **Plugin config page** (`com_plugins&task=plugin.edit`) — toolbar buttons are injected via a custom `FormField` in the XML manifest. Only action buttons (Manage, Import, Add) belong here; Joomla already provides Save, Close, and Help.

2. **Internal pages** (`com_j2commerce&view=apps&app={plugin}&layout={page}`) — toolbar buttons are built in the plugin's `setupToolbar()` method called from `onAfterDispatch()`. The **Settings** and **Help** buttons belong here, since the user needs a way to navigate back to plugin configuration.

```
Plugin Config Page (com_plugins)         Internal Page (com_j2commerce&view=apps)
┌──────────────────────────────────┐     ┌──────────────────────────────────────────┐
│ [Manage] [Import] [Add]   [Save] │     │ [Add] [Actions▼]  ··· [Settings] [Help] │
│          ↑ FormField              │     │ ← left group →   ← right group →        │
│  Joomla provides Save/Close/Help │     │  inlinehelp() spacer creates the gap     │
└──────────────────────────────────┘     └──────────────────────────────────────────┘
```

## How Right-Alignment Works

Joomla's `media/legacy/js/toolbar.js` adds the Bootstrap `ms-auto` class to specific toolbar button wrappers at DOM ready. The priority logic:

1. If `#toolbar-inlinehelp` exists → it gets `ms-auto` (early return)
2. Else if `#toolbar-help` exists and no `#toolbar-options` → help gets `ms-auto`
3. Else if `#toolbar-options` exists → options gets `ms-auto`

**Key insight:** `ms-auto` on a flex child pushes it and all subsequent siblings to the right. To get both Settings and Help on the right side, you must call `$toolbar->inlinehelp()` before them. The `inlinehelp()` button is automatically hidden (`d-none`) when no inline help descriptions exist on the page, but it still carries the `ms-auto` class that creates the visual gap.

## Plugin Config Page: FormField Toolbar

### How It Works

When Joomla renders a plugin's configuration page, it processes the plugin's XML form fields. A custom `FormField` subclass overrides `getInput()` to inject navigation buttons into the toolbar as a side effect, returning an empty string so no visible form element appears.

Do **not** add Settings or Help buttons here — Joomla's plugin editor already provides Save/Apply/Close and its own Help button. Only add action buttons that navigate to internal pages.

### Implementation

```php
<?php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\{PluginName}\Field;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\FormField;
use Joomla\CMS\Toolbar\Button\LinkButton;
use Joomla\CMS\Toolbar\Toolbar;

class {Name}ToolbarField extends FormField
{
    protected $type = '{Name}Toolbar';

    protected function getInput(): string
    {
        $app = Factory::getApplication();

        if (!$app->isClient('administrator')) {
            return '';
        }

        $app->getLanguage()->load(
            'plg_j2commerce_{plugin_element}',
            JPATH_ADMINISTRATOR
        );

        $toolbar = Toolbar::getInstance('toolbar');

        // Prepend in REVERSE order — last prepended appears leftmost
        $manageBtn = new LinkButton('{plugin}-manage');
        $manageBtn->text('PLG_J2COMMERCE_{PLUGIN}_MANAGE')
            ->url('index.php?option=com_j2commerce&view=apps&app={plugin_element}&layout=list')
            ->icon('fa-solid fa-list');
        $toolbar->prependButton($manageBtn);

        return '';
    }

    protected function getLabel(): string
    {
        return '';
    }
}
```

### XML Manifest Registration

Add the toolbar field as the **first field** in the `basic` fieldset:

```xml
<config>
    <fields name="params">
        <fieldset name="basic" label="J2COMMERCE_BASIC_SETTINGS">
            <field
                name="{plugin}_toolbar"
                type="{Name}Toolbar"
                addfieldprefix="J2Commerce\Plugin\J2Commerce\{PluginName}\Field"
            />
            <!-- Other configuration fields follow -->
        </fieldset>
    </fields>
</config>
```

## Internal Pages: setupToolbar()

Internal pages are rendered by the plugin's `onAfterDispatch()` method. Since these pages replace the component output buffer, the plugin is responsible for building the entire toolbar — including Settings and Help buttons.

### Implementation

In the plugin's main Extension class:

```php
private function setupToolbar(string $layout): void
{
    $toolbar = Toolbar::getInstance('toolbar');
    $toolbar->setItems([]);

    switch ($layout) {
        case 'list':
            ToolbarHelper::title(
                Text::_('PLG_J2COMMERCE_{PLUGIN}_MANAGE'),
                'fa-solid fa-list'
            );
            $toolbar->linkButton('{plugin}-add', 'PLG_J2COMMERCE_{PLUGIN}_ADD')
                ->url('index.php?option=com_j2commerce&view=apps&app={element}&layout=add')
                ->icon('fa-solid fa-plus');
            break;

        case 'edit':
            ToolbarHelper::title(Text::_('PLG_J2COMMERCE_{PLUGIN}_EDIT'), 'fa-solid fa-pen');
            ToolbarHelper::apply('');
            ToolbarHelper::save('');
            ToolbarHelper::cancel('cancel');
            break;
    }

    // Right-side buttons — shared across all layouts
    // inlinehelp() gets ms-auto from toolbar.js, pushing everything after it right
    $toolbar->inlinehelp();

    // Settings button — links back to plugin configuration
    $pluginEditUrl = $this->getPluginEditUrl();

    if ($pluginEditUrl !== '') {
        $toolbar->linkButton('{plugin}-settings', 'PLG_J2COMMERCE_{PLUGIN}_SETTINGS')
            ->url($pluginEditUrl)
            ->icon('fa-solid fa-gear');
    }

    // Help button — always rightmost
    $toolbar->help('', false, 'https://docs.j2commerce.com/v6/apps/{element}');
}
```

### getPluginEditUrl() Helper

```php
private function getPluginEditUrl(): string
{
    $db      = $this->getDatabase();
    $type    = 'plugin';
    $element = '{plugin_element}';
    $folder  = 'j2commerce';

    $query = $db->getQuery(true)
        ->select($db->quoteName('extension_id'))
        ->from($db->quoteName('#__extensions'))
        ->where($db->quoteName('type') . ' = :type')
        ->where($db->quoteName('element') . ' = :element')
        ->where($db->quoteName('folder') . ' = :folder')
        ->bind(':type', $type)
        ->bind(':element', $element)
        ->bind(':folder', $folder);

    $extensionId = (int) ($db->setQuery($query, 0, 1)->loadResult() ?: 0);

    if ($extensionId <= 0) {
        return '';
    }

    return 'index.php?option=com_plugins&task=plugin.edit&extension_id=' . $extensionId;
}
```

Use a direct DB query on `#__extensions` instead of `PluginHelper::getPlugin()`. The DB query works regardless of whether the plugin is currently enabled, and avoids the `false` return value that `PluginHelper::getPlugin()` returns for disabled plugins (which causes TypeError with `strict_types=1`).

## Settings Button

The Settings button navigates the admin user from an internal plugin page back to the plugin's Joomla configuration form.

### Conventions

| Property | Value |
|---|---|
| Icon | `fa-solid fa-gear` |
| Language key | `PLG_J2COMMERCE_{PLUGIN}_SETTINGS` (custom per-plugin string) |
| Placement | Right side — after `inlinehelp()`, before Help |
| URL format | `index.php?option=com_plugins&task=plugin.edit&extension_id={id}` |

### Where NOT to Put It

Do **not** add the Settings button on the plugin config page (`com_plugins&task=plugin.edit`). That page already IS the settings page — linking to yourself is circular.

## Help Button

The Help button opens the plugin's documentation page on docs.j2commerce.com.

### Implementation

```php
$toolbar->help('', false, 'https://docs.j2commerce.com/v6/apps/{element}');
```

This renders a standard Joomla help button with the question-circle icon. Always the **rightmost** button.

### URL Patterns by Plugin Type

| Plugin type | URL pattern | Example |
|---|---|---|
| App plugin | `/v6/apps-and-extensions/apps/{element}` | `/v6/apps-and-extensions/apps/app-reviews` |
| Payment plugin | `/v6/payment/{element}` | `/v6/payment/stripe` |
| Shipping plugin | `/v6/shipping/{element}` | `/v6/shipping/standard` |
| Report plugin | `/v6/reports/{element}` | `/v6/reports/itemised` |

## Button Ordering on Internal Pages

```
[Action Buttons...]   [inlinehelp*]   [Settings]   [Help]
←── left group ──→    ← spacer →      ←── right group ──→

* inlinehelp is hidden (d-none) but carries ms-auto
```

- **Left side:** Plugin-specific action buttons — Add, Actions dropdown, Import, Back, etc.
- **Spacer:** `$toolbar->inlinehelp()` — hidden but provides `ms-auto` via toolbar.js
- **Right side:** Settings, then Help (always rightmost)

## Creating Internal Plugin Pages

Internal pages are rendered by the plugin's `onAfterDispatch()` event handler. The plugin checks the URL parameters, builds the toolbar, renders the view, and injects the HTML into the component output buffer.

### URL Structure

```
index.php?option=com_j2commerce&view=apps&app={plugin_element}&layout={layout_name}
```

### Template Files

Place layout templates in the plugin's `tmpl/` directory:

```
plugins/j2commerce/{plugin_element}/
└── tmpl/
    ├── default.php      ← Main plugin dashboard / overview
    ├── list.php         ← Internal page: list view
    ├── edit.php         ← Internal page: single item edit
    ├── import.php       ← Internal page: import tool
    └── add.php          ← Internal page: add new item
```

Each template receives `$displayData` as an array (via `FileLayout` / `PluginLayoutTrait`), not as individual variables.

### onAfterDispatch Pattern

```php
public function onAfterDispatch(): void
{
    $app   = $this->getApplication();
    $input = $app->getInput();

    if ($input->getCmd('option') !== 'com_j2commerce') {
        return;
    }

    if (!$app->isClient('administrator') || $input->getCmd('app') !== '{plugin_element}') {
        return;
    }

    $layout = $input->getCmd('layout', 'default');

    // Handle POST actions first
    if ($input->getMethod() === 'POST') {
        $this->handlePostAction($input);
        return;
    }

    // Set up toolbar for the current layout
    $this->setupToolbar($layout);

    // Render the view and inject into component buffer
    $html = $this->renderView($layout);

    if ($html !== '') {
        $app->getDocument()->setBuffer($html, 'component');
    }
}
```

## Checklist for New Plugins

When creating a new J2Commerce plugin with internal pages:

1. Create `src/Field/{Name}ToolbarField.php` — action buttons only (Manage, Add, etc.)
2. Add the field to the XML manifest's `basic` fieldset as the first field
3. In the Extension class, create `setupToolbar(string $layout)` method
4. Add action buttons inside the switch/case for each layout
5. After the switch, add shared right-side buttons in this order:
   - `$toolbar->inlinehelp()` — spacer with `ms-auto`
   - Settings button (`fa-solid fa-gear`)
   - `$toolbar->help(...)` — always last
6. Create `getPluginEditUrl()` private method using DB query on `#__extensions`
7. Add `PLG_J2COMMERCE_{PLUGIN}_SETTINGS="Settings"` to the `.ini` language file
8. All icons must use `fa-solid fa-*` format (not legacy `icon-*`)
9. Sync language strings to both plugin dir and `administrator/language/en-GB/`
