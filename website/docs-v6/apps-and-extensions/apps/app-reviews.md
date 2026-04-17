---
title: "Product Reviews"
sidebar_label: "Product Reviews"
sidebar_position: 60
description: "Let customers submit star ratings and written reviews on product pages — with email review requests, image uploads, spam protection, rich snippet support, and a full admin moderation dashboard."
keywords: [j2commerce, product reviews, star ratings, customer reviews, review moderation, review emails]
---

# Product Reviews

The Product Reviews app lets customers submit star ratings and written reviews directly on your product pages. Reviews appear below the product with a summary showing the average rating and star distribution. Store owners can moderate submissions, respond to reviews, and trigger automated email requests after purchase.

Key capabilities include image uploads per review, Google reCAPTCHA spam protection, structured data (JSON-LD) for Google rich snippets, CSV import for existing reviews, review analytics, and a fully customizable HTML review request email with 20 live shortcodes.

:::info Version 6.1.0 upgrade
Version 6.1.0 replaced the old email editor in plugin settings with the core **Email Templates** admin UI. If you customised the email HTML in the old plugin config editor, you will need to recreate your template in **J2Commerce -> Email Templates** after upgrading. See [Migration note for existing admins](#migration-note-for-existing-admins) below.
:::

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

The **Product Reviews** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) -> **Apps**.
2. Locate the **Product Reviews** app -> click **View Details** -> **Add to cart** -> **Checkout**.
3. Download the `app_reviews.zip` file from your account downloads.

## Install the App

In the Joomla admin, go to **System** -> **Install** -> **Extensions**.

Upload the `app_reviews.zip` file or use the **Install from URL** option.

<!-- SCREENSHOT: Joomla Extension Manager upload screen -->

## Enable the App

Once installed, enable it from either location:

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Apps**.

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**.

Look for **Product Reviews**, click the toggle to enable it.

<!-- SCREENSHOT: Apps list showing Product Reviews toggle -->

## Configure the App

Go to **J2Commerce** -> **Apps** -> **Product Reviews** -> **Settings** to open the configuration screen.

## Settings Reference

### Basic Settings

| Setting | Description | Default |
|---------|-------------|--------|
| **Enable Reviews** | Turn review functionality on or off globally | Yes |
| **Auto-Approve Reviews** | Publish new reviews immediately without moderation | No |
| **Login Requirement** | Whether customers must be logged in to submit | Required |
| **Prevent Duplicate Reviews** | Block the same user from reviewing the same product twice | Yes |

### Display Settings

| Setting | Description |
|---------|-------------|
| **Product Display Stars** | Where to show the star summary on product detail pages |
| **Category Display Stars** | Where to show the star summary in category listing views |
| **Show Average Rating** | Display the numeric average alongside stars in the summary |
| **Clickable Star Rating** | Make the review count a link that scrolls to the reviews section |
| **Show Rating Distribution** | Show the breakdown bar chart (5-star, 4-star, etc.) |
| **Show User Reviews Tab** | Add a tab on the customer profile page listing their submitted reviews |
| **Reviews Per Page** | Number of reviews to show per page in the list |
| **Default Sort Order** | Initial sort when the reviews list loads |
| **Form Display Mode** | Show the review form inline on the page or in a modal popup |

### Style Settings

| Setting | Description |
|---------|-------------|
| **Theme Color** | Accent color applied to buttons and interactive elements |
| **Star Color** | Color for filled star icons |
| **Custom CSS** | Additional CSS rules applied to all review output |

### Submission Settings

| Setting | Description | Default |
|---------|-------------|--------|
| **Minimum Review Length** | Minimum characters required in review text | 10 |
| **Maximum Review Length** | Maximum characters allowed in review text | 2000 |
| **Require Review Content** | Make the text field mandatory (rating is always required) | No |
| **Enable Review Title** | Allow reviewers to add a short title to their review | Yes |
| **Enable Image Uploads** | Allow customers to attach photos to their review | Yes |
| **Maximum Images** | Maximum number of images per review | 5 |
| **Maximum Image Size (MB)** | Maximum file size per uploaded image | 0.1 |
| **Allowed File Extensions** | Comma-separated list of accepted image formats | jpg,jpeg,png,gif,webp |
| **Convert to WebP** | Automatically convert uploaded images to WebP format | Yes |
| **WebP Quality** | Quality level for WebP conversion (50–100) | 85 |
| **Maximum Image Width** | Maximum width in pixels for stored images | 800 |
| **Maximum Image Height** | Maximum height in pixels for stored images | 800 |
| **Thumbnail Width** | Width of generated thumbnails | 80 |
| **Thumbnail Height** | Height of generated thumbnails | 80 |

### Security Settings

