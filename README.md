# Obsidian 研究主页与论文雷达模板

这是一个可直接复用的 Obsidian 模板：森林绿研究主页、论文雷达目录、中文日报/周报模板，以及适用于 Codex Desktop 的本地定时推送说明。

它不包含个人笔记、历史论文、Zotero 数据、账号、密钥或绝对路径。模板已经离线附带当前界面需要的主题与社区插件。

## 快速开始

1. 在 GitHub Releases 下载最新版 `vault-template-v*.zip`。
2. 解压后，在 Obsidian 中选择“打开文件夹作为库”，打开 `vault-template/`。
3. 首次打开时确认社区插件权限；主题、插件和 DataviewJS 设置已经包含在模板中，无需运行安装脚本。

接下来请阅读 [安装说明](docs/INSTALL.md)、[定制说明](docs/CUSTOMIZE.md) 与 [Codex Desktop 定时任务设置](automation/CODEX_DESKTOP_SETUP.md)。

## 主要能力

- 自动进入 `主页.md`，由 DataviewJS 生成研究导航台；
- 离线附带当前主页实际使用的主题和社区插件；
- 用可编辑的研究画像控制论文筛选方向；
- 用日期安全、拒绝覆盖、DOI/题名去重的脚本辅助日报与周报；
- 周报只生成 Zotero 待审批清单，不自动写入 Zotero。

## 安全边界

模板不包含工作区布局、私人笔记、账号凭据或自动任务实例。Codex Desktop 本地定时任务必须由每位使用者在自己的项目中设置。

## 许可证

本仓库自己的代码、模板和文档使用 [MIT License](LICENSE)。主题和插件由其原作者分别许可与维护；详见 `dependencies/` 中对应条目的许可证链接。
