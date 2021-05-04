import { EditorPart } from "./EditorPart";

export class DisabledEditor<T extends number|string> implements EditorPart<T>{
    private _value:T;
    constructor(defaultValue:T){
        this._value = defaultValue;
    }
    get requiredTypeInString(){
        return typeof this._value
    }
    get value(){
        return this._value;
    }
    refresh(){
        throw new Error("この値を変化させることはできません。")
    }
    addChangeEventListener(){
        return;
    }
    disabled(){
        return;
    }
    isFill(){
        return true;
    }
    destroy(){

    }
    get requiredField(){
        return false;
    }
}