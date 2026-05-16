---
title: "User Group Tax Exemptions"
sidebar_label: "User Group Tax Exemptions"
sidebar_position: 23
description: "Exempt members of selected Joomla user groups from sales tax in your J2Commerce store — useful for B2B resellers, non-profits, and tax-exempt certificate holders."
---

# User Group Tax Exemptions

The User Group Tax Exemptions app lets you designate specific Joomla user groups as tax-exempt. When a member of an exempt group reaches checkout, J2Commerce skips sales tax on every item in their cart — no coupon code, no manual override, no separate checkout path.

The exemption is applied per cart item, in memory, during the checkout session. It does not modify tax profiles, product prices, or any stored data.

## When to Use This App

This app is a good fit for stores that serve any of these customer types:

- **B2B resellers** who hold a resale certificate and do not pay sales tax on goods purchased for resale
- **Non-profit organizations** that qualify for sales tax exemption under their local tax law
- **Government accounts** that present a tax-exempt certificate before placing orders
- **Internal purchasing portals** where employees buy at cost with no tax applied
- **Tax-exempt certificate holders** in jurisdictions that allow individual exemptions with documented proof

## Requirements

- PHP 8.3+
- Joomla 6.x
- J2Commerce 6.0.0 or later
- At least one tax profile configured in J2Commerce

