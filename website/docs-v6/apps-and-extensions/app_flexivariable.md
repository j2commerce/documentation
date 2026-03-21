# Flexible Variable Products

The Flexible Variable product type lets you build variants one at a time by picking exact combinations of your product options. Instead of J2Commerce automatically generating every possible combination, you hand-pick the specific option combinations you actually sell — each becoming a fully independent variant with its own SKU, price, stock level, weight, and dimensions.

This is ideal for products where not every option combination makes sense. For example, a t-shirt that only comes in Red/Large and Blue/Small — not every colour paired with every size.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

**IMPORTANT**: Once you have configured the settings for any product, check to see if those specific items are showing up on the frontend. If they are not, (ie: filters, cross-sells, price, title, etc), then go to your **store** menu and **show or hide** the items you want to control on the frontend. Go to **Menu -> Main Menu -> Store -> Product** tab

![](/img/simple-store-menu.webp)

## Enable the Plugin

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

![](/img/gift-wrap-apps.webp)

Search for **Flexible Variable**, click the **X** to enable it. The X turns into a green checkmark when enabled.

![](/img/flex-enable.webp)

## Configure the Plugin

Click on the **Flexible Variable** Plugin title to open the configuration screen.

### Basic Settings Tab

- **Option Required:** When enabled, customers must select all options before they can add the product to the cart. Prevent "Add to Cart" clicks without a variant being selected.

Enable **Option Required** when your product page relies on customers choosing a specific variant before purchasing. This prevents orders from coming in without a valid option selection.

Leave it disabled if you set a default variant on every product, since a default variant is pre-selected for the customer on page load.

- **Show Price Range:** When enabled, product listing pages display a price range (e.g., "$10.00 – $25.00") spanning the lowest and highest variant prices, rather than a single price.

Enable **Show Price Range** when your variants have significantly different prices and you want shoppers browsing the category list to see the full spread. If all your variants are priced the same, leave this disabled to show a clean single price instead.

<!-- SCREENSHOT: Flexible Variable plugin configuration screen -->

## How Flexible Variable Differs from Variable Products

Understanding the difference helps you choose the right product type.

| Feature              | Variable Product                      | Flexible Variable Product                   |
| -------------------- | ------------------------------------- | ------------------------------------------- |
| Variant creation     | Auto-generates all combinations       | You manually add each combination           |
| Control              | Less control                          | Full control                                |
| Best for             | Products where all combinations exist | Products where only some combinations exist |
| Price per variant    | Yes                                   | Yes                                         |
| Stock per variant    | Yes                                   | Yes                                         |
| Shipping per variant | Yes                                   | Yes                                         |

Use a **Flexible Variable** when you sell a curated set of option combinations rather than a full grid.

## Create a Flexible Variable Product

Every product needs a Joomla article. The article title becomes the product name and the article content is the description shoppers read on the product page.

There are multiple ways to navigate to the location for creating a new product.

**Option a:** Go to **Content** **-> Articles -> New**.

![](/img/simple.webp)

**Option b:** Or go to **J2Commerce -> Catalog  -> Product -> New**

![](/img/simple-product1.webp)

### Creating a New Product

<!-- SCREENSHOT: Product edit form with product type dropdown highlighted -->

### Step 2: Set the Product Type

In the **J2Commerce** tab of the product edit form, locate the **Product Type** field and select **Flexible Variable**.

<!-- SCREENSHOT: Product Type dropdown showing "Flexible Variable" selected -->

After selecting Flexible Variable, a new **Variants** section appears below the standard product fields.

### Step 3: Add Product Options

Before creating variants, you need to define the options customers will choose from (such as Colour or Size).

1. Scroll to the **Options** section on the product edit form.
2. Click **Add Option**.
3. Select an existing option (such as "Colour") from the dropdown, or create a new one.
4. Repeat for each option dimension your product has.
5. Click **Save** to save the product before adding variants.

<!-- SCREENSHOT: Product Options section showing two options configured -->

### Step 4: Add Variants

With options configured and the product saved, scroll to the **Flexible Variable Variants** section.

1. For each option, select the specific value you want for this variant (e.g., Colour: Red, Size: Large).
2. Click the **Add Variant** button.
3. J2Commerce creates a new variant row in the accordion below.
4. Repeat to add as many variants as your product needs.

<!-- SCREENSHOT: Add Variant area showing option dropdowns and the Add Variant button -->

### Step 5: Configure Each Variant

Each variant appears as a collapsible accordion row. Click a variant row to expand it and fill in its details.

<!-- SCREENSHOT: Expanded variant accordion row showing General, Shipping, and Inventory columns -->

#### General Settings

| Field                  | Description                                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **SKU**                | The unique stock-keeping unit code for this variant. Filled automatically with a default value; update it to match your inventory system. |
| **UPC**                | Optional barcode or Universal Product Code for this variant.                                                                              |
| **Regular Price**      | The selling price for this specific variant. Each variant can have a different price.                                                     |
| **Advanced Pricing**   | Opens a modal to configure sale prices, customer-group pricing, or date-range discounts for this variant.                                 |
| **Pricing Calculator** | Controls how the price is calculated at checkout. Leave set to **Standard** unless you have a custom pricing calculator plugin.           |

#### Shipping Settings

| Field               | Description                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Enable Shipping** | Set to **Yes** if this variant is a physical item that requires shipping. Set to **No** for digital or service variants. |
| **Length Class**    | The unit of measurement for dimensions (e.g., centimetre, inch).                                                         |
| **Dimensions**      | The physical dimensions of the variant: length, width, and height. Used by shipping rate calculators.                    |
| **Weight**          | The physical weight of this variant.                                                                                     |
| **Weight Class**    | The unit of measurement for weight (e.g., kilogram, pound).                                                              |

