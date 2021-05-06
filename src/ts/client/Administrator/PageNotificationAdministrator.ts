import { MultiLanguageString } from "../../type/foundation/MultiLanguageString"
import { LanguageInApplication } from "../../type/LanguageInApplication"
import { choiceString } from "../../utility/aboutLang";
import { IAppUsedToRead } from "../interface/AppInterfaces"

const notie = require("notie") as {
    alert:({type,text,stay,time,position}:{
        type?:"success"|"warning"|"error"|"info"|"neutral",
        text?:string,
        stay?:boolean,
        time?:number,
        position?:string
    }) => void,

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
    
}