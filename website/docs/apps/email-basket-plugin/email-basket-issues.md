---
description: J2Commerce (formerly known as J2Store)
---

# Request Quote / Email Cart Issues

***Previously known as Email Basket***

The following might be some of the commonly faced issues in the Request Quote / Email Cart plugin.

## The modal pop-up is not opening up <a href="#the-modal-pop-up-is-not-opening-up" id="the-modal-pop-up-is-not-opening-up" />

This issue can be solved by setting the modal class as **fade** instead of **fade hide** in the app’s advanced settings:

![ebi01](/img/email-advanced-issue.webp)

## The fields are not aligned properly <a href="#the-fields-are-not-aligned-properly" id="the-fields-are-not-aligned-properly" />

There might be difficulties in aligning the fields of the modal pop-up. This happens due to bootstrap conflicts on some of the templates. Now you could choose if you wish to display the modal in a **Bootstrap form** or a **custom modal form** under the Layout settings of the app’s settings:

![ebi02](/img/email-layout-issues.webp)

## The email comes through with just a label, Customer details <a href="#the-email-comes-through-with-just-a-label-customer-details" id="the-email-comes-through-with-just-a-label-customer-details" />

Sometimes, the email notification that is sent to users when a quote is placed can just say Customer details, without the details entered by the users. This is because the email to be sent has not been configured in the app’s settings:

![ebi03](/img/email-language-issues.webp)
