# SumUp Payment

The SumUp Payment plugin connects your J2Commerce store to **SumUp**, a card payments platform popular with small businesses and independent retailers. It loads SumUp's secure card widget directly on your checkout page, so customers never leave your site to enter their card details.

Because the card fields are served and handled entirely by SumUp's own servers, your store qualifies for the simplest level of PCI security compliance (SAQ-A) — card numbers never touch your server. The plugin also supports saving cards for returning customers, subscription renewals, and full or partial refunds directly from the order screen.

## Requirements {#requirements}

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.3 or later
- A SumUp merchant account (test or live)
- Your store must be accessible over HTTPS

## Get Your SumUp Credentials {#get-credentials}

Before configuring the plugin, collect these two items from your SumUp Dashboard.

1. Log in to your SumUp account at [me.sumup.com](https://me.sumup.com).
2. Go to **Account** -> **API Keys** and create a new secret key. It starts with `sup_sk_`. This is your **Secret API Key** — keep it private and never share it publicly.
3. Your **Merchant Code** appears in **Account** -> **Business Account**. It is a short alphanumeric code (for example, `MX12345`).

:::info

SumUp uses a single API host for both test and live. Sandbox mode is determined by your merchant account, not by a different URL or key prefix. If you want to test without processing real money, you need a **separate SumUp sandbox (test) merchant account** — the same API key from your live account cannot be switched to test mode.

:::

Keep the SumUp Dashboard open while you configure the plugin in Joomla.

## Purchase and Download {#purchase-and-download}

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **SumUp Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Installing the Plugin{#install}

You can install this **SumUp Payment** plugin using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**&#x20;

Upload the `payment_sumup.zip` file or use the Install from URL option.

![](/img/autho-install5.webp)

## Enable the Plugin&#x20;

Once you have installed the extension, you will need to enable it. There are **two** ways you can access the extension.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Payment Methods**

![](/img/autho-methods.webp)

Look for **SumUp Payment**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/sumup-enable.webp)

## Configure the Plugin {#configure}

Click the **SumUp Payment** title to open its settings.

:::tip

**Helpful tip:** Click the **Toggle Inline Help** button at the top of the plugin settings screen to show a description below each field as you configure it.

:::

![](/img/sumup-toggle.webp)

### Basic Settings tab {#basic-settings}

![](/img/sumup-display.webp)

**Display Name:** The label shown to customers on the checkout page (for example, "Pay with Card"). Change this to whatever makes sense for your store.

**Display Image:** An optional logo or card-brand image shown next to the payment method name at checkout. Leave blank to show only the display name.

### Credentials{#sandbox}

**Sandbox / Test Mode:** When turned on, the plugin uses your sandbox API key and merchant code instead of the live ones.

:::info

SumUp has no separate sandbox API host — sandbox mode is controlled by the merchant account itself. You must have a dedicated SumUp test merchant account to test without charging real cards. If you do not have one, leave this off and use live credentials.

:::

Enable this during initial setup and testing. When Sandbox mode is active, a warning banner appears on the J2Commerce dashboard as a reminder. Turn it off only when you are ready to accept real payments.

### Live Credentials {#live-credentials}

![](/img/sumup-config-api.png)

These fields appear when **Sandbox / Test Mode** is turned off.

**Live Secret API Key:** Your SumUp live secret API key (starts with `sup_sk_`). Server-only — never exposed to the browser

**Live Merchant Code:** Your SumUp merchant code from the SumUp Dashboard

### Sandbox Credentials {#sandbox-credentials}

![](/img/sumup-config-api1.webp)

These fields appear when **Sandbox / Test Mode** is turned on. They work identically to the live fields but connect to your SumUp test merchant account.

**Sandbox Secret API Key:** Your SumUp test secret API key

**Sandbox Merchant Code:** Your SumUp sandbox merchant code (must belong to a sandbox account)

### Allow Saved Cards {#allow-saved-cards}

![](/img/sumup-config-cc.webp)

**Allow Saved Cards:** When turned on, logged-in customers can save their card at checkout for faster purchases in the future. Saved cards are also used for automatic subscription renewals when the J2Commerce Subscriptions add-on is installed.

:::info

Card saving is available to logged-in customers only. Guest shoppers check out without this option.

:::

**Template Style:** If your theme includes a custom checkout template override for the SumUp payment form, select it here. Leave blank to use the default layout.

### Order Statuses {#order-statuses}

![](/img/sumup-config-status.webp)

These settings control which J2Commerce order status is applied when specific payment events occur.

**Order Status (Payment Success):** Status applied when SumUp confirms a successful payment

**Failed Payment Status:** Status applied when a payment fails or expires

**Change Status on Refund:** When turned on, automatically updates the order status after a refund is processed

- **Refund Order Status:** The status to apply after a refund — only visible when Change Status on Refund is enabled

**Change Status on Cancel:** When turned on, automatically updates the order status after a checkout is cancelled

- **Cancel Order Status:** The status to apply after a cancellation — only visible when Change Status on Cancel is enabled

:::tip

If the status you want is not listed in a dropdown, create a new one first by going to **J2Commerce** -> **Setup** -> **Order Statuses**.

:::

![](/img/shipstation-order-status2-1.webp)

### Surcharge {#surcharge}

![](/img/sumup-config-surcharge.webp)

Add an optional handling fee when a customer chooses SumUp.

**Surcharge Name:** The label shown to the customer (for example, "Card processing fee")

**Surcharge Percent:** A percentage of the order total added as a fee (for example, `1.5` for 1.5%)

**Surcharge Fixed:** A fixed amount added regardless of order size

**Surcharge Tax Class:** A tax profile to apply to the surcharge — leave blank if no tax applies

Leave both Surcharge Percent and Surcharge Fixed empty to charge no surcharge.

### GeoZone and Order Value Restrictions {#restrictions}

![](/img/sumup-config-restrictions.webp)

**Geozone Restriction:** Limit SumUp to customers in a specific geozone — leave blank to allow all locations

**Minimum Order Subtotal:** Hide SumUp as a payment option when the cart subtotal is below this amount

**Maximum Order Subtotal:** Hide SumUp when the cart subtotal is above this amount

### Custom HTML Messages{#custom-html}

![](/img/sumup-config-messages.webp)

These optional fields let you inject custom text or HTML at different points in the payment flow.

**Thank-You Article:** Optional Joomla article shown on the order confirmation page after successful payment

**On Selection Text:** Displayed when the customer selects SumUp as their payment method

**Before Payment Text:** Displayed just above the card form, before the customer enters card details

**After Payment Text:** Displayed on the confirmation page after a successful payment

**On Error Text:** Displayed when a payment attempt fails

**Order Cancelled Message:** Displayed when the customer cancels or navigates away

### Dashboard Icon {#dashboard-icon}

![](/img/sumup-config-icon.webp)

**Show Dashboard Icon:** Add a quick-access shortcut for this plugin to the J2Commerce dashboard.

**Icon Label:** The label for the shortcut icon. Defaults to "SumUp Payment" if left blank.

### Debug Mode {#debug-mode}

**Debug Mode:** Records detailed API request and response data in the Joomla log.

Only enable this when diagnosing a specific problem. Disable it on live sites — debug logs can contain sensitive payment details.

## How Checkout Works for Customers {#how-it-works}

The customer adds items to their cart and proceeds to checkout.

![](/img/sumup-frontend.webp)

On the payment step, the SumUp card widget loads directly on the page. The card number, expiry date, and security code fields appear inside SumUp's secure hosted form.

If the customer is logged in and has saved cards on file (and **Allow Saved Cards** is enabled), they see a list of saved cards and can select one or choose to use a new card.

If saving is allowed and the customer is using a new card, a checkbox lets them save it for future orders.

The customer submits their payment. SumUp collects and processes the card charge immediately — there is no separate authorization step.

On success, the customer sees the order confirmation page.

:::info

SumUp captures payment immediately. There is no separate authorize-then-capture flow. If you need to reverse a completed payment, use **Issue Refund** from the order screen — there is no void option for paid orders.

:::

## Webhooks {#webhooks}

SumUp sends a notification to your store when a payment event occurs (such as a payment completing or failing). The plugin receives these notifications and re-fetches the checkout status from SumUp's API to confirm the outcome before updating your order.

:::note

SumUp webhook notifications do not include a cryptographic signature. The plugin handles this by re-fetching the checkout directly from the SumUp API to verify the result — your orders are only updated based on the confirmed server-side status, not the notification alone.

:::

Your webhook URL to register in the SumUp Dashboard is:

```
https://your-site.com/index.php?option=com_ajax&group=j2commerce&plugin=payment_sumup&format=raw&task=webhook
```

Replace `your-site.com` with your actual domain. The site must be publicly reachable over HTTPS — SumUp cannot send webhook notifications to a site running on localhost or a private network.

## Managing Payments from the Order Screen {#order-screen}

After an order is paid, you can take follow-up actions directly from the J2Commerce order detail page.

Go to **J2Commerce** -> **Sales** -> **Orders** -> click the order number to open it. The SumUp action buttons appear in the payment section.

### Cancel a Checkout

**Cancel Checkout** is available when the checkout has been created but the customer has not yet completed payment (the order is still pending). Cancelling deactivates the pending checkout so the customer can no longer complete it.

:::info

If the **Cancel Checkout** button is not visible, the payment has already been completed. Use **Issue Refund** in that case.

:::

### Issue a Refund {#refund}

You can refund a completed payment in full or in part.

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Click **Issue Refund**.
3. Choose **Full refund** to return the entire amount, or enter a smaller amount for a partial refund (up to the maximum refundable amount shown).
4. Click **Process Refund** to confirm.

The refund is submitted to SumUp. The customer's card is credited within a few business days depending on their bank.

If **Change Status on Refund** is enabled, the order status updates automatically after the refund is processed.

## Tips {#tips}

- **Enter credentials before enabling test orders** — the plugin shows a warning on the J2Commerce dashboard if the API key or merchant code is missing. Fill these in first to avoid confusing customers with an unavailable payment option.
- **Use a dedicated sandbox account for testing** — SumUp does not offer a test mode on live accounts. Request a sandbox merchant account from SumUp's developer program before testing.
- **Partial refunds are supported** — you can refund any amount up to the original order total. The maximum refundable amount is shown clearly in the refund dialog.
- **Saved cards persist between orders** — a customer who saves a card today can use it on any future order without entering their details again, as long as **Allow Saved Cards** remains enabled.
- **Geozones help limit card fees by region** — if SumUp is only available in certain countries, use the **Geozone Restriction** setting to hide it automatically for out-of-region shoppers.

## Troubleshooting {#troubleshooting}

### The payment form does not load at checkout {#card-form-not-loading}

**Cause:** The API key or merchant code is missing or incorrect, or the plugin is not enabled.

**Solution:**

1. Go to **J2Commerce** **-> Setup ->** **Payment Methods** and verify SumUp shows a green enabled indicator.
2. Open the plugin settings and confirm the **Live Secret API Key** and **Live Merchant Code** (or sandbox equivalents if Sandbox mode is on) are filled in.
3. Make sure you are using a `sup_sk_` format API key — SumUp public keys (used for browser SDKs) will not work for server-side requests.
4. Clear the Joomla cache: **System** -> **Clear Cache** -> **Delete All**.

### Orders are stuck in a pending status after payment {#stuck-pending}

**Cause:** SumUp webhook notifications are not being received, or the webhook URL is not registered.

**Solution:**

1. Confirm your webhook URL is registered in the SumUp Dashboard. The URL must be publicly reachable over HTTPS.
2. Make sure your site is not blocking incoming POST requests from SumUp's servers.
3. Enable **Debug Mode** in the plugin settings, attempt a test payment, then check **System** -> **Logs** for any errors.
4. Note that SumUp does not sign webhook notifications — the plugin re-fetches checkout status from the API. If your server cannot reach the SumUp API outbound, order status updates will not complete.

### The Refund button does not appear on the order {#refund-button-missing}

**Cause:** The order was not paid through SumUp, or no transaction data was recorded.

**Solution:**

1. Confirm the order's payment method is SumUp (visible in the payment section of the order detail view).
2. The refund button only appears when a SumUp transaction ID is stored on the order. If the checkout was abandoned before payment completed, no transaction data is saved.
3. Enable **Debug Mode** and re-test a full checkout to confirm transaction data is being stored correctly.

### Missing credentials warning on the J2Commerce dashboard {#missing-credentials}

**Cause:** The API Key or Merchant Code field is empty for the currently active environment (live or sandbox).

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** -> **SumUp Payment**.
2. Fill in the **Live Secret API Key** and **Live Merchant Code** (or the sandbox equivalents if Sandbox mode is on).
3. Click **Save** to apply the changes. The warning clears automatically once valid credentials are present.

### Refund fails with an error {#refund-fails}

**Cause:** The refund amount may exceed the original charge, or the transaction may not be in a refundable state.

**Solution:**

1. Confirm the refund amount does not exceed the maximum shown in the refund dialog.
2. Check that the original transaction was completed successfully — only paid orders can be refunded.
3. Enable **Debug Mode** and retry the refund, then review **System** -> **Logs** for the specific error returned by SumUp.
4. If the problem persists, contact SumUp support with the transaction ID from the order.

### Card declined at checkout {#card-declined}

**Cause:** The card details are incorrect, the card is not authorized for online transactions, or the issuing bank declined the charge.

**Solution:**

1. Ask the customer to double-check their card number, expiry date, and security code.
2. Ask them to try a different card or contact their bank.
3. In sandbox mode, verify you are using test card numbers provided by SumUp for your sandbox merchant account.
