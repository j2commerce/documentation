# DHL Express

The DHL Express shipping plugin connects your J2Commerce store directly to DHL's MyDHL API. Instead of showing customers a flat delivery fee, your checkout pulls real, live DHL Express rates the moment a shipping address is entered — with the actual service names, transit times, and prices DHL would charge you for that shipment. From the order screen you can also generate a DHL waybill (shipping label) and hand the customer a real DHL tracking number, without leaving your Joomla admin.

This plugin is built for stores that ship internationally or need DHL's speed and reliability, and want checkout rates that match what DHL actually bills.

## Requirements

- with PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- A DHL Express business account with MyDHL API credentials (API Key, API Secret, and Account Number) issued by DHL through the DHL Developer Portal — J2Commerce does not provide these

## Purchase and Download

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) **->** **Extensions**

**Step 2:** Locate the **DHL Express** shipping plugin **->** click **View Details** **-> Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the plugin. Click **Available Versions -> View Files -> Download**

## Install the Plugin

You can install the **DHL Express** shipping plugin using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the `shipping_dhlexpress.zip` package file, or use the **Install from URL** option.

<!-- screenshot: Extensions install screen with the shipping_dhlexpress.zip file selected -->

:::info

DHL Express requires J2Commerce to already be installed. If J2Commerce is missing, the installer stops and tells you to install J2Commerce first.

:::

## Enable the Shipping Method

Shipping plugins are not managed from the Apps screen. DHL Express is enabled and configured from the **Shipping Methods** screen, and it must also be published as a Joomla plugin.

There are **two** ways you can reach the Shipping Methods screen.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Shipping Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Shipping Methods**

<!-- screenshot: Shipping Methods list showing DHL Express Delivery -->

Look for **DHL Express Delivery**, click the **X**, and it will turn into a green checkmark. It is now enabled and ready for setup.

If you don't see it turn green, check **System -> Manage -> Plugins**, filter by **j2commerce**, and confirm **Shipping - DHL Express** is published.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the plugin will show a description below each field as you configure it.

:::

## Configure the Shipping Method

Once you click on the **DHL Express Delivery** title next to the green checkmark, you are ready to start setting up the parameters. The settings are organized into tabs matching the fieldsets below.

### Basic

**Checkout Logo:** Image shown next to the DHL Express delivery option at checkout. A default DHL Express logo is pre-filled — swap it out if you'd rather use your own.

### DHL Credentials

<!-- screenshot: DHL Credentials tab showing API Key, API Secret, Account Number, and Test Mode toggle -->

**Test Mode:** Set **Yes** to call the DHL test endpoint. Set **No** on a live store.

**API Key:** Your DHL MyDHL API key (Basic Auth username). Issued from the DHL Developer Portal.

**API Secret:** Your DHL MyDHL API secret (Basic Auth password).

**DHL Account Number:** Your DHL Express account number — the number tied to your delivery contract, not the API portal account.

:::tip

Start with **Test Mode** set to **Yes** and confirm rates come back correctly before switching to live credentials. All three credential fields — API Key, API Secret, and Account Number — must have been issued together in the DHL Developer Portal, or every rate request will fail.

:::

### Origin & Geo Zone

**Origin Country:** Country your shipments dispatch from. Used as the rate quote origin.

**Origin City:** City your shipments dispatch from. Required by the DHL rate API.

**Unit of Measurement:** Choose **Metric (kg, cm)** or **Imperial (lb, in)**. Must match the units configured on your DHL account.

**Geo Zone:** Restrict DHL Express rates to a Geo Zone. Leave blank to offer DHL on every destination.

:::info

Origin Country and Origin City are both required. Without them, DHL Express silently skips rating at checkout — no error appears to the customer, they simply won't see a DHL option.

:::

### Services

**DHL Service Codes:** Pick the DHL Express services to offer at checkout (for example DOMESTIC EXPRESS 12:00, EXPRESS WORLDWIDE, EXPRESS 9:00). Only rates for the selected service codes will display. Leave empty to allow every service DHL returns for the route.

**Network Type:** Restrict rates to **Air Products (Time Definite)**, **Road Products (Day Definite)**, or **Both Air and Road**. Both is the most permissive setting and the default.

:::tip

