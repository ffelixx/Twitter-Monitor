const Twit = require('twit');
const config = require("./config");
const Discord = require('Discord.js');
const client = new Discord.Client();

let T = new Twit(config.Keys);
let stream = T.stream("statuses/filter", {
    follow: [config.accounts]
});

client.on("ready", () => {
    stream.on("tweet", (tweet) => {
        if (Object.prototype.hasOwnProperty.call(tweet, 'retweeted_status') ||
            Object.prototype.hasOwnProperty.call(tweet, 'in_reply_to_status_id') ||
            Object.prototype.hasOwnProperty.call(tweet, 'quoted_status_id')) {
            return;
        }

        let channel = client.channels.cache.get(config.channel);
        channel.send(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
    });
});

client.login(config.token);