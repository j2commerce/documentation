---
title: "Unishippers LTL Freight"
sidebar_label: "Unishippers LTL Freight"
sidebar_position: 50
description: "Real-time LTL freight rates from 60+ carriers at checkout via the Unishippers SpeedShip API. Set up API credentials, pick your carriers, and configure freight class per product."
---

# Unishippers LTL Freight

The Unishippers LTL Freight plugin connects your J2Commerce store to the Unishippers SpeedShip platform and fetches real-time Less-Than-Truckload (LTL) freight rates at checkout. LTL shipping is how oversized, heavy, or palletized products travel on shared trucks — used for furniture, appliances, building materials, gym equipment, and anything too large for a standard parcel carrier. Rather than guessing a flat rate, this plugin calls 60+ contracted LTL carriers through your Unishippers account and shows your customers the actual rate — before they place the order.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) **->** **Extensions**.

**Step 2:** Locate the **Unishippers LTL Freight** plugin **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile at the top-right corner, search for the plugin, then click **Available Versions** **->** **View Files** **->** **Download Now**.

## Install the Plugin

In the Joomla administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `shipping_unishippers.zip` package file.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen with shipping_unishippers.zip selected -->

## Enable the Plugin

Once installed, you need to enable the plugin before it appears at checkout. There are two ways to reach it.

**Option A:** Go to the **J2Commerce** icon at the top-right corner **->** **Setup** **->** **Shipping Methods**.

**Option B:** Go to **Components** on the left sidebar **->** **J2Commerce** **->** **Setup** **->** **Shipping Methods**.

<!-- SCREENSHOT: Shipping Methods list showing Unishippers LTL Freight with an X (disabled) -->

Look for **Unishippers LTL Freight**, click the **X**, and it will turn into a green checkmark. It is now enabled and ready for setup.

<!-- SCREENSHOT: Unishippers LTL Freight row showing a green checkmark (enabled) -->

## Configure the Plugin

Click the **Unishippers LTL Freight** title next to the green checkmark to open the configuration screen.

:::tip

Click the **Toggle Inline Help** button near the top of any plugin configuration page to show a description below each field. This is especially useful for fields that are only relevant in specific scenarios.

:::

<!-- SCREENSHOT: Plugin configuration screen with Toggle Inline Help button highlighted -->

---

## Step A: Add Your Unishippers API Credentials

The plugin connects to Unishippers through their SpeedShip developer API using OAuth 2.0. OAuth is an authentication standard — you give the plugin a Client ID and Client Secret (like a username and password), and it exchanges those for a short-lived access token automatically. You never need to manage tokens manually.

### Getting Your Credentials from Unishippers

Before configuring the plugin, you need API credentials from Unishippers.

