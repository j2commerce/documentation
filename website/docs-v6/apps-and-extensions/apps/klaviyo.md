---
title: "Klaviyo Integration"
sidebar_label: "Klaviyo"
sidebar_position: 40
description: "Connect J2Commerce to Klaviyo to send shopping events, trigger email and SMS automations, power a product catalog feed, and backfill historical orders."
---

# Klaviyo Integration

The Klaviyo app connects your J2Commerce store to [Klaviyo](https://www.klaviyo.com/) so your marketing automations have the purchase-intent data they need to work. When a shopper adds a product, starts checkout, or completes an order, J2Commerce sends those events directly to Klaviyo in real time. A JSON product feed lets Klaviyo browse your full catalog, and a built-in admin tool lets you send past orders to Klaviyo when you first connect.

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_klaviyo.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_klaviyo.zip` package file.
4. The plugin installs and enables automatically.

After installation, go to **J2Commerce** -> **Apps** to configure it.

<!-- SCREENSHOT: J2Commerce Apps list showing the Klaviyo app entry -->

## Prerequisites

- J2Commerce 6 installed and working
- A Klaviyo account — sign up free at [klaviyo.com](https://www.klaviyo.com/)
- Your Klaviyo **Private API Key** (for server-side event tracking)
- Your Klaviyo **Public Site ID** (for the onsite tracking script, if you want it)

---

## Finding Your Klaviyo Keys

You need two different credentials. They are found in different places inside Klaviyo.

### Private API Key

The private key is used by J2Commerce's server to send events to Klaviyo. It starts with `pk_`.

1. In Klaviyo, click your account name in the lower-left corner.
2. Go to **Settings** -> **API Keys**.
3. Under **Private API Keys**, click **Create Private API Key**.
4. Give it a name (e.g., "J2Commerce") and grant at minimum **Full Access** (or scope it to Events and Profiles).
5. Copy the key — it starts with `pk_live_...` or `pk_test_...`.

<!-- SCREENSHOT: Klaviyo API Keys screen showing Private API Keys section -->

### Public Site ID

The Public Site ID is a 6-character code used by the Klaviyo onsite JavaScript snippet. It is NOT the same as the private key.

1. In Klaviyo, go to **Settings** -> **Account** -> **API Keys**.
2. Find the **Public API Key / Site ID** section at the top.
3. Copy the 6-character code (example: `AbCd12`).

<!-- SCREENSHOT: Klaviyo API Keys screen showing Public Site ID at the top -->

---

## Configuration

Open the Klaviyo app settings by going to **J2Commerce** -> **Apps**, then clicking the name of the Klaviyo app.

<!-- SCREENSHOT: Klaviyo app settings form with all fields visible -->

| Field | Description | Recommended Value |
|-------|-------------|-------------------|
| **Private API Key** | Server-side key for sending events. Starts with `pk_`. Required for all event tracking and backfill. | Your `pk_live_...` key |
| **Public Site ID** | 6-character site ID for the onsite JavaScript snippet. Required only if **Enable Onsite Tracking** is set to **Yes**. | Your 6-character code |
| **Enable Onsite Tracking** | Loads the Klaviyo tracking snippet (`klaviyo.js`) on every frontend page of your site. Needed for Klaviyo's on-site forms and browse abandonment features. | **Yes** (unless you load the snippet another way) |
| **Product Feed Categories** | Limits the product feed to products in the selected Joomla content categories. Leave empty to include all published products. | Leave empty for all products, or select specific categories |
| **Feed Brand Name** | Populates the `brand` field in the product feed. Usually your store or company name. | Your store name |
| **Custom Field Mappings** | Maps Joomla custom field IDs to feed keys, one per line. See [Custom Field Mappings](#custom-field-mappings) below. | Leave empty unless you use Joomla custom fields |
| **Backfill Order States** | Comma-separated order state IDs to include when running the historical backfill. | `1,2,7,8` (Confirmed, Processed, Shipped, Delivered) |

Click **Save** after filling in your settings.

---

## What Events Are Sent

The plugin sends these events to Klaviyo automatically. You can use them to trigger flows in Klaviyo's Flow Builder.

| Event Name (in Klaviyo) | When It Fires | Key Properties |
|-------------------------|---------------|---------------|
| **Added to Cart** | When a shopper adds any product to the cart | Product ID, name, SKU, quantity, item price, total value, image URL, product URL, checkout URL |
| **Started Checkout** | When the checkout page loads | Subtotal, total, currency |
| **Placed Order** | After a successful payment | Order ID, total, subtotal, discount, currency, line items |
| **Ordered Product** | One event per line item on a completed order | Order ID, product ID, name, SKU, quantity, item price, row total |
| **Renewed Order** | After a subscription renewal payment succeeds | Same properties as Placed Order |
| **Renewed Product** | One event per line item on a renewal | Same properties as Ordered Product |

For logged-in customers, the event profile includes their email, display name, and Joomla user ID. For guests, the email is taken from the session when available.

---

## Product Feed

The Klaviyo integration provides a JSON product feed that you can register in Klaviyo as a catalog source. This powers Klaviyo's product recommendation blocks in emails.

### Feed URL

The feed is served by J2Commerce at this URL:

```
https://yoursite.com/index.php?option=com_j2commerce&view=products&format=feed&type=klaviyo
```

Replace `https://yoursite.com` with your actual site URL. If your site uses Search Engine Friendly (SEF) URLs, you can still use the raw URL above — it works regardless of SEF settings.

<!-- SCREENSHOT: Browser address bar showing the feed URL with a sample JSON response below it -->

### What the Feed Contains

Each product in the feed includes:

- `id` — J2Commerce product ID
- `title` — Product name (HTML stripped)
- `description` — Short description (HTML stripped)
- `price` — Price from the master variant
- `url` — Full product page URL
- `image_url` — Main product image URL
- `sku` — SKU from the master variant
- `brand` — Value from the **Feed Brand Name** setting
- `custom_label_0`, `custom_label_1`, `custom_label_2` — Extra fields (populated via Custom Field Mappings)

Only published products are included. If you selected categories in **Product Feed Categories**, only products in those categories appear.

### Registering the Feed in Klaviyo

1. In Klaviyo, go to **Catalog** -> **Product Feeds**.
2. Click **Add Product Feed**.
3. Choose **JSON** as the feed format.
4. Paste your feed URL into the source field.
5. Map Klaviyo's catalog fields to your feed fields. Klaviyo auto-detects most fields because the feed uses standard field names.
6. Save and sync the feed.

<!-- SCREENSHOT: Klaviyo Product Feeds screen showing the Add Product Feed form with URL pasted in -->

### Custom Field Mappings

If you store extra product data in Joomla custom fields (for example, a GTIN/barcode, a Google product category, or a secondary image), you can map those fields into the feed.

In the **Custom Field Mappings** setting, enter one mapping per line in the format:

```
[joomla_field_id]=[klaviyo_feed_key]
```

For example, to map Joomla custom field ID 5 into `custom_label_0`:

```
5=custom_label_0
```

Valid target keys are: `custom_label_0`, `custom_label_1`, `custom_label_2`. The field value is HTML-stripped before output.

To find a Joomla custom field ID, go to **System** -> **Custom Fields** and look at the **ID** column in the fields list.

---

## Historical Order Backfill

When you first connect J2Commerce to Klaviyo, your Klaviyo account has no purchase history. The backfill tool lets you send past orders to Klaviyo as **Placed Order** events so your flows and segments have historical data to work with.

The backfill runs in the admin and requires J2Commerce administrator access — it is not accessible from the front end.

### Running the Backfill

1. Go to **J2Commerce** -> **Apps**.
2. Click the **Klaviyo** app name to open its admin view.
3. Scroll down to the **Historical Order Backfill** section.
4. Set a **From Date** and **To Date** to define the order date range.
5. Click **Run Backfill**.

<!-- SCREENSHOT: Klaviyo app admin view showing the Historical Order Backfill card with date pickers and Run Backfill button -->

The tool processes up to 200 orders per run. For large order histories, run it in overlapping date-range batches — for example, process one year at a time.

When the run completes, a message tells you how many orders were sent to Klaviyo.

### Which Orders Are Included

The backfill uses the **Backfill Order States** setting to filter orders. The default value `1,2,7,8` covers:

| State ID | Status |
|----------|--------|
| 1 | Confirmed |
| 2 | Processed |
| 7 | Shipped |
| 8 | Delivered |

To include additional states, add their IDs to the **Backfill Order States** field as a comma-separated list.

:::note
The backfill sends **Placed Order** and **Ordered Product** events only. It does not send Added to Cart or Started Checkout events for historical orders.
:::

---

## What's New vs the Old J2Store Klaviyo Plugin

If you used the Klaviyo plugin on J2Store v4, here is what changed in J2Commerce 6.

**Klaviyo Events API replaces the deprecated track API.** Klaviyo sunset the old base64-encoded `GET /api/track` endpoint. The J2Commerce plugin uses the modern `POST /api/events` endpoint with proper JSON:API payloads and an `Authorization: Klaviyo-API-Key` header. Events now appear in Klaviyo reliably and with full property support.

**Secure admin-only backfill.** The old plugin exposed a public URL that would return order data to anyone who knew the address — a significant data leak. The J2Commerce plugin replaces that with an admin panel tool that requires J2Commerce administrator permissions and a CSRF token. Order data never leaves the server over a public URL.

**Configurable brand and field mappings.** The old plugin had the store brand name hardcoded in the PHP source, requiring a code edit to change it. Both the brand name and custom-field mappings are now plugin configuration settings — no code changes needed.

**Two separate API keys.** The old plugin used a single `api_key` field that mixed up the private and public keys. J2Commerce uses a **Private API Key** for server-side calls and a separate **Public Site ID** for the onsite JavaScript snippet, matching how Klaviyo's own documentation distinguishes them.

**Native Joomla 6 architecture.** The plugin is built on native Joomla 6 MVC with proper dependency injection, a typed service provider, and no FOF or jQuery dependencies.

---

## Troubleshooting

### Events are not appearing in Klaviyo

**Check that the Private API Key is saved correctly.** Go to **J2Commerce** -> **Apps** -> **Klaviyo** and confirm the **Private API Key** field contains a key starting with `pk_`. If the field is empty, no events are sent.

**Check Klaviyo's metric names.** In Klaviyo, go to **Analytics** -> **Metrics** and search for "Added to Cart" or "Placed Order". If the metric exists but shows no recent activity, the key is correct but events may not be reaching Klaviyo. Check the Joomla log file at `logs/plg_j2commerce_app_klaviyo.php` for API error details.

**For subscription events (Renewed Order/Renewed Product),** confirm the Subscription Products app is installed and active on your site.

### The onsite tracking script is not loading

Confirm two things are set in the plugin:

1. **Enable Onsite Tracking** is set to **Yes**.
2. **Public Site ID** contains your 6-character Klaviyo site ID (not your private key).

To verify the script is loading, open your site in a browser, view the page source, and search for `klaviyo.com/onsite/js/klaviyo.js`. If it is not present, re-check both settings and save.

### The product feed is empty

If the feed URL returns an empty JSON array (`[]`), check:

- **Product Feed Categories** — if categories are selected, only products in those Joomla categories appear. Clear the field to include all products.
- Published products exist in your store. The feed only includes products with **Published** status.

### The backfill shows 0 orders sent

- Confirm the **Private API Key** is filled in. The backfill uses the same key as live events.
- Check that your date range actually contains orders. Try widening the range.
- Check the **Backfill Order States** setting. If your orders have a custom state ID not in the list, add it.
- The backfill caps at 200 orders per run. If you selected a very wide range with more than 200 orders, only the first 200 (oldest) are sent. Run again with a narrower range to continue.

---

## Related Topics

- [Apps Overview](../index.md)
- [Products](../../products/index.md)
