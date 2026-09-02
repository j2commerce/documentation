---
title: "USPS Advanced Shipping"
sidebar_label: "USPS Advanced"
sidebar_position: 70
description: "Quote live USPS rates at checkout with package-level control, service filtering, and dimensional handling beyond the basic USPS integration."
---

# USPS Advanced Shipping

The USPS Advanced Shipping plugin connects your J2Commerce store to the official USPS API v3 and fetches live shipping rates at checkout. Customers see real-time prices for USPS Ground Advantage, Priority Mail, Priority Mail Express, Media Mail, USPS Connect, flat-rate boxes and envelopes, and international services -- pulled directly from USPS, not a hard-coded price table.

This plugin calculates shipping rates only. It does not purchase labels, generate tracking numbers, or process webhooks.

## Requirements

- with PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- A USPS Developer Portal account (free) with a Consumer Key and Consumer Secret

## What You Can Do with USPS Advanced Shipping

- **Real-time domestic and international rates** at checkout, straight from USPS
- **Flat-rate envelopes and boxes** for Priority Mail and Priority Mail Express
- **3D bin-packing** so multi-item orders are quoted for the smallest box that actually fits
- **Weight-based packing** for stores without box dimensions on file
- **Estimated delivery days** shown next to each domestic rate
- **Handling fees, tax profiles, and geozone restrictions** layered on top of the raw USPS price

## Prerequisites

