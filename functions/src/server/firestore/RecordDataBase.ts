import { IRecord, IRecordWithoutID } from "../../../../src/ts/type/record/IRecord";
import { INotificationItem, IRunner, IRunnerEditable } from "../../../../src/ts/type/record/IRunner";
import { IHashTagItem, IGameSystemInfoWithoutCollections } from "../../../../src/ts/type/list/IGameSystemInfo";
import { OrderOfRecordArray } from "../../../../src/ts/type/record/OrderOfRecordArray";
import { IGameModeItemWithoutCollections, ScoreType } from "../../../../src/ts/type/list/IGameModeItem";
import { IGameDifficultyItem } from "../../../../src/ts/type/list/IGameDifficultyItem";
import { ITargetItem } from "../../../../src/ts/type/list/ITargetItem";
import { IAbilityItem } from "../../../../src/ts/type/list/IAbilityItem";
import { LanguageInApplication } from "../../../../src/ts/type/LanguageInApplication";
import { IItemOfResolveTableToName } from "../../../../src/ts/type/list/IItemOfResolveTableToName";
import { firebaseAdmin } from "../function/firebaseAdmin";
import { createDefaultUserData } from "../utility";
import { SearchTypeForVerifiedRecord } from "../../../../src/ts/type/record/SearchCondition";


//[x] getRecordsWithConditionメソッドの実装
export class RecordDataBase{
    private dataBase:FirebaseFirestore.Firestore;
    constructor(){
        this.dataBase = firebaseAdmin.firestore;
    }
    
    private getRunnersRef = () => this.dataBase.collection("runners");
    
    private getGameSystemCollectionRef = () => this.dataBase.collection("titles");
    
    private getGameSystemRef = (gameSystemID:string) => this.dataBase.collection("titles").doc(gameSystemID);
    
    private getGameModeRef = (gameSystemID:string,gameModeID:string) => this.getGameSystemCollectionRef().doc(gameSystemID).collection("modes").doc(gameModeID);
    
    

