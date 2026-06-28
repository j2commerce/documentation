---
title: "EU Order Withdrawal Compliance"
sidebar_label: "EU Order Withdrawal Compliance"
sidebar_position: 40
description: "Let EU customers exercise their statutory right to withdraw from contracts directly from their order page — fully compliant with EU Directive 2023/2673, mandatory from 19 June 2026."
---

# EU Order Withdrawal Compliance

EU law gives consumers the right to withdraw from distance contracts within a statutory period — 14 days by default. Under **EU Directive 2023/2673**, which entered into force on **19 June 2026**, online stores must provide consumers with a simple, direct mechanism to exercise that right. This plugin adds a **Withdraw from Contract** button to the customer's order page in J2Commerce, records each request in a dedicated dashboard, and sends legally-required confirmation emails automatically.

If your store sells to customers in the EU or EEA, this plugin is not optional — it is a legal requirement.

## Prerequisites

- J2Commerce installed and activated on Joomla 6
- Your Joomla site email (outgoing mail) configured and working
- Administrator access to the J2Commerce back end

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

1. Purchase and download the `app_orderwithdrawal.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_orderwithdrawal.zip` package file.
4. The plugin installs and enables automatically. A database table (`#__j2commerce_apporderwithdrawals`) is created on install.

<!-- SCREENSHOT: Joomla Extension Install screen with app_orderwithdrawal.zip being uploaded -->

After installation, go to **J2Commerce** -> **Apps** and locate **Order Withdrawal (EU Compliance)**. Click the plugin name to open its settings.

## Configuration

The plugin settings are split across four tabs.

### Basic Settings

<!-- SCREENSHOT: Plugin Basic Settings tab showing all fields -->

| Field | Description | Default | Recommended |
|-------|-------------|---------|-------------|
| **Enable Withdrawal Function** | Master on/off switch. When disabled, no withdrawal button appears anywhere on the storefront. | Yes | Yes |
| **Default Withdrawal Period** | Number of days from the order date during which a customer may withdraw. EU standard is 14 days. | 14 | 14 (or higher if your policy allows) |
| **Eligible Order Statuses** | Select which order statuses allow a withdrawal request. Orders in any other status will not show the button. | _(none selected — all statuses eligible)_ | Select the statuses that represent confirmed/paid orders, such as **Confirmed** or **Processing** |
| **Require Two-Step Confirmation** | When enabled, the customer must complete a two-screen confirmation flow before the request is submitted. This protects against accidental withdrawals. | Yes | Yes |
| **Allow Partial Withdrawals** | When enabled, customers may withdraw individual items from a multi-item order rather than the entire order. | No | Your business preference |
| **Show Dashboard Quick Icon** | Displays a pending withdrawal count badge on the J2Commerce dashboard quick-icon panel. | Yes | Yes |
| **Debug Mode** | Writes detailed log entries to `administrator/logs/app_orderwithdrawal.php` and the browser console. Disable in production. | No | No (only enable when troubleshooting) |

### Display Settings

<!-- SCREENSHOT: Plugin Display Settings tab -->

| Field | Description | Default |
|-------|-------------|---------|
| **Button Position** | Where the withdrawal button appears: **Order Details Page Only**, **Order History Page Only**, or **Both Pages**. | Order Details Page Only |
| **Show Days Remaining** | Displays a countdown badge (e.g., "12 days remaining") next to the withdrawal button. | Yes |
| **Button Theme Color** | Hex color for the withdrawal button and accent elements. Accepts any valid hex color. | `#dc3545` (Bootstrap red) |
| **Custom CSS** | Paste extra CSS rules here if you need to override the default withdrawal widget styling. Loaded on every page that renders the button. | _(empty)_ |

### Email Settings

<!-- SCREENSHOT: Plugin Email Settings tab -->

| Field | Description | Default |
|-------|-------------|---------|
| **Send Customer Confirmation Email** | Sends the legally-required written confirmation to the customer the moment their withdrawal is recorded. Required by EU law. | Yes |
| **Send Admin Notification Email** | Notifies your team immediately when a new withdrawal request arrives. | Yes |
| **Admin Email Addresses** | Comma-separated list of email addresses to receive admin notifications. Leave blank to use the Joomla site's default **From** address. | _(empty — falls back to Joomla mailfrom)_ |
| **Brand Logo for Emails** | Selects an image from your Joomla media library to appear at the top of both email templates. | _(none)_ |
| **UTM Source** | UTM tracking parameter appended to links inside confirmation emails. | `j2commerce` |
| **UTM Medium** | UTM medium parameter for email links. | `email` |
| **UTM Campaign** | UTM campaign parameter for email links. | `withdrawal` |

