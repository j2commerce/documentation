---
title: "Money Order / Check Payment"
sidebar_label: "Money Order / Check"
sidebar_position: 6
description: "Accept payments by money order or check in J2Commerce with custom payment instructions displayed at checkout."
---

# Money Order / Check Payment

The Money Order payment plugin lets you accept payments by money order, personal check, cashier's check, or bank draft. When a customer selects this payment method at checkout, they see your payment instructions (payee name, mailing address, etc.) and their order is placed immediately with a pending status. You then fulfill the order once you receive the physical payment.

This is an offline payment method — no online payment processing occurs. It is ideal for B2B stores, government procurement, or customers who prefer to pay by mail.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

## Installation

This payment plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `payment_moneyorder.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `payment_moneyorder.zip` package file.
4. The plugin installs and enables automatically.

## Enable the Plugin

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods**.
2. Look for **Money Order Payment** in the list.
3. Click the status icon to enable it (green checkmark).

<!-- SCREENSHOT: Payment Methods list showing Money Order Payment enabled -->

## Configure the Plugin

Click the **Money Order Payment** title to open its settings.

<!-- SCREENSHOT: Money Order Payment configuration page -->

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Display Name** | The name shown to customers at checkout (e.g., "Money Order / Check", "Pay by Check"). | Money Order Payment |
| **Display Image** | An optional image shown next to the payment method name at checkout. Use a check or money order icon. | Empty |

### Payment Instructions

| Setting | Description |
|---------|-------------|
| **Money Order Information** | A rich-text editor where you enter the instructions customers see after selecting this payment method. Include the payee name, mailing address, and any reference number requirements. |

This is the most important field. Write clear, complete instructions so customers know exactly how to send payment. For example:

> Please make your money order or check payable to:
>
> **ACME Store, LLC**
> 123 Commerce Street
> Suite 400
> New York, NY 10001
>
> Include your order number on the memo line.
> Orders are shipped within 2 business days of payment receipt.

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable Strip Tags** | When set to **Yes**, HTML tags are removed from the payment instructions before display. Leave as **No** if you want formatted text with bold, links, etc. | No |

### Order Status

| Setting | Description | Default |
|---------|-------------|---------|
| **Order Status** | The status assigned to orders placed using this payment method. Since payment is not received immediately, use a pending-type status (e.g., "Pending"). | Pending |

### Surcharge Settings

Add an optional fee for customers who pay by money order or check.

| Setting | Description | Default |
|---------|-------------|---------|
| **Surcharge Name** | Label shown to the customer for the surcharge (e.g., "Processing Fee"). | Empty (no surcharge) |
| **Surcharge Percent** | A percentage-based surcharge applied to the order total (e.g., `2` for 2%). | Empty |
| **Surcharge Fixed** | A fixed dollar amount added to the order (e.g., `5.00`). | Empty |
| **Surcharge Tax Class** | If the surcharge should be taxed, select the appropriate tax profile. | Empty (not taxed) |

You can use both a percentage and a fixed amount together. Leave all surcharge fields empty to charge no extra fees.

### Geozone Restriction

| Setting | Description | Default |
|---------|-------------|---------|
| **Geozone** | Limit this payment method to customers in a specific geozone. For example, restrict money order payments to domestic customers only. Leave empty to allow all locations. | Empty (all geozones) |

### Thank You Message

| Setting | Description | Default |
|---------|-------------|---------|
| **Thank You Article** | Select a Joomla article to display as the order confirmation page. If left empty, the default J2Commerce confirmation page is used. | Empty |

### Custom Messages

Display custom text at different stages of the checkout process.

| Setting | Description |
|---------|-------------|
| **On Selection** | Text shown when the customer first selects this payment method in the payment step. |
| **On Before Payment** | Text shown on the payment confirmation page, before the customer clicks the place order button. |
| **On After Payment** | Text shown on the thank-you page after the order is placed successfully. |
| **On Error** | Text shown if an error occurs during order processing. |

### Button and Template

| Setting | Description | Default |
|---------|-------------|---------|
| **Button Text** | The label on the place order button (e.g., "Place Order", "Submit Order"). | Place Order |
| **Sub Template** | Use a custom template override for the payment form. Leave empty to use the default template. | Empty |

Click **Save & Close** to apply your settings.

## How It Works

1. The customer adds items to their cart and proceeds to checkout.
2. At the payment step, they see **Money Order / Check** (or your custom display name) as a payment option.
3. After selecting it, your **Payment Instructions** are displayed in an info box.
4. The customer clicks **Place Order**.
5. The order is created with the status you configured (e.g., "Pending").
6. The customer sees the confirmation page with your **On After Payment** message.
7. The customer mails the money order or check to your address.
8. When you receive the payment, manually update the order status to "Confirmed" (or "Complete") in **J2Commerce** -> **Sales** -> **Orders**.

## Tips

- **Write clear payment instructions.** Include the exact payee name, full mailing address, and tell customers to write their order number on the memo line. The clearer your instructions, the fewer support questions you will receive.
- **Use a pending order status.** Do not set the order status to "Confirmed" or "Complete" — those statuses imply payment was received. Use "Pending" until the check clears.
- **Set a geozone restriction.** Money orders are typically domestic. Restrict this method to your home country's geozone to avoid international customers selecting it.
- **Consider a processing timeframe note.** In your payment instructions or **On After Payment** message, tell customers how long to expect before their order ships (e.g., "Orders ship within 3 business days after payment clears").
- **Add a surcharge if needed.** If handling money orders costs you extra (bank fees, processing time), add a small fixed surcharge to cover the cost.

## Troubleshooting

### Payment method does not appear at checkout

**Cause:** The plugin is disabled, or the customer's address does not match the configured geozone.

**Solution:**

1. Go to **J2Commerce** -> **Payments** -> **Payment Methods** and verify **Money Order Payment** is enabled.
2. If a **Geozone** restriction is set, confirm the customer's billing address matches a country/zone in that geozone.
3. Clear your site cache: **System** -> **Clear Cache**.

### Payment instructions are not showing

**Cause:** The **Money Order Information** field is empty.

**Solution:**

1. Open the plugin settings.
2. Enter your payment instructions in the **Money Order Information** editor field.
3. Click **Save & Close**.

### HTML formatting is stripped from instructions

**Cause:** The **Enable Strip Tags** option is set to **Yes**.

**Solution:**

1. Open the plugin settings.
2. Set **Enable Strip Tags** to **No**.
3. Click **Save & Close**.

### Order is marked as complete before receiving payment

**Cause:** The **Order Status** is set to a completed status instead of a pending status.

**Solution:**

1. Open the plugin settings.
2. Change the **Order Status** to **Pending** (or another status that indicates payment has not been received).
3. Click **Save & Close**.
4. When you receive the physical payment, manually update the order status in **J2Commerce** -> **Sales** -> **Orders**.

## Related Topics

- [Cash Payment](../payment-methods/payment_cash.md)
- [Stripe Payment](../payment-methods/payment_stripe.md)
- [PayPal Payment](../payment-methods/payment_paypal.md)
