---
description: J2Commerce (formerly known as J2Store)
---

# Easy checkout

With online shopping moving quickly, convenience is becoming a must for customers. Overcomplicating your check out process can result in lost sales and unsatisfied customers. One would think that fewer steps would make it easier for the customer to check out, but that is not always the case.

Here we are coming up with **Easy checkout** for J2Commerce that makes the checkout process easier.

Easy checkout is nothing but an one-page checkout that displays all elements of a standard checkout including basket contents, billing and shipping address, shipping options, and payment information on one page. Originally, one-page checkouts were put into practice in an effort to simplify the check out process with fewer clicks and fewer pages.

It will be easier to complete as less steps can appeal to time-conscious customers.

**Requirements**

1. Joomla! 4.x/ Joomla! 5.x +
2. PHP 8.1.0 +
3. J2Commerce / J2Store 4.x +

**Installation**

Download and install our Easy checkout component using Joomla! installer.

After installing, go to Manage > Plugins and make sure that the plugin System - Easy Checkout has been enabled.

![](<../../assets/vat-tax-8 (1).webp>)

Once you enabled the system plugin, the J2Commerce’s normal checkout will be replaced and the single step checkout will be activated. Once enabled, Easy Checkout will appear in the side menu bar under Components.

![](<../../assets/easy-checkout1a.webp>)

Few points that has to be remembered

1. **Guest checkout**

The guest checkout form is a must for all online stores for the customers who don’t want to have an account.

To enable the Guest checkout, go to J2Commerce > Setup > Configuration > Cart tab

Set **YES** to Allow guest checkout

Save.

![](<../../assets/vat-tax-9.webp>)

![Easy-checkout-guest-checkout](https://raw.githubusercontent.com/j2store/doc-images/master/easy-checkout/easy-checkout/easycheckout-guest.png)

**2. New account registration**

To enable the New account registration option in Easy checkout,

Go to Component > J2Commerce > Setup > Configuration > Cart tab

Set 'YES' to allow quick new user registration

Save.

![](<../../assets/vat-tax-10 (1).webp>)

If the new user registration option is enabled, you would see a small checkbox labelled **Create an account for later usage** in the checkbox.

This checkbox will be checked automatically.

If customers don’t want to register, they can uncheck the checkbox and proceed further as a guest (Non-registered).

![Easy checkout-allowing new user registration](https://raw.githubusercontent.com/j2store/doc-images/master/easy-checkout/easy-checkout/easycheckout-allow-user-registration-frontend.png)

![Easy checkout create a new account checkbox](https://raw.githubusercontent.com/j2store/doc-images/master/easy-checkout/easy-checkout/easycheckout-unselectbox-creating-new-acc.png)

**3. Existing customers**

The existing customers can place the order by using the login form. You would see the login form by clicking on **Login**.

![Easy checkout login](https://raw.githubusercontent.com/j2store/doc-images/master/easy-checkout/easy-checkout/easycheckout-login.png)

![Easy checkout login form](https://raw.githubusercontent.com/j2store/doc-images/master/easy-checkout/easy-checkout/easycheckout-loginform.png)

**4. Checkout menu**

The SEF is the most important one for all the online stores. Similar to the Normal checkout, the easy checkout also has the menu item type.

By using this menu type, you can have the SEF URL for the checkout page.

Go to Menus > Manage and create the menu item under Main Menu.&#x20;

![Easy checkout menu](../../assets/easy-checkout3.webp)

Name the menu Checkout.&#x20;

**Select Easy checkout > Checkout**.

![](<../../assets/easy-checkout2b.webp>)

![](<../../assets/easy-checkout2c.webp>)

**Screenshots**

![Easy checkout login form filled](https://raw.githubusercontent.com/j2store/doc-images/master/easy-checkout/easy-checkout/easycheckout-loginform-filled.png)

![Easy checkout existing user logged in](https://raw.githubusercontent.com/j2store/doc-images/master/easy-checkout/easy-checkout/easycheckout-existing-user.png)

**Easy checkout is not showing up:**

Even after installing, enabling, and creating a menu for easy checkout, if it is not showing up on the storefront, then this might be a reason.

Navigate to\*\* Components > Easy checkout > Options\*\*

![Associating menu with easy checkout](<../../assets/easy-checkout2 (1).webp>)

\*\*Select the menu created for easy checkout at the Easy Checkout menu option. If Checkout isn't listed in the dropdown menu, then it's because you skipped the step above, which is creating the menu.

![Choose the menu created for easy checkout](../../assets/easy-checkout4.webp)

![Frontend with coupons and vouchers enabled](https://raw.githubusercontent.com/j2store/doc-images/master/easy-checkout/easy-checkout/easy-checkout-coupons-vouchers-frontend.png)

![Easy checkout coupons and vouchers form](https://raw.githubusercontent.com/j2store/doc-images/master/easy-checkout/easy-checkout/easy-checkout-coupons-vouchers-clicked.png)
