export class LoginAdministrator{
    private iconAboutloginUser:HTMLImageElement;
    constructor(){
        const result = document.querySelector("header>img.c-userIcon")
        if (result === null) throw new Error("予期せぬエラーです。")
        this.iconAboutloginUser = result as HTMLImageElement;   
    }
    login(){

    }
    logout(){

    }
    getName(){

    }
    getIconPicture(){

    }
    getIDToken(){

    }
}