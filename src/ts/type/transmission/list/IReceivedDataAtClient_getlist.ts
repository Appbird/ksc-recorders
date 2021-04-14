import { IItemOfResolveTableToName } from "../../../server/type/IItemOfResolveTableToName";
import { IReceivedDataAtClient } from "../transmissionBase";



export default interface IReceivedDataAtClient_getlist<T extends IItemOfResolveTableToName> extends IReceivedDataAtClient {
    result: T[];
}
