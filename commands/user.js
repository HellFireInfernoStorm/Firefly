// const wait = require('timers/promises').setTimeout;
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Information about an User')
		.addSubcommand(subcommand =>
			subcommand
				.setName('data')
				.setDescription('Information about an User')
				.addUserOption(option =>
					option
						.setName('username')
						.setDescription('User to Inspect : optional, defaults to sender'),
				),
		),

	async execute(interaction) {
		await interaction.deferReply();

		const option = interaction.options.getUser('username');

		const member = option ? await interaction.guild.members.fetch(option) : interaction.member;
		const user = option ? await option.fetch().then() : await interaction.member.user.fetch().then();

		const Embed = new EmbedBuilder()
			.setColor(user.accentColor)
			.setTitle(member.displayName)
			.setDescription(user.tag)
			.setThumbnail(member.displayAvatarURL())
			.setFields(
				{ name: 'Id:', value: `${user.id}` },
				{ name: 'Created Account:', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:D> <t:${Math.floor(user.createdTimestamp / 1000)}:T>` },
				{ name: 'Joined Server:', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:D> <t:${Math.floor(member.joinedTimestamp / 1000)}:T>` },
				{ name: 'Roles:', value: `${member.roles.cache.map(role => role)}` },
				{ name: 'Highest Role:', value: `${member.roles.highest}` },
				// { name: 'Permissions:', value: `${member.permissions.toArray()}` },
			)
			.setTimestamp(Date.now());

		await interaction.editReply({ embeds: [Embed] });
		// await wait(10000);
		// await interaction.deleteReply();
	},
};