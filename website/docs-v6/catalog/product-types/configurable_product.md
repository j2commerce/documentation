# Configurable Products

A Configurable product lets customers choose from a set of options — such as size, color, or material — before adding the product to their cart. You define which options appear on the product page, and J2Commerce calculates any price or weight adjustments for each choice automatically.

Configurable products are ideal when you sell a single product that comes in multiple variations, but those variations do not each need their own separate SKU record with full inventory tracking per combination. If you need per-combination inventory, consider the Variable product type instead.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

The Configurable product type is built into J2Commerce and requires no additional installation or purchase.

:::tip

**IMPORTANT**: Once you have configured the settings for any product, check to see if those specific items are showing up on the frontend. If they are not, (ie: filters, cross-sells, price, title, etc), then go to your **store** menu and **show or hide** the items you want to control on the frontend. Go to **Menu -> Main Menu -> Store -> Product** tab

:::

![](/img/simple-store-menu.webp)

## How It Works

The Configurable product type uses a two-level system: **Options** and **Option Values**.

- An **Option** is the question you ask the customer, such as "Size" or "Color". Options are created in a shared library (**J2Commerce** -> **Catalog** -> **Options**) and can be reused across many products.
- An **Option Value** is one of the available choices within an option, such as "Small", "Medium", or "Large". Values are defined on the option itself, then assigned to each product individually with optional price or weight adjustments.

When a customer visits the product page, they see a selector (dropdown, radio buttons, checkboxes, or color swatches) for each option you have attached to the product. Selecting a value can adjust the displayed price and the item's shipping weight.

:::info

**NOTE**: Before you can begin setting up a Variant, you need to create all of the **Options** that the product will offer. &#x20;

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

## Variable products in J2Commerce are attached to Joomla articles.

There are **many** ways you can access products or articles.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Products ->** **New**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Products ->** **New**

**Option C:** Go to **Content -> Articles ->** **New**

![](/img/variant-product.webp)

## Setting up the Product

### Content tab

![](/img/config-content.webp)

Give the article a title (e.g., "Classic T-Shirt").

Add your product **description** in the article body.&#x20;

The intro description above the red 'Read More' line will appear under the main title of the product. The main description will appear under the description tab below the product&#x20;

Set the article's **state** to **Published**.

Assign the article to the appropriate **category**.

:::info

**Note**: The intro description above the red 'Read More' line will appear under the main title of the product. The main description will appear under the description tab below the product&#x20;

:::

**Frontend View**

![](/img/config-content1.webp)

### Select the Bundle Product Type

![](/img/config-type.webp)

Open the **Product** Article **-> J2Commerce** tab

**Use as Product:** Select '**Yes**'

In the **Product Type** dropdown, select **Configurable**.

Click **Save and Continue**

### General Tab

The **General** tab sets product-wide settings that apply to the whole product, not individual variants.

![](/img/config-general.webp)

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

### Pricing tab

![](/img/config-price.webp)

**Regular Price:** The standard selling price. Enter the number only — do not include a currency symbol. J2Commerce reads the currency from your store settings.

**Advanced Pricing:** Opens a panel to set date-based sale prices, quantity-tier prices, and customer-group prices. See the section below for details. To see how to set up the Advanced pricing, see below.

**Pricing Calculator:** Controls how the final price is calculated. The default **Standard** calculator applies the regular price and advanced pricing rules. Other calculators (installed via plugins) can apply custom formulas.

### Advanced Pricing

![](/img/simple-pricing1.webp)

Click the **Advanced Pricing** button to configure rules that override the regular price under specific conditions. A modal opens where you can add one or more pricing rules.

Each pricing rule has these fields:

**Date Range:** The date range during which this rule is active. Leave both blank to make the rule always active

**Quantity Range:** The quantity range this rule applies to. For example, a rule with Quantity From = 5 applies when the customer buys 5 or more units

**Customer Group:** Restrict this rule to a specific Joomla user group. Leave blank to apply to all shoppers.

**Price:** The price that applies when this rule matches

J2Commerce automatically selects the best matching rule at checkout — the customer always gets the lowest qualifying price.

**Common use cases:**

- **Black Friday sale** — set a Date From and Date To with a reduced price, leave quantity and group blank.
- **Bulk discount** — set Quantity From to 10 with a lower price and no date restriction.
- **Trade pricing** — set a Customer Group to your "Wholesale" group with a special price.

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

![](/img/config-images.webp)

J2Commerce 6 includes a built-in multi-image uploader. You can upload multiple images at once and arrange them in any order.

#### Uploading Images

1. On the **Images** tab, click **Upload Image** or drag image files directly into the upload area.
2. Supported formats: JPG, JPEG, PNG, GIF, WebP, AVIF.
3. Each upload completes as a card in the gallery.

**Frontend View**

![](/img/config-images2.webp)

#### **Image Order and the Main Image**

![](/img/config-images1.webp)

The first image in the uploader is the **main product image** — the large image shown on the product detail page and used as the thumbnail in listings. To reorder:

1. Hover over an image card to reveal the left and right arrows.
2. Click the arrows to move the image to a new position.
3. Save the product to apply the new order.

#### Automatic Thumbnails

J2Commerce automatically generates resized thumbnail and tiny versions of each uploaded image. These are used in product listings, the cart, and other compact views. No extra configuration is needed — the sizes are set in your store's image configuration.

#### Alt Text

Each image card has an **Alt Text** field. Write a short description such as "Blue ceramic mug, 350ml". Alt text is read by screen readers and used by search engines to understand your images.

#### Removing Images

