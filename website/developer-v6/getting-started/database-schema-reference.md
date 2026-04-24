---
title: "Database Schema Reference: J2Store to J2Commerce"
sidebar_label: "Database Schema Reference"
sidebar_position: 10
description: "Complete reference for extension developers migrating J2Store extensions to J2Commerce 6, covering all table renames, new tables, and per-table column changes."
---

# Database Schema Reference: J2Store to J2Commerce

This document is a complete database schema reference for extension developers migrating code from J2Store v4 to J2Commerce 6. Every table name, column name, type, and default documented here was verified directly against the install SQL files of both products — no columns or tables are assumed.

**Source of truth:** `administrator/components/com_j2commerce/sql/install.mysql.utf8.sql`

**Comparison base:** `administrator/components/com_j2store/sql/install/mysql/install.j2store.sql`

---

## Overview

J2Commerce 6 is a rewrite of J2Store v4 targeting native Joomla 6 MVC. The database was redesigned alongside the codebase. Most changes fall into three categories:

1. **Prefix rename** — every table and its primary key column use `j2commerce_` instead of `j2store_`.
2. **Joomla 6 audit columns** — tables that represent managed entities gained the standard Joomla access-control and audit column set.
3. **New functionality** — columns and tables that support features not present in J2Store v4.
4. **Removed tables** — a small number of J2Store tables were eliminated in favour of Joomla 6 native patterns (e.g., `#__j2store_configurations` → `#__extensions.params`).

Apply the universal rules first (section 2), then check the Removed Tables section, then section 4 for per-table differences. If a table you rely on is not listed in either section, only the universal prefix rules apply.

---

## Universal Naming Changes

These rules apply to every table and every query.

### Table prefix

| J2Store | J2Commerce |
|---------|------------|
| `#__j2store_*` | `#__j2commerce_*` |

### Primary key column naming

J2Store used `j2store_{entity}_id`. J2Commerce uses `j2commerce_{entity}_id`.

| J2Store example | J2Commerce equivalent |
|-----------------|----------------------|
| `j2store_order_id` | `j2commerce_order_id` |
| `j2store_product_id` | `j2commerce_product_id` |
| `j2store_orderitem_id` | `j2commerce_orderitem_id` |
| `j2store_country_id` | `j2commerce_country_id` |

### `enabled` column type

J2Store used `int(11)` for `enabled`. J2Commerce uses `tinyint` with `NOT NULL DEFAULT 0` or `NOT NULL DEFAULT 1` as appropriate.

### Character set

J2Store tables used `CHARSET=utf8`. J2Commerce tables use `CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`.

### MySQL 8 integer display widths

All MySQL integer display widths (`int(11)`, `tinyint(4)`, `bigint(20)`) are removed throughout J2Commerce. MySQL 8 ignores display widths for integer types — this is cosmetic cleanup only with no semantic effect. Per-table sections below do not list these changes.

### Before/after PHP query example

```php
// J2Store v4
$query = $db->getQuery(true)
    ->select('j2store_order_id, order_total, order_state_id')
    ->from('#__j2store_orders')
    ->where('user_id = :uid')
    ->bind(':uid', $userId, ParameterType::INTEGER);

// J2Commerce 6
$query = $db->getQuery(true)
    ->select('j2commerce_order_id, order_total, order_state_id')
    ->from('#__j2commerce_orders')
    ->where('user_id = :uid')
    ->bind(':uid', $userId, ParameterType::INTEGER);
```

---

## New Tables in J2Commerce 6

These tables have no equivalent in J2Store v4.

### `#__j2commerce_emailtype_tags`

Stores the available template tag definitions for each email type. Extensions can register their own tags via this table.

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `j2commerce_emailtype_tag_id` | `int` | NOT NULL | Auto-increment PK |
| `email_type` | `varchar(255)` | NOT NULL | e.g., `transactional` |
| `tag_name` | `varchar(100)` | NOT NULL | e.g., `ORDER_ID` |
| `tag_label` | `varchar(255)` | NOT NULL | Language key |
| `tag_description` | `text` | NULL | |
| `tag_group` | `varchar(100)` | NULL | Default: `general` |
| `ordering` | `int` | NOT NULL | Default: `0` |

