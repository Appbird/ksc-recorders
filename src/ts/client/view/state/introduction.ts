import { LanguageInApplication } from "../../../type/LanguageInApplication";
import { element } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { appendElement, createElementWithIdAndClass } from "../../utility/aboutElement";
import { RadioButtonCupsuled } from "../parts/Input/RadioButtonCupsuled";
import { MenuView } from "../parts/MenuView";
import { PageTitleView } from "../parts/PageTitleView";
import { TitleCupsuled } from "../parts/TitleCupsuled";
import { PageStateBaseClass } from "./PageStateClass";

export class S_introduction
    extends PageStateBaseClass<null,IAppUsedToReadAndChangePage>{
    async init():Promise<void> {
        new PageTitleView(this.articleDOM,"Introduction","イントロダクション","fas fa-star")
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
        languageSelector.value = window.navigator.language === "ja" ? "Japanese" : "English"
        
        article.appendChild(element`<div class="u-space3em"></div>`)
        const termOfUseSegment = appendElement(article,"div")
        this.generateTermOfUseSegment(termOfUseSegment)
        
        languageSelector.onChangeEventListener((selected) => {
            this.app.setLanguage(selected)
            termOfUseSegment.innerHTML = ""
            this.generateTermOfUseSegment(termOfUseSegment)
        })
    }
    async generateTermOfUseSegment(termOfUseSegment:HTMLElement){
        
        const mainMenu = new MenuView(appendElement(termOfUseSegment,"div"),this.app.state.language,null)
        
        mainMenu.generateMenuItem({
            title:{
                Japanese:"利用規約",
                English:"Term of Use",
                icon:"contract"
            },
            description:{
                Japanese:"次に進むためにはここをクリックしてください。",
                English:"Click here to go to the next page."
            },
            isDisabled:false,
            biggerTitle:false,
            //#TODO ここをクレジット用に設定する。GitHubのリンクにするのもアリか？
            to:() => {this.app.transition("termOfUse",{needsConsensus:true})}
        })
    }
}