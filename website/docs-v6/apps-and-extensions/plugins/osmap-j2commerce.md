---
title: "OSMap - J2Commerce"
sidebar_label: "OSMap"
sidebar_position: 30
description: "Connect J2Commerce to the OSMap sitemap component so every product page appears once in your XML and HTML sitemaps for search engines and visitors."
---

The OSMap - J2Commerce plugin connects your store to the Joomlashack OSMap sitemap component. Once installed, OSMap automatically discovers and lists every one of your J2Commerce product pages in both your XML sitemap (for search engines) and your HTML sitemap (for visitors). Each product appears exactly once — as its proper shop URL — so search engines never see the same product duplicated between your store and a plain Joomla article.

:::info

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

:::

## Prerequisites

Before installing, confirm the following are in place:

- **J2Commerce 6** installed and active
- **OSMap** by Joomlashack installed and active. This plugin is an extension for OSMap — it will not function without it. OSMap is available from [joomlashack.com](https://www.joomlashack.com).
- At least one J2Commerce product published, with a J2Commerce **Products**, **Category**, or **Product Tags** menu item created so OSMap has something to expand

## Installation

1. Purchase and download the `plg_osmap_j2commerce.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `plg_osmap_j2commerce.zip` file.
4. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extensions Install screen immediately after uploading the package, showing the green "Installation of the plugin was successful" message -->

## Enable the Plugin

After installation, confirm the plugin is enabled:

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **OSMap - J2Commerce**.
3. Verify the plugin shows a green checkmark. If not, click the status icon to enable it.

<!-- SCREENSHOT: Plugin Manager filtered to "OSMap - J2Commerce" showing the enabled green checkmark -->

## Configure the Plugin

Open the plugin settings by clicking its name in the plugin list.

<!-- SCREENSHOT: Plugin Manager entry for "OSMap - J2Commerce" with the name link highlighted -->

The plugin has three settings on the **Basic** tab:

### Settings Reference

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Product Priority** | The sitemap priority value assigned to product pages. A value of `0.5` is a neutral middle priority. Choose **Use Parent Menu Settings** to inherit the priority from the OSMap menu item instead. | `0.5` | `0.0` to `1.0`, or **Use Parent Menu Settings** |
| **Product Change Frequency** | How often search engines are told your product pages change. Most stores update products less than daily, so **Weekly** is a safe default. | `weekly` | Always, Hourly, Daily, Weekly, Monthly, Yearly, Never, **Use Parent Menu Settings** |
| **Show Restricted Products** | When set to **No** (the default), products that require login or a membership to view are hidden from the public sitemap. Set to **Yes** only if you intentionally want restricted products to appear in sitemaps shown to all visitors. | No | Yes / No |

:::tip

Leave **Show Restricted Products** set to **No**. Exposing members-only product URLs in a public XML sitemap can confuse search engines and reveal product names that should stay private.

:::

After adjusting settings, click **Save & Close**.

<!-- SCREENSHOT: OSMap - J2Commerce plugin settings screen with the Basic tab visible showing the three fields -->

## How Products Get Added to the Sitemap

OSMap builds sitemaps from menus. In your OSMap sitemap configuration (**Components** -> **OSMap** -> **Sitemaps** -> open your sitemap), you select which Joomla menus to include.

<!-- SCREENSHOT: OSMap sitemap edit screen showing the menu selection list -->

When OSMap processes a menu that contains a J2Commerce menu item, this plugin steps in and expands it. The types of J2Commerce menu items the plugin recognises and expands are:

- **Products** — a product category list (one or more categories)
- **Category** — a single product category
- **Product Tags** — a product tag listing

For each of those menu items, the plugin queries your product catalogue and adds a sitemap entry for every matching product. Each entry uses the J2Commerce product page URL (for example, `/shop/clothing/blue-t-shirt`) rather than the plain Joomla article URL.

### What the Plugin Checks Before Listing a Product

A product appears in the sitemap only when all of the following are true:

- The J2Commerce product is **enabled** (not disabled in the product settings)
- The product's **Visibility** is set to show publicly
- The underlying Joomla article is **published**
- The article is within its **publish up / publish down** date window (if one is set)
- The article and its category are accessible to the **Public** access level (unless **Show Restricted Products** is set to **Yes**)

Subcategories are included automatically, up to the number of levels configured on the menu item (the default is 3 levels deep).

### Why Each Product Appears Only Once

J2Commerce products are backed by Joomla articles — every product has an article behind it. Without special handling, OSMap would list each product twice: once from this plugin (shop URL) and once from the standard Joomla content plugin (article URL). This plugin prevents that duplication by tagging each product entry with the same internal identifier that the Joomla content plugin uses. OSMap's built-in de-duplication logic then keeps only the first entry it encounters and discards the second.

## Best Practices

### Order Your Menus So the Shop URL Wins

OSMap's de-duplication keeps the **first** URL it finds for each product and discards later duplicates. To make sure your product shop URL (not the plain article URL) is what ends up in the sitemap, you need the J2Commerce menu to be processed **before** any com_content / Articles menu.

In your OSMap sitemap configuration, drag the J2Commerce menu to the top of the menu list — above any content or article menu that covers the same products.

<!-- SCREENSHOT: OSMap sitemap menu list with a J2Commerce menu item dragged above an Articles menu, showing the drag handle -->

If a content menu is processed first, the article URL is kept instead of the product URL. The sitemap still has no duplicates, but it will link visitors and search engines to the article page rather than the shop page.

### Rebuild the Sitemap After Changes

OSMap generates sitemaps on request. If you add new products or change your menu structure, open your sitemap in **Components** -> **OSMap** -> **Sitemaps** and click **Refresh** to regenerate it with the latest product list.

<!-- SCREENSHOT: OSMap Sitemaps list screen with the Refresh button highlighted in the toolbar -->

## Troubleshooting

### Products Are Missing from the Sitemap

**Cause:** The product does not pass one of the visibility checks, or the menu item type is not supported.

**Solution:**

1. Confirm the product is **enabled** in J2Commerce (**J2Commerce** -> **Catalog** -> **Products** — green icon).
2. Confirm the product's Joomla article is **published** (**Content** -> **Articles**).
3. Check the article's **Publishing** tab — if a **Finish Publishing** date is set and has passed, the article is hidden from the sitemap.
4. Check the article and its category **Access** level — both must be set to **Public** unless you have turned on **Show Restricted Products**.
5. Confirm your OSMap sitemap includes a menu that contains a **Products**, **Category**, or **Product Tags** J2Commerce menu item. A menu item of type **Single Product** is added directly to the sitemap but is not expanded into a list.

### Products Link to the Article Page Instead of the Shop Page

**Cause:** A content/article menu was processed before the J2Commerce menu, so OSMap kept the article URL.

**Solution:**

1. Go to **Components** -> **OSMap** -> **Sitemaps** and open your sitemap.
2. In the menu list, drag the J2Commerce menu **above** any Articles or content menus.
3. Save the sitemap and click **Refresh** to regenerate it.

### No J2Commerce Products Appear at All

**Cause:** The plugin may be disabled, OSMap may not be installed, or your J2Commerce menus may not be selected in the sitemap.

**Solution:**

1. Go to **System** -> **Manage** -> **Plugins** and confirm **OSMap - J2Commerce** is enabled.
2. Confirm **OSMap** is installed and its component is enabled (**Components** -> **OSMap**).
3. Open your sitemap (**Components** -> **OSMap** -> **Sitemaps**) and verify that at least one menu containing a J2Commerce menu item is selected.
4. Regenerate the sitemap with **Refresh** and check the output again.

## What's New Compared to the J2Store OSMap Plugin

If you previously used the J2Store OSMap plugin (`plg_osmap_com_j2store`), here is what has changed:

| Feature | Old J2Store Plugin | J2Commerce Plugin |
|---------|-------------------|-------------------|
| Product URLs | Legacy J2Store URL format | J2Commerce 6 SEF URLs (e.g., `/shop/category/product-alias`) |
| Duplicate article prevention | Not implemented | Built-in — each product entry claims the article's identity so OSMap de-duplicates automatically |
| Access level filtering | Not applied | Respects article and category access levels — restricted products stay out of public sitemaps |
| Publish window filtering | Not applied | Respects publish up / publish down dates on articles |
| Subcategory support | Flat list only | Includes subcategories up to the menu's configured depth |
| Product tag support | Not supported | Product Tags (`producttags`) menu items are fully supported |
| SQL safety | Direct string concatenation | Parameterised queries throughout |
