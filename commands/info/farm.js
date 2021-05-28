const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "classes",
    aliases : ['classe', 'classes'],
    category : 'info',
    description: "Mostra as classes de axies",
    run: async (client, message, args) => {
        const channel = message.channel

        const emoji = message.member.guild.emojis.cache.find(emoji => emoji.name === 'axs')

        const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${emoji} Classes ${emoji}`)
                .setImage('https://media.discordapp.net/attachments/814271204872945664/840288566206398495/Class-advantage-w-secrets.png')
                .setColor('#FFB930')
                .setTimestamp()

        channel.send(embed)
    }  
}