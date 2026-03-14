# Valley - Data Maintenance & Update Guide

## The Golden Rule

**One source of truth.** All product and pricing data lives in the master spreadsheet. Every other system (Lightspeed, WooCommerce, Xero, price labels) is fed FROM this source. Never edit prices directly in POS or on the website.

---

## Daily Operations

### When New Stock Arrives

1. **Receive delivery** - check quantities against delivery note
2. **Scan or photograph the invoice/delivery note**
3. **Update master spreadsheet:**
   - Find the product by SKU
   - Update `Supplier Cost` with new invoice price
   - Update `Cost Source Reference` with invoice number
   - Update `Last Cost Update` date
   - If cost has changed >5%, the `Cost Change Flag` will show REVIEW
4. **If cost has changed significantly:**
   - Open pricing model template
   - Check if sell price still delivers target margin
   - Check against current competitor prices
   - Decide: absorb the cost change, or adjust sell price?
   - Document the decision in `Pricing Decision Reason`
5. **If sell price changes:**
   - Update Lightspeed POS
   - Update website/WooCommerce
   - Print new shelf label
   - Note the change in the price change log

### Adding a New Product

1. **Assign SKU** using the coding system (see SKU Guide below)
2. **Fill in ALL fields** in product master template - don't skip the customer-facing info
3. **Set pricing** using the pricing model template
4. **Get a second pair of eyes** on the data before going live
5. **Load into systems:** Lightspeed, WooCommerce, Xero
6. **Create physical materials:** shelf label, showroom info card
7. **Brief the sales team** on the new product

---

## Weekly Tasks (Pick a consistent day - suggest Monday morning)

### Price & Competitor Review (30-45 mins)

- [ ] Check competitor prices for all 10 reference products
- [ ] Update competitor comparison template with new prices and dates
- [ ] Flag any products where we're now >15% above cheapest competitor
- [ ] Review any products flagged REVIEW in cost change or margin columns
- [ ] Check for any seasonal offers competitors are running
- [ ] Decide if any price adjustments needed → get second approval → update

### Data Quality Spot-Check (15 mins)

- [ ] Pick 5 random products from the master sheet
- [ ] Check: POS price matches master sheet price
- [ ] Check: Website price matches master sheet price
- [ ] Check: Shelf label matches master sheet price
- [ ] If any mismatches found → fix immediately and investigate how it happened

### Stock Review (15 mins)

- [ ] Any products running low? Flag for reorder
- [ ] Any overstocked items? Consider promotional pricing
- [ ] Any products not selling? Review pricing or consider delisting

---

## Monthly Tasks (First Monday of the month)

### Full Margin Review (1 hour)

- [ ] Sort all products by margin (lowest to highest)
- [ ] Review bottom 10%: are these loss leaders by design, or problems to fix?
- [ ] Review top 10%: are these justified premiums, or are we overcharging?
- [ ] Check overall blended margin across categories
- [ ] Compare to previous month: trending up or down? Why?

### Category Review (30 mins per category)

- [ ] Is every product in this category still relevant?
- [ ] Any gaps in the range customers are asking about?
- [ ] Any products to delist (not selling, poor margin, quality issues)?
- [ ] Are related products and "full project kit" links still accurate?

### System Sync Check (30 mins)

- [ ] Export product list from Lightspeed → compare to master sheet
- [ ] Check WooCommerce product count matches master sheet active products
- [ ] Verify Xero product codes are current
- [ ] Fix any discrepancies

---

## Seasonal Tasks

### Spring (Feb-Mar): Fencing & Landscaping Season Prep

- [ ] Review all fencing product prices vs competitors
- [ ] Set up any spring offers/bundles
- [ ] Update website with seasonal content
- [ ] Check stock levels for high-demand items
- [ ] Brief sales team on seasonal messaging

### Summer (May-Jun): Decking & Outdoor Living

- [ ] Review decking range and prices
- [ ] Create project bundles (deck kits, pergola kits)
- [ ] Update website project calculators

### Autumn (Sep-Oct): Winter Prep & Clearance

- [ ] Review any overstock for clearance pricing
- [ ] Prepare winter product range
- [ ] Update seasonal offers

### Year-End (Dec-Jan): Full Reset

- [ ] Full product range review: what stays, what goes, what's new
- [ ] Annual competitor analysis
- [ ] Margin target review for next year
- [ ] Supplier renegotiation data prep

