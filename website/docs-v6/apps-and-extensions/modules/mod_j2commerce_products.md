# Products Module

The J2Commerce Products Module displays products from your catalog in a flexible grid or slider carousel. You can showcase the latest products, featured items, best sellers, products from specific categories or tags, or hand-picked selections.

<!-- SCREENSHOT: Frontend showing a 4-column product grid with images, titles, prices, and Add to Cart buttons -->

## Installation

This module ships with J2Commerce 6 and is available immediately after installation.

To create a **new** module instance:

1. Go to **Content** **->** **Site Modules**.
2. Click **New** in the toolbar.
3. Select **J2Commerce Products** from the list.
4. Configure the module settings (see below).
5. Assign to a template position and menu pages.
6. Click **Save**.

## Adding the Module to a Page

Go to **Content** **->** **Site Modules**&#x20;

The J2Commerce Categories module should already exist and needs to be enabled.&#x20;

:::tip

**Tip:** If you use the existing one, you should **rename** it because the title will show up on the frontend

:::

![](/img/product-module.webp)

If you don't see it, then select '**New**' and follow the steps below.

![](/img/advanced-cart-modules.webp)

Select **J2Commerce - Categories** from the module type list.

![](/img/product-module1.webp)

## Configuration

### Basic Settings

These settings control which categories are shown and how the module determines its source.

**Title:** Give it a catchy title. The title will show up above the category items

**Position:** Set the position of where you want the module to be displayed. In this example we have set it as 'Main-bottom'

**Mode:** How the module selects which categories to show.&#x20;

![](/img/product-module2.webp)

**Product Source:** Determines which products are displayed.

- **Latest:** Shows the most recently created products (newest first).

- **Featured:** Shows products marked as featured in their article settings.

- **By Category:** Shows products from selected Joomla categories.

- **By Tag:** Shows products linked to articles with selected tags.

- **Best Selling:** Shows products with the highest sales count (based on completed orders).

- **Most Popular:** Shows products with the most page views (based on hit count).

- **Selected Products:** Shows only the products you manually select in the picker.

**Categories:** Filter by one or more Joomla categories. Only shown when Product Source is "By Category".

**Select Products:** Choose specific products to display. Only shown when Product Source is "Selected Products".

**Tags:** Filter by one or more Joomla tags. Only shown when Product Source is "By Tag"

**Product Types:** Restrict to specific product types (simple, variable, configurable, etc.). Leave empty for all types.

**Featured Only:** Show only featured products. Can be combined with any product source except "Featured".

**Number of Products:** Maximum number of products to display.

**Ordering:** How products are sorted. Source-driven options (Best Selling, Most Popular) override this setting.

- **Ordering Options:** Latest, Title A-Z, Title Z-A, Article Ordering, Random, Most Popular, Best Selling

### Layout Settings tab

Control how products are arranged on the page.

<!-- SCREENSHOT: Module edit screen showing the Layout tab with grid and slider options -->

| Setting                  | Description                                                                                                | Default | Options      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- | ------- | ------------ |
| **Display Layout**       | Visual presentation style.                                                                                 | Grid    | Grid, Slider |
| **Columns**              | Number of columns in grid layout. Only shown for Grid layout.                                              | 3       | 2, 3, 4, 6   |
| **Slides Per View**      | Number of product cards visible at once in slider. Only shown for Slider layout.                           | 4       | 1-6          |
| **Space Between Slides** | Gap in pixels between slides. Only shown for Slider layout.                                                | 20      | 0-60         |
| **Autoplay**             | Automatically advance slides. Only shown for Slider layout.                                                | No      | Yes/No       |
| **Autoplay Delay**       | Seconds between automatic slide transitions. Only shown when Autoplay is enabled.                          | 4       | 1-30         |
| **Loop**                 | Continuously loop through slides. Requires more slides than Slides Per View. Only shown for Slider layout. | No      | Yes/No       |
| **Navigation Arrows**    | Show previous/next navigation arrows. Only shown for Slider layout.                                        | Yes     | Yes/No       |
| **Pagination Dots**      | Show clickable pagination dots. Only shown for Slider layout.                                              | No      | Yes/No       |

#### Grid Layout

The grid layout displays products in a responsive row/column structure. On mobile devices, the grid automatically adjusts to 2 columns for optimal viewing.

| Columns | Desktop Class  | Mobile Class |
| ------- | -------------- | ------------ |
| 2       | col-6 col-md-6 | col-6        |
| 3       | col-6 col-md-4 | col-6        |
| 4       | col-6 col-md-3 | col-6        |
| 6       | col-6 col-md-2 | col-6        |

