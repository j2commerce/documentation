---
title: "Address Autocomplete"
sidebar_label: "Address Autocomplete"
sidebar_position: 10
description: "Enable Google Places address autocomplete on your checkout forms to speed up customer checkout and reduce typing errors."
---

# Address Autocomplete

The Address Autocomplete app adds Google Places-powered address suggestions to your J2Commerce checkout. As customers type their address, they see matching suggestions from Google's address database. Selecting an address automatically fills in all the address fields, including city, state/province, and postal code.

This improves the checkout experience by reducing typing effort and minimizing address entry errors that can lead to shipping problems.

## Prerequisites

- J2Commerce 6 installed and enabled
- A Google Cloud Platform account with the Places API (New) enabled
- A Google Maps Platform API key with the Places API enabled

## Step 1: Get a Google Maps API Key

Before configuring the plugin, you need a Google Maps Platform API key with access to the Places API (New).

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services** -> **Library**.
4. Search for **Places API (New)** and enable it.
5. Go to **APIs & Services** -> **Credentials**.
6. Click **Create Credentials** -> **API Key**.
7. Copy the generated API key.

### Secure Your API Key

For production use, restrict your API key to prevent unauthorized use:

1. In the Credentials page, click the pencil icon next to your API key.
2. Under **Application restrictions**, select **HTTP referrers**.
3. Add your domain(s) in the format:
   - `https://yoursite.com/*`
   - `https://*.yoursite.com/*`
4. Under **API restrictions**, select **Restrict key** and choose **Places API (New)**.
5. Click **Save**.

<!-- SCREENSHOT: Google Cloud Console Credentials page showing API key restrictions configuration -->

## Step 2: Install the Plugin

The Address Autocomplete plugin is installed like any other Joomla plugin.

1. Go to **System** -> **Install** -> **Extensions**.
2. Upload the plugin ZIP file or use the Install from URL option.
3. After installation, go to **System** -> **Manage** -> **Plugins**.
4. Search for **Address Autocomplete**.
5. Enable the plugin by clicking the status icon.

## Step 3: Configure the Plugin

1. In the Joomla Administrator, go to **J2Commerce** -> **Apps**.

<!-- SCREENSHOT: J2Commerce Apps list showing Address Autocomplete plugin -->

2. Click on **Address Autocomplete** to open the configuration.
3. Enter your Google API key in the **Google API Key** field.

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Google API Key** | Your Google Maps Platform API key. This is required for the autocomplete to function. Leave empty to disable the feature. | (empty) |
| **Enable on Billing Address** | Show autocomplete suggestions on the billing address form during checkout. | Yes |
| **Enable on Shipping Address** | Show autocomplete suggestions on the shipping address form. | Yes |
| **Enable on Guest Checkout** | Show autocomplete suggestions for guest checkout customers. | Yes |

### Advanced Settings

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Restrict to Countries** | Limit address suggestions to specific countries. Enter comma-separated ISO 3166-1 alpha-2 country codes (e.g., `US,CA,GB`). Leave empty for all countries. | (empty) | N/A |
| **Address Types** | Types of addresses to include in suggestions. Select multiple types using Ctrl/Cmd+Click. | `street_address`, `premise` | `street_address`, `premise`, `subpremise`, `route` |
| **Minimum Characters** | Number of characters the customer must type before suggestions appear. Lower values show more results but may increase API costs. | 3 | 1-10 |
| **Autocomplete Style** | Visual style for the suggestions dropdown. | Default | Default, Compact, Full Width |
| **Suppress Browser Autofill** | Attempt to prevent the browser's built-in address autofill from interfering with the Google autocomplete. Recommended: Yes. | Yes | Yes, No |
| **Debug Mode** | Log debug information to the browser console. Useful for troubleshooting. Disable in production. | No | Yes, No |

4. Click **Save** or **Save & Close**.

<!-- SCREENSHOT: Address Autocomplete plugin configuration screen showing both Basic and Advanced settings tabs -->

## How It Works

When a customer types in the **Address Line 1** field during checkout:

1. After typing the minimum number of characters (default: 3), Google's Places API returns matching address suggestions.
2. The customer sees a dropdown with address suggestions, each showing the main address text and secondary information (city, region).
3. The customer can use keyboard navigation (arrow keys + Enter) or mouse to select an address.
4. Upon selection, the plugin:
   - Populates **Address Line 1** with the street number and route.
   - Populates **Address Line 2** with premise or subpremise information (apartment, unit, etc.).
   - Fills in **City**, **Postal Code**.
   - Sets the **Country** dropdown and triggers the zone/state dropdown to load.
   - Automatically selects the correct **State/Province/Region** from the dropdown.

<!-- SCREENSHOT: Checkout page showing address autocomplete dropdown with suggestions -->

## Country Restrictions

Limiting suggestions to specific countries reduces API costs and improves relevance for stores that only ship to certain regions.

Enter country codes separated by commas:

- `US` - United States only
- `US,CA` - United States and Canada
- `GB,IE,FR,DE` - United Kingdom, Ireland, France, Germany

Use ISO 3166-1 alpha-2 country codes (two-letter codes).

## Address Type Filtering

The Address Types setting controls what kinds of places appear in suggestions:

| Type | Description |
|------|-------------|
| **street_address** | Street addresses (e.g., "123 Main Street") |
| **premise** | Named locations, buildings (e.g., "Empire State Building") |
| **subpremise** | Sub-units within a building (e.g., "Apt 4B", "Suite 100") |
| **route** | Street names without numbers (e.g., "Main Street") |

