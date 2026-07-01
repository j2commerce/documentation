---
title: "Paybox Payment"
sidebar_label: "Paybox"
sidebar_position: 100
description: "Accept payments via Paybox (Verifone Paybox System) — a hosted-redirect gateway popular in France and Europe. Card data never touches your store. Orders are confirmed server-to-server with RSA signature verification."
---

# Paybox Payment

The Paybox plugin connects your J2Commerce store to [Paybox (Verifone Paybox System)](https://www.paybox.com), a trusted hosted payment gateway widely used by French and European merchants. When a customer checks out, they are redirected to the Paybox-hosted payment page to enter their card details securely. Once Paybox confirms the payment with a signed server-to-server callback, J2Commerce updates the order automatically.

Because card entry happens entirely on Paybox's servers, your store never handles raw card data. This makes PCI compliance significantly simpler — your store falls into the lightest scope (SAQ A), so you avoid the burden of more intensive security audits.

Key features:

- Redirect to Paybox-hosted payment page — card details never touch your server
- Server-to-server RSA-signed callback (PBX_REPONDRE_A) — the authoritative payment confirmation
- HMAC-SHA512 request signing — every outbound payment request is cryptographically verified by Paybox
- Multi-currency support with automatic conversion to the correct ISO 4217 numeric currency code
- Sandbox mode with the Paybox pre-production gateway for safe testing
- Configurable order statuses for confirmed, pending, and failed payments
- Bootstrap 5 and UIkit template options
- Geozone and subtotal restrictions
- Debug logging (credentials are never written to the log)

## Requirements

- PHP 8.3.0 or later with the `openssl` extension enabled
- Joomla 6.x
- J2Commerce 6.x
- A Paybox merchant account with live or pre-production credentials
- Your store must be accessible over **HTTPS** on a publicly reachable domain for payment confirmation to work

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com) and locate the **Paybox Payment** plugin.

**Step 2:** Click **View Details** -> **Add to Cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your account profile, find the plugin, and click **Available Versions** -> **View Files** -> **Download Now**.

## Get Your Paybox Credentials

Before you can configure the plugin you need five values from your Paybox merchant account.

Contact your Paybox account manager or log in to the Paybox back office to retrieve:

| Credential | What it is |
|------------|------------|
| **Site Number (PBX_SITE)** | Your unique site number assigned by Paybox |
| **Rank Number (PBX_RANG)** | Your payment rank number, usually a two-digit value |
| **Identifier (PBX_IDENTIFIANT)** | Your merchant identifier |
| **HMAC Secret Key** | A hexadecimal string used to sign outbound payment requests — find it in the Paybox back office under security settings |
| **Paybox RSA Public Key** | A PEM-format public key used to verify the signed server callback — available from Paybox technical documentation |

Keep this information to hand while you configure the plugin. The HMAC secret key and RSA public key must match exactly what Paybox has on file for your account. Do not share either value.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the `payment_paybox.zip` file or use the Install from URL option.

<!-- SCREENSHOT: Joomla Extensions installer screen with file upload area highlighted -->

## Enable the Plugin

After installation you need to enable the plugin so it appears at checkout.

**Option A:** Go to the **J2Commerce** icon at the top right -> **Setup** -> **Payment Methods**.

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Dashboard** -> **Setup** -> **Payment Methods**.

<!-- SCREENSHOT: J2Commerce Payment Methods list screen -->

Look for **Paybox**, click the **X** icon, and it turns into a green checkmark. The plugin is now enabled.

<!-- SCREENSHOT: Payment Methods list showing Paybox enabled with a green checkmark -->

## Configure the Plugin

Click the **Paybox** title to open the settings screen.

:::tip

Click **Toggle Inline Help** at the top of the settings screen to show a description below each field.

:::

### Display

<!-- SCREENSHOT: Display fieldset in the Paybox plugin settings -->

**Display Name:** The payment method name shown to customers at checkout. Defaults to `Paybox`. You can change this to something like "Pay by Credit Card (Paybox)" if you prefer.

**Display Image:** An optional logo shown beside the payment method name at checkout. Click **Select** to choose or upload an image from the Media Manager.

**Template:** Choose the checkout layout template. Select **Bootstrap 5** for standard Joomla templates or **UIkit** for UIkit-based templates such as YOOtheme Pro.

### Paybox Credentials

<!-- SCREENSHOT: Paybox Credentials fieldset showing the credential fields -->

**Sandbox Mode:** When set to **Yes**, all transactions go to the Paybox pre-production gateway (`preprod-tpeweb.paybox.com`) — no real money is processed. Set to **No** when you are ready to accept real payments.

**Site Number (PBX_SITE):** Enter the site number (PBX_SITE) provided by Paybox.

