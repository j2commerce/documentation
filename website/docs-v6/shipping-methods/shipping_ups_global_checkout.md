---
title: "UPS Global Checkout"
sidebar_label: "UPS Global Checkout"
sidebar_position: 6
description: "Configure the UPS Global Checkout shipping plugin to display guaranteed landed-cost international rates at checkout — shipping, duties, and import taxes rolled into one price."
---

# UPS Global Checkout

The UPS Global Checkout plugin connects your J2Commerce store to the UPS Global Checkout API (also called the Brokerage API), which is designed for cross-border international shipping. Unlike the standard UPS Shipping plugin — which returns freight-only carrier rates — this plugin returns a single **guaranteed landed cost**: one price that covers freight, import duties, destination taxes, brokerage fees, and any other cross-border charges. The buyer sees that total at checkout, and UPS guarantees it. There are no surprise duty bills when the package reaches the border.

This plugin is a separate add-on from the standard UPS Shipping plugin. Both can be active at the same time — the standard plugin handles domestic and non-GLC routes; this plugin handles the cross-border guaranteed-cost routes you configure.

:::info

**Phase 1 (live) vs Phase 2 (coming):** The current release of this plugin covers Phase 1 — real-time landed-cost quotes at checkout. Phase 2 (shipping label creation and tracking from within the J2Commerce order screen) is in development. The **Auto Create Label** setting is visible in the configuration but has no effect until Phase 2 ships.

:::

## What UPS Global Checkout Does

- Returns one rate per configured service covering all cross-border costs (freight + duties + import taxes), guaranteed by UPS
- Optionally displays the rate in the buyer's currency
- Optionally shows a breakdown line under the rate
- Restricts rate display to a configured geozone, so only international buyers see the GLC rate
- Persists a UPS `quoteId` on the cart so the same quote is redeemed at order time

## Prerequisites

- J2Commerce 6 installed and active on your Joomla 6 site
- At least one shipping zone set up in **J2Commerce** -> **Setup** -> **Shipping Methods**
- Products must have weight values set (dimensions are optional but improve accuracy)
- An active UPS shipper account (the same account number used with other UPS plugins)
- Completed UPS Global Checkout merchant enrollment (this generates your `registration_id` — see Getting Your UPS Global Checkout Credentials below)
- A UPS Developer Portal app with the **Global Checkout** API product enabled

## Requirements

- PHP 8.3.0 or later
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) -> **Extensions** -> **Shipping Plugins**.

**Step 2:** Locate **UPS Global Checkout** -> click **View Details** -> **Add to Cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right and search for the plugin. Click **Available Versions** -> **View Files** -> **Download Now**.

## Install the Plugin

In the Joomla admin, go to **System** -> **Install** -> **Extensions**.

Upload the `shipping_ups_global_checkout.zip` package file.

<!-- SCREENSHOT: System > Install > Extensions screen with the zip file selected in the Upload Package File tab -->

The plugin installs and is left disabled by default until you enter your credentials.

## Enable the Plugin

There are two ways to reach the shipping methods list.

**Option A:** Click the **J2Commerce** icon at the top right -> **Setup** -> **Shipping Methods**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Dashboard** -> **Setup** -> **Shipping Methods**

<!-- SCREENSHOT: J2Commerce > Setup > Shipping Methods screen showing UPS Global Checkout row with disabled status indicator -->

Look for **UPS Global Checkout**, click the red **X**, and it will turn into a green checkmark. The plugin is now enabled and ready for configuration.

<!-- SCREENSHOT: Shipping Methods list with UPS Global Checkout enabled (green checkmark) -->

:::info

Before you can start accepting rates, you need API credentials from UPS and a completed GLC merchant enrollment. Read the next section before entering any settings.

:::

## Getting Your UPS Global Checkout Credentials

UPS Global Checkout requires two separate account relationships: a UPS Developer Portal app (which provides OAuth credentials) and a GLC merchant enrollment (which provides the `registration_id`). These are both needed for the plugin to return rates.

### Step 1: Confirm Your UPS Shipper Account

You need an active UPS shipper account — the same account number that appears on your UPS invoices. If you already use the standard UPS Shipping plugin, you can reuse the same account number here.

