---
title: "EU VAT for Digital Goods (2015 Rules)"
sidebar_label: "Digital Goods VAT"
sidebar_position: 6
description: "Comply with 2015 EU VAT rules for digital products including e-books, software, and downloads with automatic VAT number validation."
---

# EU VAT for Digital Goods (2015 Rules)

If you sell digital goods (e-books, software, digital courses, downloads), you must follow the EU "Place of Supply" rules where VAT is charged based on the **buyer's location**, not the seller's location. This guide explains how to configure J2Commerce to comply with these rules.

## Important Legal Notice

:::warning
This is example configuration. J2Commerce is not responsible for VAT/Tax compliance. EU VAT rules for digital goods are complex. Consult a tax expert before making decisions.
:::

## Understanding the 2015 EU VAT Rules

Since January 1, 2015, digital goods sold to EU customers must charge VAT based on the buyer's country:

| Buyer Location                | VAT Number Status        | Tax Applied              |
| ----------------------------- | ------------------------ | ------------------------ |
| Your home country             | Any                      | Your local VAT rate      |
| Other EU country (individual) | N/A                      | Buyer's country VAT rate |
| Other EU country (company)    | **Valid VAT ID**         | 0% VAT (reverse charge)  |
| Other EU country (company)    | **Invalid or no VAT ID** | Buyer's country VAT rate |
| Outside EU                    | Any                      | 0% VAT (export)          |

- **EU Individual (B2C):** Charge the VAT rate of the **buyer's country**.
- **EU Company (B2B):** If they provide a valid VAT ID, the transaction is **0% VAT** (Reverse Charge).
- **EU Company (Invalid ID):** Charge the VAT rate of the **buyer's country**.
- **Local Buyer:** Charge your own local VAT rate.

## Purchase and Download

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

‌**Step 1:** Go to our [**J2Commerce** website](https://www.j2commerce.com/)&#x20;

**Step 2:** Locate the **European VAT** App **->** click **View Details** **->** **Add to cart** **->** **Checkout**.&#x20;

**Step 3:** Go to your **My Download**s under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**

## Installing the Plugin

You can install this **European VAT** App using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**&#x20;

Upload the plugin ZIP file or use the install from URL option.

![](/img/autho-install5.webp)

## Enable the App

:::info

**NOTE**: You must enable the **EU VAT Plugin** to automate the verification of VAT IDs against the EU database. Without this, you cannot reliably distinguish between B2B and B2C transactions.

:::

Once you have installed the extension, you will need to enable it. There are **two** ways you can access the Apps.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

![](/img/eu-digital.webp)

Look for **European VAT** click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

## Store Configuration

Go to **J2Commerce** -> **Setup** -> **Configuration** -> **Store** tab.

![](/img/eu-digital-config.webp)

Set the Default Country to the **United Kingdom**.

Set your Default Zone to **Bristol**

## Create a Geozone for Europe

Create a geozone that covers Europe (or your specific province).

There are **two** ways you can access the Geozones.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Localization** -> **Geozones**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Localization** -> **Geozones**

![](/img/canada-geozone.webp)

- Click **New** to create a new geozone.

- Fill in the fields:

Unlike physical goods, you must create rates for the different VAT percentages across the EU:

- Create a **Geo Zone** for your home country **->** Create a **Tax Rate** for your local VAT.

- Create **Geo Zones** for other EU countries (or groups of countries with the same rate, e.g., "EU 20% Zone") **->** Create the corresponding **Tax Rates**.

## Set Up the Digital Tax Profile

1. Go to **Localisation** -> **Tax Profiles** -> **New**.
2. **Name:** `Digital Goods Tax Profile`.
3. **Rules:** Add all the various EU VAT rates you created.
4. **Associated Address:** Set this to **Billing Address** (as digital goods are delivered to the buyer's legal residence).

### 5. Assign to Products

1. Edit the Joomla article for your digital product.
2. In the **J2Commerce** tab, select the `Digital Goods Tax Profile`.

## Summary of Logic

| Buyer Location   | VAT ID Status | VAT Applied         |
| ---------------- | ------------- | ------------------- |
| Seller's Country | Any           | Seller's Local Rate |
| Other EU Country | Valid         | 0% (Exempt)         |
| Other EU Country | Invalid/None  | Buyer's Local Rate  |
| Outside EU       | Any           | 0% (Exempt)         |

## Tips

- Create geozone groups for countries with the same VAT rate to reduce configuration work
- Test with addresses from different EU countries to verify correct VAT rates apply
- The EU VAT plugin validates VAT numbers against the official VIES database in real-time

## Troubleshooting

### Wrong VAT rate for digital products

**Cause:** The geozone for a specific country has the wrong rate or is missing.

**Solution:** Create a geozone for each unique VAT rate group (e.g., "EU 20% Zone" for countries with 20% VAT) and add the corresponding tax rate.

### VAT not applied to EU customers

**Cause:** The product does not have a tax profile assigned.

**Solution:** Edit the product article, go to the J2Commerce tab, and select the "Digital Goods Tax Profile."

### 0% VAT showing for B2C customers

**Cause:** The VAT validation plugin may be treating all customers as businesses.

**Solution:** Verify the customer is not entering a VAT number. If they are, the plugin will validate it. Ensure the checkout process clearly separates B2C (individuals) from B2B (companies with VAT IDs).
