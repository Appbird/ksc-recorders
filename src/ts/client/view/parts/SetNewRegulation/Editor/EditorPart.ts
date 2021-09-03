import { MultiLanguageString } from "../../../../../type/foundation/MultiLanguageString";
/**
 * エディタのパーツに対応します。
 * EditorFormManager, EditorFormManagerWithAutoDetectと一緒に使用します。
 */
export interface EditorPart<T> {
    /** ユーザーからの入力、もしくはenter()メソッドからの入力があった際に発火するコールバックを設定します。 */
    addChangeEventListener(callback: (changed: T|undefined) => void): void;
    /** エディタの値を、コールバックを発火させることなく変更します。 */
    refresh(value: T|undefined): void;
    /** 内部の入力された内容が、要件を満たしているかを真偽値で出力します。*/
    isFill(): boolean;
    /** ユーザーからの入力、enter()メソッドからの入力をすべて遮断するように設定します。 */
    disabled(state:boolean):void,
    /** エディタを破壊します。 */
    destroy():void;
    /** エラーを適切な位置に表示させます。 */
    displayError?(error?:string|MultiLanguageString):void;
    /** このエディタの入力が必須かを表します。 */
    readonly requiredField:boolean;
    /** エディタの値を出力します。 */
    readonly value: T|undefined;
    /** エディタの値を、コールバックを発火させて変更します。 */
    enter?(value:T):void;
}

export const context_required = {
    Japanese:"<strong class='u-redChara'>[必須]<strong>",
    English:"<strong class='u-redChara'>[Required]<strong>"
}