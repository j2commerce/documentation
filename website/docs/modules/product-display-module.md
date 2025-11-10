---
description: J2Commerce (formerly known as J2Store)
---

# Product Display Module

The module that helps you to display the products wherever you want on your site. Sometimes you would like to showcase Best-Selling products or Featured products on your site in a specific place. In this case, the product display module will do that.

**Purchase Module**

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Modules

![](/img/product-display-purchase.webp)

**Step 2:** Locate the Product Display module > click View Details > Add to cart > Checkout.

**Step 3:** Go to your My Downloads or My Account under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

![](/img/product-display-download.webp)

**Installation:** You can install this Product Display module using the Joomla installer. The following steps help you with a successful installation.

**Step 1:** In the Joomla admin, go to System > Install > Extensions

![](/img/product-category-installer-1.webp)

**Step 2**: Click on the Browse button and select the Product Display zip file you saved during the download process. You will receive a message of success once installed.

![](/img/product-category-download1.webp)

**Step 3:** Select Content > Site Modules > Products Display module

**Step 4:** Enable the plugin by clicking on the 'X'. It will turn into a checkmark.&#x20;

![](/img/product-display-enable.webp)

**Step 5:** Once it's enabled, click on the module to open it

## **Setting Up The Module Parameter**&#x20;

### **Module Tab**

![](/img/product-display-module-tab1.webp)

**Position:** Select the position location you want your chosen modules to appear on your website. For Example: If you want them to show on your Home Page, then where on the home page do you want them to appear?

### Menu Assignment Tab

![](/img/product-display-menu-ass-tab.webp)

**Module Assignment:**&#x20;

- **On All Pages:** Select this if you want your selected items to appear on all of the pages.

- **No Pages:**  Select this if you want your selected items to appear on none of the pages.

- **Only On Selected Pages:** Select this if you want your selected items to appear on specific pages that you select below in the Menu Selection

- **On All Pages Except Those Selected:** Select this if you want your selected items to appear on all pages except for the ones you select below in the Menu Selection

**Menu Selection:**&#x20;

**Assign to Menu Items:**

- &#x20;**All:** If you choose All, it will select all of the pages and you can remove the ones you don't want

- **None:** If you choose None, then you can select only the pages you want

### **Selection Options Tab:**

![](/img/selection-options-tab1.webp)

**Product Source:** There are four sources from which you could fetch and display the products. For example, if you would like to display the products from Tags, then choose Product Tags as your product source.

**Product Sort:** You can sort out the arrangement of the product by using this option. For example, if you would like to display the products based on SKU, then you can choose either SKU (A\_Z) or SKU (Z\_A).&#x20;

![](/img/selection-options-tab3.webp)



**Selection Based On:** This selection will change based on what you chose for the Product Source above.  For example: &#x20;

**Product Tags:**

![](/img/selection-options-tab-tags.webp)

If you have chosen Product tags as your product source, then you will have to select the tags here. Products under the selected tags here will be displayed on the frontend.&#x20;

**Category:**

![](/img/selection-options-category.webp)

If you have chosen the categories as your product source (to the above parameter), then you must select product categories here. Products under the selected categories here will be displayed on the frontend.

**Include Subcategory**

If you want to include sub-categories of the above selected categories, then set this option to YES.

**Subcategory level**

If you have enabled including subcategories, then you must have to choose the level of subcategories to include. For example, 3.&#x20;

**Selected Products:**

This option will be used only if you have chosen **Selected products** as your product source. The following steps should be done to add specific products to the module:

1. Click on Add products button.

   ![](/img/selection-options-products.webp)
2. The pop-up window will be displayed on the screen. In the pop-up window, check the box next to the product name.
3. After selecting the products, click on the set values button and close the pop-up window.
4. The products will be added. Save.

![](/img/selection-options-products1.webp)

You will now see the products you chose listed here.

![](/img/selection-options-products2.webp)

### **Layout Options Tab**

**Layout Options:**

![](/img/product-display-layout-tab1.webp)

**Layout:** Default: Card or Carousel.

**Sub Template:** Select the option, Bootstrap 5. Create alternate layouts for this module within your Joomla! template's `/html/mod_j2commerce_products` folder. The module will then pickup the new sub-template auto-magically.

**J2Store menu ID:**

Select J2Commerce menu ID for display products (Not required).  If you have at least one menu item with type as J2Store > Product list view, the links on the product will take the ID of that menu. If you don’t have a menu, then the link will use the non-sef url for the title and image on the product.

If you wants to use sef url, then create at least one menu item with type J2Store > Product list view and then choose this menu in this option.

**Max Number of Columns:** The maximum number of columns when displayed as a grid. Product items will flow into the next row when the number of items exceeds the number of columns. Set to 0 to disable grid layout. Ignore for carousels.

This tab has options to show/hide several things displayed on the module as per your wish. Refer to the screenshot below:

**Slider Navigation:** Slider navigation arrows

**Slider Pagination:** Slider pagination bullets

**Slider Scrollbar:** Slider scrollbar for navigation

**Slider Auto Play:** Enable auto-play of slides

**Product Settings:**&#x20;

![](/img/product-display-layout-tab2.webp)

**Show Title:** Select Yes if you want your show title to be displayed

**Link Titles:** Select Yes to link the product title to the product

**Show SKU:** Select Yes to show SKU in product view

**Show Introtext:** Select Yes to display the introtext

**Enable beforeDisplayContent Event for article:** Enable/Disable beforeDisplayContent Event for article

**Enable afterDisplayContent Event for article:** Enable/Disable afterDisplayContent Event for article

**Cart Block Settings:**

![](/img/product-display-layout-tab3.webp)

**Show Base Price:** Select Yes if you want to show the base price of products

**Show Tax Info:** Select Yes if you want to show tax info text in the product

**Show Special Price:** Select Yes if you want to display when there is an offer price

**Show Offer:** Select Yes if you want to show when there is an offer for the product that offer is displayed

**Show Stock:** Select Yes if you want to display how much inventory you have left

**Add to Cart:** Select Yes if you want to display add to cart button with option, without option, etc

**Show Only Icon Labels:** Select Yes if you want to show only icon labels for *add to cart* and *view details* buttons

**Product Image Settings:**

![](/img/product-display-layout-tab4.webp)

**Show Image:** Select Yes if you want to display or hide the product image

**Link Image:** Select yes to link the image to the product. When the image is clicked the user is taken to the product

**Image Type:** Select either the Main image or thumb image of the product you wish to display

**Image Width:** Set the image size in pixels. For instance 80

**Image Height:** Set the image height in pixels. For instance 80

**Position of the image:** Image can be positioned at the top, left or right of the cart block

**Default Image:** Select a default image to display when a product does not have an image

**Video Tutorial:** To configure the product display module, follow the video below:

[![Watch the video](https://img.youtube.com/vi/Pov6SPpQI_k/hqdefault.jpg)](https://www.youtube.com/watch?v=Pov6SPpQI_k)