### `#__j2commerce_emailtype_contexts`

Defines named sending contexts for each email type (e.g., `order_confirmed`, `order_shipped`). Extensions that add their own email types must register their contexts here.

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `j2commerce_emailtype_context_id` | `int` | NOT NULL | Auto-increment PK |
| `email_type` | `varchar(255)` | NOT NULL | |
| `context` | `varchar(100)` | NOT NULL | e.g., `order_confirmed` |
| `label` | `varchar(255)` | NOT NULL | Language key |
| `description` | `text` | NULL | |
| `ordering` | `int` | NOT NULL | Default: `0` |

Unique constraint on `(email_type, context)`.

### `#__j2commerce_geocode_cache`

Caches latitude/longitude results from geocoding API calls, keyed by a 32-character MD5 hash of the address string.

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `id` | `int unsigned` | NOT NULL | Auto-increment PK |
| `address_hash` | `char(32)` | NOT NULL | MD5 of normalized address — unique |
| `address_text` | `varchar(500)` | NOT NULL | Default: `''`. Original address string |
| `latitude` | `decimal(10,7)` | NOT NULL | |
| `longitude` | `decimal(10,7)` | NOT NULL | |
| `created` | `datetime` | NOT NULL | Default: `CURRENT_TIMESTAMP` |

### `#__j2commerce_orderfees`

Stores line-item fees attached to an order (separate from shipping or discounts). J2Store stored these as a single aggregate field in `orders.order_surcharge`.

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `j2commerce_orderfee_id` | `int unsigned` | NOT NULL | Auto-increment PK |
| `order_id` | `varchar(255)` | NOT NULL | FK to `orders.order_id` |
| `name` | `varchar(255)` | NOT NULL | Default: `''` |
| `amount` | `decimal(15,5)` | NOT NULL | Default: `0.00000` |
| `tax_class_id` | `int` | NOT NULL | Default: `0` |
| `taxable` | `int` | NOT NULL | Default: `0` |
| `tax` | `decimal(15,5)` | NOT NULL | Default: `0.00000` |
| `tax_data` | `text` | NULL | JSON breakdown |
| `fee_type` | `varchar(255)` | NOT NULL | Default: `''` |

### `#__j2commerce_paymentprofiles`

Stores saved payment tokens for recurring billing and saved-card checkout.

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `id` | `int unsigned` | NOT NULL | Auto-increment PK |
| `user_id` | `int` | NOT NULL | |
| `provider` | `varchar(50)` | NOT NULL | Default: `authorizenet` |
| `customer_profile_id` | `varchar(50)` | NOT NULL | Gateway customer ID |
| `payment_token` | `varchar(100)` | NOT NULL | Default: `''` |
| `token_label` | `varchar(100)` | NOT NULL | Default: `''`. Displayed to customer |
| `is_renewal_default` | `tinyint unsigned` | NOT NULL | Default: `0` |
| `environment` | `varchar(10)` | NOT NULL | Default: `production` |
| `is_default` | `tinyint unsigned` | NOT NULL | Default: `0` |
| `created_at` | `datetime` | NOT NULL | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | `datetime` | NOT NULL | `ON UPDATE CURRENT_TIMESTAMP` |

Unique constraint on `(user_id, provider, environment, payment_token)`.

### `#__j2commerce_queue_logs`

