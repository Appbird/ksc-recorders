import { IView } from "../IView";
import { TagView } from "./TagView";
export type TagKind = "ability"|"target"|"gameSystem"|"hashTag"
export class TagsView implements IView{
    private container:HTMLElement;
    private tags:TagView[] = [];
    constructor(container:HTMLElement){
        this.container = container;
        this.container.classList.add("c-tags");
    }
    destroy(){
        this.container.innerHTML = "";
        this.tags.forEach( tag => tag.destroy() )
    }
    appendTag(tagName:string,tagKind:TagKind,{
        callBackOnClick
    }:{
        callBackOnClick?:(tagKind:TagKind,tagName:string)=>void
    }={}){
        const index = this.tags.push(new TagView(document.createElement("div"),tagName,tagKind))
        if (callBackOnClick !== undefined) this.tags[index - 1].addClickEventListener(callBackOnClick)
        return this.tags[index - 1];
    }


    
}

