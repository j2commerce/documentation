---
title: "Simple Products"
sidebar_label: "Simple Products"
sidebar_position: 1
description: "Learn how to create and configure a simple product in J2Commerce — the most common product type for single-item, non-variant goods."
---

# Simple Products

A simple product is the most common product type in J2Commerce. Use it when you're selling a single item that doesn't have variants — such as a book, a candle, or a fixed-price service. Inventory is tracked at the product level, not across multiple options.

## Prerequisites

- J2Commerce installed and enabled
- At least one Joomla article created to attach the product to
- Image upload settings configured in J2Commerce (required before uploading product images — see [Store Configuration](../../configuration/configuration.md))

## How Simple Products Work

Every J2Commerce product is linked to a Joomla article. The article provides the product title, description, category, and URL. J2Commerce adds the pricing, inventory, shipping, and cart functionality on top of it.

When you create a simple product, J2Commerce creates a single "master variant" behind the scenes to store the price, stock, and shipping dimensions. This variant is not visible to customers — it's an internal record that drives the product's behavior.

## Creating a Simple Product

### Step 1: Create or Open a Joomla Article

1. Go to **Content** -> **Articles** -> **New** to create a new article, or open an existing one.
2. Write your product title, description, and any other content your shoppers will see.
3. Save the article and note its title — you'll need to select it when setting up the product.

### Step 2: Add the Product in J2Commerce

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click **New** in the toolbar.

<!-- SCREENSHOT: J2Commerce Products list view with the New button highlighted -->

The product form opens with several tabs across the top. You'll configure each tab to complete your product setup.

### Step 3: General Tab

<!-- SCREENSHOT: Product form General tab showing article selector, product type, and visibility fields -->

The **General** tab sets the foundation of your product.

| Field | Description | Default |
|-------|-------------|---------|
| **Article** | Select the Joomla article this product is attached to. Each product must link to one article. | _(required)_ |
| **Product Type** | Set to **Simple** for a basic, non-variant product. | `Simple` |
| **Visibility** | Controls whether the product appears in your storefront. Set to **Show** to make it visible, or **Hide** to keep it out of listings without deleting it. | `Show` |
| **Has Options** | Set to **Yes** if customers can choose add-ons or customizations (such as engraving text or selecting a gift box). Options are configured on the **Options** tab. | `No` |
| **Add to Cart Text** | Overrides the default "Add to Cart" button label for this product only. Leave blank to use the store default. | _(blank)_ |
| **Status** | Set to **Published** to make the product available. | `Published` |

**Tax Profile, Manufacturer, and Vendor** are on the same tab under the Associations section:

| Field | Description |
|-------|-------------|
| **Tax Profile** | Assigns a tax profile to this product. Tax profiles define which tax rates apply based on the customer's location. |
| **Manufacturer** | Associates the product with a manufacturer record in your catalog. |
| **Vendor** | Assigns the product to a vendor (relevant for multi-vendor setups). |

### Step 4: Pricing Tab

<!-- SCREENSHOT: Product form Pricing tab showing the regular price field and the Advanced Pricing button -->

Enter the selling price for this product.

| Field | Description |
|-------|-------------|
| **SKU** | Stock-keeping unit — your internal product code. Optional but recommended for inventory tracking. |
| **UPC** | Universal Product Code or other barcode identifier (UPC, EAN, JAN, ISBN, MPN). Optional. |
| **Regular Price** | The standard selling price. Enter the number without a currency symbol — J2Commerce reads the currency from your store settings. |
| **Pricing Calculator** | Determines how the price is calculated. The default **Standard** calculator applies the regular price and any applicable advanced pricing rules. |

#### Advanced Pricing

Click **Set Advanced Pricing** to configure rules that override the regular price under specific conditions. Advanced pricing lets you set:

- **Date-based sale prices** — reduce the price for a specific date range (for example, a Black Friday promotion)
- **Quantity-based tiers** — offer a lower price when a customer buys in bulk
- **Customer group pricing** — set different prices for different Joomla user groups (for example, a wholesale price for a "Trade" group)

Each advanced pricing rule has a **Date From**, **Date To**, **Quantity From**, **Quantity To**, **Customer Group**, and **Price** field. You can add as many rules as you need. J2Commerce automatically applies the best matching rule at checkout.

### Step 5: Inventory Tab

<!-- SCREENSHOT: Product form Inventory tab showing Manage Stock toggle and quantity fields -->

The **Inventory** tab controls stock tracking for this product.

