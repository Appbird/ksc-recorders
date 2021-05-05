import { IAppUsedToRead } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SpinnerExhibition
    extends PageStateBaseClass<null,IAppUsedToRead>{
        
        init(){
            this.setLoadingSpinner();
        }
        setLoadingSpinner(){
            this.generateLoadingSpinner();
            setTimeout(()=>this.destroyLoadingSpinner(),5700)
        }
        destroyLoadingSpinner(){
            this.deleteLoadingSpinner();
            setTimeout(()=>this.setLoadingSpinner(),1500)
        }
}