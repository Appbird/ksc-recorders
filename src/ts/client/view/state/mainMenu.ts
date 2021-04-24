import { IGameModeItemWithoutCollections } from "../../../type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../type/list/IGameSystemInfo";
import { element } from "../../../utility/ViewUtility";
import { IAppUsedToReadAndChangePage } from "../../interface/AppInterfaces";
import { PageStateBaseClass } from "./PageStateClass";

export class S_MainMenu
    extends PageStateBaseClass<null|{gameSystem:IGameSystemInfoWithoutCollections, gameMode:IGameModeItemWithoutCollections},IAppUsedToReadAndChangePage>{
        init(){
            //#TODO ここに機能へつながるリンクを列挙する。ヘッダをクリックするとこのページに遷移する。
            if (this.requiredObj === null) return;
            this.app.changeTargetGameMode(this.requiredObj);
            this.articleDOM.appendChild(element`<div class="u-width90per"><h1>メインページ</h1></div>`)
        }
}