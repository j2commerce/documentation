---
title: "Printify Print-on-Demand"
sidebar_label: "Printify Print-on-Demand"
sidebar_position: 10
description: "Connect your Printify account to J2Commerce to import print-on-demand products from your Printify shop, price them with a markup, and automate order fulfillment and shipping rates."
---

# Printify Print-on-Demand

The Printify Print-on-Demand app connects your J2Commerce store to [Printify](https://printify.com), one of the largest print-on-demand networks. Design and list products in your Printify shop as usual, then pull them straight into J2Commerce with one click. When a customer buys one, the app automatically sends the order to Printify for production and fulfillment — no inventory, no packing boxes, no shipping labels for you to print.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x
- A free Printify account with at least one shop, plus a Personal Access Token from that account

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Printify Print-on-Demand** App **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

You can install this **Printify Print-on-Demand** App using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the `app_printify.zip` file or use the Install from URL option.

![Install extensions](/img/printify-install1.webp)

## Enable the App

Once you have installed the App, you will need to enable it. There are **two** ways you can access the extension.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

![](/img/printify-apps-list.webp)

Look for **Printify Print-on-Demand**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/printify-enable1.webp)

## Configure the App

Once you click on the **Printify Print-on-Demand** Title next to the green checkmark, you are ready to start setting up the parameters. The settings are organized into six tabs: **Connection**, **Product Import**, **Pricing**, **Order Fulfillment**, **Shipping**, and **Advanced**.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

![](/img/printify-toggle-help.webp)

### Connection tab

![](/img/printify-config-connection.webp)

| Setting | Description | Default |
|---------|-------------|---------|
| **Printify API Token** | Your Personal Access Token from your Printify dashboard (**Settings -> Connections -> API**). Required before anything else on this page works. | — |
| **Test Connection** | Click to verify your API token and shop connection. Shows a confirmation message with your shop name and plan, or an error if something's wrong. | — |
| **Printify Shop** | Select the Printify shop to connect to this J2Commerce store. This dropdown fills in once you have entered and saved a valid **Printify API Token**. | — |

:::info

You must **Save** the page after pasting your token before the **Printify Shop** dropdown will show your shops. Click **Test Connection** first to confirm the token itself is valid — this button works without saving.

:::

### Product Import tab

![](/img/printify-config-import.webp)

**Import defaults** — control how newly imported products are set up in J2Commerce:

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Default Import Status** | The enabled state applied to newly imported Printify products. | Unpublished | Published, Unpublished |
| **Default Article Category** | The Joomla content category assigned to the article created for each imported product. **Required** — importing fails without it. | — | Any Joomla content category |
| **Default J2Commerce Tags** | One or more existing J2Commerce tags to assign to imported products. Products must carry a tag to appear in tag-based storefront listings. You cannot create new tags from this field — create them first. | — | Any existing tag(s) |
| **Default Tax Profile** | The J2Commerce tax profile applied to imported products. | None | Any configured tax profile |

**Product assignment** — how imported products connect to the rest of your catalog:

| Setting | Description | Default |
|---------|-------------|---------|
| **Option Field Type** | How Size/Color-style product options are displayed on the frontend. Choices are Dropdown (select), Radio Buttons, Color Swatches, or Checkboxes. | Dropdown (select) |
| **Use Print Provider as Manufacturer** | Automatically assigns the Printify print provider (e.g., Printify Choice, Monster Digital) as the product's Manufacturer/Brand. Creates the manufacturer record automatically if it doesn't already exist. | No |
| **Set Printify as Vendor** | Automatically assigns "Printify" as the vendor on imported products, creating the vendor record (linked to your admin account) if needed. | No |

### Pricing tab

![](/img/printify-config-pricing.webp)

Printify charges you a base cost per item at the time an order is fulfilled. You set a markup so your store keeps a margin.

| Setting | Description | Default |
|---------|-------------|---------|
| **Markup Type** | How the retail price is calculated from Printify's base cost — **Percentage** or **Fixed Amount**. | Percentage |
| **Markup Value** | The markup amount. For Percentage, `50` adds 50% on top of the base cost. For Fixed Amount, the value is added directly in your store currency. | `50` |

**How the math works:** for a $12.50 base cost, a 50% markup produces an $18.75 retail price. A $10.00 fixed markup on the same base cost produces $22.50. You can always edit the price on any individual variant after import.

### Order Fulfillment tab

