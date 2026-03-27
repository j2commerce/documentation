# Advanced Cart Toggle Module

**Description:** Adds a **cart icon** or **image button** to any module position that opens the advanced cart drawer and shows a live item count badge

The Advanced Cart Toggle module places a compact cart button anywhere on your site — a navbar, a header strip, a sidebar — that opens the J2Commerce Advanced Cart Drawer when clicked. A small badge on the button shows the current item count in real time, updating automatically whenever the cart changes without a page reload.

This is the recommended way to give shoppers fast access to the cart drawer from any page on your site.

## Prerequisites

- J2Commerce 6 installed and active
- The J2Commerce Advanced Cart add-on installed and enabled (the drawer comes from that plugin — see [Advanced Cart Drawer](j2commerce_advancedcart.md))

:::info

**Note**: Both the **Advanced Cart Drawer** plugin (`plg_system_j2commerce_advancedcart`) and the **Advanced Cart Toggle** module (`mod_j2commerce_advancedcart_toggle`) are separate add-ons available from the [J2Commerce Extensions Store](https://www.j2commerce.com). They are not included with the core J2Commerce component.

:::

## Purchase and Download

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/)

**Step 2:** Locate the **Advanced Cart** **Toggle** Module -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile menu at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the Module

You can install this **Advanced Cart** **Toggle** Module using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the `mod_j2commerce_advancedcart_toggle.zip` package file

The module installs and enables automatically

![Install extensions](<../../../assets/app install1 (1) (1).webp>)

## Adding the Module to a Page

1. Go to **Content** -> **Site Modules**.
2. Click **New** in the toolbar.
3. Select **Advanced Cart Toggle** from the module type list.
4. Give the module a **Title**. In most cases you will want to hide the title — set **Show Title** to **Hide**.
5. Set the **Position** to wherever you want the button to appear, such as your template's navbar or header position.
6. Configure the settings described below.
7. Click **Save & Close**.

<!-- SCREENSHOT: New Site Module form with "Advanced Cart Toggle" selected, Position field highlighted, and Show Title set to Hide -->

## Configuration

The module has one configuration fieldset — **Basic** — plus the standard **Advanced** fieldset.

### Basic Settings tab

:<!-- SCREENSHOT: Module edit screen showing the Basic tab with Display Mode, Icon Class, Count Type, Hide Badge When Empty, and Badge Background Color fields -->

**Display Mode:** Show a font icon (Font Awesome or any icon library your template loads) or a custom image file. Choose whether to show a font icon or a custom image.

**Icon Class:** The CSS class(es) for the icon element. Any class from your icon library works here. Shown only when **Display Mode** is set to **Icon**.

**Cart Image:** The image to show as the button. Click to open Joomla's media picker and select a file from your media library. Shown only when **Display Mode** is set to **Image**.

**Count Type:** Controls what number appears in the badge. **Sum Quantities** adds up every individual unit in the cart (two products with quantities of 3 and 2 = 5). **Line Items** counts the distinct product rows in the cart (two products regardless of quantity = 2).

**Hide Badge When Empty:** When enabled, the badge is hidden if the cart is empty. When disabled, the badge always shows, displaying 0 on an empty cart.

**Badge Background Color:** Background color of the count badge. Click the field to open a color picker.

### Advanced Settings tab

:<!-- SCREENSHOT: Module edit screen showing the Basic tab with Display Mode, Icon Class, Count Type, Hide Badge When Empty, and Badge Background Color fields -->

**Module Class Suffix:** An optional CSS class appended to the button element. Use this to apply custom styles to a specific module instance.

**Caching:** Controls whether module output is cached. Set to **No Caching** by default because the item count must always reflect the live cart.

## How It Works

When the page loads, the module queries the current visitor's cart on the server and renders the badge with the live item count. After the page loads, the Advanced Cart Drawer plugin takes over: any time the cart changes (add, remove, quantity update), the plugin dispatches a browser event that updates all elements with the class `j2commerce-cart-badge` — including the badge from this module — instantly, with no page reload.

Clicking the button calls `AdvancedCart.open()`, which slides the cart drawer into view.

## Choosing an Icon

![](/img/advanced-toggle-icon.webp)

