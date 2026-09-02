---
title: "Ask Question / Quote"
sidebar_label: "Ask Question / Quote"
sidebar_position: 80
description: "Let customers ask a question or request a price quote for any product, then track, filter, and reply to every request from a dedicated admin dashboard and submissions manager."
---

# Ask Question / Quote

The Ask Question / Quote app adds an enquiry button to your product pages so customers can ask a question or request a custom price quote without going through checkout. The form can appear as a popup or as an inline accordion, and every request that comes in is stored in your admin so you can track it, filter it, and mark it as replied — no digging through your inbox required.

## Requirements

- with PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/) **->** **Apps**

**Step 2:** Locate the **Ask Question / Quote** App **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Install the App

You can install this **Ask Question / Quote** App using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the plugin ZIP file or use the Install from URL option.

![](/img/productquote-install1.webp)

## Enable the App

Once you have installed the App, you will need to enable it. There are **two** ways you can access the extension.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

![](/img/productquote-apps.webp)

Look for **Ask Question / Quote**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/productquote-enable1.webp)

## Configure the App

Once you click on the **Ask Question / Quote** Title next to the green checkmark, you are ready to start setting up the parameters.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

![](/img/productquote-toggle.webp)

### Basic Settings tab{#basic-settings}

![](/img/productquote-config1.webp)

