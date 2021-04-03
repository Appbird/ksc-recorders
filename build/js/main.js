/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/client/App.ts":
/*!******************************!*\
  !*** ./src/ts/client/App.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar generateSearchView_1 = __webpack_require__(/*! ./functions/generateSearchView */ \"./src/ts/client/functions/generateSearchView.ts\");\r\nvar App = /** @class */ (function () {\r\n    function App() {\r\n        this.origin = \"http://localhost:3000\";\r\n        var result = document.getElementById(\"article\");\r\n        if (result === null)\r\n            throw new Error(\"Element whose id is article is not found.\");\r\n        this.articleDOM = result;\r\n    }\r\n    //#TODO ここの型を埋める。\r\n    App.prototype.search = function (requestCondition) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var _this = this;\r\n            return __generator(this, function (_a) {\r\n                return [2 /*return*/, fetch(this.origin + \"/recordDatabase/search/record\", {\r\n                        method: \"POST\",\r\n                        headers: { \"Content-Type\": \"application/json\" },\r\n                        body: JSON.stringify(requestCondition)\r\n                    })\r\n                        .then(function (response) { return response.json(); })\r\n                        .then(function (result) { return generateSearchView_1.generateSearchView(result, _this.articleDOM); })\r\n                        .catch(function (reason) { console.error(reason); })];\r\n            });\r\n        });\r\n    };\r\n    return App;\r\n}());\r\nexports.default = App;\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/client/App.ts?");

/***/ }),

/***/ "./src/ts/client/functions/generateSearchView.ts":
/*!*******************************************************!*\
  !*** ./src/ts/client/functions/generateSearchView.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.generateSearchView = void 0;\r\nvar RecordsCardView_1 = __webpack_require__(/*! ../view/RecordsCardView */ \"./src/ts/client/view/RecordsCardView.ts\");\r\nvar ViewUtility_1 = __webpack_require__(/*! ../../utility/ViewUtility */ \"./src/ts/utility/ViewUtility.ts\");\r\nfunction generateSearchView(input, articleDOM) {\r\n    if (!assureInputHasRecords(input)) {\r\n        displayError(input);\r\n        return;\r\n    }\r\n    var recordsData = input.recordGroups;\r\n    for (var _i = 0, recordsData_1 = recordsData; _i < recordsData_1.length; _i++) {\r\n        var recordData = recordsData_1[_i];\r\n        var element_1 = new RecordsCardView_1.RecordGroupView(recordData);\r\n        articleDOM === null || articleDOM === void 0 ? void 0 : articleDOM.appendChild(element_1.htmlElement);\r\n    }\r\n    return;\r\n}\r\nexports.generateSearchView = generateSearchView;\r\nfunction displayError(input) {\r\n    var _a;\r\n    (_a = document.getElementById(\"article\")) === null || _a === void 0 ? void 0 : _a.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n    <div class = \\\"c-recordGroupHeader\\\">\\n        <div class=\\\"c-title\\\">\\n            <div class=\\\"c-title__main\\\">\\u30C7\\u30FC\\u30BF\\u306E\\u53D6\\u5F97\\u306B\\u5931\\u6557\\u3057\\u307E\\u3057\\u305F\\u3002</div>\\n        </div>\\n        <hr noshade class=\\\"u-bold\\\">\\n        <div class=\\\"c-stateInfo\\\">\", \"</div>\\n    </div>\"], [\"\\n    <div class = \\\"c-recordGroupHeader\\\">\\n        <div class=\\\"c-title\\\">\\n            <div class=\\\"c-title__main\\\">\\u30C7\\u30FC\\u30BF\\u306E\\u53D6\\u5F97\\u306B\\u5931\\u6557\\u3057\\u307E\\u3057\\u305F\\u3002</div>\\n        </div>\\n        <hr noshade class=\\\"u-bold\\\">\\n        <div class=\\\"c-stateInfo\\\">\", \"</div>\\n    </div>\"])), input.message));\r\n    return;\r\n}\r\nfunction assureInputHasRecords(data) {\r\n    return data.isSuccess;\r\n}\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/client/functions/generateSearchView.ts?");

/***/ }),

/***/ "./src/ts/client/index.ts":
/*!********************************!*\
  !*** ./src/ts/client/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar App_1 = __importDefault(__webpack_require__(/*! ./App */ \"./src/ts/client/App.ts\"));\r\nvar app = new App_1.default();\r\napp.search([{\r\n        groupName: \"ボス1\",\r\n        gameSystemEnv: {\r\n            gameSystemID: \"0\",\r\n            gameModeID: \"0\"\r\n        },\r\n        orderOfRecordArray: \"LowerFirst\",\r\n        startOfRecordArray: 0,\r\n        limitOfRecordArray: 2,\r\n        targetIDs: [\"1\"],\r\n        abilityIDs: [],\r\n        abilityIDsCondition: \"AND\",\r\n        runnerIDs: [],\r\n        language: \"Japanese\"\r\n    }]);\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/client/index.ts?");

/***/ }),

