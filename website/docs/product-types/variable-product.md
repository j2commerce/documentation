---
description: J2Commerce (formerly known as J2Store)
---

# Advanced Variable Product

## Introduction <a href="#introduction" id="introduction" />

An Advanced Variable is a complex product type. It lets you define variations of a product where each variant may have different attributes, e.g. SKU, price and stock level.

***Note: Since this is a complex product type, it might take some time (quite some time) to create it. You will need a lot of patience and also require quite some work. So be prepared.***

A perfect example for an Advanced Variable product is: T-shirts. T-shirts always come with a size and color combination. Example: Small-Blue, Small-Red, Small-Green.

You will be adding a price, SKU and stock PER combination.

**NOTE:** If your product does not require a combination or stock / price management for each variation, then a simple product will suit your requirements.

### How variable products work: <a href="#how-variable-products-work" id="how-variable-products-work" />

Variable-type product uses a Matrix algorithm to generate combinations. Your product doesn't have to offer the same options as a flex variant.  For example, a Gray shirt may only come in XL, and all of the other colors don't offer the size XL.&#x20;

Example:

Say you have two options: Size, Color

Size has: Small, Medium

Color has: Red, Blue

This forms a 2x2 matrix - 4 possible combinations

Small - Red

Small - Blue

Medium - Red

Medium - Blue

If we add just one more size (Large) and one more color (Green), this will make a 3x3 matrix - meaning 9 combinations

### When to use Variable product type: <a href="#when-to-use-variable-product-type" id="when-to-use-variable-product-type" />

- Only when you want to manage inventory at the variant level. Example: You want to maintain a stock for Small - Blue, Small - Red. (As you can see, when you sell a T-Shirt, you naturally maintain the stock based on the Size and the Color… you cannot maintain an inventory just by Size or Color)
- Only when you want to set different prices for different variants (Example: Small - Blue costs $10, Medium - Red costs $15)

### Disadvantages of Variable Product Type: <a href="#disadvantage-of-variable-product-type" id="disadvantage-of-variable-product-type" />

When you change any option values or want to introduce a new variant, then the entire combination (matrix) changes. So you will have to re-generate the entire variants, and set the prices.

### How can I overcome this disadvantage? <a href="#how-can-i-overcome-this-disadvantage" id="how-can-i-overcome-this-disadvantage" />

