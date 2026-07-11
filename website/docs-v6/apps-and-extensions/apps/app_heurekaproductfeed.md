# Heureka Product Feed

Heureka.cz (and its Slovak counterpart Heureka.sk) is the largest price-comparison shopping portal in the Czech Republic and Slovakia. Millions of shoppers visit Heureka to compare prices and read reviews before buying.

The Heureka Product Feed app generates a live XML product feed in the format Heureka requires. Once you register the feed URL in your Heureka merchant account, Heureka fetches your products on a schedule and makes them eligible to appear in search results, product listings, and price comparisons — all without manual exports or uploads.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Heureka Product Feed** app **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `app_heurekaproductfeed.zip` file or use the Install from URL option.

![](/img/install.webp)

## Enable the App

Once you have installed the app, you will need to enable it. There are **two** ways you can access the extension.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

![](/img/gift-wrap-apps.webp)

Look for **Heureka Product Feed**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/heureka_enable.webp)

## Configure the App

Click the **Heureka Product Feed** title next to the green checkmark to open the settings screen.

:::tip

Click the **Toggle Inline Help** button in the toolbar to reveal a description beneath each field as you configure it.

:::

![](/img/heureka_toggle.webp)

### Feed Settings tab

![](/img/heureka_basic.webp)

**Feed URL:** The **Feed URL** field displays the unique link that Heureka uses to fetch your product data. This is a read-only display — copy it using the **Copy URL** button next to the field.

