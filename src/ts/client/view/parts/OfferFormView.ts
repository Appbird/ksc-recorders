import { IAbilityItem } from "../../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../../type/list/IGameDifficultyItem";
import { ITargetItem } from "../../../type/list/ITargetItem";
import { choiceDescription } from "../../../utility/aboutLang";
import { converseMiliSecondsIntoTime, convertScoreIntoNumber, convertTimeIntoNumber } from "../../../utility/timeUtility";
import { element, HTMLConverter } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass, createElementWithIdTagClass, findElementByClassNameWithErrorPossibility, generateIcooonHTML } from "../../utility/aboutElement";
import { IView } from "../IView";
import { MovieWidgetCreator } from "./MovieWidgetCreator";
import { SelectChoicesCapsuled } from "./SelectChoicesCapsuled";
import { TextInputCapsuled } from "./TextInputCapsuled";
import SimpleMDE from "simplemde";
import { TextChoicesCapsuled } from "./TextChoicesCapsuled";
import { ISentRecordOffer } from "../../../type/api/record/changing/IReceivedDataAtServer_recordWrite";

export class OfferFormView implements IView {
    private container: HTMLElement;
    private app: IAppUsedToReadAndChangeOnlyPageState;

    private evidenceMovieElement: HTMLDivElement;
    private evidenceMovie: MovieWidgetCreator;

    private URLInput: TextInputCapsuled;
    private scoreInput: TextInputCapsuled;
    private isTextInputRight: boolean = false;

    private htmlConverter: HTMLConverter;

    private difficultyChoices: SelectChoicesCapsuled<IGameDifficultyItem>;
    private abilityChoices: SelectChoicesCapsuled<IAbilityItem>;
    private targetChoices: SelectChoicesCapsuled<ITargetItem>;
    
    private tagInput:TextChoicesCapsuled;

