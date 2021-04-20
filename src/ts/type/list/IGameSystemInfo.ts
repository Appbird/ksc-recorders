import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";
import { IGameModeItem } from "./IGameModeItem";
import { icooonResolvable } from "../foundation/icooonResolvable";

export type IGameSystemInfo = IGameSystemInfoWithoutCollections & CollectionInIGameSystemInfo
export interface IGameSystemInfoWithoutCollections extends IItemOfResolveTableToName,icooonResolvable {
    id: string;
    JName: string;
    EName: string;
    recordsNumber:number;
    runnersNumber:number;
    dateOfLatestPost:number;
    releasedDate:number;
    JDescription?: string;
    EDescription?: string;
}
export interface CollectionInIGameSystemInfo {
    tags:IHashTagItem[];
    modes : IGameModeItem[];
}


export interface IHashTagItem extends IItemOfResolveTableToName{
    description?:string;
}