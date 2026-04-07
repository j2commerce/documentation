---
title: "Customers"
sidebar_label: "Customers"
sidebar_position: 3
description: "View registered customers and their order history in J2Commerce"
---

# Customers

The Customers page displays all store customers who have placed orders or created accounts. View customer contact information, order history, and total spending.

## Requirements

- PHP 8.3.0+
- Joomla 6.x
- J2Commerce 6.x

## Accessing Customers

1. Go to **J2Commerce** → **Dashboard**.
2. Click **Customers** in the Sales section.

<!-- ![](/img/customers-list.webp) -->

Alternatively: **Components** → **J2Commerce** → **Customers**.

## Customers List View

The customers list displays customer information aggregated from orders and addresses:

| Column         | Description                                 |
| -------------- | ------------------------------------------- |
| **Name**       | Customer full name (first name + last name) |
| **Email**      | Customer email address                      |
| **Company**    | Company name (if provided)                  |
| **City**       | Customer city                               |
| **Country**    | Customer country                            |
| **Phone**      | Primary phone number                        |
| **Registered** | Date of first order                         |

### Customer Information Source

J2Commerce builds the customer list from:

- Order billing addresses
- Order shipping addresses
- Registered Joomla user accounts

Customers are grouped by email address — if the same email appears in multiple orders, they are shown as a single customer entry.

### Filter Options

| Filter      | Description                             |
| ----------- | --------------------------------------- |
| **Search**  | Search by name, email, company, or city |
| **Country** | Filter customers by country             |

<!-- ![](/img/customers-filters.webp) -->

## Customer Detail View

Click on a customer's name to view their details:

### Customer Information Tab

| Field              | Description                  |
| ------------------ | ---------------------------- |
| **First Name**     | Customer first name          |
| **Last Name**      | Customer last name           |
| **Email**          | Customer email address       |
| **Company**        | Company name (if applicable) |
| **Phone 1**        | Primary phone number         |
| **Phone 2**        | Secondary phone number       |
| **Address Line 1** | Street address               |
| **Address Line 2** | Additional address info      |
| **City**           | City/town                    |
| **Postcode**       | Postal/ZIP code              |
| **Country**        | Country                      |
| **Zone/State**     | State/province               |

<!-- ![](/img/customers-detail.webp) -->

### Order History Tab

View all orders placed by this customer:

- Order ID with link to order detail
- Order date
- Order status
- Order total
- Payment method

## Customer Actions

### View Customer Orders

1. Open the customer detail page.
2. Click the **Order History** tab.
3. Click any order ID to view the full order.

### Search for a Customer

1. Use the **Search** field in the filter bar.
2. Enter a name, email, company name, or city.
3. Press **Enter** or click the search icon.

### Filter by Country

1. Click the **Country** dropdown.
2. Select one or more countries.
3. The list updates automatically.

## Understanding Customer Data

### Guest vs Registered Customers

| Type           | Data Source           | Features                                  |
| -------------- | --------------------- | ----------------------------------------- |
| **Guest**      | Order billing address | Limited to order information              |
| **Registered** | Joomla user + orders  | Full profile, order history, address book |

### Customer Addresses

Customers can have multiple addresses:

- **Billing address** — Where invoices are sent
- **Shipping address** — Where orders are delivered

These may differ for each order. The customer list shows the most recent address.

## Tips

- **Search by email** for the most accurate customer matching
- **Filter by country** to find regional customer bases for targeted marketing
- **Check order history** before customer support calls to understand purchase patterns
- **Use the customer note** field to track support interactions (available in order detail)

## Troubleshooting

### Customer Appears Multiple Times

**Cause:** Different email addresses used for different orders.

**Solution:**

1. This is expected behaviour — each unique email creates a separate customer entry.
2. Customers may check out with different email addresses.
3. If you need to merge customer records, use a third-party CRM extension.

### Customer Not Found in List

**Cause:** No orders placed yet, or search filters are too restrictive.

**Solution:**

1. Clear all filters using the **Reset** button.
2. Remember that the Customers list only shows customers who have placed orders.
3. For customers who registered but haven't ordered, check **Users** in Joomla's admin.

### Wrong Customer Information Shown

**Cause:** Multiple addresses exist for the customer.

**Solution:**

1. Open the customer's order history.
2. The customer list shows the most recently used address.
3. Check individual orders to see addresses used for each purchase.

### Cannot Edit Customer Details

**Cause:** Customer data is derived from orders, not a standalone customer record.

**Solution:**

1. For registered customers: Edit the Joomla user in **Users** → **Manage**.
2. For guest customers: Information is stored per-order and cannot be changed centrally.
3. Address changes should be made during checkout or in the customer's account area on the frontend.

## Related Topics

- [Orders](orders.md) — Manage customer orders
- [Coupons](coupons.md) — Create customer-specific discount codes
