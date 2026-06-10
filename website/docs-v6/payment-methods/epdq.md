---
title: "ePDQ / Worldline Hosted Payment Page"
sidebar_label: "ePDQ (Worldline)"
sidebar_position: 88
description: "How to configure the Worldline ePDQ (formerly Barclays ePDQ) payment gateway plugin for J2Commerce. Covers SHA-IN/SHA-OUT signing, test mode, order status mapping, admin error emails, and troubleshooting."
---

# ePDQ / Worldline Hosted Payment Page

> **Legacy gateway — existing merchants only.** Barclays sold ePDQ to Worldline in 2023. Existing ePDQ merchant accounts continue to function under Worldline branding. If you do not already hold an ePDQ PSPID, contact Worldline directly for current payment gateway options. This plugin is for merchants with active ePDQ credentials.

This plugin connects J2Commerce to the Worldline ePDQ Hosted Payment Page (HPP). Customers are redirected from your checkout to the ePDQ secure payment page, where they enter their card details. After payment, ePDQ redirects them back to your store and optionally sends a server-to-server notification to confirm the transaction.

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce component.

***

## What is ePDQ?

ePDQ is a payment gateway originally launched by Barclays Merchant Services for UK and European merchants. In 2023, Barclays sold the ePDQ product to Worldline, the pan-European payment processor. Under Worldline, the gateway continues to operate with the same API and back-office interface. Existing merchants simply use their same PSPID credentials — no migration is required.

**New merchant accounts** are now managed through Worldline's standard onboarding process. If you are setting up a new store, contact Worldline directly to obtain ePDQ / Worldline e-Commerce credentials.

***

## How it works

1. Customer reaches the payment step in checkout.
2. J2Commerce generates a signed POST form with the order details and SHA-IN hash.
3. Customer is redirected to the ePDQ Hosted Payment Page at `payments.epdq.co.uk`.
4. Customer enters card details on the ePDQ-hosted page (no card data touches your server).
5. ePDQ processes the payment and sends a server-to-server notification to your site (`paction=process`).
6. Your site verifies the SHA-OUT signature and updates the order status.
7. ePDQ redirects the customer back to your thank-you page (`paction=display_message`).

**PCI scope: SAQ-A.** Card data never passes through your server. This is the lowest PCI compliance burden.

***

## Prerequisites

- An active ePDQ / Worldline merchant account with a valid PSPID
- SHA-IN and SHA-OUT passphrases configured in your ePDQ back-office
- Hash algorithm (SHA-1, SHA-256, or SHA-512) selected and matching in both ePDQ back-office and this plugin

***

## Installation

1. Download the `plg_j2commerce_payment_epdq` package from your J2Commerce account.
2. In Joomla: **System → Install → Extensions** and upload the package.
3. Go to **System → Plugins**, search for "ePDQ", and enable the plugin.
4. Open the plugin parameters and enter your credentials (see Configuration below).

***

## Configuration

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

Navigate to **System → Plugins → J2Commerce - ePDQ Payment** to configure the plugin.

### Gateway credentials

| Field                         | Description                                                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Merchant PSPID**            | Your ePDQ merchant account identifier (PSPID).                                                                                                                      |
| **SHA-IN Passphrase**         | The secret passphrase configured in your ePDQ back-office under **Configuration → Technical information → Global transaction parameters → Hash algorithm** section. |
| **SHA-OUT Passphrase**        | The secret passphrase configured in your ePDQ back-office under **Configuration → Technical information → Transaction feedback** section.                           |
| **Hash Algorithm**            | Must match the algorithm selected in your ePDQ back-office. SHA-256 or SHA-512 recommended. SHA-1 is available for legacy accounts.                                 |
| **Validate SHA-OUT Response** | Verify the signature on every gateway response. **Strongly recommended.** Disable only for debugging.                                                               |

### Test mode

| Field                | Description                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| **Use Test Account** | Routes transactions to `mdepayments.epdq.co.uk` (test environment). Disable for live payments. |

When test mode is enabled, you can also override any gateway credential with a sandbox equivalent by adding the prefix `sandbox_` to the parameter name in the XML (advanced use only).

### Payment page customisation

| Field                  | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| **Payment Page Title** | Optional title displayed at the top of the ePDQ Hosted Payment Page. |
| **Custom Logo URL**    | URL of your logo to display on the payment page. **Must use HTTPS.** |
| **Background Colour**  | Hex colour for the ePDQ payment page background (e.g. `#0055B3`).    |

