"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expected_IRecord = void 0;
var IRegulation_1 = require("../foundation/IRegulation");
exports.expected_IRecord = {
    id: "string",
    score: "number",
    timestamp: "number",
    regulation: IRegulation_1.expected_IRegulation,
    runnerID: "string",
    tagID: "string[]",
    link: "string[]",
    note: "string"
};
