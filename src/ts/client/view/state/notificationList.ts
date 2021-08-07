import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";
import firebase from "firebase/app";
import "firebase/firestore"
import { appendElement } from "../../utility/aboutElement";
import { choiceString } from "../../../utility/aboutLang";
import { NotificationList } from "../parts/NotificationList";
import { PageTitleView } from "../parts/PageTitleView";
const context = {
    title:{
        Japanese:"通知",
        English:"Notification"
    }
}
export class S_NotificationList
    extends PageStateBaseClass<null,IAppUsedToChangeState>{
        private notificationList?:NotificationList;
    async init(){
        this.generateLoadingSpinner()
        const title = new PageTitleView(
            appendElement(this.articleDOM,"div"),
            choiceString(context.title,this.app.state.language),
            "",
            "c-icooon u-background--cloud"
        )
        const ref = firebase.firestore().collection("runners").doc(this.app.loginAdministratorReadOnly.loginUserID).collection("notifications")
        this.notificationList = new NotificationList(appendElement(this.articleDOM,"div"),this.app.state.language,ref,{
            readNotification:async () => {
                try {
                    await this.app.accessToAPI("notification_read",{idToken:await this.app.loginAdministratorReadOnly.getIDToken()})
                }
                catch(err) { this.app.errorCatcher(err); }
            }
        })
        
        this.deleteLoadingSpinner();
    }
    destroy(){
        if (this.notificationList !== undefined) this.notificationList.destroy()
    }

}

