import tempfile
import unittest
from pathlib import Path

from scripts.build_sanitized_vault import build_template


class SanitizedVaultBuildTests(unittest.TestCase):
    def test_build_rejects_nonempty_destination(self):
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory) / "stage"
            destination.mkdir()
            (destination / "keep.txt").write_text("do not overwrite", encoding="utf-8")

            with self.assertRaisesRegex(ValueError, "empty"):
                build_template(Path(directory) / "source", destination)


if __name__ == "__main__":
    unittest.main()
