export class IListForResolvingID{
    list:IItemOfListForResolvingID[] = [];
    
    resolveIdForName(id:number,lang:keyof LanguageInApplication):string|undefined{
        const item = this.list.find(
            (element) =>  element.id === id
        )
        if (item === undefined) return undefined;
        switch(lang){
            case "Japanese": return item.JName;
            case "English": return item.EName;
        }
    }
    
}
export interface LanguageInApplication{
    Japanese:string,
    English:string
}
interface IItemOfListForResolvingID{
    id:number;
    JName:string;
    EName:string;
}