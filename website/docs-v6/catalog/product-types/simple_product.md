# Simple Products

The Simple product type is the starting point for most J2Commerce stores. Use it when you are selling a single item that has one price and no variants — a book, a candle, a hand-crafted item, or a fixed-price service. If you want customers to add a personalized engraving, select a gift wrap style, or choose an optional add-on, Simple products support that too through the Options tab.

The Simple product type is built into J2Commerce and is available immediately after installation. No additional plugin purchase or setup is required.

All other J2Commerce product types — Variable, Configurable, Downloadable, Bundle — share the same tab structure documented here. Mastering the Simple product gives you the foundation for every other product type.

## Requirements

- J2Commerce is installed and enabled
- At least one Joomla article created (the article becomes the product page)
- Image upload settings are configured in **J2Commerce** **->** **Setup -> Configuration  ->** **Image upload** tab before uploading images

![](/img/simple-image-config.webp)

## How Simple Products Work

Every J2Commerce product is attached to a Joomla article. The article provides the product title, description, category, and URL. J2Commerce adds the price, inventory, shipping, and cart behavior on top of it.

Internally, J2Commerce creates a single "variant" record for a Simple product to store the price, stock quantity, and shipping dimensions. This record is invisible to shoppers — it is just how the system stores the data. You manage all of it through the normal product edit form.

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

## Creating a Simple Product

Every product needs a Joomla article. The article title becomes the product name and the article content is the description shoppers read on the product page.

There are multiple ways to navigate to the location for creating a new product.

**Option A:** Go to **Content** **-> Articles -> New**.

![](/img/simple.webp)

**Option B:** Or go to **J2Commerce -> Catalog  -> Product -> New**

![](/img/simple-product1.webp)

### Creating a New Product

![](/img/simple-content.webp)

- Enter a product **title** and **description**.

- Assign the article to a **category** (the category determines which J2Commerce category listing it appears in).&#x20;

- Make sure the **Status** is '**Published'**. Published means it's viewable on the frontend

### Configuring the Product

![](/img/simple-product2.webp)

Click on the **J2Commerce** tab to start configuring the product details

**Use As Product:** Set this to '**Yes**' to set the product type

**Product Type:** Set to **Simple** for a single-item product with one price and no variants.

Click **Save and Continue**

### General tab

![](/img/simple-general.webp)

**Visible in Storefront:** Show or hide the product in storefront listings. Set to **'Yes'** to make it visible to shoppers.

**SKU:** Your internal stock-keeping unit code. Optional but recommended for inventory tracking and order management.

**UPC/EAN/ISBN:** Universal product code or barcode identifier (UPC, EAN, JAN, ISBN, MPN). Optional

**Brand or Manufacturer:** Links this product to a manufacturer record. Useful for filtering and for the Custom Accordions app's Brand Details feature.

:::info

NOTE: *You have to set up the Manufacturer details in **both*** *an **Article*** *and under **J2Commerce -> Catalog -> Manufacturer**, in order for them to appear in the dropdown* menu

:::

**Vendor:** Assigns the product to a vendor. Relevant for multi-vendor setups. Leave blank if you do not use vendors.

:::info

NOTE: Y*ou have to set up the Vendor's details in **both*** *an **Article*** *and under **J2Commerce -> Catalog -> Vendors**, in order for them to appear in the dropdown menu*

:::

**Tax Profile:** Assigns a tax profile to this product. The tax profile determines which tax rates apply based on the customer's location. Create tax profiles under **J2Commerce** **->** **Taxes**.

**Cart Button Text:** Customize your cart button name. This will override the default "Add to Cart" button label for this product only. Leave blank to use your store's global button label.

**Product CSS Class:** Adds one or more CSS class names to the product's container element. Useful for per-product styling without modifying template files.

### Pricing Tab

![](/img/simple-pricing.webp)

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

### Inventory Tab

![](/img/simple-inventory.webp)

**Manage Stock:** Set to '**Yes'** to track inventory. J2Commerce decreases the quantity automatically when orders are placed. Set to '**No'** to sell without a stock limit.

**Stock Quantity:** The number of units currently in stock. Only relevant when **Manage Stock** is **Yes**.

**Allow Backorders:** What happens when stock reaches zero. **Do not allow** blocks purchases. **Allow** lets shoppers order anyway. **Allow but notify customer** permits the purchase and adds a backorder notice at checkout.

**Stock Status:** Manually sets the in-stock or out-of-stock label shown to shoppers, regardless of the quantity counter.

