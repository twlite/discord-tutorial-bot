const { MessageAttachment } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    match(args.join(" ").toLowerCase(), message.guild) ||
    message.author;

  let level = client.db.get(`level_${user.id}`) || 0;
  level = level.toString();
  let exp = client.db.get(`xp_${user.id}`) || 0;
  let neededXP = Math.floor(Math.pow(level / 0.1, 2));

  let every = client.db
    .all()
    .filter(i => i.ID.startsWith("xp_"))
    .sort((a, b) => b.data - a.data);
  let rank = every.map(x => x.ID).indexOf(`xp_${user.id}`) + 1;
  rank = rank.toString();
  let img = await client.canvas.rank({
    username: user.username,
    discrim: user.discriminator,
    currentXP: exp.toString(),
    neededXP: neededXP.toString(),
    rank,
    level,
    avatarURL: user.displayAvatarURL({ format: "png" }),
    background: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&w=1000&q=80"
  });
  return message.channel.send(new MessageAttachment(img, "rank.png"));
};

function match(msg, i) {
  if (!msg) return undefined;
  if (!i) return undefined;
  let user = i.members.cache.find(
    m =>
      m.user.username.toLowerCase().startsWith(msg) ||
      m.user.username.toLowerCase() === msg ||
      m.user.username.toLowerCase().includes(msg) ||
      m.displayName.toLowerCase().startsWith(msg) ||
      m.displayName.toLowerCase() === msg ||
      m.displayName.toLowerCase().includes(msg)
  );
  if (!user) return undefined;
  return user.user;
}

module.exports.help = {
  name: "rank"
};
