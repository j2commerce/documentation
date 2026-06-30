---
title: "Findbar"
sidebar_label: "Findbar"
sidebar_position: 15
description: "Add a live, type-ahead search box to your storefront header and see exactly what your shoppers are searching for with the Findbar search and analytics add-on."
---

# Findbar

Findbar gives your store a fast, modern search experience and shows you what your customers are actually looking for. It comes in two parts that work together:

- **Findbar Complete Search** (a module) — a live search box for your site header. Results appear instantly as the shopper types, drawn from your products, articles, categories, and any other indexed content.
- **Findbar Insights** (a plugin) — records every search and turns it into easy-to-read analytics cards, plus it adds a full **Search Results** page so shoppers can browse everything that matched their search.

Together they help shoppers **find more**, so you **sell more** — and they reveal the searches that came up empty so you know exactly which products or synonyms to add.

## Requirements

- PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- **Joomla Smart Search** (also called Finder) — Findbar searches the Smart Search index, so this built-in Joomla feature must be enabled and your content indexed (covered in the steps below).

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate **Findbar** **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install Findbar

Findbar is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

You can install Findbar using the standard Joomla installer:

1. In the Joomla admin, go to **System -> Install -> Extensions**.
2. Upload the ZIP file you downloaded, or use the **Install from URL** option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

The download installs both pieces in one step — the **Findbar Complete Search** module and the **Findbar Insights** plugin.

## Enable the Insights Plugin

Once installed, you need to turn on the **Findbar Insights** plugin. There are **two** ways to reach it:

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing Findbar Insights -->

Look for **Findbar Insights**, click the **X**, and it will turn into a green checkmark. The plugin is now enabled.

## Add the Search Box to Your Site

The search box itself is a Joomla module, so you publish it like any other module.

1. Go to **Content -> Site Modules -> New**.
2. Choose **Findbar Complete Search** from the list of module types.
3. Give it a **Title** (or hide the title if you only want the search box).
4. Set the **Position** to a spot in your template — usually a header or search position.
5. On the **Menu Assignment** tab, choose **On all pages** (or pick specific pages).
6. Click **Save**.

<!-- SCREENSHOT: Findbar Complete Search module — position and menu assignment -->

The search box now appears on your storefront in the position you chose.

## Build the Search Index

Findbar shows results from Joomla **Smart Search**. If the index is empty, searches return nothing — so build it once after install:

1. Go to **Components -> Smart Search**.
2. Click **Index** (or **Index All**) in the toolbar to index your existing content.

<!-- SCREENSHOT: Smart Search index button -->

:::tip

After the first build, Smart Search keeps itself up to date as you add or edit products. You only need to rebuild manually if you change which content types are indexed.

:::

## Configure the Search Box

Open the **Findbar Complete Search** module (**Content -> Site Modules -> Findbar Complete Search**). Its settings are grouped into three tabs.

:::tip

Hover over any setting's label to read a short description of what it does.

:::

### Basic tab

These settings control how the search behaves and how results are presented.

| Setting | Description | Default |
|---------|-------------|---------|
| **Result Layout** | The visual style of the result list: **Simple List**, **Card Grid**, **Two-Column with Type Rail**, or **Compact Suggestions**. | `Simple List` |
| **Display Mode** | Where results appear: **Dropdown** (under the box), **Modal** (a popup), **Top Offcanvas** (a slide-down launcher), or **Redirect to Search Page** (sends shoppers straight to the full results page). | `Dropdown` |
| **Content Types** | Limit the search to specific types (for example, products only). Leave empty to search everything in the index. | `All` |
| **Product Search Fields** | Which product fields are given the most weight in ranking — **Title**, **SKU**, **UPC / Barcode**, **Description**. | Title |
| **Minimum Characters** | How many characters a shopper types before the search runs. | `3` |
| **Debounce (ms)** | The short pause after typing before results load. Higher values reduce server load. | `250` |
| **Maximum Results** | The most results to show per search. | `8` |
| **Paginate Results** | Show results one page at a time with **Previous / Next** controls inside the panel. | `Yes` |
| **Results Per Page** | How many results per page when pagination is on. | `5` |
| **Results Navigation** | How shoppers reach the full list: **Ajax (Inline Pager)** pages inside the panel, or **View All Results** shows a direct link to the search results page. | `Ajax` |
| **Word Match** | How the search term matches text: **Exact**, **Begins With**, or **Contains**. | `Begins With` |
| **Placeholder Text** | The greyed-out hint inside the empty search box. Leave blank to use the default. | `Search…` |

### Display tab

These settings control what each result shows.

| Setting | Description | Default |
|---------|-------------|---------|
| **Framework** | The CSS framework template to match your site theme. **Auto** inherits it from the active menu item. | `Auto` |
| **Show Type Badge** | Show a small label telling shoppers whether a result is a product, article, category, and so on. | `Yes` |
| **Show Image** | Show a thumbnail next to each result. | `Yes` |
| **Crop Images** | Crop thumbnails to a consistent shape. | `Yes` |
| **Image Width (px)** | The width of the result thumbnail in pixels. | `64` |
| **Aspect Ratio** | The thumbnail shape, such as `1:1` or `16:9`. | `1:1` |
| **Show Price** | Show the price on product results only. | `No` |
| **Show Availability** | Show **In Stock** / **Out of Stock** on product results only. | `No` |
| **Show Description** | Show a short snippet of each result's description. | `No` |
| **Description Length** | The maximum number of characters in the description snippet. | `120` |
| **Show Date** | Show the result's date. | `No` |
| **Show URL** | Show the result's web address. | `No` |
| **Highlight Matched Terms** | Visually highlight the words the shopper searched for. | `Yes` |
| **Open Results in New Tab** | Open a clicked result in a new browser tab. | `No` |

