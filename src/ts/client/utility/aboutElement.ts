export function createElementWithIdAndClass(idAndClass:{className?:string,id?:string}){
    const element = document.createElement("div");
    if (idAndClass.className !== undefined) element.className = idAndClass.className
    if (idAndClass.id !== undefined)        element.id = idAndClass.id
    return element
}
