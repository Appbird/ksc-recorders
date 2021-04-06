import { IRecord } from "../../type/record/IRecord";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { IRecordGroupResolved } from "../../type/record/IRecordGroupResolved";
import { convertIRecordIntoIRecordInShortWithName } from "./convertIRecordIntoIRecordInShortWithName";

export async function convertRecordsIntoRecordGroup(records: IRecord[],
    info: { groupName: string; numberOfRecords: number; numberOfRunners: number; lang: LanguageInApplication; }): Promise<IRecordGroupResolved> {
    const copy = records.concat();
    return {
        groupName: info.groupName,
        lastPost: copy.sort((a, b) => b.timestamp - a.timestamp)[0].timestamp,
        numberOfRecords: info.numberOfRecords,
        numberOfRunners: info.numberOfRunners,
        records: await Promise.all(records.map((record) => convertIRecordIntoIRecordInShortWithName(record, info.lang)))
    };
}