### Behavior tab

These settings fine-tune ordering and the popup/launcher button.

| Setting | Description | Default |
|---------|-------------|---------|
| **Sort Order** | How results are ordered: **Relevance**, **Date**, **Title**, or **Price**. | `Relevance` |
| **Sort Direction** | **Ascending** or **Descending**. | `Descending` |
| **Show Autosuggest** | Add a query-suggestions block to the two-column layout. | `No` |
| **Empty Search Content** | Optional content (for example, popular links) shown when a shopper clicks the empty box. | empty |
| **Modal Trigger Label** | The text on the button that opens the popup. Used with **Modal** and **Top Offcanvas** display modes. | `Search` |
| **Modal Trigger Icon Class** | The Font Awesome icon for the popup button, for example `fa-solid fa-magnifying-glass`. | `fa-solid fa-magnifying-glass` |

Click **Save** when you are done.

## Set Up the Search Results Page

When a shopper clicks **View all results** — or when you use the **Redirect to Search Page** display mode — they need somewhere to land. The **Findbar Insights** plugin adds a dedicated **Search Results** page for exactly this.

The easiest way to create it is the one-click prompt on your J2Commerce dashboard:

1. Go to **J2Commerce -> Dashboard**.
2. If no search results page exists yet, you will see a notice. Click **Create Search Results menu item**.

<!-- SCREENSHOT: J2Commerce dashboard notice with Create Search Results menu item button -->

That's it — the page is created and published automatically.

:::info

NOTE: Prefer to do it by hand? Go to **Menus -> [your J2Commerce menu] -> New**, choose the **J2Commerce -> Search Results** menu item type, and save it as a published item.

:::

## View Search Analytics

Once shoppers start searching, the **Findbar Insights** plugin records every query and presents it as analytics in your admin.

Go to **J2Commerce -> Analytics** and choose a date range. Findbar adds these cards:

| Card | What it tells you |
|------|-------------------|
| **Total Searches** | The number of searches in the period, with the percentage change versus the previous period. |
| **Zero-Result Searches** | Searches that returned nothing — your most important signal for missing products. |
| **Avg Results Per Search** | The average number of results shoppers see per search. |
| **Top Search Terms** | The 10 most popular searches that returned results. |
| **Top Zero-Result Terms** | The 10 most popular searches that returned nothing — an exact to-do list of products or synonyms to add. |
| **Search Volume Over Time** | A daily line chart of search activity across the selected range. |

You can turn any card on or off in the plugin settings (**J2Commerce -> Apps -> Findbar Insights**).

<!-- SCREENSHOT: J2Commerce Analytics view with Findbar search cards -->

## How It Works

1. A shopper starts typing in the Findbar search box on your storefront.
2. After the minimum number of characters, Findbar searches the Joomla Smart Search index and shows matching results in the chosen layout and display mode.
3. The shopper can click a result to go straight to it, or click **View all results** to open the full **Search Results** page.
4. Behind the scenes, **Findbar Insights** records the search term and how many results it returned.
5. In your admin, the **Analytics** view turns those records into the cards and chart above.

## Tips

- **Lead with zero-result terms.** The **Top Zero-Result Terms** card is the fastest way to grow sales — each term is a product or synonym a customer wanted but couldn't find.
- **Keep the box on every page.** Assign the module to **all pages** so shoppers can search from anywhere.
- **Match your theme.** Leave **Framework** on **Auto** unless you specifically need Bootstrap 5 or UIkit styling.
- **Tune the minimum characters.** Raising **Minimum Characters** to 3 or more avoids noisy results on very short terms.
- **Show prices for shoppable results.** Turn on **Show Price** and **Show Availability** so product results read like a mini storefront.

## Troubleshooting

### The Search Box Does Not Appear

**Cause:** The module is unpublished, has no position, or isn't assigned to the current page.

**Solution:**

1. Go to **Content -> Site Modules** and confirm **Findbar Complete Search** shows a green published checkmark.
2. Open the module and check that **Position** is set to a real position in your template.
3. On the **Menu Assignment** tab, confirm the page you are viewing is included.

### Searches Return No Results

**Cause:** The Smart Search index is empty, or the relevant Finder plugins are disabled.

**Solution:**

1. Go to **Components -> Smart Search** and click **Index** to build the index.
2. Go to **System -> Manage -> Plugins**, search for **Smart Search**, and make sure the content-type plugins you need (for example **Smart Search - J2Commerce Products**) are enabled.
3. Run the index again after enabling any plugin.

### "View All Results" Goes Nowhere

**Cause:** No published **Search Results** page exists.

**Solution:**

1. Go to **J2Commerce -> Dashboard**.
2. Click **Create Search Results menu item** in the notice, or create the page manually under **Menus**.
3. Confirm the menu item is **published**.

### Analytics Cards Are Empty

**Cause:** No searches have been recorded yet, or the date range has no activity.

**Solution:**

1. Make sure the **Findbar Insights** plugin shows a green checkmark in **J2Commerce -> Apps**.
2. Run a few test searches on the storefront.
3. In **J2Commerce -> Analytics**, widen the date range to include those searches.

### A Card Is Missing From Analytics

**Cause:** That card is switched off in the plugin settings.

**Solution:**

1. Go to **J2Commerce -> Apps -> Findbar Insights**.
2. Set the matching card (for example **Top Search Terms**) to **Yes**.
3. Save and reopen the **Analytics** view.

### Results Look Unstyled or Mismatched

**Cause:** The wrong CSS framework template is selected for your theme.

**Solution:**

1. Open the **Findbar Complete Search** module and go to the **Display** tab.
2. Set **Framework** back to **Auto**, or pick the framework your template uses.
3. Save and refresh the storefront.
