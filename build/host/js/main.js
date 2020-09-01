/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/host/ts/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/host/ts/index.ts":
/*!******************************!*\
  !*** ./src/host/ts/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar _a;\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Lists_1 = __webpack_require__(/*! ./list/Lists */ \"./src/host/ts/list/Lists.ts\");\r\nvar RecordsCardView_1 = __webpack_require__(/*! ./view/RecordsCardView */ \"./src/host/ts/view/RecordsCardView.ts\");\r\nvar input = \"{\\n    \\\"recordGroup\\\":{\\n        \\\"groupName\\\":\\\"\\u30A6\\u30A3\\u30B9\\u30D4\\u30FC\\u30A6\\u30C3\\u30BA\\\",\\n        \\\"groupSubName\\\":\\\"1\\u6226\\u76EE\\\",\\n        \\\"lastPost\\\":\\\"1992/04/27 06:00\\\",\\n        \\\"numberOfRecords\\\":3,\\n        \\\"numberOfRunners\\\":2,\\n        \\\"records\\\":[{\\n            \\\"timeInMilliseconds\\\":0,\\n            \\\"regulation\\\":{\\n                \\\"gameSystemEnvironment\\\":{\\n                    \\\"gameDifficultyID\\\":0,\\n                    \\\"gameModeID\\\":0,\\n                    \\\"gameSystemID\\\":0\\n                },\\n                \\\"abilityIDsOfPlayerCharacters\\\":[0,1,1,2],\\n                \\\"targetID\\\":0\\n            },\\n            \\\"runnerID\\\":0,\\n            \\\"runnerName\\\":\\\"user00000\\\",\\n            \\\"recordID\\\":0\\n        },{\\n            \\\"timeInMilliseconds\\\":0,\\n            \\\"regulation\\\":{\\n                \\\"gameSystemEnvironment\\\":{\\n                    \\\"gameDifficultyID\\\":0,\\n                    \\\"gameModeID\\\":0,\\n                    \\\"gameSystemID\\\":0\\n                },\\n                \\\"abilityIDsOfPlayerCharacters\\\":[0,1,1,2],\\n                \\\"targetID\\\":0\\n            },\\n            \\\"runnerID\\\":0,\\n            \\\"runnerName\\\":\\\"user00000\\\",\\n            \\\"recordID\\\":0\\n        },{\\n            \\\"timeInMilliseconds\\\":0,\\n            \\\"regulation\\\":{\\n                \\\"gameSystemEnvironment\\\":{\\n                    \\\"gameDifficultyID\\\":0,\\n                    \\\"gameModeID\\\":0,\\n                    \\\"gameSystemID\\\":1\\n                },\\n                \\\"abilityIDsOfPlayerCharacters\\\":[0,2,2,2],\\n                \\\"targetID\\\":0\\n            },\\n            \\\"runnerID\\\":0,\\n            \\\"runnerName\\\":\\\"user00000\\\",\\n            \\\"recordID\\\":0\\n        }]\\n    \\n    },\\n    \\\"list\\\":{\\n        \\\"AbilityList\\\"       : [ {\\\"id\\\":0,\\\"JName\\\":\\\"\\u80FD\\u529B0\\\",\\\"EName\\\":\\\"Ability0\\\"},\\n                            {\\\"id\\\":1,\\\"JName\\\":\\\"\\u80FD\\u529B1\\\",\\\"EName\\\":\\\"Ability1\\\"},\\n                            {\\\"id\\\":2,\\\"JName\\\":\\\"\\u80FD\\u529B2\\\",\\\"EName\\\":\\\"Ability1\\\"}],\\n\\n        \\\"TargetList\\\"        : [ {\\\"id\\\":0,\\\"JName\\\":\\\"\\u5BFE\\u8C610\\\",\\\"EName\\\":\\\"Target0\\\"},\\n                            {\\\"id\\\":1,\\\"JName\\\":\\\"\\u5BFE\\u8C611\\\",\\\"EName\\\":\\\"Target1\\\"},\\n                            {\\\"id\\\":2,\\\"JName\\\":\\\"\\u5BFE\\u8C612\\\",\\\"EName\\\":\\\"Target2\\\"}],\\n\\n        \\\"GameSystemList\\\"    : [ {\\\"id\\\":0,\\\"JName\\\":\\\"\\u30B2\\u30FC\\u30E00\\\",\\\"EName\\\":\\\"GameSystem0\\\"},\\n                            {\\\"id\\\":1,\\\"JName\\\":\\\"\\u30B2\\u30FC\\u30E01\\\",\\\"EName\\\":\\\"GameSystem1\\\"},\\n                            {\\\"id\\\":2,\\\"JName\\\":\\\"\\u30B2\\u30FC\\u30E02\\\",\\\"EName\\\":\\\"GameSystem2\\\"}],\\n\\n        \\\"GameModeList\\\"  : [ {\\\"id\\\":0,\\\"JName\\\":\\\"\\u30E2\\u30FC\\u30C90\\\",\\\"EName\\\":\\\"Mode1\\\"},\\n                            {\\\"id\\\":1,\\\"JName\\\":\\\"\\u30E2\\u30FC\\u30C91\\\",\\\"EName\\\":\\\"Mode2\\\"},\\n                            {\\\"id\\\":2,\\\"JName\\\":\\\"\\u30E2\\u30FC\\u30C92\\\",\\\"EName\\\":\\\"Mode3\\\"}],\\n\\n        \\\"GameDifficultyList\\\" : [{\\\"id\\\":0,\\\"JName\\\":\\\"\\u96E3\\u6613\\u5EA60\\\",\\\"EName\\\":\\\"Difficulty0\\\"},\\n                                {\\\"id\\\":1,\\\"JName\\\":\\\"\\u96E3\\u6613\\u5EA61\\\",\\\"EName\\\":\\\"Difficulty1\\\"},\\n                                {\\\"id\\\":2,\\\"JName\\\":\\\"\\u96E3\\u6613\\u5EA62\\\",\\\"EName\\\":\\\"Difficulty2\\\"}]\\n    }\\n}\";\r\nvar inputObject = JSON.parse(input);\r\nvar recordsData = inputObject.recordGroup;\r\nLists_1.AbilityList.list = inputObject.list.AbilityList;\r\nLists_1.TargetList.list = inputObject.list.TargetList;\r\nLists_1.gameSystemList.list = inputObject.list.GameSystemList;\r\nLists_1.gameModeList.list = inputObject.list.GameModeList;\r\nLists_1.gameDifficultyList.list = inputObject.list.GameDifficultyList;\r\nvar element = new RecordsCardView_1.RecordCardsView(recordsData);\r\n(_a = document.getElementById(\"article\")) === null || _a === void 0 ? void 0 : _a.appendChild(element.htmlElement);\r\n\n\n//# sourceURL=webpack:///./src/host/ts/index.ts?");

