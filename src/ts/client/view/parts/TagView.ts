import { IView } from "../IView";
import { TagKind } from "./TagsView";

export class TagView implements IView {
    private container: HTMLElement;
    private tagKind: TagKind;
    private tagName: string;
    constructor(container: HTMLElement, tagName: string, kind: TagKind) {
        this.tagName = tagName;
        this.tagKind = kind;
        this.container = container;
        this.container.classList.add("c-tag", `--${kind}`);
        this.container.innerHTML = `
            <div class="c-iconWithDescription">
                <i class="${this.convert(kind)}"></i> ${tagName}
            </div>`;
    }
    private convert(kind: TagKind) {
        switch (kind) {
            case "ability": return `far fa-star`;
            case "target": return `far fa-flag`;
            case "gameSystem": return `fas fa-star`;
            case "hashTag": return `fas fa-hashtag`;
        }
    }
    destroy() {
        this.container.innerHTML = "";
    }
    addClickEventListener(callback: (tagKind: TagKind, tagName: string) => void) {
        this.container.addEventListener("click", () => callback(this.tagKind, this.tagName));
    }
}
