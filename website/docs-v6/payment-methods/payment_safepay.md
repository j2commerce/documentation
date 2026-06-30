# Safepay Payment

The Safepay Payment plugin lets your J2Commerce store accept Visa and Mastercard payments through your Safepay (getsafepay) account. Safepay is a Pakistan-based gateway that charges in Pakistani Rupees (PKR) by default and also supports other currencies such as USD, GBP, and EUR.

Customers can pay using card fields shown right on your checkout page (**Embedded** mode) or on a secure Safepay-hosted page (**Hosted** mode). Returning shoppers can also save a card for faster checkout next time.

## Requirements

- PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- An active Safepay merchant account at [getsafepay.com](https://getsafepay.com)

## Get Your Safepay Keys

Before you configure the plugin, copy these three keys from your Safepay dashboard (**Developers** section):

| Key                           | Where it goes                  | Notes                                                          |
| ----------------------------- | ------------------------------ | -------------------------------------------------------------- |
| **Merchant API Key (Public)** | The **Merchant API Key** field | Public key, usually starts with `sec_`.                        |
| **Secret Key**                | The **Secret Key** field       | Private key — keep it confidential.                            |
| **Webhook Secret**            | The **Webhook Secret** field   | Found under **Developers -> Endpoints -> View shared secret**. |

:::info

NOTE: Safepay gives you a **separate set of keys** for sandbox (testing) and live (production). Sandbox and live keys are not interchangeable. Use sandbox keys while testing, then switch to live keys when you go live.

:::

## Purchase and download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **SafePay**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Install the plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the `plg_j2commerce_payment_safepay.zip` file.

![](/img/install.webp)

## Enable the Plugin

Once you have installed the App, you will need to enable it. There are **two** ways you can access the App.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard** **-> Setup** **-> Payment Methods**

![](/img/culqi.webp)

To help you narrow down the list, you can do a search for **SafePay**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/safepay-enable.webp)

## Configure the plugin

Click the **SafePay** title next to the green checkmark to open the configuration screen.

:::tip

Click the **Toggle Inline Help** button at the top of any plugin configuration page to show a short description beneath each field.

:::

![](/img/safepay-toggle.webp)

### Display Settings

![](/img/safepay-display.webp)

**Display Name:** The name customers see at checkout. Default is `Safepay`.

**Display Image:** An optional logo or card-brand image shown next to the payment option.

### API Credentials

![](/img/safepay-api.webp)

**Sandbox Mode:** Set to **Yes** to test with sandbox keys and the Safepay test environment. Set to **No** for real, live payments.

**Merchant API Key (Public):** Your public merchant API key (live). Shown when **Sandbox Mode** is **No**.

**Secret Key:** Your private secret key (live). Shown when **Sandbox Mode** is **No**.

**Webhook Secret:** The webhook signing secret (live). Shown when **Sandbox Mode** is **No**.

**Sandbox Merchant API Key / Secret Key / Webhook Secret:** The same three keys, but for the sandbox environment. Shown when **Sandbox Mode** is **Yes**.

:::info

NOTE: The plugin automatically shows the correct set of key fields based on your **Sandbox Mode** choice, so you only ever fill in the keys you need.

:::

### Webhook URL

![](/img/safepay-webhook.webp)

The **Webhook URL** field shows a unique address that lets Safepay notify your store when a payment succeeds, fails, or is refunded. This keeps your orders up to date even if a customer closes their browser mid-payment.

1. Copy the URL shown in the **Webhook URL** field.
2. In your Safepay dashboard, go to **Developers -> Endpoints** and add it as a new endpoint.
3. Subscribe to the payment and subscription events.

:::tip

Always keep webhooks set up. Without them, an order may not be marked as paid if the customer's connection drops after payment.

:::

### Checkout Options

![](/img/safepay-mode.webp)

**Allow Saved Cards:** Set to **Yes** to let returning customers pay with a card they saved on a previous order.

**Checkout Mode: Embedded** shows Safepay card fields directly on your checkout page (recommended). **Hosted** sends the customer to a Safepay-hosted payment page, then back to your store.

**Skip 3-D Secure (authorize only):** *Embedded mode only.* Leave this **No** for production. Only set to **Yes** if your Safepay account is not set up for 3-D Secure, or for low-risk testing.

**Template Style:** Choose a layout override if you have a custom checkout template. Leave as default for the standard look.

:::info

**NOTE:** **3-D Secure** is the extra verification step (such as a one-time code from the bank) that protects against fraud. Keeping it on is strongly recommended for live stores.

:::

### Order Status

![](/img/safepay-status.webp)

**Order Status:** The status an order is set to after a successful payment (for example, **Confirmed**).

**Change Status on Void:** Set to **Yes** to automatically change the order status when a payment is voided.

- **Void Order Status:** The status to apply when an order is voided. Shown when **Change Status on Void** is **Yes**.

**Change Status on Refund:** Set to **Yes** to automatically change the order status when a payment is refunded.

- **Refund Order Status:** The status to apply when an order is refunded. Shown when **Change Status on Refund** is **Yes**.

:::info

If the order status you want is not listed, create it first under **J2Commerce** -> **Setup** -> **Order Statuses**.

:::

