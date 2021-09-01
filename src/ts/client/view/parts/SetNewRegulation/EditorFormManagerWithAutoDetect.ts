import { LanguageInApplication } from "../../../../type/LanguageInApplication";
import { EditorPart } from "./Editor/EditorPart";
import { TitleCupsuled } from "../TitleCupsuled";
import { IView } from "../../IView";
import { choiceString } from "../../../../utility/aboutLang";
import firebase from "firebase/app";
import "firebase/firestore"
//#CTODO アイテムごとの設定項目を表すクラスの実装

/**
 * このクラスにエディタパーツ(EditorPart)を依存注入しておくと、値の同期を自動でやっておいてくれる。
 */
type Callbacks<T> = {
    ErrorCatcher:(error:any)=>void,
    whenReset:()=>void,
    whenAppendNewItem:(id:string,data:{[key:string]:any})=>void,
    onReady?:(obj:T)=>Promise<void>
}
const undefinedIDDisplayer = {
    Japanese:"新規",
    English:"New Item"
}
export type InputFormObject<T> = {[P in keyof T]?:EditorPart<T[P]>} 
export type InputFormObjectWithAllProperties<T> = {[P in keyof T]:EditorPart<T[P]>} 

export class EditorFormManagerWithAutoDetect<TypeOfObserved extends object> implements IView {
    private pathOfDocObserved:firebase.firestore.CollectionReference
    private id:string|undefined;
    private unsubscribe:(()=>void)|null = null;
    private container:HTMLElement;
    private pathInString:string;
    private isAlreadyInitalized:boolean = false;
    private title:TitleCupsuled;
    private language:LanguageInApplication;
    private readonly inputForm:InputFormObject<TypeOfObserved> 
    private data:{[key:string]:any};
    private callbacks:Callbacks<TypeOfObserved>
    private defaultObject:TypeOfObserved;
    constructor(
        container:HTMLElement,
        language:LanguageInApplication,
        pathOfDocObserved:firebase.firestore.CollectionReference,
        pathInString:string,
        inputForms:InputFormObject<TypeOfObserved>,
        defaultObject:TypeOfObserved,
        {
            ErrorCatcher,whenAppendNewItem,whenReset,onReady: initalizeWhenItemAreSet,id
        }:Callbacks<TypeOfObserved>&{
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
            ErrorCatcher,
            whenAppendNewItem,
            whenReset,
            onReady: initalizeWhenItemAreSet
        }
        if (this.id === undefined){
            this.startToCreateNewData();
        }else {
            this.subscribe();
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
        if (this.callbacks.onReady !== undefined && !this.isAlreadyInitalized) this.onReady()
    }
    private refreshTitle(){
        this.title.refresh(`Editing : ${this.pathInString}`,(this.id === undefined) ? choiceString(undefinedIDDisplayer,this.language):this.id,{
            chara:"u-smallerChara",hr:"u-bold"
        })
    }
    private subscribe(){
        this.unsubscribe = this.pathOfDocObserved.doc(this.id).onSnapshot(querySnapshot => {
            const data = querySnapshot.data();
            if (data === undefined) return;
            this.reflectView(data);
            if (this.callbacks.onReady !== undefined && !this.isAlreadyInitalized) this.onReady()
        });
    }
    addChangeEventListenerToAllParts(callback:(changed:TypeOfObserved) => void){
        for (const tuple of this.inputFormsTuples) tuple[1]?.addChangeEventListener(() => callback(this.data as TypeOfObserved))
    }
    private addChangeEventListener(){
        for (const [key,editor] of this.inputFormsTuples){
            if (editor === undefined) continue;
            editor.addChangeEventListener((changed) => {
                const beforeChange = this.data[key]
                
                console.info(`[KSSRs-InfoEditor] Change on this client detected : [Property ${key}] from ${beforeChange} to ${changed}`)
                
                this.data[key] = changed;
                if (this.id !== undefined) {
                    this.writeData().then(() => console.info(`[KSSRs-InfoEditor] change reflected.`))
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
            if (this.data.hasOwnProperty(key)) editor.refresh(this.data[key])
            //#NOTE 型システム的には保証されていない。
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
     * @returns データが充てられたIDを返します。
     */
    async addData(item?:{[key:string]:any}):Promise<string>{
        if (item !== undefined) this.data = item;
        if (this.data.id !== undefined) this.id = this.data.id
        const ref = (this.id !== undefined) ? this.pathOfDocObserved.doc(this.id) : this.pathOfDocObserved.doc()
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
    private onReady(){
        if (this.callbacks.onReady === undefined) return;
        this.callbacks.onReady(this.data as TypeOfObserved)
        this.isAlreadyInitalized = true;
    }
}

