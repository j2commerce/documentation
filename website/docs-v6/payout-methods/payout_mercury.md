---
title: "Mercury Payout"
sidebar_label: "Mercury Payout"
sidebar_position: 1
description: "Connect a Mercury business bank account to J2Commerce vendor payouts — link seller bank details, send ACH transfers, and track payout status through signed webhooks."
---

# Mercury Payout for J2Commerce

> Marketplace owners eventually hit the same wall: sellers earn money, and now someone has to actually send it to them. Mercury Payout connects your J2Commerce vendor payouts directly to a Mercury business bank account, so your sellers link their own bank details once and get paid by ACH transfer — no manual wires, no spreadsheet reconciliation, no chasing down routing numbers over email.

---

## Quick Scan: Features & Benefits

| # | Feature | What you actually get |
|---|---------|------------------------|
| 1 | Sandbox / Live environment switch | Test the entire payout flow against Mercury's Sandbox before flipping to Live with real money. |
| 2 | Vendor bank-account linking | Sellers enter their own bank details once from their vendor dashboard — account holder name, routing number, account number, account type, and legal address. |
| 3 | Write-only account numbers | The full account number is sent straight to Mercury and never stored on your site — only the last 4 digits are kept, for display. |
| 4 | Funding Account picker | Once your API token is saved, the plugin fetches your active Mercury checking and savings accounts live and lets you pick which one pays out sellers. |
| 5 | Require Approval or Send Immediately | Choose between queuing every payout for manual approval inside Mercury, or sending immediately with an IP-whitelisted Send Money token. |
| 6 | Duplicate-safe sends | Every payout carries a stable idempotency key, so a retried send returns the existing transaction instead of paying a seller twice. |
| 7 | Optional Statement Memo | Add a short memo (up to 80 characters) that shows up on the seller's bank statement, e.g. "Commission payout." |
| 8 | Signed webhook status updates | Mercury notifies your store the moment a payout is sent, fails, is cancelled, reversed, or blocked — verified with an HMAC signature before anything is trusted. |
| 9 | Optional payout fee | Deduct a fixed amount, a percentage, or both from every payout, with a custom label your sellers will see. |
| 10 | 20 language packs | Arabic, Danish, German, Greek, Spanish, Finnish, French, Hebrew, Italian, Japanese, Norwegian, Dutch, Polish, Portuguese, Russian, Swedish, Turkish, Traditional Chinese, US English, and British English. |

---

## Feature Inventory

| Metric | Count |
|--------|-------|
| Configuration fields | 11 |
| Send modes | 2 (Require Approval / Send Immediately) |
| Bank account types supported | 4 (Personal Checking, Personal Savings, Business Checking, Business Savings) |
| Payout fee types | 3 (Fixed / Percentage / Fixed + Percentage) |
| Supported payout currency | USD only |
| Language packs | 20 |

---

## What This Plugin Does

Mercury Payout is a bank-transfer gateway for the J2Commerce Marketplace vendor payout system. Once installed and configured, **Mercury (Bank Transfer)** appears as a payout option your sellers can choose from their vendor dashboard, alongside any other payout gateways you have enabled.

When a seller picks Mercury, they see a bank account card on their payout settings screen where they enter their own bank details. J2Commerce sends those details to Mercury to create (or update) a Recipient — Mercury's term for a saved payee — and stores only a reference id plus the last 4 digits of the account number on your site. The full account number is never written to your database.

From then on, whenever your store issues a payout to that seller, this plugin sends an ACH transfer request to Mercury using the seller's linked Recipient and your chosen **Funding Account**. Mercury reports back through a signed webhook when the transfer status changes, and this plugin passes that status back into J2Commerce so your payout history stays accurate automatically.

<!-- SCREENSHOT: J2Commerce Marketplace vendor dashboard showing the Mercury bank account linking card -->

---

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component, and it requires the J2Commerce Marketplace add-on to be installed first — Mercury Payout plugs into the vendor payout system that the Marketplace add-on provides.

