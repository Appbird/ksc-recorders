import { ILabelledDocument } from "./ILabelledDocument";

export interface IGameDifficultyItem extends ILabelledDocument {
    TargetIDsIncludedInTheDifficulty: string[];
}
