import { isIReceivedDataAtServer_recordDetail } from "../../type/transmission/record/IReceivedData_recordDetail";
import { isIReceivedDataAtServer_recordSearch } from "../../type/transmission/record/IReceivedData_recordSearch";
import { IReceivedDataAtClient, IReceivedDataAtServer } from "../../type/transmission/transmissionBase";
import { detail } from "./record/detail";
import { search } from "./record/search";
export const apiDefinition = new Map<string,
    {
        structureCheckerFunction:(obj:unknown) => boolean,
        process:(input:IReceivedDataAtServer) => Promise<IReceivedDataAtClient> | IReceivedDataAtClient
    }>()

apiDefinition.set("/record/search",{structureCheckerFunction:isIReceivedDataAtServer_recordSearch, process:search})
apiDefinition.set("/record/detail",{structureCheckerFunction:isIReceivedDataAtServer_recordDetail, process:detail})
