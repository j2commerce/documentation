---
title: "Availability Notification"
sidebar_label: "Availability Notification"
sidebar_position: 5
description: "Let customers sign up to be notified by email when an out-of-stock product or variant comes back into stock."
---

# Availability Notification

The Availability Notification app adds a "Notify Me" form to any product page where the selected variant is out of stock. Customers enter their email address and, when you next save the product in the admin, the plugin checks whether stock has returned and sends them a back-in-stock email automatically.

This is a zero-effort way to recover lost sales — customers who would have left empty-handed can now register their interest, and the emails go out as soon as you restock without any manual follow-up on your part.

## Prerequisites

- J2Commerce installed and active on your Joomla 6 site
- Inventory tracking enabled on the products you want to use this with (**Track Inventory** must be on for the relevant variants)
- Joomla's mail settings configured and working (**System** -> **Global Configuration** -> **Server** -> **Mail Settings**)
- An admin email address configured in J2Commerce (**J2Commerce** -> **Setup** -> **Configuration** -> **Store Profile** -> **Admin Email**)

## Purchase and Download

The **Availability Notification** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) -> **Apps**.

**Step 2:** Locate the **Availability Notification** app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile menu at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the App

In the Joomla admin, go to **System** -> **Install** -> **Extensions**.

Upload the `app_outofstockemail.zip` file or use the Install from URL option.

<!-- SCREENSHOT: Joomla Extensions installer showing the upload interface with app_outofstockemail.zip selected -->

## Enable the App

After installation, verify the plugin is enabled:

1. Go to **System** -> **Manage** -> **Extensions**.
2. Search for **Availability Notification**.
3. If the status icon is grey (disabled), click it to enable the plugin.

<!-- SCREENSHOT: Extensions manager showing Availability Notification with a green enabled status icon -->

## Configure the App

1. Go to **J2Commerce** -> **Apps**.
2. Find **Availability Notification** in the list and click its name to open the settings screen.

<!-- SCREENSHOT: J2Commerce Apps screen with Availability Notification visible in the list -->

### Configuration Fields

#### Hide Form for Variable Products Without a Default Option

**Field:** Hide notify form for variable products without default option

When set to **Yes**, the notify-me form is hidden on variable products where no default variant is pre-selected. This prevents the form from appearing before the customer has chosen a specific variant, which avoids capturing signups tied to an ambiguous product state.

Set this to **Yes** if your store has variable products and you want customers to pick a variant before they can sign up. Leave it as **No** if you want the form to appear as soon as the product loads.

<!-- SCREENSHOT: Plugin config screen with the variable_default switcher set to Yes -->

#### Show Form for Backorder-Allowed Products

**Field:** Display form for backorder-allowed products

By default, the notify-me form only shows on variants that are genuinely out of stock. If a variant allows backorders, it is technically orderable — so the form is hidden. Set this to **Yes** to show the form on backorder products as well, for example if you want to capture interest even when backorders are enabled.

<!-- SCREENSHOT: Plugin config screen with the allow_backorder_input switcher -->

#### Product URL Type

**Field:** Product URL type

Controls which URL format is used for the [PRODUCT_URL] placeholder in the back-in-stock email. Two options are available:

- **Article URL** — the standard Joomla article URL for the product page
- **J2Commerce URL** — the J2Commerce SEF (search-engine-friendly) URL for the product

Use **J2Commerce URL** unless your store layout relies on article URLs for product pages.

<!-- SCREENSHOT: Plugin config screen showing the URL type dropdown -->

#### Delete Signup Record After Sending

**Field:** Delete notification entry after email is sent to customer

When set to **No** (the default), the signup record is kept in the database after the back-in-stock email is sent and the record is marked as sent. The customer will not be emailed again.

When set to **Yes**, the signup record is deleted entirely after the email is sent. Use this if you prefer a clean database with no historical signup data retained.

<!-- SCREENSHOT: Plugin config screen with the delete_email switcher -->

#### Notify Button Text

**Field:** Notify Button Text

The label displayed on the submit button of the notify-me form on the product page. The default text is "Notify Me". Change this to match your store's language or tone — for example "Email Me When Available" or "Alert Me".

<!-- SCREENSHOT: Plugin config screen showing the Notify Button Text field with sample text -->

#### Email Subject

**Field:** Email Subject

The subject line of the back-in-stock email sent to customers. You can use any of the placeholder tags listed below to personalise the subject. For example:

`[PRODUCT_NAME] is back in stock at [SITENAME]`

<!-- SCREENSHOT: Plugin config screen showing the Email Subject textarea with example text -->

#### Email Body

**Field:** Email Body

The body of the back-in-stock email. This field uses the Joomla editor so you can add HTML formatting, links, and images. Use the placeholder tags listed below to insert product-specific information.

A sensible default body is pre-filled on installation — you can edit it to match your store's branding.

<!-- SCREENSHOT: Plugin config screen showing the Email Body editor field with default content visible -->

#### Debug Mode

**Field:** Debug Mode

When set to **Yes**, the plugin writes detailed activity logs to `administrator/logs/j2commerce_app_outofstockemail.php`. This is useful for diagnosing email delivery problems. Keep this set to **No** in production.

<!-- SCREENSHOT: Plugin config screen with the Debug Mode switcher -->

Click **Save** after making any changes.

## How It Works for the Customer

When a customer visits a product page and selects a variant that is out of stock, the notify-me form appears below the add-to-cart area.

<!-- SCREENSHOT: Product detail page showing an out-of-stock variant with the Notify Me form visible below the button area, including an email input field and the Notify Me button -->

