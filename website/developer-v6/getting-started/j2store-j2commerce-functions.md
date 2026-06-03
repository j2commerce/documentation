---
title: "J2Store to J2Commerce Function Reference"
sidebar_label: "J2Store Function Mapping"
sidebar_position: 11
description: "Complete mapping of J2Store v4 helper functions and static facades to their J2Commerce 6 equivalents, for developers migrating extensions."
---

# J2Store to J2Commerce Function Reference

This reference maps every J2Store v4 PHP function, static facade call, and helper class method to its J2Commerce 6 equivalent. Use it when migrating a plugin, module, or custom code from `com_j2store` to `com_j2commerce`.

**Source of truth:** `administrator/components/com_j2store/helpers/j2store.php` (J2Store v4) and `administrator/components/com_j2commerce/src/Helper/J2CommerceHelper.php` (J2Commerce 6).

**Comparison base:** `administrator/components/com_j2store/` vs. `administrator/components/com_j2commerce/`

---

## Overview

J2Store v4 exposes a single static facade class `J2Store` (loaded via `helpers/j2store.php`) that returns singleton instances of non-namespaced helper classes (`J2Config`, `J2Currency`, `J2Cart`, `J2Plugins`, etc.). It relies on the FOF 2 framework for ORM (`F0FTable`, `F0FModel`) and uses `JFactory::getDbo()` for database access.

J2Commerce 6 replaces this with:

- A namespaced static facade `J2CommerceHelper` (`J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper`) that returns singleton instances of namespaced helper classes.
- Native Joomla 6 MVC for models and tables (`MVCFactory::createModel()`, `MVCFactory::createTable()`).
- `Factory::getContainer()->get(DatabaseInterface::class)` for database access.
- A PSR-14 event dispatcher for plugin events (`PluginEvent` objects), replacing raw `triggerEvent()` arrays.
- Configuration stored in `#__extensions.params` (via `ComponentHelper::getParams()`), not the now-removed `#__j2store_configurations` table.

The method signatures are intentionally compatible: most `J2Store::method()` calls become `J2CommerceHelper::method()` with the same arguments.

---

## Most-Used Quick Reference

The 15 calls that appear in almost every extension migration.

| J2Store v4 | J2Commerce 6 | Notes |
|------------|--------------|-------|
| `J2Store::config()->get('key', $default)` | `J2CommerceHelper::config()->get('key', $default)` | Source changed from `#__j2store_configurations` to `#__extensions.params` |
| `J2Store::config()->set('key', $value)` | `J2CommerceHelper::config()->set('key', $value)` | In-memory only in both versions (mutates the `Registry`) |
| `J2Store::config()->saveOne('key', $value)` | ❌ No direct equivalent | `ConfigHelper` has no persistence method. Save component params through the J2Commerce config Model, which writes `#__extensions.params` |
| `J2Store::currency()->format($number, $currency)` | `J2CommerceHelper::currency()->format($number, $currency)` | Signature unchanged |
| `J2Store::currency()->getSymbol($code)` | `J2CommerceHelper::currency()->getSymbol($code)` | Now a static method on `CurrencyHelper` |
| `J2Store::cart()->getSubtotal($items)` | `J2CommerceHelper::cart()->getSubtotal($items)` | Signature unchanged; `$items` typed `array` |
| `J2Store::cart()->resetCart($sessionId, $userId)` | `J2CommerceHelper::cart()->resetCart($sessionId, $userId)` | Uses native session/DB, no FOF |
| `J2Store::plugin()->event('EventName', $args)` | `J2CommerceHelper::plugin()->event('EventName', $args)` | Returns `PluginEvent` object, not raw array |
| `J2Store::plugin()->getPlugin($element, $folder)` | `J2CommerceHelper::plugin()->getPlugin($element, $folder)` | Default folder changed: `j2store` → `j2commerce` |
| `J2Store::product()->setId($id)->getProduct()` | `J2CommerceHelper::product()->setId($id)->getProduct()` | Triggers `onJ2CommerceAfterGetProduct` (was `onJ2StoreAfterGetProduct`) |
| `J2Store::storeProfile()->get('key')` | `J2CommerceHelper::storeProfile()->get('key')` | Alias for `config()` |
| `J2Store::weight()->convert($value, $from, $to)` | `J2CommerceHelper::weight()->convert($value, $from, $to)` | Signature unchanged |
| `J2Store::utilities()->clear_cache()` | `J2CommerceHelper::utilities()->clear_cache()` | Signature unchanged |
| `F0FTable::getAnInstance('Product', 'J2StoreTable')` | `$mvcFactory->createTable('Product', 'Administrator')` | Requires MVCFactory from DI container |
| `F0FModel::getTmpInstance('Orders', 'J2StoreModel')` | `$mvcFactory->createModel('Order', 'Administrator', ['ignore_request' => true])` | Singular model name, no FOF |

