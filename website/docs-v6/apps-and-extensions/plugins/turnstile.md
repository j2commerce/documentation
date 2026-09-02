---
title: "Cloudflare Turnstile"
sidebar_label: "Cloudflare Turnstile"
sidebar_position: 35
description: "Add Cloudflare Turnstile as a captcha provider so J2Commerce forms can verify shoppers without the friction of image puzzles."
---

# Cloudflare Turnstile

Cloudflare Turnstile is a captcha (a test that tells human visitors apart from automated bots) that protects your Joomla forms — registration, contact, and J2Commerce checkout — from spam and abusive bot traffic. It plugs into Joomla's built-in captcha system, so once it is set up, it works anywhere Joomla asks for a captcha.

The key selling point: most visitors never see a challenge at all. Turnstile runs a quiet, automatic check in the background and only shows a puzzle to suspicious traffic. There are no "click all the traffic lights" photo grids for your genuine customers to fight through.

<!-- SCREENSHOT: The Turnstile widget rendered on a form, showing its "Verifying you are human" state -->

## Requirements

- Joomla! 6.x — this plugin installs into Joomla's Captcha plugin group, alongside any other captcha plugins on your site.
- A free Cloudflare account, used to generate the Site Key and Secret Key the plugin needs.

## Get Your Cloudflare Keys

Before you can configure the plugin, you need two keys from Cloudflare: a **Site Key** and a **Secret Key**.

1. Go to [cloudflare.com](https://www.cloudflare.com/) and sign up for a free account, or sign in if you already have one.
2. Once you're in the Cloudflare dashboard, find the **Turnstile** section (it lists any widgets you've already created).
3. Add a new widget for your site. You will be asked to give the widget a name and enter your site's domain — use the same domain your Joomla store runs on.
4. After the widget is created, Cloudflare shows you the **Site Key** and **Secret Key** together on the same screen.

<!-- SCREENSHOT: Cloudflare dashboard showing a newly created Turnstile widget with its Site Key and Secret Key -->

Keep these two keys handy — you'll paste them into the plugin's settings in the next step.

**What's the difference between the two keys?**

- The **Site Key** is public. It's embedded in your page's HTML so the visitor's browser can load the Turnstile widget. It's safe for anyone to see.
- The **Secret Key** is private. Your Joomla site uses it, behind the scenes, to confirm with Cloudflare that a visitor's response is genuine. Never share it or paste it anywhere public.

## Install the Plugin

You can install this plugin using the Joomla installer.

1. In the Joomla admin, go to **System** -> **Install** -> **Extensions**.
2. Upload the plugin ZIP file, or use the **Install from URL** option.

<!-- SCREENSHOT: The Joomla Install Extensions screen with the upload panel visible -->

## Enable the Plugin

1. Go to **System** -> **Manage** -> **Plugins**.
2. Search for `turnstile`.
3. Open **Captcha - Cloudflare Turnstile**.
4. Set **Status** to **Enabled**, then click **Save & Close**.

<!-- SCREENSHOT: The Plugins list filtered to "turnstile", showing the plugin enabled with a green checkmark -->

## Turn It On for Your Site

Enabling the plugin is not enough on its own — this is the step most store owners miss. Joomla only uses a captcha once you tell it which captcha plugin is your **default**.

1. Go to **System** -> **Global Configuration**.
2. Open the **Site** tab.
3. Find the **Default Captcha** field.
4. Choose **Captcha - Cloudflare Turnstile** from the list.
5. Click **Save & Close**.

<!-- SCREENSHOT: Global Configuration, Site tab, with the Default Captcha dropdown set to Captcha - Cloudflare Turnstile -->

Some individual forms have their own captcha setting that can override the site-wide default — for example, the **Users** component's registration form (**System** -> **Manage** -> **Options** -> **Users** -> **Integration** tab) has its own **Captcha** field. When a setting like this is left on **Use Global**, it follows whatever you picked as the **Default Captcha** above. If it's set to a specific captcha plugin instead, it uses that plugin regardless of the site-wide default — so check any form that isn't showing the Turnstile widget for its own captcha setting.

## Configure the Plugin