In the latest versions of J2Commerce, we introduced a new product type: [Flexible variable product](https://docs.j2commerce.com/catalog/flexible-variable)

As the name suggests, it is very flexible and is based on the Cartesian set algorithm. So you can add, remove a variant anytime without re-generating the entire combinations.

## Purchase the Product Type

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Apps

**Step 2:** Locate the Advanced Variable Product App > click View Details > Add to cart > Checkout.

**Step 3:** Go to your My Downloads under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

## Install the Product Type

Go to System > Install > Extensions > Install the the Product Type

![](/img/product-category-installer-1.webp)

## Enable the Product Type

Select J2Commerce > Apps > Advanced Variable Product

Enable the app by clicking on the 'X'. It will turn into a checkmark

![](/img/advanced-var-enable.webp)

## Creating an Advanced variable Product

Content > Articles > New

Make sure you are in the appropriate category first, or assign the 'Parent' category in the 'Content' page of the new article.

![](/img/variant-start0.webp)

**Step 2:**

- Enter the name of your product. Leave the alias blank
- Click on J2Commerce (J2Store Cart) tab
- Since you are creating an article, you need to tell that the article should be treated as a product. So, select ‘Yes’.
- Select the type of product, i.e., ‘Variable’.
- Now, click the ‘Save and Continue’ button.

![Article  manager](/img/variant-start1.webp)

Now you have to set all of the parameters for each section for the product cart.

### General <a href="#general" id="general" />

![General tab](<../../assets/variable product-general-tab2.webp>)

- Visible in Storefront: First, select whether the product is to be displayed in front of the store. If it is, set the option to ‘Yes’
- Brand or Manufacturer: Select the brand or manufacturer of the product from the available list
- Vendor: Select the vendor from whom the product is available for purchase - This is J2Commerce PRO feature
- Tax Profile: Specify whether the product is taxable, and if it is, select the tax profile relevant to the product
- Cart button text: The unique text for the cart button could be mentioned here.

### Images <a href="#images" id="images" />

![Adding images](<../../assets/variable product-image-tab2.webp>)

This feature is available for native Joomla articles and in J2Commerce Product Layouts

To display the thumbnail, main and additional images in Joomla articles, you should first configure the Content - J2Commerce plugin in Plugin Manager. Otherwise, you won't see these images in your products.

Let's assume that a customer would like to purchase a car. Now, car images need to be loaded in this tab.

- Main Image: The main image will be a general photo image of the car, which has to be uploaded by clicking on the ‘Select an image’ button and selecting the appropriate image from the files.
- Thumbnail Image: The thumbnail image would be something that represents the original product, but it would be a much smaller one to fit into a button, which will be shown in the cart. By seeing this, the customer will understand that his product is displayed on the button and will click the button to see more details about the car.
- Additional Images: Additional images help the customer to know more details about the car, which will show the car view from many angles, and the customer will understand it clearly how it looks, what the technical details of the car are, the colour, and so on.

### Variants <a href="#variants" id="variants" />

Variants are products of the same type and nature but with different attributes. For e.g., consider a Laptop of a particular brand with certain attributes, say

- Color - Metallic Grey
- Screen - 15.6 inches
- RAM - 2 GB
- HDD - 500 GB
- SKU - MTG8620

and so on. This is a variant of the particular brand. Now, the same product with the same brand will be another variant with some attributes changed, like

- Color - Black
- Screen - 15.6 inches
- RAM - 2 GB
- HDD - 500 GB
- SKU - BLK8640

For both items, the brand and model name may be the same, but the attributes like color and SKU differ. These are two variants of a particular laptop brand.

- A variant defines how this product differs from other products of the same type
- It may be SKU no, price, stock level, or color

Let's discuss it with some image illustrations:

**Step 1:** If you select ‘Size’ from the list, your screen will look like this. Then click Add Option. Repeat this for each option.

![](/img/variant-setup0.webp)

You can see the option you have selected from the list added below. Now, SAVE to activate the next step.

![](/img/variant-setup.webp)

**Step 2:** Now you have to choose the different values inside each option. Select the Set Option Values

![](/img/variant-setup2.webp)

You can see ’**Set Values**’ near the option name **Size** and click it. You will get a pop-up window to add attributes as illustrated below:&#x20;

**Step 3:** Select the color from the drop down menu > create Option > Repeat for each color available for the product > Save.

**Step 4:** You can arrange the order you wish for the colors to appear.

![Setting option values](/img/variant-setup4.webp)

Once you are done, save changes and close the pop-up window to get back to the main window.&#x20;

**Step 5:** Repeat steps 2-4 for each option available. ie: color, size, etc...

**Step 6:** Now that you have set the values. It's time to generate the variants. Make sure you haven't missed any values before you generate, because if one is missing, then you have to delete the generated variants, add the value that was missing and click Generate again.&#x20;

![](/img/variant-setup5.webp)

The button you have clicked for variant generation will adjust itself to show you a message, ‘Generating variants… " Please wait.

**Step 7:** Before you set the parameters for each variant, select which variant you want to be featured on the frontend. This is extremely important. One variant has to be selected.

![List of variants](/img/variant-setup6.webp)

**Step 8:** If you want to edit the parameters of the variants, click the down arrow button, and you will get a screen like below:

![Open all variants](/img/variant-details-3.webp)

**SKU:** Add the SKU number for this particular variant. This is very important for your inventory and future bulk changes.

**Price:** This is the price the customers will see

**Advanced Pricing:** You can set special discounted pricing for specific groups. ie: VIPs, Employees, etc.

**Image:** You can add a photo of each variant so the customer can see what it looks like, as well as clicking "Thumbnail" and it can show up on the invoice or in the shopping cart.

**Enable Shipping:** Set this to Yes if you ship your products

**Weight & Length:** You can set the shipping parameters for each variant independently

**Manage Stock:** Set this to Yes, so you can keep control of your supply amount. This will allow you to have more control over your inventory that is available to customers.

**Stock Quantity:** How many do you have left in stock

**Allow Backorders:** Do you want to allow customers to be able to place an order when the stock says 0.

**Stock Status:** Is the item in stock or out of stock

If a variant becomes out of stock temporarily, you can select "out of stock", and the quantity is set as '0'. This will now show "Out of stock" instead of "Add to cart".

If any one of your variants is no longer available and you want to remove that variant from displaying in the frontend, you could do so by clicking on the delete icon.&#x20;

***Caution: Be extremely careful with deleting a variant. Once you delete it, you can't add it back without having to delete all variants and start all over.  It's not like a flex variant.***&#x20;

### Filters <a href="#filters" id="filters" />

Filters are certain attributes that help narrow the search for a particular product.

For e.g., assume that a customer searches for purple t-shirts in the store. Now, the product filter is set as color> purple, to narrow the search. See the image below:

![Filters](/img/variant-filters.webp)

Now the cart will display only the purple t-shirts.

### Relations <a href="#relations" id="relations" />

![Relations](<../../assets/variable product-relations-variants.webp>)

- In this tab page, relations are set for Upsells and Cross-sells
- **Upsell:** Is to get the customer to spend more money – buy a more expensive model of the same type of product considered for purchase.
- **A cross-sell:** Is to get the customer to spend more money by adding more products from other categories, additionally, along with the product intended for purchase.
- **Example:** The terms cross-sell and upsell are often used interchangeably because, let’s face it, this gets confusing. Say the customer is viewing a Laptop with 2GB/500GB for $500. 4GB/500GB > $550 - Upsell, same product family that are more expensive. 4GB/1TB > $700 - Upsell, same product family, more expensive. Laptop Bag > $25 - Cross-sell, related product = additional sell

Custom fields/settings from applications will be displayed in this tab.

### Apps <a href="#apps" id="apps" />

The 'user group' app allows you to add a user to a specific user group based on the product that they purchased, so each product could essentially give somebody access to a certain area of the site simply by adding the add to user group app and opening up a product in the app section and then selecting the user group you wish them to be added to when the person purchases that product

![Apps section](<../../assets/variable product-app-variants2.webp>)

In this tab, you can add third-party tools or plugins that are available to enhance the J2Commerce functionality, like adding additional fields, applications, functions, or features.

### Video Tutorial: <a href="#video-tutorial" id="video-tutorial" />

Here is a video that could help you create a product with variants:

[![Watch the video](https://img.youtube.com/vi/etsNdfUYrgw/hqdefault.jpg)](https://www.youtube.com/watch?v=etsNdfUYrgw)

To know how to manage inventory for variable products, follow the instructions given here:

[![Watch the video](https://img.youtube.com/vi/8givojFFolM/hqdefault.jpg)](https://www.youtube.com/watch?v=8givojFFolM)

[![Watch the video](https://img.youtube.com/vi/ipfyi2EtyMo/hqdefault.jpg)](https://www.youtube.com/watch?v=ipfyi2EtyMo)
