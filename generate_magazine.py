#!/usr/bin/env python3
"""
Valley Magazine Generator
Runs daily at 7am. Generates a new monthly issue when the month changes,
updates the archive index, commits, and pushes to GitHub.

In CI (GitHub Actions), set CI=true to skip internal git operations;
the workflow handles commit/push itself.
"""

import os
import sys
import subprocess
from datetime import date

REPO = os.path.dirname(os.path.abspath(__file__))
MAG_DIR = os.path.join(REPO, "magazines")
TODAY = date.today()
FILENAME = f"{TODAY.isoformat()}.html"
OUTPATH = os.path.join(MAG_DIR, FILENAME)
RUN_GIT = os.environ.get("CI") != "true"


def season(d: date) -> str:
    m = d.month
    if m in (3, 4, 5):   return "Spring"
    if m in (6, 7, 8):   return "Summer"
    if m in (9, 10, 11): return "Autumn"
    return "Winter"


def season_colors(s: str) -> dict:
    return {
        "Spring": {"bg": "#0D2218", "accent": "#D8FF4F"},
        "Summer": {"bg": "#1A2E0D", "accent": "#FFE94F"},
        "Autumn": {"bg": "#1F1208", "accent": "#FF9F4F"},
        "Winter": {"bg": "#0D1520", "accent": "#A8D8FF"},
    }.get(s, {"bg": "#0D2218", "accent": "#D8FF4F"})


def season_projects(s: str) -> list:
    return {
        "Spring": [
            ("Build a Sleeper Planter", "Step-by-step guide to railway sleeper raised beds"),
            ("What to Grow This Spring", "Salad, beans, courgettes, herbs — your seasonal planting guide"),
            ("The Living Material", "A philosophical essay on working with wood"),
            ("Frome's Quiet Revolution", "How Frome became a model for the cooperative economy"),
            ("Making in the Machine Age", "How Valley uses technology to serve craft"),
            ("Valley By the Numbers", "47 projects, 3.2t reclaimed, 100% FSC or reclaimed"),
            ("The Repair Ethic", "Repair first, reclaim second, build to last"),
            ("Ancient Roads, New Roots", "The story of the railway sleeper"),
            ("Let Plants Work Together", "Companion planting for the sleeper bed"),
            ("Where Valley Is Going", "Community workshop, food forest, schools programme"),
        ],
        "Summer": [
            ("Build a Garden Workbench", "A solid outdoor bench from reclaimed oak"),
            ("What's Fruiting Now", "Soft fruit, courgette gluts, and the summer harvest"),
            ("Wood in the Heat", "How timber moves in summer — and how to work with it"),
            ("Frome Festival Special", "Valley at the festival — workshops, demos, community"),
            ("The Solar Workshop", "How we're running the bench on renewable energy"),
            ("Summer Numbers", "The project pipeline and what's coming off the tools"),
            ("Cold Frames and Hot Beds", "Building season-extension structures for your garden"),
            ("The Elm Question", "Why we're choosing elm again for outdoor furniture"),
            ("Guild of Making", "Profiles of Frome's independent makers"),
            ("Late Summer Plans", "What Valley is building for the autumn season"),
        ],
        "Autumn": [
            ("Build a Log Store", "A classic open-fronted log store from oak rounds"),
            ("Harvest Storage", "Root cellars, clamps, and preserving the kitchen garden"),
            ("Reading the Rings", "What dendrochronology tells us about the wood we work"),
            ("Edventure Frome", "A deep profile of Frome's community enterprise hub"),
            ("The Apprentice", "Valley's first apprentice — learning the old skills"),
            ("Autumn Numbers", "End-of-season review and winter project planning"),
            ("Sawmill Visit", "A day at a local portable sawmill turning windblown trees"),
            ("The Scythe and the Saw", "On the relationship between garden and workshop"),
            ("Overwintering Beds", "Preparing your sleeper beds for the cold months"),
            ("Valley Winter Programme", "Workshops, courses, and open days this winter"),
        ],
        "Winter": [
            ("Build a Tool Cabinet", "A wall-hung cabinet for hand tools — dovetails optional"),
            ("Planning the Kitchen Garden", "Drawing the beds, ordering seeds, preparing the soil"),
            ("The Patience of Drying", "Air-drying timber and why it's worth the wait"),
            ("Black Swan Arts Winter", "Valley at the Black Swan — exhibition and open studio"),
            ("Sharpening Everything", "A guide to keeping edge tools sharp through the year"),
            ("Winter Numbers", "Year-end review — what we built, what we learned"),
            ("The Hazel Copse", "A visit to a local coppiced woodland and what we found"),
            ("Draw-Bore Tenons", "A forgotten joint that's stronger than any bolt"),
            ("Seed Ordering for Spring", "Planning next year's crops from the warmth of the workshop"),
            ("The Year Ahead", "Valley's plans for the new year in Frome and beyond"),
        ],
    }.get(s, [])


def issue_number(d: date) -> str:
    start = date(2026, 4, 1)
    q = (d.year - start.year) * 4 + (d.month - 1) // 3 - (start.month - 1) // 3
    nums = ['I','II','III','IV','V','VI','VII','VIII','IX','X']
    return f"Vol. {nums[min(q // 4, 9)]}, No. {q % 4 + 1}"


def humandate(d: date) -> str:
    return d.strftime("%-d %B %Y")


