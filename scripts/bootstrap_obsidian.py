"""安全安装模板声明的 Obsidian 主题和社区插件。"""
import argparse
import json
import shutil
import tempfile
from pathlib import Path
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parents[1]


def load_manifest(path):
    with Path(path).open(encoding="utf-8") as handle:
        return json.load(handle)


def plan_install(vault, dependencies):
    vault = Path(vault)
    plugins = load_manifest(Path(dependencies) / "plugins.json")["plugins"]
    themes = load_manifest(Path(dependencies) / "themes.json")["themes"]
    plugin_items = [{"id": item["id"], "kind": "plugin", "target": vault / ".obsidian/plugins" / item["id"], "entry": item} for item in plugins]
    theme_items = [{"id": item["id"], "kind": "theme", "target": vault / ".obsidian/themes" / item["id"], "entry": item} for item in themes]
    return plugin_items + theme_items


def _download(url, destination):
    with urlopen(url) as response, destination.open("wb") as handle:
        shutil.copyfileobj(response, handle)


def install_all(vault, dependencies):
    for item in plan_install(vault, dependencies):
        entry, target = item["entry"], item["target"]
        with tempfile.TemporaryDirectory() as temp:
            temp = Path(temp)
            if item["kind"] == "theme":
                assets = {name: entry["raw_base_url"] + "/" + name for name in entry["files"]}
            else:
                release = load_manifest_from_url(entry["release_url"])
                assets = {asset["name"]: asset["browser_download_url"] for asset in release["assets"]}
                missing = [name for name in entry["files"] if name not in assets]
                if missing:
                    raise RuntimeError("{0} 发布缺少文件：{1}".format(entry["id"], ", ".join(missing)))
            for name in entry["files"]:
                _download(assets[name], temp / name)
            target.parent.mkdir(parents=True, exist_ok=True)
            if target.exists():
                shutil.rmtree(str(target))
            shutil.move(str(temp), str(target))


def load_manifest_from_url(url):
    with urlopen(url) as response:
        return json.loads(response.read().decode("utf-8"))


def main():
    parser = argparse.ArgumentParser(description="安装 Obsidian 模板依赖")
    parser.add_argument("vault", type=Path)
    parser.add_argument("--apply", action="store_true", help="实际写入；默认仅显示计划")
    args = parser.parse_args()
    items = plan_install(args.vault, ROOT / "dependencies")
    for item in items:
        print("{0} -> {1}".format(item["id"], item["target"]))
    if args.apply:
        install_all(args.vault, ROOT / "dependencies")
        print("插件已下载；请重启 Obsidian 并确认第三方插件信任。")
    else:
        print("这是预览；确认后加 --apply 才会写入。")


if __name__ == "__main__":
    main()
