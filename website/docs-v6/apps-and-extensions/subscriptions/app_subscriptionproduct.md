---
title: "Subscription Product"
sidebar_label: "Subscription Product"
sidebar_position: 1
description: "Sell recurring subscription and membership products in J2Commerce — configure billing intervals, trial periods, automatic renewals, dunning, and customer self-service."
---

# Subscription Product

The Subscription Product app turns any J2Commerce product into a recurring billing item — charged daily, weekly, monthly, or yearly — with optional trial periods, sign-up fees, renewal discounts, and automatic dunning when a payment fails. Customers manage their active subscriptions from their account, and admins get a dedicated Subscriptions area with full history and status controls.

## Requirements

- PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Subscription Products** App **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the plugin ZIP file or use the Install from URL option.

![](/img/install.webp)

## Enable the App

Once you have installed the App, you will need to enable it. There are **two** ways you can access the extension.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

![](/img/gift-wrap-apps.webp)

Search for **Subscription Products**, click the **X**, and it will turn into a green checkmark. It is now enabled and ready for setup.

## Configure the App

Click the **Subscription Products** title next to the green checkmark to open the plugin configuration. The settings are organized into four tabs.

:::tip

Click the **Toggle Inline Help** button on any app to show a description below each field directly in the screen.

:::

### Basic Settings

**Enable Cron Log** Writes a log file while the automatic renewal job runs. Leave this **Yes** during setup so you can confirm renewals are firing correctly. You can disable it in production to reduce disk writes.

**Cron URL** A read-only display of the URL you need to give your server's cron scheduler. Copy this URL and paste it into your hosting control panel's cron job configuration. The renewal job must run at least once per day for renewals and expirations to process on time. You can change the security key for this URL in **J2Commerce -> Setup -> Configuration**.

**Accepted Payment Methods** Choose which payment gateways are available to customers buying subscription products. Leave empty to allow any payment method that supports recurring billing. Only gateways that save a billing token (such as Stripe) can process automatic renewals — cash, bank transfer, and other offline methods do not work with automatic renewals.

**Allow Card Update** When enabled, customers always see an option to update their saved card in the account area, even if no renewal failure has occurred. Useful if you want proactive card management for customers on older cards.

**Debug Mode** Writes detailed diagnostic output to `administrator/logs/app_subscriptionproduct.php`. Always disable this in production.

### Email Settings

**Send Welcome Email on New Subscription** Sends a welcome message to the customer as soon as their subscription is created. Disable this only if you are migrating from J2Store v4 and want to suppress unexpected welcome emails for existing subscribers.

**Notify Before Expiry (days)** Sends an expiry warning email the specified number of days before a subscription ends. Enter multiple values separated by commas to send multiple reminders — for example, `7,3` sends one email seven days before and another three days before. Leave empty to skip expiry warnings.

**Bcc to** Sends a blind copy of every customer subscription email to these addresses. Separate multiple addresses with a comma. Useful for keeping a record of all subscription lifecycle emails.

**Trial Ending Notification (days before)** Number of days before the trial ends to send a "your trial is ending soon" email. Set to `0` to disable trial-ending notifications.

**Email Notifications Before Renewal** Toggle this on to send the customer a heads-up email before their next automatic renewal date.

**Notify Before Renewal (days)** Works in tandem with the toggle above. Enter the number of days before renewal to send the notification — for example, `3,1` sends a reminder three days out and again the day before. Effective for reducing involuntary churn.

**Email Notification Before First Renewal (from Trial)** Separately controls whether customers on a trial get a special notice before their first paid renewal. This is distinct from the general renewal notification so you can write a more targeted message ("Your trial is about to convert to a paid subscription").

**Notify Before First Renewal from Trial (days)** Days before end-of-trial to send that first-renewal notice. Same comma-separated format as the standard renewal notice.

**Send Completed Order Email on Renewal** When a renewal succeeds, J2Commerce creates a new order. This toggle controls whether the standard order-completed email is also sent for that renewal order. Customers typically appreciate receiving a receipt for each billing cycle.

**Use Legacy Email Templates as Fallback** When enabled, the plugin falls back to its built-in PHP email templates if no customized template exists in the database email hub. Enable this only if you have not yet set up custom email templates for subscription events.

### Display Settings

**Template** Selects the frontend template used to render subscription content on product pages, the cart, and the customer account area. **Auto** inherits the template from the active menu item (Bootstrap 5 or UIkit depending on your site setup).

**Show My Subscriptions Tab** When enabled, a **My Subscriptions** tab appears on the customer's **My Profile** page, giving them a self-service panel to view and manage their active subscriptions. Disable only if you want to restrict customer access to subscription management.

