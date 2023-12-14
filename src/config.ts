/** @type {import("./typings/config").default} */
export default {
    showDebug: true, // Whether debug logs will be shown
    loggingEnabled: true, // Whether logging is enabled

    presence: {
        status: 'online', // Status of the bot
        activity: {
            status: 'with something idk',
            type: 'PLAYING', // PLAYING, STREAMING, LISTENING, WATCHING or COMPETING,
            url: '', // twitch / youtube stream url
        },
    },
};
