---
title: "Page Caching Contract for Extensions"
sidebar_label: "Page Caching"
sidebar_position: 60
description: "The rules a J2Commerce extension must follow so its markup survives Joomla's page cache — the shopper-state placeholder pattern, the CSRF token chain, contributing and consuming customer-state slices, and the exclusion event."
---

# Page Caching Contract for Extensions

Joomla's page cache stores one rendered HTML body per URL and replays it to every guest who requests that URL. J2Commerce runs correctly under this cache by never writing per-shopper data into the cached markup itself — every surface that needs to differ per visitor renders a neutral, server-side placeholder and **hydrates** it client-side after the cached page has already been served.

This page documents the contract your extension must follow to participate: which surfaces are cacheable, how to read a CSRF token that is safe to use from a cached page, how to contribute your own per-shopper data slice to the hydration payload, and how to consume that payload safely.

## The Rule

**Cached HTML is public.** Anything rendered into markup that Joomla's page cache stores can be shown, verbatim, to a different guest than the one it was rendered for. Never render a customer's name, cart contents, order history, wishlist state, saved addresses, or any other per-shopper value directly into a page that is allowed to be cached. Render a placeholder with a neutral (or last-known server-side) value, mark it as hydratable, and let the client-side hydrator fill in the correct value after load.

Core keeps a fixed set of views out of the cache entirely, because their entire body is shopper-specific and there is nothing left to render as a placeholder. From `plugins/system/j2commerce/src/Extension/J2Commerce.php`:

```php
private const UNCACHEABLE_VIEWS = ['carts', 'checkout', 'confirmation', 'myprofile', 'orders', 'paymentupdate'];
```

A request is also excluded when it does not hit one of those views but still carries shopper state — a guest holding a looked-up order token, or any session with a non-empty cart:

```php
private function requestCarriesShopperState(): bool
{
    $app = $this->getApplication();

    // View first: the account surface renders a named customer's addresses, phone and order
    // history even when the cart is empty, so a cart-only test would miss it entirely. The
    // views' own sendNoCacheHeaders() does not help — the page cache stores the body without
    // ever inspecting response headers.
    if (\in_array($app->getInput()->getCmd('view', ''), self::UNCACHEABLE_VIEWS, true)
        && $app->getInput()->getCmd('option', '') === self::COMPONENT_NAME) {
        return true;
    }

    // A guest holding a looked-up order token can reach that same order detail from elsewhere.
    if ((string) $app->getSession()->get('guest_order_token', '', self::SESSION_NAMESPACE) !== '') {
        return true;
    }

    try {
        return CartHelper::getCartItemCount() > 0;
    } catch (\Throwable $e) {
        Log::add('Page cache exclusion check failed: ' . $e->getMessage(), Log::ERROR, 'com_j2commerce');

        // Fail closed — never cache a page whose shopper state could not be determined.
        return true;
    }
}
```

Every other view — product listings, product detail, category pages, static content — is cacheable, provided your own extension follows the placeholder pattern below for anything it renders that varies per shopper.

## Reading the CSRF Token

**There is no cookie.** If you encounter a plan document describing a `j2commerce_csrf_token` cookie, that document is obsolete — it was rejected at security review and is not part of the shipped implementation. The token chain that shipped instead reads the token from three places, in order, using the freshest source first.

### Why a hidden form-token input is authoritative

Joomla's page cache rewrites the CSRF token embedded in a cached body on every replay, so a hidden token input is always current for whichever visitor the cached page is being served to — even though the surrounding HTML is unchanged from when it was cached. From `libraries/src/Cache/Cache.php`:

```php
// The following code searches for a token in the cached page and replaces it with the proper token.
if (isset($data['body'])) {
    $token       = Session::getFormToken();
    $search      = '#<input type="hidden" name="[0-9a-f]{32}" value="1">#';
    $replacement = '<input type="hidden" name="' . $token . '" value="1">';

    $data['body'] = preg_replace($search, $replacement, $data['body']);
    $body         = $data['body'];
}
```

