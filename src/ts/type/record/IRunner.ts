import { IItemOfResolveTableToName } from "../../server/ControllerOfTableForResolvingID";

export interface IRunner extends IItemOfResolveTableToName{
    JName : string;
    EName : string;
    id : number;
    theDateOfRegistered: number;
    theNumberOfPost :number;
    twitterID : string;
    youtubeID : string;
    idOfGameSystemRunnerHavePlayed: number[];
    theDateOfLastPost :number; 
}