export interface IReceivedDataAtServer{}

export interface IReceivedDataAtClient{
    isSucceeded:boolean;
    result?:any;
    message?:string;
}
export interface IReceivedData{
    atServer:IReceivedDataAtServer;
    atClient:IReceivedDataAtClient;
}
export interface ValidatorOnReceivedDataAtServer<T extends IReceivedDataAtServer>{
    
}