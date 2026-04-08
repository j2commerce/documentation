---
title: "Sample Data Plugin"
sidebar_label: "Sample Data"
sidebar_position: 10
description: "Quickly populate your J2Commerce store with sample products, customers, and orders for testing and demonstration."
---

# Sample Data Plugin

The J2Commerce Sample Data plugin lets you populate a new store with realistic sample products, customer accounts, and orders. This is essential for testing payment gateways, evaluating shipping options, and demonstrating store features before adding real inventory.

## Installation

This plugin ships with J2Commerce 6 and is available immediately after installation. To enable it:

1. Go to **System** -> **Manage** -> **Extensions**.
2. Search for **J2Commerce - Sample Data**.
3. Click the checkbox next to it and then click **Enable** in the toolbar.

<!-- SCREENSHOT: System > Manage > Extensions filtered to show "J2Commerce - Sample Data" plugin -->

## What Sample Data Creates

When you run the sample data plugin, it creates the following types of content:

### Categories

Sample product categories organized into a hierarchy with parent and child categories:

| Category Type | Examples |
|---------------|----------|
| **Parent Categories** | Electronics, Clothing, Home & Garden, Sporting Goods, Books & Media |
| **Child Categories** | Laptops & Computers, Smartphones & Tablets, Men's Clothing, Women's Clothing, Kitchen & Dining |

Each category includes SEO-friendly aliases and can be nested up to two levels deep.

### Manufacturers

Brand names associated with products:

| Manufacturer Examples |
|----------------------|
| TechNova, StyleCraft, EcoHome, ActivePro, ReadWell Publishing, GadgetPrime, UrbanWear, GreenNest, SportMax, MediaHouse |

### Products

The plugin creates several product types with realistic names, descriptions, and pricing:

| Product Type | Description |
|--------------|-------------|
| **Simple Products** | Standard products with a single SKU and fixed price |
| **Variable Products** | Products with variants (size, color, etc.) that have different SKUs and prices |
| **Configurable Products** | Products with customer-selectable options |
| **Flexivariable Products** | Advanced variable products with flexible attribute combinations |
| **Downloadable Products** | Digital products with file downloads |

Each product includes:

- Product name and description
- Main image (SVG placeholder)
- Price and special pricing
- Stock quantity
- Category assignment
- Manufacturer association

### Customers

Sample customer accounts with realistic names, email addresses, and complete address data:

| Customer Data | Examples |
|---------------|----------|
| **Names** | James Smith, Mary Johnson, John Williams, Patricia Brown |
| **Locations** | New York, Los Angeles, Chicago, Houston, Toronto, London, Berlin, Sydney |
| **Addresses** | Complete billing and shipping addresses with zone and country |

### Orders

Complete orders with:

- Order status history (Pending, Confirmed, Shipped, Delivered)
- Multiple products per order
- Customer billing and shipping addresses
- Payment method records
- Order totals and tax calculations

### Coupons and Vouchers

Discount codes for testing the checkout process:

| Type | Description |
|------|-------------|
| **Coupons** | Percentage or fixed-amount discounts applied at checkout |
| **Gift Vouchers** | Fixed-value vouchers that can be applied as payment |

---

## How to Run Sample Data

### Step 1: Access the Sample Data Screen

1. Go to **J2Commerce** -> **Dashboard**.
2. Click the **Sample Data** tab in the left sidebar.

<!-- SCREENSHOT: J2Commerce Dashboard showing Sample Data tab highlighted -->

:::note
The Sample Data option only appears when the J2Commerce Sample Data plugin is enabled.
:::

### Step 2: Choose a Profile

The plugin offers three preset profiles with different amounts of data:

| Profile | Categories | Products | Customers | Orders | Coupons | Vouchers |
|---------|------------|----------|-----------|--------|---------|----------|
| **Minimal** | 3 | 7 (5 simple + 2 variable) | 5 | 10 | 2 | 2 |
| **Standard** | 5 | 17 (10 simple + 5 variable + 2 configurable) | 20 | 50 | 5 | 3 |
| **Full** | 10 | 100 (40 simple + 25 variable + 15 configurable + 10 flexivariable + 10 downloadable) | 100 | 500 | 15 | 5 |

**Choose the profile that fits your needs:**

- **Minimal** — For quick testing on local development environments. Creates enough data to verify functionality without cluttering your store.
- **Standard** — For thorough testing and demonstration. A good balance between realism and manageability.
- **Full** — For performance testing and comprehensive evaluation. Creates a large dataset that mimics a real store.

<!-- SCREENSHOT: Sample Data screen showing the three profile options with radio buttons -->

