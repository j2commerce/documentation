---
title: "Product Category Setup Wizard"
sidebar_label: "Product Category Wizard"
sidebar_position: 4
description: "Use the J2Commerce Product Category Setup Wizard to quickly create product categories, a first product, and a menu item so customers can find your store."
---

# Product Category Setup Wizard

The Product Category Setup Wizard is a step-by-step modal that helps new store owners create everything they need to make their products accessible on the frontend — all in under two minutes. It creates a Joomla category, a product, an article, and a published menu item pointing to your store.

The wizard is designed to be completed once at the start of your store setup. You can run it again at any time if you want to add more categories or products quickly.

---

## Prerequisites

- J2Commerce 6 installed and the required system and content plugins enabled.
- You are logged in to the Joomla administrator as a Super Administrator.

---

## How to Open the Wizard

The wizard can be launched from two places:

**From the Setup Guide:**

1. Click the purple **Setup Wizard** button in the J2Commerce dashboard toolbar.
2. Expand the **Catalog** section.
3. Click the **Shop / Category Menu Item** check.
4. Click **Run Setup Wizard**.

<!-- SCREENSHOT: Setup Guide offcanvas showing Catalog section with "Run Setup Wizard" button -->

**From the dashboard directly:**

The wizard modal is embedded on the dashboard page. Any button or link that opens `#j2commerceCategoryWizardModal` will launch it.

:::info
The wizard requires Super Administrator access. If you do not have `core.admin` permission on `com_j2commerce`, the AJAX calls will return a 403 error.
:::

---

## Wizard Flows

The wizard adapts to your situation. On the first step you choose how many products you plan to sell, and the wizard branches into one of two flows:

| Your Answer | Flow | What Gets Created |
|---|---|---|
| **Just 1 product** | Single Product | Category, article, product, menu item |
| **2 – 10, 11 – 50, or 50+ products** | Multi Category | Root category, subcategories, menu item(s) |

---

## Single Product Flow

Use this flow when you have one product to sell and want a menu item that links directly to its product page.

### Step 1: How many products?

Select **Just 1 product** and click **Next**.

<!-- SCREENSHOT: Step 1 with four card choices; "Just 1 product" card selected -->

### Step 2: Product name

Type the name of your product (for example, "Handmade Ceramic Mug"). Click **Next**.

<!-- SCREENSHOT: Step 2 with product name text field filled in -->

### Step 3: Product type

Choose the type that best describes your product:

| Type | When to use |
|---|---|
| **Digital Download** | E-books, software, music, or any file the customer downloads after purchase |
| **Physical Product (no variants)** | A single item without size or color options — e.g., a book or a candle |
| **Physical Product with Options** | An item with variants like size or color — e.g., a t-shirt |

Click **Next**.

<!-- SCREENSHOT: Step 3 with three product type cards; "Physical Product with Options" selected -->

### Step 3b: Define options (variable products only)

If you chose **Physical Product with Options**, the wizard asks you to name the options your product has (for example, "Size" or "Color"). Each option title you enter becomes a separate option set.

- Click **Add another option** to add a second option (for example, both Size and Color).
- Click the **×** button to remove an option row.

Click **Next** when all option titles are filled in.

<!-- SCREENSHOT: Step 3b with two option title rows: "Size" and "Color" -->

### Step 3c: Add option values (variable products only)

For each option title you defined, enter the specific values customers will choose from:

- Type each value (for example, "Small", "Medium", "Large" for a Size option).
- Click **Add value** to add more values in the same option.
- Click the **×** button to remove a value.

Click **Next** when all options have at least one value.

<!-- SCREENSHOT: Step 3c showing "Size" group with Small/Medium/Large values and "Color" group with Red/Blue values -->

:::tip
Option names and values are saved globally and reused across products. If a "Size" option with matching values already exists in your catalog, the wizard will reuse it rather than create a duplicate.
:::

### Template step (YOOtheme sites only)

If YOOtheme is your active frontend template and the J2Commerce UIkit app plugin is installed and enabled, an extra step asks which layout to use:

| Choice | When to choose |
|---|---|
| **UIkit layout** | Your theme is YOOtheme and you want the layout optimized for UIkit components |
| **Bootstrap 5 layout** | All other situations (default) |

Click **Next**.

### Confirm

A summary lists everything the wizard will create. Review it and click **Create My Store** when you are ready.

<!-- SCREENSHOT: Confirm step showing summary list: category, article, product, menu item -->

### Success

The wizard displays a success screen with direct links:

- **Edit your product** (or **Edit Product & Configure Variants** for variable products) — takes you directly to the product edit form.
- **Add more products** — opens the Products list.

<!-- SCREENSHOT: Success screen with green check and two action buttons -->

For variable products, a note reminds you to open the product editor to set pricing, inventory, and images for each variant combination.

Click **Done** to close the wizard.

---

## Multi Category Flow

Use this flow when you have multiple products organized into categories.

### Step 1: How many products?

Select **2 – 10 products**, **11 – 50 products**, or **50+ products**, then click **Next**.

### Step 2: How many categories?

Choose how many product categories you need:

| Choice | What happens |
|---|---|
| **Just 1 category** | The wizard creates one root "Shop" category and skips the subcategory steps |
| **2 – 5 categories** | You will name 2 categories by default (and can add more) |
| **6 – 10 categories** | You will name 3 categories by default (and can add more) |
| **More than 10** | A single root "Shop" category is created; you add subcategories later from the admin |

Click **Next**.

### Step 3: Display settings (2+ categories only)

Choose how you want the categories to appear in your site navigation:

| Choice | Result |
|---|---|
| **All categories on the same page** | One "Product Categories" menu item showing all categories at once |
| **Each category on its own page** | A separate menu item for each subcategory |

Click **Next**.

### Category naming

Name your categories. For "Just 1 category" or "More than 10", you name the root category only. For other choices, a row of text inputs appears — one per category.

- Click **Add another category** to add more name rows.
- Click the **×** button to remove a row.

Click **Next**.

<!-- SCREENSHOT: Category naming step with three inputs: "Clothing", "Accessories", "Footwear" -->

### Template step (YOOtheme sites only)

Same as described in the single-product flow above.

### Confirm

Review the summary and click **Create My Store**.

### Success

The success screen shows:

- Root category created
- Number of subcategories created
- Number of menu items created
- **Add products** button — opens the Products list
- **Manage categories** button — opens the Joomla Categories admin for `com_content`

Click **Done** to close the wizard.

---

## What the Wizard Creates

### Single Product Flow

| Item | Details |
|---|---|
| **Joomla category** | Title: "Shop" (or custom name), published, under the Joomla root category, extension `com_content` |
| **Joomla article** | Title: your product name, published, assigned to the "Shop" category |
| **J2Commerce product** | Linked to the article, product type as selected, master variant with SKU `PROD-[id]` |
| **Product options** | One option per title you entered, with values linked to the product |
| **Menu item** | Type: component, link: product page, published in a "J2Commerce" menu type |

### Multi Category Flow

| Item | Details |
|---|---|
| **Root category** | Title: first category name you entered, published under the Joomla root |
| **Subcategories** | One per additional name you entered, published as children of the root |
| **Menu item(s)** | Either one "categories" menu item pointing at the root, or one "products" menu item per subcategory, depending on your display choice |

:::note
The wizard does **not** create products in the multi-category flow. After the wizard finishes, go to **J2Commerce → Catalog → Products** and add products to each category.
:::

---

## After the Wizard

### For single-product stores

1. Open the product using the **Edit your product** link on the success screen.
2. Set the price on the **Prices** tab.
3. For variable products, use the **Variants** tab to configure each size/color combination's price, stock, and images.
4. Upload product images on the **Images** tab.
5. Preview the frontend using the menu item the wizard created.

### For multi-category stores

1. Go to **J2Commerce → Catalog → Products → New** and create your first product.
2. Assign it to one of the categories the wizard created.
3. Repeat for each product.
4. (Optional) Assign the menu item(s) to your site's main navigation menu in **Menus → Main Menu**.

---

## Tips

- The wizard creates menu items in a hidden "J2Commerce" menu type, not your main navigation menu. To show your shop in the site header, copy or recreate the menu item in **Menus → Main Menu**.
- If YOOtheme is detected but the UIkit app plugin is not installed, the template step is skipped and Bootstrap 5 is used automatically.
- Running the wizard a second time creates additional items — it does not overwrite anything created previously.
- Option names are case-insensitive. Entering "size" when a "Size" option already exists reuses the existing option.

---

## Troubleshooting

### The wizard shows "Setup failed. Please try again."

**Cause:** An error occurred on the server while creating one of the items (category, article, product, or menu item).

**Solution:**

1. Check the Joomla error log at **System → Manage → System Information → PHP Error Log** or in `administrator/logs/com_j2commerce.php`.
2. Verify your database user has `INSERT` permissions on the `#__categories`, `#__content`, `#__j2commerce_products`, and `#__menu` tables.
3. Try again. If the root category or option already exists from a previous run, the wizard reuses it rather than duplicating it.

### The wizard modal does not open

**Cause:** The wizard JavaScript did not load, or the modal HTML is missing from the page.

**Solution:**

1. Open the browser developer console (F12) and check for JavaScript errors.
2. Ensure you are a **Super Administrator** — lower permission levels prevent the AJAX calls from succeeding.
3. Hard-refresh the page (Ctrl+Shift+R) to clear the browser asset cache.

### The menu item was created but the frontend page shows a 404 error

**Cause:** The menu item was created in the "J2Commerce" menu type, which is not assigned to any module position in your template.

**Solution:**

1. Go to **Menus → J2Commerce** in the Joomla administrator.
2. Copy the menu item to your main site navigation menu (typically **Main Menu**), or create a new menu item there manually using the same link the wizard used.
3. Make sure the menu module is published and assigned to your site's header position.

### No template/UIkit step appeared, but I have YOOtheme installed

**Cause:** The J2Commerce UIkit app plugin (`app_uikit`) is not installed or not enabled.

**Solution:**

1. Go to **System → Manage → Extensions** and search for `app_uikit`.
2. Enable the plugin if it is disabled.
3. Run the wizard again — the template step will now appear.

---

## Related Topics

- [Store Setup](store-setup.mdx)
- [Dashboard](dashboard.md)
- [Creating Products](../catalog/products)
- [Creating Options](../catalog/creating-options.mdx)