---

## `J2Store::*` Static Facade Methods

Every `J2Store::method()` call maps directly to `J2CommerceHelper::method()`. The class is in a new namespace but the call pattern is identical.

| J2Store function | J2Commerce 6 equivalent | Notes / behavior change |
|-----------------|------------------------|------------------------|
| `J2Store::config($config=[])` | `J2CommerceHelper::config()` | Returns `ConfigHelper` instance. Config sourced from `ComponentHelper::getParams('com_j2commerce')`, not a database table. `helpers/j2store.php:78` → `src/Helper/J2CommerceHelper.php:345` |
| `J2Store::storeProfile($config=[])` | `J2CommerceHelper::storeProfile()` | Alias for `config()`. Returns same `ConfigHelper` instance. `helpers/j2store.php:53` → `src/Helper/J2CommerceHelper.php:374` |
| `J2Store::product($config=[])` | `J2CommerceHelper::product($config=[])` | Returns `ProductHelper` instance. `helpers/j2store.php:58` → `src/Helper/J2CommerceHelper.php:311` |
| `J2Store::currency($config=[])` | `J2CommerceHelper::currency($config=[])` | Returns `CurrencyHelper` instance. `helpers/j2store.php:63` → `src/Helper/J2CommerceHelper.php:216` |
| `J2Store::length()` | `J2CommerceHelper::length()` | Returns `LengthHelper` instance. `helpers/j2store.php:68` → `src/Helper/J2CommerceHelper.php:241` |
| `J2Store::weight()` | `J2CommerceHelper::weight()` | Returns `WeightHelper` instance. `helpers/j2store.php:73` → `src/Helper/J2CommerceHelper.php:181` |
| `J2Store::cart($config=[])` | `J2CommerceHelper::cart($config=[])` | Returns `CartHelper` instance. `helpers/j2store.php:83` → `src/Helper/J2CommerceHelper.php:414` |
| `J2Store::user($config=[])` | `J2CommerceHelper::user($config=[])` | Returns `UserHelper` instance. `helpers/j2store.php:88` → `src/Helper/J2CommerceHelper.php:449` |
| `J2Store::plugin($config=[])` | `J2CommerceHelper::plugin($config=[])` | Returns `PluginHelper` instance. `helpers/j2store.php:93` → `src/Helper/J2CommerceHelper.php:539` |
| `J2Store::email($config=[])` | `J2CommerceHelper::email($config=[])` | Returns `EmailHelper` instance. `helpers/j2store.php:98` → `src/Helper/J2CommerceHelper.php:570` |
| `J2Store::invoice($config=[])` | `J2CommerceHelper::invoice($config=[])` | Returns `InvoiceHelper` instance. `helpers/j2store.php:103` → `src/Helper/J2CommerceHelper.php:622` |
| `J2Store::utilities($config=[])` | `J2CommerceHelper::utilities($config=[])` | Returns `UtilitiesHelper` instance. `helpers/j2store.php:108` → `src/Helper/J2CommerceHelper.php:651` |
| `J2Store::article($config=[])` | `J2CommerceHelper::article($config=[])` | Returns `ArticleHelper` instance. `helpers/j2store.php:113` → `src/Helper/J2CommerceHelper.php:693` |
| `J2Store::modules($config=[])` | `J2CommerceHelper::modules($config=[])` | Returns `ModulesHelper` instance. `helpers/j2store.php:118` → `src/Helper/J2CommerceHelper.php:726` |
| `J2Store::queue($config=[])` | `J2CommerceHelper::queue($config=[])` | Returns `QueueHelper` instance. `helpers/j2store.php:172` → `src/Helper/J2CommerceHelper.php:477` |
| `J2Store::strapper($config=[])` | `J2CommerceHelper::strapper($config=[])` | Returns `StrapperHelper` instance. `helpers/j2store.php:177` → `src/Helper/J2CommerceHelper.php:781` |
| `J2Store::platform($config=[])` | `J2CommerceHelper::platform($config=[])` | Returns `PlatformHelper` instance. `helpers/j2store.php:180` → `src/Helper/J2CommerceHelper.php:799` |
| `J2Store::image($config=[])` | `J2CommerceHelper::image($config=[])` | Returns `ImageHelper` instance. `helpers/j2store.php:187` → `src/Helper/J2CommerceHelper.php:675` |
| `J2Store::view($config=[])` | `J2CommerceHelper::view($config=[])` | Returns `ViewHelper` instance. `helpers/j2store.php:135` → `src/Helper/J2CommerceHelper.php:749` |
| `J2Store::toolbar($config=[])` | `J2CommerceHelper::toolbar($config=[])` | Returns `ToolbarHelper` instance. No direct J2Store equivalent; use as replacement for `J2StoreHelper::addSubmenu()`. `src/Helper/J2CommerceHelper.php:508` |
| `J2Store::isPro()` | `J2CommerceHelper::isPro()` | Returns `bool` (was returning `int` 0/1 in J2Store). Checks `J2COMMERCE_PRO` constant. `helpers/j2store.php:139` → `src/Helper/J2CommerceHelper.php:814` |
| `J2Store::buildHelpLink($url, $content)` | `J2CommerceHelper::buildHelpLink($url, $content)` | Signature unchanged. Domain updated to `docs.j2commerce.com`. `helpers/j2store.php:144` → `src/Helper/J2CommerceHelper.php:834` |
| `J2Store::buildSiteLink($url, $content)` | `J2CommerceHelper::buildSiteLink($url, $content)` | Signature unchanged. `helpers/j2store.php:158` → `src/Helper/J2CommerceHelper.php:856` |
| `J2Store::fof($config=[])` | No equivalent | FOF 2 is not used in J2Commerce 6. Remove all FOF references. |
| `J2Store::getSelectableBase()` | No direct equivalent | Was `J2StoreSelectableBase::getInstance()`. Use custom field XML forms instead. |
| `J2Store::getSelectableFields()` | No direct equivalent | Was `J2StoreSelectableFields::getInstance()`. Use custom field XML forms instead. |
| `J2Store::help($config=[])` | No direct equivalent | Help URLs now built with `J2CommerceHelper::buildHelpLink()`. |
| `J2Store::addSubmenu($vName)` | `J2CommerceHelper::addSubmenu($vName)` | Signature unchanged. Uses native Joomla `Sidebar` instead of FOF toolbar. `helpers/j2store.php:44` → `src/Helper/J2CommerceHelper.php:45` |