/***/ }),

/***/ "./src/host/ts/list/IListResolvingId.ts":
/*!**********************************************!*\
  !*** ./src/host/ts/list/IListResolvingId.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.IListForResolvingID = void 0;\r\nvar IListForResolvingID = /** @class */ (function () {\r\n    function IListForResolvingID() {\r\n        this.list = [];\r\n    }\r\n    IListForResolvingID.prototype.resolveIdForName = function (id, lang) {\r\n        var item = this.list.find(function (element) { return element.id === id; });\r\n        if (item === undefined)\r\n            return undefined;\r\n        switch (lang) {\r\n            case \"Japanese\": return item.JName;\r\n            case \"English\": return item.EName;\r\n        }\r\n    };\r\n    return IListForResolvingID;\r\n}());\r\nexports.IListForResolvingID = IListForResolvingID;\r\n\n\n//# sourceURL=webpack:///./src/host/ts/list/IListResolvingId.ts?");

/***/ }),

/***/ "./src/host/ts/list/Lists.ts":
/*!***********************************!*\
  !*** ./src/host/ts/list/Lists.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.gameDifficultyList = exports.gameModeList = exports.gameSystemList = exports.TargetList = exports.AbilityList = void 0;\r\nvar IListResolvingId_1 = __webpack_require__(/*! ./IListResolvingId */ \"./src/host/ts/list/IListResolvingId.ts\");\r\nexports.AbilityList = new IListResolvingId_1.IListForResolvingID();\r\nexports.TargetList = new IListResolvingId_1.IListForResolvingID();\r\nexports.gameSystemList = new IListResolvingId_1.IListForResolvingID();\r\nexports.gameModeList = new IListResolvingId_1.IListForResolvingID();\r\nexports.gameDifficultyList = new IListResolvingId_1.IListForResolvingID();\r\n\n\n//# sourceURL=webpack:///./src/host/ts/list/Lists.ts?");

