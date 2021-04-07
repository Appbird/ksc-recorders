import { IRecordResolved } from "../../type/record/IRecord";
import { RecordDetailView } from "../view/RecordDetailView";
export function generateDetailView(record:IRecordResolved,element:HTMLElement){
    const recordDetailView = new RecordDetailView(record);
    element.appendChild(recordDetailView.htmlElement)
}