# REST API

## Overview

J2Commerce includes a built-in REST API that lets external applications communicate with your store. Powered by Joomla's Web Services framework, the API follows the **JSON:API specification** and uses **Bearer Token authentication** to keep your data secure.

With the API, you can programmatically manage products, orders, customers, inventory, coupons, vouchers, reports, and more -- all through standard HTTP requests. This opens the door to integrations with warehouse systems, accounting software, mobile apps, AI assistants, and custom dashboards.

The API provides over 40 endpoints organized into logical groups: catalog data, order management, customer records, tax and shipping configuration, and reporting.

---

## Who Is This For?

- **Store owners** who want to connect J2Commerce to third-party services (shipping providers, accounting tools, inventory systems).
- **Administrators** who need to automate store management tasks or build custom reporting dashboards.
- **Developers** building mobile apps, headless storefronts, or custom integrations on top of J2Commerce.

You do not need to be a programmer to enable the API and generate a token. However, actually calling the API endpoints requires basic familiarity with HTTP requests (using tools like curl, Postman, or a programming language).

---

## Requirements

- **J2Commerce 6** installed and activated.
- **Joomla 5.2+** (or Joomla 6).
- A **Super User** account, or a user account with J2Commerce administrator permissions.
- **HTTPS** enabled on your site (strongly recommended for security).

---

## Step 1: Enable the Web Services Plugin

The API is delivered as a Joomla plugin that registers all J2Commerce endpoints. It must be enabled before any API calls will work.

1. In the Joomla Administrator, go to **System > Manage > Plugins**.
2. In the search box, type **j2commerce** (or **Web Services**).
3. Find the plugin named **Web Services - J2Commerce** in the results list.
4. If its **Status** column shows a red circle (disabled), click the circle to enable it. Alternatively, click the plugin name to open it, set **Status** to **Enabled**, and click **Save & Close**.

Once enabled, J2Commerce API endpoints become available at your site's API URL.

> **Screenshot suggestion:**
> Capture the Plugins list filtered by "j2commerce", showing the Web Services - J2Commerce plugin with its Status column. Show both the search filter and the plugin entry.

---

## Step 2: Enable the API Authentication Plugin

Joomla uses a separate plugin to handle API token authentication. This plugin is usually enabled by default, but it is worth confirming.

1. Go to **System > Manage > Plugins**.
2. Search for **API Authentication - Token**.
3. Make sure its Status is **Enabled**. If not, enable it the same way as above.

Without this plugin, all API requests will return a **401 Unauthorized** error.

---

## Step 3: Generate an API Token

Each user who needs API access must have their own token. The token acts as a password -- anyone who has it can make API calls with that user's permissions.

1. Go to **Users > Manage**.
2. Click on the user who will access the API (typically a Super User or an administrator).
3. Click the **Joomla API Token** tab.
4. Click the **Generate** button to create a new token.
5. **Copy the token immediately** and store it in a secure location (a password manager, for example). The token is displayed only once. If you lose it, you will need to generate a new one.
6. Click **Save & Close**.

**Important:** Treat this token like a password. Anyone with the token can access your store data through the API. If you suspect a token has been compromised, generate a new one immediately -- this invalidates the old token.

> **Screenshot suggestion:**
> Capture the User edit screen with the Joomla API Token tab selected. Show the Generate button and the area where the token appears. If possible, blur or redact the actual token value in the screenshot.

---

## Step 4: Test Your API Connection

Before building any integration, verify that the API is working. You can test it with **curl** (a command-line tool available on macOS, Linux, and Windows), or with a graphical tool like **Postman**.

### Using curl

Open a terminal and run:

```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
     -H "Accept: application/vnd.api+json" \
     https://yoursite.com/api/index.php/v1/j2commerce/products
```

Replace:
- `YOUR_API_TOKEN` with the token you copied in Step 3.
- `yoursite.com` with your actual domain name.

If everything is configured correctly, you will receive a JSON response containing your product data (or an empty `data` array if you have no products yet).

### Using Postman

