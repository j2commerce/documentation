# Vouchers

Vouchers are gift cards with a fixed monetary balance that customers can use to pay for orders. When a customer redeems a voucher code at checkout, the voucher's balance is applied to their order total. If the balance is not fully used in one order, the remaining amount can be used on future orders until it runs out.

Vouchers are different from coupons — a coupon gives a percentage or fixed discount, while a voucher holds a real monetary balance that decreases as it is spent.

## Accessing Vouchers

Go to **J2Commerce** -> **Sales** -> **Vouchers**.

<!-- SCREENSHOT: J2Commerce Sales menu open showing Vouchers option -->

## Understanding the Vouchers List

<!-- SCREENSHOT: Vouchers list showing status, voucher code, value, email, and date columns -->

Each row in the list represents one voucher.

| Column | Description |
|--------|-------------|
| **Status** | Whether the voucher is published (active) or unpublished (disabled). Click to toggle. |
| **Voucher Code** | The code a customer enters at checkout. Click to open and edit. |
| **Value** | The total monetary balance on the voucher. |
| **Email To** | The email address the voucher was sent to. |
| **Valid From** | The date the voucher becomes active. Empty means it is active immediately. |
| **Valid To** | The date the voucher expires. Empty means it never expires. |
| **ID** | The internal voucher ID number. |

## Toolbar Actions

| Button | What It Does |
|--------|-------------|
| **New** | Opens the form to create a new voucher. |
| **Publish** | Activates the selected vouchers so customers can use them. |
| **Unpublish** | Deactivates the selected vouchers so they cannot be used. |
| **Trash** | Moves the selected vouchers to the trash. |
| **Delete** | Permanently deletes trashed vouchers (only visible when viewing the trash). |
| **Preferences** | Opens the global J2Commerce configuration settings. |

## Searching and Filtering

Type in the search bar to find vouchers by **voucher code** or **recipient email address**.

To search by an exact voucher ID, type `id:` followed by the number (e.g., `id:12`).

Click **Search Tools** to filter by **Status** (Published or Unpublished).

<!-- SCREENSHOT: Search Tools panel showing Status filter dropdown -->

## Creating a Voucher

1. Click **New** in the toolbar.
2. Fill in the voucher details across the two tabs (described below).
3. Click **Save & Close** to save and return to the list.

<!-- SCREENSHOT: New voucher edit form showing Basic Settings tab with all fields -->

### Basic Settings Tab

| Field | Description |
|-------|-------------|
| **Voucher Code** | The code a customer types at checkout. A unique 8-character code is generated automatically — you can change it to anything you like. |
| **Voucher Value** | The monetary balance loaded onto this voucher (e.g., `50.00` for a $50 gift card). |
| **Email To** | The recipient's email address. Used when you click **Send Voucher** to email the code to the customer. |
| **Valid From** | The date and time this voucher becomes active. Leave empty for the voucher to work immediately. |
| **Valid To** | The date and time this voucher expires. Leave empty for no expiry. |
| **Status** | Set to **Published** so customers can use the voucher, or **Unpublished** to hold it until you are ready. |

### Message Settings Tab

These fields control the email sent to the voucher recipient when you click **Send Voucher**.

| Field | Description |
|-------|-------------|
| **Subject** | The subject line of the voucher email. Defaults to "Gift Voucher" if left empty. |
| **Email Body** | The body of the voucher email. Use the editor to write a personalised message, include images, or format the content as you wish. |

<!-- SCREENSHOT: Message Settings tab showing Subject and Email Body fields -->

:::tip

The voucher code is automatically generated as an 8-character uppercase code (e.g., `K3RT9XBF`). You can overwrite it with a custom code — for example, `HAPPYBDAY` for a birthday gift card.

:::

## Sending a Voucher by Email

After creating and saving a voucher:

1. Open the voucher from the list.
2. Click **Send Voucher** in the toolbar.

J2Commerce sends the email to the address in the **Email To** field using the subject and body from the **Message Settings** tab.

<!-- SCREENSHOT: Edit form toolbar highlighting the Send Voucher button -->

## How Vouchers Work at Checkout

When a customer enters a voucher code at checkout:

1. J2Commerce checks that the code exists, is published, and falls within the valid date range.
2. The voucher's remaining balance is applied to reduce the order total.
3. The amount used is recorded against the voucher — reducing its remaining balance.
4. If the voucher balance is more than the order total, only the required amount is used and the rest remains for future orders.
5. If the voucher balance is less than the order total, the customer pays the remaining amount by another method.

Only one voucher can be applied per order.

## Viewing Voucher Usage History

To see which orders a voucher has been used on and how much balance has been spent:

1. Open the voucher from the list.
2. Click **View History** in the toolbar.

The history screen shows each order the voucher was applied to, the amount used per order, the customer email, and the order date.

<!-- SCREENSHOT: Voucher history screen showing orders, amounts, and customer emails -->

## Duplicating a Voucher

If you want to create multiple vouchers with similar settings (for example, a batch of $25 gift cards):

1. Open one voucher.
2. Click **Save as Copy** in the toolbar.

A new voucher is created with a new unique code and a status of **Unpublished**. Update the recipient email and value as needed, then publish it.

## Publishing and Unpublishing Vouchers

An unpublished voucher cannot be used at checkout even if a customer has the code.

**To toggle a single voucher:** Click the status icon in the **Status** column.

**To toggle multiple vouchers:** Check their boxes and click **Publish** or **Unpublish** in the toolbar.

## Deleting Vouchers

Vouchers must be trashed before they can be permanently deleted.

**Step 1 — Trash the voucher:**
1. Check the box next to the voucher.
2. Click **Trash** in the toolbar.

**Step 2 — Permanently delete:**
1. Use the **Status** filter and select **Trashed**.
2. Check the box next to the voucher.
3. Click **Delete** in the toolbar.
4. Confirm when prompted.

## Tips

- Leave **Valid From** and **Valid To** empty if you want the voucher to work indefinitely with no date restrictions.
- Use **Save as Copy** to quickly create a batch of gift vouchers with the same value — just update the code and recipient for each copy.
- Sort the list by **Value** (descending) to quickly see your highest-value active vouchers.
- Unpublishing a voucher is a safe way to pause it temporarily without losing its usage history.

## Troubleshooting

### A customer says their voucher code is not working at checkout

**Cause:** The voucher may be unpublished, expired, or have no remaining balance.

**Solution:**

1. Go to **Vouchers** and search for the code.
2. Check the **Status** column — if it is red (unpublished), click to publish it.
3. Check the **Valid From** and **Valid To** dates to confirm the current date falls within the range.
4. Open the voucher and click **View History** to see how much balance has already been used. If the remaining balance is zero, the voucher is fully spent.

### The Send Voucher button does not appear

**Cause:** The voucher has not been saved yet, or you are creating a new voucher that has not been saved.

**Solution:**

Save the voucher first using **Save & Close**, then reopen it. The **Send Voucher** button only appears on saved, existing vouchers.

### I need to find all vouchers that expire this month

**Cause:** There is no date-range filter on the vouchers list.

**Solution:**

Sort the list by **Valid To** (ascending) to bring the earliest expiry dates to the top. Scan for vouchers expiring within your target date range.

## Related Topics

- [Coupons](../sales/coupons.md)
- [Orders](../sales/orders.md)
