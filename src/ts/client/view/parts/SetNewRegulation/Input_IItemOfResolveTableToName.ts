import { EditorTextPart } from "./EditorTextPart";
import { element } from "../../../../utility/ViewUtility";
import { IItemOfResolveTableToName } from "../../../../type/list/IItemOfResolveTableToName";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { DestinationOfRefStackToCollection } from "./DestinationOfRefStackToCollection";
import { InputForm } from "./InputForm";
//#CTODO アイテムごとの設定項目を表すクラスの実装

export class Input_IItemOfResolveTableToName implements InputForm {
    private pathOfDocObserved:DestinationOfRefStackToCollection
    private id:string|undefined;
    private inputFormElement:HTMLElement
    private unsubscribe:(()=>void)|null = null;
    private container:HTMLElement;
    private language:LanguageInApplication;
    private readonly inputForm:{name:keyof IItemOfResolveTableToName,editor:EditorTextPart}[] 
    private data:IItemOfResolveTableToName = {
        id:"",
        Japanese:"",English:"",
        JDescription:"",EDescription:"",
    };
    private isOpened:boolean = false;

    constructor(container:HTMLElement,title:string,language:LanguageInApplication,pathOfDocObserved:DestinationOfRefStackToCollection,id?:string){
        container.innerHTML = ""
        this.id = id;
        this.language = language;
        this.pathOfDocObserved = pathOfDocObserved;
        this.container = container;
        this.container.appendChild(element`
            <h1 class="c-list__item u-biggerChara">
                ${title}
            </h1>
        `).addEventListener("click", () => (this.isOpened) ? this.closeEditor():this.prepareEditor());;
        this.inputFormElement = this.container.appendChild(document.createElement("div"))
        this.inputForm = [
            {name:"Japanese",editor:new EditorTextPart(this.inputFormElement.appendChild(document.createElement("div")),this.language,"Japanese","")},
            {name:"English", editor:new EditorTextPart(this.inputFormElement.appendChild(document.createElement("div")),this.language,"English","")},
            {name:"JDescription", editor:new EditorTextPart(this.inputFormElement.appendChild(document.createElement("div")),this.language,"JDescription","")},
            {name:"EDescription", editor:new EditorTextPart(this.inputFormElement.appendChild(document.createElement("div")),this.language,"EDescription","")}
        ]
        this.closeEditor();
        this.addChangeEventListener();
    }
    async prepareEditor(){
        this.isOpened = true;
        this.inputFormElement.classList.remove("u-unused")
        try{
            if (this.id === undefined) {
                this.refresh({
                    id:"",Japanese:"",English:"",
                    JDescription:"",EDescription:"",
                });
            }
            else {
                const result = await this.pathOfDocObserved.reference.doc(this.id).get()
                const value = result.data()
                if (value === undefined) throw new Error("データが存在しません。")
                this.data = value as IItemOfResolveTableToName;
                this.unsubscribe = this.pathOfDocObserved.reference.doc(this.id).onSnapshot(querySnapshot => {
                    const data = querySnapshot.data() as IItemOfResolveTableToName;
                    if (data === undefined) {this.closeEditor(); return;}
                    this.refresh(data);
                });
            }
        }catch(error){
            this.closeEditor();
            console.error(error);
        }
    }
    private refresh(item:IItemOfResolveTableToName){
        for(const {name,editor} of this.inputForm){
            const val = item[name];
            const value = (val === undefined) ? "" : val
            editor.refresh(value)
        }
    }
    private addChangeEventListener(){
        for(const {name,editor} of this.inputForm){
            editor.addChangeEventListener((changed) => {
                if (this.data === null) throw new Error("データ入力欄が閉じられています。")
                if (this.data[name] !== undefined) this.data[name] = changed;

                if (this.id !==undefined)
                    this.writeData();
                else{
                    if (!this.inputForm[0].editor.isFill() && this.inputForm[1].editor.isFill()) return;
                    this.addData();
                }
            })
        }
        
    }
    async writeData(){
        
        await this.pathOfDocObserved.reference.doc(this.id).set(this.data)
    }
    async addData(){
        const ref = await this.pathOfDocObserved.reference.add(this.data);
        this.closeEditor();
        this.data.id = ref.id
        this.pathOfDocObserved.reference.doc(ref.id).set(this.data)
    }
    closeEditor(){
        this.isOpened = false;
        if (this.unsubscribe !== null) this.unsubscribe();
        this.inputFormElement.classList.add("u-unused")
    }
    isFilled(){
        if (this.data === null) throw new Error("データ入力欄が閉じられています。")
        return this.inputForm.every((form) => form.editor.isFill())
    }
    destroy(){
        this.closeEditor();
        this.container.innerHTML = "";
    }
}