    private async getCollection<T extends IItemOfResolveTableToName>(ref:FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>):Promise<T[]>{
        const result = await ref.get()
        if (result.empty) throw new Error(`[Not Found] コレクション ${ref.path} が存在しません。`);
        return result.docs.map(doc => doc.data()) as T[];
    }
    private async getDoc<T extends IItemOfResolveTableToName>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>):Promise<T>{
        const result = await ref.get()
        if (!result.exists) throw new Error(`[Not Found] ドキュメント ${ref.path} が存在しません。`);
        return result.data() as T;
    }
    private async writeDoc<T extends IItemOfResolveTableToName>(ref:FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,object:T):Promise<string>{
        const result = await ref.add(object);
        await ref.doc(result.id).set({...object,id:result.id});
        return result.id;
    }
    private async modifyDoc<T extends IItemOfResolveTableToName>(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,object:T):Promise<void>{
        object.id = ref.id;
        await ref.set(object);
    }
    private async deleteDoc(ref:FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>):Promise<void>{
        ref.delete();
    }

    getGameSystemCollection = () => this.getCollection<IGameSystemInfoWithoutCollections>(this.getGameSystemCollectionRef())
    getGameSystemInfo       = (gameSystemID:string) => this.getDoc<IGameSystemInfoWithoutCollections>(this.getGameSystemCollectionRef().doc(gameSystemID))
    writeGameSystemInfo     = (obj:IGameSystemInfoWithoutCollections) => this.writeDoc<IGameSystemInfoWithoutCollections>(this.getGameSystemCollectionRef(),obj)
    modifyGameSystemInfo    = (gameSystemID:string,obj:IGameSystemInfoWithoutCollections) => this.modifyDoc<IGameSystemInfoWithoutCollections>(this.getGameSystemCollectionRef().doc(gameSystemID),obj)
    deleteGameSystemInfo    = (gameSystemID:string) => this.deleteDoc(this.getGameSystemCollectionRef().doc(gameSystemID))

    getGameModeCollection   = (gameSystemID:string) => this.getCollection<IGameModeItemWithoutCollections>(this.getGameSystemRef(gameSystemID).collection("modes"))
    getGameModeInfo         = (gameSystemID:string,gameModeID:string) => this.getDoc<IGameModeItemWithoutCollections>(this.getGameModeRef(gameSystemID,gameModeID))
    writeGameModeInfo       = (gameSystemID:string,obj:IGameModeItemWithoutCollections) => this.writeDoc<IGameModeItemWithoutCollections>(this.getGameSystemRef(gameSystemID).collection("modes"),obj)
    modifyGameModeInfo      = (gameSystemID:string,gameModeID:string,obj:IGameModeItemWithoutCollections) => this.modifyDoc<IGameModeItemWithoutCollections>(this.getGameModeRef(gameSystemID,gameModeID),obj)
    deleteGameModeInfo      = (gameSystemID:string,gameModeID:string) => this.deleteDoc(this.getGameModeRef(gameSystemID,gameModeID))

    getGameDifficultyCollection     = (gameSystemID:string,gameModeID:string) => this.getCollection<IGameDifficultyItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("difficulties"))
    getGameDifficultyInfo           = (gameSystemID:string,gameModeID:string,id:string) => this.getDoc<IGameDifficultyItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("difficulties").doc(id))
    writeGameDifficultyInfo         = (gameSystemID:string,gameModeID:string,obj:IGameDifficultyItem) => this.writeDoc<IGameDifficultyItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("difficulties"),obj)
    modifyGameDifficultyInfo        = (gameSystemID:string,gameModeID:string,id:string,obj:IGameDifficultyItem) => this.modifyDoc<IGameDifficultyItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("difficulties").doc(id),obj)
    deleteGameDifficultyInfo        = (gameSystemID:string,gameModeID:string,id:string) => this.deleteDoc(this.getGameModeRef(gameSystemID,gameModeID).collection("difficulties").doc(id))
    
    getAbilityCollection    = (gameSystemID:string,gameModeID:string) => this.getCollection<IAbilityItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("abilities"))
    getAbilityInfo          = (gameSystemID:string,gameModeID:string,id:string) => this.getDoc<IAbilityItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("abilities").doc(id))
    writeAbilityInfo        = (gameSystemID:string,gameModeID:string,obj:IAbilityItem) => this.writeDoc<IAbilityItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("abilities"),obj)
    modifyAbilityInfo       = (gameSystemID:string,gameModeID:string,id:string,obj:IAbilityItem) => this.modifyDoc<IAbilityItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("abilities").doc(id),obj)
    deleteAbility           = (gameSystemID:string,gameModeID:string,id:string) => this.deleteDoc(this.getGameModeRef(gameSystemID,gameModeID).collection("abilities").doc(id))
    
    getTargetCollection     = (gameSystemID:string,gameModeID:string) => this.getCollection<ITargetItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("targets"))
    getTargetInfo           = (gameSystemID:string,gameModeID:string,id:string) => this.getDoc<ITargetItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("targets").doc(id))
    writeTargetInfo         = (gameSystemID:string,gameModeID:string,obj:ITargetItem) => this.writeDoc<ITargetItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("targets"),obj)
    modifyTargetInfo        = (gameSystemID:string,gameModeID:string,id:string,obj:ITargetItem) => this.modifyDoc<ITargetItem>(this.getGameModeRef(gameSystemID,gameModeID).collection("targets").doc(id),obj)
    deleteTargetInfo           = (gameSystemID:string,gameModeID:string,id:string) => this.deleteDoc(this.getGameModeRef(gameSystemID,gameModeID).collection("targets").doc(id))
    
    getRunnerCollection     = () => this.getCollection<IRunner>(this.getRunnersRef())
    deleteRunnerInfo        = (uid:string) => this.deleteDoc(this.getRunnersRef().doc(uid))
    
    getHashTagCollection    = (gameSystemID:string) => this.getCollection<IHashTagItem>(this.getGameSystemRef(gameSystemID).collection("tags"))
    getHashTagInfo          = (gameSystemID:string,id:string) => this.getDoc<IHashTagItem>(this.getGameSystemRef(gameSystemID).collection("tags").doc(id))
    writeHashTagInfo        = (gameSystemID:string,obj:IHashTagItem) => this.writeDoc<IHashTagItem>(this.getGameSystemRef(gameSystemID).collection("tags"),obj)
    modifyHashTagInfo       = (gameSystemID:string,id:string,obj:IHashTagItem) => this.modifyDoc<IHashTagItem>(this.getGameSystemRef(gameSystemID).collection("tags").doc(id),obj)
    deleteHashTagInfo       = (gameSystemID:string,id:string) => this.deleteDoc(this.getGameSystemRef(gameSystemID).collection("tags").doc(id))
    
    getRunnerInfo           = async (uid:string):Promise<IRunner> => {
        const info = await this.getRunnersRef().doc(uid).get()
        const infoLimitedWrite = await this.getRunnersRef().doc(uid).collection("limitedWrite").doc("onlyServerOperation").get()
        
        if (info.exists) return {...info.data(),...infoLimitedWrite.data()} as IRunner;
        const user = await firebaseAdmin.auth.getUser(uid)
        const userData = createDefaultUserData(user);
        this.writeRunnerInfo(uid,userData,{privateDocWrite:true});
        return userData
    }

    writeRunnerInfo = (uid:string,obj:IRunner,{privateDocWrite}:{
        privateDocWrite:boolean
    }) => {
        const {Japanese,English,JDescription,EDescription,twitterLink,youtubeLink,photoURL,numberOfUnreadNotification,...Uneditabledata}:IRunner = obj;
        const data:IRunnerEditable = {Japanese,English,twitterLink,youtubeLink,photoURL,numberOfUnreadNotification}
        if (JDescription !== undefined) obj.JDescription = JDescription;
        if (EDescription !== undefined) obj.EDescription = EDescription;
        this.getRunnersRef().doc(uid).set(data)
        if (privateDocWrite) this.getRunnersRef().doc(uid).collection("limitedWrite").doc("onlyServerOperation").set(Uneditabledata)

    }

    modifyRunnerInfo = this.writeRunnerInfo
    async readNotificationsOfRunner(uid:string){
        const runnerInfo = await recordDataBase.getRunnerInfo(uid)
        await recordDataBase.writeRunnerInfo(uid,{...runnerInfo,numberOfUnreadNotification:0},{privateDocWrite:false});
        return;
    }
    sendNotification = async (uid:string,item:INotificationItem) => {
        this.writeDoc<INotificationItem>(this.getRunnersRef().doc(uid).collection("notifications"),item)
        const runnerInfo = await recordDataBase.getRunnerInfo(uid)
        runnerInfo.numberOfUnreadNotification+=1;
        await recordDataBase.writeRunnerInfo(uid,runnerInfo,{privateDocWrite:false});
        return;
    }


    async searchHashTag(gameSystemID:string,names:string[],language:LanguageInApplication):Promise<(IHashTagItem|undefined)[]>{
        if (names.length > 10) throw new Error("指定するIDが多すぎます。")
        const result = await this.getGameSystemRef(gameSystemID).collection("tags")
                                .where(language,"in",names)    
                                .get();
        const tags = result.docs as unknown as IHashTagItem[]
        return names.map( (name) => tags.find((tag) => tag[language] === name))
    }
    

    async getRecord(gameSystemID:string,gameModeID:string,recordID:string):Promise<IRecord>{
        const result = await this.getGameModeRef(gameSystemID,gameModeID).collection("records").doc(recordID).get();
        const record = result.data() as IRecord | undefined;
        if (!result.exists || record === undefined) throw new Error(`指定されたゲームID${gameSystemID},モードID${gameModeID}内の記録ID${recordID}に対応するモードが存在しません。`);
        return {...record, id:result.id};
    }

    async getRecordsWithCondition(gameSystemID:string, gameModeID:string,
        order:OrderOfRecordArray ,
        abilityIDsCondition: "AND" | "OR" | "AllowForOrder" = "AND",
        abilityIDs:string[] = [],
        targetIDs:string[] = [],
        runnerIDs:string[] = [],
        searchTypeForVerifiedRecord:SearchTypeForVerifiedRecord = "OnlyVerified"
    ):Promise<IRecord[]>{
        if (abilityIDs.length > 10 || targetIDs.length > 10 || runnerIDs.length > 10) throw Error(`能力(${abilityIDs.length}つ),計測対象(${targetIDs.length}つ),走者(${runnerIDs.length}つ)のうちいずれかの条件指定が10個よりも多いです。`)
        
        console.log(`[${new Date().toUTCString()}] 以下の条件で検索を開始します。\n\u001b[33m gameSystemID:${gameSystemID}, gameModeID:${gameModeID}, order:${order}, abilityIDsCondition:${abilityIDsCondition}, abilityIDs:[${abilityIDs}] (${abilityIDs.length}), targetIDs:[${targetIDs}] (${targetIDs.length}), runnerIDs:[${runnerIDs}] (${runnerIDs.length}) \u001b[0m`)
        
        //[x] undefinedは指定なしとみなし、与えられた条件のうちで「早い順で」start件目からlimit件のデータをグループとして取り出す。(0スタート)
        let recordsQuery:FirebaseFirestore.Query = this.getGameModeRef(gameSystemID,gameModeID).collection("records");

        if (abilityIDs.length !== 0) recordsQuery = this.addQueryAboutAbilityIDs(recordsQuery,abilityIDsCondition,abilityIDs)
        if (targetIDs.length !== 0) recordsQuery = recordsQuery.where("regulation.targetID","in",targetIDs)
        if (runnerIDs.length !== 0) recordsQuery = recordsQuery.where("runnerID","in",runnerIDs)

            const recordsQuerySnapshot = await recordsQuery.get();
            //#NOTE 本当はrecordsの構造が正しいかを確認しなくてはならないが、データベースに登録されているデータに不正な構造であるドキュメントが交じる可能性が低く、また、このデータがどう使われるかも踏まえるとチェックするメリットが薄いと判断したため型アサーションを利用した。
            let records = recordsQuerySnapshot.docs.map( (doc) => {
                const data = doc.data(); data.id = doc.id; return data;
            }) as IRecord[]
        if (recordsQuerySnapshot.empty) console.info("条件に該当する記録が存在しませんでした。")

        //#NOTE abilityIDsでAND検索を行った場合の補填をここでする。
        if (abilityIDsCondition === "AND") records = records.filter( (record) => abilityIDs.every( (abilityID) => record.regulation.abilityIDs.includes(abilityID)) )
        //#NOTE 未承認の記録についての取扱い
        if (searchTypeForVerifiedRecord !== "All"){
            const filter = searchTypeForVerifiedRecord === "OnlyVerified" ? 
                (record:IRecord) => record.moderatorIDs.length !== 0 :
                (record:IRecord) => record.moderatorIDs.length === 0
            records = records.filter(filter)
        }

        return records.sort((a,b) => this.sortFunction(a,b,order));
    }
    private addQueryAboutAbilityIDs(recordQuery:FirebaseFirestore.Query,abilityIDsCondition: "AND" | "OR" | "AllowForOrder", abilityIDs:string[]):FirebaseFirestore.Query<FirebaseFirestore.DocumentData>{
        switch(abilityIDsCondition){
            case "AND":
                //#NOTE array-contains句は一つしか設定できずクエリでのAND検索が実装不可能であるため、必要条件のクエリとしてabilityIDs array-contains abilityIDs[0]をFirebase側に送り、のちに十分性をFunctionsサイドで補填する。
                return recordQuery.where("regulation.abilityIDs","array-contains",abilityIDs[0])
            case "OR":
                return recordQuery.where("regulation.abilityIDs","array-contains-any",abilityIDs)
            case "AllowForOrder":
                return recordQuery.where("regulation.abilityIDs","==",abilityIDs)
        }
    }
    private sortFunction(a:IRecord,b:IRecord,order:OrderOfRecordArray){
            switch(order){
                case "HigherFirst": return b.score - a.score;
                case "LowerFirst" : return a.score - b.score;
                case "LaterFirst": return b.timestamp_post - a.timestamp_post;
                case "EarlierFirst": return a.timestamp_post - b.timestamp_post;
                default : return 0;
            }
    }

    async verifyRecord(gameSystemID:string,gameModeID:string,recordID:string,moderatorID:string){
        const record = await this.getRecord(gameSystemID,gameModeID,recordID)
        record.moderatorIDs.push({id:moderatorID,date:Date.now()})
        console.log(`[${new Date().toUTCString()}:Verified] Record ${gameSystemID}/${gameModeID}/${recordID} is verified.`)
        await this.getGameModeRef(gameSystemID,gameModeID).collection("records").doc(recordID).set(record)
        return record;
    }

    //#NOTE Recordについてはデータ内部にidを含めない状態でデータベースに保存している。一方で、その他のデータ(TargetやAbilityなど)は内部にidを含めて保存している。
    async writeRecord(record:IRecordWithoutID):Promise<IRecord>{
        const rrg = record.regulation.gameSystemEnvironment;
        const result = await this.getGameModeRef(rrg.gameSystemID,rrg.gameModeID).collection("records").add({})
        const recordWithID:IRecord = {...record,id:result.id,moderatorIDs:[]}
        await this.getGameModeRef(rrg.gameSystemID,rrg.gameModeID).collection("records").doc(result.id).set(recordWithID)
        await this.refreshInfoWhenWriting(recordWithID)
        return recordWithID;
    }
    
    async removeRecord(gameSystemID:string,gameModeID:string,recordID:string){

        const modifiedHistoryRef = this.getGameModeRef(gameSystemID,gameModeID).collection("records").doc(recordID).collection("modifiedHistoryStack")
        const modifiedHistoryData = await modifiedHistoryRef.get();
        for (const doc of modifiedHistoryData.docs) doc.ref.delete();

        const ref = this.getGameModeRef(gameSystemID,gameModeID).collection("records").doc(recordID)
        await this.refreshInfoWhenRemoving(await this.getRecord(gameSystemID,gameModeID,recordID))
        await ref.delete();
        return;
    }
    
    async modifyRecord(recordID:string,modifierID:string,record:IRecordWithoutID):Promise<IRecord>{
        const rrg = record.regulation.gameSystemEnvironment
        
        const ref =  this.getGameModeRef(rrg.gameSystemID,rrg.gameModeID).collection("records").doc(recordID);
        const recordModifiedHistoryRef = ref.collection("modifiedHistoryStack")
        const recordBeforeModified = await this.getRecord(rrg.gameSystemID,rrg.gameModeID,recordID);
        await recordModifiedHistoryRef.add({ modifierID:modifierID,timestamp:Date.now(),before:recordBeforeModified});
        
        const modifiedOffer:IRecord = {
            ...record,id:recordID,moderatorIDs:[]
        }
        await ref.set(modifiedOffer)
        await this.refreshInfoWhenEditing(modifiedOffer)
        return modifiedOffer;
    }
    async getModifiedHistoryStack(gameSystemID:string,gameModeID:string,recordID:string){
        return (await this.getGameModeRef(gameSystemID,gameModeID).collection("records").doc(recordID).collection("modifiedHistoryStack").get()).docs.map(doc => doc.data())
    }


    //#NOTE 以下は他のドキュメントとの情報の整合性を取るための処理
    //#NOTE 書き込み時
    private async refreshInfoWhenWriting(record:IRecord){
        const rr = record.regulation;
        const rrg = rr.gameSystemEnvironment;
        const runner = await this.getRunnerInfo(record.runnerID)
        const gameSystem  = await this.getGameSystemInfo(rrg.gameSystemID);
        const gameMode = await this.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID);
        let userHaveRunThisGameSystem = runner.idOfGameSystemRunnerHavePlayed.find((info) => info.id === rrg.gameSystemID)
        let userHaveRunThisGameMode = runner.idOfGameModeRunnerHavePlayed.find((info) => info.id === `${rrg.gameSystemID}/${rrg.gameModeID}`)
        if (!userHaveRunThisGameSystem){
            userHaveRunThisGameSystem = {id:rrg.gameSystemID,times:1}
            runner.idOfGameSystemRunnerHavePlayed.push({id:rrg.gameSystemID,times:1})
        }   else userHaveRunThisGameSystem.times += 1;

        if (!userHaveRunThisGameMode){
            userHaveRunThisGameMode = {id:rrg.gameModeID,times:1}
            runner.idOfGameModeRunnerHavePlayed.push({id:`${rrg.gameSystemID}/${rrg.gameModeID}`,times:1})
        } else userHaveRunThisGameMode.times += 1;
        runner.theNumberOfPost++;

        await this.modifyGameSystemInfo(gameSystem.id,{
            ...gameSystem,
            recordsNumber:gameSystem.recordsNumber + 1,
            dateOfLatestPost:record.timestamp_post,
            runnersNumber: gameSystem.runnersNumber + ( userHaveRunThisGameSystem?.times === 1 ? 1 : 0 )
        })
        await this.modifyGameModeInfo(rrg.gameSystemID,rrg.gameModeID,{
            ...gameMode,
            dateOfLatestPost:record.timestamp_post,
            recordsNumber:gameMode.recordsNumber + 1,
            runnersNumber: gameMode.runnersNumber + ( userHaveRunThisGameMode?.times === 1 ? 1 : 0)
        })
        await this.writeRunnerInfo(record.runnerID,{
            ...runner,
            theDateOfLastPost:record.timestamp_post
        },{privateDocWrite:true})
       
        this.refreshFastestTableWhenWriting(record,runner,gameMode);
    }
    private async refreshFastestTableWhenWriting(record:IRecord,runner:IRunner,gameMode:IGameModeItemWithoutCollections){
        const rr = record.regulation;
        if (rr.abilityIDs.length !== 1) return;
        const rrg = rr.gameSystemEnvironment;
        const collectionRef = this.getGameModeRef(rrg.gameSystemID,rrg.gameModeID).collection("table");
        const itemRefOfFastestTable = collectionRef.where("target__ability","==",`${rr.targetID}__${rr.abilityIDs[0]}`);
        const fastestRecordIDResponse = (await itemRefOfFastestTable.get())
        if (!fastestRecordIDResponse.empty){
            const fastestScore = (fastestRecordIDResponse.docs[0].data()).score
            if (!( (gameMode.scoreType === "score" && fastestScore < record.score) || 
                (gameMode.scoreType === "time" && fastestScore > record.score))) return;
        }
        collectionRef.doc(`${rr.targetID}__${rr.abilityIDs[0]}`).set({
            target__ability:`${rr.targetID}__${rr.abilityIDs[0]}`,
            score:record.score,
            runnerInfo:{
                Japanese:runner.Japanese,
                English:runner.English
            },
            date:record.timestamp_post,
            recordID:record.id,
        })
    }

    //#NOTE 修正時
    private async refreshInfoWhenEditing(record:IRecord){
        const rr = record.regulation;
        if (rr.abilityIDs.length !== 1) return;
        const rrg = rr.gameSystemEnvironment;
        const gameMode = await this.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID);      

        const collectionRef = this.getGameModeRef(rrg.gameSystemID,rrg.gameModeID).collection("table");
        const itemRefOfFastestTable = collectionRef.where("target__ability","==",`${rr.targetID}__${rr.abilityIDs[0]}`);
        const fastestRecordIDResponse = (await itemRefOfFastestTable.get())

        if (fastestRecordIDResponse.empty || record.id !== fastestRecordIDResponse.docs[0].data().recordID) return;

        const tableID = fastestRecordIDResponse.docs[0].id
        this.refindFastestRecord(record,collectionRef.doc(tableID),gameMode.scoreType)
    }
    //#NOTE 削除時
    private async refreshInfoWhenRemoving(record:IRecord){
        const rr = record.regulation;
        const rrg = rr.gameSystemEnvironment;
        const runner = await this.getRunnerInfo(record.runnerID)
        const gameSystem  = await this.getGameSystemInfo(rrg.gameSystemID);
        const gameMode = await this.getGameModeInfo(rrg.gameSystemID,rrg.gameModeID);

        const gameSystemInfo = runner.idOfGameSystemRunnerHavePlayed.find((info) => info.id === rrg.gameSystemID)
        const gameModeInfo = runner.idOfGameModeRunnerHavePlayed.find((info) => info.id === `${rrg.gameSystemID}/${rrg.gameModeID}`)

        if (gameSystemInfo !== undefined) gameSystemInfo.times--;
        if (gameModeInfo !== undefined) gameModeInfo.times--;
        const userHaveRunThisGameSystemOnlyOnce = (gameSystemInfo?.times === 0)
        const userHaveRunThisGameModeOnlyOnce = (gameModeInfo?.times === 0)
        runner.theNumberOfPost--;
        await this.modifyGameSystemInfo(gameSystem.id,{
            ...gameSystem,
            recordsNumber:gameSystem.recordsNumber - 1,
            runnersNumber: gameSystem.runnersNumber - ( userHaveRunThisGameSystemOnlyOnce ? 1 : 0 )
        })
        await this.modifyGameModeInfo(rrg.gameSystemID,gameMode.id,{
            ...gameMode,
            recordsNumber:gameMode.recordsNumber - 1,
            runnersNumber: gameMode.runnersNumber - (userHaveRunThisGameModeOnlyOnce ? 1 : 0)
        })
        await this.modifyRunnerInfo(record.runnerID,{
            ...runner,
        },{privateDocWrite:true})
       
        this.refreshFastestTableWhenRemoving(record,gameMode.scoreType);
    }

    private async refreshFastestTableWhenRemoving(record:IRecord,scoreType:ScoreType){
        const rr = record.regulation;

        if (rr.abilityIDs.length !== 1) return;

        const rrg = rr.gameSystemEnvironment;
        const collectionRef = this.getGameModeRef(rrg.gameSystemID,rrg.gameModeID).collection("table");
        const itemRefOfFastestTable = collectionRef.where("target__ability","==",`${rr.targetID}__${rr.abilityIDs[0]}`);
        const fastestRecordIDResponse = (await itemRefOfFastestTable.get())

        if (fastestRecordIDResponse.empty || record.id !== fastestRecordIDResponse.docs[0].data().recordID) return;

        const tableID = fastestRecordIDResponse.docs[0].id
        this.refindFastestRecord(record,collectionRef.doc(tableID),scoreType)
        
    }

    //#NOTE 記録が修正/削除された際の記録
    private async refindFastestRecord(record:IRecord,docRefToTableElement:FirebaseFirestore.DocumentData,scoreType:ScoreType){
        const rr = record.regulation;
        if (rr.abilityIDs.length !== 1) return;
        const rrg = rr.gameSystemEnvironment;


        await docRefToTableElement.delete();
        const recordsInSameRegulation = await this.getRecordsWithCondition(rrg.gameSystemID,rrg.gameModeID,decideOrder(scoreType),"AllowForOrder",rr.abilityIDs,[rr.targetID],[])
        if (recordsInSameRegulation.length === 0) return;
        const fastestRecord = recordsInSameRegulation[0];
        const runnerOfFastestRecord = await this.getRunnerInfo(fastestRecord.runnerID);
        docRefToTableElement.set({
            target__ability:`${rr.targetID}__${rr.abilityIDs[0]}`,
            score:fastestRecord.score,
            runnerInfo:{
                Japanese:runnerOfFastestRecord.Japanese,
                English:runnerOfFastestRecord.English
            },
            date:fastestRecord.timestamp_post,
            recordID:fastestRecord.id,
        })
    }
}
function decideOrder(type:ScoreType){
    switch(type){
        case "score": return "HigherFirst";
        case "time":  return "LowerFirst";
    }
}


export const recordDataBase = new RecordDataBase();
