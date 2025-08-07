---
description: J2Commerce (formerly known as J2Store)
---

# Royal Mail Shipping

The plugin integrates J2Commerce with the Royal Mail Shipping Rates API to get shipping price quotes in real time.

To use this plugin, your store must use GBP (Great Britain Pound) currency, and your products need to be set up with weights and shipping dimensions.

> This plugin primarily works with Centimeter(cm) and Gram(g).

**Features**

1. Choose what Royal Mail services you want to offer customers.
2. Add extra costs to services, if you wish.
3. Pack items individually or use our built-in box packer to ship items in single or multiple package(s).

**Installation**

**Step 1:** Go to Extensions dropdown > Shipping Plugins > Royal Mail > Add to cart.&#x20;

![Royal Mail](<../../assets/purchase_1.webp>)

**Step 2:** Once you have purchased the plugin, you can find it in your My Downloads section. To find My Downloads, click on your icon in the top right corner > My Downloads > search for Royal Mail.&#x20;

![Royal Mail](<../../assets/download 1_1.webp>)

**Step 3:** Download the plugin: Click Available Versions > View Files (choose the more current version ) > Download.

![Royal Mail](<../../assets/download 2_1.webp>)

![Royal Mail](<../../assets/download 3_1.webp>)

**Step 4:** Install the plugin:  Go to System > Install > Extensions. Upload the files

![Royal Mail](<../../assets/install extension_1.webp>)

**Step 5:** Enable the plugin: There are two ways to do this. Choose whichever way is easier for you.

a) Go to System > Manage > Plugins. Search for the Royal Mail plugin and make sure it has a checkmark next to it.

b) Go to your J2Commerce dashboard > Setup > Shipping Methods and enable RoyalMail Shipping for J2Commerce. (B is shown in the image below)

![Royal Mail](<../../assets/plugin enabled_1 (1).webp>)

**Step 6:** Click on View to open the plugin and configure it.

![Royal Mail](<../../assets/plugin enabled_2.webp>)

**Setup and Configuration** **Parcel packing method:** There are two packing methods with Royal Mail; each affects the parcels you send to the plugin for a quote.

**Pack items individually:** Each item in your cart will be sent to the plugin individually. Quotes for all items will be combined for the final cost.

**Box-Packing:** The box packer included with this shipping method lets you group items into packages for which you define height, width, length, empty box weight, and maximum box weight. The packing is mainly volume-based, but does also considers item sizes.

**Services:** This parameter controls the services and rates that you offer for your customers. Choose the services from the list of available services.

**Weight and Length unit:** The weight unit must be Gram (g) and the length unit must be Centimeter (cm).

**Tax Class:** If you would like to charge tax for shipping, choose the tax profile here.

**GeoZone:** Choose geo-zone and restrict the availability of this shipping method to the countries/zones in that geo zone. Choose All to make this shipping method available to customers from all regions.

**Handling Cost:** If you would like to charge an additional charge (surcharge) or handling fee, enter your cost of the charge in numbers.

**Debug:** Set YES to enable debug mode. Enabling debug mode will log the debug messages in a file and save them in the cache folder of your Joomla root directory.

DO NOT enable debug mode in the live site.

![Royal Mail](<../../assets/configure_1.webp>)

**Step 7:** Once you have configured your plugin, go to your product that you wish to install Royal Mail to.&#x20;

Go to Articles > open the product > J2Commerc (J2Store Cart) tab > Shipping. Now you can enter the shipping parameters for that specific product.

![Royal Mail](<../../assets/shipping_1.webp>)

![shipping rates](https://raw.githubusercontent.com/j2store/doc-images/master/shipping-methods/royal-mail-shipping/royal-shipping-rates.png)
