"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAppropriateDescription = exports.selectAppropriateName = void 0;
function selectAppropriateName(item, lang) {
    switch (lang) {
        case "Japanese": return item.JName;
        case "English": return item.EName;
    }
}
exports.selectAppropriateName = selectAppropriateName;
function selectAppropriateDescription(item, lang) {
    switch (lang) {
        case "Japanese": return item.JDescription;
        case "English": return item.EDescription;
    }
}
exports.selectAppropriateDescription = selectAppropriateDescription;
