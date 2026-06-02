---
title: "Twilio SMS Notifications"
sidebar_label: "Twilio SMS"
sidebar_position: 55
description: "Send automated SMS messages to customers and admins when an order is paid or its status changes, powered by the Twilio messaging API."
---

# Twilio SMS Notifications

The Twilio SMS app sends text messages to your customers — and optionally to your store team — the moment an order is paid or its status changes. You configure one message template per order status, drop in a few placeholders like `[ORDER_ID]` and `[AMOUNT]`, and the plugin handles the rest automatically.

This is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

## Prerequisites

Before you begin, make sure you have:

- **J2Commerce 6.0 or later** installed and active
- A **Twilio account** — create one for free at [twilio.com](https://www.twilio.com)
- Your **Account SID** and **Auth Token** from the Twilio Console dashboard
- A **Twilio phone number** (or messaging service short code) verified and ready to send from
- The `plg_j2commerce_app_twilio` zip package downloaded from the J2Commerce website

Twilio charges per SMS sent. Test using Twilio's free trial credits before going live.

## Installation

This plugin is a separate add-on and is not included with J2Commerce. To install it:

1. Purchase and download `plg_j2commerce_app_twilio.zip` from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the zip package file.
4. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extension Manager showing the successful install of plg_j2commerce_app_twilio -->

After installation, navigate to **System** -> **Manage** -> **Plugins** and search for **Twilio** to confirm the plugin appears with a green enabled status.

## Configuration

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

Open the plugin settings by going to **System** -> **Manage** -> **Plugins**, searching for **Twilio**, and clicking the plugin name.

<!-- SCREENSHOT: Plugin list filtered to "Twilio" showing the Twilio SMS plugin row with its enabled toggle -->

All settings are on the **Twilio Settings** tab.

<!-- SCREENSHOT: Twilio SMS plugin params page showing all fields in the Basic fieldset -->

### Credentials

| Field           | Description                                                        | Notes                                                                |
| --------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Account SID** | Your Twilio Account SID — a 34-character string starting with `AC` | Found on your [Twilio Console](https://console.twilio.com) dashboard |
| **Auth Token**  | The secret token paired with your Account SID                      | Keep this private. Treat it like a password.                         |

Enter your production credentials here. If you want to test first without touching your live Twilio account, use Sandbox Mode instead (see below).

### Sandbox Mode

| Field                | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Sandbox Mode**     | Toggle to **Yes** to use test credentials instead of your live Twilio account         |
| **Test Account SID** | The Account SID for your Twilio test environment (only shown when Sandbox is enabled) |
| **Test Auth Token**  | The Auth Token for your Twilio test environment (only shown when Sandbox is enabled)  |

Twilio provides a separate set of test credentials in the Console under **Account** -> **Keys & Credentials** -> **Test Credentials**. When Sandbox Mode is on, no real SMS messages are sent and Twilio does not charge your account. Use this during setup and testing.

### Phone Number Validation

| Field                                | Description                                                                                        | Default |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- | ------- |
| **Validate Phone via Twilio Lookup** | When enabled, the plugin checks each recipient number through the Twilio Lookup API before sending | No      |

Twilio Lookup confirms whether a phone number is real and returns carrier information. This costs extra per lookup on top of the SMS fee. Leave this off unless you are experiencing bounced messages or want carrier-type filtering. Enable it only when the extra cost is worthwhile for your volume.

### Sender

| Field                         | Description                                                                         | Example        |
| ----------------------------- | ----------------------------------------------------------------------------------- | -------------- |
| **Sender Phone / Short Code** | The Twilio phone number or messaging service short code that messages are sent from | `+12025551234` |

This must be a number you own in your Twilio account. Use the full E.164 format — a `+` sign followed by the country code and number, with no spaces or dashes. You can find your Twilio numbers under **Phone Numbers** -> **Manage** in the Twilio Console.

### Trigger Event

| Field               | Description                                | Options                            |
| ------------------- | ------------------------------------------ | ---------------------------------- |
| **Send Message On** | Controls which order event triggers an SMS | After Payment, Order Status Change |

- **After Payment** — fires once when a customer's payment completes successfully. Best for order confirmation messages.
- **Order Status Change** — fires every time an order status is updated in the J2Commerce admin. Best for fulfillment updates such as "Shipped" or "Ready for pickup."

Choose one. The plugin does not support both triggers simultaneously.

### Customer Phone Field

| Field                    | Description                                                          | Default                     |
| ------------------------ | -------------------------------------------------------------------- | --------------------------- |
| **Customer Phone Field** | Which billing address phone field holds the customer's mobile number | Phone 1 (billing\_phone\_1) |

J2Commerce stores up to two phone numbers per billing address. If your checkout collects a mobile number separately (for example, in a second phone field), switch this to **Phone 2**. If you only collect one number, leave it on **Phone 1**.

### Admin Notifications

| Field                        | Description                                                                                                    | Default |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| **Send Admin Notifications** | When enabled, a separate SMS is sent to one or more admin numbers on each event                                | No      |
| **Admin Mobile Number(s)**   | Comma-separated list of E.164 phone numbers for admin alerts (only shown when admin notifications are enabled) | —       |

Use admin notifications to alert your fulfillment team or shop manager in real time. Enter multiple numbers separated by commas — for example: `+12025550001,+12025550002`.

Each number must be in E.164 format (leading `+` and country code). Admin messages use the **Admin Message** column of the Order Status Messages table below.

### Order Status Messages

<!-- SCREENSHOT: Order Status Messages table inside the plugin params showing status name, Customer Message, and Admin Message columns with placeholder text in the inputs -->

This table lists every active order status in your store. For each status, you can write two message templates:

| Column               | What it sends                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------- |
| **Customer Message** | The SMS text sent to the customer's phone number                                            |
| **Admin Message**    | The SMS text sent to the admin number(s) (only used if Send Admin Notifications is enabled) |

Leave both fields blank for any status where you do not want an SMS to go out. The plugin skips sending for statuses with an empty message.

#### Available Placeholders

Use these tags inside your message text. The plugin replaces them with real order data before sending:

| Tag              | Replaced with                                  |
| ---------------- | ---------------------------------------------- |
| `[ORDER_ID]`     | The order's unique ID string                   |
| `[INVOICE]`      | The formatted invoice number (e.g. `INV-0042`) |
| `[AMOUNT]`       | The order total                                |
| `[CREATED_DATE]` | The date the order was placed                  |

**Example customer message:**

```
Your order [ORDER_ID] has been confirmed. Total: [AMOUNT]. Thank you for shopping with us!
```

**Example shipping update:**

```
Good news! Order [ORDER_ID] (Invoice [INVOICE]) has shipped. Questions? Reply STOP to unsubscribe.
```

Keep SMS messages short — most carriers limit a single SMS to 160 characters. Longer messages are split into multiple parts and each part is billed separately.

### Debug Mode

| Field          | Description                                                          | Default |
| -------------- | -------------------------------------------------------------------- | ------- |
| **Debug Mode** | When enabled, detailed log entries are written for every SMS attempt | No      |

With Debug Mode on, the plugin logs each send attempt — phone number looked up, message body, Twilio message SID returned, or error details — to the file `administrator/logs/plg_j2commerce_app_twilio.php`. Errors are always logged regardless of this setting. Enable Debug Mode during testing and turn it off in production to keep log files clean.

## Testing with Sandbox Mode

Before going live, run an end-to-end test with Twilio's test credentials:

1. In the plugin settings, set **Sandbox Mode** to **Yes**.
2. Enter your **Test Account SID** and **Test Auth Token** from the Twilio Console.
3. Fill in a customer message for at least one order status (for example, "New" or "Confirmed").
4. Click **Save**.
5. Place a test order and complete the payment on the frontend.
6. Check the order in **J2Commerce** -> **Sales** -> **Orders**. Open the order and look at the order history notes — the plugin adds a note for each SMS attempt with the Twilio message SID.
7. Also check the Twilio Console under **Monitor** -> **Logs** -> **Messaging** to confirm the test call was received.

<!-- SCREENSHOT: J2Commerce order detail page showing the order history notes with a Twilio SMS confirmation note -->

When your test works, switch **Sandbox Mode** back to **No** and save.

## Troubleshooting

### No SMS is sent after payment

**Check these in order:**

1. Confirm the plugin is enabled — go to **System** -> **Manage** -> **Plugins** and verify the green toggle next to Twilio SMS.
2. Make sure **Send Message On** is set to **After Payment** (not Order Status Change).
3. Open the Order Status Messages table and confirm a **Customer Message** is filled in for the status that applies at payment completion (usually "New" or "Confirmed").
4. Check that the customer's order has a phone number in the billing address field you selected under **Customer Phone Field**.
5. Enable **Debug Mode**, place another test order, then open `administrator/logs/plg_j2commerce_app_twilio.php` to see what the plugin did.

### "SMS not sent: message body is empty"

This note appears in the order history when the message template for the current order status is blank. Open the plugin settings and fill in a **Customer Message** for that status.

### Customer phone number is missing or blank

The plugin skips sending if the resolved phone field is empty. Verify that your checkout form actually collects a phone number and stores it in the billing address field you configured (**Phone 1** or **Phone 2**). You can confirm this by opening any recent order in J2Commerce and checking the billing address details.

### Twilio returns an authentication error

Double-check the **Account SID** and **Auth Token** by logging into [console.twilio.com](https://console.twilio.com) and copying them fresh. Common mistakes:

- Copying the test credentials into the production fields or vice versa
- A trailing space in the pasted value
- The Auth Token was regenerated in Twilio after being saved here

### Twilio error: "From number is not a valid, SMS-capable inbound phone number"

The **Sender Phone / Short Code** must be a Twilio phone number you own, not a personal number. Confirm the number exists under **Phone Numbers** -> **Manage** in the Twilio Console and that SMS is enabled for it.

### Log file location

All errors are logged to:

```
administrator/logs/plg_j2commerce_app_twilio.php
```

With **Debug Mode** enabled, informational entries (successful sends, phone lookups) are also written here. Access this file via **System** -> **System Information** -> **Directory Permissions** or by browsing to the file directly on the server.

## What's New in J2Commerce (vs the J2Store Version)

If you are upgrading from the J2Store version of this plugin (`plg_j2store_app_twilio`), here is what changed:

- **Native Joomla 6 MVC.** No FOF 2 dependency. The plugin runs on Joomla's standard plugin event system with `SubscriberInterface` — compatible with Joomla 6 and later.
- **Plugin params replace the custom admin view.** The J2Store version had a separate admin dashboard screen for managing per-status messages. In J2Commerce, the Order Status Messages table is rendered directly inside the plugin's standard params edit form. No separate page or menu item needed.
- **Parameterized database queries.** All database reads and writes use bound parameters — no raw SQL concatenation.
- **Debug toggle.** A new **Debug Mode** switch writes detailed log entries on demand. Previously, logging was always on or always off with no in-plugin control.
- **Sandbox Mode fields show/hide conditionally.** The Test Account SID and Test Auth Token fields appear only when Sandbox Mode is enabled, keeping the form clean.
- **Admin mobile as CSV.** You can now enter multiple admin phone numbers separated by commas — the plugin loops over each one and sends individually.
- **Order notes via OrderModel.** Successful and failed SMS attempts are recorded in the order history using J2Commerce's standard `OrderModel::addAdminNote()` method, so they appear alongside other order events in the admin.

## Related Topics

- [Apps and Extensions Overview](../index.md)
- [Order Statuses](../../sales/index.md)