/***/ "./src/ts/client/view/RecordsCardView.ts":
/*!***********************************************!*\
  !*** ./src/ts/client/view/RecordsCardView.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.RecordGroupView = void 0;\r\nvar ViewUtility_1 = __webpack_require__(/*! ../../utility/ViewUtility */ \"./src/ts/utility/ViewUtility.ts\");\r\nvar TagsView_1 = __webpack_require__(/*! ./TagsView */ \"./src/ts/client/view/TagsView.ts\");\r\nvar timeUtility_1 = __webpack_require__(/*! ../../utility/timeUtility */ \"./src/ts/utility/timeUtility.ts\");\r\nvar RecordGroupView = /** @class */ (function () {\r\n    function RecordGroupView(recordGroup, options) {\r\n        if (options === void 0) { options = {\r\n            displayTags: { gameSystemTags: false, targetTags: false, abilityTags: true }\r\n        }; }\r\n        this._htmlElement = document.createElement(\"div\");\r\n        this._htmlElement.classList.add(\"c-recordCardsGroup\");\r\n        this._htmlElement.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n        <div class = \\\"c-recordGroupHeader\\\">\\n            <div class=\\\"c-title\\\">\\n            <div class=\\\"c-title__main\\\">\", \"</div>\\n            <div class=\\\"c-title__sub\\\">\", \"</div>\\n            </div>\\n        <div class=\\\"c-stateInfo\\\">\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-list\\\"></i> \", \" Records </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-running\\\"></i> \", \" Runners </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-history\\\"></i> Last post </div> \", \"\\n                </div>\\n            </div>\\n        <hr noshade class=\\\"u-bold\\\">\\n        </div>\\n        \"], [\"\\n        <div class = \\\"c-recordGroupHeader\\\">\\n            <div class=\\\"c-title\\\">\\n            <div class=\\\"c-title__main\\\">\", \"</div>\\n            <div class=\\\"c-title__sub\\\">\", \"</div>\\n            </div>\\n        <div class=\\\"c-stateInfo\\\">\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-list\\\"></i> \", \" Records </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-running\\\"></i> \", \" Runners </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-history\\\"></i> Last post </div> \", \"\\n                </div>\\n            </div>\\n        <hr noshade class=\\\"u-bold\\\">\\n        </div>\\n        \"])), recordGroup.groupName, \"サブタイトル\", recordGroup.numberOfRecords, recordGroup.numberOfRunners, timeUtility_1.convertNumberIntoDateString(recordGroup.lastPost)));\r\n        for (var _i = 0, _a = recordGroup.records; _i < _a.length; _i++) {\r\n            var record = _a[_i];\r\n            this.appendRecordCard(record, options);\r\n        }\r\n    }\r\n    Object.defineProperty(RecordGroupView.prototype, \"htmlElement\", {\r\n        get: function () {\r\n            return this._htmlElement;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    RecordGroupView.prototype.appendRecordCard = function (record, options) {\r\n        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい\r\n        var ele = ViewUtility_1.element(templateObject_2 || (templateObject_2 = __makeTemplateObject([\"\\n            <div class = \\\"c-recordCard u-width95per\\\">\\n            <div class = \\\"c-title --withUnderline\\\">\\n                <div class = \\\"c-title__main\\\">\", \"</div>\\n                    <div class=\\\"c-iconWithDescription\\\">\\n                    <i class=\\\"fas fa-user\\\"></i>\", \"\\n                </div>\\n            </div>\\n\\n            \", \"\"], [\"\\n            <div class = \\\"c-recordCard u-width95per\\\">\\n            <div class = \\\"c-title --withUnderline\\\">\\n                <div class = \\\"c-title__main\\\">\", \"</div>\\n                    <div class=\\\"c-iconWithDescription\\\">\\n                    <i class=\\\"fas fa-user\\\"></i>\", \"\\n                </div>\\n            </div>\\n\\n            \", \"\"])), timeUtility_1.converseMiliSecondsIntoTime(record.score), record.runnerName, (!options.displayTags.gameSystemTags && !options.displayTags.targetTags && options.displayTags.abilityTags) ? \"\" : \"<hr noshade class=\\\"u-thin\\\">\");\r\n        var tagsViews = [new TagsView_1.TagsView(), new TagsView_1.TagsView()];\r\n        var gameEnv = record.regulation.gameSystemEnvironment;\r\n        if (options.displayTags.gameSystemTags)\r\n            tagsViews[0].generateTag(gameEnv.gameSystemName + \"/\" + gameEnv.gameModeName + \"/\" + gameEnv.gameDifficultyName, \"gameSystem\");\r\n        if (options.displayTags.targetTags)\r\n            tagsViews[0].generateTag(record.regulation.targetName, \"target\");\r\n        if (options.displayTags.abilityTags)\r\n            for (var _i = 0, _a = record.regulation.abilityNames; _i < _a.length; _i++) {\r\n                var ability = _a[_i];\r\n                tagsViews[1].generateTag((ability === undefined ? \"Not Found\" : ability), \"ability\");\r\n            }\r\n        if (options.displayTags.gameSystemTags || options.displayTags.targetTags)\r\n            ele.appendChild(tagsViews[0].getElement());\r\n        if (options.displayTags.abilityTags)\r\n            ele.appendChild(tagsViews[1].getElement());\r\n        this._htmlElement.append(ele);\r\n    };\r\n    return RecordGroupView;\r\n}());\r\nexports.RecordGroupView = RecordGroupView;\r\nvar templateObject_1, templateObject_2;\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/client/view/RecordsCardView.ts?");

