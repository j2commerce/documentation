---
title: "CLI Plugin Development"
sidebar_label: "CLI Plugin Development"
sidebar_position: 1
description: "Generate J2Commerce payment and shipping plugins using the command-line scaffolding tool."
---

# CLI Plugin Development

The J2Commerce CLI scaffolding tool generates complete payment and shipping plugins from templates, reducing development time from hours to minutes. The tool uses stub files with placeholder tokens and conditional blocks to create production-ready plugin code.

## Prerequisites

Before using the scaffolding tool, ensure:

1. **J2Commerce 6** is installed and enabled
2. **Console plugin** `plg_console_j2commerce` is enabled
3. **Command-line access** to your Joomla installation (SSH or terminal)

## Quick Start

### Enable the Console Plugin

If the console plugin is not yet enabled:

```bash
# Navigate to your Joomla root directory
cd /path/to/joomla

# Discover extensions
php cli/joomla.php extension:discover

# List console plugins to verify
php cli/joomla.php extension:list --type=plugin | grep console
```

Enable the plugin via the admin interface:

1. Go to **System** -> **Plugins**
2. Search for "J2Commerce Console"
3. Set **Status** to **Enabled**

### Generate a Payment Plugin (Interactive)

```bash
php cli/joomla.php j2commerce:create:plugin payment stripe
```

### Generate a Shipping Plugin (Interactive)

```bash
php cli/joomla.php j2commerce:create:plugin shipping ups
```

## Command Reference

### Syntax

```bash
php cli/joomla.php j2commerce:create:plugin <type> <name> [options]
```

### Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `type` | Yes | Plugin type: `payment` or `shipping` |
| `name` | Yes | Plugin name (lowercase, underscores, must start with letter) |

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `--path=DIR` | Current directory | Output directory for generated files |
| `--install` | false | Copy generated plugin to `plugins/j2commerce/` directory |
| `--force` | false | Overwrite existing files without prompting |
| `-n` | false | Non-interactive mode (use default options) |

### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Invalid type argument |
| 2 | Invalid name format |
| 3 | Files already exist (use `--force` to overwrite) |
| 4 | Stub file not found or processing error |

## Interactive Mode Walkthrough

### Payment Plugin Prompts

When you run:

```bash
php cli/joomla.php j2commerce:create:plugin payment my_gateway
```

The command prompts for configuration options:

```
Creating payment plugin
========================

Answer the following questions to customize your plugin:

 Display name (human-readable) [My Gateway]: Stripe
 Include sandbox mode support? [Yes]: y
 Include sandbox credential fields? [Yes]: y
 Include webhook support? [No]: n
 Include surcharge support? [Yes]: y
 Include geozone restriction? [Yes]: y
 Include min/max subtotal limits? [No]: n
 Include debug logging? [Yes]: y

 [OK] Created payment plugin: payment_stripe
   * services/provider.php
   * src/Extension/PaymentStripe.php
   * language/en-GB/plg_j2commerce_payment_stripe.ini
   * language/en-GB/plg_j2commerce_payment_stripe.sys.ini
   * payment_stripe.xml
   * tmpl/prepayment.php
   * tmpl/postpayment.php
   * tmpl/message.php
```

### Shipping Plugin Prompts

When you run:

```bash
php cli/joomla.php j2commerce:create:plugin shipping my_carrier
```

The command prompts for configuration options:

```
Creating shipping plugin
=========================

Answer the following questions to customize your plugin:

 Display name (human-readable) [My Carrier]: UPS
 Include API credentials? [Yes]: y
 Include sandbox mode support? [Yes]: y
 Include surcharge support? [Yes]: y
 Include geozone restriction? [Yes]: y
 Include shipping tax (tax profile field)? [Yes]: y
 Include custom rate table? [No]: n
 Include debug logging? [Yes]: y

 [OK] Created shipping plugin: shipping_ups
   * services/provider.php
   * src/Extension/ShippingUps.php
   * language/en-GB/plg_j2commerce_shipping_ups.ini
   * language/en-GB/plg_j2commerce_shipping_ups.sys.ini
   * shipping_ups.xml
   * forms/shippingmethod.xml
   * tmpl/method.php
```

