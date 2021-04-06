export interface IReceivedDataAtServer{}

export interface IReceivedDataAtClient{
    isSuccess:boolean;
    result?:any;
    message?:string;
}