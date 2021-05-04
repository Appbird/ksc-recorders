export interface EditorPart<T> {
    addChangeEventListener(callback: (changed: T) => void): void;
    refresh(value: T): void;
    isFill(): boolean;
    disabled(state:boolean):void,
    destroy():void
    readonly requiredTypeInString:string;
    readonly requiredField:boolean;
    readonly value: T;
}

export const context_required = {
    Japanese:"<strong class='u-redChara'>[必須]<strong>",
    English:"<strong class='u-redChara'>[Required]<strong>"
}