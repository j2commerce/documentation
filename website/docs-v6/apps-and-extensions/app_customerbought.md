---
title: "Customers Also Bought"
sidebar_label: "Customers Also Bought"
sidebar_position: 16
description: "Display a 'Customers Also Bought' section on product pages with checkbox selection and a bulk add-to-cart button."
---

# Customers Also Bought

The Customers Also Bought app displays a curated row of related products directly on your product detail pages. Shoppers can select the products they want using checkboxes, see a running total, and add everything to the cart in one click. You choose which products appear for each product by searching and selecting them in the product editor.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

The Customers Also Bought app is a premium add-on available from the J2Commerce extension directory.

**Step 1:** Go to [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate the Customers Also Bought app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the ZIP file or use the Install from URL option.

<!-- SCREENSHOT: Joomla extension install screen -->

## Enable the Plugin

Once installed, enable the plugin:

**Option A:** Go to **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing Customers Also Bought -->

Search for **Customers Also Bought**, click the **X** to enable it. The X turns into a green checkmark when enabled.

## Configure the Plugin

Click on **Customers Also Bought** to open the configuration.

### Basic Settings Tab

| Setting | Description | Default |
| ------- | ----------- | ------- |
| **Template Style** | Selects the visual template used to render the section. Choose **bootstrap5** for Bootstrap 5 templates or **uikit** for UIkit templates. | bootstrap5 |
| **Section Title** | Heading displayed above the product row. Leave blank to use the default "Customers Also Bought" heading. | _(blank)_ |
| **Display Position** | Where on the product page the section appears. See position options below. | Before Upsells |
| **Maximum Products** | The maximum number of associated products to display (1–20). Out-of-stock products are excluded automatically. | 6 |
| **Show Price** | Show the product price on each card in the section. | Yes |
| **Show Discount Badge** | Show a discount badge when a product has a special price lower than the regular price. | Yes |
| **Button Text** | Label for the purchase button. Leave blank to use the default "Purchase Together" label. | _(blank)_ |
| **Button CSS Class** | CSS class applied to the purchase button. Change this to match your theme's button style. | `btn btn-primary` |
| **Debug Mode** | Write detailed logs to `logs/app_customerbought.php`. Enable only for troubleshooting — disable on live sites. | No |

<!-- SCREENSHOT: Plugin configuration screen showing Basic Settings tab -->

#### Display Position Options

| Position | Where the section appears |
| -------- | ------------------------- |
| **Before Upsells** | Above the upsells block on the product page |
| **Before Cross-sells** | Above the cross-sells block on the product page |
| **After Add to Cart** | Immediately below the add-to-cart button |

### Responsive Display Tab

Control how many product cards appear per row at each screen width. The section automatically switches to a swiper carousel when the number of products exceeds the cards-per-row setting for the current screen size.

| Setting | Screen Width | Default |
| ------- | ------------ | ------- |
| **Cards per Row (XS)** | Below 576 px | 1 |
| **Cards per Row (SM)** | 576 px and above | 2 |
| **Cards per Row (MD)** | 768 px and above | 3 |
| **Cards per Row (LG)** | 992 px and above | 4 |
| **Cards per Row (XL)** | 1200 px and above | 4 |
| **Cards per Row (XXL)** | 1400 px and above | 5 |

<!-- SCREENSHOT: Plugin configuration screen showing Responsive Display tab -->

## Configure Products

After enabling the plugin, open any product to assign the related products that will appear in the section.

### Step 1: Edit a Product

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click on a product to edit it.
3. Scroll to the **Apps** section and click the **Customers Also Bought** tab.

<!-- SCREENSHOT: Product edit form showing the Customers Also Bought tab in the Apps section -->

### Step 2: Search for Products to Associate

The **Search Products** field lets you find products by name or SKU.

1. Start typing a product name or SKU into the **Search Products** field (minimum 2 characters).
2. Select the product from the dropdown list that appears.
3. The product is added to the table immediately.

The admin interface checks stock status as each product is added:

- **In Stock** — Green badge. The product will display on the frontend.
- **Out of Stock** — Yellow badge with a warning message. The product is saved but will not appear to shoppers until it is back in stock.

<!-- SCREENSHOT: Customers Also Bought admin table showing product rows with stock badges -->

### Step 3: Remove Products

Click the trash icon in the **Delete** column to remove a product from the list. The change takes effect when you save the product.

### Step 4: Save the Product

Click **Save** or **Save & Close** to apply your changes.

## How It Works

When a customer views a product page:

1. J2Commerce checks if the Customers Also Bought plugin is enabled.
2. The plugin reads the list of associated products configured on that product.
3. Products that are published and in stock are loaded (up to the **Maximum Products** limit).
4. The primary product card and all associated product cards are rendered in a row.
5. Each card has a checkbox — all are checked by default. The primary product's checkbox is always checked and cannot be unchecked.
6. A total bar at the bottom updates in real time as shoppers check or uncheck products.
7. Clicking the purchase button adds all checked products to the cart in one request.

<!-- SCREENSHOT: Product page showing the Customers Also Bought section with checkboxes and total bar -->

## Display Conditions

The section appears on the frontend when:

- The plugin is enabled in **J2Commerce** -> **Apps**.
- At least one published, in-stock associated product is configured on the product.
- The current product is published and visible.

Out-of-stock products are filtered out at display time — they are not shown to shoppers even if they remain in the admin list.

## Tips

- **Keep the list focused** — 3 to 5 associated products perform better than a long list. Shoppers are less likely to add multiple items when there are too many choices.
- **Choose complementary products** — Accessories, consumables, or products commonly purchased together work best. Avoid unrelated items.
- **Match your theme** — Use **Button CSS Class** to apply your theme's button styles if the default `btn btn-primary` does not match your design.
- **Use Debug Mode sparingly** — Enable **Debug Mode** only when investigating display issues. Disable it after troubleshooting to avoid log file growth.
- **Stock is checked automatically** — You do not need to remove out-of-stock products from the list manually. They are filtered out at display time and restored automatically when stock is available again.

## Troubleshooting

### The Section Does Not Appear on the Product Page

**Cause:** Plugin is disabled or no in-stock associated products are configured.

**Solution:**

1. Go to **J2Commerce** -> **Apps**.
2. Verify **Customers Also Bought** shows a green checkmark (enabled).
3. Edit the product and open the **Customers Also Bought** tab in the Apps section.
4. Verify at least one product is listed and shows a green **In Stock** badge.
5. If all products show **Out of Stock**, the section is suppressed until at least one product is back in stock.

### The Section Appears in the Wrong Location

**Cause:** The **Display Position** setting does not match your preferred location.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Customers Also Bought**.
2. Change the **Display Position** setting to the desired location.
3. Click **Save**.

### All Associated Products Show Out of Stock

**Cause:** Stock is depleted and manage stock is enabled for those products.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Edit each out-of-stock product and check the stock settings on the **Variants** tab.
3. If stock management is not needed, disable **Manage Stock** on the variant. The product will be treated as always in stock.
4. Alternatively, add different associated products that are currently in stock.

### Products Are Not Appearing in the Search Dropdown

**Cause:** The search query is too short or the product is unpublished.

**Solution:**

1. Type at least 2 characters to trigger the search.
2. Verify the product you are searching for is published in **J2Commerce** -> **Catalog** -> **Products**.
3. Try searching by SKU if the product name search returns no results.

### The Total Does Not Update When Checking or Unchecking Products

**Cause:** A JavaScript error is preventing the checkbox handler from running.

**Solution:**

1. Open your browser's developer tools (F12) and check the Console tab for errors.
2. Verify that no other plugin or template JavaScript is interfering with the page.
3. Clear the Joomla cache: **System** -> **Clear Cache**.
4. Enable **Debug Mode** on the plugin and check `logs/app_customerbought.php` for errors.

### The Purchase Button Style Does Not Match My Template

**Cause:** The default `btn btn-primary` class does not match your theme's button CSS.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Customers Also Bought**.
2. Update the **Button CSS Class** field with the correct CSS class for your theme.
3. Click **Save** and refresh the product page.

## Related Topics

- [Product Types](../products/product-types.md) - Product configuration overview
- [Apps Overview](./index.md) - Other available J2Commerce apps
