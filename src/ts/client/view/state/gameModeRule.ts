import { choiceString } from "../../../utility/aboutLang";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { appendElement } from "../../utility/aboutElement";
import { PageTitleView } from "../parts/PageTitleView";
import { GameModeRuleView } from "../parts/GameModeRuleView";
import {PageStateBaseClass} from "./Base/PageStateClass"
const context = {
    title:{
        Japanese:   "ルール",
        English:    "Rule"
    },
    context:{
    }
}
export class S_GameModeRule extends PageStateBaseClass<{gameSystemID:string,gameModeID:string},IAppUsedToReadAndChangeOnlyPageState>{
    async init(){
        const pagetitle = new PageTitleView(
            appendElement(this.articleDOM,"div"),
            choiceString(context.title,this.app.state.language),"",
            "c-icooon u-background--contract"
        )
        if (this.requiredObj.gameSystemID  === undefined) throw new Error("this.requiredObj.gameMode.rules === undefined")
        const rules = (await this.app.accessToAPI("gameRule_get", { 
            gameSystemEnv:this.requiredObj,
            language: this.app.state.language 
        })).result
        if (rules === undefined) throw new Error("rules === undefined")
        for (const rule of rules) {
            const view = new GameModeRuleView(appendElement(this.articleDOM,"div"))
            view.setHeader(rule.rule)
            view.setRule(rule)
            view.setNote(rule.rule)
        }
    }
}
