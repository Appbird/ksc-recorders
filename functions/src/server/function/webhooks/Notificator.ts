import { IRecord, IRecordResolved } from "../../../../../src/ts/type/record/IRecord";
import { converseMiliSecondsIntoTime } from "../../../../../src/ts/utility/timeUtility";
import {webhookURL} from "../../secret.json"
import fetch from "node-fetch";
import { IGameModeItemWithoutCollections, ScoreType } from "../../../../../src/ts/type/list/IGameModeItem";
import { IGameSystemInfoWithoutCollections } from "../../../../../src/ts/type/list/IGameSystemInfo";
import { isProducedVersion } from "../../utility";
import { writeAbilityNameWithAttribute } from "../../../../../src/ts/utility/ViewUtility";
import { GameSystemItemController } from "../../firestore/GameSystemController";
import { GameModeItemController } from "../../firestore/GameModeItemController";
import { RunnerCollectionController } from "../../firestore/RunnerCollectionController";
import { NotificationListController } from "../../firestore/NotificationListController";
//#NOTE これの実行には{webhookURL:string}型のオブジェクトが記述されたjsonファイルを書き込んでおく必要がある。
//#CTODO こいつがちゃんと投稿されるか確認する。
//#NOTE 
//*> https://discohook.org/ を使用しました。

export class Notifier{
    private readonly host:string = "https://kss-recorders.web.app"
    constructor(){

    }
    private async sendMesssageToDiscord(type:"submit"|"verify"|"add"|"delete",{By,attached="",msgIcon,Verb_ed,record,gameMode,gameSystem,colorcode,userIconURL,scoreType,reason = ""}
        :{  Verb_ed:string,attached?:string,By:{id:string,name:string,iconURL:string}
            record:IRecordResolved,gameSystem:IGameSystemInfoWithoutCollections,gameMode:IGameModeItemWithoutCollections
            userIconURL:string, scoreType:ScoreType,msgIcon:string,
            colorcode:number,reason?:string
        }){
            
            if (gameMode.DiscordRoleID !== undefined) attached = `<@&${gameMode.DiscordRoleID}> \n ${attached}`
            attached = attached.replace(/\"/g,`'`);
            const body = `{
                "content": ${(attached.length === 0) ? "null" : `"${attached}"`},
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
                        "value": "${record.regulation.abilityNames.map((ele,index) => writeAbilityNameWithAttribute(record.regulation,ele,index)).join(", ")}",
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

        const gameSystem    = await new GameSystemItemController().getInfo(rrg.gameSystemID)
        const gameMode      = await new GameModeItemController(rrg.gameSystemID).getInfo(rrg.gameModeID)
        const user          = await new RunnerCollectionController().getInfo(record.runnerID)
        const userIconURL   = user.photoURL;
        this.sendMesssageToDiscord("submit",{
            msgIcon: `:mailbox_with_mail:`, Verb_ed:`Submitted`,
            gameSystem,gameMode,By:{id:record.runnerID,iconURL:userIconURL,name:user.English},
            colorcode: 0xe4a112,
            record: record,
            userIconURL: userIconURL,
            scoreType: gameMode.scoreType
        })
    }
    async sendRecordRemovedMessage(uid:string,record:IRecord,recordResolved:IRecordResolved,reason:string=""){
        const rr = recordResolved.regulation
        const rrg = rr.gameSystemEnvironment

        const runnerC = new RunnerCollectionController()
        
        const gameSystem    = await new GameSystemItemController().getInfo(rrg.gameSystemID)
        const gameMode      = await new GameModeItemController(rrg.gameSystemID).getInfo(rrg.gameModeID)
        const user          = await runnerC.getInfo(record.runnerID)
        const userIconURL   = user.photoURL;
        const deletedBy     = (await runnerC.getInfo(uid));
        const scoreInText   =  gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(recordResolved.score) : recordResolved.score.toString();
        //#CTODO これらのメッセージが送信されるかを確かめる
        //#CTODO ユーザーの通知数が更新されているかを確認
        if (uid !== recordResolved.runnerID) {
            await new NotificationListController(recordResolved.runnerID).add({
                postedDate:Date.now(),
                iconCSSClass:"fas fa-eraser u-redChara",
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
    async sendRecordModifiedMessage(uid:string,recordResolved:IRecordResolved,reason:string = ""){
        const rr = recordResolved.regulation
        const rrg = rr.gameSystemEnvironment
        
        const runnerC = new RunnerCollectionController()

        const gameSystem    = await new GameSystemItemController().getInfo(rrg.gameSystemID)
        const gameMode      = await new GameModeItemController(rrg.gameSystemID).getInfo(rrg.gameModeID)
        const user          = await runnerC.getInfo(recordResolved.runnerID)
        const userIconURL   = user.photoURL;
        const modifiedBy    = (await runnerC.getInfo(uid));
        const scoreInText   = gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(recordResolved.score) : recordResolved.score.toString()
        
        if (uid !== recordResolved.runnerID) {
            await new NotificationListController(recordResolved.runnerID).add({
                postedDate:Date.now(),
                iconCSSClass:"fas fa-user-edit u-greenChara",
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

    async sendRecordModeratedMessage(record:IRecordResolved,moderatorID:string){
        const rr = record.regulation
        const rrg = rr.gameSystemEnvironment
        const runnerC = new RunnerCollectionController()

        const gameSystem    = await new GameSystemItemController().getInfo(rrg.gameSystemID)
        const gameMode      = await new GameModeItemController(rrg.gameSystemID).getInfo(rrg.gameModeID)
        const user          = await runnerC.getInfo(record.runnerID)
        const userIconURL   = user.photoURL;
        const moderator     = (await runnerC.getInfo(moderatorID));
        const scoreInText   = gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(record.score) : record.score
        if (moderatorID !== record.runnerID) {
            await new NotificationListController(record.runnerID).add({
                postedDate:Date.now(),
                iconCSSClass:"fas fa-user-check u-blueChara",
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