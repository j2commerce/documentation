---
title: "onJ2CommerceRenderAjaxProductListGrid Event"
sidebar_label: "AJAX Product List Grid Event"
sidebar_position: 20
description: "How subtemplate plugins implement onJ2CommerceRenderAjaxProductListGrid to keep AJAX-filtered product grids visually consistent with the initial server render."
---

# onJ2CommerceRenderAjaxProductListGrid

The `onJ2CommerceRenderAjaxProductListGrid` event gives subtemplate plugins the opportunity to emit framework-specific product grid markup during an AJAX filter request. It fires inside `ProductsController::renderProducts()`, which is called by the `products.filter` AJAX endpoint. When a plugin handles the event and calls `$event->addResult($html)`, the returned string is sent as the `products` key in the JSON response and the JavaScript filter engine swaps it into the DOM.

---

## Why This Event Exists

### The AJAX vs. initial-render divergence problem

The initial product list page is rendered by the Joomla MVC view chain. The active subtemplate plugin intercepts `onJ2CommerceViewProductListHtml`, loads its own template files, and produces markup that uses framework-specific grid classes. For example, the `app_uikit` plugin wraps each row in `uk-grid uk-grid-medium uk-child-width-1-2@s uk-margin-bottom` and attaches `uk-grid` attributes.

Before this event existed, the AJAX filter endpoint (`task=products.filter&format=json`) hardcoded Bootstrap 5 grid markup regardless of the active subtemplate:

```php
// Before — hardcoded in the controller, bypassed the view chain
echo '<div class="j2commerce-products-row row g-4 mb-4">';
foreach ($items as $product) {
    echo '<div class="' . $colClass . '">';
    // ...
}
echo '</div>';
```

On a site using `app_uikit` exclusively — no Bootstrap CSS loaded — this hardcoded output rendered products in a vertical stack after every AJAX filter interaction. The initial page render looked correct because `app_uikit` handled it through the view chain; the AJAX-replaced HTML was structurally wrong.

### The fix: dispatch to the active subtemplate plugin

The `renderProducts()` method dispatches `onJ2CommerceRenderAjaxProductListGrid`. Subtemplate plugins listen for the event, gate on the `subtemplate` parameter to confirm they are the active renderer, and emit their own framework markup. The controller uses the plugin result when non-empty; it falls back to Bootstrap 5 markup when no plugin responds (for example, when no specific subtemplate is configured).

```php
// After — controller defers to the plugin event
$event = J2CommerceHelper::plugin()->eventWithHtml('RenderAjaxProductListGrid', [$items, $params, $itemId]);
$html  = $event->getArgument('html', '');

if (!empty($html)) {
    return $html; // plugin provided framework-specific markup
}

// Fall back to Bootstrap 5 grid
```

---

## Event Signature

**Event name:** `onJ2CommerceRenderAjaxProductListGrid`

**Dispatcher call:**
```php
J2CommerceHelper::plugin()->eventWithHtml('RenderAjaxProductListGrid', [$items, $params, $itemId])
```

The dispatcher prepends the `onJ2Commerce` prefix automatically. The short name passed to `eventWithHtml()` is `RenderAjaxProductListGrid`.

**Arguments (positional):**

| Index | Type | Description |
|-------|------|-------------|
| `args[0]` | `array` | Product objects from the model (`$model->getItems()`). Each element is a `stdClass` with product fields including `params` as a `Registry`. |
| `args[1]` | `Joomla\Registry\Registry` | Merged menu item and application parameters. Contains `subtemplate`, `list_no_of_columns`, `page_limit`, and all other J2Commerce menu params. |
| `args[2]` | `int` | The active menu item ID (`Itemid`). Pass this to `ProductLayoutService::renderProductItem()` so per-item layouts resolve the correct menu context. |

**Return convention:**

Handlers MUST call `$event->addResult($html)` to provide HTML. Calling `$event->setArgument('html', $html)` or writing to a local-by-reference variable is silently discarded.

> **Why `addResult()` is required:** `eventWithHtml()` collects plugin results by reading the `result` array via `$eventObject->getArgument('result', [])`. The Joomla event dispatcher accumulates calls to `addResult()` into that array. Any other mechanism bypasses the collection and the `html` key on the returned event object will be empty, producing a blank product area in the AJAX response.

Source: `administrator/components/com_j2commerce/src/Helper/PluginHelper.php`, `eventWithHtml()` method (lines 418–450).

---

## When You Must Implement This Hook

Implement `onJ2CommerceRenderAjaxProductListGrid` whenever you author a new subtemplate plugin that uses a CSS framework other than Bootstrap 5. Specifically:

