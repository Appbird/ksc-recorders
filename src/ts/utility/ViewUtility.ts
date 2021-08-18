import { IRegulationResolved } from "../type/foundation/IRegulation";
import { MultiLanguageString } from "../type/foundation/MultiLanguageString";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { choiceString } from "./aboutLang";

function escapeSpecialChars(str:string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
export function htmlToElement(html:string) {
    const template = document.createElement("div");
    template.innerHTML = html;
    return template.firstElementChild;
}
export class HTMLConverter{
    private language:LanguageInApplication;
    constructor(lang:LanguageInApplication){
        this.language = lang;
    }
    elementWithoutEscaping(strings:TemplateStringsArray,
        ...values:(string|MultiLanguageString)[]){
        
        const htmlString = strings.reduce(
            (result, str, i) => {
                const value = values[i-1];
                return result + choiceString(value,this.language) + str
            }
        );
        const ele = htmlToElement(htmlString);
        if (ele === null) throw new Error("与HTMLを要素に変換できませんでした。")
        return ele;
    }
}
export function element(strings:TemplateStringsArray,...values:any){
    
    const htmlString = strings.reduce(
        (result, str, i) => {
            const value = values[i-1];
            
            if (typeof value == "string"){
                return result + escapeSpecialChars(value) + str;
            } else {
                return result + String(value) + str;
            }
        }
    );
    const ele = htmlToElement(htmlString);
    if (ele === null) throw new Error("与HTMLを要素に変換できませんでした。")
    return ele as HTMLElement;
}
export function elementWithoutEscaping(strings:TemplateStringsArray,...values:any){
    const htmlString = strings.reduce(
        (result, str, i) => {
            const value = values[i-1];
            if (typeof value == "string"){
                return result + value + str;
            } else {
                return result + String(value) + str;
            }
        }
    );
    const ele = htmlToElement(htmlString);
    if (ele === null) throw new Error("与HTMLを要素に変換できませんでした。")
    return ele;
}

const separators = ["、","。",",",".","？","！","?","!"," "]
export function setSpanForCorrectLineBreak(str:string){
    let parts = str.split("")
    if (!(separators.some(separator => str.includes(separator)))) return str;
    const result = []
    let start = 0;
    for (let i = 0; i < str.length; i++){
        if (!separators.includes(parts[i]) && i !== str.length - 1) continue
        result.push(str.slice(start,i + 1))
        start = i + 1;
    }
    return result.map(part => `<span class="u-inline">${part.replace(/\s/g,"")}</span>`).join(" ")
}

export function writeAbilityNameWithAttribute(regulation:IRegulationResolved,abilityName:string,playerIndex:number):string{
    return (regulation.abilitiesAttributeNames === undefined) ? 
            abilityName : 
    `${abilityName}@${regulation.abilitiesAttributeNames[playerIndex].map( abilitiesAttributeName => abilitiesAttributeName.onFlagNames.join(",") ).join("/")}`
}