| Field | Description | Default |
|-------|-------------|---------|
| **Manage Stock** | Set to **Yes** to track inventory and reduce quantity automatically when orders are placed. Set to **No** to sell without stock limits. | `No` |
| **Quantity** | The number of units currently in stock. Only used when **Manage Stock** is **Yes**. | `0` |
| **Allow Backorders** | Controls what happens when stock reaches zero. **Do not allow** stops purchases. **Allow** lets customers order anyway. **Allow but notify customer** adds a note at checkout. | `Do not allow` |
| **Stock Status** | Manually override the stock label. Set to **In Stock** or **Out of Stock** regardless of the quantity counter. | `In Stock` |
| **Notify Quantity** | Send a low-stock alert when inventory drops to this number. Leave blank or check **Use Store Configuration** to apply the global default. | _(store default)_ |
| **Quantity Restriction** | Set to **Yes** to enforce minimum and maximum order quantities. | `No` |
| **Min Sale Quantity** | The fewest units a customer can add to their cart at once. | _(store default)_ |
| **Max Sale Quantity** | The most units a customer can add to their cart at once. | _(store default)_ |

### Step 6: Images Tab

<!-- SCREENSHOT: Product form Images tab showing the multi-image uploader with one uploaded image -->

J2Commerce 6 includes a built-in multi-image uploader. Before uploading images, make sure your image upload settings are configured under **J2Commerce** -> **Configuration** -> **Image Upload** (see [Store Configuration](../../configuration/configuration.md)).

#### Uploading Images

1. On the **Images** tab, click **Upload Image** or drag and drop image files into the upload area.
2. Supported formats: JPG, JPEG, PNG, GIF, WebP, AVIF.
3. When the upload completes, the image appears as a card in the uploader.

<!-- SCREENSHOT: Multi-image uploader showing three uploaded product images with reorder arrows visible on hover -->

#### Automatic Thumbnail Generation

J2Commerce automatically generates two additional versions of each uploaded image:

- **Thumbnail** — a resized version used in product listings, cart, and other compact displays. Default size: 300 × 300 px (WebP format).
- **Tiny** — a very small version used for cart mini-previews and low-bandwidth contexts. Default size: 100 × 100 px (WebP format).

These are created immediately on upload. You do not need to do anything extra — J2Commerce handles the resizing and format conversion based on the sizes configured in your store settings.

#### Image Order and the Main Image

The **first image in the uploader is the main product image** — the large image shown on the product detail page. To change which image appears first:

1. Hover over any image card to reveal the left and right arrow buttons.
2. Click the left or right arrow to move the image to a new position.
3. Save the product to apply the new order.

#### Alt Text

Below each image card there is an **Alt Text** field. Type a short description of the image — for example, "Red ceramic mug on a white background". Alt text improves accessibility for screen-reader users and is used by search engines to understand your images.

#### Removing an Image vs. Deleting a File

Clicking **Remove** next to an image card removes the image from this product only. The file itself remains on the server and can be reused on other products.

To permanently delete an image file from the server, open the **file browser** (the folder icon in the uploader). Navigate to the image, select it, and use the **Delete** option in the file browser modal. Deleting from the file browser removes the file permanently, including its thumbnail and tiny versions.

### Step 7: Shipping Tab

<!-- SCREENSHOT: Product form Shipping tab showing the Enable Shipping toggle and dimension fields -->

| Field | Description | Default |
|-------|-------------|---------|
| **Enable Shipping** | Set to **Yes** if this product is a physical item that needs to be shipped. Set to **No** for digital or service products. | `No` |
| **Length Class** | Select the unit of measurement for the dimensions below (for example, centimetres or inches). | _(store default)_ |
| **Dimensions** | Enter the product's length, width, and height. Used by weight-based and dimension-based shipping methods. | `0` |
| **Weight** | The product's net weight. | `0` |
| **Weight Class** | Select the unit of measurement for the weight (for example, kilograms or pounds). | _(store default)_ |

### Step 8: Options Tab

<!-- SCREENSHOT: Product form Options tab showing an example option with a dropdown type and values listed -->

Use the **Options** tab to add purchaser-configurable fields to a simple product. Options are additions to the product — they don't create separate variants. Examples include:

- A text field for a personalized engraving message
- A dropdown for selecting a gift wrap style
- A checkbox for an extended warranty add-on

To add an option:

