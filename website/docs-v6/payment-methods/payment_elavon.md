---
title: "Elavon Payment Gateway"
sidebar_label: "Elavon Payment"
sidebar_position: 45
description: "Accept credit and debit card payments through the Elavon Payment Gateway (EPG) with on-site Hosted Fields, saved cards, subscriptions, and admin-side refund and void tools."
---

# Elavon Payment Gateway

The Elavon Payment Gateway plugin connects your J2Commerce store to the **Elavon EPG** REST API so customers can pay by credit or debit card at checkout. Card entry happens through Elavon's **Hosted Fields** iframe — the card number, expiry, and CVV are typed directly into Elavon-hosted input fields embedded on your checkout page. Card data never travels through your web server, which qualifies your store for **PCI SAQ-A** — the simplest and least burdensome compliance level.

The plugin also supports on-site **Hosted Checkout** (a redirect to Elavon's secure page), saved cards for one-click return purchases, automatic subscription renewals, and full admin tools to capture, void, and refund orders from within J2Commerce.

:::info Add-on required

The Elavon Payment Gateway plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

:::

## Who This Is For

This plugin is for merchants who:

- Process card payments through an **Elavon EPG** merchant account
- Want on-site card entry without redirecting customers away from their store
- Need **saved cards** for returning customers or subscription billing
- Sell subscription or recurring products and need automatic renewal charging
- Want to issue refunds and voids directly from the J2Commerce order screen

## What You Get

| Feature | Details |
|---------|---------|
| Card entry | Hosted Fields iframe — card data never touches your server (PCI SAQ-A) |
| Hosted Checkout | Optional redirect to Elavon's fully hosted payment page |
| Payment actions | Sale (charge immediately) or Authorize only (capture later) |
| Saved cards | Customers can save cards for one-click checkout and subscription renewals |
| Subscriptions | Automatic Card-on-File renewal charging for subscription products |
| Admin refund | Full or partial refund issued directly from the order screen |
| Admin void | Cancel an authorized-only transaction before it settles |
| Admin charge | Charge a customer's saved card directly from the admin order screen |
| Sandbox mode | Test with Elavon sandbox credentials before going live |

## Requirements

- PHP 8.3 or later
- Joomla 6.x
- J2Commerce 6.x
- An active Elavon EPG merchant account
- HTTPS enabled on your store (required for Hosted Fields to load)
- Your server must be able to make outbound HTTPS connections to `api.elavonpayments.com` (live) or `api.sandbox.elavonpayments.com` (sandbox)

## Getting Your Elavon EPG Credentials

You need three credentials from your Elavon EPG merchant account: a **Merchant Alias**, a **Public Key**, and a **Secret Key**. Log in to your Elavon EPG dashboard or contact your Elavon account manager to obtain them.

| Credential | Where to find it | Used for |
|------------|-----------------|----------|
| **Merchant Alias** | Your EPG account name / merchant alias | API authentication (HTTP Basic username) |
| **Public Key** (starts with `pk_`) | EPG dashboard under API Keys | Browser-side Hosted Fields script to identify your account |
| **Secret Key** (starts with `sk_`) | EPG dashboard under API Keys | Server-side API calls — keep this private |

Elavon provides a separate set of sandbox credentials for testing. You can use sandbox and live credentials independently — the plugin stores both sets and switches based on the **Sandbox Mode** toggle.

:::tip

Keep your **Secret Key** confidential. It is never shown to customers and should never appear in browser-visible HTML or JavaScript.

:::

## Installation

1. Purchase and download the `payment_elavon.zip` package from the [J2Commerce Extensions Store](https://www.j2commerce.com).
2. In your Joomla admin, go to **System** -> **Install** -> **Extensions**.
3. Upload the `payment_elavon.zip` file using the drag-and-drop area or the **Browse for file** button.
4. The plugin installs and enables itself automatically.

<!-- SCREENSHOT: Joomla Extensions install screen with payment_elavon.zip uploaded successfully -->

After installation, go to **J2Commerce** -> **Payments** -> **Payment Methods** to confirm the plugin appears in the list. If it shows as disabled, click the toggle in the **Enabled** column to enable it.

<!-- SCREENSHOT: J2Commerce Payment Methods list showing the Elavon Payment row with the enabled toggle highlighted -->

## Configure the Plugin

Click the **Elavon Payment** row in the Payment Methods list to open the plugin settings. You can also go to **System** -> **Manage** -> **Plugins**, search for "Elavon", and click to edit.

:::tip

Click the **Toggle Inline Help** button in the toolbar and each field will display a description below it as you configure the plugin.

:::

<!-- SCREENSHOT: Elavon Payment plugin settings page showing all configuration sections -->

### Display Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Payment Method Title** | The name shown to customers at checkout, for example "Credit / Debit Card". | `Credit / Debit Card` |
| **Payment Method Image** | Optional logo or card-brand icons displayed alongside the payment method title at checkout. | *(empty)* |

### Integration Mode

| Field | Description | Default |
|-------|-------------|---------|
| **Integration Mode** | **Iframe (On-Site)** embeds Elavon Hosted Fields directly on your checkout page — customers never leave your store. **Hosted Checkout (Off-Site)** redirects customers to Elavon's fully hosted payment page. Use Iframe mode if you need saved cards or subscriptions. | `Iframe (On-Site)` |

### Payment Action

| Field | Description | Default |
|-------|-------------|---------|
| **Payment Action** | **Sale** charges the customer's card immediately when the order is placed. **Authorize Only** places a hold on the funds without capturing them — you then capture manually from the admin order screen. Choose Sale for most stores. | `Sale (Capture Immediately)` |

### Sandbox Mode

| Field | Description | Default |
|-------|-------------|---------|
| **Sandbox Mode** | Toggle to **Yes** to use Elavon sandbox credentials and connect to the test environment. No real payments will be processed. A warning banner appears on your J2Commerce dashboard while sandbox is active. | `Yes` |

When **Sandbox Mode** is **Yes**, the live credential fields are hidden and sandbox credential fields appear instead.

### Live Credentials (shown when Sandbox is Off)

| Field | Description |
|-------|-------------|
| **Merchant Alias** | Your EPG merchant alias — the username for Elavon API calls. |
| **Public Key (pk_...)** | Your client-side public key starting with `pk_`. Used by the browser Hosted Fields script. |
| **Secret Key (sk_...)** | Your server-side secret key starting with `sk_`. This field is masked. |
| **Webhook Secret** | The secret used to verify incoming Elavon webhook notifications. |
| **Webhook URL** | Read-only. Copy this URL and register it in your Elavon EPG dashboard under Webhooks. |

### Sandbox Credentials (shown when Sandbox is On)

| Field | Description |
|-------|-------------|
| **Sandbox Merchant Alias** | Your sandbox EPG merchant alias for testing. |
| **Sandbox Public Key (pk_...)** | Your sandbox client-side public key. |
| **Sandbox Secret Key (sk_...)** | Your sandbox server-side secret key. This field is masked. |
| **Sandbox Webhook Secret** | Webhook secret for sandbox testing. |
| **Webhook URL** | Read-only. Copy this URL for sandbox webhook configuration. |

### Saved Cards

| Field | Description | Default |
|-------|-------------|---------|
| **Allow Saved Cards** | Let logged-in customers save their card after checkout for faster future payments and automatic subscription renewals. Card data is stored as a secure token by Elavon — no card numbers are held on your server. | `Yes` |

### Template

| Field | Description | Default |
|-------|-------------|---------|
| **Template** | Select the front-end template style for the payment form — choose the one that matches your site's theme. Options include Bootstrap 5 and UIkit. | *(auto-detected)* |

### Order Status Settings

:::info

If the status you want is not listed, you can create a new one at **J2Commerce** -> **Setup** -> **Order Statuses**.

:::

| Field | Description | Default |
|-------|-------------|---------|
| **Paid Order Status** | Status applied when a payment is successfully completed. | Confirmed (ID 1) |
| **Authorized Order Status** | Status applied when a payment is authorized but not yet captured. Only shown when Payment Action is set to Authorize Only. | Pending (ID 2) |
| **Change Status on Refund** | When enabled, issuing a refund from the order screen also updates the order status. | `No` |
| **Refunded Order Status** | The status to apply when a refund succeeds. Only shown when the above is enabled. | *(empty)* |
| **Change Status on Void** | When enabled, voiding an authorization from the order screen also updates the order status. | `No` |
| **Voided Order Status** | The status to apply when a void succeeds. Only shown when the above is enabled. | *(empty)* |

### Surcharge (Optional)

Add an automatic surcharge when customers choose to pay by card. Leave all fields empty to disable surcharging.

| Field | Description |
|-------|-------------|
| **Surcharge Label** | Text shown on the order summary for the surcharge line, for example "Card Processing Fee". |
| **Surcharge (%)** | Percentage of the order total to add, for example `2.5` for 2.5%. |
| **Surcharge (fixed)** | Fixed amount to add in your store currency, for example `0.30`. |
| **Surcharge Tax Class** | Tax profile applied to the surcharge, or leave as "Not Taxable". |

### Availability Restrictions (Optional)

Limit when the payment method appears at checkout.

| Field | Description | Default |
|-------|-------------|---------|
| **Geo Zone** | Show this payment option only to customers in the selected geo zone. Leave blank to allow all locations. | *(all zones)* |
| **Minimum Order Subtotal** | Hide this option if the order subtotal is below this amount. Leave blank for no minimum. | *(none)* |
| **Maximum Order Subtotal** | Hide this option if the order subtotal exceeds this amount. Leave blank for no maximum. | *(none)* |

### Lifecycle Messages (Optional)

These fields accept plain text shown at specific points during the checkout process.

| Field | When Shown |
|-------|-----------|
| **Before Payment Text** | Above the payment form when a customer selects this payment method. |
| **After Payment Text** | On the order confirmation page after a successful payment. |
| **Payment Error Text** | When a payment fails or is declined. |
| **Cancelled Payment Text** | When the customer cancels the Hosted Checkout redirect. |

### Confirmation Article (Optional)

| Field | Description |
|-------|-------------|
| **Confirmation Article** | Select a Joomla article to display on the payment confirmation page. Useful for displaying return policies or thank-you messages. |

### Debug

| Field | Description | Default |
|-------|-------------|---------|
| **Debug Logging** | Write detailed API request and response logs to the J2Commerce log file. Disable in production — enable only when troubleshooting. | `No` |

## Testing in Sandbox Mode

Before taking real payments, run a complete test checkout in Elavon's sandbox environment.

### Step 1: Enable Sandbox

1. Open the plugin settings.
2. Set **Sandbox Mode** to **Yes**.
3. Enter your sandbox **Merchant Alias**, **Sandbox Public Key**, and **Sandbox Secret Key** in the sandbox credential fields.
4. Click **Save**.

A warning banner appears on your J2Commerce dashboard confirming the store is in test mode.

<!-- SCREENSHOT: J2Commerce dashboard showing the orange sandbox warning banner for Elavon -->

### Step 2: Complete a Test Purchase

1. Open your store's frontend, add a product to the cart, and proceed through checkout.
2. Select **Credit / Debit Card** (or your configured display name) as the payment method.
3. The Hosted Fields iframe loads inside your checkout page. Enter test card details supplied by Elavon for your sandbox account.
4. Click **Place Order**. The plugin submits the card token to the EPG sandbox and finalizes the order.
5. Confirm the order appears in **J2Commerce** -> **Sales** -> **Orders** with the correct status.

<!-- SCREENSHOT: Checkout page showing the Elavon Hosted Fields iframe with card entry fields -->

### Step 3: Test Saved Cards

1. Log in to a customer account on your store.
2. Complete a test purchase and tick **Save this card for faster checkout next time** when the option appears.
3. Start a second order and confirm your saved card appears as a payment option.
4. Complete the purchase using the saved card — no card re-entry should be required.

### Step 4: Go Live

When everything works as expected, switch to live mode.

1. Open the plugin settings.
2. Set **Sandbox Mode** to **No**.
3. Enter your live **Merchant Alias**, **Public Key**, and **Secret Key** in the live credential fields.
4. Set **Debug Logging** to **No**.
5. Click **Save**.

The sandbox warning banner disappears. Your store now processes real card payments.

:::caution

Always test thoroughly in sandbox mode before switching to live. Real card charges must be refunded manually if a test charge accidentally goes through in production.

:::

## Saved Cards and Subscriptions

### How Customers Save a Card

When **Allow Saved Cards** is set to **Yes** and a logged-in customer completes a payment, a **Save this card for faster checkout next time** checkbox appears in the payment form. If the customer ticks it:

- Elavon returns a secure card token after the transaction.
- The token (not the card number) is stored against the customer's J2Commerce account.
- On future checkouts, the saved card appears as a selectable option — no card details need to be re-entered.

Customers can manage their saved cards from **My Account** -> **Payment Methods** on the store frontend.

<!-- SCREENSHOT: J2Commerce My Account payment methods screen showing a saved Elavon card with Remove and Set as Default buttons -->

### Subscription Renewals

If you sell subscription products using the J2Commerce Subscriptions add-on, the Elavon plugin handles automatic renewals using the customer's saved card. When a renewal date arrives:

1. J2Commerce creates a renewal order.
2. The plugin charges the stored card automatically using Elavon's Card-on-File (COF) mechanism — no customer action is required.
3. A note is added to the order history recording the charge ID and amount.

If a renewal fails (for example, because the card expired or was declined), the subscription is marked as overdue. The customer should log in and update their saved card.

:::info

Saved cards are required for subscription renewals. If a customer has no saved card on file when a renewal runs, the renewal is skipped and the order is flagged. Enable **Allow Saved Cards** and confirm subscriptions start with Iframe mode, not Hosted Checkout.

:::

## Admin Order Tools

The following actions are available directly from the J2Commerce admin order screen — no need to log in to the Elavon EPG dashboard for routine operations.

### Capture an Authorized Payment

When **Payment Action** is set to **Authorize Only**, funds are held but not yet charged. To capture (settle) the payment:

1. Go to **J2Commerce** -> **Sales** -> **Orders** and open the order.
2. Click **Capture Payment** in the payment section of the order.
3. Confirm the prompt. The plugin sends a capture request to the EPG and updates the transaction status.

<!-- SCREENSHOT: J2Commerce admin order screen showing the Capture Payment, Void Authorization, and Refund buttons -->

### Void an Authorization

To release a held authorization before it settles (the order total is never charged):

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Click **Void Authorization**.
3. Confirm the prompt. The EPG releases the hold on the customer's card.

:::info

Void is only available while the transaction status is **Authorized** (not yet captured or settled). Once captured, use Refund instead.

:::

### Issue a Refund

To refund a completed or partially refunded transaction:

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Click **Refund** in the payment section.
3. In the refund modal, choose a **Full refund** or enter a lower **Partial refund** amount.
4. Click **Process Refund**.

The plugin sends a refund request to the EPG and records the charge ID and amount in the order history. If **Change Status on Refund** is enabled, the order status updates automatically.

<!-- SCREENSHOT: Elavon refund modal showing full and partial refund options with the Process Refund button -->

### Charge a Saved Card from Admin

If a customer has a saved card on file, you can charge it directly from the admin order screen — useful for phone orders or manual retries.

1. Open the order in **J2Commerce** -> **Sales** -> **Orders**.
2. Scroll to the **Charge Saved Card** section in the order summary.
3. Select the card from the dropdown.
4. Confirm or adjust the suggested amount.
5. Click **Charge Now**.

The plugin charges the card via the EPG and adds a note to the order history.

<!-- SCREENSHOT: Admin order screen showing the Charge Saved Card section with a card selector and Charge Now button -->

### Payment Balance Panel

The payment section of every Elavon order shows a summary:

| Field | What it shows |
|-------|--------------|
| **Order Total** | The full amount charged or authorized |
| **Refunded** | Total amount refunded so far |
| **Net Paid** | Order Total minus Refunded |
| **Balance Due** | Any outstanding amount not yet paid |

## Tips

- **Use Iframe mode for subscriptions.** Hosted Checkout redirect mode does not support the card-on-file flow required for subscription renewals. Always use Iframe mode when selling subscription products.
- **Enable sandbox before entering live credentials.** Configure and test everything in sandbox first, then switch the toggle and enter your live keys in one step.
- **Set a sensible Paid Order Status.** Choose a status like "Confirmed" or "Processing" that clearly indicates to your fulfillment team that payment was successful.
- **Surcharge carefully.** Check your local laws and your Elavon merchant agreement before enabling surcharging — not all regions or card types allow it.
- **Disable Debug Logging in production.** Debug mode writes verbose API logs that can expose request details. Turn it off once you have finished troubleshooting.

## Troubleshooting

### Sandbox warning does not disappear after saving live credentials

**Cause:** The **Sandbox Mode** toggle is still set to **Yes**.

**Solution:** Open the plugin settings, set **Sandbox Mode** to **No**, confirm your live credentials are filled in, and click **Save**.

### "Elavon API credentials are not configured" warning on the dashboard

**Cause:** The Public Key or Secret Key field is empty for the active mode (sandbox or live).

**Solution:** Open the plugin settings. If **Sandbox Mode** is **No**, fill in the **Merchant Alias**, **Public Key**, and **Secret Key** in the live credentials section. If **Sandbox Mode** is **Yes**, fill in the sandbox credential fields. Click **Save**.

### The card entry form does not appear at checkout

**Cause:** HTTPS is not enabled, or the Hosted Fields script could not load.

**Solution:**

1. Confirm your site is served over HTTPS — the Hosted Fields iframe will not load on HTTP pages.
2. Check your browser console (F12 -> Console) for JavaScript errors.
3. Confirm the plugin is enabled in **J2Commerce** -> **Payments** -> **Payment Methods**.
4. If you are using Hosted Checkout mode and the redirect does not start, check that your public and secret keys are correct.

### Payment is declined with no error message

**Cause:** The card was declined by Elavon's authorization network.

**Solution:** Ask the customer to check their card details and try again, or try a different card. In sandbox mode, confirm you are using a valid test card number provided by Elavon — not a real card number.

### "Could not communicate with the payment gateway"

**Cause:** The plugin could not reach the EPG API, or the credentials are incorrect.

**Solution:**

1. Double-check the Merchant Alias, Public Key, and Secret Key. Even one incorrect character causes this error.
2. Confirm your server can make outbound HTTPS requests to `api.elavonpayments.com` (live) or `api.sandbox.elavonpayments.com` (sandbox).
3. Enable **Debug Logging** in the plugin settings, attempt a payment, then check **System** -> **System Log** for the full EPG response.
4. Disable **Debug Logging** once the problem is resolved.

### Saved card is not appearing at checkout

**Cause:** The customer is not logged in, or saved cards are disabled.

**Solution:**

1. Confirm **Allow Saved Cards** is set to **Yes** in the plugin settings.
2. Confirm the customer is logged in to a Joomla account — guest checkouts cannot save or retrieve cards.
3. Confirm **Integration Mode** is set to **Iframe (On-Site)** — Hosted Checkout mode does not support the saved-card flow.

### Subscription renewal did not run

**Cause:** No saved card on file for the subscription customer, or the Subscriptions add-on is not installed.

**Solution:**

1. Confirm the J2Commerce Subscriptions add-on is installed and enabled.
2. Open the subscription in **J2Commerce** -> **Sales** -> **Subscriptions** and check whether a saved card is associated with the customer.
3. If the card is missing, ask the customer to log in and add a card via **My Account** -> **Payment Methods**, or charge the renewal manually using the **Charge Saved Card** tool on the order screen.

### Webhook not receiving events

**Cause:** The webhook URL is not registered in the Elavon EPG dashboard, or the site is not publicly accessible.

**Solution:**

1. Open the plugin settings and copy the **Webhook URL** from the live (or sandbox) section.
2. Log in to your Elavon EPG dashboard and register that URL under Webhooks.
3. Ensure your site is accessible from the internet — Elavon cannot deliver webhooks to a local development server.
4. Enter the **Webhook Secret** from the EPG dashboard into the matching field in the plugin settings and click **Save**.

## Related Topics

- [Payment Methods](../payment-methods/index.md)
- [Order Statuses](../../setup/order-statuses.md)
- [Subscriptions](../../apps-and-extensions/apps/subscriptions.md)
- [Geo Zones](../../setup/geo-zones.md)