### Step 3: Run the Installation

1. Select your preferred profile by clicking the radio button.
2. Click **Install Sample Data**.
3. A progress bar appears showing four steps:
   - **Step 1:** Categories and manufacturers created
   - **Step 2:** Products and images created
   - **Step 3:** Customers and orders created
   - **Step 4:** Coupons and vouchers created
4. Wait for the progress bar to reach 100%. A success message confirms completion.

<!-- SCREENSHOT: Progress bar during sample data installation showing 4 steps -->

Each step must complete successfully before the next begins. If any step fails, an error message displays with details.

---

## After Installation

### Verify the Data

After sample data installation completes:

1. Go to **J2Commerce** -> **Catalog** -> **Products** to see the sample products.
2. Go to **J2Commerce** -> **Sales** -> **Orders** to see sample orders.
3. Go to **J2Commerce** -> **Customers** to see sample customer accounts.
4. Go to **J2Commerce** -> **Marketing** -> **Coupons** to see discount coupons.

<!-- SCREENSHOT: Products list showing sample products from various categories -->

### Test Your Store

Use the sample data to:

- Add products to the cart and test checkout flow
- Apply coupon codes at checkout
- View order history as different sample customers
- Test search and filtering functionality
- Verify category navigation and product listing pages

---

## Removing Sample Data

:::danger
Removing sample data permanently deletes all products, categories, customers, orders, and coupons created by the plugin. This cannot be undone.
:::

To remove sample data:

1. Go to **J2Commerce** -> **Dashboard**.
2. Click the **Sample Data** tab.
3. Click **Remove Sample Data**.
4. Confirm the removal when prompted.

The plugin identifies sample data by a special tag (`j2commerce-sample-data`) in the database, ensuring only sample data is removed without affecting your real products or orders.

---

## Tips

- Run sample data on a fresh installation for the cleanest results. Adding sample data to a store with existing products may cause category or naming conflicts.
- Use the **Minimal** profile for quick testing during development. Switch to **Standard** or **Full** when demonstrating to clients or testing performance.
- Sample products use SVG placeholder images. Replace them with your own product images for realistic demonstrations.
- Customer accounts created by sample data use realistic email patterns (e.g., `james.smith@example.com`). These are not real addresses, but you may want to verify no real customers use similar addresses.
- Orders created by sample data are marked with order statuses that progress through the typical order workflow. This lets you test status change notifications and filters.

---

## Troubleshooting

### Sample Data option does not appear in Dashboard

**Cause:** The plugin may be disabled or the J2Commerce component is not properly installed.

**Solution:**

1. Go to **System** -> **Manage** -> **Extensions**.
2. Search for **J2Commerce - Sample Data**.
3. If the plugin exists but shows as **Disabled**, click to enable it.
4. If the plugin is missing, reinstall the J2Commerce component package.

### Installation fails at Step 1

**Cause:** Database permission issues or existing data conflicts.

**Solution:**

1. Verify your database user has CREATE and INSERT permissions.
2. Check that the `#__j2commerce_*` tables exist (J2Commerce should be fully installed).
3. Try removing any existing sample data before running again.
4. Check the Joomla error log at `administrator/logs/error.php` for specific database errors.

### Products appear but have no images

**Cause:** The media folder permissions may prevent image copying.

**Solution:**

1. Verify the `media/plg_sampledata_j2commerce/images/` directory is readable.
2. Check that `images/` directory in your Joomla root is writable.
3. The plugin uses SVG placeholder images. Ensure your server serves SVG files with the correct MIME type (`image/svg+xml`).

### Sample data appears incomplete

**Cause:** A step failed silently or the browser timed out during installation.

**Solution:**

1. Remove existing sample data using the **Remove Sample Data** button.
2. Increase your PHP timeout settings (`max_execution_time` and `request_terminate_timeout` for PHP-FPM).
3. For the **Full** profile, ensure at least 120 seconds timeout.
4. Re-run sample data installation.

### Cannot log in as sample customers

**Cause:** Sample customer accounts are created with randomly generated passwords that are not displayed.

**Solution:**

Sample customer accounts are designed for order data and address testing, not for logging in. To test the customer login experience:

1. Go to **Users** -> **Manage**.
2. Find a sample customer account.
3. Click to edit and set a known password.
4. Log in from the frontend with that email and password.

---

## Related Topics

- [Products](../../catalog/products.md) — manage products after sample data is loaded
- [Orders](../../sales/orders.md) — view and manage sample orders
- [Coupons](../../marketing/coupons.md) — configure discount codes
- [Order Statuses](../../localisation/order-statuses.md) — customize order workflow states