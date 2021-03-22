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

/***/ "./src/ts/client/index.ts":
/*!********************************!*\
  !*** ./src/ts/client/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar RecordsCardView_1 = __webpack_require__(/*! ../view/RecordsCardView */ \"./src/ts/view/RecordsCardView.ts\");\r\nvar receivedString = \"{\\n    \\\"isSuccess\\\": true,\\n    \\\"recordGroups\\\":[{\\n        \\\"groupName\\\":\\\"\\u30DC\\u30B91\\\",\\n        \\\"groupSubName\\\":\\\"1\\u6226\\u76EE\\\",\\n        \\\"lastPost\\\":\\\"1992/04/27 06:00\\\",\\n        \\\"numberOfRecords\\\":2,\\n        \\\"numberOfRunners\\\":1,\\n        \\\"records\\\":[{\\n            \\\"score\\\":0,\\n            \\\"regulation\\\":{\\n                \\\"gameSystemEnvironment\\\":{\\n                    \\\"gameDifficultyID\\\":0,\\n                    \\\"gameDifficultyName\\\": \\\"\\u96E3\\u6613\\u5EA6\\u540D\\\",\\n                    \\\"gameModeID\\\":0,\\n                    \\\"gameModeName\\\": \\\"\\u30E2\\u30FC\\u30C9\\u540D\\\",\\n                    \\\"gameSystemID\\\":0,\\n                    \\\"gameSystemName\\\": \\\"\\u4F5C\\u54C1\\u540D\\\"\\n                },\\n                \\\"abilityIDsOfPlayerCharacters\\\":[0,1,1,2],\\n                \\\"abilityNamesOfPlayerCharacters\\\":[\\\"\\u80FD\\u529B0\\\",\\\"\\u80FD\\u529B1\\\",\\\"\\u80FD\\u529B1\\\",\\\"\\u80FD\\u529B2\\\"],\\n                \\\"targetID\\\":1,\\n                \\\"targetName\\\": \\\"\\u30BF\\u30FC\\u30B2\\u30C3\\u30C80\\\"\\n            },\\n            \\\"runnerID\\\":0,\\n            \\\"runnerName\\\":\\\"user00000\\\",\\n            \\\"recordID\\\":0\\n        },\\n        {\\n            \\\"score\\\":0,\\n            \\\"regulation\\\":{\\n                \\\"gameSystemEnvironment\\\":{\\n                    \\\"gameDifficultyID\\\":0,\\n                    \\\"gameDifficultyName\\\": \\\"\\u96E3\\u6613\\u5EA60\\\",\\n                    \\\"gameModeID\\\":0,\\n                    \\\"gameModeName\\\": \\\"\\u30E2\\u30FC\\u30C90\\\",\\n                    \\\"gameSystemID\\\":0,\\n                    \\\"gameSystemName\\\": \\\"\\u4F5C\\u54C10\\\"\\n                },\\n                \\\"abilityIDsOfPlayerCharacters\\\":[0,1,1,2],\\n                \\\"abilityNamesOfPlayerCharacters\\\":[\\\"\\u80FD\\u529B0\\\",\\\"\\u80FD\\u529B1\\\",\\\"\\u80FD\\u529B1\\\",\\\"\\u80FD\\u529B2\\\"],\\n                \\\"targetID\\\":0,\\n                \\\"targetName\\\": \\\"\\u30BF\\u30FC\\u30B2\\u30C3\\u30C80\\\"\\n            },\\n            \\\"runnerID\\\":0,\\n            \\\"runnerName\\\":\\\"user00000\\\",\\n            \\\"recordID\\\":0\\n        }]\\n    }]\\n}\";\r\nvar input = JSON.parse(receivedString);\r\nvar recordsData = input.recordGroups;\r\nvar article = document.getElementById(\"article\");\r\nfor (var _i = 0, recordsData_1 = recordsData; _i < recordsData_1.length; _i++) {\r\n    var recordData = recordsData_1[_i];\r\n    var element = new RecordsCardView_1.RecordGroupView(recordData);\r\n    article === null || article === void 0 ? void 0 : article.appendChild(element.htmlElement);\r\n}\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/client/index.ts?");

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

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.converseMiliSecondsIntoTime = void 0;\r\nfunction converseMiliSecondsIntoTime(timeInMiliSeconds) {\r\n    var miliSeconds = timeInMiliSeconds % 100;\r\n    var timeInSecond = timeInMiliSeconds - miliSeconds;\r\n    var minutes = Math.floor(timeInMiliSeconds / 3600);\r\n    var seconds = timeInSecond % 3600;\r\n    return WriteNumberIn2Digits(minutes) + \":\" + WriteNumberIn2Digits(seconds) + \".\" + WriteNumberIn2Digits(miliSeconds);\r\n}\r\nexports.converseMiliSecondsIntoTime = converseMiliSecondsIntoTime;\r\nfunction WriteNumberIn2Digits(num) {\r\n    return (num < 10) ? \"0\" + num : String(num);\r\n}\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/utility/timeUtility.ts?");

