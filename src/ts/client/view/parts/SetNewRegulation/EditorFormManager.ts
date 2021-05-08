import { IItemOfResolveTableToName } from "../../../../type/list/IItemOfResolveTableToName";
import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { EditorPart } from "./Editor/EditorPart";
import { checkType } from "../../../../utility/InputCheckerUtility";
import { TitleCupsuled } from "../TitleCupsuled";
import { IView } from "../../IView";
import { choiceString } from "../../../../utility/aboutLang";
import firebase from "firebase/app";
//#CTODO アイテムごとの設定項目を表すクラスの実装

/**
 * このクラスにエディタパーツ(EditorPart)を依存注入しておくと、値の同期を自動でやっておいてくれる。
 */
type Callbacks = {
    ErrorCatcher:(error:any)=>void,
    whenReset:()=>void,
    whenAppendNewItem:(id:string,data:{[key:string]:any})=>void,
}
const undefinedIDDisplayer = {
    Japanese:"新規",
    English:"New Item"
}
export type InputFormObject<T> = {[P in keyof T]?:EditorPart<T[P]>} 

export class EditorFormManager<TypeOfObserved extends object> implements IView {
    private pathOfDocObserved:firebase.firestore.CollectionReference
    private id:string|undefined;
    private unsubscribe:(()=>void)|null = null;
    private container:HTMLElement;
    private pathInString:string;

    private title:TitleCupsuled;
    private language:LanguageInApplication;
    private readonly inputForm:InputFormObject<TypeOfObserved> 
    private data:{[key:string]:any};
    private callbacks:Callbacks
    private defaultObject:TypeOfObserved;

