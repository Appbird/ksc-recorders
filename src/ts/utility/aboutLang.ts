import { LanguageInApplication } from "../type/LanguageInApplication"
import { IItemOfResolveTableToName } from "../type/list/IItemOfResolveTableToName"

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