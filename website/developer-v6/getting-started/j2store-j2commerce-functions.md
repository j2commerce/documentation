---
title: "J2Store to J2Commerce Function Reference"
sidebar_label: "Function Migration Reference"
sidebar_position: 11
description: "Complete mapping of J2Store v4 static helper functions to their J2Commerce 6 equivalents, with file-and-line citations and before/after code examples."
---

# J2Store to J2Commerce Function Reference

This document maps every major J2Store v4 helper function to its J2Commerce 6 equivalent. Every entry was grep-confirmed against both source trees. Use it as a lookup when porting payment plugins, shipping plugins, or any extension that calls `J2Store::*` or `J2StoreHelper*`.

**Source of truth:** `administrator/components/com_j2commerce/src/Helper/`

**Comparison base:** `administrator/components/com_j2store/helpers/`

---

## Overview

J2Store v4 exposed its API through a static facade class (`J2Store`) backed by individual helper classes (`J2Config`, `J2Currency`, `J2Cart`, etc.) built on FOF 2. J2Commerce 6 replaces this with:

- A single facade class `J2CommerceHelper` in `src/Helper/J2CommerceHelper.php`
- Individual stateful helper classes in the same `src/Helper/` directory
- A native Joomla 6 MVC factory (`getMVCFactory()->createTable()` / `createModel()`) in place of `J2Store::fof()`
- Namespaced services injected via `services/provider.php` for plugin registration

The method names and arguments are largely preserved. The main breaking changes are:

1. Plugin event prefix changes from `onJ2Store*` to `onJ2Commerce*`
2. `PluginHelper::event()` returns a `PluginEvent` object, not a raw array
3. Event handlers write results with `$event->addResult($value)` instead of returning them
4. FOF 2 table/model access is replaced by the Joomla MVC factory
5. `ConfigHelper` has no persistence method — config is stored in `#__extensions.params`

---

## Most-Used Quick Reference

The 15 calls that appear in almost every extension migration.

| # | J2Store | J2Commerce 6 |
|---|---------|--------------|
| 1 | `J2Store::config()->get('key', $default)` | `J2CommerceHelper::config()->get('key', $default)` |
| 2 | `J2Store::config()->saveOne('key', $value)` | No direct equivalent — save via the config Model writing to `#__extensions.params` |
| 3 | `J2Store::plugin()->event('Xxx', $args)` → use return array | `J2CommerceHelper::plugin()->event('Xxx', $args)` → `$event->getEventResult()` |
| 4 | `J2Store::currency()->format($number, $currency)` | `J2CommerceHelper::currency()->format($number, $currency)` |
| 5 | `J2Store::product()->setId($id)->getProduct()` | `J2CommerceHelper::product()->setId($id)->getProduct()` |
| 6 | `J2Store::cart()->getSubtotal($items)` | `J2CommerceHelper::cart()->getSubtotal($items)` |
| 7 | `J2Store::fof()->loadTable('Order','J2StoreTable')` | `Factory::getApplication()->bootComponent('com_j2commerce')->getMVCFactory()->createTable('Order','Administrator')` |
| 8 | `F0FModel::getTmpInstance('Orders','J2StoreModel')` | `$mvcFactory->createModel('Orders','Administrator',['ignore_request'=>true])` |
| 9 | `JFactory::getDbo()` | `$this->getDatabase()` (Models/Tables with `DatabaseAwareTrait`) |
| 10 | `JFactory::getApplication()->triggerEvent('onJ2StoreXxx', $args)` | `J2CommerceHelper::plugin()->event('Xxx', $args)` |
| 11 | `J2StorePlatform::getProductUrl($params)` | `Route::_(RouteHelper::getProductRoute($id, $alias, $catid))` |
| 12 | `$order->order_state_id = X; $order->store()` | `$orderModel->updateOrderStatus($orderId, $statusId, $notify, $comment)` |
| 13 | `J2Store::user()->createNewUser($details, $msg)` | `UserHelper::createNewUser(array $details, bool $sendMail=true)` |
| 14 | `J2Store::email()->getOrderEmails($order, 'customer')` | `J2CommerceHelper::email()->getOrderEmails($order, 'customer')` |
| 15 | `J2Store::strapper()->addJS()` | `J2CommerceHelper::strapper()->addJS()` (uses Web Asset Manager internally) |

---

## `J2Store::*` Static Facade Methods

**J2Store source:** `administrator/components/com_j2store/helpers/j2store.php:41`