### Payment Plugin Options

| Prompt | Default | Description |
|--------|---------|-------------|
| Display name | Auto-generated from name | Human-readable name shown to customers (e.g., "Stripe") |
| Sandbox mode support | Yes | Include sandbox/production toggle for testing |
| Sandbox credential fields | Yes | Add sandbox API key and secret fields (only if sandbox enabled) |
| Webhook support | No | Add webhook ID and secret fields for payment notifications |
| Surcharge support | Yes | Add surcharge name, percent, and fixed amount fields |
| Geozone restriction | Yes | Add geozone filter field to limit by region |
| Min/max subtotal limits | No | Add order amount restriction fields |
| Debug logging | Yes | Add debug toggle for logging API requests |

### Shipping Plugin Options

| Prompt | Default | Description |
|--------|---------|-------------|
| Display name | Auto-generated from name | Human-readable name shown to customers (e.g., "UPS") |
| API credentials | Yes | Include API key and secret fields |
| Sandbox mode support | Yes | Include sandbox toggle for testing |
| Surcharge support | Yes | Add surcharge fields |
| Geozone restriction | Yes | Add geozone filter field |
| Shipping tax | Yes | Add tax profile field for shipping tax |
| Custom rate table | No | Include local method/rate tables for custom shipping rates |
| Debug logging | Yes | Add debug toggle |

## Non-Interactive Mode

Use non-interactive mode with the `-n` flag to generate a plugin with all default options:

```bash
# Generate payment plugin with all defaults
php cli/joomla.php j2commerce:create:plugin payment stripe -n

# Generate shipping plugin with all defaults
php cli/joomla.php j2commerce:create:plugin shipping ups -n
```

Default options for **payment** plugins:
- Sandbox mode: enabled
- Sandbox credentials: enabled
- Webhook support: disabled
- Surcharge: enabled
- Geozone: enabled
- Min/max subtotal: disabled
- Debug: enabled

Default options for **shipping** plugins:
- API credentials: enabled
- Sandbox mode: enabled
- Surcharge: enabled
- Geozone: enabled
- Shipping tax: enabled
- Custom rate table: disabled
- Debug: enabled

## Name Normalization

The command normalizes the plugin name into multiple formats automatically:

| Input Name | Element | Class Name | Display Name (default) |
|------------|---------|------------|------------------------|
| `stripe` | `payment_stripe` | `PaymentStripe` | Stripe |
| `authorize_net` | `payment_authorize_net` | `PaymentAuthorizeNet` | Authorize Net |
| `ups` | `shipping_ups` | `ShippingUps` | UPS |
| `dhl_express` | `shipping_dhl_express` | `ShippingDhlExpress` | DHL Express |
| `my_gateway` | `payment_my_gateway` | `PaymentMyGateway` | My Gateway |

## Generated File Structure

### Payment Plugin

```
payment_stripe/
├── payment_stripe.xml              # Manifest with configuration fields
├── services/
│   └── provider.php                # Dependency injection setup
├── src/
│   └── Extension/
│       └── PaymentStripe.php      # Main plugin class
├── language/
│   └── en-GB/
│       ├── plg_j2commerce_payment_stripe.ini      # Frontend language
│       └── plg_j2commerce_payment_stripe.sys.ini  # Admin language
└── tmpl/
    ├── prepayment.php              # Payment button/form template
    ├── postpayment.php             # Success page template
    └── message.php                 # Error message template
```

### Shipping Plugin

