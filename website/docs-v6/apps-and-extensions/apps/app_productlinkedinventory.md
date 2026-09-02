---
title: "Product Linked Inventory"
sidebar_label: "Product Linked Inventory"
sidebar_position: 1
description: "Link two or more J2Commerce product variants so they share and draw down the same physical stock quantity, including automatic syncing across translated products."
---

# Product Linked Inventory

Product Linked Inventory lets you connect two or more product variants so they draw down the same physical stock. Selling either linked variant reduces the quantity available on all of them, keeping availability accurate across size, color, or bundle variations that share one warehouse item. It can also link variants automatically across translated products, so a sale in one language instantly updates stock everywhere that item is listed.

## Requirements

- with PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Product Linked Inventory** App **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

You can install this **Product Linked Inventory** App using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the plugin ZIP file or use the Install from URL option.

<!-- SCREENSHOT: System > Install > Extensions showing the upload success message for the Product Linked Inventory package -->

## Enable the App

Once you have installed the App, you will need to enable it. There are **two** ways you can access the extension.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

<!-- SCREENSHOT: Apps list showing Product Linked Inventory with its enable toggle -->

Look for **Product Linked Inventory**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

<!-- SCREENSHOT: Apps list with Product Linked Inventory showing a green enabled checkmark -->

## Configure the App

Once you click on the **Product Linked Inventory** Title next to the green checkmark, you are ready to start setting up the parameters. These settings live under the plugin's own **Basic Options** tab and act as the store-wide default for every product.

<!-- SCREENSHOT: Product Linked Inventory plugin settings, Basic Options fieldset -->

### Basic Options tab

| Field | Description | Default |
|-------|-------------|---------|
| **Stock Source Language** | Read-only. Shows the language whose translation supplies the starting stock figure whenever a language-derived link is first created. Change it under **System -> Languages -> Content**. Only appears on multilingual sites with syncing turned on. | (site default language) |
| **Sync Across Languages (Default)** | Store-wide default for automatically linking a product's translated variants so they share stock without any manual setup. A product's own Apps tab setting always overrides this default. | Yes |
| **Force Resync (Default)** | Store-wide default for recalculating a product's linked inventory group on every save, even when nothing else changed. A product's own Apps tab setting always overrides this default. | No |
| **Debug Mode** | Logs detailed inventory sync activity to the J2Commerce log for troubleshooting. | No |

:::info
NOTE: **Sync Across Languages** only does anything on a multilingual site with Joomla language associations set up between your translated products. On a single-language store this setting has no effect.
:::

## Setting Up Linked Inventory on a Product

After enabling the plugin, every product gets its own **Product Linked Inventory** panel on its edit form, one block per variant the product has.

### Edit a Product

There are **three** ways you can access the products.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Products**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Products**

**Option C:** Go to **Content -> Categories ->** Find the **category** and then click inside the **published**/article section

<!-- SCREENSHOT: Products list in the admin -->

Click on a **product** to edit it **-> J2Commerce** tab **-> Apps** tab. Each of the product's variants shows its own **Variants linked to [SKU]** table.

<!-- SCREENSHOT: Product edit form, Apps tab, showing the Product Linked Inventory panel with a variant table -->

:::info
NOTE: If the product has no variants yet, the panel shows a message asking you to save the product first — variants have to exist before they can be linked.
:::

### Product-level fields

| Field | Description | Default |
|-------|-------------|---------|
| **Stock Source Language** | Read-only. Same informational badge as the plugin's Basic Options tab, shown here for context. | (site default language) |
| **Sync Across Languages** | Turns automatic language linking on or off for this specific product. Leave on **Use Global** to follow the plugin-wide default. | Use Global |
| **Force Resync** | Recalculates this product's linked inventory group on the next save, even if nothing else changed. Leave on **Use Global** to follow the plugin-wide default. | Use Global |
| **Linked Inventory** | The variant tables and search box described below — this is where you add and remove manual links for each of the product's variants. | — |

