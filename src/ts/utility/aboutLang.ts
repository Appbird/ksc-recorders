import { LanguageInApplication } from "../type/LanguageInApplication"
import { IItemOfResolveTableToName } from "../type/list/IItemOfResolveTableToName"

export function selectAppropriateName(item:IItemOfResolveTableToName,lang:LanguageInApplication){
    switch (lang){
        case "Japanese": return item.JName
        case "English": return item.EName
    }
}