## Installation

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_usertaxexemptions.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_usertaxexemptions.zip` package file using the **Upload Package File** tab.
4. The plugin installs and enables automatically — no manual toggle needed.

<!-- SCREENSHOT: Joomla Extensions installer showing a successful install notification for User Group Tax Exemptions -->

## Configuration

### Open the Plugin Settings

There are two ways to reach the configuration screen.

**Option A — Via J2Commerce Apps:**

Go to **J2Commerce** -> **Apps**. Find **User Group Tax Exemptions** in the list and click its name.

**Option B — Via System Plugins:**

Go to **System** -> **Manage** -> **Plugins**, search for **User Group Tax Exemptions**, and click the plugin name.

<!-- SCREENSHOT: System > Manage > Plugins list showing the User Group Tax Exemptions row -->

### Settings Reference

| Setting | Description | Default |
|---------|-------------|---------|
| **Tax Exempt User Group(s)** | One or more Joomla user groups whose members receive tax exemption at checkout. Use the search box to find groups and click to select. | (none selected) |
| **Debug Mode** | Log every tax-exemption decision to the Joomla log directory. Disable on production sites. | No |

### Select the Exempt User Groups

The **Tax Exempt User Group(s)** field shows every user group defined on your Joomla site. Click a group name to select it. You can select more than one group — each selected group appears as a tag in the field. Use the search box to filter by name if you have many groups.

:::note User groups vs. access levels
This plugin works with **Joomla user groups** (the group a user account belongs to), not view access levels. If you need to grant tax exemption to a specific customer segment, create a dedicated Joomla user group such as "Tax Exempt Customers" and assign eligible customers to it. Go to **System** -> **Manage** -> **Groups** to create and manage groups.
:::

:::note Guests are never auto-exempted
Visitors who are not logged in are never granted tax exemption, even if the **Public** group (group ID 1) is selected. Exemption requires an active logged-in session.
:::

<!-- SCREENSHOT: Plugin configuration screen showing the Tax Exempt User Group(s) field with a group selected -->

### Save

Click **Save** or **Save & Close** in the toolbar when finished.

<!-- SCREENSHOT: Plugin toolbar with Save and Save & Close buttons visible -->

## How to Set Up Tax Exemption for a Customer

Follow these steps from start to finish when onboarding a new tax-exempt customer.

### Step 1: Create a Dedicated User Group

1. Go to **System** -> **Manage** -> **Groups**.
2. Click **New** in the toolbar.
3. Enter a name such as **Tax Exempt Customers**.
4. Set **Group Parent** to **Registered** so members inherit standard site access.
5. Click **Save & Close**.

<!-- SCREENSHOT: Joomla Groups list showing a new "Tax Exempt Customers" group -->

### Step 2: Assign the Customer to the Group

1. Go to **Users** -> **Manage** and open the customer's account.
2. Click the **Assigned User Groups** tab.
3. Tick the checkbox next to **Tax Exempt Customers**.
4. Click **Save & Close**.

<!-- SCREENSHOT: User account edit screen showing the Assigned User Groups tab with "Tax Exempt Customers" checked -->

### Step 3: Enable the Plugin and Select the Group

1. Go to **System** -> **Manage** -> **Plugins** and confirm **User Group Tax Exemptions** shows a green enabled indicator. If it does not, click the status icon to enable it.
2. Click the plugin name to open its settings.
3. In the **Tax Exempt User Group(s)** field, click **Tax Exempt Customers** to select it.
4. Click **Save & Close**.

The next time that customer logs in and proceeds to checkout, tax rows will not appear in their cart or order totals.

:::tip Automate group assignment after purchase
If you sell tax-exempt access as part of a membership tier, combine this plugin with the **Add to User Group** app (`app_usergroup`). Configure that app to move a customer into the tax-exempt group when their membership order reaches the Confirmed status — no manual admin step required.
:::

## Debug Mode

Enable **Debug Mode** to write a log entry for every tax-exemption decision the plugin makes. Log entries go to:

```
administrator/logs/plg_j2commerce_app_usertaxexemptions.php
```

Each entry records:

- Whether the user is a guest (always skipped)
- The user's ID and which groups they belong to
- Which groups are configured as exempt
- Whether exemption was applied or skipped, and why

This is useful for confirming the plugin is working, or for diagnosing why a specific customer is or is not receiving exemption.

Disable Debug Mode on production sites. It adds a log write on every cart page load for logged-in customers.

## What Changed from the J2Store Version

If you previously used this app with J2Store, here is what is different in the J2Commerce version:

- **Auto-enabled on install** — the plugin enables itself on installation. No manual toggle is needed.
- **Multi-group selection** — the J2Store version stored only a single user group. J2Commerce supports selecting multiple groups from the fancy-select field.
- **Debug logging** — a dedicated **Debug Mode** toggle writes detailed log entries to the Joomla log directory. The J2Store version had no logging.
- **Standard plugin manager** — configuration lives in the Joomla Plugin Manager instead of a custom J2Store Apps tab, so you can manage it alongside all other plugins on your site.
- **Guest guard** — the J2Store version could inadvertently exempt guest users if group 1 (Public) was selected. J2Commerce explicitly skips all guest sessions.

## Troubleshooting

### Tax is still shown for an exempt customer

Work through this checklist in order:

1. **Check the user is logged in** — Guests are never exempted. Confirm the customer has an active session.
2. **Check the group assignment** — Go to **Users** -> **Manage**, open the account, and check the **Assigned User Groups** tab. The exempt group must be ticked.
3. **Check the plugin configuration** — Open the plugin settings and confirm the same group appears in **Tax Exempt User Group(s)**. If the field looks empty, re-select the group and save again.
4. **Check the plugin is enabled** — Go to **System** -> **Manage** -> **Plugins** and confirm the plugin status shows a green indicator.
5. **Use Debug Mode** — Enable it, reproduce the cart or checkout, then open `administrator/logs/plg_j2commerce_app_usertaxexemptions.php`. The log entry will state exactly why exemption was or was not applied.

### Tax is removed for customers who should not be exempt

**Cause:** A user group that should still pay tax has been included in the **Tax Exempt User Group(s)** field.

**Solution:** Open the plugin settings and review the selected groups. Remove any group that should pay tax normally. Keep in mind that Joomla user groups are hierarchical — selecting a broad parent group such as **Registered** will exempt every registered user on the site. Use a narrow, purpose-created group to limit the scope of the exemption.

### The Tax Exempt User Group(s) field appears empty after saving

**Cause:** The PSR-4 autoload cache can become stale after installation, which prevents the plugin class from loading correctly.

**Solution:**

1. Delete the file `administrator/cache/autoload_psr4.php`.
2. Visit any Joomla admin page — the cache rebuilds automatically.
3. Return to the plugin settings, re-select the exempt groups, and save.

### Multiple groups selected but only one group is being exempted

**Cause:** This is usually caused by saving with an outdated browser session or a partial form submission.

**Solution:** Open the plugin settings, confirm all intended groups appear as tags in the field, and click **Save & Close** again. Then test with a user who belongs to one of the groups that was not working.

## For Developers

This plugin subscribes to `onJ2CommerceGetDiscountedPrice` and zeroes `$item->taxprofile_id` when the current logged-in user belongs to a configured exempt group.

## Related Topics

- [Tax Profiles](../../localisation/tax-profiles.md)
- [Tax Rates](../../localisation/tax-rates.md)
- [How Tax is Calculated](../../taxation/how-tax-is-calculated.md)
- [Advanced Tax Rates App](./app-taxrate.md)
- [Add to User Group App](./usergroup.md)
