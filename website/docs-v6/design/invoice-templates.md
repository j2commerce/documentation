---
title: "Invoice Templates"
sidebar_label: "Invoice Templates"
sidebar_position: 3
description: "Create and manage professional invoice and packing slip templates for your orders."
---

# Invoice Templates

Invoice Templates allow you to design professional documents for your customers, including standard invoices, packing slips, and receipts.

## Prerequisites

- J2Commerce 6.x installed.

## Accessing Invoice Templates

**Step 1:** Go to **J2Commerce** -> **Design** -> **Invoice Templates**.

<!-- SCREENSHOT: Invoice Templates manager list view showing available document templates -->

## Creating and Managing Invoice Templates

You can create multiple templates and assign them based on the customer's group, payment method, or order status.

### Step 1: Basic Configuration

Click **New** and configure the basic settings:

| Field | Description | Example |
|-------|-------------|---------|
| **Invoice Type** | The type of document this template generates | `Invoice`, `Packing Slip`, `Receipt` |
| **Title** | Internal name for the template | `Standard Professional Invoice` |
| **Language** | The language the document will be printed in | `English (US)` |
| **Order Status** | The status that triggers this document | `Completed` |

### Step 2: Advanced Settings

In the **Advanced** tab, you can customize the look and feel:

| Field | Description | Options |
|-------|-------------|---------|
| **Body Source** | How the document layout is defined | `Visual` (Preview), `Editor` (HTML/CSS) |
| **Body** | The HTML structure of the invoice | Visual Builder or HTML editor |
| **Custom CSS** | Styles to make the invoice look professional | CSS rules |

#### Using the Visual Builder
When **Visual** is selected as the Body Source, you can use the **Visual Builder** to design your invoices and packing slips.

1. **Adding Elements:** Drag layout blocks from the component panel onto the canvas to build your header, item table, and footer.
2. **Editing Properties:** Click any element to open its settings panel. Here you can change text labels, adjust borders, and set alignment.
3. **Arranging Content:** Drag and drop elements to reorganize the document layout.
4. **Saving Changes:** Once you are satisfied with the layout, click **Save** to store the design.

<!-- SCREENSHOT: The Invoice Template editor using the Visual Builder to design a professional layout -->

## How It Works

When an order reaches a specific state or is requested for printing:
1. J2Commerce checks for an **Invoice Template** that matches the **Language**, **User Group**, and **Payment Method**.
2. If multiple matches exist, it uses the one with the highest priority (ordering).
3. The template is rendered into a PDF or HTML page for the customer.

## Tips

- **Branding:** Use the **Custom CSS** field to add your brand colors and logo styling.
- **Packing Slips:** Create a separate "Packing Slip" template that excludes pricing but includes item quantities and descriptions.
- **Language Support:** Create separate templates for different languages to ensure a localized experience for international customers.

## Troubleshooting

### Layout looks broken when printing

**Cause:** Some CSS styles (like complex Flexbox or Grid) may not be fully supported by PDF generators or browser print drivers.

**Solution:**
1. Use standard HTML tables for layout structures in invoices.
2. Use simple, web-safe fonts.
3. Use the `print` media query in your Custom CSS to optimize for paper.

## Related Topics

- [Email Templates](../design/email-templates.md)
- [Order Statuses](../localisation/order-statuses.md)
