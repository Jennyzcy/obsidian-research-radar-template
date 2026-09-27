import tempfile
import unittest
from datetime import date
from pathlib import Path

from scripts.radar_guard import daily_path, ensure_new, is_duplicate, weekly_path, zotero_path


class RadarGuardTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)

    def tearDown(self):
        self.temp.cleanup()

    def test_daily_path_refuses_existing_target(self):
        target = daily_path(self.root, date(2026, 9, 28))
        target.parent.mkdir(parents=True)
        target.write_text("已有内容", encoding="utf-8")

        with self.assertRaises(FileExistsError):
            ensure_new(target)

    def test_weekly_paths_use_iso_year_at_new_year_boundary(self):
        day = date(2021, 1, 1)

        self.assertIn("2020-W53", weekly_path(self.root, day).name)
        self.assertIn("2020-W53", zotero_path(self.root, day).name)

    def test_duplicate_matches_related_doi_or_normalized_title(self):
        history = [{"doi": "10.1000/formal", "related_doi": "10.1000/preprint", "title": "A Study: of Cells"}]

        self.assertTrue(is_duplicate({"doi": "https://doi.org/10.1000/preprint", "title": "other"}, history))
        self.assertTrue(is_duplicate({"doi": "", "title": "a study of cells"}, history))
        self.assertFalse(is_duplicate({"doi": "10.1000/new", "title": "New result"}, history))


if __name__ == "__main__":
    unittest.main()
