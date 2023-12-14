require('dotenv').config();
import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import { RegisterCommandsOptions } from '../typings/client';
import { CommandType } from '../typings/command';
import { Event } from './event';

import ComponentType from '@typings/component';
import { LogLevel } from '../typings/enums/logLevel';
import Log from '../utilities/log';

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection();
    public components: Collection<string, ComponentType> = new Collection();

    constructor() {
        super({ intents: 32767 });
    }

    start() {
        this.registerModules();
        Log.emit('Logging into bot...', LogLevel.Debug);
        this.login(process.env.TOKEN).catch((error) => {
            Log.emit(`Failed to login: ${error.message}`, LogLevel.Critical);
        });
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        Log.emit('Publishing commands...', LogLevel.Debug);
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            Log.emit(
                `Published ${commands.length} command(s) to ${guildId}`,
                LogLevel.Info
            );
        } else {
            this.application?.commands.set(commands);
            Log.emit(`Published ${commands.length} command(s)`, LogLevel.Info);
        }
    }

    async registerModules() {
        // Commands

        Log.emit('Loading commands...', LogLevel.Debug);

        const commands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname}/../commands/*/*{.ts,.js}`
        );
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            if (command.dmPermission == null) {
                command.dmPermission = false;
            }
            this.commands.set(command.name, command);
            commands.push(command);
        });
        Log.emit('Commands loaded', LogLevel.Debug);
        this.on('ready', () => {
            this.registerCommands({
                commands: commands,
            });
        });

        // Events
        Log.emit('Events loaded', LogLevel.Debug);
        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        );
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> =
                await this.importFile(filePath);
            this.on(event.event, event.run);
        });

        // Components
        Log.emit('Components loaded', LogLevel.Debug);
        const componentFiles = await globPromise(
            `${__dirname}/../components/*/*{.ts,.js}`
        );
        componentFiles.forEach(async (filePath) => {
            const component: ComponentType = await this.importFile(filePath);
            if (!component.customId) return;
            this.components.set(component.customId, component);
        });
    }
}
