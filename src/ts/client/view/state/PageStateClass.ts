import { IAppUsedToRead } from "../../interface/AppInterfaces";

export abstract class PageStateBaseClass<T,AppInterface extends IAppUsedToRead> implements IPageStateBaseClass<T> {
    protected app:AppInterface;
    protected requiredObj:T;
    protected articleDOM:HTMLElement;
    constructor(app:AppInterface,articleDOM:HTMLElement,requiredObj:T){
        this.app = app;
        this.requiredObj = requiredObj;
        this.articleDOM = articleDOM;
        this.init();
    }
    abstract init():Promise<void>|void;
    get requiredObject():T{
        return this.requiredObj
    }
}


export interface IPageStateBaseClass<T>{
    init():Promise<void>|void;
    requiredObject:T;
}