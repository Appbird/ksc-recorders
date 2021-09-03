export function converseMiliSecondsIntoTime(timeInMiliSeconds:number):string{
    const minutes = Math.floor(timeInMiliSeconds / 6000);
    const seconds = Math.floor(timeInMiliSeconds % 6000 / 100);
    const miliSeconds = Math.floor(timeInMiliSeconds % 100);
    return `${WriteNumberIn2Digits(minutes)}:${WriteNumberIn2Digits(seconds)}.${WriteNumberIn2Digits(miliSeconds)}`
}
function WriteNumberIn2Digits(num:number):string{
    return (num < 10) ? `0${num}`: String(num);
}
export function converseTimeIntoMiliSeconds(time:string):number{
    if(!/^([0-9]+:[0-9]{2}.[0-9]{2})$/.test(time)) throw new Error("入力されたタイムが正確ではありません。")
    
    return time.split(/[:.]/).map(ele => Number(ele)).reduce((result,value,index) => result + value*([6000,100,1][index]),0)
}
export function convertNumberIntoDateString(num?:number):string{
    if (num === undefined) return "----"
    const date = new Date(num);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${WriteNumberIn2Digits(date.getHours())}:${WriteNumberIn2Digits(date.getMinutes())}:${WriteNumberIn2Digits(date.getSeconds())}`
}
export function convertScoreIntoNumber(score:string):number{
    if (!/^([0-9]+)$/.test(score)) throw new Error("Score must be a number value.")
    return Number(score);
}
export function convertTimeIntoNumber(score:string):number{
    if (/^([0-9]{1,}\:[0-9]{2}\.[0-9]{2})$/.test(score)) return converseTimeIntoMiliSeconds(score);
    if (/^([0-9]{1,}\.[0-9]{2})$/.test(score)) return (() => {const array = score.split("."); return Number(array[0]) * 100 + Number(array[1])})();
    const timePoints = score.replace(/\s/g,"").split("-");
    if (timePoints.every(ele => /^([0-9]{1,}\:[0-9]{2}\.[0-9]{2})$/.test(ele)))
            return Math.abs(converseTimeIntoMiliSeconds(timePoints[0]) - converseTimeIntoMiliSeconds(timePoints[1]))
    throw new Error("タイムは00:00.00, 00.00, 00:00.00 - 00:00.00といった形式で入力されなければなりません。")
}

export function formatDate(datenum:number, mode:"date"|"time", preposition:boolean = true):string{
    const date = new Date(datenum)
    return (()=>{
        switch(mode) {
            case "date":
                return `${preposition ? "on" : ""} ${date.getFullYear()}-${WriteNumberIn2Digits(date.getMonth() + 1)}-${WriteNumberIn2Digits(date.getDate())}`
            case "time":
                return `${preposition ? "at" : ""} ${date.getFullYear()}-${WriteNumberIn2Digits(date.getMonth() + 1)}-${WriteNumberIn2Digits(date.getDate())}  ${WriteNumberIn2Digits(date.getHours())}:${WriteNumberIn2Digits(date.getMinutes())}`
        }
    })().replace(/\//g,"-")
    
}