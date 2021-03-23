import { IRecord } from "../../type/record/IRecord";
import { IItemOfResolveTableToName } from "../DataBase/ControllerOfTableForResolvingID";
import { UniqueResolveTableToGameSystem } from "./UniqueResolveTableToGameSystem";

export interface IGameSystemInfo extends IItemOfResolveTableToName {
    id: number;
    JName: string;
    EName: string;
    JDescription?: string;
    EDescription?: string;
    list: UniqueResolveTableToGameSystem;
    records: IRecord[];
}
