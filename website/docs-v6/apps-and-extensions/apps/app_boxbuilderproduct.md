---
title: "Box Builder Product"
sidebar_label: "Box Builder Product"
sidebar_position: 20
description: "Let customers build their own product boxes by selecting items from a curated list — with live pricing, inventory management, and order detail tracking."
---

# Box Builder Product

The Box Builder Product app adds a new product type to J2Commerce that lets customers assemble their own box from a list of selectable items. You define the box size and the products that go inside it, and customers mix and match until the box is full before adding it to their cart. This is ideal for subscription boxes, gift sets, sample packs, and any store where customers benefit from choosing their own combination of items.

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

## Setting Up Options

## Purchase and Download

The Box Builder Product app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate the Box Builder Product app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the ZIP file or use the Install from URL option.

<!-- SCREENSHOT: Joomla extension install screen -->

## Enable the Plugin

Once installed, enable the plugin:

**Option A:** Go to **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing Box Builder Product -->

Search for **Box Builder Product**, click the **X** to enable it. The X turns into a green checkmark when enabled.

## Configure the Plugin

Click on **Box Builder Product** to open the configuration.

### Basic Settings Tab

| Setting                        | Description                                                                                                                                                                                                                                | Default                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| **Inventory Handling**         | Controls where stock is tracked. **Handle at the items in the box builder** deducts stock from each individual sub-product when an order is placed. **Handle at the box builder level** deducts stock from the box builder product itself. | Handle at the box builder level |
| **Tax Based On**               | Controls how tax is calculated. **Individual Products** calculates tax separately for each sub-product in the box. **Box Builder Product** applies the tax profile of the box builder product to the total price.                          | Box Builder Product             |
| **Display Avg Price Per Each** | When enabled, a line appears below the product price showing the total item count and the average cost per item.                                                                                                                           | No                              |
| **Unit Title (Single)**        | The label for a single item in the "price per each" display (e.g., `cookie`, `piece`). Only shown when **Display Avg Price Per Each** is enabled.                                                                                          | *(empty)*                       |
| **Unit Title (Plural)**        | The label used when there is more than one item (e.g., `cookies`, `pieces`). Falls back to the singular label if left empty. Only shown when **Display Avg Price Per Each** is enabled.                                                    | *(empty)*                       |
| **Template Type**              | The CSS framework used by your Joomla template. Choose **Bootstrap 5** or **UIkit** to match your template, or leave on **Auto Detect** to let the plugin choose automatically.                                                            | Auto Detect                     |
| **Display Item Details**       | When enabled, a **Box Builder Items** tab appears on the product detail page showing each sub-product's image and description.                                                                                                             | No                              |
| **Display Item Contains**      | When enabled, an aggregated summary of all box contents appears at the top of the product detail page.                                                                                                                                     | Yes                             |
| **Display Mobile Sticky Bar**  | When enabled, a sticky Add-to-Cart bar appears at the bottom of the screen on mobile devices.                                                                                                                                              | Yes                             |
| **Debug Mode**                 | Writes detailed log entries to the Joomla log file and browser console. Disable in production.                                                                                                                                             | No                              |

<!-- SCREENSHOT: Plugin configuration screen showing Basic Settings -->

### Choosing an Inventory Handling Strategy

**Handle at the box builder level** is the simpler approach. Set a stock quantity on the box builder product itself, and that number decrements each time someone orders the box. Use this when you replenish boxes as a unit.

**Handle at the items in the box builder** tracks stock on each individual product inside the box. When an order is placed, the stock of every item the customer selected is reduced. Use this when your sub-products are sold both individually and inside boxes, and you need a single stock count across all sales channels.

### Tax Based On

**Box Builder Product** applies the tax profile you set on the box builder product to the full box price. This is straightforward and works well when all items in the box carry the same tax rate.

**Individual Products** calculates tax separately for each sub-product based on its own tax profile. The plugin distributes the box price proportionally across the sub-products and applies the correct rate to each portion. Use this when your box contains a mix of taxable and non-taxable items, or items with different tax rates.

## Create a Box Builder Product

### Step 1: Create the Sub-Products First

Box builder products are made up of existing J2Commerce products. Before creating a box, make sure each item you want to offer inside the box already exists as its own product.

**Supported sub-product types:**

- Simple products
- Configurable products
- Downloadable products

**Not supported as sub-products:**

- Variable product types (flexivariable, variable)
- Products that have options

### Step 2: Create a New Product

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click **New** in the toolbar.
3. Fill in the product **Title**, **SKU**, **Price**, and any other standard fields.
4. In the **Product Type** field, select **Box Builder**.
5. Click **Save** (do not close — you need to stay on the edit form to configure the box).

<!-- SCREENSHOT: Product edit form with Product Type set to Box Builder -->

### Step 3: Configure Box Builder Settings

After saving, scroll down to the **Box Builder Products** section. This section contains all the fields specific to the box builder product type.

<!-- SCREENSHOT: Box Builder Products section on the product edit form -->

#### Add Products to the Box

Use the **Search Product by SKU or Name** field to find and add products to the box. Type part of a product name or SKU and select from the results. Each product you add becomes a selectable item inside the box.

**Note:** Products you add here are the items customers can choose from when building their box — they are not fixed contents.

#### Box Builder Settings Fields

