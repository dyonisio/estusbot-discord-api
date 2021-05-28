const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ebook",
    aliases : ['eb'],
    category : 'info',
    description: "Tudo que você precisa saber sobre Axie Infinity",
    run: async (client, message, args) => {
        const channel = message.channel

        const emoji = message.member.guild.emojis.cache.find(emoji => emoji.name === 'ez')

        const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${emoji} Ebook ${emoji}`)
                .setImage('https://media.discordapp.net/attachments/847365371594014751/847924888328208384/youtube.comestus.png')
                .setColor('#6138CA')
                .setTimestamp()

        channel.send(embed)
    }  
}