import { icooonResolvable } from "../../type/foundation/icooonResolvable";

export function createElementWithIdAndClass(idAndClass:{className?:string,id?:string} = {}){
    
    const element = document.createElement("div");
    if (idAndClass.className !== undefined) element.className = idAndClass.className
    if (idAndClass.id !== undefined)        element.id = idAndClass.id
    return element
}
export function createElementWithIdTagClass<T extends keyof HTMLElementTagNameMap>(idAndClass:{className?:string,id?:string} = {},tag:T):HTMLElementTagNameMap[T]{
    
    const element = document.createElement(tag);
    if (idAndClass.className !== undefined) element.className = idAndClass.className
    if (idAndClass.id !== undefined)        element.id = idAndClass.id
    return element
}
/** valueがundefinedであるとき、空文字列を渡す。 */
export function writeElement(value:string|undefined,tag:string){
    return (value === undefined) ? "" : `<${tag}>${value}</${tag}>`
}

export function findElementByClassNameWithErrorPossibility(findPlace:Element,className:string){
    const place = findPlace.getElementsByClassName(className)
    if (place[0] === undefined)throw new Error(`要素${className}が見つかりませんでした。`)
    return place[0]
}

export function generateIcooonHTML(info:icooonResolvable){
    return `<i class="c-icooon u-background--${(info.icooonName === undefined) ? "star":info.icooonName}"></i>`
}