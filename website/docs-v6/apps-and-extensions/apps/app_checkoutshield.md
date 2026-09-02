---
title: "Checkout Shield"
sidebar_label: "Checkout Shield"
sidebar_position: 5
description: "Protect your J2Commerce checkout from bots and card-testing fraud with layered risk scoring, an Analytics dashboard, IP blocking, and a one-click Lockdown Mode."
---

# Checkout Shield

Checkout Shield watches every step of your checkout for automated abuse — bots hammering your payment form with stolen card numbers, scripts flooding your registration page, or scalpers racing through checkout on a limited drop. It scores each attempt, logs everything to a dashboard under **Analytics**, and can automatically challenge or block the worst offenders once you decide it is time.

It ships in **monitor mode**. Out of the box it watches and reports without blocking a single legitimate shopper, so you can see exactly what it would have done before you ever flip the switch.

## Why This Matters to Your Store

### What a checkout bot attack actually looks like

The most common attack against a checkout is called **card testing** (sometimes "carding"). Criminals buy lists of thousands of stolen credit card numbers on the dark web, then run them through your checkout — usually against your cheapest product, in tiny amounts — to find out which cards are still active. A single wave can generate thousands of attempts in under an hour, and the person running it is never planning to actually receive the product.

You never see the fraud directly. What you see is a sudden spike in **declined payments** that looks nothing like your normal traffic.

### Why it costs you money even when every card is declined

- **You pay for every attempt, not just the successful ones.** Most payment gateways charge a small fee per authorization request — usually $0.20 to $0.40 — whether the card is approved or declined. A few thousand test attempts can rack up hundreds of dollars in fees before a single item is stolen.
- **Your decline rate becomes your reputation.** A healthy store normally declines 10-15% of payment attempts. During a card-testing wave that number can jump to 70-90% within minutes. Payment processors watch this number, and a spike can get your whole account flagged as high risk.
- **A "high risk" flag has real consequences.** Processors respond to elevated decline rates with extra fees, closer monitoring, and in serious cases account termination.
- **The fraud shows up again later, as chargebacks.** Cards validated through your store get used for fraud elsewhere. Weeks later those chargebacks land on your account and push your chargeback rate into unhealthy territory.
- **A big enough burst can slow your whole checkout down** for real customers trying to buy from you at the same time.

Checkout Shield is designed to stop this activity **before** it ever reaches your payment gateway — a bot that never gets past the honeypot or the velocity check never generates a billable authorization attempt in the first place.

<!-- SCREENSHOT: Checkout Shield dashboard showing the Checkout Health badge flipping from "Good" to "Under attack" during a simulated card-testing burst -->

## Installation

Checkout Shield is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

Checkout Shield actually ships as **two extensions** that work together — install both:

1. **`plg_j2commerce_app_checkoutshield`** — the protection engine, dashboard, and settings. This is the plugin you configure.
2. **`plg_task_j2commerce_checkoutshield`** — a companion task plugin that runs the scheduled maintenance jobs (list syncing, log purging, digest emails, and the GeoIP database refresh). See [Scheduled Tasks](#scheduled-tasks-required) below — Checkout Shield needs these jobs scheduled to stay accurate over time.

To install:

1. Purchase and download both `.zip` packages from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload `plg_j2commerce_app_checkoutshield.zip`, then upload `plg_task_j2commerce_checkoutshield.zip`.
4. Both extensions install and enable automatically.

<!-- SCREENSHOT: System > Install > Extensions showing the upload success message for both Checkout Shield packages -->

### Enabling and finding the settings

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for **Checkout Shield**. Confirm the plugin is enabled (it should be after install).
3. Click the plugin name to open its settings — this is where every option in this guide lives.
4. The dashboard lives in a different place: **J2Commerce** -> **Analytics** -> **Checkout Shield**.

## Setup Wizard (the Fastest Way to Get Started)

You do not have to work through every fieldset by hand. A **Setup Wizard** button sits in the toolbar of every Checkout Shield admin page — the dashboard, Attempts Log, Blocked IPs, Allowlist — and on the plugin's own settings screen. Click it to open a guided, three-step flow instead of hunting through settings yourself.

<!-- SCREENSHOT: Checkout Shield toolbar with the Setup Wizard button visible next to Lockdown -->

### Step 1: Choose what matters to you

Pick one or more of these scenario cards — they are not mutually exclusive, so select every one that fits your store:

| Card | What it turns on |
|------|-------------------|
| **Stop fake orders and card-testing** | Fraudsters push stolen cards through checkout in bulk, so you get junk orders and pay a fee on every one. We catch the pattern and shut it down. |
| **Block automated bots** | Scripts place orders faster than any human can. We watch for the tell-tale signs and turn them away. |
| **Add a human check for risky checkouts** | When something looks off, we ask that shopper to pass a quick verification. Real customers breeze through; bots cannot. |
| **Watch first, do not block anyone yet** (recommended) | See exactly what would be caught for a week before you turn on blocking. The safest start, with no risk of turning away a real customer. |
| **Alert me the moment an attack starts** | Get an email, and an optional chat message, the instant a wave of suspicious orders begins. |
| **Only accept orders from certain countries** | If you only ship to a few countries, turn away orders from everywhere else, a common source of fraud. |
| **I am running a flash sale or product drop** | Big sales attract scalper bots that grab everything to resell. We tighten the limits so real fans get a fair shot. |
| **Maximum protection (I will fine-tune later)** | Turn on every layer at its recommended strength. The strongest setting, where occasionally a real shopper gets a quick verification. |

<!-- SCREENSHOT: Setup Wizard step 1 showing the scenario cards with the "Watch first" card marked Recommended -->

### Step 2: A few follow-up questions

Depending on which cards you picked, the wizard asks only the questions it needs — for example:

- **When we catch a suspicious order, what should we do?** — Block it automatically, or just watch and email you first (recommended for your first week).
- **Which verification should risky shoppers pass?** — the built-in check (nothing to set up) or another captcha plugin already installed on your site.
- **Which email address should we send alerts to?**
- **How often would you like a summary?** — Once a day, every hour, or none.
- **Paste a Slack, Discord or Telegram webhook for urgent alerts** (optional).
- **Paste your free MaxMind license key so we can look up a shopper's country** (only if you picked the countries card) — you choose the actual country list afterward, under **Geolocation** in the plugin settings.
- Optional API keys for **AbuseIPDB**, **Project Honey Pot**, and **IPQualityScore** (only if you picked the countries card) — each is free to sign up for and safe to leave blank.

If you re-run the wizard later, any key field you already saved shows a note that it will keep the saved value unless you paste a new one.

<!-- SCREENSHOT: Setup Wizard step 2 showing the "watch and email me first" follow-up question -->

### Step 3: Review and apply

The wizard shows you exactly what it is about to change — grouped as "What we'll do" in plain language and "Your settings" as the actual field values — before anything is saved. Click **Apply** to save every selected scenario's settings in one step.

If you pick a card that would normally switch on enforcement (like **Block automated bots**) but also answer "just watch and email me first" in step 2, the wizard honors your answer and leaves blocking off — your explicit answer always wins over a card's default.

<!-- SCREENSHOT: Setup Wizard step 3 review screen showing the "What we'll do" summary before Apply -->

Every change the wizard makes is recorded the same way a manual settings save would be, so you can always see what changed and when.

## The Monitor-First Rollout (Read This Before Anything Else)

This is the single most important thing to understand about Checkout Shield: **it ships in Monitor mode, and you should leave it there for about a week before switching to Enforce.**

In Monitor mode, Checkout Shield:

- Scores every checkout attempt exactly as it would in live enforcement.
- Logs the action it **would** have taken — "would challenge" or "would block" — right alongside every attempt.
- Never actually challenges, blocks, throttles, or bans a real shopper.

This "observe before block" approach is standard practice across every serious bot-protection product (Cloudflare, Akamai, and enterprise bot-management vendors all default new customers into a monitor-only period first). It exists because every store's traffic is different — your legitimate customers might share office IPs, use ad-blockers that strip browser fingerprinting signals, or be unusually fast at filling out forms with browser autofill. A week of monitoring shows you exactly how your real traffic behaves before you risk turning away a paying customer.

### Recommended rollout steps

1. **Install and enable the plugin.** Leave every default setting as-is.
2. **Watch the dashboard daily for about a week.** Pay attention to the **Attempts Log** — look at what scored in the Challenge or Block band and check whether those look like real customers or bots.
3. **Tune the weights if something looks off.** If a signal is flagging real shoppers too often, lower its weight under **Signals** or **Velocity** in the plugin settings.
4. **Switch Mode to Enforce** under the **General** fieldset once you are comfortable with what the dashboard is showing you.
5. **Keep watching the dashboard** for the first few days after enforcing — the **Checkout Health** badge and the KPI band are your early warning system.

<!-- SCREENSHOT: Checkout Shield plugin settings, General fieldset, showing the Mode dropdown set to "Monitor (log only)" with the description text visible -->

:::tip
Before you switch to Enforce, open the **Blocked IPs** dashboard page and confirm your own office/home IP address is on the [Allowlist](#the-allowlist-editor). The dashboard will warn you at the top of every page if your current IP is not allowlisted while enforcement is on — don't lock yourself out during a real attack.
:::

## The Analytics -> Checkout Shield Dashboard

Everything Checkout Shield sees lives in one place: **J2Commerce** -> **Analytics** -> **Checkout Shield**.

<!-- SCREENSHOT: Full Checkout Shield dashboard page, showing the health badge, date filter bar, KPI band, and charts -->

### Checkout Health badge

At the top of the dashboard, next to the page title, a colored badge gives you an instant read on your store's status:

| Badge | Meaning |
|-------|---------|
| **Good** (green) | Fewer than 5% of checkout attempts are being flagged, and no decline-rate spike is active. |
| **Watch** (yellow) | Between 5% and 15% of attempts are being flagged. Worth a look. |
| **Under attack** (red) | More than 15% of attempts are being flagged, or a live decline-rate spike has been detected. |

### KPI cards

Six numbers give you the headline picture for the store:

| KPI | What it shows |
|-----|----------------|
| **Attempts today** | Every checkout request Checkout Shield has evaluated since midnight, store time. |
| **Flagged today** | Attempts that reached at least the Challenge score band. |
| **Blocked today** | Attempts that reached the Block band (or would have, in Monitor mode). |
| **Currently banned IPs** | How many IP addresses are actively blocked right now, either automatically or by hand. |
| **Decline ratio (1h)** | The share of payment attempts declined by your gateway in the last hour, with the underlying "X of Y declined" count and an arrow when it is spiking above your normal baseline. |
| **Acceptance rate** | 1 minus the flagged share over the last 7 days — the mirror image of your store's overall friction level. |

### Charts

Below the KPI band sit two chart panels, powered by Chart.js. The wide panel on the left carries two tabs:

- **Attack Timeline** — attempts vs. blocked, day by day, over your selected date range.
- **Revenue by Risk** — how much order value sits in each risk band over the same range. This is the one to check when you are deciding whether to tighten a threshold: it shows you what you would have turned away, in money, not just in attempt counts.

The narrower panel on the right carries:

- **Top Signals** — which detection signals (honeypot, velocity, card-testing pattern, and so on) are firing most often.
- **Risk Bands** — the spread of minFraud risk scores across your traffic. This tab only appears once minFraud is connected and confirmed.

Use the date-range buttons (**1 day / 7 days / 30 days / 90 days**) or the calendar pickers above the KPI band to change the window; the KPIs and charts refresh without reloading the page.

<!-- SCREENSHOT: Checkout Shield dashboard chart tabs, showing the "Attack Timeline" tab active with a visible spike -->

### Scoring Thresholds card

The scores that decide when a shopper is challenged and when they are blocked are editable straight from the dashboard, without opening plugin settings. Five dials sit in the **Scoring Thresholds** card:

| Dial | Range | Default | What it does |
|------|-------|---------|--------------|
| **Challenge score** | 0-100 | 40 | The score at which a shopper is asked to pass a captcha. |
| **Block score** | 1-100 | 70 | The score at which the attempt is refused outright. The floor is 1, not 0 — a threshold of 0 would block every shopper. |
| **minFraud challenge score** | 0-99 | 25 | The minFraud risk score that triggers a challenge. **0 disables this rule** and the dial reads *Disabled* rather than showing a number. |
| **minFraud block score** | 0-99 | 0 | The minFraud risk score that blocks outright. Ships **disabled** — turn it on deliberately once you have watched your own score distribution on the **Risk Bands** chart. |
| **minFraud timeout** | 1-30s | 8s | How long to wait for a minFraud answer before giving up and scoring locally. |

Drag a dial, use the arrow buttons underneath it, or focus a dial and use the keyboard: left and right arrows move by one, **Page Up** and **Page Down** by ten, **Home** and **End** jump to the limits.

**Save Thresholds** writes the change and clears the plugin's parameter cache, so the new values take effect on the very next checkout attempt — you do not need to re-save the plugin. **Reset Defaults** returns all five dials to the values in the table above.

<!-- SCREENSHOT: Scoring Thresholds card with the five dials, one mid-drag -->

### Connector Status card

Checkout Shield can lean on up to eight outside services, and this card tells you at a glance which of them are actually working:

| Connector | What it is |
|-----------|------------|
| **MaxMind minFraud** | Paid risk scoring. See [MaxMind minFraud Scoring](#maxmind-minfraud-scoring-optional). |
| **AbuseIPDB** | Community IP abuse reputation. |
| **IPQualityScore** | Commercial IP and email reputation. |
| **Project Honey Pot** | http:BL reputation lookup. |
| **StopForumSpam** | Free abuse list. |
| **Tor exit list** | Known Tor exit nodes. |
| **Disposable email list** | Throwaway email domains. |
| **Captcha** | The Joomla captcha plugin selected as your challenge provider. |

Each tile shows one of four states:

| State | Meaning |
|-------|---------|
| **Connected** | The service answered correctly. |
| **Failed** | Credentials are present but the service rejected them or could not be reached. |
| **No API Key** | The service is switched on but has no credentials entered. |
| **Testing** | The check is running right now. |

The card checks itself once a day and shows **Last checked** underneath. **Re-Check All** forces a fresh run immediately, past that daily cache — use it right after entering a new API key.

<!-- SCREENSHOT: Connector Status card showing a mix of Connected, No API Key, and Failed tiles -->

### Attack Origins card

A world map of where your flagged checkout attempts came from over the **last 30 days**, shaded by volume, with the attempt count and the blocked share per country.

The country is recorded on each attempt as it happens, so this card only has data for attempts logged after Checkout Shield started recording it — an older log will look emptier than your traffic really was. If no flagged attempt in the window carried a known country, the card draws the map greyed out and tells you so rather than showing an empty box. Country resolution needs the GeoLite2 database; see [Geolocation](#geolocation-optional).

<!-- SCREENSHOT: Attack Origins card with several countries shaded and a tooltip showing the attempt count -->

### The Attempts Log

Every checkout request Checkout Shield evaluates gets a row here — go to **Checkout Shield** -> **Attempts Log**, or click the **View all** link under "Recent attempts" on the dashboard.

Each row shows the timestamp, the IP address (with a country flag when [Geolocation](#geolocation-optional) is on), a strip of colored dots for the individual signals that fired, the overall risk score, and the action taken (Logged / Would Block / Challenged / Throttled / Blocked / Banned).

- **Filter** by IP or email domain, risk band, action taken, checkout step, or date range using the search bar at the top.
- **Select rows** and use the toolbar to **Block IP** (choose 1 hour / 24 hours / 7 days / permanent from the dropdown), **Allowlist IP**, **Clear Counters** (reset the velocity count for that key — useful if you just fixed a false-positive setting), **Export CSV**, or **Purge Log**.
- Every row also has a **one-click Block/Unblock icon** so you can act on a single attempt without selecting it first.

<!-- SCREENSHOT: Attempts Log list view showing the filter bar, signal dots column, score badges, and the per-row block toggle -->

### The Blocked IPs Manager

Go to **Checkout Shield** -> **Blocked IPs** to see every IP currently on the blocklist, whether it got there automatically (repeat offenses) or you put it there by hand.

Each row shows the IP (or CIDR range), a **Temporary/Permanent** badge, the reason, the source (**Auto**, **Manual**, or **Reputation**), how many hits it has racked up since the ban, its ban escalation level, and a countdown to expiry.

- Use **Add Block…** to manually block a specific IP address.
- Select rows and **Unblock**, **Make Permanent**, or **Delete**.
- The same **one-click toggle icon** from the Attempts Log lets you unblock (or re-block) any row without selecting it first.

Temporary bans stop enforcing the moment they expire — they don't need a cleanup job to become harmless — but Checkout Shield does clean up expired rows automatically about 30 days after they lapse, so the log doesn't grow forever.

<!-- SCREENSHOT: Blocked IPs manager showing a mix of Temporary and Permanent badges, the source column, and the expiry countdown -->

### The Allowlist Editor

Go to **Checkout Shield** -> **Allowlist** to manage entries that **always bypass every check**, no matter what — including Lockdown Mode.

You can allowlist by:

| Type | Example |
|------|---------|
| **IP** | `203.0.113.42` |
| **CIDR range** | `203.0.113.0/24` |
| **Email** | `warehouse@yourstore.com` |
| **Email domain** | `yourstore.com` |

Add entries with **Add Entry…**, remove them with **Delete**. At minimum, allowlist your own admin office/home IP address — the dashboard will warn you if it is not on the list while enforcement is active.

<!-- SCREENSHOT: Allowlist editor "Add Entry" form open, showing the Type dropdown with IP/CIDR/Email/Email domain options -->

### The Suspect Orders Review

Go to **Checkout Shield** -> **Suspect Orders** to see, in one screen, every order Checkout Shield flagged — no digging through your general Orders list required.

Each row shows the order number, customer, total, order status, risk band, and the specific reasons the order was flagged (with a **minFraud** tag when MaxMind's own score, see [MaxMind minFraud Scoring](#maxmind-minfraud-scoring-optional) below, contributed). Filter by order number, email, or IP address, or sort by any column including the minFraud score.

Select rows and use the toolbar to **Block IP Address**, **Allowlist IP Address**, **Block Email Address**, **Allowlist Email Address**, or **Change Order Status** on the underlying orders in bulk.

:::info
Bulk-changing order status here suppresses the store's normal order emails, but connected apps (SMS, marketing automation, user groups) may still contact these customers, and a status that unlocks downloads will still grant them. Double-check before you bulk-change status on suspect orders.
:::

<!-- SCREENSHOT: Suspect Orders list showing the Reasons column and the bulk-action toolbar -->

### Identity Rules (optional)

Go to **Checkout Shield** -> **Identity Rules** to stop a checkout based on **who the shopper says they are**, rather than where they are connecting from. This catches a fraudster who changes IP address or network but keeps reusing the same throwaway name or email pattern — something a Blocked IPs entry can never do, because it only ever keys on an address.

Identity rules are **off by default**. A starter set of rules ships already installed but dormant — review them on this screen, then turn on **Enable identity rules** under the **Rules** fieldset in plugin settings to start evaluating them on every scored checkout step. Turning the toggle back off leaves your rules in place; it just stops them from matching.

Click **New Rule** to add one. Each rule has:

| Field | What it does |
|-------|---------------|
| **Applies to** | **Name**, **Email**, or **Company**. A name rule is checked against the shopper's first name, last name, and full name together. |
| **Match** | **Exact**, **Contains**, **Regex** (an advanced pattern), or **Email domain** (bare domain only, e.g. `example.com` — applies to the Email kind only). |
| **Pattern** | The text or pattern to match against. |
| **Action** | **Monitor** (log only, uses the **Score** field below), **Challenge** (show a captcha), or **Block** (stop the checkout step outright). |
| **Score** | Points added to the risk total — only used when Action is set to Monitor. |
| **Note** | Your own reminder of why you added the rule. |

:::info
**Challenge** needs a working Joomla captcha plugin. If none is available while enforcement is on, a challenged shopper falls back to your **When No Captcha Is Available** setting (under **Rules** -> **Challenge** in plugin settings) — by default they are logged as "Not enforced" and let through, so a checkout can never be permanently locked by a missing captcha. Set that option to **Block the request**, or set the specific rules you want strictly enforced to the **Block** action instead, once you know your captcha is working.
:::

<!-- SCREENSHOT: Identity Rules list with the New Rule inline form open, showing the Applies to / Match / Pattern / Action fields -->

## MaxMind minFraud Scoring (optional)

MaxMind — the same company behind the free geolocation database above — also sells **minFraud**, a paid, per-request fraud-scoring service that checks a transaction against signals no on-site plugin can see on its own, such as billing and device history seen across the wider internet. It is **off by default** and billed per request by MaxMind, separately from your GeoLite2 geolocation key.

Configure it under **Connectors** -> **MaxMind minFraud** in plugin settings. It uses the same **MaxMind Account ID** and **MaxMind License Key** entered under **Connectors** -> **Geolocation**.

Before the two minFraud modes become available you have to prove the credentials work. On the **General** tab, the **minFraud Connection** field carries a **Check MinFraud** button that tests your account ID and licence key against MaxMind directly. Until that check succeeds, the two minFraud options in the **Mode** list stay unavailable — so a typo in a licence key cannot leave you believing minFraud is scoring when it never was.

The **Mode** setting itself lives on the **General** tab, not under the minFraud section, because it decides which system is in charge of your whole checkout:

| Mode | Who decides | When to use it |
|------|-------------|----------------|
| **Checkout Shield** | This plugin decides on its own, from the signals it collects at checkout. | The default, and correct until you have minFraud connected and have watched its scores for a while. |
| **Checkout Shield Supported By MinFraud** | This plugin decides, with MaxMind's risk score added to its own — a second opinion that can push a borderline shopper over the line. | The usual choice once minFraud is working. Your own signals stay in charge; minFraud only sharpens the edges. |
| **MinFraud Supported By Checkout Shield** | minFraud decides while it is answering, and this plugin's own scoring takes over whenever minFraud cannot be reached. | When you want to lean on MaxMind's data as the primary judgment. An outage never leaves checkout unprotected. |

The last two require a confirmed minFraud connection.

Everything else sits under **Connectors** -> **MaxMind minFraud**:

| Setting | What it does | Default |
|---------|---------------|---------|
| **minFraud Scoring** | Master switch. When on, a minFraud request is sent at the order-confirmation step only. | Off |
| **minFraud Service** | Which minFraud service tier to call. Only **Score** is active in this release; Insights and Factors are reserved for a future update. | Score |
| **minFraud Weight** | The maximum points added to the risk score when minFraud's own score is at its highest; it scales proportionally below that. | 25 |
| **minFraud Challenge Score** | The minFraud score at or above which a shopper is challenged (only used when minFraud is deciding). Set to 0 to never challenge on the minFraud score alone. | 25 |
| **minFraud Block Score** | An optional hard gate — when minFraud's score reaches this value the request is blocked outright, regardless of the weighted total. Set to 0 to disable and rely on the weight only. | 0 (disabled) |
| **minFraud Timeout (Seconds)** | How long to wait for MaxMind before giving up. This time is added to the shopper's own submission, so a high value costs completed orders if the service is slow. | 8 |
| **Report Chargebacks to MaxMind** | When an order tied to a minFraud request is later charged back, refunded, or canceled, report that outcome back to MaxMind to improve future scoring. | Off |
| **Send customer identity to minFraud** | Include billing name, company, and email in the minFraud request — the biggest accuracy inputs minFraud has. Without it, the score describes the IP address rather than the actual transaction. Check that your privacy policy covers sharing this with MaxMind before enabling. | Off |
| **Send the email address unhashed** | By default the email is sent as an MD5 hash, which minFraud still matches against its reputation data. Turning this on sends the plain address for slightly stronger matching. | Off |
| **Order Risk Badges** | Show a risk badge on the order view and the admin orders list for any order with a recorded shield or minFraud score. | On |

<!-- SCREENSHOT: MaxMind minFraud fieldset showing the Mode dropdown and the minFraud Weight/Block Score fields -->

The dashboard shows a **MaxMind minFraud Account** card with your remaining funds, remaining queries, and when it was last checked, so you can see a low-balance warning before scoring quietly stops.

### Marketplace Payout Guard (marketplace stores only)

If you run a J2Commerce marketplace with vendor payouts, turn on **Marketplace Payout Guard** (under the MaxMind minFraud fieldset) to automatically hold a vendor's payout whenever its commission is tied to a blocked-band order, or to an order whose minFraud score reaches your **Marketplace Hold Score** (default 75). This does nothing on a store without a marketplace/vendor plugin installed.

## Lockdown Mode

Lockdown Mode is a **one-click emergency switch**, available from the toolbar on every Checkout Shield page. Turn it on when you are watching a real attack unfold and need to slam the door immediately, without waiting to retune individual settings.

While Lockdown is active:

- **Every checkout step is challenged**, regardless of score (this can be turned off in settings, though the default is on).
- **Guest checkout can be blocked entirely** (on by default) — this matters because card-testing attacks almost always run through the anonymous guest path, never a logged-in account.
- **All velocity thresholds are tightened** by a configurable multiplier (25% of normal, by default) — attempts that would normally slide through in small numbers now trip the alarm much faster.
- **Lockdown auto-expires** after a configurable number of hours (24 by default) so you never forget it is on and lock out customers for good. Set it to 0 hours for manual-only control.
- A red banner appears at the top of every Checkout Shield page for as long as Lockdown is active, and both activating and deactivating it send you an immediate critical alert.

**Allowlisted entries always bypass Lockdown Mode too** — so your own admin IP stays safe even during a full lockdown, as long as you added it beforehand.

<!-- SCREENSHOT: Checkout Shield dashboard with the red "Lockdown Mode is active" banner visible and the Lockdown OFF toolbar button showing -->

### When to use it

Reach for Lockdown Mode when you see the **Checkout Health** badge flip to "Under attack" and the **Decline ratio** KPI spike hard — that combination is the clearest sign a card-testing wave is actively hitting your store right now. It buys you time to review the Attempts Log and add specific offenders to the Blocked IPs list, without needing to change your regular Mode/threshold settings under pressure.

## Notifications

Checkout Shield can alert you two ways: **immediate email** for anything serious, and a **periodic digest** that rolls up everything else so your inbox doesn't drown in noise. Both live under the **Notifications** fieldset in plugin settings.

### Immediate email alerts

| Setting | Description | Default |
|---------|-------------|---------|
| **Email Alerts** | Turn immediate email notifications on or off. | On |
| **Alert Recipients** | Comma-separated email addresses. Leave blank to use your site's default "mail from" address. | (site mail-from) |
| **Immediate-Alert Severity Floor** | Only events at or above this severity trigger an immediate email — Critical, High, or Medium. | High |
| **Alert Score Threshold** | The risk score that generates an alert, kept deliberately **separate** from your block threshold, so you can watch loudly while enforcing gently. | 40 |

An attack in progress, an IP getting auto-banned, or Lockdown Mode being switched on or off always sends an immediate email, regardless of these settings — those are the events that need your attention right now.

### Anti-fatigue controls (so you don't get flooded)

Nobody wants 500 emails during a real attack. Checkout Shield builds anti-fatigue directly into the notification system:

- **Per-Offender Alert Cooldown** — once you get an alert about a specific IP, you won't get another one about the *same* IP for this many hours (default 6). Repeat hits inside that window just bump a counter on the original alert instead of sending a new email.
- **Alert threshold is separate from your block threshold** — you can set a low alert score to watch closely while your actual block threshold stays conservative, or vice versa.
- **Digest Email** — instead of individual emails, roll medium-severity activity up into a single periodic summary. Options: **Off**, **Hourly**, or **Daily** (default: Daily). The digest includes counts by band and action, your top offenders, top flagged domains, ban changes, and the Checkout Health badge — no other checkout-protection product on the market offers digest mode, so this is a real convenience if you'd rather check in once a day than get pinged constantly.

<!-- SCREENSHOT: Notifications fieldset in plugin settings, showing the Digest Email dropdown and the Alert Score Threshold field -->

### Chat webhook (optional)

Point **Webhook URL** at a Slack, Discord, or Telegram incoming-webhook URL to get alerts posted straight into a channel your team already watches. Set **Webhook Severity Floor** to control how much noise it generates (default: Critical only).

### Sending a test alert

Every Checkout Shield page has a **Send Test Alert** button in the toolbar — use it after configuring recipients to confirm mail delivery is working before you actually need it.

### Editing the email templates

Checkout Shield registers two email types under **Design** -> **Email Templates**: **Checkout Shield Alert** and **Checkout Shield Digest**. Edit the subject and body like any other J2Commerce email — merge tags like `[SHIELD_IP]`, `[SHIELD_SCORE]`, `[SHIELD_EVENT]`, and `[DIGEST_TABLE]` are available for you to work with.

## Reputation Providers and Geolocation

These signals are **optional and mostly disabled by default** — Checkout Shield works fine without them, and turning them on trades a small amount of setup effort for extra detection accuracy against known-bad infrastructure.

Every outside service Checkout Shield can talk to lives under one **Connectors** tab in plugin settings, split into three sections: **IP & Email Reputation**, **Geolocation**, and **MaxMind minFraud**. Once you have entered credentials, the [Connector Status card](#connector-status-card) on the dashboard is the fastest way to confirm each one is actually working.

### Reputation providers

Configure these under **Connectors** -> **IP & Email Reputation**. Two free bulk lists work locally with no API key and are already **on by default**:

| Provider | Needs a key? | Default | What it does |
|----------|--------------|---------|---------------|
| **StopForumSpam** | No | On | Matches the client IP against a locally synced bulk list of known-bad IPs. Free and fast because there's no live API call at checkout time. |
| **Tor exit nodes** | No | On (adds to score) | Checks the client IP against a locally synced list of Tor exit nodes. Can be set to Off, "Add to score," or "Block" outright. |
| **Disposable email domains** | No | On | Flags checkout attempts using a known throwaway email domain, from a bundled list plus a daily sync. |
| **AbuseIPDB** | Yes (free tier: 1,000 checks/day) | **Off** (gated by "IP Reputation Lookups") | Live lookup at payment submission only, cached for a day. |
| **Project Honey Pot (http:BL)** | Yes (free) | **Off** | DNS-based lookup, cached, ~1-second timeout. |
| **IPQualityScore** | Yes (free tier: 1,000/month) | **Off** | Live fraud-score lookup, cached; the free tier is limited so it only runs at payment submission. |

The two locally-synced bulk lists (StopForumSpam and Tor) and the disposable-domain list all depend on the **daily sync task** — see [Scheduled Tasks](#scheduled-tasks-required) below. Until that task runs at least once, those lists are empty and contribute nothing.

To turn on the key-based providers: open plugin settings, go to **Connectors** -> **IP & Email Reputation**, flip **IP Reputation Lookups** to on, then paste in the API key(s) you signed up for on the provider's website. Check the result on the dashboard's **Connector Status** card — press **Re-Check All** so it does not wait for its daily refresh. All lookups only happen at the payment step and are cached for 24 hours by default, so there is no ongoing per-request cost.

:::info
Reputation lookups require the **full IP storage** privacy mode. If you switch [IP Storage](#gdpr-and-privacy) to Hashed, reputation checks are automatically disabled — the providers need a real IP address to look up.
:::

<!-- SCREENSHOT: IP & Email Reputation fieldset showing the AbuseIPDB key field and the StopForumSpam / Tor toggle switches -->

### Geolocation (optional)

Geolocation is **off by default**. To turn it on:

1. Sign up for a free MaxMind GeoLite2 account and generate a license key.
2. Under **Connectors** -> **Geolocation**, flip **Geolocation** to on and paste in your **MaxMind Account ID** and **MaxMind License Key**.
3. Schedule the weekly **Refresh GeoIP Database** task (below) — the dashboard shows the database status so you know when it's ready.
4. Choose your **Country List Mode** (allow only listed countries, or act against listed countries), pick the countries, and set the **Geolocation Action** (Add to score / Challenge / Block).

Geolocation is also what puts countries on the [Attack Origins card](#attack-origins-card). Without it that card stays empty, because attempts are logged with no country to plot.

The database downloads and refreshes on a server-fixed path automatically once the task is scheduled — there's nothing to manage manually after the first setup.

## Scheduled Tasks (Required)

Checkout Shield's companion **task plugin** needs seven maintenance routines scheduled under **System** -> **Scheduled Tasks** to keep the dashboard accurate, keep the reputation lists fresh, and honor your data-retention settings. Add each one as a **New Task**, selecting the matching Checkout Shield task type.

| Task | Suggested cadence | What it does |
|------|-------------------|---------------|
| **Checkout Shield: Purge Expired Bans** | Hourly | Removes temporary IP bans that expired more than 30 days ago. |
| **Checkout Shield: Purge Old Attempts** | Daily | Deletes attempt-log rows older than your configured retention period — this is the GDPR purge job. |
| **Checkout Shield: Purge Stale Counters** | Hourly | Cleans up spent velocity-tracking data so the counters table doesn't grow forever. |
| **Checkout Shield: Sync Bulk Lists** | Daily | Refreshes the disposable-email, StopForumSpam, and Tor exit-node lists used for local matching. |
| **Checkout Shield: Send Digest** | Hourly | Builds and sends the digest email when one is due — it checks your Digest Email setting itself, so it's safe to schedule hourly even if you've chosen daily digests. |
| **Checkout Shield: Recompute Baselines** | Hourly | Recalculates the 7-day rolling "normal traffic" baseline that the attack-spike detectors compare against. |
| **Checkout Shield: Refresh GeoIP Database** | Weekly | Downloads the latest GeoLite2 database using your MaxMind key. Only does anything if you have Geolocation configured. |

<!-- SCREENSHOT: System > Scheduled Tasks list showing all seven Checkout Shield tasks added with their next-run times -->

:::tip
If any of these tasks are missing, the dashboard is designed to warn you — but don't wait for that. Add all seven the same day you install the plugin, before you even switch to Enforce mode. Without the sync tasks running, your reputation lists stay empty and your attack-spike baselines never build up.
:::

## GDPR and Privacy

IP addresses are personal data under EU law, so Checkout Shield is built with privacy controls from the start. These live under the **Privacy** fieldset.

| Setting | Description | Default |
|---------|-------------|---------|
| **Attempt Log Retention (days)** | How long attempt records are kept before automatic purge. Accepted security-log practice is 6-12 months. | 180 (range 30-365) |
| **IP Storage** | How client IPs are stored in the attempt log. | Full |

The **IP Storage** options are:

- **Full** — the raw IP address is stored. Best detection accuracy; needed for live reputation lookups.
- **Hashed** — IPs are stored as a SHA-256 hash combined with your site's secret key. Recommended for EU stores. Velocity limiting and auto-banning both keep working on the hashed value; live reputation lookups are automatically disabled because the providers need a real IP to check.
- **Truncated** — IPs are stored with the last portion removed (`/24` for IPv4, `/48` for IPv6), a common middle-ground anonymization approach.

### Export and erasure requests

Checkout Shield hooks into Joomla's built-in **Privacy** tools (**Users** -> **Privacy**). When a customer submits a data export or removal request:

- **Export** returns their own attempt records — timestamp, checkout step, risk score, band, action taken, email domain, and country — matched by their account or the email address on the request.
- **Removal** anonymizes those rows rather than deleting them outright: the IP, email hash, fingerprint, and user-agent are cleared, but the score/band/action/timestamp are kept so your store-wide statistics stay accurate.

The scheduled **Purge Old Attempts** task above enforces your retention period automatically — it isn't just a policy statement, records really do get deleted once they age out.

## Troubleshooting / FAQ

### A legitimate customer got challenged with a CAPTCHA — why?

Checkout Shield only presents a challenge when a request's risk score crosses your **Challenge Score Floor** (default 40). Open the **Attempts Log**, find the customer's attempt by IP or timestamp, and look at the signal dots — hovering over each dot shows exactly what fired and why. Common causes: a very fast checkout completion (browser autofill on a re-order), a shared office/VPN IP that has also seen other traffic, or several checkout attempts in a short window (a customer retrying after fixing a typo in their card number).

If a pattern like this keeps showing up for real customers, lower the relevant signal's weight under **Signals** or **Velocity** in plugin settings — you don't need to disable the signal entirely, just make it contribute less to the total score.

### My store has a lot of shared/office IPs (CGNAT) — will this block whole offices at once?

No. Checkout Shield deliberately keeps **per-IP** velocity limits looser than per-session, per-email, and per-fingerprint limits, specifically because carrier-grade NAT (CGNAT) and office/university networks put many unrelated legitimate customers behind one shared public IP. The system also detects CGNAT-range traffic automatically and shifts its trust to the tighter per-session/per-fingerprint keys instead, so ten different customers checking out concurrently from one office network won't trip a shared IP ban.

### Why do gateway payment callbacks or off-site redirects still work while an attacker's IP is banned?

By design. Checkout Shield only ever enforces on the checkout steps a customer walks through — never on the server-to-server callbacks (webhooks) your payment gateway sends back to confirm a payment, and never on off-site payment redirects. Those paths are structurally outside anything the plugin can block, so a temporarily banned IP can never accidentally swallow a real, already-authorized payment confirmation.

As an extra safety net, you can still add your payment gateway's published IP ranges to the [Allowlist](#the-allowlist-editor) if you want belt-and-braces protection, though it is not required for correct operation.

### I switched to Enforce mode and now I can't test checkout myself

Check the top of any Checkout Shield dashboard page — a warning banner appears whenever enforcement is on and your current admin IP is **not** on the Allowlist. Add your own IP (or your office's) to the Allowlist before enforcing, and remember to update it if your IP address changes (working from home vs. the office, for example).

### The dashboard shows "No data for the selected range"

This is expected on a brand-new install — nothing has been logged yet. Place a test order (or a few) through your storefront, then refresh the dashboard. If it's still empty after real traffic, confirm the **Checkout Shield** plugin itself is enabled under **System** -> **Manage** -> **Plugins**.

### Reputation lookups or Geolocation aren't doing anything

Confirm two things: (1) you've entered a valid API key (for AbuseIPDB/IPQualityScore) or a MaxMind license key (for Geolocation), and (2) the matching scheduled task has actually run at least once — check **System** -> **Scheduled Tasks** for the **Sync Bulk Lists** or **Refresh GeoIP Database** entries. Both features fail open by design: if a key is missing or a lookup fails, Checkout Shield logs it and lets the checkout continue rather than blocking a customer over an infrastructure hiccup.

## Related Topics

- [Analytics Dashboard](../../getting-started/dashboard.md)
- [Order Statuses](../../setup/order-statuses.md)
- [Email Templates](../../design/email-templates.md)
