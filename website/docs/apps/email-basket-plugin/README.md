---
description: J2Commerce (formerly known as J2Store)
---

# Request Quote / Email Cart

***Previously known as Email Basket***

This plugin allows your customers to email items in the cart to the store owner and to themselves.

The plugin nicely integrates into the default cart page of J2Commerce. You can ask the customers to provide their name, address, or any other information while emailing the cart.

## Requirements <a href="#requirements" id="requirements" />

1. PHP 8.1.0 +
2. Joomla! 4.x/ Joomla! 5.x +
3. J2Commerce / J2Store 4.x +

#### Installation of Acymailing Connector:

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Apps

**Step 2:** Locate the Request Quote / Email Cart App > click View Details > Add to cart > Checkout.&#x20;

![](/img/email-purchase.webp)

**Step 3:** Go to your My Download under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

![](/img/email-download.webp)

## **Installation:**&#x20;

You can install the Request Quote / Email Cart using the Joomla installer. The following steps help you with a successful installation.

**Step 1:** In the Joomla admin, go to System > Install > Extensions

![](/img/canada-post-installer-1.webp)

**Step 2:** Click on the Browse button and select Request Quote / Email Cart zip file where you saved it.

![](/img/canada-post-download.jpg)

**Step 3:** In the Joomla admin, go to System > Manage > Extensions

![](/img/email-installer-2.webp)

## Setup Instructions <a href="#setup-instructions" id="setup-instructions" />

1. Use the Joomla installer to install the plugin.
2. In the backend, go to Components > J2Commerce > Apps
3. Enable the app by clicking on the 'x' under Status. It will become a checkmark
4. Open the app.

![](/img/email-setup.webp)

1. Enter the parameters (read the explanation about each parameter given below)
2. Save and close it.

Now you can see the Request Quote / Email Cart button on the cart page.

## Parameters <a href="#parameters" id="parameters" />

### Basic settings <a href="#basic-settings" id="basic-settings" />

![](/img/email-parameters.webp)

**Disable proceed checkout:** If you set this to 'YES', the plugin will hide the checkout button in the cart.

**Article ID for thank you message:** The Article given will be displayed after the payment is processed, and it can include a thank-you message or any kind of text.

**Enable the show save cart button:** Setting 'YES' will display the Save cart button (which is used for unregistered users) on the cart page. Clicking on this button will redirect the customer to register. After registering and logging in, the cart items remain in the basket.

**Empty cart after sending email:** If you set this to YES, the plugin will empty the cart after emailing the cart items to the store owner.

**Time delay in milliseconds to empty the cart:** You can set a delay for emptying the cart. The default is 2 seconds.

### Layout <a href="#layout" id="layout" />

If you would like to add / remove the fields in the Email form without affecting the checkout form fields, it is possible in this section.

In this section, you can create the custom form by adding the field shortcode given at the top of the layout tab page and displaying that field in the form.

![](/img/email-layout.webp)

To add any new fields, go to J2Commerce > Setup > Custom fields. Click 'New' to create a new field.

![](/img/email-custom-fields.webp)

Enter the label name, field name, choose field type, and set the status to **Published**.

If you don’t want to display this new field in checkout and want to display it only in the Email form, then in the custom field display settings, set **NO** to all layouts (Checkout billing address layout, Checkout shipping address layout, Checkout payment method layout).

Now, in the form layout, add the shortcodes of the fields you want to display in the email form. To add a custom field shortcode, copy the field name in J2Commerce > Setup > Custom fields section and paste it in the form. The field name should be enclosed in square braces. For example, \[message].

![Custom fields](/img/email-custom-fields-1.webp)

![Custom field list](/img/email-body.webp)

**Form Layout:** Add the code for the message into the message form in the Layout tab of the Request Quote / Email Cart App

**Choose Basket modal type:** Select whether you want a Bootstrap model or a custom model.

![Layout of email basket](/img/email-message.webp)

**Advanced**

![Advanced settings](/img/email-advanced.webp)

**Modal Inline Style:** You can add the additional inline style to the box container in the given text box.

**Modal class:** You can add additional class names to the modal box container in the given text box.

**Modal Style:** You can add the custom CSS in the given text area.

**Enable Redirect after send email:** Set this option to Yes if you wish to redirect the users to a page after the order has been placed.

**Redirect the customer to this URL:** Enter the URL to which the customer should be redirected on the form submission.

### Email Configuration <a href="#email-configuration" id="email-configuration" />

**Send email to:** Choose the user to whom you wish to send the email.

![Email-configuration](/img/email-configuration.webp)

### English(En-GB) <a href="#englishen-gb" id="englishen-gb" />

In this section, the email template could be set up. The shortcodes found in the previous tab could be used here. The order in which they are specified here would determine their order in the email notifications.

**If the site is multi-lingual, the languages available would be displayed here and the email templates could be set up for each one of them accordingly.**

![Email configuration in the English tab](/img/email-language.webp)

**On a multi-lingual site:** the available languages are listed in separate tabs next to the Email Configuration tab (instead of the English tab shown above)

**Email Subject:** Enter the subject of the email here.

**Email Body:** In the Email body section, you can use the shortcodes to display the dynamic information such as customer’s name, email, country, cart items, etc..\[first\_name]\[last\\\_name]\[email]\[phone\\\_1]\[phone\_2]\[company]\[tax\_number]\[address\\\_1]\[address\_2]\[city]\[zip]\[country\\\_id]\[zone\_id]\[cart\\\_item]\[user\_name]\[site\\\_name]

To display the custom field information (entered by the user when filling the form) in an email that the customer and admin receive, it is possible by adding the shortcode of the respective custom field in the Email body editor. For example, if you are having a text area as a custom field in your email form, then copy the field name (you can get it in the custom field section J2Commerce > Setup > Custom fields) and paste it in the Email body editor. The custom field shortcode should be enclosed in square braces. For example, \[message]. Refer to the image below:\\

### Video Tutorial <a href="#video-tutorial" id="video-tutorial" />

[![Email basket](https://img.youtube.com/vi/51J1UkeRu3Y/0.jpg)](https://youtu.be/IHpKrQI04Us)
