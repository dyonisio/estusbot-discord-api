const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "shining",
    category : 'info',
    run: async (client, message, args) => {
        const channel = message.channel

        const emoji = message.member.guild.emojis.cache.find(emoji => emoji.name === 'stonks')

        const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${emoji} Shining ${emoji}`)
                .setImage('https://media.discordapp.net/attachments/829747229991895062/843501887382355968/0_VL9cOJC2nm9cD8Yu.png')
                .setColor('#A0326B')
                .setTimestamp()

        channel.send(embed)
    }  
}