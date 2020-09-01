import { LanguageInApplication } from "./IListResolvingId";

export const Settings:ISettings = {
    language:"Japanese"
}
interface ISettings {
    language:keyof LanguageInApplication,
}