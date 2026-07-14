---
title: "Swish Payment"
sidebar_label: "Swish"
sidebar_position: 97
description: "Accept Swish mobile payments in Sweden via Mobile BankID approval, phone number or QR code, with subscription-renewal support and order-screen cancel/refund."
---

# Swish Payment

The Swish Payment plugin connects your J2Commerce store to **Swish**, Sweden's most popular mobile payment system. At checkout, customers approve the payment inside their own Swish app using **Mobile BankID** — so you never handle card numbers, and there is no card form to fill in. The plugin supports paying by phone number, by QR code, and (optionally) storing an authorization for subscription renewals. You can also cancel unpaid requests and issue refunds directly from the J2Commerce order screen.

## Requirements

- Joomla 6.x
- J2Commerce 6.x
- PHP 8.3 or later
- A Swish merchant agreement (a **Swish Handel / Företag** number that begins with `123`)
- A Swish **TLS certificate** issued to your merchant number (provided when you sign your Swish agreement)
- Your store must be reachable over **HTTPS** so Swish can send payment confirmations
- Orders must be priced in **Swedish Kronor (SEK)** — Swish does not accept any other currency

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) and locate **Swish Payment**.
2. Add it to your cart and complete checkout.
3. Go to **My Downloads** under your account profile and find the plugin.
4. Click **Available Versions** -> **View Files** -> **Download Now** to download the ZIP file.

## Get Your Swish Details Ready

Unlike most card gateways, Swish does **not** use an API username and password. Instead, every request is signed with a **certificate** issued to your Swish merchant number. Before you configure the plugin, gather the following from your Swish agreement paperwork:

- **Your Swish merchant number** — 10 digits starting with `123` (this is your "Payee" number).
- **Your TLS certificate file** — the certificate that identifies your store to Swish. It usually comes as a `.p12`/`.pfx` file (with a password) or as a `.pem` file plus a separate private-key file.
- **The certificate password** — only needed for `.p12`/`.pfx` files.
- **The Swish root CA file** — the trust file for the test environments (needed for MSS and Sandbox testing).

Upload these certificate files to a **safe folder on your server that is not publicly accessible** (outside your public web folder). You will point the plugin at their location during setup.

:::warning

Never place your Swish certificate files inside a folder that visitors can reach in a browser, and never share the certificate password. These files let payments be taken in your name — treat them like keys to the till.

:::

## Install the Plugin

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `payment_swish.zip` ZIP file or use the Install from URL option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

## Enable the Plugin

Once you have installed the plugin, you need to enable it. There are **two** ways to reach it:

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Payment Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Payment Methods**

<!-- SCREENSHOT: Payment Methods list -->

Search for **Swish**, click the red **X**, and it will turn into a green checkmark. The plugin is now enabled and ready for setup.

<!-- SCREENSHOT: Swish row enabled with green checkmark -->

## Configure the Plugin

Click the **Swish** title to open its settings.

:::tip

Click the **Toggle Inline Help** button at the top of the settings screen to show a description below each field as you configure it.

:::

<!-- SCREENSHOT: Swish settings, Toggle Inline Help highlighted -->

### Basic Settings

<!-- SCREENSHOT: Basic Settings tab -->

**Environment:** Which Swish system to connect to.

| Option | When to use it |
|--------|----------------|
| **MSS (Simulator)** | Early testing. Swish's Merchant Swish Simulator approves or declines payments automatically — no real phone or app needed. |
| **Sandbox** | Fuller testing with the Swish test apps. |
| **Production** | Live payments from real customers. Switch to this only when you are ready to go live. |

**Payee Swish Number:** Your Swish merchant number — 10 digits starting with `123`. This is the account that receives the money.

**TLS Certificate Path:** The full path on your server to your Swish certificate file (`.pem` or `.p12`/`.pfx`).

**TLS Private Key Path:** The full path to your private key file (`.pem`). Leave this blank if your certificate is a `.p12`/`.pfx` file, which already contains the key.

**Certificate Password:** The password for your `.p12`/`.pfx` certificate, if it has one. Leave blank for `.pem` certificates.

**Root CA Path:** The full path to the Swish root CA file. This is required for the **MSS** and **Sandbox** test environments and optional for **Production**.

**Payment Flow:** How customers pay at checkout.

- **E-commerce (phone number entry)** — the customer types their Swish-registered phone number, and a payment request pops up in their Swish app. Best for desktop shoppers.
- **M-commerce (QR code / deep link)** — the customer scans a QR code or taps a button to open the Swish app on the same phone. Best for mobile shoppers.
- **Both** — offer both options and let the customer choose.

**Payment Message:** A short note (up to 50 characters) the customer sees inside their Swish app, such as your store name or the order number.

