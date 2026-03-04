---
title: "Gift Wrapping"
sidebar_label: "Gift Wrapping"
sidebar_position: 20
description: "Offer gift wrapping options during checkout, allowing customers to add special packaging and personal messages to their orders."
---

# Gift Wrapping

The Gift Wrapping app adds an optional step to your J2Commerce checkout where customers can select gift wrapping for their order. You can offer multiple wrapping options with different prices, images, and descriptions. Customers can also include a personal message to be included with the gift.

This feature is perfect for stores selling gifts, seasonal merchandise, or any products where customers may want special presentation.

## Prerequisites

- J2Commerce 6 installed and enabled
- At least one shipping method configured (gift wrapping only appears for shippable orders)
- Gift Wrapping app plugin purchased and installed

## Step 1: Purchase and Install the Plugin

The Gift Wrapping app is a premium add-on available from the J2Commerce extension directory.

1. Purchase the Gift Wrapping app from [J2Commerce Apps](https://www.j2commerce.com/apps).
2. Download the plugin ZIP file from your account.
3. In Joomla Administrator, go to **System** -> **Install** -> **Extensions**.
4. Upload the ZIP file or use the Install from URL option.
5. After installation, go to **J2Commerce** -> **Apps**.
6. Find **Gift Wrapping** in the list and click to enable and configure.

## Step 2: Configure the Plugin

1. In **J2Commerce** -> **Apps**, click on **Gift Wrapping** to open the configuration.

<!-- SCREENSHOT: J2Commerce Apps list showing Gift Wrapping plugin -->

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable Gift Wrapping** | Show or hide the gift wrapping step in checkout. When disabled, the step is completely hidden. | Yes |
| **Step Position** | Where in the checkout flow the gift wrapping step appears. See [Step Position Options](#step-position-options). | After Billing Address |
| **Show Message Field** | Allow customers to include a personal message with the gift wrapping. | Yes |

### Step Position Options

The gift wrapping step can appear at different points in the checkout flow:

| Position | Description |
|----------|-------------|
| **After Billing Address** | Shows after the billing address step (default) |
| **After Shipping Address** | Shows after the shipping address step |
| **Before Payment Method** | Shows before the payment selection step |
| **Before Confirm Order** | Shows just before the order confirmation step |

Choose the position that best fits your checkout flow. For most stores, **After Billing Address** or **After Shipping Address** works well.

## Step 3: Add Gift Wrapping Options

In the **Gift Wrapping Options** section, define each wrapping option available to customers.

1. Click the **Add** button to create a new wrapping option.
2. Fill in the following fields:

| Field | Description | Required |
|-------|-------------|----------|
| **Name** | The name displayed to customers (e.g., "Standard Gift Wrap", "Premium Gift Box"). | Yes |
| **Price** | The cost for this wrapping option. Enter `0` for free gift wrapping. | Yes |
| **Image** | An optional image showing the wrapping style. Upload to `media/com_j2commerce/giftwrapping/`. | No |
| **Description** | A short description of the wrapping (e.g., "Red ribbon with white gift tag"). | No |

3. Click **Add** again to add more options.
4. Use the drag handles to reorder options.
5. Click **Save** or **Save & Close**.

<!-- SCREENSHOT: Gift Wrapping plugin configuration showing the repeatable options subform with multiple wrapping options -->

### Creating Effective Wrapping Options

Consider these strategies:

- **Free option** — Offer a basic gift wrap at no charge to encourage selection.
- **Premium tier** — Charge more for elaborate packaging or branded gift boxes.
- **Seasonal options** — Add holiday-themed wrapping during gift-giving seasons.
- **Clear images** — Upload photos of actual wrapping to set customer expectations.

## How It Works

When a customer reaches the gift wrapping step during checkout:

1. They see a list of wrapping options with images, descriptions, and prices.
2. The first option is always **No Gift Wrapping** (free, no packaging).
3. Selecting a paid option adds the gift wrapping fee to the order total.
4. If **Show Message Field** is enabled, a text area appears for a personal message (max 500 characters).

<!-- SCREENSHOT: Checkout page showing gift wrapping step with options and message field -->

### Fee Integration

When a customer selects a paid wrapping option:

- The fee appears in the order summary as "Gift Wrapping (Option Name)".
- The fee is added to the order total before tax calculation.
- The selected option and message are stored with the order.

## Display Conditions

The gift wrapping step only appears when:

- **Enable Gift Wrapping** is set to **Yes**.
- At least one gift wrapping option is configured.
- The cart contains at least one shippable item.

If the cart contains only digital products (no shipping required), the gift wrapping step is automatically hidden.

## Tips

- Upload clear images of each wrapping style to help customers make informed choices.
- Keep descriptions short but descriptive — customers scan quickly during checkout.
- Test the checkout flow after configuring to ensure the step appears in the correct position.
- Consider offering a free option to make gift wrapping accessible to all customers.

## Troubleshooting

### Gift Wrapping Step Does Not Appear

**Cause:** The step is hidden due to configuration or cart contents.

**Solution:**

1. Verify **Enable Gift Wrapping** is set to **Yes**.
2. Check that at least one gift wrapping option is configured in the **Gift Wrapping Options** section.
3. Ensure the cart contains at least one physical product that requires shipping.
4. Verify the plugin is enabled in **J2Commerce** -> **Apps**.

### Fee Not Added to Order

**Cause:** JavaScript error or session issue.

**Solution:**

1. Open browser Developer Tools (F12) and check the Console for errors.
2. Clear browser cache and cookies, then try again.
3. Verify the wrapping option has a price greater than `0`.

### Message Field Not Showing

**Cause:** The **Show Message Field** setting is disabled.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Gift Wrapping**.
2. Set **Show Message Field** to **Yes**.
3. Click **Save**.

### Gift Wrapping Step Appears in Wrong Position

**Cause:** Step position is configured incorrectly.

**Solution:**

1. Go to **J2Commerce** -> **Apps** -> **Gift Wrapping**.
2. Change **Step Position** to the desired location in the checkout flow.
3. Click **Save**.
4. Test the checkout to verify the position.

### Options Display But Images Don't Load

**Cause:** Image path is incorrect or file doesn't exist.

**Solution:**

1. Go to **System** -> **Site** -> **Media**.
2. Navigate to `com_j2commerce/giftwrapping/` folder.
3. Verify the images exist in this location.
4. Re-select the images in the plugin configuration.

## Related Topics

- [Checkout Configuration](../checkout/index.md) - Configure checkout steps and flow
- [Shipping Methods](../shipping/index.md) - Set up shipping options for physical products
- [Order Management](../orders/index.md) - View and manage customer orders