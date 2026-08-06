---
title: "Product Tools"
sidebar_label: "Product Tools"
sidebar_position: 103
description: "Bulk-convert simple J2Commerce products that carry options into variable or flexivariable products, generating a priced variant for every combination of option values."
---

# Product Tools

The Product Tools app saves you from rebuilding products by hand when you need to offer several choices — like size and color — as separate, individually priced and stocked variants. Instead of manually creating a new variant for every combination, you select one or more simple products that already have options, and Product Tools converts them into variable or flexivariable products in bulk, generating one variant for each possible combination of option values.

This is especially useful when you are migrating a large catalog of simple products into a more structured variant setup, or when a product line grows from "just a few colors" into a full size-and-color matrix.

## Requirements

- PHP 8.3.0 or later
- Joomla 6.x
- J2Commerce 6.x
- At least one simple product with options and option values assigned (Select, Radio, or Color option types)

## Purchase and Download

The **Product Tools** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to [www.j2commerce.com](https://www.j2commerce.com) -> **Apps**.

**Step 2:** Locate the **Product Tools** app, click **View Details**, then **Add to Cart** -> **Checkout**.

**Step 3:** After purchase, go to **My Downloads** under your profile menu and find the app. Click **Available Versions** -> **View Files** -> **Download Now**.

## Install the App

1. In the Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Upload the `app_producttools.zip` package file.
3. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extensions installer with app_producttools.zip selected -->

## Enable the App

Once installed, confirm the app is enabled. There are two ways to reach it.

**Option A:** Click the **J2Commerce** icon in the top-right corner -> **Apps**.

**Option B:** Go to **Components** in the left sidebar -> **J2Commerce** -> **Apps**.

<!-- SCREENSHOT: J2Commerce Apps list showing Product Tools in the list -->

Look for **Product Tools** in the list. If the toggle shows a red X, click it to turn it into a green checkmark. The app is now active.

## Open the Product Tools Screen

Product Tools works a little differently from most other apps. Clicking its name in the Apps list only opens the plugin's **settings** screen — the actual conversion tool lives on a separate screen that you reach from a button there.

1. Go to **J2Commerce** icon -> **Apps** (or **System** -> **Manage** -> **Plugins** and search for **Product Tools**).
2. Click the **Product Tools** title to open its settings screen.
3. In the toolbar at the top of that screen, click **Convert Products**.

<!-- SCREENSHOT: Product Tools plugin edit screen toolbar showing the Convert Products button -->

This opens the Product Tools list, which shows every simple product that carries at least one option value and could potentially be converted. You can return to the settings screen from this list at any time by clicking **Settings** in the toolbar.

## Configure the App

Click **Convert Products** from the Apps list (as above), then click **Settings** on the list screen — or open **Product Tools** directly from **System** -> **Manage** -> **Plugins** — to reach the configuration fields.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

<!-- SCREENSHOT: Product Tools plugin settings page with Toggle Inline Help button visible in the toolbar -->

| Setting | Description | Default | Options |
|---|---|---|---|
| **Default Target Type** | The product type preselected when you start a conversion run. | Variable | Variable, Flexivariable |
| **Combination Limit** | Products whose option values would produce more combinations than this are skipped rather than converted. Hard-capped at 1000 regardless of this setting. | 250 | 1–1000 |
| **Products per Batch** | How many products each background request converts. Lower this if requests time out during a run. | 5 | 1–50 |
| **Variant SKU** | How each generated variant's SKU is built from the base product's SKU. | Base SKU plus option value suffixes | Base SKU plus option value suffixes, Base SKU plus a sequence number, Leave blank |
| **Create Stock Records** | Creates a stock record for each generated variant. Without one, a variant has no stock row until you edit it manually. | Yes | Yes, No |
| **Suppress Product-Save Notifications** | Recommended **Yes** for bulk runs. When enabled, integrations that listen for a product save (search indexing, marketing sync, back-in-stock emails) are not notified during conversion — re-sync them manually afterward. When disabled, a product with pending back-in-stock signups may trigger a real customer email during conversion. | Yes | Yes, No |
| **Logging** | How much detail is written to the site log. | Errors only | Off, Errors only, Everything |

## Convert Products

1. Open the Product Tools screen (see **Open the Product Tools Screen** above).
2. Use the **Search Products** field to find products by name or ID, or use the **Status** filter to narrow the list to published, unpublished, archived, or trashed products.
3. Review the **Combinations** column for each product:
   - A gray number badge shows how many variants would be created.
   - A red badge explains why the product cannot be converted yet — see **Why a Product Can't Be Converted** below.
4. Tick the checkbox next to each product you want to convert.
5. Click the **Convert** dropdown in the toolbar, then choose **Convert to Variable** or **Convert to Flexivariable**.

<!-- SCREENSHOT: Product Tools list with several products selected and the Convert dropdown open showing both target options -->

6. Confirm the prompt that appears: *"Convert the selected products? This changes the product type and creates one variant per option combination. It cannot be undone automatically."*
7. Click **OK** to start the run.

:::info

NOTE: Conversion cannot be undone automatically. To revert a converted product, you would need to manually delete the variants it created and change the product type back yourself. Convert a small batch first, or try it on a staging copy of your store, before running it against your whole catalog.

:::

### Why a Product Can't Be Converted

| Reason Shown | What It Means |
|---|---|
| Already converted or not a simple product. | The product has already been converted, or was never a simple product to begin with. |
| This product already has other variants and cannot be converted automatically. | The product carries variants beyond its single master variant. Review it manually. |
| No master variant found for this product. | The product has no usable base variant to build combinations from. |
| This product's master variant is referenced by a live cart, wishlist, or subscription and was not modified. | A customer currently has this exact product in an active cart, wishlist, or subscription, so it is skipped to avoid disrupting them. |
| This product has no usable option dimensions. | The product has no options assigned. |
| This product has an option with no option values. | One of the product's options has no values configured under it. |
| This product has an option type that cannot be converted (only Select, Radio, and Color options are supported). | Product Tools can only build combinations from Select, Radio, or Color type options. |
| Combination count exceeds the configured limit. | The number of possible combinations is higher than the **Combination Limit** setting. Raise the limit (up to 1000) or reduce the product's option values. |
| No option combinations could be generated. | No valid combination of option values could be built for this product. |

### Monitoring a Conversion Run

Once you start a run, a progress panel appears below the list showing:

- A progress bar and a **Products** count (how many have been processed out of the total).
- Running totals for **Variants Created**, **Skipped**, and **Failed**.
- A message log listing any skipped or failed products along with the reason.

<!-- SCREENSHOT: Product Tools progress panel showing the progress bar, counts, and message log -->

If you navigate away or close the browser tab while a run is in progress, the conversion pauses — nothing is lost. Reopening the Product Tools screen automatically resumes the progress display for your active run.

To stop a run, click **Cancel Run** at the bottom of the progress panel and confirm the prompt. Products already converted before you cancel are **not** reverted.

## How It Works

When you start a conversion run, for each selected product Product Tools:

1. Confirms the product is still a simple product with a usable base (master) variant that is not currently attached to a live cart, wishlist, or subscription.
2. Builds every possible combination of the product's option values (only Select, Radio, and Color option types are supported).
3. Checks the combination count against your **Combination Limit** setting — if it's too high, the product is skipped rather than partially converted.
4. Creates one new variant per combination, priced as the base product's price plus that combination's option value price adjustments (a variant is never priced below zero).
5. Assigns each new variant a SKU using your chosen **Variant SKU** strategy.
6. If **Create Stock Records** is enabled, creates a stock record at zero quantity for each new variant — you'll still need to set the real stock level afterward.
7. Changes the product's type to **Variable** or **Flexivariable**, whichever you chose.

## Tips

- **Start small.** Convert a handful of products first and check the results before running a full catalog batch.
- **Adjust batch size if needed.** Lower **Products per Batch** if a run seems to stall or time out; you can raise it again once you've confirmed conversions are completing smoothly.
- **Keep notifications suppressed for bulk runs.** Leaving **Suppress Product-Save Notifications** set to **Yes** prevents search indexing, marketing sync, and back-in-stock emails from firing during a large conversion.
- **Set real stock after conversion.** **Create Stock Records** only creates a zero-quantity placeholder — update each new variant with its actual stock count afterward.
- **Products in active carts are protected.** A product whose master variant is already sitting in a customer's cart, wishlist, or subscription is skipped automatically so an in-progress purchase is never disrupted.

## Troubleshooting

### A Product Doesn't Appear in the List

**Cause:** Only simple products that carry at least one option with option values are shown.

**Solution:**
1. Edit the product and confirm it is still a **Simple** product type.
2. Add the options and option values you want to convert on, then save.
3. Return to the Product Tools screen — the product should now appear.

### A Product Shows a Red Badge Instead of a Number

**Cause:** The product does not currently meet one of the eligibility checks. See the **Why a Product Can't Be Converted** table above for the exact reason shown.

**Solution:**
1. Hover over the red badge to see the full reason text.
2. Fix the underlying issue on the product (add option values, wait until it's no longer in an active cart, and so on).
3. Reload the Product Tools screen to confirm the badge has changed.

### The Convert Products Button Is Missing from the Plugin Settings Screen

**Cause:** Your user account does not have permission to view or edit products, or the plugin is disabled.

**Solution:**
1. Go to **J2Commerce** -> **Apps** and confirm **Product Tools** shows a green checkmark (enabled).
2. Confirm your user group has the **View Products** and **Edit Products** permissions in J2Commerce's access control settings.
3. Reload the plugin's settings screen.

### A Conversion Run Seems Stuck

**Cause:** The browser tab was closed mid-run, or a background request timed out.

**Solution:**
1. Reopen the Product Tools screen — an active run resumes its progress display automatically.
2. If it still doesn't move forward, lower **Products per Batch** in the app settings and start a new run on the remaining products.

### A Product Shows as "Failed" After a Run

**Cause:** An unexpected error occurred while converting that specific product. The change for that product is automatically rolled back, so nothing partial is left behind.

**Solution:**
1. Check the message log in the progress panel for the product ID and reason.
2. If **Logging** is set to **Errors only** or **Everything**, check your site's error log for more detail.
3. Correct the underlying issue on the product and try converting it again on its own.
