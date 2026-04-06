---
title: "Content Plugin — Article Shortcodes"
sidebar_label: "Article Shortcodes"
sidebar_position: 10
description: "Embed J2Commerce product elements — prices, images, add-to-cart buttons, and more — directly inside Joomla articles using simple shortcode tags."
---

# Article Shortcodes

The **Content - J2Commerce** plugin lets you embed live product information directly inside any Joomla article. By placing a short tag in your article text, you can display a product's price, image, add-to-cart button, stock status, or even a full product card — without leaving the article editor.

The plugin uses the same rendering pipeline as J2Commerce category pages and product modules, so your articles automatically match the look and feel of the rest of your store.

## Prerequisites

- J2Commerce 6 installed and enabled
- At least one product created in your store

## Installation

This plugin ships with J2Commerce 6 and is available immediately after installation. To enable it:

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Content - J2Commerce**.
3. Click the plugin name to open it, then set **Status** to **Enabled**.
4. Click **Save & Close**.

<!-- SCREENSHOT: Plugins list showing the Content - J2Commerce plugin with status toggle -->

## How Shortcodes Work

Place a shortcode tag anywhere in your article body. The plugin replaces the tag with rendered product HTML when the article is displayed on the frontend. Two syntax forms are supported.

### Paired Form (recommended)

```
{j2commerce}PRODUCT_ID|option1|option2{/j2commerce}
```

The first value is always the numeric product ID. Everything after the first pipe character is a list of display options. You can combine as many options as you need.

### Inline Form

```
{j2commerce PRODUCT_ID|option1|option2}
```

A convenience shorthand when you only need a single shortcode on a line. No closing tag is required.

### Finding Your Product ID

Go to **J2Commerce** -> **Catalog** -> **Products**. The product ID is shown in the **ID** column on the right side of the list.

<!-- SCREENSHOT: Products list with the ID column highlighted -->

---

## Shortcode Options Reference

### Full Product Card — `full` / `card`

Renders a complete product card identical to the one shown on a J2Commerce category page. Includes the image, title, price, and add-to-cart form.

```
{j2commerce}42|full{/j2commerce}
```

**Example:** Add a featured product card inside a blog post.

```
{j2commerce}42|card{/j2commerce}
```

`card` is an alias for `full` — both produce the same output.

---

### Price — `price`

Displays the product's current price. If the product has a sale price active, the sale price is shown.

```
{j2commerce}42|price{/j2commerce}
```

**Example:** Show a price inline inside a sentence — "Get it today for `{j2commerce}42|price{/j2commerce}`."

---

### Sale Price — `saleprice`

Displays only the sale/special price. If no sale is active, the output will be empty.

```
{j2commerce}42|saleprice{/j2commerce}
```

---

### Regular Price — `regularprice`

Displays only the regular (non-sale) price regardless of whether a sale is active.

```
{j2commerce}42|regularprice{/j2commerce}
```

---

### Title — `title`

Displays the product name as a linked heading.

```
{j2commerce}42|title{/j2commerce}
```

---

### SKU — `sku`

Displays the product's SKU (Stock Keeping Unit) identifier.

```
{j2commerce}42|sku{/j2commerce}
```

---

### Stock Status — `stock`

Displays the stock or availability indicator (for example, "In Stock" or "Out of Stock").

```
{j2commerce}42|stock{/j2commerce}
```

---

### Short Description — `description` / `desc`

Displays the product's short description. `desc` is an alias for `description`.

```
{j2commerce}42|description{/j2commerce}
```

---

### Short Description (Detail Style) — `sdesc`

Displays the short description using the detail-view layout style rather than the list-card style.

```
{j2commerce}42|sdesc{/j2commerce}
```

---

### Long Description — `ldesc`

Displays the product's full long description in the detail-view layout style.

```
{j2commerce}42|ldesc{/j2commerce}
```

---

### Specifications — `specs`

Displays the product specifications block.

```
{j2commerce}42|specs{/j2commerce}
```

---

### Images — `images` / `gallery`

Displays all product images as a gallery. `gallery` is an alias for `images`.

