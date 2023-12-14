require('dotenv').config();
import { Component } from '@classes/component';

export default new Component({
    customId: 'example',
    run: async ({ interaction }) => {
        interaction.editReply('egg!');
    },
});
