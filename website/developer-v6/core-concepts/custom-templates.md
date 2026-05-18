---
title: "Custom Subtemplates via Template Overrides"
sidebar_label: "Custom Subtemplates"
sidebar_position: 10
description: "Create a fully-custom J2Commerce subtemplate — product list, tag list, category list, and single-product views — using only Joomla template override directories, without writing a plugin."
---

# Custom Subtemplates via Template Overrides

J2Commerce renders its product list, tag list, category list, and single-product pages through a **subtemplate** system. A subtemplate is a named collection of PHP layout files that the view resolves at runtime. Subtemplates are normally provided by app plugins such as `app_bootstrap5` and `app_uikit`, but J2Commerce also scans the active Joomla site template's override directory and treats any valid folder there as a subtemplate — no plugin required.

This page covers the template-override path. If you need to distribute a subtemplate to multiple sites or integrate with J2Commerce events, read the plugin-based path documented in [Apps View Hook](../extensions/plugins/apps-view-hook.md) and [Frontend View Hook](../extensions/plugins/frontend-view-hook.md).

## Overview

| Approach | Portability | Asset registration | Multi-site reuse | Complexity |
|---|---|---|---|---|
| **Template override** (this page) | Site-template only | Manual, from template `index.php` | Copy override directory | Low |
| **App plugin** | Any Joomla install | Automatic via `onJ2CommerceAfterAddCSS`/`onJ2CommerceAfterAddJS` | Install the plugin | Medium |

Choose the template override approach when:

- You are customizing a single site and the subtemplate belongs to that site's design.
- You do not need to register events beyond view rendering.
- You want to avoid packaging a plugin for every markup tweak.

Choose the plugin approach when you need to ship the subtemplate to multiple sites, register custom assets automatically, or hook into `onJ2CommerceBeforeCheckout` or other J2Commerce events.

---

## How J2Commerce Resolves Subtemplates

Every J2Commerce list view reads the `subtemplate` menu parameter from `$this->params->get('subtemplate', '')`. That string is the folder name of the subtemplate to use. Resolution happens in two stages.

### Stage 1 — Plugin event

The `TemplatelistField` (which populates the subtemplate dropdown in the Joomla Menu Manager) fires the `onJ2CommerceTemplateFolderList` plugin event. App plugins respond by adding their folder names to the event argument. The `app_bootstrap5` plugin registers `bootstrap5`, `tag_bootstrap5`, and `categories_bootstrap5`; `app_uikit` registers its equivalents.

### Stage 2 — Filesystem scan

The field also queries `#__template_styles` for the active home template and scans:

```
{JPATH_SITE}/templates/{active-template}/html/com_j2commerce/templates/
```

Every subdirectory found there is treated as a potential subtemplate. Whether it appears for products, producttags, categories, or product (single) is determined by which files are present inside the folder:

- Presence of `default.php` → the folder applies to `products`, `producttags`, and `categories` contexts.
- Presence of `view.php` → the folder applies to the `product` (single-product) context.

Both sources are merged, deduplicated by folder name, and offered to the store owner in the **Subtemplate** dropdown on the menu item.

### Resolution order during a page request

When a visitor loads a product list page, the view's `display()` method runs the following sequence:

1. Read `subtemplate` from the menu `$params`.
2. Fire `eventWithHtml('ViewProductListHtml', ...)` (or the equivalent tag/category event). If any app plugin provides HTML via `$event->addResult($html)`, that HTML is used and the sequence ends.
3. If `$sublayout` is non-empty and no plugin handled the event, call `renderCustomSubtemplate()` from `CustomSubtemplateTrait`.
4. `renderCustomSubtemplate()` checks for the override directory. Primary path:
   ```
   {JPATH_SITE}/templates/{active-template}/html/com_j2commerce/templates/{sublayout}/
   ```
   Fallback path (legacy):
   ```
   {JPATH_SITE}/templates/{active-template}/html/com_j2commerce/{sublayout}/
   ```
