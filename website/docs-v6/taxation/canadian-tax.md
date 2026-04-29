# Canadian Tax Configuration (GST/PST)

This guide explains how to configure tax for Canadian stores, using Saskatchewan (5% GST + 5% PST) as an example. Canadian stores often need to charge multiple taxes that compound.

## Important Legal Notice

:::warning
The information and examples provided are for general informational purposes only and do not constitute tax or legal advice. J2Commerce and its employees or affiliates make no representations or warranties regarding accuracy or applicability and accept no liability for VAT or tax compliance. Tax regulations, including but not limited to, US, CANADIAN tax or EU VAT rules for digital and physical goods, are complex and subject to change. Users are solely responsible for ensuring compliance and should consult a qualified tax advisor.
:::

## Prerequisites

- J2Commerce is installed and configured
- At least one product created
- Knowledge of your province's GST and PST rates

## Understanding Canadian Tax

Canadian stores typically charge two taxes:

1. **GST (Goods and Services Tax)** — Federal tax applied nationwide
2. **PST (Provincial Sales Tax)** — Provincial tax that varies by province

Some provinces use **HST (Harmonized Sales Tax)**, which combines both into a single rate.

| Province         | GST | PST/HST      | Total Rate |
| ---------------- | --- | ------------ | ---------- |
| Alberta          | 5%  | 0%           | 5%         |
| British Columbia | 5%  | 7%           | 12%        |
| Manitoba         | 5%  | 7%           | 12%        |
| Ontario          | 5%  | 8% (HST)     | 13%        |
| Saskatchewan     | 5%  | 6%           | 11%        |
| Quebec           | 5%  | 9.975% (QST) | 14.975%    |

## Step 1: Create a Geozone for Canada

Create a geozone that covers Canada (or your specific province).

There are **two** ways you can access the Geozones.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Localization** -> **Geozones**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Localization** -> **Geozones**

![](/img/canada-geozone.webp)

- Click **New** to create a new geozone.

- Fill in the fields:

| Field            | Value     | Description                                         |
| ---------------- | --------- | --------------------------------------------------- |
| **Geozone Name** | Canada    | A descriptive name                                  |
| **Country**      | Canada    | Select from dropdown                                |
| **Zone**         | All zones | Covers all provinces, or select a specific province |

![](/img/canada-saskatchewan2.webp)

:::tip

For province-specific tax (like Saskatchewan PST), create a geozone for just that province instead of all zones.

:::

## Step 2: Create the GST Tax Rate

Create the federal GST rate.

- Go to **J2Commerce** -> **Localization** -> **Tax Rates**.

![](/img/canada-tax-rate.webp)

- Click **New** to create a new tax rate.

- Fill in the fields:

| Field           | Value      | Description                    |
| --------------- | ---------- | ------------------------------ |
| **Name**        | Canada-GST | Descriptive name for GST       |
| **Tax Percent** | 5          | Current GST rate               |
| **Geo Zone**    | Canada     | Select the geozone from Step 1 |
| **Status**      | Published  | Must be Published              |

![](/img/canada-tax-rate2.webp)

## Step 3: Create the PST Tax Rate

Create the provincial sales tax rate.

1. Go to **J2Commerce** -> **Localization** -> **Tax Rates**.
2. Click **New** to create another tax rate.
3. Fill in the fields:

| Field           | Value             | Description                             |
| --------------- | ----------------- | --------------------------------------- |
| **Name**        | Saskatchewan-PST  | Descriptive name for PST                |
| **Tax Percent** | 6                 | Saskatchewan PST rate                   |
| **Geo Zone**    | Saskatchewan Zone | Select or create a Saskatchewan geozone |
| **Status**      | Published         | Must be published                       |

![](/img/canada-tax-rate3.webp)

## Step 4: Create a Tax Profile

Combine both tax rates in a single tax profile.

- Go to **J2Commerce** -> **Localization** -> **Tax Profiles**.

![](/img/canada-tax-profile.webp)

- Click **New** to create a new tax profile.

**Basic Details tab**

- Fill in the fields:

| Field      | Value            | Description       |
| ---------- | ---------------- | ----------------- |
| **Name**   | Canada Tax Class | Descriptive name  |
| **Status** | Published        | Must be published |

![](/img/canada-tax-profile1.webp)

**Tax Rules tab**

- In the **Tax Rules** section, click **Add** twice to create two rules.

- Configure the **first** rule:

| Field            | Value            | Description          |
| ---------------- | ---------------- | -------------------- |
| **Tax Rate**     | Canada-GST       | Select the GST rate  |
| **Address Type** | Shipping Address | Use shipping address |

- Configure the **second** rule:

| Field            | Value            | Description          |
| ---------------- | ---------------- | -------------------- |
| **Tax Rate**     | Saskatchewan-PST | Select the PST rate  |
| **Address Type** | Shipping Address | Use shipping address |

![](/img/canada-tax-profile3.webp)

## Step 5: Configure Global Tax Settings

Configure how J2Commerce handles tax display and calculation.

- Go to **J2Commerce** -> **Setup** -> **Configuration**.

- Click the **Product Settings** tab.

![](/img/canada-tax-config.webp)

- Configure the following settings:

![](/img/canada-tax-config1.webp)

| Setting                      | Default            | Description                                                                                                                                                                                                     |
| ---------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prices Include Tax**       | Prices exclude tax | Are your product prices entered with tax included? Canadian stores typically enter prices without tax                                                                                                           |
| **Calculate tax based on**   | Shipping address   | Use the billing or shipping address for tax calculation. Tax based on destination                                                                                                                               |
| **Default Tax Address**      | Store address      | Address to use for tax when the customer has not entered an address. Used before the customer enters their address                                                                                              |
| **Price Display**            | Price Only         | How to display prices on product pages. Show prices without tax                                                                                                                                                 |
| **Show Tax Info**            | Never              | Display tax information text with prices. Show prices without tax                                                                                                                                               |
| **Combine Tax Calculations** | Yes                | Select 'Yes' to combine all applicable tax calculations into one line item at checkout. For example, Sales Tax on products and shipping will display as a single line item instead of two separate tax charges. |

## Step 6: Apply Tax Profile to Products

Each product must have the tax profile assigned.

1. Go to **Content** -> **Articles** and open a product article.
2. Click the **J2Commerce** tab.
3. Go to the **General** tab.
4. Find the **Tax Profile** field and select "Canada Tax Class".
5. Click **Save**.

![](/img/canada-tax-product.webp)

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
