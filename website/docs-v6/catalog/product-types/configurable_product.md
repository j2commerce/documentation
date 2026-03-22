---
title: "Configurable Products"
sidebar_label: "Configurable Products"
sidebar_position: 5
description: "Learn how to create a Configurable product in J2Commerce — a product that presents customers with selectable options such as size, color, or material before adding to cart."
---

# Configurable Products

A Configurable product lets customers choose from a set of options — such as size, color, or material — before adding the product to their cart. You define which options appear on the product page, and J2Commerce calculates any price or weight adjustments for each choice automatically.

Configurable products are ideal when you sell a single product that comes in multiple variations, but those variations do not each need their own separate SKU record with full inventory tracking per combination. If you need per-combination inventory, consider the Variable product type instead.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

The Configurable product type is built into J2Commerce and requires no additional installation or purchase.

## How It Works

The Configurable product type uses a two-level system: **Options** and **Option Values**.

- An **Option** is the question you ask the customer, such as "Size" or "Color". Options are created in a shared library (**J2Commerce** -> **Catalog** -> **Options**) and can be reused across many products.
- An **Option Value** is one of the available choices within an option, such as "Small", "Medium", or "Large". Values are defined on the option itself, then assigned to each product individually with optional price or weight adjustments.

When a customer visits the product page, they see a selector (dropdown, radio buttons, checkboxes, or color swatches) for each option you have attached to the product. Selecting a value can adjust the displayed price and the item's shipping weight.

## Step 1: Create Your Options (If Needed)

Before creating a Configurable product, you need at least one Option defined. You can skip this step if Options already exist.

1. Go to **J2Commerce** -> **Catalog** -> **Options**.
2. Click **New** in the toolbar.
3. Fill in the option details:

<!-- SCREENSHOT: Options edit form showing Option Name, Type, and Option Values fields -->

| Field | Description | Required |
|-------|-------------|----------|
| **Option Name** | The label customers see on the product page, for example "Size" or "Color". | Yes |
| **Option Unique Name** | An internal identifier (no spaces) used to distinguish options with the same display name. | No |
| **Type** | Controls the input style shown to customers. See the table below for all types. | Yes |

**Option Types:**

| Type | Customer Experience |
|------|---------------------|
| **Select** | A dropdown menu |
| **Radio** | Clickable button group |
| **Checkbox** | Multiple-choice checkboxes |
| **Color** | Color swatch buttons |
| **Text** | A single-line text input |
| **Textarea** | A multi-line text input |
| **Date / Datetime / Time** | A date or time picker |
| **Number** | A numeric input field |
| **File / Image** | A file upload input |
| **Email / URL** | A formatted text input |

4. For Select, Radio, Checkbox, and Color option types, add your option values in the **Option Values** section that appears below the type field. Each value needs a name, and optionally an image.
5. Click **Save & Close**.

<!-- SCREENSHOT: Option Values section showing rows of values like Small, Medium, Large -->

## Step 2: Create the Configurable Product

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click **New** in the toolbar.
3. In the **Product Type** field on the main edit form, select **Configurable**.
4. Give the product a **Title** (for example, "Classic T-Shirt").
5. Add a description, images, and categories as you would for any other product.

<!-- SCREENSHOT: Product edit form with Product Type set to Configurable -->

The J2Commerce tab at the bottom of the product form contains all commerce-specific settings. It has the following tabs:

| Tab | What You Set Here |
|-----|-------------------|
| **General** | Visibility, SKU, UPC, manufacturer, vendor, tax profile, cart button text, CSS class |
| **Pricing** | Base price and advanced pricing rules |
| **Inventory** | Stock management, quantity, backorders, stock status, notifications |
| **Images** | Product thumbnail and gallery images |
| **Shipping** | Dimensions and weight for shipping calculations |
| **Options** | Which options are available on this product and their settings |
| **Filters** | Filter values for use in product list filtering |
| **Relations** | Related, up-sell, and cross-sell products |
| **Apps** | Settings contributed by installed app plugins |