| J2Store function (file:line, signature) | J2Commerce 6 equivalent (file:line, signature) | Notes / behavior change |
|---|---|---|
| `J2Store::config(array $config=[]): J2Config` (j2store.php:78) | `J2CommerceHelper::config(): ConfigHelper` (J2CommerceHelper.php:345) | J2C returns `ConfigHelper`. J2Store read `#__j2store_configurations`; J2C reads `com_j2commerce` component params via `ComponentHelper`. |
| `J2Store::storeProfile(array $config=[]): J2Config` (j2store.php:53) | `J2CommerceHelper::storeProfile(): ConfigHelper` (J2CommerceHelper.php:374) | Alias for `config()` in both systems. |
| `J2Store::product(array $config=[]): J2Product` (j2store.php:58) | `J2CommerceHelper::product(array $config=[]): ProductHelper` (J2CommerceHelper.php:311) | Same stateful fluent API (`setId()`, `getProduct()`, `getPrice()`, etc.). |
| `J2Store::currency(array $config=[]): J2Currency` (j2store.php:63) | `J2CommerceHelper::currency(array $config=[]): CurrencyHelper` (J2CommerceHelper.php:216) | Signatures identical; J2C adds new methods. |
| `J2Store::length(): J2Length` (j2store.php:68) | `J2CommerceHelper::length(array $config=[]): LengthHelper` (J2CommerceHelper.php:241) | J2C adds `$config` arg. |
| `J2Store::weight(): J2Weight` (j2store.php:72) | `J2CommerceHelper::weight(array $config=[]): WeightHelper` (J2CommerceHelper.php:181) | Same purpose. |
| `J2Store::cart(array $config=[]): J2Cart` (j2store.php:83) | `J2CommerceHelper::cart(array $config=[]): CartHelper` (J2CommerceHelper.php:414) | Methods renamed — see Cart Helper section. |
| `J2Store::user(array $config=[]): J2User` (j2store.php:88) | `J2CommerceHelper::user(array $config=[]): UserHelper` (J2CommerceHelper.php:449) | Now fully static methods on `UserHelper`. |
| `J2Store::plugin(array $config=[]): J2Plugins` (j2store.php:93) | `J2CommerceHelper::plugin(array $config=[]): PluginHelper` (J2CommerceHelper.php:539) | `event()` return type changed — see Plugin/Event Dispatch section. |
| `J2Store::email(array $config=[]): J2Email` (j2store.php:98) | `J2CommerceHelper::email(array $config=[]): EmailHelper` (J2CommerceHelper.php:570) | Same surface; J2C adds type-registry static methods. |
| `J2Store::invoice(array $config=[]): J2Invoice` (j2store.php:103) | `J2CommerceHelper::invoice(array $config=[]): InvoiceHelper` (J2CommerceHelper.php:623) | Same purpose. |
| `J2Store::utilities(array $config=[]): J2Utilities` (j2store.php:108) | `J2CommerceHelper::utilities(array $config=[]): UtilitiesHelper` (J2CommerceHelper.php:651) | Methods renamed to camelCase — see Utilities section. |
| `J2Store::article(array $config=[]): J2Article` (j2store.php:113) | `J2CommerceHelper::article(array $config=[]): ArticleHelper` (J2CommerceHelper.php:692) | Same purpose. |
| `J2Store::modules(array $config=[]): J2Modules` (j2store.php:118) | `J2CommerceHelper::modules(array $config=[]): ModulesHelper` (J2CommerceHelper.php:726) | Same purpose. |
| `J2Store::help(array $config=[]): J2Help` (j2store.php:131) | No direct equivalent | `J2Help` class removed. Use `J2CommerceHelper::buildHelpLink(string $url, string $content='app'): string` (J2CommerceHelper.php:834) instead. |
| `J2Store::view(array $config=[]): J2ViewHelper` (j2store.php:135) | `J2CommerceHelper::view(array $config=[]): ViewHelper` (J2CommerceHelper.php:749) | Same purpose. |
| `J2Store::isPro(): bool` (j2store.php:139) | `J2CommerceHelper::isPro(): bool` (J2CommerceHelper.php:814) | J2S checked `J2STORE_PRO` constant; J2C checks `J2COMMERCE_PRO`. |
| `J2Store::buildHelpLink(string $url, string $content='app'): string` (j2store.php:144) | `J2CommerceHelper::buildHelpLink(string $url, string $content='app'): string` (J2CommerceHelper.php:834) | Identical signature. UTM domain changed to `docs.j2commerce.com`. |
| `J2Store::buildSiteLink(string $url, string $content='app'): string` (j2store.php:158) | `J2CommerceHelper::buildSiteLink(string $url, string $content='app'): string` (J2CommerceHelper.php:856) | Identical signature. |
| `J2Store::queue(array $config=[]): J2Queue` (j2store.php:172) | `J2CommerceHelper::queue(array $config=[]): QueueHelper` (J2CommerceHelper.php:476) | Same purpose. |
| `J2Store::strapper(array $config=[]): J2StoreStrapper` (j2store.php:177) | `J2CommerceHelper::strapper(array $config=[]): StrapperHelper` (J2CommerceHelper.php:782) | See Strapper section. |
| `J2Store::platform(array $config=[]): J2StorePlatform` (j2store.php:180) | `J2CommerceHelper::platform(array $config=[]): PlatformHelper` (J2CommerceHelper.php:797) | URL methods moved to `RouteHelper`; event dispatch moved to `PluginHelper::event()`. |
| `J2Store::fof(array $config=[]): J2F0F` (j2store.php:183) | No direct equivalent | `J2F0F` is an FOF 2 shim. Use `Factory::getApplication()->bootComponent('com_j2commerce')->getMVCFactory()->createTable()` / `createModel()`. |
| `J2Store::image(array $config=[]): J2Image` (j2store.php:187) | `J2CommerceHelper::image(array $config=[]): ImageHelper` (J2CommerceHelper.php:675) | Same purpose. |
| `J2Store::getSelectableBase(): J2StoreSelectableBase` (j2store.php:123) | No direct equivalent | Selectable fields concept removed from J2C. |
| `J2Store::getSelectableFields(): J2StoreSelectableFields` (j2store.php:127) | No direct equivalent | Same as above. |
| `J2Store::message(…)` | `J2CommerceHelper::message(…)` (J2CommerceHelper.php:598) | Real equivalent in J2C. |
| `J2Store::addSubmenu(string $vName)` (j2store.php:44) | `J2CommerceHelper::addSubmenu(string $vName)` (J2CommerceHelper.php:45) | J2S used FOF toolbar; J2C uses `Sidebar::addEntry()`. |