![](/img/printify-config-fulfillment.webp)

| Setting | Description | Default |
|---------|-------------|---------|
| **Auto-Submit Orders** | Automatically submits orders containing Printify products to Printify once the order reaches the status configured below. | Yes |
| **Trigger on Order Status** | The J2Commerce order status that triggers automatic submission to Printify. | Confirmed (status 1) |
| **Auto Send to Production** | After the order is created at Printify, sends it straight to the print facility. If disabled, you must send it manually from the Order Sync screen. | Yes |
| **Printify Shipping Notifications** | Lets Printify email shipping confirmations directly to your customers. Disable this if J2Commerce already sends your own shipping emails, to avoid duplicate notifications. | No |

### Shipping tab

![](/img/printify-config-shipping.webp)

| Setting | Description | Default |
|---------|-------------|---------|
| **Show Printify Shipping Rates** | Displays Printify's shipping options at checkout for carts that contain Printify products. | Yes |
| **Shipping Handling Fee** | A flat amount added on top of every Printify shipping rate — useful for packaging costs or margin. | `0.00` |
| **Shipping Label Prefix** | Optional text added to the start of every Printify shipping method name at checkout, e.g. entering `POD: ` shows "POD: Standard Shipping." | — |
| **Enable Economy Shipping** | Shows a slower, cheaper Economy rate from Printify alongside Standard, Priority, and Express. | No |
| **Shipping Rate Cache (minutes)** | How long Printify shipping rates are cached before refreshing, to reduce API calls during checkout. Minimum 60, in steps of 60. | `360` |
| **Shipping Tax Class** | The tax class applied to Printify shipping rates at checkout. Currently only **None (no tax)** is available. | None (no tax) |
| **Mixed Cart Strategy** | How shipping is presented when a cart mixes Printify and non-Printify items. **Separate** lists all rates independently. **Sum Cheapest** adds the cheapest Printify rate on top of each of your native shipping rates. | Separate |
| **Fallback Shipping Rate** | A flat rate shown at checkout if the Printify API is unreachable. Set to `0` to block checkout for Printify-only carts when the API is down instead of guessing a rate. | `0.00` |
| **Fallback Rate Name** | The label shown at checkout for the fallback rate above. | `Shipping` |

### Advanced tab

![](/img/printify-config-advanced.webp)

| Setting | Description | Default |
|---------|-------------|---------|
| **Error Threshold** | The number of consecutive API failures before the app automatically pauses all Printify API calls (a circuit breaker, so one bad outage doesn't flood your error log or hammer Printify's API). | `10` |
| **Catalog Cache (minutes)** | How long product catalog data pulled from Printify is cached before refreshing. Minimum 60, in steps of 60. | `1440` (24 hours) |
| **Debug Logging** | Writes detailed API request/response information to a log file for troubleshooting. Only enable this while diagnosing a problem. | No |

## Getting Your Printify API Token

You need a Personal Access Token from Printify before the connection will work.

