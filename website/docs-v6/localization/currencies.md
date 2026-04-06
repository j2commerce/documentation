---
title: "Currencies"
sidebar_label: "Currencies"
sidebar_position: 4
description: "Configure multiple currencies for international sales with exchange rates and formatting options."
---

# Currencies

The Currencies feature allows you to configure multiple currencies for your J2Commerce store. When selling internationally, customers may prefer to see prices and pay in their local currency. J2Commerce supports multi-currency stores with configurable exchange rates and formatting options.

## Requirements

- PHP 8.3.0+
- Joomla 6.x
- J2Commerce 6.x

## Accessing Currencies

Currencies are managed from the J2Commerce Dashboard.

1. Go to **Components** -> **J2Commerce** -> **Dashboard**.
2. Click **Localisation** in the left sidebar.
3. Click **Currencies**.

![Currencies list](/img/localisation-currencies.webp)

## Currency List

The Currencies list displays all currencies configured in your store. Each currency shows:

| Column | Description |
|--------|-------------|
| **Checkbox** | Select currencies for batch actions. |
| **Currency Name** | The display name of the currency. |
| **Code** | The 3-letter ISO 4217 currency code. |
| **Symbol** | The currency symbol displayed with prices. |
| **Value** | The exchange rate relative to your base currency. |
| **Status** | Published (green check) or Unpublished (red X). |
| **Ordering** | Drag-and-drop to reorder the display sequence. |

## Adding a Currency

1. Click the **New** button in the toolbar.
2. Fill in the currency details (see Configuration below).
3. Click **Save** or **Save & Close**.

![Currency edit form](/img/localisation-currency-edit.webp)

## Configuration

| Field | Description | Required | Default | Example |
|-------|-------------|----------|---------|---------|
| **Currency Name** | The display name shown to customers and in admin lists. | Yes | — | `British Pound` |
| **Currency Code** | The 3-letter ISO 4217 currency code. Must be exactly 3 characters, uppercase. | Yes | — | `GBP` |
| **Currency Symbol** | The symbol displayed with prices. | Yes | — | `£` |
| **Symbol Position** | Where to display the symbol relative to the amount. | Yes | Before | Before or After |
| **Decimal Places** | Number of decimal places to display. | Yes | 2 | 2 (most currencies) |
| **Decimal Separator** | Character separating whole and decimal amounts. | Yes | `.` | `.` or `,` |
| **Thousands Separator** | Character separating thousands groups. | Yes | `,` | `,` or `.` or space |
| **Exchange Rate** | Conversion value relative to your base currency. | Yes | 1.00000000 | 1.27000 |
| **Status** | Set to Published to make the currency available. | Yes | Published | — |

### Currency Code Standards

Currency codes must follow **ISO 4217** standards:

- **USD** — United States Dollar
- **EUR** — Euro
- **GBP** — British Pound Sterling
- **CAD** — Canadian Dollar
- **AUD** — Australian Dollar
- **JPY** — Japanese Yen
- **CNY** — Chinese Yuan
- **INR** — Indian Rupee

### Symbol Position Examples

| Position | Symbol | Amount | Display |
|----------|--------|--------|---------|
| Before | `$` | 99.99 | `$99.99` |
| After | `€` | 99.99 | `99.99€` |

### Decimal and Thousands Separator Examples

Different regions use different formatting:

| Region | Decimal | Thousands | Example |
|--------|---------|-----------|---------|
| US/UK | `.` | `,` | 1,234.56 |
| EU (most) | `,` | `.` | 1.234,56 |
| Switzerland | `.` | `'` | 1'234.56 |

### Exchange Rate

The exchange rate is relative to your **base currency** (the currency with a value of 1.00000000):

- **Base Currency**: Value = 1.00000000
- **Other Currencies**: Value = conversion rate from base currency

For example, if your base currency is USD and you want to add GBP:
- If 1 GBP = 1.27 USD, the GBP exchange rate is **1.27000**
- If 1 EUR = 1.08 USD, the EUR exchange rate is **1.08000**

The system uses 8 decimal places for precise calculations.

## Base Currency

