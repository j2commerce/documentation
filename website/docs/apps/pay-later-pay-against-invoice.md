---
description: J2Commerce (formerly known as J2Store)
---

# Pay later/Pay against invoice

Invoice your customers and allow them to pay for the order online at a later date. There can be a number of situations when you want to send the invoice to the customer, complete the terms, and then collect payments.

Invoice first, and collect payment online. Allow customers to re-try payment for unpaid orders

## Requirements <a href="#requirements" id="requirements"></a>

1. PHP 8.1.0 +
2. Joomla! 4.x/ Joomla! 5.x +
3. J2Commerce / J2Store 4.x +

## Installation <a href="#installation" id="installation"></a>

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Apps

**Step 2:** Locate the Add to User Group App > click View Details > Add to cart > Checkout.&#x20;

**Step 3:** Go to your My Downloads under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

**Step 4:** Use the Joomla! installer to install the app. Go to System > Install > Extensions > Download the app

**Step 5:** Go back to System > Manage > Extensions.

**Step 6:** Search for the app and enable it.

## Settings <a href="#settings" id="settings"></a>

Now it's time to open the app and configure the settings.&#x20;

**Step 1:** Go to Components > J2Commerce > Apps&#x20;

![plpa01](https://raw.githubusercontent.com/j2store/doc-images/master/apps/pay-later-pay-against-invoice/plpa01.png)

4\. Click Open to get started with the app.

![plpa02](https://raw.githubusercontent.com/j2store/doc-images/master/apps/pay-later-pay-against-invoice/plpa02.png)

**Basic settings**

It is very simple and easier to get started with this app. There are no complex settings that need to be configured. You just enter the time interval during which the re-order link should appear/disappear.

**Profile Reorder enabled after this time interval(in seconds)**: Enter the time (in seconds) at which the re-order link should appear on the customer’s order history page. For example, 60 seconds. Re-order link will appear after 60 seconds from the time when the customer abandoned the order.

**Profile Reorder link expired (in days):** Define when the re-order link should disappear from the customer’s order history page. For example, 5. Re-order link will get expired after 5 days.

**Pay button text:** Text entered here will be displayed in the order history page. If you are using ma ultilingual site, enter the value as a language string.

![plpa03](https://raw.githubusercontent.com/j2store/doc-images/master/apps/pay-later-pay-against-invoice/plpa03.png)

**Order status for showing the pay now button:** Choose othe rder status for which the Pay button should be displayed.

**Use cases**

This app can be possible at below two use cases.

**Use Case 1:** Invoice first, collect payment online

In the traditional methods, you would have to ask customers to manually transfer the money to your bank. You can now automate this process.

Just create an order in the backend, send the invoice to the customer, and when he is ready, he can just view the order and make the payment online. No hassles in collecting payments.

For example, consider that you are designing and selling gift cards. You can get the quote and gift card details from the customer. Once you have finished designing the gift card and it is ready to sell, just create an unpaid order from the store backend and send the invoice. So the customer can view the order and make the payment online.

**Use Case 2:** Allow customers to re-try payment for unpaid orders

Sometimes, customers abandon the order and leave your site without making a payment. You can now easily close those abandoned orders by allowing customers to re-try the payment from their order history page.

**Frontend screenshots**

**Re-order link appears**

![plpa04](https://raw.githubusercontent.com/j2store/doc-images/master/apps/pay-later-pay-against-invoice/plpa04.png)

**After clicking on Re-order link,**

![plpa05](https://raw.githubusercontent.com/j2store/doc-images/master/apps/pay-later-pay-against-invoice/plpa05.png)

**Order summary**

![plpa06](https://raw.githubusercontent.com/j2store/doc-images/master/apps/pay-later-pay-against-invoice/plpa06.png)
