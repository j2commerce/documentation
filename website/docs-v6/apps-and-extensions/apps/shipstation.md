---
title: "ShipStation Integration"
sidebar_label: "ShipStation"
sidebar_position: 50
description: "Connect J2Commerce to ShipStation (Auctane) for order fulfillment. Push orders automatically, receive tracking numbers via webhook, and manage shipments from your Joomla admin."
---

# ShipStation Integration

ShipStation (by Auctane) is a web-based shipping platform that connects to carriers like FedEx, UPS, USPS, and DHL. Once linked to your J2Commerce store, the plugin automatically sends new orders to ShipStation for fulfillment, and pulls tracking numbers back into your orders when packages ship.

The integration works in three directions:

- **Automatic push** — orders move to ShipStation when payment is confirmed or when an order reaches a specific status.
- **Batch cron** — a scheduled task groups orders by customer and address, then sends them as a batch.
- **Webhook + on-demand pull** — ShipStation notifies your site when a label is created, and you can also request tracking data manually from the order admin panel.

## Prerequisites

- J2Commerce 6.0 or later
- Joomla 6.0 or later with the Joomla Task Scheduler enabled
- An active ShipStation account (trial accounts work during setup)
- HTTPS on your site (required for ShipStation webhooks)

## Purchase and Download

