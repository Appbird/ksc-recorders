import { choiceString } from "../../../utility/aboutLang";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { GameSystemCardGroup } from "../parts/gameSystemCardsGroup";
import { PageTitleView } from "../parts/PageTitleView";
import { PageStateBaseClass } from "./PageStateClass";


const context = {
    title:{
        Japanese: "対象とするゲームタイトルの指定",
        English: "Select the target title"
    }
}

export class S_GameSystemSelector
    extends PageStateBaseClass<null,IAppUsedToReadAndChangePage>{
        async init(){
            this.generateLoadingSpinner("ds");
            const result = (await this.app.accessToAPI("list_gameSystems", {})).result;
            this.deleteLoadingSpinner();

            const title = new PageTitleView(
                appendElement(this.articleDOM,"div"),
                choiceString(context.title,this.app.state.language),
                "",
                "c-icooon u-background--star"
            );

            new GameSystemCardGroup(this.articleDOM.appendChild(document.createElement("div")),result,{
                language:this.app.state.language,isUserManager:this.app.loginAdministratorReadOnly.userInformation_uneditable?.isCommitteeMember,
                clickEventListener: (selected) => this.app.transition("gameModeSeletor",selected),
            })
        
        }
}