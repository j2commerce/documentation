---
title: "Bundle Products"
sidebar_label: "Bundle Products"
sidebar_position: 20
description: "Create bundle products that group multiple items into a single purchasable product with a combined price."
---

# Bundle Products

The Bundle Products app adds a new product type to J2Commerce that lets you sell multiple products together as a single unit. Customers add one item to the cart and receive everything inside the bundle. You set the bundle price directly on the product — independently of the individual item prices — which makes it easy to offer value deals, starter kits, or gift sets.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

:::tip

**IMPORTANT**: Once you have configured the settings for any product, check to see if those specific items are showing up on the frontend. If they are not, (ie: filters, cross-sells, price, title, etc), then go to your **store** menu and **show or hide** the items you want to control on the frontend. Go to **Menu -> Main Menu -> Store -> Product** tab

:::

![](/img/simple-store-menu.webp)

:::info

NOTE: Before you can begin setting up a Variant, you need to create all of the **Options** that the product will offer. &#x20;

:::

## Setting Up Options (if needed)

There are **two** ways you can access Options.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Options**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Catalog -> Options**

![Adding new options](/img/options.webp)

Select **New** to create a new option. (for example, Name: `Size`, Type: `select`).

Add the option values (Small, Medium, Large) to the option

Repeat for each option you plan to use (e.g., create a separate "Color" option with values Red, Blue, Green).

You only need to do this once. The same options can be reused across many products.

**Option Name:** The label customers see on the product page, for example, "Size" or "Color".

**Option Unique Name:** An internal identifier (no spaces) used to distinguish options with the same display name.

**Type:** Controls the input style shown to customers. See the table below for all types.

### Option Types

**Select:** A dropdown menu

**Radio:** Clickable button group

**Checkbox:** Multiple-choice checkboxes

**Color:** Color swatch buttons

**Text:** A single-line text input

**Textarea:** A multi-line text input

**Date / Datetime / Time:** A date or time picker

**Number:** A numeric input field

**File / Image:** A file upload input

**Email / URL:** A formatted text input

:::tip

**IMPORTANT:** For Select, Radio, Checkbox, and Color option types, add your option values in the **Option Values** section that appears below the type field. Each value needs a name, and optionally an image.

:::

![](/img/option-value.webp)

## Purchase and Download

The Bundle Products app is a premium add-on available from the J2Commerce extension directory.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate the Bundle Products app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the ZIP file or use the Install from URL option.

<!-- SCREENSHOT: Joomla extension install screen -->

## Enable the Plugin

Once installed, enable the plugin:

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing Bundle Products -->

Search for **Bundle Products**, click the toggle to enable it. The toggle turns green when enabled.

## Configure the Plugin

Click on **Bundle Products** to open the configuration.

### Basic Settings Tab

| Setting                    | Description                                                                                                                                         | Default                                      |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Inventory Handling**     | Controls where stock is tracked — at the bundle level or at each item inside the bundle.                                                            | Bundle level                                 |
| **Tax Based On**           | Determines how tax is calculated — against the bundle as a whole, or against each individual product in the bundle.                                 | Bundle Product                               |
| **Display Price Per Item** | Show a "Contains X items (price / item)" breakdown below the bundle price on the product page.                                                      | No                                           |
| **Singular Item Label**    | The word used when the bundle contains one item (for example: item, piece, unit). Only appears when **Display Price Per Item** is enabled.          | *(empty — falls back to "item")*             |
| **Plural Items Label**     | The word used when the bundle contains multiple items (for example: items, pieces, units). Only appears when **Display Price Per Item** is enabled. | *(empty — falls back to the singular label)* |
| **Template Framework**     | The CSS framework used for bundle product templates. Auto-detect reads from the active menu item subtemplate setting.                               | Auto-detect                                  |
| **Display Item Details**   | Show each bundled item's image and description in a dedicated section on the product detail page.                                                   | No                                           |
| **Debug Mode**             | Write debug messages to the Joomla log directory. Disable this on live sites.                                                                       | No                                           |