### Before / After — Static Facade

```php
// J2Store v4
$currency = J2Store::currency();
$formatted = $currency->format($price, 'USD');

$product = J2Store::product()->setId($productId)->getProduct();

$helpUrl = J2Store::buildHelpLink('https://docs.j2store.org/path', 'app');
```

```php
// J2Commerce 6
// File: plugins/j2commerce/payment_example/src/Extension/PaymentExample.php
use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;
use J2Commerce\Component\J2commerce\Site\Helper\RouteHelper;

$currency = J2CommerceHelper::currency();
$formatted = $currency->format($price, 'USD');

$product = J2CommerceHelper::product()->setId($productId)->getProduct();

$helpUrl = J2CommerceHelper::buildHelpLink('https://docs.j2commerce.com/path', 'app');
```

---

## Configuration Helper

**J2Store source:** `helpers/config.php:13`
**J2Commerce source:** `src/Helper/ConfigHelper.php`

| J2Store method (file:line) | J2Commerce equivalent (file:line) | Notes |
|---|---|---|
| `J2Config::getInstance(array $config=[]): J2Config` (config.php:27) | `ConfigHelper::getInstance(): ConfigHelper` (ConfigHelper.php:30) | J2C reads Joomla component params, not `#__j2store_configurations`. |
| `J2Config::get(string $property, string $default=''): mixed` (config.php:44) | `ConfigHelper::get(string $key, mixed $default=''): mixed` (ConfigHelper.php:48) | Same intent. 130+ typed accessor methods also available (e.g. `ConfigHelper::getStoreName()`). |
| `J2Config::set(string $namekey, mixed $value='')` (config.php:37) | `ConfigHelper::set(string $key, mixed $value): void` (ConfigHelper.php:108) | In-memory mutation only in both versions. |
| `J2Config::toArray(): array` (config.php:51) | `ConfigHelper::toArray(): array` (ConfigHelper.php:113) | Same. |
| `J2Config::saveOne(string $metakey, mixed $value): bool` (config.php:61) | No direct equivalent in `ConfigHelper` | `ConfigHelper` has no persistence method. `set()` mutates the in-memory `Registry` only. To persist, save through the J2Commerce config Model/Table, which writes `#__extensions.params`. |

### Before / After — Configuration Access

```php
// J2Store v4
$config = J2Store::config();
$storeName   = $config->get('storename', '');
$adminEmail  = $config->get('notification_email', '');
$config->saveOne('storename', 'My New Name'); // persists to #__j2store_configurations
```

```php
// J2Commerce 6
// File: plugins/j2commerce/payment_example/src/Extension/PaymentExample.php
use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;

$config      = J2CommerceHelper::config();
$storeName   = $config->get('storename', '');
$adminEmail  = $config->getAdminEmail(); // typed accessor — preferred

// In-memory mutation only — $config->set('storename', 'My New Name');
// To persist config changes, use the J2Commerce config Model/Table,
// which writes the full params JSON back to #__extensions.
```

---

## Plugin / Event Dispatch

**J2Store source:** `helpers/plugin.php:17`

| J2Store pattern (file:line) | J2Commerce 6 equivalent (file:line) | Notes |
|---|---|---|
| `J2Plugins::getInstance()` (plugin.php:26) | `PluginHelper::getInstance(array $config=[]): self` | Singleton. |
| `J2Plugins::getPluginsWithEvent(string $eventName, string $folder='J2Store'): array` (plugin.php:43) | `PluginHelper::getPluginsWithEvent(string $eventName, string $folder='J2Commerce'): array` | Default folder changed from `J2Store` to `J2Commerce`. |
| `J2Plugins::getPlugins(string $folder='J2Store'): array` (plugin.php:68) | `PluginHelper::getPlugins(string $folder='J2Commerce'): array` | Default folder changed; raw SQL replaced with parameterized query. |
| `J2Plugins::getPlugin(string $element, string $folder='j2store')` (plugin.php:100) | `PluginHelper::getPlugin(string $element, string $folder='j2commerce')` | Default folder changed. |
| `J2Plugins::getPluginsContent(string $event, array $options, string $method='vertical'): string` (plugin.php:127) | `PluginHelper::getPluginsContent(string $event, array $options, string $method='vertical'): string` | Same. |
| `J2Plugins::hasEvent(object $element, string $eventName): bool` (plugin.php:170) | `PluginHelper::hasEvent(string $element, string $eventName): bool` | J2C takes element string, not object. |
| `J2Plugins::enableJ2StorePlugin(): bool` (plugin.php:192) | `PluginHelper::enableJ2CommercePlugin(): bool` | Enables `system/j2commerce` (was `system/j2store`). |
| `J2Plugins::importCatalogPlugins(): void` (plugin.php:205) | `PluginHelper::importCatalogPlugins(): void` | Same. |
| `J2Plugins::event(string $event, array $args=[], string $prefix='onJ2Store'): array` (plugin.php:208) | `PluginHelper::event(string $event, array $args=[], string $prefix='onJ2Commerce'): PluginEvent` | **CRITICAL CHANGE.** Return type changed from `array` to `PluginEvent`. Use `$event->getEventResult()` or `$event->getArgument('result', [])`. |
| `J2Plugins::eventWithHtml(string $event, array $args=[], string $prefix='onJ2Store'): string` (plugin.php:227) | `PluginHelper::eventWithHtml(string $event, array $args=[], string $prefix='onJ2Commerce'): PluginEvent` | Same purpose; prefix default changed. |
| `J2Plugins::eventWithArray(string $event, array $args=[], string $prefix='onJ2Store'): array` (plugin.php:240) | `PluginHelper::eventWithArray(string $event, array $args=[], string $prefix='onJ2Commerce'): array` | Return type preserved as `array` for this variant. |

