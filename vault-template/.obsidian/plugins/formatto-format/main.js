'use strict';

var obsidian = require('obsidian');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var commands$3 = {
	"Format Document": "Dokument formatieren",
	"Format Notes in Current Folder": ""
};
var editorMenu$3 = {
	"Format Document": "Dokument formatieren"
};
var ribbonIcons$3 = {
	"Format Document": "Dokument formatieren",
	"Format Notes in Current Folder": ""
};
var noticeMessages$3 = {
	"Document Formatted!": "",
	"Document is already formatted!": "",
	"No open document is found.": "",
	"Folder formatting completed. Checked: {TOTAL}, Changed: {CHANGED}, Failed: {FAILED}.": "",
	"You can only format in editing mode.": "",
	"Please enter a valid number.\nIt must be at least 0.": "",
	"Please enter a valid number.\nIt must be a whole number.": ""
};
var optionWarnings$3 = {
	"Gap value must be a whole number and it needs to be at least 0.": ""
};
var placeholders$3 = {
	"(Default)": ""
};
var optionSections$3 = {
	"Heading gaps": "",
	"Other gaps": "",
	"Format options": "",
	"Other options": ""
};
var headingGaps$3 = {
	"Before top-level headings": "",
	"Decides the gap before a top-level heading.": "",
	"Before the first sub-level heading": "",
	"Decides the child heading gap right after a parent heading.": "",
	"Before sub-level headings": "",
	"Decides gaps before headings that are not top-level.": ""
};
var otherGaps$3 = {
	"After properties": "",
	"Decides the gap after a property section.": "",
	"Before contents": "",
	"Before contents after headings": "",
	"Decides gaps before \"contents that are after headings.\"": "",
	"Decides gaps before content sections. (ex: Text before headings)": "",
	"Before contents after code blocks": "",
	"Decides gaps before \"contents that are after code blocks.\"": "",
	"Before code blocks": "",
	"Decides gaps before code blocks.": "",
	"Before code blocks after headings": "",
	"Decides gaps before \"code blocks that are after headings.\"": "",
	"Before callouts after headings": "",
	"Decides gaps before \"callouts that are after headings.\"": "",
	"Before callouts": "",
	"Decides gaps before \"callouts\"": ""
};
var formatOptions$3 = {
	"Newline at the end of a document": "",
	"Inserts a newline at the end of a document.": ""
};
var otherOptions$3 = {
	"Notify when no change is needed": "",
	"Displays a different message when no change is needed.": "",
	"More detailed error message": "",
	"Displays additional information when parsing fails.": "",
	"Format documents on modification": "",
	"Automatically format documents after each modification. Triggers on save and autosave.": ""
};
var wasm$4 = {
	parsing: {
		"Failed to parse the document. [Line: {LINE_NUMBER}]": "",
		"Failed to parse the document.": ""
	},
	formatting: {
		"Failed to read options. Some of them are possibly not positive number values.": ""
	}
};
var de = {
	commands: commands$3,
	editorMenu: editorMenu$3,
	ribbonIcons: ribbonIcons$3,
	noticeMessages: noticeMessages$3,
	optionWarnings: optionWarnings$3,
	placeholders: placeholders$3,
	optionSections: optionSections$3,
	headingGaps: headingGaps$3,
	otherGaps: otherGaps$3,
	formatOptions: formatOptions$3,
	otherOptions: otherOptions$3,
	wasm: wasm$4
};

var commands$2 = {
	"Format Document": "Format Document",
	"Format Notes in Current Folder": "Format Notes in Current Folder"
};
var editorMenu$2 = {
	"Format Document": "Format Document"
};
var ribbonIcons$2 = {
	"Format Document": "Format Document",
	"Format Notes in Current Folder": "Format Notes in Current Folder"
};
var noticeMessages$2 = {
	"Document Formatted!": "Document Formatted!",
	"Document is already formatted!": "Document is already formatted!",
	"No open document is found.": "No open document is found.",
	"Folder formatting completed. Checked: {TOTAL}, Changed: {CHANGED}, Failed: {FAILED}.": "Folder formatting completed. Checked: {TOTAL}, Changed: {CHANGED}, Failed: {FAILED}.",
	"You can only format in editing mode.": "You can only format in editing mode.",
	"Please enter a valid number.\nIt must be at least 0.": "Please enter a valid number.\nIt must be at least 0.",
	"Please enter a valid number.\nIt must be a whole number.": "Please enter a valid number.\nIt must be a whole number."
};
var optionWarnings$2 = {
	"Gap value must be a whole number and it needs to be at least 0.": "Gap value must be a whole number and it needs to be at least 0."
};
var placeholders$2 = {
	"(Default)": "(Default)"
};
var optionSections$2 = {
	"Heading gaps": "Heading gaps",
	"Other gaps": "Other gaps",
	"Format options": "Format options",
	"Other options": "Other options"
};
var headingGaps$2 = {
	"Before top-level headings": "Before top-level headings",
	"Decides the gap before a top-level heading.": "Decides the gap before a top-level heading.",
	"Before the first sub-level heading": "Before the first sub-level heading",
	"Decides the child heading gap right after a parent heading.": "Decides the child heading gap right after a parent heading.",
	"Before sub-level headings": "Before sub-level headings",
	"Decides gaps before headings that are not top-level.": "Decides gaps before headings that are not top-level."
};
var otherGaps$2 = {
	"After properties": "After properties",
	"Decides the gap after a property section.": "Decides the gap after a property section.",
	"Before contents": "Before contents",
	"Decides gaps before content sections. (ex: Text before headings)": "Decides gaps before content sections. (ex: Text before headings)",
	"Before contents after headings": "Before contents after headings",
	"Decides gaps before \"contents that are after headings.\"": "Decides gaps before \"contents that are after headings.\"",
	"Before contents after code blocks": "Before contents after code blocks",
	"Decides gaps before \"contents that are after code blocks.\"": "Decides gaps before \"contents that are after code blocks.\"",
	"Before code blocks": "Before code blocks",
	"Decides gaps before code blocks.": "Decides gaps before code blocks.",
	"Before code blocks after headings": "Before code blocks after headings",
	"Decides gaps before \"code blocks that are after headings.\"": "Decides gaps before \"code blocks that are after headings.\"",
	"Before callouts after headings": "Before callouts after headings",
	"Decides gaps before \"callouts that are after headings.\"": "Decides gaps before \"callouts that are after headings.\"",
	"Before callouts": "Before callouts",
	"Decides gaps before \"callouts\"": "Decides gaps before \"callouts\""
};
var formatOptions$2 = {
	"Newline at the end of a document": "Newline at the end of a document",
	"Inserts a newline at the end of a document.": "Inserts a newline at the end of a document."
};
var otherOptions$2 = {
	"Notify when no change is needed": "Notify when no change is needed",
	"Displays a different message when no change is needed.": "Displays a different message when no change is needed.",
	"More detailed error message": "More detailed error message",
	"Displays additional information when parsing fails.": "Displays additional information when parsing fails.",
	"Format documents on modification": "Format documents on modification",
	"Automatically format documents after each modification. Triggers on save and autosave.": "Automatically format documents after each modification. Triggers on save and autosave."
};
var wasm$3 = {
	parsing: {
		"Failed to parse the document. [Line: {LINE_NUMBER}]": "Failed to parse the document. [Line: {LINE_NUMBER}]",
		"Failed to parse the document.": "Failed to parse the document."
	},
	formatting: {
		"Failed to read options. Some of them are possibly not positive number values.": "Failed to read options. Some of them are possibly not positive number values."
	}
};
var en = {
	commands: commands$2,
	editorMenu: editorMenu$2,
	ribbonIcons: ribbonIcons$2,
	noticeMessages: noticeMessages$2,
	optionWarnings: optionWarnings$2,
	placeholders: placeholders$2,
	optionSections: optionSections$2,
	headingGaps: headingGaps$2,
	otherGaps: otherGaps$2,
	formatOptions: formatOptions$2,
	otherOptions: otherOptions$2,
	wasm: wasm$3
};

var commands$1 = {
	"Format Document": "Dokumentum formázása",
	"Format Notes in Current Folder": ""
};
var editorMenu$1 = {
	"Format Document": "Dokumentum formázása"
};
var ribbonIcons$1 = {
	"Format Document": "Dokumentum formázása",
	"Format Notes in Current Folder": ""
};
var noticeMessages$1 = {
	"Document Formatted!": "A dokumentum meg lett formázva!",
	"Document is already formatted!": "A dokumentum már meg van formázva!",
	"No open document is found.": "Nem található megnyitott dokumentum.",
	"Folder formatting completed. Checked: {TOTAL}, Changed: {CHANGED}, Failed: {FAILED}.": "",
	"You can only format in editing mode.": "A formázás csakis a szerkesztői módban lehetséges. ",
	"Please enter a valid number.\nIt must be at least 0.": "Kérlek egy megfelelő számot írjál be.\nLegalább 0 legyen.",
	"Please enter a valid number.\nIt must be a whole number.": "Kérlek egy megfelelő számot írjál be.\nEgész szám legyen."
};
var optionWarnings$1 = {
	"Gap value must be a whole number and it needs to be at least 0.": ""
};
var placeholders$1 = {
	"(Default)": "(Alapértelmezett)"
};
var optionSections$1 = {
	"Heading gaps": "Fejléc hézagok",
	"Other gaps": "Egyéb hézagok",
	"Format options": "Formázási opciók",
	"Other options": "Egyéb opciók"
};
var headingGaps$1 = {
	"Before top-level headings": "",
	"Decides the gap before a top-level heading.": "",
	"Before the first sub-level heading": "",
	"Decides the child heading gap right after a parent heading.": "",
	"Before sub-level headings": "",
	"Decides gaps before headings that are not top-level.": ""
};
var otherGaps$1 = {
	"After properties": "Tulajdonságok után",
	"Decides the gap after a property section.": "Meghatározza a hézagot a tulajdonságok szekció után.",
	"Before contents": "Tartalmak előtt",
	"Before contents after headings": "",
	"Decides gaps before \"contents that are after headings.\"": "",
	"Decides gaps before content sections. (ex: Text before headings)": "",
	"Before contents after code blocks": "Tartalmak előtti kód részek",
	"Decides gaps before \"contents that are after code blocks.\"": "Meghatározza azon tartalmi hézagokat, melyek kód részek előtt vannak.",
	"Before code blocks": "Kód részek előtt",
	"Decides gaps before code blocks.": "Meghatározza a hézagot kód részek előtt.",
	"Before code blocks after headings": "Kód részek előtt, a címsorok előtt",
	"Decides gaps before \"code blocks that are after headings.\"": "Meghatározza azon kód részi hézagokat, melyek címsorok után vannak.",
	"Before callouts after headings": "",
	"Decides gaps before \"callouts that are after headings.\"": "",
	"Before callouts": "",
	"Decides gaps before \"callouts\"": ""
};
var formatOptions$1 = {
	"Newline at the end of a document": "Új sor a dokumentum végére.",
	"Inserts a newline at the end of a document.": "Beszúr egy új sort a dokumentum végére."
};
var otherOptions$1 = {
	"Notify when no change is needed": "Értesítsen, hogyha nem szükséges változás",
	"Displays a different message when no change is needed.": "Eltérő üzenetet mutat, hogyha nem történt változás",
	"More detailed error message": "Mutasson részletesebb hiba üzeneteket",
	"Displays additional information when parsing fails.": "Plusz információt mutat, amikor az átírás közben hiba történik.",
	"Format documents on modification": "",
	"Automatically format documents after each modification. Triggers on save and autosave.": ""
};
var wasm$2 = {
	parsing: {
		"Failed to parse the document. [Line: {LINE_NUMBER}]": "",
		"Failed to parse the document.": ""
	},
	formatting: {
		"Failed to read options. Some of them are possibly not positive number values.": ""
	}
};
var hu = {
	commands: commands$1,
	editorMenu: editorMenu$1,
	ribbonIcons: ribbonIcons$1,
	noticeMessages: noticeMessages$1,
	optionWarnings: optionWarnings$1,
	placeholders: placeholders$1,
	optionSections: optionSections$1,
	headingGaps: headingGaps$1,
	otherGaps: otherGaps$1,
	formatOptions: formatOptions$1,
	otherOptions: otherOptions$1,
	wasm: wasm$2
};

var commands = {
	"Format Document": "문서 포맷하기",
	"Format Notes in Current Folder": "현재 폴더의 노트 모두 포맷하기"
};
var editorMenu = {
	"Format Document": "문서 포맷하기"
};
var ribbonIcons = {
	"Format Document": "문서 포맷하기",
	"Format Notes in Current Folder": "현재 폴더의 노트 모두 포맷하기"
};
var noticeMessages = {
	"Document Formatted!": "포맷 완료!",
	"Document is already formatted!": "문서가 이미 포맷돼 있습니다.",
	"No open document is found.": "열려 있는 문서를 찾지 못했습니다.",
	"Folder formatting completed. Checked: {TOTAL}, Changed: {CHANGED}, Failed: {FAILED}.": "",
	"You can only format in editing mode.": "편집 모드에서만 포맷할 수 있습니다.",
	"Please enter a valid number.\nIt must be at least 0.": "유효한 숫자를 입력해주세요.\n0 이상만 입력할 수 있습니다.",
	"Please enter a valid number.\nIt must be a whole number.": "유효한 숫자를 입력해주세요.\n자연수만 입력할 수 있습니다."
};
var optionWarnings = {
	"Gap value must be a whole number and it needs to be at least 0.": "여백 옵션의 값은 반드시 자연수이고 0 이상이어야 합니다."
};
var placeholders = {
	"(Default)": "(기본값)"
};
var optionSections = {
	"Heading gaps": "제목 여백",
	"Other gaps": "기타 여백",
	"Format options": "포맷 옵션",
	"Other options": "기타 옵션"
};
var headingGaps = {
	"Before top-level headings": "최상위 제목 앞",
	"Decides the gap before a top-level heading.": "최상위 제목들의 앞 여백을 결정합니다.",
	"Before the first sub-level heading": "첫 번째 하위 제목 앞",
	"Decides the child heading gap right after a parent heading.": "부모 제목 바로 뒤 자식 제목의 여백을 결정합니다.",
	"Before sub-level headings": "하위 제목 앞",
	"Decides gaps before headings that are not top-level.": "최상위 제목이 아닌 제목들의 앞 여백을 결정합니다."
};
var otherGaps = {
	"After properties": "속성 영역 뒤",
	"Decides the gap after a property section.": "속성 영역 뒤 여백을 결정합니다.",
	"Before contents": "내용 영역 앞",
	"Decides gaps before content sections. (ex: Text before headings)": "내용 영역의 앞 여백을 결정합니다. (예: 제목 앞 텍스트)",
	"Before contents after headings": "제목 뒤 내용 영역 앞",
	"Decides gaps before \"contents that are after headings.\"": "\"제목 뒤 내용 영역\"의 앞 여백을 결정합니다.",
	"Before contents after code blocks": "코드 블럭 뒤 내용 영역 앞",
	"Decides gaps before \"contents that are after code blocks.\"": "\"코드 블럭 뒤 내용 영역\"의 앞 여백을 결정합니다.",
	"Before code blocks": "코드 블럭 앞",
	"Decides gaps before code blocks.": "코드 블럭의 앞 여백을 결정합니다.",
	"Before code blocks after headings": "제목 뒤 코드 블럭 앞",
	"Decides gaps before \"code blocks that are after headings.\"": "\"제목 뒤 코드 블럭\"의 앞 여백을 결정합니다.",
	"Before callouts after headings": "제목 뒤 콜아웃 앞",
	"Decides gaps before \"callouts that are after headings.\"": "\"제목 뒤 콜아웃\"의 앞 여백을 결정합니다.",
	"Before callouts": "콜아웃 앞",
	"Decides gaps before \"callouts\"": "콜아웃의 앞 여백을 결정합니다."
};
var formatOptions = {
	"Newline at the end of a document": "문서 끝 새 줄",
	"Inserts a newline at the end of a document.": "문서 끝에 새 줄을 추가합니다."
};
var otherOptions = {
	"Notify when no change is needed": "변경사항이 없을 때 알려주기",
	"Displays a different message when no change is needed.": "변경할 사항이 없으면 다른 메세지를 표시합니다.",
	"More detailed error message": "더 자세한 에러 메세지",
	"Displays additional information when parsing fails.": "문서를 읽지 못했을 때 추가 정보를 표시합니다.",
	"Format documents on modification": "수정 시 문서 포맷하기",
	"Automatically format documents after each modification. Triggers on save and autosave.": "매 수정 마다 문서를 자동으로 포맷합니다. 저장 및 자동 저장 시 활성화됩니다."
};
var wasm$1 = {
	parsing: {
		"Failed to parse the document. [Line: {LINE_NUMBER}]": "문서를 읽지 못했습니다. [줄: {LINE_NUMBER}]",
		"Failed to parse the document.": "문서를 읽지 못했습니다."
	},
	formatting: {
		"Failed to read options. Some of them are possibly not positive number values.": "설정을 읽지 못했습니다. 양수가 아닌 값이 있을수도 있습니다."
	}
};
var ko = {
	commands: commands,
	editorMenu: editorMenu,
	ribbonIcons: ribbonIcons,
	noticeMessages: noticeMessages,
	optionWarnings: optionWarnings,
	placeholders: placeholders,
	optionSections: optionSections,
	headingGaps: headingGaps,
	otherGaps: otherGaps,
	formatOptions: formatOptions,
	otherOptions: otherOptions,
	wasm: wasm$1
};

