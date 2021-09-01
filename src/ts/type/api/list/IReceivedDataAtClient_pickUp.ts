import { IReceivedDataAtClient } from "../transmissionBase";


export interface IReceivedDataAtClient_pickUp<T extends {id:string}> extends IReceivedDataAtClient {
    result: T;
}
