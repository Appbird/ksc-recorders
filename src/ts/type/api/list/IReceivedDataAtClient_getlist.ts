import { ILabelledDocument } from "../../list/ILabelledDocument";
import { IReceivedDataAtClient } from "../transmissionBase";



export interface IReceivedDataAtClient_getlist<T extends ILabelledDocument> extends IReceivedDataAtClient {
    result: T[];
}
