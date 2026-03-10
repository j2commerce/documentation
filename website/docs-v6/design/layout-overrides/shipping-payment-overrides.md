---
title: "Layout Overrides for Payment and Shipping Plugins"
sidebar_label: "Shipping & Payment Overrides"
sidebar_position: 10
description: "How to create custom template overrides for J2Commerce payment and shipping plugin layouts without touching plugin files."
---

# Layout Overrides for Payment and Shipping Plugins

J2Commerce payment and shipping plugins support a **Template Style** dropdown in their configuration. This lets you switch between built-in layout variants or point a plugin at your own custom override — all without editing plugin files.

## Which Plugins Support This

The following plugins include the **Template Style** setting:

**Payment plugins:** Authorize.Net, PayPal, Cash on Delivery, Money Order, Bank Transfer

**Shipping plugins:** Standard Shipping, Free Shipping, AtoShip

---

## How It Works

Each plugin has a `tmpl/` directory that holds its customer-facing layout files (the payment form, confirmation screen, etc.). When a subfolder exists inside `tmpl/`, it becomes a named style variant.

The **Template Style** dropdown in the plugin config is populated automatically from two locations:

1. **Plugin's own `tmpl/` subfolders** — e.g., `plugins/j2commerce/payment_authorizenet/tmpl/bootstrap5/`
2. **Your active Joomla template's override directory** — e.g., `templates/cassiopeia/html/plg_j2commerce_payment_authorizenet/bootstrap5/`

Any subfolder found in either location appears as an option in the dropdown. No registration is needed — create the folder and it shows up.

### File Resolution Priority

When a Template Style is selected, J2Commerce looks for each layout file in this order:

1. Template override — named subfolder (e.g., `templates/{tpl}/html/plg_j2commerce_payment_authorizenet/bootstrap5/`)
2. Plugin `tmpl/` — named subfolder (e.g., `plugins/j2commerce/payment_authorizenet/tmpl/bootstrap5/`)
3. Template override — root (e.g., `templates/{tpl}/html/plg_j2commerce_payment_authorizenet/`)
4. Plugin `tmpl/` — root (the plugin's default files)

When **Default** is selected (blank value), only options 3 and 4 apply.

> **Admin templates are not affected.** Files like `admin_charge_card.php` are admin-only and always load from the plugin's `tmpl/` root regardless of the Template Style setting.

---

## Creating a Custom Override

There are two approaches. **Option A is strongly recommended** because your files survive plugin updates.

### Option A: Template Override Subfolder (Recommended)

This method stores your customizations inside your Joomla template, so plugin updates never overwrite them.

**Example: custom credit card form layout for Authorize.Net**

#### Step 1: Create the override directory

Inside your active Joomla template, create a subfolder for the plugin using this naming pattern:

```
templates/{your-template}/html/plg_{group}_{element}/{style-name}/
```

For Authorize.Net with a style called `mytheme`:

```
templates/cassiopeia/html/plg_j2commerce_payment_authorizenet/mytheme/
```

<!-- SCREENSHOT: File manager or FTP client showing the new directory path inside templates/cassiopeia/html/ -->

#### Step 2: Copy the files you want to customize

Copy only the files you need to change from the plugin's `tmpl/` root into your new folder. For Authorize.Net, the customer-facing files are:

| File | What it renders |
|------|----------------|
| `prepayment.php` | The payment form at checkout |
| `postpayment.php` | The confirmation screen after payment |
| `profile_cards.php` | The saved cards selector for returning customers |

You do not need to copy all files — only the ones you are modifying. J2Commerce falls back to the plugin's own files for anything not found in your override.

#### Step 3: Edit your override files

Open the copied file(s) in your editor and make your changes. The file receives the same variables as the original, so you can freely adjust the HTML and styling.

#### Step 4: Activate your style in the plugin config

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods**.
2. Click **Authorize.Net** to open its configuration.
3. Find the **Template Style** field and select `Mytheme` from the dropdown.

<!-- SCREENSHOT: Authorize.Net plugin configuration panel with the Template Style dropdown open, showing "Mytheme" as an option -->

4. Click **Save**.

Your custom layout is now active for all customers.

---

### Option B: Standard Joomla Template Override (Flat)

This is the standard Joomla override approach — place files directly in the override root (no subfolder). These files apply whenever **Default** is selected in the plugin config.

```
templates/{your-template}/html/plg_j2commerce_payment_authorizenet/prepayment.php
```

This works, but has a limitation: all plugins sharing this template use the same override root, and there is no way to maintain multiple named variants. Use Option A if you need more than one style or want to keep the default intact.

---

## Naming Reference

Use this table to find the correct override directory for each plugin:

| Plugin | Override Directory |
|--------|--------------------|
| Authorize.Net | `templates/{tpl}/html/plg_j2commerce_payment_authorizenet/` |
| PayPal | `templates/{tpl}/html/plg_j2commerce_payment_paypal/` |
| Cash on Delivery | `templates/{tpl}/html/plg_j2commerce_payment_cash/` |
| Money Order | `templates/{tpl}/html/plg_j2commerce_payment_moneyorder/` |
| Bank Transfer | `templates/{tpl}/html/plg_j2commerce_payment_banktransfer/` |
| Standard Shipping | `templates/{tpl}/html/plg_j2commerce_shipping_standard/` |
| Free Shipping | `templates/{tpl}/html/plg_j2commerce_shipping_free/` |
| AtoShip | `templates/{tpl}/html/plg_j2commerce_shipping_atoship/` |

Replace `{tpl}` with your active template name (e.g., `cassiopeia`).

---

## Tips

- **One subfolder = one style.** You can create multiple subfolders (e.g., `mytheme`, `compact`, `dark`) and switch between them any time from the plugin config.
- **Partial overrides work.** You only need to copy the files you are changing. Missing files fall back to the plugin's own copies.
- **Changes are immediate.** No cache clearing is needed after editing override files — the next page load picks them up.
- **Admin files are always safe.** Files prefixed with `admin_` (such as `admin_charge_card.php`) are never affected by the Template Style selection.

---

## Troubleshooting

### My new subfolder does not appear in the Template Style dropdown

**Cause:** The plugin configuration screen was already open when you created the folder.

**Solution:** Close and reopen the plugin configuration. The dropdown is generated fresh each time the config form loads — it does not cache the directory list.

### My override file is not being used even though the style is selected

**Cause:** The filename in your override directory does not exactly match the plugin's original filename.

**Solution:** Double-check the filename and extension. Override lookup is case-sensitive on Linux servers. Compare against the files in `plugins/j2commerce/{plugin}/tmpl/`.

### Switching back to Default shows a broken layout

**Cause:** A flat override file exists in the template override root (Option B) that is outdated compared to the plugin's current default.

**Solution:** Update or remove the flat override files in `templates/{tpl}/html/plg_j2commerce_{plugin}/`.

---

## Related Topics

- [Payment Methods](../../payments/index.md)
- [Shipping Methods](../../shipping/index.md)
