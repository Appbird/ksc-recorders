export interface IReceivedDataAtServer{}

export interface IReceivedDataAtClient{
    isSucceeded:boolean;
    result?:any;
    message?:string;
}