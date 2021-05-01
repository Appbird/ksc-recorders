import Choices from "choices.js";
import { IView } from "../IView";


export class TextChoicesCapsuled implements IView {
    private choices: Choices;
    constructor(container: HTMLInputElement) {
        this.choices = new Choices(container, {
            maxItemCount: 10,
            removeItemButton: true,
            duplicateItemsAllowed: false
        });
    }
    get valueAsArray() {
        const value = this.choices.getValue(true);
        if (!Array.isArray(value))
            return [value];
        return value;
    }
    destroy(){
        this.choices.destroy();
    }
}
