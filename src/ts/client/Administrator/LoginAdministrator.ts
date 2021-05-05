import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { MultiLanguageString } from "../../type/foundation/MultiLanguageString";
import { IRunner } from "../../type/record/IRunner";
import { IAppUsedToRead } from "../interface/AppInterfaces";

export interface LoginAdministratorReadOnly{
    isUserLogin:boolean;
    loginUserName:MultiLanguageString|null;
    loginUserIconPicture:string|null|undefined;
    loginUserID:string;
    userInformation:IRunner;
    getIDToken():Promise<string>
}
export class LoginAdministrator implements LoginAdministratorReadOnly{
    private userInfo:IRunner|null =null;
    private unsubscribe:null|(()=>void) = null;
    private callbacks:((userdata:IRunner)=>void)[] = [];
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
        if (this.unsubscribe !== null) return;
        this.unsubscribe = ref.onSnapshot(snapshot => {
            console.log("[KSSRs] User information change detected.")
             const data = snapshot.data()
             if (data === undefined ){
                 if (this.unsubscribe !== null){ this.unsubscribe(); this.unsubscribe = null; }
                 this.logout(); return;
             }
             this.userInfo = data as IRunner;
             
             for (const callback of this.callbacks) callback(data  as IRunner);
        })
        console.log("[KSSRs] User information is loaded completely.")
    }
    setChangedEventListener(callback:(userdata:IRunner)=>void){
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
        if(this.unsubscribe !== null) this.unsubscribe();
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
    get userInformation():IRunner{
        if (firebase.auth().currentUser === null) throw new Error("ログインしていません。")
        if (this.userInfo === null) {
            this.subscribe().catch(err => console.error(err));
            throw new Error("## データを取得できていません。\n\nヘッダーをクリックして下さい。\n\nPlease click the header above this.")
        }
        return this.userInfo;
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