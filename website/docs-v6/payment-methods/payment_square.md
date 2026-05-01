---
title: "Square Payment"
sidebar_label: "Square"
sidebar_position: 6
description: "Accept credit cards and digital wallets through Square's payment platform using embedded card forms or hosted checkout."
---

# Square Payment

The Square plugin lets your customers pay using credit and debit cards processed securely through Square's payment platform. Choose between two checkout experiences: **Embedded Card Form** (the card form loads directly on your checkout page) or **Hosted Checkout** (customers are redirected to a Square-hosted payment page). Both modes support refunds, webhooks for automatic order updates, and saved cards for returning customers.

## Prerequisites

- J2Commerce is installed and active on your Joomla site
- A Square account (see the setup steps below)
- API credentials from the Square Developer Dashboard: **Application ID**, **Access Token**, and **Location ID**

## Set Up a Square Account

If you already have a Square account and API credentials, skip ahead to [Purchase and Download](#purchase-and-download).

### Create a Square Account

1. Go to [squareup.com](https://squareup.com) and click **Sign Up**.
2. Enter your email address and create a password.
3. Complete the onboarding steps Square requires for your country.

Creating a Square account is free.

### Get Your API Credentials

After your account is active:

1. Log in to the [Square Developer Dashboard](https://developer.squareup.com/apps).
2. Click **New Application** (or open an existing application).
3. On the application's **Credentials** tab you will find your **Application ID** and **Access Token**.
4. To find your **Location ID**, go to the **Locations** tab.
5. Copy all three values and keep them somewhere safe — you will paste them into the plugin settings.

:::tip

**Use Sandbox Credentials for Testing:** The Square Developer Dashboard has a **Sandbox** tab alongside **Production** on the Credentials page. Use sandbox credentials while you are setting up — no real money is processed. Switch to production credentials only when you are ready to go live.

:::

## Purchase and Download

This plugin is a separate add-on available from the **J2Commerce Extensions Store**. It does not come with the core J2Commerce 6 component.

**Step 1:** Go to the [**J2Commerce**](https://www.j2commerce.com/) website **->** **Payment Plugins**

**Step 2:** Locate the **Payment\_Square** plugin **->** click **View Details** **->** **Add to Cart** **->** **Checkout**

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the plugin. Click **Available Versions -> View Files -> Download Now**

## Installing the Plugin

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the plugin ZIP file or use the Install from URL option.

![](/img/install.webp)

## Enable the Plugin

Once installed, you need to enable it. There are two ways to reach the payment methods list.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** in the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Payment Methods**

![](/img/square.webp)

Find **Square**, click the **X**, and it turns into a green checkmark. Square is now enabled and ready for configuration.

![](/img/square-enable2.webp)

## Configuring the Plugin

After enabling the plugin, click the **Square** title to open the settings.

:::tip

Click the **Toggle Inline Help** button at the top of the plugin settings page to display a description below every field.

:::

![](/img/square-toggle.webp)

### Display Settings tab

![](/img/square-config12.webp)

**Display Name:** The label shown to customers at checkout. Default is `Credit / Debit Card`.

**Display Image:** Optional logo shown next to the payment option at checkout. The plugin ships with the Square logo as its default image.

### Checkout & Capture Mode

![](/img/square-config2.webp)

:::info

View the **frontend** examples of both Embedded and Hosted options towards the bottom of this document.

:::

- **Checkout Mode:** Choose how the payment form is presented to customers.

  - **Embedded Card Form:** The Square card input loads directly on your J2Commerce checkout page. Customers never leave your site. This is the recommended option. The card form loads directly on your checkout page

  - **Hosted Checkout:** Customers are redirected to a Square-hosted payment page. After completing payment, Square redirects them back to your confirmation page.

- **Capture Method:** Choose when Square charges the customer's card.

  - **Automatic:** The card is charged immediately when the customer places the order. The order status updates to your configured paid status right away. Use this for most stores.

  - **Manual (Authorize Only):** The card is authorized but not charged. You must manually capture the payment from the J2Commerce order admin. Use this for backorders or when you need to verify stock before charging.

### Sandbox Mode

![](/img/square-config3.webp)

**Use Sandbox (Test Mode):** Switch **Yes** to use Square's sandbox environment. No real payments are processed.

Turn sandbox mode **on** while you are setting up and testing. Switch it **off** before going live.

:::info

When sandbox mode is active, a warning banner appears on the J2Commerce dashboard so you cannot accidentally forget.

:::

### Production API Credentials

These fields appear when **Use Sandbox (Test Mode)** is set to **No**.

**Application ID:** Your Square production Application ID from the Square Developer Dashboard.

**Access Token:** Your Square production Access Token. Keep this value secret — never share it publicly.

**Location ID:** Your Square production Location ID. Payments are associated with this location in your Square account.

**Webhook Signature Key:** The signature key generated by Square for your production webhook endpoint. This verifies that incoming webhook events are authentic (see [Webhooks](#webhooks) below).

**Webhook Endpoint URL:** A read-only display field showing the URL you need to register in the Square Developer Dashboard. Click **Copy** to copy it to your clipboard.

:::info

If your site is on a local development URL (localhost, .local, .test), the plugin shows a warning instead of the webhook URL. Webhooks require a publicly accessible server.

:::

### Sandbox API Credentials

These fields appear when **Use Sandbox (Test Mode)** is set to **Yes**.

**Sandbox Application ID:** Your Square sandbox Application ID.

**Sandbox Access Token:** Your Square sandbox Access Token.

**Sandbox Location ID:** Your Square sandbox Location ID.

**Sandbox Webhook Signature Key:** The signature key for your sandbox webhook endpoint.

### Saved Cards

![](/img/square-config10.webp)

**Allow Saved Cards:** When set to **Yes**, logged-in customers can save their card details with Square for faster checkout on future orders. The card is stored in Square's vault — J2Commerce never holds raw card numbers.

When this is enabled, a **Saved Cards** section appears at checkout for returning customers who have previously saved a card. They can select an existing card or enter a new one.

**Template Style:** Choose the frontend layout for the card form and saved card display. Available options depend on which template plugins are installed.

- **Bootstrap 5** — Use with Bootstrap 5 based Joomla templates (recommended for most sites).
- **UIkit** — Use if your Joomla template is UIkit-based (e.g., YOOtheme Pro).
- Leave blank to use the default layout.

### Order Status

![](/img/square-config13.webp)

**Order Status:** The order status is applied after a successful payment. Most stores choose **Confirmed** or **Processing** for paid orders.

### Refund Settings

**Change Order Status on Refund:** Set to **Yes** to automatically update the order status whenever a refund is processed via Square.

**Refund Order Status:** The order status to set when a full refund is processed (shown when Change Order Status on Refund is **Yes**). A common choice is Refunded or Cancelled.

### Void Settings

**Change Order Status on Void:** Set to **Yes** to automatically update the order status when an authorized payment is voided.

**Void Order Status:** The order status to set when a void is processed (shown when Change Order Status on Void is **Yes**).

### Surcharge

![](/img/square-config6a.webp)

Add an optional surcharge to orders paid via Square. This is useful if you want to pass on Square's processing fee to customers — check your local laws and Square's terms before doing this.

**Surcharge Name:** Label shown to customers for the surcharge (e.g., `Processing Fee`).

**Surcharge Percent:** Percentage of the order subtotal added as a surcharge.

**Surcharge Fixed:** Fixed amount added as a surcharge.

**Surcharge Tax Class:** Tax profile to apply to the surcharge amount.

You can combine a percentage and a fixed amount — both are added together.

### Geo-Zone Restriction & Subtotals

![](/img/square-config7.webp)

**Geo-Zone Restriction:** Limit Square availability to customers in a specific geo-zone. Leave empty to show Square to all customers regardless of location.

**Minimum Subtotal:** Hide Square if the cart subtotal is below this amount. Leave empty for no minimum.

**Maximum Subtotal:** Hide Square if the cart subtotal exceeds this amount. Leave empty for no maximum.

### Thank You Page & Custom Messages

![](/img/square-config8.webp)

**Thank You Article:** Select a Joomla article to display after a successful payment. This is shown on the confirmation page alongside the standard confirmation message.

### Custom Messages

These text fields let you customize messages shown to customers at different points in the payment process.

| Field                 | When It Appears                                          |
| --------------------- | -------------------------------------------------------- |
| **On Selection**      | When the customer selects Square as their payment method |
| **On Before Payment** | On the payment page before the customer clicks Pay       |
| **On After Payment**  | On the confirmation page after a successful payment      |
| **On Error Payment**  | When a payment error occurs                              |
| **On Cancel Payment** | When the customer cancels and returns to the cart        |

### Dashboard Icon

![](/img/square-config9.webp)

**Show Dashboard Icon:** When enabled, this plugin adds a tile to the J2Commerce dashboard and the quick icons module.

**Icon Label:** The label for the dashboard icon tile (shown when **Show Dashboard Icon** is **Yes**).

### Debug Mode

**Debug Mode:** Write detailed Square API activity to `administrator/logs/payment_square.php`.

:::tip

Enable debug mode only while troubleshooting. Disable it in production — logs can grow large and may contain transaction details.

:::

***

## Webhooks

Webhooks allow Square to notify your store automatically when payment events occur. Without webhooks, order status updates only happen during the active checkout flow — meaning server-to-server confirmations (such as delayed payment completions) would not reach your store.

### Register Your Webhook in Square

The plugin settings page displays a **Webhook Endpoint URL** — copy this URL, then follow these steps in the Square Developer Dashboard.

1. Log in to the [Square Developer Dashboard](https://developer.squareup.com/apps) and open your application.
2. Go to the **Webhooks** tab and click **Add Webhook**.
3. Paste the **Webhook Endpoint URL** from the J2Commerce plugin settings into the **URL** field.
4. Select the events to listen for. Recommended events:

| Square Event      | What Happens in J2Commerce                 |
| ----------------- | ------------------------------------------ |
| `payment.created` | New payment recorded                       |
| `payment.updated` | Order status updated on payment completion |
| `refund.created`  | Refund recorded                            |
| `refund.updated`  | Order status updated on refund completion  |

1. Click **Save** to create the webhook endpoint.
2. Square displays a **Signature Key** for the new endpoint. Click **Show** to reveal it.
3. Copy the signature key.
4. Paste it into the **Webhook Signature Key** field in the J2Commerce Square plugin settings.
5. Click **Save** in J2Commerce.

:::info

Sandbox and production each have separate webhook endpoints and signature keys. Configure them independently under the respective credential sections in the plugin settings.

:::

***

## Checkout Experience

![](/img/square-checkout.webp)

### Embedded Card Form

When **Checkout Mode** is set to **Embedded Card Form** and the customer selects Square at checkout:

1. The Square card input form loads directly on your J2Commerce checkout page.
2. The customer sees a secure card entry field (card number, expiry, CVV).
3. If **Allow Saved Cards** is enabled and the customer has previously saved a card, they see a list of saved cards and can select one or enter a new card.
4. The customer clicks **Place Order**.
5. Square tokenizes the card data in the browser — raw card details never touch your server.
6. The payment is processed and the customer is taken to the order confirmation page.

<!-- SCREENSHOT: Embedded card form at checkout showing the Square card input -->

### Hosted Checkout

When **Checkout Mode** is set to **Hosted Checkout**:

1. The customer selects Square at checkout and clicks **Place Order**.
2. A message — "Redirecting to Square for payment..." — appears briefly.
3. The customer is redirected to a Square-hosted payment page.
4. They complete payment on Square's secure servers.
5. Square redirects them back to your J2Commerce confirmation page.

<!-- SCREENSHOT: Square hosted checkout page on Square's domain -->

***

## Order History

Once a customer pays, J2Commerce records the transaction details on the order:

- **Order status** is updated to the status you configured (default: Confirmed).
- **Transaction ID** — the Square payment ID — is stored with the order.
- **Transaction status** — Completed, Authorized, or Partially Refunded — is tracked.
- **Order history** is updated with a payment note including the amount and transaction ID.

<!-- SCREENSHOT: J2Commerce order view showing transaction ID and payment history -->

### Capture Authorized Payments (Manual Capture)

If you set **Capture Method** to **Manual (Authorize Only)**, payments are authorized but not charged. To capture a payment:

1. Go to **J2Commerce -> Orders** and open the order.
2. Find the **Payment** section in the order view.
3. Click **Capture Payment** to charge the authorized amount.
4. The order status updates and the order history is updated with a capture note.

You can also click **Void Authorization** to cancel the authorization without charging the customer.

<!-- SCREENSHOT: Order admin view showing Capture Payment and Void Authorization buttons -->

### Refunds

Issue a refund directly from the order in J2Commerce:

1. Go to **J2Commerce -> Orders** and open the order.
2. Find the **Payment** section.
3. Click **Refund**.
4. Choose **Full refund** to refund the entire amount, or choose **Partial refund** and enter a specific amount.
5. Click **Process Refund**.

The refund is sent to Square via the API. If you enabled **Change Order Status on Refund**, the order status updates automatically.

<!-- SCREENSHOT: Refund modal in J2Commerce order admin showing full and partial refund options -->

### Charge a Saved Card

For orders placed by returning customers who have saved cards:

1. Go to **J2Commerce -> Orders** and open the order.
2. If the customer has saved Square cards, a **Charge Saved Card** section appears below the order summary.
3. Select a card from the dropdown.
4. Enter the amount to charge (defaults to the order total).
5. Click **Charge Now**.

This is useful for manual reorders, phone orders, or collecting payment for shipping adjustments.

<!-- SCREENSHOT: Charge Saved Card panel in the order admin view -->

### Webhook-Triggered Updates

If webhooks are configured, Square can update order statuses automatically:

| Square Event                  | What Happens in J2Commerce                                       |
| ----------------------------- | ---------------------------------------------------------------- |
| `payment.updated` (Completed) | Order status updated based on your Order Status setting          |
| `refund.updated` (Completed)  | Order status updated if Change Order Status on Refund is **Yes** |

### Payment Balance

The order view shows a **Payment Balance** summary when a refund has been processed:

- **Order Total** — the original order amount
- **Refunded** — the total refunded so far
- **Net Paid** — amount retained after refunds
- **Balance Due** — outstanding amount (shown in red if positive)

***

## Saved Cards (Customer Profile)

When **Allow Saved Cards** is enabled, customers can manage their saved cards from the frontend:

1. Log in to the frontend of your site.
2. Go to **My Account -> Payment Methods**.
3. View saved cards with their card type, last 4 digits, and expiry date.
4. Delete any cards they no longer want stored.
5. Set a card as the renewal default (used for subscription renewals).

<!-- SCREENSHOT: My Account -> Payment Methods page showing saved Square cards -->

:::info

Saved cards are only available when the customer checks out using the **Embedded Card Form** mode. The **Hosted Checkout** mode does not save cards to the customer's profile.

:::

***

## Going Live Checklist

Before accepting real payments, confirm the following:

- [ ] **Use Sandbox (Test Mode)** is set to **No**
- [ ] Your live **Application ID**, **Access Token**, and **Location ID** are entered
- [ ] The production **Webhook Endpoint URL** is registered in your Square Developer Dashboard
- [ ] The production **Webhook Signature Key** is saved in the plugin settings
- [ ] You have placed a test order using a real card with a small amount and then issued a refund
- [ ] **Debug Mode** is set to **No**

***

## Troubleshooting

### API credentials mismatch — payments not going through

**Cause:** The Application ID, Access Token, or Location ID are from the wrong environment (sandbox credentials entered in production or vice versa).

**Solution:**

1. Log in to the [Square Developer Dashboard](https://developer.squareup.com/apps) and open your application.
2. Check whether **Use Sandbox (Test Mode)** in J2Commerce matches the environment your credentials are from.
3. When Sandbox is **No**, use the **Production** credentials. When Sandbox is **Yes**, use the **Sandbox** credentials.
4. Enable **Debug Mode** and check `administrator/logs/payment_square.php` for the full API error.

### Payment succeeds but order stays Pending

**Cause:** Webhooks are not configured, so J2Commerce does not receive the payment confirmation from Square.

**Solution:**

1. Register the webhook URL in the Square Developer Dashboard (see [Webhooks](#webhooks) above).
2. Enter the **Webhook Signature Key** in the plugin settings.
3. Confirm the webhook endpoint shows a green status in the Square Developer Dashboard.

### Payment form does not appear at checkout

**Cause:** The Application ID or Location ID is missing, or the plugin is disabled.

**Solution:**

1. Go to **J2Commerce -> Setup -> Payment Methods** and confirm Square is enabled (green checkmark).
2. Check that **Application ID** and **Location ID** are filled in for the correct environment (sandbox or production).
3. Enable **Debug Mode** and check the browser console for JavaScript errors related to Square Web Payments SDK.

### Refund fails with an error

**Cause:** The transaction ID is missing from the order, or the payment has already been fully refunded.

**Solution:**

1. Open the order and verify that a **Transaction ID** is recorded in the Payment section.
2. If the Transaction ID is empty, the payment may not have completed correctly — check the debug log.
3. Log in to your Square Dashboard and verify the payment status there directly.

### Sandbox warning on the J2Commerce dashboard

**Cause:** **Use Sandbox (Test Mode)** is set to **Yes**.

**Solution:** If you are ready to go live, open the Square plugin settings and set **Use Sandbox (Test Mode)** to **No**, then enter your production credentials.

### Saved cards not showing at checkout

**Cause:** **Allow Saved Cards** is disabled, the customer is not logged in, or the customer has not previously checked out using the Embedded Card Form mode.

**Solution:**

1. Verify **Allow Saved Cards** is set to **Yes** in the plugin settings.
2. Confirm the customer is logged in — saved cards require an active login session.
3. Saved cards are only created during an embedded checkout. Customers who previously used Hosted Checkout will not have saved cards.

***

## Support

For help with the Square plugin:

- **J2Commerce documentation:** [docs.j2commerce.com](https://docs.j2commerce.com)
- **J2Commerce support:** [www.j2commerce.com/support](https://www.j2commerce.com/support)
- **Square Developer Dashboard:** [developer.squareup.com/apps](https://developer.squareup.com/apps)
- **Square developer documentation:** [developer.squareup.com/docs](https://developer.squareup.com/docs)
- **Square support:** [squareup.com/help](https://squareup.com/help)