/***/ }),

/***/ "./src/ts/view/RecordsCardView.ts":
/*!****************************************!*\
  !*** ./src/ts/view/RecordsCardView.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.RecordGroupView = void 0;\r\nvar ViewUtility_1 = __webpack_require__(/*! ../utility/ViewUtility */ \"./src/ts/utility/ViewUtility.ts\");\r\nvar TagsView_1 = __webpack_require__(/*! ./TagsView */ \"./src/ts/view/TagsView.ts\");\r\nvar timeUtility_1 = __webpack_require__(/*! ../utility/timeUtility */ \"./src/ts/utility/timeUtility.ts\");\r\nvar RecordGroupView = /** @class */ (function () {\r\n    function RecordGroupView(recordGroup) {\r\n        this._htmlElement = document.createElement(\"div\");\r\n        this._htmlElement.classList.add(\"c-recordCardsGroup\");\r\n        this._htmlElement.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n        <div class = \\\"c-recordGroupHeader\\\">\\n            <div class=\\\"c-title\\\">\\n            <div class=\\\"c-title__main\\\">\", \"</div>\\n            <div class=\\\"c-title__sub\\\">\", \"</div>\\n            </div>\\n        <div class=\\\"c-stateInfo\\\">\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-list\\\"></i> \", \" Records </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-running\\\"></i> \", \" Runners </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-history\\\"></i> Last post </div> \", \"\\n                </div>\\n            </div>\\n        <hr noshade class=\\\"u-bold\\\">\\n        </div>\\n        \"], [\"\\n        <div class = \\\"c-recordGroupHeader\\\">\\n            <div class=\\\"c-title\\\">\\n            <div class=\\\"c-title__main\\\">\", \"</div>\\n            <div class=\\\"c-title__sub\\\">\", \"</div>\\n            </div>\\n        <div class=\\\"c-stateInfo\\\">\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-list\\\"></i> \", \" Records </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-running\\\"></i> \", \" Runners </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-history\\\"></i> Last post </div> \", \"\\n                </div>\\n            </div>\\n        <hr noshade class=\\\"u-bold\\\">\\n        </div>\\n        \"])), recordGroup.groupName, recordGroup.groupSubName, recordGroup.numberOfRecords, recordGroup.numberOfRunners, recordGroup.lastPost));\r\n        for (var _i = 0, _a = recordGroup.records; _i < _a.length; _i++) {\r\n            var record = _a[_i];\r\n            this.appendRecordCard(record);\r\n        }\r\n    }\r\n    Object.defineProperty(RecordGroupView.prototype, \"htmlElement\", {\r\n        get: function () {\r\n            return this._htmlElement;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    RecordGroupView.prototype.appendRecordCard = function (record) {\r\n        //[x] これをElementとして出力して、TagをDOM操作で後付けしたい\r\n        var ele = ViewUtility_1.element(templateObject_2 || (templateObject_2 = __makeTemplateObject([\"\\n            <div class = \\\"c-recordCard u-width95per\\\">\\n            <div class = \\\"c-title --withUnderline\\\">\\n                <div class = \\\"c-title__main\\\">\", \"</div>\\n                    <div class=\\\"c-iconWithDescription\\\">\\n                    <i class=\\\"fas fa-user\\\"></i>\", \"\\n                </div>\\n            </div>\\n\\n            <hr noshade class=\\\"u-thin\\\">\"], [\"\\n            <div class = \\\"c-recordCard u-width95per\\\">\\n            <div class = \\\"c-title --withUnderline\\\">\\n                <div class = \\\"c-title__main\\\">\", \"</div>\\n                    <div class=\\\"c-iconWithDescription\\\">\\n                    <i class=\\\"fas fa-user\\\"></i>\", \"\\n                </div>\\n            </div>\\n\\n            <hr noshade class=\\\"u-thin\\\">\"])), timeUtility_1.converseMiliSecondsIntoTime(record.score), record.runnerName);\r\n        var tagsViews = [new TagsView_1.TagsView(), new TagsView_1.TagsView()];\r\n        var gameEnv = record.regulation.gameSystemEnvironment;\r\n        tagsViews[0].generateTag(gameEnv.gameSystemName + \"/\" + gameEnv.gameModeName + \"/\" + gameEnv.gameDifficultyName, \"gameSystem\");\r\n        tagsViews[0].generateTag(record.regulation.targetName, \"target\");\r\n        for (var _i = 0, _a = record.regulation.abilityNamesOfPlayerCharacters; _i < _a.length; _i++) {\r\n            var ability = _a[_i];\r\n            tagsViews[1].generateTag((ability === undefined ? \"Not Found\" : ability), \"ability\");\r\n        }\r\n        for (var _b = 0, tagsViews_1 = tagsViews; _b < tagsViews_1.length; _b++) {\r\n            var tagsView = tagsViews_1[_b];\r\n            ele.appendChild(tagsView.getElement());\r\n        }\r\n        this._htmlElement.append(ele);\r\n    };\r\n    return RecordGroupView;\r\n}());\r\nexports.RecordGroupView = RecordGroupView;\r\nvar templateObject_1, templateObject_2;\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/view/RecordsCardView.ts?");

