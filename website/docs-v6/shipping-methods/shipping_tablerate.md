---
title: "Table Rate Shipping"
sidebar_label: "Table Rate Shipping"
sidebar_position: 10
description: "Configure the Table Rate Shipping method for J2Commerce to charge shipping based on order weight, price, item count, or shipping groups."
---

# Table Rate Shipping

Table Rate Shipping lets you charge customers different delivery costs depending on what's actually in their cart — the total weight, the order price, the number of items, or a shipping group you assign to specific products. Instead of one flat delivery fee for everyone, you build a set of rules (a "rate table") and J2Commerce picks the right price automatically at checkout. This is the shipping method to reach for when a single flat rate doesn't reflect your real delivery costs — for example, charging more for heavy furniture than for a small accessory.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x (must already be installed — the installer checks for it and will refuse to install without it)

## Purchase and Download

**Step 1:** Go to the [**J2Commerce** website](https://www.j2commerce.com/) **->** **Shipping Methods**.

**Step 2:** Locate **Table Rate Shipping** **->** click **View Details** **->** **Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the extension. Click **Available Versions -> View Files -> Download Now**.

:::info
Table Rate Shipping is a separate add-on available from the J2Commerce Extensions Store. It is not included with the core J2Commerce 6 component.
:::

## Install the Shipping Method

You can install **Table Rate Shipping** using the Joomla installer. The following steps help you with a successful installation.

In the Joomla admin, go to **System -> Install -> Extensions**.

Upload the plugin ZIP file or use the Install from URL option.

![](/img/tablerate-install.webp)

:::info
If J2Commerce is not already installed, the installer will stop and show an error message. Install J2Commerce first, then re-run the installation.
:::

## Enable the Shipping Method

Once installed, you need to enable the shipping method. There are **two** ways you can access it.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Shipping -> Shipping Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Shipping -> Shipping Methods**

![](/img/tablerate-methods-list.webp)

Look for **Table Rate Shipping**, click the **X**, and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/tablerate-enable.webp)

## Configure the Shipping Method

Once you click on the **Table Rate Shipping** title next to the green checkmark, you are ready to start setting up the parameters.

:::tip
Click the **Toggle Inline Help** button in the toolbar and the plugin will show a description below each field as you configure it.
:::

![](/img/tablerate-toggle-help.webp)

### Basic Settings tab

![](/img/tablerate-config-basic.webp)

| Field | Description | Default | Options |
|-------|-------------|---------|---------|
| **Weight Unit** | The weight unit used for rate calculation. Select one of the weight units you have already configured in J2Commerce. | — | Your configured weight units |
| **Handling Fee** | A flat handling fee added to every shipping rate returned, on top of any per-method or per-item costs. | `0` | Decimal amount |
| **Display Shipping Method** | Choose whether to display all matching shipping methods at checkout, only the cheapest, or only the most expensive. | **All** | All, Max Price, Min Price |
| **Debug Mode** | Enable debug logging to `administrator/logs/shipping_tablerate.php`. Turn this off in production — it is only meant for troubleshooting rate calculation. | **No** | Yes, No |

## Setting Up Rate Tiers and Rules

Table Rate Shipping works with two other panels below Basic Settings: **Shipping Rules** and **Shipping Groups**. Together, these let you build any combination of shipping methods and pricing tiers.

### Shipping Groups tab

Shipping Groups (also called shipping classes) are optional labels you attach to products — for example "Standard," "Oversized," or "Fragile." You can then write rules that apply only to items in a particular group.

![](/img/tablerate-shipclass-tab.webp)

1. Click **+ Add Ship Group**.
2. Enter a **Shipping Group Name**, for example `Oversized`.
3. Repeat for as many groups as you need.
4. Click the trash icon to delete a group.

If you don't need group-based pricing, you can skip this tab entirely — table-rate tiers work fine on weight, price, or item count alone.

### Shipping Rules tab — Adding a Shipping Method

Each row in this table is a separate shipping method your customers can choose at checkout (for example "Standard Delivery" or "Express Delivery"). Click **+ Add Shipping Method** to create one.

![](/img/tablerate-methods-table.webp)

| Column | Description |
|--------|-------------|
| **Title** | The name customers see at checkout, for example `Standard Delivery`. |
| **Geo Zone** | Restrict this method to one or more geo zones. Leave empty to allow it for every zone. |
| **User Group** | Restrict this method to one or more Joomla user groups (for example a wholesale group). Leave empty to allow it for everyone. |
| **Shipping Tax** | An optional tax profile to apply to the shipping charge. Leave as **None** for no shipping tax. |
| **Min Shipping Cost** | If the calculated cost is below this amount after a shipping cost floor is applied, the floor cost is used instead. |
| **Max Shipping Cost** | If the calculated cost exceeds this amount, the shipping charge is capped and the global handling fee is subtracted. |
| **Calculation Type** | How the rules below are applied — **Per Order**, **Per Item**, or **Ship Group**. See below. |
| **Item Handling Cost** | A per-method handling fee added once the rules have produced a cost. |
| **Item Min Cost** | Clamps the calculated cost up to at least this amount before the shipping cost cap is applied. |
| **Item Max Cost** | Clamps the calculated cost down to at most this amount before the shipping cost cap is applied. |
| **Min Subtotal** | The method is only offered when the cart subtotal is at or above this amount. |
| **Max Subtotal** | The method is only offered when the cart subtotal is at or below this amount. |