#### Inventory Settings

| Field                    | Description                                                                | Options                                          |
| ------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------ |
| **Manage Stock**         | Track stock levels for this variant.                                       | Yes / No                                         |
| **Quantity**             | Current stock quantity for this variant.                                   | Any whole number                                 |
| **Allow Backorders**     | Whether customers can order this variant when it is out of stock.          | Do Not Allow / Allow / Allow but Notify Customer |
| **Stock Status**         | Manual override for whether the variant shows as in-stock or out-of-stock. | In Stock / Out of Stock                          |
| **Notify Quantity**      | Send a low-stock notification when quantity drops to this number.          | Any number, or enable "Use Store Configuration"  |
| **Quantity Restriction** | Limit how many units a customer can purchase in one order.                 | Yes / No                                         |
| **Max Sale Quantity**    | Maximum units per order, when Quantity Restriction is enabled.             | Any number, or enable "Use Store Configuration"  |
| **Min Sale Quantity**    | Minimum units per order.                                                   | Any number, or enable "Use Store Configuration"  |

#### Image Settings

| Field                           | Description                                                                                                           |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Use Main Image as Thumbnail** | When enabled, the product's main image is used as the thumbnail for this variant instead of a variant-specific image. |

### Step 6: Set a Default Variant

One variant should be marked as the default. The default variant's price and stock status are displayed when the product page first loads before a customer makes a selection.

To set the default:

1. Expand the variant you want to be the default.
2. Click the **Set Default** button in the variant's action area.
3. The variant row shows a green **Default** badge.

To change the default, click **Unset Default** on the current default variant, then **Set Default** on another.

<!-- SCREENSHOT: Variant accordion row showing the Default badge and Set Default / Unset Default buttons -->

### Step 7: Delete Variants

To remove a single variant, expand its row and click the **Delete** button. You will be asked to confirm before the variant is removed.

To remove all variants at once, use the **Delete All Variants** button at the top of the Variants section. This action cannot be undone.

### Step 8: Save the Product

Click **Save** or **Save & Close** to save all variant settings.

<!-- SCREENSHOT: Save button in the toolbar -->

## How It Works on the Storefront

When a customer views a Flexible Variable product page:

1. J2Commerce displays the product options as dropdown menus or radio buttons.
2. As the customer changes their selection, the page updates via AJAX — no page reload.
3. The price, SKU, stock status, weight, and product image update instantly to reflect the selected variant.
4. If **Option Required** is enabled and no matching variant exists for the chosen combination, the customer cannot add the item to the cart.
5. If a default variant is set, the page pre-loads that variant's details on first visit.

<!-- SCREENSHOT: Product detail page showing option dropdowns and variant price updating -->

## Tips

- **Name your variants clearly** — Use descriptive SKU values so you can identify variants at a glance in the accordion list.
- **Set a default variant** — Always mark one variant as default so the product page shows a meaningful price on first load.
- **Use consistent units** — Pick one length class and one weight class and stick to it across all variants in a product.
- **Add only the combinations you actually sell** — The whole point of Flexible Variable is to avoid phantom combinations; don't add variants you don't intend to fulfil.
- **Save before adding variants** — Always save the product after adding options and before clicking Add Variant. This ensures option values are available for selection.

## Troubleshooting

### Variants Section Does Not Appear

**Cause:** The Flexible Variable plugin is disabled, or the product type is not set to Flexible Variable.

**Solution:**

1. Go to **J2Commerce** -> **Apps**.
2. Verify **Flexible Variable** shows a green checkmark.
3. Edit the product and confirm the **Product Type** field is set to **Flexible Variable**.
4. Save the product and reload the edit form.

### Variant Price Does Not Update on the Product Page

**Cause:** A matching variant does not exist for the selected option combination, or the default variant is not set.

**Solution:**

1. Edit the product and verify a variant exists for the combination the customer is selecting.
2. Confirm the variant is saved (it appears in the accordion list).
3. Set a default variant so a price is shown on initial page load.

### "Add to Cart" Button Is Disabled

**Cause:** **Option Required** is enabled and the customer has not completed a valid option selection, or the selected combination has no matching variant.

**Solution:**

1. Ensure a variant exists for every combination you intend to sell.
2. If some combinations should not be available, do not add them — customers selecting those values will see the button remain inactive, which is the expected behaviour.
3. If all combinations should be purchasable, disable **Option Required** in **J2Commerce** -> **Apps** -> **Flexible Variable**.

### Stock Quantity Not Decrementing After Orders

**Cause:** **Manage Stock** is set to **No** on the variant.

**Solution:**

1. Edit the product and expand the affected variant row.
2. Set **Manage Stock** to **Yes**.
3. Enter the correct current **Quantity**.
4. Save the product.

### Variant Image Not Swapping When Option Is Selected

**Cause:** No variant-specific image has been uploaded, or **Use Main Image as Thumbnail** is enabled, causing the main image to override the variant image.

**Solution:**

1. Expand the variant row and locate the **Image** section.
2. Upload a variant-specific image using the image uploader.
3. If you want the product's main image to stay as-is regardless of variant selection, enable **Use Main Image as Thumbnail**.
4. Save the product.

## Related Topics

- [Product Types](../products/product-types.md) — Overview of all product types in J2Commerce
- [Apps Overview](./index.md) — Other available J2Commerce apps
- [Inventory Management](../products/inventory.md) — Managing stock levels and backorders
