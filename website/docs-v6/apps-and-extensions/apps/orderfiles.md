---
title: "Order Files"
sidebar_label: "Order Files"
sidebar_position: 60
description: "Let customers attach files to their orders at checkout. Secure storage, admin download, and email integration included."
---

# Order Files

Order Files adds a file-upload widget to your checkout. Customers can attach supporting documents before they pay — artwork for a print job, a signed contract, a photo of a damaged product, or age-verification documents for regulated goods. Once the order is placed, every file is stored securely and immediately available to you in the order detail view.

## What This App Does

The upload widget appears on the checkout page. Customers drag files onto it or click to browse. Each file is held in temporary storage until the payment gateway confirms the order, at which point the files move permanently into a per-order folder and attach to the order record.

Admins can download any attached file directly from the order edit screen. Customers can see a list of their attached file names on the order confirmation page and in their account's order history.

**Real-world uses:**

- Custom-print shops that need camera-ready artwork before they begin production.
- B2B sellers that require a signed purchase order or contract alongside payment.
- Regulated industries (firearms dealers, medical-device suppliers, alcohol retailers) that need age-verification documents or licences before shipping.
- Any business where a photo or reference document improves order fulfilment.

## What Is New in J2Commerce 6

The Order Files app was completely rewritten for J2Commerce 6. If you used a similar feature in a previous J2Store-based site, here is what changed:

| Area         | Previous behaviour                                                                     | J2Commerce 6                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| File storage | Uploaded files landed in `media/j2store/uploads/`, a publicly accessible web directory | Files go to `files/com_j2commerce/orders/[order_id]/`, outside the web root, with an `.htaccess` deny-all guard     |
| Security     | Minimal validation                                                                     | CSRF token on every request, ACL guard on every admin action, MIME allowlist, PHP-tag content scan, 100 MB hard cap |
| Privacy      | No session scoping                                                                     | Each upload is recorded against the uploading session; only the placing customer's files attach to their order      |
| Expiry       | Files persisted indefinitely                                                           | Pending files expire 24 hours after upload if no order is completed                                                 |
| JavaScript   | jQuery                                                                                 | Vanilla JavaScript (ES6+)                                                                                           |
| Admin UI     | Separate Apps view                                                                     | Native Joomla Plugin Manager; configuration inside **System** -> **Manage** -> **Plugins**                          |

## Installation

