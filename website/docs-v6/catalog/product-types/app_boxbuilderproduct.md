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

The Box Builder Product app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate the Box Builder Product app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the ZIP file or use the Install from URL option.

![](/img/ato-install.webp)

## Enable the Plugin

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

![](/img/gift-wrap-apps.webp)

Search for **Flexible Variable**, click the **X** to enable it. The X turns into a green checkmark when enabled.

![](/img/box-enable1.webp)

## Configure the Plugin

Click on the **Box Builder Product** to open the configuration.

:::tip

**Tip**: Click on the Toggle Inline Help button on any app/plugin you install and it will show a description below each section. See image below

:::

![](/img/box-toggle.webp)

### Basic Settings Tab

![](/img/box-setup.webp)

**Inventory Handling:** Controls where stock is tracked. **Handle at the items in the box builder** deducts stock from each individual sub-product when an order is placed. **Handle at the box builder level** deducts stock from the box builder product itself.

- **Handle at the box builder level** is the simpler approach. Set a stock quantity on the box builder product itself, and that number decrements each time someone orders the box. Use this when you replenish boxes as a unit.

- **Handle at the items in the box builder** tracks stock on each individual product inside the box. When an order is placed, the stock of every item the customer selected is reduced. Use this when your sub-products are sold both individually and inside boxes, and you need a single stock count across all sales channels.

**Tax Based On:** Controls how tax is calculated. **Individual Products** calculates tax separately for each sub-product in the box. **Box Builder Product** applies the tax profile of the box builder product to the total price.

- **Box Builder Product** applies the tax profile you set on the box builder product to the full box price. This is straightforward and works well when all items in the box carry the same tax rate.

- **Individual Products** calculates tax separately for each sub-product based on its own tax profile. The plugin distributes the box price proportionally across the sub-products and applies the correct rate to each portion. Use this when your box contains a mix of taxable and non-taxable items, or items with different tax rates.

**Display Avg Price Per Each:** When enabled, a line appears below the product price showing the total item count and the average cost per item.

**Unit Title (Single):** The label for a single item in the "price per each" display (e.g., `cookie`, `piece`). Only shown when **Display Avg Price Per Each** is enabled.

**Unit Title (Plural):** The label used when there is more than one item (e.g., `cookies`, `pieces`). Falls back to the singular label if left empty. Only shown when **Display Avg Price Per Each** is enabled.

**Template Type:** The CSS framework used by your Joomla template. Choose **Bootstrap 5** or **UIkit** to match your template, or leave on **Auto Detect** to let the plugin choose automatically.

**Display Item Details:** When enabled, a **Box Builder Items** tab appears on the product detail page showing each sub-product's image and description.

**Display Item Contains:** When enabled, an aggregated summary of all box contents appears at the top of the product detail page.

**Display Mobile Sticky Bar:** When enabled, a sticky Add-to-Cart bar appears at the bottom of the screen on mobile devices.

**Debug Mode:** Writes detailed log entries to the Joomla log file and browser console. Disable in production.

## Create a Box Builder Product

### Create the Sub-Products First

Box builder products are made up of existing J2Commerce products. Before creating a box, make sure each item you want to offer inside the box already exists as its own product.

**Supported sub-product types:**

- Simple products
- Configurable products
- Downloadable products

**Not supported as sub-products:**

- Variable product types (flexivariable, variable)
- Products that have options

## Create a New Product Article

Variable products in J2Commerce are attached to Joomla articles.

There are **many** ways you can access products or articles.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Products ->** **New**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Products ->** **New**

**Option C:** Go to **Content -> Articles ->** **New**

![](/img/variant-product.webp)

## Setting up the Product

![](/img/box-content1.webp)

Give the article a title (e.g., "Chocolate Balls").

Add your product **description** in the article body.&#x20;

The intro description above the red 'Read More' line will appear under the main title of the product. The main description will appear under the description tab below the product&#x20;

Set the article's **state** to **Published**.

Assign the article to the appropriate **category**.

:::info

**Note**: The intro description above the red 'Read More' line will appear under the main title of the product. The main description will appear under the description tab below the product&#x20;

:::

**Frontend View**

![](/img/box-content2.webp)

### Select the Box Builder Product Type

![](/img/box-type1.webp)

Open the **Product** Article **-> J2Commerce** tab

**Use as Product:** Select '**Yes**'

In the **Product Type** dropdown, select **Box Builder**.

Click **Save and Continue**

### General Tab

The **General** tab sets product-wide settings that apply to the whole product

![](/img/box-general.webp)

**Visible in Storefront:** Show or hide the product in storefront listings. Set to **'Yes'** to make it visible to shoppers.

