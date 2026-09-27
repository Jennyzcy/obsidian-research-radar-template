const root = dv.container.createDiv({ cls: "dashboard-live" });
const pages = dv.pages().where(page => page.file.path.endsWith(".md"));
const add = (tag, cls, text) => {
  const el = root.createEl(tag, { cls, text });
  return el;
};
add("div", "dashboard-hero", "研究导航台");
add("p", "dashboard-subtitle", "学习、文献与研究，从这里开始。");
const stats = root.createDiv({ cls: "dashboard-stats" });
stats.createEl("span", { text: `笔记 ${pages.length}` });
stats.createEl("span", { text: `待审查 ${pages.where(p => p.status === "待审查").length}` });
const sections = [["论文雷达", "02-文献/论文雷达/"], ["研究", "04-研究/"], ["课程", "05-课程/"], ["待审查", "00-待审查/"]];
const grid = root.createDiv({ cls: "dashboard-grid" });
sections.forEach(([name, path]) => {
  const card = grid.createEl("button", { cls: "dashboard-card", text: name });
  card.addEventListener("click", () => app.workspace.openLinkText(path, "主页.md", false));
});
const recent = pages.sort(page => page.file.mtime, "desc").limit(5);
root.createEl("h3", { text: "最近编辑" });
dv.list(recent.file.link, root);
