---
title: "TaxHelper — Public Tax-Calculation API"
sidebar_label: "TaxHelper"
sidebar_position: 30
description: "Reference for TaxHelper, the public API for computing J2Commerce tax outside the checkout flow. Covers geozone resolution, pricing modes, multi-rate distribution, and the onJ2CommerceAfterGetTaxRateItems event."
---

# TaxHelper — Public Tax-Calculation API

`TaxHelper` is the public, stateless tax-calculation API introduced in J2Commerce 6.3.0. It gives plugins, report generators, and third-party integrations a single, authoritative entry point for resolving geozones, looking up tax rates, and computing tax amounts — using the exact same logic that the checkout flow uses.

**Namespace:** `J2Commerce\Component\J2commerce\Administrator\Helper\TaxHelper`
**File:** `administrator/components/com_j2commerce/src/Helper/TaxHelper.php`
**Since:** 6.3.0

---

## Why This Exists

Before 6.3.0, all tax-calculation math lived as `private`/`protected` methods inside `Helper\CartOrder`. Plugins that needed to compute tax outside the checkout flow — discount plugins, vendor pricing engines, custom report generators, third-party integrations — had no public API to call.

Duplicating the math in a plugin was not a safe alternative because J2Commerce's tax engine has four non-obvious behaviors that all need to cooperate:

1. **Multi-rate carts** — A single product can carry compound VAT (e.g., 21 % federal + 2 % provincial), GST+PST in Canadian stores, or EU multi-rate configurations. A naive `amount × rate / 100` formula produces incorrect totals when two rates apply to the same item.

2. **Geozone resolution with a three-tier session fallback** — The correct geozone set depends on the customer's saved shipping address, their in-progress guest checkout data, or the estimate-shipping widget result. Replicating this lookup outside the class required reading undocumented session namespaces.

3. **The `onJ2CommerceAfterGetTaxRateItems` event** — Tax-engine plugins such as Avalara, `app_taxrate`, EU VAT calculators, and Digifactu intercept this event to override or replace the rate set before it is used. A plugin computing tax without firing this event would produce numbers that disagreed with core.

4. **The `config_including_tax` flag** — The global setting switches between exclusive and inclusive pricing modes, each using different math formulas. Getting one right while ignoring the other produces correct invoices in only half of all store configurations.

`TaxHelper` solves this by extracting the relevant methods from `CartOrder` into a `final` class with an entirely public surface. `CartOrder` itself now delegates to `TaxHelper`, so both checkout-path and plugin-path calls always follow the same code.

---

## Two Pricing Modes

J2Commerce stores operate in one of two pricing modes, controlled by the **Configuration > Prices** setting `config_including_tax`.

### Exclusive pricing (`config_including_tax = 0`)

Product prices are stored and displayed without tax. Tax is added on top at checkout and on invoices.

```
tax_amount = amount × rate_percent / 100
```

### Inclusive pricing (`config_including_tax = 1`)

Product prices already include tax. The tax component is extracted from the price rather than added to it.

```
tax_amount = amount − amount / (1 + rate_percent / 100)
```

