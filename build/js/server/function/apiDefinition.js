"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiList = void 0;
var IReceivedDataAtServer_getlist_UseId_validator_1 = require("../../type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseId.validator");
var IReceivedDataAtServer_getlist_UseSIdId_validator_1 = require("../../type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdId.validator");
var IReceivedDataAtServer_getlist_UseSIdMIdId_validator_1 = require("../../type/api/list/atServer_getlist/IReceivedDataAtServer_getlist_UseSIdMIdId.validator");
var IReceivedDataAtServer_pickUp_UseId_validator_1 = require("../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseId.validator");
var IReceivedDataAtServer_pickUp_UseSIdId_validator_1 = require("../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdId.validator");
var IReceivedDataAtServer_pickUp_UseSIdMIdId_validator_1 = require("../../type/api/list/atServer_pickup/IReceivedDataAtServer_pickUp_UseSIdMIdId.validator");
var IReceivedDataAtServer_recordDetail_validator_1 = require("../../type/api/record/IReceivedDataAtServer_recordDetail.validator");
var IReceivedDataAtServer_recordSearch_validator_1 = require("../../type/api/record/IReceivedDataAtServer_recordSearch.validator");
var getList_1 = require("./list/getList");
var pickUp_1 = require("./list/pickUp");
var detail_1 = require("./record/detail");
var search_1 = require("./record/search");
var APIList = /** @class */ (function () {
    function APIList() {
        this.apiDefinition = new Map();
    }
    APIList.prototype.set = function (title, validateFunction, process) {
        return this.apiDefinition.set(title, { validator: validateFunction, process: process });
    };
    APIList.prototype.forEach = function (callback) {
        return this.apiDefinition.forEach(callback);
    };
    return APIList;
}());
exports.apiList = new APIList();
exports.apiList.set("/record/search", IReceivedDataAtServer_recordSearch_validator_1.isIReceivedDataAtServer_recordSearch, search_1.search);
exports.apiList.set("/record/detail", IReceivedDataAtServer_recordDetail_validator_1.isIReceivedDataAtServer_recordDetail, detail_1.detail);
exports.apiList.set("/list/gameSystems", IReceivedDataAtServer_getlist_UseId_validator_1.isIReceivedDataAtServer_getlist_UseId, getList_1.gameSystems);
exports.apiList.set("/list/runners", IReceivedDataAtServer_getlist_UseId_validator_1.isIReceivedDataAtServer_getlist_UseId, getList_1.runners);
exports.apiList.set("/list/gameModes", IReceivedDataAtServer_getlist_UseSIdId_validator_1.isIReceivedDataAtServer_getlist_UseSIdId, getList_1.gameModes);
exports.apiList.set("/list/hashTags", IReceivedDataAtServer_getlist_UseSIdId_validator_1.isIReceivedDataAtServer_getlist_UseSIdId, getList_1.hashTags);
exports.apiList.set("/list/difficulties", IReceivedDataAtServer_getlist_UseSIdMIdId_validator_1.isIReceivedDataAtServer_getlist_UseSIdMIdId, getList_1.difficulties);
exports.apiList.set("/list/abilities", IReceivedDataAtServer_getlist_UseSIdMIdId_validator_1.isIReceivedDataAtServer_getlist_UseSIdMIdId, getList_1.abilities);
exports.apiList.set("/list/targets", IReceivedDataAtServer_getlist_UseSIdMIdId_validator_1.isIReceivedDataAtServer_getlist_UseSIdMIdId, getList_1.targets);
exports.apiList.set("/list/gameSystem", IReceivedDataAtServer_pickUp_UseId_validator_1.isIReceivedDataAtServer_pickUp_UseId, pickUp_1.gameSystem);
exports.apiList.set("/list/runner", IReceivedDataAtServer_pickUp_UseId_validator_1.isIReceivedDataAtServer_pickUp_UseId, pickUp_1.runner);
exports.apiList.set("/list/gameMode", IReceivedDataAtServer_pickUp_UseSIdId_validator_1.isIReceivedDataAtServer_pickUp_UseSIdId, pickUp_1.gameMode);
exports.apiList.set("/list/hashTag", IReceivedDataAtServer_pickUp_UseSIdId_validator_1.isIReceivedDataAtServer_pickUp_UseSIdId, pickUp_1.hashTag);
exports.apiList.set("/list/difficulty", IReceivedDataAtServer_pickUp_UseSIdMIdId_validator_1.isIReceivedDataAtServer_pickUp_UseSIdMIdId, pickUp_1.difficulty);
exports.apiList.set("/list/ability", IReceivedDataAtServer_pickUp_UseSIdMIdId_validator_1.isIReceivedDataAtServer_pickUp_UseSIdMIdId, pickUp_1.ability);
exports.apiList.set("/list/target", IReceivedDataAtServer_pickUp_UseSIdMIdId_validator_1.isIReceivedDataAtServer_pickUp_UseSIdMIdId, pickUp_1.target);
