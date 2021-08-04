import { IReceivedDataAtServer } from "../../transmissionBase";
import { SearchCondition } from "../../../record/SearchCondition";


export interface IReceivedDataAtServer_recordSearch extends IReceivedDataAtServer {
    condition: SearchCondition[];
    
}
