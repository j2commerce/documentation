# Kustom Payment

The Kustom plugin lets your customers pay using credit cards, buy-now-pay-later options, direct debit, and bank transfers — all processed securely through Kustom's payment platform.

Choose between two checkout experiences: **KCO** (Kustom Checkout embedded directly on your checkout page) or **HPP** (Hosted Payment Page redirect to Kustom's secure payment page). Both support full and partial refunds, order cancellation, and capture of authorized payments.

## Prerequisites

- J2Commerce installed and active on your Joomla site
- A Kustom merchant account (see the setup steps below)
- An API key from the Kustom Dashboard

***

## Set Up a Kustom Account

If you already have a Kustom account and API key, skip ahead to [**Installation & Enabling**](#installation--enabling).

### Sandbox Key (Test Site)

**Create a Kustom Account for Developers**

:::tip

**IMPORTANT**: This section is for developers to test out the plugin on a non-live site in sandbox mode. Once you are ready to go live with the site, you will need to create an account on Kustom's main website and get the production API keys there.

:::

**Sandbox keys (for testing):** Kustom provides a sandbox environment for testing. Contact Kustom support or check your dashboard for sandbox credentials. No real money is processed in sandbox mode.

Go to [https://portal.playground.kustom.co/](https://portal.playground.kustom.co/) and create an account

Click on the verification link in the email that Kustom sends you if you clicked on the **Magic Link sign-in**

Go to **Integrations -> API ->** copy the **API Key** and save it where you can find it later

![](/img/kustom-api.webp)

### Production Key (Live Site)

**Create a Kustom Account for Developers**

:::tip

**IMPORTANT**: You will need to create an account with Kustom's main website to receive the Production API keys for your live site

:::

1. Go to [Kustom](https://kustom.co/) and sign up for a merchant account.
2. Complete the business verification steps Kustom requires (varies by country and business type).
3. Provide your bank account details for payout.
4. Wait for Kustom to activate your account.

### Get Your API Key

After your account is active:

1. Log in to the [Kustom ](https://www.kustom.co/)Dashboard.
2. Navigate to **Settings** **->** **API Keys**.
3. Copy your **API Key** — this is used to authenticate API requests from your store.

***

## Installation & Enabling

This plugin is a separate add-on available from the **J2Commerce Extensions Store**. It does not come with the core J2Commerce 6 component.

**Step 1:** Go to our **[J2Commerce](https://www.j2commerce.com/)** website **->** **Payment Plugin**

**Step 2:** Locate the **Payment\_Kustom** Plugin **->** click **View Details** **->** **Add to cart** **->** **Checkout**.&#x20;

**Step 3:** Go to your **My Download**s under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Installing the Plugin

You can install this **Kustom** Payment plugin using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**&#x20;

1. Upload the plugin ZIP file or use the Install from URL option.

   ![](/img/autho-install5.webp)

## Enable the Plugin&#x20;

Once you have installed the extension, you will need to enable it. There are **two** ways you can access the extension.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Payment Methods**

![](/img/autho-methods.webp)

Look for **Kustom**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/kustom-enable.webp)

## Configuration

Go to **J2Commerce** -> **Payments** -> **Payment Methods** and click **Kustom Pay** to open the settings.

<!-- SCREENSHOT: Kustom plugin configuration form in J2Commerce admin -->

### Display Settings

| Field             | Description                                                         | Default      |
| ----------------- | ------------------------------------------------------------------- | ------------ |
| **Display Name**  | The label shown to customers at checkout                            | `Kustom Pay` |
| **Display Image** | Optional logo or image shown next to the payment option at checkout | Kustom logo  |

### Checkout Type

Choose how customers interact with the payment form:

| Field             | Description                       | Default               |
| ----------------- | --------------------------------- | --------------------- |
| **Checkout Type** | How the payment form is displayed | KCO (Kustom Checkout) |

| Option                        | Description                                                                                                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **KCO (Kustom Checkout)**     | Payment form loads directly on your checkout page. Customers complete payment without leaving your site. **Recommended for most stores.**                                               |
| **HPP (Hosted Payment Page)** | Customers are redirected to a Kustom-hosted payment page. After completing payment, they are redirected back to your site. Use this if you want Kustom to handle the entire payment UI. |

### HPP Payment Methods

This setting appears when **Checkout Type** is set to **HPP**. Select which payment methods to offer customers:

| Method                     | Description                        |
| -------------------------- | ---------------------------------- |
| **PAY\_NOW**               | Immediate payment via card or bank |
| **PAY\_LATER**             | Buy now, pay later options         |
| **PAY\_OVER\_TIME**        | Installment payment plans          |
| **DIRECT\_DEBIT**          | Bank account direct debit          |
| **DIRECT\_BANK\_TRANSFER** | Traditional bank transfer          |

Select multiple methods by holding Ctrl (Windows) or Cmd (Mac) while clicking.

**Note:** Available payment methods vary by country and merchant account configuration. Contact Kustom support to enable specific methods for your account.

### Transaction Type

Choose when to capture payment:

| Field                | Description                                          | Default        |
| -------------------- | ---------------------------------------------------- | -------------- |
| **Transaction Type** | When payment is captured from the customer's account | Auth + Capture |

| Option             | Description                                                                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auth + Capture** | Payment is authorized and captured immediately when the customer completes checkout. The order status updates to Confirmed right away.                                                                        |
| **Auth Only**      | Payment is authorized but not captured. You must manually capture the payment from the order admin page within 7 days. Use this for pre-orders, backorders, or when you need to verify stock before charging. |

### Sandbox Mode

| Field       | Description                                                             | Default |
| ----------- | ----------------------------------------------------------------------- | ------- |
| **Sandbox** | Switch on to use Kustom's test environment. No real money is processed. | Yes     |

Turn sandbox mode **on** while you are setting up and testing. Turn it **off** before you go live.

When sandbox mode is active, a warning banner appears on the J2Commerce dashboard so you cannot accidentally forget.

### Live API Credentials

These are used when **Sandbox** is set to **No**.

| Field       | Description                                 |
| ----------- | ------------------------------------------- |
| **API Key** | Your live API key from the Kustom Dashboard |

### Sandbox API Credentials

These are used when **Sandbox** is set to **Yes**.

| Field               | Description                      |
| ------------------- | -------------------------------- |
| **Sandbox API Key** | Your sandbox API key for testing |

### Subtemplate

| Field           | Description                                                                             | Default     |
| --------------- | --------------------------------------------------------------------------------------- | ----------- |
| **Subtemplate** | Select an alternative layout template for the Kustom payment form, if any are installed | *(default)* |

### Order Status

| Field            | Description                                                 | Default   |
| ---------------- | ----------------------------------------------------------- | --------- |
| **Order Status** | The order status applied after a successful payment capture | Confirmed |

Choose the status that fits your workflow. Most stores use **Confirmed** or **Processing** for paid orders.

### Cancellation Settings

| Field                       | Description                                                                              | Default  |
| --------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| **Change Status on Cancel** | Automatically change order status when an order is cancelled                             | No       |
| **Cancel Order Status**     | The status to set when an order is cancelled (shown when Change Status on Cancel is Yes) | *(none)* |

### Refund Settings

| Field                           | Description                                                                                      | Default  |
| ------------------------------- | ------------------------------------------------------------------------------------------------ | -------- |
| **Change Status on Refund**     | Automatically change order status when a refund is processed                                     | No       |
| **Refund Order Status**         | The status to set when a full refund is processed (shown when Change Status on Refund is Yes)    | *(none)* |
| **Partial Refund Order Status** | The status to set when a partial refund is processed (shown when Change Status on Refund is Yes) | *(none)* |

### Surcharge

Add an optional surcharge to orders paid via Kustom. This is useful if you want to pass on Kustom's processing fee to customers (check your local laws before doing this).

| Field                   | Description                                                         | Default  |
| ----------------------- | ------------------------------------------------------------------- | -------- |
| **Surcharge Name**      | Label shown to customers for the surcharge (e.g., "Processing Fee") | *(none)* |
| **Surcharge Percent**   | Percentage of the order subtotal added as a surcharge               | *(none)* |
| **Surcharge Fixed**     | Fixed amount added as a surcharge                                   | *(none)* |
| **Surcharge Tax Class** | Tax profile to apply to the surcharge amount                        | *(none)* |

You can combine a percentage and a fixed amount — both will be added together.

### Geo-Zone Restriction

| Field                    | Description                                                   | Default                         |
| ------------------------ | ------------------------------------------------------------- | ------------------------------- |
| **Geo-Zone Restriction** | Limit Kustom availability to customers in a specific geo-zone | *(none — available everywhere)* |

Leave this empty to show Kustom to all customers regardless of location.

### Order Amount Limits

| Field                | Description                                                                                      | Default  |
| -------------------- | ------------------------------------------------------------------------------------------------ | -------- |
| **Minimum Subtotal** | Hide Kustom if the cart subtotal is below this amount. Leave empty for no minimum.               | *(none)* |
| **Maximum Subtotal** | Hide Kustom if the cart subtotal exceeds this amount. Leave empty or set to `-1` for no maximum. | *(none)* |

### Thank You Page

| Field                 | Description                                                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Thank You Article** | Select a Joomla article to display after a successful payment. This is shown on the confirmation page in addition to the standard confirmation message. |

### Custom Messages

These text fields let you customize messages shown to customers at different points in the payment process.

| Field                 | When it displays                                          |
| --------------------- | --------------------------------------------------------- |
| **On Selection**      | When the customer selects Kustom as their payment method  |
| **On Before Payment** | On the payment page before the customer clicks Pay        |
| **On After Payment**  | On the confirmation page after a successful payment       |
| **On Error Payment**  | When a payment error occurs                               |
| **On Cancel Payment** | When the customer cancels payment and returns to the cart |

### Dashboard Icon

| Field                    | Description                                                                 | Default  |
| ------------------------ | --------------------------------------------------------------------------- | -------- |
| **Show Dashboard Icon**  | Show a shortcut icon for Kustom on the J2Commerce dashboard                 | No       |
| **Dashboard Icon Label** | Label for the dashboard icon (only visible when Show Dashboard Icon is Yes) | *(none)* |

### Debug Mode

| Field          | Description                                                                                           | Default |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------- |
| **Debug Mode** | Write detailed Kustom API activity to `administrator/logs/payment_kustom.php` and the browser console | No      |

Enable debug mode only while troubleshooting. Disable it in production — logs can grow large quickly.

***

## Checkout Experience

### KCO (Kustom Checkout) Mode

When Checkout Type is set to KCO:

1. The Kustom payment form loads directly on your checkout page.
2. The customer enters payment details and clicks **Pay**.
3. Payment is processed without leaving your site.
4. The customer sees the confirmation page.

<!-- SCREENSHOT: Kustom Checkout embedded on checkout page -->

### HPP (Hosted Payment Page) Mode

When Checkout Type is set to HPP:

1. The customer is redirected to a Kustom-hosted payment page.
2. They select their preferred payment method (if multiple are enabled).
3. They complete payment on Kustom's secure servers.
4. After payment, they are redirected back to your confirmation page.

<!-- SCREENSHOT: Kustom Hosted Payment Page -->

***

## Order Management

Once a customer pays, J2Commerce records the transaction details:

- **Order status** is updated to the status you configured (default: Confirmed).
- **Transaction ID** — the Kustom Order ID — is stored with the order.
- **Transaction status** — Captured, Authorized, Cancelled, or Refunded — is tracked.
- **Order history** is updated with a payment note.

### Capture Authorized Payments (Auth Only Mode)

If you set **Transaction Type** to **Auth Only**, payments are authorized but not captured. To capture:

1. Go to **J2Commerce** -> **Orders** and open the order.
2. Look for the **Payment** section.
3. Click **Capture** to capture the authorized amount.
4. The order status updates to the configured payment status.

You can also **Cancel** an authorization to release the hold on the customer's funds without charging them.

<!-- SCREENSHOT: Order admin view showing Capture and Cancel buttons -->

### Refunds

You can issue a full or partial refund directly from the order in the J2Commerce admin:

1. Go to **J2Commerce** -> **Orders** and open the order.
2. Look for the **Payment** section.
3. Click **Refund**.
4. Enter the amount to refund (leave blank to refund the full amount).
5. Confirm the refund.

The refund is sent to Kustom via the API. If you enabled **Change Status on Refund**, the order status updates automatically.

<!-- SCREENSHOT: Order admin view showing Refund button and amount input -->

### Full vs Partial Refunds

- **Full refund:** Refunds the entire order amount. Sets transaction status to "Refunded."
- **Partial refund:** Refunds a portion of the order amount. Sets transaction status to "Partially Refunded."

Kustom tracks the total refunded amount across all partial refunds.

***

## Callbacks (Push Notifications)

Kustom sends push notifications to your store when order status changes. These are handled automatically — no additional configuration is required.

| Event            | What happens in J2Commerce                     |
| ---------------- | ---------------------------------------------- |
| Order authorized | Order status updated to Pending                |
| Order captured   | Order status updated to Confirmed              |
| Order cancelled  | Order status updated to Cancelled (if enabled) |
| Order refunded   | Order status updated to Refunded (if enabled)  |

The callback URL is automatically configured in the plugin. Kustom sends notifications to this URL when any status change occurs.

***

## Enable Payment Methods in Kustom Dashboard

Payment methods available in HPP mode are configured in your Kustom Dashboard:

1. Log in to the [Kustom Dashboard](https://dashboard.kustom.com).
2. Go to **Settings** -> **Payment Methods**.
3. Enable or disable payment methods for your account.
4. Some methods may require additional verification — follow the prompts.

**Important:** Payment methods available vary by:

- Your merchant account country
- Your customer's location
- Your account configuration

Contact Kustom support to enable specific payment methods for your account.

<!-- SCREENSHOT: Kustom Dashboard payment methods settings -->

***

## Going Live Checklist

Before accepting real payments, confirm the following:

- [ ] **Sandbox** is set to **No**
- [ ] Your live **API Key** is entered
- [ ] You have placed a test order using a real payment method with a small amount
- [ ] **Debug Mode** is set to **No**
- [ ] Payment methods you want to offer are enabled in your Kustom Dashboard (for HPP mode)
- [ ] You have tested the capture, cancel, and refund flows

***

## Troubleshooting

### "API Key is missing or invalid" error

**Cause:** The API key is missing or incorrect.

**Solution:**

1. Open the Kustom plugin settings.
2. Make sure you have entered an API key for the correct mode (live or sandbox).
3. If using live mode, verify **Sandbox** is set to **No**.
4. If using sandbox mode, verify **Sandbox** is set to **Yes** and you have entered a sandbox API key.

### Payment succeeds but order stays Pending

**Cause:** The order status did not update correctly, possibly due to a callback failure.

**Solution:**

1. Check that callbacks are reaching your server by enabling **Debug Mode**.
2. Verify your server is publicly accessible (Kustom cannot send callbacks to localhost).
3. Check `administrator/logs/payment_kustom.php` for callback errors.
4. Manually update the order status if needed.

### Capture button does not appear in admin

**Cause:** The order is not in an authorized state, or the transaction status is not "Authorized."

**Solution:**

1. Open the order and check the **Transaction Status** field.
2. Only orders with **Transaction Type** set to **Auth Only** and **Transaction Status** of "Authorized" show the Capture button.
3. If the payment was already captured, the Capture button will not appear.

### Refund fails with an error

**Cause:** The order has already been fully refunded, or the Kustom Order ID is missing.

**Solution:**

1. Open the order and check that a **Transaction ID** is recorded.
2. If the Transaction ID is empty, the payment may not have been processed correctly. Check the debug log.
3. Log in to your Kustom Dashboard and verify the transaction status there.
4. Check if the order has already been fully refunded in Kustom.

### Dashboard shows "Kustom is in Sandbox mode" warning

**Cause:** **Sandbox** is set to **Yes**.

**Solution:** If you are ready to go live, open the Kustom plugin settings and switch **Sandbox** to **No**, then enter your live API key.

### HPP payment methods not showing at checkout

**Cause:** No payment methods are selected in the HPP Payment Methods setting, or methods are not enabled in your Kustom Dashboard.

**Solution:**

1. Open the Kustom plugin settings.
2. Verify **Checkout Type** is set to **HPP**.
3. Check that at least one payment method is selected in **HPP Payment Methods**.
4. Log in to your Kustom Dashboard and ensure the selected methods are enabled for your account.

### Customer sees "Payment Failed" but money was taken

**Cause:** A communication error occurred after payment was processed but before the order was updated.

**Solution:**

1. Check `administrator/logs/payment_kustom.php` for errors during the callback.
2. Look up the order by Transaction ID in the J2Commerce admin.
3. Manually update the order status to Confirmed.
4. Contact Kustom support if the issue persists.

***

## Support

For help with the Kustom plugin:

- **J2Commerce documentation:** [docs.j2commerce.com](https://docs.j2commerce.com)
- **J2Commerce support:** [www.j2commerce.com](https://www.j2commerce.com)
- **Kustom Dashboard:** [dashboard.kustom.com](https://dashboard.kustom.com)
- **Kustom documentation:** [docs.kustom.com](https://docs.kustom.com)
- **Kustom support:** [support.kustom.com](https://support.kustom.com)