### Before / After

```php
// J2Store v4
$config = J2Store::config()->get('store_name', '');
$currency = J2Store::currency()->format(99.99, 'USD');
$isPro = J2Store::isPro();

// J2Commerce 6
use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;

$config   = J2CommerceHelper::config()->get('store_name', '');
$currency = J2CommerceHelper::currency()->format(99.99, 'USD');
$isPro    = J2CommerceHelper::isPro();
```

---

## Configuration Helper (`J2Config` / `ConfigHelper`)

J2Store stored configuration in the `#__j2store_configurations` table (columns: `config_meta_key`, `config_meta_value`). J2Commerce stores it in `#__extensions.params` as a JSON blob, accessed via `ComponentHelper::getParams('com_j2commerce')`.

| J2Store (`J2Config`) | J2Commerce 6 (`ConfigHelper`) | Notes |
|---------------------|------------------------------|-------|
| `J2Config::getInstance()` | `ConfigHelper::getInstance()` | Singleton pattern preserved. `helpers/config.php:27` → `src/Helper/ConfigHelper.php:31` |
| `->get($key, $default)` | `ConfigHelper::get($key, $default)` | Now also available as a static call. `helpers/config.php:44` → `src/Helper/ConfigHelper.php:48` |
| `->set($key, $value)` | `ConfigHelper::set($key, $value)` | In-memory only in both versions. `helpers/config.php:37` → `src/Helper/ConfigHelper.php:108` |
| `->toArray()` | `ConfigHelper::toArray()` | `helpers/config.php:51` → `src/Helper/ConfigHelper.php:113` |
| `->saveOne($key, $value)` | ❌ No direct equivalent | `ConfigHelper` exposes no persistence method (`set()` mutates the in-memory `Registry` only). To persist, save the component params through the J2Commerce config Model/Table, which writes `#__extensions.params`. J2Store source: `helpers/config.php:61` |
| `ConfigHelper::getParams()` | `ConfigHelper::getParams()` | New in J2Commerce. Returns the raw `Registry` object. Not present in J2Store. `src/Helper/ConfigHelper.php:39` |
| `ConfigHelper::reset()` | `ConfigHelper::reset()` | New in J2Commerce. Clears cached params (useful in tests). `src/Helper/ConfigHelper.php:118` |