#### Slider Layout

The slider layout uses Swiper.js to create a touch-friendly carousel with responsive breakpoints:

- **Mobile (\< 576px):** 1 slide visible
- **Tablet (576px - 768px):** Approximately 1/3 of configured slides
- **Small desktop (768px - 992px):** Approximately 1/2 of configured slides
- **Desktop (992px+):** Full configured slides per view

### Display Settings

Control what product information appears and how it looks.

<!-- SCREENSHOT: Module edit screen showing the Display tab with all visibility toggles and image settings -->

| Setting                          | Description                                                                       | Default           |
| -------------------------------- | --------------------------------------------------------------------------------- | ----------------- |
| **Product Template**             | Select which subtemplate plugin renders product cards (Bootstrap 5, UIkit, etc.). | Bootstrap 5       |
| **Image Width (px)**             | Width in pixels for product thumbnail images.                                     | 200               |
| **Show Image**                   | Display the product image.                                                        | Yes               |
| **Link Image to Product**        | Make the image clickable, linking to the product detail page.                     | Yes               |
| **Image Source**                 | Which image to display: Thumbnail or Main image.                                  | Thumbnail         |
| **Show Title**                   | Display the product title.                                                        | Yes               |
| **Link Title to Product**        | Make the title clickable, linking to the product detail page.                     | Yes               |
| **Show Description**             | Display the product short description.                                            | No                |
| **Description Length**           | Maximum characters to show in description. Set 0 for full description.            | 150               |
| **Show SKU**                     | Display the product SKU.                                                          | No                |
| **Show Price**                   | Display the product price.                                                        | Yes               |
| **Show Base Price**              | Display the original price (for products with special pricing).                   | Yes               |
| **Show Special Price**           | Display the discounted price.                                                     | Yes               |
| **Show Discount Badge**          | Display a percentage discount badge when special pricing is active.               | Yes               |
| **Show Stock Status**            | Display availability information (In Stock, Out of Stock).                        | No                |
| **Add to Cart Display**          | Control how the Add to Cart button appears.                                       | Show with Options |
| **Show Quantity Field**          | Display a quantity input field next to Add to Cart.                               | Yes               |
| **Show Option Images**           | Display images for product options (color swatches, etc.).                        | No                |
| **Show Option Price**            | Display price adjustments for product options.                                    | Yes               |
| **Add to Cart Button CSS Class** | CSS classes for the Add to Cart button.                                           | btn btn-primary   |

#### Add to Cart Display Options

| Option                        | Behavior                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------- |
| **Hide**                      | No Add to Cart button is shown.                                                   |
| **Show with Product Options** | Displays Add to Cart with product variant/option selectors inline.                |
| **Show without Options**      | Displays a simple Add to Cart button without variant selectors.                   |
| **Link to Detail Page Only**  | Shows a "View Product" button linking to the product page instead of Add to Cart. |

### Advanced Settings

| Setting                 | Description                                                       | Default |
| ----------------------- | ----------------------------------------------------------------- | ------- |
| **Module Class Suffix** | CSS class suffix to apply custom styling to this module instance. | None    |

## Usage Examples

### New Arrivals Section

Create a "New Arrivals" section on your homepage.

1. Set **Product Source** to **Latest**.
2. Set **Number of Products** to **8**.
3. Set **Display Layout** to **Grid** with **4 Columns**.
4. Enable **Show Image**, **Show Title**, **Show Price**.
5. Set **Add to Cart Display** to **Show with Product Options**.

<!-- SCREENSHOT: Homepage with a "New Arrivals" section showing 8 products in a 4-column grid -->

### Featured Products Slider

Create an eye-catching featured products carousel.

1. Set **Product Source** to **Featured**.
2. Set **Number of Products** to **10**.
3. Set **Display Layout** to **Slider**.
4. Set **Slides Per View** to **4**.
5. Enable **Autoplay** with **3 seconds** delay.
6. Enable **Navigation Arrows** and **Pagination Dots**.
7. Enable **Loop** for continuous scrolling.

<!-- SCREENSHOT: Featured products slider with navigation arrows and 4 products visible -->

### Category Spotlight

Display products from a specific category.

1. Set **Product Source** to **By Category**.
2. Select one or more categories in the **Categories** field.
3. Set **Ordering** to **Article Ordering** to respect the category's sort order.
4. Configure layout and display options as desired.

### Best Sellers Widget

Showcase your top-selling products in a sidebar.

