# Downloadable Products

The Downloadable product type lets you sell digital goods that customers receive as file downloads after completing their purchase. This product type is ideal for eBooks, software, music files, PDF templates, video courses, design assets, and any other digital content. Because the product is delivered electronically, shipping is not required.

Downloadable products are a core feature of J2Commerce — no additional plugin or purchase is needed.

## What Makes a Downloadable Product Different

When a customer purchases a downloadable product:

1. The order is placed and payment is processed normally.
2. Once payment is confirmed, J2Commerce grants the customer access to the download.
3. The customer logs into their account and finds their files in **My Profile** **->** **Downloads**.
4. They click the download button to save the file to their device.

You control how many times a customer can download a file and how long access is available. A file with no limits set remains available indefinitely with unlimited downloads.

:::tip

**IMPORTANT**: Once you have configured the settings for any product, check to see if those specific items are showing up on the frontend. If they are not, (ie: filters, cross-sells, price, title, etc), then go to your **store** menu and **show or hide** the items you want to control on the frontend. Go to **Menu -> Main Menu -> Store -> Product** tab

:::

![](/img/simple-store-menu.webp)

## Creating a Downloadable Product

Downloadable products are created from within a Joomla article, the same way as any other J2Commerce product type.

### There are **many** ways you can access products or articles.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Products ->** **New**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Products ->** **New**

**Option C:** Go to **Content -> Articles ->** **New**

![](/img/variant-product.webp)

## Setting up the Product

### Content tab

![](/img/downloadable-content1.webp)

Give the article a title (e.g., "Stickers, CD, DVD").

Add your product **description** in the article body.&#x20;

The intro description above the red 'Read More' line will appear under the main title of the product. The main description will appear under the description tab below the product&#x20;

Set the article's **state** to **Published**.

Assign the article to the appropriate **category**.

:::info

**Note**: The intro description above the red 'Read More' line will appear under the main title of the product. The main description will appear under the description tab below the product&#x20;

:::

**Frontend View**

<!-- SCREENSHOT: Joomla article editor with J2Commerce product form visible below the article content area -->

### Select the Bundle Product Type

![](/img/downloadable-type.webp)

Open the **Product** Article **-> J2Commerce** tab

**Use as Product:** Select '**Yes**'

In the **Product Type** dropdown, select **Downloadable**

Click **Save and Continue**

### General Tab

The **General** tab covers basic product settings that apply to all product types.

![](/img/downloadable-general.webp)

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

![](/img/downloadable-pricing.webp)

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

:::info

**NOTE**: These are display images only. The actual downloadable files are managed on the **Files** tab.

:::

![](/img/downloadable-images.webp)

Upload images to represent the product in your store catalog — a cover image for an eBook, a screenshot of software, or a preview of a design template.

J2Commerce 6 includes a built-in multi-image uploader. You can upload multiple images at once and arrange them in any order.

#### Uploading Images

1. On the **Images** tab, click **Upload Image** or drag image files directly into the upload area.
2. Supported formats: JPG, JPEG, PNG, GIF, WebP, AVIF.
3. Each upload completes as a card in the gallery.

### Frontend View

![](/img/downloadable-frontend.webp)

#### Image Order and the Main Image

![](/img/downloadable-images1.webp)

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

### Files Tab

The **Files** tab is unique to the Downloadable product type. This is where you upload the actual files customers will download after purchase.

![](/img/downloadable-files1.webp)

#### Uploading Files

Click inside the file upload area or drag and drop your file to upload it. You can upload multiple files — all files attached to the product become available to the customer after purchase.

Files are saved to the `images/downloads/` directory on your server. The upload supports files up to 100 MB.

After uploading, each file entry shows:

- The file display name (editable — this is what the customer sees)
- The file path on the server
- A download count showing how many times the file has been downloaded

#### Download Settings

**Download Limit** applies per customer per order. If a customer purchases the product twice, each order has its own separate download count. The maximum number of times a customer can download this file. Leave blank for unlimited downloads.

**Download Expiration** is measured in days from the date of purchase. A setting of `30` means the download button disappears 30 days after the order was placed. Number of days the download remains available after purchase. Leave blank and access never expires.

### Frontend View

Once the customer purchases the download product, it will show up under the "My Account" section on the frontend.

![](/img/downloadable-my-account.webp)

### Filters Tab

Filters allow shoppers to narrow product listings by attribute — for example, filtering by material, color range, or size range. Assigning filters here makes this product appear in the correct filtered results on category and tag pages.

![](/img/downloadable-filters2.webp)

To assign a filter value:

1. Type part of the filter name in the search box. Results appear in a dropdown.
2. Click the matching result to add it to the product.
3. Repeat for each filter value you want to assign.
4. To remove a filter, click the trash icon next to it.

Filters are created and organized under **J2Commerce** -> **Catalog** -> **Filters**.

### Frontend View of Filters on Products

They will appear under the Specification tab

![](/img/downloadable-filters1.webp)

The filters section will always appear on the Categories page but will only show up on the individual product pages if you choose to configure the product that way.

### Frontend View of Filters on Categories

![](/img/downloadable-filters3.webp)

### Relations Tab