Per-run execution log for queue batch processing jobs.

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `j2commerce_queue_log_id` | `int unsigned` | NOT NULL | Auto-increment PK |
| `queue_type` | `varchar(100)` | NOT NULL | |
| `task_id` | `int unsigned` | NULL | Joomla scheduler task ID |
| `started_at` | `datetime` | NOT NULL | |
| `finished_at` | `datetime` | NULL | |
| `duration_ms` | `int unsigned` | NULL | Execution time in milliseconds |
| `items_total` | `smallint unsigned` | NOT NULL | Default: `0` |
| `items_success` | `smallint unsigned` | NOT NULL | Default: `0` |
| `items_failed` | `smallint unsigned` | NOT NULL | Default: `0` |
| `items_skipped` | `smallint unsigned` | NOT NULL | Default: `0` |
| `status` | `varchar(20)` | NOT NULL | `running`, `completed`, `error` |
| `error_message` | `text` | NULL | |
| `details` | `mediumtext` | NULL | JSON per-item results |
| `created_on` | `datetime` | NOT NULL | Default: `CURRENT_TIMESTAMP` |

---

## Removed Tables

These J2Store tables have no equivalent in J2Commerce. Any extension that reads or writes them must be updated.

### `#__j2store_configurations`

J2Commerce does not have a `#__j2commerce_configurations` table. Component settings are stored in the standard Joomla `#__extensions` table, in the `params` column of the `com_j2commerce` extension row — the same pattern used by all native Joomla 6 components.

**Before (J2Store):**

```php
// Reading a setting from the j2store_configurations table
$db = Factory::getDbo();
$query = $db->getQuery(true)
    ->select('config_meta_value')
    ->from('#__j2store_configurations')
    ->where('config_meta_key = :key')
    ->bind(':key', $key);
$db->setQuery($query);
$value = $db->loadResult();
```

**After (J2Commerce):**

```php
// Reading a setting via Joomla's ComponentHelper
use Joomla\CMS\Component\ComponentHelper;

$params = ComponentHelper::getParams('com_j2commerce');
$value  = $params->get('your_setting_key', 'default_value');
```

Settings are written through the standard Joomla component configuration form (`com_config`) and stored automatically in `#__extensions.params` as a JSON string. Extensions must not write directly to `#__extensions` — use `ComponentHelper::getParams()` for reads and the component config UI for writes.

---

## Per-Table Differences

The following tables have structural changes beyond the universal prefix rename. Only tables with verified column-level differences are listed.

### `#__j2commerce_addresses`

Gained the full Joomla 6 audit column set plus `enabled`, `ordering`, and `params`.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | Joomla access level |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |
| `ordering` | `int` | `0` | |
| `enabled` | `tinyint` | `1` | |
| `params` | `text` | `NULL` | |

**Migration note:** Extensions that INSERT into `addresses` must supply defaults for `enabled` (`1`), `ordering` (`0`), and `access` (`0`). All other new columns accept their defaults automatically.

---

### `#__j2commerce_carts`

Added `cart_voucher` and `cart_coupon` columns. J2Store stored voucher and coupon state inside the serialized `cart_params` blob; J2Commerce promotes them to dedicated indexed columns.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `cart_voucher` | `varchar(255)` | `''` | Active voucher code |
| `cart_coupon` | `varchar(255)` | `''` | Active coupon code |

**Migration note:** Extensions that read coupon or voucher state from a cart row must use these columns. Do not attempt to parse `cart_params` for these values.

---

### `#__j2commerce_countries`

Gained the full audit column set. The `enabled` and `ordering` columns existed in J2Store but used `int(11)` — J2Commerce uses `tinyint NOT NULL DEFAULT 0` and `int NOT NULL DEFAULT 0`.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_coupons`

Gained audit columns. The `valid_from` and `valid_to` columns changed from `datetime NOT NULL` (J2Store) to `datetime DEFAULT NULL` (J2Commerce) — allowing coupons with no expiry without needing `0000-00-00`.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

**Changed columns:**

| Column | J2Store type | J2Commerce type |
|--------|-------------|-----------------|
| `valid_from` | `datetime NOT NULL` | `datetime DEFAULT NULL` |
| `valid_to` | `datetime NOT NULL` | `datetime DEFAULT NULL` |

---

### `#__j2commerce_currencies`

`currency_value` changed from `float(15,8)` to `decimal(15,8)` — eliminates floating-point rounding errors in exchange rate storage. The `locked_on`/`locked_by` columns changed from `NOT NULL DEFAULT '0000-00-00 00:00:00'` to nullable `DEFAULT NULL`.

