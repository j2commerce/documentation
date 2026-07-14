---
title: "Additional Terms"
sidebar_label: "Additional Terms"
sidebar_position: 1
description: "Add extra terms-and-conditions checkboxes or links to J2Commerce checkout, targeted by country/region and positioned wherever you need them."
---

# Additional Terms

The Additional Terms app lets you add one or more extra terms-and-conditions acknowledgements to your checkout — separate from your store's main Terms and Conditions checkbox. Use it for a cancellation policy, an age-verification notice, a GDPR consent statement, or any other agreement that only some of your customers need to see.

Each item you add can be a simple informational link, or a checkbox the customer must select before they can continue. You choose exactly where in checkout it appears, and you can restrict any item so it only shows to customers in a specific country or region.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

## Purchase and Download

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) -> **Apps**.

**Step 2:** Locate the **Additional Terms** app -> click **View Details** -> **Add to cart -> Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner and search for the app. Click **Available Versions -> View Files -> Download Now**.

<!-- SCREENSHOT: J2Commerce website Apps listing showing the Additional Terms app -->

## Install the App

You can install the **Additional Terms** app using the Joomla installer.

In the Joomla admin, go to **System -> Install -> Extensions**.

Upload the plugin ZIP file, or use the **Install from URL** option.

<!-- SCREENSHOT: System -> Install -> Extensions upload screen -->

## Enable the App

Once installed, you need to enable the app. There are two ways to reach it.

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Apps**.

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce -> Apps**.

<!-- SCREENSHOT: J2Commerce Apps list with Additional Terms row -->

Look for **Additional Terms for J2Commerce**, click the **X**, and it will turn into a green checkmark. It is now enabled and ready for setup.

<!-- SCREENSHOT: Additional Terms row showing the enabled green checkmark -->

## Configure the App

Click the **Additional Terms** title next to the green checkmark to open its settings. The settings are split across two tabs: **Basic** and **Additional Terms**.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

<!-- SCREENSHOT: Additional Terms configuration screen showing the Basic and Additional Terms tabs -->

### Basic tab

| Field | Description | Default |
|-------|-------------|---------|
| **Checkout Position** | Where in checkout this additional-terms block appears. | Before Order Confirmation |
| **Template** | Which look (Bootstrap 5 or UIkit) is used to render the checkboxes and links, or leave on **Automatic** to match whatever style your storefront's menu item already uses. | Automatic |
| **Geozone Match Address** | Which checkout address is checked against a term's assigned country/region, when that term is restricted to one. | Shipping Address |
| **Debug Mode** | Writes blocking decisions to the Joomla log. Leave off on a live store. | No |

**Checkout Position** options:

- **After Billing Address**
- **After Shipping Address**
- **Before Payment Method**
- **Before Order Confirmation** (default)

Pick the position that makes the most sense for what you're asking the customer to agree to. For example, an age-verification notice reads better right after the billing or shipping step, while a cancellation-policy acknowledgement usually fits best right before the customer confirms their order.

**Template** shows a visual picker with an **Automatic** card plus a card for each installed storefront style (Bootstrap 5, UIkit). Leaving it on **Automatic** means the checkboxes and links always match whatever style the current page is already using — most stores can leave this alone.

**Geozone Match Address** only matters if you go on to restrict one or more terms items to a specific country/region (covered below). If you don't restrict any items, this setting has no effect.

<!-- SCREENSHOT: Basic tab with Checkout Position, Template, Geozone Match Address, and Debug Mode fields -->

### Additional Terms tab

This is where you build the list of terms items and set the message shown when a required checkbox is missed.

| Field | Description |
|-------|-------------|
| **Terms Items** | Add as many separate terms items as you need (up to 20). Each can be a plain link or a checkbox. |
| **Warning Message** | The message shown when a customer tries to continue without checking a required item. Leave blank to use the default: "Please accept the additional terms and conditions to continue." |

<!-- SCREENSHOT: Additional Terms tab showing the Terms Items list and Warning Message field -->

## Adding a Terms Item

Click **Add New Item** under **Terms Items** to create a new row. Each row has the following fields.

<!-- SCREENSHOT: A single Terms Item row expanded, showing all its fields -->

| Field | Description |
|-------|-------------|
| **Display Type** | **Link Only** shows the terms as a plain hyperlink with nothing to accept. **Checkbox** shows a checkbox next to the label. |
| **Required to Checkout** | Only shown when Display Type is **Checkbox**. When set to **Yes**, the customer cannot move past this checkout step until the box is checked. Has no effect on Link Only items. |
| **Terms Article** | The Joomla article that holds the actual terms text. Its content opens in a pop-up window when the customer clicks the label. You can pick an existing article, or create and edit one without leaving this form. |
| **Geozone** | Restrict this item to customers in a specific country/region. Leave on **All** to show it to every customer regardless of location. |
| **Label Prefix** | Text shown before the clickable label, e.g. "I agree to the". Optional — leave blank to use the default wording. |
| **Label** | The clickable text itself, e.g. "Terms and Conditions". Leave blank to use the default wording. |
| **Label Suffix** | Text shown after the clickable label. Optional — leave empty if your prefix and label already read as a complete sentence. |

