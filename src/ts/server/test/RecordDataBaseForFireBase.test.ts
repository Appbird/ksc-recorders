import { IRecord } from "../../type/record/IRecord";
import assert  from "assert";
import { RecordDataBase } from "../firestore/RecordDataBase"
import { checkEqualityBetweenArraysWithConsoleMsg } from "../../utility/arrayUtility";
import { OrderOfRecordArray } from "../type/OrderOfRecordArray";
const database = new RecordDataBase();
describe("正しく記録が選別されるか", () =>{
    //[x] これらのテストコードの実装
    //[x] こいつらをどういう配置にしてコンパイルするか…を考えたい！
    //[x] 挙動の確認
    //[x] Firestoreの物に切り替えてもしっかりとチェックが通るかを確認

    //[-]ここのエラーの修正
    const workID = "fpNF4dAftZV2ffQJLvv6"
    const modeID = "OkXl20WqP6KKVnHeM31O"
    it("能力IDに2を含む記録を早い順で2件取り出す", async () =>{
        //*> [1,3]
        assert.ok(
            checkF(["1","3"],workID,modeID,"LowerFirst","AND",["2"],[],[],2)
        );
    })
    it("能力IDに2を含む記録を遅い順で2件取り出す", async () =>{
        //*> [2,3]
        assert.ok(
            checkF(["2","3"],workID,modeID,"HigherFirst","AND",["2"],[],[],2)
        );
    })
    it("能力IDに2を含む記録を新しい投稿順で2件取り出す", async () =>{
        //*> [2,3]
        assert.ok(
            checkF(["2","3"],workID,modeID,"LaterFirst","AND",["2"],[],[],2)
        );
    })
    it("能力IDに1,2をどちらも含む記録を取り出す", async () => {
        //*> [3,2]
        assert.ok(
            checkF(["3","2"],workID,modeID,"LowerFirst","AND",["1","2"])
        );
    })
    it("能力IDに1,2をいずれか含む記録を取り出す", async () => {
        //*> [1,3,2]
        assert.ok(
            checkF(["1","3","2"],workID,modeID,"LowerFirst","OR",["1","2"])
        );

    })
    it("対象IDが1である記録を取り出す", async () =>{
        //*> [1,2]
        assert.ok(
            checkF(["1","2"],workID,modeID,"LowerFirst","AND",undefined,["1"],undefined)
        );
    })
    it("走者IDが1である記録を取り出す", async () =>{
        //*> [2]
        assert.ok(
            checkF(["2"],workID,modeID,"LowerFirst","AND",undefined,undefined,["1"])
        )
    })
    it("記録IDが2である記録を取り出す",async ()=>{
        //*> idが2の記録
        assert.ok((await database.getRecord(workID,modeID,"2")).id === "2");
    })
}
)

function converseIntoIDs(records:IRecord[]){
    return records.map((record) => record.id);
}
async function checkF(expectedRecordIDs:string[],
    gameSystemID:string, gameModeID:string,
    order:OrderOfRecordArray,
    abilityIDsCondition: "AND" | "OR" | "AllowForOrder",
    abilityIDs?:string[],
    targetIDs?:string[],
    runnerIDs?:string[],
    limits:number = 10
){
    checkEqualityBetweenArraysWithConsoleMsg(converseIntoIDs(await database.getRecordsWithCondition(gameSystemID,gameModeID,order,abilityIDsCondition,abilityIDs,targetIDs,runnerIDs).catch((e) => {console.error(e); return []})).slice(0,limits),expectedRecordIDs)
}