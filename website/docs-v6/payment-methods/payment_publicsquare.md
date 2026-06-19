# PublicSquare Payment

The PublicSquare Payment plugin connects your J2Commerce store to the **PublicSquare** card-processing platform so customers can pay by credit or debit card directly on your checkout page. Card entry fields are powered by a secure, hosted SDK — your server never handles raw card numbers, which qualifies your store for the simplest level of PCI security compliance (SAQ-A). From the J2Commerce order screen you can capture authorized payments, void them, or issue full and partial refunds without leaving your admin panel.

## Requirements

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.3 or later
- A PublicSquare merchant account
- Your store must be accessible over HTTPS

## Get Your PublicSquare Credentials

Before configuring the plugin you need API keys from the PublicSquare dashboard.

1. Log in to your PublicSquare merchant dashboard.
2. Locate your API credentials section and note two values for each environment:

   - **Secret Key** — used by your server to authorize API calls. Keep this private.
   - **Publishable Key** — used by the card form in the customer's browser. This is safe to expose publicly.
3. PublicSquare provides separate **Test** and **Live** key pairs. Collect both sets so you can test safely before going live.

Keep this browser tab open while you configure the plugin in Joomla.

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **PublicSquare Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Installing the Plugin

You can install this **PublicSquare Payment** plugin using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**&#x20;

Upload the `payment_publicsquare.zip` file or use the Install from URL option.

![](/img/autho-install5.webp)

## Enable the Plugin&#x20;

Once you have installed the extension, you will need to enable it. There are **two** ways you can access the extension.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Payment Methods**

![](/img/autho-methods.webp)

Look for **PublicSquare Payment**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/publicsquare-enable.webp)

## Configure the Plugin

Click the **PublicSquare Payment** title to open its settings.

:::tip

Click the **Toggle Inline Help** button at the top of any plugin settings screen to show a description below each field.

:::

![](/img/publicsquare-toggle.webp)

### Appearance

![](/img/publicsquare-display.webp)

**Payment Method Name:** The label shown to customers on the checkout page (e.g., "Credit/Debit Card"). Defaults to "PublicSquare".

**Display Image:** Optional logo or card-brand image displayed beside the payment method name at checkout.

### Credentials

![](/img/publicsquare-api.webp)

**Test Mode:** When set to **Yes**, all transactions go to the PublicSquare test environment — no real money moves.

Enable this during setup and testing. Switch it to **No** when you are ready to accept live payments. While test mode is active, a warning banner appears on the J2Commerce dashboard to remind you.

The credential fields shown depend on whether **Test Mode** is enabled.

- **When Test Mode is ON:**

**Secret Key (Test):** Your PublicSquare test secret API key

**Publishable Key (Test):** Your PublicSquare test publishable key

- **When Test Mode is OFF (live):**

**Secret Key (Live):** Your PublicSquare live secret API key

**Publishable Key (Live):** Your PublicSquare live publishable key

### Webhooks

PublicSquare sends real-time notifications to your store when payment events occur — such as a payment succeeding, being authorized, canceled, or failing. The plugin verifies each notification using an RSA signature so only genuine PublicSquare events are processed.

**Webhook RSA Public Key:** The Base64-encoded RSA public key provided by PublicSquare when you register a webhook endpoint in their dashboard. Paste the entire key value here. The plugin uses this key to verify that incoming webhook notifications are authentic.

**Webhook URL:** The plugin displays your store's webhook URL in the settings screen. Copy this URL and register it in your PublicSquare dashboard as the webhook endpoint.

:::info

If your site runs on a local server (localhost), the webhook URL field shows a warning instead of a URL. Webhooks require a publicly reachable HTTPS URL. Deploy to a live server before registering the webhook.

:::

The webhook URL format is:

```
https://your-site.com/index.php?option=com_ajax&group=j2commerce&plugin=payment_publicsquare&format=raw&task=webhook
```

Replace `your-site.com` with your actual domain.

### Capture Method

![](/img/publicsquare-capture-cc.webp)

