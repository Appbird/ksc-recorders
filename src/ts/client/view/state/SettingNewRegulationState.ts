import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { SettingNewRegulationView } from "../parts/SettingNewRegulationView";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SettingNewRegulationState
    extends PageStateBaseClass<null,IAppUsedToChangeState>{
    init(){
        new SettingNewRegulationView(this.articleDOM.appendChild(document.createElement("div")),this.app);
    }
}