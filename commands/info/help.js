const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases : ['h'],
  category : 'info',
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Precisa de ajuda? Aqui está todos os meus comandos:")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` seguido pelo comando para obter mais detalhes sobre ele. Por examplo: \`${prefix}help gas\`.`
        )
        .setFooter(
          `Solicitado por ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Comando invalido! Use \`${prefix}help\` para todos os meus comandos!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Detalhes do Comando:")
        .addField("PREFIXO:", `\`${prefix}\``)
        .addField(
          "COMANDO:",
          command.name ? `\`${command.name}\`` : "Comando sem nome :/"
        )
        .addField(
          "ALIAS:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Não há alias para esse comando."
        )
        .addField(
          "USO:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIÇÃO:",
          command.description
            ? command.description
            : "Sem descrição para esse comando."
        )
        .setFooter(
          `Solicitado por ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};
