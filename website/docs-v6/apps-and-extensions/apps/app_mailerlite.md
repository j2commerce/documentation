---
title: "MailerLite"
sidebar_label: "MailerLite"
sidebar_position: 108
description: "Sync subscribers and order activity into MailerLite groups so your newsletters, automations, and abandoned-cart flows run on live store data."
---

# MailerLite

The MailerLite app connects your J2Commerce store to your [MailerLite](https://www.mailerlite.com/) account so your email marketing runs on real shop data. Customers who opt in at checkout are added to a MailerLite group, products and orders are synced to your MailerLite e-commerce shop, and checkout activity arms MailerLite's abandoned-cart and post-purchase automations.

Everything is driven from one settings screen plus a MailerLite dashboard inside your Joomla admin — no code, no manual exports.

## Requirements

- PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- A MailerLite account with API access (Integrations -> Developer API)

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **MailerLite** App **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to **My Downloads** under your profile button in the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

You can install the **MailerLite** App with the Joomla installer.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the `app_mailerlite.zip` file or use the **Install from URL** option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

## Enable the App

Once the app is installed, you need to enable it. There are **two** ways to reach the list of apps.

**Option A:** Go to the **J2Commerce** icon in the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

Look for **MailerLite**, click the **X**, and it turns into a green checkmark. The app is now enabled and ready for setup.

<!-- SCREENSHOT: J2Commerce -> Apps list with MailerLite enabled -->

## Get Your MailerLite API Key

Before you configure anything in Joomla, grab your key.

1. Log in to your MailerLite account.
2. Go to **Integrations -> Developer API**.
3. Create a new token (or copy an existing one) and keep the page open — MailerLite shows the key only once.

:::info

NOTE: The key belongs to the MailerLite user who created it. If that user is later removed from the MailerLite account, the key stops working and every sync fails with an authentication error. Create the key with a user that stays on the account.

:::

## Configure the App

Click the **MailerLite** title next to the green checkmark to open the settings.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app shows a description below each field as you configure it.

:::

<!-- SCREENSHOT: MailerLite plugin settings, API Connection tab -->

### API Connection tab

| Field | What it does |
|-------|--------------|
| **API Key** | Your MailerLite API key. Paste it here and click **Save** — the Shop and Opt-in Group lists cannot load until the key is saved. |
| **Shop** | The MailerLite e-commerce shop that products and orders sync into. The list loads from your MailerLite account after the key is saved. If it is empty, use **Ensure Shop** on the dashboard to create one. |
| **Opt-in Group** | The MailerLite group a customer joins when they tick the marketing-consent checkbox at checkout. Choose **- No Group Subscription -** if you do not want customers added to a group. |

:::info

NOTE: Save the API key **first**. Until the key is stored, the Shop field shows *"- Save API key to load shops -"* and the Opt-in Group list stays empty.

:::

### Order Events tab

This tab controls how J2Commerce order statuses are reported to MailerLite.

| Field | What it does | Default |
|-------|--------------|---------|
| **Enable Order Sync** | Pushes orders to MailerLite — *pending* when checkout starts, *complete* when the order reaches your paid status. Turn this off to stop all order syncing. | Yes |
| **Paid Order Status** | The J2Commerce status that marks the MailerLite order as complete. Usually **Confirmed** or **Paid**. | Confirmed |
| **Fulfilled Order Status** | The status that also reports the order as complete. Usually **Shipped**. | Shipped |
| **Cancelled Order Status** | The status that updates the MailerLite order when an order is cancelled. | Cancelled |
| **Refunded Order Status** | The status that reports a refund. Leave empty to skip refund tracking. | *(empty)* |

:::info

NOTE: The paid status is what fires your post-purchase automations **and** cancels the abandoned-cart flow for that shopper. Point it at the status your store actually uses when money is captured, or purchase emails never send.

:::

### Cart Recovery & Tracking tab

| Field | What it does | Default |
|-------|--------------|---------|
| **Enable MailerLite Universal Snippet** | Loads MailerLite's tracking script on every storefront page. Required for campaign revenue attribution and MailerLite popups. | Yes |
| **Enable Cart & Checkout Events** | When a shopper starts checkout, a pending order is created in MailerLite, which arms your abandoned-cart automation. Requires the snippet above. | Yes |
| **MailerLite Universal Account ID** | The numeric account ID from your MailerLite tracking snippet. Find it in MailerLite under **Settings -> Tracking**, or read it out of the embed code `ml('account', 'XXXXXXX')`. Example: `1294037`. | *(empty)* |

### Checkout Consent tab

| Field | What it does | Default |
|-------|--------------|---------|
| **Show Consent Checkbox** | Adds a marketing-consent checkbox to the checkout shipping/payment step. Ticking it subscribes the customer to your **Opt-in Group**. | Yes |
| **Checkbox Label** | The wording shown next to the checkbox. Leave blank to use the default, *"Email me news and exclusive offers"*. Plain text only — HTML is not allowed. | *(empty)* |

:::info

NOTE: If the consent checkbox is enabled but no **Opt-in Group** is selected, customers who opt in are still recorded as subscribers but land in no group. The dashboard flags this for you.

:::

### Product Catalog Sync tab

| Field | What it does | Default |
|-------|--------------|---------|
| **Enable Product Catalog Sync** | Automatically sends product saves and deletes to your MailerLite catalog, so campaigns and segments can reference real products. | Yes |

### Advanced tab

| Field | What it does | Default |
|-------|--------------|---------|
| **MailerLite Webhook** | Registers a callback URL with MailerLite so subscriber events (unsubscribes, updates, bounces) flow back into your store. Click **Register Webhook** — MailerLite creates the secret for you. **Delete Webhook** removes every MailerLite webhook pointing at this site. | Not registered |
| **Debug Logging** | Writes verbose entries to the Joomla log file. Use it while troubleshooting and turn it off again on a live store. | No |

:::info

NOTE: Webhooks need a publicly reachable site. On a local or password-protected staging site, MailerLite cannot deliver events, so registration may succeed while nothing ever arrives.

:::

## The MailerLite Dashboard

The app adds its own dashboard inside J2Commerce so you can check the connection without leaving Joomla.

Open the app settings and click **MailerLite Dashboard** in the toolbar.

<!-- SCREENSHOT: MailerLite dashboard with KPI cards and toolbar buttons -->

### Toolbar buttons

| Button | What it does |
|--------|--------------|
| **Test Connection** | Verifies your API key against MailerLite and reports the connected account. |
| **Ensure Shop** | Creates a MailerLite e-commerce shop for this store, or links the existing one. Safe to click more than once. |
| **Sync All Products** | Queues your whole catalog for an initial sync. After this, products sync automatically whenever you save them. |
| **Sync All Orders** | Queues existing orders so historic purchase data reaches MailerLite. |
| **Settings** | Returns to the plugin configuration screen. |

### What the dashboard shows

- **Connection Status** — the connected MailerLite account, or a prompt if no key is saved.
- **MailerLite Performance** — active subscribers, customers synced, orders synced, campaigns sent and average open rate.
- **Sync Health** — the local sync queue, the last successful sync, and any items stuck in the failed queue.
- **Opportunities & Issues** — plain-English warnings, such as no shop linked, order sync switched off, or a consent checkbox with no group behind it.
- **Groups, Recent Campaigns, Top Products and Recent Orders** — quick reference lists pulled live from MailerLite.

## First-Time Setup Checklist

1. Install and enable the app.
2. Paste your **API Key** into the **API Connection** tab and click **Save**.
3. Open the **MailerLite Dashboard** and click **Test Connection**.
4. Click **Ensure Shop** to create or link your MailerLite shop.
5. Go back to **Settings**, pick the **Shop** and **Opt-in Group**, then confirm the order statuses on the **Order Events** tab.
6. Paste your **MailerLite Universal Account ID** on the **Cart Recovery & Tracking** tab.
7. Click **Sync All Products** — and **Sync All Orders** if you want your order history in MailerLite.
8. In MailerLite, switch on the automations you want (abandoned cart, welcome, post-purchase). They now receive events from your store.

## How It Works

1. When a shopper starts checkout, the app creates a **pending** order in MailerLite. That is what arms the abandoned-cart automation.
2. If the shopper ticks the consent checkbox, their email is added to your MailerLite **Opt-in Group**.
3. When the order reaches your **Paid Order Status**, the app marks the MailerLite order **complete**. That fires post-purchase automations and cancels the abandoned-cart flow.
4. Cancelled and refunded statuses update the same MailerLite order, so reporting stays honest.
5. Product saves and deletes update the MailerLite catalog while catalog sync is enabled.
6. The universal snippet on your storefront ties campaign clicks to shop activity.

Syncs never block your storefront. Every push goes through a queue and is retried in the background, so a slow or rate-limited MailerLite API never delays a customer's checkout.

## Tips

- **Sync your catalog before your first campaign** — segments and product blocks only work once MailerLite knows your products.
- **Match your real statuses** — if your store confirms payment on a custom status, point **Paid Order Status** at that status, not the default.
- **Leave the snippet on** — abandoned-cart recovery and campaign revenue both depend on it.
- **Keep the consent wording honest** — the checkbox label is what your customer agrees to, so make it match your privacy policy.
- **Turn Debug Logging off on a live store** — it is for troubleshooting, not day-to-day running.

## Troubleshooting

### Shop and Group dropdowns are empty

**Cause:** The API key has not been saved yet, or it is not valid.

**Solution:**

1. Go to **J2Commerce -> Apps -> MailerLite -> API Connection**.
2. Re-paste the key from MailerLite (**Integrations -> Developer API**) and click **Save**.
3. Open the **MailerLite Dashboard** and click **Test Connection**.
4. If it still fails, create a fresh key in MailerLite — keys stop working when the user who created them is removed from the account.

### Connection test fails with an authentication error

**Cause:** Wrong key, an expired key, or a stray space pasted with it.

**Solution:**

1. Copy the key again, making sure no spaces or line breaks come with it.
2. Save, then click **Test Connection**.

### Abandoned-cart emails never send

**Cause:** Cart events are switched off, or the order never reached MailerLite as *pending*.

**Solution:**

1. Go to the **Cart Recovery & Tracking** tab and set both **Enable MailerLite Universal Snippet** and **Enable Cart & Checkout Events** to **Yes**.
2. Confirm the customer supplied an email address and opted in — MailerLite cannot email an anonymous cart.
3. Check that the abandoned-cart automation is switched on inside MailerLite.

### Purchase or post-purchase emails never send

**Cause:** The order never reached the status configured as **Paid Order Status**.

**Solution:**

1. Go to **J2Commerce -> Sales -> Orders** and check what status paid orders actually land on.
2. Go to **J2Commerce -> Apps -> MailerLite -> Order Events** and set **Paid Order Status** to that status.
3. Confirm **Enable Order Sync** is set to **Yes**.

### Products are missing from MailerLite

**Cause:** Catalog sync is disabled, no shop is linked, or the initial sync was never run.

**Solution:**

1. Go to the **Product Catalog Sync** tab and set **Enable Product Catalog Sync** to **Yes**.
2. Open the **MailerLite Dashboard** and click **Ensure Shop**.
3. Click **Sync All Products** and let the queue drain.
4. Check **Sync Health** on the dashboard for failed items.

### Order totals look wrong in MailerLite

**Cause:** The order was reported before its final total was known — for example, an order still sitting at pending.

**Solution:**

1. Move the order to its paid status in **J2Commerce -> Sales -> Orders**; the app then sends the final total.
2. If historic orders are wrong, click **Sync All Orders** on the dashboard.

### Campaign revenue tracking is empty

**Cause:** The universal snippet is not loading, or the account ID is missing.

**Solution:**

1. Go to **Cart Recovery & Tracking** and set **Enable MailerLite Universal Snippet** to **Yes**.
2. Paste the numeric **MailerLite Universal Account ID** from **Settings -> Tracking** in MailerLite.
3. Clear the Joomla cache: **Home Dashboard -> Cache -> Delete All**, then reload your storefront.

### Webhook events never arrive

**Cause:** The webhook is not registered, or the site is not reachable from the internet.

**Solution:**

1. Go to the **Advanced** tab and click **Register Webhook**.
2. Verify your site is publicly reachable over HTTPS — local and password-protected sites cannot receive callbacks.
3. If the site URL changed, click **Delete Webhook** and register again.

### Syncs pause with a rate-limit message

**Cause:** MailerLite limits how many requests an account may make per minute.

**Solution:**

1. Wait a minute — queued items are retried automatically.
2. Avoid running **Sync All Products** and **Sync All Orders** at the same moment on a large store.
3. Check **Sync Health** on the dashboard once the queue drains to confirm nothing failed permanently.
