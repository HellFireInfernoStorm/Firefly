const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spam')
		.setDescription('Self explanatory: spams')
		.addStringOption(option =>
			option
				.setName('string')
				.setDescription('A phrase to spam : optional'),
		),

	async execute(interaction) {
		await interaction.reply('Prepare for Spammageddon!');
		const option = interaction.options.getString('string');
		const spamText = option ? option : 'awoooooga!\n\npew pew pew I can fly!';
		for (let i = 0; i < 100; i++) {
			await interaction.followUp(spamText);
		}
	},
};