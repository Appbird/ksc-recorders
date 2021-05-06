import { IAppUsedToRead } from "../../interface/AppInterfaces";
import {PageStateBaseClass} from "./PageStateClass"
export class S_NowLoading extends PageStateBaseClass<null,IAppUsedToRead>{
    init(){
        this.generateLoadingSpinner();
        return;
    }
}