---
title: "Mailchimp"
sidebar_label: "Mailchimp"
sidebar_position: 107
description: "Sync customers, orders, and products into Mailchimp audiences so you can run abandoned-cart, product-retargeting, and post-purchase campaigns from your store's real data."
---

# Mailchimp

The Mailchimp app connects your J2Commerce store to your [Mailchimp](https://mailchimp.com/) account so your email marketing runs on real shop data. Customers who opt in at checkout are added to your Mailchimp audience, products and orders are synced to a Mailchimp e-commerce store, and checkout activity arms Mailchimp's abandoned-cart and post-purchase automations.

Everything is driven from one settings screen plus a Mailchimp dashboard inside your Joomla admin — no code, no manual exports.

## Requirements

- PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- A Mailchimp account with API access

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Mailchimp** App **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to **My Downloads** under your profile button in the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

You can install the **Mailchimp** App with the Joomla installer.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the `app_mailchimp.zip` file or use the **Install from URL** option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

## Enable the App

Once the app is installed, you need to enable it. There are **two** ways to reach the list of apps.

**Option A:** Go to the **J2Commerce** icon in the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

Look for **Mailchimp**, click the **X**, and it turns into a green checkmark. The app is now enabled and ready for setup.

<!-- SCREENSHOT: J2Commerce -> Apps list with Mailchimp enabled -->

## Get Your Mailchimp API Key

Before you configure anything in Joomla, grab your key.

1. Log in to your Mailchimp account.
2. Go to **Account -> Extras -> API keys**.
3. Create a new API key and copy it.

:::info

NOTE: Your key ends with a short suffix such as `-us19`. That suffix tells J2Commerce which Mailchimp data center to talk to, and it is used automatically every time the app calls Mailchimp — never edit or remove it when pasting the key in.

:::

## Configure the App

Click the **Mailchimp** title next to the green checkmark to open the settings.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app shows a description below each field as you configure it.

:::

<!-- SCREENSHOT: Mailchimp plugin settings, API Connection tab -->

### API Connection tab

| Field | What it does |
|-------|--------------|
| **API Key** | Your Mailchimp API key. Paste it here and click **Save** — the Audience and Store lists cannot load until the key is saved. |
| **Audience** | The Mailchimp audience (list) your customers and their consent status are synced to. Audiences load automatically once the API Key above has been saved. An audience must be selected here before a store can be created below. |
| **Store** | The Mailchimp e-commerce store that products, carts and orders are pushed to. Choose **- Create a new store -** and use **Create Store** on the dashboard if you do not have one yet, or select an existing store already created for this audience. |
| **Store Domain** | The domain shown against this store in Mailchimp. Leave blank to use your site's own domain automatically. |

:::caution

WARNING: A Mailchimp store is permanently bound to the audience it was created for and can never be moved to a different audience afterward. Choose your Audience carefully before creating a Store — if you need to change audiences later, you must delete the store in Mailchimp and create a new one.

:::

:::info

NOTE: Save the API key **first**. Until the key is stored, the Audience and Store lists stay empty.

:::

### Order Events tab

This tab controls how J2Commerce order statuses are reported to Mailchimp.

| Field | What it does | Default |
|-------|--------------|---------|
| **Enable Order Sync** | Pushes an order to Mailchimp when it is placed, and again whenever it reaches one of the milestone statuses below. Turn this off to stop all order syncing. | Yes |
| **Paid Order Status** | The status that reports the order as paid to Mailchimp. Usually **Confirmed** or **Paid**. | Confirmed |
| **Fulfilled Order Status** | The status that also reports the order as complete. Usually **Shipped**. | Shipped |
| **Canceled Order Status** | The status that updates the Mailchimp order when an order is canceled. | Canceled |
| **Refunded Order Status** | The status that reports a refund to Mailchimp. Leave empty to skip refund tracking. | *(empty)* |

### Cart Recovery & Tracking tab

| Field | What it does | Default |
|-------|--------------|---------|
| **Enable Cart Recovery** | Syncs the shopper's cart to Mailchimp as they shop and at checkout, and removes it once the order is placed. Powers Mailchimp's abandoned-cart automations. | Yes |
| **Enable Instant Cart Tracking** | Loads a small script that nudges a cart re-sync immediately after an item is added to the cart, instead of waiting for the next page load. Requires **Enable Cart Recovery** above. | Yes |

### Checkout Consent tab

| Field | What it does | Default |
|-------|--------------|---------|
| **Show Consent Checkbox** | Adds a marketing-consent checkbox to the checkout shipping/payment step. Checking it subscribes the customer to your configured **Audience**. | Yes |
| **Checkbox Label** | The wording shown next to the checkbox. Leave blank to use the default, *"Email me news and exclusive offers"*. Plain text only — HTML is not allowed. | *(empty)* |
| **Require Double Opt-in** | When enabled, a customer who checks the box is added to your audience as pending and must confirm through a Mailchimp confirmation email before they become subscribed. When disabled, they are subscribed immediately. | Yes |
| **Consent Tag** | An optional Mailchimp tag applied to every contact who opts in at checkout, useful for segmenting checkout subscribers from other sign-up sources. Leave blank to skip tagging. | *(empty)* |
| **Sync Phone Number** | When enabled, the phone number chosen below is sent to Mailchimp as the PHONE merge field. | No |
| **Phone Field to Sync** | Which checkout phone field is sent to Mailchimp, grouped by Billing, Shipping and Payment. Only shown when **Sync Phone Number** is set to **Yes**. | *(billing phone)* |

:::info

NOTE: The consent checkbox is always shown unchecked by default — no pre-ticked boxes.

:::

### Product Catalog Sync tab

| Field | What it does | Default |
|-------|--------------|---------|
| **Enable Product Catalog Sync** | Automatically sends product saves and deletes to your Mailchimp e-commerce catalog, so campaigns and product recommendations can reference real products. Requires a **Store** to be created on the API Connection tab. | Yes |

### Advanced tab

| Field | What it does | Default |
|-------|--------------|---------|
| **Webhook Signing Secret** | The signing secret Mailchimp issues when the webhook below is registered. Filled in automatically by **Register Webhook** on the dashboard — it should not normally need editing by hand. | *(empty)* |
| **Webhook ID** | The ID of the webhook registered against your audience, filled in automatically by **Register Webhook**. | *(empty)* |
| **Dashboard Cache (seconds)** | How long a dashboard data pull from Mailchimp is cached before the next view triggers a fresh API call. Lower values keep the dashboard fresher but use more of your Mailchimp API rate limit. | 900 |
| **Debug Logging** | Writes verbose entries to the Joomla log file. Use it while troubleshooting and turn it off again on a live store. | No |

:::info

NOTE: Webhooks need a publicly reachable HTTPS address. On a local or password-protected staging site, Mailchimp cannot deliver events, so registration may fail or events may simply never arrive.

:::

## The Mailchimp Dashboard

The app adds its own dashboard inside J2Commerce so you can check the connection and campaign performance without leaving Joomla.

Open the app settings and click **Dashboard** in the toolbar.

<!-- SCREENSHOT: Mailchimp dashboard with KPI cards and toolbar buttons -->

### Toolbar buttons

| Button | What it does |
|--------|--------------|
| **Test Connection** | Verifies your API key against Mailchimp and reports the connected account. |
| **Create Store** | Creates a Mailchimp e-commerce store bound to your selected Audience, or links an existing store already created for that audience. |
| **Sync All Products** | Queues your whole catalog for an initial sync. After this, products sync automatically whenever you save them. |
| **Sync Historic Orders** | Queues existing orders so historic purchase data reaches Mailchimp. |
| **Register Webhook** | Registers a callback URL with Mailchimp so unsubscribes, cleaned addresses and profile changes flow back into your store. Mailchimp issues the signing secret automatically. |
| **Settings** | Returns to the plugin configuration screen. |

:::caution

WARNING: Before you click **Sync Historic Orders**, pause your Mailchimp order automations. Otherwise past customers may receive automated emails as if they had just purchased.

:::

### What the dashboard shows

- **Connection Status** — the connected Mailchimp account, or a prompt if no key is saved.
- **Campaign Performance** — attributed revenue, active subscribers, average open rate and failed syncs, all-time.
- **Deliverability & List Health** — click rate, bounce rate, unsubscribe rate, spam complaint rate and revenue per recipient, each compared against Mailchimp's benchmark for your account's industry where one is available.
- **Revenue by Campaign** and **Open Rate Trend** charts.
- **Audience Growth** — subscribes versus unsubscribes over time. Mailchimp only retains 180 days of audience activity, so a longer date range shows no data for the earlier days.
- **Engagement Funnel** — sent, delivered, opened, clicked and ordered, in one view.
- **Sync Queue** — the local sync queue composition and health, including the last successful sync.
- **Insights** — plain-English warnings, such as no store linked, order sync switched off, or a high bounce or spam rate.
- **Top Campaigns, Recent Unsubscribes, Recently Synced Orders, Automations and Audiences & Segments** — quick reference lists pulled live from Mailchimp.

:::info

NOTE: If Mailchimp is rate-limiting your account, the dashboard falls back to the most recently cached data instead of a live pull, and tells you so.

:::

## First-Time Setup Checklist

1. Install and enable the app.
2. Paste your **API Key** into the **API Connection** tab and click **Save**.
3. Open the **Dashboard** and click **Test Connection**.
4. Choose your **Audience** on the **API Connection** tab and save.
5. Click **Create Store** to create or link your Mailchimp e-commerce store for that audience.
6. Confirm the order statuses on the **Order Events** tab match your store's real statuses.
7. Review the **Checkout Consent** wording and double opt-in setting.
8. Click **Register Webhook** so unsubscribes and cleaned addresses stop retrying automatically.
9. Click **Sync All Products** — and **Sync Historic Orders** if you want your order history in Mailchimp (pause your Mailchimp automations first).
10. In Mailchimp, switch on the automations you want (abandoned cart, welcome, post-purchase). They now receive events from your store.

## How It Works

1. When a shopper starts checkout, the app syncs their cart to Mailchimp. That is what arms the abandoned-cart automation.
2. If the shopper ticks the consent checkbox, their email is added to your Mailchimp **Audience** — as pending (if double opt-in is on) or subscribed immediately.
3. When the order is placed, the app syncs it to Mailchimp and removes the cart, so the shopper does not receive an abandoned-cart email after buying.
4. As the order reaches your **Paid**, **Fulfilled**, **Canceled** or **Refunded** statuses, the app updates the same Mailchimp order, so reporting and post-purchase automations stay honest.
5. Product saves and deletes update the Mailchimp catalog while catalog sync is enabled.
6. Mailchimp calls your webhook when a contact unsubscribes or their address is marked cleaned, so this app stops retrying a sync for them.

Syncs never block your storefront. Every push goes through a background queue, so a slow or rate-limited Mailchimp API never delays a customer's checkout.

## Tips

- **Sync your catalog before your first campaign** — product recommendations only work once Mailchimp knows your products.
- **Match your real statuses** — if your store confirms payment on a custom status, point **Paid Order Status** at that status, not the default.
- **Pause automations before a historic sync** — importing old orders with Mailchimp automations still active can email customers who bought months ago.
- **Keep the consent wording honest** — the checkbox label is what your customer agrees to, so make it match your privacy policy.
- **Register the webhook once your site is live** — it needs a real, publicly reachable HTTPS address to work at all.
- **Turn Debug Logging off on a live store** — it is for troubleshooting, not day-to-day running.

## Troubleshooting

### Audience and Store dropdowns are empty

**Cause:** The API key has not been saved yet, or it is not valid.

**Solution:**

1. Go to **J2Commerce -> Apps -> Mailchimp -> API Connection**.
2. Re-paste the key from Mailchimp (**Account -> Extras -> API keys**) and click **Save**.
3. Open the **Dashboard** and click **Test Connection**.

### Connection test fails

**Cause:** Wrong key, an expired key, or a stray space pasted with it.

**Solution:**

1. Copy the key again, making sure no spaces or line breaks come with it — and that the datacenter suffix (for example `-us19`) is included.
2. Save, then click **Test Connection**.

### Create Store fails or does nothing

**Cause:** No Audience is selected yet, or a store is already configured.

**Solution:**

1. Go to the **API Connection** tab and confirm an **Audience** is selected and saved.
2. If a **Store** is already selected, no new store is needed — Mailchimp stores are permanently bound to one audience and cannot be recreated for the same audience.

### Abandoned-cart emails never send

**Cause:** Cart recovery is switched off, or the shopper's email was never captured.

**Solution:**

1. Go to the **Cart Recovery & Tracking** tab and set **Enable Cart Recovery** to **Yes**.
2. Confirm the shopper supplied an email address during checkout — Mailchimp cannot email an anonymous cart.
3. Check that the abandoned-cart automation is switched on inside Mailchimp.

### Abandoned-cart emails arrive after the customer already bought

**Cause:** This should not happen under normal operation — the app removes the Mailchimp cart the moment an order is placed.

**Solution:**

1. Confirm **Enable Order Sync** is set to **Yes** on the **Order Events** tab.
2. Check the dashboard's **Sync Queue** card for failed cart-removal jobs and let the queue drain.

### Purchase or post-purchase emails never send

**Cause:** The order never reached the status configured as **Paid Order Status**.

**Solution:**

1. Go to **J2Commerce -> Sales -> Orders** and check what status paid orders actually land on.
2. Go to **J2Commerce -> Apps -> Mailchimp -> Order Events** and set **Paid Order Status** to that status.
3. Confirm **Enable Order Sync** is set to **Yes**.

### Products are missing from Mailchimp

**Cause:** Catalog sync is disabled, no store is linked, or the initial sync was never run.

**Solution:**

1. Go to the **Product Catalog Sync** tab and set **Enable Product Catalog Sync** to **Yes**.
2. Confirm a **Store** is selected on the **API Connection** tab.
3. Click **Sync All Products** on the dashboard and let the queue drain.
4. Check the **Sync Queue** card on the dashboard for failed items.

### A customer who opted in never received a confirmation or newsletter email

**Cause:** Double opt-in is enabled and the customer never confirmed, or their address later hard-bounced.

**Solution:**

1. Check the customer's status in Mailchimp — a **pending** contact must click the confirmation link Mailchimp sent them.
2. If **Require Double Opt-in** does not match how you run your list, adjust it on the **Checkout Consent** tab.
3. A **cleaned** (hard-bounced) address cannot resubscribe automatically — the customer needs to resubscribe with a working address.

### Webhook events never arrive

**Cause:** The webhook is not registered, or the site is not reachable from the internet.

**Solution:**

1. Go to the **Dashboard** and click **Register Webhook**.
2. Verify your site is publicly reachable over HTTPS — local and password-protected sites cannot receive callbacks. On local development, expose the site with a tunnel before registering.
3. If registration succeeds but no signing secret was returned, click **Register Webhook** again.

### Syncs pause with a rate-limit message

**Cause:** Mailchimp limits how many requests an account may make at once.

**Solution:**

1. Wait a few minutes — queued items are retried automatically.
2. Avoid running **Sync All Products** and **Sync Historic Orders** at the same moment on a large store.
3. Check the **Sync Queue** card on the dashboard once the queue drains to confirm nothing failed permanently.

### Dashboard shows "rate-limiting" and stale numbers

**Cause:** Mailchimp is rejecting new requests for this account, so the dashboard is showing its last cached pull.

**Solution:**

1. Wait for the **Dashboard Cache (seconds)** interval to pass and reload the dashboard.
2. Avoid triggering large syncs (products, historic orders) at the same time you are viewing the dashboard.
