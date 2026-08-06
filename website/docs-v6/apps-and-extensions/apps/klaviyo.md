---
title: "Klaviyo Integration"
sidebar_label: "Klaviyo"
sidebar_position: 40
description: "Connect J2Commerce to Klaviyo to send shopping events, trigger email and SMS automations, power a product catalog feed, and backfill historical orders."
---

# Klaviyo

The Klaviyo app connects your J2Commerce store to [Klaviyo](https://www.klaviyo.com/) so your email and SMS marketing has the shopping data it needs to work. It sends onsite browsing activity, cart activity, and order events to Klaviyo in real time, keeps your product catalog and coupons in sync, and gives you a reporting dashboard right inside J2Commerce.

## Requirements

- with PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- A Klaviyo account — sign up free at [klaviyo.com](https://www.klaviyo.com/)

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Klaviyo** App **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

You can install this **Klaviyo** App using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the plugin ZIP file or use the Install from URL option.

<!-- SCREENSHOT: System -> Install -> Extensions screen with the Klaviyo app ZIP selected -->

## Enable the App

Once you have installed the App, you will need to enable it. There are **two** ways you can access the extension.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing the Klaviyo app entry -->

Look for **Klaviyo**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

<!-- SCREENSHOT: Klaviyo app entry after enabling, showing the green checkmark -->

## Configure the App

Once you click on the **Klaviyo** Title next to the green checkmark, you are ready to start setting up the parameters.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

<!-- SCREENSHOT: Klaviyo app settings form with the tab list visible -->

### Connection tab

| Field | Description | Default |
|---|---|---|
| **Private API Key** | Your Klaviyo private API key (begins with `pk_`). Used for server-side API calls. | *(empty)* |
| **Public Site ID** | Your Klaviyo 6-character public site ID. Used to load the onsite `klaviyo.js` tracking snippet. | *(empty)* |
| **Enable Onsite Tracking** | Loads the Klaviyo tracking snippet on all frontend pages. Requires the **Public Site ID**. | Yes |

### Onsite Tracking tab

| Field | Description | Default |
|---|---|---|
| **Enable Customer Identification** | Identify logged-in customers to the onsite Klaviyo snippet so their browsing activity is attributed to their profile. | Yes |
| **Enable Viewed Product Tracking** | Send a Viewed Product event to the onsite Klaviyo snippet when a customer views a product detail page. | Yes |
| **Enable Added to Cart Beacon** | Send an Added to Cart event to the onsite Klaviyo snippet the moment a customer adds a product to their cart. | Yes |
| **Enable Browse Tracking** | Send Viewed Category and Searched Site events to the onsite Klaviyo snippet when a customer browses a category or searches your store. | Yes |
| **Enable Back-in-Stock Notifications** | Show a Notify Me button on out-of-stock product pages so shoppers can subscribe to a Klaviyo back-in-stock alert for that variant. | No |

### Order Events tab

| Field | Description | Default |
|---|---|---|
| **Enable Order Events** | Send Placed Order, Paid for Order, Order Fulfilled, Order Canceled, and Order Refunded events to Klaviyo. | Yes |
| **Enable Cart Events** | Send Added to Cart and Started Checkout events to Klaviyo. | Yes |
| **Paid Order Status** | Order status that triggers the Klaviyo Paid for Order event. | Confirmed |
| **Fulfilled Order Status** | Order status that triggers the Klaviyo Order Fulfilled event. | Shipped |
| **Canceled Order Status** | Order status that triggers the Klaviyo Order Canceled event. | Cancelled |
| **Refunded Order Status** | Order status that triggers the Klaviyo Order Refunded event. Leave blank to disable. | *(none)* |
| **Backfill Order States** | Order statuses to include in the date-ranged backfill. | Confirmed, Processed, Shipped, Delivered |

Every status field lists whatever order statuses are configured in your store, so you can point them at custom statuses too.

### Abandoned Cart tab

| Field | Description | Default |
|---|---|---|
| **Enable Abandoned Cart Tracking** | Send a Klaviyo metric for registered customers' idle carts, so an Abandoned Cart flow can be triggered. | No |
| **Idle Timeout** | How long a cart must be untouched before it is considered abandoned and reported to Klaviyo. Options: 1 Hour, 6 Hours, 10 Hours, 24 Hours. | 6 Hours |

### Consent tab

| Field | Description | Default |
|---|---|---|
| **Enable Consent Checkbox** | Show a marketing consent checkbox during checkout. Checking it subscribes the customer's email (and phone, if SMS is enabled) to Klaviyo marketing. | Yes |
| **Consent Checkbox Label** | Custom label text for the consent checkbox. Leave blank to use the default text ("Keep me updated with news and offers by email."). | *(empty)* |
| **Enable SMS Consent** | When consent is given, also attach the customer's billing phone number as an SMS marketing identifier. | No |

### Segmentation tab

| Field | Description | Default |
|---|---|---|
| **Subscribe to List** | Klaviyo list that consented customers are added to. Leave as "No List Subscription" to use your Klaviyo account's default opt-in list. Populates automatically with the lists in your Klaviyo account once **Private API Key** is saved. | No List Subscription |

### Catalog tab

| Field | Description | Default |
|---|---|---|
| **Enable Product Catalog Sync** | Sync products and variants to the Klaviyo catalog when they are saved or deleted. | Yes |
| **Enable Category Catalog Sync** | Sync Joomla categories to the Klaviyo catalog and relate their products, so Klaviyo can recommend and report by category. | Yes |

### Coupons tab

| Field | Description | Default |
|---|---|---|
| **Enable Coupon Sync** | Allow the **Sync Coupons** dashboard action to push enabled J2Commerce coupons and their redeemable codes to Klaviyo for use in flows and campaigns. | No |

### Product Feed tab

| Field | Description | Default |
|---|---|---|
| **Product Feed Categories** | Restrict the Klaviyo product feed to products in these Joomla categories. Leave empty to include all products. | *(none — all products)* |
| **Feed Brand Name** | Brand or store name to populate the brand field in the Klaviyo product feed. | *(empty)* |
| **Custom Field Mappings** | Map Joomla custom field IDs to Klaviyo feed keys, one per line in the format `[field_id]=[klaviyo_key]` (for example `5=custom_label_0`). | *(empty)* |

### Custom Property Mapping tab

| Field | Description |
|---|---|
| **Custom Properties** | A repeatable table that adds extra properties to the Viewed Product event and to order/product events. Each row maps a **Property Key** (the name that appears in Klaviyo) to a **Source Type** and a **Source Field**. |

Available source types:

| Source Type | What it pulls from |
|---|---|
| **Product Field** | A field on the product being viewed. |
| **Order Custom Field** | One of your store's own order custom fields. |
| **Order Field** | A field on the order (for example order total). |
| **User Field** | A field on the shopper's Joomla user account. |
| **Static Value** | A fixed piece of text you type in yourself. |

### Webhooks tab

| Field | Description | Default |
|---|---|---|
| **Enable Inbound Webhooks** | Allow Klaviyo to forward consent, unsubscribe, and bounce events back to this store. Requires an Advanced Klaviyo plan (Advanced KDP) or partner API access to register. | No |
| **Webhook Secret** | A secret key (at least 16 characters) used to verify incoming webhook requests are genuinely from Klaviyo. A strong value is generated for you automatically — keep it, or replace it with your own. Enter the same value when creating the webhook in Klaviyo. | *(auto-generated)* |

### Data Quality tab

| Field | Description | Default |
|---|---|---|
| **Enable Guest Profile De-duplication** | On login, merge a prior guest-checkout Klaviyo profile into the customer's registered profile when a genuine duplicate is detected. Best-effort — most logins have nothing to merge. | No |

### Signup Form tab

| Field | Description | Default |
|---|---|---|
| **Klaviyo Form ID** | The ID of a Klaviyo-hosted signup form (from the form's URL: `klaviyo.com/forms/[ID]`). When set, an embed target for this form is added to every storefront page and Klaviyo's onsite snippet renders it automatically. | *(empty)* |

### Advanced tab

| Field | Description | Default |
|---|---|---|
| **Debug Logging** | Log detailed sync activity when Joomla debug mode is also enabled. | No |

### Dashboard tab

| Field | Description | Default |
|---|---|---|
| **Dashboard Cache Duration (seconds)** | How long the dashboard's Klaviyo reporting data is cached before it is refetched. Klaviyo's reporting endpoints are tightly rate-limited, so a short duration can cause a "rate limited" notice under heavy dashboard use. | 900 |

Click **Save** after filling in your settings.

## Connecting to Klaviyo

Before anything can sync, you need your Klaviyo private key pasted into the app and a successful connection test.

1. In Klaviyo, click your account name in the lower-left corner and go to **Settings -> API Keys**.
2. Under **Private API Keys**, click **Create Private API Key**, give it a name (for example "J2Commerce"), and grant at least Full Access, then copy the key.

<!-- SCREENSHOT: Klaviyo API Keys screen showing the Private API Keys section -->

3. If you also want the onsite tracking snippet and forms, scroll to the **Public API Key / Site ID** section at the top of the same screen and copy the 6-character code.

<!-- SCREENSHOT: Klaviyo API Keys screen showing the Public Site ID at the top -->

4. In J2Commerce, open **Apps -> Klaviyo**, paste the **Private API Key** (and **Public Site ID** if you copied one) on the **Connection** tab, then click **Save**.
5. Open the **Klaviyo** app's dashboard (click the app's name in the Apps list) and click **Test Connection** in the toolbar.

<!-- SCREENSHOT: Klaviyo dashboard toolbar with the Test Connection button highlighted -->

A successful test shows a **Connected** badge along with your Klaviyo account name, default sender email, and whether it is a test account. If the test fails, double-check that the key was copied in full and was granted the right access.

## Choosing What Gets Tracked

The **Onsite Tracking** tab controls what happens as a shopper browses your store, and the **Order Events** tab controls what happens once they buy. Turn off any individual toggle to stop that specific signal from reaching Klaviyo.

On the order side, each lifecycle event is tied to one of your store's own order statuses:

- **Placed Order** fires automatically whenever a new order is saved.
- **Paid for Order** fires when the order reaches the status you chose in **Paid Order Status**.
- **Order Fulfilled** fires at your chosen **Fulfilled Order Status**.
- **Order Canceled** fires at your chosen **Canceled Order Status**.
- **Order Refunded** fires at your chosen **Refunded Order Status**, if one is set.

This means you can rename or reorganize your order statuses in **Setup -> Order Statuses** and simply repoint these fields — the app never assumes a fixed status name.

## Tracking Abandoned Carts

Turn on **Enable Abandoned Cart Tracking** on the **Abandoned Cart** tab to have J2Commerce watch registered shoppers' carts and tell Klaviyo when one goes idle.

1. Open **Apps -> Klaviyo -> Abandoned Cart** tab.
2. Set **Enable Abandoned Cart Tracking** to **Yes**.
3. Choose an **Idle Timeout** — how long a cart has to sit untouched before it counts as abandoned (1, 6, 10, or 24 hours).
4. Click **Save**.

<!-- SCREENSHOT: Abandoned Cart tab with the toggle and timeout dropdown visible -->

Once a cart passes the timeout, J2Commerce sends Klaviyo an abandoned-cart signal for that shopper, ready to trigger an Abandoned Cart flow in Klaviyo's Flow Builder. This check only applies to carts belonging to signed-in customers, not anonymous guest carts.

## Syncing Products, Categories, and the Product Feed

With **Enable Product Catalog Sync** and **Enable Category Catalog Sync** turned on (both are on by default), every time you save or delete a product, J2Commerce automatically updates the matching item in Klaviyo's catalog — no manual step needed. To push your entire existing catalog in one go:

1. Open the **Klaviyo** dashboard.
2. Under **Quick Links**, click **Sync Products** to queue every enabled product, or **Sync Categories** to queue every category that has products in it.

<!-- SCREENSHOT: Klaviyo dashboard Quick Links card with Sync Products and Sync Categories buttons -->

Separately, the app also serves a JSON **product feed** you can register directly with Klaviyo's Catalog feature to power product-recommendation blocks in emails.

3. The feed is always available at:

```
https://yoursite.com/index.php?option=com_j2commerce&view=products&format=feed&type=klaviyo
```

Replace `https://yoursite.com` with your actual site address. It works whether or not your site uses Search Engine Friendly (SEF) URLs.

4. In Klaviyo, go to **Catalog -> Product Feeds -> Add Product Feed**, choose **JSON**, paste your feed URL, map the fields (Klaviyo auto-detects most of them), then save and sync.

<!-- SCREENSHOT: Klaviyo Product Feeds screen with the feed URL pasted into the source field -->

Use **Product Feed Categories** on the **Product Feed** tab to limit the feed to specific categories, and **Feed Brand Name** to fill in the feed's brand field. If you store extra data (like a barcode or a secondary image) in a Joomla custom field, add a line to **Custom Field Mappings** in the format `[field_id]=[klaviyo_key]` — valid feed keys are `custom_label_0`, `custom_label_1`, and `custom_label_2`. Find a custom field's ID under **System -> Custom Fields**.

## Back-in-Stock Notifications

Turn on **Enable Back-in-Stock Notifications** on the **Onsite Tracking** tab to add a **Notify me** button beside the stock status on any out-of-stock product page.

<!-- SCREENSHOT: Product page showing the Notify me button next to an out-of-stock indicator -->

A shopper types their email and clicks **Notify me**; that email is registered with Klaviyo against that specific product variant. If the shopper is already signed in, their email is filled in automatically. When you restock the variant, your Klaviyo back-in-stock flow handles the follow-up email.

## Marketing Consent at Checkout

With **Enable Consent Checkbox** turned on (the default), a checkbox appears during the shipping and payment step of checkout, inviting the shopper to opt in to marketing.

<!-- SCREENSHOT: Checkout shipping/payment step showing the marketing consent checkbox -->

- The checkbox is **unchecked by default** — nobody is opted in without acting.
- Use **Consent Checkbox Label** to write your own wording, or leave it blank to use "Keep me updated with news and offers by email."
- Turn on **Enable SMS Consent** to also capture the customer's billing phone number as an SMS marketing identifier when they opt in.

When an order is placed with consent checked, J2Commerce records the date, IP address, and browser information alongside the subscription, and adds the shopper to the list chosen on the **Segmentation** tab.

## Signup Form and List Selection

If you have a form built in Klaviyo's own Forms tool, embed it on your storefront automatically:

1. In Klaviyo, open your signup form and copy its ID from the form's URL (`klaviyo.com/forms/[ID]`).
2. In J2Commerce, open **Apps -> Klaviyo -> Signup Form** tab and paste the ID into **Klaviyo Form ID**, then click **Save**.

Klaviyo's own onsite snippet detects the embed and renders your form automatically wherever it is configured to display — no template edits required.

Separately, the **Subscribe to List** field on the **Segmentation** tab decides which Klaviyo list gets the shopper when they check the checkout consent box. Choose a specific list, or leave it on **No List Subscription** to use your Klaviyo account's default opt-in list.

## Syncing Coupons

Turn on **Enable Coupon Sync** on the **Coupons** tab, then use the dashboard to push your coupons to Klaviyo for use in campaigns and flows.

1. Open **Apps -> Klaviyo -> Coupons** tab, set **Enable Coupon Sync** to **Yes**, and save.
2. Open the **Klaviyo** dashboard and click **Sync Coupons** under **Quick Links**.

Every enabled coupon and its redeemable code are sent to Klaviyo. Coupon sync is manual — there is no automatic sync when you create or edit a coupon, so re-run **Sync Coupons** after changes.

## Mapping Custom Properties

If you track extra data on products, orders, or customers that you want visible in Klaviyo, add it with **Custom Property Mapping**.

1. Open **Apps -> Klaviyo -> Custom Property Mapping** tab.
2. Click to add a row. Enter a **Property Key** (the name Klaviyo will show, for example `CustomLabel0`).
3. Choose a **Source Type** — Product Field, Order Custom Field, Order Field, User Field, or Static Value.
4. Enter the matching **Source Field** (for example `product_type`, `order_total`, or your own static text).
5. Click **Save**. Repeat for as many properties as you need.

<!-- SCREENSHOT: Custom Property Mapping tab with a filled-in mapping row -->

These properties are attached to the Viewed Product event and to order/product events sent to Klaviyo.

## Inbound Webhooks

Webhooks let Klaviyo tell your store about things that happen on Klaviyo's side — unsubscribes, bounced emails, and consent changes — so your records stay accurate.

1. Open **Apps -> Klaviyo -> Webhooks** tab and set **Enable Inbound Webhooks** to **Yes**. A strong **Webhook Secret** is generated for you automatically.
2. Click **Save**, then open the **Klaviyo** dashboard.
3. Copy the **Endpoint URL** shown in the **Inbound Webhooks** card, or click **Register Webhook** under **Quick Links** to have J2Commerce register it in Klaviyo automatically.

<!-- SCREENSHOT: Klaviyo dashboard Inbound Webhooks card showing the endpoint URL field -->

The **Webhook Secret** is what protects the connection — every incoming message is checked against it, and anything that doesn't match is rejected before it can affect your store. Registering a webhook (automatically or manually) requires an Advanced Klaviyo plan (Advanced KDP) or partner API access; if your account doesn't have that, copy the endpoint URL and set it up manually in Klaviyo instead.

## Sending Past Orders to Klaviyo (Historical Backfill)

When you first connect Klaviyo, it has no purchase history yet. The backfill tool sends past orders as Placed Order events so your flows and segments have historical data to work with right away.

1. Open the **Klaviyo** dashboard and scroll to **Send Historical Orders to Klaviyo**.
2. Choose a **From Date** and **To Date**.
3. Click **Run Backfill**.

<!-- SCREENSHOT: Klaviyo dashboard Backfill card with date pickers and the Run Backfill button -->

Only orders whose status is one of the **Backfill Order States** you configured on the **Order Events** tab are included. The tool sends at most 200 orders per run — for a large order history, run it again in narrower date ranges (for example, one year at a time) until you've covered everything.

:::note

Backfilled events are marked as historical data, so they will not trigger a live flow (for example a "thank you for your order" automation). Use this only to seed your Klaviyo account's history, not to notify customers.

:::

There is also a **Sync Orders** button under **Quick Links** on the dashboard that resends every eligible order the same way, without a date range — useful for a quick full resync, but the date-ranged backfill above gives you more control.

## The Analytics Dashboard

Open the **Klaviyo** dashboard (**J2Commerce -> Apps -> Klaviyo**) to see how your Klaviyo marketing is performing, without leaving your store.

<!-- SCREENSHOT: Klaviyo dashboard overview showing the KPI cards and charts -->

- **Date range** — pick a **From Date** and **To Date**, or use the quick presets (7, 30, 90, or 365 days), then click **Refresh**.
- **Klaviyo Attributed Performance** — headline numbers for the selected range: Attributed Revenue, Attributed Orders, Recipients Messaged, and Revenue per Recipient.
- **Deliverability & List Health** — Open Rate, Click Rate, Bounce Rate, Unsubscribe Rate, and Spam Complaint Rate, color-coded so a problem stands out at a glance.
- **Charts** — Store Events by Day, Revenue by Day, and Flow Performance by Day on the left; Conversion Funnel and Revenue Split (Campaigns vs. Flows) on the right.
- **Top Campaigns** and **Top Flows** — your best performers for the selected date range, ranked by revenue.
- **Lists & Segments** and **Sync Health** — your Klaviyo list sizes and the status of items waiting to sync (Pending, Processing, Failed, Dead, Completed).
- **Opportunities & Issues** — a short list of things worth your attention, such as a high bounce rate, no active flows, or sync items stuck in a failed state.

Results are cached briefly (15 minutes by default, adjustable on the **Dashboard** tab), so refreshing right after a change may show the same numbers for a few minutes — this protects your Klaviyo account from being rate-limited by repeated dashboard loads.

## How It Works{#how-it-works}

1. A shopper's action (viewing a product, adding to cart, placing an order, and so on) is detected by J2Commerce.
2. Onsite behaviours (Viewed Product, Added to Cart beacon, browse/search events) are sent straight to Klaviyo's onsite snippet in the shopper's browser.
3. Server-side events (Started Checkout, order lifecycle events, contact updates, catalog and coupon changes) are placed in the store's background sync queue.
4. J2Commerce's scheduled task runner processes that queue in the background and delivers each item to Klaviyo — this normally happens within moments, but during a busy period an item may sit briefly as **Pending** before it is sent.
5. If a delivery fails, it retries automatically; after repeated failures it is marked **Dead** and appears in the **Sync Health** card on the dashboard so you know to check it.

## Tips{#tips}

- **Test the connection before syncing anything.** A green **Connected** result confirms your private key actually works before you queue a large sync.
- **Turn on Enable Order Events and Enable Cart Events together** so your funnel data (Started Checkout through Placed Order) lines up on the dashboard's Conversion Funnel chart.
- **Run the backfill in yearly chunks** for stores with a long order history, since each run is capped at 200 orders.
- **Re-run Sync Coupons after editing coupons** — coupon sync only happens when you click the button, not automatically on save.
- **Check the Opportunities & Issues panel first** whenever the dashboard looks off — it flags the most common problems before you have to dig through charts.

## Troubleshooting{#troubleshooting}

### Events are not appearing in Klaviyo{#events-not-appearing}

**Cause:** The private key is missing or incorrect, or the sync queue has stalled.

**Solution:**

1. Go to **J2Commerce -> Apps -> Klaviyo** and confirm the **Private API Key** field on the **Connection** tab contains a key starting with `pk_`.
2. Open the **Klaviyo** dashboard and click **Test Connection** to confirm the key works.
3. Check the **Sync Health** card on the dashboard for items stuck as **Failed** or **Dead**.
4. In Klaviyo, go to **Analytics -> Metrics** and search for "Added to Cart" or "Placed Order" to confirm the metrics exist and have recent activity.

### The onsite tracking script is not loading{#onsite-script-not-loading}

**Cause:** Onsite tracking is disabled or the Public Site ID is missing.

**Solution:**

1. Go to **J2Commerce -> Apps -> Klaviyo -> Connection** tab.
2. Confirm **Enable Onsite Tracking** is set to **Yes** and **Public Site ID** contains your 6-character site ID (not your private key).
3. Save, then view your site's page source and search for `klaviyo.com/onsite/js/klaviyo.js` to confirm it loaded.

### The product feed is empty{#product-feed-empty}

**Cause:** No products match the current filters, or no products are published.

**Solution:**

1. Go to **J2Commerce -> Apps -> Klaviyo -> Product Feed** tab and clear **Product Feed Categories** if it is limiting the feed too narrowly.
2. Confirm you have published products in **J2Commerce -> Catalog -> Products**.

### The backfill sends 0 orders{#backfill-sends-zero}

**Cause:** The date range or the configured order states don't match any orders.

**Solution:**

1. Confirm the **Private API Key** is saved — the backfill uses the same key as live events.
2. Widen the **From Date** / **To Date** range and try again.
3. Check **Backfill Order States** on the **Order Events** tab; if your orders use a status not in the list, add it.
4. Remember the backfill only sends the oldest 200 matching orders per run — run it again with a narrower range to continue further back.

### The Notify me button doesn't appear{#notify-button-missing}

**Cause:** Back-in-stock notifications are disabled, or the product isn't actually out of stock.

**Solution:**

1. Go to **J2Commerce -> Apps -> Klaviyo -> Onsite Tracking** tab and confirm **Enable Back-in-Stock Notifications** is **Yes**.
2. Confirm the product's currently selected variant shows as out of stock — the button only appears on genuinely unavailable variants.

### Registering a webhook fails{#webhook-registration-fails}

**Cause:** Webhook management requires an Advanced Klaviyo plan (Advanced KDP) or partner API access.

**Solution:**

1. Check whether your Klaviyo account has an Advanced KDP plan or partner access.
2. If not, copy the **Endpoint URL** shown on the **Klaviyo** dashboard's **Inbound Webhooks** card and create the webhook manually inside your Klaviyo account instead.

## Related Topics

- [Apps Overview](../index.md)
- [Managing Products](../../catalog/managing-products.md)
- [Coupons](../../sales/coupons.md)
- [Queue Hub](../../setup/queue-hub.md)
