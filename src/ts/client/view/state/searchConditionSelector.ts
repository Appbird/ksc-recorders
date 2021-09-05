import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { ILabelledDocument } from "../../../type/list/ILabelledDocument";
import { choiceString } from "../../../utility/aboutLang";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { SearchConditionSelectorView } from "../parts/Input/searchConditionSelector";
import { PageTitleView } from "../parts/PageTitleView";
import { PageStateBaseClass } from "./Base/PageStateClass";

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
        const language = this.app.state.language
        const gameSystemID = this.app.state.gameSystemIDDisplayed
        const gameModeID = this.app.state.gameModeIDDisplayed
        const gameModeInfo = this.app.state.gameSystemEnvDisplayed.gameMode
        if (gameModeInfo === null) throw new Error("[S_SearchConditionSelector:init] gameModeInfo === undefined")

        const difficulties = (await this.app.accessToAPI("list_difficulties",{
            gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
        })).result
        const abilities = (await this.app.accessToAPI("list_abilities",{
            gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
        })).result
        const hashTags = (await this.app.accessToAPI("list_hashTags_onlyApproved",{
            gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed}
        })).result
        const abilityAttribute = (await this.app.accessToAPI("list_abilityAttributes",{
            gameSystemEnv:{gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed}
        })).result
        const setsOfFlagsOfAbilityAttributeItem = await Promise.all(
            abilityAttribute.map(async attribute => {return {
                attributeNameInfo: attribute,
                flagsInAttribute: (await this.app.accessToAPI("list_abilityAttributeFlags",{
                    gameSystemEnv : {gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed},
                    abilityAttributeID:attribute.id
                })).result
            } } )
        )
        for (const unit of setsOfFlagsOfAbilityAttributeItem) unit.flagsInAttribute.sort(sort(this.app.state.language))
        new SearchConditionSelectorView(this.articleDOM.appendChild(document.createElement("div")),{
            difficulties,abilities,hashTags,gameSystemID,gameModeID,setsOfFlagsOfAbilityAttributeItem,
            superiorScore:(gameModeInfo.scoreType === "time") ? "LowerFirst":"HigherFirst",language:this.app.state.language,maxPlayerNumber:gameModeInfo.maxNumberOfPlayer,
            onDecideEventListener:(input) => this.app.transition("searchResultView",{condition:input}),
            fetchTargetItems: (segmentIDs) => this.app.accessToAPI("list_targets",{
                gameSystemEnv:{
                    gameSystemID,gameModeID
                },
                id:segmentIDs
            }).then((result) => result.result)
        })
        this.deleteLoadingSpinner();
    }
}

function sort(language:LanguageInApplication){
    return (a:ILabelledDocument,b:ILabelledDocument) => {
        const A = choiceString(a,language)
        const B = choiceString(b,language)
        if (A > B) return 1
        if (A < B) return -1
        return 0
     }

}
    