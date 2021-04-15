import { element, elementWithoutEscaping } from "../../utility/ViewUtility";
import { PageStates } from "../interface/PageStates";
import { RecordGroupView } from "../view/RecordsGroupView";
import { RecordDetailView } from "../view/RecordDetailView";
import { createElementWithIdAndClass } from "../utility/aboutElement";
import { GameSystemCardGroup } from "../view/gameSystemGroup";
const marked = require("marked");
import App from "../App";
import { APIAdminister } from "../APICaller";


export class TransitionAdministrator {
    private app:App;
    private articleDOM: HTMLElement;

    constructor(articleDOM: HTMLElement, app:App) {
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
            case "searchResultView": await this.search(requestObject as PageStates["searchResultView"]); break;
            case "gameSystemSelector": await this.gameSystemSelector(); break;
            default: throw new Error(`指定されたキー${nextState}に対応するページ状態が存在しません。`);
        }

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
            <div class="u-width95per">${marked(request.message)}</div>
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
        const result = (await this.app.accessToAPI("list_gameSystems", {})).result;
        this.articleDOM.appendChild(element`
                <div id="articleTitle">
                    <div class="c-title">
                            <div class="c-title__main">検索対象とするゲームシステム</div>
                            <div class="c-title__sub">select the item of title where records you're looking for was set.</div>
                    </div>
                    <hr noshade class="u-bold">
                </div>
        `);
        this.articleDOM.appendChild(new GameSystemCardGroup(result,this.app).htmlElement);
    }

    

}
