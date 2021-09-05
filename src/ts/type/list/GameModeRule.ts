import { MultiLanguageString } from "../foundation/MultiLanguageString";
import { ILabelledDocument } from "./ILabelledDocument";
import firebase from "firebase/app"
import "firebase/firestore"

export interface IAppliedGameModeRule extends ILabelledDocument{
	id:string;
	Japanese:string;
	English:string;
	appliedClassID:IAppliedClassInfo[]
	note:MultiLanguageString
	modifiedAt?:firebase.firestore.Timestamp
}
export interface IAppliedClassInfo{
	id:string;
	scope:MultiLanguageString;
	note:MultiLanguageString;
}