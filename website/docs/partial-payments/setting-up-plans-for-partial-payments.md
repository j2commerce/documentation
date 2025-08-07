---
description: J2Commerce (formerly known as J2Store)
---

# Setting up plans for Partial Payments

## Setting up plans for partial payments: <a href="#setting-up-plans-for-partial-payments" id="setting-up-plans-for-partial-payments"></a>

If you like to set a plan as the partial payment type, it is necessary to define one first.

To do so, follow the steps given below:

* Click on the Plans tab (Refer to the screenshot attached).
* Click on the New button to create a new plan.
* Give the plan a name, description, and set up a plan schedule(the installments the payment is to be paid).
* Click Save.
* Click Back to Apps to set up partial payments.

### Relevant Screenshot <a href="#relevant-screenshot" id="relevant-screenshot"></a>

![partial payment plan](https://raw.githubusercontent.com/j2store/doc-images/master/partial-payments/setting-up-plans-for-partial-payments/app_partialpaymentplan.png)

### Creating plans- an example: <a href="#creating-plans--an-example" id="creating-plans--an-example"></a>

You could wish to receive payment in 2 installments. For instance, you could set it up like this:

![plan setup](https://raw.githubusercontent.com/j2store/doc-images/master/partial-payments/setting-up-plans-for-partial-payments/app_partialpaymentplansetup.png)

Here, as the screenshot explains, the payment is split into two parts, the first one being 25 % of the total amount and the second half being the remaining amount.

Likewise, the entire liberty of splitting the payment into as many parts as you want lies in your hands.

## Partial payments at the product level <a href="#partial-payments-at-product-level" id="partial-payments-at-product-level"></a>

When using partial payment at the product level, you will have to disable partial payment globally at the app’s settings.

Supposing that your site has hundreds of products and you wish to allow one product’s payments in segments, then this would be an ideal method to do so.

With product-level partial payment settings, you could allow the users to buy all the products in normal full payment, and a specific product in segments.

* Go to Content > Article Manager > Edit your product
* Move to the J2Commerce (J2Store cart) tab and navigate to the Apps tab
* Set 'YES' to enable partial payment
* Choose if the default payment mode is partial or full.
* Select your partial payment type (Fixed price, percentage, plan)
* If the plan is chosen as the partial payment mode, the plan that has been created should be selected here.

### Relevant Screenshot <a href="#relevant-screenshot-1" id="relevant-screenshot-1"></a>

![payment product](https://raw.githubusercontent.com/j2store/doc-images/master/partial-payments/setting-up-plans-for-partial-payments/app_partialpaymentproduct.png)
