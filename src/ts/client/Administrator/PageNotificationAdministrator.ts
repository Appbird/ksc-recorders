import { MultiLanguageString } from "../../type/foundation/MultiLanguageString"
import { choiceString } from "../../utility/aboutLang";
import { IAppUsedToRead } from "../interface/AppInterfaces"

type Position = "top"|"bottom";
type Type = "success"|"warning"|"error"|"info"|"neutral";
const notie = require("notie") as {
    alert:({type,text,stay,time,position}:{
        type?:Type,
        text?:string,
        stay?:boolean,
        time?:number,
        position?:Position
    }) => void,
    confirm:({text,submitCallback,submitText,position,cancelCallback,cancelText}:{
        text:string,
        submitText?:string,
        cancelText?: string,
        position?:Position,
        submitCallback?:()=>void,
        cancelCallback?:()=>void
    },submitCallbackOptional?:()=>void,cancelCallbackOptional?:()=>void) => void;
    input:({text,submitText,cancelText,submitCallback,placeholder,spellcheck}:{
        text: string,
        submitText: string, // optional, default = 'Submit'
        cancelText: string, // optional, default = 'Cancel'
        submitCallback?: (value:string) => void, // optional
        placeholder?: string, // default: ''
        spellcheck: string, // default: 'default'
    },submitCallbackOptional?:(value:any) => void, cancelCallbackOptional?:(value:any) => void) => void
}
export class PageNotificationAdministrator{
    private app:IAppUsedToRead;
    constructor(app:IAppUsedToRead){
        this.app = app;
    }
    errorAlert(text:string|MultiLanguageString){
        notie.alert({type:"error",text:choiceString(text,this.app.state.language)})
    }
    successAlert(text:string|MultiLanguageString){
        notie.alert({type:"success",text:choiceString(text,this.app.state.language)})
    }
    confirmAlert({text,ok={Japanese:"はい",English:"Yes"},okCallback,cancel={Japanese:"いいえ",English:"No"},cancelCallback}:{
        text:string|MultiLanguageString,
        ok?:string|MultiLanguageString,
        okCallback?:()=>void,
        cancel?:string|MultiLanguageString,
        cancelCallback?:()=>void
    }){
        notie.confirm({
            text:choiceString(text,this.app.state.language),
            submitText:choiceString(ok,this.app.state.language),
            cancelText:choiceString(cancel,this.app.state.language),
            submitCallback:okCallback,
            cancelCallback:cancelCallback,
        })
    }
    reasonInputerAleart({text,ok={Japanese:"はい",English:"Yes"},okCallback,cancel={Japanese:"いいえ",English:"No"},placeholder}:{
        text:string|MultiLanguageString,
        ok?:string|MultiLanguageString,
        okCallback?:(value:string)=>void,
        cancel?:string|MultiLanguageString,
        placeholder?:string|MultiLanguageString
    }){
        
        notie.input({
            text:choiceString(text,this.app.state.language),
            submitText:choiceString(ok,this.app.state.language),
            cancelText:choiceString(cancel,this.app.state.language),
            submitCallback:okCallback,
            placeholder:choiceString(placeholder,this.app.state.language),
            spellcheck:"false"
        })
        
    }
}