The **ShipStation Integration** is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to [www.j2commerce.com](https://www.j2commerce.com) and find **ShipStation Integration** in the Apps section.
2. Add it to your cart, complete checkout, and go to **My Downloads** in your account.
3. Click **Available Versions** -> **View Files** -> **Download** to get the zip file.

## Installation

1. In the Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Upload the `plg_j2commerce_app_shipstation.zip` file.
3. The plugin installs and activates automatically.

<!-- SCREENSHOT: Joomla Extension Manager with the shipstation zip file selected in the upload area -->

## Get Your ShipStation API Credentials

Before configuring the plugin, retrieve your API key and secret from ShipStation:

1. Log in to your ShipStation account at [app.shipstation.com](https://app.shipstation.com).
2. Click your account name in the top-right corner -> **Account Settings**.
3. In the left sidebar, click **API Settings**.
4. Copy the **API Key** and **API Secret** shown on that page.

<!-- SCREENSHOT: ShipStation Account Settings - API Settings page showing the API Key and API Secret fields -->

Keep this browser tab open — you will need both values in the next step.

## Enable and Configure the Plugin

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

### Open the Plugin Settings

Go to **J2Commerce** -> **Apps**. Search for **ShipStation Integration**, click the status toggle to enable it, then click the plugin title to open its settings.

<!-- SCREENSHOT: J2Commerce Apps list with ShipStation Integration shown, status toggled on -->

The settings are organised into five tabs: **Connection**, **Order Status Mapping**, **Custom Fields**, **Shipping Mappings**, and **Advanced**.

***

### Connection Tab

<!-- SCREENSHOT: ShipStation plugin - Connection tab showing API Key, API Secret, Webhook Token, and Webhook URL fields -->

| Field             | Description                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API Key**       | Paste the API Key from your ShipStation account settings.                                                                                                            |
| **API Secret**    | Paste the API Secret from your ShipStation account settings.                                                                                                         |
| **Webhook Token** | Enter a random 32-character string. This is a secret you generate — not something ShipStation provides. Use a password manager or an online random-string generator. |
| **Webhook URL**   | Read-only. This URL appears automatically after you save the plugin with a webhook token. Copy it into ShipStation as described below.                               |

After filling in the API Key, API Secret, and Webhook Token, click **Save** to reveal the **Webhook URL**.

***

### Order Status Mapping Tab

<!-- SCREENSHOT: ShipStation plugin - Order Status Mapping tab -->

| Field                       | Description                                                                                                                                               | Default |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Allowed Order Statuses**  | Multi-select. Orders in these statuses are eligible to sync with ShipStation. Add every status you want included — for example, Confirmed and Processing. | None    |
| **Batch Trigger Status**    | Orders in this single status are picked up by the cron job and sent as a batch, grouped by customer and shipping address.                                 | —       |
| **Status After Submission** | The status J2Commerce sets on an order immediately after it is successfully submitted to ShipStation.                                                     | —       |
| **Shipped Order Status**    | The status J2Commerce sets when a tracking number arrives from ShipStation.                                                                               | —       |

A typical setup looks like this:

- **Allowed Order Statuses:** Processing
- **Batch Trigger Status:** Processing
- **Status After Submission:** Shipped (pending tracking)
- **Shipped Order Status:** Shipped

***

### Custom Fields Tab

ShipStation supports three custom text fields per order. Map them to your J2Commerce address or checkout custom fields here.

<!-- SCREENSHOT: ShipStation plugin - Custom Fields tab showing three dropdown selectors -->

| Field              | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| **Mapped Field 1** | Select a J2Commerce custom field to send as ShipStation custom field 1. |
| **Mapped Field 2** | Select a J2Commerce custom field to send as ShipStation custom field 2. |
| **Mapped Field 3** | Select a J2Commerce custom field to send as ShipStation custom field 3. |

For example, if you have a checkout field called "Company Name", map it to Mapped Field 1 so it appears in the ShipStation order details.

***

### Shipping Mappings Tab

When J2Commerce submits an order to ShipStation, it passes the shipping method name the customer selected. This tab lets you tell ShipStation which carrier and service level to use for each method.

<!-- SCREENSHOT: ShipStation plugin - Shipping Mappings tab showing textarea and ground shipping fields -->

**Shipping Mappings** — Enter one mapping per line using the pipe `|` character as a separator:

```
Free Shipping|FedEx - Ground
Standard Shipping|USPS - Priority Mail
Express Shipping|FedEx - Priority Overnight
```

The left side is the exact name of your J2Commerce shipping method. The right side is the ShipStation carrier and service level name exactly as it appears in ShipStation.

| Field                            | Description                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Shipping Mappings**            | One mapping per line. Format: `J2Commerce method name\|Carrier - Service Level`                                                          |
| **Force Ground Shipping States** | Comma-separated two-letter US state codes that always use ground shipping, regardless of what the customer selected. Example: `FL,TX,TN` |
| **Ground Shipping Service**      | The carrier and service to use for forced-ground states. Example: `FedEx - Ground`                                                       |

***

### Advanced Tab

| Field          | Description                                                                                                                                              | Default |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Debug Mode** | When enabled, all ShipStation API activity is written to `administrator/logs/plg_j2commerce_app_shipstation.log.php`. Turn this on when troubleshooting. | No      |

***

## Set Up the Webhook in ShipStation

After saving the plugin with a webhook token, the **Webhook URL** field displays a URL. You need to register this URL in ShipStation so it receives tracking updates automatically.

1. In ShipStation, go to **Account Settings** -> **Integrations** -> **Webhooks**.
2. Click **+ Add Webhook**.
3. Set **Event** to **Item Shipped** (or **Ship Notify** in some ShipStation plans).
4. Paste your **Webhook URL** into the **URL to Post To** field.
5. Click **Save**.

<!-- SCREENSHOT: ShipStation Webhooks settings page with a new webhook being added, showing the URL field and event selector -->

When ShipStation creates a shipping label, it sends a POST request to this URL. The plugin verifies the request using your webhook token before processing it.

## Cron Setup

Batch order submission runs via the J2Commerce cron command `shipstation`. You need the Joomla Task Scheduler running for this to work.

### Enable the Joomla Task Scheduler

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Task - J2Commerce**.
3. Enable the plugin if it is not already active.

### Add a Server Cron Job

Add a cron job on your hosting server that runs the Joomla CLI once per hour (or more frequently if needed):

```bash
0 * * * * /usr/bin/php /path/to/joomla/cli/joomla.php scheduler:run --id=j2commerce
```

Replace `/path/to/joomla/` with your actual Joomla installation path. Ask your host if you are unsure how to add a cron job.

<!-- SCREENSHOT: Server cPanel or hosting control panel showing a cron job entry for the Joomla CLI -->

When the cron runs, the plugin looks for orders in the **Batch Trigger Status** you configured, groups them by customer and shipping address, and sends each group to ShipStation.

## How Orders Flow

### Automatic Push After Payment

When a customer completes payment and their order lands in one of the **Allowed Order Statuses**, the plugin pushes the order to ShipStation immediately. The order status then changes to your **Status After Submission**.

### Manual Push from Order Admin

To push a specific order at any time:

1. Go to **J2Commerce** -> **Sales** -> **Orders** and open an order.
2. Scroll to the **ShipStation** panel in the order detail page.
3. Click **Sync to ShipStation**.

<!-- SCREENSHOT: Order detail admin page showing the ShipStation panel with the Sync to ShipStation button -->

A confirmation prompt appears. Click OK — the order is sent to ShipStation and the order history is updated with the ShipStation order ID.

### Pulling a Tracking Number On Demand

If the webhook has not fired yet but ShipStation has already created a label:

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. In the **ShipStation** panel, click **Get Tracking Number**.
3. The plugin queries ShipStation for the latest shipment and imports the tracking number.

<!-- SCREENSHOT: ShipStation panel in order admin showing the Get Tracking Number button and a tracking number displayed below it -->

When tracking arrives — whether via webhook or on-demand — the order status changes to your **Shipped Order Status** and the tracking number appears in the order record.

### Date-Range Tracking Sync

To import tracking for all orders within a date range (useful after downtime or initial setup):

1. Open any order and scroll to the **ShipStation** panel.
2. Enter a **Start Date** and **End Date**.
3. Click **Synchronize**.

<!-- SCREENSHOT: ShipStation panel showing the date picker fields and Synchronize button -->

## What's New vs. the J2Store Version

If you previously used the ShipStation integration with J2Store, here is what changed in this J2Commerce version:

- **Native Joomla 6 architecture** — no FOF 2 dependency. The plugin is a standard `CMSPlugin` with a `SubscriberInterface`, following current Joomla extension standards.
- **Secure webhook token** — the integration now uses a plugin-generated 32-character token stored in your plugin settings. The old version relied on a site-wide `queue_key` setting from J2Store's configuration. The new token is independent and easier to rotate.
- **Joomla Task Scheduler integration** — batch order submission runs through the native Joomla 6 task scheduler instead of a custom cron URL.
- **Plugin-owned database table** — custom field values and ShipStation order IDs are stored in a dedicated `#__j2commerce_appshipstation_orderdata` table rather than being written to columns that did not exist in the J2Commerce core schema.
- **Parameterized queries** — all database queries use bound parameters, eliminating the SQL injection risk present in the J2Store version.
- **Vanilla JavaScript admin panel** — the order sync panel uses ES6 `fetch()` and `addEventListener()` with no jQuery dependency.
- **Full cron safety** — the old version called `$app->close()` inside the cron handler, which would terminate the Joomla task scheduler. That call is removed.

## Troubleshooting

### Orders are not appearing in ShipStation

**Check the Allowed Order Statuses setting.** The order's current status must match one of the selected statuses in the **Order Status Mapping** tab. If the status does not match, the plugin skips the order silently.

**Verify your API credentials.** Go to the **Connection** tab and confirm the API Key and API Secret exactly match what ShipStation shows. A wrong credential produces a 401 Unauthorized error — enable **Debug Mode** to see the response in the log file.

### ShipStation returns a 400 error

A 400 response usually means the order data failed ShipStation's validation. Common causes are:

- Missing or incorrectly formatted shipping address (country code, postal code, or state).
- An unmapped shipping method — add the method to the **Shipping Mappings** textarea.
- Weight not set on the product.

Enable **Debug Mode** and check `administrator/logs/plg_j2commerce_app_shipstation.log.php` for the full error message from ShipStation.

### Tracking numbers are not arriving via webhook

First confirm the webhook is registered in ShipStation (**Account Settings** -> **Integrations** -> **Webhooks**) and points to the correct URL shown in the plugin's **Connection** tab.

Then confirm the **Webhook Token** in the plugin matches the one in the URL. If you changed the token after setting up the webhook, re-copy the updated URL from the plugin and update the webhook in ShipStation.

If the webhook URL is reachable but tracking still does not arrive, enable **Debug Mode** to log incoming webhook payloads, then trigger a test label in ShipStation to see the logged request.

### Debug log location

With **Debug Mode** enabled, all ShipStation activity is written to:

```
administrator/logs/plg_j2commerce_app_shipstation.log.php
```

You can view this file via FTP or **System** -> **System Information** -> **Directory Permissions** (navigate to the logs folder). Disable debug mode once the issue is resolved to avoid filling disk space with log entries.
