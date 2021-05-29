const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const prefix = require("../../config.json").prefix;

module.exports = {
    name: "setnewvideos",
    category : 'utils',
    run: async (client, message, args) => {
        const guildId = message.channel.guild.id

        if(!(args.length > 0)) return message.reply(`Para setar canal como padrão, envie ${prefix}setnewvideos @Canal`)
        const channel = message.guild.channels.cache.find(channel => `<#${channel.id}>` === args[0])
        if(!channel) return message.reply(`Esse canal não existe!`)        

        client.newVideoScheme.findOne({
            Guild : guildId,
        }, async(err, data) => {
            if(err) throw err
            if(data){
                data.Guild = guildId
                data.Channel = channel.id
            } else {
                data = new client.newVideoScheme({
                    Guild : guildId,
                    Channel: channel.id
                })
            }
            await data.save().catch(err => console.log(err))
            message.reply('Canal setado com sucesso!')
        })
    }  
}