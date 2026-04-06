---
title: "Localisation"
sidebar_label: "Localisation"
sidebar_position: 1
description: "Configure regional settings for your J2Commerce store including countries, zones, currencies, geozones, taxes, order statuses, and measurement units."
---

# Localisation

J2Commerce provides comprehensive localisation features to help you configure your store for different regions and markets. From managing countries and currencies to setting up complex tax rules and order statuses, the localisation system ensures your store operates correctly for customers worldwide.

## Overview

Localisation in J2Commerce covers several key areas:

- **Countries and Zones** — Define the countries and regions (states, provinces, territories) for shipping and billing addresses.
- **Currencies** — Set up multiple currencies for international sales with automatic exchange rate support.
- **Geozones** — Create geographic zones that group countries and zones together for shipping rates and tax calculations.
- **Tax Profiles and Tax Rates** — Configure tax rules based on customer location and product types.
- **Order Statuses** — Manage the workflow states for customer orders.
- **Measurement Units** — Define weight and length units for products and shipping calculations.

## Accessing Localisation

All localisation features are accessed from the J2Commerce Dashboard:

**J2Commerce -> Dashboard -> Localisation**

The Localisation menu provides access to all regional configuration settings.

![Localisation menu](/img/localisation-menu.webp)

## Localisation Features

### Countries

Manage the list of countries available for shipping addresses, billing addresses, and tax calculations. Each country includes ISO standard codes for international compatibility.

[Learn more about Countries](countries.md)

### Zones

Define states, provinces, or regions within each country. Zones are essential for accurate shipping rate calculations and tax rules based on customer location.

[Learn more about Zones](zones.md)

### Currencies

Configure multiple currencies for international stores. Set exchange rates, currency symbols, and formatting options for each currency.

[Learn more about Currencies](currencies.md)

### Geozones

Create geographic zones by grouping countries and zones together. Geozones are used to apply shipping rates, tax rates, and payment method restrictions to specific regions.

[Learn more about Geozones](geozones.md)

### Order Statuses

Manage the status values that track orders through your store's workflow, from pending to shipped to completed.

[Learn more about Order Statuses](order-statuses.md)

### Tax Profiles

Create tax profiles (tax classes) that group tax rules together. Assign tax profiles to products to control which tax rates apply.

[Learn more about Tax Profiles](tax-profiles.md)

### Tax Rates

Define specific tax percentage rates that apply to geozones. Tax rates are linked to tax profiles and calculated based on customer location.

[Learn more about Tax Rates](tax-rates.md)

### Lengths

Configure measurement units for product dimensions (centimetres, inches, metres, etc.) used in shipping calculations and product specifications.

[Learn more about Lengths](lengths.md)

### Weights

Set up weight units (kilograms, pounds, ounces, etc.) for product weights and shipping rate calculations.

[Learn more about Weights](weights.md)

## Typical Configuration Order

For a new store, configure localisation features in this order:

1. **Countries** — Add or enable the countries you will ship to.
2. **Zones** — Add states, provinces, or regions for each country.
3. **Geozones** — Create zones that group countries for shipping and tax rules.
4. **Lengths** — Set up your default length unit and any additional units needed.
5. **Weights** — Set up your default weight unit and any additional units needed.
6. **Currencies** — Configure your base currency and any additional currencies.
7. **Tax Profiles** — Create tax profiles for different product types.
8. **Tax Rates** — Add tax rates linked to geozones and tax profiles.
9. **Order Statuses** — Customise order workflow statuses if needed.

## Requirements

- PHP 8.3.0 or higher
- Joomla 6.x
- J2Commerce 6.x

All localisation features are included with J2Commerce core and require no additional installation.
