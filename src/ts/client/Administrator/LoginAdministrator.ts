import firebase from "firebase/app";
import "firebase/auth";
export interface LoginAdministratorReadOnly{
    isUserLogin:boolean;
    loginUserName:string|null;
    loginUserIconPicture:string|null|undefined;
    getIDToken():Promise<string>
}
export class LoginAdministrator implements LoginAdministratorReadOnly{
    constructor(){
        firebase.auth().useDeviceLanguage();
    }
    /**@throw */
    async login(){
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    }
    /**@throw */
    async logout(){
        await firebase.auth().signOut()
    }
    get isUserLogin(){
        return firebase.auth().currentUser !== null;
    }
    /**@throw */
    get loginUserName(){
        const user = firebase.auth().currentUser;
        if ( user === null ) throw new Error("ログインしていません。")
        return user.displayName;
    }
    /**@throw */
    get loginUserIconPicture(){
        const user = firebase.auth().currentUser;
        if ( user === null ) throw new Error("ログインしていません。")
        return firebase.auth().currentUser?.photoURL;
    }
    /**@throw */
    getIDToken(){
        const user = firebase.auth().currentUser;
        if ( user === null ) throw new Error("ログインしていません。")
        return user.getIdToken(true);
    }
    onStateChange(callback:()=>void){
        firebase.auth().onAuthStateChanged(callback);
    }
}