For most stores, the default (`street_address` and `premise`) provides the best results.

## Browser Autofill Conflicts

Modern browsers have built-in address autofill that can conflict with Google's autocomplete. When both features are active, the browser's autofill dropdown may cover the Google suggestions.

The plugin includes a **Suppress Browser Autofill** option that attempts to prevent this by:

1. Setting `autocomplete="one-time-code"` on address fields (a workaround that disables browser autofill).
2. Using a MutationObserver to apply this to dynamically added fields (such as when a customer clicks "New Address" during checkout).

If you experience conflicts, try different combinations:

- **Suppress Autofill: Yes** - Attempts to disable browser autofill (recommended).
- **Suppress Autofill: No** - Allows browser autofill; may cause overlap with Google suggestions.

## API Costs and Billing

Google Places API (New) uses a pay-per-request model. Each keystroke that triggers a suggestion request counts as an autocomplete request. Each address selection that fetches full details counts as a Place Details request.

### Cost Management Tips

1. **Set a higher minimum character count** (e.g., 4 or 5) to reduce API calls during typing.
2. **Restrict countries** to only those you ship to, reducing the number of returned suggestions.
3. **Set API quotas** in Google Cloud Console to prevent unexpected charges.
4. **Monitor usage** in Google Cloud Console under **Billing** -> **Reports**.

Google offers a monthly free tier. Check the [Google Maps Platform pricing page](https://mapsplatform.google.com/pricing/) for current rates and free tier limits.

## Debug Mode

When troubleshooting, enable **Debug Mode** to see detailed logging in the browser's developer console:

1. Open your browser's Developer Tools (F12 or right-click -> Inspect).
2. Go to the **Console** tab.
3. Type in an address field during checkout.
4. Look for messages starting with `[AddressAutocomplete]`.

Debug mode shows:
- API requests and responses
- Place details returned by Google
- Field population events
- Country/zone lookup results

Disable Debug Mode in production to avoid exposing API details to customers.

## Tips

- Test the autocomplete on your live checkout page after configuration. Some browsers behave differently with autofill on HTTPS vs. HTTP.
- If suggestions do not appear, verify your API key has no domain restrictions blocking your site, or that you have not exceeded your Google Cloud quota.
- For stores shipping internationally, leave **Restrict to Countries** empty and let customers select their country from the dropdown. The autocomplete will adapt to the selected country.

## Troubleshooting

### No Suggestions Appear

**Cause:** API key is missing, invalid, or restricted incorrectly.

**Solution:**

1. Verify the API key is entered correctly in the plugin configuration.
2. Check that **Places API (New)** is enabled in Google Cloud Console (not the legacy Places API).
3. Ensure your API key has no HTTP referrer restrictions blocking your domain.
4. Enable Debug Mode and check the browser console for error messages.
5. Confirm you have not exceeded your Google Cloud API quota.

### Suggestions Appear But Do Not Fill the Form

**Cause:** JavaScript error or DOM structure mismatch.

**Solution:**

1. Enable Debug Mode and check the browser console for errors.
2. Verify your checkout template uses standard J2Commerce field names (`address_1`, `address_2`, `city`, `zip`, `country_id`, `zone_id`).
3. If using a heavily customized template, the field selectors may need adjustment. Contact your template developer.

### State/Province Not Populated Correctly

**Cause:** The Google-provided state name does not match the zone name in J2Commerce.

**Solution:**

The plugin uses a three-tier matching system:

1. **Exact match** - Compares the Google state name to J2Commerce zone names.
2. **Code match** - Compares the Google state abbreviation to zone codes (e.g., "CA" matches California).
3. **Partial match** - Uses LIKE comparison for close matches.

If all three fail, the country is set but the state field remains empty. Ensure your J2Commerce zones are properly configured:

1. Go to **J2Commerce** -> **Configuration** -> **Zones**.
2. Verify zone names and codes match the expected values for your shipping countries.

### Browser Autofill Covers the Suggestions

**Cause:** Browser autofill is enabled and conflicting with the plugin.

**Solution:**

1. Ensure **Suppress Browser Autofill** is set to **Yes**.
2. Test in a different browser to confirm the issue is browser-specific.
3. Some browsers (especially Chrome) aggressively autofill addresses. Try adding `autocomplete="off"` directly to your template's address fields if the plugin's suppression is insufficient.

### API Quota Exceeded

**Cause:** Your Google Cloud Platform account has exceeded its free tier or set budget.

**Solution:**

1. Check your Google Cloud Console for quota status.
2. Increase your budget or enable billing if on the free tier.
3. Consider setting request quotas in the Google Cloud Console to prevent unexpected costs.

### Debug Mode Shows API Errors

**Cause:** Various API-level issues.

**Solution:**

Common API error messages and their meanings:

| Error | Cause | Solution |
|-------|-------|----------|
| `REQUEST_DENIED` | API key invalid or missing permissions | Verify API key and Places API (New) is enabled |
| `OVER_QUERY_LIMIT` | Quota exceeded | Check Google Cloud billing and quotas |
| `INVALID_REQUEST` | Malformed request | Check country codes format (should be two letters) |
| `ZERO_RESULTS` | No matches found | Normal; no action needed |

## Related Topics

- [Checkout Configuration](../checkout/index.md) - Configure checkout flow and address fields
- [Countries and Zones](../configuration/countries-zones.md) - Manage country and state/province data
- [REST API](./rest-api.md) - API access for external integrations