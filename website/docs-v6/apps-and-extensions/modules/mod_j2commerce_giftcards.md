---
title: "Gift Cards Module"
sidebar_label: "Gift Cards"
sidebar_position: 30
description: "Show a logged-in customer's gift card balance summary in any module position on your storefront, with a link to their full Gift Cards tab."
---

# Gift Cards Module

The J2Commerce Gift Cards module displays a short summary of a logged-in customer's gift card balances — how many active gift cards they hold and their combined remaining balance — anywhere on your site that accepts a module, such as a header bar or account sidebar. Clicking the summary takes the customer to the **Gift Cards** tab on their My Profile page, where they can see full details for each card.

## Installation

This module is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `mod_j2commerce_giftcards.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `mod_j2commerce_giftcards.zip` package file.
4. The module installs automatically.

To create a module instance:

1. Go to **Content** -> **Site Modules**.
2. Click **New** in the toolbar.
3. Select **Gift Cards** from the module type list.
4. Configure the settings described below.
5. Assign the module to a template position (e.g. `header` or `usermenu`) and select the menu pages where it should appear.
6. Click **Save**.

## Prerequisites

- J2Commerce 6 installed, with the Vouchers feature in use.
- A menu item pointing to the customer's **My Profile** page, so the module can link to the Gift Cards tab.

---

## Configuration

| Field | Description |
|---|---|
| **Title** | Optional heading shown above the gift card summary. Leave empty to hide the heading. |
| **My Profile Menu Item** | The menu item the module links to when a customer clicks the summary. Select the menu item that points to the customer's My Profile page. |
| **Hide When Empty** | When enabled (the default), the module does not render anything for a customer who has no gift cards. |
| **Custom CSS** | Optional CSS rules applied only to this module instance. |

---

## What Customers See

Once configured, a logged-in customer with at least one gift card sees a short summary, for example: *"2 gift cards — $45.00 available."*

The summary is a link. Clicking it takes the customer to the **Gift Cards** tab on their My Profile page, where each card shows its masked code, status, remaining balance, expiry date, and a collapsible transaction history. See [Gift Cards Tab for Customers](../../sales/vouchers.md#gift-cards-tab-for-customers) for what customers see there.

The module never renders for guests, or for customers with no gift cards when **Hide When Empty** is enabled.

---

## Tips

- Place the module in a header or account-menu position so it stays visible without competing with primary storefront content.
- Set **My Profile Menu Item** correctly before publishing — without it, the summary link will not point anywhere useful.
- Leave **Hide When Empty** enabled on public-facing positions like the header, so customers without gift cards do not see an empty widget.

---

## Troubleshooting

### The module does not appear at all

**Cause:** The visitor is not logged in, or **Hide When Empty** is enabled and the customer has no gift cards.

**Solution:** Confirm you are testing while logged in as a customer with at least one voucher assigned to their account (matched by user ID or email). Temporarily disable **Hide When Empty** to confirm the module is otherwise configured correctly.

### Clicking the summary goes to the wrong page

**Cause:** The **My Profile Menu Item** parameter is not set, or points to the wrong menu item.

**Solution:** Edit the module and set **My Profile Menu Item** to the menu item that displays the customer's My Profile page.

---

## Related Topics

- [Vouchers & Gift Cards](../../sales/vouchers.md) — Full admin and customer-facing documentation for the voucher/gift-card feature.
- [REST API](../../rest-api.md) — The `/v1/j2commerce/vouchers/mine` endpoint returns the same gift card data programmatically.
