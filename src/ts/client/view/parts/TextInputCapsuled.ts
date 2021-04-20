export class TextInputCapsuled {
    private element: HTMLInputElement;
    private errorElement:Element;
    constructor(insertedElement: Element, placeHolder: string,errorViewer:Element, chara?: "u-biggerChara" | "u-smallerChara") {
        this.errorElement = errorViewer;
        this.element = document.createElement("input");
        this.element.setAttribute("type", "text");
        this.element.classList.add("c-textInput", "u-underline");
        this.element.placeholder = placeHolder;
        if (chara !== undefined)
            this.element.classList.add(chara);
        insertedElement.appendChild(insertedElement);

    }
    addEventListener(eventType: "change", callback: () => void) {
        this.element.addEventListener(eventType, callback);
    }
    setError(error:string){
        this.errorElement.textContent = error;
    }
    get value() {
        return this.element.value;
    }
    set value(value: string) {
        this.element.value = value;
    }
}
