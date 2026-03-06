---
title: "CronlasthitField"
sidebar_label: "CronlasthitField"
sidebar_position: 32
description: "Display-only field that reads the cron_last_trigger component parameter and renders the last cron execution date, URL, and IP address."
---

# CronlasthitField

`CronlasthitField` is a **display-only** field that reads the `cron_last_trigger` parameter from the J2Commerce component configuration and renders a Bootstrap alert summarising when the cron system last fired, from which URL, and from which IP address. It stores no user-submitted data — a hidden `<input>` with an empty value is included solely to satisfy Joomla's form rendering pipeline.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `CronlasthitField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/CronlasthitField.php` |
| **Extends** | `Joomla\CMS\Form\FormField` |
| **Field type string** | `Cronlasthit` |
| **Since** | 6.0.7 |

## Behavior

The field reads `ComponentHelper::getParams('com_j2commerce')->get('cron_last_trigger', '')` and displays one of three states:

| State | Alert class | Content |
|-------|-------------|---------|
| Value is empty | `alert-info` | Translated `COM_J2COMMERCE_CRON_LAST_TRIGGER_NOT_FOUND` |
| Value is valid JSON | `alert-success` | Formatted `COM_J2COMMERCE_CRON_LAST_TRIGGER_DETAILS` with date, URL, IP |
| Value is non-JSON string | `alert-info` | Raw HTML-escaped value |

The JSON payload written by the cron controller has the shape:

```json
{
    "date": "2026-03-04 14:22:01",
    "url": "https://example.com/index.php?...",
    "ip": "203.0.113.42",
    "success": true
}
```

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="cron">
        <field
            name="cron_last_trigger"
            type="Cronlasthit"
            label="COM_J2COMMERCE_CRON_LAST_TRIGGER_LABEL"
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Must match the parameter name `cron_last_trigger` so Joomla binds the correct value from component params. |
| `type` | Yes | Must be `Cronlasthit`. |
| `label` | Yes | Language key for the field label. |

## Output Structure

```html
<div class="alert alert-success mt-n3 mb-0">
    <strong>Last run: 2026-03-04 14:22:01 from https://... (IP: 203.0.113.42)</strong>
</div>
<input type="hidden" name="{field-name}" id="{field-id}" value=""/>
```

The hidden input always has an empty `value` — the actual `cron_last_trigger` parameter is written directly by the cron execution controller, not through this form field.

## Usage Notes

- Place this field in the **Queues** or **Cron** configuration fieldset so store owners can verify the cron is running.
- The field reads the component parameter directly; it does not use the form's bound data. This means it always reflects the live stored value, even if the form has unsaved edits.
- The `success` flag in the JSON payload is parsed but not currently used for visual differentiation — all valid JSON results render with `alert-success`.

## Related

- [QueuekeyField](./queuekey-field.md) — Displays and allows regeneration of the cron/queue secret key
