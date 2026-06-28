# PAYONE Commerce Platform Payment

The PAYONE Payment plugin connects your J2Commerce store to the **PAYONE Commerce Platform**, a European payment infrastructure used by thousands of merchants across the EU. It accepts major credit and debit cards (Visa, Mastercard, American Express, and others) and handles the full payment lifecycle — authorization, capture, void, and refund — directly from your store's admin.

Two integration modes are available, so you can choose whether customers stay on your page or are redirected to a PAYONE-hosted payment page:

- **Hosted Checkout Page (redirect)** — the customer is sent to a secure PAYONE-hosted page to enter their card details and then returned to your store. Your servers never handle raw card numbers, which keeps your PCI compliance requirements at the simplest level (SAQ-A). This is the default and recommended option.
- **Hosted Tokenization Page (iframe)** — a secure card-input iframe from PAYONE is embedded directly on your checkout page. Card data is tokenized by PAYONE's servers; your store only ever receives a token. This mode also enables saved cards for returning customers.

The plugin also supports:

- **Pre-authorization** — reserve funds on a card without immediately charging the customer, then capture from the order screen when you are ready to ship
- **Saved cards** — returning customers can pay faster with a stored card (Hosted Tokenization mode only)
- **Subscription renewals** — saved card tokens can be charged automatically when you use the J2Commerce Subscriptions add-on
- **Capture, void (cancel), and refund** directly from the J2Commerce order detail screen
- **Sandbox / test mode** — test every part of the checkout flow without processing real payments

## Requirements

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.3 or later
- A PAYONE Commerce Platform merchant account (pre-production or live)
- Your store must be accessible over HTTPS
- A publicly reachable URL for webhook delivery (webhooks cannot reach localhost)

## Get Your PAYONE Credentials

Before configuring the plugin, you need several pieces of information from the **PAYONE Commerce Platform portal** (the merchant management interface at the PAYONE website). Have the portal open in another browser tab while you work through the steps below.

### What you need

| Credential              | What it is                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **API Key ID**          | An identifier for the API key pair — used in request signatures so PAYONE knows which key was used to sign the request   |
| **API Secret**          | The secret half of the API key pair — never shared publicly; used to generate the request signature                      |
| **PSPID (Merchant ID)** | Your unique merchant identifier on the PAYONE platform — it appears in all API URL paths                                 |
| **Webhook Key ID**      | An identifier for the webhook signing key — used when J2Commerce verifies that an incoming notification came from PAYONE |
| **Webhook Secret**      | The secret used to verify the HMAC-SHA256 signature (`X-GCS-Signature`) on each incoming webhook notification            |

PAYONE uses separate credentials for the **pre-production (test)** environment and the **live** environment. Gather both sets before configuring the plugin.

:::tip

The test (pre-production) API host is `payment.preprod.payone.com`. The live host is `payment.payone.com`. The plugin switches between them automatically based on the **Sandbox / Test Mode** setting — you do not need to enter the host URLs manually.

:::

### Register a webhook endpoint

PAYONE sends real-time notifications to your store when payment events occur (authorization succeeded, capture completed, refund processed, and so on). You must register your store's webhook URL in the PAYONE portal.

Your webhook URL is:

```
https://your-site.com/index.php?option=com_ajax&group=j2commerce&plugin=payment_payone&format=raw&task=webhook
```

Replace `your-site.com` with your actual domain. The plugin settings screen displays this exact URL in a read-only field with a **Copy** button for convenience.

Register this URL in the PAYONE portal for both the pre-production and live environments. After registering, copy the **Webhook Key ID** and **Webhook Secret** shown in the portal — you will need both.

:::warning
PAYONE cannot deliver webhooks to a site running on localhost or a private network. If you are developing locally, use a tunnel service such as ngrok to expose a public URL for testing.
:::

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **PAYONE Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Install the Plugin

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `payment_payone.zip` package ZIP file or use the Install from URL option.

![](/img/install.webp)

## Enable the Plugin

