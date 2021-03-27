export function converseMiliSecondsIntoTime(timeInMiliSeconds:number):string{
    const miliSeconds = timeInMiliSeconds % 100;
    const timeInSecond = Math.floor(timeInMiliSeconds/100);
    const minutes = Math.floor(timeInMiliSeconds / 3600)
    const seconds = timeInSecond % 3600;
    return `${WriteNumberIn2Digits(minutes)}:${WriteNumberIn2Digits(seconds)}.${WriteNumberIn2Digits(miliSeconds)}`
}
function WriteNumberIn2Digits(num:number):string{
    return (num < 10) ? `0${num}`: String(num);
}
export function convertNumberIntoDateString(num:number):string{
    const date = new Date(num);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${WriteNumberIn2Digits(date.getHours())}:${WriteNumberIn2Digits(date.getMinutes())}:${WriteNumberIn2Digits(date.getSeconds())}`
}