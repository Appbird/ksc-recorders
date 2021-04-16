import { IRecordInShortResolved, IRecordResolved } from "../../type/record/IRecord";
import { element } from "../../utility/ViewUtility";
import {  IAppUsedToReadOptionsAndTransition } from "../interface/AppInterfaces";
import { PageStates } from "../interface/PageStates";
import { createElementWithIdAndClass } from "../utility/aboutElement";
import { IView } from "./IView";
import { TransitionInfo } from "../type/TransitionInfo";
type TagKind = "ability"|"target"|"gameSystem"|"hashTag"
export class TagsView implements IView{
    private element:HTMLElement = createElementWithIdAndClass({className:"c-tags"})
    private app:IAppUsedToReadOptionsAndTransition
    private setClickEnventListener:boolean;
    constructor(app:IAppUsedToReadOptionsAndTransition,{setClickEnventListener=true}:{setClickEnventListener?:boolean}={}){
        this.app = app;
        this.setClickEnventListener = setClickEnventListener;
    }
    appendTag<T extends keyof PageStates>(tagName:string,kind:TagKind,transitionInfo:TransitionInfo<T>){
        const ele = this.element.appendChild(
        element`
            <div class = "c-tag --${kind}">
                <div class="c-iconWithDescription">
                <i class="${this.convert(kind)}"></i> ${tagName}
                </div>
            </div>`
        )
        if (this.setClickEnventListener)ele.addEventListener("click",()=> {
            this.app.transition(transitionInfo.to,transitionInfo.requiredObject)
        })
        
        return this;
    }
    private convert(kind:TagKind){
        switch (kind){
            case "ability"  :   return `far fa-star`;
            case "target"   :   return `far fa-flag`;
            case "gameSystem":  return `fas fa-star`;
            case "hashTag":     return`fas fa-hashtag`;
        }
    }
    get htmlElement(){
        return this.element;
    }


    static generateTagViewsForRecord(app:IAppUsedToReadOptionsAndTransition,inserted:Element,record:IRecordInShortResolved | IRecordResolved,
        {gameSystemTags = false,targetTags = false, abilityTags = false, hashTags = false,setClickListener = true }:OptionInfo
    ){ 
        const opt = {setClickEnventListener:setClickListener}
        const tagsViews = [new TagsView(app,opt),new TagsView(app,opt),new TagsView(app,opt)];
        const gameEnv = record.regulation.gameSystemEnvironment;
        const order = app.state.superiorScore
        if (gameSystemTags) 
                tagsViews[0].appendTag(`${gameEnv.gameSystemName}/${gameEnv.gameModeName}/${gameEnv.gameDifficultyName}`,"gameSystem",{
                    to:"searchResultView",
                    requiredObject: {
                        title:`難易度${gameEnv.gameDifficultyName}の記録`,
                        required:{condition:[{
                            groupName:"", gameSystemEnv:{ gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID, gameDifficultyID: gameEnv.gameDifficultyID },
                            orderOfRecordArray:order, limitOfRecordArray: 3, language: app.state.language
                        }]}
                    }
                })
        if (targetTags)
                tagsViews[0].appendTag(record.regulation.targetName,"target",{
                    to:"searchResultView",
                    requiredObject:{
                        title:`計測対象${record.regulation.targetName}の記録。`,
                        required:{condition:[{
                            groupName:"", gameSystemEnv:{ gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID }, targetIDs:[record.regulation.targetName] ,
                            orderOfRecordArray:order ,language:app.state.language
                        }]}
                    }
                });
        if (abilityTags)
                record.regulation.abilityNames.forEach( (ability,index) => tagsViews[1].appendTag((ability === undefined ? "Not Found" : ability),"ability",{
                    to:"searchResultView",
                    requiredObject:{
                        title:`能力${record.regulation.targetName}(ソロ)における、難易度${gameEnv.gameDifficultyName}の記録。`,
                        required:{condition:[{
                            groupName:"", gameSystemEnv:{ gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID, gameDifficultyID:gameEnv.gameDifficultyID}, abilityIDs:[record.regulation.abilityIDs[index]],
                            orderOfRecordArray:order ,language:app.state.language
                        }]}
                    }
                })
            )
        if (hashTags && assureRecordIsFull(record))
            record.tagName.forEach( (tag,index) => tagsViews[1].appendTag((tag === undefined ? "Not Found" : tag),"hashTag",{
                to:"searchResultView",
                requiredObject:{
                    title:`タグ${tag}における全体の記録。`,
                    required:{condition:[{
                        groupName:"", gameSystemEnv:{ gameSystemID: gameEnv.gameSystemID, gameModeID: gameEnv.gameModeID, gameDifficultyID:"whole"}, tagIDs: [record.tagID[index]],
                        orderOfRecordArray:order ,language:app.state.language
                    }]}
                }
            })
        )
        

        if (gameSystemTags || targetTags)
                inserted.appendChild(tagsViews[0].htmlElement);
        if (abilityTags)
                inserted.appendChild(tagsViews[1].htmlElement);
        if (hashTags)
                inserted.appendChild(tagsViews[2].htmlElement);
    }
}
function assureRecordIsFull(record:IRecordInShortResolved | IRecordResolved):record is IRecordResolved{ 
    return "tagID" in record
}
interface OptionInfo{gameSystemTags?:boolean,targetTags?:boolean,abilityTags?:boolean,hashTags?:boolean,setClickListener?:boolean}