import { LanguageInApplication } from "../../../../../src/ts/type/LanguageInApplication";
import { selectAppropriateProperty } from "../../../../../src/ts/utility/aboutLang";
import { RecordDataBase } from "../../firestore/RecordDataBase";

export async function convertTagNameToTagID(gameSystemID: string, recordDataBase: RecordDataBase, tagNames: string[], language: LanguageInApplication) {
    if (tagNames.length > 10) throw new Error("指定するタグのIDが多すぎます。");
    const result = await recordDataBase.searchHashTag(gameSystemID, tagNames, language);

    return await Promise.all(result.map((ele, index) => {
        if (ele === undefined) {
            const hashTagItem: any = { id: "" };
            hashTagItem[selectAppropriateProperty(language)] = tagNames[index];
            return recordDataBase.writeHashTagInfo(gameSystemID, hashTagItem);
        }
        return ele.id;
    }));
    
}
