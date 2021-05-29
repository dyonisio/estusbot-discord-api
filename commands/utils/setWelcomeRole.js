const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const prefix = require("../../config.json").prefix;

module.exports = {
    name: "setwelcomerole",
    category : 'utils',
    run: async (client, message, args) => {
        const guildId = message.channel.guild.id

        if(!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('Você não tem permissão!')
        if(!(args.length > 0)) return message.reply(`Para setar um cargo como padrão, envie ${prefix}setwelcomerole @Role`)
        const role = message.channel.guild.roles.cache.find(role => `<@&${role.id}>` === args[0])
        if(!role) return message.reply(`Esse cargo não existe!`)        

        client.welcomeRoleScheme.findOne({
            Guild : guildId,
        }, async(err, data) => {
            if(err) throw err
            if(data){
                data.Guild = guildId
                data.Role = role.id
            } else {
                data = new client.welcomeRoleScheme({
                    Guild : guildId,
                    Role: role.id
                })
            }
            await data.save().catch(err => console.log(err))
            message.reply('Cargo setado com sucesso!')
        })
    }  
}