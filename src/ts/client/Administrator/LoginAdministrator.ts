import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { MultiLanguageString } from "../../type/foundation/MultiLanguageString";
import { IRunnerEditable, IRunnerUneditable } from "../../type/record/IRunner";
import { IAppUsedToRead } from "../interface/AppInterfaces";

export interface LoginAdministratorReadOnly{
    isUserLogin:boolean;
    loginUserName:MultiLanguageString|null;
    loginUserIconPicture:string|null|undefined;
    loginUserID:string;
    userInformation:IRunnerEditable;
    userInformation_uneditable:IRunnerUneditable|null
    getIDToken():Promise<string>
}
export class LoginAdministrator implements LoginAdministratorReadOnly{
    private userInfo:IRunnerEditable|null =null;
    private userInfo_uneditable:IRunnerUneditable|null =null;
    private unsubscribe_main:null|(()=>void) = null;
    private unsubscribe_sub:null|(()=>void) = null;
    private callbacks:((userdata:IRunnerEditable)=>void)[] = [];
    private app:IAppUsedToRead;
    constructor(app:IAppUsedToRead){
        firebase.auth().useDeviceLanguage();
        this.app = app;
    }
    async subscribe(){
        const user = firebase.auth().currentUser;
        if ( user === null ) throw new Error("ログインしていません。")

        const ref = firebase.firestore().collection("runners").doc(user.uid);
        this.userInfo = (await this.app.accessToAPI("list_runner",{id: user.uid})).result;

        if (this.unsubscribe_main !== null) return;
        this.unsubscribe_main = ref.onSnapshot(async snapshot => {
            console.log("[KSSRs] User information change detected.")
             const data = snapshot.data()
             if (data === undefined ){
                 if (this.unsubscribe_main !== null){ this.unsubscribe_main(); this.unsubscribe_main = null; }
                 this.logout(); return;
             }
             
             this.userInfo = data as IRunnerEditable;
             
             for (const callback of this.callbacks) callback(this.userInfo);
        })

        this.unsubscribe_sub = ref.collection("limitedWrite").doc("onlyServerOperation").onSnapshot(snapshot =>{
            console.log("[KSSRs] User information change detected.")
             const data = snapshot.data()
             if (data === undefined ){
                 if (this.unsubscribe_sub !== null){ this.unsubscribe_sub(); this.unsubscribe_sub = null; }
                 this.logout(); return;
             }
             this.userInfo_uneditable = data as IRunnerUneditable;
        })
        
        console.log("[KSSRs] User information is loaded completely.")
    }
    setChangedEventListener(callback:(userdata:IRunnerEditable)=>void){
        this.callbacks.push(callback)
    }
    /**@throw */
    async login(){
        console.log("[KSSRs] Login")
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    }
    /**@throw */
    async logout(){
        console.log("[KSSRs] Logout")
        if(this.unsubscribe_main !== null) this.unsubscribe_main();
        await firebase.auth().signOut()
    }
    get isUserLogin(){
        return firebase.auth().currentUser !== null;
    }
    /**@throw */
    get loginUserName():MultiLanguageString{
        const user = firebase.auth().currentUser;
        if (user === null) throw new Error("ログインしていません。")
        if (this.userInfo === null) {
            this.subscribe();
            throw new Error("## データを取得できていません。\n\nヘッダーをクリックして下さい。\n\nPlease click the header above this.")
        }
        return this.userInfo;
    }
    /**@throw */
    get loginUserID(){
        const user = firebase.auth().currentUser;
        if ( user === null ) throw new Error("ログインしていません。")
        return user.uid;
    }
    /**@throw */
    get loginUserIconPicture(){
        const user = firebase.auth().currentUser;
        if ( user === null ) throw new Error("ログインしていません。")
        return this.userInfo?.photoURL || user.photoURL;
    }
    get userInformation():IRunnerEditable{
        if (firebase.auth().currentUser === null) throw new Error("ログインしていません。")
        if (this.userInfo === null) {
            this.subscribe().catch(err => console.error(err));
            throw new Error("## データを取得できていません。\n\nヘッダーをクリックして下さい。\n\nPlease click the header above this.")
        }
        return this.userInfo;
    }
    get userInformation_uneditable():IRunnerUneditable|null{
        return this.userInfo_uneditable
    }
    /**@throw */
    getIDToken(){
        const user = firebase.auth().currentUser;
        if ( user === null ) throw new Error("ログインしていません。")
        return user.getIdToken(true);
    }
    onStateChange(callback:(user:firebase.User|null)=>void){
        firebase.auth().onAuthStateChanged(callback);
    }
}