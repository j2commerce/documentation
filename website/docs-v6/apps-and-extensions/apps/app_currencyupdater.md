---
title: "Currency Exchange Rates Updater"
sidebar_label: "Currency Updater"
sidebar_position: 5
description: "Automatically update currency exchange rates from multiple API sources for accurate multi-currency pricing in your J2Commerce store."
---

# Currency Exchange Rates Updater

The Currency Updater app keeps your store's exchange rates current by fetching live rates from trusted financial data providers. When you sell in multiple currencies, accurate exchange rates ensure customers see correct prices — whether you update rates manually or on a schedule.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x
- At least one currency enabled in addition to your store's base currency

## Installation

This plugin ships with J2Commerce 6 and is available immediately after installation. To enable it:

1. Go to **System** -> **Manage** -> **Extensions**.
2. Search for **Currency Updater**.
3. Click the checkbox next to the plugin and click **Enable** in the toolbar.

Alternatively, enable it from the J2Commerce Apps screen (see below).

## Enable the Plugin

**Option A:** Go to the **J2Commerce** icon at the top right corner -> **Apps**

**Option B:** Go to **Components** on the left sidebar -> **J2Commerce** -> **Apps**

<!-- SCREENSHOT: J2Commerce Apps list showing Currency Updater plugin -->

Search for **Currency Exchange Rates Updater**, click the **X** to enable it. The X turns into a green checkmark when enabled.

## Choose an API Provider

Click on **Currency Exchange Rates Updater** to open the configuration screen. The most important setting is the **API Source**, which determines where exchange rates come from.

### API Source Comparison

| Provider | API Key Required | Free Tier | Best For |
| -------- | ---------------- | --------- | -------- |
| **Frankfurter** | No | Unlimited | Stores using major world currencies (EUR-based rates from ECB) |
| **ExchangeRate.host** | No | Unlimited | Stores needing broader currency coverage without API registration |
| **ExchangeRate-API** | Yes | 1,500 requests/month | Stores wanting rate limit alerts and usage tracking |
| **CurrencyAPI** | Yes | 300 requests/month | Stores needing real-time rates for many currencies |
| **Open Exchange Rates** | Yes | 1,000 requests/month | Stores needing 170+ currencies including cryptocurrency |

---

## Get API Keys (4 Providers Require Keys)

### ExchangeRate-API

**Free tier:** 1,500 requests per month (plenty for hourly updates)

