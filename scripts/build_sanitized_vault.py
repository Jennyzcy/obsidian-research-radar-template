"""Build a reusable, privacy-safe copy of an Obsidian vault.

The source vault is read-only input.  This program writes only to an empty
destination selected by the caller, so it can be inspected before replacing
the repository's published vault-template directory.
"""
import argparse
import json
import shutil
from pathlib import Path
from typing import Iterable, List


SETTINGS_ALLOWLIST = {
    "app.json",
    "appearance.json",
    "community-plugins.json",
    "core-plugins.json",
    "image-converter-image-alignments.json",
    "templates.json",
    "types.json",
}
SETTINGS_DENYLIST = {
    "graph.json",
    "workspace.json",
    "workspace-mobile.json",
    "workspaces.json",
}
SENSITIVE_KEY_PARTS = ("api_key", "apikey", "authorization", "cookie", "password", "secret", "token")
SKELETON_DIRECTORIES = (
    "00-知识库待审查",
    "01-专业名词集合",
    "02-文献总结集合/论文雷达/01-每日推送",
    "02-文献总结集合/论文雷达/02-每周精选",
    "02-文献总结集合/论文雷达/03-Zotero待入库",
    "03-工具集合",
    "04-学习集合",
    "05-组会学习",
    "06-课程集合",
    "07-模板/模板",
    "08-单词积累",
    "Clippings",
    "Tags",
    "Users",
    "复习卡片",
)
CONTENT_FILES = (
    "主页.md",
    "02-文献总结集合/论文雷达/论文雷达早报模板.md",
    "02-文献总结集合/论文雷达/论文雷达周报模板.md",
)
CONTENT_DIRECTORIES = (
    "03-工具集合/导航台/主页组件",
    "07-模板/模板",
)


def _ignore_names(_: str, names: Iterable[str]):
    return {name for name in names if name in {".DS_Store", ".Rhistory", "__pycache__"} or name.endswith(".pyc")}


def _copy_tree(source: Path, destination: Path) -> None:
    if not source.is_dir():
        raise FileNotFoundError("missing required directory: {0}".format(source))
    shutil.copytree(str(source), str(destination), ignore=_ignore_names)


def _sanitize_value(value):
    if isinstance(value, dict):
        return {
            key: _sanitize_value(item)
            for key, item in value.items()
            if not any(part in key.lower().replace("-", "_") for part in SENSITIVE_KEY_PARTS)
        }
    if isinstance(value, list):
        return [_sanitize_value(item) for item in value]
    return value


def _copy_json_safely(source: Path, destination: Path) -> None:
    data = json.loads(source.read_text(encoding="utf-8"))
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(
        json.dumps(_sanitize_value(data), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def _copy_plugins(source: Path, destination: Path) -> None:
    _copy_tree(source, destination)
    for config_path in destination.rglob("data.json"):
        source_config = source / config_path.relative_to(destination)
        _copy_json_safely(source_config, config_path)


def _copy_allowed_settings(source: Path, destination: Path) -> None:
    for name in SETTINGS_ALLOWLIST:
        source_path = source / name
        if source_path.is_file():
            _copy_json_safely(source_path, destination / name)
    snippets = source / "snippets"
    if snippets.is_dir():
        _copy_tree(snippets, destination / "snippets")


def _copy_reusable_content(source: Path, destination: Path) -> None:
    for relative in SKELETON_DIRECTORIES:
        folder = destination / relative
        folder.mkdir(parents=True, exist_ok=True)
        (folder / ".gitkeep").touch()
    for relative in CONTENT_FILES:
        source_path = source / relative
        if not source_path.is_file():
            raise FileNotFoundError("missing required file: {0}".format(source_path))
        destination_path = destination / relative
        destination_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(str(source_path), str(destination_path))
    for relative in CONTENT_DIRECTORIES:
        _copy_tree(source / relative, destination / relative)


def build_template(source: Path, destination: Path) -> List[Path]:
    """Create a sanitized vault at an empty destination and return its paths."""
    source = Path(source)
    destination = Path(destination)
    if destination.exists() and any(destination.iterdir()):
        raise ValueError("destination must be empty")
    if not source.is_dir():
        raise FileNotFoundError("source vault does not exist: {0}".format(source))
    if source.resolve() == destination.resolve():
        raise ValueError("destination must not be the source vault")

    destination.mkdir(parents=True, exist_ok=True)
    obsidian_source = source / ".obsidian"
    obsidian_destination = destination / ".obsidian"
    _copy_tree(obsidian_source / "themes", obsidian_destination / "themes")
    _copy_plugins(obsidian_source / "plugins", obsidian_destination / "plugins")
    _copy_allowed_settings(obsidian_source, obsidian_destination)
    _copy_reusable_content(source, destination)
    return sorted(destination.rglob("*"))


def main() -> int:
    parser = argparse.ArgumentParser(description="构建 Obsidian Vault 脱敏副本")
    parser.add_argument("--source", required=True, type=Path, help="只读源 Vault")
    parser.add_argument("--destination", required=True, type=Path, help="必须为空的暂存目录")
    arguments = parser.parse_args()
    files = build_template(arguments.source, arguments.destination)
    print("已在 {0} 构建 {1} 个路径。".format(arguments.destination, len(files)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
