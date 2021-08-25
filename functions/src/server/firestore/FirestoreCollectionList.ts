
//#TODO GameModeRuleType,GameModeRuleClassのデータ型interfaceとそのラッパーオブジェクトをつくる。
//#TODO [- HashTag,] GameModeRule, GameModeRuleClassを定義する
//#TODO RecordDatabaseを削除する。
//#TODO 周辺をこれらのリファクタリングに合わせて書き換える。
    //*> どこからでもインスタンスを作成することでデータベースにアクセスできるようになった点に注意。
    
//#CTODO コンストラクタで求められる情報量の違いを吸収するような関数Aをここでまとめ、それをfunction/list/getListとかで使用する。
    //#NOTE Aの型は(...:string[]) => IFirestoreCollectionControllerの部分型である。それぞれで分岐してやれば、あとは、結果で統一してその返り値のgetメソッドやらを呼べばいい。


//#TODO デバッグ
    //*> record/write,delete,modify,verifyがきちんと働くかチェック。

import { AbilityAttributeCollectionController } from "./AbilityAttributeCollectionController";
import { AbilityAttributeFlagsCollectiCollectionController } from "./AbilityAttributeFlagCollectionController";
import { AbilityCollectionController } from "./AbilityCollectionController";
import { DifficultyCollectionController } from "./DifficultyCollectionController";
import { GameModeItemController } from "./GameModeItemController";
import { GameSystemItemController } from "./GameSystemController";
import { IFirestoreCollectionController } from "./IFirestoreCollectionController";
import { RecordCollectionController } from "./RecordCollectionController";
import { RunnerCollectionController } from "./RunnerCollectionController";
import { TargetCollectionController } from "./TargetCollectionController";

interface CollectionList{
    gameSystem:GameSystemItemController,
    gameMode:GameModeItemController,
    difficulty:DifficultyCollectionController
    ability:AbilityCollectionController,
    target:TargetCollectionController,
    abilityAttribute:AbilityAttributeCollectionController,
    abilityAttributeFlag:AbilityAttributeCollectionController
    runner:RunnerCollectionController,
    record:RecordCollectionController
}
const CollectionListConstructors = new Map<keyof CollectionList, new (...data: any[]) => IFirestoreCollectionController<any>>([
    ["gameSystem",GameSystemItemController],
    ["gameMode",GameModeItemController],
    ["ability",AbilityCollectionController],
    ["difficulty",DifficultyCollectionController],
    ["target",TargetCollectionController],
    ["abilityAttribute",AbilityAttributeCollectionController],
    ["abilityAttributeFlag",AbilityAttributeFlagsCollectiCollectionController],
    ["runner",RunnerCollectionController]
])

export function generateCollectionController<T extends keyof CollectionList>(collectionName:T,{gameSystemEnv,abilityAttributeID}:{
    gameSystemEnv:{
        gameSystemID?:string,
        gameModeID?:string
    },
    abilityAttributeID?:string
}):IFirestoreCollectionController<any>{
    const CollectionController = CollectionListConstructors.get(collectionName)
    if (CollectionController === undefined) throw new Error("[generateCollectionController] collectionName is invalid.")
    switch(collectionName){
        case "gameSystem":
        case "runner":
            return new CollectionController()
        
        case "gameMode":
            if (!gameSystemEnv.gameSystemID) throw new Error("[generateCollectionController] gameSystemEnv.gameSystemID is not defined.")
            return new CollectionController(gameSystemEnv.gameSystemID)

        case "difficulty":
        case "ability":
        case "target":
        case "abilityAttribute":
            if (!gameSystemEnv.gameSystemID || !gameSystemEnv.gameModeID) throw new Error("[generateCollectionController] Either gameSystemEnv.gameSystemID or .gameModeID is not defined.")
            return new CollectionController(gameSystemEnv.gameSystemID,gameSystemEnv.gameModeID)
    
        case "abilityAttributeFlag":
            if (!gameSystemEnv.gameSystemID || !gameSystemEnv.gameModeID || !abilityAttributeID) throw new Error("[generateCollectionController] Either gameSystemEnv.gameSystemID, .gameModeID or .abilityAttributeID is not defined.")
            return new CollectionController(gameSystemEnv.gameSystemID,gameSystemEnv.gameModeID,abilityAttributeID)
        default:
            throw new Error("[generateCollectionController] invalid CollectionName.")
    }
    }