import { IAppUsedToReadAndChangePage } from "../interface/AppInterfaces"

export class URLAdministrator{
    private app:IAppUsedToReadAndChangePage
    constructor(app:IAppUsedToReadAndChangePage){
        this.app = app
    }
    getURL(){
        return new URL(location.href)
    }
    redirect():boolean{
        const url = this.getURL()
        switch(url.searchParams.get("state")) {
            case "userPageInWhole":{
                const id = url.searchParams.get("id")
                if (id === null) return false;
                this.app.transition("userPageInWhole",{runnerID: id})
                return true;
            }
            case "detailView":{
                const gs = url.searchParams.get("gs")
                const gm = url.searchParams.get("gm")
                const id = url.searchParams.get("id")
                if (gs === null || gm === null || id === null) return false;
                this.app.transition("detailView",{gameSystemEnv:{gameSystemID:gs, gameModeID:gm}, id: id, lang:this.app.state.language})
                
                
                return true;
            }
            default:
                return false;
        }
    }

}