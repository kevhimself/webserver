# New Stock Intake Process

## Quick Reference Checklist

When a delivery arrives, follow these steps:

### 1. Receive & Check
- [ ] Count quantities against delivery note
- [ ] Visual quality check (reject damaged/substandard)
- [ ] Sign delivery note
- [ ] Photograph invoice/delivery note (for AI data extraction later)

### 2. Update Costs (5 mins per product)
- [ ] Open master product spreadsheet
- [ ] Find product by SKU or search by name
- [ ] Enter new cost price from invoice
- [ ] Enter invoice reference number
- [ ] Check: has cost changed from last time?
  - If changed <5%: note it, move on
  - If changed >5%: flag for pricing review

### 3. Review Pricing (if cost changed >5%)
- [ ] Open pricing model template
- [ ] Does current sell price still hit target margin?
- [ ] Quick competitor check on this product
- [ ] Decision: keep current sell price / adjust
- [ ] If adjusting: get second approval
- [ ] Document decision and reason

### 4. Update Systems (if price changed)
- [ ] Update Lightspeed POS
- [ ] Update WooCommerce
- [ ] Print new shelf label
- [ ] Log the change in price change log

### 5. Stock (physical)
- [ ] Put stock in correct location
- [ ] Update stock count if tracking manually

---

## Using AI to Extract Invoice Data

When you photograph a supplier invoice, you can use Claude or ChatGPT to extract the data:

**Prompt template:**
```
Please extract the following from this invoice image:
- Supplier name
- Invoice number
- Invoice date
- For each line item:
  - Product description
  - Quantity
  - Unit price (ex VAT)
  - Total (ex VAT)

Format as a table I can paste into a spreadsheet.
Also flag any items where the unit price is notably different from these
previous prices: [paste previous costs if you have them]
```

This saves manual data entry and catches price changes automatically.

---

## Volume Purchase Calculations

When buying in bulk (e.g., full artic load), the per-unit cost may differ from smaller orders:

```
Total invoice cost (ex VAT) ÷ number of units = unit cost

Example:
Artic of sleepers: £4,200 for 300 sleepers
Unit cost: £4,200 ÷ 300 = £14.00 per sleeper

vs normal order:
50 sleepers at £15.50 each = £775

Saving per unit: £1.50 (9.7%)
```

Record BOTH the bulk unit cost and the standard unit cost. Use the bulk cost for pricing if you regularly buy at that volume. Use standard cost if it's a one-off.
