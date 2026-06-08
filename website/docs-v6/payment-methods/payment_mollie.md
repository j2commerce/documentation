---
title: "Mollie Payments"
sidebar_label: "Mollie"
sidebar_position: 7
description: "Accept iDEAL, Bancontact, credit cards, Klarna, Apple Pay, and more via Mollie — Europe's leading payment gateway — in your J2Commerce store."
---

# Mollie Payments

Mollie is a Dutch payment service provider popular across Europe that offers a single integration covering a wide range of payment methods — iDEAL, Bancontact, credit cards, SOFORT Banking, Apple Pay, Klarna Pay Later, Klarna Slice It, KBC/CBC, Belfius, EPS, Giropay, Przelewy24, Trustly, Twint, Voucher, and more. Rather than setting up separate payment gateways for each country, you activate one Mollie account and Mollie surfaces the right methods automatically based on the buyer's location and currency.

## Requirements

- J2Commerce 6.0 or later installed and active
- Joomla 6.0 or later
- A Mollie account (free to create; see below)
- Your business must be based in a country Mollie supports — primarily the EU, UK, Norway, and Switzerland
- Your site must be publicly reachable over HTTPS so Mollie can deliver webhook notifications

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com) **->** **Payment Plugins**

**Step 2:** Locate the **Mollie Payments** plugin **->** click **View Details** **->** **Add to Cart** **->** **Checkout**

**Step 3:** Go to **My Downloads** under your profile button at the top right corner. Click **Available Versions -> View Files -> Download Now**

## Set Up a Mollie Account

