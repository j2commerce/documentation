# Manufacturers

Manufacturers in J2Commerce represent the brands or companies that produce the products you sell. You can create a manufacturer profile for each brand, assign products to it, and let customers filter your catalog by brand. Manufacturers can also be linked to a Joomla article for a rich brand description page.

Common uses include listing the brands you carry (Nike, Sony, Acme), restricting coupons to specific brands, and allowing customers to browse all products from a particular manufacturer.

## Accessing Manufacturers

Go to **J2Commerce** -> **Catalog** -> **Manufacturers**.

<!-- SCREENSHOT: J2Commerce Catalog menu open showing Manufacturers option -->

## Understanding the Manufacturers List

<!-- SCREENSHOT: Manufacturers list showing status column, company name, city, country, zone, and ID columns -->

Each row in the list represents one manufacturer.

| Column | Description |
|--------|-------------|
| **Status** | Whether the manufacturer is published (green) or unpublished (red). Click to toggle. |
| **Manufacturer** | The company or brand name. Click to open and edit. |
| **City** | The manufacturer's city from their address record. |
| **Country** | The manufacturer's country. |
| **Zone / State** | The manufacturer's state or province. |
| **ID** | The internal manufacturer ID number. |

## Toolbar Actions

| Button | What It Does |
|--------|-------------|
| **New** | Opens the form to create a new manufacturer. |
| **Publish** | Publishes the selected manufacturers. |
| **Unpublish** | Unpublishes the selected manufacturers. |
| **Trash** | Moves the selected manufacturers to the trash. |
| **Delete** | Permanently deletes trashed manufacturers (only visible when viewing the trash). |
| **Preferences** | Opens the global J2Commerce configuration settings. |
| **Help** | Opens the J2Commerce documentation. |

## Searching and Filtering

Type in the search bar to find manufacturers by **company name** or **city**.

Click **Search Tools** to show additional filters:

| Filter | Description |
|--------|-------------|
| **Status** | Show only Published, Unpublished, or Trashed manufacturers. |
| **Country** | Show only manufacturers from a specific country. |

<!-- SCREENSHOT: Search Tools panel open showing Status and Country filter dropdowns -->

## Creating a Manufacturer

1. Click **New** in the toolbar.
2. Fill in the manufacturer details (see field descriptions below).
3. Click **Save & Close** to save and return to the list, or **Save** to stay on the form.

<!-- SCREENSHOT: New manufacturer edit form showing all fields -->

### Manufacturer Fields

#### Contact Information

| Field | Description |
|-------|-------------|
| **Company Name** | The brand or company name. This is the only required field and is what appears in product dropdowns and storefront filters. |
| **First Name** | Contact person's first name (optional). |
| **Last Name** | Contact person's last name (optional). |
| **Email** | Contact email address (optional). |
| **Phone** | Primary phone number (optional). |
| **Phone 2** | Secondary phone number (optional). |
| **Fax** | Fax number (optional). |
| **Tax Number / VAT ID** | The manufacturer's tax or VAT registration number (optional). |

#### Address

| Field | Description |
|-------|-------------|
| **Address Line 1** | Street address. |
| **Address Line 2** | Apartment, suite, or unit number. |
| **City** | City name. |
| **ZIP / Postal Code** | ZIP or postal code. |
| **Country** | Select from the countries list. Selecting a country automatically loads the available states or provinces below. |
| **Zone / State** | State, province, or region — loaded automatically based on the selected country. |

#### Additional Information

| Field | Description |
|-------|-------------|
| **Brand Description Article** | Link to a Joomla article that serves as the brand's description page. Click **Select** to choose an existing article, or **New** to create one. This is optional but useful for brands with a story or marketing content. |

#### Status (sidebar)

| Field | Description |
|-------|-------------|
| **Status** | Set to **Published** to make the manufacturer active in product dropdowns and storefront filters, or **Unpublished** to hide it. |
| **Ordering** | Controls the display order of manufacturers in lists and dropdowns. |

:::tip

Only the **Company Name** field is required. All contact details and address fields are optional — fill them in if you need to keep supplier contact information in one place.

:::

## Editing a Manufacturer

1. Click the manufacturer's company name in the list to open it.
2. Update any fields.
3. Click **Save & Close**.

## Publishing and Unpublishing Manufacturers

An unpublished manufacturer does not appear in product filter dropdowns on the storefront or in the admin product filter. Products assigned to an unpublished manufacturer are not affected — they remain visible in the catalog.

**To toggle a single manufacturer:** Click the status icon in the **Status** column.

**To toggle multiple manufacturers:** Check their boxes and click **Publish** or **Unpublish** in the toolbar.

## Deleting Manufacturers

Manufacturers must be trashed before they can be permanently deleted.

**Step 1 — Trash the manufacturer:**
1. Check the box next to the manufacturer.
2. Click **Trash** in the toolbar.

**Step 2 — Permanently delete:**
1. Use the **Status** filter and select **Trashed** to show trashed items.
2. Check the box next to the manufacturer.
3. Click **Delete** in the toolbar.
4. Confirm when prompted.

:::tip

Deleting a manufacturer does not delete or unpublish any products assigned to it. Those products simply lose their manufacturer assignment.

:::

## Assigning Manufacturers to Products

Once a manufacturer is created, you can assign it to products from the product edit screen.

1. Go to **J2Commerce** -> **Catalog** -> **Products**.
2. Click a product name to open it.
3. Go to the **General** tab and find the **Manufacturer** field.
4. Select the manufacturer from the dropdown.
5. Click **Save**.

You can also filter the products list by manufacturer using the **Manufacturer** filter in **Search Tools** on the Products screen.

## Adding a Brand Description

You can link each manufacturer to a Joomla article to display rich brand content — logos, history, marketing text — on a dedicated brand page.

1. Open the manufacturer's edit form.
2. In the **Brand Description Article** field, click **Select**.
3. Choose an existing article from the picker, or click **New** to create one.
4. Click **Save & Close**.

The linked article can be displayed on the storefront using your template's brand/manufacturer layout.

## Tips

- The **Company Name** field is what customers see in product filters. Use the brand's public-facing name, not an internal code.
- Sort the list by **Manufacturer Name** (ascending) to quickly scan your full brand catalog alphabetically.
- Use the **Brand Description Article** field to build SEO-friendly brand pages directly within Joomla's content system — no extra plugin needed.
- You can filter the products list by manufacturer to quickly see how many products are assigned to each brand.

## Troubleshooting

### A manufacturer does not appear in the product Manufacturer filter

**Cause:** The manufacturer may be unpublished.

**Solution:**

Go to **Manufacturers**, find the manufacturer, and check the **Status** column. If the circle is red, click it to publish the manufacturer. Only published manufacturers appear in product dropdowns and storefront filters.

### The Zone / State dropdown is empty after selecting a country

**Cause:** No zones have been configured for that country in J2Commerce.

**Solution:**

Go to **J2Commerce** -> **Localization** -> **Zones** and add the required zones for that country, then return to the manufacturer form and select the zone.

### I cannot save a manufacturer — it says a required field is missing

**Cause:** The **Company Name** field is empty.

**Solution:**

Enter the company or brand name in the **Company Name** field, then save again. This is the only required field.

## Related Topics

- [Managing Products](../managing-products.md)
- [Vendors](../vendors/)
- [Advanced Pricing](../advanced-pricing.md)