    constructor(
        container:HTMLElement,
        language:LanguageInApplication,
        pathOfDocObserved:firebase.firestore.CollectionReference,
        pathInString:string,
        inputForms:InputFormObject<TypeOfObserved>,
        defaultObject:TypeOfObserved,
        {
            ErrorCatcher,whenAppendNewItem,whenReset,id
        }:Callbacks&{
            id?:string,
        }
    ){
        container.innerHTML = ""
        this.container = container;
        this.title = new TitleCupsuled(this.container)
        this.pathInString = pathInString;
        this.defaultObject = defaultObject;
        this.id = id;
        this.language = language;
        this.pathOfDocObserved = pathOfDocObserved;
        console.log(`[KSSRs] connecting ${pathOfDocObserved.path}/${(id) ? id:"(new)"}  ...`)
        this.inputForm = inputForms;
        this.data = {};
        this.callbacks = {
            ErrorCatcher:ErrorCatcher,
            whenAppendNewItem:whenAppendNewItem,
            whenReset:whenReset
        }
        if (this.id === undefined){
            this.startToCreateNewData();
        }else {
            this.fetchData().then(() => this.subscribe());
        }
        this.addChangeEventListener();
        this.refreshTitle()
    }
    private startToCreateNewData(){
        if (this.unsubscribe !== null) this.unsubscribe();
        this.id = undefined;
        const defaultObj:{[key:string]:any} = {};
        this.data = Object.assign(this.defaultObject);
        this.reflectView(this.data)
        this.refreshTitle();
        
    }
    private refreshTitle(){
        this.title.refresh(`Editing : ${this.pathInString}`,(this.id === undefined) ? choiceString(undefinedIDDisplayer,this.language):this.id,{
            chara:"u-smallerChara",hr:"u-bold"
        })
    }
    private async fetchData(){
        const data = await (await (this.pathOfDocObserved.doc(this.id).get())).data()
        if (data === undefined) return this.startToCreateNewData();
        this.reflectView(data);
    }
    private subscribe(){
        this.unsubscribe = this.pathOfDocObserved.doc(this.id).onSnapshot(querySnapshot => {
            console.info(`[KSSRs-InfoEditor] change from the server detected.`)
            const data = querySnapshot.data();
            if (data === undefined) return;
            this.reflectView(data);
        });
    }
    private addChangeEventListener(){
        for (const [key,editor] of this.inputFormsTuples){
            if (editor === undefined) continue;
            editor.addChangeEventListener((changed) => {
                const beforeChange = this.data[key]
                
                console.info(`[KSSRs-InfoEditor] change on the client detected : Property ${key} >>> from ${beforeChange} to ${changed}`)
                    
                this.data[key] = changed;
                if (this.id !== undefined) {
                    this.writeData();
                    console.info(`[KSSRs-InfoEditor] reflected : Property ${key} >>> from ${beforeChange} to ${changed}`)
                    return;
                }
                if (this.isFilled()){
                    this.disabledAllInputs(true);
                    this.addData().then( assignedID => {
                        this.id = assignedID
                        console.info(`[KSSRs-InfoEditor] registered : the assigned id is ${assignedID}`)
                        this.refreshTitle()
                        this.disabledAllInputs(false);
                    }).catch(error => this.callbacks.ErrorCatcher(error));
                }
            })
        }
    }
    /**
     * 現在のListItemInputForm#dataプロパティをもとに画面の表示を更新する
     * @param item ここに入れた値は画面表示更新前にListItemInputForm#dataプロパティに代入される。
     */
    private reflectView(item?:{[key:string]:any}){
        
        if (item !== undefined) this.data = item;
        for (const [key,editor] of this.inputFormsTuples){
            if (editor === undefined) continue;
            if (this.data.hasOwnProperty(key) && checkType(this.data[key],editor.requiredTypeInString)) editor.refresh(this.data[key])
            //#NOTE 型システム的には保証されていないが一応チェックも通してるので正当な型が入る…ハズ。
        }
    }
    /**
     * 現在のListItemInputForm#dataプロパティをもとにデータベースに書き込む。
     * なお、idプロパティに何かを代入している場合、それがfirestoreでのidに置き換えられる点に注意。
     * @param item ここに入れた値は画面表示更新前にListItemInputForm#dataプロパティに代入される。
     */
    async writeData(item?:{[key:string]:any}){
        if (item !== undefined) this.data = item;
        this.data["id"] = this.id;
        await this.pathOfDocObserved.doc(this.id).set(this.data)
    }
    /**
     * 現在のListItemInputForm#dataプロパティをもとにデータベースに新しいデータとして書き込む。
     * なお、idプロパティに何かを代入している場合、それがfirestoreでのidに置き換えられる点に注意。
     * @param item ここに入れた値は画面表示更新前にListItemInputForm#dataプロパティに代入される。
     * @throws データがすでに登録済みであった(ListItemInputForm#dataがundefinedでない)場合、例外を投げます。
     * @returns データが充てられたIDを返します。
     */
    async addData(item?:{[key:string]:any}):Promise<string>{
        if (item !== undefined) this.data = item;
        if (this.id !== undefined) throw new Error("このデータは既に登録済みです。")
        const ref = await this.pathOfDocObserved.add(this.data);
        this.data.id = ref.id
        this.pathOfDocObserved.doc(ref.id).set(this.data)
        this.callbacks.whenAppendNewItem(ref.id,this.data);
        return ref.id;
    }
    disabledAllInputs(state:boolean){
        for(const [,editor] of this.inputFormsTuples) if(editor !== undefined) editor.disabled(state)
    }

    isFilled(){
        return this.inputFormsTuples.every(([,editor]) => (editor!==undefined) ? (!editor.requiredField || editor.isFill() ):true)
    }
    destroy(){
        if (this.unsubscribe !== null){
            this.unsubscribe();
            console.log(`[KSSRs] unsubscribe onSnapshot ${this.pathOfDocObserved.path}/${this.id}.`)
        }

        this.container.innerHTML = "";
    }
    get inputFormsTuples():[string,EditorPart<any>|undefined][]{
        return Object.entries(this.inputForm);
    }
}

