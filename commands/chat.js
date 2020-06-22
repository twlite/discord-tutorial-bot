const fetch = require("node-fetch");

module.exports.run = (client, message, args) => {
    let mesg = args.join(" ");
    if (!mesg) return message.channel.send("Please say something.");
    fetch(`http://api.brainshop.ai/get?bid={YOUR_BRAIN_ID}&key={YOUR_API_KEY}&uid=1&msg=${encodeURIComponent(mesg)}`)
    .then(res => res.json())
    .then(data => {
        message.channel.send(data.cnt);
    });
}

module.exports.help = {
    name: "chat"
};