This is why the DOM input beats every other source: it is rewritten to the current visitor's token on every cached-page replay, while a value baked into a `Text::script()` option or an inline script is frozen at whatever the page looked like when it was cached.

### The exact DOM reader

From `media/com_j2commerce/js/site/cart-ajax.js`:

```js
/**
 * A hidden Joomla form-token input reproduces exactly `<input type="hidden"
 * name="<32hex>" value="1">` — the shape core's page cache rewrites to the current
 * visitor's token on every cached-page replay, unlike a script option.
 */
function readFormToken() {
    return (Array.from(document.querySelectorAll('input[type="hidden"][value="1"]'))
        .find((el) => /^[0-9a-f]{32}$/.test(el.name)) || {}).name || '';
}
```

The 32-hex shape test on `el.name` is mandatory, not decorative. A checkout page carries other hidden inputs whose `value` is also the literal string `"1"` — for example `shippingrequired`, present on both checkout templates:

```php
<!-- components/com_j2commerce/tmpl/checkout/bootstrap5/default_shipping_payment.php -->
<input type="hidden" name="shippingrequired" value="1">
```

A selector that only checked `input[type="hidden"][value="1"]` without also testing the `name` against `/^[0-9a-f]{32}$/` would match `shippingrequired` on that page and hand your code a field name that is not a CSRF token at all.

### The rest of the chain

`readFormToken()` is the first of three sources `resolveToken()` tries, freshest first:

```js
/**
 * Freshest source first. The script option is last because it is baked into the
 * markup: on a cached-page replay it carries whichever visitor primed the cache.
 * The DOM input and the endpoint are always current, so no retry is needed.
 */
async function resolveToken() {
    const domToken = readFormToken();

    if (domToken) {
        return domToken;
    }

    if (window.J2CommerceToken && typeof window.J2CommerceToken.get === 'function') {
        try {
            const endpointToken = await window.J2CommerceToken.get();

            if (endpointToken) {
                return endpointToken;
            }
        } catch (error) {
            // Fall through to the script option.
        }
    }

    return options.csrfToken || '';
}
```

1. **The hidden form-token input** (`readFormToken()`) — authoritative, because the page cache rewrites it on every replay.
2. **`window.J2CommerceToken.get()`** — a `Promise<string>` exposed by `media/com_j2commerce/js/site/customer-state.js`. It lazily fetches the customer-state endpoint once (the underlying request is shared and cached, so repeated calls do not re-fetch) and resolves with `data.token`.
3. **The extension's own legacy source last** — for `cart-ajax.js` this is `options.csrfToken`, a value passed via `Joomla.getOptions('j2commerce.cart')`. Any script-option value baked into markup goes stale the moment that markup is served from cache, so it is only trusted after both live sources have failed.

### Two rules you will otherwise get wrong

**Emit `HTMLHelper::_('form.token')` with no attributes.** The helper's own implementation appends any attributes you pass immediately before the closing `>`:

```php
// libraries/src/HTML/Helpers/Form.php
public static function token(array $attribs = [])
{
    $attributes = '';

    if ($attribs !== []) {
        $attributes .= ' ' . ArrayHelper::toString($attribs);
    }

    return '<input type="hidden" name="' . Session::getFormToken() . '" value="1"' . $attributes . '>';
}
```

Called with no arguments this produces exactly `<input type="hidden" name="<32hex>" value="1">` — the shape the cache-rewrite regex requires. Pass even one attribute (`id`, `class`, anything) and the tag becomes `<input type="hidden" name="..." value="1" id="foo">`, which no longer ends in `value="1">` and the regex will not match it on a cached replay. The token then goes stale for every visitor after whoever the page was cached for.

**Never put that hidden input inside a `method="get"` form** — nor a form with no `method` attribute, which defaults to GET. A GET form serialises every one of its fields, including the token field, into the query string on submit. A token in the URL leaks through referrer headers, server access logs, and browser history. Form membership does not matter to the JavaScript reader — `readFormToken()` matches by shape across the entire document, not by which form the input lives in — so there is no functional reason to put the token inside a GET form in the first place.

