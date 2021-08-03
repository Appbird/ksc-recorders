import { IAbilityItem } from "../../../../type/list/IAbilityItem";
import { IGameDifficultyItem } from "../../../../type/list/IGameDifficultyItem";
import { ITargetItem } from "../../../../type/list/ITargetItem";
import { choiceString } from "../../../../utility/aboutLang";
import { converseMiliSecondsIntoTime, convertScoreIntoNumber, convertTimeIntoNumber } from "../../../../utility/timeUtility";
import { element, HTMLConverter } from "../../../../utility/ViewUtility";
import { IAppUsedToReadAndChangeOnlyPageState } from "../../../interface/AppInterfaces";
import { createElementWithIdAndClass, createElementWithIdTagClass, findElementByClassNameWithErrorPossibility, generateIcooonHTML } from "../../../utility/aboutElement";
import { IView } from "../../IView";
import { MovieWidgetCreator } from "../MovieWidgetCreator";
import { SelectChoicesCapsuled } from "../Input/SelectChoicesCapsuled";
import { TextInputCapsuled } from "../TextInputCapsuled";
import SimpleMDE from "simplemde";
import { TextChoicesCapsuled } from "../Input/TextChoicesCapsuled";
import { ISentRecordOffer } from "../../../../type/api/record/changing/IReceivedDataAtServer_recordWrite";
import { IRecord } from "../../../../type/record/IRecord";
import context from "./language.json"
export class OfferFormView implements IView {
    private container: HTMLElement;
    private app: IAppUsedToReadAndChangeOnlyPageState;

    private evidenceMovieElement: HTMLDivElement;
    private evidenceMovie: MovieWidgetCreator;

    private URLInput: TextInputCapsuled;
    private scoreInput: TextInputCapsuled;

    private htmlConverter: HTMLConverter;

    private difficultyChoices: SelectChoicesCapsuled<IGameDifficultyItem>;
    private abilityChoices: SelectChoicesCapsuled<IAbilityItem>;
    private targetChoices: SelectChoicesCapsuled<ITargetItem>;
    
    private tagInput:TextChoicesCapsuled;

