# Variable Products

A Variable product lets you sell one product in multiple variations — for example, a T-shirt in different sizes and colors. You define the options (Size, Color), assign which values each option can take, and J2Commerce automatically generates every possible combination as a separate **variant**. Each variant can have its own price, SKU, stock level, weight, and image.

Variable products are ideal when your product has clearly defined option combinations and you want each combination managed and tracked independently.

## How Variable Products Differ from Other Types

**Variable:** Best for products where every size/color combo is tracked separately

**Configurable:** Best for complex product families needing full independent catalog entries

**Flexivariable:** Best for products where combinations are not systematic

With Variable products, the variant generation is automatic — you do not create each combination by hand.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

:::tip

**IMPORTANT**: Once you have configured the settings for any product, check to see if those specific items are showing up on the frontend. If they are not, (ie: filters, cross-sells, price, title, etc), then go to your **store** menu and **show or hide** the items you want to control on the frontend. Go to **Menu -> Main Menu -> Store -> Product** tab

:::

![](/img/simple-store-menu.webp)

:::note

NOTE: Before you can begin setting up a Variant, you need to create all of the **Options** that the product will offer. &#x20;

:::

## Setting Up Options

There are **two** ways you can access Options.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Options**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Catalog -> Options**

![Adding new options](/img/options.webp)

Select **New** to create a new option. (for example, Name: `Size`, Type: `select`).

Add the option values (Small, Medium, Large) to the option

Repeat for each option you plan to use (e.g., create a separate "Color" option with values Red, Blue, Green).

You only need to do this once. The same options can be reused across many products.

