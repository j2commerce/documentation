---
title: "BOX NOW Locker Delivery"
sidebar_label: "BOX NOW"
sidebar_position: 65
description: "Let shoppers pick a BOX NOW parcel locker at checkout, automatically create BOX NOW delivery requests with printable labels, and keep order status in sync with webhook-driven tracking updates — with Cash on Delivery support."
---

# BOX NOW Locker Delivery

The BOX NOW plugin connects your J2Commerce store to [BOX NOW](https://boxnow.gr/), a parcel-locker delivery network. At checkout, shoppers pick a locker from a live map widget (or a searchable list while you're testing) instead of typing a street address. Once an order is placed, the plugin turns it into a BOX NOW delivery request automatically, gives you a printable shipping label from the order screen, and keeps the order status in sync as BOX NOW reports the parcel moving through the network — accepted, in transit, delivered, returned, or canceled.

This plugin is built for merchants shipping through the BOX NOW locker network and needs an active BOX NOW partner account with API credentials.

## Requirements

- PHP 8.3.0+
- Joomla! 6.x
- J2Commerce 6.x
- A BOX NOW partner account
- OAuth2 API credentials from BOX NOW (Client ID, Client Secret, Origin Location Code, and Partner ID) for the Sandbox and/or Production environment

## Purchase and Download

**Step 1:** Go to our [J2Commerce website](https://www.j2commerce.com/) **->** Shipping Methods.

**Step 2:** Locate **BOX NOW** **->** click **View Details** **-> Add to cart -> Checkout**.

**Step 3:** Go to your **My Downloads** under your profile button at the top right corner and search for the plugin. Click **Available Versions -> View Files -> Download**.

:::info
BOX NOW is a separate add-on available from the J2Commerce Extensions Store. It is not included with the core J2Commerce 6 component.
:::

## Install the Plugin

Go to **System** -> **Install** -> **Extensions**.

Upload the `shipping_boxnow.zip` package file.

<!-- SCREENSHOT: Joomla Install Extensions screen with the shipping_boxnow.zip package selected -->

## Enable the Plugin

There are **two** ways you can access the plugin.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Setup -> Shipping Methods**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Dashboard -> Setup -> Shipping Methods**

<!-- SCREENSHOT: Shipping Methods list screen -->

Look for **BOX NOW**, click the **X**, and it will turn into a green checkmark. It is now enabled and ready for setup.

<!-- SCREENSHOT: BOX NOW row in the Shipping Methods list showing the green enabled checkmark -->

## Getting Your BOX NOW Credentials

Before you can configure the plugin, you need API credentials from BOX NOW. BOX NOW issues **separate** credentials for Sandbox (testing) and Production (live) — they are not interchangeable, and locker IDs are not shared between the two environments either.

For each environment you plan to use, ask your BOX NOW account contact for:

- **Client ID** — an OAuth2 client identifier
- **Client Secret** — the OAuth2 client secret paired with the Client ID
- **Origin Location Code** — the location BOX NOW picks parcels up from. ID `2` is the "AnyAPM" wildcard (hand parcels in at any BOX NOW locker) and works for most accounts; a warehouse ID only works if your BOX NOW contract grants that origin type
- **Partner ID** — the partner identifier BOX NOW assigned to this account, also needed for the live map widget

You will paste these into the plugin's **API Credentials** tab in the next section. Use Sandbox credentials while testing so no real parcels or charges occur.

## Configure the Plugin

Once you click on the **BOX NOW** title next to the green checkmark, you are ready to start setting up the parameters.

:::tip
Click the **Toggle Inline Help** button in the toolbar and the plugin will show a description below each field as you configure it.
:::

### Basic Settings tab

<!-- SCREENSHOT: BOX NOW Basic Settings tab -->

| Field | Description | Default |
|-------|-------------|---------|
| **Shipping Method Name** | The name shown to shoppers at checkout for this delivery option. | `BOX NOW` |
| **Environment** | Sandbox and Production use separate credentials and separate locker IDs — they are not interchangeable. Switching environments invalidates any locker a shopper has already chosen in an open cart. | Production |
| **Service Type** | Next Day or Same Day delivery. Same Day eligibility depends on your BOX NOW contract and is not available in every area. | Next Day |
| **Tax Class** | The tax profile applied to this delivery charge, if any. | None |
| **Handling Fee** | An extra flat amount added on top of the calculated BOX NOW delivery price, for example to cover packaging. | `0` |
| **Checkout Icon** | Icon shown beside this delivery option in the checkout shipping list. | Bundled BOX NOW icon |
| **Debug Logging** | Writes every BOX NOW API request and response to the J2Commerce log. Turn on only while diagnosing a problem, then turn back off — request and response bodies can contain customer details. | No |

### API Credentials tab

<!-- SCREENSHOT: BOX NOW API Credentials tab -->

| Field | Description |
|-------|-------------|
| **Production Client ID** | OAuth2 client ID BOX NOW issued for your live Production partner account. Shown only when Environment is Production. |
| **Production Client Secret** | OAuth2 client secret paired with the Production client ID. Kept server-side and never sent to the storefront. |
| **Production Origin Location Code** | The origin location ID BOX NOW picks the parcel up from, taken from your account's origins list. Use the **Fetch Origins** button next to the field to list the origin IDs your account is allowed to use. |
| **Production Partner ID** | The partner ID BOX NOW assigned to your Production account. Also required to configure the live map widget. |
| **Production Webhook Secret** | The shared secret BOX NOW signs Production parcel event webhooks with. Must match exactly what BOX NOW has on file for this environment, or every webhook is rejected. |
| **Sandbox Client ID** | OAuth2 client ID BOX NOW issued for your Sandbox test account. Shown only when Environment is Sandbox. |
| **Sandbox Client Secret** | OAuth2 client secret paired with the Sandbox client ID. |
| **Sandbox Origin Location Code** | The origin location ID used in Sandbox, taken from your test account's origins list. ID `2` (AnyAPM) is normally the only origin a Sandbox account is allowed to use. |
| **Sandbox Partner ID** | The partner ID BOX NOW assigned to your Sandbox test account. |
| **Sandbox Webhook Secret** | The shared secret BOX NOW signs Sandbox parcel event webhooks with. |
| **Test Connection** | Authenticates with BOX NOW using whichever environment's credentials are currently typed above — even if you have not saved yet — and shows which partner permissions this account has, such as Cash on Delivery, customer returns, and AnyAPM origin. |
| **Test Locker Lookup** | Enter a BOX NOW locker ID and confirm it exists in the currently selected environment before using it anywhere else. Locker IDs are not shared between Sandbox and Production. |
| **Webhook URL** | The address to send to BOX NOW so they can configure it as your webhook subscription. See [Setting Up the Webhook](#setting-up-the-webhook) below. |
| **Enforce Webhook Signature** | Verifies every incoming webhook against the shared secret before trusting it. Leave this on. Turning it off makes the endpoint accept unverified payloads and should only ever be a temporary step while you confirm the shared secret matches what BOX NOW has on file. | Yes |

:::info
**Fetch Origins** and **Test Connection** read whatever is currently typed into the credential fields, even if you haven't clicked **Save** yet — so you can check a value before committing it.
:::

### Pricing tab

<!-- SCREENSHOT: BOX NOW Pricing tab -->

| Field | Description | Default |
|-------|-------------|---------|
| **Pricing Method** | **Fixed Price** charges a single flat price for every BOX NOW delivery. **By Compartment Size** charges a different price depending on which BOX NOW locker size the parcel needs. | Fixed Price |
| **Shipping Price** | Flat delivery price charged when Pricing Method is set to Fixed Price. | `0` |
| **Small Compartment Price** | Price charged when the parcel fits BOX NOW's Small compartment (up to 5 kg, 36 × 20 × 10 cm). | `0` |
| **Medium Compartment Price** | Price charged when the parcel needs BOX NOW's Medium compartment (up to 10 kg, 36 × 38 × 17 cm). | `0` |
| **Large Compartment Price** | Price charged when the parcel needs BOX NOW's Large compartment (up to 20 kg, 36 × 38 × 38 cm). | `0` |
| **Free Delivery Threshold** | Order subtotal at or above which BOX NOW delivery is offered for free. Set to `0` to never offer free delivery. | `0` |

### Parcel Settings tab

<!-- SCREENSHOT: BOX NOW Parcel Settings tab -->

| Field | Description | Default |
|-------|-------------|---------|
| **Compartment Size** | **Auto** adds up the cart's weight and dimensions and picks the smallest BOX NOW compartment that fits. Choosing a fixed size skips that calculation and always requests the same compartment, regardless of what is in the cart. | Auto |
| **Default Parcel Weight** | Weight used for a product that has no weight recorded, and the minimum weight sent to BOX NOW even when the calculated cart weight is lower. | `0.1` |
| **Allow Return** | Sets BOX NOW's `allowReturn` flag when the delivery request is created, letting the recipient decline the parcel and hand it back into a locker instead of collecting it. | No |
| **Cash on Delivery** | Lets BOX NOW collect payment from the recipient at the locker, for orders placed with a Cash on Delivery payment method. Your BOX NOW account needs the `codPayment` permission — check **Test Connection** above before relying on this. | Yes |

### Voucher Automation tab

<!-- SCREENSHOT: BOX NOW Voucher Automation tab -->

| Field | Description | Default |
|-------|-------------|---------|
| **Automatically Create Voucher** | Creates the BOX NOW delivery request automatically instead of waiting for a merchant to click **Create Voucher** on the order. | Yes |
| **Create On Status** | Order status that triggers automatic voucher creation. Leave at **None** to create the voucher immediately once payment is confirmed instead of waiting for a status change. | None |
| **Require Locker Selection** | Stops the shopper from continuing past the BOX NOW step at checkout until a locker has been chosen. | Yes |
| **Notify Email On Accepted** | Email address BOX NOW sends its acceptance notice and PDF label to whenever a new delivery request is created. | — |
| **Order Status on Delivered** | Order status applied automatically the first time BOX NOW reports the parcel as delivered. | None |
| **Order Status on Returned** | Order status applied automatically when BOX NOW reports the parcel as returned or expired. | None |
| **Order Status on Canceled** | Order status applied automatically when BOX NOW reports the parcel as canceled. | None |

### Advanced tab

<!-- SCREENSHOT: BOX NOW Advanced tab -->

| Field | Description | Default |
|-------|-------------|---------|
| **Restrict to Countries** | Comma-separated two-letter ISO country codes this delivery option is offered to, for example `GR`. Leave blank to allow every country. | `GR` |
| **Geo Zone** | Optional geo zone this shipping method is limited to, on top of the country restriction above. | None |
| **Token Cache Duration (seconds)** | How long a BOX NOW access token is reused before a fresh one is requested. BOX NOW issues tokens valid for one hour — keep this at or below 3600 seconds. | `3600` |
| **Booking Currency** | The currency BOX NOW has assigned to your partner account — **Test Connection** reports it. The order total is converted into this currency before it is sent, and for Cash on Delivery, this is what the locker collects. It must be one of your configured store currencies. | `EUR` |
| **Region Tag** | BCP-47 language and country tag, for example `el-GR`, sent to BOX NOW for address lookups and to set the locker network's response language. | `el-GR` |
| **Default Dial Code** | International dial code added automatically to a recipient phone number that was stored without one. | `+30` |
| **Order Number Prefix** | Prefix added to the J2Commerce order ID to build the BOX NOW order number sent with every delivery request. An order number must stay unique forever, so never reuse a prefix from another install pointed at the same BOX NOW account. | `J2C` |
| **Weight Unit** | Unit your product weights are stored in. Converted to kilograms before every BOX NOW request. | Kilograms (kg) |
| **Dimension Unit** | Unit your product dimensions are stored in. Converted to centimeters before every BOX NOW request. | Centimeters (cm) |

:::info
Weight and length are also read from each product variant's own weight/length class when one is set, so a store that measures one product in pounds and another in grams still converts correctly — the Advanced tab units above are only the fallback default.
:::

## Setting Up the Webhook

BOX NOW sends real-time parcel status updates (accepted, in transit, delivered, returned, canceled) to a webhook URL on your site. Setting this up keeps order statuses in sync automatically without needing to click **Refresh Status** on every order.

The **Webhook URL** field on the **API Credentials** tab shows the exact address, in this format:

```
https://[your-site]/index.php?option=com_ajax&group=j2commerce&plugin=shipping_boxnow&format=json&task=webhook
```

1. Copy the **Webhook URL** value from the plugin settings.
2. Send it to your BOX NOW account contact so they can register it as your webhook subscription. BOX NOW allows only **one** webhook URL per partner, and it must be public HTTPS with a certificate from a public certificate authority.
3. Set the matching **Production Webhook Secret** and/or **Sandbox Webhook Secret** field — either type in the secret BOX NOW gave you, or click **Generate** to create a new one in your browser and hand that value to BOX NOW instead.
4. Keep **Enforce Webhook Signature** turned on so every incoming webhook is checked against this shared secret before it's trusted.

:::info
Replacing a webhook secret invalidates the old one immediately — any webhook BOX NOW sends using the previous secret will be rejected until you update it on BOX NOW's side too.
:::

## What Your Shoppers See at Checkout

1. The shopper reaches the shipping step and selects **BOX NOW** as their delivery method. The rate line shows the delivery price along with the compartment size and approximate weight, for example "Medium parcel, approx. 1.20 kg."
2. Just before the order confirmation step, a **Choose a BOX NOW Locker** panel appears.
3. The shopper clicks **Choose a Locker**, which opens BOX NOW's live map widget (Production) so they can search and pick a nearby locker visually. In Sandbox, a searchable list of lockers appears instead — the hosted map widget is Production-only.
4. Once a locker is picked, its name, address, and postal code appear in a confirmation panel, and the button changes to **Change Locker** if the shopper wants to pick a different one.
5. If **Require Locker Selection** is turned on, the shopper cannot continue to the confirm step without picking a locker.
6. The chosen locker's name and address are shown again as a read-only summary on the shipping and payment review panel and on the order confirmation.

## How It Works

1. **Rate calculation.** When a shopper reaches checkout, the plugin totals the cart's weight and dimensions (pulled from each product variant), works out the smallest BOX NOW compartment that fits (unless you've locked in a fixed size on the Parcel Settings tab), and calculates the delivery price from your Pricing tab settings.
2. **Locker selection.** The shopper picks a locker using the map widget or list, as described above. The selection is stored for the rest of checkout.
3. **Order placed.** The order is created with the chosen locker attached.
4. **Voucher (delivery request) created.** Depending on your Voucher Automation settings, the BOX NOW delivery request is created automatically right after payment, automatically when the order reaches a specific status you chose, or manually when a staff member clicks **Create Voucher** on the order.
5. **BOX NOW responds** with a delivery request ID and a parcel ID. These are saved to the order, along with the recipient's name, phone, and locker details.
6. **Status updates arrive.** If you've set up the webhook, BOX NOW pushes status changes to your site automatically as the parcel moves — accepted, in transit, delivered, returned, or canceled — and the order status can update automatically based on your Voucher Automation mappings. Without a webhook configured, you can still refresh a single order's status manually from the order view.
7. **Cash on Delivery.** If the order was paid with a payment method containing "COD" and **Cash on Delivery** is enabled, the delivery request tells BOX NOW to collect the order amount from the recipient at the locker instead of collecting it online.

## Managing a Delivery from the Order View

Open any BOX NOW order and scroll to the **BOX NOW Delivery** card. The available buttons depend on the delivery's current state:

- **Create Voucher / Retry** — appears when no delivery request exists yet, or the last attempt failed. Builds the BOX NOW delivery request now.
- **Print Label** / **Download Label** — fetches the shipping label from BOX NOW as a PDF and shows it, or downloads it.
- **Refresh Status** — pulls the latest parcel status from BOX NOW immediately, without waiting for a webhook.
- **Allow Return / Disallow Return** — toggles whether the recipient can hand this specific parcel back into a locker.
- **Cancel Parcel** — cancels the delivery request with BOX NOW. Only available while the parcel is still in the **new** state; once BOX NOW starts moving it, cancellation must go through BOX NOW support instead.

The card also shows the parcel ID, delivery request ID, current status (with a color-coded badge), locker name and address, compartment size, weight, payment mode, and — for Cash on Delivery orders — the amount to collect. If a delivery request attempt failed, the error message and BOX NOW's error code are shown directly on the card.

## Tips

- **Test in Sandbox first.** Sandbox credentials, locker IDs, and webhook secrets are completely separate from Production — nothing you do in Sandbox touches real deliveries.
- **Use Test Connection before going live.** It confirms your credentials work and shows exactly which permissions your account has, including whether Cash on Delivery is actually enabled on the BOX NOW side.
- **Set your webhook up before launch.** Without it, order status only updates when someone manually clicks **Refresh Status** on each order.
- **Leave Origin Location Code at the AnyAPM default (ID 2)** unless BOX NOW has specifically granted your account a warehouse origin — use **Fetch Origins** to check what your account is actually allowed to use.
- **Keep the Order Number Prefix unique** if you run more than one J2Commerce install against the same BOX NOW account — BOX NOW order numbers must never repeat.

## Troubleshooting

### No BOX NOW rate appears at checkout

**Cause:** Credentials or origin code are missing, the shopper's country isn't in **Restrict to Countries**, or no shipping address has been resolved yet.

**Solution:**

1. Go to **J2Commerce -> Setup -> Shipping Methods**, click **BOX NOW** to open the settings.
2. On the **API Credentials** tab, confirm the Client ID, Client Secret, and Origin Location Code are all filled in for the environment you're using (Sandbox or Production).
3. On the **Advanced** tab, check **Restrict to Countries** includes the shopper's country.
4. Enable **Debug Logging** on the Basic Settings tab temporarily, clear the Joomla cache, and attempt a checkout. Review the log at **System -> Logs**, then disable debug logging again.

### "Could not connect to BOX NOW" when testing the connection

**Cause:** The Client ID or Client Secret is incorrect, or belongs to the other environment.

**Solution:** Re-copy the Client ID and Client Secret from your BOX NOW account into the matching Sandbox or Production fields, confirm the **Environment** setting matches, and click **Test Connection** again.

### "That locker ID was not found in this environment"

**Cause:** The locker belongs to the other environment (Sandbox locker IDs and Production locker IDs are never interchangeable), or the locker simply wasn't in the first batch BOX NOW returned for the lookup.

**Solution:** Confirm the **Environment** setting matches where the locker ID came from. This lookup checks a batch of BOX NOW's locker list rather than every locker that exists, so a valid locker ID can occasionally come back as "not found" — it does not necessarily mean the ID is wrong.

### The order status doesn't update when the delivery progresses

**Cause:** The webhook isn't registered with BOX NOW yet, or the webhook secret doesn't match what BOX NOW has on file.

**Solution:**

1. Copy the **Webhook URL** value from the plugin settings (see [Setting Up the Webhook](#setting-up-the-webhook) above).
2. Confirm with your BOX NOW account contact that this exact URL is registered as your webhook subscription.
3. Make sure the **Webhook Secret** field for the matching environment exactly matches the secret BOX NOW has on file.
4. In the meantime, click **Refresh Status** on the order to update it manually.

### Voucher creation fails with a Cash on Delivery error

**Cause:** Cash on Delivery is turned on in the plugin, but your BOX NOW account doesn't have the `codPayment` permission enabled.

**Solution:** Click **Test Connection** on the API Credentials tab and check the permissions listed. If Cash on Delivery isn't among them, ask BOX NOW to enable it for your account, or turn **Cash on Delivery** off in the plugin's Parcel Settings tab.

### "Cancel Parcel" isn't available on an order

**Cause:** The parcel has already moved past BOX NOW's `new` state — cancellation through the plugin only works before BOX NOW starts moving the parcel.

**Solution:** Contact BOX NOW support (care@boxnow.gr) directly if the delivery still needs to be stopped.

### An order shows a booking-currency warning in the log

**Cause:** The **Booking Currency** set on the Advanced tab isn't one of your store's configured currencies, so the plugin can't convert the order total into it directly.

**Solution:** Add that currency to your store's configured currencies in J2Commerce, or set **Booking Currency** to match a currency your store already has configured and confirm it against what **Test Connection** reports as your account's `assignedCurrency`.

## Related Topics

- [Table Rate Shipping](./shipping_tablerate.md)
- [DoorDash Same-Day Delivery](./shipping_doordash.md)
