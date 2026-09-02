---
title: "Image Popup Gallery"
sidebar_label: "Image Popup Gallery"
sidebar_position: 106
description: "Open product images in a lightbox gallery so shoppers can zoom, swipe, and step through every photo without leaving the product page."
---

# Image Popup Gallery

Image Popup Gallery replaces the plain single-image zoom on your product pages with a full lightbox gallery — arrows, keyboard navigation, a thumbnail strip, and captions. You can also turn on the same full-size popup for the photos shown on your category and tag list pages.

## Requirements

- PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- A J2Commerce storefront app enabled — **app_bootstrap5** or **app_uikit**

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Image Popup Gallery** App **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to **My Downloads** under your profile button in the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

You can install the **Image Popup Gallery** App with the Joomla installer.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the `app_imagepopup.zip` file or use the **Install from URL** option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

## Enable the App

Once the app is installed, you need to enable it. There are **two** ways to reach the list of apps.

**Option A:** Go to the **J2Commerce** icon in the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

Look for **Image Popup Gallery**, click the **X**, and it turns into a green checkmark. The app is now enabled and working on your storefront with its default settings — no further setup is required.

<!-- SCREENSHOT: J2Commerce -> Apps list with Image Popup Gallery enabled -->

## Configure the App

Click the **Image Popup Gallery** title next to the green checkmark to open the settings. All of the options below live in a single **Basic Settings** tab.

<!-- SCREENSHOT: Image Popup Gallery plugin settings, Basic Settings tab -->

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app shows a description below each field as you configure it.

:::

### Basic Settings tab

| Field | What it does | Default |
|-------|--------------|---------|
| **Enable on Product Pages** | When on, clicking a product image on the detail page opens the gallery lightbox instead of the built-in zoom overlay. Turn this off to leave product pages exactly as they are and use the app only for the list-view popups below. | Yes |
| **Enable in Category/Tag Lists** | When on, clicking a product image in category and tag list pages opens the full-size image in a popup instead of going to the product page. | No |
| **Enable Multi-Image in List View** | Only shown when **Enable in Category/Tag Lists** is on. Includes each product's additional images in the list popup, not just the main photo. The extra images are fetched in a single batched lookup per page, so turning this on has a small, predictable cost. Leave off for the fastest catalog pages. | No |
| **Loop Images** | Cycles back to the first image after the last one inside the popup. | Yes |
| **Show Thumbnail Strip** | Shows a row of thumbnails along the bottom of the popup for quick navigation. A product with only one image never shows the strip. | Yes |
| **Show Captions** | Shows the image's alternative text as a caption beneath each image in the popup. | Yes |
| **Contrast Mode** | Sets the popup's color scheme. **Dark Mode** dims the page behind the image; **Light Mode** puts the image on a near-white background, which suits products photographed against white. | Dark Mode |
| **Show Slideshow Button** | Adds a play button to the popup toolbar that auto-advances through the images. The slideshow never starts on its own — your shopper has to click it. | No |

:::info

NOTE: **Enable Multi-Image in List View** only appears once **Enable in Category/Tag Lists** is switched on.

:::

## What Your Shoppers See

On a product page, the gallery works like this:

1. A shopper clicks the main product photo.
2. The full lightbox gallery opens over the page, showing every photo for that product.
3. Arrow buttons and the keyboard's left/right keys move between images.
4. A thumbnail strip along the bottom of the popup lets a shopper jump straight to any photo (unless the product only has one photo, in which case no strip appears).
5. If **Show Captions** is on, each image's descriptive text appears underneath it.

<!-- SCREENSHOT: Product detail page gallery open, showing arrows, thumbnail strip and caption -->

Above the thumbnail strip on the product page, shoppers also see a **"Click to see full view"** link. Clicking it opens the same lightbox gallery starting from the first photo — a second, always-visible way in, in case a shopper doesn't think to click the photo itself.

<!-- SCREENSHOT: Product page showing the "Click to see full view" link above the thumbnail strip -->

If **Enable in Category/Tag Lists** is turned on, clicking a product's thumbnail on a category or tag listing page opens that product's photo (or photos, with **Enable Multi-Image in List View** turned on) in the same style of popup, instead of taking the shopper straight to the product page.

## First-Time Setup Checklist