| Setting | Description |
|---------|-------------|
| **Enable reCAPTCHA** | Add Google reCAPTCHA to the review form |
| **reCAPTCHA Type** | Version to use: v2 (checkbox) or v3 (invisible) |
| **reCAPTCHA Site Key** | Your Google reCAPTCHA public site key |
| **reCAPTCHA Secret Key** | Your Google reCAPTCHA private secret key |
| **reCAPTCHA v3 Threshold** | Minimum score for v3 (0.0–1.0, higher = stricter) |
| **Rate Limit (Per Hour)** | Maximum review submissions per user per hour |
| **Enable Honeypot** | Add a hidden field to catch spam bots |
| **Disable For Logged In Users** | Skip reCAPTCHA for logged-in customers |

### Email Settings

The app automatically sends review request emails to customers after their order reaches a specific status.

| Setting | Description | Default |
|---------|-------------|--------|
| **Enable Review Requests** | Send automated post-purchase review request emails | Yes |
| **Trigger Order Status** | Which order status triggers the email | Confirmed |
| **Request Delay (Days)** | Days to wait after trigger status before sending | 7 |
| **Token Expiration (Days)** | Days the one-click review link in the email remains valid | 30 |
| **Admin Notification** | Email admins when a new review is submitted | No |
| **Admin Email Addresses** | Addresses to notify (one per line) — leave blank for site admin | — |
| **Customer Approval Email** | Email customers when their review is approved | No |
| **Brand Logo** | Your store logo displayed in review request emails | — |

## Setting Up Review Request Emails

Emails are queued when an order reaches the trigger status and sent after the configured delay has passed. The app uses the J2Commerce Queue system — emails process through the **Joomla Task Scheduler** (preferred) or an external cron URL.

### Option 1: Joomla Task Scheduler (Recommended)

1. Go to **System** -> **Manage** -> **Scheduled Tasks**.
2. Confirm the **J2Commerce Queue Processor** task is enabled and set to run every 30–60 minutes.

The task scheduler is the preferred method because it runs inside Joomla's own process, handles failures with automatic retries, and requires no external server configuration.

### Option 2: External Cron URL

1. In the **Email Settings** fieldset of the plugin, copy the **Cron URL** shown there.
2. Set up a cron job on your server to call that URL every 30–60 minutes:

```bash
*/30 * * * * curl -s "https://yoursite.com/index.php?option=com_j2commerce&view=queues&task=processQueue&queue_key=YOUR_KEY&queue_type=app_reviews" > /dev/null
```

The queue processes pending emails and sends them once the configured delay has passed.

## Customising the Review Request Email

As of version 6.1.0, review request emails are managed in the Email Templates admin UI instead of the old plugin config editor.

### Choosing a Template Design

1. Go to **J2Commerce** -> **Email Templates**.
2. Click **New** (or open an existing Reviews template).
3. Set **Email Type** to **Reviews** and **Context** to **Review Request**.
4. Click **Choose Template** to open the template picker.
5. Select either **Classic** (warm, branded header with star rating buttons) or **Modern** (clean minimalist with large star icons).
6. Click **Load Template** — the HTML body is populated in the editor.

<!-- SCREENSHOT: Email template picker showing Classic and Modern cards -->

### Editing the Template

After loading a template, you can edit the HTML body in the visual editor. The shortcode panel on the right lists all 20 available tags. Click any tag to insert it at the cursor position.

<!-- SCREENSHOT: Email template editor with shortcode panel open -->

### Shortcode Reference

All 20 shortcodes are available in the subject line and body of your review request email.

#### Customer

| Shortcode | Replaced With | Example Output |
|-----------|--------------|----------------|
| `[CUSTOMER_NAME]` | Customer full name | Jane Doe |
| `[CUSTOMER_FNAME]` | First name only | Jane |
| `[CUSTOMER_LNAME]` | Last name only | Doe |
| `[CUSTOMER_EMAIL]` | Customer email address | jane@example.com |

#### Product

| Shortcode | Replaced With | Example Output |
|-----------|--------------|----------------|
| `[PRODUCT_NAME]` | Product title | Blue Widget |
| `[PRODUCT_SKU]` | Product SKU code | BW-001 |
| `[PRODUCT_MAINIMAGE]` | Full product image (`<img>` tag) | _(image tag)_ |
| `[PRODUCT_THUMBIMAGE]` | Product thumbnail (`<img>` tag) | _(image tag)_ |
| `[PRODUCT_LINK]` | Link to the product page | https://yoursite.com/... |

#### Review

