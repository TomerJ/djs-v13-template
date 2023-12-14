require('dotenv').config();
import { MessageComponentInteraction, MessageEmbed } from 'discord.js';

import { client } from '@';

import { LogLevel } from '@typings/enums/logLevel';
import Log from '@utilities/log';

export async function component(interaction: MessageComponentInteraction) {
    const component = client.components.get(interaction.customId);
    if (!component) return;

    if (component?.ephemeral) {
        await interaction.deferReply({ ephemeral: true });
    } else {
        await interaction.deferReply();
    }

    component
        .run({
            client,
            interaction,
        })
        .then(() =>
            Log.emit(
                `Component ${component.customId} has been handled successfully with no errors!`,
                LogLevel.Debug
            )
        )
        .catch((error: any) => {
            if (!(error instanceof Error)) {
                const runError = new MessageEmbed()
                    .setColor('#ff7a38')
                    .setTitle(`✘ | An error has occured`);
                interaction.editReply({ embeds: [runError] });
                return Log.emit(
                    `Component ${component.customId} has thrown an unknown error`,
                    LogLevel.Error
                );
            }

            Log.emit(
                `Component ${component.customId} has thrown an error: ${error.message}`,
                LogLevel.Error
            );
            const runError = new MessageEmbed()
                .setColor('#ff7a38')
                .setTitle(`✘ | An error has occured`)
                .addFields([
                    {
                        name: 'Error Details',
                        value: error.message,
                    },
                ]);
            interaction.editReply({ embeds: [runError] });
        });
}
