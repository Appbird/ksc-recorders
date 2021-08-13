import { IRecord, IRecordResolved } from "../../../../../src/ts/type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../../../../src/ts/utility/timeUtility";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import {webhookURL} from "../../secret.json"
import fetch from "node-fetch";
import { IGameModeItemWithoutCollections, ScoreType } from "../../../../../src/ts/type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../../../src/ts/type/list/IGameSystemInfo";
//#NOTE これの実行には{webhookURL:string}型のオブジェクトが記述されたjsonファイルを書き込んでおく必要がある。
//#CTODO こいつがちゃんと投稿されるか確認する。
//#NOTE 
//*> https://discohook.org/ を使用しました。

export class Notifier{
    private readonly host:string = "https://kss-recorders.web.app"
    private readonly recordDatabase:RecordDataBase
    constructor(recordDatabase:RecordDataBase){
        this.recordDatabase = recordDatabase;
    }
    private async sendMesssageToDiscord(type:"submit"|"verify"|"add"|"delete",{attached=null,content,record,gameMode,gameSystem,colorcode,userIconURL,scoreType,reason = ""}
        :{  content:string,attached?:string|null,
            record:IRecordResolved,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections
            userIconURL:string, scoreType:ScoreType,
            colorcode:number,reason?:string
        }){
            if (attached !== null) attached = `"${attached}"`
            await fetch(webhookURL[type],
                {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:`{
                    "content": ${attached},
                    "embeds": [
                      {
                        "title": "${content}",
                        "color": ${colorcode},
                        "url": "${this.host}/?state=detailView&gs=${gameSystem.id}&gm=${gameMode.id}&id=${record.id}",
                        "fields": [
                          {
                            "name": "${gameSystem.English}/${gameMode.English}",
                            "value":"ID : ${record.id}",
                            "inline": true
                          },
                          {
                            "name": "Runner",
                            "value": "${record.runnerName}",
                            "inline": true
                          },
                          {
                            "name": "${(scoreType === "time") ?  "Time":"Score"}",
                            "value": "${ (scoreType === "time") ? converseMiliSecondsIntoTime(record.score):record.score}",
                            "inline": true
                          },
                          {
                            "name": "Ability",
                            "value": "${record.regulation.abilityNames.join("\n")}",
                            "inline": true
                          },
                          {
                            "name": "Segment",
                            "value": "${record.regulation.targetName}",
                            "inline": true
                          }${
                              reason.length !== 0 ? `,{ "name": "Reason","value": "${reason.replace(/\"/g,`\"`)}","inline": false}`:""
                            }
                        ],
                        "author": {
                          "name": "By ${record.runnerName}",
                          "icon_url" : "${userIconURL}",
                          "url": "${this.host}/?state=userPageInWhole&id=${record.runnerID}"
                        },
                        "footer": {
                          "text": "Kirby-Speed/Score-Recorders",
                          "icon_url": "https://firebasestorage.googleapis.com/v0/b/kss-recorders.appspot.com/o/icon.png?alt=media&token=bcb35206-fc4c-4d04-b6cd-45bbab213cc9"
                        }
                      }
                    ]
                  }`
        })
        
    }
    async sendRecordRegisteredMessage(record:IRecordResolved){
        const rr = record.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const userIconURL = (await this.recordDatabase.getRunnerInfo(record.runnerID)).photoURL;
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        this.sendMesssageToDiscord("submit",{
            content: `:mailbox_with_mail: **New Submission!** (${record.id})`,
            gameSystem,gameMode,
            colorcode: 0xe4a112,
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
        //#CTODO これらのメッセージが送信されるかを確かめる
        //#CTODO ユーザーの通知数が更新されているかを確認
        if (uid === recordResolved.runnerID) {
            await recordDataBase.sendNotification(recordResolved.runnerID,{
                postedDate:Date.now(),
                iconCSSClass:"fas fa-eraser u-redChara",
                id:"",
                Japanese:`<u>[**記録**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} )が<u>[**${deletedBy}**](${this.host}/?state=userPageInWhole&id=${uid})</u>によって削除されました。削除されたデータはDiscordにて通知されています。` + ((reason.length !== 0) ? `\n\n[理由]\n\n${reason}` : ""),
                English:`<u>[**Record**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} ) is modified by <u>[**${deletedBy}**](${this.host}/?state=userPageInWhole&id=${uid})</u>. Reverification is required.` + ((reason.length !== 0) ? `\n\n[reason]\n\n${reason}` : ""),
                from:{
                    Japanese:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`,
                    English:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`
                }
            })
        }
        await this.sendMesssageToDiscord("delete",{
            content: `:closed_book: ${(recordResolved.moderatorIDs.length === 0) ? "Offer" : "Record"} ${record.id} is **Deleted.**`,
            colorcode: 0x3b00d1,gameSystem,gameMode,
            record: recordResolved,reason,attached:`The following JSON string is the data of the deleted Record.\`\`\`${JSON.stringify(record)}\`\`\``,
            scoreType: gameMode.scoreType,userIconURL
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
                Japanese:`<u>[**記録**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} )が<u>[**${modifiedBy}**](${this.host}/?state=userPageInWhole&id=${uid})</u>によって修正されました。再認証が必要です。` + ((reason.length !== 0) ? `\n\n[理由]\n\n${reason}` : ""),
                English:`<u>[**Record**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} ) is modified by <u>[**${modifiedBy}**](${this.host}/?state=userPageInWhole&id=${uid})</u>. Reverification is required.` + ((reason.length !== 0) ? `\n\n[reason]\n\n${reason}` : ""),
                from:{
                    Japanese:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`,
                    English:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`
                }
            })
        }

        await this.sendMesssageToDiscord("submit",{
            content: `:closed_book: Record ${recordResolved.id} is **Modified.**`,
            colorcode: 0xe4a112,gameSystem,gameMode,
            record: recordResolved,reason,
            scoreType: gameMode.scoreType,userIconURL
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
                Japanese:`<u>[**記録**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${record.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} )が<u>[**${moderatorName}**](${this.host}/?state=userPageInWhole&id=${moderatorID})</u>によって承認されました！`,
                English:`<u>[**Record**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${record.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} ) is verified by <u>[**${moderatorName}**](${this.host}/?state=userPageInWhole&id=${moderatorID})</u>!`,
                from:{
                    Japanese:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`,
                    English:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`
                }
            })
        }
        await this.sendMesssageToDiscord("verify",{
            content: `:mailbox_with_mail: Record ${record.id} is **Verified.**`,
            colorcode: 0x5ad100,gameSystem,gameMode,
            record: record,
            scoreType: gameMode.scoreType,userIconURL
        })
        
    }
    
}