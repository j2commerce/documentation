---
title: "Custom Field Types"
sidebar_label: "Field Types"
sidebar_position: 1
description: "Complete reference for all 43 J2Commerce custom Joomla form field types available to third-party developers."
---

# Custom Field Types

J2Commerce provides 43 custom Joomla form field types that extend Joomla's form system. These fields handle everything from entity lookups and product pricing to image uploading and SEF router configuration. Third-party plugins, modules, and extensions can use any of these fields in their XML forms.

## Using J2Commerce Fields

All fields live in the `J2Commerce\Component\J2commerce\Administrator\Field` namespace. Declare `addfieldprefix` on your form XML:

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="basic">
        <field name="country_id" type="Country" label="Country" />
        <field name="zone_id" type="Zone" label="Zone" country_field="country_id" />
    </fieldset>
</form>
```

For plugin manifests:

```xml
<config>
    <fields name="params" addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
        <field name="tax_profile" type="TaxProfile" label="Tax Profile" />
    </fields>
</config>
```

Modal fields use a sub-namespace and require a separate prefix:

```xml
<field name="product_id" type="Modal_Product"
    addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field\Modal" />
```

---

## Entity Lookup Fields

Dropdown fields populated from J2Commerce database tables. All extend `ListField`.

| Field Type | Class | Table | Stored Value |
|------------|-------|-------|-------------|
| [`Country`](./country-field.md) | `CountryField` | `#__j2commerce_countries` | `j2commerce_country_id` (int) |
| [`Zone`](./zone-field.md) | `ZoneField` | `#__j2commerce_zones` | `j2commerce_zone_id` (int) |
| [`GeoZone`](./geozone-field.md) | `GeoZoneField` | `#__j2commerce_geozones` | `j2commerce_geozone_id` (int) |
| [`Currencies`](./currencies-field.md) | `CurrenciesField` | `#__j2commerce_currencies` | `currency_code` (string) |
| [`OrderStatus`](./orderstatus-field.md) | `OrderStatusField` | `#__j2commerce_orderstatuses` | `j2commerce_orderstatus_id` (int) |
| [`TaxProfile`](./taxprofile-field.md) | `TaxProfileField` | `#__j2commerce_taxprofiles` | `j2commerce_taxprofile_id` (int) |
| [`TaxRate`](./taxrate-field.md) | `TaxRateField` | `#__j2commerce_taxrates` | `j2commerce_taxrate_id` (int) |
| [`Manufacturers`](./manufacturers-field.md) | `ManufacturersField` | `#__j2commerce_manufacturers` | `j2commerce_manufacturer_id` (int) |
| [`Vendors`](./vendors-field.md) | `VendorsField` | `#__j2commerce_vendors` | `j2commerce_vendor_id` (int) |
| [`Length`](./length-field.md) | `LengthField` | `#__j2commerce_lengths` | `j2commerce_length_id` (int) |
| [`Weight`](./weight-field.md) | `WeightField` | `#__j2commerce_weights` | `j2commerce_weight_id` (int) |
| [`StoreProfile`](./storeprofile-field.md) | `StoreProfileField` | `#__j2commerce_storeprofiles` | `j2commerce_storeprofile_id` (int) |
| [`ManufacturerCountry`](./manufacturer-country-field.md) | `ManufacturerCountryField` | `#__j2commerce_countries` (filtered) | `j2commerce_country_id` (int) |
| [`VendorCountry`](./vendor-country-field.md) | `VendorCountryField` | `#__j2commerce_countries` (filtered) | `j2commerce_country_id` (int) |

## Product & Pricing Fields

Fields for product configuration, pricing, and commerce settings.

| Field Type | Class | Purpose |
|------------|-------|---------|
| [`ProductType`](./product-type-field.md) | `ProductTypeField` | Product type selector (simple, configurable, variable, etc.) |
| [`PriceCalculator`](./price-calculator-field.md) | `PriceCalculatorField` | Pricing calculator strategy selector |
| [`VariantPrice`](./variant-price-field.md) | `VariantPriceField` | Currency-prefixed price input for variants |
| [`VariantAdvancedPricing`](./variant-advanced-pricing-field.md) | `VariantAdvancedPricingField` | Button to open advanced pricing modal |
| [`Dimensions`](./dimensions-field.md) | `DimensionsField` | Three-input group for length/width/height |
| [`PaymentMethods`](./payment-methods-field.md) | `PaymentMethodsField` | Installed payment plugin selector |
| [`ShippingMethods`](./shipping-methods-field.md) | `ShippingMethodsField` | Installed shipping plugin/method selector |
| [`Invoicetype`](./invoicetype-field.md) | `InvoicetypeField` | Document type selector (invoice, receipt, packing slip) |

