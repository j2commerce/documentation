---
title: "Page Caching"
sidebar_label: "Page Caching"
sidebar_position: 6
description: "How J2Commerce works safely with Joomla's page cache -- which pages are excluded automatically, which cart module layouts are safe to publish on cacheable pages, and how to avoid showing one shopper's data to another."
---

# Page Caching

Joomla's page cache stores a copy of a rendered page and serves that same copy to the next visitor who requests the same web address, instead of rebuilding the page from scratch. This makes your store noticeably faster, but it also means the cached copy is shared -- so J2Commerce is careful never to store one shopper's personal information (their cart contents, their name, their order history) inside a page that could be handed to someone else.

This guide explains what J2Commerce keeps out of the cache automatically, what you are responsible for when placing cart modules on your site, and two caveats worth understanding before you turn on aggressive caching.

## Prerequisites

- J2Commerce 6 installed and enabled
- Joomla's System - Page Cache plugin enabled (**System** -> **Manage** -> **Plugins**, search for "Page Cache")

## Pages That Are Never Cached

J2Commerce automatically keeps certain pages out of the page cache, because they always show something specific to the person viewing them:

- **Cart** -- shows the shopper's own cart items
- **Checkout** -- shows the shopper's own addresses, order summary, and payment options
- **Order confirmation**
- **My Account / Profile**
- **Order history**
- **Payment update pages**

In addition, a page is kept out of the cache whenever the visitor is carrying shopper-specific state -- for example, a guest who just looked up an order by its order number and email address, or anyone with at least one item already in their cart. This second rule catches cases where a shopper-specific page might otherwise be reached through a URL not on the fixed list above.

<!-- SCREENSHOT: System > Manage > Plugins screen with "Page Cache" plugin highlighted -->

### Always purge the cache after changing this list

If a page was cached before it should have been excluded -- for example, right after installing or updating J2Commerce, or after changing which pages your site treats as account-related -- the cached copy already sitting in the cache keeps being served to visitors exactly as it was, even after the fix takes effect. The exclusion rule only applies at the moment a page is **saved** into the cache, never at the moment it is **served** from the cache.

**After any update to J2Commerce, or any change to your caching configuration, purge the page cache.**

1. Go to **System** -> **Maintenance** -> **Clear Cache**.
2. Select the **Page Cache** group (or clear all cache groups).
3. Click **Delete**.

<!-- SCREENSHOT: System > Maintenance > Clear Cache screen with the Page Cache group selected -->

## Cart Module Placement

J2Commerce's cart module (**mod_j2commerce_cart**) ships with several layouts. Only the **minicart** layout is safe to publish on a page that Joomla is allowed to cache.

| Layout | Safe on a cacheable page? | Why |
|---|---|---|
| **Mini Cart** | Yes | Shows only an icon and an item count. The count is refreshed automatically for each visitor after the page loads, even when the page itself came from the cache. |
| **Default (full cart)** | No | Lists every item in the cart with its name, quantity, and price, and shows the cart total. None of that content refreshes itself after the page loads -- if this layout is cached, every visitor to that page sees whoever's cart was in it when the page was cached. |
| **Detailed Cart on Hover** | No | Same limitation as the full cart layout -- it renders item names and prices directly into the page. |

**Only publish the Mini Cart layout on a page position that appears on cacheable pages** (your home page, category pages, product pages, and any other page not on the excluded list above). If your site design calls for a full item list with prices in the header or a hover panel, either:

- Restrict that module position to pages that are already excluded from caching (checkout, account pages), or
- Turn off page caching for the position/page combination where the full layout appears, or
- Use the Mini Cart layout and link it to your full cart page instead of showing item details inline.

<!-- SCREENSHOT: Module Manager showing the mod_j2commerce_cart layout selector with "Mini Cart" highlighted as the recommended option -->

### The item-count badge and "Count by Quantity"

The Mini Cart's item-count badge only updates itself automatically when the module's **Count by Quantity** setting is turned **on**. With it turned off, the badge shows the number of distinct product lines in the cart instead of the total quantity -- a number the automatic refresh cannot supply, so the badge is deliberately left showing the value from when the page was generated rather than being silently replaced with the wrong kind of count.

If you want the badge to always be accurate for every visitor on a cached page, leave **Count by Quantity** turned on.

### The "Hide When Empty" setting

