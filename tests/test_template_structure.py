import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VAULT = ROOT / "vault-template"


class TemplateStructureTests(unittest.TestCase):
    def test_homepage_references_existing_dataview_view(self):
        home = (VAULT / "主页.md").read_text(encoding="utf-8")
        self.assertIn('dv.view("03-工具集合/导航台/主页组件")', home)
        self.assertTrue((VAULT / "03-工具集合/导航台/主页组件/view.js").is_file())
        self.assertTrue((VAULT / "03-工具集合/导航台/主页组件/view.css").is_file())

    def test_enabled_plugins_are_bundled(self):
        enabled = json.loads((VAULT / ".obsidian/community-plugins.json").read_text(encoding="utf-8"))
        expected = {"calendar", "dataview", "editing-toolbar", "formatto-format", "modal-opener", "obsidian42-brat", "yh-inklight"}
        self.assertEqual(set(enabled), expected)
        for plugin_id in enabled:
            folder = VAULT / ".obsidian/plugins" / plugin_id
            self.assertTrue((folder / "main.js").is_file(), plugin_id)
            self.assertTrue((folder / "manifest.json").is_file(), plugin_id)

    def test_source_themes_and_current_appearance_are_bundled(self):
        appearance = json.loads((VAULT / ".obsidian/appearance.json").read_text(encoding="utf-8"))
        self.assertEqual(appearance["cssTheme"], "Blue Topaz")
        for name in ("AnuPpuccin", "Blue Topaz", "Things"):
            theme = VAULT / ".obsidian/themes" / name
            self.assertTrue((theme / "theme.css").is_file(), name)
            self.assertTrue((theme / "manifest.json").is_file(), name)


if __name__ == "__main__":
    unittest.main()