| Field                          | Description                                                                                                                                                                            | Default     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| **Box Size**                   | The total number of items a customer must select to complete the box. For example, a value of `4` means the customer picks 4 items.                                                    | 4           |
| **Product Order**              | The order in which available products appear on the product page. Options: **Added Order** (the order you added them), **Article Order (ASC/DESC)**, **Title (ASC/DESC)**, **Random**. | Added Order |
| **Product Display**            | How the selectable products are shown. **Grid** displays 3 products per row. **List** shows products in a single-column list.                                                          | Grid        |
| **Show Qty Field**             | When enabled, a quantity input appears next to each selectable product so customers can choose how many of that item to add at once.                                                   | No          |
| **Display Avg Price Per Each** | Override the global plugin setting for this specific product. When enabled, shows a per-item price breakdown.                                                                          | No          |
| **Unit Title (Single)**        | Override the singular unit label for this product's price-per-each display.                                                                                                            | *(empty)*   |
| **Unit Title (Plural)**        | Override the plural unit label for this product's price-per-each display.                                                                                                              | *(empty)*   |

### Step 4: Save the Product

Click **Save** or **Save & Close** to apply your changes.

<!-- SCREENSHOT: Saved box builder product showing the Box Builder Items section populated -->

## How It Works on the Frontend

When a customer views a box builder product page:

1. An interactive **Build Your Own Box** interface appears showing all available products.
2. The customer browses the product list (in grid or list view) and clicks **ADD** to select items.
3. A progress indicator shows how many items have been selected out of the required box size (for example, "2 / 4 Products Selected").
4. When the box is full, the **Add to Cart** button becomes active.
5. If the customer tries to add more items than the box holds, a "Your box is full!" message appears.
6. On mobile, a sticky bar at the bottom of the screen shows the current selection count and the Add to Cart button.

<!-- SCREENSHOT: Box builder product page showing available products and selection progress -->

When the customer adds the box to their cart:

- The cart displays the box builder product name along with a list of all selected items and their quantities.
- The order confirmation, invoice, and admin order detail view all show the full contents of each box.

## Display Conditions

The box builder interface appears on the product page when:

- The plugin is enabled in **J2Commerce** -> **Apps**.
- The product type is set to **Box Builder**.
- At least one product has been added to the box builder list.

The **Box Builder Items** tab on the product page appears when:

- **Display Item Details** is set to **Yes** in the plugin settings.
- The box builder product has items configured.

The **Contains** summary appears when:

- **Display Item Contains** is set to **Yes** in the plugin settings.

## Tips

- **Set box size to match your packaging** — if your physical box holds exactly 6 items, set the box size to `6` so customers always fill it completely.
- **Use Grid display for visual products** — if your sub-products have good product images, Grid view shows them to better effect.
- **Use List display for text-heavy products** — List view gives more space for product names and descriptions.
- **Enable Show Qty Field for variety packs** — this lets customers choose three of one flavour and one of another without clicking ADD multiple times.
- **Test the "box full" behaviour** — add one more item than the box size allows to confirm the interface blocks the addition and shows the correct message.
- **Use individual tax handling for mixed boxes** — if your box contains items with different tax rates (for example, food and non-food items), set **Tax Based On** to **Individual Products**.
- **Enable Debug Mode during setup** — if something is not behaving as expected, enable debug mode and check the Joomla log for detailed information.

## Troubleshooting

### Box Builder Interface Does Not Appear on the Product Page

**Cause:** Plugin is disabled, or the product type is not set to Box Builder.

**Solution:**

1. Go to **J2Commerce** -> **Apps**.
2. Verify **Box Builder Product** shows a green checkmark (enabled).
3. Edit the product and confirm **Product Type** is set to **Box Builder**.
4. Verify at least one product has been added to the box builder list in the **Box Builder Products** section.

### No Products Show in the Box Builder Interface

**Cause:** No products have been added to this box, or all added products are unpublished.

**Solution:**

1. Edit the box builder product.
2. Scroll to the **Box Builder Products** section.
3. Use the search field to find and add products.
4. Confirm each product you added is published in **J2Commerce** -> **Catalog** -> **Products**.

### Customers Cannot Complete the Box

**Cause:** The box requires more items than are available to select, or some products are out of stock.

**Solution:**

1. Edit the box builder product and check the **Box Size** value.
2. Count the number of products added to the box builder list.
3. Ensure the box size does not exceed the number of available selectable products.
4. If **Inventory Handling** is set to **Handle at the items in the box builder**, check that each sub-product has sufficient stock.

### Stock Is Not Being Deducted After an Order

**Cause:** **Inventory Handling** is set to **Handle at the box builder level**, but stock is not set on the box builder product itself.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Box Builder Product**.
2. Note the current **Inventory Handling** setting.
3. If set to **Handle at the box builder level**: edit the box builder product and enable stock management with a quantity on the product itself.
4. If set to **Handle at the items in the box builder**: edit each sub-product and enable stock management with a quantity on each individual product.

### Cart Does Not Show the Selected Items

**Cause:** This can occur if the box was added to the cart before the plugin was enabled.

**Solution:**

1. Have the customer clear their cart and add the box builder product again.
2. Confirm the plugin is enabled before the customer builds their box.

### Tax Is Calculating Incorrectly

**Cause:** **Tax Based On** may not match your product setup.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Box Builder Product**.
2. Review the **Tax Based On** setting.
3. If your box contains products with different tax rates, switch to **Individual Products**.
4. If all items in the box have the same tax rate, **Box Builder Product** is simpler and more predictable.

## Related Topics

- [Product Types](../products/product-types.md) — Overview of all product types in J2Commerce
- [Apps Overview](./index.md) — Other available J2Commerce apps
- [Tax Profiles](../taxes/index.md) — Setting up tax profiles for products
