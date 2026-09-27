import unittest
from pathlib import Path

from scripts.verify_template import find_sensitive_text


class PublicScanTests(unittest.TestCase):
    def test_finds_absolute_path_and_secret_key(self):
        findings = find_sensitive_text("路径 /Users/zcy/private\napi_key: abc", Path("example.md"))
        self.assertEqual(len(findings), 2)


if __name__ == "__main__":
    unittest.main()
