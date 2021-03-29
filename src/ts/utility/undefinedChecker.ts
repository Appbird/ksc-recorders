export function checkIsUndefined<T>(subject:T | undefined,errorMsg:string){
    if (subject === undefined) throw new Error(`found undefined! : ${errorMsg}`)
    return subject;
}