Once you have installed the App, you will need to enable it. There are **two** ways you can access the App.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard** **-> Setup** **-> Payment Methods**

![](/img/culqi.webp)

To help you narrow down the list, you can do a search for **PAYONE**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/payone-enable.webp)

## Configure the Plugin

Click the **PAYONE** title next to the green checkmark to open the configuration screen.

:::tip

Click the **Toggle Inline Help** button at the top of any plugin configuration page to show a short description beneath each field.

:::

![](/img/payone-toggle.webp)

### Basic Settings tab

![](/img/payone-display.webp)

**Display Name:** The label shown to customers on the checkout page (for example, "Pay by Card" or "Credit/Debit Card"). The default is `Credit/Debit Card`.

**Display Image:** An optional logo to show next to the payment method name at checkout. Leave blank to show no image.

### Integration Mode

![](/img/payone-autho.webp)

**Integration Mode:** Controls how the payment form is presented to the customer.

- **Hosted Checkout Page (redirect):** The customer is redirected to a secure PAYONE-hosted payment page, then returned to your store after payment. Qualifies for SAQ-A PCI compliance. This is the default.

- **Hosted Tokenization Page (iframe):** A secure card-input form from PAYONE is embedded in an iframe on your checkout page. Card data is tokenized by PAYONE — your server never sees raw card numbers. Required for saved cards.

### Authorization Mode

**Authorization Mode:** Controls when funds are collected from the customer's card.

- **Sale (capture immediately):** Funds are captured at the moment of authorization — the customer is charged right away. This is the default and suits most stores.

- **Pre-authorization (capture later):** The card is authorized and funds are reserved, but no charge is made until you click **Capture** from the order screen. Use this when you want to confirm stock or review an order before charging.

- **Final authorization:** A guaranteed pre-authorization that cannot be modified before capture. Typically used in specific retail scenarios.

When Authorization Mode is set to **Pre-authorization** or **Final authorization**, an additional **Authorized Status** field appears so you can set a distinct order status for payments that are authorized but not yet captured.

### Sandbox / Test Mode

![](/img/payone-api.webp)

**Sandbox / Test Mode:** When switched on, all transactions go to the PAYONE pre-production environment (`payment.preprod.payone.com`). No real charges are made.

Enable this during setup and testing. A warning banner appears on the J2Commerce dashboard while test mode is active. Switch it off only when you are ready to accept real payments.

### Skip 3-D Secure Authentication

**Skip 3-D Secure Authentication:** When switched on, J2Commerce requests a direct authorization and bypasses the 3-D Secure (3DS / SCA) bank verification step. **Leave this OFF on production sites** — 3DS is required for EU/EEA compliance under PSD2. Only enable this for test accounts that do not simulate the 3DS flow.

### Credentials

The plugin shows either the **live credentials** or the **sandbox credentials** depending on whether Sandbox mode is on or off.

#### Live credentials (shown when Sandbox is OFF)

**API Key ID:** Your PAYONE live API Key ID

**API Secret:** Your PAYONE live API Secret (stored encrypted)

**PSPID (Merchant ID):** Your PAYONE live merchant identifier

**Webhook Key ID:** The Webhook Key ID from the PAYONE live portal

**Webhook Secret:** The Webhook Secret for live HMAC-SHA256 signature verification (stored encrypted)

**Webhook URL:** Read-only display of your store's webhook endpoint — copy this into the PAYONE portal

#### Sandbox credentials (shown when Sandbox is ON)

**Sandbox API Key ID:** Your PAYONE pre-production API Key ID

**Sandbox API Secret:** Your PAYONE pre-production API Secret

**Sandbox PSPID (Merchant ID):** Your PAYONE pre-production merchant identifier

**Sandbox Webhook Key ID:** The Webhook Key ID from the PAYONE pre-production portal

**Sandbox Webhook Secret:** The Webhook Secret for pre-production HMAC-SHA256 verification

**Webhook URL:** Read-only display of your store's webhook endpoint for use in the pre-production portal

### Saved Cards

