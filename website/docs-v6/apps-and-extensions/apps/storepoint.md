---
title: "Storepoint Store Locator"
sidebar_label: "Storepoint Store Locator"
sidebar_position: 90
description: "Embed the Storepoint store-locator widget on selected Joomla articles using your Storepoint Map ID and a single configuration screen."
---

# Storepoint Store Locator

Storepoint Store Locator embeds the Storepoint CDN widget on any Joomla article so shoppers can find your nearest retail locations without leaving your site. Setup takes under two minutes: enter your Map ID, choose a display position, and optionally select which menu items should show the widget. No template changes or coding required.

## Requirements

- Joomla 6.0.0 or later
- J2Commerce 6.0.0 or later
- PHP 8.3 or later
- An active Storepoint account with a configured map

## Installation

**Storepoint Store Locator** is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

### Step 1: Purchase and download

1. Go to [j2commerce.com](https://www.j2commerce.com/) and navigate to **Extensions**.
2. Find **Storepoint Store Locator**, click **View Details**, then **Add to Cart** and complete checkout.
3. Open your account and go to **My Downloads**.
4. Click **Available Versions** -> **View Files** -> **Download** to get the `app_storepoint.zip` file.

### Step 2: Install

1. In the Joomla admin panel, go to **System** -> **Install** -> **Extensions**.
2. Drag and drop `app_storepoint.zip` onto the upload area, or click **Browse for file** and select it.
3. The plugin installs and enables itself automatically — no manual enable step needed.

<!-- SCREENSHOT: Joomla Extension Manager upload area showing app_storepoint.zip ready to install -->

## Accessing Settings

After installation the plugin is enabled and ready to configure. There are two ways to reach the settings screen.

**Option A — via J2Commerce:** Click the **J2Commerce** icon in the top-right admin toolbar -> **Apps** -> locate **Storepoint Store Locator** -> click the plugin name.

**Option B — via Plugin Manager:** Go to **System** -> **Manage** -> **Plugins** -> search for **Storepoint** -> click the plugin name.

<!-- SCREENSHOT: Plugin Manager search results showing "Storepoint Store Locator" with Enabled badge -->

## Configuration

All settings are on a single **General** tab.

<!-- SCREENSHOT: Storepoint plugin settings screen showing all four fields -->

### Storepoint Map ID

| Field | Description | Default |
|-------|-------------|---------|
| **Storepoint Map ID** | The Map ID from your Storepoint embed code. Required — the widget will not load without it. | _(empty)_ |

Find your Map ID inside your Storepoint dashboard. When you view the embed code for your map, it appears as the `data-map-id` attribute value in the snippet, for example:

```html
<div id="storepoint-container" data-map-id="abc123xyz"></div>
```

Copy only the value (e.g., `abc123xyz`) — not the full tag — and paste it into this field.

:::warning Map ID required
If **Storepoint Map ID** is empty, the widget is silently skipped on all articles regardless of other settings. If debug mode is on, this is logged to `administrator/logs/plg_j2commerce_app_storepoint.php`.
:::

### Display Location

The **Display Location** dropdown controls where the widget appears within the article.

| Option | Widget appears… |
|--------|-----------------|
| **After article title** | Between the article title and the article body |
| **Before article content** | Immediately before the article body text |
| **After article content** | Immediately after the article body text (default) |

**Recommended default:** "After article content" places the map after your store or brand information, where shoppers naturally look next.

### Menu Items

| Field | Description | Default |
|-------|-------------|---------|
| **Menu Items** | Select menu items (linked to articles) where the widget should appear. Leave empty to show on all articles. | _(empty — all articles)_ |

This field accepts menu items that link to individual Joomla articles (`com_content` article view). Select one or more menu items to restrict the widget to specific articles. When the field is empty, the widget appears on every `com_content` article page.

:::note Articles accessed directly by URL
The **Menu Items** filter works by resolving the menu item to its linked article ID. Articles visited through a URL that does not match any selected menu item will not show the widget, even if the article would otherwise qualify. If you want the widget on every store-locator article regardless of the URL used to reach it, leave the field empty.
:::

### Debug Mode

| Field | Description | Default |
|-------|-------------|---------|
| **Debug Mode** | When **Yes**, writes diagnostic log entries to `administrator/logs/plg_j2commerce_app_storepoint.php`. | No |

Always leave this **No** on a live site. Enable it temporarily only when diagnosing why the widget is not appearing.

## Saving Settings

Click **Save** in the Joomla toolbar after adjusting any setting. Changes take effect on the next page load — no cache clearing is required unless your site uses server-side full-page caching.

## Verifying the Widget Loads

After saving, open the article where the widget should appear and confirm it is working.

**Check 1 — Widget container in the page source.** Right-click the page -> **View Page Source** and search for `storepoint-container`. You should see a `<div>` element like:

```html
<div class="j2commerce-app-storepoint">
    <div id="storepoint-container" data-map-id="YOUR_MAP_ID"></div>
</div>
```

If this element is missing, the plugin is not rendering — see [Widget does not appear](#widget-does-not-appear).

**Check 2 — CDN script loaded.** Open browser **Developer Tools** -> **Network** tab, reload the page, and filter by `cdn.storepoint.co`. You should see a JavaScript file from `cdn.storepoint.co/api/v1/js/` with status 200.

**Check 3 — Map renders.** The Storepoint widget should appear in the position you selected, showing your store locations on the map.

## Troubleshooting

### Widget does not appear

Work through these checks in order.

**Plugin is enabled.** Go to **System** -> **Manage** -> **Plugins**, search for **Storepoint**, and confirm the status is **Enabled**.

**Map ID is not empty.** Open the plugin settings and verify **Storepoint Map ID** contains the value from your Storepoint embed code. A missing Map ID silently suppresses the widget.

**Page is a Joomla article.** The plugin only renders on `com_content` article pages (single-article view). It will not fire on category blog pages, custom component views, or module positions.

**Menu item selection matches the current article.** If you selected specific menu items in the **Menu Items** field, the article you are viewing must be linked by one of those menu items. Leave the field empty to show the widget on all articles.

**Display Location matches expectations.** Confirm the **Display Location** dropdown is set to the position you expect the widget to appear.

**Enable debug mode.** Set **Debug Mode** to **Yes**, save, and reload the article page. Open `administrator/logs/plg_j2commerce_app_storepoint.php` and check for log entries. The log shows which check caused the widget to be skipped.

After diagnosing, turn **Debug Mode** back to **No**.

### Widget renders but the map is blank

This is a Storepoint account or configuration issue, not a J2Commerce configuration issue. The widget container and CDN script are loading correctly, but Storepoint is not returning map data.

Check the following in your Storepoint dashboard:

- Your Map ID is correct and matches the map that contains your store locations.
- Your Storepoint account is active and the subscription is current.
- Your store locations are published in the Storepoint dashboard.
- Your Storepoint account domain allowlist includes your site's domain.

Contact [Storepoint support](https://storepoint.co) if the map remains blank after verifying the above.

### CDN script blocked by Content Security Policy

If your site uses a `Content-Security-Policy` header that restricts external scripts, you may need to add `cdn.storepoint.co` to your `script-src` directive. This is a server or hosting configuration change and is outside the scope of the J2Commerce plugin.

## What's New Compared to the J2Store Version

If you previously used the Storepoint app in J2Store, here is what changed in the J2Commerce 6 version:

- **Security hardened** — the J2Store version used unquoted `data-map-id=$storepoint_mapid` in the HTML output. Any Map ID containing special characters could break the widget container. The J2Commerce version escapes the Map ID through `htmlspecialchars(ENT_QUOTES)` and uses `filter="cmd"` on the param field.
- **Parameterized DB queries** — the J2Store version built the menu-item WHERE IN clause by concatenating an `implode()`'d array directly into the SQL string. The J2Commerce version uses named parameter bindings (`:menuId0`, `:menuId1`, etc.) per Joomla 6 standards.
- **Per-request DB query cache** — the J2Store version called `getArticleIDs()` once per content event, running the same menu query up to three times per page load. The J2Commerce version caches the result on first call and reuses it across all three events.
- **Event short-circuit before DB** — the J2Store version ran the menu DB query before checking whether the current content event matches the configured display location. The J2Commerce version checks the configured event first and returns early before any DB work if there is no match.
- **Correct Joomla 6 content event output** — the J2Store version returned widget HTML directly from content event handlers. The J2Commerce version uses `$event->addResult($html)` per the Joomla 6 `SubscriberInterface` contract.
- **Consolidated language keys** — the J2Store version had a custom field that referenced `PLG_J2STORE_APP_STOREMAPPER_*` keys (wrong element name prefix), causing the dropdown to render raw language key strings. The J2Commerce version uses the correct `PLG_J2COMMERCE_APP_STOREPOINT_*` prefix throughout.
- **Automatic enable on install** — the plugin enables itself during installation, so no manual step is needed.
- **Debug logging** — a new **Debug Mode** toggle writes diagnostic entries to a dedicated log file.
- **American English (en-US) as canonical** — en-US is the primary language file; en-GB is provided alongside it.

## Related Topics

- [Apps and Extensions](../index.md)
