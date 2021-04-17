import { IAbilityItem } from "../../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../../type/list/IGameDifficultyItem";
import { ITargetItem } from "../../../type/list/ITargetItem";
import { element, HTMLConverter } from "../../../utility/ViewUtility";
import { TargetGameMode } from "../../administers/StateAdminister";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass } from "../../utility/aboutElement";
import { IView } from "../IView";
import { MovieWidgetCreator } from "../parts/MovieWidgetCreator";
import { SelectChoicesCapsuled } from "../parts/SelectChoicesCapsuled";
import { PageStateBaseClass } from "./PageStateClass";

export class S_OfferForm
    extends PageStateBaseClass<TargetGameMode,IAppUsedToReadAndChangeOnlyPageState>{
        init(){
        }
}
export class OfferFormView implements IView{
    private element:HTMLDivElement = createElementWithIdAndClass({className:"offerForm u-width95per u-marginUpDown2emToChildren"})
    private app:IAppUsedToReadAndChangeOnlyPageState;
    private targetGameMode:TargetGameMode;

    private evidenceMovieElement:HTMLDivElement;
    private evidenceMovie:MovieWidgetCreator;

    private URLInput:TextInputCapsuled;
    private scoreInput:TextInputCapsuled;

    private htmlConverter:HTMLConverter;

    private difficultyChoices:SelectChoicesCapsuled<IGameDifficultyItem>;
    private abilityChoices:SelectChoicesCapsuled<IAbilityItem>;
    private targetChoices:SelectChoicesCapsuled<ITargetItem>
    constructor(app:IAppUsedToReadAndChangeOnlyPageState,gameMode:TargetGameMode,difficulties:IGameDifficultyItem[],ability:IAbilityItem[]){
        this.app = app
        this.targetGameMode = gameMode;
        
        this.htmlConverter = new HTMLConverter(this.app.state.language);
        
        this.evidenceMovieElement = this.element.appendChild(createElementWithIdAndClass({className:"c-evidenceMovie"}))
        this.evidenceMovie = new MovieWidgetCreator();

        const offerForm__textInputElement = this.element.appendChild(
            //#TODO 英語訳の追加
            createElementWithIdAndClass({className:"offerForm__textInput"})).appendChild(this.htmlConverter.element`
            <div class="offerForm__textInput">
                <div class="c-title">
                    <i class="fas fa-link" ></i>
                </div>
                <ul class="u-margin05em">
                    <li>${{Japanese:"登録する記録の証拠となる動画へのリンクを貼ります。",English:"English Description"}}</li>
                    <li>${{Japanese:"TwitterかYoutubeのいずれかのリンクのみを受け付けます。",English:"English Description"}}</li>
                    <li>${{Japanese:"Youtubeへのリンクの場合、動画の開始秒数を指定することが出来ます。"}}</li>
                </ul>
                <div class="c-title">
                </div>
                <ul class="u-margin05em">
                    <li><strong>${{Japanese:"01:00:00 / 02:12.32-03:12.32 / 60.00といった形式でも入力が出来ます。"}}</strong></li>
                    <li>${{Japanese:"この場合、全て01:00.00に統一されます。"}}</li>
                </ul>
            </div>`
        )
        const found_result = offerForm__textInputElement.getElementsByClassName("c-title")
        if (found_result.length < 2) throw new Error("unexpected Error.")
        this.URLInput = new TextInputCapsuled(found_result[0],"link to the movie","u-smallerChara")
        this.scoreInput = new TextInputCapsuled(found_result[1],"00:00.00","u-biggerChara")
        
        const difficultySelector = this.element.appendChild(this.htmlConverter.element`
        <div class="offerForm__difficultySelector">
            <div class="offerForm__difficultySelector__Choices">
            </div>
            <ul class="u-margin05em">
                <li>${{Japanese:"取得した記録がどの難易度で取られたかを入力します。"}}</li>
            </ul>
        </div>`);
        this.difficultyChoices = new SelectChoicesCapsuled(
                findElementByClassName(difficultySelector,"offerForm__difficultySelector__Choices").appendChild(document.createElement("select"))
                ,difficulties,{language:this.app.state.language})
        
        //#TODO 続きを実装する。
        //*> ability, targetについてもChoicesを適切に挿入し、フィールドにSelectChoicesCapsuled型データを代入する。
        //*> difficultySelectorについてhideDropdownイベント時にtargetに選択肢が登場するように(SearchConditionSelector画面が参考になるかもしれない)
        //*> this.URLInputにおいてchangeイベント時にthis.evidenceMovieを発火させる。
            //*>このとき、適切でないURLが入力されたときのためにここにもtry-catchを設置しておく。
            //*>そうしておかないと、不適切な入力がされるたびにエラーページに飛ぶので…
        //*> this.scoreInputに対して、適切なplaceholderの設定。データベースの構造を弄る必要がある。
        //*> this.scoreInputのchangeイベント時に、正規表現を用いて正しい入力が為されているかのチェック。
            //*> 基本形であれば修正の必要なし。
            //*> 基本形でなければ修正を行う。
            //*> 修正が出来なければエラーを投げる。
            //*> ゆえにここでもtry-catchを設置しておく。
        //*> ボタンを設置。デザインはSearchConditionSelector画面と同じもので良い。
        //*> ボタンのclickイベント時に、sendRecordOffer画面へ移行。この移行先でAPI record/writeの実行を行う。
        //*> なお、ユーザー名の取得について、record/writeの実装の前にログイン機能を実装する必要がある。
        //*> そうしなければRunnerIDが埋らない。
        //*> こういったチェックはサーバー側でも行う。ページを介さず直接送られてきたリクエストに対処するため。
    }
    get htmlElement(){
        return this.element
    }
    
}
function findElementByClassName(findPlace:Element,className:string){
    const place = findPlace.getElementsByClassName(className)
    if (place[0] === undefined)throw new Error(`要素${className}が見つかりませんでした。`)
    return place[0]
}
export class TextInputCapsuled {
    private element:HTMLInputElement;
    constructor(insertedElement:Element,placeHolder:string,chara?:"u-biggerChara"|"u-smallerChara") {
        this.element = document.createElement("input");
        this.element.setAttribute("type","text");
        this.element.classList.add("c-textInput","u-underline");
        this.element.placeholder = placeHolder;
        if (chara !== undefined) this.element.classList.add(chara);
        insertedElement.appendChild(insertedElement)

    }
    addEventListener(eventType:"change",callback:() => void){
        this.element.addEventListener(eventType,callback)
    }
    get value(){
        return this.element.value;
    }
    set value(value:string){
        this.element.value = value;
    }
}