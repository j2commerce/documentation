---
title: "Order Transaction Ledger & Payment Balance"
sidebar_label: "Payment Balance"
sidebar_position: 5
description: "Understand the Payment Balance card on the order screen, how multi-charge and partial-refund orders are tracked, and what the upgrade backfill does."
---

# Order Transaction Ledger & Payment Balance

J2Commerce 6.4.0 introduces a single, accurate record of every charge, refund, authorization, and void on an order — shared by every payment method your store uses. On the order detail screen, this shows up as a new **Payment Balance** card.

## What the Ledger Does For You

Before this feature, each payment method (Stripe, PayPal, Finix, and so on) kept track of "how much has this order been paid" a little differently. That made partial refunds and multi-charge orders harder to reconcile.

Now, every payment plugin that has adopted the ledger writes to the same record. The result:

- One accurate **Amount Paid** figure, no matter which payment method processed the charge.
- One accurate **Refunded** figure, even if the refund happened in several steps.
- A **Balance Due** that always reflects reality — including admin top-up charges after checkout.

<!-- SCREENSHOT: Order detail screen showing the Payment Balance card with Order Total, Amount Paid, Refunded, Net Paid, and Balance Due rows -->

## The Payment Balance Card

Open any order and look below the **Order Details** payment card. If the order has ledger activity, you'll see a **Payment Balance** card with these rows:

| Row | Meaning |
|-----|---------|
| **Order Total** | The order's grand total, in the order's own currency. |
| **Amount Paid** | Everything successfully charged against this order so far — including admin top-up charges. |
| **Refunded** | Everything refunded so far. This row only appears when there's a refund to show. |
| **Net Paid** | **Amount Paid** minus **Refunded**. |
| **Balance Due** | What's still owed, or **Paid in Full** once **Net Paid** meets the **Order Total**. |

**Balance Due** is shown in red when money is still owed, and in green (as **Paid in Full**) once the order is settled.

<!-- SCREENSHOT: Close-up of the Payment Balance card showing the "Paid in Full" state in green -->

### When does the card appear?

The **Payment Balance** card only appears on orders that have at least one ledger entry. That includes:

- Any order placed after your store was upgraded to J2Commerce 6.4.0, using a payment method that has adopted the ledger.
- Any older order that was successfully included in the one-time upgrade backfill (see below).

If you open an older order and don't see the card, it most likely means that order predates the ledger and wasn't picked up by the backfill — see [Upgrading](#upgrading-and-the-one-time-backfill) below for why that can happen.

## Multi-Charge Orders

Some orders involve more than one charge against the same order:

- The original **checkout charge**, made when the customer completed their purchase.
- One or more **admin top-up charges** — for example, charging an outstanding balance after the order was placed, or collecting payment for an add-on that was applied later.

The ledger tracks each of these as a separate charge, so **Amount Paid** always reflects the true total, no matter how many charges make it up.

### How refunds work across multiple charges

When you (or a customer-facing refund flow) issue a refund on an order with multiple charges, the system refunds the **newest charge first**. If the refund amount is larger than what's left on the newest charge, it automatically continues into the next-most-recent charge, and so on, until the full refund amount is accounted for.

This mirrors how most payment processors expect refunds to be unwound, and it keeps your original checkout charge intact for as long as possible — which matters for orders using saved cards or subscriptions tied to that original charge.

### Partial refunds

You can refund less than the full **Net Paid** amount. The **Refunded** and **Balance Due**/**Net Paid** figures on the Payment Balance card update immediately to reflect a partial refund.

### Why the refundable maximum can be less than Amount Paid

Some payments on an order may have been entered **manually** — for example, a cash payment, a money order, or an admin note recording a payment made outside the store (no card number, no gateway reference). These manual payments count toward **Amount Paid** because the customer did in fact pay.

However, manual payments **cannot be automatically refunded through a payment gateway** — there's no card or gateway transaction to reverse electronically. If an order includes a manual payment, the maximum amount that can be refunded automatically through the **Refund** button may be lower than the full **Amount Paid**. To refund the manual portion, you'll need to handle it outside the system — for example, issuing a physical refund, a store credit, or another manual adjustment — and note it on the order.

## Upgrading and the One-Time Backfill

When your store is upgraded to J2Commerce 6.4.0, a **one-time, automatic backfill** runs to populate the ledger from your existing orders' payment history, so older orders can show the Payment Balance card too.

Only orders in these statuses are included in the backfill:

- **Completed**
- **Refunded**
- **Partially Refunded**

Orders in other statuses (Pending, Failed, Cancelled, and so on) are not backfilled, since there's no settled payment history to record.

### Running the backfill manually

If you need to re-run the backfill — for example, after restoring a backup, or if the automatic run didn't complete — your developer or hosting support can run it from the command line:

```bash
php cli/joomla.php j2commerce:seed:order-ledger
```

Running this command is always safe to repeat: any order that already has ledger entries is skipped automatically, so re-running it never creates duplicate records.

The command prints a small summary table when it finishes:

| Column | What it means |
|--------|---------------|
| **Seeded** | Orders whose payment history was successfully added to the ledger. |
| **Skipped (already has ledger)** | Orders that already had ledger entries — nothing was changed. |
| **Failed** | Orders whose payment history couldn't be read (logged for review; the order itself is unaffected). |
| **Reversals skipped (unattributable)** | Orders where a past refund exists in the order record but couldn't be matched to a specific charge with confidence. These orders will show **Amount Paid** correctly but may need a manual look if the **Refunded** figure looks off. |

If an order shows up under **Failed** or **Reversals skipped**, it simply means that order will keep working exactly as it did before the upgrade — it just won't show the new Payment Balance card, or its refund figure may need manual verification.

## Currency

All figures on the Payment Balance card — **Order Total**, **Amount Paid**, **Refunded**, **Net Paid**, and **Balance Due** — are shown in the **order's own currency** (the currency the customer paid in), not your store's default currency. If your store sells in multiple currencies, each order's card reflects that specific order's currency correctly.

## Tips

- **Check the Payment Balance card before issuing a refund** — it tells you exactly how much is refundable before you act.
- **Look for the "Paid in Full" label** as a quick way to confirm an order is fully settled.
- **If a refund seems partial**, remember that manual/offline payments on an order can't be auto-refunded and may need a manual adjustment.

## Troubleshooting

### The Payment Balance card doesn't show on an older order

**Cause:** The order predates the ledger and either wasn't included in the one-time backfill (its status wasn't Completed, Refunded, or Partially Refunded) or its payment history couldn't be read during the backfill.

**Solution:**

1. Confirm the order's status — only **Completed**, **Refunded**, and **Partially Refunded** orders are eligible for backfill.
2. Ask your developer or hosting support to re-run `php cli/joomla.php j2commerce:seed:order-ledger` and check the **Failed** count in the summary table.
3. If the order still doesn't show the card afterward, it will continue to work exactly as it did before the upgrade — the order's totals and refund history remain accurate in the order details, just without the new card.

## Related Topics

- [Orders](orders.md)
