---
title: "onJ2CommerceGetSavedPaymentMethods Event"
sidebar_label: "Saved Payment Methods Event"
sidebar_position: 15
description: "Event for payment plugins to return structured payment method data for the unified Payment Methods tab."
---

# onJ2CommerceGetSavedPaymentMethods Event

## Overview

The `onJ2CommerceGetSavedPaymentMethods` event allows payment plugins to return structured payment method data for display in the unified "Payment Methods" tab in the customer's My Account profile.

## When to Use

Implement this event when your payment plugin supports:
- Saved credit/debit cards
- Stored payment methods (wallets, bank accounts)
- Customer payment profiles

Plugins that do NOT implement this event will continue using the legacy `onJ2CommerceMyProfileTab` and `onJ2CommerceMyProfileTabContent` events for separate tabs.

## Event Registration

Add the event to your plugin's `getSubscribedEvents()` method:

```php
public static function getSubscribedEvents(): array
{
    return [
        // ... other events ...
        'onJ2CommerceGetSavedPaymentMethods' => 'onGetSavedPaymentMethods',
    ];
}
```

## Event Handler Signature

```php
public function onGetSavedPaymentMethods(Event $event): void
{
    $userId = $event->getArgument('user_id', 0);

    // Skip if not enabled or user not logged in
    if ($userId < 1 || !(int) $this->params->get('allow_saved_cards', 1)) {
        return;
    }

    // Get saved payment methods from your gateway
    $methods = $this->getSavedMethodsFromGateway($userId);

    // Build result array
    $result = $event->getArgument('result', []);

    foreach ($methods as $method) {
        $result[] = [
            'id' => $method->id,
            'provider' => 'your_plugin_name',
            'type' => 'card',
            'display_name' => 'Visa ending in 4242',
            'brand' => 'visa',
            'last4' => '4242',
            'exp_month' => 12,
            'exp_year' => 2025,
            'icon' => null,  // Optional: custom icon URL
            'is_default' => true,
            'actions' => ['delete', 'set_default'],
            'metadata' => [],
        ];
    }

    $event->setArgument('result', $result);
}
```

## PaymentMethodData Structure

Return an array of associative arrays with these keys:

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| `id` | string | Yes | Unique payment method identifier from your gateway |
| `provider` | string | Yes | Your plugin identifier (lowercase, no spaces) |
| `type` | string | Yes | Payment type: `card`, `bank_account`, `wallet`, etc. |
| `display_name` | string | Yes | Human-readable label (e.g., "Visa ending in 4242") |
| `brand` | string | No | Card brand (visa, mastercard, amex, discover) |
| `last4` | string | No | Last 4 digits of card/account |
| `exp_month` | int | No | Expiration month (1-12) |
| `exp_year` | int | No | Expiration year (4-digit) |
| `icon` | string | No | Custom icon URL (uses default brand icon if null) |
| `is_default` | bool | Yes | Whether this is the customer's default payment method |
| `actions` | array | Yes | Available actions: `['delete']`, `['delete', 'set_default']`, etc. |
| `metadata` | array | No | Provider-specific data (not displayed to user) |

## Brand Icon Resolution

The core component automatically provides brand icons for common card types:

| Brand | Icon Path |
|-------|-----------|
| visa | `media/com_j2commerce/images/payment-methods/visa.svg` |
| mastercard | `media/com_j2commerce/images/payment-methods/mastercard.svg` |
| amex | `media/com_j2commerce/images/payment-methods/amex.svg` |
| discover | `media/com_j2commerce/images/payment-methods/discover.svg` |
| (default) | `media/com_j2commerce/images/payment-methods/generic-card.svg` |

To provide a custom icon, set the `icon` key with a full URL path.

## Provider Naming Convention

Use consistent lowercase identifiers:

| Gateway | `provider` value |
|---------|-----------------|
| Stripe | `stripe` |
| Authorize.net | `authorizenet` |
| PayTrace | `paytrace` |
| Square | `square` |
| Braintree | `braintree` |
| PayPal | `paypal` |

## AJAX Actions

The unified Payment Methods tab uses your plugin's existing AJAX endpoints. Ensure these are implemented:

### Delete Card

```
POST index.php?option=com_ajax&plugin={your_plugin}&task=deleteCard&format=json
```

Parameters:
- `{csrf_token}`: Form token value
- `payment_method_id`: The payment method ID to delete

Response:
```json
{
    "success": true
}
// or
{
    "success": false,
    "error": "Error message to display"
}
```

### Set Default (Optional)

```
POST index.php?option=com_ajax&plugin={your_plugin}&task=setDefaultCard&format=json
```