5. If a matching directory exists, those paths are added to the view's template search list and `$this->loadTemplate()` is called to render the layout file matching the current Joomla layout name (e.g., `default.php`).
6. If no matching directory exists, `renderCustomSubtemplate()` returns `null` and `parent::display($tpl)` falls through to the component's own default template.

Views that use `CustomSubtemplateTrait`: `Producttags\HtmlView`, `Products\HtmlView`, `Product\HtmlView`, `Categories\HtmlView`.

Source files:

- `components/com_j2commerce/src/View/CustomSubtemplateTrait.php` — trait implementing steps 3–5.
- `components/com_j2commerce/src/View/Producttags/HtmlView.php` — example of the full fall-through sequence (lines 67–93).
- `components/com_j2commerce/src/View/Products/HtmlView.php` — products list equivalent (lines 186–213).
- `administrator/components/com_j2commerce/src/Field/TemplatelistField.php` — dropdown population logic.

---

## Directory Layout

Create the following structure inside your active Joomla site template. All paths are relative to the Joomla root.

```
templates/[your-template]/
    html/
        com_j2commerce/
            templates/
                [subtemplate-name]/
                    default.php           # products / producttags / categories list view
                    default_filters.php   # sidebar filter panel (optional)
                    default_sortfilter.php# sort + top filter bar (optional)
                    cart.php              # mini cart fragment (optional)
                    price.php             # price display fragment (optional)
                    view.php              # single-product page (optional)
                    view_*.php            # single-product sub-fragments (optional)
        layouts/
            com_j2commerce/
                app_[name]/               # per-item card layouts (Strategy A)
                    list/
                        category/
                            item.php
                            item_price.php
                            item_cart.php
                            item_variable.php
                            item_simple.php
                            item_downloadable.php
                            item_configurable.php
                            item_flexivariable.php
```

### Naming conventions

The folder name you choose under `templates/` drives which view contexts the subtemplate appears in, because `TemplatelistField` enforces prefix-based filtering when `strip_prefix="true"` is set on the menu form field:

| Folder name starts with | Context displayed in | Label shown in dropdown |
|---|---|---|
| `tag_` | Producttags view only | Name with `tag_` stripped |
| `categories_` | Categories view only | Name with `categories_` stripped |
| Anything else | Products view only | Full folder name |
| No prefix (contexts detected from files) | All contexts that have required files | Full folder name |

**Example:** A folder named `tag_walther` shows only in the Producttags menu item dropdown and appears there with the label `walther`. A folder named `walther` shows in the Products dropdown.

The component reads `view.php` to signal the product (single) context regardless of prefix.

---

## Step-by-Step: Create a Custom Subtemplate

This walkthrough creates a `tag_walther` subtemplate that covers the Producttags view.

### Step 1 — Decide the scope

Determine which views you want to customize:

- Producttags only → use `tag_[name]` naming, provide `default.php`.
- Categories only → use `categories_[name]` naming, provide `default.php`.
- Products list only → use any name without `tag_` or `categories_` prefix, provide `default.php`.
- Single-product → provide `view.php` (and `view_*.php` fragments as needed).
- All list views → provide `default.php` without a context-specific prefix.

### Step 2 — Create the folder

```
templates/walther/html/com_j2commerce/templates/tag_walther/
```

### Step 3 — Seed files from the reference implementation

Copy the files from `plugins/j2commerce/app_bootstrap5/tmpl/tag_bootstrap5/` as a starting point:

```
default.php                 # main list layout — copy and edit
default_filters.php         # sidebar filter panel
default_sortfilter.php      # sort + search bar
cart.php                    # add-to-cart fragment loaded by item cards
price.php                   # price fragment loaded by item cards
view.php                    # single-product page
view_*.php                  # single-product section fragments
```

For a products or categories subtemplate, use the corresponding folder `plugins/j2commerce/app_bootstrap5/tmpl/bootstrap5/` or `plugins/j2commerce/app_bootstrap5/tmpl/categories_bootstrap5/` as the seed.

### Step 4 — Customize the markup

Edit the copied files. The `default.php` you just seeded already calls `ProductLayoutService::renderProductItem()` for each product in the loop. The surrounding HTML — the grid container, filter column, pagination form — is what you customize.