The customer enters their email address and clicks the button. They receive an immediate on-screen message confirming their signup. The plugin also sends your store admin an email noting that a customer has requested notification for that specific product and variant.

If the same email address is already signed up for the same product and variant, the system silently ignores the duplicate — customers will not receive multiple emails for a single restock event.

## How It Works for the Admin

Stock check and customer notification emails are sent when you **save a product** in the admin:

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Open the product that has been restocked.
3. Update the inventory quantity on the relevant variants if you haven't already.
4. Click **Save** or **Save & Close**.

At that point the plugin checks every pending signup for that product. For each signup where the variant's quantity is now greater than zero and the notification has not already been sent, it dispatches a back-in-stock email to the customer.

<!-- SCREENSHOT: Product edit screen in the admin with the Save button highlighted, and a note indicating that saving triggers the stock check -->

After sending, the plugin either marks the record as sent (so it won't fire again) or deletes it entirely, depending on your **Delete Signup Record After Sending** setting.

:::info

The notification trigger is the **product save action in the admin**, not a background task. If you update stock by importing a CSV or via another method that does not go through the product edit screen, the emails will not send automatically — open and save the product manually to trigger the check.

:::

## Email Placeholder Reference

Both the **Email Subject** and **Email Body** fields support the following placeholders. Each tag is replaced with the actual value when the email is sent.

| Tag | Replaced With | Example Output |
|-----|--------------|----------------|
| `[SITENAME]` | Your Joomla site name | My Online Store |
| `[EMAIL]` | The customer's email address | customer@example.com |
| `[PRODUCT_SKU]` | The variant's SKU | TSHIRT-L-BLUE |
| `[PRODUCT_NAME]` | The product name | Classic Cotton T-Shirt |
| `[PRODUCT_URL]` | Direct link to the product page | https://example.com/shop/classic-cotton-t-shirt |
| `[OPTION_NAME]` | The selected variant option label | Large / Blue |

The admin notification email uses a separate, hardcoded template that includes the customer's email address, the product name, and the variant option. It is sent to the **Admin Email** address set in **J2Commerce** -> **Setup** -> **Configuration**.

## What's New vs. J2Store

This J2Commerce 6 version of the plugin includes several improvements over the original J2Store edition:

- **CSRF protection on the signup form.** The original plugin sent email submissions without a security token. The J2Commerce version includes and validates a CSRF token on every submission, protecting against cross-site request forgery.
- **Duplicate signup prevention at the database level.** The original plugin checked for duplicates with a SELECT-then-INSERT approach that could create duplicate rows under concurrent load. J2Commerce enforces uniqueness with a database-level constraint, so duplicates are impossible regardless of load.
- **Admin privacy fix.** The original plugin accidentally added admin email addresses as CC recipients on customer-facing back-in-stock emails, leaking internal addresses. This is fixed — admins receive their own separate notification only at signup time.
- **Vanilla JavaScript, no jQuery.** The notify-me form now uses modern ES6+ JavaScript with `fetch()` and `async/await`. There is no jQuery dependency.
- **Joomla 6 native patterns.** The plugin uses the Joomla 6 event subscriber system, namespaced PHP classes, and native form configuration — removing all FOF 2 framework dependencies.

## Troubleshooting

### The notify-me form does not appear on the product page

**Cause:** The variant may not be recognised as out of stock, or a configuration filter is hiding the form.

**Solution:**

1. Confirm that **Track Inventory** is enabled on the product variant. Go to **J2Commerce** -> **Catalog** -> **Products**, open the product, and check the **Inventory** tab. If inventory tracking is off, the plugin cannot determine whether the item is out of stock.
2. If the product is a variable product, check the **Hide notify form for variable products without default option** setting. If this is set to **Yes**, the form is hidden until the customer selects a variant.
3. If the variant allows backorders and you want the form to show, set **Display form for backorder-allowed products** to **Yes**.
4. Confirm the plugin is enabled in **System** -> **Manage** -> **Extensions**.

### No back-in-stock emails are being sent after saving a product

**Cause:** Either there are no pending signups for that product, the variant quantity is still zero, or Joomla's mail system is not configured.

**Solution:**

1. Enable **Debug Mode** in the plugin settings, then save the product again. Check `administrator/logs/j2commerce_app_outofstockemail.php` for activity entries — the log will show how many pending signups were found and whether emails were attempted.
2. Confirm the variant quantity is greater than zero on the **Inventory** tab before saving.
3. Go to **System** -> **Global Configuration** -> **Server** -> **Mail Settings** and click **Send Test Mail** to confirm Joomla can send email.
4. Check your spam folder — back-in-stock emails may be filtered by your mail provider.
5. Confirm the **Admin Email** field in **J2Commerce** -> **Setup** -> **Configuration** contains a valid address.

### Customers receive multiple back-in-stock emails for the same product

**Cause:** This should not happen with the current version — the database prevents duplicate signups and the sent flag prevents re-sending. If you are seeing duplicates, you may be running an older version of the plugin.

**Solution:** Update to the latest version from the J2Commerce Extensions Store and re-save the product to re-trigger the check against the cleaned-up table.

### The notify-me form appears on products that are in stock

**Cause:** The variant's inventory quantity may be zero in the database even though you believe it is in stock, or inventory tracking is set up on the product but the quantity field was not filled in.

**Solution:** Open the product in **J2Commerce** -> **Catalog** -> **Products**, switch to the **Inventory** tab, and confirm that the variant has a positive quantity and that **Track Inventory** is enabled. If **Track Inventory** is off, the plugin falls back to the variant's stock status field — check that it is set to **In Stock**.
