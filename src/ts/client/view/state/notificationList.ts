import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";
import firebase from "firebase/app";
import "firebase/firestore"
import { TitleCupsuled } from "../parts/TitleCupsuled";
import { appendElement } from "../../utility/aboutElement";
import { choiceString } from "../../../utility/aboutLang";
import { NotificationList } from "../parts/NotificationList";
const context = {
    title:{
        Japanese:"通知",
        English:"Notification"
    }
}
export class S_NotificationList
    extends PageStateBaseClass<null,IAppUsedToReadAndChangePage>{
    async init(){
        const title = new TitleCupsuled(appendElement(this.articleDOM,"div"));
        title.refresh(choiceString(context.title,this.app.state.language))
        const ref = firebase.firestore().collection("runners").doc(this.app.loginAdministratorReadOnly.loginUserID).collection("notifications")
        const notificationList = new NotificationList(appendElement(this.articleDOM,"div"),this.app.state.language,ref)
    }

}

