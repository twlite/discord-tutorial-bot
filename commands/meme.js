const fetch = require('node-fetch');

module.exports.run = (client, message, args) => {
	fetch(`https://api.snowflakedev.xyz/meme`)
		.then(response => response.json())
		.then(json => {
			const meme = {
				title: json.title,
				img: json.url,
				link: json.link,
				subreddit: json.subreddit
			}

			const memeembed = new Discord.MessageEmbed()
				.setTitle(`${meme.title}`)
				.setImage(meme.img)
				.setColor('RANDOM')
				.setURL(meme.link);

			return message.channel.send(memeembed)
		})
		.catch(e => {
			console.error(e);
			message.channel.send("something went wrong!");
		});
}

module.exports.help = {
	name:"meme"
}