/***/ }),

/***/ "./src/host/ts/list/settings.ts":
/*!**************************************!*\
  !*** ./src/host/ts/list/settings.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.Settings = void 0;\r\nexports.Settings = {\r\n    language: \"Japanese\"\r\n};\r\n\n\n//# sourceURL=webpack:///./src/host/ts/list/settings.ts?");

/***/ }),

/***/ "./src/host/ts/model/GameSystemEnvironment.ts":
/*!****************************************************!*\
  !*** ./src/host/ts/model/GameSystemEnvironment.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.GameSystemEnvironmentModel = void 0;\r\nvar Lists_1 = __webpack_require__(/*! ../list/Lists */ \"./src/host/ts/list/Lists.ts\");\r\nvar settings_1 = __webpack_require__(/*! ../list/settings */ \"./src/host/ts/list/settings.ts\");\r\nvar GameSystemEnvironmentModel = /** @class */ (function () {\r\n    function GameSystemEnvironmentModel(data) {\r\n        this.gameSystemEnvironment = data;\r\n    }\r\n    Object.defineProperty(GameSystemEnvironmentModel.prototype, \"gameSystemName\", {\r\n        get: function () {\r\n            return Lists_1.gameSystemList.resolveIdForName(this.gameSystemEnvironment.gameSystemID, settings_1.Settings.language);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(GameSystemEnvironmentModel.prototype, \"gameModeName\", {\r\n        get: function () {\r\n            return Lists_1.gameModeList.resolveIdForName(this.gameSystemEnvironment.gameSystemID, settings_1.Settings.language);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(GameSystemEnvironmentModel.prototype, \"gameDifficultyName\", {\r\n        get: function () {\r\n            return Lists_1.gameDifficultyList.resolveIdForName(this.gameSystemEnvironment.gameSystemID, settings_1.Settings.language);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(GameSystemEnvironmentModel.prototype, \"gameSystemEnv\", {\r\n        get: function () {\r\n            return {\r\n                gameSystemName: this.gameSystemName,\r\n                gameModeName: this.gameModeName,\r\n                gameDifficultyName: this.gameDifficultyName\r\n            };\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    return GameSystemEnvironmentModel;\r\n}());\r\nexports.GameSystemEnvironmentModel = GameSystemEnvironmentModel;\r\n\n\n//# sourceURL=webpack:///./src/host/ts/model/GameSystemEnvironment.ts?");

/***/ }),

