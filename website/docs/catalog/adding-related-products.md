---
description: J2Commerce (formerly known as J2Store)
---

# Adding Related Products

Adding related products has never been as easy as it is now. Here is how you could add up-sell and cross-sells products on your store.

### Scenario

Let us suppose your site sells Tea cups, Tea pots and Serving plate. Let us suppose that the product Brook Ceramic serving plate from the serving plates section is related products to another product named Paragon Blue Tea cup from the Tea cups section and you wish to see the Hand-painted Tea pot from the Tea pots menu in the cross-sells section.

### Steps to be done

- Create an article for Paragon Blue Teacup.
- Create another article for the Brook Ceramic Serving plate and one for the hand-painted teapot.
- In the relations tab of the Paragon Blue Teacup article, type in Brook Ceramic Serving Plate.
- The Serving Plate’s article would pop up. Add it to the upsells section.
- Now type the name Hand-painted Teapot in the cross-sells section.
- The article with the name Hand-painted Teapot would pop up. Add it to the cross-sells section.

  ![](/img/relations1.webp)

On the sidebar, navigate to menus > manage > Create a menu for Teacups.&#x20;

![](/img/relations-menu1.webp)

Click Select for the Menu Item type

![](/img/relations0.webp)

- &#x20;Select J2Commerce > Product list View.

![](/img/relations-menu.webp)

- Navigate to the **Product view options** tab and set the options **Up sells (Related products)** and **Cross sells (Related products)** to **Yes**. They are towards the bottom of this tab

![](/img/relations2.webp)

Visit the frontend of the site and click on the Teacups category.

Now, from the list of products displayed, click on the Paragon Blue Teacup.

In the item view page of the teacup, the Serving plate would be listed in the Related products section.

The hand-painted teapot would be available in the cross-sells section.

### Screenshots

![Frontend view](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/adding-related-products/frontendrelatedproducts.png)

### Video Tutorial

[![Watch the video](https://img.youtube.com/vi/X4QtLzaBPI0/hqdefault.jpg)](https://www.youtube.com/watch?v=X4QtLzaBPI0)

#### Showing related products on the cart page

By default, the related products would be displayed on the item view page of the parent product only.

Now that we have added the related products to the required parent products, we might want to display these related products on the cart page as well.

### How this module works

Once you have added related products to your parent products, all you have to do is install the module, assign it to the pages you wish to display the related products, and set a position where the module has to be displayed on the chosen pages.

**NOTE: The Related products module would display the related products only if the product present in the cart has associated Relations to it. The product in the cart should have a related product added to it.**

#### **Download App:**{#download-app}

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) > Extensions > Modules

**Step 2:** Locate the Related Product Module > click View Details > Add to cart > Checkout.

![](/img/related-purchase.webp)

**Step 3:** Go to your My Downloads under your profile button at the top right corner and search for the app. Click Available Versions > View Files > Download Now

![](/img/related-download.webp)

#### **Installation:**{#installation-}

You can install this Related Product Module using the Joomla installer. The following steps help you for successful installation.

**Step 1:** In the Joomla admin, go to System > Install > Extensions

![](/img/related-installer-1.webp)

**Step 2:** Click on the Browse button and select the Related Product Module zip file where you saved it.

![](/img/related-download1.webp)

**Step 3:** In the Joomla admin, go to Content > Site Modules > Enable the Related Products Module by clicking on the 'X' to turn it into a checkmark

![](/img/related-enable.webp)

### Configuration

The module has several options that allow you to customize the view of the module on the storefront.

![Related product module settings](/img/rel-pro-mod-settings1.webp)

Once the layout configuration is done, navigate to the Menu assignment tab on the module and choose the pages where the module should be published:

![Module assignment](/img/related-perameters1.webp)

![Position assignment](/img/position-assignment1.webp)

![Related product module frontend](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/adding-related-products/rel-pro-mod-frontend.png)

## Adding a related product in the Joomla article view

The related products in the article view have to be done with the help of [shortcodes](https://docs.j2commerce.com/catalog/short-codes).

### Scenario

The product Net has to be added as a related product to the product Basketball. The product ID of the product basketball is 17, and the product ID of the product Net is 18.

### Steps to be done

- Navigate to the J2Commerce (or J2Store cart) tab and add the child product in the upsell or crosssell field of the relations tab
- Navigate to the product article of the Basketball > J2Commerce (or J2Store cart) tab > Copy the shortcode `{j2store}17|cart{/j2store}`
- Paste it in the content part and copy the shortcode for displaying the cross-sell and upsell product, and paste it in the content part of the parent product. The shortcode to be copied is `{j2store}17|upsells|crosssells{/j2store}`

![Shortcodes](/img/related-basketball.webp)

- Navigate to the article of the related product > J2Commerce (or J2Store cart) tab > copy the shortcode to display the product’s add to cart `{j2store}18|cart{/j2store}`
- Paste the shortcode in the content tab

![Cart shortcode](/img/related-basketball-net.webp)

**VERY IMPORTANT NOTE:** The above approach would work only if you have all of your products displayed in the Joomla article view and not in the J2Commerce list or tag view layout.

You will have to insert the add to cart shortcodes for the other products; if not, the add to cart button wouldn’t show up.

**Follow the steps below:**

**Step 1:** System > Manage > Plugins

![](/img/related-plugin.webp)

**Step 2:** Filter Options > Select Type > Content

**Step 3:** Click on Content - J2Store

![Item view settings](/img/related-content-plugin.webp)

**Step 4:** Click on the item View tab and make sure the Product Block Position is set as Top.

![](/img/related-content-plugin1.webp)

### Frontend display

![Parent product on frontend](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/adding-related-products/frontend-parent-pro.png)

![Front view](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/adding-related-products/rel-pro-view-front.png)
