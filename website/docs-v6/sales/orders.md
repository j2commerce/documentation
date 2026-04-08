# Orders

The Orders page displays all customer orders with comprehensive filtering and management capabilities. Track orders from placement through delivery, update statuses, and communicate with customers about their purchases.

## Requirements

- PHP 8.3.0+
- Joomla 6.x
- J2Commerce 6.x

## Locating Orders

Orders are managed from the J2Commerce Dashboard.

There are **three** ways you can access the orders.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Sales-> Orders**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Sales -> Orders**

**Option C:** Go to **Components** on the left sidebar **-> J2Commerce -> Orders**

![](/img/orders.webp)

## Orders List View

![](/img/orders-title.webp)

The orders list displays all orders with the following columns:

**Order:** Unique order identifier (e.g., `1774713249236`)

**Date:** Order creation date and time

**Customer:** Billing name (first name + last name) and email address

**Total:** Order total amount in the transaction currency

**Payment:** Payment method used

**Status:** Current order status with colour badge

**Actions:** you can change the status and notify customer of the change without opening the order

### Filter Options

![](/img/orders-title1.webp)

Use the filter bar to narrow down orders:

**Search:** Search by order ID, customer name, email, or product name

**Status:** Filter by order status (Confirmed, Pending, Shipped, etc.)

**Payment Method:** Filter by payment plugin (Cash, PayPal, Stripe, etc.)

**User:** Filter by registered customer

**Coupon Code:** Find orders that used a specific coupon

**Amount Range:** Filter by order total (minimum/maximum)

**Order ID Range:** Filter by order ID range

**Date Range:** Filter by order date (From/To)

<!-- ![](/img/orders-filters.webp) -->

## Order Statuses

![](/img/orders-status.webp)

J2Commerce includes default order statuses that represent the order lifecycle:

**Confirmed:** Order payment confirmed, ready for processing

**Processed:** Order being prepared for shipment

**Failed:** Payment failed or order could not be completed

**Pending:** Order placed, awaiting payment confirmation

**New:** New order, not yet processed

**Cancelled:** Order cancelled

**Shipped:** Order shipped to customer

**Delivered:** Order delivered to customer

:::info

**NOTE**: To create a new Order Status, go to **J2Commerce -> Setup -> Order Statuses**

:::

### Status Workflow

![](/img/orders-order.webp)

A typical order follows this progression: The progression is shown inside the order

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

![](/img/orders-order1.webp)

The order detail page shows:

**Order Summary:** Order ID, invoice number, status, date, totals

**Billing Address:** Name, company, address, phone, tax number

**Shipping Address:** Name, company, address, phone

**Products:** Item name, SKU, quantity, price, tax, total

**Order Totals:** Subtotal, shipping, taxes, discounts, grand total

**Payment:** Payment method, transaction ID, status

**Customer Note:** Note provided by customer at checkout

<!-- ![](/img/orders-detail.webp) -->

### Order Actions

![](/img/orders-order2.webp)

From the order detail view:

**Update Status:** Change order status with optional notification

**Print Invoice:** Generate a printable invoice

**Print Packing Slip:** Generate packing slip for fulfilment

**Resend Email:** Resend order confirmation to customer

## Updating Order Status

1. Open the order you want to update.
2. Click **Update Status** in the toolbar.
3. Select the new **Order Status**.
4. Add a **Comment** (optional).
5. Check **Notify Customer** to send an email notification.
6. Click **Save**.

![](/img/orders-status-update.webp)

## Order History

Each order maintains a history of status changes and notes. The History tab shows:

- Date and time of each status change
- The user who made the change
- Previous and new status
- Any comments added

## Bulk Actions

The **Bulk Actions** button will be hidden until at least **one** order is chosen. From the orders list, select multiple orders to:

- **Change Status** — Update status for selected orders
- **Delete** — Remove selected orders (use with caution)

![](/img/orders-bulk.webp)

## Tips

- **Use filters** to find orders quickly — filter by date range, status, or customer
- **Enable email notifications** when updating the status to keep customers informed
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

**Cause:** Order placed as a guest with a different email, or search filter issue.

**Solution:**

1. Clear all filters by clicking **Reset**.
2. Search using just the email address without additional filters.
3. Check if the order is filtered by status — select "All" statuses.
4. Use the **User** filter to search for registered customers by username.