<!-- SCREENSHOT: Plugin configuration screen showing Basic Settings -->

#### Inventory Handling Options

| Option                                | Behavior                                                                                                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Handle at the bundle level**        | Stock is tracked on the bundle product itself. When a bundle sells, only the bundle's own stock counter decreases.                                                |
| **Handle at the items in the bundle** | Stock is tracked on each product inside the bundle. When a bundle sells, J2Commerce reduces the stock of every included item according to the quantities you set. |

#### Tax Based On Options

| Option                  | Behavior                                                                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Bundle Product**      | Tax is calculated once against the total bundle price using the bundle product's tax profile.                                           |
| **Individual Products** | Tax is calculated separately for each item in the bundle using each item's own tax profile, then the amounts are combined on the order. |

## Create a Bundle Product

With the plugin enabled and configured, you can create bundle products from the product catalog.

### Step 1: Create a New Product

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click **New** in the toolbar.
3. Fill in the product **Title** and any other general fields.

<!-- SCREENSHOT: New product form showing the Product Type field -->

### Step 2: Select the Bundle Product Type

In the product form, locate the **Product Type** field and select **Bundle** from the dropdown list.

The product form updates to show the bundle-specific configuration under the **Apps** tab.

### Step 3: Set the Bundle Price

1. Click the **Pricing** tab.
2. Enter the bundle price in the **Price** field.

This price is what customers pay for the entire bundle. It is independent of the prices of the individual items inside the bundle.

<!-- SCREENSHOT: Pricing tab with the price field highlighted -->

### Step 4: Add Products to the Bundle

1. Click the **Apps** tab.
2. You will see the **Bundle Products** section with a search field and a note that only simple, configurable, and downloadable products without options can be bundled.

<!-- SCREENSHOT: Apps tab showing the Bundle Products section -->

1. In the **Search Product** field, type the name or SKU of a product you want to include.
2. Select the product from the suggestions that appear.
3. The product appears as a row in the bundle table.
4. Repeat to add more products.

Each row in the bundle table shows:

| Column           | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| **Product name** | The name of the included product with its regular price    |
| **Quantity**     | How many units of this product are included in each bundle |
| **Remove**       | Click the trash icon to remove the product from the bundle |

To include more than one unit of the same product, add it multiple times. J2Commerce automatically groups duplicate entries and sums the quantities.

### Step 5: Configure Per-Item Price Display (Optional)

Below the product list you can control how the price-per-item breakdown appears on the storefront:

| Field                      | Description                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Display Price Per Item** | Toggle this to **Yes** to show a "Contains X items (price / item)" line below the bundle price.                 |
| **Singular Item Label**    | The label for one item (for example: item, piece). Appears only when Display Price Per Item is enabled.         |
| **Plural Items Label**     | The label for multiple items (for example: items, pieces). Appears only when Display Price Per Item is enabled. |

<!-- SCREENSHOT: Per-item price display fields in the Apps tab -->

### Step 6: Configure Inventory (Optional)

1. Click the **Inventory** tab.
2. If **Inventory Handling** in the plugin settings is set to **Handle at the bundle level**, enter the available stock quantity on the bundle product itself.
3. If **Inventory Handling** is set to **Handle at the items in the bundle**, stock is read from each individual item — no separate stock entry is needed on the bundle.

### Step 7: Save the Product

Click **Save** or **Save & Close** to apply your changes.

The bundle product is now active in your catalog. Customers can add it to the cart as a single item.

## How It Works

When a customer views a bundle product page:

1. J2Commerce loads the bundle product and its configured price.
2. If **Display Price Per Item** is enabled, a breakdown such as "Contains 3 items ($9.99 / item)" appears below the main price.
3. If **Display Item Details** is enabled in the plugin settings, a **Bundled Items** section appears on the product page showing each included item's image, name, SKU, quantity, and regular price.
4. The customer clicks **Add to Cart** — the entire bundle is added as one line item.
5. In the cart, the bundle line item expands to list each included product and its quantity.
6. On orders and invoices, the bundle appears as a single product line with the bundled items listed underneath it.