**Notify If Below:** J2Commerce sends a low-stock alert when inventory drops to this number. Check **Use Store Configuration** to apply the global default instead of a per-product value.

**Quantity Restriction:** Set to **Yes** to enforce a minimum and maximum per-order quantity.

**Max Sale Quantity:** The most units a shopper can add to their cart at once. Check **Use Store Configuration** to use the global default.

**Min Sale Quantity:** The fewest units a shopper can add to their cart at once. Check **Use Store Configuration** to use the global default.

### Images Tab

![](/img/simple-images.webp)

J2Commerce 6 includes a built-in multi-image uploader. You can upload multiple images at once and arrange them in any order.

#### Uploading Images

1. On the **Images** tab, click **Upload Image** or drag image files directly into the upload area.
2. Supported formats: JPG, JPEG, PNG, GIF, WebP, AVIF.
3. Each upload completes as a card in the gallery.

#### Image Order and the Main Image

![](/img/simple-images1.webp)

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

![](/img/simple-shipping.webp)

**Enable Shipping:** Set to **Yes** for physical products that need to be delivered. Set to **No** for digital products and services.

**Dimensions:** The product's length, width, and height. Used by shipping methods that calculate rates based on package size.

**Length Class:** The unit of measurement for the dimensions — for example, centimetres or inches. Defaults to your store's configured length unit.

**Weight:** The product's net weight. Used by weight-based shipping methods.

**Weight Class:** The unit of measurement for the weight — for example, kilograms or pounds. Defaults to your store's configured weight unit.

### Options Tab

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

![](/img/simple-options2.webp)

For list-type options (dropdown, radio, checkbox, color), click **Set Option Values** to open the values panel. Here, you can assign which option values apply to this product and set per-value price and weight modifiers.

#### Available Option Types

| Type         | What shoppers see                                            |
| ------------ | ------------------------------------------------------------ |
| **Text**     | A single-line text input (for example, engraving a message)  |
| **Textarea** | A multi-line text input (for example, delivery instructions) |
| **Select**   | A dropdown list of choices                                   |
| **Radio**    | Radio buttons for a single choice                            |
| **Checkbox** | One or more checkboxes for multiple choices                  |
| **Color**    | A color swatch picker                                        |
| **Date**     | A date picker                                                |
| **Datetime** | A combined date and time picker                              |
| **Time**     | A time picker                                                |
| **File**     | A file upload field                                          |
| **Image**    | An image selection field                                     |
| **Number**   | A numeric input                                              |
| **Email**    | An email address input                                       |
| **URL**      | A web address input                                          |

#### Price Modifiers on Option Values

![](/img/simple-options4.webp)

When a shopper selects an option value that has a price modifier, J2Commerce adds (or subtracts) that amount from the product's base price. For example, if the base price is $20 and the "Gift box" option has a +$5 modifier, the cart total for that item becomes $25.

Don't forget to choose which option is the default by selecting the **star**

**Frontend View of Options**

![](/img/simple-options5.webp)

![](/img/simple-filters1.webp)

### Filters Tab

![](/img/simple-filters2.webp)

Filters allow shoppers to narrow product listings by attribute — for example, filtering by material, color range, or size range. Assigning filters here makes this product appear in the correct filtered results on category and tag pages.

To assign a filter value:

1. Type part of the filter name in the search box. Results appear in a dropdown.
2. Click the matching result to add it to the product.
3. Repeat for each filter value you want to assign.
4. To remove a filter, click the trash icon next to it.

Filters are created and organized under **J2Commerce** -> **Catalog** -> **Filters**.

**Frontend View of Filters on Products**

They will appear under the Specification tab

![](/img/simple-filters3.webp)

The filters section will always appear on the Categories page but will only show up on the individual product pages if you choose to configure the product that way.

**Frontend View of Filters on Categories**

![](/img/simple-filters4.webp)

### Relations Tab

![](/img/simple-relations.webp)

**Up-sells:** Products to recommend as upgrades on this product's detail page. Typically shown as "**Add these to your order**" with products that will complement the order. ie: parts for a specific tool, extenders, etc...

**Cross-sells:** Products to suggest as complementary purchases or are similar. Typically shown as "**You might also like**" with higher-value alternatives. They can be placed at the bottom of the product page, in the cart sidebar, or at checkout.

To add a related product, start typing its name in the search box. Matching products appear in a dropdown — click one to add it. Remove a related product by clicking the trash icon next to it.

**Frontend View**

![](/img/simple-relations3.webp)

### Apps Tab

![](/img/simple-apps.webp)

