---
description: J2Commerce (formerly known as J2Store)
---

# Products not aligned properly on list view

The alignment of the products in the list view is based on many factors. In J2Commerce, the products are displayed in a product block structure.

What does the product block consist?

The product block typically consists of

* The product image
* The product name
* The price, SKU, and stock
* The description part(while many users don’t publish the description on the list view, some users do)
* The add to cart button or the view details button

## Factors causing misalignment: <a href="#factors-causing-misalignment" id="factors-causing-misalignment"></a>

### Product images are of different heights <a href="#product-images-being-of-different-heights" id="product-images-being-of-different-heights"></a>

In J2Store, the products are arranged in a block structure. The product image, which is also a part of the product block, plays a major role in determining the product alignment.

That is, when you use images of varying heights on your site, the product block of the image with a greater height would be larger than the one with a relatively smaller product image.

**Solution:** To a certain extent, this could be overcome by minor CSS tweaks. However, if your images are of entirely different heights, then you might want to consider using uniformly sized images for a neat layout.

### The product title is big and greater font size <a href="#the-product-title-being-big-and-greater-font-size" id="the-product-title-being-big-and-greater-font-size"></a>

When you use higher font sizes for your product title and have a big name for the products, then the product block would be aligned up and down.

**Solution:** To use a font size of about 16px would be good. Also, having product titles within two words is a good practice to get a neat layout.

### Publishing Description in the list view <a href="#publishing-description-in-the-list-view" id="publishing-description-in-the-list-view"></a>

Generally, most users don’t publish the description on the list view, but a very few users do. This might also cause the products to be aligned up and down.

**Solution:** To a certain extent, this could also be overcome by adding minor CSS tweaks. However, if you have a lengthy description, then it is better to avoid publishing it on the list view since this might lead to a less clean look.
