---
description: J2Commerce (formerly known as J2Store)
---

# Recommended Tax configuration for Canadian Stores

This is an example setting for stores in Canada. For detailed information on tax, please consult an expert.

> NOTE: The example given below, assumes you have a store in Canada, Saskatchewan and you charge 5% GST and 5 % Saskatchewan-PST on the goods sold to customers.

## Step 1 : Create a geozone for Canada <a href="#step-1--create-a-geozone-for-texas" id="step-1--create-a-geozone-for-texas"></a>

Go to Components > J2Commerce > Localisation -> Geozones -> New

![Geozone Canada](<../../assets/geo-zone (1).webp>)

![Geozone Canada](<../../assets/geo-zone-canada.webp>)

Geozone Name: Canada geozone

Country : Canada

Zone : \*

## Step 2: Create a tax rate <a href="#step-2-create-a-tax-rate" id="step-2-create-a-tax-rate"></a>

Go to Localisation -> Tax Rates -> New

![Tax Rate Canada](<../../assets/tax-rate (1).webp>)

![Tax Rate Canada](<../../assets/tax-rate-canada.webp>)

Name : Canada-GST

Tax Percent : 5

Geo Zone : Canada geo zone

Enabled: Yes

## Step 3: Create another tax rate for Saskatchewan-PST <a href="#step-3-create-another-tax-rate-for-saskatchewan-pst" id="step-3-create-another-tax-rate-for-saskatchewan-pst"></a>

Go to Localization -> Tax Rates -> New

![Saskatchewan Tax Rate](<../../assets/tax-rate-canada1.webp>)

Name : Saskatchewan-PST

Tax Percent : 5

Geo Zone : Canada geo zone

Enabled: Yes

## Step 4: Create a tax profile and rules <a href="#step-4-create-a-tax-profile-and-rules" id="step-4-create-a-tax-profile-and-rules"></a>

Go to Localization  > Tax Profiles  > New

![](<../../assets/tax-profile (1).webp>)

![](<../../assets/tax-profile-canada.webp>)

Name: Canada Tax Class

Enabled: Yes

Tax rules

Click Add

Rate: Canada - GST

\*\*Associated Address: \*\* Shipping

Click Add

Rate: Saskatchewan-PST

\*\*Associated Address: \*\* Shipping

## Step 5: Configure tax settings <a href="#step-5-configure-tax-settings" id="step-5-configure-tax-settings"></a>

Go to Setup  > Configuration  > Tax

![](<../../assets/tax-config.webp>)

![](<../../assets/tax-config1.webp>)

**Prices Entered with Tax:** No, I will enter prices EXCLUSIVE of tax

**Calculate tax based on:** Shipping address

**Default Customer address:** Store address

**Display prices on product pages:** Excluding tax

**Display prices in cart / checkout:** Excluding tax

**Apply discounts:** Before tax

**Save.**

## Step 6: Adding the tax profile to a product <a href="#step-6-create-a-product-and-choose-the-tax-profile" id="step-6-create-a-product-and-choose-the-tax-profile"></a>

J2Commerce uses Joomla! articles as products. So go to Article Manager and create a New Article / Product (If you use any other catalog source like Zoo or Sebold, you should head there).

Product creation steps are explained under the topic Products.

Here let us just see how to choose the tax profile

Go to J2Commerce (or J2Store Cart) tab > General tab

Tax Profile: Canada Tax Class

![](<../../assets/j2store-tax.webp>)

IMPORTANT If you do not choose the tax profile, then tax will not apply in the storefront.

## Video Tutorial: <a href="#video-tutorial" id="video-tutorial"></a>

[![Watch the video](https://img.youtube.com/vi/bchu7-Zysb8/hqdefault.jpg)](https://www.youtube.com/watch?v=bchu7-Zysb8)
