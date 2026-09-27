import tempfile
import unittest
from pathlib import Path

from scripts.build_sanitized_vault import build_template


class SanitizedVaultBuildTests(unittest.TestCase):
    def _make_source_vault(self, root):
        source = root / "source"
        settings = source / ".obsidian"
        (settings / "themes/Blue Topaz").mkdir(parents=True)
        (settings / "themes/Blue Topaz/theme.css").write_text("body {}", encoding="utf-8")
        (settings / "themes/Blue Topaz/manifest.json").write_text('{"name": "Blue Topaz"}', encoding="utf-8")
        plugin = settings / "plugins/dataview"
        plugin.mkdir(parents=True)
        (plugin / "main.js").write_text("module.exports = {};", encoding="utf-8")
        (plugin / "manifest.json").write_text('{"id": "dataview"}', encoding="utf-8")
        (plugin / "data.json").write_text('{"recentFolder": "/Users/zcy/private"}', encoding="utf-8")
        for name, payload in {
            "app.json": {},
            "appearance.json": {"cssTheme": "Blue Topaz"},
            "community-plugins.json": ["dataview", "missing-plugin"],
            "core-plugins.json": {},
        }.items():
            (settings / name).write_text(__import__("json").dumps(payload), encoding="utf-8")
        (settings / "workspace.json").write_text("{}", encoding="utf-8")
        (source / "主页.md").write_text("# 主页", encoding="utf-8")
        component = source / "03-工具集合/导航台/主页组件"
        component.mkdir(parents=True)
        (component / "view.js").write_text("dv.paragraph('home')", encoding="utf-8")
        (component / "view.css").write_text(".home {}", encoding="utf-8")
        templates = source / "07-模板/模板"
        templates.mkdir(parents=True)
        (templates / "课堂笔记模板.md").write_text("# 模板", encoding="utf-8")
        radar = source / "02-文献总结集合/论文雷达"
        radar.mkdir(parents=True)
        (radar / "论文雷达早报模板.md").write_text("# 早报", encoding="utf-8")
        (radar / "论文雷达周报模板.md").write_text("# 周报", encoding="utf-8")
        private_attachment = source / "附件"
        private_attachment.mkdir()
        (private_attachment / "private.pdf").write_text("private", encoding="utf-8")
        (source / ".copilot").mkdir()
        return source

    def test_build_rejects_nonempty_destination(self):
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory) / "stage"
            destination.mkdir()
            (destination / "keep.txt").write_text("do not overwrite", encoding="utf-8")

            with self.assertRaisesRegex(ValueError, "empty"):
                build_template(Path(directory) / "source", destination)

    def test_build_keeps_real_interface_and_removes_local_paths(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            stage = root / "stage"
            source = self._make_source_vault(root)

            build_template(source, stage)

            self.assertEqual((stage / "主页.md").read_text(encoding="utf-8"), "# 主页")
            self.assertTrue((stage / "03-工具集合/导航台/主页组件/view.js").is_file())
            self.assertTrue((stage / ".obsidian/themes/Blue Topaz/theme.css").is_file())
            self.assertTrue((stage / ".obsidian/plugins/dataview/main.js").is_file())
            self.assertFalse((stage / ".obsidian/workspace.json").exists())
            enabled_plugins = __import__("json").loads(
                (stage / ".obsidian/community-plugins.json").read_text(encoding="utf-8")
            )
            self.assertEqual(enabled_plugins, ["dataview"])
            plugin_data = (stage / ".obsidian/plugins/dataview/data.json").read_text(encoding="utf-8")
            self.assertNotIn("/Users/zcy", plugin_data)

    def test_build_excludes_private_content_and_keeps_radar_structure(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            stage = root / "stage"

            build_template(self._make_source_vault(root), stage)

            self.assertFalse((stage / "附件").exists())
            self.assertFalse((stage / ".copilot").exists())
            self.assertTrue((stage / "02-文献总结集合/论文雷达/assets/.gitkeep").is_file())


if __name__ == "__main__":
    unittest.main()
