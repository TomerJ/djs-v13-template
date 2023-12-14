require('dotenv').config();
import { Component } from '@classes/component';
import { SelectMenuInteraction } from 'discord.js';

export default new Component({
    customId: 'example2',
    run: async ({ interaction }) => {
        const value = (interaction as SelectMenuInteraction).values[0];


        interaction.editReply(`You have selected from the menu: **${value}**`);
    },
});
