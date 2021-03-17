import { RecordCardsView } from "../view/RecordsCardView";
import { IRecordGroupWithName } from "../type/record/IRecordGroup";

const inputObject = JSON.parse(input)
const recordsData:IRecordGroupWithName = inputObject.recordGroup;

const element = new RecordCardsView(recordsData);
document.getElementById("article")?.appendChild(element.htmlElement);