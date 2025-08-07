---
description: J2Commerce (formerly known as J2Store)
---

# Payeezy

Payeezy is the payment gateway offering from First Data, a leading payment service provider in the world. The plugin integrates J2Store Joomla shopping cart with the Direct API of the Payeezy, allowing you to accept card transactions.

## System Requirements <a href="#system-requierments" id="system-requierments"></a>

1. PHP 8.1.0 +
2. Joomla! 4.x/ Joomla! 5.x +
3. J2Commerce / J2Store 4.x +

## Installation Instructions <a href="#installation-instructions" id="installation-instructions"></a>

* Use the Joomla installer to install the plugin.
* In the backend, go to J2store Dashboard -> Payment methods and enable plugin.
* Open the plugin and enter the parameters (read the explanation about each parameter given below)
* Save and close it.

## Configuration <a href="#configuration" id="configuration"></a>

**Payment option title** The value entered here will be used as the title for this payment method. Customer will see this value when he checks out.

**Plugin Display Image** This image will be displayed while payment options are listed in the checkout page.

**API key** Enter the valid API key associated with your Payeezy account. You could get the API keys by logging in to the Payeezy dashboard and navigating to the API menu:

![pay](https://raw.githubusercontent.com/j2store/doc-images/master/payment-methods/payeezy/payeezy.png)

**Secret key** Enter the valid secret key associated with your payeezy account.

**Merchant Token** Enter the valid merchant token associated with your payeezy account.

**Use Payeezy sandbox** Test your store using sandbox feature of Payeezy. Set YES to use the Payeezy in test mode.

![payeezypay](https://raw.githubusercontent.com/j2store/doc-images/master/payment-methods/payeezy/payeezy_01.png)

**Test API key** Enter the valid API key associated with your payeezy’s sandbox account.

**Test Secret key** Enter the valid secret key associated with your payeezy’s sandbox account.

**Test Merchant Token** Enter the valid merchant token associated with your payeezy’s sandbox account.

**Geozone** By selecting a geozone here, you can restrict this payment method to only customers of that geo-region. Choose All geozones to show this method to all customers.

**Display text on selection** The text entered here will be displayed when customer selects this payment method. You can enter a language constant as a value here if you are using a multi-lingual site and then write a language override. For example, enter a language constant:

J2STORE\_TEXT\_TO\_DISPLAY\_ON\_SELECTION.

Now you can go to Joomla admin-> Language Manager->Overrides and create overrides for the language constant in all your languages.

**Display text before payment** The text entered here will be displayed to the customer at the order summary screen before he makes the payment. You can enter a language constant as a value here if you are using a multi-lingual site and then write a language override. Refer the Display text on selection parameter.

![payeezyplugin](https://raw.githubusercontent.com/j2store/doc-images/master/payment-methods/payeezy/payeezy_02.png)

**Display text on after payment** The text entered here will be displayed when customer completes the payment. You can enter a language constant as a value here if you are using a multi-lingual site and then write a language override. Refer the Display text on selection parameter.

**Display text on error in payment** The text entered here will be displayed to the customer when there is an error in the payment process. You can enter a language constant as a value here if you are using a multi-lingual site and then write a language override. Refer the Display text on selection parameter.

**Article ID for thank you message** Click on select button to choose an article to say Thank you message to customers.

**Debug** Choose YES to enable the debug mode. If you set this to yes, then debug messages will be logged and saved in the cache folder in your Joomla root directory. DO NOT select YES in the live site.

**Payment button text** Text entered here will be added as the name of the payment button. You can enter a language constant as a value here if you are using a multi-lingual site and then write a language override.

![payeezy3](https://raw.githubusercontent.com/j2store/doc-images/master/payment-methods/payeezy/payeezy_03.png)

**Support**

Still have questions? You can contact support: [Click here](https://www.j2commerce.com/support)

Thank you for using our extension.
