---
title: "Zones"
sidebar_label: "Zones"
sidebar_position: 3
description: "Configure states, provinces, and regions within countries for accurate shipping rates and tax calculations."
---

# Zones

Zones represent states, provinces, territories, or regions within countries. They enable location-specific shipping rates, tax calculations, and address validation. When customers enter their address during checkout, they select their country first, then choose from the zones available for that country.

## Requirements

- PHP 8.3.0+
- Joomla 6.x
- J2Commerce 6.x

## Accessing Zones

Zones are managed from the J2Commerce Dashboard.

1. Go to **Components -> J2Commerce ->** **Dashboard**.
2. Click **Localisation** in the left sidebar.
3. Click **Zones**.

<!-- TEMP_IMG_OFF ![Zones list](/img/localisation-zones.webp) -->
## Zone List

The Zones list displays all zones configured in your store. Each zone shows:

**Checkbox:** Select zones for batch actions.

**Zone Name:** The display name of the zone (e.g., California, Ontario, New South Wales).

**Zone Code:** A short code for the zone (e.g., CA, ON, NSW).

**Country:** The country this zone belongs to.

**Status:** Published (green check) or Unpublished (red X).

**Ordering:** Drag-and-drop to reorder the display sequence within a country.

## Adding a Zone

1. Click the **New** button in the toolbar.
2. Fill in the zone details (see Configuration below).
3. Click **Save** or **Save & Close**.

<!-- TEMP_IMG_OFF ![Zone edit form](/img/localisation-zone-edit.webp) -->
## Configuration

**Zone Name:** The full display name shown to customers and in admin lists. **Example:** `California`

**Zone Code:** A short identifier for the zone, typically 2-3 uppercase letters. **Example:** `CA`

**Country:** The country this zone belongs to. Select from the dropdown of published countries. **Example:** `United States`

**Status:** Set to **Published** to make the zone available, or Unpublished to hide it.

## Zone Code Standards

Zone codes follow regional conventions:

- **United States**: Two-letter state abbreviations (CA, NY, TX, FL)
- **Canada**: Two-letter province/territory codes (ON, BC, QC, AB)
- **Australia**: Two or three-letter state codes (NSW, VIC, QLD, WA)
- **United Kingdom**: County abbreviations (ENG, SCT, WAL, NIR)

These codes are used by:

- Shipping carriers for rate calculations
- Tax services for regional tax rates
- Address validation services

## How Zones Are Used

Zones are referenced throughout J2Commerce:

1. **Customer Addresses** — Customers select their zone after choosing a country.
2. **Shipping Rates** — Configure shipping costs for specific zones within countries.
3. **Tax Geozones** — Combine countries and zones to create geographic zones for tax rules.
4. **Payment Restrictions** — Restrict payment methods to specific zones.
5. **Address Validation** — Validate customer addresses against known zones.

## Filtering Zones by Country

The Zones list includes a **Country** filter dropdown:

1. Select a country from the dropdown to see only zones for that country.
2. Select "All" to show zones from all countries.

This is useful when managing zones for stores with international shipping.

## Bulk Actions

Use the toolbar to perform actions on multiple zones:

- **Publish** — Enable selected zones.
- **Unpublish** — Disable selected zones.
- **Archive** — Move selected zones to archive.
- **Trash** — Move selected zones to trash.
- **Check-in** — Release any checked-out zones.

## Search and Filter

Use the search and filter options to find zones:

- **Search** — Type a zone name or code to filter the list.
- **ID Search** — Type `id:123` to find a zone by its ID.
- **Status Filter** — Filter by Published, Unpublished, Archived, or Trashed.
- **Country Filter** — Filter zones by their parent country.

## Tips

- **Match official postal codes** — Use zone codes that match official postal abbreviations for compatibility with shipping carriers.
- **Disable unused zones** — Unpublish zones you do not ship to. This simplifies the customer checkout experience.
- **Group zones by country** — When configuring shipping, filter by country to ensure you set rates for all zones within that country.
- **Order within countries** — The ordering position determines the sequence zones appear in dropdown lists for each country.
- **Create zones before geozones** — Zones must exist before you can add them to geozones for tax and shipping rules.

## Common Zone Configurations

### United States (50 States)

| Zone Name  | Zone Code |
| ---------- | --------- |
| Alabama    | AL        |
| Alaska     | AK        |
| Arizona    | AZ        |
| California | CA        |
| ...        | ...       |

### Canada (10 Provinces, 3 Territories)

| Zone Name        | Zone Code |
| ---------------- | --------- |
| Alberta          | AB        |
| British Columbia | BC        |
| Manitoba         | MB        |
| Ontario          | ON        |
| Quebec           | QC        |
| Yukon            | YT        |
| ...              | ...       |

### United Kingdom (Counties)

| Zone Name        | Zone Code |
| ---------------- | --------- |
| England          | ENG       |
| Scotland         | SCT       |
| Wales            | WAL       |
| Northern Ireland | NIR       |
| ...              | ...       |

## Troubleshooting

### Zone Not Appearing in Dropdown

**Cause:** The zone is unpublished, or the parent country is unpublished.

**Solution:**

1. Go to **J2Commerce** **-> Localisation ->** **Zones**.
2. Search for the zone by name or code.
3. Check that the **Status** shows a green checkmark (Published).
4. If the zone is published, check that the **Country** is also published in the Countries list.

### Country Filter Shows No Zones

**Cause:** No zones are assigned to the selected country.

**Solution:**

1. Clear the country filter by selecting "All" or a different country.
2. Click **New** to create a zone.
3. Select the desired country from the **Country** dropdown.
4. Enter the zone name and code.
5. Save and publish the zone.

### Zone Code Must Be Unique

**Cause:** Zone codes must be unique within each country.

**Solution:**

1. Search for existing zones with the same code within that country.
2. Either use a different code for the new zone or edit the existing zone.
3. Zone codes can be reused across different countries (e.g., "WA" exists for both Washington state and Western Australia).

### Customer Cannot Select Zone After Choosing Country

**Cause:** The country has no published zones configured.

**Solution:**

1. Go to **J2Commerce** **-> Localisation -> Zones**.
2. Filter by the problematic country.
3. Create zones for that country, or unpublish the country if it should not have zone selection.