const detectedLanguage = window.localStorage.getItem("language");
const LOCALE_CATEGORY = {
    COMMANDS: "commands",
    EDITOR_MENU: "editorMenu",
    RIBBON_ICONS: "ribbonIcons",
    NOTICE_MESSAGES: "noticeMessages",
    OPTION_WARNINGS: "optionWarnings",
    PLACEHOLDERS: "placeholders",
    OPTION_SECTIONS: "optionSections",
    HEADING_GAPS: "headingGaps",
    OTHER_GAPS: "otherGaps",
    FORMAT_OPTIONS: "formatOptions",
    OTHER_OPTIONS: "otherOptions",
};
const locales = {
    en: en,
    de: de,
    hu: hu,
    ko: ko,
};
/** @example getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document") */
const getLocale = (category, key) => {
    var _a, _b, _c;
    if (!detectedLanguage) {
        const usingLocale = locales.en;
        return ((_a = usingLocale[category][key]) !== null && _a !== void 0 ? _a : "INVALID_VALUE");
    }
    const usingLocale = (_b = locales[detectedLanguage]) !== null && _b !== void 0 ? _b : locales.en;
    const message = (_c = usingLocale[category][key]) !== null && _c !== void 0 ? _c : "INVALID_VALUE";
    return message;
};
/** Returns the "wasm" object in the locale file. */
const getWasmLocale = () => {
    var _a;
    if (!detectedLanguage) {
        const usingLocale = locales.en;
        return usingLocale.wasm;
    }
    const usingLocale = (_a = locales[detectedLanguage]) !== null && _a !== void 0 ? _a : locales.en;
    return usingLocale.wasm;
};

class FormattoCommands {
    constructor(plugin) {
        this.plugin = plugin;
    }
    registerCommands() {
        this.getCommandsArr().forEach((item) => {
            this.plugin.addCommand(item);
        });
    }
    getCommandsArr() {
        return [
            {
                id: "formatto-logo",
                name: getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document"),
                icon: "formatto-logo",
                editorCallback: (editor) => {
                    this.plugin.utils.formatDocument(editor);
                },
            },
            {
                id: "formatto-folder",
                name: getLocale(LOCALE_CATEGORY.COMMANDS, "Format Notes in Current Folder"),
                icon: "formatto-logo",
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const activeFile = this.plugin.app.workspace.getActiveFile();
                    if (!activeFile) {
                        new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "No open document is found."));
                        return;
                    }
                    yield this.plugin.utils.formatFolderFiles((_b = (_a = activeFile.parent) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : "");
                }),
            },
        ];
    }
}

var formattoLogo = "<svg class=\"formatto__custom-icons\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect x=\"2\" y=\"2\" width=\"6.65444\" height=\"3.02\" rx=\"0.5\" />\n<rect x=\"2\" y=\"6.31047\" width=\"12.0693\" height=\"3.44838\" rx=\"0.5\" />\n<rect x=\"10.621\" y=\"2\" width=\"3.44838\" height=\"6.03466\" rx=\"0.5\" />\n<rect x=\"2.03467\" y=\"11\" width=\"6.98996\" height=\"3.01966\" rx=\"0.5\" />\n</svg>";

class FormattoIcons {
    constructor() {
        this.icons = [{ iconId: "formatto-logo", svg: formattoLogo }];
        this.registerIcons = () => {
            this.icons.forEach(({ iconId, svg }) => {
                obsidian.addIcon(iconId, svg);
            });
        };
    }
}

class FormattoRibbonIcons {
    constructor(plugin) {
        this.registerRibbonIcons = () => {
            this.plugin.addRibbonIcon("formatto-logo", getLocale(LOCALE_CATEGORY.RIBBON_ICONS, "Format Document"), () => {
                var _a;
                const editor = (_a = this.plugin.app.workspace.activeEditor) === null || _a === void 0 ? void 0 : _a.editor;
                const activeView = this.plugin.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                if (!editor) {
                    new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "No open document is found."));
                    return;
                }
                if ((activeView === null || activeView === void 0 ? void 0 : activeView.getMode()) !== "source") {
                    new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "You can only format in editing mode."));
                    return;
                }
                this.plugin.utils.formatDocument(editor);
            });
            this.plugin.addRibbonIcon("formatto-logo", getLocale(LOCALE_CATEGORY.RIBBON_ICONS, "Format Notes in Current Folder"), () => {
                var _a, _b, _c;
                const editor = (_a = this.plugin.app.workspace.activeEditor) === null || _a === void 0 ? void 0 : _a.editor;
                const activeView = this.plugin.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                const activeFile = this.plugin.app.workspace.getActiveFile();
                if (!activeFile) {
                    new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "No open document is found."));
                    return;
                }
                if ((activeView === null || activeView === void 0 ? void 0 : activeView.getMode()) !== "source") {
                    new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "You can only format in editing mode."));
                    return;
                }
                if (!editor) {
                    new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "No open document is found."));
                    return;
                }
                this.plugin.utils.formatFolderFiles((_c = (_b = activeFile.parent) === null || _b === void 0 ? void 0 : _b.path) !== null && _c !== void 0 ? _c : "");
            });
        };
        this.plugin = plugin;
    }
}

/* @ts-self-types="./formatto_wasm.d.ts" */

/**
 * This function will be called from the TypeScript side.
 * @param {string} input
 * @param {any} js_options
 * @param {any} js_locales
 * @returns {string}
 */
function format_document(input, js_options, js_locales) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.format_document(ptr0, len0, js_options, js_locales);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_960c155d3d49e4c2: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_String_8564e559799eccda: function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_boolean_get_6ea149f0a8dcc5ff: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_ab4b34d23d6778bd: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_a5d8b22e52b24dd1: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_object_63322ec0cd6ea4ef: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_undefined_29a43b4d42920abd: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_cac3565e89b4134c: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_number_get_c7f42aed0525c451: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_7ed5322991caaec5: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_6b64449b9b9ed33c: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_error_999075982a8848d4: function(arg0, arg1) {
            console.error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        },
        __wbg_instanceof_ArrayBuffer_7c8433c6ed14ffe3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_152ba1f289edcf3f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_length_9f1775224cf1d815: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_new_0c7403db6e782f19: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_prototypesetcall_a6b02eb00b0f4ce2: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./formatto_wasm_bg.js": import0,
    };
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path);
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead');
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('formatto_wasm_bg.wasm', (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('main.js', document.baseURI).href)));
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance);
}

/*
  Type Declarations
*/
/*
  Fallback Option Values
*/
const FALLBACK_HEADING_GAPS = {
    beforeTopLevelHeadings: "3",
    beforeFirstSubHeading: "1",
    beforeSubHeadings: "2",
};
const FALLBACK_OTHER_GAPS = {
    afterProperties: "2",
    beforeContents: "1",
    beforeContentsAfterHeadings: "0",
    beforeContentsAfterCodeBlocks: "1",
    beforeCodeBlocks: "1",
    beforeCodeBlocksAfterHeadings: "0",
    beforeCalloutsAfterHeadings: "0",
    beforeCallouts: "1",
};
const FALLBACK_FORMAT_OPTIONS = {
    insertNewline: true,
};
const FALLBACK_OTHER_OPTIONS = {
    notifyWhenUnchanged: true,
    showMoreDetailedErrorMessages: false,
    formatOnSave: false,
};
const FALLBACK_OPTIONS = {
    headingGaps: FALLBACK_HEADING_GAPS,
    otherGaps: FALLBACK_OTHER_GAPS,
    formatOptions: FALLBACK_FORMAT_OPTIONS,
    otherOptions: FALLBACK_OTHER_OPTIONS,
};
/*
  Default Option Values
*/
const EMPTY_HEADING_GAPS = {
    beforeTopLevelHeadings: "",
    beforeFirstSubHeading: "",
    beforeSubHeadings: "",
};
const EMPTY_OTHER_GAPS = {
    afterProperties: "",
    beforeContents: "",
    beforeContentsAfterHeadings: "",
    beforeContentsAfterCodeBlocks: "",
    beforeCodeBlocks: "",
    beforeCodeBlocksAfterHeadings: "",
    beforeCalloutsAfterHeadings: "",
    beforeCallouts: "",
};
const DEFAULT_OPTIONS = {
    headingGaps: EMPTY_HEADING_GAPS,
    otherGaps: EMPTY_OTHER_GAPS,
    formatOptions: FALLBACK_FORMAT_OPTIONS,
    otherOptions: FALLBACK_OTHER_OPTIONS,
};

class FormattoUtils {
    constructor(plugin) {
        this.plugin = plugin;
    }
    formatDocument(editor) {
        const copiedOptions = JSON.parse(JSON.stringify(this.plugin.settings));
        this.handleEmptyOptions(copiedOptions);
        this.cursorPosition = editor.getCursor();
        this.originalDocument = editor.getValue();
        try {
            this.formattedDocument = format_document(this.originalDocument, copiedOptions, JSON.stringify(getWasmLocale()));
            this.displayMessage();
        }
        catch (error) {
            const stringifiedError = String(error);
            new obsidian.Notice(stringifiedError);
        }
        if (!this.formattedDocument)
            return;
        if (this.formattedDocument !== this.originalDocument) {
            editor.setValue(this.formattedDocument);
            editor.setSelection(this.cursorPosition, this.cursorPosition);
        }
        this.clearVariables();
    }
    formatText(data, showErrorNotice = true) {
        const copiedOptions = JSON.parse(JSON.stringify(this.plugin.settings));
        this.handleEmptyOptions(copiedOptions);
        this.originalDocument = data;
        try {
            this.formattedDocument = format_document(this.originalDocument, copiedOptions, JSON.stringify(getWasmLocale()));
            return this.formattedDocument;
        }
        catch (error) {
            if (showErrorNotice) {
                new obsidian.Notice(String(error));
            }
            return data;
        }
        finally {
            this.clearVariables();
        }
    }
    formatFolderFiles(folderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const filesInFolder = this.getMarkdownFilesInFolder(folderPath);
            let changedCount = 0;
            let failedCount = 0;
            for (const file of filesInFolder) {
                try {
                    const originalText = yield this.plugin.app.vault.cachedRead(file);
                    const formattedText = this.formatText(originalText, false);
                    if (formattedText !== originalText) {
                        yield this.plugin.app.vault.modify(file, formattedText);
                        changedCount += 1;
                    }
                }
                catch (error) {
                    failedCount += 1;
                    console.error(`Failed to format file: ${file.path}`, error);
                }
            }
            const message = getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "Folder formatting completed. Checked: {TOTAL}, Changed: {CHANGED}, Failed: {FAILED}.")
                .replace("{TOTAL}", String(filesInFolder.length))
                .replace("{CHANGED}", String(changedCount))
                .replace("{FAILED}", String(failedCount));
            new obsidian.Notice(message);
        });
    }
    getMarkdownFilesInFolder(folderPath) {
        const markdownFiles = this.plugin.app.vault.getMarkdownFiles();
        if (folderPath === "/") {
            return markdownFiles;
        }
        const folderPrefix = `${folderPath}/`;
        return markdownFiles.filter((file) => file.path.startsWith(folderPrefix));
    }
    displayMessage() {
        if (this.plugin.settings.otherOptions.notifyWhenUnchanged &&
            this.formattedDocument === this.originalDocument) {
            new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "Document is already formatted!"));
        }
        else {
            new obsidian.Notice(getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "Document Formatted!"));
        }
    }
    handleEmptyOptions(copiedOptions) {
        for (const sectionKey of Object.keys(copiedOptions)) {
            for (const optionKey of Object.keys(copiedOptions[sectionKey])) {
                if (copiedOptions[sectionKey][optionKey] === "") {
                    copiedOptions[sectionKey][optionKey] =
                        FALLBACK_OPTIONS[sectionKey][optionKey];
                }
            }
        }
    }
    clearVariables() {
        this.cursorPosition = undefined;
        this.originalDocument = undefined;
        this.formattedDocument = undefined;
    }
}

class FormattoEditorMenuEvent {
    constructor(plugin) {
        this.plugin = plugin;
    }
    registerEvents() {
        this.getEventsArr().forEach((item) => {
            this.plugin.registerEvent(item);
        });
    }
    getEventsArr() {
        return [
            this.plugin.app.workspace.on("editor-menu", (menu, editor) => {
                menu.addItem((item) => item
                    .setTitle(getLocale(LOCALE_CATEGORY.EDITOR_MENU, "Format Document"))
                    .setIcon("formatto-logo")
                    .onClick(() => {
                    this.plugin.utils.formatDocument(editor);
                }));
            }),
        ];
    }
}