1. Purchase and download the `payout_mercury.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `payout_mercury.zip` package file.
4. The plugin installs and enables automatically as **Mercury (Bank Transfer)** in the **J2Commerce** plugin group.

<!-- SCREENSHOT: Joomla System > Install > Extensions screen with payout_mercury.zip uploaded -->

### Before You Start

- A Mercury business bank account with API access. Sign up at [mercury.com](https://mercury.com) if you don't have one yet.
- A Mercury API token, generated from your Mercury dashboard settings.
- The J2Commerce Marketplace add-on installed and enabled, so your sellers have a vendor dashboard to link their bank account from.

---

## Configuration Settings

Go to **System** -> **Manage** -> **Plugins**, search for **Mercury (Bank Transfer)**, and open it to configure these settings.

<!-- SCREENSHOT: Mercury Payout plugin configuration screen in the Joomla admin -->

| Field | Description | Default | Options |
|-------|-------------|---------|---------|
| **Environment** | Whether payouts run against Mercury's Sandbox (testing) or Live (real money) API. Your API token must match the environment you select. | `Sandbox` | Sandbox, Live |
| **API Token** | Your Mercury API token, from your Mercury dashboard settings. Stored in the database and never logged. Send Immediately mode requires a Send Money token with an IP whitelist; Require Approval mode works with a Custom token that has no IP whitelist. | — | — |
| **Funding Account** | The Mercury account payouts are sent from. Save the API token and environment first, then reopen this screen — the plugin fetches your active checking and savings accounts directly from Mercury. | — | Loaded live from Mercury |
| **Send Mode** | Require Approval queues every payout for manual approval inside your Mercury dashboard. Send Immediately pays out without approval and requires a Send Money token with an IP whitelist. | `Require Approval in Mercury` | Require Approval in Mercury, Send Immediately |
| **Statement Memo** | Optional memo shown on the seller's bank statement, e.g. "Commission payout." | (empty) | Up to 80 characters |
| **Webhook Secret** | The signing secret Mercury returns once when you create the webhook endpoint through the Mercury API. Used to verify that incoming webhook requests really came from Mercury. Mercury does not deliver webhooks in Sandbox. | — | — |
| **Charge a Payout Fee** | Turn on to deduct a fee from every Mercury payout before it's sent. | `No` | Yes / No |
| **Fee Name** | The label shown to the seller for the deduction, e.g. "Processing Fee." Shown only when Charge a Payout Fee is on. | — | — |
| **Fee Type** | How the fee is calculated: a flat amount, a percentage of the payout, or both added together. Shown only when Charge a Payout Fee is on. | `Fixed` | Fixed, Percentage, Fixed + Percentage |
| **Fixed Fee Amount** | The flat fee amount, used when Fee Type is Fixed or Fixed + Percentage. | `0` | — |
| **Percentage Fee (%)** | The percentage fee, used when Fee Type is Percentage or Fixed + Percentage. | `0` | 0-100 |

---

## Setting Up Mercury Payouts (Store Admin)

Follow these steps once, as the store administrator, before your sellers can start linking their bank accounts.

1. Log in to your Mercury dashboard and generate an API Token. Use a Custom token if you plan to use Require Approval mode, or a Send Money token with your server's IP whitelisted if you plan to use Send Immediately mode.
2. In Joomla, go to **System** -> **Manage** -> **Plugins** and open **Mercury (Bank Transfer)**.
3. Set **Environment** to Sandbox for testing, or Live once you're ready to send real payouts.
4. Paste your API token into **API Token** and click **Save**.
5. Reopen the plugin. The **Funding Account** field now lists your active Mercury checking and savings accounts — select the one payouts should be sent from.
6. Choose a **Send Mode**: Require Approval is the safer default and needs no IP whitelist; Send Immediately pays out automatically but requires an IP-whitelisted token.
7. Optionally set a **Statement Memo**, and turn on **Charge a Payout Fee** if you want to deduct a processing fee from every payout.
8. If you want automatic payout status updates, create a webhook endpoint through the Mercury API and paste the signing secret it returns into **Webhook Secret**. Skip this step in Sandbox — Mercury does not deliver webhooks there.
9. Click **Save & Close**.

<!-- SCREENSHOT: Mercury Payout plugin params form showing Environment, API Token, and Funding Account fields -->

Once configured, **Mercury (Bank Transfer)** appears as a payout option in your J2Commerce Marketplace payout settings for sellers to choose.

---

## How Sellers Link Their Bank Account

Sellers manage this themselves from their own vendor dashboard — you don't need to do it for them.

1. The seller goes to their vendor dashboard's payout settings and selects **Mercury (Bank Transfer)** as their payout method.
2. A **Mercury (Bank Transfer)** card appears with a bank details form.
3. The seller fills in:
   - **Account Holder Name**
   - **Email**
   - **Routing Number** (exactly 9 digits)
   - **Account Number** (4 to 17 digits — never stored after saving; only the last 4 digits are kept, for display)
   - **Account Type** (Personal Checking, Personal Savings, Business Checking, or Business Savings)
   - **Legal Address** — the address on file for the account, required by Mercury for ACH payments
4. The seller clicks save. J2Commerce sends the details to Mercury to create or update their Recipient record, and the card shows a confirmation message that their bank account is linked for payouts.

<!-- SCREENSHOT: Vendor-facing Mercury bank account form with account holder name, routing number, and legal address fields -->

To update any bank detail later, the seller re-enters the full account number and saves again. Leaving the account number blank keeps the existing linked account untouched.

---

## How Payouts Are Sent

When your store issues a payout to a seller using Mercury:

- The plugin checks that the payout currency is USD. Mercury Send Money has no multi-currency payout rail, so payouts in any other currency are rejected with a clear error.
- The payout amount must be at least $0.01.
- The plugin sends the ACH transfer request using the seller's linked Recipient and your configured Funding Account, tagged with a stable reference so a retried send never pays the seller twice.
- In Require Approval mode, the transfer waits in your Mercury dashboard until you (or another authorized Mercury user) approve it.
- In Send Immediately mode, the transfer is sent right away.
- If a Webhook Secret is configured, Mercury notifies your store when the transfer status changes to sent, failed, cancelled, reversed, or blocked, and your J2Commerce payout history updates to match.

---

## Real-World Use Cases

### Use Case 1: A Small Multi-Vendor Marketplace

A handful of independent sellers list products on your J2Commerce store. Each month you run payouts, and Require Approval mode means every transfer sits in your Mercury dashboard for a final look before the money moves — no risk of a payout going out on a typo.

### Use Case 2: A High-Volume Marketplace on a Payout Schedule

A larger marketplace processes payouts weekly across dozens of sellers. Send Immediately mode, paired with an IP-whitelisted Send Money token, lets payouts go straight out without someone manually approving each one, while the webhook keeps the payout history in J2Commerce current without any extra work.

### Use Case 3: A Marketplace Charging a Processing Fee

A marketplace wants to recover part of its payment processing cost from sellers. Turning on Charge a Payout Fee with a Fixed + Percentage type deducts a small flat amount plus a percentage from every payout automatically, labeled clearly for the seller as "Processing Fee."

---

## Troubleshooting

### The Funding Account field only shows "Save the API token first, then reopen to choose an account"

**Cause:** The plugin hasn't saved an API token yet, so it has nothing to fetch accounts with.

**Solution:**
1. Enter your **API Token** and click **Save**.
2. Reopen the plugin. The **Funding Account** dropdown now loads your active Mercury checking and savings accounts.

### The Funding Account field shows "Could not load Mercury accounts - check the API token and environment"

**Cause:** Mercury rejected the request — usually a mismatched Environment and API Token pair, an expired token, or a Mercury API outage.

**Solution:**
1. Confirm the **Environment** (Sandbox or Live) matches where the API token was generated.
2. Regenerate the API token in your Mercury dashboard if needed and re-save it here.

### A seller's payout fails with "No Mercury payout bank account is linked yet"

**Cause:** The seller selected Mercury as their payout method but hasn't finished linking a bank account from their vendor dashboard.

**Solution:** Ask the seller to complete the **Mercury (Bank Transfer)** card in their payout settings, including the legal address fields.

### Payouts fail with a message about an unsupported currency

**Cause:** Mercury Send Money only moves USD, and the payout was attempted in a different currency.

**Solution:** Mercury Payout can only be used for USD payouts. Configure a different payout gateway for sellers who need payouts in another currency.

### A payout fails with "Mercury rejected the payment (HTTP 400)"

**Cause:** This is often Mercury's 24-hour duplicate guard, which blocks a second payout to the same recipient, from the same account, for the same amount, within 24 hours.

**Solution:** Check your server logs for the full Mercury response. If it genuinely is a duplicate-guard rejection, wait for the 24-hour window to pass, or adjust the payout amount.

### Webhook status updates aren't arriving in Sandbox

**Cause:** This is expected. Mercury does not deliver webhooks in the Sandbox environment.

**Solution:** Test webhook delivery against your Live environment, or check payout status manually in your Mercury dashboard while testing in Sandbox.

---

## Related Topics

- [Mercury ACH Bank Payment](../payment-methods/payment_mercury.md) — the companion plugin for accepting Mercury bank payments from customers (the reverse money flow from this plugin).
