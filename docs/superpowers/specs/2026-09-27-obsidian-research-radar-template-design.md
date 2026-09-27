# Obsidian 研究主页与论文雷达模板：设计说明

## 目标

构建一个可公开发布的本地 Git 仓库。使用者下载后，以自己的 Obsidian vault 为基础，复现研究主页、森林绿视觉、论文雷达目录与 Codex Desktop 本地定时推送工作流。

## 成功标准

使用者运行一次安装器、重启 Obsidian 并确认第三方插件信任后，可以直接打开 `vault-template/` 并进入主页；填写研究画像后，按中文说明在自己的 Codex Desktop 项目中创建两条本地定时任务。

## 公开边界

仓库不包含私人笔记、Copilot 会话、工作区状态、批注 sidecar、回收站、历史推送、论文配图、Zotero 数据、同步脚本、日历数据、绝对路径、项目 ID、密钥、令牌、Cookie 或密码。第三方主题和插件二进制不提交到 Git；安装器只从上游已发布版本下载。

## 分层结构

- `vault-template/`：可直接在 Obsidian 打开的最小 vault，包含主页、通用目录、论文雷达模板、DataviewJS 组件与主页 CSS。
- `dependencies/`：主题和插件的来源、版本、安装文件和许可证链接。
- `scripts/`：依赖安装器、论文雷达命名去重与公开内容扫描器。
- `automation/`：工作日与周度定时任务提示词，以及 Codex Desktop 中文设置说明。
- `docs/`：中文安装、定制、隐私和故障排查说明。
- `tests/`：无网络环境下验证目录、清单、命名去重和隐私扫描的单元测试。

## 主页与视觉

主页通过一个 DataviewJS 自定义视图，从 vault 相对路径读取真实索引、论文雷达输出和模板目录。它显示时间、笔记和待审查统计、最近编辑、雷达入口、研究和课程入口。Calendar、Copilot、Task Hub 等整合不可用时，相关功能安全降级而主页仍正常显示。

基础主题为 Blue Topaz；仓库自有 CSS 只作用于 `research-dashboard`，不修改第三方主题文件，不影响使用者自己的其他笔记。

## 一次性依赖安装

安装器将安装并启用 Blue Topaz、Dataview、Homepage、Calendar、QuickAdd、Tasks、Spaced Repetition、Omnisearch、Meta Bind、Gentle Pomodoro、Task Hub 与 Copilot。它只写入使用者明确传入的 vault 路径，默认展示计划；只有传入 `--apply` 才实际写入。它保留不属于本模板的现有插件，不读取或上传笔记内容。

Obsidian 的第三方插件信任、Copilot 凭据和 Apple Calendar 系统权限仍由每位使用者本人确认；安装器不会尝试绕过这些边界。

## 论文雷达与定时推送

研究画像、日报模板、周报模板、工作日提示词、周报提示词和命名去重脚本保留为通用示例与相对路径。脚本负责日期和 ISO 周命名、拒绝同名覆盖、DOI/题名去重、预印本与正式版关联。周报只生成带编号的 Zotero 待审批清单，绝不自动写入 Zotero。

使用者在自己的 Codex Desktop 项目创建两条任务：工作日 08:00 生成日报；周日 20:30 生成周报和待审批清单。仓库不会导出当前机器的自动任务 TOML、主机 ID、项目 ID 或原 vault 路径。

## 验收

离线自动检查依赖清单结构、安装器计划模式、论文雷达命名与去重、主页引用路径、目录骨架，以及公开文件中是否出现原 vault 路径或常见敏感字段。手动验收是在空目录运行安装器、打开模板、确认主页、填写研究画像并创建定时任务。