<!-- SCREENSHOT: Product detail page showing bundle price and bundled items section -->

<!-- SCREENSHOT: Cart showing a bundle product line item with its contents listed -->

## Display Conditions

Bundled item details appear on the product page when:

- The plugin is enabled in **J2Commerce** -> **Apps**.
- **Display Item Details** is set to **Yes** in the plugin settings.
- The bundle product has at least one item added to it.

The price-per-item breakdown appears when:

- **Display Price Per Item** is set to **Yes** at the individual product level (in the **Apps** tab).
- The bundle contains at least one product.

## Tips

- **Price your bundle below the sum of its parts** — the bundle price is completely independent of item prices, so you have full control over the discount you offer.
- **Use bundle-level inventory for simplicity** — if you do not need per-item stock tracking, keep **Inventory Handling** set to **Handle at the bundle level** and manage one stock number.
- **Use item-level inventory for shared products** — if the same product appears in multiple bundles or is also sold individually, use **Handle at the items in the bundle** so all sales draw from the same stock pool.
- **Only compatible product types can be bundled** — only simple, configurable, and downloadable products without options can be added. Variable products and other bundle products cannot be nested inside a bundle.
- **Singular and plural labels default to "item"** — if you leave the label fields empty, the plugin uses the built-in fallback label. Set custom labels to match your product category (for example: "bottle", "bottles" or "lesson", "lessons").

## Troubleshooting

### Bundle Product Type Not Available in the Product Type Dropdown

**Cause:** The Bundle Products plugin is disabled.

**Solution:**

1. Go to **J2Commerce** -> **Apps**.
2. Verify **Bundle Products** shows a green enabled status.
3. If not, click the toggle to enable it.
4. Save and refresh the product form.

### Products Do Not Appear in the Bundle Search

**Cause:** The product is the wrong type, or it has product options configured.

**Solution:**

1. Confirm the product you are searching for is a simple, configurable, or downloadable type.
2. Confirm the product does not have options (variants, attributes) configured.
3. Verify the product is published.

### Bundle Item Details Section Not Showing on Product Page

**Cause:** **Display Item Details** is disabled in the plugin settings.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Bundle Products**.
2. Set **Display Item Details** to **Yes**.
3. Click **Save**.
4. Clear the Joomla cache: **System** -> **Clear Cache**.

### Stock Not Reducing Correctly After a Sale

**Cause:** Mismatch between the **Inventory Handling** plugin setting and where stock is entered.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Bundle Products**.
2. Check the **Inventory Handling** setting.
3. If set to **Handle at the bundle level**, enter stock on the bundle product's **Inventory** tab.
4. If set to **Handle at the items in the bundle**, enter stock on each individual product included in the bundle — not on the bundle product itself.

### Tax Calculation Appears Incorrect

**Cause:** The **Tax Based On** setting does not match your store's tax setup.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Bundle Products**.
2. Review the **Tax Based On** setting.
3. Use **Bundle Product** if the bundle has a single tax profile applied to its total price.
4. Use **Individual Products** if each item in the bundle belongs to a different tax class and needs separate tax treatment.

### Per-Item Price Not Displaying

**Cause:** **Display Price Per Item** is not enabled on the product.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Edit the bundle product.
3. Click the **Apps** tab.
4. Set **Display Price Per Item** to **Yes**.
5. Click **Save**.

## Related Topics

- [Product Types](../products/product-types.md) — Overview of all product types in J2Commerce
- [Inventory Management](../products/inventory.md) — Stock tracking and backorder settings
- [Tax Profiles](../taxes/tax-profiles.md) — Assigning tax profiles to products
- [Apps Overview](./index.md) — Other available J2Commerce apps
