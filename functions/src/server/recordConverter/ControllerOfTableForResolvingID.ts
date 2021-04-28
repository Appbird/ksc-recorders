import { IRecord, IRecordInShortResolved, IRecordResolved } from "../../../../src/ts/type/record/IRecord";
import { IRecordGroupResolved } from "../../../../src/ts/type/record/IRecordGroupResolved";
import { IItemOfResolveTableToName } from "../../../../src/ts/type/list/IItemOfResolveTableToName";
import { LanguageInApplication } from "../../../../src/ts/type/LanguageInApplication";
import { RecordDataBase } from "../firestore/RecordDataBase";
import { selectAppropriateName } from "../../../../src/ts/utility/aboutLang";
/**
 * データベースのデータを参照してIDを解決してくれるテーブルマネージャー
 */
type ResolveTable = Map<string,IItemOfResolveTableToName>
export class ControllerOfTableForResolvingID{
    
    //#NOTE キャッシュ。既に得たID-名前対応表を保存しておくことでFirestoreへの読み出しリクエスト回数を制限する。
    private gameSystem:ResolveTable     = new Map<string,IItemOfResolveTableToName>();
    private runner:ResolveTable         = new Map<string,IItemOfResolveTableToName>();
    private hashTag:ResolveTable        = new Map<string,IItemOfResolveTableToName>();
    private gameMode:ResolveTable       = new Map<string,IItemOfResolveTableToName>();
    private difficulty:ResolveTable     = new Map<string,IItemOfResolveTableToName>();
    private ability:ResolveTable        = new Map<string,IItemOfResolveTableToName>();
    private target:ResolveTable         = new Map<string,IItemOfResolveTableToName>();

    private database:RecordDataBase;

    //#NOTE コンストラクター・インジェクションの形を取ったので、モック化に対応できる。
    constructor(database:RecordDataBase){
        this.database = database

    }

