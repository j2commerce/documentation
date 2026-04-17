# Advanced Pricing

Advanced Pricing lets you set special prices for your products based on conditions — such as a promotional date range, how many items a customer buys at once, or which customer group they belong to. You can combine these conditions to create complex pricing strategies without ever touching the base product price.

Common uses include sale prices during a specific weekend, bulk discounts for customers who order 10 or more units, and wholesale prices for registered trade customers.

## Accessing Advanced Pricing

Go to **J2Commerce** -> **Catalog** -> **Advanced Pricing**.

You can also reach it from the Products list by clicking the **Advanced Pricing** button in the toolbar.

<!-- SCREENSHOT: J2Commerce Catalog menu open showing Advanced Pricing option -->

## Understanding the Advanced Pricing List

<!-- SCREENSHOT: Full Advanced Pricing list showing columns and sample pricing rules -->

Each row in the list represents one pricing rule attached to a product variant.

| Column | Description |
|--------|-------------|
| **Product Name** | The product this rule applies to. |
| **Product ID** | The internal ID of the product. |
| **Variant / SKU** | The specific variant and its SKU code. |
| **Qty Range** | The quantity range that triggers this price (e.g., **5 – 10**, **20+**, **≤ 50**). |
| **Date From** | The date this price becomes active. Empty means no start limit. |
| **Date To** | The date this price expires. Empty means no end limit. |
| **User Group** | The Joomla user group this price applies to. |
| **Price** | The special price for this rule. Click the field to edit it inline. |

:::tip

You can edit a price directly in the list without opening the full edit form. Click the price value, type the new amount, and click **Save**.

:::

## How Advanced Pricing Works

When a customer adds a product to their cart, J2Commerce checks all active pricing rules for that product variant. A rule applies when **all** of its conditions are met at the same time:

- The current date falls within the **Date From** and **Date To** range (if set).
- The quantity in the cart falls within the **Qty Range** (if set).
- The customer belongs to the specified **User Group**.

If a matching rule is found, J2Commerce uses that price instead of the base product price. If multiple rules match, the lowest price wins.

## Toolbar Actions

<!-- SCREENSHOT: Advanced Pricing toolbar showing Batch Update, Clear Dates, Delete, and Products buttons -->

| Button | What It Does |
|--------|-------------|
| **Batch Update** | Opens a panel to update the user group or dates on multiple selected rules at once. |
| **Clear Dates** | Removes the Date From and Date To from all selected rules, making them apply indefinitely. |
| **Delete** | Permanently removes the selected pricing rules. |
| **Products** | Returns you to the Products list. |

## Searching and Filtering

Use the search bar to find pricing rules by **product name** or **SKU**.

To filter by customer group, click **Search Tools** and select a group from the **User Group** dropdown.

<!-- SCREENSHOT: Search bar and User Group filter dropdown open -->

## Creating a Pricing Rule

Advanced pricing rules are created from within the individual product edit screen.

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click the product name to open it.
3. Go to the **Pricing** tab.
4. Click **Add Price** to add a new row.
5. Fill in the pricing rule fields (described below).
6. Click **Save** or **Save & Close**.

<!-- SCREENSHOT: Product edit screen Pricing tab showing Add Price button and a filled-in pricing rule row -->

### Pricing Rule Fields

| Field | Description |
|-------|-------------|
| **Price Valid From** | The date and time this price becomes active. Leave empty for no start limit. |
| **Price Valid To** | The date and time this price expires. Leave empty for no expiry. |
| **Quantity From** | The minimum quantity the customer must buy to get this price. Leave empty for no minimum. |
| **Quantity To** | The maximum quantity for this price tier. Enter **0** or leave empty for unlimited. |
| **Customer Group** | The Joomla user group this price applies to. Use **Public** for all customers. |
| **Price** | The special price to charge when this rule matches. |

:::tip

Leave both **Quantity From** and **Quantity To** empty if you want the price to apply regardless of quantity. Leave both dates empty if the price should stay active permanently.

:::

## Common Pricing Strategies

### Weekend Sale Price

Set a lower price for a specific date range with no quantity or group restrictions.

| Field | Value |
|-------|-------|
| Price Valid From | `2026-06-01 00:00:00` |
| Price Valid To | `2026-06-02 23:59:59` |
| Quantity From | *(empty)* |
| Quantity To | *(empty)* |
| Customer Group | Public |
| Price | `9.99` |

### Bulk Discount (10+ units)

Reward customers who buy in quantity.

| Field | Value |
|-------|-------|
| Price Valid From | *(empty)* |
| Price Valid To | *(empty)* |
| Quantity From | `10` |
| Quantity To | `0` (unlimited) |
| Customer Group | Public |
| Price | `7.50` |

### Wholesale Price for Trade Customers

Show a lower price only to members of a specific user group.

| Field | Value |
|-------|-------|
| Price Valid From | *(empty)* |
| Price Valid To | *(empty)* |
| Quantity From | *(empty)* |
| Quantity To | *(empty)* |
| Customer Group | Trade Customers |
| Price | `5.00` |

## Batch Updating Rules

When you need to update the same field across many rules at once, use **Batch Update** instead of editing each rule individually.

1. Check the boxes next to the rules you want to update.
2. Click **Batch Update** in the toolbar.
3. Fill in one or more of the batch fields:
   - **Change User Group** — reassigns all selected rules to a different group.
   - **Set Date From** — sets the same start date on all selected rules.
   - **Set Date To** — sets the same end date on all selected rules.
4. Click **Process**.

<!-- SCREENSHOT: Batch Update modal showing User Group, Date From, and Date To fields -->

Only the fields you fill in are updated. Fields left empty are not changed.

### Clearing Dates from Multiple Rules

To remove date restrictions from several rules at once:

1. Check the boxes next to the rules.
2. Click **Clear Dates** in the toolbar.

Both the **Date From** and **Date To** are set to empty, making those rules apply indefinitely.

## Deleting Pricing Rules

1. Check the boxes next to the rules you want to remove.
2. Click **Delete** in the toolbar.
3. Confirm when prompted.

Deleting a pricing rule does not affect the product's base price.

## Tips

- A pricing rule with no conditions set (no dates, no quantity limits, and **Public** group) will apply to every customer all the time. Use this to permanently lower a price without changing the base product price.
- Use overlapping quantity tiers to create a full tiered price table. For example: 1–4 units at the base price, 5–9 units at a 10% discount, 10+ units at a 20% discount.
- The **Date From** and **Date To** fields include a time component. Set the time to `00:00:00` for the start and `23:59:59` for the end to cover the full day.

## Troubleshooting

### A special price is not showing on the product page

**Cause:** One or more conditions of the pricing rule are not being met.

**Solution:**

1. Go to **Advanced Pricing** and check the rule's **Date From** and **Date To** — confirm today's date falls within the range.
2. Check the **Qty Range** — confirm the quantity being tested meets the minimum.
3. Check the **User Group** — confirm the customer is logged in and belongs to the specified group. If the group is **Public**, all visitors should see the price.

### "Valid from date must be before valid to date" error on save

**Cause:** The **Price Valid From** date is set to a date that is later than **Price Valid To**.

**Solution:**

Swap the dates so the start date comes before the end date, then save again.

### After batch update, some rules were not changed

**Cause:** Only checked items are affected by a batch operation.

**Solution:**

Verify the correct rows were checked before running the batch. Use the checkbox at the top of the column to select all items on the current page.

## Related Topics

- [Managing Products](./managing-products.md)
- [Simple Products](./product-types/simple_product.md)
- [Variable Products](./product-types/variable_product.md)
