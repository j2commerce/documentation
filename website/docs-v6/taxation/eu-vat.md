---
title: "EU VAT Configuration"
sidebar_label: "EU VAT"
sidebar_position: 4
description: "Configure VAT for EU-based stores with step-by-step instructions for setting up geozones, tax rates, and tax profiles for European Union countries."
---

# EU VAT Configuration

This guide explains how to configure Value Added Tax (VAT) for stores based in the European Union. The example uses Germany with a 19% VAT rate, but you can adapt it to any EU country.

## Important Legal Notice

:::warning
This is example configuration. J2Commerce is not responsible for VAT/Tax compliance. VAT rules change frequently. Consult a tax expert before making decisions.
:::

## Understanding EU VAT Pricing

EU stores typically display prices **including VAT**. When you enter a product price of €100, customers see €100 (with the VAT already calculated into that price).

## Recommended Step-by-Step Setup

### Step 1: Create a Geozone for Base Rates
1. Go to **J2Commerce** -> **Localisation** -> **Geozones**.
2. Click **New**.
3. Enter the following:
   - **Geozone Name:** `Base rates`
   - **Country:** `Germany`
   - **Zones:** `All`
4. Click **Save**.

### Step 2: Create a Tax Rate
1. Go to **J2Commerce** -> **Localisation** -> **Tax Rates**.
2. Click **New**.
3. Enter the following:
   - **Name:** `VAT`
   - **Tax Percent:** `19`
   - **Geozone:** `Base rates`
   - **Status:** `Enabled`
4. Click **Save**.

### Step 3: Create a Tax Profile and Rules
1. Go to **J2Commerce** -> **Localisation** -> **Tax Profiles**.
2. Click **New**.
3. Enter the following:
   - **Name:** `Base Tax Profile`
   - **Enabled:** `Yes`
4. In the **Tax Rules** section, click **Add**, select the **VAT** rate, and set the **Associated Address** to **Shipping**.
5. Click **Save**.

### Step 4: Configure General Tax Settings
Because EU prices are generally displayed inclusive of tax, use these settings:

1. Go to **J2Commerce** -> **Setup** -> **Configuration**.
2. Navigate to the **Tax** tab.
3. Set the following values:

| Setting | Value | Description |
|----------|-------|-------------|
| **Prices Entered with Tax** | `Yes` | Prices in the backend include VAT. |
| **Calculate tax based on** | `Shipping address` | VAT is based on where the item is sent. |
| **Default Customer address** | `Store address` | Default to your home country. |
| **Display prices on product pages** | `Including tax` | Customers see the final price. |
| **Display prices in cart / checkout** | `Including tax` | Show inclusive prices. |
| **Apply discounts** | `After tax` | Discounts are applied to the gross price. |

4. Click **Save**.

### Step 5: Assign Tax Profile to Products
1. Open the **Article Manager** and edit your product.
2. Go to the **J2Commerce** tab $\rightarrow$ **General** tab.
3. Select **Base Tax Profile** from the **Tax Profile** dropdown.
4. Click **Save**.

## Selling to Multiple EU Countries

If you sell across Europe, you have two options for managing different VAT rates:

### Option A: Same VAT Rate
If other countries use the same rate (e.g., 19%), simply edit your **Base rates** Geozone and add those additional countries to the list.

### Option B: Different VAT Rates
1. Create a new **Geozone** for the specific countries (e.g., "France & Italy").
2. Create a new **Tax Rate** with the correct percentage (e.g., 20%).
3. Open your **Base Tax Profile** and add a new rule mapping this new tax rate to the **Shipping address**.

## Digital Goods Note

For digital products, EU law requires charging VAT based on the **buyer's location**. For this, we recommend using the **EU VAT Plugin**, which automates VAT number validation and handles B2B (0% VAT) vs. B2C transactions.
