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
        const url = 'https://etherscan.io/gastracker'
        axios.get(url).then(res => {
            const html = res.data;
            var $ = cheerio.load(html);

            const lowGasDiv = $('#divLowPrice > div > span > span')
            const averageGasDiv = $('#divAvgPrice > span > span')
            const highGasDiv = $('#divHighPrice > span > font > span')

            const lowGasTimePrice = $('#divLowPrice > div.text-secondary').text()
            const averageGasTimePrice = $('#divAvgPrice > div.text-secondary').text()
            const highGasTimePrice = $('#divHighPrice > div.text-secondary').text()

            const emoji = message.member.guild.emojis.cache.find(emoji => emoji.name === 'eth')

            const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${emoji} GAS ETH ${emoji}`)
                .addFields(
                    { name: '**:grin: Low**', value: `${lowGasDiv.text()} gwei \n${lowGasTimePrice}‎‎`, inline: true},
                    { name: '**:grinning: Average**', value: `${averageGasDiv.text()} gwei \n${averageGasTimePrice}`, inline: true },
                    { name: '**:slight_smile: High**', value: `${highGasDiv.text()} gwei \n${highGasTimePrice}`, inline: true }
                )
                .setColor('#868DAC')
                .setFooter(`${url} • Ultima atualização`)
                .setTimestamp()

            channel.send(embed)
        })  
    }  
}