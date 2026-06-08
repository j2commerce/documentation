# Social Media Sharing

The Social Media Sharing app adds share buttons directly to your product pages so customers can share products on Facebook, X (Twitter), Pinterest, LinkedIn, WhatsApp, Reddit, Threads, TikTok, Instagram, YouTube, and more — with a single click. The app also automatically injects Open Graph and Twitter Card meta tags into each product page, so shared links display a rich preview card (product image, name, price, and availability) on every major platform. You choose which networks appear, where the buttons sit on the page, and how they look — using icon fonts, brand colors, or your own custom images.

## Requirements

- Joomla 6.0 or later
- J2Commerce 6.0 or later
- PHP 8.3 or later
- At least one product created in J2Commerce

## Purchase and Download

**Step 1:** Go to the [J2Commerce website](https://www.j2commerce.com/) -> **Apps**

**Step 2:** Locate **Social Media Sharing** -> click **View Details** -> **Add to Cart** -> **Checkout**

**Step 3:** After purchase, open your account and go to **My Downloads**. Find **Social Media Sharing**, click **Available Versions** -> **View Files** -> **Download Now** to get the `app_socialmedia.zip` file.

## Install the App

In the Joomla Administrator, go to **System** **->** **Install** **->** **Extensions**.

Upload the `app_socialmedia.zip` ZIP file or use the Install from URL option.

![](/img/install.webp)

## Enable the App

Once you have installed the App, you will need to enable it. There are **two** ways you can access the App.&#x20;

**Option A:** Go to the **J2Commerce** icon at the top right corner **-> Apps**

**Option B:** Go to **Components** on the left sidebar **-> J2Commerce -> Apps**

![](/img/gift-wrap-apps.webp)

To help you narrow down the list, you can do a search for **Social Media Sharing**, click the **X,** and it will turn into a green checkmark. It is now enabled and ready for setup.

![](/img/social-media-enable.webp)

## Configure the App

:::tip

Click the **Toggle Inline Help** button in the toolbar and the app will show a description below each field as you configure it.

:::

![](/img/social-media-toggle.webp)

### Basic Tab

![](/img/social-media-basic.webp)

**Framework:** Choose **Bootstrap 5** if your site template is based on Bootstrap (the most common). Choose **UIkit** if your template is UIkit 3 based. This affects button layout and icon rendering.

The **Framework** is a single setting that controls which CSS framework the share buttons use for layout and styling.

:::info

If you are unsure which framework your template uses, leave this set to **Bootstrap 5**. Most Joomla 6 templates use Bootstrap 5.

:::

**Show Label:** Show a text heading above the social icons (for example: "Share This Product").

**Icons Label:** The heading text shown above the icon row when **Show Label** is enabled. You can type plain text or enter a Joomla language key.

**Icon Justification:** Horizontal alignment of the icon row: **Start** (left), **Center**, or **End** (right).

**Social Share Product Image:** Which product image to use for Open Graph tags and the Pinterest share URL. **Main Image** uses the primary product image; **Thumbnail Image** uses the thumbnail.

**Image Width (px):** Width in pixels for buttons using custom uploaded images (Image mode). Icon-mode buttons are not affected.

**Share Message:** The opening text prepended to the product name in the share link. The product name is always appended automatically.

**Include Price in Message:** When set to **Yes**, the formatted product price is appended to the share message in parentheses: for example, "Check this out! Blue Widget (€29.99)".

**Debug Mode:** Writes diagnostic log entries to `administrator/logs/plg_j2commerce_app_socialmedia.php`. Only enable this when troubleshooting. Disable on a live site.

### Social Networks Tab

The **Social Networks** tab is where you control which social channels appear, in what order, and how each one looks. It has two parts: a **Display Location** selector and the **Networks** manager.

![](/img/social-media-display.webp)

The **Display Location** setting controls exactly where the sharing buttons appear relative to the product. The available positions are:

**Before Title:** Above the product title (fires on J2Commerce product pages and Joomla article pages via `onJ2CommerceBeforeProductTitle`)

**After Title:** Below the product title on Joomla article pages (`onContentAfterTitle`)

**After Add to Cart Button:** Directly below the Add to Cart button — the default position and works for most stores

**Before Add to Cart Button:** Directly above the Add to Cart button

**Before Product Content:** Above the product description text

**After Product Gallery:** Below the product image gallery

:::tip

For most stores the default position — **After Add to Cart Button** — works best. It places the share buttons in a natural location after the primary call to action. If you are using Joomla articles to display your products rather than J2Commerce's native product templates, choose **After Title**.

:::

#### Networks Manager

![](/img/social-media-networks.webp)

The Networks manager shows all available social channels in a drag-and-drop list. Each row has:

- A toggle switch to **enable or disable** that network
- The network **name** and **icon preview**
- An **expand arrow** (chevron) to open per-network advanced settings

To change which networks appear, click the toggle switch on any row. To reorder the buttons, drag rows up or down by their drag handle. The order here matches the order on your product pages.

#### Per-Network Advanced Settings

Click the expand arrow on any network row to open its advanced settings. The available options differ by network.

![](/img/social-media-socials.webp)

**All networks share these settings:**

**Display Mode:**

- **Icon** renders a CSS icon class (default).&#x20;

- **Image** renders a custom uploaded image file.

**Icon Class:** The CSS class string for the icon — for example, `fa-brands fa-facebook-f`. Works with any icon library your template loads (Font Awesome, Bootstrap Icons, UIkit, etc.).

**Custom Image:** A file path to a custom button image. Only used when **Display Mode** is set to **Image**.

**Link Target:** Whether clicking opens in a **New Window** (default) or the **Same Window**.

**Rel Attribute:** The `rel` attribute on the share link. Default: `noopener`.

**Channel URL:** Advanced: override the share URL template entirely with your own URL. Supports `[url]`, `[text]`, `[title]`, and `[media]` placeholders.

**Facebook-specific advanced settings:**

![](/img/social-media-facebook1.webp)

**Facebook App ID:** Your Facebook App ID from the Meta developer portal. Adds the `fb:app_id` Open Graph meta tag, which enables Facebook Insights for shared links and improves link tracking.

**X (Twitter)-specific advanced settings:**

![](/img/social-media-twitter.webp)

**Twitter Handle:** Enter your Twitter handle. ie; @ballsychocolates

**Twitter Card Type: Summary** shows a small square thumbnail. **Summary Large Image** shows a wide hero image — recommended for stores with high-quality product photography.

**Website Twitter Account:** Your site's @username (without the @ symbol). Used for the `twitter:site` meta tag.

**Personal Twitter Account:** Your personal @username (without the @ symbol). Used for the `twitter:creator` meta tag.

**Include Twitter Meta Tags:** Inject Twitter Card meta tags into the product page head. Can be enabled even if the Twitter share button is disabled — useful for rich link previews without showing a button.

**Twitter Image Width:** Width in pixels for the `twitter:image:width` meta tag.

**Twitter Description Limit:** Maximum number of characters from the product short description to include in `twitter:description`. The plugin trims at a word boundary.

## Open Graph and Twitter Card Meta Tags

When a customer pastes a product link into Facebook, WhatsApp, or another chat — or shares it on social media — the platform reads special meta tags in the page source to build a rich preview showing the product image, name, price, and description instead of a bare URL. This app injects those tags automatically.

### What gets injected on product detail pages

**When Facebook is enabled** (by toggling Facebook on in the Networks tab):

- `og:type` = `product`
- `og:title` = product name
- `og:image` = product image (absolute URL)
- `og:description` = product short description (up to 200 characters)
- `og:url`, `og:locale`, `og:site_name`
- `fb:app_id` (if a Facebook App ID is entered in the Facebook advanced settings)
- Full Facebook Product Graph tags: `product:price:amount`, `product:price:currency`, `product:availability` (in stock / out of stock), `product:brand`, `product:category`, `product:retailer_item_id`, `product:upc`, `product:weight:value`, `product:original_price:amount`, `product:sale_price:amount`

**When Twitter meta tags are enabled** (in the X (Twitter) advanced settings):

- `twitter:card` — `summary` or `summary_large_image`
- `twitter:title` — product name plus formatted price
- `twitter:image`, `twitter:image:width`
- `twitter:description` — truncated product short description
- `twitter:site`, `twitter:creator`

### What gets injected on product list / category pages

When Facebook is enabled, the app also injects a simplified Open Graph set on product listing pages:

- `og:type` = `product.group`
- `og:url`, `og:title`
- `og:image` — the first product image found in the list
- `fb:app_id` (if configured)

### How to test your meta tags

After saving settings with Facebook enabled, visit a product page on your site and verify the tags are working:

- **Facebook Sharing Debugger** — [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/) — paste a product URL to see the exact Open Graph tags Facebook reads and the preview it generates. Click **Scrape Again** to refresh a cached result.
- **Twitter Card Validator** — [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) — paste a product URL to preview the Twitter Card.
- **Browser source** — Right-click any product page and choose **View Page Source**, then search for `og:title` or `twitter:card` to see the raw tags.

## Pinterest and Copy-Link Networks

### Pinterest

Pinterest requires a product image URL to create a pin. The Pinterest button is hidden automatically when no product image is available — no error is shown to the customer, the button simply does not render. The app checks for an image in this order:

1. The J2Commerce main image or thumbnail (depending on **Social Share Product Image** in the General tab)
2. The Joomla article intro image linked to the product
3. The Joomla article full-text image

To ensure the Pinterest button always appears, assign at least one image to every product in the J2Commerce product editor.

### TikTok, Instagram, and YouTube

These platforms do not offer a public web share intent URL. When enabled, these networks render as a **Copy Link** button instead of a direct share link. Clicking the button copies the product page URL to the customer's clipboard, which they can then paste into the platform's app.

## Adding Custom Channels

Click the **Add Custom Channel** button at the bottom of the Networks manager to create a network that is not in the built-in list. You can also add an **RSS** feed link or an **Email** share button using the dedicated quick-add buttons.

When setting up a custom channel, enter a custom share URL in the **Channel URL** field using these placeholders:

| Placeholder | Value                                     |
| ----------- | ----------------------------------------- |
| `[url]`     | The product page URL (URL-encoded)        |
| `[text]`    | The full share message text (URL-encoded) |
| `[title]`   | The bare product name (URL-encoded)       |
| `[media]`   | The product image URL (URL-encoded)       |

For example, a Telegram share link would be: `https://t.me/share/url?url=[url]&text=[text]`

## How It Works

When a customer views a product page:

1. J2Commerce checks whether the Social Media Sharing plugin is enabled.
2. The plugin checks whether the current page position matches the configured **Display Location**.
3. If the page passes those checks, the plugin loads the list of enabled networks and builds each share URL by substituting the current product URL, name, price, and image into the network's URL template.
4. The share buttons render using either the Bootstrap 5 or UIkit template depending on the **Framework** setting.
5. Clicking a standard share button opens the platform's share dialog in a new window.
6. Clicking a copy-link button (TikTok, Instagram, YouTube) copies the URL to the clipboard without leaving the page.
7. Open Graph and Twitter Card meta tags are injected into the page `<head>` server-side, independent of whether the share buttons are visible.

## Frontend Product View

![](/img/social-media-icons.webp)

## Tips

- **Enable Facebook for meta tags, not just share buttons** — Even if you do not want a Facebook button visible, enabling Facebook in the Networks tab adds full Open Graph tags to every product page. These tags improve how your products appear when shared anywhere — WhatsApp, LinkedIn, Slack, even email clients.
- **Use the After Add to Cart Button position first** — This is the most tested and most visible location. Only move buttons if a specific design layout requires it.
- **Test Pinterest on every product** — Because Pinterest silently hides when there is no image, it is easy to miss. Do a quick check on each product type in your catalog.
- **Custom channel URL placeholders use square brackets** — Enter `[url]`, `[text]`, `[title]`, and `[media]` as placeholders in the Channel URL field, not curly braces.
- **Debug Mode helps diagnose display issues** — Before reporting a problem, enable Debug Mode, reload a product page, and check `administrator/logs/plg_j2commerce_app_socialmedia.php` for clues.

## Troubleshooting

### Share buttons do not appear on any product page

**Cause:** The plugin is disabled, all networks are disabled, or the Display Location does not match the page being tested.

**Solution:**

1. Go to **J2Commerce** -> **Apps** and confirm **Social Media Sharing** shows a green checkmark. Click the status if it shows a red X.
2. Open the plugin settings and go to the **Social Networks** tab. Confirm that at least one network row has its toggle switch turned on.
3. Check the **Display Location** setting. If it is set to **After Add to Cart Button**, test on a product detail page (not a category listing). Share buttons only appear on the page type that matches the selected location.
4. Enable **Debug Mode** in the General tab, save, and reload a product page. Open `administrator/logs/plg_j2commerce_app_socialmedia.php` and look for `renderSocialButtons` entries to confirm whether the plugin is being called.

### The Pinterest button is missing but other buttons show

**Cause:** The product has no image assigned that the plugin can find.

**Solution:**

1. Go to **J2Commerce** -> **Catalog** -> **Products** and open the product.
2. Check the **Images** section of the product and confirm at least one image is assigned.
3. In the Social Networks tab of the app settings, check which image the plugin is configured to use (**Social Share Product Image** in the General tab). If set to **Thumbnail Image**, ensure a thumbnail is assigned.
4. Clear the Joomla cache: **Home Dashboard** -> **Cache** -> **Delete All**.

![](/img/social-media-pinterest.webp)

### Open Graph meta tags do not appear in the page source

**Cause:** Facebook is not enabled in the Networks tab, or the product page is being viewed by a cached version without the tags.

**Solution:**

1. Go to the **Social Networks** tab and confirm the **Facebook** row toggle is switched on.
2. Visit a product detail page on your site, right-click, and choose **View Page Source**. Search for `og:title`. If it appears, the tags are working.
3. If testing with the Facebook Sharing Debugger and seeing old results, click **Scrape Again** to force Facebook to re-read the page.
4. Clear the Joomla cache if you recently enabled Facebook: **Home Dashboard** -> **Cache** -> **Delete All**.

### Icon classes are not rendering visually

**Cause:** The default icon classes use Font Awesome syntax. If your template does not load Font Awesome, the icon `<span>` elements exist in the HTML but appear invisible.

**Solution:**

1. Check whether your template or a system plugin loads Font Awesome. Many Joomla 6 templates include it.
2. If Font Awesome is not available, expand the advanced settings for each network and update the **Icon Class** field to use your template's icon library (for example, Bootstrap Icons uses `bi bi-facebook`).
3. Alternatively, switch the **Display Mode** for each network to **Image** and upload your own button images.

### The share message contains the wrong text or is missing the price

**Cause:** The **Share Message** or **Include Price in Message** settings are not configured as expected.

**Solution:**

1. Open the plugin settings and go to the **General** tab.
2. Check the **Share Message** field. This is the opening text that appears before the product name.
3. Verify **Include Price in Message** is set to **Yes** if you want the price appended.
4. Save the settings, clear the cache, and click a share button to open the share dialog — the pre-filled message should reflect the new settings.
