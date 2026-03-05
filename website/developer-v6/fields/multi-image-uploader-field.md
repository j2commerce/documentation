---
title: "MultiImageUploaderField"
sidebar_label: "MultiImageUploaderField"
sidebar_position: 36
description: "Multi-image drag-and-drop uploader field backed by Uppy, with client-side compression, thumbnail generation, and reorderable image gallery."
---

# MultiImageUploaderField

`MultiImageUploaderField` renders a full-featured multi-image uploader inside an admin form. It is built on the [Uppy](https://uppy.io/) file upload library and supports drag-and-drop, client-side image compression, automatic thumbnail generation, image reordering, and server-side deletion. Uploaded image metadata is stored as a **JSON array** in the field value.

## Class Details

| Property | Value |
|----------|-------|
| **Class** | `MultiImageUploaderField` |
| **Namespace** | `J2Commerce\Component\J2commerce\Administrator\Field` |
| **File** | `administrator/components/com_j2commerce/src/Field/MultiImageUploaderField.php` |
| **Extends** | `Joomla\CMS\Form\FormField` |
| **Field type string** | `MultiImageUploader` |

## Assets Loaded

The field registers all assets via `loadAssetsStatic()`, which uses a `static $loaded` guard to prevent duplicate registration:

| Asset name | Type | Path |
|------------|------|------|
| `com_j2commerce.uppy.css` | CSS | `media/com_j2commerce/css/uppy/uppy.min.css` |
| `com_j2commerce.multiimageuploader.css` | CSS | `media/com_j2commerce/css/administrator/multiimageuploader.css` |
| `com_j2commerce.uppy.js` | JavaScript (defer) | `media/com_j2commerce/js/uppy/uppy.min.js` |
| `com_j2commerce.multiimageuploader.js` | JavaScript (defer, module) | `media/com_j2commerce/js/admin/multiimageuploader.js` |

`multiimageuploader.js` declares a dependency on `com_j2commerce.uppy.js`.

## Upload Endpoint

Uploads are POST-ed to:

```
{base_url}index.php?option=com_j2commerce&task=multiimageuploader.upload&format=json
```

The controller task is `MultiimageUploaderController::upload()`.

## Configuration Options

The field builds an `$options` array from a combination of XML attributes and component parameters. The options are passed to the layout template as `$displayData['options']`.

| Option key | XML attribute | Component param | Default |
|------------|---------------|-----------------|---------|
| `maxFileSize` | `max_file_size` (MB) | `image_max_file_size` | 10 MB |
| `allowedFileTypes` | — | — | `['image/*']` |
| `enableCompression` | `client_compression` | `image_client_compression` | `1` (enabled) |
| `enableImageEditor` | — | — | `true` (always on) |
| `autoThumbnail` | `auto_thumbnail` | `image_auto_thumbnail` | `1` (enabled) |
| `directory` | `directory` | — | `images` |
| `multiple` | `multiple` | — | `true` |
| `endpoint` | — | — | (computed) |

XML attribute values take precedence over component params.

## XML Usage

```xml
<form addfieldprefix="J2Commerce\Component\J2commerce\Administrator\Field">
    <fieldset name="images">
        <field
            name="images"
            type="MultiImageUploader"
            label="COM_J2COMMERCE_FIELD_PRODUCT_IMAGES"
            directory="images/products"
            max_file_size="5"
            client_compression="1"
            auto_thumbnail="1"
            multiple="true"
        />
    </fieldset>
</form>
```

## XML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | — | Field name. Value stored as JSON array. |
| `type` | string | — | Must be `MultiImageUploader`. |
| `label` | string | — | Language key for the field label. |
| `directory` | string | `images` | Target upload directory relative to Joomla site root. |
| `max_file_size` | integer (MB) | component param | Maximum file size per image in megabytes. |
| `client_compression` | boolean | component param | Enable client-side compression before upload. |
| `auto_thumbnail` | boolean | component param | Generate thumbnails automatically on upload. |
| `multiple` | boolean | `true` | Allow multiple image selection. |

## Value Format

The field value is a JSON array of image objects. The exact shape is determined by `multiimageuploader.js` and the upload controller response, but the common structure is:

```json
[
    {
        "url": "images/products/photo1.webp",
        "thumb": "images/products/photo1_thumb.webp",
        "alt": "Product front view"
    },
    {
        "url": "images/products/photo2.webp",
        "thumb": "images/products/photo2_thumb.webp",
        "alt": ""
    }
]
```

On form bind, any non-empty string value is decoded via `json_decode(..., true)`. Non-array results are treated as an empty array.

## Layout Template

The field renders through:

```
administrator/components/com_j2commerce/layouts/field/multiimageuploader.php
```

The layout receives:

```php
[
    'id'       => $this->id,
    'name'     => $this->name,
    'value'    => $value,      // decoded PHP array
    'options'  => $options,    // configuration array
    'required' => $this->required,
    'disabled' => $this->disabled,
    'readonly' => $this->readonly,
]
```

## Language Strings Passed to JavaScript

`loadAssetsStatic()` calls `Text::script()` for each UI label so that `multiimageuploader.js` can access them via `Joomla.Text._()`. Keys include `COM_J2COMMERCE_MULTIIMAGEUPLOADER_DRAG_DROP_NOTE`, `COM_J2COMMERCE_MULTIIMAGEUPLOADER_REMOVE_FILE`, `COM_J2COMMERCE_MULTIIMAGEUPLOADER_CONFIRM_DELETE`, and approximately 20 others.

## Static Asset Loading

`loadAssetsStatic()` is `public static` so it can be called from outside the field context — for example, from a view that needs the uploader assets without instantiating a form:

```php
// File: administrator/components/com_j2commerce/src/View/Products/HtmlView.php

use J2Commerce\Component\J2commerce\Administrator\Field\MultiImageUploaderField;

MultiImageUploaderField::loadAssetsStatic();
```

## Related

- [ImageDirectoryField](./image-directory-field.md) — Directory picker for selecting upload target folders
