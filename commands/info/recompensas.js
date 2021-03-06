const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "recompensas",
    category : 'info',
    description : 'Tudo que você precisa saber sobre as recompensas',
    run: async (client, message, args) => {
        const channel = message.channel

        const e1 = message.member.guild.emojis.cache.find(emoji => emoji.name === '1_')
        const e2 = message.member.guild.emojis.cache.find(emoji => emoji.name === '2_')
        const e3 = message.member.guild.emojis.cache.find(emoji => emoji.name === '3_')
        const e4 = message.member.guild.emojis.cache.find(emoji => emoji.name === '4_')
        const e6 = message.member.guild.emojis.cache.find(emoji => emoji.name === '6_')
        const slp = message.member.guild.emojis.cache.find(emoji => emoji.name === 'slp')
        const axs = message.member.guild.emojis.cache.find(emoji => emoji.name === 'axs')
        const stonks = message.member.guild.emojis.cache.find(emoji => emoji.name === 'stonks')
        const youtube = message.member.guild.emojis.cache.find(emoji => emoji.name === 'youtube')

        const embed = new MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`${youtube} BENEFÍCIOS DO CLUBE ${youtube}`)
                .setColor('#6138CA')
                .setTimestamp()
                .setDescription(`
                    ${e1}     ${e2}     ${e3}     ${e4}     ${e6}

                    Nível 1: Inscrito Épico
                    ― ― ―
                    :speech_left:  Prioridade de resposta nos comentários
                    :video_camera:  Vídeos exclusivos para membros
                    :briefcase:  Privilégio: Inscrito Épico
                    :tickets:  Cartão NFT: "Membro Oficial" (1 WAXP)
                    ― ― ―

                    Nível 2: Gamer Lendário
                    ― ― ―
                    :open_file_folder:  Recompensas do nível anterior
                    :thumbsup:  Poder de voto no conteúdo do canal
                    :briefcase:  Privilégio: Gamer Lendário
                    :tickets:  Cartão NFT: "Gamer Lendário" (2 WAXP)
                    ― ― ―

                    Nível 3: Gamer Mítico
                    ― ― ―
                    :open_file_folder:  Recompensas dos níveis anteriores
                    ${slp}  Mentoria de Axie Infinity
                    ${axs}  E-book 101 Coisas Que Você Precisa Saber Sobre Axie Infinity
                    :briefcase:  Privilégio: Gamer Mítico
                    :tickets:  Cartão NFT: "Gamer Mítico" (5 WAXP)
                    ― ― ―

                    Nível 4: Treinador Prime
                    ― ― ―
                    :open_file_folder:  Recompensas dos níveis anteriores
                    ${stonks}  Garante 1 vaga para a Estus Academy (scholarship)
                    :briefcase:  Privilégio: Treinador Prime
                    :tickets:  Cartão NFT: "Treinador Prime" (10 WAXP)
                    ― ― ―
                    
                    :small_orange_diamond: Saiba mais: https://www.youtube.com/channel/UCUJ2Ul5_yn5dMO6LeyhJvUA/join
                `)
                .setURL('https://www.youtube.com/channel/UCUJ2Ul5_yn5dMO6LeyhJvUA/join')
                .setThumbnail('https://yt3.ggpht.com/-ij0t9fQ7Z-0hnGrmGs_uYoUjPEVJRxcR7Pi_t-QtWlJKf2OuJmNNvWnq8JB3GUruVUiwYcOw5I=s900-c-k-c0x00ffffff-no-rj')
        channel.send(embed)
    }  
}