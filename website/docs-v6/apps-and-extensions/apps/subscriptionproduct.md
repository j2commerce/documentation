---
title: "Subscription Products"
sidebar_label: "Subscription Products"
sidebar_position: 50
description: "Sell recurring subscriptions and memberships in J2Commerce using the Subscription Products add-on. Supports billing intervals, trial periods, automatic renewals, and a customer subscription portal."
---

# Subscription Products

The Subscription Products add-on lets you sell recurring subscriptions and memberships from your J2Commerce store. Customers are charged automatically on a schedule you define — weekly, monthly, yearly, or any custom interval — and their access is tied directly to Joomla user groups so you can gate premium content or services.

Two product types are added: **Simple Subscription** for single-option products, and **Variable Subscription** for products with multiple plan options (different price tiers, billing periods, or trial lengths per variant).

## Prerequisites

- J2Commerce 6 installed and configured
- A payment gateway that supports recurring billing (such as the Stripe or Authorize.Net add-ons)
- Server access to configure a scheduled cron job

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_subscriptionproduct.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_subscriptionproduct.zip` package file.
4. The plugin installs automatically. A success message confirms installation.

<!-- SCREENSHOT: Extensions install page showing successful installation of Subscription Products -->

### Enable the Plugin

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Subscription Products**.
3. Click the status toggle to enable it, or open the plugin and set **Status** to **Enabled**, then click **Save & Close**.

### Open Plugin Configuration

1. Go to **J2Commerce** -> **Apps**.
2. Find **Subscription Products** in the list and click its name to open configuration.

<!-- SCREENSHOT: J2Commerce Apps list with Subscription Products highlighted -->

---

## Step 1: Configure Payment Methods

Subscription billing requires a payment gateway that supports automated recurring charges. Not all payment methods work with subscriptions.

1. In the plugin configuration, find the **Accepted Payment Methods** field.
2. Select the payment gateways you want to accept for subscription orders. Leave this empty to allow all subscription-compatible gateways.

When a customer checks out with a subscription product, J2Commerce automatically hides any payment method that does not support recurring billing. Only the gateways you select here are shown.

:::note
A payment gateway signals subscription support by responding to the `onJ2CommerceAcceptSubscriptionPayment` event. Check the documentation for your specific payment add-on to confirm subscription support.
:::

---

## Step 2: Set Up the Cron Job

The cron job is what drives automatic subscription processing — it handles renewals, status transitions, expiry notifications, and retry logic. Without it, subscriptions will not renew and customers will not receive lifecycle emails.

### Find Your Cron URL

1. In the plugin configuration, locate the **Cron URL** field.
2. The full URL is displayed, for example:

```
https://yoursite.com/index.php?option=com_j2commerce&view=cron&command=appsubscriptionproduct&cron_secret=abc123
```

Copy this URL. If you need to rotate the security key, click the **Change key** button — this regenerates the key stored in J2Commerce Configuration.

<!-- SCREENSHOT: Plugin configuration showing the Cron URL field with the generated URL -->

### Schedule the Cron Job

Add a cron job on your server that calls this URL at least once per day. Most subscription billing can tolerate a 24-hour window, but more frequent runs (every hour) give customers a smoother experience.

**Using cPanel Cron Jobs:**

1. Log into cPanel and go to **Cron Jobs**.
2. Set the schedule to **Once Per Day** (or more frequent).
3. Use this command, replacing the URL with yours:

```bash
wget -q -O /dev/null "https://yoursite.com/index.php?option=com_j2commerce&view=cron&command=appsubscriptionproduct&cron_secret=abc123"
```

**Using a Linux server directly:**

```bash
0 * * * * wget -q -O /dev/null "https://yoursite.com/index.php?option=com_j2commerce&view=cron&command=appsubscriptionproduct&cron_secret=abc123"
```

The example above runs every hour. Adjust the schedule to match your store's needs.

---

## Step 3: Configure Global Plugin Settings

Open the plugin configuration from **J2Commerce** -> **Apps** -> **Subscription Products**.

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable Cron Log** | Write a log file at `administrator/logs/app_subscriptionproduct.php` while the cron runs. Useful for diagnosing issues. | Yes |
| **Cron URL** | Displays the current cron URL with security key. Read-only display field. | — |
| **Notify before expiry (days)** | Send expiry reminder emails this many days before a subscription ends. Enter comma-separated values to send multiple reminders, for example `3,2` sends emails 3 days and 2 days before expiry. | — |
| **Bcc to** | Send a blind copy of all customer lifecycle emails to these addresses. Separate multiple addresses with a comma. | — |
| **Accepted Payment Methods** | Restrict checkout to these subscription-compatible gateways. Leave empty to allow all compatible gateways. | All |
| **Allow card update** | Always show the card update option for supported payment gateways, even when the card has not expired. | No |
| **Debug Mode** | Enable verbose debug logging. Disable in production environments. | No |

### Display Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Show Duration** | Display the subscription duration (billing frequency) below the price on the product page. | Yes |
| **Show Recurring Total** | Show a "Recurring Total" row in the cart and checkout. | Yes |
| **Show Non-Recurring Total** | Show or hide the non-recurring total row (sign-up fees) in the cart. | Yes |
| **Show Recurring Amount** | Show the recurring amount per billing period in the cart. | Yes |
| **Show Recurring Discount** | Show the recurring discount amount in the cart. | Yes |
| **Show Next Renewal Date** | Show the first renewal date in the cart. | Yes |
| **Renewal Date Format** | PHP date format string for the renewal date display. See the [PHP date documentation](https://www.php.net/manual/en/function.date.php) for format codes. | `Y-m-d` |
| **Show Renew Button** | Show a **Renew** button on the customer's subscription listing in their profile. | No |

### Renewal Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Renewal Discount (%)** | Apply a global percentage discount to all automatic renewals. For example, `10` gives customers 10% off every renewal. | — |
| **Send completed order email on renewal** | Send an order completion email to the customer after each successful automatic renewal payment. | Yes |
| **Email notifications before renewal** | Send a reminder email to the customer before their next auto-renewal date. | No |
| **Notify before renewal (days)** | How many days before renewal to send the reminder. Accepts comma-separated values, for example `7,3`. | — |
| **Email notification before first renewal (from trial)** | Send a reminder before the first payment after a trial period ends. | No |
| **Notify before first renewal from trial (days)** | Days before trial end to send the first-renewal notification. | — |
| **Max Renewal Retries** | Maximum number of retry attempts after a failed renewal payment before marking the subscription as **Card Expired**. | 5 |
| **Renewal Retry Interval** | How long to wait between retry attempts. Enter a number and select the period unit. | 1 Hour |

---

## Creating a Simple Subscription Product

A **Simple Subscription** is a single product with one set of billing terms.

### Step 1: Create the Article

1. Go to **Content** -> **Articles** -> **New**.
2. Give the article a title, add a description, and set the category.
3. Save the article.

### Step 2: Open the J2Commerce Product Tab

1. While editing the article, click the **J2Commerce** tab (at the bottom of the editor).
2. Under **Product Type**, select **Simple Subscription**.

<!-- SCREENSHOT: Article editor showing the J2Commerce tab with Product Type set to Simple Subscription -->

### Step 3: Configure Subscription Settings

After selecting the product type, a **Subscription Products** fieldset appears. Fill in the following fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Subscription Price** | The recurring charge per billing period. | `9.99` |
| **Sign-Up Fee** | One-time fee charged at the start. Leave empty for no sign-up fee. | `4.99` |
| **Add sign-up fee on each purchase** | When enabled, the sign-up fee is charged again even if the customer has had a previous subscription to this product. | No |
| **Billing Frequency** | How often the customer is charged: Every, Every 2nd, Every 3rd, up to Every 6th period. | Every |
| **Billing Period** | The period unit: Day, Week, Month, or Year. | Month |
| **Subscription Length** | Number of billing periods. Enter `0` for a subscription that never expires. | `12` |
| **Trial Length** | Number of trial periods before billing starts. Enter `0` for no trial. | `0` |
| **Trial Period** | The trial period unit: Day, Week, Month, or Year. | — |
| **Add To User Groups** | Automatically add the subscriber to these Joomla user groups when their subscription is active. | — |
| **Remove From User Groups** | Automatically remove the subscriber from these Joomla user groups when the subscription expires or is cancelled. | — |
| **Keep renewal discount** | Apply the same coupon discount used at first purchase to all subsequent renewals. | No |
| **Disable Cancel** | Prevent customers from cancelling this subscription themselves from the front end. | No |

:::tip Setting up free trials
To offer a free trial, set **Trial Length** to a number (for example `14`) and **Trial Period** to **Day**. The subscription price is charged after the trial ends. A payment gateway that supports zero-amount trial authorisation is required.
:::

### Step 4: Set the Regular Price

1. Click the **Pricing** tab in the J2Commerce product section.
2. Set the base price — this will be the trial price or first charge if no sign-up fee applies.
3. The **Subscription Price** field in the Subscription Products fieldset becomes the recurring renewal amount.

### Step 5: Save

Click **Save** or **Save & Close** on the article. The product is now available in your store as a subscription.

<!-- SCREENSHOT: J2Commerce product tab showing completed subscription pricing configuration -->

---

## Creating a Variable Subscription Product

A **Variable Subscription** lets you offer multiple subscription plans within a single product — for example, a monthly plan and an annual plan — each with its own price, billing interval, and trial settings.

### Step 1: Create the Article

Follow the same process as for a simple subscription, but select **Variable Subscription** as the product type.

### Step 2: Add Variants

1. Click the **Variants** tab in the J2Commerce product section.
2. Create at least one variant (for example, "Monthly" and "Annual").
3. For each variant, a **Subscription Products** tab appears inside the variant form. Configure the billing settings per variant using the same fields described above.

<!-- SCREENSHOT: Variants tab showing two subscription variants with individual subscription settings -->

---

## Subscription Statuses

Every subscription has a status that reflects its current state. You can see and change statuses from the **My Subscriptions** tab in a customer's admin profile, or from the subscriptions list in the admin.

| Status | Meaning |
|--------|---------|
| **New** | Subscription created but payment not yet confirmed. |
| **Active** | Subscription is current and billing normally. |
| **Future** | Subscription is scheduled to start at a future date. |
| **In Trial** | Customer is within the free trial period. |
| **Expired** | Subscription reached its end date or subscription length. |
| **Canceled** | Customer or administrator cancelled the subscription. |
| **On Hold** | Subscription is temporarily paused. |
| **Pending** | Renewal payment is pending confirmation from the gateway. |
| **Payment Failed** | The most recent renewal payment attempt failed. |
| **Card Expired** | All renewal retry attempts failed; the card on file needs updating. |

---

## Email Notifications

The plugin sends automated emails at 12 lifecycle events. All emails are sent to the customer. You can BCC additional addresses using the **Bcc to** setting.

| Event | When it Sends |
|-------|---------------|
| Subscription Activated | When status changes to Active |
| Trial Started | When status changes to In Trial |
| Subscription Expired | When status changes to Expired |
| Subscription Cancelled | When status changes to Canceled |
| Payment Failed | When status changes to Payment Failed |
| Expiry Reminder | Configurable number of days before expiry date |
| Renewal Reminder | Configurable number of days before next renewal |
| Trial-to-Renewal Reminder | Configurable days before first renewal after a trial |
| Renewal Succeeded | After a successful automatic renewal payment |
| Renewal Retry Failed | After each failed renewal retry attempt |
| Card Expiry Notice | When the card on file is about to expire |
| Card Updated | After the customer successfully updates their payment card |

Email templates are stored in `plugins/j2commerce/app_subscriptionproduct/mailtemplates/`. You can customise the template HTML files directly, or use template overrides.

---

## Customer Subscription Portal

Logged-in customers can manage their subscriptions from **My Profile** in the front end. The **My Subscriptions** tab shows all subscriptions with:

- Current status badge
- Product name and subscription plan
- Start date and end date
- Next renewal date and renewal amount
- **Cancel** button (unless disabled on the product)
- **Renew** button (when enabled in plugin settings)
- **Update Card** button (when the card has expired or **Allow card update** is enabled)

<!-- SCREENSHOT: Front-end My Profile page showing the My Subscriptions tab with active subscription -->

---

## Admin Subscription Management

Administrators can view and manage all subscriptions from the customer profile in the J2Commerce admin.

1. Go to **J2Commerce** -> **Customers**.
2. Click a customer to open their profile.
3. Click the **Subscriptions** tab.

From here you can:

- View all subscriptions with status, start and end dates, next renewal date, and renewal amount
- Change subscription status using the status dropdown
- View the subscription detail page (click the subscription ID)
- See the full subscription history timeline on the detail page
- Add notes to the subscription history
- Re-enable renewal retries after a failed payment
- Export subscription data

<!-- SCREENSHOT: Admin customer profile showing the Subscriptions tab with a list of subscriptions -->

---

## Troubleshooting

### Subscriptions are not renewing automatically

**Cause:** The cron job is not running, the URL is incorrect, or the security key has changed.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Subscription Products**.
2. Copy the current **Cron URL** — check that it matches the URL configured in your server's cron job.
3. If the key has changed, update the cron job with the new URL.
4. Enable **Enable Cron Log** and run the cron manually in a browser to check for errors.
5. Check `administrator/logs/app_subscriptionproduct.php` for detailed cron output.

### The checkout shows no payment methods for subscription products

**Cause:** No payment gateway that supports subscriptions is enabled, or the **Accepted Payment Methods** setting is filtering out all compatible gateways.

**Solution:**

1. Ensure a subscription-compatible payment gateway (such as Stripe) is installed and enabled.
2. Open the plugin configuration and check the **Accepted Payment Methods** field. If it is set to specific gateways, make sure those plugins are enabled.
3. If the field is empty, all subscription-compatible gateways are allowed — check that the gateway plugin is configured correctly and responds to the subscription support event.

### Customers cannot cancel their subscription

**Cause:** The product has **Disable Cancel** enabled.

**Solution:** Open the article, go to the J2Commerce product tab, and set **Disable Cancel** to **No** in the Subscription Products fieldset.

### The renewal discount is not applying

**Cause:** The **Renewal Discount (%)** field may be empty, or the product-level **Keep renewal discount** toggle may be off.

**Solution:**

1. In plugin configuration, confirm **Renewal Discount (%)** has a value.
2. On the product itself, check whether **Keep renewal discount** should be enabled for coupon-based discounts to carry over.

### Debug mode produces no log file

**Cause:** Debug mode may be disabled, or the Joomla logs directory may not be writable.

**Solution:**

1. Enable **Debug Mode** in the plugin configuration and save.
2. Run the cron URL once in a browser.
3. Check `administrator/logs/app_subscriptionproduct.php`. If the file is still missing, ensure the `administrator/logs/` directory is writable by your web server.

---

## Related Topics

- [Payment Methods](../../payment-methods/index.md)
- [Customer Accounts](../../customers/index.md)
- [Cron Tasks](../../configuration/cron-tasks.md)