The view object (`$this`) exposes:

| Property | Type | Description |
|---|---|---|
| `$this->products` | `array` | Array of product objects from the model |
| `$this->params` | `Registry` | Menu item parameters |
| `$this->pagination` | `Pagination` | Joomla pagination object |
| `$this->filters` | `array` | Filter data for sidebar (categories, price, brands) |
| `$this->active_menu` | `object\|null` | Active menu item |
| `$this->columns` | `int` | Number of grid columns from menu params |

### Step 5 — Set the menu item

1. Go to **Menus** -> **[Your Menu]** in the Joomla admin.
2. Open the menu item pointing to the products / tag / categories view.
3. Open the **J2Commerce** tab or the **Options** tab depending on your menu item type.
4. Find the **Subtemplate** dropdown. Your folder name (or stripped label) now appears in the list.
5. Select it and click **Save**.

### Step 6 — View the page

Load the front-end page. J2Commerce reads the `subtemplate` parameter, finds your override directory, adds it to the template search path, and renders `default.php` from your folder instead of the plugin's default.

---

## Per-Item Card Layouts

The `default.php` list template calls `ProductLayoutService::renderProductItem()` for each product. That method resolves which `item.php` layout file to use through its own search path, separate from the list template path. By default it points to the active plugin's own layouts directory (e.g., `plugins/j2commerce/app_bootstrap5/layouts/`).

Without intervention, item cards still render using the component-default subtemplate's `item.php` even when your custom list template is active.

There are three strategies to control this.

### Strategy A — Pin the override in your `default.php` (recommended)

Call `ProductLayoutService::setSubtemplateOverride()` before the loop and `clearSubtemplateOverride()` in a `finally` block. The override pin tells `ProductLayoutService` to resolve layouts from `templates/[your-template]/html/layouts/com_j2commerce/app_[name]/`.

```php
<?php
// File: templates/walther/html/com_j2commerce/templates/tag_walther/default.php

declare(strict_types=1);

defined('_JEXEC') or die;

use J2Commerce\Component\J2commerce\Site\Service\ProductLayoutService;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;

/** @var \J2Commerce\Component\J2commerce\Site\View\Producttags\HtmlView $this */

$itemId  = isset($this->active_menu->id) ? (int) $this->active_menu->id : 0;
$columns = (int) $this->params->get('list_no_of_columns', 3);
$colClass = 'col-12 col-md-' . (int) round(12 / $columns);

ProductLayoutService::setSubtemplateOverride('walther');

try {
    ?>
    <div class="j2commerce j2commerce-product-list walther">

        <?php if ($this->params->get('show_page_heading')) : ?>
            <h1 class="page-header"><?php echo $this->escape($this->params->get('page_heading')); ?></h1>
        <?php endif; ?>

        <?php if (!empty($this->products)) : ?>
            <div class="row g-4 mb-4">
                <?php foreach ($this->products as $product) : ?>
                    <div class="<?php echo $colClass; ?>">
                        <?php echo ProductLayoutService::renderProductItem(
                            $product,
                            $this->params,
                            ProductLayoutService::CONTEXT_LIST . '.tag',
                            $itemId
                        ); ?>
                    </div>
                <?php endforeach; ?>
            </div>

            <nav aria-label="<?php echo Text::_('JLIB_HTML_PAGINATION'); ?>">
                <?php echo $this->pagination->getPagesLinks(); ?>
            </nav>
        <?php else : ?>
            <div class="alert alert-info">
                <?php echo Text::_('COM_J2COMMERCE_NO_PRODUCTS_FOUND'); ?>
            </div>
        <?php endif; ?>

    </div>
    <?php
} finally {
    ProductLayoutService::clearSubtemplateOverride();
}
```

The argument to `setSubtemplateOverride()` is the short name (`walther`) or the plugin element name (`app_walther`). `ProductLayoutService::mapSubtemplateToPluginFolder()` handles both forms and also strips the `tag_` prefix automatically, so `tag_walther` also works.

