---
title: "USPS Advanced Shipping"
sidebar_label: "USPS Advanced Shipping"
sidebar_position: 60
description: "Live USPS shipping rates via the OAuth 2.0 USPS API v3. Covers Ground Advantage, Priority Mail, Priority Mail Express, Media Mail, international services, and flat-rate boxes — with 3D bin-packing and sandbox testing support."
---

# USPS Advanced Shipping

The USPS Advanced Shipping plugin connects your J2Commerce store to the official USPS API v3 and fetches live shipping rates at checkout. Customers see real-time prices for Ground Advantage, Priority Mail, Priority Mail Express, Media Mail, international services, and flat-rate options — pulled directly from USPS, not from a hard-coded price table. Rates update automatically when USPS changes its pricing.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x
- A USPS Developer Portal account (free to create)
- A USPS Consumer Key and Consumer Secret from a registered Developer Portal app
- A US-based ship-from address (USPS rates originate from the US, Puerto Rico, the US Virgin Islands, or US territories)

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) **->** **Extensions**.

**Step 2:** Locate **USPS Advanced Shipping** **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile, search for the plugin, click **Available Versions** **->** **View Files** **->** **Download Now**.

---

## Getting Your USPS API Credentials

The plugin connects to USPS using OAuth 2.0, which requires a Consumer Key and Consumer Secret from the USPS Developer Portal. This is a free, self-service process.

