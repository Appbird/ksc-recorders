import { IItemOfResolveTableToName } from "../list/IItemOfResolveTableToName";

export interface IRunner extends IItemOfResolveTableToName{
    Japanese : string;
    English : string;
    id : string;
    theDateOfRegistered: number;
    theNumberOfPost :number;
    twitterID : string;
    youtubeID : string;
    idOfGameSystemRunnerHavePlayed: string[];
    idOfGameModeRunnerHavePlayed:string[];
    theDateOfLastPost :number; 
    isCommitteeMember:boolean;
    isMuted:boolean;
}

export interface RelationTableBetweenUIDandID{
    id:string;
}
