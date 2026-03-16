---
title: "Order Statuses"
sidebar_label: "Order Statuses"
sidebar_position: 30
description: "Learn how to view, create, and customize order statuses in J2Commerce to track orders through every stage of fulfillment."
---

# Order Statuses

Every order in your store moves through a series of stages — from the moment a customer places it to the moment it arrives at their door. Order statuses are the labels that mark each of those stages. They appear on order records, in customer emails, and in your admin order list so that you and your team always know exactly where each order stands.

J2Commerce ships with a set of built-in statuses (Confirmed, Processed, Shipped, Delivered, and others), and you can add as many custom statuses as your fulfillment workflow requires.

## Where to Find Order Statuses

Go to **J2Commerce** -> **Setup** -> **Order Statuses**.

<!-- SCREENSHOT: J2Commerce admin menu showing Setup > Order Statuses -->

The list shows every status with its current enabled state, a live badge preview, the CSS class that controls the badge style, and whether the status is a built-in core status.

## The Status List at a Glance

| Column | What it shows |
|--------|---------------|
| **Status** | Green or red toggle — whether the status is active |
| **Name** | The language key used to identify the status |
| **Badge** | A live preview of how the status appears in orders |
| **CSS Class** | The Bootstrap badge class applied to the badge |
| **Core** | Whether this is a built-in status that ships with J2Commerce |

### Why the Name Column Shows a Language Key

You may notice that status names appear as uppercase strings like `J2COMMERCE_ORDERSTATUS_DELIVERED` rather than plain text such as "Delivered". This is intentional.

J2Commerce uses language keys so that the same order status works correctly in stores that operate in multiple languages. When a French-speaking customer views their order history, J2Commerce looks up `J2COMMERCE_ORDERSTATUS_DELIVERED` in the French language file and displays "Livré" automatically. The language key is the single source of truth, and translations are applied per-language without any extra configuration from you.

If your store runs in a single language, you still need to define the language key — the translation for it simply comes from your active language file.

## Built-in Order Statuses

J2Commerce installs the following statuses out of the box. They are marked as **Core** and cannot be deleted.

| Language Key | Typical Meaning | Default Badge Style |
|--------------|-----------------|---------------------|
| `J2COMMERCE_NEW` | Order placed, not yet reviewed | Warning (yellow) |
| `J2COMMERCE_PENDING` | Awaiting payment confirmation | Warning (yellow) |
| `J2COMMERCE_CONFIRMED` | Payment received and order confirmed | Success (green) |
| `J2COMMERCE_PROCESSED` | Order picked, packed, and ready | Info (blue) |
| `J2COMMERCE_SHIPPED` | Dispatched to carrier | Info (blue) |
| `J2COMMERCE_DELIVERED` | Delivered to customer | Purple |
| `J2COMMERCE_CANCELLED` | Order cancelled | Warning (yellow) |
| `J2COMMERCE_FAILED` | Payment or processing failed | Danger (red) |

## Adding a New Order Status

You can add custom statuses to match your own fulfillment steps — for example, "Awaiting Stock", "Ready for Collection", or "Returned".

### Step 1: Open the New Status Form

1. Go to **J2Commerce** -> **Setup** -> **Order Statuses**.
2. Click **New** in the toolbar.

<!-- SCREENSHOT: Order Statuses list with New button highlighted in toolbar -->

### Step 2: Enter the Status Name

The **Name** field accepts a language key. Use uppercase letters, underscores, and the prefix `J2COMMERCE_ORDERSTATUS_` to keep your keys consistent with the built-in ones.

**Example for a "Delivered" status:**

```
J2COMMERCE_ORDERSTATUS_DELIVERED
```