1. Go to [https://www.exchangerate-api.com/](https://www.exchangerate-api.com/)
2. Click **Get Free Key** or sign up for an account.
3. Enter your email address and create a password.
4. Check your email for a verification link and click it.
5. After verification, you'll see your API key on the dashboard.
6. Copy the API key.

<!-- SCREENSHOT: ExchangeRate-API dashboard showing the API key field -->

**Configure in J2Commerce:**
1. In the Currency Updater settings, select **ExchangeRate-API** as the API Source.
2. Paste your key into the **ExchangeRate-API Key** field.
3. Click **Save**.

---

### CurrencyAPI

**Free tier:** 300 requests per month (good for daily updates)

1. Go to [https://currencyapi.com/](https://currencyapi.com/)
2. Click **Sign Up Free** or **Get API Key**.
3. Create an account with your email and password.
4. Verify your email address.
5. Navigate to **API Keys** in your dashboard.
6. Click **Create New API Key** if one isn't already generated.
7. Copy the API key.

<!-- SCREENSHOT: CurrencyAPI dashboard showing API keys section -->

**Configure in J2Commerce:**
1. In the Currency Updater settings, select **CurrencyAPI** as the API Source.
2. Paste your key into the **CurrencyAPI Key** field.
3. Click **Save**.

---

### Open Exchange Rates

**Free tier:** 1,000 requests per month with USD as base currency only

1. Go to [https://openexchangerates.org/signup/free](https://openexchangerates.org/signup/free)
2. Fill in your details and create a free account.
3. After logging in, go to **App IDs** in your dashboard.
4. Copy your **App ID** (this is your API key).

<!-- SCREENSHOT: Open Exchange Rates dashboard showing App ID -->

**Important:** The free tier only returns rates with USD as the base currency. If your store's base currency is not USD, J2Commerce will automatically recalculate rates based on your base currency.

**Configure in J2Commerce:**
1. In the Currency Updater settings, select **Open Exchange Rates** as the API Source.
2. Paste your App ID into the **Open Exchange Rates App ID** field.
3. Click **Save**.

---

### Frankfurter (No API Key Needed)

**Free, unlimited, no registration required.**

Frankfurter is an open-source API that pulls exchange rates directly from the European Central Bank. It's the recommended choice for most stores.

- No signup required
- Supports approximately 30 major world currencies
- Rates update daily (ECB publishes new rates around 16:00 CET on business days)
- No rate limits

**Configure in J2Commerce:**
1. Select **Frankfurter — ECB Rates** as the API Source.
2. No key needed — just click **Save**.

---

### ExchangeRate.host (No API Key Needed)

**Free, no registration required.**

ExchangeRate.host is a free alternative with broader currency coverage than Frankfurter.

- No signup required
- Wide currency coverage
- No rate limits for latest rates endpoint
- Good fallback if Frankfurter doesn't support your currencies

**Configure in J2Commerce:**
1. Select **ExchangeRate.host** as the API Source.
2. No key needed — just click **Save**.

---

## Manually Update Exchange Rates

You can update rates on demand from the Currencies management screen.

### Step 1: Navigate to Currencies

Go to **Components** -> **J2Commerce** -> **Currencies**.

<!-- SCREENSHOT: J2Commerce menu showing Currencies option -->

### Step 2: Ensure Currencies Are Enabled

Make sure the currencies you want to update have a green checkmark in the **Enabled** column. Rates are only fetched for enabled currencies.

### Step 3: Click Update Rates

Click the **Update Rates** button in the toolbar. J2Commerce contacts your configured API provider and updates the exchange rate values for all enabled currencies.

<!-- SCREENSHOT: Currencies view showing Update Rates button in toolbar -->

After a successful update, you'll see a success message: **"X currency rate(s) updated successfully."**

The **Modified** date column will show the current timestamp for each updated currency.

---

## Set Up Automatic Rate Updates

Instead of manually clicking Update Rates, you can schedule automatic updates using Joomla's Task Scheduler. This keeps your rates current without any intervention.

### Step 1: Enable the Currency Updater Scheduled Task

1. Go to **System** -> **Scheduled Tasks**.
2. Click **New** to create a new scheduled task.
3. In the task type dropdown, search for and select **J2Commerce: Update Currency Rates**.

<!-- SCREENSHOT: Joomla Scheduled Tasks list showing New button and task type dropdown -->

### Step 2: Configure the Task

| Setting | Recommended Value |
| ------- | ----------------- |
| **Title** | `Update Currency Rates Daily` |
| **Execution Interval** | `0 3 * * *` (daily at 3:00 AM) — adjust based on your needs |
| **Execution Rules** | Leave default unless you need specific constraints |

For stores that need more frequent updates (e.g., volatile markets), use:
- **Every hour:** `0 * * * *`
- **Every 6 hours:** `0 */6 * * *`
- **Twice daily:** `0 6,18 * * *`

<!-- SCREENSHOT: Scheduled Task configuration form with execution interval set -->

### Step 3: Enable and Save

1. Set **Status** to **Enabled**.
2. Click **Save & Close**.

### Step 4: Verify the Scheduler Is Running

Joomla's Task Scheduler requires a trigger to execute scheduled tasks. You have two options:

**Option A: Server Cron Job (Recommended)**

Add this to your server's crontab:

```bash
*/5 * * * * php /path/to/your/site/cli/joomla.php scheduler:run
```

This checks for pending tasks every 5 minutes.

**Option B: Lazy Scheduler (Easier Setup)**

1. Go to **System** -> **Global Configuration**.
2. Click **System** tab.
3. Set **Scheduled Tasks** to **Lazy Scheduler**.
4. Set **Lazy Scheduler Interval** to `300` (5 minutes).

The lazy scheduler triggers scheduled tasks when someone visits your site. It's simpler but less reliable than a real cron job.

---

## Configuration Reference

### Settings Tab

| Setting | Description | Default |
| ------- | ----------- | ------- |
| **Layout Style** | CSS framework for the configuration template. Choose Bootstrap 5 or UIkit. | Bootstrap 5 |
| **API Source** | The exchange rate provider. See API Source Comparison above. | Frankfurter |
| **ExchangeRate-API Key** | API key for ExchangeRate-API (shown only when that provider is selected). | — |
| **CurrencyAPI Key** | API key for CurrencyAPI (shown only when that provider is selected). | — |
| **Open Exchange Rates App ID** | App ID for Open Exchange Rates (shown only when that provider is selected). | — |

---

## Troubleshooting

### "An API key is required for [Provider]"

**Cause:** You selected an API provider that requires authentication but didn't enter the key.

**Solution:**
1. Open the Currency Updater settings.
2. Enter the API key in the appropriate field.
3. Click **Save**.

If you don't have a key yet, see the "Get API Keys" section above, or switch to a provider that doesn't require a key (Frankfurter or ExchangeRate.host).

---

### "No enabled currencies found to update"

**Cause:** All currencies except your store's base currency are disabled.

**Solution:**
1. Go to **Components** -> **J2Commerce** -> **Currencies**.
2. Enable at least one currency besides your base currency.
3. Return to the Currencies view and click **Update Rates** again.

---

### "Your store base currency is not available from [Provider]"

**Cause:** The selected API provider doesn't support your store's base currency in its response.

**Solution:**
1. Switch to a different API provider that supports more currencies (Frankfurter and ExchangeRate.host support ~30 major currencies; Open Exchange Rates supports 170+).
2. If using Open Exchange Rates free tier, be aware it only returns USD-based rates. J2Commerce automatically recalculates from USD to your base currency, but your base currency must be in the supported list.

---

### Rates haven't updated even though cron ran

**Possible causes:**

1. **The Currency Updater plugin is disabled.** Go to **J2Commerce** -> **Apps** and verify the plugin has a green checkmark.

2. **No currencies are enabled.** Go to **Currencies** and enable at least one currency besides your base currency.

3. **API key is invalid or expired.** Test by clicking **Update Rates** manually in the Currencies view. If it fails, check your API key.

4. **API provider is down.** Try switching to a different provider temporarily.

5. **Your base currency isn't set.** Go to **J2Commerce** -> **Setup** -> **Store** and verify **Store Currency** is configured.

---

### ExchangeRate-API shows "HTTP 403" error

**Cause:** Your API key is invalid, revoked, or has exceeded its request limit.

**Solution:**
1. Log into your ExchangeRate-API account.
2. Check your usage and key status.
3. If the key is invalid, generate a new key.
4. Update the key in J2Commerce Currency Updater settings.

---

### CurrencyAPI shows "HTTP 401" error

**Cause:** Your API key is missing from the request or is invalid.

**Solution:**
1. Verify you copied the entire API key (no extra spaces).
2. Log into your CurrencyAPI account and check your key status.
3. If the key is revoked, generate a new key.

---

## Best Practices

### Choose the Right Update Frequency

- **Daily updates** are sufficient for most stores. Exchange rates fluctuate, but daily updates keep prices reasonably accurate.
- **Hourly updates** may be needed if you sell in volatile markets or cryptocurrencies, or if your margins are tight.
- **Avoid updating more than once per hour** — most free API tiers have monthly limits, and rates don't change that fast.

### Monitor Your API Usage

If you use ExchangeRate-API, CurrencyAPI, or Open Exchange Rates:
- Log into your provider's dashboard monthly to check usage.
- A daily update uses ~30 requests per month.
- An hourly update uses ~720 requests per month.
- If you're approaching your limit, reduce update frequency or upgrade your plan.

### Test After Configuration

After setting up automatic updates:
1. Go to **System** -> **Scheduled Tasks**.
2. Find your Currency Updater task.
3. Click the task title to view its history.
4. Verify the last execution shows "Success" status.

---

## Related Topics

- [Currencies Management](../configuration/currencies.md) — Managing store currencies and exchange rates
- [Cron Tasks and Scheduled Maintenance](../configuration/cron-tasks.md) — Setting up automated maintenance tasks
- [Multi-Currency Setup](../getting-started/multi-currency.md) — Selling in multiple currencies