import { IRecordGroupResolved } from "../../record/IRecordGroupResolved";
export interface IReceivedDataAtClient_recordSearch {
    isSuccess: boolean;
    recordGroups?: IRecordGroupResolved[];
    message?: string;
}