**Calculation Type options:**

- **Per Order** — Adds up the weight, price, and item count across the entire cart, then evaluates your rules against those totals once.
- **Per Item** — Evaluates your rules separately for each line item in the cart (using that item's own weight, price, and quantity), then sums the resulting cost.
- **Ship Group** — Groups cart items by the Shipping Group assigned to each product, then evaluates rules per group. Items with no group assigned block this method unless it's set to show alongside other methods.

### Adding Rate Tiers (Conditions)

Under each shipping method row is a **Conditions** sub-table. This is where you build the actual rate tiers — for example "0–1 kg = $5" and "1–5 kg = $10." Click **+ Add Rule** to add a tier.

![](/img/tablerate-rules-table.webp)

| Column | Description |
|--------|-------------|
| **Ship Group** | Restrict this rule to a specific Shipping Group, **Any Group** (matches everything), or **No Group** (matches only items with no group assigned). |
| **Condition** | What the Min-Max range is measured against — **Price**, **Weight**, **Item Count**, or **None** (always matches). |
| **Min-Max** | The lower and upper bound for the condition. Leave either side blank for no bound on that side. |
| **Row Cost** | A flat amount added once when this rule matches. |
| **Item Cost** | An amount added per item (Per Item / Ship Group modes) or added once for the order total item count (Per Order mode). |
| **Weight Cost** | An amount multiplied by the matched weight and added to the cost. |
| **% Cost** | A percentage of the matched price added to the cost. |
| **Break** | When checked, stop evaluating further rules for this item/group once this rule matches. |
| **Abort** | When checked and this rule matches, shipping cost calculation stops for the **entire order** and no table-rate methods are offered at checkout. Use with caution. |

**Example — a simple weight-based tier table:**

| Ship Group | Condition | Min-Max | Row Cost | Weight Cost | Break |
|---|---|---|---|---|---|
| Any Group | Weight | 0 – 1 | $5.00 | $0 | Yes |
| Any Group | Weight | 1 – 5 | $10.00 | $0 | Yes |
| Any Group | Weight | 5 – (blank) | $20.00 | $0 | Yes |

With **Calculation Type** set to **Per Order**, this charges $5 for orders totalling up to 1 kg, $10 for orders between 1 and 5 kg, and $20 for anything above 5 kg. Checking **Break** on each row stops the plugin from also adding the cost of a later, wider-range rule.

## Adding a Shipping Group to a Product

If you're using the **Ship Group** calculation type, assign each product to a Shipping Group so the plugin knows which rules apply to it.

There are **three** ways you can access the products.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Catalog -> Products**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Products**

**Option C:** Go to **Content -> Categories ->** Find the **category** and then click inside the **published**/article section

Open the product **-> J2Commerce tab -> Apps tab -> Table Rate Shipping** section **->** select one or more **Shipping Group** values.

![](/img/tablerate-product-shipgroup.webp)

A product can belong to more than one shipping group at once.

## How It Works

When a customer reaches the shipping step at checkout:

1. J2Commerce looks up the customer's saved address, guest shipping address, or session-stored country/zone. If no address can be resolved yet, Table Rate Shipping offers no rates.
2. The customer's country and zone are matched against your configured geo zones.
3. J2Commerce checks the cart for items with shipping enabled. If nothing in the cart is shippable, no table-rate methods are offered.
4. Each enabled shipping method is checked in turn:
   - It's skipped if its assigned **Geo Zone** doesn't include one of the customer's matched geo zones (methods with no geo zone restriction match everyone).
   - It's skipped if its assigned **User Group** doesn't include the current customer's group (methods with no group restriction match everyone; guests are treated as the Public group).
   - It's skipped if the cart subtotal falls outside the method's **Min/Max Subtotal**.
   - The method's **Calculation Type** determines how the cart is measured (whole-order totals, per line item, or per shipping group) before the rules are evaluated.
5. Within a method, its rate rules are evaluated in order. A rule adds its **Row Cost**, **Item Cost**, **Weight Cost**, and **% Cost** whenever its condition and shipping-group filter match. **Break** stops further rules once one matches; **Abort** cancels all table-rate rates for the whole order.
6. The matched cost is clamped by **Item Min/Max Cost**, then by the method's **Min/Max Shipping Cost**, then the global **Handling Fee** and any **Shipping Tax** are added.
7. If **Display Shipping Method** is set to **Max Price** or **Min Price**, only the single most or least expensive matching method is shown; otherwise all matching methods are shown.

## Display Conditions

**A Table Rate Shipping method appears at checkout when:**

- The method is enabled (published) in **Shipping Rules**.
- The cart contains at least one item with shipping enabled.
- The customer's address resolves to a country and zone that match at least one of your configured geo zones (or the method has no Geo Zone restriction).
- The customer's user group matches the method's **User Group** restriction (or the method has none set).
- The cart subtotal falls within the method's **Min/Max Subtotal** range (if either is set).
- At least one rate rule matches the order (or the method has a catch-all rule with **Condition** set to **None**).

**A method disappears from checkout when:**

- No address has been resolved yet for the customer.
- No rule matches the calculated price, weight, item count, or shipping group.
- Another rule flagged **Abort** matched earlier in the calculation — this removes every table-rate method's rate for that order, not just the rule's own method.

## Tips

- Always add a catch-all rule (Condition set to **None**, or a very wide Min-Max range) as your last rule, so orders that fall outside your defined tiers still get a shipping cost instead of the method disappearing entirely.
- Check **Break** on rate tiers whenever ranges could otherwise overlap — without it, multiple matching rules will all add their costs together.
- Use **Ship Group** calculation type only after you've assigned Shipping Groups to your products; unassigned shippable items will block the method unless "display with other methods" is enabled on it.
- Turn on **Debug Mode** temporarily when a rate looks wrong, then check `administrator/logs/shipping_tablerate.php` to see exactly which geozone, user group, subtotal, or rule check excluded a method.
- Turn **Debug Mode** back off once you're done — it writes to the log on every checkout attempt.

## Troubleshooting

### Method Not Showing at Checkout

**Cause:** The customer's address, geo zone, user group, subtotal, or cart items don't satisfy the method's conditions — or no rule matched.

**Solution:**

1. Confirm the customer has selected or entered a shipping address before reaching the shipping step.
2. Go to **J2Commerce -> Shipping -> Shipping Methods -> Table Rate Shipping** and check the method's **Geo Zone** and **User Group** columns aren't excluding the customer.
3. Check the **Min/Max Subtotal** columns against the cart total.
4. Confirm at least one **Condition** rule under the method covers the customer's cart weight, price, or item count — add a catch-all rule if needed.
5. Enable **Debug Mode** and review `administrator/logs/shipping_tablerate.php` for the exact exclusion reason.

### Wrong Rate Charged

**Cause:** Multiple overlapping rules matched and their costs were added together because **Break** wasn't checked.

**Solution:**

1. Review the **Conditions** sub-table for the method and check whether more than one rule's Min-Max range could match the same cart.
2. Check **Break** on each tier so only the first matching rule applies.
3. Verify **Item Min Cost / Item Max Cost** and **Min/Max Shipping Cost** aren't clamping the total unexpectedly.

### No Matching Tier — Method Disappears Instead of Falling Back

**Cause:** The plugin has no built-in fallback rate. If no rule matches, the method is simply not offered.

**Solution:**

1. Add a rule with **Condition** set to **None** (or a very wide Min-Max range) as the last row, so it always matches as a fallback.
2. Re-test with a cart that falls outside your other tiers to confirm the fallback rule now applies.

### Geo Zone Mismatch

**Cause:** The customer's country/zone isn't covered by any of your configured geo zones, or the method's **Geo Zone** selection excludes the customer's zone.

**Solution:**

1. Go to **J2Commerce -> Setup -> Localization -> Geo Zones** and confirm a geo zone covers the customer's country and zone.
2. Go back to **Shipping Rules** and check that the method's **Geo Zone** column either includes that geo zone or is left empty.

### Shipping Tax Not Applied

**Cause:** No tax profile is selected in the method's **Shipping Tax** column, or the selected tax profile has no active rate for the customer's geo zone.

**Solution:**

1. Go to **Shipping Rules** and confirm a **Shipping Tax** profile is selected for the method (not **None**).
2. Go to **J2Commerce -> Setup -> Taxation -> Tax Profiles** and confirm the profile has an enabled rate covering the customer's geo zone.

### All Shipping Options Disappeared

**Cause:** A rule flagged **Abort** matched the order. Abort clears every table-rate method's rate for that checkout, not just the rule's own method.

**Solution:**

1. Review every method's **Conditions** sub-table for rows with **Abort** checked.
2. Confirm the Abort rule is intended to block shipping entirely for that condition (for example, an unshippable combination) — if not, uncheck **Abort** and use **Break** instead.
