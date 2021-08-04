import firebase from "firebase/app";
import { INotificationItem } from "../../../type/record/IRunner";
import { choiceString, selectAppropriateDescription } from "../../../utility/aboutLang";
import { IView } from "../IView";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../utility/ViewUtility";
import marked from "marked";
import { formatDate } from "../../../utility/timeUtility";

export class NotificationList implements IView {
    private container: Element;
    private observed: firebase.firestore.CollectionReference;
    private unsubscribe: () => void;
    private readNotification: () => Promise<void>;
    private language: LanguageInApplication;
    private htmlC: HTMLConverter;
    constructor(container: Element, language: LanguageInApplication,observed: firebase.firestore.CollectionReference,{
            limit = 30,
            readNotification
        }:{limit?:number,readNotification:()=>Promise<void>}) {
        this.container = container;
        this.container.classList.add("c-list");
        this.language = language;
        this.observed = observed;
        this.htmlC = new HTMLConverter(language);
        this.readNotification = readNotification;
        this.unsubscribe = this.observed.orderBy("postedDate","asc").limit(limit).onSnapshot((querySnapshots) => {
            for (const querySnapshot of querySnapshots.docChanges()) {
                switch (querySnapshot.type) {
                    case "added":
                        this.append(querySnapshot.doc.data() as INotificationItem);
                        this.read();
                    default: continue;
                }
            }
        });
    }
    read() {
        
        this.readNotification();
    }
    append(notificationItem: INotificationItem) {
        this.container.prepend(this.htmlC.elementWithoutEscaping`
            <div class="c-list__item u-unclickable">
                
                <div class="u-width90per u-margin05em u-marginUpDown05emToChildren">
                    
                    <i class="${notificationItem.iconCSSClass} u-inline"></i>
                    <div class="u-inline u-grayChara"> <strong>${choiceString(notificationItem.from,this.language)}</strong> 
                            ${formatDate(notificationItem.postedDate,"time")} 
                    </div>
                    ${marked(choiceString(notificationItem,this.language))}
                </div>
            </div>
        `);
    }
    destroy() {
        this.unsubscribe();
        this.container.innerHTML = "";
    }
}
