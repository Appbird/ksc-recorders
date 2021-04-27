import firebase from "firebase/app";
import "firebase/auth";
export interface LoginAdministratorReadOnly{
    isUserLogin:boolean;
    loginUserName:string|null;
    loginUserIconPicture:string|null|undefined;
    getIDToken():Promise<string>
}
export class LoginAdministrator implements LoginAdministratorReadOnly{
    private provider:firebase.auth.GoogleAuthProvider;
    constructor(){
        const result = document.querySelector("header>img.c-userIcon")
        if (result === null) throw new Error("予期せぬエラーです。")
        this.provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().useDeviceLanguage();

    }
    /**@throw */
    async login(){
        await firebase.auth().signInWithPopup(this.provider);
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
}