```
shipping_ups/
├── shipping_ups.xml                # Manifest with configuration fields
├── services/
│   └── provider.php                # Dependency injection setup
├── src/
│   └── Extension/
│       └── ShippingUps.php         # Main plugin class
├── language/
│   └── en-GB/
│       ├── plg_j2commerce_shipping_ups.ini      # Frontend language
│       └── plg_j2commerce_shipping_ups.sys.ini  # Admin language
├── forms/
│   └── shippingmethod.xml          # Method configuration form (optional)
└── tmpl/
    └── method.php                  # Shipping method template
```

## Placeholder Tokens

Stub files use placeholder tokens that are replaced with actual values during generation.

### Core Tokens

| Token | Example | Description |
|-------|---------|-------------|
| `{{name}}` | `stripe` | Plugin element name (lowercase, underscores) |
| `{{Name}}` | `Stripe` | Class name (PascalCase) |
| `{{NAME}}` | `STRIPE` | Uppercase for language keys |
| `{{display_name}}` | `Stripe` | Human-readable display name |
| `{{type}}` | `payment` | Plugin type (payment or shipping) |
| `{{Type}}` | `Payment` | Plugin type (PascalCase) |
| `{{element}}` | `payment_stripe` | Full element name |
| `{{namespace}}` | `J2Commerce\Plugin\J2Commerce\PaymentStripe` | Full PHP namespace |
| `{{year}}` | `2024-2026` | Copyright year range |
| `{{year_full}}` | `2026` | Current year |
| `{{month}}` | `February` | Current month name |

## Conditional Blocks

Stub files support conditional blocks that include or exclude code sections based on prompt responses.

### Syntax

```
{{#if condition}}
    ... content included when condition is true ...
{{/if}}
```

### Available Conditions

| Condition | Plugin Type | Corresponds To |
|-----------|-------------|----------------|
| `sandbox` | Payment, Shipping | Sandbox mode support |
| `api_credentials` | Payment, Shipping | API credentials fields |
| `sandbox_credentials` | Payment | Sandbox credential fields |
| `webhook` | Payment | Webhook support |
| `surcharge` | Payment, Shipping | Surcharge support |
| `geozone` | Payment, Shipping | Geozone restriction |
| `minmax_subtotal` | Payment | Min/max subtotal limits |
| `shipping_tax` | Shipping | Shipping tax (tax profile field) |
| `custom_rate_table` | Shipping | Custom rate table |
| `debug` | Payment, Shipping | Debug logging |

### Example: Conditional Fields in Manifest

```xml
{{#if sandbox}}
<field
    name="sandbox"
    type="radio"
    layout="joomla.form.field.radio.switcher"
    default="0"
    label="PLG_J2COMMERCE_PAYMENT_{{NAME}}_USE_SANDBOX"
>
    <option value="0">JNO</option>
    <option value="1">JYES</option>
</field>
{{/if}}
```

When `sandbox` is enabled, the sandbox toggle field is included in the generated manifest. When disabled, the entire block is removed.

### Example: Conditional Code in Plugin Class

```php
{{#if surcharge}}
    public function onCalculateFees(Event $event): void
    {
        // Surcharge calculation logic included
        $surchargePercent = (float) $this->params->get('surcharge_percent', 0);
        $surchargeFixed = (float) $this->params->get('surcharge_fixed', 0);
        // ...
    }
{{/if}}
```

## After Generation

### Install the Plugin

If you did not use `--install`, install the generated plugin manually:

**Method 1: Discover Install**

1. Copy the plugin directory to `plugins/j2commerce/`
2. Go to **System** -> **Install** -> **Discover**
3. Click **Discover**
4. Select the new plugin
5. Click **Install**

**Method 2: Use --install Flag**

```bash
# Generate and install in one step
php cli/joomla.php j2commerce:create:plugin payment stripe --install
```

### Configure the Plugin

1. Go to **System** -> **Plugins**
2. Search for the plugin by name (e.g., "Stripe" or "UPS")
3. Enable the plugin
4. Configure the settings:
   - Display name and image
   - API credentials (live and sandbox)
   - Payment/shipping status
   - Surcharge settings
   - Geozone restrictions

