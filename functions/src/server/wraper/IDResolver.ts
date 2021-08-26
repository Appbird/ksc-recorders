import { LanguageInApplication } from "../../../../src/ts/type/LanguageInApplication";
import { ILabelledDocument } from "../../../../src/ts/type/list/ILabelledDocument";
import { choiceString } from "../../../../src/ts/utility/aboutLang";
import { IFirestoreCollectionController } from "../firestore/IFirestoreCollectionController";
import { Transaction } from "../function/firebaseAdmin";

export class IDResolver<T>{
    private cacheMap = new Map<string,T>()
    constructor(
        private controller:IFirestoreCollectionController<T>,
        transaction:Transaction
    ){}
    async resolveForItem(id:string){
        return (
                this.cacheMap.has(id) ? this.cacheMap 
                    : this.cacheMap.set(id,await this.controller.getInfo(id))
            ).get(id) as T
    }
    async resolveForName(id:string,language:LanguageInApplication){
        return choiceString(await this.resolveForItem(id),language)
    }
    async getItemFromName(name:string,languageOfName:LanguageInApplication){
        return 
    }


}
export class IDResolverForlabelledObject<T>{
    private cacheMap = new Map<string,T>()
    constructor(
        private controller:IFirestoreCollectionController<T>,
        transaction:Transaction
    ){}
    async resolveForItem(id:string){
        return (
                this.cacheMap.has(id) ? this.cacheMap 
                    : this.cacheMap.set(id,await this.controller.getInfo(id))
            ).get(id) as T
    }
    async resolveForName(id:string,language:LanguageInApplication){
        return choiceString(await this.resolveForItem(id),language)
    }
    async getItemFromName(name:string,languageOfName:LanguageInApplication){
        return 
    }


}