## Step 3: Set the Base Price and Inventory

Click the **Pricing** tab inside the J2Commerce section.

<!-- SCREENSHOT: Pricing tab showing Regular Price field -->

| Field | Description |
|-------|-------------|
| **Regular Price** | The base price of the product before any option adjustments. |
| **Set Advanced Pricing** | Opens a pricing modal where you can set customer-group prices, sale prices, and quantity-based discounts. |

Click the **Inventory** tab to configure stock.

<!-- SCREENSHOT: Inventory tab showing Manage Stock, Quantity, and Backorders fields -->

| Field | Description | Options |
|-------|-------------|---------|
| **Manage Stock** | Whether J2Commerce tracks quantity for this product. | Yes / No |
| **Quantity** | The number of units in stock (only used when Manage Stock is Yes). | Any number |
| **Allow Backorders** | Whether customers can order when stock runs out. | No Allow / Allow / Allow but Notify |
| **Stock Status** | Manual override for the in-stock indicator. | In Stock / Out of Stock |
| **Notify Quantity** | Send a low-stock alert when quantity drops to this number. | Any number |

## Step 4: Attach Options to the Product

Click the **Options** tab inside the J2Commerce section.

<!-- SCREENSHOT: Options tab showing the option table with columns for Option Name, Parent Option, Required, and Ordering -->

If no options have been created yet, a message appears with a link to create one. Once options exist, you will see:

- A table listing the options already attached to this product.
- A dropdown at the bottom of the table to search and add more options.

### Add an Option

1. In the **Search and Add Variant Option** dropdown, select the option you want to add.
2. Click the **Add** button. The option appears as a new row in the table.
3. If you need to configure the option's values for this product, click the **Set Values** gear button on the option row. This opens a panel where you assign which values are available and set any price or weight adjustments.

<!-- SCREENSHOT: Options table showing a row with the Set Values button highlighted -->

### Configure Option Rows

Each option row in the table has these settings:

| Column | Description |
|--------|-------------|
| **Option Name** | The name of the option (read-only; edit it in **Options** management). Also shows the option type. |
| **Parent Option** | Links this option to a parent option so it only appears after a specific value is selected in the parent. Leave empty for an independent option. |
| **Required** | Whether the customer must make a selection before adding to cart. |
| **Ordering** | A number that controls the display order. Lower numbers appear first. |
| **Remove** | Click the trash icon to detach this option from the product. |

### Set Option Values for the Product

Click the **Set Values** button on an option row. A panel opens showing all values available for that option.

<!-- SCREENSHOT: Set Values panel showing the Add New Option section with Name, Price Prefix, Price, Weight Prefix, Weight, and Ordering columns -->

**Adding a value to the product:**

1. In the **Add New Option** section, select the value name from the dropdown.
2. If the parent option has values, select which parent values this value should appear under (multi-select). This controls dependent/conditional option behavior.
3. Set the **Price Prefix** (+ to add, - to subtract) and **Price** to adjust the product price when this value is selected.
4. Set the **Weight Prefix** and **Weight** to adjust the shipping weight when this value is selected.
5. Set an **Ordering** number.
6. Click **Create Option** to add the value.

**Managing existing values:**

The **Current Options** table shows all values already assigned to this product. You can:

- Edit the price, weight, and ordering for each value directly in the table.
- Click the star icon to set a value as the default (pre-selected when the product page loads).
- Click the trash icon to remove a value from this product.
- Click **Add All Option Values** to quickly assign every value from the global option to this product.
- Click **Save Changes** to save edits to the current values table.

<!-- SCREENSHOT: Current Options table showing values with price adjustments and a star icon for default -->

## Step 5: Save the Product

Click **Save** or **Save & Close** to apply all changes. The product is now live on your storefront for customers with the Configurable product options displayed.