def generate_html(d: date) -> str:
    s = season(d)
    c = season_colors(s)
    iss = issue_number(d)
    hdate = humandate(d)
    return f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
<meta charset=\"UTF-8\">
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
<title>Valley Magazine — {s} {d.year}</title>
<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
<link href=\"https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700..900;1,9..144,700..900&family=Inter:wght@400;700;900&display=swap\" rel=\"stylesheet\">
<style>
*,*::before,*::after{{margin:0;padding:0;box-sizing:border-box}}
body{{font-family:'Inter',sans-serif;background:{c['bg']};color:#F5EDD6;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:4rem 2rem;text-align:center;}}
.logo{{font-family:'Fraunces',serif;font-weight:900;font-size:clamp(5rem,18vw,14rem);line-height:.88;color:#F5EDD6;}}
.logo .ac{{color:{c['accent']};}}
.tag{{font-family:'Fraunces',serif;font-style:italic;font-size:clamp(1.2rem,2.5vw,2rem);color:#B8CEB5;margin-top:.6rem;}}
.meta{{font-family:'Inter',sans-serif;font-weight:700;font-size:max(14px,.85rem);letter-spacing:.18em;text-transform:uppercase;opacity:.45;margin-top:2rem;}}
.link{{margin-top:2.5rem;}}
.link a{{font-family:'Fraunces',serif;font-weight:700;font-size:max(18px,1.1rem);color:{c['accent']};text-decoration:none;border-bottom:2px solid currentColor;padding-bottom:.1em;}}
</style>
</head>
<body>
<div class=\"logo\">VAL<span class=\"ac\">LEY</span></div>
<div class=\"tag\">{s} {d.year} Issue</div>
<div class=\"meta\">{iss} &nbsp;&middot;&nbsp; {hdate}</div>
<div class=\"link\"><a href=\"index.html\">&larr; All Issues</a></div>
</body>
</html>"""


def update_index(new_date: date, s: str, iss: str):
    index_path = os.path.join(MAG_DIR, "index.html")
    if not os.path.exists(index_path):
        return
    with open(index_path) as f:
        content = f.read()
    hdate = humandate(new_date)
    projects = season_projects(s)
    desc = " &middot; ".join(t for t, _ in projects[:4])
    card = (
        f'\n  <a class="card" href="{new_date.isoformat()}.html">\n'
        f'    <span class="card-season">{s} {new_date.year}</span>\n'
        f'    <span class="card-title">{iss}</span>\n'
        f'    <span class="card-date">{hdate}</span>\n'
        f'    <span class="card-desc">{desc}</span>\n'
        f'    <span class="card-arrow">&rarr; Read Issue</span>\n'
        f'  </a>\n'
    )
    marker = "<!-- Issues are listed below. New issues are prepended automatically. -->"
    if marker in content:
        with open(index_path, "w") as f:
            f.write(content.replace(marker, marker + card, 1))


def this_month_has_issue() -> bool:
    prefix = TODAY.strftime("%Y-%m-")
    try:
        return any(
            f.startswith(prefix) and f.endswith(".html") and f != "index.html"
            for f in os.listdir(MAG_DIR)
        )
    except FileNotFoundError:
        return False


def git(*args):
    r = subprocess.run(["git", "-C", REPO] + list(args), capture_output=True, text=True)
    if r.returncode != 0:
        print(f"git {' '.join(args)} failed: {r.stderr.strip()}", file=sys.stderr)
    return r.returncode == 0


def push_with_retry(branch: str, retries: int = 4):
    import time
    for i, wait in enumerate([2, 4, 8, 16]):
        r = subprocess.run(["git", "-C", REPO, "push", "-u", "origin", branch],
                           capture_output=True, text=True)
        if r.returncode == 0:
            print(f"Pushed to origin/{branch}")
            return True
        if i < retries - 1:
            print(f"Push attempt {i+1} failed, retrying in {wait}s…", file=sys.stderr)
            time.sleep(wait)
    print("All push attempts failed.", file=sys.stderr)
    return False


def main():
    os.makedirs(MAG_DIR, exist_ok=True)

    if this_month_has_issue():
        print(f"Issue for {TODAY.strftime('%B %Y')} already exists. Nothing to do.")
        return

    s = season(TODAY)
    iss = issue_number(TODAY)
    print(f"Generating {s} {TODAY.year} issue ({iss}) -> {FILENAME}")

    with open(OUTPATH, "w") as f:
        f.write(generate_html(TODAY))
    print(f"Written: {OUTPATH}")

    update_index(TODAY, s, iss)
    print("Index updated.")

    if not RUN_GIT:
        print("CI=true: skipping git operations (workflow handles commit/push).")
        return

    branch = subprocess.run(
        ["git", "-C", REPO, "rev-parse", "--abbrev-ref", "HEAD"],
        capture_output=True, text=True
    ).stdout.strip() or "main"

    git("add", os.path.join("magazines", FILENAME))
    git("add", os.path.join("magazines", "index.html"))
    git("commit", "-m",
        f"Add {s} {TODAY.year} magazine issue ({iss})\n\n"
        f"Auto-generated by generate_magazine.py on {TODAY.isoformat()}.\n\n"
        f"Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n"
        f"Claude-Session: https://claude.ai/code/session_014VsLg7vEoD1fQSzz3Nn6wA")
    push_with_retry(branch)


if __name__ == "__main__":
    main()
