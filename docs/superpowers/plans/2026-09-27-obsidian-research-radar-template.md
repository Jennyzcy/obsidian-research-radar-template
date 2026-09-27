# Obsidian 研究主页与论文雷达模板 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 交付一个中文、可公开发布、可复用的 Obsidian 主页与论文雷达模板仓库。

**Architecture:** `vault-template` 保存可移植的 Obsidian 内容，`dependencies` 声明从官方上游安装的第三方依赖，`scripts` 负责安装、命名去重和隐私扫描，`automation` 提供可复制的 Codex Desktop 提示词。所有 vault 引用使用相对路径。

**Tech Stack:** Markdown、Obsidian、DataviewJS、CSS、Python 3 标准库、unittest、GitHub Releases。

**Spec:** `docs/superpowers/specs/2026-09-27-obsidian-research-radar-template-design.md`

## Global Constraints

- 用户说明使用中文，软件标识符保留英文。
- 不提交私人笔记、输出、图片、Zotero 数据、绝对路径、项目 ID、凭据或第三方二进制。
- 安装器仅操作显式传入的 vault，默认 `--dry-run`，仅 `--apply` 写入。
- 同名雷达输出不得覆盖；Zotero 不自动写入。
- 缺少可选插件时主页仍可显示。

## Review Focus

- 已有个人 vault 被误指定为目标时，安装器不删除任何内容且必须显示写入计划。
- 上游发布缺少预期文件时，安装器不留下半安装插件。
- 跨年 ISO 周、同名文件和 DOI/题名差异均不能绕过防重复逻辑。
- 主页引用的视图、目录和启用插件必须实际存在且相互匹配。
- 公开扫描必须拦截原 vault 名、绝对路径和常见敏感键。

---

### Task 1: 仓库骨架与依赖清单

**Files:**
- Create: `README.md`, `LICENSE`, `.gitignore`, `dependencies/plugins.json`, `dependencies/themes.json`, `tests/test_manifest.py`

**Interfaces:**
- Produces: `load_manifest(path: Path) -> dict`，供安装器和结构测试使用。

- [ ] 先创建 `test_manifest.py`，断言插件 ID 唯一、每个发布地址为 HTTPS、必需插件齐全；运行它并确认因清单/读取函数不存在而失败。
- [ ] 创建可审计的主题和插件清单、中文 README、MIT 许可证和忽略规则；每个条目保存 ID、版本、上游 release URL、所需文件、用途与许可证 URL。
- [ ] 重新运行 `python3 -m unittest tests.test_manifest -v`，确认通过后提交 `feat: add portable template manifest`。

### Task 2: 论文雷达安全脚本

**Files:**
- Create: `scripts/radar_guard.py`, `tests/test_radar_guard.py`

**Interfaces:**
- Produces: `daily_path(root, day)`, `weekly_path(root, day)`, `zotero_path(root, day)`, `ensure_new(path)`, `scan_history(root)` 与 `is_duplicate(candidate, history)`。

- [ ] 先写测试：已有目标文件必须引发 `FileExistsError`；跨年 ISO 周格式正确；规范化 DOI、题名和关联版本可发现重复。运行测试并确认因模块不存在而失败。
- [ ] 以最小实现提供路径、拒绝覆盖和历史扫描 CLI；输出使用相对模板目录，不接触 Zotero。
- [ ] 运行 `python3 -m unittest tests.test_radar_guard -v`，确认通过后提交 `feat: add safe literature radar guard`。

### Task 3: 可打开的 vault 模板和中文说明

**Files:**
- Create: `vault-template/主页.md`, `vault-template/02-文献/论文雷达/`, `vault-template/03-工具/导航台/主页组件/{view.js,view.css}`, `vault-template/.obsidian/`, `automation/`, `docs/{INSTALL.md,CUSTOMIZE.md,PRIVACY_AND_LICENSES.md}`, `tests/test_template_structure.py`

**Interfaces:**
- Consumes: 论文雷达脚本输出路径与依赖清单插件 ID。
- Produces: 一个可由 Obsidian 打开的相对路径 vault。

- [ ] 先写结构测试：主页调用现存 Dataview 视图；目录骨架完整；`community-plugins.json` 中的 ID 都在清单中。确认该测试因模板缺失而失败。
- [ ] 从现有主页中提炼不含个人状态、日历数据和绝对路径的通用组件；创建通用研究画像、日报/周报模板、中文定时任务说明和目录占位文件。
- [ ] 运行 `python3 -m unittest tests.test_template_structure tests.test_radar_guard -v`，确认通过后提交 `feat: add Chinese Obsidian dashboard template`。

### Task 4: 一次性依赖安装器和公开扫描器

**Files:**
- Create: `scripts/bootstrap_obsidian.py`, `scripts/verify_template.py`, `tests/test_bootstrap.py`, `tests/test_public_scan.py`

**Interfaces:**
- Consumes: `dependencies/plugins.json` 和 `dependencies/themes.json`。
- Produces: `plan_install(vault, manifests)`、`install_all(vault, manifests)` 与 `verify_template(root)`。

- [ ] 先写测试：安装计划保留无关插件；未传 `--apply` 时不写入；敏感字符串或原 vault 标识被扫描器报告。确认因模块缺失而失败。
- [ ] 实现默认计划、显式写入确认、下载到临时目录后验证再替换、失败时清理临时目录，以及对追踪文件的敏感内容扫描。
- [ ] 运行 `python3 -m unittest tests.test_bootstrap tests.test_public_scan -v`，确认通过后提交 `feat: add safe dependency bootstrap`。

### Task 5: 整体验收与交付

**Files:**
- Modify: `README.md`, `docs/*.md`, `dependencies/*.json`, 全部测试。

- [ ] 先为依赖清单和 `community-plugins.json` 同步关系写一条失败测试，并确认失败原因正确。
- [ ] 对齐插件 ID、版本、链接、中文故障排查、许可和隐私边界；不承诺自动完成 Copilot 凭据或 Apple 系统授权。
- [ ] 运行 `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -p 'test_*.py' -v` 和 `PYTHONDONTWRITEBYTECODE=1 python3 scripts/verify_template.py`；复核 Git 追踪内容不含临时产物。
- [ ] 提交 `docs: complete reusable template setup`，再进行独立代码审查与最终验证。