/***/ }),

/***/ "./src/ts/client/view/TagsView.ts":
/*!****************************************!*\
  !*** ./src/ts/client/view/TagsView.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.TagsView = void 0;\r\nvar ViewUtility_1 = __webpack_require__(/*! ../../utility/ViewUtility */ \"./src/ts/utility/ViewUtility.ts\");\r\nvar TagsView = /** @class */ (function () {\r\n    function TagsView() {\r\n        this.element = document.createElement(\"div\");\r\n        this.element.classList.add(\"c-tags\");\r\n    }\r\n    TagsView.prototype.generateTag = function (tagName, kind) {\r\n        var icon = \"\";\r\n        switch (kind) {\r\n            case \"ability\":\r\n                icon = \"far fa-star\";\r\n                break;\r\n            case \"target\":\r\n                icon = \"far fa-flag\";\r\n                break;\r\n            case \"gameSystem\":\r\n                icon = \"fas fa-star\";\r\n                break;\r\n        }\r\n        this.element.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n            <div class = \\\"c-tag --\", \"\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                <i class=\\\"\", \"\\\"></i> \", \"\\n                </div>\\n            </div>\"], [\"\\n            <div class = \\\"c-tag --\", \"\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                <i class=\\\"\", \"\\\"></i> \", \"\\n                </div>\\n            </div>\"])), kind, icon, tagName));\r\n    };\r\n    TagsView.prototype.getElement = function () {\r\n        return this.element;\r\n    };\r\n    return TagsView;\r\n}());\r\nexports.TagsView = TagsView;\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/client/view/TagsView.ts?");

/***/ }),

/***/ "./src/ts/utility/ViewUtility.ts":
/*!***************************************!*\
  !*** ./src/ts/utility/ViewUtility.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.element = exports.htmlToElement = void 0;\r\nfunction escapeSpecialChars(str) {\r\n    return str\r\n        .replace(/&/g, \"&amp;\")\r\n        .replace(/</g, \"&lt;\")\r\n        .replace(/>/g, \"&gt;\")\r\n        .replace(/\"/g, \"&quot;\")\r\n        .replace(/'/g, \"&#039;\");\r\n}\r\nfunction htmlToElement(html) {\r\n    var template = document.createElement(\"template\");\r\n    template.innerHTML = html;\r\n    return template.content.firstElementChild;\r\n}\r\nexports.htmlToElement = htmlToElement;\r\nfunction element(strings) {\r\n    var values = [];\r\n    for (var _i = 1; _i < arguments.length; _i++) {\r\n        values[_i - 1] = arguments[_i];\r\n    }\r\n    var htmlString = strings.reduce(function (result, str, i) {\r\n        var value = values[i - 1];\r\n        if (typeof value == \"string\") {\r\n            return result + escapeSpecialChars(value) + str;\r\n        }\r\n        else {\r\n            return result + String(value) + str;\r\n        }\r\n    });\r\n    var ele = htmlToElement(htmlString);\r\n    if (ele === null)\r\n        throw new Error(\"与HTMLを要素に変換できませんでした。\");\r\n    return ele;\r\n}\r\nexports.element = element;\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/utility/ViewUtility.ts?");

/***/ }),

/***/ "./src/ts/utility/timeUtility.ts":
/*!***************************************!*\
  !*** ./src/ts/utility/timeUtility.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.convertNumberIntoDateString = exports.converseMiliSecondsIntoTime = void 0;\r\nfunction converseMiliSecondsIntoTime(timeInMiliSeconds) {\r\n    var miliSeconds = timeInMiliSeconds % 100;\r\n    var timeInSecond = Math.floor(timeInMiliSeconds / 100);\r\n    var minutes = Math.floor(timeInMiliSeconds / 3600);\r\n    var seconds = timeInSecond % 3600;\r\n    return WriteNumberIn2Digits(minutes) + \":\" + WriteNumberIn2Digits(seconds) + \".\" + WriteNumberIn2Digits(miliSeconds);\r\n}\r\nexports.converseMiliSecondsIntoTime = converseMiliSecondsIntoTime;\r\nfunction WriteNumberIn2Digits(num) {\r\n    return (num < 10) ? \"0\" + num : String(num);\r\n}\r\nfunction convertNumberIntoDateString(num) {\r\n    var date = new Date(num);\r\n    return date.getFullYear() + \"/\" + (date.getMonth() + 1) + \"/\" + date.getDate() + \" \" + WriteNumberIn2Digits(date.getHours()) + \":\" + WriteNumberIn2Digits(date.getMinutes()) + \":\" + WriteNumberIn2Digits(date.getSeconds());\r\n}\r\nexports.convertNumberIntoDateString = convertNumberIntoDateString;\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/utility/timeUtility.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/client/index.ts");
/******/ 	
/******/ })()
;