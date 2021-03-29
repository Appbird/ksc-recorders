import { LanguageInApplication } from "../server/type/LanguageInApplication";


export const Settings:ISettings = {
    language:"Japanese"
}
interface ISettings {
    language:LanguageInApplication,
}