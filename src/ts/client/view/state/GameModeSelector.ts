import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { choiceString } from "../../../utility/aboutLang";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { GameModeCardsGroup } from "../parts/gameModeCardsGroup";
import { PageTitleView } from "../parts/PageTitleView";
import { PageStateBaseClass } from "./Base/PageStateClass";

const context = {
    subtitle : {
        Japanese: "ゲームモードの指定",
        English: "Select the target gamemode."
    }
}

export class S_GameModeSelector
    extends PageStateBaseClass<IGameSystemInfoWithoutCollections,IAppUsedToReadAndChangeOnlyPageState>{
        async init(){
            this.generateLoadingSpinner("star");
            const result = (await this.app.accessToAPI("list_gameModes", {gameSystemEnv:{gameSystemID:this.requiredObj.id}})).result;
            this.deleteLoadingSpinner();
            const title = new PageTitleView(
                appendElement(this.articleDOM,"div"),
                choiceString(context.subtitle,this.app.state.language),
                choiceString(this.requiredObj,this.app.state.language),
                "c-icooon u-background--ds"
            );
        
            new GameModeCardsGroup(this.articleDOM.appendChild(document.createElement("div")),this.requiredObj,result,{
                language:this.app.state.language,isUserManager:this.app.loginAdministratorReadOnly.userInformation_uneditable?.isCommitteeMember,
                clickEventListener: (selected) => this.app.transition("mainMenu",selected)
            })
        
        }
}