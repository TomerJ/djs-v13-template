import { ExtendedClient } from '@classes/client';
import { MessageComponentInteraction, SelectMenuInteraction } from 'discord.js';

interface RunOptions {
    client: ExtendedClient;
    interaction: MessageComponentInteraction | SelectMenuInteraction;
}

export default interface ComponentType {
    customId: string;
    ephemeral?: boolean;
    run: (options: RunOptions) => any;
}
