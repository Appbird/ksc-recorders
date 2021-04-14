"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAppropriateName = void 0;
function selectAppropriateName(item, lang) {
    switch (lang) {
        case "Japanese": return item.JName;
        case "English": return item.EName;
    }
}
exports.selectAppropriateName = selectAppropriateName;