**Changed columns:**

| Column | J2Store type | J2Commerce type |
|--------|-------------|-----------------|
| `currency_value` | `float(15,8) NOT NULL` | `decimal(15,8) NOT NULL` |
| `locked_on` | `datetime NOT NULL DEFAULT '0000-00-00 00:00:00'` | `datetime DEFAULT NULL` |
| `locked_by` | `bigint(20) unsigned NOT NULL DEFAULT '0'` | `bigint unsigned NOT NULL DEFAULT 0` |
| `created_on` | `datetime NOT NULL DEFAULT '0000-00-00 00:00:00'` | `datetime DEFAULT CURRENT_TIMESTAMP` |
| `modified_on` | `datetime NOT NULL DEFAULT '0000-00-00 00:00:00'` | `datetime DEFAULT CURRENT_TIMESTAMP` |

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |

---

### `#__j2commerce_customfields`

Added three UI hint columns and the full audit column set.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `field_placeholder` | `varchar(250)` | `NULL` | HTML placeholder attribute |
| `field_autocomplete` | `varchar(100)` | `NULL` | HTML autocomplete value |
| `field_width` | `varchar(20)` | `''` | Bootstrap column class, e.g., `col-md-6` |
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_emailtemplates`

Gained `context`, `body_json`, `body_source` (changed semantics — see note), `custom_css`, and the full audit column set.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `context` | `varchar(100)` | `''` | Maps to `emailtype_contexts.context` |
| `body_json` | `mediumtext` | `NULL` | Structured body for visual editor |
| `custom_css` | `text` | `NULL` | Per-template CSS overrides |
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

**Changed columns:**

| Column | J2Store default | J2Commerce default | Notes |
|--------|----------------|-------------------|-------|
| `body_source` | `varchar(255) NOT NULL` | `varchar(255) NOT NULL DEFAULT 'editor'` | Added default |
| `body_source_file` | `varchar(255) NOT NULL` | `varchar(255) NOT NULL DEFAULT ''` | Added default |

**Migration note:** J2Store email templates have no `context`. When migrating templates, set `context` to `order_confirmed` (or the appropriate value from `emailtype_contexts`) based on the order status the template was previously associated with.

---

### `#__j2commerce_filtergroups`

Gained audit columns.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_geozones`

Gained `ordering` and audit columns. J2Store had no `ordering` column on this table.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |
| `ordering` | `int` | `0` | |

---

### `#__j2commerce_invoicetemplates`

Gained `body_json`, `body_source`, `body_source_file`, `custom_css`, and the full audit column set.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `body_json` | `mediumtext` | `NULL` | Structured body |
| `body_source` | `varchar(255)` | `'editor'` | |
| `body_source_file` | `varchar(255)` | `''` | |
| `custom_css` | `text` | `NULL` | |
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_lengths`

Added `num_decimals` and the full audit column set.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `num_decimals` | `int` | `2` | Decimal places for display |
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_manufacturers`

Added `brand_desc_id` and the full audit column set.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `brand_desc_id` | `int` | `0` | FK to Joomla article (brand description) |
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_options`

Gained audit columns.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_orderdiscounts`

Added `from_order_id` for renewal order lineage tracking.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `from_order_id` | `varchar(255)` | `'0'` | Source order ID for renewal orders |

---

### `#__j2commerce_orderdownloads`

Added `from_order_id`.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `from_order_id` | `varchar(255)` | `'0'` | Source order ID for renewal orders |

---

### `#__j2commerce_orderhistories`

Added `from_order_id`.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `from_order_id` | `varchar(255)` | `'0'` | Source order ID for renewal orders |

---

### `#__j2commerce_orderinfos`

Added `from_order_id`.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `from_order_id` | `varchar(255)` | `'0'` | Source order ID for renewal orders |

---

### `#__j2commerce_orderitems`

Added `from_order_id` and `orderitem_type`.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `from_order_id` | `varchar(255)` | `'0'` | Source order ID for renewal orders |
| `orderitem_type` | `varchar(255)` | `'normal'` | e.g., `normal`, `renewal` |

