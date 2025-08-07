---
description: J2Commerce (formerly known as J2Store)
---

# Frequently Asked Questions

## Product Options are not working or displaying options: <a href="#product-options-not-working-or-displaying-option" id="product-options-not-working-or-displaying-option"></a>

This problem may happen due to jQuery. Check your J2Commerce basic settings tab in Components > J2Commerce > setup > configuration.

You might have set **Load jQuery UI to only the frontend**.

It should always be in both the frontend and the backend.

[![Watch the video](https://img.youtube.com/vi/AA9cLYTuXZE/hqdefault.jpg)](https://www.youtube.com/watch?v=AA9cLYTuXZE)

## VAT does not appear in checkout: <a href="#vat-not-appears-in-check-out" id="vat-not-appears-in-check-out"></a>

In Configuration - Tax, tax is set to be applied on the shipping address

In the tax profile, it is set to apply the billing address.

For the tax rates to show up fine at the cart estimation and the checkout, the associated addresses at the Tax profile and the J2Store configuration tax tab should match.

## The donation plugin is empty. Why? <a href="#donation-plugin-is-emptywhy" id="donation-plugin-is-emptywhy"></a>

The donation app adds a Donation option type.

* So, go to J2Commerce > catalog > options.
* Create a New option.
* Choose the option type as donation
* Save.

**Associating the Donation option with the product:**

* Open your product (simple should work well).
* Go to J2Commerce (or J2Store Cart) tab - Options.
* Search for the donation option you just created.
* Add it and save.

## Multiple stores / different notification receiver depending on category <a href="#multiple-stores--different-notification-receiver-depending-on-category" id="multiple-stores--different-notification-receiver-depending-on-category"></a>

J2Commerce is a B2C solution where you can maintain only one store. It does not support a multi-store system. As a result, when an order is placed, all the store administrators will be notified.

If you just want the email notifications to be controlled and made dependent on the category, then a custom app could be developed that will send an email to the party concerned.

## New Line Characters (\r\n) in Checkout form <a href="#new-line-characters-rn-in-checkout-form" id="new-line-characters-rn-in-checkout-form"></a>

Go to Joomla admin - J2Commerce > Configuration > Checkout Layout. Click the Populate/reset button and Save.

## Shipping Not Working <a href="#shipping-not-working" id="shipping-not-working"></a>

Make sure of two things

1.Setting under J2Commerce > Configuration > Store > Weight Unit.

![shipping](https://raw.githubusercontent.com/j2store/doc-images/master/frequently-asked-questions/frequently-asked-questions/faq/faq_shipping.png)

2\. Setting under Edit Product > shipping tab

* Enable shipping.
* The configured shipping rates with shipping rates does has an entry with a matching rate. For eg: In case the item has 829 grams, you have to configure a rate between 800 and 1000, and the estimate shipping lists the rate.

## Why is the order listed in the backend even didn’t make a payment? How to see the paid products? <a href="#why-the-order-is-listed-in-the-backend-even-didnt-make-a-payment-how-to-see-the-paid-products" id="why-the-order-is-listed-in-the-backend-even-didnt-make-a-payment-how-to-see-the-paid-products"></a>

The purpose of the order status column is to differentiate between the new, paid, and pending orders. If the order status is 'NEW', then no payment has been made.

If you do not like the word 'NEW', you can change it. Go to J2Commerce > Localisation > Order status. Edit NEW and change it to something like UNPAID

## Why is the order listed in the backend? <a href="#why-the-order-is-listed-in-the-backend" id="why-the-order-is-listed-in-the-backend"></a>

When the customer reaches the last step of Checkout, we have to save the data as the order. Because when he clicks Place order, he will be redirected to PayPal. That also means we will lose the data if we do not save. So J2Commerce saves the order as NEW.

When a payment is successfully made, the order status will be set to CONFIRMED. So by looking at the order status, you can differentiate which orders are paid and which are not.

There is a marketing opportunity as well. You can follow up with the unpaid customers and convert them.

## Grid layout not working/columns. Why? <a href="#grid-layout-not-workingcolumnswhy" id="grid-layout-not-workingcolumnswhy"></a>

The issue seems to be the wrong sub-template. Open your product list layout menu. In the Common options tab > set the sub-template as Bootstrap3. Save

This should solve the issue. If it is already set to Bootstrap 3, then try to set it as Default.

## Preview additional image after clicking <a href="#preview-additional-image-after-click" id="preview-additional-image-after-click"></a>

copy "/components/com\_j2store/templates/default/view\_\_images.php"

to

"/templates/YOUR\_TEMPLATE/html/com\_j2store/templates/default/view\_image.php"

Edit the file and remove the highlighted line fully.

![preview image](https://raw.githubusercontent.com/j2store/doc-images/master/frequently-asked-questions/frequently-asked-questions/faq/previewimage.png)

## Remove the Thumbnail image from the Joomla! layout <a href="#remove-thumbnail-image" id="remove-thumbnail-image"></a>

* Go to Extensions -> Plugins -> select the type of content.
* You can find Content\_J2Store plugin.
* Open the plugin and go to the Item view tab.
* Set Display image to No.

## How to display the tax information (Incl. 19% tax) with the following text, has to be linked to several pages? <a href="#how-to-display-the-tax-informationincl-19-tax-with-follow-text-have-to-be-linked-to-a-several-page" id="how-to-display-the-tax-informationincl-19-tax-with-follow-text-have-to-be-linked-to-a-several-page"></a>

**Step 1: Enable tax information to be displayed on the  product page**

Go to J2Commerce > Configuration > Tax settings > Set Display tax information below the prices (in product pages) to 'YES'. See the screenshot below

![tax including](https://raw.githubusercontent.com/j2store/doc-images/master/frequently-asked-questions/frequently-asked-questions/faq/tax_including_text.png)

It would display a text like this: (Incl. XX% tax )

This might be in English.

You can change this with a language override for the below language constant.

Language constant is: `J2STORE_PRICE_INCLUDING_TAX`

**Step 2: Creating language override**

Go to Extensions > Language(s) > select Overrides.

Choose your language (For example, English (en-GB-Administrator)) in the filter section and click new on the top left.

Add `J2STORE_PRICE_INCLUDING_TAX` in the Language constant text box.

In the Text box, add Inkl% MwSt (add the link using HTML anchor tag). For example,

Check both locations.

Location should be an administrator.

Save and close.

Here is a screenshot showing the language override

![tax override](https://raw.githubusercontent.com/j2store/doc-images/master/frequently-asked-questions/frequently-asked-questions/faq/tax_override.png)

Here is how it looks on the front end

![front end](https://raw.githubusercontent.com/j2store/doc-images/master/frequently-asked-questions/frequently-asked-questions/faq/front_end_display.png)

#### Remove the image from orders and invoices while the image in the cart remains, based on the setting

You may create a template override for the file below:

Copy the file from/components/com\_j2store/views/myprofile/tmpl/orderitems.php

Paste into/templates/YOUR\_TEMPLATE/html/com\_j2store/myprofile/orderitems.php

Now edit the file and remove the following chunk of code (around line no 68)

`params->get('show_thumb_cart', 1) && !empty($thumb_image)):?>`

#### **The logo doesn't show on the PDF emailed to the customer**

Sometimes you might have added the image of your company logo in your invoice template, but it will not display.

**Solution:**

* Open the invoice template
* Choose the toggle editor
* Now, change the image path
* Don't close the toggle editor when saving.

#### **Clicking on the cart button redirects to home, and the URL contains "\&AMP"**

**SOLUTION:**

* It seems you have set 'NO' to SEF URLs in Joomla's global configuration.
* Please go to Joomla system > Global Configuration
* In SEO settings, set 'YES' to Search Engine Friendly URLs.
* Save.

#### Error: No shipping method was selected. Selection of a shipping method is mandatory

**SOLUTION:**

* It seems due to your cart settings in J2Commerce > configuration.
* You might have set 'YES' to prevent the customer from checking out if the shipping method was not chosen option in J2Commerce > configuration > cart.
* Please make sure that before choosing YES to this option, you must enable and configure shipping methods. Otherwise, it will display the error as No shipping method was selected. Selection of a shipping method is mandatory and prevents customers from placing an order.

#### Show/Hide Filters

Go to the menu manager and open the menu that links to J2Commerce > Product List View. You can find the filter settings in Item view options in category listings.

Please refer to the image below, which shows the names of the filters.

![](../../assets/faq_filter.png)

**To hide the Top bar filter completely:** Set 'HIDE' to Top bar filters.

**To hide the search box alone in the Top bar filter:** Set 'HIDE' to Search box.

**To hide the sort filter alone in the Top bar filter:** Set 'HIDE' to Sort filter.

**To hide the price filter in the sidebar:** Set 'HIDE' to price filter.

**To hide category filter in sidebar:** Set 'HIDE' to Category filter.

**To hide the Manufacturer filter (Filter by Brands):** Set 'HIDE' to the Manufacturer/Brand filter.

**To hide Product filter:** Set 'HIDE' to Product filter.

**To hide all filters (price filter, category filter, manufacturer filter, product filter):** Set HIDE to Sidebar filters. You can change the position of the sidebar filter by changing the position of the sidebar filters to Right and Left.

#### **Re-order checkout fields**

Go to J2Commerce > Configuration > Checkout Layout, where you can find the fields for both checkout billing address layout and checkout shipping address layout.

The fields are enclosed in square brackets. For example, \[first\_name]

You can relocate the field to anywhere in the layout, and you can also add a custom field there.

#### \[WHY] payment options are not showing at the checkout payment method step

Please go to J2Commerce > Set up > payment methods. Open the payment methods you are using. And make sure the Geozone field is set to All

And make sure your order total (cart total) is above zero. If it is zero, payment methods won't be necessary at the checkout.

#### How to allow customers to see only paid orders?

Go to J2Commerce > Configuration > Orders.

Choose the statuses and save. Now, customers will only be able to see the orders that have the selected statuses.

For example, if you selected Confirmed status alone, then only orders that have the confirmed status will show up.

#### Can I combine the features of a variable product along with the configurable product?

The variable product offers variant-specific parameters, while the configurable product offers a parent-child relationship.

Variable products and configurable products work based on different workflows.

This makes it not possible to combine both features.
