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

## Purchase and Download

The **Wishlist** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com) -> **Apps**.

**Step 2:** Locate the **Wishlist** app -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Download the `app_wishlist.zip` file from your account downloads.

## Installation

1. Go to **System** -> **Install** -> **Extensions**.
2. Upload the `app_wishlist.zip` package file.
3. The plugin installs and enables automatically.

## Configuration

After installation, go to **J2Commerce** -> **Apps** and click **Wishlist** to open the plugin settings.

<!-- SCREENSHOT: Apps list showing Wishlist plugin with Edit button -->

### Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Wishlist button type** | Display the button as **Text** or **Icon** | Text |
| **Button text** | Text label for the add-to-wishlist button (accepts language key or plain text) | Add to Wishlist |
| **Icon CSS class** | Font Awesome class for the button icon (used when type is Icon) | `fa-solid fa-heart` |
| **Added to wishlist icon** | Font Awesome class shown when the item is already in the wishlist | `fa-solid fa-heart` |
| **Remove after adding to cart** | Automatically remove the wishlist item when it is added to the cart | No |
| **Link products to** | Where product links in the wishlist page go: **Product List Layout** or **Article Layout** | Product List Layout |
| **Thumbnail width** | Width in pixels of product thumbnail images on the wishlist page | 50 |
| **Redirect to wishlist** | Redirect the customer to the wishlist page after adding an item | No |
| **Wishlist link text** | Text for the "browse wishlist" link shown in the notification after adding | Browse wishlist |
| **Debug Mode** | Write debug log entries to `administrator/logs/j2commerce_app_wishlist.php`. Disable in production. | No |

Click **Save** to apply your settings.

## Creating the Wishlist Menu Item

The wishlist page is displayed through a dedicated Joomla menu item. You must create this menu item for the wishlist page to be accessible.

1. Go to **Menus** -> **[Your Menu]** -> **Add New Menu Item**.
2. Click **Select** next to **Menu Item Type**.
3. Choose **J2Commerce** -> **Wishlist**.
4. Set a **Menu Title** (e.g., "My Wishlist").
5. Click **Save & Close**.

<!-- SCREENSHOT: Menu item type selection showing J2Commerce > Wishlist -->

The wishlist page URL will match the alias you set for this menu item. The plugin automatically detects this menu item to generate wishlist links throughout the store.

## How It Works

### Adding Products to the Wishlist

Once the plugin is enabled, an **Add to Wishlist** button appears in two locations:

- **Product detail page** — next to the Add to Cart button
- **Product list views** — as an icon button in the cart action row

<!-- SCREENSHOT: Product detail page showing Add to Wishlist button next to Add to Cart -->

Customers click the button to add the product to their wishlist. After adding, the button changes to an "already in wishlist" state and a notification appears with a link to the wishlist page.

For variable products (with options), the customer must select their options before adding to the wishlist. The selected options are saved with the wishlist item.

### Viewing the Wishlist

Customers visit the wishlist page via the menu item you created. The page shows a table with:

- Product image, name, and selected options
- An **Add to Cart** button for each item
- A **Remove** button for each item
- A **Select All** checkbox for bulk operations
- **Add all to cart** and **Remove all items** buttons that appear when items are checked

<!-- SCREENSHOT: Full wishlist page showing product list with action buttons -->

### Bulk Actions

Customers can select multiple items using the checkboxes. When any item is checked, the bulk action buttons appear:

- **Add all to cart** — adds every checked item to the regular cart
- **Remove all items** — removes every checked item from the wishlist

If **Remove after adding to cart** is enabled in settings, items move from the wishlist to the cart automatically.

### Guest Wishlist

Customers who are not logged in can still add products to a wishlist. The wishlist is stored against their browser session. When the customer logs in, their session wishlist automatically migrates to their account — no items are lost.

If the logged-in account already has the same product in the wishlist, the duplicate is silently discarded.

## Tips

- Set the **Wishlist button type** to **Icon** on stores with compact product list layouts to keep the cart row tidy.
- Leave **Remove after adding to cart** off (the default) if you want customers to be able to add the same wishlist item to the cart multiple times.
- If you use a template that already shows a heart icon for favourites, change the **Icon CSS class** to a different icon (e.g., `fa-solid fa-bookmark`) to avoid visual confusion.
- Enable **Redirect to wishlist** if you want customers immediately taken to their wishlist after adding an item — useful for stores with a gift registry workflow.

## Troubleshooting

### The Add to Wishlist button does not appear

**Cause:** The plugin may not be enabled, or the product template does not fire the `AfterAddToCartButton` event.

**Solution:**

1. Go to **System** -> **Manage** -> **Extensions** and confirm the Wishlist plugin is enabled.
2. Check your active template plugin (app_bootstrap5 or app_uikit) is also enabled.
3. If you have customized the product cart template (`default_cart.php`), make sure it includes the `AfterAddToCartButton` event call.

### The wishlist page shows a blank page or "No items"

**Cause:** The wishlist menu item has not been created, or it points to the wrong task.

**Solution:**

1. Confirm you have created a menu item of type **J2Commerce -> Wishlist** (see [Creating the Wishlist Menu Item](#creating-the-wishlist-menu-item)).
2. Check that the menu item is published.
3. If the page renders but shows "No items", the customer may not have added anything yet, or the plugin is not recording adds. Enable **Debug Mode** in settings and check `administrator/logs/j2commerce_app_wishlist.php` for errors.

### Guest wishlist items did not carry over after login

**Cause:** The session ID may have regenerated before the migration could complete, or browser cookies were cleared.

**Solution:**

This is a normal edge case when browser cookies expire between sessions. The wishlist migration happens at the moment of login. If the browser session was already expired before login, there is no guest wishlist to migrate.

### The "Add all to cart" action does nothing

**Cause:** No items are checked, or the CSRF token has expired.

**Solution:**

1. Select at least one item by checking its checkbox.
2. If the page has been open for a long time, refresh the page to get a fresh CSRF token and try again.

## Related

- [Gift Wrapping](app-giftwrapping.md) — add gift wrapping options to checkout
- [Easy Reorder](app_reorder.md) — let customers reorder from past orders
