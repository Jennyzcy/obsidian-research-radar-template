import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VAULT = ROOT / "vault-template"


class TemplateStructureTests(unittest.TestCase):
    def test_homepage_references_existing_dataview_view(self):
        home = (VAULT / "主页.md").read_text(encoding="utf-8")
        self.assertIn('dv.view("03-工具/导航台/主页组件")', home)
        self.assertTrue((VAULT / "03-工具/导航台/主页组件/view.js").is_file())
        self.assertTrue((VAULT / "03-工具/导航台/主页组件/view.css").is_file())

    def test_enabled_plugins_are_declared_dependencies(self):
        enabled = json.loads((VAULT / ".obsidian/community-plugins.json").read_text(encoding="utf-8"))
        manifest = json.loads((ROOT / "dependencies/plugins.json").read_text(encoding="utf-8"))
        declared = {item["id"] for item in manifest["plugins"]}
        self.assertTrue(set(enabled).issubset(declared))

    def test_all_declared_plugins_and_theme_are_bundled(self):
        manifest = json.loads((ROOT / "dependencies/plugins.json").read_text(encoding="utf-8"))
        for plugin in manifest["plugins"]:
            folder = VAULT / ".obsidian/plugins" / plugin["id"]
            self.assertTrue((folder / "main.js").is_file(), plugin["id"])
            self.assertTrue((folder / "manifest.json").is_file(), plugin["id"])
        theme = VAULT / ".obsidian/themes/Blue Topaz"
        self.assertTrue((theme / "theme.css").is_file())
        self.assertTrue((theme / "manifest.json").is_file())


if __name__ == "__main__":
    unittest.main()