/***/ "./src/host/ts/model/RecordInNutShellModel.ts":
/*!****************************************************!*\
  !*** ./src/host/ts/model/RecordInNutShellModel.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.RecordInNutShellModel = void 0;\r\nvar GameSystemEnvironment_1 = __webpack_require__(/*! ./GameSystemEnvironment */ \"./src/host/ts/model/GameSystemEnvironment.ts\");\r\nvar settings_1 = __webpack_require__(/*! ../list/settings */ \"./src/host/ts/list/settings.ts\");\r\nvar Lists_1 = __webpack_require__(/*! ../list/Lists */ \"./src/host/ts/list/Lists.ts\");\r\nvar timeUtility_1 = __webpack_require__(/*! ../utility/timeUtility */ \"./src/host/ts/utility/timeUtility.ts\");\r\nvar RecordInNutShellModel = /** @class */ (function () {\r\n    function RecordInNutShellModel(record) {\r\n        this.record = record;\r\n        this.gameSystemEnv = new GameSystemEnvironment_1.GameSystemEnvironmentModel(record.regulation.gameSystemEnvironment);\r\n    }\r\n    Object.defineProperty(RecordInNutShellModel.prototype, \"time\", {\r\n        get: function () {\r\n            return timeUtility_1.converseMiliSecondsIntoTime(this.record.timeInMilliseconds);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(RecordInNutShellModel.prototype, \"runner\", {\r\n        get: function () {\r\n            return this.record.runnerName;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(RecordInNutShellModel.prototype, \"gameSystemEnvironment\", {\r\n        get: function () {\r\n            return this.gameSystemEnv.gameSystemEnv;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(RecordInNutShellModel.prototype, \"ability\", {\r\n        get: function () {\r\n            return this.record.regulation.abilityIDsOfPlayerCharacters.map(function (element) { return Lists_1.AbilityList.resolveIdForName(element, settings_1.Settings.language); });\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(RecordInNutShellModel.prototype, \"target\", {\r\n        get: function () {\r\n            return Lists_1.TargetList.resolveIdForName(this.record.regulation.targetID, settings_1.Settings.language);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    return RecordInNutShellModel;\r\n}());\r\nexports.RecordInNutShellModel = RecordInNutShellModel;\r\n\n\n//# sourceURL=webpack:///./src/host/ts/model/RecordInNutShellModel.ts?");

/***/ }),

/***/ "./src/host/ts/utility/ViewUtility.ts":
/*!********************************************!*\
  !*** ./src/host/ts/utility/ViewUtility.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.element = exports.htmlToElement = void 0;\r\nfunction escapeSpecialChars(str) {\r\n    return str\r\n        .replace(/&/g, \"&amp;\")\r\n        .replace(/</g, \"&lt;\")\r\n        .replace(/>/g, \"&gt;\")\r\n        .replace(/\"/g, \"&quot;\")\r\n        .replace(/'/g, \"&#039;\");\r\n}\r\nfunction htmlToElement(html) {\r\n    var template = document.createElement(\"template\");\r\n    template.innerHTML = html;\r\n    return template.content.firstElementChild;\r\n}\r\nexports.htmlToElement = htmlToElement;\r\nfunction element(strings) {\r\n    var values = [];\r\n    for (var _i = 1; _i < arguments.length; _i++) {\r\n        values[_i - 1] = arguments[_i];\r\n    }\r\n    var htmlString = strings.reduce(function (result, str, i) {\r\n        var value = values[i - 1];\r\n        if (typeof value == \"string\") {\r\n            return result + escapeSpecialChars(value) + str;\r\n        }\r\n        else {\r\n            return result + String(value) + str;\r\n        }\r\n    });\r\n    var ele = htmlToElement(htmlString);\r\n    if (ele === null)\r\n        throw new Error(\"与HTMLを要素に変換できませんでした。\");\r\n    return ele;\r\n}\r\nexports.element = element;\r\n\n\n//# sourceURL=webpack:///./src/host/ts/utility/ViewUtility.ts?");

/***/ }),

/***/ "./src/host/ts/utility/timeUtility.ts":
/*!********************************************!*\
  !*** ./src/host/ts/utility/timeUtility.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.converseMiliSecondsIntoTime = void 0;\r\nfunction converseMiliSecondsIntoTime(timeInMiliSeconds) {\r\n    var miliSeconds = timeInMiliSeconds % 100;\r\n    var timeInSecond = timeInMiliSeconds - miliSeconds;\r\n    var minutes = Math.floor(timeInMiliSeconds / 3600);\r\n    var seconds = timeInSecond % 3600;\r\n    return WriteNumberIn2Digits(minutes) + \":\" + WriteNumberIn2Digits(seconds) + \".\" + WriteNumberIn2Digits(miliSeconds);\r\n}\r\nexports.converseMiliSecondsIntoTime = converseMiliSecondsIntoTime;\r\nfunction WriteNumberIn2Digits(num) {\r\n    return (num < 10) ? \"0\" + num : String(num);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/host/ts/utility/timeUtility.ts?");

/***/ }),

