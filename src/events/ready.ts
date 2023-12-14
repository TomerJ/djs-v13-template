import { client } from '..';
import { Event } from '../classes/event';

import { LogLevel } from '../typings/enums/logLevel';
import Log from '../utilities/log';
import config from '../config';
import { ActivityType, PresenceStatusData } from 'discord.js';

export default new Event('ready', () => {
    Log.emit(`Logged in as ${client.user?.tag}`, LogLevel.Success);

    client.user.setPresence({
        status: config.presence.status as PresenceStatusData,
        activities: [
            {
                name: config.presence.activity.status,
                type: config.presence.activity.type as ActivityType,
                url: config.presence.activity.url,
            },
        ],
    });
    Log.emit(`Presence set`, LogLevel.Debug);
});
