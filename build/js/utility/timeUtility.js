"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumberIntoDateString = exports.converseMiliSecondsIntoTime = void 0;
function converseMiliSecondsIntoTime(timeInMiliSeconds) {
    var miliSeconds = timeInMiliSeconds % 100;
    var timeInSecond = Math.floor(timeInMiliSeconds / 100);
    var minutes = Math.floor(timeInMiliSeconds / 3600);
    var seconds = timeInSecond % 3600;
    return WriteNumberIn2Digits(minutes) + ":" + WriteNumberIn2Digits(seconds) + "." + WriteNumberIn2Digits(miliSeconds);
}
exports.converseMiliSecondsIntoTime = converseMiliSecondsIntoTime;
function WriteNumberIn2Digits(num) {
    return (num < 10) ? "0" + num : String(num);
}
function convertNumberIntoDateString(num) {
    var date = new Date(num);
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + WriteNumberIn2Digits(date.getHours()) + ":" + WriteNumberIn2Digits(date.getMinutes()) + ":" + WriteNumberIn2Digits(date.getSeconds());
}
exports.convertNumberIntoDateString = convertNumberIntoDateString;