### Add a Manual Link

Each variant's table lists every variant it currently shares stock with, along with an **Add a Variant** search box underneath.

<!-- SCREENSHOT: A variant table with two linked rows and the Add a Variant search box below it -->

1. Start typing a product name or SKU into **Add a Variant** — at least 2 characters. Matching variants from other, enabled products with stock management turned on appear as you type.
2. Select a result to add it to the table as a new row.
3. In the **Adopt Quantity** column for the new row, choose which stock figure should win when the link is created:
   - **Use this variant's quantity** (default) — the variant you're editing keeps its current stock number, and every linked variant is brought up or down to match it.
   - **Use the linked variant's quantity** — the newly added variant's stock number becomes the shared figure instead.
4. Click **Save** on the product to commit the link.

| Column | Shows |
|--------|-------|
| **Product Name / SKU** | The linked variant's product and SKU. |
| **Origin** | How the link was created — **Manual**, **Language Association**, or **Manual + Language Association** when both apply. |
| **Adopt Quantity** | Only shown while adding a new row — decides whose stock figure the group starts from. |
| **Delete** | Removes a manually-added row. Only manual links show a delete icon — a link that exists purely because of a language association cannot be removed by hand from this table. |

:::info
NOTE: Linking two variants makes them draw down the same physical stock quantity. Language-derived links are maintained automatically based on the product's language associations and cannot be removed by hand.
:::

### Remove a Link

