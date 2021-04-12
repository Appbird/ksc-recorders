import { IRecord, IRecordInShortResolved, IRecordResolved } from "../../type/record/IRecord";
import { IRecordGroupResolved } from "../../type/record/IRecordGroupResolved";
import { IItemOfResolveTableToName } from "../type/IItemOfResolveTableToName";
import { LanguageInApplication } from "../type/LanguageInApplication";
import { InterfaceOfRecordDatabase } from "../type/InterfaceOfRecordDatabase";
/**
 * データベースのデータを参照してIDを解決してくれるテーブルマネージャー
 */
type ResolveTables = Map<string,IItemOfResolveTableToName[]>
export class ControllerOfTableForResolvingID{
    
    private gameSystem: IItemOfResolveTableToName[] = [];
    private runners:IItemOfResolveTableToName[] = [];

    private gameMode:   ResolveTables = new Map<string,IItemOfResolveTableToName[]>();

    private difficulties:ResolveTables = new Map<string,IItemOfResolveTableToName[]>();
    private abilities:ResolveTables = new Map<string,IItemOfResolveTableToName[]>();
    private targets:ResolveTables = new Map<string,IItemOfResolveTableToName[]>();
    private tagIDs:ResolveTables = new Map<string,IItemOfResolveTableToName[]>();
    private database:InterfaceOfRecordDatabase;

    private initalized:boolean = false;
    private initErorMsg:string = "初期化がなされていません。まずinit()メソッドを実行してください。(ControllerOfTableForResolvingID)";
    //#NOTE コンストラクター・インジェクションの形を取ったので、モック化に対応できる。
    constructor(database:InterfaceOfRecordDatabase){
        this.database = database

    }
    private checkInitalized(){
        if (!this.initalized) throw new Error(this.initErorMsg)
    }
    async init(gameSystemID:string,gameModeID:string){
        const env = `${gameSystemID}/${gameModeID}`;
        this.gameSystem = await this.database.getGameSystemCollection()
        this.runners    = await this.database.getRunnerCollection()
        
        this.gameMode.set(gameSystemID,(await this.database.getGameModeCollection(gameSystemID)))
        this.targets        .set(gameSystemID,await this.database.getTargetCollection(gameSystemID,gameModeID))

        this.difficulties   .set(env,await this.database.getGameDifficultyCollection(gameSystemID,gameModeID)  )
        this.abilities      .set(env,await this.database.getAbilityCollection(gameSystemID,gameModeID)         )
        this.initalized = true;
        
    }
    private async resolveID(id:string, table:IItemOfResolveTableToName[] | undefined,lang:LanguageInApplication,descriptionOfPlace:string = ""){
        if (table === undefined) throw new Error("idと名前の対応づけに失敗しました。")
        const item = table.find(
            (element) =>  element.id === id
        )
        if (item === undefined) throw new Error(`${descriptionOfPlace}テーブルにおいて、id${id}に対応するデータが存在しません。`);
        switch(lang){
            case "Japanese": return item.JName;
            case "English": return item.EName;
        }
    }
    //#NOTE ここのメソッドについて、読み込む際に不足分があれば別途読み込む。

    async resolveGameSystemID(id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.gameSystem,lang,"GameSystem");
    }
    async resolveRunnerID(id:string,lang:LanguageInApplication){
        return this.resolveID(id,this.runners,lang,"runnersTable");
    }


    async resolveGameModeID(gameSystemID:string,id:string,lang:LanguageInApplication){
        this.checkInitalized();
        if (!this.gameMode.has(gameSystemID)) this.gameMode.set(gameSystemID,await this.database.getGameModeCollection(gameSystemID) )
        return this.resolveID(id,this.gameMode.get(`${gameSystemID}`),lang,"GameMode");
    }
    async resolveTagID(gameSystemID: string, gameModeID: string, id: string, lang: LanguageInApplication) {
        this.checkInitalized();
        if (!this.tagIDs.has(`${gameSystemID}`)) this.targets.set(`${gameSystemID}`,await this.database.getHashTagCollection(gameSystemID) )
        return this.resolveID(id,this.tagIDs.get(`${gameSystemID}/${gameModeID}`),lang,"Tags");
    }
    

    async resolveAbilityID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication){
        this.checkInitalized();
        if (!this.abilities.has(`${gameSystemID}/${gameModeID}`)) this.abilities.set(`${gameSystemID}/${gameModeID}`,await this.database.getAbilityCollection(gameSystemID,gameModeID) )
        return this.resolveID(id,this.abilities.get(`${gameSystemID}/${gameModeID}`),lang,"Ability");
    }
    async resolveTargetID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication){
        this.checkInitalized();
        if (!this.targets.has(`${gameSystemID}/${gameModeID}`)) this.targets.set(`${gameSystemID}/${gameModeID}`,await this.database.getTargetCollection(gameSystemID,gameModeID) )
        return this.resolveID(id,this.targets.get(`${gameSystemID}/${gameModeID}`),lang,"Target");
    }
    async resolveGameDifficultyID(gameSystemID:string,gameModeID:string,id:string,lang:LanguageInApplication){
        this.checkInitalized();
        if (!this.difficulties.has(`${gameSystemID}/${gameModeID}`)) this.difficulties.set(`${gameSystemID}/${gameModeID}`,await this.database.getGameDifficultyCollection(gameSystemID,gameModeID) )
        return this.resolveID(id,this.difficulties.get(`${gameSystemID}/${gameModeID}`),lang,"GameDifficulty");
    }


    async convertRecordsIntoRecordGroupResolved(records: IRecord[],
        info: { groupName: string; numberOfRecords: number; numberOfRunners: number; lang: LanguageInApplication; }): Promise<IRecordGroupResolved> {
        this.checkInitalized();
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
        if (!this.initalized) throw new Error(this.initErorMsg)
        const gr = record.regulation; //#README
        const gse = gr.gameSystemEnvironment; //#README
        this.checkInitalized();
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
        this.checkInitalized();
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
            tagName: await Promise.all(record.tagID.map((element) => this.resolveTagID(rrg.gameSystemID,rrg.gameModeID,element,lang))),
            note: record.note,
            link: record.link
        }
    }
}