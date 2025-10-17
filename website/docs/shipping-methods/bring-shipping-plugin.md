---
description: J2Commerce (formerly known as J2Store)
---

# Bring Shipping Plugin

**Introduction:** Integrates J2Commerce with Bring, a popular shipping service in the Nordic area.

**Requirements**

- with PHP 8.1.0 +
- Joomla! 4.x/ Joomla! 5.x +
- J2Commerce / J2Store 4.x +

#### How to obtain your PID Key number:

You will need this information to activate the app once installed on the backend of your site. You can get the PID (Identification key ) from here: [www.mybring.com/](http://www.mybring.com/)  &#x20;

To get your "PID" (Identification Key) on [https://developer.bring.com/api/shipping-guide\_2/](https://developer.bring.com/api/shipping-guide_2/), you must have an active invoice agreement with Bring and be registered. Once you have an account, the API User ID is your username, and you can find the API Key by navigating to the API page within the MyBring settings. 

#### **Step-by-step guide:**

1. **Register**: If you don't already have an account, register on their website.

2. **Ensure you have an invoice agreement**: You must have an active invoice agreement with Bring to proceed.

3. **Log in to MyBring**: Log in to your account on [https://www.mybring.com/](https://www.mybring.com/).

4. **Navigate to API settings**: Find and go to the API settings page within your account.

5. **Locate and copy your API Key**: On the API page, you will find your API User ID (which is your username) and the API key. Copy the API key.

6. **Enable booking access**: Ensure you enable the booking API access on the same page to be able to perform bookings. 

![](/img/bring-api.webp)

#### **Download App:**

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Apps

![](/img/bring-purchase.webp)

**Step 2:** Locate the "Add to Bring Shipping" App > click "View Details"> Add to cart > Proceed to Checkout.&#x20;

**Step 3:** Go to your My Download under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

![](/img/bring-download.webp)

![](/img/bring-download-1.webp)

**Installation:** You can install this Bring shipping plugin using the Joomla installer. The following steps help you with a successful installation.

**Step 1:** In the Joomla admin, go to System > Install > Extensions

![](/img/bring-ext-install.webp)

**Step 2:** Click on the Browse button and select the Bring Shipping zip file

![](/img/bring-man-install1.webp)

Step 3: In the Joomla admin, go to System > Manage > Extensions

![](/img/bring-man-install.webp)

**Step 6:** Search for the app and enable it.

![](/img/bring-enable.webp)

**Step 7:** Select J2Commerce >setup > shipping methods

Step 8: Locate the Bring Shipping App and click View to begin customizing it.

![](/img/bring-setup.webp)

#### **Parameters:**

1. License Key: Without this key, the parameters will not work
2. PID Key: Without this key, the parameters will not work.
3. From Postal Code - Enter the From (Origin) postal code. The postal code is the place from which the goods will be shipped.
4. Handling Cost - If you want to add handling cost for your shipping, enter your handling cost.
5. Display Delivery Time - This option used to display Delivery Date/time in Checkout page.
6. Services - Choose product Services for display in the Checkout page.
7. Tax Class - If you want to add a tax rate for your shipping, select a tax profile.
8. Geozone - By selecting a geozone here, you can restrict this Shipping method from showing to customers from only that geo-region. Choose All geozones to show this method to all customers.
9. Debug: - Enable/ Disable Log file for Debug.

![](/img/bring-parameters.webp)

**Support:** Still have questions? You can reach us at [https://www.j2commerce.com/support](https://www.j2commerce.com/support)

Thank you for using our extension.
