---
title: "B2Brouter"
sidebar_label: "B2Brouter"
sidebar_position: 104
description: "Connect your store to B2Brouter to automatically issue and deliver compliant electronic invoices over Peppol, email, and country tax networks such as FACe, Chorus Pro, SDI, KSeF, ZATCA, and LHDN."
---

# B2Brouter

B2Brouter is an e-invoicing service that converts your order data into a legally compliant electronic invoice and delivers it through the network your buyer or your local tax authority requires — Peppol, email, FACe, Chorus Pro, SDI, KSeF, ZATCA, LHDN, and more. This app connects your J2Commerce store to your B2Brouter account so an invoice (and, if needed, a credit note) is created and sent automatically whenever an order reaches the status you choose, with no manual data entry.

## Requirements

- PHP 8.3.0 or later
- Joomla 6.x
- J2Commerce 6.x
- An active B2Brouter account with at least one company (account) set up

## Purchase and Download

The **B2Brouter** app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

**Step 1:** Go to [www.j2commerce.com](https://www.j2commerce.com) **->** **Apps**.

**Step 2:** Locate the **B2Brouter** app **->** click **View Details** **->** **Add to Cart** **->** **Checkout**.

**Step 3:** Go to **My Downloads** under your profile button at the top right corner. Search for **B2Brouter**, then click **Available Versions** **->** **View Files** **->** **Download Now**.

## Install the App

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `plg_j2commerce_app_b2brouter.zip` file or use the Install from URL option.

<!-- SCREENSHOT: Joomla Extensions installer with the B2Brouter zip file selected -->

## Enable the App

Once you have installed the app, you will need to enable it. There are **two** ways you can access the extension.

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing the B2Brouter row -->

Look for **B2Brouter**, click the **X**, and it will turn into a green checkmark. It is now enabled and ready for setup.

<!-- SCREENSHOT: B2Brouter row toggled to enabled (green checkmark) -->

## Getting Your API Key

Before you can configure the app, you need an API key from your B2Brouter account.

1. Log in to your account at [b2brouter.net](https://app.b2brouter.net).
2. Go to your account settings and generate or copy your API key.
3. Keep the key private — it is never shown back to you or written to a log once you save it in J2Commerce.

:::info

The key's prefix tells B2Brouter which environment to use: a key starting with `test_` connects to the B2Brouter sandbox, and a key starting with `prod_` (or with no prefix) connects to production. Use a sandbox key while you are testing.

:::

## Configure the App

Once you click the **B2Brouter** title next to the green checkmark, you are ready to start setting up the parameters. The settings are grouped into five tabs: **Connection**, **Invoicing**, **Credit Notes**, **Inbound**, and **Logging**.

<!-- SCREENSHOT: B2Brouter plugin edit screen showing the five settings tabs -->

### Connection tab

| Field | Description |
| ----- | ----------- |
| **API Key** | Your B2Brouter API key. Required before anything else on this screen will work. |
| **API Version** | The dated B2Brouter API version to use on every request (defaults to `2026-06-26`). Leave the default unless B2Brouter support tells you otherwise. |
| **Account** | The B2Brouter company (account) this store invoices from. Enter and save your API key first, then click **Load Accounts** to populate the list. |
| **Test Connection** | Click **Test Connection** to confirm your API key and selected account are valid. |
| **Webhook Status** | Shows whether B2Brouter has been told to notify this store of invoice and tax report updates. Save the API Key and Account first, then click **Register Webhook**. |
| **Webhook Signing Secret** | Captured automatically the first time you register the webhook. This field is read-only. |
| **Send Mode** | **Draft only** creates the invoice on B2Brouter without sending it. **Create and send** creates the invoice and delivers it right away over your configured transport. |

:::info

**Register Webhook** requires a public HTTPS address for your store. If your site is only reachable at `localhost` or on a private network, B2Brouter cannot deliver webhook notifications to it, and registration will fail with an explanation.

:::

:::info

The **Webhook Signing Secret** is only ever shown once — right after you press **Register Webhook**. B2Brouter never returns it again on a later check. If it is ever lost, click **Re-register Webhook** to get a new one; the old webhook keeps working until you remove it in your B2Brouter account.

:::

<!-- SCREENSHOT: Connection tab with Account dropdown populated and a successful Test Connection message -->

### Invoicing tab

| Field | Description |
| ----- | ----------- |
| **Trigger Order Statuses** | The order status (or statuses) that queue an invoice to be sent to B2Brouter. Never choose a status an order reaches on creation — only choose a status that means the order is paid and confirmed. |
| **Invoice Number Source** | Where the invoice number comes from: **Order invoice prefix + number** (the order's own invoice numbering) or **Order ID**. This must be unique per B2Brouter account. |
| **Due Days** | Number of days after the order date the invoice is marked due (defaults to 30). |
| **Document Type** | The B2Brouter document type used for your outbound invoices. Enter your API key first, then click **Load** to populate the list. |
| **Transport Type** | The delivery method used to send invoices — for example Peppol or email. Enter your API key first, then click **Load** to populate the list. |
| **Default TIN Scheme** | A fallback tax-ID scheme used only when the buyer's country has no matching scheme available in B2Brouter's live list. Leave blank unless a specific value has been recommended to you. |
| **Shipping & Fees** | How shipping and other charges appear on the invoice: **As separate invoice lines** (recommended) or **As a single invoice-level charge**. |
| **Reconciliation** | What happens if B2Brouter calculates a different total than your order (rounding differences can occur). **Block** refuses to send the invoice; **Warn** logs the difference and sends anyway. |

<!-- SCREENSHOT: Invoicing tab with Document Type and Transport Type dropdowns loaded -->

### Credit Notes tab

| Field | Description |
| ----- | ----------- |
| **Enable Credit Notes** | When set to **Yes**, a refund automatically queues an amending credit note that references the order's original B2Brouter invoice. |
| **Refund Order Statuses** | Order statuses that also queue a credit note, in addition to any gateway refund that completes. Only shown when Credit Notes are enabled. |
| **Credit Note Document Type** | Reserved for future use — B2Brouter determines the credit note's format automatically, so this field currently has no effect. |
| **Credit Note Send Mode** | **Inherit from Send Mode** reuses the Send Mode setting above. **Draft only** or **Create and send** override it for credit notes specifically. |

:::info

A credit note also queues automatically whenever a payment gateway refund completes on an order, even if that order's status is not in your **Refund Order Statuses** list.

:::

### Inbound tab

Inbound invoices are electronic invoices your **suppliers** send you through B2Brouter — for example, a supplier billing your store. This is entirely optional and separate from the outbound invoices you send to your own customers.

| Field | Description |
| ----- | ----------- |
| **Enable Inbound Invoices** | When set to **Yes**, invoices received from suppliers are stored locally in J2Commerce for viewing and download. |
| **Inbound Source** | How received invoices reach your store: **Webhook only**, **Poll only** (requires the J2Commerce cron task), or **Webhook and poll**. |
| **Poll Batch Limit** | Maximum number of received invoices fetched per poll run. Only shown when polling is enabled. |
| **Retention (Days)** | How long received invoice records are kept before being removed. |
| **Cache Legal Document Locally** | When set to **Yes**, the store downloads and keeps a local copy of each received invoice's legal document as soon as it arrives. |

:::info

No J2Commerce order or purchase record is ever created from a received invoice — this feature only stores a copy for your records.

:::

### Logging tab

| Field | Description |
| ----- | ----------- |
| **Log Level** | The minimum severity written to the B2Brouter plugin log: None, Error, Warning, Info, or Debug. |
| **Log API Requests** | When set to **Yes**, every B2Brouter API call is recorded for troubleshooting (your API key is never included). |
| **Log Retention (Days)** | How long API request log entries are kept before pruning. |
| **Debug Mode** | Enables verbose diagnostic logging. Leave this off in production. |

Click **Save** in the toolbar once you have finished configuring the tabs.

## Mapping Tax Profiles

Before any invoice can be sent, every tax profile used on your products (and the pseudo profile B2Brouter uses for shipping and surcharge charges) needs a matching B2Brouter VAT category. An order using an unmapped tax profile will refuse to send.

1. Go to **J2Commerce** **-> Apps -> B2Brouter -> Tax Mapping** (or use the **Manage Tax Mapping** quick link on the B2Brouter Dashboard).
2. Click **Map Tax Profile**.
3. Set the following fields:

| Field | Description |
| ----- | ----------- |
| **Tax Profile** | The J2Commerce tax profile to map. Disabled tax profiles are listed too, since older orders may still reference them. |
| **VAT Category** | The B2Brouter VAT category this tax profile corresponds to — for example **S — Standard rate**, **Z — Zero-rated**, or **AE — Reverse charge**. |
| **Exemption Reason / Comment** | Optional free-text note attached to the tax line, such as an EU reverse-charge or exemption reference. |

4. Click **Save** to store the mapping.

<!-- SCREENSHOT: Tax Mapping list showing mapped tax profiles and their VAT categories -->

:::info

Also map **"Charges without a tax profile"** — this covers shipping charges and surcharges that have no tax profile of their own. Any order with a shipping charge will refuse to send until this pseudo profile is mapped.

:::

## Day-to-Day Workflow: Sending Invoices

Once the app is configured and your tax profiles are mapped, invoicing runs automatically.

### Step 1: An Order Reaches a Trigger Status

When an order's status changes to one of your configured **Trigger Order Statuses**, the app automatically queues an invoice for B2Brouter. The invoice is always created as a draft first, regardless of your Send Mode setting, so B2Brouter can calculate the true total before anything is sent.

### Step 2: The Invoice Is Checked and Sent

The queued invoice is built from the order's items, addresses, and tax lines, then created on B2Brouter. If **Reconciliation** is set to **Block** and the order total does not match B2Brouter's calculated total, the invoice is stopped and flagged as an error rather than sent. If Reconciliation is set to **Warn**, the mismatch is logged and the invoice proceeds.

If **Send Mode** is **Create and send**, the invoice is delivered immediately over your configured **Transport Type**. If Send Mode is **Draft only**, the invoice stays as a draft on B2Brouter until you send it from your B2Brouter account.

### Step 3: Review the Order

Open the order in **J2Commerce** **-> Sales -> Orders**. Scroll to the **B2Brouter** card, which shows:

- The invoice number, current state (Draft, Sent, Issued, Refused, and so on), and total
- A **Sync Status** button to pull the latest state from B2Brouter on demand
- A **Retry** button if the invoice is in an error state
- A **Download Legal Document** button once the invoice has left draft status
- A tax report card (with a QR code and verification link, where the tax authority provides one)

<!-- SCREENSHOT: Order view showing the B2Brouter card with an issued invoice -->

If an order was never automatically queued (for example, because it predates your Trigger Order Statuses setting), click **Submit Order** on the card to send it manually.

### Step 4: Credit Notes on Refund

If **Enable Credit Notes** is on, refunding an order — either by moving it to a configured **Refund Order Status** or by processing a gateway refund — automatically queues a credit note that references the original invoice. The credit note appears on the same order card once it has been filed.

## The B2Brouter Dashboard

Go to **J2Commerce** **-> Apps -> B2Brouter** and click **Dashboard** (or the **B2Brouter Dashboard** menu item) to see an overview of your e-invoicing activity for a chosen date range:

- **Documents Sent**, **Documents in Error**, **Tax Reports Filed**, and **Inbound Received** totals
- A **Documents by Day** chart and a **State Breakdown** of your outbound invoices and credit notes
- A **Recent Errors** list with a one-click **Retry**
- An **Unmapped Tax Profiles** warning, with a direct link to fix it, whenever a profile is missing its VAT category
- **Quick Links** to Documents, Inbound Invoices, Tax Mapping, and the API Log

<!-- SCREENSHOT: B2Brouter Dashboard with KPI tiles and the Documents by Day chart -->

From the same **B2Brouter** area you can also open:

- **Documents** — every invoice and credit note ever sent, filterable by type and state
- **Inbound** — invoices received from your suppliers (only populated if Inbound is enabled)
- **API Log** — a record of every B2Brouter API call, if **Log API Requests** is turned on

## How It Works

1. An order's status changes in J2Commerce.
2. If the new status is one of your **Trigger Order Statuses**, the app queues an invoice job.
3. The queue worker builds the invoice from the order and files it on B2Brouter as a draft.
4. B2Brouter's calculated total is compared to your order total (Reconciliation).
5. If Send Mode is **Create and send**, the draft is delivered over your Transport Type.
6. B2Brouter notifies your store by webhook whenever the invoice's state changes, and the order card updates automatically. A background check also re-checks unsettled invoices periodically as a safety net.
7. A refund, if Credit Notes are enabled, queues an amending credit note referencing the original invoice.

## Tips

- **Start with a sandbox API key.** Test your full trigger-status and mapping setup with a `test_` key before switching to a production key.
- **Map every tax profile before you go live.** An unmapped tax profile blocks the whole invoice, not just one line — check the Dashboard's Unmapped Tax Profiles warning after any new tax profile is added.
- **Choose a Trigger Order Status that means "paid."** Never trigger on order creation — an invoice for an unpaid or abandoned order should never reach a tax authority.
- **Use Draft only mode while testing**, then switch to Create and send once you have confirmed a handful of test invoices look correct in your B2Brouter account.
- **Keep Debug Mode off in production.** Turn it on only when troubleshooting a specific issue.

## Troubleshooting

### An Order Was Not Sent Automatically

**Cause:** The order's new status is not in your **Trigger Order Statuses** list, or the app is not fully configured.

**Solution:**

1. Go to **J2Commerce** **-> Apps -> B2Brouter** and confirm your **API Key** and **Account** are saved.
2. Check the **Trigger Order Statuses** field on the Invoicing tab and confirm the status your order reached is listed.
3. Open the order and click **Submit Order** on the B2Brouter card to send it manually.

### Invoice Shows an Error State

**Cause:** This is usually an unmapped tax profile, a reconciliation mismatch, or a rejection from B2Brouter itself.

**Solution:**

1. Open the order and check the error message shown on the B2Brouter card.
2. If the message mentions a tax profile, go to **Tax Mapping** and map the missing profile, then click **Retry** on the order card.
3. If the message mentions totals not matching, review the order's shipping and tax lines for the cause, then correct Reconciliation settings if needed.

### Totals Do Not Match ("Reconciliation" Error)

**Cause:** B2Brouter calculated a different total than the order total, and **Reconciliation** is set to **Block**.

**Solution:**

1. Review the order's shipping charge, fees, and tax lines — rounding differences between systems are the most common cause.
2. If the difference is expected and acceptable, change **Reconciliation** to **Warn** on the Invoicing tab so future invoices send with a logged warning instead of being blocked.

### Webhook Registration Failed

**Cause:** B2Brouter could not reach your store's webhook address, most often because the site is not publicly accessible over HTTPS.

**Solution:**

1. Confirm your store is reachable at a public `https://` address (not `localhost` or a private network address).
2. Click **Register Webhook** again from the Connection tab.
3. If it still fails, check the message shown — it names the URL B2Brouter tried and the reason it was refused.

### Document Type / Transport Type / Default TIN Scheme Dropdowns Are Empty

**Cause:** The API key has not been saved yet, or is incorrect.

**Solution:**

1. Enter your API key in the **API Key** field on the Connection tab and click **Save**.
2. Return to the Invoicing tab and click **Load** next to the empty dropdown.
3. If it is still empty, verify the key in your B2Brouter account and that it matches the intended environment (sandbox vs. production).

### An Invoice Cannot Be Resubmitted

**Cause:** The invoice has already been issued on B2Brouter. Once issued, an invoice is a legal document and cannot be edited or resent.

**Solution:**

Issue a credit note instead — enable **Credit Notes** on the Credit Notes tab, then move the order to a configured **Refund Order Status** or process a gateway refund.

### "Transport Not Enabled" Error

**Cause:** The **Transport Type** configured on the Invoicing tab is not enabled on your B2Brouter account.

**Solution:**

Either enable that transport in your B2Brouter account settings, or change the **Transport Type** setting to a transport your account already has enabled.