### Before / After

```php
// J2Store v4 — reads from #__j2store_configurations
$storeName = J2Store::config()->get('store_name', 'My Store');
J2Store::config()->saveOne('store_currency', 'EUR');

// J2Commerce 6 — reads from #__extensions.params
use J2Commerce\Component\J2commerce\Administrator\Helper\ConfigHelper;

$storeName = ConfigHelper::get('store_name', 'My Store');

// ConfigHelper::set() updates the in-memory Registry only — it does NOT persist.
ConfigHelper::set('store_currency', 'EUR');

// To persist a component param, save it through the J2Commerce config Model
// (which writes #__extensions.params). There is no ConfigHelper one-liner.
```

---

## Plugin / Event Dispatch (`J2Plugins` / `PluginHelper`)

The event prefix changed from `onJ2Store` to `onJ2Commerce`. The return value changed from a raw PHP array to a `PluginEvent` object.

| J2Store (`J2Plugins`) | J2Commerce 6 (`PluginHelper`) | Notes |
|----------------------|------------------------------|-------|
| `J2Plugins::getInstance()` | `PluginHelper::getInstance()` | `helpers/plugin.php:26` → `src/Helper/PluginHelper.php:98` |
| `->getPlugins($folder='J2Store')` | `->getPlugins($folder='J2Commerce')` | Default folder renamed. `helpers/plugin.php:68` → `src/Helper/PluginHelper.php:145` |
| `->getPlugin($element, $folder='j2store')` | `->getPlugin($element, $folder='j2commerce')` | Default folder renamed. Uses parameterized query (no raw SQL). `helpers/plugin.php:100` → `src/Helper/PluginHelper.php:186` |
| `->getPluginsWithEvent($eventName, $folder='J2Store')` | `->getPluginsWithEvent($eventName, $folder='J2Commerce')` | Default folder renamed. `helpers/plugin.php:43` → `src/Helper/PluginHelper.php:116` |
| `->event($event, $args=[], $prefix='onJ2Store')` | `->event($event, $args=[], $prefix='onJ2Commerce')` | Returns `PluginEvent` object instead of raw result array. `helpers/plugin.php:208` → `src/Helper/PluginHelper.php:381` |
| `->eventWithHtml($event, $args=[], $prefix='onJ2Store')` | `->eventWithHtml($event, $args=[], $prefix='onJ2Commerce')` | Returns `PluginEvent`; use `->getEventResult()` for HTML. `helpers/plugin.php:227` → `src/Helper/PluginHelper.php:418` |
| `->eventWithArray($event, $args=[], $prefix='onJ2Store')` | `->eventWithArray($event, $args=[], $prefix='onJ2Commerce')` | Returns plain array (convenience wrapper). `helpers/plugin.php:240` → `src/Helper/PluginHelper.php:474` |
| `->getPluginsContent($event, $options, $method)` | `->getPluginsContent($event, $options, $method)` | Signature unchanged. `helpers/plugin.php:127` → `src/Helper/PluginHelper.php:230` |
| `->importCatalogPlugins()` | `->importCatalogPlugins()` | Signature unchanged; imports `content` plugins. `helpers/plugin.php:205` → `src/Helper/PluginHelper.php:350` |
| `->enableJ2StorePlugin()` | `->enableJ2CommercePlugin()` | Renamed. Targets `element=j2commerce`. `helpers/plugin.php:192` → `src/Helper/PluginHelper.php:316` |

