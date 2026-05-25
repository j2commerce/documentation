---
title: "Email Cart"
sidebar_label: "Email Cart"
sidebar_position: 35
description: "Let customers email their shopping cart to themselves or a friend, with configurable address form, reCAPTCHA protection, per-language email templates, and optional cart clearing."
keywords: [j2commerce, email cart, email basket, quote, save cart, recaptcha, multi-language email]
---

# Email Cart

The **Email Cart** app adds an **Email Cart** button next to the checkout button on the cart page. When a customer clicks it, a Bootstrap 5 modal slides open with an address collection form. After filling in their details and clicking **Send**, the cart contents — including item names, quantities, unit prices, and totals — are emailed to the store admin, the customer, or both.

This is useful for B2B stores where customers need to request a quote, for stores that want to let customers save and share their carts by email, and for any scenario where a customer wants a record of their basket before committing to checkout.

:::info Add-on Extension
Email Cart is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.
:::

## Installation

1. Purchase and download the `app_emailbasket.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_emailbasket.zip` package file.
4. The plugin installs and enables automatically.

After installation, go to **J2Commerce** -> **Apps** to configure it.

## Quick Start

1. Go to **J2Commerce** -> **Apps** and click **Email Cart**.
2. Set **Enable** to **Yes** in the plugin status toggle.
3. On the **Email Configuration** tab, add at least one row in **Email Translations** with a subject and body.
4. Click **Save**.

The Email Cart button now appears on the cart page automatically.

## Configuration Reference

### Basic Tab

| Setting | Description | Default |
|---------|-------------|---------|
| **Disable Proceed to Checkout** | When **Yes**, hides the standard checkout button so customers can only email the cart. | No |
| **Thank You Message Article** | Select a Joomla article to display after a cart is successfully sent. Leave empty to show a flash message instead. | — |
| **Display Terms and Conditions** | When **Yes**, a checkbox appears in the form. Customers must accept it before sending. | No |
| **Empty Cart After Email** | When **Yes**, clears the customer's cart session after a successful send. | No |
| **Empty Cart Delay (Milliseconds)** | How long to wait before clearing the cart or closing the modal after a successful send. | 2000 |
| **Show Save Cart Button** | When **Yes**, displays a secondary **Save Cart** button that links guests to the registration page. | No |
| **Enable reCAPTCHA** | Enable Google reCAPTCHA v2 spam protection on the email form. | No |
| **reCAPTCHA Site Key** | Your reCAPTCHA v2 site key. Required when reCAPTCHA is enabled. | — |
| **reCAPTCHA Secret Key** | Your reCAPTCHA v2 secret key. Required when reCAPTCHA is enabled. | — |

### Layout Tab