---

## SKU Coding System

### Format: `[CAT]-[SUBCAT]-[ATTR]-[SIZE]-[LENGTH]`

### Category Codes

| Code | Category |
|------|----------|
| TIM | Timber |
| FEN | Fencing |
| DEC | Decking |
| SLP | Sleepers |
| SHT | Sheet Materials |
| FIX | Fixings & Hardware |
| TRL | Tools |
| TRT | Treatments & Finishes |
| SVC | Services |
| ACC | Accessories |

### Sub-Category Examples (Timber)

| Code | Sub-Category |
|------|-------------|
| SW-T | Softwood Treated |
| SW-U | Softwood Untreated |
| HW | Hardwood |
| CLS | CLS/Studwork |
| PLN | Planed/PAR |

### Attribute Codes

| Code | Meaning |
|------|---------|
| OAK | Oak |
| LAR | Larch |
| CED | Cedar |
| FE | Featheredge |
| PNL | Panel |
| GRV | Gravel board |
| ARL | Arris rail |
| CAP | Cap/capping |

### Size: Width x Depth in mm (e.g., 047 = 47mm, 100 = 100mm)

### Length: In mm (e.g., 2400 = 2.4m, 3600 = 3.6m)

### Examples

| SKU | Product |
|-----|---------|
| TIM-SW-T-047-2400 | Treated Softwood 47mm 2.4m |
| TIM-SW-T-075-2400 | Treated Softwood Post 75mm 2.4m |
| TIM-HW-OAK-025-2400 | Oak Board 25mm 2.4m |
| FEN-PNL-FE-1800 | Featheredge Panel 6ft |
| FEN-GRV-1800 | Gravel Board 6ft |
| DEC-BRD-STD-3600 | Standard Decking Board 3.6m |
| FIX-POSTCRETE-020 | Postcrete 20kg |

---

## Price Change Log

Keep a running log of all price changes. This protects trust (we can always explain when and why a price changed).

| Date | SKU | Product | Old Price | New Price | Reason | Approved By |
|------|-----|---------|-----------|-----------|--------|-------------|
| | | | | | | |

---

## Discounts & Offers Rules (The Valley Way)

### The Generosity Hierarchy (try these in order)

1. **Free delivery** (if order qualifies) - feels generous, costs us fuel
2. **Free cutting/service** - uses our skill, not our margin
3. **Throw in an add-on** (pack of screws, end-grain treatment) - small cost, big goodwill
4. **Volume pricing** - genuine saving for genuine bulk
5. **Percentage discount** - last resort, and never more than agreed thresholds

### Discount Authority

| Discount Level | Who Can Authorise |
|----------------|-------------------|
| Free delivery (normally charged) | Any team member |
| Free add-on (under £5 value) | Any team member |
| Up to 5% off | Team lead |
| 5-10% off | Manager |
| Over 10% off | Owner approval |
| Price match request | Manager (with evidence) |

### Offers to AVOID

- "Everything 20% off" blanket sales (devalues the range, trains customers to wait)
- Discounts without documented reason (erodes margin invisibly)
- Matching online-only prices that exclude delivery (unfair comparison)

---

## When Things Go Wrong

### Price mismatch found (POS ≠ shelf label ≠ website)

1. **Honour the lowest price** for the customer (fairness value)
2. **Fix all systems immediately** to match the correct price
3. **Investigate the root cause** - was it a process failure?
4. **Log it** - pattern of mismatches means the process needs fixing

### Customer challenges our price

1. **Listen** - understand what they're comparing to
2. **Check** - is their comparison valid? (same product, same spec?)
3. **Explain the difference** if our product is genuinely better
4. **If they're right** and we're overpriced - thank them and review the price
5. **Never make the customer feel stupid** for asking about price

### Supplier increases cost significantly (>10%)

1. **Don't panic-adjust** sell prices immediately
2. **Check if other suppliers offer better** - is it time to switch?
3. **Calculate the margin impact** if we absorb some of the increase
4. **If sell price must increase:**
   - Adjust gradually if possible (two small increases > one big one)
   - Update all systems simultaneously
   - Brief the sales team on how to explain it
   - Consider which products to hold firm on (reference products)

---

*This is a living document. If something doesn't work in practice, change it. The best process is the one your team actually follows.*