- J2Commerce 6 installed and enabled on your Joomla 6 site
- A USPS Developer Portal account at [developer.usps.com](https://developer.usps.com)
- A US-based ship-from ZIP code (USPS rates originate from the US, Puerto Rico, the US Virgin Islands, or other US territories)
- At least one product marked as shipping enabled

## Get Your USPS API Credentials

Before configuring the plugin, you need a Consumer Key and Consumer Secret from the USPS Developer Portal. This is a free, self-service process.

**Step 1:** Go to [developer.usps.com](https://developer.usps.com) and click **Sign Up**. Fill in your name, email, and organization, then verify your email.

**Step 2:** Log in, go to **My Apps**, and click **Create New App**.

**Step 3:** Give the app a name (for example, "My Store Shipping"). In the **APIs** section, request access to:

- **Prices** -- required for domestic rates
- **International Prices** -- required for international rates

**Step 4:** Submit the app. USPS approves most apps instantly. Once approved, open the app and copy the **Consumer Key** and **Consumer Secret**.

<!-- SCREENSHOT: USPS Developer Portal "My Apps" screen showing an app with Consumer Key and Consumer Secret highlighted -->

:::info

**NOTE**: USPS also runs a Test Environment (TEM) at `apis-tem.usps.com`. Your same Consumer Key and Consumer Secret work in both the test and production environments -- no separate test credentials are needed.

:::

## Purchase and Download the Plugin

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) **-> Extensions**.

**Step 2:** Locate **USPS Advanced Shipping** **-> click View Details -> Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the plugin. Click **Available Versions -> View Files -> Download Now**.

## Install the Plugin

Go to **System -> Install -> Extensions**.

Upload the `shipping_uspsadvanced.zip` package file.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen with shipping_uspsadvanced.zip selected -->

## Enable the Plugin

There are **two** ways you can access the plugin.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Shipping Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Shipping Methods**

<!-- SCREENSHOT: Shipping Methods list showing USPS Advanced Shipping with a red X (disabled) -->

Look for **USPS Advanced Shipping**, click the **X**, and it will turn into a green checkmark. It is now enabled and ready for setup.

<!-- SCREENSHOT: USPS Advanced Shipping row showing a green checkmark (enabled) -->

## Configure the Plugin

Click the **USPS Advanced Shipping** title next to the green checkmark to open the configuration screen.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the plugin will show a description below each field as you configure it.

:::

### Checkout Image

**Checkout Image** -- an optional image displayed next to each USPS rate at checkout.

### USPS API Credentials

<!-- SCREENSHOT: API Credentials section with Use Test Server, Consumer Key, and Consumer Secret fields -->

| Field | Required | Description |
|---|---|---|
| **Use Test Server** | No | Connect to the USPS TEM server at `apis-tem.usps.com` instead of production. Use during integration testing. Default: **No**. |
| **Consumer Key** | Yes | OAuth 2.0 Consumer Key from your USPS Developer Portal account. |
| **Consumer Secret** | Yes | OAuth 2.0 Consumer Secret from your USPS Developer Portal account. |

The plugin exchanges these credentials for a USPS access token automatically and caches it for 50 minutes, so it does not request a new token on every rate quote.

### Origin Address

Where your shipments originate.

| Field | Required | Description |
|---|---|---|
| **Origin ZIP Code** | Yes | The 5-digit ZIP code of your warehouse or shipping location. USPS uses this as the starting point for every rate calculation. |

### USPS Services

Which mail classes to offer at checkout.

<!-- SCREENSHOT: USPS Services section showing Enable Standard Services, Price Type, Domestic Services, and International Services -->

**Enable Standard Services** -- request the standard USPS rate list (Ground Advantage, Priority, Parcel Select, etc.). Disable to use only flat-rate services. Default: **Yes**.

**Price Type**

| Option | Meaning |
|---|---|
| Commercial Rates | Discounted rates available to USPS commercial customers. |
| Retail Rates (default) | The standard counter rates -- what a customer would pay at the Post Office. |

**Domestic Services** -- which USPS domestic mail classes to offer at checkout. Select **All Services** to show every available rate.

| Mail Class |
|---|
| All Services |
| USPS Ground Advantage |
| Priority Mail |
| Priority Mail Express |
| Parcel Select |
| Media Mail |
| Library Mail |
| Bound Printed Matter |
| USPS Connect Local |
| USPS Connect Mail |
| USPS Connect Regional |

**International Services** -- which USPS international services to offer for shipments going outside the US.

| Service |
|---|
| Priority Mail Express International |
| Priority Mail International |
| Global Express Guaranteed (GXG) |
| GXG Document |
| GXG Non-Document Rectangular |
| GXG Non-Document Non-Rectangular |
| Priority Mail Express International Flat Rate Envelope |
| Priority Mail International Medium Flat Rate Box |
| Priority Mail Express International Flat Rate Envelope |
| Priority Mail International Large Flat Rate Box |
| USPS GXG Envelopes |
| First-Class Mail International Letter |
| First-Class Mail International Large Envelope |
| First-Class Package International Service |

:::info

**NOTE**: If **International Services** is left empty, the plugin will never return an international rate, even if a customer's address is outside the US.

:::

**Machinable Shipments**

| Option | Meaning |
|---|---|
| Yes (default) | Your packages have standard dimensions and can go through USPS sorting machinery. Most parcels qualify. |
| No | Your packages are non-standard and must be processed manually (FLATS category). Rates are typically higher, and machinable-only rates are excluded from the quote. |

### Package Handling

How items are packed into boxes for rate calculation.

<!-- SCREENSHOT: Package Handling section showing the Packing Mode dropdown -->

**Packing Mode**

| Mode | How It Works |
|---|---|
| Per Item (default) | Each item in the cart becomes its own package. One rate request is sent per item. |
| Box Packing (3D bin packing) | Items are fitted into the smallest box from your **Custom Box Sizes** list using a 3D bin-packing algorithm -- the most accurate option for multi-item orders. |
| Weight-Based | Items are combined into packages up to 70 lb (domestic) or 44 lb (international), ignoring box dimensions. |

**Custom Box Sizes** _(shown when Box Packing is selected)_ -- define the box sizes available for packing. Items are packed into the smallest box that fits. If Box Packing is selected but no boxes are defined, the plugin automatically falls back to Per Item packing.

**Unpacked Item Handling** _(Box Packing only)_ -- what to do when an item cannot fit any configured box.

| Option | Result |
|---|---|
| Quote each unpacked item individually (default) | That item is quoted as its own package. |
| Ignore | The oversized item is left out of the rate request. |
| Abort | No rates are returned at all. |

**Multiple Box Handling** _(Box Packing only)_ -- what to do when an order requires more than one box.

| Option | Result |
|---|---|
| Add the cost of every required box (default) | Returns a total rate that sums the cost of every box required. |
| Abort | No rates are returned if more than one box is needed. |

### Units & Defaults

Weight, dimension units, and fallback values for products missing dimensions.

<!-- SCREENSHOT: Units & Defaults section -->

| Field | Recommended | Description |
|---|---|---|
| **Weight Unit** | lb | USPS rates use pounds. Ounces (oz) are also accepted; kilograms are not. |
| **Dimension Unit** | in | USPS requires dimensions in inches. |
| **Default Weight** | 1 lb | Fallback weight when a product has no weight set. |
| **Default Length** | 12 in | Fallback length when a product has no length set. |
| **Default Width** | 8 in | Fallback width when a product has no width set. |
| **Default Height** | 6 in | Fallback height when a product has no height set. |

### Flat Rate Shipping

USPS flat-rate envelopes and boxes.

<!-- SCREENSHOT: Flat Rate Shipping section showing the Flat Rate Mode dropdown -->

**Flat Rate Mode**

| Option | What Appears at Checkout |
|---|---|
| Disable flat-rate services (default) | No flat-rate options -- standard weight-and-distance rates only. |
| Enable all Priority & Express flat-rate services | Flat-rate envelopes and boxes for both Priority Mail and Priority Mail Express. |
| Priority Mail flat-rate only | Flat-rate options for Priority Mail only. |
| Priority Mail Express flat-rate only | Flat-rate options for Priority Mail Express only. |

Flat-rate prices come directly from the USPS API, so they stay current without any plugin update. Every flat-rate container is capped at 70 lb regardless of its size -- an order that doesn't fit in one container simply won't be offered a flat-rate price for it.

:::info

**NOTE**: Flat-rate boxes are usually most cost-effective for dense, heavy items. For light items, standard rates are often cheaper. Many stores enable both and let USPS pricing sort it out.

:::

### Rate Options

Handling fees, taxes, and geozone restrictions.

<!-- SCREENSHOT: Rate Options section showing Handling Cost, Tax Profile, and Geozone fields -->

**Handling Cost** -- an amount added to every USPS rate returned at checkout. Set to `0` for no handling cost.

**Handling Cost Type**

| Option | How It Works |
|---|---|
| Flat Amount | A fixed dollar amount (for example, `2.50` adds $2.50 to every rate). |
| Percentage | A percentage of the USPS rate (for example, `10` adds 10% to every rate). |

**Tax Profile** -- select a J2Commerce tax profile to apply tax to shipping costs. Leave as **None** if your jurisdiction does not tax shipping.

**Geozone Restriction** -- restrict this shipping method to customers in a specific geozone. Leave as **None** to make it available to all customers.

**Show Delivery Days** -- display estimated business days in transit next to each domestic shipping option at checkout (for example, "2 Business Days"). Default: **Yes**. International rates do not display an estimate.

**Debug Mode** -- when set to **Yes**, every USPS API request and response is written to `administrator/logs/shipping_uspsadvanced.php`. Disable in production once rates are confirmed working.

## Testing with the USPS Sandbox

The USPS Test Environment Mailing (TEM) server lets you confirm rates are returned correctly before going live.

**Enable sandbox mode:**

1. Open the plugin configuration.
2. Set **Use Test Server** to **Yes**.
3. Fill in your **Consumer Key** and **Consumer Secret** (the same credentials work in both environments).
4. Click **Save**.

**Test a checkout:** Add a product to your cart and proceed to the shipping step. USPS rates should appear using TEM data. Prices may differ slightly from production -- this is expected.

**Check the logs:** Set **Debug Mode** to **Yes**, save, and complete a checkout (or reach the shipping step). Open `administrator/logs/shipping_uspsadvanced.php` in a text editor and look for calls to `apis-tem.usps.com` -- this confirms you're connected to the test environment, not production.

**Switch to production:** Once rates look correct, set **Use Test Server** to **No** and click **Save**. The plugin now connects to `apis.usps.com` and returns live rates.

:::tip

Turn **Debug Mode** off before going live. Debug logs record full API request and response bodies and grow quickly -- only enable it while actively troubleshooting.

:::

## Troubleshooting

### No rates appear at checkout

**Cause:** Missing credentials, missing origin ZIP code, or a geozone restriction excluding the customer.

**Solution:**

1. Confirm the plugin shows a green checkmark under **J2Commerce -> Setup -> Shipping Methods**.
2. Verify **Consumer Key** and **Consumer Secret** are both filled in -- missing credentials produce no rates and no visible error to the shopper.
3. Check that **Origin ZIP Code** is a valid 5-digit US ZIP code.
4. If **Geozone Restriction** is set, confirm the customer's address falls inside that geozone.
5. Set **Debug Mode** to **Yes**, save, and try the checkout again. Genuine errors are always written to the log even without Debug Mode -- open `administrator/logs/shipping_uspsadvanced.php` and look for the most recent entry.

<!-- SCREENSHOT: administrator/logs/shipping_uspsadvanced.php showing an error response from the USPS API -->

### 401 Unauthorized (or a failed token request) in the debug log

**Cause:** The Consumer Key or Consumer Secret is wrong, or the app doesn't have access to the Prices API.

**Solution:**

1. Log back into [developer.usps.com](https://developer.usps.com) and copy the Consumer Key and Consumer Secret again -- paste them fresh into the plugin to rule out a copy error.
2. Confirm the USPS Developer Portal app includes the **Prices** API (and **International Prices** if you ship internationally).
3. If **Use Test Server** is **No** but the app isn't yet approved for production, switch back to **Yes** temporarily.

### No rates appear for international orders

**Cause:** No option is selected in **International Services**, or USPS does not serve that destination country.

**Solution:**

1. Open **USPS Services** and confirm at least one option is selected under **International Services** -- with none selected, the plugin never returns an international rate.
2. Enable **Debug Mode** and check the log -- if it reports USPS doesn't ship to that country, no international method is available for that destination.
3. Consider adding a fallback shipping method for destinations USPS doesn't serve.

### An item over 70 lb (or 44 lb internationally) returns no rate

**Cause:** USPS domestic packages are capped at 70 lb, and Weight-Based international packages are capped at 44 lb per package.

**Solution:**

1. Check the product's weight in J2Commerce -- a single item over these limits can't be priced by USPS.
2. In **Weight-Based** packing mode, the plugin automatically splits a heavy order into multiple packages at the limit, but one item that individually exceeds the limit will still fail.
3. Offer a different shipping method (freight) for oversized or overweight items.

### Multi-box orders return no rate

**Cause:** **Multiple Box Handling** is set to **Abort**, and the order needs more than one box.

**Solution:** Open **Package Handling** and set **Multiple Box Handling** to **Add the cost of every required box**.

### Fewer rates than expected appear at checkout

**Cause:** **Machinable Shipments** is set to **Yes**, which filters out non-machinable (FLATS) rates for the selected mail classes.

**Solution:** If your packages genuinely can't be machine-sorted, set **Machinable Shipments** to **No**. Otherwise leave it at **Yes** -- most stores get lower rates this way.