| Shortcode | Replaced With | Example Output |
|-----------|--------------|----------------|
| `[REVIEW_LINK]` | General review submission URL (no pre-filled rating) | https://yoursite.com/... |
| `[REVIEW_LINK_1]` | 1-star review link | URL with `&review_score=1` |
| `[REVIEW_LINK_2]` | 2-star review link | URL with `&review_score=2` |
| `[REVIEW_LINK_3]` | 3-star review link | URL with `&review_score=3` |
| `[REVIEW_LINK_4]` | 4-star review link | URL with `&review_score=4` |
| `[REVIEW_LINK_5]` | 5-star review link | URL with `&review_score=5` |
| `[REVIEW_TOKEN]` | Raw review token string | _(hex string)_ |

#### Order

| Shortcode | Replaced With | Example Output |
|-----------|--------------|----------------|
| `[ORDER_ID]` | Order number | ORD-2026-0042 |
| `[ORDER_DATE]` | Formatted order date | April 9, 2026 |

#### Store

| Shortcode | Replaced With | Example Output |
|-----------|--------------|----------------|
| `[STORE_NAME]` | Store name from J2Commerce configuration | My Store |
| `[STORE_URL]` | Site root URL | https://yoursite.com/ |

:::tip Star rating links
Use `[REVIEW_LINK_1]` through `[REVIEW_LINK_5]` as the `href` on five clickable star images or buttons. When a customer clicks a 4-star button, the review form opens with 4 stars pre-selected — reducing friction and improving conversion.
:::

### UTM Tracking

UTM parameters are appended to every review link so you can track campaign performance in Google Analytics.

| Field | Description | Default |
|-------|-------------|--------|
| **UTM Source** | Traffic source identifier | `j2commerce` |
| **UTM Medium** | Marketing medium | `email` |
| **UTM Campaign** | Campaign name | `review_request` |
| **UTM Content** | Optional differentiator (A/B tests, etc.) | _(empty)_ |

These fields are in the **Email Settings** fieldset of the plugin configuration, under the **UTM Tracking** section.

## Migration Note for Existing Admins

**If you customised the email HTML in the old plugin config editor (before version 6.1.0),** that editor has been removed. Your old HTML is still used as a fallback — the plugin reads the saved param value and substitutes both the old `{curly_brace}` tokens and the new `[SQUARE_BRACKET]` tokens for backward compatibility.

To move to the new system:

1. Copy your old email HTML from the plugin settings (or from your records).
2. Go to **J2Commerce** -> **Email Templates** -> **New**.
3. Set **Email Type** to **Reviews** and create a new template.
4. Paste your HTML into the body editor, or start fresh from one of the two bundled designs.
5. Replace any old `{curly_brace}` tokens with the new `[SQUARE_BRACKET]` shortcodes from the reference table above.
6. Save the template — the new template takes priority over the old plugin param value.

## Google Rich Snippets

When enabled, the app outputs JSON-LD structured data on product pages so Google can display star ratings in search results.

| Setting | Description |
|---------|-------------|
| **Enable Rich Snippets** | Output JSON-LD on product pages with reviews |
| **Integrate with Schema.org Ecommerce Plugin** | Inject review data into a co-installed schema plugin |
| **Minimum Reviews** | Minimum approved reviews required before schema is added |
| **Include Individual Reviews** | Add individual review details to the structured data |
| **Maximum Individual Reviews** | Number of individual reviews to include in the schema |
| **Include Product Variants** | Add ProductGroup schema for products with variants |
| **Include Merchant Listing** | Add pricing and availability to the schema |
| **Brand Name** | Default brand for structured data |
| **Default Currency Code** | ISO 4217 currency code for pricing in schema (e.g., USD, EUR) |

## Managing Reviews

Go to **J2Commerce** -> **Apps** -> **Product Reviews** -> **Reviews** to access the review management screen.

<!-- SCREENSHOT: Reviews management list with status filter dropdowns -->

### Review Statuses

| Status | Meaning |
|--------|--------|
| **Pending** | Submitted but not yet reviewed by a moderator |
| **Approved** | Visible on the product page |
| **Rejected** | Hidden from the public but kept in the database |
| **Spam** | Identified as spam, hidden from public |

### Moderating Reviews

- Click **Approve** or **Reject** in the Actions column for individual reviews.
- Use the **Bulk Actions** dropdown to approve, reject, mark as spam, or delete multiple selected reviews at once.
- Filter by status, rating, or product using the toolbar dropdowns.

### Editing a Review

Click **Edit Review** to open the full edit form. You can:

- Change the rating, title, and content
- Write a **Store Response** that appears publicly below the review
- Update the reviewer's name, email, and associated user
- Add or remove review images
- Toggle **Verified Purchase** status
- Change the review status

<!-- SCREENSHOT: Review edit form showing Store Response field -->

## Enabling Reviews Per Product

By default, the global **Enable Reviews** setting controls all products. You can override this on individual products:

1. Edit a product in **J2Commerce** -> **Catalog** -> **Products**.
2. Scroll to the **Reviews** tab in the product form.
3. Set **Enable Reviews for this Product** to **Yes** or **No** to override the global default.

## Importing Reviews

The app includes a CSV import tool to migrate reviews from another platform.

1. Go to **J2Commerce** -> **Apps** -> **Product Reviews** -> **Import**.
2. Choose the **Product Identifier** — either **Product ID** or **SKU**.
3. Set the **Default Status** for imported reviews that have no status column.
4. Enable **Skip Duplicate Reviews** to avoid re-importing reviews by the same email for the same product.
5. Download the **Sample CSV** to see the required format.
6. Upload your CSV file and click **Start Import**.

### Required CSV Columns

| Column | Required | Description | Example |
|--------|----------|-------------|--------|
| `product_id` | If using Product ID | J2Commerce product ID | `42` |
| `sku` | If using SKU | Product SKU code | `SHIRT-L-BLU` |
| `reviewer_name` | Yes | Reviewer full name | `Jane Smith` |
| `reviewer_email` | Yes | Reviewer email address | `jane@example.com` |
| `rating` | Yes | Star rating 1–5 | `5` |
| `review_title` | No | Short title | `Great product!` |
| `review_content` | No | Full review text | `Arrived quickly...` |
| `status` | No | `pending`, `approved`, `rejected`, or `spam` | `approved` |
| `verified` | No | `1` for verified purchase, `0` otherwise | `1` |
| `created` | No | Date created (YYYY-MM-DD HH:MM:SS) | `2025-03-15 09:00:00` |
| `order_id` | No | Associated order ID | `1001` |
| `helpful` | No | Helpful vote count | `12` |

## Analytics

Go to **J2Commerce** -> **Apps** -> **Product Reviews** -> **Analytics** for a summary of review activity, including:

- Total, pending, and approved review counts
- Average rating
- Email engagement metrics (sent, engaged, pending, expired)
- Star distribution chart
- Reviews by source (product page, email, profile, backend, import)
- Device breakdown (desktop, mobile, tablet)
- User type breakdown (registered vs. guest)
- Top reviewers
- Most reviewed products
- Top-rated products

<!-- SCREENSHOT: Analytics dashboard showing charts and stats -->

## Troubleshooting

### Reviews Not Appearing on Product Pages

**Cause:** The app is enabled, but **Enable Reviews** is set to No, or the individual product has reviews disabled.

**Solution:**

1. In the plugin settings, confirm **Enable Reviews** is set to **Yes**.
2. Edit the product and check the **Reviews** tab — if an override is set to **No**, change it to **Yes** or remove the override.

### Review Request Emails Not Sending

**Cause:** No queue processor is configured, or the queue has not yet accumulated emails ready to send.

**Solution:**

1. Confirm that **Enable Review Requests** is turned on in **Email Settings**.
2. If using the Joomla Task Scheduler, go to **System** -> **Manage** -> **Scheduled Tasks** and verify the **J2Commerce Queue Processor** task is enabled.
3. If using the external cron URL, verify the cron job is running and the URL is correct.
4. Confirm that enough days have passed since the order reached the trigger status — emails are held until the **Request Delay** period expires.
5. Enable **Debug Mode** in the plugin settings and check the Joomla log file at `administrator/logs/app_reviews.php` for error messages.

### Review Request Emails Have Blank Shortcodes

**Cause:** A template exists in **Email Templates** but the shortcodes were entered with the old `{curly_brace}` syntax.

**Solution:**

1. Go to **J2Commerce** -> **Email Templates** and open the Reviews template.
2. Replace `{product_name}` with `[PRODUCT_NAME]`, `{customer_name}` with `[CUSTOMER_NAME]`, and so on — using the square-bracket syntax from the shortcode reference table above.
3. Save the template.

### reCAPTCHA Not Working

**Cause:** Invalid site key or secret key, or the domain is not registered in your Google reCAPTCHA console.

**Solution:**

1. Verify your keys at [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin).
2. Confirm the domain of your Joomla site is listed under **Domains** in the reCAPTCHA settings.
3. If using v3, try lowering the **reCAPTCHA v3 Threshold** if legitimate submissions are being blocked.

### Rich Snippets Not Appearing in Google Search

**Cause:** Google may take days or weeks to re-crawl and index updated structured data.

**Solution:**

1. Test your product page in Google's [Rich Results Test tool](https://search.google.com/test/rich-results).
2. Confirm **Enable Rich Snippets** is on and the product has at least the number of approved reviews set in **Minimum Reviews**.
3. If using the Schema.org Ecommerce plugin integration, confirm that plugin is installed and active.
