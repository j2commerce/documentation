---
title: "Advanced Cart Toggle Module"
sidebar_label: "Advanced Cart Toggle"
sidebar_position: 45
description: "Add a cart icon or image button to any module position that opens the advanced cart drawer and shows a live item count badge."
---

# Advanced Cart Toggle Module

The Advanced Cart Toggle module places a compact cart button anywhere on your site — a navbar, a header strip, a sidebar — that opens the J2Commerce advanced cart drawer when clicked. A small badge on the button shows the current cart item count in real time, updating automatically whenever the cart changes without a page reload.

This is the recommended way to give shoppers fast access to the advanced cart drawer from any page on your site.

## Prerequisites

- J2Commerce 6 installed and active
- The J2Commerce Advanced Cart add-on installed and enabled (the drawer functionality comes from that plugin)

## Installation

This module is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `mod_j2commerce_advancedcart_toggle.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `mod_j2commerce_advancedcart_toggle.zip` package file.
4. The module installs and enables automatically.

## Adding the Module to a Page

1. Go to **Content** -> **Site Modules**.
2. Click **New** in the toolbar.
3. Select **Advanced Cart Toggle** from the module type list.
4. Give the module a **Title** (you will usually want to hide the title — set **Show Title** to **Hide**).
5. Set the **Position** to wherever you want the button to appear, such as your template's navbar or header position.
6. Configure the settings described below.
7. Click **Save & Close**.

<!-- SCREENSHOT: New Site Module form with "Advanced Cart Toggle" selected, Position field highlighted, and Show Title set to Hide -->

## Configuration

The module has one configuration fieldset — **Basic** — plus the standard **Advanced** fieldset.

---

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Display Mode** | Choose **Icon** to show a font icon (Font Awesome or any icon library your template loads), or **Image** to show a custom image file. | Icon |
| **Icon Class** | The CSS class(es) for the icon element. Any class from your icon library works here. Shown only when Display Mode is Icon. | `fa-solid fa-cart-shopping` |
| **Cart Image** | The image to show as the button. Use Joomla's media picker to choose a file from your media library. Shown only when Display Mode is Image. | *(empty)* |
| **Count Type** | **Sum Quantities** counts every individual unit in the cart (3 × the same product = 3). **Line Items** counts the number of distinct product rows (3 × the same product = 1). | Sum Quantities |
| **Hide Badge When Empty** | When enabled, the badge is hidden if the cart is empty so visitors do not see a zero count. When disabled, the badge always shows (displaying 0 when the cart is empty). | No |
| **Badge Background Color** | The background color of the count badge. Click the color field to open a color picker. | `#dc3545` (red) |

### Advanced Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Module Class Suffix** | An optional CSS class appended to the button element. Use this to apply custom styles to a specific module instance. | *(empty)* |

---

## How It Works

When the page loads, the module counts the items currently in the visitor's cart on the server side and renders the badge with that count. After the page loads, the advanced cart plugin takes over: every time the cart changes (add, remove, update), the plugin dispatches a browser event and calls `AdvancedCart.updateBadge()`, which updates all elements with the class `j2commerce-cart-badge` — including the badge rendered by this module — instantly, without a page reload.

Clicking the button calls `AdvancedCart.open()`, which slides the advanced cart drawer into view.

---

## Choosing an Icon

The **Icon Class** field accepts any CSS class string your site's template already loads. Common choices:

| Icon Library | Example Class |
|---|---|
| Font Awesome 6 Free | `fa-solid fa-cart-shopping` |
| Font Awesome 6 Free | `fa-solid fa-bag-shopping` |
| Font Awesome 6 Free | `fa-solid fa-basket-shopping` |
| Bootstrap Icons | `bi bi-cart3` |
| UIkit Icons | `uk-icon-cart` (used via UIkit data attributes instead) |

If your template does not load an icon library automatically, you may need to add one or use **Image** mode instead.

---

