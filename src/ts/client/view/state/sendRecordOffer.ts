import { ISentRecordOffer } from "../../../type/api/record/changing/IReceivedDataAtServer_recordWrite";
import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SendRecordOffer
    extends PageStateBaseClass<ISentRecordOffer,IAppUsedToChangeState>{
        async init(){
            this.generateLoadingSpinner("cloud");
            try {
                await this.app.accessToAPI("record_write",{
                    record:this.requiredObj,
                    language:this.app.state.language,
                    IDToken:await this.app.loginAdministratorReadOnly.getIDToken()
                })
            } catch(error){
                if (error instanceof Error) return;
                this.app.errorCatcher(error,"記録の送信に失敗しました。")

            }

        }
}