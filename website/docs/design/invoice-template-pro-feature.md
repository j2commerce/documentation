---
description: J2Commerce (formerly known as J2Store)
---

# Invoice Template (Pro Feature)

You can design how your invoice looks here. You can add a company address, logo, and some additional information to the invoice. You can also show various order information by adding the short tags. The tags will be replaced with relevant information from the order table.

## Free version <a href="#free-version" id="free-version"></a>

NOTE: In the free version, the template comes from the language file. In the language file, you can find this constant that holds the invoice template:

`J2STORE_DEFAULT_INVOICE_TEMPLATE_TEXT`

The constant’s value has short tags and HTML. You can override the text by writing a language override.

## Creating / Editing Invoice template in PRO version <a href="#creating--editing-invoice-template-in-pro-version" id="creating--editing-invoice-template-in-pro-version"></a>

Like the email template, here too we have two settings pages to fill up for creating an invoice template. They are

* Simple Editor (recommended)
* Advanced Template File

The following points reveal the process of an invoice template.

**Standard:** The fundamental requirements of a template. Let us see one by one.

**Title:** The title of the template. You can have as many templates as you like, and hence it is necessary to give a unique title to each and every template.

**Order Status** Invoice will be generated based on the order status only. To generate an invoice, the order status should be ‘COMPLETED’.

**Language:** Here you can select for which particular language this template can be used or for all languages.

**Groups:** This states which group can generate an invoice for e.g., groups like Administrator, Manager, Editor etc. can be able to generate invoices, whereas public and guest user groups can not do so. This can be determined using this field.

**Payment Methods:** This defines the payment methods that are accepted for selling. Some payment options may not be accepted by some sellers, and they may wish to avoid those options. For that, it has been enabled to select the options from the available list.

**Status:** For a template to be used for invoicing, it has to be published prior to that. This field will notify the status.

**Advanced:** In advanced settings, we have the invoice content. The content of the invoice can be designed here. You can include a lot of information. There is a rich text editor to neatly customize the content.

Using the short codes, you can add customer name, order no, order date, payment details, shipping details, product details etc. This can be accomplished by adding suitable tags listed in the extreme right area of the page.

Check the image below for how an invoice template can be designed for our needs.&#x20;

This is for **example purposes** **only**, and the user can design his/her own template.

![invoice](<../../assets/email1 (1).webp>)

Full articles can also be added to the content from other external sources.

## How to add custom fields in the invoice template? <a href="#how-to-add-custom-fields-in-invoice-template" id="how-to-add-custom-fields-in-invoice-template"></a>

Also, you can add custom fields you have created in the editor. To add a custom field in the editor for display, you need to follow the format given below:

\[CUSTOM\_BILLING\_FIELD:FIELDNAME]

Keep in mind the following when you add a custom field to the editor:

* The custom field should be enclosed in \[]
* All the letters should be in CAPITAL letters
* ‘CUSTOM’ is the first word inside the \[]
* Next, the section in which you have created the field, like ‘BILLING\_FIELD’
* And finally, the field name

Refer to the image below for more clearer understanding

![custom](<../../assets/email2 (1).webp>)

## How to create a template override for the items table showing in the invoice? <a href="#how-to-create-template-override-for-items-table-showing-in-the-invoice" id="how-to-create-template-override-for-items-table-showing-in-the-invoice"></a>

If you would like to customize the order item table showing in the order invoice, that could be possible by creating a template override. Carrying out customizations through template override will not overwrite the changes if you update it in the future.

**Here are the instructions to be followed:**

* The file that controls the items table is located at
* /components/com\_j2store/views/myprofile/tmpl/orderitems.php
* Copy the above file and paste it under
* /templates/YOUR-SITE-TEMPLATE/html/com\_j2store/myprofile/orderitems.php
* Edit
* /templates/YOUR-SITE-TEMPLATE/html/com\_j2store/myprofile/orderitems.php
* Make your changes and save.

Video Tutorial:

[![Watch the video](https://img.youtube.com/vi/uFyPRGBCVKo/hqdefault.jpg)](https://www.youtube.com/watch?v=uFyPRGBCVKo)
