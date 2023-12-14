import { Event } from '@classes/event';
import { client } from '@';

import { command } from '@handlers/command';
import { component } from '@handlers/component';

export default new Event('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        return command(interaction);
    } else if (interaction.isMessageComponent()) {
        return component(interaction);
    }
});
