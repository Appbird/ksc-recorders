import { IAppUsedToRead } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SpinnerExhibition
    extends PageStateBaseClass<null,IAppUsedToRead>{
        
        init(){
            this.generateLoadingSpinner("");
            this.generateLoadingSpinner("--shortcake");
        }
}