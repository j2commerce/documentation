---
title: "J2Commerce MCP Server"
sidebar_label: "MCP Server"
sidebar_position: 10
description: "Connect AI assistants like Claude, Cursor, and Windsurf to your J2Commerce store using the Model Context Protocol (MCP)."
---

# J2Commerce MCP Server

The J2Commerce MCP Server plugin connects AI coding tools directly to your store's data. After a one-time configuration step, assistants like Claude Code, Claude Desktop, Cursor, and Windsurf can query your products, pull order details, review customer records, and run sales reports — no copy-pasting required.

It does this by implementing the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), an open standard for connecting AI tools to external data sources. Think of it as giving the AI a direct line to your store's database rather than asking it to guess from screenshots or exports.

## What This Plugin Is

This plugin is a **separate add-on** available from the [J2Commerce Extensions Store](https://www.j2commerce.com). It is not included with the core J2Commerce 6 component.

<!-- SCREENSHOT: J2Commerce Extensions Store page showing the MCP Server plugin listing -->

## Prerequisites

- J2Commerce 6 installed and configured
- Joomla 6 with the J2Commerce component active
- PHP 8.3 or later
- At least one AI tool that supports MCP (Claude Code, Claude Desktop, Cursor, Windsurf, or similar)

---

## Installation

1. Purchase and download the `j2commercemcp.zip` package from the J2Commerce website.
2. Go to **System** -> **Install** -> **Extensions**.
3. Upload the `j2commercemcp.zip` package file.
4. The plugin installs automatically.

<!-- SCREENSHOT: Joomla Extension Manager showing successful installation of J2Commerce MCP Server -->

After installation, enable the plugin:

1. Go to **System** -> **Manage** -> **Extensions**.
2. Search for **J2Commerce MCP Server**.
3. Click the status toggle to enable it.

<!-- SCREENSHOT: Extensions list with J2Commerce MCP Server plugin enabled -->

---

## Configuration

Go to **System** -> **Manage** -> **Extensions**, search for **J2Commerce MCP Server**, and click its name to open the plugin settings.

<!-- SCREENSHOT: J2Commerce MCP Server plugin settings page in the Joomla admin -->

### General Settings

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Enabled Tool Groups** | Choose which categories of tools the AI can access | All groups enabled | Products, Orders, Customers, Analytics, Coupons, Shipping & Payment |
| **Enable Write Operations** | Allow the AI to modify store data (stock, order status, etc.) | No | Yes / No |
| **Rate Limit (requests/hour)** | Maximum MCP requests per client per hour | `100` | 10–1000 |
| **Audit Log Retention (days)** | How long to keep MCP access logs | `30` | 1–365 |
| **Allowed Transports** | Which connection methods are enabled | HTTP and STDIO | HTTP (via com_ajax), STDIO (CLI) |
| **Debug Mode** | Write detailed logs to the Joomla log system | No | Yes / No |

### Transport Methods

The plugin supports two ways for an AI tool to connect to your store:

**HTTP transport** — The AI sends JSON-RPC requests to your Joomla site over HTTP. This works for cloud-hosted AI tools and any tool that can make HTTP requests. The endpoint is:

```
https://your-site.com/index.php?option=com_ajax&plugin=j2commercemcp&format=raw
```

**STDIO transport** — The AI runs a PHP CLI script on the same server as your Joomla installation. This is used by local AI tools like Claude Desktop, Cursor, and Windsurf when they run on the same machine. The script is located at:

```
plugins/system/j2commercemcp/cli/j2commercemcp.php
```

### Write Operations

**Enable Write Operations** is off by default, and that is a good starting point. With it disabled the AI can read anything but cannot change a thing. Turn it on only when you specifically need an AI tool to handle tasks like adjusting stock quantities, updating an order status, or deactivating a coupon. Getting comfortable with read-only access first makes it easier to spot anything unexpected before writes are in the picture.

---

## Available Tools

Tools are organized into six groups. Enable or disable each group from the plugin settings.

### Products

| Tool | What It Does |
|------|-------------|
| `j2c_list_products` | List products with optional filters for category, price range, stock status, or search term |
| `j2c_get_product` | Get full product details including variants, pricing, stock, and attributes |

**Example use:** "Show me all products under $50 that are in stock" or "What are the variants for product ID 42?"

### Orders

| Tool | What It Does |
|------|-------------|
| `j2c_get_orders` | List orders filtered by status, date range, customer, or order total |
| `j2c_get_order` | Get complete order details including line items, shipping, payment, and history |

**Example use:** "Show me all orders from last week over $100" or "What is the status of order 1234?"

### Customers

| Tool | What It Does |
|------|-------------|
| `j2c_get_customers` | List customers filtered by registration date, order count, or country |
| `j2c_get_customer` | Get a customer's profile, address book, order count, and total spent |

**Example use:** "List customers from the UK who have placed more than 3 orders."

### Analytics

| Tool | What It Does |
|------|-------------|
| `j2c_get_store_stats` | Return total revenue, order count, and average order value for a date range |
| `j2c_get_top_products` | Return top-selling products ranked by revenue or quantity sold |

**Example use:** "What were our top 10 products by revenue last month?"

### Coupons

| Tool | What It Does |
|------|-------------|
| `j2c_list_coupons` | List active coupons with usage stats and expiry information |
| `j2c_apply_coupon` | Validate a coupon code and return discount details and validity status |

**Example use:** "Is coupon code SUMMER25 still valid?"

### Shipping & Payment

| Tool | What It Does |
|------|-------------|
| `j2c_get_shipping_methods` | List all configured and enabled shipping methods |
| `j2c_get_payment_methods` | List all enabled payment gateways |

**Example use:** "What payment methods does the store currently accept?"

---

## Available Resources

Resources are read-only data snapshots that the AI can load as context. They are always available regardless of which tool groups are enabled.

| Resource URI | Name | What It Contains |
|-------------|------|-----------------|
| `j2commerce://config` | Store Configuration | Currency, tax settings, enabled payment and shipping methods |
| `j2commerce://categories` | Product Categories | Full product category tree with parent/child relationships |
| `j2commerce://zones` | Shipping Zones | Configured shipping zones and their regions |
| `j2commerce://order-statuses` | Order Statuses | All defined order status codes and their labels |

---

## Available Prompts

The plugin includes pre-built prompt templates that help AI tools ask the right questions in the right order.

| Prompt | Arguments | What It Does |
|--------|-----------|-------------|
| `j2c/analyze-sales` | `date_from`, `date_to` (optional) | Guides the AI to retrieve store stats, top products, and order patterns, then generate a sales report |
| `j2c/handle-support-request` | `order_id` (required), `issue` (required) | Guides the AI to look up an order and customer, then draft a professional support response |
| `j2c/inventory-audit` | `threshold` (optional, default: 10) | Guides the AI to identify low-stock products and suggest reorder quantities |

---

## MCP Client Configuration

To use the J2Commerce MCP Server with an AI tool, you add it as an MCP server in that tool's configuration file. Use the configuration that matches your setup.

### Choosing the Right Transport

**STDIO** is the right choice when your AI tool is running on the same computer as your Joomla site. If you develop locally with Bearsampp, XAMPP, or a local server and Claude Desktop or Cursor are installed on that same machine, STDIO is simpler and faster.

**HTTP** makes sense when your Joomla site lives on a remote server, when you are using a cloud-based AI service, or when you simply prefer a network-based approach over running CLI scripts.

---

### Claude Code (.claude/settings.json or .mcp.json)

Claude Code reads MCP servers from a `.mcp.json` file in your project root or from global settings. Add one of the following configurations.

**STDIO transport (local server):**

```json
{
  "mcpServers": {
    "j2commerce": {
      "type": "stdio",
      "command": "php",
      "args": [
        "/path/to/your/joomla/plugins/system/j2commercemcp/cli/j2commercemcp.php"
      ],
      "env": {
        "JOOMLA_ROOT": "/path/to/your/joomla"
      }
    }
  }
}
```

**HTTP transport (remote or local server):**

```json
{
  "mcpServers": {
    "j2commerce": {
      "type": "http",
      "url": "https://your-site.com/index.php?option=com_ajax&plugin=j2commercemcp&format=raw"
    }
  }
}
```

Replace `/path/to/your/joomla` with the absolute path to your Joomla installation root (e.g., `E:/bearsampp/www/joomla6` on Windows or `/var/www/html/joomla` on Linux).

<!-- SCREENSHOT: .mcp.json file open in a code editor with the j2commerce server configured -->

---

### Claude Desktop (claude_desktop_config.json)

Claude Desktop reads its MCP configuration from:

- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**STDIO transport (recommended for local use):**

```json
{
  "mcpServers": {
    "j2commerce": {
      "command": "php",
      "args": [
        "/path/to/your/joomla/plugins/system/j2commercemcp/cli/j2commercemcp.php"
      ],
      "env": {
        "JOOMLA_ROOT": "/path/to/your/joomla"
      }
    }
  }
}
```

**Windows example** (Bearsampp installation):

```json
{
  "mcpServers": {
    "j2commerce": {
      "command": "php",
      "args": [
        "E:\\bearsampp\\www\\joomla6\\plugins\\system\\j2commercemcp\\cli\\j2commercemcp.php"
      ],
      "env": {
        "JOOMLA_ROOT": "E:\\bearsampp\\www\\joomla6"
      }
    }
  }
}
```

Note that Windows paths in JSON must use double backslashes (`\\`).

After saving the file, restart Claude Desktop. The J2Commerce tools will appear in the tool selector.

<!-- SCREENSHOT: Claude Desktop showing J2Commerce tools available in the tools panel -->

---

### Cursor (.cursor/mcp.json)

Cursor supports MCP servers via a `.cursor/mcp.json` file in your project root or via the global Cursor settings.

**STDIO transport:**

```json
{
  "mcpServers": {
    "j2commerce": {
      "command": "php",
      "args": [
        "/path/to/your/joomla/plugins/system/j2commercemcp/cli/j2commercemcp.php"
      ],
      "env": {
        "JOOMLA_ROOT": "/path/to/your/joomla"
      }
    }
  }
}
```

**HTTP transport:**

```json
{
  "mcpServers": {
    "j2commerce": {
      "url": "https://your-site.com/index.php?option=com_ajax&plugin=j2commercemcp&format=raw",
      "transport": "http"
    }
  }
}
```

After adding the configuration, open Cursor Settings, go to **MCP**, and click **Refresh** to load the new server.

---

### Windsurf (mcp_config.json)

Windsurf uses a global MCP configuration file located at:

- **Windows:** `%USERPROFILE%\.codeium\windsurf\mcp_config.json`
- **macOS / Linux:** `~/.codeium/windsurf/mcp_config.json`

**STDIO transport:**

```json
{
  "mcpServers": {
    "j2commerce": {
      "command": "php",
      "args": [
        "/path/to/your/joomla/plugins/system/j2commercemcp/cli/j2commercemcp.php"
      ],
      "env": {
        "JOOMLA_ROOT": "/path/to/your/joomla"
      }
    }
  }
}
```

Restart Windsurf after saving. The J2Commerce tools will appear in the Cascade AI panel.

---

### Other MCP-Compatible Tools

Any tool that supports MCP protocol version `2024-11-05` can connect to the J2Commerce MCP Server. The server advertises the following capabilities on initialization:

- `tools` — interactive tool calls
- `resources` — read-only data access
- `prompts` — pre-built prompt templates

For **STDIO** clients, use `php` as the command and pass the CLI script path as an argument. Set `JOOMLA_ROOT` in the environment if your Joomla installation is not in the default location relative to the script.

For **HTTP** clients, send JSON-RPC 2.0 POST requests to:

```
https://your-site.com/index.php?option=com_ajax&plugin=j2commercemcp&format=raw
```

The Content-Type should be `application/json`.

---

## Security Considerations

Before switching the plugin on, it is worth spending a few minutes thinking through access. The MCP server hands data to whatever AI tool you configure it for — so the configuration choices you make here are what stand between your store data and unintended access.

**Read vs. write access.** Leave **Enable Write Operations** off unless you have a specific task in mind. There is no rush to enable it, and read-only mode is perfectly capable for analytics, support work, and product lookups.

**Rate limiting.** 100 requests per hour (the default) covers normal interactive use comfortably. If you notice a tool making large automated batches, lower this value to slow things down.

**Audit logging.** Every MCP request lands in the log. A 30-day retention window is enough to trace any access questions after the fact. Increase it if your compliance requirements call for longer records.

**STDIO and local server access.** The STDIO CLI script bootstraps Joomla directly, so it has full database access. Only set it up for tools you are running locally on a machine you control.

**HTTP and public availability.** The HTTP endpoint is accessible from the internet like any other Joomla AJAX URL. The plugin itself does not add additional authentication. If your store is on a public host and you only connect from a known IP range (such as a CI server or a specific office network), a server-level IP restriction on the `com_ajax` endpoint adds a useful extra layer.

---

## Verifying the Connection

After configuring your AI tool, verify the connection is working.

### Test via HTTP

Send a test request from the command line to confirm the server is responding:

```bash
curl -X POST \
  "https://your-site.com/index.php?option=com_ajax&plugin=j2commercemcp&format=raw" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"ping","id":1}'
```

A successful response looks like:

```json
{"jsonrpc":"2.0","result":[],"id":1}
```

### Test via STDIO

Run the CLI script directly to confirm PHP and database connectivity:

```bash
echo '{"jsonrpc":"2.0","method":"ping","id":1}' | php /path/to/joomla/plugins/system/j2commercemcp/cli/j2commercemcp.php
```

Expected output:

```json
{"jsonrpc":"2.0","result":[],"id":1}
```

---

## Troubleshooting

### The AI tool says the MCP server is not responding

**Cause:** The plugin is not enabled, the transport is not enabled in settings, or the URL or file path is incorrect.

**Solution:**

1. Go to **System** -> **Manage** -> **Extensions** and confirm the plugin is enabled.
2. Open the plugin settings and check that **Allowed Transports** includes the transport your AI tool uses.
3. For STDIO, verify the file path in your configuration file is correct and that the CLI script exists at `plugins/system/j2commercemcp/cli/j2commercemcp.php`.
4. For HTTP, confirm the URL is reachable and that your site returns a valid response (not a redirect or login page).

### The ping test returns an HTML page instead of JSON

**Cause:** Joomla is returning a redirect or error page instead of the AJAX response.

**Solution:**

1. Ensure your Joomla site is accessible at the configured URL without a login requirement.
2. Check that `com_ajax` is not blocked by a firewall or security plugin.
3. Try appending `&debug=1` to the URL and inspect the response for PHP errors.

### Tools are not appearing in my AI tool

**Cause:** The enabled tool groups are all disabled, or the AI client has not refreshed its tool list.

**Solution:**

1. Open the plugin settings and verify that at least one group is checked under **Enabled Tool Groups**.
2. In your AI tool, use the refresh or reload option for MCP servers.
3. Restart the AI tool if the refresh option is not available.

### The STDIO script exits immediately with "STDIO transport is not enabled"

**Cause:** The **Allowed Transports** setting in the plugin does not include STDIO.

**Solution:** Open the plugin settings and add **STDIO (CLI for local AI tools)** to the **Allowed Transports** checkboxes, then save.

### Debug logs are not appearing

**Cause:** Debug Mode is disabled.

**Solution:** Enable **Debug Mode** in the plugin settings. Logs are written to `logs/plg_system_j2commercemcp.php` relative to your Joomla root.

---

## Related Topics

- [REST API](./rest-api.md)
- [Cron Tasks](./cron-tasks.md)
- [Apps and Extensions](../apps-and-extensions/index.md)
