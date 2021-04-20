"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimeIntoNumber = exports.convertScoreIntoNumber = exports.convertNumberIntoDateString = exports.converseTimeIntoMiliSeconds = exports.converseMiliSecondsIntoTime = void 0;
function converseMiliSecondsIntoTime(timeInMiliSeconds) {
    var minutes = Math.floor(timeInMiliSeconds / 6000);
    var seconds = Math.floor(timeInMiliSeconds % 6000 / 100);
    var miliSeconds = Math.floor(timeInMiliSeconds % 100);
    return WriteNumberIn2Digits(minutes) + ":" + WriteNumberIn2Digits(seconds) + "." + WriteNumberIn2Digits(miliSeconds);
}
exports.converseMiliSecondsIntoTime = converseMiliSecondsIntoTime;
function WriteNumberIn2Digits(num) {
    return (num < 10) ? "0" + num : String(num);
}
function converseTimeIntoMiliSeconds(time) {
    if (!/^([0-9]+:[0-9]{2}.[0-9]{2})$/.test(time))
        throw new Error("入力されたタイムが正確ではありません。");
    return time.split(/[:.]/).map(function (ele) { return Number(ele); }).reduce(function (result, value, index) { return result + value * ([6000, 100, 1][index]); }, 0);
}
exports.converseTimeIntoMiliSeconds = converseTimeIntoMiliSeconds;
function convertNumberIntoDateString(num) {
    var date = new Date(num);
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + WriteNumberIn2Digits(date.getHours()) + ":" + WriteNumberIn2Digits(date.getMinutes()) + ":" + WriteNumberIn2Digits(date.getSeconds());
}
exports.convertNumberIntoDateString = convertNumberIntoDateString;
function convertScoreIntoNumber(score) {
    if (!/^([0-9]+)$/.test(score))
        throw new Error("Score must be a number value.");
    return Number(score);
}
exports.convertScoreIntoNumber = convertScoreIntoNumber;
function convertTimeIntoNumber(score) {
    if (/^([0-9]+:[0-9]{2}.[0-9]{2})$/.test(score))
        return converseTimeIntoMiliSeconds(score);
    if (/^([0-9]+.[0-9]{2})$/.test(score))
        return (function () { var array = score.split("."); return Number(array[0]) * 100 + Number(array[1]); })();
    var timePoints = score.replace(/\s/g, "").split("-");
    if (timePoints.every(function (ele) { return /^([0-9]{1,}:[0-9]{2}.[0-9]{2})$/.test(ele); }))
        return Math.abs(converseTimeIntoMiliSeconds(timePoints[0]) - converseTimeIntoMiliSeconds(timePoints[1]));
    throw new Error("タイムは00:00.00, 00.00, 00:00.00 - 00:00.00といった形式で入力されなければなりません。");
}
exports.convertTimeIntoNumber = convertTimeIntoNumber;
