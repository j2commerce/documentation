# Weights

The Weights feature allows you to configure measurement units for product weights. Weight units are essential for shipping carriers that calculate rates based on package weight, and for displaying product specifications to customers. J2Commerce supports automatic conversion between units, ensuring accurate shipping calculations regardless of the unit used for data entry.

## Requirements

- PHP 8.3.0+
- Joomla 6.x
- J2Commerce 6.x

## Locating Weights

Weights are managed from the J2Commerce Dashboard.

There are **two** ways you can access the Weights.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Localization -> Weights**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Localization -> Weights**

![](/img/tax-profiles.webp)

## Weight List

The Weights list displays all weight units configured in your store. Each unit shows:

**Weight Title:** The display name of the unit. **Example:** `Kilogram`

**Unit:** The short symbol for the unit (1-4 characters). **Example:** `kg`

**Conversion Value:** The multiplier to convert to the base unit. Base unit has value 1.00000000.  **Example:** `0.45359237` for pound

- **Base Unit**: Value = 1.00000000 (e.g., if kilogram is your base unit)
- **Gram**: Value = 0.001 (1 g = 0.001 kg)
- **Pound (lb)**: Value = 0.45359237 (1 lb = 0.45359237 kg)
- **Ounce (oz)**: Value = 0.02834952 (1 oz = 0.02834952 kg)
- **Milligram**: Value = 0.000001 (1 mg = 0.000001 kg)

To calculate the conversion value:

```
conversion_value = number_of_base_units_in_this_unit
```

**Decimal Places:** Number of decimal places to display for this unit. **Example:** `2`&#x20;

| Unit      | Decimal Places | Example Display |
| --------- | -------------- | --------------- |
| Milligram | 0              | `500 mg`        |
| Gram      | 2              | `150.25 g`      |
| Kilogram  | 3              | `1.525 kg`      |
| Pound     | 2              | `2.50 lb`       |
| Ounce     | 1              | `8.5 oz`        |

**Status:** Set to **Published** to make the unit available.

## Adding a New Weight Unit

1. Click the **New** button in the toolbar.
2. Fill in the unit details (see Configuration below).
3. Click **Save** or **Save & Close**.

![Weight edit form](/img/weight-new.webp)

## Base Unit

Your **base unit** is the unit with a conversion value of **1.00000000**. This is the unit in which:

- Product weights are stored in the database
- Shipping calculations are performed
- Internal calculations happen

All other units are defined relative to this base unit.

### Choosing a Base Unit

Select your base unit based on your primary market and shipping carriers:

**International:** Kilogram (kg)

**United States:** Pound (lb)

**Jewellery/Small items:** Gram (g)

## Common Weight Units

| Weight Title | Unit | Conversion Value (base: kg) | Decimal Places |
| ------------ | ---- | --------------------------- | -------------- |
| Milligram    | mg   | 0.000001                    | 0              |
| Gram         | g    | 0.001                       | 2              |
| Kilogram     | kg   | 1.00000000                  | 3              |
| Metric Tonne | t    | 1000                        | 2              |
| Ounce        | oz   | 0.02834952                  | 1              |
| Pound        | lb   | 0.45359237                  | 2              |
| Stone        | st   | 6.35029                     | 2              |
| US Ton       | ton  | 907.185                     | 2              |

## How Weight Units Are Used

Weight units are referenced throughout J2Commerce:

### Product Weight

1. Products have a weight attribute for shipping calculations.
2. Weight is entered in the product's selected unit.
3. The system converts to the base unit for storage and calculation.

### Shipping Rate Calculation

1. Shipping carriers often use weight to calculate rates.
2. J2Commerce converts product weights to the carrier's required unit.
3. Total order weight = sum of (product weight × quantity) for all items.

### Dimensional Weight

Some carriers use dimensional weight instead of actual weight:

1. Dimensional weight = (Length × Width × Height) / carrier divisor.
2. The carrier charges for whichever is greater: actual weight or dimensional weight.
3. This is why both weight and length units must be configured correctly.

## Setting the Product weight

Open the product **-> J2Commerce** tab **->  Shipping** tab

**The image below shows how the weight is configured on a product. Go to the product**&#x20;

![](/img/tax-products.webp)

## Frontend Product Display

- Customers see weight in their preferred unit.

- The store can display weight in any published unit.

![](/img/tax-frontend.webp)

## Weight Calculation Examples

### Example 1: Order Weight Calculation

A customer orders:

- Product A: 0.5 kg × 2 units = 1.0 kg
- Product B: 0.25 kg × 3 units = 0.75 kg
- Product C: 1.2 kg × 1 unit = 1.2 kg

Total weight = 2.95 kg

Shipping carrier requires weight in pounds:

- 2.95 kg ÷ 0.45359237 = 6.50 lb

### Example 2: Product Weight Entry

A store uses kilograms as the base unit. A product weighs 500 grams:

1. Staff enters weight in grams: `500`
2. Staff selects unit: `Gram`
3. System converts: 500 g × 0.001 = 0.5 kg (stored)
4. Customer viewing in pounds sees: 0.5 kg ÷ 0.45359237 = 1.10 lb

## Tips

- **Set one base unit** — Only one unit should have a value of 1.00000000.
- **Use standard abbreviations** — Use ISO or common abbreviations for units (kg, lb, g, oz).
- **Match your carriers** — Choose units familiar to your primary shipping carriers.
- **Verify conversions** — Double-check conversion values against known conversions.
- **Consider precision** — Set appropriate decimal places for each unit (mg=0, g=2, kg=3).
- **Use accurate weights** — Incorrect weights lead to shipping charge adjustments.

## Troubleshooting

### Shipping Rates Too Low/High

**Cause:** Incorrect product weight or wrong conversion values.

**Solution:**

1. Verify product weights are entered correctly.
2. Check the weight unit selected for each product.
3. Review weight unit conversion values.
4. Compare the calculated weight against the carrier's weight requirement.

### Weight Showing Wrong Values

**Cause:** Incorrect conversion value for the unit.

**Solution:**

1. Go to **J2Commerce** -> **Localisation** -> **Weights**.
2. Find the problematic unit and edit it.
3. Verify the **Conversion Value** is correct.
4. Compare against known conversions (e.g., 1 lb = 0.45359237 kg).

### Product Weight Not Saving

**Cause:** Weight unit not published or invalid value.

**Solution:**

1. Verify that at least one weight unit is published.
2. Check that the unit's conversion value is greater than 0.
3. Clear the Joomla cache after changing units.

### Unit Not Appearing in Dropdown

**Cause:** The unit is unpublished.

**Solution:**

1. Go to **J2Commerce -> Localisation -> Weights**.
2. Find the unit and check that **Status** shows Published (green check).
3. If unpublished, click the status icon to publish it.

### Weight Conversion Errors

**Cause:** Rounding errors in conversion values.

**Solution:**

1. Use 8 decimal places for conversion values for maximum precision.
2. Example: Use `0.45359237` for pounds (not `0.454`).
3. This ensures accurate calculations for small weights.