### Implement Gateway Logic

The generated plugin is a skeleton. You must implement:

#### Payment Plugins

| Method | Purpose |
|--------|---------|
| `_prePayment()` | Build and render the payment form, redirect to gateway |
| `_postPayment()` | Handle payment response, verify signature, update order status |
| `onProcessWebhook()` | Handle webhook notifications (if webhook support enabled) |

#### Shipping Plugins

| Method | Purpose |
|--------|---------|
| `onGetShippingRates()` | Calculate shipping rates from carrier API |
| `onGetShippingOptions()` | Check availability and restrictions |

### Example: Implementing `_prePayment()`

```php
// File: plugins/j2commerce/payment_stripe/src/Extension/PaymentStripe.php

public function _prePayment(array $data): string
{
    $vars = new \stdClass();
    $vars->order_id = $data['order_id'];
    $vars->orderpayment_amount = $data['orderpayment_amount'];

    // Get credentials based on sandbox mode
    $sandbox = (bool) $this->params->get('sandbox', 0);
    $vars->api_key = $sandbox
        ? $this->params->get('sandbox_api_key', '')
        : $this->params->get('api_key', '');

    // Build redirect URL or payment form
    $vars->action_url = 'https://api.stripe.com/v1/checkout/sessions';

    // TODO: Add your gateway-specific logic here
    // - Create payment session
    // - Generate signature
    // - Set callback URLs

    return $this->_getLayout('prepayment', $vars);
}
```

### Example: Implementing `_postPayment()`

```php
public function _postPayment(object $data): string
{
    $app = Factory::getApplication();
    $paction = $app->input->getString('paction');

    switch ($paction) {
        case 'display':
            // Payment successful - update order status
            $this->updateOrderStatus($data->order_id, 'Confirmed');
            return $this->_getLayout('postpayment', $vars);

        case 'cancel':
            // User cancelled - restore cart
            return $this->_getLayout('message', ['message' => 'Payment cancelled']);

        default:
            // Error handling
            $this->log('Payment error: ' . print_r($data, true), Log::ERROR);
            return $this->_getLayout('message', ['message' => 'Payment failed']);
    }
}
```

## Stub Customization

### Stub File Locations

Stub files are located in:

```
administrator/components/com_j2commerce/stubs/
├── payment/
│   ├── manifest.xml.stub          # Plugin manifest template
│   ├── provider.php.stub          # Service provider template
│   ├── Extension.php.stub         # Main plugin class template
│   ├── language.ini.stub          # Frontend language template
│   ├── language.sys.ini.stub      # Admin language template
│   └── tmpl/
│       ├── prepayment.php.stub    # Pre-payment template
│       ├── postpayment.php.stub   # Post-payment template
│       └── message.php.stub       # Error message template
└── shipping/
    ├── manifest.xml.stub
    ├── provider.php.stub
    ├── Extension.php.stub
    ├── language.ini.stub
    ├── language.sys.ini.stub
    ├── forms/
    │   └── shippingmethod.xml.stub # Method configuration form
    └── tmpl/
        └── method.php.stub         # Shipping method template
```

### Creating Custom Stubs

1. Copy an existing stub file from `stubs/payment/` or `stubs/shipping/`
2. Modify the template using placeholder tokens and conditional blocks
3. Save with the `.stub` extension in the appropriate directory

**Example: Adding a New Conditional Field**

In `stubs/payment/manifest.xml.stub`:

```xml
{{#if custom_field}}
<field
    name="custom_option"
    type="text"
    label="PLG_J2COMMERCE_PAYMENT_{{NAME}}_CUSTOM_OPTION"
    description="PLG_J2COMMERCE_PAYMENT_{{NAME}}_CUSTOM_OPTION_DESC"
/>
{{/if}}
```

### Adding New Options

To add a new interactive option:

1. **Add the prompt** in `CreatePluginCommand.php`:

