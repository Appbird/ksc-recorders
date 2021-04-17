import { IAppUsedToRead } from "../../interface/AppInterfaces";
import {PageStateBaseClass} from "./PageStateClass"
export class S_None extends PageStateBaseClass<null,IAppUsedToRead>{
    init(){
        return;
    }
}