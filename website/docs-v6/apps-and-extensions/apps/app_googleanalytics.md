---
title: "Google Analytics"
sidebar_label: "Google Analytics"
sidebar_position: 101
description: "Send GA4 ecommerce events from your J2Commerce store through a Google Tag Manager container or directly via gtag.js, with optional server-side delivery through the GA4 Measurement Protocol."
---

# Google Analytics

The Google Analytics app sends GA4 (Google Analytics 4) ecommerce events from your J2Commerce store -- product views, add-to-cart actions, checkout steps, purchases, refunds, and more -- so you can see exactly how shoppers move through your store and where they drop off. You choose one of two delivery methods: load a Google Tag Manager (GTM) container and let the app push events to the dataLayer, or connect straight to a GA4 property with `gtag.js` and no GTM container at all. An optional third layer sends your highest-value events -- purchases and refunds -- directly from your server as well, so ad blockers and browser tracking prevention cannot hide them from your reports.

:::info

This app replaces the older **Google Tag Manager** app that shipped under the name `app_googletagmanager`. If you are setting up ecommerce tracking for the first time, install this app. It is a different extension from the separately available [Google Tag Manager](./ecommercegoogletagmanager.md) app (`app_ecommercegoogletagmanager`), which remains its own product for stores that only want a GTM-based setup without GA4 Direct mode or server-side delivery.

:::

## Requirements

