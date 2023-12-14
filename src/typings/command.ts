import { ExtendedClient } from '@classes/client';
import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable,
} from 'discord.js';

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    ephemeral?: Boolean;
    userPermissions?: PermissionResolvable[];
    disabled?: Boolean;
    run: RunFunction;
} & ChatInputApplicationCommandData;
