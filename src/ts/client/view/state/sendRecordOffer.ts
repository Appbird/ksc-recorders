import { IOfferedRecord } from "../../../type/api/record/IReceivedData_recordWrite";
import { element } from "../../../utility/ViewUtility";
import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SendRecordOffer
    extends PageStateBaseClass<IOfferedRecord,IAppUsedToChangeState>{
        async init(){
            try {
                this.generateLoadingSpinner("cloud");
                this.articleDOM.appendChild(element`<div class="u-width90per">
                    <h1>内容</h1><p>${JSON.stringify(this.requiredObj)}</p>
                </div>`)
                /*
                const result = await this.app.accessToAPI("record_write",{record:this.requiredObj});
                const record = result.result
                this.deleteLoadingSpinner();

                const articleElement = this.articleDOM.appendChild(createElementWithIdAndClass({className:"u-width95per"}))
                articleElement.appendChild(htmlConverter.element`
                <div>
                    <h1>${ {Japanese:"記録が投稿されました！"} }</h1>
                    <p>${ {Japanese:"記録が承認されるとユーザーページに通知が行きます。"} }</p>
                    <p>${result.message}</p>
                </div>
                `)
                
                articleElement.appendChild(new RecordCardView(this.app,record,{
                    displayTags: {abilityTags:true,targetTags:true,gameSystemTags:true},
                    setClickListener:false
                }).htmlElement)
                */
            } catch(error){
                if (error instanceof Error) return;
            }

        }
}