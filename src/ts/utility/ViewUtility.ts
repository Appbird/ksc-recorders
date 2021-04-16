import { LanguageInApplication, LanguageList } from "../type/LanguageInApplication";

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
    element(strings:TemplateStringsArray,...values:any){
        
        const htmlString = strings.reduce(
            (result, str, i) => {
                const value = values[i-1];
                if (typeof value == "string"){
                    return result + escapeSpecialChars(value) + str;
                } if (Array.isArray(value) && value.every(ele => typeof ele === "string")) {
                    return value[LanguageList.findIndex( ele => ele === this.language)]
                } else {
                    return result + String(value) + str;
                }
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