Your base currency is identified by having an exchange rate of **1.00000000**. This is the currency in which:
- Product prices are stored in the database
- Reports and statistics are calculated
- Payment gateways receive payment amounts (unless multi-currency payments are enabled)

To change your base currency:

1. Set the new currency's exchange rate to `1.00000000`.
2. Update all other currency exchange rates relative to the new base.
3. Update your store configuration to reflect the new default currency.

## How Currencies Are Used

Currencies are referenced throughout J2Commerce:

1. **Product Pricing** — Products have a base price in your store's default currency.
2. **Checkout** — Customers can select their preferred currency during checkout (if multiple currencies are published).
3. **Order Totals** — Orders record the currency used and the converted amounts.
4. **Reports** — Sales reports can display totals in any published currency.
5. **Currency Converter** — The optional Currency Converter app can automatically update exchange rates.

## Exchange Rate Updates

Exchange rates fluctuate constantly. You have several options for keeping rates current:

### Manual Updates

Edit each currency and update the **Exchange Rate** field as needed.

### Currency Updater App

J2Commerce includes a Currency Updater app that can automatically fetch exchange rates from external services:

1. Go to **J2Commerce** -> **Apps**.
2. Enable the **Currency Updater** app.
3. Configure the app with your preferred exchange rate provider.
4. Set the update frequency (daily, weekly, etc.).

## Bulk Actions

Use the toolbar to perform actions on multiple currencies:

- **Publish** — Enable selected currencies.
- **Unpublish** — Disable selected currencies.
- **Archive** — Move selected currencies to archive.
- **Trash** — Move selected currencies to trash.
- **Check-in** — Release any checked-out currencies.

## Search and Filter

Use the search and filter options to find currencies:

- **Search** — Type a currency name, code, or symbol to filter the list.
- **ID Search** — Type `id:123` to find a currency by its ID.
- **Status Filter** — Filter by Published, Unpublished, Archived, or Trashed.

## Tips

- **Keep base currency at 1.0** — Your default currency should always have an exchange rate of 1.00000000.
- **Use ISO 4217 codes** — Always use standard 3-letter currency codes for compatibility with payment gateways.
- **Update rates regularly** — Exchange rates change daily. Set up automatic updates or update manually at least weekly.
- **Test currency display** — After configuring currencies, view your storefront to verify symbols and formatting display correctly.
- **Consider currency rounding** — When converting prices, small differences may appear due to decimal precision. Most stores round to the nearest cent/penny.

## Troubleshooting

### Currency Not Appearing in Storefront

**Cause:** The currency is unpublished or has an invalid configuration.

**Solution:**

1. Go to **J2Commerce** -> **Localisation** -> **Currencies**.
2. Find the currency and check that **Status** shows Published (green check).
3. Verify the **Currency Code** is exactly 3 uppercase letters.
4. Verify the **Currency Symbol** is not empty.

### Prices Show Wrong Currency Symbol

**Cause:** The symbol position or symbol character is misconfigured.

**Solution:**

1. Edit the currency.
2. Check **Symbol Position** — set to "Before" for currencies like USD ($99.99), "After" for some European formats (99.99€).
3. Verify the **Currency Symbol** field contains the correct character.
4. Save and clear cache.

### Exchange Rate Not Updating

**Cause:** The Currency Updater app is disabled or misconfigured.

**Solution:**

1. Go to **J2Commerce** -> **Apps**.
2. Find **Currency Updater** and ensure it shows a green checkmark (enabled).
3. Click the app title to configure settings.
4. Verify your exchange rate provider API key is correct.
5. Check the update frequency and last update time.

### Currency Conversion Shows Wrong Amounts

**Cause:** Exchange rate precision or rounding settings.

**Solution:**

1. Edit the currency and verify the exchange rate has sufficient decimal places.
2. For most currencies, 5-8 decimal places in the exchange rate provide accurate conversions.
3. Check that **Decimal Places** matches your currency's standard (2 for most, 0 for JPY, 3 for some).

## Related Topics

- [Configuration](../configuration/index.md) — Set your default store currency.
- [Geozones](geozones.md) — Configure shipping and tax zones.
- [Order Statuses](order-statuses.md) — Manage order workflow states.