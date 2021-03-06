const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = "sb."

var embed;

client.on('ready', function() {
    console.log('I Am Done!')
})

client.on("disconnect", function() {
    console.log("Goodbye!")
})

client.on('message', function(message) {
    if (message.author.id !== client.user.id) return;
    console.log(message.author.username + " sent " + message.content + " @ " + message.createdAt + " in " + message.channel.name);
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(prefix.length).toLowerCase();
    switch (command) {
        case "game":
            if (args.length == 0) {
                message.channel.send("You must specify a game!")
                return false;
            }
            var game;
            for (var i = 0; i < args.length; i++) {
                game = game + " " + args[i]
            }
            game = game.trim();
            client.user.setGame(game);
        break
        case "status":
            if (args.length == 0 || args.length >= 2) {
                message.channel.send("You Must Only Specify A Status!")
                return false;
            }
            if ((args[0].toLowerCase() === "online") || (args[0].toLowerCase() === "idle") || (args[0].toLowerCase() === "dnd") || (args[0].toLowerCase() === "invisible")) {
                client.user.setStatus(args[0].toLowerCase())
            }
        break
        case "ping":
            message.channel.send(`${client.ping} ping`)
        break
        case "embed":
            let desc = ""
            for (var i = 1; i < args.length; i++) {
                desc = desc + " " + args[i]
            }
            embed = new Discord.RichEmbed({
                "title": args[0],
                "description": desc,
                "color": '009900',
                "footer": {
                    "text": message.author.username
                }
            })
            message.channel.send({
                "embed": embed
            })
            message.delete(0)
        break
        case "help":
            message.channel.send("Commands: \n\nHelp\nStatus\nGame\nPing\n\nEnd")
        break
        case  "membercount":
            message.channel.send(`Member Count: ${message.guild.memberCount}`)
        break
    }
})

client.login(process.env.selfbot_token)