![](/img/payone-cc.webp)

**Allow Saved Cards:** When switched on, logged-in customers can save their card token at checkout for faster purchases in the future. Saved cards can also be charged automatically for subscription renewals.

:::info

The **Allow Saved Cards** setting is only available when **Integration Mode** is set to **Hosted Tokenization Page (iframe)**. Hosted Checkout Page redirect mode does not support card saving.

:::

### Template Style

**Template Style:** Choose the checkout layout style for the payment form. Available options depend on your site's active J2Commerce template skin (Bootstrap 5 or UIkit). Leave blank to use the default for your template.

### Order Statuses

![](/img/payone-status.webp)

These settings control which J2Commerce order status is applied when specific payment events occur.

**Order Status (Payment Success):** Status applied when PAYONE confirms a successful payment

**Authorized Status:** Status applied when payment is authorized but not yet captured — only shown for Pre-authorization and Final authorization modes

**Failed Status:** Status applied when a payment is declined or fails

**Change Status on Refund:** When switched on, automatically updates the order status after a refund is processed

- **Refund Order Status:** The status to apply after a refund — only shown when Change Status on Refund is enabled

**Change Status on Cancel:** When switched on, automatically updates the order status after a payment is voided or cancelled

- **Cancel Order Status:** The status to apply after a cancellation — only shown when Change Status on Cancel is enabled

:::info

**NOTE:** If the status you want isn't listed in the dropdown menu, you can create a new one by going to **J2Commerce -> Setup -> Order Statuses**

:::

![](/img/shipstation-order-status2-1.webp)

### Surcharge

![](/img/payone-surcharge.webp)

Add an optional handling fee when a customer chooses PAYONE.

**Surcharge Name:** The label shown to the customer (for example, "Card processing fee")

**Surcharge Percent:** A percentage of the order total added as a fee (for example, `1.5` for 1.5%)

**Surcharge Fixed:** A fixed amount added regardless of order size

**Surcharge Tax Class:** A tax profile to apply to the surcharge — leave blank if no tax applies

Leave Surcharge Percent and Surcharge Fixed blank to charge no surcharge.

### GeoZone and Restrictions

![](/img/payone-geozone.webp)

**Geozone Restriction:** Limit PAYONE to customers in a specific geozone — leave blank to allow all locations

**Minimum Order Subtotal:** Hide PAYONE as a payment option when the cart subtotal is below this amount (`-1` means no minimum)

**Maximum Order Subtotal:** Hide PAYONE when the cart subtotal is above this amount (`-1` means no maximum)

### Custom HTML Messages

![](/img/payone-text.webp)

These optional fields let you display custom text at different points in the payment flow.

**Thank-You Article:** Optional Joomla article shown on the order confirmation page after successful payment

**On Selection Text:** Displayed when the customer selects PAYONE as their payment method

**Before Payment Text:** Displayed just above the payment form, before the customer enters card details

**After Payment Text:** Displayed on the confirmation page after a successful payment

**On Error Text:** Displayed when a payment attempt fails

**Order Cancelled Message:** Displayed when the customer cancels or navigates away from the PAYONE payment page

### Dashboard Icon

![](/img/payone-icon.webp)

**Show Dashboard Icon:** Add a quick-access shortcut for this plugin to the J2Commerce dashboard.

**Icon Label:** The label for the shortcut. Defaults to "PAYONE" if left blank.

### Debug Mode

**Debug Mode:** Records detailed API request and response data to the Joomla log file at `administrator/logs/payment_payone.php`.

Only enable this when diagnosing a specific problem. Disable it on live sites — debug logs can contain sensitive transaction details.

## How Checkout Works for Customers

### Hosted Checkout Page (redirect)

The customer adds items to their cart and proceeds to checkout.

On the payment step, a notice informs the customer that they will be redirected to a secure payment page.

![](/img/payone-frontend.webp)

The customer is sent to the PAYONE-hosted payment page to enter their card details.

After payment is complete (or if the customer cancels), they are returned to your store automatically.

