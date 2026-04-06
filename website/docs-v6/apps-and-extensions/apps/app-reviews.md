---
title: "Product Reviews"
sidebar_label: "Product Reviews"
sidebar_position: 60
description: "Let customers submit star ratings and written reviews on product pages — with email review requests, image uploads, spam protection, rich snippet support, and a full admin moderation dashboard."
keywords: [j2commerce, product reviews, star ratings, customer reviews, review moderation, review emails]
---

# Product Reviews

The Product Reviews app lets customers submit star ratings and written reviews directly on your product pages. Reviews appear below the product with a summary showing the average rating and star distribution. Store owners can moderate submissions, respond to reviews, and trigger automated email requests after purchase.

Key capabilities include image uploads per review, Google reCAPTCHA spam protection, structured data (JSON-LD) for Google rich snippets, CSV import for existing reviews, review analytics, and a customizable HTML review request email.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

The **Product Reviews** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) -> **Apps**.
2. Locate the **Product Reviews** app -> click **View Details** -> **Add to cart** -> **Checkout**.
3. Download the `app_reviews.zip` file from your account downloads.

## Installation

1. Go to **System** -> **Install** -> **Extensions**.
2. Upload the `app_reviews.zip` package file.
3. The plugin installs and enables automatically.

## Enable and Configure

1. Go to **J2Commerce** -> **Apps**.
2. Find **Product Reviews** in the list and click its title to open settings.

<!-- SCREENSHOT: Apps list with Product Reviews highlighted -->

## Settings Reference

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable Reviews** | Turn review functionality on or off globally | Yes |
| **Auto-Approve Reviews** | Publish new reviews immediately without moderation | No |
| **Login Requirement** | Whether customers must be logged in to submit | Optional |
| **Prevent Duplicate Reviews** | Block the same user from reviewing the same product twice | Yes |
| **Enable Quick Icon** | Show a quick-access icon in the Joomla administrator dashboard | No |

### Display Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Product Display Stars** | Where to show the star summary on product detail pages | After product title |
| **Category Display Stars** | Where to show the star summary in category listing views | — |
| **Show Average Rating** | Display the numeric average alongside stars in the summary | Yes |
| **Clickable Star Rating** | Make the review count a link that scrolls to the reviews section | Yes |
| **Show Rating Distribution** | Show the breakdown bar chart (5-star, 4-star, etc.) | Yes |
| **Show User Reviews Tab** | Add a tab on the customer profile page listing their submitted reviews | Yes |
| **Reviews Per Page** | Number of reviews to show per page in the list | 10 |
| **Default Sort Order** | Initial sort when the reviews list loads | Most Recent |
| **Form Display Mode** | Show the review form inline on the page or in a modal popup | Inline |

### Style Settings

| Setting | Description |
|---------|-------------|
| **Theme Color** | Accent color applied to buttons and interactive elements |
| **Star Color** | Color for filled star icons |
| **Custom CSS** | Additional CSS rules applied to all review output |

### Submission Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Minimum Review Length** | Minimum characters required in review text | 10 |
| **Maximum Review Length** | Maximum characters allowed in review text | 5000 |
| **Require Review Content** | Make the text field mandatory (rating is always required) | No |
| **Enable Review Title** | Allow reviewers to add a short title to their review | Yes |
| **Enable Image Uploads** | Allow customers to attach photos to their review | No |
| **Maximum Images** | Maximum number of images per review | 3 |
| **Maximum Image Size (MB)** | Maximum file size per uploaded image | 5 |
| **Allowed File Extensions** | Comma-separated list of accepted image formats | jpg, jpeg, png, gif, webp |
| **Convert to WebP** | Automatically convert uploaded images to WebP format | Yes |
| **WebP Quality** | Quality level for WebP conversion (50–100) | 85 |
| **Maximum Image Width** | Maximum width in pixels for stored images | 1200 |
| **Maximum Image Height** | Maximum height in pixels for stored images | 1200 |
| **Thumbnail Width** | Width of generated thumbnails | 300 |
| **Thumbnail Height** | Height of generated thumbnails | 300 |

### Security Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable reCAPTCHA** | Add Google reCAPTCHA to the review form | No |
| **reCAPTCHA Type** | Version to use: v2 (checkbox) or v3 (invisible) | v2 |
| **reCAPTCHA Site Key** | Your Google reCAPTCHA public site key | — |
| **reCAPTCHA Secret Key** | Your Google reCAPTCHA private secret key | — |
| **reCAPTCHA v3 Threshold** | Minimum score for v3 (0.0–1.0, higher = stricter) | 0.5 |
| **Rate Limit (Per Hour)** | Maximum review submissions per user per hour | 3 |
| **Enable Honeypot** | Add a hidden field to catch spam bots | Yes |
| **Disable For Logged In Users** | Skip reCAPTCHA for logged-in customers | Yes |

### Email Settings

The app can automatically send review request emails to customers after their order reaches a specific status.

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable Review Requests** | Send automated post-purchase review request emails | No |
| **Trigger Order Status** | Which order status triggers the email | Completed |
| **Request Delay (Days)** | Days to wait after trigger status before sending | 7 |
| **Token Expiration (Days)** | Days the one-click review link in the email remains valid | 30 |
| **Admin Notification** | Email admins when a new review is submitted | No |
| **Admin Email Addresses** | Addresses to notify (one per line) — leave blank for site admin | — |
| **Customer Approval Email** | Email customers when their review is approved | No |
| **Brand Logo** | Your store logo displayed in review request emails | — |

