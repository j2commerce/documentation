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

Follow the steps in the Options Doc if you need help setting up new options. [https://docs.j2commerce.com/v6/catalog/creating-options](https://docs.j2commerce.com/v6/catalog/creating-options)

## Creating a Downloadable Product

Downloadable products are created from within a Joomla article, the same way as any other J2Commerce product type.

### Step 1: Create or Open the Article

1. Go to **Content** -> **Articles** in the Joomla administrator.
2. Click **New** to create a new article, or click an existing article to edit it.
3. Give the article a title — this becomes the product name customers see.

<!-- SCREENSHOT: Joomla article editor with J2Commerce product form visible below the article content area -->

### Step 2: Open the J2Commerce Product Form

Scroll down past the article content editor. You will see the J2Commerce product configuration form. If this is a new article, look for the **J2Commerce** section at the bottom of the edit screen.

Click the **Product Type** field and select **Downloadable** from the dropdown.

<!-- SCREENSHOT: J2Commerce product type selector showing "Downloadable" selected -->

The form updates to show the tabs specific to downloadable products: **General**, **Pricing**, **Inventory**, **Images**, **Files**, **Filters**, **Relations**, and **Apps**.

***

## Configuring the Product

### General Tab

The **General** tab covers basic product settings that apply to all product types.

<!-- SCREENSHOT: General tab of the downloadable product form -->

| Field                     | Description                                                                                        | Example         |
| ------------------------- | -------------------------------------------------------------------------------------------------- | --------------- |
| **Visible in Storefront** | Show or hide this product in your store. Set to **No** to work on the product before it goes live. | Yes             |
| **SKU**                   | A unique code to identify this product in your records.                                            | `EBOOK-001`     |
| **UPC**                   | Universal Product Code or barcode number (optional).                                               | —               |
| **Brand or Manufacturer** | Link this product to a manufacturer or brand you have set up in J2Commerce.                        | —               |
| **Vendor**                | Assign the product to a vendor if you use a multi-vendor setup.                                    | —               |
| **Tax Profile**           | Select which tax rule applies to this product.                                                     | `Digital Goods` |
| **Cart Button Text**      | Customize the text on the Add to Cart button. Leave blank to use the store default.                | `Buy Now`       |
| **Product CSS Class**     | Advanced: add a custom CSS class to the product wrapper on the frontend.                           | —               |

### Pricing Tab

Set the price customers pay for the digital download.

<!-- SCREENSHOT: Pricing tab showing the Regular Price field and Advanced Pricing button -->

| Field                  | Description                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Regular Price**      | The base selling price of the product. Enter the amount in your store currency.                                                            |
| **Advanced Pricing**   | Click this button to open the advanced pricing panel where you can configure sale prices, date-limited offers, and customer group pricing. |
| **Pricing Calculator** | Select a pricing method if you have custom calculators installed. Leave at default for standard pricing.                                   |

### Inventory Tab

The **Inventory** tab controls stock tracking. For many digital products, stock tracking is unnecessary — a PDF or software download is never depleted. However, you can enable it if you want to limit how many copies are sold.

<!-- SCREENSHOT: Inventory tab with Manage Stock toggled off -->

| Field                    | Description                                                                    | Options                       |
| ------------------------ | ------------------------------------------------------------------------------ | ----------------------------- |
| **Manage Stock**         | Turn stock tracking on or off. Most digital products leave this disabled.      | Yes / No                      |
| **Stock Quantity**       | How many copies are available. Only relevant when **Manage Stock** is enabled. | Any number                    |
| **Allow Back Orders**    | Whether customers can order when stock reaches zero.                           | No / Allow / Allow but Notify |
| **Stock Status**         | Manually set availability regardless of quantity.                              | In Stock / Out of Stock       |
| **Notify Quantity**      | Send an admin notification when stock falls to this level.                     | Any number                    |
| **Quantity Restriction** | Limit how many units a customer can purchase in one order.                     | Yes / No                      |
| **Max Sale Quantity**    | Maximum units per order when quantity restriction is enabled.                  | Any number                    |
| **Min Sale Quantity**    | Minimum units per order when quantity restriction is enabled.                  | Any number                    |

### Images Tab

Upload images to represent the product in your store catalog — a cover image for an eBook, a screenshot of software, or a preview of a design template.

<!-- SCREENSHOT: Images tab showing the product image upload area -->

These are display images only. The actual downloadable files are managed on the **Files** tab.

### Files Tab

The **Files** tab is unique to the Downloadable product type. This is where you upload the actual files customers will download after purchase.

<!-- SCREENSHOT: Files tab showing the file upload area and Download Limit and Download Expiration fields -->

#### Uploading Files

Click inside the file upload area or drag and drop your file to upload it. You can upload multiple files — all files attached to the product become available to the customer after purchase.

Files are saved to the `images/downloads/` directory on your server. The upload supports files up to 100 MB.

After uploading, each file entry shows:

- The file display name (editable — this is what the customer sees)
- The file path on the server
- A download count showing how many times the file has been downloaded

#### Download Settings

| Field                   | Description                                                                                         | Example |
| ----------------------- | --------------------------------------------------------------------------------------------------- | ------- |
| **Download Limit**      | Maximum number of times a customer can download this file. Leave blank for unlimited downloads.     | `3`     |
| **Download Expiration** | Number of days the download remains available after purchase. Leave blank and access never expires. | `30`    |

**Download Limit** applies per customer per order. If a customer purchases the product twice, each order has its own separate download count.

**Download Expiration** is measured in days from the date of purchase. A setting of `30` means the download button disappears 30 days after the order was placed.

### Filters Tab

Add product filters (for example, genre, format, or category tags) to help customers find the product when browsing your catalog. Filters must be configured in **J2Commerce** -> **Catalog** -> **Filters** before they appear here.

### Relations Tab

Set up related products that appear on the product detail page. You can cross-sell other downloads or physical products here.

### Apps Tab

If you have app plugins installed and enabled — such as Custom Accordions or Custom Tabs — they appear here. Each app may add its own configuration fields at the product level.

***

## Saving the Product

Once all tabs are configured:

1. Click **Save** to save and continue editing.
2. Click **Save & Close** to save and return to the article list.

<!-- SCREENSHOT: Joomla toolbar showing Save and Save & Close buttons -->

The product is now live in your store (assuming the article is published and **Visible in Storefront** is set to **Yes**).

***

## Shipping

The Downloadable product type does not include a **Shipping** tab. No shipping configuration is available or required — downloadable products are never shipped. If your order contains only downloadable products, the checkout will skip the shipping step automatically.

If a customer mixes a downloadable product with a physical product in the same order, shipping will apply to the physical product only.

***

## How Customers Access Their Downloads

After a successful purchase, customers access their downloaded files through their account.

### Accessing the Downloads Page

1. The customer logs into their Joomla account on the frontend.
2. They navigate to **My Profile** (usually found in the account menu or via a J2Commerce my profile menu item).
3. They click the **Downloads** tab.

<!-- SCREENSHOT: My Profile Downloads tab showing a list of purchased downloads with download buttons -->

### Downloads Table

The downloads page shows a table with the following columns:

| Column        | Description                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------- |
| **Order**     | The order ID linked to the purchase. Click to view order details.                                 |
| **Files**     | The display name of the downloadable file.                                                        |
| **Expires**   | When download access ends. Shows the date, or "Never" if no expiry is set.                        |
| **Remaining** | How many more times the file can be downloaded. Shows the infinity symbol when there is no limit. |
| **Action**    | The download button (green), or a status badge if download is not currently available.            |

### Download Status Badges

| Badge             | Meaning                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Pending**       | The order has not yet been confirmed. Downloads become available once payment is processed. |
| **Expired**       | The download expiry date has passed. The file is no longer accessible.                      |
| **Limit Reached** | The customer has reached the maximum number of allowed downloads.                           |

***

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

### Customer Reports the Download Limit Is Reached Too Quickly

**Cause:** The **Download Limit** was set too low, or the customer downloaded the file from multiple devices.

**Solution:**

1. Open the product article and navigate to the **Files** tab.
2. Increase the **Download Limit** value, or leave it blank for unlimited downloads.
3. Click **Save & Close**.

***

## Related Topics

- [Simple Products](../catalog/products/simple-product.md) — Standard physical product type
- [Variable Products](../products/variable-product.md) — Products with size, color, or other options
- [Orders](../orders/index.md) — Managing customer orders and statuses
- [Tax Configuration](../taxes/index.md) — Setting up tax rules for digital goods
