import { EditorPart } from "./EditorPart";

export class EditorInoperablePart<T> implements EditorPart<T>{
    private callbacks:((changed:T) => void)[] = [];
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
    refresh(value:T){
        if (value === this._value) return;
        this._value = value
        for (const callback of this.callbacks) callback(value)
    }
    addChangeEventListener(callback:(changed:T) => void){
        this.callbacks.push((changed:T) => callback(changed))
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