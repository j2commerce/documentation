# Cron Tasks and Scheduled Maintenance

## What Are Cron Tasks?

A **cron task** (sometimes called a "cron job") is a way to run tasks on your website automatically, on a schedule, without anyone clicking a button. Think of it as setting an alarm clock for your server -- at the time you choose, the server runs a specific task on its own.

J2Commerce uses cron tasks for important store maintenance, such as:

- **Cleaning up abandoned carts** -- Removes old shopping carts that visitors left behind, keeping your database lean.
- **Inventory control** -- Automatically cancels unpaid orders so reserved stock is released back to your store.
- **Queue processing** -- Processes background jobs like syncing data with third-party services (shipping providers, accounting software, etc.).

Without cron tasks, these maintenance jobs would never run, and your store's database would grow indefinitely with stale data.

---

## How It Works

J2Commerce provides a special URL on your site that, when called, triggers a maintenance command. Your hosting control panel (cPanel, sPanel, or similar) calls this URL at regular intervals. A secret key in the URL prevents unauthorized access.

The URL format is:

```
https://yoursite.com/index.php?option=com_j2commerce&task=cron.execute&command=COMMAND&cron_secret=YOUR_QUEUE_KEY
```

Replace:
- `yoursite.com` with your actual domain.
- `COMMAND` with the task you want to run (see the table below).
- `YOUR_QUEUE_KEY` with the secret key from your J2Commerce configuration.

---

## Step 1: Find Your Queue Key

The Queue Key is a secret string that authenticates cron requests. J2Commerce generates one automatically during installation.

1. In the Joomla Administrator, go to **Components > J2Commerce > Setup**.
2. Click the **Store** tab.
3. Scroll down to the **Queue Key** field. You will see a long string of letters and numbers displayed in a green box.
4. Copy this key -- you will need it when setting up the cron job.

If you ever need to invalidate the old key (for example, if it was accidentally exposed), click the **Regenerate** button next to the key. This creates a new key and immediately invalidates the old one. Any existing cron jobs using the old key will stop working until you update them with the new key.

Below the Queue Key, you will also see a **Last Cron Run** field. This shows the date, URL, and IP address of the most recent cron request. If the field says "Cron has not been triggered yet", no cron job has successfully connected to your site.

> **Screenshot suggestion:**
> Capture the Store tab showing the Queue Key field (green box with the key string), the Regenerate button, and the Last Cron Run field below it.

---

## Step 2: Choose Your Commands

J2Commerce ships with the following built-in cron commands:

| Command | What It Does | Recommended Schedule |
|---|---|---|
| `clear_cart` | Removes abandoned shopping carts older than the configured expiry period (set in Setup > Store > Cart Expiry, default 90 days). Deletes both the cart records and their associated cart items. | Once daily (e.g., 3:00 AM) |
| `inventorycontrol` | Checks for unpaid orders and cancels them so that reserved stock is released. Only runs if both "Enable Inventory" and "Cancel Order" are turned on in your J2Commerce configuration. | Every 15 minutes |

The Cart Expiry period can be set in **Components > J2Commerce > Setup > Store** tab, under the "Cart Expiry" dropdown. Options are 7, 14, 30, 60, or 90 days.

---

## Step 3: Set Up the Cron Job

You need to create one cron job per command. Below are instructions for the two most common hosting panels.

### cPanel Setup

1. Log into your **cPanel** dashboard.
2. In the **Advanced** section, click **Cron Jobs**.
3. Under **Add New Cron Job**, set the schedule:
   - For **every 15 minutes**: set the Minute field to `*/15` and leave all other fields as `*`.
   - For **once daily at 3:00 AM**: set Minute to `0`, Hour to `3`, and leave Day/Month/Weekday as `*`.
4. In the **Command** field, enter one of the following (replace the placeholder values):

**Using wget (recommended):**
```
wget -q -O /dev/null "https://yoursite.com/index.php?option=com_j2commerce&task=cron.execute&command=clear_cart&cron_secret=YOUR_QUEUE_KEY"
```

**Using curl:**
```
curl -s "https://yoursite.com/index.php?option=com_j2commerce&task=cron.execute&command=clear_cart&cron_secret=YOUR_QUEUE_KEY" > /dev/null 2>&1
```

5. Click **Add New Cron Job**.
6. Repeat for each command you want to schedule.

> **Screenshot suggestion:**
> Capture the cPanel Cron Jobs screen with the schedule fields filled in and the wget command visible in the Command field.

**Common cron schedule patterns:**

