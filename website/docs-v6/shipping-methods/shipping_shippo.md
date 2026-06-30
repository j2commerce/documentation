---
title: "Shippo Shipping"
sidebar_label: "Shippo"
sidebar_position: 56
description: "Live multi-carrier shipping rates at checkout plus label purchase, voiding, and shipment tracking via the Shippo API."
---

# Shippo Shipping

The Shippo Shipping plugin connects your J2Commerce store to [Shippo](https://goshippo.com/), a multi-carrier shipping platform that works with USPS, UPS, FedEx, DHL Express, Canada Post, and dozens of other carriers through a single account. At checkout, customers see real-time rates pulled directly from your connected carrier accounts. After an order is placed, you can buy and print a shipping label without leaving the J2Commerce order view, void a label if plans change, and refresh tracking status on demand — or let the cron task update everything automatically.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x
- A [Shippo account](https://goshippo.com/) (free tier available)
- At least one carrier account connected in your Shippo Dashboard (USPS, UPS, FedEx, etc.)
- A Shippo API token (test or live)

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) **->** **Extensions**.

**Step 2:** Locate **Shippo Shipping** **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile at the top-right corner, search for the plugin, click **Available Versions** **->** **View Files** **->** **Download Now**.

## Install the Plugin

In the Joomla administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the plugin ZIP file or use the **Install from URL** option.

## Enable the Plugin

Once installed, find and enable the plugin. There are two ways to reach the shipping methods list:

**Option A:** Click the **J2Commerce** icon at the top right corner **->** **Shipping**

**Option B:** Go to **Components** **->** **J2Commerce** **->** **Shipping**

Look for **Shippo**, click the red **X**, and it turns into a green checkmark. The plugin is now enabled and ready to configure.

## Configure the Plugin

Click the **Shippo** title next to the green checkmark to open the settings screen.

:::tip

Click **Toggle Inline Help** in the toolbar to display a description below every field as you configure it.

:::

The settings are grouped into seven tabs. Work through them top to bottom the first time you set up the plugin.

---

### API Credentials

| Field | Description | Default |
|-------|-------------|---------|
| **Test Mode** | When enabled, the plugin uses your test API token and processes test shipments only. Turn this off when you are ready to go live. | Yes |
| **Live API Token** | Your Shippo live API key. Shown only when Test Mode is off. Starts with `shippo_live_`. | — |
| **Test API Token** | Your Shippo test API key. Shown only when Test Mode is on. Starts with `shippo_test_`. | — |

#### Getting your Shippo API token

1. Log in to your [Shippo Dashboard](https://apps.goshippo.com/).
2. Click your account name in the top-right corner **->** **API**.
3. Under **API Keys**, copy the key that matches the mode you need — the live key starts with `shippo_live_` and the test key starts with `shippo_test_`.
4. Paste the key into the matching field in the plugin settings and click **Save**.

---

### Origin Address

These fields define where your packages ship from. This address appears on all outbound labels.

| Field | Description |
|-------|-------------|
| **Address Source** | Choose **Use Store Address** to pull the address you already set in J2Commerce configuration, or **Add New Address** to enter a different pickup location. |
| **Sender Name** | Name printed on outbound labels. |
| **Company** | Optional company name for the sender address. |
| **Street Address** | Pickup or shipper street address. |
| **City** | Origin city. |
| **State / Province** | Origin state or province. |
| **Postal Code** | Origin ZIP or postal code. |
| **Country** | Origin country. |
| **Phone** | Sender phone number. Some carriers require this. |
| **Email** | Sender email address. |

:::info

If you choose **Use Store Address**, the plugin reads your store address directly from J2Commerce configuration. You do not need to fill in the individual fields below it.

:::

---

### Carriers and Services

This tab controls which carriers and services appear at checkout.

| Field | Description |
|-------|-------------|
| **Allowed Carriers** | Select the carriers you want to show rates for. Leave all options selected to display every carrier connected to your Shippo account. |
| **Test Destination ZIP** | ZIP or postal code used when running Service Discovery (see below). |
| **Test Destination Country** | Country used when running Service Discovery. |
| **Service Discovery** | Click **Discover Services** to fetch the full list of services available from your connected carrier accounts. Check the services you want to offer at checkout, then save. |

**How Service Discovery works:** When you click **Discover Services**, the plugin asks Shippo for every service level across all your connected carrier accounts. You check the ones you want, save the plugin, and those are the only services shown to customers at checkout. If you leave nothing checked, all available services are shown.

---

### Package Defaults

These values are used when a product does not have weight or dimensions set. The plugin sums the weight of all items in the cart and uses the largest single dimension for length, width, and height.

| Field | Description | Default |
|-------|-------------|---------|
| **Weight Unit** | Unit for package weight. Must match the weight unit set on your products. | — |
| **Default Weight** | Weight applied per item when a product has no weight set. | 1.0 |
| **Dimension Unit** | Unit for package dimensions. | — |
| **Default Length** | Box length when product dimensions are not set. | 10 |
| **Default Width** | Box width when product dimensions are not set. | 10 |
| **Default Height** | Box height when product dimensions are not set. | 10 |

:::tip

Set your product weights in J2Commerce **->** **Catalog** **->** **Products** for the most accurate rates. The default weight is a fallback — correct product weights always take priority.

:::

---

### Rate Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Handling Fee** | A fixed or percentage amount added to every carrier rate before it is shown to the customer. Enter `0` to skip. | 0 |
| **Handling Fee Type** | **Flat Amount** adds the same dollar amount to every rate. **Percentage** adds a percentage of the carrier rate. | Flat Amount |
| **Show Estimated Days** | When enabled, the estimated transit time (for example, "3 business days") is appended to the rate name at checkout. | Yes |
| **Tax Profile** | Select a tax profile to apply sales tax on shipping. Leave on **No Tax** for tax-free shipping. | No Tax |
| **Geo Zone** | Restrict Shippo rates to a specific geo zone. Leave on **All Zones** to show rates worldwide. | All Zones |
| **Minimum Order Subtotal** | Only show rates when the cart subtotal is at or above this amount. Leave blank for no minimum. | — |
| **Maximum Order Subtotal** | Only show rates when the cart subtotal is at or below this amount. Leave blank for no maximum. | — |

---

### Fulfillment

These settings control label creation, tracking, and automatic order status changes.

| Field | Description | Default |
|-------|-------------|---------|
| **Label Format** | File format for generated labels. Choose **PDF** for standard printers, **PDF 4x6** for thermal label printers (4-inch × 6-inch), **PNG** for image labels, or **ZPL II** for Zebra and compatible thermal printers. | PDF |
| **Order Status on Label Created** | The order is automatically moved to this status when you purchase a label. Choose **Keep Current Status** to leave the status unchanged. | Keep Current Status |
| **Order Status on Delivery** | The order is automatically moved to this status when tracking confirms delivery. Choose **Keep Current Status** to leave the status unchanged. | Keep Current Status |
| **Notify Customer on Delivery** | When enabled, J2Commerce fires the delivery notification email when tracking status changes to delivered. | No |
| **Webhook Token** | A security token you create yourself. Append `&token=[your-value]` to the webhook URL you register in Shippo. Requests without the matching token are rejected. Leave blank to accept all webhook requests (not recommended). | — |
| **Webhook HMAC Secret** | Enterprise feature only. Leave blank unless Shippo support has set up HMAC webhook signing for your account (takes approximately 10 business days). Use the **Webhook Token** field for standard security instead. | — |
| **Tracking Poll Limit** | Maximum number of pending labels checked per cron run. Increase if you have high order volume. | 50 |

---

### Debug

| Field | Description | Default |
|-------|-------------|---------|
| **Debug Logging** | When enabled, all API calls and errors are written to a `shipping_shippo.php` log file. Turn this off in production — it generates a large log and may expose API details. | No |

---

## How It Works

1. **Customer enters their shipping address at checkout.** The plugin checks whether the address falls within your configured geo zone (if any) and whether the cart subtotal is within your minimum and maximum limits.

2. **The plugin calls the Shippo API.** It sends your origin address, the customer's destination, and the parcel dimensions and weight to Shippo and receives a list of live carrier rates in return.

3. **Rates are filtered and displayed.** Only carriers and services you have enabled appear in the list. If you set a handling fee, it is added to each rate before display. If **Show Estimated Days** is on, the transit time appears next to the rate name.

4. **The customer selects a rate and places the order.** The chosen carrier, service, and rate are saved with the order.

5. **You open the order in the J2Commerce admin.** A **Shippo Shipping Labels** panel appears at the bottom of the order details. Click **Create Label** to open a modal where you can select the carrier and service, confirm or adjust the package dimensions, and see the live label price before committing.

6. **You purchase the label.** Shippo charges the label cost to your Shippo account. The tracking number and a link to the label PDF appear in the panel. If you set an **Order Status on Label Created**, the order moves to that status automatically.

7. **The customer receives a tracking link.** When J2Commerce sends a status-change email for the shipped or delivered status, the tracking number and a direct link to the carrier tracking page are included in the email automatically.

8. **Tracking updates automatically.** The J2Commerce cron task polls Shippo for tracking updates on all open labels (up to the **Tracking Poll Limit** per run). You can also click **Refresh Tracking** on an individual order at any time. When a shipment is marked delivered, the order moves to the **Order Status on Delivery** status and — if enabled — fires the delivery notification email.

9. **If you need to cancel a label**, click **Void** next to the label in the order panel. Voided labels are marked in the panel so you have a clear record.

---

## Display Conditions

Shippo rates appear at checkout only when all of the following are true:

- The plugin is enabled in **J2Commerce** **->** **Shipping**.
- A valid API token (test or live) is saved.
- An origin address with at least a postal code is configured, or your J2Commerce store address is complete.
- The cart contains at least one shippable product.
- The customer's destination address (or at minimum, their country) is known.
- The customer's destination falls within the configured **Geo Zone** (or **All Zones** is selected).
- The cart subtotal meets the **Minimum Order Subtotal** (if set) and does not exceed the **Maximum Order Subtotal** (if set).

---

## Tips

- **Connect carriers in Shippo before saving the plugin.** The **Allowed Carriers** dropdown and **Service Discovery** both read from your connected Shippo carrier accounts. If no carriers are connected, you will see a default list rather than your actual accounts.

- **Run Service Discovery after adding a new carrier.** Click **Discover Services** whenever you add or remove a carrier account in Shippo to refresh the available service list.

- **Use Test Mode until you are ready to ship.** Test mode uses test credentials and generates fake labels. No real postage is charged. Switch to your live API token only when you are ready to process real orders.

- **Set real product weights.** Accurate weights lead to accurate rates. The default weight is only a fallback for products where no weight is set.

- **PDF 4x6 is the standard format for thermal label printers** (Dymo, Zebra, Rollo, etc.). If you print on a regular inkjet or laser printer, use standard **PDF**.

- **The label modal lets you re-quote.** If you want to check the price before committing, open **Create Label**, change the weight or dimensions, click **Update Rates**, and review the live rates before confirming.

---

## Troubleshooting

### No Shippo rates appear at checkout

**Cause:** The API token is missing or incorrect, the origin address is incomplete, or no services are enabled.

**Solution:**

1. Go to **J2Commerce** **->** **Shipping**, click **Shippo** to open the settings.
2. Confirm **Test Mode** is set correctly and the matching API token (test or live) is filled in.
3. Check the **Origin Address** tab — at minimum, a postal code and country must be set (or **Use Store Address** must point to a complete store address).
4. Open the **Carriers and Services** tab. If you have run **Service Discovery**, confirm at least one service is checked. If the list is empty, check your Shippo Dashboard to ensure at least one carrier account is active.
5. Enable **Debug Logging** temporarily, clear the Joomla cache, and attempt a checkout. Review the log at **System** **->** **Logs** for any API error messages, then disable debug logging again.

---

### "Invalid API token" error or no rates returned after entering a token

**Cause:** The token was entered for the wrong mode, or the token was copied incorrectly.

**Solution:**

1. Confirm **Test Mode** is **Yes** if you are using a `shippo_test_` token, or **No** if you are using a `shippo_live_` token.
2. Log in to your [Shippo Dashboard](https://apps.goshippo.com/) **->** **API** and copy the full token again, including the `shippo_test_` or `shippo_live_` prefix.
3. Paste the token into the correct field, click **Save**, and test checkout again.

---

### Labels will not generate from the order view

**Cause:** The order was not placed with Shippo as the shipping method, or the origin address is incomplete.

**Solution:**

1. Open the order in **J2Commerce** **->** **Sales** **->** **Orders**. The **Shippo Shipping Labels** panel only appears on orders where the customer chose a Shippo rate at checkout.
2. Check the **Origin Address** settings — all fields must be complete for label creation.
3. If you see an error in the label modal, enable **Debug Logging**, try again, and check the log for details.

---

### Tracking status is not updating

**Cause:** The J2Commerce cron task is not running, or the tracking number has not yet been picked up by the carrier.

**Solution:**

1. Verify the Joomla cron task is configured. Go to **System** **->** **Scheduled Tasks** and confirm the J2Commerce task is active and running on schedule.
2. Click **Refresh Tracking** directly on the order to trigger an immediate update for that order.
3. Allow some time after label purchase — carriers can take several hours to register a tracking number in their system.

---

### Webhook delivery status events are not arriving

**Cause:** The webhook URL is not registered in Shippo, or the token does not match.

**Solution:**

1. In your [Shippo Dashboard](https://apps.goshippo.com/), go to **API** **->** **Webhooks** and confirm a webhook is registered pointing to your site.
2. The webhook URL follows this pattern: `https://[your-site]/index.php?option=com_ajax&plugin=Shipping_shippo&group=j2commerce&task=webhook&format=raw`. If you set a **Webhook Token**, append `&token=[your-value]` to that URL.
3. Make sure the **Webhook Token** in the plugin settings exactly matches the `token` value in the URL you registered in Shippo.
