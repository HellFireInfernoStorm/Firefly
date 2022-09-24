const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emojis')
		.setDescription('Lists all the emojis in the Server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('list')
				.setDescription('Lists all the emojis in the Server'),
		),

	async execute(interaction) {
		await interaction.deferReply();
		const emojis = interaction.guild.emojis.cache.map(emoji => emoji).toString().replace(/,/g, '  ');
		await interaction.editReply(emojis);
	},
};