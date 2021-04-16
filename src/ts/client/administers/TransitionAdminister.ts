import { element, elementWithoutEscaping } from "../../utility/ViewUtility";
import { PageStates } from "../interface/PageStates";
import { RecordGroupView } from "../view/RecordsGroupView";
import { RecordDetailView } from "../view/RecordDetailView";
import { createElementWithIdAndClass } from "../utility/aboutElement";
import { GameSystemCardGroup } from "../view/gameSystemCardsGroup";
const marked = require("marked");
import App from "../App";
import { GameModeCardsGroup } from "../view/gameModeCardsGroup";
import { StateAdministrator } from "./StateAdminister";
import { selectAppropriateName } from "../../utility/aboutLang";
import { SearchConditionSelectorView } from "../view/searchConditionSelector";
import { IGameSystemInfoWithoutCollections } from "../../type/list/IGameSystemInfo";
import { IGameModeItemWithoutCollections } from "../../type/list/IGameModeItem";


export class TransitionAdministrator {
    private app:App;
    private articleDOM: HTMLElement;
    private state:StateAdministrator;
    constructor(articleDOM: HTMLElement, app:App,state:StateAdministrator) {
        this.state = state;
        this.app = app;
        this.articleDOM = articleDOM;
    }
    private clearView() {
        this.articleDOM.innerHTML = "";
    }
    async transition<T extends keyof PageStates>(nextState: T, requestObject: PageStates[T]) {
        this.clearView();
        switch (nextState) {
            case "none": break;
            case "errorView": await this.errorView(requestObject as PageStates["errorView"]); break;
            case "detailView": await this.detail(requestObject as PageStates["detailView"]); break;
            case "searchConditionSelectorView" : await this.searchConditionSelector(requestObject as PageStates["searchConditionSelectorView"]);break;
            case "searchResultView": await this.search(requestObject as PageStates["searchResultView"]); break;
            case "gameSystemSelector": await this.gameSystemSelector(); break;
            case "gameModeSeletor": await this.gameModeSelector(requestObject as PageStates["gameModeSeletor"]); break;
            case "mainMenu": await this.mainMenu(requestObject as PageStates["mainMenu"]); break;
            default: throw new Error(`指定されたキー${nextState}に対応するページ状態が存在しません。`);
        }
        this.articleDOM.appendChild(element`<div class="u-space20vh"></div>`)

    }


    private errorView(request: PageStates["errorView"]) {
        this.articleDOM.appendChild(
            elementWithoutEscaping`
        <div class = "c-recordGroupHeader">
            <div class="c-title">
                <div class="c-title__main">${request.title}</div>
                <div class="c-title__sub">Failed to prepare the page.</div>
            </div>
            <hr noshade class="u-bold">
            <div class="u-width90per">${marked(request.message)}</div>
        </div>`
        );
        return;
    }

    
    private async search(requestConditions: PageStates["searchResultView"]) {
        const result = (await this.app.accessToAPI("record_search", requestConditions.required )).result;
        if (requestConditions.title !== undefined)
            this.articleDOM.appendChild(
                element`<div id="articleTitle">
            <div class="c-title">
                <div class="c-title__main">${requestConditions.title}</div>
            </div>
            <hr noshade class="u-bold" /></div>`);
        result.map(receivedData => this.articleDOM.appendChild(new RecordGroupView(receivedData, this.app).htmlElement));
    }


    private async detail(request: PageStates["detailView"]) {
        const detailDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "detail" }));
        const relatedRecordDiv = this.articleDOM.appendChild(createElementWithIdAndClass({ id: "related" }));
        const record = (await this.app.accessToAPI("record_detail",request)).result;

        const relatedRecord = (await this.app.accessToAPI(
                "record_search", {
                    condition: [{
                        groupName: "同レギュレーションの記録", gameSystemEnv: { gameSystemID: record.regulation.gameSystemEnvironment.gameSystemID, gameModeID: record.regulation.gameSystemEnvironment.gameModeID }, orderOfRecordArray: "LowerFirst", startOfRecordArray: 0, limitOfRecordArray: 100,
                        targetIDs: [record.regulation.targetID], abilityIDs: record.regulation.abilityIDs, abilityIDsCondition: "AllowForOrder", language: request.lang
                    }]
                    
            }        )).result[0];

        let rank: number | undefined = relatedRecord.records.findIndex(element => element.id === record.id) + 1;
        detailDiv.appendChild(new RecordDetailView(record, this.app, rank).htmlElement);
        relatedRecordDiv.appendChild(new RecordGroupView(relatedRecord, this.app).htmlElement);
    }

    private async gameSystemSelector() {
        this.app.changeHeader("Kirby-Speed/Score-Recorders","KSSRs")
        const result = (await this.app.accessToAPI("list_gameSystems", {})).result;
        this.articleDOM.appendChild(new GameSystemCardGroup(result,this.app).htmlElement);
    }
    private async gameModeSelector(required:PageStates["gameModeSeletor"]) {
        const result = (await this.app.accessToAPI("list_gameModes", {gameSystemEnv:{gameSystemID:required.id}})).result;
        this.articleDOM.appendChild(new GameModeCardsGroup(required,result,this.app).htmlElement);
    }
    private async searchConditionSelector(requestObject:PageStates["searchConditionSelectorView"]){
        if (requestObject !== null) this.changeDisplayedGameMode(requestObject)
        if (requestObject === null && !StateAdministrator.checkGameSystemEnvIsSet(this.state.gameSystemEnvDisplayed)) throw new Error("閲覧するゲームタイトル/ゲームモードが設定されていません。")
        const difficulties = (await this.app.accessToAPI("list_difficulties",{
            gameSystemEnv:{gameSystemID:getGameSystemID(this.state), gameModeID:getGameModeID(this.state)}
        })).result
        const abilities = (await this.app.accessToAPI("list_abilities",{
            gameSystemEnv:{gameSystemID:getGameSystemID(this.state), gameModeID:getGameModeID(this.state)}
        })).result
        this.articleDOM.appendChild(new SearchConditionSelectorView(this.app,difficulties,abilities).htmlElement)
    }

    private async mainMenu(required:PageStates["mainMenu"]) {
        if (required === null) return;
        this.changeDisplayedGameMode(required);
    }

    private changeDisplayedGameMode(required:{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections}){
        this.state.setGameSystemEnv(required)
        this.app.changeHeader(selectAppropriateName(required.gameSystem,"English"),` ${selectAppropriateName(required.gameMode,"English")}`)
    }
}

function getGameSystemID(state:StateAdministrator){
    if (state.gameSystemEnvDisplayed.gameSystem === null || state.gameSystemEnvDisplayed.gameMode === null) throw new Error("閲覧するゲームタイトル/ゲームモードが設定されていません。")
    return state.gameSystemEnvDisplayed.gameSystem.id
}
function getGameModeID(state:StateAdministrator){
    if (state.gameSystemEnvDisplayed.gameSystem === null || state.gameSystemEnvDisplayed.gameMode === null) throw new Error("閲覧するゲームタイトル/ゲームモードが設定されていません。")
    return state.gameSystemEnvDisplayed.gameMode.id
}