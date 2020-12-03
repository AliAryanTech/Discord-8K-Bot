const Discord = require('discord.js');
const api = require("../api")
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
	name: 'youtuber',
	interview(message, callback, user) {
        if(!user.hasOwnProperty("inv")) {
            user.inv = {}
        }
        if(!user.inv.hasOwnProperty("laptop") ||!user.inv.hasOwnProperty("headset") ) {
            message.channel.send("You need a laptop AND a headset to work as a YouTuber!\nYou can buy them buy typing `8k!buy laptop` and `8k!buy headset`")
        } else {
        const embed = new Discord.MessageEmbed()
        .setTitle("JOB INTERVIEW FOR YOUTUBER\n*Question 1:*")
        .setDescription("dO yOu LiKe yOuTubE??")
        .setFooter("Answer with 'Y' or 'N'\nPlease respond within 20 seconds")
        message.channel.send(embed)
        const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id,{max:1,time: 20000})
        collector.on('collect', (msg) => {
            if(msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes" || msg.content.toLowerCase() == "n" || msg.content.toLowerCase() == "no") {

                 if(msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes") {
                    pass = true
                 } else {
                    pass = false
                 }
                
                 callback(pass)

            } else {
                message.channel.send("You didn't enter Y or N... Try again later")
            }
        
        })
    }
    },
    work(message, callback, user) {
        if(!user.hasOwnProperty("inv")) {
            user.inv = {}
        
        }
        if(!user.inv.hasOwnProperty("laptop") ||!user.inv.hasOwnProperty("headset") ) {
            message.channel.send("You need a laptop AND a headset to work as a YouTuber!\nYou can buy them buy typing `8k!buy laptop` and `8k!buy headset`")
        } else {
        const categories = ["Among Us", "cat", "Minecraft", "makeup", "coding", "counting to 10", "nursery rhyme", "advertising coder gautam", "tech review", "boring", "hacking", "8k bot fan"]
        const embed = new Discord.MessageEmbed();
        embed.setTitle("Teaching Results")
        var num =getRandomInt(1, 10 );
        if(!user.hasOwnProperty("youtube")) user.youtube = {subs: 0}
        var video = api.randomFromArray(categories)
        if(num == 1 || num == 2) {
            
            var moneyEarned = getRandomInt(0, user.youtube.subs)
            embed.setDescription(`Your ${video} video didnt attract any new viewers.\nYou got \`${api.numberWithCommas(moneyEarned)}\` views`)
            
        } else if(num == 3 || num == 4 || num == 5 || num == 8) { 
            var subsGained = getRandomInt(0, 15)
            user.youtube.subs += subsGained
            var moneyEarned = subsGained+getRandomInt(user.youtube.subs, user.youtube.subs*3)
            embed.setDescription(`Your ${video} video got average views.\nYou gained \`${subsGained}\` subs!\nYour video got \`${api.numberWithCommas(moneyEarned)}\` views!`)
        } else if(num == 6 || num == 7 ) {
            var subsGained = getRandomInt(10, 100)
            user.youtube.subs += subsGained
            var moneyEarned = subsGained+getRandomInt(user.youtube.subs*2, user.youtube.subs*5)
            embed.setDescription(`Your ${video} video got pretty good views.\nYou gained \`${subsGained}\` subs!\nYour video got \`${api.numberWithCommas(moneyEarned)}\` views!`)
          }  else if( num == 9) {
                var subsLost = getRandomInt(user.youtube.subs*0.05, user.youtube.subs)
                user.youtube.subs -= subsLost
                var moneyEarned = 0
                embed.setDescription(`Your ${video} video WAS TERRIBLE\nYou LOST \`${api.numberWithCommas(moneyEarned)}\` subs bruh!\nYour video got \`0\` views!`)
        } else {
            var subsGained = (user.youtube.subs > 100000 ? getRandomInt(100, 2000):getRandomInt(10, 100))
            user.youtube.subs += subsGained
            var moneyEarned = subsGained+getRandomInt(user.youtube.subs*5, user.youtube.subs*20)
            embed.setDescription(`Your ${video} video WENT VIRAL!!.\nYou gained \`${api.numberWithCommas(subsGained)}\` subs!\nYour video got AN AMAZING\`${api.numberWithCommas(moneyEarned)}\` views!\nNiceee video broooo`)
        }
        embed.setFooter(`Your channel has ${user.youtube.subs} subs!\n(1 view = 1 coin)`)
        message.channel.send(embed)
        callback(user)
    }
    }
}