- PHP 8.3.0 or later
- Joomla 6.x
- J2Commerce 6.x, installed and enabled
- Either a [Google Tag Manager](https://tagmanager.google.com/) container, or a [Google Analytics 4](https://analytics.google.com/) property with a Measurement ID -- depending on which tracking method you choose

## Purchase and Download

The **Google Analytics** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to [www.j2commerce.com](https://www.j2commerce.com) -> **Apps**.

**Step 2:** Locate the **Google Analytics** app, click **View Details**, then **Add to Cart** -> **Checkout**.

**Step 3:** After purchase, go to **My Downloads** under your profile menu and find the app. Click **Available Versions** -> **View Files** -> **Download Now**.

## Install the App

1. In the Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Upload the `app_googleanalytics.zip` package file.
3. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extensions installer with app_googleanalytics.zip selected -->

:::info

If J2Commerce is not installed and enabled on your site, the installer stops and shows a message telling you to install J2Commerce first.

:::

## Enable the App

Once installed, confirm the app is enabled. There are two ways to reach it.

**Option A:** Click the **J2Commerce** icon in the top-right corner -> **Apps**.

**Option B:** Go to **Components** in the left sidebar -> **J2Commerce** -> **Apps**.

<!-- SCREENSHOT: J2Commerce Apps list showing Google Analytics in the list -->

Look for **Google Analytics** in the list. If the toggle shows a red X, click it to turn it into a green checkmark. The app is now active.

## Before You Start: Choose Your Tracking Method

Decide which of the two tracking methods fits your store before you configure anything. You can only use one at a time -- the app never loads both.

| Method | Best for | What you need |
|--------|----------|----------------|
| **Google Tag Manager** | Stores that already manage tags (GA4, Google Ads, Meta Pixel, and others) through a GTM container, or plan to add more marketing tags later without editing code | A GTM **Container ID** (looks like `GTM-XXXXXXX`) from [tagmanager.google.com](https://tagmanager.google.com) |
| **GA4 Direct (gtag.js)** | Stores that only want Google Analytics 4 and prefer the simplest possible setup with no GTM account | A GA4 **Measurement ID** (looks like `G-XXXXXXXXXX`) from your GA4 property's Data Streams settings |

:::tip

If you are not sure, GA4 Direct is the simpler starting point -- one field, no separate GTM account to manage. Switch to Google Tag Manager later if you outgrow it.

:::

## Configure the App

Click the **Google Analytics** title in the Apps list to open the plugin settings. The settings are grouped into four tabs: **Google Analytics Settings**, **Server-Side Delivery (Measurement Protocol)**, **Consent Mode v2**, and **Enhanced Conversions & User-ID**.

<!-- SCREENSHOT: Google Analytics plugin settings page showing the four settings tabs -->

### Google Analytics Settings

<!-- SCREENSHOT: Google Analytics Settings tab showing Tracking Method, Container/Measurement ID, and Enabled Events fields -->

| Field | Description | Default |
|-------|-------------|---------|
| **Tracking Method** | Choose **Google Tag Manager** or **GA4 Direct (gtag.js)**. See the comparison table above. | Google Tag Manager |
| **GTM Container ID** | Your Google Tag Manager container ID, e.g. `GTM-XXXXXXX`. Only shown when Tracking Method is Google Tag Manager. Required for the container to load. | (empty) |
| **GA4 Measurement ID** | Your Google Analytics 4 Measurement ID, e.g. `G-XXXXXXXXXX`. Only shown when Tracking Method is GA4 Direct -- but this same ID is also required if you turn on Server-Side Delivery below, even when your Tracking Method is Google Tag Manager. | (empty) |
| **Enabled Events** | Multi-select list of which GA4 ecommerce events to send: product list views, product detail views, add to cart, view cart, remove from cart, begin checkout, shipping info, payment info, purchase, refund, search, sign up, login, and promotion views/clicks. Leave empty to disable all client-side events while still loading the container. | All standard shopping events selected |
| **Item ID Source** | What value identifies each product in event data: the internal J2Commerce Product ID (a number), or the product's SKU. Use SKU if you run remarketing campaigns built around a product feed. The same choice applies everywhere so a product is never split into two different items in your reports. | J2Commerce Product ID |
| **Store Affiliation (optional)** | An optional store name added to every product entry, useful if you run more than one storefront and want to tell them apart in a shared GA4 property. | (empty) |
| **Exclude User Groups** | Logged-in users in the selected user groups (for example, Staff or Administrator) are never tracked, so your own team's testing does not skew your analytics. The Joomla admin area is always excluded automatically regardless of this setting. | (none selected) |
| **Custom Dimensions / Metrics** | Optional `key=value` pairs, one per line, added to every event this app sends. Use this to pass extra data you have mapped to custom dimensions or metrics in your GA4 property (for example, `customer_type=wholesale`). | (empty) |
| **Debug Mode** | When on, every event is logged to the browser's developer console, and events are flagged so they appear immediately in GA4's **DebugView** (Admin > DebugView) in addition to normal recording. Turn this off once you have finished testing -- it adds noise on every page load. | No |

### Server-Side Delivery (Measurement Protocol)

Server-side delivery sends a copy of your most important events -- typically purchases and refunds -- directly from your server to Google, bypassing the shopper's browser entirely. This means the event still reaches GA4 even if an ad blocker or browser privacy setting stops the normal in-browser tracking.

<!-- SCREENSHOT: Server-Side Delivery tab showing Enable Server-Side Delivery, API Secret, and Server-Side Events fields -->

| Field | Description | Default |
|-------|-------------|---------|
| **Enable Server-Side Delivery** | Turns server-side delivery on or off. When on, selected events are sent both from the browser and from your server -- GA4 automatically matches them up by transaction ID so purchases are never double-counted. | No |
| **Measurement Protocol API Secret** | A secret key you create in your GA4 property under **Admin > Data Streams > (your stream) > Measurement Protocol API secrets**. Only sent to Google's servers, never shown or logged. | (empty) |
| **Server-Side Events** | Which events also get sent server-side. Purchase and refund are recommended here because they are your most valuable events and the ones most likely to be missed by browser-based tracking alone. High-traffic browsing events (page views, add to cart) are usually left off this list to avoid unnecessary server load. | Purchase, Refund |
| **Request Timeout (seconds)** | How long the server waits for Google to respond before giving up on a single server-side request. This never slows down your storefront -- the request is sent after the shopper's page has already finished loading. | 3 |
| **Log Server-Side Requests** | When on, every server-side request is sent to Google's validation-only test endpoint and the result is written to a log file, instead of recording real data. Use this only to confirm your setup is correct, then turn it back off. | No |
| **Refund Order Statuses** | Which order statuses should trigger a GA4 refund event when an order is moved into them (for example, **Cancelled**). Leave empty to use only the built-in Cancelled status. | (built-in Cancelled status) |

:::info

The GA4 Measurement ID and API Secret are always required for Server-Side Delivery, even if your Tracking Method is set to Google Tag Manager. If you run in Google Tag Manager mode and want to use Server-Side Delivery, temporarily switch Tracking Method to GA4 Direct, enter and save your Measurement ID, then switch Tracking Method back to Google Tag Manager -- the saved Measurement ID is kept.

:::

### Consent Mode v2

<!-- SCREENSHOT: Consent Mode v2 tab showing Require Marketing Consent, Consent Mode, URL Passthrough, and Ads Data Redaction fields -->

| Field | Description | Default |
|-------|-------------|---------|
| **Require Marketing Consent** | When on, tracking respects Google's Consent Mode v2 -- by default nothing is tracked as personally identifiable until a visitor grants marketing consent. This is typically required for GDPR / ePrivacy compliance if you serve visitors in the EU or UK. | No |
| **Consent Mode** | Only shown when Require Marketing Consent is on. **Basic** waits to load Google Tag Manager or gtag.js at all until consent is granted -- nothing is sent beforehand. **Advanced** (recommended) loads the tracking script right away in a privacy-safe state, so Google can still model some conversions from anonymous signals before consent is granted, then upgrades to full tracking once the visitor accepts. | Advanced |
| **URL Passthrough** | Only shown when Require Marketing Consent is on and takes effect only in Advanced mode. When ad-related consent is denied, appends click identifiers to outbound links instead of relying on a cookie, so ad conversions can still be modeled. | No |
| **Ads Data Redaction** | Only shown when Require Marketing Consent is on and takes effect only in Advanced mode. When ad-related consent is denied, strips Google Ads click identifiers from requests entirely. | No |

:::tip

This app reads the same consent decision used by the [Cookiebot](./app_cookiebot.md) app. If you already have Cookiebot installed and configured, turning on **Require Marketing Consent** here is enough -- no extra setup is needed. If you do not have a consent-management app installed, leave **Require Marketing Consent** off, or your GA4 events may never fire.

:::

### Enhanced Conversions & User-ID

<!-- SCREENSHOT: Enhanced Conversions and User-ID tab showing Send User-ID and Enable Enhanced Conversions fields -->

| Field | Description | Default |
|-------|-------------|---------|
| **Send User-ID** | When on, signed-in customers are tracked using GA4's User-ID feature (both in the browser and, if enabled, via server-side delivery), which lets GA4 stitch together a customer's activity across multiple devices. Only your store's internal customer ID is sent -- never a name or email address. | No |
| **Enable Enhanced Conversions** | When on, the server-side purchase event includes a securely hashed (not readable) version of the customer's billing email, phone, name, and address, so Google can match more conversions to signed-in Google users for ad bidding. The original information is never sent, stored, or logged -- only irreversible hashes. Requires **Enable Server-Side Delivery** to be turned on above. | No |

## Setup Walkthrough

1. Decide on **Google Tag Manager** or **GA4 Direct** using the comparison table above, and select it under **Tracking Method**.
2. Paste your **GTM Container ID** or **GA4 Measurement ID** into the matching field and click **Save**.
3. Review the **Enabled Events** list and remove any events you do not want tracked.
4. If you want purchases and refunds to reach GA4 even when a shopper's browser blocks tracking scripts, open the **Server-Side Delivery** tab, turn on **Enable Server-Side Delivery**, and paste in your **Measurement Protocol API Secret** from your GA4 property.
5. If your store needs cookie consent (for example, you serve EU or UK visitors), install and configure a consent app such as [Cookiebot](./app_cookiebot.md) first, then turn on **Require Marketing Consent** here.
6. Place a test order in a private/incognito browser window and confirm the events described in **Verify Your Setup** below.
7. Once everything checks out, turn **Debug Mode** and **Log Server-Side Requests** back off.

## Verify Your Setup

<!-- SCREENSHOT: GA4 DebugView showing incoming events from the storefront -->

The fastest way to confirm tracking is working is Google Analytics 4's built-in **DebugView**.

1. In your plugin settings, turn on **Debug Mode** and click **Save**.
2. In a separate browser tab, open your GA4 property and go to **Admin > DebugView**.
3. Browse your storefront in a private/incognito window: view a product, add it to your cart, and start checkout.
4. Watch DebugView -- events like `view_item` and `add_to_cart` should appear within a few seconds of each action.
5. Open your browser's developer console (usually F12) on the storefront -- with Debug Mode on, each event is also logged there, so you can confirm exactly what data was sent.
6. If you use **Google Tag Manager** mode, you can additionally use GTM's own **Preview** mode alongside DebugView to confirm the container is firing correctly.
7. When finished testing, turn **Debug Mode** back off.

## Tips

- **Start with GA4 Direct if you are not already using GTM for other tags.** It is one field and nothing else to manage.
- **Turn on Server-Side Delivery for purchase and refund only**, unless you have a specific reason to send more events server-side -- it is designed for your highest-value, most ad-blocker-sensitive events.
- **Set up your consent app before turning on Require Marketing Consent.** If no consent app is installed and consent is required, tracking may never start because the plugin is waiting for a decision that never arrives.
- **Leave Item ID Source on Product ID** unless you specifically run SKU-based remarketing feeds -- switching it later will split historical reporting for the same products.
- **Test in a private/incognito window** so a previous test session's data does not carry over.

## Troubleshooting

### No Data Appears in Google Analytics At All

**Cause:** The Container ID or Measurement ID field is empty or was never saved, the app is disabled, or the wrong Tracking Method is selected for the ID you entered.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and confirm **Google Analytics** shows a green checkmark.
2. Open the plugin settings and confirm the correct ID is filled in for your selected **Tracking Method** -- a GTM Container ID (`GTM-...`) if using Google Tag Manager, or a GA4 Measurement ID (`G-...`) if using GA4 Direct.
3. Save the settings again, then clear your Joomla cache and your browser cache.
4. Reload the storefront in a private/incognito window and check **Verify Your Setup** above.

### Events Are Not Firing at All, But the Container Loads

**Cause:** **Require Marketing Consent** is turned on, but no consent-management app (like Cookiebot) is installed, or the visitor has not yet accepted marketing cookies.

**Solution:**

1. Open the plugin settings and check whether **Require Marketing Consent** is on.
2. If you do not have a consent app installed and you do not need consent gating, turn this setting back off and save.
3. If you do need consent gating, install and configure [Cookiebot](./app_cookiebot.md) (or an equivalent consent app that sets the same consent signal), then test again by accepting marketing cookies in a private/incognito window.

### Purchase or Refund Events Never Appear, Even With Server-Side Delivery On

**Cause:** The event was not included in **Server-Side Events**, the API Secret is missing or incorrect, or -- for refunds specifically -- the order's new status was not included in **Refund Order Statuses**.

**Solution:**

1. Open the **Server-Side Delivery** tab and confirm **Enable Server-Side Delivery** is on and **Measurement Protocol API Secret** is filled in correctly (recreate it in GA4 under **Admin > Data Streams > (your stream) > Measurement Protocol API secrets** if unsure).
2. Confirm **Purchase** and/or **Refund** are selected under **Server-Side Events**.
3. For refunds, confirm the order status you use for cancellations/refunds is selected under **Refund Order Statuses**, or leave the field empty to use only the built-in Cancelled status.
4. Turn on **Log Server-Side Requests**, reproduce the issue, then check the `ga4-mp.php` log file in your Joomla logs folder for the request result and any validation messages from Google.
5. Turn **Log Server-Side Requests** back off once finished -- while it is on, requests go to Google's test-only validation endpoint and are not recorded as real data.

### Events Look Duplicated in Reports

**Cause:** This is usually expected, not a bug. When Server-Side Delivery is on, a purchase can be sent both from the browser and from your server -- GA4 automatically deduplicates these using the shared transaction ID (your order number), so it should not inflate your reported totals.

**Solution:**

1. Confirm in GA4's standard reports (not DebugView, which shows every raw event) that transaction counts match your actual order count.
2. If counts genuinely do not match, turn on **Debug Mode** and **Log Server-Side Requests** together and review both the browser console and the `ga4-mp.php` log for the same order to confirm only one purchase event was generated per order.

### GA4 Direct Mode: Data Appears But Google Ads Conversions Do Not

**Cause:** Consent Mode v2 is denying ad-related signals, or Enhanced Conversions is not enabled.

**Solution:**

1. If you serve EU/UK visitors, confirm **Require Marketing Consent** and **Consent Mode** are configured intentionally under the Consent Mode v2 tab -- ad signals are withheld by design until a visitor consents.
2. To improve Google Ads conversion matching for signed-in Google users, turn on **Enable Enhanced Conversions** under the Enhanced Conversions & User-ID tab (this also requires **Enable Server-Side Delivery**).
3. Allow 24-48 hours for Google Ads to reflect newly enabled conversion signals -- this is normal processing time on Google's side, not a plugin issue.

## Related Topics

- [Cookiebot](./app_cookiebot.md) -- cookie consent banner that this app's Require Marketing Consent setting is designed to work with
- [Google Tag Manager](./ecommercegoogletagmanager.md) -- a separate, GTM-only tracking add-on for stores that do not need GA4 Direct mode or server-side delivery
- [Meta Pixel / Facebook Conversion](./app_facebookconversion.md) -- Meta ad tracking with the same consent-gating pattern
