import { RecordGroupView } from "../view/RecordsGroupView";
import { IRecordGroupResolved } from "../../type/record/IRecordGroupResolved";


export function generateSearchView(input:IRecordGroupResolved, articleDOM:HTMLElement){
    const recordData:IRecordGroupResolved = input;

        const element = new RecordGroupView(recordData);
        articleDOM?.appendChild(element.htmlElement)
    return;
}