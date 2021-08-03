import { IRecord, IRecordResolved } from "../../../../../src/ts/type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../../../../src/ts/utility/timeUtility";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import {webhookURL} from "./secret.json"
import fetch from "node-fetch";
//#NOTE これの実行には{webhookURL:string}型のオブジェクトが記述されたjsonファイルを書き込んでおく必要がある。
//#CTODO こいつがちゃんと投稿されるか確認する。
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
        const userIconURL = (await this.recordDatabase.getRunnerInfo(record.runnerID)).photoURL;
        await fetch(webhookURL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                color: 5620992,
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
        const userIconURL = (await this.recordDatabase.getRunnerInfo(recordResolved.runnerID)).photoURL;
        const deletedBy = (await this.recordDatabase.getRunnerInfo(uid)).English;

        await fetch(webhookURL,{
            
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                content: `:closed_book: Record Deleted By ${deletedBy} @${gameSystem.English}/${gameMode.English}\nThe following JSON string is the data of the deleted Record.\n\n\`\`\`${JSON.stringify(record)}\`\`\``,
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
    async sendRecordModifiedMessage(uid:string,beforeModified:IRecordResolved,recordResolved:IRecordResolved){
        const rr = recordResolved.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        const userIconURL = (await this.recordDatabase.getRunnerInfo(recordResolved.runnerID)).photoURL;
        const modifiedBy = (await this.recordDatabase.getRunnerInfo(uid)).English;
        await fetch(webhookURL,{
            
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                content: `:closed_book: Record Modified By ${modifiedBy} @${gameSystem.English}/${gameMode.English}`,
                embeds:{
                    title:`Deleted Record Information >> KSSRs/${rrg.gameSystemName}/${rrg.gameModeName}/${rr.targetName}`,
                    author:{
                        name:recordResolved.runnerName,
                        url:`${this.host}/user/${recordResolved.runnerName}`,
                        icon_url:userIconURL
                    },
                    footer:{
                        text:"Kirby-Speed/Score-Recorders",
                        url:this.host
                    },
                    field:[{
                        name:`:star: Ability`,
                        value:`ID (${beforeModified.regulation.abilityNames.join(",")}) >> ${rr.abilityIDs.join(`,`)}`
                    },
                    {
                        name:`:flag_white: Target`,
                        value:`ID (${beforeModified.regulation.targetName}) >> ${rr.targetID}`
                        
                    },{
                        name:`:clock3: ${gameMode.scoreType === "time" ? "Time" : "Score"}`,
                        value:`${gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(recordResolved.score) : recordResolved.score} >> ${gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(recordResolved.score) : recordResolved.score}`
                    }]
                },
                
            })
        })
    }

    async sendRecordModeratedMessage(record:IRecordResolved,moderatorID:string){
        const rr = record.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        const userIconURL = (await this.recordDatabase.getRunnerInfo(record.runnerID)).photoURL;
        const moderatorName = (await this.recordDatabase.getRunnerInfo(moderatorID)).English
        await fetch(webhookURL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                //#TODO 色を考える。
                color: 5620992,
                content: `:mailbox_with_mail: Record ${record.id} (from ${record.runnerName}) in @${gameSystem.English}/${gameMode.English} is verified by ${moderatorName}.`,
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
    
}