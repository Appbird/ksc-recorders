import { IAbilityItem } from "../../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../../type/list/IGameDifficultyItem";
import { ITargetItem } from "../../../type/list/ITargetItem";
import { choiceDescription } from "../../../utility/aboutLang";
import { converseMiliSecondsIntoTime, convertScoreIntoNumber, convertTimeIntoNumber } from "../../../utility/timeUtility";
import { element, HTMLConverter } from "../../../utility/ViewUtility";
import { TargetGameMode } from "../../administers/StateAdminister";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../interface/AppInterfaces";
import { createElementWithIdAndClass, createElementWithIdTagClass, findElementByClassNameWithErrorPossibility } from "../../utility/aboutElement";
import { IView } from "../IView";
import { MovieWidgetCreator } from "./MovieWidgetCreator";
import { SelectChoicesCapsuled } from "./SelectChoicesCapsuled";
import { TextInputCapsuled } from "./TextInputCapsuled";
import SimpleMDE from "simplemde";
import { IItemOfResolveTableToName } from "../../../type/list/IItemOfResolveTableToName";

export class TextChoicesCapsuled{
    private html
}  

export class OfferFormView implements IView {
    private element: HTMLDivElement = createElementWithIdAndClass({ className: "offerForm u-width95per u-marginUpDown2emToChildren" });
    private app: IAppUsedToReadAndChangeOnlyPageState;
    private targetGameMode: TargetGameMode;

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

    private runnerID:string;

