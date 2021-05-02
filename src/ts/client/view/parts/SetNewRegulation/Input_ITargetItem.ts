import { EditorTextPart } from "./EditorTextPart";
import { element } from "../../../../utility/ViewUtility";
import { IGameDifficultyItem } from "../../../../type/list/IGameDifficultyItem";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { DestinationOfRefStackToCollection } from "./DestinationOfRefStackToCollection";
import { InputForm } from "./InputForm";import { EditorIDPart } from "./EditorIDPart";
import { IItemOfResolveTableToName } from "../../../../type/list/IItemOfResolveTableToName";
import { ITargetItem } from "../../../../type/list/ITargetItem";
import firebase from "firebase/app"
import "firebase/firestore";


export class Input_ITargetItem implements InputForm {
    private pathOfDocObserved:DestinationOfRefStackToCollection
    private id:string|undefined;
    private inputFormElement:HTMLElement
    private unsubscribeForTarget:(()=>void)|null = null;
    private unsubscribe:(()=>void)|null = null;
    private container:HTMLElement;
    private language:LanguageInApplication;
    private readonly inputForm:({name:keyof IItemOfResolveTableToName,editor:EditorTextPart}|{name:"TargetIDsIncludedInTheDifficulty",editor:EditorIDPart})[] 
    private data:IGameDifficultyItem = {
        id:"",
        Japanese:"",English:"",
        JDescription:"",EDescription:"",
        TargetIDsIncludedInTheDifficulty:[]
    };
    private pathToTargets:firebase.firestore.CollectionReference;
    private isOpened:boolean = false;
    constructor(container:HTMLElement,title:string,language:LanguageInApplication,pathOfDocObserved:DestinationOfRefStackToCollection,id?:string,errorCatcher?:(error:any)=>void){
        container.innerHTML = ""
        this.id = id;
        this.language = language;
        this.pathOfDocObserved = pathOfDocObserved;
        this.container = container;
        this.container.appendChild(element`
            <h1 class="c-list__item">
                ${title}
            </h1>
        `).addEventListener("click", () => () => (this.isOpened) ? this.closeEditor():this.prepareEditor());
        this.inputFormElement = this.container.appendChild(document.createElement("div"))
        if (this.pathOfDocObserved.reference.parent === null) throw new Error("親オブジェクトが存在しません。")
        this.pathToTargets = this.pathOfDocObserved.reference.parent.collection("target")
        this.inputForm = [
            {name:"Japanese",editor:new EditorTextPart(this.inputFormElement.appendChild(document.createElement("div")),this.language,"Japanese","")},
            {name:"English", editor:new EditorTextPart(this.inputFormElement.appendChild(document.createElement("div")),this.language,"English","")},
            {name:"JDescription", editor:new EditorTextPart(this.inputFormElement.appendChild(document.createElement("div")),this.language,"JapaneseDescription","")},
            {name:"EDescription", editor:new EditorTextPart(this.inputFormElement.appendChild(document.createElement("div")),this.language,"EnglishDescription","")},
            {name:"TargetIDsIncludedInTheDifficulty",editor:new EditorIDPart(this.inputFormElement.appendChild(document.createElement("div")),this.language,"Targets_IncludedInThisDifficulty")}
        ]
        this.closeEditor();

        this.addChangeEventListener();
    }
    async prepareEditor(){
        this.isOpened = true;
        this.inputFormElement.classList.remove("u-unused")
        try{
            const options = await this.pathToTargets.get()
            const optionData = (options.docs.map(doc => doc.data() as ITargetItem));
            if (options.empty) throw new Error("このモードの計測対象を取得できませんでした。");

            if (this.id === undefined) {
                this.refresh({
                    id:"",Japanese:"",English:"",
                    JDescription:"",EDescription:"",
                    TargetIDsIncludedInTheDifficulty:[]
                },optionData);
            } else {
                const result = await this.pathOfDocObserved.reference.doc(this.id).get()
                const value = result.data()
                if (value === undefined) throw new Error("データが存在しません。")
                this.data = value as IGameDifficultyItem;
                this.unsubscribe = this.pathOfDocObserved.reference.doc(this.id).onSnapshot(querySnapshot => {
                    const data = querySnapshot.data() as IGameDifficultyItem;
                    if (data === undefined) {this.closeEditor(); return;}
                    this.refresh(data,optionData);
                });
                
            }
            this.unsubscribeForTarget = this.pathToTargets.onSnapshot(querySnapshots => {
                this.refresh(this.data,querySnapshots.docs.map(doc => doc.data() as ITargetItem))
            })

        }catch(error){
            this.closeEditor();
            console.error(error);
        }
    }
    private refresh(item:IGameDifficultyItem, options?:ITargetItem[]){
        this.data = item;
        for(const {name,editor} of this.inputForm){
            const val = item[name];
            const value = (val === undefined) ? "" : val
            if (name==="TargetIDsIncludedInTheDifficulty" && options !== undefined)(editor as EditorIDPart).refresh((value as string[]),options)
            else (editor as EditorTextPart).refresh((value as string))
        }
    }
    private async addChangeEventListener(){
        for(const {name,editor} of this.inputForm){
            await (name === "TargetIDsIncludedInTheDifficulty") ? 
                this.addChangeEventListenerForIDInput(editor as EditorIDPart)
                : this.addChangeEventListenerForTextInput(editor as EditorTextPart,name as keyof IItemOfResolveTableToName)
        }
    }
    private addChangeEventListenerForTextInput(editor:EditorTextPart,name:keyof IItemOfResolveTableToName){
        editor.addChangeEventListener((changed) => {
            if (this.data === null) throw new Error("データ入力欄が閉じられています。")
            if (this.data[name] !== undefined) this.data[name] = changed;

            if (this.id !=="")
                this.writeData().catch();
            else{
                if (!this.checkIsNecessaryFieldFilled()) return;
                this.addData();
            }
        })
    }
    private addChangeEventListenerForIDInput(editor:EditorIDPart){
        editor.addChangeEventListener((changed) => {
            if (this.data === null) throw new Error("データ入力欄が閉じられています。")
            this.data.TargetIDsIncludedInTheDifficulty = changed
            if (this.id !=="") this.writeData();
            else{
                if (!this.checkIsNecessaryFieldFilled()) return;
                this.addData();
                this.refresh({
                    id:"",Japanese:"",English:"",
                    JDescription:"",EDescription:"",
                    TargetIDsIncludedInTheDifficulty:[]
                });
            }
        })
    }
    private checkIsNecessaryFieldFilled(){
        return this.inputForm[0].editor.isFill() && this.inputForm[1].editor.isFill() && this.inputForm[4].editor.isFill()
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
        if (this.unsubscribeForTarget !== null) this.unsubscribeForTarget(); 
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