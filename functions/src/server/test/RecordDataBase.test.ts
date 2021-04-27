
import { IRecord } from "../../../../src/ts/type/record/IRecord";
import * as assert from "assert";
import { recordDataBase } from "../mockDataBase/RecordDataBase"
import { checkEqualityBetweenArraysWithConsoleMsg } from "../../../../src/ts/utility/arrayUtility";
import { OrderOfRecordArray } from "../../../../src/ts/type/record/OrderOfRecordArray";
const database = recordDataBase;
describe("正しく記録が選別されるか", () =>{
    //[x] これらのテストコードの実装
    //[x] こいつらをどういう配置にしてコンパイルするか…を考えたい！
    //[x] 挙動の確認
    //[x] Firestoreの物に切り替えてもしっかりとチェックが通るかを確認
    it("能力IDに2を含む記録を早い順で2件取り出す", async () =>{
        //*> [1,3]
        assert.ok(
            checkF(["1","3"],"0","0","LowerFirst","AND",["2"])
        );
    })
    it("能力IDに2を含む記録を遅い順で2件取り出す", async () =>{
        //*> [2,3]
        assert.ok(
            checkF(["2","3"],"0","0","HigherFirst","AND",["2"])
        );
    })
    it("能力IDに2を含む記録を新しい投稿順で2件取り出す", async () =>{
        //*> [2,3]
        assert.ok(
            checkF(["2","3"],"0","0","LaterFirst","AND",["2"])
        );
    })
    it("能力IDに1,2をどちらも含む記録を取り出す", async () => {
        //*> [3,2]
        assert.ok(
            checkF(["3","2"],"0","0","LowerFirst","AND",["1","2"])
        );
    })
    it("能力IDに1,2をいずれか含む記録を取り出す", async () => {
        //*> [1,3,2]
        assert.ok(
            checkF(["1","3","2"],"0","0","LowerFirst","OR",["1","2"])
        );

    })
    it("対象IDが1である記録を取り出す", async () =>{
        //*> [1,2]
        assert.ok(
            checkF(["1","2"],"0","0","LowerFirst","AND",undefined,["1"],undefined)
        );
    })
    it("走者IDが1である記録を取り出す", async () =>{
        //*> [2]
        assert.ok(
            checkF(["2"],"0","0","LowerFirst","AND",undefined,undefined,["1"])
        )
    })
    it("記録IDが2である記録を取り出す",async ()=>{
        //*> idが2の記録
        assert.ok((await database.getRecord("0","0","2")).id === "2");
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
    runnerIDs?:string[]
){
    checkEqualityBetweenArraysWithConsoleMsg(converseIntoIDs(await database.getRecordsWithCondition(gameSystemID,gameModeID,order,abilityIDsCondition,abilityIDs,targetIDs,runnerIDs)),expectedRecordIDs)
}