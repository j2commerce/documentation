---
title: "Payment Method Restrictions"
sidebar_label: "Payment Method Restrictions"
sidebar_position: 50
description: "Control which payment methods appear at checkout based on the products in the cart, with per-product whitelists and global keep/remove rules."
---

# Payment Method Restrictions

The Payment Method Restrictions app lets you control which payment methods your customers can use at checkout. You can restrict methods on a per-product basis — so that some products only allow bank transfer, for example — and you can also set store-wide rules that always keep or always remove specific methods.

## Purchase and Download

The **Payment Method Restrictions** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/extensions/apps) -> **Apps**.

**Step 2:** Locate **Payment Method Restrictions** -> click **View Details** -> **Add to cart** -> **Checkout**.

**Step 3:** Go to **My Downloads** under your profile menu at the top right corner and search for the app. Click **Available Versions** -> **View Files** -> **Download**.

## Install the App

Install using the standard Joomla installer.

In the Joomla admin, go to **System** -> **Install** -> **Extensions**.

Upload the `app_restrictpayment.zip` package file. The plugin installs and enables automatically.

![](/img/install.webp)

## Enable the App

Once installed, verify the app is enabled. There are two ways to reach it.

**Option A:** Click the **J2Commerce** icon at the top right corner -> **Apps**.

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**.

![](/img/gift-wrap-apps.webp)

Search for **Payment Method Restrictions**. If it shows a red X, click it to enable it. It turns into a green checkmark when active.

![](/img/payment-method-restriction-enable.webp)

## Configure the App

Click the **Payment Method Restrictions** title (next to the green checkmark) to open the settings screen.

:::tip

Click the **Toggle Inline Help** button on any app you install to see a description below each field directly in the admin panel.

:::

![](/img/payment-method-restriction-toggle.webp)

### Payment Restrictions Tab

The global settings apply to every checkout in your store. They work on top of any per-product restriction you set on individual products.

| Field                                   | Description                                                                                                                                     | Default                                |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **Keep only these payment methods**     | If one or more methods are selected, only those methods ever appear at checkout. Leave empty to allow all methods (subject to the other rules). | *(empty — no global keep restriction)* |
| **Always remove these payment methods** | The selected methods are always hidden at checkout, regardless of product settings or the keep list.                                            | *(empty — nothing globally removed)*   |
| **Debug logging**                       | Writes diagnostic messages to `administrator/logs/plg_j2commerce_app_restrictpayment.log.php`. Disable on production sites.                     | **No**                                 |

Both the **Keep** and **Remove** fields show only the payment method plugins that are currently enabled in your store. If a gateway is not listed, publish it first under **J2Commerce** -> **Payments** -> **Payment Methods**.

Click **Save** to apply your settings.

## Set Allowed Payment Methods Per Product

The per-product restriction is the most targeted control available. When a cart contains multiple products, the plugin calculates the union of all allowed methods across those products and removes anything outside that set.

1. Go to **Content** -> **Articles** and open the article for the product you want to restrict.
2. Click the **J2Commerce** tab, then the **Apps** sub-tab.
3. Under **Payment Restrictions**, find the **Allowed payment methods** field.
4. Select the payment methods you want to allow for this product. To apply no restriction, select **All payment methods**.
5. Click **Save**.

<!-- SCREENSHOT: Product edit screen showing the J2Commerce > Apps sub-tab with the Allowed payment methods multi-select field -->

:::info Multiple products in the cart

When a customer adds more than one product to the cart, the plugin merges all per-product allowed lists together. For example, if Product A allows only Bank Transfer and Product B allows Bank Transfer and Cash on Delivery, both methods remain available because both appear in at least one product's list.

If **all** products in the cart have the default "All payment methods" selection, no per-product restriction is applied.

:::

## How the Filtering Works at Checkout

When a customer reaches the payment step, the plugin evaluates three layers of rules in order:

1. **Per-product whitelist** — collected from every item in the cart. If any product limits methods to a specific set, only those methods are candidates.
2. **Global remove list** — any method in the Always Remove list is stripped regardless of what products allow.
3. **Global keep list** — if you have set a Keep list, only methods on that list survive.

