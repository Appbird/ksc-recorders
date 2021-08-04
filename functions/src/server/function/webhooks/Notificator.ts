import { IRecord, IRecordResolved } from "../../../../../src/ts/type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../../../../src/ts/utility/timeUtility";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import {webhookURL} from "./secret.json"
import fetch from "node-fetch";
import { ScoreType } from "../../../../../src/ts/type/list/IGameModeItem";
//#NOTE これの実行には{webhookURL:string}型のオブジェクトが記述されたjsonファイルを書き込んでおく必要がある。
//#CTODO こいつがちゃんと投稿されるか確認する。
export class Notificator{
    private readonly host:string = "https://localhost:5000"
    private readonly recordDatabase:RecordDataBase
    constructor(recordDatabase:RecordDataBase){
        this.recordDatabase = recordDatabase;
    }
    private async sendMesssageToDiscord({content,record,colorcode,userIconURL,scoreType}
        :{  content:string,
            record:IRecordResolved,
            userIconURL:string, scoreType:ScoreType,
            colorcode:number
        }){
            const rr = record.regulation
            const rrg = rr.gameSystemEnvironment
            await fetch(webhookURL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    color: colorcode,
                    content: content,
                    embeds:{
                        title: `KSSRs/${rrg.gameSystemName}/${rrg.gameModeName}/${rr.targetName}`,
                        url: `${this.host}/record/${rrg.gameSystemID}/${rrg.gameModeID}/${record.id}`,
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
                            value: rr.targetName
                            
                        },{
                            name:`:clock3: ${scoreType === "time" ? "Time" : "Score"}`,
                            value: scoreType === "time" ? converseMiliSecondsIntoTime(record.score) : record.score
                        }]
                    },
                    
                })
            })
    }
    async sendRecordRegisteredMessage(record:IRecordResolved){
        const rr = record.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const userIconURL = (await this.recordDatabase.getRunnerInfo(record.runnerID)).photoURL;
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        this.sendMesssageToDiscord({
            content: `:mailbox_with_mail: New Submission! @${gameSystem.English}/${gameMode.English}`,
            colorcode: 5620992,
            record: record,
            userIconURL: userIconURL,
            scoreType: gameMode.scoreType
        })
    }
    async sendRecordRemovedMessage(recordDataBase:RecordDataBase,uid:string,record:IRecord,recordResolved:IRecordResolved,reason:string=""){
        const rr = recordResolved.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        const userIconURL = (await this.recordDatabase.getRunnerInfo(recordResolved.runnerID)).photoURL;
        const deletedBy = (await this.recordDatabase.getRunnerInfo(uid)).English;
        const scoreInText =  gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(recordResolved.score) : recordResolved.score.toString();
        //#TODO これらのメッセージが送信されるかを確かめる
        //#TODO ユーザーの通知数が更新されているかを確認
        if (uid === recordResolved.runnerID) {
            await recordDataBase.sendNotification(recordResolved.runnerID,{
                postedDate:Date.now(),
                iconCSSClass:"fas fa-eraser u-redChara",
                id:"",
                Japanese:`<u>[**記録**](${this.host}/record/${rrg.gameSystemID}/${rrg.gameModeID}/${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} )が<u>[**${deletedBy}**](${this.host}/runner/${uid})</u>によって削除されました。削除されたデータはDiscordにて通知されています。` + ((reason.length !== 0) ? `\n\n[理由]\n\n${reason}` : ""),
                English:`<u>[**Record**](${this.host}/record/${rrg.gameSystemID}/${rrg.gameModeID}/${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} ) is modified by <u>[**${deletedBy}**](${this.host}/runner/${uid})</u>. Reverification is required.` + ((reason.length !== 0) ? `\n\n[reason]\n\n${reason}` : ""),
                from:{
                    Japanese:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`,
                    English:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`
                }
            })
        }
        await this.sendMesssageToDiscord({
            content: `:closed_book: ${(recordResolved.moderatorIDs.length === 0) ? "Offer" : "Record"} is Deleted By ${deletedBy} @${gameSystem.English}/${gameMode.English}\n\nThe following JSON string is the data of the deleted Record.\`\`\`${JSON.stringify(record)}\`\`\`` + ((reason.length !== 0) ? `\n\n**reason:**\n\n ${reason}\n\n` : ""),
            colorcode: 5620992,
            record: recordResolved,
            scoreType: gameMode.scoreType,userIconURL:userIconURL
        })
        
    }
    async sendRecordModifiedMessage(recordDataBase:RecordDataBase,uid:string,recordResolved:IRecordResolved,reason:string = ""){
        const rr = recordResolved.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        const userIconURL = (await this.recordDatabase.getRunnerInfo(recordResolved.runnerID)).photoURL;
        const modifiedBy = (await this.recordDatabase.getRunnerInfo(uid)).English;
        const scoreInText = gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(recordResolved.score) : recordResolved.score.toString()
        
        if (uid !== recordResolved.runnerID || true) {
            await recordDataBase.sendNotification(recordResolved.runnerID,{
                postedDate:Date.now(),
                iconCSSClass:"fas fa-user-edit u-greenChara",
                id:"",
                Japanese:`<u>[**記録**](${this.host}/record/${rrg.gameSystemID}/${rrg.gameModeID}/${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} )が<u>[**${modifiedBy}**](${this.host}/runner/${uid})</u>によって修正されました。再認証が必要です。` + ((reason.length !== 0) ? `\n\n[理由]\n\n${reason}` : ""),
                English:`<u>[**Record**](${this.host}/record/${rrg.gameSystemID}/${rrg.gameModeID}/${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} ) is modified by <u>[**${modifiedBy}**](${this.host}/runner/${uid})</u>. Reverification is required.` + ((reason.length !== 0) ? `\n\n[reason]\n\n${reason}` : ""),
                from:{
                    Japanese:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`,
                    English:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`
                }
            })
        }

        await this.sendMesssageToDiscord({
            content: `:closed_book: Record is Modified By ${modifiedBy} @${gameSystem.English}/${gameMode.English}`+ (reason.length !== 0) ? `\n\n**Reason:**\n\n ${reason}\n\n` : "",
            colorcode: 5620992,
            record: recordResolved,
            scoreType: gameMode.scoreType,userIconURL:userIconURL
        })
    }

    async sendRecordModeratedMessage(recordDataBase:RecordDataBase,record:IRecordResolved,moderatorID:string){
        const rr = record.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        const userIconURL = (await this.recordDatabase.getRunnerInfo(record.runnerID)).photoURL;
        const moderatorName = (await this.recordDatabase.getRunnerInfo(moderatorID)).English
        const scoreInText = gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(record.score) : record.score
        if (moderatorID !== record.runnerID || true) {
            await recordDataBase.sendNotification(record.runnerID,{
                postedDate:Date.now(),
                iconCSSClass:"fas fa-user-check u-blueChara",
                id:"",
                Japanese:`<u>[**記録**](${this.host}/record/${rrg.gameSystemID}/${rrg.gameModeID}/${record.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} )が<u>[**${moderatorName}**](${this.host}/runner/${moderatorID})</u>によって承認されました！`,
                English:`<u>[**Record**](${this.host}/record/${rrg.gameSystemID}/${rrg.gameModeID}/${record.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} ) is verified by <u>[**${moderatorName}**](${this.host}/runner/${moderatorID})</u>!`,
                from:{
                    Japanese:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`,
                    English:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`
                }
            })
        }
        await this.sendMesssageToDiscord({
            content: `:mailbox_with_mail: Record ${record.id} (from ${record.runnerName}) in @${gameSystem.English}/${gameMode.English} is verified by ${moderatorName}.`,
            colorcode: 5620992,
            record: record,
            scoreType: gameMode.scoreType,userIconURL:userIconURL
        })
        
    }
    
}