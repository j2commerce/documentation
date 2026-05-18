---
title: "EU VAT Rules"
sidebar_label: "EU VAT Rules"
sidebar_position: 24
description: "Automate EU B2B reverse-charge VAT at checkout — validate customer VAT numbers via VIES or Vatlayer and zero tax for valid cross-border EU business sales."
---

# EU VAT Rules

If your store is VAT-registered in the EU and you sell to other EU businesses, you are probably familiar with the reverse-charge mechanism: when a buyer in a different EU country provides a valid VAT registration number, you issue an invoice with zero VAT and the buyer accounts for it themselves. Getting this right manually at every checkout is a headache. The EU VAT Rules app handles it automatically.

At checkout, the app reads the customer's VAT number from their billing or shipping address, calls the official EU validation service (or the third-party Vatlayer API), and zeros the tax on the order if the number checks out. Two optional extras round it out: you can also zero tax for customers outside the EU entirely, and you can lock in full VAT for digital products — which is required under EU digital-services rules for sales to non-business customers.

## Requirements

- Joomla 6.x
- J2Commerce 6.0.0 or later
- PHP 8.3+ with either the **PHP SOAP extension** (for VIES) or **cURL** (for Vatlayer)
- Tax profiles already configured in J2Commerce so there is tax to zero out

## Installation

