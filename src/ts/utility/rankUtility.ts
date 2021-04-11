export function convertNumberToRank(rank:number):string{
    const firstPlace = rank%10;
    const secondPlace = rank%100 - firstPlace;

    if (secondPlace !== 0 && secondPlace !== 1) return `${rank}th`;
    
    switch (firstPlace){
        case 1: return `${rank}st`
        case 2: return `${rank}nd`
        case 3: return `${rank}rd`
        default: return `${rank}th`
    }
}