1. Install and enable the app.
2. Leave **Enable on Product Pages** on if you want the new gallery on every product page — it's on by default.
3. Decide whether to also turn on **Enable in Category/Tag Lists** for your catalog and tag pages.
4. If you turned list popups on and want more than the main photo, turn on **Enable Multi-Image in List View** too.
5. Pick **Loop Images**, **Show Thumbnail Strip**, **Show Captions**, **Contrast Mode**, and **Show Slideshow Button** to match how you want the popup to look and behave.
6. Click **Save**, then open a product page on your storefront to see the gallery in action.

## How It Works

1. Out of the box, J2Commerce shows one product photo on the page with a simple zoom-in effect and no way to browse to the other photos without scrolling the thumbnail strip and reloading the main image each time.
2. This app replaces that with a full gallery popup — every photo for the product, with arrows, keyboard navigation, a thumbnail strip and captions — and turns off the built-in zoom so nothing tries to load twice.
3. The gallery is built from the same photo-viewer software your J2Commerce storefront already ships with, so there's nothing extra for a shopper's browser to download.
4. Whenever possible, the popup shows the original full-size photo rather than a smaller copy of it, so the enlarged view actually looks sharp. If the original photo isn't available on the server for some reason, the app safely falls back to showing the copy that was already on the page instead of a broken image.
5. Switching a product's color, size, or other variant on the product page swaps the photos shown — the gallery keeps working with whichever photos are on screen at the time, so it never gets stuck showing the wrong variant's pictures.

## Tips

- **Turn off product-page popups and keep list popups only** if you just want a quick-look preview on your category pages without changing how the product page itself behaves — set **Enable on Product Pages** to No and **Enable in Category/Tag Lists** to Yes.
- **Use Light Mode for white-background product photography** — it keeps the popup's backdrop close to the photo's own background, so the photo doesn't look like it's floating on a dark stage.
- **Leave Multi-Image in List View off on very large catalogs** unless you need it — it's a small extra lookup per page, and most shoppers browsing a list only want a quick preview, not the full gallery.
- **Write good alt text on your product photos** — it becomes the caption shown in the popup when **Show Captions** is on.

## Troubleshooting

### The gallery doesn't open on the product page

**Cause:** **Enable on Product Pages** is switched off, or your storefront template isn't one of the supported ones.

**Solution:**

1. Go to **J2Commerce -> Apps -> Image Popup Gallery** and confirm **Enable on Product Pages** is set to **Yes**, then **Save**.
2. Confirm your storefront is running the **app_bootstrap5** or **app_uikit** app — these are the only supported product-page templates.
3. Clear the Joomla cache: **Home Dashboard -> Cache -> Delete All**, then reload the product page.

### Shoppers still see the old single-photo zoom

**Cause:** The app isn't enabled, or an older cached version of the page is being shown.

**Solution:**

1. Go to **J2Commerce -> Apps** and confirm **Image Popup Gallery** shows a green checkmark.
2. Clear the Joomla cache and reload the page in a private/incognito browser window to rule out browser caching.

### List-page popups only show one image

**Cause:** **Enable Multi-Image in List View** is switched off, so only the product's main photo is used.

**Solution:**

1. Go to **J2Commerce -> Apps -> Image Popup Gallery**.
2. Confirm **Enable in Category/Tag Lists** is **Yes**.
3. Switch **Enable Multi-Image in List View** to **Yes** and **Save**.

### The popup photo looks the same size as the small photo on the page

**Cause:** The full-size original photo isn't available on the server for that product, so the app safely showed the same copy that was already on the page rather than risk a broken image.

**Solution:**

1. Check the product's uploaded images in **J2Commerce -> Catalog -> Products** and confirm the original file is present, not just a resized copy.
2. Re-upload the product photo at full resolution if the original is missing.

### The gallery stops working after picking a different size or color

**Cause:** This is uncommon — if it happens, it's usually a conflict with another app that also changes how product photos are swapped when a variant is selected.

**Solution:**

1. Confirm no other imagery-related app is also enabled and touching the same product gallery.
2. Clear the Joomla cache and try again.
3. If the problem continues, temporarily disable other apps under **J2Commerce -> Apps** one at a time to identify a conflict.

## Related Topics

- [Managing Products](../../catalog/managing-products.md)
- [Design](../../design/index.md)