This plugin is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `app_euvat.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the ZIP file.
4. The plugin installs and enables automatically.

After installation, go to **J2Commerce** -> **Apps** to configure it.

## Before You Turn It On

A few things should be in place before enabling the plugin:

- **Your store's home country is set.** Go to **J2Commerce** -> **Configuration** and check the **Country** field in the Store section. The plugin compares every customer's destination country against this value — home-country customers are always charged the full tax rate.
- **A custom field exists for the tax number.** Customers need somewhere to enter their VAT registration number at checkout. If you do not have a billing address field named `tax_number` yet, add one via your checkout address configuration before enabling the plugin.
- **Tax profiles are configured.** The app zeros tax by removing the tax rate list for matching orders. If no tax rates are assigned in the first place, there is nothing for the app to zero.
- **Choose your validation service.** VIES (the EU Commission's service) is free but has occasional outages. Vatlayer is a paid REST API with higher uptime. See the comparison table below before deciding.

## Step-by-Step Setup

### Step 1: Open the Plugin Settings

1. Go to **J2Commerce** -> **Apps**.
2. Find **EU VAT Rules** in the list.
3. Click the plugin name to open its settings.

<!-- SCREENSHOT: J2Commerce Apps list with EU VAT Rules row highlighted -->

### Step 2: Choose a Validation Service

The **Validation Service** toggle is the first decision to make.

- Set it to **VIES (EU Commission)** to use the free EU Commission SOAP endpoint. No account or API key required.
- Set it to **Vatlayer** if you have purchased an access key from [vatlayer.com](https://vatlayer.com). This option requires the **Vatlayer Access Key** field to appear (it only shows when Vatlayer is selected).

<!-- SCREENSHOT: Validation Service switcher showing VIES and Vatlayer options -->

### Step 3: Enter Your Vatlayer Access Key (Vatlayer only)

If you chose Vatlayer, paste your API access key into the **Vatlayer Access Key** field. Leave this blank if you are using VIES — the field is hidden for VIES and has no effect.

### Step 4: Configure the Remaining Options

| Setting | What It Does | Default |
|---------|-------------|---------|
| **Disable Non-EU Customer Tax** | Set to **Yes** to zero tax for any customer whose billing or shipping country is not an EU member state. Useful if you do not charge VAT on exports outside the EU. | Yes |
| **Apply VAT on Digital Products** | Set to **Yes** to enforce full VAT on digital goods even when the customer provides a valid VAT number, if they have no company name on file. This matches EU digital-services rules. | Yes |
| **Display Invalid VAT Message** | Set to **Yes** to show a warning banner on the checkout confirmation step when the customer's VAT number was rejected. Validation always runs — this setting only controls whether the rejection message is displayed. | No |
| **Debug Logging** | Set to **Yes** to write detailed validation traces to `administrator/logs/app_euvat.php`. Turn this off once you have finished testing. | No |

<!-- SCREENSHOT: EU VAT Rules settings panel with all four toggle fields visible -->

### Step 5: Save and Confirm the Plugin Is Enabled

Click **Save**. Back on the Apps list, confirm the toggle next to **EU VAT Rules** is green. If it is grey, click it to enable the plugin.

## How the Rules Work

Each time a tax rate calculation runs during checkout, the plugin applies these rules in order:

- **Home-country customers are always taxed.** If the customer's destination country matches your store's country setting, the plugin makes no changes and the full tax rate applies.
- **EU cross-border customer with no VAT number or an invalid one is taxed.** If the customer is in another EU member state but has not entered a VAT number (or the number does not validate), standard VAT is charged.
- **EU cross-border customer with a valid VAT number is zero-rated.** If the customer is in another EU member state and their VAT number is confirmed valid, the tax rate is zeroed — the reverse-charge mechanism applies.
- **Non-EU customer is zero-rated (if that setting is on).** If the customer is outside the EU and **Disable Non-EU Customer Tax** is set to **Yes**, tax is zeroed regardless of whether a VAT number was provided.

The digital-products sub-rule can override rule 3: if **Apply VAT on Digital Products** is **Yes** and the customer has no company name stored, full VAT is charged even if the VAT number is valid.

## VIES vs Vatlayer

| | VIES (EU Commission) | Vatlayer |
|-|---------------------|---------|
| **Cost** | Free | Paid subscription |
| **Coverage** | EU member states only | EU member states + global |
| **Uptime** | 95–99% — planned and unplanned outages occur | Higher — commercial SLA |
| **Speed** | Moderate (SOAP, each call ~1–3 s) | Fast (REST JSON) |
| **Setup** | None — works immediately | Requires purchase of an API key |
| **Outage behaviour** | Returns "unknown" — checkout proceeds without zeroing tax | Returns "unknown" or "invalid" depending on error type |

For most small to medium EU shops, VIES is perfectly adequate. If you process high order volumes, have customers who complain about slow checkouts, or need guaranteed uptime, Vatlayer is worth the subscription cost.

## The Brexit Caveat

The plugin's internal list of EU member states still includes **GB** (United Kingdom) for backwards compatibility with legacy address data. In practice, this means the plugin currently treats UK customers as EU members when checking whether to apply reverse-charge zeroing.

If you sell to UK customers and want them to be charged the correct VAT, set **Disable Non-EU Customer Tax** to **No** (so the non-EU exemption does not silently zero their tax), and ensure your tax profiles apply the right rate for UK addresses. Until GB is removed from the member list in a future release, this is the recommended workaround for stores with significant UK traffic.

## Troubleshooting

### "VAT number is invalid" appears on every checkout — including your own tests

**Cause:** VIES is experiencing an outage. The EU Commission runs maintenance windows and the service can be unavailable for 1–6 hours at a time.

**Solution:**
1. Try the customer's VAT number on the [EU VIES portal](https://ec.europa.eu/taxation_customs/vies/) directly. If the website also fails, it is a VIES outage, not a plugin issue.
2. During the outage the plugin returns "unknown" (not "invalid") for numbers it cannot verify, so checkout should not be blocked — if validation is blocking customers, check that you are on version 6.0.0 or later.
3. For persistent uptime problems, switch to **Vatlayer** in the plugin settings.

### Customer has a valid VAT number but is still being charged tax

**Cause:** Several things can prevent zeroing from happening.

**Solution:**
1. Confirm your store's home country is set correctly under **J2Commerce** -> **Configuration**. If the store country ID is 0 or blank, the plugin cannot identify cross-border sales.
2. Check whether **Apply VAT on Digital Products** is **Yes** and whether the customer has a company name in their address. If the company field is empty and digital rules are on, the plugin charges tax.
3. Verify the customer's billing or shipping country is recognised as an EU member. If you have custom country data, the ISO 3166-1 alpha-2 code must be one of the 27 current EU member states (or GB — see Brexit note above).
4. Enable **Debug Logging**, place a test order with the same customer details, and review `administrator/logs/app_euvat.php` for the line starting with `onAfterGetTaxRateItems:`.

### Tax is not being zeroed even though all settings look correct

**Cause:** The plugin reads the VAT number from the customer's saved address or guest session. If the address was not yet saved when the tax event fired, the field is empty.

**Solution:**
1. Enable **Debug Logging** and check the log for `vat=empty`. If that appears, the plugin is not finding the VAT number in the address.
2. Check that your checkout form has a field named exactly `tax_number` in the billing (or shipping) address step — the plugin reads specifically from that field name.
3. For registered users, confirm the address record in the database has a value in the `tax_number` column for the address they are using at checkout.

### Vatlayer returns "unknown" responses

**Cause:** The access key is incorrect, your Vatlayer plan has run out of monthly lookups, or the Vatlayer API is temporarily unavailable.

**Solution:**
1. Log in to your [Vatlayer dashboard](https://vatlayer.com/dashboard) and confirm your access key and usage quota.
2. Copy the access key fresh from the dashboard and paste it into the plugin's **Vatlayer Access Key** field. Save and test again.
3. If the quota is exhausted, upgrade your plan or temporarily switch to **VIES** until the quota resets.

### The invalid VAT banner does not appear at checkout

**Cause:** **Display Invalid VAT Message** is set to **No**.

**Solution:**
1. Open the plugin settings in **J2Commerce** -> **Apps** -> **EU VAT Rules**.
2. Set **Display Invalid VAT Message** to **Yes** and click **Save**.
3. The banner appears on the checkout confirmation step when a VAT number is rejected — not on the address step itself.

### I enabled Debug Logging but the log file does not appear

**Cause:** The log file is created on the first validation call. If no checkout with a VAT number has been attempted since you enabled logging, there will be no file yet.

**Solution:**
1. With **Debug Logging** set to **Yes**, go to your storefront and add a product to cart.
2. Proceed to checkout, enter a billing address with a country and a tax number.
3. The log file appears at `administrator/logs/app_euvat.php` after that step.

## What Is New in J2Commerce 6.0.0

If you used the EU VAT Rules app with J2Store v4, here is what changed in this release:

- **Native Joomla 6 plugin architecture.** The plugin no longer depends on the FOF framework. It uses Joomla's service provider and subscriber pattern, which means a cleaner install, proper uninstall, and no compatibility issues with future Joomla versions.
- **cURL timeouts on Vatlayer requests.** In J2Store v4 the Vatlayer cURL call had no timeout, which could hang a customer's checkout for minutes if the API was slow. The new version enforces a 5-second connection timeout and a 10-second read timeout.
- **HTTPS-only API calls.** All external requests — both VIES SOAP and Vatlayer REST — use HTTPS. The previous version used plain HTTP for the Vatlayer free tier, which exposed the access key in transit.
- **SOAP WSDL caching.** The VIES SOAP client now caches the WSDL definition on disk (`WSDL_CACHE_BOTH`), so the WSDL file is only fetched once per server. Repeat validations are noticeably faster.
- **Tri-state VIES result (outages no longer block checkout).** The old code treated a VIES SOAP fault as an invalid number, blocking the customer. The new version distinguishes between "invalid" (explicitly rejected by VIES) and "unknown" (service unavailable). An "unknown" result lets the order proceed — the customer is not punished for a service outage you cannot control.
- **Address ownership check.** When looking up a registered user's VAT number, the plugin verifies that the address record belongs to the logged-in user. This prevents one account from inadvertently reading another account's tax number (a privacy hardening change not present in the J2Store version).
- **HTML scrape fallback removed.** The J2Store version fell back to scraping the EU Commission's HTML page when the SOAP extension was unavailable. This was fragile and could break whenever the EU changed their site layout. The new version requires either the PHP SOAP extension (for VIES) or cURL (for Vatlayer) — a missing extension triggers a clear error at install time instead of a silent runtime failure.
- **Debug Logging toggle in plugin settings.** You can now enable or disable the log file from the plugin configuration panel without editing any server files. Logs go to `administrator/logs/app_euvat.php`.