```
{j2commerce}42|images{/j2commerce}
```

---

### Main Image — `mainimage`

Displays only the main product image.

```
{j2commerce}42|mainimage{/j2commerce}
```

---

### Thumbnail Image — `thumbnail`

Displays the product thumbnail image.

```
{j2commerce}42|thumbnail{/j2commerce}
```

---

### Main and Additional Images — `mainadditional`

Displays the main image followed by any additional images.

```
{j2commerce}42|mainadditional{/j2commerce}
```

---

### Add to Cart — `cart`

Displays the add-to-cart form including product option selectors (colour, size, etc. if configured).

```
{j2commerce}42|cart{/j2commerce}
```

---

### Add to Cart (Button Only) — `cartonly`

Displays only the add-to-cart button without option selectors. Useful for simple products with no variants.

```
{j2commerce}42|cartonly{/j2commerce}
```

---

### Product Options — `options`

Displays the product option selectors (dropdowns, radio buttons, etc.) without the cart button.

```
{j2commerce}42|options{/j2commerce}
```

---

### Quick View Trigger — `quickview`

Displays a Quick View button that opens the product in a modal overlay.

```
{j2commerce}42|quickview{/j2commerce}
```

---

### Full Detail View — `detail`

Renders the complete product detail page layout inline inside the article.

```
{j2commerce}42|detail{/j2commerce}
```

---

### Brand / Manufacturer — `brand` / `manufacturer`

Displays the brand or manufacturer information block. `manufacturer` is an alias for `brand`.

```
{j2commerce}42|brand{/j2commerce}
```

---

### Upsells — `upsells`

Displays a row of upsell products configured for this product.

```
{j2commerce}42|upsells{/j2commerce}
```

---

### Cross-sells — `crosssells`

Displays a row of cross-sell products configured for this product.

```
{j2commerce}42|crosssells{/j2commerce}
```

---

## Combining Multiple Options

You can combine several options in a single shortcode. The plugin renders each option in the order listed, wrapping them all in one container.

```
{j2commerce}42|title|price|cart{/j2commerce}
```

This renders the product title, then the price, then the add-to-cart form — in that order.

**Another example** — show a thumbnail image with the price and a buy button:

```
{j2commerce}42|thumbnail|price|cart{/j2commerce}
```

---

## Plugin Settings

Open the plugin by going to **System** -> **Manage** -> **Plugins** and clicking **Content - J2Commerce**.

<!-- SCREENSHOT: Plugin settings page showing all four fieldsets -->

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Allow Frontend Product Edit** | Allow users to edit product data from the frontend article edit form. | No |
| **Check Article Publish Date** | Only display products for articles that are within their publish date range. | No |
| **Clear Content Cache** | Automatically clear content and J2Commerce caches when displaying products. | Yes |

### Shortcodes

| Setting | Description | Default |
|---------|-------------|---------|
| **Subtemplate Override** | Choose which J2Commerce subtemplate (Bootstrap 5 or UIkit 3) to use when rendering article shortcodes. Leave as **Use Global** to follow the site-wide default. | Use Global |
| **Default Image Width** | Maximum width in pixels for images rendered inside article shortcodes. | 300 |
| **Show Product Options in Cart Shortcode** | When enabled, the `cart` shortcode displays product option selectors alongside the add-to-cart button. | Yes |
| **Strip Shortcodes in Smart Search** | When enabled, shortcode tags are removed during Smart Search indexing so product HTML does not pollute the search index. | Yes |

### Category List View

These settings control how the plugin automatically displays product blocks on Joomla category blog pages (not shortcodes).

| Setting | Description | Default |
|---------|-------------|---------|
| **Add to Basket Display** | How to display the add-to-basket block in category list views. | Display Product Options |
| **Product Block Position** | Position of the product block relative to the article content. | Bottom of Content |
| **Display J2Commerce Images** | Display product images from J2Commerce in category list views. | Yes |
| **Image Type** | Which type of product images to display (Thumbnail, Main, or Main and Additional). | Thumbnail Image |
| **Link Image to Product** | Make product images clickable links to the product detail page. | Yes |
| **Enable Image Zoom** | Enable zoom effects on product images. | Yes |
| **Thumbnail Image Width** | Width in pixels for thumbnail images in category list views. | 120 |
| **Additional Image Width** | Width in pixels for additional product images. | 80 |

