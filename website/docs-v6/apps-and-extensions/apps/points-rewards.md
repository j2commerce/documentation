---
title: "Points and Rewards"
sidebar_label: "Points and Rewards"
sidebar_position: 50
description: "Award loyalty points to customers for purchases and account signups. Customers redeem points at checkout for an order discount."
---

# Points and Rewards

The Points and Rewards app builds customer loyalty by awarding points every time someone makes a purchase or creates an account. Customers see exactly how many points each product earns, and when they are ready to buy again they can redeem those accumulated points for an instant discount at checkout.

You control the earn rate, the redemption rate, the minimum balance required before redeeming, and the maximum discount per order. Per-product settings let you fine-tune — or completely disable — points for individual items.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**.

**Step 2:** Locate the **Points and Rewards** app **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner. Search for the app, click **Available Versions** **->** **View Files** **->** **Download Now**.

## Installation

1. Go to **System** **->** **Install** **->** **Extensions**.
2. Upload the `app_point.zip` package file.
3. The plugin installs and enables automatically.

## Enable and Open Settings

After installation, navigate to **J2Commerce** **->** **Apps** and find **Points and Rewards** in the list. Click the app name to open its settings panel.

<!-- SCREENSHOT: J2Commerce Apps list with "Points and Rewards" row highlighted and the Settings link visible -->

---

## Points Settings

These are the global controls for how points are earned and redeemed across your entire store.

### Enable Points and Rewards

| Field | Description | Default |
|-------|-------------|---------|
| **Enable points and rewards for all products** | When **Yes**, every product participates in points earning automatically. When **No**, points only apply to products where you have set the per-product option to **Override Global Settings**. | No |

### Earn and Redeem Conversion Rates

The earn and redeem rates are set using a two-part conversion field that reads "X points = Y currency amount."

| Field | Description | Example |
|-------|-------------|---------|
| **Earn Points Conversion Rate** | How many points a customer earns per unit of currency spent. | 1 point for every $1.00 spent |
| **Redeem Points Conversion Rate** | How much monetary discount a set number of points is worth. | 100 points = $1.00 discount |

<!-- SCREENSHOT: The Earn Points Conversion Rate and Redeem Points Conversion Rate fields showing the dual-input layout -->

### Discount Controls

| Field | Description | Default |
|-------|-------------|---------|
| **Maximum Discount (Per Order)** | The highest dollar amount of discount that points can apply to a single order. Set to `0` for no limit. | 0 |
| **Minimum Points Required** | A customer must hold at least this many points before the redeem option appears in the cart. Set to `0` to allow redemption at any balance. | 0 |

### Rounding

| Field | Description | Default |
|-------|-------------|---------|
| **Round Points** | When enabled, earned point values are rounded. | No |
| **Rounding Decimal Places** | How many decimal places to round to (only active when rounding is enabled). | 0 |
| **Round Discount Amount** | When enabled, the discount amount calculated from redeemed points is also rounded. | No |

### Tax Handling

| Field | Description | Default |
|-------|-------------|---------|
| **Reduce tax from discount amount when prices include tax** | When **Yes**, the tax portion is stripped out of the discount calculation. Recommended when your prices are displayed tax-inclusive. | Yes |

### Points Label

| Field | Description | Default |
|-------|-------------|---------|
| **Points Suffix** | The text appended after every point value, for example "14 Reward Points". Change this to match your brand — "Stars", "Credits", "Coins", etc. | Reward Points |

### Signup Bonus

| Field | Description | Default |
|-------|-------------|---------|
| **Account Signup Bonus** | Points credited automatically when a new customer registers during checkout or from the frontend My Profile area. Set to `0` to disable. | 0 |

### Display

| Field | Description | Default |
|-------|-------------|---------|
| **Show Message on Category/List Pages** | When **Yes**, the earn-points message appears on product cards in category and product list views. When **No**, the message only shows on individual product pages. | No |

### Point History Limit

| Field | Description | Default |
|-------|-------------|---------|
| **Point History Limit** | How many transactions to display in the **Rewards** tab on the customer's My Profile page. | 10 |

<!-- SCREENSHOT: The complete Points Settings fieldset in the J2Commerce Apps panel -->

---

## Order Status Rules

Three multi-select fields control exactly when points are credited, deducted, and recovered as an order moves through its lifecycle. Select one or more order statuses from each list.

| Field | What it does | Default |
|-------|-------------|---------|
| **Add points if order status matches** | Points earned on the purchase are credited to the customer when the order reaches one of these statuses. Typical choice: **Confirmed**. | Confirmed |
| **Deduct points if order status matches** | When a customer redeemed points on an order and that order reaches one of these statuses, the redeemed amount is deducted from their balance. Typical choice: **Failed**. | Failed |
| **Recover points if order status matches** | If a customer had redeemed points and the order fails or is cancelled, those redeemed points are returned. Typical choice: **Failed** or **Cancelled**. | Failed |

