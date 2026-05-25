---
title: "Partial Payment"
sidebar_label: "Partial Payment"
sidebar_position: 10
description: "Collect a deposit at checkout and schedule the remaining balance for later, with payment plans, automatic reminder emails, and a customer Pay Now page."
---

# Partial Payment

The Partial Payment app lets you take a deposit when a customer places an order, then collect the rest of the balance on a schedule you control. Customers pay a percentage or a fixed-amount deposit at checkout, and return to their account to pay the balance when it becomes due. Automated reminder emails keep payments on track so you do not have to chase them by hand.

This app is a great fit for stores selling high-ticket items, custom-made goods, services booked in advance, online courses, and any product where splitting the cost makes the purchase easier for the customer.

## Requirements

- PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- Joomla email (SMTP or PHP mail) configured so reminder emails can send

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **-> Apps**

**Step 2:** Locate the **Partial Payment** App **->** click **View Details** **-> Add to cart -> Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

You can install the **Partial Payment** App using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the `app_partialpayment.zip` file or use the Install from URL option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

On a successful install you will see a green "Partial Payment plugin installed successfully" message. The installer also creates the database tables it needs and adds a **Scheduled** order status automatically.

## Enable the App

Once you have installed the App, you need to enable it. There are **two** ways to reach it.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

<!-- SCREENSHOT: J2Commerce Apps list with Partial Payment in the list -->

Look for **Partial Payment**, click the **X**, and it turns into a green checkmark. It is now enabled and ready for setup.

## Configure the App

Click the **Partial Payment** title next to the green checkmark to open the settings.

:::tip

**Tip:** Click the **Toggle Inline Help** button on any app you install and it shows a short description below each field.

:::

The settings are split across five tabs: **General Settings**, **Schedule Settings**, **Escalation Settings**, **Mail Settings**, and **Automatic Charge (Saved Card)**.

### General Settings tab

<!-- SCREENSHOT: Partial Payment General Settings tab -->

