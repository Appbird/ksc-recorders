import { MultiLanguageString } from "../foundation/MultiLanguageString";

export interface IAppliedGameModeRule{
	id:string;
	appliedClassID:IAppliedClassInfo[]
	note:string;
}
export interface IAppliedClassInfo{
	id:string;
	scope:MultiLanguageString;
	note:MultiLanguageString;
}