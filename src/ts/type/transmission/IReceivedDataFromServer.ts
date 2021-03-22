import { IRecordGroupWithName } from "../record/IRecordGroup";
export interface IReceivedDataFromServer {
    isSuccess: boolean;
    recordGroups: IRecordGroupWithName[];
}