/***/ "./src/host/ts/view/RecordsCardView.ts":
/*!*********************************************!*\
  !*** ./src/host/ts/view/RecordsCardView.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.RecordCardsView = void 0;\r\nvar ViewUtility_1 = __webpack_require__(/*! ../utility/ViewUtility */ \"./src/host/ts/utility/ViewUtility.ts\");\r\nvar RecordInNutShellModel_1 = __webpack_require__(/*! ../model/RecordInNutShellModel */ \"./src/host/ts/model/RecordInNutShellModel.ts\");\r\nvar TagsView_1 = __webpack_require__(/*! ./TagsView */ \"./src/host/ts/view/TagsView.ts\");\r\nvar RecordCardsView = /** @class */ (function () {\r\n    function RecordCardsView(recordGroup) {\r\n        this._htmlElement = document.createElement(\"div\");\r\n        this._htmlElement.classList.add(\"c-recordCardsGroup\");\r\n        this._htmlElement.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n        <div class = \\\"c-recordGroupHeader\\\">\\n            <div class=\\\"c-title\\\">\\n            <div class=\\\"c-title__main\\\">\", \"</div>\\n            <div class=\\\"c-title__sub\\\">\", \"</div>\\n            </div>\\n        <div class=\\\"c-stateInfo\\\">\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-list\\\"></i> \", \" Records </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-running\\\"></i> \", \" Runners </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-history\\\"></i> Last post </div> \", \"\\n                </div>\\n            </div>\\n        <hr noshade class=\\\"u-bold\\\">\\n        </div>\\n        \"], [\"\\n        <div class = \\\"c-recordGroupHeader\\\">\\n            <div class=\\\"c-title\\\">\\n            <div class=\\\"c-title__main\\\">\", \"</div>\\n            <div class=\\\"c-title__sub\\\">\", \"</div>\\n            </div>\\n        <div class=\\\"c-stateInfo\\\">\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-list\\\"></i> \", \" Records </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-running\\\"></i> \", \" Runners </div>\\n                </div>\\n            <div class = \\\"c-stateInfo__unit\\\">\\n                <div class =\\\"c-iconWithDescription\\\"> <i class=\\\"fas fa-history\\\"></i> Last post </div> \", \"\\n                </div>\\n            </div>\\n        <hr noshade class=\\\"u-bold\\\">\\n        </div>\\n        \"])), recordGroup.groupName, recordGroup.groupSubName, recordGroup.numberOfRecords, recordGroup.numberOfRunners, recordGroup.lastPost));\r\n        for (var _i = 0, _a = recordGroup.records; _i < _a.length; _i++) {\r\n            var record = _a[_i];\r\n            this.appendRecordCard(new RecordInNutShellModel_1.RecordInNutShellModel(record));\r\n        }\r\n    }\r\n    Object.defineProperty(RecordCardsView.prototype, \"htmlElement\", {\r\n        get: function () {\r\n            return this._htmlElement;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    RecordCardsView.prototype.appendRecordCard = function (recordCardModel) {\r\n        console.log(recordCardModel.gameSystemEnvironment);\r\n        var gameEnv = recordCardModel.gameSystemEnvironment;\r\n        recordCardModel.gameSystemEnv.gameSystemName;\r\n        //TODO:これをElementとして出力して、TagをDOM操作で後付けしたい v\r\n        var ele = ViewUtility_1.element(templateObject_2 || (templateObject_2 = __makeTemplateObject([\"<div class = \\\"c-recordCard u-width95per\\\">\\n        <div class = \\\"c-title --withUnderline\\\">\\n            <div class = \\\"c-title__main\\\">\", \"</div>\\n                <div class=\\\"c-iconWithDescription\\\">\\n                <i class=\\\"fas fa-user\\\"></i>\", \"\\n            </div>\\n        </div>\\n        \\n        <hr noshade class=\\\"u-thin\\\">\\n\\n        <div class = \\\"c-tags\\\">\\n            <div class = \\\"c-tag --gameSystem\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                    <i class=\\\"fas fa-star\\\"></i>\", \"/\", \"/\", \"\\n                </div>\\n            </div>\\n            <div class = \\\"c-tag --target\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                    <i class=\\\"fas fa-flag\\\"></i>\", \"\\n                </div>\\n            </div>\\n        </div>\\n        \"], [\"<div class = \\\"c-recordCard u-width95per\\\">\\n        <div class = \\\"c-title --withUnderline\\\">\\n            <div class = \\\"c-title__main\\\">\", \"</div>\\n                <div class=\\\"c-iconWithDescription\\\">\\n                <i class=\\\"fas fa-user\\\"></i>\", \"\\n            </div>\\n        </div>\\n        \\n        <hr noshade class=\\\"u-thin\\\">\\n\\n        <div class = \\\"c-tags\\\">\\n            <div class = \\\"c-tag --gameSystem\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                    <i class=\\\"fas fa-star\\\"></i>\", \"/\", \"/\", \"\\n                </div>\\n            </div>\\n            <div class = \\\"c-tag --target\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                    <i class=\\\"fas fa-flag\\\"></i>\", \"\\n                </div>\\n            </div>\\n        </div>\\n        \"])), recordCardModel.time, recordCardModel.runner, gameEnv.gameSystemName, gameEnv.gameModeName, gameEnv.gameDifficultyName, recordCardModel.target);\r\n        var tagsView = new TagsView_1.TagsView();\r\n        for (var _i = 0, _a = recordCardModel.ability; _i < _a.length; _i++) {\r\n            var ability = _a[_i];\r\n            tagsView.generateTag((ability === undefined ? \"Not Found\" : ability), \"ability\");\r\n        }\r\n        ele.appendChild(tagsView.getElement());\r\n        this._htmlElement.append(ele);\r\n    };\r\n    return RecordCardsView;\r\n}());\r\nexports.RecordCardsView = RecordCardsView;\r\nvar templateObject_1, templateObject_2;\r\n\n\n//# sourceURL=webpack:///./src/host/ts/view/RecordsCardView.ts?");

