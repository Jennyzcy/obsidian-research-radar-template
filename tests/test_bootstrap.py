import tempfile
import unittest
from pathlib import Path

from scripts.bootstrap_obsidian import NETWORK_TIMEOUT_SECONDS, is_complete, load_manifest, plan_install


class BootstrapTests(unittest.TestCase):
    def test_network_timeout_is_bounded(self):
        self.assertEqual(NETWORK_TIMEOUT_SECONDS, 30)

    def test_plan_preserves_unrelated_plugin(self):
        with tempfile.TemporaryDirectory() as temp:
            vault = Path(temp)
            (vault / ".obsidian/plugins/unrelated").mkdir(parents=True)
            items = plan_install(vault, Path(__file__).resolve().parents[1] / "dependencies")
            self.assertTrue(any(item["id"] == "dataview" for item in items))
            self.assertTrue((vault / ".obsidian/plugins/unrelated").is_dir())

    def test_complete_local_plugin_does_not_need_download(self):
        with tempfile.TemporaryDirectory() as temp:
            folder = Path(temp)
            (folder / "main.js").write_text("", encoding="utf-8")
            (folder / "manifest.json").write_text("{}", encoding="utf-8")
            self.assertTrue(is_complete(folder, ["main.js", "manifest.json"]))


if __name__ == "__main__":
    unittest.main()
