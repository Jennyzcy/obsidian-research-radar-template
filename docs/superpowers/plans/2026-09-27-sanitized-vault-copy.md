# 完整 Obsidian Vault 脱敏副本实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用不触碰源 Vault 的方式，在 `vault-template/` 交付一个可直接打开、视觉和插件配置与源 Vault 一致的脱敏副本。

**Architecture:** 新增一个仅从显式白名单复制的构建脚本。脚本先在调用方指定的空临时目录产生副本，再由公开扫描器和结构测试验证；只有所有检查通过，才以 Git 可恢复的方式替换仓库的 `vault-template/`。源 Vault 永远只读。

**Tech Stack:** Python 3 标准库、unittest、Git、Obsidian 本机应用。

**Spec:** `docs/superpowers/specs/2026-09-27-obsidian-research-radar-template-design.md`

## Global Constraints

- 不得写入、删除、移动或重命名源 Vault `/Users/zcy/Library/Mobile Documents/iCloud~md~obsidian/Documents/学习记录` 中的文件。
- 仅替换新仓库 `vault-template/`；仓库根目录 `.obsidian/` 不纳入交付物且保持不变。
- 只复制白名单内的主题、插件、设置、主页、真实主页组件、模板和目录骨架。
- 排除工作区状态、图谱状态、备份、同步状态、回收站、批注、Copilot 对话、历史雷达输出、附件、私人笔记、本机路径和密钥。
- 不用联网下载补全源 Vault 已有插件或主题；复制完成后由用户在 Obsidian 确认社区插件信任。
- 所有 Markdown 文件与 JSON 设置文件都必须经公开扫描；检测到源 Vault 绝对路径或疑似密钥则失败。

## Review Focus

- 源 Vault 路径出现在主页组件或插件设置中时，构建必须失败而不是发布。
- 使用者打开副本时，`appearance.json`、社区插件清单和主题目录必须与源 Vault 当前配置相符。
- 私人历史文献雷达、附件和 Copilot 会话不能通过目录骨架或通配复制混入副本。
- 缺少主页引用的通用目录时，主页组件应安全降级，不应抛出 DataviewJS 错误。
- 构建目标非空或不是明确的临时目录时，构建脚本必须拒绝覆盖。

### Task 1: 建立脱敏副本构建器及其失败测试

**Files:**
- Create: `scripts/build_sanitized_vault.py`
- Create: `tests/test_build_sanitized_vault.py`

**Interfaces:**
- Consumes: `source: pathlib.Path`, `destination: pathlib.Path`
- Produces: `build_template(source: Path, destination: Path) -> list[Path]`

- [ ] **Step 1: 写入失败测试**

```python
def test_build_rejects_nonempty_destination(tmp_path):
    destination = tmp_path / "stage"
    destination.mkdir()
    (destination / "keep.txt").write_text("do not overwrite", encoding="utf-8")
    with pytest.raises(ValueError, match="empty"):
        build_template(source_vault, destination)
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest tests/test_build_sanitized_vault.py -v`

Expected: FAIL，因为 `build_sanitized_vault` 尚不存在。

- [ ] **Step 3: 实现最小白名单复制器**

```python
def build_template(source: Path, destination: Path) -> list[Path]:
    if destination.exists() and any(destination.iterdir()):
        raise ValueError("destination must be empty")
    destination.mkdir(parents=True, exist_ok=True)
    copy_tree(source / ".obsidian/themes", destination / ".obsidian/themes")
    copy_tree(source / ".obsidian/plugins", destination / ".obsidian/plugins")
    copy_allowed_settings(source / ".obsidian", destination / ".obsidian")
    copy_reusable_content(source, destination)
    return sorted(destination.rglob("*"))
```

- [ ] **Step 4: 运行定向测试并确认通过**

Run: `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest tests/test_build_sanitized_vault.py -v`

Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add scripts/build_sanitized_vault.py tests/test_build_sanitized_vault.py
git commit -m "feat: build sanitized vault copy"
```

### Task 2: 固化完整配置和主页真实性

**Files:**
- Modify: `scripts/build_sanitized_vault.py`
- Modify: `tests/test_build_sanitized_vault.py`
- Modify: `tests/test_template_structure.py`

**Interfaces:**
- Consumes: source `.obsidian/appearance.json`, `community-plugins.json`, themes, plugins, `主页.md`, `03-工具集合/导航台/主页组件/`
- Produces: 验证过的、与源一致的设置和主页组件哈希。

- [ ] **Step 1: 写入失败测试**

```python
def test_build_copies_real_homepage_themes_and_source_plugins(tmp_path):
    build_template(source_vault, tmp_path / "stage")
    assert (stage / "主页.md").read_bytes() == (source_vault / "主页.md").read_bytes()
    assert (stage / ".obsidian/themes/Blue Topaz/theme.css").exists()
    assert (stage / ".obsidian/themes/AnuPpuccin/theme.css").exists()
    assert (stage / ".obsidian/themes/Things/theme.css").exists()
    assert plugin_ids(stage) == plugin_ids(source_vault)
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest tests/test_build_sanitized_vault.py -v`

Expected: FAIL，直到白名单覆盖源 Vault 的真实主题、插件和主页组件。

- [ ] **Step 3: 实现可公开配置过滤和路径改写**

```python
SETTINGS_ALLOWLIST = {"app.json", "appearance.json", "community-plugins.json", "core-plugins.json", "templates.json", "types.json"}
SETTINGS_DENYLIST = {"workspace.json", "workspace-mobile.json", "workspaces.json", "graph.json"}
CONTENT_ALLOWLIST = {"主页.md", "03-工具集合/导航台/主页组件", "07-模板/模板", "02-文献总结集合/论文雷达/论文雷达早报模板.md", "02-文献总结集合/论文雷达/论文雷达周报模板.md"}
```

- [ ] **Step 4: 运行定向测试并确认通过**

Run: `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest tests/test_build_sanitized_vault.py tests/test_template_structure.py -v`

Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add scripts/build_sanitized_vault.py tests/test_build_sanitized_vault.py tests/test_template_structure.py
git commit -m "feat: preserve source vault interface"
```