---

### `#__j2commerce_orders`

Added several columns for renewal order support, campaign tracking, and Joomla 6 audit compliance.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `from_order_id` | `varchar(255)` | `'0'` | Source order for renewal |
| `order_type` | `varchar(255)` | `'normal'` | e.g., `normal`, `renewal` |
| `parent_id` | `int` | `NULL` | Parent order PK for child orders |
| `subscription_id` | `int` | `NULL` | FK to subscription record |
| `order_subtotal_ex_tax` | `decimal(15,5)` | `NULL` | Subtotal excluding tax |
| `order_discount_tax` | `decimal(15,5)` | `NULL` | Tax portion of discount |
| `order_refund` | `decimal(15,5)` | `NULL` | Refunded amount |
| `order_fees` | `decimal(15,5)` | `NULL` | Total fees (aggregate from `orderfees`) |
| `order_params` | `text` | `NULL` | JSON extra parameters |
| `access` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |
| `campaign_double_opt_in` | `int` | `NULL` | Email marketing opt-in flag |
| `campaign_order_id` | `varchar(255)` | `NULL` | External campaign order reference |

**Changed columns:**

| Column | J2Store type | J2Commerce type |
|--------|-------------|-----------------|
| `created_on` | `datetime NOT NULL` (no default) | `datetime NOT NULL DEFAULT CURRENT_TIMESTAMP` |
| `created_by` | `int(11) NOT NULL` | `int unsigned NOT NULL DEFAULT '0'` |
| `modified_on` | `datetime NOT NULL` (no default) | `datetime NOT NULL DEFAULT CURRENT_TIMESTAMP` |
| `modified_by` | `int(11) NOT NULL` | `int unsigned NOT NULL DEFAULT '0'` |

---

### `#__j2commerce_orderstatuses`

Gained audit columns.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_ordertaxes`

Added `from_order_id`.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `from_order_id` | `varchar(255)` | `'0'` | Source order ID for renewal orders |

---

### `#__j2commerce_productimages`

Added thumbnail (`tiny_image*`) columns and additional thumbnail columns for multi-image support.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `tiny_image` | `text` | `NULL` | Small thumbnail path |
| `tiny_image_alt` | `varchar(255)` | `''` | |
| `additional_thumb_images` | `longtext` | `NULL` | JSON array of thumb paths |
| `additional_thumb_images_alt` | `longtext` | `NULL` | |
| `additional_tiny_images` | `longtext` | `NULL` | JSON array of tiny paths |
| `additional_tiny_images_alt` | `longtext` | `NULL` | |

---

### `#__j2commerce_products`

Added `main_tag`, `access`, `hits`, `checked_out`, `checked_out_time`, and `ordering`. The `created_on`/`modified_on` type changed from `varchar` to `datetime`.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `main_tag` | `varchar(255)` | `NULL` | Primary Joomla tag ID |
| `access` | `int unsigned` | `0` | |
| `hits` | `int unsigned` | `0` | View count |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |
| `ordering` | `int` | `0` | |

**Changed columns:**

| Column | J2Store type | J2Commerce type | Notes |
|--------|-------------|-----------------|-------|
| `created_on` | `varchar(255) DEFAULT NULL` | `datetime NOT NULL DEFAULT CURRENT_TIMESTAMP` | Type corrected |
| `modified_on` | `varchar(45) DEFAULT NULL` | `datetime NOT NULL DEFAULT CURRENT_TIMESTAMP` | Type corrected |
| `enabled` | `int(11) DEFAULT NULL` | `tinyint NOT NULL DEFAULT 0` | |
| `productfilter_ids` | `varchar(255) NOT NULL` | `varchar(255) DEFAULT NULL` | Nullability changed |

---

### `#__j2commerce_product_optionvalues`

Added `ordering` column. J2Store did not have an `ordering` column on this table.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `ordering` | `int` | `0` | Display order of option values |

---

### `#__j2commerce_taxprofiles`

