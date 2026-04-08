---
title: "US Sales Tax Configuration"
sidebar_label: "US Sales Tax"
sidebar_position: 2
description: "Configure sales tax for US-based stores with step-by-step instructions for setting up geozones, tax rates, and tax profiles."
---

# US Sales Tax Configuration

This guide walks you through setting up sales tax for a US-based J2Commerce store. The example uses Texas with an 8.5% sales tax rate, but you can adapt it to any state.

## Important Legal Notice

:::warning
US law requires you to collect sales tax in states where you have a physical presence — such as stores, distribution centers, or headquarters. Stores with annual revenues exceeding approximately $2 million should consider using a third-party tax provider for automated rate calculations. Consult a tax expert before making decisions. J2Commerce is not responsible for tax compliance.
:::

## Prerequisites

- J2Commerce installed and configured
- At least one product created
- Understanding of your state's sales tax rate

## Step 1: Create a Geozone

A geozone defines the geographic area where you charge tax.

1. Go to **J2Commerce** -> **Localization** -> **Geozones**.
2. Click **New** to create a new geozone.
3. Fill in the fields:

| Field | Value | Description |
|-------|-------|-------------|
| **Geozone Name** | Texas Zone | A descriptive name for this zone |
| **Country** | United States | Select from the dropdown |
| **Zone** | Texas | Select the specific state |
| **Status** | Enabled | Must be enabled to apply |

4. Click **Save & Close**.

<!-- SCREENSHOT: Geozones list showing New button and form fields -->

## Step 2: Create a Tax Rate

The tax rate defines the percentage to charge and where it applies.

1. Go to **J2Commerce** -> **Localization** -> **Tax Rates**.
2. Click **New** to create a new tax rate.
3. Fill in the fields:

| Field | Value | Description |
|-------|-------|-------------|
| **Name** | Sales Tax | A descriptive name (shown on invoices) |
| **Tax Percent** | 8.5 | Your state's sales tax rate |
| **Geo Zone** | Texas Zone | Select the geozone from Step 1 |
| **Enabled** | Yes | Must be enabled to apply |

4. Click **Save & Close**.

<!-- SCREENSHOT: Tax Rates edit form showing name, percentage, and geozone fields -->

## Step 3: Create a Tax Profile

A tax profile links the tax rate to an address type.

1. Go to **J2Commerce** -> **Localization** -> **Tax Profiles**.
2. Click **New** to create a new tax profile.
3. Fill in the fields:

| Field | Value | Description |
|-------|-------|-------------|
| **Name** | Default Tax Class | A descriptive name |
| **Enabled** | Yes | Must be enabled to apply |

4. In the **Tax Rules** section, click **Add**.
5. Configure the tax rule:

| Field | Value | Description |
|-------|-------|-------------|
| **Rate** | Sales Tax | Select the tax rate from Step 2 |
| **Associated Address** | Shipping Address | Use the shipping address for tax calculation |

6. Click **Save & Close**.

<!-- SCREENSHOT: Tax Profiles edit form showing tax rules section -->

## Step 4: Configure Global Tax Settings

Set how J2Commerce handles tax display and calculation.

1. Go to **J2Commerce** -> **Setup** -> **Configuration**.
2. Click the **Tax** tab.
3. Configure the following settings:

| Setting | Value | Description |
|---------|-------|-------------|
| **Prices entered with tax** | No, I will enter prices EXCLUSIVE of tax | US stores typically enter prices without tax |
| **Calculate tax based on** | Shipping address | Tax is calculated based on where goods are shipped |
| **Default customer address** | Store address | Used when customer address is not yet known |
| **Display prices in product pages** | Excluding tax | Show prices without tax |
| **Display tax information below prices** | (Optional) Example: (Incl. 8.5% tax) | Shows tax info below the price |
| **Display prices in cart/checkout** | Excluding tax | Show prices without tax |
| **Apply discounts** | Before tax | Discounts reduce the pre-tax amount |

4. Click **Save**.

<!-- SCREENSHOT: Configuration Tax tab showing all settings -->

## Step 5: Apply Tax Profile to Products

Each product must have a tax profile assigned for tax to apply.

1. Go to **Content** -> **Articles** and open a product article.
2. Click the **J2Commerce** tab (or **J2Store Cart** tab in older versions).
3. Go to the **General** tab.
4. Find the **Tax Profile** field and select your tax class (e.g., "Default Tax Class").
5. Click **Save**.

<!-- SCREENSHOT: Article edit form showing J2Commerce tab with Tax Profile dropdown -->

:::danger Important
If you do not select a tax profile for a product, tax will NOT be applied in the storefront. Every taxable product must have a tax profile assigned.
:::

## Multiple State Tax Example

If you need to collect tax in multiple states, create additional geozones and tax rates:

1. Create a geozone for each state (e.g., "California Zone", "New York Zone")
2. Create a tax rate for each state with the correct percentage
3. Add all tax rates to your single tax profile with "Shipping Address" as the associated address

J2Commerce will automatically apply the correct rate based on the customer's shipping address.

## Video Tutorial

A video tutorial demonstrating this setup is available at:
https://www.youtube.com/watch?v=n1sZ5Udbm3Q

## Tips

- Keep your tax rates up to date as state rates change
- Consider using the [Advanced Tax Rates App](../apps-and-extensions/apps/app-taxrate.md) for complex scenarios with multiple jurisdictions
- Test your tax configuration with different addresses before going live

## Troubleshooting

### Tax is not being applied at checkout

**Cause:** The product does not have a tax profile assigned.

**Solution:** Edit the product article, go to the J2Commerce tab, and select a tax profile in the General tab.

### Tax shows the wrong rate

**Cause:** The geozone or tax rate is misconfigured.

**Solution:**
1. Verify the geozone includes the correct state
2. Check that the tax rate percentage is correct
3. Ensure the tax rate is enabled

### Tax appears for customers outside my state

**Cause:** The geozone is configured for all zones instead of a specific state.

**Solution:** Edit the geozone and change "Zone" from "All zones" to your specific state.

## Related Topics

- [Geozones](../localisation/geozones.md)
- [Tax Rates](../localisation/tax-rates.md)
- [Tax Profiles](../localisation/tax-profiles.md)
- [How Tax is Calculated](./tax-calculation.md)