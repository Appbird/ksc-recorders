import { LanguageInApplication } from "../server/DataBase/ControllerOfTableForResolvingID";


export const Settings:ISettings = {
    language:"Japanese"
}
interface ISettings {
    language:LanguageInApplication,
}