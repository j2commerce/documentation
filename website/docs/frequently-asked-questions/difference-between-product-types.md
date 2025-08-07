---
description: J2Commerce (formerly known as J2Store)
---

# Difference between product types

## Introduction <a href="#introduction" id="introduction"></a>

J2Commerce has multiple product types to facilitate user requirements. The following are the basic product types that come with the J2Commerce package:

* Simple
* Variable
* Configurable
* Downloadable
* Flexivariable

### Simple product <a href="#simple-product" id="simple-product"></a>

This is one among the most basic product types of J2Commerce. When the product requirement is simple and doesn’t involve in something more than setting up options, you could choose to use this product type.

**Usecase:**

A T-shirt has to be sold. It should have the options size and color.

### Variable product <a href="#variable-product" id="variable-product"></a>

This product type involves quite a bit of complexity. When you wish to use combination of options or when you wish to maintain inventory or separate shipping information for each option this product type can be chosen.

**Usecase:**

A T-shirt has two options, size and color. Option size has the following values:

* Small
* Medium

Option color has the following values:

* Red
* Blue

Now, the variable product would generate a combination of all the option values as follows:

* Small- Red, Small- Blue
* Medium-Red, Medium-blue

You could set up the shipping information, inventory details and pricing for each of the above combination.

This reduces the workload of manually creating options and setting up pricing and other information for each of the option values.

And also, if you wish to maintain a separate inventory for each option value, this helps.

### Configurable product <a href="#configurable-product" id="configurable-product"></a>

With the configurable product type, you could generate a parent-child relationship on the option values.

**Usecase:**

A T-shirt has two options size and color. Sometimes, you might want to restrict the availability of an option based on the value chosen on the other option.

For example, The Red option should be available only when the user chooses the Medium size.

The above requirement can be done with the help of a configurable product.

### Downloadable product <a href="#downloadable-product" id="downloadable-product"></a>

When you are trying to sell digital products on your store, this product type could be used.

**Usecase:**

If you wish to sell E-books or any content that is downloadable.

### Flexivariable product: <a href="#flexivariable-product" id="flexivariable-product"></a>

The flexivariable product is an extension of the functionality of the variable product.

This facilitates the publishing and unpublishing of any of the variants(option combination) without affecting the other variants.

**Usecase:**

You have already created a product and added option values. Now, one among the variant combinations (say Red-Medium) goes out of stock.

If the above product is a variable product, then the variant has to be deleted and all the variants have to be regenerated. In this process, the data entered for all the variants would be lost since we alter the combination.

But with a flexi-variable product, you could publish and unpublish any variant at any time.

### Other product types: <a href="#other-product-types" id="other-product-types"></a>

## Advanced variable: <a href="#advanced-variable" id="advanced-variable"></a>

The advanced variable is an extension to the variable product. With a variable product, the options added to it are considered only as variants.

**Usecase:**

You are selling a customizable t-shirt. The product has options “Size, color and customized text”.

The options size and color are variants or combinations as we mentioned in the example for the variable product type. However, the text cannot be added as a variant.

In this case, an advanced variable product type can be chosen.

## Booking: <a href="#booking" id="booking"></a>

This product type can be used when you try to use your site for renting or booking services or products.

**Usecase:**

When you are trying to rent a car or provide a tour package, this product type can be used. This allows store owners to let users book or reserve the product.

## Subscription: <a href="#subscription" id="subscription"></a>

When you wish to sell paid content on your store or when you wish to sell daily, weekly, monthly, or yearly membership products, this product can be used.

**Usecase:**

Weekly magazine subscriptions, yearly stationery supply subscription, monthly cosmetic kit subscription, and so on.
