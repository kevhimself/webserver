# Valley Sawmills — Trend Watcher

A weekly demand-signal brief. Every Monday it answers:

1. **Where are we in the year** — what should be selling anyway, and what's the
   weather doing.
2. **What's on screen** this week and last that amplifies it.
3. **So what** — the product, and a draft post ready to go.

The season is the spine. Television modulates it. The Ground Force effect is
real, but a decking moment in April is worth ten of the same in November, and a
storm warning in October beats both.

## Where the output goes

Notion: **Valley Sawmills → 📡 Trend Watch — Weekly Briefs**
<https://app.notion.com/p/87640141372a4410bf345c4d6c2e62c4>

One page per week, filterable by product group and status, with an email nudge
on Monday morning pointing at it.

## How to run it, or change what it does

**The console is the Claude Code session that built it:**
<https://claude.ai/code/session_01N9UYkxctHsy4CeVs27bHzg>

Open that chat and ask. It holds the tools and the context for why things are
the way they are.

| What you want | What to say |
| --- | --- |
| A brief now, off-schedule | "Re-run the trend watcher" |
| Change what it watches | "Add Clarkson's Farm to tier 1" |
| Add a trend source | "Add Bruton and Shaftesbury to the comparator towns" |
| Change the day or time | "Move the brief to Thursday" |
| Change the output | "Two posts a week, not three" |
| Fix the voice | "It's too salesy, pull it back" |
| Check it actually ran | "Did last Monday's brief file?" |

**Reference:**

- **Routine:** Valley Sawmills — weekly trend brief (`trig_01LRMwJbZAvt3P8T3LZEiVEJ`),
  Mondays 7am, email and phone notification. Editable directly under Routines in
  claude.ai if you'd rather not go through the chat.
- **Config:** this folder, branch `claude/valley-sawmills-trend-watcher-78fufk`.
- **Output:** Notion, Marketing & Events › Trend Watch.
- **Role documentation:** Notion, AI @ Valley › The AI Team.

> ⚠️ **Keep the two copies in step.** The Routine's prompt is self-contained: it
> carries a copy of this config inline so it works without a repo checkout. If
> you change a file here, ask the session to push the change through to the
> Routine as well, or the two drift apart.

**If that session has gone stale,** start a fresh Claude Code session on this
repo, point it at this README and the AI Team page in Notion, and it picks up
where the last one left off. Nothing important lives only in the chat.

## How it runs

No server, no app. A scheduled Claude session fires every Monday, reads the
config files here, researches the week, and writes the brief into Notion.

**The config files are the product.** Change them and the next brief changes.

| File | What it controls |
| --- | --- |
| `config/seasonal-calendar.md` | The demand calendar. Outranks everything else. |
| `config/where-we-look.md` | Where trends are sourced: global, national, platform, comparator towns, regulation, weather. |
| `config/shows.md` | The watchlist, weighted to mainstream reach, plus the 60-mile catchment. |
| `config/social-sources.md` | YouTube, Instagram and the Met Office feed, with their real limits. |
| `config/signal-map.md` | Moment to Valley product. |
| `config/social-plan.md` | How Valley actually posts: Facebook first, three pillars, posting days, the two local rings. |
| `config/voice.md` | Voice and claims rules, drawn from the Valley Voice Guide. Governs every caption. |
| `prompts/weekly-brief.md` | What the watcher does each Monday. |

## Setup — the one thing that still blocks it

**The Routine needs the Notion connector attached, and only a human can do it.**

This is not theoretical. The first scheduled run fired on 28 September 2026,
reported success, ran for three minutes and about £0.70 of usage, and **filed
nothing anywhere**. Its session had no Notion tools and no repo checkout, so it
researched the week and had nowhere to put the answer.

Two causes, one fixable from here:

1. **No Notion connector.** A Routine created from inside a Claude Code session
   can't carry connector grants, and the API refuses to attach them. Open the
   Routine **Valley Sawmills — weekly trend brief** in claude.ai settings and
   attach **Notion**. A minute's work, and nothing else matters until it's done.
