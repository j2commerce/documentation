---
title: "Product Shipping Restrictions"
sidebar_label: "Shipping Restrictions"
sidebar_position: 50
description: "Restrict which shipping methods are available for specific products or categories, based on geo zones and postal codes."
---

# Product Shipping Restrictions

The Product Shipping Restrictions add-on lets you control which shipping methods appear at checkout depending on what is in the cart. Restrictions can be set per product, per variant, or inherited from a Joomla content category. Two modes are available: **Simple** (pick allowed methods per product) and **Advanced** (create named restriction groups with geo zone and postal code rules).

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_restrictbyshipping.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `app_restrictbyshipping.zip` package file.
4. The plugin installs and enables automatically.

After installation, go to **J2Commerce** -> **Apps** to configure it.

:::note Legacy data migration
If you are upgrading from J2Store 4, the installer automatically migrates existing restriction groups from the `j2store_shippingrestrictions` table into the new `j2commerce_apprestrictbyshipping_groups` table. No manual migration is needed.
:::

## Plugin Settings

Go to **J2Commerce** -> **Apps** and click **Product Shipping Restrictions** to open the plugin settings.

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Shipping Restriction Mode** | **Simple** or **Advanced** — see sections below | Simple |
| **Debug Mode** | Writes diagnostic entries to the Joomla log. Disable in production. | No |

---

## Simple Mode

In Simple mode, you select the allowed shipping methods directly on each product's edit form. No restriction groups are needed.

### Simple Mode Settings

| Setting | Description |
|---------|-------------|
| **If the allowed shipping methods are not available, then** | Choose **Don't display any shipping method** (hide unavailable methods) or **Display all available shipping methods** (fall through to all methods). |
| **Force single shipping method** | When multiple methods are allowed across cart items, force only one to appear. |
| **If forcing, which method** | The specific method to force when forcing is enabled. Only takes effect if that method is available for at least one item. |
| **Always-allowed shipping method** | A method that is always shown regardless of product restrictions (e.g., local pickup). |

### Assigning Allowed Methods to a Product (Simple Mode)

1. Go to **Content** -> **Articles** and open the product article for editing.
2. Click the **J2Commerce** tab, then the **App** sub-tab.
3. Under **Shipping Restrictions**, select the **Allowed Shipping Methods** for this product.
4. Select `All Methods` to allow everything, or pick specific methods from the list.
5. Click **Save**.

<!-- SCREENSHOT: Product edit form showing Shipping Restrictions tab with Allowed Shipping Methods selector -->

---

## Advanced Mode

In Advanced mode, you create named **Restriction Groups** that define:

- Which **geo zones** (countries/regions) trigger the restriction
- Which **postal code ranges** trigger the restriction
- Which **shipping methods** are allowed for matching orders
- Which **Joomla user groups** the restriction applies to

You then assign a restriction group to a product, variant, or category.

### Creating a Restriction Group

1. Go to **J2Commerce** -> **Apps** -> **Product Shipping Restrictions**.
2. Click the **Manage Restrictions** button (or navigate to the Restrictions tab within the app view).
3. Click **Add Restriction Group**.
4. Fill in the fields:

<!-- SCREENSHOT: Restriction group edit form -->

| Field | Description |
|-------|-------------|
| **Title** | A name to identify this group (e.g., "Continental US Only"). |
| **Note** | Optional internal note describing the restriction purpose. |
| **Geo Zone** | One or more geo zones whose countries/regions trigger this restriction. |
| **Zip / Postal Codes** | Comma-separated codes or ranges (e.g., `90210,10001,30000-39999`). |
| **Allowed Shipping Methods** | Methods available when this restriction is triggered. |
| **User Groups** | Limit the restriction to specific Joomla user groups. Leave empty to apply to all. |
| **Status** | Enable or disable the group without deleting it. |

5. Click **Save**.

### Assigning a Restriction Group to a Product

1. Open the product article for editing.
2. Click the **J2Commerce** tab, then the **App** sub-tab.
3. Under **Shipping Restrictions**, select the group from the **Restriction Group** dropdown.
4. Click **Save**.

### Assigning a Restriction Group to a Variant

1. Open the product article and go to the **Variants** tab.
2. Click a variant row to expand its settings.
3. Under the **Shipping** section, find **Restriction Group** and select the group.
4. Click **Save**.

### Assigning Restrictions to a Category

Category-level restrictions apply to all products whose Joomla content article belongs to that category (when no product-level restriction is set).

1. Go to **Content** -> **Categories** and open the category for editing.
2. Click the **Shipping Restrictions** fieldset (added by the plugin).
3. **Simple mode:** select the allowed methods. **Advanced mode:** select the restriction group.
4. Click **Save**.

:::tip Precedence
Product-level restrictions take priority over category-level restrictions. Variant-level restrictions take priority over product-level restrictions.
:::

---

## Advanced Mode Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Display Restricted Message** | Show a geo-zone restriction notice on the **Product View**, **Category View**, **both**, or not at all. | Do Not Display |

---

## Restriction Notices on the Storefront

When **Display Restricted Message** is enabled, a notice appears on the product or category page telling the customer which regions or postal codes restrict the product's available shipping methods.

On **variable products**, the notice updates dynamically when the customer selects a different variant — no page reload needed.

On the **checkout shipping/payment step**, if the customer's delivery address falls within a restricted zone and no allowed shipping method is available, a warning banner is displayed listing the restricted cart items.

---

## Geo Zone Configuration

Restriction groups use J2Commerce geo zones to define geographic coverage. Set up your geo zones before creating restriction groups.

1. Go to **J2Commerce** -> **Localisation** -> **Geo Zones**.
2. Create or edit a geo zone and add the countries and zones it covers.
3. Reference the geo zone in your restriction groups.

---

## Troubleshooting

### No shipping methods appear at checkout

**Cause:** A restriction group is assigned, the customer's address matches a restricted zone, and the allowed methods list in the group is empty or none of the listed methods are available.

**Solution:**
1. Open the restriction group and verify the **Allowed Shipping Methods** field is not empty.
2. Confirm at least one of the listed methods is published and active in **J2Commerce** -> **Shipping** -> **Shipping Methods**.
3. Check that the customer's shipping zone matches the geo zones in the group.

### Restriction notice does not appear on the product page

**Cause:** **Display Restricted Message** is set to **Do Not Display**, or the product has no restriction group assigned.

**Solution:** Open plugin settings, set **Display Restricted Message** to **Product View Only** or **Product and Category Views**, and verify a restriction group is assigned to the product.

### Variant restriction not updating on variant selection

**Cause:** The `j2commerce:variantUpdated` custom event is not being dispatched by the active theme after a variant price AJAX call.

**Solution:** Verify the active theme dispatches the `j2commerce:variantUpdated` event with variant data in the `detail` property after a variant selection. The plugin listens for this event to update the displayed restriction information.

### Debug logging

Enable **Debug Mode** in the plugin settings to write detailed log entries to `administrator/logs/app_restrictbyshipping.php`. Review this file when diagnosing unexpected shipping method filtering behaviour.

---

## Related Topics

- [Geo Zones](../../localization/geozones.md)
- [Shipping Methods](../../shipping-methods/shipping-standard.md)
- [Variable Products](../../catalog/products/variable-product.md)
