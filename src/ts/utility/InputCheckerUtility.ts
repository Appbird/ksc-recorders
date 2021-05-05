export function checkInputObjectWithErrorPossibility<CheckType>(actual:any,expectedStructure:TypeValue | TypeValue[],checkedPlace?:string):actual is CheckType{
    if (actual === undefined) throw new Error(`与えられたオブジェクト${checkedPlace}はundefinedでした。場所 : ${checkedPlace}`)
    if (Array.isArray(actual) && !Array.isArray(expectedStructure)) throw Error(`与えられたオブジェクト${checkedPlace}は配列ではないとされていますが、配列でした。場所 : ${checkedPlace}`)
    if (Array.isArray(expectedStructure)){
        if (!Array.isArray(actual)) throw Error(`与えられたオブジェクト${checkedPlace}は配列であるとされていますが、配列ではありませんでした。場所 : ${checkedPlace}`)
        for (const element of actual)checkInputObjectWithErrorPossibility(element, expectedStructure[0], `${checkedPlace}`)
    }
    for (const [propertyName,expectedSubStructure] of Object.entries(expectedStructure)){

        if (!actual.hasOwnProperty(propertyName) && !(typeof expectedSubStructure === "string"  && expectedSubStructure.endsWith("?"))) throw new Error(`キー${propertyName}が存在しません。場所 : ${checkedPlace}`)

        if (typeof actual[propertyName] === "object" && typeof expectedSubStructure !== "string"){
             checkInputObjectWithErrorPossibility(actual[propertyName],expectedSubStructure,`${checkedPlace} / ${propertyName}`)
             continue;
        }
        if (typeof expectedSubStructure === "string" && !checkType(actual[propertyName],expectedSubStructure)){
            throw new Error(`キー${propertyName}に対応する値の型は${expectedSubStructure}であるとされていますが、実際には${actual[propertyName]}(${
                Array.isArray(actual[propertyName])?"Array":(typeof actual[propertyName])}型)でした。場所 : ${checkedPlace}`)
        }
    }
    return true;
}
export function checkType(actualValue:any,expectedTypeName:string):boolean{
    expectedTypeName = expectedTypeName.replace(/\s/g,"")
    if (expectedTypeName === "any") return true;
    if (expectedTypeName.endsWith("?")){
        if (actualValue === undefined) return true;
        expectedTypeName = expectedTypeName.replace("?","")
    }
    if (expectedTypeName.endsWith("[]")){
        if (!Array.isArray(actualValue)) return false;
        expectedTypeName = expectedTypeName.replace("[]","")
        return actualValue.every((element) => typeof element === expectedTypeName)
    } else if ((/^(\"[^\"\|]+\"(\|\"[^\|\"]+\")*)$/).test(expectedTypeName)){
        //#NOTE "abc"|"def"|"ghi"|...|"zh"みたいな感じの文字列であればここの処理を通る。
        if (typeof actualValue !== "string") return false;
        const expectedStrings = expectedTypeName.replace(/\"/g,"").split("|");
        return checkString(actualValue,expectedStrings)
    } else if (typeof actualValue === expectedTypeName){
        return true;
    } else {
        return false;
    }
}
function checkString(actual:string,expectedStrings:string[]){
    return expectedStrings.some( (expectedString) => expectedString === actual)
}
export interface TypeValue {
    [key: string]: string | TypeValue | TypeValue[];
}