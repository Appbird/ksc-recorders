import { IItemOfResolveTableToName } from "../list/IItemOfResolveTableToName";

export interface IRunner extends IItemOfResolveTableToName{
    Japanese : string;
    English : string;
    id : string;
    theDateOfRegistered: number;
    theNumberOfPost :number;
    twitterLink : string;
    youtubeLink : string;
    idOfGameSystemRunnerHavePlayed: {id:string,times:number}[];
    idOfGameModeRunnerHavePlayed: {id:string,times:number}[];
    theDateOfLastPost :number; 
    isCommitteeMember:boolean;
    isMuted:boolean;
    numberOfUnreadNotification:number;
    photoURL:string;
}
export interface CollectionOfIRunner{
    notification:Notification[]
}

export interface INotificationItem extends IItemOfResolveTableToName{
    postedDate:number;
    from:{
        id:string,
        Japanese:string,
        English:string  
    };
}

