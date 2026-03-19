# AtoShip Multi-Carrier Shipping

The AtoShip plugin connects J2Commerce to the [AtoShip](https://atoship.com) shipping platform, giving your store real-time carrier rates at checkout, one-click label creation from the order screen, and automatic tracking updates. A single AtoShip account gives you access to USPS, UPS, FedEx, and DHL under one API key.

## Requirements

- with PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x

## Prerequisites

- An AtoShip account (free — no credit card required)
- Products with weights configured in J2Commerce
- Shipping zones and a geo-zone are configured if you want to restrict availability by region

## Purchase and Download

‌**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extension

**Step 2:** Locate the AtoShip Extension > click View Details > Add to cart > Checkout.&#x20;

**Step 3:** Go to your My Downloads under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download

## Install the Plugin

Go to **System** -> **Install** -> **Extensions**.

Upload the `shipping_atoship.zip` package file

![](/img/ato-install.webp)

## Configure the Plugin

The plugin installs and enables automatically. All you have to do now is set it up.

There are **two** ways you can access the Plugin.&#x20;

**a:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Shipping Methods**

**b:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Shipping Methods**

![](/img/atoship-app.webp)

## Create an AtoShip Account

Before configuring the plugin you need an AtoShip API key. Account creation is free and takes about two minutes.

1. Go to [atoship.com](https://atoship.com) and click **Create a FREE account**.
2. Complete the registration form. No credit card is required.
3. Once logged in, open the **API Keys** section of your dashboard.
4. Copy your **Sandbox API key** (starts with `ak_test_`) for testing, or your **Live API key** (starts with `ak_live_`) for production.

<!-- SCREENSHOT: AtoShip dashboard API Keys section showing sandbox and live keys -->

Keep both keys handy — you will enter them in the plugin settings below.

## Plugin Configuration

Open the plugin settings from **J2Commerce** -> **Shipping** -> **Shipping Methods** -> **AtoShip Multi-Carrier Shipping**.

### API Credentials

| Field               | Description                                                                                             | Default |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ------- |
| **Sandbox Mode**    | When enabled, the plugin uses your test API key and returns demo rates. Disable this before going live. | Yes     |
| **Live API Key**    | Your AtoShip live key (`ak_live_...`). Only visible when Sandbox Mode is off.                           | —       |
| **Sandbox API Key** | Your AtoShip test key (`ak_test_...`). Only visible when Sandbox Mode is on.                            | —       |

Start with **Sandbox Mode** enabled. Enter your sandbox key, save, and test the checkout flow. Switch to the live key when you are ready to accept real orders.

### Ship-From Address

These fields define where your packages originate. The AtoShip API uses this address to calculate rates and print labels.

| Field                        | Description                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| **Ship-From Address**        | Street address of your warehouse or fulfilment location               |
| **Ship-From City**           | City of the origin address                                            |
| **Ship-From Country**        | Country of the origin address                                         |
| **Ship-From State/Province** | State or province (updates automatically when you change the country) |
| **Ship-From Postal Code**    | ZIP or postal code of the origin address                              |

All five fields are required. Save the plugin after filling them in — the service discovery tool relies on this address.

<!-- SCREENSHOT: AtoShip plugin settings showing Ship-From Address section filled in -->

### Allowed Carriers

Click the carrier logos to enable or disable each carrier. Only rates from enabled carriers will appear at checkout.

Available carriers: **USPS**, **UPS**, **FedEx**, **DHL**.

### Service Discovery

After saving your Ship-From address, use the **Discover Available Services** button to fetch a live rate quote and see which services your AtoShip account can offer.

| Field                        | Description                                   | Default |
| ---------------------------- | --------------------------------------------- | ------- |
| **Test Destination ZIP**     | Postal code used for the discovery rate quote | `10001` |
| **Test Destination Country** | Country used for the discovery rate quote     | —       |

Click **Discover Available Services**. The tool retrieves all available services and displays checkboxes. Select the services you want to offer at checkout, then save the plugin.

<!-- SCREENSHOT: Discover Available Services panel showing a list of services with checkboxes -->

If no services appear in live mode, verify your AtoShip account has at least one carrier account connected in the AtoShip dashboard.

### Package Defaults

These values are used when a product does not have its own weight or dimensions set.

| Field              | Description                                          | Default |
| ------------------ | ---------------------------------------------------- | ------- |
| **Weight Unit**    | `lb` or `kg` — must match the units on your products | —       |
| **Dimension Unit** | `in` or `cm` — must match the units on your products | —       |
| **Default Weight** | Fallback weight for products without a weight        | `1`     |
| **Default Length** | Fallback package length                              | `10`    |
| **Default Width**  | Fallback package width                               | `10`    |
| **Default Height** | Fallback package height                              | `10`    |

For the most accurate rates, set real weights and dimensions on each product in **J2Commerce** -> **Catalog** -> **Products**.

### Rate Options

| Field                      | Description                                                                                      | Default      |
| -------------------------- | ------------------------------------------------------------------------------------------------ | ------------ |
| **Handling Fee**           | Extra amount added to every shipping rate returned                                               | `0`          |
| **Handling Fee Type**      | **Flat Amount** adds a fixed dollar amount; **Percentage** adds a percentage of the carrier rate | Flat Amount  |
| **Show Delivery Time**     | Displays estimated business days next to each rate at checkout                                   | Yes          |
| **Tax Profile**            | Applies a J2Commerce tax profile to the shipping charge                                          | None         |
| **Geozone**                | Restricts this plugin to orders shipping within the selected geozone                             | All Geozones |
| **Minimum Order Subtotal** | Only show AtoShip rates when the cart subtotal meets this minimum (set to `0` to disable)        | `0`          |
| **Maximum Order Subtotal** | Only show AtoShip rates when the cart subtotal is below this maximum (set to `0` to disable)     | `0`          |

### Label and Tracking Settings

| Field                           | Description                                                                                         | Default     |
| ------------------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| **Shipped Order Status**        | Automatically sets the order to this status when a tracking number is added                         | Status ID 7 |
| **Delivered Order Status**      | Automatically sets the order to this status when AtoShip reports delivery                           | Status ID 8 |
| **Notify Customer on Delivery** | Sends the customer an email when the package is marked delivered                                    | No          |
| **Webhook Secret**              | Secret key from your AtoShip webhook configuration. Required for automatic delivery status updates. | —           |
| **Tracking Poll Limit**         | Maximum number of shipments to check per cron run                                                   | `50`        |

### Debug Mode

| Field          | Description                                                                                | Default |
| -------------- | ------------------------------------------------------------------------------------------ | ------- |
| **Debug Mode** | Writes detailed API request and response logs to `administrator/logs/shipping_atoship.php` | No      |

Enable debug mode temporarily if rates are not appearing or labels fail to create. Disable it in production.

## Webhook Setup (Optional)

Webhooks allow AtoShip to push delivery events to your store automatically, so order statuses update without waiting for the cron job.

1. In the AtoShip dashboard, open **Settings** -> **Webhooks**.
2. Create a new webhook endpoint using this URL format:

```
https://your-site.com/index.php?option=com_j2commerce&task=shipping.pluginAjax&plugin=shipping_atoship&action=processWebhook
```

1. Enable these events: `shipment.tracking_updated`, `label.created`, `label.failed`, `order.cancelled`.
2. Copy the webhook **Secret** from AtoShip and paste it into the **Webhook Secret** field in the plugin settings.
3. Save the plugin.

<!-- SCREENSHOT: AtoShip dashboard Webhooks settings showing the endpoint URL and event checkboxes -->

## Creating Shipping Labels

When an order uses AtoShip as the shipping method, a **Create Shipping Label** button appears on the order edit screen.

<!-- SCREENSHOT: J2Commerce order edit screen showing the AtoShip Create Shipping Label button -->

1. Open the order from **J2Commerce** -> **Orders**.
2. Click **Create Shipping Label**.
3. In the modal that opens, confirm or adjust the **Carrier**, **Service**, and **Package Details** (weight, length, width, height).
4. Optionally enable **Include Insurance** and enter an insured value.
5. Click **Create Shipping Label** to purchase the label from AtoShip.

Once created, the order history records the tracking number and the label URL appears as **View Label** and **Print Label** buttons on the order screen.

To cancel a label, click **Void Label**. You can then create a new label if needed.

### Batch Label Creation

From the orders list in **J2Commerce** -> **Orders**, select multiple orders and use the **Create AtoShip Labels** batch action to purchase labels for all selected orders at once. Batches of more than 10 orders are queued automatically.

## Tracking

The tracking panel on each order edit screen shows all labels for that order, including:

- Carrier and service name
- Tracking number (links directly to the carrier tracking page)
- Label status (`created`, `purchased`, `voided`)
- Tracking status (`in_transit`, `out_for_delivery`, `delivered`, etc.)
- Label type (outbound or return)
- Carrier rate charged

Click **Refresh Tracking** to pull the latest status from AtoShip immediately. The cron job also polls tracking automatically based on the **Tracking Poll Limit** setting.

## Checking Your AtoShip Balance

Before creating a label, the plugin checks your AtoShip account balance. If the balance is insufficient to cover the label cost, a warning appears with a link to the AtoShip billing dashboard to add funds.

## Troubleshooting

### No shipping rates appear at checkout

**Cause:** The plugin cannot reach the AtoShip API, the origin address is incomplete, or no carriers are enabled.

**Solution:**

1. Check that **Sandbox Mode** is on and your sandbox API key is entered correctly.
2. Verify all five Ship-From address fields are filled in and the plugin is saved.
3. Confirm at least one carrier is selected in **Allowed Carriers**.
4. Enable **Debug Mode** and attempt checkout. Check `administrator/logs/shipping_atoship.php` for the API response.

### Service discovery returns no services

**Cause:** Your AtoShip account does not yet have a carrier account linked, or the test destination ZIP is invalid.

**Solution:** Log in to your AtoShip dashboard and connect at least one carrier account under **Carriers**. Then return to the plugin settings, verify the **Test Destination ZIP**, and click **Discover Available Services** again.

### Label creation fails with "Insufficient Balance"

**Cause:** Your AtoShip account credit balance is lower than the cost of the label.

**Solution:** Click **Add Funds in AtoShip Dashboard** in the warning message, top up your account, and try again.

### Order status does not update to "Shipped" after label creation

**Cause:** The **Shipped Order Status** field is set to a status ID that does not exist, or the setting is blank.

**Solution:** Go to plugin settings and select a valid order status in the **Shipped Order Status** field, then save.

### Delivery status never updates automatically

**Cause:** The webhook is not configured, or the cron job is not running.

**Solution:** Either configure the webhook URL in the AtoShip dashboard (see [Webhook Setup](#webhook-setup-optional) above), or ensure Joomla's Task Scheduler is running so the tracking poll cron executes regularly.

##
