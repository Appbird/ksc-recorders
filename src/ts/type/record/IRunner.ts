import { IItemOfResolveTableToName } from "../../server/type/IItemOfResolveTableToName";

export interface IRunner extends IItemOfResolveTableToName{
    JName : string;
    EName : string;
    id : string;
    theDateOfRegistered: number;
    theNumberOfPost :number;
    twitterID : string;
    youtubeID : string;
    idOfGameSystemRunnerHavePlayed: string[];
    theDateOfLastPost :number; 
    isCommitteeMember:boolean;
    isMuted:boolean;
}