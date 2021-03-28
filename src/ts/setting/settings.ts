import { LanguageInApplication } from "../server/firestore/ControllerOfTableForResolvingID";


export const Settings:ISettings = {
    language:"Japanese"
}
interface ISettings {
    language:LanguageInApplication,
}