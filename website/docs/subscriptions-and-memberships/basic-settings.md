---
description: J2Commerce (formerly known as J2Store)
---

# Basic Settings

For renewing subscriptions, you should run a cron job at least every day.

The cron job must run once an hour. While setting a cron job, choose Once Per Hour under the common settings.

There should be a minimum 15-minute interval between each cron job.

![subscription](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/basic-settings/subscription-cron.png)

![subscription once hour](https://raw.githubusercontent.com/j2store/doc-images/master/subscriptions-and-memberships/basic-settings/subscription-cron-once-hour.png)

## Cron url <a href="#cron-url" id="cron-url"></a>

Replace the domain with your domain.

Where XXXXX is your cron secret key, which can be identified in your store settings (J2Store > Setup > Configuration > Store tab)

Don’t know how to set a cron job? [click here](https://docs.j2commerce.com/general/how-to-set-cron-job-on-your-server)

## Notify the expiration day before <a href="#notify-expire-day-before" id="notify-expire-day-before"></a>

Enter the number of days to send the reminder mail to the customer to notify them that their subscription will be going to end. For example, 2. So the mail will be sent before the 2nd day to expire.

## Display settings <a href="#display-settings" id="display-settings"></a>

* **Show Duration** -This option allows you to show / hide the duration displayed below the product price.
* **Show recurring total-** Setting NO to this option will hide displaying recurring total column from the cart total table.
* \*\*Show non-recurring total -\*\*This option helps you to show / hide non-recurring total displayed on the cart page.
* **Show renewal date-** If you would like to not show the next renewal date to users, just set this option 'NO'.
* **Renewal date format-** This is the text box that allows you to change the format of the renewal date displayed in the item table.
* **Show renew button-** This option is used to show / hide the renew button on the profile page > Subscription tab.

## Renewal settings <a href="#renewal-settings" id="renewal-settings"></a>

* Renewal discount

If you would like to give customers a discount for renewing a subscription, then enter your discount value in percent in this text box. The discount value applied in this text box will be applied to all subscription products.
