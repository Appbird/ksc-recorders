import { ILabelledDocument } from "../../list/ILabelledDocument";
import { IReceivedDataAtClient } from "../transmissionBase";


export interface IReceivedDataAtClient_pickUp<T extends ILabelledDocument> extends IReceivedDataAtClient {
    result: T;
}