### Before / After

```php
// J2Store v4 — event returns raw array
J2Store::plugin()->event('BeforeAddToCart', [$cartItem]);
$results = J2Store::plugin()->event('GetPaymentOptions', [$order]);
// $results is a plain PHP array

// J2Commerce 6 — event returns PluginEvent
use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;

J2CommerceHelper::plugin()->event('BeforeAddToCart', ['cartItem' => $cartItem]);
$event   = J2CommerceHelper::plugin()->event('GetPaymentOptions', ['order' => $order]);
$results = $event->getEventResult();
```

```php
// J2Store v4 — get a specific plugin record
$plugin = J2Store::plugin()->getPlugin('payment_paypal', 'j2store');

// J2Commerce 6 — default folder is now j2commerce
use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;

$plugin = J2CommerceHelper::plugin()->getPlugin('payment_paypal', 'j2commerce');
```

---

## Currency Helper (`J2Currency` / `CurrencyHelper`)

The method signatures are unchanged. The internal data source changed from an FOF model query to a direct database query on `#__j2commerce_currencies`. The primary key column changed from `j2store_currency_id` to `j2commerce_currency_id`.

| J2Store (`J2Currency`) | J2Commerce 6 (`CurrencyHelper`) | Notes |
|-----------------------|--------------------------------|-------|
| `J2Currency::getInstance()` | `CurrencyHelper::getInstance()` | `helpers/currency.php:47` → `src/Helper/CurrencyHelper.php:49` |
| `->set($currencyCode)` | `CurrencyHelper::setCurrency($currencyCode)` | Method renamed. Now static. Session key changed from `currency`/`j2store` namespace to `j2commerce_currency`. `helpers/currency.php:58` → `src/Helper/CurrencyHelper.php:234` |
| `->format($number, $currency='', $value='', $format=true)` | `->format($number, $currency='', $value='', $format=true)` | Signature preserved. `helpers/currency.php:67` → `src/Helper/CurrencyHelper.php` |
| `->convert($value, $from, $to)` | `CurrencyHelper::convert($value, $from, $to)` | Now static. `helpers/currency.php:120` → `src/Helper/CurrencyHelper.php` |
| `->getId($currency='')` | `CurrencyHelper::getId($currencyCode='')` | Now static; parameter renamed. Returns `int`. Primary key is now `j2commerce_currency_id`. `helpers/currency.php:137` → `src/Helper/CurrencyHelper.php:310` |
| `->getSymbol($currency='')` | `CurrencyHelper::getSymbol($currencyCode='')` | Now static. `helpers/currency.php:148` → `src/Helper/CurrencyHelper.php:334` |
| `->getSymbolPosition($currency='')` | `CurrencyHelper::getSymbolPosition($currencyCode='')` | Now static. `helpers/currency.php:159` → `src/Helper/CurrencyHelper.php` |
| `->getDecimalPlace($currency='')` | `CurrencyHelper::getDecimalPlace($currencyCode='')` | Now static. `helpers/currency.php:170` → `src/Helper/CurrencyHelper.php` |
| `->has($currency)` | `CurrencyHelper::has($currencyCode)` | Now static. `helpers/currency.php` → `src/Helper/CurrencyHelper.php:276` |
| No equivalent | `CurrencyHelper::getCode()` | Returns current active currency code. New in J2Commerce. `src/Helper/CurrencyHelper.php:260` |
| No equivalent | `CurrencyHelper::getAll()` | Returns all enabled currencies indexed by code. New in J2Commerce. `src/Helper/CurrencyHelper.php:290` |