**Brand or Manufacturer:** Links this product to a manufacturer record. Useful for filtering and for the Custom Accordions app's Brand Details feature.

:::info

NOTE: Y*ou have to set up the Manufacturer details in **both*** *an **Article*** *and under **J2Commerce -> Catalog -> Manufacturer**, in order for them to appear in the dropdown* menu&#x20;

:::

**Vendor:** Assigns the product to a vendor. Relevant for multi-vendor setups. Leave blank if you do not use vendors.

:::info

NOTE: *You have to set up the Vendor's details in **both*** *an **Article*** *and under **J2Commerce -> Catalog -> Vendors**, in order for them to appear in the dropdown menu*&#x20;

:::

**Tax Profile:** Assigns a tax profile to this product. The tax profile determines which tax rates apply based on the customer's location. Create tax profiles under **J2Commerce** **->** **Taxes**.

**Cart Button Text:** Customize your cart button name. This will override the default "Add to Cart" button label for this product only. Leave blank to use your store's global button label.

**Product CSS Class:** Adds one or more CSS class names to the product's container element. Useful for per-product styling without modifying template files.

### Set the Bundle Price

![](/img/box-price.webp)

This price is what customers pay for the entire bundle. It is independent of the prices of the individual items inside the bundle.

### Configure Inventory (Optional)

![](/img/bundle-inventory.webp)

If **Inventory Handling** in the plugin settings is set to **Handle at the bundle level**, enter the available stock quantity on the bundle product itself.

If **Inventory Handling** is set to **Handle at the items in the bundle**, stock is read from each individual item — no separate stock entry is needed on the bundle.

**Manage Stock:** Set to '**Yes'** to track inventory. J2Commerce decreases the quantity automatically when orders are placed. Set to '**No'** to sell without a stock limit.

**Stock Quantity:** The number of units currently in stock. Only relevant when **Manage Stock** is **Yes**.

**Allow Backorders:** What happens when stock reaches zero. **Do not allow** blocks purchases. **Allow** lets shoppers order anyway. **Allow but notify customer** permits the purchase and adds a backorder notice at checkout.

**Stock Status:** Manually sets the in-stock or out-of-stock label shown to shoppers, regardless of the quantity counter.

**Notify If Below:** J2Commerce sends a low-stock alert when inventory drops to this number. Check **Use Store Configuration** to apply the global default instead of a per-product value.

**Quantity Restriction:** Set to **Yes** to enforce a minimum and maximum per-order quantity.

**Max Sale Quantity:** The most units a shopper can add to their cart at once. Check **Use Store Configuration** to use the global default.

**Min Sale Quantity:** The fewest units a shopper can add to their cart at once. Check **Use Store Configuration** to use the global default.

### Image tab

![](/img/box-images2.webp)

You only have to upload one main image. This image will appear on the **category** page. All of the products that are added in the Apps tab will show up on the product page

On the **Images** tab, click **Upload Image** or drag image files directly into the upload area.

- Supported formats: JPG, JPEG, PNG, GIF, WebP, AVIF.

- The main image appears on the product detail page and in category listings.

- Gallery images appear in the image gallery on the product page.

**Frontend Category View**

![](/img/box-category.webp)

#### **Automatic Thumbnails**

J2Commerce automatically generates resized thumbnails and tiny versions of each uploaded image. These are used in product listings, the cart, and other compact views. No extra configuration is needed — the sizes are set in your store's image configuration.

#### **Alt Text**

Each image card has an **Alt Text** field. Write a short description such as "Blue ceramic mug, 350ml". Alt text is read by screen readers and used by search engines to understand your images.

#### **Removing Images**

Clicking **Remove** on a card removes the image from this product but does not delete the file from the server. To delete the file permanently, use the file browser icon in the uploader.

### Shipping Tab

![](/img/bundle-shipping.webp)

**Enable Shipping:** Set to **Yes** for physical products that need to be delivered. Set to **No** for digital products and services.

**Dimensions:** The product's length, width, and height. Used by shipping methods that calculate rates based on package size.

**Length Class:** The unit of measurement for the dimensions — for example, centimetres or inches. Defaults to your store's configured length unit.

**Weight:** The product's net weight. Used by weight-based shipping methods.

**Weight Class:** The unit of measurement for the weight — for example, kilograms or pounds. Defaults to your store's configured weight unit.

### Filters Tab

![](/img/box-filters.webp)

Filters allow shoppers to narrow product listings by attribute — for example, filtering by material, color range, or size range. Assigning filters here makes this product appear in the correct filtered results on category and tag pages.

To assign a filter value:

1. Type part of the filter name in the search box. Results appear in a dropdown.
2. Click the matching result to add it to the product.
3. Repeat for each filter value you want to assign.
4. To remove a filter, click the trash icon next to it.

Filters are created and organized under **J2Commerce** -> **Catalog** -> **Filters**.

**Frontend View of Filters on Products**

They will appear under the Specification tab

![](/img/box-filters1.webp)

The filters section will always appear on the Categories page but will only show up on the individual product pages if you choose to configure the product that way.

**Frontend View of Filters on Categories**

![](/img/simple-filters4.webp)

### Relations Tab

![](/img/box-relations.webp)

**Up-sells:** Products to recommend as upgrades on this product's detail page. Typically shown as "**Add these to your order**" with products that will complement the order. ie: parts for a specific tool, extenders, etc...

**Cross-sells:** Products to suggest as complementary purchases or are similar. Typically shown as "**You might also like**" with higher-value alternatives. They can be placed at the bottom of the product page, in the cart sidebar, or at checkout.

To add a related product, start typing its name in the search box. Matching products appear in a dropdown — click one to add it. Remove a related product by clicking the trash icon next to it.

**Frontend View**

![](/img/box-relations1.webp)

## Add Products to Box Builder

### Apps Tab

Click on the Box Builder App

![](/img/box-app2.webp)

Use the **Search Product by SKU or Name** field to find and add products to the box. Type part of a product name or SKU and select from the results. Each product you add becomes a selectable item inside the box.

:::info

**Note**: Products you add here are the items customers can choose from when building their box — they are not fixed contents.

:::

#### Box Builder Settings Fields

**Box Size:** The total number of items a customer must select to complete the box. For example, a value of `4` means the customer picks 4 items. In the example above, we are listing **12** items.

:::tip

**IMPORTANT**: Due to the **fixed price** you set for the product, the customer has to fill all of the boxes that are available in order for the Add to Cart button to enable. So the store owner can create as many Box Builder products as they wish, with different amounts of boxes for the customer to fill.&#x20;

:::

**Product Order:** The order in which available products appear on the product page.&#x20;

- **Added Order** (the order you added them)

- **Article Order (ASC/DESC)**

- **Title (ASC/DESC)**

- **Random**

**Product Display:** How the selectable products are shown.  **(see frontend examples under the 'Tip' section below)**

- **Grid** displays 3 products per row.&#x20;

- **List** shows products in a single-column list.

**Show Qty Field:** When enabled, a quantity input appears next to each selectable product so customers can choose how many of that item to add at once.

**Display Avg Price Per Each:** Override the global plugin setting for this specific product. When enabled, it shows a per-item price breakdown.

**View of items added in Random Order**

![](/img/box-app1.webp)

**Frontend View**

![](/img/box-app4.webp)

## How It Works on the Frontend

When a customer views a box builder product page:

1. An interactive **Build Your Own Box** interface appears, showing all available products.
2. The customer browses the product list (in grid or list view) and clicks **ADD** to select items.
3. A progress indicator shows how many items have been selected out of the required box size (for example, "2 / 4 Products Selected").
4. When the box is full, the **Add to Cart** button becomes active.
5. On mobile, a sticky bar at the bottom of the screen shows the current selection count and the Add to Cart button.

![](/img/box-app5.webp)

When the customer adds the box to their cart:

- The cart displays the box builder product name along with a list of all selected items and their quantities.
- The order confirmation, invoice, and admin order detail all show the full contents of each box.

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

- **Set box size to match your packaging** — if your physical box holds exactly 6 items, set the box size to `6` so customers always fill it completely. If they don't fill it completely, the Add to Cart button won't be enabled.
- **Use Grid display for visual products** — if your sub-products have good product images, Grid view shows them to better effect.

![](/img/box-grid.webp)

- **Use List display for text-heavy products** — List view gives more space for product names and descriptions.

![](/img/box-list.webp)

- **Enable Show Qty Field for variety packs** — this lets customers choose three of one flavour and one of another without clicking ADD multiple times.
- **Test the "box full" behaviour** — add one more item than the box size allows to confirm the interface blocks the addition and shows the correct message.
- **Use individual tax handling for mixed boxes** — if your box contains items with different tax rates (for example, food and non-food items), set **Tax Based On** to **Individual Products**.
- **Enable Debug Mode during setup** — if something is not behaving as expected, enable debug mode and check the Joomla log for detailed information.

## Troubleshooting

### Box Builder Interface Does Not Appear on the Product Page

**Cause:** The plugin is disabled, or the product type is not set to Box Builder.

**Solution:**

1. Go to **J2Commerce** -> **Apps**.
2. Verify the **Box Builder Product** shows a green checkmark (enabled).
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
