---
title: "Partial Payment"
sidebar_label: "Partial Payment"
sidebar_position: 10
description: "Accept deposits at checkout and collect the remaining balance on a schedule. Ideal for high-ticket products, custom orders, courses, and services."
---

# Partial Payment

The Partial Payment app lets you collect a deposit at checkout and schedule the remaining balance for a later date. Customers pay a percentage or fixed-amount deposit when they place the order, then return to their account to pay the outstanding balance when it becomes due. Automated reminder emails keep the payment process on track without manual follow-up.

This app is well-suited for stores selling high-ticket items, custom-made goods, services booked in advance, online courses, and any product where splitting the payment makes the purchase easier for the customer.

## Prerequisites

- J2Commerce 6 installed and activated
- At least one product with a published price
- Joomla email (SMTP or PHP mail) configured so reminder emails can send

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_partialpayment.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_partialpayment.zip` package file.
4. The installer enables the plugin automatically and creates three database tables along with a "Scheduled" order status.

You should see a green "Partial Payment plugin installed successfully" confirmation message when complete.

<!-- SCREENSHOT: Joomla extension manager showing the successful partial payment installation message -->

## Global Configuration

After installation, configure the plugin's global settings before assigning it to individual products. Go to **J2Commerce** -> **Apps**, find **Partial Payment**, and click its name to open the plugin editor.

<!-- SCREENSHOT: J2Commerce Apps list with Partial Payment highlighted -->

The configuration panel has two tabs: **General Settings** and **Mail Settings**.

### General Settings

<!-- SCREENSHOT: Partial Payment General Settings tab showing all fields -->

| Field | Description | Default | Options |
|-------|-------------|---------|---------|
| **Cron URL** | A URL you copy and schedule via your server's cron or the companion Joomla Task plugin. Run at least once daily so scheduled orders activate on time and reminder emails send. | — | Read-only generated URL |
| **Enable partial payment (default)** | Whether partial payment applies to products storewide by default. You can override this on individual products. | Disabled | Disabled, Enabled (required), Enabled (optional) |
| **Select by default** | Which option is pre-selected on the product page when partial payment is set to "optional" — the customer can still change their choice. | Full payment | Full payment, Partial payment |
| **Partial payment type (default)** | How the deposit amount is calculated storewide. | Percentage | Percentage, Fixed amount |
| **Amount (default)** | The default deposit amount. Enter a number: `50` means 50% when the type is Percentage, or 50 in your store currency when Fixed. | 50 | Any positive number |
| **Payment plans (default)** | Assign one or more payment plans to apply storewide. Plans must be created first (see [Payment Plans](#payment-plans-admin-plans-crud)). | — | Multi-select from your enabled plans |
| **Scheduled order status** | The order status assigned to future payment instalments after the deposit is placed. Defaults to "Scheduled," which is created automatically at install. | Scheduled | Any active order status |
| **Allowed payment methods** | Restrict partial-payment orders to specific gateways. Useful when only certain gateways support deferred billing. Leave blank to allow all gateways. | All | Multi-select from your enabled payment methods |
| **Payment display** | Controls what total appears at checkout: the full order amount, or only the deposit amount due today. | Full order total | Full order total, Partial amount only |
| **Debug mode** | Writes partial payment events to the J2Commerce log for troubleshooting. Turn off on live stores. | No | Yes, No |

**Recommended starting point:** Set **Enable partial payment (default)** to **Disabled** and configure each product individually until you are comfortable with how the feature behaves.

### Mail Settings

<!-- SCREENSHOT: Partial Payment Mail Settings tab -->

| Field | Description | Default |
|-------|-------------|---------|
| **Send email when order is ready for payment** | Sends the "on_enable_pay" email to the customer when a scheduled order transitions to ready-for-payment status during the cron run. | Yes |
| **Notify payment pending on (days)** | Comma-separated number of days after the scheduled payment date to send overdue reminders. For example, `2,5` sends a reminder 2 days and again 5 days after the due date. Leave blank to disable overdue reminders. | — (disabled) |
| **Send thank-you email for deposit payment** | Sends the "thanks_for_deposit_payment" email immediately when the customer's initial deposit is confirmed. | Yes |

## Per-Product Settings

Each product can override the global defaults. Open a product in **J2Commerce** -> **Catalog** -> **Products**, click the **Apps** tab, and locate the **Partial Payment** section.

<!-- SCREENSHOT: Product edit form with the Apps tab selected, showing the Partial Payment section -->

| Field | Description | Default | Appears when |
|-------|-------------|---------|--------------|
| **Enable partial payment** | Sets partial payment availability for this product. Use **Disabled** to turn it off even if the global default is on. Use **Enabled (required)** to force all buyers to pay a deposit. Use **Enabled (optional)** to let customers choose. | Disabled | Always |
| **Select by default** | Which payment option is pre-selected when the toggle appears on the product page. | Full payment | Only when Enable = Optional |
| **Partial payment type** | Whether the deposit is a percentage of the product price or a fixed currency amount. | Percentage | When Enable is not Disabled |
| **Deposit amount** | The deposit percentage or fixed amount for this product. Overrides the global default. | 50 | When Enable is not Disabled |
| **Payment plans** | Plans available specifically for this product. Overrides the global plan selection. | — | When Enable is not Disabled |
| **Enable pending payment notification** | Activates a product-specific reminder email sent before the scheduled payment date arrives. | No | When Enable is not Disabled |
| **Notification date** | A calendar date on or before which the reminder email is sent. | — | When pending notification is Yes |
| **Days before notification date** | Send the reminder this many days before the notification date as well. Enter `0` to send only on the date itself. | 0 | When pending notification is Yes |

**Example:** A photography course priced at $800 where you want a $200 deposit — set **Partial payment type** to **Fixed amount**, set **Deposit amount** to `200`, and set **Enable partial payment** to **Enabled (required)**. Every buyer pays $200 at checkout; the remaining $600 is collected later.

## Customer Experience

### Product Detail Page

When partial payment is set to **Enabled (optional)**, a toggle appears between the product price and the add-to-cart button. The customer sees two choices:

- **Pay in Full** — proceeds normally
- **Pay Deposit** — shows the deposit label, for example "Pay a 30% deposit" or "Pay a deposit of $150"

The option marked as the default is pre-selected, but the customer can switch before adding to the cart.

When partial payment is **Enabled (required)**, the deposit label displays without a toggle — the customer always pays the deposit at checkout.

<!-- SCREENSHOT: Product detail page showing the Pay in Full / Pay Deposit toggle -->

### Cart

Line items that use partial payment display a **Deposit** badge next to the product name. The cart totals section shows two extra rows:

- **Full Subtotal** — the complete price before the deposit arrangement
- **Future Payments** — the balance remaining after today's deposit

<!-- SCREENSHOT: Cart showing a Deposit badge on a line item and the Full Subtotal / Future Payments rows -->

### Checkout

If you have configured **Allowed payment methods**, the checkout payment step only shows the gateways that are permitted for partial payment orders. This prevents customers from accidentally choosing a gateway that does not support the deposit workflow.

The order total shown at checkout depends on the **Payment display** setting — either the full order amount with the deposit called out, or only the deposit amount due today.

### Customer Profile — Pay Now

After the deposit order is placed, the customer can see the remaining scheduled payment in their account under **My Profile** -> **Orders**. When the balance becomes due, a **Pay Now** alert appears on that order detail page with a direct link to complete the payment.

<!-- SCREENSHOT: Customer profile order detail showing the Pay Now alert and balance amount -->

## Payment Plans (Admin Plans CRUD)

Payment plans let you define instalment schedules — for example, "three monthly payments of 33%" — that can be assigned to products or used as the global default.

**Plans are a Tranche 3 (coming soon) feature.** The database tables and the plan-selector field are in place, so plans can be created directly in the database now if needed. A full admin UI for creating and managing plans from inside J2Commerce will be available in a future release.

When the Plans admin UI ships, you will find it under **J2Commerce** -> **Apps** -> **Partial Payment** -> **Plans**.

Each plan will support:
- A name and description shown to customers
- Multiple schedule rows, each specifying a payment amount and an interval (days, weeks, months, or years after the order)

## Email Templates

Three email templates are installed automatically. You can view and edit them from the database or — once the Tranche 3 Email Templates admin UI ships — directly inside J2Commerce.

| Template type | When it sends | Default subject |
|---------------|---------------|-----------------|
| `on_enable_pay` | When a scheduled order is activated by the cron and is ready for the customer to pay the balance | "Your order for [PARTIAL_PAYMENT_ORDER_ITEM_NAME] is ready for payment" |
| `notify_pending_payment` | On each day listed in the **Notify payment pending on (days)** setting, after the due date has passed | "Your order for [PARTIAL_PAYMENT_ORDER_ITEM_NAME] is overdue" |
| `thanks_for_deposit_payment` | Immediately after the customer's deposit payment is confirmed | "[PARTIAL_PAYMENT_ORDER_ITEM_NAME] - Thank you for your deposit payment!" |

### Merge Tags

Use these tags anywhere in the subject or body of an email template. They are replaced with actual values when the email sends.

| Merge tag | What it inserts |
|-----------|-----------------|
| `[CUSTOMER_NAME]` | The customer's full name |
| `[PARTIAL_PAYMENT_ORDER_ITEM_NAME]` | The product name from the order |
| `[INVOICE_URL]` | A direct link to the customer's invoice / order detail page |
| `[PARTIAL_PAYMENT_DAYS_PASSED]` | Number of days elapsed since the scheduled payment date (used in overdue reminders) |
| `[PAID_PARTIAL_AMOUNT]` | The deposit amount the customer has already paid |
| `[PARTIAL_PAYMENT_FULL_AMOUNT]` | The full order total |
| `[BALANCE_PARTIAL_AMOUNT]` | The outstanding balance still owed |
| `[PARTIAL_PAYMENT_DATE]` | The scheduled payment due date |

## Cron Setup

The cron job drives two key actions: activating scheduled orders when their payment date arrives, and sending payment-due emails to customers.

**Run the cron at least once per day.** Running it more frequently (for example, every four hours) means customers are notified sooner when a balance becomes due.

### Option A — Joomla Scheduler (Recommended)

A companion Joomla Task plugin that wires the partial payment cron into the native Joomla Scheduler is coming in Tranche 3. Once installed, no server-level cron is required.

### Option B — Server Cron

Copy the **Cron URL** shown in the plugin's General Settings tab. Add an entry to your server's cron table that calls this URL once daily.

**cPanel example:**
1. Log in to cPanel and open **Cron Jobs**.
2. Set the schedule to once daily (for example, `0 6 * * *`).
3. Paste the cron URL into the command field, using: `curl -s "PASTE_YOUR_CRON_URL_HERE" > /dev/null 2>&1`

**Linux crontab example:**
```
0 6 * * * curl -s "https://www.example.com/?option=com_j2commerce&task=..." > /dev/null 2>&1
```

<!-- SCREENSHOT: cPanel Cron Jobs page with the partial payment cron URL pasted in the command field -->

## What's New in J2Commerce 6

The original J2Store version of this plugin has been rewritten from the ground up for J2Commerce 6. These changes are invisible to store owners but mean the plugin is faster, more secure, and fully compatible with Joomla 6.

- **Security — JSON instead of PHP serialize:** Partial payment data stored on order items previously used PHP `serialize()`, which is a known attack vector when user-supplied data reaches `unserialize()`. All stored data is now JSON, eliminating this class of vulnerability.
- **Security — no core schema mutation:** The old version modified the J2Commerce core `cartitems` table schema. The new version uses the standard metafields system and its own dedicated tables, leaving the core schema untouched. This means updates to J2Commerce 6 core cannot break partial payment data.
- **Compatibility — dual-shape OrderStatusChange:** The J2Commerce 6 core dispatches order status change events in two different argument shapes depending on the call site. The plugin correctly handles both shapes so status transitions are never missed.
- **Security — Joomla Mailer with header-injection guards:** Reminder emails are now sent through Joomla's native mail system with proper input sanitization. Raw `mail()` calls and unescaped header construction from the original plugin are gone.
- **Modern JavaScript:** The payment-method filter at checkout is implemented in vanilla ES6+ JavaScript. No jQuery dependency.
- **Parameterized SQL throughout:** Every database query uses bound parameters. The original plugin contained SQL injection risks from concatenated user values in WHERE clauses; all of these have been eliminated.

## Troubleshooting

### The "Scheduled" order status does not appear in the order status list

The installer script creates the "Scheduled" status automatically on first install. If it is missing, go to **J2Commerce** -> **Configuration** -> **Order Statuses** and check whether it was manually deleted. You can re-add it there with the label "Scheduled" and a Yellow/Warning colour. After adding it, return to the Partial Payment plugin settings and select it in the **Scheduled order status** field.

### Reminder emails are not sending

Check the following in order:

1. Confirm the cron job is running. Visit the Cron URL in a browser — you should see a success message.
2. Verify Joomla's email settings at **System** -> **Global Configuration** -> **Server** tab. Send a test email to confirm basic email delivery is working.
3. In the plugin's **Mail Settings** tab, confirm that **Send email when order is ready for payment** is set to **Yes**.
4. Enable **Debug mode** in the plugin's General Settings. Run the cron again and check the J2Commerce log at **J2Commerce** -> **Reports** or the Joomla error log for any error messages.
5. Check that the email template for the relevant email type (`on_enable_pay`, `notify_pending_payment`) is enabled in the database.

### The balance shown in the cart or checkout appears in the wrong currency

The plugin reads the active currency from the customer's session at the time the deposit is recorded. If you switch currencies in the store admin after orders are placed, existing orders retain the currency from the original session. For new orders, ensure the currency switcher is set correctly before the customer adds to the cart. If the mismatch persists, confirm that the J2Commerce currency plugin is enabled and that exchange rates are current.

### Customers can still choose a payment method that should be restricted

Open the plugin's General Settings tab. In the **Allowed payment methods** field, confirm your intended gateway appears in the selected list and that no entries have been accidentally removed. If the field is empty, all gateways are allowed — add your permitted gateways explicitly. After saving, clear the Joomla cache at **System** -> **Clear Cache**.

### The Pay Now button does not appear on the customer's profile

The Pay Now link appears only when the order has reached the status configured in **Scheduled order status** and the cron has processed the scheduled instalment. Confirm:

1. The order's current status matches the configured scheduled status.
2. The cron has run since the payment date passed.
3. The customer is viewing the correct order in their profile (not the parent order for a multi-instalment plan).

## Related Topics

- [Payment Methods](../../payment-methods/payment_cash.md) — configure the gateways used at checkout
- [Order Statuses](../../setup/index.md) — manage and customize order statuses
- [Apps and Extensions](../index.md) — browse all available J2Commerce add-ons