Gained audit columns.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_taxrates`

Gained audit columns.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_variants`

`params`, `sold`, `created_on`, and `modified_on` types were corrected. J2Store stored `created_on` and `modified_on` as `varchar` — J2Commerce uses `datetime`.

**Changed columns:**

| Column | J2Store type | J2Commerce type |
|--------|-------------|-----------------|
| `created_on` | `varchar(255) DEFAULT NULL` | `datetime NOT NULL DEFAULT CURRENT_TIMESTAMP` |
| `modified_on` | `varchar(45) DEFAULT NULL` | `datetime NOT NULL DEFAULT CURRENT_TIMESTAMP` |
| `allow_backorder` | `int(11) NOT NULL` | `int NOT NULL` |
| `isdefault_variant` | `int(11) NOT NULL` | `int NOT NULL` |

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `params` | `text` | `NULL` | Extra variant parameters |
| `sold` | `decimal(12,4)` | `NULL` | Sold quantity tracked at variant level |

---

### `#__j2commerce_vendors`

Renamed `j2store_user_id` to `j2commerce_user_id`. Gained audit columns.

**Renamed columns:**

| J2Store column | J2Commerce column |
|---------------|------------------|
| `j2store_user_id` | `j2commerce_user_id` |

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

**Migration note:** Any extension that references `j2store_user_id` in a query against the vendors table must update the column name to `j2commerce_user_id`.

---

### `#__j2commerce_vouchers`

Gained `valid_from`, `valid_to`, `from_order_id`, and audit columns. J2Store vouchers had no date validity range.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `valid_from` | `datetime` | `NULL` | Voucher start date |
| `valid_to` | `datetime` | `NULL` | Voucher expiry date |
| `from_order_id` | `varchar(255)` | `'0'` | Source order for renewal |
| `access` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

**Changed columns:**

| Column | J2Store type | J2Commerce type |
|--------|-------------|-----------------|
| `created_on` | `datetime NOT NULL` (no default) | `datetime NOT NULL DEFAULT CURRENT_TIMESTAMP` |
| `created_by` | `int(11) NOT NULL` | `int unsigned NOT NULL DEFAULT 0` |

---

### `#__j2commerce_weights`

Added `num_decimals` and the full audit column set.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `num_decimals` | `int` | `2` | Decimal places for display |
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

### `#__j2commerce_queues`

J2Store had a 10-column queue table. J2Commerce fully redesigned it with worker locking, retry logic, dead-letter support, and proper datetime types.

**Added columns (not in J2Store):**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `item_type` | `varchar(50)` | `'order'` | Subject type |
| `error_message` | `text` | `NULL` | Last error text |
| `attempt_count` | `smallint unsigned` | `0` | Retry count |
| `max_attempts` | `smallint unsigned` | `10` | Max retries before dead-letter |
| `next_attempt_at` | `datetime` | `NULL` | Earliest retry time |
| `locked_at` | `datetime` | `NULL` | Concurrency lock timestamp |
| `locked_by` | `varchar(64)` | `NULL` | Process ID holding lock |
| `processed_at` | `datetime` | `NULL` | Completion timestamp |

**Changed columns:**

| Column | J2Store type | J2Commerce type | Notes |
|--------|-------------|-----------------|-------|
| `queue_type` | `varchar(255)` | `varchar(100)` | Shortened |
| `queue_data` | `longtext` | `mediumtext` | |
| `params` | `longtext` | `mediumtext` | |
| `priority` | `int(11)` | `tinyint` | |
| `status` | `varchar(255)` | `varchar(20)` | Values: `pending`, `processing`, `completed`, `failed`, `dead` |
| `created_on` | `varchar(255)` | `datetime NOT NULL DEFAULT CURRENT_TIMESTAMP` | Type corrected |
| `modified_on` | `varchar(255)` | `datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP` | Type corrected |

**Removed columns:**

| Column | J2Store type | Notes |
|--------|-------------|-------|
| `expired` | `datetime` | Replaced by `next_attempt_at` |

---

