---
title: "Add to User Group"
sidebar_label: "Add to User Group"
sidebar_position: 10
description: "Automatically add customers to Joomla user groups when they purchase products — useful for membership sites, wholesale access, and ACL-controlled content."
---

# Add to User Group

The Add to User Group app plugin automatically adds a customer to one or more Joomla user groups as soon as their order reaches a status you choose. You can set groups at the individual product level, at the Joomla content category level, or both. Category settings always take priority over product settings.

Common uses include granting access to a members-only content area after purchase, upgrading a customer to a wholesale or dealer group, and controlling what ACL-restricted pages a buyer can see based on what they have bought.

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_usergroup.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_usergroup.zip` package file.
4. The plugin installs and enables automatically.

After installation, go to **J2Commerce** -> **Apps** to configure it.

## Prerequisites

- J2Commerce 6 installed and configured.
- At least one product created.
- The Joomla user groups you want to assign must already exist. Create them under **System** -> **User Groups** before proceeding.

## Quick Setup Overview

1. Enable the plugin in Joomla Plugin Manager.
2. Set which order statuses trigger group assignment.
3. Assign user groups to each product, or to a content category.
4. Test by placing an order and confirming the customer lands in the right group.

---

## Step 1: Enable and Configure the Plugin

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Add to User Group**.
3. Click the plugin name to open its settings.

<!-- SCREENSHOT: Plugin Manager search results showing "Add to User Group" plugin with status toggle -->

### Plugin Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Order Status** | The order statuses that trigger user group assignment. When an order reaches any of the selected statuses, the customer is added to the configured groups. Select one or more statuses. | Confirmed (status ID 1) |
| **Debug Mode** | When enabled, the plugin writes detailed log entries to a file named `app_usergroup.php` in the Joomla logs directory. Turn this on when troubleshooting; disable it in production. | No |

<!-- SCREENSHOT: Plugin settings form showing Order Status multi-select and Debug Mode toggle -->

**Choosing the right order status:**
Most stores use **Confirmed** or **Processing** as the trigger. Using **Pending** may add customers to groups before payment is verified. Using a completed/shipped status means customers wait longer for access. Choose the status that matches your fulfillment workflow.

4. Click **Save** when finished.

---

## Step 2: Assign User Groups to Products

For each product that should trigger a group assignment, open the product and set the groups in the plugin's tab.

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click the product name to edit it.
3. Scroll down to find the **Add to User Group** tab or panel.
4. In the **User Group List** field, select one or more groups from the dropdown.

<!-- SCREENSHOT: Product edit form showing the "Add to User Group" panel with the User Group List multi-select dropdown -->

5. Click **Save** or **Save & Close**.

Repeat this for every product that should grant group membership on purchase. Products with no groups selected are simply ignored by this plugin.

---

## Step 3: Assign User Groups at the Category Level (Optional)

If you have a whole category of products that should all grant the same group, you can set the groups once on the category instead of repeating the setting on each product. When category groups are present, they take over completely — the product-level setting is ignored for that item.

1. Go to **Content** -> **Categories**.
2. Click the category that contains your products.
3. Find the **Add To User Groups** tab in the category editor.
4. In the **User Group List** field, select one or more groups.

<!-- SCREENSHOT: Joomla category editor showing the "Add To User Groups" tab with the group selector -->

5. Click **Save & Close**.

**Priority rule:** If a product belongs to a category that has groups configured, those category groups are used and any product-level groups are ignored. If the category has no groups set, the product-level groups are used as the fallback.

---

## How It Works

When an order's status changes to one of the statuses you configured:

1. The plugin reads the order and identifies the customer.
2. It loops through every item in the order.
3. For each item, it checks whether the product's category has user groups set. If so, it uses those.
4. If the category has no groups, it falls back to the product-level groups.
5. The customer is added to every collected group using Joomla's built-in user group system.
6. A note is added to the order history confirming the assignment.

The plugin handles duplicate group assignments gracefully — if the customer is already in a group, nothing breaks.

Guest customers (users who checked out without a Joomla account) are skipped because there is no Joomla user ID to assign a group to.

---

## Use Case Examples

### Members-Only Digital Access

You sell a digital subscription product. Your Joomla site has a **Members** group that can access restricted articles.

- Create the **Members** user group under **System** -> **User Groups**.
- Set appropriate **View Level** restrictions on your members-only articles.
- On the subscription product, select **Members** in the **User Group List**.
- Set the plugin's **Order Status** to **Confirmed**.

When a customer's order is confirmed, they are immediately added to the **Members** group and can view the restricted content on their next page load.

### Wholesale Pricing by Category

You have a **Wholesale Products** category. Any customer who buys from it should be upgraded to your **Wholesale** group.

- Create the **Wholesale** group in Joomla.
- Open the **Wholesale Products** category in **Content** -> **Categories**.
- Set **Wholesale** in the **Add To User Groups** tab.

All products in that category will now trigger the group assignment on purchase — no need to configure each product individually.

---

## Troubleshooting

### The customer was not added to the group after purchase

**Check 1 — Order status match.** Open the order and note the current status. Go back to the plugin settings and confirm that status is selected in **Order Status**. If the order is **Pending** but you only have **Confirmed** selected, no assignment will happen until the order is confirmed.

**Check 2 — User group is set on the product or category.** Edit the product and check the **Add to User Group** panel. Make sure at least one group is selected. If the product belongs to a category with groups set, the category groups override the product — verify the category setting too.

**Check 3 — Guest checkout.** If the customer placed the order as a guest (no Joomla account), the plugin cannot assign a group. The plugin only works for registered users with a valid Joomla user ID.

**Check 4 — Enable debug mode.** In the plugin settings, turn on **Debug Mode** and reproduce the issue by manually changing the order status. Then open the file `[joomla-root]/logs/app_usergroup.php` in a text editor and look for log entries related to that order.

---

### Debug Mode shows "Status X not in configured statuses"

The order status ID does not match any of the statuses you selected in the plugin. Open the plugin settings, expand **Order Status**, and add the status ID shown in the log entry.

---

### A product in the category is not triggering the category groups

The category-level setting only applies to products sourced from Joomla content articles (the standard J2Commerce product type linked to `com_content`). Confirm the product was created through the standard J2Commerce workflow and is linked to a content article in the correct category.

---

## Related Topics

- [Order Statuses](../../configuration/setup/orderstatuses.md)
- [Apps Overview](../index.md)
