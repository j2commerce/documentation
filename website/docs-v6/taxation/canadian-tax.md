---
title: "Canadian Tax Configuration (GST/PST)"
sidebar_label: "Canadian Tax"
sidebar_position: 3
description: "Configure GST and PST for Canadian stores with step-by-step instructions for setting up combined tax rates."
---

# Canadian Tax Configuration (GST/PST)

This guide explains how to configure tax for Canadian stores, using Saskatchewan (5% GST + 5% PST) as an example. Canadian stores often need to charge multiple taxes that compound.

## Important Legal Notice

:::warning
This is example configuration. J2Commerce is not responsible for tax compliance. Tax rates change frequently. Consult a tax expert before making decisions.
:::

## Prerequisites

- J2Commerce installed and configured
- At least one product created
- Knowledge of your province's GST and PST rates

## Understanding Canadian Tax

Canadian stores typically charge two taxes:

1. **GST (Goods and Services Tax)** — Federal tax applied nationwide
2. **PST (Provincial Sales Tax)** — Provincial tax that varies by province

Some provinces use **HST (Harmonized Sales Tax)**, which combines both into a single rate.

| Province | GST | PST/HST | Total Rate |
|----------|-----|---------|------------|
| Alberta | 5% | 0% | 5% |
| British Columbia | 5% | 7% | 12% |
| Manitoba | 5% | 7% | 12% |
| Ontario | 5% | 8% (HST) | 13% |
| Saskatchewan | 5% | 6% | 11% |
| Quebec | 5% | 9.975% (QST) | 14.975% |

## Step 1: Create a Geozone for Canada

Create a geozone that covers Canada (or your specific province).

1. Go to **J2Commerce** -> **Localization** -> **Geozones**.
2. Click **New** to create a new geozone.
3. Fill in the fields:

| Field | Value | Description |
|-------|-------|-------------|
| **Geozone Name** | Canada | A descriptive name |
| **Country** | Canada | Select from dropdown |
| **Zone** | All zones | Covers all provinces, or select a specific province |

4. Click **Save & Close**.

:::tip
For province-specific tax (like Saskatchewan PST), create a geozone for just that province instead of all zones.
:::

<!-- SCREENSHOT: Geozones form with Canada selected -->

## Step 2: Create the GST Tax Rate

Create the federal GST rate.

1. Go to **J2Commerce** -> **Localization** -> **Tax Rates**.
2. Click **New** to create a new tax rate.
3. Fill in the fields:

| Field | Value | Description |
|-------|-------|-------------|
| **Name** | Canada-GST | Descriptive name for GST |
| **Tax Percent** | 5 | Current GST rate |
| **Geo Zone** | Canada | Select the geozone from Step 1 |
| **Enabled** | Yes | Must be enabled |

4. Click **Save & Close**.

<!-- SCREENSHOT: Tax Rates form showing GST rate -->

## Step 3: Create the PST Tax Rate

Create the provincial sales tax rate.

1. Go to **J2Commerce** -> **Localization** -> **Tax Rates**.
2. Click **New** to create another tax rate.
3. Fill in the fields:

| Field | Value | Description |
|-------|-------|-------------|
| **Name** | Saskatchewan-PST | Descriptive name for PST |
| **Tax Percent** | 6 | Saskatchewan PST rate |
| **Geo Zone** | Saskatchewan Zone | Select or create a Saskatchewan geozone |
| **Enabled** | Yes | Must be enabled |

4. Click **Save & Close**.

<!-- SCREENSHOT: Tax Rates form showing PST rate -->

## Step 4: Create a Tax Profile

Combine both tax rates in a single tax profile.

1. Go to **J2Commerce** -> **Localization** -> **Tax Profiles**.
2. Click **New** to create a new tax profile.
3. Fill in the fields:

| Field | Value | Description |
|-------|-------|-------------|
| **Name** | Canada Tax Class | Descriptive name |
| **Enabled** | Yes | Must be enabled |

4. In the **Tax Rules** section, click **Add** twice to create two rules.
5. Configure the first rule:

| Field | Value | Description |
|-------|-------|-------------|
| **Rate** | Canada-GST | Select the GST rate |
| **Associated Address** | Shipping Address | Use shipping address |

6. Configure the second rule:

| Field | Value | Description |
|-------|-------|-------------|
| **Rate** | Saskatchewan-PST | Select the PST rate |
| **Associated Address** | Shipping Address | Use shipping address |

7. Click **Save & Close**.

<!-- SCREENSHOT: Tax Profile form showing two tax rules -->

## Step 5: Configure Global Tax Settings

Configure how J2Commerce handles tax display and calculation.

1. Go to **J2Commerce** -> **Setup** -> **Configuration**.
2. Click the **Tax** tab.
3. Configure the following settings:

| Setting | Value | Description |
|---------|-------|-------------|
| **Prices entered with tax** | No, I will enter prices EXCLUSIVE of tax | Canadian stores typically enter prices without tax |
| **Calculate tax based on** | Shipping address | Tax based on destination |
| **Default customer address** | Store address | Used before customer enters address |
| **Display prices in product pages** | Excluding tax | Show prices without tax |
| **Display prices in cart/checkout** | Excluding tax | Show prices without tax |
| **Apply discounts** | Before tax | Discounts reduce pre-tax amount |

4. Click **Save**.

<!-- SCREENSHOT: Configuration Tax tab -->

## Step 6: Apply Tax Profile to Products

Each product must have the tax profile assigned.

1. Go to **Content** -> **Articles** and open a product article.
2. Click the **J2Commerce** tab.
3. Go to the **General** tab.
4. Find the **Tax Profile** field and select "Canada Tax Class".
5. Click **Save**.

:::danger Important
If you do not choose the tax profile, tax will NOT be applied in the storefront.
:::

## How Tax Appears in Checkout

With GST (5%) and PST (6%) configured:

- Product price: $100.00
- GST (5%): $5.00
- PST (6%): $6.00
- **Total**: $111.00

Both taxes are calculated on the base product price and displayed separately.

## Video Tutorial

A video tutorial demonstrating this setup is available at:
https://www.youtube.com/watch?v=bchu7-Zysb8

## Tips

- Update PST rates when provincial governments change them
- For HST provinces (Ontario, New Brunswick, etc.), create a single combined tax rate
- Quebec uses QST (Quebec Sales Tax) instead of PST — configure it the same way
- Consider using the [Advanced Tax Rates App](../apps-and-extensions/apps/app-taxrate.md) for complex multi-province scenarios

## Troubleshooting

### Both taxes don't appear at checkout

**Cause:** Both tax rules must use the same address type.

**Solution:** Verify that both GST and PST tax rules have "Associated Address" set to "Shipping Address" (or both set to "Billing Address").

### PST shows for all provinces instead of just one

**Cause:** The PST geozone is set to "All zones" instead of a specific province.

**Solution:** Create a geozone for just your province and assign the PST rate to that geozone.

### Tax total seems incorrect

**Cause:** Tax rates may be compounding incorrectly.

**Solution:** Ensure both taxes use the same "Associated Address" and check that the "Apply discounts" setting is set to "Before tax."

## Related Topics

- [Geozones](../localisation/geozones.md)
- [Tax Rates](../localisation/tax-rates.md)
- [Tax Profiles](../localisation/tax-profiles.md)
- [US Sales Tax Configuration](./us-sales-tax.md)
- [How Tax is Calculated](./tax-calculation.md)