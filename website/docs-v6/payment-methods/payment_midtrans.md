---
title: "Midtrans Payment"
sidebar_label: "Midtrans"
sidebar_position: 98
description: "Accept Indonesian rupiah payments through Midtrans — cards, GoPay, ShopeePay, QRIS, bank transfer virtual accounts and convenience stores — with hosted Snap checkout or an on-site card form."
---

# Midtrans Payment

The Midtrans Payment plugin connects your J2Commerce store to **Midtrans**, a leading Indonesian payment gateway from the GoTo (Gojek/Tokopedia) group. It lets you accept payments in Indonesian Rupiah (IDR) through cards, bank transfer virtual accounts, GoPay, ShopeePay, QRIS, and convenience-store payment codes (Alfamart and Indomaret). You choose between two ways of collecting payment: a Midtrans-hosted checkout screen, or a card form built directly into your own checkout page. The plugin also gives you order-screen tools for capturing, voiding, refunding, and reviewing payments.

## Requirements

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.3 or later
- A Midtrans merchant account
- Your store's currency set to **Indonesian Rupiah (IDR)**
- Your store must be reachable over **HTTPS** so Midtrans can deliver payment notifications

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **Midtrans Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Get Your Midtrans Keys Ready

Before configuring the plugin, sign in to your [Midtrans Dashboard](https://dashboard.midtrans.com/) and go to **Settings** -> **Access Keys**. You will find two sets of keys:

- **Sandbox keys** — for testing. These start with `SB-Mid-server-` and `SB-Mid-client-`.
- **Production keys** — for live payments. These do not carry the `SB-` prefix.

Each set has two keys:

- **Server Key** — a secret key used for every request your store makes to Midtrans, and to verify that a payment notification really came from Midtrans. Never share this key or expose it in your storefront.
- **Client Key** — a browser-safe key used by the payment form running in your customer's browser.

Sandbox and production keys only work against their matching environment — mixing them causes every request to fail.

## Install the Plugin

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `payment_midtrans.zip` ZIP file or use the Install from URL option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

## Enable the Plugin

Once you have installed the plugin, you need to enable it. There are **two** ways to reach it:

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Payment Methods**

<!-- SCREENSHOT: Payment Methods list -->

Search for **Midtrans**, click the red **X**, and it will turn into a green checkmark. The plugin is now enabled and ready for setup.

<!-- SCREENSHOT: Midtrans row enabled with green checkmark -->

## Configure the Plugin

Click the **Midtrans** title to open its settings.

:::tip

Click the **Toggle Inline Help** button at the top of the settings screen to show a description below each field as you configure it.

:::

<!-- SCREENSHOT: Midtrans settings, Toggle Inline Help highlighted -->

### Integration Mode

<!-- SCREENSHOT: Integration Mode field -->

This is the single most important setting in this plugin, because it decides which features are available to you.

**Integration Mode:**

| Option | What it does |
|--------|--------------|
| **Snap — hosted checkout (recommended)** | Midtrans hosts the entire payment screen. The customer picks whichever method you've activated on your Midtrans account. This is the simplest option to set up. |
| **Core API — card form on my site** | A card form is built directly into your own checkout page. The card details are turned into a secure token inside the customer's browser before anything reaches your server, so raw card numbers never touch your store. |

:::info

**Saved cards, subscription renewals, and authorize-then-capture all require Core API.** If you plan to offer any of these, choose Core API here — Snap does not support them.

:::

**Snap Display** *(shown only in Snap mode)*: How the Snap payment screen opens — **Popup** keeps the customer on your checkout page, **Redirect** sends them to a Midtrans page, and **Embedded** renders Snap inside the page itself.

**Transaction Type** *(shown only in Core API mode)*: **Authorize + Capture** takes the money immediately and is recommended for most stores. **Authorize Only** reserves the funds without collecting them — you then capture the payment later from the order screen, once you're ready to fulfil the order.

### Sandbox / Test Mode

<!-- SCREENSHOT: Sandbox toggle and credential fields -->

**Sandbox / Test Mode:** When enabled, the plugin uses your sandbox keys against the Midtrans sandbox — no real money moves. Sandbox and production keys are not interchangeable, so make sure the keys you enter match whichever mode is selected.

When **Sandbox** is off, you enter your live credentials:

- **Merchant ID** — shown on the Midtrans dashboard Settings page. Used for reference only.
- **Client Key** — the browser-safe key used by the Snap and card-tokenization libraries.
- **Server Key** — the secret key used for every server-to-server call and to verify notification signatures. Never share it.

When **Sandbox** is on, you enter the matching **Sandbox Merchant ID**, **Sandbox Client Key**, and **Sandbox Server Key** instead.

**Test Connection:** Save the plugin first, then use this button to confirm the stored credentials can reach Midtrans. It tells you which environment it connected to, or shows the error Midtrans returned if the connection failed.

### Notification URL

<!-- SCREENSHOT: Notification URL field -->

The plugin displays a read-only **Notification URL**. Copy this address into your Midtrans Dashboard under **Settings** -> **Configuration**, and use it for both the **Payment Notification URL** and the **Recurring Notification URL** fields there.

:::warning

If this URL is not registered in your Midtrans dashboard, Midtrans has no way to tell your store that a payment succeeded. The customer will see their money leave their account, but your order will stay unpaid until you manually refresh its status.

:::

If your site is running on a local address (such as `localhost`), the plugin shows a warning instead of the URL, because Midtrans cannot reach a local address. Expose your local site through a public tunnel before configuring the notification URL for testing.

### Payment Options

<!-- SCREENSHOT: Payment Methods, 3-D Secure, and saved card fields -->

**Payment Methods** *(Snap mode only)*: Restrict Snap to specific methods — cards, GoPay, ShopeePay, QRIS, bank transfer virtual accounts (BCA, BNI, BRI, CIMB, Permata, and others), Mandiri Bill Payment, Alfamart, Indomaret, Akulaku, and Kredivo. Leave empty to offer every method activated on your Midtrans account.

**Require 3-D Secure:** Asks the cardholder to authenticate with their bank before a card payment completes. Keep this on unless Midtrans has told you otherwise — many card issuers decline unauthenticated payments.

**Allow Saved Cards** *(Core API mode only)*: Lets signed-in customers store a card for faster checkout and for subscription renewals.

**Subscription Billing** *(Core API mode only)*: Decides who charges subscription renewals — **J2Commerce charges the saved card on its own schedule**, or **Midtrans owns the schedule** through its Subscription API. Choose only one; running both would charge the customer twice.

**Payment Window:** How long an unpaid virtual account, QR code, or convenience-store code stays valid, with a matching **Payment Window Unit** (minutes, hours, or days). Leave the window at `0` to use the Midtrans default.

**Offer for Non-IDR Orders:** Midtrans settles in Indonesian Rupiah. Only turn this on if Midtrans has separately enabled another currency on your account.

### Order Statuses

<!-- SCREENSHOT: Order status fields -->

**Authorized Order Status** *(shown when Transaction Type is Authorize Only)*: Applied when funds are reserved but not yet captured. Keep this on a status that does not fulfil the order, since the money has not been taken yet.

**Change Status on Refund / Refunded Order Status:** Optionally move the order to a chosen status once it has been refunded in full.

**Change Status on Cancellation / Cancelled Order Status:** Optionally move the order to a chosen status when a payment is voided or cancelled.

**Change Status on Failure / Failed Order Status:** Optionally move the order to a chosen status when a payment is declined or expires.

:::info

If a status you want isn't listed in the dropdown, create it first under **J2Commerce -> Setup -> Order Statuses**.

:::

### Debug Logging

**Debug Logging:** Records every request and response between your store and Midtrans in `payment_midtrans.php` inside your Joomla log folder. Keys, card tokens, and signatures are automatically redacted from these logs. Turn this on only while diagnosing a specific problem, and leave it off in production.

### Surcharge, Restrictions, and Messaging

The plugin also offers the same optional settings found on other J2Commerce payment plugins: a **Surcharge** (name, percentage, fixed amount, and tax class), **Geozone Restriction** and minimum/maximum order subtotal limits, a **Thank-You Article** shown after a successful payment, and custom text shown at each stage of checkout (on selection, before payment, after payment, on error, and on cancellation).

Click **Save** when you are done.

## How Checkout Works for Customers

### Snap mode

1. The customer selects **Midtrans** on the payment step and clicks to pay.
2. Depending on your **Snap Display** setting, the Midtrans payment screen opens as a popup, redirects to a Midtrans page, or appears embedded in your checkout page.
3. The customer chooses a payment method — card, GoPay, ShopeePay, QRIS, bank transfer, or a convenience store — and completes it however that method requires.
4. Once Midtrans confirms the payment, the customer returns to your store and sees the order confirmation.

### Core API mode

1. The customer selects **Midtrans** and enters their card details directly into the form on your checkout page.
2. The card is tokenized in the browser before anything is sent to your server.
3. If **Require 3-D Secure** is on, the customer's bank may show a short verification step.
4. If the customer has a saved card and **Allow Saved Cards** is enabled, they can choose it instead of entering new details.
5. On success, the order confirms; for bank transfer, GoPay, QRIS, or convenience-store methods, the customer instead sees payment instructions (such as a virtual account number or a store code) to complete outside the checkout page.

## Managing Payments from the Order Screen

After a Midtrans order is placed, you can take follow-up actions from the order detail page. Go to **J2Commerce -> Sales -> Orders**, then click the order number to open it.

<!-- SCREENSHOT: Order detail with Midtrans action buttons -->

Every action re-checks the live status at Midtrans first, so a button never causes a change that Midtrans would refuse.

### Capture

Available only for an authorized payment that has not yet been captured (Transaction Type set to **Authorize Only**). Click **Capture** to collect the reserved funds.

### Void

Cancels an authorized or still-unpaid transaction before it settles. Not available once a payment has settled — use **Refund** instead.

### Expire

Cancels a pending payment the customer has not yet completed, such as an unpaid virtual account. The customer will no longer be able to pay it.

### Approve / Deny

Appear only when Midtrans has flagged a transaction for fraud review. **Approve** releases the payment to complete; **Deny** rejects it permanently.

### Refund

Refunds a settled payment in full or in part.

:::info

**Refund and Void are not available while a card transaction is only authorized (not yet settled).** Card payments typically settle the next business day. Until settlement completes, neither button can be used — this is expected Midtrans behaviour, not a plugin fault. Use **Refresh Status** and try again once the payment has settled.

:::

Not every payment method can be refunded through the Midtrans API — for methods that can't, the plugin tells you to refund the customer directly and record it manually.

### Refresh Status

Pulls the current status from Midtrans without changing anything, and updates the order to match. Use this if you're ever unsure whether a payment notification arrived correctly.

## Testing Payments

Always test in sandbox mode before going live.

1. Turn on **Sandbox / Test Mode** in the plugin settings and enter your sandbox Merchant ID, Client Key, and Server Key.
2. Use **Test Connection** to confirm the plugin can reach the Midtrans sandbox.
3. Copy the **Notification URL** into your Midtrans sandbox dashboard under **Settings** -> **Configuration**. If your local site isn't publicly reachable, expose it through a tunnel first.
4. Place a test order on your storefront and confirm it appears in **J2Commerce -> Sales -> Orders** with the correct status.
5. Try a refund from the order screen once the test payment has settled.
6. If anything looks wrong, turn on **Debug Logging**, repeat the test, and check `payment_midtrans.php` in **System -> Logs**.
7. When everything works, turn off **Sandbox / Test Mode** and enter your live Merchant ID, Client Key, and Server Key.

:::warning

Remember to turn off **Sandbox / Test Mode** before accepting real orders. While sandbox mode is on, no real payments are processed.

:::

## Tips

- **Choose Snap for the simplest setup.** Only switch to Core API if you need saved cards, subscriptions, or authorize-then-capture.
- **Register the Notification URL before you go live.** Without it, orders can appear unpaid even after the customer has successfully paid.
- **Keep your store on HTTPS.** Midtrans cannot deliver payment notifications to a site without a secure connection.
- **Leave Debug Logging off in production** except while actively diagnosing an issue — logged values are redacted, but the log grows quickly.
- **Don't run both subscription schedules.** Pick either J2Commerce or Midtrans as the subscription billing owner, never both.

## Troubleshooting

### Midtrans does not appear as a payment option at checkout

**Cause:** The plugin is disabled, the store currency isn't IDR, or a geozone/subtotal restriction is hiding it.

**Solution:**

1. Go to **J2Commerce -> Setup -> Payment Methods** and confirm **Midtrans** shows a green enabled indicator.
2. Confirm your store currency is **Indonesian Rupiah (IDR)** — Midtrans is hidden for other currencies unless **Offer for Non-IDR Orders** is enabled and supported on your Midtrans account.
3. Check the **Geozone Restriction**, **Minimum Order Subtotal**, and **Maximum Order Subtotal** fields aren't excluding the current cart.

### Shopper paid but the order still shows unpaid

**Cause:** The Notification URL isn't registered in the Midtrans dashboard, so payment confirmations never reach your store.

**Solution:**

1. Open the plugin settings and copy the **Notification URL** shown there.
2. In the Midtrans dashboard, go to **Settings -> Configuration** and paste it into both the **Payment Notification URL** and **Recurring Notification URL** fields.
3. Open the affected order and click **Refresh Status** to pull the current result from Midtrans.
4. Confirm your site is reachable over **HTTPS** — notifications cannot reach a site on localhost or an internal network.

### Saved cards or subscriptions are not offered

**Cause:** **Integration Mode** is set to **Snap**, which does not support saved cards, subscriptions, or authorize-then-capture.

**Solution:**

1. Go to the plugin settings and change **Integration Mode** to **Core API — card form on my site**.
2. Turn on **Allow Saved Cards** if you want customers to store a card.
3. Choose a **Subscription Billing** owner if you sell subscriptions.

### Refund or Void button is greyed out or returns an error

**Cause:** The transaction has not settled yet — card payments are only authorized until Midtrans settles them, usually the next business day.

**Solution:**

1. Open the order and click **Refresh Status** to pull the latest status from Midtrans.
2. Wait for the payment to settle, then try **Refund** or **Void** again.
3. If the payment method cannot be refunded through the API at all, refund the customer directly through your own means and note it on the order.

### Sandbox keys used on a live store, or vice versa

**Cause:** The **Sandbox / Test Mode** toggle and the credentials entered don't match — sandbox keys start with `SB-Mid-server-` / `SB-Mid-client-`, while production keys do not carry that prefix.

**Solution:**

1. Open the plugin settings and check whether **Sandbox / Test Mode** is on or off.
2. Confirm the keys entered for that mode match: sandbox keys in sandbox mode, production keys in production mode.
3. Use **Test Connection** to confirm the plugin is reaching the correct environment.

### Currency mismatch

**Cause:** The store, or the specific order, is priced in a currency other than Indonesian Rupiah.

**Solution:**

1. Confirm your store's default currency is set to **IDR**.
2. If you intentionally sell in another currency, contact Midtrans to confirm they support it for your account, then turn on **Offer for Non-IDR Orders** in the plugin settings.
