export function checkInputObjectWithErrorPossibility(actual:{[key: string]:any},expectedStructure:TypeValue,checkedPlace?:string){
    for (const [key,value] of Object.entries(expectedStructure)){
        if (!actual.hasOwnProperty(key)) throw new Error(`キー${key}が存在しません。場所 : ${checkedPlace}`)
        if (typeof actual[key] === "object" && typeof value !== "string") checkInputObjectWithErrorPossibility(actual[key],value,`${checkedPlace} / ${key}`)
        else if (typeof actual[key] !== value) throw new Error(`キー${key}に対応する値の型は${value}であるとされていますが、実際には${typeof actual[key]}でした。場所 : ${checkedPlace}`)
    }
}

type TypeValue = {
    [key: string]: PrimitiveTypeEnumeration | TypeValue;
}
type PrimitiveTypeEnumeration = "string"|"number"|"boolean"|"undefined"
