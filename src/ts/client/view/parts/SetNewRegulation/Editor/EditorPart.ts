import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";

export interface EditorPart<T> {
    addChangeEventListener(callback: (changed: T|undefined) => void): void;
    refresh(value: T|undefined): void;
    isFill(): boolean;
    disabled(state:boolean):void,
    destroy():void;
    checker?():void;
    displayError?(error?:string|MultiLanguageString):void;
    readonly requiredTypeInString?:string;
    readonly requiredField:boolean;
    readonly value: T|undefined;
}

export const context_required = {
    Japanese:"<strong class='u-redChara'>[必須]<strong>",
    English:"<strong class='u-redChara'>[Required]<strong>"
}