If you do not yet have a UPS account, go to [ups.com](https://www.ups.com) and create a business account. Your **account number** is a six-character alphanumeric code visible in your UPS.com profile under **My Accounts**.

### Step 2: Create a UPS Developer Portal App and Enable Global Checkout

1. Go to [developer.ups.com](https://developer.ups.com) and log in (or create an account using your UPS credentials).
2. On the **My Apps** page, click **Add Apps** (or **Create App**).
3. Enter an app name, for example `J2Commerce GLC`.
4. Under the API products list, select the **Global Checkout** API product. Add any other UPS API products you need (Rating, Shipping, etc.) in the same app.
5. Accept the UPS Developer Kit agreement and save.
6. After saving, copy the **Client ID** and **Client Secret** from the app credentials panel.

<!-- SCREENSHOT: UPS Developer Portal My Apps page showing Add Apps button and the API product selection step -->

:::info

**Keep your Client Secret secure.** Treat it like a password. Do not commit it to version control or share it publicly.

:::

If you use different credentials for the sandbox (testing) environment, you will also find a **sandbox Client ID** and **sandbox Client Secret** in the same app panel under the CIE (Customer Integration Environment) tab.

### Step 3: Complete UPS Global Checkout Merchant Enrollment

The UPS Global Checkout service requires a separate merchant enrollment beyond the standard Developer Portal app. This enrollment grants your account access to the Brokerage/GLC API and issues a **Registration ID** (a UUID) that identifies your merchant contract with UPS.

:::warning

**[REQUIRES MERCHANT-PORTAL CONFIRMATION]** The exact steps for GLC merchant enrollment are documented at `docs.globalcheckout.ups.com`, which is gated behind a UPS merchant-portal login. Contact your UPS account representative or visit the UPS Global Checkout merchant portal to complete enrollment and receive your `registration_id`. The enrollment may include:

- Agreeing to the UPS Global Checkout Merchant Agreement
- Providing business and tax registration details
- Pre-approving the product SKUs you plan to ship internationally (UPS performs automated HS code classification on these)

:::

Once enrollment is complete, UPS provides:

- Your **Registration ID** — a UUID sent as the `registration-id` header on every quote request
- Optionally, a **Merchant ID header** value (`x-merchant-id`) for routing [verify with UPS Global Checkout onboarding rep]

### Step 4: Sandbox vs Production

UPS provides a Customer Integration Environment (CIE) for testing that runs against non-billable sandbox accounts.

| Environment | Base URL | When to Use |
|-------------|----------|-------------|
| Sandbox | `https://wwwcie.ups.com` | Testing and development |
| Production | `https://onlinetools.ups.com` | Live store orders |

Sandbox credentials are separate from production credentials. Start with sandbox, verify rates appear correctly, then switch to production.

## Configure the Plugin

Go to **J2Commerce** -> **Setup** -> **Shipping Methods** and click the **UPS Global Checkout** title to open the configuration screen.

:::tip

Click the **Toggle Inline Help** button at the top of the plugin configuration screen to reveal a description beneath every field.

:::

<!-- SCREENSHOT: UPS Global Checkout plugin configuration screen with Toggle Inline Help button highlighted -->

### API / Credentials

<!-- SCREENSHOT: API Credentials section of the plugin configuration -->

**Environment:** Set to **Sandbox** while testing. Switch to **Production** only after you have verified rates appear correctly using your sandbox credentials. The field controls which API base URL and which set of credentials the plugin uses.

**Production Client ID:** Your OAuth Client ID from the UPS Developer Portal (visible when **Environment** is set to **Production**).

**Production Client Secret:** Your OAuth Client Secret from the UPS Developer Portal (visible when **Environment** is set to **Production**).

**Sandbox Client ID:** Your sandbox OAuth Client ID (visible when **Environment** is set to **Sandbox**).

**Sandbox Client Secret:** Your sandbox OAuth Client Secret (visible when **Environment** is set to **Sandbox**).

**Account Number:** Your six-character UPS shipper account number. Required for accurate rate negotiation.

**Registration ID:** The UUID issued during your UPS Global Checkout merchant enrollment. This is sent as the `registration-id` header on every quote request. Leave blank only if UPS has not yet issued one — the API will fall back to your OAuth token UUID.

**Transaction Source:** An identifier sent with every API call so UPS can attribute traffic to this integration. Default is `J2Commerce`. You can leave this as-is.

**Merchant ID Header:** An optional routing header (`x-merchant-id`) provided by UPS during enrollment. [verify with UPS Global Checkout onboarding rep]

### Quote Settings

**Shipper Currency Code:** The ISO 4217 three-letter currency code your store operates in (for example, `USD`, `GBP`, `EUR`). Default is `USD`. This must match your UPS account billing currency.

**Display Rate in Buyer's Currency:** When set to **Yes**, the plugin asks UPS to return a second total in your customer's active display currency and uses that amount in the checkout rate row. This keeps the UPS-guaranteed price aligned with what the customer sees in their currency. When set to **No**, the rate is shown in your shipper currency.

**Shipment Type:** The commercial nature of the goods being shipped. Use **Commercial** (`COMM`) for regular store merchandise. Other options:

| Value | Meaning |
|-------|---------|
| COMM | Commercial goods (store merchandise) |
| GIFT | Personal gift shipments |
| PERS | Personal effects |
| OTHR | Other |

**Transport Cost Mode:** Controls whether the plugin lets UPS calculate the freight component internally or pushes a freight cost derived from another rate.

- **Let UPS Compute** — UPS calculates all cost components. Use this for most stores.
- **Push Our Freight** — Sends a transport cost value to UPS for use in the landed-cost calculation. [verify with UPS Global Checkout onboarding rep — use case confirmation needed]

**Default Service Code:** Optional. Pre-selects a UPS service for the quote request. If set, UPS returns a rate for that specific service. Leave blank to let UPS determine the best available service. You can also restrict which services appear using the **Allowed Services** field.

### Allowed Services

Select which UPS services to show at checkout. Only services that UPS confirms as eligible for the shipment will appear, regardless of what you select here.

| Service Code | Service Name | Typical Use |
|--------------|--------------|-------------|
| 07 | UPS Worldwide Express | International express delivery |
| 08 | UPS Worldwide Expedited | International economy express |
| 11 | UPS Standard | Standard cross-border (US, CA, MX) |
| 54 | UPS Worldwide Express Plus | International, early morning |
| 65 | UPS Worldwide Saver | International, end-of-day express |
| 72 | UPS Worldwide Economy DDP | International economy, duties paid |
| 96 | UPS Worldwide Express Freight | International freight, palletized |

Leave the field empty to allow all eligible services.

### Packing

**Packing Mode:**

- **Per Item** — Sends one package to UPS for each item in the cart. Simpler but may overestimate shipping for multi-item orders.
- **Box Packing** — Uses a 3D bin-packing algorithm to fit items into your configured boxes before requesting rates. Produces more accurate rates for multi-item orders.

**Use Preset UPS Boxes** (visible when Packing Mode is **Box Packing**): When set to **Yes**, the plugin adds standard UPS Express Box sizes (Small, Medium, Large) to the available box pool alongside any custom boxes you define. Default is **Yes**.

**Box Rotation** (visible when Packing Mode is **Box Packing**): Controls whether the packer can rotate items to fit.

| Option | Behaviour |
|--------|-----------|
| Best Fit | Tries all rotations and picks the most efficient fit |
| Keep Flat | Items are never rotated upright |
| Never | No rotation at all |

**Box List** (visible when Packing Mode is **Box Packing**): Define your custom box sizes — the boxes you actually use for shipping. Each box needs outer dimensions, inner dimensions, box weight, and max payload weight.

### Units

**Weight Unit:** The unit your product weights are stored in. Choose the unit that matches what you enter on your products (`lb` or `kg`).

**Dimension Unit:** The unit your product dimensions are stored in (`in` or `cm`).

**Include Dimensions:** When **Yes**, package length, width, and height are sent with the quote request. This improves accuracy for volumetrically charged freight. Set to **No** only if none of your products have dimensions configured.

**Default Weight:** Fallback weight per item when a product has no weight set. Set this to a reasonable average for your typical product. Default is `1`.

**Default Length / Width / Height:** Fallback dimensions when a product has no dimensions set. Default is `10` for each.

### Origin

These fields tell UPS where your shipments originate from.

**Origin Postal Code:** ZIP or postal code of your warehouse or dispatch location. Required.

**Origin Country:** Country where your shipments originate.

**Origin State/Province:** State or province of your shipping location. Populated automatically when you select a country.

**Origin City:** City name of your shipping location. Optional but improves accuracy.

### Rate Display

**Residential Address:** Set to **Yes** if UPS delivers to residential addresses in your market. UPS applies a residential surcharge when this is enabled. Set to **No** for commercial-only destinations.

**Handling Fee:** A fixed amount or percentage added on top of every UPS Global Checkout rate. Use this to cover packaging materials or processing costs. Set to `0` for no handling fee.

**Handling Fee Type:** Whether the handling fee is a flat amount or a percentage of the quoted rate.

**Tax Profile:** If your jurisdiction requires you to charge tax on the shipping/handling component separately, select a tax profile here. 

:::warning

**Double-taxation warning.** UPS Global Checkout already includes destination duties, import taxes, and fees in the quoted price. Setting a tax profile here applies additional tax on top of UPS's calculation. This will double-tax your customers. Leave this set to **None** unless you specifically need a separate compliance surcharge that is not an import tax.

:::

**Geozone Restriction:** Restrict this shipping method to customers in a specific geographic zone. This is the recommended way to ensure GLC rates only appear for international destinations — create a geozone covering your target international markets and select it here. Leave as **None** to make it available to all customers (not recommended; domestic customers will see GLC rates).

**Show Delivery Time:** When set to **Yes**, estimated transit days appear next to the rate at checkout if the API returns them.

**Show Landed Cost Breakdown:** When set to **Yes**, a breakdown line appears under the rate showing the split between freight, duties, and taxes.

:::info

**[REQUIRES MERCHANT-PORTAL CONFIRMATION]** The UPS Global Checkout API returns a rolled-up `gcTotal` response, not an itemised breakdown. Whether a breakdown is available depends on the UPS API response for your specific merchant enrollment tier. If the breakdown data is not returned by the API, enabling this toggle has no visible effect.

:::

### Labels (Phase 2 — Not Yet Functional)

**Auto Create Label:** When enabled in a future release, this will automatically generate a UPS shipping label when an order reaches a configured trigger status. This setting is visible now for pre-configuration but **has no effect in the current release**. Label creation requires the Phase 2 feature, which is in development.

### Debug

**Debug Mode:** When enabled, all API requests and responses are written to `administrator/logs/shipping_ups_global_checkout.php`. Enable this temporarily when troubleshooting. Disable in production — log files grow quickly and may contain sensitive request data.

## How It Works at Checkout

When a customer reaches the shipping step at checkout:

1. The customer enters their destination address.
2. The plugin reads the address, checks the geozone restriction (if configured), then calls the UPS Global Checkout API.
3. UPS returns a guaranteed landed-cost total that includes freight, duties, import taxes, brokerage, and any other cross-border fees.
4. The rate appears at checkout labelled with the UPS service name, for example: "UPS Global Checkout — Worldwide Expedited".
5. If **Display Rate in Buyer's Currency** is enabled, the rate is shown in the customer's active display currency and guaranteed by UPS in that currency.
6. If **Show Landed Cost Breakdown** is enabled and UPS returns breakdown data, a secondary line appears showing the component split.
7. The UPS-issued `quoteId` (and its expiry date) is stored on the cart line. This quote is redeemed when the order is placed.

<!-- SCREENSHOT: Checkout shipping step showing a UPS Global Checkout rate with the landed-cost label and service name -->

## Phase Roadmap

The plugin is delivered in phases to keep each release shippable.

| Phase | Scope | Status |
|-------|-------|--------|
| **Phase 1** | Real-time landed-cost quotes at checkout, buyer-currency display, geozone gating, handling fee, box packing, debug logging | **Live — current release** |
| **Phase 2** | Shipping label creation and tracking from the J2Commerce order screen (`Auto Create Label` becomes functional) | In development |
| **Phase 3** | Product SKU pre-approval sync with UPS, reconciliation reporting, webhook handling for landed-cost actuals | Planned |

## Troubleshooting

### No rates appear at checkout

**Cause:** Several conditions must all be true for a rate to appear.

**Solution:** Work through this checklist:

1. Enable **Debug Mode** and place a test order. Open `administrator/logs/shipping_ups_global_checkout.php` and look for error messages.
2. Confirm **Environment** matches the credentials you entered. Sandbox credentials do not work against the production endpoint and vice versa.
3. Verify your **Client ID** and **Client Secret** are correct — copy and paste them directly from the UPS Developer Portal rather than typing them.
4. Check that your **Registration ID** is filled in if UPS issued one during enrollment.
5. Confirm your **Origin Postal Code** and **Origin Country** are both filled in.
6. Verify the products in the test cart have a weight set. UPS will not return rates for zero-weight packages.
7. If you configured a **Geozone Restriction**, confirm the customer's delivery address falls within that zone. Addresses outside the zone produce no rate — by design.
8. Check that the destination country is eligible for UPS Global Checkout service. GLC is not available for all origin-destination country pairs. [verify with UPS Global Checkout onboarding rep for current coverage list]

### UPS returns an authentication error (401)

**Cause:** The Client ID or Client Secret is wrong, the token has expired, or the app on the UPS Developer Portal does not have the Global Checkout API product enabled.

**Solution:**

1. Log in to [developer.ups.com](https://developer.ups.com) and open your app.
2. Confirm the app includes the **Global Checkout** API product. If not, edit the app and add it.
3. Re-copy the Client ID and Client Secret — regenerating the secret invalidates the old one.
4. Paste the fresh credentials into the plugin and save.

### Rates appear for domestic customers (not just international)

**Cause:** No **Geozone Restriction** is configured, so the plugin queries UPS for every destination.

**Solution:**

1. Go to **J2Commerce** -> **Shipping** -> **Geo Zones** and create a geozone covering your target international markets.
2. Return to the UPS Global Checkout plugin settings and select that geozone in the **Geozone Restriction** field.
3. Save the plugin. Domestic customers will no longer see GLC rates.

### Box packing produces unexpected package counts

**Cause:** Some items may be larger than all configured boxes and fall back to per-item packing.

**Solution:**

1. Enable **Debug Mode** — the log file reports when items cannot be packed and what fallback method was used.
2. Add larger custom box sizes in the **Box List** field to accommodate oversized items.
3. Disable **Use Preset UPS Boxes** if the preset sizes do not match your packaging.

### The landed cost seems too high or incorrect

**Cause:** The `shipper_currency_code` does not match your UPS account billing currency, or the shipment type is set incorrectly.

**Solution:**

1. Confirm **Shipper Currency Code** is the ISO 4217 code for your UPS account billing currency (for example, `USD` for US dollar-billed accounts).
2. Confirm **Shipment Type** matches the nature of your goods — `COMM` for standard merchandise.
3. Check whether a **Tax Profile** is applied. If so, this adds tax on top of the UPS landed cost. Set it to **None** unless you specifically need a separate compliance surcharge.

### The Auto Create Label toggle is visible but has no effect

**Cause:** Label creation is a Phase 2 feature that is not yet implemented. The toggle is present for pre-configuration.

**Solution:** This is expected behaviour in the current release. Watch for the Phase 2 release announcement on the [J2Commerce website](https://www.j2commerce.com).

## FAQ

**Does this replace the standard UPS Shipping plugin?**

No. The two plugins serve different purposes and can run side by side. The standard UPS Shipping plugin returns freight-only rates using the UPS Rating API and supports domestic routes. This plugin returns guaranteed landed-cost quotes using the UPS Global Checkout (Brokerage) API and is designed for international cross-border shipments. Use both together with a geozone restriction on each to route domestic buyers to the standard plugin and international buyers to the GLC plugin.

**Do import duties show as a separate line item?**

Only if **Show Landed Cost Breakdown** is enabled and the UPS API returns breakdown data for your merchant enrollment tier. In most cases, UPS returns a single rolled-up total — one number covering all costs. The breakdown option attempts to surface any component data UPS provides. [REQUIRES MERCHANT-PORTAL CONFIRMATION]

**In which currency is the rate shown?**

By default, the rate is shown in your shipper currency (the currency you set in **Shipper Currency Code**). If you enable **Display Rate in Buyer's Currency**, the plugin asks UPS to return a buyer-currency total and uses that for the checkout rate row. This keeps the UPS-guaranteed price aligned with what the customer sees.

**What happens if the UPS quote expires before the customer checks out?**

The plugin stores the `quoteId` on the cart line along with its expiry date. [REQUIRES MERCHANT-PORTAL CONFIRMATION — behaviour when quote expires at order submission time is subject to Phase 2 implementation details]

**Are all countries eligible for UPS Global Checkout?**

UPS Global Checkout supports a range of international origin-destination country pairs, but not all combinations are covered. Eligibility depends on your UPS account, the destination country, and the type of goods. If UPS returns no rate for a destination, no GLC option appears at checkout for that customer. [verify with UPS Global Checkout onboarding rep for current coverage list]

**Does UPS Global Checkout support EU IOSS and OSS?**

UPS Global Checkout handles EU cross-border tax compliance, including IOSS and OSS, as part of its guaranteed landed-cost calculation. [REQUIRES MERCHANT-PORTAL CONFIRMATION — confirm with your UPS GLC account representative for your specific merchant enrollment]