    private simpleMDE:SimpleMDE;
    private errorDisplay:HTMLElement;
    private onDecideEventListener:(input:ISentRecordOffer)=>void;
    private button:HTMLElement;
    destroy(){
        this.tagInput.destroy();
        this.difficultyChoices.destroy();
        this.abilityChoices.destroy();
        this.targetChoices.destroy();
        this.container.innerHTML = "";
    }
    //#CH  appへの依存を解消する。具体的にappを利用する処理を全てPage側で定義させ、それをコールバックでこちらに渡す。
    constructor(container:HTMLElement,app: IAppUsedToReadAndChangeOnlyPageState, difficulties: IGameDifficultyItem[], abilities: IAbilityItem[],{
        onDecideEventListener,
        defaultRecord
    }:{
        onDecideEventListener:(input:ISentRecordOffer)=>void,
        defaultRecord?:IRecord
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
                                        <li>${context.RunnersNote.Notice[0]}</li>
                                        <li>${context.RunnersNote.Notice[1]}</li>
                                    </ul>
                                </div>
                                `
                        ).appendChild(createElementWithIdTagClass({className:"offerForm__runnerNote"},"textarea")),
            autosave:{
                enabled:true, uniqueId:"offerForm__runnerNote"
            },
            spellChecker:false,
        });
        
        this.errorDisplay = this.container.appendChild(element`<div class="u-width90per u-margin2em u-redChara"></div>`).appendChild(document.createElement("h3"))
        this.button = this.container.appendChild(this.htmlConverter.elementWithoutEscaping`<div class="u-width50per u-margin2em"><div class="c-button">${context.DecideButton}</div></div>`) as HTMLElement
        this.button.addEventListener("click",() => this.whenDecide())

            
        this.container.appendChild(createElementWithIdAndClass({className:"u-space3em"}))
        
        this.setTargetChoices().then( () => {
            if (defaultRecord !== undefined) this.loadDefaultRecord(defaultRecord);
        })
        
    }
    private loadDefaultRecord(record:IRecord){
        const rr = record.regulation;
        const rrg = rr.gameSystemEnvironment;
        this.URLInput.value = record.link[0];
        this.scoreInput.value = (this.app.state.scoreType === "time") ? converseMiliSecondsIntoTime(record.score):record.score.toString();
        this.difficultyChoices.setSelected(rrg.gameDifficultyID)
        this.abilityChoices.setSelected(rr.abilityIDs)
        this.targetChoices.setSelected(rr.targetID)
        this.tagInput.valueAsArray = record.tagName,
        this.simpleMDE.value(record.note)
    }
    private async whenDecide(){
        if (this.button.classList.contains("u-unused")) return;
        this.button.classList.add("u-unused")
        try {       
            this.evidenceMovie.set(this.URLInput.value);
            this.modifyScoreInput();
        }catch(err){
            this.errorDisplay.textContent = choiceString(context.ErrorText.invalid,this.app.state.language)
            this.button.classList.remove("u-unused")
            return;
        }
        const abilityIDs = this.abilityChoices.getValueAsArray();
        const targetID = this.targetChoices.getValueAsValue()
        const difficultyID = this.difficultyChoices.getValueAsValue();
        if (difficultyID === undefined || targetID === undefined || abilityIDs.length === 0 ){
                this.errorDisplay.textContent = choiceString(context.ErrorText.lack,this.app.state.language)
                this.button.classList.remove("u-unused")
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
                const errorBaseMsg = choiceString(context.ScoreInput.Error, this.app.state.language);
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
                const errorBaseMsg = choiceString(context.URLInput.Error, this.app.state.language);
                if (!(error instanceof Error)) {
                    this.URLInput.setError(errorBaseMsg); return;
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
            //#CTODO 英語訳の追加
            createElementWithIdAndClass({ className: "offerForm__textInput" })).appendChild(this.htmlConverter.elementWithoutEscaping`
            <div class="offerForm__textInput">
                <div class="c-title offerForm__textInput__link">
                </div>
                <ul class="u-margin05em offerForm__textInput__linkDescription">
                    <li>${context.URLInput.Notice[0]}</li>
                    <li>${context.URLInput.Notice[1]}</li>
                    <li>${context.URLInput.Notice[2]}</li>
                </ul>
            <h1>${generateIcooonHTML({icooonName:"time"})}${context.ScoreInput.Header}</h1>
                <div class="c-title offerForm__textInput__score">
                </div>
                <ul class="u-margin05em offerForm__textInput__scoreDescription">
                    <li>${context.ScoreInput.Notice[0]}</li>
                    <li><strong>${context.ScoreInput.Notice[1]}</strong></li>
                    <li>${context.ScoreInput.Notice[2]}</li>
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
            <h1>${generateIcooonHTML({icooonName:"difficulty"})}${context.DifficultyChoices.Header}</h1>
            <div class="offerForm__difficultySelector__Choices">
            </div>
            <ul class="u-margin05em">
                <li>${context.DifficultyChoices.Notice[0]}</li>
            </ul>
        </div>`);
        return new SelectChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(difficultySelector, "offerForm__difficultySelector__Choices").appendChild(document.createElement("select")),
            difficulties, { language: this.app.state.language,needMultipleSelect:false });
    }

    private createTargetChoices(targets: ITargetItem[]) {
        const targetSelector = this.container.appendChild(this.htmlConverter.elementWithoutEscaping`
        <div class="offerForm__targetSelector">
            <h1>${generateIcooonHTML({icooonName:"flag"})}${context.TargetChoices.Header}</h1>
            <div class="offerForm__targetSelector__Choices">
            </div>
            <ul class="u-margin05em">
                <li>${context.TargetChoices.Notice[0]}</li>
            </ul>
        </div>`);
        return new SelectChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(targetSelector, "offerForm__targetSelector__Choices").appendChild(document.createElement("select")),
            targets, { language: this.app.state.language, needMultipleSelect: false, });
    }

    private createAbilityChoices(abilities: IAbilityItem[]) {
        const maxNumberOfPlayer = this.app.state.gameSystemEnvDisplayed.gameMode?.maxNumberOfPlayer
        const abilitySelector = this.container.appendChild(this.htmlConverter.elementWithoutEscaping`
        <div class="offerForm__abilitySelector">
            <h1>${generateIcooonHTML({icooonName:"star"})}${context.AbilityChoices.Header}</h1>
            <div class="offerForm__abilitySelector__Choices">
            </div>
            <ul class="u-margin05em">
                    <li>${context.AbilityChoices.Notice[0]}</li>
                    <li>${context.AbilityChoices.Notice[1]}</li>
                    <li>${{ Japanese: `このゲームモードは${maxNumberOfPlayer}人プレイまで対応しています。` }}</li>
            </ul>
        </div>`);
        return new SelectChoicesCapsuled(
            findElementByClassNameWithErrorPossibility(abilitySelector, "offerForm__abilitySelector__Choices").appendChild(document.createElement("select")),
            abilities, { language: this.app.state.language, 
                maxItemCount:this.app.state.gameSystemEnvDisplayed.gameMode?.maxNumberOfPlayer,
                needMultipleSelect: true, needDuplicatedSelect: true ,
                maxItemText:
                    {
                        JDescription:`このゲームモードは最大${maxNumberOfPlayer}人プレイまで対応しています。`,
                        EDescription:`This mode can be played with ${maxNumberOfPlayer} kirbys (friends) at most.`
                    }
            });
    }

    private createTagInputChoices() {
        const tagSegment = this.container.appendChild(this.htmlConverter.elementWithoutEscaping`
        <div class="offerForm__tagInput">
        <h1>${generateIcooonHTML({icooonName:"tag"})}${context.TagInput.Header}</h1>
            <div class="offerForm__tagInput__Choices">
            </div>
            <ul class="u-margin05em">
                    <li>${context.TagInput.Notice[0]}</li>
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

