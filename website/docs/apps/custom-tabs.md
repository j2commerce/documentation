---
description: J2Commerce (formerly known as J2Store)
---

# Custom Tabs

Do you wish to create beautiful tabbed content for your product pages?

You can create any number of tabs to display in the product page. You can enter any type of content, like features, videos, and more. You can enter the content for the tabs while creating/editing your product itself. You can create the content quickly by using the Editor.

**IMPORTANT NOTE:** The app supports only the J2Store/J2Commerce's Product List layout and Joomla! articles that are treated as products. That is, the catalog source should be Joomla! articles.

## Requirements <a href="#requirements" id="requirements" />

1. PHP 8.1.0 +
2. Joomla! 4.x/ Joomla! 5.x +
3. J2Commerce / J2Store 4.x +

## Purchase the App

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Apps

**Step 2:** Locate the Custom Tabs App > click View Details > Add to cart > Checkout.&#x20;

**Step 3:** Go to your My Downloads under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

## Install the App

Go to System > Install > Extensions > Install the app

![Custom Tabs](<../../assets/user-group-3 (7).webp>)

## Enable the App

&#x20;Go to J2Commerce > Apps > search for the Custom Tabs app&#x20;

Click on the 'X' under Status to enable it.

![Enable custom tab app](/img/custom-tabs-enable.webp)

Click on "Open App" or the Title to start setting up the app

![](/img/custom-open.webp)

## Setting up the Parameters:

### Basic tab

![Custom tab settings](/img/custom-settings.webp)

**Prepare Content:** Select 'Yes' to prepare the content with the Joomla Content Plugins

**Custom Field Short Code:** Select 'Yes' to choose whether to prepare the data for the Custom tab or not.

**Display Brand Details:** Select 'Yes' to display the product's Manufacturer / Brand details in a separate tab. Depending on your country, this may be a mandatory requirement.

**Position Brand:** Select 'Before' or 'After' to choose whether to display the Manufacturer / Brand tab before or after the additional tabs.

**Note:** The **Display Brand Details** and **Position Brand**  fields are the latest Add-ons. It adds a way to add the manufacturer/brand to the tabs, before or after the other ones. Some countries require the display of brand information, including the address. The manufacturer information tab can be modified by creating a template override. The override needs to be `/templates/[the default template]/html/plugins/j2store/app_customtabs/brand.php` The tab text can be modified by creating a language override for PLG\_J2STORE\_APP\_CUSTOMTABS\_MANUFACTURER\_DETAILS

**To learn how to set up Language Overrides, go to**

[https://docs.j2commerce.com/translation/language-overrides-in-joomla-with-examples](https://docs.j2commerce.com/translation/language-overrides-in-joomla-with-examples)
