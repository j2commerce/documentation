# Advanced Cart Drawer

The Advanced Cart Drawer plugin replaces the traditional redirect-to-cart experience with a slide-out panel that appears on the right side of your storefront. When a customer adds a product, the drawer opens immediately so they can review their cart without leaving the page they're on.

The plugin works in tandem with the companion **Advanced Cart Toggle** module, which places a cart icon button in any module position to open and close the drawer on demand.

## Prerequisites

- J2Commerce installed and enabled
- At least one product published in your store
- A Bootstrap 5 or UIkit front-end template

:::info

**Note**: Both the **Advanced Cart Drawer** plugin (`plg_system_j2commerce_advancedcart`) and the **Advanced Cart Toggle** module (`mod_j2commerce_advancedcart_toggle`) are separate add-ons available from the [J2Commerce Extensions Store](https://www.j2commerce.com). They are not included with the core J2Commerce component.

:::

## Purchase and Download

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/)

**Step 2:** Locate the **Advanced Cart** plugin -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile menu at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the App

You can install this **Advanced Cart** App using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**

Upload the plugin file or use the Install from URL option.

![Install extensions](<../../../assets/app install1 (1) (1).webp>)

## Enable the App

Once you have installed the App, you will need to enable it. There are **two** ways you can access the extension.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Apps**

![shipping method](/img/accordions-app.webp)

Look for **Advanced Cart Drawer**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/advanced-cart-enable.webp)

## Quick Setup

Once the plugin is enabled, the drawer is immediately active on your site. The recommended next step is to place the Toggle module so customers have a persistent way to open the drawer.

Go to **Content** **-> Site Modules -> New**.

![](/img/advanced-cart-modules.webp)

Select **Advanced Cart Toggle** from the module type list.

![](/img/advanced-cart-modules1.webp)

Give it a title and assign it to a **module position** in your template (such as a header or navigation position). The most common position is in the upper right corner but every template is different

![](/img/advanced-cart-modules2.webp)

:::info

**Note**: The drawer itself does not require a menu item — it is injected into every page of your site automatically, excluding any URLs you specify in the Exclusions settings.

:::

## Configuring the Plugin

Go to **J2Commerce** -> **Apps**, click the **Advanced Cart Drawer title** to open its settings. The settings are grouped into seven tabs.

:::info

**Helpful Hint:** If you click on the Toggle Inline Help button, it will explain each section.: If you need to find your API Key in the future, go back to this same page and click **Show Key** in the **Additional Information** section

:::

![](/img/advanced-cart-config-toggle.webp)

### Display Settings

These settings control the overall appearance and behavior of the drawer.

![](/img/advanced-cart-config.webp)

**Layout Framework:** CSS framework used for the drawer templates. Template overrides are detected automatically. Choose the frontend template layout for checkout forms and saved card displays. Options depend on your site's template framework.

**Available subtemplates:** **Bootstrap 5** and **UIkit**. Leave blank to use the default layout. If your Joomla template is UIkit-based (e.g., YOOtheme Pro), select the UIkit subtemplate for consistent styling.

**Drawer Width (px):** Width of the cart drawer in pixels (300–600).

**Auto-Open on Add to Cart:** Select 'Yes' to automatically slide open the drawer when a product is added to the cart.

**Auto-Close After (seconds):** Automatically closes the drawer after the specified number of seconds. Set to `0` to leave it open until the customer closes it manually.

**Add-to-Cart Behaviour:** Controls what happens when a product is added.&#x20;

- **Open Cart Drawer** keeps the customer on the page

- **Redirect to Cart Page** sends them to the full cart

**Show Item Count in Header:** Displays the number of items in parentheses next to the "Your Cart" heading inside the drawer.

**Overlay Opacity:** Controls how dark the page background dimming is when the drawer is open. `0.0` is fully transparent; `1.0` is fully opaque.

**Checkout Button Background:** Background and border color for the checkout button. Hover and focus states use a 15% darker shade automatically.

**Checkout Button Text Color:** Text color for the checkout button.

### Frontend View

![](/img/advanced-cart-modules4-1.webp)

### Cart Items

These settings control which information is shown for each line item in the drawer.