The layout search path resolved when the override is `walther`:

1. `templates/walther/html/layouts/com_j2commerce/app_walther/` — your template override (highest priority)
2. `components/com_j2commerce/layouts/app_walther/` — component source (rarely populated for custom names)
3. `plugins/j2commerce/app_walther/layouts/` — the plugin's own layouts (only exists when the matching plugin is installed)

If none of those directories exist, `FileLayout` falls back to its default search path which includes the component's `layouts/` directory.

Always wrap the loop in `try`/`finally` to clear the static override. Failing to call `clearSubtemplateOverride()` leaks the pin into subsequent rendering calls on the same request.

### Strategy B — Bypass `ProductLayoutService` entirely

Call `FileLayout` directly with explicit paths if you need full control over layout file resolution and do not want `ProductLayoutService`'s search-path logic involved.

```php
<?php
use Joomla\CMS\Layout\FileLayout;

$layout = new FileLayout('list.category.item');
$layout->setIncludePaths([
    JPATH_SITE . '/templates/walther/html/layouts/com_j2commerce/app_walther',
]);

foreach ($this->products as $product) {
    echo $layout->render([
        'product' => $product,
        'params'  => $this->params,
        'context' => 'list',
        'itemId'  => $itemId,
    ]);
}
```

This gives the most control but requires you to manage the full `$displayData` array that `item.php` expects.

### Strategy C — Inherit existing item cards

If the surrounding list chrome is all you want to change, omit the override entirely. Item cards continue to render through whichever plugin the store's global **Subtemplate** configuration selects. This is cheapest when the card design is already acceptable and you only need to customize the grid, filters, or page heading.

---

## CSS and JavaScript Assets

Without a plugin, no `onJ2CommerceAfterAddCSS` or `onJ2CommerceAfterAddJS` event fires for your subtemplate. You must register assets yourself.

### Option 1 — Register from the site template's `index.php`

This approach loads your J2Commerce styles and scripts on every page:

```php
<?php
// File: templates/walther/index.php (inside the template's rendering logic)

$wa = $this->getWebAssetManager();

$wa->registerAndUseStyle(
    'tpl_walther.j2c',
    'templates/walther/css/j2commerce.css'
);
$wa->registerAndUseScript(
    'tpl_walther.j2c',
    'templates/walther/js/j2commerce.js',
    [],
    ['defer' => true]
);
```

### Option 2 — Register from your `default.php`

Scope asset registration to pages that use your subtemplate:

```php
<?php
// Inside templates/walther/html/com_j2commerce/templates/tag_walther/default.php

use Joomla\CMS\Factory;

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->registerAndUseStyle('tpl_walther.j2c', 'templates/walther/css/j2commerce.css');
$wa->registerAndUseScript(
    'tpl_walther.j2c',
    'templates/walther/js/j2commerce.js',
    [],
    ['defer' => true]
);
```

Always use `registerAndUseStyle`/`registerAndUseScript` with direct media paths. Do not use `useStyle()`/`useScript()` that references a `joomla.asset.json` pre-registered asset name — those calls fail silently.

---

## Subtemplate Discovery

The **Subtemplate** dropdown on a J2Commerce menu item is populated by `TemplatelistField`, which runs at admin form load time. Discovery happens in two steps every time the menu item edit form opens.

1. The `onJ2CommerceTemplateFolderList` plugin event is fired. Enabled app plugins append their folder names.
2. The field queries `#__template_styles` for `client_id = 0` and `home = 1` to find the active site template name, then scans `{JPATH_SITE}/templates/{template}/html/com_j2commerce/templates/` for subdirectories.

Each subdirectory is inspected:

- `default.php` present → the folder is registered for `products`, `producttags`, and `categories` contexts.
- `view.php` present → the folder is registered for the `product` (single-product) context.

When the menu item uses `view_context="producttags"` and `strip_prefix="true"` (the J2Commerce default for producttags menu items), only folders beginning with `tag_` are shown, and the `tag_` prefix is stripped from the label. This means your `tag_walther` folder appears in the dropdown with the label `walther`.

