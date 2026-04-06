---
title: "Coupons"
sidebar_label: "Coupons"
sidebar_position: 4
description: "Create and manage discount codes and promotional coupons in J2Commerce"
---

# Coupons

Coupons allow you to create promotional codes that customers can apply at checkout for discounts. Create percentage discounts, fixed amount discounts, or free shipping offers with flexible restrictions.

## Requirements

- PHP 8.3.0+
- Joomla 6.x
- J2Commerce 6.x

## Accessing Coupons

1. Go to **J2Commerce** → **Dashboard**.
2. Click **Coupons** in the Sales section.

<!-- TEMP_IMG_OFF ![](/img/coupons-list.webp) -->
Alternatively: **Components** → **J2Commerce** → **Coupons**.

## Coupons List View

The coupons list displays all configured discount codes:

| Column | Description |
|--------|-------------|
| **Status** | Published (green) or Unpublished (grey) |
| **Coupon Name** | Internal name for the coupon |
| **Code** | Coupon code customers enter at checkout |
| **Type** | Discount type (Fixed Cart, Percentage, etc.) |
| **Value** | Discount amount or percentage |
| **Valid From** | Start date of validity period |
| **Valid To** | End date of validity period |
| **ID** | Internal coupon ID |

### Filter Options

| Filter | Description |
|--------|-------------|
| **Search** | Search by coupon name or code |
| **Status** | Filter by published/unpublished |
| **Type** | Filter by discount type (percentage/fixed) |
| **Free Shipping** | Filter by free shipping status |

<!-- TEMP_IMG_OFF ![](/img/coupons-filters.webp) -->
## Creating a Coupon

1. Click **New** in the toolbar.
2. Configure the coupon settings (see fields below).
3. Click **Save** or **Save & Close**.

<!-- TEMP_IMG_OFF ![](/img/coupon-edit.webp) -->
## Coupon Fields

### Basic Settings Tab

| Field | Description | Example |
|-------|-------------|---------|
| **Coupon Name** | Internal name for identification | `Summer Sale 20%` |
| **Coupon Code** | Code customers enter at checkout | `SUMMER20` |
| **Coupon Type** | Type of discount | Fixed Cart, Percentage, etc. |
| **Value** | Discount amount or percentage | `20` (for 20% or [dollar]20) |
| **Free Shipping** | Enable free shipping with coupon | Yes/No |
| **Valid From** | Start date for coupon validity | `2026-06-01` |
| **Valid To** | End date for coupon validity | `2026-06-30` |

### Coupon Types

| Type | Description | Value Meaning |
|------|-------------|---------------|
| **Fixed Cart** | Fixed amount off entire cart | [dollar]20 off total |
| **Fixed Product** | Fixed amount off each product | [dollar]5 per item |
| **Percentage Cart** | Percentage off entire cart | 20% off total |
| **Percentage Product** | Percentage off each product | 10% per item |

### Restrictions Tab

| Field | Description | Default |
|-------|-------------|---------|
| **Logged-in Users Only** | Restrict to registered customers | No |
| **Uses Per Coupon** | Maximum total uses (0 = unlimited) | 0 |
| **Uses Per Customer** | Max uses per customer (0 = unlimited) | 0 |
| **Minimum Spending** | Minimum order subtotal required | — |
| **Maximum Discount Value** | Max discount for percentage coupons | — |
| **Limit Quantity Usage** | Max items for per-product discounts | — |
| **Product Categories** | Restrict to selected categories | — |
| **Products** | Restrict to selected products | — |
| **Brand/Manufacturer** | Restrict to selected brands | — |
| **Customer Groups** | Restrict to user groups | — |
| **Users** | Restrict to specific users | — |

## How Coupons Work

### Discount Calculation

1. **Fixed Cart**: Subtract the value from the order subtotal
   - Example: [dollar]20 off a [dollar]100 order = [dollar]80 total

2. **Percentage Cart**: Apply percentage to subtotal
   - Example: 20% off [dollar]100 = [dollar]20 discount = [dollar]80 total

3. **Fixed Product**: Subtract value from each matching product
   - Example: [dollar]5 off each item × 3 items = [dollar]15 total discount

4. **Percentage Product**: Apply percentage to each matching product
   - Example: 10% off [dollar]50 item × 2 items = [dollar]10 total discount

### Validation Process

When a customer applies a coupon, J2Commerce validates:

1. **Coupon exists and is published**
2. **Date validity** — Current date is within Valid From/To range
3. **Usage limits** — Total uses haven't exceeded limit
4. **Customer usage** — Customer hasn't exceeded their personal limit
5. **Login requirement** — Customer is logged in (if required)
6. **Minimum spending** — Order subtotal meets minimum
7. **Product/category restrictions** — Order contains qualifying items
8. **User/group restrictions** — Customer is in allowed group

### Free Shipping Coupons

When **Free Shipping** is enabled:

1. The shipping cost is set to zero
2. Requires the Free Shipping plugin to be enabled
3. Configure the Free Shipping plugin to require a valid coupon

## Tips

- **Use descriptive names** — "Summer Sale 20%" is easier to identify than "Coupon 1"
- **Set expiration dates** — Prevent old coupons from being used unexpectedly
- **Test your coupons** — Create a test order to verify discount calculations
- **Use usage limits** — Prevent unlimited use of high-value discounts
- **Restrict by category** — Target promotions to specific product lines
- **Monitor coupon usage** — Check order history for coupon usage patterns

## Troubleshooting

### Coupon Not Working at Checkout

**Cause:** One or more validation rules failing.

**Solution:**

1. Check the coupon is **Published**.
2. Verify the current date is within **Valid From** and **Valid To**.
3. Ensure **Uses Per Coupon** hasn't been reached.
4. Check if **Logged-in Users Only** is enabled — customer must be logged in.
5. Verify the order subtotal meets **Minimum Spending**.
6. Check product restrictions — order must contain qualifying products.

<!-- TEMP_IMG_OFF ![](/img/coupon-troubleshoot.webp) -->
### Percentage Discount Exceeds Expected Amount

**Cause:** Maximum discount value not set.

**Solution:**

1. Edit the coupon.
2. Set **Maximum Discount Value** to cap the discount.
3. Example: 20% off with max [dollar]50 means even a [dollar]500 order only gets [dollar]50 off.

### Free Shipping Not Applying

**Cause:** Free Shipping plugin not configured correctly.

**Solution:**

1. Go to **J2Commerce** → **Shipping** → **Shipping Methods**.
2. Ensure the **Free Shipping** plugin is published.
3. Edit the Free Shipping plugin and check **Require Valid Coupon**.
4. Set **Minimum Order Amount** if needed.
5. Save the plugin settings.

### Coupon Code Input Shows Error

**Cause:** Invalid coupon format or already applied.

**Solution:**

1. Coupon codes are case-insensitive.
2. Check if the coupon is already applied to the cart.
3. Verify the code matches exactly — no extra spaces.
4. Clear the cart and try again.

### Coupon Restricted to Products Not Working

**Cause:** Products not properly associated or save required.

**Solution:**

1. Edit the coupon.
2. In the **Products** field, select the products.
3. **Important:** Click **Save** after selecting products before leaving the page.
4. The note in the interface reminds you: "If you add or delete product(s), you must click the save button before leaving."

## Related Topics

- [Orders](orders.md) — View orders that used coupons
- [Configuration](../configuration/index.md) — Configure default coupon settings