| Pattern | Meaning |
|---|---|
| `*/15 * * * *` | Every 15 minutes |
| `*/30 * * * *` | Every 30 minutes |
| `0 * * * *` | Every hour, on the hour |
| `0 3 * * *` | Once daily at 3:00 AM |
| `0 0 * * 0` | Once weekly (Sunday at midnight) |

The five fields represent, in order: Minute, Hour, Day of Month, Month, Day of Week. An asterisk (`*`) means "every" and `*/N` means "every N".

### sPanel Setup

1. Log into your **sPanel** dashboard.
2. Navigate to **Tools > Cron Jobs** (or **Scheduled Tasks**, depending on your sPanel version).
3. Click **Create Cron Job** or **Add New**.
4. Set the schedule interval using the provided fields or dropdown menus.
5. In the **Command** field, enter the same wget or curl command shown in the cPanel section above.
6. Save the cron job.

---

## Step 4: Verify It Works

After setting up your cron job, wait for it to run at least once (or trigger it manually if your hosting panel has a "Run Now" button), then:

1. Go to **Components > J2Commerce > Setup > Store** tab.
2. Check the **Last Cron Run** field. It should now show:
   - The date and time of the last run.
   - The URL that was called.
   - The IP address of the server that made the request.

If the field still says "Cron has not been triggered yet" after the scheduled time has passed, see the Troubleshooting section below.

> **Screenshot suggestion:**
> Capture the Last Cron Run field showing a successful trigger with date, URL, and IP visible.

---

## Alternative: Joomla Task Scheduler

Joomla 5 and later includes a built-in **Task Scheduler** that can replace external cron jobs for certain tasks. J2Commerce provides a Task Scheduler plugin with three built-in routines:

| Task Name | What It Does |
|---|---|
| **J2Commerce: Remove Abandoned Orders** | Deletes incomplete orders (status: New) older than a configurable number of days. Includes a "Dry Run" mode to preview deletions before committing. Default: 30 days. |
| **J2Commerce: Process Queue** | Processes pending items in the J2Commerce queue system. Configurable batch size (default: 10) and stale lock release time (default: 30 minutes). |
| **J2Commerce: Cleanup Queue Logs** | Deletes old queue execution logs (default: older than 90 days) and completed queue items (default: older than 30 days). Includes a "Dry Run" mode. |

### Setting Up a Scheduled Task

1. Go to **System > Scheduled Tasks** in the Joomla Administrator.
2. Click **New**.
3. Select one of the J2Commerce task types from the list.
4. Configure the task parameters (each task has its own settings).
5. Set the execution interval (e.g., every 15 minutes, once daily).
6. Save and enable the task.

**Important:** The Joomla Task Scheduler itself requires either a server-level cron job pointing to `cli/joomla.php scheduler:run` or the "Lazy" scheduler option enabled in Joomla's Global Configuration. Without one of these, scheduled tasks will not execute. See the [Joomla documentation on Task Scheduler](https://manual.joomla.org/docs/general-concepts/scheduling/) for setup details.

The cron URL approach described earlier in this guide is simpler and works with any hosting panel without additional Joomla configuration. The Task Scheduler approach provides a visual interface for managing tasks and built-in logging, but requires that the scheduler itself is properly triggered.

> **Screenshot suggestion:**
> Capture the System > Scheduled Tasks screen showing the J2Commerce tasks listed, with one expanded to show its configuration parameters.

---

## Configuration Reference

### Queue Key
- **Location:** Components > J2Commerce > Setup > Store tab
- **What it does:** A secret string used to authenticate cron requests. Without a valid key, cron URLs return a 403 error.
- **Default:** Auto-generated on first access.
- **When to change:** If the key is compromised or you want to rotate credentials. Click "Regenerate" to create a new one.

### Last Cron Run
- **Location:** Components > J2Commerce > Setup > Store tab
- **What it does:** Displays the date, URL, and IP of the last successful cron execution.
- **Default:** "Cron has not been triggered yet."

### Maximum Queue Repeat
- **Location:** Components > J2Commerce > Setup > Store tab
- **What it does:** Sets the maximum number of times the queue system will process items in a single cycle.
- **Default:** `10`
- **When to change:** Increase if you have many queue items to process per run. Decrease if cron jobs are timing out.

### Cart Expiry
- **Location:** Components > J2Commerce > Setup > Store tab
- **What it does:** Controls how old a cart must be before the `clear_cart` command deletes it.
- **Default:** 90 days
- **Options:** 7, 14, 30, 60, or 90 days

---

## Troubleshooting

### Error: 403 Forbidden

