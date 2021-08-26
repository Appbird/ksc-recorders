import { ILabelledDocument } from "./ILabelledDocument";
import { IGameModeItem } from "./IGameModeItem";
import { icooonResolvable } from "../foundation/icooonResolvable";

export type IGameSystemInfo = IGameSystemInfoWithoutCollections & CollectionInIGameSystemInfo
export interface IGameSystemInfoWithoutCollections extends ILabelledDocument,icooonResolvable {
    id: string;
    Japanese: string;
    English: string;
    recordsNumber:number;
    runnersNumber:number;
    dateOfLatestPost:number;
    releasedDate:number;
    UnverifiedRecordNumber?:number;
    JDescription?: string;
    EDescription?: string;
}
export interface CollectionInIGameSystemInfo {
    tags :IHashTagItem[];
    modes : IGameModeItem[];
}


export interface IHashTagItem extends ILabelledDocument{
    description?:string;
    isApproved:boolean;
}