import { IRecordGroup } from "../record/IRecordGroup";
export interface IReceivedDataAtClient_recordSearch {
    isSuccess: boolean;
    recordGroups?: IRecordGroup[];
    message?: string;
}