Because discovery is filesystem-based, your folder appears automatically as soon as you create it. No cache clearing or event registration is needed.

---

## Worked Example: `tag_walther`

This example delivers a minimal custom subtemplate for the Producttags view. The item card uses a simple Bootstrap card without tabs or accordions.

### Final directory tree

```
templates/walther/
    html/
        com_j2commerce/
            templates/
                tag_walther/
                    default.php
                    default_filters.php     (copied from app_bootstrap5, unmodified)
                    default_sortfilter.php  (copied from app_bootstrap5, unmodified)
        layouts/
            com_j2commerce/
                app_walther/
                    list/
                        category/
                            item.php
                            item_simple.php
                            item_variable.php
                            item_downloadable.php
                            item_configurable.php
                            item_flexivariable.php
                            item_price.php
                            item_cart.php
    css/
        j2commerce.css
```

### `default.php` — list loop with Strategy A pinning

```php
<?php
// File: templates/walther/html/com_j2commerce/templates/tag_walther/default.php

declare(strict_types=1);

defined('_JEXEC') or die;

use J2Commerce\Component\J2commerce\Site\Service\ProductLayoutService;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;

/** @var \J2Commerce\Component\J2commerce\Site\View\Producttags\HtmlView $this */

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->registerAndUseStyle('tpl_walther.j2c', 'templates/walther/css/j2commerce.css');

$itemId   = isset($this->active_menu->id) ? (int) $this->active_menu->id : 0;
$columns  = (int) $this->params->get('list_no_of_columns', 3);
$colClass = 'col-12 col-sm-6 col-lg-' . (int) round(12 / $columns);

ProductLayoutService::setSubtemplateOverride('walther');

try {
    ?>
    <div class="j2commerce walther-product-list">

        <?php if ($this->params->get('show_page_heading')) : ?>
            <h1><?php echo $this->escape($this->params->get('page_heading')); ?></h1>
        <?php endif; ?>

        <?php if ($this->params->get('list_show_top_filter', 1)) : ?>
            <?php echo $this->loadTemplate('sortfilter'); ?>
        <?php endif; ?>

        <?php if (!empty($this->products)) : ?>
            <div class="row g-3 mt-2">
                <?php foreach ($this->products as $product) : ?>
                    <div class="<?php echo $colClass; ?>">
                        <?php echo ProductLayoutService::renderProductItem(
                            $product,
                            $this->params,
                            ProductLayoutService::CONTEXT_LIST . '.tag',
                            $itemId
                        ); ?>
                    </div>
                <?php endforeach; ?>
            </div>

            <nav class="mt-4" aria-label="<?php echo Text::_('JLIB_HTML_PAGINATION'); ?>">
                <?php echo $this->pagination->getPagesLinks(); ?>
            </nav>
        <?php else : ?>
            <p class="alert alert-info">
                <?php echo Text::_('COM_J2COMMERCE_NO_PRODUCTS_FOUND'); ?>
            </p>
        <?php endif; ?>

    </div>
    <?php
} finally {
    ProductLayoutService::clearSubtemplateOverride();
}
```

### `list/category/item.php` — simple Bootstrap card