Order Files is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download `app_orderfiles.zip` from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_orderfiles.zip` package file.
4. The plugin installs and enables automatically.

To verify the installation:

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Order Files**.
3. Confirm the status shows as **Enabled**.

<!-- SCREENSHOT: Plugin Manager list showing "J2Commerce - Order Files" with green enabled status -->

## Configure

Open the plugin for editing: **System** -> **Manage** -> **Plugins** -> search **Order Files** -> click the name.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

<!-- SCREENSHOT: Plugin edit screen showing Basic Settings and Advanced fieldsets -->

### Basic Settings

| Setting                        | Description                                                                                                                           | Default                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **Allowed File Types**         | The file extensions customers may upload. Select from the list. Only selected types are accepted.                                     | `pdf, doc, docx, jpg, jpeg, png` |
| **Maximum File Size (MB)**     | Maximum size per file in megabytes. The server enforces a 100 MB hard cap regardless of this value.                                   | `10`                             |
| **Maximum Files Per Order**    | How many files a customer can attach to a single order.                                                                               | `5`                              |
| **Upload Field Label**         | Text shown above the upload widget on the checkout page. Leave blank to use the default label "Attach Files to Your Order".           | *(blank)*                        |
| **Upload Field Description**   | Optional helper text shown below the label, for example "Please upload a print-ready PDF or JPG."                                     | *(blank)*                        |
| **Required**                   | When set to **Yes**, the customer cannot complete checkout without uploading at least one file.                                       | No                               |
| **Show on Order Confirmation** | When set to **Yes**, a list of uploaded file names appears on the order confirmation page and in the customer's account order detail. | Yes                              |

**Tip about Allowed File Types:** Be deliberate about what you accept. If your business only processes PDFs, select only `pdf`. Do not add `php`, `phtml`, `exe`, `sh`, or other executable extensions — the server also performs a content scan, but there is no reason to enable those types in the first place.

### Advanced

| Setting                                 | Description                                                                                                                                                                                                     | Default |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Sync Allowed Types to Media Manager** | When **Yes**, the allowed types list is also added to Joomla's **Media Manager** upload extensions on every plugin save. Leave this **No** unless you specifically need Media Manager to accept the same types. | No      |
| **Debug Mode**                          | When **Yes**, upload activity and file-attach events are logged to `administrator/logs/app_orderfiles.php`. Disable on production sites.                                                                        | No      |

Click **Save & Close** after configuring.

## How the Upload Widget Looks at Checkout

The widget appears below the billing address form by default. Customers see:

- A label and optional description.
- A hint line: "Allowed: PDF, JPG, PNG — Max size: 10 MB per file".
- A dashed drop zone: "Click or drag files here (max 5 files)".
- A file list that updates as files are added, with a **Remove** button per file.

<!-- SCREENSHOT: Checkout page with the upload widget visible, showing a PDF already queued and a Remove button -->

Files upload immediately when selected. If a file is rejected (wrong type, too large, PHP content detected), a specific error message appears next to the file. The order cannot be submitted if **Required** is set to **Yes** and no file has been successfully uploaded.

## Using the Email Shortcode

To show a list of attached files inside order confirmation emails:

1. Go to **J2Commerce** -> **Emails** and open the order confirmation email template.
2. Place the cursor in the email body where you want the file list to appear.
3. Type `{orderfiles}` at that position.

<!-- SCREENSHOT: Email template editor with {orderfiles} typed into the body -->

When an email is sent, `{orderfiles}` is replaced with a plain-text list of attached file names, formatted to display correctly in email clients. If the order has no attachments, the shortcode is removed silently — no blank section appears.

Example output in the email body:

```
Attached Files:
- camera-ready-artwork.pdf
- signed-contract.pdf
```

The list renders as a simple HTML `<ul>` with inline styles for maximum email-client compatibility. Customers cannot download files directly from the email.

## Admin: View and Download Attachments

1. Go to **J2Commerce** -> **Orders** and open any order.
2. In the right-hand sidebar, look for the **Attached Order Files** card. It shows each attached file with its size.

<!-- SCREENSHOT: Order edit screen with the "Attached Order Files" sidebar card showing two files -->

**To download a file:** Click the **Download** button next to the file name. The browser downloads the file with its original name.

**To delete a single file:** Click the **Delete** button next to the file. Confirm when asked. The file is permanently removed from both the database and the filesystem.

**To delete all files for an order:** Click **Delete All Files** at the top of the card. Confirm when asked.

:::warning
File deletion is permanent. There is no recycle bin or undo.
:::

## Customer: View Attachments

Customers see their attached files in two places:

- **Order confirmation page** — immediately after checkout completes, a "Your Attached Files" section lists the uploaded file names (if **Show on Order Confirmation** is enabled).
- **My Profile -> Orders** — the order detail page shows the same file list.

<!-- SCREENSHOT: Customer-facing order detail page showing the "Your Attached Files" section -->

Customers see file names and sizes only. They cannot re-download the files from the frontend — this is intentional. If a customer needs a copy of something they uploaded, they should contact you directly.

## Security and Privacy

Order Files was designed with security as a first priority.

**File storage:** All uploads go to `files/com_j2commerce/` — a directory outside the web root. An `.htaccess` file blocks direct HTTP access. No file is ever reachable via a predictable URL.

**Random filenames:** Every file is saved with a cryptographically random 32-character hex name (for example, `a3f7b2c1d4e5...pdf`). Even if someone obtained the storage path, guessing a filename is computationally infeasible.

**Download URL pattern:** Admin downloads go through `index.php?option=com_j2commerce&view=order&layout=edit&id=[order_pk]&j2c_task=orderfiles_download&order_id=[order_id]&file=[random]&[csrf_token]=1`. The CSRF token check fires before any byte of the file is read. The `core.manage` ACL permission on `com_j2commerce` is also checked.

**Upload validation:** Every uploaded file passes four checks before being saved:

1. Extension must be in the Allowed File Types list.
2. MIME type (detected from file contents, not just the extension) must not be on the server-side block list.
3. The first 64 KB of the file is scanned for PHP open tags (`<?php`, `<?=`). Any match causes an immediate rejection.
4. File size must not exceed the configured limit (and never exceeds 100 MB regardless of configuration).

**Session scoping:** Pending upload records are tied to the session that created them. When an order is confirmed, only the uploads from that same session are attached — preventing any possibility of one customer's files ending up on another customer's order.

**Pending file expiry:** If a customer starts uploading files but never completes the order, their pending files expire after 24 hours. A Joomla scheduled task cleans them up.

## Troubleshooting

### The upload area appears but clicking it does nothing

**Possible causes and checks:**

1. Open your browser's developer console (**F12** -> **Console** tab) and look for JavaScript errors. The upload widget requires `media/plg_j2commerce_app_orderfiles/js/upload.js` to load.
2. Verify the plugin is enabled: **System** -> **Manage** -> **Plugins** -> search **Order Files** -> confirm the status is **Enabled**.
3. Check that your browser is not blocking the AJAX request to `index.php?option=com_ajax&plugin=app_orderfiles` — a security plugin or WAF might be blocking it.

### A file is rejected as "File type is not permitted"

The file's extension is not in the Allowed File Types list, or the detected MIME type does not match what the extension claims. To fix it:

1. Open the plugin settings and add the extension to **Allowed File Types**.
2. Save and test again.

If the extension is listed but the upload still fails, the file's actual MIME type (as detected from its contents) may be on the server-side blocked list. SVG files, for example, can contain scripts — contact support if you have a legitimate need to accept a type that is being blocked.

### A file is rejected with a message about PHP content

The upload scanner found `<?php` or `<?=` within the first 64 KB of the file. This is the PHP-tag content scan.

- **If the file is legitimate:** This is unusual for documents like PDFs or images. Open the file in a hex editor or text editor to inspect its contents. Some malformed or corrupted files can trigger a false positive. Contact support.
- **If you do not recognise the file:** Do not accept it. The scan is working correctly — this is likely an upload-attack attempt.

### A customer says they uploaded files but I cannot see them in the order

Check whether the files were attached or are still pending:

1. Open the order in the admin and look at the sidebar. If no **Attached Order Files** card appears, the files were not attached.
2. Enable **Debug Mode** in the plugin settings and ask the customer to repeat the upload and checkout. Then check `administrator/logs/app_orderfiles.php` for `attachCheckoutUploads` entries.

The most common reason for missing files is that the customer uploaded files but did not complete checkout. Pending files expire after 24 hours. If `moved=0` appears in the log and the order was placed successfully, contact support with the log entry.

### Files appear to be publicly accessible

This should never happen with a correctly configured J2Commerce 6 installation. If you can access files at a URL like `https://your-site.com/files/com_j2commerce/orders/...`, do the following:

