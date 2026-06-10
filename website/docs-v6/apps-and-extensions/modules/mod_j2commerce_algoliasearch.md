---
title: "Algolia Search Module"
sidebar_label: "Algolia Search"
sidebar_position: 10
description: "Add Algolia-powered instant search to your J2Commerce storefront — header autocomplete dropdown with thumbnails and prices, a full results page with facets, sorting and pagination, and optional Recommend widgets."
---

# Algolia Search Module

The J2Commerce Algolia Search module connects your storefront to [Algolia](https://www.algolia.com), a hosted search platform. It renders a **live autocomplete dropdown** in your header (products, categories, query suggestions, recent searches) and, optionally, a **full InstantSearch results page** with faceted filtering, price-range sliders, sort options, and pagination — all without a page reload.

The module works alongside the companion **J2Commerce App Algolia plugin** (`plg_j2commerce_app_algolia`), which handles indexing and holds your Admin API key. The module itself uses only a **search-only key** that is safe to emit to the browser.

## Installation

This module is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `mod_j2commerce_algoliasearch.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `mod_j2commerce_algoliasearch.zip` package file.
4. The module installs automatically.

To create a module instance:

1. Go to **Content** -> **Site Modules**.
2. Click **New** in the toolbar.
3. Select **J2Commerce Algolia Search** from the module type list.
4. Configure the settings described below.
5. Assign the module to a template position (e.g. `header` or `search`) and select the menu pages where it should appear.
6. Click **Save**.

:::tip Companion plugin required

You also need the **J2Commerce App Algolia** app plugin installed and configured with your Algolia Admin API key to index your products. The module reads the index names you define there — keep them in sync.

:::

## Prerequisites

- J2Commerce 6 installed and at least one published product in the catalog.
- An [Algolia account](https://www.algolia.com) with an application created.
- The companion **J2Commerce App Algolia** plugin configured and a full product index completed.
- Your Algolia **Application ID** and **Search-Only API key** (the key with `search` ACL only — never the Admin key).

---

## Configuration

### Connection tab

These settings connect the module to your Algolia application.

| Field | Description |
|-------|-------------|
| **Algolia Application ID** | Found in your Algolia dashboard under **Settings** -> **API Keys**. Safe to expose in browser JS. |
| **Search-Only API Key** | The key with `search` ACL only. Safe to expose in browser JS. Never paste your Admin key here. |
| **Products Index Name** | The name of your Algolia products index — must match what the companion app plugin creates (default: `j2c_products`). |
| **Categories Index Name** | Your categories index name (default: `j2c_categories`). |
| **Query Suggestions Index Name** | Your Query Suggestions index name (default: `j2c_products_query_suggestions`). Leave empty to disable query suggestions. |

:::warning Admin key security

The **Admin API key** must never appear in the module settings. The module only accepts a search-only key. A reviewer will flag any path where the Admin key reaches the browser as a critical security issue.

:::

---

### Search Behavior tab

| Field | Default | Description |
|-------|---------|-------------|
| **Display Mode** | Header Autocomplete Dropdown | Choose **Header Autocomplete Dropdown** for the live search box, **Full Results Page** for the InstantSearch page, or **Both** to render both in the same module instance. |
| **Framework** | Auto Detect | CSS framework for the module markup. Auto detects from active J2Commerce app plugins (Bootstrap 5 or UIkit). Override if the auto-detection produces incorrect results. |
| **Search Box Placeholder** | *(empty)* | Text shown in the search input when empty. Leave blank to use the default "Search products…" string. |
| **Minimum Characters** | 2 | Minimum characters typed before a search is triggered. Increasing this reduces your Algolia search quota usage. |
| **Debounce (ms)** | 200 | Milliseconds to wait after the last keystroke before firing a search. Higher values reduce API calls. |
| **Products in Dropdown** | 6 | Number of product hits shown in the autocomplete dropdown. |
| **Categories in Dropdown** | 4 | Number of category hits shown in the autocomplete dropdown. |
| **Suggestions in Dropdown** | 5 | Number of query suggestions shown in the autocomplete dropdown. |
| **Show Product Thumbnails** | Yes | Show product images next to each product result in the dropdown. |
| **Show Product Price** | Yes | Show the product price alongside each product result in the dropdown. |
| **Show Recent Searches** | Yes | Show a "Recent Searches" section in the dropdown when the search box is focused but empty. Stored in the user's browser (localStorage). |
| **Show Trending Searches** | No | Show trending/popular searches. Requires a trending searches source configured in your Algolia application. |
| **Show Voice Search Button** | No | Show a microphone button to trigger voice-based search. |
| **Mobile Full-Screen Dropdown** | Yes | On mobile devices (screen width ≤ 680 px), the autocomplete dropdown expands to fill the screen for easier use. |
| **Results Page Menu Item** | *(none)* | The Joomla menu item where the full InstantSearch results page lives. Used to generate the **See all results for "[query]"** link at the bottom of the autocomplete dropdown. |

---

### Results Page tab

These settings apply when **Display Mode** is set to **Full Results Page** or **Both**.

| Field | Default | Description |
|-------|---------|-------------|
| **Facets to Display** | Category, Brand, Price, In Stock | Multi-select list of facets shown in the sidebar. Options: Category, Brand, Colour, Size, Price, Rating, In Stock, On Sale. The order you select them is the display order in the sidebar. |
| **Products Per Page** | 24 | Number of product cards shown per page on the results page. |
| **Pagination Mode** | Numbered Pagination | Choose **Numbered Pagination** for standard page numbers, or **Infinite Scroll / Show More** for a "Show more" button that loads additional results inline. |
| **Price Asc Replica Index** | `j2c_products_price_asc` | Algolia replica index name for sorting by price low to high. Must match a replica configured in the App Algolia plugin. |
| **Price Desc Replica Index** | `j2c_products_price_desc` | Algolia replica index name for sorting by price high to low. |
| **Newest Replica Index** | `j2c_products_newest` | Algolia replica index name for sorting by newest first. |

#### Results page layout

The results page is built from the following areas:

- **Search box** — Re-query without leaving the page.
- **Stats bar** — "N results found in X ms" message.
- **Sort By** — Dropdown to switch between relevance, price ascending/descending, and newest.
- **Sidebar** — Facet filters (category hierarchy, brand list, colour, size, price range slider, star rating, In Stock toggle, On Sale toggle). Only facets you have selected in the **Facets to Display** param are shown.
- **Current Refinements** — Chips showing active filters, each removable individually.
- **Clear All Filters** — Button to remove all active refinements at once.
- **Product grid** — Responsive card grid (4 columns on desktop, 2 on tablet, 1 on mobile) with product image, highlighted name, and price.
- **Pagination** — Numbered page links or an infinite scroll "Show more" button.

---

### Discover tab

| Field | Default | Description |
|-------|---------|-------------|
| **Enable Recommend** | No | Show Algolia Recommend widgets (related products or frequently bought together carousel). Requires a trained Recommend model in your Algolia dashboard. The widget is hidden automatically if the model has not yet been trained or returns no recommendations. |
| **Recommend Model** | Related Products | Choose **Related Products** or **Frequently Bought Together**. The Recommend widget reads the current product ID from `data-j2c-product-id` on the page `body` element — set this attribute in your template when displaying a product detail page. |
| **Enable Insights** | No | Send click and conversion events to Algolia Insights for analytics, A/B testing, and personalisation. Only enable after obtaining user consent where required by applicable law (e.g. GDPR). |

---

### Assets tab

| Field | Default | Description |
|-------|---------|-------------|
| **Asset Source** | jsDelivr CDN (recommended) | Load Algolia libraries from the jsDelivr CDN, or from local vendor copies you have placed under `media/mod_j2commerce_algoliasearch/js/site/vendor/`. Use **Local Vendor Copies** if your site operates without an internet connection or if you need to control exact asset versions in a stricter CSP environment. |
| **InstantSearch.js Version** | `4.80.0` | jsDelivr CDN version pin for InstantSearch.js. Only used when Asset Source is jsDelivr CDN. |
| **Autocomplete.js Version** | `1.18.1` | jsDelivr CDN version pin for Autocomplete.js (and its plugins). Only used when Asset Source is jsDelivr CDN. |

---

## Autocomplete Dropdown Sections

When a visitor focuses the search box, the dropdown shows (in order):

1. **Recent Searches** — up to 5 previous queries stored in the visitor's browser (shown only on empty query, when **Show Recent Searches** is enabled).
2. **Suggestions** — query completions from your Query Suggestions index (shown as the visitor types, when configured).
3. **Products** — up to N product hits with optional thumbnail image, highlighted name, and price.
4. **Categories** — up to N category hits linking directly to the category page.
5. **Footer link** — "See all results for [query] →" linking to the Results Page menu item (when configured).

On mobile (screen width ≤ 680 px with **Mobile Full-Screen Dropdown** enabled), the same content is presented in a full-screen overlay for easier interaction.

---

## Results Page Setup

To use the full InstantSearch results page:

1. Create a Joomla menu item of any type (e.g. **J2Commerce** -> **Products** or a custom URL pointing to the module position).
2. Place the module at a position on that page with **Display Mode** set to **Full Results Page** or **Both**.
3. Set **Results Page Menu Item** in the module's Search Behavior settings to that menu item. This enables the "See all results" link in the autocomplete dropdown.
4. Ensure your Algolia index has the facets you want to filter on configured as `attributesForFaceting` in your Algolia dashboard (the App Algolia plugin pushes these settings when you click **Push Settings**).

---

## Asset Loading

The module loads the following external libraries when **Asset Source** is set to jsDelivr CDN:

| Library | Version | Purpose |
|---------|---------|---------|
| `algoliasearch` (lite) | 5.x | Algolia search client — handles HTTP, retries, and routing automatically |
| `instantsearch.js` | 4.80.0 | Results page widgets |
| `@algolia/autocomplete-js` | 1.18.1 | Header dropdown |
| `@algolia/autocomplete-plugin-recent-searches` | 1.18.1 | Recent searches section |
| `@algolia/autocomplete-plugin-query-suggestions` | 1.18.1 | Query suggestions section |
| `search-insights` | 2.17.3 | Click and conversion events (only loaded when Insights is enabled) |

All scripts are loaded with `defer` and do not block page rendering.

---

## Tips

- Keep your index names consistent between the App Algolia plugin and the module. A mismatch silently returns zero results.
- Set **Minimum Characters** to 3 if your store has many short product names to reduce unnecessary API calls and Algolia quota usage.
- The **Facets to Display** order controls the sidebar display order on the results page — put the most commonly used filters (Category, Brand) at the top.
- If you have a small catalog (under 1,000 products), the replica indices for price/newest sorting can be virtual replicas in Algolia to save index record quota.
- Place the module in a `header` position for the autocomplete dropdown and in a dedicated page position for the results page. Using the **Both** mode in a single position is possible but only recommended when the module is the primary content of a search page.

---

## Troubleshooting

### The dropdown shows no results

**Cause:** Credentials are incorrect, the index name does not match, or the index is empty.

**Solution:**
1. Check that **Algolia Application ID** and **Search-Only API Key** are correct. Open your Algolia dashboard under **Settings** -> **API Keys** to verify.
2. Check that **Products Index Name** matches the index name in your Algolia dashboard and in the App Algolia plugin settings.
3. Go to your Algolia dashboard -> **Search** and search for a product manually. If no results appear there, run a full reindex from the App Algolia plugin admin panel.

### The dropdown appears but shows no thumbnails

**Cause:** The `image` attribute is not indexed, or product images are relative URLs.

**Solution:** Run a full reindex from the App Algolia plugin. Check that the `image` field in your Algolia index records contains an absolute URL (starting with `https://`).

### The Results Page shows no facets in the sidebar

**Cause:** The attributes have not been configured as `attributesForFaceting` in Algolia.

**Solution:** In the App Algolia plugin admin, click **Push Settings** to apply the recommended facet configuration to your Algolia index.

### The "See all results" link does not appear

**Cause:** The **Results Page Menu Item** parameter has not been set.

**Solution:** In the module's Search Behavior tab, set **Results Page Menu Item** to the Joomla menu item where your InstantSearch results page is assigned.

### Recommend widget is not showing

**Cause:** The Recommend model has not yet been trained, or the current page does not expose a product ID.

**Solution:**
1. Verify that the Recommend model has been trained in your Algolia dashboard (it requires sufficient click data — typically a few hundred clicks — before generating recommendations).
2. Ensure your product detail page template sets `data-j2c-product-id="[product_id]"` on the `body` tag. The Recommend widget reads this attribute to know which product to base recommendations on.

---

## Related Topics

- [J2Commerce Products Module](./mod_j2commerce_products.md)
- [App Algolia Plugin](#) *(documentation coming soon)*
- [Smart Search (Finder) Integration](../plugins/plg_finder_j2commerce.md)