    private simpleMDE:SimpleMDE;
    private errorDisplay:HTMLElement;
    private onDecideEventListener:(input:ISentRecordOffer)=>void;
    destroy(){
        this.tagInput.destroy();
        this.difficultyChoices.destroy();
        this.abilityChoices.destroy();
        this.targetChoices.destroy();
        this.container.innerHTML = "";
    }
    //#CH  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
    constructor(container:HTMLElement,app: IAppUsedToReadAndChangeOnlyPageState, difficulties: IGameDifficultyItem[], abilities: IAbilityItem[],{
        onDecideEventListener
    }:{
        onDecideEventListener:(input:ISentRecordOffer)=>void;
    }) {
        this.container = container;
        this.container.classList.add("offerForm","u-width95per","u-marginUpDown2emToChildren")
        this.app = app;
        this.onDecideEventListener = onDecideEventListener;
        this.htmlConverter = new HTMLConverter(this.app.state.language);

        this.container.appendChild(this.htmlConverter.elementWithoutEscaping`<h1>${generateIcooonHTML({icooonName:"link"})}${{Japanese:"リンク"}}</h1>`)
        this.evidenceMovieElement = this.container.appendChild(createElementWithIdAndClass({ className: "c-evidenceMovie" }));
        this.evidenceMovie = new MovieWidgetCreator(this.evidenceMovieElement);

        const textInputs = this.createTextInput();
        this.URLInput = textInputs.link;
        this.scoreInput = textInputs.score;

        this.difficultyChoices = this.createDifficultyChoices(difficulties);
        this.targetChoices = this.createTargetChoices([]);
        this.abilityChoices = this.createAbilityChoices(abilities);
        this.tagInput = this.createTagInputChoices();
        //#CH 追加されるタグの色を対応させる。
        
        this.setTargetDropdownEventListener();
        this.setURLInputChangeEventListener();
        this.setScoreInputChangeEventListener();
        

        this.simpleMDE = new SimpleMDE({
            element:this.container.appendChild(
                        this.htmlConverter.elementWithoutEscaping`
                                <div class="offerForm__noteInput">
                                    <h1>${generateIcooonHTML({icooonName:"notebook"})}${{Japanese:"走者ノート"}}</h1>
                                    <ul class="u-margin05em">
                                        <li>${{Japanese:"[任意] 記録を出すうえで必要となる事項を書きます。"}}</li>
                                        <li>${{Japanese:"markdownでの記述が出来ます。"}}</li>
                                        <li>${{ Japanese: "10秒に一度オートセーブを行います。" }}</li>
                                    </ul>
                                </div>
                                `).appendChild(createElementWithIdTagClass({className:"offerForm__runnerNote"},"textarea")),
            autosave:{
                enabled:true, uniqueId:"offerForm__runnerNote"
            },
            spellChecker:false
        });
        
        
        this.errorDisplay = this.container.appendChild(element`<div class="u-width90per u-margin2em u-redChara"></div>`).appendChild(document.createElement("h3"))
        this.container.appendChild(this.htmlConverter.elementWithoutEscaping`<div class="u-width50per u-margin2em"><div class="c-button">決定</div></div>`)
            .addEventListener("click",() => this.whenDecide())

            
        this.container.appendChild(createElementWithIdAndClass({className:"u-space3em"}))
    }
    private async whenDecide(){
        const abilityIDs = this.abilityChoices.getValueAsArray();
        const targetID = this.targetChoices.getValueAsValue()
        const difficultyID = this.difficultyChoices.getValueAsValue();
        if (this.isTextInputRight || difficultyID === undefined || targetID === undefined || abilityIDs.length === 0 ){
                this.errorDisplay.textContent = "[Error] 入力されていない必須項目が存在します。"
                return;
            }
        this.onDecideEventListener({
            score:(() => {
                const score = this.scoreInput.value;
                switch (this.app.state.scoreType) {
                    case "score": return convertScoreIntoNumber(score);
                    case "time": return convertTimeIntoNumber(score);
                }
            })(),
            tagName:this.tagInput.valueAsArray,
            languageOfTagName:this.app.state.language,
            link:[this.URLInput.value],
            note:this.simpleMDE.value(),
            regulation:{
                abilityIDs:abilityIDs,
                targetID:targetID,
                gameSystemEnvironment:{
                    gameSystemID:this.app.state.gameSystemIDDisplayed, gameModeID:this.app.state.gameModeIDDisplayed,
                    gameDifficultyID: difficultyID,
                }
            }
        
        })
    }
    private modifyScoreInput() {
        const score = this.scoreInput.value;
        switch (this.app.state.scoreType) {
            case "score": return this.scoreInput.value = String(convertScoreIntoNumber(score));
            case "time": return this.scoreInput.value = converseMiliSecondsIntoTime(convertTimeIntoNumber(score));
        }
    }
    private setScoreInputChangeEventListener() {
        this.scoreInput.addEventListener("change", () => {
            try {
                this.modifyScoreInput();
            } catch (error) {
                const errorBaseMsg = choiceDescription({ JDescription: "入力されたタイム/記録が不正です。", EDescription: "invalid time/score string." }, this.app.state.language);
                if (!(error instanceof Error)) {
                    this.scoreInput.setError(errorBaseMsg); return;
                }
                this.scoreInput.setError(errorBaseMsg);
            }
        });
    }
    private setURLInputChangeEventListener() {
        this.URLInput.addEventListener("change", () => {
            try {
                this.evidenceMovie.set(this.URLInput.value);
                this.evidenceMovieElement.innerHTML = "";
                this.evidenceMovie.setWidget();
                this.URLInput.setError("");
            } catch (error) {
                const errorBaseMsg = choiceDescription({ JDescription: "入力されたURLが不正です。", EDescription: "invalid link." }, this.app.state.language);
                if (!(error instanceof Error)) {
                    this.URLInput.setError(`入力されたURLが不正です。`); return;
                }
                this.URLInput.setError(errorBaseMsg);
            }
        });
    }
    private setTargetDropdownEventListener() {
        this.difficultyChoices.addEventListener("change", () => {
                this.targetChoices.enable();
                if (this.difficultyChoices.getValue(true) === undefined) { this.targetChoices.disable(); return; }
                this.setTargetChoices();
        });
    }
        private async setTargetChoices() {
            
            this.targetChoices.clearChoices();
            this.targetChoices.clearStore();
            try {
                const selectedTargetItem = this.difficultyChoices.data.find((ele) => ele.id === this.difficultyChoices.getValueAsValue(true));
                if (selectedTargetItem === undefined) throw new Error(`# エラーの内容\n\nID ${this.difficultyChoices.getValueAsValue(true)} に対応した難易度が存在しません。`);

                const result = await this.app.accessToAPI("list_targets", {
                    gameSystemEnv: { gameSystemID: this.app.state.gameSystemIDDisplayed, gameModeID: this.app.state.gameModeIDDisplayed }, id: selectedTargetItem.TargetIDsIncludedInTheDifficulty
                });
                
                this.targetChoices.setChoices(result.result);

            } catch (error) {
                console.error(error);
                if (!(error instanceof Error)) return;
                this.app.transition("errorView", { title: "難易度に対応する計測対象の取得に失敗しました。", message: `${error.message}` });
            }
        }
        //#CH ここあたりのコードを分離したいけどするべきか迷う
    private createTextInput(): { link: TextInputCapsuled; score: TextInputCapsuled; } {
        const offerForm__textInputElement = this.container.appendChild(
            //#TODO 英語訳の追加
            createElementWithIdAndClass({ className: "offerForm__textInput" })).appendChild(this.htmlConverter.elementWithoutEscaping`
            <div class="offerForm__textInput">
                <div class="c-title offerForm__textInput__link">
                </div>
                <ul class="u-margin05em offerForm__textInput__linkDescription">
                    <li>${{ Japanese: "<strong class='u-redChara'>[必須]</strong> 登録する記録の証拠となる動画へのリンクを貼ります。", English: "English Description" }}</li>
                    <li>${{ Japanese: "TwitterかYoutubeのいずれかのリンクのみを受け付けます。", English: "English Description" }}</li>
                    <li>${{ Japanese: "Youtubeへのリンクの場合、動画の開始秒数を指定することが出来ます。" }}</li>
                </ul>
            <h1>${generateIcooonHTML({icooonName:"time"})}${{Japanese:"記録"}}</h1>
                <div class="c-title offerForm__textInput__score">
                </div>
                <ul class="u-margin05em offerForm__textInput__scoreDescription">
                    <li>${{Japanese:"<strong class='u-redChara'>[必須]</strong> 計測区間で得たスコア,あるいはかかった時間を記述します。"}}</li>
                    <li><strong>${{ Japanese: "01:00:00 / 02:12.32-03:12.32 / 60.00といった形式でも入力が出来ます。" }}</strong></li>
                    <li>${{ Japanese: "この場合、全て01:00.00に統一されます。" }}</li>
                </ul>
            </div>`
            );
        const element_textInput_link = findElementByClassNameWithErrorPossibility(offerForm__textInputElement,"offerForm__textInput__link")
        const element_textInput_score = findElementByClassNameWithErrorPossibility(offerForm__textInputElement,"offerForm__textInput__score");
        const element_linkDescription = findElementByClassNameWithErrorPossibility(offerForm__textInputElement,"offerForm__textInput__linkDescription");
        const element_scoreDescription = findElementByClassNameWithErrorPossibility(offerForm__textInputElement,"offerForm__textInput__scoreDescription");
    
        const link_errorInput = element_linkDescription.appendChild(createElementWithIdTagClass({ className: "u-redChara u-bolderChara" }, "li"));
        const score_errorInput = element_scoreDescription.appendChild(createElementWithIdTagClass({ className: "u-redChara u-bolderChara" }, "li"));
        return {
            link: new TextInputCapsuled(element_textInput_link,{placeHolder:"link to the movie", errorViewer:link_errorInput, chara:"u-smallerChara"}),
            score: new TextInputCapsuled(element_textInput_score, {
                placeHolder:(() => {
                    switch (this.app.state.scoreType) {
                        case "score": return "0";
                        case "time": return "00:00.00";
                    }
                })()
                , errorViewer:score_errorInput, chara:"u-biggerChara"})
        };
    }
    
