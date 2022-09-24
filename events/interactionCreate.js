module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) return;

		console.log(`\tCommand : ${command.data.name}`);
		console.log(`\tUser name: ${interaction.user.tag}`);
		console.log(`\tUser id : ${interaction.user.id}`);
		console.log(`\tServer name: ${interaction.guild.name}`);
		console.log(`\tServer id : ${interaction.guild.id}`);
		console.log();

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};