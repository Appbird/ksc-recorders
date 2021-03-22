import { IRecordGroup } from "../record/IRecordGroup";
export interface IReceivedDataFromServer {
    isSuccess: boolean;
    recordGroups?: IRecordGroup[];
    message?: string;
}
