import { IRecord } from "../../type/record/IRecord";
import { IItemOfResolveTableToName } from "./IItemOfResolveTableToName";
import { GameModeItem } from "./UniqueResolveTableToGameSystem";

export interface IGameSystemInfo extends IItemOfResolveTableToName {
    id: string;
    JName: string;
    EName: string;
    JDescription?: string;
    EDescription?: string;
    modes : GameModeItem[];
}
