const express = require('express')
const app = express()
const fs = require('fs-extra')

const dotenv = require('dotenv');
dotenv.config();

var morgan = require('morgan')
app.use(morgan('dev'))

let { sendError } = require('./utils/')

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`
Initialized API!
Acesss in port ${port}`)
});

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://estusbot:${process.env.PASS_DB}@dyobot.u42fj.mongodb.net/Data`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('Connected to mongo db'))

const config = require("./config.json")
const { response } = require("express")
const Discord = require("discord.js")
const client = new Discord.Client()

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

// ----------------- SCHEMAS ------------------ //
client.welcomeRoleScheme = mongoose.model('welcomeRole',
    new mongoose.Schema({
        Guild : String,
        Role: String  
    })
) 

client.newVideoScheme = mongoose.model('newVideo',
    new mongoose.Schema({
        Guild : String,
        Channel: String  
    })
) 


// ----------------- ROUTES ------------------ //
app.get(`/api`, async (req, res) => {
    const ping = new Date()
    ping.setHours(ping.getHours() - 3)
    console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`)
    res.sendStatus(200);
})

app.get(`/api/webhook`, async (req, res) => {
    const publishedAt = req.query['publishedAt']
    const title = req.query['title']
    const channelName = req.query['channelName']
    const url = req.query['url']
    const urlAvatar = req.query['urlAvatar']
    const thumbVideo = `http://i3.ytimg.com/vi/${url.replace(/https:\/\/youtu.be\//g, '')}/maxresdefault.jpg`

    console.log(thumbVideo)

    const embed = new Discord.MessageEmbed()
                .setAuthor(channelName, urlAvatar)
                .setTitle(`${title}`)
                .setURL(url)
                .setThumbnail(urlAvatar)
                .setColor('#868DAC')
                .setImage(thumbVideo)
                .setFooter(`Notificação de Video!`)
                .setTimestamp()

    client.newVideoScheme.find({}, async(err, data) => {
        if(err) throw err
        data.map(guild => {
            client.guilds.fetch(guild.Guild).then(function(result){
                result.channels.cache.map(chn => {
                    if(chn.id === guild.Channel)
                    chn.send(`Eeeeei @everyone! Tem video novo do Estus ${url} ! Bora assistir :wink:!`, {embed: embed})
                })
            })
        })
    })

    res.sendStatus(200)
    
})

app.use((req, res) =>{
    error = sendError(req, {
        name: 'RouteNotFound',
        message: 'You tried to access a route that does not exist'
    })
    res.status(error.statusCode).send(error)
});

// ----------------- EVENTS ------------------ //
client.on('ready', () => {
    client.user.setActivity(`| ${config.prefix}help para ajuda!`)
    console.log(`${client.user.username} ✅`)
})

client.on("message", message => {
    if(message.author.bot) return
    if(message.channel.type == "dm") return
    if(!message.content.toLowerCase().startsWith(config.prefix)) return
    if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return

    const args = message.content.trim().slice(config.prefix.length).split(/ +/g)
    const cmd = args.shift().toLowerCase();

    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    
    try{
        if(command) command.run(client, message, args) 
    } catch (err) {
        console.error("Erro:" + err)
    }
})

client.on("guildMemberAdd", async (member) => {
    client.welcomeRoleScheme.findOne({
        Guild : member.guild.id,
    }, async(err, data) => {
        if(err) throw err
        if(data){
            member.roles.add(data.Role)
        }
    })
})

client.login(process.env.TOKEN)
