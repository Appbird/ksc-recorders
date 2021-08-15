import { IRecord, IRecordResolved } from "../../../../../src/ts/type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../../../../src/ts/utility/timeUtility";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import {webhookURL} from "../../secret.json"
import fetch from "node-fetch";
import { IGameModeItemWithoutCollections, ScoreType } from "../../../../../src/ts/type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../../../src/ts/type/list/IGameSystemInfo";
import { isProducedVersion } from "../../utility";
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
    private async sendMesssageToDiscord(type:"submit"|"verify"|"add"|"delete",{By,attached=null,msgIcon,Verb_ed,record,gameMode,gameSystem,colorcode,userIconURL,scoreType,reason = ""}
        :{  Verb_ed:string,attached?:string|null,By:{id:string,name:string,iconURL:string}
            record:IRecordResolved,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections
            userIconURL:string, scoreType:ScoreType,msgIcon:string,
            colorcode:number,reason?:string
        }){
            if (attached !== null) attached = `"${attached.replace(/\"/g,`'`)}"`
            const body = `{
                "content": ${attached},
                "embeds": [
                  {
                    "title": "${msgIcon} Record is **${Verb_ed}.**",
                    "color": ${colorcode},
                    "url": "${this.host}/?state=detailView&gs=${gameSystem.id}&gm=${gameMode.id}&id=${record.id}",
                    "fields": [
                      {
                        "name": "**__${gameSystem.English} / ${gameMode.English}__**",
                        "value":"ID : ${record.id}",
                        "inline": false
                      },
                      {
                        "name": "**__[ Runner ]__**",
                        "value": "${record.runnerName}",
                        "inline": true
                      },
                      {
                        "name": "**__[ ${(scoreType === "time") ?  "Time":"Score"} ]__**",
                        "value": "${ (scoreType === "time") ? converseMiliSecondsIntoTime(record.score):record.score}",
                        "inline": true
                      },
                      {
                        "name": "**__[ Ability ]__**",
                        "value": "${record.regulation.abilityNames.join("\n")}",
                        "inline": true
                      },
                      {
                        "name": "**__[ Segment ]__**",
                        "value": "${record.regulation.targetName}",
                        "inline": true
                      }${
                          reason.length !== 0 ? `,{ "name": "**__[ Reason ]__**","value": "${reason.replace(/\"/g,`\"`)}","inline": false}`:""
                        }
                    ],
                    "thumbnail":{
                        "url":"https://firebasestorage.googleapis.com/v0/b/kss-recorders.appspot.com/o/icon.png?alt=media&token=bcb35206-fc4c-4d04-b6cd-45bbab213cc9"
                    },
                    "author": {
                      "name": "Runner: ${record.runnerName}",
                      "url": "${this.host}/?state=userPageInWhole&id=${record.runnerID}",
                      "icon_url" : "${userIconURL}"
                    },
                    "timestamp": "${(new Date()).toISOString()}",
                    "footer": {
                      "text": "${Verb_ed} by ${By.name}",
                      "icon_url": "${By.iconURL}"
                    }
                  }
                ]
              }`
            await fetch( isProducedVersion() ? webhookURL[type] : webhookURL["test"],
                {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body
        })
        
    }
    async sendRecordRegisteredMessage(record:IRecordResolved){
        const rr = record.regulation
        const rrg = rr.gameSystemEnvironment
        const gameSystem = await this.recordDatabase.getGameSystemInfo(rrg.gameSystemID)
        const user = await this.recordDatabase.getRunnerInfo(record.runnerID)
        const userIconURL = user.photoURL;
        const gameMode = await this.recordDatabase.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID)
        this.sendMesssageToDiscord("submit",{
            msgIcon: `:mailbox_with_mail:`, Verb_ed:`Submitted`,
            gameSystem,gameMode,By:{id:record.runnerID,iconURL:userIconURL,name:user.English},
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
        const deletedBy = (await this.recordDatabase.getRunnerInfo(uid));
        const scoreInText =  gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(recordResolved.score) : recordResolved.score.toString();
        //#CTODO これらのメッセージが送信されるかを確かめる
        //#CTODO ユーザーの通知数が更新されているかを確認
        if (uid !== recordResolved.runnerID) {
            await recordDataBase.sendNotification(recordResolved.runnerID,{
                postedDate:Date.now(),
                iconCSSClass:"fas fa-eraser u-redChara",
                id:"",
                Japanese:`<u>[**記録**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} )が<u>[**${deletedBy.Japanese}**](${this.host}/?state=userPageInWhole&id=${uid})</u>によって削除されました。削除されたデータはDiscordにて通知されています。` + ((reason.length !== 0) ? `\n\n[理由]\n\n${reason}` : ""),
                English:`<u>[**Record**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} ) is modified by <u>[**${deletedBy.English}**](${this.host}/?state=userPageInWhole&id=${uid})</u>. Reverification is required.` + ((reason.length !== 0) ? `\n\n[reason]\n\n${reason}` : ""),
                from:{
                    Japanese:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`,
                    English:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`
                }
            })
        }
        await this.sendMesssageToDiscord("delete",{
            msgIcon: `:closed_book:`, Verb_ed:`Deleted`,
            colorcode: 0x3b00d1, gameSystem, gameMode,
            By:{id:uid,iconURL:deletedBy.photoURL,name:deletedBy.English},
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
        const modifiedBy = (await this.recordDatabase.getRunnerInfo(uid));
        const scoreInText = gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(recordResolved.score) : recordResolved.score.toString()
        
        if (uid !== recordResolved.runnerID) {
            await recordDataBase.sendNotification(recordResolved.runnerID,{
                postedDate:Date.now(),
                iconCSSClass:"fas fa-user-edit u-greenChara",
                id:"",
                Japanese:`<u>[**記録**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} )が<u>[**${modifiedBy.Japanese}**](${this.host}/?state=userPageInWhole&id=${uid})</u>によって修正されました。再認証が必要です。` + ((reason.length !== 0) ? `\n\n[理由]\n\n${reason}` : ""),
                English:`<u>[**Record**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${recordResolved.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} ) is modified by <u>[**${modifiedBy.English}**](${this.host}/?state=userPageInWhole&id=${uid})</u>. Reverification is required.` + ((reason.length !== 0) ? `\n\n[reason]\n\n${reason}` : ""),
                from:{
                    Japanese:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`,
                    English:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`
                }
            })
        }

        await this.sendMesssageToDiscord("submit",{
            msgIcon: `:closed_book:`, Verb_ed:`Modified`,
            colorcode: 0xe4a112,gameSystem,gameMode,By:{id:uid,iconURL:modifiedBy.photoURL,name:modifiedBy.English},
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
        const moderator = (await this.recordDatabase.getRunnerInfo(moderatorID))
        const scoreInText = gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(record.score) : record.score
        if (moderatorID !== record.runnerID) {
            await recordDataBase.sendNotification(record.runnerID,{
                postedDate:Date.now(),
                iconCSSClass:"fas fa-user-check u-blueChara",
                id:"",
                Japanese:`<u>[**記録**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${record.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} )が<u>[**${moderator.Japanese}**](${this.host}/?state=userPageInWhole&id=${moderatorID})</u>によって承認されました！`,
                English:`<u>[**Record**](${this.host}/?state=detailView&gs=${rrg.gameSystemID}&gm=${rrg.gameModeID}&id=${record.id})</u>(${scoreInText} : ${rr.abilityNames.join(", ")} - ${rr.targetName} ) is verified by <u>[**${moderator.English}**](${this.host}/?state=userPageInWhole&id=${moderatorID})</u>!`,
                from:{
                    Japanese:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`,
                    English:`KSSRs(${rrg.gameSystemName}/${rrg.gameModeName})`
                }
            })
        }
        await this.sendMesssageToDiscord("verify",{
            msgIcon: `:mailbox_with_mail:`, Verb_ed:`Verified`,
            colorcode: 0x5ad100,gameSystem,gameMode,By:{id:moderatorID,iconURL:moderator.photoURL,name:moderator.English},
            record: record,
            scoreType: gameMode.scoreType,userIconURL
        })
        
    }
    
}