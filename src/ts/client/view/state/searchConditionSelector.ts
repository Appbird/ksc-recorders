import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { choiceString } from "../../../utility/aboutLang";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { SearchConditionSelectorView } from "../parts/Input/searchConditionSelector";
import { PageTitleView } from "../parts/PageTitleView";
import { PageStateBaseClass } from "./PageStateClass";

const context = {
    
    title:{
        Japanese: "記録の検索",
        English: "Search a Record"
    }

}

export class S_SearchConditionSelector
    extends PageStateBaseClass<{gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections}|null,IAppUsedToReadAndChangePage>{
    async init(){
        this.generateLoadingSpinner("feather")
        if (this.requiredObj !== null) this.app.changeTargetGameMode(this.requiredObj)

        const title = new PageTitleView(
            appendElement(this.articleDOM,"div"),
            choiceString(context.title,this.app.state.language),
            "",
            "c-icooon u-background--menu"
        );
        

        const difficulties = (await this.app.accessToAPI("list_difficulties",{
            gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
        })).result
        const abilities = (await this.app.accessToAPI("list_abilities",{
            gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
        })).result
        
        new SearchConditionSelectorView(this.articleDOM.appendChild(document.createElement("div")),this.app,difficulties,abilities)
        this.deleteLoadingSpinner();
    }
}


    