1. Create a new GET request.
2. Set the URL to `https://yoursite.com/api/index.php/v1/j2commerce/products`.
3. Under the **Authorization** tab, select **Bearer Token** and paste your token.
4. Under the **Headers** tab, add: `Accept` = `application/vnd.api+json`.
5. Click **Send**.

### Understanding the Response

The API returns data in **JSON:API format**. A successful response looks like this:

```json
{
  "links": {
    "self": "https://yoursite.com/api/index.php/v1/j2commerce/products"
  },
  "data": [
    {
      "type": "products",
      "id": "42",
      "attributes": {
        "product_name": "Classic T-Shirt",
        "sku": "TSH-001",
        "price": "29.99",
        "enabled": 1
      }
    }
  ],
  "meta": {
    "total-pages": 1
  }
}
```

The `data` array contains your records. Each record has a `type`, `id`, and `attributes` object.

---

## Available API Endpoints

All endpoints are accessed through your site's API base URL:

```
https://yoursite.com/api/index.php/v1/j2commerce/
```

### Standard Endpoints

These endpoints support the full set of CRUD operations: **GET** (list all), **GET/{id}** (single record), **POST** (create), **PATCH/{id}** (update), and **DELETE/{id}** (delete).

| Endpoint | Description |
|---|---|
| `/v1/j2commerce/products` | Product catalog -- list, create, update, and delete products. |
| `/v1/j2commerce/orders` | Order management -- view and manage customer orders. |
| `/v1/j2commerce/customers` | Customer records -- manage customer accounts. |
| `/v1/j2commerce/inventory` | Stock levels -- view and update product inventory. |
| `/v1/j2commerce/coupons` | Discount coupons -- create and manage coupon codes. |
| `/v1/j2commerce/vouchers` | Gift vouchers -- create and manage gift certificates. |
| `/v1/j2commerce/manufacturers` | Brand and manufacturer data. |
| `/v1/j2commerce/currencies` | Currency settings and exchange rates. |
| `/v1/j2commerce/countries` | Country list for addressing. |
| `/v1/j2commerce/zones` | State, province, and region zones. |
| `/v1/j2commerce/shippingmethods` | Shipping method configuration. |
| `/v1/j2commerce/paymentmethods` | Payment method configuration. |
| `/v1/j2commerce/taxprofiles` | Tax profile definitions. |
| `/v1/j2commerce/taxrates` | Individual tax rate records. |
| `/v1/j2commerce/orderstatuses` | Order status definitions (e.g., Pending, Confirmed, Shipped). |

### Nested Endpoints

These endpoints return data related to a specific parent record. Replace `{id}` with the parent record's numeric ID.

| Endpoint | Method | Description |
|---|---|---|
| `/v1/j2commerce/orders/{id}/items` | GET | Line items (products) within a specific order. |
| `/v1/j2commerce/orders/{id}/history` | GET, POST | Status change history for an order. POST adds a new history entry. |
| `/v1/j2commerce/products/{id}/variants` | GET | Product variants (sizes, colors, etc.) for a specific product. |
| `/v1/j2commerce/customers/{id}/addresses` | GET | Saved addresses for a specific customer. |
| `/v1/j2commerce/customers/{id}/orders` | GET | All orders placed by a specific customer. |
| `/v1/j2commerce/countries/{id}/zones` | GET | Zones (states/provinces) within a specific country. |

### Report Endpoints

These are read-only endpoints (GET only) that return aggregated data.

| Endpoint | Description |
|---|---|
| `/v1/j2commerce/reports/sales` | Sales totals and trends. |
| `/v1/j2commerce/reports/products` | Product performance data. |
| `/v1/j2commerce/reports/customers` | Customer activity and spending data. |
| `/v1/j2commerce/reports/inventory` | Inventory level summaries. |

### Configuration Endpoint

| Endpoint | Method | Description |
|---|---|---|
| `/v1/j2commerce/config` | GET | Returns the current J2Commerce store configuration. |

---

## Filtering and Sorting

Several endpoints support query parameters for filtering and sorting results. Pass filters using the `filter` parameter and sorting using the `list` parameter.

