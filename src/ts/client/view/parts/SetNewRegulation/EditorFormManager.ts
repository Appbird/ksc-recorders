import { EditorPart } from "./Editor/EditorPart";
export type InputFormObject<T> = {[P in keyof T]:EditorPart<T[P]>} 

//#CTODO これを通常データ用に書き換える。
//#CH これをより良い型定義に書き換えたい(Mapを使用できないか？)
export class EditorFormManager<TypeOfObserved extends {[key:string]:any}>{
    private readonly inputForm:InputFormObject<TypeOfObserved>
    
    get inputFormsTuples():[string,EditorPart<any>][]{
        return Object.entries(this.inputForm);
    }

    constructor(
        inputForms:InputFormObject<TypeOfObserved>,
    ){
        this.inputForm = inputForms;
    }
    get value(): TypeOfObserved{
        const result:{[key:string]:any} = {}; 
        for (const [key,element] of this.inputFormsTuples){
            const editor = element
            result[key] =  editor.value
            if (editor.value === undefined) throw new Error("[EditorFormManager:value] editor.value === undefined")
        }
        return result as TypeOfObserved
    }

    refresh(obj:TypeOfObserved){
        for (const [key,value] of Object.entries(obj)) this.inputForm[key].refresh(value)
    }
    disabled(state:boolean){
        for(const [,editor] of this.inputFormsTuples) if (editor !== undefined) editor.disabled(state)
    }

    isFill(){
        return this.inputFormsTuples.every(([,editor]) => (editor!==undefined) ? (!editor.requiredField || editor.isFill() ):true)
    }

    destroy(){
        for (const inputFormTuple of this.inputFormsTuples) inputFormTuple[1]?.destroy()
    }
}