Available statuses: **Confirmed**, **Processed**, **Failed**, **Pending**, **New**, **Cancelled**.

**How the lifecycle works in practice:**

1. Customer places an order and optionally redeems points at checkout.
2. When the order status changes to a status in **Add points**, the earned points are added to the customer's balance.
3. If the customer redeemed points and the order is confirmed, the redeemed points are deducted when the order reaches a status in **Deduct points**.
4. If the order fails or is cancelled and the customer had redeemed points, those points come back when the order reaches a status in **Recover points**.

<!-- SCREENSHOT: The three order-status multi-select fields showing Confirmed selected for "Add points" -->

---

## Product/Cart/Checkout Messages

These are the text messages shown to customers on product pages and in the cart. Switch to the **Product/Cart/Checkout Messages** tab in the app settings.

You can use the following shortcodes inside any message:

| Shortcode | Replaced with |
|-----------|---------------|
| `{points}` | The number of points the customer will earn (or can redeem) |
| `{points_label}` | The Points Suffix you configured (for example, "Reward Points") |
| `{points_value}` | The monetary discount value of the redeemable points |
| `{price_in_points}` | The product price expressed as a points cost |

| Field | Description | Default message |
|-------|-------------|-----------------|
| **Product Page Message** | Shown below the price on individual product pages. | "Purchase this product now and earn [points] [points_label]" |
| **Cart Earn Message** | Shown in the cart, telling the customer how many points this order will earn. | "Complete your order and earn [points] [points_label] for a discount on a future purchase." |
| **Cart Redeem Message** | Shown in the cart when the customer has enough points to redeem. Includes the **Apply Discount** button. | "Use [points] [points_label] for a [points_value] discount on this order!" |

Note that the default messages shown above use square brackets to represent shortcodes in this documentation. In the actual message fields you enter the shortcodes with curly braces, for example `{points}` and `{points_label}`.

<!-- SCREENSHOT: The Messages tab showing all three message textarea fields with their default content -->

---

## Per-Product Point Overrides

You can override the global settings on individual products. Open any product in **J2Commerce** **->** **Catalog** **->** **Products**, then scroll down to the **Points and Rewards** tab within the product edit form.

<!-- SCREENSHOT: The "Points and Rewards" tab panel in the product edit form -->

| Field | Description | Options |
|-------|-------------|---------|
| **Points Setting** | Choose how this product interacts with the global points configuration. | Use Global Settings / Override Global Settings / Disable Points for This Product |
| **Earn Point Type** | Whether the custom earn amount is a fixed number of points or a percentage of the product price. | Fixed / Percentage |
| **Earn Points** | The fixed point amount or the percentage to award for this product. Only active when **Override Global Settings** is selected. | — |
| **Maximum Point Type** | Whether the per-product maximum discount is a fixed amount or a percentage. | Fixed / Percentage |
| **Maximum Discount for This Product** | The maximum points-based discount allowed for this product. Overrides the global maximum for this item only. | — |

**Use Global Settings** — The product follows whatever the global configuration says. This is the default for all products.

**Override Global Settings** — The product uses its own earn amount and maximum discount, ignoring the global earn rate for this item.

**Disable Points for This Product** — No points are earned on this product and no points discount can be applied to it, regardless of global settings.

---

## Customer Experience

### Product Page

When a customer views a product, they see the earn message below the price — for example, "Purchase this product now and earn 5 Reward Points." If you have **Show Message on Category/List Pages** enabled, the same message also appears on product cards in category listings.

When a customer selects a variant (size, color, etc.), the point message updates automatically to reflect the variant's price without a page reload.

<!-- SCREENSHOT: Product page showing the points earn message below the price -->

### Cart Page

In the cart, two messages appear:

1. **Earn message** — shows how many points the entire current order will earn upon completion.
2. **Redeem message** — if the customer has enough points (meeting the minimum balance requirement), this message appears along with an **Apply Discount** button. Clicking the button applies the points discount to the order total immediately. The discount appears as a line item labeled with the Points Suffix.

If the customer does not yet have enough points to meet the minimum, a message explains how many points are required and how many they currently hold.

The customer can remove the applied discount at any time by clicking the **X** link next to the discount line.

<!-- SCREENSHOT: Cart page showing the earn message, redeem message, and the "Apply Discount" button -->

### My Profile — Rewards Tab

Logged-in customers can view their points history at **My Profile** **->** **Rewards**. The tab shows:

- The current remaining balance (for example, "Remaining 145 Reward Points").
- A transaction log listing recent activity: points earned for signups, points earned per order, points redeemed on orders, points recovered from failed orders, and any manual adjustments made by the store administrator.
- Only the most recent transactions are shown, up to the **Point History Limit** you configured.

<!-- SCREENSHOT: The Rewards tab on the customer My Profile page showing balance and transaction list -->

