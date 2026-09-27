"""检查公开模板中是否混入敏感内容。"""
import re
import sys
from pathlib import Path


PATTERNS = (
    r"/Users/[^\n]+",
    r"\b(api[_-]?key|token|password|secret)\s*[:=]",
    r"\bauthorization\s*:\s*bearer\s+\S+",
    r"\bsk-[A-Za-z0-9_-]+",
)


def find_sensitive_text(text, path):
    return ["{0}: {1}".format(path, pattern) for pattern in PATTERNS if re.search(pattern, text, re.I)]


def _should_scan(path, root):
    relative = path.relative_to(root)
    if ".git" in relative.parts or ".superpowers" in relative.parts or "tests" in relative.parts:
        return False
    is_vendor_code = ".obsidian" in relative.parts and (
        "themes" in relative.parts or ("plugins" in relative.parts and path.name != "data.json")
    )
    return not is_vendor_code


def scan_root(root):
    findings = []
    for path in root.rglob("*"):
        if path.is_file() and path != Path(__file__).resolve() and _should_scan(path, root):
            try:
                findings.extend(find_sensitive_text(path.read_text(encoding="utf-8"), path.relative_to(root)))
            except UnicodeDecodeError:
                continue
    return findings


def main(arguments=None):
    root = Path(arguments[0]).resolve() if arguments else Path(__file__).resolve().parents[1]
    findings = scan_root(root)
    print("\n".join(findings) if findings else "公开扫描通过：未发现常见敏感内容。")
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
