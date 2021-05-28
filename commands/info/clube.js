const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "clube",
    aliases : ['club'],
    category : 'info',
    description: "Faça parte do clube agora e ganhe vários benefícios!",
    run: async (client, message, args) => {
        const channel = message.channel

        const emoji = message.member.guild.emojis.cache.find(emoji => emoji.name === 'ez')

        const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${emoji} Clube ${emoji}`)
                .setURL('https://www.youtube.com/channel/UCUJ2Ul5_yn5dMO6LeyhJvUA/join')
                .setThumbnail('https://images-ext-2.discordapp.net/external/MHENbgtLizu0J7VnwQm4j0X3doV7keKLjvCO0A5a3gw/https/yt3.ggpht.com/-ij0t9fQ7Z-0hnGrmGs_uYoUjPEVJRxcR7Pi_t-QtWlJKf2OuJmNNvWnq8JB3GUruVUiwYcOw5I%3Ds900-c-k-c0x00ffffff-no-rj?width=683&height=683')
                .addField('ESTUS', 'First brazilian channel about games that uses blockchain tecnology and NFTs to rewards players. Follow my videos to stay up to date with news, reviews, patches, hints, giveaways and much more!\n\n Membership NFT collection on Atomic Hub: https://wax.atomichub.io/explorer/collection/cardsdoclube')
                .setColor('#4FFEDF')
                .setTimestamp()

        channel.send('https://www.youtube.com/channel/UCUJ2Ul5_yn5dMO6LeyhJvUA/join', {embed: embed})
    }  
}