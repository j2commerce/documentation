---
title: "Shipping Troubleshooter"
sidebar_label: "Shipping Troubleshooter"
sidebar_position: 10
description: "Use the built-in Shipping Troubleshooter to diagnose and fix common shipping configuration problems in your J2Commerce store."
---

# Shipping Troubleshooter

The Shipping Troubleshooter is a built-in diagnostic tool that helps you find and fix common shipping setup problems before your customers ever notice them. It checks your shipping methods, geo zones, shipping rates, and product settings in one place, and points you to exactly what needs attention.

## How to Open the Troubleshooter

Go to **J2Commerce** -> **Shipping** -> **Shipping Troubleshooter**.

The tool opens on the **Shipping Configuration Dashboard** — a home screen that gives you an overall health check of your shipping setup at a glance.

## What You'll See on the Dashboard

At the top of the dashboard, four stat cards summarize your current shipping configuration. Each card displays a number and turns green or red based on whether things look healthy.

| Card                         | What It Shows                              | Green Means                           | Red Means                                                |
| ---------------------------- | ------------------------------------------ | ------------------------------------- | -------------------------------------------------------- |
| **Enabled Shipping Methods** | How many shipping methods are active       | At least one method is ready          | No methods are enabled — customers cannot check out      |
| **Enabled Geo Zones**        | How many geo zones are active              | At least one geo zone is defined      | No geo zones exist — methods may not know where to apply |
| **Products with Shipping**   | How many products have shipping turned on  | At least one shippable product exists | No products are set up to ship                           |
| **Total Products**           | The total number of products in your store | Informational only (always blue)      | N/A                                                      |

If any of the first three cards shows red, customers are likely to run into problems at checkout. Use the steps below to work through each issue.

## Step 1: Check Shipping Methods

Click the **Check Shipping Methods** button on the dashboard. This opens the **Shipping Methods Diagnostic** page, which inspects three things:

- **Geo Zones** — Are any geo zones enabled?
- **Shipping Methods** — Are any shipping methods enabled?
- **Shipping Rates** — Do any shipping methods have rates configured?

Each item shows a colored status badge:

- **Green (OK)** — That part of your configuration is in order.
- **Yellow (Warning)** — Something could be improved, but it's not a showstopper.
- **Red (Error)** — This will prevent customers from seeing shipping options.

### Quick Check list

Below the stat cards, a **Quick Check** list shows the same three items with a plain-English question and a badge. Look for any red badges and address those first.

### What the alerts mean

After reviewing the Quick Check, the page shows one of three messages:

- **"Critical Issues Found"** (red alert) — You are missing shipping methods or shipping rates. Customers cannot complete orders until these are fixed.
- **"Potential Improvements"** (yellow alert) — Geo zones are missing or incomplete. Orders may still go through, but shipping methods are not restricted to specific regions.
- **"Configuration Looks Good!"** (green alert) — Your basic shipping setup is in order.

### Navigation

Use the **Next: Products** button at the bottom of the page to continue to Step 2, or click **Back to Start** to return to the dashboard.

## Step 2: Check Product Settings

Click the **Check Product Settings** button on the dashboard (or **Next: Products** from Step 1). This opens the **Product Shipping Settings** page, which scans every enabled product and checks whether it is correctly configured for shipping.

### Product summary cards

Four cards appear at the top of the product list: Below shows the Card and what it shows.

**Products OK** (green): Products fully configured for shipping

**Products with Warnings** (yellow): Products missing weight or dimensions

**Products with Errors** (red): Products with shipping disabled or critical data missing

**Total Products Checked** (blue): Total number of products scanned

### Product table

Below the summary, a table lists every product with its shipping status. The columns include:

- **Product name** — with any issues or warnings listed in small text beneath the name
- **SKU** — the product's stock-keeping unit code
- **Shipping** — a green checkmark if shipping is enabled for the variant, or a red X if it is disabled
- **Weight** — shown as a green badge if set, or "N/A" if missing
- **Dimensions** — shown as a green badge if all three values are set, yellow if only some are set, or "N/A" if all are missing
- **Status** — a badge showing OK, Warning, or Error for the product overall
- **Actions** — an edit link that takes you directly to the product's Joomla article editor, pre-scrolled to the J2Commerce shipping tab

