---
description: J2Commerce (formerly known as J2Store)
---

# Creating subscription based products

## Creating a simple subscription product <a href="#creating-simple-subscription-product" id="creating-simple-subscription-product"></a>

Here is a video on how to create a simple subscription product:

[![Watch the video](https://img.youtube.com/vi/mNFXMLHrdjY/hqdefault.jpg)](https://www.youtube.com/watch?v=mNFXMLHrdjY)

* Go to Content > Article Manager > create new article > Move to the J2Commerce (J2Store cart) tab
* Choose 'YES' to Treat as a Product and select Simple Subscription as Product Type, and click Save and Continue.

![](<../../assets/simple subscription.webp>)

* Set 'YES' to Visible in storefront and navigate to the Pricing tab.
* Pricing tab, where you could set your subscription product’s price, customer group, expiry date, etc.

![](<../../assets/pricing.webp>)

You can set images, shipping, and filters to your subscription product.

## Creating a variable subscription product <a href="#creating-variable-subscription-product" id="creating-variable-subscription-product"></a>

Here is a video on how to create a variable subscription product:

[![Watch the video](https://img.youtube.com/vi/mp9m1qSMJ0E/hqdefault.jpg)](https://www.youtube.com/watch?v=mp9m1qSMJ0E)

The variable subscription product allows you to add only one option with multiple values.

For example, create a premium subscription providing customers with an option to choose a subscription period.

Go to J2Commerce > Catalog > Options and create an option “Subscription period” and add the option values such as 3 months, 6 months.

![subscription option](../../assets/options.webp)

![Subscription options](../../assets/options2.webp)

* Go to Content > Article Manager > create new article > Move to the J2Commerce (J2Store cart) tab
* Choose 'YES' to Treat as a Product and select Variable Subscription as Product Type, and click Save and Continue.
* Set 'YES' to Visible in storefront and navigate tothe  Variants tab.

![](<../../assets/variable sub (1).webp>)

* In the variants tab, search and add the (Subscription Period) option. Click on the option and click SAVE.&#x20;

![](<../../assets/variable sub1.webp>)

* Next, add the set values.

![](<../../assets/variable sub3.webp>)

* Once you have created the set values, click on the Generate Variants button

![](<../../assets/variable sub2.webp>)

It allows you to add one option with multiple variants. For example, Subscription period as an option with the following variants: 3 months, 6 months, etc. See the screenshot below

![sub variants](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/creating-subscription-based-products/subscription-variants.png)

## Pricing <a href="#pricing" id="pricing"></a>

**Subscription price:** Enter the membership price (for example, $ 29) based on either a daily or weekly or monthly, or yearly basis. For example, if you would like to give a subscription price of $29 for only 3 months, then enter $29 in the first text box and then choose every 3rd from the dropdown list, and then choose the month from the third dropdown list.

**Subscription length:** The subscription length duration will be listed based on the recurring period you selected above. For example, if your subscription product’s duration period is only for 3 months, choose 3 months. So the subscription will end at the end of the 3rd month. If you would like to give a lifetime price for your subscription product (i.e.) wants to collect $29 at the end of every 3 months for lifetime, choose Never Expire for the Subscription length. So $29 for every 3rd month for lifetime.

**Add / Remove user groups:** Users will be added and removed from the Joomla user groups when their subscription to the level is enabled or disabled.

**Sign-up fee:** This app allows you to collect a one-time set-up fee or sign-up fee from your customers. Enter your sign-up fee here. For example, $5 or $10.

**Renewal discount:** If you want to give the same discount to the customer during renewals. Checking this checkbox will override any renewal discount set globally in the app settings.

**Set Advanced Pricing:** If you want advanced pricing, click the ‘Set Prices’ button, and it will open up a pop-up window to allow you to set an advanced price setting.

![subscription pricing](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/creating-subscription-based-products/subscription-pricing.png)

## Frontend Demo: <a href="#frontend-demo" id="frontend-demo"></a>

![subs frontend](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/creating-subscription-based-products/subscription-frontend.png)

![subs payment checkout](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/creating-subscription-based-products/subscription-payment-checkout.png)

![subs cart](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/creating-subscription-based-products/subscription-cart.png)

![subs frontend profile](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/creating-subscription-based-products/subscription-frontend-profile.png)

## Check the subscription details and status from the backend <a href="#check-the-subscription-details-and-status-from-backend" id="check-the-subscription-details-and-status-from-backend"></a>

Go to J2Commerce > Apps and open the Subscription Products app, and you can see the subscription button on top of the page. Click on this button to view the customer’s subscription details and status.

![subs button](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/creating-subscription-based-products/subscription-button.png)

![subs detail](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/creating-subscription-based-products/subscription-detail.png)
