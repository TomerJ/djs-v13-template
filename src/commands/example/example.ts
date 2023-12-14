require('dotenv').config();
import { Command } from '../../classes/command';

export default new Command({
    name: 'example',
    description: 'just an example command',
    options: [],
    run: async ({ interaction, args }) => {
        interaction.editReply('egg!');
    },
});
