const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Snowflake = require("snowflake-api");

client.db = require("quick.db");
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.config = {
    TOKEN: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", //Discord Bot Token
    API_TOKEN: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", //API Token found at http://api.snowflakedev.cf:9019/dashboard
    prefix: "!",
    cooldown: 15000
};
const api = new Snowflake.Client(client.config.API_TOKEN);
client.snowapi = api;

// Load Commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
    });
});

// Events
client.once("ready", () => {
    console.log("Ready!");
});

client.on("error", console.error);

client.on("warn", console.warn);

client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
    // Handle XP
    xp(message);
    // command handler
    if (!message.content.startsWith(client.config.prefix)) return;
    let args = message.content.slice(client.config.prefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    let commandFile = client.commands.get(command);
    if (!commandFile) return;
    commandFile.run(client, message, args, api);
});

function xp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
        let xp = client.db.add(`xp_${message.author.id}`, 1);
        let level = Math.floor(0.3 * Math.sqrt(xp));
        let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = client.db.set(`level_${message.author.id}`,level);
            message.channel.send(`:tada: ${message.author.toString()}, You just advanced to level ${newLevel}!`);
        }
        client.cooldown.set(`${message.author.id}`, Date.now());
    }
}

client.login(client.config.TOKEN);