### Before / After — Plugin Event Dispatch

```php
// J2Store v4
// Dispatch returns a plain array of return values from all handlers
$results = J2Store::plugin()->event('AfterPayment', ['order' => $order]);
foreach ($results as $result) {
    // process each handler's return value
}

// Handler registered by returning a value
public function onJ2StoreAfterPayment($order): string
{
    return '<p>Payment confirmed</p>';
}
```

```php
// J2Commerce 6
// File: plugins/j2commerce/payment_example/src/Extension/PaymentExample.php
use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;
use Joomla\Event\SubscriberInterface;

// Dispatch — returns PluginEvent, not array
$pluginEvent = J2CommerceHelper::plugin()->event('AfterPayment', ['order' => $order]);
$results     = $pluginEvent->getEventResult();

// Handler registered via SubscriberInterface
public static function getSubscribedEvents(): array
{
    return ['onJ2CommerceAfterPayment' => 'onAfterPayment'];
}

public function onAfterPayment(\Joomla\Event\Event $event): void
{
    $order = $event->getArgument('order');
    // Write result to event — do NOT return it
    $event->addResult('<p>Payment confirmed</p>');
}
```

---

## Currency Helper

**J2Store source:** `helpers/currency.php:8`
**J2Commerce source:** `src/Helper/CurrencyHelper.php`

| J2Store method (file:line) | J2Commerce equivalent (file:line) | Notes |
|---|---|---|
| `J2Currency::getInstance(array $config=[]): J2Currency` (currency.php:47) | `CurrencyHelper::getInstance(?array $properties=null): CurrencyHelper` (CurrencyHelper.php:49) | Singleton. |
| `J2Currency::set(string $currency): void` (currency.php:58) | `CurrencyHelper::setCurrency(string $currencyCode): void` (CurrencyHelper.php:234) | Renamed. |
| `J2Currency::format(float $number, string $currency='', mixed $value='', bool $format=true): string` (currency.php:67) | `CurrencyHelper::format(float $amount, ...): string` (CurrencyHelper.php:524) | Same purpose; signature expanded with named args for decimals, symbol, etc. |
| `J2Currency::convert(float $value, string $from, string $to): float` (currency.php:120) | `CurrencyHelper::convert(float $value, string $from, string $to): float` (CurrencyHelper.php:596) | Identical. |
| `J2Currency::getId(string $currency=''): int` (currency.php:137) | `CurrencyHelper::getId(string $currencyCode=''): int` (CurrencyHelper.php:310) | Same. |
| `J2Currency::getSymbol(string $currency=''): string` (currency.php:148) | `CurrencyHelper::getSymbol(string $currencyCode=''): string` (CurrencyHelper.php:334) | Same. |
| `J2Currency::getSymbolPosition(string $currency=''): string` (currency.php:159) | `CurrencyHelper::getSymbolPosition(string $currencyCode=''): string` (CurrencyHelper.php:358) | Same. |
| `J2Currency::getDecimalPlace(string $currency=''): int` (currency.php:170) | `CurrencyHelper::getDecimalPlace(string $currencyCode=''): int` (CurrencyHelper.php:382) | Same. |
| `J2Currency::getThousandSymbol(string $currency=''): string` (currency.php:181) | `CurrencyHelper::getThousandSymbol(string $currencyCode=''): string` (CurrencyHelper.php:455) | Same. |
| `J2Currency::getThousandSysmbol()` (currency.php:192) | Removed | Typo variant removed. Use `getThousandSymbol()`. |
| `J2Currency::getCode(): string` (currency.php:197) | `CurrencyHelper::getCode(): string` (CurrencyHelper.php:260) | Same. |
| `J2Currency::getValue(string $currency=''): float` (currency.php:202) | `CurrencyHelper::getValue(string $currencyCode=''): float` (CurrencyHelper.php:469) | Same. |
| `J2Currency::has(string $currency): bool` (currency.php:213) | `CurrencyHelper::has(string $currencyCode): bool` (CurrencyHelper.php:276) | Same. |
| `J2Currency::getNumericCurrencies(): array` (currency.php:218) | `CurrencyHelper::getNumericCurrencies(): array` (CurrencyHelper.php:798) | Same. |
| `J2Currency::getCurrenciesNumericCode(string $code): mixed` (currency.php:228) | `CurrencyHelper::getCurrencyNumericCode(string $currencyCode): int` (CurrencyHelper.php:819) | Renamed. |
| `J2Currency::getNumericCode(): mixed` (currency.php:243) | No direct equivalent | Use `CurrencyHelper::getNumericCodes(): array` (CurrencyHelper.php:623). |

---

## Cart Helper

**J2Store source:** `helpers/cart.php`
**J2Commerce source:** `src/Helper/CartHelper.php`