### Product Filters

| Filter Parameter | Description | Example |
|---|---|---|
| `filter[search]` | Search by product name. | `?filter[search]=shirt` |
| `filter[sku]` | Search by exact SKU. | `?filter[sku]=TSH-001` |
| `filter[category]` | Filter by category ID. | `?filter[category]=5` |
| `filter[manufacturer]` | Filter by manufacturer ID. | `?filter[manufacturer]=3` |
| `filter[product_type]` | Filter by product type. | `?filter[product_type]=simple` |
| `filter[enabled]` | Filter by published status (1 = enabled, 0 = disabled). | `?filter[enabled]=1` |
| `filter[visibility]` | Filter by visibility setting. | `?filter[visibility]=1` |

### Order Filters

| Filter Parameter | Description | Example |
|---|---|---|
| `filter[search]` | Search by order number or customer name. | `?filter[search]=1042` |
| `filter[status]` | Filter by order status ID. | `?filter[status]=1` |
| `filter[customer_id]` | Filter by customer (Joomla user) ID. | `?filter[customer_id]=42` |
| `filter[date_from]` | Orders placed on or after this date. | `?filter[date_from]=2026-01-01` |
| `filter[date_to]` | Orders placed on or before this date. | `?filter[date_to]=2026-01-31` |
| `filter[payment_type]` | Filter by payment method type. | `?filter[payment_type]=stripe` |

### Report Filters

| Filter Parameter | Description | Example |
|---|---|---|
| `filter[date_from]` | Start date for the report period. | `?filter[date_from]=2026-01-01` |
| `filter[date_to]` | End date for the report period. | `?filter[date_to]=2026-01-31` |
| `filter[period]` | Grouping period (e.g., day, week, month). | `?filter[period]=month` |

### Sorting

Most list endpoints support sorting with:

| Parameter | Description | Example |
|---|---|---|
| `list[ordering]` | The field to sort by. | `?list[ordering]=product_name` |
| `list[direction]` | Sort direction: `asc` or `desc`. | `?list[direction]=desc` |

### Pagination

The API uses Joomla's standard pagination. Use:

| Parameter | Description | Example |
|---|---|---|
| `page[offset]` | Number of records to skip. | `?page[offset]=20` |
| `page[limit]` | Number of records to return (default is typically 20). | `?page[limit]=50` |

---

## Real-World Use Cases

### 1. Sync Inventory with a Warehouse System

Connect your warehouse management software (such as ShipStation or ShipBob) to J2Commerce. The `/v1/j2commerce/inventory` endpoint lets you pull current stock levels and push updates when shipments arrive, keeping your online store and warehouse in sync.

**Example:** Fetch current inventory levels:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Accept: application/vnd.api+json" \
     https://yoursite.com/api/index.php/v1/j2commerce/inventory
```

### 2. Build a Custom Dashboard

Create a real-time sales dashboard that pulls order totals, customer counts, and revenue data from the reports endpoints. Display it on a wall-mounted monitor or integrate with tools like Grafana or Google Data Studio.

**Example:** Fetch monthly sales data:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Accept: application/vnd.api+json" \
     "https://yoursite.com/api/index.php/v1/j2commerce/reports/sales?filter[date_from]=2026-01-01&filter[date_to]=2026-01-31&filter[period]=day"
```

### 3. Connect to Accounting Software

Automatically push completed orders to QuickBooks, Xero, or FreshBooks. The orders endpoint provides all financial data needed for bookkeeping -- totals, taxes, shipping costs, discounts, and payment method details.

**Example:** Fetch orders from last month:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Accept: application/vnd.api+json" \
     "https://yoursite.com/api/index.php/v1/j2commerce/orders?filter[date_from]=2026-01-01&filter[date_to]=2026-01-31"
