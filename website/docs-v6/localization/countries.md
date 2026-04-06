---
title: "Countries"
sidebar_label: "Countries"
sidebar_position: 2
description: "Manage the list of countries available for shipping addresses, billing addresses, and tax calculations in your J2Commerce store."
---

# Countries

Countries form the foundation of localisation in J2Commerce. They define the geographic options available to customers during checkout, in shipping zones, and for tax calculations. Each country includes ISO standard codes that ensure compatibility with shipping carriers, payment gateways, and address validation services.

## Requirements

- PHP 8.3.0+
- Joomla 6.x
- J2Commerce 6.x

## Accessing Countries

Countries are managed from the J2Commerce Dashboard.

1. Go to **Components** -> **J2Commerce** -> **Dashboard**.
2. Click **Localisation** in the left sidebar.
3. Click **Countries**.

![Countries list](/img/localisation-countries.webp)

## Country List

The Countries list displays all countries configured in your store. Each country shows:

| Column | Description |
|--------|-------------|
| **Checkbox** | Select countries for batch actions. |
| **Country Name** | The display name of the country. |
| **ISO Code 2** | The 2-letter ISO 3166-1 alpha-2 code (e.g., US, GB, DE). |
| **ISO Code 3** | The 3-letter ISO 3166-1 alpha-3 code (e.g., USA, GBR, DEU). |
| **ISO Numeric** | The 3-digit ISO 3166-1 numeric code (e.g., 840, 826, 276). |
| **Status** | Published (green check) or Unpublished (red X). |
| **Ordering** | Drag-and-drop to reorder the display sequence. |

## Adding a Country

1. Click the **New** button in the toolbar.
2. Fill in the country details (see Configuration below).
3. Click **Save** or **Save & Close**.

![Country edit form](/img/localisation-country-edit.webp)

## Configuration

| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| **Country Name** | The display name shown to customers and in admin lists. | Yes | `United Kingdom` |
| **ISO Code 2** | The 2-letter ISO 3166-1 alpha-2 country code. Must be exactly 2 characters, uppercase. | Yes | `GB` |
| **ISO Code 3** | The 3-letter ISO 3166-1 alpha-3 country code. Must be exactly 3 characters, uppercase. | Yes | `GBR` |
| **ISO Numeric** | The 3-digit ISO 3166-1 numeric country code. Optional but recommended for international integrations. | No | `826` |
| **Status** | Set to Published to make the country available, or Unpublished to hide it. | Yes | Published |

## ISO Code Standards

The ISO codes follow the **ISO 3166-1** international standard:

- **ISO Code 2 (alpha-2)**: Two-letter codes used by most systems for country identification. Examples: `US` (United States), `CA` (Canada), `AU` (Australia), `GB` (United Kingdom).
- **ISO Code 3 (alpha-3)**: Three-letter codes that provide more clarity. Examples: `USA`, `CAN`, `AUS`, `GBR`.
- **ISO Numeric**: Three-digit codes that are language-independent. Examples: `840` (US), `124` (CA), `036` (AU), `826` (GB).

These codes ensure compatibility with:
- Shipping carriers (FedEx, UPS, DHL)
- Payment gateways (Stripe, PayPal)
- Address validation services
- Tax calculation services

## How Countries Are Used

Countries are referenced throughout J2Commerce:

1. **Customer Addresses** — Customers select their country during checkout or when managing their address book.
2. **Shipping Zones** — Define which countries a shipping method applies to.
3. **Tax Geozones** — Create geographic zones for tax calculations.
4. **Payment Restrictions** — Restrict payment methods to specific countries.
5. **Zone Configuration** — Each zone (state/province) belongs to a country.

## Bulk Actions

Use the toolbar to perform actions on multiple countries:

- **Publish** — Enable selected countries.
- **Unpublish** — Disable selected countries.
- **Archive** — Move selected countries to archive.
- **Trash** — Move selected countries to trash.
- **Check-in** — Release any checked-out countries.

## Search and Filter

Use the search and filter options to find countries:

- **Search** — Type a country name or ISO code to filter the list.
- **ID Search** — Type `id:123` to find a country by its ID.
- **Status Filter** — Filter by Published, Unpublished, Archived, or Trashed.

## Tips

- **Use standard ISO codes** — Always use official ISO 3166-1 codes. Non-standard codes may cause integration issues with shipping and payment providers.
- **Disable unwanted countries** — Unpublish countries you do not ship to rather than deleting them. This preserves data integrity if zones are linked to those countries.
- **Order matters** — Reorder countries to show your primary markets first in dropdown lists.
- **Keep ISO codes uppercase** — The system automatically converts codes to uppercase, but always enter them in uppercase for consistency.
- **Complete all ISO codes** — Filling in all three ISO code formats ensures maximum compatibility with third-party integrations.

## Troubleshooting

### Country Not Appearing in Dropdown

**Cause:** The country is unpublished or has invalid ISO codes.

**Solution:**

1. Go to **J2Commerce** -> **Localisation** -> **Countries**.
2. Search for the country by name or ISO code.
3. Check that the **Status** shows a green checkmark (Published).
4. Verify the **ISO Code 2** and **ISO Code 3** fields contain valid 2 and 3 character codes respectively.

### ISO Code Validation Error

**Cause:** ISO codes must be exactly 2 or 3 characters and contain only letters.

**Solution:**

1. Edit the country.
2. For **ISO Code 2**, enter exactly 2 uppercase letters (e.g., `US`, `GB`, `FR`).
3. For **ISO Code 3**, enter exactly 3 uppercase letters (e.g., `USA`, `GBR`, `FRA`).
4. Save the country.

### Zones Not Loading for a Country

**Cause:** No zones are configured for the country, or all zones are unpublished.

**Solution:**

1. Go to **J2Commerce** -> **Localisation** -> **Zones**.
2. Filter by the country using the Country dropdown.
3. Verify zones exist and are published.
4. If no zones exist, create zones for the country.

### Country Already Exists Error

**Cause:** A country with the same ISO code already exists in the system.

**Solution:**

1. Search for the existing country using the ISO code.
2. Either edit the existing country to modify it, or unpublish duplicate entries if created in error.
3. Each ISO code must be unique in the system.

## Related Topics

- [Zones](zones.md) — Configure states, provinces, and regions within countries.
- [Geozones](geozones.md) — Create geographic zones for shipping and tax rules.
- [Tax Rates](tax-rates.md) — Apply tax rates based on customer country.