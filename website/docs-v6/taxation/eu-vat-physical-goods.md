---
title: "EU VAT for Physical Goods"
sidebar_label: "Physical Goods VAT"
sidebar_position: 5
description: "Implement VAT rules for shipping physical products within the EU using the European VAT plugin for automatic validation."
---

# EU VAT for Physical Goods

When selling physical goods within the European Union, the VAT applied depends on the buyer's location and VAT registration status. J2Commerce offers a VAT plugin that validates VAT numbers automatically and applies the correct tax rules.

## Important Legal Notice

:::warning
This is example configuration. J2Commerce is not responsible for VAT/Tax compliance. EU VAT rules change frequently. Consult a tax expert before making decisions.
:::

## How VAT Applies to Physical Goods

| Buyer Type            | Location          | VAT Number          | Tax Applied             |
| --------------------- | ----------------- | ------------------- | ----------------------- |
| Individual or Company | Your home country | Any                 | Your country's VAT rate |
| Individual            | Other EU country  | N/A                 | Your country's VAT rate |
| Company               | Other EU country  | **Invalid or None** | Your country's VAT rate |
| Company               | Other EU country  | **Valid**           | 0% VAT (reverse charge) |
| Individual or Company | Non-EU country    | Any                 | 0% VAT (export)         |

The system follows these standard EU VAT principles:

| Buyer Type         | Location         | VAT Number       | Result                |
| ------------------ | ---------------- | ---------------- | --------------------- |
| Individual/Company | Home Country     | Any              | Home VAT Rate applied |
| Individual         | Other EU Country | N/A              | Home VAT Rate applied |
| Company            | Other EU Country | **Invalid/None** | Home VAT Rate applied |
| Company            | Other EU Country | **Valid**        | **0% VAT**            |
| Individual/Company | Non-EU           | Any              | **0% VAT**            |

## Store Configuration

Go to **J2Commerce** -> **Setup** -> **Configuration** -> **Store** tab.

Set the Default Country to your home country. ie; United Kingdom

Set the State/Province

![](/img/eu-digital-config.webp)

### 1. Install the VAT Plugin

To automate the validation of VAT numbers against the official EU database (VIES), you must install the **VAT Plugin** from the J2Commerce Extensions store.

### 2. Configure Store Profile

Ensure your store location is accurate:

1. Go to **J2Commerce** -> **Setup** -> **Configuration**.
2. In the **Store** tab, set your **Country Name** and **Zone Name**.

### 3. Define the VAT Geo Zone

Group all taxable EU countries together.

1. Go to **Localisation** -> **Geo Zones** -> **New**.
2. **Name:** `VAT Zone`.
3. **Important:** Add your home country **AND all other EU countries** to this Geo Zone. This ensures that EU residents without a valid VAT number are charged your home rate.

### 4. Set the VAT Rate

1. Go to **Localisation** -> **Tax Rates** -> **New**.
2. **Name:** `VAT Rate`.
3. **Tax Percent:** Enter your home country's VAT percentage (e.g., `21`).
4. **Geo Zone:** Select the `VAT Zone` created above.

### 5. Create the Tax Profile

1. Go to **Localisation** -> **Tax Profiles** -> **New**.
2. **Tax Profile Name:** `Physical Goods Tax Profile`.
3. **Mapping:** Add a rule selecting the `VAT Rate` and set the **Associated Address** to **Billing Address**.

### 6. Apply to Products

1. Go to **Content** -> **Articles** and edit your product.
2. In the **J2Commerce** tab, select the `Physical Goods Tax Profile` from the **Tax Profile** dropdown.

## Tips

- **B2B Transactions:** The VAT plugin is critical for B2B sales. When a customer enters a valid VAT number, J2Commerce will automatically zero out the tax for that order.
- **Non-EU Exports:** By not adding non-EU countries to your "VAT Zone," J2Commerce will automatically apply 0% VAT to those orders.

## Troubleshooting

### Tax shows for EU businesses with valid VAT ID

**Cause:** The VAT number validation plugin is not installed or not enabled.

**Solution:** Install the European VAT plugin from the J2Commerce Extensions Store and enable it in **System** -> **Manage** -> **Plugins**.

### Non-EU customers are charged VAT

**Cause:** Your VAT Zone geozone includes non-EU countries.

**Solution:** Edit the VAT Zone and ensure only EU countries are included. Non-EU customers should not match any tax geozone.

### VAT applies for all products when it shouldn't

**Cause:** Products have a tax profile assigned when they should be exempt.

**Solution:** Edit the exempt products and set **Tax Profile** to "None" or create a separate "No Tax" profile.

## Related Topics

- [Geozones](../localisation/geozones.md)
- [Tax Rates](../localisation/tax-rates.md)
- [Tax Profiles](../localisation/tax-profiles.md)
- [EU VAT Configuration](./eu-vat.md)
- [How Tax is Calculated](./tax-calculation.md)
