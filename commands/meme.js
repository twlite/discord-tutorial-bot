const Discord = require("discord.js")
module.exports.run = (client, message, args, api) => {
	api.meme().then(meme => {
			const memeembed = new Discord.MessageEmbed()
				.setTitle(`${meme.title}`)
				.setImage(meme.url)
				.setColor('RANDOM')
				.setURL(meme.link);

			return message.channel.send(memeembed)
		.catch(e => {
			console.error(e);
			message.channel.send("something went wrong!");
		});
	});
}

module.exports.help = {
	name:"meme"
}