#### Setting Up the Cron Job

Emails are sent via a cron job, not immediately on order status change.

1. In the **Email Settings** fieldset, copy the **Cron URL** displayed there.
2. Set up a cron job on your server to call that URL every 30–60 minutes:

```bash
*/30 * * * * curl -s "https://yoursite.com/index.php?option=com_j2commerce&..." > /dev/null
```

The cron processes the queue and sends pending emails once the configured delay has passed.

#### Customizing the Email

Click the **Email Editor** tab within the plugin settings to edit the subject line and HTML body of the review request email.

Available shortcodes you can use in the subject and body:

| Shortcode | Replaced With |
|-----------|---------------|
| `[CUSTOMER_NAME]` | Customer full name |
| `[CUSTOMER_FNAME]` | Customer first name |
| `[PRODUCT_NAME]` | Product name |
| `[PRODUCT_SKU]` | Product SKU |
| `[PRODUCT_LINK]` | Link to the product page |
| `[REVIEW_LINK]` | Direct link to leave a review |
| `[REVIEW_LINK_1]` through `[REVIEW_LINK_5]` | Pre-filled rating links (1–5 stars) |
| `[ORDER_ID]` | Order ID |
| `[ORDER_DATE]` | Order date |
| `[STORE_NAME]` | Your store name |
| `[STORE_URL]` | Your store URL |

Click **Send Test Email** to preview the email against a real product in your store.

#### UTM Tracking

Add UTM parameters to review links in emails to track campaign performance in Google Analytics:

| Field | Example Value |
|-------|---------------|
| **UTM Source** | `j2commerce` |
| **UTM Medium** | `email` |
| **UTM Campaign** | `review_request` |
| **UTM Content** | *(optional differentiator)* |

### Google Rich Snippets

When enabled, the app outputs JSON-LD structured data on product pages so Google can display star ratings in search results.

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable Rich Snippets** | Output JSON-LD on product pages with reviews | No |
| **Integrate with Schema.org Ecommerce Plugin** | Inject review data into a co-installed schema plugin instead of outputting standalone schema | No |
| **Minimum Reviews** | Minimum approved reviews required before schema is added | 1 |
| **Include Individual Reviews** | Add individual review details to the structured data | Yes |
| **Maximum Individual Reviews** | Number of individual reviews to include in the schema | 10 |
| **Include Product Variants** | Add ProductGroup schema for products with variants | No |
| **Include Merchant Listing** | Add pricing and availability to the schema | No |
| **Brand Name** | Default brand for structured data (leave blank if not applicable) | — |
| **Default Currency Code** | ISO 4217 currency code for pricing in schema (e.g., USD, EUR) | — |

## Managing Reviews

Go to **J2Commerce** -> **Apps** -> **Product Reviews** -> **Reviews** to access the review management screen.

<!-- SCREENSHOT: Reviews management list with status filter dropdowns -->

### Review Statuses

| Status | Meaning |
|--------|---------|
| **Pending** | Submitted but not yet reviewed by a moderator |
| **Approved** | Visible on the product page |
| **Rejected** | Hidden from the public but kept in the database |
| **Spam** | Identified as spam, hidden from public |

### Moderating Reviews

- Click the **Approve** or **Reject** button in the Actions column for individual reviews.
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

By default the global **Enable Reviews** setting controls all products. You can override this on individual products:

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
|--------|----------|-------------|---------|
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

Go to **J2Commerce** -> **Apps** -> **Product Reviews** -> **Analytics** for a summary of review activity including:

- Total, pending, and approved review counts
- Average rating
- Email engagement metrics (sent, engaged, pending, expired)
- Star distribution chart
- Reviews by source (product page, email, profile, backend, import)
- Device breakdown (desktop, mobile, tablet)
- User type breakdown (registered vs. guest)
- Top reviewers
- Most reviewed products
- Top rated products

<!-- SCREENSHOT: Analytics dashboard showing charts and stats -->

## Troubleshooting

### Reviews Not Appearing on Product Pages

**Cause:** The app is enabled but **Enable Reviews** is set to No, or the individual product has reviews disabled.

**Solution:**
1. In the plugin settings, confirm **Enable Reviews** is set to **Yes**.
2. Edit the product and check the **Reviews** tab — if an override is set to **No**, change it to **Yes** or remove the override.

### Review Request Emails Not Sending

**Cause:** No cron job is configured, or the queue has not yet accumulated emails ready to send.

**Solution:**
1. Confirm **Enable Review Requests** is turned on in **Email Settings**.
2. Verify the cron job is running and the URL is correct.
3. Check that enough days have passed since the order reached the trigger status — emails are held until the **Request Delay** period expires.
4. Enable **Debug Mode** in the plugin settings and check the Joomla log file at `administrator/logs/app_reviews.php` for error messages.

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

## Related Topics

- [Apps and Extensions](../index.md)
- [Products](../../catalog/index.md)