### Status badge legend

Below shows the Badge and their meaning.

**OK** (green): Shipping is enabled and weight or dimensions are set

**Warning** (yellow): Shipping is enabled but weight or dimensions are missing

**Error** (red): Shipping is disabled, or the product has no weight and no dimensions

You can use the search and filter tools above the table to narrow down to only products with warnings or errors.

### Editing a product

Click the edit icon in the **Actions** column for any product to open its Joomla article. The page jumps straight to the **Shipping** tab in the J2Commerce fields panel so you can update the settings without hunting for them.

## Quick Actions

The dashboard and the Step 1 diagnostic page both include a **Quick Actions** panel with shortcut links. These save you from navigating through menus manually.

Below shows the Link and where it goes.

**Manage Shipping Methods: J2Commerce** -> **Shipping** -> **Shipping Methods**

**Manage Geo Zones: J2Commerce** -> **Shipping** -> **Geo Zones**

**Manage Products: J2Commerce** -> **Catalog** -> **Products** (dashboard only)

## Common Issues

The dashboard includes an expandable **Common Shipping Issues** section. Click any issue heading to expand it and read the plain-English solution.

### No shipping options appear at checkout

This happens when no shipping methods are enabled, geo zones are not configured for the customer's location, or products do not have shipping turned on. Work through Step 1 to confirm you have at least one enabled shipping method with rates, and Step 2 to check that your products have shipping enabled.

### Shipping rates are incorrect or too high

Check the rate configuration inside each shipping method. Also review your products in Step 2 — if weights or dimensions are missing, weight-based and dimension-based shipping methods cannot calculate accurate rates.

### Shipping methods not showing for certain locations

This is usually a geo zone issue. Open **Manage Geo Zones** and confirm that the countries and regions you ship to are included in at least one enabled geo zone. Then verify that geo zone is assigned to the relevant shipping method.

## Tips

- Start with the dashboard — the four metric cards tell you instantly where to focus before you dig into details.
- After fixing issues in one area, click **Back to Start** to reload the dashboard and confirm the counts have improved.
- The troubleshooter is read-only. It never changes any settings automatically — all fixes are made through the normal shipping and product screens.

## Troubleshooting

### The dashboard shows zero enabled shipping methods but I know I have some

**Cause:** The shipping method plugin may be disabled at the Joomla extension level, or the method may be unpublished in J2Commerce.

**Solution:**

1. Go to **System** -> **Manage** -> **Plugins** and search for your shipping plugin. Make sure it is enabled.
2. Go to **J2Commerce** -> **Shipping** -> **Shipping Methods** and confirm the method has a green status icon.
3. Return to the Shipping Troubleshooter and refresh the page.

### Step 1 shows geo zones as a warning even though I have geo zones configured

**Cause:** Geo zones exist but may have no location rules assigned to them, so they appear incomplete.

**Solution:**

1. Go to **J2Commerce** -> **Shipping** -> **Geo Zones**.
2. Open each geo zone and confirm it has at least one country or region added in its **Locations** list.
3. Save and return to the troubleshooter.

### Step 2 shows all products with errors even though shipping is enabled on the product

**Cause:** Shipping may be enabled at the product level but disabled on the default variant, or the variant's shipping toggle is set to No.

**Solution:**

1. Click the edit icon next to the product in the table.
2. On the **Shipping** tab, look for the **Enable Shipping** field and set it to **Yes**.
3. If the product has variants, check each variant's shipping setting individually.
4. Save the product and return to the troubleshooter to re-run the check.

### The troubleshooter shows everything is OK but shipping still does not appear at checkout

**Cause:** The issue may be more specific than the basic checks cover — for example, a shipping method rate range that does not match the cart total, or a geo zone that does not include the customer's state or province.

**Solution:**

1. Open **J2Commerce** -> **Shipping** -> **Shipping Methods** and review each method's rate configuration in detail.
2. Check whether minimum or maximum order amount settings on each method are excluding the customer's cart.
3. Confirm the customer's country and zone (state or province) are both covered by an active geo zone.

### I fixed a product but it still shows a Warning in the table

**Cause:** The page may be displaying results from before your edit.

**Solution:**

Reload the troubleshooter page or click **Back to Start** and then **Check Product Settings** again to refresh the data.
