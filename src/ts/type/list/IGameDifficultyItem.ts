import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";

export interface IGameDifficultyItem extends IItemOfResolveTableToName {
    TargetIDsIncludedInTheDifficulty: string[];
}
