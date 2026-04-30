---
title: "Pickup Options"
sidebar_label: "Pickup Options"
sidebar_position: 10
description: "Offer in-store or curbside pickup at checkout. Configure multiple pickup locations or time slots that customers choose from when they select this shipping option."
---

# Pickup Options

The Pickup Options plugin adds a local pickup choice to your checkout shipping step. When a customer selects it, they are shown a list of pickup locations or time slots you have configured — such as store branches, drop-off points, or collection windows. Their choice is stored on the order so you know exactly which option they selected.

This plugin works equally well for physical store pickups ("Downtown Branch", "Westside Store") and time-based pickups ("Morning 9am–12pm", "Afternoon 1pm–5pm"). You can add images and descriptions to each option to help customers choose.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `shipping_pickup.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `shipping_pickup.zip` package file.
4. The plugin installs and enables automatically.

## Enable the Plugin

There are two ways to reach the shipping methods screen.

**Option A:** Click the **J2Commerce** icon at the top right corner -> **Setup** -> **Shipping Methods**.

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Dashboard** -> **Setup** -> **Shipping Methods**.

<!-- SCREENSHOT: Shipping Methods list screen with Pickup Options entry visible -->

Find **Pickup Options** in the list, click the **X** icon, and it will turn into a green checkmark. The plugin is now enabled and ready to configure.

## Configure the Plugin

Click the **Pickup Options** title (next to the green checkmark) to open the settings. The settings are split into two tabs: **General Settings** and **Pickup Options**.

:::tip

Click the **Toggle Inline Help** button at the top of the settings page to show a short description beneath each field.

:::

---

### General Settings Tab

<!-- SCREENSHOT: General Settings tab showing all fields -->

**Display Name** — The shipping option label shown to customers at checkout. The default is `Pickup`. You can change this to anything that suits your store, such as "Store Pickup", "Click & Collect", or "In-Store Collection".

**Pickup Fee** — An optional flat charge added to the order when pickup is chosen. Enter `0` for free pickup.

**Option Display Style** — Controls how the list of pickup options appears after a customer selects Pickup:
- **Radio cards** (default) — Each option is shown as a card with an image, name, and description. Best for a small number of clearly differentiated locations or time slots.
- **Dropdown** — A compact dropdown list. Best when you have many options or limited screen space.

**Supporting Text** — A short line of text shown above the options list (for example, "Select a pickup location" or "Choose your collection time"). Leave blank to use the default prompt.

**Geographic Zones** — Restrict pickup availability to customers whose shipping address falls inside one or more of the selected geozones. Select **All geozones** (the default) to offer pickup to everyone regardless of location.

:::info

Geozones are configured under **J2Commerce** -> **Setup** -> **Geozones**. If a customer's shipping address does not match any of the selected geozones, the Pickup Options method will not appear at checkout.

:::

**Tax Profile** — Applies an optional tax to the pickup fee. Leave as **None** if you do not charge tax on the pickup fee or if the pickup fee is zero.

**Minimum Order Subtotal** — Hide the Pickup option if the cart subtotal is below this amount. Set to `0` to disable this check.

**Maximum Order Subtotal** — Hide the Pickup option if the cart subtotal is above this amount. Set to `0` to disable this check.

---

### Pickup Options Tab

<!-- SCREENSHOT: Pickup Options tab showing a repeatable table with example rows -->

This is where you define each pickup option that customers can choose from. You must add at least one option before the plugin will appear at checkout.

Each row in the table represents one option. Click **Add item** to add a new row.

| Field | Description |
|-------|-------------|
| **Option Name** | The name customers see, e.g. "Main Street Store" or "Saturday 10am–2pm". Required. |
| **Description** | A short description shown below the option name, e.g. an address or extra details. |
| **Image** | An optional photo or icon for this option, shown in radio-card style. |
| **Enabled** | Toggle individual options on or off without deleting them. |

To reorder options, drag the rows into the order you want. Click **Save** or **Save & Close** when done.

---

## Configuration Reference

| Setting | Description | Default |
|---------|-------------|---------|
| **Display Name** | Label shown at checkout | Pickup |
| **Pickup Fee** | Flat charge for pickup orders | `0` (free) |
| **Option Display Style** | Radio cards or dropdown | Radio cards |
| **Supporting Text** | Prompt shown above options list | Default prompt |
| **Geographic Zones** | Restrict by geozone | All geozones |
| **Tax Profile** | Tax applied to pickup fee | None |
| **Minimum Order Subtotal** | Hide below this subtotal | `0` (disabled) |
| **Maximum Order Subtotal** | Hide above this subtotal | `0` (disabled) |

---

## How It Works at Checkout

When a customer reaches the shipping step, J2Commerce checks whether Pickup Options should appear:

1. **Geographic Zones** — If specific geozones are selected, the customer's shipping address must match at least one. If not, Pickup is skipped.
2. **Subtotal Limits** — If minimum or maximum subtotals are set, the cart must be within range.
3. **Pickup appears** — If all checks pass, Pickup Options is listed as a selectable shipping method alongside any other enabled methods.

When the customer selects Pickup, a second panel appears immediately below showing their available options. In **Radio cards** mode each option shows its name, description, and image. In **Dropdown** mode it is a compact list.

<!-- SCREENSHOT: Checkout shipping step with Pickup selected, showing radio-card options panel -->

The customer must select one option before they can continue to the next checkout step. Their chosen option name is saved to the order.

---

## Common Setups

### Multiple store locations

Add one row per branch in the **Pickup Options** tab. For each row, set the **Option Name** to the branch name (e.g. "North Melbourne Store") and the **Description** to the street address and opening hours. Upload a photo of the storefront as the **Image**.

### Collection time slots

Use option names for time windows instead of locations, e.g. "Morning — 9am to 12pm" and "Afternoon — 1pm to 5pm". Leave the **Image** field blank if you prefer a cleaner list. Switch **Option Display Style** to **Dropdown** if you have many slots.

### Single-location free pickup

Add one row with your store name and address. Leave **Pickup Fee** at `0` and **Option Display Style** at **Radio cards**. This gives customers a clear confirmation of where to collect their order without any extra charge.

### Restrict pickup to local customers only

Create a geozone for your city or region under **J2Commerce** -> **Setup** -> **Geozones**. Select that geozone in the **Geographic Zones** field. Customers with a shipping address outside the zone will not see the Pickup option.

---

## Tips

- Add a **Description** to each option — a full address for locations, or additional instructions for time slots.
- Use **images** for location options so customers can visually confirm the right store.
- Use **Dropdown** display when you have more than five or six options to keep the panel compact.
- Seasonal or limited-availability options can be disabled temporarily using the **Enabled** toggle on each row rather than deleting them.
- The **Pickup Fee** applies to the entire order, not per item. For free pickup, leave it at `0`.

---

## Troubleshooting

### Pickup Options does not appear at checkout

**Cause:** A restriction is hiding the method, or no pickup options are configured.

**Solution:**

1. Confirm the plugin is enabled. Go to **J2Commerce** -> **Setup** -> **Shipping Methods** and check for the green checkmark next to **Pickup Options**.
2. Open the plugin settings and go to the **Pickup Options** tab. Ensure at least one row exists and its **Enabled** toggle is set to **Yes**.
3. Check **Geographic Zones**. If specific zones are selected, verify that the customer's shipping address falls within one of them.
4. Check **Minimum Order Subtotal**. If set, the cart total must meet or exceed that amount.
5. Check **Maximum Order Subtotal**. If set, the cart total must not exceed that amount.

### The options panel does not appear after selecting Pickup

**Cause:** All pickup options may be disabled, or the plugin has no options configured.

**Solution:**

1. Go to **J2Commerce** -> **Setup** -> **Shipping Methods** -> **Pickup Options**.
2. Open the **Pickup Options** tab and verify that at least one row has **Enabled** set to **Yes**.
3. Click **Save** and test checkout again.

### Option images are not loading

**Cause:** The image path is incorrect, or the file was not uploaded to the correct location.

**Solution:**

1. Go to **Content** -> **Media**.
2. Navigate to the `com_j2commerce/shipping_pickup` folder to verify the image files are present.
3. Re-open the plugin settings and re-select the images using the media picker in the **Pickup Options** tab.
4. Click **Save**.

### Customer cannot proceed past the shipping step

**Cause:** The customer has selected Pickup but has not chosen a specific pickup option from the panel.

**Solution:**

The plugin requires customers to select one pickup option before continuing. This is by design — the selection is stored on the order. Ask the customer to scroll down to the pickup panel and select an option before clicking **Next**.