The Mini Cart's **Hide When Empty** setting is fully supported. When it is turned on and the cart is empty at the moment the page is generated, the cart icon is rendered hidden rather than left out of the page entirely. This is intentional: if a shopper with items in their cart later receives a copy of that same page from the cache, there is still something on the page for the automatic refresh to reveal. You do not need to do anything differently -- this behavior works correctly out of the box.

## Configuration Reference

| Setting | Location | What It Does | Default |
|---|---|---|---|
| **Count by Quantity** | Module: mod_j2commerce_cart (Mini Cart layout) | Controls whether the badge counts total item quantity (auto-refreshes) or distinct product lines (does not auto-refresh) | Enabled |
| **Hide When Empty** | Module: mod_j2commerce_cart | Hides the cart icon when the cart is empty. Fully compatible with page caching. | Disabled |
| **Page Cache** | System -> Manage -> Plugins | Joomla's built-in page cache. Must be enabled for any of the above to matter. | Disabled |

## Two Things to Know

### A CDN set to "cache everything" is not the same as Joomla's page cache

Joomla's own page cache is careful never to store a page rendered for a logged-in customer -- logged-in visitors never receive a cached page from Joomla itself. A third-party CDN or reverse-proxy cache sitting in front of your site (Cloudflare, for example) does not know about that distinction unless you configure it correctly. A CDN rule set to "cache everything" can cache and replay a page that was rendered for a specific logged-in customer to a completely different visitor.

If you use a CDN or edge cache in front of your J2Commerce store, make sure it is configured to bypass the cache for logged-in sessions (most CDNs do this automatically when a login cookie is present, but only if that behavior is turned on) and to respect the `Cache-Control` headers your site sends. Do not enable a blanket "cache everything" rule without first confirming logged-in and cart-carrying visitors are excluded.

### A cached page can briefly show a stale cart count

When a visitor receives a page from the cache, the cart icon shows whatever count was correct when the page was cached, for a brief moment, before the automatic refresh replaces it with the visitor's own correct count. This is expected and intentional: the alternative -- showing no cart icon at all until the refresh completes -- is worse for visitors who have JavaScript disabled or who are on a slow connection, since they would never see a cart icon at all. The trade-off is a brief, harmless flash of a slightly-wrong number in exchange for the icon always being present.

## Template Overrides

If your site uses a customized copy of the Mini Cart layout (a **template override** created before this hydration behavior shipped, or copied from an older version of J2Commerce), it may be missing the markup the automatic refresh depends on. An older override will still display correctly on a freshly generated page, but the cart count will not refresh itself after the page loads, and the cache-safety described in this guide will not apply to it.

If you have a custom Mini Cart override and the badge does not update after adding an item to the cart, re-create your override from the current core `minicart.php` layout (or its UIkit equivalent) and re-apply your customizations on top of the current version.

## Security Note

Keep your site's `cache/` folder itself non-writable by any file-upload feature on your site (product image uploads, downloadable file attachments, and similar). The cache folder should only ever be written to by Joomla's own caching system.

## Troubleshooting

### The cart count on my home page is wrong for some visitors

**Cause:** Either page caching is showing a stale copy that has not been purged since a recent change, or a full-cart module layout (Default or Detailed Cart on Hover) has been published on a cacheable page position.

**Solution:**

1. Purge the page cache (**System** -> **Maintenance** -> **Clear Cache** -> Page Cache).
2. Check the Module Manager and confirm any module in a cacheable position is using the **Mini Cart** layout, not Default or Detailed Cart on Hover.
3. If you recently upgraded J2Commerce, purge the cache again after confirming the upgrade completed.

### The cart badge never updates, even after purging the cache

**Cause:** A customized template override of the Mini Cart layout is missing the markup the automatic refresh needs.

**Solution:** Recreate your override from the current core layout file and re-apply your customizations. See [Template Overrides](#template-overrides) above.

### My CDN is showing one customer's account page to another visitor

**Cause:** The CDN is caching pages Joomla never intended to be cached, typically because a "cache everything" rule is not excluding logged-in sessions.

**Solution:** Disable any blanket "cache everything" rule on your CDN. Configure it to bypass caching for requests that carry a logged-in session cookie, and to respect the `Cache-Control` headers J2Commerce and Joomla send. Contact your CDN provider's support if you are unsure how to configure this correctly for your account.

## Related Topics

- [Cron Tasks and Scheduled Maintenance](./configuration/cron-tasks.md)
