const fetch = require("node-fetch");

module.exports.run = (client, message, args) => {
    let mesg = args.join(" ");
    if (!mesg) return message.channel.send("Please say something.");
    
    // part one
    // fetch(`http://api.brainshop.ai/get?bid={YOUR_BRAIN_ID}&key={YOUR_API_KEY}&uid=1&msg=${encodeURIComponent(mesg)}`)
    // .then(res => res.json())
    // .then(data => {
    // message.channel.send(data.cnt);
    // });
    
    // part two
    /*fetch(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(mesg)}`)
    .then(res => res.json())
    .then(data => {
        message.channel.send(data.response);
    });*/
    // part three
    fetch (`https://api.snowflakedev.xyz/chatbot?message=${encodeURIComponent(message.content)}&name=${encodeURIComponent(client.user.username)}`)
        .then(data => {
        const json = data.json();
        message.channel.send(json.message);
    });
}

module.exports.help = {
    name: "chat"
};
