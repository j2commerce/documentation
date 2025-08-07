---
description: J2Commerce (formerly known as J2Store)
---

# Open hours (time based restriction)

The Open Hours app allows you to restrict orders from customers based on your store’s operational timings. You can configure your store’s opening and closing times for all days of the week. This means any orders coming in after closing hours will not be accepted.

Make sure that you set the 24-hour format for time configuration.

## Requirements <a href="#requirements" id="requirements"></a>

1. PHP 8.1.0 +
2. Joomla! 4.x/ Joomla! 5.x +
3. J2Commerce / J2Store 4.x +

**Installation**

1. Download the app package from our site’s extensions section and install it using Joomla! installer.
2. After installing the app, go to J2Commerce > Apps and click Enable on the app named “Opening hours”.
3. Once activated, click on open to configure your store's opening and closing times.

**Basic settings**

**Error message**

This is the place to show an error message when the customer places an order outside the store’s operational hours.

Enter your custom error message here. You may also enter a language string and write a language override.

For eg: Sorry! Orders are accepted only after %s and before %s. The first %s will be from time and the second %s will be to time in the below configuration.

**Shop available time**

For instance, if your store’s operational timing is from 10.00 am to 11.00 pm on weekdays and closed on weekends (Saturday and Sunday), you will have to configure your store timing like below,

**On weekdays**

From time 10.00

To time - 23.00

![oh01](https://raw.githubusercontent.com/j2store/doc-images/master/apps/open%20hours/oh_01.png)

Now, if a customer tries to place an order before opening time or after closing time on weekdays, the customer will be displayed with a message informing them that orders cannot be placed right now.

**On weekends**

To set the shop closed on weekends (Saturday and Sunday), you will have to set just 1 minute for Saturday-Sunday. Refer image below,

![oh02](https://raw.githubusercontent.com/j2store/doc-images/master/apps/open%20hours/oh_02.png)

If the customer tries to purchase on weekends, he will be informed that orders cannot be placed.

![oh03](https://raw.githubusercontent.com/j2store/doc-images/master/apps/open%20hours/oh_03.png)
