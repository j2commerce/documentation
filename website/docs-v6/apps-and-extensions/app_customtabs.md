---
title: "Custom Tabs"
sidebar_label: "Custom Tabs"
sidebar_position: 16
description: "Add custom tabbed content sections to product pages with content from articles or custom HTML."
---

# Custom Tabs

The Custom Tabs app adds customizable tabbed sections to your product detail pages. You can create unlimited custom tabs with rich HTML content, or import content directly from Joomla articles. This is ideal for displaying product specifications, shipping information, FAQs, warranty details, and manufacturer information in an organized, tabbed interface.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

The Custom Tabs app is a premium add-on available from the J2Commerce extension directory.

**Step 1:** Go to [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate the Custom Tabs app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the Plugin

In the Joomla Administrator, go to **System** -> **Install** -> **Extensions**.

Upload the ZIP file or use the Install from URL option.

<!-- SCREENSHOT: Joomla extension install screen -->

## Enable the Plugin

Once installed, enable the plugin:

**Option A:** Go to **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing Custom Tabs -->

Search for **Custom Tabs**, click the **X** to enable it. The X turns into a green checkmark when enabled.

## Configure the Plugin

Click on **Custom Tabs** to open the configuration.

### Basic Settings Tab

| Setting | Description | Default |
| ------- | ----------- | ------- |
| **Prepare Content** | Run Joomla content plugins on tab content. Enable if you use plugins like "Load Modules" or content parsers. | No |
| **Custom Field Short Code** | Render J2Commerce custom field shortcodes in tab content. Enable if you use custom fields with shortcode syntax like `[field_name]`. Leave disabled if you do not use custom fields. | No |
| **Display Brand Details** | Show the product's manufacturer/brand information in a separate tab. Required in some regions for compliance. | No |
| **Position Brand Tab** | Where the Brand tab appears relative to custom tabs. **Before** places it first; **After** places it last. | After |

<!-- SCREENSHOT: Plugin configuration screen showing Basic Settings -->

#### When to Enable Content Field Short Code

Enable **Custom Field Short Code** when:

- You have created J2Commerce custom fields for products (e.g., material, weight, dimensions)
- You want to display these custom field values inside tab content
- You use custom field shortcodes in your tab descriptions

Leave disabled for standard HTML content without custom field references.

#### When to Enable Prepare Content

Enable **Prepare Content** when your tab content contains:

- Joomla content plugins (e.g., `{loadmodule}`, `{loadposition}`)
- Third-party plugin syntax (e.g., gallery sliders, video embeds)
- Shortcodes that require content plugin processing

**Note:** This option applies processing overhead. Leave disabled for simple HTML content.

#### Display Brand Details

When enabled, J2Commerce retrieves manufacturer details from the product's assigned manufacturer:

1. The manufacturer name appears as the tab title
2. Manufacturer description content loads from the linked Joomla article

**Position Options:**

| Position | Behavior |
| -------- | -------- |
| **Before** | Brand tab appears as the first tab on the product page |
| **After** | Brand tab appears as the last tab on the product page |

## Configure Products

After enabling the plugin, each product can have custom tabs.

### Step 1: Edit a Product

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click on a product to edit it.
3. Scroll to the **Apps** section.

<!-- SCREENSHOT: Product edit form showing Apps section -->

### Step 2: Add Tab from Article

The **Custom Tab from Article Id** field lets you import content from a Joomla article.

| Field | Description |
| ----- | ----------- |
| **Custom Tab from Article Id** | Select an existing Joomla article. The article title becomes the tab title, and the article content becomes the tab body. |

**To use:**

1. Click the **Select** button to open the article picker.
2. Choose an article from the article manager.
3. Save the product.

The tab appears on the product page using the article's title and content.

### Step 3: Add Custom Tabs

Click the **Add Custom Tab** button to create unlimited custom tabs.

<!-- SCREENSHOT: Custom Tabs repeatable field in product form -->

Each tab row has these fields:

| Field | Description | Required |
| ----- | ----------- | -------- |
| **Tab Title** | The title displayed on the tab header. | Yes |
| **Tab Title Icon** | Font Awesome icon class (e.g., `fa-solid fa-star`). Leave empty for no icon. | No |
| **Enabled** | Toggle to show or hide this tab. | Yes |
| **Tab Content** | The content displayed when the tab is active. Supports HTML and opens with the configured editor. | Yes |

### Step 4: Organize Tabs

The order in which tabs appear in the admin interface determines their display order on the frontend. The first tab appears first in the tab navigation.

**Bulk Actions:**

- **Collapse All** - Minimize all tab rows for easier navigation
- **Expand All** - Open all tab rows for editing
- **Delete** - Click the trash icon on any row to remove it

### Step 5: Save the Product

Click **Save** or **Save & Close** to apply your changes.

## How It Works

When a customer views a product page:

1. J2Commerce checks if the Custom Tabs plugin is enabled.
2. If **Display Brand Details** is enabled and the product has a manufacturer, a Brand tab is added.
3. Custom tabs defined on the product are rendered in order.
4. If **Prepare Content** is enabled, content plugins process the tab content.
5. All tabs appear in a Bootstrap 5 tabbed interface.

<!-- SCREENSHOT: Product page showing multiple tabs in the tabbed interface -->

## Display Conditions

Custom tabs appear when:

- The plugin is enabled in **J2Commerce** -> **Apps**.
- At least one tab is configured (article-based or custom).
- The product is published and visible.

**Brand tab appears when:**

- **Display Brand Details** is set to **Yes**.
- The product has a manufacturer assigned.
- The manufacturer has a description article configured.

## Tips

- **Use articles for reusable content** - If the same specifications apply to multiple products, create a Joomla article and reuse it across products.
- **Keep titles concise** - Long tab titles may truncate on mobile devices.
- **Use icons sparingly** - Icons should complement, not replace, meaningful titles.
- **Test with content plugins** - If using `{loadmodule}` or similar syntax, enable **Prepare Content** and verify the output.
- **Organize by importance** - Place critical information (shipping, warranty) in the first tabs for visibility.

## Troubleshooting

### Tabs Do Not Appear on Product Page

**Cause:** Plugin is disabled or no tabs configured.

**Solution:**

1. Go to **J2Commerce** -> **Apps**.
2. Verify **Custom Tabs** shows a green checkmark (enabled).
3. Edit the product and verify at least one tab is configured and enabled.
4. Check that the tab row has **Enabled** set to **Yes**.

### Article Content Not Loading

**Cause:** Invalid article ID or article unpublished.

**Solution:**

1. Go to **Content** -> **Articles**.
2. Verify the article exists and is published.
3. Return to the product edit screen and reselect the article.

### Content Plugins Not Processing

**Cause:** **Prepare Content** is disabled.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Custom Tabs**.
2. Set **Prepare Content** to **Yes**.
3. Click **Save**.
4. Clear cache: **System** -> **Clear Cache**.

### Brand Tab Missing

**Cause:** Product has no manufacturer assigned or manufacturer lacks description.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Edit the product and check the **Manufacturer** field.
3. Verify the manufacturer is set.
4. Go to **J2Commerce** -> **Catalog** -> **Manufacturers**.
5. Edit the manufacturer and verify the description article is configured.

### Tab Content Shows Raw HTML

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

- [Manufacturers](../catalog/manufacturers.md) - Set up manufacturers for Brand tab
- [Product Types](../products/product-types.md) - Product configuration overview
- [Apps Overview](./index.md) - Other available J2Commerce apps
- [Custom Accordions](./app_customaccordions.md) - Accordion-style product sections