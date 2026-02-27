---
title: "Apps and Extensions"
sidebar_label: "Apps and Extensions"
sidebar_position: 1
description: "Extend J2Commerce functionality with app plugins and integrations for payments, shipping, automation, and more."
---

# Apps and Extensions

J2Commerce can be extended with app plugins that add new features and integrations to your store. Apps integrate directly into the checkout flow, admin dashboard, or storefront to provide additional functionality without modifying core code.

## What Are Apps?

Apps are Joomla plugins that hook into J2Commerce events and workflows. They can:

- Add new checkout steps (gift wrapping, terms acceptance, surveys)
- Integrate third-party services (address autocomplete, email marketing)
- Extend admin functionality (custom reports, bulk actions)
- Connect external APIs and webhooks

## Available Apps

### Address Autocomplete

The Address Autocomplete app adds Google Places-powered address suggestions to your checkout forms. As customers type their address, they see matching suggestions from Google's database. Selecting an address automatically fills in all fields.

[Learn more about Address Autocomplete](./app-addressautocomplete.md)


## Installing Apps

Apps are installed like any other Joomla plugin:

1. Go to **System** -> **Install** -> **Extensions**.
2. Upload the plugin ZIP file or use the Install from URL option.
3. After installation, go to **System** -> **Manage** -> **Plugins**.
4. Search for the app by name and enable it.
5. Configure the app in **J2Commerce** -> **Apps**.

## Configuring Apps

Most apps have their own configuration page accessible from the J2Commerce Apps dashboard:

1. Go to **J2Commerce** -> **Apps**.
2. Click on the app name to open its configuration.
3. Adjust settings as needed.
4. Click **Save** to apply changes.

## Developing Custom Apps

Developers can create custom app plugins by implementing J2Commerce event subscribers. See the [Developer Documentation](../../developer6/extensions/plugins/index.md) for details on creating custom plugins.

## Related Topics

- [Configuration](../configuration/index.md) - Core store settings
- [Checkout](../checkout/index.md) - Checkout flow configuration
- [Developer Documentation](../../developer6/index.md) - Build custom extensions
