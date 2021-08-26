import { ILabelledDocument } from "../list/ILabelledDocument";

export type IRunner = IRunnerEditable&IRunnerUneditable;

export interface IRunnerUneditable{

    id : string;
    theDateOfRegistered: number;
    theNumberOfPost :number;
    idOfGameSystemRunnerHavePlayed: {id:string,times:number}[];
    idOfGameModeRunnerHavePlayed: {id:string,times:number}[];
    theDateOfLastPost :number; 
    isCommitteeMember:boolean;
    isMuted:boolean;
    
}
export interface IRunnerEditable{
    Japanese : string;
    English : string;
    JDescription?:string;
    EDescription?:string;
    twitterLink:string;
    youtubeLink : string;
    photoURL:string;
    numberOfUnreadNotification:number;
}
export interface CollectionOfIRunner{
    notification:Notification[]
}

export interface INotificationItem extends ILabelledDocument{
    postedDate:number;
    id:string;
    iconCSSClass:string;
    from:{
        Japanese:string,
        English:string  
    };
}

