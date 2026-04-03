---
title: "Data Validation"
sidebar_label: "Data Validation"
sidebar_position: 30
description: "Validate custom checkout fields with configurable rules like max length, numeric, email, phone, postal code, and field matching."
---

# Data Validation

The Data Validation app lets you set validation rules on your custom checkout fields. For each custom field you have created, you can define one or more rules — such as requiring a minimum length, allowing only numeric input, validating an email address, or checking that two fields match. Rules are applied per checkout step (billing, shipping, payment, or register), so you have fine-grained control over where each rule is enforced.

This is ideal for stores that use custom checkout fields to collect additional information and need to ensure that information is correct before the order is processed.

## Requirements

- PHP 8.3.0 or newer
- Joomla! 6.x
- J2Commerce 6.x
- At least one custom checkout field configured under **J2Commerce** -> **Custom Fields**

## Purchase and Download

The **Data Validation** app is a premium add-on available from the J2Commerce extension directory.

**Step 1:** Go to the [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Data Validation** app **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right and find the app. Click **Available Versions** **->** **View Files** **->** **Download**.

## Install the App

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the plugin ZIP file or use the **Install from URL** option.

<!-- SCREENSHOT: System > Install > Extensions showing the upload area -->

## Enable the App

Once installed, enable the app. There are two ways to reach it:

**Option A:** Click the **J2Commerce** icon at the top right **->** **Apps**

**Option B:** Go to **Components** on the left sidebar **->** **J2Commerce** **->** **Apps**

<!-- SCREENSHOT: Apps list showing Data Validation with the enable toggle -->

Search for **Data Validation**, then click the toggle to enable it. The toggle turns green when the app is active.

## Configure Validation Rules

Click the **Data Validation** title to open the plugin configuration. The **Basic** tab shows a table listing every enabled custom checkout field.

<!-- SCREENSHOT: Plugin params page showing the validation rules table with columns: Custom Fields, Rules Apply For, Rules -->

For each custom field, you configure two things:

1. **Rules Apply For** — which checkout step(s) the rules are enforced on
2. **Rules** — one or more validation rules for that field

### Step 1: Choose When Rules Apply

In the **Rules Apply For** column, select one or more checkout steps by holding **Ctrl** (Windows/Linux) or **Command** (Mac) and clicking:

| Option | When it fires |
|--------|--------------|
| **Billing** | When the customer submits their billing address |
| **Shipping** | When the customer submits a separate shipping address |
| **Payment** | When the customer confirms the payment step |
| **Register** | When a new customer registers during checkout |

### Step 2: Add Rules

Click the **Add Rules** button for a custom field to add a new rule row. Each row has a rule type dropdown and, depending on the rule, a value input.

<!-- SCREENSHOT: Rule row showing the rule type dropdown and value input -->

| Rule Type | What it validates | Value needed |
|-----------|------------------|--------------|
| **Match Field** | Field must match another custom field's value | Select the comparison field |
| **Max Length** | Field must not exceed a character count | Enter the maximum number of characters |
| **Min Length** | Field must have at least this many characters | Enter the minimum number of characters |
| **Numeric** | Field must contain only numbers | None |
| **Alphabet** | Field must contain only letters | None |
| **Alphanumeric** | Field must contain only letters and numbers | None |
| **Phone** | Field must be a valid phone number format | None |
| **Email** | Field must be a valid email address | None |
| **Postal/Zip Code** | Field must match the postal code format for the customer's country | None |
| **Match Table Field** | Field value must exist in a specific database table column | Select table and column |

You can add multiple rules to the same field. All rules must pass for the field to be considered valid.

To remove a rule, click the trash icon on the right side of the rule row.

### Step 3: Save

Click the **Apply** button below the table to save all validation rules. A confirmation message appears when the save is successful.

<!-- SCREENSHOT: Save confirmation message -->

## Rule Details

### Match Field

Validates that the value entered in this field is identical to another custom field's value. Commonly used to confirm a password or email address.

Example: Create a **Confirm Email** field and set a Match Field rule pointing to your **Email** field. If the two values differ, the customer sees an error.

### Max Length and Min Length

Control the number of characters allowed. Both rules can be applied together to enforce a range.

Example: Add **Min Length = 8** and **Max Length = 20** to a password field to require between 8 and 20 characters.

### Postal/Zip Code

Validates that the value in the field matches the correct postal code format for the country the customer has selected in their address. Supports over 85 countries, including the United States, United Kingdom, Canada, Germany, France, Australia, and many more.

:::info
Postal code validation uses the billing address country field. If the customer has not selected a country, the rule is skipped.
:::

### Match Table Field

Validates that the value entered exists as a record in a specific database table column. This is useful for scenarios like validating a member number, coupon code, or other data stored in your database.

**To configure Match Table Field:**

1. Select the rule type **Match Table Field** from the dropdown.
2. In the first select box, choose the **database table** to search.
3. In the second select box, choose the **column** within that table to match against.

If the customer's input is not found in the selected column, they see an error message.

:::caution
Match Table Field gives access to all database tables in your Joomla installation. Use this rule only with data in your own extension's tables. Do not expose sensitive system tables to validation logic.
:::

## How Errors Appear at Checkout

When a field fails validation, the customer sees an error message directly below the affected field. The specific message depends on the rule:

| Rule | Error message shown |
|------|--------------------|
| Match Field | "[Field A] does not match with [Field B]" |
| Max Length | "Maximum allowed length is [number]" |
| Min Length | "Minimum length [number] required" |
| Numeric | "Field value must be numeric" |
| Alphabet | "Field value must be alphabet" |
| Alphanumeric | "Field value must be alphanumeric" |
| Phone | "Field value must be a valid phone number" |
| Email | "Field value must be a valid email" |
| Postal/Zip Code | "Invalid Postal/Zip Code Format" |
| Match Table Field | "Enter data not available" |

The customer cannot proceed to the next checkout step until all validation errors are resolved.

## Debug Mode

The **Advanced** tab contains a **Debug Mode** toggle. When enabled, the plugin writes detailed log entries to `administrator/logs/app_validationrules.php`. This is helpful for diagnosing validation issues during development or testing.

:::warning
Disable Debug Mode in production environments. Log files can grow large under normal traffic.
:::

## Troubleshooting

### Rules are not being applied at checkout

**Check 1:** Confirm that the custom field is enabled under **J2Commerce** -> **Custom Fields**. Only enabled fields appear in the validation rules table.

**Check 2:** Confirm the custom field is set to display on the same checkout step(s) selected in **Rules Apply For**. A billing rule will not fire if the field is not shown on the billing step.

**Check 3:** Check that the **Data Validation** app itself is enabled in **J2Commerce** -> **Apps**.

### Postal code validation is not working

The postal code rule reads the `country_id` value from the checkout form. Confirm the customer's billing address includes a country selection. If no country is selected, the rule is skipped silently.

### Match Table Field shows no columns

The column dropdown is populated by a live AJAX request after you select a table. If no columns appear, check that the administrator session is still active (the page has not timed out) and reload the plugin configuration page.

### Validation fires on the wrong step

Each rule only applies on the step(s) selected in **Rules Apply For**. If a rule appears to fire unexpectedly, check whether the same custom field is displayed on multiple steps and whether each of those steps is selected.

## Related Topics

- [Custom Fields](../../configuration/custom-fields.md)
- [Checkout Configuration](../../configuration/checkout.md)
