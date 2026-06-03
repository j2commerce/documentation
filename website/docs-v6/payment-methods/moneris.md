---
title: "Moneris Checkout"
sidebar_label: "Moneris"
sidebar_position: 55
description: "Accept credit card payments from Canadian customers through the Moneris Checkout hosted iframe. Card data never touches your server — full SAQ-A PCI scope."
---

# Moneris Checkout

Moneris is the most widely used payment processor in Canada, handling more credit and debit card transactions than any other gateway in the country. The J2Commerce Moneris Checkout plugin uses Moneris's hosted iframe integration: when a customer reaches the payment step, a secure payment form loads directly inside your checkout page. The form is served and hosted entirely by Moneris — card details are entered there, not on your server.

**SAQ-A PCI scope.** Because card data is entered inside the Moneris-hosted iframe and never reaches your server, your store qualifies for the simplest PCI DSS compliance path (SAQ-A). You do not need to handle, transmit, or store card numbers.

> **Currency requirement:** The plugin sends the order total in your store's display currency. Moneris settles in the currency configured on your Moneris merchant account. **Your store's display currency must match the currency your Moneris account is set up to accept.** If they differ, Moneris will either decline the transaction or settle at an unexpected rate. See [Currency Mismatch](#currency-mismatch) in the Troubleshooting section.

## Prerequisites

- J2Commerce installed and active
- A Moneris merchant account (Canadian merchants)
- A **Moneris Checkout profile** created in the Moneris Merchant Resource Center (MRC) — this is where you get your Checkout ID
- Your **Store ID** and **API Token** from Moneris
- Your store running over HTTPS (SSL certificate installed)
- The Moneris Checkout plugin purchased from the [J2Commerce Extensions Store](https://www.j2commerce.com)

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

1. Purchase and download the `payment_moneris.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `payment_moneris.zip` package file.
4. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extensions installer showing the payment_moneris.zip upload confirmation -->

## Where to Find Your Moneris Credentials

Before configuring the plugin you need three values from Moneris. Log in to the **Moneris Merchant Resource Center** (MRC) at [moneris.com](https://www.moneris.com) (or the test MRC at [esqa.moneris.com](https://esqa.moneris.com) for test credentials).

| Credential      | Where to find it                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| **Store ID**    | Shown on the MRC home screen and in the "My Store" section                                                |
| **API Token**   | **Admin** -> **Store Settings** -> **API Token**                                                          |
| **Checkout ID** | **Admin** -> **Moneris Checkout Configurator** — create a new profile or copy the ID from an existing one |

The Checkout ID comes from the **Checkout Configurator** inside the MRC. If you have not created a profile yet, create one there first. The configurator lets you set your store logo, accepted card types, and language preferences for the hosted form. Once the profile is saved, the Configurator lists its **Checkout ID** — copy that value.

For test mode, Moneris provides a separate set of test credentials accessible through the **test MRC** at `esqa.moneris.com`. Test credentials are completely separate from live credentials.

## Setup

### Step 1: Open the Plugin Configuration

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods**.
2. Find **Moneris** (or **Credit Card (Moneris)**) in the list and click its name to open the configuration.

<!-- SCREENSHOT: J2Commerce Payment Methods list with the Moneris row highlighted -->

### Step 2: Set Mode and Enter Your Credentials

Fill in the following fields:

| Field           | What to enter                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **Mode**        | Set to **Test** while configuring. Switch to **Live** only when you are ready to accept real payments. |
| **Store ID**    | Your Moneris Store ID                                                                                  |
| **API Token**   | Your Moneris API Token                                                                                 |
| **Checkout ID** | The Checkout ID from the Moneris Checkout Configurator                                                 |

<!-- SCREENSHOT: Moneris plugin configuration showing Mode, Store ID, API Token, and Checkout ID fields -->

When **Mode** is **Test**, all transactions go to the Moneris QA gateway (`gatewayt.moneris.com`) using your test credentials. When it is **Live**, transactions go to the production gateway (`gateway.moneris.com`). Use your test Store ID, test API Token, and test Checkout ID while in Test mode — the test MRC at `esqa.moneris.com` provides these.

### Step 3: Configure Order Statuses

:::info

NOTE: If the status you want isn't listed in the dropdown menu, you can create a new one by going to **J2Commerce -> Setup -> Order Statuses**

:::

These two fields control which J2Commerce order status is applied after Moneris reports a result.

| Field                       | Default   | When it is applied                              |
| --------------------------- | --------- | ----------------------------------------------- |
| **Payment Received Status** | Confirmed | Moneris approves the payment                    |
| **Payment Failed Status**   | Failed    | Moneris declines the payment or an error occurs |

The defaults work for most stores. Only change them if your store uses custom order statuses or a different workflow for approved and declined payments.

### Step 4: (Optional) Add a Surcharge

If your payment processing agreement permits passing a fee to customers, you can add a surcharge for Moneris payments. All three surcharge fields are optional — leave them blank to charge no fee.

| Field                   | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| **Surcharge Name**      | Label shown on the order summary (for example, "Card Processing Fee") |
| **Surcharge Percent**   | Percentage of the order total added as a fee                          |
| **Surcharge Fixed**     | Fixed dollar amount added as a fee                                    |
| **Surcharge Tax Class** | Tax profile applied to the surcharge amount                           |

Percentage and fixed amounts are combined: a 2% surcharge plus a $0.30 fixed fee both apply when both fields are filled in.

> Before enabling a surcharge, check with your payment processor and confirm it is permitted under your merchant agreement and local regulations. In Canada, surcharging rules vary by card brand and province.

### Step 5: (Optional) Restrict by Geo Zone

The **Geo Zone Restriction** field limits which customers see Moneris as a payment option. Leave it blank to make Moneris available to all customers. To restrict it — for example, to Canadian customers only — select the appropriate geo zone from the list.

Geo zones are configured under **J2Commerce** -> **Localization** -> **Geo Zones**.

### Step 6: (Optional) Set a Thank You Article

The **Thank You Article** field lets you display a Joomla article on the post-payment confirmation screen alongside the order summary. This is useful for order instructions, next-step information, or a welcome message. Click the article selector to browse your Joomla articles.

### Step 7: Review Customer Messages

These text fields control what customers read at each stage of the payment process. The defaults are reasonable — feel free to leave them as is or adjust the wording to match your store's tone.

| Field              | When it appears                                                             | Default                                                                                  |
| ------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **On Selection**   | When the customer picks Moneris as their payment method in the payment list | *(empty)*                                                                                |
| **Before Payment** | Above the Moneris hosted form on the confirm step                           | "Please complete your payment in the secure form below."                                 |
| **After Payment**  | On the confirmation screen after a successful payment                       | "Thank you. Your payment was received."                                                  |
| **On Cancel**      | When the customer cancels on the Moneris hosted form                        | "Your payment was cancelled. Your order has not been paid."                              |
| **On Error**       | When the gateway returns an error or the payment cannot be processed        | "The payment could not be processed. Please try again or choose another payment method." |

### Step 8: Configure Remaining Options

| Field                        | Description                                                                                                   | Default               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------- |
| **Button Text**              | Label on the submit button at the confirm step                                                                | Place Order           |
| **Error Notification Group** | Joomla user group whose members (with system emails enabled) receive an alert when a payment fails validation | Super Users (group 8) |
| **Debug Logging**            | Write gateway requests and responses to the Joomla log. No card data or credentials are ever logged.          | No                    |
| **Template**                 | Frontend display style — **Bootstrap 5** (default) or **UIkit**                                               | Bootstrap 5           |

### Step 9: Save and Test

1. Click **Save** in the toolbar.
2. Place a test order using the Moneris QA test cards (see [Test Mode and Test Cards](#test-mode-and-test-cards) below).
3. Confirm the Moneris iframe loads at the confirm step, the test payment completes, and the order status updates correctly in **J2Commerce** -> **Orders**.
4. When you are satisfied the flow is working, return to the plugin configuration, set **Mode** to **Live**, enter your live credentials, and click **Save** again.

<!-- SCREENSHOT: Moneris plugin configuration with Save button in the toolbar -->

## All Configuration Fields

### Gateway Credentials

| Field             | Description                                                | Default               |
| ----------------- | ---------------------------------------------------------- | --------------------- |
| **Display Name**  | Payment method label shown to customers at checkout        | Credit Card (Moneris) |
| **Display Image** | Optional logo or icon shown beside the payment method name | *(empty)*             |
| **Mode**          | Test or Live                                               | Test                  |
| **Store ID**      | Your Moneris Store ID                                      | *(empty)*             |
| **API Token**     | Your Moneris API Token                                     | *(empty)*             |
| **Checkout ID**   | The Checkout ID from the Moneris Checkout Configurator     | *(empty)*             |

### Order Status Mapping

| Field                       | Description                                             | Default   |
| --------------------------- | ------------------------------------------------------- | --------- |
| **Payment Received Status** | Status applied when Moneris approves the payment        | Confirmed |
| **Payment Failed Status**   | Status applied when Moneris declines or an error occurs | Failed    |

### Surcharge (Optional)

| Field                   | Description                                                    | Default   |
| ----------------------- | -------------------------------------------------------------- | --------- |
| **Surcharge Name**      | Label on the order summary line for the surcharge              | *(empty)* |
| **Surcharge Percent**   | Percentage of the order subtotal plus shipping to add as a fee | *(empty)* |
| **Surcharge Fixed**     | Fixed amount to add as a fee                                   | *(empty)* |
| **Surcharge Tax Class** | Tax profile to apply to the surcharge                          | *(empty)* |

### Restrictions

| Field                    | Description                                                                                                                         | Default   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **Geo Zone Restriction** | Show this payment method only to customers whose billing address falls within the selected geo zone. Leave blank for all customers. | *(empty)* |

### Confirmation Page

| Field                 | Description                                                  | Default   |
| --------------------- | ------------------------------------------------------------ | --------- |
| **Thank You Article** | Joomla article shown on the post-payment confirmation screen | *(empty)* |

### Customer Messages

| Field              | Description                                                         | Default                                                                                  |
| ------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **On Selection**   | Message shown when the customer selects Moneris                     | *(empty)*                                                                                |
| **Before Payment** | Message shown above the secure iframe on the confirm step           | "Please complete your payment in the secure form below."                                 |
| **After Payment**  | Message shown on the confirmation screen after a successful payment | "Thank you. Your payment was received."                                                  |
| **On Cancel**      | Message shown when the customer cancels on the Moneris hosted form  | "Your payment was cancelled. Your order has not been paid."                              |
| **On Error**       | Message shown when the gateway returns an error                     | "The payment could not be processed. Please try again or choose another payment method." |

### Button

| Field           | Description                | Default     |
| --------------- | -------------------------- | ----------- |
| **Button Text** | Label on the submit button | Place Order |

### Admin Notifications

| Field                        | Description                                                                                               | Default     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| **Error Notification Group** | Joomla user group whose members (with system emails enabled) receive an email when a payment error occurs | Super Users |

### Diagnostics

| Field             | Description                                                                                                              | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ | ------- |
| **Debug Logging** | Write gateway communication details to the Joomla log for troubleshooting. No card data or API secrets are ever written. | No      |

### Appearance

| Field        | Description                                    | Default     |
| ------------ | ---------------------------------------------- | ----------- |
| **Template** | Frontend template style — Bootstrap 5 or UIkit | Bootstrap 5 |

## How a Customer Pays

Here is what your customers experience from the moment they reach the payment step:

1. The customer reaches the payment step of checkout and selects **Moneris** (or your configured display name) as their payment method.
2. The customer proceeds to the **Confirm** step. J2Commerce calls the Moneris API server-side to create a payment session ticket, then injects the Moneris hosted payment form directly into the confirm page as a secure iframe.
3. A loading spinner appears briefly while the iframe initialises. Once ready, the Moneris-hosted card entry fields appear inside the iframe — the customer sees a clean payment form styled by Moneris.
4. The customer enters their card details entirely within the Moneris-hosted iframe. None of this information reaches your server.
5. The customer clicks **Place Order** (or your configured button text). The Moneris iframe submits the card details directly to Moneris.
6. Moneris processes the payment and signals the result back to the page. Your store's JavaScript picks this up and calls J2Commerce server-side to verify the result with Moneris directly.
7. J2Commerce calls the Moneris API a second time to fetch the authoritative payment receipt. The result is confirmed server-side — the order status is never set based on what the browser reports alone.
8. If approved, J2Commerce updates the order to your **Payment Received Status**, clears the cart, sends the confirmation email, and redirects the customer to the confirmation page.
9. If declined, J2Commerce updates the order to your **Payment Failed Status**, sends an admin error notification if configured, and shows the **On Error** message.

You do not need to configure any return URLs in your Moneris Checkout profile — the plugin generates them automatically for each transaction.

<!-- SCREENSHOT: Moneris hosted iframe loaded on the J2Commerce confirm step, showing the card entry fields -->

## Security

**Card data is entered entirely on Moneris infrastructure.** The Moneris Checkout integration uses a hosted iframe, which means:

- The card number, expiry date, and CVV are typed into a page served by Moneris, not your Joomla server.
- Your server never receives, processes, or stores card data.
- Your store qualifies for **SAQ-A PCI scope** — the least burdensome PCI DSS compliance tier for card-not-present merchants.

Additional security measures built into the plugin:

- **Server-authoritative receipt verification.** After Moneris processes the payment, J2Commerce calls the Moneris API directly to retrieve the official receipt. The order status is only updated based on this verified server response — not on anything the browser sends.
- **Amount cross-check.** When the Moneris receipt includes the charged amount, the plugin verifies it matches the order total (within $0.01). A mismatch rejects the payment and alerts the admin group you configured.
- **Safe logging.** When Debug Logging is enabled, only safe response fields (ticket ID, result code, response message) are written to the Joomla log. Your Store ID, API Token, and any card data are never logged.
- **Session token protection.** The payment confirmation call is protected by a Joomla session token generated at preload time, providing defence in depth against cross-site request forgery.

## Test Mode and Test Cards

Moneris provides a fully functional QA (test) environment. Set **Mode** to **Test** and use your test credentials from the Moneris test MRC at `esqa.moneris.com`.

Moneris publishes test card numbers in their developer documentation. Common ones include:

| Card Number        | Result                |
| ------------------ | --------------------- |
| `4242424242424242` | Approved (Visa)       |
| `5454545454545454` | Approved (Mastercard) |
| `4242424242424291` | Declined              |

Use any future expiry date (for example, `12/27`) and any three-digit CVV. For the current complete list of Moneris test cards and response codes, refer to the [Moneris Developer Centre](https://developer.moneris.com) documentation for Moneris Checkout.

Always run several test transactions — at least one approval and one decline — before switching to **Live** mode. Verify the correct order status appears in **J2Commerce** -> **Orders** for each result.

## What Is New vs the J2Store Version

The J2Commerce 6 version of this plugin is a full rewrite, not a port. Notable improvements include:

- **Native Joomla 6 MVC architecture.** No more FOF 2 dependency — the plugin uses namespaced classes, Joomla's service container, and the event subscriber interface.
- **Vanilla JavaScript.** jQuery has been removed. The iframe boot script is plain ES6, loaded via the Joomla Web Asset Manager with proper `defer` handling. The inline script workaround from J2Store (which did not work on J2Commerce's checkout because the confirm step is injected via innerHTML) is replaced with a `MutationObserver` pattern that reliably boots the Moneris SDK even after the step is dynamically inserted.
- **Configurable order statuses.** The J2Store version had hardcoded status IDs. You can now choose your Payment Received Status and Payment Failed Status from a dropdown of all your J2Commerce order statuses.
- **Optional surcharge.** The J2Store version had no surcharge support. You can now optionally pass a percentage fee, a fixed fee, or both to customers who pay by Moneris.
- **Geo zone restriction.** Limit Moneris to customers in specific countries or regions using J2Commerce geo zones.
- **Server-side receipt re-verification.** Every payment result is confirmed by a server-to-server Moneris API call, not by the browser-reported outcome alone.
- **Amount cross-check.** Detects and rejects payments where the Moneris receipt reports a different amount than the order total.
- **Safe logging.** Debug mode logs gateway communication details with no card data or API secrets included.
- **Bootstrap 5 and UIkit templates.** Both front-end framework templates are included. Select the one that matches your active J2Commerce app.

## Troubleshooting

### Payment form does not load

The Moneris iframe appears as a blank area, a loading spinner that never disappears, or does not appear at all.

**Cause:** The Moneris Checkout preload request failed — usually because one or more credentials are incorrect, the Mode is set to Test but you are using live credentials (or vice versa), or the Checkout ID does not match an active profile on the selected environment.

**Solution:**

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods** and open the Moneris configuration.
2. Enable **Debug Logging** and click **Save**.
3. Attempt a checkout. Then go to **System** -> **Logs** and look for the log category `plg_j2commerce_payment_moneris`.
4. The log will show the preload request outcome. Look for a message saying "Preload failed" — the details alongside it will indicate whether the credentials were rejected.
5. Double-check that your **Store ID**, **API Token**, and **Checkout ID** exactly match what is shown in the Moneris Merchant Resource Center.
6. Confirm **Mode** is set correctly: **Test** credentials only work against the Moneris QA gateway (`esqa.moneris.com`); **Live** credentials only work against the production gateway (`gateway.moneris.com`).
7. Log in to the Moneris MRC (or test MRC) and confirm the Checkout profile tied to your Checkout ID is active and published.

<!-- SCREENSHOT: Joomla System Logs screen filtered to the plg_j2commerce_payment_moneris category -->

### Payment not approved (card declined)

The customer submits the form and sees the **On Error** message, or the order is moved to the failed status.

**Cause:** Moneris declined the transaction. This can happen for many reasons — insufficient funds, an expired card, an incorrect CVV, or AVS address mismatch.

**Solution:**

- In **Test mode**, verify you are using the correct test card numbers from the Moneris developer documentation. Not all random card numbers produce approvals in the QA environment.
- Enable **Debug Logging** and review the `plg_j2commerce_payment_moneris` log for the `result` and `response_code` fields. Moneris result codes are documented in the [Moneris Developer Centre](https://developer.moneris.com).
- In **Live mode**, the customer should try a different card or contact their bank.

### Currency mismatch

Customers see a gateway error, or payments are approved but for an unexpected amount.

**Cause:** Your store's display currency does not match the currency configured on your Moneris merchant account. The plugin sends the order total in your store's display currency — it does not perform any currency conversion. Moneris expects the amount in the settlement currency of the account.

**Solution:**

1. Log in to your Moneris MRC and confirm the settlement currency of your account (typically CAD for Canadian merchants).
2. In J2Commerce, go to **J2Commerce** -> **Localization** -> **Currencies** and verify that the currency set as **Default** matches the Moneris settlement currency.
3. If your store displays prices in a currency other than your Moneris settlement currency, you must either reconfigure the store default currency or use a gateway that supports multi-currency settlement.

### Checkout redirects back with an error after the payment form

The customer completes the Moneris form but is redirected back to the checkout with an error message instead of the confirmation page.

**Cause:** The receipt verification step failed. This can happen if the session expired between preload and the return call, or if the Moneris API returned an unexpected response shape.

**Solution:**

1. Enable **Debug Logging**, attempt the transaction again, and review the `plg_j2commerce_payment_moneris` log.
2. Look for a "Process" log entry — the details will indicate whether the receipt call returned an error or an unexpected result code.
3. Check that your server can reach `gateway.moneris.com` (or `gatewayt.moneris.com` in test mode) over port 443. Some hosting environments block outbound cURL connections to external servers. Ask your host to confirm outbound HTTPS connections are permitted.
4. If the log shows an amount mismatch error, see [Currency Mismatch](#currency-mismatch) above.

### Debug log location

When **Debug Logging** is enabled, log entries are written to the Joomla log system under the category `plg_j2commerce_payment_moneris`.

To view them:

1. Go to **System** -> **Logs** in the Joomla administrator.
2. Filter by **Category** = `plg_j2commerce_payment_moneris`.

Alternatively, Joomla log files are written to the logs directory configured in your Joomla Global Configuration (by default `[joomla_root]/logs/`). Look for a file named `plg_j2commerce_payment_moneris.php`.

> No card data, Store ID, or API Token is ever included in debug log entries. It is safe to share log output with support staff.

## Related Topics

- [Payment Methods Overview](./index.md)
- [Order Statuses](../sales/order-statuses.md)
- [Geo Zones](../localization/geo-zones.md)
- [Currencies](../localization/currencies.md)