**Rank Number (PBX_RANG):** Enter the rank number (PBX_RANG) provided by Paybox.

**Identifier (PBX_IDENTIFIANT):** Enter the merchant identifier provided by Paybox.

**Secret Key (HMAC):** Paste the hexadecimal HMAC secret key from your Paybox back office. This key is used to sign every outbound payment request with HMAC-SHA512. Never share or log this value.

**Paybox Public Key:** Paste the Paybox RSA public key in PEM format (the block beginning with `-----BEGIN PUBLIC KEY-----`). The plugin uses this key to verify the RSA signature on every server-to-server payment confirmation callback. Without a valid key here, the plugin cannot confirm payments.

### Gateway Options

<!-- SCREENSHOT: Gateway Options fieldset in the Paybox plugin settings -->

**Show Other Currencies:** When set to **Yes**, the Paybox payment page displays currency information for other currencies alongside the order total. This is informational only and does not change the charged amount.

**Payment Page Language:** Choose the language for the Paybox hosted payment page. Options include English, French, Spanish, Italian, German, Dutch, Swedish, and Portuguese. This affects the text and labels on the Paybox page your customer sees.

**Verify Callback Signature:** Keep this set to **Yes** on a live store. When enabled, the plugin verifies the RSA signature on every payment confirmation callback using the Paybox public key before accepting the result. Disabling this is only useful during debugging and must not be left off in production.

