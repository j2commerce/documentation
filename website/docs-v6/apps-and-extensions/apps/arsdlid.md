---
title: "Akeeba Release System Download ID"
sidebar_label: "ARS Download ID"
sidebar_position: 57
description: "Automatically generate and display Akeeba Release System (ARS) download/licence IDs for customers when they place an order in J2Commerce."
---

# Akeeba Release System Download ID

The **ARS Download ID** app connects J2Commerce with [Akeeba Release System (com_ars)](https://www.akeeba.com/products/akeeba-release-system.html) — the standard Joomla extension update server used by Akeeba, many commercial extension developers, and anyone distributing software through a self-hosted release channel.

When a customer completes an order, the plugin automatically creates a unique **Download/Licence ID** for them in ARS. That ID is the same key ARS uses to authenticate update downloads, so your customers can paste it straight into their Joomla extension settings and start receiving updates without any manual intervention on your part.

The app also gives you two storefront-facing features:

- A **"Licence ID" tab** on each customer's My Profile page, with a one-click copy button.
- Per-product **language translation badges** — flag-style pills near the product description showing which languages the extension has been translated into.

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

## Requirements

| Requirement | Version |
|-------------|---------|
| J2Commerce | 6.0 or higher |
| Joomla | 5 or 6 |
| PHP | 8.2 or higher |
| Akeeba Release System (`com_ars`) | Must be installed **and enabled** before installing this plugin |

:::warning ARS must be installed first

The plugin installer checks for `com_ars` during the preflight step and will not proceed if it is missing. Install and enable Akeeba Release System before you attempt to install this plugin.

:::

## Installation

This plugin is a separate add-on and is not included with J2Commerce 6.

1. Purchase and download the `plg_j2commerce_app_arsdlid.zip` package from the [J2Commerce website](https://www.j2commerce.com).
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the ZIP file and click **Upload & Install**.

The plugin installs automatically and is ready to enable.

## Enable the App

Once installed, enable the plugin from the J2Commerce Apps screen.

**Option A:** Click the **J2Commerce** icon in the top-right corner of the administrator -> **Apps**.

**Option B:** Go to **Components** -> **J2Commerce** -> **Apps**.

<!-- SCREENSHOT: J2Commerce Apps list showing the ARS Download ID app with the toggle in the disabled state -->

Find **Akeeba Release System Download ID** in the list and click the toggle to enable it. The toggle turns green when the app is active.

## Plugin Parameters

The plugin has a single global parameter. Access it by clicking the plugin name on the Apps screen.

| Setting | Description | Default |
|---------|-------------|---------|
| **Debug Mode** | Writes detailed log entries to `administrator/logs/app_arsdlid.php`. Useful when diagnosing problems — disable in production. | No |

## Per-Product Setup

Each product can be linked to a specific ARS package and can advertise the translation languages it ships with. These settings appear under the **Apps** tab on the product edit screen.

1. Go to **J2Commerce** -> **Catalogue** -> **Products**.
2. Open the product you want to configure.
3. Click the **Apps** tab.
4. Expand the **Akeeba Release System** section.

<!-- SCREENSHOT: Product edit screen showing the Apps tab with the Akeeba Release System fieldset expanded, displaying the ARS Package ID and Language Translations fields -->

| Field | Description |
|-------|-------------|
| **ARS Package ID** | The numeric ID of the ARS package (release category) that this product unlocks. Leave blank if the product does not correspond to a specific ARS package. See [Finding the ARS Package ID](#finding-the-ars-package-id) below. |
| **Language Translations** | Select the languages this extension has been translated into. The selected languages appear as a badge list near the product description on the storefront, so shoppers can see translation support before they buy. |

5. Click **Save** or **Save & Close**.

The supported translation locales are:

| Locale code | Language |
|-------------|----------|
| en-GB | English |
| de-DE | German |
| es-ES | Spanish |
| pt-PT | Portuguese |
| it-IT | Italian |
| nl-NL | Dutch |
| fr-FR | French |
| ru-RU | Russian |
| el-GR | Greek |
| ar-AA | Arabic |
| ja-JP | Japanese |
| pl-PL | Polish |
| sv-SE | Swedish |

## What Customers See

### The Licence ID Tab on My Profile

Customers who are logged in see a **Licence ID** tab on their **My Profile** page. The tab shows their ARS Download/Licence ID in a read-only text field alongside a **Copy** button.

<!-- SCREENSHOT: My Profile page showing the Licence ID tab with the download ID in a read-only input and the Copy button to the right -->

Clicking **Copy** uses the browser's Clipboard API to copy the ID. A brief confirmation appears once the copy succeeds.

The customer can then paste the ID into the update settings of any ARS-powered Joomla extension they have purchased. There is nothing else they need to do.

The tab is only visible to logged-in users. Guests do not see it.

### Language Translation Badges on Product Pages

If you have selected one or more languages on a product's **Apps** tab, a small section appears above the product description on the storefront showing the translation languages available.

<!-- SCREENSHOT: Product detail page showing the "Translated In The Following Languages" section above the description, with language entries listed with a checkmark icon -->

Each entry shows the full language name and locale code (for example, "French (fr-FR)") with a checkmark icon. If no languages are selected for a product, this section is not displayed.

## How Download IDs Are Generated

Every time an order is saved, the plugin:

1. Checks whether the purchasing customer already has a primary Download ID in ARS.
2. If they do not have one, generates a new unique, collision-free ID (an MD5 hash of 64 random bytes).
3. Saves the ID to ARS using ARS's own MVC factory — the plugin does not write directly to the ARS database table.
4. Sets the ID as the customer's **primary** Download ID in ARS.

If the customer already has a primary Download ID, the plugin skips generation. Customers who place multiple orders keep the same ID.

## Finding the ARS Package ID

The **ARS Package ID** corresponds to the **Category ID** in the Akeeba Release System backend.

1. Log into the Joomla administrator.
2. Go to **Components** -> **Akeeba Release System** -> **Categories**.
3. Note the value in the **ID** column for the category that matches your product.
4. Enter that number in the **ARS Package ID** field on the product's **Apps** tab.

<!-- SCREENSHOT: Akeeba Release System Categories list in the backend, highlighting the ID column -->

## Troubleshooting

### The plugin fails to install

**Cause:** Akeeba Release System (`com_ars`) is not installed or not enabled.

**Solution:** Install and enable `com_ars` first, then retry the plugin installation. The installer performs a preflight check and will not proceed without a working ARS installation.

### A customer placed an order but their Licence ID has not appeared

**Cause:** The most common causes are that `com_ars` was disabled at the time the order was placed, or an error occurred when the plugin tried to write to ARS.

**Solution:**

1. Confirm that `com_ars` is installed and enabled under **System** -> **Manage** -> **Extensions**.
2. Enable **Debug Mode** in the plugin configuration.
3. Place a test order and then open the log file at `administrator/logs/app_arsdlid.php` to see what happened.
4. For existing customers who ordered before the plugin was installed, you can manually create a Download ID in the ARS backend under **Components** -> **Akeeba Release System** -> **Download IDs**.

### The Licence ID tab is not visible on My Profile

**Cause:** Either the plugin is disabled, the customer is not logged in, or `com_ars` has been uninstalled or disabled since the plugin was installed.

**Solution:**

1. Confirm the customer is logged in — the tab is only shown to authenticated users.
2. Go to **J2Commerce** -> **Apps** and confirm the ARS Download ID toggle is green.
3. Go to **System** -> **Manage** -> **Extensions** and confirm `com_ars` is installed and enabled.

### Debug logging

Enable **Debug Mode** in the plugin configuration and reproduce the problem. The plugin writes entries to:

```
administrator/logs/app_arsdlid.php
```

Events logged include: each event handler entry and exit, whether a Download ID already existed for the customer, successful ID creation, and any errors returned by the ARS MVC factory.

Disable Debug Mode again once you have finished investigating.

## What's New Compared to the J2Store Version

This plugin is the J2Commerce-native rewrite of the original `plg_j2store_app_arsdlid`. The J2Commerce version includes the following improvements.

| Area | J2Store version | J2Commerce version |
|------|-----------------|-------------------|
| Framework | Built on FOF 2 (non-namespaced, deprecated) | Native Joomla MVC with full PSR-4 namespacing |
| JavaScript | jQuery + deprecated `document.execCommand('copy')` | Vanilla JavaScript using the browser Clipboard API |
| Collision detection | Silent bug — checked an undefined variable, so the uniqueness check never ran correctly | Fixed: the new ID is checked against the ARS table using a parameterised query before being saved |
| Language list | Duplicated in two separate hardcoded arrays (prone to drift) | Single private constant — both the form options and the storefront badges read from the same source |
| Admin form fields | Hand-rolled HTML rendered inline | Joomla XML form pattern (`forms/product_form.xml`) — compatible with all admin templates |
| Event names | `onJ2StoreAfterSaveOrder`, `onJ2StoreAddMyProfileTab`, etc. | `onJ2CommerceAfterSaveOrder`, `onJ2CommerceMyProfileTab`, etc. |

Existing customers retain their Download IDs after migration — the IDs are stored in ARS's own `#__ars_dlidlabels` table, which is untouched by the migration.

## Related Topics

- [Akeeba Release System](https://www.akeeba.com/products/akeeba-release-system.html) — official ARS documentation
- [Apps Overview](./index.md)
