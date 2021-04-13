"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.difficultie = exports.abilitie = exports.target = exports.hashTag = exports.gameModeID = exports.runner = exports.gameSystem = void 0;
function pickUp_UseId(input, searchFunc) {
    return searchFunc(input.id);
}
function pickUp_UseSIdId(input, searchFunc) {
    return searchFunc(input.gameSystemEnv.gameSystemID, input.id);
}
function pickUp_UseSIdMIdId(input, searchFunc) {
    return searchFunc(input.gameSystemEnv.gameSystemID, input.gameSystemEnv.gameModeID, input.id);
}
exports.gameSystem = function (database, input) { return pickUp_UseId(input, function (id) { return database.getGameSystemInfo(id); }); };
exports.runner = function (database, input) { return pickUp_UseId(input, function (id) { return database.getRunnerInfo(id); }); };
exports.gameModeID = function (database, input) { return pickUp_UseSIdId(input, function (s, id) { return database.getGameModeInfo(s, id); }); };
exports.hashTag = function (database, input) { return pickUp_UseSIdId(input, function (s, id) { return database.getHashTagInfo(s, id); }); };
exports.target = function (database, input) { return pickUp_UseSIdMIdId(input, function (s, m, id) { return database.getTargetInfo(s, m, id); }); };
exports.abilitie = function (database, input) { return pickUp_UseSIdMIdId(input, function (s, m, id) { return database.getAbilityInfo(s, m, id); }); };
exports.difficultie = function (database, input) { return pickUp_UseSIdMIdId(input, function (s, m, id) { return database.getGameDifficultyInfo(s, m, id); }); };
