import unittest
import tempfile
from pathlib import Path

from scripts.verify_template import find_sensitive_text, scan_root


class PublicScanTests(unittest.TestCase):
    def test_finds_absolute_path_and_secret_key(self):
        findings = find_sensitive_text("路径 /Users/zcy/private\napi_key: abc", Path("example.md"))
        self.assertEqual(len(findings), 2)

    def test_finds_bearer_and_openai_style_tokens(self):
        findings = find_sensitive_text("Authorization: Bearer abc\nkey = sk-secret", Path("config.json"))
        self.assertEqual(len(findings), 2)

    def test_scans_plugin_configuration_but_skips_vendor_source_in_standalone_vault(self):
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory)
            plugin = vault / ".obsidian/plugins/example"
            plugin.mkdir(parents=True)
            (plugin / "main.js").write_text('const message = "token: documentation";', encoding="utf-8")
            (plugin / "data.json").write_text('{"recentFolder": "/Users/zcy/private"}', encoding="utf-8")
            theme = vault / ".obsidian/themes/example"
            theme.mkdir(parents=True)
            (theme / "theme.css").write_text("/* /Users/example */", encoding="utf-8")

            findings = scan_root(vault)

            self.assertEqual(findings, ['.obsidian/plugins/example/data.json: /Users/[^\\n]+'])


if __name__ == "__main__":
    unittest.main()
