---
title: "Payment Profiles Table"
sidebar_label: "Payment Profiles"
sidebar_position: 10
description: "Shared database table for storing gateway customer profile IDs across all J2Commerce payment plugins."
---

# Payment Profiles Table

The `#__j2commerce_paymentprofiles` table is a shared resource that any J2Commerce payment plugin can use to store gateway-level customer profile IDs — such as an Authorize.Net CIM `customerProfileId` or a Stripe `cus_xxx` ID. Plugins write to this table directly; no separate table per plugin is required.

## Design Principles

- **One table, all gateways.** The `provider` column namespaces each row. Plugins never create or drop this table.
- **Customer mapping only.** Only the gateway's customer-level identifier is stored locally. Individual payment method IDs (cards, bank accounts, saved sources) live on the gateway and are fetched via API at runtime.
- **Environment isolation.** A `sandbox` profile and a `production` profile are separate rows for the same user. They must never be mixed.
- **Table lifecycle.** The table is created by the core J2Commerce `install.mysql.utf8.sql`. When a payment plugin is uninstalled, its rows may optionally be cleaned up, but the table itself must remain.

## Schema

```sql
CREATE TABLE IF NOT EXISTS `#__j2commerce_paymentprofiles` (
    `id`                  INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id`             INT          NOT NULL,
    `provider`            VARCHAR(50)  NOT NULL DEFAULT 'authorizenet'
                          COMMENT 'Payment gateway identifier',
    `customer_profile_id` VARCHAR(50)  NOT NULL
                          COMMENT 'Gateway customer/profile ID',
    `environment`         VARCHAR(10)  NOT NULL DEFAULT 'production'
                          COMMENT 'sandbox or production',
    `created_at`          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                          ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `idx_user_provider_env` (`user_id`, `provider`, `environment`),
    KEY `idx_customer_profile` (`customer_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Columns

| Column | Type | Description |
|--------|------|-------------|
| `id` | `INT UNSIGNED` | Auto-increment primary key. |
| `user_id` | `INT` | Joomla user ID (`#__users.id`). |
| `provider` | `VARCHAR(50)` | Lowercase gateway identifier — see [Provider Naming Convention](#provider-naming-convention). |
| `customer_profile_id` | `VARCHAR(50)` | The gateway's customer or profile ID (e.g., Authorize.Net `customerProfileId`, Stripe `cus_xxx`). |
| `environment` | `VARCHAR(10)` | `sandbox` or `production`. Never mix environments for the same user. |
| `created_at` | `DATETIME` | Row creation timestamp, set automatically. |
| `updated_at` | `DATETIME` | Last modification timestamp, updated automatically on every write. |

The UNIQUE constraint on `(user_id, provider, environment)` enforces exactly one profile per user per gateway per environment. Use `INSERT ... ON DUPLICATE KEY UPDATE` to upsert safely.

## Provider Naming Convention

Use lowercase identifiers with no spaces or special characters:

| Gateway | `provider` value |
|---------|-----------------|
| Authorize.Net | `authorizenet` |
| Stripe | `stripe` |
| Square | `square` |
| Braintree | `braintree` |
| PayPal (vault) | `paypal` |

Establish your identifier in the plugin's documentation and use it consistently. Changing it after rows exist will orphan existing profiles.

## PHP Usage

### Save a Profile

```php
use Joomla\Database\ParameterType;

$db       = $this->getDatabase();
$query    = $db->getQuery(true);
$provider = 'stripe';

$query->insert($db->quoteName('#__j2commerce_paymentprofiles'))
    ->columns(['user_id', 'provider', 'customer_profile_id', 'environment'])
    ->values(':userId, :provider, :profileId, :env')
    ->bind(':userId',    $userId,            ParameterType::INTEGER)
    ->bind(':provider',  $provider)
    ->bind(':profileId', $customerProfileId)
    ->bind(':env',       $environment);

$db->setQuery($query)->execute();
```

### Upsert (Insert or Update)

Because the UNIQUE constraint will reject a duplicate insert, use the MySQL `ON DUPLICATE KEY UPDATE` idiom when you want to overwrite an existing profile:

```php
$db->setQuery(
    'INSERT INTO ' . $db->quoteName('#__j2commerce_paymentprofiles') .
    ' (' . $db->quoteName('user_id') . ', ' .
           $db->quoteName('provider') . ', ' .
           $db->quoteName('customer_profile_id') . ', ' .
           $db->quoteName('environment') . ')' .
    ' VALUES (:userId, :provider, :profileId, :env)' .
    ' ON DUPLICATE KEY UPDATE ' .
    $db->quoteName('customer_profile_id') . ' = VALUES(' . $db->quoteName('customer_profile_id') . ')'
)->bind(':userId',    $userId,            ParameterType::INTEGER)
 ->bind(':provider',  $provider)
 ->bind(':profileId', $customerProfileId)
 ->bind(':env',       $environment);

$db->execute();
```

### Look Up a Profile

```php
$query = $db->getQuery(true)
    ->select($db->quoteName('customer_profile_id'))
    ->from($db->quoteName('#__j2commerce_paymentprofiles'))
    ->where($db->quoteName('user_id')    . ' = :userId')
    ->where($db->quoteName('provider')   . ' = :provider')
    ->where($db->quoteName('environment') . ' = :env')
    ->bind(':userId',   $userId, ParameterType::INTEGER)
    ->bind(':provider', $provider)
    ->bind(':env',      $environment);

$profileId = $db->setQuery($query)->loadResult();
```

`loadResult()` returns `null` when no row exists — treat that as "no saved profile, proceed as a new customer."

### Delete on Plugin Uninstall (Optional)

```php
$query = $db->getQuery(true)
    ->delete($db->quoteName('#__j2commerce_paymentprofiles'))
    ->where($db->quoteName('provider') . ' = :provider')
    ->bind(':provider', $provider);

$db->setQuery($query)->execute();
```

Run this in the plugin's `onExtensionBeforeUninstall` handler only if your privacy policy requires it. The table itself must not be dropped.

## Migration from J2Store

If the previous J2Store installation stored Authorize.Net profiles in `#__j2store_payment_profiles`, migrate them with:

```sql
INSERT INTO `#__j2commerce_paymentprofiles`
    (`user_id`, `provider`, `customer_profile_id`, `environment`)
SELECT
    `user_id`,
    'authorizenet',
    `profile_id`,
    CASE WHEN `provider` LIKE '%Sandbox%' THEN 'sandbox' ELSE 'production' END
FROM `#__j2store_payment_profiles`
WHERE `provider` LIKE 'Authorize.net%';
```

Adjust the `WHERE` clause and `provider` mapping for any other gateways stored in the legacy table.

## Related

- [Payment Plugin Development](../index.md)
- [Order Lifecycle](../../../features/payments/index.md)
