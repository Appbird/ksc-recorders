import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { IItemOfResolveTableToName } from "../../../../type/list/IItemOfResolveTableToName";
import { ITargetItem } from "../../../../type/list/ITargetItem";
import { choiceString } from "../../../../utility/aboutLang";
import { IView } from "../../IView";
import { DestinationOfRefStackToCollection } from "./DestinationOfRefStackToCollection";
import { InputForm } from "./InputForm";
import { Input_IItemOfResolveTableToName } from "./Input_IItemOfResolveTableToName";
import { Input_ITargetItem } from "./Input_ITargetItem";

const addNewDataMsg = {
    Japanese:"新しく項目を追加する",
    English: "Add New Item"
}
export class EditorSegment implements IView{
    private editorSegment: HTMLElement;
    private language:LanguageInApplication
    private additionalEditorSegment:HTMLElement;
    private additionalEditor:InputForm;
    private unsubscribe:(()=>void)|null = null;
    private editorsElement:Map<string,HTMLElement> = new Map<string, HTMLElement>();
    private editors: Map<string, InputForm> = new Map<string, InputForm>();
    private refStack: DestinationOfRefStackToCollection;
    private type:"normal"|"difficulty";
    constructor(container: HTMLElement,type:"normal"|"difficulty",language:LanguageInApplication,refStack:DestinationOfRefStackToCollection) {
        this.refStack = refStack;
        this.editorSegment = container;
        this.type = type;
        this.language = language;
        this.additionalEditorSegment = this.appendNewElementToEditorSegment()
        this.additionalEditor = new Input_IItemOfResolveTableToName(this.additionalEditorSegment,choiceString(addNewDataMsg,this.language),this.language,refStack);
        this.setNewRefStack(this.refStack,this.type);
        //#TODO この必須入力欄がすべて埋まったらイベントを発火。このイベントで、新たにFirestoreにアイテムを挿入し、入力した内容をクリアする。
    }
    async setNewRefStack(refStack:DestinationOfRefStackToCollection,type:"normal"|"difficulty"){
        this.removeAllItems();
        this.additionalEditor.destroy();
        this.type = type;
        this.refStack=refStack;
        switch (type) {
            case "difficulty":
                this.additionalEditor = new Input_ITargetItem(this.appendNewElementToEditorSegment(),choiceString(addNewDataMsg,this.language),this.language,refStack);
                for (const data of (await refStack.reference.get()).docs){
                    this.setEditorItem(data.id,data.data() as ITargetItem)
                }
                break;
            default:
                this.additionalEditor = new Input_IItemOfResolveTableToName(this.appendNewElementToEditorSegment(),choiceString(addNewDataMsg,this.language),this.language,refStack);
                for (const data of (await refStack.reference.get()).docs){
                    this.setEditorItem(data.id,data.data() as IItemOfResolveTableToName)
                }
                break;
        }
        if (this.unsubscribe !== null) this.unsubscribe();
        this.refStack.reference.onSnapshot((snapshots) => {
            snapshots.docChanges().forEach((snapshot) => {
                switch (snapshot.type){
                    case "removed": this.removeEditorItem(snapshot.doc.id); break;
                    default: this.setEditorItem(snapshot.doc.id,snapshot.doc.data() as IItemOfResolveTableToName)
                }
            })
        } )

    }
    removeAllItems() {
        this.editors.forEach(editor => editor.destroy());
        this.editors.clear();
    }
    removeEditorItem(id: string) {
        this.editors.get(id)?.destroy();
        this.editors.delete(id);
    }
    setEditorItem(id: string, item: IItemOfResolveTableToName) {
        switch(this.type){
            case "difficulty":
                if (!this.editorsElement.has(id)) this.editorsElement.set(id,this.appendNewElementToEditorSegment())
                this.editors.set(id,new Input_ITargetItem(this.editorsElement.get(id) as HTMLElement,choiceString(item,this.language),this.language,this.refStack,id));
                break;
            default:
                if (!this.editorsElement.has(id)) this.editorsElement.set(id,this.appendNewElementToEditorSegment())
                this.editors.set(id,new Input_IItemOfResolveTableToName(this.editorsElement.get(id) as HTMLElement,choiceString(item,this.language),this.language,this.refStack,id));
        }
    }
    private appendNewElementToEditorSegment(){
        return this.editorSegment.appendChild(document.createElement("div"))
    }
    destroy(){
        this.removeAllItems();
        this.editorSegment.innerHTML = "";
    }
}

