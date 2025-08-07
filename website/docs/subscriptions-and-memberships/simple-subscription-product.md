---
description: J2Commerce (formerly known as J2Store)
---

# Simple Subscription Product

## Creating a simple subscription product <a href="#creating-simple-subscription-product" id="creating-simple-subscription-product"></a>

The following are the steps to create a simple subscription product:

Go to Content > Article Manager > create new article > Move to the J2Commerce (J2Store cart) tab

Choose 'YES' to Treat as a Product and select Simple Subscription as Product Type, and click Save and Continue.

![simple subs](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/simple-subscription-product/subscription-simple.png)

Set 'YES' to Visible in storefront and navigate to Pricing tab.

Pricing tab, where you could set your subscription product’s price, customer group, expiry date, etc.

You can set images, shipping, and filters to your subscription product.

## How to set up pricing for a subscription product? <a href="#how-to-setup-pricing-for-subscription-product" id="how-to-setup-pricing-for-subscription-product"></a>

**Subscription price:** Enter the membership price (for example, 29) based on either a daily or weekly or monthly, or yearly basis. For example, if you would like to give a subscription price of $29 for only 3 months, then enter $29 in the first text box and then choose every 3rd from the dropdown list, and then choose the month from the third dropdown list.

**Subscription length:** The subscription length duration will be listed based on the recurring period you selected above. For example, if your subscription product’s duration period is only for 3 months, choose 3 months. So the subscription will end at the end of the 3rd month. If you would like to give a lifetime price for your subscription product (i.e.) wants to collect $29 at the end of every 3 months for lifetime, choose Never Expire for Subscription length. So $29 for every 3rd month for lifetime.

**Add / Remove user groups:** Users will be added and removed from the Joomla user groups when their subscription to the level is enabled or disabled.

**Sign-up fee:** This app allows you to collect a one-time set-up fee or sign-up fee from your customers. Enter your sign-up fee here. For example, $5 or $10.

**Free trial:** Using the Free Trial, you can set the number of days the subscription can be in trial mode. Once the trial days are over, the app automatically converts it to an active subscription and attempts to process the first payment.

**Renewal discount:** If you want to give the same discount to the customer during renewals. Checking this checkbox will override any renewal discount set globally in the app settings.

**Set Advanced Pricing:** If you want advanced pricing, click the ‘Set Prices’ button, and it will open up a pop-up window to allow you to set an advanced price setting.

![subs create](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/simple-subscription-product/simple-sub-prod-create.png)

Watch the video tutorial for creating a simple subscription product:

[![Watch the video](https://img.youtube.com/vi/mNFXMLHrdjY/hqdefault.jpg)](https://www.youtube.com/watch?v=mNFXMLHrdjY)

### Frontend Demo <a href="#frontend-demo" id="frontend-demo"></a>

![subs prods frontend](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/simple-subscription-product/simple-sub-prods.png)

### Example <a href="#example" id="example"></a>

Consider the hosting provider sells the domain names with 6-month subscription plan. His / Her aim is to collect $9.99 at the end of every month for 6 months.

Let’s see the steps below to implement the above scenario.

**Step 1:** Create a new product with type Simple subscription

**Step 2:** On the 'general' tab, set 'YES' to visible in the storefront and move to the Pricing tab

**Step 3:** In the pricing tab, enter 9.99 in the subscription price text box. After mentioning the price, choose every item from the dropdown list next to the price text box and then select Month from the second dropdown list.

**Step 4:** Then, select the duration of your subscription plan. In our scenario, the subscription duration is 6 months, so select 6 Months from the subscription length dropdown.

That is, \*\*$9.99 every Month for 6 Months \*\*

**Step 5:** Select the user groups. The customers will be added / removed to / from the user group selected here at the time of subscription is created and ended.

**Step 6:** Enter the amount in the sign-up fee text box if you want to collect any additional charges from customers.

**Step 7:** If you would like to offer a trial for your subscription, enter the trial days in number here. For example, 15 days.

![sub ex](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/simple-subscription-product/simpe-sub-ex.png)

![sub ex demo](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/simple-subscription-product/simple-sub-ex-demo.png)