**Capture Method:** Controls whether funds are collected immediately or held for manual capture.

- **Automatic** — funds are collected from the customer's card as soon as the order is placed. This is the recommended setting for most stores.
- **Manual (authorize only)** — the funds are reserved on the customer's card but not collected yet. You then capture (settle) the payment from the order admin when you are ready to ship. This is useful when you want to confirm stock or fulfillment details before taking money.

**Allow Saved Cards:** Let logged-in customers save their card for faster checkout next time.

When enabled, customers see a checkbox at checkout to save their card. On future visits they can select a saved card instead of re-entering their details. Saved cards also power automatic subscription renewals if you have the Subscriptions add-on installed.

**Template Style:** Choose between **Bootstrap 5** and **UIkit** layout for the checkout card form — match this to your site's front-end template.

### Order Statuses

![](/img/publicsquare-status.webp)

**Completed Order Status:** Status applied when payment succeeds

**Authorized Order Status:** Status applied when payment is authorized but not yet captured (Manual capture mode only)

**Failed Order Status:** Status applied when payment fails

**Canceled Order Status:** Status applied when a payment is canceled

**Refunded Order Status:** Status applied after a refund is issued

:::info

If the status you want is not listed in a dropdown, you can create a new one by going to **J2Commerce** -> **Setup** -> **Order Statuses**.

:::

![](/img/shipstation-order-status2-1.webp)

### GeoZone Availability Restrictions

![](/img/publicsquare-geozone.webp)

**Geozone Restriction:** Limit PublicSquare to customers in a specific geozone. Leave blank to allow all locations.

**Minimum Order Subtotal:** Hide PublicSquare as a payment option when the cart subtotal is below this amount. Leave blank for no minimum.

**Maximum Order Subtotal:** Hide PublicSquare when the cart subtotal is above this amount. Leave blank for no maximum.

### Custom Messages

![](/img/publicsquare-messages.webp)

**Thank-You Article:** Optional Joomla article to display on the order confirmation page after a successful payment.

**Before Payment Text:** HTML or text displayed just above the card form, before the customer enters card details.

**After Payment Text:** HTML or text displayed on the confirmation page after a successful payment.

### Dashboard Icon

![](/img/publicsquare-icon.webp)

**Show Dashboard Icon:** Add a quick-access icon for this plugin to the J2Commerce dashboard.

- **Icon Label:** Label for the icon. Defaults to "PublicSquare Payment" if left blank. Only shown when **Show Dashboard Icon** is enabled.

### Debug Mode

**Debug Mode:** Record detailed API request and response data in the Joomla log.

Only enable this when diagnosing a specific problem. Disable it on live sites — debug logs can contain sensitive payment data.

## How Checkout Works for Customers

1. The customer adds items to the cart and proceeds to checkout.
2. On the payment step, the PublicSquare card form loads directly on the page — card fields appear inside a secure form supplied by PublicSquare's SDK. Card data never touches your server.
3. If the customer is logged in and you have **Allow Saved Cards** enabled, they see any previously saved cards and can select one, or choose to enter a new card.
4. If saving is allowed, a checkbox lets them save the new card for future orders.
5. The customer clicks **Place Order**.
6. On success, the customer sees the order confirmation page.

## Managing Payments from the Order Screen

After an order is paid, you can take follow-up actions directly from the J2Commerce order detail page.

Go to **J2Commerce** -> **Sales** -> **Orders** -> click the order number to open it. The PublicSquare action buttons appear in the payment section.

### Capture a Payment (Manual Capture mode only)

If you set **Capture Method** to **Manual**, payments are authorized but not collected. When you are ready to collect the funds:

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Click **Capture Payment** and confirm the prompt.
3. The funds are collected from the customer's card and the order status updates automatically.

:::info

The **Capture Payment** button only appears when the payment is in an authorized state awaiting capture. Once captured, use **Refund** if you need to return funds.

:::

### Cancel a Payment

A cancellation voids an authorized payment before it has been captured. Once a payment has been captured, use **Refund** instead.

