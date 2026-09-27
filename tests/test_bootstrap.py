import tempfile
import unittest
from pathlib import Path

from scripts.bootstrap_obsidian import load_manifest, plan_install


class BootstrapTests(unittest.TestCase):
    def test_plan_preserves_unrelated_plugin(self):
        with tempfile.TemporaryDirectory() as temp:
            vault = Path(temp)
            (vault / ".obsidian/plugins/unrelated").mkdir(parents=True)
            items = plan_install(vault, Path(__file__).resolve().parents[1] / "dependencies")
            self.assertTrue(any(item["id"] == "dataview" for item in items))
            self.assertTrue((vault / ".obsidian/plugins/unrelated").is_dir())


if __name__ == "__main__":
    unittest.main()
