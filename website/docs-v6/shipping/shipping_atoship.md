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

## Create an AtoShip Account

Before configuring the plugin you need an AtoShip API key. Account creation is free and takes about two minutes.

1. Go to [atoship.com](https://atoship.com) and click **Create a FREE account**.
2. Complete the registration form. No credit card is required.
3. Once logged in, Click on your profile at the bottom left corner **-> My Account -> API Key** tab **-> Add API Key**

   ![](/img/ato-api.webp)
4. Pop-up window: Enter your company name **-> copy** your **Sandbox API key** (starts with `ak_test_`) for testing, or your Production API Key (**Live API key)** (starts with `ak_live_`)

\*\*Keep both keys handy — you will enter them in the plugin settings below.&#x20;

## Purchase and Download the Plugin

‌**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extension

**Step 2:** Locate the **AtoShip** Extension > click View Details > Add to cart > Checkout.&#x20;

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

## Enable the Plugin

&#x20;Look for **AtoShip**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/atoship-enable.webp)

## Configure the Plugin

Once you click on the **AtoShip** Title next to the green checkmark, you are ready to start setting up the parameters.

**Helpful Tip:** Click on the **Toggle Inline Help** button on any app/plugin you install and it will show a description below each section. See image below

![](/img/atoship-toggle.webp)

### API Credentials

![](/img/atoship-config.webp)

Sandbox Mode: When enabled, the plugin uses your test API key and returns demo rates. Disable this before going live.

**Sandbox API Key:** Your AtoShip test key (`ak_test_...`). Only visible when Sandbox Mode is on.

**Live API Key:** Your AtoShip live key (`ak_live_...`). Only visible when **Sandbox Mode is off.**

Start with **Sandbox Mode** enabled. Enter your sandbox key, save, and test the checkout flow. Switch to the live key when you are ready to accept real orders.

### Ship-From Address

These fields define where your packages originate. The AtoShip API uses this address to calculate rates and print labels.

**Ship-From Address:** Street address of your warehouse or fulfilment location

**Ship-From City:** City of the origin address

**Ship-From Country:** Country of the origin address

**Ship-From State/Province:** State or province (updates automatically when you change the country)

**Ship-From Postal Code:** ZIP or postal code of the origin address

All five fields are required. Save the plugin after filling it in — the service discovery tool relies on this address.

### Allowed Carriers

![](/img/atoship-config5.webp)

Click the carrier logos to enable or disable each carrier. Only rates from enabled carriers will appear at checkout.

Available carriers: **USPS**, **UPS**, **FedEx**, **DHL**.

Click **Discover Available Services**. The tool retrieves all available services and displays checkboxes. Select the services you want to offer at checkout, then save the plugin.

![](/img/atoship-config2.webp)

If no services appear in live mode, verify that your AtoShip account has at least one carrier account connected in the AtoShip dashboard.

### Service Discovery

After saving your Ship-From address, use the **Discover Available Services** button to fetch a live rate quote and see which services your AtoShip account can offer.

**Test Destination ZIP:** Postal code used for the discovery rate quote

**Test Destination Country:** Country used for the discovery rate quote

### Package Defaults

![](/img/atoship-config3.webp)

These values are used when a product does not have its own weight or dimensions set.

**Weight Unit:** `lb` or `kg` — must match the units on your products

**Dimension Unit:** `in` or `cm` — must match the units on your products

**Default Weight:** Fallback weight for products without a weight

**Default Length:** Fallback package length

**Default Width:** Fallback package width

**Default Height:** Fallback package height

For the most accurate rates, set real weights and dimensions on **each product** in **J2Commerce** **->** **Catalog** -> **Products**.

### Rate Options

![](/img/atoship-config1.webp)

**Handling Fee:** An extra amount is added to every shipping rate returned

**Handling Fee Type: Flat Amount** adds a fixed dollar amount; **Percentage** adds a percentage of the carrier rate

**Show Delivery Time:** Displays estimated business days next to each rate at checkout

**Tax Profile:** Applies a J2Commerce tax profile to the shipping charge

**Geozone:** Restricts this plugin to orders shipping within the selected geozone

**Minimum Order Subtotal:** Only show AtoShip rates when the cart subtotal meets this minimum (set to `0` to disable)

**Maximum Order Subtotal:** Only show AtoShip rates when the cart subtotal is below this maximum (set to `0` to disable)

### Label and Tracking Settings

![](/img/atoship-config4.webp)

**Shipped Order Status:** Automatically sets the order to this status when a tracking number is added

**Delivered Order Status:** Automatically sets the order to this status when AtoShip reports delivery

**Notify Customer on Delivery:** Sends the customer an email when the package is marked delivered

**Webhook Secret:** Secret key from your AtoShip webhook configuration. Required for automatic delivery status updates.

**Webhook Secret:** Secret key from your AtoShip webhook configuration. Required for automatic delivery status updates.

**Tracking Poll Limit:** Maximum number of shipments to check per cron run

### Debug Mode

Enable debug mode temporarily if rates are not appearing or labels fail to create. Disable it in production.

**Debug Mode:** Writes detailed API request and response logs to `administrator/logs/shipping_atoship.php`

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

## Frontend View

![](/img/ato-checkout1.webp)

## Creating Shipping Labels

When an order uses an AtoShip option as the shipping method (not Free Shipping), a **Create Shipping Label** button appears on the order edit screen.

![](/img/ato-checkout2.webp)

1. Open the order from **J2Commerce** **->** **Sales -> Orders**.
2. Click **Create Shipping Label**.
3. In the modal that opens, confirm or adjust the **Carrier**, **Service**, and **Package Details** (weight, length, width, height).
4. Optionally enable **Include Insurance** and enter an insured value.
5. Click **Create Shipping Label** to purchase the label from AtoShip.

Once created, the order history records the tracking number and the label URL appears as **View Label** and **Print Label** buttons on the order screen.

To cancel a label, click **Void Label**. You can then create a new label if needed.

### Batch Label Creation

From the orders list in **J2Commerce ->** **Orders**, select multiple orders and use the **Create AtoShip Labels** batch action to purchase labels for all selected orders at once. Batches of more than 10 orders are queued automatically.

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

### **The Green Create a Shipping Label doesn't appear**&#x20;

**Cause:** The **order status** in the payment method is not set as **Confirmed**

**Solution:**

1. Go to **J2Commerce -> Setup -> Payment Method**

2. Go into each payment method option and change the **Order Status** from **Pending** to **Confirmed**

   ![](/img/payment-pending2.webp)

3. Go back into the customer's order (**J2Commerce -> Sales -> Orders)**&#x20;

4. Switch the status from Pending to Confirmed&#x20;

5. Click on the Save button next to the status

   ![](/img/payment-pending1.webp)

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
