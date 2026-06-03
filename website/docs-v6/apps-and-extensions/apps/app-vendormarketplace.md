---
title: "Vendor Marketplace"
sidebar_label: "Vendor Marketplace"
sidebar_position: 10
description: "Turn your J2Commerce store into a multi-vendor marketplace. Independent vendors list products, earn commissions on sales, and receive payouts."
---

# Vendor Marketplace

The Vendor Marketplace app transforms your J2Commerce store into a multi-vendor platform. Each vendor gets a public store page, a self-service dashboard to manage their products, and an automated commission system that tracks earnings on every sale.

This add-on is ideal for marketplaces, curated directories, and B2B wholesale portals where multiple sellers operate under a single storefront.

## Requirements

- PHP 8.3+
- Joomla 6.x
- J2Commerce 6.x

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_vendormarketplace.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_vendormarketplace.zip` package file.
4. The plugin installs and enables automatically.

After installation, go to **J2Commerce** -> **Apps** to configure the plugin.

<!-- SCREENSHOT: Apps list with Vendor Marketplace highlighted -->

***

## Configuration

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

Open the plugin by clicking **Vendor Marketplace** in the Apps list.

### Basic Tab

| Setting                          | Description                                                                                                        | Default                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| **Default Commission Rate (%)**  | Global commission rate applied when no vendor or product override exists.                                          | `15`                                  |
| **Default Product Approval**     | Whether vendor-submitted products require admin review before publishing.                                          | Manual                                |
| **Vendor Sign-Up Mode**          | Who can register as a vendor: open to anyone, invitation only, or admin-creates-only.                              | Invitation only                       |
| **Re-validate Products on Edit** | When enabled, editing an approved product resets it to Pending Review.                                             | No                                    |
| **Commission Trigger Statuses**  | Order statuses that cause commissions to be calculated. Select the status that represents a confirmed, paid order. | *(empty — falls back to status ID 3)* |
| **Commission Void Statuses**     | Order statuses that void or reverse existing commissions (for refunds and cancellations).                          | *(empty — falls back to status ID 8)* |
| **Debug Mode**                   | Logs additional detail to the Joomla log. Disable on production.                                                   | No                                    |

:::tip Configuring Trigger and Void Statuses

After installation, open the plugin settings and set **Commission Trigger Statuses** to the order status your payment gateway sets when payment is confirmed (typically "Confirmed" or "Processed"). Set **Commission Void Statuses** to "Cancelled" or your refund status. Commissions will not be calculated until at least one trigger status is selected.

:::

### Payout Settings Tab

| Setting                       | Description                                                                           | Default |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------- |
| **Default Minimum Payout**    | Global minimum unpaid balance required before a payout fires.                         | `25.00` |
| **Default Payout Schedule**   | When payouts are sent: manual, weekly, monthly, threshold-based, or combined.         | Monthly |
| **Default Payout Day**        | Day of the month (1–31) for monthly schedules, or day of week (0=Sunday) for weekly.  | `15`    |
| **Enable PayPal Payouts**     | Allow vendor payouts via the PayPal Payouts API.                                      | Yes     |
| **PayPal Environment**        | Sandbox for testing; Live for production.                                             | Sandbox |
| **PayPal Client ID / Secret** | REST API credentials from your PayPal developer dashboard.                            | —       |
| **Enable Stripe Connect**     | Allow vendor onboarding and payouts via Stripe Connect Express.                       | Yes     |
| **Stripe Secret Key**         | Platform Stripe secret key (`sk_live_...` or `sk_test_...`).                          | —       |
| **Stripe Webhook Secret**     | Signing secret for Stripe webhook payload verification (`whsec_...`).                 | —       |
| **Cross-Currency Handling**   | What to do when order items are in a different currency from the store base currency. | Reject  |

### Display Settings Tab

| Setting                         | Description                                                                             | Default           |
| ------------------------------- | --------------------------------------------------------------------------------------- | ----------------- |
| **Show Vendor on Product Page** | Display a "Sold by \[vendor]" badge on the product detail page.                         | Yes               |
| **Vendor Name Links To**        | Whether clicking the vendor name on a product page goes to their store page or nowhere. | Vendor store page |
| **Subtemplate**                 | Layout subtemplate used for vendor-facing pages.                                        | Bootstrap 5       |

***

## Vendor Profiles

Each vendor who registers through the marketplace gets a profile that controls their public store page and commission settings.

### Accessing Vendor Profiles

Admin-managed vendor profiles are edited from the vendor edit form.

1. Go to **J2Commerce** -> **Catalog** -> **Vendors**.
2. Click a vendor's name to open it.
3. Select the **Marketplace** tab.

<!-- SCREENSHOT: Vendor edit form with Marketplace tab highlighted -->

### Marketplace Tab Fields

| Field                            | Description                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| **Store Name**                   | Public brand name shown on the vendor store page.                                   |
| **Store URL Slug**               | URL-safe identifier used in `/vendor/[slug]`. Must be unique.                       |
| **Logo URL**                     | Full URL to the vendor logo image.                                                  |
| **Short Description**            | Brief summary shown in meta descriptions and the store page header.                 |
| **About**                        | Longer text shown in the About section of the store page. Basic HTML is allowed.    |
| **Commission Rate Override (%)** | Override the global rate for this vendor. Leave blank to use the global default.    |
| **Auto-Approve Products**        | When enabled, this vendor's product submissions are published without admin review. |
| **Payout Method**                | How this vendor receives payouts: PayPal, Stripe Connect, or Manual.                |
| **PayPal Email**                 | Vendor's PayPal email for receiving payouts.                                        |
| **Payout Schedule**              | Per-vendor override for payout frequency. Leave blank to use the global default.    |
| **Minimum Payout Amount**        | Per-vendor override for the minimum balance before a payout fires.                  |

***

## Product Approvals

When **Default Product Approval** is set to Manual, vendor-submitted products go into a review queue before they are published.

### Reviewing Pending Products

1. Go to **J2Commerce** -> **Apps** -> **Vendor Marketplace** -> **Approvals**.
2. The list shows all products awaiting review with vendor name, submission date, and a product preview link.
3. Click **Approve** to publish the product immediately.
4. Click **Reject** to open a reason dialog, enter a rejection note, and submit.

<!-- SCREENSHOT: Admin approvals list showing pending products -->

The plugin sends automatic email notifications:

- **Vendor receives** an email when their product is approved or rejected.
- **Admin receives** an email when a vendor submits a new product.

### Per-Vendor Auto-Approval

To skip the review queue for a trusted vendor, open their vendor profile and set **Auto-Approve Products** to **Yes**. Products submitted by that vendor are published immediately without appearing in the approvals queue.

***

## Commission Engine

The commission engine automatically calculates vendor earnings on every qualifying order. Commissions are recorded per order item so each vendor receives a separate commission record for each product they sold.

### How Commissions Are Calculated

When an order reaches one of the configured **Commission Trigger Statuses**, the engine runs once per order item that has a vendor assigned. The calculation is:

```
Commission Amount = (Item Price × Quantity) × (Commission Rate ÷ 100)
```

The rate applied to each item is resolved in priority order:

| Priority    | Source                                    | Example                      |
| ----------- | ----------------------------------------- | ---------------------------- |
| 1 (highest) | Product-specific rule in Commission Rules | Product ID 42 → 10%          |
| 2           | Category rule in Commission Rules         | Category "Electronics" → 12% |
| 3           | Vendor rule in Commission Rules           | Vendor "Acme" → 14%          |
| 4           | Vendor profile commission rate override   | Vendor profile → 18%         |
| 5           | Global rule in Commission Rules           | Global → 15%                 |
| 6 (lowest)  | Plugin param: Default Commission Rate     | Config → 15%                 |

Commission records are **idempotent** — if the trigger fires twice for the same order (e.g., a webhook retry), the engine skips items that already have a commission record.

### Commission Statuses

Each commission record moves through the following states:

| Status       | Meaning                                                                               |
| ------------ | ------------------------------------------------------------------------------------- |
| **Pending**  | Calculated but not yet reviewed.                                                      |
| **Approved** | Admin has confirmed the commission is valid for payout.                               |
| **Paid**     | Included in a completed payout to the vendor.                                         |
| **Voided**   | Cancelled before being paid — no payout will be made.                                 |
| **Reversed** | A paid commission was clawed back after a refund. Manual vendor recovery is required. |

### Refund Clawback

When an order reaches one of the configured **Commission Void Statuses**, the engine automatically voids all pending and approved commissions for that order. If a commission has already been paid, it is marked **Reversed** with a note for manual follow-up — the system does not automatically recover funds from the vendor's payout.

### Viewing Commissions (Admin)

1. Go to **J2Commerce** -> **Apps** -> **Vendor Marketplace** -> **Commissions**.
2. Use the **Status** filter to view commissions by state (All, Pending, Approved, Paid, Voided).
3. The table shows vendor, order, item, gross total, rate, commission amount, status, and date.
4. Click **Approve** on a Pending commission to mark it ready for payout.
5. Click **Void** on a Pending or Approved commission to cancel it.

<!-- SCREENSHOT: Admin commissions list with approve and void buttons -->

### Vendor Dashboard — Commissions Tab

Vendors can view their own commission history from their dashboard.

1. The vendor logs in and navigates to the **Vendor Dashboard** menu item.
2. Select the **Commissions** tab.
3. Use the status filter to view commissions by state.

Vendors see their own records only — they cannot see other vendors' commissions.

***

## Commission Rules

Commission Rules let you override the default rate for specific vendors, products, or categories. Rules are evaluated in priority order (product beats category beats vendor) before falling back to the global default.

### Managing Commission Rules

1. Go to **J2Commerce** -> **Apps** -> **Vendor Marketplace** -> **Commissions**.
2. Click the **Commission Rules** button in the top right.
3. The rules list shows all active overrides with scope type, scope ID, rate, priority, and status.

<!-- SCREENSHOT: Commission Rules list -->

### Adding a Rule

1. Click **Add Rule** in the top right.
2. Fill in the form fields:

| Field                   | Description                                                                    | Example     |
| ----------------------- | ------------------------------------------------------------------------------ | ----------- |
| **Scope Type**          | What the rule applies to: Global, Per Vendor, Per Product, or Per Category.    | Per Product |
| **Scope ID**            | The ID of the vendor, product, or category. Leave 0 for Global rules.          | `42`        |
| **Commission Rate (%)** | The override rate to apply.                                                    | `10.00`     |
| **Priority**            | Higher number wins when multiple rules could match. Use 0 for normal priority. | `10`        |
| **Enabled**             | Toggle the rule on or off without deleting it.                                 | Enabled     |

1. Click **Save** to apply the rule immediately.

### Editing and Deleting Rules

- Click **Edit** (pencil icon) next to a rule to modify it.
- Click the **Delete** button (trash icon) next to a rule and confirm the prompt to remove it permanently.

:::tip Common Rule Patterns

- **Reduce rate for a high-volume vendor:** Add a Vendor rule with their vendor ID and a lower rate.
- **Increase rate for a promoted product category:** Add a Category rule with the category ID and the promotional rate.
- **Zero-commission products (e.g., samples):** Add a Product rule for the specific product ID with rate `0.00`.

:::

***

## Vendor Store Pages

Each vendor with a published store profile gets a public store page at `/vendor/[slug]`. The page shows:

- Store name and logo
- Short description and About section
- "Member since" date
- All published products assigned to that vendor

The **Show Vendor on Product Page** setting controls whether product pages display a "Sold by \[vendor name]" badge that links back to the vendor store.

***

## Vendor Dashboard

Vendors access their self-service dashboard through a standard Joomla menu item.

### Creating the Menu Item

1. Go to **Menus** -> **\[Your Menu]** -> **Add New Menu Item**.
2. Set **Menu Item Type** to **J2Commerce** -> **Vendor Dashboard**.
3. Set **Default Tab** to the tab shown on initial load (Sales, Commissions, Payouts, Profile, or Products).
4. Save and assign to your menu.

Non-vendor users who visit this page are redirected to the Joomla login page.

### Dashboard Tabs

| Tab               | Contents                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Sales**         | KPI cards (gross sales, items sold, orders, pending commission) and a recent orders table with date range filter.      |
| **Commissions**   | Commission history with status filter showing vendor's own commission records.                                         |
| **Payouts**       | Payout history showing each payout's date, amount, gateway, status, and reference. Includes a link to Payout Settings. |
| **Products**      | Product list with add/edit/delete. Submitted products show approval status badge.                                      |
| **Store Profile** | Edit store name, slug, logo, description, and About section.                                                           |

***

## Payouts

The payout system automatically disburses approved commissions to vendors through their configured payment method. Commissions with status **Approved** are collected into a single payout per vendor per run.

### How Payouts Work

1. The payout processor fetches all **Approved** commissions for a vendor.
2. It checks whether the total meets the configured minimum payout threshold (vendor override or global default).
3. A payout record is created in the database with status **Pending**.
4. Commission records are updated to **Paid** and linked to the payout.
5. The gateway API is called (PayPal or Stripe). On success the payout moves to **Completed**.
6. If the gateway call fails, the payout moves to **Failed** and all commissions revert to **Approved** so they are included in the next run.

Payout creation and gateway execution run in a database transaction — a gateway failure never leaves commission records stranded in a paid state.

### Payout Statuses

| Status         | Meaning                                                                            |
| -------------- | ---------------------------------------------------------------------------------- |
| **Pending**    | Payout row created; gateway call not yet complete.                                 |
| **Processing** | Gateway accepted the payout; awaiting webhook confirmation.                        |
| **Completed**  | Gateway confirmed successful disbursement.                                         |
| **Failed**     | Gateway rejected or timed out; commissions reverted to Approved.                   |
| **Manual**     | Admin recorded an external payment (wire, cheque, etc.) without calling a gateway. |

### Payout Schedule

The schedule controls when automatic payouts fire (via the J2Commerce task plugin or a cron job calling the payout endpoint).

| Schedule Type | When payouts fire                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------- |
| **Manual**    | Never automatic — admin must trigger payouts.                                                  |
| **Weekly**    | Once per week on the configured payout day (0 = Sunday).                                       |
| **Monthly**   | Once per month on the configured payout day (1–31).                                            |
| **Threshold** | As soon as the vendor's approved balance reaches the minimum.                                  |
| **Combined**  | Threshold-based — fires on the configured day OR when threshold is hit, whichever comes first. |

Per-vendor schedule overrides take precedence over the global default. Set a per-vendor schedule in the vendor's **Payout Settings** tab or through the vendor dashboard.

### Admin Payouts View

1. Go to **J2Commerce** -> **Apps** -> **Vendor Marketplace** -> **Payouts**.
2. The list shows all payouts with vendor, date, amount, gateway, status, and reference.
3. Use the **Status** filter to narrow results (All, Pending, Processing, Completed, Failed, Manual).
4. Use the **Vendor ID** field to show payouts for a specific vendor.
5. Click **Mark as Paid** on a Pending or Failed payout to record a manual payment without calling a gateway.

<!-- SCREENSHOT: Admin payouts list with filter bar and Mark as Paid button -->

### Triggering a Manual Payout (Admin)

To send a payout for a specific vendor immediately:

1. Go to **J2Commerce** -> **Apps** -> **Vendor Marketplace** -> **Payouts**.
2. Click **New Payout** (if visible) or use the payout API endpoint.
3. Select the vendor and confirm. The system calls the vendor's configured gateway.

To record a payment you made outside the system (wire transfer, cheque):

1. Find the payout in the list (status Pending or Failed).
2. Click **Mark as Paid**.
3. Enter an optional reference number (e.g., wire transfer ID) and a note.
4. Click **Confirm**. The payout status changes to **Manual** and commissions remain marked as Paid.

### Vendor Dashboard — Payouts Tab

Vendors can view their own payout history from their dashboard.

1. The vendor logs in and navigates to the **Vendor Dashboard** menu item.
2. Select the **Payouts** tab.
3. The table shows each payout with ID, date, gross amount, net amount (if a fee applies), gateway, status badge, and reference.

Vendors see their own records only.

### Vendor Dashboard — Payout Settings

Vendors can configure their preferred payout method from their dashboard.

1. Select the **Payouts** tab and click **Payout Settings**.
2. Choose a payout method: **PayPal**, **Stripe Connect**, or **Manual** (admin-managed).
3. For PayPal: enter the vendor's PayPal email address.
4. For Stripe Connect: click **Connect with Stripe** to begin the onboarding flow (see below).
5. Set an optional **Minimum Payout Threshold** to override the global default.
6. Choose a **Payout Schedule** if a per-vendor override is needed.
7. Click **Save Payout Settings**.

### Payout Email Notifications

| Notification                | Recipient | Trigger                            |
| --------------------------- | --------- | ---------------------------------- |
| Payout processed            | Vendor    | Payout status changes to Completed |
| Payout failed               | Admin     | Payout status changes to Failed    |
| Payout failed (vendor copy) | Vendor    | Payout status changes to Failed    |

Email templates are stored in `plugins/j2commerce/app_vendormarketplace/tmpl/email/`. Customize them by editing the HTML files directly.

***

## Stripe Connect Onboarding

Stripe Connect Express allows vendors to receive payouts directly to their own Stripe account. The marketplace (your store) acts as the platform; each vendor has a connected Express account.

### Platform Setup

Before vendors can onboard, configure your Stripe platform credentials in the plugin settings:

1. Go to **J2Commerce** -> **Apps** -> **Vendor Marketplace** and open settings.
2. Select the **Payout Settings** tab.
3. Enable **Enable Stripe Connect**.
4. Enter your platform **Stripe Secret Key** (`sk_live_...` for production, `sk_test_...` for testing).
5. Enter the **Stripe Webhook Secret** from your Stripe dashboard (begins with `whsec_`).
6. Save the plugin.

### Webhook Configuration

Stripe sends webhook events to confirm transfer outcomes and account updates. Set up the webhook endpoint in your Stripe dashboard:

1. Go to **Developers** -> **Webhooks** -> **Add Endpoint**.
2. Enter the webhook URL:

   ```
   https://yoursite.com/index.php?option=com_j2commerce&view=appplugin&plugin=app_vendormarketplace&task=stripeWebhook
   ```
3. Select the following events to listen for:

   - `transfer.failed`
   - `account.updated`
4. Copy the **Signing Secret** (`whsec_...`) and paste it into the **Stripe Webhook Secret** plugin setting.

### Vendor Onboarding Flow

1. The vendor opens their **Payout Settings** and selects **Stripe Connect** as their method.
2. They click **Connect with Stripe**.
3. They are redirected to Stripe's hosted onboarding form to enter business and banking details.
4. After completing the form, Stripe redirects back to the vendor's **Payout Settings** page.
5. The plugin reads the account status:

   - **Active** — onboarding complete; transfers enabled.
   - **Pending** — Stripe is still reviewing the account. Payouts will be held until active.
   - **Restricted** — Stripe requires additional information. The vendor sees a **Continue Onboarding** button to return to Stripe and complete verification.

### Transfer Model

The Vendor Marketplace uses the **Separate Charges and Transfers** model. Your platform captures all customer payments. When a payout fires, the system creates a Stripe Transfer from your platform balance to the vendor's connected account. This requires sufficient platform balance before transfers can be sent.

### Checking Onboarding Status (Admin)

The vendor's current Stripe onboarding status is stored in their profile. View it by opening the vendor's record in **Catalog** -> **Vendors** -> **Marketplace tab** -> **Stripe Onboarding Status** field.

***

## PayPal Payouts

PayPal payouts use the PayPal Payouts API v1 to send funds directly to a vendor's PayPal account.

### Setup

1. Go to **J2Commerce** -> **Apps** -> **Vendor Marketplace** and open settings.
2. Select the **Payout Settings** tab.
3. Enable **Enable PayPal Payouts**.
4. Set **PayPal Environment** to **Sandbox** for testing or **Live** for production.
5. Enter your **PayPal Client ID** and **PayPal Secret** from the [PayPal Developer Dashboard](https://developer.paypal.com).
6. Save the plugin.

Your PayPal account must have the Payouts feature enabled. Contact PayPal to enable it if needed.

### Webhook Configuration

PayPal sends webhook events to confirm payout outcomes. Set up the webhook in your PayPal developer dashboard:

1. Go to **My Apps & Credentials** -> your app -> **Webhooks** -> **Add Webhook**.
2. Enter the webhook URL:

   ```
   https://yoursite.com/index.php?option=com_j2commerce&view=appplugin&plugin=app_vendormarketplace&task=paypalWebhook
   ```
3. Select the following events:

   - `PAYMENT.PAYOUTS-ITEM.SUCCEEDED`
   - `PAYMENT.PAYOUTS-ITEM.FAILED`
   - `PAYMENT.PAYOUTS-ITEM.RETURNED`
4. Copy the **Webhook ID** from the webhook details page and enter it as **PayPal Webhook ID** in the plugin settings.

Without the webhook ID configured, webhook signature verification is skipped in JDEBUG mode only. In production, unverified webhooks are rejected.

### Vendor Setup

The vendor enters their PayPal email address in **Payout Settings**. The platform sends payouts to that address. No vendor-side Stripe or OAuth flow is required — just an email address.

***

## Troubleshooting

### Commissions are not being created for orders

**Cause:** The **Commission Trigger Statuses** setting is empty or set to a status that your payment gateway does not use.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Vendor Marketplace** and open settings.
2. In the **Commission Trigger Statuses** field, select the order status that represents a confirmed, paid order (e.g., "Confirmed" or "Processed").
3. Save the plugin. New orders that reach that status will generate commissions.

Existing orders that reached the trigger status before this setting was configured will not be backfilled automatically.

### A commission shows as Reversed but the vendor was not charged back

**Cause:** The Vendor Marketplace engine marks already-paid commissions as Reversed for audit purposes, but does not automatically recover funds from a vendor's payout balance.

**Solution:**

Manual recovery is required. Contact the vendor and arrange repayment, or deduct the reversed amount from their next payout when processing payouts manually.

### The vendor store page returns a 404

**Cause:** The vendor profile may be missing a store slug, or the Joomla menu item for the vendor store routing has not been created.

**Solution:**

1. Open the vendor profile in **Catalog** -> **Vendors** -> **Marketplace tab**.
2. Ensure the **Store URL Slug** field is filled in with a URL-safe value (e.g., `acme-craftworks`).
3. Verify that a **Vendor Dashboard** menu item exists in your site menu.
4. Clear the Joomla cache (**System** -> **Clear Cache**).

### Products submitted by a vendor are not appearing in the approvals queue

**Cause:** The vendor's profile may have **Auto-Approve Products** enabled.

**Solution:**

Open the vendor's profile in **Catalog** -> **Vendors** -> **Marketplace tab** and set **Auto-Approve Products** to **No**. Future submissions from that vendor will require admin approval.

***

***

## Scheduled Payouts

Vendor payouts can be triggered automatically via the Joomla **Scheduled Tasks** system without any manual admin action.

### Installing the Scheduled Task Plugin

The `plg_task_j2commerce_marketplace_payouts` plugin ships separately from the main app plugin. Install it via **System** -> **Install** -> **Extensions**.

### Creating a Payout Task

1. Go to **System** -> **Scheduled Tasks**.
2. Click **New**.
3. Select **J2Commerce - Run Marketplace Scheduled Payouts** from the task type list.
4. Set your preferred schedule (daily is recommended — the plugin evaluates each vendor's individual schedule, not the cron frequency).
5. Configure the task options:

| Option                         | Default | Description                                                                                                  |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| Dry Run                        | No      | Log which vendors are due without creating payouts — useful for testing before going live.                   |
| Vendor Batch Size              | 50      | Max vendors evaluated per task execution. Increase for large marketplaces.                                   |
| Minimum Payout Amount Override | —       | Overrides each vendor's individual threshold for this run. Leave blank to use per-vendor or global defaults. |
| Notify Admin on Failure        | Yes     | Sends a failure report to the site administrator email when any payout fails.                                |

### How Schedule Evaluation Works

Each approved vendor can have an individual payout schedule set in their profile. The task evaluates each vendor independently:

| Schedule Type | Fires when                                                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Weekly**    | Today's weekday matches the vendor's chosen day AND the last successful payout was more than 6 days ago.                                                               |
| **Monthly**   | Today's day-of-month matches the vendor's chosen day (wraps to last day of month for months with fewer days) AND the last successful payout was more than 27 days ago. |
| **Threshold** | The vendor's outstanding approved commission balance equals or exceeds their configured threshold.                                                                     |
| **Combined**  | Both the time condition (weekly or monthly) AND the threshold condition must be true simultaneously.                                                                   |

Vendors with a **Manual** schedule are always skipped by the task; they must request payouts via the dashboard.

### Double-Charge Guard

Before creating a payout, the task checks for any existing payout in `pending` or `processing` status for that vendor. If one exists, the vendor is skipped to prevent duplicate payouts in the event of slow gateway responses.

***

## Extending the Marketplace (Developer Guide)

The Vendor Marketplace plugin provides a rich set of events that allow other J2Commerce app plugins to integrate tightly without modifying core marketplace code.

### Event Reference

All events are dispatched via the standard Joomla application dispatcher. Subscribe to them in your plugin's `getSubscribedEvents()` method.

#### `onJ2CommerceVendorDashboardMenu`

Fired by the vendor dashboard navigation partial. Add tabs to the vendor's dashboard sidebar.

**Arguments:**

| Argument | Type                   | Description                                   |
| -------- | ---------------------- | --------------------------------------------- |
| `$menu`  | `array` (by reference) | Array of existing nav items. Append your own. |

**Usage:**

```php
public function onJ2CommerceVendorDashboardMenu(Event $event): void
{
    $menu   = $event->getArgument('menu', []);
    $menu[] = [
        'key'   => 'my_app',
        'label' => 'PLG_J2COMMERCE_MY_APP_NAV_LABEL',
        'route' => 'index.php?option=com_j2commerce&view=vendor_dashboard&layout=my_app',
        'icon'  => 'fa-solid fa-star',
    ];
    $event->setArgument('menu', $menu);
}
```

**Notes:**

- Keys must be unique. If your key matches a core tab (`sales`, `products`, `commissions`, `payouts`, `profile`), your tab is silently ignored.
- The `label` value is passed through `Text::_()`, so it can be a language key string.

***

#### `onJ2CommerceVendorDashboardLayout`

Fired when the vendor requests a layout that is not one of the built-in core layouts. Allows your app to render an entire custom dashboard section.

**Arguments:**

| Argument  | Type     | Description                                                |
| --------- | -------- | ---------------------------------------------------------- |
| `$layout` | `string` | The requested layout name (from URL `?layout=`).           |
| `result`  | `array`  | Append HTML strings here using `$event->addResult($html)`. |

**Usage:**

```php
public function onJ2CommerceVendorDashboardLayout(Event $event): void
{
    if ($event->getArgument('layout') !== 'my_app') {
        return;
    }

    ob_start();
    include __DIR__ . '/../../tmpl/my-app-dashboard.php';
    $html = ob_get_clean();

    $result   = $event->getArgument('result', []);
    $result[] = $html;
    $event->setArgument('result', $result);
}
```

**Notes:**

- Only the first non-empty HTML string in the `result` array is used.
- If no listener provides HTML for an unknown layout, the dashboard falls back to the `sales` layout.
- Your listener must check `$layout` before rendering — multiple apps may listen to this event.

***

#### `onJ2CommerceMarketplaceVendorStorePage`

Fired on the public vendor store page at specific injection points. Use this to add sidebars, review summaries, social proof widgets, or any supplementary content.

**Arguments:**

| Argument    | Type     | Description                                              |
| ----------- | -------- | -------------------------------------------------------- |
| `$vendorId` | `int`    | The vendor's ID.                                         |
| `$profile`  | `object` | The vendor profile record.                               |
| `$section`  | `string` | Injection point: `'header'`, `'sidebar'`, or `'footer'`. |
| `result`    | `array`  | Append HTML using `$event->addResult($html)`.            |

**Usage:**

```php
public function onJ2CommerceMarketplaceVendorStorePage(Event $event): void
{
    if ($event->getArgument('section') !== 'sidebar') {
        return;
    }

    $vendorId = $event->getArgument('vendorId');
    // ... generate HTML for this vendor's review summary ...
    $html = $this->renderReviewSummary($vendorId);

    $result   = $event->getArgument('result', []);
    $result[] = $html;
    $event->setArgument('result', $result);
}
```

**Notes:**

- `sidebar` content appears in a responsive `col-lg-3` column next to the product grid.
- `header` content appears above the hero section; `footer` appears below the product grid.
- All three sections are output only when at least one listener provides non-empty HTML.

***

#### `onJ2CommerceMarketplaceVendorOnboardingStep`

Fired on the vendor profile dashboard page after the main profile form. Allows other apps to inject additional onboarding steps (agreements, KYC prompts, tax form collection, etc.).

**Arguments:**

| Argument    | Type     | Description                                                           |
| ----------- | -------- | --------------------------------------------------------------------- |
| `$vendorId` | `int`    | The vendor's ID.                                                      |
| `$step`     | `string` | The current step context (e.g., `'profile'`, `'kyc'`, `'agreement'`). |
| `result`    | `array`  | Append HTML using `$event->addResult($html)`.                         |

**Usage:**

```php
public function onJ2CommerceMarketplaceVendorOnboardingStep(Event $event): void
{
    if ($event->getArgument('step') !== 'profile') {
        return;
    }

    $vendorId = $event->getArgument('vendorId');
    // ... render a "Sign Agreement" card if agreement not yet signed ...
    $html = $this->renderAgreementCard($vendorId);

    $result   = $event->getArgument('result', []);
    $result[] = $html;
    $event->setArgument('result', $result);
}
```

***

#### `onJ2CommerceVendorBeforeRegister`

Fired before a vendor application is processed. Listeners can validate or decorate the submitted data, or stop propagation to block the application entirely.

**Arguments:**

| Argument | Type                   | Description                                                      |
| -------- | ---------------------- | ---------------------------------------------------------------- |
| `$data`  | `array` (by reference) | The submitted registration data. Mutate to decorate or validate. |

**Usage:**

```php
public function onJ2CommerceVendorBeforeRegister(Event $event): void
{
    $data = $event->getArgument('data', []);

    // Block applications without a valid VAT number
    if (empty($data['vat_number'])) {
        $event->stopPropagation(); // signals: block this application
        return;
    }

    // Decorate: normalise store name casing
    $data['store_name'] = ucwords(strtolower($data['store_name']));
    $event->setArgument('data', $data);
}
```

**Notes:**

- If `$event->stopPropagation()` is called, the application is rejected and the user sees a generic error message. Log the reason server-side.
- Mutations to `$data` are passed back to the application processor.

***

#### `onJ2CommerceVendorAfterRegister`

Fired after a vendor has been successfully registered. Use for CRM sync, custom welcome emails, referral tracking, etc.

**Arguments:**

| Argument    | Type    | Description                                                               |
| ----------- | ------- | ------------------------------------------------------------------------- |
| `$vendorId` | `int`   | The new vendor's ID.                                                      |
| `$data`     | `array` | The registration data as submitted (post-mutation from `BeforeRegister`). |

**Usage:**

```php
public function onJ2CommerceVendorAfterRegister(Event $event): void
{
    $vendorId = $event->getArgument('vendorId');
    $data     = $event->getArgument('data', []);

    // Sync to your CRM, send a branded welcome email, record a referral, etc.
    $this->myCrmClient->createContact($vendorId, $data);
}
```

***

#### Other Available Events

| Event                                          | Fires when                                 | Key use cases                                            |
| ---------------------------------------------- | ------------------------------------------ | -------------------------------------------------------- |
| `onJ2CommerceVendorBeforeProductSubmit`        | Vendor submits a product                   | Inject default fields, custom validation, spam filtering |
| `onJ2CommerceVendorAfterProductSubmit`         | Product is submitted                       | Sync to external catalogue, notify review team           |
| `onJ2CommerceCommissionCalculated`             | Commission is calculated for an order item | Override commission amount for loyalty programs          |
| `onJ2CommerceMarketplaceCommissionRateResolve` | Commission rate is resolved                | Override rate per vendor/category/product                |
| `onJ2CommerceVendorBeforePayout`               | Payout is about to be created              | Fraud screening, final balance check                     |
| `onJ2CommerceVendorAfterPayout`                | Payout is created successfully             | Accounting export, vendor notification                   |
| `onJ2CommerceVendorPayoutFailed`               | Payout creation fails                      | Custom alerting, retry queue                             |
| `onJ2CommerceMarketplacePayoutMethods`         | Payout gateway list is built               | Register custom gateways (Wise, Payoneer, etc.)          |
| `onJ2CommerceMarketplaceProductCard`           | A vendor product card is rendered          | Add vendor badge, ratings, badges                        |

***

## FAQ

### Can two app plugins both add dashboard tabs?

Yes. Both plugins listen to `onJ2CommerceVendorDashboardMenu` independently. Each appends its own tab entry to the menu array. Tabs with duplicate keys are ignored (first registered wins), so use namespaced key names like `my_plugin_reviews` rather than generic names like `reviews`.

### Can I render a custom dashboard layout that includes the standard nav tabs?

Yes. In your `onJ2CommerceVendorDashboardLayout` listener, include the nav partial directly in your output buffer:

```php
ob_start();
// The nav partial expects $layout and $profile variables in scope
$layout = 'my_app';
// $profile must be loaded from ProfileModel for the current vendor
include JPATH_PLUGINS . '/j2commerce/app_vendormarketplace/tmpl/dashboard/_nav.php';
// ... your content ...
$html = ob_get_clean();
```

### Do scheduled payouts and manual payouts interact?

Manual payouts follow the same `PayoutProcessor::createPayout()` path as scheduled payouts. Both check for an existing `pending`/`processing` payout before creating a new one, so a manually triggered payout will prevent the scheduled task from firing a duplicate for the same vendor.

### What happens if a vendor's payout gateway is not configured?

`PayoutProcessor::createPayout()` falls back to a `manual` payout record when no active gateway is configured. The admin is notified via the payout failure email (if **Notify Admin on Failure** is enabled on the scheduled task). The payout record is created with status `pending` and can be marked paid manually.

### How do I test scheduled payouts without affecting real payouts?

Enable **Dry Run** on the scheduled task. The task logs which vendors would be paid and why, but creates no payout records.

### Can a vendor opt out of automatic payouts?

Yes. In the vendor profile dashboard, the vendor can set their **Payout Schedule** to **Manual**. Vendors with a manual schedule are skipped entirely by the scheduled payout task.

### Does this plugin work alongside app\_vendormanagement?

Yes — both plugins operate on disjoint database tables. `app_vendormanagement` manages dealer tiers and bulk discounts; `app_vendormarketplace` manages vendor storefronts and commissions. They share the core `#__j2commerce_vendors` table in read-only fashion. There is no interaction between the two commission engines.

