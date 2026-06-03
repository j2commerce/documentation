---
title: "Akeeba Release System Download ID"
sidebar_label: "ARS Download ID"
sidebar_position: 57
description: "Automatically generate and display Akeeba Release System (ARS) download/license IDs for customers when they place an order in J2Commerce."
---

# Akeeba Release System Download ID

The **ARS Download ID** app integrates J2Commerce with [Akeeba Release System (com\_ars)](https://www.akeeba.com/products/akeeba-release-system.html) to automatically generate a unique download/license ID for each customer the moment they complete an order. The ID is stored in ARS and displayed on the customer's profile page so they can copy it into their J2Commerce account settings to activate software updates.

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

## Prerequisites

Before installing, ensure the following are in place:

- J2Commerce 6 is installed and enabled
- **Akeeba Release System** (`com_ars`) is installed and enabled on the same Joomla site
- PHP 8.2 or higher
- Joomla 5 or 6

:::warning ARS is required
This plugin will not install if `com_ars` is not already present on your site. The installer checks for ARS during the preflight step and aborts with an error message if it is missing.
:::

## Installation

1. Download the `plg_j2commerce_app_arsdlid.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the ZIP file and click **Upload & Install**.

The plugin installs and is immediately ready to enable.

## Enable the App

Once installed, enable the plugin from the J2Commerce Apps screen.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing the ARS Download ID app with the toggle in the disabled state -->

Find **Akeeba Release System Download ID** in the list, click the toggle to enable it (it turns green), and click **Save**.

## Configuration

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

The plugin has one global configuration option, accessible from the J2Commerce Apps screen by clicking **Akeeba Release System Download ID**.

| Setting        | Description                                                                                                                 | Default |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Debug Mode** | Writes detailed log entries to `administrator/logs/app_arsdlid.php`. Useful for diagnosing problems. Disable in production. | No      |

### Per-Product Settings

Each product can be linked to a specific ARS package and can advertise which translations it ships with. These settings appear on the **Apps** tab of the product edit screen.

<!-- SCREENSHOT: Product edit screen showing the Apps tab with the ARS Download ID accordion expanded -->

| Field                     | Description                                                                                                                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ARS Package ID**        | The numeric ID of the ARS package (release category) that this product grants access to. Find this ID in the Akeeba Release System backend. Leave blank if the product does not correspond to a specific ARS package. |
| **Language Translations** | Select which translations this product ships with. Selected languages appear as a pill list on the product detail page to inform shoppers before they buy.                                                            |

The supported translation locales are: English (en-GB), German (de-DE), Spanish (es-ES), Portuguese (pt-PT), Italian (it-IT), Dutch (nl-NL), French (fr-FR), Russian (ru-RU), Greek (el-GR), Arabic (ar-AA), Japanese (ja-JP), Polish (pl-PL), and Swedish (sv-SE).

## How It Works

### Automatic Download ID Generation

Every time an order is saved in J2Commerce, the plugin checks whether the purchasing customer already has a primary download ID in ARS. If they do not, the plugin:

1. Generates a new random, collision-free download ID (an MD5 hash of 64 random bytes).
2. Saves it to Akeeba Release System using ARS's own MVC factory — the plugin never writes directly to the `#__ars_dlidlabels` table.
3. Sets the ID as the customer's **primary** download ID in ARS.

If the customer already has a primary download ID, the plugin skips generation to avoid overwriting it.

### Translation Pill List on Product Pages

If a product has one or more language translations selected, a small list of translation badges appears above the product description on the storefront. Each badge shows the language name and locale code (for example, "German (de-DE)") with a checkmark icon.

<!-- SCREENSHOT: Product detail page showing the language translation pill list above the description -->

This display is driven by the **Language Translations** per-product setting. If no translations are selected for a product, nothing is shown.

### Customer Profile Tab

Customers who are logged in see a **License ID** tab on their **My Profile** page. The tab displays their ARS Download ID in a read-only input field with a **Copy** button.

<!-- SCREENSHOT: My Profile page showing the License ID tab with the download ID input and Copy button -->

Clicking **Copy** writes the download ID to the clipboard using the browser's Clipboard API. A confirmation message appears after a successful copy.

The customer can paste this ID into their J2Commerce account settings (or any Akeeba-powered extension settings) to activate software update notifications.

## Finding the ARS Package ID

The **ARS Package ID** for a product corresponds to the **Category ID** in the Akeeba Release System backend. To find it:

1. Log in to the Joomla backend.
2. Go to **Components** -> **Akeeba Release System** -> **Categories**.
3. Note the **ID** column value for the category that matches your product.
4. Enter that number in the **ARS Package ID** field on the product's **Apps** tab.

## Troubleshooting

### No Download ID Appears on the Customer Profile

**Cause:** The customer placed their order before the plugin was installed, or the ARS table does not contain an entry for them.

**Solution:** There is currently no bulk back-fill feature. New orders placed after the plugin is enabled will automatically generate IDs. For existing customers, you can manually create a Download ID in the ARS backend:

1. Go to **Components** -> **Akeeba Release System** -> **Download IDs**.
2. Click **New** and fill in the user's Joomla user ID along with a manually generated ID string.

### Plugin Fails to Install

**Cause:** Akeeba Release System (`com_ars`) is not installed or not enabled.

**Solution:** Install and enable `com_ars` first, then retry the plugin installation. The installer checks for ARS during its preflight step and will not proceed without it.

### "License ID" Tab Is Not Visible on My Profile

**Cause:** Either the plugin is disabled or `com_ars` has been uninstalled or disabled since the plugin was installed.

**Solution:**

1. Go to **J2Commerce -> Apps** and confirm the ARS Download ID app toggle is green (enabled).
2. Go to **System -> Manage -> Extensions** and confirm `com_ars` is installed and enabled.

### Debug Logging

Enable **Debug Mode** in the plugin's configuration. The plugin writes log entries to:

```
administrator/logs/app_arsdlid.php
```

Log entries are written at these points:

- When each event handler is entered
- When a download ID is found or generated for a user
- On any error from the ARS MVC factory

## Related Topics

- [ARS Download ID on the Akeeba website](https://www.akeeba.com/products/akeeba-release-system.html)
- [Apps Overview](./index.md)