### Task 3: 建立目录骨架和公开内容扫描

**Files:**
- Modify: `scripts/build_sanitized_vault.py`
- Modify: `scripts/verify_template.py`
- Modify: `tests/test_public_scan.py`
- Modify: `tests/test_build_sanitized_vault.py`

**Interfaces:**
- Consumes: 构建后的 `vault-template/`
- Produces: `verify_template.py` 的零退出码，或带精确文件路径的阻断错误。

- [ ] **Step 1: 写入失败测试**

```python
def test_build_excludes_private_content_and_retains_empty_structure(tmp_path):
    build_template(source_vault, tmp_path / "stage")
    assert not (stage / "附件").exists()
    assert not (stage / "copilot").exists()
    assert (stage / "02-文献总结集合/论文雷达/01-每日推送/.gitkeep").exists()
    assert (stage / "06-课程集合/.gitkeep").exists()
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest tests/test_build_sanitized_vault.py tests/test_public_scan.py -v`

Expected: FAIL，直到私有目录排除和空目录骨架实现。

- [ ] **Step 3: 实现排除规则和扫描规则**

```python
PRIVATE_NAMES = {".copilot", "copilot", ".trash", ".sync-tools", ".sync-backups", ".obsidian-annotations", "附件", "Clippings"}
SKELETONS = ("00-知识库待审查", "01-专业名词集合", "02-文献总结集合/论文雷达/01-每日推送", "06-课程集合", "08-单词积累")
```

扫描器检查 UTF-8 文本中是否含源 Vault 绝对路径、`api_key`、`authorization`、`bearer `、`sk-`、`token` 或 `password`；第三方压缩/二进制文件按扩展名跳过。

- [ ] **Step 4: 运行定向测试并确认通过**

Run: `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest tests/test_build_sanitized_vault.py tests/test_public_scan.py -v`

Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add scripts/build_sanitized_vault.py scripts/verify_template.py tests/test_public_scan.py tests/test_build_sanitized_vault.py
git commit -m "feat: scan sanitized vault public boundary"
```

### Task 4: 生成副本并安全替换交付目录

**Files:**
- Modify: `vault-template/`（以通过验证的暂存副本完整替换）
- Modify: `.gitignore`
- Modify: `docs/INSTALL.md`
- Modify: `docs/PRIVACY_AND_LICENSES.md`

**Interfaces:**
- Consumes: `/tmp` 中的通过验证的暂存副本
- Produces: 仓库内可直接打开的 `vault-template/` 和准确中文说明。

- [ ] **Step 1: 写入失败测试**

```python
def test_repository_template_matches_build_output_and_has_no_workspace_state():
    assert sha256_tree(repo / "vault-template") == sha256_tree(staged_copy)
    assert not (repo / "vault-template/.obsidian/workspace.json").exists()
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -p 'test_*.py' -v`

Expected: FAIL，直到仓库交付目录由已验证的暂存副本替换。

- [ ] **Step 3: 构建、扫描、再替换**

```bash
PYTHONDONTWRITEBYTECODE=1 python3 scripts/build_sanitized_vault.py --source "$SOURCE" --destination "$STAGE"
PYTHONDONTWRITEBYTECODE=1 python3 scripts/verify_template.py "$STAGE"
# 仅在两项成功后，以明确的 vault-template 路径替换，不触碰 source 或仓库根 .obsidian。
```

- [ ] **Step 4: 运行完整验证并确认通过**

Run: `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -p 'test_*.py' -v && PYTHONDONTWRITEBYTECODE=1 python3 scripts/verify_template.py`

Expected: 所有测试和公开扫描 PASS。

- [ ] **Step 5: 提交**

```bash
git add .gitignore vault-template docs/INSTALL.md docs/PRIVACY_AND_LICENSES.md tests
git commit -m "feat: replace template with sanitized vault copy"
```

### Task 5: Obsidian 手动验收与清理

**Files:**
- Modify: `docs/INSTALL.md`（仅在实际验收需要记录时）

- [ ] **Step 1: 打开仓库中的交付 Vault**

Run: `open -a Obsidian "$REPOSITORY/vault-template"`

Expected: Obsidian 能识别 Vault，显示 Blue Topaz 当前外观和真实主页。

- [ ] **Step 2: 检查主页和插件**

确认主页能够加载；设置中可见源 Vault 当前社区插件、三个主题目录和当前主题配置；没有工作区布局、Copilot 历史或私人笔记。

- [ ] **Step 3: 清理本轮临时目录与可再生缓存**

仅删除已经成功验证且位于 `/tmp` 的本轮暂存副本/测试缓存；保留 Git 提交、源 Vault 和仓库根目录 `.obsidian/`。

- [ ] **Step 4: 最终状态与提交核对**

Run: `git status --short && git log -1 --oneline`

Expected: 只存在用户原有的仓库根 `.obsidian/` 未跟踪状态，或用户明确要求保留的状态；交付内容已提交。