### Order statuses

| Field                        | Default   | Description                                                                                                                                               |
| ---------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Confirmed Payment Status** | Confirmed | Applied when ePDQ returns STATUS 5 (Authorized) or STATUS 9 (Payment Requested).                                                                          |
| **Pending Payment Status**   | Pending   | Applied when ePDQ returns STATUS 51 (Authorization Waiting) or STATUS 91 (Payment Processing). The customer has been charged but confirmation is delayed. |
| **Failed Payment Status**    | Failed    | Applied when ePDQ returns any other status, including declined and cancelled transactions.                                                                |

:::info

NOTE: If the status you want isn't listed in the dropdown menu, you can create a new one by going to **J2Commerce -> Setup -> Order Statuses**

:::

![](/img/shipstation-order-status2-1.webp)

### Email notifications

| Field                 | Description                                                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Admin Email Group** | Joomla user group to notify by email when payment validation fails (e.g. SHA signature mismatch, invalid order ID). Defaults to the Super Users group. |

### Surcharges

| Field                    | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| **Surcharge Name**       | Label shown to customers for the surcharge line item. |
| **Surcharge Percentage** | Percentage of order total to add as a surcharge.      |
| **Surcharge Fixed**      | Fixed amount to add as a surcharge.                   |
| **Surcharge Tax Class**  | Tax profile to apply to the surcharge amount.         |

### Messaging

| Field                      | Description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| **On Selection Text**      | Text displayed when the customer selects ePDQ as their payment method at checkout. |
| **On Before Payment Text** | Text displayed on the pre-payment confirmation step.                               |
| **On After Payment Text**  | Text displayed on the thank-you page after successful payment.                     |
| **On Cancel Text**         | Text displayed when the customer cancels payment on the ePDQ page.                 |
| **On Error Text**          | Text displayed when an error occurs during payment processing.                     |
| **Button Text**            | Label for the "Proceed to payment" button. Default: "Place Order".                 |
| **Thank-You Article**      | Optionally display a Joomla article as a thank-you message after payment.          |

### Other settings

| Field                      | Description                                                                                                                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Geographic Restriction** | Limit this payment method to customers within a specific geo-zone.                                                                                                                      |
| **Support Subscriptions**  | Allow this payment method for subscription products. Because ePDQ HPP cannot store card tokens, subscription renewal must be handled manually or via bank mandate. Disabled by default. |
| **Debug Mode**             | Logs SHA-IN and SHA-OUT details to Joomla's log system (category: `plg_j2commerce_payment_epdq`). **Disable in production.**                                                            |

***

## ePDQ back-office configuration

These settings must be configured in your ePDQ back-office to match the plugin.

### Technical information → Global transaction parameters

- **Hash algorithm:** Select SHA-1, SHA-256, or SHA-512. Must match the **Hash Algorithm** plugin parameter.
- **SHA-IN pass phrase:** Enter your SHA-IN passphrase here. Must match the **SHA-IN Passphrase** plugin parameter.

### Technical information → Transaction feedback

- **HTTP redirection in the browser:** Not used (the plugin uses server-to-server notification).
- **Direct HTTP server-to-server request:**

  - **Timing:** "Always deferred" or "Always online" — both work.
  - **URL of the page:** `https://yoursite.com/index.php?option=com_j2commerce&task=checkout.confirmPayment&orderpayment_type=payment_epdq&paction=process`
  - Replace `https://yoursite.com` with your actual site URL.
- **SHA-OUT pass phrase:** Enter your SHA-OUT passphrase here. Must match the **SHA-OUT Passphrase** plugin parameter.

> **Important:** The callback URL must be the plain URL without Joomla SEF routing. Do not apply any URL rewriting to the callback URL. The plugin generates the correct raw URL automatically.

***

## SHA signing

The ePDQ gateway requires all outbound parameters to be signed (SHA-IN) and all inbound responses to be verified (SHA-OUT). The plugin handles both automatically.

### SHA-IN (outbound)

When building the payment form, the plugin:

1. Collects all non-empty parameters (AMOUNT, CURRENCY, ORDERID, etc.)
2. Sorts them alphabetically by uppercase parameter name
3. Concatenates each as `PARAM=value{SHA-IN passphrase}`
4. Hashes the result with the selected algorithm
5. Sends the uppercase hex hash as `SHASIGN` in the hidden form

