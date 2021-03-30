export function checkEqualityBetweenArraysWithConsoleMsg<T>(subject:T[],elementsSupposedToHave:T[],needConsoleMsg:boolean = false):boolean{
    if (needConsoleMsg)console.log(`\u001b[32m【比較対象】actual:[${subject}] vs expected:[${elementsSupposedToHave}] \u001b[0m`)
    if (subject.length !== elementsSupposedToHave.length) return false;
    return subject.every( (element,index) => element === elementsSupposedToHave[index])
} 
export function checkEqualityBetweenArrays<T>(subject:T[],elementsSupposedToHave:T[]):boolean{
    if (subject.length !== elementsSupposedToHave.length) return false;
    return subject.every( (element,index) => element === elementsSupposedToHave[index])
} 