![](/img/advanced-cart-config-cart-items.webp)

**Show Product Thumbnails:** Displays a 64×64 product thumbnail image beside each cart item.

**Show SKU:** Shows the product SKU below the item name.

**Show Variant Attributes:** Shows the selected variant options (e.g., Size: Large, Color: Blue) below the item name.

**Show Quantity Controls:** Displays +/- buttons and an editable quantity field. Customers can update quantities directly from the drawer without opening the full cart page.

**Show Base Price:** When a discount applies, shows the original price with a strikethrough alongside the discounted price.

**Show Discount Badge:** Displays a discount badge on items that have a reduced price.

### Cart Options

These settings control the interactive elements inside the drawer body.

![](/img/advanced-cart-config-cart-options.webp)

**Show Free Shipping Progress:** Displays a progress bar showing how close the customer is to the free-shipping threshold.

**Free Shipping Threshold:** The cart subtotal (in your store's base currency) the customer must reach to qualify for free shipping. Only visible when **Show Free Shipping Progress** is enabled. Set to `0` to hide the bar even when the progress option is on.

**Progress Bar Color:** Fill color of the free-shipping progress bar.

**Show Coupon Field:** Allows customers to type and apply a coupon code directly from the drawer. The field is hidden behind a "Have a coupon?" toggle link and only expands when clicked.

**Show Voucher Field:** Allows customers to apply a gift voucher code directly from the drawer. Shown behind a "Have a voucher?" toggle link.

**Show Checkout Button:** Displays the primary checkout button in the drawer footer.

**Show Continue Shopping:** Displays a "Continue Shopping" link in the drawer footer. If a **Continue Shopping Link** is configured in the Navigation tab, it links there; otherwise it simply closes the drawer.

**Show Clear Cart Button:** Displays a "Clear All" button that empties the entire cart in one click. Hidden by default to prevent accidental deletions.

**Show Subtotals:** Displays order total information at the bottom of the item list.

**Subtotal Type:** Controls how totals are displayed when **Show Subtotals** is on.&#x20;

- **Full Subtotals** shows a breakdown including shipping, taxes, discounts, and grand total.&#x20;

- **Single Line Subtotal** shows only one line with the cart total.

### Payment Icons

Show accepted payment method logos at the bottom of the drawer footer to build buyer confidence.

![](/img/advanced-cart-config-payment.webp)

**Show Payment Method Icons:** Enables the payment icon row in the footer.

**Payment Icons to Display:** Multi-select list of icons to show. Only visible when **Show Payment Method Icons** is enabled.

- Visa, MasterCard, American Express, Discover, Maestro, PayPal, Apple Pay, Google Pay

### Navigation Links

These settings control where the drawer's buttons link to. All three fields use the Joomla menu item picker.

![](/img/advanced-cart-config-navigation.webp)

**Continue Shopping Link:** Menu item the Continue Shopping button links to. Leave blank to use the browser back action (the drawer simply closes).

**Cart Page:** Menu item for the full cart page. Used as the fallback URL for the cart when no menu item is found automatically.

**Checkout Page:** Menu item for the checkout page. Used as the target URL for the Checkout button.

Setting these explicitly is recommended to ensure the correct pages are used on sites with multiple menus or complex navigation structures.

### Exclusions

![](/img/advanced-cart-config-exclusion.webp)

**Exclude URLs:** A list of URL fragments, one per line. The drawer will not be injected on any page whose URL contains one of these strings. For example, entering `/checkout` prevents the drawer from appearing on the checkout page.

**Example exclusions:**

```
/checkout
/cart
/confirmation
```

### Advanced

![](/img/advanced-cart-config-advanced.webp)

**Custom CSS:** Additional CSS rules applied after the plugin's own stylesheet. Use `.j2c-drawer` as the root selector to target drawer elements. See the Template Overrides section below for available CSS custom properties.

## Configuring the Toggle Module

The **Advanced Cart Toggle** module renders the cart icon button that customers click to open the drawer. Place it in your template's header or navigation position.

Go to **Content** -> **Site Modules**, find the **Advanced Cart Toggle** module and click its name.

### Module tab

![](/img/advanced-cart-modules5.webp)

**Display Mode:** Whether to show a font icon or a custom image.

**Icon Class:** Font Awesome or custom CSS class for the cart icon. Only visible when Display Mode is set to **Icon**.

**Cart Image:** Image to display when Display Mode is set to **Image**. Selected using the Joomla media picker.

**Count Type:** Controls what number appears in the badge. **Sum Quantities** adds up the total quantity of all items (e.g., 3 units of one product + 2 of another = 5). **Line Items** counts the number of distinct product lines in the cart. Sum all item quantities, or count the number of distinct line items.

**Hide Badge When Empty:** Hides the count badge entirely when the cart is empty instead of showing a zero.

**Badge Background Color:** Background color of the item count bubble on the icon.

:::tip

**Tip:** The module also has the standard Joomla **Module Class Suffix** and **Caching** fields in the **Advanced** tab. Caching is set to **No Caching** by default because the item count must always reflect the live cart.

:::

## Frontend View of Pop-Out Cart

![](/img/advanced-cart.webp)

## How It Works

### Drawer Lifecycle

**When a page loads:**

- The plugin injects the drawer HTML at the end of the `<body>` tag on every page (except excluded URLs and admin pages).

- The cart icon button (from the Toggle module) has a `data-j2c-toggle="drawer"` attribute that the JavaScript listens for.

- Clicking the button calls `AdvancedCart.open()`, which slides the panel in and dims the page.

**The drawer can be closed by:**

- Clicking the × button in the drawer header
- Clicking the dimmed page overlay
- Pressing **Escape**
- Clicking the Continue Shopping button (when no URL is configured)

### Automatic Refresh

The drawer content refreshes automatically when:

- A product is added to the cart (the `j2commerce:afterAddingToCart` event fires)
- Any other part of the page changes the cart (the `j2commerce:cart:updated` event fires)

The refresh fetches only the inner drawer content via AJAX, so the full page never reloads. The item count badge on the Toggle module button updates at the same time.

### Quantity Updates and Item Removal

All quantity changes made inside the drawer are debounced by 300ms and sent to the server via AJAX. If the server rejects a quantity (for example, due to stock limits), the input reverts to the original quantity. Removing an item triggers an optimistic fade-out animation before the request is confirmed, giving an immediate visual response.

### Coupon and Voucher Codes

The coupon and voucher fields are collapsed behind toggle links by default. Once a customer clicks "Have a coupon?" or "Have a voucher?", the form expands inline. Applied discounts are shown immediately after the item list and reflected in the totals.

## Template Overrides

The drawer uses two PHP layout files:

- `drawer.php` — the outer shell (header, body wrapper, footer)
- `drawer_content.php` — the scrollable inner content (items, coupons, totals)

To override either file, create the override path in your template:

```
templates/{your-template}/html/plg_system_j2commerce_advancedcart/bootstrap5/drawer.php
templates/{your-template}/html/plg_system_j2commerce_advancedcart/bootstrap5/drawer_content.php
```

The plugin checks for the override before loading the default layout, so your custom file takes full precedence.

### CSS Custom Properties

The following CSS custom properties are defined on `.j2c-drawer` and can be overridden in the **Custom CSS** field or in your template stylesheet:

| Property                | Default   | Controls                                                               |
| ----------------------- | --------- | ---------------------------------------------------------------------- |
| `--j2c-drawer-width`    | `420px`   | Panel width (also set by the Drawer Width parameter)                   |
| `--j2c-drawer-bg`       | `#fff`    | Panel background color                                                 |
| `--j2c-drawer-text`     | `#374151` | Primary text color                                                     |
| `--j2c-drawer-border`   | `#e5e7eb` | Border and divider color                                               |
| `--j2c-drawer-muted`    | `#6b7280` | Secondary/muted text color                                             |
| `--j2c-drawer-hover-bg` | `#f3f4f6` | Hover background on quantity buttons                                   |
| `--j2c-progress-fill`   | `#22c55e` | Progress bar fill color (also set by the Progress Bar Color parameter) |

**Dark mode** is supported automatically. When the site uses `data-color-scheme="dark"`, the drawer switches to a dark color scheme without any additional configuration.

**RTL** layouts are also supported. On right-to-left pages, the drawer slides in from the left side instead of the right.

## JavaScript Events

The plugin dispatches custom events on `document` that other scripts can listen for:

| Event                               | When It Fires                                                                                 | Detail Properties   |
| ----------------------------------- | --------------------------------------------------------------------------------------------- | ------------------- |
| `j2commerce:drawer:opened`          | The drawer slides open                                                                        | —                   |
| `j2commerce:drawer:closed`          | The drawer closes                                                                             | —                   |
| `j2commerce:drawer:refreshed`       | The drawer content reloads via AJAX                                                           | `itemCount`         |
| `j2commerce:drawer:quantityUpdated` | A quantity is changed successfully                                                            | `cartitemId`, `qty` |
| `j2commerce:drawer:itemRemoved`     | An item is removed successfully                                                               | `cartitemId`        |
| `j2commerce:drawer:cartCleared`     | The cart is emptied                                                                           | —                   |
| `j2commerce:cart:updated`           | Re-dispatched after any cart change so other components (e.g., the mini-cart module) can sync | —                   |

**Listening example:**

```javascript
document.addEventListener('j2commerce:drawer:refreshed', (e) => {
    console.log('Cart now has', e.detail.itemCount, 'items');
});
```

## Troubleshooting

The previous or another shopping cart still appears

**Cause:** The module to the old shopping cart is enabled

**Solution:** Find the module that belongs to the shopping cart you want to turn off and turn it off by clicking on the green checkmark so it turns to an **'x'**

- Go to **Content** -> **Site Modules** and **Disable** the module

### The drawer does not appear on the page

**Cause:** The plugin may not be enabled, or the current page URL matches an exclusion rule.

**Solution:**

- Go to **J2Commerce** -> **Apps** and confirm the plugin shows **Enabled**.

- Open the plugin settings and check the **Exclusions** tab. If the current page URL contains any listed pattern, remove it.

- Clear the Joomla cache: **Home Dashboard -> Cache -> Delete All**.

### The drawer opens but shows an empty cart even though items were added

**Cause:** The AJAX refresh request may be failing if the checkout page is set to redirect rather than use the drawer. Alternatively, the session may not be carrying over correctly.

**Solution:**

- Open the plugin settings and confirm **Add-to-Cart Behaviour** is set to **Open Cart Drawer**, not **Redirect to Cart Page**.

- Check your browser's developer console for network errors on the AJAX refresh request (the URL contains `j2commerce_advancedcart_ajax=1`).

- Confirm the J2Commerce system plugin (`plg_system_j2commerce`) is enabled under **System** -> **Manage** -> **Plugins**.

### The Toggle module button shows but clicking it does nothing

**Cause:** The plugin's JavaScript has not loaded, or there is a JavaScript conflict with another extension.

**Solution:**

- Confirm the plugin is enabled — the JavaScript only loads when the plugin is active.

- Open your browser's developer console and look for errors. If `AdvancedCart is not defined` appears, the script has not loaded.

- Check whether another plugin or template is blocking deferred scripts. The plugin loads its JavaScript with `defer`, so it executes after the page HTML has been parsed.

### Coupon or voucher codes are not applying from the drawer

**Cause:** The coupon or voucher feature may be disabled in the plugin settings, or the underlying coupon/voucher modules are not enabled in J2Commerce.

**Solution:**

- Go to **J2Commerce -> Apps** **->** click on the **Advanced Cart** app. Go to the **Cart Options** tab, and confirm **Show Coupon Field** and/or **Show Voucher Field** are set to **Yes**.

![](/img/advanced-cart-coupons1.webp)

- Verify that coupons are created, enabled and published under **J2Commerce** **-> Sales ->** **Coupons**.

  ![](/img/advanced-cart-coupons.webp)

### The free-shipping progress bar does not appear

**Cause:** The progress bar requires both **Show Free Shipping Progress** to be enabled and the **Free Shipping Threshold** to be set to a value greater than `0`.

**Solution:**

- Open the plugin settings, go to **Cart Options**.

- Set **Show Free Shipping Progress** to **Yes**.

- Enter a number greater than zero in **Free Shipping Threshold** (for example, `50` for free shipping on orders over $50).
