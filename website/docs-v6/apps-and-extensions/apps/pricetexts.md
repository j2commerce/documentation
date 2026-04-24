---
title: "Price Texts"
sidebar_label: "Price Texts"
sidebar_position: 50
description: "Add custom prefix or suffix text around product prices — storewide, per category, or per product — using the Price Texts app for J2Commerce."
---

# Price Texts

Price Texts lets you display a short line of text directly before or after any product price. You configure it once at the category level, or override it on individual products. The text appears everywhere J2Commerce renders a price: product detail pages, category lists, tag pages, related product modules, the cart, and the order confirmation screen.

Common examples include "From $29.99", "$99 / month", "$50 inc. VAT", and "$25 per kg". No code changes or template editing are required.

## Requirements

- Joomla 6.0.0 or later
- J2Commerce 6.0.0 or later
- PHP 8.3 or later
- At least one product set up in J2Commerce

## Installation

Price Texts is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_pricetexts.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_pricetexts.zip` package file.
4. The plugin installs and enables itself automatically — no extra steps are needed.

<!-- SCREENSHOT: Joomla Extensions Install screen with app_pricetexts.zip uploaded and a success message -->

## Plugin Settings

After installation, you can adjust two global settings.

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Price Texts for J2Commerce**.
3. Click the plugin name to open it.

<!-- SCREENSHOT: Plugins list filtered to "Price Texts for J2Commerce" showing the plugin row -->

| Setting | Description | Default |
|---------|-------------|---------|
| **Show text on option prices** | When set to **Show**, the prefix and suffix also appear next to option prices, variant prices, and cart line items. Set to **Hide** to restrict the text to the main product price only. | Hide |
| **Debug Mode** | When set to **Yes**, the plugin writes diagnostic messages to `administrator/logs/app_pricetexts.php`. Turn this off in production. | No |

4. Click **Save** after making any changes.

<!-- SCREENSHOT: Price Texts plugin editor showing the two settings fields -->

## How the Three Levels Work

Price Texts uses a simple priority chain. The more specific setting wins:

1. **Per-product** — set directly on the product. This always takes priority.
2. **Per-category** — set on the Joomla content category that contains the product. Used when no per-product value is set.
3. **No global default** — if neither the product nor its category has a value set, no text is shown.

Think of it like this: if you sell a range of SaaS plans and want most of them to show "/ month", set that suffix on their category. Then, for a single product that bills annually, override the suffix on that product alone.

## Setting Prefix and Suffix Per Product

These steps set the price text on one individual product. Per-product values override the category setting.

1. Go to **Content** -> **Articles** and open the article that is linked to your product.
2. Click the **J2Commerce Cart** tab (or **J2Store Cart** depending on your template label).
3. Click the **Apps** sub-tab.
4. Locate the **Price Text** section.

<!-- SCREENSHOT: Article editor showing the J2Commerce Cart tab > Apps sub-tab > Price Text section with Prefix and Suffix fields -->

5. Fill in one or both fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Price Prefix** | Text shown immediately before the price, followed by a space. | `From` |
| **Price Suffix** | Text shown immediately after the price, preceded by a space. | `/ month` |

6. Click **Save** or **Save & Close**.

The product detail page will now show the text next to the price. If you clear both fields, the plugin falls back to the category setting.

## Setting Prefix and Suffix Per Category

Category-level settings apply to all products in that category that do not have their own per-product value.

1. Go to **Content** -> **Categories** and open the category that contains your products.
2. Click the **Price Text** tab.

<!-- SCREENSHOT: Category editor showing the Price Text tab with Prefix and Suffix fields -->

:::note
If you are creating a brand-new category, save it first. The **Price Text** tab shows a notice asking you to save before the fields become available. This is normal — open the category again after saving.
:::

3. Fill in the **Price Prefix** and/or **Price Suffix** fields using the same descriptions above.
4. Click **Save**.

Every product in this category will now display the text unless it has its own per-product values.

## Where the Text Appears

Once configured, the text renders automatically in every place J2Commerce displays a price:

| Location | Prefix appears | Suffix appears |
|----------|---------------|----------------|
| Product detail page — main price | Yes | Yes |
| Category list — product price | Yes | Yes |
| Tag list — product price | Yes | Yes |
| Featured / related product modules | Yes | Yes |
| Cart line item price | Depends on **Show text on option prices** setting | Depends on **Show text on option prices** setting |
| Order confirmation | Depends on **Show text on option prices** setting | Depends on **Show text on option prices** setting |
| Option and variant prices | Depends on **Show text on option prices** setting | Depends on **Show text on option prices** setting |

When **Show text on option prices** is set to **Hide**, the text only wraps the main product price. When set to **Show**, it also wraps option, variant, and cart prices.

## Common Use Cases

Here are some patterns you can set up today:

| Goal | Prefix | Suffix |
|------|--------|--------|
| "From $29.99" pricing | `From` | _(empty)_ |
| "$99 / month" subscription | _(empty)_ | `/ month` |
| "$50 inc. VAT" tax-inclusive display | _(empty)_ | `inc. VAT` |
| "$25 per kg" unit pricing | _(empty)_ | `per kg` |
| "Starting at $100" range | `Starting at` | _(empty)_ |

## What Changed from J2Store

If you are migrating from J2Store, here is what is different in the J2Commerce version of this plugin:

- **XSS-safe output.** The J2Store version echoed prefix/suffix text without escaping. J2Commerce escapes all output with `htmlspecialchars()`, so any `<script>` or HTML tags in the text fields are displayed as plain text instead of being executed.
- **Broader coverage.** The plugin hooks into J2Commerce's unified `onJ2CommerceBeforeRenderingProductPrice` and `onJ2CommerceAfterRenderingProductPrice` events. These fire in all Bootstrap 5, UIkit, and Builder block templates automatically — including layouts that did not exist in J2Store.
- **Auto-enable on install.** The J2Store version required manual enabling after installation. Price Texts for J2Commerce enables itself during the install step.
- **Debug logging.** A new **Debug Mode** setting writes diagnostic output to `administrator/logs/app_pricetexts.php` to help troubleshoot rendering issues without needing Joomla's system debug mode.
- **Cleaner category form.** The per-category settings now appear as a native **Price Text** tab in the standard Joomla category editor, rather than in a separate J2Store admin screen.

## Troubleshooting

### Text does not appear on the category list

**Cause:** The category list shows prices from J2Commerce product data. If neither the product nor its category has a value set, no text is shown — this is expected.

**Solution:**

1. Check that the category has a **Price Text** tab. This tab only appears on content categories that J2Commerce uses (`com_content` categories).
2. Open the category and confirm the **Price Prefix** or **Price Suffix** field is not empty.
3. If you set the value on the product directly, confirm it is saved in the article's **J2Commerce Cart** -> **Apps** -> **Price Text** section.
4. If the category was newly created, save it first, then reopen it to set the price text fields.

### Text appears next to option prices and I do not want that

**Cause:** The **Show text on option prices** setting in the plugin is set to **Show**.

**Solution:**

1. Go to **System** -> **Manage** -> **Plugins** and open **Price Texts for J2Commerce**.
2. Set **Show text on option prices** to **Hide**.
3. Click **Save**.

The text will now only appear next to the main product price.

### HTML tags in my prefix or suffix are showing as plain text

**Cause:** This is by design. The plugin escapes all prefix and suffix content before rendering it, which means angle brackets and other HTML characters are displayed as visible text rather than interpreted as markup. This prevents cross-site scripting attacks.

**Solution:** Use plain text only. For example, write `inc. VAT` instead of `<em>inc. VAT</em>`. If you need styled text around prices, consider a template override instead.

### Price text shows on the detail page but not in the cart

**Cause:** The cart and checkout use a separate rendering context. Text only appears there when **Show text on option prices** is enabled.

**Solution:** Set **Show text on option prices** to **Show** in the plugin settings if you want the text to appear in the cart and on confirmation pages.
