---
title: "Additional Terms"
sidebar_label: "Additional Terms"
sidebar_position: 10
description: "Add a second terms-and-conditions acknowledgement at checkout — as a required checkbox or a soft disclosure link — for cancellation policies, GDPR addendums, age verification, and more."
---

# Additional Terms

J2Commerce includes a built-in primary terms and conditions acknowledgement at checkout. The **Additional Terms** app adds a second, independent agreement on top of that — useful when a single catch-all T&amp;C is not enough.

Common use cases: a 14-day cancellation policy, a returns policy that differs from your general terms, a GDPR data processing addendum, an age-verification gate, or an NDA layered on top of a standard purchase agreement. The app lets you choose whether customers must actively tick a checkbox before they can place an order, or whether the terms appear as a passive disclosure link they can read without being required to acknowledge.

## Requirements

- PHP 8.3+
- Joomla! 6.x
- J2Commerce 6.x

## Installation

This app is a separate add-on available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

1. Purchase and download the `plg_j2commerce_app_additionalterms.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the ZIP file using the **Upload Package File** tab.
4. The plugin installs automatically. You will see a confirmation message when it completes.

<!-- SCREENSHOT: Joomla Extensions installer with the Additional Terms zip uploaded and the success confirmation message visible -->

## Enable the App

After installation, the plugin is not yet active. Enable it through the J2Commerce Apps screen:

1. In the Joomla admin sidebar, go to **Components** -> **J2Commerce** -> **Apps**.
2. Locate **Additional Terms for J2Commerce** in the list.
3. Click the toggle (it shows as a red X when disabled). It turns green when enabled.

Alternatively, go to **System** -> **Manage** -> **Plugins**, search for `Additional Terms`, and click **Enable**.

<!-- SCREENSHOT: J2Commerce Apps screen with the Additional Terms row highlighted and the toggle in the enabled (green) state -->

## Before You Configure: Create the Terms Article

The plugin pulls the full text of your additional terms from a standard Joomla article. You need to create that article before you configure the plugin.

1. Go to **Content** -> **Articles** -> **New**.
2. Write the full text of your additional policy — for example, your cancellation terms or a GDPR data processing notice.
3. Set the article **Status** to **Published**.
4. Click **Save & Close**.
5. Note the article's **ID** — you will see it in the Articles list under the **ID** column. You will need this number in the next step.

The article can belong to any category. It does not need to appear in a menu — the plugin loads it directly by ID and displays the body in a Bootstrap modal at checkout.

<!-- SCREENSHOT: Joomla Articles list showing a cancellation policy article with its ID visible in the ID column -->

## Configure the Plugin

Go to **Components** -> **J2Commerce** -> **Apps**, click the name **Additional Terms for J2Commerce**, then click **Options** (or open the plugin directly via **System** -> **Manage** -> **Plugins** -> **Additional Terms**).

<!-- SCREENSHOT: Additional Terms plugin configuration screen showing the Basic tab with all fields visible -->

### Basic Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Show Additional Terms** | Master on/off switch. When set to **No**, the entire feature is disabled and nothing appears at checkout. | Yes |
| **Display Type** | How the terms are shown. See the next section for guidance on which mode to choose. | Link only (display) |
| **Terms Article** | The Joomla article that contains your additional policy text. Click **Select** to pick the article by title, or type the article ID directly. | — |
| **Label Prefix** | Text shown before the clickable link label. For example: `I agree to the` | I agree to the |
| **Label** | The clickable text customers see. This text opens the modal when clicked. | additional terms and conditions |
| **Label Suffix** | Optional text shown after the label. Leave blank if the prefix reads as a complete sentence on its own. | _(empty)_ |
| **Warning Message** | The error message shown when a customer tries to complete checkout without ticking the box. Only visible when **Display Type** is set to **Checkbox**. | Please accept the additional terms and conditions to continue. |

### Advanced Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Debug Mode** | Writes validation decisions to the Joomla log file at `administrator/logs/plg_j2commerce_app_additionalterms.php`. Useful when testing. Disable this in a live store. | No |

## Choosing a Display Type

### Link only (display)

The terms appear as a hyperlink inline at the confirm step of checkout. When the customer clicks the link, a Bootstrap modal opens showing the full article body. The customer is **not required** to do anything — this is a passive legal disclosure.

Use this mode when you want to make your cancellation policy or returns terms visible without creating friction, or when your legal counsel says awareness is sufficient without active consent.

### Checkbox (required to checkout)

A checkbox appears just above the confirm button. The label is a clickable link that opens the modal. The customer **must tick the box** before checkout proceeds. If they try to submit without ticking, a red error message appears above the form and the order is blocked.

Use this mode when active consent is required — for example, an age-verification gate ("I confirm I am 18 or older"), a GDPR processing agreement, or a policy with significant financial implications such as a no-refund clause.

## Customising the Wording

The three text fields — **Label Prefix**, **Label**, and **Label Suffix** — assemble into a single sentence at checkout. The **Label** portion is always a clickable link (or plain text if no article is selected).

**Example 1 — Cancellation policy checkbox:**

| Field | Value |
|-------|-------|
| Label Prefix | `I have read and agree to the` |
| Label | `cancellation policy` |
| Label Suffix | `, including the 14-day return window` |
| Result | I have read and agree to the **cancellation policy**, including the 14-day return window |

**Example 2 — Age verification:**

| Field | Value |
|-------|-------|
| Label Prefix | `I confirm that I am` |
| Label | `18 years of age or older` |
| Label Suffix | _(empty)_ |
| Result | I confirm that I am **18 years of age or older** |

**Example 3 — GDPR data processing addendum:**

| Field | Value |
|-------|-------|
| Label Prefix | `I accept the` |
| Label | `data processing addendum` |
| Label Suffix | `required under GDPR` |
| Result | I accept the **data processing addendum** required under GDPR |

The prefix and suffix fields accept plain text. If you type a language key (for example `MY_CUSTOM_KEY`), Joomla's translation system will resolve it — otherwise the text is shown as-is. Most store owners simply type plain sentences directly into these fields.

## How It Appears at Checkout

The terms block renders just above the order confirmation form at the final checkout step. In **Link mode**, it appears as a single paragraph with a hyperlink. In **Checkbox mode**, it appears as a checkbox with a labelled link beside it.

When the customer clicks the link (in either mode), a scrollable Bootstrap modal opens containing the full article body. The modal has a **Close** button and an X in the corner.

<!-- SCREENSHOT: Checkout confirm step showing the Additional Terms block in checkbox mode — checkbox, label text, and the red error message below it -->

<!-- SCREENSHOT: The Bootstrap modal open showing a sample cancellation policy article body -->

## Difference from J2Commerce's Built-in Primary Terms

J2Commerce includes a **Primary Terms and Conditions** setting in **J2Commerce** -> **Configuration** -> **Checkout**. That setting handles the first, main T&amp;C agreement your customers sign.

The **Additional Terms** app is for everything else — a second, third, or specialised agreement that sits alongside the primary terms. Both can be active at the same time. Customers see the primary T&amp;C and the additional terms as separate, independent acknowledgements.

## Troubleshooting

### The terms block does not appear at checkout

**Check 1:** Confirm the plugin is enabled. Go to **System** -> **Manage** -> **Plugins**, search for `Additional Terms`, and verify the status is **Enabled**.

**Check 2:** Open the plugin configuration and confirm **Show Additional Terms** is set to **Yes**.

**Check 3:** Confirm the **Terms Article** field has an article selected. If no article ID is set, the modal has no content — but the block itself should still render. If the block is missing entirely, the plugin may not be enabled.

**Check 4:** Enable **Debug Mode** in the plugin's **Advanced** tab. Then reproduce the checkout and check the log file at `administrator/logs/plg_j2commerce_app_additionalterms.php` for entries that explain why the block was skipped.

---

### The modal opens but is empty

The article you linked may not be published, or the article ID may be incorrect. Go to **Content** -> **Articles**, confirm the article exists, its **Status** is **Published**, and that the ID in the plugin matches the ID shown in the Articles list.

---

### The checkbox validation error does not appear

Confirm **Display Type** is set to **Checkbox (required to checkout)** — not **Link only (display)**. Link mode never blocks checkout regardless of whether the customer clicks the link.

---

### Error message at checkout reads a raw language key instead of text

If the **Warning Message** field is blank and the default has been cleared, the plugin falls back to the internal language key. Open the plugin configuration, clear the **Warning Message** field completely, and type your own message in plain English. Save the plugin.

---

### Debug log shows "Checkout halted" but the error does not appear on screen

This can happen if a caching plugin is serving a stale page. Clear the Joomla cache via **System** -> **Clear Cache** and retry.

## What Changed from the J2Store Version

| Area | Old (J2Store 4) | New (J2Commerce 6) |
|------|-----------------|---------------------|
| Modal | Fancybox (jQuery) | Native Bootstrap 5 modal, no jQuery dependency |
| Validation | Custom return-value pattern | `RuntimeException` thrown inside `onJ2CommerceAfterOrderValidate` — the checkout controller catches it and surfaces a styled `alert-danger` automatically |
| Error display | Inconsistent placement | Always rendered as a red alert above the confirm form |
| JavaScript | jQuery required | No JavaScript required — modal is pure Bootstrap 5 CSS/HTML |
| Queries | String-concatenated SQL | Parameterised queries throughout |
| Architecture | FOF 2 plugin | Native Joomla 6 plugin with `SubscriberInterface`, strict types, PHP 8.3+ |