You will paste this URL into your Heureka merchant account when setting up your data source. See [Submitting the Feed to Heureka.cz](#submitting-the-feed) below.

**Store Title:** An optional store name that appears inside the feed to identify it. Leave blank if you do not need a custom label.

**Category Prefix:** Selects the Heureka marketplace. The selected value is prepended to every product category path in the feed.

- Heureka.cz

- [Heureka.sk](http://Heureka.sk)

:::tip

Use `Heureka.cz` for Czech listings and `Heureka.sk` for Slovak listings. If your store targets both portals, configure two separate plugin instances.

:::

**Default Delivery Days:** The number of business days for delivery shown on every product in the feed when no product-level value is set.

**Default VAT Rate (%):** The VAT percentage to include in the feed. Leave blank to omit the VAT element from the feed entirely.

**Default Heureka CPC:** Your default Heureka cost-per-click bid, as a decimal number. Set to `0` or leave blank to omit the bid element from the feed.

**Default Heureka Category:** The fallback Heureka category path used when a product has no category assigned at the product or category level. Enter a pipe-separated path such as `Electronics | Cameras`. This is the last resort in the category resolution chain — see [Setting the Heureka Category](#setting-the-heureka-category) for full details.

**Excluded Products:** A product selector where you can pick individual products to leave out of the feed. Use this for test products, discontinued items, or anything not suitable for public comparison on Heureka.

**Include Unpublished:** Controls whether products that are unpublished in Joomla are included in the generated feed.

Leave this set to **No** in almost all cases. Set to **Yes** only if you need to preview feed entries for products not yet live on your site.

**Cache Duration (minutes):** How long the generated feed XML is cached on the server before it is regenerated. Heureka typically fetches feeds once a day, so 60 minutes balances server performance with freshness. Set to `0` to disable caching entirely.

:::info

When the feed is cached, changes you make to products or settings may take up to this many minutes to appear in the feed Heureka fetches. To force an immediate refresh, clear the Joomla cache: **Home Dashboard** -> **Cache** -> **Delete All**.

:::

**Feed Token:** An optional secret token that restricts access to the feed URL. When a token is set, the feed only responds correctly when `&token=YOUR_TOKEN` is appended to the URL. Leave blank to allow anyone with the URL to fetch the feed.

When you enter a token, the **Feed URL** field updates to show the full URL including the token parameter. Copy that updated URL and use it when registering the feed with Heureka.

### Delivery Methods tab

![](/img/heureka_delivery.webp)

The **Delivery Methods** tab lets you declare the shipping carriers and costs that appear in the feed. Heureka uses this information to show estimated delivery costs on its comparison pages.

Click **Add Item** to create a delivery entry. Each entry has three fields:

**Carrier:** The shipping carrier from Heureka's official carrier list. Select the carrier that matches your shipping methods. **Example:** `DPD`

**Delivery Price:** The flat delivery cost for this carrier, in your store currency (up to 2 decimal places). Enter `0` for free delivery. **Example:**`4.99`

**Cash on Delivery Price:** An additional surcharge when the customer pays on delivery. Leave blank or `0` to omit. **Example:**`1.50`

You can add multiple entries for different carriers.

**Fallback Carrier:** If no delivery methods are configured in the list above, the feed uses the fallback carrier settings. This ensures the required DELIVERY element is always present in the feed. The carrier used when no delivery methods are configured above.

**Fallback Delivery Price:** The delivery price for the fallback carrier.

## Setting the Heureka Category {#setting-the-heureka-category}

The Heureka category tells Heureka where to list each product in its taxonomy. Every product in the feed must have a valid category path.

The plugin resolves the category for each product using a four-tier fallback chain, from most specific to most general:

1. **Product-level override** — If a Heureka category is set directly on an individual product, that value is used. This is the highest priority.
2. **Category-level override** — If no product override exists, the plugin checks whether the Joomla content category the product belongs to has a Heureka category assigned.
3. **Joomla category hierarchy** — If neither the product nor its category has a Heureka category, the plugin builds a path automatically from the product's Joomla content category ancestry. For example, a product in a category nested as Home > Electronics > Cameras produces `Electronics | Cameras`.
4. **Plugin default** — If none of the above produce a result, the **Default Heureka Category** from the plugin settings is used as a last resort.

In every case, the **Category Prefix** (`Heureka.cz` or `Heureka.sk`) is automatically prepended to the path.

:::tip

For most stores, setting the **Default Heureka Category** in the plugin settings is enough to get started. Refine individual products or categories only when you want a product to appear in a more precise taxonomy node than its Joomla category path provides.

:::

### Setting a Heureka Category on a Product

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Open the product you want to edit.
3. Click the **J2Commerce** tab, then the **Apps** tab.
4. Locate the **Heureka Category** field and type the full category path — for example, `Electronics | Cameras | DSLR Cameras`.
5. Click **Save** or **Save & Close**.

![](/img/heureka_product.webp)

This value overrides everything else in the fallback chain for that product.

### Setting a Heureka Category on a Content Category

1. Go to **Content** -> **Categories**.
2. Open the category you want to edit.
3. Click the **J2Commerce** tab (or the tab where J2Commerce fields appear).
4. Locate the **Heureka Category** field and enter the category path.
5. Click **Save & Close**.

This value applies to all products in that category that do not have their own product-level override.

## Submitting the Feed to Heureka.cz {#submitting-the-feed}

After configuring the plugin, register the feed URL in your Heureka merchant account:

1. Copy the **Feed URL** from the top of the plugin settings screen (use the **Copy URL** button).
2. Log in to your Heureka merchant account (Heureka.cz or Heureka.sk depending on your marketplace).
3. Navigate to the XML feed or product feed settings section of your merchant account.
4. Paste the Feed URL and save it as your data source.
5. Heureka will fetch the feed on its next scheduled run.

:::info

Heureka must be able to reach your feed URL from the public internet. A URL on a local development server (such as `localhost` or a private IP address) will not work for a live fetch. During development, you can visit the feed URL in your browser to download the XML and review it manually.

:::

Once Heureka has fetched your feed successfully, your products will appear in the product management section of your merchant account, where you can review any validation warnings before your listings go live.

## How It Works {#how-it-works}

When Heureka (or anyone with the feed URL) requests the feed:

1. The plugin checks whether a valid cached feed exists within the **Cache Duration** window. If so, it serves the cached XML immediately.
2. If no valid cache exists, the plugin queries your J2Commerce product catalog, applying the **Excluded Products** filter and the **Include Unpublished** setting. Products with a price of zero or that have hidden visibility are automatically excluded from the query.
3. For each product, the plugin resolves the Heureka category using the four-tier chain described above.
4. If a product has multiple sellable variants (for example, different sizes or colors), each variant becomes a separate feed entry. All entries for the same product share a group ID so Heureka knows they belong to the same base product.
5. If a product has an active time-limited sale price lower than its regular price, the sale price is used as the listed price in the feed.
6. The plugin outputs a valid Heureka SHOP XML document. Each product entry includes:

   - Product name, URL, and main product image
   - Up to 10 additional product images
   - Price, category path, and delivery information
   - Product description (HTML tags stripped)
   - EAN barcode (if a valid 13-digit barcode is set on the variant)
   - Manufacturer name and SKU
   - VAT rate and Heureka CPC bid (when configured)
7. The output is cached for **Cache Duration** minutes before the next regeneration.

## Tips {#tips}

- **Set a Default Heureka Category before going live.** Products with no resolvable category fall back to a generic placeholder, which may trigger validation warnings in your Heureka merchant account.
- **Match the Category Prefix to your target portal.** Use `Heureka.cz` for Czech and `Heureka.sk` for Slovak listings. Using the wrong prefix may cause category mismatches on the portal.
- **Check the feed in a browser first.** Visit the Feed URL directly in your browser. You should see XML starting with `<SHOP`. If you see an error or blank page, confirm the plugin is enabled and J2Commerce is installed correctly.
- **Enter EAN barcodes on your products.** Products with a valid 13-digit EAN (barcode) are matched more accurately in Heureka's catalog, which improves visibility in comparison results.
- **Use the Excluded Products field for internal products.** Any test, non-sellable, or draft product in your catalog should be excluded to avoid spurious Heureka listings.
- **Secure your feed with a token** if your pricing is commercially sensitive and you prefer not to expose it publicly. The token is included automatically in the Feed URL shown in the plugin settings once you save it.
- **Free delivery?** Enter `0` as the Delivery Price for a carrier entry to indicate free delivery for that carrier.

## Troubleshooting {#troubleshooting}

### Feed changes are not showing up on Heureka

**Cause:** The feed is being served from cache and has not regenerated since you last made changes to your products or settings.

**Solution:**

1. Wait for the cache to expire (determined by the **Cache Duration** setting in minutes).
2. To force an immediate refresh, clear the Joomla cache: **Home Dashboard** -> **Cache** -> **Delete All**. The next request to the feed URL will regenerate a fresh feed.

### A product shows the wrong category on Heureka

**Cause:** The plugin is resolving the category through the automatic fallback chain rather than a specific override you intended to set.

**Solution:**

1. Identify which tier of the [category fallback chain](#setting-the-heureka-category) is currently supplying the category for that product.
2. To fix a single product, open the product in **J2Commerce** -> **Catalog** -> **Products**, click the **Apps** tab, and set the **Heureka Category** field to the correct path.
3. To fix all products in a Joomla category, open the category in **Content** -> **Categories**, click the **J2Commerce** tab, and set the **Heureka Category** field there.

### A product is missing from the feed

**Cause:** The product is being excluded by one of several automatic filters.

**Solution:**

Check each of the following in turn:

- The product is published in Joomla (or **Include Unpublished** is set to **Yes** in the plugin settings).
- The product has a price greater than zero. Products with a zero price are never included in the feed.
- The product is not listed in the **Excluded Products** field in the plugin settings.
- The product's visibility is set to visible (not hidden) in J2Commerce.

### The feed URL returns an error or blank page

**Cause:** The plugin is disabled, J2Commerce is not installed, or a **Feed Token** is set but missing from the URL you are testing.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and confirm **Heureka Product Feed** shows a green checkmark.
2. If you set a **Feed Token**, make sure you are using the full URL — including `&token=YOUR_TOKEN` — that appears in the plugin settings after saving.
3. Clear the Joomla cache: **Home Dashboard** -> **Cache** -> **Delete All**.
