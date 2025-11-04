---
slug: /advanced-checkout/advanced-checkout-guide
description: J2Commerce (formerly known as J2Store)
---

# Advanced Checkout

## Download and Install

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Apps

**Step 2:** Locate the Advanced Checkout App > click View Details > Add to cart > Checkout.

**Step 3:** Go to your My Downloads or My Account under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

**Installation:** You can install this Advanced Checkout App using the Joomla installer. The following steps help you with a successful installation.

**Step 1:** In the Joomla admin, go to System > Install > Extensions

![](/img/product-category-installer-1.webp)

**Step 2**: Click on the Browse button and select the Advanced Checkout zip file you saved during the download process. You will receive a message of success once installed.

![](/img/product-category-download1.webp)

**Step 3:** Select J2Commerce > Apps > Advanced Checkout

**Step 4:** Enable the app by clicking on the 'X'. It will turn into a checkmark.

![](/img/advanced-checkout-enable.webp)

## Setting up the Menu

Before you set up the parameters, you need to set up the menu for it.

**Step 1:** Go to Menu > Main Menu > Checkout

![](/img/advanced-checkout-checkout-menu.webp)

**Step 2:** Switch the Template Style from the -Use-Default- to Cassiopeia-Default

![](/img/advanced-checkout-checkout-menu1.webp)

## Setting up the Modules

### Login Module

Go to Content > Site Module > New

![](/img/advanced-checkout-login-new.webp)

**Module Tab:**

![](/img/advanced-checkout-login-module1.webp)

**Title:** Name the module, Login.

**Position:** Type **j2c-login** in the dropdown.&#x20;

**Login Redirection Page:** Select the location you wish to redirect the customers after loggin in. In many cases, it's the Checkout Page.

**Logout Redirection Page:** Select the location you wish to redirect the customers after they complete their order.

**Menu Assignment Tab:**

![](/img/advanced-checkout-login-menu.webp)

**Module Assignment:** Select Only on the pages selected

**Menu Selection:** Select Checkout

**Advanced Tab:**

![](/img/advanced-checkout-login-advanced.webp)

**Layout:** Select Sidebar

**Module Style:** Select None

The Login Module is complete. Make sure it's enabled by clicking on the 'x' and turning it into a checkmark. It will now show up in the checkout cart.

![](/img/advanced-checkout-login-enable.webp)

### Advanced Cart Module

Follow the same steps from creating the Login Module.&#x20;

Go to Content > Site Module > New

**Module Tab:**

![](/img/advanced-cart-module-tab1.webp)

**Title:** Name the module, J2Commerce Advanced Cart

**Position:** Type **j2c-checkout-sidebar** in the dropdown

**Loading Indicator:** The Bootstrap 5 spinner class is used when reloading the advanced cart contents.

**Store Menu Link:** Advanced Cart J2Commerce ajax-based cart module.

**Shopping Cart Menu Link:** Select the menu item for the shopping cart page.

**Checkout Menu Link:** Select the menu item for the checkout page.

**Show Payment Icons:** Select yes to enable payment icons (helps add additional trust endicia to the checkout process).

**Select Payment Icons:** Select all of the payment options you want to offer



**Menu Assignment Tab:**

![](/img/advanced-cart-menu-tab1.webp)

**Module Assignment:** Only on the pages selected

**Menu Selection:** Select 'Checkout'

**Settings Tab:**

![](/img/advanced-cart-settings-tab1.webp)

**Show Shipping Progress:** Select yes to show the shipping progress indicator in the modal cart.

**Free Shipping Amount:** Enter the minimum amount needed to qualify for free shipping. No currency sign - only number value. (No free shipping message will appear if left empty)

**Show Upsell Options:** Future option coming in a later version.

**Show Product SKU:** Select 'Yes' to display the product SKU.

**Show Quantity Field:** Select yes to display the quantity field. Select NO if you are selling digital products or other items that don't require quantities over 1 per item.

**Show Product Image:** Select yes to display the product's thumbnail image.

**Show Base Price:** Select yes to display the product's base price when a lower (sale) price is offered.

**Show Coupon Form:** Show coupon form in modal cart?

**Show Gift Card Form:** Show gift card form in modal cart?

**Show Subtotals:** Select yes to show cart subtotals.



**Advanced Tab:**

![](/img/advanced-cart-advanced-tab1.webp)

**Layout:** Select Checkout

**Module Style:** Select None

## Setting up the Checkout Page

**Step 1:** Go back into the Advanced Checkout App and open it.&#x20;

![](/img/advanced-checkout-setup1.webp)

### Basic Tab

![](/img/advanced-checkout-basic1.webp)

**We have broken down each section below.**

**Enable Store Icons:** Set this to no if you wish to use your own icon set. (You will need to replace the store icons with your own via layout overrides.)

**Enable Checkout Header:** If set as Yes, then you can add a custom header at the top of your checkout page. The location to attach the header image can be found on the Style tab.

**Enable Checkout Breadcrumbs:** The breadcrumbs allow the customer to know which step during checkout they are on and how many more steps they need to complete.

