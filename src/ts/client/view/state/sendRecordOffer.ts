import { ISentRecordOffer } from "../../../type/api/record/changing/IReceivedDataAtServer_recordWrite";
import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SendRecordOffer
    extends PageStateBaseClass<ISentRecordOffer,IAppUsedToChangeState>{
        async init(){
            this.generateLoadingSpinner("cloud");
            try {
                const detailRecord = (await this.app.accessToAPI("record_write",{
                    record:this.requiredObj,
                    language:this.app.state.language,
                    IDToken:await this.app.loginAdministratorReadOnly.getIDToken()
                })).result
                this.deleteLoadingSpinner();
                this.app.transition("detailView",{recordResolved:detailRecord});
            } catch(error){
                if (error instanceof Error) return;
                this.app.errorCatcher(error,"記録の登録に失敗しました。")
            }
        }
        
}