1. Log in at [printify.com](https://printify.com).
2. Click your account name in the top-right corner and choose **My profile** (or **Settings**).
3. Go to the **Connections** tab and click **API**.
4. Click **Generate new token**, give it a name like "J2Commerce," and click **Create**.
5. Copy the token immediately — Printify only shows it once.

![](/img/printify-token.webp)

Treat this token like a password. Anyone who has it can fully control your Printify shop through the API.

## Connecting Your Shop

1. Go to **J2Commerce -> Apps** and open **Printify Print-on-Demand**.
2. On the **Connection** tab, paste your token into **Printify API Token**.
3. Click **Test Connection**. You should see a message such as "Connected to Printify shop: My Shop Name (standard plan)."
4. Click **Save** in the toolbar to store the token, then reopen the settings — the **Printify Shop** dropdown will now list every shop on your account.
5. Select your shop and click **Save** again.

![](/img/printify-connection-test.webp)

Most accounts only have one shop, so the choice is obvious. If you manage several Printify shops, double-check you've picked the right one — orders and products only ever sync with the shop selected here.

## Loading and Importing Your Printify Products

Products are designed and published in your Printify shop first (using Printify's own product editor), then pulled into J2Commerce with one click from the **My Products** screen.

1. Go to **J2Commerce -> Apps -> Printify Print-on-Demand** to open the app dashboard, then click the **My Products** quick link (or go to **J2Commerce -> Apps -> Printify -> pluginview=products** from the dashboard's quick links).
2. Click **Load My Products** to fetch the product list from your Printify shop.

![](/img/printify-my-products.webp)

3. Each product appears as a card showing its image, title, and number of variants (sizes/colors), along with a badge that reads **Not Imported** or **Imported**.
4. Use the **Search your Printify products...** box to filter by name, or use the **Previous/Next** buttons to page through your shop.
5. Click **Import** on any product that shows **Not Imported**. The button shows a spinner while the import runs.

When the import completes, the app:

- Creates a Joomla article (title + description) in your configured **Default Article Category**.
- Creates the J2Commerce product record with the variants, prices, and options (Size, Color, etc.) that are enabled in Printify.
- Downloads and processes the product images from Printify's CDN.
- Applies your configured tags, tax profile, manufacturer, and vendor settings.
- Tells Printify the product was published successfully.

The card then switches to **Imported** with two buttons: **Edit in J2Commerce** (opens the product for editing) and a sync icon for pulling in future updates.

## Syncing an Imported Product

If you change a product in Printify later — adding a color, updating the base cost, disabling a variant — sync it to bring J2Commerce up to date.

**From the My Products screen:** click the sync icon (circular arrows) on an already-imported product's card.

**From the product edit screen:** open **J2Commerce -> Products**, edit the product, and look for the Printify sync badge shown on the **J2Commerce** tab. It shows the current sync status, the last-synced date and time, and an **Edit Printify** link that opens the product directly in your Printify shop editor.

![](/img/printify-sync-badge.webp)

Syncing updates base costs on existing variants (your manual price overrides are kept), adds any new enabled variants, and removes variants you've disabled in Printify. It does not touch variants you've manually hidden in J2Commerce.

## Managing Printify Orders

The **Order Sync** screen lists every J2Commerce order that contains a Printify product, along with its Printify fulfillment status.

1. Go to **J2Commerce -> Apps -> Printify Print-on-Demand**, then open the **Orders** quick link.

![](/img/printify-order-sync.webp)

2. Use the search box and the **J2Commerce Status**, **Printify Status**, and **Tracking** filters to narrow the list, and click any column heading to sort.
3. **Order** links straight to the J2Commerce order detail screen.

**Printify order status values:**

| Status | Meaning |
|--------|---------|
| **Pending** | Order not yet submitted to Printify. |
| **On Hold** | Submitted, awaiting further action. |
| **Submitted** | Order created at Printify. |
| **Sending to Production** | Being handed off for manufacturing. |
| **In Production** | Being manufactured by the print provider. |
| **Shipped** | Tracking information is available. |
| **Delivered** | Confirmed as delivered. |
| **Canceled** | Canceled at Printify. |

**Row actions:**

- **Export** — appears on orders not yet submitted; manually pushes that order to Printify. Use this if **Auto-Submit Orders** is off, or the order existed before you turned automation on.
- **Send to Production** — appears once an order is submitted but still on hold; tells Printify to start manufacturing.
- **Cancel at Printify** (trash icon) — cancels the order at Printify. You'll be asked to confirm, and this cannot be undone. Only available before production has started.
- **Refresh** — reloads the list so you can see the latest statuses updated by Printify in the background.

## Fulfilling an Individual Order

Every J2Commerce order that contains a Printify product shows a **Printify Fulfillment** panel on its order detail screen, with the same actions available from the Order Sync screen: **Submit to Printify**, **Send to Production**, **Cancel Printify Order**, and **Refresh Status**. The panel also displays the Printify order ID, submission date, tracking number and carrier (once shipped), and a shipping cost breakdown when available.

![](/img/printify-order-panel.webp)

## How It Works{#how-it-works}

1. You design and publish a product in your Printify shop, then import it into J2Commerce from **My Products** (or sync an existing import when it changes).
2. A customer adds the product to their cart and checks out. If **Show Printify Shipping Rates** is enabled, Printify's own shipping rates for the destination country appear alongside your other shipping methods.
3. When the order reaches the order status you configured under **Trigger on Order Status**, the app automatically submits the order to Printify (if **Auto-Submit Orders** is on).
4. If **Auto Send to Production** is on, Printify immediately starts manufacturing the item. Otherwise, you send it to production manually from the Order Sync screen or the order's Printify Fulfillment panel.
5. Printify prints, packs, and ships the order directly to your customer. Once it ships, the tracking carrier, number, and URL are recorded on the order automatically.
6. You track every Printify order's progress — pending through delivered — from the Order Sync screen without leaving your J2Commerce admin.

## Tips{#tips}

- **Design in Printify, import in J2Commerce** — this app does not create new Printify products for you; build and publish them in your Printify shop first, then bring them in with **Import**.
- **Leave Default Import Status set to Unpublished** while you're getting started, so you can review descriptions and pricing before a product goes live.
- **Set up your tag and category first** — create a dedicated Joomla content category and J2Commerce tag before your first import, so products land in the right place automatically.
- **Sync after every Printify change** — if you add a new color or size to a product in Printify, sync it in J2Commerce so the new variant becomes purchasable.
- **Review your markup on a real product** — check that your **Markup Value** produces a price you're comfortable with before importing your whole catalog.

## Troubleshooting{#troubleshooting}

### "Printify API token is not configured"{#printify-api-token-is-not-configured}

**Cause:** The app has not been connected to Printify, or the token wasn't saved.

**Solution:**

1. Go to **J2Commerce -> Apps -> Printify Print-on-Demand**.
2. Confirm the **Printify API Token** field on the **Connection** tab contains your token.
3. Click **Save** in the toolbar.

### Printify Shop dropdown is empty{#printify-shop-dropdown-is-empty}

**Cause:** The token has not been saved yet, so the shop list hasn't been fetched.

**Solution:**

1. Paste your token into **Printify API Token** and click **Save**.
2. Reopen the plugin settings — the **Printify Shop** dropdown now lists your shops.
3. Select your shop and **Save** again.

### "Default article category is not configured"{#default-article-category-is-not-configured}

**Cause:** The **Default Article Category** field on the **Product Import** tab is empty. Import fails without it.

**Solution:**

1. Go to the **Product Import** tab.
2. Select a Joomla content category from **Default Article Category**.
3. Click **Save**, then retry the import.

### Imported products don't show up on the storefront{#imported-products-dont-show-up-on-the-storefront}

**Cause:** The product imported as **Unpublished**, or it wasn't assigned a tag your storefront listing depends on.

**Solution:**

1. Go to **J2Commerce -> Products** and find the imported product.
2. Set its status to **Published**.
3. Confirm the product carries the tag used by your storefront's tag-based listing.

### No Printify shipping rates at checkout{#no-printify-shipping-rates-at-checkout}

**Cause:** **Show Printify Shipping Rates** is off, the cart has no Printify product in it, or the destination isn't covered by the print provider.

**Solution:**

1. Confirm **Show Printify Shipping Rates** is set to **Yes** on the **Shipping** tab.
2. Confirm the product in the cart was imported from Printify (check for the sync badge on its edit screen).
3. Try a different destination country to rule out a country-specific gap in coverage.
4. If rates were working before and stopped, the cached result may be stale — wait for the **Shipping Rate Cache** to expire, or lower the cache duration temporarily.

### Orders aren't auto-submitting to Printify{#orders-arent-auto-submitting-to-printify}

**Cause:** **Auto-Submit Orders** is off, or **Trigger on Order Status** doesn't match the status your order actually reaches.

**Solution:**

1. Confirm **Auto-Submit Orders** is **Yes** on the **Order Fulfillment** tab.
2. Confirm **Trigger on Order Status** matches the status your payment gateway sets on successful payment (for example, "Confirmed").
3. Check the Order Sync screen — if the order appears there, it was recognized as a Printify order and can be submitted with **Export**.

### API operations paused{#api-operations-paused}

**Cause:** The app hit the **Error Threshold** of consecutive API failures and paused itself to avoid flooding your error log.

**Solution:**

1. On the Printify dashboard (**J2Commerce -> Apps -> Printify Print-on-Demand**), note the warning banner.
2. Confirm your Printify API token is still valid — log in to Printify and check it hasn't been revoked.
3. If you need more detail, turn on **Debug Logging** and check the log file described below.
4. Once the underlying issue is resolved, click **Resume API Operations** on the dashboard.

### Debug log location{#debug-log-location}

When **Debug Logging** is enabled, entries are written to `app_printify.php` in your site's Joomla logs folder, using Joomla's standard log format.

## Related Topics

- [J2Commerce Products](../products/index.md)
- [Order Management](../orders/index.md)
- [Shipping Methods](../shipping/index.md)
- [Tax Profiles](../taxes/index.md)
- [Apps and Extensions](./index.md)
