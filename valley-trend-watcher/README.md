# Valley Sawmills — Trend Watcher

A weekly demand-signal brief. Every Monday morning it answers three questions:

1. **What's on next week** that puts our materials on screen.
2. **What just aired** and is already pulling interest.
3. **So what** — which of our products it maps to, and a draft post ready to go.

The thesis is the Ground Force effect. A show creates a look, viewers search the
look, they buy the materials one to three weeks later. Ground Force did it for
decking in the late 90s hard enough to reshape the garden trade. If we know on
Monday what Friday's episode contains, we're posting while everyone else is
still finding out.

## Where the output goes

Notion: **Valley Sawmills → 📡 Trend Watch — Weekly Briefs**
<https://app.notion.com/p/87640141372a4410bf345c4d6c2e62c4>

One page per week, filterable by product group and status, so we can look back
and see which shows actually moved anything.

## How it runs

There is no server and no app. A scheduled Claude session fires every Monday,
reads the config files in this folder, researches the week by web search, and
writes the brief into Notion.

That means **the config files in this repo are the product**. Change them and
the next brief changes.

| File | What it controls |
| --- | --- |
| `config/shows.md` | The watchlist. Which shows get checked, and why each matters. |
| `config/signal-map.md` | How a screen moment maps to a Valley product, plus the rules for any suggested copy. |
| `prompts/weekly-brief.md` | What the watcher actually does each week. |

To change the schedule, the destination or the prompt, edit the Routine in
Claude. To change what it looks for, edit the files here.

## Design decisions, and why

**Why a scheduled Claude session rather than a script.** The valuable part is
not "Grand Designs airs Wednesday", it's "they clad it in charred larch". That
needs reading and judgement, not a JSON field. A script would give us a listings
table nobody reads.

**Why Notion rather than email.** The briefs need to accumulate. A brief you can
filter by product group and mark as Actioned is a record. An email is a
notification you archive.

**Why TV first.** It was the original insight and it's the bit with a genuine
lead time. Google Trends, Instagram and Pinterest are all worth adding, and
Trends in particular would let us *prove* the effect rather than assert it. They
are deliberately out of v1.

## Known limits

- **Forward episode content is thin.** Broadcasters publish dates well ahead but
  synopses often only days ahead. The cheapest fix by far is a human watching
  the Friday show and adding two lines to the brief.
- **The network policy blocks direct fetching** of listings sites and APIs, so
  research goes through web search. It works, but it's shallower than a feed
  would be. Opening egress to a few listings domains would improve this a lot.
- **No sales correlation yet.** Without weekly sales by category we're making a
  well-informed argument, not a measured one. This is the single biggest upgrade
  available and it only needs a spreadsheet.
- **No social listening yet.** Instagram has no honest trends API. When we add
  social it should be a hand-picked creator and competitor watchlist, not a
  promise to monitor "Instagram".

## Still to decide

- Who owns acting on the brief, and by when in the week.
- Whether to run loglap, which the Glossary already flags as our clearest mill
  opportunity and which the cabin trend would feed directly.
- Whether the weekly cadence is right. If Amazing Spaces airs Friday, a Thursday
  brief may beat a Monday one.
