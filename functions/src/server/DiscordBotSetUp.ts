/*
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import {Client, GuildMember, Intents, Role} from "discord.js"
import { RecordDataBase } from "./firestore/RecordDataBase";
import {secretKey} from "./secret.json" 

export function discordBotSetup(recordDataBase:RecordDataBase){
    const client = new Client({intents:[Intents.FLAGS.GUILDS]})

    client.on("message", async (msg) => {
        if (/^(\/toggle\s[a-zA-Z0-9\s]+\/[a-zA-Z0-9\s]+)$/.test(msg.content)) return;
        const gamemode = msg.content.split(" ")[1]
        const gamemodeRole = msg.guild?.roles.cache.find(role => role.name === `[${gamemode}]`)

        if (gamemodeRole !== undefined) {
            if (msg.member === null) {
                msg.channel.send(`The author of this message(${msg.content}) is not found. @${msg.author.username}`)
                return;
            }
            giveRole(gamemodeRole,msg.member)
            await msg.channel.send(`Role [${gamemode}] is given to ${msg.member?.displayName}. @${msg.author.username}`)
            return;
        }

        //#NOTE 実際に対応する作品が存在するか調査 
        const gameSystemCollection = await recordDataBase.getGameSystemCollection()
        const [requestedGameSystemName, requestedGameModeName] = gamemode.split("/");
        const requestedGameSystem = gameSystemCollection.find(gameSystem => gameSystem.English === requestedGameSystemName)
        if (requestedGameSystem === undefined){
            msg.channel.send(`The title ${requestedGameSystemName} is not found. @${msg.author.username}`)
            return;
        }
        const requestedGameMode = (await recordDataBase.getGameModeCollection(requestedGameSystem.id)).find((tgamemode) => tgamemode.English === requestedGameModeName )
        if (requestedGameMode === undefined){
            msg.channel.send(`The mode ${requestedGameModeName} is not found. @${msg.author.username}`)
            return;
        }

        if (msg.guild === null || msg.member === null) {
            msg.channel.send(`The guild or member is not found. @${msg.author.username}`)
            return
        }
        
        giveRole(await msg.guild.roles.create({name:`[${gamemode}]`, color:"DARK_BLUE", mentionable:true}),msg.member)
    })
    
    client.login(secretKey).catch(err => console.error(err))
}

function giveRole(role:Role,member:GuildMember){
    member.roles.add(role)
}
*/