1. Open the order.
2. Click **Cancel Payment** and confirm the prompt.
3. The authorization is released — the customer is not charged and the hold on their card is removed.

:::info

If the **Cancel Payment** button is not visible, the payment is not in a cancelable state. If funds have already been collected, use **Refund** instead.

:::

### Issue a Refund

You can refund a captured payment in full or in part.

1. Open the order.
2. Click **Refund**.
3. Choose **Full refund** to return the entire captured amount, or enter a smaller amount for a partial refund.
4. Click **Process Refund** to confirm.

The refund is sent to the customer's original card. The order status updates to the **Refunded Order Status** you configured.

## Saved Cards for Shoppers

When **Allow Saved Cards** is enabled, logged-in customers can:

- Save a new card during checkout by checking the **Save this card for future purchases** checkbox.
- Select a previously saved card on return visits instead of entering card details again.
- Remove a saved card from their account.

Saved cards are stored securely in J2Commerce using a tokenized reference — your store never holds raw card data.

## Testing Payments

Always test in test mode before going live.

1. Enable **Test Mode** in the plugin settings and enter your PublicSquare test credentials.
2. Place a test order on your storefront using PublicSquare test card details (available in your PublicSquare developer documentation).
3. Check that the order appears in **J2Commerce** -> **Sales** -> **Orders** with the correct status.
4. If you use **Manual** capture mode, test the **Capture Payment** button from the order screen.
5. Test a refund from the order screen to confirm it processes without errors.
6. Check your Joomla log (**System** -> **Logs**) for any errors — enable **Debug Mode** temporarily if needed.
7. When everything is working, set **Test Mode** to **No** and replace the test credentials with your live credentials.

:::warning
Remember to turn off **Test Mode** before accepting real orders. A warning banner on the J2Commerce dashboard will remind you if test mode is still active.
:::

## Troubleshooting

### The card form does not appear at checkout

**Cause:** The plugin is disabled, credentials are missing, or the PublicSquare SDK failed to load.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** and verify PublicSquare Payment shows a green enabled indicator.
2. Open the plugin settings and confirm both credential fields (**Secret Key** and **Publishable Key**) are filled in for the active environment (test or live).
3. Check your browser's developer console for any JavaScript errors or failed network requests.
4. Clear the Joomla cache: **System** -> **Clear Cache** -> **Delete All**.

### Orders are stuck in a pending status after payment

**Cause:** PublicSquare webhooks are not being received or the **Webhook RSA Public Key** is incorrect.

**Solution:**

1. Confirm your webhook URL is registered in the PublicSquare dashboard and points to your store's public HTTPS URL.
2. Open the plugin settings and verify the **Webhook RSA Public Key** matches the key provided by PublicSquare exactly.
3. Make sure your store is publicly reachable over HTTPS. Webhooks cannot reach a local or staging site that is behind a firewall or password protection.
4. Enable **Debug Mode**, attempt a test payment, then check **System** -> **Logs** for any webhook-related errors.

### The Capture / Cancel / Refund buttons do not appear on the order

**Cause:** The order was not paid through PublicSquare, or no transaction data was recorded because checkout was interrupted.

**Solution:**

1. Confirm the order's payment method is PublicSquare (visible in the payment section of the order detail view).
2. The buttons only appear when a payment intent or payment ID is stored on the order. If checkout was abandoned before completion, no data is saved.
3. Enable **Debug Mode** and re-test a full checkout to confirm transaction data is stored correctly.

### Missing credentials warning on the J2Commerce dashboard

**Cause:** The **Secret Key** field is empty for the active environment.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** -> **PublicSquare Payment**.
2. Check whether **Test Mode** is on or off, then fill in the matching **Secret Key** field.
3. Click **Save** to apply the changes.

### Card declined errors

**Cause:** The card details are incorrect, the card is blocked for online transactions, or the bank declined the charge.

**Solution:**

1. Ask the customer to double-check their card number, expiry date, and cardholder name.
2. Ask them to try a different card or contact their bank.
3. In test mode, confirm you are using a valid PublicSquare test card number from their developer documentation.