On success, the customer sees the order confirmation page.

### Hosted Tokenization Page (iframe)

1. The customer adds items to their cart and proceeds to checkout.
2. On the payment step, a secure card-input form appears embedded in the page — card number, expiry date, and CVV fields are loaded in a PAYONE iframe.
3. If the customer is logged in and has saved cards on file (and **Allow Saved Cards** is enabled), a list of their saved cards appears. They can select a saved card or choose to use a new card.
4. If using a new card and saved cards are enabled, a checkbox lets the customer save the card for future orders.
5. On success, the customer sees the order confirmation page.

## Webhooks

PAYONE sends real-time notifications to your store when payment events occur — such as a payment being authorized, captured, declined, cancelled, or refunded. The plugin verifies each notification using HMAC-SHA256 by checking the `X-GCS-Signature` header against the **Webhook Secret** you configured.

The webhook URL to register in the PAYONE portal is:

```
https://your-site.com/index.php?option=com_ajax&group=j2commerce&plugin=payment_payone&format=raw&task=webhook
```

Replace `your-site.com` with your actual domain. This URL is also displayed in the plugin settings for easy copying.

Key webhook events the plugin handles:

| PAYONE Status Code   | Meaning                              | What happens in J2Commerce                                                                               |
| -------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| 5 (Authorised)       | Payment authorized, not yet captured | Order status updates to Authorized Status (pre-authorization mode) or Payment Success status (sale mode) |
| 9 (Captured)         | Funds captured                       | Order status updates to Payment Success status                                                           |
| 6 (Cancelled/Voided) | Authorization voided                 | Order status updates to Cancel Order Status (if enabled)                                                 |
| 8 (Refunded)         | Refund processed                     | Order status updates to Refund Order Status (if enabled)                                                 |
| Other                | Declined or error                    | Order status updates to Failed Status                                                                    |

## Managing Payments from the Order Screen

After an order is paid, you can take follow-up actions from the J2Commerce order detail page.

Go to **J2Commerce** -> **Sales** -> **Orders** -> click the order number to open it. The PAYONE action buttons appear in the payment section of the order.

### Capture a Payment (Pre-authorization mode only)

When Authorization Mode is set to **Pre-authorization** or **Final authorization**, payments are authorized but not charged until you capture them.

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Click **Capture** and confirm the prompt ("Capture this payment now? Funds will be debited from the customer.").
3. PAYONE collects the reserved funds from the customer's card. The order status updates to the Payment Success status.

:::info

The **Capture** button is only available when the payment statusCode is 5 (Authorised). Once captured, use **Refund** instead.

:::

### Void / Cancel a Payment

A void releases an authorized payment before it has been captured. Once captured, use **Refund** instead.

1. Open the order.
2. Click **Void/Cancel** and confirm the prompt ("Cancel/void this authorization? Note: funds may not release immediately.").
3. The authorization is released — the customer is not charged and any hold on their card is removed.

:::info

Funds may take a short time to be released depending on the customer's card issuer, even after a successful void.

:::

### Issue a Refund

You can refund a captured payment in full or in part.

1. Open the order.
2. Click **Refund**.
3. Choose **Full refund** to return the entire captured amount, or enter a smaller amount for a partial refund (up to the maximum refundable amount shown).
4. Click **Process Refund** to confirm.

The refund is submitted to PAYONE. If **Change Status on Refund** is enabled, the order status updates automatically when PAYONE confirms the refund.

## Testing Payments

Always test in sandbox mode before accepting real orders.

1. Switch on **Sandbox / Test Mode** in the plugin settings and enter your PAYONE pre-production credentials (Sandbox API Key ID, Sandbox API Secret, Sandbox PSPID, Sandbox Webhook Key ID, and Sandbox Webhook Secret).
2. Register your webhook URL in the PAYONE pre-production portal.
3. Place a test order on your storefront.
4. At the payment step, complete the payment using a PAYONE test card number (available in your PAYONE merchant portal documentation).
5. Confirm the order appears in **J2Commerce** -> **Sales** -> **Orders** with the correct status.
6. If you are using pre-authorization mode, test capturing the payment from the order screen.
7. Test a refund from the order screen to confirm it processes without errors.
8. Check the Joomla log at **System** -> **Logs** for any errors — enable **Debug Mode** temporarily if needed.
9. When everything is working, switch off **Sandbox / Test Mode** and replace the sandbox credentials with your live credentials.

