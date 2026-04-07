---
title: "Email Templates"
sidebar_label: "Email Templates"
sidebar_position: 2
description: "Customize the emails sent by J2Commerce to customers and administrators."
---

# Email Templates

Email Templates allow you to customize the subject lines and content of the automated emails sent by J2Commerce, such as order confirmations and status updates.

## Prerequisites

- J2Commerce 6.x installed.
- An active email configuration in Joomla Global Configuration.

## Accessing Email Templates

**Step 1:** Go to **J2Commerce** -> **Design** -> **Email Templates**.

<!-- SCREENSHOT: Email Templates manager list view showing various system emails -->

## Creating and Managing Templates

You can create new templates or edit existing ones to fit your brand's voice and requirements.

### Step 1: Creating a New Template

1. Click the **New** button in the toolbar.
2. Fill in the following fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Email Type** | The trigger for this email (e.g., Transactional) | `Transactional` |
| **Subject** | The subject line the recipient will see | `Your Order #[order_id] has been shipped!` |
| **Receiver Type** | Who receives this email | `Customer`, `Admin`, or `Both` |
| **Language** | The language of the email content | `English (US)` |

### Step 2: Configuring the Content

In the **Content** tab, define how the email body is generated:

| Field | Description | Options |
|-------|-------------|---------|
| **Body Source** | How the email body is created | `Visual`, `Editor`, `File` |
| **Body** | The actual content of the email | Visual Builder or HTML/Text editor |
| **Custom CSS** | Optional CSS to style the email | CSS rules |

#### Using the Visual Builder
If you select **Visual** as the Body Source, you can use the **Visual Builder** to design your email.

1. **Add Elements:** Drag components (like text blocks or images) from the side panel onto the canvas.
2. **Customize Styles:** Click an element on the canvas and use the style panel to adjust colors, fonts, and spacing.
3. **Rearrange:** Drag and drop elements within the canvas to change the email structure.
4. **Preview:** Use the preview tools to ensure the email looks professional across different email clients.
5. **Save:** Click **Save** in the toolbar to apply your design.

<!-- SCREENSHOT: The Email Template edit screen showing the Visual Builder in action -->

### Step 3: Publishing

In the **Publishing** tab, ensure the template is set to **Published**. If a template is unpublished, J2Commerce will fallback to the default system email.

## Filtering Templates

Use the filter bar to quickly find templates based on:
- **Status:** Published or Unpublished.
- **Language:** Filter by specific customer languages.
- **Order Status:** Find emails triggered by specific order states (e.g., "Pending").
- **User Group:** Find templates tailored for specific customer groups.

## Tips

- **Use Placeholders:** Use the available tags (e.g., `[order_id]`, `[customer_name]`) to personalize emails.
- **Test Frequently:** Always send a test email to yourself to ensure the layout looks correct in different email clients (Gmail, Outlook, etc.).
- **Consistency:** Keep your subject lines consistent across different order statuses to help customers organize their inboxes.

## Troubleshooting

### Emails are not being sent

**Cause:** The Joomla mail server settings might be incorrect, or the template is set to "Unpublished".

**Solution:**
1. Verify that the template is **Published**.
2. Go to **System** -> **Global Configuration** -> **Server** and test the Mail settings.
3. Check if your hosting provider blocks outgoing mail on port 25.

## Related Topics

- [Invoice Templates](../design/invoice-templates.md)
- [Order Statuses](../localisation/order-statuses.md)
