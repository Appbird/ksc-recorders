import { MultiLanguageDescription } from "../../utility/aboutLang"
import { MultiLanguageString } from "../foundation/MultiLanguageString"

export interface ILabelledDocument {
    id: string;
    Japanese: string;
    JDescription?:string;
    English: string;
    EDescription?:string;
}
export interface ILabelledDocumentLackingOfID {
    id?: string;
    Japanese: string;
    JDescription?:string;
    English: string;
    EDescription?:string;
}
export const expectedObj_ILabelledDocument = {
    id : "string",
    Japanese: "string",
    English: "string"
}

export type ResolvedID<T extends MultiLanguageString & MultiLanguageDescription> = Omit<T,keyof (MultiLanguageString&MultiLanguageDescription)>&{title:string,description?:string}
