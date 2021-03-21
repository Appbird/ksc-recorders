import { LanguageInApplication } from "../server/ControllerOfTableForResolvingID";


export const Settings:ISettings = {
    language:"Japanese"
}
interface ISettings {
    language:keyof LanguageInApplication,
}