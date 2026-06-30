---
title: "DoorDash Same-Day Delivery"
sidebar_label: "DoorDash"
sidebar_position: 65
description: "Offer live DoorDash same-day delivery quotes at checkout, then dispatch, track, cancel, and refund deliveries directly from the J2Commerce order view."
---

# DoorDash Same-Day Delivery

The DoorDash Delivery plugin connects your J2Commerce store to [DoorDash Drive](https://developer.doordash.com/en-US/docs/drive/overview/), DoorDash's on-demand local delivery API. When a customer reaches the shipping step at checkout, the plugin calls the DoorDash Drive API in real time and shows a live delivery fee with an estimated arrival time. After the order is paid, a Dasher is automatically dispatched to pick up the order from your store and deliver it to the customer — no phone calls, no manual coordination.

This plugin is ideal for local retailers, restaurants, boutiques, florists, and any business that needs to deliver within a few miles on the same day.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x
- A [DoorDash Developer account](https://developer.doordash.com/) with a Drive API application
- Three credentials from your DoorDash Developer Portal: **Developer ID**, **Key ID**, and **Signing Secret**

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) **->** **Extensions**.

**Step 2:** Locate **DoorDash Same-Day Delivery** **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile at the top-right corner, search for the plugin, click **Available Versions** **->** **View Files** **->** **Download Now**.

## Getting Your DoorDash Credentials

Before you can configure the plugin, you need API credentials from the DoorDash Developer Portal.

1. Sign in to your [DoorDash Developer Portal](https://developer.doordash.com/).
2. Create or open a **Drive API** application.
3. In your application settings, locate the **Credentials** section. You will find three values:
   - **Developer ID** — a UUID that identifies your developer account
   - **Key ID** — a UUID that identifies this specific API key
   - **Signing Secret** — a base64url-encoded value used to sign API requests (keep this private)
4. Copy all three values. You will paste them into the plugin settings in the next section.

DoorDash provides separate sandbox credentials and production credentials. Use sandbox credentials while testing so no real deliveries or charges occur.

## Install the Plugin

In the Joomla administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the plugin ZIP file or use the **Install from URL** option.

## Enable the Plugin

Once installed, find and enable the plugin. There are two ways to reach the shipping methods list:

**Option A:** Click the **J2Commerce** icon at the top right corner **->** **Shipping**

**Option B:** Go to **Components** **->** **J2Commerce** **->** **Shipping**

Look for **DoorDash Drive**, click the red **X**, and it turns into a green checkmark. The plugin is now enabled and ready to configure.

## Configure the Plugin

Click the **DoorDash Drive** title next to the green checkmark to open the settings screen.

:::tip

Click **Toggle Inline Help** in the toolbar to display a description below every field as you configure it.

:::

The settings are grouped into six tabs. Work through them from top to bottom the first time you set up the plugin.

---

### API Credentials

| Field | Description | Default |
|-------|-------------|---------|
| **Sandbox Mode** | When enabled, the plugin uses your sandbox credentials (shown below). No real Dasher is dispatched and no real fee is charged. Turn this off only when you are ready to go live. | Yes |
| **Developer ID (Sandbox)** | Your DoorDash Drive sandbox Developer ID (UUID). Shown only when Sandbox Mode is on. | — |
| **Key ID (Sandbox)** | Your DoorDash Drive sandbox Key ID (UUID). Shown only when Sandbox Mode is on. | — |
| **Signing Secret (Sandbox)** | Your DoorDash sandbox Signing Secret (base64url-encoded). Keep this private. Shown only when Sandbox Mode is on. | — |
| **Developer ID (Production)** | Your DoorDash Drive production Developer ID. Shown only when Sandbox Mode is off. | — |
| **Key ID (Production)** | Your DoorDash Drive production Key ID. Shown only when Sandbox Mode is off. | — |
| **Signing Secret (Production)** | Your DoorDash production Signing Secret. Keep this private. Shown only when Sandbox Mode is off. | — |
| **Checkout Icon** | Logo shown next to the DoorDash option at checkout. Defaults to the bundled DoorDash logo. | *(bundled logo)* |
| **Debug Logging** | When enabled, all DoorDash API calls and responses are written to a log file. Turn this off in production — it generates large logs. | No |

---

### Store Pickup Address

These fields tell DoorDash where your Dasher should pick up the order.

| Field | Description |
|-------|-------------|
| **Address Source** | Choose **Use Store Address** to pull the address already configured in J2Commerce, or **Add New Address** to enter a different pickup location (for example, a warehouse separate from your billing address). |
| **Business Name** | Your store name as shown to the Dasher at pickup. |
| **Street Address** | Pickup street address (for example, `123 Main St`). |
| **City** | Pickup city. |
| **State / Province** | Pickup state or province. The list is filtered by the country selected below. |
| **ZIP / Postal Code** | Pickup ZIP or postal code. |
| **Country** | Pickup country. |
| **Store Phone** | Phone number the Dasher may call at pickup (E.164 format recommended, for example `+16505551234`). |
| **External Business ID** | Optional. If you have a pre-onboarded DoorDash business, enter its `external_business_id` here. This field and **External Store ID** must be filled in together — DoorDash rejects one without the other. Leave both blank to use the pickup address above. |
| **External Store ID** | Optional. The `external_store_id` of your pre-onboarded DoorDash store. Requires **External Business ID** to also be set. |

:::info

If you choose **Use Store Address**, the plugin reads your address from J2Commerce configuration automatically. The individual fields below it are ignored.

:::

:::caution

**External Business ID and External Store ID must be set together.** Filling in one without the other causes DoorDash to reject every quote and dispatch request with a validation error. Either fill in both or leave both blank.

:::

---

### Checkout Options

| Field | Description | Default |
|-------|-------------|---------|
| **Handling Fee** | A fixed or percentage amount added to the DoorDash delivery fee before it is shown to the customer. Enter `0` to pass the fee through unchanged. | 0 |
| **Handling Fee Type** | **Flat** adds a fixed dollar amount to every delivery fee. **Percent** adds a percentage of the delivery fee. | Flat |
| **Tax Class** | Apply a J2Commerce tax profile to the delivery fee. Leave at **None** to use the tax amount DoorDash returns instead. | None |
| **Geozone** | Only offer DoorDash delivery to customers whose address falls within the selected geozone. Leave as **All Zones** to show the option everywhere. | All Zones |
| **Contactless Dropoff** | Request that the Dasher leave the package at the door without requiring a signature or handoff. | No |

---

### Fulfillment Options

| Field | Description | Default |
|-------|-------------|---------|
| **Auto-Dispatch Dasher** | When enabled, a Dasher is automatically dispatched as soon as the order is paid. Turn this off to dispatch every delivery manually from the order view. | Yes |
| **Auto-Dispatch Trigger** | Visible only when **Auto-Dispatch Dasher** is on. Leave as **None** to dispatch immediately after payment. Or choose a specific order status (for example, **Confirmed**) to delay dispatch until the order reaches that status — useful if you want to verify the order before a Dasher arrives. | None |
| **Default Tip (USD)** | A tip amount (in dollars) added to every dispatch, for example `5.00` for a $5 tip. You can adjust this per order from the order view before the Dasher picks up. | 0 |
| **Notify Store Owner** | When enabled, an email is sent to the store owner address when a Dasher is dispatched. | Yes |
| **Store Owner Email** | The email address for dispatch notifications. If left blank, the plugin uses the Joomla global From Email address. | — |

---

### Webhook Settings

DoorDash sends real-time delivery status updates (Dasher confirmed, picked up, delivered, cancelled) to a webhook URL on your site. Setting up the webhook keeps your order statuses in sync automatically without you needing to click **Refresh Status** on every order.

| Field | Description |
|-------|-------------|
| **Webhook Username** | A username of your choice. DoorDash sends this in a Basic-Auth header on every webhook request. Must match what you configure in the DoorDash Developer Portal. |
| **Webhook Password** | A password of your choice (use something strong). Must match the DoorDash Developer Portal setting. |

**Your webhook URL** follows this pattern:

```
https://[your-site]/index.php?option=com_ajax&plugin=shipping_doordash&group=j2commerce&task=shippingplugin.ajax&action=processWebhook&format=raw
```

Replace `[your-site]` with your store's domain. Copy this URL and paste it into the **Webhook Settings** section of your DoorDash Drive application in the DoorDash Developer Portal. Configure the **Basic Auth** username and password in the portal to match what you entered above.

---

### Order Status Mapping

These settings control which J2Commerce order status is applied automatically when DoorDash reports a delivery milestone. Leave a field at **None** to skip that milestone.

| Field | When it applies |
|-------|----------------|
| **Status: Delivery Created** | When the delivery is first created in DoorDash (before a Dasher is confirmed). |
| **Status: Delivery Accepted** | When DoorDash confirms a Dasher has accepted the delivery. |
| **Status: En Route** | When the Dasher is confirmed as arriving at the dropoff address. |
| **Status: Picked Up** | When the Dasher picks up the order from your store. |
| **Status: Delivered** | When the order is successfully delivered to the customer. |
| **Status: Cancelled** | When the delivery is cancelled. |

---

## Sandbox vs. Production Testing

With **Sandbox Mode** turned on, the plugin calls DoorDash's sandbox environment. The delivery fee returned is simulated, no real Dasher is dispatched, and no charge appears on your DoorDash account.

Use sandbox mode to:
- Verify that rates appear at checkout
- Test the dispatch, cancel, and refresh actions in the order view
- Test that webhooks arrive at your endpoint

When you are satisfied that everything works, go back to the plugin settings, turn **Sandbox Mode** off, enter your production credentials, and click **Save**.

:::tip

Use the **Debug Logging** toggle during testing to see exactly what the plugin sends to DoorDash and what DoorDash sends back. Check the log at **System** **->** **Logs** in the Joomla administrator. Turn debug logging off before going live.

:::

---

## How It Works

1. **Customer enters their shipping address at checkout.** The plugin checks whether the address falls within your configured geozone (if any).

2. **The plugin calls the DoorDash Drive API.** It sends your store's pickup address and the customer's destination to DoorDash, which returns a live delivery fee and an estimated arrival time.

3. **The rate appears at checkout.** The customer sees "DoorDash Same-Day Delivery" with the fee and an estimated arrival such as "Estimated arrival by 2:45 PM". If you set a handling fee, it is added before display.

4. **The customer places the order.** The delivery fee is added to the order total. The DoorDash quote reference is saved with the order.

5. **Payment is completed.** If **Auto-Dispatch Dasher** is on (and no trigger status is set), the plugin immediately accepts the saved quote in DoorDash, converting it from a price estimate into a real dispatched delivery. A Dasher is assigned by DoorDash automatically.

6. **The store owner receives a notification email** (if enabled) when the Dasher is dispatched, showing the delivery status and estimated arrival.

7. **DoorDash sends webhook events** as the delivery progresses. The plugin receives these and updates the order status automatically — Dasher confirmed, picked up, delivered, cancelled.

8. **You can monitor and manage the delivery from the order view.** A **DoorDash Delivery** panel appears at the bottom of every order that used DoorDash at checkout. From this panel you can dispatch manually, refresh the current status, view the Dasher's name and estimated arrival, track the delivery on a map, edit the tip or dropoff instructions, cancel, request a refund, redeliver, and rate the Dasher.

---

## Managing a Delivery from the Order View

Open any DoorDash order in **J2Commerce** **->** **Sales** **->** **Orders** and scroll to the **DoorDash Delivery** panel at the bottom of the page.

<!-- SCREENSHOT: DoorDash Delivery panel in the J2Commerce order view, showing delivery status, Dasher name, ETA, and action buttons -->

### Dispatching a Dasher

If **Auto-Dispatch** is turned off — or if you want to re-dispatch after a cancellation — click **Dispatch Dasher**. A confirmation dialog shows the delivery fee that will be billed to your DoorDash account. Click **Proceed** to confirm.

### Refreshing Delivery Status

Click **Refresh Status** to pull the latest delivery information from DoorDash immediately, without waiting for a webhook event.

### Tracking the Delivery

Click **Track Delivery** to open the DoorDash tracking page in a new tab. The customer-facing tracking link shows real-time Dasher location.

### Editing a Delivery

Click **Edit Delivery** to adjust the tip amount, add dropoff instructions (for example, "Leave at back door"), or toggle contactless delivery — but only while the Dasher has not yet picked up the order.

### Cancelling a Delivery

Click **Cancel Delivery** and confirm the prompt. If a Dasher has already been assigned, DoorDash may not allow the cancellation (a notice will appear). In that case, use **Request Refund** or **Redeliver** instead.

:::caution

A cancellation fee may apply if a Dasher has already been assigned to the delivery when you cancel.

:::

### Requesting a Refund

Click **Request Refund** and choose the reason that best describes the issue (for example, "Never delivered" or "Delivered late"). DoorDash reviews the request and decides whether to grant it. This is a DoorDash-side refund of the delivery fee — it does not automatically refund the customer's product payment in J2Commerce.

### Redelivering an Order

If a delivery was cancelled or completed but the item needs to be sent again, click **Redeliver**. This dispatches a brand-new Dasher for the same order and bills your DoorDash account for a new delivery fee.

### Rating the Dasher

After a delivery is completed, click **Rate Dasher** to leave a thumbs up or thumbs down rating with an optional reason and comment.

### Viewing Dasher History

Click **Dasher History** to see all Dashers who were assigned to the delivery, including any who were reassigned before pickup.

---

## Troubleshooting

### No DoorDash rate appears at checkout

**Cause:** Credentials are missing or incorrect, the pickup address is incomplete, or DoorDash does not serve the customer's delivery address.

**Solution:**

1. Go to **J2Commerce** **->** **Shipping**, click **DoorDash Drive** to open the settings.
2. Confirm **Sandbox Mode** is set correctly and the matching credentials (sandbox or production) are filled in. All three fields — Developer ID, Key ID, and Signing Secret — must be present.
3. Check the **Store Pickup Address** tab — the plugin requires at minimum a street address and ZIP/postal code (or a complete J2Commerce store address if you selected **Use Store Address**).
4. Enable **Debug Logging** temporarily, clear the Joomla cache, and attempt a checkout. Review the log at **System** **->** **Logs** for any API error messages, then disable debug logging again.
5. If the error is "not serviceable", the customer's address is outside DoorDash's delivery range. No rate will appear — this is expected behavior.

---

### "Invalid credentials" or 401 error in the debug log

**Cause:** The Developer ID, Key ID, or Signing Secret was copied incorrectly, or the credentials belong to the wrong environment.

**Solution:**

1. In your DoorDash Developer Portal, copy the credentials again carefully. The Signing Secret in particular is a long base64url-encoded string — a single missing character will cause every request to fail.
2. Confirm that **Sandbox Mode** matches the environment your credentials belong to.
3. Save the plugin settings and test again.

---

### "External Business ID and External Store ID" error (400)

**Cause:** One of the two fields is filled in but the other is blank. DoorDash requires both together or neither.

**Solution:**

Either fill in both **External Business ID** and **External Store ID**, or clear both fields to use the pickup address instead.

---

### Dispatch fails with "already dispatched" message

**Cause:** A delivery has already been dispatched for this order and is still active (not cancelled or completed).

**Solution:**

Check the **DoorDash Delivery** panel in the order view. If the delivery is active, use **Track Delivery** or **Refresh Status** to see the current state. If you need to cancel and redispatch, cancel the current delivery first, then click **Dispatch Dasher** again.

---

### Order status is not updating when the delivery progresses

**Cause:** The webhook is not configured in the DoorDash Developer Portal, or the username and password do not match.

**Solution:**

1. Copy your webhook URL from the plugin settings (see the [Webhook Settings](#webhook-settings) section above for the URL format).
2. In your DoorDash Developer Portal, go to **Webhook Settings** and confirm a webhook is registered pointing to your site's URL, with the correct Basic Auth username and password.
3. Make sure the **Webhook Username** and **Webhook Password** in the plugin settings exactly match what you entered in the DoorDash Developer Portal.
4. You can still update status manually by clicking **Refresh Status** in the order view.