| J2Store method (file:line) | J2Commerce equivalent (file:line) | Notes |
|---|---|---|
| `J2Cart::getInstance(array $config=[]): J2Cart` (cart.php:18) | `CartHelper::getInstance(array $config=[]): self` (CartHelper.php:76) | Singleton. |
| `J2Cart::getSubtotal(array $items): float` (cart.php:28) | `CartHelper::getSubtotal(array $items): float` (CartHelper.php:140) | Same. |
| `J2Cart::getCartTaxTotal(array $items): float` (cart.php:39) | `CartHelper::getCartTaxTotal(array $items): float` (CartHelper.php:166) | Same. |
| `J2Cart::getTaxes(array $items): array` (cart.php:52) | `CartHelper::getTaxes(array $items): array` (CartHelper.php:194) | Static method in both versions; `$items` now typed `array`. |
| `J2Cart::getCartTotalWeight(array $items): float` (cart.php:78) | `CartHelper::getCartTotalWeight(array $items): float` (CartHelper.php:241) | Same. |
| `J2Cart::removeCartItem(int $cart_id): mixed` (cart.php:92) | `CartHelper::removeCartItem(int $cartId): bool` (CartHelper.php:275) | Return type now `bool`. |
| `J2Cart::getImage(string $type, int $product_id): string` (cart.php:96) | `CartHelper::getImage(string $type, int $productId): string` (CartHelper.php:294) | Same. |
| `J2Cart::resetCartTable($cart, $session_id, $user_id, $cart_type='cart')` (cart.php:122) | `CartHelper::resetCart(string $guestSessionId, int $userId): void` (CartHelper.php:316) | Signature simplified; `$cart` and `$cart_type` args dropped. |
| `J2Cart::emptyCart(int $order_id): mixed` (cart.php:260) | `CartHelper::emptyCart(string $orderId): bool` (CartHelper.php:584) | PK type changed from `int` to `string` (J2C order PKs are varchar). |
| Not in J2S | `CartHelper::getCart(int $cartId=0, bool $needCreateCart=true, string $cartType='cart'): ?object` (CartHelper.php:839) | New in J2C — loads or creates a cart session. |
| Not in J2S | `CartHelper::getCartItemCount(): int` (CartHelper.php:766) | New in J2C. |
| Not in J2S | `CartHelper::getCartTotal(): float` (CartHelper.php:806) | New in J2C. |
| Not in J2S | `CartHelper::isCartEmpty(): bool` (CartHelper.php:820) | New in J2C. |
| Not in J2S | `CartHelper::deleteCartItem(int $cartitemId): bool` (CartHelper.php:493) | Replaces J2S `removeCartItem` for the explicit "delete" semantic. |
| Not in J2S | `CartHelper::updateCartitemEntry(object $currentCart, object $existingCart): bool` (CartHelper.php:425) | New in J2C. |

---

## Product Helper

**J2Store source:** `helpers/product.php`
**J2Commerce source:** `src/Helper/ProductHelper.php`

| J2Store method (file:line) | J2Commerce equivalent (file:line) | Notes |
|---|---|---|
| `J2Product::getInstance(?array $props=null): J2Product` (product.php:38) | `ProductHelper::getInstance(?array $properties=null): ProductHelper` (ProductHelper.php:133) | Singleton. |
| `J2Product::setId(int $product_id): J2Product` (product.php:124) | `ProductHelper::setId(int $productId): ProductHelper` (ProductHelper.php:263) | Fluent; same. |
| `J2Product::getId(): int` (product.php:129) | `ProductHelper::getId(): ?int` (ProductHelper.php:277) | Returns `?int` in J2C. |
| `J2Product::getProduct(): ?object` (product.php:133) | `ProductHelper::getProduct(): ?object` (ProductHelper.php:292) | Same. |
| `J2Product::exists(): bool` (product.php:162) | `ProductHelper::exists(): bool` (ProductHelper.php:359) | Same. |
| `J2Product::generateSKU(object $variant): string` (product.php:167) | `ProductHelper::generateSKU(object $variant, object $product): string` (ProductHelper.php:1338) | Now static; requires `$product` arg. |
| `J2Product::getProductOptions(object $product): array` (product.php:227) | `ProductHelper::getProductOptions(object $product): array` (ProductHelper.php:1562) | Now static. |
| `J2Product::getProductOptionValues(int $productoption_id, int $product_id): array` (product.php:301) | `ProductHelper::getProductOptionValues(int $productOptionId): array` (ProductHelper.php:1668) | `$product_id` arg removed. |
| `J2Product::getPrice(object $variant, int $quantity=1, string $group_id='', string $date=''): object\|false` (product.php:526) | `ProductHelper::getPrice(object $variant, int $quantity=1, string $groupId='', string $date=''): object\|false` (ProductHelper.php:3257) | Parameter names camelCased. |
| `J2Product::getOptionPrice(array $options, int $product_id): array` (product.php:551) | `ProductHelper::getOptionPrice(array $options, int $productId): array` (ProductHelper.php:2015) | Now dispatches `onJ2CommerceGetCustomOptionPrice` for plugin-registered option types. |
| `J2Product::displayPrice(mixed $price, object $product, ?Registry $params=null, string $context=''): string` (product.php:669) | `ProductHelper::displayPrice(float\|string $price, ?object $product=null, ?Registry $params=null, string $context=''): string` (ProductHelper.php:3692) | Same. |
| `J2Product::displayQuantity(string $context, object $product, ?object $params=null, array $options=[]): string` (product.php:711) | `ProductHelper::displayQuantity(string $context, object $product, ?object $params=null, array $options=[]): string` (ProductHelper.php:3722) | Same. |
| `J2Product::check_stock_status(object $variant, int $quantity): bool` (product.php:916) | `ProductHelper::checkStockStatus(object $variant, int $quantity): bool` (ProductHelper.php:2220) | Renamed camelCase. Instance alias `check_stock_status` also preserved (ProductHelper.php:3564). |
| `J2Product::validateStock(object $variant, int $qty=1): bool` (product.php:927) | `ProductHelper::validateStock(object $variant, int $quantity=1): bool` (ProductHelper.php:2239) | Now static. |
| `J2Product::managing_stock(object $variant): bool` (product.php:903) | `ProductHelper::managingStock(object $variant): bool` (ProductHelper.php:2171) | Renamed camelCase. |
| `J2Product::getUpsells(object $source_product): array` (product.php:1184) | `ProductHelper::getUpsells(object $sourceProduct): array` (ProductHelper.php:2568) | Now static. |
| `J2Product::getCrossSells(object $source_product): array` (product.php:1247) | `ProductHelper::getCrossSells(object $sourceProduct): array` (ProductHelper.php:2634) | Now static. |
| `J2Product::displayImage(object $product, array $product_data): string` (product.php:1319) | `ProductHelper::displayImage(object $product, array $productData): string` (ProductHelper.php:3908) | Same. |
| `J2Product::canShowCart(Registry $params): bool` (product.php:1372) | `ProductHelper::canShowCart(Registry $params): bool` (ProductHelper.php:2799) | Now static. |
| `J2Product::canShowprice(Registry $params): bool` (product.php:1386) | `ProductHelper::canShowPrice(Registry $params): bool` (ProductHelper.php:2823) | Renamed (uppercase P). Now static. |
| `J2Product::canShowSku(Registry $params): bool` (product.php:1395) | `ProductHelper::canShowSku(Registry $params): bool` (ProductHelper.php:2844) | Now static. |
| `J2Product::getDefaultVariant(array $variants): ?object` (product.php:1042) | `ProductHelper::getDefaultVariant(array $variants): ?object` (ProductHelper.php:1250) | Now static. |
| `J2Product::displayStock(object $variant, Registry $params): string` (product.php:861) | `ProductHelper::displayStock(object $variant, Registry $params): string` (ProductHelper.php:2294) | Now static. |
| `J2Product::get_price_including_tax(float $price, int $taxprofile_id): float` (product.php:761) | `ProductHelper::get_price_including_tax(float $price, int $taxProfileId): float` (ProductHelper.php:3822) | Instance method preserved. |
| `J2Product::get_price_excluding_tax(float $price, int $taxprofile_id): float` (product.php:801) | `ProductHelper::get_price_excluding_tax(float $price, int $taxProfileId): float` (ProductHelper.php:3848) | Instance method preserved. |
| `J2Product::getJ2StoreBaseUrl(): string` (product.php:1367) | `ProductHelper::getBaseUrl(): string` (ProductHelper.php:2781) | Renamed; returns `Uri::base(true)`. |
| `J2Product::validateFlexivariants(array $variants, array $options): bool` (product.php:463) | `ProductHelper::validateFlexivariants(array $variants, array $options): bool` (ProductHelper.php:1923) | Now static. |
| `J2Product::validateVariants(array $variants, array $options): bool` (product.php:490) | `ProductHelper::validateVariants(array $variants, array $options): bool` (ProductHelper.php:1892) | Now static. |

