import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { element } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass, appendElement } from "../../utility/aboutElement";
import { RadioButtonCupsuled } from "../parts/Input/RadioButtonCupsuled";
import { PageTitleView } from "../parts/PageTitleView";
import { TitleCupsuled } from "../parts/TitleCupsuled";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SetLanguage
    extends PageStateBaseClass<null,IAppUsedToReadAndChangePage>{
    async init(){
        new PageTitleView(this.articleDOM,"Language","言語","fas fa-star")
        const article = this.articleDOM.appendChild(createElementWithIdAndClass({className:"u-width90per"}))
        
        const selectLanguageSegment = appendElement(article,"div")
        const selectLanguageSegment_title = new TitleCupsuled(selectLanguageSegment)
        selectLanguageSegment_title.refresh("Select Your Language.", "言語を選択してください。")
        selectLanguageSegment.appendChild(element`<div class="u-space3em"></div>`)
        const languageSelector = new RadioButtonCupsuled<LanguageInApplication>(appendElement(selectLanguageSegment,"div"),"languageSelector",this.app.state.language,
        [
            {optionLabel:"日本語",value:"Japanese"},
            {optionLabel:"English",value:"English"}
        ]);
        languageSelector.value = this.app.state.language
        article.appendChild(element`<div class="u-space3em"></div>`)
        languageSelector.onChangeEventListener((selected) => {
            this.app.setLanguage(selected)
        })
    }
}