    private createDifficultyChoices(difficulties: IGameDifficultyItem[]) {
        const difficultySelector = this.container.appendChild(this.htmlConverter.elementWithoutEscaping`
        <div class="offerForm__difficultySelector">
            <h1>${generateIcooonHTML({icooonName:"difficulty"})}${{Japanese:"難易度"}}</h1>
            <div class="offerForm__difficultySelector__Choices">
            </div>
            <ul class="u-margin05em">
                <li>${{ Japanese: "<strong class='u-redChara'>[必須]</strong> 取得した記録がどの難易度で取られたかを入力します。" }}</li>
            </ul>
        </div>`);
        return new SelectChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(difficultySelector, "offerForm__difficultySelector__Choices").appendChild(document.createElement("select")),
            difficulties, { language: this.app.state.language,needMultipleSelect:false });
    }

    private createTargetChoices(targets: ITargetItem[]) {
        const targetSelector = this.container.appendChild(this.htmlConverter.elementWithoutEscaping`
        <div class="offerForm__targetSelector">
            <h1>${generateIcooonHTML({icooonName:"flag"})}${{Japanese:"計測対象"}}</h1>
            <div class="offerForm__targetSelector__Choices">
            </div>
            <ul class="u-margin05em">
                <li>${{ Japanese: "<strong class='u-redChara'>[必須]</strong> どの敵を倒したか / どのステージをクリアしたかを入力します。" }}</li>
            </ul>
        </div>`);
        return new SelectChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(targetSelector, "offerForm__targetSelector__Choices").appendChild(document.createElement("select")),
            targets, { language: this.app.state.language, needMultipleSelect: false });
    }

    private createAbilityChoices(abilities: IAbilityItem[]) {
        const maxNumberOfPlayer = this.app.state.gameSystemEnvDisplayed.gameMode?.maxNumberOfPlayer
        const abilitySelector = this.container.appendChild(this.htmlConverter.elementWithoutEscaping`
        <div class="offerForm__abilitySelector">
            <h1>${generateIcooonHTML({icooonName:"star"})}${{Japanese:"自機の能力"}}</h1>
            <div class="offerForm__abilitySelector__Choices">
            </div>
            <ul class="u-margin05em">
                    <li>${{ Japanese: "<strong class='u-redChara'>[必須]</strong> この記録を取った時のカービィのコピー能力を選びます。" }}</li>
                    <li>${{ Japanese: "<strong>順序が考慮される</strong>ので注意してください。" }}</li>
                    <li>${{ Japanese: `このゲームモードは${maxNumberOfPlayer}人プレイまで対応しています。` }}</li>
            </ul>
        </div>`);
        return new SelectChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(abilitySelector, "offerForm__abilitySelector__Choices").appendChild(document.createElement("select")),
            abilities, { language: this.app.state.language, 
                maxItemCount:this.app.state.gameSystemEnvDisplayed.gameMode?.maxNumberOfPlayer,
                needMultipleSelect: true, needDuplicatedSelect: true ,
                maxItemText:
                    {JDescription:`このゲームモードは最大${maxNumberOfPlayer}人プレイまで対応しています。`,
                    EDescription:`This mode can be played with at most ${maxNumberOfPlayer} kirbys (friends)!`}
            });
    }

    private createTagInputChoices() {
        const tagSegment = this.container.appendChild(this.htmlConverter.elementWithoutEscaping`
        <div class="offerForm__tagInput">
        <h1>${generateIcooonHTML({icooonName:"tag"})}${{Japanese:"タグ"}}</h1>
            <div class="offerForm__tagInput__Choices">
            </div>
            <ul class="u-margin05em">
                    <li>${{ Japanese: "[任意] 使ったTAにおけるテクニックの名前などをタグとして登録します。" }}</li>
                    <li>${{ Japanese: "検索がより容易になります。" }}</li>
            </ul>
        </div>`);
        return new TextChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(tagSegment,"offerForm__tagInput__Choices").appendChild(document.createElement("input"))
        )
    }

    get htmlElement() {
        return this.container;
    }

}

