import { IAppUsedToReadAndChangeOnlyPageState } from "../../../interface/AppInterfaces";
import { DocViewerRequired } from "./Types";

type CollectionName = "modes"|"abilities"|"targets"|"difficulties"
export function goDeeperFromDocToCollection(app:IAppUsedToReadAndChangeOnlyPageState,requiredObj:DocViewerRequired,destination:CollectionName){
    if (requiredObj.id === undefined) return;
    
    console.log(`[KSSRs] go to ${requiredObj.collection.path}/${(requiredObj.id) ? requiredObj.id : "(new)"}/${destination} ...`)
    requiredObj.pathStack.push(destination);
    app.transition("settingNewRegulation_CollectionViewer",{
        collection:requiredObj.collection.doc(requiredObj.id).collection(destination),
        pathStack:requiredObj.pathStack
    },{ifAppendHistory:false})
}
export function goBackFromDocToCollection(app:IAppUsedToReadAndChangeOnlyPageState,requiredObj:DocViewerRequired){
    requiredObj.pathStack.pop()
    console.log(`[KSSRs] go to ${requiredObj.collection.path} /  ...`)
    app.transition("settingNewRegulation_CollectionViewer",{
        collection:requiredObj.collection,
        pathStack:requiredObj.pathStack
    },{ifAppendHistory:false})
}

export const titleContext = {
    titleWithoutID:{
        Japanese:"アイテムの登録",
        English:"Registering new item",
    },
    
    titleWithoutIDDescription:{
        Japanese:"必須項目を全て入力すると自動的に登録されます。",
        English:"When you fill out all of the required fields, the item will be sent to the server and inserted."
    },
    title:{
        Japanese:"移行先を選択",
        English:"Select where you want to edit."
    },
    titleDescription:{
        Japanese:"",
        English:""
    },
}