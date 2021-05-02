import { IView } from "../../IView";

export interface InputForm extends IView {
    prepareEditor():Promise<void>
    writeData():Promise<void>
    addData():Promise<void>
    closeEditor():void
    isFilled():boolean
}