## How Options Appear to Customers

On the product listing page, a collapsible summary of the selected options is shown. Clicking it expands the option selectors inline so customers can configure the product from the list view.

On the product detail page, each option appears in full. Depending on the option type, customers see a dropdown, radio buttons, checkboxes, or color swatches. Options marked as required display an asterisk and will prevent adding to cart until a value is chosen.

When a customer selects a value with a price adjustment, J2Commerce adds or subtracts that amount from the displayed price. For example, if the base price is $20.00 and the customer selects a size that has a +$5.00 adjustment, the price shown updates to $25.00.

If you set up a **Parent Option**, child options only appear after the customer selects a value in the parent. This is useful for multi-level selections such as choosing a material first, then seeing only the available colors for that material.

<!-- SCREENSHOT: Product detail page showing a product with dropdown and radio button options -->

## Tips

- **Create options once, reuse them everywhere.** The global Options library (**J2Commerce** -> **Catalog** -> **Options**) means you define "Size" once and attach it to any product that needs it.
- **Use the Set Values button to control what is available per product.** The global option might have ten sizes, but your product only needs five — only assign the relevant values.
- **Set a default value** using the star icon so the product page loads with the most popular choice already selected.
- **Use Parent Options for conditional selections** when one choice should change what the next option shows, such as selecting a frame style before choosing a compatible size.
- **Keep required options to a minimum.** Every required option is another step the customer must complete before they can add to cart. Only mark options as required when a selection is truly necessary to fulfill the order.
- **Ordering matters.** Set the ordering number on each option row to control the sequence in which options appear on the product page.

## Troubleshooting

### No Options Appear on the Product Page

**Cause:** No option values have been assigned to the product, or all options are detached.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Products** and edit the product.
2. Click the **Options** tab in the J2Commerce section.
3. Verify at least one option is listed in the table.
4. Click the **Set Values** button on the option and confirm values are listed in the **Current Options** table.
5. If the table is empty, add values using the **Add New Option** form or click **Add All Option Values**.
6. Click **Save Changes** in the panel, then **Save** the product.

### The "Set Values" Button Does Not Appear

**Cause:** The option type does not support predefined values. Text, Textarea, Date, Number, Email, URL, File, Image, and Time options collect freeform input from customers and do not use option values.

**Solution:** The Set Values button only appears for Select, Radio, Checkbox, and Color option types. If you need price adjustments, use one of these types instead.

### Customer Cannot Add to Cart — Required Option Error

**Cause:** The customer has not selected a value for a required option.

**Solution:** This is expected behavior. Required options must be selected before the Add to Cart action completes. Verify that the option your customers are seeing is intentionally marked as required. To make it optional, edit the product, go to the **Options** tab, and set **Required** to **No** for that option row, then save.

### Price Adjustment Is Not Showing on the Product Page

**Cause:** The product list or detail template may have option price display turned off in its menu item settings, or the price adjustment is set to $0.

**Solution:**

1. Edit the product and click the **Options** tab.
2. Click **Set Values** on the option.
3. Verify the **Price** field is non-zero and the **Price Prefix** is correct (+ or -).
4. Click **Save Changes**.
5. If prices still do not show, check the menu item for the product category or tag view and look for a setting related to displaying option prices.

### Parent Option Values Not Filtering Child Options Correctly

**Cause:** The child option values have not been linked to their parent values.

**Solution:**

1. Edit the product and click the **Options** tab.
2. Click **Set Values** on the child option (the one with a parent assigned).
3. In the **Current Options** table, find each child value and check the **Parent Option Name** column.
4. Select the correct parent option value(s) for each child value.
5. Click **Save Changes**.

## Related Topics

- [Options Management](../catalog/options.md) — Create and manage the global options library
- [Simple Products](../catalog/products/simple-product.md) — Create a basic product without options
- [Product Types Overview](../products/product-types.md) — Compare all available product types
