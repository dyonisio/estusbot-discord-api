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
                .setImage('https://cdn.discordapp.com/attachments/847159202010890271/849669293556629534/attach.png')
                .setColor('#00B7CC')
                .setTimestamp()

        channel.send(embed)
    }  
}