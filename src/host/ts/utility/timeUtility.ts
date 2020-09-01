export function converseMiliSecondsIntoTime(timeInMiliSeconds:number):string{
    const miliSeconds = timeInMiliSeconds % 100;
    const timeInSecond = timeInMiliSeconds - miliSeconds;
    const minutes = Math.floor(timeInMiliSeconds / 3600)
    const seconds = timeInSecond % 3600;
    return `${WriteNumberIn2Digits(minutes)}:${WriteNumberIn2Digits(seconds)}.${WriteNumberIn2Digits(miliSeconds)}`
}
function WriteNumberIn2Digits(num:number):string{
    return (num < 10) ? `0${num}`: String(num);
}