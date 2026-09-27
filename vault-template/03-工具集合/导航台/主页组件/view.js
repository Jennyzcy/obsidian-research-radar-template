const root = dv.container.createDiv({ cls: "dashboard-live" });

const add = (parent, tag, cls, text) => {
  const element = document.createElement(tag);
  if (cls) element.className = cls;
  if (text !== undefined) element.textContent = text;
  parent.appendChild(element);
  return element;
};

const toArray = (value) => {
  if (!value) return [];
  if (typeof value.array === "function") return value.array();
  return Array.from(value);
};

const toDate = (value) => {
  if (!value) return null;
  if (typeof value.toJSDate === "function") return value.toJSDate();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const dateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatShortDate = (value) => {
  const date = toDate(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit" }).format(date);
};

const formatTime = (value, allDay = false) => {
  if (allDay) return "全天";
  const date = toDate(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
};

const pageTime = (page) => {
  const date = toDate(page?.file?.mtime);
  return date ? date.getTime() : 0;
};

const isUsefulPage = (page) => {
  const path = page?.file?.path ?? "";
  const name = page?.file?.name ?? "";
  return path.endsWith(".md") &&
    path !== "Vault.md" &&
    !path.startsWith("07-模板/") &&
    !path.startsWith("copilot/") &&
    !path.startsWith("docs/") &&
    !path.startsWith(".trash/") &&
    !path.startsWith(".obsidian/") &&
    name !== "AGENTS" &&
    name !== "CLAUDE" &&
    name !== "未命名" &&
    !name.startsWith("Untitled");
};

const pages = toArray(dv.pages()).filter(isUsefulPage);
const recentPages = [...pages].sort((left, right) => pageTime(right) - pageTime(left));
const taskHub = app.plugins.getPlugin("task-hub");
const calendarEvents = typeof taskHub?.getCalendarEvents === "function"
  ? toArray(taskHub.getCalendarEvents()).map((event) => ({ ...event, startDate: toDate(event.start) })).filter((event) => event.startDate)
  : [];

const allTasks = pages.flatMap((page) => toArray(page.file?.tasks).map((task) => ({ ...task, sourcePath: page.file.path })));
const openTasks = allTasks.filter((task) => {
  const tags = toArray(task.tags).map(String);
  return !task.completed && tags.includes("#task");
});
const reviewPages = pages.filter((page) => String(page.status ?? "") === "待审查");
const vocabularyPath = "08-单词积累/医学英文词汇表.json";
const vocabularyStatePath = "08-单词积累/医学英文词汇状态.json";
const fallbackVocabularyItems = [
  {
    term: "synapse",
    meaning: "突触；神经元之间传递信号的连接部位",
    example: "Synaptic transmission depends on neurotransmitter release.",
    source: "NCBI Neuroscience glossary"
  },
  {
    term: "action potential",
    meaning: "动作电位；沿轴突传播的电信号",
    example: "Action potentials convey information along axons.",
    source: "NCBI Neuroscience glossary"
  },
  {
    term: "neuroplasticity",
    meaning: "神经可塑性；神经系统随经验或损伤发生改变的能力",
    example: "Learning is associated with neuroplasticity.",
    source: "NINDS neurological terms"
  }
];
const loadVocabularyItems = async () => {
  try {
    const file = app.vault.getAbstractFileByPath(vocabularyPath);
    if (!file) return fallbackVocabularyItems;
    const text = await app.vault.read(file);
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) return fallbackVocabularyItems;
    const items = parsed
      .map((item) => ({
        term: String(item?.term ?? "").trim(),
        meaning: String(item?.meaning ?? "").trim(),
        example: String(item?.example ?? "").trim(),
        source: String(item?.source ?? "").trim()
      }))
      .filter((item) => item.term && item.meaning);
    return items.length > 0 ? items : fallbackVocabularyItems;
  } catch {
    return fallbackVocabularyItems;
  }
};
const vocabularyItems = await loadVocabularyItems();
const vocabularyDailyLimit = 3;
const legacyVocabularyStateKey = "dashboard-vocabulary-state";

const openPath = (path) => {
  if (!path) return;
  app.workspace.openLinkText(path, "Vault.md", false);
};

const runCommand = (id) => {
  if (app.commands.findCommand(id)) app.commands.executeCommandById(id);
};

const createIcon = (parent, icon) => {
  const holder = add(parent, "span", "dashboard-live-icon");
  if (window.lucide?.createIcons) {
    holder.innerHTML = `<i data-lucide="${icon}"></i>`;
    window.lucide.createIcons({ nodes: [holder] });
  } else {
    const symbols = {
      sparkles: "✦",
      timer: "◷",
      "calendar-days": "▦",
      inbox: "◇",
      newspaper: "▥",
      "gallery-vertical-end": "☷",
      bot: "✺",
      history: "↻",
      "check-circle-2": "◌",
      "book-open": "▫",
      library: "▤",
      "graduation-cap": "△",
      brain: "◉",
      users: "◌",
      wrench: "⌬"
    };
    holder.textContent = symbols[icon] ?? "✦";
  }
  return holder;
};

const hero = add(root, "section", "dashboard-live-hero");
const heroCopy = add(hero, "div", "dashboard-live-hero-copy");
add(heroCopy, "span", "dashboard-live-kicker", "LIGHT FOREST · RESEARCH DESK");
add(heroCopy, "h2", "dashboard-live-heading", "学习、文献与研究");
add(heroCopy, "p", "dashboard-live-subtitle", "当前内容由知识库自动生成");

const heroClock = add(hero, "div", "dashboard-live-clock");
const clockTime = add(heroClock, "div", "dashboard-live-clock-time");
const clockDate = add(heroClock, "div", "dashboard-live-clock-date");
const updateClock = () => {
  const now = new Date();
  clockTime.textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(now);
  clockDate.textContent = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(now);
};
updateClock();
const clockTimer = window.setInterval(() => {
  if (!root.isConnected) {
    window.clearInterval(clockTimer);
    return;
  }
  updateClock();
}, 30_000);

const heroStats = add(hero, "div", "dashboard-live-stats");
[
  ["笔记", pages.length],
  ["待办", openTasks.length],
  ["待审查", reviewPages.length]
].forEach(([label, value]) => {
  const stat = add(heroStats, "div", "dashboard-live-stat");
  add(stat, "strong", "", String(value));
  add(stat, "span", "", label);
});

const tools = add(root, "nav", "dashboard-live-tools");
[
  ["快速记录", "sparkles", () => runCommand("quickadd:runQuickAdd")],
  ["25 分钟专注", "timer", () => runCommand("gentle-pomo:open-view")],
  ["日历与计划", "calendar-days", () => runCommand("task-hub:open")],
  ["待审查", "inbox", () => {
    const reviewCenter = app.vault.getFiles().find((file) => file.extension === "base" && file.path.startsWith("00-知识库待审查/"));
    if (reviewCenter) openPath(reviewCenter.path);
  }],
  ["复习卡片", "gallery-vertical-end", () => runCommand("obsidian-spaced-repetition:srs-review-flashcards")],
  ["Codex 协作", "bot", () => runCommand("copilot:agent-chat-open-window")]
].forEach(([label, icon, action]) => {
  const button = add(tools, "button", "dashboard-live-tool");
  button.type = "button";
  createIcon(button, icon);
  add(button, "span", "", label);
  button.addEventListener("click", action);
});

const layout = add(root, "div", "dashboard-widget-grid");
const side = add(layout, "aside", "dashboard-widget-side");
const main = add(layout, "main", "dashboard-widget-main");

const calendarCard = add(side, "section", "dashboard-widget-card dashboard-calendar-card");
const calendarHeader = add(calendarCard, "div", "dashboard-widget-header");
const current = new Date();
add(calendarHeader, "h3", "", new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long" }).format(current));
const calendarOpen = add(calendarHeader, "button", "dashboard-widget-action", "打开日历");
calendarOpen.type = "button";
calendarOpen.addEventListener("click", () => runCommand("task-hub:open"));

const week = add(calendarCard, "div", "dashboard-calendar-week");
["一", "二", "三", "四", "五", "六", "日"].forEach((day) => add(week, "span", "", day));
const monthGrid = add(calendarCard, "div", "dashboard-calendar-days");
const monthStart = new Date(current.getFullYear(), current.getMonth(), 1);
const mondayOffset = (monthStart.getDay() + 6) % 7;
const gridStart = new Date(current.getFullYear(), current.getMonth(), 1 - mondayOffset);
const eventDays = new Set(calendarEvents.map((event) => dateKey(event.startDate)));
for (let index = 0; index < 42; index += 1) {
  const day = new Date(gridStart);
  day.setDate(gridStart.getDate() + index);
  const classNames = ["dashboard-calendar-day"];
  if (day.getMonth() !== current.getMonth()) classNames.push("is-outside");
  if (dateKey(day) === dateKey(current)) classNames.push("is-today");
  if (eventDays.has(dateKey(day))) classNames.push("has-event");
  const dayButton = add(monthGrid, "button", classNames.join(" "), String(day.getDate()));
  dayButton.type = "button";
  dayButton.setAttribute("aria-label", `${dateKey(day)} 打开日历`);
  dayButton.addEventListener("click", () => runCommand("task-hub:open"));
}

const agendaItems = calendarEvents
  .filter((event) => event.startDate >= new Date(current.getFullYear(), current.getMonth(), current.getDate()))
  .sort((left, right) => left.startDate - right.startDate)
  .slice(0, 4);
if (agendaItems.length > 0) {
  const agenda = add(side, "section", "dashboard-widget-card dashboard-agenda-card");
  const agendaHeader = add(agenda, "div", "dashboard-widget-header");
  add(agendaHeader, "h3", "", "近期日程");
  const agendaList = add(agenda, "div", "dashboard-agenda-list");
  agendaItems.forEach((event) => {
    const row = add(agendaList, "button", "dashboard-agenda-item");
    row.type = "button";
    row.addEventListener("click", () => runCommand("task-hub:open"));
    const when = add(row, "span", "dashboard-agenda-when");
    add(when, "strong", "", formatShortDate(event.startDate));
    add(when, "small", "", formatTime(event.startDate, event.allDay));
    const copy = add(row, "span", "dashboard-agenda-copy");
    add(copy, "strong", "", event.title || "未命名日程");
    if (event.calendarName) add(copy, "small", "", event.calendarName);
  });
}

const vocabCard = add(side, "section", "dashboard-widget-card dashboard-vocabulary-card");
const vocabHeader = add(vocabCard, "div", "dashboard-widget-header");
const vocabTitle = add(vocabHeader, "div", "dashboard-widget-title");
createIcon(vocabTitle, "book-open");
add(vocabTitle, "h3", "", "医学英文词汇");
const vocabActions = add(vocabHeader, "div", "dashboard-vocabulary-actions");
const vocabCount = add(vocabActions, "span", "dashboard-widget-count");
const vocabNext = add(vocabActions, "button", "dashboard-widget-action dashboard-vocabulary-next", "换一组");
vocabNext.type = "button";
const vocabList = add(vocabCard, "div", "dashboard-vocabulary-list");

const defaultVocabularyState = {
  known: [],
  repeat: [],
  favorite: [],
  manualOffset: 0
};
const normalizeVocabularyState = (state) => ({
  known: uniqueTerms(state?.known),
  repeat: uniqueTerms(state?.repeat),
  favorite: uniqueTerms(state?.favorite),
  manualOffset: Number(state?.manualOffset ?? 0)
});
const hasVocabularyProgress = (state) =>
  uniqueTerms(state?.known).length > 0 ||
  uniqueTerms(state?.repeat).length > 0 ||
  uniqueTerms(state?.favorite).length > 0 ||
  Number(state?.manualOffset ?? 0) > 0;
const readLegacyVocabularyState = () => {
  try {
    return normalizeVocabularyState(JSON.parse(window.localStorage?.getItem(legacyVocabularyStateKey) ?? "{}"));
  } catch {
    return defaultVocabularyState;
  }
};
const readVocabularyState = async () => {
  try {
    const file = app.vault.getAbstractFileByPath(vocabularyStatePath);
    if (!file) return readLegacyVocabularyState();
    const fileState = normalizeVocabularyState(JSON.parse(await app.vault.read(file)));
    return hasVocabularyProgress(fileState) ? fileState : readLegacyVocabularyState();
  } catch {
    return readLegacyVocabularyState();
  }
};
const uniqueTerms = (items) => [...new Set(toArray(items).map(String).filter(Boolean))];
let vocabularyState = await readVocabularyState();
const vocabularyListPages = {
  known: {
    path: "08-单词积累/已掌握单词.md",
    title: "已掌握单词",
    empty: "当前还没有已掌握单词。"
  },
  repeat: {
    path: "08-单词积累/不认识单词.md",
    title: "不认识单词",
    empty: "当前还没有不认识单词。"
  },
  favorite: {
    path: "08-单词积累/收藏单词.md",
    title: "收藏单词",
    empty: "当前还没有收藏单词。"
  }
};
const tableCell = (value) => String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const writeVocabularyListPage = async (kind) => {
  const config = vocabularyListPages[kind];
  const terms = uniqueTerms(vocabularyState[kind]);
  const rows = terms
    .map((term) => getVocabularyItem(term))
    .filter(Boolean)
    .map((item) => `| ${tableCell(item.term)} | ${tableCell(item.meaning)} | ${tableCell(item.example)} |`);
  const body = rows.length > 0
    ? `| 单词 | 中文含义 | 例句 |\n| --- | --- | --- |\n${rows.join("\n")}\n`
    : `${config.empty}\n`;
  const content = `# ${config.title}\n\n${body}`;
  const file = app.vault.getAbstractFileByPath(config.path);
  if (file) {
    await app.vault.modify(file, content);
  } else {
    await app.vault.create(config.path, content);
  }
};
const saveVocabularyState = async () => {
  const content = `${JSON.stringify(normalizeVocabularyState(vocabularyState), null, 2)}\n`;
  const file = app.vault.getAbstractFileByPath(vocabularyStatePath);
  if (file) {
    await app.vault.modify(file, content);
  } else {
    await app.vault.create(vocabularyStatePath, content);
  }
  await Promise.all([
    writeVocabularyListPage("known"),
    writeVocabularyListPage("repeat"),
    writeVocabularyListPage("favorite")
  ]);
};
const todayIndex = Math.floor(new Date(current.getFullYear(), current.getMonth(), current.getDate()).getTime() / 86_400_000);
const setVocabularyStatus = async (term, status) => {
  vocabularyState.known = uniqueTerms(vocabularyState.known).filter((item) => item !== term);
  vocabularyState.repeat = uniqueTerms(vocabularyState.repeat).filter((item) => item !== term);
  vocabularyState.favorite = uniqueTerms(vocabularyState.favorite).filter((item) => item !== term);
  if (status === "known") vocabularyState.known.push(term);
  if (status === "repeat") vocabularyState.repeat.unshift(term);
  if (status === "favorite") vocabularyState.favorite.unshift(term);
  await saveVocabularyState();
  renderVocabularyGroup();
};
const getVocabularySet = (key) => new Set(uniqueTerms(vocabularyState[key]));
const getVocabularyItem = (term) => vocabularyItems.find((item) => item.term === term);
const getDailyVocabularyItems = () => {
  const known = getVocabularySet("known");
  const priorityTerms = [
    ...uniqueTerms(vocabularyState.favorite),
    ...uniqueTerms(vocabularyState.repeat)
  ];
  const selected = [];
  priorityTerms.forEach((term) => {
    const item = getVocabularyItem(term);
    if (item && !known.has(term) && !selected.some((entry) => entry.term === term)) selected.push(item);
  });
  const pool = vocabularyItems.filter((item) => !known.has(item.term));
  if (pool.length === 0) return selected.slice(0, vocabularyDailyLimit);
  const start = ((todayIndex + Number(vocabularyState.manualOffset ?? 0)) * vocabularyDailyLimit) % pool.length;
  for (let offset = 0; selected.length < vocabularyDailyLimit && offset < pool.length; offset += 1) {
    const item = pool[(start + offset) % pool.length];
    if (!selected.some((entry) => entry.term === item.term)) selected.push(item);
  }
  return selected.slice(0, vocabularyDailyLimit);
};
const renderVocabularyGroup = () => {
  vocabList.replaceChildren();
  const visibleItems = getDailyVocabularyItems();
  const known = getVocabularySet("known");
  const repeat = getVocabularySet("repeat");
  const favorite = getVocabularySet("favorite");
  vocabCount.textContent = `${visibleItems.length}/${vocabularyItems.length}`;
  visibleItems.forEach((item) => {
    const row = add(vocabList, "div", "dashboard-vocabulary-item");
    const termLine = add(row, "div", "dashboard-vocabulary-term");
    add(termLine, "strong", "", item.term);
    add(row, "span", "dashboard-vocabulary-meaning", item.meaning);
    add(row, "span", "dashboard-vocabulary-example", item.example);
    const controls = add(row, "div", "dashboard-vocabulary-controls");
    [
      ["掌握", "known"],
      [repeat.has(item.term) ? "重复中" : "不认识", "repeat"],
      [favorite.has(item.term) ? "已收藏" : "收藏", "favorite"]
    ].forEach(([label, status]) => {
      const button = add(controls, "button", `dashboard-vocabulary-mark is-${status}`, label);
      button.type = "button";
      button.disabled = status === "known" && known.has(item.term);
      button.addEventListener("click", () => setVocabularyStatus(item.term, status));
    });
  });
};
vocabNext.addEventListener("click", async () => {
  vocabularyState.manualOffset = Number(vocabularyState.manualOffset ?? 0) + 1;
  await saveVocabularyState();
  renderVocabularyGroup();
});
renderVocabularyGroup();

const pomoCard = add(side, "section", "dashboard-widget-card dashboard-pomo-card");
const pomoCopy = add(pomoCard, "div", "dashboard-pomo-copy");
const pomoTitle = add(pomoCopy, "div", "dashboard-widget-title");
createIcon(pomoTitle, "timer");
add(pomoTitle, "h3", "", "专注计时");
add(pomoCopy, "small", "", "25 min · Gentle Pomodoro");
const pomoOpen = add(pomoCard, "button", "dashboard-widget-action dashboard-pomo-action", "打开番茄钟");
pomoOpen.type = "button";
pomoOpen.addEventListener("click", () => runCommand("gentle-pomo:open-view"));

const renderFileButton = (parent, page) => {
  const button = add(parent, "button", "dashboard-file-item");
  button.type = "button";
  button.addEventListener("click", () => openPath(page.file.path));
  const copy = add(button, "span", "dashboard-file-copy");
  add(copy, "strong", "", page.file.name);
  add(copy, "small", "", formatShortDate(page.file.mtime));
  add(button, "span", "dashboard-file-arrow", "↗");
  return button;
};

const renderFileModule = (parent, title, icon, items, tone = "green") => {
  if (items.length === 0) return null;
  const card = add(parent, "section", `dashboard-widget-card dashboard-content-card tone-${tone}`);
  const header = add(card, "div", "dashboard-widget-header");
  const heading = add(header, "div", "dashboard-widget-title");
  createIcon(heading, icon);
  add(heading, "h3", "", title);
  add(header, "span", "dashboard-widget-count", String(items.length));
  const list = add(card, "div", "dashboard-file-list");
  items.slice(0, 5).forEach((page) => renderFileButton(list, page));
  return card;
};

const renderFolderModule = (parent, title, icon, folders, tone = "green") => {
  const entries = folders.map(([label, prefix]) => {
    const items = recentPages.filter((page) => page.file.path.startsWith(prefix));
    return {
      label,
      prefix,
      count: items.length,
      latest: items[0] ?? null
    };
  }).filter((entry) => entry.count > 0);
  if (entries.length === 0) return null;
  const card = add(parent, "section", `dashboard-widget-card dashboard-content-card tone-${tone}`);
  const header = add(card, "div", "dashboard-widget-header");
  const heading = add(header, "div", "dashboard-widget-title");
  createIcon(heading, icon);
  add(heading, "h3", "", title);
  add(header, "span", "dashboard-widget-count", String(entries.length));
  const list = add(card, "div", "dashboard-file-list");
  entries
    .sort((left, right) => pageTime(right.latest) - pageTime(left.latest))
    .slice(0, 6)
    .forEach((entry) => {
      const button = add(list, "button", "dashboard-file-item");
      button.type = "button";
      if (entry.latest) button.addEventListener("click", () => openPath(entry.latest.file.path));
      const copy = add(button, "span", "dashboard-file-copy");
      add(copy, "strong", "", entry.label);
      const latestDate = entry.latest ? formatShortDate(entry.latest.file.mtime) : "";
      add(copy, "small", "", `${entry.count} 篇${latestDate ? ` · ${latestDate}` : ""}`);
      add(button, "span", "dashboard-file-arrow", "↗");
    });
  return card;
};

const renderRadarModule = (parent) => {
  const latestDaily = recentPages.find((page) => page.file.path.startsWith("02-文献总结集合/论文雷达/01-每日推送/"));
  const latestWeekly = recentPages.find((page) => page.file.path.startsWith("02-文献总结集合/论文雷达/02-每周精选/"));
  const radarTitle = (page, fallback) => {
    const name = String(page?.file?.name ?? fallback);
    if (name.includes("早报")) return "论文雷达早报";
    if (name.includes("周报")) return "论文雷达周报";
    return name;
  };
  const items = [
    latestDaily ? ["今日早报", latestDaily, "daily"] : null,
    latestWeekly ? ["本周周报", latestWeekly, "weekly"] : null
  ].filter(Boolean);
  if (items.length === 0) return null;
  const card = add(parent, "section", "dashboard-widget-card dashboard-radar-card");
  const list = add(card, "div", "dashboard-radar-list");
  items.forEach(([label, page, kind]) => {
    const button = add(list, "button", `dashboard-radar-item is-${kind}`);
    button.type = "button";
    button.addEventListener("click", () => openPath(page.file.path));
    add(button, "span", "dashboard-radar-label", label);
    const copy = add(button, "span", "dashboard-radar-copy");
    add(copy, "strong", "", radarTitle(page, label));
    add(copy, "small", "", formatShortDate(page.date ?? page.week ?? page.file.mtime));
    add(button, "span", "dashboard-file-arrow", "↗");
  });
  return card;
};

const renderTaskModule = (parent, items) => {
  if (items.length === 0) return null;
  const card = add(parent, "section", "dashboard-widget-card dashboard-content-card tone-green");
  const header = add(card, "div", "dashboard-widget-header");
  const heading = add(header, "div", "dashboard-widget-title");
  createIcon(heading, "check-circle-2");
  add(heading, "h3", "", "今日任务");
  add(header, "span", "dashboard-widget-count", String(items.length));
  const list = add(card, "div", "dashboard-task-list");
  items.slice(0, 5).forEach((task) => {
    const row = add(list, "button", "dashboard-task-item");
    row.type = "button";
    row.addEventListener("click", () => openPath(task.sourcePath));
    add(row, "span", "dashboard-task-check", "");
    const copy = add(row, "span", "dashboard-task-copy");
    add(copy, "strong", "", String(task.text ?? "").replace(/#[\p{L}\p{N}_/-]+/gu, "").trim());
    const due = task.due ?? task.scheduled;
    if (due) add(copy, "small", "", formatShortDate(due));
  });
  return card;
};

renderRadarModule(main);
const primaryGrid = add(main, "div", "dashboard-primary-grid");
renderTaskModule(primaryGrid, openTasks);
renderFileModule(primaryGrid, "继续工作", "history", recentPages.slice(0, 5), "sage");
renderFileModule(primaryGrid, "待审查", "inbox", reviewPages.sort((left, right) => pageTime(right) - pageTime(left)), "wine");

const modulesHeading = add(main, "div", "dashboard-section-heading");
add(modulesHeading, "span", "dashboard-section-line");
add(modulesHeading, "h3", "", "知识模块");
add(modulesHeading, "span", "dashboard-section-line");

const moduleGrid = add(main, "div", "dashboard-module-grid");
const courseFolders = [
  ["实验技术", "06-课程集合/01-神经科学实验技术原理与应用/"],
  ["神经生物学", "06-课程集合/02-神经生物学/"],
  ["科研伦理", "06-课程集合/03-学术规范与科研伦理/"],
  ["医学英语论文写作", "06-课程集合/04-医学英语研究论文写作及学术交流/"],
  ["脑肿瘤转化", "06-课程集合/05-脑肿瘤病因学与临床转化研究/"],
  ["生物医学英语", "06-课程集合/06-生物医学英语写作/"],
  ["神经科学前沿", "06-课程集合/07-神经科学基础和应用前沿/"],
  ["案例评析", "06-课程集合/08-神经科学前沿研究案例评析/"],
  ["中国式现代化", "06-课程集合/09-中国式现代化理论与实践/"],
  ["实用生信", "06-课程集合/10-实用生物信息学/"],
  ["交叉与转化", "06-课程集合/11-神经科学交叉与转化/"],
  ["显微镜成像", "06-课程集合/12-旁听课程显微镜成像/"]
];
const moduleDefinitions = [
  ["文献积累", "02-文献总结集合/", "book-open", "gold"],
  ["学习集合", "04-学习集合/", "library", "sage"],
  ["专业名词", "01-专业名词集合/", "brain", "sage"],
  ["组会与复现", "05-组会学习/", "users", "wine"],
  ["工具与流程", "03-工具集合/", "wrench", "green"]
];
renderFolderModule(moduleGrid, "课程笔记", "graduation-cap", courseFolders, "green");
moduleDefinitions.forEach(([title, prefix, icon, tone]) => {
  const items = recentPages.filter((page) => page.file.path.startsWith(prefix));
  renderFileModule(moduleGrid, title, icon, items, tone);
});

if (moduleGrid.children.length === 0) {
  modulesHeading.remove();
  moduleGrid.remove();
}
