import { IAppUsedToRead } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export class S_SpinnerExhibition
    extends PageStateBaseClass<null,IAppUsedToRead>{
        
        init(){
            this.generateLoadingSpinner("");
            this.generateLoadingSpinner("u-background--shortcake");
            this.generateLoadingSpinner("u-background--difficulty");
            this.generateLoadingSpinner("u-background--ns");
            this.generateLoadingSpinner("u-background--ds");
            this.generateLoadingSpinner("u-background--iceCream");
        }
}