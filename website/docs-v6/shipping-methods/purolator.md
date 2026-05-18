---
title: "Purolator Shipping"
sidebar_label: "Purolator"
sidebar_position: 55
description: "Real-time Purolator shipping rates at checkout via the Purolator PWS V1 SOAP API. Supports Canadian domestic, CA-to-US, and CA-to-International services with box-packing support."
---

# Purolator Shipping

The Purolator Shipping plugin connects your J2Commerce store to Purolator's Production Web Services (PWS) V1 API and fetches live shipping rates at checkout. Customers see real Purolator prices — pulled directly from the carrier, not from a hard-coded table. The plugin supports all three Purolator shipping scopes: Canadian domestic, Canada-to-US, and Canada-to-International.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x
- A Purolator business account
- An API Key and API Password from the Purolator Developer Centre
- A Canadian ship-from address (Purolator ships from Canada only)

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) **->** **Extensions**.

**Step 2:** Locate **Purolator Shipping** **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile, search for the plugin, click **Available Versions** **->** **View Files** **->** **Download Now**.

---

## Getting Your Purolator API Credentials

The plugin authenticates with Purolator using an API Key and API Password issued through the Purolator Developer Centre.

**Step 1:** Log in to your Purolator business account at [https://www.purolator.com](https://www.purolator.com).

**Step 2:** Navigate to the **Developer Centre** and register for PWS (Production Web Services) access.

**Step 3:** Once approved, Purolator issues you an **API Key** (used as the login) and an **API Password**. Copy both — you will paste them into the plugin configuration.

**Step 4:** Note your **Billing Account Number** — this identifies your shipping account when Purolator returns rate quotes.

:::tip

Purolator also provides a sandbox (development) endpoint at `devwebservices.purolator.com`. Your same API Key and Password work in both environments. Enable **Sandbox Mode** in the plugin while you set up and test, then switch to production when rates look correct.

:::

<!-- SCREENSHOT: Purolator Developer Centre showing where to find API Key and API Password -->

---

## Install the Plugin

In the Joomla administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `shipping_purolator.zip` package file.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen with shipping_purolator.zip selected -->

## Enable the Plugin

Once installed, the plugin must be enabled before it appears at checkout.

**Option A:** Go to the **J2Commerce** menu in the left sidebar **->** **Setup** **->** **Shipping Methods**.

**Option B:** Click the **J2Commerce** icon at the top-right **->** **Setup** **->** **Shipping Methods**.

<!-- SCREENSHOT: Shipping Methods list showing Purolator Shipping with a red X (disabled) -->

Find **Purolator Shipping** in the list and click the **X** — it turns into a green checkmark.

<!-- SCREENSHOT: Purolator Shipping row showing a green checkmark (enabled) -->

Click the plugin name to open the configuration screen.

:::tip

Use the **Toggle Inline Help** button near the top of the configuration screen to show a short description below each field.

:::

---

## Configure the Plugin

Work through the fields below. Required fields are marked with an asterisk (\*) in the admin UI.

---

### Plugin Image

The image displayed next to this shipping method in the checkout shipping selector. A Purolator logo image is included and set as the default — you can replace it with your own branding by clicking **Select** and choosing a different image from the Media Manager.

<!-- SCREENSHOT: Plugin Image field with the default Purolator logo selected -->

---

### API Credentials

<!-- SCREENSHOT: API Credentials section showing Sandbox Mode toggle, API Key, API Password, and Billing Account Number fields -->

**Sandbox Mode**

| Option | What it does |
|--------|-------------|
| **No** (default) | Connects to `webservices.purolator.com` (live production rates) |
| **Yes** | Connects to `devwebservices.purolator.com` (Purolator test environment) |

Leave this set to **Yes** while you configure and test. Switch to **No** only after you confirm that real rates appear correctly.

**API Key** (required)

Your API Key from the Purolator Developer Centre. This is the login credential for HTTP Basic Authentication. Do not share this value.

**API Password** (required)

Your API Password from the Purolator Developer Centre. This field uses a password input and is masked in the admin UI.

**Billing Account Number**

Your Purolator billing account number. This identifies your account when Purolator calculates rates. If you leave it blank, Purolator may return general rates rather than rates tied to your account.

---

### Enabled Services

<!-- SCREENSHOT: Enabled Services field with the fancy-select dropdown open showing a searchable list of Purolator service names -->

Click the field to open a searchable service selector and choose which Purolator services appear at checkout. If you leave the field empty, all services returned by Purolator will appear.

Select only the services relevant to your customers. A long list of rates can overwhelm buyers — most stores offer 2–4 options.

**Canadian Domestic**

| Service | Description |
|---------|-------------|
| Purolator Ground | Standard ground delivery across Canada |
| Purolator Ground 9AM | Ground with guaranteed 9AM delivery |
| Purolator Ground 10:30AM | Ground with guaranteed 10:30AM delivery |
| Purolator Ground Evening | Ground with evening delivery |
| Purolator Express | Next-business-day express across Canada |
| Purolator Express 9AM | Express with guaranteed 9AM delivery |
| Purolator Express 10:30AM | Express with guaranteed 10:30AM delivery |
| Purolator Express Evening | Express with evening delivery |
| Purolator Express Envelope | Express document envelope (plus 9AM, 10:30AM, Evening variants) |
| Purolator Express Pack | Express padded pak (plus 9AM, 10:30AM, Evening variants) |
| Purolator Express Box | Express cardboard box (plus 9AM, 10:30AM, Evening variants) |

**Canada to U.S.**

| Service | Description |
|---------|-------------|
| Purolator Ground U.S. | Ground delivery from Canada to the US |
| Purolator Express U.S. | Express from Canada to the US (plus 9AM, 10:30AM, 12:00PM variants) |
| Purolator Express Envelope U.S. | Express envelope to the US (plus 9AM, 10:30AM, 12:00PM variants) |
| Purolator Express Pack U.S. | Express pack to the US (plus 9AM, 10:30AM, 12:00PM variants) |
| Purolator Express Box U.S. | Express box to the US (plus 9AM, 10:30AM, 12:00PM variants) |

**Canada to International**

| Service | Description |
|---------|-------------|
| Purolator Express International | Express to international destinations (plus 9AM, 10:30AM, 12:00PM variants) |
| Purolator Express Envelope International | Express envelope internationally (plus 9AM, 10:30AM, 12:00PM variants) |
| Purolator Express Pack International | Express pack internationally (plus 9AM, 10:30AM, 12:00PM variants) |
| Purolator Express Box International | Express box internationally (plus 9AM, 10:30AM, 12:00PM variants) |

---

### Package Handling

This section controls how the plugin groups the items in an order into packages before requesting rates from Purolator.

<!-- SCREENSHOT: Package Handling section showing Packing Mode dropdown, Use Purolator Preset Boxes toggle, Box Rotation dropdown, and Custom Box List -->

**Packing Mode**

| Mode | How it works | Best for |
|------|-------------|----------|
| **Per Item** (default) | Each item in the cart is treated as its own package. | Products that vary widely in size, or when dimension data is incomplete. |
| **Box Packing** | A 3D bin-packing algorithm fits items into the smallest available box from your box list. Produces the most accurate rates for multi-item orders. | Stores with a consistent set of box sizes and accurate product dimensions. |

**Use Purolator Preset Boxes** — shown only when Box Packing is selected

When enabled, the plugin adds Purolator's standard Express packaging sizes to the packing calculation automatically.

| Preset | Outer dimensions (cm) | Max weight |
|--------|----------------------|------------|
| Purolator Express Envelope | 38.1 × 26.7 × 1.3 | 0.5 kg |
| Purolator Express Pack | 32.4 × 26.0 × 5.1 | 4.5 kg |
| Purolator Express Small Box | 23.0 × 18.0 × 14.0 | 4.5 kg |
| Purolator Express Medium Box | 30.5 × 30.5 × 17.8 | 13.5 kg |
| Purolator Express Large Box | 45.7 × 30.5 × 30.5 | 13.5 kg |

These presets are automatically scaled when your configured weight and dimension units differ from kilograms and centimetres.

**Box Rotation** — shown only when Box Packing is selected

| Option | What it means |
|--------|--------------|
| **Best Fit** (default) | Items may be rotated in any direction to fit into a smaller box — recommended for most stores. |
| **Keep Flat** | Items are never rotated upright. Use this for liquid-filled or fragile products that must stay flat. |
| **Never Rotate** | Items are packed in their exact orientation with no rotation at all. |

**Custom Box List** — shown only when Box Packing is selected

Define your own box sizes in addition to (or instead of) the Purolator presets. Click **Add Box** and fill in the outer dimensions (length, width, height), inner dimensions, the empty box weight, and the maximum cargo weight per box. You can add as many box sizes as you stock.

---

### Weight and Dimensions

Purolator's API accepts only specific units. The plugin enforces these automatically and rejects any values it cannot convert.

<!-- SCREENSHOT: Weight and Dimensions section showing Weight Unit, Dimension Unit, Include Dimensions toggle, and default fallback fields -->

**Weight Unit** (required)

| Accepted value | Notes |
|---------------|-------|
| `kg` | Kilograms — Purolator's native unit |
| `lb` | Pounds — automatically converted before the API call |

Purolator does not accept grams or ounces. Any other unit produces an error.

**Dimension Unit** (required)

| Accepted value | Notes |
|---------------|-------|
| `cm` | Centimetres — Purolator's native unit |
| `in` | Inches — automatically converted before the API call |

Purolator does not accept millimetres or metres.

**Include Dimensions**

Set to **Yes** to send package dimensions (length, width, height) to Purolator alongside the weight. Purolator uses dimensions to calculate volumetric weight, which can affect the rate. Set to **No** if your products do not have dimension data entered in J2Commerce — dimensions will be omitted from the API call.

**Default Weight**

Fallback weight used when a product has no weight set. Purolator requires a weight on every package, so a missing product weight causes the API to reject the request. Default: `1`. Set this to a realistic value for your most common product type (for example, `0.5` for a small accessories store).

**Default Length / Width / Height**

Fallback dimensions used when a product has no dimension data. These are only sent when **Include Dimensions** is set to **Yes**. Defaults: `10` each. Set values that match your most common product size.

---

### Origin Address

This is where your packages ship from. Purolator uses the origin postal code and province to calculate rates accurately.

<!-- SCREENSHOT: Origin Address section showing Origin Postal Code, Origin Country, Origin Province/State, and Origin City fields -->

**Origin Postal Code** (required)

Your Canadian postal code, for example `M5V 3L9`. This is the single most important field for rate accuracy — an incorrect postal code can produce wrong rates or API errors.

**Origin Country**

Defaults to **Canada**. Purolator only ships from Canada, so this field should remain set to Canada.

**Origin Province/State**

Select your ship-from province from the dropdown. This populates automatically based on the selected country. Some Purolator services use the province for routing.

**Origin City**

Your ship-from city. Not required by the Purolator API, but some services use it for more precise routing.

---

### Rate Options

<!-- SCREENSHOT: Rate Options section showing Handling Fee, Handling Fee Type, Tax Class, Geo Zone, and Show Delivery Time fields -->

**Handling Fee**

A fixed amount or percentage added to every Purolator rate at checkout. Set to `0` for no handling fee. Defaults to `0`.

**Handling Fee Type**

| Option | How it works |
|--------|-------------|
| **Flat Amount** (default) | A fixed dollar amount added to every rate — for example, `2.50` adds $2.50 to every Purolator rate. |
| **Percentage** | A percentage of the Purolator rate — for example, `10` adds 10% to every rate. |

**Tax Class**

Select a J2Commerce tax profile to apply tax to shipping costs. Leave set to **None** if your jurisdiction does not tax shipping.

**Geo Zone**

Restrict Purolator rates to customers who fall within a specific J2Commerce geozone. Leave set to **None** to offer Purolator to all customers regardless of address. This is useful when you want to show Purolator only to Canadian customers while using a different shipping method for international buyers.

**Show Delivery Time**

| Option | What the customer sees |
|--------|----------------------|
| **Yes** (default) | Purolator's estimated delivery date appears next to each rate at checkout |
| **No** | Only the rate price is shown |

---

### Debug Mode

<!-- SCREENSHOT: Debug Mode toggle set to No -->

| Option | What happens |
|--------|-------------|
| **No** (default) | No debug output |
| **Yes** | Every SOAP request and response is written to `administrator/logs/shipping_purolator.php` using the Joomla Log API. API credentials are automatically masked with `***` in the log — they are never written in plain text. |

Enable debug mode only while diagnosing a problem. Debug logs grow quickly. Disable it before going live.

---

## Testing in Sandbox Mode

The Purolator development endpoint is a safe environment to verify your configuration before accepting real orders.

**Step 1 — Enable sandbox mode:**

1. Open the plugin configuration.
2. Set **Sandbox Mode** to **Yes**.
3. Enter your **API Key**, **API Password**, and **Billing Account Number**.
4. Click **Save & Close**.

**Step 2 — Test a checkout:**

Add a product to your cart and proceed to the shipping step. Purolator rates should appear using the development server. Dollar amounts from the sandbox may differ from production — this is expected and normal.

**Step 3 — Check the logs:**

1. Set **Debug Mode** to **Yes** and click **Save & Close**.
2. Complete a checkout to the shipping step.
3. Open `administrator/logs/shipping_purolator.php` in a text editor.

You will see the SOAP request body (with credentials shown as `***`) and the parsed response from Purolator.

**Step 4 — Switch to production:**

When rates appear correctly in sandbox:

1. Set **Sandbox Mode** to **No**.
2. Set **Debug Mode** to **No**.
3. Click **Save & Close**.

The plugin now connects to `webservices.purolator.com` and returns live Purolator rates.

---

## Troubleshooting

### No rates appear at checkout

Check these items in order:

1. Confirm the plugin shows a green checkmark in **J2Commerce** **->** **Setup** **->** **Shipping Methods**.
2. Verify **API Key** and **API Password** are both filled in — missing credentials produce no rates silently.
3. Check that **Origin Postal Code** is set to a valid Canadian postal code.
4. Confirm **Weight Unit** is set to `kg` or `lb`.
5. Confirm **Dimension Unit** is set to `cm` or `in`.
6. If you have a **Geo Zone** set, confirm the test customer's address falls within that geozone.
7. Enable **Debug Mode**, save, and attempt checkout again. Open `administrator/logs/shipping_purolator.php` and look for the error message returned by Purolator.

<!-- SCREENSHOT: administrator/logs/shipping_purolator.php open in a text editor showing a SOAP fault response -->

### SOAP fault in the debug log

**Cause:** The most common causes are incorrect credentials, an invalid postal code format, or a temporary Purolator API outage.

**Solution:**

1. Paste your **API Key** and **API Password** fresh from the Purolator Developer Centre to rule out copy-paste errors.
2. Verify your **Origin Postal Code** uses Canadian format — letter, number, letter, space, number, letter, number (for example, `M5V 3L9`).
3. Confirm **Sandbox Mode** matches your credentials. Sandbox credentials only work with sandbox mode enabled.
4. Try switching to **Sandbox Mode** temporarily to isolate whether the problem is with your credentials or with the Purolator production service.

### Rates appear but are higher than expected

**Cause:** Purolator rates depend on origin, destination, weight, and dimensions. Products without accurate weights or dimensions produce inaccurate rates.

**Solution:**

1. Check that all products in the test order have accurate **Weight** values entered in J2Commerce.
2. If **Include Dimensions** is set to **Yes**, verify the products have accurate **Length**, **Width**, and **Height** values.
3. Enable **Debug Mode** and inspect `administrator/logs/shipping_purolator.php` to see the exact weight and dimensions being sent to Purolator.

### WSDL file missing error in the debug log

**Cause:** The WSDL files (`EstimatingService.wsdl` or `TestEstimatingService.wsdl`) were not installed or were accidentally deleted.

**Solution:**

Reinstall the plugin — go to **System** **->** **Install** **->** **Extensions** and upload `shipping_purolator.zip` again. The installer restores the WSDL files without affecting your saved configuration.

### Rates disappear when some products have no weight

**Cause:** Purolator requires a weight on every package. A product with zero weight causes the API to reject the entire request.

**Solution:**

Set **Default Weight** to a non-zero value such as `0.5`. This fallback prevents API errors for products that are missing weight data. Also update those products to have accurate weights set in J2Commerce.

### Request times out with no rates

**Cause:** The Purolator API enforces a 15-second connection timeout. Slow network conditions or a Purolator outage can cause a timeout.

**Solution:**

1. Enable **Debug Mode** and check the log for a `SoapFault` or connection error.
2. Wait a few minutes and try again — brief Purolator API outages resolve on their own.
3. Verify your server can reach `webservices.purolator.com` (or `devwebservices.purolator.com` in sandbox mode) on port 443.

---

## What Is New in v6.0.0

This release is a complete migration to native Joomla 6 MVC architecture. Your customers see the same Purolator rates at checkout, but the internals are fully rewritten from the J2Store version.

| Area | Change |
|------|--------|
| **Framework** | No longer depends on FOF 2, jQuery, or J2Store helper classes. Uses native Joomla 6 MVC and the J2Commerce plugin event system. |
| **BoxPacker** | The old plugin shipped its own packing library (~700 lines). The new plugin uses the shared J2Commerce `ShipperHelper` — the same algorithm already tested by multiple other shipping plugins. |
| **Preset boxes** | Five standard Purolator Express packaging sizes (Envelope, Pack, Small, Medium, Large) are built in and automatically scaled to your configured units. |
| **Credential security** | API credentials are masked as `***` in all debug log output. The old plugin could write credentials to `cache/` files in plain text. |
| **SoapClient** | Enforces a 15-second connection timeout, uses disk-based WSDL caching, and enables SOAP exceptions — all missing from the original. |
| **Debug logging** | Log output goes to `administrator/logs/shipping_purolator.php` via the Joomla Log API. The old plugin wrote raw text to the `cache/` directory. |
| **API Password field** | Now uses a masked password input in the admin UI instead of a plain text field. |
| **Plugin image** | A carrier logo image field lets you display the Purolator logo (or your own image) next to this shipping method at checkout. |
| **Services selector** | The 53 Purolator service codes are shown in a searchable multi-select dropdown. The old custom checkbox field is replaced with the standard J2Commerce UI. |
| **Handling fee type** | Choose between a flat amount or a percentage-based handling surcharge — new in v6. |
| **Geo Zone restriction** | New field to limit Purolator rates to customers within a specific geozone. |
| **Full origin address** | Origin country, province, and city fields join the existing postal code field — replacing the single postal code that was the only origin input in v4. |
| **Dimension unit** | A dedicated dimension unit field (cm or in) replaces the implicit assumption of centimetres in the old plugin. |
