# Social Sources — Instagram and YouTube

The extension beyond TV. Both are real, both are free, and both have limits
worth knowing before we design around them.

## YouTube — the strongest free signal

The YouTube Data API v3 is free with **10,000 quota units a day**, no card
needed. A search costs 100 units, so roughly **100 searches a day**. For a
weekly run that is generous.

Why it is the best of the social sources for us:
- Intent is explicit. Someone searching "how to build a raised bed with sleepers"
  is closer to buying than someone scrolling a nice photo.
- View counts are public and comparable, so "rising" is measurable rather than a
  feeling.
- The UK self-build and garden YouTube scene is big and material-focused.

**What to track weekly:** view velocity on recent uploads for our core searches
— garden room build, sleeper retaining wall, timber cladding, log store, raised
beds, decking subframe, live edge table — plus a hand-picked list of UK creators
in the space.

## Instagram — real but constrained

We have a Business account, which is what makes any of this possible. Through
the Instagram Graph API we can:
- Search **up to 30 unique hashtags per week** per account, resetting after 7
  days
- Get top media by engagement and recent media for those hashtags
- Read our own account's insights in full

What we **cannot** do: read other accounts' followers, pull public content
beyond the authorised endpoints, or get much history. Historic data is usually
only the last few days or weeks.

**So the design is a curated watchlist, not a firehose.** Thirty hashtags a week
is plenty if they are chosen well, for example: #gardenroom #sleepers
#raisedbeds #timbercladding #logstore #firepit #decking #liveedge #oakframe
#gardenmakeover, plus local tags like #frome #somerset #bathuk.

Alongside that, a hand-picked list of competitor and creator accounts, checked
manually or via our own saved collections. A human glancing at fifteen accounts
once a week beats any API we can afford.

**Setup needed:** a Meta developer app connected to the Business account, with a
long-lived token. Perhaps an hour of fiddling, then it runs. Worth doing once
the TV side has proved itself.

## What we are not pretending to do

There is no honest API for "what's trending on Instagram" in general, and
anything claiming otherwise is scraping, which breaks constantly and breaches
terms. We track a chosen list and we say so.

## Weather — the fastest signal of all

Not social, but it belongs with the free sources because it is the highest value
one on this page.

The Met Office **National Severe Weather Warnings Service** publishes a free,
machine-readable Atom feed, updated whenever a warning is issued, updated,
cancelled or expires. It covers wind, rain, thunderstorm, snow, lightning, ice,
extreme heat and fog. Storms get named when they may cause medium (orange) or
high (red) impact.

**An orange wind warning over the South West means fence panels, posts and
gravel boards within days.** That is a same-week signal, it is free, and it
beats everything else on this page for speed and certainty.

Worth considering as its own alert rather than waiting for Monday. A storm on a
Wednesday is not a Monday-brief item.

Docs: <https://metoffice.github.io/nswws-public-api/>
