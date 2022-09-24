const wait = require('timers/promises').setTimeout;
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Information about the Server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('data')
				.setDescription('Information about the Server'),
		),

	async execute(interaction) {
		await interaction.deferReply();

		const guild = interaction.guild;
		const emojis = guild.emojis.cache.map(emoji => emoji);

		const Embed = new EmbedBuilder()
			.setColor(0x5500ff)
			.setTitle(guild.name)
			.setDescription(guild.description)
			.setThumbnail(guild.iconURL())
			.setFields(
				{ name: 'Id:', value: `${guild.id}`, inline: true },
				{ name: 'Owner:', value: `<@${guild.ownerId}>`, inline: true },
				{ name: 'Date Created:', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D> <t:${Math.floor(guild.createdTimestamp / 1000)}:D>` },
				{ name: 'Members:', value: `${guild.memberCount}` },
				{ name: 'Roles:', value: `${guild.roles.cache.map(role => role)}` },
				{ name: 'Emojis:', value: `${emojis.toString() < 1024 ? emojis : emojis.length}` },
			)
			.setTimestamp(Date.now());

		await interaction.editReply({ embeds: [Embed] });
		await wait(10000);
		await interaction.deleteReply();
	},
};