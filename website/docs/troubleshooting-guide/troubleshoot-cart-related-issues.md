---
description: J2Commerce (formerly known as J2Store)
---

# Troubleshooting Cart related Issues

## Are you trying to hide the buy button for specific products? <a href="#are-you-trying-to-hide-the-buy-button-for-specific-products" id="are-you-trying-to-hide-the-buy-button-for-specific-products"></a>

By applying a small css rule in your template’s css file, you could hide the cart button for particular product.

Below is the css that should be applied at the end of your template’s css file

`product-xx .j2store-add-to-cart { display: none; }`

Where XX is your product ID.

## Not adding items to the cart <a href="#not-adding-items-to-the-cart" id="not-adding-items-to-the-cart"></a>

EU e-Privacy Directive plugin does not even allow the Joomla session cookie. That means no one can login in to the front end, including customers.

In the plugin settings, make sure the Joomla session cookie is allowed.J2Store saves the cart data in the Joomla session and maintains the cart record id there and also address information (if checked out as guest). So J2Commerce at least requires you to allow the Joomla session cookie.

## The cart was cleared during registration <a href="#cart-cleared-during-registration" id="cart-cleared-during-registration"></a>

It is because the default Registered group and Guest group chosen might be wrong.

Please go to User Manager> Options. Make sure the Default Registered Group is set to: RegisteredDefault guest user group is set to: Guest