```php
<?php
// File: templates/walther/html/layouts/com_j2commerce/app_walther/list/category/item.php

declare(strict_types=1);

defined('_JEXEC') or die;

use J2Commerce\Component\J2commerce\Site\Service\ProductLayoutService;
use Joomla\CMS\Language\Text;

/** @var array $displayData */

$product     = $displayData['product'];
$params      = $displayData['params'];
$productLink = $displayData['productLink'];
$showImage   = $displayData['showImage'];
$showTitle   = $displayData['showTitle'];
$showPrice   = $displayData['showPrice'];
$showCart    = $displayData['showCart'];
?>
<div class="card h-100 border-0 shadow-sm">

    <?php if ($showImage && !empty($product->product_thumb_image)) : ?>
        <a href="<?php echo $productLink; ?>" class="card-img-top-link">
            <img
                src="<?php echo $product->product_thumb_image; ?>"
                alt="<?php echo $this->escape($product->product_name ?? ''); ?>"
                class="card-img-top"
                loading="lazy"
            />
        </a>
    <?php endif; ?>

    <div class="card-body d-flex flex-column">

        <?php if ($showTitle) : ?>
            <h3 class="card-title fs-6">
                <a href="<?php echo $productLink; ?>">
                    <?php echo $this->escape($product->product_name ?? ''); ?>
                </a>
            </h3>
        <?php endif; ?>

        <?php if ($showPrice) : ?>
            <div class="mt-auto mb-2">
                <?php echo ProductLayoutService::renderLayout('list.category.item_price', $displayData); ?>
            </div>
        <?php endif; ?>

        <?php if ($showCart) : ?>
            <?php echo ProductLayoutService::renderLayout('list.category.item_' . strtolower($product->product_type ?? 'simple'), $displayData); ?>
        <?php endif; ?>

    </div>
</div>
```

When a visitor opens the Producttags menu item with `tag_walther` selected as the subtemplate, they see a responsive Bootstrap grid of product cards. Each card contains the product image, title, price, and an add-to-cart control — rendered entirely from the template override files with no active `app_walther` plugin required.

---

## When to Build a Plugin Instead

Use the plugin-based approach when any of the following apply:

- You need to distribute the subtemplate to multiple Joomla installs or sell it as an extension package.
- You need automatic CSS/JS registration via `onJ2CommerceAfterAddCSS` or `onJ2CommerceAfterAddJS`.
- You need to hook into `onJ2CommerceBeforeCheckout`, `onJ2CommerceTemplateFolderList`, or any other J2Commerce event beyond view rendering.
- You want your item card layouts (`list/category/item.php`) to be resolvable via the component source path (`components/com_j2commerce/layouts/app_yourplugin/`) rather than the template override path.
- You want your subtemplate to appear in the **SubtemplateField** visual card-picker (which reads `OverrideRegistry::getInstalledSubtemplates()` — populated by plugins, not filesystem scans).
- You are building a product for the J2Commerce extension ecosystem.

See [Apps View Hook](../extensions/plugins/apps-view-hook.md) and [Frontend View Hook](../extensions/plugins/frontend-view-hook.md) for the plugin-based path.

---

## Troubleshooting

### Subtemplate does not appear in the menu item dropdown

- Confirm the folder exists at `templates/[active-template]/html/com_j2commerce/templates/[name]/`.
- Confirm the active template is correct. "Active" means `home = 1` in `#__template_styles` for `client_id = 0`. If the site has multiple style variants, verify the home style matches your development template.
- Confirm the required file is present: `default.php` for list/tag/category contexts, `view.php` for single-product context.
- Clear Joomla's cache and reload the menu item edit form.

### Markup from your `default.php` loads but item cards look like Bootstrap 5

The item card layout (`list/category/item.php`) is resolved by `ProductLayoutService` separately from the list template. Without calling `setSubtemplateOverride('walther')` in your `default.php`, the service falls back to the store's global default subtemplate for item cards. Add the `try`/`finally` override block from Strategy A.

### "Missing template" alert appears inside the product grid area

The fallback layout `fallback.missing_template` has been rendered. This means `renderCustomSubtemplate()` found your directory but `$this->loadTemplate()` could not find the file matching the current Joomla layout name. Check that your file is named `default.php` (for the default layout) or matches the exact string returned by `$this->getLayout()`. A missing `default.php` inside the subtemplate folder triggers this.

### CSS is not loading

No plugin is active for your subtemplate, so no `onJ2CommerceAfterAddCSS` fires. Register your stylesheet from inside `default.php` or from the template's `index.php` using `registerAndUseStyle`. See the CSS/JavaScript Assets section above.

### Override is silently ignored

The `subtemplate` menu parameter is case-sensitive. If the dropdown stored `tag_Walther` but the folder is named `tag_walther`, the directory check fails on case-sensitive filesystems (Linux). On Windows the match is case-insensitive during development but fails in Linux production environments. Always use lowercase folder names.
