# Manufacturers

Manufacturers in J2Commerce represent the brands or companies that produce the products you sell. You can create a manufacturer profile for each brand, assign products to it, and let customers filter your catalog by brand. Manufacturers can also be linked to a Joomla article for a rich brand description page.

Common uses include listing the brands you carry (Nike, Sony, Acme), restricting coupons to specific brands, and allowing customers to browse all products from a particular manufacturer.

## Accessing Manufacturers

There are **two** ways you can access Options.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Manufacturers**&#x20;

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Catalog -> Manufacturers**

![Adding new options](/img/manuf.webp)

Select **New** to create a new Manufacturer.

## Understanding the Manufacturers List

![](/img/manuf-config1.webp)

Each row in the list represents one manufacturer.

**Status:** Whether the manufacturer is published (green) or unpublished (red). Click to toggle.

**Manufacturer:** The company or brand name. Click to open and edit.

**City:** The manufacturer's city from their address record.

**Country:** The manufacturer's country.

**Zone / State:** The manufacturer's state or province.

**ID:** The internal manufacturer ID number.

## Toolbar Actions

![](/img/manuf-config2.webp)

**New:** Opens the form to create a new manufacturer.

**Actions:** Only activates as a dropdown when at least one manufacturer is selected

- **Publish:** Publishes the selected manufacturers.

- **Unpublish:** Unpublishes the selected manufacturers.

- **Trash:** Moves the selected manufacturers to the trash.

**Options:** Opens the global J2Commerce configuration settings.

**Help:** Opens the J2Commerce documentation.

## Searching and Filtering

Type in the search bar to find manufacturers by **company name** or **city**.

Click **Search Tools** to show additional filters:

![](/img/manuf-config3.webp)

**Select Status:** Show only Published, Unpublished, or Trashed manufacturers.

**Select Country:** Show only manufacturers from a specific country.

## Creating a Manufacturer

1. Click **New** in the toolbar.
2. Fill in the manufacturer details (see field descriptions below).
3. Click **Save & Close** to save and return to the list, or **Save** to stay on the form.

![](/img/manuf-config.webp)

#### Contact Information

**Company Name:** The brand or company name. This is the only required field and is what appears in product dropdowns and storefront filters.

**First Name:** Contact person's first name (optional).

**Last Name:** Contact person's last name (optional).

**Email:** Contact email address (optional).

**Phone:** Primary phone number (optional).

**Phone 2:** Secondary phone number (optional).

**Fax:** Fax number (optional).

**Tax Number / VAT ID:** The manufacturer's tax or VAT registration number (optional).

#### Address

**Address Line 1:** Street address.

**Address Line 2:** Apartment, suite, or unit number.

**City:** City name.

**ZIP / Postal Code:** ZIP or postal code.

**Country:** Select from the countries list. Selecting a country automatically loads the available states or provinces below.

**Zone / State:** State, province, or region — loaded automatically based on the selected country.

#### Additional Information

**Brand Description Article:** Link to a Joomla article that serves as the brand's description page. Click **Select** to choose an existing article, or **New** to create one. This is optional but useful for brands with a story or marketing content.

#### Status (sidebar)

**Status:** Set to **Published** to make the manufacturer active in product dropdowns and storefront filters, or **Unpublished** to hide it.

:::tip

Only the **Company Name** field is required. All contact details and address fields are optional — fill them in if you need to keep supplier contact information in one place.

:::

## Publishing and Unpublishing Manufacturers

![](/img/manuf-config4.webp)

An unpublished manufacturer does not appear in product filter dropdowns on the storefront or in the admin product filter. Products assigned to an unpublished manufacturer are not affected — they remain visible in the catalog.

**To toggle a single manufacturer:** Click the status icon in the **Status** column.

**To toggle multiple manufacturers:** Check their boxes and click **Publish** or **Unpublish** in the toolbar.

## Deleting Manufacturers

Manufacturers must be trashed before they can be permanently deleted.

![](/img/manuf-config5.webp)

**Step 1 — Trash the manufacturer:**

1. Check the box next to the manufacturer.
2. Click **Trash** in the toolbar.

**Step 2 — Permanently delete:**

![](/img/manuf-config6.webp)

1. Use the **Status** filter and select **Trashed** to show trashed items.
2. Check the box next to the manufacturer.
3. Click **Delete** in the toolbar.
4. Confirm when prompted.

:::tip

Deleting a manufacturer does not delete or unpublish any products assigned to it. Those products simply lose their manufacturer assignment.

:::

## Assigning Manufacturers to Products

Once a manufacturer is created, you can assign it to products from the product edit screen.

- Go to **J2Commerce** **-> Catalog ->** **Products**.

![](/img/manuf-products1.webp)

- Click a product name to open it.

- Go to the **J2Commerce** tab **-> General** tab and find the **Manufacturer** field.

- Select the manufacturer from the dropdown.

- Click **Save**.

![](/img/manuf-products.webp)

You can also filter the products list by manufacturer using the **Manufacturer** filter in **Search Tools** on the Products screen.

## Tips

- The **Company Name** field is what customers see in product filters. Use the brand's public-facing name, not an internal code.
- Sort the list by **Manufacturer Name** (ascending) to quickly scan your full brand catalog alphabetically.
- Use the **Brand Description Article** field to build SEO-friendly brand pages directly within Joomla's content system — no extra plugin needed.
- You can filter the product list by manufacturer to quickly see how many products are assigned to each brand.

## Troubleshooting

### A manufacturer does not appear in the product Manufacturer filter

**Cause:** The manufacturer may be unpublished.

**Solution:**

Go to **Manufacturers**, find the manufacturer, and check the **Status** column. If the circle is grey, click it to publish the manufacturer. Only published manufacturers appear in product dropdowns and storefront filters.

### The Zone / State dropdown is empty after selecting a country

**Cause:** No zones have been configured for that country in J2Commerce.

**Solution:**

Go to **J2Commerce** **-> Localization ->** **Zones** and add the required zones for that country, then return to the manufacturer form and select the zone.

### I cannot save a manufacturer — it says a required field is missing

**Cause:** The **Company Name** field is empty.

**Solution:**

Enter the company or brand name in the **Company Name** field, then save again. This is the only required field.