Clicking **Remove** on a card removes the image from this product but does not delete the file from the server. To delete the file permanently, use the file browser icon in the uploader.

### Shipping Tab

![](/img/config-shipping.webp)

**Enable Shipping:** Set to **Yes** for physical products that need to be delivered. Set to **No** for digital products and services.

**Dimensions:** The product's length, width, and height. Used by shipping methods that calculate rates based on package size.

**Length Class:** The unit of measurement for the dimensions — for example, centimetres or inches. Defaults to your store's configured length unit.

**Weight:** The product's net weight. Used by weight-based shipping methods.

**Weight Class:** The unit of measurement for the weight — for example, kilograms or pounds. Defaults to your store's configured weight unit.

### &#x20;Options Tab

Options let shoppers configure the product before adding it to their cart. They are additions to the product — not separate variants. A shopper still buys one product, but they can choose from the options you define.

**Example uses:**

- A text field for a personalized engraving message
- A dropdown to select a gift box style
- A checkbox for an extended warranty

Options must be created first under **J2Commerce** -> **Catalog** -> **Options** before you can assign them to a product. If you have not created any options yet, the tab shows a link to the Options management screen.

#### Assigning Options to a Product

![](/img/simple-options1.webp)

1. On the **Options** tab, find the option you want in the dropdown at the bottom of the table.
2. Click **Add Options**.
3. The option appears in the table above. Set whether the option is **required** (the shopper must make a selection before adding to the cart).
4. Set the **Ordering** to control the display sequence.
5. Click **Save** to set up the **Set Option Value** section

**Set Option Value**

![](/img/config-options4.webp)

**Option Name:** The name of the option (read-only; edit it in **Options** management). Also shows the option type.

**Parent Option:** Links this option to a parent option so it only appears after a specific value is selected in the parent. Leave empty for an independent option.

**Required:** Whether the customer must make a selection before adding to cart.

**Ordering:** A number that controls the display order. Lower numbers appear first.

**Remove:** Click the trash icon to detach this option from the product.

For list-type options (dropdown, radio, checkbox, color), click **Set Option Values** to open the values panel. Here, you can assign which option values apply to this product and set per-value price and weight modifiers.

![](/img/config-options2.webp)

If the parent option has values, select which parent values this value should appear under (multi-select). This controls dependent/conditional option behavior.

Set the **Price Prefix** (+ to add, - to subtract) and **Price** to adjust the product price when this value is selected.

Set the **Weight Prefix** and **Weight** to adjust the shipping weight when this value is selected.

Set an **Ordering** number.

Click **Create Option** to add the value.

**Managing existing values:**

The **Current Options** table shows all values already assigned to this product. You can:

- Edit the price, weight, and ordering for each value directly in the table.
- Click the star icon to set a value as the default (pre-selected when the product page loads).
- Click the trash icon to remove a value from this product.
- Click **Add All Option Values** to quickly assign every value from the global option to this product.
- Click **Save Changes** to save edits to the current values table.

**Frontend View**

![](/img/config-options3.webp)

## How Options Appear to Customers

On the product listing page, a collapsible summary of the selected options is shown. Clicking it expands the option selectors inline so customers can configure the product from the list view.

On the product detail page, each option appears in full. Depending on the option type, customers see a dropdown, radio buttons, checkboxes, or color swatches. Options marked as required display an asterisk and will prevent adding to cart until a value is chosen.

When a customer selects a value with a price adjustment, J2Commerce adds or subtracts that amount from the displayed price. For example, if the base price is $20.00 and the customer selects a size that has a +$5.00 adjustment, the price shown updates to $25.00.

If you set up a **Parent Option**, child options only appear after the customer selects a value in the parent. This is useful for multi-level selections such as choosing a material first, then seeing only the available colors for that material.

### Filters Tab

![](/img/config-filter.webp)

Filters allow shoppers to narrow product listings by attribute — for example, filtering by material, color range, or size range. Assigning filters here makes this product appear in the correct filtered results on category and tag pages.

To assign a filter value:

1. Type part of the filter name in the search box. Results appear in a dropdown.
2. Click the matching result to add it to the product.
3. Repeat for each filter value you want to assign.
4. To remove a filter, click the trash icon next to it.

Filters are created and organized under **J2Commerce** -> **Catalog** -> **Filters**.

**Frontend View of Filters on Products**

They will appear under the Specification tab

![](/img/config-filter1.webp)

The filters section will always appear on the Categories page but will only show up on the individual product pages if you choose to configure the product that way.

**Frontend View of Filters on Categories**

![](/img/simple-filters4.webp)

### Relations Tab

![](/img/config-relations.webp)

**Up-sells:** Products to recommend as upgrades on this product's detail page. Typically shown as "**Add these to your order**" with products that will complement the order. ie: parts for a specific tool, extenders, etc...

**Cross-sells:** Products to suggest as complementary purchases or are similar. Typically shown as "**You might also like**" with higher-value alternatives. They can be placed at the bottom of the product page, in the cart sidebar, or at checkout.

To add a related product, start typing its name in the search box. Matching products appear in a dropdown — click one to add it. Remove a related product by clicking the trash icon next to it.

**Frontend View**

![](/img/config-relations1.webp)

### Apps Tab

![](/img/simple-apps.webp)

The **Apps** tab shows product-level configuration panels provided by installed app plugins. For example:

- If you have the **Custom Accordions** app enabled, you can add accordion sections directly on this tab.
- If you have the **Gift Wrapping** app enabled, its per-product settings appear here.

Each app is responsible for its own content on this tab. If no apps are installed, the tab shows an information message.

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
