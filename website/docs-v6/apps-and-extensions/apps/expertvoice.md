---
title: "ExpertVoice Recommendations"
sidebar_label: "ExpertVoice Recommendations"
sidebar_position: 35
description: "Display ExpertVoice expert review and recommendation widgets on J2Commerce product pages using your ExpertVoice API key and a single configuration screen."
---

# ExpertVoice Recommendations

ExpertVoice Recommendations injects the ExpertVoice CDN widget onto your product pages so shoppers see trusted expert reviews and recommendations right alongside your products. Setup takes under five minutes: enter your API key, choose a display location, and save. No template changes or coding required.

The widget loads from `cdn.expertvoice.com` and is driven entirely by your product's SKU, so the correct recommendations appear automatically for each item.

## Requirements

- Joomla 6.0.0 or later
- J2Commerce 6.0.0 or later
- PHP 8.3 or later
- An active ExpertVoice account with an API key

## Installation

**ExpertVoice Recommendations** is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

### Step 1: Purchase and download

1. Go to [j2commerce.com](https://www.j2commerce.com/) and navigate to **Extensions**.
2. Find **ExpertVoice Recommendations**, click **View Details**, then **Add to Cart** and complete checkout.
3. Open your account and go to **My Downloads**.
4. Click **Available Versions** -> **View Files** -> **Download** to get the `app_expertvoice.zip` file.

### Step 2: Install

1. In the Joomla admin panel, go to **System** -> **Install** -> **Extensions**.
2. Drag and drop `app_expertvoice.zip` onto the upload area, or click **Browse for file** and select it.
3. The plugin installs and enables itself automatically — no manual enable step needed.

<!-- SCREENSHOT: Joomla Extension Manager upload area showing app_expertvoice.zip ready to install -->

## Accessing Settings

After installation the plugin is enabled and ready to configure. There are two ways to reach the settings screen.

**Option A — via J2Commerce:** Click the **J2Commerce** icon in the top-right admin toolbar -> **Apps** -> locate **ExpertVoice Recommendations** -> click the plugin name.

**Option B — via Plugin Manager:** Go to **System** -> **Manage** -> **Plugins** -> search for **ExpertVoice** -> click the plugin name.

<!-- SCREENSHOT: Plugin Manager search results showing "ExpertVoice Recommendations" with Enabled badge -->

## Configuration

All settings are on a single **General** tab. The table below covers each field.

<!-- SCREENSHOT: ExpertVoice plugin settings screen showing all fields -->

### Display Location

The **Display Location** dropdown controls exactly where the widget appears on the product page. Choose the option that matches how your store displays products.

| Option | Widget appears… | Works with |
|--------|-----------------|-----------|
| **After product title** | Between the product title and the product body | Joomla article (com_content) views |
| **Before product content** | Immediately before the product body text | Joomla article (com_content) views |
| **After product content** | Immediately after the product body text | Joomla article (com_content) views |
| **After Add to Cart button** | Directly below the Add to Cart button | J2Commerce native product pages |
| **J2Commerce product detail** | At the top of the J2Commerce product detail area | J2Commerce native product pages |

**Recommended default:** "After product content" places the widget where customers have already read the product description and are deciding whether to buy — a natural spot for expert validation.

The first three options fire on Joomla's built-in content events and work when products are displayed via Joomla articles. The last two fire on J2Commerce-specific events and are the better choice for most stores using J2Commerce's native product templates.

:::note
On catalog/category pages that list multiple products, the ExpertVoice CDN script initialises once per page load. Only one widget container renders per page in that context. To avoid confusion, choose a J2Commerce product detail placement (the last two options) — these only fire on single-product detail pages.
:::

### API Key

| Field | Description | Default |
|-------|-------------|---------|
| **API Key** | Your ExpertVoice API key. Required — the widget will not load without it. | _(empty)_ |

Find your API key by logging into your [ExpertVoice dashboard](https://www.expertvoice.com/), navigating to **Account Settings** -> **API**, and copying the key shown there. Contact your ExpertVoice account representative if you do not see an API section.

:::warning API Key required
If **API Key** is empty, the widget is silently skipped for every product regardless of other settings. If debug mode is on, this is logged to `administrator/logs/plg_j2commerce_app_expertvoice.php`.
:::

### Widget Target

| Field | Description | Default |
|-------|-------------|---------|
| **Target Type** | **Default** uses the standard ExpertVoice container ID. **Custom** lets you specify your own. | Default |
| **Custom Target ID** | Visible only when **Target Type** is **Custom**. Enter a custom HTML element ID. | _(empty)_ |

The custom ID field accepts only letters, numbers, hyphens, and underscores (`[A-Za-z0-9_-]`). Any other characters are stripped server-side before the value reaches the page. For most stores the **Default** setting is correct; change it only if ExpertVoice support has directed you to use a specific container name.

### Header Colors

| Field | Description | Default |
|-------|-------------|---------|
| **Header Background Color** | Background color for the ExpertVoice widget header bar. | `rgb(0, 0, 0)` (black) |
| **Header Text Color** | Text color for the widget header bar. | `rgb(255, 255, 255)` (white) |

Click either color swatch to open a color picker and match these values to your store's brand palette. If your theme uses a dark header, a light background such as `rgb(30, 30, 30)` with white text blends naturally.

### Debug Mode

| Field | Description | Default |
|-------|-------------|---------|
| **Debug Mode** | When **Yes**, writes diagnostic log entries to `administrator/logs/plg_j2commerce_app_expertvoice.php`. | No |

Always leave this **No** on a live site. Enable it temporarily only when diagnosing why the widget is not appearing. See [Troubleshooting](#troubleshooting) for how to use the log.

## Saving Settings

Click **Save** in the Joomla toolbar after adjusting any setting. Changes take effect on the next page load — no cache clearing is required unless your site uses server-side full-page caching.

## Verifying the Widget Loads

After saving, open a product page on your store front end and confirm the widget is working.

**Check 1 — Widget container in the page source.** Right-click the page -> **View Page Source** and search for `data-expertvoice-widget`. You should see a `<div>` element like:

```html
<div
    id="expertvoice-recommendations"
    class="j2commerce-expertvoice-app mt-3"
    data-expertvoice-widget
    data-api-key="YOUR_API_KEY"
    data-product-code="YOUR_SKU"
    ...
></div>
```

If this element is missing, the plugin is not rendering — see [Widget does not appear](#widget-does-not-appear).

**Check 2 — CDN script loaded.** Open browser **Developer Tools** -> **Network** tab, reload the page, and filter by `cdn.expertvoice.com`. You should see the script `cdn.expertvoice.com/widget/js/recommendations/v1/plugin.js` with status 200.

**Check 3 — EV settings object in console.** Open the browser **Console** and type `window.EV`. If the ExpertVoice widget has initialised, you will see the EV namespace object. If you see `undefined`, the CDN script has not yet executed or the API key was rejected.

## Troubleshooting

### Widget does not appear

Work through these checks in order.

**Plugin is enabled.** Go to **System** -> **Manage** -> **Plugins**, search for **ExpertVoice**, and confirm the status is **Enabled**.

**API Key is not empty.** Open the plugin settings and verify **API Key** contains your key from the ExpertVoice dashboard. A missing API key silently suppresses the widget.

**Product has a SKU.** Open the product in J2Commerce and confirm the **SKU** field is filled in. The widget is SKU-driven — if SKU is blank, the widget is skipped for that product. Check under the product's **General** tab or the variant row if it is a variable product.

**Display Location matches the page.** If you selected **After product title**, **Before product content**, or **After product content**, these fire on Joomla article (com_content) pages only. They will not fire on J2Commerce native product-detail pages. Switch to **After Add to Cart button** or **J2Commerce product detail** if your store uses J2Commerce's native templates.

**Enable debug mode.** Set **Debug Mode** to **Yes**, save, and reload the product page. Open `administrator/logs/plg_j2commerce_app_expertvoice.php` in a text editor and check for log entries from the plugin. The log shows which check caused the widget to be skipped.

After diagnosing, turn **Debug Mode** back to **No**.

### Widget renders but shows no reviews

This is an ExpertVoice platform issue, not a J2Commerce configuration issue. The widget container and CDN script are loading correctly, but ExpertVoice has no approved recommendations for that SKU yet.

Contact your ExpertVoice account representative and confirm:

- Your API key is approved for production use.
- The product SKU in J2Commerce exactly matches the product code registered in your ExpertVoice catalog.
- Your store domain is whitelisted in your ExpertVoice account settings.

### Multiple widgets on a catalog page

The ExpertVoice CDN script is designed to initialise once per page. On a category or product list page that shows multiple products, only one widget container will be painted by the CDN's single-init logic.

To avoid this: use the **After Add to Cart button** or **J2Commerce product detail** display locations. These events fire only on the single-product detail view, so exactly one widget loads per page load.

## What's New Compared to the J2Store Version

If you previously used the ExpertVoice app in J2Store, here is what changed in the J2Commerce 6 version:

- **Two new display locations** — **After Add to Cart button** and **J2Commerce product detail** are new placements that work on J2Commerce's native product-detail pages, not only on com_content article views.
- **Security hardened** — the J2Store version injected API key, SKU, and color values directly into an inline `<script>` block using string concatenation. Any param containing a quote or `</script>` could escape the script context. The J2Commerce version passes all values as `data-*` attributes with `htmlspecialchars` encoding, and the external JS file reads those attributes — no string interpolation into code.
- **External JavaScript file** — JS is now a separate file loaded via Joomla's Web Asset Manager with `defer`. This respects Content Security Policy headers and avoids inline script restrictions.
- **5x faster article-to-product resolution** — the J2Store version called multiple FOF queries per article to look up the product record. The J2Commerce version uses a single `ProductHelper::getFullProductBySource()` call.
- **Standard Plugin Manager UI** — the J2Store version had a bespoke admin Apps view. The J2Commerce version uses the standard Joomla Plugin Manager interface for all settings.
- **Automatic enable on install** — the plugin enables itself during installation, so no manual step is needed.
- **Debug logging** — a new **Debug Mode** toggle writes diagnostic entries to a dedicated log file, making it easy to trace exactly why a widget did or did not render on a specific page.
- **Full British English (en-GB) translation** — all labels and descriptions are available in en-GB alongside the en-US default.
- **Custom Target ID hardened** — the custom container ID field now applies server-side `filter="cmd"` so only safe characters reach the page.

## Related Topics

- [Apps and Extensions](../index.md)
- [Product Display Overview](../../catalog/index.md)