### Before / After

```php
// J2Store v4
$currencyHelper = J2Store::currency();
$currencyHelper->set('EUR');
$formatted = $currencyHelper->format(99.99, 'EUR');
$symbol    = $currencyHelper->getSymbol('EUR');

// J2Commerce 6
use J2Commerce\Component\J2commerce\Administrator\Helper\CurrencyHelper;

CurrencyHelper::setCurrency('EUR');
$formatted = CurrencyHelper::getInstance()->format(99.99, 'EUR');
$symbol    = CurrencyHelper::getSymbol('EUR');
```

---

## Cart Helper (`J2Cart` / `CartHelper`)

| J2Store (`J2Cart`) | J2Commerce 6 (`CartHelper`) | Notes |
|-------------------|-----------------------------|-------|
| `J2Cart::getInstance()` | `CartHelper::getInstance()` | `helpers/cart.php:18` → `src/Helper/CartHelper.php:76` |
| `->getSubtotal($items)` | `->getSubtotal(array $items)` | Parameter typed `array`. `helpers/cart.php:28` → `src/Helper/CartHelper.php:140` |
| `->getCartTaxTotal($items)` | `->getCartTaxTotal(array $items)` | Returns `float`. `helpers/cart.php:39` → `src/Helper/CartHelper.php:166` |
| `->getTaxes($items)` | `CartHelper::getTaxes(array $items)` | Static method in both versions; `$items` now typed `array`. `helpers/cart.php:52` → `src/Helper/CartHelper.php:194` |
| `->getCartTotalWeight($items)` | `->getCartTotalWeight(array $items)` | Only sums items where `$item->shipping == 1`. Behavior unchanged. `helpers/cart.php:78` → `src/Helper/CartHelper.php:241` |
| `->resetCart($sessionId, $userId)` | `->resetCart(string $guestSessionId, int $userId)` | Parameters typed (first param named `$guestSessionId`). Uses native Joomla session/DB instead of FOF. Triggers `onJ2CommerceBeforeResetCart` / `onJ2CommerceAfterResetCart`. `helpers/cart.php:100` → `src/Helper/CartHelper.php:316` |
| `->deleteCartItem($cartItemId)` | `->deleteCartItem(int $cartItemId)` | Uses direct DB query instead of FOF table. `helpers/cart.php` → `src/Helper/CartHelper.php` |
| `->removeCartItem($cartId)` | `->removeCartItem(int $cartId)` | Signature unchanged. `helpers/cart.php:92` → `src/Helper/CartHelper.php:275` |

---

## Product Helper (`J2Product` / `ProductHelper`)

`J2Product` extended `CMSObject` and was state-based (fluent API with `setState`/`getState`). `ProductHelper` preserves this pattern using a `stdClass` state object.

