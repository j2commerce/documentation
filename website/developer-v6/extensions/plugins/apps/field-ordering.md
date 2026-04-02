---
title: "Plugin Field Ordering"
sidebar_label: "Field Ordering"
sidebar_position: 6
description: "How J2Commerce app plugins manage independent field ordering per plugin area using the field_display JSON column and a drag-to-reorder admin interface."
---

# Plugin Field Ordering

Each plugin area maintains its own field ordering, completely independent of the core `ordering` column used by checkout areas. The ordering is stored inside the `field_display` JSON column on `#__j2commerce_customfields`, under the plugin's area key.

## How Ordering Works

When a store owner enables a field for your plugin area (by toggling the switcher in the Display Settings tab), the `field_display` JSON for that field gains an entry:

```json
{
    "vendor_application": {
        "enabled": 1,
        "ordering": 0
    }
}
```

The `ordering` value starts at `0`. Your plugin's admin view provides a drag-to-reorder interface that updates the `ordering` value per field without touching the core `ordering` column or other areas' ordering.

When `CustomFieldHelper::getFieldsByArea('vendor_application')` is called, it reads these JSON values, filters to `enabled = 1`, and sorts by `ordering` — entirely PHP-side, in the returned array.

## `field_display` JSON Structure

```json
{
    "vendor_application": {
        "enabled": 1,
        "ordering": 5
    },
    "membership_form": {
        "enabled": 0,
        "ordering": 0
    }
}
```

| Key | Type | Meaning |
|---|---|---|
| `enabled` | int (0/1) | Whether the field appears in this plugin area |
| `ordering` | int | Sort position within this area (ascending, lower = first) |

Multiple plugin areas can coexist in the same `field_display` JSON. Each area manages its own `enabled` and `ordering` values independently.

## Plugin Admin View Pattern

Your plugin's admin view shows only the fields assigned to its area and provides drag-to-reorder. It does **not** show the full custom fields list, and it does **not** expose the `enabled` toggle (that is the store owner's decision, made in the core Custom Fields admin).

### Template Skeleton

```php
<?php
// File: plugins/j2commerce/app_myplugin/tmpl/fields/default.php

use J2Commerce\Component\J2commerce\Administrator\Helper\CustomFieldHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\HTML\HTMLHelper;

$fields = CustomFieldHelper::getFieldsByArea('vendor_application');
?>
<div class="j2commerce-plugin-field-list">
    <table class="table table-striped" id="myplugin-field-order-table">
        <thead>
            <tr>
                <th class="w-1 text-center"><?php echo Text::_('JGLOBAL_ORDER'); ?></th>
                <th><?php echo Text::_('COM_J2COMMERCE_FIELD_NAME'); ?></th>
                <th><?php echo Text::_('COM_J2COMMERCE_FIELD_TYPE'); ?></th>
                <th><?php echo Text::_('COM_J2COMMERCE_FIELD_REQUIRED'); ?></th>
            </tr>
        </thead>
        <tbody id="myplugin-field-order-tbody" class="myplugin-draggable">
            <?php foreach ($fields as $i => $field) : ?>
            <tr data-field-id="<?php echo (int) $field->j2commerce_customfield_id; ?>">
                <td class="text-center">
                    <span class="sortable-handle" style="cursor:grab;" title="<?php echo Text::_('JGLOBAL_DRAG_TO_REORDER'); ?>">
                        <span class="fa-solid fa-grip-vertical"></span>
                    </span>
                    <input type="number"
                           name="order[<?php echo (int) $field->j2commerce_customfield_id; ?>]"
                           value="<?php echo (int) ($field->area_ordering ?? $i); ?>"
                           class="form-control form-control-sm text-center w-auto d-inline-block"
                           style="width:4em;"
                    />
                </td>
                <td><?php echo htmlspecialchars(Text::_($field->field_name), ENT_QUOTES, 'UTF-8'); ?></td>
                <td><span class="badge bg-secondary"><?php echo htmlspecialchars($field->field_type, ENT_QUOTES, 'UTF-8'); ?></span></td>
                <td>
                    <?php if ((int) $field->field_required) : ?>
                        <span class="badge bg-danger"><?php echo Text::_('JYES'); ?></span>
                    <?php else : ?>
                        <span class="badge bg-light text-dark"><?php echo Text::_('JNO'); ?></span>
                    <?php endif; ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
```

## AJAX Save Endpoint

Implement a `saveFieldOrder` action in your plugin's controller. The endpoint reads field IDs and their new ordering positions, then updates the `ordering` value inside the `field_display` JSON for each field — leaving `enabled` and other areas untouched.

