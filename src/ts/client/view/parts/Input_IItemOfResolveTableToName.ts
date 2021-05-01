import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { HTMLConverter } from "../../../utility/ViewUtility";
import { IItemOfResolveTableToName } from "../../../type/list/IItemOfResolveTableToName";
import { TextInputCapsuled } from "./TextInputCapsuled";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { MultiLanguageString } from "../../../type/foundation/MultiLanguageString";
import { IView } from "../IView";

//#TODO アイテムごとの設定項目を表すクラスの実装
export class Input_IItemOfResolveTableToName implements IView {
    private container: Element;
    private switch: HTMLElement;
    private opened: boolean = false;
    private main: Element;
    private item: IItemOfResolveTableToName;
    private JNameInput: TextInputCapsuled;
    private ENameInput: TextInputCapsuled;
    private JDescriptionInput: TextInputCapsuled;
    private EDescriptionInput: TextInputCapsuled;
    private htmlConverter: HTMLConverter;
    constructor(container: Element,language: LanguageInApplication,title: string | MultiLanguageString = "", {
        defaultItem = {
            Japanese:"",JDescription:"",
            English:"",EDescription:"",
            id:""
        },
        alreadyOpened = false
    }: { alreadyOpened?: boolean,defaultItem?: IItemOfResolveTableToName } = {}) {
        this.htmlConverter = new HTMLConverter(language);
        this.item = defaultItem;
        this.container = container;
        this.container.classList.add("c-list");
        //#CTODO クリックすることで設定項目の表示の有無を切り替えられる。
        this.switch = this.container.appendChild(this.htmlConverter.elementWithoutEscaping`
            <div class="c-list__item">${title}</div>`) as HTMLElement;
        this.switch.addEventListener("click", () => this.switchOpened(!this.opened));
        this.switchOpened(alreadyOpened);

        this.main = this.container.appendChild(createElementWithIdAndClass({ className: "u-width90per u-unused" }));
        this.JNameInput = new TextInputCapsuled(this.main.appendChild(document.createElement("div")), { defaultValue: defaultItem.Japanese });
        this.ENameInput = new TextInputCapsuled(this.main.appendChild(document.createElement("div")), { defaultValue: defaultItem.English });
        this.JDescriptionInput = new TextInputCapsuled(this.main.appendChild(document.createElement("div")), { defaultValue: defaultItem.JDescription ? defaultItem.JDescription : "" });
        this.EDescriptionInput = new TextInputCapsuled(this.main.appendChild(document.createElement("div")), { defaultValue: defaultItem.EDescription ? defaultItem.EDescription : "" });
        this.setChangeEventListenerForSyncOfValue();
    }
    private setChangeEventListenerForSyncOfValue(){
        this.JNameInput.addEventListener("change",() => this.item.Japanese = this.JNameInput.value)
        this.ENameInput.addEventListener("change",() => this.item.English = this.item.English)
        this.JDescriptionInput.addEventListener("change",() => this.item.JDescription = this.item.JDescription)
        this.EDescriptionInput.addEventListener("change",() => this.item.EDescription = this.item.EDescription)
    }
    isNecessaryFieldsFilled(){
        const i = this.item;
        return (i.Japanese.length*i.English.length === 0);
    }
    clear(){
        this.JNameInput.value = "";
        this.ENameInput.value = "";
        this.JDescriptionInput.value = "";
        this.EDescriptionInput.value = "";
    }
    switchOpened(open: boolean) {
        this.opened = open;
        (this.opened) ? this.main.classList.remove("u-unused") : this.main.classList.add("u-unused");
    }
    refreshView(item: IItemOfResolveTableToName) {
        //#CTODO Itemをセットし直して、それをもとにテキスト入力欄をセットし直す。
        //#CTODO 入力時のリスナーをセットしたい。
        this.item = item;
        this.JNameInput.value = this.item.Japanese;
        this.ENameInput.value = this.item.English;
        this.JNameInput.value = this.item.JDescription ? this.item.JDescription : "";
        this.ENameInput.value = this.item.EDescription ? this.item.EDescription : "";
    }
    addChangeEventListener(callback:(changed:IItemOfResolveTableToName) => void){
        const callbackFunc = () => callback(this.item);
        this.JNameInput.addEventListener("change",callbackFunc)
        this.ENameInput.addEventListener("change",callbackFunc)
        this.JDescriptionInput.addEventListener("change",callbackFunc)
        this.EDescriptionInput.addEventListener("change",callbackFunc)
    }
    destroy(){
        this.JNameInput.destroy();
        this.ENameInput.destroy();
        this.EDescriptionInput.destroy();
        this.JDescriptionInput.destroy();
        this.container.innerHTML = "";
    }
}
