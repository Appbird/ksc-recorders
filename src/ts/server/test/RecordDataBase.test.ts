import { IRecord } from "../../type/record/IRecord";
import { exampleData } from "./exampledata";
import assert  from "assert";
import { RecordDataBase } from "../RecordDataBase"
import { checkEqualityBetweenArraysWithConsoleMsg } from "../../utility/arrayUtility";
const database = new RecordDataBase(exampleData);
describe("正しく記録が選別されるか", () =>{
    //[x] これらのテストコードの実装
    //[x] こいつらをどういう配置にしてコンパイルするか…を考えたい！
    //[x] 挙動の確認
    it("能力IDに2を含む記録を早い順で2件取り出す", () =>{
        //*> [1,3]
        assert.ok(
            checkEqualityBetweenArraysWithConsoleMsg(database.getRecordIDsWithCondition(0,"LowerFirst","AND",[2]),[1,3])
        );
    })
    it("能力IDに2を含む記録を遅い順で2件取り出す", () =>{
        //*> [2,3]
        assert.ok(
            checkEqualityBetweenArraysWithConsoleMsg(database.getRecordIDsWithCondition(0,"HigherFirst","AND",[2]), [2,3])
        );
    })
    it("能力IDに2を含む記録を新しい投稿順で2件取り出す", () =>{
        //*> [3,2]
        assert.ok(
            checkEqualityBetweenArraysWithConsoleMsg(database.getRecordIDsWithCondition(0,"LaterFirst","AND",[2]),[3,2])
        );
    })
    it("能力IDに1,2をどちらも含む記録を取り出す", () => {
        //*> [3,2]
        assert.ok(
            checkEqualityBetweenArraysWithConsoleMsg(database.getRecordIDsWithCondition(0,"LowerFirst","AND",[1,2]),[3,2])
        );
    })
    it("能力IDに1,2をいずれか含む記録を取り出す", () => {
        //*> [1,3,2]
        assert.ok(
            checkEqualityBetweenArraysWithConsoleMsg(database.getRecordIDsWithCondition(0,"LowerFirst","OR",[1,2]),[1,3,2])
        );

    })
    it("対象IDが1である記録を取り出す", () =>{
        //*> [1,2]
        assert.ok(
            checkEqualityBetweenArraysWithConsoleMsg(database.getRecordIDsWithCondition(0,"LowerFirst","AND",undefined,[1],undefined) ,[1,2])
        );
    })
    it("走者IDが1である記録を取り出す", () =>{
        //*> [2]
        assert.ok(
            checkEqualityBetweenArraysWithConsoleMsg(database.getRecordIDsWithCondition(0,"LowerFirst",
                                        "AND",undefined,undefined,[1]),[2])
        )
    })
    it("記録IDが2である記録を取り出す",()=>{
        //*> idが2の記録
        assert.ok(
            checkEqualityBetweenArraysWithConsoleMsg(converseIntoIDs(database.getRecords(0,[2])) , [2])
        );
    })
    it("記録IDが2,3である記録を取り出す",()=>{
        //*> [2,3]
        assert.ok(
            checkEqualityBetweenArraysWithConsoleMsg(converseIntoIDs(database.getRecords(0,[2,3])) , [2,3])
        );
    })
}
)

function converseIntoIDs(records:IRecord[]){
    return records.map((record) => record.recordID);
}