If you already have a Mollie account and API keys, skip ahead to [Install the Plugin](#install-the-plugin).

### Create a Mollie Account

1. Go to [mollie.com](https://www.mollie.com) and click **Create free account**.
2. Enter your email address and create a password.
3. Verify your email address when Mollie sends you a confirmation email.
4. Complete the onboarding steps — business name, address, website URL, and bank account details.
5. Mollie reviews your account (usually within one business day) before activating live payments.

### Get Your API Keys

After your account is active:

1. Log in to the [Mollie Dashboard](https://my.mollie.com).
2. Click **Developers** in the left navigation, then **API keys**.
3. You will see two keys: a **Live API key** (starts with `live_`) and a **Test API key** (starts with `test_`).
4. Copy both keys and store them safely.

:::tip

The key prefix tells you the environment — there is no separate sandbox toggle in the plugin. Enter a `test_` key to run in test mode; enter your `live_` key to accept real payments. You switch environments simply by changing the key.

:::

<!-- SCREENSHOT: Mollie Dashboard > Developers > API keys showing live_ and test_ keys -->

## Install the Plugin

Install Mollie Payments using the standard Joomla installer.

1. In the Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Click **Upload Package File** and select the Mollie Payments ZIP file you downloaded.
3. Click **Upload & Install**. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extensions installer upload screen with Mollie ZIP selected -->

## Enable the Plugin

Once installed, enable the plugin so it appears at checkout.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Payments**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Payments**

Look for **Mollie Payments**, click the red **X**, and it turns into a green checkmark. The plugin is now enabled and ready for configuration.

<!-- SCREENSHOT: J2Commerce Payments list with Mollie highlighted and enabled (green checkmark) -->

## Configure the Plugin

Click the **Mollie Payments** title next to the green checkmark to open settings.

:::tip

Click the **Toggle Inline Help** button at the top of any plugin screen to reveal a description below every field.

:::

<!-- SCREENSHOT: Mollie plugin settings page with Toggle Inline Help highlighted -->

---

### Display Settings

**Payment Option Title** — The label shown to customers at checkout. Leave blank to use the default name "Mollie Payments".

**Payment Image** — An optional image shown alongside the payment option at checkout. Upload from your media manager, or leave blank to show text only.

---

### API Key

**API Key** — Enter your Mollie API key here. This single field controls both the environment and authentication:

| Key prefix | Effect |
|------------|--------|
| `test_...` | Test mode — no real money is processed |
| `live_...` | Live mode — real payments are accepted |

There is no separate sandbox toggle. The key prefix is the environment selector.

<!-- SCREENSHOT: API Key field in plugin settings -->

---

### Order Description

**Order Description** — The description that appears on the customer's bank or card statement. Maximum 29 characters. Use the placeholder `[INVOICE]` to insert the invoice number automatically. Default: `[INVOICE]`.

---

### Payment Methods

**Enabled Payment Methods** — Select the specific Mollie payment methods you want to offer at checkout. Leave this field empty to show all payment methods that are active in your Mollie account.

The following methods are available in the selector:

| Method | Notes |
|--------|-------|
| **iDEAL** | Bank transfer — Netherlands |
| **Credit Card** | Visa, Mastercard, Amex |
| **Bancontact** | Belgium |
| **SOFORT Banking** | Austria, Belgium, Germany, Switzerland |
| **Bank Transfer** | Manual bank transfer via Mollie |
| **PayPal** | Requires PayPal activation in Mollie |
| **KBC/CBC Payment** | Belgium |
| **Belfius Direct Net** | Belgium |
| **Klarna Pay Later** | Buy now, pay later |
| **Klarna Slice It** | Installment payments |
| **Voucher** | Gift/meal voucher (Belgium, Netherlands) |
| **Apple Pay** | Requires HTTPS and compatible device |
| **EPS** | Austria |
| **Giropay** | Germany |
| **Przelewy24** | Poland |
| **Twint** | Switzerland |
| **Trustly** | Nordics and Europe |

:::info

Payment methods must also be activated in your Mollie Dashboard before they appear at checkout — enabling them here only filters the list; it does not activate them at Mollie. See [Activate Payment Methods in Mollie](#activate-payment-methods-in-mollie) below.

:::

**Translate Payment Method Names** — When set to **Yes**, method names are looked up from language overrides using the `PLG_J2COMMERCE_PAYMENT_MOLLIE_METHOD_*` key prefix, letting you rename methods in your site's language. When set to **No** (default), method names come directly from Mollie.

---

### Saved Cards

**Enable Saved Cards** — When set to **Yes** (the default), logged-in customers can save their payment method after checkout for faster future purchases. Saved cards are also used for automatic subscription renewals.

Saved payment methods are displayed to the customer on their next visit so they can check out without re-entering details.

---

### Order Status Settings

**Confirmed Payment Status** — The J2Commerce order status to apply when Mollie confirms a successful payment. Default: Confirmed.

**Change Status on Refund** — When set to **Yes**, J2Commerce automatically updates the order status after a refund is processed.

**Refund Order Status** — The status to apply after a successful refund. This field only appears when **Change Status on Refund** is set to **Yes**.

---

### Webhook URL

**Webhook URL** — This read-only field displays the URL that Mollie uses to notify your store when a payment status changes. The URL is generated automatically based on your site address.

Click the **Copy URL** button next to the field to copy it to your clipboard.

:::info

Unlike some other payment gateways, you do not need to register the webhook URL in the Mollie Dashboard. J2Commerce passes the webhook URL directly to Mollie when creating each payment, so Mollie always knows where to send notifications without any extra setup.

:::

<!-- SCREENSHOT: Webhook URL field with Copy URL button visible -->

---

### Template

**Template** — Select the visual layout for the payment step. Leave blank to use the default Bootstrap 5 layout that matches your store's appearance.

---

### Geo Zone

**Geo Zone** — Restrict Mollie Payments to customers in a specific geographic zone. Select a geozone you have defined in J2Commerce. Leave blank to show Mollie to all customers regardless of location.

---

### Order Value Restrictions

| Field | Description |
|-------|-------------|
| **Minimum Order Subtotal** | Hide Mollie as a payment option when the cart subtotal is below this amount. Leave blank for no minimum. |
| **Maximum Order Subtotal** | Hide Mollie when the cart subtotal is above this amount. Leave blank for no maximum. |

---

### Surcharge

Add an optional extra fee for customers who pay via Mollie. Check your local laws before using surcharges — they are regulated in some countries.

| Field | Description |
|-------|-------------|
| **Surcharge Label** | The name shown for the surcharge line item at checkout. Leave blank to use the default label "Mollie Payment Surcharge". |
| **Surcharge (%)** | A percentage of the order subtotal added as a surcharge. |
| **Surcharge (Fixed)** | A flat amount added to every order. |
| **Surcharge Tax Class** | A tax profile to apply to the surcharge. Leave blank if no tax applies. |

---

### Custom Messages

These text fields let you set messages shown to customers at different points in the payment process. Leave any field blank to use the built-in default message.

| Field | When it shows |
|-------|---------------|
| **Text on Method Selection** | After the customer selects Mollie as their payment method at the payment step |
| **Text Before Payment** | On the confirmation screen before the customer clicks the pay button to go to Mollie |
| **Text After Successful Payment** | After the customer returns from Mollie with a successful payment |
| **Text for Pending Payment** | When Mollie reports the payment as open or pending (e.g., bank transfer not yet settled) |
| **Text on Payment Error / Cancellation** | When the payment fails, expires, or is canceled by the customer |

---

### Thank You Article

**Thank You Article** — Select a Joomla article to display on the order confirmation page after a successful payment. Leave blank to use J2Commerce's default confirmation message.

---

### Pay Button Label

**Pay Button Label** — The label on the button that redirects the customer to Mollie. Default: **Pay Now**.

---

### Debug Mode

**Debug Mode** — When set to **Yes**, the plugin writes Mollie API calls and responses to `administrator/logs/plg_j2commerce_payment_mollie.php`. Enable this only while troubleshooting, then set it back to **No** for production.

---

## Activate Payment Methods in Mollie

Before a payment method appears at checkout, it must be active in your Mollie account:

1. Log in to the [Mollie Dashboard](https://my.mollie.com).
2. Go to **Settings** -> **Payment methods**.
3. Click **Activate** next to any method you want to use.
4. Some methods (for example, Klarna and Apple Pay) require additional verification steps — follow the prompts in Mollie.

:::tip

Payment methods are also shown based on the customer's location and the order currency. A customer in the Netherlands will see iDEAL; a customer in Belgium will see Bancontact. You do not need to configure this — Mollie handles it automatically.

:::

<!-- SCREENSHOT: Mollie Dashboard > Settings > Payment methods with several methods activated -->

---

## How the Checkout Works

The Mollie checkout uses a redirect flow:

1. The customer adds items to the cart and proceeds to checkout.
2. At the payment step, **Mollie Payments** (or your custom display name) appears as an option.
3. The customer selects Mollie. If you have multiple payment methods active, a method selector appears where the customer picks iDEAL, credit card, Bancontact, or another method. For iDEAL, a bank selector (issuer) also appears.
4. After choosing a method, the customer clicks the pay button and is redirected to Mollie's secure hosted payment page.
5. The customer completes payment on Mollie's servers.
6. Mollie redirects the customer back to your site. J2Commerce checks the payment status and updates the order accordingly.
7. Separately, Mollie sends a webhook notification to your store. J2Commerce processes this notification to apply the final status in case the redirect was interrupted.

<!-- SCREENSHOT: Checkout payment step showing Mollie method selector with iDEAL, credit card, and Bancontact options -->

---

## Test Mode

Use your `test_` API key to run test payments — no real money is processed.

1. Enter your `test_...` key in the **API Key** field and save.
2. Place a test order on the frontend.
3. On the Mollie hosted payment page, you will see test payment options — select a status (Paid, Canceled, Expired) to simulate each outcome.
4. Return to your store and verify the order status updated correctly.
5. Check `administrator/logs/plg_j2commerce_payment_mollie.php` (with Debug Mode on) to see the full API exchange.

Mollie does not charge fees for test transactions.

---

## Going Live

When you are ready to accept real payments:

1. Log in to the Mollie Dashboard and complete any pending account verification steps.
2. In the plugin settings, replace the `test_` key with your `live_` key.
3. Click **Save**.
4. Place a small real transaction to confirm the payment flow works end-to-end.
5. Set **Debug Mode** to **No**.

**Going live checklist:**

- [ ] Live API key (`live_...`) entered in the **API Key** field
- [ ] Debug Mode set to **No**
- [ ] Payment methods you want to offer are activated in your Mollie Dashboard
- [ ] Your site is publicly accessible over HTTPS
- [ ] You have tested at least one real payment end-to-end

---

## Refunds

You can issue a full or partial refund directly from the order in the J2Commerce admin:

1. Go to **J2Commerce** -> **Orders** and open the order.
2. Look for the **Payment** section on the order detail screen.
3. Click **Refund (Full)** to return the entire amount, or **Refund (Partial)** to enter a specific amount.
4. Confirm the refund.

J2Commerce sends the refund request to Mollie via the API. The customer receives their refund according to Mollie's processing timeline for their payment method (typically 2–5 business days for bank transfers, faster for card payments).

If **Change Status on Refund** is enabled, the order status updates automatically after the refund is processed.

<!-- SCREENSHOT: Order detail screen showing Payment section with Refund (Full) and Refund (Partial) buttons -->

---

## Saved Cards and Subscription Renewals

When **Enable Saved Cards** is turned on (the default), the plugin supports saved payment methods and automatic subscription renewals:

- On the **first payment**, J2Commerce creates a Mollie customer record and establishes a billing mandate (authorization). The customer's Mollie profile is stored for future use.
- On subsequent orders, logged-in customers see their saved payment method at checkout and can pay without re-entering details.
- On each **subscription renewal**, J2Commerce charges the stored customer profile using Mollie's recurring payment API — no redirect to Mollie is needed for automatic billing cycles.

This requires the J2Commerce **Subscription Product** app. The customer must complete an initial payment to establish the mandate before automatic renewals can be processed.

---

## Troubleshooting

### Payment methods do not appear at checkout

**Cause:** No payment methods are active in your Mollie account, or the API key is incorrect.

**Solution:**

1. Verify the **API Key** in the plugin settings is correct and starts with `live_` or `test_`.
2. Log in to the Mollie Dashboard **->** **Settings** **->** **Payment methods** and confirm at least one method is activated.
3. Enable **Debug Mode** and check `administrator/logs/plg_j2commerce_payment_mollie.php` for API errors.

---

### Order status does not update after payment

**Cause:** Mollie could not reach your site's webhook URL, so the payment notification was never received.

**Solution:**

1. Confirm your site is publicly accessible over HTTPS — Mollie cannot deliver webhooks to a local development server or a site behind a password-protected staging environment.
2. Mollie automatically retries webhook delivery on failure. Check the Mollie Dashboard **->** **Developers** **->** **Webhooks** (or the payment detail page) to see delivery attempts and any error codes.
3. Enable **Debug Mode** and reproduce a test payment to see whether the webhook is being received and processed.
4. Verify that no server firewall or CDN WAF rule is blocking POST requests to `index.php?option=com_ajax&...` from Mollie's IP ranges.

---

### Key prefix mismatch

**Cause:** A `test_` key is in the field but the store expects live payments (or vice versa).

**Solution:** The key prefix is the only environment selector. Check that the key in the **API Key** field matches your intent — `live_` for production, `test_` for testing. There is no separate sandbox toggle.

---

### Currency amount rejected by Mollie

**Cause:** Some currencies must be formatted without decimal places (for example, JPY), while others require exactly two decimal places. A mismatch causes Mollie to reject the payment.

**Solution:** The plugin reads the number of decimal places from your J2Commerce currency settings and formats amounts accordingly. Make sure your currency in **J2Commerce** -> **Setup** -> **Currencies** has the correct **Decimal Places** value for your currency. Japanese Yen (JPY) should be 0; Euro and US Dollar should be 2.

---

### Customer canceled the payment but the order status did not update to Canceled

**Cause:** The customer closed the Mollie payment window without completing or explicitly canceling the payment. In this case the Mollie status is `canceled` (single l — Mollie's own spelling) and the webhook fires shortly after. If your site was unreachable, the webhook may not have been delivered yet.

**Solution:** Wait a few minutes for the Mollie webhook retry cycle. If the order status still shows the wrong state, open the order in **J2Commerce** -> **Orders** and manually update the status. Check the debug log for any webhook delivery failure.

---

### Surcharge not showing at checkout

**Cause:** Surcharge fields are blank, or the order subtotal does not include the surcharge in the displayed total before the payment step.

**Solution:** Verify that **Surcharge (%)** or **Surcharge (Fixed)** contains a numeric value in the plugin settings. Surcharges are applied when the customer selects Mollie as their payment method.

---

### Mollie Payments is not visible to some customers

**Cause:** A Geo Zone restriction, Minimum Order Subtotal, or Maximum Order Subtotal setting is filtering out those customers.

**Solution:** Check the **Geo Zone**, **Minimum Order Subtotal**, and **Maximum Order Subtotal** fields in the plugin settings. Leave them blank to show Mollie to all customers without restrictions.

---

## FAQ

**Does Mollie require a separate webhook registration in the Mollie Dashboard?**
No. J2Commerce passes the webhook URL directly to Mollie each time it creates a payment. You do not need to configure a static webhook endpoint in the Mollie Dashboard.

**Which countries does Mollie support?**
Mollie supports businesses based in Austria, Belgium, Finland, France, Germany, Italy, Luxembourg, Netherlands, Poland, Portugal, Spain, Switzerland, and the UK, among others. Check [mollie.com/en/countries](https://www.mollie.com/en/countries) for the current list.

**Can I offer only specific payment methods instead of all of them?**
Yes. Use the **Enabled Payment Methods** field in the plugin settings to select the methods you want. Leave it blank to show all methods that are active in your Mollie account.

**What happens if the customer's browser closes mid-redirect?**
J2Commerce checks the payment status when the customer returns to your site. If the return is interrupted, Mollie's webhook will still fire and update the order status automatically once your site is reachable.

**Can I use Mollie with multiple currencies?**
Yes. Mollie supports multiple currencies. The currency used for each payment is determined by your store's active currency at the time of checkout. Ensure the currency is enabled in your Mollie account.

**What does "Klarna Slice It" mean?**
Klarna Slice It is Klarna's installment payment option — the customer pays in fixed monthly installments. Klarna Pay Later lets the customer pay within 14 to 30 days after delivery. Both are managed by Klarna and require Klarna activation in your Mollie account.

---

## Related Topics

- [Payment Methods overview](../payment-methods/index.md)
- [Geozones](../localization/geozones.md)
- [Currencies](../localization/currencies.md)
- [Subscription Product app](../apps-and-extensions/apps/app_subscriptionproduct.md)
- [Order management](../sales/orders.md)
