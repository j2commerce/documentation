---
title: "QueuekeyField"
sidebar_label: "QueuekeyField"
sidebar_position: 33
description: "Displays the J2Commerce queue/cron secret key with an inline Regenerate button that calls an AJAX endpoint to rotate the key."
---

# QueuekeyField

`QueuekeyField` renders the J2Commerce queue secret key alongside a **Regenerate** button. If no key exists yet, one is generated automatically on first render and persisted to the `#__extensions` params column. The **Regenerate** button calls an AJAX endpoint to rotate the key without requiring a full page save.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `QueuekeyField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/QueuekeyField.php` |
| **Extends** | `Joomla\CMS\Form\FormField` |
| **Field type string** | `Queuekey` |
| **Since** | 6.0.7 |

## Behavior

On render the field:

1. Reads `queue_key` from `ComponentHelper::getParams('com_j2commerce')`.
2. If empty, generates a new key with `md5(sitename . time() . random_bytes(8))` and saves it to `#__extensions` directly.
3. Displays the key in an `<strong>` element inside an `alert-success` box.
4. Renders a hidden `<input>` holding the current key value.
5. Emits inline JavaScript that binds a `click` listener to the Regenerate button.

On click, the JavaScript:

1. Disables the button to prevent double-clicks.
2. Calls `GET index.php?option=com_j2commerce&task=ajax.regenerateQueuekey&format=json` with the CSRF token appended via `Joomla.getOptions('csrf.token')`.
3. On success, updates both the displayed `<strong>` text and the hidden `<input>` value.
4. Uses `Joomla.renderMessages()` for success or error feedback.

## AJAX Endpoint

| Property | Value |
|----------|-------|
| **URL** | `index.php?option=com_j2commerce&task=ajax.regenerateQueuekey&format=json` |
| **Method** | GET |
| **Auth** | CSRF token passed as query parameter |
| **Response** | `{ "success": true, "data": { "queue_key": "..." }, "message": "..." }` |

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="queues">
        <field
            name="queue_key"
            type="Queuekey"
            label="COM_J2COMMERCE_QUEUE_KEY_LABEL"
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Must be `queue_key` to bind correctly to the component parameter. |
| `type` | Yes | Must be `Queuekey`. |
| `label` | Yes | Language key for the field label. |

## Output Structure

```html
<div class="alert alert-success d-flex align-items-center gap-3 justify-content-between">
    <strong id="j2commerce_queue_key">a3f8c91d...</strong>
    <button type="button" class="btn btn-success btn-sm" id="j2commerce_regenerate_queuekey">
        Regenerate
    </button>
</div>
<input type="hidden" name="jform[queue_key]" id="jform_queue_key" value="a3f8c91d..."/>
<script>/* inline AJAX handler */</script>
```

## Key Generation Algorithm

```php
$queueString = $siteName . time() . bin2hex(random_bytes(8));
$queueKey = md5($queueString);
```

The key is a 32-character hexadecimal string. It is used in cron URLs to authenticate scheduled task requests.

## Usage Notes

- The hidden `<input>` carries the key through the standard component config form save. The key is written to `#__extensions.params` as part of the normal `com_config` save flow.
- The AJAX regenerate path writes the new key immediately to `#__extensions` and clears the `ComponentHelper` params cache — no page save is required after clicking Regenerate.
- Only one `QueuekeyField` should exist in a form at a time. Both element IDs (`j2commerce_queue_key` and `j2commerce_regenerate_queuekey`) are hardcoded.

## Related

- [CronlasthitField](./cronlasthit-field.md) — Displays last cron execution details
- [ButtonField](./button-field.md) — Generic clickable button field
