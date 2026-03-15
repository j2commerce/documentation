---
title: "Advanced Cart"
sidebar_label: "Advanced Cart"
sidebar_position: 50
description: "Install and configure the Advanced Cart add-on to give shoppers a slide-out cart drawer with live quantity controls, coupon support, and a free-shipping progress bar."
---

# Advanced Cart

The Advanced Cart add-on replaces the redirect-to-cart experience with a slide-out drawer panel. When a shopper adds a product, the drawer opens immediately — no page reload required. From inside it they can adjust quantities, remove items, apply coupons or vouchers, and proceed to checkout without ever leaving the current page.

The add-on consists of two separate extensions that work together:

- **Advanced Cart Drawer** (`plg_system_j2commerce_advancedcart`) — injects the drawer into every page of your site.
- **Advanced Cart Toggle** (`mod_j2commerce_advancedcart_toggle`) — places a cart icon button in a template position that opens the drawer on click.

## Requirements

- with PHP 8.3.0 +
- Joomla! 6.x
- J2Commerce 6.x

## Installation

Both extensions are separate add-ons available from the [J2Commerce Extensions Store](https://www.j2commerce.com). They are not included with the core J2Commerce 6 component.

1. Purchase and download the package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the zip file. Both the plugin and the module install automatically.

After installation, enable the plugin:

1. Go to **J2Commerce** -> **Apps**.
2. Find **J2Commerce - Advanced Cart Drawer** in the list and click **Enable**.

<!-- SCREENSHOT: J2Commerce Apps view showing the Advanced Cart Drawer app with status toggled to Enabled -->

## Quick Setup

Once the plugin is enabled, the drawer is active on every page. Add the cart button next:

1. Go to **Content** -> **Site Modules** -> **New**.
2. Select **Advanced Cart Toggle** from the module type list.
3. Set **Show Title** to **Hide**.
4. Set **Position** to your template's navbar or header position.
5. Click **Save & Close**.

<!-- SCREENSHOT: Module Manager showing the Advanced Cart Toggle module being assigned to a header position -->

The drawer has no menu item — it is injected automatically. The only pages that won't show it are those whose URLs you add to the **Exclusions** list in the plugin settings.

## Configuring the Drawer Plugin

Go to **J2Commerce** -> **Apps** and click the **Advanced Cart Drawer** plugin name.

<!-- SCREENSHOT: Advanced Cart Drawer settings screen open at the Display Settings tab -->

### Display Settings

| Setting                        | Description                                                                                                | Default                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------- |
| **Layout Framework**           | CSS framework for the drawer templates. Template overrides are detected automatically.                     | `bootstrap5`           |
| **Drawer Width (px)**          | Width of the panel in pixels.                                                                              | `420` (range: 300–600) |
| **Auto-Open on Add to Cart**   | Slides the drawer open automatically when a product is added.                                              | Yes                    |
| **Auto-Close After (seconds)** | Closes the drawer automatically after this many seconds. Set to `0` to disable.                            | `0` (Never)            |
| **Add-to-Cart Behaviour**      | **Open Cart Drawer** keeps the shopper on the page; **Redirect to Cart Page** sends them to the full cart. | Open Cart Drawer       |
| **Show Item Count in Header**  | Displays the number of items next to the "Your Cart" heading inside the drawer.                            | Yes                    |
| **Overlay Opacity**            | How dark the page behind the drawer dims. `0.0` = none, `1.0` = fully opaque.                              | `0.5`                  |
| **Checkout Button Background** | Background color of the checkout button. Hover uses a 15% darker shade automatically.                      | `#010156`              |
| **Checkout Button Text Color** | Text color of the checkout button.                                                                         | `#ffffff`              |

### Cart Items

| Setting                     | Description                                                             | Default |
| --------------------------- | ----------------------------------------------------------------------- | ------- |
| **Show Product Thumbnails** | Displays a 64×64 thumbnail beside each item.                            | Yes     |
| **Show SKU**                | Shows the product SKU below the item name.                              | No      |
| **Show Variant Attributes** | Shows selected variant options (e.g., Size: Large).                     | Yes     |
| **Show Quantity Controls**  | Displays +/- buttons so shoppers can update quantities from the drawer. | Yes     |
| **Show Base Price**         | When a discount applies, shows the original price with a strikethrough. | Yes     |
| **Show Discount Badge**     | Displays a discount badge on reduced-price items.                       | Yes     |

### Cart Options

| Setting                         | Description                                                                                                      | Default        |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------- |
| **Show Free Shipping Progress** | Progress bar showing how close the shopper is to free shipping.                                                  | Yes            |
| **Free Shipping Threshold**     | Cart subtotal required for free shipping. Must be greater than `0` for the bar to appear.                        | `0`            |
| **Progress Bar Color**          | Fill color of the progress bar.                                                                                  | `#22c55e`      |
| **Show Coupon Field**           | Lets shoppers apply a coupon code directly in the drawer.                                                        | Yes            |
| **Show Voucher Field**          | Lets shoppers apply a gift voucher code directly in the drawer.                                                  | Yes            |
| **Show Checkout Button**        | Displays the checkout button in the drawer footer.                                                               | Yes            |
| **Show Continue Shopping**      | Displays a Continue Shopping link in the footer.                                                                 | Yes            |
| **Show Clear Cart Button**      | Displays a Clear All button. Hidden by default to prevent accidental deletions.                                  | No             |
| **Show Subtotals**              | Shows order total information below the item list.                                                               | Yes            |
| **Subtotal Type**               | **Full Subtotals** shows a breakdown (shipping, tax, grand total). **Single Line Subtotal** shows one line only. | Full Subtotals |

### Payment Icons

| Setting                       | Description                                                                                                                 | Default |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Show Payment Method Icons** | Displays accepted payment logos at the bottom of the footer.                                                                | No      |
| **Payment Icons to Display**  | Multi-select list. Available choices: Visa, MasterCard, American Express, Discover, Maestro, PayPal, Apple Pay, Google Pay. | None    |

### Navigation Links

Use the Joomla menu item picker to set each destination explicitly. This prevents issues on sites with multiple menus or complex navigation.

| Setting                    | Description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| **Continue Shopping Link** | Where the Continue Shopping button links. Leave blank to close the drawer instead. |
| **Cart Page**              | Menu item for the full cart page.                                                  |
| **Checkout Page**          | Menu item for the checkout page.                                                   |

### Exclusions

| Setting          | Description                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| **Exclude URLs** | One URL fragment per line. Pages whose URL contains any listed string will not show the drawer. |

Common entries to add:

```
/checkout
/cart
/confirmation
```

### Advanced

| Setting        | Description                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------- |
| **Custom CSS** | Additional CSS injected after the plugin stylesheet. Use `.j2c-drawer` as the root selector. |

## Configuring the Toggle Module

Go to **Content** -> **Site Modules**, find **Advanced Cart Toggle**, and click its name.

<!-- SCREENSHOT: Advanced Cart Toggle module edit screen showing the Basic settings tab -->

| Setting                    | Description                                                                          | Default                     |
| -------------------------- | ------------------------------------------------------------------------------------ | --------------------------- |
| **Display Mode**           | Show a font icon or a custom image.                                                  | Icon                        |
| **Icon Class**             | CSS class(es) for the icon. Only shown when Display Mode is **Icon**.                | `fa-solid fa-cart-shopping` |
| **Cart Image**             | Image from the media library. Only shown when Display Mode is **Image**.             | *(empty)*                   |
| **Count Type**             | **Sum Quantities** adds up total units. **Line Items** counts distinct product rows. | Sum Quantities              |
| **Hide Badge When Empty**  | Hides the count badge when the cart is empty.                                        | No                          |
| **Badge Background Color** | Background color of the count bubble.                                                | `#dc3545`                   |

Caching is set to **No Caching** by default so the count badge always reflects the live cart.

## Tips

- Add `/checkout` and `/cart` to the **Exclude URLs** list so the drawer does not interrupt the checkout flow.
- Set the **Free Shipping Threshold** to your store's qualifying order value (for example, `50`) and the progress bar will appear automatically.
- If your template's icon library is not Font Awesome, update the **Icon Class** field to match — or switch **Display Mode** to **Image** and upload an SVG.
- Use the **Custom CSS** field with variables like `--j2c-drawer-bg` to match the drawer to your site's color scheme without touching template files.

## Troubleshooting

### The drawer does not appear

**Cause:** The plugin is not enabled, or the current URL matches an exclusion rule.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and confirm the plugin shows **Enabled**.
2. Open plugin settings and check the **Exclusions** tab — remove any pattern that matches the page you are testing on.
3. Clear caches: **System** -> **Clear Cache** -> **Clear All**.

### The toggle button does nothing when clicked

**Cause:** The plugin JavaScript has not loaded, or there is a JavaScript conflict.

**Solution:**

1. Open browser Developer Tools (F12) and check the Console for `AdvancedCart is not defined`.
2. Verify the plugin is enabled — its JavaScript only loads when active.
3. Confirm no other extension is blocking deferred scripts. The plugin loads with `defer`.

### The drawer shows an empty cart even though items were added

**Cause:** The add-to-cart behaviour may be set to redirect rather than open the drawer.

**Solution:**

1. Open plugin settings and confirm **Add-to-Cart Behaviour** is set to **Open Cart Drawer**.
2. Check the browser Network tab for failed requests containing `j2commerce_advancedcart_ajax=1`.
3. Confirm the J2Commerce system plugin is enabled under **System** -> **Manage** -> **Plugins**.

### The free-shipping bar does not appear

**Cause:** The threshold is set to `0` or the progress bar is disabled.

**Solution:**

1. Open plugin settings and go to **Cart Options**.
2. Set **Show Free Shipping Progress** to **Yes**.
3. Enter a value greater than `0` in **Free Shipping Threshold**.

### The badge count does not update after adding a product

**Cause:** The badge element is missing a required CSS class, often because a template override removed it.

**Solution:**

1. Inspect the badge element in Developer Tools and confirm it has both `j2c-cart-toggle-badge` and `j2commerce-cart-badge` in its class list.
2. If you created a template override for the module, check that both classes are preserved on the `<span>` element.

## Related Topics

- [Apps and Extensions](index.md)
- [Coupons](../marketing/coupons.md)