    private simpleMDE:SimpleMDE;
    private errorDisplay:HTMLElement;
    constructor(app: IAppUsedToReadAndChangeOnlyPageState, gameMode: TargetGameMode, difficulties: IGameDifficultyItem[], abilities: IAbilityItem[],runnerID:string) {
        this.app = app;
        this.targetGameMode = gameMode;

        this.htmlConverter = new HTMLConverter(this.app.state.language);

        this.evidenceMovieElement = this.element.appendChild(createElementWithIdAndClass({ className: "c-evidenceMovie" }));
        this.evidenceMovie = new MovieWidgetCreator();

        const textInputs = this.createTextInput();
        //#TODO エラーを表す要素をフィールドに作る。
        this.URLInput = textInputs.link;
        this.scoreInput = textInputs.score;

        this.difficultyChoices = this.createDifficultyChoices(difficulties);
        this.targetChoices = this.createTargetChoices([]);
        this.abilityChoices = this.createAbilityChoices(abilities);


        this.runnerID = runnerID;

        this.setTargetDropdownEventListener();
        this.setURLInputChangeEventListener();
        this.setScoreInputChangeEventListener();

        this.simpleMDE = new SimpleMDE({
            element:this.element.appendChild(createElementWithIdAndClass({className:"offerForm__runnerNote"})),
            autosave:{
                enabled:true,uniqueId:"offerForm__runnerNote"
            }
    });
        
        //#CTODO 続きを実装する。
        this.errorDisplay = this.element.appendChild(element`<div class="u-width90per u-margin2em u-redChara"></div>`).appendChild(document.createElement("h3"))
        this.element.appendChild(this.htmlConverter.element`<div class="u-width50per u-margin2em"><div class="c-button">決定</div></div>`)
        .addEventListener("click",() => this.whenDecide())
    }
    private whenDecide(){
        const abilityIDs = this.abilityChoices.getValueAsArray();
        const targetID = this.targetChoices.getValueAsValue()
        const difficultyID = this.difficultyChoices.getValueAsValue();
        if (!(this.isTextInputRight && difficultyID === undefined && targetID === undefined && abilityIDs.length === 0 )){
                this.errorDisplay.textContent = "入力されていない箇所が存在します。"
            }
        this.app.transition("sendRecordOffer",{
            score:(() => {
                const score = this.scoreInput.value;
                switch (this.app.state.scoreType) {
                    case "score": return convertScoreIntoNumber(score);
                    case "time": return convertTimeIntoNumber(score);
                }
            })(),
            runnerID:this.runnerID,
            tagID:[],
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
        }
        )
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
                    this.URLInput.setError(errorBaseMsg); return;
                }
                this.URLInput.setError(errorBaseMsg);
            }
        });
    }
    private setURLInputChangeEventListener() {
        this.URLInput.addEventListener("change", () => {
            try {
                this.evidenceMovie.set(this.URLInput.value);
                this.evidenceMovieElement.innerHTML = "";
                this.evidenceMovie.setWidget(this.evidenceMovieElement);
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
        this.difficultyChoices.addEventListener("hideDropdown", () => {
            this.targetChoices.enable();
            if (this.difficultyChoices.getValue(true) === undefined) { this.targetChoices.disable(); return; }
            this.setTargetChoices();
        });
    }
    private async setTargetChoices() {
        const difficultySelectedID = this.targetChoices.getValueAsValue(true);
        this.targetChoices.clearChoices();
        this.targetChoices.clearStore();
        try {
            const selectedTargetItem = this.difficultyChoices.data.find((ele) => ele.id === difficultySelectedID);
            if (selectedTargetItem === undefined)
                throw new Error(`# エラーの内容\n\nID${selectedTargetItem}に対応した難易度が存在しません。`);

            const result = await this.app.accessToAPI("list_targets", {
                gameSystemEnv: { gameSystemID: this.app.state.gameSystemIDDisplayed, gameModeID: this.app.state.gameModeIDDisplayed }, id: selectedTargetItem.TargetIDsIncludedInTheDifficulty
            });

            this.targetChoices.setChoices(result.result);

        } catch (error) {
            console.error(error);
            if (!(error instanceof Error))
                return [];
            this.app.transition("errorView", { title: "難易度に対応する計測対象の取得に失敗しました。", message: `${error.message}` });
        }
    }
    private createTextInput(): { link: TextInputCapsuled; score: TextInputCapsuled; } {
        const offerForm__textInputElement = this.element.appendChild(
            //#TODO 英語訳の追加
            createElementWithIdAndClass({ className: "offerForm__textInput" })).appendChild(this.htmlConverter.element`
            <div class="offerForm__textInput">
                <div class="c-title">
                    <i class="fas fa-link" ></i>
                </div>
                <ul class="u-margin05em">
                    <li>${{ Japanese: "登録する記録の証拠となる動画へのリンクを貼ります。", English: "English Description" }}</li>
                    <li>${{ Japanese: "TwitterかYoutubeのいずれかのリンクのみを受け付けます。", English: "English Description" }}</li>
                    <li>${{ Japanese: "Youtubeへのリンクの場合、動画の開始秒数を指定することが出来ます。" }}</li>
                </ul>
                <div class="c-title">
                </div>
                <ul class="u-margin05em">
                    <li><strong>${{ Japanese: "01:00:00 / 02:12.32-03:12.32 / 60.00といった形式でも入力が出来ます。" }}</strong></li>
                    <li>${{ Japanese: "この場合、全て01:00.00に統一されます。" }}</li>
                </ul>
            </div>`
            );
        const found_result__textInput = offerForm__textInputElement.getElementsByClassName("c-title");
        const found_result__error = offerForm__textInputElement.getElementsByClassName("u-margin05em");
        if (found_result__textInput.length < 2 || found_result__error.length < 2)
            throw new Error("unexpected Error.");

        const link_errorInput = createElementWithIdTagClass({ className: "u-redChara" }, "li");
        found_result__error[0].prepend(link_errorInput);
        const score_errorInput = createElementWithIdTagClass({ className: "u-redChara" }, "li");
        found_result__error[1].prepend(score_errorInput);
        return {
            link: new TextInputCapsuled(found_result__textInput[0], "link to the movie", link_errorInput, "u-smallerChara"),
            score: new TextInputCapsuled(found_result__textInput[1],
                (() => {
                    switch (this.app.state.scoreType) {
                        case "score": return "0";
                        case "time": return "00:00.00";
                    }
                })(), score_errorInput, "u-biggerChara")
        };
    }
    private createDifficultyChoices(difficulties: IGameDifficultyItem[]) {
        const difficultySelector = this.element.appendChild(this.htmlConverter.element`
        <div class="offerForm__difficultySelector">
            <div class="offerForm__difficultySelector__Choices">
            </div>
            <ul class="u-margin05em">
                <li>${{ Japanese: "取得した記録がどの難易度で取られたかを入力します。" }}</li>
            </ul>
        </div>`);
        return new SelectChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(difficultySelector, "offerForm__difficultySelector__Choices").appendChild(document.createElement("select")),
            difficulties, { language: this.app.state.language });
    }
    private createTargetChoices(targets: ITargetItem[]) {
        const targetSelector = this.element.appendChild(this.htmlConverter.element`
        <div class="offerForm__targetSelector">
            <div class="offerForm__targetSelector__Choices">
            </div>
            <ul class="u-margin05em">
                <li>${{ Japanese: "どの敵を倒したか / どのステージをクリアしたかを入力します。" }}</li>
            </ul>
        </div>`);
        return new SelectChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(targetSelector, "offerForm__targetSelector__Choices").appendChild(document.createElement("select")),
            targets, { language: this.app.state.language, needMultipleSelect: true });
    }
    private createAbilityChoices(abilities: IAbilityItem[]) {
        const abilitySelector = this.element.appendChild(this.htmlConverter.element`
        <div class="offerForm__abilitySelector">
            <div class="offerForm__abilitySelector__Choices">
            </div>
            <ul class="u-margin05em">
                    <li>${{ Japanese: "この記録を取った時のカービィのコピー能力を選びます。" }}</li>
                    <li>${{ Japanese: "<strong>順序が考慮される</strong>ので注意してください。" }}</li>
            </ul>
        </div>`);
        return new SelectChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(abilitySelector, "offerForm__abilitySelector__Choices").appendChild(document.createElement("select")),
            abilities, { language: this.app.state.language, needMultipleSelect: true, needDuplicatedSelect: true });
    }

    get htmlElement() {
        return this.element;
    }

}