class FormattoModifyEvent {
    constructor(plugin) {
        this.timer = null;
        this.timerDelay = 1000;
        this.plugin = plugin;
    }
    registerEvents() {
        this.getEventsArr().forEach((item) => {
            this.plugin.registerEvent(item);
        });
    }
    getEventsArr() {
        return [
            this.plugin.app.vault.on("modify", (file) => {
                this.timer = setTimeout(() => {
                    if (this.plugin.settings.otherOptions.formatOnSave &&
                        file instanceof obsidian.TFile &&
                        file.extension === "md") {
                        this.plugin.app.vault.process(file, (data) => {
                            return this.plugin.utils.formatText(data);
                        });
                    }
                }, this.timerDelay);
            }),
            this.plugin.app.workspace.on("editor-change", () => {
                clearTimeout(this.timer);
            }),
        ];
    }
}

class FormattoOptionTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.noticeMessages = {
            invalidNumberMessage: getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "Please enter a valid number.\nIt must be at least 0."),
            notWholeNumberMessage: getLocale(LOCALE_CATEGORY.NOTICE_MESSAGES, "Please enter a valid number.\nIt must be a whole number."),
        };
        this.plugin = plugin;
    }
    checkDecimal(value) {
        return value !== "0" && value !== "1" && parseFloat(value) % 1 !== 0;
    }
    putDefaultIndicator(value) {
        return `${value} ${getLocale(LOCALE_CATEGORY.PLACEHOLDERS, "(Default)")}`;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        const debounceMsg = obsidian.debounce((value) => {
            if (value !== "") {
                // Check if the value is a valid number
                if (isNaN(parseInt(value)) || parseInt(value) < 0) {
                    new obsidian.Notice(this.noticeMessages.invalidNumberMessage);
                    return;
                }
                // Check if the value is a whole number
                if (this.checkDecimal(value)) {
                    new obsidian.Notice(this.noticeMessages.notWholeNumberMessage);
                    return;
                }
            }
        }, 1000, true);
        containerEl.createDiv({}, (div) => {
            div.innerHTML = `<div style="color: var(--text-accent); margin-bottom: 23px;">
                ${getLocale(LOCALE_CATEGORY.OPTION_WARNINGS, "Gap value must be a whole number and it needs to be at least 0.")}
            </div>`;
            div.className = "setting-item-description";
        });
        // Heading Gaps
        containerEl.createEl("h2", {
            text: getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Heading gaps"),
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Before top-level headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Decides the gap before a top-level heading."))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.headingGaps
                .beforeTopLevelHeadings) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.headingGaps
                .beforeTopLevelHeadings) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.headingGaps.beforeTopLevelHeadings =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Before the first sub-level heading"))
            .setDesc(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Decides the child heading gap right after a parent heading."))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.headingGaps
                .beforeFirstSubHeading) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.headingGaps
                .beforeFirstSubHeading) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.headingGaps.beforeFirstSubHeading =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Before sub-level headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.HEADING_GAPS, "Decides gaps before headings that are not top-level."))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.headingGaps.beforeSubHeadings) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.headingGaps.beforeSubHeadings) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.headingGaps.beforeSubHeadings =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        // Other Gaps
        containerEl.createEl("h2", {
            text: getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Other gaps"),
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "After properties"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Decides the gap after a property section."))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.otherGaps.afterProperties) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.otherGaps.afterProperties) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.otherGaps.afterProperties = value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before contents"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Decides gaps before content sections. (ex: Text before headings)"))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.otherGaps.beforeContents) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.otherGaps.beforeContents) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.otherGaps.beforeContents = value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before contents after headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "contents that are after headings."'))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.otherGaps
                .beforeContentsAfterHeadings) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.otherGaps
                .beforeContentsAfterHeadings) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.otherGaps.beforeContentsAfterHeadings =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before contents after code blocks"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "contents that are after code blocks."'))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.otherGaps
                .beforeContentsAfterCodeBlocks) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.otherGaps
                .beforeContentsAfterCodeBlocks) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.otherGaps.beforeContentsAfterCodeBlocks =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before code blocks"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Decides gaps before code blocks."))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.otherGaps.beforeCodeBlocks) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.otherGaps.beforeCodeBlocks) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.otherGaps.beforeCodeBlocks = value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before code blocks after headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "code blocks that are after headings."'))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.otherGaps
                .beforeCodeBlocksAfterHeadings) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.otherGaps
                .beforeCodeBlocksAfterHeadings) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.otherGaps.beforeCodeBlocksAfterHeadings =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before callouts after headings"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "callouts that are after headings."'))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.otherGaps
                .beforeCalloutsAfterHeadings) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.otherGaps
                .beforeCalloutsAfterHeadings) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.otherGaps.beforeCalloutsAfterHeadings =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before callouts"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_GAPS, 'Decides gaps before "callouts\"'))
            .addText((text) => {
            var _a, _b;
            return text
                .setPlaceholder(this.putDefaultIndicator((_a = FALLBACK_OPTIONS.otherGaps.beforeCallouts) !== null && _a !== void 0 ? _a : ""))
                .setValue((_b = this.plugin.settings.otherGaps.beforeCallouts) !== null && _b !== void 0 ? _b : "")
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                debounceMsg(value);
                this.plugin.settings.otherGaps.beforeCallouts = value;
                yield this.plugin.saveOptions();
            }));
        });
        // Format Options
        containerEl.createEl("h2", {
            text: getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Format options"),
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.FORMAT_OPTIONS, "Newline at the end of a document"))
            .setDesc(getLocale(LOCALE_CATEGORY.FORMAT_OPTIONS, "Inserts a newline at the end of a document."))
            .addToggle((text) => {
            var _a;
            return text
                .setValue((_a = this.plugin.settings.formatOptions.insertNewline) !== null && _a !== void 0 ? _a : false)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.formatOptions.insertNewline =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        // Other Options
        containerEl.createEl("h2", {
            text: getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Other options"),
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Notify when no change is needed"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Displays a different message when no change is needed."))
            .addToggle((text) => {
            var _a;
            return text
                .setValue((_a = this.plugin.settings.otherOptions.notifyWhenUnchanged) !== null && _a !== void 0 ? _a : false)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.otherOptions.notifyWhenUnchanged =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "More detailed error message"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Displays additional information when parsing fails."))
            .addToggle((text) => {
            var _a;
            return text
                .setValue((_a = this.plugin.settings.otherOptions
                .showMoreDetailedErrorMessages) !== null && _a !== void 0 ? _a : false)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.otherOptions.showMoreDetailedErrorMessages =
                    value;
                yield this.plugin.saveOptions();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Format documents on modification"))
            .setDesc(getLocale(LOCALE_CATEGORY.OTHER_OPTIONS, "Automatically format documents after each modification. Triggers on save and autosave."))
            .addToggle((text) => {
            var _a;
            return text
                .setValue((_a = this.plugin.settings.otherOptions.formatOnSave) !== null && _a !== void 0 ? _a : false)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.otherOptions.formatOnSave = value;
                yield this.plugin.saveOptions();
            }));
        });
    }
}

function _loadWasmModule (sync, filepath, src, imports) {
  function _instantiateOrCompile(source, imports, stream) {
    var compileFunc = stream ? WebAssembly.compileStreaming : WebAssembly.compile;

    {
      return compileFunc(source)
    }
  }

  
var buf = null;
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

if (isNode) {
  
buf = Buffer.from(src, 'base64');

} else {
  
var raw = globalThis.atob(src);
var rawLength = raw.length;
buf = new Uint8Array(new ArrayBuffer(rawLength));
for(var i = 0; i < rawLength; i++) {
   buf[i] = raw.charCodeAt(i);
}

}


  {
    return _instantiateOrCompile(buf, imports, false)
  }
}

function formatto_wasm(imports){return _loadWasmModule(0, null, 'AGFzbQEAAAABigImYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAF/AGAFf39/f38AYAR/f39/AGABfwF/YAR/f39/AX9gAW8Bf2AGf39/f39/AGACf28AYAV/f39+fwBgAAF/YAV/f39/fwF/YAJvbwF/YAJ/fwFvYAAAYAZ/f39/f38Bf2AHf39/f39/fwBgBX9/fX9/AGAFf39+f38AYAV/f3x/fwBgAAJ/f2ACb28Bb2ABbwFvYAN/f28AYAJ+fwF/YAl/f39/f39+fn4AYAR/f39+AGADf35+AGAGf39/fX9/AGAGf39/fn9/AGAGf39/fH9/AGAEf39vbwJ/f2AEf31/fwBgBH9+f38AYAR/fH9/AALuCRQVLi9mb3JtYXR0b193YXNtX2JnLmpzHF9fd2JnX2Vycm9yXzk5OTA3NTk4MmE4ODQ4ZDQAAhUuL2Zvcm1hdHRvX3dhc21fYmcuanMnX193YmdfZ2V0X3dpdGhfcmVmX2tleV82NDEyY2YzMDk0NTk5Njk0ABgVLi9mb3JtYXR0b193YXNtX2JnLmpzHV9fd2JnX1N0cmluZ184NTY0ZTU1OTc5OWVjY2RhAAsVLi9mb3JtYXR0b193YXNtX2JnLmpzGl9fd2JnX25ld18wYzc0MDNkYjZlNzgyZjE5ABkVLi9mb3JtYXR0b193YXNtX2JnLmpzHV9fd2JnX2xlbmd0aF85ZjE3NzUyMjRjZjFkODE1AAkVLi9mb3JtYXR0b193YXNtX2JnLmpzJ19fd2JnX3Byb3RvdHlwZXNldGNhbGxfYTZiMDJlYjAwYjBmNGNlMgAaFS4vZm9ybWF0dG9fd2FzbV9iZy5qcyxfX3diZ19pbnN0YW5jZW9mX1VpbnQ4QXJyYXlfMTUyYmExZjI4OWVkY2YzZgAJFS4vZm9ybWF0dG9fd2FzbV9iZy5qcy1fX3diZ19pbnN0YW5jZW9mX0FycmF5QnVmZmVyXzdjODQzM2M2ZWQxNGZmZTMACRUuL2Zvcm1hdHRvX3dhc21fYmcuanMsX193YmdfX193YmluZGdlbl9udW1iZXJfZ2V0X2M3ZjQyYWVkMDUyNWM0NTEACxUuL2Zvcm1hdHRvX3dhc21fYmcuanMkX193YmdfX193YmluZGdlbl9pbl9hNWQ4YjIyZTUyYjI0ZGQxAA8VLi9mb3JtYXR0b193YXNtX2JnLmpzJ19fd2JnX19fd2JpbmRnZW5fdGhyb3dfNmI2NDQ0OWI5YjllZDMzYwACFS4vZm9ybWF0dG9fd2FzbV9iZy5qcxxfX3diZ19FcnJvcl85NjBjMTU1ZDNkNDllNGMyABAVLi9mb3JtYXR0b193YXNtX2JnLmpzK19fd2JnX19fd2JpbmRnZW5faXNfb2JqZWN0XzYzMzIyZWMwY2Q2ZWE0ZWYACRUuL2Zvcm1hdHRvX3dhc21fYmcuanMsX193YmdfX193YmluZGdlbl9zdHJpbmdfZ2V0XzdlZDUzMjI5OTFjYWFlYzUACxUuL2Zvcm1hdHRvX3dhc21fYmcuanMtX193YmdfX193YmluZGdlbl9ib29sZWFuX2dldF82ZWExNDlmMGE4ZGNjNWZmAAkVLi9mb3JtYXR0b193YXNtX2JnLmpzLl9fd2JnX19fd2JpbmRnZW5faXNfdW5kZWZpbmVkXzI5YTQzYjRkNDI5MjBhYmQACRUuL2Zvcm1hdHRvX3dhc21fYmcuanMwX193YmdfX193YmluZGdlbl9qc3ZhbF9sb29zZV9lcV9jYWMzNTY1ZTg5YjQxMzRjAA8VLi9mb3JtYXR0b193YXNtX2JnLmpzLl9fd2JnX19fd2JpbmRnZW5fZGVidWdfc3RyaW5nX2FiNGIzNGQyM2Q2Nzc4YmQACxUuL2Zvcm1hdHRvX3dhc21fYmcuanMfX193YmluZGdlbl9pbml0X2V4dGVybnJlZl90YWJsZQARFS4vZm9ybWF0dG9fd2FzbV9iZy5qcyBfX3diaW5kZ2VuX2Nhc3RfMDAwMDAwMDAwMDAwMDAwMQAQA4oCiAIHAgUCAAEDAxIFBAMBAAEAAQgBBgAbAwACAQMTEwMAAgwCAwwDBgAcBQIDCgMCAwACAgICBgYCAAAMAAAFDQAGAAUAHQIFAAEDAgADBQYACgYCAgMGAAECAAIAAwYCHgQDBAICAgQABQQCCgQFAgIEBQUKBgAEHwogBSECBQAGAgIDAwEBAQEABAAABAEFAAMDAwMCAgQEAgQDAwAADgAECAAABAEAAAQHIgIGAAECEgUUDhUWAgQIBggAAQ0NABEHBwQCAgQCAgICAAQDAAMBAAAFAAACCAMAAAAAAgACAAMBCAEHBwEBAAEEBAAAAAAAAAQAAAQAAAIEAgIA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AARBAUYEQCAIKAIIDAELAkACQAJAAkACQAJAAkACQAJAAkAgCC0ABSIFQe0ATQRAIAVB4QBNBEAgBUEiRg0CIAVBL0YNBCAFQdwARg0DDAsLIAVB4gBrDgUECgoKBQoLIAVB7gBrDggFCQkJBgkHCAkLIAIoAggiACACKAIARgRAIAIQfwsgAigCBCAAakEiOgAAIAIgAEEBajYCCEEADAkLIAIoAggiACACKAIARgRAIAIQfwsgAigCBCAAakHcADoAACACIABBAWo2AghBAAwICyACKAIIIgAgAigCAEYEQCACEH8LIAIoAgQgAGpBLzoAACACIABBAWo2AghBAAwHCyACKAIIIgAgAigCAEYEQCACEH8LIAIoAgQgAGpBCDoAACACIABBAWo2AghBAAwGCyACKAIIIgAgAigCAEYEQCACEH8LIAIoAgQgAGpBDDoAACACIABBAWo2AghBAAwFCyACKAIIIgAgAigCAEYEQCACEH8LIAIoAgQgAGpBCjoAACACIABBAWo2AghBAAwECyACKAIIIgAgAigCAEYEQCACEH8LIAIoAgQgAGpBDToAACACIABBAWo2AghBAAwDCyACKAIIIgAgAigCAEYEQCACEH8LIAIoAgQgAGpBCToAACACIABBAWo2AghBAAwCCwJ/IAEhCSACIQMjAEEgayIEJAACQAJ/AkACQCAAIgYoAgQiBSAAKAIIIgBPBEACQCAFIABrQQNNBEAgBiAFNgIIIARBBDYCFCAEQQxqIAYgBEEUahCkASAFIQEMAQsgBiAAQQRqIgE2AgggBigCACAAaiIALQABQQF0LwGYwUAgAC0AAEEBdC8BmMVAcsFBCHQgAC0AAkEBdC4BmMVAciAALQADQQF0LgGYwUByIgBBAE4EQCAEQQA7AQwgBCAAOwEODAELIARBDDYCFCAEQQxqIAYgBEEUahCkAQsgBC8BDEEBRg0CAn8CQAJAAkACQAJAAkACQAJAIAlBACAELwEOIgJBgPgDcUGAuANGG0UEQCACQYDIAGpB//8DcUGA+ANPDQEgAiEADAILIARBFDYCFCAGIARBFGoQsgEMDAsgBigCACEKA0AgBEEUaiIHIAYQlAEgBC0AFEEBRg0KIAQtABVB3ABHDQUgBiABQQFqNgIIIAcgBhCUASAELQAUDQogBC0AFUH1AEcNBCAFIAFB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BCQAIAQgACgCACUBEAggA0HQAGoiBSAEKAIABH4gBSAEKwMIOQMIQgEFQgALNwMAIARBEGokACADKAJQQQFHDQIgAyADKwNYOQMoIANBAzoAIAwBCyADQQc6ACALIAMgAjYCQCADIAE2AjwgA0EeNgJcIANBHzYCVCADIANBPGo2AlggAyADQSBqNgJQQZ6DwAAgA0HQAGoQYiEADAELIANBMGogABB4AkAgAygCMEGAgICAeEcEQCADQQhqIANBOGooAgA2AgAgAyADKQIwNwMAIANBBToAIAwBCyADQTxqIQUjAEEQayIEJAACQCAAKAIAJQEQBgRAIARBBGogABB9IAVBCGogBEEMaigCADYCACAFIAQpAgQ3AgAMAQsgACgCACUBEAcEQCAAKAIAJQEQAyEHEFEiBiAHJgEgBCAGNgIAIARBBGogBBB9IAVBCGogBEEMaigCADYCACAFIAQpAgQ3AgAgBkGECEkNASAGEHwMAQsgBUGAgICAeDYCAAsgBEEQaiQAIAMoAjxBgICAgHhHBEAgA0EYaiADQcQAaigCADYCACADIAMpAjw3AxAgA0EGOgAgIAMgAykCFDcCJCADIAI2AkAgAyABNgI8IANBHjYCXCADQR82AlQgAyAFNgJYIAMgA0EgajYCUEGeg8AAIANB0ABqEGIhACADQRBqEIkCDAILIANBIDYCTCADIAA2AkggA0GBhcAAIANByABqEDggA0EROgAgCyADIAMpAgQ3AiQgAyACNgJAIAMgATYCPCADQR42AlwgA0EfNgJUIAMgA0E8ajYCWCADIANBIGo2AlBBnoPAACADQdAAahBiIQAgAxCJAgsgA0HgAGokACAAC6cDAQV/IAIEfyABIAJqIQdBASEGIAEhAgJAA0AgAiAHRg0BAn8gAiwAACIDQQBOBEAgA0H/AXEhAyACQQFqDAELIAItAAFBP3EhBCADQR9xIQUgA0FfTQRAIAVBBnQgBHIhAyACQQJqDAELIAItAAJBP3EgBEEGdHIhBCADQXBJBEAgBCAFQQx0ciEDIAJBA2oMAQsgBUESdEGAgPAAcSACLQADQT9xIARBBnRyciIDQYCAxABGDQIgAkEEagshAiADQT1GDQALQQAhBgtBASEFAkADQCABIAdGDQECfyABLAAAIgJBAE4EQCACQf8BcSECIAFBAWoMAQsg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AgAgA0EgaiAGIAFBGGxqIgVBCGopAwA3AwAgA0EoaiAFQRBqKQMANwMAIAMgBykCADcDCCADIAUpAwA3AxggBEEMSQRAIAFBAWohBSAEQQxsIgcEQCACQYwCaiAIIAVBDGxqIAf8CgAACyAEQRhsIgQEQCACIAYgBUEYbGogBPwKAAALIAYgATsBkgMgACADKQMINwIAIABBCGogA0EQaigCADYCACAAIAMpAxg3AxAgAEEYaiADQSBqKQMANwMAIABBIGogA0EoaikDADcDACADQTBqJAAPC0EAIARBC0Hgy8AAEEgAC8QCAQR/IABCADcCECAAAn9BACABQYACSQ0AGkEfIAFB////B0sNABogAUEmIAFBCHZnIgNrdkEBcSADQQF0a0E+agsiAjYCHCACQQJ0QfiNwQBqIQRBASACdCIDQZSRwQAoAgBxRQRAIAQgADYCACAAIAQ2AhggACAANgIMIAAgADYCCEGUkcEAQZSRwQAoAgAgA3I2AgAPCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEFA0AgAyAFQR12QQRxaiIEKAIQIgJFDQIgBUEBdCEFIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAEQRBqIAA2AgAgACADNgIYIAAgADYCDCAAIAA2AggLswICA38BfiMAQSBrIgMkAAJAIAJFBEAgAEEANgIIIABCgICAgBA3AgAMAQsCQCACrSIGQiCIUARAIANBFGogBqciBUEBQQEQZCADKAIYIQQgAygCFEEBRwRAIANBADYCECADIAMoAhw2AgwgAyAENgIIIANBCGogASABQQFqEJUBIAMoAhAhASACQQFHBEADQCABBEAgAygCDCIEIAFqIAQgAfwKAAALIAMgAygCEEEBdCIBNgIQIAJBBEkgAkEBdiECRQ0ACwsgASAFRg0CIAUgAWsiAgRAIAEgAygCDCIEaiAEIAL8CgAACyADIAU2AhAMAgsgBCADKAIcEN0BAAtB7JrAAEERQYCbwAAQrgEACyAAIAMpAgg3AgAgAEEIaiADQRBqKAIANgIACyADQSBqJAALmgYBAX8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJA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BUEIaiABKAIAEBUgBS0ACEEGRwRAIAAgBSkDCDcDACAAQRBqIAVBGGopAwA3AwAgAEEIaiAFQRBqKQMANwMADAELIAAgBSgCDDYCBCAAQQc6AAALIAVBIGokAAvEAQMBfgF/AXwjAEEgayIDJAACQAJAAkACQCABKAIAQQFrDgIBAgALAn8gASsDCCIEvUL///////////8Ag0L/////////9/8AVgRAQgMhAkEADAELIANBADoACCADQQhqEKkBQgIhAkECCyEBIAAgBDkDECAAIAI3AwggACABOgAADAILIABCADcDCCAAQQI6AAAgACABKQMINwMQDAELIABBAjoAACAAIAEpAwgiAjcDECAAIAJCP4g3AwgLIANBIGokAAuTAgIGfwF+IwBBEGsiAyQAIAIgASACaiIBSwRAQQBBABDdAQALIANBBGohBCAAKAIEIQhBASEGQQQhAgJAQQggASAAKAIAIgdBAXQiBSABIAVLGyIBIAFBCE0bIgWtIglCIIhQRQRAQQAhAQwBCyAJpyIBQf////8HSwRAQQAhAQwBCwJAAkACfyAHBEAgCCAHQQEgARDqAQwBCyABRQRAQQEhAgwCCyABQQEQiAILIgINACAEQQE2AgQMAQsgBCACNgIEQQAhBgtBCCECCyACIARqIAE2AgAgBCAGNgIAIAMoAgRBAUYEQCADKAIIIAMoAgwQ3QEACyADKAIIIQEgACAFNgIAIAAgATYCBCADQRBqJAALjgEBAX8jAEFAaiIEJAAgBCACNgIMIAQgATYCCCAEQRBqIgFBoJjAACADEEIgBEEANgIkIARCgICAgBA3AhwgBEECNgI8IARBATYCNCAEQQI2AiwgBCAEQRxqIgI2AjggBCAEQQhqNgIwIAQgATYCKCAAQYqAwAAgBEEoahA4IAIQiQIgARCJAiAEQUBrJAALlQEBA38jAEEgayICJAAgAkEUaiIDIAAoAgAlARARIAIoAhQhACACIAIoAhgiBDYCHCACIAA2AhggAiAENgIUIAIgAxCBASACIAIoAgQiADYCECACIAIoAgA2AgwgAiAANgIIIAJB0QA2AhggAiACQQhqIgA2AhQgASgCACABKAIEQbyWwAAgAxAlIAAQiQIgAkEgaiQAC4gBAQV/IwBBEGsiAyQAAkACQCACQQdNBEAgAg0BDAILIANBCGpBLiABIAIQSSADKAIIQQFGIQQMAQsgAkEBayEGIAEhBQNAIAUtAABBLkYiBA0BIAVBAWohBSAGIgdBAWshBiAHDQALCyAAIAQgAC0ABHI6AAQgACgCACABIAIQ4wEgA0EQaiQAC5AIAQp/IwBBEGsiByQAIAdBBGohBSMAQUBqIgMkAAJAAkAgASgCACIIKAIUIgIgCCgCECIESQRAIAhBDGohCiAIKAIMIQsDQCACIAtqLQAAIglBCWsiBkEXS0EBIAZ0QZOAgARxRXINAiAIIAJBAWoiAjYCFCACIARHDQALIAQhAgsgA0EDNgI0QQEhBiADQShqIAhBDGogAkEBaiICIAQgAiAESRsQMSAFIANBNGogAygCKCADKAIsEKABNgIEDAELIAlB/QBGBEBBACEGIAVBADoAAQwBCwJAIAEtAARFBEAgCUEsRw0BQQEhBiAIIAJBAWoiAjYCFCACIARJBEADQAJAAkACQAJAIAIgC2otAAAiCUEMTQRAIAlBCWtBAk8NAQwECwJAIAlBIGsOAwQBAgALIAlBDUYNAyAJQf0ARg0CCyADQRE2AjQgA0EIaiAKIAJBAWoiAiAEIAIgBEkbEDEgBSADQTRqIAMoAgggAygCDBCgATYCBAwHCyAFQQE6AAFBACEGDAYLIANBFTYCNCADQRhqIAogAkEBaiICIAQgAiAESRsQMSAFIANBNGogAygCGCADKAIcEKABNgIEDAULIAggAkEBaiICNgIUIAIgBEcNAAsgBCECCyADQQU2AjQgA0EQaiAKIAJBAWoiAiAEIAIgBEkbEDEgBSADQTRqIAMoAhAgAygCFBCgATYCBAwCC0EAIQYgAUEAOgAEIAlBIkcEQCADQRE2AjRBASEGIAMgCiACQQFqIgIgBCACIARJGxAxIAUgA0E0aiADKAIAIAMoAgQQoAE2AgQMAgsgBUEBOgABDAELIANBCDYCNEEBIQYgA0EgaiAKIAJBAWoiAiAEIAIgBEkbEDEgBSADQTRqIAMoAiAgAygCJBCgATYCBAsgBSAGOgAAIANBQGskAAJAIActAARBAUYEQCAAIAcoAgg2AgQgAEGBgICAeDYCAAwBCyAHLQAFRQRAIABBgICAgHg2AgAMAQsgB0EEaiECIAEoAgAhASMAQRBrIgQkACABQQA2AgggASABKAIUQQFqNgIUIARBBGogAUEMaiABED4gBCgCCCEFAkAgBCgCBEECRgRAIAJBgICAgHg2AgAgAiAFNgIEDAELIAQoAgwhAyMAQRBrIgEkACABQQRqIANBAUEBEGQgASgCCCEIAkAgASgCBEEBRwRAIAEoAgwhBiADBEAgBiAFIAP8CgAACyACIAM2AgggAiAGNgIEIAIgCDYCACABQRBqJAAMAQsgCCABKAIMEN0BAAsLIARBEGokACAHKAIEQYCAgIB4RwRAIAAgBykCBDcCACAAQQhqIAdBDGooAgA2AgAMAQsgACAHKAIINgIEIABBgYCAgHg2AgALIAdBEGokAAuwAQEBfyMAQRBrIgIkAAJ/IAApAwBC////////////AINCgICAgICAgPj/AFoEQCACQc0ANgIMIAIgADYCCCABKAIAIAEoAgRBgYXAACACQQhqECUMAQsgAkEAOgAEIAIgATYCACACQc0ANgIMIAIgADYCCAJAIAJBkM7AAEGBhcAAIAJBCGoQJQ0AIAItAARFBEAgAUGLzsAAQQIQ4wENAQtBAAwBC0EBCyACQRBqJAALnAECA38BfiMAQSBrIgIkACABKAIAQYCAgIB4RgRAIAEoAgwhAyACQRxqIgRBADYCACACQoCAgIAQNwIUIAJBFGpBgNXAACADKAIAIgMoAgAgAygCBBAlGiACQRBqIAQoAgAiAzYCACACIAIpAhQiBTcDCCABQQhqIAM2AgAgASAFNwIACyAAQezWwAA2AgQgACABNgIAIAJBIGokAAuNAQEEfyMAQRBrIgIkAAJ/QQEgASgCACIDQScgASgCBCIFKAIQIgERAAANABogAiAAKAIAQYECEB8CQCACLQANIgBBgQFPBEAgAyACKAIAIAERAABFDQFBAQwCCyADIAIgAi0ADCIEaiAAIARrIAUoAgwRAQBFDQBBAQwBCyADQScgAREAAAsgAkEQaiQAC4UBAQF/IwBBEGsiAyQAIAIgASACaiIBSwRAQQBBABDdAQALIANBBGogACgCACICIAAoAgRBCCABIAJBAXQiAiABIAJLGyIBIAFBCE0bIgEQcCADKAIEQQFGBEAgAygCCCADKAIMEN0BAAsgAygCCCECIAAgATYCACAAIAI2AgQgA0EQaiQAC3IAAn8gA0EASARAQQEhAUEAIQNBBAwBCwJ/AkACfyABBEAgAiABQQEgAxDqAQwBCyADRQRAQQEhAQwCCyADQQEQiAILIgENACAAQQE2AgRBAQwBCyAAIAE2AgRBAAshAUEICyAAaiADNgIAIAAgATYCAAuKAgEEfyMAQRBrIgMkACADIAE2AgACQCADELwBRQRAIANBBGohBCMAQSBrIgIkACACIAE2AgwgAkEQaiACQQxqEHgCQCACKAIQQYCAgIB4RwRAIAQgAikCEDcCACAEQQhqIAJBGGooAgA2AgAMAQsgAkEMaiACQR9qQcibwAAQLSEFIARBgICAgHg2AgAgBCAFNgIECyABQYQITwRAIAEQfAsgAkEgaiQAIAMoAgRBgICAgHhGBEAgACADKAIINgIEIABBgYCAgHg2AgAMAgsgACADKQIENwIAIABBCGogA0EMaigCADYCAAwBCyAAQYCAgIB4NgIAIAFBhAhJDQAgARB8CyADQRBqJAALYgEEfiAAIAJC/////w+DIgMgAUL/////D4MiBH4iBSAEIAJCIIgiAn4iBCADIAFCIIgiBn58IgFCIIZ8IgM3AwAgACADIAVUrSACIAZ+IAEgBFStQiCGIAFCIIiEfHw3AwgLiAEBBH8CQAJAAkAgACgCACIAKAIADgIAAQILIAAoAggiAUUNASAAKAIEIAFBARD0AQwBCyAALQAEQQNHDQAgACgCCCIBKAIAIQMgASgCBCIEKAIAIgIEQCADIAIRBAALIAQoAgQiAgRAIAMgAiAEKAIIEPQBCyABQQxBBBD0AQsgAEEUQQQQ9AELcAEEfyMAQRBrIgMkACADQQxqIQUCQCACRQ0AIAAoAgAiBkUNACADIAE2AgwgAiAGbCEEIAAoAgQhAiADQQhqIQULIAUgBDYCAAJAIAMoAgwiAEUNACADKAIIIgFFDQAgAiABIAAQ9AELIANBEGokAAvYAQEEfyMAQTBrIgEkAAJ/IAAoAgAiAkUEQEEAIQBBAAwBCyABIAI2AiQgAUEANgIgIAEgAjYCFCABQQA2AhAgASAAKAIEIgI2AiggASACNgIYIAAoAgghAEEBCyECIAEgADYCLCABIAI2AhwgASACNgIMIwBBEGsiACQAIABBBGogAUEMaiIDEF0gACgCBCICBEADQCACIAAoAgwiBEEMbGpBjAJqQQFBARB0IAIgBEEYbGoQqQEgAEEEaiADEF0gACgCBCICDQALCyAAQRBqJAAgAUEwaiQAC9sBAQR/IwBBEGsiAiQAIAIgATYCBAJAIAJBBGoQvAFFBEAjAEEQayIDJAAgAyABNgIIIAJBCGoiBAJ/IANBCGoQ1QFB/wFxIgVBAkcEQCAEIAU6AAFBAAwBCyAEIANBCGogA0EPakGInMAAEC02AgRBAQs6AAAgAUGECE8EQCABEHwLIANBEGokAEEBIQECQCACLQAIQQFGBEAgACACKAIMNgIEDAELIAAgAi0ACToAAUEAIQELIAAgAToAAAwBCyAAQYAEOwEAIAFBhAhJDQAgARB8CyACQRBqJAALjgEBAX8jAEEgayICJAAgAkEANgIIIAJCgICAgBA3AgAgAkGgpcAANgIQIAJCoICAgAY3AhQgAiACNgIMIAEoAgAgAkEMaiABKAIEKAIQEQAABEBByKXAAEE3IAJBH2pBuKXAAEGApsAAEIUBAAsgACACKQIANwIAIABBCGogAkEIaigCADYCACACQSBqJAALggEBAn8jAEEgayICJAAgAkEUaiABKAIAJQEQDQJAIAIoAhQiAUUEQEGAgICAeCEBDAELIAIgAigCGCIDNgIcIAIgATYCGCACIAM2AhQgAkEIaiACQRRqEIEBIAIoAgghAyAAIAIoAgwiATYCCCAAIAM2AgQLIAAgATYCACACQSBqJAALagEDfyMAQRBrIgEkACAAKAIMIgIgACgCBCIDRwRAIAIgA2tBBHYhAgNAIANBBGoQiQIgA0EQaiEDIAJBAWsiAg0ACwsgASAAKAIANgIMIAEgACgCCDYCCCABQQhqQQRBEBB0IAFBEGokAAt6AQN/IwBBIGsiAiQAIAJBFGoiAyAAKAIAJQEQAiACQQhqIAIoAhQgAigCGBDrASACIAIoAgggAigCDBCmASACKAIAIQAgAyACKAIEIgQ2AgggAyAANgIEIAMgBDYCACACKAIYIAIoAhwgARCSAiADEIkCIAJBIGokAAtvAQF/IwBBEGsiBSQAIAFFBEBBiKjAAEEyEIwCAAsgBUEIaiABIAMgBCACKAIQEQYAIAAgBSgCCCICQQJGIgE2AgggACAFKAIMIgNBACABGzYCBCAAQQAgA0GACCACQQFxGyABGzYCACAFQRBqJAALjgEBAX8CQAJAIABBhAhPBEAgANBvJgFBwI3BACgCAA0BQcCNwQBBfzYCACAAQdSNwQAoAgAiAUkNAiAAIAFrIgBBzI3BACgCAE8NAkHIjcEAKAIAIABBAnRqQdCNwQAoAgA2AgBB0I3BACAANgIAQcCNwQBBwI3BACgCAEEBajYCAAsPC0HMzsAAELsBCwAL4QEBB38jAEEQayICJAAgAkEEaiABKAIAEJoCIgdBAUEBEGQgAigCCCEFIAIoAgRBAUYEQCAFIAIoAgwQ3QEACyACKAIMIQYgASgCABCaAiEEIwBBEGsiAyQAIAEoAgAiCBCaAiEBIAMgBDYCDCADIAE2AgggASAERwRAIwBBEGsiACQAIAAgA0EMajYCDCAAIANBCGo2AgggAEEIakGAi8EAIABBDGpBgIvBAEH4p8AAEFUACyAGIAQgCCUBEAUgA0EQaiQAIAAgBzYCCCAAIAY2AgQgACAFNgIAIAJBEGokAAtqAQF/IwBBEGsiBiQAIAFFBEBBiKjAAEEyEIwCAAsgBkEIaiABIAMgBCAFIAIoAhARBQAgBigCDCEBIAAgBigCCCICNgIIIAAgAUEAIAJBAXEiAhs2AgQgAEEAIAEgAhs2AgAgBkEQaiQAC2YBA38jAEEQayIBJAAgAUEEaiAAKAIAIgIgACgCBEEIIAJBAXQiAiACQQhNGyICEHAgASgCBEEBRgRAIAEoAgggASgCDBDdAQALIAEoAgghAyAAIAI2AgAgACADNgIEIAFBEGokAAtoAQF/IwBBEGsiBSQAIAFFBEBBiKjAAEEyEIwCAAsgBUEIaiABIAMgBCACKAIQEQYAIAUoAgwhASAAIAUoAggiAjYCCCAAIAFBACACQQFxIgIbNgIEIABBACABIAIbNgIAIAVBEGokAAtpAQJ/IwBBEGsiAiQAAkAgACABKAIIIgMgASgCAEkEfyACQQhqIAEgA0EBQQEQWSACKAIIIgNBgYCAgHhHDQEgASgCCAUgAws2AgQgACABKAIENgIAIAJBEGokAA8LIAMgAigCDBDdAQALaQECfyMAQRBrIgIkAAJAIAAgASgCCCIDIAEoAgBJBH8gAkEIaiABIANBBEEEEFkgAigCCCIDQYGAgIB4Rw0BIAEoAggFIAMLNgIEIAAgASgCBDYCACACQRBqJAAPCyADIAIoAgwQ3QEAC2kBAn8gACgCCCIBBEAgACgCBCEAA0ACQAJAAkACQCAALQAADgUDAwMBAgALIABBBGoQdQwCCyAAQQRqQQFBARB0DAELIABBBGoiAhCDASACQQhBGBB0CyAAQRhqIQAgAUEBayIBDQALCwtiAQF/IwBBEGsiBSQAIAFFBEBBiKjAAEEyEIwCAAsgBUEIaiABIAMgBCACKAIQEQYAIAAgBS0ACCIBNgIIIAAgBSgCDEEAIAEbNgIEIABBACAFLQAJIAEbNgIAIAVBEGokAAtcAQF/IwBBIGsiBSQAIAUgATYCBCAFIAA2AgAgBSADNgIMIAUgAjYCCCAFIAVBCGqtQoCAgIDwDoQ3AxggBSAFrUKAgICAsA6ENwMQQfmEwAAgBUEQaiAEEK0BAAtfAQJ/IwBBIGsiBiQAIAFFBEBBiKjAAEEyEIwCAAsgBkEUaiIHIAEgAyAEIAUgAigCEBEFACAGQQhqIAcQggEgBiAGKAIIIAYoAgwQ6wEgACAGKQMANwIAIAZBIGokAAtgAQF/IwBBEGsiBCQAIAFFBEBBiKjAAEEyEIwCAAsgBEEIaiABIAMgAigCEBEDACAAIAQtAAgiATYCCCAAIAQoAgxBACABGzYCBCAAQQAgBC0ACSABGzYCACAEQRBqJAALSQEBfyMAQRBrIgIkACABIAAoAgAiAEF/c0EfdkEBQQAgACAAQR91IgFzIAFrIAJBBmoiARArIgAgAWpBCiAAaxAcIAJBEGokAAtcACAAENkBIABBDGoQ2QEgAEEYahDZASAAQSRqENkBIABBMGoQ2QEgAEE8ahDZASAAQcgAahDZASAAQdQAahDZASAAQeAAahDZASAAQewAahDZASAAQfgAahDZAQtcAQF/IwBBEGsiBiQAIAFFBEBBiKjAAEEyEIwCAAsgBkEIaiABIAMgBCAFIAIoAhARFAAgBigCDCEBIAAgBigCCCICNgIEIAAgAUEAIAJBAXEbNgIAIAZBEGokAAtcAQF/IwBBEGsiBiQAIAFFBEBBiKjAAEEyEIwCAAsgBkEIaiABIAMgBCAFIAIoAhARBQAgBigCDCEBIAAgBigCCCICNgIEIAAgAUEAIAJBAXEbNgIAIAZBEGokAAtcAQF/IwBBEGsiBiQAIAFFBEBBiKjAAEEyEIwCAAsgBkEIaiABIAMgBCAFIAIoAhARFQAgBigCDCEBIAAgBigCCCICNgIEIAAgAUEAIAJBAXEbNgIAIAZBEGokAAtdAQJ/IwBBIGsiBSQAIAFFBEBBiKjAAEEyEIwCAAsgBUEUaiIGIAEgAyAEIAIoAhARBgAgBUEIaiAGEIIBIAUgBSgCCCAFKAIMEOsBIAAgBSkDADcCACAFQSBqJAALXAEBfyMAQRBrIgYkACABRQRAQYiowABBMhCMAgALIAZBCGogASADIAQgBSACKAIQERYAIAYoAgwhASAAIAYoAggiAjYCBCAAIAFBACACQQFxGzYCACAGQRBqJAALWwECfyABKAIEIQMCQAJAIAEoAggiAUUEQEEBIQIMAQsgAUEBEIgCIgJFDQELIAEEQCACIAMgAfwKAAALIAAgATYCCCAAIAI2AgQgACABNgIADwtBASABEN0BAAtaAQF/IwBBEGsiBSQAIAFFBEBBiKjAAEEyEIwCAAsgBUEIaiABIAMgBCACKAIQEQYAIAUoAgwhASAAIAUoAggiAjYCBCAAIAFBACACQQFxGzYCACAFQRBqJAALSAIBfwJ+IwBBIGsiAiQAIAEgACkDACIDQgBZQQFBACADIANCP4ciBIUgBH0gAkEMaiIBECkiACABakEUIABrEBwgAkEgaiQAC1gBAX8jAEEQayIEJAAgAUUEQEGIqMAAQTIQjAIACyAEQQhqIAEgAyACKAIQEQMAIAQoAgwhASAAIAQoAggiAjYCBCAAIAFBACACQQFxGzYCACAEQRBqJAALowEBBH8jAEEQayIDJAAgASgCACICKAIAQQFHBH9BAAUgA0EIaiEEIwBBEGsiASQAIAJBBGoiAi0AAEEDRwR/QQAFIAFBCGogAigCBCIFKAIAIAUoAgQoAhgRAgAgASgCDCEFIAEoAggLIQIgBCAFNgIEIAQgAjYCACABQRBqJAAgAygCDCEEIAMoAggLIQEgACAENgIEIAAgATYCACADQRBqJAALUwECfyMAQRBrIgIkAAJAIAEoAggiAyABKAIESQRAIABBADoAACAAIAEoAgAgA2otAAA6AAEMAQsgAkEENgIEIAAgASACQQRqEKMBCyACQRBqJAALTwEBfyACIAFrIgIgACgCACAAKAIIIgNrSwRAIAAgAyACQQFBARChASAAKAIIIQMLIAIEQCAAKAIEIANqIAEgAvwKAAALIAAgAiADajYCCAtQAgF/AX4jAEEgayIDJAAgAyABNgIMIAMgADYCCCADQoCAgIDQByIEIANBCGqthDcDGCADIAQgA0EMaq2ENwMQQdaBwAAgA0EQaiACEK0BAAtMAQF/IAAoAgAgACgCCCIDayACSQRAIAAgAyACQQFBARChASAAKAIIIQMLIAIEQCAAKAIEIANqIAEgAvwKAAALIAAgAiADajYCCEEAC0cBAX8gACgCACAAKAIIIgNrIAJJBEAgACADIAIQZyAAKAIIIQMLIAIEQCAAKAIEIANqIAEgAvwKAAALIAAgAiADajYCCEEAC0MBA38CQCACRQ0AA0AgAC0AACIEIAEtAAAiBUYEQCAAQQFqIQAgAUEBaiEBIAJBAWsiAg0BDAILCyAEIAVrIQMLIAMLRwEBfyAAKAIAIAAoAggiA2sgAkkEQCAAIAMgAhBvIAAoAgghAwsgAgRAIAAoAgQgA2ogASAC/AoAAAsgACACIANqNgIIQQALTwECfyAAKAIEIQIgACgCACEDAkAgACgCCCIALQAARQ0AIANBxYvBAEEEIAIoAgwRAQBFDQBBAQ8LIAAgAUEKRjoAACADIAEgAigCEBEAAAtEAQF/IwBBEGsiASQAIAFBCGogACAAKAIAQQFBBEEQEGMgASgCCCIAQYGAgIB4RwRAIAAgASgCDBDdAQALIAFBEGokAAs2AQF/IwBBEGsiAiQAIAFBAUEBQQAgACgCACACQQZqIgEQKyIAIAFqQQogAGsQHCACQRBqJAALNgEBfyMAQSBrIgIkACABQQFBAUEAIAApAwAgAkEMaiIBECkiACABakEUIABrEBwgAkEgaiQAC0EAIAAQ2QEgAEEMahDZASAAQRhqENkBIABBJGoQ2QEgAEEwahDZASAAQTxqENkBIABByABqENkBIABB1ABqENkBC0MBAX9BFEEEEIgCIgNFBEBBBEEUEI8CAAsgAyACNgIQIAMgATYCDCADIAApAgA3AgAgA0EIaiAAQQhqKAIANgIAIAMLQQEBfyMAQRBrIgUkACAFQQhqIAAgASACIAMgBBBjIAUoAggiAEGBgICAeEcEQCAAIAUoAgwQ3QEACyAFQRBqJAALo24DJn8UfgF8IAEoAggiAkGAgIABcSEDIAArAwAhPAJAAkAgAkGAgICAAXFFBEAgASADQQBHIRBBACEBIwBBgAFrIgskACA8vSIyQv////////8HgyIrQoCAgICAgIAIhCAyQgGGQv7///////8PgyAyQjSIp0H/D3EiAxsiKUIBgyEoQQIhAAJAAkACQAJAAkAgK1AiAkECQQMgAhtBBCAyQoCAgICAgID4/wCDIitQGyArQoCAgICAgID4/wBRG0EBaw4EAAECAwQLQQMhAAwDC0EEIQAMAgsgA0GzCGshASAoUCEAQgEhKgwBC0KAgICAgICAICApQgGGIClCgICAgICAgAhRIgEbISlCAkIBIAEbISogKFAhAEHLd0HMdyABGyADaiEBCyALIAE7AXggCyAqNwNwIAtCATcDaCALICk3A2AgCyAAOgB6An8CQAJAAkACQCAAQQFNBEAgC0EgaiEGIAtBD2ohByMAQdAAayIAJAACQAJAAkACQAJAAkACQAJAAkACQCALQeAAaiIBKQMAIihQRQRAIAEpAwgiKVANASABKQMQIitQDQIgKyAoICt8IipWDQMgKCApVA0EICpCgICAgICAgIAgWg0FIAAgAS8BGCIBOwFAIAAgKCApfSIrNwM4IAAgKyAqeSIphiItICmIIiw3A0ggKyAsUg0JIAAgATsBQCAAICg3AzggACAoICmGIisgKYgiLDcDSCAoICxSDQlBoH8gASApp2siA2vBQdAAbEGwpwVqQc4QbSIBQdAASw0HIABBIGogAUEEdCIBKQOY6kAiKCAqICmGEHIgAEEQaiAoIC0QciAAICggKxByQgFBACADIAEvAaDqQGprQT9xrSIvhiIsQgF9ITAgACkDEEI/hyE1IAApAwBCP4ghNiAAKQMIITcgAS8BoupAIQIgACkDGCE4IAApAygiOiAAKQMgQj+IIjt8IjNCAXwiLiAviKciA0GQzgBPBEAgA0HAhD1JDQcgA0GAwtcvTwRAQQhBCSADQYCU69wDSSIBGyEMQYDC1y9BgJTr3AMgARshAQwKC0EGQQcgA0GAreIESSIBGyEMQcCEPUGAreIEIAEbIQEMCQsgA0HkAE8EQEECQQMgA0HoB0kiARshDEHkAEHoByABGyEBDAkLQQpBASADQQlLIgwbIQEMCAtB2PTAAEEcQYj2wAAQ4AEAC0GY9sAAQR1BuPbAABDgAQALQcj2wABBHEHk9sAAEOABAAtBvPjAAEE2QfT4wAAQ4AEAC0H098AAQTdBrPjAABDgAQALQYT3wABBLUG098AAEOABAAtBBEEFIANBoI0GSSIBGyEMQZDOAEGgjQYgARshAQwBCyABQdEAQcj1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IA1BKEHo58AAEEgAC0ERQRFB5PrAABCWAQALIAxBEUH0+sAAEJYBAAtBACAMQRFBhPvAABBIAAtBACAFQShB6OfAABBIAAsMEAsMBwtB9PfAAEE3QZT7wAAQ4AEAC0G8+MAAQTZBpPvAABDgAQALQcj2wABBHEHE+sAAEOABAAtBmPbAAEEdQbT6wAAQ4AEAC0HY9MAAQRxBpPrAABDgAQALQQAgAkEoQejnwAAQSAALQc7nwABBGkHo58AAEOABAAtBKEEoQejnwAAQlgEACwsgHyAeIBAbIQMgECAgciECIAsgCygCUCALKAJUIAsvAVhBACALQSBqED8gCygCBCEBIAsoAgAMAgsgC0EDNgIoIAtB5OjAADYCJCALQQI7ASBBASEDQQAhAkEBIQEgC0EgagwBCyALQQM2AiggC0Hn6MAANgIkIAtBAjsBICALQSBqCyEAIAsgATYCXCALIAA2AlggCyACNgJUIAsgAzYCUCALQdAAahAhIAtBgAFqJAAPCyABIANBAEchFyABLwEOIRNBACEBIwBB8AhrIgokACA8vSIpQv////////8HgyItQoCAgICAgIAIhCApQgGGQv7///////8PgyApQjSIp0H/D3EiAxsiKEIBgyErQQIhAAJAAkACQAJAAkAgLVAiAkECQQMgAhtBBCApQoCAgICAgID4/wCDIi1QGyAtQoCAgICAgID4/wBRG0EBaw4EAAECAwQLQQMhAAwDC0EEIQAMAgsgA0GzCGshASArUCEAQgEhKgwBC0KAgICAgICAICAoQgGGIChCgICAgICAgAhRIgEbIShCAkIBIAEbISogK1AhAEHLd0HMdyABGyADaiEBCyAKIAE7AegIIAogKjcD4AggCkIBNwPYCCAKICg3A9AIIAogADoA6ggCfwJAIABBAU0EQEF0QQUgAcEiAEEASBsgAGwiAEHA/QBJDQFB4OnAAEElQYjqwAAQ4AEACwJAAkAgAEECRwRAQQEhAUGZ5sAAQa3mwAAgKUIAUyIDG0GZ5sAAQQEgAxsgFxshAyApQj+IpyAXciECIABBBEcNAUECIQEgCkECOwGQCCATDQJBASEBIApBATYCmAggCkGa5sAANgKUCCAKQZAIagwECyAKQQM2ApgIIApB5OjAADYClAggCkECOwGQCEEBIQNBACECQQEhASAKQZAIagwD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DQMgAEEBakEwIAH8CwAMAwsgACAFQbT5wAAQlgEAC0EAIAIgBUHE+cAAEEgAC0ExIQQCQCADDQAgCEExOgAAQTAhBCACQQFrIgBFDQAgCEEBakEwIAD8CwALIBBBAWohECAkIAIgBU9yDQAgASAEOgAAIAJBAWohAgsgAiAFSw0CIAILIQAgFCAQOwEIIBQgADYCBAsgFCAINgIAIAlBwAZqJAAMBQtBACACIAVB1PnAABBIAAtBACAEQShB6OfAABBIAAtBKEEoQejnwAAQlgEAC0EAIAFBKEHo58AAEEgAC0HO58AAQRpB6OfAABDgAQALCyAhIBcbIQMgFyAjciECIBogCi4ByAgiAEgEQCAKQQhqIAooAsAIIAooAsQIIAAgEyAKQZAIahA/IAooAgwhASAKKAIIDAELQQIhASAKQQI7AZAIIBNFBEBBASEBIApBATYCmAggCkGa5sAANgKUCCAKQZAIagwBCyAKIBM2AqAIIApBADsBnAggCkECNgKYCCAKQerowAA2ApQIIApBkAhqCyEAIAogATYCzAggCiAANgLICCAKIAI2AsQIIAogAzYCwAggCkHACGoQISAKQfAIaiQADwtBACADQShB6OfAABBIAAtBACAAQShB6OfAABBIAAtBAQF/IwBBEGsiAyQAIANBCGogASABKAIIEDEgAiADKAIIIAMoAgwQoAEhASAAQQE6AAAgACABNgIEIANBEGokAAtBAQF/IwBBEGsiAyQAIANBCGogASABKAIIEDEgAiADKAIIIAMoAgwQoAEhASAAQQE7AQAgACABNgIEIANBEGokAAtBAQF/IwBBEGsiAyQAIANBCGogASABKAIIEDEgAiADKAIIIAMoAgwQoAEhASAAQQI2AgAgACABNgIEIANBEGokAAtAAQF/IwBBIGsiAyQAIAMgAjYCHCADIAE2AhggAyACNgIUIANBCGogA0EUahCBASAAIAMpAwg3AwAgA0EgaiQAC0YBAn8gASgCBCECIAEoAgAhA0EIQQQQiAIiAUUEQEEEQQgQjwIACyABIAI2AgQgASADNgIAIABB3NXAADYCBCAAIAE2AgALRAEBf0EMQQQQiAIiAkUEQEEEQQwQjwIACyACIAEpAgA3AgAgAkEIaiABQQhqKAIANgIAIABB2NvAADYCBCAAIAI2AgALQQACQAJAAkAC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IAAoAmhBgYCAgHhGDQMgAEEdNgKcASAAQf2cwAA2ApgBIABBATYCkAEgACAAQZgBajYCjAFBppbAACAAQYwBahCXAgwMCyAAKAJ0QYGAgIB4Rg0BIABBGzYCnAEgAEGancAANgKYASAAQQE2ApABIAAgAEGYAWo2AowBQaaWwAAgAEGMAWoQlwIMCwsgACgCgAFBgYCAgHhHBEAgAEEONgKcASAAQbWdwAA2ApgBIABBATYCkAEgACAAQZgBajYCjAFBppbAACAAQYwBahCXAgwLCyAAKAIYIABBADYCGARAIABBjAFqIAAoAhwQcSAAKAKQASIIIAAoAowBIg1BgYCAgHhGDQsaIAAoApQBIREgACgCgAFBgYCAgHhHBEAgAEGAAWoQ2QELIAAgETYCiAEgACAINgKEASAAIA02AoABDAgLDBYLIAAoAhggAEEANgIYBEAgAEGMAWogACgCHBBxIAAoApABIgggACgCjAEiDUGBgICAeEYNChogACgClAEhESAAKAJ0QYGAgIB4RwRAIABB9ABqENkBCyAAIBE2AnwgACAINgJ4IAAgDTYCdAwHCwwVCyAAKAIYIABBADYCGARAIABBjAFqIAAoAhwQcSAAKAKQASIIIAAoAowBIg1BgYCAgHhGDQkaIAAoApQBIREgACgCaEGBgICAeEcEQCAAQegAahDZAQsgACARNgJwIAAgCDYCbCAAIA02AmgMBgsMFAsgACgCGCAAQQA2AhgEQCAAQYwBaiAAKAIcEHEgACgCkAEiCCAAKAKMASINQYGAgIB4Rg0IGiAAKAKUASERIAAoAlxBgYCAgHhHBEAgAEHcAGoQ2QELIAAgETYCZCAAIAg2AmAgACANNgJcDAULDBMLIAAoAhggAEEANgIYBEAgAEGMAWogACgCHBBxIAAoApABIgggACgCjAEiDUGBgICAeEYNBxogACgClAEhESAAKAJQQYGAgIB4RwRAIABB0ABqENkBCyAAIBE2AlggACAINgJUIAAgDTYCUAwECwwSCyAAKAIYIABBADYCGARAIABBjAFqIAAoAhwQcSAAKAKQASIIIAAoAowBIg1BgYCAgHhGDQYaIAAoApQBIREgACgCREGBgICAeEcEQCAAQcQAahDZAQsgACARNgJMIAAgCDYCSCAAIA02AkQMAwsMEQsgACgCGCAAQQA2AhgE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BUYEfyMAQRBrIgMkAAJ/QQAgAkEEaiICKAIAIgVFDQAaIAIoAgQhBCMAQSBrIgIkACACIAQ2AhwgAiAFNgIYIAJBEGogAkEYaiAAIAEQYSACKAIUIQYCQCACKAIQQQFxRQ0AA0AgBEUEQEEBIQdBACEEDAILIAUgBkECdGooApgDIQUgAiAEQQFrIgQ2AhwgAiAFNgIYIAJBCGogAkEYaiAAIAEQYSACKAIMIQYgAigCCEEBcQ0ACwsgAyAGNgIMIAMgBDYCCCADIAU2AgQgAyAHNgIAIAJBIGokAEEAIAMoAgANABogAygCBCADKAIMQRhsagsgA0EQaiQABUEACwskAQF/IAAoAgAgACgCCCICayABSQRAIAAgAiABQQFBARChAQsLJQAgAEUEQEGIqMAAQTIQjAIACyAAIAIgAyAEIAUgASgCEBEOAAsjACAARQRAQYiowABBMhCMAgALIAAgAiADIAQgASgCEBEGAAsjACAARQRAQYiowABBMhCMAgALIAAgAiADIAQgASgCEBEjAAsjACAARQRAQYiowABBMhCMAgALIAAgAiADIAQgASgCEBEIAAsjACAARQRAQYiowABBMhCMAgALIAAgAiADIAQgASgCEBEkAAsjACAARQRAQYiowABBMhCMAgALIAAgAiADIAQgASgCEBElAAshACAAIAEoAgw2AgQgACABKAIIQQAgAS0AAEEDRhs2AgALKAEBfyAAKAIAIgFBgICAgHhyQYCAgIB4RwRAIAAoAgQgAUEBEPQBCwsZAQF/IAEgA08EfyACIAAgAxCZAUUFIAQLCyEAIABFBEBBiKjAAEEyEIwCAAsgACACIAMgASgCEBEDAAshACAARQRAQYiowABBMhCMAgALIAAgAiADIAEoAhARAQALIgAgAC0AAEUEQCABQcjkwABBBRAgDwsgAUHN5MAAQQQQIAsfACAARQRAQYiowABBMhCMAgALIAAgAiABKAIQEQAACx0BAX9BmANBCBCIAiIARQRAQQhBmAMQjwIACyAACx0BAX9ByANBCBCIAiIARQRAQQhByAMQjwIACyAACykAIAAgAC0ABCABQS5GcjoABCAAKAIAIgAoAgAgASAAKAIEKAIQEQAACxIAQczZwABBOUHo2cAAEK0BAAvUAwIHfwF+QeyNwQAtAABBAUcEQCMAQRBrIgIkAAJ/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AgAlASABKAIAJQEQASECEFEiACACJgEgAAsQACAAKAIEIAAoAgggARAZCxEAIAAoAgAgACgCBCABEJICCxEAIAEgACgCACAAKAIEEOMBCxMAIABB3NXAADYCBCAAIAE2AgALEAAgACgCACAAKAIEIAEQGQsTACAAQSg2AgQgAEH42cAANgIACxAAIAEgACgCACAAKAIEECALYQEBfwJAAkAgAEEEaygCACICQXhxIgNBBEEIIAJBA3EiAhsgAWpPBEAgAkEAIAMgAUEnaksbDQEgABAeDAILQezVwABBLkGc1sAAEOABAAtBrNbAAEEuQdzWwAAQ4AEACwsPACAAQYDNwAAgASACECULDQAgACABIAIgAxDLAQsPACAAQZDOwAAgASACECULDgAgACgCACUBEAxBAEcLDgAgACgCACUBEA9BAEcLDwAgAEGA1cAAIAEgAhAlCw8AIABBuNrAACABIAIQJQv8AQIBfgJ/IAAoAgApAwAhAiMAQSBrIgMkAAJ/AkAgASgCCCIAQYCAgBBxRQRAIABBgICAIHENASABQQFBAUEAIAIgA0EMaiIAECkiASAAakEUIAFrEBwMAgtBACEAA0AgACADakEbaiACp0EPcS0AruZAOgAAIABBAWshACACQg9WIAJCBIghAg0ACyABQQFBvubAAEECIAAgA2pBHGpBACAAaxAcDAELQQAhAANAIAAgA2pBG2ogAqdBD3EtAMDmQDoAACAAQQFrIQAgAkIPViACQgSIIQINAAsgAUEBQb7mwABBAiAAIANqQRxqQQAgAGsQHAsgA0EgaiQACw8AIABB2ObAACABIAIQJQsPAEHkisEAQTMgABCtAQALDwBB4P3AAEErIAAQ4AEACw4AIAFBwKTAAEEQEOMBCw4AIAFB0KTAAEESEOMBCw4AIAFB4qTAAEETEOMBCw4AIAFB9aTAAEEUEOMBCw4AIAFBiaXAAEEUEOMBCwsAIAAoAgAgARBpCwcAIAAQiQILDgAgAUGQpsAAQQUQ4wELGQACfyABQQlPBEAgASAAEDoMAQsgABAUCwsKACAAQQFBARB0Cw4AIAFBrKnAAEEFEOMBC3UBAX8gACgCACECIwBBIGsiACQAAn8gAigCDEUEQCACIAEQQwwBCyAAQT02AhwgAEE9NgIUIAAgAkEMajYCECAAQT82AgwgACACNgIIIAAgAkEQajYCGCABKAIAIAEoAgRBjYLAACAAQQhqECULIABBIGokAAsJACAAIAEQCgALCgAgAEEEQQwQdAsMACAAIAEpAgA3AwALPgEBfyMAQRBrIgIkACACIAE2AgwgAiAANgIIIAJBCGoiACgCACAAKAIEQcCRwQAoAgAiAEHWACAAGxECAAALDgAgAUGw2sAAQQUQ4wELCwAgACgCACABEEsLCgAgAiAAIAEQIAsNACABQa2LwQBBGBAgCw4AIAFBqM7AAEEJEOMBCw4AIAFBsc7AAEEIEOMBCwkAIABBADYCAAsIACAAIAEQYgsHACAAIAFrCwwAQbyRwQBBAToAAAsIACAAJQEQBAsCAAsL3YsBFQBBgIDAAAulGyMjID5gYGAtLS3AwMAADmJlZ2luIDw9IGVuZCAowAQgPD0gwBApIHdoZW4gc2xpY2luZyBgwAFgwAALYnl0ZSBpbmRleCDAFiBpcyBvdXQgb2YgYm91bmRzIG9mIGDAAWDAAAtieXRlIGluZGV4IMAmIGlzIG5vdCBhIGNoYXIgYm91bmRhcnk7IGl0IGlzIGluc2lkZSDACCAoYnl0ZXMgwAYpIG9mIGDAAWDAABZzbGljZSBpbmRleCBzdGFydHMgYXQgwA0gYnV0IGVuZHMgYXQgwAAgaW5kZXggb3V0IG9mIGJvdW5kczogdGhlIGxlbiBpcyDAEiBidXQgdGhlIGluZGV4IGlzIMAAwAkgYXQgbGluZSDACCBjb2x1bW4gwAAScmFuZ2Ugc3RhcnQgaW5kZXggwCIgb3V0IG9mIHJhbmdlIGZvciBzbGljZSBvZiBsZW5ndGggwAAQcmFuZ2UgZW5kIGluZGV4IMAiIG91dCBvZiByYW5nZSBmb3Igc2xpY2Ugb2YgbGVuZ3RoIMAAB3N0cmluZyDAAA5pbnZhbGlkIHR5cGU6IMALLCBleHBlY3RlZCDAABBhc3NlcnRpb24gYGxlZnQgwBcgcmlnaHRgIGZhaWxlZAogIGxlZnQ6IMAJCiByaWdodDogwAAQYXNzZXJ0aW9uIGBsZWZ0IMAQIHJpZ2h0YCBmYWlsZWQ6IMAJCiAgbGVmdDogwAkKIHJpZ2h0OiDAAEhjYW5ub3QgYWNjZXNzIGEgVGhyZWFkIExvY2FsIFN0b3JhZ2UgdmFsdWUgZHVyaW5nIG9yIGFmdGVyIGRlc3RydWN0aW9uOiDAAMACOiDAAAEKwAAvcnVzdGMvZTQwODk0N2JmZDIwMGFmNDJkYjMyMmRhZjBmYWRmZTdlMjZkM2JkMS9saWJyYXJ5L2FsbG9jL3NyYy9jb2xsZWN0aW9ucy9idHJlZS9tYXAvZW50cnkucnMAL3J1c3RjL2U0MDg5NDdiZmQyMDBhZjQyZGIzMjJkYWYwZmFkZmU3ZTI2ZDNiZDEvbGlicmFyeS9jb3JlL3NyYy9udW0vZmx0MmRlYy9zdHJhdGVneS9ncmlzdS5ycwAvcnVzdGMvZTQwODk0N2JmZDIwMGFmNDJkYjMyMmRhZjBmYWRmZTdlMjZkM2JkMS9saWJyYXJ5L2FsbG9jL3NyYy9mbXQucnMAL3J1c3RjL2U0MDg5NDdiZmQyMDBhZjQyZGIzMjJkYWYwZmFkZmU3ZTI2ZDNiZDEvbGlicmFyeS9jb3JlL3NyYy9udW0vZGl5X2Zsb2F0LnJzAHNyYy90b29scy9wYXJzaW5nL2hlYWRpbmdzLnJzAC9ydXN0Yy9lNDA4OTQ3YmZkMjAwYWY0MmRiMzIyZGFmMGZhZGZlN2UyNmQzYmQxL2xpYnJhcnkvc3RkL3NyYy9zeXMvdGhyZWFkX2xvY2FsL25vX3RocmVhZHMucnMAL3J1c3RjL2U0MDg5NDdiZmQyMDBhZjQyZGIzMjJkYWYwZmFkZmU3ZTI2ZDNiZDEvbGlicmFyeS9hbGxvYy9zcmMvc3RyLnJzAC9ydXN0Yy9lNDA4OTQ3YmZkMjAwYWY0MmRiMzIyZGFmMGZhZGZlN2UyNmQzYmQxL2xpYnJhcnkvY29yZS9zcmMvc3RyL3BhdHRlcm4ucnMAL3J1c3RjL2U0MDg5NDdiZmQyMDBhZjQyZGIzMjJkYWYwZmFkZmU3ZTI2ZDNiZDEvbGlicmFyeS9jb3JlL3NyYy9udW0vZmx0MmRlYy9zdHJhdGVneS9kcmFnb24ucnMAL3J1c3RjL2U0MDg5NDdiZmQyMDBhZjQyZGIzMjJkYWYwZmFkZmU3ZTI2ZDNiZDEvbGlicmFyeS9jb3JlL3NyYy9udW0vYmlnbnVtLnJzAC9ydXN0Yy9lNDA4OTQ3YmZkMjAwYWY0MmRiMzIyZGFmMGZhZGZlN2UyNmQzYmQxL2xpYnJhcnkvY29yZS9zcmMvZm10L251bS5ycwAvcnVzdGMvZTQwODk0N2JmZDIwMGFmNDJkYjMyMmRhZjBmYWRmZTdlMjZkM2JkMS9saWJyYXJ5L3N0ZC9zcmMvdGhyZWFkL2xvY2FsLnJzAHNyYy90b29scy9mb3JtYXR0aW5nLnJzAC9ydXN0Yy9lNDA4OTQ3YmZkMjAwYWY0MmRiMzIyZGFmMGZhZGZlN2UyNmQzYmQxL2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwAvaG9tZS9ydW5uZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi93YXNtLWJpbmRnZW4tMC4yLjExOC9zcmMvZXh0ZXJucmVmLnJzAC9ydXN0Yy9lNDA4OTQ3YmZkMjAwYWY0MmRiMzIyZGFmMGZhZGZlN2UyNmQzYmQxL2xpYnJhcnkvYWxsb2Mvc3JjL2NvbGxlY3Rpb25zL2J0cmVlL25hdmlnYXRlLnJzAC9ydXN0Yy9lNDA4OTQ3YmZkMjAwYWY0MmRiMzIyZGFmMGZhZGZlN2UyNmQzYmQxL2xpYnJhcnkvY29yZS9zcmMvdW5pY29kZS9wcmludGFibGUucnMAL3J1c3RjL2U0MDg5NDdiZmQyMDBhZjQyZGIzMjJkYWYwZmFkZmU3ZTI2ZDNiZDEvbGlicmFyeS9hbGxvYy9zcmMvY29sbGVjdGlvbnMvYnRyZWUvbm9kZS5ycwAvcnVzdGMvZTQwODk0N2JmZDIwMGFmNDJkYjMyMmRhZjBmYWRmZTdlMjZkM2JkMS9saWJyYXJ5L2FsbG9jL3NyYy9zbGljZS5ycwAvcnVzdC9kZXBzL2hhc2hicm93bi0wLjE2LjEvc3JjL3Jhdy9tb2QucnMAL3J1c3RjL2U0MDg5NDdiZmQyMDBhZjQyZGIzMjJkYWYwZmFkZmU3ZTI2ZDNiZDEvbGlicmFyeS9jb3JlL3NyYy9mbXQvbW9kLnJzAC9ydXN0Yy9lNDA4OTQ3YmZkMjAwYWY0MmRiMzIyZGFmMGZhZGZlN2UyNmQzYmQxL2xpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMvbW9kLnJzAC9ydXN0Yy9lNDA4OTQ3YmZkMjAwYWY0MmRiMzIyZGFmMGZhZGZlN2UyNmQzYmQxL2xpYnJhcnkvY29yZS9zcmMvbnVtL2ZsdDJkZWMvbW9kLnJzAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL3NlcmRlX2pzb24tMS4wLjE0OS9zcmMvcmVhZC5ycwAvcnVzdC9kZXBzL2RsbWFsbG9jLTAuMi4xMS9zcmMvZGxtYWxsb2MucnMAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2YvanMtc3lzLTAuMy45NS9zcmMvbGliLnJzAC9ob21lL3J1bm5lci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL3NlcmRlLXdhc20tYmluZGdlbi0wLjYuNS9zcmMvbGliLnJzABBmbG9hdGluZyBwb2ludCBgwAFgAAtjaGFyYWN0ZXIgYMABYAAJaW50ZWdlciBgwAFgAAlib29sZWFuIGDAAWAAD21pc3NpbmcgZmllbGQgYMABYAARZHVwbGljYXRlIGZpZWxkIGDAAWAACEpzVmFsdWUowAEpAMALIChvcyBlcnJvciDAASkABkVycm9yKMAILCBsaW5lOiDACiwgY29sdW1uOiDAASkAwAEjAApGYWlsZWQgdG8gcGFyc2UgdGhlIGRvY3VtZW50LiBbTGluZToge0xJTkVfTlVNQkVSfV17TElORV9OVU1CRVJ9RmFpbGVkIHRvIHBhcnNlIHRoZSBkb2N1bWVudC4AAACkBBAATwAAAOQFAAAUAAAApAQQAE8AAADkBQAAIQAAAKQEEABPAAAA2AUAACEAAACkBBAATwAAAGgEAAAkAAAACmludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGUAAAA/BhAAFwAAAMgAAAARAAAARmFpbGVkIHRvIHJlYWQgb3B0aW9ucy4gU29tZSBvZiB0aGVtIGFyZSBwb3NzaWJseSBub3QgcG9zaXRpdmUgbnVtYmVyIHZhbHVlcy5kZXNjcmlwdGlvbigpIGlzIGRlcHJlY2F0ZWQ7IHVzZSBEaXNwbGF5AAAAfbOs/L0RJ5MDRadlfkDQNHGS1p92TYwyiVAvnCiPkQEEAAAABAAAAAQAAAAFAAAABAAAAAQAAAAEAAAABgAAAAUAAAD0DBAABwAAAAgAAAAJAAAABwAAAAoAAAALAAAABAAAAAQAAAAMAAAACwAAAAQAAAAEAAAADQAAAAwAAAAwDRAADgAAAA8AAAAJAAAAEAAAAAoAAABjYXBhY2l0eSBvdmVyZmxvdwAAAB0IEABKAAAACQIAADIAAAAAAAAABAAAAAQAAAARAAAARXJyb3IAQbCbwAALBQEAAAASAEHAm8AACwUBAAAAEwBB0JvAAAsFAQAAABQAQeCbwAALBQEAAAAVAEHwm8AACwUBAAAAFgBBgJzAAAsFAQAAABcAQZCcwAALpQkBAAAAGAAAAGFmdGVyUHJvcGVydGllc2JlZm9yZUNvbnRlbnRzYmVmb3JlQ29udGVudHNBZnRlckhlYWRpbmdzYmVmb3JlQ29udGVudHNBZnRlckNvZGVCbG9ja3NiZWZvcmVDb2RlQmxvY2tzYmVmb3JlQ29kZUJsb2Nrc0FmdGVySGVhZGluZ3NiZWZvcmVDYWxsb3V0c0FmdGVySGVhZGluZ3NiZWZvcmVDYWxsb3V0c2JlZm9yZVRvcExldmVsSGVhZGluZ3NiZWZvcmVGaXJzdFN1YkhlYWRpbmdiZWZvcmVTdWJIZWFkaW5nc25vdGlmeVdoZW5VbmNoYW5nZWRzaG93TW9yZURldGFpbGVkRXJyb3JNZXNzYWdlc2luc2VydE5ld2xpbmVoZWFkaW5nR2Fwc290aGVyR2Fwc2Zvcm1hdE9wdGlvbnNvdGhlck9wdGlvbnMjIACkBBAATwAAAOQFAAAUAAAApAQQAE8AAADkBQAAIQAAAKQEEABPAAAA2AUAACEAAABtaWQgPiBsZW4AAABbBBAASAAAALEAAAAWAAAAYXR0ZW1wdCB0byBqb2luIGludG8gY29sbGVjdGlvbiB3aXRoIGxlbiA+IHVzaXplOjpNQVgAAABbBBAASAAAAJoAAAAKAAAApAQQAE8AAABoBAAAJAAAAG5vdGlmeVdoZW5VbmNoYW5nZWRzaG93TW9yZURldGFpbGVkRXJyb3JNZXNzYWdlcxAQEAATAAAAIxAQAB0AAABpbnNlcnROZXdsaW5lAAAAUBAQAA0AAABQbHVnaW5PcHRpb25zaGVhZGluZ0dhcHNvdGhlckdhcHNmb3JtYXRPcHRpb25zb3RoZXJPcHRpb25zAAB1EBAACwAAAIAQEAAJAAAAiRAQAA0AAACWEBAADAAAAGFmdGVyUHJvcGVydGllc2JlZm9yZUNvbnRlbnRzYmVmb3JlQ29udGVudHNBZnRlckhlYWRpbmdzYmVmb3JlQ29udGVudHNBZnRlckNvZGVCbG9ja3NiZWZvcmVDb2RlQmxvY2tzYmVmb3JlQ29kZUJsb2Nrc0FmdGVySGVhZGluZ3NiZWZvcmVDYWxsb3V0c0FmdGVySGVhZGluZ3NiZWZvcmVDYWxsb3V0cwDEEBAADwAAANMQEAAOAAAA4RAQABsAAAD8EBAAHQAAABkREAAQAAAAKREQAB0AAABGERAAGwAAAGEREAAOAAAAYmVmb3JlVG9wTGV2ZWxIZWFkaW5nc2JlZm9yZUZpcnN0U3ViSGVhZGluZ2JlZm9yZVN1YkhlYWRpbmdzsBEQABYAAADGERAAFQAAANsREAARAAAA3gMQAB0AAABmAAAADAAAAEZhaWxlZCB0byByZWFkIGxvY2FsZSBmaWxlLnBhcnNpbmdmb3JtYXR0aW5nc3RydWN0IE90aGVyR2Fwc3N0cnVjdCBIZWFkaW5nR2Fwc3N0cnVjdCBPdGhlck9wdGlvbnNzdHJ1Y3QgRm9ybWF0T3B0aW9uc3N0cnVjdCBQbHVnaW5PcHRpb25zAAAAGQAAAAwAAAAEAAAAGgAAABsAAAAcAEHApcAAC6sCAQAAAB0AAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5AFcGEABLAAAAZgsAAA4AAABFcnJvcmNhbGxlZCBgT3B0aW9uOjp1bndyYXBfdGhyb3coKWAgb24gYSBgTm9uZWAgdmFsdWVgYGAAAADeAxAAHQAAACYAAAA7AAAApAQQAE8AAADNAQAANwAAACEAAABrChAAZQAAADUAAAAOAAAAQXR0ZW1wdGVkIHRvIGluaXRpYWxpemUgdGhyZWFkLWxvY2FsIHdoaWxlIGl0IGlzIGJlaW5nIGRyb3BwZWQAAPwDEABeAAAAawAAAA0AAADvBRAATwAAAN8BAAAZAAAA///////////gExAAQfinwAALWRAKEABaAAAAlzUAAAEAAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZAAAQAAAAAwAAAAEAAAAQQAAAEIAAAAcAEHcqMAAC/kjAQAAAEMAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5AFcGEABLAAAAZgsAAA4AAABFcnJvckVPRiB3aGlsZSBwYXJzaW5nIGEgbGlzdEVPRiB3aGlsZSBwYXJzaW5nIGFuIG9iamVjdEVPRiB3aGlsZSBwYXJzaW5nIGEgc3RyaW5nRU9GIHdoaWxlIHBhcnNpbmcgYSB2YWx1ZWV4cGVjdGVkIGA6YGV4cGVjdGVkIGAsYCBvciBgXWBleHBlY3RlZCBgLGAgb3IgYH1gZXhwZWN0ZWQgaWRlbnRleHBlY3RlZCB2YWx1ZWV4cGVjdGVkIGAiYGludmFsaWQgZXNjYXBlaW52YWxpZCBudW1iZXJudW1iZXIgb3V0IG9mIHJhbmdlaW52YWxpZCB1bmljb2RlIGNvZGUgcG9pbnRjb250cm9sIGNoYXJhY3RlciAoXHUwMDAwLVx1MDAxRikgZm91bmQgd2hpbGUgcGFyc2luZyBhIHN0cmluZ2tleSBtdXN0IGJlIGEgc3RyaW5naW52YWxpZCB2YWx1ZTogZXhwZWN0ZWQga2V5IHRvIGJlIGEgbnVtYmVyIGluIHF1b3Rlc2Zsb2F0IGtleSBtdXN0IGJlIGZpbml0ZSAoZ290IE5hTiBvciArLy1pbmYpbG9uZSBsZWFkaW5nIHN1cnJvZ2F0ZSBpbiBoZXggZXNjYXBldHJhaWxpbmcgY29tbWF0cmFpbGluZyBjaGFyYWN0ZXJzdW5leHBlY3RlZCBlbmQgb2YgaGV4IGVzY2FwZXJlY3Vyc2lvbiBsaW1pdCBleGNlZWRlZHVsbHJ1ZWFsc2UAAAAAAAAA8D8AAAAAAAAkQAAAAAAAAFlAAAAAAABAj0AAAAAAAIjDQAAAAAAAavhAAAAAAICELkEAAAAA0BJjQQAAAACE15dBAAAAAGXNzUEAAAAgX6ACQgAAAOh2SDdCAAAAopQabUIAAEDlnDCiQgAAkB7EvNZCAAA0JvVrDEMAgOA3ecNBQwCg2IVXNHZDAMhOZ23Bq0MAPZFg5FjhQ0CMtXgdrxVEUO/i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c41OAnPNdlvQMOI2c4FUcgS9mmxz0HTHIrbgoXMEUnmr41jWc4amV5Yc7wt0FMj23XF1QXQYenRVztJ1dJ6Y0eqBR6t0Y//CMrEM4XQ8v3N/3U8VdQuvUN/Uo0p1Z22SC2WmgHXACHdO/s+0dfHKFOL9A+p11v5MrX5CIHaMPqBYHlNUdi9OyO7lZ4l2u2F6at/Bv3YVfYyiK9nzdlqcL4t2zyh3cIP7LVQDX3cmMr2cFGKTd7B+7MOZOsh3XJ7nNEBJ/nf5whAhyO0yeLjzVCk6qWd4pTCqs4iTnXhnXkpwNXzSeAH2XMxCGwd5gjN0fxPiPHkxoKgvTA1yeT3IkjufkKZ5TXp3Csc03HlwrIpm/KAReoxXLYA7CUZ6b604YIqLe3plbCN8Njexen9HLBsEheV6Xln3IUXmGnvblzo1689Qe9I9iQLmA4V7Ro0rg99EuntMOPuxC2vwe18Gep7OhSR89ocYRkKnWXz6VM9riQiQfDgqw8arCsR8x/RzuFYN+Xz48ZBmrFAvfTuXGsBrkmN9Cj0hsAZ3mH1MjClcyJTOfbD3mTn9HAN+nHUAiDzkN34DkwCqS91tfuJbQEpPqqJ+2nLQHONU136QjwTkGyoNf7rZgm5ROkJ/KZAjyuXIdn8zdKw8H3usf6DI64XzzOF/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAABAAIAAwAEAAUABgAHAAgACQD//////////////////woACwAMAA0ADgAPAP////////////////////////////////////////////////////////////////////8KAAsADAANAA4ADwD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AABAAIAAwAEAAUABgAHAAgACQAP//////////////////oACwAMAA0ADgAPAA/////////////////////////////////////////////////////////////////////6AAsADAANAA4ADwAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4QJEABgAAAAswEAABoAAACECRAAYAAAAAACAAATAAAAhAkQAGAAAAAJAgAAPgAAAIQJEABgAAAABQIAADMAAACECRAAYAAAAA8CAAA6AAAAhAkQAGAAAACmAQAARQAAAIQJEABgAAAAqwEAAD0AAACECRAAYAAAAG4CAAAZAAAAgwIQAGAAAACgAQAALgAAAGFzc2VydGlvbiBmYWlsZWQ6IGlkeCA8IENBUEFDSVRZYXNzZXJ0aW9uIGZhaWxlZDogZWRnZS5oZWlnaHQgPT0gc2VsZi5oZWlnaHQgLSAxwQcQAFsAAAC2AgAACQAAAMEHEABbAAAAugIAAAkAAADBBxAAWwAAAPAAAABNAAAAYXNzZXJ0aW9uIGZhaWxlZDogc3JjLmxlbigpID09IGRzdC5sZW4oKcEHEABbAAAAVAcAAAUAAADBBxAAWwAAANAEAAAjAAAAwQcQAFsAAAATBQAAJAAAAGFzc2VydGlvbiBmYWlsZWQ6IGVkZ2UuaGVpZ2h0ID09IHNlbGYubm9kZS5oZWlnaHQgLSAxAAAAwQcQAFsAAAADBAAACQAAAAsHEABfAAAAWAIAADAAQfDMwAAL3Q0LBxAAXwAAAMYAAAAnAAAARAAAAAwAAAAEAAAARQAAAEYAAAAcAAAAYnl0ZSBhcnJheXVuaXQgdmFsdWVPcHRpb24gdmFsdWVuZXd0eXBlIHN0cnVjdHNlcXVlbmNlbWFwZW51bXVuaXQgdmFyaWFudG5ld3R5cGUgdmFyaWFudHR1cGxlIHZhcmlhbnRzdHJ1Y3QgdmFyaWFudC4wAAAAAAAAAAgAAAAEAAAATgAAAE8AAABQAAAAYSBib29sZWFuYSBzdHJpbmcAAACjBhAAZwAAAHwAAAARAAAAowYQAGcAAACJAAAAEQAAAG1dy9YsUOtjeEGmV3Ebi7mauO6RURSWWM+WAOjSnxKKZW50aXR5IG5vdCBmb3VuZHBlcm1pc3Npb24gZGVuaWVkY29ubmVjdGlvbiByZWZ1c2VkY29ubmVjdGlvbiByZXNldGhvc3QgdW5yZWFjaGFibGVuZXR3b3JrIHVucmVhY2hhYmxlY29ubmVjdGlvbiBhYm9ydGVkbm90IGNvbm5lY3RlZGFkZHJlc3MgaW4gdXNlYWRkcmVzcyBub3QgYXZhaWxhYmxlbmV0d29yayBkb3duYnJva2VuIHBpcGVlbnRpdHkgYWxyZWFkeSBleGlzdHNvcGVyYXRpb24gd291bGQgYmxvY2tub3QgYSBkaXJlY3RvcnlpcyBhIGRpcmVjdG9yeWRpcmVjdG9yeSBub3QgZW1wdHlyZWFkLW9ubHkgZmlsZXN5c3RlbSBvciBzdG9yYWdlIG1lZGl1bWZpbGVzeXN0ZW0gbG9vcCBvciBpbmRpcmVjdGlvbiBsaW1pdCAoZS5nLiBzeW1saW5rIGxvb3Apc3RhbGUgbmV0d29yayBmaWxlIGhhbmRsZWludmFsaWQgaW5wdXQgcGFyYW1ldGVyaW52YWxpZCBkYXRhdGltZWQgb3V0d3JpdGUgemVy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Ag4JJ4FYCB0DCwM7BB4ECgeA+4QFAAEDBQUGBgIHBggHCREKHAsZDBkNEA4MDwQQAxISEwkWARcEGAEZAxoJGwEcAh8WIAMrAi0LLgEwBDECMgGpAqoEqwj6AvsF/gP/Ca14eYuNojBXWIuMkBzdDg9LTPv8Li8/XF1f4oSNjpGSqbG6u8XGycre5OX/AAQREikxNDc6Oz1JSl2EjpKpsbS6u8bKzs/k5QAEDQ4REikxNDo7RUZJSl5kZYSRm53Jzs8NESk6O0VJV1teX2RljZGptLq7xcnf5OXwDRFFSWRlgISyvL6/1dfw8YOFi6Smvr/Fx8/a20iYvc3Gzs9JTk9XWV5fiY6Psba3v8HGx9cRFhdbXPb3/v+AbXHe3w4fbm8cHV99fq6v3t9Nu7wWFx4fRkdOT1haXF5+f7XF1NXc8PH1cnOPdHUmLi+nr7e/x8/X35oAQJeYMI8fzv9OT1pbBwgPECcv7u9ubzc9P0JFU2d1yMnQ0djZ5/7/ACBfIoLfBIJECBsEBhGBrA6AqwUgB4EcAxkIAQQvBDQEBwMBBwYHEQpQDxIHVQcDBBwKCQMIAwcDAgMDAwwEBQMLBgEOFQVOBxsHVwcCBRgMUARDAy0DAQQRBg8MOgQdJV8gbQRqJYDIBYKwAxoGgv0DWQcWCRgJFAwUDGoGCgYaBlkHKwVGCiwEDAQBAzELLAQaBgsDgKwGCgZMFID0CDwDDwM+BTgIKwWC/xEYCC8RLQMiDiEPgIwEgpoWCxWIlAUvBTsHAg4YCYC+InQMgNYagRAFgOEJ8p4DNwmBXBSAuAiA3RQ8AwoGOAhGCAwGdAseA1oEWQmAgxgcChYJTASAigarpAwXBDGhBIHaJgcMBQWCsyAqBkwEgI0EgL4DGwMPDWsHEABVAAAACgAAACsAAABrBxAAVQAAABoAAAA2AAAAYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAAAAAAAEAAAABAAAAHwAAAAAAAAABAAAAAQAAAB9AAAAPT0hPW1hdGNoZXMuLlJlZkNlbGwgYWxyZWFkeSBib3Jyb3dlZCAgICBjYW5ub3QgcGFyc2UgaW50ZWdlciBmcm9tIGVtcHR5IHN0cmluZ2ludmFsaWQgZGlnaXQgZm91bmQgaW4gc3RyaW5nbnVtYmVyIHRvbyBsYXJnZSB0byBmaXQgaW4gdGFyZ2V0IHR5cGVudW1iZXIgdG9vIHNtYWxsIHRvIGZpdCBpbiB0YXJnZXQgdHlwZW51bWJlciB3b3VsZCBiZSB6ZXJvIGZvciBub24temVybyB0eXBlAACgRRAAokUQAKRFEAACAAAAAgAAAAcAAAAmAAAAHQAAACYAAAAmAAAAJgAAAMlFEADvRRAADEYQADJGEABYRhAAQciNwQALAQQAfAlwcm9kdWNlcnMCCGxhbmd1YWdlAQRSdXN0AAxwcm9jZXNzZWQtYnkDBXJ1c3RjHTEuOTQuMSAoZTQwODk0N2JmIDIwMjYtMDMtMjUpBndhbHJ1cwYwLjI2LjEMd2FzbS1iaW5kZ2VuEzAuMi4xMTggKDc1M2JiN2ZmNCkAaw90YXJnZXRfZmVhdHVyZXMGKw9tdXRhYmxlLWdsb2JhbHMrE25vbnRyYXBwaW5nLWZwdG9pbnQrC2J1bGstbWVtb3J5KwhzaWduLWV4dCsPcmVmZXJlbmNlLXR5cGVzKwptdWx0aXZhbHVl', imports)}

/** Entry Point. */
class FormattoPlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.utils = new FormattoUtils(this);
        this.icons = new FormattoIcons();
        this.ribbonIcons = new FormattoRibbonIcons(this);
        this.editorMenus = new FormattoEditorMenuEvent(this);
        this.modify = new FormattoModifyEvent(this);
        this.commands = new FormattoCommands(this);
    }
    /** Load and Save Options */
    loadOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_OPTIONS, yield this.loadData());
        });
    }
    saveOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    /** Runs whenever the user starts using the plugin in Obsidian. */
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadOptions();
            // Initialize WebAssembly
            yield (() => __awaiter(this, void 0, void 0, function* () {
                yield __wbg_init(yield formatto_wasm());
            }))();
            this.addSettingTab(new FormattoOptionTab(this.app, this));
            this.icons.registerIcons();
            this.ribbonIcons.registerRibbonIcons();
            this.editorMenus.registerEvents();
            this.modify.registerEvents();
            this.commands.registerCommands();
            console.log("Plugin Loaded: Formatto\n(Some error details are going to be displayed here.)");
        });
    }
    /** Runs when the plugin is disabled. */
    onunload() {
        console.log("Plugin Unloaded: Formatto");
    }
}

module.exports = FormattoPlugin;

/* nosourcemap */