import { MultiLanguageString } from "../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../type/LanguageInApplication"

export function selectAppropriateName(item:{JName:string,EName:string},lang:LanguageInApplication){
    switch (lang){
        case "Japanese": return item.JName
        case "English": return item.EName
    }
}
export type MultiLanguageDescription = {JDescription?:string,EDescription?:string};
export function selectAppropriateDescription(item:MultiLanguageDescription,lang:LanguageInApplication){
    switch (lang){
        case "Japanese": return (item.JDescription === undefined) ? "" : item.JDescription
        case "English": return (item.EDescription === undefined) ? "" : item.EDescription
    }
}

export function choiceDescription(item:MultiLanguageDescription|undefined|null,lang:LanguageInApplication){
    if (item === undefined) return "";
    if (item === null) return "";
    switch (lang){
        case "Japanese": return (item.JDescription === undefined) ? "" : item.JDescription
        case "English": return (item.EDescription === undefined) ? "" : item.EDescription
    }
}
export function choiceString(item:MultiLanguageString|string|undefined|null,lang:LanguageInApplication){
    if (item === undefined) return "undefined";
    if (item === null) return "null";
    if (typeof item === "string") return item;
    switch (lang){
        case "Japanese": return (item.Japanese === undefined) ? "" : item.Japanese
        case "English": return (item.English === undefined) ? "" : item.English
    }
}