Open **System** -> **Manage** -> **Plugins** -> **Captcha - Cloudflare Turnstile** to reach the settings below.

:::tip

Click the **Toggle Inline Help** button in the toolbar and the plugin will show a description below each field as you configure it.

:::

### Basic Settings tab

**Site Key:** The site key for your Cloudflare Turnstile widget, shown to visitors. Paste in the Site Key you copied from Cloudflare.

**Secret Key:** The secret key for your Cloudflare Turnstile widget, used to verify the response server-side. Paste in the Secret Key you copied from Cloudflare. Keep this private.

**Theme:** Controls the color scheme of the widget. Choose **Auto** to match the visitor's device settings, or force **Light** or **Dark**.

**Size:** Controls the size of the widget. Choose **Normal**, **Compact**, or **Flexible** (which stretches to fill the width of its container).

**Appearance:** Controls when the widget is visible. **Always** shows the widget as soon as the page loads. **Execute** and **Interaction Only** delay showing anything until the form is being used, which keeps the page looking cleaner — most stores can leave this on **Always** unless a developer has asked for one of the other modes.

**Retry Interval:** Time, in milliseconds, before the widget automatically retries after a network error. Enter a value between `1000` (one second) and `899999` (roughly 15 minutes). If you're not sure, leave the default in place.

### Localhost Testing

This fieldset is for developers and designers testing your site on their own computer — it has no effect on your live, public site.

**Use Test Keys on Localhost:** (Default: **Yes**.) When enabled, Cloudflare's published test site key and secret are used automatically whenever the site is accessed from a local or private address, so the widget works without a live Turnstile account during development. In plain terms: if someone opens your site at an address like `localhost`, `127.0.0.1`, or a private network address, the plugin swaps in Cloudflare's public testing keys instead of your real ones, so they don't need real Cloudflare credentials just to see the form working.

**Test Outcome:** Choose the outcome Cloudflare's test credentials should produce while testing on localhost. Only shown when **Use Test Keys on Localhost** is set to **Yes**. Options:

- **Always passes** — the widget always succeeds, useful for testing the rest of the form.
- **Always fails** — the widget always fails, useful for testing your error handling.
- **Timeout or duplicate** — simulates an expired or already-used response.
- **Force interactive challenge** — forces the widget to show a visible challenge instead of passing silently.

### Advanced tab

**Strict Mode:** (Default: **No**.) When enabled, any error contacting Cloudflare's verification service fails the check. When disabled, such errors are treated as a pass so a temporary Cloudflare or network outage does not block your visitors.

For most stores, leave this set to **No**. A brief Cloudflare outage is rare, but if it happens while Strict Mode is on, every visitor gets blocked from submitting any protected form — including checkout. Leaving it off means a network hiccup lets a form through unchecked rather than locking out real customers.

### JavaScript Callbacks tab

This entire tab is for developers customizing the widget's behavior with JavaScript. If that doesn't apply to you, you can safely skip it and leave every field blank.

Each field takes the name of a JavaScript function already defined on your page:

- **Success Callback** — runs when the challenge is completed successfully.
- **Error Callback** — runs when there's an error, such as a network problem.
- **Expired Callback** — runs when the visitor's token expires without resetting the widget.
- **Before Interactive Callback** — runs right before a visible challenge is shown.
- **After Interactive Callback** — runs after a visible challenge finishes.
- **Unsupported Browser Callback** — runs if the visitor's browser isn't supported by Turnstile.
- **Timeout Callback** — runs when the challenge times out and the widget needs to be reset.

## How It Works