### Article View

These settings control how the plugin displays product blocks on individual Joomla article pages (not shortcodes).

| Setting | Description | Default |
|---------|-------------|---------|
| **Product Block Position** | Position of the product block relative to the article content. | Bottom of Content |
| **Display J2Commerce Images** | Display product images from J2Commerce in article view. | Yes |
| **Image Placement** | Where to display product images — on the product block, before content, or after content. | On Product Block |
| **Image Type** | Which type of product images to display (Main or Main and Additional). | Main Image |
| **Enable Image Zoom** | Enable zoom effects on product images. | Yes |
| **Main Image Width** | Width in pixels for the main product image in article view. | 300 |
| **Additional Image Width** | Width in pixels for additional product images in article view. | 100 |

---

## J2Commerce Tab in the Article Editor

When the plugin is enabled, a **J2Commerce** tab appears in the Joomla article editor. This tab lets you configure product settings (type, price, SKU, stock, shipping, and more) for the article directly — without opening the product separately in J2Commerce.

<!-- SCREENSHOT: Article editor showing the J2Commerce tab with product configuration fields -->

:::info

The J2Commerce tab only appears if **Show Article Options** is enabled in the Joomla Content component settings. If the tab is missing, go to **Content** -> **Options** and set **Show Article Options** to **Yes**.

:::

---

## Tips

- Use `full` or `card` when you want a self-contained product block that matches your store's category page appearance.
- Use individual options like `price` and `cart` when you want fine-grained control over placement within your article layout.
- The **Subtemplate Override** setting is useful if your article pages use a different framework from your product catalog. For example, set it to **Bootstrap 5** to ensure consistent rendering on a UIkit-based site.
- The inline form `{j2commerce 42|price}` is handy for embedding a price inside a sentence without the visual weight of the paired form.
- You can use the same product in multiple places in one article. The plugin handles duplicate shortcodes correctly.

---

## Troubleshooting

### Shortcodes appear as raw text on the frontend

**Cause:** The plugin is disabled.

**Solution:**

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Content - J2Commerce**.
3. Ensure the status is **Enabled**.
4. Click **Save & Close** and reload the article.

### No product output — the shortcode is replaced with nothing

**Cause:** The product ID in the shortcode does not match a published product.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Products** and confirm the product ID.
2. Verify the product is published (not unpublished or trashed).
3. Update the shortcode with the correct ID.

### The product block appears but looks different from the category page

**Cause:** The **Subtemplate Override** may be set to a different framework than your category pages use.

**Solution:**

1. Open the plugin settings.
2. Set **Subtemplate Override** to **Use Global** to follow the site-wide subtemplate.
3. Save and clear the Joomla cache: **Home Dashboard** -> **Cache** -> **Delete All**.

### The J2Commerce tab is missing from the article editor

**Cause:** Joomla's **Show Article Options** setting is disabled, which hides all article tabs.

**Solution:**

1. Go to **Content** -> **Options**.
2. In the **Articles** tab, set **Show Article Options** to **Yes**.
3. Save and reopen the article editor.

### Product shortcodes appear in Smart Search results

**Cause:** The **Strip Shortcodes in Smart Search** setting is disabled.

**Solution:**

1. Open the plugin settings.
2. Enable **Strip Shortcodes in Smart Search**.
3. Re-index Smart Search: **Components** -> **Smart Search** -> **Index**.

### Stale product data appears in articles (old price, old image)

**Cause:** Joomla's content cache has stored the rendered article HTML.

**Solution:**

1. Go to **Home Dashboard** -> **Cache** -> **Delete All** to clear all caches.
2. If the problem recurs, enable **Clear Content Cache** in the plugin's Basic Settings. This automatically clears caches whenever product data is refreshed.

---

## Related Topics

- [Products](../products/index.md)
- [Category Catalog](../catalog/index.md)