| Setting | Description | Default |
| --- | --- | --- |
| **Enable For All Products** | When set to **Yes**, the Ask Quote button appears on every product regardless of per-product settings. When **No**, you turn it on per product (see [Per-Product Settings](#per-product-settings)). | No |
| **Hide Add To Cart** | Hides the **Add to Cart** button on every product. Handy for a quote-only store. | No |
| **Hide Cart On Zero Price** | Hides the **Add to Cart** button automatically for any product with a price of zero. | No |
| **Form Style** | **Popup** opens the form in a modal overlay. **Accordion** expands the form inline on the page. | Popup |
| **Popup Size** | Only shown when **Form Style** is **Popup**. Choose **Small**, **Normal**, or **Large**. Normal uses your template's default width. | Normal |
| **Button Position** | Where the trigger appears: **Before Add to Cart**, **After Add to Cart**, or **Before Price**. | Before Add to Cart |
| **Show In** | **Product View Only**, **Category View Only**, or **Both Views**. | Product View Only |
| **Display As** | Render the trigger as a styled **Button** or a plain text **Link**. | Button |
| **Button Width** | Only shown when **Display As** is **Button**. **Inline** keeps its natural width; **Full Width** stretches it across the column, so it can stand in for the Add to Cart button. | Inline |
| **Button Text** | The text on the trigger. Leave blank to use the default, "Ask Quote". | Ask Quote |
| **Subtemplate** | Choose **Auto** to match your site's active template family, or force **Bootstrap 5** / **UIkit**. | Auto |
| **Require Terms** | When **Yes**, a mandatory checkbox is added and the customer must accept it before submitting. | No |
| **Captcha** | Choose an enabled Joomla captcha plugin to protect the quote form from spam. Leave **Disabled** if you have none set up. | Disabled |
| **Empty Cart On Send** | When **Yes**, the customer's cart is cleared and they are redirected to the home page after a successful submission. | No |
| **Debug Mode** | Enables detailed logging to the Joomla log file and browser console. Leave **No** on a live site. | No |

:::info

The **Captcha** field lists whatever Joomla captcha plugins you already have enabled site-wide (for example reCAPTCHA). Install and enable a captcha plugin under **System -> Manage -> Plugins** first, then select it here.

:::

### Email Settings tab{#email-settings}

![](/img/productquote-config2.webp)

| Setting | Description | Default |
| --- | --- | --- |
| **Send To** | **Admin And Customer**, **Admin Only**, or **Customer Only** — who receives the notification email. | Admin And Customer |
| **Submissions Per Hour** | How many quote requests one visitor may send in an hour. This is light friction only, because it counts per browser session. Set to **0** to remove it. | 5 |
| **Hourly Send Limit** | The most quote requests your whole store will send in any one hour, counted from what has actually been sent. No visitor can reset this one, so it is the setting that protects your sending reputation. Raise it if a busy store hits it; set to **0** to remove it. | 100 |
| **Additional Admin Notification Emails** | Every J2Commerce admin address already receives the admin notification automatically, so they do not need listing here. Use this field for anyone else who should be notified — a sales manager, for example — but is not a store admin. Separate multiple addresses with commas. | *(empty)* |

:::info

The quote form is public, so anyone can submit it. **Submissions Per Hour** only slows down a person clicking Send repeatedly in one browser — it does not stop an automated script, which can start a fresh session at any time. The two settings that actually protect your store are **Hourly Send Limit** above and a **Captcha** on the Basic Settings tab. Turn on a captcha before you go live.

:::

**Email Content:** two buttons add the bundled customer and admin quote-request templates under the **Ask Question / Quote** email type — **Joomla Editor Version** or **Visual Editor Version**. Existing templates keep their content and are simply converted to the flavor you pick.

**Email Templates:** a toolbar button opens the Email Templates manager filtered to this app's templates, where you write the actual subject and body.

:::info

This app does not have its own subject/body fields. All email content — subject line, body, and which [short codes](#email-short-codes) are used — is written in **J2Commerce -> Setup -> Email Templates**, under the **Ask Question / Quote** email type. Click one of the **Email Content** buttons first if you have not created these templates yet, then use the **Email Templates** button to edit them.

:::

### Form Fields tab{#form-fields}

![](/img/productquote-config3.webp)

**Manage Form Fields** opens the **J2Commerce -> Custom Fields** manager, where you choose which fields appear on the quote request form. Create or edit a custom field there and enable its **Product Quote Form** toggle to add it to the quote form.

**Fieldsets** groups those fields into named sections on the form. Click **Add Custom Fieldset** to create a fieldset:

| Field | Description |
| --- | --- |
| **Fieldset Name** | Required. The heading shown above this group of fields on the form. |
| **Fieldset Icon** | Optional. An icon class, for example `fa-solid fa-user`. |

Once you have at least one fieldset, open the **Form Builder** screen (from the dashboard's **Form** menu) to assign each custom field to a fieldset, mark it required, and drag fields into the order you want them to appear.

![](/img/productquote-form-builder.webp)

## Admin Dashboard{#admin-dashboard}

Go to **J2Commerce -> Apps -> Ask Question / Quote** (click the app name), or open the **Quote Requests** item under the J2Commerce menu, to see the dashboard. It covers whatever date range you pick — use the **Last 1 Day / 7 Days / 30 Days / 90 Days** presets or set your own dates and click **Refresh**.

![](/img/productquote-dashboard1.webp)

Four cards summarize the selected period:

- **Total Requests** — how many quote requests came in, with the change from the prior period.
- **Requests Today**
- **Unique Products Quoted**
- **Reply Rate** — the percentage of requests you have marked **Replied**, with the change shown in percentage points.

Two chart panels sit below the cards:

- **Submissions Per Day** and **Current Status** (which plots **Received**, **Replied**, and **Send Failed** requests per day) share a tabbed panel.
- **Most Popular Times** — a bar chart of requests by hour of day — sits in its own panel.

Three cards round out the dashboard: **Hottest Products** (most-quoted products), **Recent Requests** (click a name to open the submission), and **Top Requester Countries**.

## Submissions Manager{#submissions-manager}

Open **Submissions** from the dashboard's **Form** menu to see every quote request that has come in.

![](/img/productquote-submissions1.webp)

The list is searchable (by name, email, company, or product), filterable by status, product, and date range, and every column header sorts the list. Columns shown: **ID**, **Customer**, **Created**, **Email**, **Company**, **Product**, **Status**.

Click a customer's name or the **Created** date to open the full submission, including any custom fields that do not have their own column.

![](/img/productquote-submission-detail.webp)

**Status** has three states:

| Status | What it means |
| --- | --- |
| **Received** | The request has arrived and is waiting on you. |
| **Replied** | You set this by hand once you have answered the customer. |
| **Send Failed** | The notification email could not be delivered. This is reported automatically — you never choose it. |

Change a single row's status directly in the list with the dropdown and **Apply** button. To change several at once, tick their checkboxes and click **Batch** in the toolbar. To permanently remove old submissions, tick them and click **Trash** in the toolbar — this cannot be undone.

## Per-Product Settings{#per-product-settings}

When **Enable For All Products** is set to **No**, turn the quote form on per product instead:

1. Go to **J2Commerce -> Catalog -> Products** and open a product.
2. Go to the **J2Commerce** tab **-> Apps** tab **-> Ask Question / Quote** section.
3. Configure the fields:

| Field | Description |
| --- | --- |
| **Enable Quote Request** | Shows the Ask Quote form trigger on this specific product. |
| **Hide Add To Cart** | Hides the Add to Cart button on this product's page. |
| **Hide Price** | Hides the price display on this product's page. |

![](/img/productquote-product-apps-tab.webp)

Click **Save** or **Save & Close**.

:::info

Per-product settings work alongside the global settings. **Hide Add To Cart** and **Hide Cart On Zero Price** in the app's own Basic Settings tab still apply even when the per-product toggle is off.

:::

## Email Short Codes{#email-short-codes}

Use these short codes in your templates under **J2Commerce -> Setup -> Email Templates -> Ask Question / Quote**. They are replaced with real values when each email is sent.

| Short code | Replaced with |
| --- | --- |
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
| `[ZIP]` | Zip / postal code |
| `[COUNTRY_NAME]` | Country name |
| `[ZONE_NAME]` | State / zone name |
| `[PRODUCT_NAME]` | Product name |
| `[PRODUCT_SKU]` | Product SKU |
| `[PRODUCT_PRICE]` | Product price, formatted with your store currency |
| `[PRODUCT_URL]` | A link to the product page |
| `[QUOTE_FIELDS]` | A table of every field the customer filled in on the form |
| `[SITENAME]` | Your Joomla site name |

For a custom field you added to the quote form, use that field's own column name as the short code.

## How It Works{#how-it-works}

1. J2Commerce checks whether the Ask Quote button should appear — global setting or per-product toggle, plus the **Show In** and **Button Position** settings.
2. The customer clicks the trigger. Depending on **Form Style**, a popup opens or the accordion expands inline.
3. The customer fills in the fields defined on the [Form Fields](#form-fields) tab, accepts the terms if required, and completes the captcha if one is configured.
4. The form submits without reloading the page.
5. The request is saved and appears in the [Submissions Manager](#submissions-manager) with a status of **Received**.
6. Notification emails go out per the **Send To** setting, using the templates you authored in the Email Templates manager. If a send fails, the submission's status changes to **Send Failed** automatically.
7. On success, the customer sees a confirmation message. On a validation error, field-level messages appear without closing the form.

## Tips{#tips}

- **Quote-only store** — set **Enable For All Products** to **Yes**, **Hide Add To Cart** to **Yes**, and leave the price visible so shoppers know the starting point before asking for a quote.
- **Replace the price with a call to action** — pair **Button Position: Before Price** with the per-product **Hide Price** toggle on items where you would rather not show a public price.
- **Turn on a captcha before you go live** — it is the single most effective thing you can do to keep automated submissions off a public form. Pick any enabled Joomla captcha plugin on the **Basic Settings** tab.
- **Set the Hourly Send Limit to suit your volume** — it is a safety net for your mail reputation, not a day-to-day limit. Pick a number comfortably above your busiest real hour.
- **Watch Send Failed, not just Received** — a growing pile of **Send Failed** submissions on the dashboard's Current Status chart usually means a mail server problem, not a form problem.
- **Write your templates before you go live** — use the **Email Content** buttons to seed the bundled templates, then edit them in the Email Templates manager so both you and your customers get a properly branded email.

## Troubleshooting{#troubleshooting}

### The trigger button does not appear on a product page{#trigger-button-missing}

**Cause:** The app is enabled globally but the product's own **Enable Quote Request** toggle is off, or **Show In** does not match the page you are viewing.

**Solution:**

1. Go to **J2Commerce -> Apps -> Ask Question / Quote** and check **Enable For All Products**. If it is **No**, open the product and turn on **Enable Quote Request** under the **Apps** tab.
2. Check **Show In** — if it is **Product View Only**, the button will not appear on category pages, and vice versa.
3. Confirm **Button Position** matches how your template renders the product page; some templates do not fire every position event.

### Customers see "Quote requests are not available right now"{#not-available}

**Cause:** One of three things — the product is not eligible for quotes, the visitor has hit **Submissions Per Hour**, or the store has hit its **Hourly Send Limit**. The message is deliberately the same for all three so the form cannot be used to probe your catalog.

**Solution:**

1. Check the product first: open it, go to the **Apps** tab, and confirm **Enable Quote Request** is **Yes** — or that **Enable For All Products** is **Yes** in the app settings.
2. Confirm the product itself is published and visible to the visitor. An unpublished product, or one in a category the visitor's group cannot see, will always decline.
3. If the product is fine, go to **J2Commerce -> Apps -> Ask Question / Quote -> Email Settings** and raise **Submissions Per Hour** or **Hourly Send Limit**.
4. If your store is legitimately busy and keeps hitting the ceiling, raise **Hourly Send Limit** rather than removing it.

### A submission shows "Send Failed"{#send-failed}

**Cause:** Joomla could not deliver the notification email for that request.

**Solution:**

1. Go to **System -> Global Configuration -> Server -> Mail Settings** and click **Send Test Mail**.
2. Enable **Debug Mode** in the app's Basic Settings and submit a test enquiry, then check the Joomla system log for the failure detail.
3. Once mail is working again, existing **Send Failed** rows will not resend automatically — reply to the customer directly and mark the submission **Replied**.

### No enquiry email is received at all{#no-email-received}

**Cause:** Mail is not configured, or the emails are landing in spam.

**Solution:**

1. Go to **System -> Global Configuration -> Server -> Mail Settings** and confirm mail is set up correctly.
2. Check the submission in the **Submissions Manager** — if its status is **Send Failed**, see the previous section.
3. Check your spam folder; enquiry emails can be filtered by aggressive spam rules.
4. If you added a **Additional Admin Notification Emails** address, double check it is spelled correctly and comma-separated.

### Captcha does not appear on the form{#captcha-missing}

**Cause:** No captcha plugin is selected, or the selected plugin is not enabled.

**Solution:**

1. Go to **System -> Manage -> Plugins** and confirm a captcha plugin (for example reCAPTCHA) is installed and enabled, with its own site key/secret configured.
2. Go to **J2Commerce -> Apps -> Ask Question / Quote -> Basic Settings** and select it under **Captcha**.

### The dashboard shows a storage warning{#storage-missing}

**Cause:** The app's submission storage table is missing — usually a site that had the plugin installed before an update added the dashboard and submissions manager.

**Solution:**

1. Reinstall or update the **Ask Question / Quote** app from the ZIP file so its install/update SQL can run.
2. Reload the dashboard.
