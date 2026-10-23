#!/usr/bin/env python3
"""Merge a Home Assistant summary into home-energy/data/home.json.

Home Assistant sends a repository_dispatch event (type "home-energy-push")
with the summary as client_payload. The GitHub Action saves the payload to a
file and runs this script with its path.

Payload shape (all values optional except date):
  ts, date,
  now:      battery_soc, load_w, import_w, export_w, solar_w, battery_w,
            import_rate_p, export_rate_p
  today:    solar_kwh, import_kwh, export_kwh, load_kwh,
            battery_charge_kwh, battery_discharge_kwh
  forecast: solar_today_kwh, solar_tomorrow_kwh
  battery_control: mode, status
  yesterday_cost: import_gbp, export_gbp

Only whitelisted fields are kept, so nothing else sent by mistake can end up
on the public page.
"""
import json
import sys
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "home-energy" / "data" / "home.json"
KEEP_DAYS = 400

ALLOWED = {
    "now": ["battery_soc", "load_w", "import_w", "export_w", "solar_w", "battery_w",
            "import_rate_p", "export_rate_p"],
    "today": ["solar_kwh", "import_kwh", "export_kwh", "load_kwh",
              "battery_charge_kwh", "battery_discharge_kwh"],
    "forecast": ["solar_today_kwh", "solar_tomorrow_kwh"],
    "battery_control": ["mode", "status"],
    "yesterday_cost": ["import_gbp", "export_gbp"],
}


def num(v):
    """Numbers stay numbers; 'unavailable', '' and the like become None."""
    if v is None or isinstance(v, bool):
        return None
    if isinstance(v, (int, float)):
        return round(float(v), 3)
    try:
        return round(float(str(v).strip()), 3)
    except ValueError:
        return None


def clean(payload):
    out = {"ts": str(payload.get("ts", "")), "date": str(payload.get("date", ""))[:10]}
    for group, keys in ALLOWED.items():
        src = payload.get(group) or {}
        if group == "battery_control":
            out[group] = {k: str(src.get(k, ""))[:40] for k in keys}
        else:
            out[group] = {k: num(src.get(k)) for k in keys}
    return out


def main(path):
    payload = json.loads(Path(path).read_text())
    latest = clean(payload)
    if len(latest["date"]) != 10:
        sys.exit("Payload has no valid date; nothing written.")

    data = json.loads(DATA.read_text()) if DATA.exists() else {"days": []}
    days = {d["date"]: d for d in data.get("days", [])}
    days[latest["date"]] = {"date": latest["date"], **latest["today"]}

    data["latest"] = latest
    data["updated"] = latest["ts"]
    data["source"] = "Home Assistant"
    data["days"] = [days[k] for k in sorted(days)][-KEEP_DAYS:]

    DATA.write_text(json.dumps(data, indent=1) + "\n")
    print(f"Updated {latest['date']} ({len(data['days'])} days on file)")


if __name__ == "__main__":
    main(sys.argv[1])
