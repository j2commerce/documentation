---
description: J2Commerce (formerly known as J2Store)
---

# Variable product

## Introduction <a href="#introduction" id="introduction"></a>

Variable is a complex product type. It lets you define variations of a product where each variant may have different attributes, e.g. SKU, price and stock level.

_**Note: Since this is a complex product type, it might take some time (quite some time) to create it. You will need a lot of patience and also require quite some work. So be prepared.**_

A perfect example for a variable product is: T-shirts. T-shirts always come with a size and colour combination. Example: Small-Blue, Small-Red, Small-Green.

You will be adding a price, SKU and stock PER combination.

**NOTE:** If your product does not require a combination or stock / price management for each variation, then a simple product will suit your requirements.

### How variable products work: <a href="#how-variable-products-work" id="how-variable-products-work"></a>

Variable type product uses a Matrix algorithm to generate combinations.

Example:

Say you have two options: Size, Colour

Size has: Small, Medium

Colour has: Red, Blue

This forms a 2x2 matrix - 4 possible combinations

Small - Red

Small - Blue

Medium - Red

Medium - Blue

If we add just one more size (Large) and one more colour (Green), this will make a 3x3 matrix - meaning 9 combinations

### When to use Variable product type: <a href="#when-to-use-variable-product-type" id="when-to-use-variable-product-type"></a>

* Only when you want to manage inventory at the variant level. Example: You want to maintain a stock for Small - Blue, Small - Red. (As you can see, when you sell a T-Shirt, you naturally maintain the stock based on the Size and the Colour… you cannot maintain an inventory just by Size or Colour)
* Only when you want to set different prices for different variants (Example: Small - Blue costs $10, Medium - Red costs $15)

### Disadvantage of Variable Product Type: <a href="#disadvantage-of-variable-product-type" id="disadvantage-of-variable-product-type"></a>

When you change any option values or want to introduce a new variant, then entire combination (matrix) changes. So you will have to re-generate the entire variants, and set the prices.

### How can I overcome this disadvantage ? <a href="#how-can-i-overcome-this-disadvantage" id="how-can-i-overcome-this-disadvantage"></a>

