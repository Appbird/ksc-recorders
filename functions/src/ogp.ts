import { converseMiliSecondsIntoTime } from "../../src/ts/utility/timeUtility";
import { RecordDataBase } from "./server/firestore/RecordDataBase";
import { ControllerOfTableForResolvingID } from "./server/recordConverter/ControllerOfTableForResolvingID";
// 参考
// https://qiita.com/yuneco/items/5e526464939082862f5d
// https://qiita.com/stin_dev/items/41ac4acb6ee7e1bc2d50

//#CH 404や500の時のOGPも用意したい。 

export async function generateOGP(recordDataBase:RecordDataBase,gs:string,gm:string,id:string){
    const gameSystem =await recordDataBase.getGameSystemInfo(gs)
    const gameMode =await recordDataBase.getGameModeInfo(gs,gm)
    const record =await recordDataBase.getRecord(gs,gm,id)
    const cotfr = new ControllerOfTableForResolvingID(recordDataBase)
    const recordResolved = await cotfr.convertRecordIntoRecordResolved(record,"English")
    const score = gameMode.scoreType === "time" ? converseMiliSecondsIntoTime(record.score) : record.score.toString()
    
    const title = `Record by ${recordResolved.runnerName} in ${gameSystem.English} / ${gameMode.English}`
    const site_title = "Kirby-Speed/Score-Recorders"
    const imageURL = "https://firebasestorage.googleapis.com/v0/b/kss-recorders.appspot.com/o/icon.png?alt=media&token=bcb35206-fc4c-4d04-b6cd-45bbab213cc9"
    const url = `https://kss-recorders.web.app`
    const description = `${score} : [${recordResolved.regulation.abilityNames.join(", ")}] vs. [${recordResolved.regulation.targetName}]`
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>${site_title}</title>
            <meta property="og:title" content="${title}">
            <meta property="og:image" content="${imageURL}">
            <meta property="og:description" content="${description}">
            <meta property="og:url" content="${url}">
            <meta property="og:type" content="article">
            <meta property="og:site_name" content="${url}">
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:site" content="${site_title}">
            <meta name="twitter:title" content="${title}">
            <meta name="twitter:image" content="${imageURL}">
            <meta name="twitter:description" content="${description}">
            <meta name="og:url" content="https://kss-recorders.web.app/?state=detailView&gs=${gs}&gm=${gm}&id=${id}&ogp=0">
        </head>
        <body>
            <script> window.location = "https://kss-recorders.web.app/?state=detailView&gs=${gs}&gm=${gm}&id=${id}"</script>
        </body>
    </html>
    `;
   
}