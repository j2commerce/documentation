---
title: "YOOtheme - J2Commerce"
sidebar_label: "YOOtheme"
sidebar_position: 97
description: "Expose J2Commerce product data (price, stock, images, add to cart) as Dynamic Content sources inside the YOOtheme Pro page builder."
---

# YOOtheme - J2Commerce

YOOtheme - J2Commerce connects your product catalog to the YOOtheme Pro page builder. It exposes product data — price, stock, images, SKU, an add-to-cart button, and more — as **Dynamic Content** sources inside the YOOtheme Pro customizer. This lets you build custom product pages, category layouts, and article-linked product highlights entirely with YOOtheme's visual builder, without writing any code.

## Requirements

- Joomla 6.x
- J2Commerce 6.x, enabled
- YOOtheme Pro, installed and set as the active template

:::info

The plugin checks for J2Commerce during installation. If com_j2commerce is not enabled, installation is blocked with an error message until you enable J2Commerce first.

:::

## Purchase and Download

The **YOOtheme - J2Commerce** plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to [www.j2commerce.com](https://www.j2commerce.com) **->** **Apps**.

**Step 2:** Locate **YOOtheme - J2Commerce** **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner. Search for **YOOtheme**, then click **Available Versions** **->** **View Files** **->** **Download Now**.

## Install the Plugin

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `plg_system_yootheme_j2commerce.zip` file or use the Install from URL option.

<!-- SCREENSHOT: Joomla Extensions Install screen with the YOOtheme - J2Commerce zip file selected for upload -->

## Enable the Plugin

Go to **System** **->** **Manage** **->** **Plugins**.

Search for **YOOtheme - J2Commerce**. Click the red X in the **Status** column to enable it — it turns into a green checkmark.

<!-- SCREENSHOT: Plugin Manager list filtered to "yootheme" showing the plugin toggled to enabled -->

This plugin has no configuration screen of its own — once it is enabled (and YOOtheme Pro is your active template), the new dynamic content sources are available immediately in the customizer.

## What This Plugin Adds

Because J2Commerce products are built on Joomla articles behind the scenes, the plugin can automatically find the product linked to any article and hand its data to YOOtheme Pro. This shows up in the customizer in three places:

### 1. A "Product" Object Type

A new **Product** object type becomes available as a Dynamic Content source anywhere YOOtheme Pro lets you pick a data source. It exposes these fields:

| Field | What it outputs |
|-------|-----------------|
| **ID** | The product's internal J2Commerce ID |
| **SKU** | The product's stock-keeping unit code |
| **UPC** | The product's UPC/barcode value |
| **Link** | The product's SEF (search-engine-friendly) storefront URL |
| **Price** | The product's price, formatted with your store's currency symbol |
| **Price (Raw)** | The unformatted numeric price value |
| **Stock Quantity** | Current, live inventory count from J2Commerce |
| **Thumbnail Image** | URL of the product's thumbnail image |
| **Thumbnail Image Alt** | Alt text for the thumbnail image |
| **Main Image** | URL of the product's main image |
| **Main Image Alt** | Alt text for the main image |
| **Add to Cart** | A fully working add-to-cart button, styled to match YOOtheme Pro's UIkit design |
| **Product Images** | The full list of additional product images (URL and alt text for each) |

### 2. A "Product" Field on the Article Object Type

When you pick the **Article** object type as a dynamic content source, you will see a new field grouped under **J2Commerce**:

- **Product** — resolves to the J2Commerce product linked to that article, so you can map any element (Headline, Image, Button, and so on) to that product's data.

Use this whenever you are inside a layout that already has an article in context — for example, a custom article layout, a related-articles block, or an article list card.

### 3. A "Product" Query Field on Page Views

When editing a **com_content article** page template directly, a **Product** field appears in the customizer under the **Page** group, labeled "The current J2Commerce Product." This resolves to the product tied to whichever article is currently being displayed — the field to use when you are building a single-product page template itself, rather than a card inside a list.

## How It Works

Every J2Commerce product is stored as a Joomla article under the hood. When you select the **Product** field on an Article, or the **Product** query field on a page, the plugin looks up the article's linked product automatically — there is nothing to configure or map manually.

## Step-by-Step: Adding Product Data to a YOOtheme Pro Layout

### Step 1: Open the Customizer

1. Go to **Templates** **->** **Templates**, then open your active **YOOtheme Pro** style.
2. Navigate to the page or layout you want to edit (for example, a Single Article layout used by your product template).

<!-- SCREENSHOT: YOOtheme Pro customizer open on a single article layout, showing the layout tree panel -->

### Step 2: Add an Element

1. Click **+ Add Element** and choose an element type — for example, **Headline**, **Image**, or **Button**.
2. With the element selected, open its settings panel.

<!-- SCREENSHOT: Element settings panel with the "+ Add Element" button highlighted -->

### Step 3: Switch the Field to Dynamic Content

1. Find the field you want to make dynamic (for example, the Headline's **Text** field).
2. Click the small database/lightning icon next to the field to open **Dynamic Content**.
3. Choose **Product** as the source.

<!-- SCREENSHOT: Dynamic Content dropdown open on a Headline element, with "Product" visible as a source option -->

### Step 4: Pick a Field

1. From the Product source, choose the specific field you want — for example, **Price**, **Main Image**, or **Add to Cart**.
2. Save your changes.

<!-- SCREENSHOT: Dynamic Content field picker showing the list of Product fields (ID, SKU, Price, Stock Quantity, etc.) -->

Repeat this for each element you want to bind to product data. A typical single-product layout might use **Main Image** for a large photo element, **Price** for a headline, and **Add to Cart** for a button element.

## What's New in J2Commerce

This plugin was migrated from the ZOOlanders `yootheme_j2commerce` 0.0.3 integration for J2Store. If you are moving an existing site to J2Commerce, note the following changes:

- **Native Joomla 6 architecture.** The plugin no longer depends on the FOF framework used by the original J2Store version.
- **Product IDs use `j2commerce_product_id`.** The underlying identifier changed along with the rest of the J2Commerce database schema.
- **Dynamic content source names changed.** The old `j2storeProduct` field and `J2StoreProduct` object type are now `j2commerceProduct` and `J2CommerceProduct`. **If you are migrating a site that used the old J2Store integration, you must re-select your dynamic content mappings** in YOOtheme Pro — the old mappings will not carry over automatically.
- **Live stock levels.** The Stock Quantity field now reads directly from current J2Commerce inventory instead of a cached value.
- **SEF product links.** The Link field returns a proper search-engine-friendly URL.
- **Accurate currency formatting.** The Price field is formatted using your store's configured currency settings.
- **Smarter Add to Cart button.** The button automatically loads the J2Commerce cart JavaScript it needs to function, including support for flexivariable (option-based) products.

## Tips

- Use the **Article** object type's **Product** field whenever you are inside a list or card layout that already has an article — it is the fastest way to pull in product data without extra configuration.
- Use the **Page**-group **Product** field only on single-article page templates, where you want the product for the page currently being viewed.
- The **Add to Cart** field renders a real, working form — test it on the frontend after publishing to confirm the button submits correctly.

## Troubleshooting

### No "Product" Source Visible in the Customizer

**Cause:** YOOtheme Pro is not the active template, or J2Commerce is not enabled.

**Solution:**

1. Go to **System** **->** **Site Templates** and confirm a YOOtheme Pro style is set as the default.
2. Go to **System** **->** **Manage** **->** **Extensions** and confirm **J2Commerce** is enabled.
3. Go to **System** **->** **Manage** **->** **Plugins** and confirm **YOOtheme - J2Commerce** is enabled.

### Product Fields Show Empty Values

**Cause:** The article you are viewing has no linked product, or the linked product is disabled.

**Solution:**

1. Confirm the article is actually a J2Commerce product (**J2Commerce** **->** **Catalog** **->** **Products**) and not a plain content article.
2. Check that the product is published/enabled in the product list.

### Add to Cart Button Displays Without Styling

**Cause:** A stale Joomla cache is serving outdated CSS or JavaScript.

**Solution:**

1. Go to **System** **->** **Maintenance** **->** **Clear Cache** and clear the site cache.
2. Reload the frontend page in a private/incognito browser window to rule out browser caching.

### Old J2Store Dynamic Content Mappings Show Nothing After Migrating

**Cause:** The old `j2storeProduct` / `J2StoreProduct` field and object names no longer exist under J2Commerce — they were renamed to `j2commerceProduct` and `J2CommerceProduct`.

**Solution:**

1. Open the affected layout in the YOOtheme Pro customizer.
2. Re-open the Dynamic Content picker on each element that previously used a J2Store product field.
3. Re-select the equivalent field from the new **Product** (J2Commerce) source.

## Related Topics

- [Managing Products](../../catalog/managing-products.md)
- [Apps and Extensions](../index.md)
