import { IReceivedDataAtClient } from "../transmissionBase";



export interface IReceivedDataAtClient_getlist<T extends {id:string}> extends IReceivedDataAtClient {
    result: T[];
}