/***/ }),

/***/ "./src/host/ts/view/TagsView.ts":
/*!**************************************!*\
  !*** ./src/host/ts/view/TagsView.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.TagsView = void 0;\r\nvar ViewUtility_1 = __webpack_require__(/*! ../utility/ViewUtility */ \"./src/host/ts/utility/ViewUtility.ts\");\r\nvar TagsView = /** @class */ (function () {\r\n    function TagsView() {\r\n        this.element = document.createElement(\"div\");\r\n        this.element.classList.add(\"c-tags\");\r\n    }\r\n    TagsView.prototype.generateTag = function (tagName, kind) {\r\n        var icon = \"\";\r\n        switch (kind) {\r\n            case \"ability\":\r\n                icon = \"far fa-star\";\r\n            case \"target\":\r\n                icon = \"far fa-star\";\r\n            case \"gameSystem\":\r\n                icon = \"far fa-star\";\r\n        }\r\n        this.element.appendChild(ViewUtility_1.element(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n            <div class = \\\"c-tag --\", \"\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                <i class=\\\"\", \"\\\"></i> \", \"\\n                </div>\\n            </div>\"], [\"\\n            <div class = \\\"c-tag --\", \"\\\">\\n                <div class=\\\"c-iconWithDescription\\\">\\n                <i class=\\\"\", \"\\\"></i> \", \"\\n                </div>\\n            </div>\"])), kind, icon, tagName));\r\n    };\r\n    TagsView.prototype.getElement = function () {\r\n        return this.element;\r\n    };\r\n    return TagsView;\r\n}());\r\nexports.TagsView = TagsView;\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack:///./src/host/ts/view/TagsView.ts?");

/***/ })

/******/ });