---

## Admin: Managing Customer Points

Administrators can view and adjust every customer's point balance from **J2Commerce** **->** **Apps** **->** navigate to the **Points and Rewards** app, then use the toolbar buttons at the top of the screen.

<!-- SCREENSHOT: The Points and Rewards admin screen with toolbar buttons: "Manage Points", "Points Log", "Add User Points" -->

### Manage Points (Balance List)

The default view shows a searchable, sortable list of all customers with a point record. Each row displays the customer name, email address, and current point balance. You can type a new value directly into the **Points** field for any row and click **Update** to save the change. The adjustment is logged as "Points adjusted by store administrator" in the customer's history.

<!-- SCREENSHOT: The Manage Points list with an inline balance field and Update button -->

### Points Log

Click **Points Log** in the toolbar to see every point transaction across all customers. You can filter the log by customer name or email and also filter to show only a specific user's history. Columns include customer, event description, point change (positive for credits, negative for debits), and date.

<!-- SCREENSHOT: The Points Log list filtered by a single customer showing their full transaction history -->

### Add User Points

Click **Add User Points** in the toolbar to manually grant points to a customer. Select a registered Joomla user from the user selector, enter the number of points to add (positive to add, negative to deduct), then click **Save**. The transaction is recorded in the customer's history as an administrator adjustment.

<!-- SCREENSHOT: The Add User Points form showing the User selector and Points field -->

---

## Email Tags

The following tags can be placed in any J2Commerce email template and will be replaced with live values for that order:

| Tag | Replaced with |
|-----|---------------|
| `[EARN_POINT]` | The number of points the customer earned on this order |
| `[REDEEM_POINT]` | The number of points the customer redeemed on this order |
| `[TOTAL_POINT]` | The customer's total point balance after this transaction |

These tags are only populated in emails sent after an order has been confirmed and the earned points have been credited.

---

## What's New in J2Commerce 6

If you used Points and Rewards with J2Store, here is what has changed in the J2Commerce 6 version:

- **Native Joomla 6 architecture** — the plugin uses Joomla's DI container, subscriber-based events, and namespaced PHP classes. No FOF framework dependency.
- **Vanilla JavaScript** — all frontend interactions (applying the discount, updating the point message on variant change) use ES6+ fetch and DOM APIs. jQuery is not required.
- **Bootstrap 5 admin UI** — the Manage Points list, Points Log, and Add User Points screens use the standard Joomla 6 searchtools layout and Bootstrap 5 table classes.
- **Security hardening** — all admin AJAX actions require a valid CSRF token and a `core.manage` permission check. Point history records are stored separately from the order record so they cannot be altered by re-saving an order.
- **Automatic update notifications** — the plugin registers with the J2Commerce update server, so new releases appear directly in your Joomla Update Manager.

---

## Troubleshooting

### Points are not credited after a customer places an order

**Cause:** The order status that J2Commerce assigns after payment does not match any status in the **Add points if order status matches** list.

**Solution:**

1. Go to **J2Commerce** **->** **Apps** **->** **Points and Rewards** **->** **Points Settings**.
2. Check the **Add points if order status matches** field.
3. Go to **J2Commerce** **->** **Sales** **->** **Orders** and open the order in question.
4. Note the current order status shown on the order detail page.
5. Add that status to the **Add points if order status matches** field and save.

### The "Apply Discount" button does not appear in the cart

**Cause 1:** The customer's current point balance is below the **Minimum Points Required** threshold.

**Solution:** Either lower the **Minimum Points Required** value in the plugin settings or direct the customer to earn more points before redeeming.

**Cause 2:** The customer has zero points on record.

**Solution:** Verify in **Manage Points** that the customer has a balance. If they placed orders that should have credited points, check whether those orders reached a status listed in **Add points if order status matches**.

### The earn message does not appear on the product page

**Cause 1:** The plugin's **Enable points and rewards for all products** setting is **No** and the individual product's **Points Setting** is still set to **Use Global Settings**, meaning no points are configured for that product.

**Solution:** Either set **Enable points and rewards for all products** to **Yes** globally, or open the product and set its **Points Setting** to **Override Global Settings** and enter an earn amount.

**Cause 2:** The individual product has **Points Setting** set to **Disable Points for This Product**.

**Solution:** Open the product, go to the **Points and Rewards** tab, and change **Points Setting** to **Use Global Settings** or **Override Global Settings**.

### Redeemed points were not returned after an order was cancelled

**Cause:** The cancellation order status is not in the **Recover points if order status matches** list.

**Solution:** Go to the plugin settings and add **Cancelled** (or whichever status your cancellation flow uses) to the **Recover points if order status matches** field.

---

## Related Topics

- [Apps Overview](../index.md)
- [Orders](../../sales/index.md)
- [Coupon Codes](../../sales/index.md)
