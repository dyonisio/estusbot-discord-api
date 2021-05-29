const Discord = require("discord.js")
const axios = require('axios')
const cheerio = require('cheerio')
const { MessageEmbed } = require('discord.js')
const columns = require('cli-columns')

module.exports = {
    name: "gas",
    aliases : ['g'],
    category : 'info',
    description: "Mostra o gás atual",
    run: async (client, message, args) => {
        const channel = message.channel
        const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.TOKEN_ETHERSCAN}`
        axios.get(url).then(res => {
            const emoji = message.member.guild.emojis.cache.find(emoji => emoji.name === 'eth')

            const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${emoji} GAS ETH ${emoji}`)
                .addFields(
                    { name: '**:grin: Low**', value: `${res.data.result.SafeGasPrice} gwei`, inline: true},
                    { name: '**:grinning: Average**', value: `${res.data.result.ProposeGasPrice} gwei`, inline: true },
                    { name: '**:slight_smile: High**', value: `${res.data.result.FastGasPrice} gwei`, inline: true }
                )
                .setColor('#868DAC')
                .setFooter(`https://etherscan.io/gastracker • Ultima atualização`)
                .setTimestamp()

            channel.send(embed)
        })  
    }  
}