```

### 4. Power a Mobile App or Headless Storefront

Use the products and orders endpoints to build a React Native mobile app or a headless storefront using Next.js, Nuxt, or Astro. Your Joomla site becomes the commerce backend while the frontend lives elsewhere.

### 5. AI-Powered Store Management with MCP

Connect your J2Commerce store to AI assistants like Claude using the Model Context Protocol (MCP). The open-source [MCP4Joomla](https://github.com/nikosdion/joomla-mcp-php) server bridges your Joomla API with large language models, allowing you to manage products, orders, and customers using natural language.

For example, you could ask an AI assistant "Show me all orders from last week" or "Create a 20% off coupon for summer" -- and it would execute the right API calls automatically.

---

## Connecting via MCP4Joomla

[MCP4Joomla](https://github.com/nikosdion/joomla-mcp-php) is a free, open-source MCP server that connects AI tools directly to your Joomla site's API. It works with Claude Code, Claude Desktop, and other MCP-compatible clients.

**MCP** (Model Context Protocol) is a standard that lets AI assistants interact with external services through defined tool interfaces. Think of it as giving an AI assistant hands to operate your store.

### Setup

1. Install MCP4Joomla via source, PHAR, or Docker. See the [GitHub README](https://github.com/nikosdion/joomla-mcp-php) for detailed installation instructions.
2. Configure it with your site URL and API token. For example, with Claude Code:

```bash
claude mcp add mcp4joomla --transport stdio \
  -e JOOMLA_BASE_URL=https://yoursite.com \
  -e BEARER_TOKEN=your_api_token \
  -- /usr/bin/php /path/to/mcp4joomla.php server