## Using an Image Instead of an Icon

Set **Display Mode** to **Image**, then click the **Cart Image** field to open Joomla's media picker and select your image. The module renders it at 24 × 24 pixels by default. To display it at a different size, use the **Module Class Suffix** field to attach a CSS class, then add a rule to your template's custom CSS:

```css
.my-cart-toggle img {
    width: 40px;
    height: 40px;
}
```

And set **Module Class Suffix** to `my-cart-toggle`.

---

## Styling the Badge

The badge is a `<span>` element with the classes `j2c-cart-toggle-badge` and `j2commerce-cart-badge`. The module outputs inline CSS to position the badge as a small circle in the top-right corner of the button, using the **Badge Background Color** you choose in the settings.

To customise the badge further — size, font, border, shadow — add CSS to your template's stylesheet targeting `.j2c-cart-toggle-badge`:

```css
.j2c-cart-toggle-badge {
    font-size: 0.65rem;
    min-width: 1.4rem;
    height: 1.4rem;
    line-height: 1.4rem;
    border: 2px solid #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}
```

---

## Placing the Button in a Navbar

Most templates expose a module position inside the navbar — commonly named `nav-right`, `header-right`, `navbar-search`, or similar. Assign the module to that position with **Show Title** set to **Hide** for a clean icon-only button.

If your template does not have a suitable built-in position, you can use a custom HTML module to load the Advanced Cart Toggle module inside it using Joomla's `{loadmodule}` content plugin syntax, or ask your template developer to expose an appropriate position.

---

## Troubleshooting

### Clicking the Button Does Nothing

**Cause:** The advanced cart drawer plugin is not loaded or `AdvancedCart` is not defined in the browser.

**Solution:**

1. Open browser Developer Tools (F12) and check the **Console** tab for a `ReferenceError: AdvancedCart is not defined` error.
2. Verify the J2Commerce Advanced Cart add-on is installed and enabled: go to **System** -> **Manage** -> **Plugins** and search for "AdvancedCart" or "Advanced Cart".
3. Check the **Network** tab and confirm the advanced cart plugin's JavaScript file is loading (status 200).
4. Clear your template and system cache, then reload the page.

### Badge Count Does Not Update After Adding to Cart

**Cause:** The advanced cart JavaScript event is not reaching the badge, or the badge class is missing from the rendered HTML.

**Solution:**

1. Open browser Developer Tools and confirm the badge element has both `j2c-cart-toggle-badge` and `j2commerce-cart-badge` in its class list.
2. Ensure no template override has removed or renamed the badge classes from the module's `tmpl/default.php`.
3. If you created a Joomla template override for this module, restore the original class names on the badge `<span>`.

### Badge Always Shows 0 Even When Cart Has Items

**Cause:** The server-side cart lookup could not retrieve the cart, or the cart session is not active.

**Solution:**

1. Add a product to your cart and reload the page. If the count still shows 0, the issue is with the session or cart model.
2. Enable Joomla debug mode (**System** -> **Global Configuration** -> **Debug System**) and check for log entries from `mod_j2commerce_advancedcart_toggle`.
3. Verify J2Commerce is installed and the `com_j2commerce` component is enabled.

### Icon Is Not Displaying

**Cause:** The icon library is not loaded on the page, or the icon class is incorrect.

**Solution:**

1. Check the **Icon Class** field in module settings and confirm the class matches a valid icon in your icon library.
2. Inspect the rendered `<i>` element in browser Developer Tools to see if the icon class is applied. If the element is there but the icon is invisible, your template is not loading the icon library.
3. Switch **Display Mode** to **Image** and use a custom SVG or PNG instead of a font icon.

---

## Related Topics

- [Cart Module](./index.md) — The core J2Commerce cart module for displaying a mini cart
- [Apps and Extensions](./index.md) — Overview of J2Commerce add-on extensions
- [Design](../design/index.md) — Template overrides and layout customisation