### Advanced Settings

<!-- SCREENSHOT: Plugin Advanced Settings tab -->

| Field | Description | Default |
|-------|-------------|---------|
| **Auto-Process After Days** | If set to a number greater than 0, pending withdrawal requests are automatically marked as Processed after that many days. Set to 0 to disable. | 0 |
| **Extend Period if Not Informed** | When enabled, the withdrawal deadline extends to 12 months if the store has not properly informed the consumer of their withdrawal right (an EU Directive requirement). Leave this on unless you have a lawyer-reviewed alternative. | Yes |
| **Extend Deadline on Weekends** | If the withdrawal deadline falls on a Saturday or Sunday, it automatically shifts to the next Monday. Matches standard EU consumer-law practice. | Yes |
| **Enable Audit Logging** | Records every withdrawal action (created, processed, rejected) in the database for compliance tracking. | Yes |
| **Export Format** | The format used when exporting the withdrawal list. Currently CSV. | CSV |

## Per-Product Exception Settings

Some product types are exempt from the statutory withdrawal right under EU law. The plugin adds a **Withdrawal Settings** tab directly on each product's edit screen so you can configure exceptions product by product.

To reach a product's withdrawal settings:

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Open any product and click the **Withdrawal Settings** tab (added by this plugin).

<!-- SCREENSHOT: Product edit screen showing the Withdrawal Settings tab with exception type dropdown -->

| Field | Description |
|-------|-------------|
| **Withdrawal Allowed** | Toggle withdrawal on or off for this specific product. If set to **No**, any order containing this product is ineligible for withdrawal. |
| **Custom Withdrawal Period (Days)** | Override the default period for this product. Leave blank to inherit the global default. The plugin uses the longest period among all items in an order. |
| **Exception Type** | Classifies the product under one of the eight EU-recognised statutory exceptions (see table below). |
| **Exception Reason** | A short explanation shown to the customer if they try to withdraw and this product is the reason for ineligibility. |
| **Require Digital Content Consent** | When set to **Yes**, the customer must explicitly consent before accessing digital content. This is required by EU law for digital downloads to be exempt from the withdrawal right. |

### Exception Types

| Exception Type | EU Legal Basis | Example Products |
|---------------|----------------|-----------------|
| **No Exception** | — | Physical goods with no special status |
| **Perishable Goods** | Art. 16(d) Consumer Rights Directive | Fresh food, flowers, plants |
| **Custom / Personalized Products** | Art. 16(c) | Engraved items, made-to-order clothing |
| **Sealed Hygiene Products** | Art. 16(e) | Underwear, cosmetics opened after delivery |
| **Sealed Audio / Video / Software** | Art. 16(i) | DVDs, games, boxed software with broken seal |
| **Digital Content** | Art. 16(m) | Downloads, streaming access, software keys |
| **Time-Sensitive Services** | Art. 16(l) | Event tickets, accommodation for specific dates |
| **Urgent Repairs** | Art. 16(b) | Emergency repair services explicitly requested |
| **Newspapers / Magazines** | Art. 16(k) | Single-issue periodicals |

Setting any exception type other than **No Exception** blocks the withdrawal button for any order containing that product.

## How the Customer-Facing Withdrawal Flow Works

When a logged-in customer views an eligible order, the plugin injects a **Withdraw from Contract** button (with an optional days-remaining countdown badge) into the order details page.

<!-- SCREENSHOT: Customer order details page showing the "Withdraw from Contract" button with a "12 days remaining" badge -->

Clicking the button opens a two-step modal:

### Step 1 — Withdrawal Form

The modal displays:
- An EU Consumer Rights notice with the exact number of days remaining.
- A **Name** field (required).
- An **Email** field (required).
- An optional **Reason for Withdrawal** text area.
- An important notice explaining that goods must be returned and refunds will use the original payment method.

<!-- SCREENSHOT: Step 1 modal showing the EU compliance notice, name/email fields, optional reason textarea, and important notice box -->

The customer clicks **Confirm Withdrawal** to proceed to Step 2.

### Step 2 — Final Confirmation

The second screen shows a warning that this action cannot be undone, lists what happens next (email confirmation, review timeline, 14-day refund window, return instructions), and requires the customer to tick a confirmation checkbox before submitting.

<!-- SCREENSHOT: Step 2 modal showing the warning, "What Happens Next" bullet list, confirmation checkbox, and the final Confirm Withdrawal button -->

### After Submission

Once the customer clicks **Confirm Withdrawal** on Step 2:

1. A withdrawal record is created in the database with status **Pending**.
2. A confirmation email is sent to the customer immediately (subject: "Withdrawal Confirmation — Order [number]"). This email serves as the legally-required durable-medium receipt.
3. An admin notification email is sent to the addresses configured in **Email Settings**.
4. The button is replaced by an informational message: "Confirmed."

<!-- SCREENSHOT: Order page after successful withdrawal submission, showing the "Confirmed" status message -->

## Admin Workflow

All withdrawal requests are managed from **J2Commerce** -> **Apps** -> **Order Withdrawal Management**.

The dashboard is the default view. A quick-icon badge on the J2Commerce home screen shows the count of pending requests when **Show Dashboard Quick Icon** is enabled.

<!-- SCREENSHOT: J2Commerce admin dashboard showing the Order Withdrawals quick icon with a pending count badge -->

### Dashboard

The dashboard shows four summary statistics:

- **Total Requests** — lifetime count
- **Pending** — requests awaiting action
- **Processed This Month** — withdrawals closed in the current calendar month
- **Rejection Rate** — percentage of requests that were rejected

Quick links navigate to the full list, the pending-only filtered view, the analytics screen, the CSV export, and the plugin settings.

<!-- SCREENSHOT: Order Withdrawal Management dashboard showing the four stat cards and quick action buttons -->

### Withdrawal Requests List

Click **Manage Withdrawals** from the dashboard, or go to **J2Commerce** -> **Apps** -> **Order Withdrawal Management** and click **Manage Withdrawals** in the toolbar.

The list shows all withdrawal requests with columns for Order, Customer, Request Date, Status, and Days Since the request. Use the search bar to filter by order number, customer name, or email. Use the **Status** filter to narrow to Pending, Confirmed, Processed, or Rejected requests.

<!-- SCREENSHOT: Withdrawal Requests list view showing the searchtools bar, table with checkboxes, status badges, and action buttons per row -->

**Available statuses:**

| Status | Meaning |
|--------|---------|
| Pending | Request submitted but not yet actioned by the store |
| Confirmed | Customer completed the two-step form |
| Processed | Admin has processed the refund/return |
| Rejected | Admin has rejected the request |
| Cancelled | Request was cancelled |

**Per-row actions:** each row has **View Details** (opens the edit screen) and **View Order** (opens the J2Commerce order) links.

**Toolbar bulk actions** (select rows with checkboxes first):

- **Change Status** -> **Process Selected** — marks selected requests as Processed
- **Change Status** -> **Reject Selected** — marks selected requests as Rejected
- **Change Status** -> **Delete** — permanently removes selected records (with confirmation)

<!-- SCREENSHOT: Withdrawal Requests list with several rows checked and the Change Status dropdown open -->

### Processing a Single Withdrawal

Click **View Details** on any row to open the withdrawal detail screen. This screen shows:

- **Order Information** — order number, date, total, current status, and the ordered items
- **Customer Information** — name, email, user ID, and IP address (for audit purposes)
- **Request Details** — request date, confirmation date, withdrawal reason, partial items if applicable
- **Refund Information** — fields to record the refund amount and a payment reference number
- **Admin Notes** — a free-text field for internal notes not visible to the customer
- **Timeline** — log of when the record was created and when emails were sent

<!-- SCREENSHOT: Withdrawal Details edit screen showing all sections and the Mark as Processed / Reject buttons in the toolbar -->

To action the withdrawal:
1. Fill in **Refund Amount** and **Refund Reference** once the refund has been issued through your payment gateway.
2. Add any **Admin Notes** for your records.
3. Click **Save Changes**.
4. Use the **Mark as Processed** or **Reject** toolbar buttons to update the status.

### Analytics

Click **Analytics** in the toolbar from the list view to access the analytics screen. It displays:

- A line chart of withdrawals over the past 12 months
- A pie/doughnut chart of status distribution
- A breakdown table showing count and percentage per status, and average processing time in days

<!-- SCREENSHOT: Withdrawal Analytics screen showing the line chart, status pie chart, and summary stat cards -->

### CSV Export

Click **Export Data** in the toolbar from the list view. The plugin streams a CSV file named `withdrawals_YYYY-MM-DD.csv` containing: ID, Order number, Customer name, Email, Request date, Status, Reason, Refund amount, Processed date, and Admin notes.

## Emails

### Customer Confirmation Email

Sent automatically when a withdrawal is confirmed. Contains:

- Greeting with the customer's name
- Confirmation that the withdrawal request has been received
- Request details (order number, withdrawal ID, date and time of receipt)
- What happens next (review, return instructions, 14-day refund)
- A legal notice citing EU Directive 2023/2673, which serves as written confirmation on a durable medium as required by law
- Your brand logo (if configured in Email Settings)

### Admin Notification Email

Sent to each address in **Admin Email Addresses** (or the site's default mailfrom). Contains:

- The order number and customer details
- Request date and withdrawal reason
- A direct link to the withdrawal detail screen in the admin back end

## Troubleshooting

### The Withdraw from Contract button does not appear

Work through the following checklist in order:

1. **Master switch disabled.** Go to the plugin settings (**Basic Settings** tab) and confirm **Enable Withdrawal Function** is set to **Yes**.
2. **Exempt products in the order.** If any product in the order has an **Exception Type** set (other than "No Exception") or has **Withdrawal Allowed** set to **No**, the entire order is ineligible. Check the **Withdrawal Settings** tab on each product in the order.
3. **Withdrawal period expired.** The order is older than the configured withdrawal period. Check the order's creation date against **Default Withdrawal Period**. If **Extend Period if Not Informed** is enabled, the effective deadline is 12 months.
4. **Order status not eligible.** If **Eligible Order Statuses** has any entries, the order's current status must be in that list. Open the order and compare its status to the selected statuses in the plugin settings.
5. **Withdrawal already submitted.** If the customer already submitted a withdrawal for this order (and it was not cancelled), the button is replaced by a "Confirmed" notice. Check the Withdrawal Requests list for a record matching that order number.
6. **Customer is not the order owner.** The button only appears to the logged-in user who placed the order. Administrators do not see it when viewing orders in the front end under a different account.
7. **Plugin is disabled.** Go to **System** -> **Manage** -> **Extensions**, search for **Order Withdrawal**, and confirm the plugin is enabled (green tick).

### Customers are not receiving confirmation emails

1. Confirm **Send Customer Confirmation Email** is set to **Yes** in Email Settings.
2. Confirm your Joomla outgoing mail is configured and working: **System** -> **Global Configuration** -> **Server** tab -> **Mail Settings**. Use the **Send Test Mail** button.
3. Ask the customer to check their spam folder. The email is sent from your site's **From** address.
4. Enable **Debug Mode** in Basic Settings, reproduce the withdrawal, and check `administrator/logs/app_orderwithdrawal.php` for any "Email send failed" entries.

### The withdrawal period appears much longer than expected

Check the **Extend Period if Not Informed** setting in the **Advanced Settings** tab. When this is enabled, the plugin uses a 12-month (360-day) period if the "not informed" condition is met. Turn this off if your store correctly informs customers of their withdrawal right at the point of sale, and set your preferred period in **Default Withdrawal Period**.

### The deadline falls on a weekend and the button disappears unexpectedly

This is by design. When **Extend Deadline on Weekends** is enabled (the default), a deadline that falls on Saturday is pushed to Monday, and one that falls on Sunday is pushed to the following Monday. This is standard EU practice and cannot legally disadvantage the consumer.

## What's New Compared to J2Store

If your store previously used the J2Store version of this plugin, here is what changed in J2Commerce:

| Area | J2Store (v4) | J2Commerce (v6) |
|------|-------------|-----------------|
| **Architecture** | FOF 2 (`plgJ2StoreApp_orderwithdrawal` extending `F40\Plugin\Plugin`) | Native Joomla 6 MVC — `CMSPlugin` + `SubscriberInterface`, DI container |
| **JavaScript** | jQuery AJAX | Vanilla ES6+ `fetch()` with `async/await` |
| **Emails** | Called J2Store email helper indirectly | Joomla 6 `MailerFactoryInterface` — emails actually send via your configured mail transport |
| **IDOR protection** | Order ownership not always verified server-side | Every AJAX handler verifies `$order->user_id === $identity->id` before processing |
| **Admin views** | FOF-generated list / edit screens | Core Joomla list layout primitives (`LayoutHelper`, `HTMLHelper::_('searchtools.sort')`, `Pagination`) |
| **CSRF** | Token present but inconsistently checked | `Session::checkToken()` on every POST handler; admin actions also check `core.manage` ACL |
| **Audit log** | Flat file only | Joomla `Log` API to `administrator/logs/app_orderwithdrawal.php` with configurable debug/error levels |
| **Analytics** | Basic counts | Chart.js line and doughnut charts with monthly trend data and per-status breakdown |

## Related Topics

- [Apps and Extensions](../index.md)
- [EU VAT](./euvat.md)
- [Orders](../../sales/index.md)
