---
title: "Viva.com Payment"
sidebar_label: "Viva.com"
sidebar_position: 94
description: "Accept cards and digital wallets via Viva.com Smart Checkout — a hosted SAQ-A redirect, with saved cards, subscription renewals, pre-authorization, full and partial refunds, and a demo test mode using separate Viva demo credentials."
---

# Viva.com Payment

The Viva.com Payment plugin connects your J2Commerce store to **Viva.com** (formerly Viva Wallet), a European payment platform that supports cards, digital wallets, and local payment methods across Europe. When a customer pays, they are redirected to a secure Viva-hosted payment page to enter their card details, and then returned to your store automatically when the payment is complete.

Because card data is entered and handled entirely on Viva's own servers, your store qualifies for the simplest level of PCI security compliance (SAQ-A) — card numbers never touch your server. The plugin also supports:

- **Saved cards** — returning customers can check out faster with a saved card on file
- **Subscription renewals** — saved cards can be charged automatically when you use the J2Commerce Subscriptions add-on
- **Pre-authorization** — reserve funds without charging, then capture when you are ready to ship
- **Instalments** — offer customers a split-payment option (Greece-registered accounts only)
- **Full and partial refunds** — issue refunds directly from the J2Commerce order screen
- **Void/cancel** — release a pre-authorized hold before it is captured

## Requirements {#requirements}

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.3 or later
- A Viva.com merchant account (demo or live)
- Your store must be accessible over HTTPS

