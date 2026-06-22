# Moyasar Payment

The Moyasar plugin connects your J2Commerce store to [Moyasar](https://moyasar.com), the payment gateway built for Saudi Arabia and the Gulf region. Customers enter their card details directly on your checkout page using Moyasar's secure, embedded payment form — your server never handles raw card numbers. After the customer pays, Moyasar sends a webhook notification to your store to confirm the order.

:::note

Moyasar is a Saudi Arabia-based gateway with support for SAR, USD, EUR, and other currencies. It is widely used across KSA, UAE, Kuwait, Bahrain, Oman, Qatar, and Jordan.

:::

Key features:

- On-site Moyasar Payment Form — card details entered on your checkout page inside a secure Moyasar-hosted iframe (SAQ-A-EP compliant)
- Supports mada, Visa, Mastercard, American Express, and UnionPay card networks
- Apple Pay and STC Pay (Saudi Telecom mobile wallet)
- Saved cards — logged-in customers can store and reuse their card at checkout
- Subscription product support with automatic renewal billing via saved card tokens
- Transaction types: **Purchase** (immediate charge) or **Authorize** (hold now, capture later)
- Admin **Capture**, **Void**, and **Refund** buttons on the order detail screen
- Test mode using sandbox API keys — no real money is charged during testing

## Requirements

- Joomla 6.0 or later
- J2Commerce 6.0 or later
- An active Moyasar merchant account
- Your site served over HTTPS

## Get your credentials from the Moyasar Dashboard

Before configuring the plugin, collect the following values from your Moyasar Dashboard at [dashboard.moyasar.com](https://dashboard.moyasar.com):

| What you need                       | Where to find it in the Dashboard                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| **Publishable Key** (`pk_live_...`) | **Settings** -> **API Keys** — the publishable key is safe to use in the browser         |
| **Secret Key** (`sk_live_...`)      | **Settings** -> **API Keys** — keep this private; it is used only server-side            |
| **Webhook Secret Token**            | **Settings** -> **Webhooks** — the secret token you set when creating a webhook endpoint |

:::tip

The Moyasar Dashboard gives you two sets of keys: test keys (`pk_test_...` / `sk_test_...`) and live keys (`pk_live_...` / `sk_live_...`). Enter test keys in the **Sandbox** fields and live keys in the **Live Credentials** fields.

:::

## Purchase and download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **Moyasar Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Install the plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the `plg_j2commerce_payment_moyasar.zip` file.

![](/img/install.webp)

## Enable the Plugin

Once you have installed the App, you will need to enable it. There are **two** ways you can access the App.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard** **-> Setup** **-> Payment Methods**

![](/img/culqi.webp)

To help you narrow down the list, you can do a search for **Moyasar Payment**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

## Configure the plugin

Click the **Moyasar Payment** title next to the green checkmark to open the configuration screen.

:::tip

Click the **Toggle Inline Help** button at the top of any plugin configuration page to show a short description beneath each field.

:::

### General display

![](/img/moyasar-display.webp)

**Display Name:** The name customers see at checkout (default: Credit/Debit Card (Moyasar))

**Display Image:** Optional logo to show at checkout alongside the payment method name

### Transaction type

![](/img/moyasar-transaction.webp)

- **Purchase** charges the customer's card right away when they place their order.&#x20;

- **Authorize only (capture later)** places a temporary hold on the funds without collecting them — you must manually click **Capture Payment** from the order screen within your bank's authorization window (typically 7 days).

### Credentials

**Sandbox / Test Mode:** Switch this to **Yes** while you are testing. Payments go to Moyasar's sandbox — no real money is charged. Switch to **No** before you open your store to customers.

When Sandbox is enabled, a separate set of **Sandbox Credentials** fields appears. Enter your test keys (`pk_test_...` / `sk_test_...`) and your sandbox webhook secret token there. Your live credentials remain safely stored and untouched.

### Live credentials

![](/img/moyasar-test.webp)

These fields are shown when Sandbox is **off**.

**Publishable Key (pk\_live\_...):** Your live Moyasar publishable key from **Settings** -> **API Keys**

**Secret Key (sk\_live\_...):** Your live Moyasar secret key. Keep this private — it is never exposed to customers.

**Webhook Secret Token:** The secret token you configured on your Moyasar webhook endpoint. The plugin uses this to verify that notifications genuinely come from Moyasar.

### Sandbox credentials

![](/img/moyasar-sandbox.webp)

These fields are shown when Sandbox is **on**.

**Sandbox Publishable Key (pk\_test\_...):** Your test Moyasar publishable key

**Sandbox Secret Key (sk\_test\_...):** Your test Moyasar secret key

**Sandbox Webhook Secret Token:** The secret token for your sandbox webhook endpoint

### Payment methods

![](/img/moyasar-cc.webp)

**Payment Methods:** Select which payment methods appear on the checkout form. Options: **Credit / Debit Card**, **Apple Pay**, **STC Pay**. You can select multiple.

**Supported Card Networks:** Select which card brands to accept. Options: **mada**, **Visa**, **Mastercard**, **American Express**, **UnionPay**.

:::tip

mada is the Saudi national debit card scheme and should always be enabled for KSA customers. Visa and Mastercard cover international cards.

:::

**Allow Saved Cards:** When enabled, logged-in customers can save their card at checkout and reuse it on future orders without re-entering card details. Saved cards are also used for automatic subscription renewal payments. When **Allow Saved Cards** is enabled, a logged-in customer who has previously saved a card will see their saved cards listed at the top of the payment form. They can select an existing card and pay with one click, or choose to enter a new card. The customer can also remove a saved card from their account.

### Template Style

**Template Style:** Choose the checkout layout style — Bootstrap 5 or UIkit. Defaults to your site's active J2Commerce theme.

### Order statuses

![](/img/moyasar-status.webp)

**Paid Order Status:** Applied when Moyasar confirms a successful payment (`paid` or `captured` status)

**Authorized Order Status:** Applied when a payment is authorized but not yet captured (only shown when Transaction Type is **Authorize only**)

**Failed Payment Order Status:** Applied when a payment is declined or fails

**Change Status on Refund:** Automatically move the order to a chosen status after a refund is processed

- **Refund Order Status:** Status to apply when a refund completes (only shown when the above is enabled)

**Change Status on Void:** Automatically move the order to a chosen status after a payment is voided

- **Void/Cancel Order Status:** Status to apply when a payment is voided (only shown when the above is enabled)

:::info

If the order status you want is not listed, create it first under **J2Commerce** -> **Setup** -> **Order Statuses**.

:::

![](/img/shipstation-order-status2-1.webp)

### Surcharges

![](/img/moyasar-surcharge.webp)

Add an optional payment surcharge to cover your Moyasar transaction fees. Leave both fields blank or set to `0` if you do not charge a surcharge.

**Surcharge Name:** Label shown to customers at checkout for the surcharge line item

**Surcharge Percentage:** Adds a percentage of the order total as a fee (for example, `2.5` for 2.5%)

**Surcharge Fixed Amount:** Adds a flat amount on top of the order total

**Surcharge Tax Class:** Tax profile to apply to the surcharge

### Visibility restrictions

![](/img/moyasar-restrictions.webp)

**Geo-zone Restriction:** Limit Moyasar to customers in a specific geo-zone. Leave blank to show it to all customers.

**Minimum Order Subtotal:** Hide this payment method for orders below this amount

**Maximum Order Subtotal:** Hide this payment method for orders above this amount

### Checkout messages

![](/img/moyasar-messages.webp)

These optional text fields let you customize what customers see at each stage of the payment flow.

**On Selection:** Text shown when the customer selects Moyasar as their payment method

**On Before Payment:** Text shown before the payment form loads

**On After Payment:** Text shown on the order confirmation page after a successful payment

**On Error:** Text shown when a payment error occurs

**On Cancel:** Text shown if the customer does not complete payment

**Thank-You Article:** Optional Joomla article to display after a successful payment

### Dashboard icon

![](/img/moyasar-icon.webp)

**Show Dashboard Icon:** Adds a shortcut icon for this plugin to the J2Commerce dashboard

**Icon Label:** Custom label for the dashboard icon

### Debug logging

**Debug Logging:** Writes detailed API request and response information to `administrator/logs/payment_moyasar.php`. Useful when troubleshooting payment issues. Disable in production — the log never contains raw card numbers or secret keys.

## Set up your Moyasar webhook

After configuring the plugin, you need to register a webhook in the Moyasar Dashboard so that Moyasar can notify your store when a payment is completed, failed, or refunded.

1. Log in to the Moyasar Dashboard at [dashboard.moyasar.com](https://dashboard.moyasar.com).
2. Go to **Settings** -> **Webhooks**.
3. Click **Add Webhook**.
4. In the **URL** field, enter your store's webhook URL:

```
https://yoursite.com/index.php?option=com_ajax&plugin=payment_moyasar&group=j2commerce&format=raw&task=webhook
```

Replace `https://yoursite.com` with your actual site URL. This address must be publicly reachable — Moyasar sends an HTTPS POST to this URL each time a payment event occurs.

1. Set a **Secret Token** — this is any string you choose. Write it down and enter the same value in the plugin's **Webhook Secret Token** field.
2. Select the events to listen for. At minimum, enable:

   - `payment_paid`
   - `payment_failed`
   - `payment_voided`
   - `payment_authorized`
   - `payment_captured`
   - `payment_refunded`
3. Save the webhook.

:::info

If your store is on a local development server that cannot receive incoming connections from the internet, Moyasar's webhooks will not reach it. Use a tool such as ngrok to create a public tunnel to your local site during development.

:::

## How checkout works

The customer reaches the payment step and selects **Moyasar** (or the display name you configured).

The Moyasar Payment Form appears directly on your checkout page — card number, expiry, and CVV fields are hosted inside a secure Moyasar iframe. Your server never receives the raw card data.

If Apple Pay or STC Pay is enabled, those options also appear in the form for eligible customers.

The customer clicks **Place Order**. Moyasar processes the payment and may redirect the customer through a 3D Secure authentication step with their bank.

After authentication, Moyasar sends a webhook notification to your store to confirm the outcome.

The customer is redirected back to your order confirmation page.

### STC Pay checkout

When **STC Pay** is enabled in **Payment Methods**, customers who have STC Pay will see it as an option in the form. They enter their STC Pay mobile number and complete a one-time password (OTP) confirmation sent to their phone.

## Admin order actions

On any Moyasar order in the J2Commerce order screen, you will see action buttons provided by the plugin.

| Button                | When it appears                                                        | What it does                                                                                              |
| --------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Capture Payment**   | After an authorized payment (Authorize mode only)                      | Settles the payment and collects the funds from the customer                                              |
| **Void Payment**      | While the payment is authorized or paid but not yet settled            | Cancels the payment — no money is collected or returned                                                   |
| **Refund**            | After a captured or paid payment                                       | Returns some or all of the payment amount to the customer                                                 |
| **Charge Saved Card** | When the customer has a saved card and there is an outstanding balance | Charges a saved card from the admin screen, for example to collect a remaining balance on a split payment |

For a refund, you can enter a specific amount to refund a partial amount, or leave the amount field blank to refund the full order total.

:::info

Void is only possible before a payment settles with the bank. Once funds have been collected, you must use **Refund** instead.

:::

## Subscriptions

When **Allow Saved Cards** is turned on, customers can use Moyasar to pay for subscription products. Their card is saved as a secure token after the first payment. When a subscription renews, the plugin uses that saved token to charge the customer automatically — no customer action is required.

For subscriptions to work:

- **Allow Saved Cards** must be set to **Yes**
- The app\_subscriptionproduct plugin must be installed and enabled
- The customer must be logged in when they place their initial subscription order

## Test mode and test cards

Before going live, enable **Sandbox / Test Mode** in the plugin and enter your Moyasar test keys (`pk_test_...` and `sk_test_...`). Test mode uses Moyasar's sandbox environment — no real money is charged and no real cards are needed.

:::tip

Moyasar's sandbox uses the same API host as live (`api.moyasar.com/v1`). The environment is selected entirely by the key prefix — `pk_test_` / `sk_test_` for sandbox, `pk_live_` / `sk_live_` for live.

:::

Use only the documented test card numbers below. Using a random card number in test mode will result in a failed payment.

### Approved test cards (simulate a successful payment)

| Network          | Card Number        |
| ---------------- | ------------------ |
| mada             | `4201320111111010` |
| Visa             | `4111111111111111` |
| Mastercard       | `5421080101000000` |
| American Express | `340000000900000`  |
| UnionPay         | `6200000000000005` |

For all test cards, use:

- **Name:** Any name with at least two words (for example, `Test User`)
- **Expiry:** Any future month and year
- **CVV:** Any three digits (four digits for American Express)

### Declined test cards (simulate failures)

| Network    | Card Number        | Failure reason      |
| ---------- | ------------------ | ------------------- |
| mada       | `4201320000311101` | Insufficient funds  |
| Visa       | `4123120001090000` | Insufficient funds  |
| Mastercard | `5457210001000092` | Insufficient funds  |
| mada       | `4201321234411220` | Declined            |
| Visa       | `4123120000000000` | Unspecified failure |

A full list of test card numbers is available in the [Moyasar test cards documentation](https://docs.moyasar.com/guides/card-payments/test-cards).

When Sandbox mode is active, a warning banner appears on the J2Commerce dashboard reminding you that no real payments are being processed.

:::tip

Always disable Sandbox mode and switch to your live credentials before opening your store to customers.

:::

## Troubleshooting

### Payment goes through but the order stays in Pending

Moyasar sends a webhook notification within a few seconds of a successful payment. If your order stays in Pending:

- Check that the webhook URL in the Moyasar Dashboard is correct and publicly reachable.
- Confirm that the **Webhook Secret Token** in the plugin matches the token set in the Moyasar Dashboard exactly.
- Ensure no firewall, WAF, or Cloudflare rule is blocking incoming POST requests from Moyasar servers.
- Enable **Debug Logging** in the plugin and check the log file at `administrator/logs/payment_moyasar.php` to see incoming webhook data.

### Webhook secret token mismatch

If the plugin rejects incoming webhooks, the **Webhook Secret Token** in the plugin does not match the one configured in the Moyasar Dashboard.

- Open the Moyasar Dashboard under **Settings** -> **Webhooks** and confirm the secret token.
- Copy and paste it into the plugin's **Webhook Secret Token** field carefully — watch for leading or trailing spaces.

### Missing credentials warning on the dashboard

The J2Commerce dashboard shows a warning if the **Publishable Key** or **Secret Key** field is blank. Open the plugin settings and ensure both credential fields (or their sandbox equivalents when in test mode) are filled in.

### Apple Pay button does not appear

Apple Pay on web requires:

1. Your site must be served over HTTPS with a valid SSL certificate.
2. The customer must be using Safari on an Apple device (iPhone, iPad, or Mac with Touch ID / Face ID).
3. The customer must have a card set up in Apple Wallet.
4. Your Moyasar account must have Apple Pay enabled. Contact Moyasar support to activate this if it is not already on for your account.

### STC Pay OTP not received

STC Pay sends a one-time password to the customer's mobile number. If the OTP is not received:

- Confirm the customer entered their STC Pay registered mobile number correctly.
- Ask the customer to check for network or SMS delivery issues.
- The OTP expires after 15 minutes — the customer should try the payment again if the time has passed.

### Void button is missing on an order

The Void button only appears when a Moyasar payment ID is recorded for the order and the payment is in an `authorized` or `paid` status. If the payment has already been settled and funds collected, use the **Refund** button instead.

### Refund fails with "maximum refund exceeded" error

The refund amount cannot exceed the original transaction total minus any refunds already processed. Enter a lower amount, or leave the field blank to request a full refund.

### Card declined during testing

Only documented Moyasar test card numbers work in sandbox mode. Using a random card number or a real card number in sandbox mode will always result in a declined payment. Use one of the approved test card numbers listed in the [Test mode and test cards](#test-mode-and-test-cards) section above.

## Related topics

- [Payment Methods overview](../setup/index.md)
- [Order Statuses](../setup/index.md)
- [Subscription Products](../products/index.md)
- [Geo-zones](../setup/index.md)