![](/img/shipstation-order-status2-1.webp)

### Surcharge (Optional)

![](/img/safepay-surcharge.webp)

Use these fields if you want to add a small handling fee when a customer pays with Safepay.

**Surcharge Name:** The label shown for the fee on the order (for example, `Card processing fee`).

**Surcharge Percent:** A percentage of the order total to add as a fee.

**Surcharge Fixed:** A fixed amount to add as a fee.

**Surcharge Tax Class:** The tax profile to apply to the surcharge, if it should be taxed.

### Restrictions (Optional)

![](/img/safepay-restrictions.webp)

**Geo Zone Restriction:** Limit Safepay to customers in a specific geographic zone. Leave empty to allow everyone.

**Minimum Subtotal:** Hide Safepay unless the cart total is at least this amount. Leave empty for no minimum.

**Maximum Subtotal:** Hide Safepay when the cart total is above this amount. Leave empty for no maximum.

### Custom Checkout Messages

![](/img/safepay-messages.webp)

These optional text fields let you customise what customers see at each stage of the payment flow.

**Thank-You Article:** Optional Joomla article to display after a successful payment

**On Before Payment:** Text shown before the customer is redirected to Barclaycard

**On After Payment:** Text shown on the order confirmation page after a successful payment

**On Error:** Text shown when a payment error occurs

**On Cancel:** Text shown when the customer cancels on the Barclaycard page

### Extras (Optional)

![](/img/safepay-icon.webp)

**Show Dashboard Icon:** Set to **Yes** to add a quick-access icon for Safepay on the J2Commerce dashboard.

- **Icon Label:** The text shown under the dashboard icon. Shown when **Show Dashboard Icon** is **Yes**.

**Debug Logging:** Set to **Yes** to record all Safepay requests and responses to a log file. Use only while troubleshooting, then turn it off.

## How It Works

When a customer reaches checkout and chooses Safepay:

1. The customer selects **Safepay** as the payment method.
2. In **Embedded** mode, they enter their card details right on your checkout page. In **Hosted** mode, they are taken to the secure Safepay payment page.
3. Safepay runs 3-D Secure verification with the customer's bank (when enabled).
4. After payment, the customer returns to your store and sees the order confirmation.
5. Safepay also sends a webhook to your store to confirm the result, so the order is marked paid even if the customer's connection drops.

## Managing Payments from the Order

Once an order has been paid through Safepay, you can manage it from the order view in **J2Commerce -> Sales -> Orders**. Depending on the payment's stage, you may see buttons to:

- **Capture** — collect a payment that was only authorized.
- **Void** — cancel a payment before it settles (typically within 24 hours).
- **Refund** — return money to the customer after settlement (full or partial).
- **Charge Saved Card** — bill a card the customer saved previously.

:::info

NOTE: The available actions depend on how far along the payment is. For example, a settled payment can be **refunded** but not **voided**.

:::

## Tips

- **Test in sandbox first** — Turn on **Sandbox Mode**, enter your sandbox keys, and place a test order before going live.
- **Always set up the webhook** — It keeps orders accurate even if a customer closes their browser during payment.
- **Keep 3-D Secure on** — It protects you against fraud and chargebacks on live stores.
- **Turn off Debug Logging** after troubleshooting to keep your log files small.
- **Use the right currency** — Safepay is PKR-first; make sure your store currency is one Safepay supports.

## Troubleshooting

### Safepay Does Not Appear at Checkout

**Cause:** The plugin is disabled, or an availability rule is hiding it.

**Solution:**

1. Go to **J2Commerce -> Setup -> Payment Methods** and confirm **Safepay** shows a green checkmark.
2. Open the Safepay settings and check **Minimum Subtotal**, **Maximum Subtotal**, and **Geo Zone Restriction** — the cart may fall outside these limits.
3. Confirm the customer's location matches any geo zone you set.

### Payment Fails or Is Declined

**Cause:** Incorrect API keys, or sandbox keys used on a live store (or the reverse).

**Solution:**

1. Open the Safepay settings and check **Sandbox Mode** is set correctly (**Yes** for testing, **No** for live).
2. Re-copy the **Merchant API Key**, **Secret Key**, and **Webhook Secret** from your Safepay dashboard for the matching environment.
3. Save and place a new test order.

### Order Stays Pending After a Successful Payment

**Cause:** The webhook is not set up, so Safepay cannot notify your store.

**Solution:**

1. Open the Safepay settings and copy the **Webhook URL**.
2. In your Safepay dashboard, go to **Developers -> Endpoints** and add it as an endpoint.
3. Subscribe to the payment events and make sure the **Webhook Secret** in the plugin matches the one in your dashboard.

### Cannot Save or Reuse a Card

**Cause:** **Allow Saved Cards** is turned off.

**Solution:**

1. Open the Safepay settings.
2. Set **Allow Saved Cards** to **Yes** and click **Save**.

### Need More Detail to Diagnose a Problem

**Cause:** You need to see what Safepay is returning.

**Solution:**

1. Open the Safepay settings and set **Debug Logging** to **Yes**.
2. Reproduce the problem with a test order.
3. Check the `payment_safepay.php` log file under your site's log folder.
4. Turn **Debug Logging** back to **No** when you are finished.
