---
title: "Orders"
sidebar_label: "Orders"
sidebar_position: 2
description: "View and manage customer orders in J2Commerce"
---

# Orders

The Orders page displays all customer orders with comprehensive filtering and management capabilities. Track orders from placement through delivery, update statuses, and communicate with customers about their purchases.

## Requirements

- PHP 8.3.0+
- Joomla 6.x
- J2Commerce 6.x

## Accessing Orders

1. Go to **J2Commerce** → **Dashboard**.
2. Click **Orders** in the Sales section.

<!-- TEMP_IMG_OFF ![](/img/orders-list.webp) -->
Alternatively: **Components** → **J2Commerce** → **Orders**.

## Orders List View

The orders list displays all orders with the following columns:

| Column | Description |
|--------|-------------|
| **Order ID** | Unique order identifier (e.g., `1774713249236`) |
| **Invoice** | Invoice number with prefix (e.g., `INV-00123`) |
| **Customer** | Billing name (first name + last name) |
| **Email** | Customer email address |
| **Status** | Current order status with colour badge |
| **Total** | Order total amount in the transaction currency |
| **Payment** | Payment method used |
| **Date** | Order creation date and time |

### Filter Options

Use the filter bar to narrow down orders:

| Filter | Description |
|--------|-------------|
| **Search** | Search by order ID, customer name, email, or product name |
| **Status** | Filter by order status (Confirmed, Pending, Shipped, etc.) |
| **Payment Method** | Filter by payment plugin (Cash, PayPal, Stripe, etc.) |
| **User** | Filter by registered customer |
| **Coupon Code** | Find orders that used a specific coupon |
| **Amount Range** | Filter by order total (minimum/maximum) |
| **Order ID Range** | Filter by order ID range |
| **Date Range** | Filter by order date (From/To) |

<!-- TEMP_IMG_OFF ![](/img/orders-filters.webp) -->
## Order Statuses

J2Commerce includes default order statuses that represent the order lifecycle:

| Status | Description |
|--------|-------------|
| **Confirmed** | Order payment confirmed, ready for processing |
| **Processed** | Order being prepared for shipment |
| **Failed** | Payment failed or order could not be completed |
| **Pending** | Order placed, awaiting payment confirmation |
| **New** | New order, not yet processed |
| **Cancelled** | Order cancelled |
| **Shipped** | Order shipped to customer |
| **Delivered** | Order delivered to customer |

### Status Workflow

A typical order follows this progression:

1. **New** → Customer places order
2. **Pending** → Awaiting payment (for offline payments)
3. **Confirmed** → Payment received
4. **Processed** → Order being prepared
5. **Shipped** → Order dispatched
6. **Delivered** → Customer received order

Orders may also transition to **Cancelled** at any stage.

## Order Detail View

Click an order ID to view the full order details:

### Order Information

The order detail page shows:

| Section | Information |
|---------|-------------|
| **Order Summary** | Order ID, invoice number, status, date, totals |
| **Billing Address** | Name, company, address, phone, tax number |
| **Shipping Address** | Name, company, address, phone |
| **Products** | Item name, SKU, quantity, price, tax, total |
| **Order Totals** | Subtotal, shipping, taxes, discounts, grand total |
| **Payment** | Payment method, transaction ID, status |
| **Customer Note** | Note provided by customer at checkout |

<!-- TEMP_IMG_OFF ![](/img/orders-detail.webp) -->
### Order Actions

From the order detail view:

| Action | Description |
|--------|-------------|
| **Edit** | Modify order details (addresses, items) |
| **Update Status** | Change order status with optional notification |
| **Print Invoice** | Generate printable invoice |
| **Print Packing Slip** | Generate packing slip for fulfilment |
| **Resend Email** | Resend order confirmation to customer |

## Updating Order Status

1. Open the order you want to update.
2. Click **Update Status** in the toolbar.
3. Select the new **Order Status**.
4. Add a **Comment** (optional).
5. Check **Notify Customer** to send an email notification.
6. Click **Save**.

<!-- TEMP_IMG_OFF ![](/img/orders-status-update.webp) -->
## Order History

Each order maintains a history of status changes and notes. The History tab shows:

- Date and time of each status change
- User who made the change
- Previous and new status
- Any comments added

## Bulk Actions

From the orders list, select multiple orders to:

- **Change Status** — Update status for selected orders
- **Delete** — Remove selected orders (use with caution)

## Tips

- **Use filters** to find orders quickly — filter by date range, status, or customer
- **Enable email notifications** when updating status to keep customers informed
- **Check order history** before making changes to understand the order's journey
- **Use the search** to find orders by product name, SKU, or customer email
- **Export orders** using the Reports feature for accounting purposes

## Troubleshooting

### Order Shows Wrong Total

**Cause:** Tax configuration or rounding issues.

**Solution:**

1. Go to **J2Commerce** → **Localisation** → **Tax Rules**.
2. Verify the tax rules are configured correctly for the customer's location.
3. Check that tax rates have the correct percentage values.
4. Review the order items in the order detail view to see per-item totals.

### Customer Not Receiving Status Emails

**Cause:** Email settings or spam filters.

**Solution:**

1. Go to **J2Commerce** → **Setup** → **Configuration** → **Email** tab.
2. Verify the sender email address is valid.
3. Check Joomla's global configuration → **Server** → **Mail Settings**.
4. Ask the customer to check their spam/junk folder.
5. Test by resending the confirmation email from the order detail page.

### Order Stuck in Pending Status

**Cause:** Payment not confirmed for offline payment methods.

**Solution:**

1. Open the order and check the payment method.
2. For offline payments (bank transfer, cash), manually update the status.
3. Click **Edit** → Update status to **Confirmed** → **Save**.
4. Notify the customer that their order is being processed.

### Cannot Find an Order by Email

**Cause:** Order placed as guest with different email, or search filter issue.

**Solution:**

1. Clear all filters by clicking **Reset**.
2. Search using just the email address without additional filters.
3. Check if the order is filtered by status — select "All" statuses.
4. Use the **User** filter to search for registered customers by username.

## Related Topics

- [Customers](customers.md) — View customer details and order history
- [Coupons](coupons.md) — Create discount codes for promotions
- [Tax Rules](../taxation/tax-rules.md) — Configure tax calculation