| J2Store (`J2Product`) | J2Commerce 6 (`ProductHelper`) | Notes |
|----------------------|-------------------------------|-------|
| `J2Product::getInstance()` | `ProductHelper::getInstance()` | `helpers/product.php:38` → `src/Helper/ProductHelper.php:133` |
| `->setId($productId)` | `->setId($productId)` | Fluent; returns `$this`. `helpers/product.php:124` → `src/Helper/ProductHelper.php` |
| `->getId()` | `->getId()` | `helpers/product.php:129` → `src/Helper/ProductHelper.php` |
| `->getProduct()` | `->getProduct()` | Triggers `onJ2CommerceAfterGetProduct` (was `onJ2StoreAfterGetProduct`). Uses `mvcFactory->createTable()` instead of `F0FTable::getAnInstance()`. `helpers/product.php:133` → `src/Helper/ProductHelper.php:292` |
| `->exists()` | `->exists()` | `helpers/product.php:162` → `src/Helper/ProductHelper.php` |
| `->setState($property, $value)` | `->setState($property, $value)` | Signature unchanged. `helpers/product.php:99` → `src/Helper/ProductHelper.php:217` |
| `->getState($property, $default)` | `->getState($property, $default)` | Signature unchanged. `helpers/product.php:112` → `src/Helper/ProductHelper.php:235` |
| `->clearState()` | `->clearState()` | Returns `ProductHelper` (typed). `helpers/product.php:117` → `src/Helper/ProductHelper.php:247` |
| `->generateSKU($variant)` | `->generateSKU($variant)` | Signature unchanged. Uses `#__j2commerce_products` table. `helpers/product.php:167` → `src/Helper/ProductHelper.php` |
| `->getPriceModifiers()` | `->getPriceModifiers()` | Triggers `onJ2CommerceGetPriceModifiers`. `helpers/product.php:202` → `src/Helper/ProductHelper.php` |
| `->getProductOptions($product)` | `->getProductOptions($product)` | Queries `#__j2commerce_productoptions`. `helpers/product.php:227` → `src/Helper/ProductHelper.php` |

### Before / After

```php
// J2Store v4
$product = J2Store::product()->setId(42)->getProduct();
$options = J2Store::product()->getProductOptions($product);

// J2Commerce 6
use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;

$product = J2CommerceHelper::product()->setId(42)->getProduct();
$options = J2CommerceHelper::product()->getProductOptions($product);
```

---

## Table and Model Access

FOF 2 table and model access is completely replaced by native Joomla 6 MVC factory calls.

| J2Store v4 pattern | J2Commerce 6 equivalent | Notes |
|-------------------|------------------------|-------|
| `F0FTable::getAnInstance('Order', 'J2StoreTable')` | `$mvcFactory->createTable('Order', 'Administrator')` | Get MVCFactory from DI container or `bootComponent()` |
| `F0FTable::addIncludePath(...)` | Not needed | Autoloading via PSR-4 namespaces |
| `F0FModel::getTmpInstance('Orders', 'J2StoreModel')` | `$mvcFactory->createModel('Order', 'Administrator', ['ignore_request' => true])` | Model name is singular in J2Commerce |
| `$table->j2store_order_id` | `$table->j2commerce_order_id` | Primary key column prefix changed |
| `$table->j2store_product_id` | `$table->j2commerce_product_id` | All PK columns follow this pattern |

### Getting MVCFactory

```php
// From within a plugin
use Joomla\CMS\Factory;

$mvcFactory = Factory::getApplication()
    ->bootComponent('com_j2commerce')
    ->getMVCFactory();

// Create a table
$orderTable = $mvcFactory->createTable('Order', 'Administrator');
$orderTable->load($orderId);

// Create a model
$orderModel = $mvcFactory->createModel(
    'Order',
    'Administrator',
    ['ignore_request' => true]
);
$order = $orderModel->getItem($orderId);
```

```php
// From within a controller (already has getMVCFactory())
$cartModel = $this->getMVCFactory()
    ->createModel('Cart', 'Administrator', ['ignore_request' => true]);
```

---

## Routing Helper (`J2StoreRouterHelper` / `RouterHelper`)