| Setting | Description |
|---------|-------------|
| **Form Layout** | HTML template using shortcodes to arrange the address fields inside the modal. See [Shortcodes](#shortcodes) below. |
| **Envelope Icon** | CSS class for the icon shown on the Email Cart button (e.g. `fa-solid fa-envelope` or `bi bi-envelope`). |
| **Cart Icon** | CSS class for the icon shown on the Save Cart button. |
| **Modal Custom CSS** | Free-form CSS injected into the page `<style>` tag to style the modal. |

### Email Configuration Tab

| Setting | Description |
|---------|-------------|
| **Send Email To** | Choose **Admin Only**, **User Only**, or **Both**. When **Both**, the customer receives the email as **To** and admin addresses are copied as **CC**. |
| **Email Translations** | Repeatable rows, one per language. Each row has a **Language Tag**, **Email Subject**, and **Email Body**. The row matching the current Joomla site language is used. If no match, the first row is used as a fallback. |

#### Email Translations Row Fields

| Field | Description | Example |
|-------|-------------|---------|
| **Language Tag** | Joomla language tag for this row | `en-GB`, `de-DE`, `fr-FR` |
| **Email Subject** | Subject line. Supports shortcodes. | `[user_name] has emailed their cart` |
| **Email Body** | HTML body. Use `[cart_item]` to insert the cart table. Supports all shortcodes. | `<p>Hello,</p><p>[cart_item]</p>` |

### Advanced Tab

| Setting | Description |
|---------|-------------|
| **Enable Redirect After Send** | When **Yes**, redirects the customer to a custom URL instead of closing the modal. |
| **Redirect URL** | Full URL to redirect to after a successful cart email. Visible only when redirect is enabled. |
| **Debug Mode** | Writes detailed log entries to `administrator/logs/app_emailbasket.php` and outputs debug information to the browser console. Disable in production. |

## Shortcodes

Shortcodes can be used in the **Form Layout**, **Email Subject**, and **Email Body** fields. Enclose each field name in square brackets.

| Shortcode | Description |
|-----------|-------------|
| `[first_name]` | Customer first name |
| `[last_name]` | Customer last name |
| `[email]` | Customer email address |
| `[phone_1]` | Primary phone number |
| `[phone_2]` | Secondary phone number |
| `[company]` | Company name |
| `[tax_number]` | VAT / tax registration number |
| `[address_1]` | Address line 1 |
| `[address_2]` | Address line 2 |
| `[city]` | City |
| `[zip]` | Postcode / ZIP |
| `[country_id]` | Country (resolved to country name in emails) |
| `[zone_id]` | State / province (resolved to zone name in emails) |
| `[user_name]` | Full name (first + last name combined) |
| `[site_name]` | Joomla site name from Global Configuration |
| `[cart_item]` | Cart items table (email body only) |

### Form Layout Example

The default layout uses Bootstrap grid columns to arrange fields in two columns on larger screens:

```html
<div class="row">
  <div class="col-12 emailcart-field">[email]</div>
  <div class="col-12 emailcart-field">[company]</div>
  <div class="col-lg-6 emailcart-field">[first_name]</div>
  <div class="col-lg-6 emailcart-field">[last_name]</div>
  <div class="col-lg-6 emailcart-field">[address_1]</div>
  <div class="col-lg-6 emailcart-field">[address_2]</div>
  <div class="col-lg-6 emailcart-field">[city]</div>
  <div class="col-lg-6 emailcart-field">[zip]</div>
  <div class="col-lg-6 emailcart-field">[country_id]</div>
  <div class="col-lg-6 emailcart-field">[zone_id]</div>
</div>
```

Any shortcode can be omitted from the form layout to hide that field from customers.

## Multi-Language Email Templates

The **Email Translations** subform lets you configure separate subject lines and body text for each language your store supports.

**Example setup for a bilingual store:**

| Language Tag | Subject | Body |
|--------------|---------|------|
| `en-GB` | `[user_name] emailed their cart` | `<p>Hi,</p><p>[cart_item]</p>` |
| `de-DE` | `[user_name] hat den Warenkorb per E-Mail gesendet` | `<p>Hallo,</p><p>[cart_item]</p>` |

When a German-language visitor sends their cart, the German subject and body are used. If the visitor's language has no matching row, the first row in the list is used as a fallback.

## Setting Up reCAPTCHA

1. Visit [Google reCAPTCHA](https://www.google.com/recaptcha/admin) and register your domain with **reCAPTCHA v2 ("I'm not a robot" Checkbox)**.
2. Copy the **Site Key** and **Secret Key** Google provides.
3. In the Email Cart plugin settings, switch **Enable reCAPTCHA** to **Yes**.
4. Paste the **Site Key** and **Secret Key** into the corresponding fields.
5. Save the plugin.

The reCAPTCHA widget appears at the bottom of the email form. Customers must complete it before the **Send** button becomes active.

## Disabling Checkout

To use Email Cart as your only conversion path — for example, in a B2B quote-only store — set **Disable Proceed to Checkout** to **Yes**. This hides the checkout button via CSS so customers see only the Email Cart button.

:::caution
Disabling checkout prevents all customers from completing a purchase directly. Only enable this if your business model requires it.
:::

## Empty Cart After Email

When **Empty Cart After Email** is set to **Yes**, the cart session is cleared after a successful send. The **Empty Cart Delay** controls how long the confirmation message is visible before clearing occurs. The default is 2000 milliseconds (2 seconds).

Use this together with a **Thank You Message Article** to show customers a confirmation page after their cart is emailed.

## Tips

- Keep the **Email Body** shortcode `[cart_item]` in every translation row — this is what inserts the actual cart table into the email.
- If the zone dropdown does not appear for a country, that country has no zones configured in **J2Commerce** -> **Localization** -> **Zones**.
- The **Send Email To → Both** setting is the most useful for quote-request workflows: the customer gets a copy for their records, and the admin receives the same email.
- Use **Modal Custom CSS** to match the modal's appearance to your site theme without modifying template files.

## Troubleshooting

### The Email Cart button does not appear

**Cause:** The plugin may not be enabled, or the cart is empty.

**Solution:**
1. Go to **J2Commerce** -> **Apps** and verify **Email Cart** is enabled (green toggle).
2. Add at least one item to the cart and reload the cart page.
3. Check that your Joomla template loads Bootstrap 5 — the modal requires it.

### reCAPTCHA validation always fails

**Cause:** The domain registered in Google reCAPTCHA does not match the site domain, or the secret key is entered incorrectly.

**Solution:**
1. Log in to your [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin).
2. Verify the domain listed matches your Joomla site URL exactly.
3. Re-copy the **Secret Key** and paste it into the plugin settings — do not include any trailing spaces.

### Email is not being received

**Cause:** Joomla mail settings may not be configured, or the email is being caught by spam filters.

**Solution:**
1. Go to **System** -> **Global Configuration** -> **Server** tab and verify your mail settings. Send a test email using **System** -> **System Information** -> **Mail** to confirm Joomla can send mail.
2. Check the spam folder of the recipient inbox.
3. Enable **Debug Mode** in the plugin's **Advanced** tab and attempt a send — the log at `administrator/logs/app_emailbasket.php` will show any sending errors.

### Zone dropdown does not populate after selecting a country

**Cause:** The selected country has no zones configured in J2Commerce.

**Solution:** Go to **J2Commerce** -> **Localization** -> **Zones** and add zones for the required country, or remove `[zone_id]` from the **Form Layout** if zones are not needed.

## Related Topics

- [Countries](../../localization/countries.md)
- [Zones](../../localization/zones.md)
- [Cart Page Layout](../../layout/index.md)
- [Ask Question / Quote](app-productquote.md)