**Notify URL Override:** Leave this blank on a normally hosted store. Set it only when your store is behind a reverse proxy, a load balancer, or a tunnel during local development, and the auto-detected URL is not publicly reachable by Paybox. Enter the full public HTTPS URL that Paybox should use for the payment confirmation callback. See the section on [testing locally](#testing-on-localhost-with-ngrok) for guidance.

### Order Statuses

<!-- SCREENSHOT: Order Statuses fieldset in the Paybox plugin settings -->

These settings control which J2Commerce order status is applied at each stage of the payment lifecycle. If the status you want does not appear in the list, create it first at **J2Commerce** -> **Setup** -> **Order Statuses**.

| Field | When it applies |
|-------|-----------------|
| **Confirmed Payment Status** | Applied when Paybox confirms a successful payment (Erreur=00000) |
| **Pending Payment Status** | Applied immediately when the customer is redirected to Paybox, while waiting for the confirmation callback |
| **Failed Payment Status** | Applied when Paybox reports a failed or cancelled payment |

### Restrictions

<!-- SCREENSHOT: Restrictions fieldset in the Paybox plugin settings -->

**Geo Zone:** Limit this payment method to customers whose billing address falls within a specific geographic zone. Leave empty to allow customers from any location.

**Minimum Subtotal:** Hide Paybox at checkout when the order subtotal is below this amount. Leave empty for no minimum.

**Maximum Subtotal:** Hide Paybox at checkout when the order subtotal is above this amount. Leave empty for no maximum.

### Display Messages

<!-- SCREENSHOT: Display Messages fieldset in the Paybox plugin settings -->

**Text Before Payment:** Optional text displayed to the customer on the order summary page, just before they are redirected to Paybox. Use this to set expectations, for example: "You will now be redirected to Paybox to complete your payment securely."

**Text After Payment:** Optional text displayed to the customer after they return from Paybox. This replaces the default pending message on the order confirmation page.

### Advanced

**Debug Logging:** When enabled, the plugin writes request details and callback data to the Joomla log (category `plg_j2commerce_payment_paybox`). The HMAC secret key and RSA public key are never written to the log. Disable this on a live store once everything is working correctly.

## How Checkout Works for Customers

Here is what a customer experiences when they select Paybox at checkout:

1. The customer adds items to the cart and proceeds to checkout.
2. On the payment step, they select **Paybox** (shown with the display name and optional logo you configured).
3. A short message is displayed (the **Text Before Payment** you configured, or the default message).
4. The customer clicks **Pay Now via Paybox** and is redirected to the Paybox-hosted payment page.
5. On the Paybox page, the customer enters their card details. The page language matches the **Payment Page Language** you selected.
6. Paybox processes the payment and sends a signed confirmation directly to your store in the background (server-to-server, not through the customer's browser).
7. J2Commerce receives the callback, verifies the RSA signature, checks the amount, and updates the order status to your **Confirmed Payment Status**.
8. The customer is returned to your store's confirmation page and sees the order confirmation.

The customer will see a "Your payment is being processed" message if they arrive at the confirmation page before the callback has been received and processed. Once the callback arrives and is verified, the order status updates automatically.

:::note

The server-to-server callback is the **authoritative** payment confirmation. The customer's browser return to your store is for display purposes only and does not confirm the payment. This means the order is always finalized by the callback, not by what happens in the browser after the customer returns.

:::

## Sandbox Testing

Always test in sandbox mode before accepting real payments.

1. Set **Sandbox Mode** to **Yes** in the plugin settings.
2. Enter your Paybox pre-production credentials (Site, Rank, Identifier, HMAC Key, and Public Key — Paybox supplies separate test credentials for pre-production).
3. Place a test order on your store and complete checkout. You will be redirected to `preprod-tpeweb.paybox.com`.
4. Complete a test payment using the Paybox test card numbers supplied in your pre-production documentation.
5. Check that the order appears in **J2Commerce** -> **Sales** -> **Orders** with your configured **Confirmed Payment Status**.

When you are ready to go live:

1. Set **Sandbox Mode** to **No**.
2. Replace the pre-production credentials with your live Site Number, Rank Number, Identifier, HMAC Key, and Public Key.
3. Save the settings and clear the Joomla cache.
4. Place a low-value test order on the live gateway to confirm everything is working.

### Testing on Localhost with ngrok

Paybox's payment confirmation callback must reach your store over a publicly accessible HTTPS URL. If your store is running on `localhost`, Paybox cannot deliver the callback and orders will remain in **Pending** status.

Use [ngrok](https://ngrok.com) to expose your local store over a public HTTPS tunnel:

1. Install ngrok and start a tunnel: `ngrok http 443`.
2. Copy the public HTTPS URL that ngrok shows (for example `https://abc123.ngrok.io`).
3. In the Paybox plugin settings, paste this URL into **Notify URL Override**.
4. Save the settings and run a test checkout.

Remember to update **Notify URL Override** each time you restart ngrok, as the public URL changes with each session.

## Configuration Field Reference

The table below lists every configuration field, what it controls, and a recommended value.

| Field | What it does | Recommended value |
|-------|-------------|-------------------|
| **Display Name** | Payment method name shown at checkout | `Paybox` or your preferred label |
| **Display Image** | Logo shown at checkout | Optional — Paybox logo |
| **Template** | Checkout layout style | `Bootstrap 5` (or `UIkit` if your template uses UIkit) |
| **Sandbox Mode** | Switches between pre-production and live gateway | `No` on live; `Yes` for testing |
| **Site Number (PBX_SITE)** | Your Paybox site number | As provided by Paybox |
| **Rank Number (PBX_RANG)** | Your Paybox rank number | As provided by Paybox |
| **Identifier (PBX_IDENTIFIANT)** | Your merchant identifier | As provided by Paybox |
| **Secret Key (HMAC)** | Hex HMAC key for signing payment requests | As provided by Paybox back office |
| **Paybox Public Key** | RSA public key for verifying callbacks | PEM block from Paybox documentation |
| **Show Other Currencies** | Show extra currency info on the Paybox page | `No` (unless requested by your account manager) |
| **Payment Page Language** | Language of the Paybox-hosted payment page | Match your store's primary language |
| **Verify Callback Signature** | Verify RSA signature on payment callbacks | `Yes` — always keep enabled in production |
| **Notify URL Override** | Override the callback URL Paybox uses | Empty (set only for local dev / reverse proxy) |
| **Confirmed Payment Status** | Order status after successful payment | e.g. "Confirmed" |
| **Pending Payment Status** | Order status while awaiting callback | e.g. "Pending" |
| **Failed Payment Status** | Order status after failed or cancelled payment | e.g. "Failed" |
| **Geo Zone** | Limit to specific billing locations | Empty to allow all |
| **Minimum Subtotal** | Minimum order value to show Paybox | Empty for no minimum |
| **Maximum Subtotal** | Maximum order value to show Paybox | Empty for no maximum |
| **Text Before Payment** | Message shown before redirect | e.g. "You will be redirected to Paybox." |
| **Text After Payment** | Message shown after customer returns | Optional — leave empty to use the default |
| **Debug Logging** | Writes request data to the Joomla log | `No` on production; `Yes` during setup |

## What Is New Compared to the J2Store Version

If you are upgrading from the J2Store version of the Paybox plugin, here is what has changed in J2Commerce 6:

- **Native Joomla 6 MVC architecture** — no more FOF 2 framework or jQuery dependencies. The plugin uses proper Joomla 6 dependency injection, namespaced classes, and vanilla JavaScript.
- **RSA-verified server callback is authoritative** — the IPN callback is now clearly separated from the browser return URL. The callback finalizes the order; the browser return is UX only. This prevents any possibility of double-processing.
- **Multi-currency aware amount conversion** — the plugin uses `CurrencyHelper::gatewayAmount()` to convert the order total to the correct display currency before multiplying by 100 for the integer cent amount. The ISO 4217 numeric currency code is mapped automatically from the order currency code (EUR=978, USD=840, GBP=826, CHF=756, CAD=124, AUD=036, and others).
- **Configurable order statuses** — confirmed, pending, and failed statuses are now dropdown fields. In the J2Store version these were hardcoded.
- **Bootstrap 5 and UIkit templates** — the checkout form now has two layout options to match your frontend template.
- **Secrets are never logged** — the HMAC secret key and the RSA public key are explicitly excluded from all log output.
- **Atomic callback claim** — if Paybox sends a duplicate callback for an already-confirmed order, the plugin acknowledges it silently without reprocessing.

## Troubleshooting

### Orders stay in Pending status after the customer pays

**Cause:** Paybox could not deliver the payment confirmation callback to your store. This usually happens when the callback URL is not publicly reachable.

**Solution:**

1. Check that your store is accessible over HTTPS at a public domain.
2. If your store is on localhost or behind a proxy, set the **Notify URL Override** field to a publicly reachable URL. See [Testing on Localhost with ngrok](#testing-on-localhost-with-ngrok).
3. Enable **Debug Logging** in the plugin settings and place a test order. Review the Joomla log (**System** -> **Logs**) for entries from `plg_j2commerce_payment_paybox` to see whether the callback was received.
4. Confirm there is no firewall or security rule blocking incoming POST requests to the `com_ajax` endpoint on your server.

### "Paybox signature validation failed" error

**Cause:** The RSA public key stored in the plugin does not match the one Paybox used to sign the callback, or the key was pasted incorrectly (missing header/footer lines or extra whitespace).

**Solution:**

1. Return to the plugin settings and re-check the value in the **Paybox Public Key** field.
2. The key should begin with `-----BEGIN PUBLIC KEY-----` and end with `-----END PUBLIC KEY-----`. Ensure the full block is present, including both lines.
3. Obtain a fresh copy of the key from the official Paybox developer documentation and paste it into the field again.
4. Save the settings and retry a test transaction.

### Callback rejected with "Invalid signature"

**Cause:** The RSA signature verification failed. This can also mean the signed data string does not match — for example, if a caching layer or WAF is modifying the incoming request before it reaches J2Commerce.

**Solution:**

1. Enable **Debug Logging** and check the Joomla log for the raw values received in the callback.
2. If a WAF or caching plugin is active, add an exception for the callback URL (`index.php?option=com_ajax&group=j2commerce&plugin=payment_paybox&format=raw&task=ipn`).
3. As a temporary test only, set **Verify Callback Signature** to **No**, confirm the order finalizes, then re-enable it. If disabling signature verification resolves the issue, the public key or the incoming data is being altered somewhere.

### Payment request rejected by Paybox ("Erreur" at the gateway)

**Cause:** One or more of the credential fields (Site Number, Rank Number, or Identifier) is incorrect, or the HMAC secret key does not match your Paybox account.

**Solution:**

1. Log in to the Paybox back office and verify the Site Number, Rank Number, and Identifier.
2. Retrieve the HMAC secret key again from the back office. The key is a hexadecimal string — copy it exactly, with no spaces or line breaks.
3. Confirm that the **Sandbox Mode** setting matches your credentials. Pre-production credentials will not work on the live gateway and vice versa.
4. Save the settings and try a test transaction.

### Paybox option does not appear at checkout

**Cause:** The plugin is disabled, a geozone restriction is preventing the method from showing, or the order subtotal is outside the configured minimum or maximum limits.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Payment Methods** and confirm **Paybox** has a green enabled indicator.
2. If a **Geo Zone** is set, check that the customer's billing address falls within that zone.
3. Check the **Minimum Subtotal** and **Maximum Subtotal** values and compare them with the current order total.
4. Confirm that the Site Number, Rank Number, and Identifier fields are not empty — the plugin will not display at checkout if these required credential fields are blank.

### Order total amount looks wrong on the Paybox page

**Cause:** Your store has a currency other than EUR active, and the currency conversion is not what you expect.

**Solution:**

The plugin converts the order total to the gateway amount using J2Commerce's `CurrencyHelper::gatewayAmount()` (which respects the `currency_value` exchange rate stored on the order), then multiplies by 100 to obtain integer cents for Paybox. If the amount looks incorrect, check the exchange rates configured in **J2Commerce** -> **Setup** -> **Currencies**.

:::note

This plugin does not support refunds, saved cards, or subscription billing. Paybox is a redirect-only payment method — the customer pays on the Paybox page and returns to your store. For any post-payment actions such as refunds, use the Paybox merchant back office directly.

:::