![](/img/downloadable-related.webp)

**Up-sells:** Products to recommend as upgrades on this product's detail page. Typically shown as "**Add these to your order**" with products that will complement the order. ie: parts for a specific tool, extenders, etc...

**Cross-sells:** Products to suggest as complementary purchases or are similar. Typically shown as "**You might also like**" with higher-value alternatives. They can be placed at the bottom of the product page, in the cart sidebar, or at checkout.

To add a related product, start typing its name in the search box. Matching products appear in a dropdown — click one to add it. Remove a related product by clicking the trash icon next to it.

### Frontend View

![](/img/config-relations1.webp)

### Apps Tab

![](/img/simple-apps.webp)

The **Apps** tab shows product-level configuration panels provided by installed app plugins. For example:

- If you have the **Custom Accordions** app enabled, you can add accordion sections directly on this tab.
- If you have the **Gift Wrapping** app enabled, its per-product settings appear here.

Each app is responsible for its own content on this tab. If no apps are installed, the tab shows an information message.

## Shipping

The Downloadable product type does not include a **Shipping** tab. No shipping configuration is available or required — downloadable products are never shipped. If your order contains only downloadable products, the checkout will skip the shipping step automatically.

If a customer mixes a downloadable product with a physical product in the same order, shipping will apply to the physical product only.

## How Customers Access Their Downloads

After a successful purchase, customers access their downloaded files through their account.

### Accessing the Downloads Page

1. The customer logs into their Joomla account on the frontend.
2. They navigate to **My Account** or **My Profile** (usually found in the account menu or via a J2Commerce My Account or My Profile menu item).
3. They click the **Downloads** tab.

![](/img/downloadable-my-account3.webp)

### Downloads Table

The downloads page shows a table with the following columns:

**Order:** The order ID linked to the purchase. Click to view order details.

**Files:** The display name of the downloadable file. Make sure you name your file something that you want your customers to see and that sounds professional.

**Expires:** When download access ends. Shows the date, or "Never" if no expiry is set.

**Remaining:** How many more times the file can be downloaded. Shows the infinity symbol when there is no limit.

**Action:** The download button (green), or a status badge if download is not currently available.

### Download Status Badges

**Pending:** The order has not yet been confirmed. Downloads become available once payment is processed.

**Expired:** The download expiry date has passed. The file is no longer accessible.

**Limit Reached:** The customer has reached the maximum number of allowed downloads.

### Frontend View

![](/img/downloadable-my-account2.webp)

## Tips

- **Leave Download Limit blank for most products** — customers occasionally need to re-download files due to device changes or lost files. Unlimited downloads reduce support requests.
- **Use Download Expiration for time-limited access** — if you sell access to content that should expire (for example, a one-year subscription to templates), set an expiry in days.
- **Upload multiple file formats** — for an eBook, you might upload both a PDF and an ePub version. Both files attach to the same product and both become available after purchase.
- **Use a descriptive display name** — customers see the file display name in their Downloads list. A name like `My Product Guide v2 (PDF)` is clearer than `product_guide_v2_final.pdf`.
- **Test the purchase flow** — place a test order with a test payment method to verify the download link appears correctly in My Profile.

***

## Troubleshooting

### Download Button Does Not Appear After Purchase

**Cause:** The order has not been moved to a status that grants download access. Download access is granted when the order reaches the appropriate confirmed status.

**Solution:**

1. Go to **J2Commerce** -> **Orders**.
2. Find the customer's order.
3. Verify the order status. If it is still **Pending**, ensure the payment was processed correctly.
4. Check your payment method configuration to confirm it is set to update order status on successful payment.

### Customer Cannot See the Downloads Tab

**Cause:** The customer is not logged in, or the My Profile menu item is not configured.

**Solution:**

1. Confirm the customer has a Joomla user account and is logged in.
2. Go to **Menus** and verify there is a J2Commerce **My Profile** menu item pointing to the profile view.
3. Confirm the menu item is published and accessible to registered users.

### File Upload Fails

**Cause:** The file exceeds the server upload limit or the `images/downloads/` directory is not writable.

**Solution:**

1. Check the file size — the uploader supports up to 100 MB per file.
2. If the file is within the size limit, contact your hosting provider to increase the PHP `upload_max_filesize` and `post_max_size` values.
3. Verify the `images/downloads/` directory exists on your server and the web server has write permission to it.

### Download Link Expired Unexpectedly

**Cause:** The **Download Expiration** field was set to a number of days that has now elapsed.

**Solution:**

1. Go to **Content** -> **Articles** and open the product article.
2. Scroll to the J2Commerce form and click the **Files** tab.
3. Increase the **Download Expiration** value, or clear the field entirely to remove the expiry.
4. Click **Save & Close**.

Download access will be restored immediately for customers whose orders are still within the new expiry window.

### The Customer's Report shows the Download Limit is Reached Too Quickly

**Cause:** The **Download Limit** was set too low, or the customer downloaded the file from multiple devices.

**Solution:**

1. Open the product article and navigate to the **Files** tab.
2. Increase the **Download Limit** value, or leave it blank for unlimited downloads.
3. Click **Save & Close**.