Parameters:
- `{csrf_token}`: Form token value
- `payment_method_id`: The payment method ID to set as default

## Example: Complete Implementation

```php
<?php
declare(strict_types=1);

namespace Your\Plugin\J2Commerce\PaymentYourplugin\Extension;

use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;
use Joomla\Event\Event;

final class PaymentYourplugin extends CMSPlugin implements SubscriberInterface
{
    protected $_name = 'payment_yourplugin';

    public static function getSubscribedEvents(): array
    {
        return [
            'onJ2CommerceGetPaymentPlugins' => 'onGetPaymentPlugins',
            'onJ2CommerceGetPaymentOptions' => 'onGetPaymentOptions',
            'onJ2CommercePrePayment' => 'onPrePayment',
            'onJ2CommercePostPayment' => 'onPostPayment',
            'onJ2CommerceGetSavedPaymentMethods' => 'onGetSavedPaymentMethods',
            'onAjaxPayment_yourplugin' => 'onAjaxHandler',
        ];
    }

    public function onGetSavedPaymentMethods(Event $event): void
    {
        $userId = $event->getArgument('user_id', 0);

        // Skip if feature disabled
        if (!(int) $this->params->get('allow_saved_cards', 1)) {
            return;
        }

        // Must have logged-in user
        if ($userId < 1) {
            return;
        }

        try {
            // Get customer profile from your gateway
            $customerProfile = $this->getCustomerProfile($userId);

            if (!$customerProfile) {
                return;
            }

            // Get payment methods from gateway
            $paymentMethods = $this->fetchPaymentMethods($customerProfile);

            $result = $event->getArgument('result', []);

            foreach ($paymentMethods as $pm) {
                $result[] = [
                    'id' => $pm->id,
                    'provider' => 'yourplugin',
                    'type' => 'card',
                    'display_name' => ucfirst($pm->brand) . ' ending in ' . $pm->last4,
                    'brand' => strtolower($pm->brand),
                    'last4' => $pm->last4,
                    'exp_month' => (int) $pm->expMonth,
                    'exp_year' => (int) $pm->expYear,
                    'icon' => null,
                    'is_default' => (bool) $pm->isDefault,
                    'actions' => ['delete', 'set_default'],
                    'metadata' => [
                        'customer_profile_id' => $customerProfile->id,
                    ],
                ];
            }

            $event->setArgument('result', $result);

        } catch (\Throwable $e) {
            // Log error but don't throw - other plugins should still work
            $this->logError('GetSavedPaymentMethods failed: ' . $e->getMessage());
        }
    }

    public function onAjaxHandler(Event $event): void
    {
        $app = Factory::getApplication();
        $task = $app->input->getCmd('task', '');
        $user = $app->getIdentity();

        // Authentication check
        if (!$user || $user->guest) {
            $event->setArgument('result', [json_encode([
                'success' => false,
                'error' => 'Not authenticated',
            ])]);
            return;
        }

        // CSRF check
        if (!Session::checkToken('request')) {
            $event->setArgument('result', [json_encode([
                'success' => false,
                'error' => 'Invalid token',
            ])]);
            return;
        }

        $result = match ($task) {
            'deleteCard' => $this->deletePaymentMethod($user->id, $app->input->getString('payment_method_id')),
            'setDefaultCard' => $this->setDefaultMethod($user->id, $app->input->getString('payment_method_id')),
            default => ['success' => false, 'error' => 'Unknown task'],
        };

        $event->setArgument('result', [json_encode($result)]);
    }

    private function deletePaymentMethod(int $userId, string $methodId): array
    {
        // Implementation specific to your gateway
        // ...

        return ['success' => true];
    }

    private function setDefaultMethod(int $userId, string $methodId): array
    {
        // Implementation specific to your gateway
        // ...

        return ['success' => true];
    }

    // ... other methods
}
```

## Backward Compatibility

If your plugin currently uses `onJ2CommerceMyProfileTab` and `onJ2CommerceMyProfileTabContent`:

1. Implement `onJ2CommerceGetSavedPaymentMethods` for the unified tab
2. Keep legacy handlers but have them return empty results
3. The core will use the unified tab when any plugin provides data via the new event

```php
// Legacy handlers (empty for unified tab)
public function onMyProfileTab(Event $event): void
{
    // Return empty - using unified Payment Methods tab
}

public function onMyProfileTabContent(Event $event): void
{
    // Return empty - using unified Payment Methods tab
}
```

## Related

- [Payment Profiles Table](./payment_profiles.md) - Database table for customer profiles
- [Payment Plugin Development](./index.md) - General payment plugin guide