```

3. Use the `--categories` flag to limit which tools the AI can access (e.g., `--categories=Content,Users`).
4. Use the `--non-destructive` flag for read-only access. This is a good starting point for testing, as it prevents the AI from creating, modifying, or deleting any data.

---

## Security Best Practices

| Practice | Why It Matters |
|---|---|
| **Use dedicated API users** | Create a separate Joomla user account for each integration. If one integration is compromised, revoke its token without affecting others. Never share your personal admin token. |
| **Limit permissions** | Give each API user only the permissions they need. A reporting dashboard only needs read access. A shipping integration only needs order data. Use Joomla's ACL (Access Control List) to restrict what each user can do. |
| **Always use HTTPS** | Bearer tokens sent over plain HTTP can be intercepted by anyone on the network. Always access the API over HTTPS. |
| **Rotate tokens regularly** | Regenerate API tokens periodically (e.g., every 90 days), and immediately when staff members leave or integrations are decommissioned. |
| **Monitor access** | Check your Joomla logs for unusual API activity -- unexpected endpoints being called, high request volumes, or requests from unfamiliar IP addresses. |
| **Never expose tokens in code** | Store API tokens in environment variables or secure configuration files, never in source code or version control. |

---

## Troubleshooting

### 401 Unauthorized

**Cause:** The API Authentication - Token plugin is not enabled, or the token is invalid.

**Resolution:**
1. Go to **System > Manage > Plugins** and search for **API Authentication - Token**. Make sure it is enabled.
2. Verify the token in your `Authorization: Bearer` header is correct and has not been regenerated since you last copied it.
3. Confirm the user account associated with the token is not blocked or disabled.

### 403 Forbidden

**Cause:** The authenticated user does not have permission to access the requested resource.

**Resolution:**
1. Check the user's group membership under **Users > Manage > [User] > Assigned User Groups**.
2. Verify the user group has the necessary J2Commerce permissions (view, create, edit, delete as needed).
3. For Super Users, 403 errors typically indicate a different issue -- check that the token belongs to the correct user.

### 404 Not Found

**Cause:** The Web Services - J2Commerce plugin is not enabled, the URL is incorrect, or the requested record does not exist.

**Resolution:**
1. Confirm the Web Services - J2Commerce plugin is enabled at **System > Manage > Plugins**.
2. Double-check the URL structure. The correct base path is `/api/index.php/v1/j2commerce/`.
3. If requesting a single record (e.g., `/products/42`), verify that the record with that ID exists.

### 406 Not Acceptable

**Cause:** The `Accept` header is missing or incorrect.

**Resolution:** Include the header `Accept: application/vnd.api+json` in every API request. This tells Joomla to return data in JSON:API format.

### Empty Response or Missing Data

**Cause:** Filters are too restrictive, or pagination is hiding results.

**Resolution:**
1. Try the request without any filters first to confirm data exists.
2. Check pagination -- use `?page[limit]=100` to increase the number of returned records.
3. Verify that the records you expect are published/enabled in the J2Commerce backend.

### CORS Errors (Browser-Based Requests)

**Cause:** Your browser is blocking cross-origin requests to the API.

**Resolution:** If you are calling the API from JavaScript running on a different domain, you need to configure CORS headers on your Joomla server. This is typically done in your `.htaccess` file or web server configuration. Add:

```
Header set Access-Control-Allow-Origin "https://your-frontend-domain.com"
Header set Access-Control-Allow-Headers "Authorization, Content-Type, Accept"
Header set Access-Control-Allow-Methods "GET, POST, PATCH, DELETE, OPTIONS"
```

Replace `your-frontend-domain.com` with the actual domain of your frontend application.

---

## FAQ

**Can I use the API without HTTPS?**
Technically yes, but it is strongly discouraged. Your API token would be transmitted in plain text over the network, making it easy to intercept. Always use HTTPS in production.

**Is there a rate limit?**
J2Commerce does not impose its own rate limit. However, your hosting provider may have request limits in place. For high-volume integrations, check with your host.

**Can I create orders through the API?**
Yes. The `/v1/j2commerce/orders` endpoint supports POST requests for creating orders. You will need to include the required order fields in the request body.

**Can I use the API with Joomla's built-in user groups and permissions?**
Yes. The API respects Joomla's ACL system. If a user does not have permission to edit products in the Joomla backend, they cannot edit products through the API either.

**What format should dates be in?**
Use ISO 8601 format: `YYYY-MM-DD` (e.g., `2026-01-15`). For date-time values, use `YYYY-MM-DDTHH:MM:SS` (e.g., `2026-01-15T14:30:00`).

**How do I update a single field on a record without sending all fields?**
Use the PATCH method. PATCH requests only update the fields you include in the request body. Fields you omit remain unchanged.

---

## Related Topics

- [Cron Tasks and Scheduled Maintenance](../configuration/cron-tasks.md) -- Set up automated store maintenance tasks.

---

## Screenshot Checklist

1. **Screenshot 1 -- Enabling the Web Services Plugin**
   - **Location:** System > Manage > Plugins, filtered by "j2commerce".
   - **What to show:** The Plugins list with the "Web Services - J2Commerce" entry visible. The Status column and plugin name should be clearly readable.
   - **Purpose:** Helps users locate and enable the API plugin.

2. **Screenshot 2 -- Enabling the API Authentication Plugin**
   - **Location:** System > Manage > Plugins, filtered by "API Authentication".
   - **What to show:** The "API Authentication - Token" plugin entry with its Status column.
   - **Purpose:** Confirms the required authentication plugin is enabled.

3. **Screenshot 3 -- Generating an API Token**
   - **Location:** Users > Manage > [User] > Joomla API Token tab.
   - **What to show:** The Joomla API Token tab with the Generate button visible. If a token has been generated, show the token field (with the value blurred or redacted for security).
   - **Purpose:** Walks users through token generation, the most critical setup step.

4. **Screenshot 4 -- Successful API Response in Postman**
   - **Location:** Postman application (or similar HTTP client).
   - **What to show:** A GET request to `/v1/j2commerce/products` with the Authorization header configured, and a successful JSON response visible in the response pane.
   - **Purpose:** Gives users a visual confirmation of what a working API call looks like.

5. **Screenshot 5 -- Successful curl Response in Terminal**
   - **Location:** Terminal or command prompt.
   - **What to show:** The curl command and the JSON response output.
   - **Purpose:** Alternative verification method for users who prefer command-line tools.

6. **Screenshot 6 -- User Permissions for API Access**
   - **Location:** Users > Manage > [User] > Assigned User Groups tab, or the J2Commerce component permissions screen.
   - **What to show:** The user group assignments and relevant permission settings.
   - **Purpose:** Helps administrators configure least-privilege access for API users.