### Before / After — Product Lookup

```php
// J2Store v4
$product = J2Store::product()->setId(42)->getProduct();

if ($product) {
    $price = J2Store::product()->getPrice($product->variants[0], 1);
    $inStock = J2Store::product()->validateStock($product->variants[0], 1);
    echo J2Store::product()->displayPrice($price->price, $product, null, 'listing');
}
```

```php
// J2Commerce 6
// File: plugins/j2commerce/app_example/src/Extension/AppExample.php
use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;

$product = J2CommerceHelper::product()->setId(42)->getProduct(); // ProductHelper.php:292

if ($product) {
    $price   = J2CommerceHelper::product()->getPrice($product->variants[0], 1); // ProductHelper.php:3257
    $inStock = J2CommerceHelper::product()::validateStock($product->variants[0], 1); // ProductHelper.php:2239
    echo J2CommerceHelper::product()->displayPrice($price->price, $product, null, 'listing'); // ProductHelper.php:3692
}
```

---

## Table and Model Access

**J2Store source:** `helpers/fof.php:9` (wraps `F0FTable` / `F0FModel`)

| J2Store pattern (file:line) | J2Commerce 6 equivalent | Notes |
|---|---|---|
| `J2Store::fof()->loadTable('Order', 'J2StoreTable'): F0FTable` (fof.php:44) | `Factory::getApplication()->bootComponent('com_j2commerce')->getMVCFactory()->createTable('Order', 'Administrator'): Table` | Returns namespaced J2C `Table` subclass. |
| `J2Store::fof()->getModel('Orders', 'J2StoreModel'): F0FModel` (fof.php:60) | `Factory::getApplication()->bootComponent('com_j2commerce')->getMVCFactory()->createModel('Orders', 'Administrator', ['ignore_request' => true]): Model` | `['ignore_request' => true]` is required to prevent URL state contamination. |
| `F0FTable::getAnInstance($type, $prefix)` | `$mvcFactory->createTable(string $name, string $prefix='Administrator', array $config=[]): Table` | Direct FOF static call replaced. |
| `F0FModel::getTmpInstance($type, $prefix)` (fof.php:65) | `$mvcFactory->createModel(string $name, string $prefix='Administrator', array $config=['ignore_request'=>true]): Model` | `getTmpInstance` creates a fresh unregistered instance — `createModel` with `['ignore_request'=>true]` is the equivalent. |
| `$table->load(array $params)` | `$table->load(int\|array $keys)` | Same Joomla `Table::load()`. |
| `$table->store()` | `$table->store()` | Same. |
| `$table->bind($data)` | `$table->bind($data)` | Same. |
| `$table->check()` | `$table->check()` | J2C Table constructors must call `$this->setColumnAlias('published', 'enabled')`. |
| `$table->delete($pk)` | `$table->delete($pk)` | Same. |
| `J2Store::fof()->loadTableFilePath()` (fof.php:21) | No equivalent | PSR-4 autoloading replaces `addIncludePath`. |
| `J2Store::fof()->loadModelFilePath()` (fof.php:30) | No equivalent | Same. |
| Update order status: `$order->order_state_id = X; $order->store()` | `$orderModel->updateOrderStatus(int $orderId, int $newStatusId, bool $notify=false, string $comment=''): bool` (OrderModel.php:558) | **CRITICAL:** Always use `updateOrderStatus()` — never raw SQL. It fires events, creates history, and optionally sends an email notification. |

