import { icooonResolvable } from "../foundation/icooonResolvable";
import { MultiLanguageString } from "../foundation/MultiLanguageString";
import { IRecord } from "../record/IRecord";
import { IAbilityItem } from "./IAbilityItem";
import { IGameDifficultyItem } from "./IGameDifficultyItem";
import { ILabelledDocument } from "./ILabelledDocument";
import { IStoredOfferedRecord } from "./IStoredOfferedRecord";
import { ITargetItem } from "./ITargetItem";

/**
 * カービィの作品にそれぞれひとつずつ対応するID解決テーブル群
 * #TODO ここにIAbilityAttributeItemWithoutCollections
 */
export type ScoreType = "score"|"time";
export type IGameModeItem = IGameModeItemWithoutCollections & CollectionsInIGameModeItem
export interface IGameModeItemWithoutCollections extends ILabelledDocument,icooonResolvable{
    runnersNumber:number;
    recordsNumber:number;
    dateOfLatestPost:number;
    maxNumberOfPlayer:number;
    scoreType:ScoreType;
    gameSystemID:string;
    UnverifiedRecordNumber?:number;
    DiscordRoleID?:string;
    rules?:RuleDescription[]
}
export interface CollectionsInIGameModeItem{
    targets: ITargetItem[];
    difficulties: IGameDifficultyItem[];
    abilities: IAbilityItem[];
    records:IRecord[];
    offers:IStoredOfferedRecord[];
}


export interface RuleDescription{
    id:string,
    appliedClassIDs:string[],
    noteInMarkdown:MultiLanguageString
}