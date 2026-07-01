---
title: "Dropbox Integration"
sidebar_label: "Dropbox"
sidebar_position: 93
description: "Connect J2Commerce to Dropbox to sell and deliver digital downloads stored in your Dropbox account — no file hosting required on your own server."
---

# Dropbox Integration

The Dropbox Integration app connects your J2Commerce store to your Dropbox account so you can sell digital files stored in the cloud. Instead of uploading files to your web server, you browse your Dropbox folder directly from the product editor, attach any file to a product, and J2Commerce streams it securely to customers when they complete a purchase. Product images remain on your server as normal — this app handles downloadable product files only.

## Requirements

- PHP 8.3.0 or later
- Joomla 6.x
- J2Commerce 6.x
- A Dropbox account (free or paid)
- A Dropbox App created in the Dropbox App Console (instructions below)

## Purchase and Download

The **Dropbox Integration** is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to [www.j2commerce.com](https://www.j2commerce.com) -> **Apps**.

**Step 2:** Locate the **Dropbox Integration** app, click **View Details**, then **Add to Cart** -> **Checkout**.

**Step 3:** After purchase, go to **My Downloads** under your profile menu and find the app. Click **Available Versions** -> **View Files** -> **Download Now**.

## Install the App

1. In the Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Upload the `app_dropbox.zip` package file.
3. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extensions installer with app_dropbox.zip selected -->

## Enable the App

Once installed, confirm the app is enabled. There are two ways to reach it.

**Option A:** Click the **J2Commerce** icon in the top-right corner -> **Apps**.

**Option B:** Go to **Components** in the left sidebar -> **J2Commerce** -> **Apps**.

<!-- SCREENSHOT: J2Commerce Apps list showing Dropbox in the list -->

Look for **Dropbox** in the list. If the toggle shows a red X, click it to turn it into a green checkmark. The app is now active.

## Create a Dropbox App

Before configuring the plugin, you need to create an App inside your Dropbox account. This gives you the App Key and App Secret that J2Commerce needs to connect. The process takes about two minutes.

1. Go to [www.dropbox.com/developers/apps](https://www.dropbox.com/developers/apps) and log in with your Dropbox credentials.
2. Click **Create app**.
3. Choose **Scoped access**, then choose **Full Dropbox** so J2Commerce can browse all your folders.
4. Give the app a name — for example, **My Store Downloads** — and click **Create app**.
5. You land on the app's settings page. Keep this page open. You will need the **App key** and **App secret** in the next step.

<!-- SCREENSHOT: Dropbox App Console settings page showing App key and App secret -->

:::info

You can restrict which folders J2Commerce can see by choosing **App folder** instead of **Full Dropbox** in step 3. If you choose App folder, all your downloadable files must live inside a single folder named **Apps/[your app name]** in your Dropbox.

:::

## Configure the App

Click the **Dropbox** title in the Apps list to open the plugin settings.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

<!-- SCREENSHOT: Dropbox plugin settings page with Toggle Inline Help button visible in the toolbar -->

### Dropbox Settings Tab

<!-- SCREENSHOT: Dropbox Settings tab showing App Key, App Secret, and Connection Status fields -->

#### App Key

Paste the **App key** from your Dropbox App Console here. This value identifies your Dropbox App when communicating with Dropbox's authorization servers.

#### App Secret

Paste the **App secret** from your Dropbox App Console here. This value is used to exchange authorization codes for access tokens behind the scenes. Treat it like a password and keep it confidential.

#### Connection Status

This field shows whether J2Commerce is currently connected to your Dropbox account. It also displays the **OAuth Redirect URI** — a read-only URL that you must register in the Dropbox App Console before you can connect.

**Register the Redirect URI — do this before connecting:**

1. Copy the read-only URL shown in the **Connection Status** field.
2. Go to your Dropbox App Console -> **Settings** -> **OAuth 2** -> **Redirect URIs**.
3. Paste the URL and click **Add**.

The URI must match character for character — including the scheme, host, path, and every query parameter — or Dropbox will reject the authorization attempt.

:::tip

Save the plugin settings with your **App Key** and **App Secret** filled in before trying to connect. The **Connect to Dropbox** button only appears after the plugin settings have been saved at least once.

:::

### Advanced Tab

#### Debug Mode

| Option | Description |
|--------|-------------|
| **No** (default) | No extra logging. Use in production. |
| **Yes** | Writes detailed log entries to `j2commerce-dropbox.php` in your Joomla logs folder. Enable only while diagnosing a problem. |

## Connect to Dropbox

Once you have saved your App Key and App Secret and registered the Redirect URI in Dropbox, you are ready to authorize the connection.

1. Open the Dropbox plugin settings: **J2Commerce** -> **Apps** -> **Dropbox**.
2. In the **Connection Status** field, click **Connect to Dropbox**.
3. A small popup window opens and takes you to the Dropbox login and authorization page.
4. Log in to Dropbox if prompted, then click **Allow** to grant J2Commerce access.
5. The popup shows a success message and closes automatically after about 1.5 seconds.
6. The settings page reloads. The **Connection Status** badge changes to **Connected** (shown in green).

<!-- SCREENSHOT: Connection Status field showing the green Connected badge with Test Connection and Disconnect buttons -->

You can click **Test Connection** at any time to confirm the link is active. A successful test shows the display name and email address of the connected Dropbox account.

To unlink the integration, click **Disconnect** and confirm the prompt. The stored tokens are deleted and the status returns to **Not Connected**.

## Attach a Dropbox File to a Product

After connecting, a Dropbox file browser appears on the **Files** tab of any product in the product editor.

There are two ways to open a product for editing.

**Option A:** Go to **J2Commerce** icon -> **Catalog** -> **Products** and click a product.

**Option B:** Go to **Content** in the left sidebar -> **Articles**, find the article for the product, click to edit it, then switch to the **J2Commerce** tab.

Then:

1. Click the **Files** tab inside the J2Commerce product section.
2. The Dropbox browser loads automatically, showing your files starting at **My Dropbox** (the root of your account).

<!-- SCREENSHOT: Product editor Files tab showing the Dropbox file browser with breadcrumb and file list -->

3. Click any folder to open it. Click a folder name in the breadcrumb to navigate back up.
4. Find the file you want to sell and click **Attach** next to it.
5. The file appears in the **Files Attached via Dropbox** section below the browser, showing the file name and last-modified date.
6. To remove a file from this product, click **Remove** next to it in that section.
7. Click **Save** or **Save & Close** on the product to keep your changes.

<!-- SCREENSHOT: Files Attached via Dropbox section showing an attached file with its name, modified date, and Remove button -->

### Upload a File from Your Computer

You can upload a local file to Dropbox directly from the product editor — no need to open a separate browser tab.

1. In the Dropbox browser panel, click **Upload File**.
2. Choose a file from your computer. Files up to **150 MB** are supported.
3. A progress bar appears while the upload runs. The file goes to the root of your Dropbox.
4. Once the upload finishes, the file appears in the browser and you can click **Attach** to add it to the product.

## How It Works

When a customer purchases a product and clicks a download link:

1. J2Commerce checks that the customer has a valid, active download entitlement for that product.
2. J2Commerce recognizes the file as a Dropbox-stored item using an internal marker.
3. The plugin exchanges the stored credentials for a fresh access token from Dropbox.
4. The file is streamed in chunks directly from Dropbox to the customer's browser — the file never touches your web server's storage.
5. The customer's browser receives a standard file download prompt with the original filename.
6. J2Commerce updates the download counter for that order, so any download limits you set on the product are enforced correctly.

## Download Conditions

Dropbox downloads follow the same rules as standard J2Commerce digital downloads. A customer can download their file when:

- They have placed and paid for an order containing the product.
- The order is in a status that allows downloads (typically **Confirmed** or **Complete** — configured at **J2Commerce** -> **Setup** -> **Configuration** -> **Downloads**).
- The download has not exceeded the maximum allowed count (if a limit is set on the product).
- The download link has not expired (if an expiry period is set on the product).

## Tips

- **Rename or move files freely** — The plugin stores a Dropbox file ID, not a file path. You can rename or reorganize files inside Dropbox without breaking any existing product attachments.
- **Full Dropbox vs. App folder** — If you sell many different file types and want your own folder structure, choose Full Dropbox when creating the app. If you prefer a clean separation between store files and everything else, choose App folder and keep all product files inside it.
- **Large files** — The upload limit from the product editor is 150 MB. For larger files, upload them to Dropbox via the Dropbox website or desktop app first, then browse and attach from the product editor.
- **Test before going live** — After attaching a file to a product, place a test order and confirm the download works end to end before enabling the product for real customers.
- **Debug logs** — If a download is not working as expected, enable **Debug Mode** in the **Advanced** tab and reproduce the problem. Check `j2commerce-dropbox.php` in your Joomla logs folder for details.

## Troubleshooting

### Connect to Dropbox Button Does Not Appear

**Cause:** The App Key and App Secret have not been saved yet.

**Solution:**
1. Go to **J2Commerce** -> **Apps** -> **Dropbox**.
2. Enter your **App Key** and **App Secret** from the Dropbox App Console.
3. Click **Save** in the toolbar.
4. The **Connect to Dropbox** button will now appear in the **Connection Status** field.

### Authorization Fails with "OAuth state mismatch"

**Cause:** The popup window took too long to complete, the Joomla session expired, or the browser blocked the popup.

**Solution:**
1. Make sure your browser allows popups from your site's admin domain.
2. Clear your browser cache and cookies.
3. Go to **J2Commerce** -> **Apps** -> **Dropbox** and click **Connect to Dropbox** again.
4. Complete the Dropbox authorization without navigating away from the popup or the settings page.

### Authorization Fails or Dropbox Shows an Error

**Cause:** The Redirect URI registered in Dropbox does not exactly match the URI shown in the plugin, or you clicked **Cancel** on the Dropbox authorization page.

**Solution:**
1. Go to your [Dropbox App Console](https://www.dropbox.com/developers/apps), open your app, and go to **Settings** -> **OAuth 2** -> **Redirect URIs**.
2. Delete any existing entry and re-add the exact URI copied from the **Connection Status** field in the plugin. Paste it — do not retype it.
3. Click **Save** in the Dropbox App Console, then return to the plugin and click **Connect to Dropbox** again.

### Dropbox File Browser Does Not Appear on the Product Files Tab

**Cause:** The plugin is disabled or not connected to Dropbox.

**Solution:**
1. Go to **J2Commerce** -> **Apps** and confirm that **Dropbox** shows a green checkmark (enabled).
2. Click **Dropbox** to open the settings and check that the **Connection Status** shows **Connected** (green badge).
3. If it shows **Not Connected**, follow the steps in the Connect to Dropbox section above.

### Customer Cannot Download the File

**Cause:** The order status does not allow downloads, the download limit has been reached, or the Dropbox connection has been revoked (for example, after a Dropbox password change).

**Solution:**
1. Go to **J2Commerce** -> **Orders**, open the order, and confirm the status allows downloads.
2. Edit the product and review the download limit and expiry settings on the **Files** tab.
3. Go to **J2Commerce** -> **Apps** -> **Dropbox** and click **Test Connection** to confirm the account link is active.
4. If the connection was lost, click **Disconnect**, then click **Connect to Dropbox** to re-authorize.
5. Enable **Debug Mode** in the **Advanced** tab, reproduce the download attempt, and check `j2commerce-dropbox.php` in your Joomla logs folder for error messages.
