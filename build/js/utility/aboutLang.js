"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.choiceDescription = exports.selectAppropriateDescription = exports.selectAppropriateName = void 0;
function selectAppropriateName(item, lang) {
    switch (lang) {
        case "Japanese": return item.JName;
        case "English": return item.EName;
    }
}
exports.selectAppropriateName = selectAppropriateName;
function selectAppropriateDescription(item, lang) {
    switch (lang) {
        case "Japanese": return (item.JDescription === undefined) ? "" : item.JDescription;
        case "English": return (item.EDescription === undefined) ? "" : item.EDescription;
    }
}
exports.selectAppropriateDescription = selectAppropriateDescription;
function choiceDescription(item, lang) {
    if (item === undefined)
        return "";
    switch (lang) {
        case "Japanese": return (item.JDescription === undefined) ? "" : item.JDescription;
        case "English": return (item.EDescription === undefined) ? "" : item.EDescription;
    }
}
exports.choiceDescription = choiceDescription;