The **Icon Class** field accepts any CSS class string your site's template already loads. Common choices: Below are the **Icon Library** and the **Example Class**&#x20;

- **Font Awesome 6 Free:** `fa-solid fa-cart-shopping`

- **Font Awesome 6 Free:** `fa-solid fa-bag-shopping`

- **Font Awesome 6 Free:** `fa-solid fa-basket-shopping`

- **Bootstrap Icons:** `bi bi-cart3`

If your template does not load an icon library automatically, you may need to add one or use **Image** mode instead.

## Using an Image Instead of an Icon

![](/img/advanced-toggle-image.webp)

Set **Display Mode** to **Image**, then click the **Cart Image** field to open Joomla's media picker and choose your file. The module renders the image at 24 × 24 pixels by default. To display it at a different size, add a CSS class using the **Module Class Suffix** field and target it in your template's custom stylesheet:

```css
.my-cart-toggle img {
    width: 40px;
    height: 40px;
}
```

Set **Module Class Suffix** to `my-cart-toggle` to apply the rule.

## Styling the Badge

The badge is a `<span>` element with the classes `j2c-cart-toggle-badge` and `j2commerce-cart-badge`. The module outputs inline CSS to position the badge as a small circle in the top-right corner of the button, using the **Badge Background Color** you set in the module parameters.

To customize the badge further — size, font, border, shadow — add rules to your template's stylesheet targeting `.j2c-cart-toggle-badge`:

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

## Placing the Button in a Navbar

Most templates expose a module position inside the navbar — commonly named `nav-right`, `header-right`, `navbar-search`, or similar. Assign the module to that position with **Show Title** set to **Hide** for a clean icon-only button.

If your template does not have a suitable built-in position, you can load the module inline using the `{loadmodule}` content plugin syntax in a Custom HTML module, or ask your template developer to expose an appropriate position.

## Troubleshooting

### Clicking the Button Does Nothing

**Cause:** The Advanced Cart Drawer plugin is not loaded, or `AdvancedCart` is not defined in the browser.

**Solution:**

1. Open browser Developer Tools (F12) and check the **Console** tab for a `ReferenceError: AdvancedCart is not defined` error.
2. Verify the J2Commerce Advanced Cart add-on is installed and enabled: go to **J2Commerce** -> **Apps** and confirm the plugin shows **Enabled**.
3. Check the **Network** tab and confirm the plugin's JavaScript file is loading (status 200).
4. Clear your template and system cache via **System** -> **Clear Cache**, then reload the page.

### Badge Count Does Not Update After Adding to Cart

**Cause:** The cart JavaScript event is not reaching the badge element, or the badge CSS classes are missing from the rendered HTML.

**Solution:**

1. Open browser Developer Tools and confirm the badge element has both `j2c-cart-toggle-badge` and `j2commerce-cart-badge` in its class list.
2. If you created a Joomla template override for this module, check that your override preserves both class names on the badge `<span>`.
3. Ensure no other extension is intercepting the `j2commerce:cart:updated` event before it reaches the badge handler.

### Badge Always Shows 0 Even When Cart Has Items

**Cause:** The server-side cart lookup could not retrieve the session cart.

**Solution:**

1. Add a product to your cart and reload the page. If the count still shows 0, the session or cart model is not working correctly.
2. Enable Joomla debug mode under **System** -> **Global Configuration** -> **Debug System** and look for log entries from `mod_j2commerce_advancedcart_toggle`.
3. Verify J2Commerce is installed and the `com_j2commerce` component is enabled under **System** -> **Manage** -> **Extensions**.

### Icon Is Not Displaying

**Cause:** The icon library is not loaded on the page, or the icon class string is incorrect.

**Solution:**

1. Check the **Icon Class** field in module settings and confirm the class matches a valid icon in your icon library.
2. Inspect the rendered element in browser Developer Tools. If the element is present but the icon is invisible, your template is not loading the icon library.
3. Switch **Display Mode** to **Image** and use a custom SVG or PNG file instead of a font icon.

## Related Topics

- [Advanced Cart Drawer](j2commerce_advancedcart.md) — The slide-out cart drawer that this module opens
- [Apps and Extensions](index.md) — Overview of J2Commerce add-on extensions
- [Design](../design/index.md) — Template overrides and layout customization