1. Set **Product Source** to **Best Selling**.
2. Set **Number of Products** to **5**.
3. Set **Display Layout** to **Grid** with **1 Column** (for vertical stacking).
4. Enable **Show Price** and **Show Discount Badge**.
5. Set **Add to Cart Display** to **Link to Detail Page Only** (compact view).

<!-- SCREENSHOT: Sidebar widget showing 5 best-selling products stacked vertically -->

### Hand-Picked Product Showcase

Display specific products in a promotional banner area.

1. Set **Product Source** to **Selected Products**.
2. Click **Select Products** and choose the products to feature.
3. Products appear in the order you selected them.
4. Configure remaining options for your design.

## Styling and Templates

### Subtemplate Selection

The module uses subtemplate plugins to render product cards. Available subtemplates depend on which app plugins are installed and enabled:

- **Bootstrap 5** (`app_bootstrap5`) - Modern Bootstrap 5 styling with responsive grid
- **UIkit** (`app_uikit`) - UIkit 3 framework styling

Each subtemplate provides consistent styling that matches your site's design framework. The module inherits your J2Commerce global configuration by default, then applies module-specific overrides.

### Custom CSS Styling

Use the **Module Class Suffix** field to apply custom styling:

1. Add a unique suffix like ` -featured-products` (note the leading space).
2. Create custom CSS in your template:

```css
.j2commerce-products-module.featured-products .product-card {
    border: 2px solid #your-brand-color;
}
```

The module also generates a unique class based on the module ID: `mod-j2commerce-products-{moduleId}` for targeted styling.

## Responsive Behavior

### Grid Layout

- **Desktop (768px+):** Uses configured column count (2, 3, 4, or 6 columns)
- **Mobile (\< 768px):** Automatically collapses to 2 columns for touch-friendly browsing

### Slider Layout

The Swiper carousel automatically adjusts based on viewport:

| Viewport                      | Slides Visible         |
| ----------------------------- | ---------------------- |
| \< 576px (mobile)             | 1                      |
| 576px - 768px (tablet)        | \~1/3 of configured    |
| 768px - 992px (small desktop) | \~1/2 of configured    |
| 992px+ (desktop)              | Full configured amount |

## Troubleshooting

### No Products Appear

**Cause:** Products may not meet the filter criteria or the J2Commerce component may be disabled.

**Solution:**

1. Verify J2Commerce is enabled: Go to **System** -> **Manage** -> **Extensions** and ensure **J2Commerce** is published.
2. Check that products exist matching your filters (category, tag, product type).
3. Ensure products are enabled and have visibility set to "Visible" in J2Commerce.
4. For category/tag sources, verify the selected categories/tags contain published products.

### Slider Not Initializing

**Cause:** JavaScript conflict or Swiper library not loading.

**Solution:**

1. Open browser developer tools (F12) and check the Console for JavaScript errors.
2. Ensure the Bootstrap 5 or UIkit app plugin is enabled: Go to **J2Commerce** -> **Apps**.
3. Clear Joomla cache: **System** -> **Clear Cache**.
4. Check for template JavaScript conflicts with Swiper.

### Images Not Displaying

**Cause:** Missing product images or incorrect image source setting.

**Solution:**

1. Verify products have images assigned in their J2Commerce settings.
2. Check **Image Source** setting: "Thumbnail Image" uses the product thumbnail; "Main Image" uses the full-size image.
3. Adjust **Image Width** if images appear too small or are being scaled incorrectly.

### Add to Cart Button Not Working

**Cause:** AJAX handler not loaded or CSRF token issue.

**Solution:**

1. Ensure J2Commerce system plugin is enabled: **System** -> **Manage** -> **Plugins** -> **System - J2Commerce**.
2. Clear browser cache and reload the page.
3. Check browser console for AJAX errors.
4. For variable/configurable products, ensure variants are properly configured with pricing.

### Wrong Products Displayed

**Cause:** Caching or incorrect filter settings.

**Solution:**

1. Clear Joomla cache: **System** -> **Clear Cache**.
2. Review all filter settings in the module configuration.
3. For "Selected Products" source, verify the correct products are selected in the picker.
4. Check if "Featured Only" is accidentally enabled when you want all products.

## Related Topics

- [Creating Products](../products/creating-simple-products.md) - Add products to your catalog
- [Categories](../catalog/categories.md) - Organize products into categories
- [Product Types](../products/product-types.md) - Simple, variable, and configurable products
- [Bootstrap 5 App](./app-bootstrap5.md) - Configure Bootstrap 5 templates
- [UIkit App](./app-uikit.md) - Configure UIkit templates