```php
// File: administrator/components/com_j2commerce/src/CliCommands/CreatePluginCommand.php

private function collectOptions(SymfonyStyle $io, string $type, string $name): array
{
    // ... existing options ...

    if ($type === 'payment') {
        $options['custom_field'] = $io->confirm('Include custom field?', false);
    }

    return $options;
}
```

2. **Add the default** in `getDefaultOptions()`:

```php
private function getDefaultOptions(string $type): array
{
    if ($type === 'payment') {
        return [
            // ... existing defaults ...
            'custom_field' => false,
        ];
    }
    // ...
}
```

3. **Use in stubs** with `{{#if custom_field}}...{{/if}}`

## Troubleshooting

### Command Not Found

**Error:**
```
There are no commands defined in the "j2commerce" namespace.
```

**Cause:** The console plugin is not enabled.

**Solution:**

1. Go to **System** -> **Plugins**
2. Search for "J2Commerce Console"
3. Set **Status** to **Enabled**

Alternatively via CLI:

```bash
# Check if plugin exists
php cli/joomla.php extension:list --type=plugin | grep j2commerce

# Enable via database (if needed)
mysql -u user -p joomla_db -e "UPDATE #__extensions SET enabled=1 WHERE element='j2commerce' AND folder='console'"
```

### Permission Denied

**Error:**
```
file_put_contents(...): Failed to open stream: Permission denied
```

**Cause:** The output directory is not writable by the web server user.

**Solution:**

```bash
# Check current permissions
ls -la plugins/j2commerce/

# Fix permissions (adjust user/group for your system)
chmod -R 775 plugins/j2commerce/
chown -R www-data:www-data plugins/j2commerce/
```

Or use a different output path:

```bash
php cli/joomla.php j2commerce:create:plugin payment stripe --path=/tmp/plugins
```

### Stub File Not Found

**Error:**
```
Stub file not found: /administrator/components/com_j2commerce/stubs/payment/manifest.xml.stub
```

**Cause:** Stub files are missing from the J2Commerce installation.

**Solution:**

1. Reinstall J2Commerce component
2. Verify the stubs directory exists:

```bash
ls -la administrator/components/com_j2commerce/stubs/
```

### Plugin Does Not Appear After Install

**Cause:** Plugin manifest has incorrect values or database record missing.

**Solution:**

1. Verify the generated `manifest.xml` has correct values:
   - `group="j2commerce"` attribute
   - Correct namespace
   - Valid plugin element name

2. Run Discover in Extension Manager:
   - Go to **System** -> **Install** -> **Discover**
   - Click **Discover**
   - Install the plugin

3. Check the database directly:

```sql
SELECT extension_id, name, element, folder, enabled
FROM #__extensions
WHERE type='plugin' AND folder='j2commerce';
```

### Files Already Exist

**Error:**
```
File already exists: plugins/j2commerce/payment_stripe/payment_stripe.xml
(use --force to overwrite)
```

**Solution:**

Use `--force` to overwrite:

```bash
php cli/joomla.php j2commerce:create:plugin payment stripe --force
```

Or generate to a different path:

```bash
php cli/joomla.php j2commerce:create:plugin payment stripe --path=./output
```

## Best Practices

1. **Use interactive mode** for first-time plugin creation to understand all options
2. **Use non-interactive mode** for automation scripts and CI/CD pipelines
3. **Always implement webhook signature verification** for production payment plugins
4. **Enable debug logging during development** for troubleshooting API issues
5. **Test with sandbox credentials** before using live credentials
6. **Copy stubs locally** before modifying to preserve originals

## Related Topics

- [Payment Plugin Development](../extensions/plugins/payment-plugins.md)
- [Shipping Plugin Development](../extensions/plugins/shipping-plugins.md)
- [Plugin Events Reference](../api-reference/events.md)
- [J2Commerce Architecture](../core-concepts/architecture.md)