### SHA-OUT (inbound)

When the gateway posts back:

1. The plugin uppercases and sorts all received parameters
2. Excludes parameters in the skip list (SHASIGN, OPTION, TASK, PROCESSOR, LAYOUT, RESULT, SESSIONID)
3. Only includes parameters in the ePDQ allowlist (AMOUNT, BRAND, CURRENCY, etc.)
4. Concatenates each non-empty parameter as `PARAM=value{SHA-OUT passphrase}`
5. Compares the computed hash against the `SHASIGN` field received from ePDQ

If the signatures do not match and **Validate SHA-OUT Response** is enabled, the transaction is rejected and an admin notification email is sent.

***

## ePDQ payment status codes

| STATUS          | Meaning                             | J2Commerce action                                   |
| --------------- | ----------------------------------- | --------------------------------------------------- |
| 5               | Authorized                          | Confirmed payment status applied, customer notified |
| 9               | Payment Requested                   | Confirmed payment status applied, customer notified |
| 51              | Authorization Waiting               | Pending status applied                              |
| 91              | Payment Processing                  | Pending status applied                              |
| 0               | Incomplete / Invalid                | Failed status applied                               |
| 1               | Cancelled by Customer               | Failed status applied                               |
| 2               | Authorization Refused               | Failed status applied                               |
| All other codes | Various pending/refund/error states | Failed status applied                               |

***

## Transaction security

- **No card data on your server.** The HPP integration is SAQ-A compliant.
- **SHA-OUT signature verification** is enabled by default. Do not disable it in production.
- **Double-charge protection.** If the gateway posts back twice for the same order, the plugin detects the existing transaction ID and status and skips the second update.
- **Debug logs** are allowlisted and never contain raw card numbers, encrypted card data, or CVV values.

***

## Subscriptions

Setting **Support Subscriptions** to yes allows ePDQ to be selected for subscription products. However, because the ePDQ Hosted Payment Page does not support card tokenisation or recurring billing profiles, **automatic renewal is not supported**. Subscription renewal requires either:

- A bank mandate / Direct Debit arrangement outside the gateway
- Manual admin intervention to process renewals

If you need automatic subscription renewal, consider a gateway that supports tokenisation, such as Stripe or Authorize.net.

***

## Troubleshooting

### SHA signature mismatch

- Verify the SHA-IN and SHA-OUT passphrases are identical in both ePDQ back-office and the plugin.
- Confirm the hash algorithm matches in both places.
- Check that there are no leading or trailing spaces in the passphrase fields.
- Enable Debug Mode temporarily to inspect the SHA strings in the Joomla log.

### Order status not updating

- Ensure the server-to-server callback URL is correctly configured in the ePDQ back-office.
- The callback URL must be publicly accessible. Test with cURL: `curl -X POST "https://yoursite.com/index.php?option=com_j2commerce&task=checkout.confirmPayment&orderpayment_type=payment_epdq&paction=process"`.
- Check that the ePDQ callback request is not blocked by a WAF, Cloudflare firewall rule, or server-level IP restriction.

### Customer redirected to error page

- Confirm the ACCEPTURL, CANCELURL, DECLINEURL, and EXCEPTIONURL in your ePDQ back-office match the site's callback format.
- Verify the plugin is enabled and not cached/disabled.

### Payments processed but orders remain in "Pending"

- ePDQ may be returning STATUS 51 or 91 (authorization waiting). This is normal for certain card types. The order will move to confirmed once ePDQ sends a final STATUS 9 or 5 notification.
- If the final notification never arrives, check the ePDQ back-office under **Operations → Transactions** to see the final payment status.

***

## Migrating from J2Store

If you were using the J2Store `payment_epdq` plugin, this J2Commerce version preserves all your parameter names where possible. The key differences:

| J2Store parameter | J2Commerce parameter | Notes                      |
| ----------------- | -------------------- | -------------------------- |
| `epdq_SHA_1_pre`  | `epdq_sha_in`        | Renamed for clarity        |
| `epdq_SHA_1_post` | `epdq_sha_out`       | Renamed for clarity        |
| `epdq_encription` | `epdq_hash_method`   | Fixed typo; now a dropdown |

After updating the plugin, re-enter your SHA passphrases in the new parameter fields. All other settings carry over automatically.
