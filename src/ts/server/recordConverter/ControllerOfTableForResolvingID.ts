import { IRecord, IRecordInShortResolved, IRecordResolved } from "../../type/record/IRecord";
import { IRecordGroupResolved } from "../../type/record/IRecordGroupResolved";
import { IItemOfResolveTableToName } from "../type/IItemOfResolveTableToName";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { InterfaceOfRecordDatabase } from "../type/InterfaceOfRecordDatabase";
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

    private database:InterfaceOfRecordDatabase;

    //#NOTE コンストラクター・インジェクションの形を取ったので、モック化に対応できる。
    constructor(database:InterfaceOfRecordDatabase){
        this.database = database

    }

    private async selectAppropriateName(item:IItemOfResolveTableToName,lang:LanguageInApplication){
        switch (lang){
            case "Japanese": return item.JName
            case "English": return item.EName
        }
    }
    // #NOTE 基礎メソッド
    private async getName(id:string, lang:LanguageInApplication, cacheList:ResolveTable,
        getDoc:(id:string) => Promise<IItemOfResolveTableToName>
    ){
        const result = (this.hashTag.has(id)) ? await cacheList.get(id) : cacheList.set(id,await getDoc(id) ).get(id)
        if (result === undefined) throw new Error("予期しないエラーです。")
        return this.selectAppropriateName(result,lang)
    }
    private async getNameBySID(gameSystemID:string,id:string,lang:LanguageInApplication,
        cacheList:ResolveTable,
        getDoc:(gameSystemID:string,id:string) => Promise<IItemOfResolveTableToName>
    ){
        const accessKey = `${gameSystemID}/${id}`
        const result = (this.hashTag.has(accessKey)) ? await cacheList.get(accessKey) : cacheList.set(accessKey,await getDoc(gameSystemID,id) ).get(accessKey)
        if (result === undefined) throw new Error("予期しないエラーです。")
        return this.selectAppropriateName(result,lang)
    }
    private async getNameBySIDMID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication,
        cacheList:ResolveTable,
        getDoc:(gameSystemID:string,gameModeID:string,id:string) => Promise<IItemOfResolveTableToName>
    ){
        const accessKey = `${gameSystemID}/${gameModeID}/${id}`
        const result = (this.hashTag.has(accessKey)) ? await cacheList.get(accessKey) : cacheList.set(accessKey,await getDoc(gameSystemID,gameModeID,id) ).get(accessKey)
        if (result === undefined) throw new Error("予期しないエラーです。")
        return this.selectAppropriateName(result,lang)
    }

    //#NOTE 応用メソッド
    resolveGameSystemID = (id:string,lang:LanguageInApplication) =>  this.getName(id,lang,this.gameSystem,this.database.getGameSystemInfo)
    resolveRunnerID     = (id:string,lang:LanguageInApplication) => this.getName(id,lang,this.runner,this.database.getRunnerInfo)
    resolveGameModeID   = (gameSystemID:string, id:string, lang:LanguageInApplication) => this.getNameBySID(gameSystemID,id,lang,this.gameMode,this.database.getGameModeInfo)
    resolveTagID        = (gameSystemID: string, id: string, lang: LanguageInApplication) => this.getNameBySID(gameSystemID,id,lang,this.hashTag,this.database.getHashTagInfo)
    resolveAbilityID    = (gameSystemID:string, gameModeID:string, id:string, lang:LanguageInApplication) => this.getNameBySIDMID(gameSystemID,gameModeID,id,lang,this.ability,this.database.getAbilityInfo)
    resolveTargetID     = (gameSystemID:string, gameModeID:string, id:string, lang:LanguageInApplication) => this.getNameBySIDMID(gameSystemID,gameModeID,id,lang,this.target,this.database.getTargetInfo)
    resolveGameDifficultyID = (gameSystemID:string, gameModeID:string, id:string, lang:LanguageInApplication) => this.getNameBySIDMID(gameSystemID,gameModeID,id,lang,this.difficulty,this.database.getGameDifficultyInfo)
    

    async convertRecordsIntoRecordGroupResolved(records: IRecord[],
        info: { groupName: string; numberOfRecords: number; numberOfRunners: number; lang: LanguageInApplication; }): Promise<IRecordGroupResolved> {
        const copy = records.concat();
        return {
            groupName: info.groupName,
            lastPost: copy.sort((a, b) => b.timestamp - a.timestamp)[0].timestamp,
            numberOfRecords: info.numberOfRecords,
            numberOfRunners: info.numberOfRunners,
            records: await Promise.all(records.map((record) => this.convertIRecordIntoIRecordInShortWithName(record, info.lang)))
        };
    }


    async convertIRecordIntoIRecordInShortWithName(record: IRecord, lang: LanguageInApplication): Promise<IRecordInShortResolved> {
        const gr = record.regulation; //#README
        const gse = gr.gameSystemEnvironment; //#README
        return {
            regulation: {
                gameSystemEnvironment: {
                    gameSystemID: gse.gameSystemID,
                    gameModeID: gse.gameModeID,
                    gameDifficultyID: gse.gameDifficultyID,
                    gameSystemName: await this.resolveGameSystemID(gse.gameSystemID, lang),
                    gameModeName: await this.resolveGameModeID(gse.gameSystemID, gse.gameModeID, lang),
                    gameDifficultyName: await this.resolveGameDifficultyID(gse.gameSystemID, gse.gameModeID, gse.gameDifficultyID, lang),
                },
                targetID: gr.targetID,
                targetName: await this.resolveTargetID(gse.gameSystemID, gse.gameModeID, gr.targetID, lang),
                abilityIDs: gr.abilityIDs,
                abilityNames: await Promise.all(gr.abilityIDs.map((id) => this.resolveAbilityID(gse.gameSystemID, gse.gameModeID, id, lang))),
            },
            score: record.score,
            runnerID: record.runnerID,
            id: record.id,
            runnerName: await this.resolveRunnerID(record.runnerID, lang)
        };
    }


    async convertRecordIntoRecordResolved(record:IRecord,lang:LanguageInApplication):Promise<IRecordResolved>{
        const rr = record.regulation;
        const rrg = record.regulation.gameSystemEnvironment;
        return {
            id: record.id,
            score:record.score,
            timestamp:record.timestamp,
            regulation:{
                abilityIDs : rr.abilityIDs,
                abilityNames : await Promise.all(rr.abilityIDs.map( (abilityID) => this.resolveAbilityID(rrg.gameSystemID,rrg.gameModeID,abilityID,lang))),
                targetID: rr.targetID,
                targetName: await this.resolveTargetID(rrg.gameSystemID,rrg.gameModeID,rr.targetID,lang),
                gameSystemEnvironment:{
                    gameSystemID:rrg.gameSystemID,
                    gameSystemName:await this.resolveGameSystemID(rrg.gameSystemID,lang),
                    gameDifficultyID:rrg.gameDifficultyID,
                    gameDifficultyName: await this.resolveGameDifficultyID(rrg.gameSystemID,rrg.gameModeID,rrg.gameDifficultyID,lang),
                    gameModeID:rrg.gameModeID,
                    gameModeName:await this.resolveGameModeID(rrg.gameSystemID,rrg.gameModeID,lang)
                }
            },
            runnerID: record.runnerID,
            runnerName: await this.resolveRunnerID(record.runnerID,lang),
            tagID: record.tagID,
            tagName: await Promise.all(record.tagID.map((element) => this.resolveTagID(rrg.gameSystemID,element,lang))),
            note: record.note,
            link: record.link
        }
    }
}