If you leave **Label Prefix**, **Label**, and **Terms Article** all blank on a row, that row is treated as unfinished and will not appear on the storefront — fill in at least the label text or attach an article before you expect it to show up.

### Restricting a term to a country or region

Set **Geozone** on any row to limit that item to customers whose address falls inside that region. This is useful when only some of your customers legally need to see a particular notice — for example, a GDPR consent checkbox for European customers, or a recycling-fee disclosure for customers in a specific state.

Geozones are managed separately, under **J2Commerce -> Localization -> Geozones**. Create or confirm the region there first, then select it on the terms item row.

By default, J2Commerce checks the customer's **shipping** address against the geozone. If your store should check the **billing** address instead, change **Geozone Match Address** to **Billing Address** on the Basic tab.

### Making a checkbox required

Set **Display Type** to **Checkbox**, then set **Required to Checkout** to **Yes**. The customer must check the box before they can move past whichever checkout position you chose. If they try to continue without checking it, they see your **Warning Message**.

Leave **Required to Checkout** on **No** to display a checkbox that's purely optional — for example, an opt-in for a newsletter-style acknowledgement that shouldn't block checkout.

<!-- SCREENSHOT: Storefront checkout showing a required checkbox terms item with its label and modal link -->

## How It Works

1. At the checkout position you selected, J2Commerce checks whether any terms items apply to the current customer.
2. Any item whose Geozone is **All**, or whose Geozone matches the customer's resolved address, is displayed. Items assigned to a different region are simply skipped for that customer.
3. Each visible item shows its prefix, label, and suffix text. Clicking the label opens the linked article's content in a pop-up window.
4. If a checkbox item is marked **Required to Checkout**, the customer must check it before continuing. Attempting to continue without checking it shows your **Warning Message**.
5. As a safety net, J2Commerce also confirms all required items were accepted at the moment the order is finally submitted — even if the checkout step itself was somehow bypassed, the order is still blocked and the same warning message is shown.
6. Once the order is placed, the acceptance record is cleared so the next checkout starts fresh.

## Tips

- Use **Link Only** items for informational content that doesn't need explicit agreement, and reserve **Checkbox + Required** for anything that genuinely must be accepted before you can process the order.
- Keep **Label** short — it's the part customers click, so it should read naturally as part of the sentence formed by Prefix + Label + Suffix.
- Reuse the same Joomla article across multiple terms items if the same policy applies to several situations, so you only maintain the wording in one place.
- If you serve customers in multiple countries, set up a Geozone-restricted item for each region that has its own legal requirement, and leave a Geozone of **All** for anything that applies to everyone.
- Turn on **Debug Mode** only while troubleshooting — it writes every blocking decision to the Joomla log, which adds unnecessary noise on a live store.

## Troubleshooting

### A terms item does not appear at checkout

**Cause:** The row is unfinished, or its Geozone doesn't match the customer's address.

**Solution:**

1. Go to **J2Commerce -> Apps -> Additional Terms for J2Commerce -> Additional Terms** tab.
2. Open the row and confirm it has at least a **Label** or a **Terms Article** filled in — rows with none of these are treated as unfinished and never display.
3. Check the row's **Geozone**. If it's set to a specific region, confirm the customer's shipping (or billing, if you changed **Geozone Match Address**) address actually falls within that Geozone.
4. Confirm the Geozone itself is configured correctly under **J2Commerce -> Localization -> Geozones**.

### Clicking the label doesn't show any content

**Cause:** No Terms Article is attached, or the attached article is unpublished or restricted to a viewing access level the customer doesn't have.

**Solution:**

1. Open the terms item row and confirm a **Terms Article** is selected.
2. Go to **Content -> Articles**, open the article, and confirm it's **Published**.
3. Check the article's **Access** level and confirm it's visible to public/guest customers if the item should be visible storefront-wide.

### Checkout won't let the customer continue even after checking the box

**Cause:** More than one required item is on the page, or the checkbox value isn't being submitted.

**Solution:**

1. Confirm every required checkbox on the page has actually been checked — the warning message appears again for each required item that's still unchecked.
2. Clear the browser cache and reload the checkout page, then try again.
3. Turn on **Debug Mode** in the Basic tab and check the Joomla log for the specific item that's blocking submission.

### Wrong template style (Bootstrap 5 vs UIkit) is showing

**Cause:** **Template** on the Basic tab is set to a fixed style instead of **Automatic**.

**Solution:**

1. Go to **J2Commerce -> Apps -> Additional Terms for J2Commerce -> Basic** tab.
2. Set **Template** back to **Automatic** so it always matches the current menu item's checkout style, or manually pick the style that matches the rest of your storefront.