This key must then exist in your active language file so that J2Commerce can translate it into readable text. See [Defining the Language String](#defining-the-language-string) below.

<!-- SCREENSHOT: New order status form with Name field filled in -->

### Step 3: Set the CSS Class

The **CSS Class** field controls how the status badge looks in the admin and in customer-facing order views. J2Commerce uses Bootstrap 5 badge classes.

Common options:

| CSS Class | Appearance |
|-----------|------------|
| `badge text-bg-success` | Green — good for positive outcomes |
| `badge text-bg-info` | Blue — good for in-progress stages |
| `badge text-bg-warning` | Yellow — good for pending states |
| `badge text-bg-danger` | Red — good for failures or cancellations |
| `badge text-bg-secondary` | Grey — good for neutral or inactive states |
| `badge text-bg-primary` | Brand blue — good for custom highlight states |

You can combine these with additional Bootstrap utility classes if your template supports them. The hint text in the field shows `badge text-bg-success` as a starting example.

### Step 4: Configure Status and Ordering

The right-hand sidebar of the edit form contains two additional settings:

| Field | Description |
|-------|-------------|
| **Status** | Set to **Published** to make this status available for selection on orders. Set to **Unpublished** to hide it without deleting it. |
| **Ordering** | Controls the position of this status in dropdown lists. Lower numbers appear first. |

### Step 5: Save

Click **Save & Close** in the toolbar. The new status appears in the list and is immediately available when updating order records.

<!-- SCREENSHOT: Saved order status appearing in the list with badge preview -->

## Editing an Existing Order Status

1. Go to **J2Commerce** -> **Setup** -> **Order Statuses**.
2. Click the name of the status you want to change.
3. Update the **CSS Class**, **Status**, or **Ordering** as needed.
4. Click **Save & Close**.

Note that the **Core** toggle is read-only. It is set automatically for the statuses that ship with J2Commerce and cannot be changed.

## Practical Example: Creating a "Delivered" Status for Shipping Apps

Shipping integrations that track parcel deliveries — such as AtoShip or UPS — can automatically update an order to a "Delivered" status when the carrier confirms delivery. To use this feature, your J2Commerce installation needs a status whose language key the shipping app recognises.

The built-in `J2COMMERCE_DELIVERED` status is already configured for exactly this purpose. If it does not appear in your list, follow these steps to create it:

**Step 1:** Go to **J2Commerce** -> **Setup** -> **Order Statuses** -> **New**.

**Step 2:** Enter the following values:

| Field | Value |
|-------|-------|
| **Name** | `J2COMMERCE_ORDERSTATUS_DELIVERED` |
| **CSS Class** | `badge text-bg-success` |
| **Status** | Published |

**Step 3:** Click **Save & Close**.

**Step 4:** Open your shipping plugin configuration (for example, **J2Commerce** -> **Shipping** -> **Shipping Methods** -> your method) and look for a **Delivered Status** field. Select the status you just created from the dropdown.

From that point on, when the carrier marks the shipment as delivered, the plugin updates the order automatically and the customer receives an updated status notification if your email templates are configured for that transition.

### Defining the Language String

For the status name to display as readable text rather than as the raw key, you need a matching entry in your language file.

Open the file `language/en-GB/com_j2commerce.ini` (or your custom language override in Joomla's language manager) and add:

```ini
J2COMMERCE_ORDERSTATUS_DELIVERED="Delivered"
```

If your store supports additional languages, add the equivalent line to each language file. Joomla loads the correct translation automatically based on the active language.

<!-- SCREENSHOT: Language override screen in Joomla with the DELIVERED key entered -->

## Tips

- **Use a consistent naming prefix** — Starting every custom key with `J2COMMERCE_ORDERSTATUS_` makes language file management much easier as your store grows.
- **Keep the ordering intentional** — Statuses appear in the order you define them when staff select a status on an order. Put the most commonly used statuses at the top.
- **Unpublish instead of delete** — If a status was used on historical orders, unpublishing it preserves the data while removing it from future selection lists.
- **Test badge colours with your template** — Purple or custom Bootstrap classes may not render correctly on all frontend templates. Always check the badge preview column after saving.

## Troubleshooting

### The Status Name Shows as a Raw Language Key Instead of Text

**Cause:** The language key has not been defined in your active language file.

**Solution:**

1. Go to **System** -> **Manage** -> **Language Overrides**.
2. Select your language from the dropdown and ensure **Administrator** or **Site** is selected depending on where the key appears.
3. Click **New** and enter the language key (e.g., `J2COMMERCE_ORDERSTATUS_DELIVERED`) and its translation value.
4. Click **Save & Close**.
5. Clear the Joomla cache: **System** -> **Clear Cache**.

### A Status Does Not Appear in the Order Status Dropdown

**Cause:** The status is unpublished.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Order Statuses**.
2. Find the status in the list.
3. Click the red toggle in the **Status** column to publish it.

### Cannot Delete a Core Status

**Cause:** Core statuses are protected — the **Core** flag is set to **Yes** and deletion is blocked.

**Solution:** If you do not want a core status to appear in selection lists, set its **Status** to **Unpublished** instead of attempting to delete it.

### Shipping App Is Not Updating Orders to "Delivered"

**Cause:** The shipping plugin is not configured to use the delivered status, or the status it points to is unpublished.

**Solution:**

1. Go to **J2Commerce** -> **Shipping** -> **Shipping Methods** and open your shipping method.
2. Locate the **Delivered Status** (or equivalent) field and confirm it points to your published delivered status.
3. Verify the status itself is published under **J2Commerce** -> **Setup** -> **Order Statuses**.

## Related Topics

- [Orders](../orders/index.md) — Managing and updating individual orders
- [Email Templates](../configuration/email-templates.md) — Sending notifications when order status changes
- [Shipping Methods](../shipping/index.md) — Configuring shipping plugins that update order statuses automatically
