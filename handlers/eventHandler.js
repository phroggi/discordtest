const fs = require('fs');

module.exports = (bot, Discord) => {
    const loaddir = (dirs) => {
        const eventfile = fs
            .readdirSync(`./events/${dirs}`)
            .filter((file) => file.endsWith('.js'));

        for (const file of eventfile) {
            const event = require(`../events/${dirs}/${file}`);
            const eventName = file.split('.')[0];
            bot.on(eventName, event.bind(null, Discord, bot));
        }
    };

    ['client', 'guild'].forEach((e) => loaddir(e));
};