---

## Routing Helper

**J2Store source:** `helpers/router.php:13`
**J2Commerce source:** `components/com_j2commerce/src/Helper/RouteHelper.php:52`

| J2Store function (file:line) | J2Commerce equivalent (file:line) | Notes |
|---|---|---|
| `J2StoreRouterHelper::findMenu(array $qoptions, $params=null)` (router.php:42) | No direct equivalent — `RouterHelper::findMenu()` (RouterHelper.php:175) is internal to the Router | Not a public API in J2C. Pass parameters directly to the appropriate `RouteHelper::get*Route()` method. |
| `J2StoreRouterHelper::getAndPop()` (router.php — internal) | `RouterHelper::getAndPop()` (RouterHelper.php:119) | Internal Router utility. Not intended as a public API. |
| `J2StoreRouterHelper::findProductMenu(array $qoptions)` (router.php:260) | No direct equivalent | Handled internally by the Router. |
| `J2StorePlatform::getProductUrl(array $params, bool $is_tag_view=false)` (platform.php:300) | `Route::_(RouteHelper::getProductRoute(int $id, ?string $alias, ?int $catid, ...): string)` (RouteHelper.php:52) | Platform URL method replaced by `RouteHelper`. |
| `J2StorePlatform::getCartUrl(array $params=[])` (platform.php:286) | `Route::_(RouteHelper::getCartRoute(?string $task=null): string)` (RouteHelper.php:271) | |
| `J2StorePlatform::getCheckoutUrl(array $params=[])` (platform.php:249) | `Route::_(RouteHelper::getCheckoutRoute(?string $step=null): string)` (RouteHelper.php:338) | |
| `J2StorePlatform::getMyprofileUrl(array $params, bool $is_xml, bool $no_sef)` (platform.php:228) | `Route::_(RouteHelper::getMyProfileRoute(?string $layout=null): string)` (RouteHelper.php:388) | |
| `J2StoreRouterHelper::findMenuOrders(array $qoptions)` (router.php:140) | `Route::_(RouteHelper::getOrderRoute(int $orderId): string)` (RouteHelper.php:413) | |
| `J2StoreRouterHelper::findThankyouPageMenu(array $qoptions)` (router.php:208) | `Route::_(RouteHelper::getThankYouRoute(?int $orderId=null): string)` (RouteHelper.php:363) | |
| `J2StoreRouterHelper::findMenuCarts(array $qoptions)` (router.php:226) | `Route::_(RouteHelper::getCartRoute())` (RouteHelper.php:271) | |
| `J2StoreRouterHelper::findProductTagsMenu(array $qoptions)` (router.php:296) | `Route::_(RouteHelper::getProductTagsRoute(?int $tagId=null))` (RouteHelper.php:246) | |
| `J2StoreRouterHelper::getProductCategory(int $id, string $lang='')` (router.php:410) | No direct equivalent | Pass `$catid` directly to `RouteHelper::getProductRoute()`. |
| `J2StoreRouterHelper::getItemAlias(int $id, string $lang='')` (router.php:437) | No direct equivalent | Pass `$alias` directly to `RouteHelper::getProductRoute()`. |
| Not in J2S | `RouteHelper::getProductsRoute(?int $catid=null): string` (RouteHelper.php:86) | New in J2C. |
| Not in J2S | `RouteHelper::getAddToCartRoute(int $productId): string` (RouteHelper.php:297) | New in J2C. |
| Not in J2S | `RouteHelper::getRemoveFromCartRoute(int $cartItemId): string` (RouteHelper.php:311) | New in J2C. |
| Not in J2S | `RouteHelper::getClearCartRoute(): string` (RouteHelper.php:323) | New in J2C. |
| Not in J2S | `RouteHelper::getDashboardRoute(): string` (RouteHelper.php:433) | New in J2C. |
| Not in J2S | `RouteHelper::getContinueShoppingRoute(): string` (RouteHelper.php:455) | New in J2C. |

---

## No Direct Equivalent / Pattern Changed

These J2Store patterns have no 1:1 equivalent in J2Commerce 6. Each requires a structural change.

