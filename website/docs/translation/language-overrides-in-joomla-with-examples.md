---
description: J2Commerce (formerly known as J2Store)
---

# Language overrides in Joomla with examples

To change text in core Joomla! Or in an extension (other than installing a new language), it is advised to perform a language override in Joomla!. To do this, you need to go into the admin backend, then in the menu under “Extensions” click on “Language Manager”

Let us assume that you want to change the First name (in billing address fields) to My Name.

Go to Components > J2Commerce > Extensions Manager > Language Manager > Overrides.

**VERY IMPORTANT:**

Before creating the override, set the Filter to ADMINISTRATOR (of the language that you wanted to create the override. Say, your language is German. Then you should select the German (de-DE) Administrator in the filter.

![location filter](https://raw.githubusercontent.com/j2store/doc-images/master/translation/language-override-in-joomla-with-examples/location_filter.png) Step 2: Click new to create a override

**VERY IMPORTANT**

**Step 1:** Make sure you have checked the For both locations

**Step 2:** Make sure the location points to the ADMINISTRATOR

![override screen](https://raw.githubusercontent.com/j2store/doc-images/master/translation/language-override-in-joomla-with-examples/override_screen.png)&#x20;

**Step 3:** You can either search or directly enter the constant (if you know it already) to create the override.

## Method 1: Searching <a href="#method-1-searching" id="method-1-searching"></a>

Under the Search text you want to change, enter the following text (as you see on the site): Firstname and hit search. You will get the constant: J2STORE\_FIRST\_NAME

## Method 2: Find the constant from the language file <a href="#method-2-find-the-constant-from-the-language-file" id="method-2-find-the-constant-from-the-language-file"></a>

Let us take J2Commerce as an example. All the language constants of J2Commerce can be found in the following file/administrator/language/en-GB/en-GB.com\_j2store.ini

**Step 4:** Now you have the constant. Enter the constant in the Language Constant box.

**Step 5:** Enter your value (in our example My Name) in the Text box.

**Step 6:** Save.

You can create as many overrides as you like in this method.

## Video tutorials: <a href="#video-tutorials" id="video-tutorials"></a>

**Method 1:**

[![Watch the video](https://img.youtube.com/vi/q-QXbSPLiA0/hqdefault.jpg)](https://www.youtube.com/watch?v=q-QXbSPLiA0)

**Method 2:**

[![Watch the video](https://img.youtube.com/vi/xrLXBHnFASc/hqdefault.jpg)](https://www.youtube.com/watch?v=xrLXBHnFASc)

## How to translate product options: <a href="#how-to-translate-product-options" id="how-to-translate-product-options"></a>

[![Watch the video](https://img.youtube.com/vi/snZgc3Fd_3Y/hqdefault.jpg)](https://www.youtube.com/watch?v=snZgc3Fd_3Y)
