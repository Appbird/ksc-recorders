import { LanguageInApplication } from "../../../../../src/ts/type/LanguageInApplication";
import { HashTagCollectionController } from "../../firestore/HashTagCollectionController";
import { IDResolver } from "../../wraper/IDResolver";

export async function convertTagNameToTagID(gameSystemID: string, tagNames: string[], language: LanguageInApplication):Promise<string[]>{
    if (tagNames.length > 10) throw new Error("指定するタグのIDが多すぎます。");
    if (tagNames.length === 0) return [];
    const hashTagC = new HashTagCollectionController(gameSystemID)
    const tagResolver = new IDResolver(hashTagC)
    const result = await Promise.all(tagNames.map(tagName => tagResolver.getItemFromName(tagName, language)))

    return await Promise.all(
        result.map(async (ele, index) => {
        if (ele === undefined) {
            const newItem = {
                isApproved:false,
                Japanese: tagNames[index],English: tagNames[index]
            }
            return await hashTagC.add(newItem);
        }
        return ele.id;
    }));
    
}
