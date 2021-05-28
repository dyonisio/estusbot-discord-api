const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "alienworlds",
    aliases : ['aw'],
    category : 'info',
    description: "Explica como funciona o ALienWorlds",
    run: async (client, message, args) => {
        const channel = message.channel

        const emoji = message.member.guild.emojis.cache.find(emoji => emoji.name === 'pickaxe')

        const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${emoji} AlienWorlds ${emoji}`)
                .setImage('https://media.discordapp.net/attachments/829747229991895062/832612002656419846/Copy_of_Untitled_1.png')
                .setColor('#21224E')
                .setTimestamp()

        channel.send(embed)
    }  
}