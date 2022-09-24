const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rabin-karp')
		.setDescription('Check for a pattern in a larger text using Rabin-Karp algorithm')
		.addStringOption(option =>
			option
				.setName('text')
				.setDescription('The main text (ASCII)')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('pattern')
				.setDescription('The pattern to search (ASCII)')
				.setRequired(true),
		),

	async execute(interaction) {
		await interaction.deferReply();

		const text = interaction.options.getString('text');
		const pattern = interaction.options.getString('pattern');
		const regex = /\P{ASCII}/u;
		if (regex.test(text) || regex.test(pattern)) {
			await interaction.editReply('Error : Non ASCII text in inputs');
			return;
		}
		const m = text.length;
		const n = pattern.length;
		if (n >= m) {
			await interaction.editReply('Error : pattern is longer than text');
			return;
		}
		const base = 128;
		const prime = 101;

		function hash(string) {
			let hashVal = 0;
			const l = string.length - 1;
			for (let i = l; i >= 0; i--) {
				hashVal += string.charCodeAt(l - i) * (base ** i);
				hashVal %= prime;
			}
			return hashVal;
		}

		const match = hash(pattern);

		for (let i = 0; i <= m - n; i++) {
			const s = text.slice(i, i + n);
			if ((hash(s) == match) && (s == pattern)) {
				await interaction.editReply(`Pattern match '${s}' found at index ${i} in '${text}'`);
				return;
			}
		}

		await interaction.editReply('No pattern match found');
	},
};