import { RecordGroupView } from "../view/RecordsCardView";
import { IRecordGroup } from "../../type/record/IRecordGroup";
import { IReceivedDataAtClient_recordSearch } from "../../type/transmission/IReceivedDataAtClient_recordSearch";
import { element } from "../../utility/ViewUtility";


export function generateSearchView(input:IReceivedDataAtClient_recordSearch, articleDOM:HTMLElement){
    if (!assureInputHasRecords(input)) {
        displayError(input)
        return;
    }
    const recordsData:IRecordGroup[] = input.recordGroups;

    for (const recordData of recordsData) {
        const element = new RecordGroupView(recordData);
        articleDOM?.appendChild(element.htmlElement)
    }
    return;
}
function displayError(input:IReceivedDataAtClient_recordSearch){
    document.getElementById("article")?.appendChild(
        element`
    <div class = "c-recordGroupHeader">
        <div class="c-title">
            <div class="c-title__main">データの取得に失敗しました。</div>
        </div>
        <hr noshade class="u-bold">
        <div class="c-stateInfo">${input.message}</div>
    </div>`
    )
    return;
}
function assureInputHasRecords(data:IReceivedDataAtClient_recordSearch):data is {
    isSuccess: boolean;
    recordGroups: IRecordGroup[];
}{
    return data.isSuccess;
}