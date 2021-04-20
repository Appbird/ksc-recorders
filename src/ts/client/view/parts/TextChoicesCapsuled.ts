import Choices from "choices.js";


export class TextChoicesCapsuled {
    private html: HTMLInputElement;
    private choices: Choices;
    constructor(insertedElement: HTMLInputElement) {
        this.html = insertedElement;
        this.choices = new Choices(insertedElement, {
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
}
