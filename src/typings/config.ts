import { LogLevel } from './enums/logLevel';
import { ActivityType, PresenceStatusData } from 'discord.js';

export default interface Configuration {
    logLevel: LogLevel;
    showDebug: boolean;
    loggingEnabled: boolean;

    presence: {
        status: PresenceStatusData;
        activity: {
            status: string;
            type: ActivityType;
            url: string;
        };
    };
}