The **Apps** tab shows product-level configuration panels provided by installed app plugins. For example:

- If you have the **Custom Accordions** app enabled, you can add accordion sections directly on this tab.
- If you have the **Gift Wrapping** app enabled, its per-product settings appear here.

Each app is responsible for its own content on this tab. If no apps are installed, the tab shows an information message.

## How the Product Appears on the Frontend

### In Category and Tag Listings

When a shopper browses a product category or tag page, each Simple product appears as a card. The card shows:

- The product's main image (thumbnail version)
- The product title (linked to the detail page)
- A short description (from the article intro text)
- The price
- The SKU (if configured to display)
- The **Add to Cart** button — or a **View Details** link, depending on your category view settings

If the product has options with the **Has Options** setting enabled, the option selectors appear directly on the listing card so shoppers can configure and add the product without leaving the category page.

![](/img/simple-categories.webp)

### On the Product Detail Page

Clicking a product card opens the product detail page (the linked Joomla article with J2Commerce functionality added). The detail page shows:

- The full product title and description from the article
- The product image gallery (main image with thumbnail navigation if multiple images are uploaded)
- The current price
- Option selectors (if options are assigned and enabled)
- A quantity input
- The **Add to Cart** button

Adding to the cart validates all required options, checks stock availability, and enforces any minimum or maximum quantity restrictions. If a required option is not selected, an error message appears next to that option.

![](/img/simple-product3.webp)

## Tips

- Once you are finished setting up the product, you will be able to quickly find it in the future by going to **J2Commerce -> Catalog  -> Product**

  ![](/img/simple-product1.webp)
- **Use "Has Options" correctly** — setting **Has Options** to **Yes** shows option selectors on the category listing. If your options are configured but this is set to **No**, shoppers must go to the detail page to configure the product. Set it to **Yes** for a smoother shopping experience on category pages.
- **Leave SKU blank only if you do not need inventory tracking** — orders and reports reference the SKU for easy identification. Even a simple code like `CANDLE-001` is better than nothing.
- **Test advanced pricing after saving** — add the product to your cart as a logged-in user and as a guest to confirm the correct price applies for each scenario.
- **Enable Shipping only for physical products** — leaving it enabled for a service or digital product can cause shipping method prompts to appear at checkout unnecessarily.
- **The article's published state matters** — even if the product is set to Published in J2Commerce, shoppers cannot reach the product page if the linked article is unpublished. Both must be active.

## Troubleshooting

### No Add to Cart button appears on the product page

**Cause:** The product's **Visibility** is set to **'No'** under the **General** tab in the product page, the product is **not published**, or the linked article is **unpublished**.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Open the product and confirm that the **Status** is **Published** and **Visibility** is set to **'Yes'** on the **General** tab.
3. Go to **Content** -> **Articles** and confirm the linked article is published.
4. Clear the Joomla cache under **Home Dashboard ->** **Cache** **-> Delete Cache**

   ![](/img/delete-cache1.webp)

### Product options are not showing on the category listing

**Cause:** **Has Options** is set to **No**, or the category view is configured to show a "View Details" link instead of cart controls.

**Solution:**

1. Open the product and set **Has Options** to **Yes** on the **Details** tab.
2. Check your J2Commerce category menu item settings — the **Show Cart** option must be set to **Show Add to Cart Button with Options**.

### Uploaded images are not generating thumbnails

**Cause:** Thumbnail auto-generation is disabled in store settings, or the PHP GD library is unavailable on your server.

**Solution:**

1. Go to **J2Commerce** **-> Setup -> Configuration** -> **Image Upload**.
2. Confirm **Auto-generate Thumbnails** is set to '**Yes'**.
3. Contact your hosting provider to confirm the PHP GD image library is enabled.

![](/img/simple-images2.webp)

### Advanced pricing rule is not applying at checkout

**Cause:** The rule's date range, quantity range, or customer group condition does not match the current order.

**Solution:**

1. Open the **product** **-> Pricing** tab **->** **Advanced Pricing**.
2. Check that the **Date From** and **Date To** fields cover today's date, or leave them blank to apply at all times.
3. Confirm the **Quantity From** value is equal to or below the quantity the customer is ordering.
4. For customer group rules, verify the customer is logged in and belongs to the correct user group.

### A required option error appears even though the shopper made a selection

**Cause:** The option type is a text or textarea field with a minimum length configured, and the entered text is too short.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Options**.
2. Open the option and check the **Params** field for minimum length settings.
3. Adjust the minimum length or remove it if it is not needed.
