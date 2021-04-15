export function checkIsUndefined<T>(subject:T | undefined,errorMsg:string){
    if (subject === undefined) throw new Error(`found undefined! : ${errorMsg}`)
    return subject;
}
export function checkIsNull<T>(subject:T | null,errorMsg:string){
    if (subject === null) throw new Error(`found undefined! : ${errorMsg}`)
    return subject;
}