**Cron URL:** A read-only URL you copy into your server cron (or the Joomla Scheduler). Run it at least once a day so scheduled orders activate on time and reminder emails go out. See [Cron Setup](#cron-setup) below.

**Framework:** Choose **Bootstrap 5** for standard Joomla templates, or **UIkit** for UIkit 3 based templates. This controls how the front-end displays look.

**Enable partial payment (default):** The storewide default. You can override it on each product.

- **Disabled** — partial payment is off unless a product turns it on
- **Enabled (required)** — every buyer must pay a deposit
- **Enabled (optional)** — the customer chooses full payment or a deposit

**Pre-Selected Payment Option:** When partial payment is *optional*, this is the choice that is ticked first on the product page. The customer can still change it.

**Partial payment type (default):** How the deposit is calculated — **Percentage** of the price, or a **Fixed amount** in your store currency.

**Default Amount:** The default deposit value. Enter `50` for 50% when the type is Percentage, or 50 in your currency when Fixed.

**Default Payment Plans:** One or more saved payment plans offered storewide. Create plans first (see [Creating Payment Plans](#creating-payment-plans)).

**Scheduled Order Status:** The order status given to future instalments after the deposit is paid. Defaults to **Scheduled**, created for you at install.

**Allowed payment methods:** Restrict deposit orders to specific gateways. Leave empty to allow all gateways.

**Payment display:** What total shows at checkout — the **Full order total**, or only the **Partial amount only** (the deposit due today).

**Tax Allocation:** How tax is split between the deposit and the instalments.

- **Proportional** — each payment carries its share of the total tax
- **Upfront (with deposit)** — all tax is collected with the deposit; instalments are tax-free

**Vendor Commission Split:** For marketplaces, how vendor commission is spread across instalments. **Proportional** is recommended; **Upfront (first instalment)** takes the whole commission from the first payment.

**Coupon Scope:** How a coupon discount applies.

- **Full order (proportional)** — the discount is spread across all payments (default)
- **Deposit only** — the discount reduces the deposit; instalments stay full price
- **Each installment** — the discount is re-applied to every instalment

**Debug:** Logs partial payment events to the J2Commerce log for troubleshooting. Leave **No** on a live store.

:::tip

**Recommended starting point:** Leave **Enable partial payment (default)** on **Disabled** and turn the feature on per product until you are comfortable with how it behaves.

:::

### Schedule Settings tab

**Maximum Installment Horizon (days):** The longest a payment plan is allowed to run, in days. Set `0` to remove the limit. Default is `365`. This stops a plan from scheduling a payment too far into the future.

### Escalation Settings tab

These settings decide what happens when a customer misses an instalment.

**Escalate After (days):** How many days past the due date before escalation kicks in. Set `0` to turn escalation off.

**Escalation Action:**

- **No action**
- **Notify admin by email**
- **Cancel this installment**
- **Cancel all remaining installments**

**Escalation Admin Email:** The address notified when the action is **Notify admin**. Leave empty to use the site's global admin email.

### Mail Settings tab

<!-- SCREENSHOT: Partial Payment Mail Settings tab -->

**Send email when order is ready for payment:** Emails the customer when a scheduled instalment becomes due. Default **Yes**.

**Notify payment pending on (days):** Comma-separated days *after* the due date to send overdue reminders — for example `2,5` sends one reminder 2 days late and another 5 days late. Leave empty to disable overdue reminders.

**Send thank-you email for deposit payment:** Emails a thank-you the moment the deposit is confirmed. Default **Yes**.

### Automatic Charge (Saved Card) tab

**Enable Automatic Charge:** When on, the cron tries to charge saved-card instalments automatically on their due date instead of emailing the customer to pay manually.

:::info

NOTE: Automatic charging requires a compatible payment gateway that supports saved cards (for example a Stripe plugin with vault/saved-card support). Without one, leave this **No** and customers pay each instalment from the **Pay Now** link.

:::

## Creating Payment Plans

A payment plan defines how the balance is collected after the deposit — for example "deposit today, then three monthly instalments." You assign plans storewide (General Settings) or per product.

To manage plans, open **Partial Payment** in **J2Commerce -> Apps**, then click the **Manage Plans** button in the toolbar.

<!-- SCREENSHOT: Partial Payment plugin editor showing the Manage Plans toolbar button -->

Click **Create New Plan** and fill in the **Plan Details**:

**Plan Name:** A short, customer-facing label (e.g., "3 Monthly Payments").

**Plan Description:** Optional text shown to the customer when they pick the plan.

**Visible at Checkout:** When off, the plan is hidden from customers but still usable by admins.

Then open the **Schedule** tab to build the instalments.

<!-- SCREENSHOT: Plan edit screen showing the schedule editor and live preview -->

- Click **Add Installment** to add a row.
- For each row enter the **Payment amount** — use a trailing `%` (e.g. `33.33%`) for a percentage of the order, or a plain number for a fixed amount.
- Set **When** the payment is charged using an interval after the deposit (Days, Weeks, Months, or Years).
- Drag rows to reorder them.

The **Schedule preview** updates as you type and shows whether the full order amount has been allocated. Click **Save** when the preview reads **✓ allocated**.

:::tip

**Tip:** Use the **Duplicate** and **Reset Schedule to Defaults** toolbar buttons to build similar plans quickly.

:::

## Enabling Partial Payment on a Product

Each product can use the storewide defaults or set its own deposit terms. There are **three** ways to reach a product.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Products**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Products**

**Option C:** Go to **Content -> Categories ->** find the **category**, then open the product

Open the product, click the **J2Commerce** tab, then the **Apps** tab, and find the **Partial Payment** section.

<!-- SCREENSHOT: Product edit -> J2Commerce tab -> Apps tab -> Partial Payment section -->

**Enable Partial Payment:** Set this product's availability — **Disabled**, **Enabled (required)**, or **Enabled (optional)**. Use **Disabled** to turn the feature off even when the storewide default is on.

**Pre-Selected Payment Option:** *(shows only when set to Enabled (optional))* Which option is ticked first on the product page.

**Partial Payment Type:** *(shows when not Disabled)* Percentage or fixed amount.

**Deposit Amount:** *(shows when not Disabled)* The deposit for this product. Overrides the storewide default.

**Payment Plans:** *(shows when not Disabled)* The plans offered for this product. Overrides the storewide plan list.

:::info

**Example:** An $800 photography course where you want a $200 deposit — set **Partial Payment Type** to **Fixed amount**, **Deposit Amount** to `200`, and **Enable Partial Payment** to **Enabled (required)**. Every buyer pays $200 at checkout; the remaining $600 is collected later.

:::

## How It Works

When a customer reaches a product or checkout:

1. J2Commerce checks whether Partial Payment is enabled for that product (or storewide).
2. If it is **optional**, the customer sees a **Pay in Full / Pay Deposit** choice. If it is **required**, the deposit is applied automatically.
3. At checkout the customer pays the deposit (or full amount if they chose that).
4. The remaining balance is saved as a scheduled order using your **Scheduled Order Status**.
5. When an instalment's date arrives, the **cron** activates it and emails the customer (or auto-charges a saved card, if enabled).
6. The customer pays from the **Pay Now** link in their account, and a thank-you email confirms each payment.

## Customer Experience

### Product Detail Page

When partial payment is **optional**, a toggle appears near the add-to-cart button with two choices:

- **Pay in Full** — proceeds normally
- **Pay Deposit** — shows the deposit label, e.g. "Pay a 30% deposit" or "Pay a deposit of $150"

When partial payment is **required**, the deposit label shows without a toggle.

<!-- SCREENSHOT: Product page showing the Pay in Full / Pay Deposit toggle -->

### Cart

Line items using partial payment show a **Deposit** badge next to the product name, and the totals area adds two rows:

- **Full Subtotal** — the complete price before the deposit arrangement
- **Future Payments** — the balance still owed after today's deposit

<!-- SCREENSHOT: Cart showing the Deposit badge and Full Subtotal / Future Payments rows -->

### Checkout

If you set **Allowed payment methods**, only those gateways appear at checkout. The total shown follows your **Payment display** setting — either the full order total or just the deposit due today.

### Customer Profile — Pay Now and Schedule

After the deposit order is placed, the customer can see the remaining payments in their account under **My Profile -> Orders**. When a balance is due, a **Pay Now** alert appears on the order with a direct link to complete payment. A **Payment Schedule** view lists all instalments and their dates.

<!-- SCREENSHOT: Customer profile order showing the Pay Now alert and payment schedule -->

## Cron Setup

The cron does two jobs: it activates scheduled orders when their date arrives, and it sends payment-due emails. **Run it at least once a day.** Running it more often (say every few hours) means customers are notified sooner.

### Option A — Joomla Scheduler

If a companion Joomla Task plugin is installed, you can wire the partial payment cron into the native **System -> Scheduled Tasks** area, so no server-level cron is needed.

### Option B — Server Cron

Copy the **Cron URL** from the General Settings tab and add it to your server's cron table once daily.

**cPanel example:**

1. Log in to cPanel and open **Cron Jobs**.
2. Set the schedule to once daily (for example `0 6 * * *`).
3. In the command field use: `curl -s "PASTE_YOUR_CRON_URL_HERE" > /dev/null 2>&1`

<!-- SCREENSHOT: cPanel Cron Jobs page with the partial payment cron URL pasted in -->

## Email Templates and Merge Tags

The app sends four types of email. Each has a built-in default, and you can override the subject and body with your own template.

| Email type | When it sends |
|------------|---------------|
| On enable for payment | When a scheduled instalment becomes due |
| Notify pending payment | On each day listed in **Notify payment pending on (days)**, after the due date |
| Thank you for deposit | Immediately after a deposit payment is confirmed |
| Escalation (admin) | When an overdue instalment escalates and the action is **Notify admin** |

### Merge Tags

Use these tags in any custom email subject or body. They are replaced with real values when the email sends. Always include the square brackets.

| Merge tag | What it inserts |
|-----------|-----------------|
| `[CUSTOMER_NAME]` | The customer's name |
| `[PARTIAL_PAYMENT_ORDER_ITEM_NAME]` | The product name from the order |
| `[INVOICE_URL]` | A direct link to the customer's order / payment page |
| `[PARTIAL_PAYMENT_DATE]` | The scheduled payment due date |
| `[PARTIAL_PAYMENT_DAYS_PASSED]` | Days elapsed since the due date (for overdue reminders) |
| `[PAID_PARTIAL_AMOUNT]` | The deposit already paid |
| `[PARTIAL_PAYMENT_FULL_AMOUNT]` | The full order total |
| `[BALANCE_PARTIAL_AMOUNT]` | The outstanding balance still owed |
| `[INSTALLMENT_INDEX]` | This instalment's number |
| `[INSTALLMENT_TOTAL]` | The total number of instalments |

## Tips

- **Start small** — test with one product set to **Enabled (optional)** before turning partial payment on storewide.
- **Run the cron daily** — scheduled orders will not activate and reminders will not send without it.
- **Keep plan names short** — they appear on the product page and cart, where space is limited.
- **Use Upfront tax** if your accounting needs the full tax collected at order time rather than spread across instalments.
- **Match the framework** — set **Framework** to whatever your template uses (Bootstrap 5 or UIkit) so the displays look right.

## Troubleshooting

### The "Scheduled" order status is missing

**Cause:** The status was deleted after install.

**Solution:** Go to **J2Commerce -> Setup -> Order Statuses** and re-add a status named **Scheduled** (a Yellow/Warning colour is a good choice). Then open the Partial Payment settings and pick it in **Scheduled Order Status**.

### Reminder emails are not sending

**Cause:** The cron is not running, email is misconfigured, or the email setting is off.

**Solution:**

1. Confirm the cron runs — open the Cron URL in a browser and look for a success message.
2. Check Joomla email at **System -> Global Configuration -> Server** and send a test email.
3. In the **Mail Settings** tab, confirm **Send email when order is ready for payment** is **Yes**.
4. Turn on **Debug** in General Settings, run the cron again, and check the J2Commerce log for errors.

### The balance shows in the wrong currency

**Cause:** The store currency changed after the order was placed; existing orders keep the original currency.

**Solution:** For new orders, make sure the currency switcher is set correctly before the customer adds to the cart. Confirm the J2Commerce currency plugin is enabled and exchange rates are current.

### Customers can still pick a restricted payment method

**Cause:** The gateway is not actually restricted, or the field is empty.

**Solution:** Open **General Settings -> Allowed payment methods** and confirm only your intended gateways are selected (an empty field allows all). Save, then clear the cache at **System -> Clear Cache**.

### The Pay Now button does not appear

**Cause:** The order has not reached the scheduled status, or the cron has not processed the instalment yet.

**Solution:**

1. Confirm the order's status matches your **Scheduled Order Status**.
2. Confirm the cron has run since the due date passed.
3. Make sure the customer is viewing the correct instalment order, not the original parent order.

## Related Topics

- [Payment Methods](../../payment-methods/payment_cash.md) — configure the gateways used at checkout
- [Store Setup](../../setup/index.md) — manage order statuses and configuration
- [Apps and Extensions](../index.md) — browse all J2Commerce add-ons
