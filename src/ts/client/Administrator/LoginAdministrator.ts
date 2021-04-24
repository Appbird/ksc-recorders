import App from "../App";
import firebase from "../firebase"
export class LoginAdministrator{
    private iconAboutloginUser:HTMLImageElement;
    private app:App;
    private provider:firebase.auth.GoogleAuthProvider;
    constructor(app:App){
        const result = document.querySelector("header>img.c-userIcon")
        if (result === null) throw new Error("予期せぬエラーです。")
        this.iconAboutloginUser = result as HTMLImageElement;
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.app = app;
        firebase.auth().useDeviceLanguage();

    }
    /**@throw */
    async login(){
        try{
            await firebase.auth().signInWithPopup(this.provider);
        }catch(error){
            this.app.errorCatcher(error);
        }
    }
    /**@throw */
    async logout(){
        await firebase.auth().signOut()
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
    get IDToken(){
        const user = firebase.auth().currentUser;
        if ( user === null ) throw new Error("ログインしていません。")
        return user.getIdToken(true);
    }
}