**Step 1:** Go to [https://developer.usps.com](https://developer.usps.com) and click **Sign Up**. Fill in your name, email, and organization, then verify your email.

**Step 2:** After logging in, go to **My Apps** and click **Create New App**.

**Step 3:** Give your app a name (for example, "My Store Shipping"). In the **APIs** section, request access to:

- **Prices** — required for domestic rates
- **International Prices** — required for international rates

**Step 4:** Submit the app. USPS approves most apps instantly. Once approved, open the app and copy your **Consumer Key** and **Consumer Secret**. Keep these private — they act as your login to the USPS API.

:::tip

USPS also provides a Test Environment (TEM) at `apis-tem.usps.com`. Your same Consumer Key and Consumer Secret work in both environments. You can start testing immediately without waiting for any additional approval.

:::

<!-- SCREENSHOT: USPS Developer Portal "My Apps" screen showing an app with Consumer Key and Consumer Secret highlighted -->

---

## Install the Plugin

In the Joomla administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `shipping_uspsadvanced.zip` package file.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen with shipping_uspsadvanced.zip selected -->

## Enable the Plugin

Once installed, the plugin must be enabled before it appears at checkout.

**Option A:** Go to the **J2Commerce** icon at the top-right **->** **Setup** **->** **Shipping Methods**.

**Option B:** Go to **Components** on the left sidebar **->** **J2Commerce** **->** **Setup** **->** **Shipping Methods**.

<!-- SCREENSHOT: Shipping Methods list showing USPS Advanced Shipping with a red X (disabled) -->

Find **USPS Advanced Shipping** in the list, click the **X**, and it turns into a green checkmark.

<!-- SCREENSHOT: USPS Advanced Shipping row showing a green checkmark (enabled) -->

Click the plugin name to open the configuration screen.

:::tip

Use the **Toggle Inline Help** button near the top of the configuration screen to show a short description below each field.

:::

---

## Configure the Plugin

The configuration is divided into seven sections. Work through them in order on your first setup.

---

### Section 1: USPS API Credentials

<!-- SCREENSHOT: API Credentials section with Sandbox Mode, Consumer Key, and Consumer Secret fields -->

**Use Test Server**

| Option | Meaning |
|--------|---------|
| No | Connect to `apis.usps.com` (live production) |
| Yes | Connect to `apis-tem.usps.com` (USPS test environment) |

Start with this set to **Yes** while you configure and test. Switch to **No** only after you confirm that rates appear correctly. Your Consumer Key and Consumer Secret work in both environments — no separate test credentials are needed.

**Consumer Key**

Paste the Consumer Key from your USPS Developer Portal app. This field is required.

**Consumer Secret**

Paste the Consumer Secret from your USPS Developer Portal app. This field is required.

The plugin exchanges these credentials for a short-lived OAuth 2.0 access token automatically. The token is cached for 50 minutes (USPS tokens expire after 1 hour), so the plugin does not make unnecessary authentication calls during busy checkout periods.

---

### Section 2: Origin Address

This is where your packages ship from. USPS uses the origin ZIP code to calculate rates.

<!-- SCREENSHOT: Origin Address section with ZIP, country, state, and city fields -->

| Field | Required | Notes |
|-------|----------|-------|
| **Origin ZIP Code** | Yes | Your 5-digit US ZIP code. USPS uses this as the starting point for all rate calculations. |
| **Origin Country** | Yes | Select **United States** (or the applicable US territory). USPS only rates shipments from the US, Puerto Rico, the US Virgin Islands, Marshall Islands, and the Federated States of Micronesia. |
| **Origin State** | No | Your ship-from state or territory. Populated from the selected country. |
| **Origin City** | No | Your ship-from city. |

---

### Section 3: USPS Services

This section controls which mail classes appear at checkout and how rates are priced.

<!-- SCREENSHOT: USPS Services section showing Enable Standard Services, Price Type, Domestic Services, and International Services -->

**Enable Standard Services**

Leave set to **Yes** for most stores. Set to **No** only if you want to show flat-rate services exclusively (see [Section 5: Flat Rate Mode](#section-5-flat-rate-shipping) below).

**Price Type**

| Option | What It Means |
|--------|---------------|
| Commercial Rates | Discounted rates available to USPS commercial customers. Requires a USPS commercial account. |
| Retail Rates | Standard counter rates — what a customer would pay at the Post Office. This is the correct choice for most stores. |

**Domestic Services**

Select which USPS domestic mail classes to show at checkout. Click the field to open the selector and choose one or more options. Available mail classes:

| Mail Class | When to Use |
|------------|-------------|
| All Services | Show every rate USPS returns — the widest selection |
| USPS Ground Advantage | Everyday 2–5 day ground shipping for packages up to 70 lbs |
| Priority Mail | 1–3 day shipping |
| Priority Mail Express | Overnight or 2-day guaranteed delivery |
| Parcel Select | Economy ground for high-volume shippers |
| Media Mail | Books, CDs, DVDs, and educational materials only (USPS may inspect packages) |
| Library Mail | Between educational institutions and certain nonprofits only |
| Bound Printed Matter | Catalogs, directories, and advertising flyers (must qualify) |
| USPS Connect Local | Same-day and next-day delivery in USPS local zones |
| USPS Connect Mail | Next-day delivery in USPS Connect Mail zones |
| USPS Connect Regional | Regional next-day or 2-day delivery |

**International Services**

Select which USPS international services to show for shipments going outside the US. Available options include Priority Mail Express International, Priority Mail International, First-Class Package International Service, and multiple Global Express Guaranteed (GXG) options.

**Machinable Shipments**

| Option | Meaning |
|--------|---------|
| Yes (recommended) | Your packages have standard dimensions and can go through USPS sorting machinery. Most parcels qualify. |
| No | Your packages are non-standard and must be processed manually (FLATS category). Rates are typically higher. |

**Destination Entry Facility Type**

Leave set to **None** for most stores. If you drive shipments directly to a specific USPS facility (Network Distribution Center, Sectional Center Facility, Delivery Unit, or Service Hub) to qualify for entry discounts, select the matching facility type. This is an advanced option used by high-volume mailers with USPS worksharing contracts.

---

### Section 4: Package Handling

This section controls how the plugin groups your order's items into packages before requesting rates.

<!-- SCREENSHOT: Package Handling section showing Packing Mode dropdown -->

**Packing Mode**

| Mode | How It Works | Best For |
|------|-------------|----------|
| Per Item | Each item in the cart becomes its own package. The plugin requests one rate per item. | Products of widely varying sizes, digital goods mixed with physical |
| Box Packing (3D bin packing) | The plugin fits items into the smallest box from your **Box List** using a 3D bin-packing algorithm. Produces the most accurate multi-item rates. | Stores with a fixed set of box sizes |
| Weight-Based | Items are combined into packages up to 70 lbs (domestic) or 44 lbs (international), ignoring box dimensions. | Items without dimension data, or when you want a simple weight-ceiling approach |

**Box List** _(appears when Box Packing is selected)_

Define the box sizes the plugin packs items into. Click **Add Box** and fill in the outer dimensions (length, width, height), inner dimensions, box weight (the weight of the empty box), and maximum cargo weight per box. The plugin picks the smallest box that fits all items and adds the box's own weight to the shipment weight.

**Unpacked Item Handling** _(Box Packing only)_

What to do when an item is too large to fit any of your configured boxes:

| Option | Result |
|--------|--------|
| Quote each unpacked item individually | That item is quoted as its own package (falls back to per-item behavior) |
| Ignore | Exclude the oversized item from the rate request entirely |
| Abort | Return no rates at all |

For most stores, **Quote each unpacked item individually** is the safest choice — it ensures a rate is always returned.

**Multiple Box Handling** _(Box Packing only)_

What to do when the order fills more than one box:

| Option | Result |
|--------|--------|
| Add the cost of every required box | Returns a total rate that sums all required boxes — most accurate |
| Abort | Returns no rates if more than one box is needed |

Leave this set to **Add the cost of every required box** unless you have a specific reason to prevent multi-box shipments.

---

### Section 5: Units and Defaults

USPS measures weight in pounds (lb) or ounces (oz), and dimensions in inches (in).

<!-- SCREENSHOT: Units and Defaults section -->

| Field | Recommended Value | Notes |
|-------|-------------------|-------|
| **Weight Unit** | `lb` | Select lb or oz. The plugin filters to lb and oz only (USPS does not accept kg). |
| **Dimension Unit** | `in` | USPS requires inches. This field is filtered to `in` only. |
| **Default Weight** | `1` lb | Used when a product has no weight set. USPS requires a weight on every package — this prevents errors on incomplete product data. |
| **Default Length** | `12` in | Fallback length for products with no dimensions. |
| **Default Width** | `8` in | Fallback width. |
| **Default Height** | `6` in | Fallback height. |

:::tip

Set realistic default dimensions for your most common product type. If you primarily ship small items in padded envelopes, use smaller defaults. If you primarily ship boxes, use larger values.

:::

---

### Section 6: Flat Rate Shipping

USPS offers flat-rate envelopes and boxes where the price depends on the packaging type — not on weight or distance. This section controls whether flat-rate options appear alongside (or instead of) weight-based rates.

<!-- SCREENSHOT: Flat Rate Shipping section showing Flat Rate Mode dropdown -->

**Flat Rate Mode**

| Option | What Appears at Checkout |
|--------|--------------------------|
| Disable flat-rate services | No flat-rate options — weight-based rates only |
| Enable all Priority and Express flat-rate services | Flat-rate boxes and envelopes for both Priority Mail and Priority Mail Express |
| Priority Mail flat-rate only | Flat-rate options for Priority Mail only |
| Priority Mail Express flat-rate only | Flat-rate options for Priority Mail Express only |

Flat-rate prices come directly from the USPS API — they are always current. There are no hard-coded price tables in this plugin.

:::info

Flat-rate boxes are most cost-effective for dense, heavy items. For lightweight items, standard weight-based rates are usually cheaper. Many stores enable both and let USPS return whichever is lower.

:::

---

### Section 7: Rate Options

This section adds handling fees, restricts by geozone, and configures tax and display preferences.

<!-- SCREENSHOT: Rate Options section showing Handling Cost, Tax Profile, and Geozone fields -->

**Handling Cost**

A fixed amount or percentage added to every USPS rate returned at checkout. Set to `0` for no handling fee.

**Handling Cost Type**

| Option | How It Works |
|--------|-------------|
| Flat Amount | A fixed dollar amount (e.g., `2.50` adds $2.50 to every rate) |
| Percentage | A percentage of the USPS rate (e.g., `10` adds 10% to every rate) |

**Tax Profile**

Select a J2Commerce tax profile to apply tax to shipping costs. Leave set to **None** if your jurisdiction does not tax shipping.

**Geozone Restriction**

Restrict this shipping method to customers within a specific J2Commerce geozone. Leave set to **None** to offer USPS rates to all customers worldwide. Use this when you want USPS rates for US-only customers and a different method for international orders.

**Show Delivery Days**

| Option | Result |
|--------|--------|
| Yes (recommended) | Estimated business days in transit appear next to each rate at checkout (e.g., "2 Business Days") |
| No | Only the price is shown |

**Debug Mode**

| Option | Result |
|--------|--------|
| No | No debug output |
| Yes | Every API request and response is written to `administrator/logs/shipping_uspsadvanced.php`. Useful for diagnosing rate problems. Disable in production. |

---

## Testing with the TEM Sandbox

The USPS Test Environment Mailing (TEM) server at `apis-tem.usps.com` is a safe environment where you can verify that rates are returned correctly before going live.

**Enable sandbox mode:**

1. Open the plugin configuration.
2. Set **Use Test Server** to **Yes**.
3. Fill in your **Consumer Key** and **Consumer Secret** (same credentials as production).
4. Click **Save**.

**Test a checkout:**

Add a product to your cart and proceed to the shipping step. USPS rates should appear using TEM data. The amounts may differ slightly from production rates — this is expected.

**Check the logs:**

To see exactly what the plugin sent to USPS and what came back:

1. Set **Debug Mode** to **Yes** and click **Save**.
2. Complete a checkout (or reach the shipping step).
3. Open `administrator/logs/shipping_uspsadvanced.php` in a text editor.

You will see entries marked with `apis-tem.usps.com` in the URL — confirming you are connected to the test environment, not production. Look for `oauth2/v3/token` (the authentication call) followed by `prices/v3/base-rates-list/search` (the domestic rate call) or `international-prices/v3/base-rates-list/search` (the international rate call).

**Switch to production:**

When rates look correct in the sandbox:

1. Set **Use Test Server** to **No**.
2. Click **Save**.

The plugin now connects to `apis.usps.com` and returns live USPS rates.

:::tip

Disable **Debug Mode** before going live. Debug logs grow quickly and can expose API request data. Only enable it while actively troubleshooting.

:::

---

## Packing Modes Explained

Choosing the right packing mode has a significant effect on rate accuracy.

### Per Item

The plugin sends one rate request per unique item in the cart. Every item is treated as its own separate package. This is the simplest mode and works well when your products are all different shapes and do not ship together, or when you do not have consistent box sizes to define.

**Limitation:** If a customer orders 3 of the same item, you get 3 separate rate requests and 3 rates summed together — even if all 3 fit in one box. This can overstate the shipping cost.

### Box Packing (3D Bin Packing)

The plugin uses a 3D bin-packing algorithm (the same algorithm used by the J2Commerce UPS and FedEx plugins) to fit items into the smallest available box from your **Box List**. It compares each item's dimensions against each box's interior dimensions and packs as many items as will fit.

This produces the most accurate rates for orders with multiple items of known dimensions. The box's own weight is added to the total shipment weight. You define your boxes in the **Box List** field (outer dimensions, inner dimensions, empty box weight, and max cargo weight per box).

Use this mode if:
- You stock a consistent set of box sizes
- Your products have accurate dimensions filled in
- Multi-item order accuracy matters to you

### Weight-Based

The plugin groups items by weight, creating packages up to 70 lbs each for domestic shipments and up to 44 lbs each for international shipments. Package dimensions are taken from the product data or the default dimensions. This mode ignores 3D bin-packing entirely.

Use this mode if:
- Your products do not have dimension data
- You want a simple approach focused on weight limits only
- Your products are all roughly similar in density

---

## Troubleshooting

### No rates appear at checkout

**Check these items in order:**

1. Confirm the plugin shows a green checkmark in **J2Commerce** **->** **Setup** **->** **Shipping Methods**.
2. Verify **Consumer Key** and **Consumer Secret** are filled in — missing credentials produce no rates and no visible error.
3. Check that **Origin ZIP Code** is set to a valid 5-digit US ZIP code.
4. If you have a **Geozone Restriction** set, confirm the customer's address falls within that geozone.
5. Enable **Debug Mode**, save, and attempt checkout again. Then open `administrator/logs/shipping_uspsadvanced.php` and look for the error message from USPS.

<!-- SCREENSHOT: administrator/logs/shipping_uspsadvanced.php showing an error response from the USPS API -->

### 401 Unauthorized error in the debug log

**Cause:** The Consumer Key or Consumer Secret is wrong, or your app does not have access to the Prices API.

**Solution:**

1. Log back into [developer.usps.com](https://developer.usps.com) and copy the Consumer Key and Consumer Secret again — paste them fresh into the plugin to rule out copy errors.
2. Confirm that your USPS Developer Portal app includes the **Prices** API (and **International Prices** if you ship internationally).
3. If **Use Test Server** is **No** but your app is not yet approved for production, temporarily switch back to sandbox.

### An item over 70 lbs returns no rates

**Cause:** USPS domestic packages have a 70 lb maximum weight limit. Items exceeding this cannot be shipped via USPS parcel services.

**Solution:**

1. Check the product's weight in J2Commerce. If a single item exceeds 70 lbs, USPS will not return a rate for it.
2. Consider offering a different shipping method (freight) for heavy items, or split the product into smaller shippable units.
3. In Weight-Based mode, the plugin automatically splits heavy orders into multiple packages at the 70 lb limit — but a single item weighing over 70 lbs still exceeds the per-package limit.

### An international country shows no rates

**Cause:** Not all countries are served by every USPS international service. USPS may not offer service to certain destinations.

**Solution:**

1. Check the USPS website for the destination country's service availability.
2. Enable **Debug Mode** and check the API response — if USPS returns an empty rate list for that country, no rates are available for that route.
3. Consider adding a fallback shipping method for international orders where USPS has no service.

### Rates are returned but the order total disappears (abort on multi-box)

**Cause:** **Multiple Box Handling** is set to **Abort**, and the order requires more than one box.

**Solution:**

Open the **Package Handling** section and set **Multiple Box Handling** to **Add the cost of every required box**. This allows multi-box orders to return a summed rate instead of returning nothing.

---

## What Is New in v6.0.0

This release is a full migration to native Joomla 6 MVC architecture. The plugin behavior for customers is the same — USPS rates appear at checkout — but the internals are completely rewritten. Key changes compared to the J2Store version:

- **OAuth 2.0 token caching** — The plugin now caches the USPS access token for 50 minutes using Joomla's built-in cache layer. The J2Store version fetched a new token on every page load, which was slower and unnecessary since USPS tokens last 1 hour.
- **USPS API v3** — Rates now come from the current USPS REST API. The J2Store version used the older XML-based USPS API.
- **Flat-rate prices from the API** — The old plugin included hard-coded flat-rate box prices from 2016. Those local tables are gone. Flat-rate prices now come directly from USPS, so they are always current without requiring plugin updates.
- **Core BoxPacker field** — The box list configuration now uses the same BoxPacker field shared by the FedEx and UPS shipping plugins. The old custom box-list field has been replaced with the standard J2Commerce UI.
- **Core 3D bin-packing algorithm** — The old plugin shipped its own packing library. The new plugin uses the shared `ShipperHelper` algorithm already in J2Commerce core, tested by multiple shipping plugins.
- **HTTP timeout safety** — API calls now enforce a 15-second timeout. The old version had no timeout, meaning a slow USPS server could hang the checkout indefinitely.
- **Structured debug logging** — Log output now goes to `administrator/logs/shipping_uspsadvanced.php` using the Joomla Log API, consistent with all other J2Commerce shipping plugins.
- **Sandbox toggle** — Switching between test and production environments is now a single toggle (**Use Test Server**) rather than a manual URL change.
- **Joomla 6 native MVC** — The plugin no longer depends on the FOF framework, jQuery, or J2Store helper classes.