![](/img/advanced-checkout-breadcrumbs.webp)

**Enable Checkout Steps:** Selecting Yes, will enable the previous steps to show up at the top of each page, allowing the customer to verify the information is correct or edit the previous page.

![](/img/advanced-checkout-steps.webp)

**Phone 1:** Customer service or general company phone number used in disclaimer text and checkout footer.

**Top Text:** Add any needed text to the top of the checkout. Use this sparingly as anything that is not critical to the conversion of the sale will most likely hurt it.

![](/img/advanced-checkout-basic-settings3.webp)

**Bottom Text:** Add any needed text to the bottom of the checkout. Usually needed if the site needs to display a site-wide disclaimer.

![](/img/advanced-checkout-basic-settings2.webp)

### Style Tab

![](/img/advanced-checkout-style2.webp)

**Enable Container Class:** Select Yes to enable the Bootstrap 5 container element on the checkout and confirmation pages. Use this if your Cassiopeia template is set to Fluid layout and you wish to center the checkout with the Bootstrap defined max-width.

**Primary Color:** Select the primary (main) color to match your site template style.

**Secondary Color:** Select the secondary color to match your site template style.

**Primary Button Color:** This is the color for the main checkout button on each page

**Sale Badge Color:** Select the badge color for the 'Save X%' badge that displays after discounted prices. Select a darker contrasting background color as the text is white.

**Body Text Color:** Select the text color you wish to use for the checkout body.

**Header Background:** Select the background color you wish to use for the top header of the checkout page. If your logo is dark, use a white or light colored background.

**Header Text Color:** Select the text color you wish to use. Make sure it contrasts with the background color for accessibility.

**Footer Background:** Select the background color you wish to use for the bottom footer of the checkout page.

**Footer Text Color:** Select the text color you wish to use. Make sure it contrasts with the background color for accessibility.

**Checkout Header:** 1900px x 100px png, jpg, webp images to use for the checkout header.

**Favicon Image:** 64px x 64px png, jpg, webp images to use for the browser tab icon (in place of the default Joomla! icon.

The screenshot below shows an example of the Header and Favicon

![](/img/favicon-header2.webp)

**Custom CSS:** Add any custom CSS for the checkout page. DO NOT INCLUDE THE \< STYLE > TAGS. The default for the header is 25px high. You can customize the height by changing the pixles and add additional CSS code to customize the cart

![](/img/advanced-checkout-style3.webp)

### Confirmation Page Tab

![](/img/advanced-checkout-confirmation3.webp)

**Enable Address Map:** Select Yes to display a map of the customer's shipping address on the confirmation page. You will need to create and enter your Google Developer Console API in the field below).

![](/img/advanced-checkout-confirmation4.webp)

**Google API Key:** Enter your Google API key here. To obtain an API Key follow the instructions at the end of this document.

**Contact Page Link:** Select the Contact Page menu link to ensure customers have an easy way to contact you if they encounter issues with their order.

**My Profile Link:** Select the menu link for the J2Commerce My Profile page. Selecting the menu link will enable a button option for the customer to visit their profile page after a successful order (confirmation page).

**Successful Order Message:** Enter the text to display for the message displayed on successful order confirmations. (Can be language strings as well.)

**Failed Order Message:** Enter the text to display for the message displayed on failed order confirmations. (Can be language strings as well.)

*The screenshot below shows a successful Confirmation page on the frontend*

*If the order is unsuccessful, then the map will disappear, and the customer will see the Failed Order Message you entered*

![](/img/advanced-checkout-confirmation5.webp)

## Template Settings

Go to System > Site Template Styles

![](/img/advanced-checkout-template.webp)

Click on Cassiopeia - Default to open it

![](/img/advanced-checkout-cassiopeia.webp)

Open the Advanced tab. Make sure Brand is turned off and Layout is on Fluid. Save and Close

![](/img/advanced-checkout-cassiopeia-advanced.webp)

## Frontend&#x20;

The image below shows how your cart will appear before installing the Advanced Cart Module.&#x20;

![](/img/advanced-checkout-frontend1.webp)

The image below shows how your cart will appear after installing the Advanced Cart Module.&#x20;

![](/img/advanced-checkout-frontend2.webp)

## How to Obtain Your Google API Key

**Step 1:** Visit [https://console.cloud.google.com/apis/dashboard](https://console.cloud.google.com/apis/dashboard)&#x20;

**Step 2:** Select Create project&#x20;

![](/img/google-api-2.webp)

**Step 3:** Name your project and select the location > Create

![](/img/google-api-3.webp)

**Step 4:** Select 'Enable APIS and Services'&#x20;

![](/img/google-api-1.webp)

**Step 5:** Type Geocoding in the search bar and select Geocoding API and Maps Javascript API. You have to select them and follow step 5 one at a time.

![](/img/google-api-4.webp)

![](/img/google-api-5.webp)

**Step 6:**  Make sure to enable Key Restrictions > Websites for your API Key to prevent unauthorized use.

**Step 7:** Select Save and Continue > Enter your Credit Card for billing purposes
