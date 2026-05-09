---
title: "Ask Question / Quote"
sidebar_label: "Ask Question / Quote"
sidebar_position: 80
description: "Let customers send an enquiry or request a price quote for any product, with configurable popup or accordion form, reCAPTCHA protection, and flexible email delivery."
---

# Ask Question / Quote

The **Ask Question / Quote** app adds an enquiry form to your product pages so customers can ask a question or request a custom price quote without going through the checkout. The form can appear as a Bootstrap 5 popup modal or as an inline accordion that expands on the page. Submitted enquiries are emailed to the store admin, the customer, or both.

You control which products show the form, where the trigger button appears, what fields the form collects, and how the email is formatted — all without touching any template files.

## Prerequisites

- J2Commerce installed and active on your Joomla 6 site
- An admin email address configured in J2Commerce (**J2Commerce -> Setup -> Configuration -> Store Profile**)
- Joomla mail settings working (**System -> Global Configuration -> Server -> Mail Settings**)

## Purchase and Download

The **Ask Question / Quote** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com/) -> **Apps**.
2. Locate the **Ask Question / Quote** app -> click **View Details** -> **Add to cart** -> **Checkout**.
3. Go to **My Downloads** under your profile menu and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the App

1. In the Joomla admin, go to **System -> Install -> Extensions**.
2. Upload the `app_productquote.zip` file or use the **Install from URL** option.
3. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extensions installer with app_productquote.zip selected -->

## Enable the App

After installation, confirm the plugin is enabled:

1. Go to **System -> Manage -> Extensions**.
2. Search for **Ask Question / Quote**.
3. If the status icon is grey, click it to enable the plugin.

<!-- SCREENSHOT: Extensions manager showing Ask Question / Quote with green enabled status -->

## Open Plugin Settings

1. Go to **J2Commerce -> Apps**.
2. Find **Ask Question / Quote** and click its name to open the settings panel.

<!-- SCREENSHOT: J2Commerce Apps screen with Ask Question / Quote listed -->

---

## Basic Settings

### Enable for All Products

