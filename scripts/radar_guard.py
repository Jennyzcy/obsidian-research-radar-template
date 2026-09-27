"""论文雷达输出命名、历史扫描和去重辅助工具。"""

import argparse
import re
from datetime import date, timedelta
from pathlib import Path


RADAR_ROOT = Path("02-文献") / "论文雷达"
WEEKDAY_NAMES = ("周一", "周二", "周三", "周四", "周五", "周六", "周日")


def _week_span(day):
    monday = day - timedelta(days=day.weekday())
    sunday = monday + timedelta(days=6)
    iso_year, iso_week, _ = day.isocalendar()
    return iso_year, iso_week, monday, sunday


def daily_path(root, day):
    return Path(root) / RADAR_ROOT / "01-每日推送" / day.strftime("%Y-%m") / (day.strftime("%Y-%m-%d") + "_" + WEEKDAY_NAMES[day.weekday()] + "_论文雷达早报.md")


def weekly_path(root, day):
    iso_year, iso_week, monday, sunday = _week_span(day)
    name = "{0}-W{1:02d}_{2}至{3}_论文雷达周报.md".format(iso_year, iso_week, monday.strftime("%m-%d"), sunday.strftime("%m-%d"))
    return Path(root) / RADAR_ROOT / "02-每周精选" / str(iso_year) / name


def zotero_path(root, day):
    iso_year, iso_week, monday, sunday = _week_span(day)
    name = "{0}-W{1:02d}_{2}至{3}_Zotero待入库.md".format(iso_year, iso_week, monday.strftime("%m-%d"), sunday.strftime("%m-%d"))
    return Path(root) / RADAR_ROOT / "03-Zotero待入库" / name


def ensure_new(path):
    path = Path(path)
    if path.exists():
        raise FileExistsError("目标已存在，不覆盖：{0}".format(path))
    return path


def normalize_doi(value):
    value = str(value or "").strip().lower()
    value = re.sub(r"^https?://(dx\.)?doi\.org/", "", value)
    return value.rstrip(". ")


def normalize_title(value):
    return re.sub(r"[^\w]+", "", str(value or "").casefold(), flags=re.UNICODE)


def is_duplicate(candidate, history):
    candidate_dois = {normalize_doi(candidate.get(key)) for key in ("doi", "related_doi")} - {""}
    candidate_title = normalize_title(candidate.get("title"))
    for item in history:
        known_dois = {normalize_doi(item.get(key)) for key in ("doi", "related_doi")} - {""}
        if candidate_dois & known_dois:
            return True
        if candidate_title and candidate_title == normalize_title(item.get("title")):
            return True
    return False


def scan_history(root):
    records = []
    for path in (Path(root) / RADAR_ROOT).glob("**/*.md"):
        text = path.read_text(encoding="utf-8", errors="replace")
        title = re.search(r"^# .*?[｜|]?(.*)$", text, flags=re.MULTILINE)
        doi = re.search(r"^[-*] \*\*DOI：\*\*\s*(.+)$", text, flags=re.MULTILINE)
        related = re.search(r"^[-*] \*\*相关版本 DOI：\*\*\s*(.+)$", text, flags=re.MULTILINE)
        records.append({"title": title.group(1).strip() if title else path.stem, "doi": doi.group(1).strip() if doi else "", "related_doi": related.group(1).strip() if related else "", "path": str(path)})
    return records


def main():
    parser = argparse.ArgumentParser(description="输出论文雷达安全路径")
    parser.add_argument("kind", choices=("daily", "weekly", "zotero"))
    parser.add_argument("--root", default=".")
    parser.add_argument("--date", default=date.today().isoformat())
    args = parser.parse_args()
    day = date.fromisoformat(args.date)
    paths = {"daily": daily_path, "weekly": weekly_path, "zotero": zotero_path}
    target = ensure_new(paths[args.kind](args.root, day))
    print(target)


if __name__ == "__main__":
    main()