### `#__j2commerce_productprice_index`

Minor schema cleanup: explicit defaults added to price columns; redundant unique index removed.

**Changed columns:**

| Column | J2Store | J2Commerce | Notes |
|--------|---------|------------|-------|
| `min_price` | `decimal(15,5) NOT NULL` (no default) | `decimal(15,5) NOT NULL DEFAULT 0.00000` | Default added |
| `max_price` | `decimal(15,5) NOT NULL` (no default) | `decimal(15,5) NOT NULL DEFAULT 0.00000` | Default added |

**Changed indexes:** J2Store defined both `PRIMARY KEY (product_id)` and a redundant `UNIQUE KEY uq_product (product_id)`. J2Commerce removes the redundant unique key.

---

### `#__j2commerce_zones`

Gained audit columns.

**Added columns:**

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| `access` | `int unsigned` | `0` | |
| `created_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `created_by` | `int unsigned` | `0` | |
| `modified_on` | `datetime` | `CURRENT_TIMESTAMP` | |
| `modified_by` | `int unsigned` | `0` | |
| `checked_out` | `int unsigned` | `NULL` | |
| `checked_out_time` | `datetime` | `NULL` | |

---

## Tables With No Structural Changes Beyond Prefix Rename

The following tables required only the universal table prefix and primary key column rename. Apply the rules from section 2 mechanically — no column changes are needed.

- `#__j2commerce_cartitems`
- `#__j2commerce_filters`
- `#__j2commerce_geozonerules`
- `#__j2commerce_metafields`
- `#__j2commerce_optionvalues`
- `#__j2commerce_orderitemattributes`
- `#__j2commerce_ordershippings`
- `#__j2commerce_productfiles`
- `#__j2commerce_product_filters`
- `#__j2commerce_product_options`
- `#__j2commerce_product_prices`
- `#__j2commerce_product_variant_optionvalues`
- `#__j2commerce_productquantities`
- `#__j2commerce_shippingmethods`
- `#__j2commerce_shippingrates`
- `#__j2commerce_taxrules`
- `#__j2commerce_uploads`

---

## Joomla 6 Audit Fields Reference

Many J2Commerce tables gained the standard Joomla 6 managed-entity column set. These columns are not repeated in every table section above — consult this reference when working with them.

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| `access` | `int unsigned NOT NULL` | `0` | Joomla access level ID (maps to `#__viewlevels`) |
| `created_on` | `datetime NOT NULL` | `CURRENT_TIMESTAMP` | Row creation timestamp |
| `created_by` | `int unsigned NOT NULL` | `0` | Joomla user ID who created the row |
| `modified_on` | `datetime NOT NULL` | `CURRENT_TIMESTAMP` | Last modification timestamp |
| `modified_by` | `int unsigned NOT NULL` | `0` | Joomla user ID who last modified the row |
| `checked_out` | `int unsigned` | `NULL` | User ID holding edit lock; `NULL` when not locked |
| `checked_out_time` | `datetime` | `NULL` | When the edit lock was acquired |

### How J2Commerce Table classes populate these

The `check()` method in each Table class sets defaults for `created_on` and `modified_on` when empty. The standard `onBeforeStore()` hook provided by Joomla's `Table` base class sets `modified_on` automatically on every save, and `created_on` only when the row is new. The `checked_out` and `checked_out_time` columns are managed by the admin controller's `checkout()` / `checkin()` flow.

```php
// File: administrator/components/com_j2commerce/src/Table/CountryTable.php

public function check(): bool
{
    if (empty($this->ordering)) {
        $this->ordering = 0;
    }

    if (!isset($this->enabled) || $this->enabled === '') {
        $this->enabled = 1;
    }

    return parent::check();
}
```

The `access` column defaults to `0` on INSERT. J2Commerce admin list views filter by access level automatically when displaying rows to a user; extension code that creates rows programmatically should set `access` explicitly if the row should be visible only to specific user groups.

---

## Related

- [Payment Plugin Development](../extensions/plugins/payment/payment-plugin-development)

