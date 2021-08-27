import { LanguageInApplication } from "../../../../src/ts/type/LanguageInApplication";
import { ILabelledDocument, ResolvedID } from "../../../../src/ts/type/list/ILabelledDocument";
import { choiceDescription, choiceString } from "../../../../src/ts/utility/aboutLang";
import { IFirestoreCollectionController } from "../firestore/base/IFirestoreCollectionController";

export class IDResolver<T extends ILabelledDocument>{
    private cacheMap = new Map<string,T>()
    private collectionCache:T[]|null = null
    constructor(
        private controller:IFirestoreCollectionController<T>
    ){}
    private async resolveForItem(id:string){
        return (
                this.cacheMap.has(id) ? this.cacheMap 
                    : this.cacheMap.set(id,await this.controller.getInfo(id))
            ).get(id) as T
    }
    async resolveForTitle(id:string,language:LanguageInApplication):Promise<string>{
        return choiceString(await this.resolveForItem(id),language)
    }
    async getItemFromName(name:string,languageOfName:LanguageInApplication){
        if (this.collectionCache === null) this.collectionCache = await this.controller.getCollection()
        return this.collectionCache.find(doc => choiceString(doc,languageOfName) === name)
    }
}

export function chooseMultiLanguageString<T extends ILabelledDocument>(item:T,language:LanguageInApplication):ResolvedID<T>{

    const {Japanese,English,JDescription,EDescription,...omitted} = item
    return {
        ...omitted, 
        title: choiceString(item,language),
        description: choiceDescription(item,language)
    }
}