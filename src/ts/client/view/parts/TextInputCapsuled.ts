export class TextInputCapsuled {
    private element: HTMLInputElement;
    private errorElement:Element;
    constructor(insertedElement: Element, placeHolder: string,errorViewer:Element, chara?: "u-biggerChara" | "u-smallerChara") {
        this.errorElement = errorViewer;
        this.errorElement.classList.add("u-unused")
        
        this.element = document.createElement("input");
        this.element.setAttribute("type", "text");
        this.element.classList.add("c-textInput", "u-underline");
        this.element.placeholder = placeHolder;
        if (chara !== undefined) this.element.classList.add(chara);
        insertedElement.appendChild(this.element);

    }
    addEventListener(eventType: "change", callback: () => void) {
        this.element.addEventListener(eventType, callback);
    }
    setError(error:string){
        if (error==="") this.errorElement.classList.add("u-unused")
        else this.errorElement.classList.remove("u-unused")
        this.errorElement.innerHTML = error;
    }
    get value() {
        return this.element.value;
    }
    set value(value: string) {
        this.element.value = value;
    }
}
