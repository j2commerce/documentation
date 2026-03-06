---
title: "ImageDirectoryField"
sidebar_label: "ImageDirectoryField"
sidebar_position: 37
description: "Folder picker restricted to the Joomla /images directory tree, with the root 'images' folder always present as the first option."
---

# ImageDirectoryField

`ImageDirectoryField` extends Joomla's built-in `FolderlistField` to produce a dropdown list of directories rooted at the Joomla `images/` folder. The root `images` entry is always present as the first option. All subdirectory paths are prefixed with `images/` so the stored value is always a site-relative path ready for use in media operations.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `ImageDirectoryField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/ImageDirectoryField.php` |
| **Extends** | `Joomla\CMS\Form\Field\FolderlistField` |
| **Field type string** | `ImageDirectory` |

## Behavior

`getOptions()` calls the parent `FolderlistField` with the following fixed settings:

| Property | Value |
|----------|-------|
| `directory` | `images` (Joomla root `/images` folder) |
| `recursive` | `true` |
| `hideNone` | `true` |

The parent returns all subdirectories. `ImageDirectoryField` then:

1. Prepends a synthetic `images` → `images` option for the root folder.
2. Iterates parent options, skips any with value `''` or `'-1'`, and prefixes both `value` and `text` with `images/`.

The result is a flat list like:

```
images
images/products
images/products/thumbnails
images/categories
```

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="basic">
        <field
            name="upload_directory"
            type="ImageDirectory"
            label="COM_J2COMMERCE_FIELD_UPLOAD_DIRECTORY"
            description="COM_J2COMMERCE_FIELD_UPLOAD_DIRECTORY_DESC"
            default="images"
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `name` | Yes | — | Field name. Stored value is a `images/...` path string. |
| `type` | Yes | — | Must be `ImageDirectory`. |
| `label` | Yes | — | Language key for the field label. |
| `description` | No | — | Language key for the tooltip. |
| `default` | No | `''` | Default selected path. Use `images` to pre-select the root. |
| `class` | No | — | CSS class for the `<select>` element. |

Attributes inherited from `FolderlistField` such as `filter`, `exclude`, and `stripext` are accepted but the `directory` and `recursive` properties are overridden internally and cannot be changed via XML.

## Stored Value Format

The stored value is always a full relative path from the Joomla site root:

```
images/products/thumbnails
```

This value can be used directly with `JPATH_SITE . '/' . $value` or `Uri::root() . $value` in PHP.

## Usage Notes

- The field is read-only in terms of directory creation — it lists existing directories only. Pair it with `MultiImageUploaderField` (which creates directories on upload) so the admin can select the correct target folder.
- `hideNone` is hardcoded to `true` — there is no blank/empty option in the dropdown.
- Directories whose Joomla `FolderlistField` values are `''` or `'-1'` are filtered out to avoid placeholder entries that parent field implementations sometimes inject.

## Related

- [MultiImageUploaderField](./multi-image-uploader-field.md) — Multi-image uploader that targets a selected directory
