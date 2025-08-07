---
description: J2Commerce (formerly known as J2Store)
---

# EBS Payment Plugin

This plugin adds EBS Payment Gateway integration with J2Store.

## Installation <a href="#installation" id="installation"></a>

Use the Joomla installer to install the plugin. Make sure that your J2Commerce version is at least 4

### Configuration <a href="#configuration" id="configuration"></a>

Go to Plugin manager and open the EBS Payments for J2store plugin. Fill in the parameters that follow.

**Payment Option title** The value entered here will be used as the title for this payment method. Customer will see this value when he checks out.

**EBS Account ID** Account ID provided by the EBS.

**EBS Secret Key** You can enable the use of a secret key to ensure sure transaction. Login to your EBS Merchant back end and go to Account->Settings. Request Preference. Note down the secret key and enter it in this parameter.

**Enable Test mode** If you set this to Yes, you can test your integration with the EBS.

**Use the following test credentials** Account Id : 5880 secret key : ebskey

**Following Card no can only be used for testing phase:**

Card No: 4111 1111 1111 1111 Exp Date: 07/2016 CVV: 123

**Joomla Article ID for custom thank you message** You can create a joomla article with a custom message and display when the customer returns to the site after makingpayment at EBS.

**Support**

Still have questions? You can contact support: [Click here](https://www.j2commerce.com/support)
