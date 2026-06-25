# Square Integration

The Square Integration app connects your Square POS account to J2Commerce and pulls your entire product catalog across in one step. Products, variations, inventory counts, pricing, categories, images, modifiers, and tax settings all flow from Square into J2Commerce automatically. Once the sync is running, you can sell on your Joomla site without maintaining a separate product list — Square stays the single source of truth for your inventory.

:::info

Sync direction in version 1 is Square to J2Commerce only. Changes made in J2Commerce do not push back to Square.

:::

## Requirements

- PHP 8.3 or later
- Joomla! 6.x
- J2Commerce 6.x
- A [Square account](https://squareup.com/) (free or paid)
- An HTTPS-enabled Joomla site (required for OAuth and webhooks)

## Purchase and Download

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate the **Square Integration** app -> click **View Details** -> **Add to Cart** -> **Checkout**

**Step 3:** Go to **My Downloads** under your profile button at the top right corner. Search for the app, then click **Available Versions** -> **View Files** -> **Download Now**

## Install the App

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the plugin ZIP file or use the Install from URL option.

![Install extensions](<../../../assets/app install1 (1) (1).webp>)

## Enable the App

Once installed, enable the app before configuring it. There are two ways to reach it.

**Option A:** Click the **J2Commerce** icon at the top right of the administrator toolbar -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

![shipping method](/img/accordions-app.webp)

Find **Square Integration** in the list and click the status icon to turn it from a red **X** to a green checkmark. The app is now enabled and ready to configure.

![](/img/square-pos-enable.webp)

## First-Time Setup

Work through these steps in order the first time you set up the integration.

### Step 1 — Create a Square Developer Application

1. Go to [developer.squareup.com/apps](https://developer.squareup.com/apps) and sign in with your Square account.
2. Click **Create your first application** (or the **+** button if you already have apps).
3. Give it a name — for example, "My J2Commerce Store" — and click **Save**.
4. Open the app. In the left sidebar, click **OAuth**.
5. Copy the **Application ID** and the **Application Secret**. You will paste these into J2Commerce in the next step.

:::tip

The Application Secret lives on the **OAuth** page in the sidebar, not on the main Credentials page. Make sure you are on the correct screen before copying.

:::

## Configuring the App

:::tip

Click the **Toggle Inline Help** button in the toolbar to reveal a description below each field as you configure it.

:::

![](/img/square-pos-toggle.webp)

### Step 2 — Enter Credentials in J2Commerce

![](/img/square-pos-connection.webp)

The Connection tab handles authentication with Square. Complete this tab before any other tab will function.

1. Go to **J2Commerce** -> **Apps** -> click **Square Integration** to open its settings.
2. Click the **Connection** tab.
3. Set **Environment** to **Sandbox** while testing or **Production** when live.
4. Paste your **Application ID** and **Application Secret** from Square.
5. Copy the **Redirect URI** shown in J2Commerce — you need this in the next step.
6. Click **Save**.

**Environment: Sandbox** for testing, **Production** for live sales

**Redirect URI:** Read-only. Copy this exact URI into the Square Developer Dashboard -> OAuth -> Redirect URL field

**Square Connection:** Displays the current OAuth status. Click **Connect to Square** to authorize access via OAuth, or **Disconnect** to remove the stored tokens

**Application ID:** Your app's Application ID from the Square Developer Dashboard -> OAuth section. Required for production OAuth

**Application Secret:** Your app's OAuth client secret from the Square Developer Dashboard -> OAuth section. Not the same as the main Credentials page

**Manual Access Token:** Sandbox/development fallback only. Paste a Square sandbox access token here to bypass the OAuth popup flow

**Test Connection:** Verifies the saved credentials are valid by contacting the Square API and returning a pass or fail message

**Webhook Signature Key:** Paste the signature key Square generated when you created the webhook subscription. Used to verify incoming webhook payloads

:::info

The recommended approach is OAuth via the **Connect to Square** button for both sandbox and production. The Manual Access Token option is provided for sandbox development only and does not support webhooks.

:::

### Step 3 — Register the Redirect URI in Square

1. Return to the Square Developer Dashboard -> your app -> **OAuth**.
2. In the **Redirect URL** field, paste the exact Redirect URI you copied from J2Commerce.
3. Click **Save**.

The URI must match character-for-character, including `https://`, all query string parameters such as `tmpl=component`, and any trailing slash. Even a single character difference causes Square to reject the OAuth request.

### Step 4 — (Sandbox only) Open a Test Seller Session

If you are working in sandbox mode, Square requires an active test seller session in your browser before the OAuth consent page renders. If you skip this step, the popup shows a blank page.

1. In the Square Developer Dashboard, open your sandbox app.
2. In the left sidebar, click **Sandbox Test Accounts**.
3. Click **Open** next to a test seller. A new tab logs that test seller into Square sandbox.
4. Keep that tab open and return to J2Commerce.

Production OAuth does not require this step — it only applies to sandbox.

### Step 5 — Connect to Square

![](/img/square-pos-connection1.webp)

1. In J2Commerce -> **Square Integration** -> **Connection** tab, click **Connect to Square**.
2. A popup opens with the Square consent screen. Click **Allow**.
3. The popup closes automatically and the status badge turns green, showing **Connected**.

### Step 6 — Select Locations

![](/img/square-pos-locations.webp)

Square businesses can have multiple physical or online locations. The Locations tab controls which ones feed inventory counts into J2Commerce.

The list of your Square locations loads automatically. If it does not appear, click **Save** on the Connection tab first.

**Sync Locations:** Multi-select list of your Square locations. Only selected locations contribute inventory to the sync

**Inventory Aggregation: Sum across locations** adds up stock across all selected locations. **Primary location only** uses only the first selected location

### Step 7 — Configure Product Defaults

![](/img/square-pos-products.webp)

These defaults apply to every item imported from Square. You can override individual settings per product in J2Commerce after import.

**Import Status:** The published state new imports start in. Set to **Unpublished** while testing so customers do not see partially configured products

**Default Content Category:** The Joomla content category where imported products are filed

**Default J2Commerce Tag:** Tags applied automatically to every imported product

**Default Tax Profile:** The J2Commerce tax profile applied when Square does not have a matching tax configured for an item

**Category Mapping Mode: J2Commerce Tags** maps each Square category to a J2Commerce tag. **Joomla Content Categories** maps each Square category to a Joomla content category

**Option Field Type:** How variant attributes such as size or color are presented to shoppers. **Dropdown**, **Radio Buttons**, or **Color Swatches**

**On Square Item Deleted:** Action to take in J2Commerce when an item is deleted from Square. **Unpublish product**, **Trash product**, or **Do nothing**

**Catalog page size:** How many products to fetch per page in the Catalog dashboard tab. Range 25–200. The Square API caps each request at 200

### Step 8 — Set Up Webhooks

Webhooks let Square push instant updates to J2Commerce when catalog or inventory changes. See the [Webhook Setup](#webhook-setup) section below for step-by-step instructions.

### Step 9 — Set Up the Task Scheduler

Schedule automated syncs so J2Commerce regularly checks Square for changes. See [Automated Sync with the Task Scheduler](#automated-sync-with-the-task-scheduler) below.

### Step 10 — Run Your First Import

1. Open the **Dashboard** tab in the Square Integration settings, or find the **Square Integration** quick icon on the J2Commerce admin home.
2. Click **Import All from Square** to pull your full catalog into J2Commerce.

Once the import finishes, review the imported products in **J2Commerce** -> **Catalog** -> **Products** and publish any that look correct.

***

### Pricing Tab

![](/img/square-pos-pricing.webp)

By default J2Commerce uses your Square prices as-is. The Pricing tab lets you add a markup for your online store.

**Pricing Mode: Use Square prices directly** — no adjustment. **Apply markup to Square prices** — add a percentage or fixed amount on top

**Markup Type:** Visible only when Markup mode is selected. **Percentage** or **Fixed Amount**

**Markup Value:** The markup percentage or fixed dollar amount to add. Enter a whole number or decimal

:::tip

Markup is applied at import time. Changing the markup value after import does not automatically update already-imported products. Re-import or adjust prices manually to apply a new markup to existing products.

:::

### Sync Tab

The Sync tab controls how often J2Commerce checks Square for updates and whether Square can push instant changes via webhooks.

![](/img/square-pos-sync.webp)

**Enable Webhooks:** When **Yes**, Square sends real-time notifications when products or inventory change. Requires an HTTPS site reachable from the public internet

**Catalog Sync Interval (minutes):** How often the scheduled task checks Square for catalog changes. Minimum 15 minutes

**Inventory Sync Interval (minutes):** How often the scheduled task refreshes inventory counts. Minimum 5 minutes

**Catalog Cache TTL (minutes):** How long Square catalog data is cached locally before a fresh fetch is requested. Minimum 60 minutes

:::info

Webhooks provide near-instant updates. Cron jobs act as a reliable fallback and handle bulk changes. Running both together is recommended.

:::

### Advanced Tab

![](/img/square-pos-advanced.webp)

The Advanced tab provides debugging controls that you should not need to touch during normal operation.

**Error Threshold:** Number of consecutive sync errors before J2Commerce auto-pauses API calls. Once paused, go to the Dashboard tab and click **Resume Sync**

**Log Retention (days):** How many days of sync activity logs to keep before automatic cleanup. Minimum 7 days

**Debug Mode:** When **Yes**, verbose logging is written to `administrator/logs/plg_j2commerce_app_squareintegration.php`. Disable on live sites

**OAuth Debug Page:** When **Yes**, clicking Connect to Square shows a debug card instead of immediately redirecting. The card shows the authorize URL, Application ID, OAuth state, and Redirect URI. Turn back to **No** to restore the normal flow

***

## Dashboard Tabs

Opening the Square Integration settings puts you directly on the Dashboard tab, which contains six inner tabs for monitoring and managing the sync.

### Overview Tab

![](/img/square-pos-dashboard.webp)

The Overview tab is the control center for the integration. It shows:

- **Connection status** — whether J2Commerce is currently connected to Square
- **Environment** — sandbox or production
- **Sync statistics** — number of synced products, synced categories, synced modifiers, synced discounts, synced tax profiles
- **Last sync time** — when the most recent sync completed
- **Queue status** — number of items pending in the background queue

The **Quick Actions** panel on this tab lets you run one-click operations without navigating to other tabs:

- **Sync Now** — chains category sync, product import, and inventory refresh in one step
- **Import All from Square** — imports your full Square catalog, skipping items already mapped
- **Sync All Products** — re-syncs all currently mapped products from Square
- **Sync Inventory** — refreshes inventory counts only, without touching product data
- **Sync Categories** — mirrors Square's category hierarchy into J2Commerce as tags
- **Import Categories Into Joomla** — creates Joomla content categories from Square categories
- **Sync Discounts** — pulls discount objects from Square into J2Commerce
- **Sync Modifiers** — pulls modifier lists from Square and maps them to J2Commerce variant options
- **Sync Taxes** — pulls Square tax configurations and maps them to J2Commerce tax profiles
- **Sync Square Vendors** — creates or updates J2Commerce vendor records from Square supplier data
- **Resume Sync** — clears the auto-paused state after errors exceed the error threshold
- **Clear Log** — deletes all activity log entries

If API calls are auto-paused due to repeated errors, a warning banner appears at the top of this tab with the error count and a **Resume Sync** button.

### Catalog Tab

![](/img/square-pos-catalog.webp)

The Catalog tab is a browser for your raw Square catalog. Use it to preview items before importing, import selected items individually, or search and filter your catalog.

The table shows each Square item with its name, category, number of variations, and whether it has already been imported into J2Commerce. Items already synced display an **Already synced** badge.

Actions available on this tab:

- **Search** — filter the list by name using the search box
- **Filter by Square category** — narrow the list to items in a specific Square category
- **Import Selected** — tick one or more items and click this button to import them
- **Import All** — imports every item from Square that has not already been mapped
- **Load More / Next** — page through large catalogs. The Square API returns items in batches; use pagination controls to see more results

### Mappings Tab

![](/img/square-pos-mappings.webp)

The Mappings tab shows the link records between every Square object and its corresponding J2Commerce entity. Each mapping row contains the Square object ID, entity type (product, variant, tag, coupon, tax profile, etc.), the matched J2Commerce entity, sync status, and last synced timestamp.

You can filter by entity type and sync status. Actions available per row:

- **Re-sync** — fetches the latest data for that Square object and updates the J2Commerce entity
- **Unlink** — removes the mapping record without deleting the J2Commerce entity. Use this if you want to re-import a product with fresh defaults or detach a product from Square tracking

### Inventory Tab

![](/img/square-pos-inventory.webp)

The Inventory tab shows the current stock status for every mapped product variation. It displays each product, its location, and quantity in one of three states: **In Stock**, **Low Stock**, or **Out of Stock**.

A note at the top of this tab reminds you which inventory aggregation mode is active (Sum or Primary).

Click **Sync Inventory** on this tab (or from the Quick Actions panel) to pull the latest counts from Square immediately.

### Activity Log Tab

![](/img/square-pos-activities.webp)

The Activity Log tab records every sync event — imports, updates, webhook deliveries, errors, and OAuth actions. Each entry shows an action type, entity type, entity identifier, status, and timestamp.

You can filter the log by status (Success, Warning, Error) or by entity type to focus on specific issues. Click **Clear Log** to delete all entries and start fresh. The log is automatically trimmed to the number of days set in the **Log Retention (days)** field on the Advanced tab.

### OAuth Tab

![](/img/square-pos-oauth.webp)

The OAuth tab displays the current authorization status and provides a step-by-step setup guide for the webhook subscription.

Information shown:

- Connection status (Connected / Not Connected)
- Merchant name
- Token expiry date
- Active environment (sandbox or production)
- Granted OAuth scopes
- Webhook subscription ID (once registered)

This tab also contains the webhook setup instructions — see the [Webhook Setup](#webhook-setup) section below for the full walkthrough.

***

## Webhook Setup

Webhooks let Square notify J2Commerce the moment something changes — instead of waiting for the next cron run. The subscription is created once at the application level in the Square Developer Dashboard and applies to every connected merchant.

### Events That J2Commerce Handles

| Square Event                  | What Triggers It                                         | J2Commerce Action                                 |
| ----------------------------- | -------------------------------------------------------- | ------------------------------------------------- |
| `catalog.version.updated`     | A catalog item is created, updated, or deleted in Square | Queues a product sync for the changed item        |
| `inventory.count.updated`     | Stock levels change at a location                        | Queues an inventory update                        |
| `oauth.authorization.revoked` | A merchant revokes access in Square                      | Logs a warning; tokens must be refreshed manually |

### Step-by-Step: Register the Webhook Subscription

1. Go to [developer.squareup.com/apps](https://developer.squareup.com/apps) and select your application.
2. In the left navigation, click **Webhooks** -> **Subscriptions**, then click **Add Subscription**.
3. Copy the **Notification URL** shown on the **OAuth** tab inside J2Commerce's Square Integration settings.
4. Paste it into the **URL** field in the Square Developer Dashboard. Give the subscription a name such as "J2Commerce Integration" and choose the latest API version.
5. Enable the following events:

   - `catalog.version.updated`
   - `inventory.count.updated`
   - `oauth.authorization.revoked`
6. Click **Save**. Square generates a **Signature Key** — copy it.
7. Return to J2Commerce -> **Square Integration** -> **Connection** tab.
8. Paste the Signature Key into the **Webhook Signature Key** field and click **Save**.

:::tip

Register the webhook against both your sandbox app and your production app. Each app has its own **Webhook Signature Key** — store the correct key for the environment you are currently using.

:::

***

## Automated Sync with the Task Scheduler

The task scheduler runs catalog and inventory syncs on a schedule so J2Commerce stays in sync with Square even without webhook events. The Square Integration registers its sync tasks through the J2Commerce cron system, which is triggered by Joomla's built-in Task Scheduler plugin.

### Task Commands

| Command                 | What It Does                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| `square_sync_all`       | Syncs the full catalog — fetches item data from Square and updates all mapped J2Commerce products |
| `square_sync_inventory` | Refreshes inventory counts for all mapped product variations                                      |
| `square_refresh_token`  | Proactively renews the OAuth access token before it expires                                       |
| `square_webhook`        | Processes incoming webhook payloads. Called internally when Square posts an event                 |

### Setting Up the Joomla Task Scheduler

1. Go to **System** -> **Scheduled Tasks**.
2. Click **New** to create a new task.
3. Select **J2Commerce: Run Cron Command** from the task type list.
4. Enter a title such as "Square - Sync Catalog".
5. Set the **Command** parameter to `square_sync_all`.
6. Set the cron interval. A recommended schedule is once per hour: `0 * * * *`

Repeat the process to create a second task for inventory:

- Title: "Square - Sync Inventory"
- Command: `square_sync_inventory`
- Interval: every 30 minutes (`*/30 * * * *`) or match the **Inventory Sync Interval** setting on the Sync tab

### Server Cron Job (Recommended)

Joomla's Task Scheduler needs a trigger. Add a server cron job so it fires reliably:

```bash
*/5 * * * * php /path/to/your/joomla/cli/joomla.php scheduler:run
```

Replace `/path/to/your/joomla` with the actual path to your Joomla installation. The `*/5` runs the check every 5 minutes so tasks never wait more than 5 minutes to start.

***

## How Sync Works

When a sync runs — either triggered by a cron job or pushed by a Square webhook — J2Commerce processes your catalog in this order:

1. **Authentication check** — Verifies the stored OAuth token is valid. Renews it automatically if needed.
2. **Catalog fetch** — Pulls items, categories, modifiers, taxes, and images from the Square Catalog API.
3. **Inventory fetch** — Retrieves stock counts for all item variations across the selected locations.
4. **Product mapping** — Creates or updates J2Commerce products and variants. New items use the defaults from the Products tab. Existing mapped items are updated without overwriting fields you have edited manually in J2Commerce.
5. **Price calculation** — Applies markup (if configured) and writes prices to J2Commerce product records.
6. **Square badge on product form** — Once a product is mapped, opening it in J2Commerce shows a small **Square: Synced** badge with a direct link to view the item in the Square Dashboard.

***

## Tips

- **Start in sandbox mode.** Configure everything with a sandbox Square account first so test products do not appear in your live store.
- **Set Import Status to Unpublished.** Import your full catalog, review each product, configure J2Commerce-specific details such as shipping weight and dimensions, then publish in batches. This prevents partially configured products from appearing in the storefront.
- **Use J2Commerce Tags for category mapping first.** It is more flexible and easier to re-map. Switch to Joomla Content Categories only if your navigation depends on category-based menus.
- **Keep webhooks enabled.** Cron intervals of 30–60 minutes mean inventory changes from Square can lag. Webhooks push changes within seconds.
- **Monitor the Activity Log.** Keep **Log Retention (days)** at 30 or more during initial setup so you can review what imported, what was skipped, and what errored.
- **Square modifiers become variant options.** If your Square items use modifiers such as "Gift wrap" or "Size", they map to J2Commerce variant option fields after import. Review them and choose the right **Option Field Type** (dropdown, radio buttons, or color swatches) on the Products tab.

***

## Troubleshooting

### Connect to Square shows a blank page (sandbox)

**Cause:** Square sandbox requires an active test seller session in your browser before the OAuth consent page renders. Without one, Square's authorize page returns an error and the popup shows a blank or broken page.

**Solution:**

1. In the Square Developer Dashboard, open your sandbox app.
2. Click **Sandbox Test Accounts** in the left sidebar.
3. Click **Open** next to a test seller. A new browser tab opens and logs that test seller into Square sandbox.
4. Keep that tab open and return to J2Commerce.
5. Click **Connect to Square** again.

The consent screen now recognizes the active seller session and renders correctly. This step is only needed for sandbox — production OAuth does not require it.

***

### Test Connection returns "Failed"

**Cause:** The Application ID, Application Secret, or access token saved in J2Commerce is missing, incorrect, or expired.

**Solution:** Return to the **Connection** tab. Re-enter the Application ID and Application Secret from the Square Developer Dashboard -> OAuth section. Click **Save**, then click **Test Connection** again. If you are using a Manual Access Token, generate a fresh one from the Square Developer Console and paste it in.

***

### "Redirect URI mismatch" error from Square during OAuth

**Cause:** The Redirect URI registered in the Square Developer Dashboard does not exactly match the Redirect URI shown in J2Commerce's Connection tab.

**Solution:** Copy the Redirect URI from J2Commerce's Connection tab — including the full URL with all query parameters such as `tmpl=component`. Go to Square Developer Dashboard -> your app -> **OAuth** -> **Redirect URL**, paste the exact URI, and click **Save**. Even a single character difference causes Square to reject the request.

***

### Imported products are not visible in the storefront

**Cause:** The **Import Status** field on the Products tab defaults to **Unpublished**.

**Solution:** Either change **Import Status** to **Published** before running a fresh import, or go to **J2Commerce** -> **Catalog** -> **Products**, filter by unpublished, and manually publish each imported product after reviewing it.

***

### Inventory counts look incorrect

**Cause:** The **Inventory Aggregation** setting on the Locations tab controls how stock across multiple Square locations is combined.

**Solution:** Open the **Locations** tab and review **Inventory Aggregation**. **Sum across locations** adds the quantity from every selected location. **Primary location only** uses the first selected location's count. If you have stock spread across several locations and only see one location's count, switch to **Sum across locations** and save.

***

### Webhooks are enabled but no live updates arrive

**Cause:** The webhook subscription may not be registered with Square, or Square cannot reach your Joomla site.

**Solution:**

1. Go to the **OAuth** tab inside the Square Integration dashboard and confirm a **Webhook ID** is shown. If the field is empty, follow the [Webhook Setup](#webhook-setup) steps again to register a new subscription.
2. Confirm your Joomla site is accessible over HTTPS from the public internet. Square must be able to POST webhook payloads to your site. Sites on localhost or behind a firewall will not receive webhooks.
3. Verify the **Webhook Signature Key** on the Connection tab matches the key Square generated for your subscription.
4. As a fallback, lower **Inventory Sync Interval** on the Sync tab to 5 minutes so the cron job catches changes more frequently while you investigate.

***

### Sync is paused and I see error banners on the J2Commerce Dashboard

**Cause:** The number of consecutive sync errors exceeded the **Error Threshold** on the Advanced tab. J2Commerce pauses API calls automatically to avoid hammering a Square API that is returning errors.

**Solution:**

1. Open the **Activity Log** tab in the Square Integration dashboard and identify the error messages.
2. Fix the underlying issue — for example, reconnect OAuth if the token expired, or correct a misconfigured location ID.
3. Click **Resume Sync** in the Quick Actions panel on the Overview tab.
