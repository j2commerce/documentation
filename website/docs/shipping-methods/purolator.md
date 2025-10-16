---
description: J2Commerce (formerly known as J2Store)
---

# Purolator

This plugin integrates Purolator shipping API with J2Store Joomla eCommerce solution.

**Requirements**

- with PHP 8.1.0 +
- Joomla! 4.x/ Joomla! 5.x +
- J2Commerce / J2Store 4.x +

**Installation**

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Apps

![](/img/purolator-purchase-1.webp)

**Step 2:** Locate the Purolator Shipping App > click View Details > Add to cart > Checkout.&#x20;

**Step 3:** Go to your My Download under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

![](/img/purolator-download.webp)

If there is more than one version available, make sure you click View Files for the most current version.&#x20;

![](/img/purolator-download1.webp)

#### **Installation:**&#x20;

You can install this USPS shipping plugin, using Joomla installer.The following steps help you for successful installation.

**Step 1:** In the Joomla admin, go to System > Install > Extensions

![](/img/purolator-ext-install.webp)

**Step 2:** Click on the Browse button and select Purolator Shipping zip file

![](/img/purolator-man-install1.webp)

Step 3: In the Joomla admin, go to System > Manage > Extensions

![](/img/purolator-man-install.webp)

**Step 6:** Search for the app and enable it

![](/img/purolator-enable.webp)

**Step 7:** Select J2Commerce >setup > shipping methods

Step 8: Locate the Purolator Shipping App and click View to begin customizing it

![](/img/purolator-setup.webp)

#### **Basic Settings:**

**API key:** Enter the valid API key provided by Purolator shipping.

**API password:** Enter your Purolator shipping account’s password.

**API account:** Enter the account number associated with your Purolator account.

**Origin zip code:** Enter the postal code from where the shipping is actually made.

![purolator](https://raw.githubusercontent.com/j2store/doc-images/master/shipping-methods/purolator/purolator_01.jpg)

**Sandbox:** Purolator shipping offers sandbox feature to use the shipping in test mode. Choose YES will enable the sandbox feature.

**Box List:** Purolator Shipping comes with box packing feature. The box packing included with this shipping method lets you pack all the items into single box for which you have to define height, width, length, weight and max-weight.

**Purolator Service:** Choose the shipping services that you would like to provide to the customers.

> NOTE: Services are depend on the customer’s shipping address. Even if you choose many services here, Purolator will show only the services that are available to the customer’s shipping destination at the checkout.

**Handling Fee:** If you would like to charge handling fee, you can enter the amount here.

**Length unit:** The valid length units are centimetre and inch. Make sure that you are using the same length unit for all your products.

**Weight unit:** The valid weight units are kilogram and pound. Make sure that you are using the same length unit for all your products.

**Display delivery date:** Choosing YES will display the delivery date.

**Tax class:** Choose your shipping has to be taxable or not. If you would like to make your shipping taxable, you can choose your tax profile here.

**Geozone:** You can select a geo-zone and restrict the availability of this shipping method to the countries/zones in that geo zone. Choose All to make this shipping method available to customers from all regions.

**Debug:** If you set this to yes, then debug messages will be logged and saved in the cache folder in your Joomla root directory.

![purolator2](https://raw.githubusercontent.com/j2store/doc-images/master/shipping-methods/purolator/purolator_02.jpg)

![purolator3](https://raw.githubusercontent.com/j2store/doc-images/master/shipping-methods/purolator/purolator_03.jpg)
