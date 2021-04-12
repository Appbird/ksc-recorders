import { IRecord } from "../../type/record/IRecord";
import assert  from "assert";
import { recordDataBase } from "../firestore/RecordDataBase"
import { checkEqualityBetweenArraysWithConsoleMsg } from "../../utility/arrayUtility";
import { OrderOfRecordArray } from "../type/OrderOfRecordArray";
const database = recordDataBase;

const workID = "fpNF4dAftZV2ffQJLvv6"
const modeID = "OkXl20WqP6KKVnHeM31O"
const _recordIDs = ["dEM2ZqreBJWFlPBi1DKP","OSisCLCeVulU1YvCjbkN","x9uswxT60LwBj3mANb79","a63aPqWLoxPLAYLAdsIa"];
const _abilityIDs = ["fFP6AoTUpj0g2XuRaED1","wSRE6MPhAxotO4lvQP6V","qjHvv97ajO0B4c3FgpUF"]
const _targetIDs = ["uqfq8ggNMxmQOk6OPQfs","a0OVgCEoigK3zgG25J1V","wH2m8P6Nnm1TuouFIFyj"]
const _runnerIDs = ["6RVv7FuJmFTeV6yUlmSu","NdAjJP82wpsoZeQiMWQx","O0mzND0yxOuTko7zWPga"]
describe("正しく記録が選別されるか", () =>{
    //[x] これらのテストコードの実装
    //[x] こいつらをどういう配置にしてコンパイルするか…を考えたい！
    //[x] 挙動の確認
    //[x] Firestoreの物に切り替えてもしっかりとチェックが通るかを確認
    it("無条件でデータを取り出す。", async () =>{
        //*> [0,1,3,2]
        assert.ok(
            await checkF([0,1,3,2],workID,modeID,"LowerFirst","OR",[],[],[])
        );
    })
    //[x]ここのエラーの修正
    it("能力IDに2を含む記録を早い順で取り出す", async () =>{
        //*> [1,3,2]
        assert.ok(
            await checkF([1,3,2],workID,modeID,"LowerFirst","OR",[2],[],[])
        );
    })
    it("能力IDに2を含む記録を新しい投稿順で取り出す", async () =>{
        //*> [2,3]
        assert.ok(
            await checkF([2,1,3],workID,modeID,"LaterFirst","OR",[2],[],[])
        );
    })
    it("能力IDに1,2をどちらも含む記録を取り出す", async () => {
        //*> [3,2]
        assert.ok(
            await checkF([3,2],workID,modeID,"LowerFirst","AND",[1,2])
        );
    })
    it("能力IDに1,2をいずれか含む記録を取り出す", async () => {
        //*> [1,3,2]
        assert.ok(
            await checkF([1,3,2],workID,modeID,"LowerFirst","OR",[1,2])
        );

    })
    it("対象IDが1である記録を取り出す", async () =>{
        //*> [1,2]
        assert.ok(
            await checkF([1,2],workID,modeID,"LowerFirst","OR",undefined,[1],undefined)
        );
    })
    it("走者IDが1である記録を取り出す", async () =>{
        //*> [2]
        assert.ok(
            await checkF([2],workID,modeID,"LowerFirst","OR",undefined,undefined,[1])
        )
    })
    it("記録IDが2である記録を取り出す",async ()=>{
        //*> idが2の記録
        assert.ok((await database.getRecord(workID,modeID,_recordIDs[2])).id === "2");
    })
}
)

function converseIntoIDs(records:IRecord[]){
    return records.map((record) => record.id);
}
async function checkF(expectedRecordIDs:number[],
    gameSystemID:string, gameModeID:string,
    order:OrderOfRecordArray,
    abilityIDsCondition: "AND" | "OR" | "AllowForOrder",
    abilityIDs:number[] = [],
    targetIDs:number[] = [],
    runnerIDs:number[] = [],
    limits:number = 10
){
    try {
        return checkEqualityBetweenArraysWithConsoleMsg(converseIntoIDs(
                (await database.getRecordsWithCondition(
                gameSystemID,gameModeID,order,
                abilityIDsCondition,
                abilityIDs.map( (ele) => _abilityIDs[ele]),
                targetIDs.map( (ele) => _targetIDs[ele]),
                runnerIDs.map( (ele) => _runnerIDs[ele])
                )).slice(0,limits)),expectedRecordIDs.map((expectedRecordID) => _recordIDs[expectedRecordID]))
    }catch(error){
        console.log(error)
        return false;
    }
}