    // #NOTE 基礎メソッド
    private async getName(id:string, lang:LanguageInApplication, cacheList:ResolveTable,
        getDoc:(id:string) => Promise<IItemOfResolveTableToName>
    ){
        const result = (this.hashTag.has(id)) ? await cacheList.get(id) : cacheList.set(id,await getDoc(id) ).get(id)
        if (result === undefined) throw new Error("予期しないエラーです。")
        return selectAppropriateName(result,lang)
    }
    private async getNameBySID(gameSystemID:string,id:string,lang:LanguageInApplication,
        cacheList:ResolveTable,
        getDoc:(gameSystemID:string,id:string) => Promise<IItemOfResolveTableToName>
    ){
        const accessKey = `${gameSystemID}/${id}`
        const result = (this.hashTag.has(accessKey)) ? await cacheList.get(accessKey) : cacheList.set(accessKey,await getDoc(gameSystemID,id) ).get(accessKey)
        if (result === undefined) throw new Error("予期しないエラーです。")
        return selectAppropriateName(result,lang)
    }
    private async getNameBySIDMID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication,
        cacheList:ResolveTable,
        getDoc:(gameSystemID:string,gameModeID:string,id:string) => Promise<IItemOfResolveTableToName>
    ){
        const accessKey = `${gameSystemID}/${gameModeID}/${id}`
        const result = (this.hashTag.has(accessKey)) ? await cacheList.get(accessKey) : cacheList.set(accessKey,await getDoc(gameSystemID,gameModeID,id) ).get(accessKey)
        if (result === undefined) throw new Error("予期しないエラーです。")
        return selectAppropriateName(result,lang)
    }

    //#NOTE 応用メソッド
    resolveGameSystemID = (id:string,lang:LanguageInApplication) => this.getName(id,lang,this.gameSystem,   (id) => this.database.getGameSystemInfo(id))
    resolveRunnerID     = (id:string,lang:LanguageInApplication) => this.getName(id,lang,this.runner,       (id) => this.database.getRunnerInfo(id))
    resolveGameModeID   = (gameSystemID:string, id:string, lang:LanguageInApplication)      => this.getNameBySID(gameSystemID,id,lang,this.gameMode,(s,id) => this.database.getGameModeInfo(s,id))
    resolveTagID        = (gameSystemID: string, id: string, lang: LanguageInApplication)   => this.getNameBySID(gameSystemID,id,lang,this.hashTag, (s,id) => this.database.getHashTagInfo(s,id))
    resolveAbilityID    = (gameSystemID:string, gameModeID:string, id:string, lang:LanguageInApplication)       => this.getNameBySIDMID(gameSystemID,gameModeID,id,lang,this.ability,   (s,m,id) => this.database.getAbilityInfo(s,m,id))
    resolveTargetID     = (gameSystemID:string, gameModeID:string, id:string, lang:LanguageInApplication)       => this.getNameBySIDMID(gameSystemID,gameModeID,id,lang,this.target,    (s,m,id) => this.database.getTargetInfo(s,m,id))
    resolveGameDifficultyID = (gameSystemID:string, gameModeID:string, id:string, lang:LanguageInApplication)   => this.getNameBySIDMID(gameSystemID,gameModeID,id,lang,this.difficulty,(s,m,id) => this.database.getGameDifficultyInfo(s,m,id))
    

    async convertRecordsIntoRecordGroupResolved(records: IRecord[],
        info: { groupName: string; numberOfRecords: number; numberOfRunners: number; lang: LanguageInApplication; }): Promise<IRecordGroupResolved> {
        if (records.length === 0) return {
            groupName: info.groupName,
            lastPost: 0, numberOfRecords: 0,numberOfRunners: 0,
            records: []
        };
        const copy = records.concat();
        return {
            groupName: info.groupName,
            lastPost: copy.sort((a, b) => b.timestamp_post - a.timestamp_post)[0].timestamp_post,
            numberOfRecords: info.numberOfRecords,
            numberOfRunners: info.numberOfRunners,
            records: await Promise.all(records.map((record) => this.convertIRecordIntoIRecordInShortWithName(record, info.lang)))
        };
    }


    async convertIRecordIntoIRecordInShortWithName(record: IRecord, lang: LanguageInApplication): Promise<IRecordInShortResolved> {
        const gr = record.regulation; //#README
        const gse = gr.gameSystemEnvironment; //#README
        return {
            ...record,
            regulation: {
                ...gr,
                gameSystemEnvironment: { ...gse,
                    gameSystemName: await this.resolveGameSystemID(gse.gameSystemID, lang),
                    gameModeName: await this.resolveGameModeID(gse.gameSystemID, gse.gameModeID, lang),
                    gameDifficultyName: await this.resolveGameDifficultyID(gse.gameSystemID, gse.gameModeID, gse.gameDifficultyID, lang),
                },
                targetName: await this.resolveTargetID(gse.gameSystemID, gse.gameModeID, gr.targetID, lang),
                abilityNames: await Promise.all(gr.abilityIDs.map((id) => this.resolveAbilityID(gse.gameSystemID, gse.gameModeID, id, lang))),
            },
            runnerName: await this.resolveRunnerID(record.runnerID, lang)
        };
    }


    async convertRecordIntoRecordResolved(record:IRecord,lang:LanguageInApplication):Promise<IRecordResolved>{
        const rr = record.regulation;
        const rrg = record.regulation.gameSystemEnvironment;
        return {
            ...record,
            regulation:{
                ...rr,
                abilityNames : await Promise.all(rr.abilityIDs.map( (abilityID) => this.resolveAbilityID(rrg.gameSystemID,rrg.gameModeID,abilityID,lang))),
                targetName: await this.resolveTargetID(rrg.gameSystemID,rrg.gameModeID,rr.targetID,lang),
                gameSystemEnvironment:{
                    ...rrg,
                    gameSystemName:await this.resolveGameSystemID(rrg.gameSystemID,lang),
                    gameDifficultyName: await this.resolveGameDifficultyID(rrg.gameSystemID,rrg.gameModeID,rrg.gameDifficultyID,lang),
                    gameModeName:await this.resolveGameModeID(rrg.gameSystemID,rrg.gameModeID,lang)
                }
            },
            runnerName: await this.resolveRunnerID(record.runnerID,lang),
            tagName: await Promise.all(record.tagID.map((element) => this.resolveTagID(rrg.gameSystemID,element,lang)))
        }
    }
}