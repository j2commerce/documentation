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

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the Bundle Products app **->** click **View Details** **-> Add to cart ->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions** **->** **View Files** -> **Download**.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the ZIP file or use the Install from URL option.

![](/img/ato-install.webp)

## Enable the Plugin

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

![](/img/gift-wrap-apps.webp)

Search for **Flexible Variable**, click the **X** to enable it. The X turns into a green checkmark when enabled.

![](/img/bundle-enable1.webp)

## Configure the Plugin

Click on **Bundle Products** to open the configuration.

:::tip

**Tip**: Click on the Toggle Inline Help button on any app/plugin you install and it will show a description below each section. See image below

:::

![](/img/bundle-toggle.webp)

### Basic Settings Tab

![](/img/bundle-setup.webp)

**Inventory Handling:** Controls where stock is tracked — at the bundle level or at each item inside the bundle.

- **Handle at the bundle level:** Stock is tracked on the bundle product itself. When a bundle sells, only the bundle's own stock counter decreases.

- **Handle at the items in the bundle:** Stock is tracked on each product inside the bundle. When a bundle sells, J2Commerce reduces the stock of every included item according to the quantities you set.

**Tax Based On:** Determines how tax is calculated — against the bundle as a whole, or against each individual product in the bundle.

- **Bundle Product:** Tax is calculated once against the total bundle price using the bundle product's tax profile.

- **Individual Products:** Tax is calculated separately for each item in the bundle using each item's own tax profile, then the amounts are combined on the order.

**Display Price Per Item:** Show a "Contains X items (price / item)" breakdown below the bundle price on the product page.

**Singular Item Label:** The word used when the bundle contains one item (for example: item, piece, unit). Only appears when **Display Price Per Item** is enabled.

**Plural Items Label:** The word used when the bundle contains multiple items (for example: items, pieces, units). Only appears when **Display Price Per Item** is enabled.

**Template Framework:** The CSS framework used for bundle product templates. Auto-detect reads from the active menu item subtemplate setting.

**Display Item Details:** Show each bundled item's image and description in a dedicated section on the product detail page.

**Debug Mode:** Write debug messages to the Joomla log directory. Disable this on live sites.

## Create a New Product Article

Variable products in J2Commerce are attached to Joomla articles.

There are **many** ways you can access products or articles.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Products ->** **New**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Products ->** **New**

**Option C:** Go to **Content -> Articles ->** **New**

![](/img/variant-product.webp)

## Setting up the Product

![](/img/bundle-content4.webp)

Give the article a title (e.g., "Chocolate Balls").

Add your product **description** in the article body.&#x20;

The intro description above the red 'Read More' line will appear under the main title of the product. The main description will appear under the description tab below the product&#x20;

Set the article's **state** to **Published**.

Assign the article to the appropriate **category**.

:::info

**Note**: The intro description above the red 'Read More' line will appear under the main title of the product. The main description will appear under the description tab below the product&#x20;

:::

**Frontend View**

![](/img/bundle-content5.webp)

### Select the Bundle Product Type

![](/img/bundle-type.webp)

Open the **Product** Article **-> J2Commerce** tab

**Use as Product:** Select '**Yes**'

In the **Product Type** dropdown, select **Variable**.

Click **Save and Continue**

### General Tab

The **General** tab sets product-wide settings that apply to the whole product, not individual variants.

![](/img/bundle-general.webp)

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

![](/img/bundle-price.webp)

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

![](/img/bundle-images.webp)

On the **Images** tab, click **Upload Image** or drag image files directly into the upload area.

- Supported formats: JPG, JPEG, PNG, GIF, WebP, AVIF.

- The main image appears on the product detail page and in category listings.

- Gallery images appear in the image gallery on the product page.

**Frontend View**

![](/img/bundle-images2.webp)

#### **Image Order and the Main Image**

![](/img/bundle-images1.webp)

The first image in the uploader is the **main product image** — the large image shown on the product detail page and used as the thumbnail in listings. To reorder:

1. Hover over an image card to reveal the left and right arrows.
2. Click the arrows to move the image to a new position.
3. Save the product to apply the new order.

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

![](/img/bundle-filters.webp)

Filters allow shoppers to narrow product listings by attribute — for example, filtering by material, color range, or size range. Assigning filters here makes this product appear in the correct filtered results on category and tag pages.

To assign a filter value:

1. Type part of the filter name in the search box. Results appear in a dropdown.
2. Click the matching result to add it to the product.
3. Repeat for each filter value you want to assign.
4. To remove a filter, click the trash icon next to it.

Filters are created and organized under **J2Commerce** -> **Catalog** -> **Filters**.

**Frontend View of Filters on Products**

They will appear under the Specification tab

![](/img/bundle-filters1.webp)

The filters section will always appear on the Categories page but will only show up on the individual product pages if you choose to configure the product that way.

**Frontend View of Filters on Categories**

![](/img/simple-filters4.webp)

### Relations Tab

![](/img/bundle-relations.webp)

**Up-sells:** Products to recommend as upgrades on this product's detail page. Typically shown as "**Add these to your order**" with products that will complement the order. ie: parts for a specific tool, extenders, etc...

**Cross-sells:** Products to suggest as complementary purchases or are similar. Typically shown as "**You might also like**" with higher-value alternatives. They can be placed at the bottom of the product page, in the cart sidebar, or at checkout.

To add a related product, start typing its name in the search box. Matching products appear in a dropdown — click one to add it. Remove a related product by clicking the trash icon next to it.

**Frontend View**

![](/img/bundle-relations1.webp)

## Add Products to the Bundle

### Apps Tab

You will see the **Bundle Products** section with a search field and a note that only simple, configurable, and downloadable products without options can be bundled.

![](/img/bundle-apps.webp)

1. In the **Search Product** field, type the name or SKU of a product you want to include.
2. Select the product from the suggestions that appear.
3. The product appears as a row in the bundle table.
4. Repeat to list all products individually that will be included in the bundle.&#x20;

To include more than one unit of the same product, add it multiple times. J2Commerce automatically groups duplicate entries and sums the quantities.

![](/img/bundle-apps6.webp)

**Frontend View**

![](/img/bundle-apps2-2.webp)

### Configure Per-Item Price Display (Optional)

Below the product list, you can control how the price-per-item breakdown appears on the storefront:

![](/img/bundle-apps1-1.webp)

**Display Price Per Item:** Toggle this to '**Yes'** to show a "Contains X items (price / item)" line below the bundle price.

**Singular Item Label:** The label for one item (for example: item, piece). Appears only when Display Price Per Item is enabled.

**Plural Items Label:** The label for multiple items (for example: items, pieces). Appears only when Display Price Per Item is enabled.

**Frontend View**

![](/img/bundle-apps1-2.webp)

## How It Works

When a customer views a bundle product page:

1. J2Commerce loads the bundle product and its configured price.
2. If **Display Price Per Item** is enabled, a breakdown such as "Contains 3 items ($9.99 / item)" appears below the main price.
3. If **Display Item Details** is enabled in the plugin settings, a **Bundled Items** section appears on the product page showing each included item's image, name, SKU, quantity, and regular price.
4. The customer clicks **Add to Cart** — the entire bundle is added as one line item.
5. In the cart, the bundle line item expands to list each included product and its quantity.
6. On orders and invoices, the bundle appears as a single product line with the bundled items listed underneath it.

Each item that is listed in the bundle package will be displayed individually in the Alt Text Layout below the product.&#x20;

**Frontend View**

![](/img/bundle-apps5.webp)

**Frontend Checkout Cart**

![](/img/bundle-checkout.webp)

## Display Conditions

Bundled item details appear on the product page when:

- The plugin is enabled in **J2Commerce** **->** **Apps**.
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
4. Clear the Joomla cache: **Home Dashboard ->** **Cache** **-> Delete Cache**

![](/img/delete-cache2.webp)

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
