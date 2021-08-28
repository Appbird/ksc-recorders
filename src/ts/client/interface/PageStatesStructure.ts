import App from "../App";
import { IPageStateBaseClass} from "../view/state/Base/PageStateClass";

export interface PageStatesConstructorObj {
    [key:string]:PageStateConstructor
}
interface PageStateConstructor {
    new (app:App,articleDOM:HTMLElement,requiredObj:any) : IPageStateBaseClass<any>
}