- Your plugin registers `onJ2CommerceViewProductListHtml` and emits custom grid markup for the initial page render.
- The active site template does not load Bootstrap 5 CSS (UIkit, Tailwind, or a bespoke framework).
- The grid layout depends on CSS classes that are absent from the Bootstrap 5 fallback (e.g., UIkit's `uk-grid` attribute, Tailwind flex utilities).

If you skip this hook, every AJAX filter interaction replaces the plugin's correctly-structured grid with Bootstrap 5 markup. On a UIkit-only site, the result is an unstyled vertical list.

---

## When You Do Not Need This Hook

Do not implement `onJ2CommerceRenderAjaxProductListGrid` if:

- Your plugin wraps or extends the `bootstrap5` subtemplate and inherits its Bootstrap 5 grid classes. The controller's Bootstrap 5 fallback already produces the correct markup.
- Your subtemplate customizes only the single-product page (`onJ2CommerceViewProductHtml`) and has no product list involvement.
- Your plugin customizes only per-item card layouts via `ProductLayoutService` without changing the outer grid wrapper.

The Bootstrap 5 fallback is the canonical default for all sites where no plugin claims the event.

---

## Canonical Handler

The following is a complete, working handler based on `app_bootstrap5::onRenderAjaxProductListGrid()` from `plugins/j2commerce/app_bootstrap5/src/Extension/AppBootstrap5.php` (lines 91–132). Adapt it for your framework.

```php
<?php
// File: plugins/j2commerce/app_yourplugin/src/Extension/AppYourPlugin.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\AppYourPlugin\Extension;

use J2Commerce\Component\J2commerce\Site\Service\ProductLayoutService;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;
use Joomla\Registry\Registry;

\defined('_JEXEC') or die;

final class AppYourPlugin extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            // ... other events ...
            'onJ2CommerceRenderAjaxProductListGrid' => 'onRenderAjaxProductListGrid',
        ];
    }

    public function onRenderAjaxProductListGrid(Event $event): void
    {
        $args   = $event->getArguments();
        $items  = $args[0] ?? [];
        $params = $args[1] ?? null;
        $itemId = (int) ($args[2] ?? 0);

        // Exit early if arguments are missing or the item list is empty.
        if (!($params instanceof Registry) || empty($items)) {
            return;
        }

        // CRITICAL: gate on the subtemplate name. Without this gate, multiple
        // subtemplate plugins would all return HTML and only the first result
        // would be used — wasting DB queries and causing unpredictable behavior.
        if ((string) $params->get('subtemplate', '') !== 'yourplugin') {
            return;
        }

        // Read column count from menu params (same param used by the initial render).
        $columns  = (int) $params->get('list_no_of_columns', 3);

        // Emit your framework-specific outer grid. The root element MUST carry
        // the class j2commerce-products-row so the JS swap can find it.
        ob_start();

        // Example: UIkit grid classes (replace with your framework equivalents)
        $colFraction = 'uk-child-width-1-' . max($columns, 1);
        echo '<div class="j2commerce-products-row uk-grid uk-grid-medium ' . $colFraction . '@s uk-margin-bottom" uk-grid>';

        foreach ($items as $product) {
            if (!($product->params instanceof Registry)) {
                $product->params = new Registry($product->params ?? '{}');
            }

            echo '<div>';
            echo ProductLayoutService::renderProductItem(
                $product,
                $params,
                ProductLayoutService::CONTEXT_LIST,
                $itemId
            );
            echo '</div>';
        }

        echo '</div>';

        // addResult() is the only correct way to return HTML from an eventWithHtml event.
        $event->addResult(ob_get_clean());
    }
}
```

### Critical points in the handler

**`Event` typehint — use `Joomla\Event\Event`, not `Joomla\CMS\Event\Event`**

> **Warning:** The typehint on `onRenderAjaxProductListGrid` MUST be `Joomla\Event\Event` (the framework package base). Do NOT use `Joomla\CMS\Event\Event`.
>
> Typed events such as `AfterRouteEvent` extend the package base. If your handler declares `Joomla\CMS\Event\Event` and the dispatcher receives an object that does not extend that CMS class, PHP throws a fatal type error at dispatch time — the plugin fails silently or produces a 500 response.
>
> The safe, correct import is:
> ```php
> use Joomla\Event\Event;
> ```
> Both `app_bootstrap5` and `app_uikit` use this import. See the memory note `feedback_joomla_event_namespace.md` for background.

**`getSubscribedEvents()` registration:**

The handler method name must exactly match the string in `getSubscribedEvents()`. The dispatcher resolves methods by exact name; a typo produces no error and no HTML.

**The subtemplate gate:**

Read `$params->get('subtemplate', '')` and compare it to your plugin's subtemplate name. This is the only mechanism preventing multiple installed subtemplate plugins from each appending HTML to the result array simultaneously. If two plugins both pass the gate, `eventWithHtml()` concatenates both result strings and the rendered grid is duplicated.

---

## Output Contract

The root element emitted by `addResult()` MUST carry the CSS class `j2commerce-products-row`.

The JavaScript filter engine in `media/com_j2commerce/js/site/j2commerce-filters.es6.js` removes existing `.j2commerce-products-row` elements and inserts the new HTML adjacent to the sort/filter controls inside `.j2commerce-products-content`. The relevant logic in `updateProducts()`:

```js
// From j2commerce-filters.es6.js — updateProducts()
const existingRows = contentArea.querySelectorAll('.j2commerce-products-row');
existingRows.forEach(row => row.remove());

// ... then the new products HTML is inserted
const tempDiv = document.createElement('div');
tempDiv.innerHTML = data.products;   // data.products is the string from addResult()

while (tempDiv.firstChild) {
    // inserts new nodes after the sort control or at end of contentArea
    contentArea.appendChild(tempDiv.firstChild);
}
```

If your root element does not carry `j2commerce-products-row`, the engine cannot remove stale rows on subsequent filter interactions. The DOM accumulates duplicate grids.

**Per-item rendering:**

Inside the loop, call `ProductLayoutService::renderProductItem()` for each product card. This method resolves the active item layout (`item.php`, `item_simple.php`, etc.) through the subtemplate override path. Pass `ProductLayoutService::CONTEXT_LIST` as the context and the `$itemId` argument from the event so price, cart, and variant layouts use the correct menu context.

```php
echo ProductLayoutService::renderProductItem(
    $product,
    $params,
    ProductLayoutService::CONTEXT_LIST,
    $itemId
);
```

Ensure `$product->params` is a `Registry` instance before passing it to `renderProductItem()`. The model may return `params` as a JSON string on some query paths:

```php
if (!($product->params instanceof Registry)) {
    $product->params = new Registry($product->params ?? '{}');
}
```

---

## Common Pitfalls

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Wrong `Event` namespace (`Joomla\CMS\Event\Event`) | Fatal type error at dispatch; plugin silently fails or 500 response | Use `Joomla\Event\Event` (package base) |
| `$event->setArgument('html', ...)` instead of `addResult()` | Empty product area after AJAX filter; no JS error | Replace with `$event->addResult($html)` |
| Missing subtemplate gate | Both plugins return HTML; grid is duplicated or the wrong plugin wins | Compare `$params->get('subtemplate')` to your plugin's name and return early if it does not match |
| Root element lacks `j2commerce-products-row` class | Duplicate grids accumulate on repeated filter interactions | Add `j2commerce-products-row` to your outer wrapper's class list |
| Calling `J2CommerceHelper::strapper()->addCSS()` inside the handler | The AJAX response is JSON; no `<head>` exists to receive stylesheet links | Register assets in `onJ2CommerceBeforeCheckout` or `onJ2CommerceAfterAddCSS` instead — never inside a JSON-path handler |
| Forgetting to normalize `$product->params` to a `Registry` | `renderProductItem()` receives a string and may throw or produce empty output | Always guard with `new Registry($product->params ?? '{}')` when `$product->params` is not already a `Registry` |

---

## Testing Checklist

After installing and enabling your plugin, verify AJAX filter behavior with the following steps.

1. Open your product list page in a browser with developer tools open.
2. Open the **Console** tab.
3. Paste and run:

```js
// Trigger a filter change manually
const cb = document.querySelector('[class*="j2commerce-pfilter-checkboxes"]');
if (!cb) { console.warn('No product filter checkboxes found on this page.'); }
cb.checked = !cb.checked;
cb.dispatchEvent(new Event('change', { bubbles: true }));
```

4. After the AJAX request completes (the loading overlay hides), inspect the grid:

```js
// Check the root class on the replaced grid
document.querySelector('.j2commerce-products-row')?.className;
```

Expected: the `className` string contains your framework's grid classes (for example `j2commerce-products-row uk-grid uk-grid-medium ...` for a UIkit plugin, or `j2commerce-products-row row g-4 mb-4` for Bootstrap 5).

If the `className` contains Bootstrap 5 classes only (`row g-4 mb-4`) and your plugin targets UIkit, the subtemplate gate is not matching or `addResult()` was not called. Enable Joomla debug mode and check `administrator/logs/` for PHP errors.

5. Trigger a second filter change and confirm the grid is replaced (not appended). The `j2commerce-products-row` node count in `document.querySelectorAll('.j2commerce-products-row').length` should remain `1` after each filter interaction.

---

## See Also

- [Custom Subtemplates via Template Overrides](./custom-templates.md) — the template-override path; describes when and how to use `ProductLayoutService::setSubtemplateOverride()` inside list templates.
- `onJ2CommerceViewProductListHtml` — the companion event for initial full-page product list renders. Your plugin should handle both this event and `onJ2CommerceRenderAjaxProductListGrid` to ensure consistent rendering across the initial render and AJAX filter interactions.
- `components/com_j2commerce/src/Service/ProductLayoutService.php` — `renderProductItem()` and `CONTEXT_LIST` constant.
- `media/com_j2commerce/js/site/j2commerce-filters.es6.js` — the `applyFilters()` and `updateProducts()` methods that consume the AJAX JSON response and perform the DOM swap.
- `plugins/j2commerce/app_bootstrap5/src/Extension/AppBootstrap5.php` — the canonical reference implementation of this event handler (method `onRenderAjaxProductListGrid`, lines 91–132).
