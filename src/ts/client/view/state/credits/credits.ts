import { choiceString } from "../../../../utility/aboutLang";
import { IAppUsedToRead } from "../../../interface/AppInterfaces";
import { appendElement } from "../../../utility/aboutElement";
import { TitleCupsuled } from "../../parts/TitleCupsuled";
import { PageStateBaseClass } from "../PageStateClass";
import context from "./language.json";
export class S_Credits
    extends PageStateBaseClass<null,IAppUsedToRead>{
    init(){
        const lang = this.app.state.language;
        const header = new TitleCupsuled(appendElement(this.articleDOM,"div"))
        header.refresh(choiceString(context.header,lang),"",{
            underline:true,
            chara:"u-biggerChara",
            hr:"u-bold"
        })
        const creditsSegments = appendElement(this.articleDOM,"div");

        return;
    }        
}