**Enable Recurring Payments:** Turn this on to let customers authorize Swish for subscription renewals. This requires a separate **Swish Recurring** agreement — see [Subscriptions](#subscriptions-and-saved-authorizations) below. Leave it off if you do not sell subscriptions.

### Order Statuses

These settings control which status an order is given at each stage. If a status you want isn't listed, create it under **J2Commerce -> Setup -> Order Statuses**.

<!-- SCREENSHOT: Order Statuses tab -->

**Paid Status:** Applied when Swish confirms the payment (default: **Confirmed**).

**Pending Status:** Applied while the store waits for the customer to approve the payment in their app (default: **Pending**).

**Failed Status:** Applied when a payment fails or the customer declines it in the app.

**Cancelled Status:** Applied when a payment request is cancelled before it is paid.

**Refund Status:** Applied after you successfully refund a payment. Leave as "no change" if you prefer to update the status yourself.

### Display

<!-- SCREENSHOT: Display tab -->

**Display Name:** The label customers see for this payment method at checkout (default: **Swish**).

**Display Image:** An optional logo shown beside the name. The plugin ships with a Swish logo already set.

**Sub-template:** Choose **bootstrap5** or **uikit** to match your site's front-end template so the Swish checkout box looks consistent with the rest of your store.

**Geozone Restriction:** Limit Swish to customers in a specific geozone — useful since Swish is a Swedish payment method. Leave blank to allow all locations.

**Minimum Order Subtotal:** Hide Swish when the cart subtotal is below this amount. Leave blank for no minimum.

**Maximum Order Subtotal:** Hide Swish when the cart subtotal is above this amount. Leave blank for no maximum.

### Advanced

<!-- SCREENSHOT: Advanced tab -->

**Show Dashboard Icon:** Add a quick-access icon for this plugin to the J2Commerce dashboard.

**Dashboard Icon Label:** The label for that icon.

**Debug Mode:** Record detailed Swish request and response data in the Joomla log. Turn this on only while diagnosing a problem, and turn it off on live sites.

**Callback Base URL (override):** An optional public web address Swish should use to deliver payment confirmations. You normally leave this blank so your store's own address is used. During local development, where your store isn't reachable from the internet, you can put a public tunnel address (for example an ngrok URL) here so test confirmations can arrive.

Click **Save** when you are done.

## How Checkout Works for Customers

Swish is a mobile-app payment, so the flow is simple and the customer never types card details.

### E-commerce (phone number) flow

1. The customer selects **Swish** on the payment step and enters their Swish-registered phone number.
2. They click **Pay with Swish**.
3. A payment request appears in their Swish app on their phone.
4. They approve it with **Mobile BankID**.
5. The checkout page updates automatically the moment the payment is confirmed, and the order is completed.

### M-commerce (QR code / deep link) flow

1. The customer selects **Swish** and clicks to open the payment.
2. On a computer, a **QR code** appears — they scan it with the Swish app on their phone. On a phone, an **Open Swish App** button opens the app directly.
3. They approve the payment with **Mobile BankID**.
4. The store confirms the payment and completes the order automatically.

:::info

There is no "authorize now, charge later" step with Swish. A paid Swish request is settled immediately — the money moves as soon as the customer approves it.

:::

## Subscriptions and Saved Authorizations

If you sell subscriptions and have turned on **Enable Recurring Payments**, Swish works a little differently from a one-time payment:

1. Instead of paying immediately, the customer **authorizes** future charges. This is a signed agreement (a "consent") held by Swish.
2. To create it, the customer approves an authorization request in their Swish app. A **Swedish personal identity number (personnummer)** is required for this step.
3. Once authorized, J2Commerce can charge each renewal automatically when it falls due, without the customer needing to approve every time.
4. The customer can cancel the subscription, which removes the stored authorization.

:::info

Recurring payments require a separate **Swish Recurring** agreement in addition to your standard Swish Handel agreement. If you do not have Recurring access, leave **Enable Recurring Payments** turned off.

:::

## Managing Payments from the Order Screen

After a Swish order is placed, you can take follow-up actions directly from the order detail page.

Go to **J2Commerce** **-> Sales -> Orders**, then click the order number to open it. The Swish action buttons appear in the payment section.

<!-- SCREENSHOT: Order detail with Swish action buttons -->

### Cancel a Payment

A cancellation stops a payment request that the customer has **not paid yet** (for example, they started checkout but never approved it in their app).

1. Open the order.
2. Click **Cancel Payment** and confirm the prompt.
3. The pending request is cancelled and no money is taken.

:::info

You can only cancel a request that is still unpaid. Once the customer has approved the payment, there is nothing to cancel — use **Refund** instead to return the money.

:::

### Issue a Refund

You can refund a paid Swish payment in full or in part.

1. Open the order.
2. Click **Refund**.
3. Enter the amount to refund (leave it at the full amount for a complete refund, or enter a smaller figure for a partial refund).
4. Confirm the prompt.

The money is returned to the customer's Swish account. If a **Refund Status** is set in the plugin settings, the order status updates automatically. Swish refunds can be made up to **13 months** after the original payment.

### Sync Status

If you are ever unsure whether a payment went through — for example after a network hiccup — click **Sync Status**. The plugin asks Swish for the latest status of the payment and updates the order to match.

## Testing Payments

Always test before going live.

1. Set **Environment** to **MSS (Simulator)** in the plugin settings. The simulator approves or declines payments automatically, so you don't need a real phone or the Swish app.
2. Enter the test certificate details supplied with your Swish developer access (the test certificate password is usually `swish`).
3. Place a test order on your storefront and confirm it reaches **J2Commerce -> Sales -> Orders** with the correct status.
4. Try a refund from the order screen to confirm it processes without errors.
5. If anything fails, turn on **Debug Mode**, repeat the test, and check **System -> Logs**.
6. When everything works, switch **Environment** to **Production** and enter your live certificate details.

:::warning

Remember to switch **Environment** to **Production** before accepting real orders. While a test environment is selected, no real payments are processed.

:::

## Tips

- **Price in SEK.** Swish only accepts Swedish Kronor. If an order is in another currency, Swish won't be offered — use the **Geozone Restriction** to show it only to Swedish customers.
- **Keep your store on HTTPS.** Swish sends payment confirmations to your store over a secure connection; a site without HTTPS cannot receive them.
- **Offer "Both" flows** if you have a mix of desktop and mobile shoppers — desktop users get the phone-number option and mobile users get the tap-to-open button.
- **Store certificates safely** outside your public web folder, and never enable **Debug Mode** permanently on a live site.

## Troubleshooting

### Swish does not appear as a payment option at checkout

**Cause:** The order isn't in SEK, the plugin is disabled, or a geozone/subtotal limit is hiding it.

**Solution:**

1. Confirm the cart total is in **Swedish Kronor (SEK)** — Swish is hidden for any other currency.
2. Go to **J2Commerce -> Setup -> Payment Methods** and check that **Swish** shows a green enabled indicator.
3. Open the plugin settings and check the **Geozone Restriction**, **Minimum Order Subtotal**, and **Maximum Order Subtotal** fields aren't excluding the current cart.

### The payment fails immediately or the plugin reports a certificate problem

**Cause:** The certificate path, password, or merchant number is wrong, or the certificate doesn't match the selected environment.

**Solution:**

1. Confirm the **TLS Certificate Path** (and **TLS Private Key Path**, for `.pem` files) point to the correct files on your server.
2. Check the **Certificate Password** is correct for `.p12`/`.pfx` files.
3. Make sure the certificate matches the chosen **Environment** — a test certificate will not work in Production, and vice versa.
4. Confirm the **Payee Swish Number** matches the number the certificate was issued to.

### Orders stay in a pending status after the customer paid

**Cause:** Swish's payment confirmation can't reach your store.

**Solution:**

1. Make sure your store is publicly reachable over **HTTPS** — confirmations cannot reach a site on localhost or an internal network.
2. If you are testing locally, set the **Callback Base URL (override)** to a public tunnel address (such as an ngrok URL).
3. Open the affected order and click **Sync Status** to pull the latest result from Swish.
4. Turn on **Debug Mode**, repeat a test payment, and check **System -> Logs** for confirmation-related errors.

### The customer sees "Swish only accepts Swedish Kronor"

**Cause:** The order is priced in a currency other than SEK.

**Solution:**

1. Ask the customer to switch the store currency to **SEK**, or choose a different payment method.
2. To avoid this entirely, use the **Geozone Restriction** so Swish is only shown to customers whose orders are in SEK.

### Subscription authorization fails

**Cause:** Recurring payments aren't enabled, the customer didn't provide a personnummer, or you don't have a Swish Recurring agreement.

**Solution:**

1. Confirm **Enable Recurring Payments** is set to **Yes** in the plugin settings.
2. Make sure the customer enters a valid **Swedish personal identity number (personnummer)** on the authorization step.
3. Confirm you hold a **Swish Recurring** agreement — standard Swish Handel agreements do not include recurring charges.

### The Cancel button is missing on an order

**Cause:** The payment has already been paid, so there is nothing to cancel.

**Solution:**

- Once a Swish payment is approved by the customer, it settles immediately and can no longer be cancelled. Use the **Refund** button to return the money instead.
