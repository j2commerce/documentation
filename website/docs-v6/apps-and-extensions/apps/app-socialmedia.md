---
title: "Social Media Sharing"
sidebar_label: "Social Media Sharing"
sidebar_position: 70
description: "Add social sharing buttons for Facebook, Twitter/X, Pinterest, and LinkedIn to your J2Commerce product pages, with automatic Open Graph and Twitter Card meta tag support."
---

# Social Media Sharing

Social Media Sharing adds share buttons for Facebook, Twitter/X, Pinterest, and LinkedIn directly to your product pages. Customers can share a product with a single click, and the plugin automatically injects Open Graph and Twitter Card meta tags into each page so shared links display rich previews — product image, name, price, and availability — on every major social platform. You choose which networks to show, where the buttons appear, and whether to use icon fonts or your own custom images.

## Requirements

- Joomla 6.0.0 or later
- J2Commerce 6.0.0 or later
- PHP 8.3 or later
- At least one product created in J2Commerce

## Installation

**Social Media Sharing** is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

### Step 1: Purchase and download

1. Go to the [J2Commerce website](https://www.j2commerce.com/) and navigate to **Extensions**.
2. Locate **Social Media Sharing**, click **View Details**, then **Add to Cart** and complete checkout.
3. After purchase, open your account and go to **My Downloads**.
4. Find the Social Media Sharing app, click **Available Versions** -> **View Files** -> **Download** to get the `app_socialmedia.zip` file.

### Step 2: Install

1. In the Joomla admin panel, go to **System** -> **Install** -> **Extensions**.
2. Drag and drop the `app_socialmedia.zip` file onto the upload area, or click **Browse for file** and select it.
3. The plugin installs and enables itself automatically.

> [Screenshot: Joomla Extension Manager upload area with app_socialmedia.zip highlighted]

## Enabling and Accessing Settings

After installation, the plugin is enabled automatically. To verify and open the settings:

**Option A (via J2Commerce):** Click the **J2Commerce** icon in the top-right admin toolbar -> **Apps** -> locate **Social Media Sharing** -> click the plugin name.

**Option B (via Plugin Manager):** Go to **System** -> **Manage** -> **Plugins** -> search for **Social Media Sharing** -> click the plugin name.

> [Screenshot: Plugin Manager search results showing "Social Media Sharing" with Enabled status]

The settings are organized into five tabs: **General**, **Facebook**, **Twitter**, **Pinterest**, and **LinkedIn**.

## Configuration Walkthrough

### General Tab

The General tab controls where buttons appear, which product image is shared, and the share message text.

> [Screenshot: General tab showing all settings with default values]

| Setting | What it controls | Default |
|---------|-----------------|---------|
| **Pages to Display** | Which page types show the share buttons: product detail page only, category/list pages only, or both. | Product View |
| **Display Location** | The exact position on the page where buttons are injected — relative to price, cart button, or article content. See the [Display Location table](#display-location-options) below. | After Add to Cart button |
| **Social Share Product Image** | Which product image to use when building the share URL (Pinterest) and Open Graph tags: the main image or the thumbnail. | Main Image |
| **Image Width (px)** | Width in pixels for custom button images. This setting only affects buttons using **Image** mode, not icon mode. | 30 |
| **Share Message** | The opening text prepended to the product name in the share message. The product name is always appended automatically. | Check this out! |
| **Include Price in Message** | When set to **Yes**, the formatted product price is appended to the share message in parentheses. | Yes |
| **Debug Mode** | Writes diagnostic entries to `administrator/logs/plg_j2commerce_app_socialmedia.php`. Always set to **No** on a live site. | No |

#### Pages to Display options

| Option | Where buttons appear |
|--------|---------------------|
| **Product View** | Product detail pages only |
| **Category View** | Category/product list pages only |
| **Product & Category View** | Both product detail and list pages |

#### Display Location options

The **Display Location** dropdown controls which event hook the buttons attach to. The seven available positions are:

| Option | Where buttons appear | Works on |
|--------|---------------------|----------|
| **After product title** | Between the article title and the article body | Joomla content (com_content) pages |
| **Before product content** | Immediately before the article body text | Joomla content (com_content) pages |
| **After product content** | Immediately after the article body text | Joomla content (com_content) pages |
| **After Add to Cart button** | Directly below the Add to Cart button (default) | J2Commerce product views |
| **Before Add to Cart button** | Directly above the Add to Cart button | J2Commerce product views |
| **Before product price** | Above the displayed price | J2Commerce product views |
| **After product price** | Below the displayed price | J2Commerce product views |

The first three options fire on Joomla's built-in content events (`onContentAfterTitle`, `onContentBeforeDisplay`, `onContentAfterDisplay`). They work when your products are displayed via Joomla articles or a content plugin. The last four options fire on J2Commerce-specific events and are the right choice for most stores using J2Commerce's native product templates.

> [Screenshot: Display Location dropdown open showing all seven options]

### Facebook Tab

> [Screenshot: Facebook tab showing Enable Facebook toggled to Yes and all fields visible]

| Setting | What it controls | Default |
|---------|-----------------|---------|
| **Enable Facebook** | Show the Facebook share button. Also enables Open Graph meta tags on product pages when set to Yes. | No |
| **Image or Icon** | **Icon** renders a CSS icon class; **Image** renders a custom uploaded image. Only shown when Facebook is enabled. | Icon |
| **Icon** | The CSS class string for the Facebook icon. Works with any icon library loaded by your template. | `fab fa-brands fa-facebook-f fs-2` |
| **Facebook Image** | A custom button image uploaded via the Joomla Media Manager. Only used when **Image or Icon** is set to **Image**. | — |
| **Facebook App ID** | Your Facebook App ID from the Meta developer portal. Required for the `fb:app_id` Open Graph meta tag, which improves click tracking and enables Facebook Insights for your store pages. | — |
| **Facebook Contact Email** | A contact email associated with your Facebook developer account, stored in plugin settings for reference. | — |

When **Enable Facebook** is set to **Yes**, the plugin injects a full set of Open Graph and Facebook Product Graph meta tags on product detail pages, including price, currency, availability, SKU, weight, brand, and category. See [Open Graph and Twitter Card Meta Tags](#open-graph-and-twitter-card-meta-tags) for details.

### Twitter Tab

> [Screenshot: Twitter tab showing Enable Twitter toggled to Yes]

| Setting | What it controls | Default |
|---------|-----------------|---------|
| **Enable Twitter (X)** | Show the Twitter/X share button. | No |
| **Image or Icon** | **Icon** or **Image** mode for the button. Only shown when Twitter is enabled. | Icon |
| **Icon** | CSS class for the Twitter/X icon. | `fab fa-brands fa-x-twitter fs-2` |
| **Twitter Image** | Custom image for the button when in Image mode. | — |
| **Include Twitter Meta Tags** | Inject Twitter Card meta tags into the page head. Can be set to **Yes** independently of whether the share button is enabled — useful when you want rich link previews without showing a share button. | Yes |
| **Personal Twitter Account** | Your personal @username (without the @ symbol). Populates the `twitter:creator` meta tag. | — |
| **Website Twitter Account** | Your site's @username (without the @ symbol). Populates the `twitter:site` meta tag. | — |
| **Product Image Width** | Width in pixels of the product image referenced in `twitter:image:width`. Set to 0 to omit this tag entirely. | 50 |
| **Description Limit (characters)** | Maximum number of characters from the product short description to include in `twitter:description`. The plugin trims at a word boundary. | 50 |
| **Twitter Card Type** | **Summary** shows a small thumbnail. **Summary Large Image** shows a large hero image — recommended for stores with high-quality product photography. | Summary |

### Pinterest Tab

> [Screenshot: Pinterest tab]

| Setting | What it controls | Default |
|---------|-----------------|---------|
| **Enable Pinterest** | Show the Pinterest share button. | Yes |
| **Image or Icon** | **Icon** or **Image** mode for the button. Only shown when Pinterest is enabled. | Icon |
| **Icon** | CSS class for the Pinterest icon. | `fab fa-brands fa-pinterest` |
| **Pinterest Image** | Custom image for the button when in Image mode. | — |

Pinterest requires a product image to create a pin. If the product has no main image or thumbnail assigned, the Pinterest button is hidden automatically even when enabled — see [Pinterest Behavior](#pinterest-behavior).

### LinkedIn Tab

> [Screenshot: LinkedIn tab]

| Setting | What it controls | Default |
|---------|-----------------|---------|
| **Enable LinkedIn** | Show the LinkedIn share button. | Yes |
| **Image or Icon** | **Icon** or **Image** mode for the button. Only shown when LinkedIn is enabled. | Icon |
| **Icon** | CSS class for the LinkedIn icon. | `fab fa-brands fa-linkedin-in` |
| **LinkedIn Image** | Custom image for the button when in Image mode. | — |

## Custom Icons vs. Custom Images

Each social network button supports two display modes, controlled by the **Image or Icon** setting on each network's tab.

### Icon mode (default)

The button renders as a `<span>` element with the CSS class you specify in the **Icon** field. Any icon library works — Font Awesome, Bootstrap Icons, UIkit Icons, or custom CSS. The default class strings use Font Awesome syntax:

```
fab fa-brands fa-facebook-f fs-2    (Facebook)
fab fa-brands fa-x-twitter fs-2     (Twitter/X)
fab fa-brands fa-pinterest          (Pinterest)
fab fa-brands fa-linkedin-in        (LinkedIn)
```

If your template does not load Font Awesome, these classes render as invisible elements. Either install a Font Awesome plugin, switch to Image mode, or replace the class with one from your template's icon library.

### Image mode

The button renders as an `<img>` element using a file you upload via the Joomla Media Manager. The image is displayed at the width set by **Image Width (px)** in the General tab (default: 30 px). Height scales proportionally.

To switch a button to Image mode:

1. Open the plugin settings tab for that network (for example, the **Facebook** tab).
2. Set **Image or Icon** to **Image**.
3. Click the **Facebook Image** field and choose or upload an image using the Media Manager.
4. Click **Save**.

## Open Graph and Twitter Card Meta Tags

When a customer shares a product link or posts it in a chat, social platforms and messaging apps fetch the page and read meta tags to build a rich preview card — showing the product name, image, price, and description instead of a bare URL.

### What the plugin injects

**On product list / category pages** (only when Facebook is enabled):

- `og:type` = `product.group`
- `og:url`, `og:title`
- `og:image` — the first product image found in the list
- `fb:app_id`

**On product detail pages** (when Facebook is enabled):

- Full Open Graph set: `og:type`, `og:title`, `og:image`, `og:locale`, `og:price:amount`, `og:price:currency`
- Facebook Product Graph tags: `product:price:amount`, `product:price:currency`, `product:availability`, `product:brand`, `product:category`, `product:retailer_item_id`, `product:upc`, `product:weight:value`, `product:original_price:amount`, `product:sale_price:amount`

**On product detail pages** (when **Include Twitter Meta Tags** is set to Yes):

- `twitter:card` — `summary` or `summary_large_image` depending on **Twitter Card Type**
- `twitter:site`, `twitter:creator`
- `twitter:title` — product name plus formatted price
- `twitter:image`, `twitter:image:width`
- `twitter:description` — truncated product short description

### Why the Facebook App ID matters

The `fb:app_id` meta tag tells Facebook which registered app owns this page. Without it, Facebook's link-preview crawler can still read your Open Graph tags, but you lose access to Facebook Insights data for those shared links. Creating a Facebook App ID is free — visit the [Meta developer portal](https://developers.facebook.com/) and register your site as an app.

### Twitter Card type: Summary vs. Summary Large Image

**Summary** (default): Shows a thumbnail-sized image on the left with text on the right. Suitable for any product image.

**Summary Large Image**: Shows a large banner image above the text. Requires an image of at least 300 x 157 px. Recommended when your products have high-quality photography, as it makes shared posts much more visually prominent in a Twitter/X feed.

### How to test your meta tags

After saving the plugin settings with Facebook and/or Twitter enabled, visit a product page on your site, then use these tools to verify what social platforms will see:

- **Facebook Sharing Debugger** — [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/) — paste a product URL to see the exact Open Graph tags Facebook reads and the preview it generates. Use **Scrape Again** if a cached version appears.
- **Twitter Card Validator** — [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) — paste a product URL to preview the Twitter Card.
- **Browser Developer Tools** — View Page Source on any product page and search for `og:` or `twitter:` to see the raw meta tags the plugin is generating.

## Pinterest Behavior

Pinterest requires an image URL to create a pin. When the Pinterest button is clicked, the plugin passes the product image URL directly to Pinterest's pin creation dialog.

The button is shown only when a product image is available. The plugin checks in this order:

1. The J2Commerce main image or thumbnail (depending on **Social Share Product Image** in the General tab)
2. The Joomla article intro image associated with the product's source article
3. The Joomla article full-text image

If none of these images are found, the Pinterest button is hidden automatically even when **Enable Pinterest** is set to **Yes**. No error is shown to the customer — the button simply does not render.

To ensure the Pinterest button appears on all products, assign at least a main image to every product in the J2Commerce product editor.

## What's New Compared to the J2Store Version

If you used the Social Media Sharing app in J2Store, the J2Commerce version includes these improvements:

- **Native Joomla 6 plugin** — rebuilt using namespaced PHP 8.3 classes, the Joomla 6 event system, and vanilla JavaScript (ES6+). No jQuery dependency.
- **Open Graph and Twitter Card meta tags refreshed** — the plugin now injects full Facebook Product Graph tags (`product:availability`, `product:brand`, `product:category`, `product:original_price`, `product:sale_price`, `product:weight`) in addition to the basic `og:*` set. Twitter Card tags use the current Twitter/X specification.
- **Google+ button removed** — Google+ was shut down in April 2019. The button no longer exists in the J2Commerce version.
- **XSS hardened** — the J2Store version built share URLs using `addslashes()` and inline `onclick` handlers, which could allow quote injection. The J2Commerce version passes all values via `data-*` attributes with `htmlspecialchars` encoding and uses a delegated `addEventListener` in the JS file — no inline event handlers.
- **Standard Joomla Plugin Manager configuration** — the J2Store version had a custom Apps admin view. The J2Commerce version uses the standard Joomla Plugin Manager interface, so all settings are in one place alongside every other plugin on your site.
- **Debug logging mode** — a new **Debug Mode** setting writes diagnostic entries to `administrator/logs/plg_j2commerce_app_socialmedia.php`, making it much easier to diagnose display issues without enabling Joomla's global debug mode.

## Troubleshooting

### Share buttons do not appear anywhere

**Check 1 — Plugin is enabled.** Go to **System** -> **Manage** -> **Plugins**, search for **Social Media Sharing**, and confirm the status shows **Enabled**. Click the status icon to toggle it on if needed.

**Check 2 — At least one network is enabled.** Open the plugin settings. On the **Facebook**, **Twitter**, **Pinterest**, and **LinkedIn** tabs, check that **Enable [Network]** is set to **Yes** for at least one network. All four default to **No** except Pinterest and LinkedIn.

**Check 3 — Pages to Display matches your test page.** If **Pages to Display** is set to **Product View**, the buttons will not appear on category listing pages. If you are testing on a category page, set this to **Product & Category View**.

**Check 4 — Display Location matches your template's event.** The three content-event options (**After product title**, **Before product content**, **After product content**) only fire on Joomla article pages (`com_content`). If your products use J2Commerce's native product templates, choose one of the four J2Commerce-specific positions: **After Add to Cart button**, **Before Add to Cart button**, **Before product price**, or **After product price**.

**Check 5 — Enable Debug Mode temporarily.** Set **Debug Mode** to **Yes**, save, then reload a product page. Open `administrator/logs/plg_j2commerce_app_socialmedia.php` and look for entries from the plugin to confirm whether `renderSocialButtons` is being called and what event name it is seeing.

### The Pinterest button is missing but the others appear

Pinterest only renders when a product image is available. Open the product in the J2Commerce product editor and confirm that an image is assigned in the **Images** tab. Save the product, clear any caches, and test again.

Also check which image the plugin is configured to use. In the General tab, **Social Share Product Image** controls whether the main image or the thumbnail is used. If you set it to **Thumbnail Image**, make sure the product has a thumbnail assigned.

### Open Graph meta tags are not appearing in the page source

Open Graph tags on product detail pages are only injected when **Enable Facebook** is set to **Yes** on the Facebook tab. Verify this first. Then visit a product page, right-click the page, choose **View Page Source**, and search for `og:title` to confirm the tags are present.

Note that meta tags are injected server-side and are visible in the raw HTML source but may not appear in browser Developer Tools if your theme uses a JavaScript framework that replaces the `<head>` after page load.

Open Graph tags on product list/category pages also require **Enable Facebook** to be set to **Yes**.

### Custom button image is not showing

Make sure:

1. The **Image or Icon** setting for that network is set to **Image** (not **Icon**).
2. The image file exists in the location you selected. Re-open the media field and verify the file path is correct.
3. The image file is accessible via your web server — browse to the URL directly in a browser tab to confirm it loads.
4. The **Image Width (px)** setting in the General tab is set to a reasonable size (for example, 30 to 60 px).

### Icon classes are not rendering visually

The default icon classes use Font Awesome syntax. If your Joomla template does not load Font Awesome, the `<span>` elements will exist in the HTML but will be invisible. Options:

- Install a Font Awesome system plugin for Joomla.
- Replace the icon class with one from the icon library your template includes (for example, Bootstrap Icons uses `bi bi-facebook`).
- Switch to **Image** mode and upload your own button images.

### Share message contains garbled characters

Special characters in the product name and share message are encoded using JavaScript's `encodeURIComponent` at click time before being appended to the share URL. This is expected behavior and does not require any configuration. If you see double-encoded characters (for example, `%2526`), check whether another plugin is also encoding URLs before the share dialog opens.

## Related Topics

- [Apps and Extensions](../index.md)
- [Product Display Overview](../../catalog/index.md)