Click the trash icon on any manually-added row, then save the product. A row created from a language association has no delete icon — see [Language Links Aren't Being Created Automatically](#language-links) below for how those are managed instead.

## How It Works{#how-it-works}

1. Normally, each product variant tracks its own stock quantity independently.
2. Product Linked Inventory lets you group two or more variants — on the same product or across different products — into one linked group that shares a single stock number instead.
3. A group can form two ways: you add a variant manually through the search box above, or the app links matching variants automatically whenever two products are Joomla language associations of each other (translations of the same item), matched by identical SKU, or automatically when each translation has exactly one variant.
4. Whenever a variant in a group is sold, restored (a cancellation or refund), or its quantity is edited by hand, every other variant in that group is brought back in line with the same change, so all of them always show the same number.
5. When a sale is what triggered the change, the order that caused it gets a history note explaining which sibling variant's stock also moved and why — handy if you're reviewing an order later and see a quantity change you didn't expect.
6. A variant without **Manage Stock** turned on can never be linked — you'll see a warning if you try, and it's left out of any shared-stock calculation entirely.

## Example: Sharing Stock Across a Translated Storefront

You sell a hooded sweatshirt as two separate J2Commerce products — one listed in English, one in French, each with its own product page and its own SEO-friendly URL — but they are the exact same physical inventory sitting in one warehouse bin.

1. Set both articles up as Joomla language associations of each other (**Content -> Articles -> Associations**).
2. Give matching sizes and colors the same SKU on each side.
3. Make sure **Sync Across Languages** is on, either from the plugin's Basic Options tab or on each product's Apps tab.
4. Save either product.

Product Linked Inventory links every matching size/color pair automatically. From then on, a sale on the French listing instantly reduces the number available on the English listing too, so you never oversell an item because a shopper bought it through a different language URL.

You can combine this with a manual link for a related product that isn't a translation at all — for example, if that same sweatshirt is also sold on its own as part of a themed gift set with no separate stock of its own, search for the sweatshirt's variant on the gift set's Apps tab and add it as a manual link. Selling either the standalone sweatshirt or the gift set then reduces the same shared count.

## Resyncing the Whole Catalog

The plugin's own settings screen has a **Resync Inventory** button in the toolbar, next to the usual Save/Close buttons.

<!-- SCREENSHOT: Product Linked Inventory plugin edit screen, toolbar, showing the Resync Inventory button -->

Go to **System -> Manage -> Plugins**, open **Product Linked Inventory**, and click **Resync Inventory**. This walks your entire catalog in the background, re-checking language-derived links on every product and bringing every existing linked group's shared quantity back into agreement. It reports how many products were processed and how many could not be, once it finishes.

Use this after a bulk import, a manual database change, or any time you're not sure everything is still in sync — it's safe to run at any time and does not create or remove manual links, only language-derived ones and shared quantities.

## Tips{#tips}

- **Give translated variants matching SKUs.** Automatic language linking matches by SKU first — keeping SKUs identical across translations is the most reliable way to make sure the right variants pair up.
- **A single-variant product still links automatically** even without matching SKUs, as long as both translations have exactly one variant each.
- **Turn on Force Resync temporarily** if you've made bulk changes outside the normal save flow and want the next save to recalculate a group from scratch, then turn it back off.
- **Use the catalog-wide Resync Inventory button sparingly** — it's meant for after imports or bulk changes, not as a routine action; the normal sale/restore/edit flow keeps groups in sync on its own.

## Troubleshooting{#troubleshooting}

### A Linked Variant's Stock Doesn't Match Its Siblings{#stock-mismatch}

**Cause:** The link group hasn't been reconciled since a change — often after a manual database edit, a bulk import, or a product that existed before linking was set up.

**Solution:**

1. Open the product and turn on **Force Resync** on its Apps tab (or the plugin's Basic Options tab for every product), then save.
2. Or go to **System -> Manage -> Plugins -> Product Linked Inventory** and click **Resync Inventory** to bring the whole catalog back into sync.

### Saving a Translated Product Shows a Warning About No Matching Variant{#no-variant-match}

**Cause:** SKUs don't match between the translations, and neither product has exactly one variant, so the app can't tell which variants correspond to each other.

**Solution:**

1. Give the matching variants the exact same SKU on each translation.
2. Or, if the product only needs a single variant, keep exactly one variant on each side and the app will pair them automatically without needing matching SKUs.

### A Variant Can't Be Selected in the Search Box{#search-cant-select}

**Cause:** The target variant doesn't have **Manage Stock** turned on, its product is disabled, or the search term is fewer than 2 characters.

**Solution:**

1. Open the target product's **Inventory** tab and confirm **Manage Stock** is set to **Yes** for that variant.
2. Confirm the target product is published and enabled.
3. Type at least 2 characters into the **Add a Variant** search box.

### Language Links Aren't Being Created Automatically{#language-links}

**Cause:** The site isn't multilingual, **Sync Across Languages** is off (either globally or for this product), or the product's article has no Joomla language associations.

**Solution:**

1. Confirm your site has more than one content language published under **System -> Languages -> Content**.
2. Confirm **Sync Across Languages** is set to **Yes** on the plugin's Basic Options tab, or explicitly to **Yes** on the product's Apps tab.
3. Go to **Content -> Articles**, open the article, and confirm it has a language association set up with its translation.

### A Warning Says a Variant Cannot Be Linked{#unmanaged-variant}

**Cause:** The variant you searched for or that a language association matched does not have **Manage Stock** turned on.

**Solution:**

1. Open that variant's product and go to its **Inventory** tab.
2. Set **Manage Stock** to **Yes**, then save and retry the link.

### The Resync Inventory Button Reports Failures{#resync-failures}

**Cause:** A handful of products in the catalog hit an error during the sweep — usually a data issue on that specific product rather than a store-wide problem.

**Solution:**

1. Turn on **Debug Mode** on the plugin's Basic Options tab.
2. Run **Resync Inventory** again and check the site log for entries mentioning the specific product IDs that failed.
3. Open those products individually and save them with **Force Resync** turned on to isolate the issue.

## Related Topics

- [Inventory](../../catalog/inventory.md)
- [Managing Products](../../catalog/managing-products.md)
- [Inventory Command](app_stocknotification.md)