![cart clear](https://raw.githubusercontent.com/j2store/doc-images/master/troubleshooting-guide/troubleshooting-cart-related-issues/cart-clear-01.png)

And make sure you do not have any cookie domains in Joomla admin - Global configuration.

To validate if your settings are correct, try this basic Joomla feature:

Try to login as a user in the frontend. If you are able to login and stay logged in, then your user settings are correct.If you could not login, then your user manager settings are not correct.

To change the Add to cart block and style in category view

copy /components/com\_\_j2store/templates/YOUR-SUB-TEMPLATE/default\_\_cart.php

to

/templates/TEMPLATE>/html/com\_j2store/templates/YOUR-SUB-TEMPLATE/default\_cart.php

> IMPORTANT: If you are using bootstrap 3 as a sub-template, replace the default with bootstrap3(/components/com\_j2store/templates/bootstrap/..)

To change the Add to cart block and style in item view

copy /components/com\_\_j2store/templates/YOUR-SUB-TEMPLATE/view\_\_cart.php

to

/templates/TEMPLATE>/html/com\_j2store/templates/YOUR-SUB-TEMPLATE/view\_cart.php

Make the changes and save.

## Is the cart not responding when you click the update or empty cart button? <a href="#is-cart-not-responding-when-you-click-update-or-empty-cart-button" id="is-cart-not-responding-when-you-click-update-or-empty-cart-button"></a>

If you enable System - Page Cache / Speed Cache or any third-party cache plugins, they photocopy every page, including the cart page. Though the cart page is dynamic, it does not listen. It would just photocopy the page and store it. Until the cache is cleared, it will keep serving the photo-copied page.

In e-commerce / dynamic websites, you should not use Page Caches like the System Page cache plugin.

Please disable the cache plugins like System - Page Cache. Clear your cache and check.

Another thing:

**Progressive caching**. It is not a recommended cache method. This will override modules having dynamic content and cache the module output as well (Imagine the cart module. Its contents change, but progressive caching will not listen even if you set in the Module advanced settings to No Caching).

Please use the **Conservative caching**.

## Minicart icon not showing up? <a href="#minicart-icon-not-showing-up" id="minicart-icon-not-showing-up"></a>

It seems to be applying the wrong Font-Awesome class in the module settings page.

* Open the J2Commerce (or J2Store cart) module under Extensions > Modules > J2Store cart.
* You can see something like below entered in the Minicart icon class text box **fa fa-shoppingcart**
* Change with **fa fa-shopping-cart**
* Save.

## \[HOW TO]Add cart module right or left below the product filter? <a href="#how-toadd-cart-module-right-or-left-below-the-product-filter" id="how-toadd-cart-module-right-or-left-below-the-product-filter"></a>

You can use special module positions in the filter display section to display the cart module to the product filter.

1. j2store-filter-left-top -Top of left filter
2. j2store-filter-left-bottom -Bottom of left filter
3. j2store-filter-right-top -Top of right filter
4. j2store-filter-right-bottom -Bottom of right filter

For more details about the special module position, please click [Here](https://docs.j2commerce.com/layout/special-module-positions)

## Avoid cart items cleared <a href="#avoid-cart-items-cleared" id="avoid-cart-items-cleared"></a>

Sometimes, customers accidentally enter the wrong credit card / debit card details. He came to know that he entered the wrong card details only after clicking on the place order. But cart items will be cleared once you click the place order button. So you could not retry the payment process, and it is frustrating.

To overcome this, you can restrict clearing cart items only on order confirmation.

Go to J2Store > Configuration > Cart tab. Find the parameter **“Clear cart items”**. Set this parameter to **“On Confirmation”** and save.

#### **Minicart module not updating the number of items in the cart**

J2Store’s Mini Cart is a very handy tool for your customers when they shop. They can check the number of items in their order and the total. The cart module is refreshed in real-time using an Ajax request. On a few occasions, the cart may not get updated in real time. Here is a checklist that should help you solve the problem.

* **Global Cache settings**

Go to J2Commerce > Global configuration > System tab.

Caching is like taking a snapshot of your pages and presenting the same to every visitor coming to your site (until the cache is refreshed again).

Since the cart module handles dynamic data, it should be excluded from caching.

In order to exclude the module from caching, your Global cache setting should be set either to Conservative Caching or Disabled. Check the screenshot below.

If you use Progressive Caching, Joomla will override the Cache settings in the module. The cart module might work fine in smaller sites with Progressive Caching enabled, but if you have a larger site with a large number of visitors, then it might cause issues with the module.

![cache settings](https://raw.githubusercontent.com/j2store/doc-images/master/troubleshooting-guide/troubleshooting-cart-related-issues/cache_settings.png)

* **Module caching**

Go to J2Commerce > Module Manager > J2Store Cart module

In the Advanced tab, set the Caching to No Cache.

![mod cache](https://raw.githubusercontent.com/j2store/doc-images/master/troubleshooting-guide/troubleshooting-cart-related-issues/mod_cache_settings.png)

## Javascript conflict <a href="#javascript-conflict" id="javascript-conflict"></a>

Since the J2Commerce updates the cart module using an AJAX request, it is important that your site does not have any JavaScript conflicts.

JavaScript conflicts mostly occur due to the loading of multiple jQuery libraries or the lack of a JavaScript library. It is possible that a third-party extension / module on your site might be using an older or incompatible JavaScript library, which might produce a conflict.

**Solution A:**

Please download and install a jQuery Script manager like jQuery Easy and configure it. This should solve most of the issues

**Solution B:**

It is not exactly a solution. It's a troubleshooting method. Open your website in the Google Chrome browser. Open the browser menu and go to Tools > Developer Tools.

You can see the Developer Tools window opening at the bottom of the browser. Navigate to the Console tab.

Now, refresh your website. The Console tab will show you if there are any JavaScript conflicts in your site. It will also show you the file name and the line number that produces the error. Take a screenshot and send it to us, and also send a copy to your template provider. We will check and get back to you with the solution.

![developer tool console](https://raw.githubusercontent.com/j2store/doc-images/master/troubleshooting-guide/troubleshooting-cart-related-issues/developer_tools_console.png)

## JSON support <a href="#json-support" id="json-support"></a>

While most of the hosting service providers enable JSON support for PHP by default, some do not. It is easy to check if JSON is enabled or not in your hosting account.

Go to J2Commerce > System > System Information > PHP Information

You can check whether JSON support is enabled or not in the PHP Information tab. If you do not find any mention of JSON, then you can assume that it is not enabled for your account. You should get in touch with the hosting service provider, who can enable the JSON support for your account.

You can look for something like below in the PHP Information tab.

![json](https://raw.githubusercontent.com/j2store/doc-images/master/troubleshooting-guide/troubleshooting-cart-related-issues/json_setup.png)

## I don’t see the Add to Cart Button. What is the problem? <a href="#i-dont-see-add-to-cart-button-what-is-the-problem" id="i-dont-see-add-to-cart-button-what-is-the-problem"></a>

Don’t worry. This is often a simple configuration mistake. We have answered this question more than a hundred times.

This post explains the reasons behind this. Make sure you check the following points before writing to us.

**Step 1:**

Go to Joomla admin > J2Commerce > configuration > product tab. Set the Catalog Mode to NO and save

Catalog Mode: The term itself explains that your products are just a catalog. Set this parameter to Y'ES', only when you don't want your customers to purchase from the website and just provide price information. Otherwise, this parameter should always be set to YES.

Check your storefront. Still, you can’t see the add to cart button? Move on to Step 2.

**Step 2:**

If you are here, then you need to check another parameter.

Go to J2Commerce > Configuration > Cart tab.

Did you set the Add to cart placement to Within article using tag:

If yes, then go to Article Manager and open your article / product.

In the content area, did you enter the J2store plugin tag somewhere?

You can find the correct tag ( a plugin shortcode) under the J2Commerce (or J2store cart) tab. You can copy the shortcode and paste in the content area.

Now save the article. Now you will be able to see the Add to cart.

**Step 3:**

Still no luck. Then there might be a template override for the articles, or some other plugin is causing an issue. Write to us, our support team will take a look and help you solve the issue.

## HOW TO move the Add to Cart Button using the Short Plugin tag <a href="#how-to-move-add-to-cart-button-using-the-short-plugin-tag" id="how-to-move-add-to-cart-button-using-the-short-plugin-tag"></a>

You can move the location of the Add to cart block within the product layout using a simple plugin tag.

There are a few steps involved in using the plugin tag feature. Read on to understand.

**Step 1: Change the Add to cart placement parameter**

By default, the Add to cart button will appear after displaying the product (article) content. You can, however, change this and take control of its placement. You first need to change the parameter that controls the add to cart placement.

Go to J2Commerce > Configuration > Cart tab

Set the Add to cart placement to Within article using tag and save. (See the picture given below).

![cart placement](https://raw.githubusercontent.com/j2store/doc-images/master/troubleshooting-guide/troubleshooting-cart-related-issues/cart_placement.png)

NOTE: You can also set the param to BOTH. In that case, the cart block will display at two places - a place where you entered the plugin tag and its default location.

**Step 2: Using the plugin tag in product content (article)**

Now go to Joomla admin -> Content -> Article Manager. Either create an article (product) and save or open an existing product.

Go to the J2Commerce (or J2Store Cart) tab. You will find the plugin tag to use for the product. (see the screenshot below)

![cart tag](https://raw.githubusercontent.com/j2store/doc-images/master/troubleshooting-guide/troubleshooting-cart-related-issues/cart_tag.png)

Either copy the plugin tag or note it down. In this example, the following plugin tag is used `{j2storecart 2}`

Here 2 is the product ID (aka, Article ID )

Now, go to the Content tab and enter the plugin tag

Now save the article.

You will now see the add to cart block placed at your preferred location.
