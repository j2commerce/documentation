# Canadapost shipping plugin

**Requirements**

- with PHP 8.1.0 +
- Joomla! 4.x/ Joomla! 5.x +
- J2Commerce / J2Store 4.x +



**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Shipping Plugins

**Step 2:** Locate the Canada Post Shipping App > click View Details > Add to cart > Checkout.&#x20;

![](/img/purchase-2.webp)

**Step 3:** Go to your My Download under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

![](/img/1download2.webp)

**Installation:** You can install this Canada Post shipping plugin, using Joomla installer. The following steps help you for successful installation.

**Step 1:** In the Joomla admin, go to System > Install > Extensions

![](/img/1canada-post-installer-1.webp)

**Step 2:** Click on the Browse button and select Canada Post shipping zip file where you saved it.

![](/img/1canada-post-download.webp)

**Step 3:** In the Joomla admin, go to System > Manage > Extensions

![](/img/1canada-post-installer-2.webp)

**Step 4:** Search for the app and enable it.

![](/img/1canada-post-enable-1.webp)

**Step 5:** Select J2Commerce > setup > shipping methods

**Step 6:** Locate the Canada Post Shipping App and click View to begin customizing it.

![](/img/1canada-post-setup.webp)

Before you begin setting up the parameters in the app, you will need your API Keys. Follow the steps below to access your API Keys, and Customer Number

#### How to Register with Canada Post and Obtain Your API Key:&#x20;

Sign in or Sign up by going to their main website [here](https://www.canadapost-postescanada.ca/cpc/en/): If you are already registered with Canada Post, then Sign in to the Canada Post website using your registered Username and Password.

Don’t have an account yet? Sign up now.

**Join the Developer Program:**&#x20;

Once you’ve signed in to their website, select Join Now on the main Developer program page. Read and accept the terms and conditions of the Program to become a member.

**Get your API keys:**&#x20;

![](/img/1api.webp)

Once you are logged in to your account, go to this [link](https://www.canadapost-postescanada.ca/information/app/drc/registered?execution=e2s1) to get your API Keys. You should see the API keys that are displayed on the main Developer Program page. These API keys are unique codes, used to access Canada Post web service and Postmen API. Note down the API keys (one for development and one for production).

#### **Configuration:**&#x20;

![](/img/1canada-post-parameters1.webp)

**API Username:** Your CanadaPost username

**API Password:** Your CanadaPost password

**Customer Number:** The customer number provided by Canada Post

\* Make sure you are using the same parameters you used when setting up your store in the backend.  If you need help remembering how to do that, visit the Set-up > Configuration document.

1. Make sure that you have set the Default Weight Class to Kilogram (KG) or Pound (LB) in your Store Profile
2. Make sure that you entered your Postal Code/Zip correctly in your Store Profile
3. Make sure that you have set the Dimensions and Weight fields in your products correctly
4. Make sure that you have set the 'Enable Shipping' to Yes in your products (under articles)

Example below:

#### Parameters:

![](/img/1canada-post-parameters2.webp)

**Canada Post Service:** Choose the services provided by Canada Post to display in checkout.

> NOTE: This is a mandatory option for version 3.2.24.Not selecting the service will make the shipping method unavailable.

**Handling cost:** You can enter an amount here (without any symbols or letters). It will be added as a handling cost in addition to the shipping cost.

**Show delivery time:** Set this to Yes, if you want to show the expected delivery time to the customers.

**Test mode:** If you would like to test the API, set this to Yes. Otherwise, you can set this to No.

**Weight Unit:** Valid Units are: Kilogram (KG), Pound (LB).

> IMPORTANT: Make sure to set your default weight class to either KG or LB in your store profile. All your products should be using the same weight class

**Dimension Unit:** Choose the dimension type. ie: inch, centimeters, millimeters. All your products should be using the same dimension class

**Tax Class:** If you want to charge tax for shipping cost, choose a tax class here. Otherwise, leave this field empty/do not select any option.

**Geozone:** You can select a geozone and restrict the availability of this shipping method to the countries/zones in that geozone. Leave empty/unselected for making this shipping method available to customers from all regions.

**Debug:** If you set this to Yes, then debug messages will be logged and saved in the cache folder in your Joomla root directory. Set this to No in Live websites.
