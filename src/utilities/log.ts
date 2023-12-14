import chalk from 'chalk';

import { LogLevel } from '../typings/enums/logLevel';
import config from '../config';

export default class Log {
    constructor() {}

    public static emit(message: string, level: LogLevel) {
        let now = new Date();
        let dateString = now.toUTCString();

        if (!config.loggingEnabled) return;
        if (!config.showDebug && level == LogLevel.Debug) return;

        switch (level) {
            case LogLevel.Debug:
                console.log(
                    `${chalk.gray('[⚑ DEBUG]')} ${dateString} - ${message}`
                );
                break;

            case LogLevel.Info:
                console.log(
                    `${chalk.blueBright('[🛈 INFO]')} ${dateString} - ${message}`
                );
                break;

            case LogLevel.Success:
                console.log(
                    `${chalk.greenBright(
                        '[✔ SUCCESS]'
                    )} ${dateString} - ${message}`
                );
                break;

            case LogLevel.Warning:
                console.log(
                    `${chalk.yellowBright(
                        '[⚠ WARNING]'
                    )} ${dateString} - ${message}`
                );
                break;

            case LogLevel.Error:
                console.log(
                    `${chalk.redBright('[✘ ERROR]')} ${dateString} - ${message}`
                );
                break;

            case LogLevel.Critical:
                console.log(
                    `${chalk.magentaBright(
                        '[🛇 CRITICAL]'
                    )} ${dateString} - ${message}`
                );
                process.exit(1);

            default:
                console.log(`[? UNKNOWN] ${dateString} - ${message}`);
                break;
        }
    }
}