### A token is anti-forgery only

Resolving a token through this chain proves nothing about who the caller is or what they are allowed to do. Every handler that receives it must still independently pass all three checks:

1. `Session::checkToken()` (or the equivalent `Joomla\CMS\Session\Session::checkToken()` call for the request method in use).
2. An authentication check — reject `$user->guest` / `(int) $user->id === 0` where the action requires a logged-in shopper.
3. An authorization check — `$user->authorise('<specific.action>', 'com_j2commerce')` for anything beyond an anonymous, read-only action.

## Contributing a Slice

Third-party extensions add their own per-shopper data to the hydration payload by subscribing to `onJ2CommerceCustomerState`, fired from `handleCustomerStateAjax()` in `plugins/system/j2commerce/src/Extension/J2Commerce.php`:

```php
$collector = J2CommerceHelper::plugin()->event('CustomerState', ['context' => 'site.customer_state']);
$slices    = $collector->getArgument('result', []);
```

`J2CommerceHelper::plugin()` returns the component's own `PluginHelper`, and `event('CustomerState', ...)` dispatches `onJ2Commerce` . `CustomerState` — i.e. `onJ2CommerceCustomerState` — against a `J2Commerce\Component\J2commerce\Administrator\Event\PluginEvent` instance (`administrator/components/com_j2commerce/src/Helper/PluginHelper.php`):

```php
public function event(string $event, array $args = [], string $prefix = 'onJ2Commerce'): PluginEvent
{
    ...
    $eventName   = $prefix . $event;
    $eventObject = new PluginEvent($eventName, $args);
    $dispatcher->dispatch($eventName, $eventObject);

    return $eventObject;
}
```

