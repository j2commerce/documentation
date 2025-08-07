---
description: J2Commerce (formerly known as J2Store)
---

# How to send download links through email notifications

Many times, you might want to send the link to your downloadable products to the users through the email notifications they receive upon placing the order.

This can be done with the help of two of our apps:

* [Dropbox](https://www.j2store.org/extensions/apps/dropbox.html)
* [Amazon S3](https://www.j2store.org/extensions/apps/amazon-s3.html)

These apps let you save your downloadable product files on Dropbox or Amazon S3, respectively, and connect the buckets to your site.

## Prerequisites: <a href="#prerequisites" id="prerequisites"></a>

You should have stored all your downloadable files on Dropbox or Amazon S3, respectively.

## To send the files in the email notifications: <a href="#to-send-the-files-in-the-email-notifications" id="to-send-the-files-in-the-email-notifications"></a>

Once you have installed the app and connected the store with the app, you will find the shortcodes in the app settings, which you could use in the email templates.

## For Dropbox: <a href="#for-dropbox" id="for-dropbox"></a>

If you have your files on Dropbox, please use the following shortcode in the email template:

**\[DROPBOX\_FILE]**

![Link](https://raw.githubusercontent.com/j2store/doc-images/master/apps/how-to-send-download-link/Dropbox.png)

## For Amazon S3: <a href="#for-amazon-s3" id="for-amazon-s3"></a>

If you have your files in Amazon S3, please use the following code on the email template:\*\*

\*\*\[AMAZONE\_FILE] \*\*

![Amazon s3](https://raw.githubusercontent.com/j2store/doc-images/master/apps/how-to-send-download-link/Amazons3.png)
