---
description: >-
    This article is a guide to help you migrate your Joomla 3 / J2Store 3 website
    to J2Store/J2Commerce 4 Joomla 4 and 5 versions.
---

# Migrating from J2Store 3 to 4

This article is a guide to help you migrate from J2Store 3 to J2Store 4/J2Commerce 4 to the latest Joomla 4 or 5.

:::warning
J2Commerce is a rebranding of the original J2Store component, so any J2Store/J2Commerce 4 updates will work with your newly migrated J2Store 4/J2Commerce 4 sites.
:::

:::warning
**The following instructions apply ONLY IF you have a Joomla 3 website with J2Store 3.**
:::

:::warning
Please carefully read the instructions and try the migration in a staging/development/testing copy of your site. There are a number of breaking changes. If you attempt to migrate directly in a live environment, it may lead to the site crashing with fatal errors.

**Attempt the migration in a testing/staging copy of your site.**
:::

:::danger
While we are committed to ensuring a smooth transition, please note that unforeseen circumstances may arise during the migration process. Example: You might have an incompatible plugin, a third-party extension that conflicts with J2Commerce, and so on.

Though we'll make every effort to assist, we cannot be held accountable for potential issues that may occur as a result. Proceed with caution.
:::

### Step 1a: Ensure all the plugins/extensions for J2Store on your site are Joomla 4 compatible.

If you have extensions/plugins/modules coming from the J2Store store or from third-party developers, you need to check their Joomla 4 compatibility before upgrading to Joomla 4.

Just upgrading J2Store 3 to J2Commerce 4 will not ensure compatibility with Joomla 4. All the extensions and plugins that you use on your site should be Joomla 4 compatible before you upgrade.

:::warning
Proceed with your upgrade to Joomla 4 only after ensuring all the J2Store plugins/extensions on your site are Joomla 4 compatible.
Some are missing? Please let us know, and we will try helping you with alternatives or timelines for compatibility.
:::

### Step 1b: BACKUP, BACKUP, BACKUP

Please take a FULL BACKUP of your site before you start the migration process. Since there are a number of breaking changes in J2Commerce 4, there is a chance of fatal errors.

Take a FULL BACKUP so that in case of issues, you can always restore your site from the backup.

### Step 2: Install the Migration Checker Utility

We have created a simple migration helper that checks for potential conflicts with the plugins and lets you disable them before the migration.

1. Download the utility from here: [github.com/j2commerce/j2store\_migration\_checker/releases](https://github.com/j2commerce/j2store_migration_checker/releases)
2. Install it by logging into your Joomla 3 administrator > Extensions > Manage > Install
3. Once installed, go to Components > J2Store Migration checker

### Step 3: Disable the Plugins / Modules and Apps of J2Store

The migration helper will list all the J2Store plugins, apps, modules, and extensions that need to be disabled before you can proceed with it.

Once you have disabled them, you will see a “green light” to proceed with the migration.

:::warning
Please take note of the list of plugins you have there and you want to keep, as they need to be upgraded individually with their respective Joomla 4 compatible versions.
If some add-ons are no longer needed, uninstall them from your site to keep it clean.

You can check our Extensions page for a list of available extensions for J2Commerce with Joomla 4 compatibility.
:::

If you have any custom-developed extensions for J2Store, please reach out to the respective vendors/developers for compatibility.

We’ll not be able to support any custom-developed extensions/plugins/add-ons/modules.

:::info
If you have not done so already, and you have Akeeba extensions installed, please download and run the [Magic Eraser](https://github.com/akeeba/magiceraser/releases/latest) to automatically remove obsolete Akeeba extensions before upgrading your site to Joomla 4.
This is very important when you run a J2Store site, as a modified version of Akeeba's library **F0F** is used by J2Store and you will run into conflicts once under Joomla 4.
Do it at this stage while all J2Store plugins are disabled. You will avoid potential conflicts.

However, J2Store and the Migration tool may stop working. You will need to manually install J2Store 4. Follow the instruction in the next step.
:::

### Step 4: Install J2Store 4

Once you have disabled all the J2Store-related extensions, you should have the green light to go forward with the migration.

Click on the **Install J2Store 4** button in the migration helper utility.
This takes you to the extensions update section of the Joomla administration console.
Select the J2Store update and click on the Update button.

If the update is not available, or you cannot access the J2Store Migration Checker, you can download J2Store 4 from our GitHub repository at:

[J2Store v4.0.5 Migration Edition](https://github.com/j2commerce/j2cart/releases/download/v4.0.5/com_j2store_v4-4.0.5-pro.zip)

Install it using the Joomla 3 installer (Extensions > Manage > Install).

### Step 5: Disable newly installed plugins

Go back to the Migration Helper utility and disable the newly installed J2Store 4 plugin(s).

Your site is now running J2Store 4 on Joomla 3. You won't be able to do much with it until you upgrade to Joomla 4.

### Step 6: Moving forward with the Joomla 4 upgrade

Go back to your upgrade to Joomla 4.
At this point, you may have already cleaned up extensions you won't keep, set aside any incompatible extensions, and ensured that all the extensions you want to keep are Joomla 4 compatible.

If you are unsure about the next steps, do a backup of the site again before proceeding. It will safeguard your updated shop.

### Step 7: Under Joomla 4 - Upgrading J2Commerce and its add-ons

Now that you have upgraded to Joomla 4, it's time to upgrade J2Store 4 to J2Commerce 4.
You can do so by going to System > Update > Extensions and selecting the J2Commerce update.

You can also download the latest version of J2Commerce from our GitHub repository at:
[J2Commerce v4.x Latest](https://github.com/j2commerce/j2cart/releases/latest)

After you updated J2Store 4 to its latest version of J2Commerce 4, check the extensions section of our site and download the latest version of the J2Commerce plugins/apps/modules/extensions.

You need to install the Joomla 4-compatible version of all the J2Commerce plugins/apps/modules/extensions you had on your Joomla 3 site, and you wanted to keep.
The Joomla 3 versions will not work on Joomla 4.

### Step 8: Re-enable the J2Commerce plugins/apps/modules/extensions

You can use the Migration Checker app to re-enable the plugins/apps/modules/extensions one by one.

**Done? Fantastic! Your site is now running J2Commerce 4 on Joomla 4!**
