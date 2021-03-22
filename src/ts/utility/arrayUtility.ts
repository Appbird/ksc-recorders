export function checkEqualityBetweenArrays<T>(subject:T[],elementsSupposedToHave:T[]):boolean{
    console.info(`【比較対象】actual:[${subject}] vs expected:[${elementsSupposedToHave}] `)
    if (subject.length !== elementsSupposedToHave.length) return false;
    return subject.every( (element,index) => element === elementsSupposedToHave[index])
} 