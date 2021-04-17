import { S_ErrorState } from "../view/state/ErrorState";
import { IPageStateBaseClass, PageStateBaseClass } from "../view/state/PageStateClass";
import { IAppUsedToRead } from "./AppInterfaces";

export interface PageStatesConstructorObj {
    [key:string]:PageStateConstructor
}
interface PageStateConstructor {
    new (app:IAppUsedToRead,articleDOM:HTMLElement,requiredObj:any) : IPageStateBaseClass<any>
}