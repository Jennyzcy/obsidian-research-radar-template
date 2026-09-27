"""检查公开模板中是否混入敏感内容。"""
import re
import sys
from pathlib import Path


PATTERNS = (r"/Users/[^\n]+", r"\b(api[_-]?key|token|password)\s*[:=]")


def find_sensitive_text(text, path):
    return ["{0}: {1}".format(path, pattern) for pattern in PATTERNS if re.search(pattern, text, re.I)]


def main():
    root = Path(__file__).resolve().parents[1]
    findings = []
    for path in root.rglob("*"):
        if path.is_file() and path != Path(__file__).resolve() and ".git" not in path.parts and ".superpowers" not in path.parts and "tests" not in path.parts:
            try:
                findings.extend(find_sensitive_text(path.read_text(encoding="utf-8"), path.relative_to(root)))
            except UnicodeDecodeError:
                continue
    print("\n".join(findings) if findings else "公开扫描通过：未发现常见敏感内容。")
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
