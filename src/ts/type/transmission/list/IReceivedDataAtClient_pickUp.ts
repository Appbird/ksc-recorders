import { IItemOfResolveTableToName } from "../../../server/type/IItemOfResolveTableToName";
import { IReceivedDataAtClient } from "../transmissionBase";


export interface IReceivedDataAtClient_pickUp<T extends IItemOfResolveTableToName> extends IReceivedDataAtClient {
    result: T;
}
