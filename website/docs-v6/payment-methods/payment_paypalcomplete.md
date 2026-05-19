# PayPal Complete Payments

PayPal Complete Payments brings the full PayPal Commerce Platform directly into your J2Commerce checkout. Unlike a basic PayPal button, this plugin supports **multiparty marketplace payouts** — one buyer pays once, and PayPal automatically splits the funds between sellers and deducts your platform commission, all in a single transaction. Whether you run a standard single-vendor store or a full vendor marketplace, this plugin handles checkout, captures, refunds, and disputes in one place.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x
- A **PayPal Business account** enrolled in the PayPal Commerce Platform (Partner program)
- A **PayPal Partner (platform) application** with a Client ID, Client Secret, and Merchant ID
- For vendor marketplace mode: the **Vendor Marketplace** app installed and sellers onboarded via PayPal Partner Referrals

## Purchase and Download

**Step 1:** Go to the [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps** **->** **Payments**

**Step 2:** Locate the **PayPal Complete Payments** listing **->** click **View Details** **->** **Add to Cart -> Checkout**.&#x20;

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and find the purchase. Click **Available Versions -> View Files -> Download Now**

## Install the Plugin

You can install PayPal Complete Payments using the Joomla installer.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the plugin ZIP file or use the Install from URL option.

![Install extensions](/img/paypalcomplete-install.webp)

## Enable the Plugin

Once installed, you need to enable the plugin. There are **two** ways to reach the Payments list.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Payments**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Payments**

![Payments list](/img/paypalcomplete-payments-list.webp)

Look for **PayPal Complete Payments**, click the red **X**, and it turns into a green checkmark. The plugin is now enabled and ready for configuration.

![Enable PayPal Complete Payments](/img/paypalcomplete-enable.webp)

## Configure the Plugin

Click the **PayPal Complete Payments** title next to the green checkmark to open settings.

:::tip

Click the **Toggle Inline Help** button at the top of any plugin or app screen to reveal a description below every field.

:::

![Toggle inline help](/img/paypalcomplete-toggle-help.webp)

---

### Display Name

The label customers see at checkout when they choose this payment method. Default: **Pay with PayPal**.

### Display Image

An optional image (logo or badge) shown alongside the payment option at checkout. Upload from your media manager or leave blank to show text only.

---

### Sandbox Mode

Toggle this **Yes** while you are testing. When Sandbox is on, all transactions go through PayPal's sandbox environment — no real money moves. **Turn this off before going live.**

:::info

You need separate credentials for sandbox and live. Fill in both sets of fields so you can switch between them without losing your live configuration.

:::

---

### Partner Client ID (Live)

Your PayPal partner application Client ID for **live** payments. Found in your [PayPal Developer Dashboard](https://developer.paypal.com/) under **My Apps & Credentials -> Live**.

### Partner Client Secret (Live)

The Client Secret paired with the live Client ID. Keep this private — never share it or commit it to source control.

### Partner Merchant ID (Live)

Your own PayPal account Merchant ID (also called payer_id). Find it in **PayPal Account Settings -> Business Information**.

### BN Code (Attribution)

Your PayPal Build Notation code. This identifies your integration to PayPal for support and analytics purposes. Default: **J2Commerce_SP**. Leave as-is unless PayPal has assigned you a different code.

---

### Partner Client ID (Sandbox)

Same as the live Client ID above, but for the PayPal sandbox. Used only when Sandbox Mode is **Yes**.

### Partner Client Secret (Sandbox)

Sandbox Client Secret paired with the sandbox Client ID.

### Partner Merchant ID (Sandbox)

Your sandbox account Merchant ID.

---

### Webhook ID (Live)

The webhook subscription ID from your PayPal Developer Dashboard for live mode. PayPal sends this ID in every webhook event so J2Commerce can verify the signature. To get this value:

1. In the PayPal Developer Dashboard, go to **My Apps & Credentials -> [Your App] -> Webhooks**.
2. Create a webhook pointing to: `https://yoursite.com/index.php?option=com_ajax&plugin=paypalcomplete&group=j2commerce`
3. Subscribe to: `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`, `PAYMENT.CAPTURE.REFUNDED`, `PAYMENT.CAPTURE.REVERSED`, `MERCHANT.ONBOARDING.COMPLETED`, `MERCHANT.PARTNER-CONSENT.REVOKED`, `CUSTOMER.DISPUTE.CREATED`, `CUSTOMER.DISPUTE.RESOLVED`
4. Copy the generated **Webhook ID** and paste it here.

### Webhook ID (Sandbox)

The same, but for your sandbox webhook subscription.

:::info

Webhook signature verification is required. If this field is empty, incoming webhooks are rejected and order status updates from PayPal will not fire automatically.

:::

---

### Checkout Tier

Controls which PayPal checkout experience appears on your site.

| Option | What it means |
|--------|---------------|
| **Standard (Smart Buttons)** | PayPal-hosted Smart Buttons (PPCP_STANDARD). Buyers are redirected to a PayPal-hosted popup or page to approve payment. Lowest PCI compliance scope. **Recommended for most stores.** |
| **Advanced (Custom Card Fields)** | Custom branded card fields rendered directly on your checkout page via secure PayPal iframes (PPCP_CUSTOM). Buyers never leave your site. Requires PayPal to approve your account for PPCP_CUSTOM eligibility. |
| **Auto-detect** | J2Commerce checks your seller account's PayPal capabilities. If PPCP_CUSTOM is approved and active, Advanced is used. Otherwise it falls back to Standard automatically. |

:::tip

Start with **Standard** until your store is live and processing real orders. Switch to **Advanced** only after PayPal confirms your account is approved for Custom Card Fields.

:::

---

### Marketplace Mode

Controls how a payment is split between recipients.

| Option | When to use |
|--------|-------------|
| **Vendor Marketplace** | You operate a marketplace where multiple sellers list products. One purchase unit is created per seller; each seller receives their portion directly. Requires the Vendor Marketplace app and sellers onboarded via PayPal Partner Referrals. |
| **Affiliate / Commission** | A single purchase unit is created for the full order amount. A platform fee (your commission percentage) is deducted at capture and routed to your partner account. |
| **Single Payee** | Standard single-merchant checkout. No split is performed — the full amount goes to your account. |

### Disbursement Mode

Controls when sellers receive their funds.

| Option | What happens |
|--------|-------------|
| **Instant** | Seller receives their share immediately when the payment is captured. Default setting for most stores. |
| **Delayed (Escrow)** | Funds are held in escrow after capture. You release them manually from the PayPal dashboard. Useful for stores that need to verify order fulfillment before releasing payment to sellers. |

### Default Platform Fee (%)

*Shown only for Affiliate and Single Payee modes.*

The fallback commission percentage your platform retains from each order. For example, entering `10` means 10% of the order total is kept as a platform fee. In Vendor Marketplace mode, per-vendor rates from the Vendor Marketplace app override this value.

---

### Payment Confirmed Status

The J2Commerce order status applied when PayPal successfully captures the payment. Default: **Confirmed**. Choose the order status that fits your fulfillment workflow.

---

### Surcharge Label

A name for any additional fee charged to the buyer for using this payment method (for example, **Payment processing fee**). Leave blank for no surcharge.

### Surcharge (%)

A percentage added on top of the order subtotal as a surcharge. Leave blank for no percentage surcharge.

### Surcharge (Fixed)

A flat dollar amount added to every order as a surcharge. Leave blank for no fixed surcharge.

### Surcharge Tax Class

If your surcharge is taxable, select the tax profile that applies to it. Leave blank to charge the surcharge without tax.

---

### Restrict to Geozone

Limit PayPal Complete Payments to buyers in a specific country or region. Select a geozone you have defined in J2Commerce. Leave blank to offer PayPal to all buyers regardless of location.

### Minimum Order Subtotal

Only show this payment method when the order subtotal is at or above this amount. Leave blank for no minimum.

### Maximum Order Subtotal

Only show this payment method when the order subtotal is at or below this amount. Leave blank for no maximum.

---

### Thank-You Article

Select a Joomla article to display on the order confirmation page after a successful payment. Leave blank to use the default J2Commerce confirmation message.

---

### On-Selection Text

HTML or plain text shown to the buyer as soon as they select PayPal Complete Payments at the payment step — before they click Pay. Use this for short notices such as currency conversion warnings.

### On Before Payment Text

Text displayed to the buyer immediately before the PayPal payment window opens.

### On After Payment Text

Text displayed on the confirmation screen after payment completes successfully.

### On Error Payment Text

Text shown when a payment fails or is declined.

### On Cancel Payment Text

Text shown when the buyer cancels from the PayPal payment window and returns to your checkout.

---

### Show Dashboard Icon

Set to **Yes** to add a quick-access icon for this plugin to the J2Commerce admin dashboard.

### Dashboard Icon Label

*Shown only when Show Dashboard Icon is Yes.* The label text for the dashboard icon. Leave blank to use the plugin display name.

---

### Subtemplate

Lets you select a custom layout template for the PayPal checkout button area, if your active template or theme provides one. Leave blank to use the default layout.

---

### Debug Mode

Set to **Yes** to write detailed PayPal API request and response data to the J2Commerce log file. **Always disable in production** — debug logs can contain sensitive order data.

---

## How It Works {#how-it-works}

1. The customer adds items to their cart and proceeds to checkout.

2. At the payment step, **Pay with PayPal** (or your custom display name) appears as an option.

3. The customer selects PayPal Complete Payments. J2Commerce renders the PayPal Smart Buttons (Standard tier) or custom card fields (Advanced tier) on the page.

4. The customer clicks **Pay Now** or the PayPal button. In Standard tier, a PayPal-hosted popup opens where the customer logs into their PayPal account or enters a card. In Advanced tier, the card fields are filled out directly on your checkout page.

5. PayPal creates a payment order. J2Commerce sends the order details — items, amounts, and purchase unit split instructions — to the PayPal API.

6. For Vendor Marketplace mode, J2Commerce builds one purchase unit per onboarded seller. Each unit includes the seller's merchant ID and a platform fee instruction. The buyer is charged the full order total in a single transaction.

7. When the buyer approves payment, J2Commerce captures all purchase units. Each seller's portion is disbursed according to the Disbursement Mode setting (Instant or Delayed).

8. PayPal sends a `PAYMENT.CAPTURE.COMPLETED` webhook back to your site. J2Commerce verifies the webhook signature and updates the order status to your configured **Payment Confirmed Status**.

9. The customer sees the thank-you page with your confirmation message and optional Thank-You Article.

10. If a buyer later requests a refund, store admins can issue a full or partial refund from the order detail screen in J2Commerce admin. Refunds for marketplace orders are split proportionally across each seller capture.

## Display Conditions {#display-conditions}

**PayPal Complete Payments appears at checkout when:**

- The plugin is enabled in **J2Commerce -> Payments**.
- Your live (or sandbox) Partner Client ID and Client Secret are entered and correct.
- The order total falls within your **Minimum Order Subtotal** and **Maximum Order Subtotal** limits (if set).
- The buyer's shipping address falls within your configured **Restrict to Geozone** (if set).

**For Vendor Marketplace mode, payments can be captured when:**

- At least one seller has completed onboarding and their account shows **Active** status.
- The seller's PayPal email is confirmed and payments are receivable.
- If no sellers are onboarded yet, the full order total routes to your partner account automatically.

## Tips {#tips}

- **Complete sandbox testing before going live.** Use sandbox PayPal accounts for both the platform and at least one seller. Place a real test order end-to-end, confirm the webhook fires, and verify the order status updates before flipping Sandbox Mode off.

- **Set your Webhook ID before accepting orders.** Without it, PayPal's payment-complete notifications will not reach J2Commerce and orders stay in their pre-payment status indefinitely.

- **Vendor onboarding takes time.** After a seller clicks Connect and completes the PayPal form, their status may remain Pending for a few minutes while PayPal processes the `MERCHANT.ONBOARDING.COMPLETED` event. Click **Refresh Capabilities** on the seller's dashboard tab to check for updates.

- **Use Delayed disbursement if you need fulfillment control.** Holding funds in escrow lets you verify an order is shipped or a digital product is delivered before releasing money to a seller.

- **Surcharges are applied on top of the order subtotal.** If you use both a percentage and fixed surcharge, both are added together. Make sure your surcharge is clearly disclosed to buyers to comply with PayPal's policies.

- **Keep Debug Mode off in production.** Debug logs can grow large quickly and may contain order details. Enable it only during active troubleshooting, then disable it again.

## Troubleshooting {#troubleshooting}

### PayPal Button or Card Fields Do Not Appear at Checkout {#button-not-appearing}

**Cause:** Missing or incorrect Partner Client ID, or the plugin is not enabled.

**Solution:**

1. Go to **J2Commerce -> Payments**.
2. Confirm **PayPal Complete Payments** shows a green checkmark.
3. Click the plugin name to open settings.
4. Verify the **Partner Client ID** field is filled in for the correct mode (live or sandbox).
5. Check that **Sandbox Mode** matches your intent — sandbox credentials in live mode (or vice versa) cause a silent failure.
6. Save the plugin and reload the checkout page.

---

### Order Status Does Not Update After Payment {#status-not-updating}

**Cause:** Webhook ID is missing, the webhook URL is unreachable, or the webhook subscription is not set up in the PayPal Developer Dashboard.

**Solution:**

1. In the PayPal Developer Dashboard, go to **My Apps & Credentials -> [Your App] -> Webhooks** and confirm a webhook exists pointing to your site's endpoint.
2. Confirm the **Webhook ID** field in J2Commerce matches the ID shown in the PayPal dashboard.
3. Make sure your site is publicly accessible — PayPal cannot deliver webhooks to a localhost or staging URL without a tunnel.
4. Enable **Debug Mode** temporarily and check the J2Commerce log for webhook verification errors.

---

### Seller Stuck in Pending After Onboarding {#seller-pending}

**Cause:** PayPal has not yet sent the `MERCHANT.ONBOARDING.COMPLETED` webhook, or the seller did not accept all required permissions during onboarding.

**Solution:**

1. Ask the seller to log into their PayPal account and confirm their email address.
2. Have the seller click **Connect / Re-connect PayPal** in their vendor profile and complete the onboarding form again, accepting all permission checkboxes.
3. After the seller completes the form, click **Refresh Capabilities** on their dashboard tab to pull the latest status from PayPal.
4. If the status remains Pending after several minutes, check the J2Commerce log for webhook delivery errors.

---

### Payment Captured but Seller Did Not Receive Funds {#seller-not-paid}

**Cause:** Disbursement Mode is set to **Delayed (Escrow)** and funds have not been manually released. Or the seller's `payments_receivable` flag is false.

**Solution:**

1. Go to **J2Commerce -> Orders** and open the order.
2. Check the **PayPal Complete Payments** card on the order detail screen for capture status.
3. If Disbursement Mode is Delayed, log into your PayPal dashboard to release the held funds to the seller.
4. If `payments_receivable` is false, the seller must complete their PayPal account setup (business verification, bank account connection). Click **Refresh Capabilities** to recheck.

---

### Sandbox Transactions Appearing in Live Mode {#sandbox-vs-live}

**Cause:** Sandbox Mode is still enabled after go-live, or live credentials were entered into the sandbox fields by mistake.

**Solution:**

1. Open the plugin settings.
2. Set **Sandbox Mode** to **No**.
3. Confirm your **Partner Client ID (Live)**, **Partner Client Secret (Live)**, and **Partner Merchant ID (Live)** contain your live (not sandbox) credentials.
4. Confirm the **Webhook ID (Live)** matches the webhook subscription in your live PayPal app, not the sandbox app.
5. Save and test with a small real transaction.

---

### Platform Fee Rejected or Capture Returns 422 Error {#partner-fee-rejected}

**Cause:** Your PayPal partner account is not enabled for platform fees, or the fee percentage produces an amount that exceeds PayPal's limits.

**Solution:**

1. Contact PayPal Partner Support to confirm your platform account is approved for `platform_fees` in purchase units.
2. Review the **Default Platform Fee (%)** value — extremely high percentages may be rejected by PayPal.
3. Enable **Debug Mode** and retry the transaction. The full PayPal API response appears in the J2Commerce log and will include the specific error detail from PayPal.

---

### Refund Fails with "Partner-fee refunds are not enabled" {#partner-fee-refund-disabled}

**Cause:** Your PayPal partner account does not have partner-fee refunds activated.

**Solution:**

1. Contact PayPal support and request that partner-fee refunds be enabled on your partner account.
2. Until enabled, you can issue refunds for the seller portion only. The platform fee portion must be refunded manually from the PayPal dashboard.

---

### Currency Mismatch Error at Checkout {#currency-mismatch}

**Cause:** The store currency set in J2Commerce does not match the currency your PayPal account is configured to accept.

**Solution:**

1. Go to **J2Commerce -> Setup -> Configuration** and check the store currency.
2. Log into your PayPal account and confirm that currency is enabled for receiving payments under **Account Settings -> Money, Banks, and Cards**.
3. If you need multiple currencies, enable them in your PayPal account before accepting orders in those currencies.
