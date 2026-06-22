---
title: "Braintree Payments"
sidebar_label: "Braintree Payments"
sidebar_position: 105
description: "Accept credit and debit cards securely at checkout with the Braintree (a PayPal service) payment gateway for J2Commerce — with saved cards, authorize-or-capture modes, and capture, void, and refund from the order screen."
---

# Braintree Payments

The Braintree Payments method lets your store accept credit and debit cards through Braintree, a payment gateway owned by PayPal. Card details are entered in a secure form that sends the card straight to Braintree, so the raw card number never touches your website.

Shoppers can pay with a new card or a card they saved earlier, and you can capture, void, or refund each order right from the J2Commerce order screen.

## Requirements

- PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- A Braintree merchant account (free to create at [braintree.com](https://www.braintreepayments.com/))

## Purchase and Download

This payment method is a separate add-on available from the [J2Commerce website](https://www.j2commerce.com/). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [**J2Commerce** website](https://www.j2commerce.com/) **->** **Payments**.

**Step 2:** Locate the **Braintree** payment method **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to **My Downloads** under your profile button in the top-right corner and search for the add-on. Click **Available Versions -> View Files -> Download Now**.

## Install the Payment Method

You can install Braintree Payments using the Joomla installer.

In the Joomla admin, go to **System -> Install -> Extensions**.

Upload the plugin ZIP file, or use the **Install from URL** option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

The payment method installs and enables automatically.

## Enable the Payment Method

Once installed, make sure the method is enabled. There are **two** ways to reach it:

**Option A:** Go to the **J2Commerce** icon in the top-right corner **-> Payments -> Payment Methods**.

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Payments -> Payment Methods**.

<!-- SCREENSHOT: J2Commerce -> Payments -> Payment Methods list showing Braintree -->

Find **Braintree**, click the **X** next to it, and it will turn into a green checkmark. The method is now enabled and ready for setup.

## Configure the Payment Method

Click the **Braintree** title next to the green checkmark to open its settings.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the plugin will show a description below each field as you configure it.

:::

<!-- SCREENSHOT: Braintree plugin configuration screen, Basic tab -->

### Get Your Braintree Keys

Before you can take payments, you need three values from your Braintree account. To find them, log in to your Braintree Control Panel and go to **Settings -> API Keys**. You will need:

- **Merchant ID**
- **Public Key**
- **Private Key**

:::info

NOTE: Braintree gives you a separate **Sandbox** account for testing and a **Production** account for real payments. Each has its own set of keys. Sandbox keys come from [sandbox.braintreegateway.com](https://sandbox.braintreegateway.com/); production keys come from your live Braintree login.

:::

### Test (Sandbox) Mode

| Setting | Description |
|---------|-------------|
| **Sandbox** | Set to **Yes** while testing. In this mode, payments are simulated and no real money moves. Set to **No** when you are ready to accept real cards. |

When **Sandbox** is **Yes**, the plugin uses your **Sandbox Merchant ID / Public Key / Private Key**. When it is **No**, it uses your live **Merchant ID / Public Key / Private Key**. Only the matching set of fields is shown.

:::warning

Always complete at least one successful test in **Sandbox** mode before switching to live payments.

:::

### Payment Action

| Setting | Description |
|---------|-------------|
| **Transaction Type** | **Authorize and Capture** charges the card immediately at checkout. **Authorize Only** reserves the funds but does not take them until you capture the order manually (useful when you ship before charging). |

### Saved Cards

| Setting | Description |
|---------|-------------|
| **Allow Saved Cards** | Set to **Yes** to let logged-in shoppers save a card and reuse it on future orders. Set to **No** to require card entry every time. |

:::info

NOTE: Saved cards are only offered to customers who have an account and are logged in at checkout. Guests always enter a new card.

:::

### Appearance

| Setting | Description |
|---------|-------------|
| **Display Name** | The name shown to shoppers at checkout (for example, "Credit / Debit Card"). |
| **Display Image** | An optional logo shown next to the method at checkout. |
| **Subtemplate** | The checkout layout style. Leave this on **Bootstrap5** unless your store template uses **UIkit**. |

:::warning

Leave **Subtemplate** set to a value (the default is **Bootstrap5**). If it is left blank, the card form will not appear at checkout.

:::

### Order Statuses

| Setting | Description |
|---------|-------------|
| **Order Status** | The status an order is set to after a successful payment (for example, **Confirmed**). |
| **Authorized Status** | The status used when **Transaction Type** is **Authorize Only** and the payment has been authorized but not yet captured. |
| **Change Status on Refund / Refund Order Status** | Optionally move an order to a chosen status when you issue a refund. |
| **Change Status on Void / Void Order Status** | Optionally move an order to a chosen status when you void a payment. |

### Where the Method Appears

| Setting | Description |
|---------|-------------|
| **Geozone** | Limit Braintree to shoppers in a specific geographic zone. Leave empty to offer it everywhere. |
| **Minimum / Maximum Subtotal** | Only offer Braintree when the cart subtotal falls within this range. Leave at `0` for no limit. |

### Surcharge (Optional)

| Setting | Description |
|---------|-------------|
| **Surcharge Name / Percent / Fixed** | Add an extra fee when a shopper pays with Braintree. The percentage and fixed amount are combined. |
| **Surcharge Tax Class** | The tax class applied to the surcharge, if it should be taxed. |

### Custom Messages (Optional)

| Setting | Description |
|---------|-------------|
| **On Selection / Before Payment** | Text shown to the shopper when they choose Braintree. |
| **After Payment** | A thank-you message shown after a successful payment. |
| **On Error** | A message shown if the payment cannot be completed. |

Click **Save** to apply your changes.

## How Checkout Works

1. The shopper adds products to the cart and goes to checkout.
2. They choose **Braintree** (or whatever you set as the **Display Name**) as the payment method.
3. A secure card form appears with fields for **Card Number**, **Expiry Date**, **Security Code (CVV)**, and **Cardholder Name**.
4. Logged-in shoppers can instead pick a previously **saved card**, or tick **Save card for future purchases** to store the new one.
5. The shopper clicks **Place Order**. The card is verified by Braintree, and on success they are taken to the order confirmation page.

<!-- SCREENSHOT: Checkout confirm step showing the Braintree card form -->

:::info

NOTE: The card number never reaches your website. It is sent directly to Braintree, which returns a secure token your store uses to complete the sale.

:::

## Managing Orders

Open any Braintree order from **J2Commerce -> Sales -> Orders** to manage the payment.

- **Capture** — Take the funds for an order that was placed in **Authorize Only** mode.
- **Void** — Cancel a payment before it has settled (same day, no fee returned because nothing was taken yet).
- **Refund** — Return money to the shopper after a payment has settled. You can refund the full amount or a partial amount.

<!-- SCREENSHOT: Order screen showing Braintree Capture / Void / Refund buttons -->

:::tip

Use **Void** for same-day cancellations and **Refund** for orders that have already settled. J2Commerce shows the correct button based on the order's current state.

:::

## Tips

- **Test first** — Keep **Sandbox** set to **Yes** and run a complete test order before going live.
- **Use Authorize Only when you ship later** — This reserves funds at checkout and lets you capture once the order ships.
- **Offer saved cards** — Turning on **Allow Saved Cards** speeds up repeat purchases for account holders.
- **Match your template** — If your store uses UIkit, set **Subtemplate** to **UIkit** so the card form matches your design.

## Troubleshooting

### Braintree Does Not Appear at Checkout

**Cause:** The method is disabled, or it is restricted by a geozone or subtotal limit.

**Solution:**

1. Go to **J2Commerce -> Payments -> Payment Methods** and confirm **Braintree** shows a green checkmark.
2. Open the method and check that **Geozone** matches the shopper's location (or is empty).
3. Check that the cart subtotal is within the **Minimum** and **Maximum Subtotal** range (set both to `0` for no limit).

### The Card Form Is Blank

**Cause:** The **Subtemplate** setting is empty, or the API keys are missing or incorrect.

**Solution:**

1. Open the Braintree settings and confirm **Subtemplate** is set to **Bootstrap5** (or **UIkit**), then click **Save**.
2. Verify the correct keys are entered for the current mode — **Sandbox** keys when Sandbox is **Yes**, live keys when it is **No**.
3. Clear the cache: go to **Home Dashboard -> Cache -> Delete All**, then reload the checkout.

### Test Payments Are Declined

**Cause:** A real card was used in Sandbox mode, or the sandbox keys do not match.

**Solution:**

1. In Sandbox mode, use a Braintree **test card** such as `4111 1111 1111 1111` with any future expiry date and any 3-digit security code.
2. Confirm the **Sandbox Merchant ID / Public Key / Private Key** all come from the same Braintree sandbox account.

### A Saved Card Is Not Offered

**Cause:** Saved cards are turned off, the shopper is not logged in, or they have not saved a card yet.

**Solution:**

1. Open the Braintree settings and set **Allow Saved Cards** to **Yes**.
2. Make sure the shopper has an account and is logged in at checkout (guests cannot use saved cards).
3. Ask the shopper to tick **Save card for future purchases** the next time they pay with a new card.

### Cannot Capture, Void, or Refund an Order

**Cause:** The action does not match the order's current payment state.

**Solution:**

1. Use **Capture** only on orders placed in **Authorize Only** mode that have not yet been captured.
2. Use **Void** only before a payment has settled; after it settles, use **Refund** instead.
3. Confirm your live API keys have permission to process refunds in your Braintree account.

## Related Topics

- [PayPal](payment_paypal.md)
- [Stripe](payment_stripe.md)
- [Cash on Delivery](payment_cash.md)
