# UIkit 3 Checkout Fields

J2Commerce ships a Bootstrap 5 frontend by default. If your Joomla template uses UIkit (YOOtheme Pro, or any custom UIkit-based template), checkout and profile fields will render with wrong grid classes and lose their styling unless you follow the steps below.

## When This Applies

You need this guide if:

- Your site runs a UIkit-based Joomla template (e.g. YOOtheme Pro)
- Checkout or My Profile address fields collapse to a single narrow column instead of filling the available width
- Field inputs lose their UIkit styling (default-browser look instead of UIkit rounded inputs)

## Step 1 — Set the Component Subtemplate

Go to **J2Commerce → Configuration** and find the **Subtemplate** option. Switch it from `bootstrap5` to `uikit`. Save.

This single setting does two things:

1. Switches the frontend layout plugin from `app_bootstrap5` to `app_uikit`, which changes the layout chrome (cart, product lists, etc.).
2. Tells `CustomFieldHelper` to emit UIkit grid and form classes (`uk-width-*`, `uk-input`, `uk-select`, `uk-form-label`) instead of Bootstrap 5 classes (`col-md-*`, `form-control`, `form-select`, `form-label`) for every checkout and profile address field.

## Step 2 — Per-Menu-Item Override (Optional)

Each Checkout and My Profile menu item carries its own **Framework** parameter. This lets you run UIkit globally but test a BS5 checkout on a staging menu item, or vice versa.

1. Go to **Menus → [your site menu]** and edit the Checkout (or My Profile) menu item.
2. Open the **J2Commerce Layout** tab.
3. Set **Framework** to `uikit`, `bootstrap5`, or leave it as `Default` to inherit the component subtemplate.

The per-menu-item setting overrides the component subtemplate for that page only. All other pages follow the component setting.

## How Field Width Works Under Both Frameworks

Each Checkout Field has a **Field Width** column in the admin. You can type either BS5 or UIkit grid classes — the helper translates between dialects automatically.

| What you type | BS5 output | UIkit output |
|---|---|---|
| `col-12` | `col-12` | `uk-width-1-1` |
| `col-md-6` | `col-md-6` | `uk-width-1-2@m` |
| `col-md-4` | `col-md-4` | `uk-width-1-3@m` |
| `uk-width-1-2@m` | `col-md-6` | `uk-width-1-2@m` |
| `uk-width-1-3@m` | `col-md-4` | `uk-width-1-3@m` |
| (empty) | `col-md-6` or `col-12`* | `uk-width-1-2@m` or `uk-width-1-1`* |

*Full-width default applies to: `address_1`, `address_2`, `company`, textarea, and customtext fields.

**Lossy mappings:** UIkit's fraction grid and Bootstrap's 12-column grid don't divide identically. `uk-width-1-5` rounds to `col-md-2` in Bootstrap (not an exact match). When a lossy translation fires, J2Commerce logs a warning under **System → Maintenance → Site Information → Logs** (filter for `customfieldhelper`).

Avoid non-canonical column fractions (`1/5`, `2/5`, `3/5`) in `field_width` if you plan to switch frameworks — they will not round-trip exactly.

## For Plugin Developers

If you build a plugin that calls `CustomFieldHelper::renderField()`, the 4th positional parameter controls the output framework:

```php
// Explicit UIkit output (framework-pinned template inside uikit3/ subfolder)
echo CustomFieldHelper::renderField($field, $value, [], 'uikit');

// Explicit BS5 output
echo CustomFieldHelper::renderField($field, $value, [], 'bootstrap5');

// Auto-resolve from component config (default — recommended for framework-neutral templates)
echo CustomFieldHelper::renderField($field, $value, $attrs);
```

Framework-pinned templates (living inside a `bootstrap5/`, `uikit3/`, or `uikit/` subfolder) should always pass the framework explicitly. Framework-neutral templates (no subfolder split) should omit the argument and let the helper read the site-wide setting.

See `docs/developer/custom-fields.md` for full API documentation.

## Troubleshooting

**Fields still render as Bootstrap after switching subtemplate?**
Joomla caches component config. Clear the cache under **System → Maintenance → Clear Cache**. If still wrong, check the menu item's Framework param — it may be pinned to `bootstrap5`.

**Fields render correctly on checkout but not on My Profile?**
Verify both the Checkout and My Profile menu items have the same Framework setting (or both set to Default).

**Custom field with `field_width=col-md-4` renders a different width under UIkit?**
Bootstrap's 12-column grid and UIkit's fraction grid don't divide identically for some values. Lossy conversions are logged — check **System → Maintenance → Site Information → Logs**, filter for `customfieldhelper`. Consider using `uk-width-1-3@m` directly in the Field Width column for exact UIkit output.

## Related

- [Checkout Fields](custom-fields.mdx) — creating and managing checkout fields
- `docs/developer/custom-fields.md` — API reference for plugin developers