***

## Troubleshooting

### Scheduled task runs but no payouts are created

**Possible causes:**

1. **Dry Run is enabled** — check the task configuration.
2. **No vendors have a non-manual schedule** — all vendors are set to Manual.
3. **Vendors are not due yet** — for weekly/monthly schedules, the gap since the last payout must exceed 6 or 27 days respectively.
4. **Balances below threshold** — for threshold/combined schedules, the outstanding balance must equal or exceed the configured threshold.
5. **All due vendors already have a pending payout** — the double-charge guard is preventing creation.

Enable **Dry Run** and check the Joomla task log (**System** -> **Scheduled Tasks** -> click your task -> **Logs**) for per-vendor evaluation details.

### A vendor's payout was not created but no failure email was sent

The failure email only fires when `notify_admin_on_failure` is set to **Yes** AND at least one `PayoutProcessor::createPayout()` call returned `success = false`. Check the Joomla error log at `administrator/logs/plg_task_j2commerce_marketplace_payouts.php` for detailed error messages.

### `onJ2CommerceVendorDashboardMenu` listener tab not appearing

Check:

1. The `key` in your appended menu item does not clash with a core tab key (`sales`, `products`, `commissions`, `payouts`, `profile`).
2. Your plugin is subscribed correctly and enabled.
3. Clear the Joomla cache — dispatcher subscriptions can be cached.

### `onJ2CommerceVendorDashboardLayout` listener not rendering

The event only fires for layouts that are NOT in the core allowed list. If you request `?layout=products`, the core handler renders immediately without firing the event. Use a namespaced layout name like `?layout=my_plugin_reviews`.

### Store page injection not appearing

`onJ2CommerceMarketplaceVendorStorePage` requires `$vendorId > 0` and a valid `$profile` object. Verify the vendor store page URL includes a valid vendor ID (e.g., `/vendor-store/1:acme-crafts`). An invalid or deleted vendor returns a "store not found" message before the event fires.

***

## Related Topics

- [Vendors](../../catalog/vendors/index.md)
- [Orders](../../sales/orders.md)
- [Order Statuses](../../setup/orderstatuses.md)
