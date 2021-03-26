export function checkInputObjectWithErrorPossibility(actual:any,expectedStructure:TypeValue,checkedPlace?:string):boolean{
    for (const [propertyName,expectedTypeName] of Object.entries(expectedStructure)){

        if (!actual.hasOwnProperty(propertyName)) throw new Error(`キー${propertyName}が存在しません。場所 : ${checkedPlace}`)

        if (typeof actual[propertyName] === "object" && typeof expectedTypeName !== "string"){
             checkInputObjectWithErrorPossibility(actual[propertyName],expectedTypeName,`${checkedPlace} / ${propertyName}`)
             continue;
        }
        if (typeof expectedTypeName === "string" && !checkType(actual[propertyName],expectedTypeName)){
            throw new Error(`キー${propertyName}に対応する値の型は${expectedTypeName}であるとされていますが、実際には${actual[propertyName]}(${
                Array.isArray(actual[propertyName])?"Array":(actual[propertyName])}型)でした。場所 : ${checkedPlace}`)
        }
    }
    return true;
}
function checkType(actualValue:any,expectedTypeName:string):boolean{
    expectedTypeName = expectedTypeName.replace(/\s/g,"")
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
type TypeValue = {
    [key: string]: string | TypeValue;
}