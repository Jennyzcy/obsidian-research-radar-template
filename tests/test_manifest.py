import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_PLUGIN_IDS = {
    "dataview",
    "homepage",
    "calendar-beta",
    "quickadd",
    "obsidian-tasks-plugin",
    "obsidian-spaced-repetition",
    "omnisearch",
    "obsidian-meta-bind-plugin",
    "gentle-pomo",
    "task-hub",
    "copilot",
}


class ManifestTests(unittest.TestCase):
    def test_plugin_manifest_has_unique_ids_and_https_release_sources(self):
        path = ROOT / "dependencies" / "plugins.json"
        with path.open(encoding="utf-8") as handle:
            manifest = json.load(handle)

        plugins = manifest["plugins"]
        ids = [item["id"] for item in plugins]

        self.assertEqual(len(ids), len(set(ids)))
        self.assertTrue(REQUIRED_PLUGIN_IDS.issubset(set(ids)))
        self.assertTrue(all(item["release_url"].startswith("https://") for item in plugins))
        self.assertTrue(all(item["files"] for item in plugins))

    def test_theme_manifest_has_blue_topaz_from_https_source(self):
        path = ROOT / "dependencies" / "themes.json"
        with path.open(encoding="utf-8") as handle:
            manifest = json.load(handle)

        self.assertEqual(manifest["themes"][0]["id"], "Blue Topaz")
        self.assertTrue(manifest["themes"][0]["release_url"].startswith("https://"))


if __name__ == "__main__":
    unittest.main()