1. When a protected form loads (registration, contact, checkout, or any other form using the site's default captcha), the plugin renders the Turnstile widget on the page and loads Cloudflare's script to power it.
2. In the background, Turnstile silently checks signals from the visitor's browser. Most real visitors pass instantly with no interaction required.
3. If Turnstile can't be confident automatically, it shows a brief interactive challenge instead.
4. Once the check completes, the widget submits a response token along with the rest of the form.
5. When the visitor submits the form, your Joomla site sends that token to Cloudflare's verification service, along with your Secret Key, to confirm it's genuine.
6. Cloudflare replies with a pass or fail verdict. On a pass, the form submission continues normally. On a fail, the visitor sees an error message and must try again.

## Tips

- Always test your live keys on your real domain before relying on them — a Site Key created for the wrong domain won't work.
- Keep **Use Test Keys on Localhost** enabled during development so your team doesn't need real Cloudflare credentials just to test forms locally, and turn Strict Mode off unless you have a specific reason to require it.
- If a particular form (registration, contact, etc.) still isn't showing the widget after you've set the site-wide default, check that form's own captcha setting — some extensions let individual forms override the site default.
- Double-check that your Secret Key was pasted in full and without extra spaces — a partial or mistyped key is the most common cause of verification failures.

## Troubleshooting

### The widget does not appear on any form

**Cause:** The plugin isn't enabled, isn't set as the site's default captcha, or the affected form has its own captcha setting pointing elsewhere.

**Solution:**

1. Go to **System** -> **Manage** -> **Plugins** and confirm **Captcha - Cloudflare Turnstile** is enabled.
2. Go to **System** -> **Global Configuration** -> **Site** tab and confirm **Default Captcha** is set to **Captcha - Cloudflare Turnstile**.
3. Check whether the specific form (registration, contact, etc.) has its own captcha setting, and make sure it's set to **Use Global** or directly to **Captcha - Cloudflare Turnstile**.

### "Please complete the captcha challenge" appears on every submission

**Cause:** The form was submitted before the widget finished its check, or without a response token at all. The plugin shows this as: "Please complete the captcha challenge." — its message for a missing or empty response.

**Solution:**

1. Ask the visitor to wait for the widget to finish loading before submitting the form.
2. If this happens consistently for every visitor, confirm JavaScript isn't being blocked or stripped by a caching or minification plugin on your site.
3. Confirm your **Site Key** is correct and belongs to the domain the form is running on.

### Errors mentioning the secret key

**Cause:** The **Secret Key** field in the plugin settings is missing or incorrect. The plugin shows one of two messages depending on the problem: "The Turnstile secret key is missing. Please check your captcha plugin settings." or "The Turnstile secret key is invalid. Please check your captcha plugin settings."

**Solution:**

1. Go to **System** -> **Manage** -> **Plugins** -> **Captcha - Cloudflare Turnstile**.
2. Re-copy the **Secret Key** from your Cloudflare Turnstile widget and paste it into the **Secret Key** field, taking care not to include extra spaces.
3. Save the plugin and try submitting the form again.

### "The captcha response has expired or has already been used"

**Cause:** The visitor took too long to submit the form after completing the challenge, or the same response was submitted twice — Turnstile tokens are single-use only. The plugin shows this as: "The captcha response has expired or has already been used. Please try again."

**Solution:**

1. Ask the visitor to reload the page and submit the form again promptly after completing it.
2. If this happens often, it may mean visitors are leaving the form open for a long time before submitting — this is expected behavior for Turnstile and isn't something to "fix" beyond informing visitors to submit promptly.

### The site is behind a proxy or CDN and Turnstile seems less accurate than expected

**Cause:** The plugin sends Cloudflare the visitor's IP address as part of verification. If Joomla isn't correctly told about a proxy or CDN in front of it, it may report the proxy's IP instead of the real visitor's IP. This doesn't cause verification to fail outright, but it can affect how confidently Cloudflare can vouch for the request.

**Solution:**

1. Go to **System** -> **Global Configuration** -> **Server** tab and make sure the "behind a load balancer" / proxy setting reflects your actual hosting setup, including the trusted proxy IP ranges if your host requires them.
2. If you're unsure whether your host sits behind a proxy or CDN, check with your hosting provider.

### Visitors with JavaScript disabled cannot get past the form

**Cause:** Turnstile is a JavaScript-based widget. When JavaScript is disabled or blocked, the widget cannot render or run its check at all.

**Solution:**

1. This is expected — Turnstile, like nearly all modern captchas, requires JavaScript to function. Visitors with JavaScript disabled will see the message "Please enable JavaScript to complete the captcha challenge." and will need to enable JavaScript to submit the protected form.
2. If you expect meaningful traffic from visitors who browse with JavaScript disabled, keep this limitation in mind when deciding whether to make Turnstile your default captcha.
