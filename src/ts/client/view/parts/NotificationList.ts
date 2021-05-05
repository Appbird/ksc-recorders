import firebase from "firebase/app";
import { INotificationItem } from "../../../type/record/IRunner";
import { selectAppropriateDescription } from "../../../utility/aboutLang";
import { IView } from "../IView";
import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { HTMLConverter } from "../../../utility/ViewUtility";

export class NotificationList implements IView {
    private notificationList: [string, INotificationItem][] = [];
    private container: Element;
    private observed: firebase.firestore.CollectionReference;
    private unsubscribe: () => void;
    private language: LanguageInApplication;
    private htmlC: HTMLConverter;
    constructor(container: Element, language: LanguageInApplication,observed: firebase.firestore.CollectionReference,limit:number = 50) {
        this.container = container;
        this.container.classList.add("c-list");
        this.language = language;
        this.observed = observed;
        this.htmlC = new HTMLConverter(language);
        this.prepare().catch((err) => console.error(err));
        this.unsubscribe = this.observed.limit(limit).onSnapshot((querySnapshots) => {
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
    private async prepare() {
        for (const notification of (await this.observed.get()).docs.map(doc => doc.data()) as INotificationItem[]) {
            this.append(notification);
            this.notificationList.push([notification.id, notification]);
        }
    }
    read() {
        const unreads = this.notificationList.filter(([, value]) => value.unread);
        for (const [key, notification] of unreads) {
            this.observed.doc(key).set({ ...notification, unread: false });
        }
    }
    append(INotificationItem: INotificationItem) {
        this.container.prepend(this.htmlC.elementWithoutEscaping`
            <div class="c-list__item --hoverAnimeDisabled">
                <div class="u-width90per">
                    <h2>${INotificationItem}</h2>
                    <p>${selectAppropriateDescription(INotificationItem, this.language)}<p>
                </div>
            </div>
        `);
    }
    destroy() {
        this.unsubscribe();
        this.container.innerHTML = "";
    }
}