When a discount is applied in inclusive mode, the discount amount the customer sees still contains embedded tax. The pure price reduction (the part that affects the pre-tax subtotal) is `discount − discount_tax`. This is why the pattern `if ($taxInclusive) { $totalDiscount -= $totalDiscountTax; }` appears in discount plugins — see [Example A](#example-a--per-item-discount-plugin-both-pricing-modes).

---

## Public API

### `TaxHelper::getCustomerAddress(): \stdClass`

Resolves the active customer shipping address from the J2Commerce session namespace `j2commerce`.

**Return value:** `{ country_id: int, zone_id: int, postcode: string }`

The lookup follows a three-tier priority chain that mirrors what `CartOrder` uses during checkout. This guarantees that plugin-side tax math uses the same address as the order total calculation, even when the customer has not yet completed the checkout form.

**Priority chain:**

| Priority | Source | Session key |
|----------|--------|-------------|
| 1 (highest) | Saved shipping address | `shipping_address_id` → `#__j2commerce_addresses.zip` |
| 2 | Guest checkout array | `guest_shipping` → keys `country_id`, `zone_id`, `zip` / `postcode` |
| 3 (fallback) | Estimate-shipping widget | Flat keys `shipping_country_id`, `shipping_zone_id`, `shipping_postcode` |

If no address data is found, all three fields return their zero/empty defaults. `getCustomerGeozones()` returns an empty array when `country_id` is 0, which causes `computeTax()` to return a zero result.

---

### `TaxHelper::getCustomerGeozones(?\stdClass $address = null): array`

Returns an array of geozone IDs that match the given address. When `$address` is `null`, the helper calls `getCustomerAddress()` internally.

**Parameters:**
- `$address` — Pre-resolved address object (optional). Pass the result of `getCustomerAddress()` when you have already called it, to avoid a second session read.

**Return value:** Array of integer geozone IDs. Returns an empty array when `country_id` is 0 or when no geozone rules match.

**SQL executed against `#__j2commerce_geozonerules`:**

```sql
SELECT DISTINCT geozone_id
FROM   #__j2commerce_geozonerules
WHERE  country_id = :countryId
  AND  (zone_id = 0 OR zone_id = :zoneId)
```

A `zone_id = 0` rule matches all zones within a country, which is how "country-wide" geozone rules are stored.

---

### `TaxHelper::getTaxRateForGeozone(int $taxprofileId, array $geozoneIds): ?\stdClass`

Performs a direct database lookup for the first matching tax rate row for the given tax profile and geozone set. Returns `null` when no match exists.

**Parameters:**
- `$taxprofileId` — The `j2commerce_taxprofile_id` value from `#__j2commerce_taxprofiles`.
- `$geozoneIds` — Array of integer geozone IDs, typically from `getCustomerGeozones()`.

**Return value:** A raw `\stdClass` row joining `#__j2commerce_taxrules`, `#__j2commerce_taxrates`, and `#__j2commerce_taxprofiles`. Fields: `j2commerce_taxrate_id`, `taxrate_name`, `tax_percent`, `geozone_id`, `taxprofile_name`. Returns `null` when `$taxprofileId <= 0`, `$geozoneIds` is empty, or no row matches.

**Ordering:** `tr.ordering ASC` — the lowest-ordering taxrule wins when multiple rules exist for the same profile and geozone set.

This method does **not** fire the `onJ2CommerceAfterGetTaxRateItems` event. Use `getTaxRatesForProfile()` when you need plugin-overridable rates.

---

### `TaxHelper::getTaxRatesForProfile(int $taxprofileId, array $geozoneIds, ?\stdClass $address = null): array`

Resolves the full rate set for a profile + geozone combination, then fires `onJ2CommerceAfterGetTaxRateItems` so tax-engine plugins can append, override, or replace the rates.

**Parameters:**
- `$taxprofileId` — The tax profile ID.
- `$geozoneIds` — Resolved geozone IDs.
- `$address` — Pre-resolved address (optional). When `null`, calls `getCustomerAddress()` to supply the event payload.

**Return value:** Array of `\stdClass` rate objects. Each rate carries: `j2commerce_taxrate_id`, `name`, `taxrate_name`, `rate`, `tax_percent`, `taxprofile_name`. Any plugin listening to `onJ2CommerceAfterGetTaxRateItems` may add additional fields.

**Event payload dispatched:**

| Key | Type | Value |
|-----|------|-------|
| `result` | `array` | Initial rate array built from the DB lookup |
| `address_type` | `string` | Always `'shipping'` |
| `country_id` | `int` | From resolved address |
| `zone_id` | `int` | From resolved address |
| `postcode` | `string` | From resolved address |
| `taxprofile_id` | `int` | The `$taxprofileId` argument |

See [The `onJ2CommerceAfterGetTaxRateItems` Event](#the-onj2commerceaftergettaxrateitems-event) for a full listener example.

---

### `TaxHelper::computeTax(float $amount, int $taxprofileId, ?array $geozoneIds = null, bool $taxInclusive = false): \stdClass`

The primary entry point for plugin authors. Computes the tax for `$amount` under the given tax profile, honoring the active pricing mode.

**Parameters:**
- `$amount` — The taxable amount. May be a per-unit price or a line total — the caller decides the granularity.
- `$taxprofileId` — The `j2commerce_taxprofile_id` to apply.
- `$geozoneIds` — Pre-resolved geozone IDs. Pass `null` to let the helper resolve them from the customer session automatically.
- `$taxInclusive` — Set to `true` when `$amount` already contains embedded tax (i.e., the store uses inclusive pricing). Read this from `J2CommerceHelper::config()->get('config_including_tax', 0)`.

**Return value:** `\stdClass { taxtotal: float, rates: array<int, \stdClass> }`

Each entry in `rates` is the rate object from `getTaxRatesForProfile()` with one additional field added:

| Field | Type | Description |
|-------|------|-------------|
| `j2commerce_taxrate_id` | `int` | Primary key in `#__j2commerce_taxrates` |
| `name` | `string` | Display name (alias for `taxrate_name`) |
| `taxrate_name` | `string` | Display name |
| `rate` | `float` | Rate percentage (alias for `tax_percent`) |
| `tax_percent` | `float` | Rate percentage |
| `taxprofile_name` | `string` | The parent tax profile name |
| `tax_amount` | `float` | The computed tax for this rate on `$amount` |

**Early-exit conditions** — returns a zero result (`taxtotal = 0.0`, `rates = []`) when:
- `$taxprofileId <= 0`
- `$amount === 0.0`
- Geozone resolution produces an empty array
- `getTaxRatesForProfile()` returns no rates

---

## Decision Tree — When to Call TaxHelper vs. Let Core Handle It

Not every plugin that touches pricing needs to call `TaxHelper`. Use this decision tree.

**Does your plugin only reduce the item price and set `orderitem_discount`?**

If yes, and if you call `$order->increase_coupon_discount_amount($code, $amount, 0.0)` with zero tax, core's `CartOrder::recalculateTaxAfterDiscounts()` will proportionally scale the order-level tax automatically. You do NOT need `TaxHelper` in this case. Core handles the tax adjustment by scaling all `taxRates[i]->tax_amount` values by the ratio `(subtotal - totalDiscount) / subtotal`.

**Does your plugin need to know the exact per-item tax on the discount amount?**

If yes — for example, to split the discount tax across invoice VAT lines, accumulate `coupon_discount_tax_amounts` for a VAT report, produce a PDF with a per-rate tax breakdown, or call `$order->increase_coupon_discount_amount($code, $amount, $tax)` with a correct non-zero `$tax` — then call `TaxHelper::computeTax()` and pass the resulting `taxtotal` as the third argument to `increase_coupon_discount_amount()`.

**Does your plugin compute tax for a context outside checkout entirely?**

Report generators, accounting exporters, and bulk-price preview features that calculate tax against a known price and tax profile should always call `TaxHelper::computeTax()` directly. Pass the pre-resolved geozone IDs explicitly when the customer session is not available (see [Example B](#example-b--computing-tax-for-a-custom-report-explicit-geozones)).

---

## Code Examples

### Example A — Per-item discount plugin, both pricing modes

This pattern is used by `app_bulkdiscount` and `app_vendormanagement`. It computes the tax on the discount amount and passes both the net discount and the discount tax to the order accumulator.

```php
<?php
// File: plugins/j2commerce/app_mydiscount/src/Extension/AppMyDiscount.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\AppMyDiscount\Extension;

use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;
use J2Commerce\Component\J2commerce\Administrator\Helper\TaxHelper;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;

\defined('_JEXEC') or die;

final class AppMyDiscount extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            'onJ2CommerceGetDiscountedPrice' => 'onGetDiscountedPrice',
        ];
    }

    public function onGetDiscountedPrice(Event $event): void
    {
        $args     = $event->getArguments();
        $price    = &$args[0]; // float, by reference — the item unit price
        $item     = &$args[1]; // stdClass — the order item
        $addTotals = (bool) ($args[2] ?? false);
        $order    = $args[3] ?? null;

        if (!$addTotals || $order === null) {
            return;
        }

        // Example: apply a fixed 10 % discount
        $discountPercent = 10.0;
        $quantity        = (int) ($item->orderitem_quantity ?? 1);
        $unitDiscount    = round((float) $price * ($discountPercent / 100), 2);
        $totalDiscount   = $unitDiscount * $quantity;

        if ($totalDiscount <= 0) {
            return;
        }

        $totalDiscountTax = 0.0;

        if (!empty($item->orderitem_taxprofile_id)) {
            $params       = J2CommerceHelper::config();
            $taxInclusive = (bool) $params->get('config_including_tax', 0);

            $taxResult = TaxHelper::computeTax(
                $unitDiscount,
                (int) $item->orderitem_taxprofile_id,
                null,           // resolve geozones from session automatically
                $taxInclusive
            );

            $totalDiscountTax = $taxResult->taxtotal * $quantity;

            // In inclusive mode the discount amount already contains tax.
            // The order subtotal stores pre-tax values, so we subtract the
            // embedded tax to get the pure price reduction.
            if ($taxInclusive) {
                $totalDiscount -= $totalDiscountTax;
            }
        }

        $item->orderitem_discount     += $totalDiscount;
        $item->orderitem_discount_tax += $totalDiscountTax;

        // Pass both the net discount and the tax to the order accumulator.
        // Core's recalculateTaxAfterDiscounts() will also proportionally
        // scale order_tax, but the explicit $totalDiscountTax here is used
        // for per-rate invoice line breakdowns and VAT reporting.
        $order->increase_coupon_discount_amount('my_discount_code', $totalDiscount, $totalDiscountTax);
    }
}
```

**Why `$totalDiscount -= $totalDiscountTax` in inclusive mode:**

In an inclusive-price store, the raw discount `unitDiscount × quantity` includes embedded tax. The `order_subtotal` field tracks pre-tax totals. Subtracting `$totalDiscountTax` converts the raw discount into the net price reduction, keeping subtotal math consistent. In exclusive mode, `unitDiscount` contains no tax at all, so no adjustment is needed.

---

### Example B — Computing tax for a custom report, explicit geozones

When your code runs outside a customer session (in a report, a CLI command, or a background task), resolve geozones explicitly and pass them to `computeTax()`. This avoids a session read against an unauthenticated or wrong session.

```php
<?php
// File: plugins/j2commerce/report_myreport/src/Extension/ReportMyReport.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\ReportMyReport\Extension;

use J2Commerce\Component\J2commerce\Administrator\Helper\TaxHelper;
use Joomla\CMS\Plugin\CMSPlugin;

\defined('_JEXEC') or die;

final class ReportMyReport extends CMSPlugin
{
    /**
     * Compute the exclusive (tax-not-included) tax on a known line price
     * for a specific country and zone.
     */
    public function computeLineItemTax(
        float $linePrice,
        int $taxprofileId,
        int $countryId,
        int $zoneId
    ): float {
        // Build a synthetic address to resolve geozones.
        $address = (object) [
            'country_id' => $countryId,
            'zone_id'    => $zoneId,
            'postcode'   => '',
        ];

        $geozoneIds = TaxHelper::getCustomerGeozones($address);

        if (empty($geozoneIds)) {
            return 0.0;
        }

        // taxInclusive = false because this report works with exclusive prices.
        $taxResult = TaxHelper::computeTax(
            $linePrice,
            $taxprofileId,
            $geozoneIds,
            false
        );

        return $taxResult->taxtotal;
    }
}
```

Passing explicit `$geozoneIds` bypasses the session lookup entirely. The `onJ2CommerceAfterGetTaxRateItems` event still fires, so Avalara or other tax-engine plugins will intercept the rate set exactly as they would during a live checkout.

---

### Example C — Multi-rate cart (GST + PST / compound VAT)

When a store has two tax rules under the same profile — for example, 5 % GST and 7 % PST in a Canadian province — `computeTax()` returns both rates in `result->rates` and `taxtotal` equals the sum of their `tax_amount` values.

```php
<?php
// File: plugins/j2commerce/app_taxreport/src/Extension/AppTaxReport.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\AppTaxReport\Extension;

use J2Commerce\Component\J2commerce\Administrator\Helper\TaxHelper;

\defined('_JEXEC') or die;

final class AppTaxReport
{
    /**
     * Returns a breakdown of per-rate tax amounts for a line item.
     *
     * @return  array<string, float>  Maps rate name to tax_amount.
     */
    public static function getRateBreakdown(
        float $linePrice,
        int $taxprofileId
    ): array {
        // Let computeTax resolve the customer address and geozones from session.
        $taxResult = TaxHelper::computeTax(
            $linePrice,
            $taxprofileId,
            null,
            false   // exclusive pricing assumed
        );

        $breakdown = [];

        foreach ($taxResult->rates as $rate) {
            $breakdown[$rate->taxrate_name] = $rate->tax_amount;
        }

        // Example with two rates (GST 5 % + PST 7 % on a $100 line):
        // $taxResult->taxtotal === 12.00
        // $breakdown === ['GST' => 5.00, 'PST' => 7.00]
        //
        // Note: taxtotal always equals sum(rate->tax_amount) across all entries.

        return $breakdown;
    }
}
```

**Multi-rate stores — what `rates` contains:**

If `getTaxRatesForProfile()` returns only a single DB row (which is the standard case when the geozone matches a single taxrule), `rates` will contain one entry. When an `onJ2CommerceAfterGetTaxRateItems` listener appends additional rate objects — for example, a plugin that adds a provincial rate on top of the federal rate — `rates` will contain multiple entries.

---

## The `onJ2CommerceAfterGetTaxRateItems` Event

This event fires inside `getTaxRatesForProfile()` every time it is called, whether from the checkout flow or from a plugin calling `TaxHelper` directly. Tax-engine plugins listen to it to replace the database-sourced rate with an externally calculated rate (Avalara, TaxJar, EU OSS VAT, Digifactu).

**Event name:** `onJ2CommerceAfterGetTaxRateItems`

**When it fires:** Inside every `TaxHelper::getTaxRatesForProfile()` call.

**Payload keys accessible via `$event->getArgument()`:**

| Key | Type | Description |
|-----|------|-------------|
| `result` | `array` | Current rate set (may be modified by the listener) |
| `address_type` | `string` | Always `'shipping'` |
| `country_id` | `int` | Customer country ID |
| `zone_id` | `int` | Customer zone ID |
| `postcode` | `string` | Customer postcode |
| `taxprofile_id` | `int` | The tax profile being resolved |

**Minimal Avalara-style listener stub:**

```php
<?php
// File: plugins/j2commerce/app_avalara/src/Extension/AppAvalara.php

declare(strict_types=1);

namespace J2Commerce\Plugin\J2Commerce\AppAvalara\Extension;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;

\defined('_JEXEC') or die;

final class AppAvalara extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            'onJ2CommerceAfterGetTaxRateItems' => 'onAfterGetTaxRateItems',
        ];
    }

    public function onAfterGetTaxRateItems(Event $event): void
    {
        $countryId    = (int) $event->getArgument('country_id', 0);
        $zoneId       = (int) $event->getArgument('zone_id', 0);
        $postcode     = (string) $event->getArgument('postcode', '');
        $taxprofileId = (int) $event->getArgument('taxprofile_id', 0);

        // Call the external tax API.
        $remoteRate = $this->fetchRemoteRate($countryId, $zoneId, $postcode, $taxprofileId);

        if ($remoteRate === null) {
            return; // Fall through to the database-sourced rate.
        }

        // Replace the entire rate set with the remote result.
        // The returned array must use the same stdClass shape as TaxHelper produces.
        $rate                        = new \stdClass();
        $rate->j2commerce_taxrate_id = 0;
        $rate->name                  = $remoteRate['name'];
        $rate->taxrate_name          = $remoteRate['name'];
        $rate->rate                  = (float) $remoteRate['percent'];
        $rate->tax_percent           = $rate->rate;
        $rate->taxprofile_name       = '';

        // getEventResult() reads the 'result' key. Setting it here replaces
        // the database-sourced rates for this call.
        $event->setArgument('result', [$rate]);
    }

    private function fetchRemoteRate(int $countryId, int $zoneId, string $postcode, int $taxprofileId): ?array
    {
        // Remote API call implementation goes here.
        return null;
    }
}
```

**Important:** The event fires for every call to `getTaxRatesForProfile()`, including calls triggered by third-party discount plugins invoking `TaxHelper::computeTax()`. A heavy remote HTTP call in this listener will be made once per item per discount calculation cycle — implement caching keyed on `(country_id, zone_id, postcode, taxprofile_id)`.

---

## Geozone-Resolution Rules

The three-tier priority chain in `getCustomerAddress()` is identical to the one `CartOrder` used before 6.3.0. This identity guarantee is intentional: plugin-side tax math will always match the checkout-side total for the same customer because both paths call the same code.

**Tier 1 — Saved shipping address (`shipping_address_id`)**

When a logged-in customer has selected a saved address, `j2commerce.shipping_address_id` contains the `j2commerce_address_id`. The helper loads `country_id`, `zone_id`, and `zip` from `#__j2commerce_addresses`.

**Tier 2 — Guest checkout array (`guest_shipping`)**

During guest checkout, the address form data is stored as an array under `j2commerce.guest_shipping`. The helper reads `country_id`, `zone_id`, and either `zip` or `postcode` (both keys are checked for compatibility with older form layouts).

**Tier 3 — Flat estimate-shipping keys**

The estimate-shipping widget on the cart page stores individual values under `j2commerce.shipping_country_id`, `j2commerce.shipping_zone_id`, and `j2commerce.shipping_postcode`. This tier activates only when tiers 1 and 2 both produce a zero `country_id`.

When no tier resolves a country, `getCustomerGeozones()` returns `[]` and `computeTax()` returns a zero result. This is the correct behavior for an anonymous visitor who has not interacted with the checkout or estimate-shipping widget.

---

## Rounding and Multi-Rate Distribution

`computeTax()` computes the combined tax in a single operation against the **sum of all rate percentages**, then distributes the result proportionally across individual rates. This is by design.

**Why a single combined computation:**

In inclusive mode, computing each rate's tax independently and summing the results introduces rounding error because each division is rounded separately. Computing the total first and distributing second ensures that `sum(rate.tax_amount)` equals `taxtotal` to floating-point precision.

**How distribution works:**

```
totalPercent = sum of rate.rate across all rates
totalTax     = exclusive: amount × totalPercent / 100
               inclusive: amount − amount / (1 + totalPercent / 100)

for each rate:
    rate.tax_amount = totalTax × (rate.rate / totalPercent)
```

**Implication for report writers:**

For a store with GST 5 % and PST 7 % on a $100 inclusive price, the naive calculation gives:

- GST: `100 − 100 / 1.05 = 4.762`
- PST: `100 − 100 / 1.07 = 6.542`
- Sum: `11.304`

`computeTax()` instead computes the combined 12 % inclusive tax — `100 − 100 / 1.12 = 10.714` — then splits it 5:7 by weight:

- GST: `10.714 × 5/12 = 4.464`
- PST: `10.714 × 7/12 = 6.250`
- Sum: `10.714`

These per-rate amounts differ from the naive per-rate formulas. This is correct — the naive approach overestimates total tax by applying each rate against the full inclusive price. Do not compare `rate.tax_amount` from `computeTax()` to `amount × rate.rate / 100` in a test assertion; compare `taxtotal` to the known correct total for the combined rate instead.

---

## Migration Recipe — Removing Legacy `getTaxwithRates()` Calls

`$taxModel->getTaxwithRates(...)` does not exist in J2Commerce 6.x. It was part of the J2Store 4 FOF model layer and was never part of the public J2Commerce API. Any plugin carrying this call will produce a fatal error.

**Before (J2Store 4 pattern — broken in J2Commerce 6):**

```php
// This method does not exist in com_j2commerce — remove it.
$taxModel = JModelLegacy::getInstance('Tax', 'J2StoreModel');
$taxResult = $taxModel->getTaxwithRates($price, $taxprofileId, $geozoneId);
$taxAmount = $taxResult['tax_amount'] ?? 0.0;
```

**After (J2Commerce 6 — using TaxHelper):**

```php
use J2Commerce\Component\J2commerce\Administrator\Helper\J2CommerceHelper;
use J2Commerce\Component\J2commerce\Administrator\Helper\TaxHelper;

$params       = J2CommerceHelper::config();
$taxInclusive = (bool) $params->get('config_including_tax', 0);

$taxResult = TaxHelper::computeTax(
    $price,
    $taxprofileId,
    null,          // resolve geozones from session
    $taxInclusive
);

$taxAmount = $taxResult->taxtotal;
// Per-rate breakdown available at $taxResult->rates[i]->tax_amount
```

The new call fires `onJ2CommerceAfterGetTaxRateItems` automatically, so Avalara and other tax-engine plugins participate in the result — something the old `getTaxwithRates()` call never supported.

---

## Backward Compatibility

`CartOrder` retains the methods `getCustomerGeozones()`, `getTaxRatesForProfile()`, and `getTaxRateForGeozone()` with signatures and outputs that are identical to what they produced before 6.3.0. They are now thin delegates:

```php
// CartOrder.php — private delegate methods (unchanged public behavior)
private function getCustomerGeozones(): array
{
    $address = TaxHelper::getCustomerAddress();
    // ... stores address on $this for subsequent calls ...
    return TaxHelper::getCustomerGeozones($address);
}

private function getTaxRatesForProfile(int $taxprofileId, array $geozoneIds): array
{
    $address = (object) [
        'country_id' => $this->customerCountryId,
        'zone_id'    => $this->customerZoneId,
        'postcode'   => $this->customerPostcode,
    ];
    return TaxHelper::getTaxRatesForProfile($taxprofileId, $geozoneIds, $address);
}

private function getTaxRateForGeozone(int $taxprofileId, array $geozoneIds): ?object
{
    return TaxHelper::getTaxRateForGeozone($taxprofileId, $geozoneIds);
}
```

No checkout-side behavior changed in 6.3.0. Code that subclasses `CartOrder` or hooks `onJ2CommerceAfterGetTaxRateItems` sees identical results. The only change is that the same logic is now reachable from outside `CartOrder` without duplicating any code.

---

## Gotchas

**Passing `$amount = 0.0` returns a zero result immediately.**

`computeTax()` returns early when `$amount === 0.0`. Do not pass a zero amount expecting to get the rate percentage back from `rates[i]->rate` — use `getTaxRatesForProfile()` directly if you need rates without an amount.

**`onJ2CommerceAfterGetTaxRateItems` fires on every call — including from plugins.**

If your plugin calls `TaxHelper::computeTax()` inside an `onJ2CommerceGetDiscountedPrice` handler, and another plugin listens to `onJ2CommerceAfterGetTaxRateItems` and makes an HTTP call to an external tax API, that HTTP call fires once per line item per checkout recalculation. Cache aggressively on the listener side.

**`$geozoneIds` must be an array of integers.**

`getTaxRateForGeozone()` calls `array_map('intval', $geozoneIds)` before passing to `whereIn()`. If you pass strings or mixed types from a form field, they are converted automatically. But if you pass an empty array, the method returns `null` immediately — this is an early-exit, not an error.

**`getTaxRateForGeozone()` returns the first match ordered by `tr.ordering ASC`.**

When multiple taxrules exist for the same profile and geozone, only the first row is returned. If you need all matching rules (compound rates from a single profile), extend your plugin's `onJ2CommerceAfterGetTaxRateItems` listener to append the additional rates.

**`computeTax()` calls `getCustomerAddress()` even when you pass explicit `$geozoneIds`.**

The address object is needed for the `onJ2CommerceAfterGetTaxRateItems` event payload regardless of whether geozones were pre-resolved. If your code runs outside a Joomla session context (CLI, background tasks), be aware that `getCustomerAddress()` will return zero values for all fields. Pass an explicit address to `getCustomerGeozones()` instead, and pass the resulting IDs as the `$geozoneIds` argument.

---

## See Also

- [AJAX Product List Grid Event](./ajax-product-list-grid.md) — another core-concepts doc in this section; shows the same `J2CommerceHelper::plugin()->event()` dispatcher pattern used by `TaxHelper::getTaxRatesForProfile()`.
- `administrator/components/com_j2commerce/src/Helper/CartOrder.php` — the checkout-flow caller. The `calculateTotals()` method (around line 480) shows how per-item tax is accumulated, and `recalculateTaxAfterDiscounts()` shows how order-level discount tax scaling works.
- `administrator/components/com_j2commerce/src/Helper/TaxHelper.php` — the canonical source for all method signatures documented on this page.