1. Verify that `files/com_j2commerce/.htaccess` exists and contains `Deny from all` (or the equivalent `Require all denied` for Apache 2.4+).
2. If you are on Nginx, you need a matching `location` block — check your Nginx configuration.
3. If you have a folder called `media/com_j2commerce/uploads/` or `media/j2store/uploads/` left over from a previous installation, delete it immediately. Files from J2Commerce 6 are never stored in `media/`.

## Frequently Asked Questions

**Can customers download the files they uploaded?** Not directly from the frontend. Customers can see the file names in their order history, but they cannot re-download the files. If you need to provide customers with a copy of what they uploaded, download it from the order view and send it to them separately.

**What happens to uploaded files if an order is cancelled or refunded?** Files remain attached until an admin manually deletes them. Cancelling or refunding an order does not automatically remove attached files.

**Can I set a different upload area for different products?** The current version shows one upload widget per checkout. There is no product-level configuration. The widget is shown to all customers on all checkouts while the plugin is enabled.

**Can I increase the limit beyond 100 MB per file?** The 100 MB limit is a hard cap enforced in the server code, regardless of the **Maximum File Size** parameter. If you need to accept files larger than 100 MB, contact the J2Commerce team.

**Can I require upload for only certain products?** Not in the current version. The **Required** setting applies globally to all orders. If you need conditional requirements, contact the J2Commerce team.

**Does this work with all payment gateways?** Yes. Files are held in temporary storage until the payment gateway sends a confirmation event. This works with synchronous gateways (PayPal, Stripe, bank transfer) and asynchronous gateways (webhook-based). If a gateway never confirms, the files expire after 24 hours.

## Related Topics

- [Email Templates](../../setup/email-templates.md)
- [Orders](../../sales/orders.md)
