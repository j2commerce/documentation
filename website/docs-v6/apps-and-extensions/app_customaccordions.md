---
title: "Custom Accordions"
sidebar_label: "Custom Accordions"
sidebar_position: 15
description: "Add custom accordion tabs to product pages with content from articles or custom text."
---

# Custom Accordions

The Custom Accordions app adds expandable accordion sections to your product detail pages. You can create unlimited custom accordion tabs with custom content, or import content directly from Joomla articles. This is ideal for displaying product specifications, shipping information, FAQs, warranty details, and manufacturer information.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

The Custom Accordions app is a premium add-on available from the J2Commerce extension directory.

**Step 1:** Go to [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate the Custom Accordions app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the ZIP file or use the Install from URL option.

<!-- SCREENSHOT: Joomla extension install screen -->

## Enable the Plugin

Once installed, enable the plugin:

**Option A:** Go to **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing Custom Accordions -->

Search for **Custom Accordions**, click the **X** to enable it. The X turns into a green checkmark when enabled.

## Configure the Plugin

Click on **Custom Accordions** to open the configuration.

### Basic Settings Tab

| Setting | Description | Default |
| ------- | ----------- | ------- |
| **Prepare Content** | Run Joomla content plugins on accordion content. Enable if you use plugins like "Load Modules" or content parsers. | No |
| **Custom Field Short Code** | Render J2Commerce custom field shortcodes in accordion content. Enable if you use custom fields with shortcode syntax like `[field_name]`. Leave disabled if you do not use custom fields. | No |
| **Display Brand Details** | Show the product's manufacturer/brand information in a separate accordion tab. Required in some regions for compliance. | No |
| **Position Brand Accordion** | Where the Brand accordion appears relative to custom accordions. **Before** places it first; **After** places it last. | After |

<!-- SCREENSHOT: Plugin configuration screen showing Basic Settings -->

#### When to Enable Content Field Short Code

Enable **Custom Field Short Code** when:

- You have created J2Commerce custom fields for products (e.g., material, weight, dimensions)
- You want to display these custom field values inside accordion content
- You use custom field shortcodes in your accordion descriptions

Leave disabled for standard HTML content without custom field references.

#### When to Enable Prepare Content

Enable **Prepare Content** when your accordion content contains:

- Joomla content plugins (e.g., `{loadmodule}`, `{loadposition}`)
- Third-party plugin syntax (e.g., gallery sliders, video embeds)
- Shortcodes that require content plugin processing

**Note:** This option applies processing overhead. Leave disabled for simple HTML content.

#### Display Brand Details

When enabled, J2Commerce retrieves manufacturer details from the product's assigned manufacturer:

1. The manufacturer name appears as the accordion title
2. Manufacturer description content loads from the linked Joomla article

**Position Options:**

| Position | Behavior |
| -------- | -------- |
| **Before** | Brand accordion appears as the first accordion on the product page |
| **After** | Brand accordion appears as the last accordion on the product page |

## Configure Products

After enabling the plugin, each product can have custom accordions.

### Step 1: Edit a Product

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click on a product to edit it.
3. Scroll to the **Apps** section.

<!-- SCREENSHOT: Product edit form showing Apps section -->

### Step 2: Add Accordion from Article

The **Add Accordion from Article** field lets you import content from a Joomla article.

| Field | Description |
| ----- | ----------- |
| **Add Accordion from Article** | Select an existing Joomla article. The article title becomes the accordion title, and the article content becomes the accordion body. |

**To use:**

1. Click the **Select** button.
2. Choose an article from the article manager.
3. Save the product.

The accordion appears on the product page using the article's title and content.

### Step 3: Add Custom Accordions

Click the **Add Custom Accordion** button to create unlimited custom accordions.

<!-- SCREENSHOT: Custom Accordions repeatable field in product form -->

Each accordion row has these fields:

| Field | Description | Required |
| ----- | ----------- | -------- |
| **Accordion Title** | The title displayed on the accordion header. | Yes |
| **Accordion Title Icon** | Font Awesome icon class (e.g., `fa-solid fa-star`). Leave empty for no icon. | No |
| **Enabled** | Toggle to show or hide this accordion. | Yes |
| **Accordion Content** | The content displayed when the accordion is expanded. Supports HTML. | Yes |

### Step 4: Organize Accordions

The order in which accordions appear in the admin interface determines their display order on the frontend. The first accordion appears first, followed by subsequent accordions.

**Bulk Actions:**

- **Collapse All** - Minimize all accordion rows for easier navigation
- **Expand All** - Open all accordion rows for editing
- **Delete** - Click the trash icon on any row to remove it

### Step 5: Save the Product

Click **Save** or **Save & Close** to apply your changes.

## How It Works

When a customer views a product page:

1. J2Commerce checks if the Custom Accordions plugin is enabled.
2. If **Display Brand Details** is enabled and the product has a manufacturer, a Brand accordion is added.
3. Custom accordions defined on the product are rendered in order.
4. If **Prepare Content** is enabled, content plugins process the accordion content.
5. All accordions appear in a Bootstrap 5 accordion group (only one open at a time).

<!-- SCREENSHOT: Product page showing multiple accordions expanded -->

## Display Conditions

Custom accordions appear when:

- The plugin is enabled in **J2Commerce** -> **Apps**.
- At least one accordion is configured (article-based or custom).
- The product is published and visible.

**Brand accordion appears when:**

- **Display Brand Details** is set to **Yes**.
- The product has a manufacturer assigned.
- The manufacturer has a description article configured.

## Tips

- **Use articles for reusable content** - If the same specifications apply to multiple products, create a Joomla article and reuse it across products.
- **Keep titles concise** - Long accordion titles may truncate on mobile devices.
- **Use icons sparingly** - Icons should complement, not replace, meaningful titles.
- **Test with content plugins** - If using `{loadmodule}` or similar syntax, enable **Prepare Content** and verify the output.
- **Organize by importance** - Place critical information (shipping, warranty) in the first accordions for visibility.

## Troubleshooting

### Accordions Do Not Appear on Product Page

**Cause:** Plugin is disabled or no accordions configured.

**Solution:**

1. Go to **J2Commerce** -> **Apps**.
2. Verify **Custom Accordions** shows a green checkmark (enabled).
3. Edit the product and verify at least one accordion is configured and enabled.
4. Check that the accordion row has **Enabled** set to **Yes**.

### Article Content Not Loading

**Cause:** Invalid article ID or article unpublished.

**Solution:**

1. Go to **Content** -> **Articles**.
2. Verify the article exists and is published.
3. Return to the product edit screen and reselect the article.

### Content Plugins Not Processing

**Cause:** **Prepare Content** is disabled.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Custom Accordions**.
2. Set **Prepare Content** to **Yes**.
3. Click **Save**.
4. Clear cache: **System** -> **Clear Cache**.

### Brand Accordion Missing

**Cause:** Product has no manufacturer assigned or manufacturer lacks description.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Edit the product and check the **Manufacturer** field.
3. Verify the manufacturer is set.
4. Go to **J2Commerce** -> **Catalog** -> **Manufacturers**.
5. Edit the manufacturer and verify the description article is configured.

### Accordion Content Shows Raw HTML

**Cause:** Content contains HTML but is not being processed.

**Solution:**

1. If you want HTML rendered, ensure **Prepare Content** is enabled.
2. If HTML should appear as code (e.g., tutorials), leave **Prepare Content** disabled and escape your HTML.

### Icon Not Displaying

**Cause:** Invalid icon class or missing Font Awesome library.

**Solution:**

1. Verify the icon class format: `fa-solid fa-star` or `fa-regular fa-circle`.
2. Ensure your template or a plugin loads Font Awesome.
3. Test with a known icon like `fa-solid fa-check` to verify the library loads.

## Related Topics

- [Manufacturers](../catalog/manufacturers.md) - Set up manufacturers for Brand accordion
- [Product Types](../products/product-types.md) - Product configuration overview
- [Apps Overview](./index.md) - Other available J2Commerce apps