A method must pass all three layers to appear at checkout. The final list is shown to the customer.

<!-- SCREENSHOT: Checkout page showing the filtered payment method options visible to the customer -->

:::warning All methods removed
If your rules are too restrictive — for example, a product allows only Bank Transfer but you have also added Bank Transfer to the Always Remove list — the customer will see no payment methods at checkout and will be unable to complete the order. Test your configuration after making changes.
:::

## Use Cases

### Allow only bank transfer for a specific product

1. Open the product article and go to **J2Commerce** -> **Apps**.
2. In **Allowed payment methods**, select **Bank Transfer** only.
3. Click **Save**.

Any cart containing this product will show only Bank Transfer at checkout.

### Hide a test gateway on live orders

1. Open the app settings under **J2Commerce** -> **Apps** -> **Payment Method Restrictions**.
2. In **Always remove these payment methods**, select your test gateway.
3. Click **Save**.

The gateway is now hidden for all customers across all orders, without needing to unpublish it.

### Restrict your entire store to a single payment method

1. In **Keep only these payment methods**, select the single method you want.
2. Click **Save**.

All other methods are hidden store-wide, regardless of product settings.

## What's New in J2Commerce 6

If you are upgrading from J2Store 4, here is what changed:

- **Price-band restrictions removed.** The J2Store 4 version included a per-payment-method minimum/maximum order total gate. This feature is now built directly into J2Commerce core — configure `min_subtotal`, `max_subtotal`, and `geo_zone` on each payment plugin's own settings page under **J2Commerce** -> **Payments** -> **Payment Methods**. You do not need this app for price-based payment filtering.
- **Global keep and remove fields** carry over with the same purpose. If you previously configured `keep_plugin` and `remove_plugin`, re-enter those selections in the new plugin settings.
- **Per-product restrictions** carry over. The `payment_restrictions` value stored in each product's params is compatible. Verify each product after upgrading.
- **Admin configuration screen** is now the standard Joomla Plugin Manager interface instead of a custom FOF screen.

## Troubleshooting

### All payment methods still appear at checkout

**Cause:** One of the following:

- The plugin is not enabled. Go to **J2Commerce** -> **Apps** and confirm the green checkmark is showing for Payment Method Restrictions.
- The product in the cart has **All payment methods** selected (or no restriction set), and the global Keep and Remove lists are both empty. No filtering is applied when all three layers have no active rules.
- You saved settings but cleared the Joomla cache without refreshing. Go to **System** -> **Clear Cache** and try again.

**Solution:**

1. Confirm the plugin is enabled.
2. Open the product and verify a specific method is selected (not "All payment methods").
3. Save the product and test with an empty browser cache.

### A payment method I expected has disappeared

**Cause:** The method is present on the global **Always remove** list, or the per-product allowed list for one of the cart items does not include it.

**Solution:**

1. Open the app settings and check the **Always remove** field.
2. Open each product in the cart and review the **Allowed payment methods** field.
3. Enable **Debug logging** and inspect `administrator/logs/plg_j2commerce_app_restrictpayment.log.php`. Each checkout logs a line showing how many methods were present before and after filtering, and counts for the per-product, keep, and remove lists.

### The payment method picker on the product form is empty

**Cause:** No payment plugins with element names starting with `payment_` are currently published.

**Solution:** Go to **J2Commerce** -> **Payments** -> **Payment Methods** and ensure at least one payment gateway is published. The picker in the product form shows only enabled payment plugins.

### Debug logging

Enable **Debug logging** in the plugin settings. Log entries are written to:

```
administrator/logs/plg_j2commerce_app_restrictpayment.log.php
```

Each entry records the number of payment methods before and after filtering, along with the size of the per-product, keep, and remove sets. Disable debug logging on production sites once troubleshooting is complete.

## Related Topics

- [Restrict by Shipping](./app-restrictbyshipping.md)
- [Payment Methods](../../payment-methods/index.md)
