import { AbilityList, TargetList, gameSystemList, gameModeList, gameDifficultyList } from "../../list/Lists";
import { readFileSync } from "fs";
import { RecordCardsView } from "../../view/RecordsCardView";
import { RecordInNutShellModel } from "../../model/RecordInNutShellModel";
import { element } from "../../utility/ViewUtility";
import * as chai from "chai";
import 'mocha';
/*
const input = readFileSync("./src/host/ts/test/generateRecordCard/input.json","utf-8");
const inputObject = JSON.parse(input)
const record:RecordInNutShellModel = inputObject.record;

AbilityList.list        = inputObject.list.AbilityList;
TargetList.list         = inputObject.list.TargetList;
gameSystemList.list     = inputObject.list.GameSystemList;
gameModeList.list       = inputObject.list.GameModeList;
gameDifficultyList.list = inputObject.list.GameDifficultyList;

const card = new RecordCardsView();
card.appendRecordCard(record);
card.htmlElement;
describe(`RecordCardのHTMLを入力データinputから生成`,
    () => {
        it("RecordCardを入力データから生成", () => {
            const card = new RecordCardsView();
            card.appendRecordCard(record);
            chai.expect(card.htmlElement.firstChild?.isEqualNode(element`<div class="c-recordCard">
            <div class="c-title --withUnderline">
                <div class="c-title__main">00:00.00</div>
                    <div class="c-iconWithDescription">
                    <i class="fas fa-user" aria-hidden="true"></i>user00000
                </div>
            </div>
            <hr noshade="" class="u-thin">
            <div class="c-tags">
                <div class="c-tag --gameSystem">
                    <div class="c-iconWithDescription">
                        <i class="fas fa-star" aria-hidden="true"></i>トリプルデラックス/Theアルティメットチョイス/魂の飛び出る辛さEX
                    </div>
                </div>
                <div class="c-tag --target">
                    <div class="c-iconWithDescription">
                        <i class="fas fa-star" aria-hidden="true"></i>ウィスピーウッズ
                    </div>
                </div>
            </div>
            <div class="c-tags"><div class="c-tag --ability">
                    <div class="c-iconWithDescription">
                    <i class="far fa-star" aria-hidden="true"></i> ソード
                    </div>
                </div><div class="c-tag --ability">
                    <div class="c-iconWithDescription">
                    <i class="far fa-star" aria-hidden="true"></i> ハンマー
                    </div>
                </div><div class="c-tag --ability">
                    <div class="c-iconWithDescription">
                    <i class="far fa-star" aria-hidden="true"></i> ハンマー
                    </div>
                </div><div class="c-tag --ability">
                    <div class="c-iconWithDescription">
                    <i class="far fa-star" aria-hidden="true"></i> アイス
                    </div>
                </div></div></div>`));
        })
})

*/