A listener appends its slice using `getArgument('result', [])` / `setArgument('result', $result)`, matching the pattern used elsewhere in core (`TaxHelper`'s `onJ2CommerceAfterGetTaxRateItems`, `onGetDashboardMessages`):

```php
public static function getSubscribedEvents(): array
{
    return [
        'onJ2CommerceCustomerState' => 'onCustomerState',
    ];
}

public function onCustomerState(Event $event): void
{
    $result   = $event->getArgument('result', []);
    $result[] = [
        'key'  => 'yourthing',
        'data' => ['isActive' => true, 'count' => 3],
    ];

    $event->setArgument('result', $result);
}
```

### `addResult()` is a different method on a different event family — do not assume its contract

`J2Commerce\Component\J2commerce\Administrator\Event\PluginEvent` (the class behind `onJ2CommerceCustomerState`) does expose an `addResult($value)` method, and calling it here does append your slice correctly:

```php
// administrator/components/com_j2commerce/src/Event/PluginEvent.php
public function addResult($value): void
{
    if (!isset($this->arguments['result'])) {
        $this->arguments['result'] = [];
    }

    if (\is_array($this->arguments['result'])) {
        $this->arguments['result'][] = $value;
    }
}
```

The confusing part is that a completely different `addResult()` exists elsewhere in this same codebase with an incompatible contract. `onPageCacheIsExcluded` (see [Exclusion](#exclusion) below) is a **Joomla core** event implementing `Joomla\CMS\Event\Result\ResultAwareInterface`, whose `addResult()` **strictly type-checks for boolean** and throws `InvalidArgumentException` on anything else:

```php
// libraries/src/Event/Result/ResultTypeBooleanAware.php
public function typeCheckResult($data): void
{
    if ($this->resultIsNullable && $data === null) {
        return;
    }

    if (!\is_bool($data)) {
        throw new \InvalidArgumentException(\sprintf('Event %s only accepts Boolean results.', $this->getName()));
    }
}
```

Both methods are named `addResult()`. One accepts a strict boolean and throws on anything else; the other accepts any array-shaped slice and never throws. Check which event class you are holding before calling it — do not carry an assumption about `addResult()`'s contract from one event to the other.

### The guard `handleCustomerStateAjax()` applies to every slice

Core silently discards a slice unless every one of the following holds, checked in `plugins/system/j2commerce/src/Extension/J2Commerce.php`:

```php
foreach ($slices as $slice) {
    if (
        !is_array($slice)
        || !isset($slice['key'])
        || !is_string($slice['key'])
        || !array_key_exists('data', $slice)
        || !is_array($slice['data'])
        || isset($data[$slice['key']])
        // Denied in PHP because the payload is consumed as a JS object: a slice keyed
        // __proto__/constructor/prototype would pollute Object.prototype in the first
        // consumer that merges it rather than assigning it.
        || in_array($slice['key'], ['__proto__', 'constructor', 'prototype'], true)
    ) {
        continue;
    }

    $data[$slice['key']] = $slice['data'];
}
```

- `$slice` must be an array with a string `key` and a `data` key set to an array.
- `isset($data[$slice['key']])` rejects any key that collides with a key core has already populated by this point in the payload — namely `cart`, `currency`, and `token`. Using any of those keys silently drops your slice; it does not raise an error.
- `__proto__`, `constructor`, and `prototype` are explicitly denied. These are rejected in PHP, before the response is ever serialized, because the payload is consumed as a plain JS object on the client (`window.J2CommerceCustomerState = publicState;` — see [Consuming State](#consuming-state)). A slice keyed `__proto__` would pollute `Object.prototype` in the first piece of code that merges rather than assigns the payload.

### Requirements on your handler

- **Cheap.** This handler runs on every hydrating pageview across the whole site, not just pages your extension owns.
- **Creates no rows.** It is a read.
- **Must not throw.** Core wraps the whole collector call in a `try`/`catch (\Throwable $e)` and logs the failure, but a handler that throws still costs the request the work already done and denies every other listener's slice for that request.
- **Slice values must be plain scalars or arrays — never HTML.** Slices are broadcast to every listening piece of third-party JS on the page via the `j2c:customer-state` event, and `j2c-dom.js`-family DOM helpers deliberately preserve inline `onclick` / `onerror` handlers when adopting markup (that preservation is required for legitimate interactive fragments). An HTML string placed in a slice value is therefore a stored-XSS path the moment any consumer renders it with anything other than `textContent`.

## Consuming State

### Render a hydration hook

The DOMContentLoaded hydrator in `media/com_j2commerce/js/site/customer-state.js` only fires the endpoint request when the page carries at least one hydration hook — the endpoint boots the full Joomla stack, so an ungated fetch on every page load (including pages with no J2Commerce content at all) would be wasteful:

```js
const HYDRATION_HOOKS = '[data-j2c-cart-count], [data-j2c-cart-badge], [data-j2c-cart-wrapper], [data-j2c-hydrate]';
```

```js
document.addEventListener('DOMContentLoaded', function () {
    // data-j2c-hydrate is the generic opt-in for NON-CORE consumers. Core cannot know a
    // plugin's selectors — that separation is the whole point of the collector — so a
    // plugin that wants the j2c:customer-state broadcast marks any element with it.
    // Without this the gate would serve only the cart, and a page carrying wishlist or
    // garage markup but no minicart would never hydrate at all.
    if (document.querySelector(HYDRATION_HOOKS) === null) {
        return;
    }

    hydrate();
});
```

`data-j2c-cart-count`, `data-j2c-cart-badge`, and `data-j2c-cart-wrapper` are core's own cart hooks (see the [placeholder rule](#the-placeholder-rule)). **`data-j2c-hydrate` is the generic opt-in your extension uses.** Without a hydration hook present somewhere on the page, `j2c:customer-state` never fires and your slice is never delivered — this applies even if your listener code is present and correct. A real shipped example, `plugins/j2commerce/app_wishlist/tmpl/bootstrap5/form.php`:

```php
<div class="j2commerce-product-wishlist" data-j2c-hydrate data-product-id="<?php echo $productId; ?>">
```

### `window.J2CommerceState.request()` — for markup that arrives after load

An AJAX-loaded fragment (a quickview modal, an infinite-scroll page, a tab panel swapped in after the initial `DOMContentLoaded` event) cannot be caught by the hook gate above, because that gate only runs once, at load. For markup injected later, call the escape hatch directly:

```js
// media/com_j2commerce/js/site/customer-state.js
window.J2CommerceState = {
    request: function () {
        hydrate();
    }
};
```

This is safe to call repeatedly. `hydrate()` calls the same `fetchState()` used by the initial DOMContentLoaded path, and `fetchState()` caches its promise:

```js
function fetchState() {
    if (statePromise) {
        return statePromise;
    }

    statePromise = fetch(getEndpointUrl(), { headers: { Accept: 'application/json' } })
        // ...
    return statePromise;
}
```

So the endpoint is still requested at most once per page load no matter how many times `window.J2CommerceState.request()` is called — calling it again after your fragment loads does not stampede the endpoint, it just re-runs `hydrate()`'s DOM work (including re-dispatching `j2c:customer-state`) against the already-resolved payload.

### Listen for the event and read `detail`

```js
document.addEventListener('j2c:customer-state', function (event) {
    const state = event.detail;
    // state.yourthing === { isActive: true, count: 3 }
});
```

`event.detail` carries every slice **except** `token`. Core strips it deliberately before broadcasting, so plugin JS listening on `j2c:customer-state` (or reading `window.J2CommerceCustomerState`) never receives the live form token:

```js
/** Copies every slice except the live form token, for the two plugin-facing broadcasts. */
function buildPublicState(data) {
    const publicState = {};

    Object.keys(data).forEach(function (key) {
        if (key !== 'token') {
            publicState[key] = data[key];
        }
    });

    return publicState;
}
```

If your extension needs the token itself (to make an authenticated write request, for example), read it through `window.J2CommerceToken.get()` as shown under [Reading the CSRF Token](#reading-the-csrf-token) — never from the customer-state broadcast.

### Ordering

The full sequence, in order:

1. Render your element with a hydration hook (`data-j2c-hydrate`, or an existing core hook if your content is cart-shaped) and the server-computed value as its initial content.
2. `document.addEventListener('j2c:customer-state', ...)` — register your listener before the page finishes loading, or call `window.J2CommerceState.request()` yourself once your markup is in the DOM if it arrived after `DOMContentLoaded`.
3. Read `event.detail.<yourKey>` inside the listener.

### Hydrate safely

Use `textContent`, `createElement`, or `replaceChildren()` to write slice data into the DOM. Never use `innerHTML` or `insertAdjacentHTML` on slice data, and never pass slice data through a DOM-adoption helper that preserves inline event-handler attributes (`J2CommerceDom`-family helpers exist specifically to adopt trusted server-rendered HTML fragments — a slice value is not one of those).

Announce any visible change the way `customer-state.js` announces cart-count changes — a `role="status"` live region, or a focus move for a more significant change (WCAG 2.2 SC 4.1.3, Status Messages). **Do not create a second live region.** Core already owns one:

```js
liveRegion = document.createElement('div');
liveRegion.id = 'j2c-state-live';
liveRegion.setAttribute('role', 'status');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.setAttribute('aria-atomic', 'true');
```

Reuse `document.getElementById('j2c-state-live')` if you need to announce something from your own hydration handler, rather than injecting a second `role="status"` region — two live regions on one page compete for the same screen-reader announcement channel. Localize any announcement text via `Text::script()` on the PHP side, the same way core does:

```php
Text::script('COM_J2COMMERCE_CART_NO_ITEMS');
Text::script('COM_J2COMMERCE_N_CART_ITEMS_1');
Text::script('COM_J2COMMERCE_N_CART_ITEMS_MORE');
```

## The Placeholder Rule

Always render the hydratable element with the current server-computed value as its initial content. Never omit the element, and never render it blank waiting for JavaScript.

`modules/mod_j2commerce_cart/tmpl/minicart.php` is the canonical example. The badge count is rendered from PHP regardless of whether hydration is possible:

```php
<span<?php echo $countAttr; ?>><?php echo $productCount; ?></span>
```

And when a module is configured to hide itself on an empty cart, the wrapper is rendered **hidden**, not omitted:

```php
// check_empty bakes a hide/show decision into cacheable HTML. When the badge is hydratable
// the wrapper is rendered hidden instead of omitted, so a shopper with items replaying a
// cache primed by an empty cart still gets a cart icon once hydration runs.
$emptyHidden = ((int) $params->get('check_empty', 0) === 1 && $productCount < 1);
$hide        = ($emptyHidden && !$hydratable);
$wrapAttr    = $hydratable ? ' data-j2c-cart-wrapper' : '';
$wrapHidden  = $emptyHidden ? ' hidden style="display:none"' : '';
```

Two reasons this matters:

1. **No-JS visitors** — with JavaScript disabled or blocked, the server-rendered value is the only value that visitor ever sees. Omitting or blanking it produces a broken UI for every such visitor, on every page, forever.
2. **A cached replay has nothing to hydrate if you omit the element.** If a page is cached while the cart is empty and the wrapper is omitted from the markup entirely, a later shopper with items in their cart who receives that cached replay has no element in the DOM for the hydrator to fill in — `document.querySelectorAll('[data-j2c-cart-wrapper]')` finds nothing, and the hydration code has nothing to act on. Rendering the wrapper hidden (rather than omitting it) keeps a target present for every future replay of that cached page.

## Degrading

**A plugin that is absent or disabled:** its key is simply absent from the payload. `handleCustomerStateAjax()` builds `$data` starting from `['cart' => ..., 'currency' => ...]` and only adds a key when a listener contributes a valid slice — there is no placeholder or error for a missing plugin's key. Your consumer code should treat `state.yourKey === undefined` as "not available", not as an error.

**The endpoint itself absent (older core, or the component disabled):** the `fetch()` in `fetchState()` will reject (network error, 404, or a non-`success:true` JSON body), and `hydrate()`'s `.catch()` deliberately does nothing:

```js
fetchState()
    .then(function (data) { ... })
    .catch(function () {
        // Network/parse failure: leave server-rendered values in place. Never blank.
    });
```

Your extension must keep working from its server-rendered content in this case. Never write code that assumes hydration will eventually run and leaves the server-rendered placeholder in a state that only makes sense pre-hydration.

## Endpoint Reference

**URL:** `index.php?option=com_ajax&group=system&plugin=j2commerce&format=json&j2c_task=customerState`, resolved against `window.j2commerceURL` (published on every page by the system plugin's `onAfterRoute` handler).

**Method:** `GET` only — `handleCustomerStateAjax()` is gated on `$app->getInput()->getMethod() === 'GET'`.

**Response shape:**

```json
{
    "success": true,
    "data": {
        "cart": { "count": 0 },
        "currency": { "code": "USD", "isUserSet": false },
        "token": "a1b2c3d4e5f6...",
        "yourKey": { "...": "..." }
    }
}
```

**Headers**, set explicitly in `sendJsonAndClose()`:

```php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('Vary: Cookie');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');
```

**Semantics:** read-only, guest-reachable, no authentication or authorization check — it returns only data any anonymous visitor is already entitled to see about their own session (their own cart count, their own currency, a fresh CSRF token for their own session, and whatever plugin slices choose to publish). The handler ends with `$this->getApplication()->close()` rather than a normal return, specifically to skip `onAfterRespond` — the only point at which `plg_system_cache` stores a page — so this response itself is never cached:

```php
// Deliberate exit(): close() skips onAfterRespond, the only point plg_system_cache stores a
// page. Its appStateSupportsCaching() gates solely on isSite && isGET && guest && empty
// message queue with no option/format/com_ajax exclusion — a plain return here would let a
// guest's token and cart count be cached and replayed to every other guest.
$this->getApplication()->close();
```

## Anti-Patterns

| Pattern | Why it is wrong |
|---|---|
| `$app->setHeader('Set-Cookie', ...)` on a cacheable response | The cached header bag is replayed verbatim to every guest who receives that cached page — a cookie set for one visitor is handed to the next one. |
| Patching global `window.fetch` to inject a token or header | Runs on every outgoing request from the page, including cross-origin ones — leaks the token to third-party endpoints and can break CORS preflight for requests that were not expecting the extra header. |
| Putting the CSRF token in a GET query string | Query strings are logged (server access logs, proxies), stored in browser history, and forwarded in the `Referer` header to any link the page opens. |
| Per-module AJAX re-dispatch on every pageview | Duplicates work the shared `customerState` endpoint already does once per page load; use the collector (`onJ2CommerceCustomerState`) instead of a module-specific round trip. |
| Caching the state JSON response | Defeats the entire mechanism — the response must always reflect the requesting visitor's own session, which is exactly why the endpoint sends `Cache-Control: no-store` and calls `close()` to skip the store path. |
| `addCustomTag()` to inject a live region | A `<div>` written into `<head>` via `addCustomTag()` breaks head parsing. Core builds its live region with `document.createElement()` at runtime instead — see [Hydrate safely](#hydrate-safely). |
| Hand-rolled cart-count SQL in your own plugin | Use `CartHelper::getCartItemCount()`, the same method core's `requestCarriesShopperState()` and `handleCustomerStateAjax()` both call, so your count and core's exclusion decision never disagree. |

## Exclusion

Core subscribes `onPageCacheIsExcluded` (a Joomla core event fired by `plg_system_cache`) and excludes any request carrying shopper state — the fixed list of account/cart/checkout views, a guest holding an order-lookup token, or a session with a non-empty cart:

```php
public function onPageCacheIsExcluded(Event $event): void
{
    if (!ComponentHelper::isEnabled(self::COMPONENT_NAME)) {
        return;
    }

    if (!$this->requestCarriesShopperState()) {
        return;
    }

    // Core reads this with in_array($results, true, true) — a strict boolean is required.
    if ($event instanceof ResultAwareInterface) {
        $event->addResult(true);
    }
}
```

Your own extension can subscribe the same event for a surface of its own that needs the same treatment — a plugin-owned account page, a subscription-management view, anything that renders per-shopper data with no placeholder path available:

```php
public static function getSubscribedEvents(): array
{
    return [
        'onPageCacheIsExcluded' => 'onPageCacheIsExcluded',
    ];
}

public function onPageCacheIsExcluded(Event $event): void
{
    if (!$this->requestNeedsExclusion()) {
        return;
    }

    if ($event instanceof \Joomla\CMS\Event\Result\ResultAwareInterface) {
        $event->addResult(true);
    }
}
```

**This is a strict-boolean contract, and it is a genuinely different contract from the slice collector described under [Contributing a Slice](#contributing-a-slice).** Core's cache plugin (`plugins/system/cache/src/Extension/Cache.php`) reads the results with:

```php
$results = $this->getDispatcher()->dispatch('onPageCacheIsExcluded', new IsExcludedEvent('onPageCacheIsExcluded'))
    ->getArgument('result', []);

return \in_array(true, $results, true);
```

Any listener's `true` excludes the page from caching; every listener's `false` (or no call at all) leaves it cacheable. `IsExcludedEvent` implements `Joomla\CMS\Event\Result\ResultAwareInterface` with `ResultTypeBooleanAware`, so `addResult()` here throws `InvalidArgumentException` on anything that is not literally `true` or `false` — see the [contribution warning](#addresult-is-a-different-method-on-a-different-event-family--do-not-assume-its-contract) above for the contrasting, non-throwing, any-value `addResult()` on `onJ2CommerceCustomerState`.

**Exclusion applies at store time only.** Core's cache plugin calls `isExcluded()` from `onAfterRender`/`onAfterRespond` — the store path — never when serving a previously cached page. A page cached before your exclusion listener shipped keeps being served from cache until the cache is purged.

## Related

- [Using Checkout Features in Extensions](./using-checkout-features-in-extensions.md)
- [TaxHelper — Public Tax-Calculation API](./tax-helper.md)