Follow the steps in the Options Doc if you need help setting up new options. [https://docs.j2commerce.com/v6/catalog/creating-options](https://docs.j2commerce.com/v6/catalog/creating-options)

## Create a New Product Article

Variable products in J2Commerce are attached to Joomla articles.

There are **many** ways you can access products or articles.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Products ->** **New**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Products ->** **New**

**Option C:** Go to **Content -> Articles ->** **New**

![](/img/variant-product.webp)

## Setting up the Product

### Content tab

Give the article a title (e.g., "Classic T-Shirt").

Add your product description in the article body.

Set the article's **state** to **Published**.

Assign the article to the appropriate category.

Click **Save & Close**.

## Step 3: Add J2Commerce Details to the Article

1. Go to **Content** **-> Articles** and open the article you just created.
2. Scroll down to find the **J2Commerce** section below the article editor.
3. In the **Product Type** dropdown, select **Variable**.

<!-- SCREENSHOT: Article edit screen showing Product Type dropdown set to Variable -->

The variable product form appears with several tabs.

## Step 4: Fill In the General Tab

The **General** tab sets product-wide settings that apply to the whole product, not individual variants.

<!-- SCREENSHOT: Variable product General tab -->

| Field                     | Description                                                | Default |
| ------------------------- | ---------------------------------------------------------- | ------- |
| **Visible in Storefront** | Show or hide this product in the store catalog.            | Yes     |
| **Manufacturer**          | Link the product to a manufacturer.                        | —       |
| **Vendor**                | Assign to a vendor (if using multi-vendor).                | —       |
| **Tax Profile**           | Apply a tax profile for calculating taxes on this product. | —       |
| **Add to Cart Text**      | Customize the text on the add-to-cart button.              | —       |
| **Custom CSS Class**      | Add a CSS class to the product wrapper for custom styling. | —       |

Click **Save** after filling in the General tab. You must save the product before you can add options in the next step.

## Step 5: Upload Product Images

Click the **Images** tab to upload the main product image and any additional gallery images.

- The main image appears on the product detail page and in category listings.
- Gallery images appear in the image gallery on the product page.
- Individual variants can also have their own images — you set those later.

<!-- SCREENSHOT: Images tab showing main image upload and gallery -->

Click **Save** before moving to the Variants tab.

## Step 6: Add Options and Generate Variants

The **Variants** tab is where the core Variable product workflow happens. It has two sections: **Options** at the top and **Variants** below.

### Add Options to the Product

The Options section shows which options define the combinations for this product.

<!-- SCREENSHOT: Variants tab — Options section showing empty state and the option selector dropdown -->

1. In the **Search and Add Variant Option** dropdown, select the first option (e.g., "Size").
2. Click **Add**.
3. The option appears in the table. Repeat to add more options (e.g., "Color").

You can set an ordering number for each option to control which option the customer sees first.

**Note:** If no options exist yet, a warning appears with a link to create options. You must first create options under **J2Commerce** -> **Catalog** -> **Options**.

### Set Option Values for This Product

After adding an option that uses a dropdown (select), radio, or color type, a **Set Values** button appears next to it.

<!-- SCREENSHOT: Options table row showing the Set Values button next to the Size option -->

1. Click **Set Values** next to an option.
2. A panel opens showing all available values for that option.
3. Click **Add All** to include every value, or add values individually.
4. For each value you can set:

   - **Price adjustment** — add or subtract from the variant price (+ or -)
   - **Weight adjustment** — add or subtract from the variant weight (+ or -)
   - **Ordering** — control the display order of values
   - **Default** — mark one value as the pre-selected default (star icon)
5. Click **Save Changes** when done.
6. Repeat for every option on the product.

<!-- SCREENSHOT: Set Values panel showing option values with price and weight adjustments -->

### Generate Variants

Once options and their values are configured, J2Commerce can generate all possible combinations.

1. In the **Variants** section below the Options table, click **Generate Variants**.
2. Confirm the prompt. J2Commerce creates one variant for every combination of option values.

For example, if Size has 3 values (S, M, L) and Color has 2 values (Red, Blue), J2Commerce generates 6 variants: S/Red, S/Blue, M/Red, M/Blue, L/Red, L/Blue.

<!-- SCREENSHOT: Variants section after generation showing accordion list of generated variants -->

The variants appear as an accordion list. Each variant is collapsible.

## Step 7: Configure Individual Variants

Every generated variant can be expanded and configured independently. Click a variant row to expand it.

<!-- SCREENSHOT: A single variant accordion expanded showing all tabs -->

Each variant has four configuration sections:

### General (Price and SKU)

| Field                  | Description                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **SKU**                | Unique stock-keeping unit code for this variant. Leave blank to inherit from the product.                                        |
| **UPC**                | Universal product code (barcode number). Optional.                                                                               |
| **Regular Price**      | The selling price for this specific variant.                                                                                     |
| **Advanced Pricing**   | Open the advanced pricing panel to set quantity-based pricing, customer-group pricing, or date-range discounts for this variant. |
| **Pricing Calculator** | Choose the pricing method. Standard is the default.                                                                              |

<!-- SCREENSHOT: Variant General section showing SKU, price, and advanced pricing button -->

### Inventory

| Field                     | Description                                                                                                        | Default       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------- |
| **Manage Stock**          | Enable stock tracking for this variant.                                                                            | No            |
| **Quantity**              | Number of units in stock.                                                                                          | 0             |
| **Allow Backorders**      | Whether customers can buy this variant when out of stock. Options: Do Not Allow, Allow, Allow but Notify Customer. | Do Not Allow  |
| **Stock Status**          | Manually mark this variant as In Stock or Out of Stock (used when stock tracking is off).                          | In Stock      |
| **Notify Quantity**       | Send a low-stock notification when stock reaches this number.                                                      | Store default |
| **Quantity Restriction**  | Limit how many units a customer can buy per order.                                                                 | No            |
| **Maximum Sale Quantity** | Maximum units per order when quantity restriction is on.                                                           | Store default |
| **Minimum Sale Quantity** | Minimum units per order when quantity restriction is on.                                                           | Store default |

<!-- SCREENSHOT: Variant Inventory section showing manage stock toggle and quantity fields -->

### Shipping

| Field               | Description                                        | Default |
| ------------------- | -------------------------------------------------- | ------- |
| **Enable Shipping** | Whether this variant requires shipping.            | No      |
| **Weight**          | Variant weight for shipping calculations.          | —       |
| **Weight Class**    | Unit of measurement (kg, lb, etc.).                | —       |
| **Dimensions**      | Length, width, height of this variant.             | —       |
| **Length Class**    | Unit of measurement for dimensions (cm, in, etc.). | —       |

<!-- SCREENSHOT: Variant Shipping section -->

### Image

Each variant can have its own main image and gallery images. This is useful when Red and Blue variants look completely different.

| Field                | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| **Main Image**       | The primary image shown when a customer selects this variant combination. |
| **Use as Thumbnail** | Whether the variant main image also replaces the product thumbnail.       |
| **Gallery Images**   | Additional images shown when this variant is selected.                    |

<!-- SCREENSHOT: Variant Image section showing an uploaded variant-specific image -->

## Step 8: Set a Default Variant

One variant can be marked as the default — this is the combination shown and priced when the product page first loads.

In the variant list, click the star icon on the variant you want as the default. A filled star indicates the default variant.

<!-- SCREENSHOT: Variant list showing star icons, one filled to indicate the default -->

## Step 9: Save the Product

Click **Save** or **Save & Close** in the Joomla toolbar to save all variants and their settings.

## Managing Variants Over Time

As your product line evolves, you may need to update variants.

### Regenerating Variants

If you add a new option value later (e.g., a new color), click **Regenerate Variants** in the Variants tab. J2Commerce adds new combinations for the new value while preserving existing variants and their prices, stock, and images.

### Deleting Variants

- To delete a single variant: expand it and click the delete button.
- To delete multiple variants: check the checkboxes and click the delete button in the toolbar.
- To delete all variants and start over: click **Delete All Variants**.

### Browsing Many Variants

If a product has many variants, they are paginated. Use the page numbers below the accordion list to navigate between pages.

## How It Works on the Storefront

When a customer views a Variable product:

1. The product page displays option selectors (dropdowns, radio buttons, or color swatches depending on the option type).
2. As the customer makes selections, J2Commerce updates the price, image, and stock status via AJAX — no page reload.
3. Once all options are selected, the correct variant is identified and the **Add to Cart** button becomes active.
4. Adding to cart validates that the selected combination exists and has stock available.
5. The cart shows the selected option values alongside the product name.

<!-- SCREENSHOT: Product detail page showing size and color dropdowns with live price update -->

In category listing views, if your store settings show the cart on the listing page, option selectors also appear there so customers can add directly from the list.

## Tips

- **Set prices on variants, not the article** — the variant price is what customers see and pay. The article itself has no price field for Variable products.
- **Use a default variant** — always mark one variant as the default so the product page shows a valid starting price.
- **Set values before generating** — configure option values for each option before clicking Generate Variants. You can regenerate later to add new combinations.
- **Enable inventory per variant** — if you need to track stock per size and color separately, enable **Manage Stock** and set **Quantity** on each variant individually.
- **Reuse options** — create your Size and Color options once under **Options** and reuse them across multiple products.

## Troubleshooting

### Variants Not Generating

**Cause:** No option values have been assigned to the product options, or the options are of a type that does not support value selection.

**Solution:**

1. Go to the **Variants** tab and click **Set Values** next to each option.
2. Confirm that at least one value is assigned and saved for each option.
3. Click **Generate Variants** again.

### Option Values Not Appearing in the Set Values Panel

**Cause:** The option's global value list is empty.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Options**.
2. Open the option (e.g., Size) and verify it has values listed.
3. Add any missing values and save the option.
4. Return to the product and click **Set Values** again.

### Add to Cart Button Stays Disabled

**Cause:** Not all option selectors have been chosen by the customer, or the selected combination has no matching variant.

**Solution (admin):**

1. Open the product and go to the **Variants** tab.
2. Verify that a variant exists for every possible combination of option values.
3. If some combinations are missing, click **Regenerate Variants**.

### Price Does Not Update When Selecting Options

**Cause:** A default variant is not set, or JavaScript is blocked.

**Solution:**

1. Open the product, go to the **Variants** tab, and click the star icon on one variant to set it as the default.
2. Save the product.
3. Verify that JavaScript is enabled and not blocked by browser extensions.

### Variant Image Does Not Change on Selection

**Cause:** No image has been uploaded for that variant.

**Solution:**

1. Expand the variant in the **Variants** tab.
2. Go to the **Image** section and upload a main image for the variant.
3. Set **Use as Thumbnail** to **Yes** if you want the listing thumbnail to change too.
4. Save the product.

## Related Topics

- [Options](../catalog/options.md) — Create and manage the options used by Variable products
- [Product Types Overview](../products/product-types.md) — Compare all J2Commerce product types
- [Advanced Pricing](../products/advanced-pricing.md) — Set quantity-based and group pricing per variant
- [Inventory Management](../products/inventory.md) — Manage stock levels across variants
