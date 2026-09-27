# Obsidian 研究主页与论文雷达模板

这是一个可直接复用的 Obsidian 模板：森林绿研究主页、论文雷达目录、中文日报/周报模板，以及适用于 Codex Desktop 的本地定时推送说明。

它不包含任何个人笔记、历史论文、Zotero 数据、账号、密钥、绝对路径或第三方插件二进制。

## 快速开始

1. 下载或克隆本仓库。
2. 在终端运行：`python3 scripts/bootstrap_obsidian.py vault-template --dry-run`，先查看将安装的主题和插件。
3. 确认后运行：`python3 scripts/bootstrap_obsidian.py vault-template --apply`，重启 Obsidian，在“第三方插件”中确认信任并打开 `vault-template/`。

接下来请阅读 [安装说明](docs/INSTALL.md)、[定制说明](docs/CUSTOMIZE.md) 与 [Codex Desktop 定时任务设置](automation/CODEX_DESKTOP_SETUP.md)。

## 主要能力

- 自动进入 `主页.md`，由 DataviewJS 生成研究导航台；
- 一次安装主页、日历、任务、番茄钟、复习、搜索、Meta Bind、Task Hub 与 Copilot 所需依赖；
- 用可编辑的研究画像控制论文筛选方向；
- 用日期安全、拒绝覆盖、DOI/题名去重的脚本辅助日报与周报；
- 周报只生成 Zotero 待审批清单，不自动写入 Zotero。

## 安全边界

安装器只向你明确指定的 vault 写入第三方依赖；默认仅展示计划。Copilot 凭据、Apple Calendar 权限与 Codex Desktop 本地定时任务必须由你本人设置。

## 许可证

本仓库自己的代码、模板和文档使用 [MIT License](LICENSE)。主题和插件由其原作者分别许可与维护；详见 `dependencies/` 中对应条目的许可证链接。
