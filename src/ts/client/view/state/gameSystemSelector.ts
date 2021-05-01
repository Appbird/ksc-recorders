import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { GameSystemCardGroup } from "../parts/gameSystemCardsGroup";
import { PageStateBaseClass } from "./PageStateClass";

export class S_GameSystemSelector
    extends PageStateBaseClass<null,IAppUsedToReadAndChangePage>{
        async init(){
            const result = (await this.app.accessToAPI("list_gameSystems", {})).result;
            new GameSystemCardGroup(this.articleDOM.appendChild(document.createElement("div")),result,this.app)
        
        }
}