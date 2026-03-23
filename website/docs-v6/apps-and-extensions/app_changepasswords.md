---
title: "Change Password"
sidebar_label: "Change Password"
sidebar_position: 20
description: "Allow logged-in customers to change their Joomla password directly from the J2Commerce My Profile page."
---

# Change Password

The Change Password app adds a dedicated tab to the J2Commerce My Profile page on the frontend. Logged-in customers can update their Joomla account password without leaving the store — no need to visit the Joomla User Profile or reset their password by email.

The form validates both fields client-side and server-side, shows inline error messages for empty or mismatched passwords, and displays a confirmation message on success.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

The **Change Password** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) -> **Apps**.

**Step 2:** Locate the **Change Password** app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile menu at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the App

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the plugin ZIP file or use the **Install from URL** option.

<!-- SCREENSHOT: Joomla Extensions Install screen with Upload Package File tab active -->

## Enable the App

Once installed, enable the plugin. There are two ways to access it.

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Apps**.

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**.

<!-- SCREENSHOT: J2Commerce Apps list with Change Password plugin visible -->

Search for **Change Password**, click the **X** next to the plugin name, and it turns into a green checkmark. The app is now enabled.

<!-- SCREENSHOT: Change Password plugin row in Apps list showing enabled green checkmark -->

## Configure the App

Click on the **Change Password** title to open the plugin configuration screen.

<!-- SCREENSHOT: Change Password plugin configuration screen showing Plugin tab -->

### Plugin Tab

| Setting | Description | Default |
|---------|-------------|---------|
| **Display Quick Icon** | Show a quick icon for this app on the J2Commerce dashboard. Requires the J2Commerce Quick Icon plugin to be installed and enabled. | No |
| **Quick Icon Title** | The label displayed on the quick icon. Only visible when **Display Quick Icon** is set to **Yes**. | `J2Commerce Change Password` |

After adjusting settings, click **Save** or **Save & Close**.

## How It Works

When a logged-in customer visits their **My Profile** page on the frontend, a **Change Password** tab appears in the profile navigation alongside any other profile tabs.

<!-- SCREENSHOT: Frontend My Profile page showing Change Password tab in the tab navigation -->

Clicking the tab reveals a simple form with two fields:

- **New Password** — the customer's desired new password
- **Confirm Password** — must match the New Password field exactly

<!-- SCREENSHOT: Change Password tab content showing New Password, Confirm Password fields and the Change Password button -->

When the customer clicks **Change Password**:

1. The button shows a loading spinner while the request processes.
2. If both fields pass validation, the password is updated immediately.
3. A green success message appears: "Password Updated Successfully."
4. The form clears so the fields are ready for another change if needed.

If there is a problem, inline error messages appear directly below the relevant field rather than at the top of the page, making it clear which field needs attention.

## Validation and Error Messages

| Situation | Message Shown |
|-----------|---------------|
| New Password field left empty | "New Password Required" |
| Confirm Password field left empty | "Confirm Password Required" |
| Passwords do not match | "Password Field Mismatch" |
| Server-side save error | "New Password Save Problem" |
| Success | "Password Updated Successfully" |

## Tips

- The tab only appears for logged-in users. Guest visitors and users who are not signed in will not see the Change Password tab.
- The app uses your Joomla site's password strength and minimum length requirements — the same rules that apply when editing a user account in the Joomla Administrator.
- If you enable the **Display Quick Icon** setting, the icon links directly to the plugin configuration page in the administrator, giving your staff a one-click shortcut to the app settings from the J2Commerce dashboard.

## Troubleshooting

### The Change Password Tab Does Not Appear on the My Profile Page

**Cause:** The plugin is not enabled, or the customer is not logged in.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and verify **Change Password** has a green checkmark.
2. Confirm the customer is logged into a Joomla user account on the frontend.
3. If the problem persists, go to **System** -> **Manage** -> **Extensions**, search for **Change Password**, and verify the plugin status is **Enabled**.

<!-- SCREENSHOT: Extensions manager search result for Change Password plugin showing enabled status -->

### Password Change Fails with a Generic Error

**Cause:** A server-side error occurred during the save, such as a session timeout or a Joomla security token mismatch.

**Solution:**

1. Ask the customer to refresh the My Profile page to get a fresh session token.
2. Try the password change again.
3. If the error persists, check your Joomla error logs at **System** -> **System Information** -> **PHP Error Log** for details.

### Quick Icon Does Not Appear on the Dashboard

**Cause:** The J2Commerce Quick Icon plugin is not installed or not enabled, or **Display Quick Icon** is set to **No**.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and confirm the **Change Password** plugin is enabled.
2. Click **Change Password** to open its configuration.
3. Set **Display Quick Icon** to **Yes**.
4. Verify a label is entered in the **Quick Icon Title** field.
5. Go to **System** -> **Manage** -> **Extensions** and search for **J2Commerce Quick Icons** — confirm it is enabled.
6. Click **Save** in the Change Password configuration and reload the J2Commerce dashboard.

## Related Topics

- [Apps and Extensions Overview](./index.md)
- [Address Autocomplete](./apps/app-addressautocomplete.md)