2. **No repo source on the Routine**, so the fired session can't read these
   config files or push a fallback brief. The scheduling API doesn't expose
   source attachment either.

**What's been done about it:** the Routine's prompt is now fully self-contained.
It carries the seasonal calendar, the watchlist, the signal map, the voice and
claims rules and the social plan inline, so it works with no repo at all. The
files here stay the maintained source, and the prompt says to prefer them when a
checkout exists. The fallback chain is now Notion, then publish as an artifact
and send the link, then put the brief in the reply. It should never again finish
a run with the brief nowhere.

## Free versus paid, as it actually stands

Checked September 2026. The short version: **stay free.** Paying doesn't fix the
thing that's actually weak.

**Free, and worth having**
- **Met Office severe weather warnings** — free machine-readable feed, updated
  as warnings are issued or cancelled. Wind warnings over the South West mean
  fencing within days. The single highest-value free source we have.
- **YouTube Data API v3** — free, 10,000 units a day, no card. A search costs
  100 units, so about 100 searches daily. Ample for a weekly run, and intent on
  YouTube is explicit in a way Instagram's isn't.
- **Instagram Graph API** — free, and our Business account is what unlocks it.
  Capped at 30 unique hashtags a week and 200 calls an hour, own account only.
  Enough for a curated watchlist, not a firehose.
- **Web search** for TV listings and episode content.

**Paid, and mostly not worth it**
- **TVmaze Premium** doesn't solve our problem. Its paid API is user-scoped
  (follows, votes, scrobbling), not richer schedule data. Paying gets us nothing
  on forward synopses.
- **BBC Nitro**, the proper BBC programme metadata API, needs developer
  programme access and the portal is effectively for employees. Not realistically
  open to us.
- **Social listening tools got worse value in 2026.** Brand24's entry moved up
  into the low hundreds a month and Mention retired self-serve entirely. Reported
  prices vary wildly between comparison sites, which are often affiliate-driven,
  so verify before buying anything.
- The genuinely cheap end is around **£15 to £30 a month** (Xpoz, Awario and
  similar). That's the only paid step that would make sense, and only for social
  listening, not television.

**What money can't fix:** forward episode content. Broadcasters publish dates
months ahead and synopses days ahead. The cheapest fix by a mile is someone
watching on Friday and dropping two lines into the brief.

**Recommendation:** run free for a couple of months. If social becomes the part
you rely on, spend £20 a month there. Don't spend anything on TV data.

## Known limits

- **Forward episode content is thin.** See above.
- **The network policy blocks direct fetching** of listings sites and APIs, so
  research goes through web search. It works, but it's shallower than a feed.
  Opening egress to a few domains would improve this.
- **No sales correlation yet.** Without weekly sales by category we're making a
  well-informed argument, not a measured one. Biggest available upgrade, and it
  only needs a spreadsheet.
- **YouTube and Instagram are described but not yet wired in.** The weekly
  session researches them by search. Proper API access needs a Meta developer app
  and a Google API key, perhaps an hour of setup each.
- **Storms are weekly, and shouldn't be.** A Wednesday storm warning is not a
  Monday-brief item. Worth its own alert once the weekly run has settled.

## Flagged for Kev

- **Postcode settled: BA11 4PZ** (Kev, 1 October 2026). The Valley Voice Guide
  still carries BA11 3LN and should be corrected at source.
- **The seasonal calendar here may be the "annual marketing calendar" that
  Marketing & Events lists as drafted elsewhere and needing a home.** Worth
  reconciling rather than keeping two.
- **Trend Watch may belong under Marketing & Events** rather than at the root of
  the hub, next to the unbuilt "Social: who posts, how often, what we post".

## Still to decide

- Who owns acting on the brief, and by when in the week.
- Whether Monday is right. Amazing Spaces airs Friday, so a Thursday brief may
  beat a Monday one in autumn.
- Whether to run loglap, which the Glossary already flags as our clearest mill
  opportunity and which the cabin trend feeds directly.
- Whether summer firewood gets a proper campaign. It's the most obvious gap in
  the calendar and nobody local is talking about it.
