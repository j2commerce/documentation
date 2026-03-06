---
title: "PhoneCountriesField"
sidebar_label: "PhoneCountriesField"
sidebar_position: 35
description: "Checkbox grid of all countries from PhoneHelper dial data, displaying country name and dial code, storing selected ISO2 codes as a JSON array."
---

# PhoneCountriesField

`PhoneCountriesField` renders a three-column checkbox grid of every country defined in `PhoneHelper::DIAL_DATA`. Each checkbox displays the country name and its international dial code (e.g., `United States +1`). Selected values are stored as a **JSON array** of ISO2 country codes.

Use this field in plugin or component configuration forms where the administrator must choose which countries the phone field widget supports.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `PhoneCountriesField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/PhoneCountriesField.php` |
| **Extends** | `Joomla\CMS\Form\Field\CheckboxesField` |
| **Field type string** | `PhoneCountries` |

## Data Sources

The field merges data from two sources:

- `PhoneHelper::getDialData()` — the full `DIAL_DATA` constant containing ISO2 codes and dial codes.
- `PhoneHelper::getCountryListForDropdown()` — the database-enabled country list providing localised country names.

Countries are sorted alphabetically by name. When a country from `DIAL_DATA` has no matching database record, its ISO2 code is used as the display name fallback.

## Value Format

The stored value is a JSON array of ISO2 strings:

```json
["US", "GB", "DE", "FR"]
```

`getChecked()` handles all incoming value formats:

- JSON string starting with `[` — decoded directly.
- PHP array — used as-is (handles the nested array case from multi-checkbox form submission).
- Anything else — returns an empty array.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="basic">
        <field
            name="phone_countries"
            type="PhoneCountries"
            label="COM_J2COMMERCE_PHONE_COUNTRIES_LABEL"
            description="COM_J2COMMERCE_PHONE_COUNTRIES_DESC"
            filter="raw"
        />
    </fieldset>
</form>
```

Use `filter="raw"` to prevent Joomla from stripping the JSON array brackets during form submission processing.

## XML Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Field name. Multiple checkboxes submit under the same name. |
| `type` | Yes | Must be `PhoneCountries`. |
| `label` | Yes | Language key for the field label. |
| `description` | No | Language key for the field tooltip. |
| `filter` | Recommended | Set to `raw` to preserve JSON encoding on save. |

## Rendered Output

The field renders a responsive Bootstrap grid (`row g-2`) with columns sized `col-md-4` (three columns at medium breakpoints and above). Each cell contains a Bootstrap `form-check` with an `<input type="checkbox">` and a `<label>` showing the country name and dial code:

```html
<div class="row g-2">
    <div class="col-md-4">
        <div class="form-check">
            <input type="checkbox" class="form-check-input"
                   name="jform[phone_countries]"
                   id="jform_phone_countries_0"
                   value="AF" checked>
            <label class="form-check-label" for="jform_phone_countries_0">
                Afghanistan <span class="text-muted">+93</span>
            </label>
        </div>
    </div>
    <!-- ... -->
</div>
```

## Usage Notes

- The field does not produce a JSON-encoded string automatically on save — form submission delivers individual checkbox values. The controller or model must re-encode the received array to JSON before saving. Alternatively, configure the form field with a custom filter class.
- Countries are always displayed in English alphabetical order regardless of admin language, because `PhoneHelper::getCountryListForDropdown()` queries the database and returns stored names.
- The dial code span uses `text-muted` to visually de-emphasise the code relative to the country name.

## Related

- [PhoneHelper](../api-reference/phone-helper.md) — Source of dial data and country lookup