In the latest versions of J2Commerce, we introduced a new product type : [Flexible variable product](https://docs.j2commerce.com/catalog/flexible-variable)

As the name suggests, it is very flexible and is based on the cartesian set algorithm. So you can add, remove a variant anytime without re-generating the entire combinations.

## Creating a variable product <a href="#creating-a-variable-product" id="creating-a-variable-product"></a>

Start by creating a 'New' Article. Go to Content > Article > New.

Name your product and then go to the J2Commerce (J2Store Cart) tab. Select 'Yes' to Treat as a Product and in the dropdown menu select 'Advanced Variable'.

### General <a href="#general" id="general"></a>

![General tab](<../../assets/variable product-general-tab2.webp>)

* Visible in Storefront: First, select whether the product is to be displayed in front of the store. If it is, set the option to ‘Yes’
* Brand or Manufacturer: Select the brand or manufacturer of the product from the available list
* Vendor: Select the vendor from whom the product is available for purchase - This is J2Commerce PRO feature
* Tax Profile: Specify whether the product is taxable, and if it is, select the tax profile relevant to the product
* Cart button text: The unique text for the cart button could be mentioned here.

### Images <a href="#images" id="images"></a>

![Adding images](<../../assets/variable product-image-tab2.webp>)

This feature is available for native Joomla articles and in J2Commerce Product Layouts

To display the thumbnail, main and additional images in Joomla articles, you should first configure the Content - J2Commerce plugin in Plugin Manager. Otherwise, you won't see these images in your products.

Let's assume that a customer would like to purchase a car. Now, car images need to be loaded in this tab.

* Main Image: The main image will be a general photo image of the car, which has to be uploaded by clicking on the ‘Select an image’ button and selecting the appropriate image from the files.
* Thumbnail Image: The thumbnail image would be something that represents the original product, but it would be a much smaller one to fit into a button, which will be shown in the cart. By seeing this, the customer will understand that his product is displayed on the button and will click the button to see more details about the car.
* Additional Images: Additional images help the customer to know more details about the car, which will show the car view from many angles, and the customer will understand it clearly how it looks, what the technical details of the car are, the colour, and so on.

### Variants <a href="#variants" id="variants"></a>

Variants are products of the same type and nature but with different attributes. For e.g., consider a Laptop of a particular brand with certain attributes, say

* Colour - Metallic Grey
* Screen - 15.6 inches
* RAM - 2 GB
* HDD - 500 GB
* SKU - MTG8620

and so on. This is a variant of the particular brand. Now, the same product with the same brand will be another variant with some attributes changed, like

* Colour - Black
* Screen - 15.6 inches
* RAM - 2 GB
* HDD - 500 GB
* SKU - BLK8640

For both the items, the brand and model name may be the same, but the attributes like colour and SKU differ. These are two variants of a particular laptop brand.

* A variant defines how this product differs from other products of the same type
* It may be SKU no, price, stock level or colour

Let's discuss it with some image illustrations:

![Adding variants](<../../assets/variable product-adding-variants2.webp>)

If you select ‘Size’ from the list, your screen will look like this:

![Saving variants](<../../assets/variable product-adding-variants-size.webp>)

You can see the option you have selected from the list added below. Now, SAVE the form to proceed.

![Click on set option values](<../../assets/variable product-variant-options2.webp>)

You can see ’**Set Values**’ near the option name **Size** and click it. You will get a pop-up window to add attributes as illustrated below:

![Setting option values](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/variable-product/var-pro-set-opt-val.png)

Once you are done, save changes and close the pop-up window to get back to the main window. Now you have set the values for the variants to be generated. Why wait? Just go and generate the variants like this:

![Variable](<../../assets/variable product-generating-variants2.webp>)

The button you have clicked for variant generation will adjust itself to show you a message, ‘Generating variants… " Please wait.

And that’s it. You have your variants generated! Wonder how? Just check the image below for a surprise…

![List of variants](<../../assets/variable product-generating-variants3.webp>)

If you want to edit the properties of the variants, click the open all button, and you will get a screen like below:

![Open all variants](<../../assets/variable product-generating-variants4.webp>)

Now you know how to deal with variants, options, attributes, properties and how to edit them.

### Filters <a href="#filters" id="filters"></a>

Filters are certain attributes that help narrow the search of a particular product.

For e.g., assume that a customer searches for purple t-shirts in the store. Now, the product filter is set as colour > purple, to narrow the search. See the image below:

![Filters](<../../assets/variable product-filters-variants (1).webp>)

Now the cart will display only the purple t-shirts.

### Relations <a href="#relations" id="relations"></a>

![Relations](<../../assets/variable product-relations-variants.webp>)

* In this tab page, relations are set for Upsells and Cross-sells
* An upsell is to get the customer to spend more money – buy a more expensive model of the same type of product considered for purchase.
* A cross-sell is to get the customer to spend more money by adding more products from other categories, additionally, along with the product intended for purchase.
* Example: The terms cross-sell and upsell are often used interchangeably because, let’s face it, this gets confusing. Say the customer is viewing a Laptop with 2GB/500GB for $500.4GB/500GB-> $550 - Upsell, same product family, more expensive4GB/1TB -> $700 - Upsell, same product family, more expensive. Laptop Bag -> $25 - Cross-sell, related product, additional sell

Custom fields / settings from applications will be displayed in this tab.

## A step-by-step guide to creating a variable product <a href="#a-step-by-step-guide-to-create-a-variable-product" id="a-step-by-step-guide-to-create-a-variable-product"></a>

**J2Commerce** implements an innovative concept in creating products. It uses the Joomla articles as products. So, to create a product is to create an article.

So, let's create an article.

### Creating an Article <a href="#creating-an-article" id="creating-an-article"></a>

Have a look at the image below:

![Article  manager](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/variable-product/var-pro-article-manager.png)

As given in the above illustration, click in the top menu or in the left pane of the control panel. You will get a new screen like this.

![Choosing product type](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/variable-product/var-pro-choose-pro-type.png)

* Enter the name of your product.
* Since you are creating an article, you need to tell that the article should be treated as a product. So, select ‘Yes’.
* Select the type of product, i.e., ‘Variable’.
* Now, click the ‘Save and Continue’ button.

Your product is successfully created, and a message will be displayed like this.

![success message for creating variable product](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/variable-product/var-pro-create-success.png)

### General <a href="#general-1" id="general-1"></a>

Now you need to configure your product with the necessary details. Begin with the general tab.

![General tab](<../../assets/variable product-general-tab2 (1).webp>)

* If you select ‘Yes’ in the first option, your product will be displayed in the storefront
* Select the brand or manufacturer of the product from the list
* Select the vendor to order the product
* Select the tax profile that matches the product profile

Now switch to the Images tab.

### Images <a href="#images-1" id="images-1"></a>

![Images](<../../assets/variable product-image-tab2 (1).webp>)

You can add main, thumbnail, and additional images relevant to your product in this tab. Click the ‘select an image’ button to get a pop-up window to select the image.

![Select images](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/variable-product/create_variable_cart_images_select.png)

Move on to the variants tab.

### Variants <a href="#variants-1" id="variants-1"></a>

![Variants](<../../assets/variable product-adding-variants2 (1).webp>)

If you select the option, then you need to set values for the option.

![Variants of product](<../../assets/variable product-adding-variants-size (1).webp>)

In the image, as you can see, you have added the option size. Now, save the configuration by clicking ONLY the red coloured button ‘Save’. DO NOT press any other button. Now, see the changes in the screen.

![Variants creation](<../../assets/variable product-color-variants2.webp>)

You can see the blue link, ‘Set Values’, adjacent to the option ‘Color’. Click this link to set some values for the option ‘Color’. Then only you can generate variants. Go ahead with setting values and see what happens…

![Set values](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/variable-product/create_variable_cart_variants_setvalues.png)

If you select the value for the option and click the create button, you will get the resulting screen like this.

![Set option values](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/variable-product/create_variable_cart_variants_setvalues_1.png)

Close the window using the X in the top right corner and return to the tabs.

![Generate variants](<../../assets/variable product-generating-variants2 (1).webp>)

Now, as shown in the image, click on the ‘Generate Variants’, a green colored button, to generate variants for the products.

![Generating variants](../../assets/variable_cart_genrating_variants.webp)

As you click the buttons to generate variants, the buttons adjust themselves to display the message ‘Generating variants… please wait’. Now it's done. See the variants listed below, as shown in the image.

![Generated variants list](../../assets/variable_cart_variants_generated.webp)

Once the variants are generated, you can edit the variants and add necessary details to them. When you edit a variant, you will have all the tabs in cart except the variant tab. Fill in the required details for each product variant. Don't forget to save your changes.

![Editing variants](<../../assets/variable product-generating-variants4 (1).webp>)

Having completed the variants tab, now move on to the filter tab.

### Filters <a href="#filters-1" id="filters-1"></a>

Here, you can set the filters to narrow product search. When you set the filter value as ‘Mens’, all men's T-Shirts will be displayed. Likewise, women and kids. See the illustration below:

![Filters](<../../assets/variable product-filters-variants (2).webp>)

### Relations <a href="#relations-1" id="relations-1"></a>

![Relations](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/variable-product/create_variable_cart_relations.png)

The next tab is Relations. Here, you can add products of higher value than the one being viewed by the customer and recommend the customer to buy that product, citing its advantages and additional features. This is an upsell.

Also, you can add some other products to convince the customer to buy these products additionally. This is cross-selling.

![Variable](<../../assets/variable product-relations-variants (1).webp>)

For a more detailed explanation, refer to the **Relations** section of the **Variable Product**.

### Apps <a href="#apps" id="apps"></a>

The 'user group' app allows you to add a user to a specific user group based on the product that they purchased, so each product could essentially give somebody access to a certain area of the site simply by adding the add to user group app and opening up a product in the app section and then selecting the user group you wish them to be added to when the person purchases that product

![Apps section](<../../assets/variable product-app-variants2.webp>)

In this tab, you can add third-party tools or plugins that are available to enhance the J2Store functionality, like adding additional fields, applications, functions, or features.

Now, let's have a look at how your product is viewed in your online store. Check the image below:

![Frontend view](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/variable-product/poloshirt_on_cart.png)

### Video Tutorial: <a href="#video-tutorial" id="video-tutorial"></a>

Here is a video that could help you create a product with variants:

[![Watch the video](https://img.youtube.com/vi/etsNdfUYrgw/hqdefault.jpg)](https://www.youtube.com/watch?v=etsNdfUYrgw)

To know how to manage inventory for variable products, follow the instructions given here:

[![Watch the video](https://img.youtube.com/vi/8givojFFolM/hqdefault.jpg)](https://www.youtube.com/watch?v=8givojFFolM)

[![Watch the video](https://img.youtube.com/vi/ipfyi2EtyMo/hqdefault.jpg)](https://www.youtube.com/watch?v=ipfyi2EtyMo)
