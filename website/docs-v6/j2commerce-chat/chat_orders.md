---
title: "Chat Orders Plugin"
sidebar_label: "Chat Orders"
sidebar_position: 2
description: "Give your J2Commerce chatbot the ability to look up order status, view order history, retrieve shipping tracking, handle return inquiries, and guide customers to invoice downloads."
---

# Chat Orders Plugin

The Chat Orders plugin connects J2Commerce Chat to your store's order data. When a customer asks the chatbot about an order, the plugin automatically retrieves the relevant information and feeds it to the AI so it can respond with real, accurate details instead of generic advice.

This means a customer can type "Where is my order #12345?" and receive their actual order status, shipping tracking, and item details -- all without leaving the chat window or waiting for a support agent.

## Prerequisites

- J2Commerce 6 installed and enabled
- The J2Commerce Chat component (`com_j2commerce_chatbot`) installed and configured with at least one LLM provider (Claude, OpenAI, or Gemini)
- The J2Commerce Chat module (`mod_j2commerce_chatbot`) published on your site

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `chat_orders.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `chat_orders.zip` package file.
4. The plugin installs and enables automatically.

After installation, verify the plugin is enabled:

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **J2Commerce Chat - Orders**.
3. Confirm the **Status** column shows a green checkmark. If not, click to enable it.

<!-- SCREENSHOT: Joomla Plugin Manager showing "J2Commerce Chat - Orders" plugin enabled -->

No additional configuration is required. Once the plugin is enabled, the chatbot immediately gains order awareness.

## What the Plugin Does

The Chat Orders plugin gives your chatbot five order-related capabilities. Each one activates automatically when a customer's message matches certain keywords or phrases.

### Order Status Lookup

When a customer asks about the status of a specific order, the chatbot retrieves the full order details including the current status, order total, payment method, and a list of all items purchased.

**Example customer messages:**

- "What is the status of order #17704085036?"
- "Where is my order?"
- "Can you check my order #5?"

**What the chatbot sees:**

The plugin provides the AI with structured data like the order number, current status name (e.g., "Confirmed", "Shipped", "Pending"), order date, total amount with currency, payment method, and a line-by-line item breakdown with product names, SKUs, quantities, and prices.

**How it works for logged-in customers:**

If the customer is logged in and does not specify an order number, the plugin automatically retrieves their most recent order. If they provide an order number, it looks up that specific order -- but only if it belongs to them.

**How it works for guest customers:**

Guest customers must provide both their order number and the email address used at checkout. The chatbot will prompt them for this information if either piece is missing.

<!-- SCREENSHOT: Chat conversation showing a customer asking "Where is my order?" and receiving a detailed order status response -->

### Order History

Logged-in customers can ask the chatbot for a summary of their recent orders. The plugin returns up to 10 of their most recent orders with the order number, status, total, and date for each.

**Example customer messages:**

- "Show me my past orders"
- "What's my order history?"
- "What have I purchased before?"

The response includes a summary line with the customer's total order count and lifetime spend, followed by the list of recent orders.

Guest customers cannot use this feature -- the chatbot will let them know they need to log in to view order history.

### Shipping Tracking

When a customer asks about shipping or delivery, the plugin retrieves shipping method details and tracking information for the relevant order.

**Example customer messages:**

- "What's my tracking number?"
- "When will my order arrive?"
- "Can you check the shipping status?"

If the customer does not specify an order number, the plugin automatically finds their most recent shippable order. The response includes the shipping method name and tracking ID (or a note that tracking is not yet available if the tracking number has not been entered).

Guest customers must provide both their order number and email address to access shipping information.

### Return and Refund Inquiries

When a customer asks about returning an item or getting a refund, the plugin checks the order's current status and advises whether the order is eligible for a return.

**Example customer messages:**

- "I want to return this product"
- "Can I get a refund on order #5?"
- "How do I exchange an item?"

The plugin checks the order's status against the eligible statuses (typically "Confirmed" and "Completed"). If the order qualifies, the chatbot directs the customer to the returns process. If not, it explains that the current order status may not be eligible and suggests contacting support.

The customer must provide an order number for return inquiries. Guest customers also need to provide their email address.

### Invoice Download Guidance

When a customer needs an invoice or receipt, the chatbot directs them to the correct location in their account to download it.

**Example customer messages:**

- "Can I get an invoice for my order?"
- "I need a receipt"
- "Where can I download my proof of purchase?"

For logged-in customers who do not specify an order number, the plugin finds their most recent completed order. The chatbot then provides step-by-step directions to the invoice download page.

Guest customers need to provide both their order number and email address.

## Security and Privacy

The Chat Orders plugin enforces strict data access rules to protect customer information.

### Ownership Verification

Every order lookup includes an ownership check. The plugin will only show order data if:

- **Logged-in customer:** The order's `user_id` matches the currently logged-in user.
- **Guest customer:** The order number AND email address both match a record in the database.

A customer can never see another customer's orders, even by guessing order numbers.

### Data Scope

The plugin only provides the chatbot with order-level information needed to answer the customer's question. It does not expose:

- Billing or shipping addresses
- Full payment details (card numbers, account details)
- Other customers' data
- Internal admin notes

### Token Budget

The plugin's output is capped at 1,200 tokens per response to prevent excessive data from being sent to the AI. This ensures that even customers with large orders or long histories receive fast, focused responses.

## How Customers Interact

Customers do not need to know this plugin exists. They simply type natural questions into the chatbot, and the AI responds with real order data.

Here are some typical conversation flows:

### Logged-In Customer Checking Order Status

> **Customer:** Where is my order?
>
> **Chatbot:** Your most recent order is #17704085036. It's currently marked as **Confirmed** and was placed on March 5, 2026. Here's what you ordered:
>
> - Widget Pro (SKU: WP-100) x 2 - USD 49.98
> - Carrying Case (SKU: CC-200) x 1 - USD 19.99
>
> Your order total was USD 74.97 paid via PayPal. Would you like me to check anything else about this order?

### Guest Customer Looking Up an Order

> **Customer:** What's the status of order #17704085036?
>
> **Chatbot:** I can look that up for you. Since you're not logged in, I'll need the email address you used when placing the order.
>
> **Customer:** It was john@example.com
>
> **Chatbot:** I found your order! Order #17704085036 is currently **Shipped**. [Details follow...]

### Customer Asking About a Return

> **Customer:** I want to return my order #5
>
> **Chatbot:** Let me check that for you. Order #5 was placed on February 28, 2026 and is currently marked as **Confirmed**. This order is eligible for a return request. You can submit a return by visiting your account under My Account > Orders, or contact our support team for assistance. Would you like help with anything else?

## Troubleshooting

### The chatbot does not answer order questions

**Cause:** The Chat Orders plugin may not be enabled, or the chatbot component may not be properly configured.

**Solution:**

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **J2Commerce Chat - Orders** and verify it is enabled.
3. Ensure the chatbot module is published and the LLM provider is configured in **Components** -> **J2Commerce Chat** -> **Options**.

### Guest customers cannot look up their orders

**Cause:** Guest order lookups require both the order number and the email address used at checkout. If either is missing, the chatbot will ask for it but the customer may not realize what's needed.

**Solution:** This is expected behavior. The chatbot will prompt the customer for the missing information. If the customer provides the wrong email, the lookup will return no results and the chatbot will let them know.

### The chatbot shows "No orders found" for a logged-in customer

**Cause:** The customer may be logged in with a different account than the one used to place the order, or the session may have expired.

**Solution:**

1. Ask the customer to refresh the page and try again.
2. If the issue persists, verify in the J2Commerce admin (**J2Commerce** -> **Sales** -> **Orders**) that orders exist for that customer's user account.

### Order data appears outdated

**Cause:** The plugin queries the database in real time, so data should be current. If the order status was just updated, it may take a moment for the change to be reflected.

**Solution:** Ask the customer to send the question again. The plugin fetches fresh data with every request -- there is no caching.

## Related Topics

- [J2Commerce Chat](./index.md) -- Overview of the J2Commerce Chat system
- [Chat Cart Plugin](./chat_cart.md) -- Give the chatbot cart and coupon awareness
- [Orders](../orders/index.md) -- Managing orders in the J2Commerce admin
