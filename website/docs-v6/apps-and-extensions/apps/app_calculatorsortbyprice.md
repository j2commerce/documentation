---
title: "Calculator - Sort by Price"
sidebar_label: "Calculator - Sort by Price"
sidebar_position: 7
description: "Automatically apply the lowest available price to customers based on their user group, order quantity, and date — ideal for stores with multiple price levels."
---

# Calculator - Sort by Price

The Calculator - Sort by Price plugin adds an alternative pricing calculator to J2Commerce. When a product has multiple price levels set up in its **Additional Pricing** table, this calculator automatically finds and applies the **lowest matching price** for each customer based on three factors: their Joomla user group, the quantity they are ordering, and the current date.

This is useful for stores that offer tiered pricing, wholesale discounts, time-limited promotions, or group-specific pricing. Without this plugin, J2Commerce uses the **Standard** calculator, which only uses the base variant price.

## Prerequisites

- J2Commerce installed and enabled
- At least one product with multiple price levels defined in **Additional Pricing**

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

1. Purchase and download the `app_calculatorsortbyprice.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_calculatorsortbyprice.zip` package file.
4. The plugin installs and enables automatically.

After installation:

1. Go to **J2Commerce** -> **Apps**.
2. Find **Calculator - Sort by Price** in the list and confirm it shows **Enabled**.

<!-- SCREENSHOT: J2Commerce Apps view showing Calculator - Sort by Price enabled -->

## How Pricing Calculators Work

Every product variant in J2Commerce has a **Pricing Calculator** setting that controls how the final price is determined. By default, all products use the **Standard** calculator. Once this plugin is installed, a second option — **Sort by Price** — becomes available.

| Calculator | Behavior |
|------------|----------|
| **Standard** | Uses the base variant price only. Additional pricing rules are ignored. |
| **Sort by Price** | Evaluates all additional pricing rules and selects the lowest price that matches the customer's group, quantity, and the current date. |

The calculator is set **per product**, so you can use Standard pricing on some products and Sort by Price on others.

## Setting Up a Product to Use Sort by Price

### Step 1: Open the Product

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click the product you want to configure.
3. Select the **Price** tab.

<!-- SCREENSHOT: Product edit form showing the Price tab selected -->

### Step 2: Change the Pricing Calculator

1. Find the **Pricing Calculator** dropdown in the Price tab.
2. Change it from **Standard** to **Sort by Price**.

<!-- SCREENSHOT: Pricing Calculator dropdown showing Sort by Price selected -->

### Step 3: Add Price Levels

The Sort by Price calculator only works when you have additional pricing rules defined. To add them:

1. In the same **Price** tab, click the **Additional Pricing** button.
2. A modal window opens showing your existing price rules (if any) and a form to add new ones.
3. Fill in the fields for each price level:

<!-- SCREENSHOT: Additional Pricing modal with sample pricing rules -->

| Field | Description | Example |
|-------|-------------|---------|
| **Quantity From** | Minimum quantity for this price to apply. Set to `0` for no minimum. | `10` |
| **Quantity To** | Maximum quantity for this price to apply. Set to `0` for no maximum. | `50` |
| **Date From** | Start date for this price. Leave empty for no start restriction. | `2026-01-01` |
| **Date To** | End date for this price. Leave empty for no end restriction. | `2026-12-31` |
| **Customer Group** | The Joomla user group this price applies to. Select **All** to apply to every customer. | `Wholesale` |
| **Price** | The price amount for this rule. | `15.00` |

4. Click **Save** to add the rule.
5. Repeat for each price level you need.
6. Close the modal and click **Save** on the product.

## Example: Multiple Price Levels in Action

Suppose you sell a product with a base price of $25.00 and you set up these additional pricing rules:

| Rule | Quantity | Group | Price |
|------|----------|-------|-------|
| 1 | 1 – 9 | All | $25.00 |
| 2 | 10 – 49 | All | $20.00 |
| 3 | 50+ | All | $15.00 |
| 4 | 1+ | Wholesale | $18.00 |

With the **Sort by Price** calculator, here is what each customer would pay:

- **A retail customer ordering 5 units:** Rule 1 matches ($25.00). Final price: **$25.00 per unit**.
- **A retail customer ordering 25 units:** Rule 2 matches ($20.00). Final price: **$20.00 per unit**.
- **A retail customer ordering 100 units:** Rule 3 matches ($15.00). Final price: **$15.00 per unit**.
- **A wholesale customer ordering 25 units:** Rules 2 ($20.00) and 4 ($18.00) both match. The calculator picks the lowest: **$18.00 per unit**.
- **A wholesale customer ordering 100 units:** Rules 3 ($15.00) and 4 ($18.00) both match. The calculator picks the lowest: **$15.00 per unit**.

The key behavior is that **when multiple rules match, the customer always gets the best (lowest) price**.

## How the Calculator Evaluates Rules

When a customer views or adds a product to the cart, the Sort by Price calculator:

1. Retrieves all additional pricing rules for that product variant.
2. Filters out rules that do not match:
   - **Quantity:** The customer's quantity must fall within the rule's quantity range.
   - **Date:** Today's date must fall within the rule's date range (if one is set).
   - **Customer Group:** The customer must belong to the rule's user group, or the rule must be set to **All**.
3. Sorts the remaining matching rules by price, lowest first.
4. Applies the lowest price.

If no rules match, the product's base variant price is used as a fallback.

## Tips

- You do not need to create a rule that matches the base price. If no additional pricing rules match, the standard base price is used automatically.
- Use date ranges for seasonal sales or limited-time promotions. The calculator will only apply those prices during the specified period.
- Combine quantity tiers with group-specific pricing for maximum flexibility. The calculator will always find the best deal for the customer.
- You can switch a product back to **Standard** at any time without deleting your additional pricing rules. The rules are preserved but ignored until you switch back to **Sort by Price**.

## Troubleshooting

### The product still shows the base price even though I added pricing rules

**Cause:** The product's Pricing Calculator is still set to **Standard**.

**Solution:**

1. Edit the product and go to the **Price** tab.
2. Change the **Pricing Calculator** dropdown from **Standard** to **Sort by Price**.
3. Click **Save**.

### A customer is not getting the expected discounted price

**Cause:** The customer's quantity, date, or user group may not match any of the pricing rules.

**Solution:**

1. Open the product and click **Additional Pricing** to review the rules.
2. Verify that the customer's order quantity falls within the **Quantity From** and **Quantity To** range of the intended rule.
3. Check that today's date is within the **Date From** and **Date To** range (if set).
4. Confirm the customer belongs to the correct Joomla user group. You can check this under **Users** -> **Manage** in the Joomla admin.

### The plugin does not appear in the Apps list

**Cause:** The plugin may not be installed or discovered.

**Solution:**

1. Go to **System** -> **Manage** -> **Extensions** and search for `calculatorsortbyprice`.
2. If it does not appear, go to **System** -> **Install** -> **Extensions** and re-upload the package.
3. If it appears but is disabled, click the status icon to enable it.

## Related Topics

- [Product Pricing](../catalog/product-pricing.md)
- [Bulk Discount](app_bulkdiscount.md)