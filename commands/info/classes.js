const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "farm",
    aliases : ['farm', 'farms'],
    category : 'info',
    description: "Mostra como iniciar uma farm de axies",
    run: async (client, message, args) => {
        const channel = message.channel

        const emoji = message.member.guild.emojis.cache.find(emoji => emoji.name === 'slp')

        const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${emoji} Farm ${emoji}`)
                .setImage('https://media.discordapp.net/attachments/746019522858844271/830816489933635584/Uncle_1.png')
                .setColor('#00B7CC')
                .setTimestamp()

        channel.send(embed)
    }  
}