| J2Store (`J2StoreRouterHelper`) | J2Commerce 6 (`RouterHelper`) | Notes |
|--------------------------------|------------------------------|-------|
| `J2StoreRouterHelper::findMenu($qoptions, $params)` | `RouterHelper::findMenu($qoptions, $params)` | Now in namespace `J2Commerce\Component\J2commerce\Administrator\Helper\RouterHelper`. Uses `AbstractMenu::getInstance('site')`. `helpers/router.php:42` → `src/Helper/RouterHelper.php:175` |
| `J2StoreRouterHelper::getAndPop(&$query, $key, $default)` | `RouterHelper::getAndPop(array &$query, $key, $default)` | Parameter typed. `helpers/router.php:22` → `src/Helper/RouterHelper.php:119` |

---

## No Direct Equivalent / Pattern Changed

These J2Store patterns have no drop-in replacement. Refactoring is required.

| J2Store pattern | Reason / J2Commerce 6 approach |
|----------------|-------------------------------|
| `J2Store::fof()` / `J2F0F::getInstance()` | FOF 2 is not present in J2Commerce 6. All FOF framework code must be removed. |
| `J2Store::getSelectableBase()` (`J2StoreSelectableBase`) | Replaced by Joomla 6 form XML fields with `addfieldprefix`. |
| `J2Store::getSelectableFields()` (`J2StoreSelectableFields`) | Same as above. |
| `J2Store::help()` (`J2Help::getInstance()`) | Use `J2CommerceHelper::buildHelpLink($url)` directly. |
| `J2Store::message()` (undocumented) | `J2CommerceHelper::message()` — returns `MessageHelper` instance. `src/Helper/J2CommerceHelper.php:598` |
| `F0FTable` ORM methods (`check()`, `bind()`, `store()`) | Use `Joomla\CMS\Table\Table` subclasses from `src/Table/`. Call `check()`, `bind()`, `store()` — same method names, different base class. |
| `JFactory::getDbo()` | `Factory::getContainer()->get(DatabaseInterface::class)` |
| `JFactory::getApplication()` | `Factory::getApplication()` |
| `JFactory::getUser()` | `Factory::getApplication()->getIdentity()` |
| `$app->triggerEvent('onJ2Store…', $args)` | `J2CommerceHelper::plugin()->event('SufixWithoutPrefix', $args)` — returns `PluginEvent`, not array |
| `$db->qn(…)` / `$db->q(…)` | `$db->quoteName(…)` / `$db->quote(…)` — use parameterized `->bind()` instead of `->quote()` for values |
| Session namespace: `$session->get('key', '', 'j2store')` | `$session->get('j2commerce_key', '')` — no namespace, flat key with `j2commerce_` prefix |
| Config table: `#__j2store_configurations` | Removed. All config in `#__extensions.params` for `com_j2commerce`. |
| Order info table: `#__j2store_orderinfos` | Columns merged into `#__j2commerce_orders` (`billing_*`, `shipping_*` columns). See the [Database Schema Reference](./database-schema-reference.md). |

---

## Namespace Reference

Use these namespace prefixes for J2Commerce 6 helpers in your extension code.

| Helper Class | Full Namespace |
|-------------|----------------|
| `J2CommerceHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper` |
| `ConfigHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\ConfigHelper` |
| `CartHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\CartHelper` |
| `CurrencyHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\CurrencyHelper` |
| `ProductHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\ProductHelper` |
| `PluginHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\PluginHelper` |
| `OrderHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\OrderHelper` |
| `RouterHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\RouterHelper` |
| `TaxHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\TaxHelper` |
| `UserHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\UserHelper` |
| `EmailHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\EmailHelper` |
| `UtilitiesHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\UtilitiesHelper` |
| `WeightHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\WeightHelper` |
| `LengthHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\LengthHelper` |
| `StrapperHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\StrapperHelper` |
| `ImageHelper` | `J2Commerce\Component\J2commerce\Administrator\Helper\ImageHelper` |

---

## Related

- [Database Schema Reference](./database-schema-reference.md) — Table and column renames across the full schema.
- [Payment Plugin Development](../extensions/plugins/payment/payment-plugin-development.md) — Plugin base class migration from `J2StorePluginPayment` to native CMSPlugin.
