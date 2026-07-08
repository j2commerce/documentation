---
title: "Nochex Payment"
sidebar_label: "Nochex"
sidebar_position: 108
description: "Accept UK payments through Nochex — a hosted redirect gateway with server-to-server APC verification. No saved cards, no API refunds. GBP-centric."
---

# Nochex Payment

The Nochex plugin connects your J2Commerce store to [Nochex](https://www.nochex.com), a UK-based hosted payment gateway. When a customer reaches the payment step, they are redirected to the secure Nochex payment page to enter their card details. After the payment is processed, Nochex sends an Automated Payment Confirmation (APC) directly to your store's server. J2Commerce verifies that APC with Nochex and only marks the order as paid once the verification passes and the amount matches.

:::info

Nochex is a UK-based gateway primarily designed for **GBP (British Pounds)**. Make sure your store currency and pricing are appropriate before enabling this plugin for live transactions.

:::

Key features:

- Hosted redirect — card details are entered on Nochex's servers, not yours
- APC (Automated Payment Confirmation) — server-to-server callback securely confirms every payment
- Amount verification — the plugin checks the APC amount against the order total before marking the order paid
- Idempotent processing — duplicate APC callbacks are safely acknowledged without creating double-charges
- Sandbox / test mode for testing without processing real payments
- Send Item Details — optionally send line-item data to Nochex for display on their payment page
- Geozone restriction — limit Nochex to shoppers in specific geographic regions
- Subtotal limits — set minimum and maximum order amounts for Nochex to appear at checkout
- Debug logging for troubleshooting

## Limitations

- **Redirect only** — there is no on-site card form. The customer always leaves your site to pay on Nochex.
- **No saved cards** — Nochex does not provide a card vault. Returning shoppers must enter their card details every time.
- **No API refunds** — the Nochex API does not support programmatic refunds. To refund a customer, log in to your Nochex merchant dashboard and process the refund there. Inside J2Commerce you can manually update the order status to Refunded for your own record-keeping, but no money is moved automatically.
- **No subscriptions** — recurring billing is not supported through this integration.

## Requirements

- PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x
- A Nochex merchant account (register at [nochex.com](https://www.nochex.com))
- Your store must be accessible over **HTTPS** on a publicly reachable domain (localhost cannot receive APC callbacks from Nochex)

## Get Your Nochex Merchant ID

Before you can configure the plugin, you need your Nochex Merchant ID. This is the email address (or account alias) you used when you registered your Nochex account.

1. Log in to your Nochex account at [https://www.nochex.com](https://www.nochex.com).
2. Go to your **Account Settings** or **Profile** to confirm your registered email address — this is your Merchant ID.
3. Note it down. You will paste it into the plugin settings.

## Purchase and Download

This payment method is a separate add-on available from the [J2Commerce website](https://www.j2commerce.com/). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [**J2Commerce** website](https://www.j2commerce.com/) **->** **Payments**.

**Step 2:** Locate the **Nochex Payment** method **->** click **View Details** **->** **Add to Cart -> Checkout**.

**Step 3:** Go to **My Downloads** under your profile button in the top-right corner and search for the add-on. Click **Available Versions -> View Files -> Download Now**.

## Install the Payment Method

You can install Nochex Payments using the Joomla installer.

In the Joomla admin, go to **System -> Install -> Extensions**.

Upload the plugin ZIP file, or use the **Install from URL** option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen with the Nochex zip file selected -->

The payment method installs and enables automatically.

## Enable the Payment Method

Once installed, make sure the method is enabled. There are **two** ways to reach it:

**Option A:** Go to the **J2Commerce** icon in the top-right corner **-> Payments -> Payment Methods**.

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Payments -> Payment Methods**.

<!-- SCREENSHOT: J2Commerce -> Payments -> Payment Methods list showing Nochex -->

Find **Nochex**, click the **X** next to it, and it will turn into a green checkmark. The method is now enabled and ready for setup.

##

## Configure the Payment Method

Click the **Nochex** title next to the green checkmark to open its settings.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the plugin will show a description below each field as you configure it.

:::

<!-- SCREENSHOT: Nochex plugin configuration screen, Credentials tab -->

### Credentials Tab

| Setting                 | Description                                                                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sandbox Mode**        | Set to **Yes** while testing. In this mode, payments are processed as sandbox transactions and no real money moves. Set to **No** when you are ready to accept real payments. |
| **Merchant ID**         | Your live Nochex merchant email address. Shown only when **Sandbox Mode** is **No**.                                                                                          |
| **Sandbox Merchant ID** | Your sandbox Nochex merchant email address for testing. Shown only when **Sandbox Mode** is **Yes**.                                                                          |
| **APC Callback URL**    | Read-only. This is the URL Nochex will POST payment confirmations to. Copy this value and paste it into your Nochex account APC settings.                                     |
| **Debug Mode**          | Set to **Yes** to log APC requests and responses to the Joomla log file. Turn on only when troubleshooting — disable on live stores.                                          |

:::important
The **APC Callback URL** must be entered into your Nochex account before you go live. Without it, Nochex cannot confirm payments and orders will stay in a pending state. See [Register the Callback URL](#register-the-callback-url) below.
:::

<!-- SCREENSHOT: Nochex plugin Credentials tab showing all fields including the read-only APC Callback URL -->

### Display Tab

| Setting                 | Description                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Display Name**        | The name shown to shoppers at checkout (for example, "Credit / Debit Card" or "Nochex").                                                 |
| **Display Image**       | An optional logo shown next to the method at checkout. Upload via the Joomla Media Manager.                                              |
| **Show Dashboard Icon** | Set to **Yes** to show a shortcut icon on the J2Commerce dashboard.                                                                      |
| **Template**            | The checkout layout style. Leave this on **Bootstrap5** unless your store template uses **UIkit**.                                       |
| **Pay Button Text**     | Override the default "Pay Now" button label shown on the pre-redirect step. Leave blank to use the default.                              |
| **Send Item Details**   | Set to **Yes** to send a line-item XML collection to Nochex so your product names, quantities, and amounts appear on their payment page. |

:::warning
Leave **Template** set to a value (the default is **Bootstrap5**). If it is left blank, the pre-redirect form will not display correctly at checkout.
:::

<!-- SCREENSHOT: Nochex plugin Display tab -->

### Restrictions Tab

| Setting                 | Description                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| **Geozone**             | Limit Nochex to shoppers within a specific geozone. Leave blank to offer it to everyone. |
| **Minimum Order Total** | Hide this method when the order total is below this amount. Leave blank for no minimum.  |
| **Maximum Order Total** | Hide this method when the order total exceeds this amount. Leave blank for no maximum.   |

### Order Statuses Tab

These settings control which J2Commerce order status is applied at each stage of the payment.

| Setting                      | Description                                                                                                            | Suggested Status |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **Confirmed Payment Status** | Applied when the Nochex APC confirms the payment as AUTHORISED.                                                        | Confirmed        |
| **Pending Payment Status**   | Applied immediately after the shopper is redirected to Nochex, before payment is confirmed.                            | Pending          |
| **Failed Payment Status**    | Applied when the APC verification fails or Nochex returns a non-authorised response.                                   | Failed           |
| **Refunded Status**          | Applied manually when you mark an order as refunded in J2Commerce after processing the refund in the Nochex dashboard. | Refunded         |

Click **Save** to apply your changes.

<!-- SCREENSHOT: Nochex plugin Order Statuses tab with all four dropdowns populated -->

## Register the Callback URL

The APC Callback URL is how Nochex tells your store that a payment was completed. You must add this URL to your Nochex account settings, otherwise payments will never be confirmed automatically.

**Step 1:** In the plugin **Credentials** tab, find the **APC Callback URL** field. It looks similar to:

`https://yourstore.com/index.php?option=com_ajax&format=raw&group=j2commerce&plugin=Payment_nochex&task=apc`

**Step 2:** Select the entire URL and copy it (or click the **Copy** button next to the field).

**Step 3:** Log in to your Nochex merchant account at [https://www.nochex.com](https://www.nochex.com).

**Step 4:** Navigate to your account settings and find the **APC / Callback URL** or **Automated Payment Confirmation** section.

**Step 5:** Paste the copied URL and save your Nochex settings.

<!-- SCREENSHOT: Nochex merchant account settings page with the APC URL field highlighted -->

:::note

The exact location of the APC URL setting inside Nochex depends on your account type. Check Nochex's own help documentation if you cannot find it, or contact Nochex support directly — they may need to enable the APC feature for your account.

:::

## How Checkout Works

1. The shopper adds products to the cart and goes to checkout.
2. They choose **Nochex** (or whatever you set as the **Display Name**) as the payment method.
3. A brief redirect page appears with a **Pay Now** button.
4. The shopper clicks **Pay Now** and is taken to the secure Nochex payment page.
5. The shopper enters their card details and completes the payment on Nochex's servers.
6. Nochex sends a server-to-server APC callback to your store. J2Commerce verifies it, checks the amount, and updates the order status.
7. The shopper is returned to your store and sees the order confirmation.

:::info

NOTE: The shopper's card details never reach your website. They are entered directly on Nochex's PCI-compliant payment page.

:::

<!-- SCREENSHOT: Checkout confirm step showing the Nochex redirect button -->

## Processing Refunds

Nochex does not provide an API for refunds. To refund a customer:

1. Log in to your **Nochex merchant dashboard** at [https://www.nochex.com](https://www.nochex.com).
2. Find the transaction and process the refund there.
3. Once the refund is complete in Nochex, return to J2Commerce.
4. Open the order in **J2Commerce -> Sales -> Orders**.
5. Click **Mark as Refunded** to update the order status for your own records.

J2Commerce does not initiate the refund — it only lets you update the order status after you have completed the refund in the Nochex dashboard.

<!-- SCREENSHOT: Order screen showing the Nochex Mark as Refunded button -->

## Testing Before Going Live

Before accepting real payments, test the complete checkout flow in sandbox mode.

**Step 1:** In the plugin **Credentials** tab, switch **Sandbox Mode** to **Yes**.

**Step 2:** Enter your Nochex email in the **Sandbox Merchant ID** field.

**Step 3:** Save the plugin settings.

**Step 4:** Place a test order on your store. At checkout, select **Nochex** and proceed. You will be redirected to the Nochex payment page.

**Step 5:** Complete the payment using Nochex's test card details (available from your Nochex merchant dashboard or Nochex support documentation).

**Step 6:** After the payment, return to J2Commerce and check that the order status updated to your configured **Confirmed Payment Status**.

**Step 7:** If the status did not update, confirm the APC URL is registered in your Nochex account and that your site is publicly accessible over HTTPS.

**Step 8:** Once testing is complete, switch **Sandbox Mode** back to **No** and save.

:::warning
Always complete at least one successful test in **Sandbox Mode** before switching to live payments.
:::

<!-- SCREENSHOT: A completed test order in J2Commerce showing the Confirmed status -->

## Tips

- **Register the APC URL first** — Nothing will work until the Callback URL is saved in your Nochex account. Do this before testing.
- **Use HTTPS** — Nochex's servers cannot reach a plain HTTP or localhost address. Your store must be live on a public HTTPS domain.
- **Set min/max subtotals** — If you offer other payment methods, use the subtotal limits to control when Nochex appears.
- **Enable Debug Mode during testing** — The Joomla log will show exactly what Nochex sent and whether the APC verification passed.
- **Test with the exact amount** — Nochex verifies the amount to the penny. Make sure your store prices in GBP match what Nochex expects.

## Troubleshooting

### Orders Stay in Pending Status After the Shopper Pays

**Cause:** Nochex cannot reach your store's APC Callback URL to send the payment confirmation.

**Solution:**

1. Open the plugin **Credentials** tab and copy the **APC Callback URL**.
2. Log in to your Nochex account and confirm this URL is saved in your APC settings.
3. Confirm your store is accessible over HTTPS from a public URL — Nochex cannot reach a localhost or intranet address.
4. Enable **Debug Mode** in the plugin **Credentials** tab, place a test order, and check the Joomla log (**System -> Logs**) for APC-related entries.

### The Order Status Is Set to Failed Even Though I Completed the Payment

**Cause:** The APC verification may have failed because the re-POST check was not authorised by Nochex, or the amount returned by Nochex did not match the order total.

**Solution:**

1. Enable **Debug Mode** in the plugin **Credentials** tab.
2. Place a new test order and check the Joomla log for APC detail messages including the amount Nochex returned and the amount J2Commerce expected.
3. Confirm there are no currency conversion discrepancies — Nochex is GBP-centric and the amounts must match within £0.01.
4. If the amounts do not match, check that your store's displayed prices match what Nochex was sent.

### Nochex Does Not Appear at Checkout

**Cause:** The geozone restriction, subtotal limits, a missing Merchant ID, or the method being disabled may be hiding the payment option.

**Solution:**

1. Go to **J2Commerce -> Payments -> Payment Methods** and confirm **Nochex** shows a green checkmark.
2. Open the method and check the **Restrictions** tab — confirm the geozone includes the customer's billing country, and that the order subtotal is within any configured min/max limits.
3. Check the **Credentials** tab — confirm the **Merchant ID** field is not empty.
4. If **Sandbox Mode** is on, confirm the **Sandbox Merchant ID** is also filled in.

### The APC URL Cannot Be Reached from a Local Development Environment

**Cause:** Nochex's servers cannot POST to localhost or a private IP address.

**Solution:** Use a tunnelling service such as ngrok to create a public HTTPS URL pointing to your local site. Enter the ngrok URL as the APC Callback URL in your Nochex account for testing only. Switch back to your real site URL before going live.

### I Cannot Find Where to Add the APC URL in My Nochex Account

**Solution:** Log in to [https://www.nochex.com](https://www.nochex.com) and look under your **Account Settings** for a section labelled **APC**, **Callback URL**, or **Automated Payment Confirmation**. If you cannot find it, contact Nochex support directly — the exact location varies by account type and Nochex may need to enable the APC feature for your account.

## Related Topics

- [Payment Methods Overview](./index.md)
- [Geozones](../setup/geozones.md)
- [Order Statuses](../sales/order-statuses.md)
