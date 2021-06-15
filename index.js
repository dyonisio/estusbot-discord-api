const express = require('express')
const app = express()
const fs = require('fs-extra')
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

var morgan = require('morgan')
app.use(morgan('dev'))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`
Initialized API!
Acesss in port ${port}`)
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let { sendError } = require('./utils/')
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://estusbot:${process.env.PASS_DB}@dyobot.u42fj.mongodb.net/Data`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('Connected to mongo db'))

const config = require("./config.json")
const { response } = require("express")
const Discord = require("discord.js");
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

client.tradesP2PScheme = mongoose.model('tradesP2P',
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

app.post(`/api/webhook/youtube`, async (req, res) => {
    console.log(req.body)

    return
    const publishedAt = req.body.publishedAt
    const title = req.body.title
    const channelName = req.body.channelName
    const url = req.body.url
    const urlAvatar = `https://yt3.ggpht.com/-ij0t9fQ7Z-0hnGrmGs_uYoUjPEVJRxcR7Pi_t-QtWlJKf2OuJmNNvWnq8JB3GUruVUiwYcOw5I=s900-c-k-c0x00ffffff-no-rj`
    const thumbVideo = `http://i3.ytimg.com/vi/${url.replace(/https:\/\/youtu.be\//g, '')}/maxresdefault.jpg`
    
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
        if(err) {
            res.sendStatus(500).send(err)
            return
        }
        data.map(guild => {
            client.guilds.fetch(guild.Guild).then(function(result){
                result.channels.cache.map(chn => {
                    if(chn.id === guild.Channel){
                        chn.send(`Eeeeei @everyone! Tem video novo do Estus ${url} ! Bora assistir :wink:!`, {embed: embed})
                        res.sendStatus(200)
                    }
                })
            })
        })
    })  
})

app.get(`/api/videopa`, async (req, res) => {
    res.redirect(301, 'http://www.youtube.com')
})

app.get(`/api/webhook/tradesp2p`, async (req, res) => {
    client.tradesP2PScheme.find({}, async(err, data) => {
        if(err) {
            res.sendStatus(500).send(err)
            return
        }
        data.map(guild => {
            client.guilds.fetch(guild.Guild).then(function(result){
                let emoji = result.emojis.cache.find(emoji => emoji.name === 'bangbang')
                if(!emoji)
                    emoji = ':bangbang:'
                
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${emoji} Canal pra anúncios de compra/venda de NFTs e tokens ${emoji}`)
                    .setDescription(`Faça compras e vendas por sua conta e risco. Não compartilhe senhas ou informações pessoais com ninguém. Seja sempre cauteloso!`)
                    .setColor('#6138CA')
                    .setFooter(`Aviso!`)
                    .setTimestamp()

                result.channels.cache.map(chn => {
                    if(chn.id === guild.Channel){
                        chn.send(embed)
                        res.sendStatus(200)
                    }
                })
            })
        })
    })    
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