/***/ }),

/***/ "./src/ts/view/TagsView.ts":
/*!*********************************!*\
  !*** ./src/ts/view/TagsView.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.TagsView = void 0;\r\nvar ViewUtility_1 = __webpack_require__(/*! ../utility/ViewUtility */ \"./src/ts/utility/ViewUtility.ts\");\r\nvar TagsView = /** @class */ (function () {\r\n    function TagsView() {\r\n        this.element = document.createElement(\"div\");\r\n        this.element.classList.add(\"c-tags\");\r\n    }\r\n    TagsView.prototype.generateTag = function (tagName, kind) {\r\n        var icon = \"\";\r\n        switch (kind) {\r\n            case \"ability\":\r\n                icon = \"far fa-star\";\r\n                break;\r\n            case \"target\":\r\n                icon = \"far fa-flag\";\r\n                break;\r\n            case \"gameSystem\":\r\n                icon = \"fas fa-star\";\r\n                break;\r\n        }\r\n        this.element.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n            <div class = \\\"c-tag --\", \"\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                <i class=\\\"\", \"\\\"></i> \", \"\\n                </div>\\n            </div>\"], [\"\\n            <div class = \\\"c-tag --\", \"\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                <i class=\\\"\", \"\\\"></i> \", \"\\n                </div>\\n            </div>\"])), kind, icon, tagName));\r\n    };\r\n    TagsView.prototype.getElement = function () {\r\n        return this.element;\r\n    };\r\n    return TagsView;\r\n}());\r\nexports.TagsView = TagsView;\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack://kirbyspeedscorerecorders/./src/ts/view/TagsView.ts?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/client/index.ts");
/******/ 	
/******/ })()
;