## Modal Picker Fields

Modal-based entity selection fields.

| Field Type | Class | Purpose |
|------------|-------|---------|
| [`Modal_Product`](./modal-product-field.md) | `Modal\ProductField` | Single product picker via modal |
| [`Modal_ProductMultiselect`](./modal-product-multiselect-field.md) | `Modal\ProductMultiSelectField` | Multi-product picker via modal |

## Multi-Select & List Fields

Advanced selection fields with dual-panel or checkbox interfaces.

| Field Type | Class | Purpose |
|------------|-------|---------|
| [`Duallistbox`](./duallistbox-field.md) | `DuallistboxField` | Two-panel multi-select listbox |
| [`CategoryDuallistbox`](./category-duallistbox-field.md) | `CategoryDuallistboxField` | Dual listbox pre-loaded with Joomla categories |
| [`PhoneCountries`](./phone-countries-field.md) | `PhoneCountriesField` | Country checkbox grid with dial codes |

## Template & Layout Fields

Fields for template selection and layout configuration.

| Field Type | Class | Purpose |
|------------|-------|---------|
| [`Subtemplate`](./subtemplate-field.md) | `SubtemplateField` | Visual card picker for app subtemplates |
| [`Templatelist`](./templatelist-field.md) | `TemplatelistField` | Template folder dropdown with plugin event support |
| [`TemplateCustom`](./template-custom-field.md) | `TemplateCustomField` | Display-only shortcode reference panel |
| [`Categoryj2commerce`](./categoryj2commerce-field.md) | `Categoryj2commerceField` | Bootstrap accordion of category settings panels |

## Image & File Fields

Fields for image uploading and directory selection.

| Field Type | Class | Purpose |
|------------|-------|---------|
| [`J2CommerceImage`](./j2commerce-image-field.md) | `J2CommerceImageField` | Single image picker with preview |
| [`MultiImageUploader`](./multi-image-uploader-field.md) | `MultiImageUploaderField` | Uppy-powered drag-and-drop multi-image uploader |
| [`ImageDirectory`](./image-directory-field.md) | `ImageDirectoryField` | Folder picker rooted at `images/` |

## Router & Menu Fields

Fields for SEF URL routing configuration.

| Field Type | Class | Purpose |
|------------|-------|---------|
| [`Routertype`](./routertype-field.md) | `RoutertypeField` | Hidden field exposing router type for `showon` conditions |
| [`RouterCategory`](./router-category-field.md) | `RouterCategoryField` | Category field that auto-switches by router mode |
| [`RouterModalCategory`](./router-modal-category-field.md) | `RouterModalCategoryField` | Modal/multi-select category field by router mode |
| [`Productlistmenu`](./productlistmenu-field.md) | `ProductlistmenuField` | Menu item selector for legacy router |

## Display & Utility Fields

Read-only display fields and UI utilities. These fields render information but store no data.

| Field Type | Class | Purpose |
|------------|-------|---------|
| [`Alert`](./alert-field.md) | `AlertField` | Bootstrap alert box (display only) |
| [`Button`](./button-field.md) | `ButtonField` | Clickable button with onclick handler |
| [`Price`](./price-field.md) | `PriceField` | Alert variant for pricing contexts |
| [`Cronlasthit`](./cronlasthit-field.md) | `CronlasthitField` | Cron last execution status display |
| [`Queuekey`](./queuekey-field.md) | `QueuekeyField` | Queue key display with AJAX regenerate |

---

## Key Notes

- **CurrenciesField** stores an ISO string (`USD`), not an integer ID — unique among entity fields.
- **ZoneField** supports AJAX country-linking via the `country_field` attribute.
- **ManufacturerCountry/VendorCountry** are filtered variants of `CountryField` — ideal for filter forms.
- **Router fields** work together: `RoutertypeField` drives `showon` conditions for `RouterCategory`, `RouterModalCategory`, and `Productlistmenu`.
- **Display fields** (Alert, Button, Price, Cronlasthit, TemplateCustom) render UI elements but never appear in POST data.
