import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { GameSystemCardGroup } from "../parts/gameSystemCardsGroup";
import { PageStateBaseClass } from "./PageStateClass";

export class S_GameSystemSelector
    extends PageStateBaseClass<null,IAppUsedToReadAndChangePage>{
        async init(){
            this.generateLoadingSpinner("ds");
            const result = (await this.app.accessToAPI("list_gameSystems", {})).result;
            this.deleteLoadingSpinner();
            new GameSystemCardGroup(this.articleDOM.appendChild(document.createElement("div")),result,{
                language:this.app.state.language,
                clickEventListener: (selected) => this.app.transition("gameModeSeletor",selected),
            })
        
        }
}