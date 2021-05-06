import { IRecord, IRecordResolved } from "../../../../../src/ts/type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../../../../src/ts/utility/timeUtility";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import {webhookURL} from "./secret.json"
//#NOTE これの実行には{webhookURL:string}型のオブジェクトが記述されたjsonファイルを書き込んでおく必要がある。

export class DiscordWebhookers{
    private readonly host:string = "https://localhost:5000"
    private readonly recordDatabase:RecordDataBase
    constructor(recordDatabase:RecordDataBase){
        this.recordDatabase = recordDatabase;
    }
    async sendRecordRegisteredMessage(record:IRecordResolved){
        const rr = record.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        const userIconURL = (await this.recordDatabase.getRunnerInfo(record.id)).photoURL;
        fetch(webhookURL,{
            method:"POST",
            body:JSON.stringify({
                content: `:mailbox_with_mail: New Post! @${gameSystem.English}/${gameMode.English}`,
                embeds:{
                    title:`KSSRs/${rrg.gameSystemName}/${rrg.gameModeName}/${rr.targetName}`,
                    url:`${this.host}/record/${rrg.gameSystemID}/${rrg.gameModeID}/${record.id}`,
                    author:{
                        name:record.runnerName,
                        url:`${this.host}/user/${record.runnerID}`,
                        icon_url:userIconURL
                    },
                    footer:{
                        text:"Kirby-Speed/Score-Recorders",
                        url:this.host
                    },
                    field:[{
                        name:`:star: Ability`,
                        value:rr.abilityNames.join(`,`)
                    },
                    {
                        name:`:flag_white: Target`,
                        value:rr.targetName
                        
                    },{
                        name:`:clock3: ${gameMode.scoreType === "time" ? "Time" : "Score"}`,
                        value: gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(record.score) : record.score
                    }]
                },
                
            })
        })
    }
    async sendRecordRemovedMessage(uid:string,record:IRecord,recordResolved:IRecordResolved){
        const rr = recordResolved.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        const userIconURL = (await this.recordDatabase.getRunnerInfo(recordResolved.id)).photoURL;
        const deletedBy = (await this.recordDatabase.getRunnerInfo(uid)).English;

        fetch(webhookURL,{
            
            method:"POST",
            body:JSON.stringify({
                content: `:closed_book: Record Deleted By ${deletedBy} @${gameSystem.English}/${gameMode.English}\nThe following JSON string is the data of the deleted Record.\n\n\`\`\`${JSON.stringify(recordResolved)}\`\`\``,
                embeds:{
                    title:`Deleted Record Information >> KSSRs/${rrg.gameSystemName}/${rrg.gameModeName}/${rr.targetName}`,
                    author:{
                        name:recordResolved.runnerName,
                        url:`${this.host}/user/${deletedBy}`,
                        icon_url:userIconURL
                    },
                    footer:{
                        text:"Kirby-Speed/Score-Recorders",
                        url:this.host
                    },
                    field:[{
                        name:`:star: Ability`,
                        value:rr.abilityNames.join(`,`)
                    },
                    {
                        name:`:flag_white: Target`,
                        value:rr.targetName
                        
                    },{
                        name:`:clock3: ${gameMode.scoreType === "time" ? "Time" : "Score"}`,
                        value: gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(recordResolved.score) : recordResolved.score
                    }]
                },
                
            })
        })
    }
    
}