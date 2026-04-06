---
title: "Wishlist"
sidebar_label: "Wishlist"
sidebar_position: 15
description: "Let customers save products to a personal wishlist and add them to the cart later — with guest support, session migration on login, and configurable buttons."
---

# Wishlist

The Wishlist app lets customers save products for later without adding them to the cart immediately. A heart icon or text button appears on product pages and product list views. Customers can view their full wishlist, add individual items or all items to the cart, and remove items they no longer want.

Guest shoppers can build a wishlist without logging in. When they log in, their guest wishlist automatically merges with their account.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

`app_wishlist.zip`

**Wishlist**&#x20;

## Purchase and Download

The **Wishlist** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Go to the [J2Commerce website](https://www.j2commerce.com) -> **Apps**.
2. Locate the **Wishlist** app -> click **View Details** -> **Add to cart** -> **Checkout**.
3. Download the `app_wishlist.zip` file from your account downloads.

## Installation

1. Go to **System** -> **Install** -> **Extensions**.
2. Upload the `app_wishlist.zip` package file.
3. The plugin installs and enables automatically.

<!-- SCREENSHOT: Joomla Extensions installer showing successful Wishlist app installation -->

## Configuration

After installation, go to **J2Commerce** -> **Apps** and click **Wishlist** to open the plugin settings.

<!-- SCREENSHOT: Apps list showing Wishlist plugin with Edit button -->

### Settings

| Setting                         | Description                                                                                  | Default             | Notes                                               |
| ------------------------------- | -------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------------------- |
| **Wishlist button type**        | Display the button as **Text** or **Icon**                                                   | Text                | Choosing **Icon** reveals the two icon fields below |
| **Button text**                 | Label for the add-to-wishlist button. Accepts a plain string or a language key.              | Add to Wishlist     | Visible only when type is **Text**                  |
| **Icon CSS class**              | Font Awesome class for the button (e.g., `fa-solid fa-heart`)                                | `fa-solid fa-heart` | Visible only when type is **Icon**                  |
| **Added to wishlist icon**      | Font Awesome class shown when the item is already saved                                      | `fa-solid fa-heart` | Visible only when type is **Icon**                  |
| **Remove after adding to cart** | Automatically remove a wishlist item when it is added to the cart                            | No                  |                                                     |
| **Link products to**            | Where product links on the wishlist page lead: **Product List Layout** or **Article Layout** | Product List Layout |                                                     |
| **Thumbnail width**             | Width in pixels for product images on the wishlist page                                      | 50                  |                                                     |
| **Redirect to wishlist**        | Redirect the customer to the wishlist page immediately after adding an item                  | No                  |                                                     |
| **Wishlist link text**          | Text for the "browse wishlist" link in the add confirmation notification                     | Browse wishlist     |                                                     |
| **Debug Mode**                  | Write debug entries to the Joomla log directory. Disable in production.                      | No                  |                                                     |

Click **Save** to apply your settings.

## Creating the Wishlist Menu Item

The wishlist page is displayed through a dedicated Joomla menu item. You must create this menu item before the wishlist page is accessible to customers.

1. Go to **Menus** -> **\[Your Menu]** -> **Add New Menu Item**.
2. Click **Select** next to **Menu Item Type**.
3. Choose **J2Commerce** -> **Wishlist**.
4. Set a **Menu Title** (for example, "My Wishlist").
5. Click **Save & Close**.

<!-- SCREENSHOT: Menu item type selection showing J2Commerce > Wishlist -->

The plugin automatically detects this menu item to build wishlist links throughout the store. If no menu item exists, the plugin falls back to a direct URL, but product "browse wishlist" links may not be SEF.

## Setting Up the Wishlist Module

The companion **J2Commerce - Wishlist** module (`mod_j2commerce_wishlist`) shows the current wishlist item count and a link to the wishlist page. Place it in your header or navigation area so customers can always see how many items they have saved.

The wishlist module is also a separate add-on and is not included in the core J2Commerce 6 package. Purchase it from the [J2Commerce Extensions Store](https://www.j2commerce.com).

### Installing the Module

1. Go to **System** -> **Install** -> **Extensions**.
2. Upload the `mod_j2commerce_wishlist.zip` file.
3. Go to **Content** -> **Site Modules** -> **New**.
4. Select **J2Commerce - Wishlist** from the module type list.

<!-- SCREENSHOT: Module type selection showing J2Commerce - Wishlist -->

### Module Settings

| Setting                | Description                                                         | Default |
| ---------------------- | ------------------------------------------------------------------- | ------- |
| **Display type**       | Show the counter as a plain **Link** or as a styled **Button**      | Link    |
| **Hide when empty**    | Hide the module entirely when the wishlist has no items             | No      |
| **Wishlist menu item** | Select the menu item created above. Leave empty for auto-detection. | (empty) |

### Module Position

Assign the module to the position in your template where the header or navigation icons appear. For most Bootstrap 5 and UIkit templates, the `nav-right` or `header` position works well.

<!-- SCREENSHOT: Module position assignment showing nav-right selected -->

### Live Count Updates

The module updates its count automatically when a customer adds or removes a wishlist item — no page reload needed. It listens for the `j2commerce:wishlist:updated` browser event dispatched by the wishlist plugin after every change.

## How It Works

### Adding Products to the Wishlist

Once the plugin is enabled, an **Add to Wishlist** button appears in two locations:

- **Product detail page** — directly below the Add to Cart button
- **Product list views** — as a compact icon button in the cart action row

<!-- SCREENSHOT: Product detail page showing Add to Wishlist button below Add to Cart -->

Customers click the button to save the product. After adding, the button changes to an "already in wishlist" state and a short notification appears with a link to the wishlist page.

For variable products with options (such as size or colour), the customer must select their options before adding to the wishlist. The exact options chosen are saved with the wishlist entry.

If a customer tries to add a variable product without selecting options first, they see the message: "Please select product options before adding to wishlist."

### Viewing the Wishlist

Customers visit the wishlist page through the menu item you created. The page shows a table with:

- Product thumbnail, name, and any saved options
- An **Add to Cart** button for each item
- A **Remove** (trash icon) button for each item
- A **Select All** checkbox and per-row checkboxes for bulk actions
- **Add all to cart** and **Remove all items** buttons that appear when items are checked
- A **Continue Shopping** button that returns to the previous page

<!-- SCREENSHOT: Full wishlist page showing product list with action buttons -->

### Guest Customers — Save Wishlist Prompt

Customers who are browsing as guests see a **Save wishlist** button at the bottom of their wishlist page. Clicking it takes them to the Joomla login page. Once they log in, their session wishlist automatically migrates to their account.

This prompt only appears when the wishlist contains at least one item and the visitor is not logged in.

### Bulk Actions

Customers can select multiple items using the checkboxes. When any item is checked, the bulk action buttons appear:

- **Add all to cart** — adds every checked item to the shopping cart
- **Remove all items** — removes every checked item from the wishlist

If **Remove after adding to cart** is enabled in settings, items automatically leave the wishlist when they enter the cart.

### Guest Wishlist and Login Migration

Customers who are not logged in can still add products to a wishlist. The wishlist is stored against their browser session. When the customer logs in, their session wishlist automatically migrates to their account — no items are lost.

If the logged-in account already has the same product in the wishlist, the duplicate is silently discarded so the wishlist stays clean.

## Tips

- Set **Wishlist button type** to **Icon** on stores with compact product list layouts to keep the cart row tidy.
- Leave **Remove after adding to cart** off (the default) if you want customers to be able to add the same wishlist item to the cart more than once.
- If your template already uses a heart icon for another purpose, change the **Icon CSS class** to something else (for example, `fa-solid fa-bookmark`) to avoid confusion.
- Enable **Redirect to wishlist** if you want customers taken to their wishlist immediately after adding an item — useful for gift registry workflows.
- Set the **Wishlist menu item** in the module settings explicitly rather than relying on auto-detection. Auto-detection scans all menu items, which adds a small overhead on every page load.
- Enable **Hide when empty** on the module to keep the header uncluttered until a customer has saved at least one item.

## What's New in J2Commerce

The J2Commerce Wishlist app includes several improvements over the J2Store version:

- **Live count updates** — the wishlist module refreshes its counter instantly when items are added or removed, without any page reload. J2Store required a full page reload.
- **Icon-only mode for list views** — a dedicated icon layout keeps product list rows compact. In J2Store the same text button appeared everywhere.
- **Guest migration on login** — guest wishlist entries now migrate automatically using Joomla's standard user login events, making the flow more reliable across different authentication plugins.
- **Bootstrap 5 layout** — the wishlist page and all buttons use Bootstrap 5 markup and classes natively. J2Store used Bootstrap 3/4 markup.
- **Select All and bulk actions** — customers can check all items and add or remove them in a single click. J2Store required item-by-item actions.
- **Save wishlist login prompt** — guests see a contextual prompt to log in and save their wishlist rather than losing items at session end.

## Troubleshooting

### The Add to Wishlist button does not appear

**Cause:** The plugin may not be enabled, or the product template does not fire the `AfterAddToCartButton` event.

**Solution:**

1. Go to **System** -> **Manage** -> **Extensions** and confirm the Wishlist plugin is enabled.
2. Check that your active template plugin (app\_bootstrap5 or app\_uikit) is also enabled.
3. If you have customised the product cart template (`default_cart.php`), make sure it includes the `AfterAddToCartButton` event call.

### The wishlist page shows a blank page or "No items"

**Cause:** The wishlist menu item has not been created, or it points to the wrong task.

**Solution:**

1. Confirm you have created a menu item of type **J2Commerce -> Wishlist** (see [Creating the Wishlist Menu Item](#creating-the-wishlist-menu-item)).
2. Check that the menu item is published.
3. If the page renders but shows "No items", the customer may not have added anything yet, or the plugin is not recording additions. Enable **Debug Mode** in settings and check the Joomla logs directory for `j2commerce` log entries.

### The module count does not update after adding an item

**Cause:** The module may be cached, or the `j2commerce:wishlist:updated` browser event is not reaching the module.

**Solution:**

1. Open the module settings and set **Caching** to **No Caching**.
2. Clear the Joomla cache (**System** -> **Clear Cache**).
3. Check the browser console for JavaScript errors that might prevent event listeners from running.

### Guest wishlist items did not carry over after login

**Cause:** The session expired before login, or browser cookies were cleared between the shopping session and the login.

**Solution:**

This is a normal edge case when browser cookies expire between sessions. The wishlist migration happens at the moment of login. If the browser session had already expired before the customer logged in, there is no guest wishlist left to migrate.

### The "Add all to cart" action does nothing

**Cause:** No items are checked, or the CSRF token has expired.

**Solution:**

1. Select at least one item by checking its checkbox.
2. If the page has been open for a long time, refresh it to get a fresh CSRF token, then try again.

## Related

- [Gift Wrapping](app-giftwrapping.md) — add gift wrapping options at checkout
- [Easy Reorder](app_reorder.md) — let customers reorder from previous orders