```php
<?php
// File: plugins/j2commerce/app_myplugin/src/Controller/FieldsController.php

declare(strict_types=1);

namespace Acme\Plugin\J2commerce\App_myplugin\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Session\Session;
use Joomla\Database\DatabaseInterface;
use Joomla\Database\ParameterType;

class FieldsController extends BaseController
{
    private const AREA_KEY = 'vendor_application';

    public function saveFieldOrder(): void
    {
        Session::checkToken() or die;

        $input    = $this->getApplication()->getInput();
        $fieldIds = $input->get('cid', [], 'array');
        $ordering = $input->get('order', [], 'array');

        $db = Factory::getContainer()->get(DatabaseInterface::class);

        foreach ($fieldIds as $i => $fieldId) {
            $fieldId     = (int) $fieldId;
            $newOrdering = (int) ($ordering[$fieldId] ?? $i);

            if ($fieldId <= 0) {
                continue;
            }

            // Load existing field_display JSON
            $selectQuery = $db->getQuery(true)
                ->select($db->quoteName('field_display'))
                ->from($db->quoteName('#__j2commerce_customfields'))
                ->where($db->quoteName('j2commerce_customfield_id') . ' = :id')
                ->bind(':id', $fieldId, ParameterType::INTEGER);
            $db->setQuery($selectQuery);
            $raw = $db->loadResult();

            $displayData = (!empty($raw)) ? (json_decode($raw, true) ?: []) : [];

            // Update only this area's ordering; preserve everything else
            if (!isset($displayData[self::AREA_KEY])) {
                $displayData[self::AREA_KEY] = ['enabled' => 1, 'ordering' => 0];
            }
            $displayData[self::AREA_KEY]['ordering'] = $newOrdering;

            $json = json_encode($displayData, JSON_UNESCAPED_UNICODE);

            $updateQuery = $db->getQuery(true)
                ->update($db->quoteName('#__j2commerce_customfields'))
                ->set($db->quoteName('field_display') . ' = :json')
                ->where($db->quoteName('j2commerce_customfield_id') . ' = :id')
                ->bind(':json', $json)
                ->bind(':id', $fieldId, ParameterType::INTEGER);
            $db->setQuery($updateQuery)->execute();
        }

        $this->getApplication()->redirect(
            Route::_('index.php?option=com_j2commerce&view=mypluginfields')
        );
    }
}
```

## JavaScript for Drag-to-Reorder

Use Sortable.js (available as `sortablejs` in modern Joomla environments) or plain HTML5 drag events to update the hidden order inputs, then POST the form to the `saveFieldOrder` endpoint.

```javascript
// File: media/plg_j2commerce_app_myplugin/js/field-order.js

document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('myplugin-field-order-tbody');

    if (!tbody || typeof Sortable === 'undefined') {
        return;
    }

    Sortable.create(tbody, {
        handle: '.sortable-handle',
        animation: 150,
        onEnd: () => {
            // Re-number the order inputs after drag
            const rows = tbody.querySelectorAll('tr[data-field-id]');
            rows.forEach((row, index) => {
                const input = row.querySelector('input[type="number"]');
                if (input) {
                    input.value = index + 1;
                }
            });
        },
    });
});
```

## What `getFieldsByArea()` Returns

After ordering is saved, every call to `CustomFieldHelper::getFieldsByArea('vendor_application')` returns fields sorted by the plugin area `ordering` value. Each field object also has an `area_ordering` property set by the helper:

```php
$fields = CustomFieldHelper::getFieldsByArea('vendor_application');

foreach ($fields as $field) {
    // $field->field_namekey    — DB column name for this field
    // $field->field_name       — language key for the label
    // $field->field_type       — 'text', 'email', 'file_upload', etc.
    // $field->field_required   — 1 or 0
    // $field->area_ordering    — ordering within this plugin area
}
```

The `area_ordering` property is added by the helper during PHP-side sorting. It is not a real database column.

## Best Practices

- Scope your `AREA_KEY` constant to the controller class to avoid typos. Use it consistently in `getFieldsByArea()` calls and the update query.
- Read the existing `field_display` JSON before writing. Never replace the entire JSON with only your area's data — other areas stored in the same JSON will be lost.
- Start `ordering` at `1`, not `0`, to match user expectations in the admin UI (first row = 1).
- Validate that the field IDs in `cid` actually belong to your area before updating. A malicious POST could submit IDs from other plugin areas.

## Related

- [Display Areas](display-areas.md) — Register the area and understand the `field_display` JSON column
- [Address Params](address-params.md) — Store the submitted field values in address records
- [Custom Fields Plugin API](index.md) — Overview and architecture
