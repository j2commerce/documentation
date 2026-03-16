---
title: "Bulk Discounts"
sidebar_label: "Bulk Discounts"
sidebar_position: 10
description: "Apply automatic quantity-based discounts to products or entire carts with tiered pricing rules and customer group targeting."
---

# Bulk Discounts

The Bulk Discounts app automatically applies discounts based on purchase quantity. You can create tiered pricing rules (e.g., 5% off for 3+ items, 10% off for 10+ items) that trigger automatically at checkout. Discounts can be configured globally for all products, per category, or per individual product, and can target specific customer groups.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

The Bulk Discounts app is a premium add-on available from the J2Commerce extension directory.

**Step 1:** Go to [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate the Bulk Discounts app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the ZIP file or use the Install from URL option.

<!-- SCREENSHOT: Joomla extension install screen -->

## Enable the Plugin

Once installed, enable the plugin:

**Option A:** Go to **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing Bulk Discounts -->

Search for **Bulk Discounts**, click the **X** to enable it. The X turns into a green checkmark when enabled.

## Configure the Plugin

Click on **Bulk Discounts** to open the configuration.

### Basic Settings Tab

| Setting | Description | Default |
| ------- | ----------- | ------- |
| **Display Name** | The text displayed to customers when showing discount information (e.g., "Bulk Discount" or "Quantity Discount"). | Bulk Discount |
| **Prevent Double Discounts** | When enabled, bulk discounts are removed if a coupon code is applied, preventing customers from stacking multiple discounts. | Yes |
| **Display Message In Cart** | Show bulk discount promotion message under each cart item on the cart page. | No |
| **Apply Bulk Discount For** | How to calculate quantity: **Cart Qty** counts all items in cart; **Line Item Qty** counts each product variant separately. | Line Item Qty |
| **Product Discount Display** | How discount amounts appear: **Per Quantity Discount** shows discount per unit; **Total Discount Price** shows total savings. | Total Discount Price |
| **Display Single Qty Discount** | Show discount prices for single quantity tiers in the discounts table. | No |
| **Display Discounts In** | Where to show bulk discount information: **Product View** (product pages only), **Category View** (category pages only), **Product and Category Views** (both), or **Never Show** (hide completely). | Product View |
| **Display Quick Icon** | Show a quick icon on the J2Commerce dashboard for quick access to bulk discount settings. | No |

<!-- SCREENSHOT: Plugin configuration screen showing Basic Settings -->

#### Quantity Calculation Methods

| Method | Behavior |
| ------ | -------- |
| **Line Item Qty** | Discount applies based on each individual product variant quantity. If a customer buys 3 of Product A and 2 of Product B, only Product A gets the 3+ tier discount. |
| **Cart Qty** | Discount applies based on total cart quantity. If tier is set at 5+ items, any combination of products totaling 5+ items triggers the discount. |

#### Discount Display Formats

| Format | Example Display |
| ------ | --------------- |
| **Per Quantity Discount** | "Buy 5+ and save $2.00 per item" |
| **Total Discount Price** | "Buy 5+ and pay $45.00 (was $55.00)" |

### Global Discount Settings Tab

Configure site-wide bulk discount rules that apply to all products.

| Setting | Description |
| ------- | ----------- |
| **Enable Bulk Discount Globally** | Enable bulk discounts across the entire store. Individual products and categories can override these settings. |
| **Discount Type** | **Fixed Amount Per Product** deducts a fixed amount from each product; **Cart Percentage** applies a percentage discount to the cart total. |
| **Cart Promotional Text** | Custom message shown under cart items (when Display Message In Cart is enabled). Supports HTML. |
| **Single Quantity Class** | CSS class applied to single quantity discount rows for custom styling. Default: `bulk-price` |

### Global Discounts Section

Add unlimited discount tiers using the bulk discount table:

| Column | Description |
| ------ | ----------- |
| **Quantity** | Minimum quantity required to trigger this discount tier (e.g., 5 for "5 and above"). |
| **Cart Price** | Optional minimum cart total required. Leave empty or 0 to ignore. |
| **Customer Group** | Restrict this tier to specific customer groups (e.g., Wholesale, VIP). Select "All" to apply to everyone. |
| **Discount Value** | The discount amount. For fixed: enter currency amount (e.g., 5.00). For percentage: enter percentage (e.g., 10). |

<!-- SCREENSHOT: Bulk discount tier table with sample entries -->

#### How Discount Tiers Work

Discounts stack in tiers. If you configure:
- 3+ items: 5% off
- 5+ items: 10% off
- 10+ items: 15% off

A customer buying 7 items receives 10% off (the tier that matches 5+ but not 10+).

## Configure Products

After enabling the plugin, each product can have custom bulk discount settings that override global rules.

### Step 1: Edit a Product

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click on a product to edit it.
3. Scroll to the **Apps** section.
4. Click the **Bulk Discounts** tab.

<!-- SCREENSHOT: Product edit form showing Bulk Discounts tab -->

### Step 2: Enable Product-Level Discounts

| Field | Description |
| ----- | ----------- |
| **Enable Bulk Discount** | Set to **Yes** to override global settings for this product. If No, global/category settings apply. |
| **Discount Type** | Fixed Amount Per Product or Cart Percentage (independent of global setting). |
| **Cart Promotional Text** | Custom message for this product only (overrides global text). |
| **Combine Product Quantity In Cart** | When using Line Item Qty mode, sum quantities of identical variants in cart. |

### Step 3: Add Discount Tiers

Click **Add Bulk Discount** to create quantity-based pricing tiers.

Each tier has:

| Field | Description | Required |
| ----- | ----------- | -------- |
| **Quantity** | Minimum quantity to trigger this tier. | Yes |
| **Cart Price** | Minimum cart total required (optional). | No |
| **Customer Group** | Target customer group. Leave empty for all groups. | No |
| **Discount Value** | Fixed amount or percentage depending on Discount Type. | Yes |

### Step 4: Save the Product

Click **Save** or **Save & Close** to apply your changes.

## Configure Categories

Bulk discounts can also be set at the category level, applying to all products in that category.

### Step 1: Edit a Category

1. Go to **Content** -> **Categories**.
2. Click on a category to edit it.
3. Click the **Promotion** tab.

<!-- SCREENSHOT: Category edit form showing Promotion tab -->

### Step 2: Configure Category Discounts

| Setting | Description |
| ------- | ----------- |
| **Enable Bulk Discount** | Enable for this category's products. |
| **Apply Bulk Discount For** | **Category Sum Qty** totals all products in this category in the cart. **Line Item Qty** uses individual product quantities. |
| **Discount Type** | Fixed Amount Per Product or Cart Percentage. |
| **Cart Promotional Text** | Custom message for products in this category. |

### Step 3: Add Category Discount Tiers

Use the same bulk discount table to add quantity tiers. These apply to all products in the category unless a product has its own override.

## Priority Order

When multiple bulk discount rules exist, J2Commerce checks in this order:

1. **Product-level settings** — If a product has **Enable Bulk Discount** set to Yes, product rules apply.
2. **Category-level settings** — If the product's category has bulk discounts enabled, category rules apply.
3. **Global settings** — Site-wide rules from plugin configuration.

The first enabled setting found is used. Settings do not stack or combine.

## How It Works

When a customer views a product or adds items to cart:

1. J2Commerce checks if bulk discounts are enabled (product → category → global).
2. The customer's quantity is calculated based on the Apply setting.
3. Discount tiers are evaluated from lowest to highest quantity.
4. The matching tier's discount is applied to the product price.
5. If **Prevent Double Discounts** is enabled and a coupon code is applied, bulk discounts are removed.
6. Cart shows the discounted price with promotional text (if enabled).

<!-- SCREENSHOT: Product page showing bulk discount pricing table -->

## Display Conditions

Bulk discount information appears when:

- The plugin is enabled in **J2Commerce** -> **Apps**.
- At least one discount tier is configured.
- The **Display Discounts In** setting allows display in the current view.

**Cart message appears when:**

- **Display Message In Cart** is set to **Yes**.
- A discount tier matches the customer's quantity.
- The product is eligible for bulk discount.

## Tips

- **Start with global rules** — Set up common tiers globally, then override for specific products/categories as needed.
- **Use customer groups** — Create special discount tiers for wholesale buyers, VIP customers, or members.
- **Set Cart Price minimums** — Combine quantity thresholds with minimum order values for complex promotions.
- **Test tier stacking** — Verify that your tiers create the intended discount progression (e.g., 5% → 10% → 15%).
- **Use promotional text** — Add compelling messages like "Bulk buyers save up to 20%!" in the Cart Promotional Text field.
- **Prevent coupon stacking** — Enable **Prevent Double Discounts** if you offer coupon codes to avoid excessive discounts.

## Troubleshooting

### Bulk Discount Not Applied

**Cause:** Quantity threshold not met or plugin disabled.

**Solution:**

1. Go to **J2Commerce** -> **Apps**.
2. Verify **Bulk Discounts** shows a green checkmark (enabled).
3. Check that discount tiers have appropriate quantity thresholds.
4. Verify the customer's quantity meets or exceeds the tier minimum.
5. Check that **Customer Group** matches the logged-in user (or is empty for all groups).

### Discount Shows Wrong Amount

**Cause:** Discount type mismatch or quantity calculation mode incorrect.

**Solution:**

1. Check **Discount Type** setting matches your intent (Fixed vs Percentage).
2. Verify **Apply Bulk Discount For** setting:
   - **Line Item Qty** counts each product separately.
   - **Cart Qty** counts all items together.
3. If using **Combine Product Quantity In Cart**, ensure identical variants are in the cart.

### Discount Removed When Coupon Applied

**Cause:** **Prevent Double Discounts** is enabled.

**Solution:**

This is expected behavior. To allow both discounts:

1. Go to **J2Commerce** -> **Apps** -> **Bulk Discounts**.
2. Set **Prevent Double Discounts** to **No**.
3. Click **Save**.

### Product Override Not Working

**Cause:** Product-level setting not enabled.

**Solution:**

1. Edit the product.
2. Go to **Apps** -> **Bulk Discounts** tab.
3. Set **Enable Bulk Discount** to **Yes**.
4. Add discount tiers.
5. Click **Save**.

### Category Settings Ignored

**Cause:** Product has its own override, or priority order bypassing category.

**Solution:**

1. Edit the product.
2. In **Apps** -> **Bulk Discounts** tab, verify **Enable Bulk Discount** is set to **No** (to inherit category settings).
3. Check that category settings are properly configured.

### Cart Message Not Showing

**Cause:** **Display Message In Cart** is disabled.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Bulk Discounts**.
2. Set **Display Message In Cart** to **Yes**.
3. Add text in **Cart Promotional Text**.
4. Click **Save**.

### Bulk Discount Table Not Appearing on Product Page

**Cause:** **Display Discounts In** set to hide or wrong view.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Bulk Discounts**.
2. Check **Display Discounts In** setting:
   - **Product View** — Shows on product pages only.
   - **Category View** — Shows on category/product listing pages.
   - **Product and Category Views** — Shows everywhere.
   - **Never Show** — Hides the discount table completely.
3. Click **Save**.

## Related Topics

- [Coupons](../marketing/coupons.md) — Create coupon codes for additional promotions
- [Customer Groups](../customers/customer-groups.md) — Set up customer groups for targeted discounts
- [Product Types](../products/product-types.md) — Product configuration overview
- [Apps Overview](./index.md) — Other available J2Commerce apps