:::warning
Remember to turn off **Sandbox / Test Mode** before accepting real orders. A warning banner on the J2Commerce dashboard will remind you if sandbox mode is still active.
:::

## Troubleshooting

### The payment form does not load at checkout

**Cause:** The plugin is not enabled, or credentials are missing.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** and confirm PAYONE shows a green enabled indicator.
2. Open the plugin settings and verify that **API Key ID**, **API Secret**, and **PSPID** are filled in for the active environment (live or sandbox).
3. Clear the Joomla cache: **System** -> **Clear Cache** -> **Delete All**.
4. Enable **Debug Mode** and attempt a checkout, then check the log at `administrator/logs/payment_payone.php` for error details.

### Orders are stuck in a pending status after payment

**Cause:** PAYONE webhooks are not being received, or the webhook signature verification is failing because the Webhook Secret is incorrect.

**Solution:**

1. Confirm your webhook URL is registered in the PAYONE portal for the correct environment (pre-production or live).
2. Open the plugin settings and verify the **Webhook Key ID** and **Webhook Secret** match the values in the portal exactly. Even a trailing space will cause verification to fail.
3. Make sure your store's URL is publicly reachable over HTTPS. Webhooks cannot be delivered to localhost or a private network.
4. Enable **Debug Mode** and attempt a test payment, then review the log at `administrator/logs/payment_payone.php` for any webhook-related errors.

### The Capture / Void / Refund buttons do not appear on the order

**Cause:** The order was not paid through PAYONE, the payment was never finalized, or no transaction ID was stored.

**Solution:**

1. Confirm the order's payment method is PAYONE (visible in the payment section of the order detail view).
2. The buttons appear only when a PAYONE payment ID is recorded on the order. If the checkout was interrupted before payment was confirmed, no transaction data is stored.
3. Enable **Debug Mode** and re-test a full checkout to confirm transaction data is being saved correctly.

### Capture fails with "Payment cannot be captured in its current state"

**Cause:** The payment is not in Authorised status (statusCode 5). It may have already been captured or has expired.

**Solution:**

1. Check the order's payment details. If the payment was already captured (statusCode 9), use **Refund** instead.
2. Pre-authorizations expire after a period set by PAYONE (typically a few days). If the authorization has expired, a new order will need to be placed.
3. Enable **Debug Mode** and retry the capture, then review the log for the specific error returned by PAYONE.

### Refund fails with "Payment cannot be refunded in its current state"

**Cause:** The payment must be in Captured status (statusCode 9) before it can be refunded. A payment that was only authorized and then voided cannot be refunded.

**Solution:**

1. Check that the original payment was captured (the Capture button must have been clicked, or Authorization Mode was set to Sale).
2. Enable **Debug Mode** and retry the refund, then review the log for the specific error.

### Missing credentials warning on the J2Commerce dashboard

**Cause:** One or more of API Key ID, API Secret, or PSPID is empty for the active environment.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** -> **PAYONE**.
2. Fill in the **API Key ID**, **API Secret**, and **PSPID** fields for the environment that is currently active (live or sandbox).
3. Click **Save** to apply the changes.

### Saved cards do not appear at checkout

**Cause:** Saved cards are only available in Hosted Tokenization Page mode. In Hosted Checkout Page mode, the feature is not supported.

**Solution:**

1. Open the plugin settings and change **Integration Mode** to **Hosted Tokenization Page (iframe)**.
2. Make sure **Allow Saved Cards** is switched on.
3. Confirm the customer is logged in — saved cards are not shown to guest shoppers.
4. Click **Save** and clear the Joomla cache.
