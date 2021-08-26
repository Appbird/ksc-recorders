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
