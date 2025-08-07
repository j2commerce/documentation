---
description: J2Commerce (formerly known as J2Store)
---

# SCA support for payment plugins

## SCA support for payment plugins <a href="#sca-support-for-payment-plugins" id="sca-support-for-payment-plugins"></a>

In the European Union, a new regulation for online payments will be rolled out in September 2019. This would require your payment plugins to be compliant with the SCA regulation.

## What is SCA? <a href="#what-is-sca" id="what-is-sca"></a>

Strong Customer Authentication (SCA) is a new European regulatory requirement to reduce fraud and make online payments more secure. To accept payments once SCA goes into effect, you will need to build additional authentication into your checkout flow.

Strong Customer Authentication (SCA) ([https://stripe.com/docs/strong-customer-authentication](https://stripe.com/docs/strong-customer-authentication)), a new rule coming into effect on September 14, 2019, as part of PSD2 regulation in Europe, will require changes to how your European customers authenticate online payments. Card payments will require a different user experience, namely 3D Secure, in order to meet SCA requirements. Transactions that don’t follow the new authentication guidelines may be declined by your customers’ banks.

## Will I need to update my payment plugins? <a href="#will-i-need-to-update-my-payment-plugins" id="will-i-need-to-update-my-payment-plugins"></a>

Yes, we are in the process of updating our payment plugins to ensure that they support SCA compliance.

This update will be rolled out before September, when the regulations come into effect.

**Are PayPal and Stripe compatible with SCA?**

**1) PayPal Standard:**

With the standard version of PayPal, the transactions happen at the payment gateway and not on the Merchant site.

So, PayPal would handle the compliance by itself.

Store owners need not worry about the compliance since the transaction occurs outside of the store.

**2) PayPal PRO:**

The latest version of PayPal PRO (2.15) does support SCA regulations.

**3) Stripe:**

As far as Stripe is concerned, the latest version of Stripe, the **built-in mode,** supports SCA regulations.

You will have to update Stripe to the latest version (1.53) and set the option **Enable payment intent in the built-in form to 'YES' in the plugin settings.**

**SCA supported cards for testing:**

You might want to use only these cards for testing Stripe SCA compliance:

[https://stripe.com/docs/payments/cards/saving-cards](https://stripe.com/docs/payments/cards/saving-cards)

**Stripe Hosted checkout:**

With the purchase of Stripe integration, there comes an additional plugin called Stripe checkout (Hosted).

You could find this plugin at the My Downloads page of the J2Commerce site.

**PS: With this plugin, you need not worry about SCA compliance since the transactions occur in the Stripe gateway.**

More info about this can be found here:

[https://docs.j2commerce.com/payment-methods/stripe/](https://docs.j2commerce.com/payment-methods/stripe)

![](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/13074122822/original/5h_L1OTa3oFalZ2UR7nbuJv9tAL6LrTiUQ.png?1565934569)

**Stripe for subscription products:**

We have rolled out an update(version 1.53) starting from which Stripe will support SCA regulations on recurring payments, which is for subscription products.

The following are the SCA-supported cards for testing:

[https://stripe.com/docs/payments/cards/saving-cards](https://stripe.com/docs/payments/cards/saving-cards)

**NOTE: The SCA authentication pop-up would come up only if you use the above SCA-supported cards to test.**

**4) Other payment gateways:**

If the payment occurs in the payment gateway, then SCA compliance would be handled by the payment gateway itself.

If the transactions occur on the merchant site, then please drop us a support request to check the compatibility.