| J2Store concept | J2Commerce 6 pattern / explanation |
|---|---|
| `J2Store::fof()` / `J2F0F` class (fof.php:9) | Completely removed. Use `Factory::getApplication()->bootComponent('com_j2commerce')->getMVCFactory()->createTable()` / `createModel()`. |
| `F0FTable::getAnInstance()` | `$mvcFactory->createTable('Name', 'Administrator')` |
| `F0FModel::getTmpInstance()` | `$mvcFactory->createModel('Name', 'Administrator', ['ignore_request' => true])` |
| FOF table prefix `J2StoreTable` | Namespace `J2Commerce\Component\J2commerce\Administrator\Table` |
| FOF model prefix `J2StoreModel` | Namespace `J2Commerce\Component\J2commerce\Administrator\Model` |
| `JFactory::getDbo()` | `$this->getDatabase()` (with `DatabaseAwareTrait`) or `Factory::getContainer()->get(DatabaseInterface::class)` |
| `JFactory::getApplication()` | `Factory::getApplication()` |
| `JFactory::getUser()` | `Factory::getApplication()->getIdentity()` (current user) |
| `JFactory::getUser($id)` | `UserHelper::getUserById(int $userId)` (UserHelper.php:761) |
| `JFactory::getDate()` | `Factory::getDate()` (still valid) |
| `JRoute::_($url)` | `Route::_($url)` (`Joomla\CMS\Router\Route`) |
| `JText::_('KEY')` | `Text::_('KEY')` (`Joomla\CMS\Language\Text`) |
| `JComponentHelper::getParams('com_j2store')` | `ComponentHelper::getParams('com_j2commerce')` |
| Plugin group `j2store` / `j2storepayment` / `j2storeshipping` / `j2storeapps` / `j2storereports` | Plugin group `j2commerce` for all — elements prefixed `payment_*`, `shipping_*`, `app_*`, `report_*` |
| Event return: `return $value;` in handler | `$event->addResult($value)` — no return value |
| Event prefix `onJ2Store*` | Event prefix `onJ2Commerce*` |
| `J2StorePlatform::getProductUrl()` / `getCartUrl()` / `getCheckoutUrl()` / `getMyprofileUrl()` | `RouteHelper::getProductRoute()` / `getCartRoute()` / `getCheckoutRoute()` / `getMyProfileRoute()` wrapped in `Route::_()` |
| `J2StorePlatform::application()` | `Factory::getApplication()` |
| `J2StorePlatform::raiseError($code, $msg)` | `throw new \RuntimeException($msg, $code)` |
| `J2StorePlatform::getRegistry($json)` | `new Registry($json)` |
| `J2StorePlatform::getImagePath($path)` | `ImageHelper::getImageUrl(string $imagePath)` (via `J2CommerceHelper::image()`) |
| `J2Store::getSelectableBase()` / `J2Store::getSelectableFields()` | No equivalent. Selectable fields concept removed. |
| `J2Store::help()` / `J2Help` class | `J2CommerceHelper::buildHelpLink($url, $content)` (J2CommerceHelper.php:834) — static method, no class. |
| `#__j2store_*` table names | `#__j2commerce_*` table names |
| PK column `j2store_xxx_id` | PK column `j2commerce_xxx_id` |
| `published` column | `enabled` column + `$this->setColumnAlias('published', 'enabled')` in every Table constructor |
| DB raw `$db->q()` / `$db->qn()` | `$db->quote()` / `$db->quoteName()` + parameterized `->bind(':param', $val, ParameterType::INTEGER)` |
| `$query->where('id = ' . $id)` raw concat | `->where($db->quoteName('id') . ' = :id')->bind(':id', $id, ParameterType::INTEGER)` |
| `JRequest::getVar(…)` | `Factory::getApplication()->getInput()->get(…)` |
| `jquery` / `$.ajax` | `fetch()` + `async/await` |
| J2S plugin inheritance: `class plgJ2storePaymentXxx extends JPlugin` | `final class PaymentXxx extends CMSPlugin implements SubscriberInterface` + `services/provider.php` |
| `$this->_element` in J2S plugin | `$this->_name` in J2C plugin (`CMSPlugin` has no `_element` property) |
| `COM_J2STORE_*` language keys | `COM_J2COMMERCE_*` |
| `PLG_J2STORE_*` language keys | `PLG_J2COMMERCE_*` |
| `J2STORE_*` custom field label keys | `J2COMMERCE_*` |

---

## Namespace Reference

Use these namespaces when building J2Commerce 6 extensions.

| Extension type | Namespace pattern | Example |
|---|---|---|
| Admin Controller | `J2Commerce\Component\J2commerce\Administrator\Controller` | `class PaymentController extends FormController` |
| Admin Model | `J2Commerce\Component\J2commerce\Administrator\Model` | `class OrderModel extends AdminModel` |
| Admin Table | `J2Commerce\Component\J2commerce\Administrator\Table` | `class OrderTable extends Table` |
| Admin Helper | `J2Commerce\Component\J2commerce\Administrator\Helper` | `J2CommerceHelper::config()` |
| Site Model | `J2Commerce\Component\J2commerce\Site\Model` | `class ProductModel extends BaseModel` |
| Site Helper | `J2Commerce\Component\J2commerce\Site\Helper` | `RouteHelper::getProductRoute()` |
| Payment Plugin | `J2Commerce\Plugin\J2Commerce\Payment[Name]\Extension` | `class PaymentStripe extends CMSPlugin` |
| Shipping Plugin | `J2Commerce\Plugin\J2Commerce\Shipping[Name]\Extension` | `class ShippingAtoship extends CMSPlugin` |
| App Plugin | `J2Commerce\Plugin\J2Commerce\App[Name]\Extension` | `class AppGiftWrapping extends CMSPlugin` |
| Report Plugin | `J2Commerce\Plugin\J2Commerce\Report[Name]\Extension` | `class ReportItemised extends CMSPlugin` |

---

## Related

- [Database Schema Reference](./database-schema-reference.md)
- [API Reference](../api-reference/index.md)