| Setting | Description |
|---------|-------------|
| **Enable Ask Quote button for all products** | When set to **Yes**, the form trigger appears on every product regardless of per-product settings. When set to **No**, you enable the form per product (see [Per-Product Settings](#per-product-settings)). |
| **Hide Add to Cart button globally** | Hides the **Add to Cart** button on all products. Useful for quote-only stores. |
| **Hide Cart button for zero-price products** | Automatically hides the **Add to Cart** button for any product with a price of zero. |

### Display Settings

| Setting | Description |
|---------|-------------|
| **Form display style** | **Popup** — the form opens in a Bootstrap 5 modal overlay. **Accordion** — the form expands inline below the trigger button. |
| **Display position** | Where the trigger button appears: **Before Add to Cart**, **After Add to Cart**, or **Before Price**. |
| **Display button / link in** | Choose whether the button appears on **Product view only**, **Category view only**, or **Both views**. |
| **Display as** | Render the trigger as a styled **Button** or a plain text **Link**. |
| **Button / link text** | The text shown on the trigger. Default: "Ask Quote". |

### Terms and Conditions

Set **Require terms and conditions acceptance** to **Yes** to add a mandatory checkbox to the form. The customer must tick it before the form can be submitted.

### reCAPTCHA

To protect the form from spam, enable Google reCAPTCHA v2:

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) and register your site for **reCAPTCHA v2 (Checkbox)**.
2. Copy the **Site key** into the **reCAPTCHA Site key** field.
3. Copy the **Secret key** into the **reCAPTCHA Secret key** field.
4. Set **Enable reCAPTCHA** to **Yes**.
5. Choose a **reCAPTCHA Theme** (**Light** or **Dark**) to match your template.

<!-- SCREENSHOT: Basic Settings tab showing the reCAPTCHA fields filled in -->

---

## Email Configuration

The email tab controls what is sent when a customer submits an enquiry.

| Setting | Description |
|---------|-------------|
| **Send email to** | **Admin and customer** — sends a copy to both. **Admin only** — sends only to the store admin. **Customer only** — sends only to the submitting customer. |
| **Include field labels in email** | When **Yes**, the email body includes the field label before each value — e.g., "First Name: John". |
| **Email subject** | The subject line. Use the short codes listed below. |
| **Email body** | The email body. Supports HTML and short codes. |

### Email Short Codes

Use these placeholders in the **Email subject** and **Email body** fields. They are replaced with real values when each email is sent.

| Short code | Replaced with |
|------------|--------------|
| `[SITENAME]` | Your Joomla site name |
| `[FIRST_NAME]` | Customer first name |
| `[LAST_NAME]` | Customer last name |
| `[EMAIL]` | Customer email address |
| `[PHONE_1]` | Customer primary phone |
| `[PHONE_2]` | Customer secondary phone |
| `[COMPANY]` | Customer company name |
| `[TAX_NUMBER]` | Customer tax / VAT number |
| `[ADDRESS_1]` | Address line 1 |
| `[ADDRESS_2]` | Address line 2 |
| `[CITY]` | City |
| `[ZIP]` | Postcode / ZIP |
| `[COUNTRY_NAME]` | Country name (resolved from selection) |
| `[ZONE_NAME]` | State / zone name (resolved from selection) |
| `[PRODUCT_NAME]` | Product name (with a clickable link) |
| `[PRODUCT_SKU]` | Product SKU |
| `[PRODUCT_PRICE]` | Product price, formatted with your store currency |

For custom address fields, use the field's column name as the short code — for example, `[my_field]`.

:::tip

Use `[PRODUCT_NAME]` in the subject line so both you and the customer can instantly see which product the enquiry is about — for example: `New quote request: [PRODUCT_NAME] from [SITENAME]`.

:::

---

## Layout (Form Builder)

The **Layout** tab lets you control which fields appear in the enquiry form and in what order.

The **Form layout** textarea accepts field short codes that map directly to customer address fields. Each short code you place in the layout becomes a rendered form field. If the layout is left empty, all core fields are displayed.

**Core field short codes:**

```
[first_name] [last_name] [email] [phone_1] [phone_2]
[company] [tax_number] [address_1] [address_2]
[city] [zip] [country_id] [zone_id]
```

For custom address fields created in **J2Commerce -> Localisation -> Custom Fields**, use the field's column name as the short code.

**Example layout showing only the most common fields:**

```
[first_name] [last_name] [email] [phone_1] [company]
```

<!-- SCREENSHOT: Layout tab showing the Form layout textarea with short codes entered -->

---

## Per-Product Settings

When **Enable Ask Quote button for all products** is set to **No**, you control the quote form per product:

1. Go to **J2Commerce -> Catalog -> Products** and open a product.
2. Click the **Ask Question / Quote** tab in the product edit form.
3. Configure the fields:

| Field | Description |
|-------|-------------|
| **Enable Ask Question / Quote for this product** | Set to **Yes** to show the enquiry form trigger on this product's page. |
| **Hide Add to Cart for this product** | Set to **Yes** to hide the Add to Cart button specifically for this product. |
| **Hide price for this product** | Set to **Yes** to hide the price display for this product. |

4. Click **Save** or **Save & Close**.

<!-- SCREENSHOT: Product edit form showing the Ask Question / Quote tab with enable set to Yes -->

:::info

Per-product settings work alongside the global plugin settings. The **Hide Add to Cart button globally** and **Hide Cart button for zero-price products** options in the plugin settings take effect even when the per-product toggle is off.

:::

---

## How the Form Works

### Popup (Modal) Mode

When display style is set to **Popup**:

1. A button or link appears on the product page at the configured position.
2. The customer clicks the trigger — a Bootstrap 5 modal appears with the enquiry form.
3. The customer fills in the fields and clicks **Send**.
4. The form submits via AJAX — no page reload occurs.
5. On success, the modal closes and a confirmation message is shown.
6. On validation error, field-level error messages appear inline without closing the form.

### Accordion Mode

When display style is set to **Accordion**:

1. A button or link appears on the product page.
2. The customer clicks the trigger — the form expands inline below the button.
3. Submission and error handling work the same as popup mode.
4. A **Close** button at the bottom collapses the form.

---

## Debug Mode

Set **Debug mode** to **Yes** in the plugin settings to enable detailed logging:

- PHP-side events (CSRF checks, email sends, reCAPTCHA results) are written to `administrator/logs/app_productquote.php`.
- Browser-side events (form submissions, AJAX responses, zone loads) are written to the browser console under the `[J2C ProductQuote]` prefix.

Disable debug mode on production sites to avoid large log files.

<!-- SCREENSHOT: Plugin settings showing Debug mode set to Yes -->

---

## Tips

- If your store is for quotes only, set **Enable Ask Quote button for all products** to **Yes**, set **Hide Add to Cart button globally** to **Yes**, and leave the price visible so customers know the starting point before requesting a quote.
- Use the **Before Price** display position together with **Hide price for this product** (per-product) on items where you prefer not to show a public price — the form becomes the primary call to action.
- The `[COUNTRY_NAME]` and `[ZONE_NAME]` short codes resolve country and zone IDs to readable names automatically — you do not need to handle this in your email template.
- When **Include field labels in email** is **Yes**, empty fields are omitted from the email body, so there are no blank lines for fields the customer skipped.
- reCAPTCHA is loaded only on pages where the quote form renders — it does not add script overhead to the rest of your site.

---

## Troubleshooting

### The trigger button does not appear on a product page

**Cause:** The plugin is enabled globally but the product's per-product **Enable Ask Question / Quote** toggle is off, or the display layout type does not match the current view.

**Solution:**

1. Go to the plugin settings (**J2Commerce -> Apps -> Ask Question / Quote**) and check **Enable Ask Quote button for all products**. If it is **No**, open the product and enable the form on the **Ask Question / Quote** tab.
2. Check **Display button / link in** — if it is set to **Product view only**, the button will not appear on category listing pages, and vice versa.
3. Check **Display position** matches how the product template is structured. Some templates do not fire all position events.

### No enquiry email is received

**Cause:** The admin email is not configured, or Joomla cannot send mail.

**Solution:**

1. Go to **J2Commerce -> Setup -> Configuration** and confirm a valid email address is set in **Admin Email**.
2. Go to **System -> Global Configuration -> Server -> Mail Settings** and click **Send Test Mail**.
3. Enable **Debug Mode** in the plugin settings and submit a test enquiry. Check `administrator/logs/app_productquote.php` for error details.
4. Check your spam folder — enquiry emails may be filtered.

### The form submits but shows "A network error occurred"

**Cause:** A JavaScript error prevented the AJAX request from completing, or the server returned a non-JSON response.

**Solution:**

1. Enable **Debug Mode** and open the browser console (F12).
2. Submit the form and look for `[J2C ProductQuote]` log entries showing the response.
3. If the response is not JSON, a server-side PHP error is likely — check the Joomla error log at **System -> System Information -> PHP Error Log**.

### reCAPTCHA challenge does not appear

**Cause:** The **reCAPTCHA Site key** field is empty, or the domain is not authorised in the Google reCAPTCHA admin.

**Solution:**

1. Open the plugin settings and confirm the **reCAPTCHA Site key** is filled in.
2. Log in to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin), select your site, and verify your domain is listed under **Domains**. Add it if missing.
3. Confirm the key type is **reCAPTCHA v2 (Checkbox)** — v3 keys are not compatible.

### Zone dropdown does not populate after selecting a country

**Cause:** The selected country has no zones configured in J2Commerce, or a JavaScript error occurred during the AJAX request.

**Solution:**

1. Go to **J2Commerce -> Localisation -> Zones** and confirm zones exist for that country.
2. Enable **Debug Mode** and check the browser console for `[J2C ProductQuote]` zone-load entries.
3. If zones exist but still do not load, confirm the J2Commerce frontend component is accessible (the zone lookup uses the `com_j2commerce` component route).

---

## Related Topics

- [Custom Address Fields](../../setup/orderstatuses.md)
- [Store Configuration](../../setup/orderstatuses.md)
- [Email Templates](../../design/email-templates.md)