**Cause:** The `cron_secret` value in your URL does not match the Queue Key stored in J2Commerce.

**Resolution:**
1. Go to **Components > J2Commerce > Setup > Store** tab.
2. Copy the exact Queue Key value.
3. Update your cron job command with the correct key.
4. If you recently clicked "Regenerate", you must update all cron jobs with the new key.

### Error: 503 Service Unavailable

**Cause:** The Queue Key has not been configured yet (it is empty).

**Resolution:**
1. Go to **Components > J2Commerce > Setup > Store** tab.
2. The Queue Key field should auto-generate a key. If it is empty, click **Regenerate**.
3. Save the configuration.

### Error: 501 Not Implemented

**Cause:** The `command` parameter is missing from the cron URL.

**Resolution:** Make sure your URL includes `&command=clear_cart` or `&command=inventorycontrol`. Check for typos.

### Cron runs but "Last Cron Run" never updates

**Possible causes:**
- The cron URL has a typo in the domain name or path.
- Your server's cron service is not actually running the job (check cPanel/sPanel cron logs).
- A caching plugin or CDN is intercepting the request. J2Commerce sets an `X-Cache-Control: False` header to prevent this, but some aggressive caching layers may still interfere.

**Resolution:**
- Test the URL manually in your browser. You should see a plain text response like `clear_cart OK`.
- Check your hosting cron logs for errors.
- Temporarily disable caching plugins to test.

### The `clear_cart` command does not seem to delete anything

**Possible causes:**
- There are no carts older than the Cart Expiry period.
- The Cart Expiry is set to a high value (e.g., 90 days) and your carts are newer than that.

**Resolution:** Check the Cart Expiry setting under **Components > J2Commerce > Setup > Store** tab and adjust if needed.

### The `inventorycontrol` command does not cancel orders

**Possible causes:**
- The "Enable Inventory" setting is turned off.
- The "Cancel Order" setting is turned off.

**Resolution:** Both settings must be enabled in J2Commerce configuration for inventory control to work.

---

## Recommended Setup Summary

For a typical store, set up two cron jobs:

1. **Cart cleanup** -- runs once daily at 3:00 AM:
   ```
   0 3 * * * wget -q -O /dev/null "https://yoursite.com/index.php?option=com_j2commerce&task=cron.execute&command=clear_cart&cron_secret=YOUR_KEY"
   ```

2. **Inventory control** -- runs every 15 minutes:
   ```
   */15 * * * * wget -q -O /dev/null "https://yoursite.com/index.php?option=com_j2commerce&task=cron.execute&command=inventorycontrol&cron_secret=YOUR_KEY"
   ```

Replace `yoursite.com` with your domain and `YOUR_KEY` with the Queue Key from your Store configuration.

---

## Screenshot Checklist

1. **Screenshot 1 -- Store Tab Queue Key**
   - **Location:** Components > J2Commerce > Setup > Store tab
   - **What to show:** The Queue Key field (green box with the key string), the Regenerate button, and the Last Cron Run field.
   - **Purpose:** Shows where to find the secret key needed for cron URLs.

2. **Screenshot 2 -- Last Cron Run (Successful)**
   - **Location:** Components > J2Commerce > Setup > Store tab
   - **What to show:** The Last Cron Run field displaying a successful trigger with date, URL, and IP.
   - **Purpose:** Helps users verify their cron job is working correctly.

3. **Screenshot 3 -- cPanel Cron Job Setup**
   - **Location:** cPanel > Cron Jobs
   - **What to show:** The "Add New Cron Job" form with schedule fields filled in and the wget command in the Command field.
   - **Purpose:** Step-by-step visual guide for cPanel users.

4. **Screenshot 4 -- Cart Expiry Setting**
   - **Location:** Components > J2Commerce > Setup > Store tab
   - **What to show:** The Cart Expiry dropdown field with the available options (7, 14, 30, 60, 90 days).
   - **Purpose:** Shows users where to configure how old carts must be before cleanup.

5. **Screenshot 5 -- Joomla Task Scheduler**
   - **Location:** System > Scheduled Tasks
   - **What to show:** The list of available J2Commerce task types and one task's configuration form expanded.
   - **Purpose:** Shows the alternative Task Scheduler approach for users who prefer a visual interface.

6. **Screenshot 6 -- Browser Test of Cron URL**
   - **Location:** Browser address bar showing the cron URL, with the page displaying "clear_cart OK".
   - **What to show:** The plain text response confirming the cron command executed successfully.
   - **Purpose:** Helps users verify the URL works before setting up the automated cron job.