**Show Duration** Displays the billing cycle label next to the product price — for example, "Every month" or "/month". Recommended for clarity on product pages and listing pages.

**Duration Position** Controls where the billing-cycle label appears relative to the price. **Below price** keeps it in its own block beneath the price. **Before price** and **After price** inject it inline alongside the price.

**Duration Text** Sets the phrasing used to describe the billing cycle. **Every** produces "Every month". **/** produces "/month". **Per** produces "Per month". With a frequency of 2 or more, the number is included — "Every 2 months".

**Show Single Value** When the billing frequency is exactly 1, controls whether the digit is shown. **No** (default) displays "Every month". **Yes** displays "Every 1 month". Most stores prefer the cleaner display without the digit.

**Show Sign-Up Fee** Displays the one-time sign-up fee next to the product price so customers see the full upfront cost before adding to cart.

**Sign-Up Fee Position** Same three options as Duration Position — **Below price**, **Before price**, or **After price**.

**Show Recurring Total** Shows a "Recurring Total" line in the cart and checkout summarizing the subscription amount the customer will be charged on each renewal. Strongly recommended so customers understand what they are signing up for.

**Show Non-Recurring Total** Shows a separate "Non-Recurring Total" line in the cart for any one-time charges (sign-up fee, one-time products mixed in the same cart). Useful when a cart contains both subscription and regular products.

**Show Recurring Amount** Shows the per-item recurring amount in the cart line for subscription products.

**Show Recurring Discount** If a coupon or renewal discount applies to the recurring amount, displays the discounted price in the cart.

**Show Next Renewal Date** Displays the calculated first renewal date in the cart and checkout so customers know exactly when they will next be charged.

**Renewal Date Format** PHP date format string used to display the next renewal date. Leave empty to inherit the global Date Format from **J2Commerce -> Setup -> Configuration**. For example, `F j, Y` produces "May 1, 2026".

**Show Renew Button** Adds a manual **Renew** button to the front-end subscription listing in the customer account. Enable if you want to let customers initiate an early renewal themselves.

### Renewal Settings

**Renewal Discount (%)** Apply a global percentage discount to all subscription renewal payments across every product. For example, entering `10` gives every customer 10% off their second and subsequent billings. This applies store-wide; use per-product settings for product-specific discounts.

**Max Renewal Retries** How many times the system will automatically retry a failed renewal payment before marking the subscription as **Card Expired** and stopping retries. Default is 5 attempts.

**Renewal Retry Interval** The number of time units to wait between retry attempts. Combine this with the Renewal Retry Period — for example, **1** + **Day(s)** retries once per day.

**Renewal Retry Period** The time unit for the retry interval: Hours, Days, Weeks, or Months.

:::info

The retry settings work together to implement dunning — automatically re-attempting failed payments on a schedule before giving up. A common setting is to retry every 3 days, up to 5 times, giving a customer 15 days to resolve a card issue before the subscription is suspended.

:::

## Setting Up a Subscription Product {#configure-products}

After enabling the plugin, you can turn any product into a subscription product by changing its product type.

### Step 1: Open the Product

There are **three** ways to reach products.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Products**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Catalog -> Products**

**Option C:** Go to **Content -> Categories ->** find the category, then click inside the published articles section

Click on the product you want to make a subscription.

### Step 2: Change the Product Type

In the product edit screen, go to the **J2Commerce** tab **-> General** tab. Change **Product Type** to **Simple Subscription** (for a single fixed subscription) or **Variable Subscription** (for subscriptions with size, color, or other variants where each variant can have its own billing settings).

### Step 3: Configure Subscription Pricing

Scroll down (or look for the **Subscription** section within the J2Commerce tab) to find the subscription-specific fields.

**Subscription Price** The recurring price charged on each billing cycle. This is separate from the product's regular price field and is what the customer pays every period after any trial ends.

**Sign-Up Fee** A one-time fee charged at the very first purchase, on top of the first period's subscription price. Leave empty for no sign-up fee.

**Add Sign-Up Fee on Each Purchase** When enabled, the sign-up fee is charged every time a customer purchases this product — even if they already have an active or expired subscription to the same product. Leave this off for the standard "one-time fee per customer" behavior.

### Step 4: Set the Billing Interval

**Billing Frequency** How often the customer is billed: Every, Every 2nd, Every 3rd, up to Every 6th.

**Billing Period** The unit: Days, Weeks, Months, or Years.

Combine these two fields to describe the billing cycle. For example, **Every** + **Month** bills once a month. **Every 3rd** + **Month** bills once per quarter.

**Subscription Length** The total number of billing periods the subscription runs. Enter `0` for a subscription that never expires and renews indefinitely. Enter `12` with a monthly period for a one-year subscription that automatically stops after 12 payments.

### Step 5: Configure a Trial Period (Optional)

**Trial Length** The number of trial periods. Leave as `0` for no trial.

**Trial Period** The unit for the trial: Days, Weeks, Months, or Years. Select **No Trial** to remove the trial.

For example, **Trial Length** `7` + **Trial Period** **Days** gives new subscribers a free 7-day trial before their first payment.

:::tip

During a trial, no payment is collected (unless the payment gateway requires a $0 authorization). The subscription status shows as **In Trial** until the trial ends.

:::

### Step 6: User Group Management (Optional)

**Add To User Groups** When this subscription becomes active, J2Commerce automatically adds the subscriber to the selected Joomla user groups. This is the standard way to grant access to members-only content or restricted areas on your site.

**Remove From User Groups** When this subscription expires or is cancelled, J2Commerce removes the subscriber from these groups. Combine the two fields to implement a complete membership access system — grant on subscribe, revoke on cancel.

### Step 7: Renewal Discount and Cancel Settings

**Keep Renewal Discount** If a customer used a coupon code at first purchase, enabling this applies that same discount to all subsequent automatic renewals. Useful for first-month-free or introductory offer coupons that you want to honor for the life of the subscription.

**Disable Cancel** When enabled, customers cannot cancel this subscription from their account area — only an administrator can cancel it. Use with care and only when contractually appropriate.

## How It Works {#how-it-works}

1. A customer adds a subscription product to their cart. At checkout, only payment methods that support recurring billing (such as Stripe) are available. The customer completes checkout and the payment gateway saves a billing token.

2. J2Commerce creates the initial order and, once payment is confirmed, creates a subscription record linked to the customer. The subscription status moves to **Active** (or **In Trial** if a trial was configured). If user groups are configured, the customer is added to those groups immediately.

3. On the subscription's renewal date, the Joomla scheduled task (or the cron URL) triggers the renewal process. J2Commerce creates a new child order and charges the saved payment token without any customer action.

4. If the renewal payment succeeds, the customer receives a renewal confirmation email (and an order receipt if that option is enabled). The next renewal date is advanced by one billing period.

5. If a renewal payment fails, J2Commerce marks the subscription as **Payment Failed** and schedules a retry according to the Max Renewal Retries and retry interval settings. The customer receives a payment failure notification. After the maximum retries are exhausted, the subscription moves to **Card Expired**.

6. Customers can view all their subscriptions from **My Profile -> My Subscriptions**. From there they can see billing history, the next renewal date, and (unless Disable Cancel is on) cancel the subscription themselves. Administrators can manage all subscriptions from **J2Commerce -> Subscriptions**, override the status, view full history, and trigger manual renewals.

## Customer-Facing View {#frontend-view}

On the **product page**, customers see:

- The subscription price with the billing cycle label next to it (for example, "$19.99 / month" or "$19.99 — Every month").
- The sign-up fee displayed separately if configured.
- A notice that the product is a subscription and login is required to purchase.

In the **cart and checkout**:

- A Subscription section showing the recurring amount, any recurring discount, and the calculated date of the first renewal.
- Non-recurring charges (sign-up fee, any one-time products) listed separately.
- Only subscription-compatible payment methods appear in the payment step.

In the **customer account** (**My Profile -> My Subscriptions**):

- A list of all active, trial, expired, and cancelled subscriptions.
- Per-subscription detail page showing billing history, current status, next renewal date, and payment method.
- A **Cancel** button (unless disabled at the product level).
- A card update option if **Allow Card Update** is enabled in the app configuration.

## Display Conditions {#display-conditions}

Subscription pricing and controls appear on the product page when:

- The **Subscription Products** app is enabled in **J2Commerce -> Apps**.
- The product type is set to **Simple Subscription** or **Variable Subscription**.
- The customer is logged in (guests cannot purchase subscriptions).

The **My Subscriptions** tab appears on the customer profile when:

- **Show My Subscriptions Tab** is set to **Yes** in the app configuration.
- The customer has at least one subscription on their account.

Automatic renewals run when:

- The Joomla scheduled task plugin is enabled **and** the Joomla task scheduler is configured, **or** the Cron URL is being called by a server cron job at least once per day.

## Tips {#tips}

- **Use a payment gateway that supports recurring billing.** Stripe is the most commonly used gateway with this app. Cash on delivery, bank transfer, and PayPal Standard do not support automatic renewals — customers would need to manually renew each period.

- **Set up the automatic renewal job before going live.** Either enable the Joomla scheduled task plugin (**System -> Plugins -> Scheduled Tasks**) and configure a system cron to call the Joomla task runner, or use the Cron URL displayed in the app settings. Without this, subscriptions will never renew automatically.

- **Test with a short period first.** Configure a test subscription with a 1-day billing period and a $0.01 price to verify the full renewal cycle works — checkout, renewal email, new order creation — before deploying monthly plans to real customers.

- **Configure dunning emails before launch.** The renewal failure notification and retry schedule protect your revenue. Set Max Renewal Retries to 3–5 and retry every 3 days, and enable the renewal retry email so customers are prompted to update their card.

- **Use trial periods for "first month free" promotions.** Set Trial Length to `1` and Trial Period to **Month** for a 30-day free trial. The subscription status shows **In Trial** during this window and no payment is collected until the trial ends.

- **User groups are the cleanest way to gate content.** Add subscribers to a Joomla "Subscribers" user group on activation, and remove them from it on cancellation. Then restrict your members-only articles or menu items to that group — access opens and closes automatically.

- **Send expiry warnings for fixed-length subscriptions.** If you sell a 12-month plan, set **Notify Before Expiry** to `30,7,1` so customers get three nudges to renew before access lapses.

## Troubleshooting {#troubleshooting}

### Subscription option is not visible on the product page {#sub-not-visible}

**Cause:** The app is disabled, or the product type has not been changed to a subscription type.

**Solution:**

1. Go to **J2Commerce -> Apps** and verify **Subscription Products** shows a green checkmark.
2. Edit the product and go to **J2Commerce -> General tab**. Check that **Product Type** is set to **Simple Subscription** or **Variable Subscription**.
3. Confirm the product is published.
4. Clear cache: **Home Dashboard -> Cache -> Delete All**.

### Renewals are not running automatically {#renewals-not-running}

**Cause:** The Joomla scheduled task runner is not configured, or the cron job calling the Cron URL is not set up.

**Solution:**

1. Go to **System -> Plugins** and search for **Scheduled Tasks**. Verify the plugin is enabled.
2. Go to **System -> Scheduled Tasks** and check whether the subscription renewal task exists and is enabled.
3. If you are using the Cron URL instead, open the app settings (**J2Commerce -> Apps -> Subscription Products**) and copy the **Cron URL**. Paste it into your hosting control panel's cron scheduler to run at least once per day.
4. Enable **Enable Cron Log** in the app settings and check the log after the next scheduled run to confirm the cron executed.

### Renewal payment fails repeatedly {#renewal-payment-fails}

**Cause:** The customer's saved payment token has expired or been invalidated.

**Solution:**

1. Go to **J2Commerce -> Subscriptions**, find the affected subscription, and check the subscription history for the failure reason.
2. If **Allow Card Update** is enabled, the customer can update their card from **My Profile -> My Subscriptions**. Direct them to do so.
3. An administrator can manually re-enable the renewal retry process from the subscription detail page in the admin area after the customer updates their card.
4. If the payment gateway plugin has been removed or is disabled, the renewal will log "no payment plugin handled the renewal event". Ensure the payment gateway plugin is still installed and enabled.

### Customer cannot cancel from My Account {#cannot-cancel}

**Cause:** The customer is not logged in, the **My Subscriptions** tab is hidden, or **Disable Cancel** is enabled on the product.

**Solution:**

1. Ensure the customer is logged in — subscriptions require a Joomla account.
2. Go to **J2Commerce -> Apps -> Subscription Products -> Display Settings** and verify **Show My Subscriptions Tab** is set to **Yes**.
3. Edit the product and check the subscription settings for **Disable Cancel**. If set to **Yes**, customers cannot self-cancel and an administrator must cancel on their behalf from **J2Commerce -> Subscriptions**.

### No email is sent when a subscription is created or renewed {#no-emails}

**Cause:** Joomla's outgoing email is not configured, or the subscription email settings are not enabled.

**Solution:**

1. Go to **System -> Global Configuration -> Server** tab and verify the mail settings. Send a test email to confirm Joomla can send mail.
2. Go to **J2Commerce -> Apps -> Subscription Products -> Email Settings** and verify **Send Welcome Email on New Subscription** is enabled for new-subscription emails, or **Send Completed Order Email on Renewal** is enabled for renewal receipts.
3. Check that the customer's email address is correct on their Joomla user account.
4. If using custom email templates from the J2Commerce email hub, verify the subscription email templates are published.
