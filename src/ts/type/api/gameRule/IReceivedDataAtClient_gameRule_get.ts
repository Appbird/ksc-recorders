import { IReceivedDataAtClient } from "../transmissionBase";
import { RuleAttributeAndAppliedClassInfo } from "./RuleAttributeAndAppliedClassInfo";

export interface IReceivedDataAtClient_gameRule_get extends IReceivedDataAtClient {
    result: RuleAttributeAndAppliedClassInfo[]|undefined;
    isSucceeded: boolean;
}