1. Log in to your Unishippers account at [www.unishippers.com](https://www.unishippers.com).
2. Ask your Unishippers representative for access to the **SpeedShip developer portal** and request sandbox API credentials. Unishippers provides a Client ID and Client Secret for both the sandbox (test) and production (live) environments.
3. Keep both credential sets on hand — you will paste them into the plugin below.

:::info

The SpeedShip developer portal is not self-service for all accounts. Your Unishippers account representative can set up API access and provide your sandbox credentials, usually within a business day.

:::

### Authentication Fieldset

Go to the **Authentication** tab in the plugin configuration.

<!-- SCREENSHOT: Authentication fieldset showing Environment dropdown set to Sandbox -->

**Environment**

Choose **Sandbox** while you are setting up and testing. Switch to **Production** only after you have confirmed that rates appear correctly at checkout. The sandbox environment lets you test the full quote flow without incurring any real charges.

:::tip

Always start in Sandbox mode. This protects you from accidentally presenting bad rates to real customers while you are still configuring freight classes and accessorials.

:::

**Sandbox settings** (filled in by default — leave as-is unless Unishippers tells you otherwise):

| Field | Default Value | What It Is |
|-------|---------------|------------|
| **Sandbox Token URL** | `https://auth.staging-wwex.com/oauth/token` | Where the plugin fetches OAuth access tokens in test mode |
| **Sandbox API Base URL** | `https://speedship.staging-wwex.com/svc/` | The root URL for all SpeedShip API calls in test mode |
| **Sandbox Audience** | `staging-wwex-apig` | The OAuth audience value required by the sandbox token server |
| **Sandbox Client ID** | _(blank — paste yours here)_ | Your sandbox Client ID from Unishippers |
| **Sandbox Client Secret** | _(blank — paste yours here)_ | Your sandbox Client Secret from Unishippers |

**Production settings** (leave blank until you are ready to go live — confirm all URLs with your Unishippers rep):

| Field | What It Is |
|-------|------------|
| **Production Token URL** | OAuth token endpoint for live shipments — provided by Unishippers |
| **Production API Base URL** | Base URL for live SpeedShip API calls — provided by Unishippers |
| **Production Audience** | OAuth audience for the live token server — provided by Unishippers |
| **Production Client ID** | Your live Client ID from Unishippers |
| **Production Client Secret** | Your live Client Secret from Unishippers |

**Billing fields:**

| Field | Default | What It Does |
|-------|---------|--------------|
| **Bill-To Account Number** | _(blank)_ | Your Unishippers account number used for billing. Leave blank to use the default account on file. |
| **Bill-To Type** | Sender | Whether the shipper (you) or the receiver (your customer) is billed for the freight. Most stores leave this as **Sender**. |

**Webhook Secret** — leave this blank for now. It becomes relevant in a future phase when automated tracking status updates are added.

### Test the Connection

After filling in your sandbox credentials, click **Save** at the top of the page. Then scroll back down to the **Authentication** section and click the **Test Connection** button.

<!-- SCREENSHOT: Authentication fieldset with the Test Connection button and a "Connection successful!" status message -->

The plugin sends a test OAuth request. If the status shows **Connection successful!**, your credentials are working. If it shows **Connection failed**, double-check that you pasted the Client ID and Secret without extra spaces, and confirm the Token URL and Audience values with your Unishippers representative.

### Switching from Sandbox to Production

When you are satisfied that rates appear correctly in testing:

1. Go back to the **Authentication** fieldset.
2. Change **Environment** to **Production**.
3. Fill in all five **Production** fields (Token URL, API Base URL, Audience, Client ID, Client Secret) using the values from your Unishippers rep.
4. Click **Save**.
5. Click **Test Connection** again to confirm the live credentials work.

---

## Step B: Discover and Select Your Freight Carriers

Unishippers contracts with 60+ LTL carriers including XPO Logistics, Old Dominion, Saia, Estes Express, R+L Carriers, ABF Freight, YRC Freight, and many more. Your specific account has a subset of those carriers based on your contract. The plugin has a one-click tool to fetch exactly which carriers are available to your account.

### Rates Fieldset — Carrier Setup

Go to the **Rates** tab in the plugin configuration.

<!-- SCREENSHOT: Rates fieldset showing the Discover Carriers button and Allowed Carriers multi-select -->

**Step 1: Click Discover Carriers**

Click the **Discover Carriers** button. The plugin calls the SpeedShip API and asks which LTL carriers your account is contracted with. This takes a few seconds.

When discovery finishes, the result shows how many carriers were found (for example, "14 carrier(s) found and cached"). The list is saved internally and used to populate the next field.

**Step 2: Select from Allowed Carriers**

After discovery, the **Allowed Carriers** multi-select is populated with your contracted carrier names. Click the field to open the selector and choose which carriers to show at checkout.

:::tip

Less is more. Showing 3–5 carriers keeps your checkout clean and helps customers make a decision. You can always add more later by re-running Discover Carriers and updating this list.

:::

**Step 3: Re-run when your contract changes**

If you add new carrier contracts through your Unishippers rep, click **Discover Carriers** again to refresh the list, then update **Allowed Carriers** as needed.

### Rates Fieldset — Rate Display Options

| Setting | Default | What It Does |
|---------|---------|--------------|
| **Rate Display Mode** | Cheapest | **Cheapest** shows only the single lowest rate. **Cheapest N Options** shows the N cheapest options. **Average of N** averages the N cheapest rates and shows one option. |
| **Number of Rates (N)** | 3 | Used when mode is Cheapest N or Average. Controls how many rates are factored in. |
| **Show Carrier Name** | Yes | When on, the real carrier name (e.g., "Old Dominion Freight Line") appears at checkout. When off, the **Generic Label Text** is shown instead. |
| **Generic Label Text** | LTL Freight | The label shown when carrier names are hidden. |
| **Show Delivery Estimate** | Yes | Appends estimated transit days to each rate at checkout (e.g., "3 business day(s)"). |
| **Method Display Name** | Unishippers LTL Freight | The shipping method name shown to customers at checkout. |
| **Quote Cache (minutes)** | 720 | How long the plugin caches rate results to avoid unnecessary API calls. 720 = 12 hours. Set to 0 to disable caching. |
| **Fallback Rate Amount** | 0 | A flat rate shown when the SpeedShip API is unavailable. Set to 0 to show no rate at all during an outage. |
| **Fallback Rate Label** | _(blank)_ | Label displayed for the fallback rate (e.g., "LTL Freight (Estimate)"). |
| **Minimum Total Weight** | 0 | Do not return rates if the cart's total weight is below this value (in lbs). 0 = no minimum. |
| **Default Freight Eligible** | Yes | The storewide default for products that have never been configured. Yes = every product is treated as freight-eligible unless you opt it out. No = only products you explicitly mark as freight-eligible are included. |
| **Exclusive When Active** | No | When on, suppresses all other shipping methods whenever this plugin returns at least one rate. Useful if you only want LTL options shown when freight is needed. |
| **Allow Customer Own Arrangement** | No | When on, a $0 rate option appears at checkout letting customers arrange their own freight pickup. |
| **Own Arrangement Label** | _(blank)_ | The label for the $0 own-arrangement option (e.g., "Customer Own Arrangement"). |

---

## Step C: Set Up Products for Freight Shipping

This is the most important per-product step. The plugin needs to know which products ship by LTL freight and what freight class to use. Freight class (also called NMFC class) is a standardized rating system used by all LTL carriers in the US. It ranges from Class 50 (very dense, heavy goods like steel) to Class 500 (very light, low-density goods like ping pong balls). The class affects the rate — higher class = higher cost.

:::info

**What is NMFC?** NMFC stands for National Motor Freight Classification. It is the industry-standard system that assigns a "class" to every type of commodity based on its density, handling needs, liability, and stowability. If you are unsure of your freight class, contact your Unishippers rep — they can help you determine the correct class for your products.

:::

### Open a Product for Editing

There are three ways to reach a product.

**Option A:** Go to the **J2Commerce** icon at the top-right **->** **Catalog** **->** **Products**.

**Option B:** Go to **Components** on the left sidebar **->** **J2Commerce** **->** **Catalog** **->** **Products**.

**Option C:** Go to **Content** **->** **Articles** **->** find the article that represents the product, and open it.

<!-- SCREENSHOT: Products list in J2Commerce admin -->

Click the product name to open the product edit screen.

### Navigate to the Unishippers Freight Tab

On the product edit screen, click the **J2Commerce** tab, then click the **Apps** tab within it. Scroll down to the **Unishippers Freight** section.

<!-- SCREENSHOT: Product edit screen showing J2Commerce tab -> Apps tab -> Unishippers Freight section -->

### Freight Settings Per Product

**Freight Eligible** (toggle, default: Yes)

Turn this on if this product ships by LTL freight. Turn it off for small, light items that ship by parcel (USPS, UPS, FedEx). If **all** products in the customer's cart are set to freight-ineligible, the plugin returns no rate — parcel shipping methods will handle those carts instead.

**Freight Class**

Select the NMFC freight class that best describes this product. The dropdown includes 60+ common commodity categories:

- Mattresses — Class 175
- Furniture (Assembled) — Class 125
- Electronics — Class 125
- Computer Equipment — Class 92.5
- HVAC Equipment — Class 92.5
- Auto Parts (General) — Class 70
- Lumber — Class 70
- Books — Class 60
- Steel Coils / Gym Weights — Class 50

Leave on **— Auto (density / default) —** to let the plugin calculate the class automatically from the product's weight and dimensions (requires **Density-Based Class Fallback** to be enabled in the Packaging fieldset, or falls back to the **Default Commodity Class** set there).

:::tip

When in doubt, use the "Auto (density / default)" option and make sure your product has accurate weight and dimensions filled in. The density calculation is usually within one freight class of the manually assigned class.

:::

**NMFC Number** (optional)

Some carriers ask for the NMFC item number, which is more specific than the class. Your Unishippers rep can provide this if needed. Example format: `61060`. Leave blank if you do not have it.

**Commodity Description**

A short plain-English description of what this product is (e.g., "Assembled wooden dining table", "Electric treadmill", "Steel pipe fittings"). This description appears on the Bill of Lading (BOL) — the shipping document that travels with the freight. Keep it to one line.

:::info

**What is a BOL?** A Bill of Lading is the legal document that accompanies every LTL shipment. It identifies the shipper, the recipient, and describes the freight being transported. Carriers use it to track and handle your shipment.

:::

**Ships on Its Own Pallet** (toggle, default: No)

Turn this on if this product always occupies a full pallet by itself, regardless of quantity. Useful for large, heavy items like sofas or industrial machinery.

**Force Separate Pallets (qty per pallet)** (number, default: 0)

If a customer orders multiple units and each set of N units fills a pallet, enter that N here. For example, if 4 units fill one pallet, enter `4` — buying 8 units creates 2 pallets in the rate request. Enter `0` to let the plugin pack items normally.

**Stackable** (toggle, default: No)

Can this product's pallet be stacked on top of another? Stackable pallets allow carriers to optimize truck loading and can affect rates.

**Max Stack Height** (number, default: 0)

If stackable, the maximum number of units that can be stacked. Enter `0` for no limit.

**Hazardous Material** (toggle, default: No)

Only enable this if the product is a regulated hazardous material (paint, certain batteries, chemicals, etc.). This field only appears in the rate request when **Enable Hazmat Shipments** is turned on in the plugin's Accessorials fieldset. When enabled, four additional fields appear:

- **UN Number** — the UN identification number (e.g., `UN1263` for flammable liquids / paint)
- **Proper Shipping Name** — the official DOT name for the hazmat (e.g., "Paint, flammable")
- **Hazmat Class** — the DOT hazard class or division (e.g., `3` for flammable liquids)
- **Packing Group** — PG I (great danger), PG II (medium danger), or PG III (minor danger)
- **Emergency Phone** — a 24-hour emergency contact number, required for hazmat shipments

:::note

Hazmat shipments require special handling, placarding, and paperwork. If you ship regulated hazardous materials, confirm the correct UN number, class, and packing group with your Unishippers representative before enabling this option.

:::

### Save the Product

Click **Save** or **Save & Close** at the top of the product edit screen. Repeat this process for every product that ships by LTL freight.

### A Note on Product Weight and Dimensions

The freight rate calculation depends heavily on accurate product measurements. Open each product and ensure the following fields are filled in under the **J2Commerce** tab **->** **General** tab (or Inventory tab, depending on your setup):

- **Weight** — the weight of the product (in the unit selected in the plugin's Packaging fieldset)
- **Length**, **Width**, **Height** — the dimensions of the product when packaged

Accurate values = accurate rates. If weight and dimensions are missing, the plugin falls back to density-based class estimation and may produce less precise rates.

:::tip

If the cart contains a mix of freight-eligible and freight-ineligible products, the plugin only includes the freight-eligible items in the rate request. The non-freight items are handled by your other shipping methods (parcel carriers).

:::

---

## Additional Configuration

### Packaging

The **Packaging** fieldset controls how the plugin groups items into pallets and what units it uses.

| Setting | Default | What It Does |
|---------|---------|--------------|
| **Weight Unit** | _(from store settings)_ | The weight unit used by your store (lbs or kg). The plugin converts to lbs for the SpeedShip API. |
| **Length Unit** | _(from store settings)_ | The dimension unit used by your store (inches or cm). |
| **Max Weight per Pallet (lbs)** | 2500 | When items combined on a pallet exceed this weight, the plugin splits them across additional pallets. Most standard pallets max out at 2,000–2,500 lbs gross. |
| **Default Pallet Length (in)** | 48 | Standard pallet footprint length used when no product-level override is set. |
| **Default Pallet Width (in)** | 40 | Standard pallet footprint width. |
| **Default Pallet Height (in)** | 48 | Default stacking height allowed on a pallet. |
| **Default Pallet Tare Weight (lbs)** | 40 | The empty pallet's own weight, added to the cargo weight for each handling unit. A standard wood pallet weighs about 40 lbs. |
| **Default Commodity Class** | Auto Parts — Class 70 | The NMFC class used when a product has no class assigned and density calculation is disabled or impossible. Choose the class that best represents your average product. |
| **Density-Based Class Fallback** | Yes | When enabled, the plugin calculates the freight class from the product's weight and volume when no class is explicitly assigned. Recommended to leave on. |

### Accessorials

Accessorials (pronounced "ak-ses-OR-ee-als") are extra delivery services that carriers charge for — things like a liftgate to lower the pallet from the truck, a call-ahead notification, or inside delivery past the curb. Each accessorial has a **mode** that controls when it is applied:

- **Never** — the service is never requested, even if the carrier would charge for it
- **Auto** — the plugin requests it automatically when conditions are met (e.g., liftgate auto-applies above a weight threshold)
- **Always** — the service is always requested on every shipment
- **Customer Selects** — a checkbox appears at checkout so the customer can request it

| Accessorial | What It Is |
|-------------|------------|
| **Residential Delivery** | Delivery to a home address rather than a business. LTL carriers charge extra for this. |
| **Liftgate Delivery** | A hydraulic platform on the truck lowers the pallet to the ground — required when there is no loading dock. |
| **Inside Delivery** | The carrier moves the freight from the truck door to inside the building (not just curbside). |
| **Notify Before Delivery** | The carrier calls the customer before arriving to schedule a delivery window. |
| **Appointment Delivery** | The carrier delivers at a specific agreed-upon time slot. |
| **Construction Site Delivery** | Delivery to an active construction site, which has limited access. |
| **Tradeshow Delivery** | Delivery to a convention center or tradeshow venue. |
| **Limited Access Delivery** | Delivery to a location with restricted access (schools, churches, remote farms, etc.). |
| **Sort and Segregate** | The carrier sorts products by type or keeps them separated during delivery. |
| **Protection from Cold** | The carrier protects the freight from freezing temperatures during transit. |

The **Auto Liftgate Weight Threshold** (default: 100 lbs) controls when liftgate is automatically added in Auto mode. If any single item in the cart weighs more than this threshold, the liftgate accessorial is included in the rate request.

**Enable Hazmat Shipments** — turn this on if any of your products are regulated hazardous materials. This makes the hazmat fields appear on product edit screens.

### Warehouses

The **Warehouses** fieldset lets you configure multiple ship-from locations. Each warehouse entry includes its address, a contact name and phone, optional accessorials specific to that pickup location (residential pickup, liftgate pickup), and a handling fee that can be flat, a percentage, or per-pound.

Click the **+** button to add a warehouse row. Fill in the required fields: **Warehouse Name**, **Address Line 1**, **City**, **State/Province**, **ZIP / Postal Code**, and **Country Code** (default: `US`). Click **Save** when done.

The plugin routes each shipment through the closest warehouse to the customer's address and combines rates accordingly.

### Schedule

The **Schedule** fieldset tells the plugin when your warehouse can hand off freight to a carrier. This drives the ship date sent to carriers, which affects delivery estimates.

| Setting | Default | What It Does |
|---------|---------|--------------|
| **Order Cutoff Time** | 14:00 (2:00 PM) | Orders placed after this time count as next-business-day pickups. Uses 24-hour format. |
| **Lead Time Offset (days)** | 1 | Additional business days added to the ship date (e.g., if you need a day to prepare the pallet before pickup). |
| **Ship Days** | Monday–Friday | The days your warehouse is available for carrier pickups. |
| **Holiday Dates** | _(blank)_ | Dates when no pickups are available. Enter one date per line in YYYY-MM-DD format (e.g., `2026-12-25`). |

### Checkout

The **Checkout** fieldset controls eligibility rules — when the plugin shows or hides rates.

| Setting | Default | What It Does |
|---------|---------|--------------|
| **Reject PO Box Addresses** | Yes | LTL freight cannot be delivered to a PO Box. When on, the plugin returns no rate if the destination appears to be a PO Box. |
| **Shipping Tax Profile** | _(none)_ | If your jurisdiction taxes freight charges, select the applicable J2Commerce tax profile here. |
| **Restrict to Geozone** | _(all)_ | Only return rates for customers whose address falls within a specific J2Commerce geozone. Leave at the default (0) to offer rates worldwide. |
| **Minimum Order Subtotal** | 0 | Do not return rates if the cart subtotal is below this amount. Set to 0 to disable. |
| **Maximum Order Subtotal** | 0 | Do not return rates if the cart subtotal exceeds this amount. Set to 0 to disable. |

### Order States

| Setting | Default | What It Does |
|---------|---------|--------------|
| **Shipped Order Status** | Shipped (8) | The order status automatically applied when a Bill of Lading is created or the shipment is confirmed as picked up. |
| **Delivered Order Status** | Delivered (9) | The order status automatically applied when a delivered tracking event is received. |
| **Notify Customer on Status Change** | Yes | When on, J2Commerce sends the customer the appropriate order status notification email when either status is applied. |

### Diagnostics

| Setting | Default | What It Does |
|---------|---------|--------------|
| **Debug Logging** | No | When enabled, every SpeedShip API request and response is written to `administrator/logs/plg_j2commerce_shipping_unishippers.php`. Turn this on temporarily to diagnose rate or connectivity problems, then turn it off to prevent log files from growing indefinitely. |
| **Tracking Poll Limit** | 50 | The maximum number of shipments checked for tracking updates per cron job run. |
| **API Log Viewer** | _(button)_ | Click **View API Logs** to see the last 25 API requests and responses inline — useful for diagnosing issues without leaving the configuration screen. |

---

## How It Works

When a customer reaches the shipping step at checkout:

1. J2Commerce collects the customer's shipping address and the items in the cart.
2. The plugin checks whether the cart contains at least one freight-eligible product. If none are eligible, it returns no rate and other shipping methods handle the order.
3. The plugin calculates the total weight and pallet count by grouping items according to each product's pallet settings (own pallet, force separate, stackable, max weight per pallet).
4. It resolves the freight class for each item — using the per-product class, density calculation, or the store default — in that priority order.
5. It checks the active warehouse and calculates the ship date based on the Schedule settings.
6. It sends the rate request to the Unishippers SpeedShip API using your OAuth credentials.
7. The API returns rates from your contracted carriers. The plugin filters by **Allowed Carriers** and applies the **Rate Display Mode** (Cheapest, Cheapest N, Average of N).
8. Rates appear at checkout with carrier names (or the generic label), prices, and estimated transit days.
9. The result is cached for the configured cache TTL so repeat requests do not call the API again.

---

## Display Conditions

Freight rates appear at checkout when ALL of the following are true:

- The plugin is enabled in **J2Commerce** **->** **Setup** **->** **Shipping Methods**.
- The customer's shipping address is filled in and is not a PO Box (if **Reject PO Box Addresses** is on).
- At least one product in the cart has **Freight Eligible** set to Yes.
- The cart meets any configured **Minimum Total Weight**, **Minimum Order Subtotal**, and **Maximum Order Subtotal** thresholds.
- If a **Geozone** is set, the customer's address falls within that zone.
- The SpeedShip API returns at least one rate, or a **Fallback Rate Amount** is configured.

Rates are **not** shown when:

- No products in the cart are freight-eligible (parcel shipping handles those carts).
- The API call fails and no fallback rate is set.
- The destination is a PO Box and **Reject PO Box Addresses** is on.

---

## Tips

- **Set freight class on every product.** Leaving all products on "Auto (density / default)" works, but assigning the correct NMFC class gives you more accurate rates and avoids reclassification fees from carriers.
- **Start with Cheapest rate display mode.** Most customers do not need to choose between five LTL carriers — the cheapest is usually the right choice. Switch to Cheapest N if you want to offer a speed vs. cost trade-off.
- **Use the 12-hour cache (default).** LTL rates do not change within a day. The cache dramatically reduces API calls and speeds up the checkout page.
- **Set a fallback rate for API outages.** If the SpeedShip API is temporarily unavailable, a $0 fallback means customers cannot check out at all. Set a reasonable flat fallback (e.g., $150) as a safety net so orders can still be placed.
- **Re-run Discover Carriers after any contract change.** If your Unishippers account adds a new carrier, click Discover Carriers again and update the Allowed Carriers list.
- **Enable debug logging only while troubleshooting.** Debug logs grow quickly. Once your issue is resolved, turn it off.

---

## Troubleshooting

### No freight rates appear at checkout

**Cause:** The most common reasons are missing credentials, no freight-eligible products, or carrier discovery not run.

**Solution:**

1. Confirm the plugin shows a green checkmark in **J2Commerce** **->** **Setup** **->** **Shipping Methods**.
2. Verify your **Sandbox Client ID** and **Sandbox Client Secret** are filled in, then click **Test Connection**. If it fails, re-check the credentials with your Unishippers rep.
3. Open a product in the cart and confirm **Freight Eligible** is set to **Yes** under the **J2Commerce** tab **->** **Apps** tab **->** **Unishippers Freight** section.
4. Go to the **Rates** fieldset and click **Discover Carriers**. Make sure at least one carrier appears in **Allowed Carriers**.
5. Check that the cart's total weight meets any **Minimum Total Weight** you may have set.
6. Enable **Debug Logging** in the **Diagnostics** fieldset, save, and attempt checkout again. Then check `administrator/logs/plg_j2commerce_shipping_unishippers.php` for the API error message.

<!-- SCREENSHOT: Debug log file showing a failed rate request with an error message -->

### Test Connection fails immediately after entering credentials

**Cause:** Incorrect Token URL, Client ID, Client Secret, or Audience value.

**Solution:**

1. Contact your Unishippers representative to confirm all four sandbox values: Token URL, API Base URL, Audience, Client ID, and Client Secret.
2. Paste the values again carefully — trailing spaces or line breaks can cause authentication to fail.
3. Make sure **Environment** is set to **Sandbox** when testing sandbox credentials.

### Freight class warning or incorrect rates from carriers

**Cause:** The product's freight class does not match the commodity's actual classification.

**Solution:**

1. Open the product and go to **J2Commerce** tab **->** **Apps** tab **->** **Unishippers Freight**.
2. Verify the **Freight Class** matches the carrier's classification for that commodity. When in doubt, ask your Unishippers rep.
3. Make sure **Weight**, **Length**, **Width**, and **Height** are filled in accurately on the product — density-based class calculation depends on these values.

### Customers cannot complete checkout because no rate appears for their address

**Cause:** The destination may be a PO Box, outside your configured geozone, or the API is returning no rates for that route.

**Solution:**

1. If the customer is entering a PO Box address: LTL freight cannot deliver to a PO Box. This is expected behavior. Ask the customer to use a street address.
2. Check your **Geozone** setting — if set, only customers within that zone see rates.
3. Enable **Fallback Rate Amount** (e.g., `150`) and a **Fallback Rate Label** (e.g., "LTL Freight — Contact Us") so customers can still place an order and you can arrange shipping manually.

### The plugin shows rates but they seem too high or too low

**Cause:** Product weights, dimensions, or freight classes are inaccurate, or a handling fee is being applied.

**Solution:**

1. Open the products in the cart and verify their **Weight** and **Length**, **Width**, **Height** values are correct.
2. Check the **Freight Class** assigned to each product — a class that is too high significantly increases rates.
3. Review the **Packaging** fieldset to confirm the **Default Pallet Tare Weight** and **Max Weight per Pallet** are set to realistic values for your warehouse.
4. Check if any per-warehouse **Handling Fee** is configured in the **Warehouses** fieldset that may be inflating the displayed rate.
