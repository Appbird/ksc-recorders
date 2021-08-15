import { IView } from "../IView";
import { TitleCupsuled } from "./TitleCupsuled";

export class PageTitleView implements IView{
    private title:TitleCupsuled;
    
    constructor(container:HTMLElement,title:string,subtitle:string,iconCSS:string){
        this.title = new TitleCupsuled(container)
        this.title.refresh(`<i class="${iconCSS} u-margin05em"></i>`+title,subtitle, {hr:"u-bold"})
        
    }
    refresh(title:string,subtitle:string,iconCSS:string){
        this.title.refresh(`<i class="${iconCSS} u-margin05em"></i>`+title,subtitle, {hr:"u-bold"})
    }
    destroy(){
        this.title.destroy()
    }
}