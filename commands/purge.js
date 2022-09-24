const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Clears messages from channel')
		.addNumberOption(option =>
			option
				.setName('count')
				.setDescription('Number of messages to delete'),
		),

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		await interaction.channel.bulkDelete().then(async messages =>
			await interaction.editReply(`Deleted ${messages.size} messages`),
		);
	},
};