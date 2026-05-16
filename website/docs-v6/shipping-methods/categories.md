---
title: "Category Based Shipping"
sidebar_label: "Category Based Shipping"
sidebar_position: 20
description: "Charge shipping based on which Joomla article categories your products belong to. Set a flat rate per category, restrict rates by geozone, or bill per item in a category."
---

# Category Based Shipping

Category Based Shipping charges customers based on which Joomla article categories their products belong to. You pick a category, set a price, optionally restrict it to a geozone, and optionally bill per item instead of per category. If a cart contains products from multiple configured categories, the matching rates are added together automatically.

Use this plugin when:

- You want different shipping rates for different product types (e.g., books vs. fragile goods vs. oversized items).
- You already organize products into Joomla content categories and want to base shipping on that structure.
- You need geozone-specific rates for the same category (e.g., domestic vs. international flat rates).

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `shipping_categories.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `shipping_categories.zip` package file.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen with shipping_categories.zip selected -->

The plugin installs and is ready to enable.

## Enable the Plugin

1. Go to **System** -> **Manage** -> **Extensions**.
2. Search for **shipping_categories**.
3. Click the toggle in the **Status** column to enable it.

Alternatively, navigate to **J2Commerce** -> **Setup** -> **Shipping Methods** and toggle the row from there.

<!-- SCREENSHOT: Shipping Methods list showing Category Based Shipping with the status toggle highlighted -->

## Configure — Basic Tab

Click the plugin name to open its configuration. The **Basic** tab holds the general settings.

| Field | What It Does | Recommended Value |
|-------|-------------|-------------------|
| **Shipping Method Label** | The name shown to customers at checkout when this method is available. | Something descriptive, e.g., "Standard Shipping" or "Category Shipping" |
| **Display Image** | An optional image shown beside the method name at checkout (a logo or icon). | Leave blank, or upload a small PNG or WebP icon. |
| **Tax Class** | The J2Commerce tax profile applied to the calculated shipping cost. Leave empty if shipping should not be taxed. | Set only if your jurisdiction taxes shipping. |
| **Handling Cost** | A fixed surcharge added to every rate this plugin returns. Use it for packaging, fuel, or fulfillment costs. | `0` unless you have a per-order surcharge to add. |
| **Subtemplate** | Controls which frontend template renders this shipping option at checkout. Leave blank to follow the store default (Bootstrap 5 or UIkit). | Leave blank. |
| **Debug Mode** | Writes rate-calculation details to `administrator/logs/shipping_categories.php`. Disable in production. | Off. Turn on only while troubleshooting. |

Click **Save** after filling in the Basic tab.

## Configure — Rates Tab

The **Rates** tab contains the rate table. Each row defines one rule — a combination of categories, an optional geozone, a calculation method, and a price.

<!-- SCREENSHOT: Rates tab showing the rate table with column headers: Category List, Geozone, Calculation, Price -->

### Rate Table Columns

**Category List**

A multi-select field showing all your Joomla article categories. Select one or more categories that this row covers. When the cart contains a product from any of the selected categories, this row is a match.

**Geozone**

Controls which customers see this rate.

- **All Geozones** — the rate applies to every customer regardless of their shipping address.
- **[A specific geozone]** — the rate applies only when the customer's country and state/province fall within that J2Commerce geozone. You configure geozones at **J2Commerce** -> **Setup** -> **Geozones**.

**Calculation**

- **Per Category** — one flat charge regardless of how many items from that category are in the cart. If a row matches, its price is added to the total once.
- **Per Item in Category** — the price is multiplied by the total number of items in matching categories. Useful for heavy or bulky goods where shipping scales with quantity.

**Price**

The shipping amount in your store's currency, before tax and handling. This is the base rate for this row.

### Adding and Removing Rows

Click **Add New Row** at the bottom of the table to add a rule. Click the trash icon on any row to remove it.

### Multiple Rate Rows

When more than one row matches a customer's cart, the charges are added together. For example, if the cart has products in both a "Books" category (one row, $3) and a "Fragile" category (another row, $7), the plugin returns $10. This lets you model complex rate structures without needing a single catch-all rule.

## Worked Examples

### Example 1: Flat Rate Per Category

You sell books. Any order containing at least one book should cost $5 to ship.

| Category List | Geozone | Calculation | Price |
|---------------|---------|-------------|-------|
| Books | All Geozones | Per Category | 5.00 |

A customer ordering 3 books pays $5. Ordering 10 books also pays $5. If a handling cost of $1 is set, they pay $6 total.

### Example 2: Geozone-Restricted Rates

The same Books category, but you charge more for international orders.

| Category List | Geozone | Calculation | Price |
|---------------|---------|-------------|-------|
| Books | Domestic | Per Category | 5.00 |
| Books | International | Per Category | 12.00 |

A customer whose address falls in the Domestic geozone sees $5. A customer outside it, in the International geozone, sees $12. Only one row matches per geozone.

### Example 3: Per-Item Rate for Heavy Goods

You sell large plant pots. Shipping costs $2 per item because each one requires individual packing.

| Category List | Geozone | Calculation | Price |
|---------------|---------|-------------|-------|
| Plant Pots | All Geozones | Per Item in Category | 2.00 |

A customer ordering 5 pots pays $10. Ordering 1 pot pays $2.

## How Tax and Handling Apply

The plugin calculates tax on the combined total of the rate and the handling cost (rate + handling cost = taxable base). The **Tax Class** field selects which J2Commerce tax profile percentage is applied. If no tax class is selected, no shipping tax is charged. The full amount (rate + handling + tax) is shown to the customer at checkout.

## Troubleshooting

| Symptom | Likely Cause and Fix |
|---------|----------------------|
| No shipping rate appears at checkout | The cart may contain no products from any configured category, or the customer's address does not match any geozone you have restricted a row to. Check that the products belong to the Joomla categories listed in your rate rows, and verify that geozone-restricted rows have a matching geozone rule for the customer's country. |
| Rate appears for the wrong region | Two geozone rows overlap. Go to **J2Commerce** -> **Setup** -> **Geozones** and review the country and zone rules for each geozone to ensure they do not share the same country/zone pair. |
| "Add New Row" button does nothing | The JavaScript asset is missing or failed to load. Try re-installing the plugin via **System** -> **Install** -> **Extensions**. Also check the browser console for a 404 error on `media/plg_j2commerce_shipping_categories/js/admin/shipping_categories.js`. |
| Rate does not update after editing | The admin session may be holding a cached cart. Clear the Joomla cache at **System** -> **Maintenance** -> **Clear Cache** and reload the checkout. |

## What's New in J2Commerce

This plugin is a full rewrite of the J2Store 4.2.4 Category Based Shipping plugin. Key improvements:

- **Native Joomla 6 MVC** — rebuilt on the Joomla 6 plugin architecture; no legacy FOF framework dependency.
- **Single batched database query** — product categories are resolved in one JOIN query instead of a separate database call per product (N+1 eliminated).
- **Vanilla JavaScript admin UI** — the rate-row editor uses plain ES6 JavaScript with no jQuery requirement.
- **Subtemplate and debug fields** — new fields bring this plugin into parity with other J2Commerce shipping plugins for template control and diagnostics.