1. Click **Add Option**.
2. Fill in the **Option Name** (shown to customers), an optional **Unique Name** (used internally), and the **Type**.
3. For list-type options (dropdown, radio, checkbox, or color), add values using the rows that appear below.
4. Set a price modifier on each value if needed.
5. Click **Save** in the option row.

**Available option types:**

| Type | Description |
|------|-------------|
| Text | Single-line text input |
| Textarea | Multi-line text input |
| Select | Dropdown list of choices |
| Radio | Radio button group |
| Checkbox | One or more checkboxes |
| Color | Color swatch selector |
| Date / Time / Datetime | Date or time picker |
| File | File upload field |
| Image | Image selection field |
| Number | Numeric input |
| Email | Email address input |
| URL | Web address input |

### Step 9: Filters Tab

<!-- SCREENSHOT: Product form Filters tab showing assigned filter attributes -->

Filters let customers narrow down product listings by specific attributes (for example, material, color range, or size range). Assign the relevant filter values here so this product appears in filtered search results on your storefront.

Filters are created and managed under **J2Commerce** -> **Catalog** -> **Filters**.

### Step 10: Relations Tab

<!-- SCREENSHOT: Product form Relations tab showing Up-sells and Cross-sells fields -->

| Field | Description |
|-------|-------------|
| **Up-sells** | Products to recommend as upgrades on the product detail page — typically higher-value or premium alternatives. |
| **Cross-sells** | Products to suggest as complementary purchases — shown in the cart or at checkout. |

Enter product IDs as a comma-separated list. You can find a product's ID on the **Products** list view.

### Step 11: Apps Tab

<!-- SCREENSHOT: Product form Apps tab showing app-specific configuration panels -->

The **Apps** tab displays configuration panels added by installed app plugins. For example, if you have the Gift Wrapping app installed, its product-level settings appear here. Each app plugin is responsible for its own content on this tab.

### Step 12: Save the Product

Click **Save** in the toolbar to save all tabs at once. J2Commerce saves the product record, the variant data, inventory, images, and all tab settings in a single operation.

<!-- SCREENSHOT: Toolbar with Save, Save & Close, and Save & New buttons highlighted -->

After saving, browse to the article on the frontend to preview the product with its Add to Cart button.

## Tips

- You can publish or unpublish the linked Joomla article independently of the product's **Status** field. If the article is unpublished, the product page is not accessible even if the product is published in J2Commerce.
- The **Add to Cart Text** field is useful for service products — for example, change it to "Book Now" or "Request Quote".
- When you enable **Manage Stock** and the quantity reaches zero, J2Commerce automatically applies the **Allow Backorders** setting to decide whether purchases are still possible.
- If you set a **Min Sale Quantity** greater than 1, the quantity input on the product page starts at that number rather than 1.

## Troubleshooting

### Product saves but no Add to Cart button appears on the frontend

**Cause:** The product's **Visibility** is set to **Hide**, or the linked Joomla article is unpublished.

**Solution:**
1. Open the product in **J2Commerce** -> **Catalog** -> **Products**.
2. On the **General** tab, confirm **Visibility** is set to **Show** and **Status** is **Published**.
3. Go to **Content** -> **Articles** and confirm the linked article is published.
4. Clear the Joomla cache under **System** -> **Clear Cache**.

### Uploaded image does not generate thumbnails

**Cause:** WebP conversion or thumbnail generation is disabled in the store configuration, or the GD or ImageMagick library is not available on the server.

**Solution:**
1. Go to **J2Commerce** -> **Configuration** -> **Image Upload**.
2. Confirm **Enable WebP Conversion** is set to **Yes** and **Auto-generate Thumbnails** is set to **Yes**.
3. Ask your hosting provider to confirm that the PHP GD extension is enabled.

### Advanced pricing rule is not applying at checkout

**Cause:** The date range, quantity range, or customer group condition does not match the current order.

**Solution:**
1. Open the product and click **Set Advanced Pricing**.
2. Check that the **Date From** and **Date To** fields cover today's date (or are left blank to apply at all times).
3. Verify the **Quantity From** matches or is below the quantity the customer is buying.
4. If using customer group pricing, confirm the customer is logged in and belongs to the targeted user group.

## Related Topics

- [Store Configuration](../../configuration/configuration.md)
- [Advanced Pricing](advanced-pricing.md)
- [Product Options](../../catalog/options/index.md)
- [Inventory Management](../../catalog/inventory/index.md)
- [Shipping Settings](../../shipping/index.md)
- [Tax Profiles](../../taxes/index.md)
