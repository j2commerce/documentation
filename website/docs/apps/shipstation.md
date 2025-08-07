---
description: J2Commerce (formerly known as J2Store)
---

# ShipStation

The new J2Commerce integration with Shipstation helps you to integrate your J2Commerce site with one of the best shipping solutions, Shipstation. Now import your orders and manage shipping on the go with the help of this integration. With Shipstation, you need not worry about shipping your orders using different carriers, cause you can manage everything at a one-stop place using this integration.

ShipStation is a multi-channel, multi-carrier shipping solution that simplifies the shipping process for online merchants. ShipStation can be integrated seamlessly with any shipping carrier and channel, and your orders can be easily tracked and managed with just a few clicks, regardless of the location.

Now conduct your business with more fluidity and transparency with the easy interfacing of ShipStation.

NOTE: ShipStation will not send any Webhook notifications when you manually mark an order as Shipped in your ShipStation console. It is treated as externally fulfilled orders. Tracking numbers for those orders should be entered manually in your ShipStation and also in J2Commerce.

**Installation**

The integration can be downloaded from our site and installed using the default Joomla! installer.

**Pre-requisites**

A ShipStation account is required to use the integration. You could create one at www.shipstation.com

**Creating an account and generating API keys**

To get the API keys for the integration, it is necessary to create an account with Shipstation. The following are the steps to be done:

* Go to www.shipstation.com.
* Click on the Start your 30-day free trial button.
* A page appears asking you to create a new account. Furnish your details and click on the Let's go to shipping button.
* Before logging into your account, it is necessary to verify the email address by clicking on the link sent to your registered email address.
* Post verification, you can log in to the account by clicking on the login button in the top right corner and keying in the credentials.
* Click on the settings icon in the right corner.
* There will be a lot of tabs displayed on the left side. Click on the Account tab.
* Clicking on the Account tab will open up the options from which the API settings option has to be chosen.
* Click on the Generate API keys button. API keys will be generated.

The screenshots below are for reference:

**Creating an account with ShipStation**

![ss01](https://raw.githubusercontent.com/j2store/doc-images/master/apps/shipstation/shipstation01.png)

**Generating API keys**

![ss02](https://raw.githubusercontent.com/j2store/doc-images/master/apps/shipstation/shipstation02.png)

![ss03](https://raw.githubusercontent.com/j2store/doc-images/master/apps/shipstation/shipstation03.png)

![ss04](https://raw.githubusercontent.com/j2store/doc-images/master/apps/shipstation/shipstation04.png)

![ss05](https://raw.githubusercontent.com/j2store/doc-images/master/apps/shipstation/shipstation05.png)

**Webhook URL**

After entering the API keys in the app, the next step would be to set up the webhook URL in the ShipStation account.

This has to be done in order to receive notifications of the changes that occur in ShipStation. The notifications will come up in your J2Commerce site’s backend. So this is more of a synchronization.

**Setting up webhook notifications**

Webhook notifications can be set up by following the steps given below:

* The URL for the webhook can be fetched from the app’s settings.

![ss06](https://raw.githubusercontent.com/j2store/doc-images/master/apps/shipstation/shipstation06.png)

* Now log in to your ShipStation account.
* Go to Settings > Integrations > Integration partner > Webhook.
* Specify the URL in the field Webhook URL and save.

**App settings**

![ss07](https://raw.githubusercontent.com/j2store/doc-images/master/apps/shipstation/shipstation07.png)

The following are the parameters that have to be filled out for the integration to work:

* **API key:** The ShipStation API key has to be specified here. The procedure to generate the API keys has been mentioned here
* **API Secret:** The ShipStation secret key has to be mentioned [here](http://docs.j2store.org/articles/2093085-shipstation#apikeys).
* **Webhook URL: The webhook URL** to be specified in the ShipStation account’s integrations part is provided here.
* **Allowed Order status:** The orders with the chosen status will be synchronized with Shipstation. For example, if the status is chosen as Confirmed here, then all the orders whose status is confirmed will be synchronized with Shipstation.
* **Debug:** This option has to be set to Yes if the activity of ShipStation has to be logged.

![ss08](https://raw.githubusercontent.com/j2store/doc-images/master/apps/shipstation/shipstation08.png)
