module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}\n`);

		console.log('Servers:\n');
		client.guilds.cache.forEach(guild => {
			console.log(`\tServer name : ${guild.name}`);
			console.log(`\tServer id : ${guild.id}`);
			// guild.fetchOwner().then(owner => console.log(`\tOwner : ${owner.user.tag}`));
			console.log(`\tOwner id : ${guild.ownerId}`);
			console.log(`\tMember count : ${guild.memberCount}`);
			console.log();
		});

		console.log('Command Usage:\n');
	},
};