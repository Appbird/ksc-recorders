import { choiceString } from "../../../utility/aboutLang";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { PageTitleView } from "../parts/PageTitleView";
import { GameModeRuleView } from "../parts/GameModeRuleView";
import {PageStateBaseClass} from "./Base/PageStateClass"
import { RuleIndexPart } from "../parts/RuleIndexPart";
export const contents = {
    title:{
        Japanese:   "ルール",
        English:    "Rule"
    }
}
export class S_GameModeRule extends PageStateBaseClass<{gameSystemID:string,gameModeID:string},IAppUsedToReadAndChangeOnlyPageState>{
    async init(){
        const pagetitle = new PageTitleView(
            appendElement(this.articleDOM,"div"),
            choiceString(contents.title,this.app.state.language),"",
            "c-icooon u-background--contract"
        )
        if (this.requiredObj.gameSystemID  === undefined) throw new Error("this.requiredObj.gameMode.rules === undefined")
        const rules = (await this.app.accessToAPI("gameRule_get", { 
            gameSystemEnv:this.requiredObj,
            language: this.app.state.language 
        })).result
        if (rules === undefined) throw new Error("rules === undefined")

        new RuleIndexPart(appendElement(this.articleDOM,"div","u-marginUpDown2em"),{rules,language:this.app.state.language})

        const ruleSegment = appendElement(this.articleDOM,"div","u-width90per")
        for (const ruleObj of rules) {
            const view = new GameModeRuleView(appendElement(ruleSegment,"div"))
            view.setHeader(ruleObj.rule)
            view.setRule(ruleObj)
            view.setNote(ruleObj.rule)
        }
    }
}