Not every DHL service is available on every route or account. If you select a service and never see it at checkout, that service simply wasn't offered by DHL for that particular origin/destination pair — try widening your selection.

:::

### Display & Pricing

**Show Transit Time:** Set **Yes** to display the transit time in business days under each DHL rate.

**Handling Cost:** Optional flat amount added on top of every DHL rate. Use to cover packaging or fulfilment costs. This amount is always added in your store's currency and is never converted.

**Tax Profile:** Tax profile applied to the DHL rate at checkout. Leave blank to skip delivery tax.

**Debug Mode:** Set **Yes** to write rate requests and responses to `administrator/logs/shipping_dhlexpress.php`. Disable on production.

### DHL Waybill / Label

<!-- screenshot: DHL Waybill / Label tab -->

**DHL Product Code:** Fallback DHL Express product/service code used only when the order has no stored product code. Normally the label reuses the exact product the customer was quoted and charged at checkout.

**Label Format:** **PDF** for standard laser/inkjet printing, **ZPL** or **EPL** for thermal label printers.

**Shipper Company Name:** Company or person name printed on the DHL label as the sender. Defaults to your store name if left blank.

**Shipper Phone Number:** Phone number printed on the DHL label for the sender (digits only, no spaces).

**Allowed Order Statuses:** Order statuses on which the **Create Label** button appears. Select one or more; leave empty to show the button on every order.

:::info

DHL Express only lets you create one label per order. Once a tracking number is saved, the **Create Label** button is replaced with the existing tracking number — you have to clear the tracking number on the order before a new label can be created.

:::

### Customs (International)

These fields only matter for cross-border shipments — DHL Express automatically skips customs data for domestic shipments and for shipments moving entirely within the EU customs union.

**Incoterm:** Trade term declared to customs on cross-border shipments. **DAP** (recipient pays duties/taxes) is the common storefront default; **DDP** means you prepay duties and taxes.

**Export Reason:** Reason for export declared on each customs line item. Use **Sale of Goods** for normal orders.

**Country of Manufacture:** Two-letter ISO country code declared as the goods' country of origin (for example `GB`, `DE`, `CN`). Leave blank to use the origin country.

**Default HS / Commodity Code:** Optional Harmonised System (HS) tariff code applied to every export line item. Leave blank if your catalogue has no single shared HS code.

:::tip

If you only ship domestically, or only ship within the country your origin address is in, you can leave the entire Customs tab at its defaults — it will never be sent to DHL.

:::

## How It Works

1. A customer adds shippable products to their cart and reaches the shipping step at checkout.
2. Once the customer has a shipping address on the cart (a saved address, a guest address, or a selected country/postal code), DHL Express builds a package summary — total weight and the largest length, width, and height across all shippable items in the cart.
3. The plugin calls the DHL MyDHL `/rates` API with your account credentials, the origin and destination, and the package details.
4. DHL returns live service options with real prices, service names, and (if enabled) estimated transit times.
5. Each DHL service becomes a shipping option at checkout, filtered to the service codes you selected and priced in your store currency, with your configured handling cost and tax profile applied.
6. After the order is placed, opening the order in the admin shows a **Create Label** button (when the order used DHL Express and is in an allowed status). Clicking it calls the DHL `/shipments` API using the exact same product the customer was quoted, and DHL returns a waybill (label) plus a tracking number, which is saved to the order automatically.

## Display Conditions

**DHL Express rates appear at checkout when:**

- The plugin is enabled in **J2Commerce -> Setup -> Shipping Methods** and published under **System -> Manage -> Plugins**.
- Valid API Key, API Secret, and Account Number are all filled in.
- Origin Country and Origin City are both configured.
- The customer has entered or selected a shipping address (country, city/postal code) — DHL cannot rate without one.
- The shipping destination falls inside the configured **Geo Zone**, if one is set.
- The cart contains at least one shippable item with a weight greater than zero.
- DHL returns at least one service matching your selected **Service Codes** and **Network Type**.

:::note

DHL Express calculates package weight and dimensions from your product variants. Products with no weight set are effectively invisible to the rate calculation — if a cart's shippable items all have zero weight, DHL Express skips rating for that order entirely.

:::

**The Create Label button appears when:**

