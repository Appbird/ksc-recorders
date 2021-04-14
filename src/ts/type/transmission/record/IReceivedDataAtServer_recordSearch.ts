import { IReceivedDataAtServer } from "../transmissionBase";
import { SearchCondition } from "./SearchCondition";


export default interface IReceivedDataAtServer_recordSearch extends IReceivedDataAtServer {
    condition: SearchCondition[];

}
