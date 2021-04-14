import { IItemOfResolveTableToName } from "../../list/IItemOfResolveTableToName";
import { IReceivedDataAtClient } from "../transmissionBase";


export interface IReceivedDataAtClient_pickUp<T extends IItemOfResolveTableToName> extends IReceivedDataAtClient {
    result: T;
}
