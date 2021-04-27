import App from "../App";
import { IPageStateBaseClass} from "../view/state/PageStateClass";

export interface PageStatesConstructorObj {
    [key:string]:PageStateConstructor
}
interface PageStateConstructor {
    new (app:App,articleDOM:HTMLElement,requiredObj:any) : IPageStateBaseClass<any>
}