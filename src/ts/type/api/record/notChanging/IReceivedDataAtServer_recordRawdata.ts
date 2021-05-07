import { LanguageInApplication } from "../../../LanguageInApplication";
import { IReceivedDataAtServer } from "../../transmissionBase";

export interface IReceivedDataAtServer_recordRawdata extends IReceivedDataAtServer {
    gameSystemEnv: {
        gameSystemID: string;
        gameModeID: string;
    };
    id: string;
    lang: LanguageInApplication;
}
