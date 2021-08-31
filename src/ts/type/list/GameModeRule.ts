import { MultiLanguageString } from "../foundation/MultiLanguageString";
import { ILabelledDocument } from "./ILabelledDocument";

export interface IAppliedGameModeRule extends ILabelledDocument{
	id:string;
	Japanese:string;
	English:string;
	appliedClassID:IAppliedClassInfo[]
	note:MultiLanguageString
}
export interface IAppliedClassInfo{
	id:string;
	scope:MultiLanguageString;
	note:MultiLanguageString;
}