## Purchase and Download {#purchase-and-download}

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **Viva.com Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Get Your Viva Credentials {#get-credentials}

Before configuring the plugin, you need four pieces of information from the Viva banking app. Viva uses two separate sets of credentials for different operations:

- **Smart Checkout credentials (OAuth2):** Used to create orders on the Viva-hosted payment page. These are your **Client ID** and **Client Secret**.
- **Classic API credentials (Basic auth):** Used for capture, void, refund, and recurring charges. These are your **Merchant ID** and **API Key**.

### Where to find them

1. Log in to the Viva banking app at [www.vivapayments.com](https://www.vivapayments.com) (or the demo portal for testing).
2. Go to **Settings** -> **API Access**.
3. Under the **Smart Checkout** section, copy your **Client ID** and **Client Secret**.
4. Your **Merchant ID** and **API Key** appear in the same screen under the classic API credentials section.

:::info
Viva uses entirely separate credentials and portal URLs for demo and live environments. The demo (sandbox) environment is at `demo.vivapayments.com`. Keep the Viva portal open while you configure the plugin in Joomla — you will also need to set return URLs and register a webhook URL from the plugin settings screen.
:::

### Payment Source

Viva organizes payments into **payment sources**. Each source has its own Success URL, Failure URL, and return settings. The plugin defaults to a source named `Default`. If you have created a custom payment source in your Viva account, note its **Source Code** (a short code such as `9876`).

### Return URLs

After completing the payment on Viva's page, Viva redirects the customer back to your store using the **Success URL** and **Failure URL** configured on your payment source — not via the API. You must copy these URLs from the plugin settings screen and paste them into your Viva payment source. Without this step, customers will not be redirected back to your store after payment.

### Webhook URL

Viva sends a payment notification to your store via a webhook. You must register this URL in the Viva banking app so Viva knows where to send the notification.

1. In the Viva banking app, go to **Settings** -> **API Access** -> **Webhooks**.
2. Add a new webhook for the **Transaction Payment Created** event.
3. Paste the Webhook Endpoint URL displayed in the plugin settings screen.

:::note
Viva webhooks are not signed with a cryptographic key. Instead, Viva verifies ownership at registration time by sending a GET request to your webhook URL — the plugin responds with a key fetched from the Viva API. At runtime, whenever a webhook POST arrives, the plugin always re-fetches the transaction from Viva's API before updating your order. Your orders are never updated based on the raw incoming webhook alone.
:::

## Install the Plugin {#install}

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the `payment_viva.zip` file or use the Install from URL option.

<!-- SCREENSHOT: System > Install > Extensions upload screen -->

## Enable the Plugin {#enable}

Once installed, you need to enable the plugin. There are two ways to reach it.

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Setup** -> **Payment Methods**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Dashboard** -> **Setup** -> **Payment Methods**

<!-- SCREENSHOT: J2Commerce Payment Methods list showing Viva.com disabled -->

Search for **Viva.com Payment**, click the **X** next to it, and it turns into a green checkmark. The plugin is now enabled and ready for setup.

<!-- SCREENSHOT: Viva.com Payment showing green checkmark -->

## Configure the Plugin {#configure}

Click the **Viva.com Payment** title to open its settings.

:::tip
Click the **Toggle Inline Help** button at the top of the plugin settings screen to show a description below each field as you configure it.
:::

<!-- SCREENSHOT: Plugin settings screen with Toggle Inline Help button highlighted -->

### Basic Settings tab {#basic-settings}

### Display Name {#display-name}

**Display Name:** The label shown to customers on the checkout page. The default is `Credit/Debit Card (Viva.com)`. Change this to whatever makes sense for your store — for example, "Pay by Card" or "Viva.com".

### Display Image {#display-image}

**Display Image:** An optional logo or card-brand image shown next to the payment method name at checkout. Leave blank to show only the display name.

### Demo / Test Mode {#demo-test-mode}

**Demo / Test Mode:** When turned on, the plugin connects to the Viva demo environment (`demo.vivapayments.com`). All transactions are simulated — no real money is moved.

:::info
Viva uses an entirely separate portal and separate credentials for demo and live. You must have a Viva demo merchant account and enter its credentials in the **Demo** credential fields below. You cannot use your live credentials to test in demo mode.
:::

Enable this during initial setup and testing. When demo mode is active, a warning banner appears on the J2Commerce dashboard as a reminder. Turn it off only when you are ready to accept real payments.

### Live Credentials {#live-credentials}

These fields appear when **Demo / Test Mode** is turned off. All four are required.

| Field | Description |
|-------|-------------|
| **Smart Checkout Client ID** | Your live Viva OAuth2 Client ID — used to create Smart Checkout orders. Found in the Viva banking app under **Settings** -> **API Access** |
| **Smart Checkout Client Secret** | Your live Viva OAuth2 Client Secret. Never exposed to the browser |
| **Merchant ID** | Your live Viva Merchant ID (a GUID). Used as the username for capture, void, refund, and recurring charges |
| **API Key** | Your live Viva API Key. Used as the password for the classic API. Never exposed to the browser |
| **Payment Source Code** | The code of the payment source in your Viva account. Defaults to `Default`. Change this only if you have multiple sources |

### Demo Credentials {#demo-credentials}

These fields appear when **Demo / Test Mode** is turned on. They work identically to the live fields but connect to your Viva demo merchant account.

| Field | Description |
|-------|-------------|
| **Demo Client ID** | Your Viva demo OAuth2 Client ID |
| **Demo Client Secret** | Your Viva demo OAuth2 Client Secret |
| **Demo Merchant ID** | Your Viva demo Merchant ID |
| **Demo API Key** | Your Viva demo API Key |
| **Demo Payment Source Code** | The payment source code for your demo account. Defaults to `Default` |

### Return URLs {#return-urls}

These fields are read-only — they display the URLs you need to copy into your Viva payment source.

| Field | Description |
|-------|-------------|
| **Success URL** | Copy this into the **Success URL** field of your Viva payment source in the Viva banking app. Viva redirects the customer here after a successful payment so the order confirmation page appears |
| **Failure URL** | Copy this into the **Failure URL** field of your Viva payment source. Viva redirects the customer here when a payment fails or is cancelled |

:::info
Viva Smart Checkout reads the return URLs from the payment source configuration in your Viva banking account — they are not sent via the API. If you do not set these, the customer will remain on Viva's own page after payment and never see your store's order confirmation page.
:::

### Webhook Endpoint URL {#webhook-url}

**Webhook Endpoint URL:** This read-only field shows the URL to register in the Viva banking app (**Settings** -> **API Access** -> **Webhooks**) for the **Transaction Payment Created** event. Copy this URL and paste it into your Viva webhook settings.

### Multicurrency Account {#multicurrency}

**Multicurrency Account:** Leave this off for most stores. Enable it only if your Viva account is configured to support multiple currencies.

:::info
On a single-currency Viva account, the currency for your payment source is fixed in your Viva settings. Sending an explicit currency code from J2Commerce would conflict with that setting and be rejected by Viva. This is why the setting defaults to off. If you have a multicurrency Viva account and your store sells in multiple currencies, turn this on so the order currency is passed correctly.
:::

### Pre-Authorize (capture later) {#preauth}

**Pre-Authorize (capture later):** When turned on, Viva reserves the funds on the customer's card without charging immediately. You then capture the payment manually from the order screen when you are ready to ship.

:::note
Pre-authorization is not compatible with subscriptions or instalments. If you enable subscriptions or instalments, leave pre-authorization off.
:::

### Allow Saved Cards {#allow-saved-cards}

**Allow Saved Cards:** When turned on, logged-in customers can save their card at checkout for faster future purchases. Saved cards are also used for automatic subscription renewals when the J2Commerce Subscriptions add-on is installed.

:::note
Saved cards are available to logged-in customers only. Guest shoppers check out without this option.
:::

### Enable Subscriptions {#enable-subscriptions}

**Enable Subscriptions:** When turned on, the plugin supports recurring payment charges via the J2Commerce Subscriptions add-on. The first payment saves a recurring key; future renewals are charged automatically without requiring 3D Secure.

:::note
Subscriptions require the J2Commerce Subscriptions add-on to be installed and enabled. Enable subscriptions is not compatible with pre-authorization or instalments.
:::

### Maximum Instalments (Greece only) {#max-installments}

**Maximum Instalments (Greece only):** Set the maximum number of instalments to offer customers (1–36). Set to `0` to disable instalments. This option is available only for Viva accounts registered in Greece, and is not compatible with subscriptions or pre-authorization.

### Template {#template}

**Template:** If your theme includes a custom checkout template override for the Viva payment form, select it here. Leave blank to use the default layout.

### Order Statuses {#order-statuses}

These settings control which J2Commerce order status is applied when specific payment events occur.

| Field | Description | Default |
|-------|-------------|---------|
| **Order Status (Payment Success)** | Status applied when Viva confirms a successful payment | Confirmed |
| **Authorised Status** | Status applied when a pre-authorized payment is reserved but not yet captured — only visible when Pre-Authorize is enabled | Confirmed |
| **Change Status on Refund** | When turned on, automatically updates the order status after a refund is processed | No |
| **Refund Order Status** | The status to apply after a refund — only visible when Change Status on Refund is enabled | — |
| **Change Status on Cancel** | When turned on, automatically updates the order status after a payment is voided | No |
| **Cancel Order Status** | The status to apply after a void — only visible when Change Status on Cancel is enabled | — |
| **Failed Payment Status** | Status applied when a payment fails or expires | Failed |

### Surcharge {#surcharge}

Add an optional handling fee when a customer chooses Viva.com.

| Field | Description |
|-------|-------------|
| **Surcharge Name** | The label shown to the customer (for example, "Card processing fee") |
| **Surcharge Percent** | A percentage of the order total added as a fee (for example, `1.5` for 1.5%) |
| **Surcharge Fixed** | A fixed amount added regardless of order size |
| **Surcharge Tax Class** | A tax profile to apply to the surcharge — leave blank if no tax applies |

Leave both Surcharge Percent and Surcharge Fixed empty to charge no surcharge.

### GeoZone and Order Value Restrictions {#restrictions}

| Field | Description |
|-------|-------------|
| **Geozone Restriction** | Limit Viva.com to customers in a specific geozone — leave blank to allow all locations |
| **Minimum Order Subtotal** | Hide Viva.com as a payment option when the cart subtotal is below this amount |
| **Maximum Order Subtotal** | Hide Viva.com when the cart subtotal is above this amount |

### Custom HTML Snippets {#custom-html}

These optional fields let you inject custom text or HTML at different points in the payment flow.

| Field | When it appears |
|-------|----------------|
| **Thank-You Article** | Optional Joomla article shown on the order confirmation page after successful payment |
| **On Selection Text** | Displayed when the customer selects Viva.com as their payment method |
| **Before Payment Text** | Displayed just before the customer is redirected to Viva's payment page |
| **After Payment Text** | Displayed on the confirmation page after a successful payment |
| **On Error Text** | Displayed when a payment attempt fails |
| **Order Cancelled Message** | Displayed when the customer cancels or navigates away |

### Dashboard Icon {#dashboard-icon}

**Show Dashboard Icon:** Add a quick-access shortcut for this plugin to the J2Commerce dashboard.

**Dashboard Icon Label:** The label for the shortcut icon. Defaults to "Viva.com Payment" if left blank.

### Debug Mode {#debug-mode}

**Debug Mode:** Records detailed API request and response data in the Joomla log file (`logs/payment_viva.php`).

Only enable this when diagnosing a specific problem. Disable it on live sites — debug logs can contain sensitive data. Card data and secrets are never logged regardless of this setting.

## How Checkout Works for Customers {#how-it-works}

1. The customer adds items to their cart and proceeds to checkout.
2. On the payment step, the customer sees the Viva.com payment option with a notice that they will be redirected to a secure Viva-hosted payment page.
3. If the customer is logged in and has saved cards on file (and **Allow Saved Cards** is enabled), they see a list of saved cards and can select one or choose to enter a new card.
4. The customer clicks to pay. J2Commerce sends the order to Viva and receives a redirect link. The customer is sent to Viva's own hosted payment page.
5. The customer enters their card details on Viva's secure page and submits payment.
6. Viva processes the payment and redirects the customer back to your store using the **Success URL** configured on your payment source.
7. J2Commerce finalizes the order, clears the cart, and shows the order confirmation page.

:::info
If Pre-Authorize is enabled, step 5 reserves funds on the card but does not charge it immediately. You capture the payment from the order screen when you are ready.
:::

## Managing Payments from the Order Screen {#order-screen}

After an order is placed, you can take follow-up actions directly from the J2Commerce order detail page.

Go to **J2Commerce** -> **Sales** -> **Orders** -> click the order number to open it. The Viva.com action buttons appear in the payment section.

### Capture Payment {#capture}

**Capture Payment** is available when **Pre-Authorize** is enabled and the payment is in an authorized (reserved) state. Clicking **Capture Payment** charges the customer's card for the authorized amount.

:::info
Once captured, the payment cannot be voided — use **Issue Refund** if you need to return money to the customer.
:::

### Void Payment {#void}

**Void Payment** is available when the payment is in an authorized (pre-auth) state and has not yet been captured. Voiding releases the hold on the customer's card without charging them.

### Issue a Refund {#refund}

You can refund a completed (captured) payment in full or in part.

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Click **Issue Refund**.
3. Choose **Full refund** to return the entire amount, or enter a smaller amount for a partial refund (up to the maximum refundable amount shown).
4. Click **Process Refund** to confirm.

The refund is submitted to Viva. The customer's card is credited within a few business days depending on their bank.

If **Change Status on Refund** is enabled, the order status updates automatically after the refund is processed.

## Tips {#tips}

- **Set the return URLs first** — before you do any test payments, copy the **Success URL** and **Failure URL** from the plugin settings into your Viva payment source. Without them, customers land on Viva's own thank-you page instead of your store's confirmation page.
- **Use a dedicated demo account for testing** — Viva demo and live environments are completely separate. Create a demo merchant account at `demo.vivapayments.com` and enter those credentials in the **Demo** credential fields.
- **Leave Multicurrency off for single-currency stores** — if your Viva account is tied to a single currency (the most common setup), sending an explicit currency code causes Viva to reject the payment with a 403 error. Only turn this on if your Viva account explicitly supports multiple currencies.
- **Pre-auth is ideal for made-to-order products** — if you produce items only after payment, pre-authorization lets you confirm the customer's card is valid before you start production, then capture when you ship.
- **Partial refunds are supported** — you can refund any amount up to the original order total. The maximum refundable amount is shown clearly in the refund dialog.
- **Saved cards persist between orders** — a customer who saves a card today can use it on any future order without re-entering their details, as long as **Allow Saved Cards** remains enabled.

## Troubleshooting {#troubleshooting}

### The payment option does not appear at checkout {#payment-not-showing}

**Cause:** The plugin is not enabled, credentials are missing, or a geozone or subtotal restriction is hiding it.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** and verify Viva.com shows a green enabled indicator.
2. Open the plugin settings and confirm all four credential fields are filled in for the active environment (live or demo).
3. Check whether a **Geozone Restriction** or **Minimum/Maximum Order Subtotal** is configured — these will hide the option for customers who do not qualify.
4. Clear the Joomla cache: **System** -> **Clear Cache** -> **Delete All**.

### Customers are not returned to my store after payment {#no-redirect-back}

**Cause:** The Success URL is not configured in the Viva payment source, or it points to the wrong URL.

**Solution:**

1. Open the plugin settings in J2Commerce and copy the **Success URL** shown in the read-only field.
2. Log in to the Viva banking app, go to **Settings** -> **API Access**, and open your payment source.
3. Paste the Success URL into the **Success URL** field and save.
4. Do the same for the **Failure URL** using the value shown in the plugin settings.

### Orders are stuck in a pending status after payment {#stuck-pending}

**Cause:** The webhook URL is not registered in the Viva banking app, or Viva cannot reach your store to send the notification.

**Solution:**

1. Open the plugin settings and copy the **Webhook Endpoint URL**.
2. Log in to the Viva banking app, go to **Settings** -> **API Access** -> **Webhooks**, and add the URL for the **Transaction Payment Created** (event type 1796) event.
3. Confirm your site is publicly reachable over HTTPS — Viva cannot send notifications to a site running on localhost or a private network.
4. Enable **Debug Mode** in the plugin settings, attempt a test payment, then check **System** -> **Logs** for any errors.

### Payment rejected with a currency error {#currency-error}

**Cause:** The **Multicurrency Account** setting is turned on but your Viva account is set up for a single currency. Sending an explicit currency code to a single-currency account causes Viva to return a 403 error.

**Solution:**

1. Go to the plugin settings and set **Multicurrency Account** to **No**.
2. Clear the Joomla cache: **System** -> **Clear Cache** -> **Delete All**.
3. Test a payment. The currency is now taken from your Viva payment source settings rather than being sent explicitly.

### Missing credentials warning on the J2Commerce dashboard {#missing-credentials}

**Cause:** One or more of the four credential fields is empty for the currently active environment (live or demo).

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** -> **Viva.com Payment**.
2. Fill in all four fields: **Client ID**, **Client Secret**, **Merchant ID**, and **API Key** for the active environment.
3. Click **Save**. The warning clears automatically once all credentials are present.

### Refund fails with an error {#refund-fails}

**Cause:** The refund amount exceeds the original charge, or the transaction is not in a refundable state.

**Solution:**

1. Confirm the refund amount does not exceed the maximum shown in the refund dialog.
2. Check that the original transaction was completed (captured) successfully — pre-authorized orders that were never captured cannot be refunded; void them instead.
3. Enable **Debug Mode** and retry the refund, then review **System** -> **Logs** for the specific error returned by Viva.

### Void button is not visible on the order {#void-not-visible}

**Cause:** The void action is only available for pre-authorized transactions. If pre-authorization is not enabled, or if the payment has already been captured, the void button does not appear.

**Solution:**

1. Confirm **Pre-Authorize (capture later)** is enabled in the plugin settings.
2. Check the order status — if the transaction has already been captured or settled, it cannot be voided. Issue a refund instead.
:::