- The order was placed using DHL Express as its shipping method.
- The order's status is one of the statuses selected in **Allowed Order Statuses** (or that field is left empty, which allows every status).
- No tracking number has been saved to the order yet.

## Tips

- **Test in sandbox first.** Leave **Test Mode** set to **Yes** while you configure the plugin, and only switch to live credentials once rates are coming back correctly.
- **Set weights on every shippable product.** DHL Express can't produce a rate for a cart with zero total weight, and label creation falls back to a minimal placeholder package if it can't find dimensions.
- **Keep a fallback shipping method active.** If DHL credentials expire or the MyDHL API is briefly unavailable, customers with no other shipping option won't be able to check out — keep Standard or Free shipping enabled as a backup.
- **Match your Unit of Measurement to your DHL account.** Mixing metric and imperial between your J2Commerce configuration and your DHL account can produce rates that look wrong even though the request succeeded.
- **Review Allowed Order Statuses before going live.** If left empty, every order shows the Create Label button — restrict it to your confirmed/paid statuses to avoid creating (and being billed for) labels on unpaid orders.

## Troubleshooting

### No DHL rates appear at checkout

**Cause:** Missing or incorrect API credentials, no product weight, an unconfigured origin, or a destination outside the configured Geo Zone.

**Solution:**

1. Confirm the plugin is enabled in **J2Commerce -> Setup -> Shipping Methods** and published under **System -> Manage -> Plugins**.
2. Open the plugin's **DHL Credentials** tab and verify the **API Key**, **API Secret**, and **Account Number** are all filled in and were issued together in the DHL Developer Portal.
3. Open the **Origin & Geo Zone** tab and confirm **Origin Country** and **Origin City** are set.
4. Edit a product in the cart and confirm it has a weight set — a cart where every item has zero weight is skipped.
5. If a **Geo Zone** is configured, confirm the customer's destination country/zone is included in it.
6. Enable **Debug Mode**, retry checkout, and check `administrator/logs/shipping_dhlexpress.php` for the exact DHL error message.

### Rates seem wrong or inconsistent with DHL's website

**Cause:** The store is still in **Test Mode**, the **Unit of Measurement** doesn't match your DHL account's configured units, or a **Handling Cost** is being added on top.

**Solution:**

1. Confirm **Test Mode** is set to **No** once you're ready to go live — test-endpoint rates are not real production pricing.
2. Check **Unit of Measurement** under **Origin & Geo Zone** matches what your DHL account expects (metric vs. imperial).
3. Check the **Handling Cost** field under **Display & Pricing** — any amount there is added on top of every DHL rate.
4. Confirm product weights and dimensions are accurate; the plugin sums item weights and takes the largest dimensions across the cart.

### Labels fail to generate

**Cause:** A DHL label already exists for the order, required shipping address fields are missing, or the customs data is incomplete for an international shipment.

**Solution:**

1. If the order already shows a tracking number, DHL Express refuses to create a second label — clear the tracking number on the order first if you need to regenerate it.
2. Confirm the order's shipping (or billing) address has a city, postal code, and country — DHL rejects shipments with incomplete addresses.
3. For international shipments, check the **Customs (International)** tab: **Incoterm** and **Export Reason** should be set, and a **Default HS / Commodity Code** helps if DHL rejects the shipment for missing commodity data.
4. Enable **Debug Mode** and check `administrator/logs/shipping_dhlexpress.php` — DHL returns the specific field-level problem in the error response.

### The Create Label button doesn't appear on an order

**Cause:** The order's shipping method wasn't DHL Express, the order's status isn't in the plugin's **Allowed Order Statuses** list, or a tracking number already exists.

**Solution:**

1. Confirm the order was placed using **DHL Express Delivery** as its shipping method.
2. Open the plugin's **DHL Waybill / Label** tab and check **Allowed Order Statuses** — if statuses are selected, the order must be in one of them.
3. Check whether the order already has a tracking number saved; if so, the button is replaced by the existing tracking information.

### Debug log grows very large

**Cause:** **Debug Mode** was left enabled on a busy production store.

**Solution:** Open the **Display & Pricing** tab and set **Debug Mode** to **No** once you've finished troubleshooting. Debug logging writes every rate request and response to `administrator/logs/shipping_dhlexpress.php`.
